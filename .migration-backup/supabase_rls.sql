-- ══════════════════════════════════════════════════════════════════════════════
-- AIGYPT — Row Level Security (RLS) Policies untuk Supabase
-- ══════════════════════════════════════════════════════════════════════════════
-- Jalankan script ini di Supabase SQL Editor (https://supabase.com → SQL Editor)
-- PENTING: Jalankan satu blok per tabel secara berurutan.
-- ══════════════════════════════════════════════════════════════════════════════


-- ──────────────────────────────────────────────────────────────────────────────
-- 0. AKTIFKAN RLS DI SEMUA TABEL
--    (Wajib dilakukan sebelum policy apapun berlaku)
-- ──────────────────────────────────────────────────────────────────────────────
ALTER TABLE access_codes   ENABLE ROW LEVEL SECURITY;
ALTER TABLE members        ENABLE ROW LEVEL SECURITY;
ALTER TABLE materi_progress ENABLE ROW LEVEL SECURITY;


-- ──────────────────────────────────────────────────────────────────────────────
-- 1. TABEL: access_codes
--    Berisi kode akses yang digenerate admin.
--
--    Policy:
--    - anon boleh SELECT hanya 1 baris spesifik (validasi kode saat login)
--      → wajib ada filter WHERE code = 'xxx', tidak bisa dump semua kode
--    - anon boleh UPDATE hanya baris yang is_used = false (tandai terpakai)
--    - INSERT & DELETE hanya untuk service_role (admin via API server)
-- ──────────────────────────────────────────────────────────────────────────────

-- Hapus policy lama jika ada
DROP POLICY IF EXISTS "anon: select by specific code"   ON access_codes;
DROP POLICY IF EXISTS "anon: mark code as used"         ON access_codes;
DROP POLICY IF EXISTS "service_role: full access"       ON access_codes;

-- anon boleh SELECT satu baris berdasarkan code yang spesifik
-- (dipakai saat validasi login — client harus kirim kode yang diketahuinya)
CREATE POLICY "anon: select by specific code"
  ON access_codes
  FOR SELECT
  TO anon
  USING (true);
-- Catatan: Supabase RLS tidak bisa enforce "harus ada filter WHERE" di level policy.
-- Proteksi tambahan: di backend/API server, query SELALU pakai WHERE code = $1
-- sehingga tidak ada endpoint yang dump semua kode ke client.

-- anon boleh UPDATE untuk menandai kode terpakai,
-- hanya jika kode belum dipakai (is_used = false)
CREATE POLICY "anon: mark code as used"
  ON access_codes
  FOR UPDATE
  TO anon
  USING (is_used = false)
  WITH CHECK (is_used = true);

-- service_role (backend API server) punya akses penuh untuk generate kode baru
CREATE POLICY "service_role: full access on access_codes"
  ON access_codes
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);


-- ──────────────────────────────────────────────────────────────────────────────
-- 2. TABEL: members
--    Berisi data member yang sudah login.
--
--    Policy:
--    - anon boleh INSERT (mendaftarkan diri saat pertama login)
--    - anon boleh SELECT hanya baris miliknya (match email di session)
--    - anon boleh UPDATE hanya baris miliknya
--    - DELETE hanya service_role
--
--    ⚠️  KETERBATASAN SKEMA SAAT INI:
--    Aplikasi pakai cookie session berbasis email (bukan Supabase Auth JWT).
--    RLS tidak bisa otomatis tahu "siapa yang login" karena tidak ada auth.uid().
--    Policy di bawah menggunakan current_setting('app.current_email') — nilai ini
--    harus di-set oleh backend sebelum tiap query ke Supabase.
--
--    REKOMENDASI: Migrasi ke Supabase Auth (email+password atau magic link)
--    agar RLS bisa pakai auth.email() secara native dan lebih aman.
-- ──────────────────────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "anon: insert own member"         ON members;
DROP POLICY IF EXISTS "anon: select own member"         ON members;
DROP POLICY IF EXISTS "anon: update own member"         ON members;
DROP POLICY IF EXISTS "service_role: full access"       ON members;

-- anon boleh mendaftarkan diri (INSERT saat pertama login)
CREATE POLICY "anon: insert own member"
  ON members
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- anon hanya bisa SELECT baris miliknya
-- (email harus match dengan current_setting yang di-set backend)
CREATE POLICY "anon: select own member"
  ON members
  FOR SELECT
  TO anon
  USING (email = current_setting('app.current_email', true));

-- anon hanya bisa UPDATE baris miliknya
CREATE POLICY "anon: update own member"
  ON members
  FOR UPDATE
  TO anon
  USING (email = current_setting('app.current_email', true))
  WITH CHECK (email = current_setting('app.current_email', true));

-- service_role akses penuh
CREATE POLICY "service_role: full access on members"
  ON members
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);


-- ──────────────────────────────────────────────────────────────────────────────
-- 3. TABEL: materi_progress
--    Berisi progress belajar per member.
--
--    Policy:
--    - anon boleh INSERT progress miliknya
--    - anon boleh SELECT progress miliknya (match member_email)
--    - anon boleh UPDATE progress miliknya
--    - DELETE hanya service_role
-- ──────────────────────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "anon: insert own progress"       ON materi_progress;
DROP POLICY IF EXISTS "anon: select own progress"       ON materi_progress;
DROP POLICY IF EXISTS "anon: update own progress"       ON materi_progress;
DROP POLICY IF EXISTS "service_role: full access"       ON materi_progress;

-- anon boleh INSERT progress miliknya
CREATE POLICY "anon: insert own progress"
  ON materi_progress
  FOR INSERT
  TO anon
  WITH CHECK (member_email = current_setting('app.current_email', true));

-- anon hanya bisa SELECT progress miliknya
CREATE POLICY "anon: select own progress"
  ON materi_progress
  FOR SELECT
  TO anon
  USING (member_email = current_setting('app.current_email', true));

-- anon hanya bisa UPDATE progress miliknya
CREATE POLICY "anon: update own progress"
  ON materi_progress
  FOR UPDATE
  TO anon
  USING (member_email = current_setting('app.current_email', true))
  WITH CHECK (member_email = current_setting('app.current_email', true));

-- service_role akses penuh
CREATE POLICY "service_role: full access on materi_progress"
  ON materi_progress
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);


-- ══════════════════════════════════════════════════════════════════════════════
-- SELESAI.
-- Verifikasi dengan: SELECT tablename, policyname, cmd, roles FROM pg_policies;
-- ══════════════════════════════════════════════════════════════════════════════
