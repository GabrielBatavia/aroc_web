import type { AccentTone, TeamYear } from "@/data/aroc";
import { teamYears } from "@/data/aroc";

export type AboutHeroStat = {
  value: string;
  label: string;
  tone: AccentTone;
};

export type AboutValue = {
  title: string;
  description: string;
  tone: AccentTone;
  icon: "star" | "shield" | "users" | "medal";
};

export type AboutMentor = {
  name: string;
  role: string;
  nidn: string;
  specialization: string;
  email: string;
  instagram: string;
  image: string;
  badge: string;
};

export const aboutHero = {
  eyebrow: "Advance Robosoccer Polinema",
  titlePrefix: "Tentang",
  titleAccent: "AROC_PL",
  description:
    "Tim robotik humanoid kompetitif dari Politeknik Negeri Malang. Membangun teknologi, mencetak prestasi, bersama lintas angkatan.",
  stats: [
    { value: "2", label: "Dosen Pembimbing", tone: "cyan" },
    { value: "11", label: "Total Anggota", tone: "orange" },
    { value: "3", label: "Angkatan", tone: "emerald" },
  ] satisfies AboutHeroStat[],
};

export const aboutVision = {
  title: "VISI",
  description:
    "Menjadi tim robotik humanoid terdepan di Indonesia yang mampu bersaing di level internasional, mendorong inovasi teknologi, dan mencetak generasi engineer unggul dari Politeknik Negeri Malang.",
};

export const aboutMission = {
  title: "MISI",
  items: [
    "Mengembangkan robot humanoid cerdas berbasis AI dan computer vision.",
    "Aktif berkompetisi di KRI (Kontes Robot Indonesia) dan FIRA HuroCup.",
    "Membangun ekosistem riset & pengembangan robotik yang berkelanjutan.",
    "Memberdayakan mahasiswa melalui kolaborasi lintas disiplin ilmu.",
  ],
};

export const aboutValues = [
  {
    title: "Inovasi",
    description: "Selalu berpikir di luar batas teknologi saat ini.",
    tone: "gold",
    icon: "star",
  },
  {
    title: "Integritas",
    description: "Jujur, disiplin, dan bertanggung jawab dalam tim.",
    tone: "cyan",
    icon: "shield",
  },
  {
    title: "Kolaborasi",
    description: "Satu tim, satu tujuan — lintas angkatan.",
    tone: "blue",
    icon: "users",
  },
  {
    title: "Prestasi",
    description:
      "Kompetisi nasional & internasional sebagai tolok ukur kami bertumbuh.",
    tone: "orange",
    icon: "medal",
  },
] satisfies AboutValue[];

export const aboutMentors = [
  {
    name: "Dr. Ir. Budi Santoso, M.T.",
    role: "Dosen Pembimbing Utama",
    nidn: "0012345678",
    specialization: "Robotika & Kecerdasan Buatan",
    email: "budi.santoso@polinema.ac.id",
    instagram: "@budi_santoso",
    image: "/images/mentor-budi.png",
    badge: "DOSPEM",
  },
  {
    name: "Siti Rahayu, S.T., M.T.",
    role: "Dosen Pembimbing Teknis",
    nidn: "0087654321",
    specialization: "Sistem Kontrol & Embedded Systems",
    email: "siti.rahayu@polinema.ac.id",
    instagram: "@siti_rahayu",
    image: "/images/mentor-siti.png",
    badge: "DOSPEM",
  },
] satisfies AboutMentor[];

export const aboutCohorts: TeamYear[] = teamYears;
