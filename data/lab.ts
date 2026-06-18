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
    tagline: "Mainkan parameter OP3 seperti x_move_amplitude, period_time, z_move_amplitude, dan balance feedback.",
    division: "Maneuvering",
    color: "#ffe45c",
    colorRgb: "255, 228, 92",
  },
  {
    id: "image-processing",
    index: "02",
    title: "Vision Lock Simulator",
    tagline: "YOLO/OpenVINO mendeteksi bola, publish CircleSet, lalu localizer mengubahnya menjadi /ball_polar.",
    division: "Image Processing",
    color: "#7b93e8",
    colorRgb: "123, 147, 232",
  },
  {
    id: "communication",
    index: "03",
    title: "Signal Flow Console",
    tagline: "Bridge menerjemahkan /ball_polar menjadi walking command, action page, atau kick gate alignment.",
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
