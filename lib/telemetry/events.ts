import { getFirstValue, normalizeTimestamp } from "@/lib/csv";
import { readTelemetryCsv } from "./files";
import type { TelemetryEvent, TelemetryEventSeverity, TelemetryFileRead } from "./types";

const TIMESTAMP_COLUMNS = ["timestamp", "time", "datetime", "date"];
const STATUS_COLUMNS = ["final_order_status", "status", "cycle_status", "exchange_filter_status"];
const SYMBOL_COLUMNS = ["symbol", "ticker", "instrument"];
const MESSAGE_COLUMNS = ["message", "error", "error_message", "reason", "event"];

export type TelemetryEventsResponse = {
  status: TelemetryFileRead["status"];
  source: TelemetryFileRead;
  events: TelemetryEvent[];
};

export async function getOrdersTelemetry(limit = 80): Promise<TelemetryEventsResponse> {
  const source = await readTelemetryCsv("live_testnet_orders.csv", { limit });

  return {
    status: source.status,
    source,
    events: source.rows.map((row) => toEvent(row, "exec", "orders")),
  };
}

export async function getDecisionsTelemetry(limit = 80): Promise<TelemetryEventsResponse> {
  const source = await readTelemetryCsv("live_testnet_decisions.csv", { limit });

  return {
    status: source.status,
    source,
    events: source.rows.map((row) => toEvent(row, "alpha", "decisions")),
  };
}

export async function getAlertsTelemetry(limit = 80): Promise<TelemetryEventsResponse> {
  const source = await readTelemetryCsv("live_testnet_alerts.csv", { limit });

  return {
    status: source.status,
    source,
    events: source.rows.map((row) => {
      const level = getFirstValue(row, ["level"]).toLowerCase();
      return toEvent(
        row,
        level === "error" ? "error" : level === "warning" ? "alert" : "sys",
        "alerts",
      );
    }),
  };
}

export async function getCombinedEventStream(limit = 30) {
  const [orders, decisions, alerts] = await Promise.all([
    getOrdersTelemetry(limit),
    getDecisionsTelemetry(limit),
    getAlertsTelemetry(limit),
  ]);
  const events = [...orders.events, ...decisions.events, ...alerts.events]
    .filter((event) => event.timestamp)
    .sort(
      (left, right) =>
        new Date(right.timestamp).getTime() - new Date(left.timestamp).getTime(),
    )
    .slice(0, limit);

  return {
    status: deriveCombinedStatus([orders.status, decisions.status, alerts.status]),
    events,
    sources: {
      orders: orders.source,
      decisions: decisions.source,
      alerts: alerts.source,
    },
  };
}

function toEvent(
  row: Record<string, string>,
  type: TelemetryEventSeverity,
  fallbackSource: string,
): TelemetryEvent {
  const timestamp = normalizeTimestamp(getFirstValue(row, TIMESTAMP_COLUMNS));
  const symbol = getFirstValue(row, SYMBOL_COLUMNS);
  const status = getFirstValue(row, STATUS_COLUMNS);
  const source = getFirstValue(row, ["source", "strategy", "mode"]) || fallbackSource;
  const message = buildEventMessage(row, type, symbol, status);

  return {
    timestamp,
    time: formatEventTime(timestamp),
    type,
    source,
    message,
    symbol: symbol || undefined,
    status: status || undefined,
  };
}

function buildEventMessage(
  row: Record<string, string>,
  type: TelemetryEventSeverity,
  symbol: string,
  status: string,
) {
  const explicit = getFirstValue(row, MESSAGE_COLUMNS);
  if (explicit) return explicit;

  if (type === "exec") {
    const side = getFirstValue(row, ["order_side", "side"]);
    const quantity = getFirstValue(row, ["quantity", "normalized_quantity", "raw_quantity"]);
    return `${status || "ORDER"} ${side || "route"} ${symbol || "instrument"} ${quantity || ""}`.trim();
  }

  if (type === "alpha") {
    const regime = getFirstValue(row, ["regime"]);
    const state = getFirstValue(row, ["alpha_state", "overlay_state"]);
    return `Decision cycle ${status || "evaluated"} ${symbol || "universe"} ${regime || state || ""}`.trim();
  }

  return `${status || "Telemetry event"} ${symbol || ""}`.trim();
}

function formatEventTime(timestamp: string) {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return "--:--:--.000";

  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    fractionalSecondDigits: 3,
    hour12: false,
  }).format(date);
}

function deriveCombinedStatus(statuses: TelemetryFileRead["status"][]) {
  if (statuses.some((status) => status === "LIVE_FILE")) return "LIVE_FILE";
  if (statuses.some((status) => status === "PARSE_ERROR")) return "PARSE_ERROR";
  if (statuses.some((status) => status === "MOCK_FALLBACK")) return "MOCK_FALLBACK";
  return "MISSING_FILE";
}
