export type AqiCategory =
  | "BAIK"           // 0 - 50 (Hijau)
  | "SEDANG"         // 51 - 100 (Biru)
  | "TIDAK_SEHAT"    // 101 - 200 (Kuning)
  | "SANGAT_TIDAK_SEHAT" // 201 - 300 (Merah)
  | "BERBAHAYA";     // > 300 (Hitam)

export interface MonitoringStation {
  id: string;
  code: string;
  name: string;
  district: string;
  latitude: number;
  longitude: number;
  pm25UgM3: number;
  pm10UgM3: number;
  coPpm: number;
  no2Ppb: number;
  so2Ppb: number;
  o3Ppb: number;
  ispuScore: number;
  category: AqiCategory;
  tempC: number;
  humidityPct: number;
  windSpeedKmh: number;
  windDirectionDeg: number;
  lastUpdated: string;
}

export interface SensorDevice {
  id: string;
  stationId: string;
  model: string;
  gasType: string;
  zeroCalibrationMv: number;
  spanCalibrationPpm: number;
  inletHeaterTempC: number;
  relativeHumidityPct: number;
  flowRateLpm: number;
  opticalLaserStatus: "OPTIMAL" | "ATTENUATED" | "FAULT";
  lastCalibrationDate: string;
}
