export type SimulatorId = "maneuvering" | "image-processing" | "communication";

export type SimulatorMeta = {
  id: SimulatorId;
  index: string;
  title: string;
  tagline: string;
  division: string;
  color: string;
  colorRgb: string;
};

export const labSimulators: SimulatorMeta[] = [
  {
    id: "maneuvering",
    index: "01",
    title: "Balance & Gait Tuner",
    tagline: "Humanoid walking bukan cuma 'jalan'. Atur empat parameter dan lihat robot tetap seimbang — atau jatuh.",
    division: "Maneuvering",
    color: "#ffe45c",
    colorRgb: "255, 228, 92",
  },
  {
    id: "image-processing",
    index: "02",
    title: "Vision Lock Simulator",
    tagline: "Robot tidak 'melihat' seperti manusia. Ia membaca frame, threshold, dan confidence — setiap detik.",
    division: "Image Processing",
    color: "#7b93e8",
    colorRgb: "123, 147, 232",
  },
  {
    id: "communication",
    index: "03",
    title: "Signal Flow Console",
    tagline: "Vision, Strategy, Communication, Motion — empat blok yang harus bicara tanpa delay.",
    division: "Communication",
    color: "#c8ccd8",
    colorRgb: "200, 204, 216",
  },
];

export const labHeroStats = [
  { label: "Simulator", value: "3" },
  { label: "No Reading Wall", value: "✓" },
  { label: "Playable", value: "Now" },
];
