import type { SesiMateri } from "./materiContent";

// ═══════════════════════════════════════════════════════════════════
// FUNDAMENTAL AI — 4 sesi pendek, bahasa sehari-hari
//
// Pola tiap sesi: TEBAK DULU (kuis) → baru dikasih tau → CEK PAHAM.
// Peserta nebak dan salah duluan, jadi pas dikasih jawabannya nempel.
// Pembicara punya banyak momen buat mancing audiens.
//
// Tulang punggung: satu ide (AI itu nebak, bukan tahu).
// ═══════════════════════════════════════════════════════════════════

export const fundamentalAIMateri: SesiMateri[] = [
  // ═══════════════════════════════════════════════════════════════
  // SESI 1 — AI Itu Nebak, Bukan Tahu
  // ═══════════════════════════════════════════════════════════════
  {
    sesiNumber: 1,
    title: "AI Itu Nebak, Bukan Tahu",
    subtitle: "Satu hal yang bikin kamu langsung beda dari 90 persen orang yang pakai AI",
    steps: [
      {
        id: "fa1-1",
        type: "concept",
        title: "Bukan Soal Pintar",
        subtitle: "Empat menit lagi kamu bakal lihat AI dengan mata yang beda",
        content:
          "Ada dua orang. Sama pintarnya. Yang satu begadang tiga malam buat satu makalah. Yang satu kelar dalam dua jam, terus tidur nyenyak. Bedanya bukan otak. Bedanya cuma satu: yang kedua ngerti AI itu barang apa sebenarnya.",
        quote:
          "Banyak orang pakai AI berbulan-bulan tanpa pernah tau lagi ngomong sama apa. Makanya hasilnya gitu-gitu aja.",
      },
      {
        id: "fa1-2",
        type: "practice",
        title: "Tebak Dulu, Baru Dikasih Tau",
        subtitle: "Jangan lihat ke bawah. Jawab jujur pakai feeling kamu",
        content:
          "Sebelum gue jelasin apapun, coba jawab satu ini dulu. Nggak apa-apa salah, malah bagus.",
        quiz: [
          {
            question: "Waktu kamu nanya sesuatu ke ChatGPT, sebenarnya dia lagi ngapain?",
            options: [
              "Nyari jawabannya di internet, terus dikasih ke kamu",
              "Buka database raksasa, ambil jawaban yang paling cocok",
              "Nebak kata demi kata, kata apa yang paling mungkin muncul berikutnya",
            ],
            answerIndex: 2,
            why: "Ini yang bikin kaget banyak orang. Dia NEBAK. Bukan nyari, bukan ngambil. Dia nyusun jawabannya dari nol, kata per kata. Dan dari satu fakta ini, semua hal lain bakal masuk akal.",
          },
        ],
      },
      {
        id: "fa1-3",
        type: "concept",
        title: "Nih Kuncinya",
        subtitle: "Kalau kamu cuma inget satu hal dari kelas ini, inget yang ini",
        bigIdea: {
          text: "AI itu mesin nebak pola. Bukan mesin cari jawaban.",
          caption: "Dari sini semuanya jadi masuk akal",
        },
        content:
          "Bayangin ada santri yang udah baca hampir semua yang pernah ditulis manusia. Semua kitab, semua artikel, semua tulisan. Tapi pas ditanya, dia nggak boleh buka satu kitab pun. Semuanya dari inget-inget pola. Dia nggak ngambil jawaban dari mana-mana. Dia NYUSUN, kata demi kata.",
        bullets: [
          "Google itu NYARI. AI itu NYUSUN. Beda banget, bukan beda dikit",
          "Dia nggak pegang kitabnya. Dia cuma inget pola dari kitab",
          "Jawaban buat kamu itu baru, dibikin detik itu juga, khusus buat kamu",
        ],
        note: "Dia nggak nanya ke dirinya \"mana yang bener?\". Dia nanya \"kata apa ya yang biasanya muncul abis ini?\".",
      },
      {
        id: "fa1-4",
        type: "concept",
        title: "Karena Dia Nebak, Makanya...",
        subtitle: "Perhatiin: ini bukan 6 aturan buat dihafal. Ini 1 fakta dilihat dari 6 sisi",
        table: {
          headers: ["Karena AI cuma nebak pola...", "Makanya buat kamu artinya..."],
          rows: [
            ["Dia nyusun, bukan ngambil", "Dia bisa ngarang nama kitab yang nggak ada. Bukan bohong, emang nebak"],
            ["Nada pede itu sendiri sebuah pola", "Pede bukan berarti bener. Dia salah dengan gaya seyakin waktu dia bener"],
            ["Bentuk itu pola kuat, fakta detail itu pola lemah", "Dia rapi di struktur, tapi rapuh di angka, nama, tanggal, kutipan"],
            ["Prompt kamu bikin tebakannya nyempit", "Makin jelas maunya, makin sempit tebakannya, makin tepat hasilnya"],
            ["Contoh itu pola yang paling gampang ditiru", "Kasih contoh tulisan yang kamu mau. Lebih ngena dari 10 paragraf penjelasan"],
            ["Dia nggak tau kalau dia nggak tau", "Ngecek ulang itu tugas KAMU, bukan tugas dia"],
          ],
        },
      },
      {
        id: "fa1-5",
        type: "concept",
        title: "Sejarahnya Sebentar Aja",
        subtitle: "Bukan buat dihafal. Rasain aja kecepatannya",
        timeline: [
          { year: "1950", event: "Alan Turing nanya: emang mesin bisa mikir?", example: "Turing Test" },
          { year: "1997", event: "Komputer ngalahin juara dunia catur", example: "Deep Blue vs Kasparov" },
          { year: "2016", event: "AI menang main Go, game tersulit di dunia", example: "AlphaGo vs Lee Sedol" },
          { year: "2022", event: "AI ngobrol meledak ke publik", example: "ChatGPT" },
          { year: "2023 ke sini", event: "AI bisa lihat, denger, bikin gambar, video, bahkan aplikasi", example: "Claude, Gemini, dan lain-lain" },
        ],
        content:
          "Coba lihat jaraknya. Dari 1950 ke 2022 butuh 70 tahun. Dari 2022 ke sekarang, lompatannya lebih gede dari 70 tahun sebelumnya digabung.",
        note: "Pelajarannya cuma satu: yang nunggu \"ah nanti aja kalau udah matang\" bakal nunggu selamanya. Dia nggak akan berhenti berubah.",
      },
      {
        id: "fa1-6",
        type: "practice",
        title: "Cek Paham",
        subtitle: "Klik jawabanmu, langsung ketauan",
        quiz: [
          {
            question: "AI jawab dengan super pede. Artinya apa?",
            options: [
              "Berarti jawabannya bisa dipercaya",
              "Nggak berarti apa-apa soal bener atau salah",
              "Berarti dia nemu sumber yang kuat",
            ],
            answerIndex: 1,
            why: "Nada pede itu sendiri POLA bahasa, yang dia tiru dari jutaan tulisan. Dia salah dengan gaya seyakin waktu dia bener. Jangan ketipu nadanya.",
          },
          {
            question: "Kenapa AI bisa nyebut nama kitab yang nggak pernah ada?",
            options: [
              "Datanya rusak",
              "Dia sengaja bohong",
              "Dia nyusun dari pola, bukan ngambil dari kitab beneran",
            ],
            answerIndex: 2,
            why: "Dia nggak pegang kitabnya. Dia cuma inget POLA dari kitab. Pas polanya diterusin, bisa lahir nama yang kedengeran masuk akal banget tapi nggak pernah ada.",
          },
        ],
        isCompletion: true,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // SESI 2 — Tool Mana Buat Masalah Apa
  // ═══════════════════════════════════════════════════════════════
  {
    sesiNumber: 2,
    title: "Tool Mana Buat Masalah Apa",
    subtitle: "Berhenti pakai satu AI buat semua hal. Itu kayak mukul paku pakai obeng",
    steps: [
      {
        id: "fa2-1",
        type: "practice",
        title: "Tebak Dulu",
        subtitle: "Dua situasi. Coba rasain bedanya",
        quiz: [
          {
            question: "Mana yang LEBIH BAHAYA kalau AI-nya salah?",
            options: [
              "AI bikin 20 caption jualan, satu di antaranya garing",
              "AI nyebut satu hadits, ternyata dikarang",
            ],
            answerIndex: 1,
            why: "Obvious ya? Tapi ini justru intinya. Sebelum pakai AI, kamu HARUS nanya: kalau dia salah di sini, seberapa mahal? Jawabannya nentuin cara kamu perlakuin dia. Slide berikutnya kita rapikan.",
          },
        ],
      },
      {
        id: "fa2-2",
        type: "concept",
        title: "Dua Pertanyaan Sebelum Pegang AI",
        subtitle: "Nama tool bakal basi. Cara mikir ini nggak",
        content:
          "Sebelum pakai AI buat apapun, tanya dua hal. SATU: kalau dia salah di sini, seberapa mahal? DUA: seberapa penting kecepatan dan banyaknya pilihan buat kerjaan ini? Dua jawaban itu langsung nentuin gimana kamu harus merlakuin dia.",
        matrix: {
          yLabel: "Bahaya kalau salah",
          xLabel: "Butuh cepat & banyak pilihan",
          quadrants: [
            {
              title: "Salahnya nggak bahaya, butuh cepat",
              verdict: "Lepas aja. Biarin AI kerja",
              items: [
                "Caption jualan, 20 variasi judul",
                "Draft chat, balesan pesan, cari ide",
                "Rapiin catatan yang kamu tulis sendiri",
              ],
              accent: "green",
            },
            {
              title: "Salahnya bahaya, tapi butuh cepat",
              verdict: "AI nyusun, KAMU cek baris per baris",
              items: [
                "Makalah, proposal acara, laporan",
                "Terjemahan teks panjang",
                "Semua nama, angka, kutipan WAJIB dicek ulang",
              ],
              accent: "blue",
            },
            {
              title: "Salahnya bahaya, nggak butuh cepat",
              verdict: "AI cuma temen debat. JANGAN jadiin sumber",
              items: [
                "Hadits, sanad, hukum fiqih, fatwa",
                "Angka statistik, klaim ilmiah, rujukan kitab",
                "Sumbernya tetap kitab sama guru. Titik",
              ],
              accent: "red",
            },
            {
              title: "Nggak bahaya, nggak butuh cepat",
              verdict: "Ya udah nggak usah pakai AI",
              items: [
                "Bales chat dua kalimat, catat belanjaan",
                "Buka AI, ngetik prompt, baca hasil, perbaiki",
                "Malah lebih lama daripada kamu kerjain sendiri",
              ],
              accent: "purple",
            },
          ],
        },
        note: "Tau kapan NGGAK pakai alat, itu juga keahlian lho.",
      },
      {
        id: "fa2-3",
        type: "concept",
        title: "Peta Tool-nya",
        subtitle: "Screenshot slide ini. Nggak usah dihafal, nama tool cepet berubah",
        cards: [
          { title: "Nulis & Mikir", items: ["Claude, jago teks panjang & baca dokumen", "ChatGPT, serba bisa & cari ide", "Gemini, nyambung ke Google"], accent: "purple" },
          { title: "Nyari & Riset", items: ["Perplexity, jawab sambil kasih sumbernya", "Gemini, bisa akses internet langsung", "Elicit & Consensus, khusus jurnal ilmiah"], accent: "blue" },
          { title: "Gambar & Desain", items: ["Midjourney, hasilnya paling artistik", "Canva AI, langsung jadi desain siap pakai", "Ideogram, paling rapi nulis teks di gambar"], accent: "green" },
          { title: "Suara & Video", items: ["ElevenLabs, voice over natural banget", "CapCut AI, edit & subtitle otomatis", "Whisper, rekaman jadi teks"], accent: "purple" },
          { title: "Ngoding & Bikin Aplikasi", items: ["Claude Code & Cursor, dipandu AI", "Replit & Lovable, tanpa install apa-apa", "Bahkan kalau kamu nggak bisa coding"], accent: "blue" },
          { title: "Belajar & Produktif", items: ["NotebookLM, upload kitab terus tanya isinya", "Otter, notulen rapat otomatis", "Notion AI, rapiin catatan"], accent: "green" },
        ],
        note: "Ini contoh, bukan kitab suci. Enam bulan lagi sebagian nama di sini udah ganti. Yang nggak ganti itu dua pertanyaan di slide sebelumnya.",
      },
      {
        id: "fa2-4",
        type: "concept",
        title: "Masalah Kamu, Tool-nya",
        subtitle: "Yang paling sering kepake sehari-hari",
        table: {
          headers: ["Masalah kamu", "Pakai", "Tapi inget"],
          rows: [
            ["PDF kitab 300 halaman, imtihan lusa", "NotebookLM", "Emang dibikin khusus buat baca dokumen"],
            ["Butuh rujukan yang bisa dicek", "Perplexity", "Dia kasih sumbernya, bukan cuma jawaban"],
            ["Terjemah matan biar nuansanya pas", "Claude", "Istilah teknisnya tetap cek sendiri"],
            ["20 ide caption dalam 5 menit", "ChatGPT", "Nggak bahaya, lepas aja"],
            ["Poster acara, deadline besok", "Canva AI / Ideogram", "Cek ejaan teksnya, sering meleset"],
            ["Video kajian butuh subtitle", "CapCut AI", "Baca ulang subtitle istilah Arabnya"],
            ["Bikin web organisasi, nggak bisa coding", "Lovable / Replit", "Mulai dari yang kecil dulu"],
            ["Materi kuliah nggak masuk otak", "Claude / ChatGPT", "Suruh jelasin ulang sampai kamu paham"],
          ],
        },
      },
      {
        id: "fa2-5",
        type: "practice",
        title: "Cek Paham",
        subtitle: "Situasinya nyata. Pilih tool-nya",
        quiz: [
          {
            question: "Dapet PDF kitab 300 halaman. Imtihan lusa. Tool apa?",
            options: ["ChatGPT", "NotebookLM", "Midjourney"],
            answerIndex: 1,
            why: "NotebookLM dibikin khusus buat baca dan jawab dari dokumen yang KAMU upload sendiri. Jadi kemungkinan dia ngarang jauh lebih kecil.",
          },
          {
            question: "Butuh 5 jurnal ilmiah yang bisa kamu buka dan cek sendiri.",
            options: ["Perplexity", "ChatGPT", "Canva AI"],
            answerIndex: 0,
            why: "Perplexity jawab sambil kasih link sumbernya. Kamu bisa buka dan verifikasi, bukan cuma percaya doang.",
          },
          {
            question: "Mau nulis ucapan duka buat temen yang ayahnya meninggal.",
            options: [
              "ChatGPT aja biar cepet dan rapi",
              "Claude aja biar bahasanya indah",
              "Tulis sendiri, sependek apapun",
            ],
            answerIndex: 2,
            why: "Salahnya emang nggak bahaya. Tapi ini soal ketulusan. Yang harusnya lahir dari hati kamu, tulis sendiri. Ini kuadran keempat: nggak usah pakai AI.",
          },
        ],
        isCompletion: true,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // SESI 3 — Cara Nanya yang Bener
  // ═══════════════════════════════════════════════════════════════
  {
    sesiNumber: 3,
    title: "Cara Nanya yang Bener",
    subtitle: "Dua orang, AI yang sama, hasilnya beda jauh. Ini penyebabnya",
    steps: [
      {
        id: "fa3-1",
        type: "practice",
        title: "Tebak Dulu",
        subtitle: "Satu pertanyaan sebelum masuk materi",
        quiz: [
          {
            question: "Hasil AI kamu jelek. Siapa yang salah?",
            options: [
              "AI-nya emang belum pinter",
              "Prompt kamu yang kurang jelas",
              "Emang nasib, kadang bagus kadang jelek",
            ],
            answerIndex: 1,
            why: "Inget sesi 1: AI itu NEBAK. Kalau perintahnya samar, tebakannya melebar ke mana-mana. Prompt yang bagus itu bikin tebakannya nyempit sampai tinggal yang kamu mau doang.",
          },
        ],
      },
      {
        id: "fa3-2",
        type: "concept",
        title: "Nanya = Bikin Tebakannya Nyempit",
        subtitle: "Inget ide besar di sesi 1? Ini penerapannya langsung",
        content:
          "Prompt jelek bikin tebakan AI melebar selebar samudra, jadi dia nembak ke mana-mana. Prompt bagus bikin tebakannya nyempit, sampai yang nyisa cuma jawaban yang kamu mau. Lima bahan ini gunanya cuma satu: nyempitin.",
        flow: [
          { label: "Peran", desc: "Dia harus jadi siapa" },
          { label: "Konteks", desc: "Situasi kamu gimana" },
          { label: "Tugas", desc: "Persisnya mau apa" },
          { label: "Format", desc: "Bentuk hasilnya gimana" },
          { label: "Batasan", desc: "Aturan mainnya apa" },
        ],
        note: "Bahan kelima, BATASAN, yang paling sering dilupain dan paling nyelametin. Contoh: \"kalau nggak yakin, bilang nggak yakin\".",
      },
      {
        id: "fa3-3",
        type: "practice",
        title: "Rasain Bedanya",
        subtitle: "Minta hal yang sama, tapi hasilnya beda langit dan bumi",
        prompts: [
          { label: "Tebakannya selebar samudra", prompt: "bantuin makalah" },
          { label: "Masih terlalu lebar", prompt: "Bantu saya bikin makalah tentang zakat" },
          {
            label: "Nyempit sampai presisi",
            prompt: `Kamu pembimbing akademik di Fakultas Syariah Al-Azhar.

Saya mahasiswa semester 3. Saya harus nulis makalah 15 halaman
judulnya "Zakat Aset Digital dalam Perspektif Fiqih Kontemporer".

Tolong buatkan:
1. Outline 5 bab lengkap dengan sub-poinnya
2. Lima rujukan kitab fiqih yang relevan
3. Contoh paragraf pembuka bab pendahuluan

Format: poin bernomor, bahasa Indonesia akademik formal.
Batasan: jangan ngarang nama kitab. Kalau nggak yakin, bilang nggak yakin.`,
          },
        ],
        note: "Prompt ketiga bagus BUKAN karena panjang. Bagus karena tiap kalimatnya nutup satu kemungkinan salah.",
      },
      {
        id: "fa3-4",
        type: "concept",
        title: "Bahaya Terbesar Buat Kita",
        subtitle: "Dan kenapa anak Azhar lebih rawan dari orang lain",
        content:
          "Inget lagi: dia NYUSUN, bukan NGAMBIL. Artinya dia bisa nyusun nama kitab yang nggak pernah ada, sanad yang nggak pernah nyambung, dan nomor halaman yang dikarang. Dan dia nyampeinnya dengan nada seyakin ustadz yang udah ngajar 30 tahun.",
        cards: [
          {
            title: "Paling Rawan Dikarang",
            items: [
              "Nama kitab sama pengarangnya",
              "Matan hadits, sanad, sama derajatnya",
              "Nomor halaman dan jilid",
              "Angka statistik dan tahun",
              "Nama tokoh dan biografinya",
            ],
            accent: "red",
          },
          {
            title: "Cara Jagain Diri",
            items: [
              "Tulis di prompt: kalau nggak yakin, bilang nggak yakin",
              "Pakai Perplexity kalau butuh sumber yang bisa dicek",
              "Semua nama kitab dan hadits, balikin ke sumber aslinya",
              "Jangan pernah setor apapun yang belum kamu baca ulang",
            ],
            accent: "green",
          },
        ],
        quote:
          "Nyebarin hadits palsu gara-gara percaya AI, tetap aja nyebarin hadits palsu. Alasannya nggak bakal nolongin kamu.",
      },
      {
        id: "fa3-5",
        type: "practice",
        title: "Cek Paham",
        subtitle: "Latih insting curiga kamu",
        quiz: [
          {
            question: "AI nyebut kitab \"Al-Ahkam Ar-Raqmiyyah\" karya Ibnu Utsaimin, halaman 214. Kamu ngapain?",
            options: [
              "Langsung kutip, sumbernya jelas kok",
              "Curigai, cek ke sumber aslinya dulu",
              "Tanya balik ke AI-nya, bener nggak nih",
            ],
            answerIndex: 1,
            why: "Nama kitab, nama pengarang, nomor halaman: TIGA hal paling rawan dikarang, muncul barengan dalam satu kalimat. Dan nanya balik ke AI juga nggak nolong, dia bisa ngarang pembelaan.",
          },
          {
            question: "Bagian prompt mana yang paling nyelametin kamu dari halusinasi?",
            options: [
              "Peran, misal \"kamu dosen fiqih\"",
              "Format, misal \"bikin dalam tabel\"",
              "Batasan, misal \"kalau nggak yakin, bilang nggak yakin\"",
            ],
            answerIndex: 2,
            why: "Batasan itu ngasih AI IZIN buat ngaku nggak tau. Tanpa itu, pola default-nya adalah tetap jawab, soalnya jawab lebih mirip pola ngobrol normal daripada diem.",
          },
        ],
        isCompletion: true,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // SESI 4 — Etika & Bekal Pulang
  // ═══════════════════════════════════════════════════════════════
  {
    sesiNumber: 4,
    title: "Etika & Bekal Pulang",
    subtitle: "Garis yang nggak boleh dilewatin, plus satu langkah buat malam ini",
    steps: [
      {
        id: "fa4-1",
        type: "practice",
        title: "Tebak Dulu, Ini Boleh Nggak?",
        subtitle: "Tiga kasus nyata. Jawab jujur",
        content:
          "Nggak ada yang ngehakimi di sini. Jawab aja apa adanya, nanti kita bahas bareng.",
        quiz: [
          {
            question: "Kamu setor makalah hasil AI, tapi kamu sendiri belum baca isinya. Boleh?",
            options: [
              "Boleh lah, yang penting kelar tepat waktu",
              "Nggak. Kalau nggak bisa jelasin isinya, kamu belum pantes nyetor",
              "Boleh, asal kamu jujur bilang pakai AI",
            ],
            answerIndex: 1,
            why: "Jujur doang nggak cukup. Ada yang lebih dasar: karya kamu itu yang bisa kamu PERTANGGUNGJAWABKAN pas ditanya, bukan yang berhasil kamu kumpulin.",
          },
          {
            question: "Kamu masukin daftar nama sama nomor WA panitia ke AI biar dirapiin.",
            options: [
              "Aman, cuma nama sama nomor doang",
              "Nggak boleh. Itu data pribadi orang lain",
              "Aman kalau AI-nya yang berbayar",
            ],
            answerIndex: 1,
            why: "Itu bukan data kamu. Kamu nggak punya izin dari mereka buat nyerahin ke pihak ketiga. Mau AI-nya gratis atau bayar, sama aja.",
          },
          {
            question: "Kamu pakai AI buat nyariin celah lemah di argumen makalah kamu sendiri.",
            options: [
              "Curang, itu kan tugas dosen",
              "Sehat banget. Ini justru salah satu cara pakai yang terbaik",
              "Percuma, AI nggak ngerti argumen",
            ],
            answerIndex: 1,
            why: "Pakai AI buat ngedebat dan najemin pikiran kamu sendiri itu cara pakai paling sehat. Kamu tetap yang MIKIR, dia cuma lawan tanding.",
          },
        ],
      },
      {
        id: "fa4-2",
        type: "concept",
        title: "Garis yang Nggak Boleh Dilewatin",
        subtitle: "Buat sehari-hari dan buat kerja, sekaligus",
        table: {
          headers: ["Prinsip", "Praktiknya gimana"],
          rows: [
            ["Paham", "Kalau nggak bisa jelasin isinya, kamu belum pantes nyetor"],
            ["Jujur", "Kalau AI bantu banyak, bilang aja. Nggak usah pura-pura"],
            ["Rahasia", "Jangan pernah masukin data pribadi orang, nomor rekening, atau rahasia lembaga"],
            ["Cek ulang", "Semua yang keluar atas nama kamu, wajib kamu cek dulu"],
            ["Tanggung jawab", "Salahnya AI tetap jadi salah kamu di mata orang. Nggak ada alasan"],
            ["Tulus", "Yang harusnya dari hati, tulis sendiri. Ucapan duka, minta maaf, doa"],
          ],
        },
        quote:
          "Tes gampang: kalau kamu malu ketauan pakai AI buat hal itu, kemungkinan besar emang nggak seharusnya.",
      },
      {
        id: "fa4-3",
        type: "concept",
        title: "Tiga Bekal, Satu Langkah",
        subtitle: "Kalau lupa semuanya, inget ini aja",
        cards: [
          {
            title: "Satu",
            items: ["Dia NEBAK pola, bukan NYARI jawaban", "Dari sini semua aturan lahir"],
            accent: "purple",
          },
          {
            title: "Dua",
            items: ["Kalau salah, seberapa mahal?", "Seberapa butuh cepat dan banyak pilihan?"],
            accent: "blue",
          },
          {
            title: "Tiga",
            items: ["Kamu tetap bosnya. Ngecek itu tugas kamu", "Pakai dia buat mikir lebih tajam, bukan berhenti mikir"],
            accent: "green",
          },
        ],
        content:
          "Malam ini sebelum tidur, coba satu hal. Ambil satu masalah nyata yang bikin kamu stres minggu ini. Buka AI mana aja. Tulis prompt pakai lima bahan tadi. Lihat hasilnya, perbaiki, coba lagi. Rasain bedanya. Itu momen di mana AI berhenti jadi mainan dan mulai jadi alat.",
        quote:
          "Yang bikin kamu ketinggalan bukan karena kurang pinter. Tapi karena nunda mulai.",
        isCompletion: true,
      },
    ],
  },
];
