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
  source: "live-csv" | "mock-fallback";
  positions: PositionRow[];
  lastUpdate: string | null;
  message: string;
};
