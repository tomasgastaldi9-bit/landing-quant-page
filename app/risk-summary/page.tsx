import {
  MetricTile,
  StatusBadge,
  StatusLed,
  TerminalPanel,
} from "@/components/dashboard/terminal-ui";
import { LegalMicrocopy } from "@/components/legal-microcopy";
import { getEquitySnapshot } from "@/lib/equity/csv-adapter";
import type { EquitySnapshot } from "@/lib/equity/types";
import { getPositionsSnapshot } from "@/lib/positions/csv-adapter";
import type { PositionRow, PositionsSnapshot } from "@/lib/positions/types";
import { getHealthTelemetry } from "@/lib/telemetry/health";
import type { TelemetrySourceStatus } from "@/lib/telemetry/types";
import Link from "next/link";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RiskSourceStatus = TelemetrySourceStatus | "STALE_FILE" | "FALLBACK_FILE";
type RiskStance = "flat" | "active" | "unavailable" | "stale";
type EnrichedPosition = PositionRow & {
  notional: number | null;
  weight: number | null;
};

const STALE_AFTER_MS = 90 * 60 * 1000;

export default async function RiskSummaryPage() {
  const [positions, equity, health] = await Promise.all([
    getPositionsSnapshot(),
    getEquitySnapshot(),
    getHealthTelemetry(),
  ]);

  const activePositions = getActivePositions(positions);
  const enrichedPositions = activePositions.map((position) =>
    enrichPosition(position, equity),
  );
  const summary = summarizeRisk(enrichedPositions, equity);
  const freshness = deriveRiskFreshness(positions, equity, health.lastUpdated);
  const stance = deriveRiskStance(positions, equity, activePositions, freshness.isStale);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] bg-[linear-gradient(rgba(255,255,255,0.026)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.026)_1px,transparent_1px)] bg-[size:32px_32px] px-4 pb-16 pt-28 text-[#e2e2e2] sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6">
        <section className="overflow-hidden rounded-[30px] border border-[#243042] bg-[radial-gradient(circle_at_18%_0%,rgb(var(--accent-primary-rgb)/0.1),transparent_30%),linear-gradient(180deg,rgba(14,14,14,0.94),rgba(5,5,5,0.84))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_24px_70px_rgba(0,0,0,0.28)] sm:p-8">
          <div className="flex flex-wrap gap-2">
            <StatusBadge tone="accent">Client View</StatusBadge>
            <StatusBadge>Read-only risk</StatusBadge>
            <StatusBadge>No execution controls</StatusBadge>
          </div>
          <div className="mt-7 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent-primary)]">
            Risk Summary
          </div>
          <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                Risk Summary
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#c2c6d8] sm:text-base">
                Client-readable overview of current model exposure, data health,
                and risk state derived from read-only bot telemetry.
              </p>
            </div>
            <div className="rounded-2xl border border-[#243042] bg-[#050505]/62 p-4 font-mono text-xs uppercase tracking-[0.12em] text-[#8c90a1]">
              <div className="flex items-center gap-3 text-[var(--accent-primary)]">
                <StatusLed state={stance === "active" || stance === "flat" ? "online" : "standby"} />
                {riskStanceLabel(stance)}
              </div>
              <div className="mt-3 normal-case leading-5 tracking-normal">
                Exposure metrics are derived only from parsed position and equity
                telemetry.
              </div>
            </div>
          </div>
        </section>

        <RiskStancePanel stance={stance} freshness={freshness} summary={summary} />

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-7">
          <MetricTile
            compact
            detail={summary.available ? "Parsed open position rows" : "Unavailable from current telemetry"}
            emphasis={summary.available}
            label="Active Positions"
            tone={summary.activePositions > 0 ? "good" : "muted"}
            value={summary.available ? String(summary.activePositions) : "Unavailable"}
          />
          <MetricTile
            compact
            detail={summary.available ? "Long notional / equity" : "Unavailable from current telemetry"}
            label="Long Exposure"
            tone={summary.longExposure > 0 ? "good" : "muted"}
            value={summary.available ? formatPercent(summary.longExposure) : "Unavailable"}
          />
          <MetricTile
            compact
            detail={summary.available ? "Short notional / equity" : "Unavailable from current telemetry"}
            label="Short Exposure"
            tone={summary.shortExposure > 0 ? "warning" : "muted"}
            value={summary.available ? formatPercent(summary.shortExposure) : "Unavailable"}
          />
          <MetricTile
            compact
            detail={summary.available ? "Long plus short exposure" : "Unavailable from current telemetry"}
            label="Gross Exposure"
            value={summary.available ? formatPercent(summary.grossExposure) : "Unavailable"}
          />
          <MetricTile
            compact
            detail={summary.available ? "Directional model bias" : "Unavailable from current telemetry"}
            label="Net Exposure"
            value={summary.available ? formatSignedPercent(summary.netExposure) : "Unavailable"}
          />
          <MetricTile
            compact
            detail={summary.available ? "Unallocated estimate" : "Unavailable from current telemetry"}
            label="Cash / Flat"
            value={summary.available ? formatPercent(summary.cashEstimate) : "Unavailable"}
          />
          <MetricTile
            compact
            detail={freshness.status.replaceAll("_", " ").toLowerCase()}
            label="Latest Update"
            value={formatTimestamp(freshness.lastUpdate)}
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <TerminalPanel
            action={summary.available ? "Telemetry-backed" : "No live rows"}
            eyebrow="Exposure Breakdown"
            priority="primary"
            title="Current Position Exposure"
          >
            {enrichedPositions.length > 0 ? (
              <ExposureTable positions={enrichedPositions} source={positions} />
            ) : (
              <ExposureEmptyState positions={positions} />
            )}
          </TerminalPanel>

          <div className="grid gap-6">
            <TerminalPanel eyebrow="Interpretation" title="Client Risk Readout" action="Read-only">
              <RiskInterpretation stance={stance} positions={positions} freshness={freshness} />
            </TerminalPanel>

            <TerminalPanel eyebrow="Sources" title="Data Freshness" action="Telemetry">
              <div className="grid gap-3">
                <SourceLine
                  label="Positions source"
                  status={deriveSourceStatus(positions.source, positions.sourceStatus, positions.lastUpdate ?? positions.fileLastModified)}
                  source={shortFileName(positions.filePath)}
                  timestamp={positions.lastUpdate ?? positions.fileLastModified}
                  message={positions.message}
                />
                <SourceLine
                  label="Equity source"
                  status={deriveSourceStatus(equity.source, equity.sourceStatus, equity.lastUpdate ?? equity.fileLastModified)}
                  source={shortFileName(equity.filePath)}
                  timestamp={equity.lastUpdate ?? equity.fileLastModified}
                  message={equity.message}
                />
                <SourceLine
                  label="Health aggregate"
                  status={deriveHealthSourceStatus(health.status as TelemetrySourceStatus, health.lastUpdated)}
                  source="live_telemetry_status.json"
                  timestamp={health.lastUpdated}
                  message="Aggregated telemetry file freshness."
                />
              </div>
            </TerminalPanel>
          </div>
        </section>

        <TerminalPanel eyebrow="Risk Disclaimer" title="Read-only risk context" action="No guarantees">
          <div className="grid gap-4 text-sm leading-6 text-[#c2c6d8] lg:grid-cols-4">
            {[
              "This is a read-only risk summary.",
              "Risk metrics are derived from available telemetry.",
              "Risk controls do not guarantee protection from losses.",
              "Crypto trading involves risk. No orders can be placed from this interface.",
            ].map((copy) => (
              <div
                className="rounded-2xl border border-[#1f1f1f]/90 bg-[#050505]/58 p-4"
                key={copy}
              >
                {copy}
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <ClientLink href="/model-portfolio" label="View Model Portfolio" />
            <ClientLink href="/performance" label="Review Performance" />
            <ClientLink href="/risk-layer" label="Inspect Operator Risk Layer" />
          </div>
          <LegalMicrocopy className="mt-5" />
        </TerminalPanel>
      </div>
    </main>
  );
}

function RiskStancePanel({
  stance,
  freshness,
  summary,
}: {
  stance: RiskStance;
  freshness: ReturnType<typeof deriveRiskFreshness>;
  summary: ReturnType<typeof summarizeRisk>;
}) {
  const content = riskStanceContent(stance);

  return (
    <section className={`rounded-[30px] border p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_24px_70px_rgba(0,0,0,0.28)] sm:p-6 ${content.panelClass}`}>
      <div className="grid gap-6 lg:grid-cols-[1fr_340px] lg:items-stretch">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent-primary)]">
            Current Risk Stance
          </div>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-[#d7dceb]">
            {content.copy}
          </p>
          <p className="mt-4 rounded-2xl border border-[#243042] bg-[#050505]/58 px-4 py-3 text-sm leading-6 text-[#c2c6d8]">
            <span className="font-semibold text-[var(--accent-primary)]">Client readout:</span>{" "}
            {content.clientReadout}
          </p>
        </div>
        <div className="flex flex-col justify-between rounded-3xl border border-[#243042] bg-[#050505]/70 p-5 font-mono text-xs uppercase tracking-[0.12em] text-[#8c90a1]">
          <div>
            <div className="text-[var(--accent-primary)]">Gross Exposure</div>
            <div className="mt-3 text-4xl font-semibold tracking-[-0.06em] text-white">
              {summary.available ? formatPercent(summary.grossExposure) : "N/A"}
            </div>
          </div>
          <div className="mt-6 grid gap-3">
            <SummaryRow label="Active positions" value={summary.available ? String(summary.activePositions) : "Unavailable"} />
            <SummaryRow label="Freshness" value={freshness.label} />
            <SummaryRow label="Last update" value={formatTimestamp(freshness.lastUpdate)} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ExposureTable({
  positions,
  source,
}: {
  positions: EnrichedPosition[];
  source: PositionsSnapshot;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#1f1f1f] bg-[#050505]/62">
      <table className="w-full min-w-[860px] border-collapse font-mono text-xs">
        <thead>
          <tr className="border-b border-[#243042] bg-[#0e0e0e]/58 text-left uppercase tracking-[0.12em] text-[#8c90a1]">
            <th className="px-3 py-3 font-medium">Symbol</th>
            <th className="px-3 py-3 font-medium">Direction</th>
            <th className="px-3 py-3 text-right font-medium">Quantity</th>
            <th className="px-3 py-3 text-right font-medium">Mark</th>
            <th className="px-3 py-3 text-right font-medium">Notional</th>
            <th className="px-3 py-3 text-right font-medium">Weight</th>
            <th className="px-3 py-3 text-right font-medium">Last Update</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((position, index) => (
            <tr
              className="border-b border-[#1f1f1f] text-[#c2c6d8] transition-colors hover:bg-[#101820]"
              key={`${position.symbol}-${position.timestamp}-${index}`}
            >
              <td className={`px-3 py-3 font-semibold ${directionClass(position.side)}`}>
                {position.symbol}
              </td>
              <td className={`px-3 py-3 ${directionClass(position.side)}`}>
                {position.side}
              </td>
              <td className="px-3 py-3 text-right">{formatNumber(position.size)}</td>
              <td className="px-3 py-3 text-right">{formatCurrency(position.mark)}</td>
              <td className="px-3 py-3 text-right">{formatCurrency(position.notional)}</td>
              <td className="px-3 py-3 text-right">{formatSignedPercent(position.weight)}</td>
              <td className="px-3 py-3 text-right text-[#8c90a1]">
                <span className="block text-[var(--accent-primary)]">
                  {source.source === "live-csv" ? "Live telemetry" : "Unavailable"}
                </span>
                <span>{formatTimestamp(position.timestamp || source.lastUpdate)}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ExposureEmptyState({ positions }: { positions: PositionsSnapshot }) {
  const liveConnected = positions.source === "live-csv";
  return (
    <div className="rounded-2xl border border-[#243042] bg-[#050505]/70 p-6">
      <div className="flex items-start gap-4">
        <StatusLed state={liveConnected ? "online" : "standby"} />
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.16em] text-white">
            No active positions detected
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#8c90a1]">
            {liveConnected
              ? "Live telemetry is connected, but no open positions were reported."
              : "Position telemetry is unavailable for a client-facing exposure summary."}
          </p>
          <p className="mt-3 max-w-2xl text-xs leading-5 text-[#747987]">
            QuantBot does not create synthetic exposure rows on this page.
          </p>
        </div>
      </div>
    </div>
  );
}

function RiskInterpretation({
  stance,
  positions,
  freshness,
}: {
  stance: RiskStance;
  positions: PositionsSnapshot;
  freshness: ReturnType<typeof deriveRiskFreshness>;
}) {
  const content = riskStanceContent(stance);
  return (
    <div className="space-y-4 text-sm leading-6 text-[#c2c6d8]">
      <p>{content.clientReadout}</p>
      <p>
        Source state:{" "}
        <span className={statusClass(freshness.status)}>
          {freshness.status.replaceAll("_", " ")}
        </span>
        .
      </p>
      <p className="rounded-2xl border border-[#1f1f1f] bg-[#050505]/70 p-4 text-[#8c90a1]">
        {positions.message}
      </p>
      <p className="text-xs leading-5 text-[#6f7485]">
        This readout does not represent a guarantee of safety or loss prevention.
      </p>
    </div>
  );
}

function SourceLine({
  label,
  status,
  source,
  timestamp,
  message,
}: {
  label: string;
  status: RiskSourceStatus;
  source: string;
  timestamp: string | null | undefined;
  message: string;
}) {
  const healthy = status === "LIVE_FILE";
  return (
    <div className="rounded-2xl border border-[#1f1f1f] bg-[#050505]/62 p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <StatusLed state={healthy ? "online" : "standby"} />
          <span className="truncate font-mono text-xs uppercase tracking-[0.12em] text-white">
            {label}
          </span>
        </div>
        <span className={`font-mono text-[10px] uppercase tracking-[0.12em] ${statusClass(status)}`}>
          {status.replaceAll("_", " ")}
        </span>
      </div>
      <div className="mt-3 grid gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-[#8c90a1]">
        <SummaryRow label="Source" value={source} />
        <SummaryRow label="Updated" value={formatTimestamp(timestamp)} />
      </div>
      <p className="mt-3 text-xs leading-5 text-[#6f7485]">{message}</p>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-[#1f1f1f]/90 bg-[#050505]/58 p-4">
      <span className="font-mono text-xs uppercase tracking-[0.12em] text-[#8c90a1]">
        {label}
      </span>
      <span className="text-right font-mono text-xs text-white">{value}</span>
    </div>
  );
}

function ClientLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      className="rounded-xl border border-[#243042] bg-[#050505]/88 px-4 py-3 text-center font-mono text-[11px] uppercase tracking-[0.12em] text-[#c2c6d8] transition-colors duration-150 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
      href={href}
    >
      {label}
    </Link>
  );
}

function getActivePositions(positions: PositionsSnapshot) {
  if (positions.source !== "live-csv") return [];
  return positions.positions.filter(isActivePosition);
}

function isActivePosition(position: PositionRow) {
  const size = position.size ?? 0;
  const side = position.side.toUpperCase();
  return Math.abs(size) > 1e-8 && side !== "FLAT";
}

function enrichPosition(position: PositionRow, equity: EquitySnapshot): EnrichedPosition {
  const size = position.size ?? null;
  const mark = position.mark ?? null;
  const notional = size !== null && mark !== null ? Math.abs(size * mark) : null;
  const equityBase = safePositive(equity.source === "live-csv" ? equity.currentEquity : null);
  const sign = position.side.toUpperCase() === "SHORT" || (size ?? 0) < 0 ? -1 : 1;
  const weight = equityBase && notional !== null ? sign * (notional / equityBase) : null;
  return { ...position, notional, weight };
}

function summarizeRisk(positions: EnrichedPosition[], equity: EquitySnapshot) {
  const equityBase = safePositive(equity.source === "live-csv" ? equity.currentEquity : null);
  const available = equityBase !== null;
  let longNotional = 0;
  let shortNotional = 0;

  for (const position of positions) {
    const notional = Math.abs(position.notional ?? 0);
    if (position.side.toUpperCase() === "SHORT" || (position.size ?? 0) < 0) {
      shortNotional += notional;
    } else {
      longNotional += notional;
    }
  }

  const longExposure = equityBase ? longNotional / equityBase : 0;
  const shortExposure = equityBase ? shortNotional / equityBase : 0;
  const grossExposure = longExposure + shortExposure;
  const netExposure = longExposure - shortExposure;
  const cashEstimate = equityBase ? Math.max(0, 1 - grossExposure) : null;

  return {
    available,
    activePositions: positions.length,
    longExposure,
    shortExposure,
    grossExposure,
    netExposure,
    cashEstimate,
  };
}

function deriveRiskFreshness(
  positions: PositionsSnapshot,
  equity: EquitySnapshot,
  healthLastUpdated: string | null,
) {
  const lastUpdate = latestTimestamp([
    positions.lastUpdate,
    positions.fileLastModified,
    equity.lastUpdate,
    equity.fileLastModified,
    healthLastUpdated,
  ]);
  const status =
    positions.sourceStatus === "PARSE_ERROR" || equity.sourceStatus === "PARSE_ERROR"
      ? "PARSE_ERROR"
      : positions.source !== "live-csv" && equity.source !== "live-csv"
        ? "FALLBACK_FILE"
        : isStale(lastUpdate)
          ? "STALE_FILE"
          : "LIVE_FILE";
  const label =
    status === "PARSE_ERROR"
      ? "Parse issue"
      : status === "FALLBACK_FILE"
        ? "Unavailable"
        : status === "STALE_FILE"
          ? "Telemetry stale"
          : "Telemetry live";
  return { status: status as RiskSourceStatus, label, lastUpdate, isStale: status === "STALE_FILE" };
}

function deriveRiskStance(
  positions: PositionsSnapshot,
  equity: EquitySnapshot,
  activePositions: PositionRow[],
  isStaleData: boolean,
): RiskStance {
  if (isStaleData) return "stale";
  if (positions.source !== "live-csv" || equity.source !== "live-csv") return "unavailable";
  if (activePositions.length === 0) return "flat";
  return "active";
}

function riskStanceContent(stance: RiskStance) {
  if (stance === "flat") {
    return {
      title: "Flat / No Active Exposure",
      copy: "The model is currently flat based on parsed position telemetry.",
      clientReadout: "No current position rows were found. The model appears flat from available telemetry.",
      panelClass: "border-[var(--accent-primary)]/36 bg-[linear-gradient(135deg,rgb(var(--accent-soft-rgb)/0.54),rgba(5,5,5,0.9))]",
    };
  }
  if (stance === "active") {
    return {
      title: "Active Exposure",
      copy: "The model has active exposure according to parsed position telemetry.",
      clientReadout: "The model has active exposure. Review the breakdown before interpreting current risk.",
      panelClass: "border-emerald-300/24 bg-[linear-gradient(135deg,rgba(16,185,129,0.1),rgba(5,5,5,0.9))]",
    };
  }
  if (stance === "stale") {
    return {
      title: "Stale Risk Data",
      copy: "Telemetry appears stale; the displayed risk state may be outdated.",
      clientReadout: "Telemetry is stale; risk state may be outdated.",
      panelClass: "border-amber-200/24 bg-[linear-gradient(135deg,rgba(251,191,36,0.1),rgba(5,5,5,0.9))]",
    };
  }
  return {
    title: "Risk Data Unavailable",
    copy: "Current risk state cannot be derived from available telemetry.",
    clientReadout: "Data is unavailable, so QuantBot cannot publish a client-facing risk stance.",
    panelClass: "border-[#243042] bg-[linear-gradient(135deg,rgba(36,48,66,0.38),rgba(5,5,5,0.9))]",
  };
}

function deriveSourceStatus(
  source: "live-csv" | "mock-fallback" | "parse-error",
  status: TelemetrySourceStatus | undefined,
  timestamp: string | null | undefined,
): RiskSourceStatus {
  if (source === "mock-fallback") return "FALLBACK_FILE";
  if (source === "parse-error") return "PARSE_ERROR";
  if (status !== "LIVE_FILE") return status ?? "MISSING_FILE";
  return isStale(timestamp) ? "STALE_FILE" : "LIVE_FILE";
}

function deriveHealthSourceStatus(
  status: TelemetrySourceStatus,
  timestamp: string | null,
): RiskSourceStatus {
  if (status !== "LIVE_FILE") return status;
  return isStale(timestamp) ? "STALE_FILE" : "LIVE_FILE";
}

function latestTimestamp(timestamps: Array<string | null | undefined>) {
  return (
    timestamps
      .filter((timestamp): timestamp is string => Boolean(timestamp))
      .sort((left, right) => new Date(right).getTime() - new Date(left).getTime())[0] ??
    null
  );
}

function isStale(timestamp: string | null | undefined) {
  if (!timestamp) return true;
  const ageMs = Date.now() - new Date(timestamp).getTime();
  return !Number.isFinite(ageMs) || ageMs > STALE_AFTER_MS;
}

function safePositive(value: number | null | undefined) {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : null;
}

function riskStanceLabel(stance: RiskStance) {
  if (stance === "flat") return "Flat / no active exposure";
  if (stance === "active") return "Active exposure";
  if (stance === "stale") return "Stale data";
  return "Data unavailable";
}

function directionClass(side: string) {
  const normalized = side.toUpperCase();
  if (normalized === "LONG") return "text-emerald-300";
  if (normalized === "SHORT") return "text-rose-300";
  return "text-[#c2c6d8]";
}

function statusClass(status: RiskSourceStatus) {
  if (status === "LIVE_FILE") return "text-emerald-300";
  if (status === "STALE_FILE" || status === "LIVE_FILE_EMPTY") return "text-amber-200";
  if (status === "PARSE_ERROR") return "text-rose-300";
  return "text-[#8c90a1]";
}

function shortFileName(path: string | undefined) {
  if (!path) return "Unavailable";
  return path.split(/[\\/]/).at(-1) ?? path;
}

function formatCurrency(value: number | null | undefined) {
  if (value === null || value === undefined || !Number.isFinite(value)) return "Unavailable";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: Math.abs(value) >= 100 ? 0 : 2,
  }).format(value);
}

function formatNumber(value: number | null | undefined) {
  if (value === null || value === undefined || !Number.isFinite(value)) return "Unavailable";
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 6,
  }).format(value);
}

function formatPercent(value: number | null | undefined) {
  if (value === null || value === undefined || !Number.isFinite(value)) return "Unavailable";
  return `${(value * 100).toFixed(2)}%`;
}

function formatSignedPercent(value: number | null | undefined) {
  if (value === null || value === undefined || !Number.isFinite(value)) return "Unavailable";
  const sign = value > 0 ? "+" : "";
  return `${sign}${(value * 100).toFixed(2)}%`;
}

function formatTimestamp(timestamp: string | null | undefined) {
  if (!timestamp) return "Unavailable";
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return "Unavailable";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}
