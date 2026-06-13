export type UpdateCategory = "Testing" | "Competition" | "Workshop" | "Milestone";

export type UpdateItem = {
  title: string;
  date: string;
  category: UpdateCategory;
  excerpt: string;
  image: string;
  tags: string[];
  result?: string;
};

export const updateHero = {
  eyebrow: "News / Updates",
  title: "Log pengembangan, kompetisi, dan milestone AROC_PL.",
  description:
    "Catatan kegiatan tim dari lab menuju arena: pengujian robot, workshop internal, milestone teknis, dan dokumentasi kompetisi robot humanoid.",
};

export const updateCategories: Array<{ label: UpdateCategory; description: string }> = [
  {
    label: "Testing",
    description: "Sesi uji gait, vision, sensor, komunikasi, dan reliability robot sebelum turun lapangan.",
  },
  {
    label: "Competition",
    description: "Dokumentasi persiapan, evaluasi, dan hasil dari ajang robotika yang diikuti tim.",
  },
  {
    label: "Workshop",
    description: "Transfer knowledge lintas divisi agar regenerasi tim tetap kuat.",
  },
  {
    label: "Milestone",
    description: "Pencapaian pengembangan seperti integrasi modul, upgrade robot, dan rilis sistem baru.",
  },
];

export const updates: UpdateItem[] = [
  {
    title: "Validasi gait stabil untuk tiga unit robot humanoid",
    date: "2026-06-08",
    category: "Testing",
    excerpt:
      "Tim melakukan pengujian stabilitas berjalan, recovery pose, dan respons kontrol untuk memastikan setiap unit siap menjalani skenario pertandingan.",
    image: "/images/robot-sikancil.png",
    tags: ["Gait", "Control", "Reliability"],
    result: "Stability pass untuk mode dasar dan transisi arah.",
  },
  {
    title: "Sprint integrasi vision pipeline dengan strategi lapangan",
    date: "2026-05-27",
    category: "Milestone",
    excerpt:
      "Pipeline deteksi bola dan garis lapangan dihubungkan dengan keputusan role penyerang, kiper, dan bek untuk simulasi taktik pertandingan.",
    image: "/images/gallery-3.png",
    tags: ["Vision", "Strategy", "Software"],
    result: "Koordinasi antar role masuk tahap evaluasi lapangan.",
  },
  {
    title: "Workshop internal: debugging embedded dan komunikasi robot",
    date: "2026-05-12",
    category: "Workshop",
    excerpt:
      "Anggota lintas angkatan membedah alur debugging embedded, pembacaan sensor, dan pola komunikasi antar modul agar proses maintenance lebih cepat.",
    image: "/images/gallery-2.png",
    tags: ["Embedded", "Communication", "Regeneration"],
  },
  {
    title: "Evaluasi pasca simulasi match day di lab",
    date: "2026-04-29",
    category: "Testing",
    excerpt:
      "Robot diuji dalam skenario match day mini untuk mengevaluasi tracking bola, positioning, respons obstacle, dan kestabilan aktuator.",
    image: "/images/gallery-1.png",
    tags: ["Match Simulation", "Vision", "Actuator"],
    result: "Daftar improvement disusun untuk sprint berikutnya.",
  },
  {
    title: "Persiapan materi kompetisi dan dokumentasi teknis",
    date: "2026-04-16",
    category: "Competition",
    excerpt:
      "Tim menyusun dokumentasi arsitektur sistem, foto robot, dan catatan evaluasi sebagai bagian dari kesiapan kompetisi robot humanoid.",
    image: "/images/hero-integrated.png",
    tags: ["KRI", "Documentation", "Team"],
  },
  {
    title: "Upgrade chassis dan layout servis cepat",
    date: "2026-03-30",
    category: "Milestone",
    excerpt:
      "Perubahan layout mekanik difokuskan pada akses servis, manajemen kabel, dan kemudahan penggantian modul saat sesi uji intensif.",
    image: "/images/robot-sipeng.png",
    tags: ["Hardware", "Mechanical", "Serviceability"],
    result: "Waktu inspeksi komponen lebih ringkas saat pengujian.",
  },
];

export const featuredUpdate = updates[0];
