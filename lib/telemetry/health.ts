import { access, stat } from "node:fs/promises";
import { constants } from "node:fs";
import { resolveTelemetryFile } from "./config";
import { readTelemetryCsv } from "./files";
import type { TelemetryFileRead } from "./types";

const HEALTH_FILES = [
  "live_telemetry_equity.csv",
  "live_telemetry_positions.csv",
  "live_telemetry_prices.csv",
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
  const statusFile = await readTelemetryStatusFile();

  return {
    status: deriveHealthStatus(files),
    lastUpdated: latestModified(files, statusFile.lastModified),
    files: [...files.map(stripRows), statusFile],
    reconciliation: files.find(
      (file) => file.fileName === "live_testnet_reconciliation.csv",
    ),
  };
}

async function readTelemetryStatusFile() {
  const fileName = "live_telemetry_status.json";
  const filePath = resolveTelemetryFile(fileName);

  try {
    await access(filePath, constants.R_OK);
    const fileStat = await stat(filePath);
    return {
      status: "LIVE_FILE",
      fileName,
      filePath,
      lastModified: fileStat.mtime.toISOString(),
      rowCount: 1,
      message: `${fileName} is available.`,
    };
  } catch {
    return {
      status: "MISSING_FILE",
      fileName,
      filePath,
      lastModified: null,
      rowCount: 0,
      message: `${fileName} is not available.`,
    };
  }
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

function latestModified(files: TelemetryFileRead[], extraTimestamp: string | null = null) {
  return (
    [...files.map((file) => file.lastModified), extraTimestamp]
      .filter((timestamp): timestamp is string => Boolean(timestamp))
      .sort((left, right) => new Date(right).getTime() - new Date(left).getTime())[0] ??
    null
  );
}
