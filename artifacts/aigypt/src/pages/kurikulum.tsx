import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const sessions = [
  {
    num: "01",
    title: "AI Itu Bukan Sulap, Tapi Hampir",
    subtitle: "Mindset & Orientasi",
    goals: "Membangun mindset yang benar soal AI — paham cara kerjanya dan siap pakai untuk kebutuhan nyata sebagai masisir.",
    materi: [
      "Cara kerja AI tanpa jargon teknis — konsep LLM yang bisa dipahami siapapun",
      "ChatGPT vs Claude vs Gemini — perbandingan jujur dan panduan pilih yang mana",
      "Demo live satu masalah, tiga AI — lihat perbedaan nyatanya",
      "Kenapa prompt menentukan segalanya — prinsip dasar yang wajib diingat",
    ],
    tools: ["ChatGPT", "Claude", "Gemini"],
    takeHome: "Tanya 2 AI berbeda tentang masalah nyata lo minggu ini. Screenshot hasilnya, bawa ke sesi berikutnya.",
  },
  {
    num: "02",
    title: "Ngomong yang Bener, Dapet yang Bener",
    subtitle: "Seni Prompting",
    goals: "Bisa membuat prompt yang tajam dan menghasilkan output berkualitas tinggi menggunakan formula RCTFC.",
    materi: [
      "Formula RCTFC (Role, Context, Task, Format, Constraint) — anatomy of a great prompt",
      "Workshop: ubah prompt jelek jadi bagus — latihan langsung untuk 4 persona masisir",
      "Prompt chaining untuk tugas kompleks — cara tanya bertahap untuk hasil terbaik",
      "Bangun prompt library pribadi — kebiasaan yang menghemat puluhan jam hidup lo",
    ],
    tools: ["Claude", "ChatGPT"],
    takeHome: "Buat 3 prompt RCTFC untuk 3 masalah berbeda dalam hidup lo sebagai masisir.",
  },
  {
    num: "03",
    title: "AI Jadi Asisten Akademik & Organisasi Lo",
    subtitle: "AI untuk Kehidupan Akademik & Organisasi",
    goals: "Langsung pakai AI untuk menyelesaikan tugas akademik dan organisasi sehari-hari secara signifikan lebih cepat.",
    materi: [
      "Nulis & review makalah bahasa Arab — dari outline sampai koreksi nahwu dan sharaf",
      "Terjemah dan pahami kitab kuning — cara cerdas memahami teks klasik dengan AI",
      "Summarize jurnal & cari gap penelitian — riset skripsi jadi lebih efisien",
      "Proposal, notulensi otomatis, LPJ — organisasi tanpa tenggelam di kertas kerja",
    ],
    tools: ["Claude", "NotebookLM", "TurboScribe", "DeepL"],
    takeHome: "Selesaikan satu tugas akademik atau organisasi nyata minggu ini dengan AI. Catat berapa lama biasanya vs pakai AI.",
  },
  {
    num: "04",
    title: "AI Jadi Mesin Cuan Lo",
    subtitle: "AI untuk Bisnis & Konten Kreator",
    goals: "Pakai AI untuk bisnis dan konten yang menghasilkan — dari riset produk sampai monetisasi konten.",
    materi: [
      "Riset produk & kompetitor dengan AI — pahami pasar lebih cepat dari siapapun",
      "Copywriting jualan yang convert — framework AIDA, PAS, FAB, dan Storytelling",
      "Content calendar & script konten — dari ide sampai jadwal dalam hitungan menit",
      "Repurpose satu konten jadi banyak format — satu video jadi 5 platform berbeda",
    ],
    tools: ["Claude", "Canva AI", "CapCut AI"],
    takeHome: "Buat satu konten atau materi promosi pakai AI dari A sampai Z — ide, teks, visual.",
  },
  {
    num: "05",
    title: "Lo Bisa Bikin Aplikasi Sendiri",
    subtitle: "Vibe Coding — Dari Masalah ke Produk",
    goals: "Memahami vibe coding dan bisa membuat tools atau aplikasi nyata tanpa bisa coding dari nol.",
    materi: [
      "Apa itu vibe coding dan kenapa ini game-changer — mindset arsitek vs tukang kode",
      "Web app dengan Lovable/Bolt/v0 — dari deskripsi biasa ke aplikasi yang bisa dishare",
      "Generate script via Claude → jalankan di Replit — otomatisasi tugas berulang",
      "Automation workflow dengan n8n/Make — hubungkan berbagai apps tanpa kode",
    ],
    tools: ["Lovable", "Bolt", "v0", "Replit", "n8n"],
    takeHome: "Tulis masalah spesifik lo + solusi ideal yang lo bayangin. Ini jadi bahan Demo Day.",
  },
  {
    num: "06",
    title: "Ini Solusi Gue",
    subtitle: "Build & Demo Day",
    goals: "Setiap peserta presentasikan solusi nyata yang mereka bangun dengan AI di depan komunitas.",
    materi: [
      "Demo Day — 5-7 menit per peserta untuk presentasikan solusi nyata",
      "Format: Masalah → Proses AI → Demo hasil — terstruktur dan berkesan",
      "Feedback konstruktif dari sesama peserta — framework WWW + EBI",
      "Next steps: kembangkan solusi lebih jauh dan dokumentasikan sebagai portofolio",
    ],
    tools: ["Semua tools yang sudah dipelajari"],
    takeHome: "Dokumentasi solusi lo = portofolio pertama lo di bidang AI tools.",
  },
];

export default function Kurikulum() {
  const [openTakeHome, setOpenTakeHome] = useState<number | null>(null);

  return (
    <div className="min-h-screen" style={{ background: "#0A0A0F" }}>
      <Navbar />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(124,58,237,0.08) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
        <div className="text-center mb-14">
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">Kurikulum AIGYPT</h1>
          <p className="text-[#94A3B8] text-sm max-w-xl mx-auto leading-relaxed">
            Enam sesi yang dirancang untuk membawa lo dari penasaran ke produktif — dengan AI sebagai alat utama.
          </p>
        </div>

        <div className="space-y-6">
          {sessions.map((s, i) => (
            <div
              key={s.num}
              className="rounded-2xl border border-[#1E1E2E] bg-[#12121A] p-6 sm:p-8 hover:border-[#7C3AED]/40 transition-all duration-300"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0">
                  <span className="font-mono text-xs text-[#7C3AED] tracking-widest font-bold">SESI {s.num}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-display font-bold text-white text-xl mb-1">{s.title}</h2>
                  <p className="text-xs text-[#7C3AED] font-mono mb-4">{s.subtitle}</p>

                  <div className="rounded-lg p-4 mb-5" style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(109,40,217,0.3)" }}>
                    <p className="text-xs text-[#94A3B8] uppercase tracking-wider font-mono mb-1">Tujuan Sesi</p>
                    <p className="text-sm text-[#E2E8F0] leading-relaxed">{s.goals}</p>
                  </div>

                  <div className="mb-5">
                    <p className="text-xs text-[#94A3B8] uppercase tracking-wider font-mono mb-3">Materi Utama</p>
                    <ul className="space-y-2">
                      {s.materi.map((m, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-[#94A3B8]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-2 flex-shrink-0" />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {s.tools.map((t) => (
                      <span key={t} className="text-xs font-mono px-2 py-0.5 rounded border border-[#7C3AED]/30 text-[#A855F7] bg-[#7C3AED]/10">
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    className="flex items-center gap-2 text-xs font-mono text-[#7C3AED] hover:text-[#A855F7] transition-colors"
                    onClick={() => setOpenTakeHome(openTakeHome === i ? null : i)}
                  >
                    <svg className={`w-4 h-4 transition-transform duration-200 ${openTakeHome === i ? "rotate-90" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Take-Home Challenge
                  </button>
                  {openTakeHome === i && (
                    <div className="mt-3 rounded-lg p-4 border border-[#6D28D9]" style={{ background: "#0F0F1A" }}>
                      <p className="text-sm text-[#E2E8F0] leading-relaxed">{s.takeHome}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
