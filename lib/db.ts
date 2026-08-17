// Minihood's own Postgres connection pool — independent database, independent
// credentials. Never imported into any client component: DATABASE_URL is a
// server-only secret (not NEXT_PUBLIC_*), so it's never bundled into the browser.
import { Pool } from "pg";

declare global {
  var __minihoodPgPool: Pool | undefined;
}

// Lazy on purpose: Next.js evaluates route modules while collecting build
// metadata (and in local dev without a database configured), so creating the
// pool eagerly at import time would throw before callers get a chance to
// check `process.env.DATABASE_URL` themselves and fall back to demo mode.
export function getPool(): Pool {
  if (globalThis.__minihoodPgPool) return globalThis.__minihoodPgPool;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is required");
  }

  const pool = new Pool({
    connectionString,
    ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : undefined,
    // Kept small: each serverless function instance holds its own pool, and a
    // free-tier Postgres has a limited total connection budget. If traffic
    // outgrows this, point DATABASE_URL at a pooled (PgBouncer/Neon "-pooler")
    // connection string rather than raising this number.
    max: 3,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,
  });

  // Reuse one pool per warm serverless instance instead of opening a new one
  // on every invocation.
  globalThis.__minihoodPgPool = pool;
  return pool;
}
