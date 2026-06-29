import { useState, useRef } from "react";
import { Link } from "wouter";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { waUrl } from "@/lib/wa";

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

// ─── FAQ Component ─────────────────────────────────────────────────────────────

const faqs = [
  {
    q: "Apakah AIGYPT hanya untuk yang sudah bisa coding?",
    a: "Sama sekali tidak. AIGYPT dirancang untuk semua masisir tanpa syarat teknis apa pun. Yang kamu butuhkan hanya kemauan untuk belajar dan mencoba.",
  },
  {
    q: "Bagaimana format pembelajaran di AIGYPT?",
    a: "Setiap kelas tersusun dari sesi-sesi terstruktur dengan durasi sekitar 60 menit per sesi, dikombinasikan misi praktis yang bisa langsung dikerjakan.",
  },
  {
    q: "Apa yang membedakan AIGYPT dengan kursus AI online lainnya?",
    a: "Setiap materi, contoh, dan studi kasus dikurasi dengan konteks kehidupan nyata masisir — dari makalah Arab hingga organisasi mahasiswa, dari bisnis perantauan hingga dakwah digital.",
  },
  {
    q: "Apakah ada sertifikat setelah menyelesaikan kelas?",
    a: "Ya, peserta yang menyelesaikan seluruh perjalanan dan mengumpulkan karya akan mendapatkan sertifikat dari AIGYPT.",
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

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "#060608", color: "#FAFAFA" }}>
      <Navbar />

      {/* ══ SECTION 1: HERO ══ */}
      <section className="relative overflow-hidden pt-28 pb-32 sm:pt-40 sm:pb-44">
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
            RUMAH BELAJAR AI UNTUK MASISIR
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
            <span style={{ color: "rgba(250,250,250,0.85)" }}>Masa Depanmu.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-12"
            style={{ color: "#A1A1AA", fontWeight: 300 }}
          >
            AIGYPT adalah tempat masisir belajar memanfaatkan AI untuk segala aspek kehidupan —
            dari bangku kuliah Al-Azhar, hingga membangun karya dan penghidupan sendiri.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <Link href="/login">
              <span
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-xl cursor-pointer transition-all duration-300"
                style={{
                  background: "#7C3AED",
                  boxShadow: "0 0 24px rgba(124,58,237,0.35)",
                }}
              >
                Mulai Belajar <IconArrow />
              </span>
            </Link>
            <Link href="/kurikulum">
              <span
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium rounded-xl cursor-pointer transition-all duration-300 hover:border-purple-500/50 hover:text-white"
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#A1A1AA",
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
            {["DIKURASI UNTUK MASISIR", "BERBASIS PRAKTIK", "KOMUNITAS PENCIPTA"].map((t) => (
              <span key={t} className="font-mono text-xs tracking-widest" style={{ color: "#52525B", letterSpacing: "0.15em" }}>
                {t}
              </span>
            ))}
          </motion.div>
        </Reveal>
      </section>

      {/* ══ SECTION 2: VISI / MANIFESTO ══ */}
      <section className="py-20 sm:py-32" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <Reveal className="max-w-4xl mx-auto px-6 sm:px-10 text-center">
          <SectionLabel>VISI KAMI</SectionLabel>
          <motion.h2
            variants={fadeUp}
            className="font-display font-semibold leading-tight mb-10"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", letterSpacing: "-0.015em" }}
          >
            Kami percaya setiap masisir ditakdirkan untuk{" "}
            <span style={{ color: "#A855F7" }}>mencipta</span> — bukan sekadar mengonsumsi.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-base leading-[1.9] max-w-2xl mx-auto"
            style={{ color: "#71717A", fontWeight: 300 }}
          >
            Di tengah ribuan masisir yang menuntut ilmu di negeri para nabi, tersimpan potensi
            yang luar biasa. Kecerdasan buatan kini menjadi alat yang mampu melipatgandakan
            potensi itu. AIGYPT hadir untuk memastikan tak satu pun masisir tertinggal dari
            perubahan zaman — dengan ilmu yang dikurasi khusus untuk dunia mereka.
          </motion.p>
        </Reveal>
      </section>

      {/* ══ SECTION 3: SPEKTRUM PEMBELAJARAN ══ */}
      <section className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <Reveal className="text-center mb-16">
            <SectionLabel>SPEKTRUM PEMBELAJARAN</SectionLabel>
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
                desc: "Memahami cara kerja AI dan mengubah cara berpikir tentangnya.",
              },
              {
                icon: <IconMessage />,
                title: "Seni Prompting",
                desc: "Berdialog dengan AI untuk hasil yang berkualitas tinggi.",
              },
              {
                icon: <IconBook />,
                title: "AI untuk Akademik",
                desc: "Makalah Arab, kitab klasik, riset, dan skripsi.",
              },
              {
                icon: <IconUsers />,
                title: "AI untuk Organisasi",
                desc: "Proposal, notulensi, publikasi, dan laporan.",
              },
              {
                icon: <IconTrending />,
                title: "AI untuk Bisnis & Konten",
                desc: "Copywriting, riset pasar, dan produksi konten.",
              },
              {
                icon: <IconCode />,
                title: "Vibe Coding",
                desc: "Membangun aplikasi nyata tanpa menjadi programmer.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group relative rounded-2xl p-6 transition-all duration-300 cursor-default"
                style={{
                  background: "rgba(16,16,24,0.6)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                whileHover={{
                  borderColor: "rgba(124,58,237,0.3)",
                  background: "rgba(20,20,32,0.8)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300 group-hover:bg-purple-500/20"
                  style={{ background: "rgba(124,58,237,0.1)", color: "#A855F7" }}
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

      {/* ══ SECTION 4: MENGAPA AIGYPT ══ */}
      <section
        className="py-20 sm:py-28"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}
      >
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <Reveal className="mb-16">
            <SectionLabel>MENGAPA AIGYPT BERBEDA</SectionLabel>
          </Reveal>

          <Reveal className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-12">
            {[
              {
                num: "01",
                title: "Dikurasi untuk Masisir",
                desc: "Setiap contoh dan studi kasus lahir dari kehidupan nyata mahasiswa Indonesia di Mesir. Bukan teori generik yang bisa dicari sendiri.",
              },
              {
                num: "02",
                title: "Berbasis Praktik",
                desc: "Kamu tidak hanya belajar — kamu mencipta. Setiap pembelajaran berujung pada karya nyata yang bisa langsung dipakai.",
              },
              {
                num: "03",
                title: "Bertumbuh Bersamamu",
                desc: "Dari pemula hingga pencipta. Materi tersusun bertahap, mengikuti perjalananmu dari fondasi menuju penciptaan.",
              },
              {
                num: "04",
                title: "Komunitas Pencipta",
                desc: "Bergabung dengan masisir lain yang membangun masa depan dengan kecerdasan buatan — saling belajar, saling mendorong.",
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
      <section className="py-20 sm:py-32">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <Reveal className="text-center mb-12">
            <SectionLabel>MULAI DARI SINI</SectionLabel>
            <motion.h2
              variants={fadeUp}
              className="font-display font-semibold"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", letterSpacing: "-0.015em" }}
            >
              Kelas Perdana AIGYPT
            </motion.h2>
          </Reveal>

          <Reveal>
            <motion.div
              variants={fadeUp}
              className="relative rounded-3xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(16,16,24,0.95) 0%, rgba(20,12,36,0.95) 100%)",
                border: "1px solid rgba(124,58,237,0.2)",
                boxShadow: "0 0 60px rgba(124,58,237,0.08)",
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
                    <p className="text-sm italic" style={{ color: "#71717A" }}>
                      "Kelas perdana AIGYPT — dari bertanya, hingga mencipta."
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

                <p className="text-sm leading-[1.9] mb-8 max-w-2xl" style={{ color: "#A1A1AA", fontWeight: 300 }}>
                  Perjalanan transformatif dari memahami AI hingga membangun solusi nyata dengan tanganmu sendiri.
                  Enam sesi yang akan mengubah cara kamu bekerja, belajar, dan berkarya.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Link href="/kelas/maksimalkan-ai">
                    <span
                      className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl cursor-pointer transition-all duration-300"
                      style={{ background: "#7C3AED", boxShadow: "0 0 20px rgba(124,58,237,0.3)" }}
                    >
                      Lihat Kelas Ini <IconArrow />
                    </span>
                  </Link>
                  <Link href="/kurikulum">
                    <span
                      className="text-sm cursor-pointer transition-colors hover:text-white"
                      style={{ color: "#71717A" }}
                    >
                      Lihat detail kurikulum →
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* ══ SECTION 6: SEGERA HADIR ══ */}
      <section className="py-20 sm:py-28" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <Reveal className="mb-12">
            <SectionLabel>YANG AKAN DATANG</SectionLabel>
            <motion.h2
              variants={fadeUp}
              className="font-display font-semibold mb-4"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", letterSpacing: "-0.015em" }}
            >
              Perjalanan Ini Baru Dimulai
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm" style={{ color: "#52525B" }}>
              Kelas baru terus dikembangkan bersama kebutuhan masisir.
            </motion.p>
          </Reveal>

          <Reveal className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Bahasa Arab Akademik dengan AI", desc: "Taklukkan makalah, muthala'ah, dan kitab klasik dengan bantuan AI." },
              { title: "Bangun Penghidupan dengan AI", desc: "Ubah keterampilan dan ide menjadi sumber penghasilan nyata." },
              { title: "Vibe Coding: Dari Nol ke Aplikasi", desc: "Bangun software yang berguna tanpa perlu menjadi programmer." },
              { title: "Konten & Dakwah Digital dengan AI", desc: "Sebarkan kebaikan dan ilmu dengan kecerdasan sebagai alat." },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="rounded-2xl p-6"
                style={{
                  background: "rgba(10,10,15,0.6)",
                  border: "1px solid rgba(255,255,255,0.05)",
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

      {/* ══ SECTION 7: KEANGGOTAAN ══ */}
      <section id="keanggotaan" className="py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <Reveal className="text-center mb-14">
            <SectionLabel>BERGABUNG DENGAN AIGYPT</SectionLabel>
            <motion.h2
              variants={fadeUp}
              className="font-display font-semibold mb-4"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", letterSpacing: "-0.015em" }}
            >
              Sebuah Investasi pada Dirimu
            </motion.h2>
            <motion.p variants={fadeUp} className="font-mono text-xs tracking-widest" style={{ color: "#52525B", letterSpacing: "0.15em" }}>
              KUOTA TERBATAS PER BATCH UNTUK MENJAGA KUALITAS
            </motion.p>
          </Reveal>

          <Reveal className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                name: "Mandiri",
                tag: "Fleksibel",
                desc: "Akses mandiri ke semua materi kelas. Belajar dengan kecepatanmu sendiri.",
                features: [
                  "Akses seluruh materi kelas",
                  "Forum komunitas AIGYPT",
                  "Update materi berkala",
                  "Sertifikat penyelesaian",
                ],
                cta: "Mulai Mandiri",
                msg: "Halo, saya tertarik dengan Keanggotaan Mandiri AIGYPT",
                highlight: false,
              },
              {
                name: "Kelas",
                tag: "Rekomendasi",
                desc: "Pengalaman belajar penuh dengan sesi langsung, mentor, dan komunitas aktif.",
                features: [
                  "Semua fitur Mandiri",
                  "Sesi live interaktif",
                  "Mentoring & umpan balik",
                  "Demo Day & portofolio",
                ],
                cta: "Daftar Kelas",
                msg: "Halo, saya tertarik dengan Keanggotaan Kelas AIGYPT",
                highlight: true,
              },
            ].map((tier) => (
              <motion.div
                key={tier.name}
                variants={fadeUp}
                className="relative rounded-2xl p-8 flex flex-col"
                style={{
                  background: tier.highlight ? "rgba(20,12,36,0.9)" : "rgba(10,10,15,0.7)",
                  border: tier.highlight ? "1px solid rgba(124,58,237,0.3)" : "1px solid rgba(255,255,255,0.06)",
                  boxShadow: tier.highlight ? "0 0 40px rgba(124,58,237,0.08)" : "none",
                }}
              >
                {tier.highlight && (
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.6), transparent)" }}
                  />
                )}
                <div className="flex items-start justify-between mb-5">
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
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm" style={{ color: "#A1A1AA" }}>
                      <span style={{ color: "#7C3AED" }}><IconCheck /></span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={waUrl(tier.msg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center py-3 text-sm font-semibold rounded-xl transition-all duration-300"
                  style={
                    tier.highlight
                      ? { background: "#7C3AED", color: "#fff", boxShadow: "0 0 20px rgba(124,58,237,0.3)" }
                      : { border: "1px solid rgba(124,58,237,0.3)", color: "#A855F7" }
                  }
                >
                  {tier.cta} →
                </a>
              </motion.div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="py-16 sm:py-24" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
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
      <section className="relative py-28 sm:py-40 overflow-hidden">
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
            Masa depanmu dimulai
            <br />
            <span style={{ color: "#A855F7" }}>dengan satu keputusan.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg mb-12"
            style={{ color: "#71717A", fontWeight: 300 }}
          >
            Bergabunglah dengan masisir yang memilih untuk mencipta.
          </motion.p>
          <motion.div variants={fadeUp}>
            <a
              href={waUrl("Halo, saya ingin memulai perjalanan bersama AIGYPT")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-4 text-base font-semibold text-white rounded-xl transition-all duration-300"
              style={{
                background: "#7C3AED",
                boxShadow: "0 0 40px rgba(124,58,237,0.4)",
              }}
            >
              Mulai Perjalananmu <IconArrow />
            </a>
          </motion.div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
