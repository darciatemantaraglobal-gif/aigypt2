-- ══════════════════════════════════════════════════════════════════════════
-- AIGYPT — Migration: kolom username di tabel members
-- ══════════════════════════════════════════════════════════════════════════
-- WAJIB dijalankan MANUAL di Supabase SQL Editor SEBELUM deployment yang
-- berisi fitur "Edit Member" dan "Tambah Member" versi baru live di
-- production. Kode baru menulis ke kolom `username` — kalau kolom ini belum
-- ada, endpoint create/update/list member akan gagal dengan error
-- "column username does not exist".
--
-- Jalankan satu per satu.
-- ══════════════════════════════════════════════════════════════════════════

-- 1. Tambah kolom username (nullable dulu, supaya tidak gagal untuk baris lama)
ALTER TABLE members ADD COLUMN IF NOT EXISTS username TEXT;

-- 2. Backfill baris lama yang belum punya username, diambil dari bagian
--    depan email (sebelum tanda @), dibersihkan dari karakter selain
--    huruf/angka/underscore.
UPDATE members
SET username = regexp_replace(split_part(email, '@', 1), '[^a-zA-Z0-9_]', '', 'g')
WHERE username IS NULL OR username = '';

-- 3. (Opsional tapi disarankan) Pastikan username unik. Cek dulu apakah ada
--    duplikat sebelum menambahkan constraint:
SELECT username, COUNT(*) FROM members GROUP BY username HAVING COUNT(*) > 1;

-- 4. Kalau langkah 3 tidak menghasilkan baris (tidak ada duplikat), boleh
--    tambahkan unique constraint:
-- ALTER TABLE members ADD CONSTRAINT members_username_unique UNIQUE (username);

-- ══════════════════════════════════════════════════════════════════════════
-- SELESAI.
-- ══════════════════════════════════════════════════════════════════════════
