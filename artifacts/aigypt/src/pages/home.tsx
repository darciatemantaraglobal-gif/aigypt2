import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { motion, useInView, AnimatePresence, useReducedMotion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { waUrl } from "@/lib/wa";
import { testimonials } from "@/lib/testimonials";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const stagger = (delay = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: delay } },
});

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger(delay)}
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

// ─── Count-up Hook ────────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 800, inView = false) {
  const [count, setCount] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (prefersReduced) { setCount(target); return; }
    let startTime: number | null = null;
    let latestId = 0;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        latestId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };
    latestId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(latestId);
  }, [inView, target, duration, prefersReduced]);

  return count;
}

// ─── Icons ─────────────────────────────────────────────────────────────────────

function IconBrain() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2a2.5 2.5 0 0 1 5 0v.5a.5.5 0 0 0 .5.5H16a2 2 0 0 1 2 2v.5a2.5 2.5 0 0 1 0 5V11a2 2 0 0 1-2 2h-.5a.5.5 0 0 0-.5.5V14a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-.5a.5.5 0 0 0-.5-.5H8a2 2 0 0 1-2-2v-.5a2.5 2.5 0 0 1 0-5V5a2 2 0 0 1 2-2h.5a.5.5 0 0 0 .5-.5V2z" />
    </svg>
  );
}

function IconMessage() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function IconBook() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconTrending() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

function IconCode() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IconPen() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>
  );
}

function IconMic() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="2" width="6" height="11" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/>
    </svg>
  );
}

function IconShop() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  );
}

function IconLightbulb() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17H8v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z"/>
    </svg>
  );
}

function IconMonitor() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  );
}

// ─── FAQ Component ─────────────────────────────────────────────────────────────

const faqs = [
  {
    q: "Apakah saya perlu bisa memprogram sebelumnya?",
    a: "Tidak sama sekali. AIGYPT dirancang untuk membawamu dari nol. Kamu akan mencipta tanpa perlu menjadi programmer.",
  },
  {
    q: "Apa itu format Hybrid?",
    a: "Ada jadwal mentoring live bersama mentor setiap minggunya. Tapi seluruh materi sudah terbuka sejak hari pertama — kamu bisa belajar kapan saja sesuai waktumu.",
  },
  {
    q: "Berapa peserta per batch?",
    a: "Sengaja dibatasi untuk menjaga kualitas bimbingan. Setiap peserta berhak mendapat perhatian yang penuh.",
  },
  {
    q: "Apakah materi bisa diakses setelah batch selesai?",
    a: "Selamanya. Aksesmu tidak memiliki tanggal kedaluwarsa.",
  },
  {
    q: "Apa perbedaan Member Mandiri dan Member Kelas?",
    a: "Member Mandiri mendapat akses penuh materi untuk belajar mandiri. Member Kelas mendapat semua itu, ditambah mentoring live, komunitas batch, dan sertifikat penyelesaian.",
  },
  {
    q: "Bagaimana jika saya merasa belum siap?",
    a: "Justru itu alasan terbaik untuk mulai sekarang. AIGYPT dirancang dari nol — tidak ada prasyarat selain kemauan untuk belajar. Yang menunggu 'siap' biasanya menunggu selamanya.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="cursor-pointer group"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-start justify-between gap-4 py-5">
        <p className="text-sm sm:text-base font-medium text-white leading-relaxed">{q}</p>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.22, ease: "easeInOut" }}
          className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full border flex items-center justify-center transition-colors duration-300"
          style={{
            borderColor: open ? "rgba(124,58,237,0.6)" : "rgba(255,255,255,0.1)",
            color: open ? "#A855F7" : "#52525B",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.div>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="faq-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p className="text-sm leading-relaxed pb-5" style={{ color: "#A1A1AA" }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Showcase Section ──────────────────────────────────────────────────────────

const showcaseTabs = [
  {
    id: "akademisi",
    label: "Akademisi",
    icon: <IconPen />,
    before: "Stuck nulis pendahuluan makalah. Dua jam, baru dapat satu paragraf.",
    after: "Outline lengkap 5 bab + draft pendahuluan + rekomendasi referensi kitab.",
    time: "~10 MENIT",
    extraBadge: null,
  },
  {
    id: "organisator",
    label: "Organisator",
    icon: <IconMic />,
    before: "Notulensi rapat dua jam. Nulisnya sejam sendiri, banyak yang kelewat.",
    after: "Rekam rapat, transkrip otomatis, lalu notulensi rapi plus action items per orang.",
    time: "~5 MENIT",
    extraBadge: null,
  },
  {
    id: "pebisnis",
    label: "Pebisnis",
    icon: <IconShop />,
    before: "Bingung bikin caption jualan. Itu-itu saja. Tidak ada yang beli.",
    after: "5 variasi caption dengan pendekatan berbeda — storytelling, urgency, testimoni.",
    time: "~30 DETIK",
    extraBadge: null,
  },
  {
    id: "kreator",
    label: "Kreator",
    icon: <IconLightbulb />,
    before: "Kehabisan ide konten. Sudah seminggu tidak posting.",
    after: "30 ide konten terkategorisasi, lengkap hook pembuka dan poin utama.",
    time: "~1 MENIT",
    extraBadge: null,
  },
  {
    id: "vibe-coding",
    label: "Vibe Coding",
    icon: <IconMonitor />,
    before: "Ingin ada aplikasi pencatat keuangan organisasi, tapi tidak mengerti coding.",
    after: "Deskripsikan yang kamu mau — aplikasi web jadi, siap dipakai.",
    time: "~15 MENIT",
    extraBadge: "TANPA SATU BARIS KODE",
  },
];

function ShowcaseSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const prefersReduced = useReducedMotion();

  const contentVariants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 10 },
    visible: { opacity: 1, y: 0, transition: { duration: prefersReduced ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
    exit: { opacity: 0, y: prefersReduced ? 0 : -8, transition: { duration: prefersReduced ? 0 : 0.18 } },
  };

  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

  return (
    <section className="py-[48px] sm:py-[80px]" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <Reveal className="text-center mb-12">
          <SectionLabel>BUKAN SEKADAR TEORI</SectionLabel>
          <motion.h2
            variants={fadeUp}
            className="font-display font-semibold mb-4"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", letterSpacing: "-0.015em" }}
          >
            Lihat Apa yang Bisa Kamu{" "}
            <span style={{ color: "#A855F7" }}>Ciptakan</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-sm sm:text-base max-w-xl mx-auto leading-relaxed"
            style={{ color: "#71717A", fontWeight: 300 }}
          >
            Ini bukan klaim. Ini yang benar-benar bisa kamu hasilkan setelah memahami cara memanfaatkan AI dengan tepat.
          </motion.p>
        </Reveal>

        {/* ── Desktop: Tab selector ── */}
        <div className="hidden sm:block">
          {/* Tab buttons */}
          <Reveal className="flex gap-2 mb-8 flex-wrap justify-center">
            {showcaseTabs.map((tab, i) => (
              <motion.button
                key={tab.id}
                variants={fadeUp}
                onClick={() => setActiveTab(i)}
                className="flex items-center gap-2 font-mono text-xs tracking-widest px-4 py-2.5 rounded-full transition-all duration-200 cursor-pointer"
                style={
                  activeTab === i
                    ? {
                        background: "rgba(124,58,237,0.2)",
                        color: "#A855F7",
                        border: "1px solid rgba(124,58,237,0.4)",
                      }
                    : {
                        background: "rgba(255,255,255,0.03)",
                        color: "#52525B",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }
                }
              >
                <span style={{ opacity: activeTab === i ? 1 : 0.5 }}>{tab.icon}</span>
                {tab.label.toUpperCase()}
              </motion.button>
            ))}
          </Reveal>

          {/* Tab content */}
          <div className="relative" style={{ minHeight: "220px" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid grid-cols-2 gap-4"
              >
                {/* Sebelum */}
                <div
                  className="p-6 rounded-xl"
                  style={{
                    background: "rgba(10,10,15,0.5)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <p className="font-mono text-xs tracking-widest mb-4" style={{ color: "#3F3F46", letterSpacing: "0.15em" }}>
                    SEBELUM
                  </p>
                  <p className="text-base leading-relaxed" style={{ color: "#52525B" }}>
                    "{showcaseTabs[activeTab].before}"
                  </p>
                </div>

                {/* Dengan AI */}
                <motion.div
                  className="p-6 rounded-xl relative overflow-hidden"
                  style={{
                    background: "rgba(16,12,28,0.9)",
                    border: "1px solid rgba(124,58,237,0.25)",
                  }}
                  animate={prefersReduced ? {} : {
                    boxShadow: [
                      "0 0 0px rgba(124,58,237,0)",
                      "0 0 20px rgba(124,58,237,0.15)",
                      "0 0 0px rgba(124,58,237,0)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.5), transparent)" }}
                  />
                  <p className="font-mono text-xs tracking-widest mb-4" style={{ color: "#A855F7", letterSpacing: "0.15em" }}>
                    DENGAN AI
                  </p>
                  <p className="text-base leading-relaxed text-white mb-5">
                    {showcaseTabs[activeTab].after}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <motion.span
                      className="font-mono text-xs font-bold px-3 py-1.5 rounded-full"
                      style={{
                        background: "rgba(124,58,237,0.2)",
                        color: "#A855F7",
                        border: "1px solid rgba(124,58,237,0.35)",
                      }}
                      initial={{ scale: prefersReduced ? 1 : 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.15, duration: prefersReduced ? 0 : 0.22, ease: "backOut" }}
                    >
                      {showcaseTabs[activeTab].time}
                    </motion.span>
                    {showcaseTabs[activeTab].extraBadge && (
                      <motion.span
                        className="font-mono text-xs px-3 py-1.5 rounded-full"
                        style={{
                          background: "rgba(16,185,129,0.12)",
                          color: "#34D399",
                          border: "1px solid rgba(16,185,129,0.25)",
                        }}
                        initial={{ scale: prefersReduced ? 1 : 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.25, duration: prefersReduced ? 0 : 0.22, ease: "backOut" }}
                      >
                        {showcaseTabs[activeTab].extraBadge}
                      </motion.span>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Mobile: Accordion ── */}
        <div className="sm:hidden">
          {showcaseTabs.map((tab, i) => (
            <div
              key={tab.id}
              className="mb-3 rounded-xl overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <button
                className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left cursor-pointer"
                style={{
                  background: openAccordion === i ? "rgba(20,12,36,0.9)" : "rgba(10,10,15,0.6)",
                }}
                onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
              >
                <div className="flex items-center gap-3">
                  <span style={{ color: "#A855F7" }}>{tab.icon}</span>
                  <span className="font-mono text-xs tracking-widest font-bold" style={{ color: openAccordion === i ? "#A855F7" : "#71717A", letterSpacing: "0.15em" }}>
                    {tab.label.toUpperCase()}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: openAccordion === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ color: "#52525B" }}
                >
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {openAccordion === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="px-5 pb-5 space-y-4">
                      <div className="p-4 rounded-xl" style={{ background: "rgba(6,6,10,0.6)", border: "1px solid rgba(255,255,255,0.04)" }}>
                        <p className="font-mono text-xs tracking-widest mb-2" style={{ color: "#3F3F46" }}>SEBELUM</p>
                        <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>"{tab.before}"</p>
                      </div>
                      <div className="p-4 rounded-xl relative" style={{ background: "rgba(16,12,28,0.9)", border: "1px solid rgba(124,58,237,0.25)" }}>
                        <p className="font-mono text-xs tracking-widest mb-2" style={{ color: "#A855F7" }}>DENGAN AI</p>
                        <p className="text-sm leading-relaxed text-white mb-4">{tab.after}</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="font-mono text-xs font-bold px-3 py-1 rounded-full" style={{ background: "rgba(124,58,237,0.2)", color: "#A855F7", border: "1px solid rgba(124,58,237,0.35)" }}>
                            {tab.time}
                          </span>
                          {tab.extraBadge && (
                            <span className="font-mono text-xs px-3 py-1 rounded-full" style={{ background: "rgba(16,185,129,0.12)", color: "#34D399", border: "1px solid rgba(16,185,129,0.25)" }}>
                              {tab.extraBadge}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* ── Grid ringkas (semua 5 sekaligus) ── */}
        <div ref={gridRef} className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {showcaseTabs.map((tab, i) => (
            <motion.div
              key={tab.id}
              className="p-4 rounded-xl group cursor-default"
              style={{
                background: "rgba(10,10,15,0.6)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
              initial={{ opacity: 0, y: prefersReduced ? 0 : 18 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: prefersReduced ? 0 : i * 0.09, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ borderColor: "rgba(124,58,237,0.3)", scale: prefersReduced ? 1 : 1.02 }}
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-lg mb-3" style={{ background: "rgba(124,58,237,0.1)", color: "#A855F7" }}>
                {tab.icon}
              </div>
              <p className="font-display font-semibold text-white text-xs mb-1">{tab.label}</p>
              <p className="text-xs leading-relaxed mb-3" style={{ color: "#52525B" }}>
                {tab.after.split(" ").slice(0, 8).join(" ")}…
              </p>
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(124,58,237,0.15)", color: "#A855F7", border: "1px solid rgba(124,58,237,0.2)" }}>
                {tab.time}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Penutup section */}
        <Reveal className="text-center mt-10">
          <motion.p
            variants={fadeUp}
            className="font-mono text-xs tracking-widest"
            style={{ color: "#3F3F46", letterSpacing: "0.2em" }}
          >
            DAN INI HANYA PERMULAAN DARI APA YANG AKAN KAMU PELAJARI
          </motion.p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Testimoni Section ─────────────────────────────────────────────────────────

function TestimoniSection() {
  const isPlaceholder = testimonials.some(
    (t) =>
      t.name === "GANTI_NAMA" ||
      t.quote.startsWith("GANTI_") ||
      t.result === "GANTI_DENGAN_HASIL_KONKRET" ||
      t.role === "GANTI_PERAN"
  );

  return (
    <section className="py-[48px] sm:py-[80px]" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <Reveal className="text-center mb-12">
          <SectionLabel>DARI MEREKA YANG SUDAH MENCOBA</SectionLabel>
          <motion.h2
            variants={fadeUp}
            className="font-display font-semibold"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", letterSpacing: "-0.015em" }}
          >
            Bukan Kami yang Bilang.{" "}
            <span style={{ color: "#A855F7" }}>Mereka yang Membuktikan.</span>
          </motion.h2>
        </Reveal>

        <Reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="relative p-6 flex flex-col group"
              style={{
                background: "rgba(12,10,20,0.7)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "14px",
                backdropFilter: "blur(12px)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
              }}
            >
              {/* Decorative quote mark */}
              <div
                className="absolute top-4 right-5 font-display font-bold leading-none transition-opacity duration-300 group-hover:opacity-30"
                style={{ fontSize: "5rem", color: "rgba(124,58,237,0.12)", lineHeight: 1, userSelect: "none" }}
              >
                "
              </div>

              {/* Result badge */}
              {t.result !== "GANTI_DENGAN_HASIL_KONKRET" && (
                <div
                  className="inline-flex self-start font-mono text-xs px-3 py-1 rounded-full mb-4"
                  style={{ background: "rgba(124,58,237,0.12)", color: "#A855F7", border: "1px solid rgba(124,58,237,0.2)" }}
                >
                  {t.result}
                </div>
              )}

              <p className="text-sm leading-[1.85] flex-1 mb-5 relative z-10" style={{ color: "#A1A1AA" }}>
                "{t.quote}"
              </p>

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1rem" }}>
                <p className="font-display font-semibold text-white text-sm">{t.name}</p>
                <p className="font-mono text-xs mt-0.5" style={{ color: "#52525B" }}>{t.role}</p>
              </div>
            </motion.div>
          ))}
        </Reveal>

        {/* Watermark jika masih placeholder */}
        {isPlaceholder && (
          <Reveal className="text-center mt-6">
            <motion.p
              variants={fadeUp}
              className="font-mono text-xs tracking-widest inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{ color: "#3F3F46", border: "1px dashed rgba(63,63,70,0.4)", letterSpacing: "0.12em" }}
            >
              <span style={{ color: "#52525B" }}>○</span>
              Contoh testimoni, akan diperbarui
            </motion.p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

// ─── Stat Item dengan Count-up ─────────────────────────────────────────────────

function StatItem({ value, suffix, label, inView }: { value: number; suffix: string; label: string; inView: boolean }) {
  const count = useCountUp(value, 800, inView);
  return (
    <div className="text-center">
      <p className="font-mono font-bold mb-1" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "#A855F7" }}>
        {count}{suffix}
      </p>
      <p className="font-mono text-xs tracking-widest" style={{ color: "#52525B", letterSpacing: "0.12em" }}>{label}</p>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  const statRef = useRef(null);
  const statInView = useInView(statRef, { once: true, margin: "-60px" });

  return (
    <div className="min-h-screen" style={{ background: "#060608", color: "#FAFAFA" }}>
      <Navbar />

      {/* ══ SECTION 1: HERO ══ */}
      <section className="relative overflow-hidden pt-[80px] pb-[80px] sm:pt-[100px] sm:pb-[100px]">
        {/* Breathing glow */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            top: "-15%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "80vw",
            height: "70vh",
            background: "radial-gradient(ellipse at center, rgba(124,58,237,0.14) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
          animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.05, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: "radial-gradient(rgba(124,58,237,0.2) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <Reveal className="relative max-w-5xl mx-auto px-6 sm:px-10 text-center">
          <motion.p
            variants={fadeUp}
            className="font-mono text-xs tracking-widest mb-8 inline-flex items-center gap-2"
            style={{ color: "#7C3AED", letterSpacing: "0.2em" }}
          >
            PLATFORM PEMBELAJARAN AI UNTUK MAHASISWA INDONESIA DI MESIR
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-display font-semibold leading-[1.05] mb-8"
            style={{ fontSize: "clamp(2.75rem, 7vw, 5.5rem)", letterSpacing: "-0.025em" }}
          >
            Kuasai Kecerdasan
            <br />
            <span style={{ color: "#A855F7" }}>Buatan.</span>{" "}
            <span style={{ color: "rgba(250,250,250,0.85)" }}>Ciptakan</span>
            <br />
            <span style={{ color: "rgba(250,250,250,0.85)" }}>Sesuatu yang Nyata.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8"
            style={{ color: "#A1A1AA", fontWeight: 300 }}
          >
            AIGYPT adalah platform yang mengajarkan cara memanfaatkan AI secara mendalam —
            bukan sekadar menggunakannya, tapi menjadikannya alat untuk menciptakan karya dan solusi nyata.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="inline-flex flex-col items-center gap-1 mb-4 px-5 py-3 rounded-xl"
            style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)" }}
          >
            <span className="font-mono text-xs font-bold tracking-widest" style={{ color: "#A855F7", letterSpacing: "0.15em" }}>BATCH 1 · PENDAFTARAN DIBUKA</span>
            <span className="font-mono text-xs" style={{ color: "#71717A" }}>Kelas dimulai 5 Juli 2026 · Tempat sangat terbatas</span>
          </motion.div>

          {/* Tambahan: Angkatan Pertama */}
          <motion.div variants={fadeUp} className="mb-10">
            <span className="font-mono text-xs tracking-widest" style={{ color: "#52525B", letterSpacing: "0.2em" }}>
              ANGKATAN PERTAMA · JADILAH YANG LEBIH DULU MENGUASAINYA
            </span>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <Link href="/daftar">
              <span
                className="inline-flex items-center gap-2 text-base font-medium text-white transition-all duration-200 cursor-pointer"
                style={{
                  background: "#7C3AED",
                  borderRadius: "12px",
                  padding: "15px 24px",
                  minHeight: "48px",
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
                }}
              >
                Daftar Batch 1 Sekarang <IconArrow />
              </span>
            </Link>
            <Link href="/kurikulum">
              <span
                className="inline-flex items-center gap-2 text-base font-normal cursor-pointer transition-all duration-200 hover:text-white"
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#A1A1AA",
                  borderRadius: "12px",
                  padding: "15px 24px",
                  minHeight: "48px",
                }}
              >
                Jelajahi Kurikulum
              </span>
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="inline-flex flex-wrap items-center justify-center gap-6"
          >
            {["6 SESI", "60 MENIT/SESI", "HYBRID", "SEMUA LEVEL"].map((t) => (
              <span key={t} className="font-mono text-xs tracking-widest" style={{ color: "#52525B", letterSpacing: "0.15em" }}>
                {t}
              </span>
            ))}
          </motion.div>
        </Reveal>
      </section>

      {/* ══ SECTION 2: VISI / MANIFESTO ══ */}
      <section className="py-[48px] sm:py-[80px]" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <Reveal className="max-w-4xl mx-auto px-6 sm:px-10 text-center">
          <SectionLabel>MENGAPA AIGYPT ADA</SectionLabel>
          <motion.h2
            variants={fadeUp}
            className="font-display font-semibold leading-tight mb-10"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", letterSpacing: "-0.015em" }}
          >
            Banyak yang sudah menggunakan AI.
            <br />
            <span style={{ color: "#A855F7" }}>Sedikit yang benar-benar menguasainya.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-base leading-[1.9] max-w-2xl mx-auto"
            style={{ color: "#71717A", fontWeight: 300 }}
          >
            Ada jarak antara memakai AI dan menguasainya. Yang pertama mengikuti apa yang disuguhkan.
            Yang kedua menentukan apa yang ingin diciptakan.
            <br /><br />
            AIGYPT hadir untuk menutup jarak itu — dengan kurikulum yang dirancang dari kebutuhan nyata,
            bukan teori generik. Tempat belajar yang membuatmu tidak hanya paham AI, tapi mampu membangun
            sesuatu dengan tanganmu sendiri.
          </motion.p>
        </Reveal>
      </section>

      {/* ══ SECTION 3: SPEKTRUM PEMBELAJARAN ══ */}
      <section className="py-[48px] sm:py-[80px]">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <Reveal className="text-center mb-16">
            <SectionLabel>APA YANG AKAN KAMU PELAJARI</SectionLabel>
            <motion.h2
              variants={fadeUp}
              className="font-display font-semibold"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", letterSpacing: "-0.015em" }}
            >
              Satu Platform,{" "}
              <span style={{ color: "#A855F7" }}>Tak Terbatas Kemungkinan</span>
            </motion.h2>
          </Reveal>

          <Reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: <IconBrain />,
                title: "Fondasi & Mindset AI",
                desc: "Memahami cara kerja AI dengan jernih — tanpa jargon, tanpa mitos. Fondasi yang mengubah cara kamu memandangnya.",
              },
              {
                icon: <IconMessage />,
                title: "Seni Prompting",
                desc: "Keterampilan inti yang membedakan pengguna biasa dan yang mahir. Berdialog dengan AI untuk hasil yang benar-benar berguna.",
              },
              {
                icon: <IconBook />,
                title: "AI untuk Keperluan Akademik",
                desc: "Menulis lebih baik, memahami referensi lebih cepat, dan memperkuat argumen penelitianmu.",
              },
              {
                icon: <IconUsers />,
                title: "AI untuk Organisasi & Manajemen",
                desc: "Dari perencanaan acara, dokumentasi, hingga komunikasi — semua lebih terstruktur dan efisien.",
              },
              {
                icon: <IconTrending />,
                title: "AI untuk Bisnis & Konten",
                desc: "Riset, copywriting, produksi konten, dan strategi — dengan kecepatan dan kualitas yang berbeda.",
              },
              {
                icon: <IconCode />,
                title: "Vibe Coding",
                desc: "Membangun aplikasi dan solusi nyata dari masalahmu — tanpa perlu menjadi programmer.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group relative p-5 transition-all duration-300 cursor-default"
                style={{
                  background: "rgba(16,16,24,0.6)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "12px",
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
                }}
                whileHover={{
                  borderColor: "rgba(124,58,237,0.3)",
                  background: "rgba(20,20,32,0.8)",
                }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center mb-5 transition-colors duration-300 group-hover:bg-purple-500/20"
                  style={{ background: "rgba(124,58,237,0.1)", color: "#A855F7", borderRadius: "14px" }}
                >
                  {item.icon}
                </div>
                <h3 className="font-display font-semibold text-white text-base mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#71717A" }}>{item.desc}</p>
              </motion.div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ══ [BARU] SHOWCASE ══ */}
      <ShowcaseSection />

      {/* ══ [BARU] TESTIMONI ══ */}
      <TestimoniSection />

      {/* ══ SECTION 4: MENGAPA AIGYPT ══ */}
      <section
        className="py-[48px] sm:py-[80px]"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}
      >
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <Reveal className="mb-16">
            <SectionLabel>UNTUK SIAPA AIGYPT DIRANCANG</SectionLabel>
            <motion.h2
              variants={fadeUp}
              className="font-display font-semibold"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", letterSpacing: "-0.015em" }}
            >
              Apapun Kesibukanmu,{" "}
              <span style={{ color: "#A855F7" }}>AI Bisa Membantumu Lebih</span>
            </motion.h2>
          </Reveal>

          <Reveal className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-12">
            {[
              {
                num: "01",
                title: "Sang Akademisi",
                desc: "Bergelut dengan tugas, makalah, dan riset. AI menjadi asisten yang membantu kamu berpikir lebih dalam dan bekerja lebih cepat.",
              },
              {
                num: "02",
                title: "Sang Organisator",
                desc: "Mengelola kepanitiaan, acara, dan publikasi. Dari proposal hingga laporan — semua menjadi lebih ringan dan rapi.",
              },
              {
                num: "03",
                title: "Sang Pebisnis",
                desc: "Membangun usaha dengan sumber daya terbatas. AI menjadi mitra yang memperbesar dampakmu tanpa menambah bebanmu.",
              },
              {
                num: "04",
                title: "Sang Kreator",
                desc: "Memproduksi konten secara konsisten dan berkualitas. Ide tidak pernah kering. Karya terus mengalir.",
              },
              {
                num: "05",
                title: "Sang Pencari",
                desc: "Tahu AI penting, tapi belum tahu harus mulai dari mana. Justru di sinilah tempat yang paling tepat untuk memulai.",
              },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="flex gap-6">
                <span
                  className="flex-shrink-0 font-mono font-bold text-2xl leading-none mt-0.5"
                  style={{ color: "rgba(124,58,237,0.3)", letterSpacing: "-0.02em" }}
                >
                  {item.num}
                </span>
                <div>
                  <h3 className="font-display font-semibold text-white text-lg mb-3">{item.title}</h3>
                  <p className="text-sm leading-[1.8]" style={{ color: "#71717A" }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ══ SECTION 5: KELAS UNGGULAN ══ */}
      <section className="py-[48px] sm:py-[80px]">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <Reveal className="text-center mb-12">
            <SectionLabel>KELAS PERTAMA · TERSEDIA SEKARANG</SectionLabel>
            <motion.h2
              variants={fadeUp}
              className="font-display font-semibold"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", letterSpacing: "-0.015em" }}
            >
              Maksimalkan AI untuk Menghasilkan Solusimu
            </motion.h2>
          </Reveal>

          <Reveal>
            <motion.div
              variants={fadeUp}
              className="relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(16,16,24,0.95) 0%, rgba(20,12,36,0.95) 100%)",
                border: "1px solid rgba(124,58,237,0.2)",
                borderRadius: "16px",
                boxShadow: "0px 8px 20px rgba(0,0,0,0.4)",
              }}
            >
              {/* Glow top */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.5), transparent)" }}
              />

              <div className="p-8 sm:p-12">
                <div className="flex flex-wrap items-start justify-between gap-6 mb-8">
                  <div>
                    <span
                      className="font-mono text-xs tracking-widest px-3 py-1 rounded-full mb-4 inline-block"
                      style={{ background: "rgba(124,58,237,0.15)", color: "#A855F7", border: "1px solid rgba(124,58,237,0.25)" }}
                    >
                      TERSEDIA SEKARANG
                    </span>
                    <h3
                      className="font-display font-semibold text-white leading-tight mb-3"
                      style={{ fontSize: "clamp(1.25rem, 3vw, 2rem)" }}
                    >
                      Maksimalkan AI untuk
                      <br />
                      Menghasilkan Solusimu
                    </h3>
                    <p className="text-sm" style={{ color: "#71717A" }}>
                      Kelas perdana AIGYPT. Enam minggu perjalanan dari memahami AI hingga membangun solusi nyata atas masalah yang kamu hadapi.
                    </p>
                  </div>
                  <div
                    className="flex-shrink-0 inline-flex rounded-2xl overflow-hidden"
                    style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    {[["6", "SESI"], ["60 MENIT", "PER SESI"], ["1", "KARYA NYATA"]].map(([val, lbl], i) => (
                      <div key={i} className="flex items-center">
                        {i > 0 && <div className="self-stretch w-px" style={{ background: "rgba(255,255,255,0.06)" }} />}
                        <div className="px-5 py-3 text-center">
                          <span className="font-mono font-bold text-white text-sm block">{val}</span>
                          <span className="font-mono text-xs block mt-0.5 tracking-widest" style={{ color: "#52525B" }}>{lbl}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6 flex flex-wrap gap-3">
                  <span className="font-mono text-xs px-3 py-1.5 rounded-full" style={{ background: "rgba(124,58,237,0.12)", color: "#A855F7", border: "1px solid rgba(124,58,237,0.25)" }}>BATCH 1 — PENDAFTARAN DIBUKA</span>
                  <span className="font-mono text-xs px-3 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.04)", color: "#71717A", border: "1px solid rgba(255,255,255,0.06)" }}>Dimulai: 5 Juli 2026</span>
                  <span className="font-mono text-xs px-3 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.04)", color: "#71717A", border: "1px solid rgba(255,255,255,0.06)" }}>Kuota terbatas per batch</span>
                </div>

                <p className="text-sm leading-[1.9] mb-8 max-w-2xl" style={{ color: "#A1A1AA", fontWeight: 300 }}>
                  Format Hybrid: ada jadwal mentoring live, tapi seluruh materi bisa kamu akses kapan saja setelah mendaftar.
                </p>

                {/* Tambahan: Mengapa Bergabung Sekarang */}
                <div
                  className="mb-8 p-5 rounded-xl"
                  style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.12)" }}
                >
                  <p className="font-display font-semibold text-white text-sm mb-2">Mengapa Bergabung Sekarang Lebih Berarti</p>
                  <p className="text-sm leading-[1.8]" style={{ color: "#71717A" }}>
                    Batch 1 bukan sekadar angkatan pertama. Ini kesempatan untuk menjadi salah satu yang lebih dulu menguasai keterampilan yang akan semakin penting setiap harinya. Sementara yang lain masih ragu memulai, kamu sudah selangkah di depan.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <Link href="/daftar">
                    <span
                      className="inline-flex items-center gap-2 text-base font-medium text-white transition-all duration-200 cursor-pointer"
                      style={{
                        background: "#7C3AED",
                        borderRadius: "12px",
                        padding: "15px 24px",
                        minHeight: "48px",
                        boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
                      }}
                    >
                      Daftar Batch 1 Sekarang <IconArrow />
                    </span>
                  </Link>
                  <Link href="/kurikulum">
                    <span
                      className="text-sm cursor-pointer transition-colors hover:text-white"
                      style={{ color: "#71717A" }}
                    >
                      Lihat Kurikulum Lengkap →
                    </span>
                  </Link>
                </div>
                <p className="mt-4 font-mono text-xs" style={{ color: "#52525B", letterSpacing: "0.1em" }}>PENDAFTARAN DITUTUP SAAT KUOTA TERPENUHI</p>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* ══ SECTION 6: SEGERA HADIR ══ */}
      <section className="py-[48px] sm:py-[80px]" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <Reveal className="mb-12">
            <SectionLabel>YANG AKAN DATANG</SectionLabel>
            <motion.h2
              variants={fadeUp}
              className="font-display font-semibold mb-4"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", letterSpacing: "-0.015em" }}
            >
              Ini Baru Permulaan
            </motion.h2>
            <motion.p variants={fadeUp} className="font-mono text-xs tracking-widest" style={{ color: "#52525B", letterSpacing: "0.15em" }}>
              KELAS BARU TERUS DIKEMBANGKAN
            </motion.p>
          </Reveal>

          <Reveal className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Bahasa Arab Akademik dengan AI", desc: "Taklukkan makalah, muthala'ah, dan teks akademik dengan AI sebagai asisten linguistikmu." },
              { title: "Bangun Penghidupan dengan AI", desc: "Ubah keterampilan dan potensimu menjadi sumber penghasilan yang berkelanjutan." },
              { title: "Vibe Coding: Dari Nol ke Aplikasi", desc: "Bangun software yang berguna dan nyata tanpa perlu menjadi programmer." },
              { title: "Konten & Dakwah Digital dengan AI", desc: "Sebarkan kebaikan dan ilmu dengan kecerdasan buatan sebagai alat produksimu." },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="p-5"
                style={{
                  background: "rgba(10,10,15,0.6)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: "12px",
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
                }}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-display font-medium text-white text-base leading-snug">{item.title}</h3>
                  <span
                    className="flex-shrink-0 font-mono text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: "rgba(82,82,91,0.15)",
                      color: "#52525B",
                      border: "1px solid rgba(82,82,91,0.2)",
                    }}
                  >
                    SEGERA
                  </span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "#52525B" }}>{item.desc}</p>
              </motion.div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ══ SECTION 7: KEANGGOTAAN (REVISI — Perpustakaan) ══ */}
      <section id="keanggotaan" className="py-[48px] sm:py-[80px]">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <Reveal className="text-center mb-10">
            <SectionLabel>LEBIH DARI SEKADAR KELAS</SectionLabel>
            <motion.h2
              variants={fadeUp}
              className="font-display font-semibold mb-4"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", letterSpacing: "-0.015em" }}
            >
              Sebuah Perpustakaan yang{" "}
              <span style={{ color: "#A855F7" }}>Terus Bertumbuh</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-base leading-relaxed max-w-2xl mx-auto mb-3"
              style={{ color: "#71717A", fontWeight: 300 }}
            >
              Saat kamu bergabung, kamu tidak hanya mendapat satu kelas. Kamu mendapat akses ke perpustakaan
              solusi yang terus berkembang — setiap masalah masisir, setiap jawabannya.
            </motion.p>
            <motion.p variants={fadeUp} className="font-mono text-xs tracking-widest" style={{ color: "#52525B", letterSpacing: "0.15em" }}>
              KUOTA TERBATAS · PENDAFTARAN DITUTUP SAAT PENUH
            </motion.p>
          </Reveal>

          {/* Stat grid dengan count-up */}
          <div ref={statRef}>
            <Reveal className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              {[
                { value: 50, suffix: "+", label: "PROMPT SIAP PAKAI" },
                { value: 6, suffix: "", label: "SESI MENDALAM" },
                { value: 12, suffix: "", label: "STUDI KASUS NYATA" },
                { value: 5, suffix: "", label: "JALUR APLIKASI" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="py-6 px-4 text-center rounded-xl"
                  style={{
                    background: "rgba(16,10,28,0.7)",
                    border: "1px solid rgba(124,58,237,0.12)",
                  }}
                >
                  <StatItem value={s.value} suffix={s.suffix} label={s.label} inView={statInView} />
                </motion.div>
              ))}
            </Reveal>
          </div>

          <Reveal className="mb-10">
            <motion.p
              variants={fadeUp}
              className="text-sm leading-[1.9] max-w-2xl mx-auto text-center"
              style={{ color: "#71717A", fontWeight: 300 }}
            >
              Setiap prompt sudah diuji untuk konteks nyata — bahasa Arab akademik, organisasi mahasiswa, bisnis dengan modal terbatas, hingga konten yang benar-benar dilihat orang. Kamu tidak mulai dari nol. Kamu mulai dari apa yang sudah terbukti bekerja.
            </motion.p>
          </Reveal>

          <Reveal className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                name: "Mandiri",
                tag: "Fleksibel",
                desc: "Untuk yang ingin belajar dengan kecepatan sendiri.",
                subDesc: "Akses penuh perpustakaan, belajar sesuai waktumu.",
                features: [
                  "Akses penuh seluruh materi 6 sesi",
                  "Kode keanggotaan eksklusif",
                  "Pembaruan materi selamanya",
                  "Akses Vibe Coding Toolbox",
                ],
                cta: "Daftar sebagai Member Mandiri",
                memberType: "mandiri",
                highlight: false,
              },
              {
                name: "Kelas",
                tag: "BATCH 1 · DIBUKA",
                desc: "Untuk yang ingin bimbingan penuh dan komunitas.",
                subDesc: "Semua itu, plus dibimbing langsung menerapkannya.",
                features: [
                  "Semua yang ada di Member Mandiri",
                  "6 sesi mentoring live (mulai 5 Juli 2026)",
                  "Bimbingan dan feedback langsung",
                  "Komunitas eksklusif Batch 1",
                  "Sertifikat penyelesaian",
                ],
                cta: "Daftar Batch 1 Sekarang",
                memberType: "kelas",
                highlight: true,
              },
            ].map((tier) => (
              <motion.div
                key={tier.name}
                variants={fadeUp}
                className="relative p-5 flex flex-col"
                style={{
                  background: tier.highlight ? "rgba(20,12,36,0.9)" : "rgba(10,10,15,0.7)",
                  border: tier.highlight ? "1px solid rgba(124,58,237,0.3)" : "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "12px",
                  boxShadow: tier.highlight ? "0px 8px 20px rgba(0,0,0,0.4)" : "0px 4px 12px rgba(0,0,0,0.3)",
                }}
              >
                {tier.highlight && (
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.6), transparent)" }}
                  />
                )}
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-display font-semibold text-white text-xl mb-1">{tier.name}</h3>
                    <p className="text-sm" style={{ color: "#71717A" }}>{tier.desc}</p>
                  </div>
                  <span
                    className="flex-shrink-0 font-mono text-xs px-2 py-1 rounded-full"
                    style={{
                      background: tier.highlight ? "rgba(124,58,237,0.15)" : "rgba(255,255,255,0.05)",
                      color: tier.highlight ? "#A855F7" : "#52525B",
                      border: tier.highlight ? "1px solid rgba(124,58,237,0.25)" : "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    {tier.tag}
                  </span>
                </div>
                <p className="text-xs mb-5 pb-4" style={{ color: "#7C3AED", borderBottom: "1px solid rgba(124,58,237,0.1)", fontStyle: "italic" }}>
                  {tier.subDesc}
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm" style={{ color: "#A1A1AA" }}>
                      <span style={{ color: "#7C3AED" }}><IconCheck /></span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={`/daftar?type=${tier.memberType}`}>
                  <span
                    className="block text-center text-base font-medium transition-all duration-200 cursor-pointer"
                    style={
                      tier.highlight
                        ? { background: "#7C3AED", color: "#fff", borderRadius: "12px", padding: "15px 24px", minHeight: "48px", boxShadow: "0px 4px 12px rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }
                        : { border: "1px solid rgba(124,58,237,0.3)", color: "#A855F7", borderRadius: "12px", padding: "15px 24px", minHeight: "48px", display: "flex", alignItems: "center", justifyContent: "center" }
                    }
                  >
                    {tier.cta} →
                  </span>
                </Link>
              </motion.div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="py-[48px] sm:py-[80px]" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-3xl mx-auto px-6 sm:px-10">
          <Reveal className="mb-12">
            <SectionLabel>PERTANYAAN UMUM</SectionLabel>
          </Reveal>
          <Reveal>
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={fadeUp}>
                <FaqItem q={faq.q} a={faq.a} />
              </motion.div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ══ SECTION 8: CTA PENUTUP ══ */}
      <section className="relative py-[80px] sm:py-[100px] overflow-hidden">
        <div
          className="absolute pointer-events-none inset-0"
          style={{
            background: "radial-gradient(ellipse at center 70%, rgba(124,58,237,0.12) 0%, transparent 65%)",
          }}
        />
        <Reveal className="relative max-w-4xl mx-auto px-6 sm:px-10 text-center">
          <motion.h2
            variants={fadeUp}
            className="font-display font-semibold leading-tight mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.02em" }}
          >
            Mulai dari satu keputusan.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg mb-10"
            style={{ color: "#71717A", fontWeight: 300 }}
          >
            Batch 1 dimulai 5 Juli 2026. Tempat sangat terbatas.
          </motion.p>
          {/* Risk-reversal */}
          <motion.p
            variants={fadeUp}
            className="font-mono text-xs tracking-widest mb-6"
            style={{ color: "#52525B", letterSpacing: "0.18em" }}
          >
            KEPUTUSAN UNTUK MULAI SELALU LEBIH RINGAN DARI PENYESALAN UNTUK MENUNDA
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/daftar">
              <span
                className="inline-flex items-center gap-2 text-base font-medium text-white transition-all duration-200 cursor-pointer"
                style={{
                  background: "#7C3AED",
                  borderRadius: "12px",
                  padding: "15px 32px",
                  minHeight: "48px",
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
                }}
              >
                Daftar Batch 1 Sekarang <IconArrow />
              </span>
            </Link>
            <a
              href={waUrl("Halo, saya ingin menghubungi AIGYPT")}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs tracking-widest transition-colors hover:text-white"
              style={{ color: "#52525B", letterSpacing: "0.15em" }}
            >
              ATAU HUBUNGI KAMI VIA WHATSAPP
            </a>
          </motion.div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
