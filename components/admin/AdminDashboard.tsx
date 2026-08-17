"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/cn";

const SESSION_KEY = "minihood_admin_key";

interface Wallet {
  id: number;
  wallet_address: string;
  submitted_at: string;
}

export function AdminDashboard() {
  const [adminKey, setAdminKey] = useState<string | null>(null);
  const [checkedSession, setCheckedSession] = useState(false);

  useEffect(() => {
    setAdminKey(window.sessionStorage.getItem(SESSION_KEY));
    setCheckedSession(true);
  }, []);

  function handleSignOut() {
    window.sessionStorage.removeItem(SESSION_KEY);
    setAdminKey(null);
  }

  if (!checkedSession) return null;

  return adminKey ? (
    <Dashboard adminKey={adminKey} onUnauthorized={handleSignOut} onSignOut={handleSignOut} />
  ) : (
    <Login
      onSuccess={(key) => {
        window.sessionStorage.setItem(SESSION_KEY, key);
        setAdminKey(key);
      }}
    />
  );
}

function Login({ onSuccess }: { onSuccess: (key: string) => void }) {
  const [key, setKey] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading" || !key.trim()) return;
    setStatus("loading");
    setMessage(null);

    try {
      const res = await fetch("/api/admin/login", { method: "POST", headers: { "x-admin-key": key.trim() } });
      if (res.ok) {
        onSuccess(key.trim());
        return;
      }
      setStatus("error");
      setMessage(res.status === 401 ? "Invalid admin key." : "Something went wrong. Please try again.");
    } catch {
      setStatus("error");
      setMessage("Network error — please try again.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <p className="font-pixel text-sm uppercase tracking-widest text-lime">Minihood Admin</p>
        <p className="mt-2 text-sm text-white/50">Enter the admin key to continue.</p>

        <input
          type="password"
          autoComplete="off"
          spellCheck={false}
          placeholder="Admin key"
          value={key}
          onChange={(e) => {
            setKey(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          disabled={status === "loading"}
          className={cn(
            "pixel-border mt-6 w-full bg-ink-elevated px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/25",
            status === "error" && "border-red"
          )}
        />

        {status === "error" && message && <p className="mt-2 text-xs text-red">{message}</p>}

        <button
          type="submit"
          disabled={status === "loading" || !key.trim()}
          className="pixel-btn mt-4 w-full border-2 border-lime bg-lime px-6 py-3.5 font-pixel text-xs uppercase text-ink hover:bg-lime-bright disabled:opacity-45"
        >
          {status === "loading" ? "Checking…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}

function Dashboard({
  adminKey,
  onUnauthorized,
  onSignOut,
}: {
  adminKey: string;
  onUnauthorized: () => void;
  onSignOut: () => void;
}) {
  const [wallets, setWallets] = useState<Wallet[] | null>(null);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/admin/wallets?limit=5000", { headers: { "x-admin-key": adminKey } });
        if (res.status === 401) {
          onUnauthorized();
          return;
        }
        if (!res.ok) {
          if (!cancelled) setError("Failed to load submissions.");
          return;
        }
        const data = await res.json();
        if (!cancelled) {
          setWallets(data.wallets);
          setTotal(data.total);
        }
      } catch {
        if (!cancelled) setError("Network error while loading submissions.");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [adminKey, onUnauthorized]);

  const filtered = useMemo(() => {
    if (!wallets) return [];
    const q = query.trim().toLowerCase();
    if (!q) return wallets;
    return wallets.filter((w) => w.wallet_address.toLowerCase().includes(q));
  }, [wallets, query]);

  async function handleExport() {
    setExporting(true);
    try {
      const res = await fetch("/api/admin/export", { headers: { "x-admin-key": adminKey } });
      if (res.status === 401) {
        onUnauthorized();
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "minihood-wallets.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="min-h-screen bg-ink px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-pixel text-sm uppercase tracking-widest text-lime">Minihood Admin</p>
            <p className="mt-1 text-sm text-white/50">
              {total.toLocaleString()} wallet submission{total === 1 ? "" : "s"}
            </p>
          </div>
          <button
            onClick={onSignOut}
            className="pixel-btn border-2 border-line px-4 py-2.5 font-pixel text-[10px] uppercase text-white/60 hover:border-lime hover:text-lime"
          >
            Sign Out
          </button>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder="Search wallet address…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pixel-border min-w-0 flex-1 bg-ink-elevated px-4 py-3 text-sm text-white outline-none placeholder:text-white/25"
          />
          <button
            onClick={handleExport}
            disabled={exporting || !wallets || wallets.length === 0}
            className="pixel-btn border-2 border-lime bg-lime px-4 py-3 font-pixel text-[10px] uppercase text-ink hover:bg-lime-bright disabled:opacity-45"
          >
            {exporting ? "Exporting…" : "Export CSV"}
          </button>
        </div>

        {error && <p className="mt-4 text-xs text-red">{error}</p>}

        <div className="pixel-border mt-6 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="border-b-2 border-line bg-ink-elevated text-[10px] uppercase tracking-widest text-white/50">
                  <th className="px-4 py-3 font-pixel font-normal">Wallet Address</th>
                  <th className="px-4 py-3 font-pixel font-normal">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {wallets === null ? (
                  <tr>
                    <td colSpan={2} className="px-4 py-8 text-center text-white/40">
                      Loading…
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="px-4 py-8 text-center text-white/40">
                      No submissions {query ? "match your search." : "yet."}
                    </td>
                  </tr>
                ) : (
                  filtered.map((w) => (
                    <tr key={w.id} className="border-b border-line/60 last:border-0">
                      <td className="px-4 py-3 font-mono text-xs text-white/85 sm:text-sm">{w.wallet_address}</td>
                      <td className="px-4 py-3 text-xs text-white/50 sm:text-sm">
                        {new Date(w.submitted_at).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
