import { PromptBlock } from "@/components/PromptBlock";
import { TakeHomeBox, HighlightBox, LatihanBox, SectionHeading, Table } from "@/components/MateriBlocks";

export default function Sesi1() {
  return (
    <div className="prose-custom">
      <HighlightBox>
        <p className="text-xs font-mono text-[#A855F7] uppercase tracking-wider mb-2">Tujuan Sesi</p>
        <ul className="space-y-1 text-sm">
          <li>Punya mindset yang benar soal AI — bukan takut, bukan lebay</li>
          <li>Ngerti cara kerja AI secara sederhana tanpa jargon teknis</li>
          <li>Tau perbedaan ChatGPT, Claude, dan Gemini — dan kapan pakai yang mana</li>
          <li>Sudah coba sendiri minimal satu interaksi dengan AI yang berguna</li>
        </ul>
      </HighlightBox>

      <SectionHeading>Bagian 1 — Jujur Dulu: Lo Pakai AI Buat Apa?</SectionHeading>
      <p className="text-sm text-[#94A3B8] leading-relaxed mb-3">
        Sebelum kita mulai, gue mau nanya jujur: <em>Lo selama ini pakai AI buat apa?</em>
      </p>
      <p className="text-sm text-[#94A3B8] leading-relaxed mb-3">
        Kemungkinan jawabannya: belum pernah sama sekali, cuma nanya-nanya random, copy-paste jawaban buat tugas, atau udah sering tapi hasilnya sering ga memuaskan. Apapun jawabannya, itu normal.
      </p>
      <p className="text-sm text-[#94A3B8] leading-relaxed">
        Yang paling banyak terjadi: orang pakai AI seperti pakai <strong className="text-white">mesin pencari</strong> — tanya satu kalimat pendek, dapat jawaban, selesai. Padahal AI itu jauh lebih dari itu. Analogi yang tepat: <strong className="text-white">AI itu bukan Google. AI itu asisten pribadi yang sangat pintar — tapi lo yang harus jadi atasannya.</strong>
      </p>

      <SectionHeading>Bagian 2 — AI Itu Sebenarnya Apa?</SectionHeading>
      <p className="text-sm text-[#94A3B8] leading-relaxed mb-3">
        AI seperti ChatGPT, Claude, dan Gemini adalah <strong className="text-white">Large Language Models (LLM)</strong>. Cara kerjanya sederhana: mereka membaca miliaran teks, belajar pola, lalu memprediksi kata demi kata yang paling relevan untuk menjawab pertanyaan lo.
      </p>
      <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">
        Analogi masisir: bayangkan ada santri yang sudah khatam ribuan kitab, hafal jutaan hadits, baca semua buku yang pernah ada — dan sekarang lo bisa tanya apa saja kepadanya. Dia tidak selalu benar 100%, tapi dia sangat berpengetahuan.
      </p>

      <Table
        headers={["Mitos", "Realita"]}
        rows={[
          ["AI selalu benar", "AI bisa salah — lo harus tetap kritis"],
          ["AI bisa baca pikiran", "AI hanya tau apa yang lo tulis kepadanya"],
          ["AI bakal gantiin lo", "AI memperkuat kemampuan lo, bukan menggantikan"],
          ["AI itu ribet dan teknis", "Siapapun bisa pakai AI kalau tau caranya"],
          ["AI itu haram/tidak etis", "Tergantung cara pakainya — pisau bisa masak, bisa juga berbahaya"],
        ]}
      />

      <div className="my-4 p-4 rounded-lg border border-[#7C3AED]/40 bg-[#7C3AED]/10 text-center">
        <p className="text-white font-semibold text-sm">"AI sebaik promptnya."</p>
        <p className="text-[#94A3B8] text-xs mt-1">Garbage in, garbage out.</p>
      </div>

      <SectionHeading>Bagian 3 — Kenalan: ChatGPT vs Claude vs Gemini</SectionHeading>

      <div className="space-y-4 mb-4">
        {[
          {
            name: "ChatGPT (OpenAI)",
            pros: ["Paling populer — komunitas dan tutorial terbanyak", "GPT-4o bisa lihat gambar dan file", "Ada plugins dan GPT custom"],
            cons: ["Versi gratis terbatas", "Kadang terlalu 'aman' — jawabannya sering generik", "Bisa halusinasi"],
            best: "Brainstorming umum, nulis konten, coding awal",
          },
          {
            name: "Claude (Anthropic)",
            pros: ["Terbaik untuk teks panjang — bisa baca dokumen, kitab, PDF", "Jawaban lebih nuanced dan thoughtful", "Lebih jujur kalau tidak tahu"],
            cons: ["Tidak bisa browsing internet (kecuali versi terbaru)", "Kurang populer jadi tutorial lebih sedikit"],
            best: "Nulis makalah, terjemah kitab, analisis dokumen, prompt kompleks",
          },
          {
            name: "Gemini (Google)",
            pros: ["Terintegrasi dengan Google (Drive, Docs, Gmail)", "Bisa akses internet real-time", "Gratis dengan fitur lengkap"],
            cons: ["Kualitas teks kadang kurang konsisten", "Kurang kuat untuk tugas kreatif kompleks"],
            best: "Riset terkini, cek fakta, integrasi Google Workspace",
          },
        ].map((ai) => (
          <div key={ai.name} className="rounded-xl border border-[#1E1E2E] bg-[#12121A] p-5">
            <h4 className="font-display font-semibold text-white text-sm mb-3">{ai.name}</h4>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <p className="text-xs text-green-400 font-mono mb-1">Kelebihan</p>
                <ul className="space-y-1">{ai.pros.map((p, i) => <li key={i} className="text-xs text-[#94A3B8]">+ {p}</li>)}</ul>
              </div>
              <div>
                <p className="text-xs text-red-400 font-mono mb-1">Kelemahan</p>
                <ul className="space-y-1">{ai.cons.map((c, i) => <li key={i} className="text-xs text-[#94A3B8]">- {c}</li>)}</ul>
              </div>
            </div>
            <p className="text-xs text-[#94A3B8]"><span className="text-[#A855F7]">Terbaik untuk:</span> {ai.best}</p>
          </div>
        ))}
      </div>

      <Table
        headers={["Kebutuhan", "Tools Terbaik"]}
        rows={[
          ["Nulis makalah bahasa Arab", "Claude"],
          ["Terjemah kitab kuning", "Claude"],
          ["Bikin proposal kegiatan", "ChatGPT atau Claude"],
          ["Riset berita terkini", "Gemini"],
          ["Generate ide konten", "ChatGPT"],
          ["Analisis dokumen panjang", "Claude"],
          ["Bikin kode/script", "ChatGPT atau Claude"],
          ["Cek fakta real-time", "Gemini"],
        ]}
      />

      <SectionHeading>Bagian 4 — Demo Live: Satu Masalah, Tiga AI</SectionHeading>
      <p className="text-sm text-[#94A3B8] leading-relaxed mb-3">
        Skenario: Kamu harus membuat makalah tentang "Konsep Tawazun dalam Islam dan Relevansinya dengan Kehidupan Modern" dalam bahasa Arab. Prompt yang sama dikirim ke tiga AI:
      </p>
      <PromptBlock label="Prompt Demo Live">{`Saya mahasiswa Al-Azhar Kairo. Saya harus menulis makalah 
dalam bahasa Arab tentang "Konsep Tawazun dalam Islam dan 
Relevansinya dengan Kehidupan Modern". Tolong bantu saya 
membuat outline makalah yang kuat dengan 5 bab utama, 
lengkap dengan sub-poin setiap bab.`}</PromptBlock>
      <p className="text-sm text-[#94A3B8] leading-relaxed">
        Yang diamati: seberapa detail outline, apakah ada referensi kitab, apakah langsung dalam bahasa Arab, dan mana yang paling berguna untuk kebutuhan akademik Al-Azhar. Pelajaran utama: tidak ada AI yang "terbaik" secara absolut — yang terbaik adalah yang cocok untuk tugas spesifik lo.
      </p>

      <SectionHeading>Bagian 5 — Kenapa Prompt Itu Segalanya</SectionHeading>
      <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">
        Dua orang pakai AI yang sama, dapat hasil yang sangat berbeda. Kenapa? Cara mereka bertanya. Lihat perbedaannya:
      </p>

      <PromptBlock label="Prompt Buruk">{`bantu makalah saya`}</PromptBlock>
      <p className="text-xs text-[#94A3B8] mb-3">Hasil: jawaban generik, tidak berguna, AI tidak tau mau bantu apa.</p>

      <PromptBlock label="Prompt Sedang">{`Bantu saya nulis makalah tentang zakat`}</PromptBlock>
      <p className="text-xs text-[#94A3B8] mb-3">Hasil: lumayan, tapi masih terlalu luas, mungkin tidak sesuai format Al-Azhar.</p>

      <PromptBlock label="Prompt Bagus">{`Saya mahasiswa semester 3 di Fakultas Syariah Al-Azhar Kairo. 
Saya perlu menulis makalah 15 halaman tentang "Zakat Digital: 
Hukum Zakat atas Aset Kripto dalam Perspektif Fiqih Kontemporer".

Tolong bantu saya:
1. Buat outline 5 bab dengan sub-poin detail
2. Rekomendasikan 5 referensi kitab fiqih yang relevan
3. Berikan contoh argumen untuk bab pendahuluan

Gunakan gaya akademik formal sesuai standar penulisan ilmiah Arab.`}</PromptBlock>
      <p className="text-xs text-[#94A3B8] mb-3">Hasil: jauh lebih detail, relevan, dan langsung bisa dipakai.</p>

      <SectionHeading>Bagian 6 — AI dan Kehidupan Lo Sebagai Masisir</SectionHeading>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {[
          { label: "Akademisi", items: ["Makalah 3 hari → bisa jadi 1 hari", "Terjemah kitab dalam menit", "AI bantu carikan referensi"] },
          { label: "Organisator", items: ["Proposal selesai dalam jam", "Notulensi rapi otomatis", "Konten publikasi dari draft pertama"] },
          { label: "Bisnisman", items: ["Caption jualan yang convert", "AI bantu riset pasar", "Template CS yang efisien"] },
          { label: "Konten Kreator", items: ["20 ide dalam 10 detik", "Script video dari draft pertama", "Repurpose ke banyak platform"] },
        ].map((p) => (
          <div key={p.label} className="rounded-lg border border-[#1E1E2E] bg-[#12121A] p-4">
            <p className="text-xs font-mono text-[#A855F7] mb-2 uppercase">{p.label}</p>
            <ul className="space-y-1">{p.items.map((item, i) => <li key={i} className="text-xs text-[#94A3B8]">→ {item}</li>)}</ul>
          </div>
        ))}
      </div>

      <LatihanBox title="Latihan 1 — Kenali Dirimu (5 menit)">
        <ol className="space-y-2 text-sm list-decimal pl-4">
          <li>Persona mana yang paling menggambarkan lo? (Akademisi / Organisator / Bisnisman / Kreator / Overwhelmed)</li>
          <li>Apa satu masalah terbesar lo sebagai masisir yang paling sering bikin frustrasi?</li>
          <li>Kalau masalah itu bisa diselesaikan dengan AI, hidup lo akan berubah seperti apa?</li>
        </ol>
        <p className="text-xs text-[#94A3B8] mt-3">Simpan jawaban ini. Kita akan kembali ke sini di Sesi 6.</p>
      </LatihanBox>

      <LatihanBox title="Latihan 2 — First Contact (15 menit)">
        <p className="text-sm mb-3">Buka salah satu dari ChatGPT, Claude, atau Gemini. Ketik prompt berikut (sesuaikan dengan situasi lo):</p>
        <PromptBlock>{`Saya adalah mahasiswa [jurusan lo] di Al-Azhar Kairo, semester [X].
Masalah terbesar saya minggu ini adalah [masalah nyata lo].
Tolong bantu saya dengan memberikan:
1. Tiga cara konkret AI bisa membantu masalah ini
2. Satu langkah pertama yang bisa saya lakukan sekarang`}</PromptBlock>
        <p className="text-sm text-[#94A3B8]">Perhatikan hasilnya. Apakah berguna? Apakah ada yang mengejutkan?</p>
      </LatihanBox>

      <TakeHomeBox>
        <p className="font-semibold text-white mb-3">Sebelum Sesi 2, lakukan ini:</p>
        <ol className="space-y-2 text-sm list-decimal pl-4">
          <li>Pilih satu masalah nyata yang lo hadapi minggu ini sebagai masisir</li>
          <li>Tanyakan ke dua AI berbeda (boleh pakai prompt bebas dulu)</li>
          <li>Screenshot atau catat hasilnya — mana yang lebih berguna, kenapa?</li>
          <li>Bawa ke Sesi 2 — kita akan gunakan ini sebagai bahan belajar prompting</li>
        </ol>
        <p className="text-xs text-[#94A3B8] mt-3">Tidak ada jawaban benar atau salah. Yang penting: lo sudah mulai berinteraksi dengan AI secara intentional.</p>
      </TakeHomeBox>
    </div>
  );
}
