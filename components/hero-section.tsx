import Link from "next/link";

const terminalMetrics = [
  { label: "Mode", value: "Testnet", href: "/demo-testnet" },
  { label: "Signal State", value: "Research", accent: true, href: "/alpha-lab" },
];

const consoleRows = [
  { label: "REGIME", value: "MID DISPERSION", tone: "text-[var(--accent-primary)]" },
  { label: "RISK", value: "READ-ONLY", tone: "text-emerald-300" },
  { label: "PIPELINE", value: "WALK-FORWARD", tone: "text-[#c2c6d8]" },
];

export function HeroSection() {
  return (
    <section
      id="platform"
      className="terminal-scan relative overflow-hidden border-b border-[#243042] bg-[#050505] bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px),url('https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=2070&auto=format&fit=crop')] bg-[size:32px_32px,32px_32px,cover] bg-center"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_18%,rgb(var(--accent-primary-rgb)/0.18),transparent_32%),linear-gradient(90deg,rgba(5,5,5,0.98),rgba(5,5,5,0.82)_48%,rgba(5,5,5,0.95))]" />
      <div className="ambient-drift absolute right-[8%] top-[12%] h-80 w-80 rounded-full bg-[radial-gradient(circle,rgb(var(--accent-primary-rgb)/0.14),transparent_64%)] blur-2xl" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(0,0,0,0.48)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(0deg,#050505,transparent)]" />
      <div className="relative mx-auto grid min-h-[640px] max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 sm:px-8 sm:py-16 lg:grid-cols-[1.02fr_0.98fr] lg:py-20">
        <div className="max-w-3xl">
          <Link
            href="/demo-testnet"
            className="mb-5 inline-flex items-center gap-2 rounded-xl border border-[#424655] bg-[#0e0e0e]/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent-primary)] transition duration-200 hover:border-[var(--accent-primary)] hover:bg-[var(--accent-soft)]"
          >
            <span className="status-pulse relative size-2 rounded-full bg-[var(--accent-primary)] before:absolute before:inset-[2px] before:rounded-full before:bg-white/40" />
            Sistema Online
          </Link>
          <h1 className="max-w-3xl text-[42px] font-semibold leading-[1.04] tracking-normal text-white sm:text-6xl lg:text-[72px]">
            Quant research desk for{" "}
            <span className="text-[var(--accent-primary)]">demo/testnet operations.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[#c2c6d8] sm:text-lg sm:leading-8">
            QuantBot brings alpha research, risk validation, execution logs,
            and operator monitoring into one read-only institutional terminal.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="/dashboard"
              className="rounded-xl border border-[var(--accent-secondary)]/90 bg-[linear-gradient(135deg,var(--accent-secondary),var(--accent-strong))] px-6 py-3.5 text-center text-sm font-semibold text-white shadow-[0_14px_34px_rgb(var(--accent-secondary-rgb)/0.22)] transition duration-200 hover:-translate-y-px hover:brightness-110"
            >
              Open Terminal Demo
            </a>
            <a
              href="/request-access"
              className="rounded-xl border border-[#1f1f1f] bg-[#0a0a0a]/82 px-6 py-3.5 text-center text-sm font-semibold text-white shadow-[0_14px_34px_rgba(0,0,0,0.18)] backdrop-blur-sm transition duration-200 hover:-translate-y-px hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
            >
              Request Access
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[480px] lg:mr-0">
          <div className="ambient-drift absolute -inset-10 hidden rounded-[3rem] bg-[radial-gradient(circle_at_54%_36%,rgb(var(--accent-primary-rgb)/0.14),transparent_62%)] blur-2xl lg:block" />
          <div className="absolute -left-6 top-10 hidden h-72 w-72 rounded-[2rem] border border-[#243042] bg-[var(--accent-soft)]/20 blur-[1px] backdrop-blur-sm lg:block" />
          <div className="absolute -right-6 bottom-8 hidden h-48 w-48 rounded-[2rem] border border-[#1f1f1f] bg-[#050505]/54 lg:block" />
          <div className="terminal-scan relative overflow-hidden rounded-[28px] border border-[#424655] bg-[linear-gradient(180deg,rgba(14,14,14,0.94),rgba(7,7,7,0.9))] p-4 shadow-[0_28px_90px_rgba(0,0,0,0.42),0_0_72px_rgb(var(--accent-primary-rgb)/0.08)] backdrop-blur-sm transition duration-300 hover:border-[var(--accent-primary)]/45 hover:shadow-[0_32px_100px_rgba(0,0,0,0.46),0_0_86px_rgb(var(--accent-primary-rgb)/0.12)]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgb(var(--accent-primary-rgb)/0.65),transparent)]" />
            <div className="flex items-center justify-between border-b border-[#424655] pb-3">
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#e2e2e2]">
                QuantBot Workstation
              </span>
              <span className="font-mono text-sm text-[var(--accent-primary)]">
                {"///"}
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between font-mono text-sm">
              <span className="uppercase text-[#e2e2e2]">TESTNET-PERP</span>
              <span className="text-[var(--accent-primary)]">Monitoring</span>
            </div>
            <div className="mt-3 h-24 rounded-xl border border-[#424655] bg-[linear-gradient(180deg,#242424,#151515)] p-3">
              <svg
                aria-label="Demo monitoring sparkline"
                className="h-full w-full"
                role="img"
                viewBox="0 0 420 130"
              >
                <defs>
                  <linearGradient id="lineFill" x1="0" x2="0" y1="0" y2="1">
                    <stop stopColor="var(--accent-primary)" stopOpacity="0.28" />
                    <stop offset="1" stopColor="var(--accent-primary)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 102 L82 78 L168 90 L252 46 L336 58 L420 20 L420 130 L0 130 Z"
                  fill="url(#lineFill)"
                />
                <polyline
                  className="trace-draw"
                  fill="none"
                  points="0,102 82,78 168,90 252,46 336,58 420,20"
                  stroke="var(--accent-primary)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle className="status-pulse" cx="420" cy="20" fill="var(--accent-primary)" r="6" />
              </svg>
            </div>
            <div className="mt-3 grid gap-1.5 rounded-2xl border border-[#243042] bg-[#050505]/68 p-3">
              {consoleRows.map((row) => (
                <div
                  className="flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.12em]"
                  key={row.label}
                >
                  <span className="text-[#8c90a1]">{row.label}</span>
                  <span className={row.tone}>{row.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              {terminalMetrics.map((metric) => (
                <Link
                  key={metric.label}
                  href={metric.href}
                  className="rounded-xl border border-[#424655] bg-[#050505] p-3 transition duration-300 hover:-translate-y-px hover:border-[var(--accent-primary)] hover:bg-[var(--accent-soft)] hover:shadow-[0_12px_34px_rgb(var(--accent-primary-rgb)/0.08)]"
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#c2c6d8]">
                    {metric.label}
                  </div>
                  <div
                    className={`mt-2 font-mono text-base uppercase sm:text-lg ${
                      metric.accent ? "text-[var(--accent-primary)]" : "text-white"
                    }`}
                  >
                    {metric.value}
                  </div>
                </Link>
              ))}
            </div>
            <a
              href="/dashboard"
              className="mt-3 block rounded-xl border border-[#243042] bg-[#050505] px-4 py-2.5 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--accent-primary)] transition duration-200 hover:border-[var(--accent-primary)] hover:bg-[var(--accent-soft)]"
            >
              Terminal Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
