import Link from "next/link";

const terminalMetrics = [
  { label: "Mode", value: "Testnet", href: "/demo-testnet" },
  { label: "Signal State", value: "Research", accent: true, href: "/demo-testnet" },
];

export function HeroSection() {
  return (
    <section
      id="platform"
      className="relative overflow-hidden border-b border-[#243042] bg-[#050505] bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px),url('https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=2070&auto=format&fit=crop')] bg-[size:32px_32px,32px_32px,cover] bg-center"
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,0.96),rgba(5,5,5,0.8)_48%,rgba(5,5,5,0.93))]" />
      <div className="relative mx-auto grid min-h-[620px] max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:py-24">
        <div className="max-w-3xl">
          <Link
            href="/demo-testnet"
            className="mb-6 inline-flex items-center gap-2 rounded-xl border border-[#424655] bg-[#0e0e0e]/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#63f7ff] transition duration-200 hover:border-[#63f7ff] hover:bg-[#061719]"
          >
            <span className="size-1.5 bg-[#63f7ff]" />
            Sistema Online
          </Link>
          <h1 className="max-w-3xl text-[42px] font-semibold leading-[1.04] tracking-normal text-white sm:text-6xl lg:text-[68px]">
            Plataforma Quant Research.{" "}
            <span className="text-[#63f7ff]">Demo Execution Terminal.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-[#c2c6d8] sm:text-xl sm:leading-8">
            Private beta para investigacion multi-alpha, ejecucion demo/testnet
            y monitoreo operativo de estrategias cuantitativas.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="/dashboard"
              className="rounded-xl border border-[#568dff]/90 bg-[linear-gradient(135deg,#568dff,#0058cb)] px-7 py-4 text-center text-sm font-semibold text-white shadow-[0_14px_34px_rgba(0,88,203,0.22)] transition duration-200 hover:-translate-y-px hover:brightness-110"
            >
              Open Terminal Demo
            </a>
            <a
              href="/request-access"
              className="rounded-xl border border-[#1f1f1f] bg-[#0a0a0a]/82 px-7 py-4 text-center text-sm font-semibold text-white shadow-[0_14px_34px_rgba(0,0,0,0.18)] backdrop-blur-sm transition duration-200 hover:-translate-y-px hover:border-[#63f7ff] hover:text-[#63f7ff]"
            >
              Request Access
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[480px] lg:mr-0">
          <div className="absolute -left-8 top-8 hidden h-72 w-72 border border-[#1f1f1f] bg-[#1f1f1f]/40 backdrop-blur-sm lg:block" />
          <div className="relative overflow-hidden rounded-2xl border border-[#424655] bg-[linear-gradient(180deg,rgba(14,14,14,0.92),rgba(7,7,7,0.88))] p-4 shadow-[0_22px_70px_rgba(0,0,0,0.34)] backdrop-blur-sm sm:p-5">
            <div className="flex items-center justify-between border-b border-[#424655] pb-4">
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#e2e2e2]">
                Q-Terminal Demo
              </span>
              <span className="font-mono text-sm text-[#63f7ff]">
                {"///"}
              </span>
            </div>
            <div className="mt-6 flex items-center justify-between font-mono text-sm">
              <span className="uppercase text-[#e2e2e2]">TESTNET-PERP</span>
              <span className="text-[#63f7ff]">Monitoring</span>
            </div>
            <div className="mt-4 h-28 rounded-xl border border-[#424655] bg-[linear-gradient(180deg,#242424,#151515)] p-3">
              <svg
                aria-label="Demo monitoring sparkline"
                className="h-full w-full"
                role="img"
                viewBox="0 0 420 130"
              >
                <defs>
                  <linearGradient id="lineFill" x1="0" x2="0" y1="0" y2="1">
                    <stop stopColor="#63f7ff" stopOpacity="0.28" />
                    <stop offset="1" stopColor="#63f7ff" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 102 L82 78 L168 90 L252 46 L336 58 L420 20 L420 130 L0 130 Z"
                  fill="url(#lineFill)"
                />
                <polyline
                  fill="none"
                  points="0,102 82,78 168,90 252,46 336,58 420,20"
                  stroke="#63f7ff"
                  strokeWidth="4"
                />
              </svg>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {terminalMetrics.map((metric) => (
                <Link
                  key={metric.label}
                  href={metric.href}
                  className="rounded-xl border border-[#424655] bg-[#050505] p-3 transition duration-200 hover:-translate-y-px hover:border-[#63f7ff] hover:bg-[#061719] sm:p-4"
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#c2c6d8]">
                    {metric.label}
                  </div>
                  <div
                    className={`mt-2 font-mono text-base uppercase sm:text-lg ${
                      metric.accent ? "text-[#63f7ff]" : "text-white"
                    }`}
                  >
                    {metric.value}
                  </div>
                </Link>
              ))}
            </div>
            <a
              href="/dashboard"
              className="mt-4 block rounded-xl border border-[#243042] bg-[#050505] px-4 py-3 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-[#63f7ff] transition duration-200 hover:border-[#63f7ff] hover:bg-[#061719]"
            >
              Terminal Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
