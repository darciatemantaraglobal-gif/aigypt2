import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { waUrl } from "@/lib/wa";
import { viewportConfig, containerStagger, cardItem } from "@/lib/animations";

// ─── Data ──────────────────────────────────────────────────────────────────────

const sessions = [
  {
    num: "01",
    title: "AI Itu Bukan Sulap, Tapi Hampir",
    essence: "Bukan sekadar kenalan dengan tools, ini titik di mana kamu berhenti takut dan mulai melihat AI sebagai sesuatu yang bisa kamu kendalikan.",
    mastery: [
      "Memahami cara kerja AI tanpa istilah teknis yang membingungkan, sehingga kamu tidak lagi merasa ini bukan duniaku",
      "Mengenali ChatGPT, Claude, dan Gemini, dan kapan masing-masing benar-benar relevan untuk dunia akademik Al-Azhar",
      "Menyaksikan langsung satu masalah masisir, dijawab tiga AI berbeda, dan belajar membaca mana yang paling bisa dipercaya",
      "Menyadari bahwa cara kamu bertanya hari ini akan menentukan seberapa jauh kamu bisa melangkah di lima sesi berikutnya",
    ],
    tools: ["ChatGPT", "Claude", "Gemini"],
    mission: "Ajukan satu masalah nyata yang kamu hadapi minggu ini, entah soal kuliah, organisasi, atau maisyah, pada dua AI berbeda. Amati mana yang benar-benar memahami konteksmu.",
  },
  {
    num: "02",
    title: "Seni Berdialog dengan Kecerdasan",
    essence: "Ini bukan sekadar teknik. Ini keterampilan yang memisahkan masisir yang pernah coba AI dengan masisir yang benar-benar menguasainya.",
    mastery: [
      "Formula menyusun perintah yang tajam, sehingga AI memahami konteksmu sebagai mahasiswa Al-Azhar, bukan jawaban generik untuk orang asing",
      "Mengubah pertanyaan biasa menjadi instruksi presisi yang menghasilkan jawaban setara hasil diskusi dengan senior",
      "Teknik bertanya bertahap untuk menyelesaikan hal kompleks, seperti menyusun argumen makalah yang berlapis",
      "Membangun koleksi prompt pribadimu sendiri, aset yang akan terus kamu pakai jauh setelah AIGYPT selesai",
    ],
    tools: ["Claude", "ChatGPT"],
    mission: "Susun tiga perintah presisi untuk tiga kebutuhanmu yang paling mendesak sebagai masisir minggu ini.",
  },
  {
    num: "03",
    title: "Asisten untuk Ilmu dan Amanah",
    essence: "Di sinilah AI berhenti jadi mainan dan mulai jadi rekan kerja, untuk ilmu yang kamu tuntut, dan amanah organisasi yang kamu emban.",
    mastery: [
      "Menulis dan menyempurnakan makalah berbahasa Arab fusha, bahasa yang jauh berbeda dari ammiyah yang kamu dengar tiap hari di Kairo",
      "Menerjemah dan memahami kitab turats yang rumit, tanpa harus bolak-balik membuka kamus berjam-jam",
      "Merangkum jurnal panjang dan menemukan celah penelitian untuk skripsimu",
      "Menyusun proposal, notulensi, dan laporan organisasi yang biasanya menyita waktu kepanitiaanmu berhari-hari",
    ],
    tools: ["Claude", "NotebookLM", "TurboScribe", "DeepL"],
    mission: "Selesaikan satu tugas akademik atau amanah organisasi nyata minggu ini dengan AI. Rasakan sendiri berapa jam yang kamu selamatkan.",
  },
  {
    num: "04",
    title: "Kecerdasan yang Menghasilkan",
    essence: "Maisyah di perantauan tidak harus selalu soal kerja keras tanpa henti. Di sini kamu belajar bekerja dengan kecerdasan.",
    mastery: [
      "Meriset produk dan peluang usaha yang realistis dijalankan masisir, dengan modal dan waktu yang terbatas",
      "Menulis copywriting yang benar-benar menjual, bukan sekadar caption yang dilewatkan begitu saja",
      "Merancang kalender konten dan naskah dalam hitungan menit, untuk membangun nama di tengah kesibukan kuliah",
      "Mengubah satu konten menjadi banyak format, sehingga usahamu terlihat di mana-mana tanpa kerja berkali lipat",
    ],
    tools: ["Claude", "Canva AI", "CapCut AI"],
    mission: "Ciptakan satu konten atau materi promosi dengan AI, dari ide hingga visual jadi.",
  },
  {
    num: "05",
    title: "Tangan yang Mencipta",
    essence: "Inilah puncaknya. Momen kamu berhenti hanya memakai aplikasi buatan orang lain, dan mulai membangun aplikasimu sendiri.",
    mastery: [
      "Memahami vibe coding, yaitu cara membangun perangkat lunak tanpa harus menjadi programmer",
      "Menciptakan aplikasi web nyata dari sekadar deskripsi masalah yang kamu hadapi sehari-hari",
      "Menghasilkan skrip otomatis untuk tugas administratif organisasi yang berulang setiap periode kepengurusan",
      "Merangkai alur kerja otomatis yang bekerja sendiri, bahkan saat kamu sedang fokus talaqqi atau ujian",
    ],
    tools: ["Lovable", "Bolt", "v0", "Replit", "n8n"],
    mission: "Rumuskan satu masalah nyata di lingkunganmu, entah kekeluargaan, kampus, atau usahamu, dan solusi yang kamu bayangkan. Ini benih karya yang akan kamu bangun.",
  },
  {
    num: "06",
    title: "Pembuktian",
    essence: "Demo Day. Bukan ujian, tapi momen kamu menunjukkan bahwa transformasi ini nyata, dan bisa dilihat, dipakai, dan dirasakan orang lain.",
    mastery: [
      "Mempresentasikan solusi: dari masalah yang kamu alami, proses membangunnya, hingga hasil yang bisa langsung dipakai",
      "Menerima dan memberi umpan balik yang membangun dari sesama masisir yang menjalani perjalanan yang sama",
      "Mendokumentasikan karyamu sebagai portofolio pertama, bukti nyata yang bisa kamu tunjukkan, bukan sekadar sertifikat kursus",
      "Merancang langkah selanjutnya, termasuk bagaimana karyamu bisa terus dipakai dan dikembangkan setelah AIGYPT selesai",
    ],
    tools: ["Seluruh tools yang telah kamu kuasai sepanjang enam sesi"],
    mission: "Dokumentasikan karyamu. Ini bukan tugas terakhir. Ini adalah bukti bahwa kamu pulang dari perantauan membawa lebih dari yang kamu bayangkan.",
  },
];

const phases = [
  { num: "01", label: "FONDASI", desc: "Dari takut dan asal pakai, menjadi memahami AI sebagai alat yang tunduk pada siapa yang mengerti cara memerintahnya" },
  { num: "02", label: "KETERAMPILAN", desc: "Dari bertanya asal-asalan, menjadi menguasai cara berdialog dengan AI yang menghasilkan jawaban setajam yang kamu butuhkan" },
  { num: "03", label: "PENERAPAN", desc: "Dari kewalahan oleh tugas dan amanah, menjadi punya asisten yang memahami beratnya menjadi mahasiswa sekaligus pengurus organisasi" },
  { num: "04", label: "PRODUKSI", desc: "Dari sekadar bertahan secara finansial, menjadi punya kemampuan menghasilkan nilai, baik untuk diri sendiri maupun sesama masisir" },
  { num: "05", label: "PENCIPTAAN", desc: "Dari pengguna aplikasi orang lain, menjadi pencipta solusi yang lahir dari masalahmu sendiri, dan bisa dipakai orang lain juga" },
];

const upcomingClasses = [
  {
    title: "Bahasa Arab Akademik dengan AI",
    tag: "Akademik",
    desc: "Untuk masisir yang ingin makalah, muthala'ah, dan kitab turats tidak lagi menjadi beban. AI hadir sebagai asisten linguistik yang memahami bahasa fusha.",
    points: ["Penulisan makalah Arab fusha yang terstruktur", "Terjemahan & pemahaman kitab turats kompleks", "Riset dan anotasi referensi akademik"],
  },
  {
    title: "Bangun Penghidupan dengan AI",
    tag: "Bisnis",
    desc: "Maisyah di perantauan tidak harus soal kerja keras tanpa arah. Ubah keahlianmu menjadi sumber penghasilan yang bisa berjalan di sela-sela kuliah.",
    points: ["Identifikasi peluang usaha yang realistis untuk masisir", "Produk digital dari keahlian yang kamu miliki", "Sistem penghasilan yang berjalan otomatis"],
  },
  {
    title: "Vibe Coding: Dari Nol ke Aplikasi",
    tag: "Teknologi",
    desc: "Bangun perangkat lunak yang berguna dan nyata, untuk kekeluargaan, komunitas, atau dirimu sendiri, tanpa perlu menjadi programmer.",
    points: ["Aplikasi web dari sekadar deskripsi masalah", "Otomasi tugas administratif organisasi", "Deploy dan bagikan produk pertamamu"],
  },
  {
    title: "Konten dan Dakwah Digital dengan AI",
    tag: "Konten",
    desc: "Sebarkan ilmu dan kebaikan dengan jangkauan yang jauh lebih luas. AI menjadi alat produksi konten yang konsisten dan bermakna.",
    points: ["Produksi konten masif yang tetap berkualitas", "Naskah yang menyentuh dan sesuai konteks dakwah", "Strategi membangun kanal digital yang tahan lama"],
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const stagger = (delay = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: delay } },
});

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger()}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      variants={fadeUp}
      className="font-mono text-xs tracking-widest mb-6"
      style={{ color: "#7C3AED", letterSpacing: "0.2em" }}
    >
      {children}
    </motion.p>
  );
}

// ─── Session Row ───────────────────────────────────────────────────────────────

function SessionRow({ session, index }: { session: typeof sessions[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="group relative cursor-pointer transition-all duration-300"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        onClick={() => setOpen(!open)}
      >
        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 rounded-sm"
          style={{
            background: "linear-gradient(90deg, rgba(124,58,237,0.04) 0%, transparent 60%)",
            boxShadow: "inset 1px 0 0 rgba(124,58,237,0.25)",
          }}
        />

        {/* Row header */}
        <div className="relative flex items-center gap-6 px-4 sm:px-8 py-6 sm:py-8">
          <span
            className="flex-shrink-0 font-mono font-bold leading-none select-none"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "rgba(124,58,237,0.35)",
              letterSpacing: "-0.02em",
            }}
          >
            {session.num}
          </span>
          <div className="flex-1 min-w-0">
            <h3
              className="font-display font-semibold text-white leading-tight mb-1"
              style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}
            >
              {session.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "#71717A" }}>
              {session.essence}
            </p>
          </div>
          <div className="flex-shrink-0 ml-4">
            <motion.div
              animate={{ rotate: open ? 45 : 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="w-7 h-7 rounded-full flex items-center justify-center border transition-colors duration-300"
              style={{
                borderColor: open ? "rgba(124,58,237,0.6)" : "rgba(255,255,255,0.1)",
                color: open ? "#A855F7" : "#52525B",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Expandable detail */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="detail"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: "hidden" }}
            >
              <div
                className="px-4 sm:px-8 pb-8"
                style={{ paddingLeft: "calc(1rem + clamp(2rem,5vw,3.5rem) + 1.5rem)" }}
              >
                <div className="mb-6">
                  <p className="font-mono text-xs mb-4 tracking-widest" style={{ color: "#52525B", letterSpacing: "0.12em" }}>
                    YANG AKAN KAMU KUASAI
                  </p>
                  <ul className="space-y-3">
                    {session.mastery.map((item, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: j * 0.05, duration: 0.3 }}
                        className="flex items-start gap-3 text-sm"
                        style={{ color: "#A1A1AA" }}
                      >
                        <span className="flex-shrink-0 mt-1.5 font-mono text-xs" style={{ color: "rgba(124,58,237,0.6)" }}>—</span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className="mb-6">
                  <p className="font-mono text-xs mb-3 tracking-widest" style={{ color: "#52525B", letterSpacing: "0.12em" }}>
                    TOOLS
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {session.tools.map((tool) => (
                      <span
                        key={tool}
                        className="font-mono text-xs px-3 py-1 rounded-full"
                        style={{
                          border: "1px solid rgba(124,58,237,0.25)",
                          color: "#A855F7",
                          background: "rgba(124,58,237,0.07)",
                        }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                <div
                  className="rounded-lg px-5 py-4"
                  style={{
                    background: "rgba(124,58,237,0.06)",
                    border: "1px solid rgba(124,58,237,0.18)",
                  }}
                >
                  <p className="font-mono text-xs mb-2 tracking-widest" style={{ color: "#7C3AED", letterSpacing: "0.12em" }}>
                    MISI MINGGU INI
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "#D4D4D8" }}>{session.mission}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Phase Arc (Desktop horizontal / Mobile vertical) ─────────────────────────

function PhaseArc() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref}>
      {/* Desktop */}
      <div className="hidden lg:flex items-start gap-0 relative">
        <div
          className="absolute top-8 left-[5%] right-[5%] h-px"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />
        <motion.div
          className="absolute top-8 left-[5%] h-px"
          style={{ background: "linear-gradient(90deg, rgba(124,58,237,0.6), rgba(168,85,247,0.3))", transformOrigin: "left" }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        />
        {phases.map((phase, i) => (
          <div key={i} className="flex-1 flex flex-col items-center relative">
            <motion.div
              className="w-4 h-4 rounded-full z-10 mb-5 flex items-center justify-center"
              style={{ background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.5)" }}
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.4, ease: "backOut" }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#A855F7" }} />
            </motion.div>
            <motion.div
              className="text-center px-2"
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.12, duration: 0.4 }}
            >
              <p className="font-mono text-xs mb-2 tracking-widest" style={{ color: "#7C3AED", letterSpacing: "0.15em" }}>
                {phase.num}
              </p>
              <p className="font-mono font-bold text-xs text-white mb-2 tracking-wider">{phase.label}</p>
              <p className="text-xs leading-relaxed" style={{ color: "#52525B" }}>{phase.desc}</p>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Mobile vertical */}
      <div className="lg:hidden flex flex-col gap-0 relative">
        <div
          className="absolute left-4 top-4 bottom-4 w-px"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />
        <motion.div
          className="absolute left-4 top-4 w-px"
          style={{ background: "linear-gradient(180deg, rgba(124,58,237,0.6), rgba(168,85,247,0.2))", transformOrigin: "top" }}
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        />
        {phases.map((phase, i) => (
          <motion.div
            key={i}
            className="flex items-start gap-6 relative pl-10 py-5"
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 + i * 0.12, duration: 0.45 }}
          >
            <div
              className="absolute left-2.5 top-7 w-3 h-3 rounded-full z-10"
              style={{ background: "rgba(124,58,237,0.3)", border: "1px solid rgba(124,58,237,0.6)" }}
            />
            <div>
              <p className="font-mono text-xs mb-1 tracking-widest" style={{ color: "#7C3AED" }}>{phase.num} · {phase.label}</p>
              <p className="text-sm" style={{ color: "#71717A" }}>{phase.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function Kurikulum() {
  return (
    <div className="min-h-screen" style={{ background: "#060608", color: "#FAFAFA" }}>
      <Navbar />

      {/* ══ SECTION 1: HERO ══ */}
      <section className="relative overflow-hidden pt-28 pb-24 sm:pt-36 sm:pb-32">
        <motion.div
          className="absolute pointer-events-none"
          style={{
            top: "-10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "80vw",
            height: "60vh",
            background: "radial-gradient(ellipse at center, rgba(124,58,237,0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: "radial-gradient(rgba(124,58,237,0.2) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <Reveal className="relative max-w-5xl mx-auto px-6 sm:px-10 text-center">
          <SectionLabel>KURIKULUM AIGYPT · BATCH 1</SectionLabel>
          <motion.h1
            variants={fadeUp}
            className="font-display font-semibold leading-tight mb-8"
            style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)", letterSpacing: "-0.02em" }}
          >
            Bukan Sekadar Belajar AI.
            <br />
            <span style={{ color: "#A855F7" }}>Ini Tentang Menjadi Pencipta.</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8"
            style={{ color: "#A1A1AA", fontWeight: 300 }}
          >
            Empat pertemuan padat yang dirancang bukan untuk membuatmu tahu lebih banyak
            tentang kecerdasan buatan, tapi untuk mengubah caramu memandang
            setiap masalah yang kamu hadapi sebagai masisir. Dari yang dulu
            hanya bisa menunggu solusi, menjadi yang menciptakannya sendiri.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col items-center gap-3">
            <p className="font-mono text-xs tracking-widest" style={{ color: "#A855F7", letterSpacing: "0.15em" }}>BATCH 1 · PENDAFTARAN DIBUKA · PERTEMUAN PERTAMA 6 JULI 2026</p>
            <Link href="/daftar">
              <span
                className="inline-flex items-center gap-2 text-base font-medium text-white transition-all duration-200 cursor-pointer"
                style={{ background: "#7C3AED", borderRadius: "12px", padding: "15px 28px", minHeight: "48px", boxShadow: "0px 4px 12px rgba(0,0,0,0.3)" }}
              >
                Daftar Sekarang →
              </span>
            </Link>
          </motion.div>
        </Reveal>
      </section>

      {/* ══ SECTION 2: FILOSOFI ══ */}
      <section className="py-20 sm:py-28" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <Reveal className="max-w-3xl mx-auto px-6 sm:px-10 text-center">
          <SectionLabel>PRINSIP DI BALIK KURIKULUM</SectionLabel>
          <motion.h2
            variants={fadeUp}
            className="font-display font-semibold leading-tight mb-8"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", letterSpacing: "-0.01em" }}
          >
            Kami tidak mengajarkan teknologi.
            <br />
            <span style={{ color: "#A855F7" }}>Kami mengajarkan cara menjadi orang yang dicari.</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="space-y-5 text-left max-w-2xl mx-auto">
            <p className="text-base leading-[1.9]" style={{ color: "#71717A", fontWeight: 300 }}>
              Hampir setiap masisir pernah merasakannya: stuck di depan kitab yang susah dipahami,
              kewalahan jadi panitia, atau bingung mencari penghasilan tambahan di tengah keterbatasan.
              AIGYPT dimulai dari satu keyakinan sederhana: masalah-masalah ini bukan karena kamu kurang
              mampu, tapi karena belum punya alat yang tepat.
            </p>
            <p className="text-base leading-[1.9]" style={{ color: "#71717A", fontWeight: 300 }}>
              Setiap sesi dirancang bertahap, dari memahami, menguasai, menerapkan, hingga mencipta.
              Tapi yang membedakan AIGYPT bukan hanya kurva belajarnya. Saat satu masisir menguasai ini,
              organisasi yang ia ikuti jadi lebih efisien, adik tingkat yang ia bimbing ikut terbantu,
              dan keluarga di tanah air melihat hasil nyata dari perantauannya.
            </p>
            <p className="text-base leading-[1.9]" style={{ color: "#71717A", fontWeight: 300 }}>
              Ini bukan kurikulum AI yang diterjemahkan dari materi Barat. Setiap contoh lahir dari
              realita yang kamu jalani: talaqqi dengan masyaikh, bahasa Arab fusha yang jauh berbeda
              dari ammiyah pasar, dinamika organisasi kekeluargaan, dan tekanan maisyah yang nyata
              di tengah nilai tukar yang naik turun.
            </p>
          </motion.div>
        </Reveal>
      </section>

      {/* ══ SECTION 3: ALUR TRANSFORMASI ══ */}
      <section className="py-16 sm:py-24" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <Reveal className="mb-14">
            <SectionLabel>ALUR TRANSFORMASI</SectionLabel>
            <motion.h2
              variants={fadeUp}
              className="font-display font-semibold"
              style={{ fontSize: "clamp(1.25rem, 3vw, 2rem)", letterSpacing: "-0.01em" }}
            >
              Lima Pergeseran yang Akan Terjadi pada Dirimu
            </motion.h2>
          </Reveal>
          <PhaseArc />
        </div>
      </section>

      {/* ══ SECTION 4: KELAS TERSEDIA — DETAIL FLAGSHIP ══ */}
      <section className="py-16 sm:py-24" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <Reveal className="mb-4">
            <SectionLabel>ENAM SESI YANG DIKURASI DARI REALITA MASISIR</SectionLabel>
          </Reveal>

          {/* Kelas header */}
          <Reveal className="mb-12">
            <motion.div
              variants={fadeUp}
              className="rounded-2xl p-6 sm:p-8 flex flex-wrap items-center justify-between gap-6"
              style={{
                background: "rgba(16,16,24,0.8)",
                border: "1px solid rgba(124,58,237,0.2)",
              }}
            >
              <div>
                <h2
                  className="font-display font-semibold text-white leading-tight mb-2"
                  style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)" }}
                >
                  Maksimalkan AI untuk Menghasilkan Solusimu
                </h2>
                <p className="text-sm" style={{ color: "#71717A" }}>
                  6 sesi · ~60 menit/sesi · Semua level · Karya nyata
                </p>
              </div>
              <Link href="/kelas/maksimalkan-ai">
                <span
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl cursor-pointer transition-all duration-300 whitespace-nowrap"
                  style={{ background: "#7C3AED", boxShadow: "0 0 16px rgba(124,58,237,0.3)" }}
                >
                  Masuk ke Kelas
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </motion.div>
          </Reveal>

          {/* Session rows */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {sessions.map((session, i) => (
              <SessionRow key={session.num} session={session} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 5: TIMELINE BATCH 1 ══ */}
      <section className="py-16 sm:py-24" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <Reveal className="mb-6">
            <SectionLabel>JADWAL PERTEMUAN LIVE BATCH 1</SectionLabel>
            <motion.h2
              variants={fadeUp}
              className="font-display font-semibold mb-4"
              style={{ fontSize: "clamp(1.25rem, 3vw, 2rem)", letterSpacing: "-0.01em" }}
            >
              Empat Pertemuan, Satu Transformasi Penuh
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm leading-[1.9] max-w-2xl" style={{ color: "#71717A", fontWeight: 300 }}>
              Kamu tetap mempelajari keseluruhan enam sesi secara mandiri di platform, kapan saja sesuai waktumu.
              Empat pertemuan ini adalah momen kita berkumpul bersama, membahas lebih dalam, praktek langsung,
              dan menjawab pertanyaanmu secara langsung.
            </motion.p>
          </Reveal>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={containerStagger}
          >
            {[
              { num: 1, day: "Senin, 6 Juli 2026",   title: "Fondasi dan Keterampilan",    sub: "Membahas Sesi 1–2: mindset AI dan seni berdialog dengan kecerdasan" },
              { num: 2, day: "Rabu, 8 Juli 2026",    title: "Penerapan",                   sub: "Membahas Sesi 3: AI untuk ilmu dan amanah organisasi" },
              { num: 3, day: "Sabtu, 11 Juli 2026",  title: "Produksi dan Penciptaan",     sub: "Membahas Sesi 4–5: dari menghasilkan karya hingga membangun aplikasi" },
              { num: 4, day: "Senin, 13 Juli 2026",  title: "Pembuktian",                  sub: "Membahas Sesi 6: Demo Day, mempersembahkan karyamu" },
            ].map((item) => (
              <motion.div
                key={item.num}
                variants={cardItem}
                className="flex items-start gap-4 rounded-xl px-5 py-5"
                style={{ background: "rgba(10,10,15,0.7)", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div
                  className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-mono text-sm font-bold mt-0.5"
                  style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", color: "#A855F7" }}
                >
                  {item.num}
                </div>
                <div>
                  <p className="font-mono text-[10px] mb-1" style={{ color: "#7C3AED", letterSpacing: "0.1em" }}>
                    {item.day}
                  </p>
                  <p className="text-sm font-semibold text-white mb-1">{item.title}</p>
                  <p className="text-xs leading-snug" style={{ color: "#52525B" }}>{item.sub}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.p
            className="mt-6 font-mono text-xs text-center tracking-widest"
            style={{ color: "#3F3F46", letterSpacing: "0.15em" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportConfig}
            transition={{ delay: 0.6 }}
          >
            SETIAP PERTEMUAN BERLANGSUNG 1.5–2 JAM SECARA LIVE BERSAMA MENTOR
          </motion.p>
        </div>
      </section>

      {/* ══ SECTION 6: KELAS MENDATANG ══ */}
      <section className="py-16 sm:py-28" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <Reveal className="mb-12">
            <SectionLabel>SETELAH BATCH 1</SectionLabel>
            <motion.h2
              variants={fadeUp}
              className="font-display font-semibold mb-4"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", letterSpacing: "-0.015em" }}
            >
              Perjalanan Ini Tidak{" "}
              <span style={{ color: "#A855F7" }}>Berhenti di Kamu</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm leading-relaxed max-w-xl" style={{ color: "#71717A" }}>
              Setiap masisir yang menguasai ini akan membuka jalan bagi yang berikutnya. Inilah kelas-kelas yang akan menyusul.
            </motion.p>
          </Reveal>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={containerStagger}
          >
            {upcomingClasses.map((cls, i) => (
              <motion.div
                key={i}
                variants={cardItem}
                className="rounded-2xl p-6 flex flex-col gap-4"
                style={{
                  background: "rgba(10,10,15,0.7)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display font-semibold text-white text-base leading-snug">{cls.title}</h3>
                  <span
                    className="flex-shrink-0 font-mono text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: "rgba(82,82,91,0.12)",
                      color: "#52525B",
                      border: "1px solid rgba(82,82,91,0.18)",
                    }}
                  >
                    SEGERA
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#71717A" }}>{cls.desc}</p>
                <ul className="space-y-2">
                  {cls.points.map((pt, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs" style={{ color: "#52525B" }}>
                      <span className="mt-0.5 font-mono" style={{ color: "rgba(124,58,237,0.4)" }}>—</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ SECTION 7: CTA ══ */}
      <section className="relative py-24 sm:py-36 overflow-hidden" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center 80%, rgba(124,58,237,0.1) 0%, transparent 60%)",
          }}
        />
        <Reveal className="relative max-w-3xl mx-auto px-6 sm:px-10 text-center">
          <SectionLabel>MULAI SEKARANG</SectionLabel>
          <motion.h2
            variants={fadeUp}
            className="font-display font-semibold leading-tight mb-6"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", letterSpacing: "-0.015em" }}
          >
            Kamu datang ke Mesir untuk berubah.
            <br />
            <span style={{ color: "#A855F7" }}>Biarkan ini jadi bagian dari perubahan itu.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-base leading-relaxed mb-10"
            style={{ color: "#71717A", fontWeight: 300 }}
          >
            Daftarkan dirimu sebelum kuota terpenuhi.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/daftar">
              <span
                className="inline-flex items-center gap-2 text-base font-medium text-white transition-all duration-200 cursor-pointer"
                style={{ background: "#7C3AED", borderRadius: "12px", padding: "15px 28px", minHeight: "48px", boxShadow: "0px 4px 12px rgba(0,0,0,0.3)" }}
              >
                Daftar Batch 1 Sekarang
              </span>
            </Link>
            <a
              href={waUrl("Halo, saya ingin menghubungi AIGYPT")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-base font-normal transition-all duration-200 hover:text-white"
              style={{ border: "1px solid rgba(255,255,255,0.1)", color: "#A1A1AA", borderRadius: "12px", padding: "15px 24px", minHeight: "48px" }}
            >
              Hubungi Kami via WhatsApp
            </a>
          </motion.div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
