# KiLat

<div align="center">
  <img src="https://img.shields.io/badge/version-2.0.0-blue.svg" alt="Version">
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
| **Kompres PDF** | Optimasi struktur dan metadata PDF |

### 🎵 Ekstraksi Audio
| Fitur | Detail |
|-------|--------|
| **Multi-Format** | WAV · MP3 · AAC · FLAC |
| **Bitrate Control** | 64-320 kbps adjustable |
| **Sample Rate** | 16kHz · 22.05kHz · 44.1kHz · 48kHz |
| **Batch Processing** | Ekstrak audio dari banyak video sekaligus |

---

## 🛡️ Privasi & Keamanan

| Aspek | Detail |
|-------|--------|
| **🌐 100% Lokal** | Tidak ada file yang meninggalkan perangkat Anda |
| **🔒 Zero Upload** | Tidak ada upload ke server manapun |
| **📁 Offline Ready** | Bekerja tanpa koneksi internet setelah dimuat |
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
- **[pdf.js](https://mozilla.github.io/pdf.js/)** — Render PDF ke gambar
- **[JSZip](https://stuk.github.io/jszip/)** — Kompresi batch ke ZIP
- **[UPNG.js](https://github.com/photopea/UPNG.js)** — Kompresi PNG lossless/lossy
- **[Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)** — Ekstraksi & konversi audio
- **[MediaRecorder API](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder)** — Enkoding MP3/AAC

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
