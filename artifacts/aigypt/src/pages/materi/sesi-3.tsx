import { PromptBlock } from "@/components/PromptBlock";
import { TakeHomeBox, HighlightBox, LatihanBox, SectionHeading, Table } from "@/components/MateriBlocks";

export default function Sesi3() {
  return (
    <div>
      <HighlightBox>
        <p className="text-xs font-mono text-[#A855F7] uppercase tracking-wider mb-2">Tujuan Sesi</p>
        <ul className="space-y-1 text-sm">
          <li>Bisa pakai AI untuk menyelesaikan tugas akademik secara signifikan lebih cepat</li>
          <li>Tahu tools AI spesifik yang relevan untuk kebutuhan masisir Al-Azhar</li>
          <li>Menyelesaikan minimal satu tugas akademik atau organisasi nyata dengan AI hari ini</li>
        </ul>
      </HighlightBox>

      <SectionHeading>Bagian 1: Nulis dan Review Makalah Bahasa Arab</SectionHeading>
      <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">
        Ini yang paling dibutuhkan masisir Al-Azhar. Claude adalah tools terbaik untuk ini karena kemampuannya memahami konteks panjang dan nuansa bahasa Arab akademik.
      </p>

      <PromptBlock label="Prompt: Outline Makalah Arab">{`[Role] Kamu adalah dosen pembimbing yang ahli dalam penulisan 
ilmiah bahasa Arab di lingkungan Al-Azhar.

[Context] Saya mahasiswa Fakultas Syariah Al-Azhar, semester 4. 
Saya harus menulis makalah 12 halaman dalam bahasa Arab untuk 
ujian akhir semester, dengan minimal 8 referensi dari kitab klasik.

[Task] Buatkan outline makalah tentang:
"حكم التأمين الصحي في ضوء الفقه الإسلامي المعاصر"
(Hukum Asuransi Kesehatan dalam Perspektif Fiqih Islam Kontemporer)

Sertakan 5 bab dengan 3 sub-poin per bab, dan 8 referensi kitab.

[Format] Outline dalam bahasa Arab. Nomor bab dengan angka Arab 
(١، ٢، ٣). Di akhir, tampilkan referensi dalam format footnote Arab.

[Constraint] Referensi hanya dari ulama klasik dan kontemporer 
yang diakui Al-Azhar. Tidak ada referensi internet.`}</PromptBlock>

      <PromptBlock label="Prompt: Review Nahwu & Sharaf">{`Tolong review teks Arab berikut. Cek:
1. Kesalahan nahwu (harakat, i'rab, tanda baca)
2. Kesalahan sharaf (bentuk kata, wazan)
3. Gaya bahasa, apakah sesuai tulisan ilmiah akademik Al-Azhar?

Untuk setiap kesalahan, jelaskan: letak kesalahan, koreksinya, 
dan alasan gramatikalnya. Setelah review, tampilkan versi 
yang sudah dikoreksi secara lengkap.

[TEMPEL TEKS ARAB LO DI SINI]`}</PromptBlock>

      <Table
        headers={["Tools", "Kegunaan untuk Akademik"]}
        rows={[
          ["Claude", "Nulis makalah, review nahwu, outline, analisis argumen"],
          ["ChatGPT", "Brainstorming topik, cari angle unik, draft cepat"],
          ["NotebookLM", "Upload PDF kitab → tanya langsung ke dalamnya"],
          ["DeepL", "Terjemah profesional untuk teks non-Arab"],
          ["Gemini", "Riset referensi terkini, cek fakta online"],
        ]}
      />

      <SectionHeading>Bagian 2: Terjemah dan Pahami Kitab Kuning</SectionHeading>
      <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">
        Ini game-changer untuk masisir. NotebookLM + Claude adalah kombinasi terbaik.
      </p>

      <PromptBlock label="Prompt: Terjemah + Penjelasan Kitab">{`Berikut adalah teks dari Kitab Fathul Qarib karya Ibn Qasim Al-Ghazi:

[TEMPEL TEKS ARAB DI SINI]

Tolong:
1. Terjemahkan ke bahasa Indonesia yang mudah dipahami
2. Jelaskan istilah fiqih teknis yang muncul
3. Berikan konteks: ini bagian dari bab apa? Membahas hukum apa?
4. Kalau ada khilaf (perbedaan pendapat ulama) di masalah ini, sebutkan

Gaya penjelasan: seperti ustaz yang menjelaskan ke santri baru, 
jelas tapi tetap ilmiah.`}</PromptBlock>

      <PromptBlock label="Prompt: NotebookLM Setup">{`[Cara Pakai NotebookLM untuk Kitab]

1. Buka notebooklm.google.com
2. Buat notebook baru
3. Upload file PDF kitab yang mau dipelajari
4. Setelah diproses, kamu bisa tanya langsung:

Contoh pertanyaan ke NotebookLM:
- "Apa pendapat penulis tentang hukum [X] di halaman berapa?"
- "Ringkas bab 3 tentang [topik]"
- "Bandingkan pendapat penulis di bab 2 dan bab 5 tentang [masalah]"
- "Buat timeline kronologis perkembangan pendapat dalam kitab ini"`}</PromptBlock>

      <SectionHeading>Bagian 3: Riset Skripsi Lebih Efisien</SectionHeading>

      <PromptBlock label="Prompt: Cari Gap Penelitian">{`Saya sedang riset untuk skripsi saya tentang [TOPIK UMUM].

Tolong bantu saya:
1. Identifikasi 5 aspek yang sudah banyak diteliti (well-covered areas)
2. Identifikasi 5 gap penelitian yang masih terbuka dan relevan
3. Untuk setiap gap, jelaskan kenapa ini penting diteliti sekarang
4. Rekomendasikan 3 angle yang paling feasible untuk skripsi 
   mahasiswa S1

Konteks: Saya di [JURUSAN] Al-Azhar, pembimbing saya cenderung 
suka pendekatan [PENDEKATAN, misal: komparatif, analitis, dll].`}</PromptBlock>

      <PromptBlock label="Prompt: Bantu Analisis Jurnal">{`Berikut adalah abstrak dari 3 jurnal yang relevan dengan skripsi saya:

Jurnal 1: [PASTE ABSTRAK]
Jurnal 2: [PASTE ABSTRAK]  
Jurnal 3: [PASTE ABSTRAK]

Tolong:
1. Ringkas temuan utama setiap jurnal (3-4 kalimat per jurnal)
2. Identifikasi persamaan dan perbedaan temuan ketiga jurnal
3. Bagaimana ketiga jurnal ini bisa mendukung argumen skripsi saya 
   tentang [TOPIK SKRIPSI]?
4. Apakah ada kontradiksi yang perlu saya address di skripsi?`}</PromptBlock>

      <SectionHeading>Bagian 4: AI untuk Organisasi Masisir</SectionHeading>

      <PromptBlock label="Prompt: Proposal Kegiatan">{`[Role] Kamu adalah sekretaris profesional berpengalaman di PPMI Mesir.

[Context] Saya ketua divisi sosial PPMI Cabang [KOTA]. Kami akan 
mengadakan [NAMA KEGIATAN] pada [TANGGAL], dengan [JUMLAH] peserta, 
format [ONLINE/OFFLINE], anggaran maksimal Rp [X].

[Task] Buatkan proposal kegiatan lengkap dengan struktur:
- Judul, tema, dan latar belakang
- Tujuan kegiatan (5 poin)
- Sasaran dan target peserta
- Susunan acara detail (jam per jam)
- Kepanitiaan dan job description
- Estimasi anggaran (dalam tabel)
- Penutup

[Format] Format proposal formal PPMI. Tabel anggaran dengan kolom: 
No | Item | Satuan | Qty | Harga Satuan | Total.

[Constraint] Bahasa Indonesia formal. Anggaran dalam Rupiah.`}</PromptBlock>

      <PromptBlock label="Prompt: Notulensi Otomatis dengan TurboScribe">{`[Cara pakai TurboScribe untuk notulensi rapat]

1. Rekam rapat (Zoom, Google Meet, atau rekaman manual)
2. Upload ke turboScribe.co
3. Tunggu transkripsi otomatis (biasanya 2-5 menit)
4. Copy hasil transkripsi
5. Bawa ke Claude dengan prompt berikut:

---
Berikut adalah transkripsi rapat [NAMA RAPAT] tanggal [TANGGAL]:

[PASTE TRANSKRIPSI DI SINI]

Tolong ubah ini menjadi notulensi rapat formal dengan format:
- Informasi rapat (tanggal, tempat, peserta)
- Poin-poin yang dibahas (ringkas, jelas)
- Keputusan yang diambil (per poin)
- Action items (siapa harus melakukan apa, kapan)
- Pertanyaan yang belum terjawab (jika ada)`}</PromptBlock>

      <LatihanBox title="Latihan Sesi 3">
        <p className="text-sm mb-3">Pilih salah satu latihan di bawah ini dan selesaikan sebelum sesi selesai:</p>
        <div className="space-y-3">
          <div>
            <p className="text-xs text-[#A855F7] font-mono mb-1">OPSI A: Akademisi</p>
            <p className="text-sm text-[#94A3B8]">Ambil satu paragraf teks Arab dari kitab yang sedang lo pelajari. Copy ke Claude dengan prompt review nahwu di atas. Perhatikan apa yang AI koreksi.</p>
          </div>
          <div>
            <p className="text-xs text-[#A855F7] font-mono mb-1">OPSI B: Organisator</p>
            <p className="text-sm text-[#94A3B8]">Buat draft proposal untuk kegiatan yang sudah direncanakan organisasimu. Pakai prompt proposal di atas, sesuaikan dengan detail nyata.</p>
          </div>
          <div>
            <p className="text-xs text-[#A855F7] font-mono mb-1">OPSI C: Skripsi/Thesis</p>
            <p className="text-sm text-[#94A3B8]">Paste abstrak 2-3 jurnal relevan dengan skripsi lo ke Claude. Minta AI bantu analisis gap dan posisi penelitianmu.</p>
          </div>
        </div>
      </LatihanBox>

      <TakeHomeBox>
        <p className="font-semibold text-white mb-3">Sebelum Sesi 4:</p>
        <ol className="space-y-2 text-sm list-decimal pl-4">
          <li>Selesaikan minimal satu tugas akademik atau organisasi nyata menggunakan AI</li>
          <li>Catat: berapa lama biasanya lo kerjakan vs dengan AI? Berapa persen lebih cepat?</li>
          <li>Catat juga: apa yang AI lakukan dengan baik, dan apa yang masih perlu lo perbaiki manual?</li>
        </ol>
      </TakeHomeBox>
    </div>
  );
}
