import type { SesiMateri } from "./materiContent";

// ═══════════════════════════════════════════════════════════════════
// FUNDAMENTAL AI — Sesi pembuka AIGYPT
// Durasi penyampaian: ~10 menit (22 slide, rata-rata 25-30 detik/slide)
// Standalone: tidak mengubah materiContent.ts yang sudah ada
// ═══════════════════════════════════════════════════════════════════

export const fundamentalAIMateri: SesiMateri[] = [
  {
    sesiNumber: 1,
    title: "Fundamental AI: Dari Nol Sampai Paham",
    subtitle:
      "Sepuluh menit untuk ngerti AI itu apa, bisa apa, dan gimana cara pakainya biar hidup lo beneran kebantu",
    steps: [
      // ─── PEMBUKA ───────────────────────────────────────────────
      {
        id: "f-1",
        type: "concept",
        title: "Sebelum Mulai, Satu Fakta Dulu",
        subtitle: "Kenapa sesi ini penting banget buat lo",
        content:
          "Sekarang ini ada dua jenis orang. Yang pertama masih ngerjain semuanya manual, begadang tiga malam buat satu makalah. Yang kedua ngerjain hal yang sama dalam dua jam, terus tidur nyenyak. Bedanya bukan kepintaran. Bedanya cuma satu: yang kedua tahu cara pakai AI dengan benar.",
        quote:
          "AI nggak akan gantiin kamu. Tapi orang yang bisa pakai AI, pelan-pelan bakal ninggalin kamu.",
        bullets: [
          "Sepuluh menit ke depan, kamu bakal ngerti AI itu sebenernya apa",
          "Kamu bakal punya peta lengkap: masalah apa, pakai AI yang mana",
          "Kamu bakal tahu cara ngomong sama AI biar hasilnya bagus",
          "Kamu bakal tahu batasan etikanya, biar nggak kebablasan",
        ],
      },

      // ─── APA ITU AI ────────────────────────────────────────────
      {
        id: "f-2",
        type: "concept",
        title: "AI Itu Apa Sih, Sebenernya?",
        subtitle: "Penjelasan tanpa jargon, tanpa bikin pusing",
        content:
          "Lupakan dulu bayangan robot dari film. AI yang kita pakai sehari-hari itu jauh lebih sederhana konsepnya. Bayangin ada satu santri yang udah baca hampir semua buku yang pernah ditulis manusia. Semua kitab, semua jurnal, semua artikel, semua tutorial. Dia hafal polanya. Terus dia duduk di depan kamu dan bilang, silakan tanya apa aja.",
        bullets: [
          "AI belajar dari miliaran teks yang ditulis manusia, terus dia nangkep polanya",
          "Waktu kamu nanya, dia nyusun jawaban kata demi kata berdasarkan pola itu",
          "Dia bukan mesin pencari. Dia bukan ngambil jawaban dari database",
          "Dia menyusun jawaban baru, khusus buat pertanyaan kamu",
        ],
        note: "Makanya AI bisa salah. Dia nebak pola, bukan baca kunci jawaban.",
      },

      {
        id: "f-3",
        type: "concept",
        title: "Mitos vs Realita",
        subtitle: "Bersihin dulu kepala kita dari salah paham",
        table: {
          headers: ["Yang Orang Kira", "Kenyataannya"],
          rows: [
            ["AI selalu benar", "AI bisa ngarang dengan sangat meyakinkan. Selalu cek ulang"],
            ["AI bisa baca pikiran", "AI cuma tahu apa yang kamu tulis. Nggak lebih"],
            ["AI bakal gantiin manusia", "AI nggantiin yang nggak mau belajar, bukan yang mau belajar"],
            ["AI itu ribet dan teknis", "Kalau bisa ngetik WhatsApp, kamu bisa pakai AI"],
            ["Pakai AI itu curang", "Tergantung caranya. Kalkulator juga dulu dianggap curang"],
            ["AI mahal", "Mayoritas tool terbaik ada versi gratisnya"],
          ],
        },
      },

      // ─── SEJARAH ───────────────────────────────────────────────
      {
        id: "f-4",
        type: "concept",
        title: "Sejarah Singkat AI",
        subtitle: "Dari mimpi ilmuwan sampai ada di HP kamu",
        content:
          "AI bukan barang baru. Dia udah dikembangin puluhan tahun, cuma baru meledak beberapa tahun terakhir. Ini garis besarnya.",
        table: {
          headers: ["Tahun", "Yang Terjadi", "Contoh Nyata"],
          rows: [
            ["1950", "Alan Turing nanya: bisa nggak mesin berpikir?", "Turing Test"],
            ["1956", "Istilah Artificial Intelligence pertama kali dipakai", "Konferensi Dartmouth"],
            ["1997", "Komputer ngalahin juara dunia catur", "Deep Blue vs Kasparov"],
            ["2011", "Asisten suara masuk ke HP", "Siri di iPhone"],
            ["2016", "AI ngalahin juara dunia Go, permainan tersulit di dunia", "AlphaGo vs Lee Sedol"],
            ["2022", "AI percakapan meledak, 100 juta user dalam 2 bulan", "ChatGPT rilis"],
            ["2023-2026", "AI bisa lihat, dengar, bikin gambar, bikin video, bikin aplikasi", "Claude, Gemini, Sora, Veo"],
          ],
        },
        note: "Perhatiin polanya: dari 1950 ke 2022 butuh 70 tahun. Dari 2022 ke sekarang, lompatannya lebih besar dari 70 tahun sebelumnya digabung.",
      },

      // ─── KATEGORI: JANTUNG MATERI ──────────────────────────────
      {
        id: "f-5",
        type: "concept",
        title: "Peta AI Berdasarkan Masalah Kamu",
        subtitle: "Ini bagian paling penting. Simpan baik-baik",
        content:
          "Kesalahan paling umum: orang pakai satu AI buat semua hal. Itu kayak pakai obeng buat mukul paku. Bisa sih, tapi ngapain. Setiap AI punya spesialisasi. Sekarang kita bagi berdasarkan MASALAH kamu, bukan berdasarkan nama tool-nya.",
        cards: [
          {
            title: "Kategori 1 — Nulis & Mikir",
            subtitle: "Teks, ide, analisis",
            items: [
              "Claude — juara teks panjang, baca PDF, analisis kitab",
              "ChatGPT — serba bisa, brainstorming, komunitas terbesar",
              "Gemini — nyambung ke Google Docs, Drive, Gmail",
            ],
            accent: "purple",
          },
          {
            title: "Kategori 2 — Cari & Riset",
            subtitle: "Informasi terkini, referensi",
            items: [
              "Perplexity — nyari sambil kasih sumbernya, anti hoaks",
              "Gemini — akses internet real-time",
              "Elicit / Consensus — khusus nyari jurnal ilmiah",
            ],
            accent: "blue",
          },
        ],
      },

      {
        id: "f-6",
        type: "concept",
        title: "Peta AI (Lanjutan)",
        subtitle: "Kategori visual dan produktivitas",
        cards: [
          {
            title: "Kategori 3 — Gambar & Desain",
            subtitle: "Visual, poster, ilustrasi",
            items: [
              "Midjourney — kualitas artistik paling tinggi",
              "DALL-E / Gemini Image — gratis, gampang, cepat",
              "Canva AI — langsung jadi desain siap pakai",
              "Ideogram — paling jago bikin teks di dalam gambar",
            ],
            accent: "green",
          },
          {
            title: "Kategori 4 — Suara & Video",
            subtitle: "Audio, dubbing, konten",
            items: [
              "ElevenLabs — voice over natural, bisa bahasa Indonesia",
              "CapCut AI — edit video otomatis, subtitle otomatis",
              "Veo / Sora — bikin video dari tulisan",
              "Whisper — ubah rekaman jadi teks",
            ],
            accent: "purple",
          },
        ],
      },

      {
        id: "f-7",
        type: "concept",
        title: "Peta AI (Lanjutan)",
        subtitle: "Kategori teknis dan belajar",
        cards: [
          {
            title: "Kategori 5 — Ngoding & Bikin Aplikasi",
            subtitle: "Bahkan kalau kamu nggak bisa coding",
            items: [
              "Claude Code — bikin aplikasi dari ngobrol biasa",
              "Cursor — editor kode yang dipandu AI",
              "Replit / Lovable — bikin website tanpa install apa-apa",
              "GitHub Copilot — nemenin nulis kode",
            ],
            accent: "blue",
          },
          {
            title: "Kategori 6 — Belajar & Produktivitas",
            subtitle: "Bantu kamu ngerti lebih cepat",
            items: [
              "NotebookLM — upload kitab, langsung bisa tanya isinya",
              "Notion AI — rapiin catatan otomatis",
              "Otter — notulen rapat otomatis",
              "Grammarly — koreksi tulisan Inggris",
            ],
            accent: "green",
          },
        ],
      },

      // ─── TABEL MASALAH → SOLUSI ────────────────────────────────
      {
        id: "f-8",
        type: "concept",
        title: "Tabel Sakti: Masalah Kamu, Tool-nya",
        subtitle: "Screenshot slide ini. Serius",
        table: {
          headers: ["Masalah Kamu", "Pakai Ini", "Kenapa"],
          rows: [
            ["Nulis makalah bahasa Arab", "Claude", "Paling paham konteks akademik & bahasa"],
            ["Terjemah kitab kuning", "Claude", "Nangkep nuansa, bukan terjemah kaku"],
            ["Ringkas PDF 200 halaman", "NotebookLM", "Dibikin khusus buat baca dokumen"],
            ["Nyari referensi ilmiah", "Perplexity", "Kasih sumber, bisa dicek"],
            ["Bikin poster acara", "Canva AI / Ideogram", "Langsung jadi, teksnya rapi"],
            ["Bikin caption jualan", "ChatGPT", "Paling jago gaya marketing"],
            ["Edit video kajian", "CapCut AI", "Subtitle otomatis, gratis"],
            ["Voice over konten", "ElevenLabs", "Suaranya natural"],
            ["Bikin website organisasi", "Lovable / Replit", "Nggak perlu bisa coding"],
            ["Notulen rapat", "Otter", "Rekam, langsung jadi teks rapi"],
            ["Cek fakta berita", "Perplexity / Gemini", "Akses internet real-time"],
            ["Belajar materi susah", "Claude / ChatGPT", "Bisa disuruh jelasin ulang sampai paham"],
          ],
        },
      },

      // ─── AI DALAM HIDUP SEHARI-HARI ────────────────────────────
      {
        id: "f-9",
        type: "concept",
        title: "AI Dalam Hidup Sehari-hari",
        subtitle: "Bukan cuma buat tugas kuliah",
        cards: [
          {
            title: "Urusan Pribadi",
            items: [
              "Nyusun jadwal harian yang realistis",
              "Bikin meal plan hemat sesuai budget",
              "Nulis pesan susah: minta izin, nolak ajakan, minta maaf",
              "Nemenin mikir waktu lagi bingung ambil keputusan",
            ],
            accent: "purple",
          },
          {
            title: "Urusan Akademik",
            items: [
              "Ringkas materi sebelum imtihan",
              "Bikin soal latihan sendiri dari catatan",
              "Minta dijelaskan pakai analogi sampai paham",
              "Cek argumen makalah, cari celah lemahnya",
            ],
            accent: "blue",
          },
          {
            title: "Urusan Organisasi",
            items: [
              "Proposal kegiatan dari nol dalam hitungan jam",
              "Notulen rapat rapi otomatis",
              "Draft surat resmi ke lembaga",
              "Konten publikasi buat Instagram",
            ],
            accent: "green",
          },
          {
            title: "Urusan Cuan",
            items: [
              "Riset pasar sebelum jualan",
              "Caption dan copywriting produk",
              "Template balas chat customer",
              "Analisis kompetitor",
            ],
            accent: "purple",
          },
        ],
      },

      // ─── CARA PAKAI OPTIMAL ────────────────────────────────────
      {
        id: "f-10",
        type: "concept",
        title: "Rahasianya Ada di Cara Nanya",
        subtitle: "Dua orang, AI yang sama, hasil beda jauh",
        content:
          "Ini bagian yang paling sering dilewatin orang. AI itu sebagus perintah yang kamu kasih. Kalau perintahnya asal, hasilnya juga asal. Bahasa kerennya: garbage in, garbage out.",
        quote:
          "AI itu bukan Google. AI itu asisten pribadi yang sangat pintar, dan kamu adalah bosnya. Kasih briefing yang jelas.",
        bullets: [
          "AI nggak bisa baca pikiran kamu. Dia cuma tahu apa yang kamu tulis",
          "Makin detail brief-nya, makin bagus hasilnya",
          "Kalau hasilnya jelek, jangan salahin AI-nya. Perbaiki perintahnya",
        ],
      },

      {
        id: "f-11",
        type: "concept",
        title: "Formula 5 Bahan Prompt Bagus",
        subtitle: "Hafalin ini, hasil kamu langsung naik kelas",
        cards: [
          {
            title: "1. Peran",
            items: ["Kasih tahu AI dia harus jadi siapa", "Contoh: Kamu adalah dosen fiqih senior"],
            accent: "purple",
          },
          {
            title: "2. Konteks",
            items: ["Ceritain situasi kamu", "Contoh: Saya mahasiswa semester 3 Syariah Al-Azhar"],
            accent: "blue",
          },
          {
            title: "3. Tugas",
            items: ["Bilang persis apa yang kamu mau", "Contoh: Buatkan outline makalah 5 bab"],
            accent: "green",
          },
          {
            title: "4. Format",
            items: ["Tentukan bentuk hasilnya", "Contoh: Tabel, poin-poin, 500 kata"],
            accent: "purple",
          },
          {
            title: "5. Batasan",
            items: ["Kasih aturan mainnya", "Contoh: Gaya akademik formal, jangan pakai istilah asing"],
            accent: "blue",
          },
        ],
        note: "Nggak harus kelima-limanya selalu. Tapi makin lengkap, makin bagus.",
      },

      {
        id: "f-12",
        type: "practice",
        title: "Lihat Bedanya Sendiri",
        subtitle: "Prompt yang sama, tapi kualitas beda jauh",
        content:
          "Bandingkan tiga prompt ini. Ketiganya minta hal yang sama, tapi hasilnya bakal beda langit dan bumi.",
        prompts: [
          {
            label: "Level 1 — Payah",
            prompt: "bantuin makalah",
          },
          {
            label: "Level 2 — Lumayan",
            prompt: "Bantu saya bikin makalah tentang zakat",
          },
          {
            label: "Level 3 — Bagus (pakai formula 5 bahan)",
            prompt: `Kamu adalah pembimbing akademik di Fakultas Syariah Al-Azhar.

Saya mahasiswa semester 3. Saya harus menulis makalah 15 halaman 
berjudul "Zakat Aset Digital dalam Perspektif Fiqih Kontemporer".

Tolong buatkan:
1. Outline 5 bab dengan sub-poin detail tiap bab
2. Lima referensi kitab fiqih yang relevan
3. Contoh paragraf pembuka bab pendahuluan

Format: poin bernomor, bahasa Indonesia akademik formal.
Batasan: jangan mengarang nama kitab. Kalau tidak yakin, bilang tidak yakin.`,
          },
        ],
        note: "Coba sendiri nanti. Rasain bedanya.",
      },

      {
        id: "f-13",
        type: "concept",
        title: "Lima Kebiasaan Orang yang Jago Pakai AI",
        subtitle: "Ini yang membedakan pemula dan yang udah paham",
        bullets: [
          "Ngobrol, bukan sekali tembak. Hasil pertama jarang sempurna. Bilang: kurang panjang, tolong perdalam bagian dua",
          "Kasih contoh. Tunjukin tulisan yang kamu suka, suruh AI ikutin gayanya",
          "Suruh AI nanya balik. Tambahin: kalau ada yang kurang jelas, tanya dulu ke saya sebelum menjawab",
          "Selalu verifikasi. Terutama angka, nama kitab, tanggal, dan hadits. AI bisa ngarang dengan sangat meyakinkan",
          "Pakai AI buat mikir, bukan buat gantiin mikir. Suruh dia debat sama kamu, bukan bikinin semuanya",
        ],
      },

      // ─── HALUSINASI ────────────────────────────────────────────
      {
        id: "f-14",
        type: "concept",
        title: "Bahaya Terbesar: AI Bisa Ngarang",
        subtitle: "Namanya halusinasi. Dan dia terdengar sangat meyakinkan",
        content:
          "Ini penting banget, apalagi buat kita yang belajar agama. AI bisa nyebut nama kitab yang nggak ada. Bisa ngarang hadits. Bisa bikin nomor halaman yang salah. Dan dia nyampeinnya dengan nada yang sangat percaya diri.",
        cards: [
          {
            title: "Yang Rawan Dikarang",
            items: [
              "Nama kitab dan pengarangnya",
              "Kutipan hadits dan sanadnya",
              "Angka statistik dan tahun",
              "Nomor halaman dan referensi",
              "Nama tokoh dan biografinya",
            ],
            accent: "red",
          },
          {
            title: "Cara Ngelindungin Diri",
            items: [
              "Tambahin di prompt: kalau tidak yakin, bilang tidak yakin",
              "Cek ulang semua nama kitab dan hadits ke sumber asli",
              "Pakai Perplexity kalau butuh sumber yang bisa diverifikasi",
              "Jangan pernah setor tulisan tanpa baca ulang sendiri",
            ],
            accent: "green",
          },
        ],
        note: "Aturan emas: AI boleh jadi asisten, tapi tanggung jawab akhir tetap di tangan kamu.",
      },

      // ─── ETIKA ─────────────────────────────────────────────────
      {
        id: "f-15",
        type: "concept",
        title: "Etika Pakai AI: Garis yang Nggak Boleh Dilewati",
        subtitle: "Dalam kehidupan sehari-hari",
        cards: [
          {
            title: "Boleh dan Sehat",
            items: [
              "Pakai AI buat ngerti materi yang susah",
              "Minta AI cek dan koreksi tulisan kamu sendiri",
              "Brainstorming ide sebelum kamu kembangkan",
              "Minta AI kritik argumen kamu, cari kelemahannya",
              "Bikin rangkuman dari catatan kamu sendiri",
            ],
            accent: "green",
          },
          {
            title: "Jangan, Ini Merugikan Kamu",
            items: [
              "Copy paste jawaban AI mentah-mentah tanpa dibaca",
              "Setor tugas yang kamu sendiri nggak paham isinya",
              "Nyebar informasi agama dari AI tanpa verifikasi ulang",
              "Pakai AI buat nulis hal yang harusnya dari hati kamu",
              "Bikin konten palsu, deepfake, atau nyamar jadi orang lain",
            ],
            accent: "red",
          },
        ],
        quote:
          "Tanya diri kamu: kalau dosen tanya isi tulisan ini, saya bisa jawab nggak? Kalau nggak bisa, berarti kamu belum pantas nyetor.",
      },

      {
        id: "f-16",
        type: "concept",
        title: "Etika Pakai AI di Dunia Profesional",
        subtitle: "Kerja, organisasi, dan bisnis",
        table: {
          headers: ["Prinsip", "Artinya di Praktik"],
          rows: [
            ["Transparansi", "Kalau AI bantu banyak, jujur aja bilang. Jangan pura-pura"],
            ["Kerahasiaan", "Jangan pernah masukin data pribadi orang, nomor rekening, atau rahasia lembaga ke AI"],
            ["Verifikasi", "Semua hasil AI yang keluar atas nama kamu atau lembaga, wajib dicek dulu"],
            ["Tanggung jawab", "Salahnya AI tetap jadi salahmu di mata orang. Nggak ada alasan"],
            ["Hak cipta", "Karya AI yang mirip karya orang lain tetap bermasalah secara moral"],
            ["Keadilan", "AI bisa punya bias. Jangan jadikan dia hakim untuk urusan yang menyangkut orang"],
          ],
        },
        note: "Aturan sederhana: kalau kamu malu ketahuan pakai AI untuk hal itu, kemungkinan besar kamu memang nggak seharusnya.",
      },

      // ─── SESI INTERAKTIF ───────────────────────────────────────
      {
        id: "f-17",
        type: "practice",
        title: "Kuis Kilat: Tebak Tool-nya",
        subtitle: "Angkat tangan yang tahu jawabannya",
        content:
          "Sekarang giliran kamu. Gue sebutin masalahnya, kamu tebak AI mana yang paling cocok. Nggak usah takut salah, ini bukan imtihan.",
        table: {
          headers: ["No", "Situasinya", "Jawaban"],
          rows: [
            ["1", "Kamu dapat PDF kitab 300 halaman, imtihan lusa", "NotebookLM"],
            ["2", "Panitia butuh poster acara, deadline besok pagi", "Canva AI atau Ideogram"],
            ["3", "Kamu perlu 5 jurnal ilmiah yang bisa diverifikasi", "Perplexity"],
            ["4", "Kamu mau bikin website organisasi tapi nggak bisa coding", "Lovable atau Replit"],
            ["5", "Video kajian 2 jam butuh subtitle Indonesia", "CapCut AI"],
            ["6", "Kamu harus terjemah matan Arab dengan nuansa yang pas", "Claude"],
            ["7", "Kamu butuh 20 ide caption jualan dalam 5 menit", "ChatGPT"],
            ["8", "Rapat 90 menit, kamu males nulis notulen", "Otter"],
          ],
        },
        note: "Kalau kamu bisa jawab minimal 5 dari 8, artinya materi ini udah nyantol.",
      },

      {
        id: "f-18",
        type: "practice",
        title: "Tantangan 2 Menit: Perbaiki Prompt Ini",
        subtitle: "Ini prompt jelek. Tugas kamu bikin dia jadi bagus",
        content:
          "Di bawah ini ada prompt yang buruk. Pakai formula 5 bahan tadi (Peran, Konteks, Tugas, Format, Batasan) untuk memperbaikinya. Coba tulis versi kamu sendiri dulu, baru lihat contoh perbaikannya.",
        prompts: [
          {
            label: "Prompt Buruk — Perbaiki Ini",
            prompt: "buatin proposal acara",
          },
          {
            label: "Contoh Perbaikan (jangan diintip dulu)",
            prompt: `Kamu adalah sekretaris organisasi mahasiswa yang berpengalaman 
menyusun proposal kegiatan.

Konteks: Saya ketua panitia Seminar AI untuk Masisir di Kairo. 
Target peserta 150 orang, budget 8000 EGP, durasi acara satu hari.

Tugas: Buatkan proposal kegiatan lengkap yang mencakup latar belakang, 
tujuan, susunan acara, rincian anggaran, dan penutup.

Format: Dokumen terstruktur dengan heading dan sub-heading, 
bahasa Indonesia resmi organisasi.

Batasan: Anggaran harus realistis dan totalnya tidak melebihi budget. 
Jangan mengarang nama sponsor atau pemateri.`,
          },
        ],
        note: "Rasain bedanya? Prompt pertama bikin AI nebak-nebak. Prompt kedua bikin AI kerja beneran.",
      },

      {
        id: "f-19",
        type: "practice",
        title: "Benar atau Salah?",
        subtitle: "Sesi cepat, jawab dalam hati atau teriakin",
        table: {
          headers: ["Pernyataan", "Jawaban", "Alasannya"],
          rows: [
            ["AI selalu kasih informasi yang akurat", "Salah", "AI bisa halusinasi dan ngarang dengan meyakinkan"],
            ["Prompt yang detail bikin hasil lebih bagus", "Benar", "Makin jelas briefing, makin bagus outputnya"],
            ["Boleh masukin data pribadi orang lain ke AI", "Salah", "Itu melanggar privasi dan bisa berbahaya"],
            ["Semua AI sama aja kemampuannya", "Salah", "Tiap AI punya spesialisasi masing-masing"],
            ["AI bisa dipakai buat ngerti materi kuliah", "Benar", "Ini justru salah satu penggunaan paling sehat"],
            ["Hasil AI bisa langsung disetor tanpa dibaca", "Salah", "Tanggung jawab tetap di tangan kamu"],
          ],
        },
      },

      // ─── PENUTUP ───────────────────────────────────────────────
      {
        id: "f-20",
        type: "concept",
        title: "Tiga Hal yang Harus Kamu Bawa Pulang",
        subtitle: "Kalau lupa semua, ingat tiga ini aja",
        cards: [
          {
            title: "Satu — Pilih Alat yang Tepat",
            items: [
              "Jangan pakai satu AI buat semua hal",
              "Kenali masalahmu dulu, baru pilih tool-nya",
              "Balik lagi ke tabel sakti tadi kapan pun butuh",
            ],
            accent: "purple",
          },
          {
            title: "Dua — Cara Nanya Menentukan Segalanya",
            items: [
              "Peran, Konteks, Tugas, Format, Batasan",
              "Ngobrol sama AI, jangan sekali tembak",
              "Hasil jelek berarti prompt-nya yang perlu diperbaiki",
            ],
            accent: "blue",
          },
          {
            title: "Tiga — Kamu Tetap Bosnya",
            items: [
              "AI bisa ngarang, kamu wajib verifikasi",
              "Pakai AI buat mikir lebih tajam, bukan buat berhenti mikir",
              "Tanggung jawab akhir selalu ada di tangan kamu",
            ],
            accent: "green",
          },
        ],
      },

      {
        id: "f-21",
        type: "concept",
        title: "Satu Langkah Kecil Hari Ini",
        subtitle: "Jangan tutup materi ini terus lupa",
        content:
          "Ilmu yang nggak dipraktekin itu cuma jadi hiburan. Sebelum tidur nanti, lakukan satu hal ini.",
        bullets: [
          "Pikirin satu masalah nyata yang kamu hadapi minggu ini. Yang bikin kamu stres beneran",
          "Buka salah satu AI. Bebas, mana aja",
          "Tulis prompt pakai formula 5 bahan tadi. Jangan asal ketik",
          "Lihat hasilnya. Kalau kurang, perbaiki prompt-nya dan coba lagi",
          "Rasain bedanya. Itu momen di mana AI berhenti jadi mainan dan mulai jadi alat",
        ],
        quote:
          "Yang bikin kamu ketinggalan bukan karena kamu nggak pintar. Tapi karena kamu nunda mulai.",
      },

      {
        id: "f-22",
        type: "concept",
        title: "Sampai Jumpa di Sesi Berikutnya",
        subtitle: "Fundamental selesai. Sekarang saatnya bangun sesuatu",
        content:
          "Kamu udah punya fondasinya. Kamu tahu AI itu apa, kamu tahu tool mana buat masalah apa, kamu tahu cara nanya yang benar, dan kamu tahu di mana batas etikanya. Itu udah lebih dari cukup buat mulai. Di sesi selanjutnya, kita nggak cuma bahas teori lagi. Kita bakal bikin sesuatu yang nyata pakai tangan kita sendiri.",
        quote:
          "AI nggak bikin kamu jadi orang lain. AI bikin kamu jadi versi kamu yang lebih cepat, lebih tajam, dan lebih berani ambil kerjaan besar.",
        isCompletion: true,
      },
    ],
  },
];
