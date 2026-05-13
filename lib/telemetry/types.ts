export type TelemetrySourceStatus =
  | "LIVE_FILE"
  | "LIVE_FILE_EMPTY"
  | "MISSING_FILE"
  | "PARSE_ERROR"
  | "MOCK_FALLBACK";

export type TelemetryFileRead = {
  status: TelemetrySourceStatus;
  fileName: string;
  filePath: string;
  lastModified: string | null;
  rowCount: number;
  message: string;
  rows: Record<string, string>[];
};

export type TelemetryEventSeverity =
  | "sys"
  | "risk"
  | "exec"
  | "alpha"
  | "alert"
  | "error";

export type TelemetryEvent = {
  timestamp: string;
  time: string;
  type: TelemetryEventSeverity;
  source: string;
  message: string;
  symbol?: string;
  status?: string;
};
