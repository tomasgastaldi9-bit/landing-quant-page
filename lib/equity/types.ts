export type EquityPoint = {
  timestamp: string;
  equity: number;
};

export type EquitySnapshot = {
  source: "live-csv" | "mock-fallback";
  points: EquityPoint[];
  currentEquity: number;
  lastUpdate: string;
  dailyPnl: number | null;
  message: string;
};
