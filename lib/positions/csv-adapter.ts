import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { getFirstValue, normalizeTimestamp, parseCsv, parseNumber } from "@/lib/csv";
import { getMockPositionsSnapshot } from "./mock-positions";
import type { PositionRow, PositionsSnapshot } from "./types";

const SYMBOL_COLUMNS = ["symbol", "ticker", "instrument", "market", "pair"];
const SIDE_COLUMNS = ["side", "direction", "position_side"];
const SIZE_COLUMNS = ["size", "qty", "quantity", "position_size", "amount"];
const ENTRY_COLUMNS = ["entry", "entry_price", "avg_entry", "average_entry_price"];
const MARK_COLUMNS = ["mark", "mark_price", "current_price", "price", "last_price"];
const PNL_COLUMNS = ["unrealized_pnl", "upnl", "pnl", "unrealized", "unrealized_profit"];
const TIMESTAMP_COLUMNS = ["timestamp", "time", "updated_at", "datetime", "date"];

export async function getPositionsSnapshot(): Promise<PositionsSnapshot> {
  const csvPath = path.join(process.cwd(), "output", "live_testnet_positions.csv");

  if (!existsSync(csvPath)) {
    return getMockPositionsSnapshot(
      `Positions CSV not found at ${csvPath}. Showing mock fallback positions.`,
    );
  }

  try {
    const csv = await readFile(csvPath, "utf8");
    const positions = parsePositionsCsv(csv);

    if (positions.length === 0) {
      return getMockPositionsSnapshot(
        "Positions CSV exists but no position rows could be parsed.",
      );
    }

    return {
      source: "live-csv",
      positions,
      lastUpdate: findLatestTimestamp(positions),
      message: `Loaded ${positions.length} positions from CSV.`,
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? `Failed to read positions CSV: ${error.message}`
        : "Failed to read positions CSV.";

    return getMockPositionsSnapshot(message);
  }
}

function parsePositionsCsv(csv: string): PositionRow[] {
  return parseCsv(csv)
    .map((row) => {
      const symbol = getFirstValue(row, SYMBOL_COLUMNS);
      if (!symbol) return null;

      const rawTimestamp = getFirstValue(row, TIMESTAMP_COLUMNS);

      return {
        symbol,
        side: getFirstValue(row, SIDE_COLUMNS) || "Unknown",
        size: parseNumber(getFirstValue(row, SIZE_COLUMNS)),
        entry: parseNumber(getFirstValue(row, ENTRY_COLUMNS)),
        mark: parseNumber(getFirstValue(row, MARK_COLUMNS)),
        unrealizedPnl: parseNumber(getFirstValue(row, PNL_COLUMNS)),
        timestamp: rawTimestamp ? normalizeTimestamp(rawTimestamp) : "",
      };
    })
    .filter((position): position is PositionRow => position !== null);
}

function findLatestTimestamp(positions: PositionRow[]) {
  const timestamps = positions
    .map((position) => position.timestamp)
    .filter(Boolean)
    .sort((left, right) => new Date(right).getTime() - new Date(left).getTime());

  return timestamps[0] ?? null;
}
