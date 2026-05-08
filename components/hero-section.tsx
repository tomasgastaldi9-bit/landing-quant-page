const terminalMetrics = [
  { label: "Volatility", value: "14.2%" },
  { label: "Alpha Signal", value: "Strong", accent: true },
];

export function HeroSection() {
  return (
    <section
      id="platform"
      className="relative overflow-hidden border-b border-[#243042] bg-[#050505] bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px),url('https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=2070&auto=format&fit=crop')] bg-[size:32px_32px,32px_32px,cover] bg-center"
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,0.94),rgba(5,5,5,0.74)_48%,rgba(5,5,5,0.9))]" />
      <div className="relative mx-auto grid min-h-[660px] max-w-7xl grid-cols-1 items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 border border-[#424655] bg-[#0e0e0e]/80 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[#63f7ff]">
            <span className="size-1.5 bg-[#63f7ff]" />
            Sistema Online
          </div>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-normal text-white sm:text-6xl lg:text-7xl">
            Trading Cuantitativo Cripto.{" "}
            <span className="text-[#63f7ff]">Totalmente Automatizado.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#c2c6d8] sm:text-xl">
            Sistema avanzado de trading multi-alpha diseñado para mercados de
            futuros de criptomonedas institucionales.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href="#metrics"
              className="border border-[#568dff] bg-[#0058cb] px-7 py-4 text-center text-sm font-medium text-white shadow-[0_0_18px_rgba(86,141,255,0.35)] transition hover:brightness-110"
            >
              Ver Rendimiento
            </a>
            <a
              href="#contact"
              className="border border-[#1f1f1f] bg-[#0a0a0a]/80 px-7 py-4 text-center text-sm font-medium text-white backdrop-blur-xl transition hover:border-[#63f7ff] hover:text-[#63f7ff]"
            >
              Solicitar Acceso
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:mr-0">
          <div className="absolute -left-10 top-8 hidden h-80 w-80 border border-[#1f1f1f] bg-[#1f1f1f]/45 backdrop-blur-sm lg:block" />
          <div className="relative border border-[#424655] bg-[#0a0a0a]/88 p-5 shadow-[0_0_30px_rgba(99,247,255,0.08)] backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-[#424655] pb-4">
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#e2e2e2]">
                Q-Terminal V2
              </span>
              <span className="font-mono text-sm text-[#63f7ff]">
                {"///"}
              </span>
            </div>
            <div className="mt-6 flex items-center justify-between font-mono text-sm">
              <span className="uppercase text-[#e2e2e2]">BTC-PERP</span>
              <span className="text-[#63f7ff]">+2.45%</span>
            </div>
            <div className="mt-4 h-28 border border-[#424655] bg-[#1f1f1f] p-3">
              <svg
                aria-label="Performance sparkline"
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
                <div
                  key={metric.label}
                  className="border border-[#424655] bg-[#050505] p-4"
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#c2c6d8]">
                    {metric.label}
                  </div>
                  <div
                    className={`mt-2 font-mono text-lg uppercase ${
                      metric.accent ? "text-[#63f7ff]" : "text-white"
                    }`}
                  >
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
