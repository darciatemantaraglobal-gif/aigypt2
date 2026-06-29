# SESI 05 — "Lo Bisa Bikin Aplikasi Sendiri"
## Tema: Vibe Coding — Dari Masalah ke Produk

> **Durasi:** 60 menit  
> **Level:** Semua level — tidak butuh pengalaman coding sama sekali  
> **Output sesi ini:** Peserta paham konsep vibe coding, sudah coba minimal satu tools, dan punya ide solusi yang akan mereka bangun di Sesi 6

---

## 🎯 Tujuan Sesi

Setelah sesi ini, peserta akan:
- Paham apa itu **vibe coding** dan kenapa ini mengubah segalanya
- Bisa pakai **Lovable / Bolt / v0** untuk bikin web app dari deskripsi biasa
- Bisa minta AI **generate script/kode** yang langsung bisa dijalankan
- Punya **ide solusi konkret** yang siap dibangun di Demo Day

---

## 📖 Materi Lengkap

---

### BAGIAN 1 — Review Take-Home Sesi 4

Mentor buka dengan:

> *"Siapa yang berhasil bikin konten atau materi promosi dari A sampai Z pakai AI? Berapa lama totalnya?"*

Kalau ada yang share hasilnya — tampilkan. Ini bukti nyata bahwa prosesnya bisa dipercepat drastis.

Kemudian bridge ke sesi ini dengan pertanyaan yang menggelitik:

> *"Sejauh ini kita pakai AI untuk bantu tugas yang sudah ada. Sekarang pertanyaannya: bagaimana kalau kita pakai AI untuk bikin sesuatu yang belum ada — sesuatu yang lo sendiri butuhkan tapi tidak ada yang jual?"*

---

### BAGIAN 2 — Mindset Shift: Lo Bukan Programmer, Lo Problem-Solver

Ini momen paling penting di seluruh sesi.

Selama ini ada tembok mental yang besar:

> *"Bikin aplikasi? Itu kan butuh bisa coding. Butuh bertahun-tahun belajar. Itu bukan buat saya."*

**Tembok itu sudah runtuh.**

Bukan karena coding jadi mudah. Tapi karena sekarang **lo tidak perlu coding untuk bikin aplikasi.**

Yang lo butuhkan adalah:
- ✅ Kemampuan mendeskripsikan masalah dengan jelas
- ✅ Kemampuan menjelaskan solusi yang lo bayangkan
- ✅ Kemampuan mengevaluasi apakah hasilnya sesuai
- ✅ Kemampuan iterate — coba, perbaiki, coba lagi

**Semua itu bukan skill teknis. Itu skill manusia.**

Dan lo sudah melatih semua itu sejak Sesi 1.

---

#### Apa itu Vibe Coding?

Istilah ini dipopulerkan oleh Andrej Karpathy — salah satu peneliti AI terkemuka di dunia. Definisinya sederhana:

> **Vibe coding adalah proses membangun software dengan mendeskripsikan apa yang lo mau dalam bahasa manusia, dan membiarkan AI yang menulis kodenya.**

Lo tidak perlu tahu Python. Tidak perlu tahu JavaScript. Tidak perlu tahu database.

Lo cukup tahu: **masalah apa yang mau lo selesaikan.**

**Analogi yang tepat untuk masisir:**

> Bayangkan lo mau bangun rumah. Dua pilihan:
> 1. Belajar jadi tukang batu, tukang kayu, tukang listrik — bertahun-tahun
> 2. Jadi arsitek — gambar blueprint, jelaskan ke kontraktor, kontraktor yang bangun
>
> Vibe coding membuat lo jadi **arsitek software**, bukan tukang kodenya.

---

### BAGIAN 3 — Tiga Jalur Vibe Coding

Ada tiga jalur utama yang bisa lo pilih tergantung jenis solusi yang mau lo bangun:

```
JALUR 1: Web App (Lovable / Bolt / v0)
→ Untuk: aplikasi yang bisa dibuka di browser
→ Output: website/app yang bisa dishare via link
→ Skill yang dibutuhkan: bisa nulis deskripsi

JALUR 2: Script Otomatis (Claude/ChatGPT → Replit)
→ Untuk: otomatisasi tugas berulang, tools sederhana
→ Output: kode Python/JS yang bisa dijalankan
→ Skill yang dibutuhkan: bisa copy-paste dan klik Run

JALUR 3: Workflow Automation (n8n / Make)
→ Untuk: menghubungkan berbagai apps secara otomatis
→ Output: workflow yang jalan sendiri tanpa intervensi
→ Skill yang dibutuhkan: bisa drag-drop dan konfigurasi
```

---

### BAGIAN 4 — JALUR 1: Web App dengan Lovable / Bolt / v0

Ini jalur yang paling visual dan paling "wow" untuk di-demo.

#### Tools yang tersedia:

| Tools | URL | Keunggulan | Gratis? |
|---|---|---|---|
| Lovable | lovable.dev | Paling mudah, output langsung deploy | Ada free tier |
| Bolt | bolt.new | Cepat, support banyak framework | Ada free tier |
| v0 | v0.dev (by Vercel) | Bagus untuk UI komponen | Ada free tier |

#### Cara kerja Lovable (paling recommended untuk pemula):

```
1. Buka lovable.dev
2. Daftar akun (gratis)
3. Klik "New Project"
4. Deskripsikan aplikasi yang lo mau dalam bahasa biasa
5. Lovable generate kode + tampilan langsung
6. Lo bisa minta revisi dalam bahasa biasa
7. Klik "Publish" — dapat link yang bisa dishare
```

#### Contoh prompt ke Lovable untuk masisir:

**Contoh 1 — Untuk Akademisi:**
```
Buat web app sederhana untuk mahasiswa Al-Azhar Kairo.
Fitur utama:
- Input teks Arab dari kitab
- Tombol "Terjemahkan & Jelaskan"
- Output: terjemahan Indonesia + penjelasan kosakata kunci
- Tampilan bersih, mobile-friendly
- Warna hijau dan putih, nuansa Islami
```

**Contoh 2 — Untuk Organisator:**
```
Buat aplikasi manajemen kepanitiaan sederhana.
Fitur:
- Input daftar tugas dan penanggung jawab (PIC)
- Deadline per tugas
- Status: Belum / Proses / Selesai
- Bisa diakses dari HP tanpa login
- Tampilan tabel yang bersih dan mudah diupdate
```

**Contoh 3 — Untuk Bisnisman:**
```
Buat katalog produk online sederhana untuk jualan online.
Fitur:
- Tampilan grid produk dengan foto, nama, harga
- Filter berdasarkan kategori
- Tombol "Order via WhatsApp" yang langsung buka WA
- Halaman "Tentang Toko" 
- Mobile-first design
- Warna yang bisa dikustomisasi
```

**Contoh 4 — Untuk Konten Kreator:**
```
Buat content idea generator untuk kreator konten Muslim Indonesia.
Fitur:
- Input: niche/topik dan platform (TikTok/Instagram/YouTube)
- Output: 10 ide konten dengan hook dan poin utama
- Tombol "Generate Lagi" untuk ide baru
- Tombol copy untuk setiap ide
- Tampilan modern, dark mode
```

#### Cara iterate (memperbaiki hasil):

Setelah Lovable generate versi pertama, lo bisa langsung minta revisi dalam bahasa biasa:

```
"Ubah warna tombol utama jadi hijau tua"
"Tambahkan kolom 'catatan' di setiap baris tabel"  
"Buat teksnya lebih besar di mobile"
"Pindahkan menu navigasi ke bawah layar"
"Tambahkan animasi loading saat tombol diklik"
```

**Ini adalah inti vibe coding** — lo tidak perlu tahu cara kode untuk mengubah tampilan atau fungsi. Lo cukup deskripsikan apa yang lo mau.

---

### BAGIAN 5 — JALUR 2: Script Otomatis via Claude → Replit

Jalur ini untuk lo yang butuh **otomatisasi tugas berulang** — bukan web app, tapi tools yang berjalan di balik layar.

#### Cara kerjanya:

```
1. Ceritakan masalah lo ke Claude
2. Minta Claude generate script Python/JavaScript
3. Copy kode yang dihasilkan
4. Buka replit.com → New Repl → pilih bahasa
5. Paste kode → klik Run
6. Selesai — tools lo jalan
```

#### Contoh use case masisir:

**Contoh 1 — Auto-formatter makalah:**
```
Saya sering dapat file Word makalah yang formatnya 
berantakan — spasi tidak konsisten, font berbeda-beda, 
margin tidak seragam.

Buatkan script Python yang:
- Membaca file .docx
- Otomatis rapikan: font Times New Roman 12pt, 
  spasi 1.5, margin 3cm semua sisi
- Simpan sebagai file baru dengan nama "_formatted"

Sertakan instruksi cara menjalankannya 
untuk orang yang tidak bisa coding.
```

**Contoh 2 — Pengingat jadwal organisasi:**
```
Buatkan script Python sederhana yang:
- Membaca daftar deadline dari file teks (.txt)
- Setiap pagi jam 7 kirim notifikasi WhatsApp 
  (via WhatsApp API atau alternatifnya) 
  berisi deadline yang kurang dari 3 hari
- Format pesan: "⚠️ REMINDER: [nama tugas] deadline [tanggal]"

Kalau WhatsApp API kompleks, alternatifnya 
kirim ke Telegram saja.
```

**Contoh 3 — Caption generator batch:**
```
Buatkan script Python yang:
- Membaca daftar produk dari file Excel 
  (kolom: nama produk, harga, deskripsi singkat)
- Untuk setiap produk, generate caption Instagram 
  menggunakan Claude API
- Simpan semua caption ke file Excel baru

Ini untuk toko online saya yang punya 50+ produk 
dan butuh caption semuanya.
```

#### Cara minta kode yang bisa langsung jalan:

```
Buatkan script [bahasa: Python/JavaScript] untuk [jelaskan masalah].

Requirements:
- [requirement 1]
- [requirement 2]
- [requirement 3]

Pastikan:
1. Kode lengkap dan bisa langsung dijalankan
2. Ada komentar penjelasan di setiap bagian penting
3. Sertakan instruksi instalasi library yang dibutuhkan
4. Sertakan contoh cara menjalankannya
5. Kalau ada error yang mungkin muncul, jelaskan cara mengatasinya

Saya tidak bisa coding, jadi jelaskan semuanya 
seperti menjelaskan ke orang awam.
```

---

### BAGIAN 6 — JALUR 3: Workflow Automation dengan n8n / Make

Jalur ini untuk lo yang mau **menghubungkan berbagai aplikasi** secara otomatis — tanpa kode sama sekali, cukup drag-drop.

#### Tools:

| Tools | URL | Keunggulan |
|---|---|---|
| n8n | n8n.io | Open source, bisa self-host gratis |
| Make | make.com | Interface paling mudah, ada free tier |
| Zapier | zapier.com | Paling populer, tapi lebih mahal |

#### Contoh workflow automation untuk masisir:

**Workflow 1 — Auto post konten:**
```
Trigger: Setiap Senin jam 9 pagi
→ Ambil ide konten dari Google Sheets
→ Generate caption dengan ChatGPT
→ Post otomatis ke Instagram + Twitter
→ Kirim notifikasi ke WhatsApp pribadi
```

**Workflow 2 — Monitor pesanan bisnis:**
```
Trigger: Ada pesan masuk di Instagram DM
→ Cek apakah pesan mengandung kata "order" atau "pesan"
→ Kalau iya: kirim template balasan otomatis
→ Tambahkan ke Google Sheets sebagai lead baru
→ Kirim notifikasi ke HP lo
```

**Workflow 3 — Notulensi otomatis:**
```
Trigger: File audio baru di-upload ke Google Drive
→ Transkripsi dengan Whisper API
→ Buat ringkasan dan action items dengan Claude
→ Simpan ke Google Docs
→ Kirim ke grup WhatsApp panitia
```

#### Cara mulai dengan Make (paling mudah):

```
1. Daftar di make.com (gratis)
2. Klik "Create a new scenario"
3. Pilih trigger (pemicu) — misal: "Gmail" atau "Google Sheets"
4. Tambah action (aksi) — apa yang terjadi setelah trigger
5. Konfigurasi koneksi antar apps
6. Klik "Run once" untuk test
7. Aktifkan scheduling untuk jalan otomatis
```

---

### BAGIAN 7 — Peta Solusi: Masalah Masisir → Solusi yang Bisa Dibangun

Ini referensi untuk peserta memilih proyek Demo Day mereka:

| Persona | Masalah | Solusi | Jalur | Tools |
|---|---|---|---|---|
| 🎓 Akademisi | Susah terjemah kitab | Web app terjemah kitab Arab | Jalur 1 | Lovable |
| 🎓 Akademisi | Format makalah berantakan | Script auto-formatter | Jalur 2 | Claude → Replit |
| 🎓 Akademisi | Cari referensi lama | Web app pencari referensi kitab | Jalur 1 | Lovable |
| 🏛️ Organisator | Notulensi rapat manual | Workflow auto-notulensi | Jalur 3 | Make + Whisper |
| 🏛️ Organisator | Tracking tugas panitia | Web app manajemen kepanitiaan | Jalur 1 | Lovable |
| 🏛️ Organisator | Publikasi acara makan waktu | Workflow auto-post konten | Jalur 3 | Make + ChatGPT |
| 💼 Bisnisman | Katalog produk tidak ada | Web app katalog + order WA | Jalur 1 | Lovable |
| 💼 Bisnisman | Balas chat satu-satu | Bot CS semi-otomatis | Jalur 3 | Make + Claude |
| 💼 Bisnisman | Butuh caption 50+ produk | Script caption generator batch | Jalur 2 | Claude → Replit |
| 🎬 Kreator | Kehabisan ide konten | Web app idea generator | Jalur 1 | Lovable |
| 🎬 Kreator | Post manual satu-satu | Workflow auto-post terjadwal | Jalur 3 | Make |
| 😵 Overwhelmed | Jadwal berantakan | Web app personal scheduler | Jalur 1 | Lovable |

---

### BAGIAN 8 — Demo Live

Di sini mentor demo langsung salah satu dari tiga jalur — **pilih yang paling relevan dengan mayoritas peserta di batch tersebut.**

**Rekomendasi untuk demo:**

Demo Lovable karena:
- Paling visual — peserta langsung lihat hasilnya
- Paling "wow" — dari deskripsi ke aplikasi dalam menit
- Paling mudah untuk langsung dicoba peserta

**Skrip demo Lovable (±10 menit):**

```
1. Buka lovable.dev di layar
2. "Oke, kita akan bikin aplikasi sekarang. Live. 
   Dari nol. Tanpa nulis kode satu baris pun."
3. Ketik deskripsi aplikasi sederhana 
   (misal: content idea generator)
4. Biarkan Lovable generate — komentari prosesnya
5. Tampilkan hasil — tunjukkan sudah bisa dibuka di browser
6. Minta satu revisi kecil dari peserta 
   ("Siapa yang mau request perubahan apa?")
7. Implementasikan revisi — tunjukkan betapa mudahnya
8. "Ini bisa lo share ke siapapun sekarang. 
   Ini aplikasi buatan lo."
```

---

### BAGIAN 9 — Batas dan Realita Vibe Coding

Ini penting untuk disampaikan agar peserta punya ekspektasi yang realistis:

**Vibe coding sangat bagus untuk:**
- ✅ Prototype dan MVP (versi pertama yang bisa dicoba)
- ✅ Tools personal untuk kebutuhan sendiri
- ✅ Aplikasi sederhana dengan fitur terbatas
- ✅ Automasi tugas berulang yang straightforward
- ✅ Validasi ide sebelum invest lebih dalam

**Vibe coding punya keterbatasan:**
- ⚠️ Untuk aplikasi yang sangat kompleks, butuh developer
- ⚠️ Keamanan data sensitif perlu perhatian ekstra
- ⚠️ Skalabilitas (kalau usernya ribuan) perlu arsitektur proper
- ⚠️ Kadang AI salah generate kode — butuh debug
- ⚠️ Free tier tools punya limit — untuk skala besar butuh bayar

**Tapi untuk tujuan kita di AIGYPT — ini lebih dari cukup.**

---

## 🎮 Latihan Sesi Ini

### Latihan 1 — First Build (20 menit)
Buka Lovable.dev atau Bolt.new. Buat akun (gratis). Deskripsikan satu tools sederhana yang lo butuhkan — dari tabel peta solusi di atas atau ide lo sendiri.

Jangan overthink. Tulis deskripsinya dalam 5-10 kalimat dan klik generate. Lihat apa yang muncul.

### Latihan 2 — Identifikasi Proyek Demo Day (10 menit)
Jawab 3 pertanyaan ini di kertas atau notes HP:

1. **Masalah spesifik** apa yang paling sering lo hadapi sebagai masisir yang buang waktu atau energi lo?
2. **Solusi ideal** yang lo bayangin — kalau ada alat yang bisa bantu, alat itu bekerja seperti apa?
3. **Siapa lagi** yang punya masalah sama? (akademisi lain? teman organisasi? sesama kreator?)

*Ini adalah brief proyek lo untuk Demo Day Sesi 6.*

---

## 📦 Take-Home / Pre-Work Sesi 6

> Ini bukan opsional — ini adalah persiapan Demo Day lo:
>
> **Mulai bangun solusi lo sekarang. Jangan tunggu sempurna.**
>
> Langkah-langkahnya:
> 1. Pilih jalur yang paling sesuai (Web App / Script / Automation)
> 2. Mulai dengan versi paling sederhana dari solusi lo
> 3. Iterate — minta revisi ke AI, perbaiki, coba lagi
> 4. Dokumentasikan prosesnya (screenshot atau screen recording)
>
> Yang dibawa ke Sesi 6:
> - Solusi yang sudah bisa di-demo (tidak harus sempurna)
> - Cerita prosesnya — apa yang susah, apa yang mengejutkan
> - Siap presentasi 5-7 menit
>
> *Ingat: yang dinilai bukan seberapa canggih aplikasinya — tapi seberapa nyata masalah yang lo selesaikan.*

---

## 💬 Refleksi Penutup Sesi

Mentor tutup dengan:

> *"Dua bulan lalu, kalau ada yang bilang ke lo bahwa lo bisa bikin aplikasi sendiri tanpa coding — lo percaya tidak?"*
>
> *"Hari ini lo sudah lihat sendiri bahwa itu mungkin. Sesi depan, lo yang buktikan ke semua orang di sini."*

---

## 📚 Resource Tambahan

**Tools vibe coding:**
- **Lovable** — [lovable.dev](https://lovable.dev) → web app dari deskripsi
- **Bolt** — [bolt.new](https://bolt.new) → web app dan lebih banyak framework
- **v0** — [v0.dev](https://v0.dev) → UI components by Vercel
- **Replit** — [replit.com](https://replit.com) → jalankan kode di browser
- **n8n** — [n8n.io](https://n8n.io) → workflow automation open source
- **Make** — [make.com](https://make.com) → workflow automation visual

**Untuk belajar lebih:**
- YouTube: "Lovable tutorial Indonesia" atau "vibe coding tutorial"
- Community: cari grup Telegram/Discord "vibe coding Indonesia"

---

## 🗒️ Catatan untuk Mentor

**Yang sering terjadi di Sesi 5:**
- Peserta ada yang overwhelmed karena terlalu banyak pilihan → tekankan: pilih satu jalur, fokus, jangan coba semua sekaligus
- Ada yang langsung tanya "apakah ini bisa dijual?" → Jawab: ya, ini bisa jadi produk atau portofolio — tapi fokus dulu ke solve masalah sendiri
- Ada yang frustrated kalau output Lovable tidak sesuai ekspektasi → Ini normal — iterate, minta revisi, coba lagi

**Tips delivery:**
- Demo live adalah inti sesi ini — sisakan minimal 10-15 menit untuk ini
- Pilih contoh yang paling relevan dengan mayoritas persona di batch
- Kalau koneksi internet tidak stabil — siapkan screen recording demo sebagai backup
- Beri tahu peserta bahwa "tidak sempurna itu okay" — yang penting ada sesuatu yang bisa di-demo di Sesi 6

**Energi sesi ini:**
Sesi 5 seharusnya jadi sesi dengan energi tertinggi. Peserta yang tadinya merasa "bukan orang teknis" tiba-tiba sadar mereka bisa bikin aplikasi. Tangkap momen ini — biarkan mereka excited, biarkan mereka langsung coba, dan jaga api itu sampai Demo Day.

**Persiapan untuk Sesi 6:**
Di akhir sesi, pastikan setiap peserta sudah punya:
- Satu ide proyek yang jelas
- Jalur yang akan dipakai
- Sudah mulai atau minimal sudah tahu langkah pertamanya

Kalau ada yang masih bingung — bantu mereka satu per satu setelah sesi selesai.

---

*Sesi 5 selesai. Satu sesi lagi. Sesi 6 adalah milik lo — bukan lagi materi dari mentor, tapi showcase dari apa yang lo bangun sendiri. Sampai di Demo Day.*
