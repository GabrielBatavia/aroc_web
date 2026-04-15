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
  { label: "About", href: "/about", matchPath: "/about" },
  { label: "Technology", href: "/#technology" },
  { label: "Robots", href: "/#robots" },
  { label: "Achievements", href: "/#achievements" },
  { label: "Gallery", href: "/#gallery" },
];

export const footerNavigation: NavLink[] = [
  { label: "About Us", href: "/about", matchPath: "/about" },
  { label: "Technology", href: "/#technology" },
  { label: "Our Robots", href: "/#robots" },
  { label: "Achievements", href: "/#achievements" },
  { label: "Gallery", href: "/#gallery" },
];

export const heroData: HeroData = {
  eyebrow: "AROC_PL JUARA!!!",
  statusLabel: "Status",
  statusValue: "Ready",
  titleLines: {
    top: "Building",
    accent: "Intelligent",
    middle: "Robots.",
    bottomPrefix: "Competing with",
    bottomAccent: "Purpose.",
  },
  description:
    "AROC_PL is Advance Robosoccer Polinema. We engineer the future of humanoid robot soccer for national glory with hardware, intelligence, and relentless teamwork.",
  primaryCta: { label: "Explore Team", href: "#team" },
  secondaryCta: { label: "Watch Our Robots", href: "#robots" },
  robotImage: "/images/hero-robot.png",
  systemCard: {
    label: "System online",
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
    title: "Who We Are",
    description:
      "A robotics team from Politeknik Negeri Malang dedicated to building autonomous humanoid systems for competitive robot soccer.",
    icon: "users",
  },
  {
    title: "Our Focus",
    description:
      "Specializing in humanoid robot soccer development, from motion control and electronics to perception, strategy, and on-field reliability.",
    icon: "target",
  },
  {
    title: "Our Vision",
    description:
      "To become a leading force in intelligent robotics by shaping engineers who can design, test, and compete with purpose.",
    icon: "shield",
  },
];

export const valueCards: ValueCard[] = [
  {
    title: "Innovation",
    description: "Always thinking beyond the current limits of robotics.",
    icon: "spark",
    tone: "gold",
  },
  {
    title: "Integrity",
    description: "Honest, disciplined, and accountable collaboration in every sprint.",
    icon: "shield",
    tone: "cyan",
  },
  {
    title: "Collaboration",
    description: "One team, one objective, connected across generations.",
    icon: "users",
    tone: "blue",
  },
  {
    title: "Achievement",
    description: "National and international competition as a benchmark for growth.",
    icon: "trophy",
    tone: "orange",
  },
];

export const coreDivisions: DivisionCard[] = [
  {
    title: "Hardware",
    eyebrow: "Our Technology",
    description:
      "The physical foundation of every robot, tuned for durability, movement precision, and efficient field performance.",
    tone: "orange",
    items: [
      {
        title: "Mechanical",
        description: "Chassis structure, gait-ready frame design, and actuator integration.",
        icon: "cpu",
      },
      {
        title: "Control & Power",
        description: "Motor drivers, power regulation, and robust battery management.",
        icon: "bolt",
      },
      {
        title: "PCB Design",
        description: "Custom circuitry, sensor routing, and compact embedded interfaces.",
        icon: "circuit",
      },
    ],
  },
  {
    title: "Software",
    eyebrow: "Our Technology",
    description:
      "The intelligence stack that handles strategy, communication, sensing, autonomy, and adaptive behavior on the field.",
    tone: "cyan",
    items: [
      {
        title: "AI / Deep Learning",
        description: "Perception pipelines for detection, decision support, and adaptive play.",
        icon: "code",
      },
      {
        title: "Embedded Systems",
        description: "Low-level coordination between sensors, actuators, and onboard compute.",
        icon: "radio",
      },
      {
        title: "Vision & AI",
        description: "Ball, goal, and field understanding through camera-driven intelligence.",
        icon: "eye",
      },
    ],
  },
];

export const robotCards: RobotCard[] = [
  {
    name: "SI PENG",
    role: "Striker",
    description:
      "Fast, agile, and equipped with a powerful kicking mechanism for offensive pressure.",
    image: "/images/robot-sipeng.png",
    tone: "cyan",
    stats: [
      { label: "Speed", value: 92 },
      { label: "Power", value: 90 },
      { label: "Vision", value: 80 },
      { label: "Stability", value: 75 },
    ],
  },
  {
    name: "SI JONI",
    role: "Goalkeeper",
    description:
      "Wide stance and fast reaction time, specialized in diving blocks and defensive coverage.",
    image: "/images/robot-sijoni.png",
    tone: "gold",
    stats: [
      { label: "Speed", value: 70 },
      { label: "Power", value: 85 },
      { label: "Vision", value: 95 },
      { label: "Stability", value: 90 },
    ],
  },
  {
    name: "SI KANCIL",
    role: "Defender",
    description:
      "Built for stability and recovery, excelling at positioning, interceptions, and ball control.",
    image: "/images/robot-sikancil.png",
    tone: "emerald",
    stats: [
      { label: "Speed", value: 75 },
      { label: "Power", value: 80 },
      { label: "Vision", value: 85 },
      { label: "Stability", value: 95 },
    ],
  },
];

export const teamLead: TeamLead = {
  name: "Ahmad Fauzi",
  role: "Ketua Tim / Hardware Lead",
  image: "/images/team-lead.png",
  badge: "Leader",
  intro:
    "Building a robot is not only about assembling components. It is about trust, precision, discipline, and the spirit to keep learning under pressure.",
  facts: [
    { label: "Ketua Tim", value: "2024-2025", icon: "trophy" },
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
        role: "Elektronika / PCB Design",
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
        role: "Hardware / Actuator",
        nim: "2241760012",
        handle: "@dimasardn",
        phone: "081299112233",
        image: "/images/member-rizki.png",
      },
      {
        name: "Alicia Pramesti",
        role: "Electronics / Control",
        nim: "2241760013",
        handle: "@aliciapram",
        phone: "081234551122",
        image: "/images/member-nurul.png",
      },
      {
        name: "Rafi Maulana",
        role: "Strategy / Motion",
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
        role: "Programming / Control",
        nim: "2341760021",
        handle: "@miranip",
        phone: "081221119988",
        image: "/images/member-nurul.png",
      },
      {
        name: "Rama Prakoso",
        role: "Mechanical / CAD",
        nim: "2341760022",
        handle: "@ramaprakoso",
        phone: "081233445566",
        image: "/images/member-rizki.png",
      },
      {
        name: "Salsa Rahma",
        role: "Vision / Research",
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
    title: "Champion KRI Humanoid League",
    subtitle: "Kontes Robot Indonesia",
    tone: "gold",
    icon: "trophy",
  },
  {
    year: "2023",
    title: "Best Design & Architecture",
    subtitle: "National KRSBI",
    tone: "cyan",
    icon: "spark",
  },
  {
    year: "2022",
    title: "1st Place Regional IV",
    subtitle: "Regional Robotics Contest",
    tone: "orange",
    icon: "medal",
  },
  {
    year: "2020",
    title: "Top 2 National",
    subtitle: "KRSBI 2020",
    tone: "blue",
    icon: "trophy",
  },
];

export const galleryItems: GalleryItem[] = [
  {
    src: "/images/gallery-1.png",
    alt: "Prototype robot hardware with exposed wiring during testing.",
    layout: "large-left",
  },
  {
    src: "/images/gallery-2.png",
    alt: "Team members collaborating on software and electronics work.",
    layout: "small-top",
  },
  {
    src: "/images/gallery-3.png",
    alt: "Close-up of a circuit board and embedded robotics components.",
    layout: "small-top-right",
  },
  {
    src: "/images/gallery-4.png",
    alt: "AROC_PL discussion session around workstations in the lab.",
    layout: "wide-bottom",
  },
];

export const footerData = {
  description:
    "Advance Robosoccer Polinema. We build intelligent humanoid robots to compete and push the limits of technology.",
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
      label: "Location",
      value: "Politeknik Negeri Malang, Jl. Soekarno Hatta No.9, Malang",
      icon: "map",
    },
  ] satisfies FooterContact[],
};
