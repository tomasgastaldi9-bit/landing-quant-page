import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { getFirstValue, normalizeTimestamp, parseCsv, parseNumber } from "@/lib/csv";
import { getMockEquitySnapshot } from "./mock-equity";
import type { EquityPoint, EquitySnapshot } from "./types";

const TIMESTAMP_COLUMNS = ["timestamp", "time", "datetime", "date"];
const EQUITY_COLUMNS = ["equity", "balance", "portfolio_value", "account_equity"];

export async function getEquitySnapshot(): Promise<EquitySnapshot> {
  const csvPath = resolveEquityCsvPath();

  if (!existsSync(csvPath)) {
    return getMockEquitySnapshot(`CSV not found at ${csvPath}. Showing mock fallback data.`);
  }

  try {
    const csv = await readFile(csvPath, "utf8");
    const points = parseEquityCsv(csv);

    if (points.length === 0) {
      return getMockEquitySnapshot("CSV exists but no equity rows could be parsed.");
    }

    const current = points[points.length - 1];
    const firstToday = findFirstPointForDay(points, current.timestamp) ?? points[0];

    return {
      source: "live-csv",
      points,
      currentEquity: current.equity,
      lastUpdate: current.timestamp,
      dailyPnl: current.equity - firstToday.equity,
      message: `Loaded ${points.length} equity rows from CSV.`,
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? `Failed to read equity CSV: ${error.message}`
        : "Failed to read equity CSV.";

    return getMockEquitySnapshot(message);
  }
}

function resolveEquityCsvPath() {
  return path.join(process.cwd(), "output", "live_testnet_equity.csv");
}

function parseEquityCsv(csv: string): EquityPoint[] {
  return parseCsv(csv)
    .map((row) => {
      const timestamp = getFirstValue(row, TIMESTAMP_COLUMNS);
      const equity = parseNumber(getFirstValue(row, EQUITY_COLUMNS));

      if (!timestamp || equity === null) return null;

      return {
        timestamp: normalizeTimestamp(timestamp),
        equity,
      };
    })
    .filter((point): point is EquityPoint => point !== null)
    .sort(
      (left, right) =>
        new Date(left.timestamp).getTime() - new Date(right.timestamp).getTime(),
    );
}

function findFirstPointForDay(points: EquityPoint[], timestamp: string) {
  const day = timestamp.slice(0, 10);
  return points.find((point) => point.timestamp.slice(0, 10) === day);
}
