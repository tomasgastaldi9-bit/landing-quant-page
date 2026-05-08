import type { EquityPoint, EquitySnapshot } from "./types";

const mockPoints: EquityPoint[] = [
  { timestamp: "2026-05-08T09:00:00.000Z", equity: 100000 },
  { timestamp: "2026-05-08T10:00:00.000Z", equity: 100180 },
  { timestamp: "2026-05-08T11:00:00.000Z", equity: 100120 },
  { timestamp: "2026-05-08T12:00:00.000Z", equity: 100460 },
  { timestamp: "2026-05-08T13:00:00.000Z", equity: 100390 },
  { timestamp: "2026-05-08T14:00:00.000Z", equity: 100720 },
  { timestamp: "2026-05-08T15:00:00.000Z", equity: 100640 },
  { timestamp: "2026-05-08T16:00:00.000Z", equity: 100910 },
];

export function getMockEquitySnapshot(message = "CSV not found. Showing mock fallback data."): EquitySnapshot {
  const last = mockPoints[mockPoints.length - 1];
  const first = mockPoints[0];

  return {
    source: "mock-fallback",
    points: mockPoints,
    currentEquity: last.equity,
    lastUpdate: last.timestamp,
    dailyPnl: last.equity - first.equity,
    message,
  };
}
