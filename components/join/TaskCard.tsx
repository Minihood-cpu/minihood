"use client";

import { useState } from "react";
import type { SocialTaskDefinition, SocialTaskStatus } from "@/lib/social-tasks";
import { cn } from "@/lib/cn";
import { CheckIcon, LockIcon } from "@/components/ui/icons";

interface TaskCardProps {
  task: SocialTaskDefinition;
  status: SocialTaskStatus;
  onVerify: () => void;
}

export function TaskCard({ task, status, onVerify }: TaskCardProps) {
  const [opened, setOpened] = useState(false);

  const locked = status === "locked";
  const completed = status === "completed";
  const verifying = status === "verifying";
  const error = status === "error";

  function handleAction() {
    window.open(task.url, "_blank", "noopener,noreferrer");
    setOpened(true);
  }

  return (
    <div
      className={cn(
        "pixel-border flex flex-col gap-3 bg-ink p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5 transition-opacity",
        locked && "opacity-50"
      )}
    >
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center border-2 font-pixel text-[9px]",
            completed ? "border-lime bg-lime text-ink" : "border-line text-white/50"
          )}
        >
          {completed ? <CheckIcon className="h-4 w-4" /> : locked ? <LockIcon className="h-4 w-4" /> : task.label[0]}
        </span>
        <div>
          <p className="font-pixel text-[11px] text-white uppercase sm:text-xs">{task.label}</p>
          <p className="mt-1 text-xs text-white/50">{task.description}</p>
          {!task.required && <p className="mt-1 text-[10px] uppercase tracking-wide text-white/30">Optional</p>}
        </div>
      </div>

      <div className="flex flex-col items-stretch gap-1.5 sm:items-end">
        {completed && (
          <span className="check-pop font-pixel text-[10px] text-lime uppercase inline-flex items-center gap-1.5">
            <CheckIcon className="h-3.5 w-3.5" /> Completed
          </span>
        )}

        {!completed && !locked && (
          <>
            {verifying ? (
              <span className="font-pixel text-[10px] text-white/50 uppercase animate-pulse px-4 py-2.5">
                Verifying…
              </span>
            ) : error ? (
              <button
                onClick={() => setOpened(false)}
                className="font-pixel text-[10px] uppercase border-2 border-red text-red px-4 py-2.5 hover:bg-red/10"
              >
                Try Again
              </button>
            ) : opened ? (
              <button
                onClick={onVerify}
                className="pixel-btn font-pixel text-[10px] uppercase border-2 border-lime bg-lime text-ink px-4 py-2.5 hover:bg-lime-bright"
              >
                I DID THIS ✓
              </button>
            ) : (
              <button
                onClick={handleAction}
                className="pixel-btn font-pixel text-[10px] uppercase border-2 border-lime text-lime px-4 py-2.5 hover:bg-lime/10"
              >
                {task.actionLabel}
              </button>
            )}

            <span className="max-w-[220px] text-right text-[10px] leading-snug text-white/30">
              Self-reported for now — automatic verification is on the way.
            </span>
          </>
        )}
      </div>
    </div>
  );
}
