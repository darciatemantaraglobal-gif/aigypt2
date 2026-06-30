export interface ShowcaseCard {
  before: string;
  after: string;
  time: string;
  extraBadge?: string;
}

export interface ShowcaseTab {
  id: string;
  label: string;
  intro: string;
  cards: ShowcaseCard[];
  isVibeCoding?: boolean;
}

export const showcaseTabs: ShowcaseTab[] = [
  {
    id: "akademisi",
    label: "Akademisi",
    intro: "Tugas akademik Al-Azhar yang menumpuk, kini punya asisten cerdas.",
    cards: [
      {
        before: "Menatap layar kosong dua jam, baru dapat satu paragraf pendahuluan makalah.",
        after: "Outline lengkap 5 bab, draft pendahuluan, dan struktur argumen yang rapi.",
        time: "~10 MENIT",
      },
      {
        before: "Terjemah satu halaman kitab klasik, bolak-balik buka kamus, masih bingung maknanya.",
        after: "Terjemahan kata per kata, makna kontekstual, plus penjelasan istilah sulit.",
        time: "~3 MENIT",
      },
      {
        before: "Membaca 20 jurnal untuk mencari referensi skripsi, berhari-hari.",
        after: "Ringkasan poin utama tiap sumber, plus celah penelitian yang belum dibahas.",
        time: "~15 MENIT",
      },
      {
        before: "Bingung apakah argumen makalah sudah cukup kuat sebelum diserahkan ke dosen.",
        after: "Umpan balik soal struktur, kelemahan logika, dan saran penguatan argumen.",
        time: "~5 MENIT",
      },
    ],
  },
  {
    id: "organisator",
    label: "Organisator",
    intro: "Amanah organisasi terasa ringan saat AI mengurus pekerjaan administratifnya.",
    cards: [
      {
        before: "Rapat dua jam, notulensi ditulis manual sambil mendengarkan, banyak yang terlewat.",
        after: "Rekaman rapat jadi notulensi rapi, lengkap dengan daftar tugas per orang.",
        time: "~5 MENIT",
      },
      {
        before: "Menyusun proposal kegiatan dari nol, makan waktu dua sampai tiga hari.",
        after: "Draft proposal lengkap: latar belakang, tujuan, rundown, anggaran.",
        time: "~20 MENIT",
      },
      {
        before: "Bingung membuat caption publikasi acara untuk Instagram, TikTok, dan WhatsApp.",
        after: "Satu paket konten publikasi untuk semua platform sekaligus.",
        time: "~10 MENIT",
      },
      {
        before: "Menyusun laporan pertanggungjawaban setelah acara, tiga sampai empat jam.",
        after: "Draft LPJ terstruktur dari data mentah kegiatan.",
        time: "~30 MENIT",
      },
    ],
  },
  {
    id: "pebisnis",
    label: "Pebisnis",
    intro: "Bangun usaha di perantauan dengan kecerdasan, bukan sekadar kerja keras.",
    cards: [
      {
        before: "Caption jualan itu-itu saja, kurang menarik, sepi pembeli.",
        after: "5 variasi caption dengan pendekatan berbeda: emosional, urgensi, cerita.",
        time: "~30 DETIK",
      },
      {
        before: "Bingung produk apa yang laku dijual ke Indonesia, menebak-nebak.",
        after: "Analisis peluang produk, target pasar, dan estimasi marginnya.",
        time: "~10 MENIT",
      },
      {
        before: "Membalas chat calon pembeli satu per satu, menyita waktu seharian.",
        after: "Template balasan untuk berbagai situasi, tetap terasa personal.",
        time: "~5 MENIT",
      },
      {
        before: "Mau mulai usaha tapi tidak tahu cara menyusun rencana bisnisnya.",
        after: "Rencana bisnis ringkas: modal, target, strategi, dan langkah pertama.",
        time: "~15 MENIT",
      },
    ],
  },
  {
    id: "kreator",
    label: "Kreator",
    intro: "Konten yang konsisten dan berkualitas, tanpa kehabisan ide.",
    cards: [
      {
        before: "Kehabisan ide konten, sudah seminggu tidak posting.",
        after: "30 ide konten terkategorisasi, lengkap hook dan poin utama.",
        time: "~1 MENIT",
      },
      {
        before: "Punya ide tapi bingung menyusun naskah video yang menarik.",
        after: "Naskah reels 60 detik: hook pembuka, isi, hingga ajakan di akhir.",
        time: "~2 MENIT",
      },
      {
        before: "Bingung merencanakan konten sebulan ke depan, posting asal-asalan.",
        after: "Kalender konten satu bulan penuh dengan tema yang tertata.",
        time: "~10 MENIT",
      },
      {
        before: "Satu konten hanya dipakai sekali, lalu bingung bikin lagi dari nol.",
        after: "Satu konten diubah jadi lima format untuk lima platform berbeda.",
        time: "~5 MENIT",
      },
    ],
  },
  {
    id: "vibe-coding",
    label: "Vibe Coding",
    intro: "Inilah puncaknya. Kamu tidak hanya memakai AI, kamu membangun dengan AI.",
    isVibeCoding: true,
    cards: [
      {
        before: "Butuh aplikasi pencatat keuangan organisasi, tapi tidak mengerti coding sama sekali.",
        after: "Aplikasi web fungsional, cukup dengan mendeskripsikan yang kamu mau.",
        time: "~15 MENIT",
        extraBadge: "TANPA SATU BARIS KODE",
      },
      {
        before: "Tugas berulang yang sama setiap minggu, dikerjakan manual terus-menerus.",
        after: "Skrip otomatis yang mengerjakannya untukmu, sekali buat dipakai selamanya.",
        time: "~20 MENIT",
      },
      {
        before: "Ide aplikasi keren cuma jadi angan-angan karena merasa 'bukan anak IT'.",
        after: "Prototipe nyata yang bisa kamu tunjukkan, bahkan kamu jual.",
        time: "~30 MENIT",
      },
      {
        before: "Pekerjaan manual menghubungkan beberapa aplikasi, melelahkan dan rawan lupa.",
        after: "Alur kerja otomatis yang berjalan sendiri tanpa kamu sentuh lagi.",
        time: "~25 MENIT",
      },
    ],
  },
];

export const showcaseGrid = [
  {
    id: "akademisi",
    label: "Akademisi",
    highlight: "Makalah, terjemah kitab, riset: semua lebih cepat.",
  },
  {
    id: "organisator",
    label: "Organisator",
    highlight: "Proposal hingga LPJ, beres dalam hitungan menit.",
  },
  {
    id: "pebisnis",
    label: "Pebisnis",
    highlight: "Caption yang menjual, riset pasar, layanan pelanggan otomatis.",
  },
  {
    id: "kreator",
    label: "Kreator",
    highlight: "Ide tak pernah habis, konten selalu mengalir.",
  },
  {
    id: "vibe-coding",
    label: "Vibe Coding",
    highlight: "Bangun aplikasimu sendiri, tanpa jadi programmer.",
  },
];
