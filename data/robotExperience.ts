export type RobotHotspot = {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  detail: string;
  whatItIs: string;
  whyItMatters: string;
  arenaImpact: string;
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

// Positions are calibrated from the unmerged 3DHumanoid.glb part bounding boxes.
// The optimized GLB keeps the same coordinate space, so these anchors still attach correctly.
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
    whatItIs:
      "Modul kamera HD di kepala robot yang menjadi mata utama untuk membaca lingkungan.",
    whyItMatters:
      "Input 1920x1080 memberi ruang lebih baik untuk thresholding, tracking bola, dan eksperimen deteksi berbasis AI.",
    arenaImpact:
      "Robot bisa mengunci target visual lebih cepat sebelum memilih arah jalan, posisi tubuh, atau eksekusi tendangan.",
    position: "328.66m 132m -497.55m",
    normal: "0m 1m 0m",
    cameraOrbit: "0deg 68deg 95%",
    cameraTarget: "328.66m 116.12m -497.55m",
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
    whatItIs:
      "Komputer utama robot yang menjalankan ROS2, vision pipeline, behavior, logging, dan tool development.",
    whyItMatters:
      "NUC i3, RAM DDR4, dan SSD M.2 membuat OP3 lebih siap untuk workload riset modern dibanding platform Atom lama.",
    arenaImpact:
      "Keputusan robot bisa diproses lebih stabil saat vision, strategi, dan kontrol gerak berjalan bersamaan.",
    position: "328.66m 146m -348.3m",
    normal: "0m 1m 0m",
    cameraOrbit: "8deg 74deg 105%",
    cameraTarget: "328.66m 87.92m -348.3m",
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
    whatItIs:
      "Rangkaian aktuator DYNAMIXEL yang membentuk sendi humanoid pada lengan, kaki, dan postur robot.",
    whyItMatters:
      "Current-based control dan profile control memberi kontrol torsi serta transisi gerak yang lebih halus untuk motion planner.",
    arenaImpact:
      "Walking, recovery pose, blocking, dan kicking punya basis mekanik yang lebih kuat dan konsisten.",
    position: "666m 105m -388.38m",
    normal: "1m 0m 0m",
    cameraOrbit: "-35deg 76deg 110%",
    cameraTarget: "503.37m 97.95m -388.38m",
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
    whatItIs:
      "Paket sensor orientasi 9-axis yang membaca rotasi, akselerasi, dan arah medan magnet.",
    whyItMatters:
      "Data IMU membantu robot memahami kondisi tubuhnya sendiri, bukan hanya posisi target di kamera.",
    arenaImpact:
      "Saat robot terdorong, berhenti mendadak, atau mulai kehilangan balance, sistem punya feedback untuk koreksi gerak.",
    position: "386m 152m -374m",
    normal: "0.45m 0.9m 0m",
    cameraOrbit: "32deg 72deg 105%",
    cameraTarget: "328.66m 88.12m -351.05m",
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
    whatItIs:
      "Interface belakang dan sub-controller yang menjembatani input tombol, indikator, speaker, dan koneksi development.",
    whyItMatters:
      "OpenCR dan panel I/O membuat testing di lab lebih cepat karena mode, start, user action, dan reset tersedia fisik.",
    arenaImpact:
      "Operator bisa masuk demo mode, recovery, atau restart behavior dengan lebih cepat saat sesi pengujian lapangan.",
    position: "328.66m -8m -351.05m",
    normal: "0m -1m 0m",
    cameraOrbit: "180deg 76deg 112%",
    cameraTarget: "328.66m 24m -351.05m",
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
    whatItIs:
      "Sistem daya LiPo 3-cell yang memasok energi untuk compute, controller, sensor, dan aktuator.",
    whyItMatters:
      "Dua battery pack, charger, power supply, dan fuse cadangan membuat siklus testing tidak cepat terputus.",
    arenaImpact:
      "Sesi tuning gait, vision, dan tendangan bisa berjalan lebih panjang dengan downtime power yang lebih kecil.",
    position: "334.79m 20m -301.8m",
    normal: "0m -1m 0m",
    cameraOrbit: "160deg 82deg 118%",
    cameraTarget: "328.66m 87.12m -305.55m",
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
    whatItIs:
      "Platform humanoid mini dengan struktur kaki, frame, sensor, aktuator, dan software stack yang bisa diprogram penuh.",
    whyItMatters:
      "OP3 bukan mainan display; ia dibuat untuk eksperimen motion, persepsi, kontrol, dan autonomous behavior.",
    arenaImpact:
      "Robot dapat menggabungkan walking, ball approach, stability, dan kick sequence dalam skenario humanoid soccer.",
    position: "376.16m 180m -161.23m",
    normal: "0.35m 0.9m 0m",
    cameraOrbit: "18deg 82deg 120%",
    cameraTarget: "376.16m 104.97m -161.23m",
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
    label: "CPU Upgrade",
    before: "Intel Atom N2600",
    after: "Intel NUC i3",
    note: "Dari SBC Atom 1.6GHz menuju NUC i3 dual-core untuk pipeline robotik yang lebih berat.",
  },
  {
    label: "RAM Capacity",
    before: "2GB DDR3",
    after: "8GB DDR4",
    note: "Memori lebih lega untuk ROS2 nodes, logging, vision processing, dan tool development paralel.",
  },
  {
    label: "Storage Capacity",
    before: "32GB mSATA",
    after: "250GB M.2 SSD",
    note: "Ruang eksperimen lebih besar untuk dataset, source code, build artifacts, dan recovery workflow.",
  },
  {
    label: "Vision Upgrade",
    before: "Logitech C905",
    after: "Logitech C920",
    note: "Resolusi input naik dari 1600x1200 ke 1920x1080 untuk pipeline persepsi yang lebih tajam.",
  },
  {
    label: "Networking",
    before: "802.11n 2.4GHz",
    after: "802.11ax + BT5",
    note: "Koneksi modern dengan 2.4GHz, 5GHz, Bluetooth 5, dan gigabit Ethernet Intel.",
  },
  {
    label: "OS Support",
    before: "32-bit OS",
    after: "32/64-bit OS",
    note: "Dukungan 64-bit membuka akses lebih luas untuk paket Linux, Windows, dan tooling riset modern.",
  },
  {
    label: "Sub Controller",
    before: "CM-730",
    after: "OpenCR",
    note: "Kontrol low-level lebih user friendly untuk eksperimen servo, tombol, LED, dan integrasi sistem.",
  },
  {
    label: "Display & I/O",
    before: "Mini HDMI",
    after: "HDMI + DP",
    note: "Setup development lebih praktis dengan HDMI, DisplayPort, tombol Mode/Start/User/Reset, dan LED status.",
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
