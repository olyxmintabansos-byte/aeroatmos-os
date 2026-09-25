import type { Metadata } from "next";
import "./globals.css";
import { AqiProvider } from "@/context/AqiContext";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "AeroAtmosphere OS // Frutiger Aero Ambient AQI SCADA & ISPU Desk",
  description:
    "Municipal Air Quality Index (AQI), PM2.5 / PM10 Telemetry, Gaussian Plume Air Dispersion & BMKG Advisory Desk.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col antialiased selection:bg-sky-500 selection:text-white">
        <AqiProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-white/60 bg-white/40 backdrop-blur-md py-6 px-4 text-xs font-medium text-slate-500">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                <span className="font-bold text-sky-800">AEROATMOSPHERE OS (TITAN #24)</span>
                <span>• STANDAR PERMEN LHK NO. 14 TAHUN 2020 (ISPU)</span>
              </div>
              <div>FRUTIGER AERO & AURORA MESH ARCHITECTURE // SOVEREIGN FLEET OLYXMINTABANSOS</div>
            </div>
          </footer>
        </AqiProvider>
      </body>
    </html>
  );
}
