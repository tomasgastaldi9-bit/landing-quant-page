import { getFirstValue, normalizeTimestamp, parseCsv, parseNumber } from "@/lib/csv";
import { readTelemetryCsv } from "@/lib/telemetry/files";
import { getMockPositionsSnapshot } from "./mock-positions";
import type { PositionRow, PositionsSnapshot } from "./types";

const SYMBOL_COLUMNS = ["symbol", "ticker", "instrument", "market", "pair"];
const SIDE_COLUMNS = ["side", "direction", "position_side"];
const SIZE_COLUMNS = ["size", "qty", "quantity", "position_size", "amount", "position_amt", "positionamt"];
const ENTRY_COLUMNS = ["entry", "entry_price", "entryprice", "avg_entry", "average_entry_price"];
const MARK_COLUMNS = ["mark", "mark_price", "markprice", "current_price", "price", "last_price"];
const PNL_COLUMNS = ["unrealized_pnl", "upnl", "pnl", "unrealized", "unrealized_profit", "unrealizedprofit"];
const TIMESTAMP_COLUMNS = ["timestamp", "time", "updated_at", "datetime", "date"];

export async function getPositionsSnapshot(): Promise<PositionsSnapshot> {
  const source = await readPreferredPositionsCsv();

  if (source.status === "MISSING_FILE") {
    return {
      ...getMockPositionsSnapshot(source.message),
      sourceStatus: "MISSING_FILE",
      filePath: source.filePath,
      fileLastModified: source.lastModified,
    };
  }

  if (source.status === "PARSE_ERROR") {
    return {
      ...getMockPositionsSnapshot(source.message),
      source: "parse-error",
      sourceStatus: "PARSE_ERROR",
      filePath: source.filePath,
      fileLastModified: source.lastModified,
    };
  }

  const positions = parsePositionsRows(source.rows);

  if (positions.length === 0) {
    return {
      ...getMockPositionsSnapshot("Positions CSV exists but no position rows could be parsed."),
      source: "parse-error",
      sourceStatus: "PARSE_ERROR",
      filePath: source.filePath,
      fileLastModified: source.lastModified,
    };
  }

  return {
    source: "live-csv",
    sourceStatus: "LIVE_FILE",
    positions,
    lastUpdate: findLatestTimestamp(positions),
    message: source.message,
    filePath: source.filePath,
    fileLastModified: source.lastModified,
  };
}

async function readPreferredPositionsCsv() {
  const liveTelemetry = await readTelemetryCsv("live_telemetry_positions.csv", { limit: 250 });
  if (liveTelemetry.status !== "MISSING_FILE") return liveTelemetry;
  return readTelemetryCsv("live_testnet_positions.csv", { limit: 250 });
}

function parsePositionsRows(rows: ReturnType<typeof parseCsv>): PositionRow[] {
  return rows
    .map((row) => {
      const symbol = getFirstValue(row, SYMBOL_COLUMNS);
      if (!symbol) return null;

      const rawTimestamp = getFirstValue(row, TIMESTAMP_COLUMNS);

      const size = parseNumber(getFirstValue(row, SIZE_COLUMNS));

      return {
        symbol,
        side: normalizeSide(getFirstValue(row, SIDE_COLUMNS), size),
        size,
        entry: parseNumber(getFirstValue(row, ENTRY_COLUMNS)),
        mark: parseNumber(getFirstValue(row, MARK_COLUMNS)),
        unrealizedPnl: parseNumber(getFirstValue(row, PNL_COLUMNS)),
        timestamp: rawTimestamp ? normalizeTimestamp(rawTimestamp) : "",
      };
    })
    .filter((position): position is PositionRow => position !== null);
}

function normalizeSide(side: string, size: number | null) {
  const normalized = side.toUpperCase();
  if (normalized === "LONG" || normalized === "SHORT" || normalized === "FLAT") {
    return normalized;
  }

  if (size !== null) {
    if (size > 0) return "LONG";
    if (size < 0) return "SHORT";
    return "FLAT";
  }

  return side || "UNKNOWN";
}

function findLatestTimestamp(positions: PositionRow[]) {
  const timestamps = positions
    .map((position) => position.timestamp)
    .filter(Boolean)
    .sort((left, right) => new Date(right).getTime() - new Date(left).getTime());

  return timestamps[0] ?? null;
}
