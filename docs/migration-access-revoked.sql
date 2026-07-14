-- ══════════════════════════════════════════════════════════════════════════
-- AIGYPT — Migration: kolom access_revoked di tabel members & orders
-- ══════════════════════════════════════════════════════════════════════════
-- WAJIB dijalankan MANUAL di Supabase SQL Editor (https://supabase.com →
-- SQL Editor) SEBELUM/SEGERA setelah fitur "Cabut Akses" live di production.
-- Migration di project ini tidak pernah berjalan otomatis.
--
-- Kenapa ini bikin login & /api/auth/me error 500 di production sekarang:
-- kode di api/auth/[...path].ts dan api/_lib/memberAuth.ts sudah query
-- kolom `access_revoked` di tabel `orders` dan `members` untuk fitur cabut
-- akses. Kolom ini belum pernah ditambahkan ke database production, jadi
-- SETIAP query yang menyentuhnya (termasuk login & pengecekan sesi di
-- /api/auth/me) gagal dengan error "column access_revoked does not exist"
-- dan direspons sebagai 500 Internal Server Error.
--
-- Jalankan satu per satu.
-- ══════════════════════════════════════════════════════════════════════════

-- 1. Tambah kolom access_revoked di kedua tabel (default false, supaya semua
--    member/order lama otomatis dianggap aktif/tidak dicabut).
ALTER TABLE members ADD COLUMN IF NOT EXISTS access_revoked BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS access_revoked BOOLEAN NOT NULL DEFAULT false;

-- 2. Verifikasi kolom sudah ada dan semua baris default false:
SELECT count(*) AS total, count(*) FILTER (WHERE access_revoked) AS revoked FROM members;
SELECT count(*) AS total, count(*) FILTER (WHERE access_revoked) AS revoked FROM orders;

-- ══════════════════════════════════════════════════════════════════════════
-- SELESAI. Setelah ini, login & /api/auth/me di production harus normal lagi.
-- ══════════════════════════════════════════════════════════════════════════
