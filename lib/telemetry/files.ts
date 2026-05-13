import { access, readFile, stat } from "node:fs/promises";
import { constants } from "node:fs";
import { parseCsv } from "@/lib/csv";
import { resolveTelemetryFile } from "./config";
import type { TelemetryFileRead } from "./types";

export async function readTelemetryCsv(
  fileName: string,
  options: { limit?: number } = {},
): Promise<TelemetryFileRead> {
  const filePath = resolveTelemetryFile(fileName);
  const limit = options.limit ?? 250;

  try {
    await access(filePath, constants.R_OK);
  } catch {
    return {
      status: "MISSING_FILE",
      fileName,
      filePath,
      lastModified: null,
      rowCount: 0,
      rows: [],
      message: `${fileName} is not available. Using mock fallback where supported.`,
    };
  }

  try {
    const [csv, fileStat] = await Promise.all([readFile(filePath, "utf8"), stat(filePath)]);
    const parsedRows = parseCsv(csv);
    const rows = limitRows(parsedRows, limit);

    return {
      status: parsedRows.length > 0 ? "LIVE_FILE" : "LIVE_FILE_EMPTY",
      fileName,
      filePath,
      lastModified: fileStat.mtime.toISOString(),
      rowCount: parsedRows.length,
      rows,
      message:
        parsedRows.length > 0
          ? `Loaded ${rows.length} of ${parsedRows.length} rows from ${fileName}.`
          : `${fileName} exists but no CSV rows could be parsed.`,
    };
  } catch (error) {
    return {
      status: "PARSE_ERROR",
      fileName,
      filePath,
      lastModified: null,
      rowCount: 0,
      rows: [],
      message:
        error instanceof Error
          ? `Failed to parse ${fileName}: ${error.message}`
          : `Failed to parse ${fileName}.`,
    };
  }
}

function limitRows<T>(rows: T[], limit: number) {
  if (rows.length <= limit) return rows;
  return rows.slice(-limit);
}
