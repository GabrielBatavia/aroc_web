export type LabDivisionId = "maneuvering" | "image-processing" | "communication";

export type LabModule = {
  id: string;
  title: string;
  level: "Foundation" | "Tools" | "Practice" | "Match Ready";
  duration: string;
  description: string;
  content?: Array<{
    heading: string;
    body: string[];
  }>;
  interactive?: LabInteractive[];
  outcomes: string[];
};

export type LabInteractiveCheck = {
  label: string;
  pattern: string;
  hint: string;
};

export type LabInteractive = {
  id: string;
  type: "ros2-code-checker" | "vision-playground";
  title: string;
  prompt: string;
  starterCode?: string;
  checks?: LabInteractiveCheck[];
  successMessage?: string;
  failureMessage?: string;
};

export type LabMiniLab = {
  title: string;
  prompt: string;
  options: Array<{
    label: string;
    result: string;
    correct: boolean;
  }>;
};

export type LabSkill = {
  label: string;
  mastery: number;
  note: string;
};

export type LabDivision = {
  id: LabDivisionId;
  title: string;
  shortTitle: string;
  eyebrow: string;
  description: string;
  focus: string[];
  accent: string;
  accentRgb: string;
  icon: "bolt" | "eye" | "radio";
  modules: LabModule[];
  miniLab: LabMiniLab;
  skills: LabSkill[];
  resources: string[];
};

export const labHeroStats = [
  { label: "Divisi", value: "3" },
  { label: "Modul awal", value: "12" },
  { label: "Mode", value: "Local" },
];

export const labDivisions: LabDivision[] = [
  {
    id: "maneuvering",
    title: "Maneuvering Lab",
    shortTitle: "Maneuvering",
    eyebrow: "Motion, power, and frame",
    description:
      "Jalur latihan untuk memahami fisik robot, kelistrikan, aktuator, power safety, dan proses testing gerak humanoid.",
    focus: ["Fisik robot", "Kelistrikan", "Aktuator", "Power safety"],
    accent: "#ffe45c",
    accentRgb: "255, 228, 92",
    icon: "bolt",
    modules: [
      {
        id: "maneuvering-foundation",
        title: "Anatomi Humanoid",
        level: "Foundation",
        duration: "35 min",
        description:
          "Membaca struktur robot dari frame, joint, bracket, servo, kabel, sampai titik rawan saat robot jatuh.",
        outcomes: ["Paham bagian robot", "Tahu area kritis", "Bisa inspeksi visual"],
      },
      {
        id: "maneuvering-power",
        title: "Power System Check",
        level: "Tools",
        duration: "45 min",
        description:
          "Latihan membaca alur daya, konektor, baterai, regulator, dan tanda awal masalah kelistrikan.",
        outcomes: ["Checklist power", "Basic multimeter", "Safe startup"],
      },
      {
        id: "maneuvering-servo",
        title: "Servo Response Drill",
        level: "Practice",
        duration: "55 min",
        description:
          "Menguji respon aktuator, mengenali gejala overheat, backlash, kabel longgar, dan ID servo bermasalah.",
        outcomes: ["Debug servo", "Catat gejala", "Isolasi kerusakan"],
      },
      {
        id: "maneuvering-match",
        title: "Pre-Match Inspection",
        level: "Match Ready",
        duration: "30 min",
        description:
          "Simulasi inspeksi sebelum robot masuk lapangan agar hardware siap jalan dan aman disentuh operator.",
        outcomes: ["SOP singkat", "Risk flag", "Robot ready state"],
      },
    ],
    miniLab: {
      title: "Wiring Fault Drill",
      prompt:
        "Robot menyala, tetapi satu kaki tidak merespon saat motion test. Langkah pertama yang paling aman?",
      options: [
        {
          label: "Naikkan power lalu ulang motion test",
          result:
            "Terlalu berisiko. Jika penyebabnya kabel/servo, power lebih tinggi bisa memperparah kerusakan.",
          correct: false,
        },
        {
          label: "Matikan robot, cek konektor dan jalur kabel kaki",
          result:
            "Benar. Mulai dari isolasi aman: power off, inspeksi konektor, jalur kabel, lalu lanjut cek ID/servo.",
          correct: true,
        },
        {
          label: "Langsung bongkar semua servo kaki",
          result:
            "Belum efisien. Bongkar total dilakukan setelah pemeriksaan konektor dan diagnosis dasar.",
          correct: false,
        },
      ],
    },
    skills: [
      { label: "Mechanical inspection", mastery: 74, note: "Frame, bracket, joint, dan baut kritis." },
      { label: "Power tracing", mastery: 66, note: "Baterai, regulator, konektor, dan safety." },
      { label: "Actuator diagnosis", mastery: 58, note: "Gejala servo, ID, suhu, dan respon." },
    ],
    resources: ["Pre-match hardware checklist", "Servo ID map", "Power rail notes", "Fall recovery log"],
  },
  {
    id: "image-processing",
    title: "Image Processing Lab",
    shortTitle: "Image Processing",
    eyebrow: "Vision pipeline and perception",
    description:
      "Jalur latihan computer vision untuk robot: kamera, kalibrasi, threshold, deteksi bola/lapangan, dan evaluasi hasil persepsi.",
    focus: ["Computer vision", "Kalibrasi kamera", "OpenCV", "Deteksi objek"],
    accent: "#7b93e8",
    accentRgb: "123, 147, 232",
    icon: "eye",
    modules: [
      {
        id: "vision-foundation",
        title: "Camera to Frame",
        level: "Foundation",
        duration: "40 min",
        description:
          "Memahami alur gambar dari kamera ke frame processing, resolusi, exposure, noise, dan latency.",
        outcomes: ["Paham frame", "Baca latency", "Cek kualitas input"],
      },
      {
        id: "vision-calibration",
        title: "Calibration Bench",
        level: "Tools",
        duration: "50 min",
        description:
          "Latihan tuning parameter kamera dan warna agar pipeline tetap stabil di kondisi cahaya berbeda.",
        outcomes: ["Tuning parameter", "Validasi cahaya", "Save config"],
      },
      {
        id: "vision-threshold",
        title: "Ball Detection Practice",
        level: "Practice",
        duration: "60 min",
        description:
          "Membaca mask, contour, area, dan false positive saat robot mencari bola di lapangan.",
        interactive: [
          {
            id: "vision-detector-code-check",
            type: "ros2-code-checker",
            title: "Cek ide node detector ROS2",
            prompt:
              "Tulis potongan Python/ROS2 yang membaca CircleSetStamped, memilih bola terbesar dari radius, mengecek threshold, lalu publish status OK atau NO_BALL.",
            starterCode: `import rclpy
from rclpy.node import Node
from std_msgs.msg import String
from op3_ball_detector_msgs.msg import CircleSetStamped

class BallFilter(Node):
    def __init__(self):
        super().__init__("ball_filter")
        # TODO: subscribe /ball_detector_node/circle_set
        # TODO: publish /ball_localizer/status

    def on_circles(self, msg):
        # TODO: pilih circle dengan radius terbesar
        pass`,
            checks: [
              {
                label: "Import rclpy dan Node",
                pattern: "import\\s+rclpy[\\s\\S]*from\\s+rclpy\\.node\\s+import\\s+Node",
                hint: "Mulai node ROS2 Python dengan import rclpy dan Node.",
              },
              {
                label: "Class mewarisi Node",
                pattern: "class\\s+\\w+\\(Node\\)",
                hint: "Buat class seperti class BallFilter(Node).",
              },
              {
                label: "Subscribe CircleSetStamped",
                pattern: "create_subscription\\([\\s\\S]*CircleSetStamped[\\s\\S]*/ball_detector_node/circle_set",
                hint: "Gunakan create_subscription ke /ball_detector_node/circle_set.",
              },
              {
                label: "Publish status localizer",
                pattern: "create_publisher\\([\\s\\S]*String[\\s\\S]*/ball_localizer/status",
                hint: "Buat publisher String untuk /ball_localizer/status.",
              },
              {
                label: "Pilih radius terbesar",
                pattern: "max\\([\\s\\S]*msg\\.circles[\\s\\S]*key[\\s\\S]*(z|radius)",
                hint: "Pakai max(msg.circles, key=lambda c: c.z) untuk memilih kandidat paling kuat.",
              },
              {
                label: "Handle kondisi bola tidak ada",
                pattern: "(NO_BALL|not\\s+msg\\.circles|len\\(msg\\.circles\\)\\s*==\\s*0)",
                hint: "Jangan proses circle kosong. Publish/return status NO_BALL.",
              },
            ],
            successMessage: "Pipeline dasar detector sudah aman: input, filter, dan status tersedia.",
            failureMessage: "Lengkapi struktur node, topic, dan safety handling sebelum dipakai sebagai referensi.",
          },
          {
            id: "vision-threshold-playground",
            type: "vision-playground",
            title: "Playground threshold bola",
            prompt:
              "Atur threshold sampai bola terdeteksi tanpa terlalu banyak noise. Ini simulasi browser untuk memahami efek hue, saturation, value, dan radius minimum.",
          },
        ],
        outcomes: ["Baca mask", "Filter contour", "Kurangi false positive"],
      },
      {
        id: "vision-match",
        title: "Field Scenario Review",
        level: "Match Ready",
        duration: "35 min",
        description:
          "Review skenario pertandingan: bola tertutup kaki, garis terlalu terang, kamera blur, dan keputusan fallback.",
        outcomes: ["Scenario log", "Fallback decision", "Match review"],
      },
    ],
    miniLab: {
      title: "Threshold Simulator",
      prompt:
        "Mask bola banyak noise kecil, tetapi bola asli tetap terlihat. Parameter mana yang paling masuk akal dinaikkan dulu?",
      options: [
        {
          label: "Minimum contour area",
          result:
            "Benar. Noise kecil bisa difilter dengan menaikkan batas area sebelum mengubah warna utama.",
          correct: true,
        },
        {
          label: "Camera brightness sampai maksimum",
          result:
            "Kurang tepat. Brightness maksimum bisa membuat warna lapangan dan bola makin sulit dipisahkan.",
          correct: false,
        },
        {
          label: "Matikan semua filter warna",
          result:
            "Tidak tepat. Filter warna adalah fondasi segmentasi, sebaiknya disetel bukan dimatikan.",
          correct: false,
        },
      ],
    },
    skills: [
      { label: "Camera calibration", mastery: 70, note: "Exposure, white balance, dan resolusi." },
      { label: "Segmentation logic", mastery: 62, note: "HSV, mask, contour, dan filtering." },
      { label: "Match perception", mastery: 56, note: "False positive, occlusion, dan fallback." },
    ],
    resources: ["OpenCV snippet bank", "Camera config sheet", "Dataset review notes", "Vision failure log"],
  },
  {
    id: "communication",
    title: "Communication Lab",
    shortTitle: "Communication",
    eyebrow: "Hardware interface and robot code",
    description:
      "Jalur latihan integrasi hardware dan code robot: protocol, serial, embedded flow, command handling, dan debugging antar sistem.",
    focus: ["Hardware interface", "Protocol", "Embedded code", "Debugging"],
    accent: "#c8ccd8",
    accentRgb: "200, 204, 216",
    icon: "radio",
    modules: [
      {
        id: "communication-foundation",
        title: "Signal Flow Map",
        level: "Foundation",
        duration: "35 min",
        description:
          "Membaca jalur data robot dari controller, sensor, aktuator, compute board, sampai command yang dijalankan.",
        outcomes: ["Paham signal flow", "Baca koneksi", "Pisahkan data dan power"],
      },
      {
        id: "communication-serial",
        title: "Serial Debug Console",
        level: "Tools",
        duration: "45 min",
        description:
          "Latihan membaca log serial, baud rate, packet sederhana, timeout, dan pesan error hardware.",
        outcomes: ["Baca log", "Cek baud rate", "Kenali timeout"],
      },
      {
        id: "communication-code",
        title: "Robot Code Path",
        level: "Practice",
        duration: "60 min",
        description:
          "Menelusuri alur code dari input sensor ke command gerak agar debugging tidak loncat-loncat.",
        interactive: [
          {
            id: "communication-bridge-code-check",
            type: "ros2-code-checker",
            title: "Cek ide bridge soccer ROS2",
            prompt:
              "Tulis potongan Python/ROS2 untuk bridge yang membaca /ball_polar dan /ball_localizer/status, lalu publish walking start/stop atau action page kick/turn dengan safety timeout.",
            starterCode: `import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Point
from std_msgs.msg import Int32, String

class SoccerBridge(Node):
    def __init__(self):
        super().__init__("soccer_bridge")
        self.kick_range_m = 0.23
        self.kick_bearing_rad = 0.20
        # TODO: subscribe /ball_polar dan /ball_localizer/status
        # TODO: publish /robotis/walking/command dan /robotis/action/page_num

    def on_ball(self, msg):
        range_m = msg.x
        bearing = msg.y
        # TODO: buat logic kick, turn, forward, stop
        pass`,
            checks: [
              {
                label: "Import ROS2 dan message utama",
                pattern: "import\\s+rclpy[\\s\\S]*from\\s+rclpy\\.node\\s+import\\s+Node[\\s\\S]*Point[\\s\\S]*Int32[\\s\\S]*String",
                hint: "Bridge perlu rclpy, Node, Point, Int32, dan String.",
              },
              {
                label: "Subscribe posisi bola polar",
                pattern: "create_subscription\\([\\s\\S]*Point[\\s\\S]*/ball_polar",
                hint: "Input utama bridge adalah /ball_polar bertipe geometry_msgs/Point.",
              },
              {
                label: "Subscribe status localizer",
                pattern: "create_subscription\\([\\s\\S]*String[\\s\\S]*/ball_localizer/status",
                hint: "Status seperti NO_BALL dan TF_FAIL harus dibaca dari /ball_localizer/status.",
              },
              {
                label: "Publish walking command",
                pattern: "create_publisher\\([\\s\\S]*String[\\s\\S]*/robotis/walking/command",
                hint: "Gunakan /robotis/walking/command untuk start/stop walking.",
              },
              {
                label: "Publish action page",
                pattern: "create_publisher\\([\\s\\S]*Int32[\\s\\S]*/robotis/action/page_num",
                hint: "Gunakan /robotis/action/page_num untuk kick atau turn action.",
              },
              {
                label: "Cek range dan bearing sebelum kick",
                pattern: "(range_m|msg\\.x|r)\\s*<[^\\n]+kick[\\s\\S]*abs\\((bearing|msg\\.y|brg)",
                hint: "Kick harus mengecek jarak dan arah, bukan hanya melihat bola ada.",
              },
              {
                label: "Handle lost/no ball dengan stop",
                pattern: "(NO_BALL|TF_FAIL|lost_timeout|lost_timeout_sec)[\\s\\S]*(stop|\\\"stop\\\"|'stop')",
                hint: "Saat bola hilang atau status error terlalu lama, publish stop.",
              },
              {
                label: "Ada cooldown atau rate limiting",
                pattern: "(cooldown|last_action_time|get_clock\\(\\)\\.now|nanoseconds)",
                hint: "Tambahkan cooldown agar robot tidak spam action page.",
              },
            ],
            successMessage: "Bridge logic sudah mencakup input, output, keputusan, dan safety stop.",
            failureMessage: "Masih ada bagian penting bridge yang belum aman untuk skenario robot bergerak.",
          },
        ],
        outcomes: ["Trace function", "Baca state", "Isolasi bug"],
      },
      {
        id: "communication-match",
        title: "Integration Drill",
        level: "Match Ready",
        duration: "40 min",
        description:
          "Simulasi integrasi sebelum match: device tidak terbaca, command delay, packet hilang, dan recovery cepat.",
        outcomes: ["Integration checklist", "Recovery step", "Match-safe log"],
      },
    ],
    miniLab: {
      title: "Protocol Debug Quiz",
      prompt:
        "Controller mengirim command, tetapi robot delay dan log menunjukkan timeout acak. Diagnosis awal terbaik?",
      options: [
        {
          label: "Cek baud rate, kabel data, dan timestamp packet",
          result:
            "Benar. Timeout acak biasanya perlu dicek dari physical link, konfigurasi serial, lalu timing packet.",
          correct: true,
        },
        {
          label: "Hapus semua log agar program lebih ringan",
          result:
            "Kurang tepat. Log justru dibutuhkan untuk melihat pola timeout dan titik failure.",
          correct: false,
        },
        {
          label: "Ganti seluruh architecture code",
          result:
            "Terlalu jauh. Mulai dari diagnosis link dan timing sebelum refactor besar.",
          correct: false,
        },
      ],
    },
    skills: [
      { label: "Interface mapping", mastery: 68, note: "Port, pin, protocol, dan dependency." },
      { label: "Log-driven debugging", mastery: 64, note: "Timestamp, timeout, dan packet trace." },
      { label: "Robot code flow", mastery: 60, note: "State, command, callback, dan recovery." },
    ],
    resources: ["Serial debug commands", "Protocol packet notes", "Robot code map", "Integration checklist"],
  },
];
