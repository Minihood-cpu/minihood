import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/lib/db";
import { requireAdmin } from "@/lib/adminAuth";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ total: 0, count: 0, wallets: [], demo: true });
  }

  const { searchParams } = new URL(req.url);
  const limit = Math.min(Number(searchParams.get("limit")) || 500, 5000);
  const offset = Math.max(Number(searchParams.get("offset")) || 0, 0);

  try {
    const pool = getPool();
    const result = await pool.query(
      `SELECT id, wallet_address, submitted_at FROM wallet_submissions ORDER BY submitted_at DESC LIMIT $1 OFFSET $2`,
      [limit, offset]
    );
    const countResult = await pool.query(`SELECT COUNT(*)::int AS total FROM wallet_submissions`);
    return NextResponse.json({ total: countResult.rows[0].total, count: result.rows.length, wallets: result.rows });
  } catch (err) {
    console.error("[api/admin/wallets] Failed to list submissions", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
