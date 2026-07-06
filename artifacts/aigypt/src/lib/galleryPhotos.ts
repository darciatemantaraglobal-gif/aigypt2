// Untuk menambah foto baru:
// 1. Simpan foto ke public/gallery/photo-N.jpg
// 2. Tambahkan entri baru ke array galleryPhotos di bawah
// 3. Vite otomatis reload di development

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: "1",
    src: "/gallery/photo-1.jpg",
    alt: "Sesi kelas AIGYPT — peserta antusias berdiskusi",
    caption: "Sesi tatap muka perdana",
  },
  {
    id: "2",
    src: "/gallery/photo-2.jpg",
    alt: "Peserta AIGYPT mengikuti sesi AI untuk Revolusi Masalah",
    caption: "AI untuk Revolusi Masalah",
  },
  {
    id: "3",
    src: "/gallery/photo-3.jpg",
    alt: "Komunitas AIGYPT berkumpul di luar ruangan",
    caption: "Komunitas yang terus berkembang",
  },
  {
    id: "4",
    src: "/gallery/photo-4.jpg",
    alt: "Sesi AIGYPT dengan peserta penuh ruangan",
    caption: "Ruang penuh, antusias nyata",
  },
  {
    id: "5",
    src: "/gallery/photo-5.jpg",
    alt: "Sesi diskusi kecil dan demo AIGYPT",
    caption: "Diskusi dan demo langsung",
  },
];
