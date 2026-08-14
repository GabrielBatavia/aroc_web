# AROC_PL — Advance Robosoccer Polinema

> **Tim Pengembang Robot Humanoid — Politeknik Negeri Malang**

**AROC_PL (Advance Robosoccer Polinema)** adalah tim riset dan pengembangan robotika dari Politeknik Negeri Malang (POLINEMA) yang berfokus pada pengembangan robot humanoid otonom untuk berlaga di Kontes Robot Sepak Bola Indonesia (KRSBI) Humanoid dan ajang kompetisi robotika tingkat nasional maupun internasional.

---

## 📌 Visi & Fokus Riset

AROC_PL mengombinasikan rekayasa mekanik, sistem kontrol terdistribusi, kecerdasan buatan, dan pengolahan citra (*computer vision*) untuk menciptakan robot humanoid yang tangguh, presisi, dan adaptif saat bertanding di lapangan.

### Divisi Utama Tim:
- ⚙️ **Hardware (Mekanik & Elektronika)**: Perancangan kerangka kinetik, sasis, manajemen daya baterai, serta integrasi aktuator servomotor (*DYNAMIXEL*).
- 💻 **Software (Sistem Otonom & Algoritma)**: *Computer vision* untuk deteksi bola dan gawang, estimasi posisi (IMU/Odometri), pemrosesan kinematic walk, serta strategi permainan otonom.

---

## 🚀 Fitur Utama Web Portal (AROC_PL Web)

Web portal ini dirancang sebagai showcase teknologi, platform dokumentasi, dan pusat informasi publik tim AROC_PL:

1. **Interactive 3D Robot Explorer (`/robot-3d`)**
   - Eksplorasi 3D model robot humanoid secara interaktif berbasis Three.js/WebGL.
   - Fitur *hotspot detail* untuk mempelajari komponen utama: *Vision System, Compute Core, DYNAMIXEL Actuators, IMU Sensor, OpenCR Board, dan Power System*.
2. **AROC Lab Arcade (`/lab`)**
   - Halaman eksperimen interaktif dan showcase fitur lab.
3. **News & Updates (`/updates`)**
   - Log kegiatan, pengujian robot di lab, dokumentasi riset, dan *milestone* kompetisi.
4. **Media & Press Kit (`/press`)**
   - Unduh aset merek resmi (logo, identitas visual, foto robot, dan kontak media/kemitraan).
5. **Official Bio Links (`/links` & `/bio`)**
   - Halaman *Link in Bio* terpusat untuk navigasi media sosial (Instagram, TikTok, LinkedIn, YouTube, dan Website).

---

## 🛠️ Spesifikasi Teknologi (Tech Stack)

### Frontend & UI
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router) & [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Tailwind CSS & Custom Design Tokens
- **3D Graphics**: [Three.js](https://threejs.org/) / `@react-three/fiber` & `@react-three/drei`
- **Icons**: Lucide React Icons

### Backend & API
- **API Service**: Node.js Lightweight Micro-service (`aroc-lab-api`)

---

## 💻 Panduan Pengoperasian Lokal

### Prasyarat
- **Node.js**: v18.x atau versi terbaru
- **npm** / **pnpm** / **yarn**

### Langkah Installasi

1. **Clone repository & masuk ke direktori:**
   ```bash
   git clone https://github.com/GabrielBatavia/arocws.git
   cd arocws/web
   ```

2. **Install dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan Development Server:**
   ```bash
   npm run dev
   ```

4. **Buka di browser:**
   Akses `http://localhost:3000` di peramban favorit Anda.

### Perintah Build & Production

```bash
# Build aplikasi untuk produksi
npm run build

# Menjalankan build produksi secara lokal
npm run start

# Linting kode
npm run lint
```

---

## 📞 Kontak & Kemitraan

- **Institusi**: Politeknik Negeri Malang (POLINEMA)
- **Website**: [arocpl.com](https://arocpl.com)
- **Email**: hello@arocpl.com

---

© 2026 **AROC_PL — Advance Robosoccer Polinema**. All Rights Reserved.
