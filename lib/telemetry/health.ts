import { readTelemetryCsv } from "./files";
import type { TelemetryFileRead } from "./types";

const HEALTH_FILES = [
  "live_testnet_equity.csv",
  "live_testnet_positions.csv",
  "live_testnet_orders.csv",
  "live_testnet_decisions.csv",
  "live_testnet_alerts.csv",
  "live_testnet_reconciliation.csv",
];

export async function getHealthTelemetry() {
  const files = await Promise.all(
    HEALTH_FILES.map((fileName) => readTelemetryCsv(fileName, { limit: 20 })),
  );

  return {
    status: deriveHealthStatus(files),
    lastUpdated: latestModified(files),
    files: files.map(stripRows),
    reconciliation: files.find(
      (file) => file.fileName === "live_testnet_reconciliation.csv",
    ),
  };
}

function stripRows(file: TelemetryFileRead) {
  return {
    status: file.status,
    fileName: file.fileName,
    filePath: file.filePath,
    lastModified: file.lastModified,
    rowCount: file.rowCount,
    message: file.message,
  };
}

function deriveHealthStatus(files: TelemetryFileRead[]) {
  if (files.some((file) => file.status === "PARSE_ERROR")) return "PARSE_ERROR";
  if (files.some((file) => file.status === "LIVE_FILE")) return "LIVE_FILE";
  return "MISSING_FILE";
}

function latestModified(files: TelemetryFileRead[]) {
  return (
    files
      .map((file) => file.lastModified)
      .filter((timestamp): timestamp is string => Boolean(timestamp))
      .sort((left, right) => new Date(right).getTime() - new Date(left).getTime())[0] ??
    null
  );
}
