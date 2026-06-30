import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle, Instagram } from "lucide-react";
import { waUrl } from "@/lib/wa";
import { containerStagger, cardItem, viewportConfig } from "@/lib/animations";
import { Logo } from "@/components/Logo";

const colVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0 },
  },
};

const linkItem = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] as const } },
};

function FooterLink({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  const baseClass =
    "text-sm text-[#A1A1AA] hover:text-[#A855F7] transition-colors duration-200 hover:translate-x-0.5 inline-block transform transition-transform";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={baseClass}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href}>
      <span className={baseClass}>{children}</span>
    </Link>
  );
}

function StatusDot() {
  return (
    <span
      className="inline-block w-1.5 h-1.5 rounded-full bg-[#A855F7] mr-1.5 align-middle animate-[dotBlink_1.8s_ease-in-out_infinite]"
      aria-hidden="true"
    />
  );
}

export function Footer() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <footer className="relative mt-20">
      {/* Top border with glow */}
      <div className="footer-top-border" />

      {/* Footer body */}
      <div
        className="relative bg-[#07070D]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 40% at 8% 0%, rgba(168,85,247,0.06) 0%, transparent 70%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          {/* 4-column grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8"
            variants={shouldReduceMotion ? undefined : containerStagger}
            initial={shouldReduceMotion ? undefined : "hidden"}
            whileInView="visible"
            viewport={viewportConfig}
          >
            {/* Column 1 — Brand */}
            <motion.div variants={shouldReduceMotion ? undefined : cardItem} className="sm:col-span-2 lg:col-span-1">
              <div className="mb-3">
                <Logo variant="full" />
              </div>
              <p className="text-sm text-[#A1A1AA] mb-2 leading-relaxed">
                Platform Pembelajaran AI untuk Masisir
              </p>
              <p className="text-xs text-[#71717A] leading-relaxed mb-5">
                Tempat masisir belajar menguasai kecerdasan buatan,
                dari memahami hingga mencipta.
              </p>
              <div className="flex flex-col gap-2.5">
                <a
                  href={waUrl("Halo, saya ingin menghubungi AIGYPT")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-[#A855F7] transition-colors duration-200 group"
                >
                  <MessageCircle size={15} className="shrink-0 group-hover:text-[#A855F7] transition-colors" />
                  Hubungi via WhatsApp
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-[#A855F7] transition-colors duration-200 group"
                >
                  <Instagram size={15} className="shrink-0 group-hover:text-[#A855F7] transition-colors" />
                  Instagram
                </a>
              </div>
            </motion.div>

            {/* Column 2 — Platform */}
            <motion.div variants={shouldReduceMotion ? undefined : colVariants}>
              <motion.p
                variants={shouldReduceMotion ? undefined : linkItem}
                className="text-[10px] font-mono text-[#52525B] uppercase tracking-[0.18em] mb-4"
              >
                Platform
              </motion.p>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: "Kurikulum", href: "/kurikulum" },
                  { label: "Kelas", href: "/kelas" },
                  { label: "Pendaftaran", href: "/daftar" },
                  { label: "Masuk", href: "/login" },
                ].map(({ label, href }) => (
                  <motion.div key={href} variants={shouldReduceMotion ? undefined : linkItem}>
                    <FooterLink href={href}>{label}</FooterLink>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Column 3 — Kelas */}
            <motion.div variants={shouldReduceMotion ? undefined : colVariants}>
              <motion.p
                variants={shouldReduceMotion ? undefined : linkItem}
                className="text-[10px] font-mono text-[#52525B] uppercase tracking-[0.18em] mb-4"
              >
                Kelas
              </motion.p>
              <div className="flex flex-col gap-2.5">
                <motion.div variants={shouldReduceMotion ? undefined : linkItem}>
                  <Link href="/daftar">
                    <span className="text-sm text-[#A1A1AA] hover:text-[#A855F7] transition-colors duration-200 hover:translate-x-0.5 inline-flex items-center transform transition-transform">
                      <StatusDot />
                      Batch 1: Dibuka
                    </span>
                  </Link>
                </motion.div>
                <motion.div variants={shouldReduceMotion ? undefined : linkItem}>
                  <FooterLink href="/toolbox">Vibe Coding Toolbox</FooterLink>
                </motion.div>
                <motion.div variants={shouldReduceMotion ? undefined : linkItem}>
                  <FooterLink href="/kelas">Lihat Semua Kelas</FooterLink>
                </motion.div>
              </div>
            </motion.div>

            {/* Column 4 — Hubungi */}
            <motion.div variants={shouldReduceMotion ? undefined : colVariants}>
              <motion.p
                variants={shouldReduceMotion ? undefined : linkItem}
                className="text-[10px] font-mono text-[#52525B] uppercase tracking-[0.18em] mb-4"
              >
                Hubungi Kami
              </motion.p>
              <div className="flex flex-col gap-2.5">
                <motion.div variants={shouldReduceMotion ? undefined : linkItem}>
                  <a
                    href={waUrl("Halo, saya ingin bertanya tentang AIGYPT")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-[#A855F7] hover:translate-x-0.5 transition-all duration-200 inline-flex transform"
                  >
                    <MessageCircle size={14} className="shrink-0" />
                    WhatsApp
                  </a>
                </motion.div>
                <motion.div variants={shouldReduceMotion ? undefined : linkItem}>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-[#A855F7] hover:translate-x-0.5 transition-all duration-200 inline-flex transform"
                  >
                    <Instagram size={14} className="shrink-0" />
                    Instagram
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom bar */}
          <motion.div
            className="mt-12 pt-5 border-t border-[#1A1A2A] flex flex-col sm:flex-row items-center sm:justify-between gap-2 text-center sm:text-left"
            variants={shouldReduceMotion ? undefined : { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.5, duration: 0.5 } } }}
            initial={shouldReduceMotion ? undefined : "hidden"}
            whileInView="visible"
            viewport={viewportConfig}
          >
            <p className="text-xs text-[#52525B]">© 2026 AIGYPT</p>
            <p className="text-xs text-[#52525B] italic">
              Dibuat untuk{" "}
              <span className="text-[#7C3AED]/70 not-italic">Masisir</span>
              , oleh{" "}
              <span className="text-[#7C3AED]/70 not-italic">Masisir</span>
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
