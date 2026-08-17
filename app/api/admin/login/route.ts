import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";

export const runtime = "nodejs";

// Lets the admin UI validate a pasted key with a live request before storing
// it in sessionStorage — same check every other /api/admin/* route runs.
export async function POST(req: NextRequest) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;
  return NextResponse.json({ ok: true });
}
