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
    name: "BARA",
    role: "Penyerang Utama (Forward / Striker)",
    description:
      "Unit 01 'BARA' melambangkan semangat api perjuangan yang tak pernah padam di arena pertandingan. Dirancang sebagai penyerang agresif dengan akselerasi instan untuk menembus pertahanan lawan dan mencetak gol tajam.",
    uniqueFact:
      "Dilengkapi algoritma kick-timing presisi tinggi dan impuls eksekusi cepat yang mampu mendeteksi celah gawang dan meluncurkan tembakan kurang dari 40 milidetik.",
    teamTask:
      "Mencetak gol, melakukan penekanan cepat (heavy pressing) pada wilayah lawan, serta membuka ruang serangan di lini depan.",
    image: "/galery/robot.jpg",
    tone: "orange",
  },
  {
    unitNumber: "02",
    name: "JAGRA",
    role: "Penjaga Gawang (Goalkeeper / Kiper)",
    description:
      "Unit 02 'JAGRA' berasal dari kata terjaga dan waspada. Bertindak sebagai benteng pertahanan terakhir AROC_PL dengan stance lebar dan respon refleks instan di depan gawang.",
    uniqueFact:
      "Menggunakan sistem visi komputer sudut lebar ganda dan integrasi IMU presisi tinggi untuk memprediksi lintasan bola dan mengeksekusi aksi diving block otomatis hanya dalam 30 milidetik.",
    teamTask:
      "Menjaga gawang dari segala sudut tembakan lawan, menggagalkan peluang gol musuh, dan mengamankan bola liar di area penalti.",
    image: "/galery/robot.jpg",
    tone: "gold",
  },
  {
    unitNumber: "03",
    name: "TAMA",
    role: "Penyerang Taktis (Playmaker Forward)",
    description:
      "Unit 03 'TAMA' mencerminkan kualitas utama dan unggul. Merupakan robot penyerang taktis yang bertugas mengatur ritme permainan, membuka ruang tembak, dan mengeksekusi umpan-umpan matang ke lini depan.",
    uniqueFact:
      "Menggunakan algoritma spatial awareness 360 derajat dan predictive path-planning yang memungkinkannya mengontrol pergerakan bola di area krusial meskipun dalam duel fisik intensif.",
    teamTask:
      "Mendistribusikan serangan, menciptakan peluang gol bersama BARA, serta mengeksekusi tembakan penentu dari lini depan.",
    image: "/galery/robot.jpg",
    tone: "cyan",
  },
];

export const teamLead: TeamLead = {
  name: "Fasha Rafi Islamey",
  role: "Ketua Tim / Team Leader",
  image: "/images/ANGGOTA 26/Fasha.jpg",
  badge: "Kapten",
  intro:
    "Pengembangan robot humanoid membutuhkan presisi, disiplin, dan evaluasi berkelanjutan agar setiap sistem siap dipertandingkan.",
  facts: [
    { label: "Periode", value: "2025-2026", icon: "trophy" },
    { label: "Jurusan", value: "Teknik Elektro", icon: "cpu" },
    { label: "Anggota", value: "20 Aktif", icon: "users" },
  ],
};

export const teamYears: TeamYear[] = [
  {
    year: "2026",
    label: "Anggota Tim 2026",
    members: [
      {
        name: "Fasha Rafi Islamey",
        role: "Ketua Tim",
        nim: "2241760001",
        handle: "@fasharafi",
        phone: "081234567890",
        image: "/images/ANGGOTA 26/Fasha.jpg",
      },
      {
        name: "Hannunah Qiblatin",
        role: "Divisi Manager",
        nim: "2241760002",
        handle: "@hannunah",
        phone: "081234567891",
        image: "/images/ANGGOTA 26/hannun.JPG",
      },
      {
        name: "Naomi Phoan Alodia Edgina",
        role: "Divisi Manager",
        nim: "2241760003",
        handle: "@naomiphoan",
        phone: "081234567892",
        image: "/images/ANGGOTA 26/nayoumie.JPG",
      },
      {
        name: "Aprillo Firos Nugroho",
        role: "Divisi Image Processing",
        nim: "2241760004",
        handle: "@firosnugroho",
        phone: "081234567893",
        image: "/images/ANGGOTA 26/firos.JPG",
      },
      {
        name: "Gabriel Batavia Xaverius",
        role: "Divisi Image Processing",
        nim: "2241760005",
        handle: "@gabrielbatavia",
        phone: "081234567894",
        image: "/images/ANGGOTA 26/Gabriel.jpg",
      },
      {
        name: "Muh. Fatih Assayuti",
        role: "Divisi Image Processing",
        nim: "2241760006",
        handle: "@fatihassayuti",
        phone: "081234567895",
        image: "/images/ANGGOTA 26/fatih.JPG",
      },
      {
        name: "Noor Ishmata Choirun Eilmi",
        role: "Divisi Image Processing",
        nim: "2241760007",
        handle: "@ishmataeilmi",
        phone: "081234567896",
        image: "/images/ANGGOTA 26/ilmi.JPG",
      },
      {
        name: "Alfarel Putra Ridho",
        role: "Divisi Communication",
        nim: "2241760008",
        handle: "@alfarelputra",
        phone: "081234567897",
        image: "/images/ANGGOTA 26/farel.JPG",
      },
      {
        name: "Fiqi Raihan Hubbi M.",
        role: "Divisi Communication",
        nim: "2241760009",
        handle: "@raihanhubbi",
        phone: "081234567898",
        image: "/images/ANGGOTA 26/reihan.JPG",
      },
      {
        name: "Muhammad Afifi",
        role: "Divisi Communication",
        nim: "2241760010",
        handle: "@muhafifi",
        phone: "081234567899",
        image: "/images/ANGGOTA 26/WhatsApp Image 2026-08-05 at 14.04.27.jpeg",
      },
      {
        name: "Rio Zefa Artasena",
        role: "Divisi Communication",
        nim: "2241760011",
        handle: "@riozefa",
        phone: "081234567900",
        image: "/images/ANGGOTA 26/rio.JPG",
      },
      {
        name: "Adetin Dewi Cantika",
        role: "Divisi Maneuvering",
        nim: "2241760012",
        handle: "@adetindewi",
        phone: "081234567901",
        image: "/images/ANGGOTA 26/WhatsApp Image 2026-08-18 at 15.20.18.jpeg",
      },
      {
        name: "Ahmad Habibullah",
        role: "Divisi Maneuvering",
        nim: "2241760013",
        handle: "@habibullah",
        phone: "081234567902",
        image: "/images/ANGGOTA 26/habib.JPG",
      },
      {
        name: "Bayu Kurniawan",
        role: "Divisi Maneuvering",
        nim: "2241760014",
        handle: "@bayukurniawan",
        phone: "081234567903",
        image: "/images/ANGGOTA 26/tgt.JPG",
      },
      {
        name: "Gavra Ahmad Zidan",
        role: "Divisi Maneuvering",
        nim: "2241760015",
        handle: "@gavrazidan",
        phone: "081234567904",
        image: "/images/ANGGOTA 26/gavra.JPG",
      },
      {
        name: "M. Lufyn Aulia Rahman",
        role: "Divisi Maneuvering",
        nim: "2241760016",
        handle: "@lufynaulia",
        phone: "081234567905",
        image: "/images/ANGGOTA 26/ufyyn.JPG",
      },
      {
        name: "M. Rizal Al Akbar",
        role: "Divisi Maneuvering",
        nim: "2241760017",
        handle: "@rizalakbar",
        phone: "081234567906",
        image: "/images/ANGGOTA 26/ijal.JPG",
      },
      {
        name: "M. Ryan Hidayat",
        role: "Divisi Maneuvering",
        nim: "2241760018",
        handle: "@ryanhidayat",
        phone: "081234567907",
        image: "/images/ANGGOTA 26/riyan.JPG",
      },
      {
        name: "M. Wisnu Hardiantoro",
        role: "Divisi Maneuvering",
        nim: "2241760019",
        handle: "@wisnuhardi",
        phone: "081234567908",
        image: "/images/ANGGOTA 26/tgt1.JPG",
      },
      {
        name: "Rendy Eko Pastyo",
        role: "Divisi Maneuvering",
        nim: "2241760020",
        handle: "@rendyeko",
        phone: "081234567909",
        image: "/images/ANGGOTA 26/rendy.JPG",
      },
    ],
  },
];

export const teamStats = [
  { value: "20+", label: "Personel Aktif", tone: "cyan" },
  { value: "6", label: "Divisi Spesialis", tone: "orange" },
  { value: "3", label: "Angkatan", tone: "blue" },
  { value: "100%", label: "Riset Berkelanjutan dari tim", tone: "gold" },
] satisfies TeamStat[];

export const achievements: Achievement[] = [];

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
