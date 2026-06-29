import { PromptBlock } from "@/components/PromptBlock";
import { TakeHomeBox, HighlightBox, LatihanBox, SectionHeading, Table } from "@/components/MateriBlocks";

export default function Sesi4() {
  return (
    <div>
      <HighlightBox>
        <p className="text-xs font-mono text-[#A855F7] uppercase tracking-wider mb-2">Tujuan Sesi</p>
        <ul className="space-y-1 text-sm">
          <li>Bisa riset produk dan kompetitor dengan AI lebih efisien dari kompetitor</li>
          <li>Kuasai formula copywriting AI yang convert untuk jualan online</li>
          <li>Punya content calendar 1 bulan yang siap dieksekusi</li>
          <li>Tahu cara repurpose satu konten ke banyak platform</li>
        </ul>
      </HighlightBox>

      <SectionHeading>Bagian 1 — Riset Produk & Kompetitor</SectionHeading>
      <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">
        Sebelum jual apapun, lo perlu tau pasar. AI bisa membantu lo riset 10x lebih cepat.
      </p>

      <PromptBlock label="Prompt: Riset Pasar Produk">{`[Role] Kamu adalah analis bisnis yang spesialis di e-commerce 
Indonesia untuk produk fashion dan lifestyle.

[Context] Saya mahasiswa Indonesia di Kairo yang menjual produk 
[NAMA PRODUK] secara online ke Indonesia via Instagram dan Shopee. 
Modal awal saya terbatas, jadi saya harus sangat efisien dalam 
memilih produk dan strategi.

[Task] Bantu saya menganalisis potensi pasar untuk produk ini:
1. Siapa target pelanggan paling potensial? (demographics & psychographics)
2. Apa pain point utama mereka yang bisa diselesaikan produk ini?
3. Apa produk kompetitor yang sudah ada di pasar, dan apa kelemahan mereka?
4. Apa unique selling point yang bisa membedakan produk saya?
5. Platform mana yang paling efektif untuk menjangkau target ini?

[Format] Per poin, berikan 3-5 insight konkret. Di akhir, berikan 
1 rekomendasi positioning yang paling kuat.`}</PromptBlock>

      <PromptBlock label="Prompt: Analisis Kompetitor">{`Saya mau menganalisis kompetitor untuk bisnis [JENIS BISNIS] saya.

Tolong bantu saya membuat framework analisis kompetitor:
1. 5 pertanyaan kunci yang harus saya jawab tentang kompetitor
2. Cara menggunakan AI untuk "intip" strategi kompetitor dari konten 
   publik mereka
3. Bagaimana mengidentifikasi celah yang belum mereka isi

Bonus: berikan template tabel perbandingan kompetitor yang bisa 
saya isi sendiri.`}</PromptBlock>

      <SectionHeading>Bagian 2 — Copywriting yang Convert</SectionHeading>
      <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">
        Formula copywriting bukan soal kreativitas — ini soal psikologi. Ada 4 framework utama:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {[
          { name: "AIDA", desc: "Attention → Interest → Desire → Action", best: "Caption Instagram, landing page" },
          { name: "PAS", desc: "Problem → Agitate → Solution", best: "WhatsApp broadcast, email marketing" },
          { name: "FAB", desc: "Feature → Advantage → Benefit", best: "Deskripsi produk, storytelling jualan" },
          { name: "Storytelling", desc: "Setup → Conflict → Resolution", best: "Konten viral, testimonial, personal branding" },
        ].map((f) => (
          <div key={f.name} className="rounded-lg border border-[#1E1E2E] bg-[#12121A] p-4">
            <p className="font-mono font-bold text-[#A855F7] text-sm mb-1">{f.name}</p>
            <p className="text-xs text-[#94A3B8] mb-2">{f.desc}</p>
            <p className="text-xs text-[#7C3AED]">Terbaik untuk: {f.best}</p>
          </div>
        ))}
      </div>

      <PromptBlock label="Prompt: Generate Copy AIDA">{`[Role] Kamu adalah copywriter senior yang spesialis di e-commerce 
Indonesia, dengan track record konten yang conversion rate-nya tinggi.

[Context] Saya menjual [NAMA PRODUK] seharga [HARGA] via Instagram. 
Target pelanggan: [DESKRIPSI TARGET]. Kompetitor utama saya 
menawarkan [KELEBIHAN KOMPETITOR].

[Task] Buatkan 3 variasi caption dengan framework AIDA untuk produk ini.
Variasi 1: tone emotional (cerita/perasaan)
Variasi 2: tone informatif (fakta dan spesifikasi)
Variasi 3: tone urgency (terbatas/deadline)

[Format] Setiap caption: max 200 kata, diakhiri CTA yang spesifik, 
dan 5 hashtag yang relevan. Beri rating 1-10 untuk setiap variasi 
beserta alasannya.

[Constraint] Tidak boleh ada klaim yang tidak bisa dibuktikan. 
Tone harus sesuai dengan brand yang hangat dan autentik.`}</PromptBlock>

      <PromptBlock label="Prompt: Copywriting PAS">{`Gunakan framework PAS untuk membuat:
1. WhatsApp broadcast (max 150 kata) untuk produk [PRODUK]
2. Email marketing subject line (5 variasi A/B test)

Product: [NAMA PRODUK]
Target pain point: [MASALAH UTAMA TARGET PELANGGAN]
Solusi yang ditawarkan: [MANFAAT UTAMA PRODUK]
CTA: [TINDAKAN YANG DIINGINKAN]`}</PromptBlock>

      <SectionHeading>Bagian 3 — Content Calendar dengan AI</SectionHeading>

      <PromptBlock label="Prompt: Content Calendar 1 Bulan">{`[Role] Kamu adalah social media strategist yang spesialis 
di konten untuk bisnis online Indonesia.

[Context] Saya memiliki bisnis [JENIS BISNIS]. Target pelanggan 
saya adalah [DESKRIPSI TARGET]. Saya aktif di [PLATFORM: Instagram/TikTok/dll]. 
Saya bisa posting [X] kali per minggu. Brand tone saya: [warm/professional/playful/dll].

[Task] Buatkan content calendar 4 minggu (1 bulan) yang mencakup:
- Konten edukasi (30%)
- Konten promosi produk (30%)
- Konten engagement/hiburan (20%)
- Behind the scenes/personal (20%)

[Format] Tabel dengan kolom: Minggu | Hari | Format | Judul/Hook | 
Poin Utama (3 poin) | CTA | Tipe Konten

[Constraint] Semua konten harus relevan dengan produk atau brand.
Minimal 1 konten per minggu yang berpotensi viral. Posting 
terdistribusi merata di hari-hari dengan engagement tertinggi 
(Selasa-Kamis, jam 7-9 pagi & 7-9 malam WIB).`}</PromptBlock>

      <PromptBlock label="Prompt: Script Video TikTok">{`Buatkan script video TikTok/Reels durasi 60 detik tentang [TOPIK].

Format script:
- Hook (3 detik pertama): kalimat pembuka yang bikin orang stop scrolling
- Setup (5 detik): konteks singkat
- Main content (40 detik): 3 poin utama dengan transisi natural
- CTA (12 detik): ajakan yang spesifik dan mudah dilakukan

Target: [DESKRIPSI AUDIENS]
Tone: [CONVERSATIONAL/EDUCATIONAL/ENTERTAINING]
Tujuan: [KESADARAN BRAND/JUALAN/EDUKASI]

Tambahkan catatan sutradara: kapan harus cut, B-roll apa yang 
dibutuhkan, teks apa yang muncul di layar.`}</PromptBlock>

      <SectionHeading>Bagian 4 — Repurpose Satu Konten ke Banyak Platform</SectionHeading>
      <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">
        Prinsip: <strong className="text-white">buat sekali, distribusikan banyak.</strong> Satu video TikTok bisa jadi 5 format berbeda.
      </p>

      <Table
        headers={["Sumber Konten", "Bisa Jadi"]}
        rows={[
          ["Video TikTok 60 detik", "Reels Instagram, YouTube Shorts, Twitter/X thread, caption blog"],
          ["Thread Twitter", "Carousel Instagram, newsletter, LinkedIn post"],
          ["Artikel/blog 1000 kata", "5 tweet, 1 carousel, 1 video script, 1 newsletter issue"],
          ["Podcast/rekaman audio", "Transkripsi → artikel → tweet thread → kutipan visual"],
        ]}
      />

      <PromptBlock label="Prompt: Repurpose Master">{`Berikut adalah [VIDEO SCRIPT / ARTIKEL / THREAD] yang sudah saya buat:

[PASTE KONTEN ORIGINAL DI SINI]

Tolong ubah konten ini menjadi:
1. Caption Instagram (max 150 kata + 5 hashtag)
2. Twitter/X thread (5-7 tweet, setiap tweet max 280 karakter)
3. Carousel Instagram (judul slide + 1 kalimat per slide, 5-7 slide)
4. WhatsApp status (max 3 kalimat, sangat casual)
5. Email newsletter (subjek + intro 2 paragraf + main points)

Pertahankan pesan utama yang sama, tapi sesuaikan tone dan format 
untuk setiap platform. Sertakan CTA yang berbeda untuk setiap format.`}</PromptBlock>

      <SectionHeading>Bagian 5 — Tools AI untuk Kreasi Visual</SectionHeading>

      <Table
        headers={["Tools", "Fungsi", "Rekomendasi Untuk"]}
        rows={[
          ["Canva AI", "Generate desain otomatis dari teks, resize otomatis", "Flyer, thumbnail, carousel"],
          ["CapCut AI", "Auto-caption, remove background, enhance video", "Konten TikTok/Reels"],
          ["Adobe Firefly", "Generate gambar AI untuk aset visual", "Foto produk kreatif"],
          ["Midjourney/DALL-E", "Generate ilustrasi dan gambar custom", "Brand visual, artwork"],
          ["ElevenLabs", "Text-to-speech AI untuk narasi video", "Konten tanpa muka, podcast"],
        ]}
      />

      <LatihanBox title="Latihan Sesi 4">
        <p className="text-sm mb-3">Pilih satu dari latihan berikut:</p>
        <div className="space-y-3">
          <div>
            <p className="text-xs text-[#A855F7] font-mono mb-1">OPSI A — Bisnisman</p>
            <p className="text-sm text-[#94A3B8]">Ambil produk yang sedang atau akan lo jual. Buat 3 variasi caption menggunakan prompt AIDA di atas. Minta feedback dari Claude mana yang paling mungkin convert.</p>
          </div>
          <div>
            <p className="text-xs text-[#A855F7] font-mono mb-1">OPSI B — Konten Kreator</p>
            <p className="text-sm text-[#94A3B8]">Buat content calendar 2 minggu untuk niche lo menggunakan prompt di atas. Lanjutkan dengan membuat script untuk 1 konten dari calendar tersebut.</p>
          </div>
          <div>
            <p className="text-xs text-[#A855F7] font-mono mb-1">OPSI C — Repurpose Challenge</p>
            <p className="text-sm text-[#94A3B8]">Ambil satu konten yang sudah pernah lo buat (caption, artikel, tweet, dll). Repurpose ke 3 format berbeda menggunakan prompt repurpose master.</p>
          </div>
        </div>
      </LatihanBox>

      <TakeHomeBox>
        <p className="font-semibold text-white mb-3">Sebelum Sesi 5:</p>
        <ol className="space-y-2 text-sm list-decimal pl-4">
          <li>Buat satu konten lengkap dari A sampai Z dengan AI: ide → teks → visual (Canva AI)</li>
          <li>Kalau punya bisnis: buat 3 caption dan coba posting salah satunya</li>
          <li>Mulai pikirkan: masalah apa yang mau lo selesaikan di Sesi 5 (vibe coding)?</li>
        </ol>
      </TakeHomeBox>
    </div>
  );
}
