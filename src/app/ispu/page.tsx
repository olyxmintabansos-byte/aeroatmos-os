"use client";

import React from "react";
import { useAqi } from "@/context/AqiContext";
import confetti from "canvas-confetti";
import {
  Printer,
  ShieldCheck,
  FileCheck2,
  TreeDeciduous,
  Wind,
} from "lucide-react";

export default function IspuAdvisoryPage() {
  const { advisory, selectedStation } = useAqi();

  const handlePrint = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 },
    });
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6">
      <div className="glass-panel rounded-3xl p-4 flex items-center justify-between print:hidden shadow-lg">
        <div>
          <h2 className="text-lg font-bold text-slate-800 uppercase">
            STUDIO DOKUMEN RESMI A4 // KEMENTERIAN LHK RI
          </h2>
          <p className="text-xs text-slate-500 font-mono">
            Surat Ketetapan Status Indeks Standar Pencemar Udara (ISPU) Standar Permen LHK No. 14/2020.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-sky-500 to-teal-500 hover:opacity-95 text-white font-bold text-xs uppercase flex items-center gap-2 shadow-lg shadow-sky-500/25 transition-all font-mono"
        >
          <Printer className="w-4 h-4" /> CETAK / SIMPAN PDF A4
        </button>
      </div>

      <div className="border border-slate-300 bg-white p-8 md:p-12 shadow-2xl print:border-none print:shadow-none print:p-0 font-sans text-black relative">
        <div className="border-b-2 border-black pb-4 mb-6">
          <div className="flex items-center justify-between gap-4">
            <div className="w-16 h-16 border-2 border-black flex items-center justify-center font-black text-xl">
              KLHK
            </div>
            <div className="text-center flex-1">
              <h3 className="text-sm font-bold uppercase tracking-wider text-black">
                KEMENTERIAN LINGKUNGAN HIDUP DAN KEHUTANAN RI
              </h3>
              <h2 className="text-lg font-black uppercase tracking-tight text-black">
                DIREKTORAT JENDERAL PENGENDALIAN PENCEMARAN UDARA
              </h2>
              <p className="text-xs font-bold text-black/80">
                Pusat Data dan Informasi Pemantauan Udara Ambien Otomatis (SPKU) Jabodetabek
              </p>
              <p className="text-[10px] font-mono text-black/60">
                Gedung Manggala Wanabakti Blok IV Lt. 5, Jl. Gatot Subroto Senayan Jakarta Pusat
              </p>
            </div>
            <div className="w-16 h-16 border-2 border-black flex flex-col justify-center items-center text-center p-1">
              <span className="text-[9px] font-bold">ISPU</span>
              <span className="text-[8px] font-mono">BAM-1020</span>
            </div>
          </div>
          <div className="w-full h-0.5 bg-black mt-2"></div>
        </div>

        <div className="text-center my-6">
          <h1 className="text-lg font-black uppercase tracking-tight underline">
            BERITA ACARA STATUS INDEKS STANDAR PENCEMAR UDARA (ISPU)
          </h1>
          <p className="font-mono text-xs font-bold mt-1">
            NOMOR PUBLIKASI: {advisory.reportNo}
          </p>
        </div>

        <div className="border border-black p-4 mb-6 bg-slate-50 font-mono text-xs">
          <div className="grid grid-cols-2 gap-y-2.5">
            <div>
              <span className="text-black/60">Stasiun Pemantau:</span>{" "}
              <strong className="text-black">{selectedStation.name}</strong>
            </div>
            <div>
              <span className="text-black/60">Tanggal & Jam Penerbitan:</span>{" "}
              <strong className="text-black">{advisory.date} // 21:00 WIB</strong>
            </div>
            <div>
              <span className="text-black/60">Kode Stasiun SPKU:</span>{" "}
              <strong className="text-black">{selectedStation.code}</strong>
            </div>
            <div>
              <span className="text-black/60">Wilayah Administratif:</span>{" "}
              <strong className="text-black">{selectedStation.district}</strong>
            </div>
            <div>
              <span className="text-black/60">Koordinat Sensor:</span>{" "}
              <strong className="text-black">{selectedStation.latitude}, {selectedStation.longitude}</strong>
            </div>
            <div>
              <span className="text-black/60">Regulasi Acuan:</span>{" "}
              <strong className="text-black">Permen LHK No. 14 Tahun 2020</strong>
            </div>
          </div>
        </div>

        <table className="w-full text-left border-collapse border border-black font-mono text-xs mb-6">
          <thead>
            <tr className="bg-slate-200 border-b border-black font-bold uppercase text-black">
              <th className="p-2 border-r border-black">PARAMETER PENCEMAR</th>
              <th className="p-2 border-r border-black text-center">KONSENTRASI TERUKUR</th>
              <th className="p-2 border-r border-black text-center">AMBANG BATAS BAKU MUTU</th>
              <th className="p-2 border-r border-black text-center">SKOR ISPU</th>
              <th className="p-2 text-center">KATEGORI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black">
            <tr>
              <td className="p-2 border-r border-black font-bold">PM2.5 (Partikulat Halus)</td>
              <td className="p-2 border-r border-black text-center font-bold">{selectedStation.pm25UgM3} µg/m³</td>
              <td className="p-2 border-r border-black text-center">55.0 µg/m³</td>
              <td className="p-2 border-r border-black text-center font-bold">{selectedStation.ispuScore}</td>
              <td className="p-2 text-center font-bold">{selectedStation.category}</td>
            </tr>
            <tr>
              <td className="p-2 border-r border-black font-bold">PM10 (Partikulat Kasar)</td>
              <td className="p-2 border-r border-black text-center font-bold">{selectedStation.pm10UgM3} µg/m³</td>
              <td className="p-2 border-r border-black text-center">75.0 µg/m³</td>
              <td className="p-2 border-r border-black text-center font-bold">78</td>
              <td className="p-2 text-center font-bold">SEDANG</td>
            </tr>
            <tr>
              <td className="p-2 border-r border-black font-bold">Karbon Monoksida (CO)</td>
              <td className="p-2 border-r border-black text-center font-bold">{selectedStation.coPpm} ppm</td>
              <td className="p-2 border-r border-black text-center">4.0 ppm</td>
              <td className="p-2 border-r border-black text-center font-bold">42</td>
              <td className="p-2 text-center font-bold">BAIK</td>
            </tr>
            <tr>
              <td className="p-2 border-r border-black font-bold">Nitrogen Dioksida (NO2)</td>
              <td className="p-2 border-r border-black text-center font-bold">{selectedStation.no2Ppb} ppb</td>
              <td className="p-2 border-r border-black text-center">65.0 ppb</td>
              <td className="p-2 border-r border-black text-center font-bold">58</td>
              <td className="p-2 text-center font-bold">SEDANG</td>
            </tr>
          </tbody>
        </table>

        <div className="border border-black p-4 mb-8 font-mono text-xs space-y-2">
          <div className="font-bold text-xs uppercase border-b border-black pb-1">
            REKOMENDASI KESEHATAN MASYARAKAT:
          </div>
          <p className="leading-relaxed"><strong>Dampak Kesehatan:</strong> {advisory.healthImpactSummary}</p>
          <p className="leading-relaxed"><strong>Tindakan Mitigasi:</strong> {advisory.preventiveAction}</p>
        </div>

        <div className="grid grid-cols-3 gap-6 text-center font-mono text-xs pt-4 relative">
          <div>
            <p className="text-black/70">Analis Kualitas Lingkungan,</p>
            <div className="h-20 flex items-center justify-center font-bold text-sm italic">
              ( Terverifikasi Digital )
            </div>
            <p className="font-bold underline">{advisory.analystName}</p>
            <p className="text-[10px]">NIP. 19910612 201701 1 002</p>
          </div>

          <div className="relative">
            <p className="text-black/70">Kepala Balai SPKU Jabodetabek,</p>
            <div className="h-20 flex items-center justify-center font-bold text-sm italic">
              ( Terverifikasi Digital )
            </div>
            <p className="font-bold underline">{advisory.stationHeadName}</p>
            <p className="text-[10px]">NIP. 19800418 200502 2 001</p>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 border-4 border-blue-700 rounded-full flex flex-col items-center justify-center text-blue-700 rotate-[-10deg] opacity-80 pointer-events-none select-none">
              <span className="text-[7px] font-black uppercase">KEMENTERIAN LHK RI</span>
              <span className="text-[8px] font-black uppercase">DITJEN PPU</span>
              <span className="text-[7px] font-black uppercase">BALAI SPKU</span>
              <span className="text-[6px] font-mono">ISPU OFFICIAL</span>
            </div>
          </div>

          <div>
            <p className="text-black/70">Mengetahui, Dirjen Pengendalian,</p>
            <div className="h-20 flex items-center justify-center font-bold text-sm italic">
              ( Terverifikasi Digital )
            </div>
            <p className="font-bold underline">{advisory.klhkDirectorName}</p>
            <p className="text-[10px]">NIP. 19660814 199203 1 003</p>
          </div>
        </div>
      </div>
    </div>
  );
}
