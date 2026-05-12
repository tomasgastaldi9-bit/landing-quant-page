import {
  MetricTile,
  StatusBadge,
  StatusLed,
  TerminalPanel,
} from "@/components/dashboard/terminal-ui";
import {
  MiniBarMeter,
  RegimeScoreBar,
  Sparkline,
  TimelineProgress,
} from "@/components/charts/terminal-charts";
import Link from "next/link";

const overview = [
  {
    label: "Risk State",
    value: "Armed",
    detail: "Policy engine active",
    tone: "good" as const,
    emphasis: true,
  },
  {
    label: "Gross Exposure",
    value: "$1.24M",
    detail: "Demo notional",
    tone: "muted" as const,
  },
  {
    label: "Leverage",
    value: "1.8x",
    detail: "Cap 3.0x",
    tone: "good" as const,
  },
  {
    label: "Drawdown Guard",
    value: "On",
    detail: "Research mode",
    tone: "good" as const,
  },
  {
    label: "Utilization",
    value: "41%",
    detail: "Mock capital",
    tone: "muted" as const,
  },
];

const policies = [
  { label: "Position sizing", value: "Normal", width: "34%", tone: "good" as const },
  { label: "Venue exposure", value: "Contained", width: "27%", tone: "good" as const },
  { label: "Daily loss guard", value: "Armed", width: "18%", tone: "warning" as const },
  { label: "Reduce-only state", value: "Ready", width: "12%", tone: "accent" as const },
];

const constraints = [
  ["Max leverage", "3.0x", "Hard cap"],
  ["Max venue concentration", "38%", "Demo policy"],
  ["Min notional", "$25", "Order safeguard"],
  ["Max single sleeve", "22%", "Allocation limit"],
  ["Reduce-only trigger", "Drawdown breach", "Execution safety"],
  ["Manual override", "Disabled", "No live trading"],
];

const exposure = [
  { label: "Long exposure", note: "$711K demo notional", score: 57, tone: "good" as const },
  { label: "Short exposure", note: "$529K demo notional", score: 43, tone: "accent" as const },
  { label: "Net bias", note: "Long +$182K", score: 24, tone: "neutral" as const },
  { label: "Venue concentration", note: "Below review threshold", score: 31, tone: "good" as const },
];

const drawdownTimeline = [
  "Observe",
  "Warn",
  "Throttle",
  "Reduce-only",
  "Review",
];

const riskEvents = [
  {
    time: "14:08:42.220",
    type: "risk",
    source: "policy-engine",
    message: "Sizing check passed for testnet route",
  },
  {
    time: "14:07:11.904",
    type: "alert",
    source: "drawdown-guard",
    message: "Daily drawdown buffer remains above warning threshold",
  },
  {
    time: "14:05:39.442",
    type: "sys",
    source: "risk-telemetry",
    message: "Exposure snapshot refreshed from mock state",
  },
  {
    time: "14:03:21.842",
    type: "risk",
    source: "policy-engine",
    message: "Position concentration policy passed",
  },
  {
    time: "14:00:58.406",
    type: "exec",
    source: "testnet-router",
    message: "Live capital route unavailable by design",
  },
];

const utilizationSeries = [28, 32, 35, 34, 39, 41, 38, 42, 41];
const drawdownSeries = [12, 14, 13, 15, 17, 16, 18, 19, 18];
const exposureSeries = [44, 48, 51, 49, 55, 53, 57, 56, 58];

export default function RiskLayerPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:32px_32px] text-[#e2e2e2]">
      <div className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6 lg:py-10">
        <section className="rounded-3xl border border-[#243042]/82 bg-[radial-gradient(circle_at_18%_0%,rgb(var(--accent-primary-rgb)/0.13),transparent_32%),linear-gradient(180deg,rgba(14,14,14,0.9),rgba(5,5,5,0.78))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_28px_90px_rgba(0,0,0,0.3)] sm:p-7">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent-primary)]">
                Risk Infrastructure
              </div>
              <h1 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-6xl">
                Risk Layer
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#c2c6d8] sm:text-base">
                A mock hedge-fund-style risk workspace for observing exposure
                controls, leverage policy, safeguards, drawdown state, and
                operational risk telemetry before any live deployment.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <StatusBadge tone="accent">Policy Engine</StatusBadge>
              <StatusBadge>Read-only</StatusBadge>
              <StatusBadge>Mock Data</StatusBadge>
              <StatusBadge>No Live Capital</StatusBadge>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-3 border-t border-[#243042] pt-5 sm:flex-row">
            <Link
              className="rounded-xl border border-[var(--accent-secondary)] bg-[linear-gradient(135deg,var(--accent-secondary),var(--accent-strong))] px-5 py-3 text-center text-sm font-semibold text-white shadow-[0_16px_34px_rgb(var(--accent-secondary-rgb)/0.2)] transition duration-200 hover:-translate-y-px hover:brightness-110"
              href="/dashboard"
            >
              Open Terminal Demo
            </Link>
            <Link
              className="rounded-xl border border-[#243042] bg-[#050505]/72 px-5 py-3 text-center font-mono text-xs uppercase tracking-[0.12em] text-[#c2c6d8] transition duration-200 hover:-translate-y-px hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
              href="/demo-testnet"
            >
              Demo/Testnet Scope
            </Link>
          </div>
        </section>

        <section className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {overview.map((metric) => (
            <MetricTile key={metric.label} {...metric} compact />
          ))}
        </section>

        <section className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-[0.8fr_1.2fr]">
          <TerminalPanel eyebrow="Policy" title="Policy Engine" action="Armed" priority="primary">
            <PolicyEngine />
          </TerminalPanel>
          <TerminalPanel eyebrow="Exposure" title="Exposure Monitoring" action="Mock telemetry" priority="primary">
            <ExposureMonitoring />
          </TerminalPanel>
        </section>

        <section className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-[1fr_0.85fr]">
          <TerminalPanel eyebrow="Constraints" title="Operational Constraints" action="Policy table">
            <Constraints />
          </TerminalPanel>
          <TerminalPanel eyebrow="Drawdown" title="Drawdown Control" action="Guardrail state">
            <DrawdownControl />
          </TerminalPanel>
        </section>

        <section className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-[0.9fr_1.1fr]">
          <TerminalPanel eyebrow="Capital" title="Capital Utilization" action="Demo capital">
            <CapitalUtilization />
          </TerminalPanel>
          <TerminalPanel eyebrow="Events" title="Risk Events" action="Read-only stream" priority="passive">
            <RiskEvents />
          </TerminalPanel>
        </section>

        <section className="mt-3">
          <TerminalPanel eyebrow="Compliance" title="Risk Environment Disclaimer" action="Informational" priority="passive">
            <div className="grid gap-3 font-mono text-[11px] uppercase leading-6 tracking-[0.12em] text-[#8c90a1] md:grid-cols-3">
              <div className="rounded-xl border border-[#243042] bg-[#050505]/78 p-4">
                Risk controls shown here are mock/demo UI states.
              </div>
              <div className="rounded-xl border border-[#243042] bg-[#050505]/78 p-4">
                No live trading access, capital routing, or execution approval is
                provided.
              </div>
              <div className="rounded-xl border border-[#243042] bg-[#050505]/78 p-4">
                Risk controls do not guarantee loss prevention. Not financial
                advice.
              </div>
            </div>
          </TerminalPanel>
        </section>
      </div>
    </main>
  );
}

function PolicyEngine() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-[var(--accent-primary)]/35 bg-[linear-gradient(135deg,rgb(var(--accent-soft-rgb)/0.58),rgba(5,5,5,0.76))] p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8c90a1]">
              Current policy state
            </div>
            <div className="mt-3 text-3xl font-semibold text-white">
              Armed / Read-only
            </div>
          </div>
          <StatusLed state="online" />
        </div>
        <div className="mt-3 font-mono text-xs uppercase tracking-[0.12em] text-[var(--accent-primary)]">
          All displayed states are mock/testnet observability signals.
        </div>
      </div>
      <div className="grid gap-4">
        {policies.map((policy) => (
          <MiniBarMeter key={policy.label} {...policy} />
        ))}
      </div>
    </div>
  );
}

function ExposureMonitoring() {
  return (
    <div className="grid gap-4">
      {exposure.map((item) => (
        <RegimeScoreBar
          key={item.label}
          label={item.label}
          note={item.note}
          score={item.score}
          tone={item.tone}
        />
      ))}
    </div>
  );
}

function Constraints() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {constraints.map(([label, value, note]) => (
        <div
          className="rounded-2xl border border-[#243042] bg-[#050505]/78 p-4 font-mono text-[10px] uppercase tracking-[0.12em] shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]"
          key={label}
        >
          <div className="text-[#6f7485]">{label}</div>
          <div className="mt-3 text-lg font-semibold text-white">{value}</div>
          <div className="mt-2 text-[var(--accent-primary)]">{note}</div>
        </div>
      ))}
    </div>
  );
}

function DrawdownControl() {
  return (
    <div className="space-y-4">
      <TimelineProgress currentIndex={1} stages={drawdownTimeline} />
      <div className="grid gap-3 sm:grid-cols-2">
        <TelemetryCard
          detail="Below throttle"
          label="Drawdown Buffer"
          tone="warning"
          value="18%"
          values={drawdownSeries}
        />
        <TelemetryCard
          detail="Policy aligned"
          label="Exposure Drift"
          tone="good"
          value="Normal"
          values={exposureSeries}
        />
      </div>
    </div>
  );
}

function CapitalUtilization() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <TelemetryCard
        detail="Demo allocation"
        label="Utilization"
        tone="accent"
        value="41%"
        values={utilizationSeries}
      />
      <TelemetryCard
        detail="Unallocated"
        label="Capital Buffer"
        tone="good"
        value="59%"
        values={[72, 68, 65, 66, 61, 59, 62, 58, 59]}
      />
      <MetricTile compact detail="No live route" label="Execution Access" tone="muted" value="Disabled" />
      <MetricTile compact detail="Human review" label="Promotion Gate" tone="warning" value="Required" />
    </div>
  );
}

function TelemetryCard({
  detail,
  label,
  tone,
  value,
  values,
}: {
  detail: string;
  label: string;
  tone: "accent" | "good" | "risk" | "neutral" | "warning";
  value: string;
  values: number[];
}) {
  return (
    <div className="rounded-2xl border border-[#243042] bg-[#050505]/78 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#8c90a1]">
            {label}
          </div>
          <div className="mt-2 font-mono text-xl font-semibold text-white">
            {value}
          </div>
        </div>
        <StatusLed state={tone === "warning" || tone === "risk" ? "standby" : "online"} />
      </div>
      <Sparkline ariaLabel={`${label} telemetry`} tone={tone} values={values} />
      <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--accent-primary)]">
        {detail}
      </div>
    </div>
  );
}

function RiskEvents() {
  return (
    <div className="space-y-2">
      {riskEvents.map((event, index) => {
        const severity = getRiskEventTone(event.type);
        return (
          <div
            className={`grid grid-cols-[4px_88px_72px_1fr] gap-3 overflow-hidden rounded-xl border bg-[#050505]/92 pr-3 font-mono text-xs transition duration-200 hover:-translate-y-px hover:border-[#424655] hover:bg-[#101820] ${
              index === 0
                ? "border-[var(--accent-primary)]/45 shadow-[inset_0_1px_0_rgb(var(--accent-primary-rgb)/0.08)]"
                : "border-[#1f1f1f]"
            }`}
            key={`${event.time}-${event.message}`}
          >
            <div className={`h-full min-h-14 ${severity.rail}`} />
            <div className="py-3 text-[#8c90a1]">
              <div className="text-[#c2c6d8]">{event.time.split(".")[0]}</div>
              <div className="mt-1 text-[10px] text-[#6f7485]">
                .{event.time.split(".")[1] ?? "000"}
              </div>
            </div>
            <div className="py-3">
              <span
                className={`inline-flex rounded-lg border px-2 py-1 text-[10px] uppercase tracking-[0.14em] ${severity.badge}`}
              >
                {event.type}
              </span>
            </div>
            <div className="min-w-0 py-3">
              <div className="text-[10px] uppercase tracking-[0.14em] text-[#6f7485]">
                {event.source}
              </div>
              <div className="mt-1 text-[#c2c6d8]">{event.message}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function getRiskEventTone(type: string) {
  const tones: Record<string, { badge: string; rail: string }> = {
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
    alert: {
      badge: "border-rose-300/30 bg-rose-300/[0.06] text-rose-200",
      rail: "bg-rose-300/70",
    },
  };

  return tones[type] ?? tones.sys;
}
