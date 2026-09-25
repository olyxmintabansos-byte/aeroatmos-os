"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAqi } from "@/context/AqiContext";
import {
  CloudSun,
  Activity,
  Sliders,
  Wind,
  FileCheck2,
  RotateCcw,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { selectedStation, resetAllData } = useAqi();

  const navLinks = [
    { href: "/", label: "AMBIENT AQI", icon: CloudSun },
    { href: "/sensor/", label: "BAM-1020 SENSORS", icon: Sliders },
    { href: "/dispersion/", label: "GAUSSIAN PLUME", icon: Wind },
    { href: "/ispu/", label: "KLHK ISPU A4", icon: FileCheck2 },
  ];

  return (
    <header className="border-b border-white/40 bg-white/60 backdrop-blur-xl px-4 py-3 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-400 via-cyan-300 to-indigo-400 p-[1px] shadow-lg shadow-sky-400/20 flex items-center justify-center">
            <div className="w-full h-full bg-white/70 backdrop-blur-md rounded-2xl flex items-center justify-center text-sky-600">
              <CloudSun className="w-6 h-6 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-sky-700 via-teal-600 to-indigo-700 bg-clip-text text-transparent">
                AeroAtmosphere OS
              </h1>
              <span className="bg-sky-500/10 text-sky-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-sky-400/30">
                KLHK ISPU 2026
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-500">
              STASIUN PEMANTAU KUALITAS UDARA (SPKU) // JABODETABEK NET
            </p>
          </div>
        </div>

        <div className="hidden xl:flex items-center gap-3 text-xs">
          <div className="bg-white/80 border border-sky-200/60 rounded-full px-4 py-1.5 shadow-sm flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-slate-600 font-medium">STASIUN:</span>
            <span className="font-bold text-sky-800">{selectedStation.name}</span>
            <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded-full">
              ISPU: {selectedStation.ispuScore}
            </span>
          </div>

          <div className="bg-white/80 border border-sky-200/60 rounded-full px-3 py-1.5 shadow-sm flex items-center gap-2 font-mono text-slate-600">
            <span>PM2.5: {selectedStation.pm25UgM3} µg/m³</span>
            <span>|</span>
            <span>{selectedStation.tempC}°C</span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-md shadow-sky-500/25"
                    : "text-slate-600 hover:text-sky-700 hover:bg-sky-50"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}

          <button
            onClick={() => {
              if (confirm("Reset simulasi ke kondisi awal sensor?")) {
                resetAllData();
              }
            }}
            title="Reset Data"
            className="p-2 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-sky-600 hover:bg-sky-50 transition-all shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
