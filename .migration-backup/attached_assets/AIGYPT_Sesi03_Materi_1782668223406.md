# SESI 03 — "AI Jadi Asisten Akademik & Organisasi Lo"
## Tema: AI untuk Kehidupan Akademik & Organisasi

> **Durasi:** 60 menit  
> **Level:** Semua level — langsung praktek dengan kasus nyata  
> **Output sesi ini:** Peserta bisa menyelesaikan tugas akademik dan organisasi sehari-hari dengan AI secara signifikan lebih cepat dan berkualitas

---

## 🎯 Tujuan Sesi

Setelah sesi ini, peserta akan:
- Bisa pakai AI untuk **nulis dan review makalah bahasa Arab**
- Bisa **terjemah dan pahami kitab kuning** dengan bantuan AI
- Bisa **summarize jurnal dan referensi panjang** dalam menit
- Bisa **otomatisasi tugas organisasi** — proposal, notulensi, publikasi, LPJ

---

## 📖 Materi Lengkap

---

### BAGIAN 1 — Review Take-Home Sesi 2

Mentor buka dengan pertanyaan:

> *"Siapa yang udah coba bikin prompt RCTFC? Boleh share — promptnya tentang apa, dan hasilnya gimana dibanding prompt lama lo?"*

Kalau ada peserta yang bawa screenshot perbandingan prompt lama vs baru — tampilkan dan analisis bersama. Ini momen validasi yang powerful.

Kalau belum ada yang coba → tidak apa-apa. Tapi tekankan:

> *"Sesi ini kita akan langsung praktek pakai formula RCTFC untuk tugas yang paling nyata dalam hidup masisir. Jadi setelah sesi ini, lo pasti akan pakai."*

---

### BAGIAN 2 — Dua Track, Satu Tujuan

Sesi ini dibagi dua track besar:

```
TRACK A: AKADEMISI
Makalah Arab · Terjemah Kitab · Summarize Jurnal · Skripsi

TRACK B: ORGANISASI  
Proposal Kegiatan · Notulensi Otomatis · Konten Publikasi · LPJ
```

**Penting:** Banyak masisir butuh keduanya. Seorang akademisi yang aktif organisasi akan pakai semua materi di sesi ini. Jadi ikuti semua bagian meskipun lo merasa lebih ke satu track.

---

### BAGIAN 3 — TRACK A: AI untuk Akademisi

---

#### A1 — Nulis Makalah Bahasa Arab

Ini pain point nomor satu akademisi Al-Azhar. Nulis dalam bahasa Arab formal (fusha) dengan standar akademik yang ketat — sementara bahasa sehari-hari di Mesir adalah ammiyah yang sangat berbeda.

**AI bisa bantu di tahap mana saja:**

```
Tahap 1: Pilih topik & angle → AI bantu brainstorm
Tahap 2: Buat outline → AI generate struktur
Tahap 3: Draft per bab → AI tulis draft awal
Tahap 4: Review grammar → AI cek nahwu & sharaf
Tahap 5: Cari referensi → AI rekomendasikan kitab
Tahap 6: Finalisasi → AI polish bahasa
```

**Prompt untuk tahap 3 — Draft bab dalam bahasa Arab:**

```
[Role] Kamu adalah akademisi Muslim yang menulis dalam 
bahasa Arab fusha tingkat tinggi, sesuai standar 
penulisan ilmiah Universitas Al-Azhar.

[Context] Saya menulis makalah berjudul "أثر وسائل التواصل 
الاجتماعي على القيم الأخلاقية لدى الشباب المسلم" 
(Pengaruh Media Sosial terhadap Nilai Moral Pemuda Muslim).
Berikut outline bab pertama saya: [tempel outline bab 1].

[Task] Tulis Bab 1 (Pendahuluan/المقدمة) berdasarkan 
outline tersebut. Sertakan: latar belakang masalah, 
rumusan masalah (3 pertanyaan), tujuan penelitian, 
dan signifikansi penelitian.

[Format] Bahasa Arab fusha formal akademik. 
Panjang 400-500 kata. Paragraph yang terstruktur rapi.

[Constraint] Gunakan kosakata akademik yang tinggi. 
Mulai dengan بسم الله. Jangan gunakan bahasa ammiyah 
atau kata serapan modern yang tidak perlu.
```

**Prompt untuk review grammar Arab:**

```
Periksa teks Arab berikut dari segi:
1. Kesalahan nahwu (i'rab, tanda baca)
2. Kesalahan sharaf (tasrif, bentuk kata)
3. Pilihan kata yang kurang tepat secara akademik
4. Struktur kalimat yang bisa diperbaiki

Untuk setiap koreksi, jelaskan alasannya dalam bahasa Indonesia 
agar saya bisa belajar dari kesalahan tersebut.

Teks: [tempel teks Arab lo]
```

---

#### A2 — Terjemah dan Pahami Kitab Kuning

Ini use case yang sangat spesifik dan sangat powerful untuk masisir.

**Skenario umum:** Lo buka kitab, ketemu matan atau syarah yang susah dipahami. Biasanya butuh tanya ke senior atau buka kamus berjam-jam.

**Dengan AI — prosesnya jadi:**
1. Foto/ketik bagian yang susah
2. Minta AI terjemahkan + jelaskan
3. Tanya lebih dalam kalau masih bingung
4. Minta konteks dari ulama lain soal topik yang sama

**Prompt terjemah kitab:**

```
[Role] Kamu adalah ulama yang ahli dalam bahasa Arab klasik 
dan ilmu-ilmu Islam tradisional, khususnya fiqih dan ushul fiqih.

[Context] Saya mahasiswa Al-Azhar sedang mempelajari 
kitab [nama kitab, misal: Fathul Qarib / Minhajut Thalibin]. 
Saya menemukan bagian yang sulit dipahami.

[Task] Tolong bantu saya memahami teks berikut dengan:
1. Terjemahan kata per kata untuk istilah kunci
2. Terjemahan keseluruhan dalam bahasa Indonesia yang mudah dipahami
3. Penjelasan makna dan konteks hukumnya
4. Kalau ada perbedaan pendapat ulama soal ini, sebutkan

Teks: [ketik atau paste teks Arab dari kitab]

[Constraint] Jelaskan dengan bahasa Indonesia yang mudah 
tapi tetap akurat secara ilmiah. Kalau ada istilah teknis 
yang harus dipertahankan, berikan penjelasannya.
```

**Tips penting:** AI bisa salah dalam urusan fiqih yang sangat spesifik. Selalu **verifikasi** dengan dosen atau senior untuk hal-hal yang akan dijadikan pegangan hukum. AI sangat bagus untuk pemahaman awal dan belajar — bukan untuk fatwa.

---

#### A3 — Summarize Jurnal dan Referensi Panjang

Riset skripsi atau makalah kadang butuh baca puluhan jurnal. AI bisa memangkas waktu ini drastis.

**Cara pakai NotebookLM (Google) untuk ini:**
1. Buka [notebooklm.google.com](https://notebooklm.google.com)
2. Upload PDF jurnal atau paste link artikel
3. Tanya langsung ke AI tentang isi jurnal tersebut
4. Minta ringkasan, poin utama, atau metodologi penelitian

**Prompt summarize jurnal via Claude/ChatGPT:**

```
Berikut adalah abstrak dan bagian penting dari jurnal ilmiah 
yang saya sedang pelajari: [paste teks jurnal]

Tolong bantu saya:
1. Ringkasan jurnal ini dalam 5 poin utama (maks 100 kata per poin)
2. Metodologi penelitian yang digunakan
3. Temuan utama dan kesimpulan
4. Relevansinya dengan topik skripsi saya tentang [topik skripsi lo]
5. Pertanyaan kritis yang bisa saya ajukan terhadap penelitian ini

Sajikan dalam format yang mudah saya masukkan ke catatan riset.
```

**Prompt untuk cari gap penelitian (untuk skripsi):**

```
Saya sedang menyusun skripsi tentang [topik]. Berikut 
ringkasan dari 3 penelitian sebelumnya yang sudah saya baca:

Penelitian 1: [ringkasan singkat]
Penelitian 2: [ringkasan singkat]  
Penelitian 3: [ringkasan singkat]

Tolong analisis:
1. Apa kesamaan temuan dari ketiga penelitian ini?
2. Apa perbedaan atau kontradiksi di antara mereka?
3. Apa celah (gap) penelitian yang belum dibahas?
4. Bagaimana skripsi saya bisa mengisi gap tersebut?
```

---

#### A4 — Persiapan Ujian dan Halaqah

Use case yang sering dilupakan tapi sangat berguna:

**Prompt simulasi ujian:**

```
Saya akan menghadapi ujian lisan (munaqasyah) tentang 
[mata kuliah/kitab] minggu depan. 

Buatkan 20 pertanyaan ujian yang kemungkinan besar akan 
ditanya dosen Al-Azhar untuk materi ini, dari yang mudah 
sampai yang kompleks. Untuk setiap pertanyaan, berikan 
juga poin-poin kunci jawaban yang harus saya sebutkan.
```

**Prompt untuk halaqah:**

```
Saya akan memimpin halaqah diskusi tentang [tema/teks kitab]. 
Pesertanya 10 mahasiswa Al-Azhar semester 3-5.

Buatkan:
1. Pembuka diskusi yang menarik (2-3 kalimat)
2. 5 pertanyaan diskusi yang memancing pemikiran kritis
3. Poin-poin kunci yang harus dicapai di akhir halaqah
4. Cara menutup diskusi yang berkesan
```

---

### BAGIAN 4 — TRACK B: AI untuk Organisasi

---

#### B1 — Proposal Kegiatan

Dari pengalaman masisir: bikin proposal itu makan waktu 2-3 hari, padahal isinya sering mirip-mirip. Dengan AI, ini bisa jadi 2-3 jam — bahkan kurang.

**Prompt proposal kegiatan lengkap:**

```
[Role] Kamu adalah sekretaris profesional berpengalaman 
dalam penulisan proposal kegiatan mahasiswa internasional.

[Context] Saya panitia dari [nama organisasi], organisasi 
mahasiswa Indonesia di Kairo. Kami akan mengadakan:
- Nama acara: [nama acara]
- Tema: [tema]
- Tanggal: [tanggal]
- Tempat: [tempat/online via platform apa]
- Target peserta: [jumlah dan siapa]
- Tujuan utama: [tujuan]

[Task] Buatkan proposal kegiatan lengkap yang mencakup:
1. Latar belakang (3 paragraf)
2. Nama dan tema kegiatan
3. Tujuan (minimal 4 poin)
4. Sasaran peserta
5. Susunan acara (rundown detail)
6. Susunan panitia
7. Estimasi anggaran (tabel)
8. Penutup

[Format] Format proposal formal. Estimasi anggaran dalam 
tabel 4 kolom: No | Item | Satuan x Jumlah | Total.
Gunakan kop surat placeholder di atas.

[Constraint] Bahasa Indonesia formal. Total anggaran 
maksimal [nominal]. Acara ini [berbayar/gratis] untuk peserta.
```

---

#### B2 — Notulensi Otomatis dari Rekaman Rapat

Ini game-changer untuk organisasi. Tidak perlu lagi ada satu orang yang sibuk nulis notulensi sambil dengerin rapat.

**Alur kerja:**
```
Rekam rapat (HP) → Upload ke TurboScribe/Whisper 
→ Dapat transkrip teks → Paste ke Claude 
→ Minta AI buat notulensi terstruktur
```

**Tools transkripsi:**
- **TurboScribe** (turboscribe.ai) — gratis 30 menit/hari, akurasi tinggi, support bahasa Indonesia
- **Whisper by OpenAI** — gratis, bisa dijalankan lokal
- **Otter.ai** — bagus untuk bahasa Inggris

**Prompt olah transkrip jadi notulensi:**

```
Berikut adalah transkrip rapat [nama rapat] tanggal [tanggal]:

[paste transkrip dari TurboScribe]

Dari transkrip di atas, buatkan notulensi rapat formal 
yang mencakup:
1. Informasi rapat (tanggal, tempat, peserta hadir)
2. Agenda rapat
3. Jalannya rapat — per agenda, ringkasan diskusi 
   dan keputusan yang diambil
4. Action items — format tabel: Tugas | PIC | Deadline
5. Hal-hal yang perlu ditindaklanjuti di rapat berikutnya

Format: Notulensi formal siap cetak. 
Bahasa Indonesia formal tapi tidak kaku.
```

---

#### B3 — Konten Publikasi Acara

Panitia sering kehabisan waktu buat bikin konten sosmed acara. AI bisa handle ini dalam menit.

**Prompt paket konten acara (sekali jalan):**

```
[Context] Kami mengadakan [nama acara] dengan detail:
- Tema: [tema]
- Tanggal & waktu: [tanggal dan jam]
- Tempat: [tempat/link zoom]
- Narasumber: [nama dan jabatan]
- Target peserta: [siapa]
- Link pendaftaran: [link]

[Task] Buatkan paket konten publikasi lengkap:
1. Caption Instagram (200-250 kata, formal tapi engaging)
2. Caption TikTok (100 kata, energik, hook di kalimat pertama)
3. Teks pengumuman WhatsApp (singkat, 80-100 kata)
4. Thread Twitter/X (5-7 tweet, storytelling)
5. Teks MC untuk membuka sesi publikasi live

[Format] Pisahkan setiap konten dengan heading yang jelas. 
Sertakan 10 hashtag relevan untuk IG.

[Constraint] Bahasa Indonesia. Tone: profesional tapi hangat, 
tidak terlalu formal. Tidak ada typo atau singkatan alay.
```

---

#### B4 — Laporan Pertanggungjawaban (LPJ)

LPJ adalah momok setiap panitia. Dengan AI, proses drafting bisa dipercepat drastis.

**Prompt draft LPJ:**

```
[Role] Kamu adalah sekretaris berpengalaman yang ahli 
menulis laporan pertanggungjawaban kegiatan mahasiswa.

[Context] Kami baru selesai mengadakan [nama acara]. 
Berikut data pelaksanaannya:
- Tanggal pelaksanaan: [tanggal]
- Tempat: [tempat]
- Jumlah peserta hadir: [jumlah] dari target [target]
- Narasumber: [nama]
- Realisasi anggaran: [nominal] dari anggaran [nominal]
- Hal yang berjalan baik: [ceritakan]
- Kendala yang dihadapi: [ceritakan]
- Feedback peserta: [ringkasan feedback]

[Task] Buatkan draft LPJ lengkap yang mencakup:
1. Pendahuluan
2. Pelaksanaan kegiatan
3. Evaluasi (keberhasilan dan kendala)
4. Realisasi anggaran (tabel)
5. Kesimpulan dan rekomendasi
6. Penutup

[Format] Format LPJ formal. Tabel anggaran 
dengan kolom: Item | Anggaran | Realisasi | Selisih.

[Constraint] Bahasa Indonesia formal. 
Jujur soal kendala tapi tetap profesional 
dalam penyampaiannya.
```

---

### BAGIAN 5 — Workflow Lengkap: Dari Rapat sampai LPJ

Ini integrasi semua tools dalam satu alur kerja organisasi:

```
📱 Rapat berlangsung
    ↓
🎙️ Rekam dengan HP (Voice Memo / aplikasi perekam)
    ↓
📝 Upload ke TurboScribe → dapat transkrip teks
    ↓
🤖 Paste ke Claude → minta notulensi terstruktur + action items
    ↓
📢 Dari data acara → Claude generate konten publikasi
    ↓
📊 Setelah acara → input data ke Claude → draft LPJ
    ↓
✅ Review, edit minor, selesai
```

**Estimasi waktu yang dihemat:**
- Notulensi biasanya: 2-3 jam → Dengan AI: 15-20 menit
- Konten publikasi biasanya: 1-2 jam → Dengan AI: 10-15 menit
- Draft LPJ biasanya: 3-4 jam → Dengan AI: 30-45 menit

**Total per event: hemat ~6-8 jam kerja panitia**

---

## 🎮 Latihan Sesi Ini

### Latihan 1 — Track Akademisi (15 menit)
Pilih salah satu:

**Opsi A:** Ambil satu paragraf dari kitab atau jurnal yang sedang lo pelajari. Paste ke Claude dan minta: terjemahan, penjelasan makna, dan konteks hukum/akademiknya.

**Opsi B:** Ambil satu tugas makalah yang sedang atau akan lo kerjakan. Buat prompt RCTFC untuk minta AI generate outline-nya.

### Latihan 2 — Track Organisasi (15 menit)
Pilih salah satu:

**Opsi A:** Ambil kegiatan organisasi yang sedang lo rencanakan (atau buat-buat saja). Gunakan prompt proposal di atas untuk generate draft proposal.

**Opsi B:** Rekap rapat terakhir lo dari ingatan (5-10 poin). Paste ke Claude dengan prompt notulensi dan lihat hasilnya.

### Latihan 3 — Refleksi Waktu (5 menit)
Setelah latihan, hitung:
- Berapa lama lo biasanya mengerjakan tugas ini secara manual?
- Berapa lama tadi dengan bantuan AI?
- Apa yang masih perlu lo perbaiki dari output AI-nya?

---

## 📦 Take-Home Challenge

> Sebelum Sesi 4, lakukan ini:
>
> **Selesaikan satu tugas akademik atau organisasi nyata minggu ini dengan bantuan AI.**
>
> Catat:
> 1. Tugas apa yang lo kerjakan?
> 2. Prompt apa yang lo pakai? (simpan promptnya)
> 3. Berapa lama biasanya vs dengan AI?
> 4. Apa yang lo edit/perbaiki dari output AI?
>
> *Ini akan jadi bahan diskusi di Sesi 4 sebelum masuk materi baru.*

---

## 💬 Refleksi Penutup Sesi

Mentor tanya:

> *"Dari semua use case yang kita bahas hari ini — mana yang paling langsung bisa lo pakai minggu ini?"*

Biarkan beberapa peserta jawab. Ini membantu mereka mengidentifikasi prioritas dan memastikan mereka akan benar-benar mencoba sebelum sesi berikutnya.

---

## 📚 Resource Tambahan

**Tools yang dibahas sesi ini:**
- **Claude** — [claude.ai](https://claude.ai) → untuk semua tugas teks panjang
- **NotebookLM** — [notebooklm.google.com](https://notebooklm.google.com) → upload jurnal/PDF dan tanya langsung
- **TurboScribe** — [turboscribe.ai](https://turboscribe.ai) → transkripsi rekaman rapat
- **DeepL** — [deepl.com](https://deepl.com) → terjemahan presisi untuk bahasa Arab-Indonesia

**Catatan penting soal AI dan akademik:**
AI adalah alat bantu, bukan pengganti proses berpikir. Gunakan AI untuk:
- ✅ Mempercepat draft awal
- ✅ Mengecek grammar
- ✅ Memahami referensi
- ✅ Mengorganisir ide

Jangan gunakan AI untuk:
- ❌ Submit output AI mentah tanpa direvisi
- ❌ Menggantikan pemahaman konsep (terutama di fiqih)
- ❌ Membuat fatwa atau keputusan hukum Islam

---

## 🗒️ Catatan untuk Mentor

**Yang sering terjadi di Sesi 3:**
- Peserta terpukau dengan kemampuan AI terjemah kitab — manfaatkan momentum ini tapi ingatkan untuk tetap verifikasi
- Ada yang khawatir soal etika akademik — bahas terbuka: AI sebagai asisten riset itu acceptable, tapi submit output mentah itu tidak jujur. Batasnya ada di proses, bukan di tools
- Peserta organisasi sering bertanya soal rekaman rapat — pastikan semua anggota rapat aware kalau rapat direkam

**Tips delivery:**
- Demo live terjemah kitab selalu jadi momen paling wow — siapkan teks kitab yang agak kompleks untuk demo
- Kalau ada peserta yang bawa tugas atau kitab sungguhan → ajak mereka demo langsung, ini lebih powerful dari contoh buatan
- Ingatkan: output AI selalu perlu di-review manusia sebelum digunakan

**Pembagian waktu ideal:**
- Review take-home: 5 menit
- Track A (Akademisi): 25 menit
- Track B (Organisasi): 20 menit
- Latihan + refleksi: 10 menit

---

*Sesi 3 selesai. Sampai jumpa di Sesi 4: "AI Jadi Mesin Cuan Lo" — di mana kita akan eksplorasi bagaimana AI bisa membantu bisnis dan konten kreator masisir menghasilkan lebih banyak dengan lebih sedikit waktu.*
