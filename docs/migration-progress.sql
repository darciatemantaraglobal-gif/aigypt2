-- ══════════════════════════════════════════════════════════════════════════
-- AIGYPT — Migration: unique constraint untuk materi_progress
-- ══════════════════════════════════════════════════════════════════════════
-- WAJIB dijalankan MANUAL di Supabase SQL Editor (https://supabase.com →
-- SQL Editor). Migration di project ini tidak pernah berjalan otomatis.
--
-- Kenapa: endpoint /api/progress, /api/progress/step, dan /api/progress/skip
-- perlu upsert idempoten per (member_email, kelas_id, sesi_number). Saat ini
-- kode memakai upsert manual (SELECT lalu UPDATE/INSERT) karena belum bisa
-- dipastikan constraint ini sudah ada. Setelah migration ini dijalankan,
-- logika upsert manual di api/progress/[...path].ts BISA (opsional, tidak
-- wajib) disederhanakan menjadi INSERT ... ON CONFLICT ... DO UPDATE.
--
-- Jalankan satu per satu, periksa hasilnya sebelum lanjut ke baris berikut.
-- ══════════════════════════════════════════════════════════════════════════

-- 1. Cek dulu apakah constraint ini sudah ada (jika hasilnya ada baris,
--    berarti sudah ada dan migration ini TIDAK perlu dijalankan):
SELECT conname
FROM pg_constraint
WHERE conrelid = 'materi_progress'::regclass
  AND contype = 'u';

-- 2. Jika belum ada, hapus dulu kemungkinan duplikat baris lama
--    (member_email, kelas_id, sesi_number) yang sama sebelum menambah
--    constraint, karena constraint akan gagal dibuat kalau ada duplikat:
DELETE FROM materi_progress a USING materi_progress b
WHERE a.id < b.id
  AND a.member_email = b.member_email
  AND a.kelas_id = b.kelas_id
  AND a.sesi_number = b.sesi_number;

-- 3. Tambahkan unique constraint:
ALTER TABLE materi_progress
  ADD CONSTRAINT materi_progress_member_kelas_sesi_unique
  UNIQUE (member_email, kelas_id, sesi_number);

-- ══════════════════════════════════════════════════════════════════════════
-- SELESAI. Verifikasi dengan query di langkah 1 lagi — sekarang harus
-- muncul "materi_progress_member_kelas_sesi_unique".
-- ══════════════════════════════════════════════════════════════════════════
