# AIGYPT

An Indonesian online learning platform built on React + Express with PostgreSQL. Students can browse courses, register, pay via Midtrans, and access course materials. Includes an admin panel.

## Run & Operate

- **Frontend (AIGYPT):** `PORT=22064 pnpm --filter @workspace/aigypt run dev` — serves on port 22064 at `/`
- **API Server:** `PORT=8080 pnpm --filter @workspace/api-server run dev` — serves on port 8080 at `/api`
- `pnpm --filter @workspace/db run push` — push DB schema changes to development DB
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 20, TypeScript 5.9
- Frontend: React 19, Vite 7, Tailwind CSS, Wouter (routing), Framer Motion
- API: Express 5
- DB: PostgreSQL (Replit built-in) + Drizzle ORM
- Payments: Midtrans (Snap)
- Validation: Zod, drizzle-zod
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/aigypt/` — React frontend (pages, components, hooks)
- `artifacts/api-server/` — Express API server
- `lib/db/` — Drizzle schema and DB client (`DATABASE_URL`)
- `lib/api-spec/` — OpenAPI spec (source of truth for API contracts)
- `lib/api-zod/` — generated Zod schemas
- `lib/api-client-react/` — generated React Query hooks
- `scripts/` — post-merge and utility scripts

## Environment Variables

- `DATABASE_URL` — Replit built-in PostgreSQL (auto-provisioned, no setup needed)
- `SESSION_SECRET` — JWT/session signing secret
- `VITE_WA_NUMBER` / `ADMIN_WA_NUMBER` — WhatsApp contact numbers (set in .replit)
- `MIDTRANS_IS_PRODUCTION` / `VITE_MIDTRANS_IS_PRODUCTION` — Midtrans mode (set in .replit)
- `PREVIEW_CODE` — Preview access code (set in .replit)
- `MASTER_ACCESS_CODE` — Master admin access code (set in .replit)
- `ADMIN_PASSWORD` — Admin panel password (not yet set; admin endpoints disabled until set)

## Architecture decisions

- Originally used Supabase; migrated to Replit's built-in PostgreSQL. `DATABASE_URL` replaces `SUPABASE_DATABASE_URL` in `lib/db/`.
- Drizzle ORM handles schema — run `pnpm --filter @workspace/db run push` after schema changes.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Workflows must explicitly pass `PORT` (not inherited from artifact.toml in custom workflow config): frontend uses `PORT=22064`, API uses `PORT=8080`.
- `ADMIN_PASSWORD` env var must be set to enable admin endpoints.
- Do not use `SUPABASE_DATABASE_URL` anywhere — the project now uses Replit's `DATABASE_URL`.
