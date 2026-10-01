import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Cross,
  HandHeart,
  HeartHandshake,
  Landmark,
  Users,
} from "lucide-react";

export const SITE = {
  name: "Perhimpiunan Mahasiswa Katolik Republik Indonesia",
  subtitle: "Sanctus Albertus Magnus",
  branch: "Cabang Makassar",
  tagline: "PMKRI",
  logo: "/assets/logo-pmkri-makassar.png",
  hero: "/assets/hero-pmkri-makassar.png",
  address: "Gedung K 24, Jl. Perintis Kemerdekaan, Makassar",
  phone: "(0411) 36157235",
  email: "sekretariat@pmkri-makassar.org",
  website: "www.pmkri-makassar.org",
} as const;

export type NavItem = {
  id: string;
  label: string;
};

export const NAV_ITEMS: NavItem[] = [
  { id: "beranda", label: "Beranda" },
  { id: "tentang-kami", label: "Tentang Kami" },
  { id: "kontak", label: "Kontak" },
  { id: "galeri", label: "Galeri" },
];

export type ValueCard = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const VALUE_CARDS: ValueCard[] = [
  {
    icon: Cross,
    title: "Iman Katolik",
    description:
      "Menghidupi nilai Injil dan ajaran Gereja dalam kehidupan kampus dan masyarakat.",
  },
  {
    icon: BookOpen,
    title: "Intelektual",
    description:
      "Mengasah nalar kritis dan budaya akademik demi kemajuan ilmu pengetahuan.",
  },
  {
    icon: HeartHandshake,
    title: "Solidaritas",
    description:
      "Menjunjung persaudaraan, keadilan, dan kepedulian bagi sesama yang lemah.",
  },
  {
    icon: Landmark,
    title: "Kebangsaan",
    description:
      "Berkontribusi nyata bagi persatuan dan pembangunan bangsa Indonesia.",
  },
  {
    icon: Users,
    title: "Kaderisasi",
    description:
      "Membina anggota menjadi pemimpin yang berkarakter dan berintegritas.",
  },
  {
    icon: HandHeart,
    title: "Pengabdian",
    description:
      "Melayani masyarakat melalui karya nyata, pendidikan, dan pendampingan.",
  },
];

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
};

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    src: "/assets/generated/gallery-seminar.dim_800x600.jpg",
    alt: "Peserta seminar Perhimpiunan Mahasiswa Katolik Republik Indonesia mengikuti diskusi panel di dalam ruangan",
    caption: "Seminar Kepemudaan Katolik",
  },
  {
    src: "/assets/generated/gallery-bakti-sosial.dim_800x600.jpg",
    alt: "Anggota Perhimpiunan Mahasiswa Katolik Republik Indonesia menyalurkan bantuan pada kegiatan bakti sosial",
    caption: "Bakti Sosial Masyarakat",
  },
  {
    src: "/assets/generated/gallery-upacara.dim_800x600.jpg",
    alt: "Anggota Perhimpiunan Mahasiswa Katolik Republik Indonesia berbaris pada upacara pembukaan kegiatan",
    caption: "Upacara Pembukaan",
  },
  {
    src: "/assets/generated/gallery-latihan-kepemimpinan.dim_800x600.jpg",
    alt: "Peserta latihan kepemimpinan Perhimpiunan Mahasiswa Katolik Republik Indonesia berdiskusi dalam lingkaran",
    caption: "Latihan Kepemimpinan Dasar",
  },
  {
    src: "/assets/generated/gallery-retret.dim_800x600.jpg",
    alt: "Anggota Perhimpiunan Mahasiswa Katolik Republik Indonesia mengikuti retret rohani dengan cahaya lilin",
    caption: "Retret Rohani",
  },
  {
    src: "/assets/generated/gallery-anniversary.dim_800x600.jpg",
    alt: "Anggota Perhimpiunan Mahasiswa Katolik Republik Indonesia tampil pada malam perayaan ulang tahun organisasi",
    caption: "Malam Ulang Tahun Organisasi",
  },
];
