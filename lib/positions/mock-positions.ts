import type { PositionsSnapshot } from "./types";

export function getMockPositionsSnapshot(
  message = "Positions CSV not found. Showing mock fallback positions.",
): PositionsSnapshot {
  return {
    source: "mock-fallback",
    lastUpdate: "2026-05-08T16:00:00.000Z",
    message,
    positions: [
      {
        symbol: "BTC-PERP",
        side: "Long",
        size: 0.8,
        entry: 64120,
        mark: 64184.2,
        unrealizedPnl: 51.36,
        timestamp: "2026-05-08T16:00:00.000Z",
      },
      {
        symbol: "ETH-PERP",
        side: "Short",
        size: 6.4,
        entry: 3420.5,
        mark: 3412.8,
        unrealizedPnl: 49.28,
        timestamp: "2026-05-08T16:00:00.000Z",
      },
      {
        symbol: "SOL-PERP",
        side: "Flat",
        size: 0,
        entry: null,
        mark: 148.12,
        unrealizedPnl: 0,
        timestamp: "2026-05-08T16:00:00.000Z",
      },
      {
        symbol: "AVAX-PERP",
        side: "Long",
        size: 120,
        entry: 36.8,
        mark: 36.52,
        unrealizedPnl: -33.6,
        timestamp: "2026-05-08T16:00:00.000Z",
      },
    ],
  };
}
