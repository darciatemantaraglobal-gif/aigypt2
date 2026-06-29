import { PromptBlock } from "@/components/PromptBlock";
import { TakeHomeBox, HighlightBox, LatihanBox, SectionHeading, Table } from "@/components/MateriBlocks";

export default function Sesi2() {
  return (
    <div>
      <HighlightBox>
        <p className="text-xs font-mono text-[#A855F7] uppercase tracking-wider mb-2">Tujuan Sesi</p>
        <ul className="space-y-1 text-sm">
          <li>Paham anatomy of a great prompt — formula RCTFC</li>
          <li>Bisa mengubah prompt jelek menjadi prompt bagus secara real-time</li>
          <li>Menguasai teknik prompt chaining untuk tugas kompleks</li>
          <li>Punya prompt library pribadi pertama yang bisa dipakai ulang</li>
        </ul>
      </HighlightBox>

      <SectionHeading>Bagian 1 — Kenapa Prompt Itu Skill, Bukan Keberuntungan</SectionHeading>
      <p className="text-sm text-[#94A3B8] leading-relaxed mb-3">
        Ada misconception besar soal AI: <em>"AI itu pintar, jadi harusnya ngerti maksud gue walau gue nanya singkat."</em> Ini salah besar. AI tidak bisa membaca pikiran lo — AI hanya bisa merespons <strong className="text-white">apa yang lo tulis</strong>.
      </p>
      <p className="text-sm text-[#94A3B8] leading-relaxed">
        Analogi: bayangkan lo datang ke dokter dan bilang <em>"Dok, saya sakit."</em> Dokter yang baik akan tanya balik. Tapi AI tidak selalu tanya balik. Kalau lo ga kasih informasi yang cukup, AI akan <strong className="text-white">menebak</strong> — dan tebakan itu sering meleset.
      </p>

      <SectionHeading>Bagian 2 — Formula RCTFC</SectionHeading>
      <div className="my-4 rounded-xl border border-[#7C3AED]/40 bg-[#7C3AED]/10 p-5">
        <p className="font-mono text-lg text-white font-bold mb-4 text-center tracking-widest">R · C · T · F · C</p>
        <div className="space-y-3">
          {[
            { letter: "R", name: "Role", desc: "Siapa AI ini dalam konteks ini? Kasih AI sebuah 'identitas' yang sesuai.", example: '"Kamu adalah dosen pembimbing skripsi yang berpengalaman di bidang fiqih kontemporer..."' },
            { letter: "C", name: "Context", desc: "Apa situasi dan latar belakangnya? Ceritakan siapa lo, di mana, apa yang sedang terjadi.", example: '"Saya mahasiswa semester 4 Jurusan Tafsir di Fakultas Ushuluddin Al-Azhar Kairo..."' },
            { letter: "T", name: "Task", desc: "Apa yang lo minta AI lakukan? Gunakan kata kerja spesifik: buatkan, analisis, rangkum, terjemahkan, ubah, bandingkan.", example: '"Buatkan outline 5 bab dengan masing-masing 3 sub-poin, lengkap dengan satu kalimat deskripsi..."' },
            { letter: "F", name: "Format", desc: "Bagaimana lo mau output-nya disajikan? Bullet points, tabel, paragraf, bahasa tertentu, panjang tertentu.", example: '"Sajikan dalam format tabel dengan 3 kolom: Poin Utama, Penjelasan Singkat, Referensi Kitab..."' },
            { letter: "C", name: "Constraint", desc: "Apa yang tidak boleh ada, atau batasan yang harus diikuti.", example: '"Jangan gunakan referensi di luar kitab klasik. Maksimal 300 kata per bagian."' },
          ].map((el) => (
            <div key={el.letter} className="rounded-lg border border-[#1E1E2E] bg-[#0A0A0F] p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono font-bold text-[#A855F7] text-lg w-6">{el.letter}</span>
                <span className="font-display font-semibold text-white text-sm">{el.name}</span>
              </div>
              <p className="text-xs text-[#94A3B8] mb-2">{el.desc}</p>
              <p className="text-xs text-[#7C3AED] font-mono italic">{el.example}</p>
            </div>
          ))}
        </div>
      </div>

      <SectionHeading>Bagian 3 — Workshop: Ubah Prompt Jelek Jadi Bagus</SectionHeading>

      {[
        {
          persona: "Akademisi",
          bad: "tolong buatin makalah tentang riba",
          good: `[Role] Kamu adalah akademisi Islam yang ahli dalam fiqih muamalat 
dan ekonomi Islam kontemporer.

[Context] Saya mahasiswa semester 5 Jurusan Syariah Al-Azhar Kairo. 
Saya harus mengumpulkan makalah 10 halaman untuk mata kuliah Fiqih 
Muamalat. Dosen saya sangat ketat soal referensi — wajib dari kitab 
klasik, minimal 5 referensi.

[Task] Buatkan outline makalah tentang "Riba dalam Transaksi Digital: 
Analisis Hukum Islam terhadap Pinjaman Online" dengan 5 bab utama, 
masing-masing 3 sub-poin.

[Format] Numbered list. Untuk setiap bab, tambahkan satu paragraf 
singkat (2-3 kalimat) yang menjelaskan argumen utamanya. Di akhir, 
berikan 5 rekomendasi referensi kitab klasik yang relevan.

[Constraint] Bahasa Indonesia formal akademik. Jangan masukkan 
referensi dari internet atau blog — hanya kitab dan jurnal ilmiah.`,
        },
        {
          persona: "Organisator",
          bad: "buatin proposal seminar",
          good: `[Role] Kamu adalah sekretaris profesional yang berpengalaman 
membuat proposal kegiatan mahasiswa di luar negeri.

[Context] Saya ketua divisi akademik di organisasi mahasiswa 
Indonesia di Kairo (PPMI). Kami akan mengadakan seminar online 
dengan tema "Peran Masisir dalam Dakwah Digital" untuk 200 peserta 
dari seluruh Indonesia. Acara dijadwalkan tanggal 15 Agustus, 
durasi 3 jam via Zoom.

[Task] Buatkan proposal kegiatan lengkap yang mencakup: latar 
belakang, tujuan, sasaran peserta, susunan acara, estimasi anggaran, 
dan penutup.

[Format] Format proposal formal dengan heading yang jelas. 
Estimasi anggaran dalam bentuk tabel. Total panjang maksimal 3 halaman A4.

[Constraint] Anggaran total tidak lebih dari Rp 5.000.000. 
Bahasa Indonesia formal. Narasumber adalah mahasiswa S3 Al-Azhar 
— jangan ada biaya narasumber.`,
        },
        {
          persona: "Bisnisman",
          bad: "bikin caption jualan baju",
          good: `[Role] Kamu adalah copywriter e-commerce yang spesialis 
di fashion muslimah Indonesia.

[Context] Saya menjual gamis import Mesir secara online ke pelanggan 
di Indonesia melalui Instagram dan WhatsApp. Target pelanggan saya 
adalah perempuan usia 20-35 tahun, kelas menengah, yang ingin tampil 
modis tapi tetap syar'i.

[Task] Buatkan 5 variasi caption untuk produk gamis warna dusty rose 
dengan bahan premium linen Mesir, harga Rp 350.000, free ongkir 
Jawa-Bali.

[Format] Setiap caption: 3-5 kalimat, diakhiri dengan call-to-action, 
dan 5 hashtag relevan. Buat dalam 5 gaya berbeda: emotional, 
informatif, storytelling, urgency, dan testimonial.

[Constraint] Jangan gunakan kata-kata berlebihan seperti "terbaik 
sejagat" atau "paling murah sedunia". Tone harus hangat dan autentik, 
bukan hard-selling.`,
        },
        {
          persona: "Konten Kreator",
          bad: "kasih ide konten",
          good: `[Role] Kamu adalah content strategist yang spesialis di konten 
edukasi-hiburan untuk mahasiswa Muslim Indonesia.

[Context] Saya content creator di TikTok dan Instagram dengan niche 
"kehidupan masisir di Mesir". Followers saya 15.000 orang, mayoritas 
mahasiswa dan calon mahasiswa Al-Azhar. Saya posting 4x seminggu. 
Konten yang perform terbaik: mix antara edukasi Islam ringan dan slice 
of life Kairo.

[Task] Buatkan content calendar 1 bulan (4 minggu x 4 konten) dengan 
variasi format: TikTok/Reels, carousel Instagram, dan Twitter/X thread.

[Format] Tabel dengan kolom: Minggu | Hari | Format | Judul Konten | 
Hook Pembuka | Poin Utama (3 poin) | CTA.

[Constraint] Semua konten harus relevan dengan kehidupan masisir atau 
Islam. Tidak ada konten yang berpotensi kontroversial soal perbedaan 
mazhab. Setiap minggu harus ada minimal 1 konten yang bisa viral.`,
        },
      ].map((ex) => (
        <div key={ex.persona} className="mb-6">
          <p className="text-xs font-mono text-[#A855F7] uppercase tracking-wider mb-2">{ex.persona}</p>
          <PromptBlock label="Prompt Jelek">{ex.bad}</PromptBlock>
          <PromptBlock label="Prompt RCTFC">{ex.good}</PromptBlock>
        </div>
      ))}

      <SectionHeading>Bagian 4 — Prompt Chaining: Tanya Bertahap</SectionHeading>
      <p className="text-sm text-[#94A3B8] leading-relaxed mb-3">
        Satu prompt besar tidak selalu lebih baik dari serangkaian prompt kecil yang terarah. Ini yang disebut <strong className="text-white">prompt chaining</strong>.
      </p>
      <p className="text-sm text-[#94A3B8] mb-4">Contoh: masisir mau nulis makalah tentang hadits.</p>
      <PromptBlock label="Prompt 1 — Eksplorasi Topik">{`Saya mahasiswa Al-Azhar jurusan Hadits. Saya mau nulis makalah 
tentang hadits dhaif tapi bingung angle yang menarik. Berikan 5 
topik spesifik yang belum banyak ditulis tapi relevan dengan 
konteks kekinian.`}</PromptBlock>
      <PromptBlock label="Prompt 2 — Pilih dan Kembangkan">{`Dari 5 topik tadi, saya pilih nomor 3 tentang [topik pilihan]. 
Sekarang buatkan outline 5 bab dengan sub-poin detail dan argumen 
utama per bab.`}</PromptBlock>
      <PromptBlock label="Prompt 3 — Draft Bagian Pertama">{`Bagus. Sekarang tulis Bab 1 (Pendahuluan) berdasarkan outline di 
atas. Panjang 400-500 kata, gaya akademik formal, dalam bahasa Arab.`}</PromptBlock>
      <PromptBlock label="Prompt 4 — Review dan Perbaiki">{`Cek teks Arab yang kamu tulis tadi. Apakah ada kesalahan nahwu 
atau sharaf? Perbaiki dan jelaskan koreksinya.`}</PromptBlock>

      <SectionHeading>Bagian 5 — Bangun Prompt Library Pribadi Lo</SectionHeading>
      <p className="text-sm text-[#94A3B8] leading-relaxed mb-3">
        Setiap kali lo dapat prompt yang hasilnya bagus — <strong className="text-white">simpan</strong>. Beri nama yang mudah dicari, tandai variabel yang bisa diganti dengan <code className="text-[#A855F7] font-mono">[TOPIK]</code>, <code className="text-[#A855F7] font-mono">[JURUSAN]</code>.
      </p>
      <PromptBlock label="Template Prompt Library">{`[Role] Kamu adalah akademisi Islam yang ahli dalam [BIDANG ILMU].

[Context] Saya mahasiswa [JURUSAN] semester [X] di Al-Azhar Kairo. 
Saya menulis makalah untuk mata kuliah [MATA KULIAH].

[Task] Buatkan outline makalah tentang "[JUDUL MAKALAH]" 
dengan 5 bab utama dan 3 sub-poin per bab.

[Format] Numbered list. Tambahkan deskripsi singkat per bab. 
5 rekomendasi referensi di akhir.

[Constraint] Bahasa Indonesia formal. Referensi hanya dari kitab klasik.`}</PromptBlock>
      <p className="text-sm text-[#94A3B8] leading-relaxed">
        Simpan di: Notion (paling recommended), Google Docs, Notes di HP, atau folder di komputer.
      </p>

      <LatihanBox title="Latihan — Bedah Prompt">
        <p className="text-sm mb-3">Identifikasi elemen RCTFC yang ada dan yang kurang dari prompt berikut:</p>
        <PromptBlock label="Prompt A">{`Jelaskan tentang manajemen waktu untuk mahasiswa yang sibuk organisasi`}</PromptBlock>
        <PromptBlock label="Prompt B">{`Saya ketua BEM di kampus. Bantu saya buat jadwal mingguan yang bisa 
balance antara kuliah, rapat, dan belajar mandiri. Saya punya kuliah 
20 jam/minggu dan rapat rata-rata 8 jam/minggu.`}</PromptBlock>
        <p className="text-xs text-[#94A3B8] mt-2">Dari dua prompt ini, mana yang lebih lengkap? Apa yang bisa ditambahkan?</p>
      </LatihanBox>

      <TakeHomeBox>
        <p className="font-semibold text-white mb-3">Sebelum Sesi 3:</p>
        <ol className="space-y-2 text-sm list-decimal pl-4">
          <li>Buat 3 prompt RCTFC untuk 3 masalah berbeda dalam hidup lo sebagai masisir</li>
          <li>Coba setiap prompt ke AI dan catat hasilnya</li>
          <li>Simpan prompt yang hasilnya bagus ke prompt library pertama lo</li>
        </ol>
      </TakeHomeBox>
    </div>
  );
}
