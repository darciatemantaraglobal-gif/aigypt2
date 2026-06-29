---
name: AIGYPT Routing Restructure
description: Navigation architecture after multi-class routing overhaul — class catalog as primary entry point, materi nested under kelas.
---

## Route structure (current)
```
/                        → home (public)
/login                   → login → redirects to /kelas on success
/kelas                   → catalog Netflix-style (auth required)
/kelas/:kelasId          → class detail hub (kelas-detail.tsx)
/kelas/:kelasId/materi/:sesi → materi slide+scroll player (materi/index.tsx)
/dashboard               → "Belajar Saya" progress overview
/materi/:sesi            → REDIRECT to /kelas/maksimalkan-ai/materi/:sesi
/kurikulum               → still accessible (standalone curriculum page)
```

## Key decisions
- `/kelas` is now the post-login landing (not `/dashboard`)
- `/dashboard` stays as "Belajar Saya" — not removed, renamed in navbar
- Old `/materi/:sesi` routes redirect via `MateriRedirect` component in App.tsx (backward compat)
- Materi for unknown/coming-soon kelasId → redirect to `/kelas/:kelasId` instead of 404/null

## Progress scoping
- DB: `materi_progress` now has `kelas_id` column (varchar, default 'maksimalkan-ai') + unique index on (member_email, kelas_id, sesi_number)
- API: all progress routes accept optional `kelasId` in body/query, default to 'maksimalkan-ai'
- Frontend: progress filtered client-side by kelasId (`!p.kelasId || p.kelasId === kelasId`)
- Old rows (no kelas_id) treated as 'maksimalkan-ai' data — backward compatible

## Content registry
- `materiByKelas: Record<string, SesiMateri[]>` in lib/materiContent.ts
- Only 'maksimalkan-ai' has full 6-sesi content
- Add new classes to this record as content becomes available

**Why:** Multi-class expansion — was built for single class, now architected for N classes.
