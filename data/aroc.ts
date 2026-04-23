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
  name: string;
  role: string;
  description: string;
  image: string;
  tone: AccentTone;
  stats: RobotStat[];
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
  { label: "Tentang", href: "/about", matchPath: "/about" },
  { label: "Tim", href: "/#team" },
  { label: "Robot", href: "/#robots" },
  { label: "Prestasi", href: "/#achievements" },
  { label: "Galeri", href: "/#gallery" },
];

export const footerNavigation: NavLink[] = [
  { label: "Tentang Kami", href: "/about", matchPath: "/about" },
  { label: "Tim Kami", href: "/#team" },
  { label: "Armada Robot", href: "/#robots" },
  { label: "Ruang Piala", href: "/#achievements" },
  { label: "Galeri", href: "/#gallery" },
  { label: "Jadi Sponsor", href: "/#sponsor" },
];

export const heroData: HeroData = {
  eyebrow: "AROC_PL JUARA!!!",
  statusLabel: "Status",
  statusValue: "Siap Tanding",
  titleLines: {
    top: "Kami bangun",
    accent: "robot",
    middle: "",
    bottomPrefix: "yang",
    bottomAccent: "menang.",
  },
  description:
    "AROC_PL adalah Advance Robosoccer Polinema. Kami merakit masa depan sepak bola robot humanoid — dengan presisi hardware, kecerdasan di lapangan, dan kerja tim tanpa henti.",
  primaryCta: { label: "Kenali Tim Kami", href: "#team" },
  secondaryCta: { label: "Jadi Sponsor", href: "#sponsor" },
  robotImage: "/images/hero-robot.png",
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
      "Tim robotika dari Politeknik Negeri Malang yang fokus membangun sistem humanoid otonom untuk kompetisi sepak bola robot tingkat nasional.",
    icon: "users",
  },
  {
    title: "Fokus Kami",
    description:
      "Spesialisasi pengembangan robot humanoid — mulai dari kontrol gerak, elektronika, persepsi, strategi lapangan, hingga keandalan di pertandingan.",
    icon: "target",
  },
  {
    title: "Visi Kami",
    description:
      "Menjadi kekuatan terdepan di robotika cerdas dengan mencetak engineer yang mampu merancang, menguji, dan berkompetisi dengan tujuan.",
    icon: "shield",
  },
];

export const valueCards: ValueCard[] = [
  {
    title: "Inovasi",
    description:
      "Selalu berpikir melampaui batas teknologi robotika saat ini.",
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
      "Kompetisi nasional dan internasional sebagai tolok ukur kami bertumbuh.",
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
          "Struktur chassis, desain frame siap gait, dan integrasi aktuator.",
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
          "Rangkaian custom, routing sensor, dan antarmuka embedded ringkas.",
        icon: "circuit",
      },
    ],
  },
  {
    title: "Software",
    eyebrow: "Teknologi Kami",
    description:
      "Otak cerdas yang menangani strategi, komunikasi, sensing, otonomi, dan perilaku adaptif robot di lapangan.",
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
          "Pemahaman bola, gawang, dan lapangan melalui kamera cerdas.",
        icon: "eye",
      },
    ],
  },
];

export const robotCards: RobotCard[] = [
  {
    name: "SI PENG",
    role: "Penyerang",
    description:
      "Cepat, lincah, dan dilengkapi mekanisme tendangan kuat untuk tekanan ofensif.",
    image: "/images/robot-sipeng.png",
    tone: "cyan",
    stats: [
      { label: "Kecepatan", value: 92 },
      { label: "Kekuatan", value: 90 },
      { label: "Visi", value: 80 },
      { label: "Stabilitas", value: 75 },
    ],
  },
  {
    name: "SI JONI",
    role: "Kiper",
    description:
      "Stance lebar dan reaksi cepat — spesialis diving block dan penjagaan area pertahanan.",
    image: "/images/robot-sijoni.png",
    tone: "gold",
    stats: [
      { label: "Kecepatan", value: 70 },
      { label: "Kekuatan", value: 85 },
      { label: "Visi", value: 95 },
      { label: "Stabilitas", value: 90 },
    ],
  },
  {
    name: "SI KANCIL",
    role: "Bek",
    description:
      "Dibangun untuk stabilitas dan pemulihan cepat — unggul di positioning, intersep, dan penguasaan bola.",
    image: "/images/robot-sikancil.png",
    tone: "emerald",
    stats: [
      { label: "Kecepatan", value: 75 },
      { label: "Kekuatan", value: 80 },
      { label: "Visi", value: 85 },
      { label: "Stabilitas", value: 95 },
    ],
  },
];

export const teamLead: TeamLead = {
  name: "Ahmad Fauzi",
  role: "Ketua Tim / Hardware Lead",
  image: "/images/team-lead.png",
  badge: "Kapten",
  intro:
    "Membangun robot bukan sekadar merakit komponen. Ini soal kepercayaan, presisi, disiplin, dan semangat untuk terus belajar di bawah tekanan.",
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
  { value: "100%", label: "Semangat Juang", tone: "gold" },
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
    src: "/images/gallery-1.png",
    alt: "Prototipe robot dengan wiring terlihat saat sesi pengujian.",
    layout: "large-left",
  },
  {
    src: "/images/gallery-2.png",
    alt: "Anggota tim berkolaborasi mengerjakan software dan elektronika.",
    layout: "small-top",
  },
  {
    src: "/images/gallery-3.png",
    alt: "Close-up papan PCB dan komponen embedded robotik.",
    layout: "small-top-right",
  },
  {
    src: "/images/gallery-4.png",
    alt: "Sesi diskusi AROC_PL di sekitar workstation lab.",
    layout: "wide-bottom",
  },
];

export const footerData = {
  description:
    "Advance Robosoccer Polinema. Kami membangun robot humanoid cerdas untuk bertanding dan mendorong batas teknologi Indonesia.",
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
      value: "@aroc_pl",
      href: "https://instagram.com/aroc_pl",
      icon: "instagram",
    },
    {
      label: "LinkedIn",
      value: "AROC PL Polinema",
      href: "https://www.linkedin.com/company/aroc-pl-polinema",
      icon: "linkedin",
    },
    {
      label: "Lokasi",
      value: "Politeknik Negeri Malang, Jl. Soekarno Hatta No.9, Malang",
      icon: "map",
    },
  ] satisfies FooterContact[],
};
