import type { SesiMateri } from "./materiContent";

// ═══════════════════════════════════════════════════════════════════
// FUNDAMENTAL AI — 4 sesi pendek, total ~12 menit
//
// Dipecah supaya peserta punya titik napas dan rasa progres, bukan
// maraton satu sesi panjang. Tiap sesi ditutup kuis interaktif yang
// bisa diklik, jadi peserta menguji diri, bukan sekadar membaca.
//
// Tulang punggung: satu ide (AI = mesin pelanjut pola), lalu semua
// aturan praktis diturunkan dari situ.
// ═══════════════════════════════════════════════════════════════════

export const fundamentalAIMateri: SesiMateri[] = [
  // ═══════════════════════════════════════════════════════════════
  // SESI 1 — Mesin yang Menebak, Bukan Mesin yang Tahu  (~4 menit)
  // ═══════════════════════════════════════════════════════════════
  {
    sesiNumber: 1,
    title: "Mesin yang Menebak, Bukan Mesin yang Tahu",
    subtitle: "Satu ide yang akan mengubah semua cara kamu memakai AI",
    steps: [
      {
        id: "fa1-1",
        type: "concept",
        title: "Bukan Soal Pintar",
        subtitle: "Empat menit pertama, dan kamu akan melihat AI dengan mata berbeda",
        content:
          "Ada dua mahasiswa. Sama pintarnya. Yang satu begadang tiga malam buat satu makalah. Yang satu selesai dalam dua jam, terus tidur nyenyak. Bedanya bukan otak. Bedanya satu hal kecil: yang kedua ngerti AI itu benda apa sebenarnya.",
        quote:
          "Banyak orang pakai AI berbulan-bulan tanpa pernah tahu benda apa yang sedang mereka ajak bicara. Itu sebabnya hasilnya biasa saja.",
      },
      {
        id: "fa1-2",
        type: "concept",
        title: "Satu Kalimat yang Menjelaskan Segalanya",
        subtitle: "Kalau kamu cuma ingat satu hal dari kelas ini, ingat yang ini",
        bigIdea: {
          text: "AI itu mesin pelanjut pola. Bukan mesin pencari jawaban.",
          caption: "Dari sini semua aturan lahir",
        },
        content:
          "Bayangin ada santri yang sudah membaca hampir semua yang pernah ditulis manusia. Semua kitab, semua jurnal, semua artikel. Tapi saat menjawab, dia tidak boleh membuka satu kitab pun. Semuanya dari ingatan pola. Dia tidak mengambil jawaban dari mana-mana. Dia menyusunnya, kata demi kata.",
        bullets: [
          "Google mencari. AI menyusun. Ini beda mendasar, bukan beda teknis",
          "Dia tidak punya kitabnya di tangan. Dia punya pola dari kitab",
          "Jawabannya baru, dibuat khusus buat kamu, detik ini juga",
        ],
        note: "Dia tidak bertanya pada dirinya \"apa yang benar\". Dia bertanya \"kata apa yang paling mungkin muncul berikutnya\".",
      },
      {
        id: "fa1-3",
        type: "concept",
        title: "Enam Akibat dari Satu Fakta Itu",
        subtitle: "Perhatikan: ini bukan enam aturan hafalan. Ini satu fakta dilihat dari enam sisi",
        table: {
          headers: ["Karena AI melanjutkan pola...", "Maka untuk kamu artinya..."],
          rows: [
            ["Dia menyusun, bukan mengambil", "Dia bisa mengarang nama kitab yang tidak ada. Bukan bohong, tapi menebak"],
            ["Nada percaya diri itu sendiri sebuah pola", "Yakin bukan tanda benar. Dia salah dengan gaya yang sama meyakinkannya"],
            ["Bentuk itu pola kuat, fakta spesifik itu pola lemah", "Dia rapi di struktur, rapuh di angka, nama, tanggal, dan kutipan"],
            ["Prompt kamu mempersempit ruang pola", "Makin jelas perintahmu, makin sempit ruangnya, makin tepat hasilnya"],
            ["Contoh adalah pola yang paling gampang ditiru", "Kasih contoh tulisan yang kamu mau. Lebih ampuh dari sepuluh paragraf penjelasan"],
            ["Dia tidak tahu apa yang dia tidak tahu", "Verifikasi bukan opsi. Itu bagian dari pekerjaanmu, bukan pekerjaannya"],
          ],
        },
      },
      {
        id: "fa1-4",
        type: "concept",
        title: "Sejarah Singkat, Satu Pelajaran",
        subtitle: "Bukan buat dihafal. Buat merasakan kecepatannya",
        timeline: [
          { year: "1950", event: "Alan Turing bertanya: bisakah mesin berpikir?", example: "Turing Test" },
          { year: "1997", event: "Komputer mengalahkan juara dunia catur", example: "Deep Blue vs Kasparov" },
          { year: "2016", event: "AI menang di Go, permainan tersulit di dunia", example: "AlphaGo vs Lee Sedol" },
          { year: "2022", event: "AI percakapan meledak ke publik", example: "ChatGPT" },
          { year: "2023 ke atas", event: "AI bisa melihat, mendengar, membuat gambar, video, aplikasi", example: "Claude, Gemini, dan seterusnya" },
        ],
        content:
          "Perhatikan jaraknya. Dari 1950 ke 2022 butuh tujuh puluh tahun. Dari 2022 ke sekarang, lompatannya lebih besar dari tujuh puluh tahun sebelumnya digabung.",
        note: "Pelajarannya cuma satu: yang menunggu sampai \"nanti kalau sudah matang\" akan menunggu selamanya.",
      },
      {
        id: "fa1-5",
        type: "practice",
        title: "Uji Pemahamanmu",
        subtitle: "Klik jawabanmu. Langsung ketahuan benar atau salah",
        quiz: [
          {
            question: "AI menjawab dengan sangat percaya diri. Apa artinya?",
            options: [
              "Berarti jawabannya bisa dipercaya",
              "Tidak berarti apa-apa soal benar atau salah",
              "Berarti dia menemukan sumber yang kuat",
            ],
            answerIndex: 1,
            why: "Nada percaya diri itu sendiri sebuah pola bahasa yang dia tiru dari jutaan teks. Dia salah dengan gaya yang sama meyakinkannya saat dia benar.",
          },
          {
            question: "Kenapa AI bisa menyebut nama kitab yang tidak pernah ada?",
            options: [
              "Karena datanya rusak",
              "Karena dia sengaja berbohong",
              "Karena dia menyusun jawaban dari pola, bukan mengambil dari kitab",
            ],
            answerIndex: 2,
            why: "Dia tidak punya kitabnya. Dia punya pola dari kitab. Saat pola itu diteruskan, bisa lahir nama yang terdengar sangat masuk akal tapi tidak pernah ada.",
          },
        ],
        isCompletion: true,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // SESI 2 — Peta: Tool Mana untuk Masalah Apa  (~4 menit)
  // ═══════════════════════════════════════════════════════════════
  {
    sesiNumber: 2,
    title: "Peta: Tool Mana untuk Masalah Apa",
    subtitle: "Berhenti pakai satu AI untuk semua hal. Itu seperti memukul paku dengan obeng",
    steps: [
      {
        id: "fa2-1",
        type: "concept",
        title: "Dua Pertanyaan Sebelum Menyentuh AI",
        subtitle: "Kerangka ini tidak akan basi. Nama tool akan basi. Ini tidak",
        content:
          "Sebelum pakai AI untuk apapun, tanya dua hal. Satu: kalau AI salah di sini, seberapa mahal? Dua: seberapa besar nilai pekerjaan ini ada di bentuk, kecepatan, dan volume? Dua jawaban itu langsung menentukan cara kamu memperlakukan dia.",
        matrix: {
          yLabel: "Risiko kalau salah",
          xLabel: "Nilai di bentuk & kecepatan",
          quadrants: [
            {
              title: "Risiko rendah, bentuk tinggi",
              verdict: "Lepaskan. Biarkan AI kerja",
              items: [
                "Caption jualan, dua puluh variasi judul",
                "Draft pesan, balasan chat, brainstorming",
                "Merapikan catatan yang kamu tulis sendiri",
              ],
              accent: "green",
            },
            {
              title: "Risiko tinggi, bentuk tinggi",
              verdict: "AI menyusun, kamu verifikasi baris per baris",
              items: [
                "Makalah, proposal kegiatan, laporan",
                "Terjemahan matan dan teks panjang",
                "Semua nama, angka, kutipan wajib dicek ulang",
              ],
              accent: "blue",
            },
            {
              title: "Risiko tinggi, bentuk rendah",
              verdict: "AI cuma penajam pikiran. Jangan jadikan sumber",
              items: [
                "Hadits, sanad, hukum fiqih, fatwa",
                "Angka statistik, klaim ilmiah, rujukan kitab",
                "Sumbernya tetap kitab dan guru. Titik",
              ],
              accent: "red",
            },
            {
              title: "Risiko rendah, bentuk rendah",
              verdict: "Tidak usah pakai AI",
              items: [
                "Balas chat dua kalimat, catat daftar belanja",
                "Buka AI, tulis prompt, baca hasil, perbaiki",
                "Total lebih lama daripada kamu kerjakan sendiri",
              ],
              accent: "purple",
            },
          ],
        },
        note: "Tahu kapan tidak memakai alat, itu juga keahlian.",
      },
      {
        id: "fa2-2",
        type: "concept",
        title: "Peta AI per Kategori Kemampuan",
        subtitle: "Screenshot slide ini. Jangan dihafal, nama tool berubah cepat",
        cards: [
          { title: "Menulis & Berpikir", items: ["Claude, teks panjang & analisis dokumen", "ChatGPT, serba bisa & brainstorming", "Gemini, terhubung ekosistem Google"], accent: "purple" },
          { title: "Mencari & Meriset", items: ["Perplexity, menjawab sambil memberi sumber", "Gemini, akses internet langsung", "Elicit & Consensus, khusus jurnal ilmiah"], accent: "blue" },
          { title: "Gambar & Desain", items: ["Midjourney, kualitas artistik", "Canva AI, langsung jadi desain siap pakai", "Ideogram, paling rapi menulis teks di gambar"], accent: "green" },
          { title: "Suara & Video", items: ["ElevenLabs, voice over natural", "CapCut AI, edit & subtitle otomatis", "Whisper, ubah rekaman jadi teks"], accent: "purple" },
          { title: "Ngoding & Bikin Aplikasi", items: ["Claude Code & Cursor, dipandu AI", "Replit & Lovable, tanpa install apapun", "Bahkan kalau kamu tidak bisa coding"], accent: "blue" },
          { title: "Belajar & Produktivitas", items: ["NotebookLM, upload kitab lalu tanya isinya", "Otter, notulen rapat otomatis", "Notion AI, merapikan catatan"], accent: "green" },
        ],
        note: "Ini contoh, bukan kitab suci. Enam bulan lagi sebagian nama di sini sudah berubah. Yang tidak berubah adalah dua pertanyaan di slide sebelumnya.",
      },
      {
        id: "fa2-3",
        type: "concept",
        title: "Masalahmu, Tool-nya",
        subtitle: "Yang paling sering kamu butuhkan sehari-hari",
        table: {
          headers: ["Masalahmu", "Pakai", "Ingat"],
          rows: [
            ["PDF kitab 300 halaman, imtihan lusa", "NotebookLM", "Dibuat khusus membaca dokumen panjang"],
            ["Butuh rujukan yang bisa diverifikasi", "Perplexity", "Dia memberi sumbernya, bukan cuma jawaban"],
            ["Terjemah matan dengan nuansa yang pas", "Claude", "Tetap cek istilah teknisnya sendiri"],
            ["Dua puluh ide caption dalam lima menit", "ChatGPT", "Risiko rendah, lepaskan saja"],
            ["Poster acara, deadline besok", "Canva AI / Ideogram", "Cek ejaan teksnya, sering meleset"],
            ["Video kajian butuh subtitle", "CapCut AI", "Baca ulang subtitle istilah Arabnya"],
            ["Website organisasi tanpa bisa coding", "Lovable / Replit", "Mulai dari yang kecil dulu"],
            ["Materi kuliah yang tidak masuk otak", "Claude / ChatGPT", "Minta dijelaskan ulang sampai paham"],
          ],
        },
      },
      {
        id: "fa2-4",
        type: "practice",
        title: "Uji Pemahamanmu",
        subtitle: "Situasinya nyata. Pilih tool-nya",
        quiz: [
          {
            question: "Kamu dapat PDF kitab 300 halaman. Imtihan lusa. Tool apa?",
            options: ["ChatGPT", "NotebookLM", "Midjourney"],
            answerIndex: 1,
            why: "NotebookLM dibuat khusus untuk membaca dan menjawab dari dokumen panjang yang kamu upload sendiri, jadi risiko dia mengarang jauh lebih kecil.",
          },
          {
            question: "Kamu butuh lima jurnal ilmiah yang bisa kamu buka dan cek sendiri.",
            options: ["Perplexity", "ChatGPT", "Canva AI"],
            answerIndex: 0,
            why: "Perplexity menjawab sambil memberi tautan sumbernya. Kamu bisa membuka dan memverifikasi, bukan sekadar percaya.",
          },
          {
            question: "Kamu mau menulis ucapan duka untuk teman yang kehilangan ayahnya.",
            options: [
              "Pakai ChatGPT biar cepat dan rapi",
              "Pakai Claude biar bahasanya indah",
              "Tulis sendiri, sependek apapun",
            ],
            answerIndex: 2,
            why: "Risikonya memang rendah, tapi ini soal keaslian. Hal yang harusnya lahir dari hatimu, tulis sendiri. Kuadran keempat: tidak usah pakai AI.",
          },
        ],
        isCompletion: true,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // SESI 3 — Seni Bertanya  (~4 menit)
  // ═══════════════════════════════════════════════════════════════
  {
    sesiNumber: 3,
    title: "Seni Bertanya",
    subtitle: "Dua orang, AI yang sama, hasil beda jauh. Ini penyebabnya",
    steps: [
      {
        id: "fa3-1",
        type: "concept",
        title: "Bertanya = Mempersempit Pola",
        subtitle: "Ingat ide besar di sesi satu? Ini penerapan langsungnya",
        content:
          "Prompt yang buruk membiarkan ruang polanya selebar samudra, jadi AI menebak ke mana-mana. Prompt yang baik mempersempit ruang itu sampai yang tersisa cuma jawaban yang kamu mau. Lima bahan berikut fungsinya cuma satu: mempersempit.",
        flow: [
          { label: "Peran", desc: "Dia harus jadi siapa" },
          { label: "Konteks", desc: "Situasimu apa" },
          { label: "Tugas", desc: "Persisnya kamu mau apa" },
          { label: "Format", desc: "Bentuk hasilnya bagaimana" },
          { label: "Batasan", desc: "Aturan mainnya apa" },
        ],
        note: "Batasan, bahan kelima, yang paling sering dilupakan dan paling menyelamatkan. Contoh: \"kalau tidak yakin, bilang tidak yakin\".",
      },
      {
        id: "fa3-2",
        type: "practice",
        title: "Rasakan Bedanya",
        subtitle: "Permintaan yang sama, ruang pola yang beda jauh",
        prompts: [
          { label: "Ruang pola selebar samudra", prompt: "bantuin makalah" },
          { label: "Masih terlalu luas", prompt: "Bantu saya bikin makalah tentang zakat" },
          {
            label: "Ruangnya disempitkan sampai presisi",
            prompt: `Kamu pembimbing akademik di Fakultas Syariah Al-Azhar.

Saya mahasiswa semester 3. Saya harus menulis makalah 15 halaman
berjudul "Zakat Aset Digital dalam Perspektif Fiqih Kontemporer".

Buatkan:
1. Outline 5 bab dengan sub-poin detail
2. Lima rujukan kitab fiqih yang relevan
3. Contoh paragraf pembuka bab pendahuluan

Format: poin bernomor, bahasa Indonesia akademik formal.
Batasan: jangan mengarang nama kitab. Kalau tidak yakin, bilang tidak yakin.`,
          },
        ],
        note: "Prompt ketiga bukan lebih baik karena lebih panjang. Dia lebih baik karena setiap kalimatnya membuang satu kemungkinan salah.",
      },
      {
        id: "fa3-3",
        type: "concept",
        title: "Bahaya Terbesar Buat Kita",
        subtitle: "Dan kenapa mahasiswa Al-Azhar lebih rentan dari orang lain",
        content:
          "Ingat lagi: dia menyusun, bukan mengambil. Artinya dia bisa menyusun nama kitab yang tidak pernah ada, sanad yang tidak pernah tersambung, dan nomor halaman yang dikarang. Dan dia menyampaikannya dengan nada seyakin ustadz yang sudah mengajar tiga puluh tahun.",
        cards: [
          {
            title: "Paling Rawan Dikarang",
            items: [
              "Nama kitab dan pengarangnya",
              "Matan hadits, sanad, dan derajatnya",
              "Nomor halaman dan jilid",
              "Angka statistik dan tahun",
              "Nama tokoh dan biografinya",
            ],
            accent: "red",
          },
          {
            title: "Cara Melindungi Diri",
            items: [
              "Tulis di prompt: kalau tidak yakin, bilang tidak yakin",
              "Pakai Perplexity kalau butuh sumber yang bisa dicek",
              "Semua nama kitab dan hadits, kembalikan ke sumber aslinya",
              "Jangan pernah setor apapun yang belum kamu baca ulang",
            ],
            accent: "green",
          },
        ],
        quote:
          "Menyebarkan hadits palsu karena percaya AI, tetap menyebarkan hadits palsu. Alasannya tidak akan menolongmu.",
      },
      {
        id: "fa3-4",
        type: "practice",
        title: "Uji Pemahamanmu",
        subtitle: "Latih insting curigamu",
        quiz: [
          {
            question: "AI menyebut kitab \"Al-Ahkam Ar-Raqmiyyah\" karya Ibnu Utsaimin, halaman 214. Apa yang kamu lakukan?",
            options: [
              "Langsung kutip, sumbernya jelas",
              "Curigai dan cek ke sumber asli sebelum dipakai",
              "Tanya AI lagi apakah itu benar",
            ],
            answerIndex: 1,
            why: "Nama kitab, nama pengarang, dan nomor halaman: tiga hal paling rawan dikarang, muncul sekaligus dalam satu kalimat. Bertanya ulang ke AI juga tidak menolong, dia bisa mengarang pembenaran.",
          },
          {
            question: "Bagian mana dari prompt yang paling menyelamatkanmu dari halusinasi?",
            options: [
              "Peran, misalnya \"kamu dosen fiqih\"",
              "Format, misalnya \"buat dalam tabel\"",
              "Batasan, misalnya \"kalau tidak yakin, bilang tidak yakin\"",
            ],
            answerIndex: 2,
            why: "Batasan memberi AI izin untuk mengaku tidak tahu. Tanpa itu, pola default-nya adalah tetap menjawab, karena menjawab lebih mirip pola percakapan normal daripada diam.",
          },
        ],
        isCompletion: true,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // SESI 4 — Etika & Bekal Pulang  (~3 menit)
  // ═══════════════════════════════════════════════════════════════
  {
    sesiNumber: 4,
    title: "Etika & Bekal Pulang",
    subtitle: "Garis yang tidak boleh dilewati, dan satu langkah untuk malam ini",
    steps: [
      {
        id: "fa4-1",
        type: "concept",
        title: "Garis yang Tidak Boleh Dilewati",
        subtitle: "Sehari-hari dan profesional, sekaligus",
        table: {
          headers: ["Prinsip", "Artinya dalam praktik"],
          rows: [
            ["Pemahaman", "Kalau kamu tidak bisa menjelaskan isinya, kamu belum pantas menyetorkannya"],
            ["Kejujuran", "Kalau AI membantu banyak, katakan saja. Jangan berpura-pura"],
            ["Kerahasiaan", "Jangan pernah memasukkan data pribadi orang, nomor rekening, atau rahasia lembaga"],
            ["Verifikasi", "Semua yang keluar atas namamu, wajib kamu cek dulu"],
            ["Tanggung jawab", "Salahnya AI tetap jadi salahmu di mata orang. Tidak ada alasan"],
            ["Keaslian", "Hal yang harusnya lahir dari hatimu, tulis sendiri. Ucapan duka, permintaan maaf, doa"],
          ],
        },
        quote:
          "Uji sederhana: kalau kamu malu ketahuan memakai AI untuk hal itu, kemungkinan besar kamu memang tidak seharusnya.",
      },
      {
        id: "fa4-2",
        type: "practice",
        title: "Uji Pemahamanmu",
        subtitle: "Kasus nyata. Mana yang boleh, mana yang tidak",
        quiz: [
          {
            question: "Kamu menyetor makalah hasil AI yang kamu sendiri belum baca. Boleh?",
            options: [
              "Boleh, yang penting selesai tepat waktu",
              "Tidak. Kalau tidak bisa menjelaskan isinya, kamu belum pantas menyetorkannya",
              "Boleh, asalkan kamu jujur bilang pakai AI",
            ],
            answerIndex: 1,
            why: "Kejujuran saja tidak cukup. Prinsip pemahaman lebih dasar: karyamu adalah yang bisa kamu pertanggungjawabkan saat ditanya, bukan yang berhasil kamu kumpulkan.",
          },
          {
            question: "Kamu masukkan daftar nama dan nomor WA panitia ke AI agar dirapikan.",
            options: [
              "Aman, cuma nama dan nomor",
              "Melanggar kerahasiaan. Itu data pribadi orang lain",
              "Aman kalau AI-nya berbayar",
            ],
            answerIndex: 1,
            why: "Itu bukan datamu. Kamu tidak punya izin dari mereka untuk menyerahkannya ke pihak ketiga, mau AI-nya gratis maupun berbayar.",
          },
          {
            question: "Kamu pakai AI untuk mencari celah lemah dalam argumen makalahmu sendiri.",
            options: [
              "Curang, itu tugas dosen",
              "Sehat. Ini justru salah satu pemakaian terbaik",
              "Sia-sia, AI tidak paham argumen",
            ],
            answerIndex: 1,
            why: "Memakai AI untuk mendebat dan menajamkan pikiranmu sendiri adalah pemakaian paling sehat. Kamu tetap yang berpikir, dia cuma lawan tanding.",
          },
        ],
      },
      {
        id: "fa4-3",
        type: "concept",
        title: "Tiga Bekal, Satu Langkah",
        subtitle: "Kalau lupa semuanya, ingat ini saja",
        cards: [
          {
            title: "Satu",
            items: ["Dia melanjutkan pola, bukan mencari jawaban", "Dari sini semua aturan lahir"],
            accent: "purple",
          },
          {
            title: "Dua",
            items: ["Kalau salah, seberapa mahal?", "Seberapa besar nilainya di bentuk dan kecepatan?"],
            accent: "blue",
          },
          {
            title: "Tiga",
            items: ["Kamu tetap bosnya. Verifikasi bagian dari pekerjaanmu", "Pakai dia untuk berpikir lebih tajam, bukan berhenti berpikir"],
            accent: "green",
          },
        ],
        content:
          "Malam ini sebelum tidur: ambil satu masalah nyata yang bikin kamu stres minggu ini. Buka AI mana saja. Tulis prompt dengan lima bahan tadi. Lihat hasilnya, perbaiki, coba lagi. Rasakan bedanya. Itu momen AI berhenti jadi mainan dan mulai jadi alat.",
        quote:
          "Yang membuatmu tertinggal bukan karena kamu kurang pintar. Tapi karena kamu menunda mulai.",
        isCompletion: true,
      },
    ],
  },
];
