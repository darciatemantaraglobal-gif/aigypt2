export type StepType = "concept" | "practice";

export interface PromptItem {
  label: string;
  prompt: string;
}

export interface TableData {
  headers: string[];
  rows: string[][];
}

export interface CardItem {
  title: string;
  subtitle?: string;
  items: string[];
  accent?: "green" | "red" | "purple" | "blue";
}

export interface MateriStep {
  id: string;
  type: StepType;
  title: string;
  subtitle?: string;
  content?: string;
  bullets?: string[];
  quote?: string;
  prompts?: PromptItem[];
  table?: TableData;
  cards?: CardItem[];
  note?: string;
  isCompletion?: boolean;
}

export interface SesiMateri {
  sesiNumber: number;
  title: string;
  subtitle: string;
  steps: MateriStep[];
}

export const materiContent: SesiMateri[] = [
  // ═══════════════════════════════════════════════════════
  // SESI 1 — AI Itu Bukan Sulap, Tapi Hampir
  // ═══════════════════════════════════════════════════════
  {
    sesiNumber: 1,
    title: "AI Itu Bukan Sulap, Tapi Hampir",
    subtitle: "Kenali AI, pahami cara kerjanya, dan mulai berinteraksi dengan benar",
    steps: [
      {
        id: "s1-1",
        type: "concept",
        title: "Selamat Datang di Sesi 1",
        subtitle: "Kenali AI, pahami cara kerjanya, dan mulai pakai AI dengan benar",
        content:
          "Sebelum kita mulai, satu pertanyaan jujur: lo selama ini pakai AI buat apa? Kemungkinan besar: belum pernah, cuma nanya random, atau hasilnya sering ga memuaskan. Apapun jawabannya — itu normal.",
        bullets: [
          "Punya mindset yang benar soal AI — bukan takut, bukan lebay",
          "Ngerti cara kerja AI secara sederhana tanpa jargon teknis",
          "Tau perbedaan ChatGPT, Claude, dan Gemini — kapan pakai yang mana",
          "Sudah coba sendiri minimal satu interaksi dengan AI yang berguna",
        ],
      },
      {
        id: "s1-2",
        type: "concept",
        title: "AI Itu Asisten, Bukan Dukun",
        subtitle: "Mindset yang benar sebelum mulai",
        content:
          "Yang paling banyak terjadi: orang pakai AI seperti pakai mesin pencari — tanya satu kalimat pendek, dapat jawaban, selesai. Padahal AI itu jauh lebih dari itu.",
        quote:
          "AI bukan Google. AI itu asisten pribadi yang sangat pintar — tapi lo yang harus jadi atasannya.",
        bullets: [
          "AI tidak bisa membaca pikiran lo — dia hanya tau apa yang lo tulis",
          "Semakin detail lo menjelaskan, semakin bagus hasilnya",
          "AI adalah tools — hasil akhirnya tetap tanggung jawab lo",
        ],
      },
      {
        id: "s1-3",
        type: "concept",
        title: "Cara Kerja AI — Sederhana Tapi Powerful",
        subtitle: "Memahami LLM tanpa jargon teknis",
        content:
          "AI seperti ChatGPT, Claude, dan Gemini adalah Large Language Models (LLM). Cara kerjanya: mereka membaca miliaran teks, belajar pola, lalu memprediksi kata demi kata yang paling relevan untuk menjawab pertanyaan lo.",
        quote:
          "Bayangkan santri yang sudah khatam ribuan kitab dan hafal jutaan hadits — dan sekarang lo bisa tanya apa saja kepadanya. Dia tidak selalu benar 100%, tapi sangat berpengetahuan.",
        bullets: [
          "AI dilatih pada miliaran teks dari internet, buku, dan kode",
          "AI memprediksi — bukan mencari. Ini kenapa kadang 'hallucinate'",
          "Semakin baru modelnya, semakin pintar dan akurat hasilnya",
        ],
      },
      {
        id: "s1-4",
        type: "practice",
        title: "Mitos vs Realita AI",
        subtitle: "Luruskan salah paham yang paling umum",
        content:
          "Banyak orang tidak pakai AI secara maksimal karena salah kaprah sejak awal. Berikut mitos-mitos yang paling sering muncul di kalangan masisir:",
        table: {
          headers: ["Mitos", "Realita"],
          rows: [
            ["AI selalu benar", "AI bisa salah — lo harus tetap kritis"],
            ["AI bisa baca pikiran", "AI hanya tau apa yang lo tulis kepadanya"],
            ["AI bakal gantiin lo", "AI memperkuat kemampuan lo, bukan menggantikan"],
            ["AI itu ribet dan teknis", "Siapapun bisa pakai AI kalau tau caranya"],
            [
              "AI itu haram/tidak etis",
              "Tergantung cara pakainya — pisau bisa masak, bisa juga berbahaya",
            ],
          ],
        },
        quote: "AI sebaik promptnya. Garbage in, garbage out.",
      },
      {
        id: "s1-5",
        type: "concept",
        title: "Kenalan: ChatGPT, Claude, dan Gemini",
        subtitle: "Tiga AI utama yang lo harus kenal",
        content:
          "Tidak semua AI diciptakan sama. Setiap AI punya keunggulan berbeda. Mengetahui kapan pakai yang mana adalah skill yang akan menghemat banyak waktu lo.",
        bullets: [
          "ChatGPT — paling populer, komunitas terbesar, cocok untuk brainstorming umum",
          "Claude — terbaik untuk teks panjang, dokumen, nulis akademik yang nuanced",
          "Gemini — terintegrasi Google, bisa akses internet real-time, cek fakta terkini",
        ],
      },
      {
        id: "s1-6",
        type: "practice",
        title: "Perbandingan 3 AI: Panduan Pilih yang Tepat",
        subtitle: "Kapan pakai ChatGPT, Claude, atau Gemini?",
        content:
          "Tidak ada AI yang 'terbaik' secara absolut — yang terbaik adalah yang cocok untuk tugas spesifik lo. Gunakan tabel ini sebagai panduan cepat:",
        cards: [
          {
            title: "ChatGPT (OpenAI)",
            items: [
              "+ Paling populer — komunitas dan tutorial terbanyak",
              "+ GPT-4o bisa lihat gambar dan file",
              "+ Ada plugins dan GPT custom",
              "- Versi gratis terbatas",
              "- Kadang jawaban terlalu generik",
              "Terbaik untuk: Brainstorming umum, nulis konten, coding awal",
            ],
            accent: "green",
          },
          {
            title: "Claude (Anthropic)",
            items: [
              "+ Terbaik untuk teks panjang — baca dokumen, kitab, PDF",
              "+ Jawaban lebih nuanced dan thoughtful",
              "+ Lebih jujur kalau tidak tahu",
              "- Tidak selalu bisa browsing internet",
              "- Tutorial lebih sedikit dibanding ChatGPT",
              "Terbaik untuk: Nulis makalah, terjemah kitab, analisis dokumen",
            ],
            accent: "purple",
          },
          {
            title: "Gemini (Google)",
            items: [
              "+ Terintegrasi dengan Google Drive, Docs, Gmail",
              "+ Bisa akses internet real-time",
              "+ Gratis dengan fitur lengkap",
              "- Kualitas teks kadang kurang konsisten",
              "- Kurang kuat untuk tugas kreatif kompleks",
              "Terbaik untuk: Riset terkini, cek fakta, integrasi Google Workspace",
            ],
            accent: "blue",
          },
        ],
        table: {
          headers: ["Kebutuhan", "Tools Terbaik"],
          rows: [
            ["Nulis makalah bahasa Arab", "Claude"],
            ["Terjemah kitab kuning", "Claude"],
            ["Bikin proposal kegiatan", "ChatGPT atau Claude"],
            ["Riset berita terkini", "Gemini"],
            ["Generate ide konten", "ChatGPT"],
            ["Analisis dokumen panjang", "Claude"],
            ["Bikin kode/script", "ChatGPT atau Claude"],
            ["Cek fakta real-time", "Gemini"],
          ],
        },
      },
      {
        id: "s1-7",
        type: "concept",
        title: "Kenapa Prompt Itu Segalanya",
        subtitle: "Skill yang membedakan pengguna biasa dan power user",
        content:
          "Dua orang pakai AI yang sama, dapat hasil yang sangat berbeda. Kenapa? Cara mereka bertanya. Ini yang disebut prompting — dan ini skill yang bisa dipelajari.",
        quote:
          "Skenario: dua masisir, pakai Claude yang sama, tanya soal makalah. Yang pertama dapat outline generik 5 baris. Yang kedua dapat outline lengkap 5 bab dengan sub-poin dan referensi kitab. Bedanya? Cara bertanya.",
        bullets: [
          "Prompt yang bagus beri AI konteks, tugas, format, dan batasan yang jelas",
          "Prompt buruk = tebak-tebakan. Prompt bagus = instruksi yang jelas",
          "Sesi 2 akan fokus penuh pada cara membuat prompt yang powerful",
        ],
      },
      {
        id: "s1-8",
        type: "practice",
        title: "Demo Live: Prompt Buruk vs Bagus",
        subtitle: "Lihat perbedaannya sendiri",
        content:
          "Skenario: Kamu harus membuat makalah tentang 'Konsep Tawazun dalam Islam'. Lihat bagaimana kualitas prompt menentukan kualitas output:",
        prompts: [
          {
            label: "Prompt Demo Live — Kirim ke 3 AI",
            prompt: `Saya mahasiswa Al-Azhar Kairo. Saya harus menulis makalah 
dalam bahasa Arab tentang "Konsep Tawazun dalam Islam dan 
Relevansinya dengan Kehidupan Modern". Tolong bantu saya 
membuat outline makalah yang kuat dengan 5 bab utama, 
lengkap dengan sub-poin setiap bab.`,
          },
          {
            label: "Prompt Buruk — Hasilnya Generik",
            prompt: `bantu makalah saya`,
          },
          {
            label: "Prompt Sedang — Lumayan Tapi Masih Luas",
            prompt: `Bantu saya nulis makalah tentang zakat`,
          },
          {
            label: "Prompt Bagus — Hasil Langsung Bisa Dipakai",
            prompt: `Saya mahasiswa semester 3 di Fakultas Syariah Al-Azhar Kairo. 
Saya perlu menulis makalah 15 halaman tentang "Zakat Digital: 
Hukum Zakat atas Aset Kripto dalam Perspektif Fiqih Kontemporer".

Tolong bantu saya:
1. Buat outline 5 bab dengan sub-poin detail
2. Rekomendasikan 5 referensi kitab fiqih yang relevan
3. Berikan contoh argumen untuk bab pendahuluan

Gunakan gaya akademik formal sesuai standar penulisan ilmiah Arab.`,
          },
        ],
        note: "Pelajaran utama: tidak ada AI yang 'terbaik' secara absolut — yang terbaik adalah yang cocok untuk tugas spesifik lo.",
      },
      {
        id: "s1-9",
        type: "concept",
        title: "AI dan Kehidupan Lo sebagai Masisir",
        subtitle: "Relevansi AI untuk 4 persona masisir",
        content:
          "AI bukan hanya untuk yang 'teknis'. Apapun peran lo sebagai masisir — akademisi, organisator, bisnisman, atau kreator — AI bisa mengubah cara lo bekerja secara radikal.",
        cards: [
          {
            title: "Akademisi",
            items: [
              "Makalah 3 hari → bisa jadi 1 hari",
              "Terjemah kitab dalam menit",
              "AI bantu carikan referensi",
            ],
            accent: "purple",
          },
          {
            title: "Organisator",
            items: [
              "Proposal selesai dalam jam",
              "Notulensi rapi otomatis",
              "Konten publikasi dari draft pertama",
            ],
            accent: "blue",
          },
          {
            title: "Bisnisman",
            items: [
              "Caption jualan yang convert",
              "AI bantu riset pasar",
              "Template CS yang efisien",
            ],
            accent: "green",
          },
          {
            title: "Konten Kreator",
            items: [
              "20 ide konten dalam 10 detik",
              "Script video dari draft pertama",
              "Repurpose ke banyak platform",
            ],
            accent: "purple",
          },
        ],
      },
      {
        id: "s1-10",
        type: "practice",
        title: "Latihan: First Contact dengan AI",
        subtitle: "Praktik langsung hari ini",
        content:
          "Teori sudah cukup. Sekarang waktunya lo sendiri yang berinteraksi dengan AI. Buka salah satu dari ChatGPT, Claude, atau Gemini, dan coba prompt berikut:",
        prompts: [
          {
            label: "Latihan 1 — Kenali Dirimu (Refleksi 5 menit)",
            prompt: `Persona mana yang paling menggambarkan lo sebagai masisir?
(Akademisi / Organisator / Bisnisman / Kreator / Overwhelmed)

Apa satu masalah terbesar lo sebagai masisir yang paling sering bikin frustrasi?

Kalau masalah itu bisa diselesaikan dengan AI, hidup lo akan berubah seperti apa?`,
          },
          {
            label: "Latihan 2 — First Contact (15 menit)",
            prompt: `Saya adalah mahasiswa [jurusan lo] di Al-Azhar Kairo, semester [X].
Masalah terbesar saya minggu ini adalah [masalah nyata lo].
Tolong bantu saya dengan memberikan:
1. Tiga cara konkret AI bisa membantu masalah ini
2. Satu langkah pertama yang bisa saya lakukan sekarang`,
          },
        ],
        note: "Simpan jawaban dari latihan 1 — kita akan kembali ke sini di Sesi 6.",
      },
      {
        id: "s1-11",
        type: "concept",
        title: "Take-Home Challenge",
        subtitle: "Yang harus lo lakukan sebelum Sesi 2",
        content:
          "Tidak ada jawaban benar atau salah. Yang penting: lo sudah mulai berinteraksi dengan AI secara intentional.",
        bullets: [
          "Pilih satu masalah nyata yang lo hadapi minggu ini sebagai masisir",
          "Tanyakan ke dua AI berbeda (boleh pakai prompt bebas dulu)",
          "Screenshot atau catat hasilnya — mana yang lebih berguna, kenapa?",
          "Bawa ke Sesi 2 — kita akan gunakan ini sebagai bahan belajar prompting",
        ],
        isCompletion: true,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // SESI 2 — Ngomong yang Bener, Dapet yang Bener
  // ═══════════════════════════════════════════════════════
  {
    sesiNumber: 2,
    title: "Ngomong yang Bener, Dapet yang Bener",
    subtitle: "Kuasai seni prompting — dari biasa ke powerful",
    steps: [
      {
        id: "s2-1",
        type: "concept",
        title: "Prompt Adalah Skill, Bukan Keberuntungan",
        subtitle: "Kenapa ada yang dapat hasil bagus, ada yang tidak",
        content:
          "Ada misconception besar: 'AI itu pintar, harusnya ngerti maksud gue walau nanya singkat.' Ini salah besar. AI tidak bisa membaca pikiran lo — AI hanya merespons apa yang lo tulis.",
        quote:
          "Bayangkan lo datang ke dokter dan bilang 'Dok, saya sakit.' Dokter yang baik akan tanya balik. Tapi AI tidak selalu tanya balik. Kalau lo ga kasih info yang cukup, AI akan menebak — dan tebakan itu sering meleset.",
        bullets: [
          "Paham anatomy of a great prompt — formula RCTFC",
          "Bisa mengubah prompt jelek menjadi prompt bagus secara real-time",
          "Menguasai teknik prompt chaining untuk tugas kompleks",
          "Punya prompt library pribadi pertama yang bisa dipakai ulang",
        ],
      },
      {
        id: "s2-2",
        type: "concept",
        title: "Formula RCTFC",
        subtitle: "5 elemen yang membuat prompt lo powerful",
        content:
          "RCTFC adalah framework yang bisa lo gunakan untuk hampir semua tugas. Setiap huruf mewakili satu elemen penting yang harus ada di prompt lo.",
        cards: [
          {
            title: "R — Role",
            items: [
              "Siapa AI ini dalam konteks ini?",
              "Kasih AI sebuah 'identitas' yang sesuai.",
              'Contoh: "Kamu adalah dosen pembimbing yang ahli dalam fiqih kontemporer..."',
            ],
            accent: "purple",
          },
          {
            title: "C — Context",
            items: [
              "Apa situasi dan latar belakangnya?",
              "Ceritakan siapa lo, di mana, apa yang sedang terjadi.",
              'Contoh: "Saya mahasiswa semester 4 Jurusan Tafsir di Fakultas Ushuluddin Al-Azhar Kairo..."',
            ],
            accent: "blue",
          },
          {
            title: "T — Task",
            items: [
              "Apa yang lo minta AI lakukan?",
              "Gunakan kata kerja spesifik: buatkan, analisis, rangkum, terjemahkan.",
              'Contoh: "Buatkan outline 5 bab dengan masing-masing 3 sub-poin..."',
            ],
            accent: "green",
          },
          {
            title: "F — Format",
            items: [
              "Bagaimana lo mau output-nya disajikan?",
              "Bullet points, tabel, paragraf, bahasa tertentu, panjang tertentu.",
              'Contoh: "Sajikan dalam format tabel dengan 3 kolom..."',
            ],
            accent: "purple",
          },
          {
            title: "C — Constraint",
            items: [
              "Apa yang tidak boleh ada, atau batasan yang harus diikuti.",
              'Contoh: "Jangan gunakan referensi di luar kitab klasik. Maksimal 300 kata per bagian."',
            ],
            accent: "blue",
          },
        ],
      },
      {
        id: "s2-3",
        type: "practice",
        title: "Workshop RCTFC — Akademisi & Organisator",
        subtitle: "Lihat transformasi prompt dari jelek ke powerful",
        content:
          "Ini adalah contoh nyata transformasi prompt menggunakan formula RCTFC. Perhatikan perbedaan antara prompt biasa dan prompt yang sudah dioptimasi:",
        prompts: [
          {
            label: "Akademisi — Prompt Jelek",
            prompt: `tolong buatin makalah tentang riba`,
          },
          {
            label: "Akademisi — Prompt RCTFC (Hasil Jauh Lebih Baik)",
            prompt: `[Role] Kamu adalah akademisi Islam yang ahli dalam fiqih muamalat 
dan ekonomi Islam kontemporer.

[Context] Saya mahasiswa semester 5 Jurusan Syariah Al-Azhar Kairo. 
Saya harus mengumpulkan makalah 10 halaman untuk mata kuliah Fiqih 
Muamalat. Dosen saya sangat ketat soal referensi — wajib dari kitab 
klasik, minimal 5 referensi.

[Task] Buatkan outline makalah tentang "Riba dalam Transaksi Digital: 
Analisis Hukum Islam terhadap Pinjaman Online" dengan 5 bab utama, 
masing-masing 3 sub-poin.

[Format] Numbered list. Untuk setiap bab, tambahkan satu paragraf 
singkat (2-3 kalimat) yang menjelaskan argumen utamanya. Di akhir, 
berikan 5 rekomendasi referensi kitab klasik yang relevan.

[Constraint] Bahasa Indonesia formal akademik. Jangan masukkan 
referensi dari internet atau blog — hanya kitab dan jurnal ilmiah.`,
          },
          {
            label: "Organisator — Prompt RCTFC",
            prompt: `[Role] Kamu adalah sekretaris profesional yang berpengalaman 
membuat proposal kegiatan mahasiswa di luar negeri.

[Context] Saya ketua divisi akademik di organisasi mahasiswa 
Indonesia di Kairo (PPMI). Kami akan mengadakan seminar online 
dengan tema "Peran Masisir dalam Dakwah Digital" untuk 200 peserta 
dari seluruh Indonesia. Acara dijadwalkan tanggal 15 Agustus, 
durasi 3 jam via Zoom.

[Task] Buatkan proposal kegiatan lengkap yang mencakup: latar 
belakang, tujuan, sasaran peserta, susunan acara, estimasi anggaran, 
dan penutup.

[Format] Format proposal formal dengan heading yang jelas. 
Estimasi anggaran dalam bentuk tabel. Total panjang maksimal 3 halaman A4.

[Constraint] Anggaran total tidak lebih dari Rp 5.000.000. 
Bahasa Indonesia formal. Narasumber adalah mahasiswa S3 Al-Azhar 
— jangan ada biaya narasumber.`,
          },
        ],
      },
      {
        id: "s2-4",
        type: "practice",
        title: "Workshop RCTFC — Bisnisman & Konten Kreator",
        subtitle: "RCTFC bekerja untuk semua persona masisir",
        prompts: [
          {
            label: "Bisnisman — Prompt RCTFC",
            prompt: `[Role] Kamu adalah copywriter e-commerce yang spesialis 
di fashion muslimah Indonesia.

[Context] Saya menjual gamis import Mesir secara online ke pelanggan 
di Indonesia melalui Instagram dan WhatsApp. Target pelanggan saya 
adalah perempuan usia 20-35 tahun, kelas menengah, yang ingin tampil 
modis tapi tetap syar'i.

[Task] Buatkan 5 variasi caption untuk produk gamis warna dusty rose 
dengan bahan premium linen Mesir, harga Rp 350.000, free ongkir 
Jawa-Bali.

[Format] Setiap caption: 3-5 kalimat, diakhiri dengan call-to-action, 
dan 5 hashtag relevan. Buat dalam 5 gaya berbeda: emotional, 
informatif, storytelling, urgency, dan testimonial.

[Constraint] Jangan gunakan kata-kata berlebihan seperti "terbaik 
sejagat". Tone harus hangat dan autentik, bukan hard-selling.`,
          },
          {
            label: "Konten Kreator — Prompt RCTFC",
            prompt: `[Role] Kamu adalah content strategist yang spesialis di konten 
edukasi-hiburan untuk mahasiswa Muslim Indonesia.

[Context] Saya content creator di TikTok dan Instagram dengan niche 
"kehidupan masisir di Mesir". Followers saya 15.000 orang, mayoritas 
mahasiswa dan calon mahasiswa Al-Azhar. Saya posting 4x seminggu. 
Konten yang perform terbaik: mix antara edukasi Islam ringan dan slice 
of life Kairo.

[Task] Buatkan content calendar 1 bulan (4 minggu x 4 konten) dengan 
variasi format: TikTok/Reels, carousel Instagram, dan Twitter/X thread.

[Format] Tabel dengan kolom: Minggu | Hari | Format | Judul Konten | 
Hook Pembuka | Poin Utama (3 poin) | CTA.

[Constraint] Semua konten harus relevan dengan kehidupan masisir atau 
Islam. Tidak ada konten yang berpotensi kontroversial soal perbedaan 
mazhab. Setiap minggu harus ada minimal 1 konten yang bisa viral.`,
          },
        ],
      },
      {
        id: "s2-5",
        type: "concept",
        title: "Prompt Chaining: Tanya Bertahap",
        subtitle: "Teknik lanjutan untuk hasil yang jauh lebih baik",
        content:
          "Satu prompt besar tidak selalu lebih baik dari serangkaian prompt kecil yang terarah. Ini yang disebut prompt chaining — memecah tugas besar menjadi langkah-langkah yang lebih mudah dikontrol.",
        bullets: [
          "Mulai dari eksplorasi — biarkan AI bantu lo menemukan angle terbaik",
          "Pilih yang terbaik — baru minta AI kembangkan lebih dalam",
          "Buat bagian per bagian — jangan minta semuanya sekaligus",
          "Review setiap hasil — perbaiki sebelum lanjut ke tahap berikutnya",
        ],
        quote:
          "Prompt chaining = lo jadi sutradara yang memimpin AI step by step, bukan sekaligus satu kali.",
      },
      {
        id: "s2-6",
        type: "practice",
        title: "Contoh Prompt Chain: Menulis Makalah",
        subtitle: "4 prompt bertahap untuk satu makalah hadits yang kuat",
        content:
          "Contoh nyata prompt chaining untuk menulis makalah hadits. Ikuti urutan ini — setiap prompt bergantung pada hasil prompt sebelumnya:",
        prompts: [
          {
            label: "Prompt 1 — Eksplorasi Topik",
            prompt: `Saya mahasiswa Al-Azhar jurusan Hadits. Saya mau nulis makalah 
tentang hadits dhaif tapi bingung angle yang menarik. Berikan 5 
topik spesifik yang belum banyak ditulis tapi relevan dengan 
konteks kekinian.`,
          },
          {
            label: "Prompt 2 — Pilih dan Kembangkan",
            prompt: `Dari 5 topik tadi, saya pilih nomor 3 tentang [topik pilihan]. 
Sekarang buatkan outline 5 bab dengan sub-poin detail dan argumen 
utama per bab.`,
          },
          {
            label: "Prompt 3 — Draft Bagian Pertama",
            prompt: `Bagus. Sekarang tulis Bab 1 (Pendahuluan) berdasarkan outline di 
atas. Panjang 400-500 kata, gaya akademik formal, dalam bahasa Arab.`,
          },
          {
            label: "Prompt 4 — Review dan Perbaiki",
            prompt: `Cek teks Arab yang kamu tulis tadi. Apakah ada kesalahan nahwu 
atau sharaf? Perbaiki dan jelaskan koreksinya.`,
          },
        ],
      },
      {
        id: "s2-7",
        type: "concept",
        title: "Bangun Prompt Library Pribadi Lo",
        subtitle: "Simpan prompt bagus — jangan buat ulang dari nol",
        content:
          "Setiap kali lo dapat prompt yang hasilnya bagus — simpan. Beri nama yang mudah dicari, tandai variabel yang bisa diganti dengan [TOPIK], [JURUSAN], dll.",
        bullets: [
          "Simpan di Notion (paling recommended), Google Docs, atau Notes di HP",
          "Tandai variabel dengan tanda kurung siku: [TOPIK], [JURUSAN], [NAMA]",
          "Kategorikan: Akademik, Organisasi, Bisnis, Konten",
          "Review dan update library-mu setiap bulan",
        ],
        quote:
          "Prompt library adalah aset yang nilainya bertambah seiring waktu — semakin sering lo pakai AI, semakin kaya library lo.",
      },
      {
        id: "s2-8",
        type: "practice",
        title: "Template Prompt Library + Latihan",
        subtitle: "Template siap pakai yang bisa langsung lo simpan",
        content:
          "Template berikut bisa langsung lo copy ke prompt library lo. Ganti bagian dalam tanda kurung siku dengan konteks spesifik lo:",
        prompts: [
          {
            label: "Template Master — Prompt Akademik",
            prompt: `[Role] Kamu adalah akademisi Islam yang ahli dalam [BIDANG ILMU].

[Context] Saya mahasiswa [JURUSAN] semester [X] di Al-Azhar Kairo. 
Saya menulis makalah untuk mata kuliah [MATA KULIAH].

[Task] Buatkan outline makalah tentang "[JUDUL MAKALAH]" 
dengan 5 bab utama dan 3 sub-poin per bab.

[Format] Numbered list. Tambahkan deskripsi singkat per bab. 
5 rekomendasi referensi di akhir.

[Constraint] Bahasa Indonesia formal. Referensi hanya dari kitab klasik.`,
          },
          {
            label: "Latihan — Bedah Prompt A (Analisis)",
            prompt: `Jelaskan tentang manajemen waktu untuk mahasiswa yang sibuk organisasi`,
          },
          {
            label: "Latihan — Bedah Prompt B (Lebih Baik — Kenapa?)",
            prompt: `Saya ketua BEM di kampus. Bantu saya buat jadwal mingguan yang bisa 
balance antara kuliah, rapat, dan belajar mandiri. Saya punya kuliah 
20 jam/minggu dan rapat rata-rata 8 jam/minggu.`,
          },
        ],
        note: "Dari dua prompt latihan di atas, mana yang lebih lengkap? Elemen RCTFC apa yang masih kurang dari masing-masing?",
      },
      {
        id: "s2-9",
        type: "concept",
        title: "Take-Home Challenge",
        subtitle: "Yang harus lo lakukan sebelum Sesi 3",
        content:
          "Prompt library pertama lo dimulai dari sini. Setiap prompt bagus yang lo temukan adalah aset yang nilainya bertambah terus.",
        bullets: [
          "Buat 3 prompt RCTFC untuk 3 masalah berbeda dalam hidup lo sebagai masisir",
          "Coba setiap prompt ke AI dan catat hasilnya",
          "Simpan prompt yang hasilnya bagus ke prompt library pertama lo",
        ],
        isCompletion: true,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // SESI 3 — AI Jadi Asisten Akademik & Organisasi Lo
  // ═══════════════════════════════════════════════════════
  {
    sesiNumber: 3,
    title: "AI Jadi Asisten Akademik & Organisasi Lo",
    subtitle: "Selesaikan tugas nyata lebih cepat dengan tools yang tepat",
    steps: [
      {
        id: "s3-1",
        type: "concept",
        title: "Selamat Datang di Sesi 3",
        subtitle: "Dari teori ke praktik nyata",
        content:
          "Sesi 1 dan 2 adalah fondasi. Sekarang kita gunakan AI untuk menyelesaikan tugas nyata yang lo hadapi setiap hari sebagai masisir Al-Azhar.",
        bullets: [
          "Bisa pakai AI untuk menyelesaikan tugas akademik secara signifikan lebih cepat",
          "Tahu tools AI spesifik yang relevan untuk kebutuhan masisir Al-Azhar",
          "Menyelesaikan minimal satu tugas akademik atau organisasi nyata dengan AI hari ini",
        ],
        table: {
          headers: ["Tools", "Kegunaan untuk Akademik"],
          rows: [
            ["Claude", "Nulis makalah, review nahwu, outline, analisis argumen"],
            ["ChatGPT", "Brainstorming topik, cari angle unik, draft cepat"],
            ["NotebookLM", "Upload PDF kitab → tanya langsung ke dalamnya"],
            ["DeepL", "Terjemah profesional untuk teks non-Arab"],
            ["Gemini", "Riset referensi terkini, cek fakta online"],
          ],
        },
      },
      {
        id: "s3-2",
        type: "practice",
        title: "Makalah Bahasa Arab dengan AI",
        subtitle: "Game-changer untuk masisir Al-Azhar",
        content:
          "Ini yang paling dibutuhkan masisir Al-Azhar. Claude adalah tool terbaik untuk ini karena kemampuannya memahami konteks panjang dan nuansa bahasa Arab akademik.",
        prompts: [
          {
            label: "Prompt: Outline Makalah Arab",
            prompt: `[Role] Kamu adalah dosen pembimbing yang ahli dalam penulisan 
ilmiah bahasa Arab di lingkungan Al-Azhar.

[Context] Saya mahasiswa Fakultas Syariah Al-Azhar, semester 4. 
Saya harus menulis makalah 12 halaman dalam bahasa Arab untuk 
ujian akhir semester, dengan minimal 8 referensi dari kitab klasik.

[Task] Buatkan outline makalah tentang:
"حكم التأمين الصحي في ضوء الفقه الإسلامي المعاصر"
(Hukum Asuransi Kesehatan dalam Perspektif Fiqih Islam Kontemporer)

Sertakan 5 bab dengan 3 sub-poin per bab, dan 8 referensi kitab.

[Format] Outline dalam bahasa Arab. Nomor bab dengan angka Arab 
(١، ٢، ٣). Di akhir, tampilkan referensi dalam format footnote Arab.

[Constraint] Referensi hanya dari ulama klasik dan kontemporer 
yang diakui Al-Azhar. Tidak ada referensi internet.`,
          },
          {
            label: "Prompt: Review Nahwu & Sharaf",
            prompt: `Tolong review teks Arab berikut. Cek:
1. Kesalahan nahwu (harakat, i'rab, tanda baca)
2. Kesalahan sharaf (bentuk kata, wazan)
3. Gaya bahasa — apakah sesuai tulisan ilmiah akademik Al-Azhar?

Untuk setiap kesalahan, jelaskan: letak kesalahan, koreksinya, 
dan alasan gramatikalnya. Setelah review, tampilkan versi 
yang sudah dikoreksi secara lengkap.

[TEMPEL TEKS ARAB LO DI SINI]`,
          },
        ],
      },
      {
        id: "s3-3",
        type: "practice",
        title: "Terjemah dan Pahami Kitab Kuning",
        subtitle: "NotebookLM + Claude = kombinasi terbaik",
        content:
          "Game-changer untuk pemahaman kitab. Upload PDF kitab ke NotebookLM, lalu bisa tanya langsung ke dalamnya. Untuk terjemah yang nuanced, gunakan Claude.",
        prompts: [
          {
            label: "Prompt: Terjemah + Penjelasan Kitab",
            prompt: `Berikut adalah teks dari Kitab Fathul Qarib karya Ibn Qasim Al-Ghazi:

[TEMPEL TEKS ARAB DI SINI]

Tolong:
1. Terjemahkan ke bahasa Indonesia yang mudah dipahami
2. Jelaskan istilah fiqih teknis yang muncul
3. Berikan konteks: ini bagian dari bab apa? Membahas hukum apa?
4. Kalau ada khilaf (perbedaan pendapat ulama) di masalah ini, sebutkan

Gaya penjelasan: seperti ustaz yang menjelaskan ke santri baru, 
jelas tapi tetap ilmiah.`,
          },
          {
            label: "Panduan: Setup NotebookLM untuk Kitab",
            prompt: `[Cara Pakai NotebookLM untuk Kitab]

1. Buka notebooklm.google.com
2. Buat notebook baru
3. Upload file PDF kitab yang mau dipelajari
4. Setelah diproses, kamu bisa tanya langsung:

Contoh pertanyaan ke NotebookLM:
- "Apa pendapat penulis tentang hukum [X] di halaman berapa?"
- "Ringkas bab 3 tentang [topik]"
- "Bandingkan pendapat penulis di bab 2 dan bab 5 tentang [masalah]"
- "Buat timeline kronologis perkembangan pendapat dalam kitab ini"`,
          },
        ],
      },
      {
        id: "s3-4",
        type: "practice",
        title: "Riset Skripsi Lebih Efisien",
        subtitle: "AI untuk menemukan gap penelitian dan analisis jurnal",
        content:
          "AI bisa membantu lo menemukan celah penelitian yang belum banyak ditulis, dan menganalisis jurnal-jurnal yang relevan dengan lebih cepat.",
        prompts: [
          {
            label: "Prompt: Cari Gap Penelitian",
            prompt: `Saya sedang riset untuk skripsi saya tentang [TOPIK UMUM].

Tolong bantu saya:
1. Identifikasi 5 aspek yang sudah banyak diteliti (well-covered areas)
2. Identifikasi 5 gap penelitian yang masih terbuka dan relevan
3. Untuk setiap gap, jelaskan kenapa ini penting diteliti sekarang
4. Rekomendasikan 3 angle yang paling feasible untuk skripsi 
   mahasiswa S1

Konteks: Saya di [JURUSAN] Al-Azhar, pembimbing saya cenderung 
suka pendekatan [PENDEKATAN — misal: komparatif, analitis, dll].`,
          },
          {
            label: "Prompt: Bantu Analisis Jurnal",
            prompt: `Berikut adalah abstrak dari 3 jurnal yang relevan dengan skripsi saya:

Jurnal 1: [PASTE ABSTRAK]
Jurnal 2: [PASTE ABSTRAK]  
Jurnal 3: [PASTE ABSTRAK]

Tolong:
1. Ringkas temuan utama setiap jurnal (3-4 kalimat per jurnal)
2. Identifikasi persamaan dan perbedaan temuan ketiga jurnal
3. Bagaimana ketiga jurnal ini bisa mendukung argumen skripsi saya 
   tentang [TOPIK SKRIPSI]?
4. Apakah ada kontradiksi yang perlu saya address di skripsi?`,
          },
        ],
      },
      {
        id: "s3-5",
        type: "practice",
        title: "AI untuk Organisasi Masisir",
        subtitle: "Proposal, notulensi, dan workflow lebih cepat",
        content:
          "Untuk yang aktif di PPMI atau organisasi masisir lainnya — AI bisa menghemat puluhan jam kerja administratif setiap bulannya.",
        prompts: [
          {
            label: "Prompt: Proposal Kegiatan",
            prompt: `[Role] Kamu adalah sekretaris profesional berpengalaman di PPMI Mesir.

[Context] Saya ketua divisi sosial PPMI Cabang [KOTA]. Kami akan 
mengadakan [NAMA KEGIATAN] pada [TANGGAL], dengan [JUMLAH] peserta, 
format [ONLINE/OFFLINE], anggaran maksimal Rp [X].

[Task] Buatkan proposal kegiatan lengkap dengan struktur:
- Judul, tema, dan latar belakang
- Tujuan kegiatan (5 poin)
- Sasaran dan target peserta
- Susunan acara detail (jam per jam)
- Kepanitiaan dan job description
- Estimasi anggaran (dalam tabel)
- Penutup

[Format] Format proposal formal PPMI. Tabel anggaran dengan kolom: 
No | Item | Satuan | Qty | Harga Satuan | Total.

[Constraint] Bahasa Indonesia formal. Anggaran dalam Rupiah.`,
          },
          {
            label: "Prompt: Notulensi Otomatis dengan TurboScribe",
            prompt: `[Cara pakai TurboScribe untuk notulensi rapat]

1. Rekam rapat (Zoom, Google Meet, atau rekaman manual)
2. Upload ke turboScribe.co
3. Tunggu transkripsi otomatis (biasanya 2-5 menit)
4. Copy hasil transkripsi, bawa ke Claude dengan prompt:

---
Berikut adalah transkripsi rapat [NAMA RAPAT] tanggal [TANGGAL]:

[PASTE TRANSKRIPSI DI SINI]

Tolong ubah ini menjadi notulensi rapat formal dengan format:
- Informasi rapat (tanggal, tempat, peserta)
- Poin-poin yang dibahas (ringkas, jelas)
- Keputusan yang diambil (per poin)
- Action items (siapa harus melakukan apa, kapan)
- Pertanyaan yang belum terjawab (jika ada)`,
          },
        ],
      },
      {
        id: "s3-6",
        type: "concept",
        title: "Pilih Latihan Lo",
        subtitle: "Selesaikan satu tugas nyata hari ini",
        content:
          "Teori sudah cukup. Pilih satu latihan di bawah ini dan selesaikan sebelum sesi berakhir. Yang penting: gunakan prompt yang sudah disediakan, bukan prompt asal-asalan.",
        cards: [
          {
            title: "Opsi A — Akademisi",
            items: [
              "Ambil satu paragraf teks Arab dari kitab yang sedang lo pelajari",
              "Copy ke Claude dengan prompt review nahwu",
              "Perhatikan apa yang AI koreksi dan jelaskan",
            ],
            accent: "purple",
          },
          {
            title: "Opsi B — Organisator",
            items: [
              "Buat draft proposal untuk kegiatan yang sudah direncanakan organisasimu",
              "Pakai prompt proposal di atas, sesuaikan dengan detail nyata",
              "Hasil langsung bisa dipakai untuk mengajukan ke pengurus",
            ],
            accent: "blue",
          },
          {
            title: "Opsi C — Skripsi/Thesis",
            items: [
              "Paste abstrak 2-3 jurnal relevan dengan skripsi lo ke Claude",
              "Minta AI bantu analisis gap dan posisi penelitianmu",
              "Catat insight yang belum pernah lo pikirkan sebelumnya",
            ],
            accent: "green",
          },
        ],
      },
      {
        id: "s3-7",
        type: "concept",
        title: "Take-Home Challenge",
        subtitle: "Yang harus lo lakukan sebelum Sesi 4",
        content:
          "Sesi 3 adalah checkpoint penting: untuk pertama kalinya lo harus menggunakan AI untuk menyelesaikan tugas nyata — bukan hanya latihan.",
        bullets: [
          "Selesaikan minimal satu tugas akademik atau organisasi nyata menggunakan AI",
          "Catat: berapa lama biasanya lo kerjakan vs dengan AI? Berapa persen lebih cepat?",
          "Catat juga: apa yang AI lakukan dengan baik, dan apa yang masih perlu lo perbaiki manual?",
        ],
        isCompletion: true,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // SESI 4 — AI Jadi Mesin Cuan Lo
  // ═══════════════════════════════════════════════════════
  {
    sesiNumber: 4,
    title: "AI Jadi Mesin Cuan Lo",
    subtitle: "Riset pasar, copywriting, dan konten yang menghasilkan",
    steps: [
      {
        id: "s4-1",
        type: "concept",
        title: "Selamat Datang di Sesi 4",
        subtitle: "AI untuk bisnis dan konten yang menghasilkan",
        content:
          "Sesi ini untuk lo yang punya bisnis atau mau punya bisnis — jualan gamis, jasa desain, konten kreator, atau apapun. AI bisa jadi mesin pendukung yang menghemat biaya dan waktu riset.",
        bullets: [
          "Bisa riset produk dan kompetitor dengan AI lebih efisien",
          "Kuasai formula copywriting AI yang convert untuk jualan online",
          "Punya content calendar 1 bulan yang siap dieksekusi",
          "Tahu cara repurpose satu konten ke banyak platform",
        ],
      },
      {
        id: "s4-2",
        type: "practice",
        title: "Riset Produk & Kompetitor",
        subtitle: "Sebelum jual apapun, riset dulu",
        content:
          "Sebelum jual apapun, lo perlu tau pasar. AI bisa membantu lo riset 10x lebih cepat — yang biasanya butuh beberapa hari riset manual bisa selesai dalam satu jam.",
        prompts: [
          {
            label: "Prompt: Riset Pasar Produk",
            prompt: `[Role] Kamu adalah analis bisnis yang spesialis di e-commerce 
Indonesia untuk produk fashion dan lifestyle.

[Context] Saya mahasiswa Indonesia di Kairo yang menjual produk 
[NAMA PRODUK] secara online ke Indonesia via Instagram dan Shopee. 
Modal awal saya terbatas, jadi saya harus sangat efisien dalam 
memilih produk dan strategi.

[Task] Bantu saya menganalisis potensi pasar untuk produk ini:
1. Siapa target pelanggan paling potensial? (demographics & psychographics)
2. Apa pain point utama mereka yang bisa diselesaikan produk ini?
3. Apa produk kompetitor yang sudah ada di pasar, dan apa kelemahan mereka?
4. Apa unique selling point yang bisa membedakan produk saya?
5. Platform mana yang paling efektif untuk menjangkau target ini?

[Format] Per poin, berikan 3-5 insight konkret. Di akhir, berikan 
1 rekomendasi positioning yang paling kuat.`,
          },
          {
            label: "Prompt: Analisis Kompetitor",
            prompt: `Saya mau menganalisis kompetitor untuk bisnis [JENIS BISNIS] saya.

Tolong bantu saya membuat framework analisis kompetitor:
1. 5 pertanyaan kunci yang harus saya jawab tentang kompetitor
2. Cara menggunakan AI untuk "intip" strategi kompetitor dari konten 
   publik mereka
3. Bagaimana mengidentifikasi celah yang belum mereka isi

Bonus: berikan template tabel perbandingan kompetitor yang bisa 
saya isi sendiri.`,
          },
        ],
      },
      {
        id: "s4-3",
        type: "concept",
        title: "Framework Copywriting yang Convert",
        subtitle: "Formula yang sudah terbukti, bukan asal kreatif",
        content:
          "Formula copywriting bukan soal kreativitas — ini soal psikologi. Ada 4 framework utama yang bisa lo gunakan dengan AI untuk menghasilkan konten yang menggerakkan orang untuk membeli.",
        cards: [
          {
            title: "AIDA",
            items: [
              "Attention → Interest → Desire → Action",
              "Terbaik untuk: Caption Instagram, landing page",
            ],
            accent: "purple",
          },
          {
            title: "PAS",
            items: [
              "Problem → Agitate → Solution",
              "Terbaik untuk: WhatsApp broadcast, email marketing",
            ],
            accent: "blue",
          },
          {
            title: "FAB",
            items: [
              "Feature → Advantage → Benefit",
              "Terbaik untuk: Deskripsi produk, storytelling jualan",
            ],
            accent: "green",
          },
          {
            title: "Storytelling",
            items: [
              "Setup → Conflict → Resolution",
              "Terbaik untuk: Konten viral, testimonial, personal branding",
            ],
            accent: "purple",
          },
        ],
      },
      {
        id: "s4-4",
        type: "practice",
        title: "Generate Copy AIDA dan PAS",
        subtitle: "Prompt siap pakai untuk dua framework terkuat",
        content:
          "Gunakan dua prompt ini sebagai template untuk copywriting bisnis lo. Ganti bagian dalam kurung siku dengan produk dan konteks spesifik lo:",
        prompts: [
          {
            label: "Prompt: Generate Copy AIDA",
            prompt: `[Role] Kamu adalah copywriter senior yang spesialis di e-commerce 
Indonesia, dengan track record konten yang conversion rate-nya tinggi.

[Context] Saya menjual [NAMA PRODUK] seharga [HARGA] via Instagram. 
Target pelanggan: [DESKRIPSI TARGET]. Kompetitor utama saya 
menawarkan [KELEBIHAN KOMPETITOR].

[Task] Buatkan 3 variasi caption dengan framework AIDA untuk produk ini.
Variasi 1: tone emotional (cerita/perasaan)
Variasi 2: tone informatif (fakta dan spesifikasi)
Variasi 3: tone urgency (terbatas/deadline)

[Format] Setiap caption: max 200 kata, diakhiri CTA yang spesifik, 
dan 5 hashtag yang relevan. Beri rating 1-10 untuk setiap variasi 
beserta alasannya.

[Constraint] Tidak boleh ada klaim yang tidak bisa dibuktikan. 
Tone harus sesuai dengan brand yang hangat dan autentik.`,
          },
          {
            label: "Prompt: Copywriting PAS",
            prompt: `Gunakan framework PAS untuk membuat:
1. WhatsApp broadcast (max 150 kata) untuk produk [PRODUK]
2. Email marketing subject line (5 variasi A/B test)

Product: [NAMA PRODUK]
Target pain point: [MASALAH UTAMA TARGET PELANGGAN]
Solusi yang ditawarkan: [MANFAAT UTAMA PRODUK]
CTA: [TINDAKAN YANG DIINGINKAN]`,
          },
        ],
      },
      {
        id: "s4-5",
        type: "practice",
        title: "Content Calendar + Script Video",
        subtitle: "Rencanakan konten 1 bulan dalam 10 menit",
        content:
          "Satu sesi dengan AI bisa menghasilkan content calendar lengkap 1 bulan. Ditambah script untuk setiap video yang siap dibacakan — tinggal rekam.",
        prompts: [
          {
            label: "Prompt: Content Calendar 1 Bulan",
            prompt: `[Role] Kamu adalah social media strategist yang spesialis 
di konten untuk bisnis online Indonesia.

[Context] Saya memiliki bisnis [JENIS BISNIS]. Target pelanggan 
saya adalah [DESKRIPSI TARGET]. Saya aktif di [PLATFORM: Instagram/TikTok/dll]. 
Saya bisa posting [X] kali per minggu. Brand tone saya: [warm/professional/playful/dll].

[Task] Buatkan content calendar 4 minggu (1 bulan) yang mencakup:
- Konten edukasi (30%)
- Konten promosi produk (30%)
- Konten engagement/hiburan (20%)
- Behind the scenes/personal (20%)

[Format] Tabel dengan kolom: Minggu | Hari | Format | Judul/Hook | 
Poin Utama (3 poin) | CTA | Tipe Konten

[Constraint] Semua konten harus relevan dengan produk atau brand.
Minimal 1 konten per minggu yang berpotensi viral.`,
          },
          {
            label: "Prompt: Script Video TikTok (60 detik)",
            prompt: `Buatkan script video TikTok/Reels durasi 60 detik tentang [TOPIK].

Format script:
- Hook (3 detik pertama): kalimat pembuka yang bikin orang stop scrolling
- Setup (5 detik): konteks singkat
- Main content (40 detik): 3 poin utama dengan transisi natural
- CTA (12 detik): ajakan yang spesifik dan mudah dilakukan

Target: [DESKRIPSI AUDIENS]
Tone: [CONVERSATIONAL/EDUCATIONAL/ENTERTAINING]
Tujuan: [KESADARAN BRAND/JUALAN/EDUKASI]

Tambahkan catatan sutradara: kapan harus cut, B-roll apa yang 
dibutuhkan, teks apa yang muncul di layar.`,
          },
        ],
      },
      {
        id: "s4-6",
        type: "practice",
        title: "Repurpose: Satu Konten, Banyak Platform",
        subtitle: "Buat sekali, distribusikan ke mana-mana",
        content:
          "Prinsip: buat sekali, distribusikan banyak. Satu video TikTok bisa jadi 5 format berbeda hanya dalam hitungan menit dengan AI:",
        table: {
          headers: ["Sumber Konten", "Bisa Jadi"],
          rows: [
            [
              "Video TikTok 60 detik",
              "Reels Instagram, YouTube Shorts, Twitter/X thread, caption blog",
            ],
            ["Thread Twitter", "Carousel Instagram, newsletter, LinkedIn post"],
            ["Artikel/blog 1000 kata", "5 tweet, 1 carousel, 1 video script, 1 newsletter issue"],
            [
              "Podcast/rekaman audio",
              "Transkripsi → artikel → tweet thread → kutipan visual",
            ],
          ],
        },
        prompts: [
          {
            label: "Prompt: Repurpose Master — 1 Konten ke 5 Format",
            prompt: `Berikut adalah [VIDEO SCRIPT / ARTIKEL / THREAD] yang sudah saya buat:

[PASTE KONTEN ORIGINAL DI SINI]

Tolong ubah konten ini menjadi:
1. Caption Instagram (max 150 kata + 5 hashtag)
2. Twitter/X thread (5-7 tweet, setiap tweet max 280 karakter)
3. Carousel Instagram (judul slide + 1 kalimat per slide, 5-7 slide)
4. WhatsApp status (max 3 kalimat, sangat casual)
5. Email newsletter (subjek + intro 2 paragraf + main points)

Pertahankan pesan utama yang sama, tapi sesuaikan tone dan format 
untuk setiap platform. Sertakan CTA yang berbeda untuk setiap format.`,
          },
        ],
      },
      {
        id: "s4-7",
        type: "concept",
        title: "Take-Home Challenge",
        subtitle: "Yang harus lo lakukan sebelum Sesi 5",
        content:
          "Sesi 5 adalah tentang vibe coding — lo akan buat aplikasi atau otomasi sendiri. Mulai pikirkan masalah apa yang mau lo selesaikan.",
        bullets: [
          "Buat satu konten lengkap dari A sampai Z dengan AI: ide → teks → visual (Canva AI)",
          "Kalau punya bisnis: buat 3 caption dan coba posting salah satunya",
          "Mulai pikirkan: masalah apa yang mau lo selesaikan di Sesi 5 (vibe coding)?",
        ],
        isCompletion: true,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // SESI 5 — Lo Bisa Bikin Aplikasi Sendiri
  // ═══════════════════════════════════════════════════════
  {
    sesiNumber: 5,
    title: "Lo Bisa Bikin Aplikasi Sendiri",
    subtitle: "Vibe coding: dari ide ke produk nyata tanpa background coding",
    steps: [
      {
        id: "s5-1",
        type: "concept",
        title: "Apa Itu Vibe Coding?",
        subtitle: "Paradigma baru membangun software",
        content:
          'Istilah "vibe coding" dipopulerkan oleh Andrej Karpathy (mantan Head of AI di Tesla, pendiri OpenAI). Konsepnya sederhana: lo tidak perlu bisa coding untuk membuat software — lo hanya perlu bisa mendeskripsikan apa yang lo mau.',
        quote:
          "Dulu untuk punya rumah, lo harus bisa tukang batu sendiri. Sekarang lo bisa jadi arsitek yang mendeskripsikan bangunan ke tim kontraktor. Vibe coding = lo jadi arsitek, AI jadi kontraktornya.",
        bullets: [
          "Paham apa itu vibe coding dan kenapa ini mengubah segalanya",
          "Bisa membuat web app sederhana menggunakan Lovable atau Bolt",
          "Tahu cara generate dan jalankan script otomasi dengan Claude + Replit",
          "Punya satu solusi nyata yang siap dipresentasikan di Demo Day",
        ],
      },
      {
        id: "s5-2",
        type: "concept",
        title: "Dulu vs Sekarang",
        subtitle: "Revolusi yang sedang terjadi sekarang",
        content:
          "Ini bukan hype — ini pergeseran nyata. 92% developer di AS sudah pakai AI coding tools setiap hari. Lovable mencapai $300 juta revenue per tahun dalam waktu kurang dari setahun setelah diluncurkan.",
        cards: [
          {
            title: "Dulu — Cara Lama",
            items: [
              "Belajar coding 6-12 bulan dulu",
              "Bayar developer jutaan untuk app sederhana",
              "Ide bagus tapi tidak bisa dieksekusi sendiri",
              "Bergantung penuh pada orang lain",
            ],
            accent: "red",
          },
          {
            title: "Sekarang — Dengan Vibe Coding",
            items: [
              "Describe → generate → iterate",
              "Web app sederhana dalam hitungan jam",
              "Prototype ide dalam sehari",
              "Lo kontrol penuh atas produk lo",
            ],
            accent: "green",
          },
        ],
        table: {
          headers: ["Tools", "Kekuatan", "Terbaik untuk", "Harga"],
          rows: [
            [
              "Lovable.dev",
              "Paling mudah, UI terbaik, bisa tambah database",
              "Beginners, app dengan database",
              "Freemium",
            ],
            [
              "Bolt.new",
              "Sangat cepat, output bersih, bisa deploy langsung",
              "Prototyping cepat, landing page",
              "Freemium",
            ],
            [
              "v0.dev (Vercel)",
              "Spesialis UI, output code sangat bersih",
              "Dashboard, UI kompleks",
              "Freemium",
            ],
            [
              "Replit Agent",
              "Full-stack, bisa tambah backend & API",
              "App yang butuh server",
              "Freemium",
            ],
            [
              "n8n / Make",
              "Automation workflow no-code",
              "Integrasi antar apps",
              "Freemium/Paid",
            ],
          ],
        },
      },
      {
        id: "s5-3",
        type: "practice",
        title: "Demo: Buat Web App dengan Lovable",
        subtitle: "Prompt nyata untuk web app katalog produk",
        content:
          "Skenario: masisir yang jualan gamis import mau punya website katalog produk sederhana tanpa bayar developer. Buka lovable.dev dan coba prompt berikut:",
        prompts: [
          {
            label: "Prompt untuk Lovable.dev — Web App Katalog Produk",
            prompt: `Buat website katalog produk untuk toko gamis online bernama 
"Nisa Collection - Gamis Import Mesir".

Spesifikasi:
- Halaman utama dengan hero section dan tagline
- Grid produk dengan: foto produk, nama, harga, tombol 
  "Pesan via WhatsApp"
- Tombol WhatsApp langsung terhubung ke nomor 62812345678
- Halaman "Tentang Kami" dengan cerita singkat toko
- Desain: warna dusty rose dan cream, feminine tapi elegan
- Mobile-friendly (penting, mayoritas pelanggan dari HP)
- Tidak perlu login atau checkout — cukup redirect ke WA

Tone: hangat, premium, terpercaya.`,
          },
          {
            label: "Prompt Iterasi — Setelah Generate Pertama",
            prompt: `Ubah section produk agar ada badge "Terlaris" pada produk pertama.
Tambahkan section "Testimoni Pelanggan" dengan 3 testimoni.
Ganti font heading menjadi serif yang lebih elegan.`,
          },
        ],
        note: "Tips: Jangan minta semua fitur dalam satu prompt. Generate dulu, lalu iterate dengan prompt tambahan.",
      },
      {
        id: "s5-4",
        type: "practice",
        title: "Generate Script + Jalankan di Replit",
        subtitle: "Python tanpa install apapun — langsung di browser",
        content:
          "Untuk tugas berulang, minta Claude generate script Python, lalu jalankan di Replit tanpa install apapun. Gratis dan langsung bisa dipakai:",
        prompts: [
          {
            label: "Prompt: Generate Script ke Claude",
            prompt: `Saya adalah ketua divisi akademik PPMI. Saya punya daftar 150 anggota 
di Google Sheets dengan kolom: Nama, Email, Jurusan, Batch, Status Iuran.

Tolong buatkan script Python yang bisa:
1. Baca file Excel dengan data anggota
2. Filter anggota dengan Status Iuran = "Belum Bayar"  
3. Generate file teks berisi pesan pengingat yang dipersonalisasi 
   untuk setiap anggota (pakai nama mereka)
4. Simpan output sebagai file CSV yang bisa saya pakai untuk 
   blast pesan via WhatsApp atau email

Sertakan penjelasan cara menjalankan script ini, langkah per langkah,
untuk orang yang belum pernah coding.`,
          },
          {
            label: "Panduan: Cara Jalankan di Replit",
            prompt: `1. Buka replit.com → buat akun gratis
2. Klik "Create Repl" → pilih Python
3. Di panel kiri, klik "Shell" atau buka file main.py
4. Copy-paste script dari Claude ke file main.py
5. Upload file Excel lo ke Replit (drag & drop)
6. Klik tombol "Run" (segitiga hijau)
7. Download output file dari panel kiri Replit`,
          },
        ],
      },
      {
        id: "s5-5",
        type: "concept",
        title: "Automation dengan n8n",
        subtitle: "Hubungkan semua apps lo tanpa kode",
        content:
          "n8n memungkinkan lo menghubungkan berbagai aplikasi tanpa kode — bayangkan seperti IFTTT tapi jauh lebih powerful. Setiap workflow adalah rangkaian trigger dan action yang berjalan otomatis.",
        cards: [
          {
            title: "Auto-post konten ke semua platform",
            items: [
              "Setiap kali lo upload ke Google Drive → auto-post ke Instagram, Twitter, dan WhatsApp grup",
            ],
            accent: "purple",
          },
          {
            title: "Notifikasi order otomatis",
            items: [
              "Setiap ada pesan WA baru dari pelanggan → kirim email ke lo + catat di Google Sheets",
            ],
            accent: "blue",
          },
          {
            title: "Database anggota otomatis",
            items: [
              "Setiap ada yang isi Google Form → auto-kirim email konfirmasi + tambah ke spreadsheet member",
            ],
            accent: "green",
          },
          {
            title: "Jadwal posting konten",
            items: [
              "Buat konten sekarang, jadwalkan posting otomatis untuk minggu depan ke semua platform",
            ],
            accent: "purple",
          },
        ],
      },
      {
        id: "s5-6",
        type: "practice",
        title: "Rancang Workflow + Tentukan Proyek Demo Day",
        subtitle: "Dari otomasi ke proyek nyata yang bisa dipresentasikan",
        content:
          "Di Sesi 6, lo akan mempresentasikan solusi nyata yang dibuat dengan AI. Ini bukan harus sempurna — yang penting nyata dan menyelesaikan masalah lo sendiri.",
        prompts: [
          {
            label: "Prompt: Rancang Workflow Otomasi",
            prompt: `Saya punya [DESKRIPSI SITUASI LO].

Masalah berulang yang paling menghabiskan waktu: [MASALAH SPESIFIK].

Tolong bantu saya merancang workflow automasi menggunakan n8n 
atau Make (Integromat) untuk menyelesaikan masalah ini:

1. Apa trigger yang memulai workflow? (event apa yang memicunya)
2. Langkah-langkah apa yang perlu terjadi secara otomatis?
3. Output akhir yang dihasilkan?
4. Apps/tools apa yang perlu dihubungkan?

Berikan langkah implementasi yang detail dan bisa diikuti 
orang non-teknis.`,
          },
          {
            label: "Template: Tentukan Proyek Demo Day Lo",
            prompt: `Masalah yang saya hadapi: [...]
Target pengguna solusi ini: [...]
Solusi yang akan saya buat: [...]
Tools yang akan saya gunakan: [...]
Hasil yang bisa dilihat saat Demo Day: [...]`,
          },
        ],
        table: {
          headers: ["Level", "Contoh Solusi"],
          rows: [
            ["Beginner", "Prompt library personal + dokumen panduan AI untuk rekan organisasi"],
            ["Intermediate", "Website katalog produk / website dokumentasi kegiatan"],
            ["Advanced", "Web app kecil untuk workflow tim organisasi / automation n8n"],
            ["Expert", "Tools custom yang bisa dipakai komunitas masisir lain"],
          ],
        },
      },
      {
        id: "s5-7",
        type: "concept",
        title: "Take-Home Challenge",
        subtitle: "Yang harus lo lakukan sebelum Sesi 6 (Demo Day)",
        content:
          "Ini challenge terakhir sebelum Demo Day. Tidak harus sempurna — yang penting bisa di-demo dan menyelesaikan masalah nyata.",
        bullets: [
          "Selesaikan proyek lo — tidak harus sempurna, tapi harus bisa di-demo",
          "Siapkan presentasi 5-7 menit: Masalah → Proses AI → Demo Hasil",
          "Screenshot atau rekam layar proses pembuatannya — ini bagian dari ceritanya",
          "Pikirkan: bagaimana lo bisa kembangkan solusi ini lebih jauh setelah Demo Day?",
        ],
        isCompletion: true,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // SESI 6 — Ini Solusi Gue (Demo Day)
  // ═══════════════════════════════════════════════════════
  {
    sesiNumber: 6,
    title: "Ini Solusi Gue",
    subtitle: "Demo Day — presentasikan solusi nyata yang lo bangun",
    steps: [
      {
        id: "s6-1",
        type: "concept",
        title: "Selamat, Lo Sudah Jauh!",
        subtitle: "Ingat dari mana lo mulai",
        content:
          "Ingat Sesi 1 — lo masuk dengan satu pertanyaan: 'AI sebenarnya bisa apa sih buat gue?' Hari ini, lo jawab sendiri pertanyaan itu.",
        cards: [
          {
            title: "Perjalanan 6 Sesi Lo",
            items: [
              "S01 — Lo paham cara kerja AI dan beda ChatGPT, Claude, Gemini",
              "S02 — Lo kuasai formula RCTFC — prompt lo sekarang jauh lebih tajam",
              "S03 — Lo bisa selesaikan tugas akademik dan organisasi lebih cepat",
              "S04 — Lo tahu cara bikin copywriting dan konten yang efektif",
              "S05 — Lo membangun sesuatu yang nyata — produk, tools, atau otomasi",
              "S06 — Lo mempresentasikan solusi lo ke komunitas hari ini",
            ],
            accent: "purple",
          },
        ],
        bullets: [
          "Presentasikan solusi nyata yang telah lo bangun selama 5 sesi",
          "Berikan dan terima feedback konstruktif antar sesama peserta",
          "Rancang next steps untuk mengembangkan solusi lebih jauh",
          "Dokumentasikan perjalanan lo sebagai portofolio AI tools pertama",
        ],
      },
      {
        id: "s6-2",
        type: "concept",
        title: "Format Presentasi Demo Day",
        subtitle: "5-7 menit untuk presentasikan solusi lo",
        content:
          "Setiap peserta mendapat 5-7 menit untuk presentasi + 2 menit Q&A. Gunakan 4 bagian berikut untuk struktur yang kuat:",
        cards: [
          {
            title: "01 — Masalah (1 menit)",
            items: [
              "Ceritakan masalah nyata yang lo hadapi — bukan abstrak",
              "Buat audiens bisa merasakan frustrasi yang lo rasakan",
              'Contoh: "Saya ketua divisi akademik PPMI. Setiap minggu saya kirim reminder iuran ke 150 orang — manual, satu-satu, via WA. Itu 3 jam kerja sia-sia setiap minggu."',
            ],
            accent: "red",
          },
          {
            title: "02 — Proses AI (2-3 menit)",
            items: [
              "Tunjukkan journey lo: prompt yang lo pakai, tools yang lo pilih, iterasi yang lo lakukan",
              "Hal-hal yang tidak berjalan sesuai ekspektasi — ini justru menarik",
              'Contoh: "Saya coba Lovable pertama kali — hasilnya 70% bagus. Lalu saya iterate dengan 5 prompt tambahan..."',
            ],
            accent: "purple",
          },
          {
            title: "03 — Demo Hasil (2 menit)",
            items: [
              "Tunjukkan produknya secara live — jangan hanya screenshot",
              "Kalau web app, buka di browser. Kalau script, jalankan langsung",
              'Contoh: "Sekarang saya akan demo: saya upload file Excel-nya, klik run, dan dalam 10 detik... 150 pesan sudah siap dikirim."',
            ],
            accent: "green",
          },
          {
            title: "04 — Dampak & Next Steps (30 detik)",
            items: [
              "Sebutkan dampak konkret: berapa waktu yang dihemat",
              "Apa rencana pengembangan selanjutnya?",
              'Contoh: "Ini menghemat 3 jam per minggu. Next step: otomasi pengiriman via WA API."',
            ],
            accent: "blue",
          },
        ],
      },
      {
        id: "s6-3",
        type: "concept",
        title: "Framework Feedback: WWW + EBI",
        subtitle: "Cara memberi dan menerima feedback yang konstruktif",
        content:
          "Setiap presenter mendapat feedback dari minimal 2 peserta menggunakan framework WWW + EBI. Framework ini memastikan feedback selalu ada sisi positif dan saran pengembangan.",
        cards: [
          {
            title: "WWW — What Worked Well",
            items: [
              "Fokus pada apa yang sudah bagus",
              "Contoh: Masalah yang dipilih sangat relatable",
              "Contoh: Demo live sangat meyakinkan",
              "Contoh: Prompt chain yang dipakai sangat kreatif",
              "Tujuan: memperkuat apa yang sudah bagus",
            ],
            accent: "green",
          },
          {
            title: "EBI — Even Better If",
            items: [
              "Saran konkret untuk pengembangan",
              "Contoh: Kalau ada versi mobile-nya",
              "Contoh: Kalau data di-visualisasikan dalam chart",
              "Contoh: Kalau ada tutorial cara pakainya",
              "Tujuan: memberi arah pengembangan yang spesifik",
            ],
            accent: "purple",
          },
        ],
      },
      {
        id: "s6-4",
        type: "practice",
        title: "Dokumentasi Portofolio",
        subtitle: "Jadikan solusi lo aset jangka panjang",
        content:
          "Setelah Demo Day, dokumentasikan solusi lo sebagai portofolio pertama. Ini aset yang bisa lo tunjukkan ke calon klien, employer, atau komunitas.",
        prompts: [
          {
            label: "Prompt: Buat Dokumentasi Portofolio",
            prompt: `Saya baru selesai membuat [NAMA SOLUSI] — sebuah [DESKRIPSI 
SINGKAT] yang dibuat menggunakan AI (tools: [TOOLS YANG DIPAKAI]).

Tolong bantu saya membuat dokumentasi portofolio yang mencakup:
1. Problem Statement (2-3 kalimat yang kuat)
2. Deskripsi solusi yang dibuat
3. Teknologi/tools yang digunakan dan alasannya
4. Proses pembuatan (ringkas, 3-5 langkah utama)
5. Hasil dan dampak yang dicapai
6. Screenshot/demo description
7. Pelajaran yang didapat
8. Rencana pengembangan ke depan

Format: bisa dijadikan post LinkedIn, halaman portfolio, 
atau presentasi singkat. Bahasa Indonesia, tone profesional 
tapi tetap personal.`,
          },
        ],
      },
      {
        id: "s6-5",
        type: "concept",
        title: "Setelah AIGYPT: Ke Mana Selanjutnya?",
        subtitle: "Lo sekarang bukan sekadar pengguna AI",
        content:
          "Ini bukan akhir — ini awal. Lo sekarang punya fondasi yang tidak dimiliki kebanyakan orang. Tinggal pilih jalur mana yang paling sesuai dengan tujuan lo:",
        table: {
          headers: ["Jalur", "Next Steps"],
          rows: [
            [
              "Akademisi",
              "Jadikan AI partner riset permanen. Coba Zotero + AI untuk manajemen referensi skripsi.",
            ],
            [
              "Organisator",
              "Automasi workflow paling berulang di organisasimu. Ajarkan tim cara pakai AI.",
            ],
            [
              "Bisnisman",
              "Scale konten dan riset pasar. Eksplorasi tools khusus e-commerce seperti Shopify AI.",
            ],
            [
              "Konten Kreator",
              "Bangun sistem konten yang sustainable. Eksplorasi AI video (Sora, Kling).",
            ],
            ["Semua", "Ikut komunitas alumni AIGYPT. Share apa yang lo buat. Terus iterate."],
          ],
        },
        quote:
          "AI tidak akan menggantikan kamu. Tapi orang yang pakai AI akan menggantikan yang tidak.",
      },
      {
        id: "s6-6",
        type: "concept",
        title: "Refleksi & Penutup",
        subtitle: "Sebelum sesi berakhir",
        content:
          "Lo sekarang bukan hanya pengguna AI — lo adalah builder yang bisa mengubah masalah jadi solusi. Terima kasih sudah bersama AIGYPT.",
        bullets: [
          "Dibanding Sesi 1, apa yang paling berubah dari cara lo melihat AI?",
          "Solusi mana yang akan lo terus kembangkan setelah AIGYPT?",
          "Siapa satu orang di sekitar lo yang perlu lo ajari AI sekarang?",
          "Apa komitmen konkret yang akan lo lakukan dalam 30 hari ke depan?",
        ],
        isCompletion: true,
      },
    ],
  },
];
