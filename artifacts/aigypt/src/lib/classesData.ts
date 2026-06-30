export type Level = "Pemula" | "Semua Level" | "Menengah";
export type Status = "available" | "coming-soon" | "new";

export interface KelasItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  sesiCount: number;
  duration: string;
  level: Level;
  status: Status;
  gradient: string;          // CSS gradient string for cover
  accentColor: string;       // dominant accent color
  iconPath: string;          // inline SVG path data
  personas: string[];
  route?: string;
  whatYouLearn: string[];
}

export const kelasList: KelasItem[] = [
  {
    id: "maksimalkan-ai",
    title: "Maksimalkan AI untuk Menghasilkan Solusimu",
    tagline: "Dari bertanya, hingga mencipta.",
    description:
      "Kelas transformatif yang membawamu dari memahami AI hingga membangun solusi nyata dengan tanganmu sendiri. Dirancang khusus untuk masisir semua kalangan.",
    sesiCount: 6,
    duration: "60 menit/sesi",
    level: "Semua Level",
    status: "available",
    gradient:
      "linear-gradient(135deg, #0a0010 0%, #1a0533 40%, #2d1060 70%, #1e0756 100%)",
    accentColor: "#A855F7",
    iconPath:
      "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z",
    personas: ["Akademisi", "Organisator", "Pebisnis", "Kreator", "Pencari"],
    route: "/kurikulum",
    whatYouLearn: [
      "Memahami dan menguasai cara kerja AI",
      "Seni prompting yang menghasilkan output berkualitas",
      "Menerapkan AI untuk akademik, organisasi, bisnis, dan konten",
      "Membangun aplikasi nyata lewat vibe coding",
      "Mempresentasikan karyamu di Demo Day",
    ],
  },
  {
    id: "arabic-mastery-ai",
    title: "Bahasa Arab Akademik dengan AI",
    tagline: "Taklukkan makalah dan kitab klasik.",
    description:
      "Kelas mendalam khusus akademik: menulis makalah Arab tingkat tinggi, memahami kitab klasik, dan riset ilmiah, semua dengan bantuan AI yang memahami bahasa Arab.",
    sesiCount: 5,
    duration: "60 menit/sesi",
    level: "Menengah",
    status: "coming-soon",
    gradient:
      "linear-gradient(135deg, #00050f 0%, #001233 40%, #0a2472 70%, #001a4e 100%)",
    accentColor: "#60A5FA",
    iconPath:
      "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25",
    personas: ["Akademisi"],
    whatYouLearn: [
      "Menulis makalah Arab fusha tingkat akademik",
      "Menerjemah dan menganalisis kitab klasik",
      "Riset dan menemukan celah penelitian",
      "Mempersiapkan ujian dan munaqasyah",
    ],
  },
  {
    id: "cuan-masisir-ai",
    title: "Bangun Penghidupan dengan AI",
    tagline: "Ubah keterampilan jadi penghasilan.",
    description:
      "Kelas bisnis praktis: membangun usaha online dari Mesir, copywriting yang menjual, hingga melayani pelanggan dengan kecerdasan buatan.",
    sesiCount: 5,
    duration: "60 menit/sesi",
    level: "Pemula",
    status: "coming-soon",
    gradient:
      "linear-gradient(135deg, #0f0010 0%, #2d0033 40%, #6b0057 70%, #3d0040 100%)",
    accentColor: "#E879F9",
    iconPath:
      "M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941",
    personas: ["Pebisnis"],
    whatYouLearn: [
      "Riset produk dan pasar dengan AI",
      "Copywriting dan strategi konten penjualan",
      "Otomasi layanan pelanggan",
      "Membangun toko digital sederhana",
    ],
  },
  {
    id: "vibe-coding-mastery",
    title: "Vibe Coding: Dari Nol ke Aplikasi",
    tagline: "Bangun software tanpa jadi programmer.",
    description:
      "Kelas mendalam membangun aplikasi web, automasi, dan tools nyata hanya dengan mendeskripsikan apa yang kamu mau. Untuk yang ingin serius mencipta.",
    sesiCount: 6,
    duration: "75 menit/sesi",
    level: "Menengah",
    status: "coming-soon",
    gradient:
      "linear-gradient(135deg, #00100f 0%, #003330 40%, #006655 70%, #00443d 100%)",
    accentColor: "#34D399",
    iconPath:
      "M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5",
    personas: ["Kreator", "Pebisnis", "Pencari"],
    whatYouLearn: [
      "Workflow vibe coding dari ide ke produk",
      "Membangun web app dengan Lovable, Bolt, v0",
      "Design system dengan DESIGN.md",
      "Deploy dan iterasi produk nyata",
    ],
  },
  {
    id: "konten-dakwah-ai",
    title: "Konten & Dakwah Digital dengan AI",
    tagline: "Sebarkan kebaikan dengan kecerdasan.",
    description:
      "Kelas untuk kreator dan penggerak dakwah: memproduksi konten Islami yang berkualitas, konsisten, dan menjangkau luas dengan bantuan AI.",
    sesiCount: 4,
    duration: "60 menit/sesi",
    level: "Semua Level",
    status: "coming-soon",
    gradient:
      "linear-gradient(135deg, #0a0015 0%, #1a0040 40%, #3b0080 70%, #280060 100%)",
    accentColor: "#818CF8",
    iconPath:
      "M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46",
    personas: ["Kreator", "Organisator"],
    whatYouLearn: [
      "Ideasi konten dakwah yang relevan",
      "Produksi naskah dan visual dengan AI",
      "Strategi konsistensi dan distribusi",
      "Menjaga adab dan akurasi dalam konten",
    ],
  },
];

export const personas = ["Semua", "Akademisi", "Pebisnis", "Kreator", "Organisator", "Pencari"];
