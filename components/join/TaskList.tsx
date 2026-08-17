"use client";

import { socialTasks, activeProvider, type SocialTaskStatus } from "@/lib/social-tasks";
import { TaskCard } from "@/components/join/TaskCard";

interface TaskListProps {
  unlocked: boolean;
  statuses: Record<string, SocialTaskStatus>;
  setStatuses: React.Dispatch<React.SetStateAction<Record<string, SocialTaskStatus>>>;
}

export function TaskList({ unlocked, statuses, setStatuses }: TaskListProps) {
  const enabledTasks = socialTasks.filter((t) => t.enabled);

  async function handleVerify(taskId: string) {
    const task = enabledTasks.find((t) => t.id === taskId);
    if (!task) return;

    setStatuses((prev) => ({ ...prev, [taskId]: "verifying" }));
    const result = await activeProvider.verify(task);
    setStatuses((prev) => ({ ...prev, [taskId]: result.status }));
  }

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-3">
      <p className="text-center font-pixel text-xs tracking-widest text-lime uppercase">Complete Your Missions</p>
      {enabledTasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          status={unlocked ? statuses[task.id] ?? "available" : "locked"}
          onVerify={() => handleVerify(task.id)}
        />
      ))}
    </div>
  );
}
