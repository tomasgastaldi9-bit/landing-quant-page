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
    label: "Alpha Engine",
    value: "Multi",
    detail: "Research Signals",
    href: "/alpha-engine",
  },
];

const architecture = [
  {
    title: "Motor Multi-Alpha",
    body: "Arquitectura de investigacion para organizar modelos estadisticos, sleeves y senales por regimen sin prometer performance futura.",
    wide: true,
    icon: "++",
    href: "/alpha-engine",
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

export function MetricsSection() {
  return (
    <section
      id="metrics"
      className="border-b border-[#243042] bg-[#050505] bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:32px_32px]"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-8 lg:py-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#63f7ff]">
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
              className="group relative overflow-hidden rounded-2xl border border-[#243042]/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.018)_42%,rgba(5,5,5,0.72))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.045),0_18px_50px_rgba(0,0,0,0.22)] backdrop-blur-sm transition duration-200 hover:-translate-y-1 hover:border-[#63f7ff]/45 hover:shadow-[inset_0_1px_0_rgba(99,247,255,0.08),0_24px_70px_rgba(0,0,0,0.3)] sm:p-6"
            >
              <div className="absolute inset-x-5 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(99,247,255,0.42),transparent)] opacity-60 transition-opacity group-hover:opacity-100" />
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#c2c6d8]">
                {metric.label}
              </div>
              <div className="mt-3 font-mono text-[34px] font-semibold leading-none tracking-normal text-white sm:text-[42px]">
                {metric.value}
              </div>
              <div className="mt-5 inline-flex rounded-full border border-[#63f7ff]/25 bg-[#061719]/70 px-3 py-1.5 font-mono text-xs text-[#63f7ff] transition-colors group-hover:border-[#63f7ff]/55">
                {metric.detail}
              </div>
            </Link>
          ))}
        </div>

        <div id="risk-controls" className="mt-16 sm:mt-24">
          <div className="max-w-3xl rounded-2xl border border-[#1f1f1f]/80 bg-[#050505]/48 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] sm:p-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#63f7ff]">
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
                className={`group relative min-h-[230px] overflow-hidden rounded-2xl border border-[#243042]/70 bg-[radial-gradient(circle_at_18%_0%,rgba(99,247,255,0.08),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(5,5,5,0.74))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_18px_55px_rgba(0,0,0,0.2)] backdrop-blur-sm transition duration-200 hover:-translate-y-1 hover:border-[#63f7ff]/45 hover:shadow-[inset_0_1px_0_rgba(99,247,255,0.07),0_24px_70px_rgba(0,0,0,0.3)] sm:p-6 ${
                  item.wide ? "lg:col-span-2" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="rounded-xl border border-[#63f7ff]/25 bg-[#061719]/65 px-3 py-2 font-mono text-xl text-[#63f7ff] shadow-[inset_0_1px_0_rgba(99,247,255,0.08)]">
                    {item.icon}
                  </div>
                  <div className="mt-1 h-px flex-1 bg-[linear-gradient(90deg,rgba(99,247,255,0.34),transparent)] opacity-60 transition-opacity group-hover:opacity-100" />
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
      </div>
    </section>
  );
}
