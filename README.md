# Minihood

The Minihood landing page and `/join` onboarding flow, built from the real
Minihood artwork (logo + 6 character portraits) supplied for the project —
nothing redrawn or AI-generated stands in for project art. A separate
landing-page concept image was provided only as a layout/composition
reference and was not used as a source of artwork.

Includes its own backend: a small set of Next.js Route Handlers backed by
Minihood's own Postgres database, plus a `/admin` dashboard for viewing
wallet submissions. See "Backend & admin panel" below.

## Stack

Next.js 15 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS v4,
`pg` (node-postgres) for the backend.
Pixel display font (Press Start 2P, self-hosted under `app/fonts/` via
`next/font/local`) is used only for headings/buttons/pixel UI; body copy
uses the system font stack — this environment has no outbound access to
Google Fonts at build/dev time, and a system stack reads just as clean for
body text without adding a network dependency.

## Structure

```
app/
  layout.tsx        root layout, metadata/OG, icons, pixel font
  globals.css        design tokens, pixel UI primitives, motion, accordion, puzzle styles
  page.tsx            landing page composition
  join/page.tsx        /join route
  admin/page.tsx        /admin dashboard (noindex layout, see below)
  api/wallet/route.ts          POST — public wallet submission endpoint
  api/admin/login/route.ts     POST — validates an admin key
  api/admin/wallets/route.ts   GET  — list submissions (admin-only)
  api/admin/export/route.ts    GET  — CSV export (admin-only)
  icon.png / apple-icon.png   generated from the real logo artwork
components/
  layout/             Navbar (sticky, mobile menu), Footer
  sections/           Hero, AboutSection, SneakPeek, TraitSection, BannerSection,
                       CommunitySection, FAQSection, FinalCTA
  join/               JoinHeader, ProgressIndicator, Puzzle, TaskCard, TaskList,
                       WalletForm, SuccessState, JoinFlow (orchestrates the 3-step state machine)
  admin/              AdminDashboard — login screen + submissions table + CSV export
  ui/                 PixelButton, SectionHeader, icons
lib/
  content.ts          single source of truth: project copy, links, nav, images, stats,
                       trait categories, sneak-peek list, FAQ — edit here, not in components
  social-tasks.ts      social task definitions + verification abstraction (see below)
  wallet.ts            wallet address validation, normalization, submission abstraction
  db.ts                 lazy Postgres connection pool (server-only)
  adminAuth.ts           shared `x-admin-key` header check for /api/admin/*
  csv.ts                  tiny CSV serializer for the export endpoint
  cn.ts                tiny classnames helper
migrations/            SQL schema (001_wallet_submissions.sql) + schema_migrations tracking
scripts/migrate.js      applies migrations/*.sql against DATABASE_URL — `npm run migrate`
public/images/
  logo.png/.webp, favicon-*.png        from the real logo artwork
  characters/hero.*                    the cap+goggles+staff character — used in the Hero,
                                        the puzzle source image, and the Final CTA
  characters/char-*.webp               the other 5 real character portraits (Sneak Peek,
                                        Banner lineup, Community, Success state)
  traits/*.webp                        real close-up crops cut from the character portraits
                                        (headwear/eyes/outfit/accessory/background) — no
                                        invented trait art
```

## Content architecture

Everything project-specific — copy, supply count, social URLs, nav items,
FAQ, image paths, sneak-peek picks, trait category crops — lives in
`lib/content.ts`. Components import from it; nothing is hardcoded inline.
Update the collection URL, X link, or FAQ answers there.

## The "banner" section

The brief called for a dedicated full-width banner asset; only character
portraits and the logo were supplied (no separate wide banner image). Section
06 (`BannerSection.tsx`) builds a full-bleed cinematic lineup from all 6 real
character portraits instead of inventing or stretching artwork — no added
copy, matching the "let the artwork stand on its own" direction.

## Backend & admin panel

**Wallet submission** (`lib/wallet.ts` → `POST /api/wallet`): validates the
address (EVM `0x…` or Solana base58), normalizes it (EVM lowercased; Solana
is case-sensitive and left as-is), and inserts it into Minihood's own
`wallet_submissions` table. A `UNIQUE` constraint on the address is the
source of truth for duplicate prevention (client-side `localStorage` is just
a fast-path UX check, not the real guard). A lightweight per-IP-hash count
over the last 10 minutes caps abuse without any extra infra (no Redis, no
separate rate-limit service) — raw IPs are never stored, only a salted
SHA-256 hash (`IP_HASH_SALT`). If `DATABASE_URL` isn't set (e.g. local dev
without a database), the route accepts the submission without persisting it
rather than throwing, so the flow stays demoable.

**Admin panel** (`/admin`, not linked from anywhere in the public UI,
`noindex`): paste the `ADMIN_API_KEY` to sign in. The key is validated with a
live request (`POST /api/admin/login`) before being accepted, then held only
in `sessionStorage` — cleared when the tab closes, never written to
`localStorage` or cookies. A 401 from any `/api/admin/*` call immediately
clears it and drops back to the login screen. The dashboard lists
submissions (client-side search over wallet address) and exports everything
as CSV via a `Blob` download (can't be a plain link — the endpoint needs the
`x-admin-key` header). Every `/api/admin/*` route fails closed if
`ADMIN_API_KEY` isn't configured.

**Social tasks** (`lib/social-tasks.ts`): there's no live X API integration
(no credentials for this build), so task completion is still
**self-reported** — the task button opens the real X URL, then the user
explicitly confirms with "I DID THIS". `TaskCard` visibly discloses this
rather than silently treating a click as verified. The abstraction already
has a `RemoteApiProvider` that POSTs to `NEXT_PUBLIC_VERIFY_TASK_ENDPOINT`;
once a real X-API-backed verification service exists, swap `activeProvider`
in that file to use it — no component changes needed.

### Database setup

```bash
# Point DATABASE_URL at Minihood's own Postgres (see .env.example), then:
npm run migrate -w apps/minihood-web
```

`scripts/migrate.js` tracks applied migrations in a `schema_migrations`
table, so it's safe to re-run — it only applies files it hasn't seen before.

## Puzzle

3×3 swap puzzle (tap a piece, tap another to swap — not drag-and-drop, for
reliable touch support) sliced from the real hero character artwork via
CSS `background-position` (no pre-cut image files needed, stays crisp at any
size). Any shuffle that isn't already solved is solvable by arbitrary swaps,
so no solvability check is needed beyond re-shuffling if the initial
shuffle happens to already match the solved state.

## Run

```bash
npm run dev -w apps/minihood-web
```

Runs on http://localhost:3003.

## Deployment

This app is fully independent — its own repository, its own Vercel project,
its own database, its own domain, its own secrets. See `.env.example` for
every variable it reads. The two `NEXT_PUBLIC_*` overrides
(`NEXT_PUBLIC_WALLET_SUBMIT_ENDPOINT`, `NEXT_PUBLIC_VERIFY_TASK_ENDPOINT`)
are optional; the three server-only vars (`DATABASE_URL`, `ADMIN_API_KEY`,
`IP_HASH_SALT`) are required for the backend/admin panel to do anything
beyond demo mode.

```bash
cp .env.example .env.local   # fill in DATABASE_URL / ADMIN_API_KEY for the backend
npm install
npm run migrate              # applies migrations/ to DATABASE_URL
npm run build                # production build, run from this directory
npm start                    # or: next start -p 3003
```

To deploy: push this directory as its own GitHub repository, import it into
a **new** Vercel project (framework preset: Next.js, auto-detected, root
directory = repo root), set the env vars from `.env.example` in the
project's settings, and run `npm run migrate` once against the production
`DATABASE_URL` before the first deploy.
