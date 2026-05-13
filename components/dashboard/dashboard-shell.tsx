import {
  DataModeBadge,
  MetricTile,
  StatusBadge,
  StatusLed,
  TerminalPanel,
} from "@/components/dashboard/terminal-ui";
import {
  MiniBarMeter,
  TerminalChartFrame,
} from "@/components/charts/terminal-charts";
import type { EquitySnapshot } from "@/lib/equity/types";
import type { PositionRow, PositionsSnapshot } from "@/lib/positions/types";
import type { TelemetryEvent, TelemetrySourceStatus } from "@/lib/telemetry/types";
import Link from "next/link";

const exposureMetrics = [
  {
    label: "Gross Exposure",
    value: "$1.24M",
    detail: "Demo notional",
    href: "/risk-layer",
  },
  {
    label: "Net Exposure",
    value: "$182K",
    detail: "Long bias",
    href: "/risk-layer",
  },
  {
    label: "Leverage",
    value: "1.8x",
    detail: "Policy cap 3.0x",
    href: "/risk-layer",
  },
  {
    label: "Open Risk",
    value: "Low",
    detail: "Within limits",
    href: "/risk-layer",
  },
];

const mockLogs: TelemetryEvent[] = [
  {
    timestamp: "2026-05-08T14:03:21.842Z",
    time: "14:03:21.842",
    type: "risk",
    source: "risk-policy",
    message: "Position policy check passed",
  },
  {
    timestamp: "2026-05-08T14:03:09.118Z",
    time: "14:03:09.118",
    type: "exec",
    source: "testnet-router",
    message: "Demo order routed to testnet venue",
  },
  {
    timestamp: "2026-05-08T14:02:48.504Z",
    time: "14:02:48.504",
    type: "alpha",
    source: "alpha-engine",
    message: "Momentum signal weight reduced",
  },
  {
    timestamp: "2026-05-08T14:02:17.093Z",
    time: "14:02:17.093",
    type: "sys",
    source: "market-data",
    message: "Market data heartbeat normal",
  },
  {
    timestamp: "2026-05-08T14:01:54.770Z",
    time: "14:01:54.770",
    type: "alert",
    source: "exposure-watch",
    message: "Exposure drift below alert threshold",
  },
  {
    timestamp: "2026-05-08T14:01:22.611Z",
    time: "14:01:22.611",
    type: "risk",
    source: "risk-policy",
    message: "Reduce-only guard remains armed",
  },
  {
    timestamp: "2026-05-08T14:00:58.406Z",
    time: "14:00:58.406",
    type: "exec",
    source: "testnet-router",
    message: "No live capital route available",
  },
];

const health = [
  { label: "Market Data", value: "24ms", state: "online" },
  { label: "Risk Engine", value: "OK", state: "online" },
  { label: "Execution Sim", value: "Testnet", state: "online" },
  { label: "Model Runner", value: "Idle", state: "standby" },
];

const alphaModules = [
  { name: "Trend Regime", state: "Active", confidence: "Medium" },
  { name: "Mean Reversion", state: "Standby", confidence: "Low" },
  { name: "Volatility Filter", state: "Active", confidence: "High" },
];

export function DashboardShell({
  equitySnapshot,
  positionsSnapshot,
  telemetryEvents = [],
  eventSourceStatus = "MOCK_FALLBACK",
  healthSourceStatus,
  apiLastUpdated,
}: {
  equitySnapshot: EquitySnapshot;
  positionsSnapshot: PositionsSnapshot;
  telemetryEvents?: TelemetryEvent[];
  eventSourceStatus?: TelemetrySourceStatus;
  healthSourceStatus?: TelemetrySourceStatus | null;
  apiLastUpdated?: string | null;
}) {
  const equityMetrics = [
    {
      label: "Equity Source",
      value: formatCurrency(equitySnapshot.currentEquity),
      detail:
        equitySnapshot.source === "live-csv" ? "From live CSV" : "Mock fallback",
    },
    {
      label: "Daily PnL",
      value: formatSignedCurrency(equitySnapshot.dailyPnl),
      detail: equitySnapshot.dailyPnl === null ? "Unavailable" : "Simple day delta",
    },
    {
      label: "Last Update",
      value: formatTime(equitySnapshot.lastUpdate),
      detail: formatDate(equitySnapshot.lastUpdate),
    },
    {
      label: "Data Source",
      value: equitySnapshot.source === "live-csv" ? "CSV" : "Mock",
      detail:
        equitySnapshot.source === "live-csv"
          ? "Read-only adapter"
          : "Fallback mode",
    },
  ];
  const openPositions = positionsSnapshot.positions.filter(
    (position) => position.side !== "FLAT",
  ).length;
  const liveSource =
    equitySnapshot.source === "live-csv" || positionsSnapshot.source === "live-csv";
  const hasParseError =
    equitySnapshot.source === "parse-error" || positionsSnapshot.source === "parse-error";
  const dataModeSource = hasParseError
    ? "parse-error"
    : liveSource
      ? "live-csv"
      : "mock-fallback";

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:32px_32px] text-[#e2e2e2]">
      <header className="border-b border-[#243042]/80 bg-[#0b0b0b]/72 shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-md">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-5 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent-primary)]">
                QuantBot
              </div>
              <div className="mt-1 text-lg font-semibold text-white">
                Dashboard / Terminal
              </div>
            </div>
            <Link
              href="/demo-testnet"
              className="rounded-xl border border-[#424655] bg-[#0e0e0e] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent-primary)] transition duration-200 hover:border-[var(--accent-primary)] hover:bg-[var(--accent-soft)] lg:hidden"
            >
              Demo
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[#c2c6d8]">
            <Link href="/demo-testnet"><StatusBadge>Demo / Testnet</StatusBadge></Link>
            <DataModeBadge source={dataModeSource} />
            <Link href="/demo-testnet"><StatusBadge>Research Mode</StatusBadge></Link>
            <StatusBadge>Not Financial Advice</StatusBadge>
            <a
              href="/request-access"
              className="rounded-xl border border-[var(--accent-secondary)]/90 bg-[linear-gradient(135deg,var(--accent-secondary),var(--accent-strong))] px-3 py-2 text-white shadow-[0_12px_28px_rgb(var(--accent-secondary-rgb)/0.2)] transition duration-200 hover:-translate-y-px hover:brightness-110"
            >
              Request Access
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-4 py-5 sm:px-6 lg:py-7">
        <section className="mb-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent-primary)]">
                Execution / Risk Monitoring
              </div>
              <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-normal text-white sm:text-5xl">
                QuantBot Operator Terminal
              </h1>
            </div>
            <p className="max-w-xl font-mono text-xs leading-6 text-[#8c90a1]">
              Equity panel reads local testnet CSV output when available.
              Trading, risk, execution, and scheduler systems remain untouched.
            </p>
          </div>
          <div className="mt-5 grid gap-3 rounded-2xl border border-[var(--accent-primary)]/30 bg-[linear-gradient(135deg,rgb(var(--accent-soft-rgb)/0.72),rgba(10,10,10,0.68))] p-3 shadow-[inset_0_1px_0_rgb(var(--accent-primary-rgb)/0.08),0_18px_50px_rgba(0,0,0,0.22)] sm:grid-cols-[auto_1fr] sm:items-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-[var(--accent-primary)]/45 bg-[#050505]/72 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--accent-primary)]">
              <StatusLed state={liveSource ? "online" : "standby"} />
              Read-only terminal
            </div>
            <div className="font-mono text-[11px] uppercase leading-5 tracking-[0.12em] text-[#c2c6d8]">
              Equity:{" "}
              <span className="text-[var(--accent-primary)]">
                {equitySnapshot.source === "live-csv" ? "live CSV" : "mock fallback"}
              </span>
              . Positions:{" "}
              <span className="text-[var(--accent-primary)]">
                {positionsSnapshot.source === "live-csv"
                  ? "live CSV"
                  : "mock fallback"}
              </span>
              . {equitySnapshot.message}
              {apiLastUpdated ? ` Last updated: ${formatDateTime(apiLastUpdated)}.` : ""}
              {equitySnapshot.source === "mock-fallback"
                ? " Configure QUANTBOT_OUTPUT_DIR or place CSVs in ../crypto_bot/output to enable live telemetry."
                : ""}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <MetricTile
            label="Equity"
            value={formatCurrency(equitySnapshot.currentEquity)}
            detail={formatTime(equitySnapshot.lastUpdate)}
            emphasis
            compact
          />
          <MetricTile
            label="Data Mode"
            value={liveSource ? "Live" : "Mock"}
            detail={hasParseError ? "Parse error" : liveSource ? "Testnet CSV" : "Fallback"}
            tone={hasParseError ? "warning" : liveSource ? "good" : "muted"}
            compact
          />
          <MetricTile
            label="Risk State"
            value="Low"
            detail="Within limits"
            tone="good"
            compact
          />
          <MetricTile
            label="Open Positions"
            value={String(openPositions)}
            detail={`${positionsSnapshot.positions.length} tracked`}
            compact
          />
          <MetricTile
            label="System Status"
            value="OK"
            detail="3 online / 1 idle"
            tone="good"
            compact
          />
        </section>

        <section className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {equityMetrics.map((metric) => (
            <MetricTile key={metric.label} {...metric} compact />
          ))}
        </section>

        <section className="mt-4 grid grid-cols-1 items-start gap-3 xl:grid-cols-[1.45fr_0.55fr]">
          <div className="grid gap-3">
            <TerminalPanel
              eyebrow="Equity Curve"
              title="Testnet Equity"
              action={equitySnapshot.source === "live-csv" ? "CSV loaded" : "Fallback"}
              className="self-start"
              priority="primary"
            >
              <EquityChart points={equitySnapshot.points} />
            </TerminalPanel>
            <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {exposureMetrics.map((metric) => (
                <MetricTile key={metric.label} {...metric} />
              ))}
            </section>
          </div>
          <div className="grid gap-3">
            <RegimePanel />
            <RiskMonitor />
          </div>
        </section>

        <section className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-[1fr_0.75fr]">
          <TerminalPanel
            id="positions"
            eyebrow="Positions"
            title="Active Positions"
            action={
              positionsSnapshot.source === "live-csv"
                ? "LIVE TESTNET DATA"
                : "MOCK DATA FALLBACK"
            }
            priority="primary"
            className="scroll-mt-32"
          >
            <PositionsTable positions={positionsSnapshot.positions} />
            <div className="mt-3 rounded-xl border border-[#243042] bg-[#050505] px-3 py-2 font-mono text-[10px] uppercase leading-5 tracking-[0.12em] text-[#8c90a1]">
              {positionsSnapshot.message}
              {positionsSnapshot.lastUpdate
                ? ` Last update: ${formatDateTime(positionsSnapshot.lastUpdate)}.`
                : " Last update unavailable."}
              {positionsSnapshot.source === "mock-fallback"
                ? " Configure QUANTBOT_OUTPUT_DIR or place CSVs in ../crypto_bot/output to enable live positions."
                : ""}
            </div>
          </TerminalPanel>
          <TerminalPanel eyebrow="Alpha" title="Engine Status" action="Research">
            <AlphaEngineStatus />
          </TerminalPanel>
        </section>

        <section className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-[0.9fr_1.1fr]">
          <TerminalPanel
            eyebrow="System"
            title="Health Indicators"
            action={formatSourceStatus(healthSourceStatus ?? "MOCK_FALLBACK")}
            priority="passive"
          >
            <SystemHealth healthSourceStatus={healthSourceStatus} />
          </TerminalPanel>
          <TerminalPanel
            id="execution-logs"
            eyebrow="Execution"
            title="Execution Logs"
            action={formatSourceStatus(eventSourceStatus)}
            priority="passive"
          >
            <ExecutionLogs events={telemetryEvents} sourceStatus={eventSourceStatus} />
          </TerminalPanel>
        </section>
      </div>
    </main>
  );
}

function EquityChart({ points }: { points: EquitySnapshot["points"] }) {
  const chartPoints = toSvgPoints(points);
  const areaPath = chartPoints ? `${chartPoints.area} L900 300 L0 300 Z` : "";
  const lastPoint = chartPoints?.coordinates.at(-1);
  const firstEquity = points[0]?.equity;
  const lastEquity = points.at(-1)?.equity;
  const midEquity =
    firstEquity && lastEquity ? (firstEquity + lastEquity) / 2 : undefined;

  return (
    <TerminalChartFrame
      className="py-3"
      footer={
        <div className="grid gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#8c90a1] sm:grid-cols-3">
          <span>Start: {firstEquity ? formatCurrency(firstEquity) : "--"}</span>
          <span className="text-[#6f7485]">
            Ref: {midEquity ? formatCurrency(midEquity) : "--"}
          </span>
          <span className="text-[var(--accent-primary)]">
            Last: {lastEquity ? formatCurrency(lastEquity) : "--"}
          </span>
        </div>
      }
      legend={
        <>
          <span className="inline-flex items-center gap-2">
            <span className="size-2 rounded-full bg-[var(--accent-primary)]" />
            Equity
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-px w-5 bg-[#6f7485]/60" />
            Ref
          </span>
        </>
      }
      title="Equity curve"
    >
      <svg
        aria-label="Mock equity curve"
        className="h-[214px] w-full sm:h-[226px]"
        role="img"
        viewBox="0 0 900 300"
      >
        <defs>
          <linearGradient id="equityFill" x1="0" x2="0" y1="0" y2="1">
            <stop stopColor="var(--accent-primary)" stopOpacity="0.2" />
            <stop offset="1" stopColor="var(--accent-primary)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="equityStroke" x1="0" x2="1" y1="0" y2="0">
            <stop stopColor="var(--accent-secondary)" />
            <stop offset="1" stopColor="var(--accent-primary)" />
          </linearGradient>
        </defs>
        {[60, 110, 160, 210, 260].map((y) => (
          <line
            key={y}
            x1="0"
            x2="900"
            y1={y}
            y2={y}
            stroke="#243042"
            strokeDasharray="4 10"
            strokeOpacity="0.74"
            strokeWidth="1"
          />
        ))}
        {[0, 225, 450, 675, 900].map((x) => (
          <line
            key={x}
            x1={x}
            x2={x}
            y1="35"
            y2="270"
            stroke="#141b26"
            strokeOpacity="0.8"
            strokeWidth="1"
          />
        ))}
        {chartPoints ? (
          <>
            <path d={areaPath} fill="url(#equityFill)" />
            <path
              d={chartPoints.baseline}
              fill="none"
              stroke="#8c90a1"
              strokeDasharray="4 14"
              strokeOpacity="0.24"
              strokeWidth="1.5"
            />
            <line
              x1="0"
              x2="900"
              y1="150"
              y2="150"
              stroke="#c2c6d8"
              strokeDasharray="2 12"
              strokeOpacity="0.18"
            />
            <path
              d={chartPoints.line}
              fill="none"
              stroke="url(#equityStroke)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
            />
            {lastPoint ? (
              <>
                <circle
                  cx={lastPoint.x}
                  cy={lastPoint.y}
                  fill="rgb(var(--accent-primary-rgb)/0.12)"
                  r="11"
                  stroke="var(--accent-primary)"
                  strokeOpacity="0.32"
                  strokeWidth="2"
                />
                <circle
                  cx={lastPoint.x}
                  cy={lastPoint.y}
                  fill="var(--accent-primary)"
                  r="4"
                />
                <line
                  x1={lastPoint.x}
                  x2={lastPoint.x}
                  y1="35"
                  y2="270"
                  stroke="var(--accent-primary)"
                  strokeDasharray="3 8"
                  strokeOpacity="0.35"
                />
              </>
            ) : null}
          </>
        ) : (
          <text fill="#8c90a1" fontFamily="monospace" fontSize="14" x="352" y="156">
            NO EQUITY DATA
          </text>
        )}
      </svg>
    </TerminalChartFrame>
  );
}

function PositionsTable({ positions }: { positions: PositionRow[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#1f1f1f] bg-[#050505]/60">
      <table className="w-full min-w-[760px] border-collapse font-mono text-xs">
        <thead>
          <tr className="border-b border-[#243042] bg-[#0e0e0e]/55 text-left uppercase tracking-[0.12em] text-[#8c90a1]">
            <th className="px-3 py-3 font-medium">Symbol</th>
            <th className="px-3 py-3 font-medium">Side</th>
            <th className="px-3 py-3 text-right font-medium">Size</th>
            <th className="px-3 py-3 text-right font-medium">Entry</th>
            <th className="px-3 py-3 text-right font-medium">Mark</th>
            <th className="px-3 py-3 text-right font-medium">Unrealized PnL</th>
            <th className="px-3 py-3 text-right font-medium">Updated</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((position, index) => {
            const symbolClass = getSideToneClass(position.side);
            const pnlClass = getPnlToneClass(position.unrealizedPnl);

            return (
              <tr
                key={getPositionRowKey(position, index)}
                className="border-b border-[#1f1f1f] text-[#c2c6d8] transition-colors hover:bg-[#101820]"
              >
                <td className={`px-3 py-3 font-semibold ${symbolClass}`}>
                  {position.symbol}
                </td>
                <td className={`px-3 py-3 ${symbolClass}`}>{position.side}</td>
                <td className="px-3 py-3 text-right">{formatNumber(position.size)}</td>
                <td className="px-3 py-3 text-right">{formatOptionalCurrency(position.entry)}</td>
                <td className="px-3 py-3 text-right">{formatOptionalCurrency(position.mark)}</td>
                <td className={`px-3 py-3 text-right font-semibold ${pnlClass}`}>
                  {formatSignedCurrency(position.unrealizedPnl)}
                </td>
                <td className="px-3 py-3 text-right text-[#8c90a1]">{formatTime(position.timestamp)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function getSideToneClass(side: PositionRow["side"]) {
  const normalized = side.toUpperCase();
  if (normalized === "LONG") return "text-emerald-300";
  if (normalized === "SHORT") return "text-rose-300";
  return "text-[#c2c6d8]";
}

function getPnlToneClass(value: number | null) {
  if (value === null || value === 0) return "text-[#8c90a1]";
  if (value > 0) return "text-emerald-300";
  return "text-rose-300";
}

function RegimePanel() {
  return (
    <TerminalPanel eyebrow="Regime" title="Market State" action="Demo classifier">
      <div className="grid gap-3">
        <div className="rounded-xl border border-[#424655] bg-[#050505]/92 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8c90a1]">
            Current Regime
          </div>
          <div className="mt-3 text-2xl font-semibold text-white">
            Range / Low Vol
          </div>
          <div className="mt-2 font-mono text-xs text-[var(--accent-primary)]">
            Demo classifier output
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 font-mono text-xs">
          {["Trend", "Range", "Stress"].map((item, index) => (
            <div
              key={item}
              className={`rounded-lg border p-3 transition-colors ${
                index === 1
                  ? "border-[var(--accent-primary)] text-[var(--accent-primary)]"
                  : "border-[#243042] text-[#8c90a1]"
              }`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </TerminalPanel>
  );
}

function RiskMonitor() {
  const limits = [
    { label: "Daily loss guard", value: "Armed", width: "18%" },
    { label: "Position concentration", value: "Normal", width: "34%" },
    { label: "Venue exposure", value: "Normal", width: "27%" },
  ];

  return (
    <TerminalPanel eyebrow="Risk" title="Policy Monitor" action="Controls">
      <div className="space-y-4">
        {limits.map((limit) => (
          <MiniBarMeter
            key={limit.label}
            label={limit.label}
            value={limit.value}
            width={limit.width}
          />
        ))}
      </div>
    </TerminalPanel>
  );
}

function AlphaEngineStatus() {
  return (
    <div className="space-y-3">
      {alphaModules.map((module) => (
        <div
          key={module.name}
          className="grid grid-cols-[1fr_auto] gap-3 rounded-xl border border-[#243042] bg-[#050505]/92 p-4 transition-colors hover:border-[#424655]"
        >
          <div>
            <div className="font-mono text-sm text-white">{module.name}</div>
            <div className="mt-2 font-mono text-xs text-[#8c90a1]">
              Confidence: {module.confidence}
            </div>
          </div>
          <div
            className={`self-start border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] ${
              module.state === "Active"
                ? "border-[var(--accent-primary)] text-[var(--accent-primary)]"
                : "border-[#424655] text-[#8c90a1]"
            }`}
          >
            {module.state}
          </div>
        </div>
      ))}
    </div>
  );
}

function SystemHealth({
  healthSourceStatus,
}: {
  healthSourceStatus?: TelemetrySourceStatus | null;
}) {
  const statusLabel = formatSourceStatus(healthSourceStatus ?? "MOCK_FALLBACK");
  const statusTone = healthSourceStatus === "LIVE_FILE" ? "online" : "standby";

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-[var(--accent-primary)]/25 bg-[var(--accent-soft)]/55 p-3 font-mono text-[10px] uppercase tracking-[0.12em] text-[#c2c6d8]">
        <span className="mr-2 inline-flex align-middle">
          <StatusLed state={statusTone} />
        </span>
        Telemetry source: <span className="text-[var(--accent-primary)]">{statusLabel}</span>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {health.map((item) => (
          <div key={item.label} className="rounded-xl border border-[#243042] bg-[#050505]/92 p-4 transition-colors hover:border-[#424655]">
            <div className="flex items-center justify-between gap-3">
              <div className="font-mono text-xs uppercase tracking-[0.12em] text-[#c2c6d8]">
                {item.label}
              </div>
              <StatusLed state={item.state as "online" | "standby"} />
            </div>
            <div className="mt-3 font-mono text-2xl font-semibold text-white">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExecutionLogs({
  events,
  sourceStatus,
}: {
  events: TelemetryEvent[];
  sourceStatus: TelemetrySourceStatus;
}) {
  const filters = ["All", "Risk", "Exec", "Alpha", "Alerts"];
  const logs = events.length > 0 ? events : mockLogs;
  const sourceLabel =
    events.length > 0 ? formatSourceStatus(sourceStatus) : "MOCK_FALLBACK";

  if (logs.length === 0) {
    return (
      <div className="rounded-2xl border border-[#243042] bg-[#050505]/78 p-5 font-mono text-[11px] uppercase tracking-[0.12em] text-[#8c90a1]">
        No execution events available. Event stream is read-only and will render
        mock/testnet entries when present.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 rounded-2xl border border-[#1f1f1f] bg-[#050505]/72 p-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--accent-primary)]">
            Latest event
          </div>
          <div className="mt-1 font-mono text-xs text-[#c2c6d8]">
            {logs[0].time} / {logs[0].source}
          </div>
        </div>
        <div className="rounded-xl border border-[#243042] bg-[#0e0e0e]/82 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#8c90a1]">
          Source: {sourceLabel}
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 font-mono text-[10px] uppercase tracking-[0.14em]">
        {filters.map((filter, index) => (
          <button
            className={`shrink-0 rounded-xl border px-3 py-2 transition duration-200 hover:-translate-y-px hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] ${
              index === 0
                ? "border-[var(--accent-primary)]/55 bg-[var(--accent-soft)] text-[var(--accent-primary)]"
                : "border-[#243042] bg-[#050505]/82 text-[#8c90a1]"
            }`}
            key={filter}
            type="button"
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {logs.map((log, index) => {
          const severity = getLogSeverity(log.type);
          const isLatest = index === 0;

          return (
            <div
              key={getLogRowKey(log, index)}
              className={`group grid grid-cols-[4px_84px_70px_1fr] gap-3 overflow-hidden rounded-xl border bg-[#050505]/92 pr-3 font-mono text-xs transition duration-200 hover:-translate-y-px hover:border-[#424655] hover:bg-[#101820] ${
                isLatest
                  ? "border-[var(--accent-primary)]/45 shadow-[inset_0_1px_0_rgb(var(--accent-primary-rgb)/0.08)]"
                  : "border-[#1f1f1f]"
              }`}
            >
              <div className={`h-full min-h-14 ${severity.rail}`} />
              <div className="py-3 text-[#8c90a1]">
                <div className="text-[#c2c6d8]">{formatLogTime(log.time).main}</div>
                <div className="mt-1 text-[10px] text-[#6f7485]">
                  {formatLogTime(log.time).millis}
                </div>
              </div>
              <div className="py-3">
                <span
                  className={`inline-flex rounded-lg border px-2 py-1 text-[10px] uppercase tracking-[0.14em] ${severity.badge}`}
                >
                  {log.type}
                </span>
              </div>
              <div className="min-w-0 py-3">
                <div className="flex flex-wrap items-center gap-2">
                  {isLatest ? (
                    <span className="rounded-md border border-[var(--accent-primary)]/35 bg-[var(--accent-soft)] px-2 py-0.5 text-[9px] uppercase tracking-[0.14em] text-[var(--accent-primary)]">
                      Latest
                    </span>
                  ) : null}
                  <span className="text-[10px] uppercase tracking-[0.14em] text-[#6f7485]">
                    {log.source}
                  </span>
                </div>
                <div className="mt-1 text-[#c2c6d8]">{log.message}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getPositionRowKey(position: PositionRow, index: number) {
  return `${position.symbol || "no-symbol"}-${position.side || "no-side"}-${position.timestamp || "no-time"}-${index}`;
}

function getLogRowKey(log: TelemetryEvent, index: number) {
  return `${log.timestamp || log.time || "no-time"}-${log.type || "log"}-${index}`;
}

function formatSourceStatus(status: TelemetrySourceStatus) {
  return status
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getLogSeverity(type: string) {
  const severityMap: Record<
    string,
    { badge: string; rail: string }
  > = {
    sys: {
      badge: "border-[#424655] bg-[#0e0e0e] text-[#c2c6d8]",
      rail: "bg-[#8c90a1]/70",
    },
    risk: {
      badge: "border-amber-200/30 bg-amber-200/[0.06] text-amber-100",
      rail: "bg-amber-200/70",
    },
    exec: {
      badge:
        "border-[var(--accent-primary)]/35 bg-[var(--accent-soft)] text-[var(--accent-primary)]",
      rail: "bg-[var(--accent-primary)]",
    },
    alpha: {
      badge: "border-indigo-300/30 bg-indigo-300/[0.06] text-indigo-200",
      rail: "bg-indigo-300/70",
    },
    alert: {
      badge: "border-rose-300/30 bg-rose-300/[0.06] text-rose-200",
      rail: "bg-rose-300/70",
    },
    error: {
      badge: "border-red-300/40 bg-red-300/[0.08] text-red-200",
      rail: "bg-red-300",
    },
  };

  return severityMap[type] ?? severityMap.sys;
}

function formatLogTime(time: string) {
  const [main, millis] = time.split(".");
  return {
    main,
    millis: millis ? `.${millis}` : ".000",
  };
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatOptionalCurrency(value: number | null) {
  return value === null ? "--" : formatCurrency(value);
}

function formatSignedCurrency(value: number | null) {
  if (value === null) return "--";
  const formatted = formatCurrency(Math.abs(value));
  return `${value >= 0 ? "+" : "-"}${formatted}`;
}

function formatNumber(value: number | null) {
  if (value === null) return "--";
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 8,
  }).format(value);
}

function formatTime(timestamp: string) {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return "--";

  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

function formatDate(timestamp: string) {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return "Timestamp unavailable";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
}

function formatDateTime(timestamp: string) {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return "timestamp unavailable";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

function toSvgPoints(points: EquitySnapshot["points"]) {
  if (points.length === 0) return null;

  const min = Math.min(...points.map((point) => point.equity));
  const max = Math.max(...points.map((point) => point.equity));
  const range = max - min || 1;
  const denominator = Math.max(points.length - 1, 1);
  const coordinates = points.map((point, index) => {
    const x = (index / denominator) * 900;
    const y = 260 - ((point.equity - min) / range) * 200;
    return { x, y };
  });
  const mapped = coordinates.map((point) => ({
    x: Number(point.x.toFixed(2)),
    y: Number(point.y.toFixed(2)),
  }));
  const baseline = coordinates.map((point, index) => {
    const y = 248 - (index / denominator) * 94;
    return {
      x: Number(point.x.toFixed(2)),
      y: Number(y.toFixed(2)),
    };
  });

  return {
    coordinates,
    line: toSmoothPath(mapped),
    baseline: toSmoothPath(baseline),
    area: toSmoothPath(mapped),
  };
}

function toSmoothPath(points: Array<{ x: number; y: number }>) {
  if (points.length === 0) return "";
  if (points.length === 1) return `M${points[0].x},${points[0].y}`;

  return points.reduce((path, point, index) => {
    if (index === 0) return `M${point.x},${point.y}`;

    const previous = points[index - 1];
    const controlX = (previous.x + point.x) / 2;

    return `${path} C${controlX},${previous.y} ${controlX},${point.y} ${point.x},${point.y}`;
  }, "");
}
