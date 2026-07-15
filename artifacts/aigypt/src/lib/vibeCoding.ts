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
];
