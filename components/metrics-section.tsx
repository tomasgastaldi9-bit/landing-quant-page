import Link from "next/link";
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const SVG_BASE: IconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

function CpuIcon(props: IconProps) {
  return (
    <svg {...SVG_BASE} {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
    </svg>
  );
}

function ShieldIcon(props: IconProps) {
  return (
    <svg {...SVG_BASE} {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function ActivityIcon(props: IconProps) {
  return (
    <svg {...SVG_BASE} {...props}>
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

function BookOpenIcon(props: IconProps) {
  return (
    <svg {...SVG_BASE} {...props}>
      <path d="M2 4h7a3 3 0 0 1 3 3v13" />
      <path d="M22 4h-7a3 3 0 0 0-3 3v13" />
      <path d="M2 4v15h7a3 3 0 0 1 3 3" />
      <path d="M22 4v15h-7a3 3 0 0 0-3 3" />
    </svg>
  );
}

const metrics = [
  {
    label: "Execution Mode",
    headline: "Testnet-only execution",
    detail: "No real capital",
    href: "/demo-testnet",
  },
  {
    label: "Risk Layer",
    headline: "Policy-driven controls",
    detail: "Active enforcement",
    href: "/risk-layer",
  },
  {
    label: "Monitoring",
    headline: "Read-only telemetry",
    detail: "Live system view",
    href: "/monitoring",
  },
  {
    label: "Alpha Lab",
    headline: "Multi-sleeve research",
    detail: "Regime-aware",
    href: "/alpha-lab",
  },
];

const architecture = [
  {
    title: "Multi-Alpha Engine",
    body: "Research architecture for organizing statistical models, sleeves, and signals by regime — without promising future performance.",
    wide: true,
    Icon: CpuIcon,
    href: "/alpha-lab",
  },
  {
    title: "Risk Controls",
    body: "Dynamic exposure management and strict per-position limits enforced in real time.",
    Icon: ShieldIcon,
    href: "/risk-layer",
  },
  {
    title: "Operational Observability",
    body: "Read-only surface for equity, positions, logs, alerts, and system health across demo/testnet.",
    Icon: ActivityIcon,
    href: "/monitoring",
  },
  {
    title: "Methodological Discipline",
    body: "Research-first workflow with backtesting, walk-forward, paper/demo validation, and deployment reviews.",
    wide: true,
    Icon: BookOpenIcon,
    href: "/methodology",
  },
];

const lifecycle = [
  {
    phase: "01",
    title: "Hypothesis",
    body: "Research ideas are framed by market regime, expected behavior, and portfolio role before validation begins.",
    href: "/alpha-lab",
  },
  {
    phase: "02",
    title: "Backtest",
    body: "Candidates move through controlled historical review without presenting outcomes as guaranteed performance.",
    href: "/methodology",
  },
  {
    phase: "03",
    title: "Walk-forward",
    body: "Signal stability, turnover, persistence, and correlation are reviewed before paper/testnet observation.",
    href: "/alpha-lab",
  },
  {
    phase: "04",
    title: "Paper/Testnet",
    body: "Execution, logs, risk controls, positions, and equity telemetry are monitored with no real capital.",
    href: "/demo-testnet",
  },
];

const deploymentSteps = [
  "Research review",
  "Risk policy check",
  "Testnet observation",
  "Operator monitoring",
  "Deployment candidate",
];

const telemetryPanels = [
  {
    label: "Equity Monitor",
    value: "Read-only curve",
    href: "/dashboard",
  },
  {
    label: "Risk Layer",
    value: "Policy state",
    href: "/risk-layer",
  },
  {
    label: "Event Stream",
    value: "Execution logs",
    href: "/dashboard#execution-logs",
  },
];

export function MetricsSection() {
  return (
    <section
      id="metrics"
      className="relative overflow-hidden border-b border-[#243042] bg-[#050505] bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]"
    >
      <div className="pointer-events-none absolute left-[5%] top-[18%] hidden h-72 w-72 rounded-full bg-[radial-gradient(circle,rgb(var(--accent-secondary-rgb)/0.04),transparent_68%)] md:block" />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-8 lg:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent-primary)]">
              Platform Capabilities
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal text-white">
              What QuantBot Includes
            </h2>
          </div>
          <div className="w-fit rounded-full border border-[#243042] bg-white/[0.03] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#8c90a1] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            Private beta capability snapshot
          </div>
        </div>
        <div className="mt-7 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <Link
              key={metric.label}
              href={metric.href}
              className="group relative overflow-hidden rounded-2xl border border-[#243042]/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.018)_42%,rgba(5,5,5,0.72))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_28px_rgba(0,0,0,0.16)] transition-colors duration-200 hover:border-[var(--accent-primary)]/50 sm:p-5"
            >
              <div className="absolute inset-x-5 top-0 h-px bg-[linear-gradient(90deg,transparent,rgb(var(--accent-primary-rgb)/0.42),transparent)] opacity-60 transition-opacity group-hover:opacity-100" />
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#c2c6d8]">
                {metric.label}
              </div>
              <div className="mt-3 text-lg font-semibold leading-snug tracking-normal text-white">
                {metric.headline}
              </div>
              <div className="mt-4 inline-flex rounded-full border border-[var(--accent-primary)]/25 bg-[var(--accent-soft)]/70 px-3 py-1.5 font-mono text-[11px] text-[var(--accent-primary)] transition-colors group-hover:border-[var(--accent-primary)]/55">
                {metric.detail}
              </div>
            </Link>
          ))}
        </div>

        <div id="risk-controls" className="mt-14 border-t border-[#1f1f1f]/90 pt-10 sm:mt-20 sm:pt-12">
          <div className="max-w-3xl rounded-2xl border border-[#1f1f1f]/80 bg-[#050505]/48 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] sm:p-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent-primary)]">
              Institutional Stack
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal text-white">
              Institutional Architecture
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#c2c6d8] sm:text-base sm:leading-7">
              Infrastructure designed for research, execution simulation, and
              risk analysis in controlled environments.
            </p>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-3.5 lg:grid-cols-3">
            {architecture.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={`group relative min-h-[200px] overflow-hidden rounded-2xl border border-[#243042]/70 bg-[radial-gradient(circle_at_18%_0%,rgb(var(--accent-primary-rgb)/0.045),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(5,5,5,0.74))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_10px_30px_rgba(0,0,0,0.16)] transition-colors duration-200 hover:border-[var(--accent-primary)]/50 sm:p-5 ${
                  item.wide ? "lg:col-span-2" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="grid size-11 place-items-center rounded-xl border border-[var(--accent-primary)]/25 bg-[var(--accent-soft)]/65 text-[var(--accent-primary)] shadow-[inset_0_1px_0_rgb(var(--accent-primary-rgb)/0.08)]">
                    <item.Icon />
                  </div>
                  <div className="mt-1 h-px flex-1 bg-[linear-gradient(90deg,rgb(var(--accent-primary-rgb)/0.34),transparent)] opacity-60 transition-opacity group-hover:opacity-100" />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2.5 max-w-2xl text-sm leading-6 text-[#c2c6d8]">
                  {item.body}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-[#1f1f1f]/90 pt-10 sm:mt-20 sm:pt-12">
          <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div className="sticky top-28 rounded-[28px] border border-[#243042]/80 bg-[radial-gradient(circle_at_20%_0%,rgb(var(--accent-primary-rgb)/0.055),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.045),rgba(5,5,5,0.76))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_12px_34px_rgba(0,0,0,0.16)] sm:p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent-primary)]">
                Research Lifecycle
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-normal text-white">
                From alpha hypothesis to monitored testnet workflow.
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#c2c6d8] sm:text-base sm:leading-7">
                The homepage now maps the product around the workflow a quant
                operator expects: research, validation, risk review, and
                observability before any live deployment conversation.
              </p>
              <Link
                href="/alpha-lab"
                className="mt-5 inline-flex rounded-xl border border-[var(--accent-primary)]/45 bg-[var(--accent-soft)] px-4 py-2.5 font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent-primary)] transition hover:border-[var(--accent-primary)] hover:bg-[var(--accent-surface)]"
              >
                Open Alpha Lab
              </Link>
            </div>

            <div className="grid gap-3">
              {lifecycle.map((item, index) => (
                <Link
                  className="group relative overflow-hidden rounded-2xl border border-[#243042]/72 bg-[linear-gradient(180deg,rgba(14,14,14,0.88),rgba(5,5,5,0.74))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_10px_28px_rgba(0,0,0,0.16)] transition-colors duration-200 hover:border-[var(--accent-primary)]/50 hover:bg-[linear-gradient(180deg,rgb(var(--accent-soft-rgb)/0.18),rgba(5,5,5,0.78))]"
                  href={item.href}
                  key={item.title}
                >
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="grid size-11 place-items-center rounded-2xl border border-[var(--accent-primary)]/34 bg-[var(--accent-soft)] font-mono text-xs text-[var(--accent-primary)] shadow-[0_0_18px_rgb(var(--accent-primary-rgb)/0.06)]">
                        {item.phase}
                      </div>
                      {index < lifecycle.length - 1 ? (
                        <div className="mt-2.5 h-12 w-px bg-[linear-gradient(180deg,rgb(var(--accent-primary-rgb)/0.55),transparent)]" />
                      ) : null}
                    </div>
                    <div className="min-w-0 pb-2">
                      <h3 className="text-lg font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-[#c2c6d8]">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 rounded-[32px] border border-[#243042]/80 bg-[radial-gradient(circle_at_82%_16%,rgb(var(--accent-primary-rgb)/0.055),transparent_34%),linear-gradient(180deg,rgba(14,14,14,0.92),rgba(5,5,5,0.82))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_12px_34px_rgba(0,0,0,0.16)] sm:mt-20 sm:p-5 lg:p-6">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent-primary)]">
                Deployment Workflow
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-normal text-white">
                A disciplined path from research candidate to operator review.
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#c2c6d8] sm:text-base sm:leading-7">
                QuantBot presents deployment as a controlled review workflow,
                not a performance promise: every stage is framed around
                observability, risk policy, and testnet validation.
              </p>
            </div>
            <div className="rounded-2xl border border-[#243042] bg-[#050505]/68 p-3">
              <div className="grid gap-2">
                {deploymentSteps.map((step, index) => (
                  <div
                    className="flex items-center gap-3 rounded-xl border border-[#1f1f1f]/90 bg-[#0e0e0e]/70 px-3 py-2.5"
                    key={step}
                  >
                    <span
                      className={`size-2.5 rounded-full ${
                        index < 3
                          ? "status-pulse bg-[var(--accent-primary)]"
                          : "bg-[#424655]"
                      }`}
                    />
                    <span className="font-mono text-xs uppercase tracking-[0.12em] text-white">
                      {step}
                    </span>
                    <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.12em] text-[#8c90a1]">
                      {index < 3 ? "Observed" : "Pending"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-[#1f1f1f]/90 pt-10 sm:mt-20 sm:pt-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent-primary)]">
                Monitoring Preview
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-normal text-white">
                Telemetry that feels like an operator workstation.
              </h2>
            </div>
            <Link
              className="w-fit rounded-xl border border-[#243042] bg-[#050505]/82 px-4 py-3 font-mono text-xs uppercase tracking-[0.14em] text-[#c2c6d8] transition hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
              href="/dashboard"
            >
              Open Demo Terminal
            </Link>
          </div>
          <div className="mt-6 grid gap-3.5 lg:grid-cols-3">
            {telemetryPanels.map((panel, index) => (
              <Link
                className="group overflow-hidden rounded-2xl border border-[#243042]/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(5,5,5,0.72))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_10px_28px_rgba(0,0,0,0.16)] transition-colors duration-200 hover:border-[var(--accent-primary)]/45"
                href={panel.href}
                key={panel.label}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-white">
                    {panel.label}
                  </div>
                  <span
                    className={`size-2 rounded-full bg-[var(--accent-primary)] ${
                      index === 0 ? "status-pulse" : ""
                    }`}
                  />
                </div>
                <div className="mt-3 h-18 rounded-xl border border-[#1f1f1f]/90 bg-[#050505]/72 p-3">
                  <svg
                    aria-label={`${panel.label} preview sparkline`}
                    className="h-full w-full"
                    role="img"
                    viewBox="0 0 260 80"
                  >
                    <path
                      className={index === 0 ? "trace-draw" : ""}
                      d="M0 58 C42 42 62 44 96 50 C128 56 144 18 174 28 C204 38 218 24 260 14"
                      fill="none"
                      stroke="var(--accent-primary)"
                      strokeLinecap="round"
                      strokeWidth="3"
                    />
                    <path
                      d="M0 58 C42 42 62 44 96 50 C128 56 144 18 174 28 C204 38 218 24 260 14 L260 80 L0 80 Z"
                      fill="rgb(var(--accent-primary-rgb)/0.12)"
                    />
                  </svg>
                </div>
                <div className="mt-3 font-mono text-xs uppercase tracking-[0.12em] text-[var(--accent-primary)]">
                  {panel.value}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
