export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: string;
}

/**
 * Galeri kegiatan Perhimpiunan Mahasiswa Katolik Republik Indonesia.
 * Gambar disajikan sebagai aset statis yang dioptimalkan platform
 * (dimuat langsung dari CDN aset dengan caching agresif).
 */
export const galleryPhotos: GalleryPhoto[] = [
  {
    id: "seminar-nasional",
    src: "/assets/generated/gallery-seminar.dim_800x600.jpg",
    alt: "Peserta seminar Perhimpiunan Mahasiswa Katolik Republik Indonesia mengikuti diskusi panel di dalam ruangan",
    title: "Seminar Kepemudaan Katolik",
    category: "Kaderisasi",
  },
  {
    id: "bakti-sosial",
    src: "/assets/generated/gallery-bakti-sosial.dim_800x600.jpg",
    alt: "Anggota Perhimpiunan Mahasiswa Katolik Republik Indonesia menyalurkan bantuan pada kegiatan bakti sosial",
    title: "Bakti Sosial Masyarakat",
    category: "Pengabdian",
  },
  {
    id: "upacara-pembukaan",
    src: "/assets/generated/gallery-upacara.dim_800x600.jpg",
    alt: "Anggota Perhimpiunan Mahasiswa Katolik Republik Indonesia berbaris pada upacara pembukaan kegiatan",
    title: "Upacara Pembukaan",
    category: "Seremonial",
  },
  {
    id: "latihan-kepemimpinan",
    src: "/assets/generated/gallery-latihan-kepemimpinan.dim_800x600.jpg",
    alt: "Peserta latihan kepemimpinan Perhimpiunan Mahasiswa Katolik Republik Indonesia berdiskusi dalam lingkaran",
    title: "Latihan Kepemimpinan Dasar",
    category: "Kaderisasi",
  },
  {
    id: "retret-spiritual",
    src: "/assets/generated/gallery-retret.dim_800x600.jpg",
    alt: "Anggota Perhimpiunan Mahasiswa Katolik Republik Indonesia mengikuti retret rohani dengan cahaya lilin",
    title: "Retret Rohani",
    category: "Spiritualitas",
  },
  {
    id: "malam-anniversary",
    src: "/assets/generated/gallery-anniversary.dim_800x600.jpg",
    alt: "Anggota Perhimpiunan Mahasiswa Katolik Republik Indonesia tampil pada malam perayaan ulang tahun organisasi",
    title: "Malam Ulang Tahun Organisasi",
    category: "Kebersamaan",
  },
  {
    id: "olahraga-bersama",
    src: "/assets/generated/gallery-olahraga.dim_800x600.jpg",
    alt: "Anggota Perhimpiunan Mahasiswa Katolik Republik Indonesia mengikuti kegiatan olahraga bersama di lapangan",
    title: "Olahraga Bersama",
    category: "Kebersamaan",
  },
  {
    id: "penutupan",
    src: "/assets/generated/gallery-penutupan.dim_800x600.jpg",
    alt: "Foto bersama anggota Perhimpiunan Mahasiswa Katolik Republik Indonesia pada upacara penutupan kegiatan",
    title: "Penutupan Rangkaian Kegiatan",
    category: "Seremonial",
  },
];
