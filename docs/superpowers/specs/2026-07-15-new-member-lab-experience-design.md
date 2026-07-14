# Desain AROC Lab untuk Anggota Baru

## Tujuan

Ubah halaman Lab dari tiga panel simulator yang terpisah menjadi materi onboarding berbahasa Indonesia. Siswa baru harus dapat belajar perlahan: memahami konsep, melihat ilustrasi atau animasi yang relevan, mencoba satu perubahan, lalu membaca alasan hasilnya.

## Batasan

- Tiga divisi tetap berbeda: Image Processing, Communication, dan Maneuvering.
- Simulator yang ada tetap dipakai; tidak ada penghapusan API gait atau kontrol lanjutan.
- Konten mengacu pada source robot di `src_new/src`; tidak menyatakan model browser sebagai kontrol fisik robot.
- Animasi menggambarkan state dan aliran yang bermakna, bukan log atau paket acak.
- Seluruh materi baru memakai Bahasa Indonesia yang sederhana dan menghindari copy promosi.

## Struktur halaman

1. **Pengantar Lab** menjelaskan tujuan pembelajaran dan urutan belajar dalam satu kalimat yang jelas.
2. **Peta tiga divisi** memperlihatkan fokus, target belajar, dan hubungan masing-masing divisi tanpa mencampur materinya.
3. **Panel materi aktif** berisi:
   - tujuan belajar;
   - uraian konsep dalam beberapa langkah;
   - istilah/source signal yang sedang dibahas;
   - percobaan singkat yang perlu dilakukan;
   - kesimpulan setelah percobaan.
4. **Simulator aktif** berada setelah materi agar siswa melihat sebab-akibat sebelum daftar slider.
5. **Kontrol lanjutan** tetap tersedia dalam simulator setelah materi dasar.

## Materi per divisi

### Image Processing

- Kamera memberi frame lapangan kepada detector.
- Detector mengirim pusat dan radius bola melalui `CircleSet` ketika hasil valid.
- Localizer mengubah hasil menjadi `/ball_polar` (jarak dan arah relatif).
- Nilai konfigurasi source yang dicontohkan: `confidence_threshold` 0.15, ukuran input 320, dan `frame_skip` 2.
- Animasi: garis scan hanya muncul ketika pencarian berlangsung; bounding box dan ray menuju posisi bola hanya muncul pada hasil valid.

### Communication

- `/ball_polar` masuk ke soccer bridge untuk memilih jalan, putar, berhenti, atau meminta kick.
- KickGate dapat menahan kick saat observasi gawang atau alignment belum memenuhi syarat.
- Animasi: token pesan berjalan per langkah melalui `ball_polar → bridge → KickGate → OP3`; token berhenti ketika gate menahan tindakan.
- Log sistem dibuat deterministik dari state skenario dan tidak terus berubah secara acak.

### Maneuvering

- Walking menggunakan parameter periode, tinggi kaki, amplitudo gerak, dan balance feedback.
- Stabilitas diperlihatkan sebagai pusat massa di dalam atau di luar area tumpuan, bukan robot kotak generik.
- Animasi: fase langkah menggerakkan kaki tumpuan, support polygon, dan penanda pusat massa dari hasil simulasi gait.
- Backend gait tetap menjadi sumber evaluasi deterministik, bukan sumber frame animasi.

## Interaksi dan aksesibilitas

- Materi memiliki langkah bernomor dan tombol kembali/lanjut untuk membatasi beban informasi.
- Setiap simulator menampilkan target percobaan yang jelas serta kesimpulan yang berubah berdasarkan state.
- Gerakan berhenti ketika panel tidak aktif dan menghormati `prefers-reduced-motion`.
- Animasi tidak menjadi satu-satunya pembawa informasi: state dan hasil tersedia sebagai teks.
- Log tidak menggunakan pembaruan `aria-live` yang terus-menerus.

## Pengujian

- Lint dan build Next.js harus lulus.
- Backend gait tests/typecheck tetap lulus.
- Uji desktop dan ponsel untuk navigasi tiga divisi, langkah materi, slider, preset, state gagal, dan reduced motion.
- Verifikasi visual `/lab`: tidak ada ruang grid kosong, copy tetap terbaca, dan animasi tidak acak.
