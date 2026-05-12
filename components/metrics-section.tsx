import Link from "next/link";

const metrics = [
  {
    label: "Execution Mode",
    value: "Demo",
    detail: "Testnet / Paper",
    href: "/demo-testnet",
  },
  {
    label: "Risk Layer",
    value: "Active",
    detail: "Policy Controls",
    href: "/risk-layer",
  },
  {
    label: "Monitoring",
    value: "Live",
    detail: "System Telemetry",
    href: "/monitoring",
  },
  {
    label: "Alpha Lab",
    value: "Multi",
    detail: "Research Signals",
    href: "/alpha-lab",
  },
];

const architecture = [
  {
    title: "Motor Multi-Alpha",
    body: "Arquitectura de investigacion para organizar modelos estadisticos, sleeves y senales por regimen sin prometer performance futura.",
    wide: true,
    icon: "++",
    href: "/alpha-lab",
  },
  {
    title: "Controles de Riesgo",
    body: "Gestion de exposicion dinamica y limites estrictos por posicion en tiempo real.",
    icon: "[]",
    href: "/risk-layer",
  },
  {
    title: "Observabilidad Operativa",
    body: "Superficie read-only para equity, posiciones, logs, alertas y salud del sistema en demo/testnet.",
    icon: "<>",
    href: "/monitoring",
  },
  {
    title: "Disciplina Metodologica",
    body: "Workflow research-first con backtesting, walk-forward, validacion paper/demo y revisiones de despliegue.",
    wide: true,
    icon: "//",
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
      className="border-b border-[#243042] bg-[#050505] bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:32px_32px]"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-8 lg:py-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent-primary)]">
              Platform Layer
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal text-white">
              Capacidades de Plataforma
            </h2>
          </div>
          <div className="w-fit rounded-full border border-[#243042] bg-white/[0.03] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#8c90a1] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            Private beta capability snapshot
          </div>
        </div>
        <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <Link
              key={metric.label}
              href={metric.href}
              className="group relative overflow-hidden rounded-2xl border border-[#243042]/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.018)_42%,rgba(5,5,5,0.72))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.045),0_18px_50px_rgba(0,0,0,0.22)] backdrop-blur-sm transition duration-200 hover:-translate-y-1 hover:border-[var(--accent-primary)]/45 hover:shadow-[inset_0_1px_0_rgb(var(--accent-primary-rgb)/0.08),0_24px_70px_rgba(0,0,0,0.3)] sm:p-6"
            >
              <div className="absolute inset-x-5 top-0 h-px bg-[linear-gradient(90deg,transparent,rgb(var(--accent-primary-rgb)/0.42),transparent)] opacity-60 transition-opacity group-hover:opacity-100" />
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#c2c6d8]">
                {metric.label}
              </div>
              <div className="mt-3 font-mono text-[34px] font-semibold leading-none tracking-normal text-white sm:text-[42px]">
                {metric.value}
              </div>
              <div className="mt-5 inline-flex rounded-full border border-[var(--accent-primary)]/25 bg-[var(--accent-soft)]/70 px-3 py-1.5 font-mono text-xs text-[var(--accent-primary)] transition-colors group-hover:border-[var(--accent-primary)]/55">
                {metric.detail}
              </div>
            </Link>
          ))}
        </div>

        <div id="risk-controls" className="mt-16 sm:mt-24">
          <div className="max-w-3xl rounded-2xl border border-[#1f1f1f]/80 bg-[#050505]/48 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] sm:p-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent-primary)]">
              Institutional Stack
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal text-white">
              Arquitectura Institucional
            </h2>
            <p className="mt-4 text-base leading-7 text-[#c2c6d8]">
              Infraestructura disenada para investigacion, simulacion de
              ejecucion y analisis de riesgo en entornos controlados.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
            {architecture.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={`group relative min-h-[230px] overflow-hidden rounded-2xl border border-[#243042]/70 bg-[radial-gradient(circle_at_18%_0%,rgb(var(--accent-primary-rgb)/0.08),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(5,5,5,0.74))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_18px_55px_rgba(0,0,0,0.2)] backdrop-blur-sm transition duration-200 hover:-translate-y-1 hover:border-[var(--accent-primary)]/45 hover:shadow-[inset_0_1px_0_rgb(var(--accent-primary-rgb)/0.07),0_24px_70px_rgba(0,0,0,0.3)] sm:p-6 ${
                  item.wide ? "lg:col-span-2" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="rounded-xl border border-[var(--accent-primary)]/25 bg-[var(--accent-soft)]/65 px-3 py-2 font-mono text-xl text-[var(--accent-primary)] shadow-[inset_0_1px_0_rgb(var(--accent-primary-rgb)/0.08)]">
                    {item.icon}
                  </div>
                  <div className="mt-1 h-px flex-1 bg-[linear-gradient(90deg,rgb(var(--accent-primary-rgb)/0.34),transparent)] opacity-60 transition-opacity group-hover:opacity-100" />
                </div>
                <h3 className="mt-8 text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#c2c6d8]">
                  {item.body}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-16 sm:mt-24">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div className="sticky top-28 rounded-[28px] border border-[#243042]/80 bg-[radial-gradient(circle_at_20%_0%,rgb(var(--accent-primary-rgb)/0.1),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.045),rgba(5,5,5,0.76))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_22px_70px_rgba(0,0,0,0.24)] sm:p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent-primary)]">
                Research Lifecycle
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-normal text-white">
                From alpha hypothesis to monitored testnet workflow.
              </h2>
              <p className="mt-4 text-base leading-7 text-[#c2c6d8]">
                The homepage now maps the product around the workflow a quant
                operator expects: research, validation, risk review, and
                observability before any live deployment conversation.
              </p>
              <Link
                href="/alpha-lab"
                className="mt-6 inline-flex rounded-xl border border-[var(--accent-primary)]/45 bg-[var(--accent-soft)] px-4 py-3 font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent-primary)] transition hover:border-[var(--accent-primary)] hover:bg-[var(--accent-surface)]"
              >
                Open Alpha Lab
              </Link>
            </div>

            <div className="grid gap-4">
              {lifecycle.map((item, index) => (
                <Link
                  className="group relative overflow-hidden rounded-2xl border border-[#243042]/72 bg-[linear-gradient(180deg,rgba(14,14,14,0.88),rgba(5,5,5,0.74))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_18px_50px_rgba(0,0,0,0.2)] transition duration-200 hover:-translate-y-1 hover:border-[var(--accent-primary)]/45 hover:bg-[linear-gradient(180deg,rgb(var(--accent-soft-rgb)/0.22),rgba(5,5,5,0.78))]"
                  href={item.href}
                  key={item.title}
                >
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="grid size-11 place-items-center rounded-2xl border border-[var(--accent-primary)]/34 bg-[var(--accent-soft)] font-mono text-xs text-[var(--accent-primary)]">
                        {item.phase}
                      </div>
                      {index < lifecycle.length - 1 ? (
                        <div className="mt-3 h-16 w-px bg-[linear-gradient(180deg,rgb(var(--accent-primary-rgb)/0.55),transparent)]" />
                      ) : null}
                    </div>
                    <div className="min-w-0 pb-2">
                      <h3 className="text-xl font-semibold text-white">
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

        <div className="mt-16 rounded-[32px] border border-[#243042]/80 bg-[radial-gradient(circle_at_82%_16%,rgb(var(--accent-primary-rgb)/0.11),transparent_34%),linear-gradient(180deg,rgba(14,14,14,0.92),rgba(5,5,5,0.82))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_28px_90px_rgba(0,0,0,0.28)] sm:mt-24 sm:p-6 lg:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent-primary)]">
                Deployment Workflow
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-normal text-white">
                A disciplined path from research candidate to operator review.
              </h2>
              <p className="mt-4 text-base leading-7 text-[#c2c6d8]">
                QuantBot presents deployment as a controlled review workflow,
                not a performance promise: every stage is framed around
                observability, risk policy, and testnet validation.
              </p>
            </div>
            <div className="rounded-2xl border border-[#243042] bg-[#050505]/68 p-4">
              <div className="grid gap-3">
                {deploymentSteps.map((step, index) => (
                  <div
                    className="flex items-center gap-3 rounded-xl border border-[#1f1f1f]/90 bg-[#0e0e0e]/70 px-3 py-3"
                    key={step}
                  >
                    <span
                      className={`size-2.5 rounded-full ${
                        index < 3
                          ? "bg-[var(--accent-primary)] shadow-[0_0_16px_rgb(var(--accent-primary-rgb)/0.22)]"
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

        <div className="mt-16 sm:mt-24">
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
              Launch Terminal Demo
            </Link>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {telemetryPanels.map((panel) => (
              <Link
                className="group overflow-hidden rounded-2xl border border-[#243042]/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(5,5,5,0.72))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_18px_50px_rgba(0,0,0,0.22)] transition duration-200 hover:-translate-y-1 hover:border-[var(--accent-primary)]/45"
                href={panel.href}
                key={panel.label}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-white">
                    {panel.label}
                  </div>
                  <span className="size-2 rounded-full bg-[var(--accent-primary)] shadow-[0_0_14px_rgb(var(--accent-primary-rgb)/0.24)]" />
                </div>
                <div className="mt-4 h-20 rounded-xl border border-[#1f1f1f]/90 bg-[#050505]/72 p-3">
                  <svg
                    aria-label={`${panel.label} preview sparkline`}
                    className="h-full w-full"
                    role="img"
                    viewBox="0 0 260 80"
                  >
                    <path
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
                <div className="mt-4 font-mono text-xs uppercase tracking-[0.12em] text-[var(--accent-primary)]">
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
