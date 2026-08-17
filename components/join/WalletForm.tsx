"use client";

import { useState } from "react";
import { submitWallet } from "@/lib/wallet";
import { cn } from "@/lib/cn";
import { ArrowRightIcon } from "@/components/ui/icons";

type Status = "idle" | "loading" | "error";

export function WalletForm({ onSuccess }: { onSuccess: () => void }) {
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setMessage(null);

    const result = await submitWallet(address);

    if (result.ok) {
      onSuccess();
      return;
    }

    setStatus("error");
    setMessage(result.message ?? "Something went wrong. Please try again.");
  }

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-6 text-center">
      <div>
        <p className="font-pixel text-xs tracking-widest text-lime uppercase">Claim Your Spot</p>
        <p className="mt-3 text-sm text-white/55">One last step. Drop your wallet below.</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full">
        <label htmlFor="wallet" className="sr-only">
          Wallet Address
        </label>
        <input
          id="wallet"
          type="text"
          inputMode="text"
          autoComplete="off"
          spellCheck={false}
          placeholder="0x... or your Solana address"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          disabled={status === "loading"}
          className={cn(
            "w-full bg-ink pixel-border px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none",
            status === "error" && "border-red"
          )}
        />

        {status === "error" && message && <p className="mt-2 text-left text-xs text-red">{message}</p>}

        <button
          type="submit"
          disabled={status === "loading" || address.trim().length === 0}
          className="pixel-btn mt-4 flex w-full items-center justify-center gap-2 border-2 border-lime bg-lime px-6 py-4 font-pixel text-xs uppercase text-ink hover:bg-lime-bright disabled:opacity-45"
        >
          {status === "loading" ? (
            "Submitting…"
          ) : (
            <>
              SUBMIT <ArrowRightIcon className="h-3.5 w-3.5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
