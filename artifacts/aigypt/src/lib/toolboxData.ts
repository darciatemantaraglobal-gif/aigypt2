export interface Tool {
  name: string;
  url: string;
  category:
    | "app-builder"
    | "ai-assistant"
    | "icon"
    | "illustration"
    | "background"
    | "ui-components"
    | "design-system"
    | "database"
    | "deploy"
    | "planning";
  description: string;
  pricing: "Gratis" | "Freemium" | "Berbayar";
}

export const tools: Tool[] = [
  // APP BUILDER
  {
    name: "Lovable",
    url: "https://lovable.dev",
    category: "app-builder",
    description:
      "Ubah prompt jadi MVP full-stack yang polished dengan visual editing dan deploy otomatis. Cocok untuk app React + Supabase.",
    pricing: "Freemium",
  },
  {
    name: "Bolt",
    url: "https://bolt.new",
    category: "app-builder",
    description:
      "Generate full-stack app dengan cepat dan preview browser instan. Menekankan kecepatan iterasi.",
    pricing: "Freemium",
  },
  {
    name: "Replit",
    url: "https://replit.com",
    category: "app-builder",
    description:
      "Cloud coding di browser dengan AI Agent yang bisa bangun, test, dan deploy app end-to-end secara autonomous.",
    pricing: "Freemium",
  },
  {
    name: "v0 by Vercel",
    url: "https://v0.dev",
    category: "app-builder",
    description:
      "Generate UI components React/Next.js dengan shadcn/ui. Integrasi Vercel yang mulus dan kode yang bersih.",
    pricing: "Freemium",
  },
  {
    name: "Emergent",
    url: "https://emergent.sh",
    category: "app-builder",
    description:
      "Bangun app full-stack lengkap dari natural language. AI bernalar tentang keseluruhan produk lintas fitur.",
    pricing: "Freemium",
  },
  {
    name: "Google AI Studio",
    url: "https://aistudio.google.com",
    category: "app-builder",
    description:
      "Cara tercepat dari ide ke web app live dan shareable, sering dengan satu prompt. Sempurna untuk rapid prototyping.",
    pricing: "Gratis",
  },
  {
    name: "Softr",
    url: "https://softr.io",
    category: "app-builder",
    description:
      "AI app builder dengan database, workflow, dan permission built-in. Bagus untuk CRM, client portal, dan dashboard.",
    pricing: "Freemium",
  },

  // AI ASSISTANT
  {
    name: "Claude Code",
    url: "https://claude.com/claude-code",
    category: "ai-assistant",
    description:
      "Terminal AI agent terkuat untuk kerja level repo. Punya skills, MCP, memory, dan rules. Menampilkan rencana sebelum eksekusi.",
    pricing: "Berbayar",
  },
  {
    name: "Cursor",
    url: "https://cursor.com",
    category: "ai-assistant",
    description:
      "Fork VS Code dengan AI mendalam yang paham seluruh codebase. Pilihan utama developer profesional, dengan $2B ARR pada 2026.",
    pricing: "Freemium",
  },
  {
    name: "Windsurf",
    url: "https://windsurf.com",
    category: "ai-assistant",
    description:
      "AI-native IDE dengan fitur Cascade yang mempertahankan konteks lintas tugas multi-step yang kompleks.",
    pricing: "Freemium",
  },
  {
    name: "GitHub Copilot",
    url: "https://github.com/features/copilot",
    category: "ai-assistant",
    description:
      "AI assistant terintegrasi GitHub dan Microsoft. Banyak tier termasuk free, cocok untuk yang sudah di ekosistem GitHub.",
    pricing: "Freemium",
  },
  {
    name: "Aider",
    url: "https://aider.chat",
    category: "ai-assistant",
    description:
      "AI assistant terminal open source dan gratis, didukung Claude/Gemini/GPT. Workflow berbasis teks yang cepat.",
    pricing: "Gratis",
  },
  {
    name: "Cline",
    url: "https://github.com/cline/cline",
    category: "ai-assistant",
    description:
      "Extension VS Code open source dan gratis (hanya bayar inferensi model). Komunitas aktif dan terus berkembang.",
    pricing: "Gratis",
  },

  // ICON
  {
    name: "Lucide",
    url: "https://lucide.dev",
    category: "icon",
    description:
      "1.668 ikon, default icon library shadcn. Style outline yang bersih dan konsisten. Rekomendasi utama untuk vibe coding.",
    pricing: "Gratis",
  },
  {
    name: "Heroicons",
    url: "https://heroicons.com",
    category: "icon",
    description:
      "300+ ikon dari creator Tailwind CSS, 2 style (outline & solid), lisensi MIT. Kualitas tinggi dan sangat familiar.",
    pricing: "Gratis",
  },
  {
    name: "Phosphor Icons",
    url: "https://phosphoricons.com",
    category: "icon",
    description:
      "1000+ ikon dengan 6 weight, terbaca bagus di ukuran kecil. Support SVG, Figma, React, dan Vue.",
    pricing: "Gratis",
  },
  {
    name: "Tabler Icons",
    url: "https://tabler.io/icons",
    category: "icon",
    description:
      "Ribuan ikon outline yang sangat konsisten dan developer-friendly. Sangat cocok untuk dashboard dan tools.",
    pricing: "Gratis",
  },
  {
    name: "Iconoir",
    url: "https://iconoir.com",
    category: "icon",
    description:
      "1.400+ ikon open-source yang mendukung light/dark mode. Clean dan minimal.",
    pricing: "Gratis",
  },
  {
    name: "Material Symbols",
    url: "https://fonts.google.com/icons",
    category: "icon",
    description:
      "Variable font icon dari Google, sangat fleksibel dalam weight, size, dan style dari satu file font.",
    pricing: "Gratis",
  },
  {
    name: "Lineicons",
    url: "https://lineicons.com",
    category: "icon",
    description:
      "30.000+ ikon (2.000+ gratis), dengan integrasi native untuk Figma, React, Vue, dan Svelte.",
    pricing: "Freemium",
  },
  {
    name: "Font Awesome",
    url: "https://fontawesome.com",
    category: "icon",
    description:
      "Library ikon klasik sejak 2012, dengan ribuan ikon dalam 3 style. Dikenal luas dan didokumentasikan dengan baik.",
    pricing: "Freemium",
  },

  // ILLUSTRATION
  {
    name: "unDraw",
    url: "https://undraw.co",
    category: "illustration",
    description:
      "Ribuan ilustrasi konsisten yang bisa diubah warnanya, gratis tanpa atribusi. Paling populer untuk landing page.",
    pricing: "Gratis",
  },
  {
    name: "Storyset",
    url: "https://storyset.com",
    category: "illustration",
    description:
      "Ilustrasi customizable dengan opsi animasi yang menarik. Gratis dengan atribusi ke Storyset.",
    pricing: "Gratis",
  },
  {
    name: "Blush",
    url: "https://blush.design",
    category: "illustration",
    description:
      "Mix-and-match ilustrasi dengan sistem komponen oleh Pablo Stanley. Karakter yang bisa dikustomisasi.",
    pricing: "Freemium",
  },
  {
    name: "LottieFiles",
    url: "https://lottiefiles.com",
    category: "illustration",
    description:
      "Animasi Lottie gratis untuk web dan app, ringan, scalable, dan jauh lebih hidup dari GIF biasa.",
    pricing: "Freemium",
  },
  {
    name: "IconScout",
    url: "https://iconscout.com",
    category: "illustration",
    description:
      "Sumber terpadu untuk ikon, ilustrasi, 3D asset, dan animasi Lottie dalam satu platform.",
    pricing: "Freemium",
  },

  // BACKGROUND & GRADIENT
  {
    name: "MagicPattern",
    url: "https://magicpattern.design",
    category: "background",
    description:
      "Mesh gradient generator yang kuat, bisa export SVG/PNG/JPG tanpa signup. Hasil premium, penggunaan instan.",
    pricing: "Gratis",
  },
  {
    name: "GradientsHub",
    url: "https://gradientshub.com",
    category: "background",
    description:
      "Gradient + mesh + text gradient generator dengan 600 palette siap pakai. CSS langsung bisa di-copy.",
    pricing: "Gratis",
  },
  {
    name: "Pixelcut",
    url: "https://pixelcut.ai",
    category: "background",
    description:
      "AI gradient generator dari text prompt, watermark-free dan high-res. Describe vibe, langsung jadi.",
    pricing: "Freemium",
  },
  {
    name: "Grainient",
    url: "https://grainient.supply",
    category: "background",
    description:
      "1000+ gradient, animated gradient, grainy texture, dan background AI. Aesthetic modern yang sedang tren.",
    pricing: "Freemium",
  },
  {
    name: "Recraft",
    url: "https://recraft.ai",
    category: "background",
    description:
      "Generate gambar, logo, ikon, vektor + mockup generator + AI image editing. Swiss army knife visual AI.",
    pricing: "Freemium",
  },
  {
    name: "Mockey AI",
    url: "https://mockey.ai",
    category: "background",
    description:
      "27.000+ template mockup, 60+ kategori, download tanpa watermark. Cepat untuk presentasi produk.",
    pricing: "Freemium",
  },

  // UI COMPONENTS
  {
    name: "shadcn/ui",
    url: "https://ui.shadcn.com",
    category: "ui-components",
    description:
      "Fondasi component library de facto standard 2026. Bersih, accessible, dan didukung penuh oleh ekosistem Vercel.",
    pricing: "Gratis",
  },
  {
    name: "Aceternity UI",
    url: "https://ui.aceternity.com",
    category: "ui-components",
    description:
      "200+ komponen dengan efek visual menakjubkan untuk landing page: 3D card, glowing beam, spotlight effect.",
    pricing: "Freemium",
  },
  {
    name: "Magic UI",
    url: "https://magicui.design",
    category: "ui-components",
    description:
      "Micro-interaction dan animasi marketing yang polished: animated beam, retro grid, blur fade. Gratis.",
    pricing: "Gratis",
  },
  {
    name: "react-bits",
    url: "https://reactbits.dev",
    category: "ui-components",
    description:
      "Komponen animasi tanpa Framer Motion dependency. Text effects terbaik di kelasnya, ringan dan customizable.",
    pricing: "Gratis",
  },
  {
    name: "21st.dev",
    url: "https://21st.dev",
    category: "ui-components",
    description:
      "Marketplace block dan komponen shadcn yang besar, dikurasi untuk AI-assisted development workflow.",
    pricing: "Freemium",
  },

  // DESIGN SYSTEM
  {
    name: "DESIGN.md App",
    url: "https://designmd.app",
    category: "design-system",
    description:
      "461+ design system siap pakai untuk Claude Code, Cursor, Windsurf, dan Stitch. Browse dan download langsung.",
    pricing: "Gratis",
  },
  {
    name: "DESIGN.md AI",
    url: "https://designmd.ai",
    category: "design-system",
    description:
      "Format Google: file markdown tunggal yang dibaca AI agent untuk UI yang konsisten. Browse dan download gratis.",
    pricing: "Gratis",
  },
  {
    name: "awesome-design-md",
    url: "https://github.com/voltagent/awesome-design-md",
    category: "design-system",
    description:
      "Repo file DESIGN.md yang diekstrak dari website nyata. Bisa request website spesifik untuk dibuatkan.",
    pricing: "Gratis",
  },
  {
    name: "Banani",
    url: "https://banani.co",
    category: "design-system",
    description:
      "Buat design system di canvas yang update real-time, editable, dan bisa direferensikan lintas proyek.",
    pricing: "Freemium",
  },
  {
    name: "Google Stitch",
    url: "https://stitch.withgoogle.com",
    category: "design-system",
    description:
      "Tool desain AI Google yang menggunakan DESIGN.md untuk konsistensi UI, diperkenalkan Maret 2026.",
    pricing: "Gratis",
  },

  // DATABASE
  {
    name: "Supabase",
    url: "https://supabase.com",
    category: "database",
    description:
      "Database, auth, dan edge function paling populer untuk vibe coder. Free tier yang sangat generous untuk project awal.",
    pricing: "Freemium",
  },
  {
    name: "Firebase",
    url: "https://firebase.google.com",
    category: "database",
    description:
      "Backend Google dengan free tier generous. Alternatif solid untuk Supabase dengan ekosistem Google yang kuat.",
    pricing: "Freemium",
  },

  // DEPLOY
  {
    name: "Vercel",
    url: "https://vercel.com",
    category: "deploy",
    description:
      "Deploy Next.js paling mulus, gratis untuk personal project, CI/CD otomatis dari GitHub, domain custom gratis.",
    pricing: "Freemium",
  },
  {
    name: "Netlify",
    url: "https://netlify.com",
    category: "deploy",
    description:
      "Deploy static site dan app dengan mudah. Free tier yang bagus dengan form handling dan serverless functions.",
    pricing: "Freemium",
  },

  // PLANNING
  {
    name: "Figma",
    url: "https://figma.com",
    category: "planning",
    description:
      "Desain UI dan wireframe standar industri, bisa import screenshot ke vibe coding tools untuk referensi layout.",
    pricing: "Freemium",
  },
  {
    name: "Excalidraw",
    url: "https://excalidraw.com",
    category: "planning",
    description:
      "Sketsa cepat hand-drawn style, gratis dan open source. Ideal untuk brainstorm cepat sebelum coding.",
    pricing: "Gratis",
  },
  {
    name: "Whimsical",
    url: "https://whimsical.com",
    category: "planning",
    description:
      "Wireframe dan workflow map yang cepat dan intuitif. Sangat bagus untuk mendeskripsikan flow ke AI.",
    pricing: "Freemium",
  },
  {
    name: "Miro",
    url: "https://miro.com",
    category: "planning",
    description:
      "Whiteboard kolaboratif untuk brainstorming dan planning tim. Ribuan template siap pakai.",
    pricing: "Freemium",
  },
  {
    name: "Coolors",
    url: "https://coolors.co",
    category: "planning",
    description:
      "Generate palette warna yang harmonis dengan sangat cepat. Export ke berbagai format, termasuk CSS variables.",
    pricing: "Freemium",
  },
];

export const categoryLabels: Record<Tool["category"], string> = {
  "app-builder": "App Builder",
  "ai-assistant": "AI Assistant",
  icon: "Icon",
  illustration: "Ilustrasi",
  background: "Background",
  "ui-components": "UI Components",
  "design-system": "Design System",
  database: "Database",
  deploy: "Deploy",
  planning: "Planning",
};

export const categoryColors: Record<Tool["category"], string> = {
  "app-builder": "text-violet-400 bg-violet-400/10 border-violet-400/30",
  "ai-assistant": "text-purple-400 bg-purple-400/10 border-purple-400/30",
  icon: "text-blue-400 bg-blue-400/10 border-blue-400/30",
  illustration: "text-pink-400 bg-pink-400/10 border-pink-400/30",
  background: "text-indigo-400 bg-indigo-400/10 border-indigo-400/30",
  "ui-components": "text-fuchsia-400 bg-fuchsia-400/10 border-fuchsia-400/30",
  "design-system": "text-cyan-400 bg-cyan-400/10 border-cyan-400/30",
  database: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
  deploy: "text-sky-400 bg-sky-400/10 border-sky-400/30",
  planning: "text-amber-400 bg-amber-400/10 border-amber-400/30",
};

export const pricingColors: Record<Tool["pricing"], string> = {
  Gratis: "text-green-400 bg-green-400/10 border-green-400/30",
  Freemium: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
  Berbayar: "text-red-400 bg-red-400/10 border-red-400/30",
};
