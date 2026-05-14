import {
  MetricTile,
  StatusBadge,
  StatusLed,
  TerminalPanel,
} from "@/components/dashboard/terminal-ui";
import {
  MiniBarMeter,
  TimelineProgress,
} from "@/components/charts/terminal-charts";
import {
  getAlphaLabSnapshot,
  type AlphaLabRegime,
  type AlphaLabRegistryEntry,
  type AlphaLabSignalHealth,
  type AlphaLabSnapshot,
  type AlphaLabSource,
  type AlphaLabSourceStatus,
} from "@/lib/alpha-lab/live-adapter";
import Link from "next/link";

const pipelineStages = [
  "Research",
  "Backtest",
  "Walk-forward",
  "Paper/Testnet",
  "Deployment Candidate",
];

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function AlphaLabPage() {
  const snapshot = await getAlphaLabSnapshot();
  const sourceLabel = formatSourceStatus(snapshot.sourceStatus);

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
                Read-only research telemetry for QuantBot alpha attribution,
                regime context, candidate review, and validation artifacts. Live
                files are used when available; fallback states are labeled
                explicitly.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <StatusBadge tone="accent">{sourceLabel}</StatusBadge>
              <StatusBadge>Read Only</StatusBadge>
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

        <OverviewMetrics snapshot={snapshot} />

        <section className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-[0.8fr_1.2fr]">
          <TerminalPanel
            action={formatSourceStatus(snapshot.regime.sourceStatus)}
            eyebrow="Regime"
            priority="primary"
            title="Regime Monitor"
          >
            <RegimeMonitor regime={snapshot.regime} />
          </TerminalPanel>
          <TerminalPanel
            action="Read-only artifacts"
            eyebrow="Registry"
            priority="primary"
            title="Alpha Registry"
          >
            <AlphaRegistry entries={snapshot.registry} />
          </TerminalPanel>
        </section>

        <section className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-[1.1fr_0.9fr]">
          <TerminalPanel
            action={formatSourceStatus(snapshot.pipeline.sourceStatus)}
            eyebrow="Validation"
            title="Research Pipeline"
          >
            <ValidationPipeline snapshot={snapshot} />
          </TerminalPanel>
          <TerminalPanel eyebrow="Signals" title="Signal Health" action="Artifacts">
            <SignalHealth signals={snapshot.signalHealth} />
          </TerminalPanel>
        </section>

        <section className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-[1.15fr_0.85fr]">
          <TerminalPanel eyebrow="Sources" title="Artifact Freshness" action="Read only">
            <ArtifactSources sources={snapshot.sources} />
          </TerminalPanel>
          <TerminalPanel
            eyebrow="Compliance"
            title="Research Environment"
            action="Informational"
            priority="passive"
          >
            <div className="grid gap-3 font-mono text-[11px] uppercase leading-6 tracking-[0.12em] text-[#8c90a1]">
              <div className="rounded-xl border border-[#243042] bg-[#050505]/78 p-4">
                No live trading access is provided from this workspace.
              </div>
              <div className="rounded-xl border border-[#243042] bg-[#050505]/78 p-4">
                Research artifacts are read-only and never modify bot execution,
                scheduler, risk, or strategy logic.
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

function OverviewMetrics({ snapshot }: { snapshot: AlphaLabSnapshot }) {
  const metrics = [
    {
      label: "Active Pipelines",
      value: padMetric(snapshot.overview.activePipelines),
      detail: "Observed alpha activity",
      tone: snapshot.overview.activePipelines > 0 ? ("good" as const) : ("muted" as const),
      emphasis: true,
    },
    {
      label: "Candidates",
      value: padMetric(snapshot.overview.candidatesInReview),
      detail: "Registry entries",
      tone: "muted" as const,
    },
    {
      label: "Validation",
      value: padMetric(snapshot.overview.validationStages),
      detail: "Artifact stages",
      tone: snapshot.overview.validationStages > 0 ? ("good" as const) : ("warning" as const),
    },
    {
      label: "Deployment",
      value: padMetric(snapshot.overview.deploymentCandidates),
      detail: "Baseline candidates",
      tone: snapshot.overview.deploymentCandidates > 0 ? ("good" as const) : ("muted" as const),
    },
  ];

  return (
    <section className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <MetricTile key={metric.label} {...metric} compact />
      ))}
    </section>
  );
}

function RegimeMonitor({ regime }: { regime: AlphaLabRegime }) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-[var(--accent-primary)]/35 bg-[linear-gradient(135deg,rgb(var(--accent-soft-rgb)/0.58),rgba(5,5,5,0.76))] p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8c90a1]">
              Current Regime
            </div>
            <div className="mt-3 text-3xl font-semibold text-white">
              {regime.current ?? "Unavailable"}
            </div>
          </div>
          <StatusLed state={regime.current ? "online" : "standby"} />
        </div>
        <div className="mt-3 font-mono text-xs uppercase tracking-[0.12em] text-[var(--accent-primary)]">
          {regime.message}
        </div>
        <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#8c90a1]">
          Source: {regime.source}
          {regime.lastUpdate ? ` · ${formatTimestamp(regime.lastUpdate)}` : ""}
        </div>
      </div>
      <div className="grid gap-3">
        {regime.scores.map((score) => (
          <MiniBarMeter
            key={score.label}
            label={`${score.label} dispersion`}
            tone={score.state === "online" ? "good" : "accent"}
            value={score.value}
            width={score.width}
          />
        ))}
      </div>
      <div className="rounded-xl border border-[#1f1f1f] bg-[#050505]/72 p-3 font-mono text-[10px] uppercase leading-5 tracking-[0.12em] text-[#8c90a1]">
        {regime.transition}
      </div>
    </div>
  );
}

function AlphaRegistry({ entries }: { entries: AlphaLabRegistryEntry[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {entries.map((alpha) => {
        const content = (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--accent-primary)]">
                  {alpha.family}
                </div>
                <h2 className="mt-2 text-lg font-semibold text-white">
                  {alpha.name}
                </h2>
              </div>
              <StatusLed state={alpha.activity !== "Inactive" ? "online" : "standby"} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 font-mono text-[10px] uppercase tracking-[0.12em]">
              <DataCell label="Status" value={alpha.status} />
              <DataCell label="Stage" value={alpha.stage} />
              <DataCell label="Readiness" value={alpha.readiness} />
              <DataCell label="Stability" value={alpha.stability} />
            </div>
            <div className="mt-3 rounded-xl border border-[#1f1f1f] bg-[#050505]/72 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#8c90a1]">
              Activity:{" "}
              <span className="text-[var(--accent-primary)]">{alpha.activity}</span>
              <span className="mt-1 block text-[#6f7485]">
                {formatSourceStatus(alpha.sourceStatus)} · {alpha.source}
              </span>
            </div>
          </>
        );
        const className =
          "rounded-2xl border border-[#243042] bg-[linear-gradient(180deg,rgba(8,8,8,0.92),rgba(5,5,5,0.72))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] transition duration-200 hover:-translate-y-px hover:border-[var(--accent-primary)]/45";

        if (!alpha.slug) {
          return (
            <article className={className} key={`${alpha.name}-${alpha.source}`}>
              {content}
            </article>
          );
        }

        return (
          <Link
            className={className}
            href={`/alpha-lab/${alpha.slug}`}
            key={`${alpha.name}-${alpha.source}`}
          >
            {content}
          </Link>
        );
      })}
    </div>
  );
}

function ValidationPipeline({ snapshot }: { snapshot: AlphaLabSnapshot }) {
  return (
    <div className="space-y-4">
      <TimelineProgress currentIndex={snapshot.pipeline.currentIndex} stages={pipelineStages} />
      <div className="grid gap-2">
        {snapshot.pipeline.candidates.length > 0 ? (
          snapshot.pipeline.candidates.map((candidate) => (
            <div
              className="grid gap-3 rounded-xl border border-[#1f1f1f] bg-[#050505]/72 p-3 font-mono text-[10px] uppercase tracking-[0.12em] text-[#8c90a1] sm:grid-cols-[1fr_auto]"
              key={`${candidate.name}-${candidate.status}`}
            >
              <div>
                <span className="text-[#d7dceb]">{candidate.name}</span>
                <span className="mt-1 block text-[#6f7485]">{candidate.detail}</span>
              </div>
              <span className={candidateStatusClass(candidate.status)}>
                {candidate.status}
              </span>
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-[#243042] bg-[#050505]/72 p-4 font-mono text-[11px] uppercase leading-6 tracking-[0.12em] text-[#8c90a1]">
            No Alpha Factory candidate artifact was parsed. Pipeline view is
            waiting for real registry rows.
          </div>
        )}
      </div>
    </div>
  );
}

function SignalHealth({ signals }: { signals: AlphaLabSignalHealth[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {signals.map((signal) => (
        <MetricTile
          compact
          detail={`${signal.detail} · ${formatSourceStatus(signal.sourceStatus)}`}
          key={signal.label}
          label={signal.label}
          tone={signal.tone}
          value={signal.value}
        />
      ))}
    </div>
  );
}

function ArtifactSources({ sources }: { sources: AlphaLabSource[] }) {
  return (
    <div className="grid gap-2">
      {sources.map((source) => (
        <div
          className="grid gap-3 rounded-xl border border-[#1f1f1f] bg-[#050505]/72 p-3 font-mono text-[10px] uppercase tracking-[0.12em] text-[#8c90a1] sm:grid-cols-[1fr_auto]"
          key={source.fileName}
        >
          <div>
            <div className="text-[#d7dceb]">{source.fileName}</div>
            <div className="mt-1 text-[#6f7485]">
              Rows {source.rowCount} ·{" "}
              {source.lastModified ? formatTimestamp(source.lastModified) : "no timestamp"}
            </div>
          </div>
          <span className={sourceStatusClass(source.status)}>
            {formatSourceStatus(source.status)}
          </span>
        </div>
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

function padMetric(value: number) {
  return String(value).padStart(2, "0");
}

function formatSourceStatus(status: AlphaLabSourceStatus) {
  return status.replace(/_/g, " ");
}

function formatTimestamp(timestamp: string) {
  const parsed = new Date(timestamp);
  if (Number.isNaN(parsed.getTime())) return timestamp;
  return parsed.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function sourceStatusClass(status: AlphaLabSourceStatus) {
  const base =
    "inline-flex items-center justify-center rounded-lg border px-2.5 py-1 text-[10px] uppercase tracking-[0.12em]";
  if (status === "LIVE_FILE") {
    return `${base} border-emerald-400/30 bg-emerald-400/[0.08] text-emerald-200`;
  }
  if (status === "STALE_FILE" || status === "LIVE_FILE_EMPTY") {
    return `${base} border-amber-300/30 bg-amber-300/[0.08] text-amber-200`;
  }
  if (status === "PARSE_ERROR") {
    return `${base} border-red-300/30 bg-red-300/[0.08] text-red-200`;
  }
  return `${base} border-[#243042] bg-[#0e0e0e]/82 text-[#8c90a1]`;
}

function candidateStatusClass(status: "PASS_TO_BASELINE" | "WATCHLIST" | "REJECT") {
  const base =
    "inline-flex items-center justify-center rounded-lg border px-2.5 py-1 text-[10px] uppercase tracking-[0.12em]";
  if (status === "PASS_TO_BASELINE") {
    return `${base} border-emerald-400/30 bg-emerald-400/[0.08] text-emerald-200`;
  }
  if (status === "WATCHLIST") {
    return `${base} border-[var(--accent-primary)]/35 bg-[var(--accent-surface)]/80 text-[var(--accent-primary)]`;
  }
  return `${base} border-[#243042] bg-[#0e0e0e]/82 text-[#8c90a1]`;
}
