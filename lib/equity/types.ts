export type EquityPoint = {
  timestamp: string;
  equity: number;
  walletBalance?: number | null;
  unrealizedPnl?: number | null;
  estimatedEquity?: number | null;
};

export type EquitySnapshot = {
  source: "live-csv" | "mock-fallback" | "parse-error";
  sourceStatus?: "LIVE_FILE" | "MISSING_FILE" | "PARSE_ERROR" | "MOCK_FALLBACK";
  points: EquityPoint[];
  currentEquity: number;
  lastUpdate: string;
  dailyPnl: number | null;
  walletBalance?: number | null;
  unrealizedPnl?: number | null;
  estimatedEquity?: number | null;
  message: string;
  filePath?: string;
  fileLastModified?: string | null;
};
