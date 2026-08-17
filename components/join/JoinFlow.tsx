"use client";

import { useMemo, useState } from "react";
import { JoinHeader } from "@/components/join/JoinHeader";
import { ProgressIndicator, type JoinStep } from "@/components/join/ProgressIndicator";
import { Puzzle } from "@/components/join/Puzzle";
import { TaskList } from "@/components/join/TaskList";
import { WalletForm } from "@/components/join/WalletForm";
import { SuccessState } from "@/components/join/SuccessState";
import { socialTasks, type SocialTaskStatus } from "@/lib/social-tasks";
import { PixelButton } from "@/components/ui/PixelButton";

export function JoinFlow() {
  const [step, setStep] = useState<JoinStep>(1);
  const [success, setSuccess] = useState(false);
  const [statuses, setStatuses] = useState<Record<string, SocialTaskStatus>>({});

  const requiredTasks = useMemo(() => socialTasks.filter((t) => t.enabled && t.required), []);
  const allRequiredDone = requiredTasks.every((t) => statuses[t.id] === "completed");

  if (success) {
    return (
      <div className="min-h-screen bg-ink">
        <JoinHeader />
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <SuccessState />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink">
      <JoinHeader />
      <ProgressIndicator current={step} />

      <div className="mx-auto max-w-4xl px-4 pb-24 sm:px-6">
        {step === 1 && (
          <div className="reveal flex flex-col items-center gap-8">
            <div className="mx-auto max-w-lg text-center">
              <h2 className="font-pixel text-lg text-white uppercase leading-snug sm:text-xl">
                Solve The Puzzle To Claim Your Spot
              </h2>
              <p className="mt-3 text-sm text-white/55 sm:text-base">
                Complete the puzzle first to unlock the tasks and secure your spot in the Minihood.
              </p>
            </div>
            <Puzzle onComplete={() => setStep(2)} />
          </div>
        )}

        {step === 2 && (
          <div className="reveal flex flex-col items-center gap-8">
            <TaskList unlocked statuses={statuses} setStatuses={setStatuses} />
            {allRequiredDone && (
              <PixelButton variant="primary" onClick={() => setStep(3)}>
                CONTINUE →
              </PixelButton>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="reveal">
            <WalletForm onSuccess={() => setSuccess(true)} />
          </div>
        )}
      </div>
    </div>
  );
}
