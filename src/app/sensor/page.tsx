"use client";

import React from "react";
import { useAqi } from "@/context/AqiContext";
import { SensorDevice } from "@/types/aqi";
import confetti from "canvas-confetti";
import {
  Sliders,
  CheckCircle2,
  Wrench,
  Zap,
  Activity,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

export default function SensorPage() {
  const { sensors, calibrateSensor } = useAqi();

  const handleCalibrate = (id: string) => {
    calibrateSensor(id);
    confetti({ particleCount: 30, spread: 50 });
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      <div className="glass-panel rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-400/40 text-teal-800 px-3.5 py-1 rounded-full text-xs font-bold mb-2">
            <Sliders className="w-3.5 h-3.5" />
            DIAGNOSTIK SENSOR & INLET ANALYZER
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-sky-900 to-teal-800 bg-clip-text text-transparent">
            INSTRUMENTATION CALIBRATION
          </h2>
          <p className="text-xs font-medium text-slate-600 mt-1 max-w-2xl">
            Pemeriksaan instrumen spektrometri kontinu. Menjaga kompensasi suhu inlet heater (38.5°C), zero-drift optik laser, dan laju alir pompa volumetrik (16.67 LPM).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sensors.map((sens: SensorDevice) => (
          <div key={sens.id} className="glass-panel rounded-3xl p-6 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-3">
                <span className="font-mono text-xs font-bold text-sky-800 bg-sky-100 px-2.5 py-0.5 rounded-full">
                  {sens.id}
                </span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {sens.opticalLaserStatus}
                </span>
              </div>

              <h4 className="font-bold text-base text-slate-800">{sens.model}</h4>
              <p className="text-xs text-slate-500 mt-0.5">{sens.gasType}</p>

              <div className="mt-4 space-y-2 font-mono text-xs text-slate-600 bg-white/70 p-3.5 rounded-2xl border border-white">
                <div className="flex justify-between">
                  <span>Zero Drift:</span>
                  <span className="font-bold text-slate-800">{sens.zeroCalibrationMv} mV</span>
                </div>
                <div className="flex justify-between">
                  <span>Span Target:</span>
                  <span className="font-bold text-slate-800">{sens.spanCalibrationPpm}</span>
                </div>
                <div className="flex justify-between">
                  <span>Inlet Heater:</span>
                  <span className="font-bold text-teal-700">{sens.inletHeaterTempC} °C</span>
                </div>
                <div className="flex justify-between">
                  <span>Sample Flow:</span>
                  <span className="font-bold text-sky-700">{sens.flowRateLpm} LPM</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200 text-[10px]">
                  <span>Kalibrasi Terakhir:</span>
                  <span>{sens.lastCalibrationDate}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleCalibrate(sens.id)}
              className="w-full py-2.5 rounded-2xl glass-btn text-sky-800 font-bold text-xs uppercase flex items-center justify-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" /> RE-KALIBRASI SENSOR NOL
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
