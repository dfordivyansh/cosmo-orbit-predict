export interface SpaceWeatherData {
  timestamp: string;
  solarWind: number;
  protonDensity: number;
  magneticField: number;
  kpIndex: number;
  flareClass: string;
  severity: 'low' | 'medium' | 'high';
}

export interface RocketTrajectory {
  time: number;
  original: [number, number, number];
  deviation: [number, number, number];
}

export const generateDummySpaceWeather = (): SpaceWeatherData => {
  const severities: Array<'low' | 'medium' | 'high'> = ['low', 'low', 'low', 'medium', 'high'];
  const severity = severities[Math.floor(Math.random() * severities.length)];
  
  const flareClasses = ['A1.2', 'B3.5', 'C2.1', 'M1.5', 'X2.8'];
  
  return {
    timestamp: new Date().toISOString(),
    solarWind: Math.random() * 400 + 300,
    protonDensity: Math.random() * 20 + 5,
    magneticField: Math.random() * 40 - 20,
    kpIndex: Math.random() * 9,
    flareClass: flareClasses[Math.floor(Math.random() * flareClasses.length)],
    severity,
  };
};

export const generateHistoricalData = (count: number): SpaceWeatherData[] => {
  const data: SpaceWeatherData[] = [];
  const now = Date.now();
  
  for (let i = 0; i < count; i++) {
    const timestamp = new Date(now - (count - i) * 60000).toISOString();
    data.push({
      ...generateDummySpaceWeather(),
      timestamp,
    });
  }
  
  return data;
};

export const generateRocketTrajectory = (includeDeviation: boolean = false): RocketTrajectory[] => {
  const points: RocketTrajectory[] = [];
  const steps = 100;
  
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const angle = t * Math.PI * 2;
    const radius = 2 + t * 3;
    
    // Original trajectory (spiral upward)
    const original: [number, number, number] = [
      Math.cos(angle) * radius,
      t * 8,
      Math.sin(angle) * radius,
    ];
    
    // Deviation trajectory (offset if severe weather)
    let deviation: [number, number, number] = original;
    
    if (includeDeviation && t > 0.3) {
      const deviationAngle = angle + Math.PI / 6;
      deviation = [
        Math.cos(deviationAngle) * (radius + 0.5),
        t * 8 - 0.3,
        Math.sin(deviationAngle) * (radius + 0.5),
      ];
    }
    
    points.push({
      time: t,
      original,
      deviation,
    });
  }
  
  return points;
};

export const alertMessages = [
  { severity: 'low' as const, message: 'Normal solar conditions. All systems operational.', timestamp: new Date().toLocaleString() },
  { severity: 'medium' as const, message: 'Moderate geomagnetic storm detected. Minor trajectory adjustments recommended.', timestamp: new Date().toLocaleString() },
  { severity: 'high' as const, message: 'Severe solar flare detected! Immediate deviation protocol initiated.', timestamp: new Date().toLocaleString() },
];

export const performanceMetrics = {
  rmse: 0.042,
  mae: 0.031,
  accuracy: 94.7,
  f1Score: 0.923,
};
