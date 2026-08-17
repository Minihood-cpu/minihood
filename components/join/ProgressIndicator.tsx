import { cn } from "@/lib/cn";

export type JoinStep = 1 | 2 | 3;

const steps: { id: JoinStep; label: string }[] = [
  { id: 1, label: "PUZZLE" },
  { id: 2, label: "TASKS" },
  { id: 3, label: "WALLET" },
];

export function ProgressIndicator({ current }: { current: JoinStep }) {
  return (
    <ol className="mx-auto flex max-w-md items-center justify-center gap-2 px-4 py-8 sm:gap-3">
      {steps.map((step, i) => {
        const state = step.id < current ? "done" : step.id === current ? "active" : "upcoming";
        return (
          <li key={step.id} className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "flex h-7 w-7 items-center justify-center border-2 font-pixel text-[10px] sm:h-8 sm:w-8",
                  state === "done" && "border-lime bg-lime text-ink",
                  state === "active" && "border-lime text-lime pulse-outline",
                  state === "upcoming" && "border-line text-white/35"
                )}
              >
                {String(step.id).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "hidden font-pixel text-[9px] tracking-widest uppercase sm:inline",
                  state === "upcoming" ? "text-white/35" : "text-white/80"
                )}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <span className={cn("h-px w-6 sm:w-10", state === "done" ? "bg-lime" : "bg-line")} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
