import {
  MetricTile,
  StatusBadge,
  StatusLed,
  TerminalPanel,
} from "@/components/dashboard/terminal-ui";
import { LegalMicrocopy } from "@/components/legal-microcopy";
import { getEquitySnapshot } from "@/lib/equity/csv-adapter";
import type { EquityPoint, EquitySnapshot } from "@/lib/equity/types";
import type { TelemetrySourceStatus } from "@/lib/telemetry/types";
import Link from "next/link";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type PerformanceSourceStatus = TelemetrySourceStatus | "STALE_FILE" | "FALLBACK_FILE";

const STALE_AFTER_MS = 90 * 60 * 1000;
const RECENT_SNAPSHOT_LIMIT = 8;

export default async function PerformancePage() {
  const equity = await getEquitySnapshot();
  const realPoints = equity.source === "live-csv" ? equity.points : [];
  const metrics = derivePerformanceMetrics(realPoints);
  const hasEnoughHistory = realPoints.length >= 2;
  const sourceStatus = deriveSourceStatus(equity);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] bg-[linear-gradient(rgba(255,255,255,0.026)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.026)_1px,transparent_1px)] bg-[size:32px_32px] px-4 pb-16 pt-28 text-[#e2e2e2] sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6">
        <section className="overflow-hidden rounded-[30px] border border-[#243042] bg-[radial-gradient(circle_at_18%_0%,rgb(var(--accent-primary-rgb)/0.1),transparent_30%),linear-gradient(180deg,rgba(14,14,14,0.94),rgba(5,5,5,0.84))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_24px_70px_rgba(0,0,0,0.28)] sm:p-8">
          <div className="flex flex-wrap gap-2">
            <StatusBadge tone="accent">Client View</StatusBadge>
            <StatusBadge>Read-only performance</StatusBadge>
            <StatusBadge>No execution controls</StatusBadge>
          </div>
          <div className="mt-7 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent-primary)]">
            Performance
          </div>
          <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                Performance
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#c2c6d8] sm:text-base">
                Read-only model/testnet performance derived from available bot
                telemetry. QuantBot does not publish synthetic returns or infer
                missing equity history.
              </p>
            </div>
            <div className="rounded-2xl border border-[#243042] bg-[#050505]/62 p-4 font-mono text-xs uppercase tracking-[0.12em] text-[#8c90a1]">
              <div className="flex items-center gap-3 text-[var(--accent-primary)]">
                <StatusLed state={hasEnoughHistory ? "online" : "standby"} />
                {hasEnoughHistory ? "Performance history loaded" : "Insufficient telemetry history"}
              </div>
              <div className="mt-3 normal-case leading-5 tracking-normal">
                Performance metrics are calculated only from parsed equity points.
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
          <MetricTile
            compact
            detail={hasEnoughHistory ? "Latest parsed equity" : "Insufficient telemetry history"}
            emphasis={hasEnoughHistory}
            label="Current Equity"
            tone={hasEnoughHistory ? "good" : "muted"}
            value={hasEnoughHistory ? formatCurrency(metrics.currentEquity) : "Unavailable"}
          />
          <MetricTile
            compact
            detail={hasEnoughHistory ? "First parsed equity point" : "Insufficient telemetry history"}
            label="Starting Equity"
            value={hasEnoughHistory ? formatCurrency(metrics.startingEquity) : "Unavailable"}
          />
          <MetricTile
            compact
            detail={hasEnoughHistory ? "Derived from start/current equity" : "Insufficient telemetry history"}
            label="Total Return"
            tone={getReturnTone(metrics.totalReturn)}
            value={hasEnoughHistory ? formatPercent(metrics.totalReturn) : "Unavailable"}
          />
          <MetricTile
            compact
            detail={hasEnoughHistory ? "Peak-to-trough from parsed series" : "Insufficient telemetry history"}
            label="Max Drawdown"
            tone={metrics.maxDrawdown !== null && metrics.maxDrawdown < 0 ? "warning" : "muted"}
            value={hasEnoughHistory ? formatPercent(metrics.maxDrawdown) : "Unavailable"}
          />
          <MetricTile
            compact
            detail={hasEnoughHistory ? "Latest equity timestamp" : "Insufficient telemetry history"}
            label="Latest Update"
            value={hasEnoughHistory ? formatTimestamp(metrics.latestUpdate) : "Unavailable"}
          />
          <MetricTile
            compact
            detail={sourceStatus.replaceAll("_", " ").toLowerCase()}
            label="Data Source"
            value={equity.source === "live-csv" ? "Live CSV" : "Unavailable"}
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.45fr_0.55fr]">
          <TerminalPanel
            action={hasEnoughHistory ? "Telemetry-backed" : "Collecting"}
            eyebrow="Equity Curve"
            priority="primary"
            title="Performance History"
          >
            {hasEnoughHistory ? (
              <EquityPerformanceChart points={realPoints} />
            ) : (
              <PerformanceEmptyState />
            )}
          </TerminalPanel>

          <div className="grid gap-6">
            <TerminalPanel eyebrow="Drawdown / Risk" title="Performance Risk" action="Derived">
              {hasEnoughHistory ? (
                <div className="space-y-4">
                  <RiskLine label="Peak Equity" value={formatCurrency(metrics.peakEquity)} />
                  <RiskLine label="Lowest Drawdown" value={formatPercent(metrics.maxDrawdown)} />
                  <RiskLine label="Equity Points" value={String(realPoints.length)} />
                  <p className="rounded-2xl border border-[#1f1f1f] bg-[#050505]/70 p-4 text-sm leading-6 text-[#8c90a1]">
                    Drawdown is derived directly from the parsed equity series and is
                    not a forecast or guarantee.
                  </p>
                </div>
              ) : (
                <UnavailablePanel copy="Drawdown is unavailable until at least two real equity points are parsed." />
              )}
            </TerminalPanel>

            <TerminalPanel eyebrow="Source" title="Data Freshness" action="Read-only">
              <SourceFreshness equity={equity} sourceStatus={sourceStatus} />
            </TerminalPanel>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <TerminalPanel
            action={hasEnoughHistory ? `Latest ${Math.min(realPoints.length, RECENT_SNAPSHOT_LIMIT)}` : "Unavailable"}
            eyebrow="Recent Snapshots"
            title="Recent Equity Points"
          >
            {hasEnoughHistory ? (
              <RecentSnapshots points={realPoints.slice(-RECENT_SNAPSHOT_LIMIT).reverse()} />
            ) : (
              <UnavailablePanel copy="Recent snapshots will appear when real equity history is available." />
            )}
          </TerminalPanel>

          <TerminalPanel eyebrow="Client Notes" title="How to read this page" action="No execution">
            <div className="space-y-3 text-sm leading-6 text-[#c2c6d8]">
              <p>
                Performance is read-only and derived from available telemetry source
                files.
              </p>
              <p>
                Demo/Testnet performance may differ from real execution and cannot
                be traded from this interface.
              </p>
              <p className="rounded-2xl border border-[#1f1f1f] bg-[#050505]/70 p-4 text-[#8c90a1]">
                Past performance does not guarantee future results. For research and
                informational purposes only.
              </p>
            </div>
            <div className="mt-5 grid gap-2">
              <ClientLink href="/model-portfolio" label="View Model Portfolio" />
              <ClientLink href="/signals" label="Review Signals" />
              <ClientLink href="/request-access" label="Request Access" />
            </div>
            <LegalMicrocopy className="mt-4" />
          </TerminalPanel>
        </section>
      </div>
    </main>
  );
}

function EquityPerformanceChart({ points }: { points: EquityPoint[] }) {
  const chart = buildEquityChart(points);
  const first = points[0];
  const last = points.at(-1);

  return (
    <div className="rounded-2xl border border-[#1f1f1f] bg-[#050505]/62 p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.12em] text-[#8c90a1]">
        <span>Start: {formatCurrency(first?.equity ?? null)}</span>
        <span className="text-[var(--accent-primary)]">
          Last: {formatCurrency(last?.equity ?? null)}
        </span>
      </div>
      <svg
        aria-label="Telemetry-backed equity performance curve"
        className="h-[260px] w-full overflow-visible"
        preserveAspectRatio="none"
        role="img"
        viewBox="0 0 1000 260"
      >
        <defs>
          <linearGradient id="performanceFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgb(var(--accent-primary-rgb))" stopOpacity="0.18" />
            <stop offset="100%" stopColor="rgb(var(--accent-primary-rgb))" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[40, 95, 150, 205].map((y) => (
          <line
            key={y}
            stroke="rgba(255,255,255,0.06)"
            strokeDasharray="4 8"
            strokeWidth="1"
            x1="0"
            x2="1000"
            y1={y}
            y2={y}
          />
        ))}
        <path d={chart.areaPath} fill="url(#performanceFill)" />
        <path
          d={chart.linePath}
          fill="none"
          stroke="rgb(var(--accent-primary-rgb))"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />
        <circle
          cx={chart.lastPoint.x}
          cy={chart.lastPoint.y}
          fill="#050505"
          r="6"
          stroke="rgb(var(--accent-primary-rgb))"
          strokeWidth="3"
        />
      </svg>
    </div>
  );
}

function PerformanceEmptyState() {
  return (
    <div className="rounded-2xl border border-[#243042] bg-[#050505]/70 p-6">
      <div className="flex items-start gap-4">
        <StatusLed state="standby" />
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.16em] text-white">
            Collecting telemetry history.
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#8c90a1]">
            Performance chart will appear after enough real equity points are
            available.
          </p>
          <p className="mt-3 max-w-2xl text-xs leading-5 text-[#747987]">
            QuantBot does not show synthetic charts or inferred returns on this
            client page.
          </p>
        </div>
      </div>
    </div>
  );
}

function SourceFreshness({
  equity,
  sourceStatus,
}: {
  equity: EquitySnapshot;
  sourceStatus: PerformanceSourceStatus;
}) {
  const healthy = sourceStatus === "LIVE_FILE";
  return (
    <div className="rounded-2xl border border-[#1f1f1f] bg-[#050505]/62 p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <StatusLed state={healthy ? "online" : "standby"} />
          <span className="truncate font-mono text-xs uppercase tracking-[0.12em] text-white">
            Performance source
          </span>
        </div>
        <span className={`font-mono text-[10px] uppercase tracking-[0.12em] ${statusClass(sourceStatus)}`}>
          {sourceStatus.replaceAll("_", " ")}
        </span>
      </div>
      <div className="mt-3 grid gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-[#8c90a1]">
        <RiskLine label="Source file" value={shortFileName(equity.filePath)} />
        <RiskLine label="Latest update" value={formatTimestamp(equity.lastUpdate)} />
        <RiskLine label="File modified" value={formatTimestamp(equity.fileLastModified)} />
      </div>
      <p className="mt-3 text-xs leading-5 text-[#6f7485]">{equity.message}</p>
    </div>
  );
}

function RecentSnapshots({ points }: { points: EquityPoint[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#1f1f1f] bg-[#050505]/62">
      <table className="w-full min-w-[620px] border-collapse font-mono text-xs">
        <thead>
          <tr className="border-b border-[#243042] bg-[#0e0e0e]/58 text-left uppercase tracking-[0.12em] text-[#8c90a1]">
            <th className="px-3 py-3 font-medium">Timestamp</th>
            <th className="px-3 py-3 text-right font-medium">Equity</th>
            <th className="px-3 py-3 text-right font-medium">Wallet</th>
            <th className="px-3 py-3 text-right font-medium">Unrealized PnL</th>
          </tr>
        </thead>
        <tbody>
          {points.map((point, index) => (
            <tr
              className="border-b border-[#1f1f1f] text-[#c2c6d8] transition-colors hover:bg-[#101820]"
              key={`${point.timestamp}-${index}`}
            >
              <td className="px-3 py-3 text-[#8c90a1]">{formatTimestamp(point.timestamp)}</td>
              <td className="px-3 py-3 text-right text-white">{formatCurrency(point.equity)}</td>
              <td className="px-3 py-3 text-right">{formatCurrency(point.walletBalance ?? null)}</td>
              <td className={`px-3 py-3 text-right ${pnlClass(point.unrealizedPnl ?? null)}`}>
                {formatCurrency(point.unrealizedPnl ?? null)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RiskLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-[#1f1f1f]/90 bg-[#050505]/58 p-4">
      <span className="font-mono text-xs uppercase tracking-[0.12em] text-[#8c90a1]">
        {label}
      </span>
      <span className="text-right font-mono text-xs text-white">{value}</span>
    </div>
  );
}

function UnavailablePanel({ copy }: { copy: string }) {
  return (
    <div className="rounded-2xl border border-[#243042] bg-[#050505]/70 p-4 text-sm leading-6 text-[#8c90a1]">
      {copy}
    </div>
  );
}

function ClientLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      className="rounded-xl border border-[#243042] bg-[#050505]/88 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-[#c2c6d8] transition-colors duration-150 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
      href={href}
    >
      {label}
    </Link>
  );
}

function derivePerformanceMetrics(points: EquityPoint[]) {
  if (points.length < 2) {
    return {
      currentEquity: null,
      startingEquity: null,
      totalReturn: null,
      maxDrawdown: null,
      peakEquity: null,
      latestUpdate: null,
    };
  }

  const startingEquity = points[0].equity;
  const currentEquity = points.at(-1)?.equity ?? null;
  let peak = startingEquity;
  let maxDrawdown = 0;

  for (const point of points) {
    peak = Math.max(peak, point.equity);
    const drawdown = peak > 0 ? (point.equity - peak) / peak : 0;
    maxDrawdown = Math.min(maxDrawdown, drawdown);
  }

  return {
    currentEquity,
    startingEquity,
    totalReturn:
      currentEquity !== null && startingEquity > 0
        ? (currentEquity - startingEquity) / startingEquity
        : null,
    maxDrawdown,
    peakEquity: peak,
    latestUpdate: points.at(-1)?.timestamp ?? null,
  };
}

function buildEquityChart(points: EquityPoint[]) {
  const width = 1000;
  const height = 260;
  const top = 24;
  const bottom = 28;
  const values = points.map((point) => point.equity);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const rawRange = max - min;
  const minimumRange = Math.max(Math.abs(max) * 0.002, 1);
  const range = Math.max(rawRange, minimumRange);
  const midpoint = (min + max) / 2;
  const scaledMin = midpoint - range / 2;
  const scaledMax = midpoint + range / 2;
  const plotHeight = height - top - bottom;

  const coordinates = points.map((point, index) => {
    const x = points.length === 1 ? 0 : (index / (points.length - 1)) * width;
    const y = top + (1 - (point.equity - scaledMin) / (scaledMax - scaledMin)) * plotHeight;
    return { x, y };
  });

  const linePath = coordinates
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`)
    .join(" ");
  const areaPath = `${linePath} L ${width} ${height - bottom} L 0 ${height - bottom} Z`;

  return {
    linePath,
    areaPath,
    lastPoint: coordinates.at(-1) ?? { x: 0, y: height / 2 },
  };
}

function deriveSourceStatus(equity: EquitySnapshot): PerformanceSourceStatus {
  if (equity.source === "mock-fallback") return "FALLBACK_FILE";
  if (equity.sourceStatus !== "LIVE_FILE") return equity.sourceStatus ?? "MISSING_FILE";
  const timestamp = equity.fileLastModified ?? equity.lastUpdate;
  if (!timestamp) return "LIVE_FILE";
  const ageMs = Date.now() - new Date(timestamp).getTime();
  if (!Number.isFinite(ageMs)) return "LIVE_FILE";
  return ageMs > STALE_AFTER_MS ? "STALE_FILE" : "LIVE_FILE";
}

function getReturnTone(value: number | null) {
  if (value === null) return "muted";
  if (value > 0) return "good";
  if (value < 0) return "warning";
  return "muted";
}

function statusClass(status: PerformanceSourceStatus) {
  if (status === "LIVE_FILE") return "text-emerald-300";
  if (status === "STALE_FILE" || status === "LIVE_FILE_EMPTY") return "text-[var(--accent-primary)]";
  if (status === "PARSE_ERROR") return "text-rose-300";
  return "text-[#8c90a1]";
}

function pnlClass(value: number | null) {
  if (value === null || value === 0) return "text-[#c2c6d8]";
  return value > 0 ? "text-emerald-300" : "text-rose-300";
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

function formatPercent(value: number | null | undefined) {
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
