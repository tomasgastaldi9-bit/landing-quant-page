import { getFirstValue, normalizeTimestamp } from "@/lib/csv";
import { readTelemetryCsv } from "@/lib/telemetry/files";
import type { TelemetryFileRead, TelemetrySourceStatus } from "@/lib/telemetry/types";

type SignalArtifactName = "live_testnet_decisions.csv" | "live_testnet_orders.csv";

export type SignalHistorySourceStatus =
  | TelemetrySourceStatus
  | "STALE_FILE"
  | "FALLBACK_FILE";

export type SignalHistoryRow = {
  id: string;
  timestamp: string;
  symbol: string;
  action: string;
  previousState: string;
  newState: string;
  sourceSleeve: string;
  status: string;
  artifactSource: SignalArtifactName;
  eventType: "Decision" | "Order";
};

export type SignalHistorySource = {
  artifactSource: SignalArtifactName;
  status: SignalHistorySourceStatus;
  lastModified: string | null;
  rowCount: number;
  message: string;
};

export type SignalHistorySnapshot = {
  rows: SignalHistoryRow[];
  sources: SignalHistorySource[];
  summary: {
    totalEvents: number | null;
    latestSignalTime: string | null;
    activeSymbolsTouched: number | null;
    executedCount: number | null;
    plannedCount: number | null;
  };
};

const STALE_AFTER_MS = 90 * 60 * 1000;

const TIMESTAMP_COLUMNS = ["timestamp", "time", "datetime", "date", "created_at"];
const SYMBOL_COLUMNS = ["symbol", "ticker", "instrument", "asset", "pair"];
const DECISION_ACTION_COLUMNS = [
  "action",
  "decision",
  "signal",
  "target_action",
  "recommended_action",
  "alpha_state",
  "overlay_state",
  "side",
  "order_side",
  "position_side",
];
const ORDER_ACTION_COLUMNS = ["order_side", "side", "type", "action", "order_type"];
const PREVIOUS_COLUMNS = [
  "previous_state",
  "prev_state",
  "previous_side",
  "previous_position",
  "from_state",
];
const NEW_STATE_COLUMNS = [
  "new_state",
  "target_state",
  "target",
  "target_side",
  "to_state",
  "position_side",
  "side",
  "order_side",
];
const SOURCE_COLUMNS = [
  "sleeve",
  "alpha",
  "strategy",
  "strategy_name",
  "source",
  "mode",
  "regime",
];
const STATUS_COLUMNS = [
  "final_order_status",
  "status",
  "cycle_status",
  "exchange_filter_status",
  "execution_status",
  "order_status",
];

export async function getSignalHistorySnapshot(
  limit = 160,
): Promise<SignalHistorySnapshot> {
  const [decisions, orders] = await Promise.all([
    readTelemetryCsv("live_testnet_decisions.csv", { limit }),
    readTelemetryCsv("live_testnet_orders.csv", { limit }),
  ]);

  const decisionRows = decisions.rows
    .map((row, index) =>
      toSignalHistoryRow(row, index, "Decision", "live_testnet_decisions.csv"),
    )
    .filter((row): row is SignalHistoryRow => Boolean(row));
  const orderRows = orders.rows
    .map((row, index) => toSignalHistoryRow(row, index, "Order", "live_testnet_orders.csv"))
    .filter((row): row is SignalHistoryRow => Boolean(row));

  const rows = [...decisionRows, ...orderRows]
    .sort((left, right) => toTime(right.timestamp) - toTime(left.timestamp))
    .slice(0, limit);

  return {
    rows,
    sources: [toSignalSource(decisions), toSignalSource(orders)],
    summary: summarizeSignalRows(rows),
  };
}

function toSignalHistoryRow(
  row: Record<string, string>,
  index: number,
  eventType: SignalHistoryRow["eventType"],
  artifactSource: SignalArtifactName,
): SignalHistoryRow | null {
  const rawTimestamp = getFirstValue(row, TIMESTAMP_COLUMNS);
  const timestamp = normalizeTimestamp(rawTimestamp);
  const symbol = getFirstValue(row, SYMBOL_COLUMNS);
  const action = getFirstValue(
    row,
    eventType === "Decision" ? DECISION_ACTION_COLUMNS : ORDER_ACTION_COLUMNS,
  );
  const status = getFirstValue(row, STATUS_COLUMNS);
  const previousState = getFirstValue(row, PREVIOUS_COLUMNS);
  const newState = getFirstValue(row, NEW_STATE_COLUMNS);
  const sourceSleeve = getFirstValue(row, SOURCE_COLUMNS);

  if (!timestamp || (!symbol && !action && !status && !sourceSleeve)) {
    return null;
  }

  return {
    id: `${artifactSource}-${timestamp}-${symbol || "no-symbol"}-${action || status || "event"}-${index}`,
    timestamp,
    symbol: symbol || "Universe",
    action: normalizeDisplay(action || (eventType === "Order" ? "Order event" : "Decision event")),
    previousState: normalizeDisplay(previousState) || "Unavailable",
    newState: normalizeDisplay(newState) || "Unavailable",
    sourceSleeve: normalizeDisplay(sourceSleeve) || "Source file",
    status: normalizeDisplay(status) || "Informational",
    artifactSource,
    eventType,
  };
}

function toSignalSource(source: TelemetryFileRead): SignalHistorySource {
  return {
    artifactSource: source.fileName as SignalArtifactName,
    status: deriveSourceStatus(source),
    lastModified: source.lastModified,
    rowCount: source.rowCount,
    message: source.message,
  };
}

function deriveSourceStatus(source: TelemetryFileRead): SignalHistorySourceStatus {
  if (source.status !== "LIVE_FILE") return source.status;
  if (!source.lastModified) return source.status;

  const ageMs = Date.now() - new Date(source.lastModified).getTime();
  if (!Number.isFinite(ageMs)) return source.status;
  return ageMs > STALE_AFTER_MS ? "STALE_FILE" : "LIVE_FILE";
}

function summarizeSignalRows(rows: SignalHistoryRow[]): SignalHistorySnapshot["summary"] {
  if (rows.length === 0) {
    return {
      totalEvents: null,
      latestSignalTime: null,
      activeSymbolsTouched: null,
      executedCount: null,
      plannedCount: null,
    };
  }

  const symbols = new Set(
    rows
      .map((row) => row.symbol)
      .filter((symbol) => symbol && symbol.toLowerCase() !== "universe"),
  );
  const executedCount = rows.filter((row) => isExecuted(row.status)).length;
  const plannedCount = rows.filter((row) => isPlanned(row.status, row.eventType)).length;

  return {
    totalEvents: rows.length,
    latestSignalTime: rows[0]?.timestamp ?? null,
    activeSymbolsTouched: symbols.size,
    executedCount,
    plannedCount,
  };
}

function isExecuted(status: string) {
  const normalized = status.toLowerCase();
  return ["filled", "executed", "closed", "success"].some((token) =>
    normalized.includes(token),
  );
}

function isPlanned(status: string, eventType: SignalHistoryRow["eventType"]) {
  const normalized = status.toLowerCase();
  return (
    eventType === "Decision" ||
    ["planned", "pending", "submitted", "signal", "decision", "evaluated"].some((token) =>
      normalized.includes(token),
    )
  );
}

function normalizeDisplay(value: string) {
  return value
    .replaceAll("_", " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function toTime(timestamp: string) {
  const time = new Date(timestamp).getTime();
  return Number.isFinite(time) ? time : 0;
}
