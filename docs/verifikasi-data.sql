-- ══════════════════════════════════════════════════════════════════════════
-- AIGYPT — Query verifikasi data
-- Jalankan di Supabase SQL Editor: https://supabase.com → SQL Editor
-- ══════════════════════════════════════════════════════════════════════════


-- ── 1. Semua member beserta kode akses dan tipe member ────────────────────
SELECT
  m.id,
  m.name,
  m.email,
  m.member_type,
  m.created_at,
  ac.code        AS kode_akses,
  ac.is_used     AS kode_sudah_dipakai
FROM members m
LEFT JOIN access_codes ac ON ac.member_id = m.id
ORDER BY m.created_at DESC;


-- ── 2. Semua order beserta statusnya ─────────────────────────────────────
SELECT
  order_id,
  name,
  email,
  member_type,
  batch_number,
  status,
  access_code,
  created_at
FROM orders
ORDER BY created_at DESC;


-- ── 3. Kode akses yang belum terpakai ────────────────────────────────────
SELECT
  ac.id,
  ac.code,
  ac.member_type,
  ac.created_at,
  m.name   AS nama_member,
  m.email  AS email_member
FROM access_codes ac
LEFT JOIN members m ON m.id = ac.member_id
WHERE ac.is_used = false
ORDER BY ac.created_at DESC;


-- ── 4. Member yang tidak punya order berstatus 'paid' ────────────────────
-- ⚠️  PENTING: Login di aplikasi AIGYPT membaca dari tabel `orders` dengan
-- status = 'paid', BUKAN dari tabel `members`. Member yang ada di tabel
-- `members` tapi tidak punya order paid TIDAK BISA LOGIN, meski datanya ada.
-- Query ini mendeteksi kasus itu.
SELECT
  m.id,
  m.name,
  m.email,
  m.member_type,
  m.created_at,
  o.order_id   AS order_id_paid,
  o.status     AS status_order
FROM members m
LEFT JOIN orders o
  ON o.email = m.email
  AND o.status = 'paid'
WHERE o.order_id IS NULL
ORDER BY m.created_at DESC;
-- Kalau query ini mengembalikan baris, member-member itu tidak bisa login.
-- Solusinya: buat baris di tabel `orders` dengan status = 'paid' dan
-- access_code yang sesuai untuk mereka.


-- ── 5. Cek member yang kode aksesnya tidak punya pasangan di access_codes ─
-- (foreign key integrity check)
SELECT
  m.id,
  m.name,
  m.email,
  ac.code      AS kode_akses,
  ac.id        AS access_code_id
FROM members m
LEFT JOIN access_codes ac ON ac.member_id = m.id
WHERE ac.id IS NULL
ORDER BY m.created_at DESC;
-- Kalau ada baris di sini, member tersebut tidak punya entri di access_codes
-- padahal seharusnya punya. Ini perlu investigasi lebih lanjut.


-- ── 6. Ringkasan cepat status keseluruhan ────────────────────────────────
SELECT
  (SELECT COUNT(*) FROM members)                              AS total_member,
  (SELECT COUNT(*) FROM orders WHERE status = 'paid')        AS total_order_paid,
  (SELECT COUNT(*) FROM orders WHERE status != 'paid')       AS total_order_belum_paid,
  (SELECT COUNT(*) FROM access_codes WHERE is_used = false)  AS kode_akses_tersisa,
  (SELECT COUNT(*) FROM materi_progress WHERE is_completed = true) AS sesi_selesai;
