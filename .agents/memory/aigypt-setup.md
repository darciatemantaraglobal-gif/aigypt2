---
name: AIGYPT project setup
description: Key decisions and gotchas from migrating AIGYPT from Supabase to Replit PostgreSQL and getting workflows running.
---

## DB migration
Originally used `SUPABASE_DATABASE_URL`; migrated to Replit's built-in `DATABASE_URL` in `lib/db/drizzle.config.ts` and `lib/db/src/index.ts`. Non-runtime Supabase references (toolboxData.ts static URL, replit.md notes) are intentionally left as-is.

**Why:** Replit's built-in PostgreSQL is preferred; Supabase account/keys not available in this environment.

## Workflow PORT injection
Artifact-managed workflows don't automatically inject `PORT` when configured via `configureWorkflow`. Must explicitly pass it in the command:
- Frontend: `PORT=22064 pnpm --filter @workspace/aigypt run dev`
- API: `PORT=8080 pnpm --filter @workspace/api-server run dev`

**Why:** The artifact.toml `[services.env]` PORT only applies to Replit-managed artifact service workflows, not custom `configureWorkflow` calls.

## Admin panel
`ADMIN_PASSWORD` env var must be set in Replit Secrets to enable admin API endpoints. Currently unset; server logs a warning on startup.

## Security note (pre-existing)
`MASTER_ACCESS_CODE` and `PREVIEW_CODE` are stored in `.replit` `[userenv.shared]` — not in Secrets. This is a pre-existing pattern; treat as potentially exposed.
