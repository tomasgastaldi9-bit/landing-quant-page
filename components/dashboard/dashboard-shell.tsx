import { BrandMark } from "@/components/brand-mark";
import type { EquitySnapshot } from "@/lib/equity/types";
import type { PositionRow, PositionsSnapshot } from "@/lib/positions/types";
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

const logs = [
  { time: "14:03:21", type: "risk", message: "Position policy check passed" },
  { time: "14:03:09", type: "exec", message: "Demo order routed to testnet venue" },
  { time: "14:02:48", type: "alpha", message: "Momentum signal weight reduced" },
  { time: "14:02:17", type: "sys", message: "Market data heartbeat normal" },
  { time: "14:01:54", type: "risk", message: "Exposure drift below alert threshold" },
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

const statusBadgeClass =
  "rounded-xl border border-[#243042] bg-[#0e0e0e]/82 px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_10px_30px_rgba(0,0,0,0.18)] transition-colors hover:border-[#424655]";

export function DashboardShell({
  equitySnapshot,
  positionsSnapshot,
}: {
  equitySnapshot: EquitySnapshot;
  positionsSnapshot: PositionsSnapshot;
}) {
  const equityMetrics = [
    {
      label: "Current Equity",
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

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:32px_32px] text-[#e2e2e2]">
      <header className="sticky top-0 z-50 border-b border-[#243042]/80 bg-[#0b0b0b]/90 shadow-[0_12px_40px_rgba(0,0,0,0.22)] backdrop-blur-md">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-5 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center justify-between gap-4">
            <BrandMark />
            <Link
              href="/demo-testnet"
              className="rounded-xl border border-[#424655] bg-[#0e0e0e] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent-primary)] transition duration-200 hover:border-[var(--accent-primary)] hover:bg-[var(--accent-soft)] lg:hidden"
            >
              Demo
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[#c2c6d8]">
            <Link href="/demo-testnet" className={statusBadgeClass}>
              Demo / Testnet
            </Link>
            <Link
              href="/demo-testnet"
              className="rounded-xl border border-[var(--accent-primary)]/60 bg-[var(--accent-surface)]/90 px-3 py-2 text-[var(--accent-primary)] shadow-[inset_0_1px_0_rgb(var(--accent-primary-rgb)/0.08),0_10px_30px_rgba(0,0,0,0.18)] transition-colors hover:border-[var(--accent-primary)] hover:bg-[var(--accent-soft)]"
            >
              {equitySnapshot.source === "live-csv" ||
              positionsSnapshot.source === "live-csv"
                ? "Live Testnet Data"
                : "Mock Data Fallback"}
            </Link>
            <Link href="/demo-testnet" className={statusBadgeClass}>
              Research Mode
            </Link>
            <span className={statusBadgeClass}>
              Not Financial Advice
            </span>
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
                Institutional Quant Terminal
              </h1>
            </div>
            <p className="max-w-xl font-mono text-xs leading-6 text-[#8c90a1]">
              Equity panel reads local testnet CSV output when available.
              Trading, risk, execution, and scheduler systems remain untouched.
            </p>
          </div>
          <div className="mt-5 rounded-2xl border border-[var(--accent-primary)]/35 bg-[linear-gradient(135deg,rgb(var(--accent-soft-rgb)/0.86),rgba(10,10,10,0.72))] px-4 py-3 font-mono text-[11px] uppercase leading-5 tracking-[0.12em] text-[var(--accent-primary)] shadow-[inset_0_1px_0_rgb(var(--accent-primary-rgb)/0.08),0_18px_50px_rgba(0,0,0,0.22)]">
            Frontend read-only. Equity source:{" "}
            {equitySnapshot.source === "live-csv" ? "live CSV" : "mock fallback"}.
            {" "}
            {equitySnapshot.message}
            {equitySnapshot.source === "mock-fallback"
              ? " Place CSV at output/live_testnet_equity.csv to enable live equity display."
              : ""}
            {" "}
            Positions source:{" "}
            {positionsSnapshot.source === "live-csv"
              ? "live CSV"
              : "mock fallback"}.
          </div>
        </section>

        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {equityMetrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </section>

        <section className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-[1.35fr_0.65fr]">
          <Panel
            eyebrow="Equity Curve"
            title="Testnet Equity"
            action={equitySnapshot.source === "live-csv" ? "CSV loaded" : "Fallback"}
          >
            <EquityChart points={equitySnapshot.points} />
          </Panel>
          <div className="grid gap-3">
            <RegimePanel />
            <RiskMonitor />
          </div>
        </section>

        <section className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-[1fr_0.75fr]">
          <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:col-span-2 xl:grid-cols-4">
            {exposureMetrics.map((metric) => (
              <MetricCard key={metric.label} {...metric} />
            ))}
          </section>
          <Panel
            eyebrow="Positions"
            title="Active Positions"
            action={
              positionsSnapshot.source === "live-csv"
                ? "LIVE TESTNET DATA"
                : "MOCK DATA FALLBACK"
            }
          >
            <PositionsTable positions={positionsSnapshot.positions} />
            <div className="mt-3 border border-[#243042] bg-[#050505] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#8c90a1]">
              {positionsSnapshot.message}
              {positionsSnapshot.lastUpdate
                ? ` Last update: ${formatDateTime(positionsSnapshot.lastUpdate)}.`
                : " Last update unavailable."}
              {positionsSnapshot.source === "mock-fallback"
                ? " Place CSV at output/live_testnet_positions.csv to enable live positions."
                : ""}
            </div>
          </Panel>
          <Panel eyebrow="Alpha" title="Engine Status" action="Research">
            <AlphaEngineStatus />
          </Panel>
        </section>

        <section className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-[0.9fr_1.1fr]">
          <Panel eyebrow="System" title="Health Indicators" action="Live mock">
            <SystemHealth />
          </Panel>
          <Panel eyebrow="Execution" title="Execution Logs" action="Testnet sim">
            <ExecutionLogs />
          </Panel>
        </section>
      </div>
    </main>
  );
}

function Panel({
  eyebrow,
  title,
  action,
  children,
}: {
  eyebrow: string;
  title: string;
  action: string;
  children: React.ReactNode;
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-[#1f1f1f]/90 bg-[linear-gradient(180deg,rgba(16,16,16,0.92),rgba(7,7,7,0.86))] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_18px_55px_rgba(0,0,0,0.24)] backdrop-blur-sm transition-all duration-200 hover:border-[#2f3b52] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.045),0_22px_65px_rgba(0,0,0,0.3)]">
      <div className="flex items-center justify-between gap-4 border-b border-[#1f1f1f]/80 bg-[#0e0e0e]/44 px-4 py-3">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent-primary)]">
            {eyebrow}
          </div>
          <h2 className="mt-1 text-lg font-semibold leading-tight text-white">
            {title}
          </h2>
        </div>
        <div className="hidden rounded-lg border border-[#243042] bg-[#050505]/90 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#8c90a1] transition-colors group-hover:border-[#424655] sm:block">
          {action}
        </div>
      </div>
      <div className="p-4">{children}</div>
    </article>
  );
}

function MetricCard({
  label,
  value,
  detail,
  href,
}: {
  label: string;
  value: string;
  detail: string;
  href?: string;
}) {
  const card = (
    <article className="rounded-2xl border border-[#1f1f1f]/90 bg-[linear-gradient(180deg,rgba(14,14,14,0.92),rgba(7,7,7,0.86))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_16px_45px_rgba(0,0,0,0.22)] transition-all duration-200 hover:-translate-y-px hover:border-[#2f3b52]">
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#c2c6d8]">
        {label}
      </div>
      <div className="mt-3 font-mono text-[30px] font-semibold leading-none text-white">
        {value}
      </div>
      <div className="mt-2 font-mono text-xs text-[var(--accent-primary)]">{detail}</div>
    </article>
  );

  if (!href) return card;

  return (
    <Link href={href} className="block">
      {card}
    </Link>
  );
}

function EquityChart({ points }: { points: EquitySnapshot["points"] }) {
  const chartPoints = toSvgPoints(points);
  const areaPath = chartPoints ? `${chartPoints.area} L900 300 L0 300 Z` : "";
  const lastPoint = chartPoints?.coordinates.at(-1);
  const firstEquity = points[0]?.equity;
  const lastEquity = points.at(-1)?.equity;

  return (
    <div className="h-[330px] rounded-xl border border-[#243042]/90 bg-[linear-gradient(rgba(255,255,255,0.032)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.032)_1px,transparent_1px),linear-gradient(180deg,#101010,#050505)] bg-[size:28px_28px] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]">
      <svg
        aria-label="Mock equity curve"
        className="h-full w-full"
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
            strokeWidth="1"
          />
        ))}
        {chartPoints ? (
          <>
            <path d={areaPath} fill="url(#equityFill)" />
            <path
              d={chartPoints.baseline}
              fill="none"
              stroke="#9d79ff"
              strokeDasharray="8 10"
              strokeOpacity="0.58"
              strokeWidth="2"
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
            <text fill="#8c90a1" fontFamily="monospace" fontSize="12" x="8" y="24">
              START {firstEquity ? formatCurrency(firstEquity) : "--"}
            </text>
            <text
              fill="var(--accent-primary)"
              fontFamily="monospace"
              fontSize="12"
              textAnchor="end"
              x="892"
              y="24"
            >
              LAST {lastEquity ? formatCurrency(lastEquity) : "--"}
            </text>
          </>
        ) : null}
      </svg>
    </div>
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
          {positions.map((position) => {
            const symbolClass = getSideToneClass(position.side);
            const pnlClass = getPnlToneClass(position.unrealizedPnl);

            return (
              <tr
                key={position.symbol}
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
  if (side === "LONG") return "text-emerald-300";
  if (side === "SHORT") return "text-rose-300";
  return "text-[#c2c6d8]";
}

function getPnlToneClass(value: number | null) {
  if (value === null || value === 0) return "text-[#8c90a1]";
  if (value > 0) return "text-emerald-300";
  return "text-rose-300";
}

function RegimePanel() {
  return (
    <Panel eyebrow="Regime" title="Market State" action="Demo classifier">
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
    </Panel>
  );
}

function RiskMonitor() {
  const limits = [
    { label: "Daily loss guard", value: "Armed", width: "18%" },
    { label: "Position concentration", value: "Normal", width: "34%" },
    { label: "Venue exposure", value: "Normal", width: "27%" },
  ];

  return (
    <Panel eyebrow="Risk" title="Policy Monitor" action="Controls">
      <div className="space-y-4">
        {limits.map((limit) => (
          <div key={limit.label}>
            <div className="mb-2 flex justify-between font-mono text-xs">
              <span className="text-[#c2c6d8]">{limit.label}</span>
              <span className="text-[var(--accent-primary)]">{limit.value}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full border border-[#243042] bg-[#050505]">
              <div
                className="h-full bg-[linear-gradient(90deg,var(--accent-secondary),var(--accent-primary))] transition-[width] duration-500"
                style={{ width: limit.width }}
              />
            </div>
          </div>
        ))}
      </div>
    </Panel>
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

function SystemHealth() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {health.map((item) => (
        <div key={item.label} className="rounded-xl border border-[#243042] bg-[#050505]/92 p-4 transition-colors hover:border-[#424655]">
          <div className="flex items-center justify-between gap-3">
            <div className="font-mono text-xs uppercase tracking-[0.12em] text-[#c2c6d8]">
              {item.label}
            </div>
            <span
              className={`size-2 ${
                item.state === "online" ? "bg-[var(--accent-primary)]" : "bg-[#8c90a1]"
              }`}
            />
          </div>
          <div className="mt-3 font-mono text-2xl font-semibold text-white">
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}

function ExecutionLogs() {
  return (
    <div className="space-y-2">
      {logs.map((log) => (
        <div
          key={`${log.time}-${log.message}`}
          className="grid grid-cols-[76px_64px_1fr] gap-3 rounded-lg border border-[#1f1f1f] bg-[#050505]/92 px-3 py-2 font-mono text-xs transition-colors hover:border-[#243042] hover:bg-[#101820]"
        >
          <span className="text-[#8c90a1]">{log.time}</span>
          <span className="uppercase text-[var(--accent-primary)]">{log.type}</span>
          <span className="text-[#c2c6d8]">{log.message}</span>
        </div>
      ))}
    </div>
  );
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
