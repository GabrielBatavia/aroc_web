export type PressAsset = {
  title: string;
  description: string;
  src: string;
  kind: "Logo" | "Robot Photo" | "Lab Photo";
  downloadLabel: string;
};

export type PressDownload = {
  title: string;
  description: string;
  href: string;
  status: "ready" | "request";
  label: string;
};

export type BrandColor = {
  name: string;
  value: string;
  usage: string;
};

export const pressHero = {
  eyebrow: "Media & Press Kit",
  title: "Asset resmi AROC_PL untuk media dan kemitraan.",
  description:
    "Logo, dokumentasi robot, arahan brand singkat, dan kontak media untuk publikasi AROC_PL sebagai Development Team robot humanoid Politeknik Negeri Malang.",
  updatedAt: "2026",
};

export const pressAssets: PressAsset[] = [
  {
    title: "Logo AROC_PL",
    description: "Logo resmi untuk kebutuhan publikasi, proposal, dan materi sponsor.",
    src: "/images/logoAROC.jpg",
    kind: "Logo",
    downloadLabel: "Download logo",
  },
  {
    title: "SI PENG",
    description: "Robot humanoid role penyerang untuk kebutuhan visual campaign.",
    src: "/images/robot-sipeng.png",
    kind: "Robot Photo",
    downloadLabel: "Download foto",
  },
  {
    title: "SI JONI",
    description: "Robot humanoid role kiper untuk kebutuhan dokumentasi teknis.",
    src: "/images/robot-sijoni.png",
    kind: "Robot Photo",
    downloadLabel: "Download foto",
  },
  {
    title: "SI KANCIL",
    description: "Robot humanoid role bek untuk materi media dan kemitraan.",
    src: "/images/robot-sikancil.png",
    kind: "Robot Photo",
    downloadLabel: "Download foto",
  },
  {
    title: "Dokumentasi Lab 01",
    description: "Suasana pengembangan dan evaluasi robot di lingkungan lab.",
    src: "/images/gallery-1.png",
    kind: "Lab Photo",
    downloadLabel: "Download dokumentasi",
  },
  {
    title: "Dokumentasi Lab 02",
    description: "Kolaborasi tim lintas divisi untuk integrasi sistem robot humanoid.",
    src: "/images/gallery-2.png",
    kind: "Lab Photo",
    downloadLabel: "Download dokumentasi",
  },
];

export const brandColors: BrandColor[] = [
  { name: "Championship Yellow", value: "#FFE45C", usage: "Accent utama, CTA, dan highlight prestasi." },
  { name: "Deep Navy", value: "#07101F", usage: "Background utama dan kontras brand." },
  { name: "Warm Cream", value: "#F7F6EF", usage: "Permukaan terang dan area editorial." },
  { name: "Gold Deep", value: "#C79820", usage: "Detail premium dan label sekunder." },
];

export const pressDownloads: PressDownload[] = [
  {
    title: "Proposal Kemitraan",
    description: "Slot PDF resmi untuk paket sponsor dan benefit eksposur.",
    href: "mailto:hello@arocpl.com?subject=Permintaan%20Proposal%20Kemitraan%20AROC_PL",
    status: "request",
    label: "Minta proposal",
  },
  {
    title: "Brand Pack ZIP",
    description: "Slot siap-ganti untuk logo pack, guideline, dan variasi visual.",
    href: "mailto:hello@arocpl.com?subject=Permintaan%20Brand%20Pack%20AROC_PL",
    status: "request",
    label: "Minta brand pack",
  },
  {
    title: "Media Release",
    description: "Ringkasan profil tim untuk kebutuhan artikel, caption, dan publikasi media.",
    href: "mailto:hello@arocpl.com?subject=Permintaan%20Media%20Release%20AROC_PL",
    status: "request",
    label: "Minta release",
  },
];

export const pressContacts = [
  { label: "Media Contact", value: "hello@arocpl.com", href: "mailto:hello@arocpl.com" },
  { label: "Instagram", value: "@aroc_pl", href: "https://instagram.com/aroc_pl" },
  { label: "Institution", value: "Politeknik Negeri Malang", href: "https://www.polinema.ac.id" },
];

export const brandGuidelines = [
  "Gunakan logo di atas background navy, cream, atau area foto yang cukup kontras.",
  "Jangan mengubah proporsi, memiringkan, atau menambahkan efek berlebihan pada logo.",
  "Gunakan nama tim sebagai AROC_PL atau Advance Robosoccer Polinema.",
  "Untuk kebutuhan sponsor, prioritaskan kombinasi Deep Navy dan Championship Yellow.",
];
