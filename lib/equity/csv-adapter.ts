import { getFirstValue, normalizeTimestamp, parseCsv, parseNumber } from "@/lib/csv";
import { readTelemetryCsv } from "@/lib/telemetry/files";
import { getMockEquitySnapshot } from "./mock-equity";
import type { EquityPoint, EquitySnapshot } from "./types";

const TIMESTAMP_COLUMNS = ["timestamp", "time", "datetime", "date"];
const EQUITY_COLUMNS = [
  "estimated_equity",
  "equity",
  "balance",
  "portfolio_value",
  "account_equity",
  "usdt_equity_after",
  "usdt_equity_before",
];
const WALLET_COLUMNS = ["wallet_balance", "balance", "cross_wallet_balance"];
const UNREALIZED_COLUMNS = [
  "unrealized_pnl",
  "cross_unrealized_pnl",
  "unrealized",
  "unrealized_profit",
];

export async function getEquitySnapshot(): Promise<EquitySnapshot> {
  const source = await readPreferredEquityCsv();

  if (source.status === "MISSING_FILE") {
    return {
      ...getMockEquitySnapshot(source.message),
      sourceStatus: "MISSING_FILE",
      filePath: source.filePath,
      fileLastModified: source.lastModified,
    };
  }

  if (source.status === "PARSE_ERROR") {
    return {
      ...getMockEquitySnapshot(source.message),
      source: "parse-error",
      sourceStatus: "PARSE_ERROR",
      filePath: source.filePath,
      fileLastModified: source.lastModified,
    };
  }

  const points = parseEquityRows(source.rows);

  if (points.length === 0) {
    return {
      ...getMockEquitySnapshot("CSV exists but no equity rows could be parsed."),
      source: "parse-error",
      sourceStatus: "PARSE_ERROR",
      filePath: source.filePath,
      fileLastModified: source.lastModified,
    };
  }

  const current = points[points.length - 1];
  const firstToday = findFirstPointForDay(points, current.timestamp) ?? points[0];

  return {
    source: "live-csv",
    sourceStatus: "LIVE_FILE",
    points,
    currentEquity: current.equity,
    estimatedEquity: current.estimatedEquity ?? current.equity,
    walletBalance: current.walletBalance ?? null,
    unrealizedPnl: current.unrealizedPnl ?? null,
    lastUpdate: current.timestamp,
    dailyPnl: current.equity - firstToday.equity,
    message: source.message,
    filePath: source.filePath,
    fileLastModified: source.lastModified,
  };
}

async function readPreferredEquityCsv() {
  const liveTelemetry = await readTelemetryCsv("live_telemetry_equity.csv", { limit: 1200 });
  if (liveTelemetry.status !== "MISSING_FILE") return liveTelemetry;
  return readTelemetryCsv("live_testnet_equity.csv", { limit: 1200 });
}

function parseEquityRows(rows: ReturnType<typeof parseCsv>): EquityPoint[] {
  return rows
    .map((row) => {
      const timestamp = getFirstValue(row, TIMESTAMP_COLUMNS);
      const equity = parseNumber(getFirstValue(row, EQUITY_COLUMNS));
      const walletBalance = parseNumber(getFirstValue(row, WALLET_COLUMNS));
      const unrealizedPnl = parseNumber(getFirstValue(row, UNREALIZED_COLUMNS));

      if (!timestamp || equity === null) return null;

      return {
        timestamp: normalizeTimestamp(timestamp),
        equity,
        walletBalance,
        unrealizedPnl,
        estimatedEquity: equity,
      };
    })
    .filter((point): point is NonNullable<typeof point> => point !== null)
    .sort(
      (left, right) =>
        new Date(left.timestamp).getTime() - new Date(right.timestamp).getTime(),
    );
}

function findFirstPointForDay(points: EquityPoint[], timestamp: string) {
  const day = timestamp.slice(0, 10);
  return points.find((point) => point.timestamp.slice(0, 10) === day);
}
