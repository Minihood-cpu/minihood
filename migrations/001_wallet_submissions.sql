-- Minihood wallet submissions schema.
-- Run once against Minihood's own database (see scripts/migrate.js or README).
-- Supports both EVM (0x…) and Solana (base58) addresses — format is validated
-- at the application layer (lib/wallet.ts) since the two use different rules.

CREATE TABLE IF NOT EXISTS wallet_submissions (
    id              BIGSERIAL PRIMARY KEY,
    wallet_address  TEXT NOT NULL,
    ip_hash         TEXT,
    submitted_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT wallet_submissions_address_unique UNIQUE (wallet_address)
);

CREATE INDEX IF NOT EXISTS idx_wallet_submissions_submitted_at ON wallet_submissions (submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_wallet_submissions_ip_hash ON wallet_submissions (ip_hash);
