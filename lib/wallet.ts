// Wallet submission abstraction.
//
// Submissions POST to Minihood's own `/api/wallet` route (a same-origin
// Next.js Route Handler backed by Minihood's own Postgres database — see
// lib/db.ts). NEXT_PUBLIC_WALLET_SUBMIT_ENDPOINT can override this to point
// at a different URL if the backend is ever split out, but nothing here
// depends on any other project's infrastructure.

const EVM_ADDRESS_RE = /^0x[a-fA-F0-9]{40}$/;
const SOL_ADDRESS_RE = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

export function isValidWalletAddress(address: string): boolean {
  const trimmed = address.trim();
  return EVM_ADDRESS_RE.test(trimmed) || SOL_ADDRESS_RE.test(trimmed);
}

/** EVM addresses are case-insensitive (lowercased for storage); Solana's base58 is case-sensitive and left as-is. */
export function normalizeWalletAddress(address: string): string {
  const trimmed = address.trim();
  return EVM_ADDRESS_RE.test(trimmed) ? trimmed.toLowerCase() : trimmed;
}

export interface WalletSubmitResult {
  ok: boolean;
  message?: string;
}

const submitEndpoint = process.env.NEXT_PUBLIC_WALLET_SUBMIT_ENDPOINT || "/api/wallet";
const LOCAL_STORAGE_KEY = "minihood:wallet-submission";

export function getStoredSubmission(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(LOCAL_STORAGE_KEY);
}

export async function submitWallet(address: string): Promise<WalletSubmitResult> {
  const trimmed = address.trim();
  if (!isValidWalletAddress(trimmed)) {
    return { ok: false, message: "That doesn't look like a valid wallet address." };
  }

  if (getStoredSubmission() === trimmed) {
    return { ok: false, message: "This wallet has already been submitted." };
  }

  try {
    const res = await fetch(submitEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address: trimmed }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => null);
      const message =
        body && typeof body === "object" && "error" in body && typeof body.error === "string"
          ? body.error
          : `Submission failed (${res.status}). Please try again.`;
      return { ok: false, message };
    }
  } catch {
    return { ok: false, message: "Network error — please try again." };
  }

  if (typeof window !== "undefined") {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, trimmed);
  }
  return { ok: true };
}
