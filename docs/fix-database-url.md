# Panduan: Memperbaiki DATABASE_URL ke Session Pooler

> **Konteks masalah:** Vercel tidak bisa menjangkau host Direct Connection Supabase
> (`db.*.supabase.co`) karena host tersebut hanya punya alamat IPv6, sedangkan
> runtime serverless Vercel hanya mendukung IPv4. Solusinya adalah mengganti
> `DATABASE_URL` ke Session Pooler yang berjalan di IPv4.

---

## Cara membedakan Direct Connection vs Session Pooler (dalam 1 detik)

| | Direct Connection ❌ | Session Pooler ✅ |
|---|---|---|
| **Host** | `db.xxxx.supabase.co` | `aws-0-ap-southeast-1.pooler.supabase.com` |
| **Port** | `5432` | `5432` (mode session) |
| **Bisa Vercel?** | ❌ IPv6 saja | ✅ IPv4 |

Ciri paling cepat: kalau host-nya mengandung **`pooler.supabase.com`**, itu yang benar.
Kalau mengandung **`db.`** di awal dan **`.supabase.co`** di akhir, itu yang salah.

---

## Langkah 1 — Ambil connection string Session Pooler dari Supabase

1. Buka [https://supabase.com](https://supabase.com) → login → pilih project AIGYPT.
2. Klik menu **"Project Settings"** di sidebar kiri (ikon gerigi).
3. Klik sub-menu **"Database"**.
4. Scroll ke bagian **"Connection string"**.
5. Di sana ada dua tab: **"URI"** dan beberapa mode. Pilih mode **"Session"** (bukan "Transaction").
6. Salin connection string-nya. Bentuknya seperti ini:
   ```
   postgresql://postgres.xxxx:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres
   ```
7. **Ganti `[YOUR-PASSWORD]` dengan password database Anda** (bukan password akun Supabase).
   Password database ada di halaman yang sama, bagian "Database password". Kalau lupa,
   klik "Reset database password" untuk membuat yang baru.

> ⚠️ **Jangan salin spasi** di awal atau akhir string. Salin dengan tepat.

---

## Langkah 2 — Ganti DATABASE_URL di Vercel

1. Buka [https://vercel.com](https://vercel.com) → login → pilih project AIGYPT.
2. Klik tab **"Settings"** (di bagian atas halaman project).
3. Klik menu **"Environment Variables"** di sidebar kiri.
4. Cari variable bernama **`DATABASE_URL`**.
   - ⚠️ Pastikan Anda mengedit `DATABASE_URL`, **bukan** `SUPABASE_URL` — keduanya berbeda.
5. Klik tombol edit (ikon pensil) di sebelah `DATABASE_URL`.
6. Hapus nilai lama, lalu tempelkan connection string Session Pooler yang sudah Anda salin.
7. Di bagian **"Environment"**, pastikan **"Production" dicentang**.
   Kalau perlu juga di Preview dan Development, centang keduanya.
8. Klik **"Save"**.

---

## Langkah 3 — Redeploy DENGAN cache dimatikan (WAJIB)

> ⚠️ **Ini langkah yang paling sering dilupakan.** Mengubah environment variable
> di Vercel **tidak otomatis** mengaktifkannya. Anda harus redeploy.

1. Di halaman project Vercel, klik tab **"Deployments"**.
2. Cari deployment terakhir (paling atas).
3. Klik tombol **"..."** (titik tiga) di sebelah kanan deployment tersebut.
4. Pilih **"Redeploy"**.
5. Di dialog yang muncul, **centang "Use existing Build Cache" → matikan** (atau pilih
   "Redeploy without cache" jika ada opsi itu).
6. Klik **"Redeploy"**.
7. Tunggu sampai status berubah menjadi **"Ready"** (biasanya 1–3 menit).

---

## Langkah 4 — Verifikasi berhasil

Buka browser dan akses:
```
https://www.aigypt.id/api/healthz
```

Response yang benar terlihat seperti ini:
```json
{
  "status": "ok",
  "environmentVariables": {
    "DATABASE_URL": { "ada": true, "host": "aws-0-ap-southeast-1.pooler.supabase.com" }
  },
  "diagnosisDatabase": {
    "status": "ok",
    "message": "✅ Host sudah menggunakan Session Pooler..."
  },
  "pingDatabase": {
    "berhasil": true,
    "pesan": "✅ Query SELECT 1 berhasil. Database bisa dijangkau."
  }
}
```

Kalau `pingDatabase.berhasil` adalah `true`, semuanya sudah benar.

---

## Kesalahan umum yang harus dihindari

| Kesalahan | Akibat |
|---|---|
| Mengedit `SUPABASE_URL` bukan `DATABASE_URL` | `DATABASE_URL` tidak berubah, masalah tetap ada |
| Lupa mengganti `[YOUR-PASSWORD]` di connection string | Koneksi gagal dengan error autentikasi |
| Ada spasi tersembunyi di awal/akhir string | DNS gagal resolve karena nama host jadi salah |
| Tidak redeploy setelah mengganti env var | Perubahan tidak aktif, masalah tetap ada |
| Redeploy dengan cache aktif | Kadang env var lama masih terbawa |
| Memakai mode "Transaction" bukan "Session" | Error `prepared statement` karena pooler transaction tidak support prepared statements |
