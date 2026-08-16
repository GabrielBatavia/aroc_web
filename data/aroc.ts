export type AccentTone = "cyan" | "blue" | "gold" | "orange" | "emerald";

export type NavLink = {
  label: string;
  href: string;
  matchPath?: string;
};

export type HeroData = {
  eyebrow: string;
  statusLabel: string;
  statusValue: string;
  titleLines: {
    top: string;
    accent: string;
    middle: string;
    bottomPrefix: string;
    bottomAccent: string;
  };
  description: string;
  primaryCta: NavLink;
  secondaryCta: NavLink;
  robotImage: string;
  robotModel: string;
  systemCard: {
    label: string;
    title: string;
    metrics: Array<{ label: string; value: string }>;
  };
  bottomTag: string;
};

export type AboutCard = {
  title: string;
  description: string;
  icon: "users" | "target" | "shield";
};

export type ValueCard = {
  title: string;
  description: string;
  icon: "spark" | "shield" | "users" | "trophy";
  tone: AccentTone;
};

export type DivisionItem = {
  title: string;
  description: string;
  icon: "cpu" | "bolt" | "circuit" | "code" | "radio" | "eye";
};

export type DivisionCard = {
  title: string;
  eyebrow: string;
  description: string;
  tone: AccentTone;
  items: DivisionItem[];
};

export type RobotStat = {
  label: string;
  value: number;
};

export type RobotCard = {
  unitNumber: string;
  name: string;
  role: string;
  description: string;
  uniqueFact: string;
  teamTask: string;
  image: string;
  tone: AccentTone;
  stats?: RobotStat[];
};

export type TeamMember = {
  name: string;
  role: string;
  nim: string;
  handle: string;
  phone: string;
  image: string;
};

export type TeamYear = {
  year: string;
  label: string;
  members: TeamMember[];
};

export type TeamLead = {
  name: string;
  role: string;
  image: string;
  badge: string;
  intro: string;
  facts: Array<{ label: string; value: string; icon: "trophy" | "cpu" | "users" }>;
};

export type TeamStat = {
  value: string;
  label: string;
  tone: AccentTone;
};

export type Achievement = {
  year: string;
  title: string;
  subtitle: string;
  tone: AccentTone;
  icon: "trophy" | "spark" | "medal";
};

export type GalleryItem = {
  src: string;
  alt: string;
  layout: "large-left" | "small-top" | "small-top-right" | "wide-bottom";
};

export type FooterContact = {
  label: string;
  value: string;
  href?: string;
  icon: "mail" | "instagram" | "linkedin" | "map";
};

export const navLinks: NavLink[] = [
  { label: "Beranda", href: "/", matchPath: "/" },
  { label: "Tentang", href: "/about", matchPath: "/about" },
  { label: "Robot 3D", href: "/robot-3d", matchPath: "/robot-3d" },
  { label: "Lab", href: "/lab", matchPath: "/lab" },
  { label: "Updates", href: "/updates", matchPath: "/updates" },
  { label: "Press Kit", href: "/press", matchPath: "/press" },
  { label: "Link Bio", href: "/links", matchPath: "/links" },
];

export const campaignNavLinks: NavLink[] = navLinks;

export const footerNavigation: NavLink[] = [
  { label: "Tentang Kami", href: "/about", matchPath: "/about" },
  { label: "Robot 3D Experience", href: "/robot-3d", matchPath: "/robot-3d" },
  { label: "AROC Lab", href: "/lab", matchPath: "/lab" },
  { label: "Media & Press Kit", href: "/press", matchPath: "/press" },
  { label: "News & Updates", href: "/updates", matchPath: "/updates" },
  { label: "Link in Bio", href: "/links", matchPath: "/links" },
  { label: "Tim Kami", href: "/#team" },
  { label: "Armada Robot", href: "/#robots" },
  { label: "Prestasi", href: "/#achievements" },
  { label: "Galeri", href: "/#gallery" },
  { label: "Kemitraan", href: "/#sponsor" },
];

export const heroData: HeroData = {
  eyebrow: "Tim Pengembang Robot Humanoid",
  statusLabel: "Status",
  statusValue: "Siap Bertanding",
  titleLines: {
    top: "Kami mengembangkan",
    accent: "robot",
    middle: "",
    bottomPrefix: "yang",
    bottomAccent: "kompetitif.",
  },
  description:
    "AROC_PL adalah tim pengembang robot humanoid Politeknik Negeri Malang yang berfokus pada riset, pengembangan, dan kompetisi sepak bola robot tingkat nasional.",
  primaryCta: { label: "Lihat Robot", href: "#robots" },
  secondaryCta: { label: "Ajukan Kemitraan", href: "#sponsor" },
  robotImage: "/images/hero-robot.png",
  robotModel: "/images/3DHumanoid.optimized.glb",
  systemCard: {
    label: "Sistem aktif",
    title: "KRSBI-Humanoid",
    metrics: [
      { label: "Vision", value: "97%" },
      { label: "Power", value: "89%" },
    ],
  },
  bottomTag: "Interactive 3D",
};

export const aboutCards: AboutCard[] = [
  {
    title: "Siapa Kami",
    description:
      "Tim pengembang robot humanoid Politeknik Negeri Malang yang fokus mengembangkan sistem otonom untuk kompetisi sepak bola robot tingkat nasional.",
    icon: "users",
  },
  {
    title: "Fokus Kami",
    description:
      "Spesialisasi pengembangan robot humanoid meliputi kontrol gerak, elektronika, persepsi, strategi lapangan, dan keandalan saat bertanding.",
    icon: "target",
  },
  {
    title: "Visi Kami",
    description:
      "Menjadi tim robot humanoid yang unggul melalui pengembangan teknologi, disiplin pengujian, dan partisipasi aktif di ajang kompetisi bergengsi.",
    icon: "shield",
  },
];

export const valueCards: ValueCard[] = [
  {
    title: "Inovasi",
    description:
      "Mengembangkan solusi robotika yang adaptif dan terus bertransformasi.",
    icon: "spark",
    tone: "gold",
  },
  {
    title: "Integritas",
    description:
      "Jujur, disiplin, dan bertanggung jawab di setiap sprint proyek.",
    icon: "shield",
    tone: "cyan",
  },
  {
    title: "Kolaborasi",
    description: "Satu tim, satu tujuan, terhubung lintas angkatan.",
    icon: "users",
    tone: "blue",
  },
  {
    title: "Prestasi",
    description:
      "Menjadikan kompetisi nasional dan internasional sebagai tolok ukur perkembangan tim.",
    icon: "trophy",
    tone: "orange",
  },
];

export const coreDivisions: DivisionCard[] = [
  {
    title: "Hardware",
    eyebrow: "Teknologi Kami",
    description:
      "Fondasi fisik setiap robot — dirancang untuk ketahanan, presisi gerak, dan performa hemat daya di lapangan.",
    tone: "orange",
    items: [
      {
        title: "Mekanik",
        description:
          "Struktur sasis, desain kerangka kinetik/gerak, dan integrasi aktuator.",
        icon: "cpu",
      },
      {
        title: "Kontrol & Daya",
        description:
          "Motor driver, regulasi daya, dan manajemen baterai yang andal.",
        icon: "bolt",
      },
      {
        title: "Desain PCB",
        description:
          "Rangkaian khusus (custom), routing sensor, dan antarmuka embedded ringkas.",
        icon: "circuit",
      },
    ],
  },
  {
    title: "Software",
    eyebrow: "Teknologi Kami",
    description:
      "Sistem perangkat lunak yang mengelola strategi, komunikasi, sensing, otonomi, dan perilaku adaptif robot di lapangan.",
    tone: "cyan",
    items: [
      {
        title: "AI / Deep Learning",
        description:
          "Pipeline persepsi untuk deteksi, pengambilan keputusan, dan permainan adaptif.",
        icon: "code",
      },
      {
        title: "Embedded Systems",
        description:
          "Koordinasi low-level antara sensor, aktuator, dan komputasi onboard.",
        icon: "radio",
      },
      {
        title: "Vision & AI",
        description:
          "Deteksi bola, gawang, dan navigasi lapangan berbasis visi komputer.",
        icon: "eye",
      },
    ],
  },
];

export const robotCards: RobotCard[] = [
  {
    unitNumber: "01",
    name: "SI PENG",
    role: "Penyerang Utama",
    description:
      "Unit 01 'Si Peng' dirancang khusus sebagai ujung tombak serangan tim AROC. Berakurasi tinggi dalam pergerakan cepat untuk menguasai bola liar dan menembus lini pertahanan lawan.",
    uniqueFact:
      "Dilengkapi algoritma kick-timing presisi tinggi yang dapat mendeteksi celah gawang lawan dan mengeksekusi tendangan keras dalam kurun waktu kurang dari 50 milidetik.",
    teamTask:
      "Mencetak gol, melakukan penekanan cepat (pressing) saat lawan menguasai bola, dan membuka ruang tembak di lini depan.",
    image: "/galery/robot.jpg",
    tone: "cyan",
  },
  {
    unitNumber: "02",
    name: "SI JONI",
    role: "Penjaga Gawang",
    description:
      "Unit 02 'Si Joni' bertugas sebagai benteng pertahanan terakhir. Memiliki stance lebar dan pusat gravitasi rendah untuk memaksimalkan keseimbangan serta jangkauan tepisan di depan gawang.",
    uniqueFact:
      "Menggunakan visi komputer (computer vision) sudut lebar ganda dan algoritma prediksi lintasan bola untuk merespons tembakan lawan dengan aksi diving block otomatis.",
    teamTask:
      "Menjaga gawang dari semua sudut tembakan lawan, menggagalkan peluang gol, dan mengarahkan kembali bola liar ke area aman.",
    image: "/galery/robot.jpg",
    tone: "gold",
  },
  {
    unitNumber: "03",
    name: "SI KANCIL",
    role: "Gelandang / Bek",
    description:
      "Unit 03 'Si Kancil' merupakan penyeimbang ritme permainan tim. Unggul dalam mobilitas gerak, koordinasi posisi, dan daya tahan kontak fisik di area tengah lapangan.",
    uniqueFact:
      "Menggunakan sistem spatial awareness berbasis multi-sensor yang membuatnya mampu mempertahankan keseimbangan penuh saat terjadi duel fisik dengan robot lawan.",
    teamTask:
      "Memutus alur umpan lawan melalui intersep presisi, menguasai bola di lini tengah, dan mendistribusikan umpan matang ke Si Peng.",
    image: "/galery/robot.jpg",
    tone: "emerald",
  },
];

export const teamLead: TeamLead = {
  name: "Ahmad Fauzi",
  role: "Ketua Tim / Hardware Lead",
  image: "/images/team-lead.png",
  badge: "Kapten",
  intro:
    "Pengembangan robot humanoid membutuhkan presisi, disiplin, dan evaluasi berkelanjutan agar setiap sistem siap dipertandingkan.",
  facts: [
    { label: "Periode", value: "2024-2025", icon: "trophy" },
    { label: "Jurusan", value: "Teknik Elektro", icon: "cpu" },
    { label: "Anggota", value: "11 Aktif", icon: "users" },
  ],
};

export const teamYears: TeamYear[] = [
  {
    year: "2021",
    label: "Angkatan 2021",
    members: [
      {
        name: "Ahmad Fauzi",
        role: "Ketua Tim / Hardware Lead",
        nim: "2141760001",
        handle: "@ahmadfauzi_",
        phone: "081234567890",
        image: "/images/member-ahmad.png",
      },
      {
        name: "Dewi Lestari",
        role: "Software / AI Vision",
        nim: "2141760002",
        handle: "@dewilestari21",
        phone: "081298765432",
        image: "/images/member-dewi.png",
      },
      {
        name: "Rizki Pratama",
        role: "Mekanik / Fabrikasi",
        nim: "2141760003",
        handle: "@rizkipratama_",
        phone: "081311223344",
        image: "/images/member-rizki.png",
      },
      {
        name: "Nurul Hidayah",
        role: "Elektronika / Desain PCB",
        nim: "2141760004",
        handle: "@nurul.hidayah",
        phone: "081355443322",
        image: "/images/member-nurul.png",
      },
    ],
  },
  {
    year: "2022",
    label: "Angkatan 2022",
    members: [
      {
        name: "Bagas Eka Saputro",
        role: "Wakil Ketua / Software Lead",
        nim: "2241760011",
        handle: "@bagaseka",
        phone: "081277331211",
        image: "/images/member-dewi.png",
      },
      {
        name: "Dimas Ardiansyah",
        role: "Hardware / Aktuator",
        nim: "2241760012",
        handle: "@dimasardn",
        phone: "081299112233",
        image: "/images/member-rizki.png",
      },
      {
        name: "Alicia Pramesti",
        role: "Elektronika / Kontrol",
        nim: "2241760013",
        handle: "@aliciapram",
        phone: "081234551122",
        image: "/images/member-nurul.png",
      },
      {
        name: "Rafi Maulana",
        role: "Strategi / Gerak",
        nim: "2241760014",
        handle: "@rafi.maulana",
        phone: "081377887766",
        image: "/images/member-ahmad.png",
      },
    ],
  },
  {
    year: "2023",
    label: "Angkatan 2023",
    members: [
      {
        name: "Mirani Putri",
        role: "Programming / Kontrol",
        nim: "2341760021",
        handle: "@miranip",
        phone: "081221119988",
        image: "/images/member-nurul.png",
      },
      {
        name: "Rama Prakoso",
        role: "Mekanik / CAD",
        nim: "2341760022",
        handle: "@ramaprakoso",
        phone: "081233445566",
        image: "/images/member-rizki.png",
      },
      {
        name: "Salsa Rahma",
        role: "Vision / Riset",
        nim: "2341760023",
        handle: "@salsarahma",
        phone: "081244556677",
        image: "/images/member-dewi.png",
      },
    ],
  },
];

export const teamStats = [
  { value: "11+", label: "Personel Aktif", tone: "cyan" },
  { value: "6", label: "Divisi Spesialis", tone: "orange" },
  { value: "3", label: "Angkatan", tone: "blue" },
  { value: "100%", label: "Riset Berkelanjutan dari tim", tone: "gold" },
] satisfies TeamStat[];

export const achievements: Achievement[] = [
  {
    year: "2024",
    title: "Juara KRI Humanoid League",
    subtitle: "Kontes Robot Indonesia",
    tone: "gold",
    icon: "trophy",
  },
  {
    year: "2023",
    title: "Desain & Arsitektur Terbaik",
    subtitle: "KRSBI Nasional",
    tone: "cyan",
    icon: "spark",
  },
  {
    year: "2022",
    title: "Juara 1 Regional IV",
    subtitle: "Regional Robotics Contest",
    tone: "orange",
    icon: "medal",
  },
  {
    year: "2020",
    title: "Top 2 Nasional",
    subtitle: "KRSBI 2020",
    tone: "blue",
    icon: "trophy",
  },
];

export const galleryItems: GalleryItem[] = [
  {
    src: "/galery/IMG_20250505_223428.jpg",
    alt: "Perakitan hardware dan perapihan routing kabel pada sasis robot humanoid.",
    layout: "large-left",
  },
  {
    src: "/galery/IMG_20250505_231450.jpg",
    alt: "Pengujian regulasi daya dan papan PCB mikrokontroler di workstation lab.",
    layout: "small-top",
  },
  {
    src: "/galery/IMG_20250506_213054~2.jpg",
    alt: "Kalibrasi sensor vision dan sinkronisasi komunikasi servo robot.",
    layout: "small-top-right",
  },
  {
    src: "/galery/IMG_20250509_232117~2.jpg",
    alt: "Pemeriksaan detail komponen mekanik dan struktur sasis presisi.",
    layout: "wide-bottom",
  },
  {
    src: "/galery/IMG_20250510_120450.jpg",
    alt: "Diskusi & evaluasi performa pergerakan tim AROC_PL di lab.",
    layout: "wide-bottom",
  },
];

export type YouTubeVideo = {
  id: string;
  title: string;
  category: string;
  description: string;
  isShort?: boolean;
};

export const mainShowcaseVideo = {
  id: "Sc45lHtMrSM",
  start: 11280,
  end: 11880,
  title: "Showcase Pertandingan AROCPL",
  timestampText: "Timestamp: 3:08:00 - 3:18:00",
  subtitleText: "Saksikan tayangan langsung aksi robot AROCPL di arena pertandingan resmi (Menit 3:08:00 - 3:18:00).",
};

export const teamYouTubeVideos: YouTubeVideo[] = [
  {
    id: "-O_nOOdpuic",
    title: "Dokumentasi Utama AROC_PL",
    category: "Video Utama",
    description: "Dokumentasi utama aksi, pergerakan, dan riset robot humanoid AROC_PL.",
  },
  {
    id: "eRfAFL_OvOo",
    title: "Uji Pergerakan & Keseimbangan Robot",
    category: "Riset Lab",
    description: "Dokumentasi pengujian kontrol gerak dan respon keseimbangan robot humanoid AROC_PL.",
  },
  {
    id: "6qvNbp4ouNE",
    title: "Simulasi Match & Computer Vision",
    category: "Simulasi Lapangan",
    description: "Pengujian visi komputer dan strategi pergerakan di area simulasi pertandingan.",
  },
  {
    id: "vxv9uolF68w",
    title: "Highlight Aksi Robot Humanoid",
    category: "Short Video",
    description: "Cuplikan singkat akselerasi gerak dan respon fleksibilitas humanoid AROC_PL.",
    isShort: true,
  },
];

export const footerData = {
  description:
    "Advance Robosoccer Polinema. Tim pengembang robot humanoid Politeknik Negeri Malang untuk riset, pengembangan, dan kompetisi.",
  sponsors: ["POLINEMA", "ROBOTICS"],
  contact: [
    {
      label: "Email",
      value: "hello@arocpl.com",
      href: "mailto:hello@arocpl.com",
      icon: "mail",
    },
    {
      label: "Instagram",
      value: "@arocpolinema",
      href: "https://www.instagram.com/arocpolinema",
      icon: "instagram",
    },
    {
      label: "LinkedIn",
      value: "AROC PL Polinema",
      href: "https://id.linkedin.com/in/aroc-pl-advance-robot-soccer-polinema-9756b83b5",
      icon: "linkedin",
    },
    {
      label: "Lokasi",
      value: "Politeknik Negeri Malang, Jl. Soekarno Hatta No.9, Malang",
      icon: "map",
    },
  ] satisfies FooterContact[],
};
