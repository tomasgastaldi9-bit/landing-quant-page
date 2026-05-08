const metrics = [
  { label: "Execution Mode", value: "Demo", detail: "Testnet / Paper" },
  {
    label: "Risk Layer",
    value: "Active",
    detail: "Policy Controls",
  },
  { label: "Monitoring", value: "Live", detail: "System Telemetry" },
  { label: "Alpha Engine", value: "Multi", detail: "Research Signals" },
];

const architecture = [
  {
    title: "Motor Multi-Alpha",
    body: "Combinacion de multiples modelos estadisticos descorrelacionados para generar retornos consistentes en cualquier regimen de mercado.",
    wide: true,
    icon: "++",
  },
  {
    title: "Controles de Riesgo",
    body: "Gestion de exposicion dinamica y limites estrictos por posicion en tiempo real.",
    icon: "[]",
  },
  {
    title: "Integracion Directa",
    body: "Conexion FIX/REST de baja latencia con Binance Futures y exchanges Tier-1.",
    icon: "<>",
  },
  {
    title: "Deteccion de Regimen",
    body: "Modelos de Machine Learning adaptan la ponderacion del portfolio segun volatilidad y tendencia actual.",
    wide: true,
    icon: "//",
  },
];

export function MetricsSection() {
  return (
    <section
      id="metrics"
      className="border-b border-[#243042] bg-[#050505] bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:32px_32px]"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-8 lg:py-20">
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-3xl font-semibold tracking-normal text-white">
            Capacidades de Plataforma
          </h2>
          <div className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-[#8c90a1] sm:block">
            Private beta capability snapshot
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <article
              key={metric.label}
              className="border border-[#1f1f1f] bg-[#0a0a0a]/82 p-5 backdrop-blur transition hover:border-[#424655] sm:p-6"
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#c2c6d8]">
                {metric.label}
              </div>
              <div className="mt-3 font-mono text-[34px] font-semibold leading-none tracking-normal text-white sm:text-[42px]">
                {metric.value}
              </div>
              <div
                className="mt-3 font-mono text-sm text-[#63f7ff]"
              >
                {metric.detail}
              </div>
            </article>
          ))}
        </div>

        <div id="risk-controls" className="mt-16 sm:mt-20">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-normal text-white">
              Arquitectura Institucional
            </h2>
            <p className="mt-4 text-base leading-7 text-[#c2c6d8]">
              Infraestructura disenada para investigacion, simulacion de
              ejecucion y analisis de riesgo en entornos controlados.
            </p>
          </div>
          <div className="mt-9 grid grid-cols-1 gap-3 lg:grid-cols-3">
            {architecture.map((item) => (
              <article
                key={item.title}
                className={`border border-[#1f1f1f] bg-[#0a0a0a]/78 p-5 backdrop-blur transition hover:border-[#63f7ff]/50 sm:p-6 ${
                  item.wide ? "lg:col-span-2" : ""
                }`}
              >
                <div className="font-mono text-2xl text-[#63f7ff]">
                  {item.icon}
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#c2c6d8]">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
