import { getFirstValue, parseNumber, type CsvRow } from "@/lib/csv";
import { readTelemetryCsv } from "@/lib/telemetry/files";
import type { TelemetryFileRead, TelemetrySourceStatus } from "@/lib/telemetry/types";
import { alphaCandidates } from "./candidates";

export type AlphaLabSourceStatus = TelemetrySourceStatus | "STALE_FILE";

export type AlphaLabSource = {
  fileName: string;
  status: AlphaLabSourceStatus;
  lastModified: string | null;
  rowCount: number;
  message: string;
};

export type AlphaLabRegistryEntry = {
  name: string;
  slug?: string;
  family: string;
  status: string;
  stage: string;
  readiness: string;
  stability: string;
  activity: string;
  lastActivity: string | null;
  sourceStatus: AlphaLabSourceStatus;
  source: string;
};

export type AlphaLabPipelineCandidate = {
  name: string;
  status: "PASS_TO_BASELINE" | "WATCHLIST" | "REJECT";
  detail: string;
  source: string;
  sourceStatus: AlphaLabSourceStatus;
};

export type AlphaLabRegime = {
  current: string | null;
  message: string;
  transition: string;
  source: string;
  sourceStatus: AlphaLabSourceStatus;
  lastUpdate: string | null;
  scores: Array<{
    label: string;
    value: string;
    state: "online" | "standby";
    width: string;
  }>;
};

export type AlphaLabSignalHealth = {
  label: string;
  value: string;
  detail: string;
  tone: "neutral" | "good" | "warning" | "muted";
  sourceStatus: AlphaLabSourceStatus;
};

export type AlphaLabSnapshot = {
  generatedAt: string;
  sourceStatus: AlphaLabSourceStatus;
  sources: AlphaLabSource[];
  overview: {
    activePipelines: number;
    candidatesInReview: number;
    validationStages: number;
    deploymentCandidates: number;
  };
  regime: AlphaLabRegime;
  registry: AlphaLabRegistryEntry[];
  pipeline: {
    currentIndex: number;
    candidates: AlphaLabPipelineCandidate[];
    sourceStatus: AlphaLabSourceStatus;
  };
  signalHealth: AlphaLabSignalHealth[];
};

type AlphaTelemetryRead = Omit<TelemetryFileRead, "status"> & {
  status: AlphaLabSourceStatus;
};

const STALE_AFTER_MS = 12 * 60 * 60 * 1000;

const KNOWN_ALPHA_ALIASES = [
  {
    name: "Strategy A Baseline",
    slug: "strategy-a",
    family: "Baseline",
    aliases: ["strategy_a", "strategy a", "baseline"],
  },
  {
    name: "Strategy G 3.0",
    slug: "strategy-g-3",
    family: "G-Family",
    aliases: ["strategy_g_3p0", "strategy_g_3", "strategy g 3", "g 3.0"],
  },
  {
    name: "Strategy G 4.0",
    slug: "strategy-g-4",
    family: "G-Family",
    aliases: ["strategy_g_4p0", "strategy_g_4", "strategy g 4", "g 4.0"],
  },
  {
    name: "Low Dispersion Sleeve",
    slug: "low-dispersion-sleeve",
    family: "Regime Sleeve",
    aliases: ["low_dispersion", "low dispersion", "low"],
  },
  {
    name: "Mid Dispersion Sleeve",
    slug: "mid-dispersion-sleeve",
    family: "Regime Sleeve",
    aliases: ["mid_dispersion", "mid dispersion", "mid"],
  },
];

export async function getAlphaLabSnapshot(): Promise<AlphaLabSnapshot> {
  const [
    decisions,
    attribution,
    factory,
    tradeByAlpha,
    tradeByState,
    performance,
    performanceByRegime,
    rollingMetrics,
  ] = await Promise.all([
    readAlphaCsv("live_testnet_decisions.csv", 400),
    readAlphaCsv("alpha_attribution_log.csv", 500),
    readAlphaCsv("alpha_factory_v2_registry.csv", 500),
    readAlphaCsv("trade_analyzer_by_alpha.csv", 100),
    readAlphaCsv("trade_analyzer_by_state.csv", 100),
    readAlphaCsv("alpha_performance_summary.csv", 100),
    readAlphaCsv("alpha_performance_by_regime.csv", 100),
    readAlphaCsv("rolling_alpha_metrics.csv", 500),
  ]);

  const sources = [
    toSource(decisions),
    toSource(attribution),
    toSource(factory),
    toSource(tradeByAlpha),
    toSource(tradeByState),
    toSource(performance),
    toSource(performanceByRegime),
    toSource(rollingMetrics),
  ];

  const registry = buildRegistry({
    attribution,
    factory,
    tradeByAlpha,
    performance,
  });
  const pipeline = buildPipeline(factory);
  const regime = buildRegime({ decisions, performanceByRegime, tradeByState });
  const signalHealth = buildSignalHealth({
    attribution,
    tradeByAlpha,
    performance,
    rollingMetrics,
  });

  return {
    generatedAt: new Date().toISOString(),
    sourceStatus: summarizeStatus(sources),
    sources,
    overview: {
      activePipelines: registry.filter((entry) => entry.activity !== "Inactive").length,
      candidatesInReview: registry.length,
      validationStages: pipeline.candidates.length > 0 ? 4 : 0,
      deploymentCandidates: pipeline.candidates.filter(
        (candidate) => candidate.status === "PASS_TO_BASELINE",
      ).length,
    },
    regime,
    registry,
    pipeline,
    signalHealth,
  };
}

async function readAlphaCsv(fileName: string, limit: number) {
  const read = await readTelemetryCsv(fileName, { limit });
  return {
    ...read,
    status: withFreshness(read),
  };
}

function withFreshness(read: TelemetryFileRead): AlphaLabSourceStatus {
  if (read.status !== "LIVE_FILE" || !read.lastModified) return read.status;
  const modifiedAt = new Date(read.lastModified).getTime();
  if (Number.isNaN(modifiedAt)) return read.status;
  return Date.now() - modifiedAt > STALE_AFTER_MS ? "STALE_FILE" : "LIVE_FILE";
}

function toSource(read: AlphaTelemetryRead): AlphaLabSource {
  return {
    fileName: read.fileName,
    status: read.status,
    lastModified: read.lastModified,
    rowCount: read.rowCount,
    message: read.message,
  };
}

function buildRegistry({
  attribution,
  factory,
  tradeByAlpha,
  performance,
}: {
  attribution: AlphaTelemetryRead;
  factory: AlphaTelemetryRead;
  tradeByAlpha: AlphaTelemetryRead;
  performance: AlphaTelemetryRead;
}): AlphaLabRegistryEntry[] {
  const entries = KNOWN_ALPHA_ALIASES.map((known) => {
    const attributionRows = attribution.rows.filter((row) =>
      matchesKnownAlpha(getFirstValue(row, ["alpha_source", "strategy", "group"]), known.aliases),
    );
    const tradeRow = tradeByAlpha.rows.find((row) =>
      matchesKnownAlpha(getFirstValue(row, ["group", "alpha_source", "strategy"]), known.aliases),
    );
    const performanceRow = performance.rows.find((row) =>
      matchesKnownAlpha(getFirstValue(row, ["group", "alpha_source", "strategy"]), known.aliases),
    );
    const lastActivity = latestTimestamp(attributionRows);
    const events = parseNumber(getFirstValue(performanceRow ?? {}, ["events"])) ?? attributionRows.length;
    const tradeCount = parseNumber(getFirstValue(tradeRow ?? {}, ["trade_count"])) ?? 0;
    const activity = formatActivity(events, lastActivity);
    const sourceStatus = pickBestStatus([
      attributionRows.length > 0 ? attribution.status : "MISSING_FILE",
      tradeRow ? tradeByAlpha.status : "MISSING_FILE",
      performanceRow ? performance.status : "MISSING_FILE",
    ]);

    return {
      name: known.name,
      slug: known.slug,
      family: known.family,
      status: activity === "Inactive" ? "Observed / inactive" : "Observed",
      stage: tradeCount > 0 ? "Paper/Testnet" : "Research",
      readiness: tradeCount > 0 ? "Evidence logged" : "Needs samples",
      stability: stabilityFromRows(performanceRow, tradeRow),
      activity,
      lastActivity,
      sourceStatus,
      source: sourceStatus === "MOCK_FALLBACK" ? "static fallback" : "research artifacts",
    } satisfies AlphaLabRegistryEntry;
  });

  const watchlist: AlphaLabRegistryEntry[] = factory.rows
    .filter((row) => getFirstValue(row, ["classification"]) === "WATCHLIST")
    .slice(0, 3)
    .map((row) => ({
      name: getFirstValue(row, ["name"]) || "Watchlist Candidate",
      family: getFirstValue(row, ["family"]) || "Alpha Factory",
      status: "Watchlist",
      stage: "Research",
      readiness: "Monitor and paper validate",
      stability: factoryStability(row),
      activity: `${getFirstValue(row, ["regime_scope"]) || "all"} regime scope`,
      lastActivity: factory.lastModified,
      sourceStatus: factory.status,
      source: "alpha_factory_v2_registry.csv",
    }));

  const hasLiveRegistry = entries.some((entry) => entry.sourceStatus !== "MISSING_FILE");
  if (hasLiveRegistry || watchlist.length > 0) return [...entries, ...watchlist];

  return alphaCandidates.map((candidate) => ({
    name: candidate.name,
    slug: candidate.slug,
    family: candidate.family,
    status: candidate.status,
    stage: candidate.stage,
    readiness: candidate.readiness,
    stability: candidate.stability,
    activity: candidate.activity,
    lastActivity: null,
    sourceStatus: "MOCK_FALLBACK" as const,
    source: "static fallback",
  }));
}

function buildPipeline(factory: AlphaTelemetryRead) {
  const candidates = factory.rows
    .map((row) => {
      const status = normalizeFactoryStatus(getFirstValue(row, ["classification"]));
      if (!status) return null;
      return {
        name: getFirstValue(row, ["name"]) || "Alpha Factory Candidate",
        status,
        detail: getFirstValue(row, ["recommended_next_step", "reason"]) || "Awaiting review",
        source: "alpha_factory_v2_registry.csv",
        sourceStatus: factory.status,
      } satisfies AlphaLabPipelineCandidate;
    })
    .filter((candidate): candidate is AlphaLabPipelineCandidate => Boolean(candidate))
    .sort((a, b) => pipelineRank(a.status) - pipelineRank(b.status))
    .slice(0, 8);

  return {
    currentIndex: candidates.length > 0 ? 1 : 0,
    candidates,
    sourceStatus: candidates.length > 0 ? factory.status : "MOCK_FALLBACK",
  };
}

function buildRegime({
  decisions,
  performanceByRegime,
  tradeByState,
}: {
  decisions: AlphaTelemetryRead;
  performanceByRegime: AlphaTelemetryRead;
  tradeByState: AlphaTelemetryRead;
}): AlphaLabRegime {
  const latestDecision = [...decisions.rows].reverse().find((row) =>
    Boolean(getFirstValue(row, ["regime", "alpha_state", "overlay_state"])),
  );
  const liveRegime = latestDecision ? getFirstValue(latestDecision, ["regime"]) : "";

  if (latestDecision && liveRegime) {
    const normalized = formatRegime(liveRegime);
    return {
      current: normalized,
      message: "Live regime field found in decision artifact.",
      transition: getFirstValue(latestDecision, ["alpha_state", "overlay_state"]) || "Live decision context",
      source: "live_testnet_decisions.csv",
      sourceStatus: decisions.status,
      lastUpdate: getFirstValue(latestDecision, ["timestamp"]) || decisions.lastModified,
      scores: regimeScores(normalized, performanceByRegime.rows, tradeByState.rows),
    };
  }

  return {
    current: null,
    message: "No live regime artifact found",
    transition: "Research regime summaries are available, but no current live regime row was reported.",
    source: "research summaries only",
    sourceStatus:
      performanceByRegime.rows.length > 0 || tradeByState.rows.length > 0
        ? pickBestStatus([performanceByRegime.status, tradeByState.status])
        : "MISSING_FILE",
    lastUpdate: performanceByRegime.lastModified ?? tradeByState.lastModified,
    scores: regimeScores("", performanceByRegime.rows, tradeByState.rows),
  };
}

function buildSignalHealth({
  attribution,
  tradeByAlpha,
  performance,
  rollingMetrics,
}: {
  attribution: AlphaTelemetryRead;
  tradeByAlpha: AlphaTelemetryRead;
  performance: AlphaTelemetryRead;
  rollingMetrics: AlphaTelemetryRead;
}): AlphaLabSignalHealth[] {
  if (
    attribution.rows.length === 0 &&
    tradeByAlpha.rows.length === 0 &&
    performance.rows.length === 0
  ) {
    return [
      {
        label: "Signal Activity",
        value: "Unavailable",
        detail: "No live signal artifact found",
        tone: "warning",
        sourceStatus: "MISSING_FILE",
      },
    ];
  }

  const activeSources = new Set(
    attribution.rows
      .filter((row) => Math.abs(parseNumber(getFirstValue(row, ["position_size"])) ?? 0) > 0)
      .map((row) => getFirstValue(row, ["alpha_source"]))
      .filter(Boolean),
  );
  const lastActivity = latestTimestamp(attribution.rows);
  const tradeCount = sumRows(tradeByAlpha.rows, "trade_count");
  const events = sumRows(performance.rows, "events");
  const rollingActivity = averageRows(rollingMetrics.rows, "rolling_activity");

  return [
    {
      label: "Activity",
      value: activeSources.size > 0 ? `${activeSources.size} active` : "Inactive",
      detail: lastActivity ? `Last alpha activity ${formatTime(lastActivity)}` : "No timestamp",
      tone: activeSources.size > 0 ? "good" : "muted",
      sourceStatus: attribution.status,
    },
    {
      label: "Trade Samples",
      value: String(Math.round(tradeCount)),
      detail: "trade_analyzer_by_alpha.csv",
      tone: tradeCount > 0 ? "good" : "muted",
      sourceStatus: tradeByAlpha.status,
    },
    {
      label: "Attribution Events",
      value: String(Math.round(events || attribution.rows.length)),
      detail: "alpha performance / attribution rows",
      tone: events > 0 || attribution.rows.length > 0 ? "good" : "muted",
      sourceStatus: pickBestStatus([performance.status, attribution.status]),
    },
    {
      label: "Rolling Activity",
      value: rollingActivity === null ? "N/A" : `${rollingActivity.toFixed(2)}`,
      detail: "rolling_alpha_metrics.csv",
      tone: rollingActivity && rollingActivity > 0 ? "good" : "muted",
      sourceStatus: rollingMetrics.status,
    },
  ];
}

function matchesKnownAlpha(value: string, aliases: string[]) {
  const normalized = value.toLowerCase().replace(/[-\s]+/g, "_");
  return aliases.some((alias) => normalized.includes(alias.toLowerCase().replace(/[-\s]+/g, "_")));
}

function latestTimestamp(rows: CsvRow[]) {
  const timestamps = rows
    .map((row) => getFirstValue(row, ["timestamp", "time", "created_at"]))
    .filter(Boolean)
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  return timestamps.at(-1) ?? null;
}

function formatActivity(events: number, lastActivity: string | null) {
  if (!lastActivity && events === 0) return "Inactive";
  const last = lastActivity ? new Date(lastActivity).getTime() : 0;
  if (last && Date.now() - last < 24 * 60 * 60 * 1000) return "Recent activity";
  if (events > 0) return `${Math.round(events)} observed events`;
  return "Observed";
}

function stabilityFromRows(performanceRow?: CsvRow, tradeRow?: CsvRow) {
  const sharpe = parseNumber(getFirstValue(performanceRow ?? {}, ["approx_sharpe"]));
  const profitFactor = parseNumber(getFirstValue(tradeRow ?? {}, ["profit_factor"]));
  if ((profitFactor ?? 0) > 1.5) return "Resilient";
  if ((sharpe ?? 0) < 0 || (profitFactor ?? 1) < 1) return "Watch";
  return "Measured";
}

function factoryStability(row: CsvRow) {
  const reason = getFirstValue(row, ["reason"]);
  if (reason.includes("hit_rate")) return "Needs validation";
  if (reason.includes("selected_timestamps")) return "Sample limited";
  return "Watch";
}

function normalizeFactoryStatus(value: string) {
  if (value === "PASS_TO_BASELINE" || value === "WATCHLIST" || value === "REJECT") return value;
  return null;
}

function pipelineRank(status: AlphaLabPipelineCandidate["status"]) {
  if (status === "PASS_TO_BASELINE") return 0;
  if (status === "WATCHLIST") return 1;
  return 2;
}

function formatRegime(value: string) {
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function regimeScores(current: string, performanceRows: CsvRow[], stateRows: CsvRow[]) {
  const labels = ["Low", "Mid", "High"];
  return labels.map((label) => {
    const row =
      performanceRows.find((candidate) =>
        getFirstValue(candidate, ["group", "regime"]).toLowerCase().includes(label.toLowerCase()),
      ) ??
      stateRows.find((candidate) =>
        getFirstValue(candidate, ["group", "state"]).toLowerCase().includes(label.toLowerCase()),
      );
    const activity =
      parseNumber(getFirstValue(row ?? {}, ["activity_rate", "trade_count", "events"])) ?? 0;
    const width = row ? `${Math.min(82, Math.max(18, Math.round(activity * 100) || 24))}%` : "18%";
    return {
      label,
      value: current.toLowerCase().includes(label.toLowerCase()) ? "Current" : row ? "Observed" : "No live data",
      state: current.toLowerCase().includes(label.toLowerCase()) ? "online" : "standby",
      width,
    } satisfies AlphaLabRegime["scores"][number];
  });
}

function sumRows(rows: CsvRow[], column: string) {
  return rows.reduce((sum, row) => sum + (parseNumber(getFirstValue(row, [column])) ?? 0), 0);
}

function averageRows(rows: CsvRow[], column: string) {
  const values = rows
    .map((row) => parseNumber(getFirstValue(row, [column])))
    .filter((value): value is number => value !== null);
  if (values.length === 0) return null;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function pickBestStatus(statuses: AlphaLabSourceStatus[]): AlphaLabSourceStatus {
  if (statuses.includes("LIVE_FILE")) return "LIVE_FILE";
  if (statuses.includes("STALE_FILE")) return "STALE_FILE";
  if (statuses.includes("LIVE_FILE_EMPTY")) return "LIVE_FILE_EMPTY";
  if (statuses.includes("PARSE_ERROR")) return "PARSE_ERROR";
  if (statuses.includes("MOCK_FALLBACK")) return "MOCK_FALLBACK";
  return "MISSING_FILE";
}

function summarizeStatus(sources: AlphaLabSource[]): AlphaLabSourceStatus {
  return pickBestStatus(sources.map((source) => source.status));
}

function formatTime(timestamp: string) {
  const parsed = new Date(timestamp);
  if (Number.isNaN(parsed.getTime())) return timestamp;
  return parsed.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
