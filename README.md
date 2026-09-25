# ☁️ AeroAtmosphere OS (Titan #24)
### Frutiger Aero Ambient Air Quality Index (AQI) SCADA & ISPU Advisory System

[![Next.js](https://img.shields.io/badge/Next.js-16_App_Router-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict_Mode-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4_Frutiger_Aero-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Standard](https://img.shields.io/badge/Standar-Permen_LHK_No._14%2F2020-emerald)](https://menlhk.go.id/)
[![Live Demo](https://img.shields.io/badge/Deploy-GitHub_Pages-brightgreen?style=flat)](https://olyxmintabansos-byte.github.io/aeroatmos-os/)

---

## ⚡ Overview

**AeroAtmosphere OS** adalah sistem telemetri pemantau kualitas udara ambien (ISPU) real-time yang menghubungkan 5 stasiun di Jabodetabek dengan filosofi visual **#5 Glassmorphism + #23 Aurora Gradient Mesh (Frutiger Aero 2000s Tech Optimism)**:
- **Translucent Frosted Glass:** Panel tembus pandang ber-`backdrop-blur-xl` dengan border kilau halus.
- **Vibrant Sky Aurora Palette:** Gradasi cyan, langit cerah, dan teal alami.
- **60 FPS Gaussian Plume Canvas:** Simulator sebaran asap cerobong industri berstandar Pasquill-Gifford.

---

## 🚀 4 Rute Produksi Live

1. **[Ambient AQI SCADA Deck (`/`)](https://olyxmintabansos-byte.github.io/aeroatmos-os/)**:
   - Telemetri 5 stasiun SPKU (Bundaran HI, Kelapa Gading, GBK Senayan, Kebon Jeruk, Lubang Buaya).
   - ISPU Circular Gauge, 6 parameter polutan (PM2.5, PM10, CO, NO2, SO2, O3).
2. **[BAM-1020 Sensor Calibration (`/sensor/`)](https://olyxmintabansos-byte.github.io/aeroatmos-os/sensor/)**:
   - Diagnostik alat ukur partikulat Beta Attenuation Monitor dan laser spektrometri.
3. **[Gaussian Plume Air Dispersion Studio (`/dispersion/`)](https://olyxmintabansos-byte.github.io/aeroatmos-os/dispersion/)**:
   - Simulator dispersi asap cerobong industri 60 FPS dengan slider tinggi stack dan kecepatan angin.
4. **[Official KLHK ISPU Stamped A4 Studio (`/ispu/`)](https://olyxmintabansos-byte.github.io/aeroatmos-os/ispu/)**:
   - Format cetak A4 Berita Acara Status ISPU resmi Kementerian Lingkungan Hidup dan Kehutanan RI dengan stempel biru basah.

---

## 🛠 Tech Stack

- **Next.js 16** (App Router, Static Export)
- **TypeScript** (Strict Mode)
- **Tailwind CSS v4** (Frutiger Aero Custom Utilities)
- **Lucide React** (Icon Library)
- **Canvas Confetti** (Celebration Effects)

---

## 📦 Installation & Development

```bash
# Clone the repository
git clone https://github.com/olyxmintabansos-byte/aeroatmos-os.git
cd aeroatmos-os

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npx gh-pages -d out -b gh-pages --dotfiles
```

---

## 📄 License

MIT License - © 2026 Sovereign Fleet Olyxmintabansos

---

**Live:** https://olyxmintabansos-byte.github.io/aeroatmos-os/
