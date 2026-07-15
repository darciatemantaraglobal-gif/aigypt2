import type { SesiMateri } from "./materiContent";

// ═══════════════════════════════════════════════════════════════════
// VIBE CODING — 5 sesi, ~60 menit
//
// Satu ide jadi tulang punggung: Kamu arsiteknya, AI tukangnya.
// Kamu tidak perlu tahu cara memasang bata. Tapi kamu harus tahu
// persis rumah seperti apa yang kamu mau.
//
// Alur kelas: mindset → blueprint → loop membangun → rilis & rawat.
// Output nyata: satu website atau aplikasi yang menyelesaikan
// masalah kamu sendiri.
//
// Sapaan: "kamu" untuk peserta, "saya" untuk pembicara.
// Kuis kecil di akhir Sesi 2, kuis besar penutup di Sesi 4.
// ═══════════════════════════════════════════════════════════════════

export const vibeCodingMateri: SesiMateri[] = [
  // ═══════════════════════════════════════════════════════════════
  // SESI 1 — Kamu Tidak Perlu Bisa Ngoding
  // ═══════════════════════════════════════════════════════════════
  {
    sesiNumber: 1,
    title: "Kamu Tidak Perlu Bisa Ngoding",
    subtitle: "Tapi kamu perlu tahu persis apa yang kamu mau. Di situ bedanya",
    steps: [
      {
        id: "vc1-1",
        type: "concept",
        title: "Cerita Dulu, Sebentar",
        subtitle: "Ini kejadian nyata, bukan motivasi kosong",
        content:
          "Ada mahasiswa Al-Azhar yang capek melihat teman-temannya kesulitan mencari materi muqarrar menjelang ujian. Dia tidak bisa ngoding. Sama sekali. Yang dia punya cuma satu: dia tahu persis masalahnya, karena dia mengalaminya sendiri setiap termin. Dalam beberapa minggu, dia punya website yang dipakai ratusan mahasiswa. Bukan karena dia jenius. Karena dia ngobrol dengan AI sampai websitenya jadi.",
        quote:
          "Sepuluh tahun lalu, ide seperti itu butuh tim programmer dan uang puluhan juta. Sekarang butuh laptop, niat, dan kemampuan menjelaskan maumu dengan jelas.",
        note: "Yang akan kamu bawa pulang dari kelas ini: satu website atau aplikasi yang benar-benar jalan, dibuat dari masalahmu sendiri.",
      },
      {
        id: "vc1-2",
        type: "concept",
        title: "Ini Kuncinya",
        subtitle: "Satu kalimat yang jadi pegangan sampai kelas selesai",
        bigIdea: {
          text: "Kamu arsiteknya. AI tukangnya.",
          caption: "Arsitek tidak memasang bata. Tapi arsitek tahu persis rumah seperti apa yang mau dibangun",
        },
        content:
          "Vibe coding itu membangun aplikasi dengan cara mendeskripsikan apa yang kamu mau, lalu membiarkan AI menulis kodenya. Kamu tidak menyentuh kode. Kamu menyentuh keputusan: aplikasi ini untuk siapa, menyelesaikan masalah apa, tampilannya bagaimana, dan mana yang penting duluan. Itu pekerjaan arsitek. Dan menariknya: pekerjaan arsitek tidak bisa diambil alih AI, justru makin penting.",
        bullets: [
          "Tukang yang hebat tapi arsiteknya bingung, hasilnya rumah aneh. AI hebat tapi kamu tidak jelas maunya, hasilnya aplikasi aneh",
          "Kamu tidak perlu paham isi kodenya. Kamu perlu paham apakah hasilnya sesuai maumu",
          "Kemampuan intinya bukan bahasa pemrograman. Kemampuan intinya bahasa manusia yang jelas",
        ],
      },
      {
        id: "vc1-3",
        type: "concept",
        title: "Kenapa Ini Baru Mungkin Sekarang",
        subtitle: "Biar kamu tidak merasa ini terlalu bagus untuk jadi kenyataan",
        timeline: [
          { year: "2020", event: "Bikin website = belajar HTML, CSS, JavaScript berbulan-bulan dulu", example: "Atau bayar jasa jutaan rupiah" },
          { year: "2022", event: "AI mulai bisa menulis potongan kode, tapi kamu tetap harus merakitnya sendiri", example: "Copy-paste dari ChatGPT" },
          { year: "2024", event: "AI agent bisa membangun aplikasi utuh dari deskripsi, langsung jalan", example: "Replit Agent, Cursor, Lovable" },
          { year: "Sekarang", event: "Ngobrol, lihat hasilnya, minta revisi. Berulang sampai jadi", example: "Yang kamu lakukan di kelas ini" },
        ],
        content:
          "Perhatikan lompatannya. Dulu jarak antara punya ide dan punya aplikasi itu berbulan-bulan belajar. Sekarang jaraknya satu percakapan. Yang berubah bukan idenya, yang berubah adalah alatnya.",
        note: "Dan seperti biasa: yang menunggu sampai keadaan sempurna akan menunggu selamanya.",
      },
      {
        id: "vc1-4",
        type: "concept",
        title: "Peta Alatnya",
        subtitle: "Nama-nama ini akan basi. Cara memilihnya tidak",
        table: {
          headers: ["Alat", "Paling cocok untuk", "Catatan"],
          rows: [
            ["Replit Agent", "Aplikasi utuh dengan database dan login, langsung online", "Yang kita pakai di kelas ini. Semua di browser, tidak perlu install apapun"],
            ["Claude / ChatGPT", "Berpikir bareng: merancang fitur, menulis spesifikasi, memahami error", "Partner diskusi sebelum dan selama membangun"],
            ["Lovable / Bolt", "Tampilan website yang cantik dengan cepat", "Kuat di desain, lebih terbatas untuk logika rumit"],
            ["Cursor / Claude Code", "Kalau nanti kamu mau naik level dan menyentuh kode langsung", "Simpan untuk babak berikutnya, bukan sekarang"],
          ],
        },
        note: "Aturan praktisnya: satu proyek, satu alat utama. Jangan pindah-pindah alat di tengah jalan, itu seperti ganti tukang saat rumah setengah jadi.",
      },
      {
        id: "vc1-5",
        type: "concept",
        title: "Jujur Dulu Soal Batasnya",
        subtitle: "Saya tidak mau kamu kecewa karena berharap yang salah",
        cards: [
          {
            title: "Vibe coding sangat bisa",
            accent: "green",
            items: [
              "Website organisasi, landing page acara, katalog usaha",
              "Aplikasi pendataan: absensi kajian, database anggota, arsip",
              "Alat bantu pribadi: tracker hafalan, pengingat jadwal talaqqi",
              "Prototipe untuk menguji ide sebelum serius",
            ],
          },
          {
            title: "Belum wilayahnya",
            accent: "red",
            items: [
              "Aplikasi yang memegang uang orang dalam jumlah besar",
              "Sistem dengan jutaan pengguna sekaligus",
              "Data super sensitif tanpa pendampingan yang paham keamanan",
              "Aplikasi yang nyawa orang bergantung padanya",
            ],
          },
        ],
        content:
          "Kabar baiknya: sembilan puluh persen masalah di sekitar kamu masuk kolom hijau. Masalah organisasi, masalah belajar, masalah usaha kecil. Semuanya wilayah vibe coding.",
        isCompletion: true,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // SESI 2 — Kenalan Sama Dapurnya
  // ═══════════════════════════════════════════════════════════════
  {
    sesiNumber: 2,
    title: "Kenalan Sama Dapurnya",
    subtitle: "Workflow, para asisten AI, dan istilah-istilah yang akan kamu dengar terus. Kenalan sekali, nyaman selamanya",
    steps: [
      {
        id: "vc2-1",
        type: "concept",
        title: "Kenapa Sesi Ini Ada",
        subtitle: "Biar kamu tidak merasa asing di dunia yang akan kamu masuki",
        content:
          "Bayangkan masuk dapur restoran untuk pertama kali. Orang-orang teriak istilah asing, alat-alat tidak kamu kenal, dan semua bergerak cepat. Kamu tidak perlu bisa masak untuk nyaman di sana. Kamu cuma perlu tahu: itu kompor, itu kulkas, itu gudang, dan si A tugasnya apa. Sesi ini melakukan hal yang sama untuk dunia membangun aplikasi. Setelah ini, saat AI bilang \"sudah saya deploy, datanya tersimpan di database\", kamu manggut-manggut karena paham, bukan karena sungkan.",
        quote:
          "Kamu tidak perlu hafal semua istilah hari ini. Kamu cuma perlu pernah dengar, supaya saat dia muncul lagi, dia terasa seperti kenalan lama.",
      },
      {
        id: "vc2-2",
        type: "concept",
        title: "Anatomi Aplikasi: Warung Analogi",
        subtitle: "Setiap aplikasi di dunia, dari WhatsApp sampai Gojek, terdiri dari tiga bagian ini",
        cards: [
          {
            title: "Frontend: Etalase",
            accent: "purple",
            items: [
              "Semua yang pengguna lihat dan sentuh: tombol, warna, form, halaman",
              "Kalau warung: etalase, meja, daftar menu yang dipajang",
              "Saat kamu bilang \"tombolnya kegedean\", kamu sedang ngomongin frontend",
            ],
          },
          {
            title: "Backend: Dapur",
            accent: "blue",
            items: [
              "Logika yang bekerja di balik layar: memproses pesanan, mengecek login, menghitung",
              "Kalau warung: dapur tempat pesanan dimasak. Pembeli tidak melihatnya, tapi di sinilah kerja sebenarnya",
              "Saat form dikirim lalu \"diproses\", yang memproses itu backend",
            ],
          },
          {
            title: "Database: Gudang",
            accent: "green",
            items: [
              "Tempat semua data disimpan rapi: daftar anggota, absensi, pesanan",
              "Kalau warung: gudang stok dan buku catatan penjualan",
              "Aplikasi mati lalu dinyalakan lagi, datanya masih ada? Itu jasa database",
            ],
          },
        ],
        note: "Tiga-tiganya dibangun AI untukmu. Kamu cuma perlu tahu bagian mana yang sedang dibicarakan, supaya feedback-mu tepat sasaran.",
      },
      {
        id: "vc2-3",
        type: "concept",
        title: "Para Asisten AI-mu",
        subtitle: "Chatbot dan agent itu beda. Ini bedanya, dan siapa mengerjakan apa",
        content:
          "Chatbot itu konsultan: kamu tanya, dia jawab, kamu yang eksekusi. Agent itu tukang: kamu kasih perintah, dia yang eksekusi sendiri, dari menulis kode, membuat file, memasang database, sampai memperbaiki errornya sendiri. Vibe coding hidup di dunia agent. Tapi konsultan tetap penting: sebelum menyuruh tukang, kamu diskusi dulu sama konsultan.",
        table: {
          headers: ["Asisten", "Perannya di workflow-mu", "Kapan kamu memakainya"],
          rows: [
            ["Claude / ChatGPT (chatbot)", "Konsultan: diskusi ide, menajamkan blueprint, menerjemahkan istilah dan error", "Sebelum membangun, dan setiap kali bingung"],
            ["Replit Agent", "Tukang utama: membangun aplikasi utuh dari promptmu, langsung bisa dibuka online", "Saat membangun. Ini rumah utama kelas kita"],
            ["Cursor / Claude Code", "Tukang spesialis yang bekerja langsung di kode di komputermu", "Nanti, kalau kamu sudah mulai berani menyentuh kode"],
            ["v0 / Lovable / Bolt", "Tukang dekorasi: cepat membuat tampilan yang cantik", "Kalau proyekmu lebih berat ke tampilan daripada logika"],
          ],
        },
        note: "Pola sehatnya: ngobrol dengan konsultan sampai blueprint tajam, baru serahkan ke tukang. Jangan dibalik.",
      },
      {
        id: "vc2-4",
        type: "concept",
        title: "Workflow Besar: Dari Ide Sampai Dipakai Orang",
        subtitle: "Ini peta perjalanan lengkapnya. Kelas ini akan menyusurinya satu per satu",
        flow: [
          { label: "Ide", desc: "Keluhan berulang jadi masalah yang jelas. Diskusi dengan chatbot sampai tajam" },
          { label: "Blueprint", desc: "Lima pertanyaan dijawab: siapa, masalah apa, tiga fitur, halaman, tampilan" },
          { label: "Bangun", desc: "Prompt ke agent, lalu loop: lihat, tes, minta perbaikan, ulang" },
          { label: "Simpan", desc: "Kode tersimpan rapi dengan riwayat versi, biasanya di GitHub. Bisa mundur kalau rusak" },
          { label: "Online", desc: "Deploy: aplikasimu naik ke internet, dapat alamat yang bisa dibuka siapa saja" },
          { label: "Rawat", desc: "Dengar pengguna, perbaiki, tambah fitur pelan-pelan. Balik ke langkah Bangun" },
        ],
        content:
          "Kabar baiknya: di Replit, langkah Simpan dan Online itu hampir otomatis. Tapi kamu tetap perlu paham konsepnya, karena begitu proyekmu makin serius, kamu akan bertemu nama-nama di langkah berikut ini.",
      },
      {
        id: "vc2-5",
        type: "concept",
        title: "Tiga Nama Besar yang Akan Sering Kamu Dengar",
        subtitle: "GitHub, Vercel, Supabase. Kenalan dulu biar tidak kaget",
        cards: [
          {
            title: "GitHub: Lemari Arsip Kode",
            accent: "purple",
            items: [
              "Tempat kode disimpan online, lengkap dengan riwayat setiap perubahan",
              "Satu proyek di GitHub disebut repository, atau repo",
              "Manfaat terbesarnya: kalau versi baru rusak, kamu bisa kembali ke versi kemarin yang masih jalan",
              "Juga tempat kolaborasi: teman bisa ikut mengerjakan proyek yang sama",
            ],
          },
          {
            title: "Vercel: Etalase Online",
            accent: "blue",
            items: [
              "Layanan hosting: mengambil kodemu dan menayangkannya ke internet",
              "Terhubung ke GitHub: setiap kamu simpan perubahan, website otomatis ter-update",
              "Gratis untuk proyek kecil, dan bisa dipasangi domain sendiri seperti namamu.com",
              "Banyak builder pindah ke sini saat proyeknya lulus dari tahap coba-coba",
            ],
          },
          {
            title: "Supabase: Gudang Data Siap Pakai",
            accent: "green",
            items: [
              "Database online plus fitur login pengguna, tanpa kamu membangunnya dari nol",
              "Datamu tersimpan di tabel, mirip spreadsheet, tapi bisa diakses aplikasimu",
              "Punya aturan keamanan bawaan untuk mengatur siapa boleh membaca dan mengubah data",
              "Pasangan favorit Vercel: Vercel pegang etalase, Supabase pegang gudang",
            ],
          },
        ],
        note: "Di kelas ini kamu belum wajib memakai ketiganya, Replit sudah menyediakan semuanya dalam satu atap. Tapi sekarang, saat AI atau tutorial menyebut nama-nama ini, kamu tahu persis mereka bicara apa.",
      },
      {
        id: "vc2-5a",
        type: "concept",
        title: "Pilihan Tempat Menayangkan (Deploy)",
        subtitle: "Etalase online-mu mau dititip di mana? Ini pilihan-pilihannya, klik saja untuk lihat",
        content:
          "Semua layanan ini intinya sama: mengambil aplikasimu dan menayangkannya ke internet. Bedanya di kemudahan, harga, dan seberapa cocok dengan alat lain yang kamu pakai. Kabar baik: semuanya punya paket gratis yang lebih dari cukup untuk proyek pertamamu.",
        links: [
          {
            label: "Vercel",
            url: "https://vercel.com",
            desc: "Sekali sambungkan ke GitHub, setiap perubahan otomatis tayang. Gratis untuk proyek pribadi, bisa pasang domain sendiri. Pilihan utama komunitas builder saat ini.",
            recommended: true,
          },
          {
            label: "Netlify",
            url: "https://www.netlify.com",
            desc: "Saudara dekat Vercel, sama-sama enak dipakai. Kalau satu bermasalah, ini pelarian yang nyaman.",
          },
          {
            label: "Replit Deployments",
            url: "https://replit.com",
            desc: "Paling gampang karena satu atap dengan tempatmu membangun: satu klik langsung tayang. Cocok saat masih belajar, tapi untuk aplikasi yang menyala terus, berbayar.",
          },
          {
            label: "Cloudflare Pages",
            url: "https://pages.cloudflare.com",
            desc: "Cepat sekali diakses dari mana pun dan jatah gratisnya royal. Sedikit lebih teknis untuk pemula.",
          },
          {
            label: "GitHub Pages",
            url: "https://pages.github.com",
            desc: "Gratis total untuk website sederhana tanpa dapur (tanpa backend). Cukup untuk landing page atau profil organisasi.",
          },
        ],
        note: "Rekomendasi kelas ini: mulai dari Replit Deployments selama belajar. Begitu proyekmu mulai serius dan dipakai orang, pindah ke Vercel.",
      },
      {
        id: "vc2-5b",
        type: "concept",
        title: "Pilihan Gudang Data (Database)",
        subtitle: "Data anggota, absensi, pesanan: mau disimpan di gudang yang mana?",
        links: [
          {
            label: "Supabase",
            url: "https://supabase.com",
            desc: "Gudang data + sistem login + penyimpanan file dalam satu paket, dengan dashboard yang enak dilihat. Datamu tampil seperti spreadsheet. Gratis untuk memulai.",
            recommended: true,
          },
          {
            label: "Firebase",
            url: "https://firebase.google.com",
            desc: "Punya Google, kuat untuk aplikasi yang butuh update data langsung (realtime) seperti chat. Banyak tutorial, tapi struktur datanya beda gaya dengan yang lain.",
          },
          {
            label: "Neon",
            url: "https://neon.tech",
            desc: "Database Postgres murni yang ringan dan modern. Cocok kalau kamu cuma butuh gudangnya saja tanpa fitur login bawaan.",
          },
          {
            label: "MongoDB Atlas",
            url: "https://www.mongodb.com/atlas",
            desc: "Gaya penyimpanan yang lebih bebas bentuk (NoSQL). Populer, tapi untuk data rapi seperti absensi dan anggota, gaya tabel biasanya lebih mudah dipahami.",
          },
        ],
        note: "Rekomendasi kelas ini: Supabase. Satu akun langsung dapat gudang, login, dan penyimpanan file. Hemat banyak langkah untuk pemula.",
      },
      {
        id: "vc2-5c",
        type: "concept",
        title: "Pilihan Dapur (Backend)",
        subtitle: "Di mana logika aplikasimu bekerja? Tenang, AI yang membangunnya. Kamu cukup tahu pilihannya",
        links: [
          {
            label: "Vercel Functions",
            url: "https://vercel.com/docs/functions",
            desc: "Dapur kecil-kecil yang hanya menyala saat dibutuhkan, menempel langsung di hosting Vercel-mu. Satu atap dengan etalase: paling sedikit yang harus diurus.",
            recommended: true,
          },
          {
            label: "Supabase Edge Functions",
            url: "https://supabase.com/docs/guides/functions",
            desc: "Dapur yang menempel di gudang datamu. Cocok untuk logika yang berurusan langsung dengan data, seperti verifikasi pembayaran.",
          },
          {
            label: "Express.js",
            url: "https://expressjs.com",
            desc: "Dapur klasik yang dipakai jutaan aplikasi. Inilah yang biasanya dibangun Replit Agent secara diam-diam untukmu. Tutorialnya paling melimpah.",
          },
          {
            label: "Railway",
            url: "https://railway.app",
            desc: "Untuk dapur yang harus menyala terus-menerus: bot WhatsApp, pengingat otomatis, pengambil data berkala.",
          },
        ],
        content:
          "Kalau tiga pilihan ini digabung, lahirlah paket yang dipakai banyak builder sungguhan, termasuk platform yang sedang kamu buka sekarang ini: GitHub untuk arsip kode, Vercel untuk etalase dan dapur, Supabase untuk gudang data.",
        note: "Jalur yang disarankan: selama kelas, cukup Replit (semua sudah satu atap). Proyek serius pertamamu: GitHub + Vercel + Supabase. Ketiganya gratis untuk memulai, dan AI bisa memandu perpindahannya langkah demi langkah.",
      },
      {
        id: "vc2-5d",
        type: "concept",
        title: "Soal Duit: Ngomongin yang Dari Tadi Kamu Pikirin",
        subtitle: "Gratis sampai mana? Mulai bayar kapan? Ini jawabannya, sejujur-jujurnya",
        content:
          "Ada satu pertanyaan yang jarang diucapkan di kelas tapi selalu duduk di kepala: \"ini semua bayarnya berapa?\" Dan karena tidak terjawab, dia diam-diam jadi alasan untuk tidak mulai. Jadi kita bereskan sekarang. Jawaban singkatnya melegakan: seluruh fase belajar, dari sesi ini sampai aplikasimu dipakai teman-temanmu, bisa kamu lewati dengan Rp 0. Bukan gratis versi jebakan, memang paket gratisnya cukup. Duit baru masuk pembicaraan saat aplikasimu naik kelas: pembangunannya makin intens, butuh nama sendiri, atau mulai jadi ladang usaha.",
        table: {
          headers: ["Fase", "Yang kamu pakai", "Biaya"],
          rows: [
            [
              "Belajar & latihan (kamu, sekarang)",
              "Replit Starter, Claude/ChatGPT versi gratis, Vercel Hobby, Supabase Free",
              "Rp 0. Titik",
            ],
            [
              "Membangun makin serius",
              "Replit Core, kalau jatah gratis Agent mulai terasa sempit: sekitar $25/bulan (± Rp 400 ribuan)",
              "Opsional, bukan wajib. Banyak yang selesai satu aplikasi tanpa ini",
            ],
            [
              "Rilis dengan nama sendiri",
              "Domain: .my.id mulai belasan ribu setahun, .com dan .id sekitar Rp 150–250 ribu setahun",
              "Setahun sekali. Setara traktir makan beberapa teman",
            ],
          ],
        },
        cards: [
          {
            title: "Tetap Rp 0 selama...",
            accent: "green",
            items: [
              "Kamu latihan dan membangun proyek pribadi atau organisasi skala kecil, puluhan pengguna",
              "Kamu ikhlas pakai alamat bawaan gratis: namaproyekmu.replit.app atau .vercel.app. Fungsinya sama persis dengan domain mahal",
              "Jatah harian Agent gratismu dipakai dengan prompt yang jelas. Prompt ngawur bikin AI muter-muter, dan muter-muter itu yang makan jatah. Sesi 4 melatih ini",
              "Kamu tidak panik saat proyek gratisan \"tidur\" karena lama tidak diakses. Dibangunkan lagi bisa, cuma butuh beberapa detik loading pertama",
            ],
          },
          {
            title: "Saatnya keluar duit saat...",
            accent: "red",
            items: [
              "Jatah gratis Agent habis terus padahal proyekmu lagi jalan kencang. Itu tanda kamu produktif, bukan tanda boros",
              "Aplikasimu mau dipakai orang luar dan butuh terlihat profesional: domain sendiri itu upgrade termurah dengan efek terbesar",
              "Aplikasimu dipakai serius tiap hari dan tidak boleh \"tidur\". Di titik ini biasanya aplikasimu sudah menghasilkan nilai, jadi biayanya wajar",
              "Pegang prinsip ini: duit keluar SETELAH nilai masuk, bukan sebelumnya",
            ],
          },
        ],
        quote:
          "Jangan bayar untuk menghilangkan kecemasan. Bayarlah untuk menghilangkan hambatan yang benar-benar sudah kamu tabrak.",
        note: "Angka di atas ditulis pertengahan 2026 dan pasti berubah, jadi cek halaman pricing masing-masing sebelum bayar apapun. Yang tidak akan berubah: fase belajar selalu bisa gratis. Artinya alasan \"belum ada budget\" resmi tidak berlaku, mulai hari ini.",
      },
      {
        id: "vc2-6",
        type: "concept",
        title: "Kamus Kantong",
        subtitle: "Istilah yang pasti muncul. Tidak perlu dihafal, cukup pernah kenal. Nanti balik lagi ke sini kalau lupa",
        table: {
          headers: ["Istilah", "Artinya, versi manusia"],
          rows: [
            ["Deploy", "Menayangkan aplikasimu ke internet supaya bisa dibuka orang lain"],
            ["Repo (repository)", "Folder proyekmu di GitHub, lengkap dengan seluruh riwayat perubahannya"],
            ["Commit", "Satu titik simpan perubahan. Seperti save point di game: bisa balik ke sini kalau ada apa-apa"],
            ["Bug", "Kesalahan yang bikin aplikasi berperilaku tidak semestinya"],
            ["API", "Pintu resmi tempat dua aplikasi saling bicara. Aplikasimu tanya ke server lewat pintu ini"],
            ["API key / Secret", "Kunci rahasia untuk memakai layanan tertentu. Jangan pernah terlihat di sisi pengguna"],
            ["Environment variable", "Tempat aman menyimpan kunci-kunci rahasia itu, di luar kode"],
            ["Localhost / Preview", "Versi aplikasi yang cuma kamu yang bisa lihat, untuk dites sebelum tayang"],
            ["Production", "Versi yang tayang sungguhan dan dipakai pengguna nyata. Hati-hati mengubah yang ini"],
            ["Domain", "Alamat aplikasimu di internet, seperti aigypt.id"],
            ["Rollback", "Mundur ke versi sebelumnya yang masih jalan. Sahabatmu di saat genting"],
            ["Autentikasi (auth)", "Sistem login: memastikan yang masuk memang orang yang berhak"],
          ],
        },
        quote:
          "Bedanya pemula yang cepat berkembang dan yang mudah menyerah sering cuma satu: yang pertama tidak takut sama istilah. Dia tanya AI: \"jelaskan istilah ini seperti ke anak SMP\", lalu lanjut jalan.",
      },
      {
        id: "vc2-7",
        type: "concept",
        title: "Cek Kenalan Baru",
        subtitle: "Tiga soal santai. Kalau bisa jawab, kamu resmi tidak asing lagi di dapur ini",
        quiz: [
          {
            question: "Aplikasimu jalan, lalu AI bilang: \"perubahan sudah saya deploy\". Artinya?",
            options: [
              "Kodenya dihapus dan ditulis ulang",
              "Perubahan sudah tayang, versi yang dibuka pengguna sekarang sudah versi terbaru",
              "Aplikasinya dimatikan sementara",
              "Datanya dipindah ke database lain",
            ],
            answerIndex: 1,
            why: "Deploy = menayangkan ke internet. Kalau sudah di-deploy, apa yang dibuka pengguna adalah versi terbaru itu.",
          },
          {
            question: "Data absensi anggota kajianmu tersimpan dan tidak hilang walau aplikasi ditutup. Bagian mana yang berjasa?",
            options: [
              "Frontend, karena tampilannya bagus",
              "Domain, karena alamatnya mudah diingat",
              "Database, gudang tempat data disimpan permanen",
              "Commit, karena kodenya tersimpan",
            ],
            answerIndex: 2,
            why: "Frontend etalase, backend dapur, database gudang. Data yang awet tersimpan itu urusan gudang. Commit menyimpan KODE, bukan data pengguna.",
          },
          {
            question: "Kamu mau diskusi menajamkan ide dulu sebelum membangun. Ke siapa larinya?",
            options: [
              "Langsung ke Replit Agent, biar cepat jadi",
              "Ke chatbot seperti Claude atau ChatGPT dulu sebagai konsultan, baru ke agent sebagai tukang",
              "Ke Vercel, karena dia yang menayangkan",
              "Ke GitHub, karena semua kode ada di sana",
            ],
            answerIndex: 1,
            why: "Pola sehatnya: konsultan dulu, tukang kemudian. Blueprint yang tajam dari diskusi menghemat berputar-putar saat membangun.",
          },
        ],
        isCompletion: true,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // SESI 3 — Dari Masalah Jadi Blueprint
  // ═══════════════════════════════════════════════════════════════
  {
    sesiNumber: 3,
    title: "Dari Masalah Jadi Blueprint",
    subtitle: "Aplikasi gagal jarang karena kodenya jelek. Biasanya karena masalahnya tidak jelas",
    steps: [
      {
        id: "vc3-1",
        type: "concept",
        title: "Masalah Dulu, Teknologi Belakangan",
        subtitle: "Ini urutan yang paling sering dibalik orang",
        content:
          "Kesalahan klasik: mulai dari 'saya mau bikin aplikasi' lalu bingung aplikasinya buat apa. Balik urutannya. Mulai dari keluhan. Apa yang bikin kamu atau orang di sekitarmu kesal berulang kali? Data absensi kajian dicatat di kertas lalu hilang? Info penting organisasi tenggelam di grup WhatsApp? Jadwal talaqqi bentrok terus? Setiap keluhan yang berulang itu bahan mentah aplikasi.",
        quote:
          "Aplikasi terbaik untuk dibangun pertama kali adalah yang menyelesaikan masalahmu sendiri. Karena kamu adalah pengguna pertamanya, dan kamu tidak bisa membohongi dirimu sendiri soal apakah ini berguna.",
        bullets: [
          "Masalah yang kamu alami sendiri lebih mudah dibangun daripada masalah yang kamu bayangkan",
          "Masalah yang berulang tiap minggu lebih layak dibangun daripada yang terjadi sekali setahun",
          "Kalau ada lima orang lain yang mengeluh hal yang sama, kamu sedang memegang ide bagus",
        ],
      },
      {
        id: "vc3-1a",
        type: "concept",
        title: "Bank Ide: 20 Amunisi Kalau Kepalamu Masih Kosong",
        subtitle: "Bukan buat dicontek mentah-mentah. Buat mancing \"eh iya, itu masalah gue juga\"",
        content:
          "Sebagian dari kamu sekarang membatin: \"oke, mulai dari masalah... tapi masalah saya apa ya?\" Tenang, itu bukan tanda kamu kurang kreatif. Masalah yang kita alami tiap hari justru yang paling susah kelihatan, seperti kacamata yang kamu cari ke mana-mana padahal sedang dipakai. Maka ini: dua puluh ide dari kehidupan nyata di sekitarmu. Bacanya pelan-pelan. Tugasmu bukan memilih yang paling keren. Tugasmu menandai mana yang bikin kamu nyeletuk: \"ini sih gue banget.\"",
        cards: [
          {
            title: "Organisasi & Kepanitiaan",
            accent: "purple",
            items: [
              "Absensi kajian digital: isi dari HP, rekap otomatis, tidak ada lagi kertas yang hilang",
              "Database anggota: nama, angkatan, almamater, kontak. Bisa dicari dalam tiga detik, bukan tiga hari",
              "Arsip notulensi rapat: semua keputusan tersimpan dan bisa dicari, bukan tenggelam di grup WhatsApp",
              "Pendaftaran acara dengan kartu peserta digital, panitia tidak lagi rekap manual dari chat",
              "Papan pengumuman organisasi: satu sumber info resmi. Admin update, anggota baca, selesai",
            ],
          },
          {
            title: "Akademik & Belajar",
            accent: "blue",
            items: [
              "Tracker muroja'ah: catat setoran harian, lihat grafik progres, tandai halaman yang sering lupa",
              "Bank soal termin: kumpulan soal ujian tahun-tahun lalu per mata kuliah, bisa difilter dan dicari",
              "Jadwal talaqqi bersama: siapa belajar kitab apa, di mana, jam berapa. Anti bentrok, anti zonk",
              "Katalog muqarrar dan diktat: kitab apa ada di siapa, PDF-nya tersimpan di mana",
              "Pencari teman belajar: masukkan mata kuliahmu, ketemu orang yang lagi berjuang di materi yang sama",
            ],
          },
          {
            title: "Bisnis & Jasa",
            accent: "green",
            items: [
              "Katalog jastip: foto barang, harga, stok, tombol pesan langsung ke WhatsApp",
              "Form pre-order makanan mingguan: menu, batas waktu pesan, rekap otomatis untuk yang masak",
              "Daftar harga jasa dengan kalkulator: terjemah per halaman, ketik per lembar, desain per item",
              "Booking jadwal jasa: potong rambut, les privat, tanpa chat bolak-balik \"kak besok bisa jam berapa\"",
              "Lelang barang \"ana rahil\": katalog barang teman-teman yang mau pulang kampung, lengkap dengan harga",
            ],
          },
          {
            title: "Ibadah & Komunitas",
            accent: "red",
            items: [
              "Tracker tilawah kelompok: target bersama, progres tiap anggota kelihatan, saling menyemangati",
              "Manajemen iuran kas: siapa sudah bayar bulan ini, siapa belum, tanpa nagih satu-satu dengan canggung",
              "Jadwal piket asrama atau sekretariat yang adil dan bergilir otomatis",
              "Direktori kontak penting komunitas: dokter yang bisa dihubungi, jasa antar, nomor darurat, satu tempat",
              "Galeri dokumentasi kegiatan: foto per acara, rapi, tidak hilang saat ganti pengurus",
            ],
          },
        ],
        note: "Perhatikan: tidak ada satu pun ide di atas yang butuh teknologi canggih. Semuanya masuk kolom hijau sesi 1. Yang bikin sebuah ide bagus bukan kecanggihannya, tapi seberapa nyata sakit yang dia obati.",
      },
      {
        id: "vc3-1b",
        type: "concept",
        title: "Cara Milih Satu dari Dua Puluh",
        subtitle: "Dua pertanyaan saja: seberapa sering masalahnya muncul, dan seberapa dekat kamu dengannya",
        content:
          "Sudah nandain beberapa ide? Bagus. Sekarang masalah barumu: milih SATU. Iya, satu. Orang yang mulai dengan tiga ide biasanya selesai dengan nol. Cara milihnya tidak pakai perasaan, pakai dua pertanyaan: seberapa sering masalah ini muncul, dan apakah kamu mengalaminya sendiri. Petakan idemu ke empat kotak ini.",
        matrix: {
          xLabel: "Makin sering masalahnya muncul →",
          yLabel: "↑ Makin kamu alami sendiri",
          quadrants: [
            {
              title: "Sering muncul + kamu alami sendiri",
              verdict: "Bangun sekarang",
              accent: "green",
              items: [
                "Ini zona emas. Kamu paham masalahnya luar-dalam dan jadi penguji pertamanya",
                "Contoh: kamu bendahara yang tiap bulan pusing nagih kas? Aplikasi iuran kas itu milikmu",
              ],
            },
            {
              title: "Sering muncul + masalah orang lain",
              verdict: "Boleh, tapi wawancara dulu",
              accent: "blue",
              items: [
                "Ide bagus, tapi kamu menebak-nebak sakitnya. Ngobrol dulu dengan 3 orang yang mengalaminya",
                "Kalau setelah ngobrol kamu makin yakin: gas. Kalau ternyata mereka santai saja: mundur",
              ],
            },
            {
              title: "Jarang muncul + kamu alami sendiri",
              verdict: "Simpan di daftar tunggu",
              accent: "purple",
              items: [
                "Masalah setahun sekali tidak layak jadi proyek pertama, effort-nya tidak sebanding",
                "Catat di daftar 'nanti'. Setelah aplikasi pertamamu jadi, kamu bisa balik ke sini dengan skill penuh",
              ],
            },
            {
              title: "Jarang muncul + bukan masalahmu",
              verdict: "Lewati dengan tenang",
              accent: "red",
              items: [
                "Biasanya ini ide yang \"kedengarannya keren\" tapi tidak ada yang benar-benar kesakitan",
                "Melewatkan ide seperti ini bukan kehilangan. Itu penghematan berminggu-minggu hidupmu",
              ],
            },
          ],
        },
        quote:
          "Ide terbaik untuk proyek pertamamu bukan yang paling besar. Yang terbaik adalah yang masalahnya kamu temui lagi minggu depan, dan minggu depannya lagi.",
        note: "Sudah dapat satu? Kunci. Ide-ide lain tidak dibuang, mereka cuma antre. Sekarang ide terpilihmu siap masuk mesin berikutnya: Blueprint Lima Pertanyaan.",
      },
      {
        id: "vc3-2",
        type: "concept",
        title: "Blueprint Lima Pertanyaan",
        subtitle: "Sebelum ngomong ke AI, jawab dulu lima hal ini. Sepuluh menit yang menghemat berjam-jam",
        flow: [
          { label: "Siapa", desc: "Siapa persisnya yang akan memakai ini? Bukan 'semua orang'. Sebut spesifik: anggota kajian saya, pelanggan warung saya" },
          { label: "Sakit apa", desc: "Masalah apa yang diselesaikan? Tulis dalam satu kalimat yang orang awam paham" },
          { label: "Tiga fitur", desc: "Fitur inti maksimal tiga. Sisanya masuk daftar 'nanti'. Ini bagian yang paling menyakitkan dan paling penting" },
          { label: "Halaman apa", desc: "Halaman apa saja yang ada? Beranda, daftar, detail, admin. Coret-coret di kertas dulu boleh banget" },
          { label: "Rasanya gimana", desc: "Tampilannya seperti apa? Sebut referensi: 'bersih seperti aplikasi bank' atau 'hangat seperti website pesantren'" },
        ],
        note: "Jawaban lima pertanyaan ini nanti hampir mentah-mentah jadi prompt pertamamu ke AI. Jadi tulis yang serius.",
      },
      {
        id: "vc3-3",
        type: "concept",
        title: "Seni Memotong Fitur",
        subtitle: "MVP: versi paling kecil yang sudah berguna",
        content:
          "Ini percakapan yang akan terjadi di kepalamu: 'Aplikasinya harus bisa login, ada notifikasi, ada chat, ada laporan bulanan, bisa export PDF...' Berhenti. Setiap fitur tambahan itu waktu tambahan, error tambahan, dan alasan tambahan untuk tidak pernah selesai. Tanyakan pada tiap fitur: kalau fitur ini tidak ada, apakah aplikasinya masih menyelesaikan masalah intinya? Kalau masih, coret. Masukkan daftar 'versi dua'.",
        table: {
          headers: ["Ide awal yang gemuk", "MVP yang jalan minggu ini"],
          rows: [
            ["Aplikasi kajian lengkap: absensi, materi, kuis, forum, sertifikat", "Satu halaman absensi yang bisa diisi dari HP dan direkap otomatis"],
            ["Marketplace jasa masisir dengan pembayaran dan rating", "Katalog jasa dengan tombol 'hubungi via WhatsApp'"],
            ["Sistem manajemen organisasi dengan 8 role berbeda", "Satu papan pengumuman yang admin bisa update, anggota bisa baca"],
          ],
        },
        quote:
          "Versi satu yang jelek tapi dipakai orang, jauh lebih berharga dari versi sempurna yang tidak pernah selesai.",
      },
      {
        id: "vc3-4",
        type: "practice",
        title: "Praktik: Tulis Blueprintmu",
        subtitle: "Sekarang giliranmu. Pakai AI sebagai partner diskusi, bukan sebagai tukang dulu",
        content:
          "Buka Claude atau ChatGPT. Jangan minta dibikinin aplikasi dulu. Ajak dia mikir bareng soal blueprintmu. Ini bedanya orang yang hasilnya bagus: mereka berdiskusi dulu sebelum menyuruh.",
        prompts: [
          {
            label: "Menggali masalah jadi ide",
            prompt:
              "Saya mahasiswa di Kairo, aktif di [organisasi/komunitas kamu]. Masalah yang sering saya alami: [ceritakan keluhanmu senatural mungkin, seperti curhat]. Bantu saya: (1) rumuskan masalah intinya dalam satu kalimat, (2) usulkan 3 ide aplikasi sederhana yang bisa menyelesaikannya, dari yang paling simpel, (3) untuk tiap ide, sebutkan siapa penggunanya dan apa 3 fitur intinya saja.",
          },
          {
            label: "Menguji dan merampingkan blueprint",
            prompt:
              "Ini blueprint aplikasi saya: [tempel jawaban 5 pertanyaan: siapa, masalah apa, 3 fitur, halaman apa, tampilan seperti apa]. Peranmu: product manager yang kejam tapi baik hati. Tantang blueprint ini: fitur mana yang sebenarnya belum perlu? Bagian mana yang masih kabur dan akan membingungkan AI pembangun nanti? Lalu tulis ulang versi final yang lebih tajam.",
          },
        ],
        note: "Simpan blueprint finalmu. Sesi depan, dia berubah jadi aplikasi.",
      },
      {
        id: "vc3-5",
        type: "concept",
        title: "Cek Pemahaman",
        subtitle: "Dua soal cepat sebelum lanjut",
        quiz: [
          {
            question: "Temanmu bilang: 'Aku mau bikin aplikasi kayak Gojek tapi buat masisir.' Respon terbaik ala kelas ini?",
            options: [
              "Langsung gas, prompt ke Replit: 'buatkan aplikasi seperti Gojek'",
              "Tanya balik: masalah spesifik apa yang paling sering kamu alami sendiri? Mulai dari satu masalah, satu fitur inti",
              "Bilang tidak mungkin, itu terlalu besar untuk vibe coding",
              "Suruh dia belajar ngoding dulu 6 bulan",
            ],
            answerIndex: 1,
            why: "Ide besar tidak salah, tapi eksekusi selalu mulai dari satu masalah spesifik yang dialami sendiri. 'Seperti Gojek' itu bukan blueprint, itu kabut. AI yang diberi kabut akan menghasilkan kabut.",
          },
          {
            question: "Dari daftar fitur ini untuk aplikasi absensi kajian, mana yang masuk MVP?",
            options: [
              "Notifikasi otomatis ke yang tidak hadir",
              "Form absen yang bisa diisi dari HP dan halaman rekap untuk admin",
              "Grafik statistik kehadiran per bulan dengan export PDF",
              "Sistem poin dan leaderboard kehadiran",
            ],
            answerIndex: 1,
            why: "Tanpa form absen dan rekap, aplikasi ini tidak menyelesaikan apa-apa. Tiga lainnya bagus, tapi aplikasinya tetap berguna tanpa mereka. Itu definisi 'versi dua'.",
          },
        ],
        isCompletion: true,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // SESI 4 — Ngobrol Sampai Jadi
  // ═══════════════════════════════════════════════════════════════
  {
    sesiNumber: 4,
    title: "Ngobrol Sampai Jadi",
    subtitle: "Inilah jantung vibe coding: percakapan berputar antara kamu, AI, dan hasil di layar",
    steps: [
      {
        id: "vc4-1",
        type: "concept",
        title: "Prompt Pertama Menentukan Segalanya",
        subtitle: "Ini fondasi rumahmu. Jangan asal",
        content:
          "Prompt pertama ke Replit Agent itu seperti briefing pertama ke tukang. Kalau briefingnya 'bikinin rumah ya', jangan kaget kalau hasilnya bukan rumah yang kamu bayangkan. Kabar baiknya: kamu sudah punya blueprintnya dari sesi kemarin. Sekarang tinggal menyusunnya jadi briefing yang rapi. Strukturnya persis lima pertanyaan itu.",
        prompts: [
          {
            label: "Kerangka prompt pertama (isi dengan blueprintmu)",
            prompt:
              "Buatkan aplikasi web [nama aplikasi].\n\nPENGGUNA: [siapa persisnya, contoh: pengurus dan anggota kajian mingguan, sekitar 40 orang]\n\nMASALAH YANG DISELESAIKAN: [satu kalimat, contoh: absensi masih dicatat manual di kertas dan sering hilang]\n\nFITUR INTI (hanya ini dulu):\n1. [fitur pertama, contoh: anggota mengisi absen lewat form sederhana dari HP]\n2. [fitur kedua, contoh: admin melihat rekap kehadiran per pertemuan]\n3. [fitur ketiga, contoh: admin bisa menambah jadwal pertemuan baru]\n\nHALAMAN: [contoh: halaman absen untuk anggota, halaman rekap untuk admin dengan login sederhana]\n\nTAMPILAN: [contoh: bersih dan modern, dominan hijau tua, nyaman dibuka dari HP karena mayoritas pengguna pakai HP]\n\nJANGAN tambahkan fitur di luar daftar ini dulu.",
          },
        ],
        note: "Baris terakhir itu penting. AI itu tukang yang semangat, kadang terlalu semangat. Tanpa pagar, dia akan menambahkan fitur yang tidak kamu minta.",
      },
      {
        id: "vc4-2",
        type: "concept",
        title: "Loop Suci Vibe Coding",
        subtitle: "Setelah prompt pertama, sisanya adalah putaran ini, berulang-ulang",
        flow: [
          { label: "Lihat", desc: "AI selesai membangun. Buka hasilnya, jangan cuma baca laporannya" },
          { label: "Tes", desc: "Klik semua tombol. Isi semua form. Coba dari HP. Pura-pura jadi pengguna paling ceroboh" },
          { label: "Catat", desc: "Tulis apa yang salah atau kurang. Spesifik: di halaman mana, saat melakukan apa, harusnya bagaimana" },
          { label: "Minta", desc: "Sampaikan SATU perbaikan per prompt. Jelas dan spesifik" },
          { label: "Ulang", desc: "Balik ke langkah satu. Putaran ini adalah pekerjaannya. Sepuluh sampai tiga puluh putaran itu normal" },
        ],
        quote:
          "Aplikasi bagus tidak lahir dari satu prompt jenius. Dia lahir dari tiga puluh putaran perbaikan kecil yang sabar.",
        bullets: [
          "Satu perubahan per prompt. Minta lima perbaikan sekaligus, biasanya dua dikerjakan, tiga terlupa, dan satu yang dikerjakan malah merusak yang lain",
          "Tes setiap putaran. Error yang ditemukan cepat itu murah, error yang ditemukan setelah sepuluh putaran itu mahal",
          "Jangan pindah fitur sebelum fitur sekarang benar-benar jalan",
        ],
      },
      {
        id: "vc4-3",
        type: "concept",
        title: "Bahasa Feedback yang AI Paham",
        subtitle: "Bedanya keluhan dan instruksi",
        table: {
          headers: ["Feedback yang bikin AI bingung", "Feedback yang bikin AI kerja"],
          rows: [
            ["\"Kok jelek ya\"", "\"Di halaman beranda, jarak antar kartu terlalu rapat. Beri jarak lebih lega dan besarkan judulnya\""],
            ["\"Error nih, benerin dong\"", "\"Saat saya klik tombol Simpan di form absen, muncul error ini: [tempel pesan errornya]. Sebelumnya saya mengisi nama lalu memilih tanggal\""],
            ["\"Tambahin fitur admin\"", "\"Tambahkan halaman /admin dengan login sederhana. Isinya: tabel rekap absensi dengan kolom nama, tanggal, status hadir\""],
            ["\"Kayaknya kurang bagus di HP\"", "\"Di layar HP, tabel rekap terpotong ke kanan. Ubah jadi kartu bertumpuk ke bawah kalau layarnya kecil\""],
          ],
        },
        note: "Polanya selalu: DI MANA lokasinya, APA yang terjadi, BAGAIMANA seharusnya. Tiga bahan itu saja.",
      },
      {
        id: "vc4-4",
        type: "concept",
        title: "Saat Semuanya Rusak",
        subtitle: "Pasti terjadi. Ini bukan kegagalan, ini bagian dari prosesnya",
        content:
          "Suatu saat AI akan mengubah sesuatu dan tiba-tiba yang tadinya jalan jadi rusak. Tenang. Ini dialami semua orang, termasuk programmer profesional. Yang membedakan orang yang selesai dan yang menyerah bukan kepintarannya, tapi cara meresponnya.",
        cards: [
          {
            title: "Lakukan ini",
            accent: "green",
            items: [
              "Tempel pesan error lengkap ke AI, jangan diringkas versi kamu",
              "Ceritakan langkah persisnya sampai error muncul: 'saya klik X, lalu isi Y, lalu muncul ini'",
              "Kalau AI muter-muter 3 kali tanpa hasil, bilang: 'pendekatan ini gagal terus, coba cara yang berbeda sama sekali'",
              "Pakai fitur rollback atau checkpoint untuk kembali ke versi yang masih jalan",
            ],
          },
          {
            title: "Jangan lakukan ini",
            accent: "red",
            items: [
              "Marah-marah ke AI dengan prompt 'KENAPA GA BISA-BISA SIH'. Dia bukan tidak paham perasaanmu, tapi itu tidak memberi informasi apapun",
              "Minta perbaikan yang sama dengan kalimat yang sama berulang-ulang",
              "Menumpuk perbaikan baru di atas fondasi yang sudah rusak",
              "Malu bertanya di komunitas. Semua builder pernah stuck",
            ],
          },
        ],
        quote:
          "Kadang jalan tercepat adalah mundur dua langkah ke versi yang jalan, bukan maju terus di jalan yang buntu.",
      },
      {
        id: "vc4-4a",
        type: "concept",
        title: "Studi Kasus: Satu Benang Utuh",
        subtitle: "Bagian 1 dari 3: dari keluhan di grup WhatsApp jadi blueprint",
        content:
          "Sejauh ini kamu melihat contoh dalam potongan-potongan: sepenggal blueprint di sini, sepotong prompt di sana. Sekarang kita bedah SATU cerita dari ujung ke ujung, tanpa diedit biar kelihatan keren. Kenalkan Fikri, pengurus kajian mingguan beranggota sekitar 40 orang. Keluhannya, persis seperti yang dia ketik di grup pengurus: \"absensi kertas ilang lagi... yang megang lupa bawa. rekap bulan kemaren juga belum, males banget 2 jam sendiri.\" Perhatikan: itu bukan ide aplikasi. Itu keluhan mentah. Dan dari situlah semuanya dimulai. Fikri duduk sepuluh menit dan mengisi Blueprint Lima Pertanyaan dari sesi 3.",
        table: {
          headers: ["Pertanyaan blueprint", "Jawaban Fikri"],
          rows: [
            ["Siapa penggunanya?", "Pengurus (3 orang) dan anggota kajian mingguan (±40 orang). Semuanya pakai HP, jarang buka laptop"],
            ["Sakitnya apa?", "Absensi dicatat di kertas yang sering hilang atau ketinggalan, dan rekap bulanan manual makan 2 jam"],
            ["Tiga fitur inti?", "(1) Anggota absen lewat form dari HP. (2) Admin lihat rekap kehadiran per pertemuan. (3) Admin bisa tambah jadwal pertemuan baru"],
            ["Halamannya apa saja?", "Halaman absen untuk anggota. Halaman admin berisi rekap dan kelola jadwal, dikunci login sederhana"],
            ["Rasanya gimana?", "Bersih, dominan hijau tua, tulisan agak besar karena banyak yang buka sambil jalan kaki ke kajian"],
          ],
        },
        note: "Perhatikan juga yang TIDAK ada di blueprint: notifikasi otomatis, grafik statistik, leaderboard, export PDF. Semua ide bagus itu Fikri catat di daftar \"versi dua\". Bukan dibuang, cuma disuruh antre. Itu keputusan arsitek.",
      },
      {
        id: "vc4-4b",
        type: "concept",
        title: "Studi Kasus, Bagian 2: Prompt Pertama, Utuh",
        subtitle: "Blueprint di atas dipindah ke kerangka prompt. Ini yang Fikri tempel ke Replit Agent, apa adanya",
        content:
          "Tidak ada trik rahasia di sini. Fikri cuma mengambil kerangka prompt pertama dari step sebelumnya, lalu mengisinya dengan jawaban blueprintnya. Hasilnya seperti ini, dan kamu boleh curi strukturnya bulat-bulat.",
        prompts: [
          {
            label: "Prompt pertama Fikri, tanpa dipotong",
            prompt:
              "Buatkan aplikasi web bernama Absensi Kajian An-Nur.\n\nPENGGUNA: pengurus (3 orang) dan anggota kajian mingguan (sekitar 40 orang). Hampir semua mengakses dari HP.\n\nMASALAH YANG DISELESAIKAN: absensi selama ini dicatat di kertas yang sering hilang, dan rekap kehadiran bulanan dikerjakan manual sampai 2 jam.\n\nFITUR INTI (hanya ini dulu):\n1. Anggota mengisi absen lewat form sederhana dari HP: pilih nama dari daftar, pilih pertemuan, tekan hadir.\n2. Admin melihat rekap kehadiran per pertemuan: siapa hadir, siapa tidak, dan total kehadiran tiap anggota.\n3. Admin bisa menambah jadwal pertemuan baru (judul, tanggal, tempat).\n\nHALAMAN: halaman absen untuk anggota (tanpa login), dan halaman admin (rekap + kelola jadwal) yang dilindungi login sederhana.\n\nTAMPILAN: bersih dan modern, dominan hijau tua, ukuran tulisan nyaman dibaca dari HP.\n\nJANGAN tambahkan fitur di luar daftar ini dulu.",
          },
        ],
        quote:
          "Bandingkan prompt itu dengan keluhan aslinya di grup. Isinya sama. Yang berubah cuma satu hal: kejelasannya.",
        note: "Dua belas menit kemudian Agent selesai. Yang Fikri lakukan pertama BUKAN membaca laporan AI yang penuh percaya diri itu, tapi membuka aplikasinya dan mengklik semuanya sebagai pengguna paling ceroboh sedunia. Dan benar saja: dia menemukan tiga masalah. Lanjut ke bagian 3.",
      },
      {
        id: "vc4-4c",
        type: "concept",
        title: "Studi Kasus, Bagian 3: Tiga Putaran, Lalu Jadi",
        subtitle: "Beginilah rasanya percakapan Loop Suci di dunia nyata",
        content:
          "Hasil pertama Agent: sekitar 80 persen benar. Tapi tiga hal mengganggu: pertama, form absen menampilkan SEMUA pertemuan termasuk yang sudah lewat, membingungkan. Kedua, di HP tabel rekap terpotong ke kanan. Ketiga, dan ini serius: halaman admin ternyata bisa dibuka siapa saja yang tahu alamatnya. Perhatikan cara Fikri menyampaikan tiap masalah: selalu DI MANA, APA yang terjadi, BAGAIMANA seharusnya. Satu perbaikan per putaran.",
        prompts: [
          {
            label: "Putaran 1: masalah kejelasan",
            prompt:
              "Di halaman absen anggota, semua pertemuan ditampilkan termasuk yang sudah lewat, jadi membingungkan. Ubah: tampilkan hanya pertemuan hari ini dan yang akan datang, urutkan dari yang paling dekat. Pertemuan yang sudah lewat pindahkan ke bagian \"Riwayat\" di bawahnya.",
          },
          {
            label: "Putaran 2: masalah tampilan HP",
            prompt:
              "Di layar HP, tabel rekap di halaman admin terpotong ke kanan dan harus digeser-geser. Ubah jadi kartu bertumpuk ke bawah saat layar kecil: satu kartu per anggota, isinya nama, jumlah hadir, dan status di pertemuan terakhir.",
          },
          {
            label: "Putaran 3: masalah keamanan",
            prompt:
              "Saya bisa membuka halaman /admin langsung dari browser tanpa login sama sekali. Ini bahaya. Pastikan seluruh halaman admin dan data di dalamnya hanya bisa diakses setelah login, termasuk kalau alamatnya diketik langsung. Setelah selesai, jelaskan dengan bahasa awam bagian mana yang kamu ubah.",
          },
        ],
        quote:
          "Tidak ada satu pun langkah tadi yang butuh kepintaran khusus. Yang dibutuhkan cuma kejelasan, dan kesabaran menjalani putaran.",
        note: "Catatan jujur: aslinya Fikri melewati 14 putaran, tiga di atas cuma contoh rasa percakapannya. Total dari keluhan sampai dipakai: dua sore. Minggu berikutnya 34 dari 40 anggota absen lewat HP, dan rekap bulanan berubah dari 2 jam jadi satu kali buka halaman. Kalau reaksimu sekarang \"ooh, gitu doang?\", jawabannya: iya. Gitu doang. Dan sekarang giliranmu.",
      },
      {
        id: "vc4-5",
        type: "practice",
        title: "Praktik: Bangun Versi Pertamamu",
        subtitle: "Ini momen yang ditunggu. Blueprint di tangan kiri, Replit di tangan kanan",
        content:
          "Buka Replit, mulai proyek baru dengan Agent. Tempel prompt pertamamu dari kerangka di atas, yang sudah diisi blueprintmu. Lalu jalani loop-nya: lihat, tes, catat, minta, ulang. Target hari ini bukan aplikasi sempurna. Target hari ini: satu fitur inti yang benar-benar jalan dari awal sampai akhir.",
        prompts: [
          {
            label: "Kalau hasil pertama terlalu beda dari bayanganmu",
            prompt:
              "Hasilnya belum sesuai bayangan saya. Yang paling penting untuk diubah: [satu hal paling mengganggu]. Referensi nuansa yang saya mau: [contoh: seperti aplikasi Notion, bersih dan tenang]. Ubah dulu itu saja, yang lain jangan disentuh.",
          },
          {
            label: "Kalau mau memastikan aman sebelum lanjut",
            prompt:
              "Sebelum saya lanjut menambah fitur, tolong periksa aplikasi ini: apakah ada data yang bisa diakses orang yang seharusnya tidak boleh? Apakah ada kunci API atau password yang terlihat di sisi pengguna? Jelaskan temuanmu dengan bahasa awam, lalu perbaiki.",
          },
        ],
        note: "Prompt kedua itu kebiasaan builder yang baik. Murah dilakukan sekarang, mahal kalau kebobolan nanti.",
        isCompletion: true,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // SESI 5 — Rilis, Rusak, Perbaiki
  // ═══════════════════════════════════════════════════════════════
  {
    sesiNumber: 5,
    title: "Rilis, Rusak, Perbaiki",
    subtitle: "Aplikasi yang tidak dirilis itu cuma hobi. Yang dirilis, sekecil apapun, itu karya",
    steps: [
      {
        id: "vc5-1",
        type: "concept",
        title: "Rilis Itu Keputusan, Bukan Kesiapan",
        subtitle: "Kalau menunggu siap, kamu tidak akan pernah rilis",
        content:
          "Aplikasimu tidak akan pernah terasa siap. Selalu ada satu fitur lagi, satu warna yang kurang pas, satu tombol yang bisa lebih bagus. Programmer profesional pun begitu. Maka patokannya bukan perasaan, tapi checklist: fitur inti jalan? Sudah dites dari HP? Tidak ada data sensitif yang bocor? Kalau tiga itu beres, rilis. Di Replit tinggal klik deploy, aplikasimu langsung punya alamat yang bisa dibuka siapa saja di dunia.",
        bullets: [
          "Rilis ke lingkaran kecil dulu: lima orang yang kamu percaya, bukan langsung broadcast ke semua grup",
          "Minta mereka pakai sambil kamu perhatikan. Jangan dijelaskan dulu. Kalau mereka bingung, itu data berharga",
          "Aplikasi pertamamu boleh sederhana. Yang penting dia hidup dan dipakai",
        ],
        quote:
          "Lima orang yang benar-benar memakai aplikasimu mengajarkan lebih banyak daripada lima puluh jam menebak-nebak sendirian.",
      },
      {
        id: "vc5-2",
        type: "concept",
        title: "Tiga Aturan Keamanan yang Tidak Boleh Ditawar",
        subtitle: "Bagian paling tidak seru dari kelas ini, dan paling menyelamatkan",
        cards: [
          {
            title: "Aturan 1: Kunci jangan di etalase",
            accent: "purple",
            items: [
              "Kunci API dan password database harus disimpan sebagai secret atau environment variable",
              "Kalau kuncinya kelihatan di kode sisi pengguna, siapapun bisa memakainya atas namamu",
              "Tanya AI: 'apakah ada kunci atau kredensial yang terekspos di sisi pengguna aplikasi ini?'",
            ],
          },
          {
            title: "Aturan 2: Jangan percaya pengguna",
            accent: "purple",
            items: [
              "Setiap form yang bisa diisi orang, akan diisi orang dengan hal yang aneh-aneh. Kadang sengaja",
              "Data penting harus divalidasi dan dilindungi di sisi server, bukan hanya di tampilan",
              "Halaman admin harus benar-benar terkunci, bukan sekadar disembunyikan dari menu",
            ],
          },
          {
            title: "Aturan 3: Data orang itu amanah",
            accent: "purple",
            items: [
              "Kumpulkan data seperlunya. Tidak butuh tanggal lahir? Jangan minta",
              "Nama, nomor WhatsApp, alamat itu titipan. Perlakukan seperti kamu memegang barang titipan",
              "Ini bukan cuma soal teknis. Ini soal integritas kamu sebagai pembuatnya",
            ],
          },
        ],
        note: "Kamu tidak perlu jadi ahli keamanan. Kamu cuma perlu rutin menanyakan tiga hal ini ke AI setiap sebelum rilis dan setiap selesai menambah fitur besar.",
      },
      {
        id: "vc5-3",
        type: "concept",
        title: "Hidup Setelah Rilis",
        subtitle: "Aplikasi itu makhluk hidup. Dia butuh dirawat, dan itu justru serunya",
        flow: [
          { label: "Dengar", desc: "Kumpulkan keluhan dan permintaan pengguna. Catat semua, jangan langsung kerjakan semua" },
          { label: "Pilah", desc: "Mana yang diminta banyak orang dan sejalan dengan masalah inti? Itu prioritas. Sisanya antre" },
          { label: "Bangun", desc: "Balik ke loop sesi 4: satu perubahan, tes, ulang" },
          { label: "Kabari", desc: "Beri tahu penggunamu ada yang baru. Mereka senang didengar, kamu dapat penguji gratis" },
        ],
        content:
          "Dan suatu saat kamu akan sampai di persimpangan yang menyenangkan: aplikasimu makin dipakai, kebutuhannya makin dalam, dan kamu mulai penasaran dengan apa yang sebenarnya terjadi di balik layar. Saat rasa penasaran itu datang, sambut. Belajar membaca kode setelah punya aplikasi sendiri itu seperti belajar nahwu setelah hafal banyak teks: semuanya langsung ada konteksnya.",
        note: "Vibe coding bukan tujuan akhir. Dia pintu masuk. Sebagian dari kamu akan berhenti di 'bisa bikin alat untuk masalah sendiri', dan itu sudah luar biasa. Sebagian lagi akan ketagihan dan jadi builder sungguhan. Dua-duanya menang.",
      },
      {
        id: "vc5-3a",
        type: "concept",
        title: "Panggung Tiga Menit: Formula Demo Day",
        subtitle: "Karya bagus yang diceritakan buruk akan kalah dari karya biasa yang diceritakan jelas",
        content:
          "Sebentar lagi kamu berdiri di Demo Day, dan tiga menit itu terasa seperti tiga detik kalau tidak disiapkan, atau tiga jam kalau kamu grogi tanpa pegangan. Kabar baiknya: cerita tiga menit yang bagus itu bukan bakat, itu formula. Empat babak, urutannya jangan ditukar.",
        flow: [
          { label: "Masalah (30 dtk)", desc: "Mulai dari sakitnya, bukan aplikasinya. \"Tiap bulan saya rekap absensi 2 jam, dan kertasnya sering hilang.\" Penonton harus mengangguk dulu sebelum melihat layar" },
          { label: "Demo (90 dtk)", desc: "Tunjukkan SATU alur dari awal sampai tuntas: anggota absen, rekap langsung muncul. Bukan tur keliling semua menu" },
          { label: "Dampak (30 dtk)", desc: "Angka kecil pun bertenaga: \"34 dari 40 anggota pakai di minggu pertama, rekap dari 2 jam jadi 1 klik\"" },
          { label: "Rencana (30 dtk)", desc: "Satu-dua langkah berikutnya. Ini bukti karyamu hidup, bukan tugas yang selesai lalu ditinggal" },
        ],
        quote:
          "Orang tidak mengingat daftar fitur. Orang mengingat masalah yang mereka kenal, dan momen masalah itu selesai di depan mata mereka.",
        note: "Tulis skripnya, lalu latihan dua kali dengan timer sungguhan. Bukan di kepala, tapi diucapkan. Kamu akan kaget betapa berbedanya \"sudah kebayang\" dengan \"sudah pernah diucapkan\".",
      },
      {
        id: "vc5-3b",
        type: "concept",
        title: "Dosa-Dosa Demo dan Cara Selamatnya",
        subtitle: "Semua kesalahan ini pernah terjadi di depan penonton sungguhan. Kamu tinggal tidak mengulanginya",
        cards: [
          {
            title: "Dosa klasik di panggung",
            accent: "red",
            items: [
              "Kebanyakan cerita fitur, kurang cerita masalah. \"Aplikasi saya ada login, ada dashboard, ada...\" dan penonton mulai buka HP masing-masing",
              "Demo fitur yang baru diubah semalam. Hukum alamnya begini: fitur yang disentuh H-1 akan rusak tepat saat semua orang menonton",
              "Demo dengan aplikasi kosong tanpa data. Aplikasi tanpa isi itu seperti warung tanpa dagangan: terlihat mati",
              "Membuka dengan minta maaf: \"maaf ini masih jelek...\" Selamat, kamu baru saja menyuruh penonton fokus mencari jeleknya",
            ],
          },
          {
            title: "Disiapkan sejak H-1",
            accent: "green",
            items: [
              "Isi aplikasi dengan data dummy yang hidup: nama teman-temanmu, jadwal sungguhan. Demo langsung terasa nyata",
              "Bekukan aplikasimu 24 jam sebelum tampil. Tidak ada perubahan sekecil apapun. Gatal ingin ubah? Catat untuk lusa",
              "Siapkan rencana B: rekam video alur demomu dari HP. Kalau internet venue ngambek, kamu tinggal putar video sambil tetap bercerita",
              "Kalau tetap error di panggung: senyum, bilang \"nah, ini serunya bikin software\", lalu lanjut pakai rencana B. Penonton justru respek",
            ],
          },
        ],
        quote:
          "Deg-degan itu bukan musuh, itu tanda kamu peduli. Yang menghancurkan demo bukan deg-degan, tapi tidak latihan.",
        note: "Satu lagi: datang lebih awal dan tes aplikasimu di internet venue, dari HP-mu sendiri. Lima menit pengecekan itu membedakan demo yang lancar dengan demo yang dibuka kalimat \"kok tadi di rumah bisa ya\".",
      },
      {
        id: "vc5-4",
        type: "concept",
        title: "Kuis Penutup",
        subtitle: "Bukan ujian. Ini cermin: seberapa dalam lima sesi ini nempel",
        quiz: [
          {
            question: "Inti vibe coding dalam satu kalimat, versi kelas ini?",
            options: [
              "AI menggantikan programmer sepenuhnya",
              "Kamu arsiteknya, AI tukangnya: kamu pegang keputusan, dia pegang kode",
              "Cara cepat kaya dari bikin aplikasi",
              "Trik prompt rahasia supaya AI nurut",
            ],
            answerIndex: 1,
            why: "Semua materi kelas ini turunan dari satu kalimat itu. Blueprint, loop feedback, sampai keamanan: semuanya pekerjaan arsitek yang tahu persis apa yang dia mau.",
          },
          {
            question: "Kamu minta 5 perbaikan sekaligus, AI mengerjakan sebagian dan malah merusak fitur lain. Pelajaran yang benar?",
            options: [
              "Ganti ke AI yang lebih pintar",
              "Vibe coding memang tidak bisa diandalkan",
              "Satu perubahan per prompt, tes tiap putaran, dan jangan ragu rollback ke versi yang jalan",
              "Seharusnya menulis promptnya dengan huruf kapital biar tegas",
            ],
            answerIndex: 2,
            why: "Ini persis Loop Suci sesi 4. Perubahan kecil yang teruji lebih cepat sampai tujuan daripada lompatan besar yang rapuh.",
          },
          {
            question: "Aplikasi absensimu sudah jalan dan mau dirilis. Mana yang WAJIB dicek sebelum disebar?",
            options: [
              "Apakah logonya sudah keren",
              "Apakah ada kunci API yang terekspos dan apakah halaman admin benar-benar terkunci",
              "Apakah sudah ada dark mode",
              "Apakah nama aplikasinya sudah didaftarkan jadi merek",
            ],
            answerIndex: 1,
            why: "Logo dan dark mode itu selera, bisa menyusul. Kunci yang bocor dan admin yang terbuka itu amanah data orang, tidak bisa ditawar.",
          },
          {
            question: "Temanmu bilang: 'Aplikasiku belum sempurna, nanti dulu deh rilisnya.' Sudah 2 bulan dia bilang begitu. Nasihat ala kelas ini?",
            options: [
              "Benar, kesempurnaan itu penting",
              "Cek tiga hal: fitur inti jalan, aman, oke di HP. Kalau beres, rilis ke 5 orang terdekat hari ini juga",
              "Tambah fitur dulu biar makin lengkap baru rilis",
              "Tunggu momen yang tepat seperti awal bulan",
            ],
            answerIndex: 1,
            why: "Rilis itu keputusan, bukan kesiapan. Lima pengguna nyata mengajarkan lebih banyak dari dua bulan poles-poles sendirian.",
          },
        ],
      },
      {
        id: "vc5-5",
        type: "concept",
        title: "Bekal Pulang",
        subtitle: "Lima sesi selesai. Ini yang kamu bawa",
        content:
          "Kamu masuk kelas ini sebagai pengguna AI. Kamu keluar sebagai orang yang bisa mengubah keluhan jadi aplikasi. Itu perubahan identitas, bukan sekadar tambahan skill. Dan seperti semua identitas baru, dia menguat lewat satu hal: dipakai.",
        bullets: [
          "Kamu arsiteknya, AI tukangnya. Kejelasanmu menentukan kualitas hasilnya",
          "Masalah dulu, teknologi belakangan. Blueprint lima pertanyaan sebelum prompt pertama",
          "Loop suci: lihat, tes, catat, minta satu hal, ulang. Sabar itu strategi",
          "Rilis kecil, dengar pengguna, rawat pelan-pelan. Keamanan dan amanah data tidak ditawar",
        ],
        note: "Misi terakhirmu: dalam 7 hari ke depan, rilis satu aplikasi ke minimal 5 pengguna nyata. Sesederhana apapun. Lalu ceritakan di grup: apa yang mereka bilang. Kami tunggu karyamu di Demo Day.",
        isCompletion: true,
      },
    ],
  },
  {
    sesiNumber: 6,
    title: "Dari Karya Jadi Rezeki",
    subtitle: "Sesi paling jujur di kelas ini: tiga jalur mengubah skill barumu jadi penghasilan, tanpa janji manis",
    steps: [
      {
        id: "vc6-1",
        type: "concept",
        title: "Ngobrol Jujur Dulu",
        subtitle: "Sebelum bicara duit, kita luruskan dulu satu hal",
        bigIdea: {
          text: "Rezeki tidak datang dari skill. Rezeki datang dari masalah orang lain yang selesai karena skillmu.",
          caption: "Kalimat kunci sesi ini. Semua yang lain cuma penjabarannya",
        },
        content:
          "Ini bukan sesi cara cepat kaya, dan saya tidak akan pura-pura vibe coding otomatis menghasilkan uang. Tidak ada skill yang otomatis menghasilkan uang. Yang menghasilkan uang dari dulu selalu sama: masalah orang yang selesai. Nah, yang berubah sekarang adalah ongkosnya. Dulu, menyelesaikan masalah orang lewat website atau aplikasi butuh modal jutaan dan tim. Sekarang modalmu kejelasan berpikir dan alat yang sebagian besar gratis, seperti yang kamu buktikan sendiri lima sesi terakhir. Selisih antara ongkos lama dan ongkos barumu itulah peluangmu.",
        bullets: [
          "Skillnya sama persis dengan yang sudah kamu punya. Yang berubah cuma arah moncongnya: dari masalah sendiri ke masalah orang lain",
          "Mulai dari lingkaran terdekat: organisasimu, usaha temanmu, keluargamu di kampung. Mereka pasar pertamamu, bukan orang asing di internet",
          "Dan jangan berhenti kuliah dulu ya. Semua jalur di sesi ini dimulai sebagai sampingan, dan sehat tetap begitu sampai terbukti",
        ],
      },
      {
        id: "vc6-2",
        type: "concept",
        title: "Tiga Jalur yang Nyata",
        subtitle: "Bukan teori dari artikel. Dua jalur pertama sedang saya jalani sendiri",
        content:
          "Sebelum masuk daftar, biar adil kamu tahu posisi saya. Dreammecca, yang mungkin pernah kamu dengar, lahir dari jalur pertama: dibangun sebagai jasa untuk kebutuhan klien. Umrahme lahir dari jalur kedua: produk yang orang pakai dan berlangganan. Jadi yang kamu baca di bawah ini bukan hasil googling, ini jalan yang sedang ditapaki. Tiga jalurnya begini.",
        cards: [
          {
            title: "Jalur 1: Jasa. Bikinin untuk orang lain",
            accent: "green",
            items: [
              "Jalur tercepat menghasilkan. Duit masuk per proyek, hitungan minggu bukan hitungan tahun",
              "Modalnya cuma portofolio, dan tebak: aplikasi yang kamu buat di kelas ini adalah portofolio pertamamu",
              "Pasarnya di depan mata: organisasi butuh website acara, usaha teman butuh katalog, lembaga butuh company profile",
            ],
          },
          {
            title: "Jalur 2: Produk. Aplikasi yang orang bayar",
            accent: "blue",
            items: [
              "Plafonnya paling tinggi: satu aplikasi dipakai banyak orang yang bayar tipis-tipis, misalnya langganan bulanan",
              "Tapi paling butuh sabar. Bulan-bulan awal yang sepi itu normal, bukan tanda gagal",
              "Kuncinya: bangun untuk komunitas yang masalahnya kamu pahami luar-dalam, bukan untuk \"semua orang\"",
            ],
          },
          {
            title: "Jalur 3: Alat internal. Naikin usahamu sendiri",
            accent: "purple",
            items: [
              "Jalur yang paling sering dilupakan. Kalau kamu atau keluargamu punya usaha, aplikasimu jadi mesin efisiensi",
              "Duitnya tidak terlihat sebagai \"bayaran\", tapi terlihat di omzet: jastip yang rekapnya otomatis bisa terima jauh lebih banyak pesanan dengan tenaga sama",
              "Bonusnya: usaha yang rapi sistemnya jadi portofolio hidup untuk jalur 1 dan 2",
            ],
          },
        ],
        table: {
          headers: ["Jalur", "Duit masuk", "Plafon", "Cocok kalau kamu..."],
          rows: [
            ["Jasa", "Cepat, per proyek", "Terbatas waktu dan tenagamu", "Butuh hasil dekat dan suka interaksi dengan orang"],
            ["Produk", "Lambat di awal, lalu menggulung", "Paling tinggi, tidak terikat jam kerjamu", "Sabar, dan punya komunitas yang kamu pahami dalam"],
            ["Alat internal", "Tidak langsung, lewat efisiensi usaha", "Setinggi usahanya tumbuh", "Kamu atau keluargamu sudah punya usaha berjalan"],
          ],
        },
        quote:
          "Untuk pemula, jalur tercepat hampir selalu jasa. Produk itu maraton. Jasa itu lari pagi: capeknya sama, tapi hasilnya kelihatan minggu ini.",
      },
      {
        id: "vc6-3",
        type: "concept",
        title: "Masang Harga Pertama Tanpa Minder",
        subtitle: "Momen paling canggung seumur hidup builder: ditanya \"berapaan?\" dan kepalamu kosong",
        content:
          "Prinsip pertama: kamu menjual HASIL, bukan jam kerja. Klien tidak peduli kamu mengerjakannya 3 jam dibantu AI atau 3 minggu begadang. Yang dia beli: masalahnya selesai, dan ada orang yang bertanggung jawab kalau nanti ada apa-apa. Prinsip kedua, dan ini penting: jangan gratis total. Yang gratis tidak dihargai, dan revisinya tidak akan ada habisnya. Kalau memang mau membantu tanpa bayaran, tukar dengan mata uang lain: testimoni tertulis dan izin memajang di portofolio, dengan lingkup kerja yang tetap ditulis jelas.",
        table: {
          headers: ["Jenis proyek", "Harga pembuka yang wajar", "Kenapa segitu"],
          rows: [
            ["Landing page acara / profil organisasi", "Rp 300–750 ribu", "Satu sampai tiga halaman, selesai dalam hitungan hari. Murah bagimu, sangat berharga bagi panitia yang kepepet"],
            ["Website usaha: katalog + tombol WhatsApp", "Rp 750 ribu – 2 juta", "Nilainya jelas dan bisa dihitung: dagangan terlihat profesional, pesanan lebih gampang masuk"],
            ["Aplikasi dengan database dan login (absensi, pre-order, booking)", "Rp 1,5–5 juta", "Ada data orang yang kamu urus. Tanggung jawab lebih besar, harga ikut lebih besar"],
          ],
        },
        bullets: [
          "DP 50% sebelum mulai kerja. Ini bukan tidak percaya, ini cara dua pihak sama-sama serius",
          "Lingkup tertulis, di chat WhatsApp pun sah: fitur apa saja, berapa kali revisi, kapan selesai. Sesi praktik nanti kita bikin bareng",
          "Naikkan harga tiap dua-tiga proyek. Kalau semua calon klien langsung bilang \"oke\" tanpa mikir, itu bukan kamu hebat nego. Itu harganya kemurahan",
        ],
        quote:
          "Harga pertamamu akan terasa terlalu mahal bagimu, dan terlalu murah bagi yang paham. Kalau dua-duanya terjadi, tandanya pas.",
        note: "Angka di tabel itu pembuka percakapan, bukan harga mati. Sesuaikan dengan kantong pasarmu. Yang tidak boleh disesuaikan: bekerja tanpa lingkup tertulis.",
      },
      {
        id: "vc6-4",
        type: "concept",
        title: "Etika Main di Jalur Ini",
        subtitle: "Biar rezekinya awet dan namamu tetap bersih. Ini bukan pemanis, ini strategi bertahan",
        cards: [
          {
            title: "Pegang ini",
            accent: "green",
            items: [
              "Jujur soal AI kalau ditanya. Tidak perlu diumumkan tiap saat, tapi jangan pernah bohong. Yang klien bayar bukan jerih ngetik kode, tapi hasil plus tanggung jawabmu mengawalnya",
              "Garansi revisi yang jelas sejak awal: misalnya dua kali revisi termasuk harga, selebihnya biaya tambahan. Ditulis, bukan diingat-ingat",
              "Data klien itu amanah, persis aturan 3 di sesi sebelumnya. Nomor pelanggan mereka bukan aset marketingmu",
              "Sanggupi yang masuk kolom hijau sesi 1. Yang di luar itu, tolak dengan jujur: \"ini di luar kemampuan saya sekarang.\" Kalimat itu terdengar lemah, padahal membangun kepercayaan paling cepat",
            ],
          },
          {
            title: "Hindari ini",
            accent: "red",
            items: [
              "Menjawab \"bisa, gampang kok\" untuk fitur yang belum kamu riset. Janji sebelum riset itu hutang, dan hutang jenis ini nagihnya di depan klien",
              "Terima pembayaran penuh lalu menghilang saat error muncul. Satu cerita begini menyebar lebih cepat dari sepuluh testimoni bagus",
              "Menjual ulang proyek klien A jadi template klien B tanpa izin. Pola boleh dipakai ulang, karya spesifik orang jangan",
              "Mengaku \"tim developer profesional\" padahal solo. \"Saya builder solo dibantu AI, ini portofolio saya\" jauh lebih kuat, karena setiap katanya bisa dibuktikan",
            ],
          },
        ],
        quote:
          "Klien bisa memaafkan aplikasi yang sempat error. Klien tidak akan memaafkan pembuat yang menghilang saat error.",
      },
      {
        id: "vc6-5",
        type: "practice",
        title: "Praktik: Lempar Tawaran Pertamamu",
        subtitle: "Portofoliomu sudah ada: aplikasi dari kelas ini. Tinggal satu hal yang belum ada: keberanian mengirim pesan",
        content:
          "Misi tujuh hari: satu tawaran nyata, ke satu calon klien nyata, dari lingkaran terdekatmu. Bukan sepuluh tawaran, satu saja tapi benar-benar dikirim. Pakai dua prompt ini untuk menyiapkan amunisinya.",
        prompts: [
          {
            label: "Menyusun pesan penawaran pertama (untuk WhatsApp)",
            prompt:
              "Saya baru bisa membangun website dan aplikasi sederhana dengan bantuan AI. Portofolio saya: [ceritakan aplikasi yang kamu buat di kelas ini, sertakan linknya]. Saya mau menawarkan jasa ke [siapa: ketua organisasi X / teman yang punya usaha Y]. Masalah yang saya lihat sedang mereka alami: [ceritakan]. Buatkan 3 versi pesan WhatsApp penawaran yang sopan, singkat, dan tidak terasa seperti spam: versi untuk teman dekat, versi untuk kenalan, dan versi untuk orang yang belum mengenal saya. Fokuskan pesannya ke masalah mereka, bukan ke kehebatan saya.",
          },
          {
            label: "Bikin kesepakatan sederhana biar dua pihak tenang",
            prompt:
              "Saya akan mengerjakan proyek [jenis proyek] untuk [nama klien] dengan harga [angka]. Buatkan rangkuman kesepakatan sederhana dalam bahasa santai tapi jelas, siap ditempel di chat WhatsApp, berisi: lingkup pekerjaan (fitur apa saja), yang TIDAK termasuk, jumlah revisi, perkiraan tanggal selesai, cara bayar (DP 50% di awal), dan apa yang terjadi kalau ada permintaan di luar lingkup. Maksimal 200 kata.",
          },
        ],
        note: "Ditolak itu skenario normal, bukan bencana. Sepuluh tawaran yang jadi satu-dua itu angka sehat, bahkan untuk yang sudah lama main. Bedanya pemain lama dengan kamu cuma satu: mereka sudah selesai kaget ditolak.",
      },
      {
        id: "vc6-6",
        type: "concept",
        title: "Penutup Sungguhan: Manfaat Dulu, Rezeki Ngikut",
        subtitle: "Enam sesi selesai. Sekarang ceritamu yang mulai",
        content:
          "Kamu masuk kelas ini dengan kalimat \"saya tidak bisa ngoding.\" Kamu keluar dengan aplikasi yang jalan, cara menceritakannya di depan orang, dan peta jalan mengubahnya jadi penghasilan. Perhatikan urutannya, karena urutan ini bukan kebetulan: karya dulu, cerita kemudian, rezeki paling belakang. Orang yang membalik urutannya, mengejar duit sebelum punya karya yang menyelesaikan masalah, biasanya tidak mendapat keduanya.",
        bullets: [
          "Karya yang menyelesaikan masalah orang selalu punya jalan jadi rezeki: jasa, produk, atau alat internal",
          "Jasa adalah pintu tercepatmu, dan aplikasi kelas ini adalah portofolio pertamamu",
          "Harga hasil bukan harga jam, lingkup tertulis, DP 50%. Tiga kebiasaan kecil yang menyelamatkan banyak persahabatan",
          "Jujur dan amanah itu bukan pelengkap materi. Itu strategi bertahan paling lama di jalur ini",
        ],
        quote:
          "Skill bisa dipelajari siapa saja dalam hitungan minggu. Reputasi cuma bisa dibangun dengan cara lama: satu janji ditepati, lalu satu lagi, lalu satu lagi.",
        note: "Misi penutup, tenggat 30 hari, pilih satu: dapatkan proyek jasa pertamamu berapapun nilainya, ATAU satu pengguna yang membayar aplikasimu, ATAU alat internal yang terbukti memangkas satu pekerjaan rutin. Lalu ceritakan di grup. Alumni yang jalan tidak pernah jalan sendirian.",
        isCompletion: true,
      },
    ],
  },
];
