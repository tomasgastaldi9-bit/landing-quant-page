import {
  MetricTile,
  StatusBadge,
  StatusLed,
  TerminalPanel,
} from "@/components/dashboard/terminal-ui";
import {
  alphaCandidates,
  getAlphaCandidate,
  pipelineStages,
  type AlphaCandidate,
} from "@/lib/alpha-lab/candidates";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return alphaCandidates.map((candidate) => ({
    candidate: candidate.slug,
  }));
}

export default async function CandidateDetailPage({
  params,
}: {
  params: Promise<{ candidate: string }>;
}) {
  const { candidate: slug } = await params;
  const candidate = getAlphaCandidate(slug);

  if (!candidate) {
    notFound();
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:32px_32px] text-[#e2e2e2]">
      <div className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6 lg:py-10">
        <CandidateHeader candidate={candidate} />

        <section className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-6">
          {candidate.validationMetrics.map((metric) => (
            <MetricTile key={metric.label} {...metric} compact />
          ))}
        </section>

        <section className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-[0.9fr_1.1fr]">
          <TerminalPanel
            eyebrow="Research"
            title="Research Summary"
            action="Review memo"
            priority="primary"
          >
            <ResearchSummary candidate={candidate} />
          </TerminalPanel>
          <TerminalPanel
            eyebrow="Validation"
            title="Validation Timeline"
            action="Gated workflow"
            priority="primary"
          >
            <ValidationTimeline currentStage={candidate.stage} />
          </TerminalPanel>
        </section>

        <section className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-[0.72fr_1.28fr]">
          <TerminalPanel
            eyebrow="Regime"
            title="Regime Compatibility"
            action={candidate.regimeAlignment}
          >
            <RegimeCompatibility candidate={candidate} />
          </TerminalPanel>
          <TerminalPanel
            eyebrow="Telemetry"
            title="Research Telemetry"
            action="Mock instrumentation"
          >
            <ResearchTelemetry candidate={candidate} />
          </TerminalPanel>
        </section>

        <section className="mt-3">
          <TerminalPanel
            eyebrow="Compliance"
            title="Research Disclaimer"
            action="Informational"
            priority="passive"
          >
            <div className="grid gap-3 font-mono text-[11px] uppercase leading-6 tracking-[0.12em] text-[#8c90a1] md:grid-cols-3">
              <div className="rounded-xl border border-[#243042] bg-[#050505]/78 p-4">
                Candidate detail pages use mock research data only.
              </div>
              <div className="rounded-xl border border-[#243042] bg-[#050505]/78 p-4">
                No live capital, live trading access, or execution approval is
                provided.
              </div>
              <div className="rounded-xl border border-[#243042] bg-[#050505]/78 p-4">
                For research and informational purposes only. Performance is not
                guaranteed.
              </div>
            </div>
          </TerminalPanel>
        </section>
      </div>
    </main>
  );
}

function CandidateHeader({ candidate }: { candidate: AlphaCandidate }) {
  return (
    <section className="rounded-3xl border border-[#243042]/82 bg-[radial-gradient(circle_at_18%_0%,rgb(var(--accent-primary-rgb)/0.14),transparent_30%),linear-gradient(180deg,rgba(14,14,14,0.92),rgba(5,5,5,0.78))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_28px_90px_rgba(0,0,0,0.3)] sm:p-7">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-4xl">
          <Link
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--accent-primary)] transition-colors hover:text-white"
            href="/alpha-lab"
          >
            &lt;- Alpha Lab
          </Link>
          <div className="mt-5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#8c90a1]">
            Candidate Detail / Research Review
          </div>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-6xl">
            {candidate.name}
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#c2c6d8] sm:text-base">
            {candidate.objective}
          </p>
        </div>
        <div className="grid min-w-0 gap-3 sm:min-w-[360px]">
          <div className="flex flex-wrap gap-2">
            <StatusBadge tone="accent">{candidate.status}</StatusBadge>
            <StatusBadge>{candidate.category}</StatusBadge>
            <StatusBadge>{candidate.stage}</StatusBadge>
          </div>
          <div className="rounded-2xl border border-[#243042] bg-[#050505]/74 p-4 font-mono text-[10px] uppercase tracking-[0.12em] shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]">
            <div className="grid gap-3 sm:grid-cols-2">
              <HeaderCell label="Regime" value={candidate.regimeAlignment} />
              <HeaderCell label="Readiness" value={candidate.readiness} />
              <HeaderCell label="Stability" value={candidate.stability} />
              <div className="rounded-xl border border-[#1f1f1f] bg-[#050505]/82 p-3">
                <div className="text-[#6f7485]">Research State</div>
                <div className="mt-2 flex items-center gap-2 text-[var(--accent-primary)]">
                  <StatusLed
                    state={
                      candidate.status === "Active Research" ? "online" : "standby"
                    }
                  />
                  {candidate.activity}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResearchSummary({ candidate }: { candidate: AlphaCandidate }) {
  const summaries = [
    ["Objective", candidate.objective],
    ["Behavioral Profile", candidate.behavioralProfile],
    ["Expected Regime Behavior", candidate.expectedRegimeBehavior],
    ["Portfolio Role", candidate.portfolioRole],
    ["Deployment Notes", candidate.deploymentNotes],
  ];

  return (
    <div className="grid gap-3">
      {summaries.map(([label, value]) => (
        <div
          className="rounded-2xl border border-[#243042] bg-[#050505]/78 p-4"
          key={label}
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent-primary)]">
            {label}
          </div>
          <p className="mt-3 text-sm leading-6 text-[#c2c6d8]">{value}</p>
        </div>
      ))}
    </div>
  );
}

function ValidationTimeline({ currentStage }: { currentStage: AlphaCandidate["stage"] }) {
  const currentIndex = pipelineStages.indexOf(currentStage);

  return (
    <div className="grid gap-3 lg:grid-cols-5">
      {pipelineStages.map((stage, index) => {
        const isComplete = index < currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <div
            className={`rounded-2xl border p-4 ${
              isCurrent
                ? "border-[var(--accent-primary)]/55 bg-[var(--accent-soft)]/62"
                : isComplete
                  ? "border-emerald-300/24 bg-emerald-300/[0.035]"
                  : "border-[#243042] bg-[#050505]/74"
            }`}
            key={stage}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#8c90a1]">
                Step {index + 1}
              </div>
              <StatusLed state={isCurrent || isComplete ? "online" : "standby"} />
            </div>
            <div className="mt-4 min-h-12 text-sm font-semibold text-white">
              {stage}
            </div>
            <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--accent-primary)]">
              {isCurrent ? "Current gate" : isComplete ? "Completed" : "Pending"}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function RegimeCompatibility({ candidate }: { candidate: AlphaCandidate }) {
  return (
    <div className="grid gap-4">
      {candidate.regimeCompatibility.map((regime) => (
        <div key={regime.label}>
          <div className="mb-2 flex items-center justify-between gap-3 font-mono text-xs uppercase tracking-[0.12em]">
            <span className="text-[#c2c6d8]">{regime.label} dispersion fit</span>
            <span className="text-[var(--accent-primary)]">{regime.score}/100</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full border border-[#243042] bg-[#050505]">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,var(--accent-secondary),var(--accent-primary))]"
              style={{ width: `${regime.score}%` }}
            />
          </div>
          <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#8c90a1]">
            {regime.note}
          </div>
        </div>
      ))}
    </div>
  );
}

function ResearchTelemetry({ candidate }: { candidate: AlphaCandidate }) {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {candidate.telemetry.map((panel) => (
        <div
          className="rounded-2xl border border-[#243042] bg-[#050505]/78 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]"
          key={panel.label}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#8c90a1]">
                {panel.label}
              </div>
              <div className="mt-2 font-mono text-xl font-semibold text-white">
                {panel.value}
              </div>
            </div>
            <StatusLed state="online" />
          </div>
          <Sparkline values={panel.series} />
          <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--accent-primary)]">
            {panel.detail}
          </div>
        </div>
      ))}
    </div>
  );
}

function Sparkline({ values }: { values: number[] }) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const points = values
    .map((value, index) => {
      const x = (index / Math.max(values.length - 1, 1)) * 180;
      const y = 54 - ((value - min) / range) * 42;
      return `${Number(x.toFixed(2))},${Number(y.toFixed(2))}`;
    })
    .join(" ");

  return (
    <div className="mt-4 h-20 rounded-xl border border-[#1f1f1f] bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(180deg,#101010,#050505)] bg-[size:18px_18px] p-3">
      <svg
        aria-label="Mock research telemetry sparkline"
        className="h-full w-full"
        role="img"
        viewBox="0 0 180 60"
      >
        <polyline
          fill="none"
          points={points}
          stroke="var(--accent-primary)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />
        <circle
          cx={points.split(" ").at(-1)?.split(",")[0] ?? "0"}
          cy={points.split(" ").at(-1)?.split(",")[1] ?? "0"}
          fill="var(--accent-primary)"
          r="3"
        />
      </svg>
    </div>
  );
}

function HeaderCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[#1f1f1f] bg-[#050505]/82 p-3">
      <div className="text-[#6f7485]">{label}</div>
      <div className="mt-2 text-[#c2c6d8]">{value}</div>
    </div>
  );
}
