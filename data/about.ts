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
    "Tim pengembang robot humanoid Politeknik Negeri Malang yang berfokus pada riset, pengembangan, dan partisipasi di kompetisi robotik bergengsi.",
  stats: [
    { value: "2", label: "Dosen Pembimbing", tone: "cyan" },
    { value: "20", label: "Total Anggota", tone: "orange" },
    { value: "5", label: "Divisi", tone: "emerald" },
  ] satisfies AboutHeroStat[],
};

export const aboutVision = {
  title: "VISI",
  description:
    "Menjadi tim pengembang robot humanoid yang unggul di Indonesia, mampu bersaing di tingkat internasional, serta mendorong inovasi teknologi dari Politeknik Negeri Malang.",
};

export const aboutMission = {
  title: "MISI",
  items: [
    "Mengembangkan robot humanoid cerdas berbasis AI dan computer vision.",
    "Aktif berkompetisi di KRI (Kontes Robot Indonesia) dan FIRA HuroCup.",
    "Membangun ekosistem riset dan pengembangan robotik yang berkelanjutan.",
    "Memberdayakan mahasiswa melalui kolaborasi lintas disiplin ilmu.",
  ],
};

export const aboutValues = [
  {
    title: "Inovasi",
    description: "Mengembangkan solusi teknis yang relevan dengan kebutuhan kompetisi.",
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
    description: "Bekerja lintas angkatan dan disiplin ilmu dalam satu tujuan pengembangan.",
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
    name: "Muhammad Syirajuddin S., S.T., M.T.",
    role: "Dosen Pembimbing Utama",
    nidn: "-",
    specialization: "Lecturer in Telecommunication Engineering",
    email: "syirajuddin@polinema.ac.id",
    instagram: "@aroc_polinema",
    image: "/images/ANGGOTA 26/Dosen_Syirajuddin.jpg",
    badge: "DOSPEM",
  },
  {
    name: "Galuh Prawestri Citra Handani, S.T., M.T.",
    role: "Dosen Pembimbing Teknis",
    nidn: "-",
    specialization: "Lecturer in Electrical Engineering",
    email: "galuh.prawestri@polinema.ac.id",
    instagram: "@aroc_polinema",
    image: "/images/ANGGOTA 26/Dosen_Galuh.jpg",
    badge: "DOSPEM",
  },
] satisfies AboutMentor[];

export const aboutCohorts: TeamYear[] = teamYears;
