// Shared admin-route guard. Single shared key model (no per-user accounts) —
// appropriate for a single-operator dashboard, matching ADMIN_API_KEY-style
// admin panels used elsewhere. The key lives only in this backend's env vars,
// never in frontend code.
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

function timingSafeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

/** Returns a NextResponse to short-circuit with if unauthorized, or null if OK. */
export function requireAdmin(req: NextRequest): NextResponse | null {
  const expected = process.env.ADMIN_API_KEY;
  if (!expected) {
    return NextResponse.json({ error: "Admin API is not configured" }, { status: 500 });
  }
  const provided = req.headers.get("x-admin-key") ?? "";
  if (!provided || !timingSafeEqual(provided, expected)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
