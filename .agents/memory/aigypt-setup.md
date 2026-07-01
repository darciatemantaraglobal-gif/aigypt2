---
name: AIGYPT project setup
description: Key decisions and gotchas for running the AIGYPT project on Replit.
---

## Database
Proyek ini tetap menggunakan Supabase. `SUPABASE_DATABASE_URL` diset sebagai Replit Secret.
DB client ada di `lib/db/src/index.ts` dan drizzle config di `lib/db/drizzle.config.ts`.

**Why:** User ingin tetap pakai Supabase, bukan Replit built-in PostgreSQL.

## Workflow PORT injection
Artifact-managed workflows tidak otomatis inject `PORT`. Harus eksplisit di command:
- Frontend: `PORT=22064 pnpm --filter @workspace/aigypt run dev`
- API: `PORT=8080 pnpm --filter @workspace/api-server run dev`

**Why:** `[services.env]` di artifact.toml hanya berlaku untuk Replit-managed workflow, bukan custom `configureWorkflow`.

## Admin panel
`ADMIN_PASSWORD` env var harus diset di Replit Secrets untuk mengaktifkan admin API endpoints.

## Security note (pre-existing)
`MASTER_ACCESS_CODE` dan `PREVIEW_CODE` tersimpan di `.replit` `[userenv.shared]` — bukan di Secrets.
