export type RobotHotspot = {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  detail: string;
  position: string;
  normal: string;
  cameraOrbit: string;
  cameraTarget: string;
  metrics: Array<{ label: string; value: string }>;
};

export type RobotSpec = {
  label: string;
  value: string;
};

export type RobotUpgrade = {
  label: string;
  before: string;
  after: string;
  note: string;
};

export type RobotKitItem = {
  item: string;
  quantity: string;
  note: string;
};

export const robotExperienceHero = {
  eyebrow: "ROBOTIS OP3 Teardown",
  title: "Putar robot. Klik modulnya. Baca sistemnya.",
  description:
    "Experience 3D interaktif untuk membedah platform humanoid OP3: dari vision head, compute core, aktuator DYNAMIXEL, IMU, sampai power system yang siap dipakai di riset dan arena robot soccer.",
  modelSrc: "/images/3DHumanoid.optimized.glb",
  posterSrc: "/images/hero-robot.png",
  sourceLabel: "Source: ROBOTIS OP3 e-Manual",
};

export const robotOverviewStats: RobotSpec[] = [
  { label: "Height", value: "510mm" },
  { label: "Weight", value: "3.5kg" },
  { label: "DOF", value: "20" },
  { label: "Actuator", value: "XM430" },
  { label: "Controller", value: "NUC i3" },
  { label: "Runtime Stack", value: "ROS2" },
];

export const robotHotspots: RobotHotspot[] = [
  {
    id: "vision-head",
    label: "Vision",
    eyebrow: "Hotspot 01",
    title: "Vision Head",
    description:
      "Logitech C920 HD Pro Webcam memberi OP3 input visual 1920x1080 untuk demo vision processing, ball detection, dan perilaku autonomous soccer.",
    detail:
      "Di platform humanoid, kamera bukan sekadar sensor tambahan. Ia menjadi sumber persepsi utama untuk membaca bola, arah lapangan, dan target visual sebelum motion planner mengambil keputusan.",
    position: "0m 0.66m 0.04m",
    normal: "0m 0m 1m",
    cameraOrbit: "0deg 68deg 95%",
    cameraTarget: "0m 0.52m 0m",
    metrics: [
      { label: "Camera", value: "C920" },
      { label: "Input", value: "1920x1080" },
      { label: "Use", value: "Vision" },
    ],
  },
  {
    id: "compute-core",
    label: "Core",
    eyebrow: "Hotspot 02",
    title: "Intel NUC Compute Core",
    description:
      "OP3 mengganti SBC Intel Atom generasi lama dengan Intel NUC i3 dual-core, RAM DDR4 8GB, dan M.2 SSD 250GB untuk ruang komputasi yang jauh lebih lega.",
    detail:
      "Kombinasi CPU 64-bit, SSD, dan RAM yang lebih besar membuat developer bisa menjalankan pipeline ROS2, logging, vision, serta eksperimen kontrol tanpa terlalu cepat mentok di resource.",
    position: "0m 0.39m 0.07m",
    normal: "0m 0m 1m",
    cameraOrbit: "8deg 74deg 105%",
    cameraTarget: "0m 0.36m 0m",
    metrics: [
      { label: "CPU", value: "Core i3" },
      { label: "RAM", value: "8GB" },
      { label: "SSD", value: "250GB" },
    ],
  },
  {
    id: "dynamixel-joints",
    label: "Joints",
    eyebrow: "Hotspot 03",
    title: "DYNAMIXEL XM430-W350-R",
    description:
      "Sendi OP3 memakai XM430-W350-R dengan 20 DOF, Protocol 2.0, current-based torque control, dan profile control untuk motion planning yang lebih halus.",
    detail:
      "Dibanding MX-28, XM430-W350 membawa gear ratio 353.5:1 dan stall torque 4.1 N.m. Artinya robot punya fondasi aktuasi lebih kuat untuk walking, kicking, dan stabilisasi pose.",
    position: "-0.18m 0.32m 0.02m",
    normal: "-1m 0m 0.6m",
    cameraOrbit: "-35deg 76deg 110%",
    cameraTarget: "-0.08m 0.31m 0m",
    metrics: [
      { label: "DOF", value: "20" },
      { label: "Torque", value: "4.1 N.m" },
      { label: "Protocol", value: "2.0" },
    ],
  },
  {
    id: "balance-imu",
    label: "IMU",
    eyebrow: "Hotspot 04",
    title: "Balance & IMU Feedback",
    description:
      "IMU OP3 menggabungkan 3-axis gyroscope, 3-axis accelerometer, dan 3-axis magnetometer untuk membaca orientasi dan perubahan gerak robot.",
    detail:
      "Sensor ini penting untuk closed-loop behavior: robot perlu tahu kapan tubuhnya miring, kapan akselerasi berubah, dan bagaimana menjaga stabilitas saat berjalan atau kontak dengan bola.",
    position: "0.14m 0.43m 0.06m",
    normal: "1m 0m 0.6m",
    cameraOrbit: "32deg 72deg 105%",
    cameraTarget: "0.06m 0.39m 0m",
    metrics: [
      { label: "Gyro", value: "3-axis" },
      { label: "Accel", value: "3-axis" },
      { label: "Mag", value: "3-axis" },
    ],
  },
  {
    id: "back-panel",
    label: "I/O",
    eyebrow: "Hotspot 05",
    title: "OpenCR & Back Panel",
    description:
      "Sub-controller OpenCR menangani interface low-level, sedangkan panel belakang menyediakan RGB LED, tiga LED status, empat tombol, speaker, HDMI, dan DisplayPort.",
    detail:
      "Tombol Mode, Start, User, dan Reset membuat demo serta pengujian lebih praktis. Upgrade HDMI dan DisplayPort juga membuat setup development lebih modern dibanding mini HDMI pada OP2.",
    position: "0m 0.34m -0.08m",
    normal: "0m 0m -1m",
    cameraOrbit: "180deg 76deg 112%",
    cameraTarget: "0m 0.34m 0m",
    metrics: [
      { label: "Sub", value: "OpenCR" },
      { label: "Buttons", value: "4" },
      { label: "LED", value: "RGB + 3" },
    ],
  },
  {
    id: "power-system",
    label: "Power",
    eyebrow: "Hotspot 06",
    title: "LiPo Power System",
    description:
      "OP3 menggunakan baterai LiPo 3-cell 11.1V 3300mA. Paket standar menyertakan dua battery pack, charger, DC power supply, dan fuse cadangan.",
    detail:
      "E-manual juga mencatat battery hot swap: baterai dapat diganti tanpa mematikan robot jika prosedurnya diikuti dengan benar. Ini berguna saat sesi testing panjang di lab.",
    position: "0m 0.18m -0.05m",
    normal: "0m -0.2m -1m",
    cameraOrbit: "160deg 82deg 118%",
    cameraTarget: "0m 0.2m 0m",
    metrics: [
      { label: "Battery", value: "LiPo" },
      { label: "Voltage", value: "11.1V" },
      { label: "Capacity", value: "3300mA" },
    ],
  },
  {
    id: "motion-platform",
    label: "Legs",
    eyebrow: "Hotspot 07",
    title: "Dynamic Motion Platform",
    description:
      "OP3 dirancang sebagai miniature humanoid platform untuk riset, edukasi, dan aktivitas dinamis seperti berjalan, menendang, serta autonomous soccer mode.",
    detail:
      "Kekuatan OP3 ada pada kombinasi computational power, sensor feedback, payload capacity, dan mekanik humanoid yang bisa diprogram lewat C++, ROS2, dan DYNAMIXEL SDK.",
    position: "0.12m 0.08m 0.04m",
    normal: "0.6m -0.6m 0.4m",
    cameraOrbit: "18deg 82deg 120%",
    cameraTarget: "0m 0.14m 0m",
    metrics: [
      { label: "Height", value: "510mm" },
      { label: "Weight", value: "3.5kg" },
      { label: "Stack", value: "ROS2" },
    ],
  },
];

export const robotUpgradeCards: RobotUpgrade[] = [
  {
    label: "Actuator Upgrade",
    before: "MX-28",
    after: "XM430-W350",
    note: "Torsi naik dari 2.5 N.m ke 4.1 N.m dengan Protocol 2.0 dan current-based torque control.",
  },
  {
    label: "Compute Upgrade",
    before: "Intel Atom N2600",
    after: "Intel NUC i3",
    note: "Komputasi 64-bit, RAM DDR4 8GB, dan SSD 250GB memberi ruang lebih besar untuk ROS2 dan vision.",
  },
  {
    label: "Vision Upgrade",
    before: "Logitech C905",
    after: "Logitech C920",
    note: "Resolusi input naik dari 1600x1200 ke 1920x1080 untuk pipeline persepsi yang lebih tajam.",
  },
  {
    label: "I/O Upgrade",
    before: "Mini HDMI + CM-730",
    after: "HDMI/DP + OpenCR",
    note: "Development lebih praktis dengan display output modern dan sub-controller yang lebih user friendly.",
  },
];

export const robotKitItems: RobotKitItem[] = [
  { item: "Fully-assembled ROBOTIS OP3", quantity: "1", note: "Platform utama siap dikembangkan." },
  { item: "Battery Pack", quantity: "2", note: "Cadangan daya untuk sesi testing panjang." },
  { item: "Battery Charger + DC Power Supply", quantity: "1 set", note: "Charging dan bench power." },
  { item: "Ethernet Cable", quantity: "1", note: "Koneksi development langsung." },
  { item: "Wrenches & Screw Drivers", quantity: "1 set", note: "Tooling mekanik dasar." },
  { item: "Spare Cables, Bolts, Nuts, Fuse", quantity: "packs", note: "Consumable untuk maintenance." },
  { item: "Ball", quantity: "1", note: "Demo soccer dan vision target." },
  { item: "USB Recovery Drive + Hard Case", quantity: "1 set", note: "Recovery software dan transport." },
];

export const robotSafetyNotes = [
  "Jauhkan robot dari wajah dan tubuh saat motion aktif.",
  "Waspadai pinch point di antara frame dan sendi servo.",
  "Gunakan baterai dan charger yang sesuai dengan kit.",
  "Hindari air, panas ekstrem, dan api saat robot atau baterai digunakan.",
  "Servo gear perlu inspeksi dan penggantian berkala setelah pemakaian intensif.",
];
