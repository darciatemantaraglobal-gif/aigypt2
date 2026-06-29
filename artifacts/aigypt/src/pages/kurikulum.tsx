import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { waUrl } from "@/lib/wa";

// ─── Data ──────────────────────────────────────────────────────────────────────

const sessions = [
  {
    num: "01",
    title: "AI Itu Bukan Sulap, Tapi Hampir",
    essence: "Membangun fondasi mental dan memahami lanskap kecerdasan buatan.",
    mastery: [
      "Memahami cara kerja AI tanpa istilah teknis yang membingungkan",
      "Mengenali perbedaan ChatGPT, Claude, dan Gemini — kapan memakai yang mana",
      "Menyaksikan langsung: satu masalah, tiga AI, tiga hasil berbeda",
      "Menyadari mengapa cara bertanya menentukan segalanya",
    ],
    tools: ["ChatGPT", "Claude", "Gemini"],
    mission: "Ajukan satu masalah nyata pada dua AI berbeda. Amati perbedaannya.",
  },
  {
    num: "02",
    title: "Seni Berdialog dengan Kecerdasan",
    essence: "Menguasai prompting — keterampilan inti yang membedakan amatir dan ahli.",
    mastery: [
      "Formula menyusun perintah yang tajam dan menghasilkan output berkualitas",
      "Mengubah pertanyaan biasa menjadi instruksi yang presisi",
      "Teknik bertanya bertahap untuk hasil yang kompleks",
      "Membangun koleksi prompt pribadi yang bisa dipakai berulang",
    ],
    tools: ["Claude", "ChatGPT"],
    mission: "Susun tiga perintah presisi untuk tiga kebutuhan berbeda dalam hidupmu.",
  },
  {
    num: "03",
    title: "Asisten untuk Ilmu dan Amanah",
    essence: "Menerapkan AI pada dunia akademik dan organisasi.",
    mastery: [
      "Menulis dan menyempurnakan makalah berbahasa Arab",
      "Menerjemahkan dan memahami kitab klasik yang rumit",
      "Merangkum jurnal panjang dan menemukan celah penelitian",
      "Menyusun proposal, notulensi, dan laporan secara otomatis",
    ],
    tools: ["Claude", "NotebookLM", "TurboScribe", "DeepL"],
    mission: "Selesaikan satu tugas akademik atau organisasi nyata dengan AI. Catat waktu yang kamu hemat.",
  },
  {
    num: "04",
    title: "Kecerdasan yang Menghasilkan",
    essence: "Memanfaatkan AI untuk bisnis dan karya kreatif.",
    mastery: [
      "Meriset produk dan pasar dengan cermat",
      "Menulis copywriting yang benar-benar menjual",
      "Merancang kalender konten dan naskah dalam hitungan menit",
      "Mengubah satu konten menjadi banyak format untuk banyak kanal",
    ],
    tools: ["Claude", "Canva AI", "CapCut AI"],
    mission: "Ciptakan satu konten atau materi promosi dengan AI, dari ide hingga visual.",
  },
  {
    num: "05",
    title: "Tangan yang Mencipta",
    essence: "Membangun aplikasi dan solusi nyata melalui vibe coding.",
    mastery: [
      "Memahami vibe coding — membangun tanpa perlu menjadi programmer",
      "Menciptakan aplikasi web dari sekadar deskripsi",
      "Menghasilkan skrip otomatis untuk tugas yang berulang",
      "Merangkai alur kerja otomatis yang berjalan sendiri",
    ],
    tools: ["Lovable", "Bolt", "v0", "Replit", "n8n"],
    mission: "Rumuskan satu masalah nyata dan solusi yang kamu bayangkan. Inilah benih karyamu.",
  },
  {
    num: "06",
    title: "Pembuktian",
    essence: "Demo Day — mempersembahkan karya yang lahir dari perjalananmu.",
    mastery: [
      "Mempresentasikan solusi: dari masalah, proses, hingga hasil nyata",
      "Menerima dan memberi umpan balik yang membangun",
      "Mendokumentasikan karyamu sebagai portofolio pertama",
      "Merancang langkah selanjutnya untuk mengembangkan solusimu",
    ],
    tools: ["Seluruh tools yang telah dikuasai"],
    mission: "Dokumentasikan karyamu. Ini menjadi bukti nyata kemampuanmu.",
  },
];

const phases = [
  { num: "01", label: "FONDASI", desc: "Memahami lanskap kecerdasan buatan" },
  { num: "02", label: "KETERAMPILAN", desc: "Menguasai seni berdialog dengan AI" },
  { num: "03", label: "PENERAPAN", desc: "Menjadikan AI asisten ilmu dan amanah" },
  { num: "04", label: "PRODUKSI", desc: "Mengubah AI menjadi mesin yang menghasilkan" },
  { num: "05", label: "PENCIPTAAN", desc: "Membangun solusi nyata dengan tangan sendiri" },
];

const upcomingClasses = [
  {
    title: "Bahasa Arab Akademik dengan AI",
    tag: "Akademik",
    desc: "Taklukkan makalah, muthala'ah, dan kitab klasik dengan AI sebagai asisten linguistikmu.",
    points: ["Penulisan makalah Arab otomatis", "Terjemahan & tafsir kitab klasik", "Riset dan anotasi teks"],
  },
  {
    title: "Bangun Penghidupan dengan AI",
    tag: "Bisnis",
    desc: "Ubah keterampilan dan potensimu menjadi sumber penghasilan yang berkelanjutan.",
    points: ["Identifikasi peluang pasar", "Produk digital dari keahlianmu", "Sistem otomasi penghasilan"],
  },
  {
    title: "Vibe Coding: Dari Nol ke Aplikasi",
    tag: "Teknologi",
    desc: "Bangun software yang berguna dan nyata tanpa perlu menjadi programmer.",
    points: ["Aplikasi web dari deskripsi teks", "Otomasi tugas berulang", "Deploy produk pertamamu"],
  },
  {
    title: "Konten & Dakwah Digital dengan AI",
    tag: "Konten",
    desc: "Sebarkan kebaikan dan ilmu dengan kecerdasan buatan sebagai alat produksimu.",
    points: ["Produksi konten masif & konsisten", "Naskah dakwah yang menyentuh", "Strategi kanal digital"],
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
          <SectionLabel>KURIKULUM AIGYPT</SectionLabel>
          <motion.h1
            variants={fadeUp}
            className="font-display font-semibold leading-tight mb-8"
            style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)", letterSpacing: "-0.02em" }}
          >
            Peta Perjalanan
            <br />
            <span style={{ color: "#A855F7" }}>Belajarmu</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: "#A1A1AA", fontWeight: 300 }}
          >
            Dari fondasi hingga penciptaan — inilah seluruh lanskap pembelajaran
            yang AIGYPT tawarkan untuk masisir.
          </motion.p>
        </Reveal>
      </section>

      {/* ══ SECTION 2: FILOSOFI ══ */}
      <section className="py-20 sm:py-28" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <Reveal className="max-w-3xl mx-auto px-6 sm:px-10 text-center">
          <SectionLabel>PRINSIP KAMI</SectionLabel>
          <motion.h2
            variants={fadeUp}
            className="font-display font-semibold leading-tight mb-8"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", letterSpacing: "-0.01em" }}
          >
            Kami tidak mengajarkan teknologi.
            <br />
            <span style={{ color: "#A855F7" }}>Kami mengajarkan cara memecahkan masalah.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-base leading-[1.9]"
            style={{ color: "#71717A", fontWeight: 300 }}
          >
            Setiap materi AIGYPT dibangun bertahap — dari memahami, menguasai, menerapkan,
            hingga mencipta. Tujuan akhirnya bukan sekadar bisa memakai AI, tapi mampu
            membangun solusi nyata dari masalah yang kamu pahami betul.
          </motion.p>
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
              Lima fase perjalanan menuju penciptaan
            </motion.h2>
          </Reveal>
          <PhaseArc />
        </div>
      </section>

      {/* ══ SECTION 4: KELAS TERSEDIA — DETAIL FLAGSHIP ══ */}
      <section className="py-16 sm:py-24" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <Reveal className="mb-4">
            <SectionLabel>TERSEDIA SEKARANG</SectionLabel>
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

      {/* ══ SECTION 5: KELAS MENDATANG ══ */}
      <section className="py-16 sm:py-28" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <Reveal className="mb-12">
            <SectionLabel>SEGERA HADIR</SectionLabel>
            <motion.h2
              variants={fadeUp}
              className="font-display font-semibold mb-4"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", letterSpacing: "-0.015em" }}
            >
              Lebih Banyak Perjalanan
              <br />
              <span style={{ color: "#A855F7" }}>Menanti</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm" style={{ color: "#52525B" }}>
              Kelas-kelas berikut sedang dikembangkan bersama kebutuhan nyata masisir.
            </motion.p>
          </Reveal>

          <Reveal className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {upcomingClasses.map((cls, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
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
          </Reveal>
        </div>
      </section>

      {/* ══ SECTION 6: CTA ══ */}
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
            Perjalananmu{" "}
            <span style={{ color: "#A855F7" }}>menanti.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-base leading-relaxed mb-10"
            style={{ color: "#71717A", fontWeight: 300 }}
          >
            Pilih keanggotaan dan mulai dari kelas pertama.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={waUrl("Halo, saya ingin bergabung dengan AIGYPT")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-xl transition-all duration-300"
              style={{ background: "#7C3AED", boxShadow: "0 0 24px rgba(124,58,237,0.35)" }}
            >
              Lihat Keanggotaan
            </a>
            <Link href="/login">
              <span
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium rounded-xl cursor-pointer transition-all duration-300 hover:text-white"
                style={{ border: "1px solid rgba(255,255,255,0.1)", color: "#A1A1AA" }}
              >
                Mulai Belajar
              </span>
            </Link>
          </motion.div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
