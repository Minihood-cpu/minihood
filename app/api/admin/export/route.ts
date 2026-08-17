import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/lib/db";
import { requireAdmin } from "@/lib/adminAuth";
import { rowsToCsv } from "@/lib/csv";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  if (!process.env.DATABASE_URL) {
    return new NextResponse(rowsToCsv([], ["id", "wallet_address", "submitted_at"]), {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": 'attachment; filename="minihood-wallets.csv"',
      },
    });
  }

  try {
    const pool = getPool();
    const result = await pool.query(
      `SELECT id, wallet_address, submitted_at FROM wallet_submissions ORDER BY submitted_at ASC`
    );
    const rows = result.rows.map((row) => ({ ...row, submitted_at: new Date(row.submitted_at).toISOString() }));
    const csv = rowsToCsv(rows, ["id", "wallet_address", "submitted_at"]);
    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": 'attachment; filename="minihood-wallets.csv"',
      },
    });
  } catch (err) {
    console.error("[api/admin/export] Failed to export submissions", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
