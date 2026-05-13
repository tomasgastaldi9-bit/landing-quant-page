export type EquityPoint = {
  timestamp: string;
  equity: number;
};

export type EquitySnapshot = {
  source: "live-csv" | "mock-fallback" | "parse-error";
  sourceStatus?: "LIVE_FILE" | "MISSING_FILE" | "PARSE_ERROR" | "MOCK_FALLBACK";
  points: EquityPoint[];
  currentEquity: number;
  lastUpdate: string;
  dailyPnl: number | null;
  message: string;
  filePath?: string;
  fileLastModified?: string | null;
};
