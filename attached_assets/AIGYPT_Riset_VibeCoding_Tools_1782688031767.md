# Riset Lengkap: Workflow Vibe Coding + Tools + Asset & Design Resources
## Bahan untuk AIGYPT Sesi 5 (Vibe Coding) — Data Master

> Dokumen ini adalah riset mendalam tentang workflow vibe coding terbaik, tools AI yang digunakan, dan website-website untuk asset/UI/design. Disusun sebagai bahan baku untuk memperkaya materi AIGYPT dan untuk dijadikan referensi di website.

---

## BAGIAN 1 — APA ITU VIBE CODING (KONTEKS TERKINI)

Istilah **vibe coding** dipopulerkan oleh **Andrej Karpathy** (peneliti AI terkemuka, eks-Director of AI di Tesla, co-founder OpenAI) pada Februari 2025. Dalam post viral-nya, ia mendeskripsikan workflow baru di mana kamu "menyerah sepenuhnya pada vibes, merangkul eksponensial, dan lupa bahwa kode itu ada."

Istilah ini dengan cepat jadi catchphrase budaya — bahkan dinobatkan sebagai Word of the Year oleh Collins Dictionary 2025 — untuk mendeskripsikan pergeseran dari mengetik sintaks secara manual menjadi berbicara dengan AI untuk membangun software.

**Skala adopsi 2026:**
- 92% developer AS menggunakan AI coding tools setiap hari, dan pasar diproyeksikan mencapai $12,3 miliar pada 2027.
- Antara 2022 dan 2025, tools ini menarik $9,4 miliar pendanaan equity.
- Microsoft dan Google memperkirakan 25-30% kode baru mereka sekarang dihasilkan AI.

**Peringatan penting soal keamanan:**
- Karena vibe coding sangat bergantung pada model AI yang dilatih pada repository publik, ia bisa secara tidak sengaja mereproduksi pola kode yang tidak aman. Kerentanan paling umum: SQL injection, autentikasi yang buruk, dan API key yang di-hardcode.
- Sekitar 45% kode yang dihasilkan AI mengandung kerentanan, seperti secret yang di-hardcode atau validasi input yang tidak proper.

---

## BAGIAN 2 — DUA KATEGORI BESAR VIBE CODING TOOLS

Semua tools terbagi dua kategori utama. App builders (Lovable, Replit, v0 by Vercel) dan AI coding assistants (Cursor, Claude Code, Windsurf AI, GitHub Copilot, Gemini CLI, OpenAI Codex).

AI coding assistants bekerja di dalam workflow yang sudah ada sebagai code editor, plugin, atau terminal agent. App builders cocok untuk orang tanpa background coding seperti non-developer, founder, dan tim produk.

**Pertanyaan kunci untuk memilih:**
> Apakah kamu ingin mendeskripsikan software dan AI yang membangunnya (tools non-teknis), atau kamu ingin AI membantu kamu menulis kode lebih cepat (developer tools)? Mulai dari situ, dan tool yang tepat jadi jelas.

---

## BAGIAN 3 — DAFTAR LENGKAP TOOLS VIBE CODING 2026

### 🟢 KATEGORI A: APP BUILDERS (untuk non-coder / pemula)

#### 1. Lovable
- **URL:** lovable.dev
- **Untuk:** Non-coder yang mau bangun website dengan interaksi AI sederhana
- **Keunggulan:** Mengubah prompt menjadi MVP full-stack yang polished dengan visual editing, sinkronisasi GitHub, wiring backend, dan deployment.
- **Spesialisasi:** Sangat efektif untuk aplikasi React yang fokus desain, dipadukan dengan backend Supabase.
- **Traksi:** Mencapai $300 juta annualized revenue pada Januari 2026, kurang dari setahun setelah diluncurkan.
- **Pricing:** Ada free tier

#### 2. Bolt (bolt.new)
- **URL:** bolt.new
- **Untuk:** Generate full-stack app dengan cepat, minim instruksi
- **Keunggulan:** Menekankan kecepatan, menawarkan preview browser instan untuk proyek full-stack.
- **Pricing:** Ada free tier

#### 3. Replit
- **URL:** replit.com
- **Untuk:** Cloud coding instan + AI-assisted development di browser
- **Keunggulan:** Pengguna bisa pergi dari ide ke aplikasi yang ter-deploy tanpa meninggalkan browser. AI Agent-nya bisa merencanakan dan membangun seluruh aplikasi secara autonomous, dengan hosting built-in.
- **Fitur terbaru:** Autonomous AI Agent 3 yang menulis, menguji, dan men-deploy aplikasi end-to-end; integrasi Azure; export GitHub untuk kepemilikan kode penuh.
- **Pricing unik:** Effort-based pricing yang scale dengan waktu komputasi aktual, bukan kredit tetap.

#### 4. v0 by Vercel
- **URL:** v0.dev
- **Untuk:** UI components, terutama React/Next.js
- **Keunggulan:** Menggunakan shadcn/ui untuk styling yang konsisten, menghasilkan kode bersih dan maintainable yang mudah dikustomisasi developer. Integrasi Vercel yang mulus.
- **Catatan:** Fokus sempit pada UI component dan bergantung pada ekosistem React/Next.js — tool spesialis, bukan solusi general-purpose.
- **Pricing:** Free plan dengan $5 kredit bulanan. Premium mulai $20/bulan.

#### 5. Emergent
- **URL:** emergent.sh
- **Untuk:** Membangun aplikasi full-stack lengkap dari natural language
- **Keunggulan:** AI-nya bernalar tentang keseluruhan produk, mempertahankan konteks lintas fitur, data, dan workflow. Menciptakan sistem koheren yang tetap stabil saat berkembang.

#### 6. Base44
- **Untuk:** Membuat aplikasi AI yang scalable dengan workflow aman dan kolaborasi built-in.

#### 7. Google AI Studio / Firebase Studio / Stitch
- **Keunggulan:** AI Studio adalah cara tercepat dari ide ke web app yang live dan shareable, sering dengan satu prompt. Sempurna untuk rapid prototyping.
- **Catatan:** Firebase Studio untuk aplikasi penuh, Gemini CLI untuk script.

#### 8. Softr
- **URL:** softr.io
- **Untuk:** AI app builder dengan database, workflow, dan permission built-in
- **Keunggulan:** Memberikan fondasi nyata untuk proyek AI — database, workflow, dan permission sudah termasuk. Bagus untuk CRM, client portal, dashboard.

---

### 🔵 KATEGORI B: AI CODING ASSISTANTS (untuk yang sudah bisa coding)

#### 1. Claude Code (Anthropic)
- **Untuk:** Terminal-first, repo-level work
- **Keunggulan:** Masih opsi terkuat untuk kerja terminal-first level repo. Untuk membangun proyek SaaS proper yang bisa terus di-improve, sangat sulit dikalahkan. Akurat, kuat di multi-file work, dan biasanya lebih cepat recover saat ada masalah.
- **Fitur lanjutan:** Skills, MCP, memory, rules, dan lainnya — membuatnya terasa seperti tool pengembangan jangka panjang yang serius.
- **Cara kerja:** Dimulai dengan request natural language. Bisa bekerja dari instruksi high-level tanpa panduan step-by-step. Sebelum mulai, Claude Code menampilkan reasoning-nya sebagai teks sehingga kamu tahu rencananya. Kamu review dan approve sebelum apapun dijalankan.

#### 2. Cursor
- **Untuk:** Power developer yang mau AI-first editor dengan pemahaman codebase mendalam
- **Keunggulan:** Fork dari VS Code dengan integrasi AI mendalam. Memahami seluruh codebase, menyediakan code completion, refactoring, dan generation cerdas yang didukung Claude dan GPT.
- **Traksi:** Memimpin pasar di kalangan developer profesional, mencapai $2 miliar annualized revenue pada awal 2026.
- **Pricing:** Free (terbatas), Pro $20/bulan, Business $40/user/bulan.

#### 3. Windsurf (by Codeium)
- **Keunggulan:** AI-native IDE yang dibangun dari nol. Fitur Cascade mempertahankan konteks lintas tugas multi-step.

#### 4. GitHub Copilot
- **Pricing:** Free, Pro ($10/bulan), Pro+ ($39/bulan), Business ($19/user/bulan), Enterprise ($39/user/bulan).
- **Catatan:** Terikat erat dengan environment GitHub dan Microsoft.

#### 5. Lainnya
- **OpenAI Codex** — coding agent open source yang jalan di terminal dengan API key sendiri
- **Gemini CLI** — untuk script, terintegrasi Google
- **Cline** — open source dan gratis (hanya bayar inferensi model).
- **Aider** — beroperasi sepenuhnya di terminal, AI assistant untuk workflow berbasis teks cepat, didukung Claude, Gemini, atau GPT-4. Gratis dan open source.
- **Google Antigravity, Zed, Kilo Code, Continue, OpenCode** — opsi lain untuk berbagai workflow

---

## BAGIAN 4 — REKOMENDASI BERDASARKAN PROFIL

Untuk pemula tanpa pengalaman: Lovable, Bolt, v0 (tidak butuh programming). Untuk developer profesional: Cursor, Windsurf, Claude Code (power dan kontrol maksimal). Untuk mobile development: Rork, Lovable, Cursor (React Native dan PWA). Untuk enterprise: GitHub Copilot, Tabnine, Claude Code (keamanan dan compliance).

**Rating menurut profil (skala /10):**
Cursor (9.2) dan GitHub Copilot (9.0) memimpin untuk developer profesional, Claude Code (9.0) untuk workflow terminal-first, Lovable (8.9) untuk non-programmer, dan n8n AI Agents (8.7) untuk automation dan orkestrasi agent.

---

## BAGIAN 5 — WORKFLOW TERBAIK VIBE CODING (THE "GRADUATE WORKFLOW")

Ini adalah pola workflow paling direkomendasikan oleh praktisi 2026:

### Pola "Graduate Workflow"
Developer mulai dengan prototyping menggunakan tools berbasis browser seperti Bolt atau Lovable. Setelah ide divalidasi, kode dipindah ke tools lebih canggih seperti Cursor atau Claude Code untuk refinement level produksi. Workflow ini menggabungkan kecepatan dan presisi.

### Pola Arsitektural Universal
Semua workflow utama konvergen pada pola arsitektural yang sama: Research → Plan → Execute → Review → Ship.

### 9 Best Practices Vibe Coding (Lengkap)

Dari riset praktisi, berikut 9 best practices inti:

**1. Definisikan Intent (Buat PRD dulu)**
Sebelum mulai membangun, buat Product Requirements Document (PRD). Ini akan jadi building plan untuk app-mu, dalam bahasa yang jelas dan detail.
Kamu bahkan bisa membuat versi pertama di dalam tool AI seperti ChatGPT; tinggal minta untuk "draft a simple PRD" untuk use case-mu, lalu edit untuk akurasi.

**2. Wireframe dulu sebelum prompting**
Sebelum mulai prompting, sketsa apa yang kamu mau lihat. Wireframe cepat atau workflow map membantu kamu (dan AI) memahami bagaimana semuanya terhubung. Tidak butuh skill desain fancy — pakai tools seperti Figma, Whimsical, atau Miro.
Tool vibe-coding terbaik memungkinkan kamu import screenshot atau image mockup langsung, sehingga AI bisa menginterpretasi layout lebih akurat.

**3. Struktur data dan roles**
Tentukan model data, siapa yang bisa akses apa, sebelum membangun fitur.

**4. Prompt dalam langkah-langkah kecil (jangan one-shot)**
Mencoba membangun seluruh proyek dengan satu prompt adalah pertempuran yang kalah. Tidak peduli sedetail apa request-mu, AI tidak akan sepenuhnya menghormati setiap aspeknya. Selesaikan masalah kecil. Jangan coba bangun semua dengan satu prompt.

**5. Slice Vertically (bukan horizontal)**
Pecah PRD menjadi vertical slices (tracer bullets) yang melintasi semua layer (DB + service + UI) — AI secara default melakukan horizontal phasing (fase DB, lalu fase API, lalu fase frontend) yang menunda umpan balik end-to-end.

**6. Review setiap perubahan**
AI bisa menghasilkan kode yang terlihat sempurna, tapi tanpa review, masalah tersembunyi sering lolos. Setelah setiap siklus generasi: jalankan functional test, cek masalah struktural (penamaan variabel, alur data), dan inspeksi celah keamanan.

**7. Waspadai regression risk**
Dalam workflow yang dihasilkan AI, menambah fitur baru atau mengubah prompt bisa secara tidak sengaja merusak bagian app yang tadinya berfungsi. Sebelum minta AI membangun fitur advanced, pause dan pastikan fondasi (model data, permission, logika inti) masih cocok dengan scope yang berkembang.

**8. Dokumentasikan keputusan secara berkelanjutan**
Gunakan AI untuk membantu mendokumentasikan fitur saat kamu membangunnya, mempertahankan pengetahuan proyek untuk kolaborator manusia dan AI.

**9. Keamanan selalu diperhatikan**
Jangan paste API key, data pelanggan, atau kode proprietary sensitif ke AI. Setup secrets di Secrets section tool, gunakan .gitignore.

### File Penting dalam Workflow Vibe Coding

Praktisi serius menggunakan file-file ini sebagai "source of truth":
- **PRD.md** — Berisi deskripsi detail semua requirement proyek: functional requirements (fungsi spesifik) dan non-functional requirements (arsitektur kode, tech stack, design principle).
- **AGENTS.md / CLAUDE.md** — File memori yang berisi instruksi keseluruhan untuk model; anggap sebagai "README untuk agent". Untuk Claude Code disebut CLAUDE.md, agent lain mengadopsi standar komunitas AGENTS.md.
- **PLANNING.md** — arsitektur dan dokumen perencanaan
- **TASKS.md** — breakdown tugas menjadi milestone
- **DESIGN.md** — design system (dibahas detail di Bagian 6)

### Tips Lanjutan dari Praktisi
Mulai dengan spec atau prompt minimal dan minta AI meng-interview kamu, lalu buat sesi baru untuk eksekusi spec. Selalu buat rencana phase-wise yang gated, dengan setiap fase punya beberapa test.

Perlakukan AI seperti junior developer. Saat ada bug: paste bug-nya, bilang "fix", jangan micromanage caranya. Setelah fix yang biasa-biasa saja: "knowing everything you know now, scrap this and implement the elegant solution."

---

## BAGIAN 6 — DESIGN.MD: SOLUSI MASALAH DESAIN GENERIK

Ini salah satu temuan paling penting untuk masisir yang vibe coding.

### Apa itu DESIGN.md?
DESIGN.md adalah konsep baru yang diperkenalkan Google Stitch. Dokumen design system plain-text yang dibaca AI agent untuk menghasilkan UI yang konsisten. Hanya file markdown. Tidak ada export Figma, tidak ada JSON schema, tidak ada tooling khusus.

Diperkenalkan pada Maret 2026 sebagai bagian dari tool desain AI Google yaitu Stitch. Stitch menggunakan file ini untuk memastikan setiap layar atau komponen yang dihasilkan mematuhi bahasa visual yang konsisten.

### Masalah yang Dipecahkan
Generate UI dengan LLM pilihanmu. Kemungkinan oke dengan struktur logis, tapi sesuatu terasa "off". Warnanya terasa generik. Tombolnya terlihat seperti tombol lain yang pernah kamu lihat. Jalankan prompt yang sama besok dan kamu dapat sesuatu yang sedikit berbeda dan sama generiknya, karena tidak ada yang menjadi jangkar.

Kita teliti soal prompting untuk fungsionalitas (apa yang dilakukan app, bagaimana data mengalir) tapi hampir tidak mengatakan apa-apa tentang bagaimana experience-nya seharusnya terasa. AI mengisi kekosongan itu dengan tebakan terbaiknya, dan tebakan terbaiknya terlihat seperti setiap interface AI-generated lain yang pernah kamu lihat.

### Mengapa Powerful untuk Lintas Tool
Setelah format dipublikasikan, developer sadar mereka bisa menggunakan file DESIGN.md yang sama dengan AI agent lain. Spesifikasi yang ditulis untuk Stitch sekarang bisa melayani Claude Code, Cursor, atau script bertenaga LLM apapun. Interoperabilitas inilah kenapa adopsi DESIGN.md meledak begitu cepat.

### Struktur DESIGN.md (8-9 Section Kanonik)

Berdasarkan spec resmi, DESIGN.md mencakup:

1. **Visual Theme & Atmosphere** — Menetapkan intent emosional dan visual produk. Haruskah interface terasa korporat dan terpercaya? Modern dan playful? Minimalis dan utilitarian?
2. **Color Palette & Roles** — Mendefinisikan nilai presisi: background tombol primary #0066FF, hover state #0052CC, disabled state #CCCCCC. Definisi ini menghilangkan semua ambiguitas.
3. **Typography** — Font families, size scale, weights, line heights untuk heading dan body. Ini saja menyembuhkan sebagian besar inkonsistensi cross-session.
4. **Spacing** — Base unit (biasanya 4px atau 8px) dan nilai skala yang dipakai untuk padding, margin, dan gap.
5. **Components** — Border-radius, box-shadow, input styles, modal behavior, dan aturan level komponen lainnya.
6. **Motion** — Nilai durasi (misal 150ms untuk interaksi cepat, 300ms untuk transisi standar) dan fungsi easing cubic-bezier.
7. **Usage Guidelines & Accessibility** — "Primary blue dicadangkan untuk action paling penting. Jangan dipakai dekoratif." Plus: "Semua teks harus memenuhi rasio kontras minimum 4.5:1."
8. **Dos & Don'ts** — "Gunakan shadow untuk menunjukkan elevasi pada card interaktif. Jangan gunakan lebih dari dua font weight dalam satu layar."

### Cara Membuat DESIGN.md (3 Metode)

1. Biarkan AI menulisnya — Deskripsikan vibe-nya "A warm boutique hotel, with earthy tones, and quiet luxury" dan biarkan AI menerjemahkannya menjadi sistem penuh. Kamu mengedit, bukan menciptakan.

2. Ekstrak dari brand yang ada — Punya website, brand guidelines PDF, atau bahkan hanya logo? Berikan URL atau gambar, biarkan AI menarik palette, typography, dan pola style-mu otomatis.

3. Tulis manual — Mulai minimal dengan warna dan typography saja. Saat AI menghasilkan sesuatu yang hampir benar tapi tidak cukup, itu sinyal untuk menambah aturan.

### Sumber DESIGN.md Siap Pakai
- **awesome-design-md** (github.com/voltagent/awesome-design-md) — Repo yang menyediakan file DESIGN.md siap pakai yang diekstrak dari website nyata. Kamu bisa request DESIGN.md untuk website spesifik.
- **designmd.ai** — Format terbuka Google — file markdown tunggal yang dibaca AI coding tool-mu untuk membangun UI konsisten. Browse library dan download design system apapun sebagai file DESIGN.md tunggal.
- **designmd.app** — Library open-source: 461+ file design system siap pakai untuk Claude Code, Cursor, Kiro, Windsurf & Stitch.
- **Banani AI** — Membuat design system di canvas-nya yang update real-time sesuai versi desain terbaru, editable, dan bisa direferensikan lintas proyek.

### Cara Konfigurasi DESIGN.md per Tool
Konfigurasi CLAUDE.md untuk mereferensikan DESIGN.md otomatis. Gunakan .cursor/rules untuk inject DESIGN.md di setiap generasi UI. Tambahkan DESIGN.md ke direktori .kiro/steering. Konfigurasi global_rules.md untuk menunjuk ke DESIGN.md-mu. Export DESIGN.md langsung dari Google Stitch.

---

## BAGIAN 7 — WEBSITE ASSET: ICON

Pilih satu library ikon per proyek dan konsisten. Mencampur set ikon adalah cara tercepat membuat interface terlihat tidak koheren.

### Icon Libraries Terbaik (Gratis)

| Library | URL | Catatan |
|---|---|---|
| **Lucide** | lucide.dev | Fork dari Feather Icons yang dimaintain komunitas, 1.668 ikon, jadi default icon library untuk shadcn (React component library terpopuler 2026). Hanya style Outline. |
| **Heroicons** | heroicons.com | Dari creator Tailwind CSS, 300+ ikon SVG dalam 2 style (Outline dan Solid), lisensi MIT (gratis). |
| **Phosphor** | phosphoricons.com | Favorit banyak desainer, 1000+ ikon, didesain pada grid 16px sehingga sangat terbaca pada ukuran kecil. Format SVG, Figma, React, Vue. 6 weight variants. |
| **Font Awesome** | fontawesome.com | Salah satu library SVG paling populer sejak 2012, ribuan ikon dalam 3 style (solid, regular, brand). |
| **Tabler Icons** | tabler.io/icons | Developer-friendly, ribuan ikon outline konsisten |
| **Iconoir** | iconoir.com | Open-source, 1.400+ ikon dengan fokus simplicity dan kustomisasi, support light/dark mode. |
| **Material Symbols** | fonts.google.com/icons | Penerus Material Icons, format variable font yang powerful. |
| **Lineicons V5** | lineicons.com | 30.000+ ikon (2.000+ gratis), integrasi Figma, React, Next.js, Vue, Svelte. |
| **css.gg** | css.gg | 704 ikon yang banyak di-render pure CSS, tanpa file image. Ship sebagai npm package. |
| **Untitled UI Icons** | untitledui.com | Di-download 260.000+ kali, dibuat khusus untuk Figma. |

**Rekomendasi untuk vibe coding dengan shadcn/ui:** Lucide (default-nya shadcn).

### Marketplace Ikon (untuk kebutuhan spesifik)
- **Flaticon** — Marketplace ter-curate, bagus untuk konsep niche. Selalu verifikasi lisensi per-asset.
- **IconScout** — Sumber terpadu untuk ikon, ilustrasi, 3D asset, dan animasi Lottie.
- **Noun Project** — koleksi besar ikon dengan atribusi

---

## BAGIAN 8 — WEBSITE ASSET: ILUSTRASI

Setiap landing page butuh ilustrasi. Setiap onboarding flow menginginkannya. Setiap empty state terlihat lebih baik dengan satu.

### Illustration Libraries Terbaik (Gratis)

| Library | URL | Catatan |
|---|---|---|
| **unDraw** | undraw.co | Set standar — ilustrasi yang bisa diubah warnanya, ribuan ilustrasi konsisten, gratis tanpa atribusi |
| **Storyset** | storyset.com | Menambahkan animasi pada ilustrasi. Customizable, gratis dengan atribusi |
| **Open Peeps / Humaaans** | — | Ilustrasi orang mix-and-match oleh Pablo Stanley. Bagus untuk halaman tim, representasi user, layar onboarding. |
| **Blush** | blush.design | Mix-and-match ilustrasi dengan sistem komponen |
| **3D illustration libraries** | — | 160.000+ shape dan objek 3D-rendered. Bagus untuk hero section, feature highlight, materi marketing yang butuh premium feel. |
| **LottieFiles** | lottiefiles.com | Animasi Lottie gratis untuk web/app |

**Prinsip penting:** Konsistensi style lebih penting dari ukuran library. Library berisi 200 ilustrasi konsisten lebih berguna dari 5.000 yang tidak konsisten. Kamu akan pakai 10-20 ilustrasi per proyek.

---

## BAGIAN 9 — WEBSITE ASSET: BACKGROUND, GRADIENT & MOCKUP

### Gradient & Background Generators (Gratis)

| Tool | URL | Fungsi |
|---|---|---|
| **MagicPattern** | magicpattern.design | Mesh gradient generator, export SVG/PNG/JPG, tanpa signup. |
| **GradientsHub** | gradientshub.com | Gradient backgrounds, mesh gradients, plus Text Gradient Generator (CSS & Tailwind), 600+ Gradient Palette dengan copy-paste CSS, Tailwind Palette. 100% gratis. |
| **Pixelcut AI Gradient** | pixelcut.ai | Generate dari text prompt, watermark-free, high-resolution untuk personal dan komersial. |
| **Grainient** | grainient.supply | 1000+ gradient, animated gradients, grainy texture, dan background AI-generated. |
| **Media.io Gradient Maker** | media.io | AI gradient: pastel, neon, mesh, aurora, web-ready |

### AI Image & Asset Generators (Gratis/Freemium)

| Tool | URL | Fungsi |
|---|---|---|
| **Recraft** | recraft.ai | Generate gambar, logo, ikon, vektor. AI image editing (Nano Banana Pro, GPT Image 2). Mockup generator untuk apparel, packaging, signage, device. |
| **Kittl** | kittl.com | AI design platform dengan image gen models, pro editing, mockup, asset ter-curate, vectorizer, background remover. Gratis untuk mulai. |

### Mockup Generators (Gratis)
- **Mockey AI** (mockey.ai) — 27.000+ template mockup, 60+ kategori, download tanpa watermark di free plan.
- **Recraft Mockup** (recraft.ai/mockup-generator) — mockup t-shirt, poster, produk

---

## BAGIAN 10 — UI COMPONENT LIBRARIES (untuk React/Next.js)

Ini sangat relevan karena banyak vibe coding tool (v0, Lovable, Bolt) pakai React.

### Filosofi "Copy-Paste"
Ketiga library utama (Aceternity, Magic UI, shadcn/ui) menggunakan filosofi copy-paste — kamu tidak install package, kamu copy komponen ke codebase-mu.

### Library Utama

#### shadcn/ui — FONDASI
- **URL:** ui.shadcn.com
- **Untuk:** Application UI, design system kustom
- **Keunggulan:** Paling praktis — komponen bersih, accessible dengan animasi opsional via Framer Motion, terutama untuk application UI. Didukung Vercel, ship sebagai tool first-class di ekosistem Next.js.
- **Status:** Menjadi de facto standard component library untuk proyek React dan Next.js baru di 2026. Digunakan tim di Vercel, Linear, dan produk developer Stripe.

#### Aceternity UI — VISUAL EFFECTS
- **URL:** ui.aceternity.com
- **Untuk:** Landing page, marketing section
- **Keunggulan:** Spesialis efek visual menakjubkan (3D card, glowing beam, magnetic button, particle background) yang membuat landing page pop. ~28k GitHub stars.
- **Konten:** 200+ komponen production-ready: hero section, bento grid, parallax block, glare card, canvas card, glowing effect.

#### Magic UI — MICRO-INTERACTIONS
- **URL:** magicui.design
- **Untuk:** Marketing animations, micro-interaction
- **Keunggulan:** Fokus pada micro-interaction yang polished dan animasi marketing (animated beam, retro grid, neon gradient). Aesthetic lebih bersih yang cocok di light dan dark mode.

#### react-bits — TEXT & ANIMATION
- **URL:** reactbits.dev
- **Keunggulan:** Library komponen animasi yang naik tercepat — peringkat #2 di JS Rising Stars 2025. Tidak butuh Framer Motion sebagai dependency. Pakai CSS animation dan pull GSAP/Three.js/Matter.js hanya untuk komponen yang butuh.
- **Spesialisasi:** Text animation effects (BlurText, SplitText, GradientText) — best in class.

### Library Tambahan (Ekosistem shadcn)
Skiper UI (komponen un-common), Origin UI (primitif advanced), Cult UI (pola AI), Tailark (marketing page), MynaUI (design-system-first dengan 12k+ ikon), ReUI (component breadth), shadcn.io & Shadcnblocks & 21st.dev (block marketplace besar).

### Panduan Memilih per Tipe Proyek
Marketing site/landing page: Tailark, Aceternity, Magic UI. SaaS dashboard: shadcn/ui Charts untuk grafik, Shadcnblocks atau shadcn.io untuk sisanya. AI app/chat product: Cult UI untuk pola AI. Internal admin tool: Origin UI untuk primitif advanced, MynaUI untuk design-system parity.

**Strategi kombinasi:** Banyak proyek produksi pakai shadcn/ui untuk app shell dan form, Aceternity atau Magic UI untuk landing page dan marketing section. Semuanya pakai stack Tailwind + Framer Motion yang sama.

---

## BAGIAN 11 — TOOLS PERENCANAAN & PENDUKUNG

### Wireframing & Planning
- **Figma** (figma.com) — desain UI, wireframe, bisa import ke banyak tool
- **Whimsical** (whimsical.com) — wireframe & workflow map cepat
- **Miro** (miro.com) — whiteboard kolaboratif
- **Excalidraw** (excalidraw.com) — sketsa cepat hand-drawn style

### Database & Backend (untuk vibe coding)
- **Supabase** (supabase.com) — Salah satu opsi database paling populer untuk vibe coder.
- **Firebase** (firebase.google.com) — Opsi solid lain dengan free tier generous.

### Deployment
- **Vercel** (vercel.com) — deploy Next.js, gratis untuk personal
- **Netlify** (netlify.com) — deploy static site & app

### Color & Typography
- **Coolors** (coolors.co) — generate palette warna
- **Google Fonts** (fonts.google.com) — font gratis
- **Realtime Colors** (realtimecolors.com) — preview palette di UI nyata

---

## BAGIAN 12 — STACK REKOMENDASI UNTUK MASISIR (AIGYPT)

Berdasarkan semua riset, ini stack paling realistis untuk masisir pemula:

### Untuk Web App Sederhana (No-Code)
```
Bangun: Lovable atau Bolt
Database: Supabase (kalau butuh)
Asset ikon: Lucide
Ilustrasi: unDraw / Storyset
Background: GradientsHub / MagicPattern
Deploy: otomatis dari Lovable/Bolt
```

### Untuk Proyek yang Mau Di-iterate Lebih Serius
```
Prototype: Lovable/Bolt → validasi ide
Pindah ke: Replit (dengan AI Agent)
Design system: DESIGN.md (dari designmd.app)
UI components: shadcn/ui + Aceternity untuk landing
Database: Supabase
Deploy: Vercel
```

### Untuk Script/Automation
```
Generate kode: Claude
Jalankan: Replit
Automation: n8n / Make
```

### Workflow Ideal Masisir (Disederhanakan)
```
1. Tulis PRD sederhana (pakai ChatGPT/Claude)
2. Sketsa wireframe (Excalidraw/Figma)
3. Buat DESIGN.md (biar UI tidak generik)
4. Bangun bertahap di Lovable/Bolt (jangan one-shot)
5. Review tiap hasil
6. Deploy
7. Iterate berdasarkan feedback nyata
```

---

## RANGKUMAN: 7 INSIGHT KUNCI

1. **Vibe coding bukan one-shot** — workflow terbaik adalah bertahap (Research → Plan → Execute → Review → Ship)
2. **PRD dulu** — definisikan apa yang mau dibangun sebelum prompting
3. **DESIGN.md = senjata rahasia** — satu file markdown menghilangkan masalah "UI generik AI"
4. **Graduate workflow** — prototype di Lovable/Bolt, pindah ke Cursor/Claude Code untuk serius
5. **Pilih satu icon library, konsisten** — Lucide untuk shadcn projects
6. **Slice vertically, bukan horizontal** — bangun fitur end-to-end, bukan layer per layer
7. **Selalu review** — 45% kode AI punya kerentanan, manusia harus tetap mengecek

---

*Dokumen riset ini disusun sebagai bahan pengayaan AIGYPT Sesi 5 dan referensi tools untuk peserta. Semua tools dan data per kondisi pertengahan 2026.*
