export type PositionRow = {
  symbol: string;
  side: string;
  size: number | null;
  entry: number | null;
  mark: number | null;
  unrealizedPnl: number | null;
  timestamp: string;
};

export type PositionsSnapshot = {
  source: "live-csv" | "mock-fallback" | "parse-error";
  sourceStatus?:
    | "LIVE_FILE"
    | "LIVE_FILE_EMPTY"
    | "MISSING_FILE"
    | "PARSE_ERROR"
    | "MOCK_FALLBACK";
  positions: PositionRow[];
  lastUpdate: string | null;
  message: string;
  filePath?: string;
  fileLastModified?: string | null;
};
