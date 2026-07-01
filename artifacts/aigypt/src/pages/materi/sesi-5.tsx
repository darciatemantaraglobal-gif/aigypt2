import { PromptBlock } from "@/components/PromptBlock";
import { TakeHomeBox, HighlightBox, LatihanBox, SectionHeading, Table } from "@/components/MateriBlocks";

export default function Sesi5() {
  return (
    <div>
      <HighlightBox>
        <p className="text-xs font-mono text-[#A855F7] uppercase tracking-wider mb-2">Tujuan Sesi</p>
        <ul className="space-y-1 text-sm">
          <li>Paham apa itu vibe coding dan kenapa ini mengubah segalanya</li>
          <li>Bisa membuat web app sederhana menggunakan Lovable atau Bolt</li>
          <li>Tahu cara generate dan jalankan script otomasi dengan Claude + Replit</li>
          <li>Punya satu solusi nyata yang siap dipresentasikan di Demo Day</li>
        </ul>
      </HighlightBox>

      <SectionHeading>Bagian 1: Apa Itu Vibe Coding?</SectionHeading>
      <p className="text-sm text-[#94A3B8] leading-relaxed mb-3">
        Istilah "vibe coding" dipopulerkan oleh Andrej Karpathy (mantan Head of AI di Tesla, pendiri OpenAI). Konsepnya sederhana: <strong className="text-white">kamu tidak perlu bisa coding untuk membuat software. Lo hanya perlu bisa mendeskripsikan apa yang kamu mau.</strong>
      </p>
      <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">
        Analogi: dulu untuk punya rumah, kamu harus bisa tukang batu sendiri. Sekarang kamu bisa jadi arsitek yang mendeskripsikan bangunan ke tim kontraktor. Vibe coding = kamu jadi arsitek, AI jadi kontraktornya.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
          <p className="text-xs text-red-400 font-mono mb-2">DULU: Cara Lama</p>
          <ul className="space-y-1 text-xs text-[#94A3B8]">
            <li>→ Belajar coding 6-12 bulan dulu</li>
            <li>→ Bayar developer jutaan untuk app sederhana</li>
            <li>→ Ide bagus tapi tidak bisa dieksekusi sendiri</li>
            <li>→ Bergantung penuh pada orang lain</li>
          </ul>
        </div>
        <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-4">
          <p className="text-xs text-green-400 font-mono mb-2">SEKARANG: Dengan Vibe Coding</p>
          <ul className="space-y-1 text-xs text-[#94A3B8]">
            <li>→ Describe → generate → iterate</li>
            <li>→ Web app sederhana dalam hitungan jam</li>
            <li>→ Prototype ide dalam sehari</li>
            <li>→ Kamu memiliki kontrol penuh atas produkmu</li>
          </ul>
        </div>
      </div>

      <SectionHeading>Bagian 2: Tools Vibe Coding, Pilih yang Mana?</SectionHeading>

      <Table
        headers={["Tools", "Kekuatan", "Terbaik untuk", "Harga"]}
        rows={[
          ["Lovable.dev", "Paling mudah, UI terbaik, bisa tambah database", "Beginners, app dengan database", "Freemium"],
          ["Bolt.new", "Sangat cepat, output bersih, bisa deploy langsung", "Prototyping cepat, landing page", "Freemium"],
          ["v0.dev (Vercel)", "Spesialis UI, output code sangat bersih", "Dashboard, UI komplex", "Freemium"],
          ["Replit Agent", "Full-stack, bisa tambah backend & API", "App yang butuh server", "Freemium"],
          ["n8n / Make", "Automation workflow no-code", "Integrasi antar apps", "Freemium/Paid"],
        ]}
      />

      <SectionHeading>Bagian 3: Demo, Buat Web App dengan Lovable</SectionHeading>
      <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">
        Skenario: masisir yang jualan gamis import mau punya website katalog produk sederhana tanpa bayar developer. Berikut prompt yang digunakan di lovable.dev:
      </p>

      <PromptBlock label="Prompt untuk Lovable.dev">{`Buat website katalog produk untuk toko gamis online bernama 
"Nisa Collection - Gamis Import Mesir".

Spesifikasi:
- Halaman utama dengan hero section dan tagline
- Grid produk dengan: foto produk, nama, harga, tombol 
  "Pesan via WhatsApp"
- Tombol WhatsApp langsung terhubung ke nomor 62812345678
- Halaman "Tentang Kami" dengan cerita singkat toko
- Desain: warna dusty rose dan cream, feminine tapi elegan
- Mobile-friendly (penting, mayoritas pelanggan dari HP)
- Tidak perlu login atau checkout, cukup redirect ke WA

Tone: hangat, premium, terpercaya.`}</PromptBlock>

      <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">
        Setelah generate, iterate dengan prompt lanjutan:
      </p>

      <PromptBlock label="Prompt Iterasi">{`Ubah section produk agar ada badge "Terlaris" pada produk pertama.
Tambahkan section "Testimoni Pelanggan" dengan 3 testimoni.
Ganti font heading menjadi serif yang lebih elegan.`}</PromptBlock>

      <SectionHeading>Bagian 4: Generate Script dengan Claude + Replit</SectionHeading>
      <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">
        Untuk tugas yang berulang, kamu bisa minta Claude generate script Python, lalu jalankan di Replit tanpa install apapun.
      </p>

      <PromptBlock label="Prompt: Generate Script ke Claude">{`Saya adalah ketua divisi akademik PPMI. Saya punya daftar 150 anggota 
di Google Sheets dengan kolom: Nama, Email, Jurusan, Batch, Status Iuran.

Tolong buatkan script Python yang bisa:
1. Baca file Excel dengan data anggota
2. Filter anggota dengan Status Iuran = "Belum Bayar"  
3. Generate file teks berisi pesan pengingat yang dipersonalisasi 
   untuk setiap anggota (pakai nama mereka)
4. Simpan output sebagai file CSV yang bisa saya pakai untuk 
   blast pesan via WhatsApp atau email

Sertakan penjelasan cara menjalankan script ini, langkah per langkah,
untuk orang yang belum pernah coding.`}</PromptBlock>

      <PromptBlock label="Cara Jalankan di Replit">{`1. Buka replit.com → buat akun gratis
2. Klik "Create Repl" → pilih Python
3. Di panel kiri, klik "Shell" atau buka file main.py
4. Copy-paste script dari Claude ke file main.py
5. Upload file Excel kamu ke Replit (drag & drop)
6. Klik tombol "Run" (segitiga hijau)
7. Download output file dari panel kiri Replit`}</PromptBlock>

      <SectionHeading>Bagian 5: Automation dengan n8n</SectionHeading>
      <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">
        n8n memungkinkan kamu menghubungkan berbagai aplikasi tanpa kode, bayangkan seperti IFTTT tapi jauh lebih powerful.
      </p>

      <div className="space-y-3 mb-4">
        {[
          { title: "Auto-post konten ke semua platform", desc: "Setiap kali kamu upload ke Google Drive → auto-post ke Instagram, Twitter, dan WhatsApp grup" },
          { title: "Notifikasi order otomatis", desc: "Setiap ada pesan WA baru dari pelanggan → kirim email ke kamu + catat di Google Sheets" },
          { title: "Database anggota otomatis", desc: "Setiap ada yang isi Google Form → auto-kirim email konfirmasi + tambah ke spreadsheet member" },
          { title: "Jadwal posting konten", desc: "Buat konten sekarang, jadwalkan posting otomatis untuk minggu depan ke semua platform" },
        ].map((item) => (
          <div key={item.title} className="rounded-lg border border-[#1E1E2E] bg-[#12121A] p-4">
            <p className="text-sm font-semibold text-white mb-1">{item.title}</p>
            <p className="text-xs text-[#94A3B8]">{item.desc}</p>
          </div>
        ))}
      </div>

      <PromptBlock label="Prompt: Rancang Workflow Otomasi">{`Saya punya [DESKRIPSI SITUASI LO].

Masalah berulang yang paling menghabiskan waktu: [MASALAH SPESIFIK].

Tolong bantu saya merancang workflow automasi menggunakan n8n 
atau Make (Integromat) untuk menyelesaikan masalah ini:

1. Apa trigger yang memulai workflow? (event apa yang memicunya)
2. Langkah-langkah apa yang perlu terjadi secara otomatis?
3. Output akhir yang dihasilkan?
4. Apps/tools apa yang perlu dihubungkan?

Berikan langkah implementasi yang detail dan bisa diikuti 
orang non-teknis.`}</PromptBlock>

      <SectionHeading>Bagian 6: Tentukan Proyek Demo Day Lo</SectionHeading>
      <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">
        Di Sesi 6, kamu akan mempresentasikan solusi nyata yang dibuat dengan AI. Ini bukan harus sempurna. Yang penting nyata dan menyelesaikan masalah kamu sendiri.
      </p>

      <Table
        headers={["Level", "Contoh Solusi"]}
        rows={[
          ["Beginner", "Prompt library personal + dokumen panduan AI untuk rekan organisasi"],
          ["Intermediate", "Website katalog produk untuk bisnis kamu / website dokumentasi kegiatan"],
          ["Advanced", "Web app kecil untuk membantu workflow tim organisasi / automation n8n"],
          ["Expert", "Tools custom yang bisa dipakai komunitas masisir lain"],
        ]}
      />

      <LatihanBox title="Tentukan Proyek Demo Day Sekarang">
        <p className="text-sm mb-3">Isi template ini (5 menit):</p>
        <PromptBlock>{`Masalah yang saya hadapi: [...]
Target pengguna solusi ini: [...]
Solusi yang akan saya buat: [...]
Tools yang akan saya gunakan: [...]
Hasil yang bisa dilihat saat Demo Day: [...]`}</PromptBlock>
        <p className="text-xs text-[#94A3B8] mt-2">Bawa template ini ke mentor/mentor sebelum Sesi 6.</p>
      </LatihanBox>

      <TakeHomeBox>
        <p className="font-semibold text-white mb-3">Sebelum Sesi 6 (Demo Day):</p>
        <ol className="space-y-2 text-sm list-decimal pl-4">
          <li>Selesaikan proyekmu, tidak harus sempurna, tapi harus bisa di-demo</li>
          <li>Siapkan presentasi 5-7 menit: Masalah → Proses AI → Demo Hasil</li>
          <li>Screenshot atau rekam layar proses pembuatannya, ini bagian dari ceritanya</li>
          <li>Pikirkan: bagaimana kamu bisa kembangkan solusi ini lebih jauh setelah Demo Day?</li>
        </ol>
      </TakeHomeBox>
    </div>
  );
}
