import {
  MetricTile,
  StatusBadge,
  StatusLed,
  TerminalPanel,
} from "@/components/dashboard/terminal-ui";
import Link from "next/link";

const overviewMetrics = [
  {
    label: "Active Pipelines",
    value: "04",
    detail: "Research sleeves",
    tone: "neutral" as const,
    emphasis: true,
  },
  {
    label: "Candidates",
    value: "11",
    detail: "In review",
    tone: "muted" as const,
  },
  {
    label: "Validation",
    value: "03",
    detail: "Stages active",
    tone: "good" as const,
  },
  {
    label: "Deployment",
    value: "01",
    detail: "Candidate only",
    tone: "warning" as const,
  },
];

const regimes = [
  { label: "Low", value: "Stable", state: "standby", width: "44%" },
  { label: "Mid", value: "Current", state: "online", width: "68%" },
  { label: "High", value: "Watch", state: "standby", width: "22%" },
];

const alphaRegistry = [
  {
    name: "Strategy A",
    family: "Trend / Breakout",
    status: "Active Research",
    stage: "Walk-forward",
    readiness: "Medium",
    stability: "High",
    activity: "Observed",
  },
  {
    name: "Strategy G",
    family: "Mean Reversion",
    status: "Review",
    stage: "Backtest",
    readiness: "Low",
    stability: "Medium",
    activity: "Reduced",
  },
  {
    name: "Experimental Sleeve 03",
    family: "Volatility Filter",
    status: "Sandbox",
    stage: "Research",
    readiness: "Low",
    stability: "Unknown",
    activity: "Isolated",
  },
  {
    name: "Watchlist Candidate B",
    family: "Cross-asset Context",
    status: "Watchlist",
    stage: "Paper/Testnet",
    readiness: "Medium",
    stability: "Medium",
    activity: "Monitored",
  },
];

const pipelineStages = [
  { label: "Research", state: "complete" },
  { label: "Backtest", state: "complete" },
  { label: "Walk-forward", state: "active" },
  { label: "Paper/Testnet", state: "pending" },
  { label: "Deployment Candidate", state: "pending" },
];

const signalHealth = [
  { label: "Activity", value: "Normal", detail: "No spike", tone: "good" as const },
  {
    label: "Stability",
    value: "High",
    detail: "Drift contained",
    tone: "good" as const,
  },
  {
    label: "Turnover",
    value: "Moderate",
    detail: "Policy aligned",
    tone: "muted" as const,
  },
  {
    label: "Correlation",
    value: "0.32",
    detail: "Sleeve overlap",
    tone: "muted" as const,
  },
  {
    label: "Persistence",
    value: "Watch",
    detail: "Needs more samples",
    tone: "warning" as const,
  },
];

export default function AlphaLabPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:32px_32px] text-[#e2e2e2]">
      <div className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6 lg:py-10">
        <section className="rounded-3xl border border-[#243042]/82 bg-[radial-gradient(circle_at_20%_0%,rgb(var(--accent-primary-rgb)/0.13),transparent_32%),linear-gradient(180deg,rgba(14,14,14,0.9),rgba(5,5,5,0.78))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_28px_90px_rgba(0,0,0,0.3)] sm:p-7">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent-primary)]">
                Research Workspace
              </div>
              <h1 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-6xl">
                Alpha Lab
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#c2c6d8] sm:text-base">
                A mock institutional research desk for organizing multi-alpha
                candidates, regime context, validation stages, and deployment
                readiness without live capital or production execution.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <StatusBadge tone="accent">Research</StatusBadge>
              <StatusBadge>Mock Data</StatusBadge>
              <StatusBadge>No Live Capital</StatusBadge>
              <StatusBadge>Private Beta</StatusBadge>
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
              href="/request-access"
            >
              Request Research Access
            </Link>
          </div>
        </section>

        <section className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {overviewMetrics.map((metric) => (
            <MetricTile key={metric.label} {...metric} compact />
          ))}
        </section>

        <section className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-[0.8fr_1.2fr]">
          <TerminalPanel eyebrow="Regime" title="Regime Monitor" action="Demo model" priority="primary">
            <RegimeMonitor />
          </TerminalPanel>
          <TerminalPanel eyebrow="Registry" title="Alpha Registry" action="Mock research" priority="primary">
            <AlphaRegistry />
          </TerminalPanel>
        </section>

        <section className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-[1.1fr_0.9fr]">
          <TerminalPanel eyebrow="Validation" title="Research Pipeline" action="Gated workflow">
            <ValidationPipeline />
          </TerminalPanel>
          <TerminalPanel eyebrow="Signals" title="Signal Health" action="Telemetry">
            <SignalHealth />
          </TerminalPanel>
        </section>

        <section className="mt-3">
          <TerminalPanel eyebrow="Compliance" title="Research Environment" action="Informational" priority="passive">
            <div className="grid gap-3 font-mono text-[11px] uppercase leading-6 tracking-[0.12em] text-[#8c90a1] md:grid-cols-3">
              <div className="rounded-xl border border-[#243042] bg-[#050505]/78 p-4">
                No live trading access is provided from this workspace.
              </div>
              <div className="rounded-xl border border-[#243042] bg-[#050505]/78 p-4">
                Mock data is for product demonstration and research workflow
                visualization.
              </div>
              <div className="rounded-xl border border-[#243042] bg-[#050505]/78 p-4">
                Performance is not guaranteed. Not financial advice.
              </div>
            </div>
          </TerminalPanel>
        </section>
      </div>
    </main>
  );
}

function RegimeMonitor() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-[var(--accent-primary)]/35 bg-[linear-gradient(135deg,rgb(var(--accent-soft-rgb)/0.58),rgba(5,5,5,0.76))] p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8c90a1]">
              Current Regime
            </div>
            <div className="mt-3 text-3xl font-semibold text-white">
              Mid Dispersion
            </div>
          </div>
          <StatusLed state="online" />
        </div>
        <div className="mt-3 font-mono text-xs uppercase tracking-[0.12em] text-[var(--accent-primary)]">
          Transition watch: low to mid confirmed
        </div>
      </div>
      <div className="grid gap-3">
        {regimes.map((regime) => (
          <div key={regime.label}>
            <div className="mb-2 flex items-center justify-between font-mono text-xs uppercase tracking-[0.12em]">
              <span className="text-[#c2c6d8]">{regime.label} dispersion</span>
              <span className="flex items-center gap-2 text-[var(--accent-primary)]">
                <StatusLed state={regime.state as "online" | "standby"} />
                {regime.value}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full border border-[#243042] bg-[#050505]">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,var(--accent-secondary),var(--accent-primary))]"
                style={{ width: regime.width }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AlphaRegistry() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {alphaRegistry.map((alpha) => (
        <article
          className="rounded-2xl border border-[#243042] bg-[linear-gradient(180deg,rgba(8,8,8,0.92),rgba(5,5,5,0.72))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] transition duration-200 hover:-translate-y-px hover:border-[var(--accent-primary)]/45"
          key={alpha.name}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--accent-primary)]">
                {alpha.family}
              </div>
              <h2 className="mt-2 text-lg font-semibold text-white">
                {alpha.name}
              </h2>
            </div>
            <StatusLed state={alpha.status === "Active Research" ? "online" : "standby"} />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 font-mono text-[10px] uppercase tracking-[0.12em]">
            <DataCell label="Status" value={alpha.status} />
            <DataCell label="Stage" value={alpha.stage} />
            <DataCell label="Readiness" value={alpha.readiness} />
            <DataCell label="Stability" value={alpha.stability} />
          </div>
          <div className="mt-3 rounded-xl border border-[#1f1f1f] bg-[#050505]/72 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#8c90a1]">
            Activity: <span className="text-[var(--accent-primary)]">{alpha.activity}</span>
          </div>
        </article>
      ))}
    </div>
  );
}

function ValidationPipeline() {
  return (
    <div className="grid gap-3 lg:grid-cols-5">
      {pipelineStages.map((stage, index) => {
        const isActive = stage.state === "active";
        const isComplete = stage.state === "complete";

        return (
          <div
            className={`relative rounded-2xl border p-4 ${
              isActive
                ? "border-[var(--accent-primary)]/55 bg-[var(--accent-soft)]/58"
                : isComplete
                  ? "border-emerald-300/24 bg-emerald-300/[0.035]"
                  : "border-[#243042] bg-[#050505]/74"
            }`}
            key={stage.label}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#8c90a1]">
                Step {index + 1}
              </div>
              <StatusLed state={isActive || isComplete ? "online" : "standby"} />
            </div>
            <div className="mt-4 min-h-12 text-sm font-semibold text-white">
              {stage.label}
            </div>
            <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--accent-primary)]">
              {isActive ? "Active gate" : isComplete ? "Reviewed" : "Pending"}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SignalHealth() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {signalHealth.map((signal) => (
        <MetricTile
          compact
          detail={signal.detail}
          key={signal.label}
          label={signal.label}
          tone={signal.tone}
          value={signal.value}
        />
      ))}
    </div>
  );
}

function DataCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[#1f1f1f] bg-[#050505]/72 p-3">
      <div className="text-[#6f7485]">{label}</div>
      <div className="mt-2 text-[#c2c6d8]">{value}</div>
    </div>
  );
}
