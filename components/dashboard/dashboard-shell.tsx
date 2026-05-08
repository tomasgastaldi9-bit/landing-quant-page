import { BrandMark } from "@/components/brand-mark";
import type { EquitySnapshot } from "@/lib/equity/types";

const exposureMetrics = [
  { label: "Gross Exposure", value: "$1.24M", detail: "Demo notional" },
  { label: "Net Exposure", value: "$182K", detail: "Long bias" },
  { label: "Leverage", value: "1.8x", detail: "Policy cap 3.0x" },
  { label: "Open Risk", value: "Low", detail: "Within limits" },
];

const positions = [
  {
    symbol: "BTC-PERP",
    side: "Long",
    size: "0.80",
    entry: "64,120.00",
    mark: "64,184.20",
    pnl: "+$51.36",
    risk: "0.42%",
  },
  {
    symbol: "ETH-PERP",
    side: "Short",
    size: "6.40",
    entry: "3,420.50",
    mark: "3,412.80",
    pnl: "+$49.28",
    risk: "0.36%",
  },
  {
    symbol: "SOL-PERP",
    side: "Flat",
    size: "0.00",
    entry: "--",
    mark: "148.12",
    pnl: "$0.00",
    risk: "0.00%",
  },
  {
    symbol: "AVAX-PERP",
    side: "Long",
    size: "120.0",
    entry: "36.80",
    mark: "36.52",
    pnl: "-$33.60",
    risk: "0.21%",
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

export function DashboardShell({
  equitySnapshot,
}: {
  equitySnapshot: EquitySnapshot;
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
    <main className="min-h-screen overflow-x-hidden bg-[#050505] text-[#e2e2e2]">
      <header className="border-b border-[#243042] bg-[#0b0b0b]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-5 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center justify-between gap-4">
            <BrandMark compact />
            <div className="border border-[#424655] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#63f7ff] lg:hidden">
              Demo
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[#c2c6d8]">
            <span className="border border-[#424655] bg-[#0e0e0e] px-3 py-2 text-[#63f7ff]">
              Demo / Testnet
            </span>
            <span className="border border-[#63f7ff] bg-[#071314] px-3 py-2 text-[#63f7ff]">
              {equitySnapshot.source === "live-csv" ? "Live CSV" : "Mock Data"}
            </span>
            <span className="border border-[#243042] px-3 py-2">
              Research Mode
            </span>
            <span className="border border-[#243042] px-3 py-2">
              Not Financial Advice
            </span>
            <a
              href="/request-access"
              className="border border-[#568dff] bg-[linear-gradient(135deg,#568dff,#0058cb)] px-3 py-2 text-white transition hover:brightness-110"
            >
              Request Access
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:py-8">
        <section className="mb-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#63f7ff]">
                Execution / Risk Monitoring
              </div>
              <h1 className="mt-3 text-3xl font-semibold tracking-normal text-white sm:text-5xl">
                Institutional Quant Terminal
              </h1>
            </div>
            <p className="max-w-xl font-mono text-xs leading-6 text-[#8c90a1]">
              Equity panel reads local testnet CSV output when available.
              Trading, risk, execution, and scheduler systems remain untouched.
            </p>
          </div>
          <div className="mt-5 border border-[#63f7ff]/70 bg-[#061719]/80 px-4 py-3 font-mono text-xs uppercase tracking-[0.12em] text-[#63f7ff]">
            Frontend read-only. Equity source:{" "}
            {equitySnapshot.source === "live-csv" ? "live CSV" : "mock fallback"}.
            {" "}
            {equitySnapshot.message}
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
          <Panel eyebrow="Positions" title="Active Positions" action="Mock data">
            <PositionsTable />
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
    <article className="border border-[#1f1f1f] bg-[#0a0a0a]/84 backdrop-blur">
      <div className="flex items-center justify-between gap-4 border-b border-[#1f1f1f] px-4 py-3">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#63f7ff]">
            {eyebrow}
          </div>
          <h2 className="mt-1 text-lg font-semibold text-white">{title}</h2>
        </div>
        <div className="hidden border border-[#243042] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#8c90a1] sm:block">
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
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <article className="border border-[#1f1f1f] bg-[#0a0a0a]/84 p-5">
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#c2c6d8]">
        {label}
      </div>
      <div className="mt-3 font-mono text-3xl font-semibold text-white">
        {value}
      </div>
      <div className="mt-2 font-mono text-xs text-[#63f7ff]">{detail}</div>
    </article>
  );
}

function EquityChart({ points }: { points: EquitySnapshot["points"] }) {
  const chartPoints = toSvgPoints(points);
  const areaPath = chartPoints ? `${chartPoints.area} L900 300 L0 300 Z` : "";

  return (
    <div className="h-[310px] border border-[#243042] bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(180deg,#101010,#050505)] bg-[size:28px_28px] p-4">
      <svg
        aria-label="Mock equity curve"
        className="h-full w-full"
        role="img"
        viewBox="0 0 900 300"
      >
        <defs>
          <linearGradient id="equityFill" x1="0" x2="0" y1="0" y2="1">
            <stop stopColor="#63f7ff" stopOpacity="0.22" />
            <stop offset="1" stopColor="#63f7ff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {chartPoints ? (
          <>
            <path d={areaPath} fill="url(#equityFill)" />
            <polyline
              fill="none"
              points={chartPoints.line}
              stroke="#63f7ff"
              strokeWidth="4"
            />
          </>
        ) : null}
      </svg>
    </div>
  );
}

function PositionsTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse font-mono text-xs">
        <thead>
          <tr className="border-b border-[#243042] text-left uppercase tracking-[0.12em] text-[#8c90a1]">
            <th className="py-3 pr-4 font-medium">Symbol</th>
            <th className="py-3 pr-4 font-medium">Side</th>
            <th className="py-3 pr-4 font-medium">Size</th>
            <th className="py-3 pr-4 font-medium">Entry</th>
            <th className="py-3 pr-4 font-medium">Mark</th>
            <th className="py-3 pr-4 font-medium">Demo PnL</th>
            <th className="py-3 pr-4 font-medium">Risk</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((position) => (
            <tr
              key={position.symbol}
              className="border-b border-[#1f1f1f] text-[#c2c6d8]"
            >
              <td className="py-3 pr-4 text-[#63f7ff]">{position.symbol}</td>
              <td className="py-3 pr-4">{position.side}</td>
              <td className="py-3 pr-4">{position.size}</td>
              <td className="py-3 pr-4">{position.entry}</td>
              <td className="py-3 pr-4">{position.mark}</td>
              <td
                className={`py-3 pr-4 ${
                  position.pnl.startsWith("-")
                    ? "text-[#ffb4ab]"
                    : "text-[#63f7ff]"
                }`}
              >
                {position.pnl}
              </td>
              <td className="py-3 pr-4">{position.risk}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RegimePanel() {
  return (
    <Panel eyebrow="Regime" title="Market State" action="Demo classifier">
      <div className="grid gap-3">
        <div className="border border-[#424655] bg-[#050505] p-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8c90a1]">
            Current Regime
          </div>
          <div className="mt-3 text-2xl font-semibold text-white">
            Range / Low Vol
          </div>
          <div className="mt-2 font-mono text-xs text-[#63f7ff]">
            Demo classifier output
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 font-mono text-xs">
          {["Trend", "Range", "Stress"].map((item, index) => (
            <div
              key={item}
              className={`border p-3 ${
                index === 1
                  ? "border-[#63f7ff] text-[#63f7ff]"
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
              <span className="text-[#63f7ff]">{limit.value}</span>
            </div>
            <div className="h-2 border border-[#243042] bg-[#050505]">
              <div
                className="h-full bg-[#63f7ff]"
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
          className="grid grid-cols-[1fr_auto] gap-3 border border-[#243042] bg-[#050505] p-4"
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
                ? "border-[#63f7ff] text-[#63f7ff]"
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
        <div key={item.label} className="border border-[#243042] bg-[#050505] p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="font-mono text-xs uppercase tracking-[0.12em] text-[#c2c6d8]">
              {item.label}
            </div>
            <span
              className={`size-2 ${
                item.state === "online" ? "bg-[#63f7ff]" : "bg-[#8c90a1]"
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
          className="grid grid-cols-[76px_64px_1fr] gap-3 border border-[#1f1f1f] bg-[#050505] px-3 py-2 font-mono text-xs"
        >
          <span className="text-[#8c90a1]">{log.time}</span>
          <span className="uppercase text-[#63f7ff]">{log.type}</span>
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

function formatSignedCurrency(value: number | null) {
  if (value === null) return "--";
  const formatted = formatCurrency(Math.abs(value));
  return `${value >= 0 ? "+" : "-"}${formatted}`;
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

function toSvgPoints(points: EquitySnapshot["points"]) {
  if (points.length === 0) return null;

  const min = Math.min(...points.map((point) => point.equity));
  const max = Math.max(...points.map((point) => point.equity));
  const range = max - min || 1;
  const denominator = Math.max(points.length - 1, 1);
  const mapped = points.map((point, index) => {
    const x = (index / denominator) * 900;
    const y = 260 - ((point.equity - min) / range) * 200;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  });

  return {
    line: mapped.join(" "),
    area: `M${mapped.join(" L")}`,
  };
}
