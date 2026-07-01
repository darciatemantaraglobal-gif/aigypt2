import { HighlightBox, LatihanBox, SectionHeading, Table } from "@/components/MateriBlocks";
import { waUrl } from "@/lib/wa";
import { PromptBlock } from "@/components/PromptBlock";

export default function Sesi6() {
  return (
    <div>
      <HighlightBox>
        <p className="text-xs font-mono text-[#A855F7] uppercase tracking-wider mb-2">Tujuan Sesi: Demo Day</p>
        <ul className="space-y-1 text-sm">
          <li>Presentasikan solusi nyata yang telah kamu bangun selama 5 sesi</li>
          <li>Berikan dan terima feedback konstruktif antar sesama peserta</li>
          <li>Rancang next steps untuk mengembangkan solusi lebih jauh</li>
          <li>Dokumentasikan perjalananmu sebagai portofolio AI tools pertama</li>
        </ul>
      </HighlightBox>

      <SectionHeading>Bagian 1: Selamat, Kamu Sudah Jauh!</SectionHeading>
      <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">
        Ingat Sesi 1, kamu masuk dengan satu pertanyaan: <em>"AI sebenarnya bisa apa untuk saya?"</em>
      </p>
      <div className="rounded-xl border border-[#7C3AED]/40 bg-[#7C3AED]/10 p-5 mb-4">
        <p className="font-display font-semibold text-white mb-3">Perjalanan lo dalam 6 sesi:</p>
        <div className="space-y-2">
          {[
            { s: "S01", text: "Lo paham cara kerja AI dan beda ChatGPT, Claude, Gemini" },
            { s: "S02", text: "Kamu kuasai formula RCTFC, prompt kamu sekarang jauh lebih tajam" },
            { s: "S03", text: "Lo bisa selesaikan tugas akademik dan organisasi lebih cepat" },
            { s: "S04", text: "Kamu tahu cara membuat copywriting dan konten yang efektif dengan AI" },
            { s: "S05", text: "Lo membangun sesuatu yang nyata: produk, tools, atau otomasi" },
            { s: "S06", text: "Kamu mempresentasikan solusimu ke komunitas hari ini" },
          ].map((item) => (
            <div key={item.s} className="flex items-start gap-3">
              <span className="font-mono text-xs text-[#7C3AED] font-bold w-8 flex-shrink-0 mt-0.5">{item.s}</span>
              <p className="text-sm text-[#E2E8F0]">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <SectionHeading>Bagian 2: Format Presentasi Demo Day</SectionHeading>
      <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">
        Setiap peserta mendapat <strong className="text-white">5-7 menit</strong> untuk presentasi + 2 menit Q&A. Gunakan struktur berikut:
      </p>

      <div className="space-y-4 mb-6">
        {[
          {
            num: "01",
            title: "Masalah (1 menit)",
            desc: "Ceritakan masalah nyata yang kamu hadapi. Bukan masalah abstrak, masalah yang kamu sendiri rasakan. Buat audiens bisa merasakan frustrasi yang kamu rasakan.",
            example: '"Saya ketua divisi akademik PPMI. Setiap minggu saya harus kirim reminder iuran ke 150 orang, manual, satu-satu, via WA. Itu 3 jam kerja sia-sia setiap minggu."',
          },
          {
            num: "02",
            title: "Proses AI (2-3 menit)",
            desc: "Tunjukkan journey kamu: prompt yang kamu pakai, tools yang kamu pilih, iterasi yang kamu lakukan, dan hal-hal yang tidak berjalan sesuai ekspektasi.",
            example: '"Saya coba Lovable pertama kali, hasilnya 70% bagus. Lalu saya iterate dengan 5 prompt tambahan. Ini screenshot prosesnya..."',
          },
          {
            num: "03",
            title: "Demo Hasil (2 menit)",
            desc: "Tunjukkan produknya secara live. Kalau web app, buka di browser. Kalau script, jalankan. Kalau konten, tunjukkan hasilnya. Jangan hanya screenshot, demo langsung jauh lebih kuat.",
            example: '"Sekarang saya akan demo: saya upload file Excel-nya, klik run, dan dalam 10 detik... 150 pesan WhatsApp personal sudah siap dikirim."',
          },
          {
            num: "04",
            title: "Dampak & Next Steps (30 detik)",
            desc: "Sebutkan dampak konkret: berapa waktu yang dihemat, masalah apa yang terpecahkan, dan apa rencana pengembangan selanjutnya.",
            example: '"Ini menghemat 3 jam per minggu. Next step: otomasi pengiriman via WA API sehingga tidak perlu manual sama sekali."',
          },
        ].map((step) => (
          <div key={step.num} className="rounded-xl border border-[#1E1E2E] bg-[#12121A] p-5">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-xs text-[#7C3AED] font-bold">{step.num}</span>
              <h4 className="font-display font-semibold text-white text-sm">{step.title}</h4>
            </div>
            <p className="text-sm text-[#94A3B8] mb-3">{step.desc}</p>
            <p className="text-xs text-[#7C3AED] font-mono italic">{step.example}</p>
          </div>
        ))}
      </div>

      <SectionHeading>Bagian 3: Framework Feedback Konstruktif</SectionHeading>
      <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">
        Setiap presenter mendapat feedback dari minimal 2 peserta menggunakan framework <strong className="text-white">WWW + EBI</strong>.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-4">
          <p className="text-xs text-green-400 font-mono mb-2">WWW: What Worked Well</p>
          <ul className="space-y-1 text-xs text-[#94A3B8]">
            <li>→ Masalah yang dipilih sangat relatable</li>
            <li>→ Demo live sangat meyakinkan</li>
            <li>→ Prompt chain yang dipakai sangat kreatif</li>
          </ul>
          <p className="text-xs text-[#94A3B8] mt-2 italic">Tujuan: memperkuat apa yang sudah bagus</p>
        </div>
        <div className="rounded-lg border border-[#7C3AED]/30 bg-[#7C3AED]/10 p-4">
          <p className="text-xs text-[#A855F7] font-mono mb-2">EBI: Even Better If</p>
          <ul className="space-y-1 text-xs text-[#94A3B8]">
            <li>→ Kalau ada versi mobile-nya</li>
            <li>→ Kalau data di-visualisasikan dalam chart</li>
            <li>→ Kalau ada tutorial cara pakainya</li>
          </ul>
          <p className="text-xs text-[#94A3B8] mt-2 italic">Tujuan: memberi saran pengembangan konkret</p>
        </div>
      </div>

      <SectionHeading>Bagian 4: Dokumentasikan Solusi Lo</SectionHeading>
      <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">
        Setelah Demo Day, dokumentasikan solusimu sebagai <strong className="text-white">portofolio pertama</strong>. Ini aset yang bisa kamu tunjukkan ke calon klien, employer, atau komunitas.
      </p>

      <PromptBlock label="Prompt: Buat Dokumentasi Portofolio">{`Saya baru selesai membuat [NAMA SOLUSI], sebuah [DESKRIPSI 
SINGKAT] yang dibuat menggunakan AI (tools: [TOOLS YANG DIPAKAI]).

Tolong bantu saya membuat dokumentasi portofolio yang mencakup:
1. Problem Statement (2-3 kalimat yang kuat)
2. Deskripsi solusi yang dibuat
3. Teknologi/tools yang digunakan dan alasannya
4. Proses pembuatan (ringkas, 3-5 langkah utama)
5. Hasil dan dampak yang dicapai
6. Screenshot/demo description
7. Pelajaran yang didapat
8. Rencana pengembangan ke depan

Format: bisa dijadikan post LinkedIn, halaman portfolio, 
atau presentasi singkat. Bahasa Indonesia, tone profesional 
tapi tetap personal.`}</PromptBlock>

      <SectionHeading>Bagian 5: Setelah AIGYPT, Ke Mana Selanjutnya?</SectionHeading>

      <Table
        headers={["Jalur", "Next Steps"]}
        rows={[
          ["Akademisi", "Jadikan AI partner riset permanen. Coba Zotero + AI untuk manajemen referensi skripsi."],
          ["Organisator", "Automasi workflow paling berulang di organisasimu. Ajarkan tim cara pakai AI."],
          ["Bisnisman", "Scale konten dan riset pasar. Eksplorasi tools khusus e-commerce seperti Shopify AI."],
          ["Konten Kreator", "Bangun sistem konten yang sustainable. Eksplorasi AI video (Sora, Kling)."],
          ["Semua", "Ikut komunitas alumni AIGYPT. Share apa yang kamu buat. Terus iterate."],
        ]}
      />

      <div className="my-6 rounded-xl border border-[#7C3AED]/40 p-6 text-center" style={{ background: "rgba(124,58,237,0.1)" }}>
        <p className="font-display font-bold text-white text-xl mb-3">
          "AI tidak akan menggantikan kamu.<br />Tapi orang yang pakai AI akan menggantikan yang tidak."
        </p>
        <p className="text-sm text-[#94A3B8]">Lo sudah memilih sisi yang benar.</p>
      </div>

      <LatihanBox title="Refleksi Akhir (5 menit)">
        <p className="text-sm mb-3">Sebelum sesi berakhir, jawab pertanyaan ini untuk diri sendiri:</p>
        <ol className="space-y-2 list-decimal pl-4 text-sm text-[#94A3B8]">
          <li>Dibanding Sesi 1, apa yang paling berubah dari cara kamu melihat AI?</li>
          <li>Solusi mana yang akan kamu terus kembangkan setelah AIGYPT?</li>
          <li>Siapa satu orang di sekitar kamu yang perlu kamu ajari AI sekarang?</li>
          <li>Apa komitmen konkret yang akan kamu lakukan dalam 30 hari ke depan?</li>
        </ol>
      </LatihanBox>

      <div className="mt-8 rounded-xl border border-[#1E1E2E] bg-[#12121A] p-6 text-center">
        <p className="font-display font-semibold text-white mb-2">Terima Kasih Sudah Bersama AIGYPT</p>
        <p className="text-sm text-[#94A3B8] mb-4">
          Lo sekarang bukan hanya pengguna AI. Lo adalah builder yang bisa mengubah masalah jadi solusi.
        </p>
        <a
          href={waUrl("Halo, saya alumni AIGYPT batch yang ingin tetap terhubung")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-semibold rounded-xl transition-all"
        >
          Bergabung ke Komunitas Alumni
        </a>
      </div>
    </div>
  );
}
