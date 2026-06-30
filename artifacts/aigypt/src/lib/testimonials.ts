// TODO: Ganti dengan testimoni asli dari peserta demo/beta AIGYPT.
// Format yang baik: masalah spesifik, plus hasil terukur, plus nama dan peran.

export interface Testimonial {
  quote: string;   // kutipan spesifik, bukan generik
  result: string;  // hasil konkret, contoh: "Hemat 5 jam per minggu"
  name: string;    // nama depan plus inisial, contoh: "Ahmad R."
  role: string;    // contoh: "Mahasiswa Syariah, Tahun ke-3"
}

export const testimonials: Testimonial[] = [
  {
    quote: "GANTI_DENGAN_KUTIPAN_ASLI — buat spesifik, sebutkan masalah dan hasil konkret",
    result: "GANTI_DENGAN_HASIL_KONKRET",
    name: "GANTI_NAMA",
    role: "GANTI_PERAN",
  },
  {
    quote: "GANTI_DENGAN_KUTIPAN_ASLI — buat spesifik, sebutkan masalah dan hasil konkret",
    result: "GANTI_DENGAN_HASIL_KONKRET",
    name: "GANTI_NAMA",
    role: "GANTI_PERAN",
  },
  {
    quote: "GANTI_DENGAN_KUTIPAN_ASLI — buat spesifik, sebutkan masalah dan hasil konkret",
    result: "GANTI_DENGAN_HASIL_KONKRET",
    name: "GANTI_NAMA",
    role: "GANTI_PERAN",
  },
];
