"use client";

import React, { useState } from "react";
import { useAqi } from "@/context/AqiContext";
import { formatNumber } from "@/lib/utils";
import confetti from "canvas-confetti";
import {
  CloudSun,
  Wind,
  Thermometer,
  Droplets,
  Activity,
  Sliders,
  ShieldCheck,
  AlertTriangle,
  MapPin,
  Sparkles,
} from "lucide-react";
import { AqiCategory, MonitoringStation } from "@/types/aqi";

export default function AmbientAqiPage() {
  const { stations, selectedStation, setSelectedStation, updateStationPollution } = useAqi();
  const [pm25Slider, setPm25Slider] = useState(selectedStation.pm25UgM3);

  const getCategoryTheme = (category: AqiCategory) => {
    switch (category) {
      case "BAIK":
        return {
          bg: "bg-emerald-500/10 text-emerald-700 border-emerald-300",
          pill: "bg-emerald-500 text-white",
          label: "BAIK (0 - 50)",
        };
      case "SEDANG":
        return {
          bg: "bg-sky-500/10 text-sky-700 border-sky-300",
          pill: "bg-sky-500 text-white",
          label: "SEDANG (51 - 100)",
        };
      case "TIDAK_SEHAT":
        return {
          bg: "bg-amber-500/10 text-amber-700 border-amber-300",
          pill: "bg-amber-500 text-white",
          label: "TIDAK SEHAT (101 - 200)",
        };
      case "SANGAT_TIDAK_SEHAT":
        return {
          bg: "bg-rose-500/10 text-rose-700 border-rose-300",
          pill: "bg-rose-500 text-white",
          label: "SANGAT TIDAK SEHAT (201 - 300)",
        };
      case "BERBAHAYA":
      default:
        return {
          bg: "bg-slate-900/10 text-slate-900 border-slate-700",
          pill: "bg-slate-950 text-white",
          label: "BERBAHAYA (> 300)",
        };
    }
  };

  const theme = getCategoryTheme(selectedStation.category);

  const handleApplySlider = () => {
    updateStationPollution(selectedStation.id, pm25Slider, pm25Slider * 1.4);
    confetti({
      particleCount: 40,
      spread: 60,
      colors: ["#38BDF8", "#34D399", "#818CF8"],
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      <div className="glass-panel rounded-3xl p-6 md:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/80 border border-sky-300/80 px-3.5 py-1 rounded-full text-xs font-bold text-sky-800 shadow-sm mb-3">
            <Sparkles className="w-4 h-4 text-sky-500" />
            TELEMETRI UDARA AMBIEN REAL-TIME // JABODETABEK
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-sky-900 via-teal-800 to-indigo-900 bg-clip-text text-transparent">
            AIR QUALITY OBSERVATORY
          </h2>
          <p className="text-sm font-medium text-slate-600 mt-1 max-w-2xl">
            Sistem Pemantau Kualitas Udara Otomatis (SPKU) terhubung 5 stasiun telemetri partikulat optik BAM-1020 dan sensor spektrometri gas KLHK.
          </p>
        </div>

        <div className="bg-white/80 border border-white rounded-3xl p-6 shadow-xl flex items-center gap-6 relative z-10 w-full lg:w-auto">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-sky-400 to-teal-300 p-1 shadow-inner flex items-center justify-center">
            <div className="w-full h-full bg-white rounded-full flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-slate-800 font-mono">
                {selectedStation.ispuScore}
              </span>
              <span className="text-[9px] font-bold text-slate-400">ISPU INDEX</span>
            </div>
          </div>

          <div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${theme.pill}`}>
              {selectedStation.category.replace(/_/g, " ")}
            </span>
            <div className="text-xs font-bold text-slate-700 mt-2">
              Stasiun: {selectedStation.name}
            </div>
            <div className="text-[11px] text-slate-500 font-mono">
              Update: {selectedStation.lastUpdated}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-sky-600" /> PILIH STASIUN PEMANTAU WILAYAH
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {stations.map((stn: MonitoringStation) => {
            const isSelected = selectedStation.id === stn.id;
            const cardTheme = getCategoryTheme(stn.category);
            return (
              <div
                key={stn.id}
                onClick={() => {
                  setSelectedStation(stn);
                  setPm25Slider(stn.pm25UgM3);
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-white/95 border-sky-400 shadow-lg shadow-sky-400/20 scale-[1.02]"
                    : "glass-panel hover:bg-white/80"
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                  <span className="text-slate-500">{stn.district}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] ${cardTheme.pill}`}>
                    {stn.ispuScore}
                  </span>
                </div>
                <h4 className="font-bold text-slate-800 text-sm truncate">{stn.name}</h4>
                <div className="mt-2 text-xs font-mono text-slate-600 flex justify-between">
                  <span>PM2.5:</span>
                  <span className="font-bold">{stn.pm25UgM3} µg/m³</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="glass-panel p-4 rounded-2xl">
          <span className="text-[10px] font-bold text-slate-500 block">PM2.5 (HALUS)</span>
          <div className="text-2xl font-black text-slate-800 font-mono mt-1">
            {selectedStation.pm25UgM3}
          </div>
          <span className="text-[10px] text-slate-500">µg/m³ (Baku &lt; 55)</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl">
          <span className="text-[10px] font-bold text-slate-500 block">PM10 (KASAR)</span>
          <div className="text-2xl font-black text-slate-800 font-mono mt-1">
            {selectedStation.pm10UgM3}
          </div>
          <span className="text-[10px] text-slate-500">µg/m³ (Baku &lt; 75)</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl">
          <span className="text-[10px] font-bold text-slate-500 block">CO (KARBON)</span>
          <div className="text-2xl font-black text-slate-800 font-mono mt-1">
            {selectedStation.coPpm}
          </div>
          <span className="text-[10px] text-slate-500">ppm (Baku &lt; 4.0)</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl">
          <span className="text-[10px] font-bold text-slate-500 block">NO2 (NITROGEN)</span>
          <div className="text-2xl font-black text-slate-800 font-mono mt-1">
            {selectedStation.no2Ppb}
          </div>
          <span className="text-[10px] text-slate-500">ppb (Baku &lt; 65)</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl">
          <span className="text-[10px] font-bold text-slate-500 block">SO2 (SULFUR)</span>
          <div className="text-2xl font-black text-slate-800 font-mono mt-1">
            {selectedStation.so2Ppb}
          </div>
          <span className="text-[10px] text-slate-500">ppb (Baku &lt; 50)</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl">
          <span className="text-[10px] font-bold text-slate-500 block">O3 (OZON)</span>
          <div className="text-2xl font-black text-slate-800 font-mono mt-1">
            {selectedStation.o3Ppb}
          </div>
          <span className="text-[10px] text-slate-500">ppb (Baku &lt; 100)</span>
        </div>
      </div>

      <div className="glass-panel rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h3 className="font-bold text-base text-slate-800 uppercase">
              SIMULATOR BEBAN PARTIKULAT PM2.5 & ANGIN
            </h3>
            <p className="text-xs text-slate-500">
              Uji respon kategori ISPU secara instan dengan menggeser slider konsentrasi polutan.
            </p>
          </div>
          <Sliders className="w-5 h-5 text-sky-600" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-slate-700">KONSENTRASI PARTIKULAT PM2.5:</span>
            <span className="font-mono text-sky-700 bg-sky-100 px-3 py-1 rounded-full">
              {pm25Slider} µg/m³
            </span>
          </div>
          <input
            type="range"
            min="5"
            max="250"
            step="1"
            value={pm25Slider}
            onChange={(e) => setPm25Slider(parseFloat(e.target.value))}
            className="w-full accent-sky-600 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-500 font-medium">
            <span>5 µg/m³ (Hutan Tropis)</span>
            <span>55 µg/m³ (Ambang Batas Baku)</span>
            <span>250 µg/m³ (Kabut Asap Kebakaran)</span>
          </div>
        </div>

        <button
          onClick={handleApplySlider}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-sky-500 via-teal-500 to-indigo-600 text-white font-bold text-xs uppercase shadow-md shadow-sky-500/20 hover:opacity-95 transition-all"
        >
          APLIKASIKAN KONSENTRASI POLUTAN KE STASIUN
        </button>
      </div>
    </div>
  );
}
