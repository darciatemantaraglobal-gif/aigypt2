import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// ─── Data ─────────────────────────────────────────────────────────────────────

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

const weeks = [
  { week: "Minggu 1", phase: "Fondasi" },
  { week: "Minggu 2", phase: "Keterampilan" },
  { week: "Minggu 3", phase: "Penerapan" },
  { week: "Minggu 4", phase: "Produksi" },
  { week: "Minggu 5", phase: "Penciptaan" },
  { week: "Minggu 6", phase: "Pembuktian" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const stagger = (delay = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: delay } },
});

function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
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

// ─── Session Row ──────────────────────────────────────────────────────────────

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
          {/* Session number */}
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

          {/* Title + essence */}
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

          {/* Toggle icon */}
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
                {/* Mastery list */}
                <div className="mb-6">
                  <p
                    className="font-mono text-xs mb-4 tracking-widest"
                    style={{ color: "#52525B", letterSpacing: "0.12em" }}
                  >
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
                        <span
                          className="flex-shrink-0 mt-1.5 font-mono text-xs"
                          style={{ color: "rgba(124,58,237,0.6)" }}
                        >
                          —
                        </span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Tools */}
                <div className="mb-6">
                  <p
                    className="font-mono text-xs mb-3 tracking-widest"
                    style={{ color: "#52525B", letterSpacing: "0.12em" }}
                  >
                    TOOLS
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {session.tools.map((tool) => (
                      <span
                        key={tool}
                        className="font-mono text-xs px-3 py-1 rounded-full transition-all duration-200 hover:border-purple-500/50"
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

                {/* Mission */}
                <div
                  className="rounded-lg px-5 py-4"
                  style={{
                    background: "rgba(124,58,237,0.06)",
                    border: "1px solid rgba(124,58,237,0.18)",
                  }}
                >
                  <p
                    className="font-mono text-xs mb-2 tracking-widest"
                    style={{ color: "#7C3AED", letterSpacing: "0.12em" }}
                  >
                    MISI MINGGU INI
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "#D4D4D8" }}>
                    {session.mission}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Kurikulum() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen" style={{ background: "#060608", color: "#FAFAFA" }}>
      <Navbar />

      {/* ── SECTION 1: HERO ── */}
      <section className="relative overflow-hidden pt-28 pb-24 sm:pt-36 sm:pb-32">
        {/* Background glow */}
        <div
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
        />
        {/* Grid dots */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: "radial-gradient(rgba(124,58,237,0.15) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <RevealSection className="relative max-w-5xl mx-auto px-6 sm:px-10 text-center">
          <motion.p
            variants={fadeUp}
            className="font-mono text-xs tracking-widest mb-6"
            style={{ color: "#7C3AED", letterSpacing: "0.2em" }}
          >
            KURIKULUM · BATCH 01
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-display font-semibold leading-tight mb-8"
            style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)", letterSpacing: "-0.02em" }}
          >
            Enam Minggu yang
            <br />
            <span style={{ color: "#A855F7" }}>Mengubah Caramu Bekerja</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-12"
            style={{ color: "#A1A1AA", fontWeight: 300 }}
          >
            Sebuah perjalanan terkurasi dari memahami kecerdasan buatan,
            hingga membangun solusi nyata dengan tanganmu sendiri.
            Setiap sesi dirancang untuk membawamu satu tingkat lebih tinggi.
          </motion.p>

          {/* Metrics */}
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-0 rounded-full overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            {[
              { val: "6", label: "SESI" },
              { val: "60 MENIT", label: "PER SESI" },
              { val: "1", label: "KARYA NYATA" },
            ].map((m, i) => (
              <div key={i} className="flex items-center">
                {i > 0 && (
                  <div className="self-stretch w-px" style={{ background: "rgba(255,255,255,0.06)" }} />
                )}
                <div
                  className="px-6 py-3 sm:px-8 sm:py-4 text-center"
                  style={{ background: "rgba(10,10,15,0.8)" }}
                >
                  <span className="font-mono font-bold text-white text-sm sm:text-base block">{m.val}</span>
                  <span
                    className="font-mono text-xs block mt-0.5 tracking-widest"
                    style={{ color: "#52525B", letterSpacing: "0.1em" }}
                  >
                    {m.label}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </RevealSection>
      </section>

      {/* ── SECTION 2: FILOSOFI ── */}
      <section className="py-20 sm:py-28">
        <RevealSection className="max-w-3xl mx-auto px-6 sm:px-10 text-center">
          <motion.p
            variants={fadeUp}
            className="font-mono text-xs tracking-widest mb-8"
            style={{ color: "#52525B", letterSpacing: "0.2em" }}
          >
            PRINSIP DI BALIK KURIKULUM
          </motion.p>
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
            className="text-base leading-relaxed"
            style={{ color: "#71717A", fontWeight: 300 }}
          >
            Setiap sesi dibangun di atas sesi sebelumnya — dari fondasi mental,
            menuju keterampilan, lalu penerapan, dan akhirnya penciptaan.
            Di akhir perjalanan, kamu tidak hanya tahu cara menggunakan AI.
            Kamu telah membangun sesuatu yang nyata, lahir dari masalahmu sendiri.
          </motion.p>
        </RevealSection>
      </section>

      {/* Hairline divider */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <div style={{ height: "1px", background: "rgba(255,255,255,0.05)" }} />
      </div>

      {/* ── SECTION 3: ALUR PERJALANAN ── */}
      <section className="py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <RevealSection>
            <motion.p
              variants={fadeUp}
              className="font-mono text-xs tracking-widest mb-4 text-center"
              style={{ color: "#52525B", letterSpacing: "0.2em" }}
            >
              ALUR TRANSFORMASI
            </motion.p>
          </RevealSection>

          {/* Desktop: horizontal arc */}
          <div className="hidden sm:block relative mt-12">
            {/* Connecting line */}
            <PhaseConnector count={phases.length} />

            <div className="flex items-start justify-between gap-2">
              {phases.map((phase, i) => (
                <PhaseNode key={i} phase={phase} index={i} />
              ))}
            </div>
          </div>

          {/* Mobile: vertical */}
          <div className="sm:hidden mt-10 space-y-0">
            {phases.map((phase, i) => (
              <MobilePhaseNode key={i} phase={phase} index={i} isLast={i === phases.length - 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Hairline divider */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <div style={{ height: "1px", background: "rgba(255,255,255,0.05)" }} />
      </div>

      {/* ── SECTION 4: ENAM SESI ── */}
      <section className="py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <RevealSection className="mb-12">
            <motion.p
              variants={fadeUp}
              className="font-mono text-xs tracking-widest mb-4 text-center"
              style={{ color: "#52525B", letterSpacing: "0.2em" }}
            >
              ENAM SESI
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display font-semibold text-center"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "#FAFAFA", letterSpacing: "-0.01em" }}
            >
              Peta Perjalananmu
            </motion.h2>
          </RevealSection>

          {/* Session rows */}
          <div
            className="rounded-xl overflow-hidden"
            style={{
              border: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(16,16,24,0.6)",
            }}
          >
            {sessions.map((session, i) => (
              <SessionRow key={session.num} session={session} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Hairline divider */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <div style={{ height: "1px", background: "rgba(255,255,255,0.05)" }} />
      </div>

      {/* ── SECTION 5: RITME MINGGUAN ── */}
      <section className="py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <RevealSection className="text-center mb-16">
            <motion.p
              variants={fadeUp}
              className="font-mono text-xs tracking-widest mb-4"
              style={{ color: "#52525B", letterSpacing: "0.2em" }}
            >
              RITME ENAM MINGGU
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display font-semibold"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", letterSpacing: "-0.01em" }}
            >
              Satu Sesi, Satu Minggu,{" "}
              <span style={{ color: "#A855F7" }}>Satu Lompatan</span>
            </motion.h2>
          </RevealSection>

          {/* Timeline */}
          <WeekTimeline />
        </div>
      </section>

      {/* Hairline divider */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <div style={{ height: "1px", background: "rgba(255,255,255,0.05)" }} />
      </div>

      {/* ── SECTION 6: CTA ── */}
      <section className="relative py-28 sm:py-36 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(124,58,237,0.1) 0%, transparent 70%)",
          }}
        />
        <RevealSection className="relative max-w-2xl mx-auto px-6 sm:px-10 text-center">
          <motion.h2
            variants={fadeUp}
            className="font-display font-semibold mb-5"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.02em" }}
          >
            Perjalananmu menanti.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-base mb-10"
            style={{ color: "#71717A", fontWeight: 300 }}
          >
            Pelajari pilihan keanggotaan dan amankan tempatmu di Batch 01.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setLocation("/")}
              className="relative inline-flex items-center justify-center px-8 py-3.5 rounded-full font-display font-semibold text-sm text-white transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
                boxShadow: "0 0 30px rgba(124,58,237,0.35), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 50px rgba(124,58,237,0.55), inset 0 1px 0 rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 30px rgba(124,58,237,0.35), inset 0 1px 0 rgba(255,255,255,0.1)";
              }}
            >
              Lihat Keanggotaan
            </button>
            <button
              onClick={() => setLocation("/")}
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-display font-medium text-sm transition-all duration-300"
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#A1A1AA",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)";
                (e.currentTarget as HTMLElement).style.color = "#FAFAFA";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                (e.currentTarget as HTMLElement).style.color = "#A1A1AA";
              }}
            >
              Kembali ke Beranda
            </button>
          </motion.div>
        </RevealSection>
      </section>

      <Footer />
    </div>
  );
}

// ─── Phase Connector (Desktop) ────────────────────────────────────────────────

function PhaseConnector({ count }: { count: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="absolute top-5 left-0 right-0 flex items-center px-10">
      {Array.from({ length: count - 1 }).map((_, i) => (
        <motion.div
          key={i}
          className="flex-1 mx-1"
          initial={{ scaleX: 0, originX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: "1px",
            background: "linear-gradient(90deg, rgba(124,58,237,0.5), rgba(168,85,247,0.5))",
            transformOrigin: "left",
          }}
        />
      ))}
    </div>
  );
}

function PhaseNode({ phase, index }: { phase: typeof phases[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.12 }}
      className="flex-1 flex flex-col items-center text-center gap-3"
    >
      {/* Dot */}
      <div className="relative z-10">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{
            border: "1px solid rgba(124,58,237,0.4)",
            background: "rgba(124,58,237,0.12)",
            boxShadow: "0 0 16px rgba(124,58,237,0.2)",
          }}
        >
          <span className="font-mono text-xs font-bold" style={{ color: "#A855F7" }}>
            {phase.num}
          </span>
        </div>
      </div>

      <div>
        <p
          className="font-mono font-bold text-xs mb-1 tracking-widest"
          style={{ color: "#7C3AED", letterSpacing: "0.12em" }}
        >
          {phase.label}
        </p>
        <p className="text-xs leading-relaxed max-w-[120px]" style={{ color: "#71717A" }}>
          {phase.desc}
        </p>
      </div>
    </motion.div>
  );
}

function MobilePhaseNode({
  phase,
  index,
  isLast,
}: {
  phase: typeof phases[0];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -12 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="flex gap-4"
    >
      {/* Left: dot + line */}
      <div className="flex flex-col items-center">
        <div
          className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
          style={{
            border: "1px solid rgba(124,58,237,0.4)",
            background: "rgba(124,58,237,0.12)",
            boxShadow: "0 0 12px rgba(124,58,237,0.18)",
          }}
        >
          <span className="font-mono text-xs font-bold" style={{ color: "#A855F7" }}>
            {phase.num}
          </span>
        </div>
        {!isLast && (
          <div
            className="w-px flex-1 my-2"
            style={{ background: "linear-gradient(180deg, rgba(124,58,237,0.35), transparent)" }}
          />
        )}
      </div>

      {/* Content */}
      <div className="pb-6">
        <p
          className="font-mono font-bold text-xs mb-1 tracking-widest"
          style={{ color: "#7C3AED", letterSpacing: "0.12em" }}
        >
          {phase.label}
        </p>
        <p className="text-xs leading-relaxed" style={{ color: "#71717A" }}>
          {phase.desc}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Week Timeline ─────────────────────────────────────────────────────────────

function WeekTimeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref}>
      {/* Desktop */}
      <div className="hidden sm:flex items-start gap-0">
        {weeks.map((w, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex-1 flex flex-col items-center text-center"
          >
            {/* Dot + connector */}
            <div className="relative w-full flex items-center justify-center mb-4">
              {/* Left line */}
              {i > 0 && (
                <div
                  className="absolute right-1/2 top-1/2 -translate-y-1/2 mr-3"
                  style={{
                    left: 0,
                    height: "1px",
                    background: "rgba(124,58,237,0.25)",
                  }}
                />
              )}
              {/* Right line */}
              {i < weeks.length - 1 && (
                <div
                  className="absolute left-1/2 top-1/2 -translate-y-1/2 ml-3"
                  style={{
                    right: 0,
                    height: "1px",
                    background: "rgba(124,58,237,0.25)",
                  }}
                />
              )}
              {/* Dot */}
              <div
                className="relative z-10 w-3 h-3 rounded-full"
                style={{
                  background: "#7C3AED",
                  boxShadow: "0 0 10px rgba(124,58,237,0.6)",
                }}
              />
            </div>

            <p className="font-mono text-xs mb-1" style={{ color: "#52525B" }}>
              {w.week}
            </p>
            <p
              className="font-display font-semibold text-sm"
              style={{ color: "#A855F7" }}
            >
              {w.phase}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Mobile */}
      <div className="sm:hidden space-y-4">
        {weeks.map((w, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.35, delay: i * 0.07 }}
            className="flex items-center gap-4 px-2"
          >
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: "#7C3AED", boxShadow: "0 0 8px rgba(124,58,237,0.5)" }}
            />
            <span className="font-mono text-xs" style={{ color: "#52525B" }}>
              {w.week}
            </span>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
            <span className="font-display font-semibold text-sm" style={{ color: "#A855F7" }}>
              {w.phase}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
