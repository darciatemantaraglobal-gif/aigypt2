import type { SesiMateri } from "./materiContent";

// ═══════════════════════════════════════════════════════════════════
// FUNDAMENTAL AI — 4 sesi, ~12 menit
//
// Satu ide jadi tulang punggung: AI menebak, bukan tahu.
// Semua aturan praktis diturunkan dari situ, bukan dihafal terpisah.
//
// Kuis HANYA di akhir, sebagai penguji pemahaman menyeluruh.
// Sapaan: "kamu" untuk peserta, "saya" untuk pembicara.
// ═══════════════════════════════════════════════════════════════════

export const fundamentalAIMateri: SesiMateri[] = [
  // ═══════════════════════════════════════════════════════════════
  // SESI 1 — AI Itu Menebak, Bukan Tahu
  // ═══════════════════════════════════════════════════════════════
  {
    sesiNumber: 1,
    title: "AI Itu Menebak, Bukan Tahu",
    subtitle: "Satu ide yang bikin kamu langsung beda dari kebanyakan orang yang pakai AI",
    steps: [
      {
        id: "fa1-1",
        type: "concept",
        title: "Bukan Soal Pintar",
        subtitle: "Empat menit lagi, kamu akan melihat AI dengan mata yang berbeda",
        content:
          "Dua orang. Sama pintarnya. Yang satu begadang tiga malam demi satu makalah. Yang satu selesai dalam dua jam, lalu tidur nyenyak. Bedanya bukan otak. Bedanya cuma satu: yang kedua tahu AI itu barang apa sebenarnya.",
        quote:
          "Banyak orang memakai AI berbulan-bulan tanpa pernah tahu sedang bicara dengan apa. Itu sebabnya hasilnya begitu-begitu saja.",
        note: "Yang akan kamu dapat: satu ide inti, peta tool lengkap, cara bertanya yang benar, dan batas etikanya.",
      },
      {
        id: "fa1-2",
        type: "concept",
        title: "Ini Kuncinya",
        subtitle: "Kalau kamu cuma ingat satu hal dari kelas ini, ingat yang ini",
        bigIdea: {
          text: "AI menebak pola. Dia tidak mencari jawaban.",
          caption: "Dari satu kalimat ini, semuanya jadi masuk akal",
        },
        content:
          "Bayangkan seorang santri yang sudah membaca hampir semua yang pernah ditulis manusia. Semua kitab, semua artikel, semua tulisan. Tapi ketika ditanya, dia tidak boleh membuka satu kitab pun. Semuanya dari ingatan pola. Dia tidak mengambil jawaban dari mana-mana. Dia menyusunnya. Kata demi kata.",
        bullets: [
          "Google mencari. AI menyusun. Ini beda mendasar, bukan beda teknis",
          "Dia tidak memegang kitabnya. Dia cuma ingat pola dari kitab",
          "Jawaban untukmu itu baru. Dibuat detik itu juga, khusus untukmu",
        ],
        note: "Dia tidak bertanya pada dirinya \"mana yang benar\". Dia bertanya \"kata apa yang biasanya muncul setelah ini\".",
      },
      {
        id: "fa1-3",
        type: "concept",
        title: "Karena Dia Menebak, Maka...",
        subtitle: "Ini bukan enam aturan untuk dihafal. Ini satu fakta dilihat dari enam sisi",
        table: {
          headers: ["Karena AI menebak pola...", "Maka untukmu artinya..."],
          rows: [
            ["Dia menyusun, bukan mengambil", "Dia bisa mengarang nama kitab yang tidak ada. Bukan berbohong, memang menebak"],
            ["Nada percaya diri itu sendiri sebuah pola", "Yakin bukan berarti benar. Dia salah dengan gaya seyakin saat dia benar"],
            ["Bentuk itu pola kuat, fakta detail itu pola lemah", "Rapi di struktur, rapuh di angka, nama, tanggal, dan kutipan"],
            ["Promptmu membuat tebakannya menyempit", "Makin jelas maumu, makin sempit tebakannya, makin tepat hasilnya"],
            ["Contoh itu pola yang paling mudah ditiru", "Beri contoh tulisan yang kamu mau. Lebih ampuh dari sepuluh paragraf penjelasan"],
            ["Dia tidak tahu kalau dia tidak tahu", "Memeriksa ulang itu tugasmu. Bukan tugasnya"],
          ],
        },
      },
      {
        id: "fa1-4",
        type: "concept",
        title: "Sejarahnya, Sebentar Saja",
        subtitle: "Bukan untuk dihafal. Rasakan saja kecepatannya",
        timeline: [
          { year: "1950", event: "Alan Turing bertanya: memangnya mesin bisa berpikir?", example: "Turing Test" },
          { year: "1997", event: "Komputer mengalahkan juara dunia catur", example: "Deep Blue vs Kasparov" },
          { year: "2016", event: "AI menang bermain Go, permainan tersulit di dunia", example: "AlphaGo vs Lee Sedol" },
          { year: "2022", event: "AI percakapan meledak ke publik", example: "ChatGPT" },
          { year: "2023 ke sini", event: "AI bisa melihat, mendengar, membuat gambar, video, bahkan aplikasi", example: "Claude, Gemini, dan lainnya" },
        ],
        content:
          "Lihat jaraknya. Dari 1950 ke 2022 butuh tujuh puluh tahun. Dari 2022 ke sekarang, lompatannya lebih besar dari tujuh puluh tahun sebelumnya digabung.",
        note: "Pelajarannya satu: yang menunggu sampai \"nanti kalau sudah matang\" akan menunggu selamanya. Dia tidak akan berhenti berubah.",
        isCompletion: true,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // SESI 2 — Tool Mana untuk Masalah Apa
  // ═══════════════════════════════════════════════════════════════
  {
    sesiNumber: 2,
    title: "Tool Mana untuk Masalah Apa",
    subtitle: "Berhenti memakai satu AI untuk semua hal. Itu seperti memukul paku dengan obeng",
    steps: [
      {
        id: "fa2-1",
        type: "concept",
        title: "Dua Pertanyaan Sebelum Memegang AI",
        subtitle: "Nama tool akan basi. Cara berpikir ini tidak",
        content:
          "Sebelum memakai AI untuk apapun, tanyakan dua hal. Satu: kalau dia salah di sini, seberapa mahal akibatnya? Dua: seberapa penting kecepatan dan banyaknya pilihan untuk pekerjaan ini? Dua jawaban itu langsung menentukan cara kamu memperlakukan dia.",
        matrix: {
          yLabel: "Bahaya kalau salah",
          xLabel: "Butuh cepat & banyak pilihan",
          quadrants: [
            {
              title: "Salahnya tidak bahaya, butuh cepat",
              verdict: "Lepaskan. Biarkan AI bekerja",
              items: [
                "Caption jualan, dua puluh variasi judul",
                "Draft pesan, balasan chat, mencari ide",
                "Merapikan catatan yang kamu tulis sendiri",
              ],
              accent: "green",
            },
            {
              title: "Salahnya bahaya, tapi butuh cepat",
              verdict: "AI menyusun, kamu memeriksa baris per baris",
              items: [
                "Makalah, proposal acara, laporan",
                "Terjemahan teks panjang",
                "Semua nama, angka, kutipan wajib dicek ulang",
              ],
              accent: "blue",
            },
            {
              title: "Salahnya bahaya, tidak butuh cepat",
              verdict: "AI cuma teman debat. Jangan jadikan sumber",
              items: [
                "Hadits, sanad, hukum fiqih, fatwa",
                "Angka statistik, klaim ilmiah, rujukan kitab",
                "Sumbernya tetap kitab dan guru. Titik",
              ],
              accent: "red",
            },
            {
              title: "Tidak bahaya, tidak butuh cepat",
              verdict: "Tidak usah pakai AI",
              items: [
                "Balas chat dua kalimat, catat daftar belanja",
                "Buka AI, ketik prompt, baca hasil, perbaiki",
                "Malah lebih lama daripada kamu kerjakan sendiri",
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
        title: "Peta Tool-nya",
        subtitle: "Screenshot slide ini. Tidak usah dihafal, nama tool cepat berubah",
        cards: [
          { title: "Menulis & Berpikir", items: ["Claude, kuat di teks panjang & baca dokumen", "ChatGPT, serba bisa & mencari ide", "Gemini, terhubung ke Google"], accent: "purple" },
          { title: "Mencari & Meriset", items: ["Perplexity, menjawab sambil memberi sumber", "Gemini, bisa akses internet langsung", "Elicit & Consensus, khusus jurnal ilmiah"], accent: "blue" },
          { title: "Gambar & Desain", items: ["Midjourney, hasilnya paling artistik", "Canva AI, langsung jadi desain siap pakai", "Ideogram, paling rapi menulis teks di gambar"], accent: "green" },
          { title: "Suara & Video", items: ["ElevenLabs, voice over sangat natural", "CapCut AI, edit & subtitle otomatis", "Whisper, rekaman menjadi teks"], accent: "purple" },
          { title: "Ngoding & Bikin Aplikasi", items: ["Claude Code & Cursor, dipandu AI", "Replit & Lovable, tanpa install apapun", "Bahkan kalau kamu tidak bisa coding"], accent: "blue" },
          { title: "Belajar & Produktivitas", items: ["NotebookLM, upload kitab lalu tanya isinya", "Otter, notulen rapat otomatis", "Notion AI, merapikan catatan"], accent: "green" },
        ],
        note: "Ini contoh, bukan kitab suci. Enam bulan lagi sebagian nama di sini sudah berganti. Yang tidak berganti adalah dua pertanyaan di slide sebelumnya.",
      },
      {
        id: "fa2-3",
        type: "concept",
        title: "Masalahmu, Tool-nya",
        subtitle: "Yang paling sering kamu butuhkan sehari-hari",
        table: {
          headers: ["Masalahmu", "Pakai", "Tapi ingat"],
          rows: [
            ["PDF kitab 300 halaman, imtihan lusa", "NotebookLM", "Memang dibuat khusus untuk membaca dokumen"],
            ["Butuh rujukan yang bisa diperiksa", "Perplexity", "Dia memberi sumbernya, bukan cuma jawaban"],
            ["Terjemah matan agar nuansanya pas", "Claude", "Istilah teknisnya tetap periksa sendiri"],
            ["Dua puluh ide caption dalam lima menit", "ChatGPT", "Tidak bahaya, lepaskan saja"],
            ["Poster acara, deadline besok", "Canva AI / Ideogram", "Periksa ejaan teksnya, sering meleset"],
            ["Video kajian butuh subtitle", "CapCut AI", "Baca ulang subtitle istilah Arabnya"],
            ["Bikin web organisasi, tidak bisa coding", "Lovable / Replit", "Mulai dari yang kecil dulu"],
            ["Materi kuliah tidak masuk otak", "Claude / ChatGPT", "Minta dijelaskan ulang sampai kamu paham"],
          ],
        },
        isCompletion: true,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // SESI 3 — Cara Bertanya yang Benar
  // ═══════════════════════════════════════════════════════════════
  {
    sesiNumber: 3,
    title: "Cara Bertanya yang Benar",
    subtitle: "Dua orang, AI yang sama, hasilnya beda jauh. Ini penyebabnya",
    steps: [
      {
        id: "fa3-1",
        type: "concept",
        title: "Bertanya Itu Menyempitkan Tebakan",
        subtitle: "Ingat ide besar di sesi satu? Ini penerapannya langsung",
        content:
          "Prompt yang buruk membiarkan tebakan AI selebar samudra, jadi dia menembak ke mana-mana. Prompt yang baik menyempitkan tebakan itu sampai yang tersisa cuma jawaban yang kamu mau. Lima bahan berikut gunanya cuma satu: menyempitkan.",
        flow: [
          { label: "Peran", desc: "Dia harus jadi siapa" },
          { label: "Konteks", desc: "Situasimu bagaimana" },
          { label: "Tugas", desc: "Persisnya kamu mau apa" },
          { label: "Format", desc: "Bentuk hasilnya bagaimana" },
          { label: "Batasan", desc: "Aturan mainnya apa" },
        ],
        note: "Bahan kelima, Batasan, yang paling sering dilupakan dan paling menyelamatkan. Contoh: \"kalau tidak yakin, bilang tidak yakin\".",
      },
      {
        id: "fa3-2",
        type: "practice",
        title: "Rasakan Bedanya",
        subtitle: "Meminta hal yang sama, hasilnya beda langit dan bumi",
        prompts: [
          { label: "Tebakannya selebar samudra", prompt: "bantuin makalah" },
          { label: "Masih terlalu lebar", prompt: "Bantu saya bikin makalah tentang zakat" },
          {
            label: "Menyempit sampai presisi",
            prompt: `Kamu pembimbing akademik di Fakultas Syariah Al-Azhar.

Saya mahasiswa semester 3. Saya harus menulis makalah 15 halaman
berjudul "Zakat Aset Digital dalam Perspektif Fiqih Kontemporer".

Tolong buatkan:
1. Outline 5 bab lengkap dengan sub-poinnya
2. Lima rujukan kitab fiqih yang relevan
3. Contoh paragraf pembuka bab pendahuluan

Format: poin bernomor, bahasa Indonesia akademik formal.
Batasan: jangan mengarang nama kitab. Kalau tidak yakin, bilang tidak yakin.`,
          },
        ],
        note: "Prompt ketiga bagus bukan karena panjang. Bagus karena setiap kalimatnya menutup satu kemungkinan salah.",
      },
      {
        id: "fa3-3",
        type: "concept",
        title: "Bahaya Terbesar untuk Kita",
        subtitle: "Dan kenapa mahasiswa Al-Azhar lebih rawan daripada orang lain",
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
            title: "Cara Menjaga Diri",
            items: [
              "Tulis di prompt: kalau tidak yakin, bilang tidak yakin",
              "Pakai Perplexity kalau butuh sumber yang bisa diperiksa",
              "Semua nama kitab dan hadits, kembalikan ke sumber aslinya",
              "Jangan pernah menyetor apapun yang belum kamu baca ulang",
            ],
            accent: "green",
          },
        ],
        quote:
          "Menyebarkan hadits palsu karena percaya AI, tetap saja menyebarkan hadits palsu. Alasannya tidak akan menolongmu.",
        isCompletion: true,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // SESI 4 — Etika, Bekal, dan Uji Pemahaman
  // ═══════════════════════════════════════════════════════════════
  {
    sesiNumber: 4,
    title: "Etika, Bekal, dan Uji Pemahaman",
    subtitle: "Garis yang tidak boleh dilewati, tiga bekal pulang, lalu kuis penutup",
    steps: [
      {
        id: "fa4-1",
        type: "concept",
        title: "Garis yang Tidak Boleh Dilewati",
        subtitle: "Berlaku untuk kuliah, organisasi, dan dunia kerja",
        table: {
          headers: ["Prinsip", "Praktiknya"],
          rows: [
            ["Paham", "Kalau tidak bisa menjelaskan isinya, kamu belum pantas menyetorkannya"],
            ["Jujur", "Kalau AI banyak membantu, katakan saja. Tidak usah berpura-pura"],
            ["Rahasia", "Jangan pernah memasukkan data pribadi orang, nomor rekening, atau rahasia lembaga"],
            ["Periksa ulang", "Semua yang keluar atas namamu, wajib kamu periksa dulu"],
            ["Tanggung jawab", "Salahnya AI tetap jadi salahmu di mata orang. Tidak ada alasan"],
            ["Tulus", "Yang seharusnya lahir dari hati, tulis sendiri. Ucapan duka, permintaan maaf, doa"],
          ],
        },
        quote:
          "Uji sederhana: kalau kamu malu ketahuan memakai AI untuk hal itu, kemungkinan besar memang tidak seharusnya.",
      },
      {
        id: "fa4-2",
        type: "concept",
        title: "Tiga Bekal, Satu Langkah",
        subtitle: "Kalau lupa semuanya, ingat ini saja",
        cards: [
          {
            title: "Satu",
            items: ["Dia menebak pola, bukan mencari jawaban", "Dari sini semua aturan lahir"],
            accent: "purple",
          },
          {
            title: "Dua",
            items: ["Kalau salah, seberapa mahal?", "Seberapa butuh cepat dan banyak pilihan?"],
            accent: "blue",
          },
          {
            title: "Tiga",
            items: ["Kamu tetap bosnya. Memeriksa itu tugasmu", "Pakai dia untuk berpikir lebih tajam, bukan berhenti berpikir"],
            accent: "green",
          },
        ],
        content:
          "Malam ini sebelum tidur, lakukan satu hal. Ambil satu masalah nyata yang membuatmu stres minggu ini. Buka AI mana saja. Tulis prompt dengan lima bahan tadi. Lihat hasilnya, perbaiki, coba lagi. Rasakan bedanya. Itulah momen AI berhenti jadi mainan dan mulai jadi alat.",
        quote:
          "Yang membuatmu tertinggal bukan karena kurang pintar. Tapi karena menunda mulai.",
      },
      {
        id: "fa4-3",
        type: "practice",
        title: "Uji Pemahaman",
        subtitle: "Delapan soal dari seluruh materi. Klik jawabanmu, langsung ketahuan",
        content:
          "Tidak ada yang menghakimi di sini. Salah justru bagus, artinya ada yang perlu kamu ulang.",
        quiz: [
          {
            question: "Ketika kamu bertanya ke ChatGPT, sebenarnya dia sedang apa?",
            options: [
              "Mencari jawabannya di internet",
              "Mengambil jawaban dari database raksasa",
              "Menebak, kata demi kata, kata apa yang paling mungkin muncul berikutnya",
            ],
            answerIndex: 2,
            why: "Dia menebak. Bukan mencari, bukan mengambil. Dia menyusun jawaban dari nol, kata per kata. Dari satu fakta ini semua aturan lain lahir.",
          },
          {
            question: "AI menjawab dengan sangat percaya diri. Apa artinya?",
            options: [
              "Jawabannya bisa dipercaya",
              "Tidak berarti apa-apa soal benar atau salah",
              "Dia menemukan sumber yang kuat",
            ],
            answerIndex: 1,
            why: "Nada percaya diri itu sendiri sebuah pola bahasa, ditiru dari jutaan tulisan. Dia salah dengan gaya seyakin saat dia benar. Jangan tertipu nadanya.",
          },
          {
            question: "Kenapa AI bisa menyebut nama kitab yang tidak pernah ada?",
            options: [
              "Datanya rusak",
              "Dia sengaja berbohong",
              "Dia menyusun dari pola, bukan mengambil dari kitab yang sebenarnya",
            ],
            answerIndex: 2,
            why: "Dia tidak memegang kitabnya. Dia cuma ingat pola dari kitab. Ketika pola itu diteruskan, lahirlah nama yang terdengar sangat masuk akal tapi tidak pernah ada.",
          },
          {
            question: "Kamu dapat PDF kitab 300 halaman. Imtihan lusa. Tool apa?",
            options: ["ChatGPT", "NotebookLM", "Midjourney"],
            answerIndex: 1,
            why: "NotebookLM dibuat khusus untuk membaca dan menjawab dari dokumen yang kamu upload sendiri, jadi kemungkinan dia mengarang jauh lebih kecil.",
          },
          {
            question: "Kamu butuh lima jurnal ilmiah yang bisa kamu buka dan periksa sendiri.",
            options: ["Perplexity", "ChatGPT", "Canva AI"],
            answerIndex: 0,
            why: "Perplexity menjawab sambil memberi tautan sumbernya. Kamu bisa membuka dan memverifikasi, bukan sekadar percaya.",
          },
          {
            question: "Bagian prompt mana yang paling menyelamatkanmu dari halusinasi?",
            options: [
              "Peran, misalnya \"kamu dosen fiqih\"",
              "Format, misalnya \"buat dalam tabel\"",
              "Batasan, misalnya \"kalau tidak yakin, bilang tidak yakin\"",
            ],
            answerIndex: 2,
            why: "Batasan memberi AI izin untuk mengaku tidak tahu. Tanpa itu, pola bawaannya adalah tetap menjawab, karena menjawab lebih mirip pola percakapan normal daripada diam.",
          },
          {
            question: "AI menyebut kitab \"Al-Ahkam Ar-Raqmiyyah\" karya Ibnu Utsaimin, halaman 214.",
            options: [
              "Langsung kutip, sumbernya jelas",
              "Curigai, periksa ke sumber aslinya dulu",
              "Tanyakan balik ke AI, benar tidak",
            ],
            answerIndex: 1,
            why: "Nama kitab, nama pengarang, dan nomor halaman: tiga hal paling rawan dikarang, muncul bersamaan dalam satu kalimat. Bertanya balik ke AI juga tidak menolong, dia bisa mengarang pembelaan.",
          },
          {
            question: "Kamu mau menulis ucapan duka untuk teman yang kehilangan ayahnya.",
            options: [
              "Pakai ChatGPT agar cepat dan rapi",
              "Pakai Claude agar bahasanya indah",
              "Tulis sendiri, sependek apapun",
            ],
            answerIndex: 2,
            why: "Salahnya memang tidak bahaya. Tapi ini soal ketulusan. Yang seharusnya lahir dari hatimu, tulis sendiri. Ini kuadran keempat: tidak usah pakai AI.",
          },
        ],
        note: "Benar minimal enam dari delapan? Materi ini sudah menempel.",
        isCompletion: true,
      },
    ],
  },
];
