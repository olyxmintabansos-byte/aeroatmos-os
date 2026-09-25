"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  MonitoringStation,
  SensorDevice,
  AqiCategory,
  DispersionModel,
  IspuOfficialAdvisory,
} from "@/types/aqi";

interface AqiContextType {
  stations: MonitoringStation[];
  sensors: SensorDevice[];
  selectedStation: MonitoringStation;
  dispersion: DispersionModel;
  advisory: IspuOfficialAdvisory;
  setSelectedStation: (station: MonitoringStation) => void;
  updateStationPollution: (stationId: string, pm25: number, pm10: number) => void;
  updateDispersionParam: (param: Partial<DispersionModel>) => void;
  calibrateSensor: (sensorId: string) => void;
  updateAdvisory: (newAdv: Partial<IspuOfficialAdvisory>) => void;
  resetAllData: () => void;
}

const INITIAL_STATIONS: MonitoringStation[] = [
  {
    id: "STN-JKT-01",
    code: "SPKU-BDN",
    name: "Bundaran HI Landmark",
    district: "Jakarta Pusat",
    latitude: -6.195,
    longitude: 106.823,
    pm25UgM3: 68.4,
    pm10UgM3: 94.2,
    coPpm: 2.4,
    no2Ppb: 32.5,
    so2Ppb: 14.8,
    o3Ppb: 44.0,
    ispuScore: 114,
    category: "TIDAK_SEHAT",
    tempC: 31.4,
    humidityPct: 68,
    windSpeedKmh: 12.5,
    windDirectionDeg: 45,
    lastUpdated: "21:05 WIB",
  },
  {
    id: "STN-JKT-02",
    code: "SPKU-KLG",
    name: "Kelapa Gading Boulevard",
    district: "Jakarta Utara",
    latitude: -6.161,
    longitude: 106.904,
    pm25UgM3: 42.1,
    pm10UgM3: 65.0,
    coPpm: 1.8,
    no2Ppb: 24.1,
    so2Ppb: 18.2,
    o3Ppb: 38.5,
    ispuScore: 82,
    category: "SEDANG",
    tempC: 32.1,
    humidityPct: 72,
    windSpeedKmh: 16.0,
    windDirectionDeg: 60,
    lastUpdated: "21:05 WIB",
  },
  {
    id: "STN-JKT-03",
    code: "SPKU-GBK",
    name: "Gelora Bung Karno Senayan",
    district: "Jakarta Selatan",
    latitude: -6.218,
    longitude: 106.802,
    pm25UgM3: 24.5,
    pm10UgM3: 38.2,
    coPpm: 0.9,
    no2Ppb: 16.4,
    so2Ppb: 8.5,
    o3Ppb: 52.0,
    ispuScore: 48,
    category: "BAIK",
    tempC: 29.8,
    humidityPct: 64,
    windSpeedKmh: 9.4,
    windDirectionDeg: 30,
    lastUpdated: "21:05 WIB",
  },
  {
    id: "STN-JKT-04",
    code: "SPKU-KBJ",
    name: "Kebon Jeruk Arterial",
    district: "Jakarta Barat",
    latitude: -6.191,
    longitude: 106.768,
    pm25UgM3: 84.2,
    pm10UgM3: 118.5,
    coPpm: 3.1,
    no2Ppb: 41.2,
    so2Ppb: 22.0,
    o3Ppb: 48.0,
    ispuScore: 138,
    category: "TIDAK_SEHAT",
    tempC: 31.8,
    humidityPct: 66,
    windSpeedKmh: 8.2,
    windDirectionDeg: 90,
    lastUpdated: "21:05 WIB",
  },
  {
    id: "STN-JKT-05",
    code: "STN-LBJ",
    name: "Lubang Buaya Hutan Kota",
    district: "Jakarta Timur",
    latitude: -6.291,
    longitude: 106.899,
    pm25UgM3: 18.2,
    pm10UgM3: 28.4,
    coPpm: 0.6,
    no2Ppb: 11.0,
    so2Ppb: 6.2,
    o3Ppb: 32.0,
    ispuScore: 36,
    category: "BAIK",
    tempC: 28.5,
    humidityPct: 76,
    windSpeedKmh: 6.5,
    windDirectionDeg: 120,
    lastUpdated: "21:05 WIB",
  },
];

const INITIAL_SENSORS: SensorDevice[] = [
  {
    id: "BAM-01",
    stationId: "STN-JKT-01",
    model: "Met One BAM-1020 Continuous Beta Attenuation",
    gasType: "Partikulat Halus PM2.5 / PM10",
    zeroCalibrationMv: 0.04,
    spanCalibrationPpm: 99.8,
    inletHeaterTempC: 38.5,
    relativeHumidityPct: 35.0,
    flowRateLpm: 16.67,
    opticalLaserStatus: "OPTIMAL",
    lastCalibrationDate: "15 September 2026",
  },
  {
    id: "UV-02",
    stationId: "STN-JKT-01",
    model: "Thermo Fisher 49i UV Photometric Analyzer",
    gasType: "Ozon Permukaan (O3)",
    zeroCalibrationMv: 0.02,
    spanCalibrationPpm: 400.0,
    inletHeaterTempC: 25.0,
    relativeHumidityPct: 40.0,
    flowRateLpm: 1.0,
    opticalLaserStatus: "OPTIMAL",
    lastCalibrationDate: "18 September 2026",
  },
  {
    id: "NDIR-03",
    stationId: "STN-JKT-01",
    model: "Horiba APMA-370 NDIR Cross-Flow Gas Filter",
    gasType: "Karbon Monoksida (CO)",
    zeroCalibrationMv: 0.01,
    spanCalibrationPpm: 50.0,
    inletHeaterTempC: 45.0,
    relativeHumidityPct: 20.0,
    flowRateLpm: 1.5,
    opticalLaserStatus: "OPTIMAL",
    lastCalibrationDate: "20 September 2026",
  },
];

const INITIAL_DISPERSION: DispersionModel = {
  stackHeightM: 80,
  emissionRateGs: 120,
  windSpeedMs: 4.5,
  stabilityClass: "C_SLIGHTLY_UNSTABLE",
  ambientTempC: 31.0,
  downwindMaxConcUgM3: 54.2,
  peakDistanceKm: 2.4,
};

const INITIAL_ADVISORY: IspuOfficialAdvisory = {
  reportNo: "ISPU/KLHK-BPPK/2026/09-0891",
  date: "25 September 2026",
  reportingPeriod: "Periode Harian Pukul 15:00 - 21:00 WIB",
  stationCode: "SPKU-BDN",
  stationName: "Stasiun Pemantau Kualitas Udara Bundaran HI Jakarta Pusat",
  criticalParameter: "PM2.5 (Partikulat Halus)",
  ispuValue: 114,
  category: "TIDAK_SEHAT",
  healthImpactSummary:
    "Kualitas udara bersifat merugikan pada kelompok rentan (anak-anak, ibu hamil, lansia, penderita penyakit kardiovaskular dan paru obstruktif menahun).",
  preventiveAction:
    "Gunakan masker filtrasi respiratori minimal N95 saat beraktivitas luar ruang. Nyalakan pemurni udara (Air Purifier HEPA) dalam ruangan tertutup dan hindari olahraga berat di jalan arteri.",
  analystName: "Budi Santoso, S.Si (Analis Kualitas Lingkungan)",
  stationHeadName: "Ir. Maya Anggraeni, M.Env (Kepala Balai SPKU Jabodetabek)",
  klhkDirectorName: "Dr. Ir. Sigit Reliantoro, M.Sc (Dirjen Pengendalian Pencemaran KLHK)",
};

const AqiContext = createContext<AqiContextType | undefined>(undefined);

export function AqiProvider({ children }: { children: React.ReactNode }) {
  const [stations, setStations] = useState<MonitoringStation[]>(INITIAL_STATIONS);
  const [sensors, setSensors] = useState<SensorDevice[]>(INITIAL_SENSORS);
  const [selectedStation, setSelectedStation] = useState<MonitoringStation>(INITIAL_STATIONS[0]);
  const [dispersion, setDispersion] = useState<DispersionModel>(INITIAL_DISPERSION);
  const [advisory, setAdvisory] = useState<IspuOfficialAdvisory>(INITIAL_ADVISORY);

  useEffect(() => {
    try {
      const savedStn = localStorage.getItem("aeroatmos_stations");
      if (savedStn) setStations(JSON.parse(savedStn));
      const savedSens = localStorage.getItem("aeroatmos_sensors");
      if (savedSens) setSensors(JSON.parse(savedSens));
      const savedDisp = localStorage.getItem("aeroatmos_dispersion");
      if (savedDisp) setDispersion(JSON.parse(savedDisp));
      const savedAdv = localStorage.getItem("aeroatmos_advisory");
      if (savedAdv) setAdvisory(JSON.parse(savedAdv));
    } catch (e) {
      console.error("Failed to load localstorage:", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("aeroatmos_stations", JSON.stringify(stations));
      localStorage.setItem("aeroatmos_sensors", JSON.stringify(sensors));
      localStorage.setItem("aeroatmos_dispersion", JSON.stringify(dispersion));
      localStorage.setItem("aeroatmos_advisory", JSON.stringify(advisory));
    } catch (e) {
      console.error("Failed to save localstorage:", e);
    }
  }, [stations, sensors, dispersion, advisory]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStations((prev) =>
        prev.map((s) => {
          const jitter = (Math.random() - 0.5) * 1.5;
          const newPm25 = Math.max(10, Number((s.pm25UgM3 + jitter).toFixed(1)));
          let cat: AqiCategory = "BAIK";
          let score = Math.floor(newPm25 * 1.8);
          if (score > 300) cat = "BERBAHAYA";
          else if (score > 200) cat = "SANGAT_TIDAK_SEHAT";
          else if (score > 100) cat = "TIDAK_SEHAT";
          else if (score > 50) cat = "SEDANG";

          return {
            ...s,
            pm25UgM3: newPm25,
            ispuScore: score,
            category: cat,
            lastUpdated: new Date().toLocaleTimeString("id-ID") + " WIB",
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const updateStationPollution = (stationId: string, pm25: number, pm10: number) => {
    setStations((prev) =>
      prev.map((s) => {
        if (s.id !== stationId) return s;
        let cat: AqiCategory = "BAIK";
        let score = Math.floor(pm25 * 1.8);
        if (score > 300) cat = "BERBAHAYA";
        else if (score > 200) cat = "SANGAT_TIDAK_SEHAT";
        else if (score > 100) cat = "TIDAK_SEHAT";
        else if (score > 50) cat = "SEDANG";

        return {
          ...s,
          pm25UgM3: pm25,
          pm10UgM3: pm10,
          ispuScore: score,
          category: cat,
        };
      })
    );
  };

  const updateDispersionParam = (param: Partial<DispersionModel>) => {
    setDispersion((prev) => {
      const updated = { ...prev, ...param };
      const u = Math.max(1.0, updated.windSpeedMs);
      const H = updated.stackHeightM;
      const Q = updated.emissionRateGs;
      const conc = Number(((Q * 1000) / (2.718 * 3.1415 * u * (H * 0.4))).toFixed(1));
      const peakDist = Number((H * 0.03 * (u / 2)).toFixed(1));

      return {
        ...updated,
        downwindMaxConcUgM3: Math.max(12, conc),
        peakDistanceKm: Math.max(0.8, peakDist),
      };
    });
  };

  const calibrateSensor = (sensorId: string) => {
    setSensors((prev) =>
      prev.map((sens) =>
        sens.id === sensorId
          ? {
              ...sens,
              zeroCalibrationMv: 0.00,
              opticalLaserStatus: "OPTIMAL",
              lastCalibrationDate: new Date().toLocaleDateString("id-ID"),
            }
          : sens
      )
    );
  };

  const updateAdvisory = (newAdv: Partial<IspuOfficialAdvisory>) => {
    setAdvisory((prev) => ({ ...prev, ...newAdv }));
  };

  const resetAllData = () => {
    setStations(INITIAL_STATIONS);
    setSensors(INITIAL_SENSORS);
    setDispersion(INITIAL_DISPERSION);
    setAdvisory(INITIAL_ADVISORY);
    setSelectedStation(INITIAL_STATIONS[0]);
    localStorage.removeItem("aeroatmos_stations");
    localStorage.removeItem("aeroatmos_sensors");
    localStorage.removeItem("aeroatmos_dispersion");
    localStorage.removeItem("aeroatmos_advisory");
  };

  return (
    <AqiContext.Provider
      value={{
        stations,
        sensors,
        selectedStation,
        dispersion,
        advisory,
        setSelectedStation,
        updateStationPollution,
        updateDispersionParam,
        calibrateSensor,
        updateAdvisory,
        resetAllData,
      }}
    >
      {children}
    </AqiContext.Provider>
  );
}

export function useAqi() {
  const context = useContext(AqiContext);
  if (!context) throw new Error("useAqi must be used within an AqiProvider");
  return context;
}
