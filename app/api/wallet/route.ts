import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getPool } from "@/lib/db";
import { isValidWalletAddress, normalizeWalletAddress } from "@/lib/wallet";

export const runtime = "nodejs";

function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT ?? "minihood";
  return crypto.createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

function clientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const address =
    body && typeof body === "object" && "address" in body ? String((body as { address: unknown }).address ?? "") : "";

  if (!isValidWalletAddress(address)) {
    return NextResponse.json({ error: "That doesn't look like a valid wallet address." }, { status: 400 });
  }

  const normalized = normalizeWalletAddress(address);

  // Local/dev convenience: if no database is configured yet, accept the
  // submission without persisting it rather than throwing a 500. Production
  // always has DATABASE_URL set, so this branch never runs there.
  if (!process.env.DATABASE_URL) {
    console.warn("[api/wallet] DATABASE_URL not set — accepting submission without persisting (demo mode).");
    return NextResponse.json({ ok: true, demo: true }, { status: 201 });
  }

  const ipHash = hashIp(clientIp(req));

  try {
    const pool = getPool();
    const recent = await pool.query(
      `SELECT COUNT(*)::int AS count FROM wallet_submissions WHERE ip_hash = $1 AND submitted_at > NOW() - INTERVAL '10 minutes'`,
      [ipHash]
    );
    if (recent.rows[0].count >= 5) {
      return NextResponse.json({ error: "Too many submissions. Please try again later." }, { status: 429 });
    }

    const result = await pool.query(
      `INSERT INTO wallet_submissions (wallet_address, ip_hash)
       VALUES ($1, $2)
       ON CONFLICT (wallet_address) DO NOTHING
       RETURNING id, wallet_address, submitted_at`,
      [normalized, ipHash]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "This wallet has already been submitted." }, { status: 409 });
    }

    return NextResponse.json({ ok: true, submission: result.rows[0] }, { status: 201 });
  } catch (err) {
    console.error("[api/wallet] Failed to insert submission", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
