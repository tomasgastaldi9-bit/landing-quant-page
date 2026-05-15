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

type AllocationRow = PositionRow & {
  notional: number | null;
  weight: number | null;
};

export default async function ModelPortfolioPage() {
  const [equity, positions, health] = await Promise.all([
    getEquitySnapshot(),
    getPositionsSnapshot(),
    getHealthTelemetry(),
  ]);

  const livePositions = positions.source === "live-csv" ? positions.positions : [];
  const allocationRows = livePositions
    .filter(isActivePosition)
    .map((position) => enrichAllocation(position, equity));
  const summary = summarizeAllocation(allocationRows, equity);
  const freshness = deriveFreshness(equity, positions, health.lastUpdated);
  const isFlat = summary.activeSymbols === 0 && summary.cashEstimate === 1;
  const hasLiveTelemetry =
    equity.source === "live-csv" || positions.source === "live-csv" || health.status === "LIVE_FILE";

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] bg-[linear-gradient(rgba(255,255,255,0.026)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.026)_1px,transparent_1px)] bg-[size:32px_32px] px-4 pb-16 pt-28 text-[#e2e2e2] sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6">
        <section className="overflow-hidden rounded-[30px] border border-[#243042] bg-[radial-gradient(circle_at_18%_0%,rgb(var(--accent-primary-rgb)/0.1),transparent_30%),linear-gradient(180deg,rgba(14,14,14,0.94),rgba(5,5,5,0.82))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_24px_70px_rgba(0,0,0,0.32)] sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap gap-2">
                <StatusBadge tone="accent">Model Portfolio</StatusBadge>
                <StatusBadge>Read-only strategy output</StatusBadge>
                <StatusBadge>Demo / Testnet mode</StatusBadge>
              </div>
              <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                Model Portfolio
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#c2c6d8]">
                A client-facing view of the strategy&apos;s current read-only
                output: whether the model is allocated, flat, or waiting for
                the next confirmed telemetry cycle.
              </p>
            </div>
            <div className="rounded-2xl border border-[#243042] bg-[#050505]/52 p-4 font-mono text-xs uppercase tracking-[0.12em] text-[#8c90a1]">
              <div className="text-[10px] tracking-[0.2em] text-[#6f7485]">Read-only</div>
              <div className="mt-3 flex items-center gap-3 text-[var(--accent-primary)]">
                <StatusLed state={hasLiveTelemetry ? "online" : "standby"} />
                No trading controls
              </div>
              <div className="mt-3 normal-case leading-5 tracking-normal text-[#8c90a1]">
                Telemetry-backed model output. Freshness details stay available below for audit transparency.
              </div>
            </div>
          </div>
        </section>

        <ModelStateBanner
          isFlat={isFlat}
          summary={summary}
          freshnessLabel={freshness.label}
        />

        <WhatThisMeansPanel isFlat={isFlat} summary={summary} />

        <section>
          <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent-primary)]">
                Exposure Details
              </div>
              <h2 className="mt-1 text-xl font-semibold text-white">
                Secondary telemetry metrics
              </h2>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#6f7485]">
              Read-only / no execution controls
            </div>
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
          <MetricTile
            compact
            detail={summary.activeSymbols === 0 ? "No symbols currently selected" : "Symbols with parsed exposure"}
            emphasis
            label="Active Symbols"
            tone={allocationRows.length > 0 ? "good" : "muted"}
            value={String(summary.activeSymbols)}
          />
          <MetricTile
            compact
            detail={summary.longExposure > 0 ? "Model has long exposure" : "No current long allocation"}
            label="Long Exposure"
            tone={summary.longExposure > 0 ? "good" : "muted"}
            value={formatPercent(summary.longExposure)}
          />
          <MetricTile
            compact
            detail={summary.shortExposure > 0 ? "Model has short exposure" : "No current short allocation"}
            label="Short Exposure"
            tone={summary.shortExposure > 0 ? "warning" : "muted"}
            value={formatPercent(summary.shortExposure)}
          />
          <MetricTile
            compact
            detail={summary.grossExposure > 0 ? "Total active exposure" : "No deployed exposure"}
            label="Gross Exposure"
            value={formatPercent(summary.grossExposure)}
          />
          <MetricTile
            compact
            detail={summary.netExposure === 0 ? "No directional bias" : "Directional model bias"}
            label="Net Exposure"
            value={formatSignedPercent(summary.netExposure)}
          />
          <MetricTile
            compact
            detail={
              summary.cashEstimate === null
                ? "Not safely derivable"
                : summary.cashEstimate === 1
                  ? "Effectively fully flat"
                  : "Unallocated model capital"
            }
            label="Flat / Cash"
            value={summary.cashEstimate === null ? "Unavailable" : formatPercent(summary.cashEstimate)}
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <TerminalPanel
            action={positions.source === "live-csv" ? "Telemetry loaded" : "Fallback / unavailable"}
            eyebrow="Current Allocation"
            priority="primary"
            title="Model Allocation Table"
          >
            <AllocationTable
              allocationRows={allocationRows}
              positions={positions}
              equity={equity}
            />
          </TerminalPanel>

          <div className="grid gap-6">
            <TerminalPanel action="Read-only" eyebrow="Summary" title="Portfolio Summary">
              <div className="grid gap-3">
                <SummaryRow label="Active model rows" value={String(summary.activeSymbols)} />
                <SummaryRow label="Flat symbols" value={summary.flatSymbolsLabel} />
                <SummaryRow label="Position source" value={sourceLabel(positions.sourceStatus)} />
                <SummaryRow label="Equity source" value={sourceLabel(equity.sourceStatus)} />
                <SummaryRow label="Last position update" value={formatTimestamp(positions.lastUpdate)} />
                <SummaryRow label="Last equity update" value={formatTimestamp(equity.lastUpdate)} />
              </div>
            </TerminalPanel>

            <TerminalPanel action={freshness.status} eyebrow="Source" title="Telemetry Freshness">
              <div className="space-y-4">
                <FreshnessLine
                  label="Positions feed"
                  status={positions.sourceStatus ?? "MOCK_FALLBACK"}
                  timestamp={positions.lastUpdate ?? positions.fileLastModified}
                />
                <FreshnessLine
                  label="Equity feed"
                  status={equity.sourceStatus ?? "MOCK_FALLBACK"}
                  timestamp={equity.lastUpdate ?? equity.fileLastModified}
                />
                <FreshnessLine
                  label="Health aggregate"
                  status={health.status as TelemetrySourceStatus}
                  timestamp={health.lastUpdated}
                />
              </div>
            </TerminalPanel>
          </div>
        </section>

        <TerminalPanel action="Client Notes" eyebrow="Interpretation" title="How to read this page">
          <div className="grid gap-4 text-sm leading-6 text-[#c2c6d8] lg:grid-cols-4">
            {[
              "This page shows read-only model output.",
              "No orders can be placed here.",
              "Allocations appear only when telemetry contains active model exposure.",
              "Demo/Testnet mode unless explicitly configured otherwise.",
            ].map((copy) => (
              <div
                className="rounded-2xl border border-[#1f1f1f]/90 bg-[#050505]/58 p-4"
                key={copy}
              >
                {copy}
              </div>
            ))}
          </div>
          <Link
            className="mt-5 inline-flex rounded-2xl border border-[var(--accent-primary)]/45 bg-[var(--accent-soft)] px-5 py-3 font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent-primary)] transition hover:border-[var(--accent-primary)]"
            href="/monitoring"
          >
            Inspect telemetry health
          </Link>
          <LegalMicrocopy className="mt-5" />
        </TerminalPanel>
      </div>
    </main>
  );
}

function ModelStateBanner({
  isFlat,
  summary,
  freshnessLabel,
}: {
  isFlat: boolean;
  summary: ReturnType<typeof summarizeAllocation>;
  freshnessLabel: string;
}) {
  if (isFlat) {
    return (
      <section className="rounded-[30px] border border-[var(--accent-primary)]/40 bg-[linear-gradient(135deg,rgb(var(--accent-soft-rgb)/0.68),rgba(5,5,5,0.9)_50%,rgba(14,26,22,0.74))] p-5 shadow-[inset_0_1px_0_rgb(var(--accent-primary-rgb)/0.1),0_24px_72px_rgba(0,0,0,0.34)] sm:p-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_340px] lg:items-stretch">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent-primary)]">
              Current Model Stance
            </div>
            <h2 className="mt-3 font-mono text-4xl font-semibold tracking-[-0.06em] text-white sm:text-5xl">
              FLAT / CASH
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-[#d5cfbf]">
              No active model exposure. There is no current long or short allocation to copy.
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl border border-white/8 bg-black/24 p-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8d8267]">
                  Allocation to copy
                </div>
                <div className="mt-2 text-sm font-semibold text-white">None right now</div>
                <p className="mt-1 text-xs leading-5 text-[#8f94a3]">
                  The model is not publishing active long or short exposure from the parsed telemetry.
                </p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-black/24 p-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8d8267]">
                  Waiting for
                </div>
                <div className="mt-2 text-sm font-semibold text-white">Next valid cycle</div>
                <p className="mt-1 text-xs leading-5 text-[#8f94a3]">
                  The strategy is standing by until telemetry contains a valid model allocation.
                </p>
              </div>
            </div>
            <div className="mt-4 rounded-2xl border border-[var(--accent-primary)]/32 bg-[rgb(var(--accent-primary-rgb)/0.08)] px-4 py-3 text-sm leading-6 text-[#e6dcc4]">
              <span className="font-semibold text-[var(--accent-primary)]">Client action:</span>{" "}
              Stand by / remain flat. Suggested action: no model rebalance currently available.
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-3xl border border-[var(--accent-primary)]/24 bg-[#050505]/70 p-5 font-mono text-xs uppercase tracking-[0.12em] text-[#8c90a1]">
            <div>
              <div className="text-[var(--accent-primary)]">Cash / Flat Estimate</div>
              <div className="mt-3 text-4xl font-semibold tracking-[-0.06em] text-white">
                {formatPercent(summary.cashEstimate)}
              </div>
            </div>
            <div className="mt-6 grid gap-3">
              <SummaryRow label="Active symbols" value={String(summary.activeSymbols)} />
              <SummaryRow label="Gross exposure" value={formatPercent(summary.grossExposure)} />
              <SummaryRow label="Freshness" value={freshnessLabel} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-[26px] border border-emerald-300/22 bg-[linear-gradient(135deg,rgba(16,185,129,0.1),rgba(5,5,5,0.84))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.045),0_18px_54px_rgba(0,0,0,0.24)] sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-300">
            Current Model Stance
          </div>
          <h2 className="mt-2 text-3xl font-semibold text-white">
            ACTIVE / ALLOCATED
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[#c2c6d8]">
            Parsed telemetry currently contains active model exposure. Review
            the allocation table for symbols, direction, and derived weights.
          </p>
          <div className="mt-4 rounded-2xl border border-emerald-300/24 bg-[rgba(110,231,183,0.08)] px-4 py-3 text-sm leading-6 text-[#d8eadf]">
            <span className="font-semibold text-emerald-300">Client action:</span>{" "}
            Review the current allocation. No orders can be placed from this page.
          </div>
        </div>
        <div className="rounded-2xl border border-[#243042] bg-[#050505]/70 px-4 py-3 font-mono text-xs uppercase tracking-[0.12em] text-[#8c90a1]">
          <div className="text-emerald-300">Gross Exposure</div>
          <div className="mt-1 text-2xl font-semibold text-white">
            {formatPercent(summary.grossExposure)}
          </div>
          <div className="mt-2">{freshnessLabel}</div>
        </div>
      </div>
    </section>
  );
}

function WhatThisMeansPanel({
  isFlat,
  summary,
}: {
  isFlat: boolean;
  summary: ReturnType<typeof summarizeAllocation>;
}) {
  const rows = isFlat
    ? [
        ["No active symbols", "0"],
        ["No long exposure", formatPercent(summary.longExposure)],
        ["No short exposure", formatPercent(summary.shortExposure)],
        ["Portfolio state", "Effectively 100% cash / flat based on parsed telemetry"],
      ]
    : [
        ["Active symbols", String(summary.activeSymbols)],
        ["Long exposure", formatPercent(summary.longExposure)],
        ["Short exposure", formatPercent(summary.shortExposure)],
        ["Portfolio state", "Allocated according to parsed telemetry"],
      ];

  return (
    <TerminalPanel action="Plain English" eyebrow="Client View" title="What this means right now">
      <div className="grid gap-3">
        {rows.map(([label, value]) => (
          <SummaryRow key={label} label={label} value={value} />
        ))}
      </div>
      <p className="mt-5 text-xs leading-5 text-[#7d8290]">
        This is a read-only interpretation of the parsed model state. It does not place orders,
        infer missing allocations, or turn a flat state into a signal.
      </p>
    </TerminalPanel>
  );
}

function AllocationTable({
  allocationRows,
  positions,
  equity,
}: {
  allocationRows: AllocationRow[];
  positions: PositionsSnapshot;
  equity: EquitySnapshot;
}) {
  if (allocationRows.length === 0) {
    return (
      <div className="rounded-2xl border border-[#243042] bg-[#050505]/70 p-6">
        <div className="flex items-start gap-4">
          <StatusLed state={positions.source === "live-csv" ? "standby" : "online"} />
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.16em] text-white">
              No active model allocation found
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#8c90a1]">
              This is expected when the strategy is flat. The model may be waiting for the next
              valid signal or cycle before publishing exposure.
            </p>
            <p className="mt-3 max-w-2xl text-xs leading-5 text-[#747987]">
              {positions.source === "live-csv"
                ? "Telemetry is live, so this reflects the latest parsed model state."
                : "Telemetry is not currently live; no synthetic allocation is shown."}
            </p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--accent-primary)]">
              {positions.message}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-[#1f1f1f] bg-[#050505]/62">
      <table className="w-full min-w-[820px] border-collapse font-mono text-xs">
        <thead>
          <tr className="border-b border-[#243042] bg-[#0e0e0e]/58 text-left uppercase tracking-[0.12em] text-[#8c90a1]">
            <th className="px-3 py-3 font-medium">Symbol</th>
            <th className="px-3 py-3 font-medium">Direction</th>
            <th className="px-3 py-3 text-right font-medium">Exposure / Weight</th>
            <th className="px-3 py-3 text-right font-medium">Notional</th>
            <th className="px-3 py-3 text-right font-medium">Position</th>
            <th className="px-3 py-3 text-right font-medium">Mark</th>
            <th className="px-3 py-3 text-right font-medium">Source / Freshness</th>
          </tr>
        </thead>
        <tbody>
          {allocationRows.map((position, index) => (
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
              <td className="px-3 py-3 text-right">
                {position.weight === null ? "Unavailable" : formatSignedPercent(position.weight)}
              </td>
              <td className="px-3 py-3 text-right">{formatCurrency(position.notional)}</td>
              <td className="px-3 py-3 text-right">{formatNumber(position.size)}</td>
              <td className="px-3 py-3 text-right">{formatCurrency(position.mark)}</td>
              <td className="px-3 py-3 text-right text-[#8c90a1]">
                <span className="block text-[var(--accent-primary)]">
                  {equity.source === "live-csv" ? "Live telemetry" : "Position feed"}
                </span>
                <span>{formatFreshness(position.timestamp)}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function summarizeAllocation(rows: AllocationRow[], equity: EquitySnapshot) {
  const equityBase = safePositive(equity.currentEquity);
  let longNotional = 0;
  let shortNotional = 0;
  for (const row of rows) {
    const notional = Math.abs(row.notional ?? 0);
    if (row.side.toUpperCase() === "SHORT" || (row.size ?? 0) < 0) {
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
    activeSymbols: rows.length,
    longExposure,
    shortExposure,
    grossExposure,
    netExposure,
    cashEstimate,
    flatSymbolsLabel: rows.length === 0 ? "All reported flat" : "Unreported / flat",
  };
}

function enrichAllocation(position: PositionRow, equity: EquitySnapshot): AllocationRow {
  const size = position.size ?? null;
  const mark = position.mark ?? null;
  const notional = size !== null && mark !== null ? Math.abs(size * mark) : null;
  const equityBase = safePositive(equity.currentEquity);
  const sign = position.side.toUpperCase() === "SHORT" || (size ?? 0) < 0 ? -1 : 1;
  const weight = equityBase && notional !== null ? sign * (notional / equityBase) : null;
  return { ...position, notional, weight };
}

function isActivePosition(position: PositionRow) {
  const size = position.size ?? 0;
  const side = position.side.toUpperCase();
  return Math.abs(size) > 1e-8 && side !== "FLAT";
}

function deriveFreshness(
  equity: EquitySnapshot,
  positions: PositionsSnapshot,
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
      ? "parse-error"
      : positions.sourceStatus === "MISSING_FILE" && equity.sourceStatus === "MISSING_FILE"
        ? "missing"
        : isStale(lastUpdate)
          ? "stale"
          : "live";
  const label =
    status === "parse-error"
      ? "Telemetry parse issue"
      : status === "missing"
        ? "Telemetry missing"
        : status === "stale"
          ? "Telemetry stale"
          : "Telemetry live";
  return { status, label, lastUpdate };
}

function FreshnessLine({
  label,
  status,
  timestamp,
}: {
  label: string;
  status: TelemetrySourceStatus;
  timestamp: string | null | undefined;
}) {
  const healthy = status === "LIVE_FILE" || status === "LIVE_FILE_EMPTY";
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-[#1f1f1f]/90 bg-[#050505]/58 p-4">
      <div className="flex min-w-0 items-center gap-3">
        <StatusLed state={healthy && !isStale(timestamp) ? "online" : "standby"} />
        <span className="truncate font-mono text-xs uppercase tracking-[0.12em] text-white">
          {label}
        </span>
      </div>
      <div className="text-right font-mono text-[11px] uppercase tracking-[0.1em] text-[#8c90a1]">
        <div className="text-[var(--accent-primary)]">{sourceLabel(status)}</div>
        <div className="mt-1">{formatFreshness(timestamp)}</div>
      </div>
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

function safePositive(value: number | null | undefined) {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : null;
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
  return !Number.isFinite(ageMs) || ageMs > 90 * 60 * 1000;
}

function formatFreshness(timestamp: string | null | undefined) {
  if (!timestamp) return "missing";
  const ageMs = Date.now() - new Date(timestamp).getTime();
  if (!Number.isFinite(ageMs)) return "unknown";
  const minutes = Math.max(0, Math.floor(ageMs / 60000));
  if (minutes < 1) return "fresh";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 48) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
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

function sourceLabel(status: TelemetrySourceStatus | undefined) {
  if (!status) return "Unavailable";
  return status
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function directionClass(side: string) {
  const normalized = side.toUpperCase();
  if (normalized === "LONG") return "text-emerald-300";
  if (normalized === "SHORT") return "text-rose-300";
  return "text-[#c2c6d8]";
}
