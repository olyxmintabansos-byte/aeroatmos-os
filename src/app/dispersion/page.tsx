"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAqi } from "@/context/AqiContext";
import confetti from "canvas-confetti";
import {
  Wind,
  Activity,
  Sliders,
  Sparkles,
  Info,
  Layers,
  Thermometer,
} from "lucide-react";
import { PasquillStabilityClass } from "@/types/aqi";

export default function DispersionPage() {
  const { dispersion, updateDispersionParam } = useAqi();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; size: number; speedX: number; speedY: number; opacity: number }[] = [];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: 100,
        y: canvas.height - dispersion.stackHeightM * 1.5,
        size: Math.random() * 4 + 2,
        speedX: Math.random() * dispersion.windSpeedMs + 1.5,
        speedY: (Math.random() - 0.5) * 1.2,
        opacity: Math.random() * 0.6 + 0.3,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "rgba(100, 116, 139, 0.4)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height - 30);
      ctx.lineTo(canvas.width, canvas.height - 30);
      ctx.stroke();

      const stackX = 100;
      const stackBottom = canvas.height - 30;
      const stackTop = stackBottom - dispersion.stackHeightM * 1.5;

      ctx.fillStyle = "#64748B";
      ctx.fillRect(stackX - 8, stackTop, 16, dispersion.stackHeightM * 1.5);

      ctx.fillStyle = "#334155";
      ctx.fillRect(stackX - 12, stackTop - 4, 24, 6);

      const grad = ctx.createRadialGradient(
        stackX + 150,
        stackTop + 20,
        20,
        stackX + 350,
        stackTop + 60,
        220
      );
      grad.addColorStop(0, "rgba(56, 189, 248, 0.35)");
      grad.addColorStop(0.5, "rgba(20, 184, 166, 0.15)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(stackX + 260, stackTop + 40, 260, 80, 0.1, 0, Math.PI * 2);
      ctx.fill();

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.size += 0.08;
        p.opacity -= 0.002;

        if (p.x > canvas.width || p.opacity <= 0) {
          p.x = stackX;
          p.y = stackTop;
          p.size = Math.random() * 3 + 2;
          p.speedX = Math.random() * dispersion.windSpeedMs + 1.5;
          p.speedY = (Math.random() - 0.5) * 1.2;
          p.opacity = Math.random() * 0.6 + 0.4;
        }

        ctx.fillStyle = `rgba(14, 165, 233, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [dispersion.stackHeightM, dispersion.windSpeedMs, dispersion.emissionRateGs]);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      <div className="glass-panel rounded-3xl p-6 md:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-400/40 text-sky-800 px-3.5 py-1 rounded-full text-xs font-bold mb-2">
            <Wind className="w-3.5 h-3.5" />
            MODEL DISPERSI PASQUILL-GIFFORD // GAUSSIAN PLUME
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-sky-900 via-teal-800 to-indigo-900 bg-clip-text text-transparent">
            AIR DISPERSION VECTOR STUDIO
          </h2>
          <p className="text-xs font-medium text-slate-600 mt-1 max-w-2xl">
            Simulasi sebaran asap cerobong industri berkecepatan 60 FPS. Menghitung jarak konsentrasi maksimum partikulat di permukaan tanah (*ground-level impact distance*).
          </p>
        </div>
      </div>

      <div className="glass-panel rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-sky-500 animate-ping" />
            <h3 className="font-bold text-sm uppercase text-slate-800">
              PROFIL ALIRAN DOWNWIND CEROBONG EMISI (ELEVASI {dispersion.stackHeightM} METER)
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-500">
            KONSENTRASI MAKS: {dispersion.downwindMaxConcUgM3} µg/m³ @ {dispersion.peakDistanceKm} KM
          </span>
        </div>

        <div className="bg-gradient-to-b from-sky-100/50 via-white/40 to-emerald-100/40 rounded-2xl overflow-hidden border border-white/80 shadow-inner">
          <canvas
            ref={canvasRef}
            width={900}
            height={320}
            className="w-full h-[320px] block"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel rounded-3xl p-5 space-y-3">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-slate-700">TINGGI CEROBONG (STACK):</span>
            <span className="font-mono text-sky-800 bg-sky-100 px-2.5 py-0.5 rounded-full">
              {dispersion.stackHeightM} M
            </span>
          </div>
          <input
            type="range"
            min="30"
            max="150"
            step="5"
            value={dispersion.stackHeightM}
            onChange={(e) =>
              updateDispersionParam({ stackHeightM: parseFloat(e.target.value) })
            }
            className="w-full accent-sky-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>30m (Pabrik Kecil)</span>
            <span>150m (PLTU Batubara)</span>
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-5 space-y-3">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-slate-700">KECEPATAN ANGIN EFEKTIF:</span>
            <span className="font-mono text-teal-800 bg-teal-100 px-2.5 py-0.5 rounded-full">
              {dispersion.windSpeedMs} M/S
            </span>
          </div>
          <input
            type="range"
            min="1.0"
            max="15.0"
            step="0.5"
            value={dispersion.windSpeedMs}
            onChange={(e) =>
              updateDispersionParam({ windSpeedMs: parseFloat(e.target.value) })
            }
            className="w-full accent-teal-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>1.0 m/s (Tenang)</span>
            <span>15.0 m/s (Badai Angin)</span>
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-5 space-y-3">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-slate-700">LAJU EMISI SUMBER (Q):</span>
            <span className="font-mono text-indigo-800 bg-indigo-100 px-2.5 py-0.5 rounded-full">
              {dispersion.emissionRateGs} G/S
            </span>
          </div>
          <input
            type="range"
            min="20"
            max="300"
            step="10"
            value={dispersion.emissionRateGs}
            onChange={(e) =>
              updateDispersionParam({ emissionRateGs: parseFloat(e.target.value) })
            }
            className="w-full accent-indigo-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>20 g/s</span>
            <span>300 g/s (Heavy Output)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
