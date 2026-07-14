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

export type LearningStep = {
  title: string;
  body: string;
  source: string;
};

export type LearningPath = {
  goal: string;
  overview: string;
  experiment: string;
  conclusion: string;
  steps: LearningStep[];
};

export const labSimulators: SimulatorMeta[] = [
  {
    id: "image-processing",
    index: "01",
    title: "Mengenali dan Menentukan Posisi Bola",
    tagline: "Pelajari bagaimana gambar kamera berubah menjadi jarak dan arah bola dari robot.",
    division: "Image Processing",
    color: "#8fa7ff",
    colorRgb: "143, 167, 255",
  },
  {
    id: "communication",
    index: "02",
    title: "Membaca Pesan dan Memilih Tindakan",
    tagline: "Ikuti pesan dari localizer sampai bridge dan KickGate memilih tindakan yang aman.",
    division: "Communication",
    color: "#ffe45c",
    colorRgb: "255, 228, 92",
  },
  {
    id: "maneuvering",
    index: "03",
    title: "Berjalan dan Menjaga Keseimbangan",
    tagline: "Amati fase langkah, area tumpuan, dan pengaruh parameter gait terhadap stabilitas.",
    division: "Maneuvering",
    color: "#82dbb2",
    colorRgb: "130, 219, 178",
  },
];

export const labLearningPaths: Record<SimulatorId, LearningPath> = {
  "image-processing": {
    goal: "Memahami bagaimana robot mengenali bola dan memperkirakan posisinya.",
    overview:
      "Sistem vision tidak langsung memberi perintah gerak. Sistem ini mengubah gambar kamera menjadi data yang dapat dibaca oleh bagian robot lain.",
    experiment:
      "Mulai dari preset Konfigurasi Source. Naikkan confidence sampai bola tidak lagi terdeteksi, lalu baca perubahan status detector dan localizer.",
    conclusion:
      "Deteksi yang terlihat di layar belum cukup. Hanya hasil dengan ukuran dan keyakinan yang valid yang dapat diteruskan menjadi posisi bola.",
    steps: [
      {
        title: "Kamera memberi gambar",
        body: "Setiap frame berisi lapangan, bola, dan gangguan visual. Detector menerima frame ini sebagai masukan; ia belum mengetahui jarak bola pada tahap ini.",
        source: "Input source: detector memakai input_size 320×320 dan memproses setiap 2 frame pada konfigurasi saat ini.",
      },
      {
        title: "Detector mencari bola",
        body: "Model memeriksa gambar lalu mengirim pusat dan radius bola ketika confidence melewati ambang. Kotak deteksi pada ilustrasi hanya muncul jika hasil tersebut dipakai.",
        source: "Output source: /ball_detector_node/circle_set berisi posisi tengah dan radius hasil deteksi.",
      },
      {
        title: "Localizer menghitung jarak dan arah",
        body: "Localizer memvalidasi ukuran bola dan mengubah hasil deteksi menjadi range serta bearing. Jika hasil tidak valid, pesan posisi tidak boleh diteruskan.",
        source: "Output source: /ball_polar menyimpan range dalam meter dan bearing dalam radian.",
      },
    ],
  },
  communication: {
    goal: "Memahami bagaimana pesan posisi bola diubah menjadi keputusan robot.",
    overview:
      "Communication menghubungkan hasil vision dengan tindakan robot. Aturan yang sederhana tetap harus menangani bola hilang, arah yang salah, dan kondisi kick yang belum aman.",
    experiment:
      "Gunakan preset Bola Dekat, Gawang Belum Tengah. Tekan Lanjutkan Jejak untuk melihat KickGate menahan kick, lalu pusatkan nilai goal_x.",
    conclusion:
      "Keputusan kick bukan hanya karena bola dekat. Sistem masih memeriksa arah bola, data yang segar, dan alignment gawang sebelum meneruskan aksi.",
    steps: [
      {
        title: "Bridge membaca posisi bola",
        body: "Bridge menerima range dan bearing dari /ball_polar. Berdasarkan nilai ini bridge memilih berjalan maju, berputar, berhenti, atau meminta aksi kick.",
        source: "Aturan source memakai batas range dan bearing untuk memilih walking, turn, stop, atau action page.",
      },
      {
        title: "KickGate dapat menahan perintah",
        body: "Saat bridge meminta kick, KickGate dapat menyimpannya terlebih dahulu. Gate membaca observasi gawang dan memberi micro-turn ketika target belum cukup tengah.",
        source: "Alur demo meremap keluaran bridge ke topik raw sebelum KickGate meneruskan perintah ke /robotis.",
      },
      {
        title: "Robot menerima tindakan yang sudah diperiksa",
        body: "Perintah baru diteruskan ke OP3 setelah syarat terpenuhi atau mekanisme timeout berlaku. Jejak pesan membantu siswa melihat alasan tindakan tersebut terjadi.",
        source: "Status yang dijelaskan: walk, turn, kick ditahan, kick dilepas, menunggu data, dan stop.",
      },
    ],
  },
  maneuvering: {
    goal: "Memahami mengapa robot perlu mengatur langkah dan keseimbangan secara bersamaan.",
    overview:
      "Walking adalah siklus gerak. Kaki bergantian menumpu, tubuh berpindah, dan feedback keseimbangan membantu robot tetap berada pada area yang aman.",
    experiment:
      "Pilih preset Langkah Aman. Ubah satu parameter saja—misalnya tinggi kaki atau lateral offset—kemudian lihat perubahan skor dan posisi pusat massa.",
    conclusion:
      "Parameter gait harus dibaca sebagai satu sistem. Langkah yang lebih besar atau lebih cepat dapat mengurangi margin stabilitas jika tumpuan dan feedback tidak cukup.",
    steps: [
      {
        title: "Kaki bergantian menjadi tumpuan",
        body: "Dalam satu siklus, satu kaki menahan beban sementara kaki lain bergerak. Area tumpuan berubah saat fase langkah berpindah.",
        source: "Walking source memakai period_time, x_move_amplitude, dan z_move_amplitude untuk membentuk siklus langkah.",
      },
      {
        title: "Pusat massa harus berada pada area aman",
        body: "Ilustrasi top-down menunjukkan titik pusat massa relatif terhadap support polygon. Ketika titik ini bergerak terlalu jauh, risiko goyah bertambah.",
        source: "Simulator gait menilai margin stabilitas pada beberapa fase walking cycle.",
      },
      {
        title: "Feedback membantu koreksi gerak",
        body: "Data gyro dan gain keseimbangan membantu mengoreksi beberapa sendi. Slider sederhana adalah model pembelajaran; source sebenarnya memiliki gain terpisah untuk beberapa bagian kaki.",
        source: "Balance control source menerapkan gain pada hip, knee, dan ankle feedback.",
      },
    ],
  },
};

export const labHeroStats = [
  { label: "Divisi", value: "3" },
  { label: "Urutan belajar", value: "3 langkah" },
  { label: "Simulator", value: "Interaktif" },
];
