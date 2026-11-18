# KiLat

<div align="center">
  <img src="https://img.shields.io/badge/version-2.3.0-blue.svg" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome">
  <img src="https://img.shields.io/badge/Offline-Ready-FFD700.svg" alt="Offline Ready">
  <img src="https://img.shields.io/badge/100%25-Local Processing-8A2BE2.svg" alt="Local Processing">
</div>

<br>

<div align="center">
  <h1>⚡ KiLat</h1>
  <p><strong>Alat Pemrosesan File Tercepat — Sepenuhnya di Browser Anda</strong></p>
  <p><em>Kompresi Gambar · Manipulasi PDF · Ekstraksi Media · Tanpa Upload ke Server</em></p>
  <br>
  <a href="https://jaiz-lana.github.io/KiLat/" target="_blank">
    <img src="https://img.shields.io/badge/🌐%20Live%20Demo-KiLat.app-FFD700?style=for-the-badge&logo=githubpages&logoColor=white" alt="Live Demo">
  </a>
  <br><br>
</div>

---

## 🚀 Tentang KiLat

**KiLat** adalah aplikasi web pemrosesan file yang **100% berjalan di perangkat Anda** — tidak ada file yang diunggah ke server, tidak ada pelanggaran privasi, dan tidak perlu koneksi internet setelah halaman dimuat.

Bayangkan memiliki studio pemrosesan file lengkap yang berjalan di browser Anda, dengan kecepatan kilat dan keamanan maksimal. Itulah KiLat.

### ✨ Filosofi
> *"Privasi bukanlah fitur — ini adalah hak dasar. Semua file Anda tetap di perangkat Anda, selamanya."*

---

## 🎯 Fitur Unggulan

### 🎓 Zona Mahasiswa & Dokumen Kampus (Baru!)
| Fitur | Detail |
|-------|--------|
| **Ubah Ukuran & Potong Foto** | Preset 2x3, 3x4, 4x6 cm (300 DPI) / kustom, fokus potong, latar, batas KB |
| **Kompres PDF Target Ukuran** | Preset 300KB (SIAKAD), 500KB (Beasiswa/CPNS), 1MB (MSIB), 2MB (Classroom), atau custom |
| **Tanda Tangan Dokumen** | Gambar tanda tangan di layar atau upload PNG untuk ditempel di lembar pengesahan/surat |
| **Nomor Halaman Skripsi** | Format gabungan otomatis: Romawi (`i, ii..`) lembar awal + Angka Arab (`1, 2..`) untuk Bab isi |
| **Watermark Proteksi KTP/KTM** | Cap diagonal / pola berulang anti-pinjol ("HANYA UNTUK PERSYARATAN BEASISWA") + auto tanggal |
| **Scanner Dokumen (Foto HP)** | Filter cerdas Magic B&W & Grayscale untuk membersihkan bayangan kertas foto kamera |
| **OCR Gambar ke Teks** | Ekstrak teks bahasa Indonesia & Inggris 100% lokal via WebAssembly Tesseract.js |

### 📸 Kompresi Gambar
| Fitur | Detail |
|-------|--------|
| **Multi-Format** | JPEG · PNG · WebP |
| **Smart Compression** | Target size otomatis dengan binary search optimization |
| **PNG Lossless/Lossy** | Color quantization (2-256 warna) untuk hasil optimal |
| **Batch Processing** | Proses puluhan gambar sekaligus |
| **Preserve Transparency** | Alpha channel tetap utuh untuk PNG/WebP |

### 📄 Alat PDF Lengkap
| Fitur | Detail |
|-------|--------|
| **Gabungkan PDF** | Satukan banyak PDF jadi satu dengan drag & drop |
| **Pisahkan PDF** | Ekstrak halaman spesifik menjadi file terpisah |
| **Hapus Halaman** | Buang halaman yang tidak diperlukan |
| **Putar PDF** | 90°/180°/270° — semua halaman atau tertentu |
| **Tanda Air** | Text watermark dengan font, ukuran, warna, opacity, rotasi |
| **Nomor Halaman** | Otomatis dengan berbagai format dan posisi |
| **PDF → JPG/PNG** | Render PDF ke gambar dengan DPI hingga 600 |
| **JPG/PNG → PDF** | Buat PDF dari gambar dengan ukuran kertas dan margin |
| **Kunci & Buka Kunci PDF** | Proteksi PDF dengan password & izin dokumen, atau buka kunci PDF terproteksi |
| **DOCX ↔ PDF** | Konversi Word (.docx) ke PDF dan PDF ke Word (.docx) 100% lokal |
| **Kompres PDF** | Mode Ringan (struktur, teks tetap) atau Kuat (render ulang halaman); hasil tidak pernah lebih besar dari aslinya |

### 🎵 Ekstraksi Audio
| Fitur | Detail |
|-------|--------|
| **Multi-Format** | WAV · M4A/AAC · WebM/Opus (sesuai dukungan browser; ekstensi selalu sesuai isi file) |
| **Bitrate Control** | 64-320 kbps adjustable |
| **Sample Rate** | 16kHz · 22.05kHz · 44.1kHz · 48kHz |
| **Batch Processing** | Ekstrak audio dari banyak video sekaligus |

---

## 🛡️ Privasi & Keamanan

| Aspek | Detail |
|-------|--------|
| **🌐 100% Lokal** | Tidak ada file yang meninggalkan perangkat Anda |
| **🔒 Zero Upload** | Tidak ada upload ke server manapun |
| **📁 Offline Ready (PWA)** | Semua library dibundel di folder `vendor/` + service worker. Bisa di-install & dipakai tanpa internet setelah kunjungan pertama (OCR butuh internet sekali untuk mengunduh data bahasa; font Google bersifat opsional) |
| **🧹 Auto Cleanup** | File sementara dihapus setelah proses selesai |
| **🔐 Encrypted** | Semua proses di dalam sandbox browser Anda |

---

## 🖥️ Demo Langsung

**[➡️ Coba KiLat Sekarang](https://jaiz-lana.github.io/KiLat/)**

---

## 🛠️ Teknologi yang Digunakan

<div align="center">
  <table>
    <tr>
      <td align="center"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="40" height="40"/><br><b>JavaScript</b></td>
      <td align="center"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="40" height="40"/><br><b>HTML5</b></td>
      <td align="center"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="40" height="40"/><br><b>CSS3</b></td>
      <td align="center"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" width="40" height="40"/><br><b>TailwindCSS</b></td>
    </tr>
  </table>
</div>

### Library & API
- **[pdf-lib](https://pdf-lib.js.org/)** — Manipulasi PDF lengkap
- **[pdf.js](https://mozilla.github.io/pdf.js/)** — Render PDF ke gambar & kompresi target
- **[Tesseract.js](https://tesseract.projectnaptha.com/)** — Optical Character Recognition (OCR) 100% lokal di browser
- **[JSZip](https://stuk.github.io/jszip/)** — Kompresi batch ke ZIP
- **[UPNG.js](https://github.com/photopea/UPNG.js)** — Kompresi PNG lossless/lossy
- **[Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)** — Ekstraksi & konversi audio
- **[MediaRecorder API](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder)** — Enkoding M4A/WebM

---

## 📦 Instalasi Lokal

```bash
# Clone repository
git clone https://github.com/jaiz-lana/KiLat.git

# Masuk ke direktori
cd KiLat

# Buka di browser
open index.html
# atau
start index.html  # Windows


---

## 🆕 Changelog v2.1.0

**Perbaikan**
- Kompres PNG: `pako` dimuat sehingga `UPNG` berfungsi.
- Kompres PDF (Alat PDF) kini memakai mesin PDF, bukan kompresor gambar; ada mode Ringan/Kuat.
- OCR: hasil tampil di kotak teks dengan tombol Salin & Unduh `.txt`; mendukung PDF multi-halaman; error jelas.
- Kompres PDF Target Ukuran: validasi target (min 20 KB), PDF rusak/password tidak lagi macet (timeout + pesan), hasil tidak pernah lebih besar dari file asli, beberapa percobaan otomatis menuju target.
- State alat direset saat berpindah alat/tombol "Kembali" (memperbaiki crash `classList of null`).
- Menu mobile tertutup secara default.
- Toast tidak lagi menampilkan "Selesai" bersamaan dengan error atau ganda.
- Validasi: Hapus Halaman tidak boleh menghapus semua halaman, Gabungkan PDF butuh ≥ 2 file, tanda tangan kosong ditolak.
- Ekstrak Audio: hanya menawarkan format yang benar-benar dihasilkan; ekstensi mengikuti isi file.
- Aksesibilitas: satu `<h1>`, `aria-label` pada tombol ikon, toast `role=status/alert`, dialog hasil dengan fokus & Esc; typo "Potrait" → "Potret".
- URL per alat (`#/merge`, `#/ocr_tool`, dst.) dan tombol Back browser.

**Baru**
- PWA offline sungguhan: `manifest.webmanifest`, `sw.js`, library & Tailwind dibundel lokal (`vendor/`).
- Pratinjau hasil (PDF/gambar/audio) + perbandingan ukuran sebelum unduh.
- Thumbnail halaman klik-untuk-pilih pada Hapus & Putar PDF.
- Scanner Dokumen: slider kontras & ambang putih kertas.
- Alat baru: Ubah Ukuran & Potong Foto (2x3 / 3x4 / 4x6).


## 🔧 Membangun ulang CSS
Tailwind dibangun lokal: dari folder `tools/` jalankan  
`npx tailwindcss@3 -c tailwind.config.js -i tailwind.input.css -o ../vendor/tailwind.css --minify` (butuh plugin `@tailwindcss/forms`, `typography`, `aspect-ratio`).


---

## 🆕 Changelog v2.2.0

- **Kunci & Buka Kunci PDF (`pdf_lock`, `pdf_unlock`):** Enkripsi PDF dengan password serta pengaturan izin cetak/salin/modifikasi, dan dekripsi PDF berpassword menggunakan `@cantoo/pdf-lib` lokal.
- **DOCX ↔ PDF (`docx2pdf`, `pdf2docx`):** Konversi `.docx` ke PDF (via `mammoth` + `html2canvas` + `jsPDF`) dan PDF ke `.docx` yang dapat diedit (via `pdf.js` + `docx`), lengkap dengan fallback gambar untuk halaman hasil scan.
- **Drag & Drop Tanda Tangan:** Pratinjau interaktif halaman PDF dengan kotak tanda tangan yang dapat digeser dan diubah ukurannya (mouse & sentuh).
- **Pemrosesan Batch Penuh:** Seluruh alat kini mendukung unggah banyak file sekaligus (`multiple: true`) dengan unduhan arsip ZIP otomatis untuk hasil jamak.


---

## 🆕 Changelog v2.3.0

- **Hapus Tema Gelap:** Menghapus mode gelap dan pengalih tema di pengaturan; antarmuka kini memakai satu tema terang yang konsisten.
- **Palet Warna Humanis:** Latar hangat alabaster (`#f6f7f2`), sidebar sage lembut (`#eef2ea`), border batu hangat (`#dfe4d8`), dan aksen hijau hutan organik (`#15803d`) dengan kontras teks tinggi.
- **Optimalisasi Tampilan Mobile:** Memperbaiki ukuran target sentuh (`44×44 px` pada layar sentuh), dukungan `safe-area-inset-*` dan `100dvh`/`100svh`, tipografi `clamp()` & `text-wrap: balance/pretty`, header mobile dengan branding, serta tombol aksi responsif penuh.

---

## 💖 Dukung Proyek Ini

Jika **KiLat** bermanfaat bagi Anda, dukungan Anda melalui **Saweria** akan sangat membantu pengembangan dan pemeliharaan proyek ini:

[![Dukung via Saweria](https://img.shields.io/badge/💖%20Dukung%20via-Saweria-FAAD14?style=for-the-badge)](https://saweria.co/jaizlana)
