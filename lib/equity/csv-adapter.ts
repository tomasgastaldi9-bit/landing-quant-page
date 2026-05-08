import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
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
  const lines = csv
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) return [];

  const headers = splitCsvLine(lines[0]).map(normalizeHeader);
  const timestampIndex = findColumnIndex(headers, TIMESTAMP_COLUMNS);
  const equityIndex = findColumnIndex(headers, EQUITY_COLUMNS);

  if (timestampIndex === -1 || equityIndex === -1) return [];

  return lines
    .slice(1)
    .map((line) => {
      const cells = splitCsvLine(line);
      const timestamp = cells[timestampIndex]?.trim();
      const equity = Number.parseFloat(cells[equityIndex]?.replace(/[$,\s]/g, ""));

      if (!timestamp || !Number.isFinite(equity)) return null;

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

function splitCsvLine(line: string) {
  const cells: string[] = [];
  let current = "";
  let inQuotes = false;

  for (const char of line) {
    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      cells.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  cells.push(current);
  return cells;
}

function normalizeHeader(header: string) {
  return header.trim().toLowerCase().replace(/[\s-]+/g, "_");
}

function findColumnIndex(headers: string[], candidates: string[]) {
  return headers.findIndex((header) => candidates.includes(header));
}

function normalizeTimestamp(timestamp: string) {
  const parsed = new Date(timestamp);
  return Number.isNaN(parsed.getTime()) ? timestamp : parsed.toISOString();
}

function findFirstPointForDay(points: EquityPoint[], timestamp: string) {
  const day = timestamp.slice(0, 10);
  return points.find((point) => point.timestamp.slice(0, 10) === day);
}
