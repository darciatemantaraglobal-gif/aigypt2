import { useState, useRef } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence, useInView } from "framer-motion";

// ─── Animation Helpers ────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── SVG Icons (Lucide-style, 1.5px stroke) ───────────────────────────────────

function IconBookOpen() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}
function IconUsers() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function IconTrendingUp() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}
function IconSparkles() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  );
}
function IconCompass() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const personas = [
  {
    Icon: IconBookOpen,
    label: "Sang Akademisi",
    desc: "Untuk mereka yang bergelut dengan makalah, kitab klasik, dan riset. AI menjadi asisten yang memahami bahasa Arab, merangkum referensi, dan mempertajam argumen.",
  },
  {
    Icon: IconUsers,
    label: "Sang Organisator",
    desc: "Untuk penggerak komunitas. Dari proposal hingga laporan, dari notulensi hingga publikasi — semua menjadi lebih ringan, lebih cepat, lebih rapi.",
  },
  {
    Icon: IconTrendingUp,
    label: "Sang Pebisnis",
    desc: "Untuk yang membangun penghidupan. Riset pasar, copywriting yang menjual, hingga melayani pelanggan — dikerjakan dengan kecerdasan, bukan sekadar kerja keras.",
  },
  {
    Icon: IconSparkles,
    label: "Sang Kreator",
    desc: "Untuk yang bercerita pada dunia. Ide yang tak pernah kering, naskah yang mengalir, konten yang berlipat — semua dalam hitungan menit, bukan hari.",
  },
  {
    Icon: IconCompass,
    label: "Sang Pencari",
    desc: "Untuk yang merasa kewalahan dan belum tahu harus mulai dari mana. Justru di sinilah tempat terbaik untuk memulai.",
  },
];

const journeySteps = [
  {
    num: "01",
    title: "KESADARAN",
    desc: "Memahami AI bukan sebagai sihir, tapi sebagai alat yang tunduk pada mereka yang tahu cara memerintahnya.",
  },
  {
    num: "02",
    title: "PENGUASAAN",
    desc: "Menguasai seni berdialog dengan AI. Satu keterampilan yang akan mengubah segalanya.",
  },
  {
    num: "03",
    title: "PENERAPAN",
    desc: "Menerapkan AI pada kehidupan nyata — akademik, organisasi, setiap tugas yang selama ini menyita waktumu.",
  },
  {
    num: "04",
    title: "PRODUKSI",
    desc: "Menjadikan AI mesin yang menghasilkan — konten, karya, bahkan penghidupan.",
  },
  {
    num: "05",
    title: "PENCIPTAAN",
    desc: "Membangun solusimu sendiri. Aplikasi nyata, dari masalah nyata, dengan tanganmu sendiri — tanpa perlu menjadi programmer.",
  },
];

const curriculum = [
  {
    num: "SESI 01",
    title: "AI Itu Bukan Sulap, Tapi Hampir",
    desc: "Membangun fondasi mental dan memahami lanskap kecerdasan buatan.",
  },
  {
    num: "SESI 02",
    title: "Seni Berdialog dengan Kecerdasan",
    desc: "Menguasai prompting — keterampilan inti yang membedakan amatir dan ahli.",
  },
  {
    num: "SESI 03",
    title: "Asisten untuk Ilmu dan Amanah",
    desc: "Menerapkan AI pada dunia akademik dan organisasi.",
  },
  {
    num: "SESI 04",
    title: "Kecerdasan yang Menghasilkan",
    desc: "Memanfaatkan AI untuk bisnis dan karya kreatif.",
  },
  {
    num: "SESI 05",
    title: "Tangan yang Mencipta",
    desc: "Membangun aplikasi dan solusi nyata melalui vibe coding.",
  },
  {
    num: "SESI 06",
    title: "Pembuktian",
    desc: "Demo Day — mempersembahkan karya yang lahir dari perjalananmu.",
  },
];

const valueProps = [
  {
    title: "Sebuah Karya Nyata",
    desc: "Solusi atau aplikasi buatanmu sendiri, lahir dari masalah yang kamu pahami betul. Bukan latihan — sesuatu yang nyata.",
  },
  {
    title: "Keterampilan yang Tak Lekang",
    desc: "Kemampuan berdialog dengan AI yang akan relevan sepanjang kariermu, di bidang apapun.",
  },
  {
    title: "Portofolio Pertama",
    desc: "Bukti nyata kemampuanmu di era kecerdasan buatan — modal berharga untuk masa depan.",
  },
  {
    title: "Akses Abadi",
    desc: "Seluruh materi AIGYPT, dapat kamu akses kapanpun, selamanya, melalui keanggotaan eksklusifmu.",
  },
  {
    title: "Lingkaran Eksklusif",
    desc: "Komunitas alumni AIGYPT — tempat para pencipta saling menguatkan dan berkolaborasi.",
  },
];

const faqs = [
  {
    q: "Apakah saya perlu bisa memprogram sebelumnya?",
    a: "Tidak sama sekali. AIGYPT dirancang untuk membawamu dari nol. Justru keindahannya: kamu akan mencipta tanpa perlu menjadi programmer.",
  },
  {
    q: "Bagaimana bentuk mentoring langsungnya?",
    a: "Enam sesi bimbingan intensif bersama mentor, di mana kamu belajar, berlatih, dan mendapat umpan balik langsung atas karyamu.",
  },
  {
    q: "Apa perbedaan Member Mandiri dan Member Kelas?",
    a: "Member Mandiri belajar dengan kecepatannya sendiri melalui materi. Member Kelas mendapat seluruh materi plus bimbingan langsung, komunitas, dan sertifikat.",
  },
  {
    q: "Apakah materi tetap bisa diakses setelah selesai?",
    a: "Selamanya. Keanggotaanmu tidak memiliki tanggal kedaluwarsa.",
  },
  {
    q: "Berapa peserta dalam satu batch?",
    a: "Sengaja kami batasi untuk menjaga kualitas bimbingan. Setiap peserta layak mendapat perhatian penuh.",
  },
];

// ─── Journey Line Component ───────────────────────────────────────────────────

function JourneyLine() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <div ref={ref} className="absolute left-[19px] top-6 bottom-6 w-px overflow-hidden">
      <motion.div
        className="w-full origin-top"
        style={{
          background: "linear-gradient(to bottom, #7C3AED, #A855F7, rgba(124,58,237,0))",
        }}
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
      />
    </div>
  );
}

// ─── Section Label ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="font-mono text-[10px] tracking-[0.2em] text-[#7C3AED] uppercase mb-5">
      {children}
    </p>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ background: "#060608", color: "#FAFAFA" }}
    >
      {/* ═══ NAV ═══ */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 h-16"
        style={{ background: "rgba(6,6,8,0.8)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <Link href="/">
          <span className="font-display font-semibold text-lg tracking-tight cursor-pointer select-none">
            AI<span style={{ color: "#A855F7" }}>GYPT</span>
          </span>
        </Link>
        <div className="hidden sm:flex items-center gap-6">
          <Link href="/kurikulum">
            <span className="text-sm text-[#A1A1AA] hover:text-white transition-colors cursor-pointer font-light tracking-wide">
              Kurikulum
            </span>
          </Link>
          <a href="#keanggotaan" className="text-sm text-[#A1A1AA] hover:text-white transition-colors font-light tracking-wide">
            Keanggotaan
          </a>
          <Link href="/login">
            <span className="text-sm font-medium text-[#A855F7] hover:text-white transition-colors cursor-pointer">
              Masuk
            </span>
          </Link>
        </div>
        <Link href="/login" className="sm:hidden">
          <span className="text-sm text-[#A855F7] cursor-pointer">Masuk</span>
        </Link>
      </nav>

      {/* ═══ SECTION 1 — HERO ═══ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Background glow — breathing */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 60% 40% at 50% 45%, rgba(124,58,237,0.18) 0%, transparent 70%)",
            }}
          />
        </motion.div>

        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="font-mono text-[10px] tracking-[0.25em] text-[#7C3AED] uppercase mb-10">
              Program Eksklusif untuk Masisir &middot; Batch 01
            </p>
          </motion.div>

          <motion.h1
            className="font-display font-medium leading-[1.08] tracking-tight mb-8"
            style={{ fontSize: "clamp(2.6rem, 7vw, 5rem)", color: "#FAFAFA" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            Ubah Setiap Masalah<br />
            <span style={{ color: "#A855F7" }}>Menjadi Karya.</span>
          </motion.h1>

          <motion.p
            className="font-light leading-relaxed mb-12 max-w-xl mx-auto"
            style={{ fontSize: "clamp(1rem, 2vw, 1.125rem)", color: "#A1A1AA" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            AIGYPT adalah program transformatif yang mengajarkan masisir menguasai
            kecerdasan buatan — dari sekadar bertanya, hingga membangun solusi nyata
            dengan tangan sendiri.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-14"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <a
              href="https://wa.me/628xxxxxxxxxx?text=Halo, saya ingin bergabung dengan AIGYPT"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 text-sm font-medium text-white rounded-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(124,58,237,0.55)]"
              style={{
                background: "#7C3AED",
                boxShadow: "0 0 24px rgba(124,58,237,0.35)",
              }}
            >
              Mulai Perjalanan
            </a>
            <Link href="/kurikulum">
              <span
                className="px-8 py-3.5 text-sm font-medium text-[#A1A1AA] hover:text-white rounded-xl transition-all duration-300 cursor-pointer block text-center"
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
              >
                Jelajahi Kurikulum
              </span>
            </Link>
          </motion.div>

          <motion.p
            className="font-mono text-[9px] tracking-[0.25em] uppercase"
            style={{ color: "#52525B" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            6 Sesi Terkurasi &middot; Mentoring Langsung &middot; Komunitas Eksklusif
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            className="w-px h-10"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(124,58,237,0.5))" }}
            animate={{ scaleY: [0.4, 1, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* ═══ SECTION 2 — MANIFESTO ═══ */}
      <section className="relative px-6 py-32 sm:py-40">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <SectionLabel>Mengapa AIGYPT Ada</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              className="font-display font-medium leading-[1.15] tracking-tight mb-8"
              style={{ fontSize: "clamp(1.9rem, 4.5vw, 3.2rem)", color: "#FAFAFA" }}
            >
              Di Mesir, ribuan masisir menyimpan ide brilian yang tak pernah terwujud
              — bukan karena kurang mampu,{" "}
              <span style={{ color: "#A1A1AA" }}>tapi karena belum punya alatnya.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-light leading-[1.9] text-base" style={{ color: "#71717A" }}>
              Kami percaya setiap masisir — akademisi, organisator, pebisnis, maupun
              kreator — punya potensi untuk menciptakan, bukan sekadar mengonsumsi.
              Kecerdasan buatan telah meruntuhkan tembok antara "punya ide" dan
              "mewujudkan ide". AIGYPT hadir untuk memastikan kamu berada di sisi
              yang tepat dari perubahan ini.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ SECTION 3 — PERSONA ═══ */}
      <section className="px-6 py-24 sm:py-32">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <SectionLabel>Dirancang untuk Setiap Jiwa Masisir</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              className="font-display font-medium tracking-tight mb-16"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#FAFAFA" }}
            >
              Apapun Jalanmu, AIGYPT Memahaminya
            </h2>
          </Reveal>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {personas.map((p) => (
              <motion.div
                key={p.label}
                variants={fadeUp}
                className="group relative p-6 rounded-2xl cursor-default transition-all duration-400"
                style={{
                  background: "rgba(20,20,30,0.5)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  backdropFilter: "blur(12px)",
                }}
                whileHover={{
                  borderColor: "rgba(124,58,237,0.4)",
                  boxShadow: "0 0 28px rgba(124,58,237,0.12)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: "rgba(124,58,237,0.12)",
                    border: "1px solid rgba(124,58,237,0.25)",
                    color: "#A855F7",
                  }}
                >
                  <p.Icon />
                </div>
                <h3
                  className="font-display font-medium text-sm mb-3"
                  style={{ color: "#FAFAFA" }}
                >
                  {p.label}
                </h3>
                <p className="text-xs font-light leading-relaxed" style={{ color: "#71717A" }}>
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ SECTION 4 — JOURNEY ═══ */}
      <section className="px-6 py-28 sm:py-36">
        <div className="max-w-2xl mx-auto">
          <Reveal>
            <SectionLabel>Sebuah Metamorfosis dalam Enam Minggu</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              className="font-display font-medium tracking-tight mb-20"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#FAFAFA" }}
            >
              Dari Bertanya,<br />Hingga Mencipta
            </h2>
          </Reveal>

          {/* Steps with line */}
          <div className="relative pl-12">
            <JourneyLine />
            {journeySteps.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.08}>
                <div className="relative mb-14 last:mb-0">
                  {/* Dot */}
                  <div
                    className="absolute -left-12 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      background: "rgba(124,58,237,0.15)",
                      border: "1px solid rgba(124,58,237,0.35)",
                    }}
                  >
                    <span
                      className="font-mono text-[10px] font-medium"
                      style={{ color: "#A855F7" }}
                    >
                      {step.num}
                    </span>
                  </div>
                  <h3
                    className="font-mono text-xs tracking-[0.18em] mb-2.5"
                    style={{ color: "#7C3AED" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm font-light leading-relaxed"
                    style={{ color: "#A1A1AA" }}
                  >
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <p
              className="mt-20 font-display font-medium text-xl tracking-tight text-center"
              style={{ color: "#71717A" }}
            >
              Di akhir perjalanan, kamu tidak lagi sama.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ SECTION 5 — CURRICULUM ═══ */}
      <section className="px-6 py-28 sm:py-36">
        <div className="max-w-2xl mx-auto">
          <Reveal>
            <SectionLabel>Enam Sesi yang Dikurasi dengan Cermat</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              className="font-display font-medium tracking-tight mb-16"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#FAFAFA" }}
            >
              Kurikulum
            </h2>
          </Reveal>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {curriculum.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.07}>
                <div
                  className="group flex items-start gap-6 py-6 transition-all duration-300 cursor-default"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(124,58,237,0.04)";
                    e.currentTarget.style.paddingLeft = "12px";
                    e.currentTarget.style.marginLeft = "-12px";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.paddingLeft = "0";
                    e.currentTarget.style.marginLeft = "0";
                  }}
                >
                  <span
                    className="font-mono text-[10px] tracking-[0.15em] flex-shrink-0 mt-1"
                    style={{ color: "#52525B" }}
                  >
                    {s.num}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-display font-medium text-base mb-1.5 group-hover:text-white transition-colors"
                      style={{ color: "#E4E4E7" }}
                    >
                      {s.title}
                    </h3>
                    <p className="text-sm font-light" style={{ color: "#52525B" }}>
                      {s.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-10">
              <Link href="/kurikulum">
                <span
                  className="inline-flex items-center gap-2 text-sm font-light transition-colors cursor-pointer hover:text-white"
                  style={{ color: "#7C3AED" }}
                >
                  Lihat Kurikulum Lengkap
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ SECTION 6 — VALUE PROPS ═══ */}
      <section className="px-6 py-28 sm:py-36">
        <div className="max-w-2xl mx-auto">
          <Reveal>
            <SectionLabel>Lebih dari Sekadar Kelas</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              className="font-display font-medium tracking-tight mb-16"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#FAFAFA" }}
            >
              Yang Tinggal Bersamamu,<br />Selamanya
            </h2>
          </Reveal>

          <div className="space-y-10">
            {valueProps.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.07}>
                <div className="flex gap-8">
                  <div
                    className="w-px flex-shrink-0 mt-1"
                    style={{ background: "rgba(124,58,237,0.3)", minHeight: "100%" }}
                  />
                  <div>
                    <h3
                      className="font-display font-medium text-base mb-2"
                      style={{ color: "#FAFAFA" }}
                    >
                      — {v.title}
                    </h3>
                    <p className="text-sm font-light leading-relaxed" style={{ color: "#71717A" }}>
                      {v.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 7 — MEMBERSHIP ═══ */}
      <section id="keanggotaan" className="px-6 py-28 sm:py-36">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <SectionLabel>Pilih Tingkat Keanggotaanmu</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              className="font-display font-medium tracking-tight mb-16"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#FAFAFA" }}
            >
              Sebuah Investasi pada Dirimu
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            {/* Mandiri */}
            <Reveal delay={0.05}>
              <div
                className="relative p-7 rounded-2xl h-full flex flex-col"
                style={{
                  background: "rgba(16,16,24,0.7)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(16px)",
                }}
              >
                <h3
                  className="font-display font-medium text-lg mb-2"
                  style={{ color: "#FAFAFA" }}
                >
                  Keanggotaan Mandiri
                </h3>
                <p className="text-sm font-light mb-7" style={{ color: "#71717A" }}>
                  Untuk jiwa yang belajar dengan caranya sendiri.
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    "Akses penuh seluruh materi AIGYPT",
                    "Kode keanggotaan eksklusif",
                    "Pembaruan materi selamanya",
                    "Akses ke Vibe Coding Toolbox",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm font-light" style={{ color: "#A1A1AA" }}>
                      <svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: "#7C3AED" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/628xxxxxxxxxx?text=Halo, saya tertarik dengan Keanggotaan Mandiri AIGYPT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center py-3 text-sm font-medium transition-all duration-300 rounded-xl hover:text-white"
                  style={{
                    border: "1px solid rgba(124,58,237,0.35)",
                    color: "#A855F7",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(124,58,237,0.08)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  Bergabung sebagai Member Mandiri
                </a>
              </div>
            </Reveal>

            {/* Kelas — highlighted */}
            <Reveal delay={0.1}>
              <div
                className="relative p-7 rounded-2xl h-full flex flex-col"
                style={{
                  background: "rgba(20,16,36,0.7)",
                  border: "1px solid rgba(124,58,237,0.35)",
                  backdropFilter: "blur(16px)",
                  boxShadow: "0 0 40px rgba(124,58,237,0.12)",
                }}
              >
                {/* Badge */}
                <div className="absolute -top-3.5 left-6">
                  <span
                    className="font-mono text-[9px] tracking-[0.2em] px-3 py-1.5 rounded-full uppercase"
                    style={{
                      background: "#7C3AED",
                      color: "#FAFAFA",
                    }}
                  >
                    Paling Diminati
                  </span>
                </div>

                <h3
                  className="font-display font-medium text-lg mb-2"
                  style={{ color: "#FAFAFA" }}
                >
                  Keanggotaan Kelas
                </h3>
                <p className="text-sm font-light mb-7" style={{ color: "#71717A" }}>
                  Untuk yang menginginkan bimbingan penuh.
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    "Segala yang ada di Keanggotaan Mandiri",
                    "Enam sesi mentoring langsung",
                    "Bimbingan personal dari mentor",
                    "Lingkaran diskusi eksklusif per batch",
                    "Sertifikat penyelesaian",
                    "Undangan Demo Day",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm font-light" style={{ color: "#A1A1AA" }}>
                      <svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: "#A855F7" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/628xxxxxxxxxx?text=Halo, saya tertarik dengan Keanggotaan Kelas AIGYPT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center py-3 text-sm font-medium text-white transition-all duration-300 rounded-xl"
                  style={{
                    background: "#7C3AED",
                    boxShadow: "0 0 20px rgba(124,58,237,0.3)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#6D28D9";
                    e.currentTarget.style.boxShadow = "0 0 32px rgba(124,58,237,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#7C3AED";
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(124,58,237,0.3)";
                  }}
                >
                  Bergabung sebagai Member Kelas
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <p
              className="text-center font-mono text-[9px] tracking-[0.2em] uppercase"
              style={{ color: "#52525B" }}
            >
              Kuota Terbatas per Batch untuk Menjaga Kualitas Bimbingan
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ SECTION 8 — FAQ ═══ */}
      <section className="px-6 py-24 sm:py-32">
        <div className="max-w-2xl mx-auto">
          <Reveal>
            <SectionLabel>Hal yang Mungkin Kamu Tanyakan</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              className="font-display font-medium tracking-tight mb-14"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#FAFAFA" }}
            >
              Pertanyaan
            </h2>
          </Reveal>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <button
                    className="w-full flex items-center justify-between py-5 text-left group"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span
                      className="text-sm font-light pr-6 group-hover:text-white transition-colors"
                      style={{ color: openFaq === i ? "#FAFAFA" : "#E4E4E7" }}
                    >
                      {faq.q}
                    </span>
                    <motion.svg
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#7C3AED"
                      strokeWidth="1.5"
                      className="flex-shrink-0"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <p
                          className="text-sm font-light leading-relaxed pb-5"
                          style={{ color: "#71717A" }}
                        >
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 9 — GRAND CTA ═══ */}
      <section className="px-6 py-28 sm:py-40 relative overflow-hidden">
        {/* Dramatic glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(124,58,237,0.2) 0%, transparent 68%)",
          }}
        />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <Reveal>
            <h2
              className="font-display font-medium leading-[1.1] tracking-tight mb-6"
              style={{ fontSize: "clamp(2.2rem, 5.5vw, 4rem)", color: "#FAFAFA" }}
            >
              Ide-idemu layak<br />diwujudkan.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-base font-light mb-12" style={{ color: "#A1A1AA" }}>
              Batch 01 segera dibuka. Tempat sangat terbatas.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <a
              href="https://wa.me/628xxxxxxxxxx?text=Halo, saya ingin amankan tempat di AIGYPT Batch 01"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-12 py-4 text-base font-medium text-white rounded-xl transition-all duration-300"
              style={{
                background: "#7C3AED",
                boxShadow: "0 0 32px rgba(124,58,237,0.4)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#6D28D9";
                e.currentTarget.style.boxShadow = "0 0 52px rgba(124,58,237,0.65)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#7C3AED";
                e.currentTarget.style.boxShadow = "0 0 32px rgba(124,58,237,0.4)";
              }}
            >
              Amankan Tempatmu
            </a>
          </Reveal>
          <Reveal delay={0.2}>
            <p
              className="mt-8 font-mono text-[9px] tracking-[0.25em] uppercase"
              style={{ color: "#52525B" }}
            >
              Perjalanan Transformasi Dimulai dari Satu Langkah
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer
        className="px-6 py-14"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <p className="font-display font-semibold text-base mb-1" style={{ color: "#FAFAFA" }}>
              AI<span style={{ color: "#A855F7" }}>GYPT</span>
            </p>
            <p className="text-xs font-light" style={{ color: "#52525B" }}>
              Maksimalkan AI untuk Menghasilkan Solusimu
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/kurikulum">
              <span className="text-xs font-light transition-colors cursor-pointer hover:text-white" style={{ color: "#71717A" }}>
                Kurikulum
              </span>
            </Link>
            <a href="#keanggotaan" className="text-xs font-light transition-colors hover:text-white" style={{ color: "#71717A" }}>
              Keanggotaan
            </a>
            <Link href="/toolbox">
              <span className="text-xs font-light transition-colors cursor-pointer hover:text-white" style={{ color: "#71717A" }}>
                Toolbox
              </span>
            </Link>
            <Link href="/login">
              <span className="text-xs font-light transition-colors cursor-pointer hover:text-white" style={{ color: "#71717A" }}>
                Masuk
              </span>
            </Link>
          </div>

          <p className="text-xs font-light" style={{ color: "#52525B" }}>
            &copy; 2026 AIGYPT &middot; Program untuk Masisir, oleh Masisir
          </p>
        </div>
      </footer>
    </div>
  );
}
