import { useState, useMemo, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  tools,
  categoryLabels,
  categoryColors,
  pricingColors,
  type Tool,
} from "@/lib/toolboxData";

const ALL_CATEGORIES = "semua";
const categories: { key: string; label: string }[] = [
  { key: ALL_CATEGORIES, label: "Semua" },
  { key: "app-builder", label: "App Builder" },
  { key: "ai-assistant", label: "AI Assistant" },
  { key: "icon", label: "Icon" },
  { key: "illustration", label: "Ilustrasi" },
  { key: "background", label: "Background" },
  { key: "ui-components", label: "UI Components" },
  { key: "design-system", label: "Design System" },
  { key: "database", label: "Database" },
  { key: "deploy", label: "Deploy" },
  { key: "planning", label: "Planning" },
];

const workflow = [
  {
    step: "Research",
    desc: "Pahami masalah dan validasi idenya",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    step: "Plan",
    desc: "Tulis PRD sederhana + bikin DESIGN.md",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    step: "Execute",
    desc: "Bangun bertahap — jangan one-shot!",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    step: "Review",
    desc: "Cek tiap hasil sebelum lanjut",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    step: "Ship",
    desc: "Deploy dan iterate dari feedback nyata",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    ),
  },
];

const goldenRules = [
  "Vibe coding bukan one-shot — bangun bertahap, satu fitur per sesi",
  "Tulis PRD dulu sebelum prompting — AI tidak bisa baca pikiran lo",
  "Pakai DESIGN.md biar UI tidak generik dan AI konsisten",
  "Graduate workflow: prototype di Lovable/Bolt → serius di Cursor/Claude Code",
  "Pilih satu icon library, konsisten selamanya (Lucide untuk shadcn)",
  "Slice vertically — bangun fitur end-to-end, bukan layer per layer",
  "Selalu review — 45% kode AI punya kerentanan keamanan yang tersembunyi",
];

const stacks = [
  {
    title: "Web App Sederhana",
    subtitle: "No-Code, Cepat Live",
    items: [
      { label: "Bangun", value: "Lovable / Bolt" },
      { label: "Database", value: "Supabase" },
      { label: "Ikon", value: "Lucide" },
      { label: "Ilustrasi", value: "unDraw" },
      { label: "Background", value: "GradientsHub" },
      { label: "Deploy", value: "Otomatis" },
    ],
    badge: "Beginner",
    badgeColor: "text-green-400 bg-green-400/10 border-green-400/30",
  },
  {
    title: "Proyek Serius",
    subtitle: "Mau Di-iterate Jangka Panjang",
    items: [
      { label: "Prototype", value: "Lovable / Bolt" },
      { label: "Lanjut", value: "Replit + AI Agent" },
      { label: "Design", value: "DESIGN.md" },
      { label: "UI", value: "shadcn/ui + Aceternity" },
      { label: "Database", value: "Supabase" },
      { label: "Deploy", value: "Vercel" },
    ],
    badge: "Intermediate",
    badgeColor: "text-[#A855F7] bg-[#7C3AED]/10 border-[#7C3AED]/30",
    highlight: true,
  },
  {
    title: "Script & Automation",
    subtitle: "Otomatisasi Tugas Berulang",
    items: [
      { label: "Generate kode", value: "Claude" },
      { label: "Jalankan", value: "Replit" },
      { label: "Automation", value: "n8n / Make" },
    ],
    badge: "Advanced",
    badgeColor: "text-amber-400 bg-amber-400/10 border-amber-400/30",
  },
];

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <div className="group flex flex-col p-5 rounded-xl border border-[#1E1E2E] bg-[#12121A] hover:border-[#7C3AED]/40 hover:shadow-[0_0_20px_rgba(124,58,237,0.18)] transition-all duration-300 hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-display font-semibold text-white text-sm leading-tight">{tool.name}</h3>
        <span className={`flex-shrink-0 text-[10px] font-mono px-2 py-0.5 rounded border ${pricingColors[tool.pricing]}`}>
          {tool.pricing}
        </span>
      </div>
      <span className={`self-start text-[10px] font-mono px-2 py-0.5 rounded border mb-3 ${categoryColors[tool.category]}`}>
        {categoryLabels[tool.category]}
      </span>
      <p className="text-xs text-[#94A3B8] leading-relaxed flex-1 mb-4">{tool.description}</p>
      <a
        href={tool.url.startsWith("http") ? tool.url : `https://${tool.url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs text-[#7C3AED] hover:text-[#A855F7] font-mono transition-colors group-hover:gap-2.5 duration-200 mt-auto"
      >
        Kunjungi
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  );
}

export default function Toolbox() {
  const { isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setLocation("/login");
    }
  }, [isLoading, isAuthenticated, setLocation]);

  const filtered = useMemo(() => {
    return tools.filter((t) => {
      const matchesCategory =
        activeCategory === ALL_CATEGORIES || t.category === activeCategory;
      const matchesSearch =
        !search ||
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0A0A0F" }}>
        <svg className="animate-spin w-8 h-8 text-[#7C3AED]" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#0A0A0F" }}>
      <Navbar />
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(124,58,237,0.07) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-24">

        {/* HERO */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#7C3AED]/40 bg-[#7C3AED]/10 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7]" />
            <span className="text-xs font-mono text-[#A855F7] tracking-widest uppercase">Resource Hub</span>
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-white mb-4 leading-tight">
            Vibe Coding Toolbox
          </h1>
          <p className="text-[#94A3B8] text-base max-w-2xl mx-auto leading-relaxed mb-2">
            Semua tools, workflow, dan asset yang lo butuhin untuk bikin solusi sendiri — di satu tempat.
          </p>
          <p className="text-[#94A3B8] text-sm max-w-xl mx-auto">
            Koleksi tools vibe coding terbaik 2026 yang dikurasi khusus untuk masisir — dari app builder untuk pemula sampai AI assistant untuk yang sudah serius.
          </p>
        </div>

        {/* WORKFLOW SECTION */}
        <section className="mb-14">
          <h2 className="font-display font-bold text-xl text-white mb-6 text-center">
            Workflow Terbaik: Dari Ide ke Produk
          </h2>

          {/* Flow steps */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            {workflow.map((w, i) => (
              <div key={w.step} className="flex sm:flex-col items-center sm:items-start gap-3 sm:gap-2 flex-1">
                <div className="flex items-center gap-3 flex-1 sm:flex-col sm:items-start w-full">
                  <div className="flex-shrink-0 rounded-lg p-2.5 bg-[#7C3AED]/15 border border-[#7C3AED]/30 text-[#A855F7]">
                    {w.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-display font-semibold text-white text-sm">{w.step}</p>
                    <p className="text-xs text-[#94A3B8] leading-snug mt-0.5">{w.desc}</p>
                  </div>
                </div>
                {i < workflow.length - 1 && (
                  <div className="hidden sm:block w-full h-px bg-gradient-to-r from-[#7C3AED]/40 to-transparent mt-4 mb-2" />
                )}
              </div>
            ))}
          </div>

          {/* Golden Rules */}
          <div className="rounded-2xl border border-[#7C3AED]/30 p-6 sm:p-8" style={{ background: "rgba(124,58,237,0.07)" }}>
            <div className="flex items-center gap-2 mb-5">
              <span className="font-mono text-xs text-[#A855F7] uppercase tracking-widest font-semibold">7 Aturan Emas Vibe Coding</span>
            </div>
            <ol className="space-y-3">
              {goldenRules.map((rule, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#7C3AED]/20 border border-[#7C3AED]/40 flex items-center justify-center text-[10px] font-mono font-bold text-[#A855F7] mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm text-[#E2E8F0] leading-relaxed">{rule}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* SEARCH & FILTER */}
        <section className="mb-8 sticky top-[64px] z-40 py-4" style={{ background: "#0A0A0F" }}>
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#475569]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari tools..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#1E1E2E] bg-[#12121A] text-white placeholder-[#475569] text-sm focus:outline-none focus:border-[#7C3AED] transition-colors"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#475569] hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-[#94A3B8] font-mono flex-shrink-0">
              <span>{filtered.length}</span>
              <span>tools</span>
            </div>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 border ${
                  activeCategory === cat.key
                    ? "bg-[#7C3AED] border-[#7C3AED] text-white shadow-[0_0_12px_rgba(124,58,237,0.4)]"
                    : "border-[#1E1E2E] text-[#94A3B8] hover:border-[#7C3AED]/40 hover:text-white bg-[#12121A]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* TOOLS GRID */}
        <section className="mb-20">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#94A3B8] text-sm">Tidak ada tools yang cocok dengan pencarian lo.</p>
              <button
                onClick={() => { setSearch(""); setActiveCategory(ALL_CATEGORIES); }}
                className="mt-3 text-xs text-[#7C3AED] hover:text-[#A855F7] transition-colors font-mono"
              >
                Reset filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((tool) => (
                <ToolCard key={tool.name} tool={tool} />
              ))}
            </div>
          )}
        </section>

        {/* DESIGN.md SPOTLIGHT */}
        <section className="mb-16">
          <div
            className="rounded-2xl border border-[#7C3AED]/50 p-8 sm:p-10 shadow-[0_0_40px_rgba(124,58,237,0.15)]"
            style={{ background: "rgba(124,58,237,0.08)" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs text-[#A855F7] uppercase tracking-widest">Spotlight</span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-3">
              Senjata Rahasia: DESIGN.md
            </h2>
            <p className="text-[#94A3B8] text-sm leading-relaxed mb-8 max-w-2xl">
              DESIGN.md adalah file markdown tunggal yang dibaca AI agent untuk menghasilkan UI yang konsisten. Diperkenalkan Google Stitch pada Maret 2026, konsep ini memecahkan masalah paling umum vibe coding: UI yang terasa generik dan tidak kohesif meskipun sudah punya kode yang bagus.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {/* 3 cara membuat */}
              <div className="rounded-xl border border-[#1E1E2E] bg-[#0A0A0F] p-5">
                <p className="text-xs font-mono text-[#A855F7] uppercase tracking-wider mb-4">3 Cara Membuat DESIGN.md</p>
                <div className="space-y-4">
                  {[
                    { num: "01", title: "Biarkan AI menulisnya", desc: "Deskripsikan vibe dan brand lo, AI terjemahkan jadi sistem desain yang lengkap." },
                    { num: "02", title: "Ekstrak dari brand yang ada", desc: "Kasih URL atau logo, AI tarik palette, typography, dan tone-of-voice secara otomatis." },
                    { num: "03", title: "Tulis manual", desc: "Mulai dari warna dan typography, tambahkan aturan secara bertahap saat kebutuhan muncul." },
                  ].map((item) => (
                    <div key={item.num} className="flex gap-3">
                      <span className="font-mono text-xs text-[#7C3AED] font-bold w-6 flex-shrink-0 mt-0.5">{item.num}</span>
                      <div>
                        <p className="text-white text-xs font-semibold mb-0.5">{item.title}</p>
                        <p className="text-xs text-[#94A3B8] leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 8 bagian */}
              <div className="rounded-xl border border-[#1E1E2E] bg-[#0A0A0F] p-5">
                <p className="text-xs font-mono text-[#A855F7] uppercase tracking-wider mb-4">8 Bagian DESIGN.md</p>
                <div className="space-y-2">
                  {[
                    "Visual Theme",
                    "Color Palette",
                    "Typography",
                    "Spacing",
                    "Components",
                    "Motion",
                    "Usage Guidelines & Accessibility",
                    "Dos & Don'ts",
                  ].map((section, i) => (
                    <div key={section} className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-[#475569] w-4">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-sm text-[#E2E8F0]">{section}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <a
              href="https://designmd.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]"
            >
              Download Template DESIGN.md
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </section>

        {/* STACK RECOMMENDATIONS */}
        <section className="mb-16">
          <h2 className="font-display font-bold text-xl sm:text-2xl text-white mb-2 text-center">
            Stack Rekomendasi untuk Masisir
          </h2>
          <p className="text-center text-[#94A3B8] text-sm mb-8">Pilih sesuai level dan tujuan lo.</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {stacks.map((stack) => (
              <div
                key={stack.title}
                className={`rounded-2xl border p-6 transition-all duration-300 ${
                  stack.highlight
                    ? "border-[#7C3AED]/50 shadow-[0_0_30px_rgba(124,58,237,0.2)]"
                    : "border-[#1E1E2E]"
                }`}
                style={{ background: stack.highlight ? "rgba(124,58,237,0.08)" : "#12121A" }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-display font-semibold text-white text-sm mb-0.5">{stack.title}</h3>
                    <p className="text-xs text-[#94A3B8]">{stack.subtitle}</p>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border flex-shrink-0 ${stack.badgeColor}`}>
                    {stack.badge}
                  </span>
                </div>
                <div className="space-y-2">
                  {stack.items.map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className="text-xs text-[#475569] font-mono">{item.label}</span>
                      <span className="text-xs text-[#E2E8F0] font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA FOOTER */}
        <section className="text-center">
          <div className="rounded-2xl border border-[#1E1E2E] bg-[#12121A] p-10 sm:p-14">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-3">
              Udah Tau Tools-nya. Sekarang Bikin.
            </h2>
            <p className="text-[#94A3B8] text-sm mb-8">
              Pilih satu masalah, pilih satu tool, mulai hari ini.
            </p>
            <Link href="/materi/sesi-5">
              <span className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold rounded-xl transition-all text-sm cursor-pointer shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Kembali ke Materi Sesi 5
              </span>
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
