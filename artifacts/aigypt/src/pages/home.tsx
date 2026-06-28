import { Link } from "wouter";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const sessions = [
  {
    num: "01",
    title: "AI Itu Bukan Sulap, Tapi Hampir",
    desc: "Bangun mindset yang benar soal AI, kenali cara kerjanya, dan coba langsung dengan tiga AI berbeda.",
    tools: ["ChatGPT", "Claude", "Gemini"],
  },
  {
    num: "02",
    title: "Ngomong yang Bener, Dapet yang Bener",
    desc: "Kuasai formula RCTFC untuk membuat prompt tajam yang menghasilkan output berkualitas tinggi.",
    tools: ["Claude", "ChatGPT"],
  },
  {
    num: "03",
    title: "AI Jadi Asisten Akademik & Organisasi Lo",
    desc: "Langsung pakai AI untuk makalah Arab, terjemah kitab, notulensi, dan proposal kegiatan.",
    tools: ["Claude", "NotebookLM", "TurboScribe"],
  },
  {
    num: "04",
    title: "AI Jadi Mesin Cuan Lo",
    desc: "Riset produk, copywriting yang convert, content calendar, dan repurpose konten dengan AI.",
    tools: ["Claude", "Canva AI", "CapCut AI"],
  },
  {
    num: "05",
    title: "Lo Bisa Bikin Aplikasi Sendiri",
    desc: "Pahami vibe coding dan buat tools/aplikasi nyata tanpa perlu bisa coding dari nol.",
    tools: ["Lovable", "Bolt", "v0", "Replit", "n8n"],
  },
  {
    num: "06",
    title: "Ini Solusi Gue",
    desc: "Demo Day — setiap peserta presentasikan solusi nyata yang dibangun dengan AI di depan komunitas.",
    tools: ["Semua tools"],
  },
];

const personas = [
  { icon: "A", label: "Akademisi", desc: "Nulis makalah Arab, terjemah kitab, riset skripsi — lebih cepat dan lebih dalam." },
  { icon: "O", label: "Organisator", desc: "Proposal, notulensi, publikasi acara, laporan — tanpa menghabiskan waktu berjam-jam." },
  { icon: "B", label: "Bisnisman", desc: "Copywriting, riset produk, manajemen toko online — kompetitif tanpa modal besar." },
  { icon: "K", label: "Konten Kreator", desc: "Ide konten, scripting, caption, content calendar — konsisten tanpa burn-out." },
  { icon: "?", label: "Yang Overwhelmed", desc: "Belum tau mulai dari mana? Ini justru tempat yang tepat untuk lo." },
];

const faqs = [
  {
    q: "Apakah saya harus bisa coding dulu?",
    a: "Tidak sama sekali. AIGYPT dirancang untuk semua level — dari yang belum pernah pakai AI sampai yang sudah sering pakai tapi hasilnya belum optimal. Di Sesi 5 pun, kita bikin aplikasi tanpa coding.",
  },
  {
    q: "Berapa lama durasi tiap sesi kelas?",
    a: "Setiap sesi berlangsung sekitar 60 menit, dilakukan secara live via Zoom. Member Kelas mendapat akses ke semua sesi live, sementara Member Mandiri bisa belajar dari materi website kapan saja.",
  },
  {
    q: "Apakah materi bisa diakses setelah kelas selesai?",
    a: "Ya. Semua materi tersimpan di website dan bisa diakses selamanya dengan kode member lo. Tidak ada expiry untuk konten materi.",
  },
  {
    q: "Bagaimana cara mendapatkan kode akses?",
    a: "Hubungi kami via WhatsApp, pilih paket yang sesuai, lakukan pembayaran, dan kode akses akan dikirimkan langsung ke email atau WhatsApp lo.",
  },
  {
    q: "Apakah ada syarat khusus untuk mendaftar?",
    a: "Tidak ada syarat akademik khusus. Yang dibutuhkan hanyalah koneksi internet, semangat belajar, dan setidaknya satu masalah nyata yang ingin diselesaikan.",
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen" style={{ background: "#0A0A0F" }}>
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(124,58,237,0.15) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#7C3AED]/40 bg-[#7C3AED]/10 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7] animate-pulse" />
            <span className="text-xs font-mono text-[#A855F7] tracking-widest uppercase">
              Batch 01 &middot; Segera Dibuka
            </span>
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white leading-tight mb-6">
            Maksimalkan AI untuk<br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #A855F7, #7C3AED)" }}>
              Menghasilkan Solusimu
            </span>
          </h1>

          <p className="text-lg text-[#94A3B8] mb-10 max-w-2xl mx-auto leading-relaxed">
            Kelas AI pertama yang dirancang khusus untuk masisir Al-Azhar Kairo.
            Dari mindset sampai solusi nyata — dalam 6 sesi.
          </p>

          {/* Journey visual */}
          <div className="flex flex-wrap justify-center items-center gap-2 mb-10 text-sm">
            {["Masalah Nyata", "Mindset AI", "Prompt Tepat", "Vibe Coding", "Solusi / Produk"].map((step, i, arr) => (
              <div key={step} className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-lg border border-[#1E1E2E] bg-[#12121A] text-[#94A3B8] font-medium text-sm">
                  {step}
                </span>
                {i < arr.length - 1 && (
                  <span className="text-[#7C3AED]">→</span>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/628xxxxxxxxxx"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold rounded-xl transition-all duration-200 text-sm shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)]"
            >
              Daftar Sekarang
            </a>
            <Link href="/kurikulum">
              <span className="px-8 py-3.5 border border-[#1E1E2E] hover:border-[#7C3AED]/50 text-[#94A3B8] hover:text-white font-semibold rounded-xl transition-all duration-200 text-sm cursor-pointer block text-center">
                Lihat Kurikulum
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Personas */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-3">AIGYPT untuk Siapa?</h2>
          <p className="text-[#94A3B8] text-sm">Apapun peran lo sebagai masisir, ada tempat untuk lo di sini.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {personas.map((p) => (
            <div
              key={p.label}
              className="group p-5 rounded-xl border border-[#1E1E2E] bg-[#12121A] hover:border-[#7C3AED]/40 hover:shadow-[0_0_20px_rgba(124,58,237,0.2)] transition-all duration-300 hover:-translate-y-1 cursor-default"
            >
              <div className="w-10 h-10 rounded-lg bg-[#7C3AED]/20 border border-[#7C3AED]/30 flex items-center justify-center mb-4">
                <span className="font-display font-bold text-[#A855F7]">{p.icon}</span>
              </div>
              <h3 className="font-display font-semibold text-white text-sm mb-2">{p.label}</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sessions preview */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-3">6 Sesi, 6 Perubahan Nyata</h2>
          <p className="text-[#94A3B8] text-sm">Setiap sesi dirancang untuk langsung bisa dipraktekkan.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sessions.map((s) => (
            <div
              key={s.num}
              className="group p-5 rounded-xl border border-[#1E1E2E] bg-[#12121A] hover:border-[#7C3AED]/40 hover:shadow-[0_0_20px_rgba(124,58,237,0.2)] transition-all duration-300 hover:-translate-y-1 cursor-default"
            >
              <span className="font-mono text-xs text-[#7C3AED] tracking-widest font-semibold">
                SESI {s.num}
              </span>
              <h3 className="font-display font-semibold text-white text-sm mt-2 mb-3 leading-tight">{s.title}</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed mb-4">{s.desc}</p>
              <div className="flex flex-wrap gap-1">
                {s.tools.slice(0, 3).map((t) => (
                  <span key={t} className="text-xs font-mono px-2 py-0.5 rounded border border-[#7C3AED]/30 text-[#A855F7] bg-[#7C3AED]/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What you get */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-2xl border border-[#1E1E2E] bg-[#12121A] p-8 sm:p-12">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-8 text-center">Yang Lo Dapat</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Satu solusi atau produk nyata buatan sendiri",
              "Kemampuan prompt AI yang bisa dipakai seumur hidup",
              "Portofolio pertama di bidang AI tools",
              "Akses materi website selamanya",
              "Komunitas alumni AIGYPT",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#7C3AED]/20 border border-[#7C3AED]/40 flex-shrink-0 flex items-center justify-center mt-0.5">
                  <svg className="w-3 h-3 text-[#A855F7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-[#94A3B8] leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-3">Pilih Paket Kamu</h2>
          <p className="text-[#94A3B8] text-sm">Hubungi kami untuk info harga terkini dan ketersediaan slot.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Mandiri */}
          <div className="p-6 rounded-2xl border border-[#1E1E2E] bg-[#12121A]">
            <h3 className="font-display font-semibold text-white text-lg mb-1">Member Mandiri</h3>
            <p className="text-xs text-[#94A3B8] mb-4">Self-paced, belajar kapan saja</p>
            <div className="text-3xl font-display font-bold text-white mb-6">Rp ???.000</div>
            <ul className="space-y-2 mb-8">
              {["Akses semua materi 6 sesi", "Akses selamanya", "Prompt library lengkap"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-[#94A3B8]">
                  <svg className="w-4 h-4 text-[#7C3AED] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="https://wa.me/628xxxxxxxxxx?text=Halo, saya tertarik dengan Member Mandiri AIGYPT"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center py-3 px-6 border border-[#7C3AED]/50 text-[#A855F7] hover:bg-[#7C3AED]/10 rounded-xl transition-all duration-200 text-sm font-semibold"
            >
              Hubungi via WhatsApp
            </a>
          </div>

          {/* Kelas */}
          <div className="p-6 rounded-2xl border border-[#7C3AED]/50 bg-[#12121A] relative shadow-[0_0_30px_rgba(124,58,237,0.2)]">
            <div className="absolute -top-3 right-4">
              <span className="text-xs font-mono px-3 py-1 bg-[#7C3AED] text-white rounded-full uppercase tracking-widest">
                Recommended
              </span>
            </div>
            <h3 className="font-display font-semibold text-white text-lg mb-1">Member Kelas</h3>
            <p className="text-xs text-[#94A3B8] mb-4">Live mentoring + akses materi</p>
            <div className="text-3xl font-display font-bold text-white mb-6">Rp ???.000</div>
            <ul className="space-y-2 mb-8">
              {[
                "Akses semua materi 6 sesi",
                "6 sesi mentoring live via Zoom",
                "Demo Day bersama komunitas",
                "Feedback langsung dari mentor",
                "Komunitas alumni batch",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-[#94A3B8]">
                  <svg className="w-4 h-4 text-[#A855F7] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="https://wa.me/628xxxxxxxxxx?text=Halo, saya tertarik dengan Member Kelas AIGYPT"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center py-3 px-6 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl transition-all duration-200 text-sm font-semibold shadow-[0_0_20px_rgba(124,58,237,0.3)]"
            >
              Hubungi via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-10 text-center">Pertanyaan Umum</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl border border-[#1E1E2E] bg-[#12121A] overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="text-sm font-medium text-white pr-4">{faq.q}</span>
                <svg
                  className={`w-4 h-4 text-[#7C3AED] flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4">
                  <p className="text-sm text-[#94A3B8] leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="rounded-2xl border border-[#7C3AED]/30 p-10 sm:p-14" style={{ background: "rgba(124,58,237,0.08)" }}>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-4">
            Siap Mulai Perjalananmu?
          </h2>
          <p className="text-[#94A3B8] text-sm mb-8 leading-relaxed">
            Bergabunglah dengan masisir yang sudah menggunakan AI untuk mengubah cara mereka belajar, berorganisasi, dan berkarya.
          </p>
          <a
            href="https://wa.me/628xxxxxxxxxx?text=Halo, saya ingin bergabung dengan AIGYPT"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold rounded-xl transition-all duration-200 text-sm shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:shadow-[0_0_35px_rgba(124,58,237,0.6)]"
          >
            Daftar Sekarang via WhatsApp
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
