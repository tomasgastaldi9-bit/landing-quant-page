const metrics = [
  { label: "Sharpe Ratio", value: "3.2", detail: "Risk-Adjusted" },
  { label: "Max Drawdown", value: "-4.5%", detail: "Historical Max", warm: true },
  { label: "Win Rate", value: "68%", detail: "Per Trade" },
  { label: "Estrategias", value: "12+", detail: "Active Alphas" },
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
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <h2 className="text-3xl font-semibold tracking-normal text-white">
          Metricas Cuantitativas
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <article
              key={metric.label}
              className="border border-[#1f1f1f] bg-[#0a0a0a]/78 p-6 backdrop-blur transition hover:border-[#424655]"
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#c2c6d8]">
                {metric.label}
              </div>
              <div className="mt-3 text-5xl font-semibold tracking-normal text-white">
                {metric.value}
              </div>
              <div
                className={`mt-3 font-mono text-sm ${
                  metric.warm ? "text-[#ffb4ab]" : "text-[#63f7ff]"
                }`}
              >
                {metric.detail}
              </div>
            </article>
          ))}
        </div>

        <div id="risk-controls" className="mt-20">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-normal text-white">
              Arquitectura Institucional
            </h2>
            <p className="mt-4 text-base leading-7 text-[#c2c6d8]">
              Infraestructura disenada para ejecucion de alta frecuencia y
              analisis de riesgo en tiempo real.
            </p>
          </div>
          <div className="mt-9 grid grid-cols-1 gap-4 lg:grid-cols-3">
            {architecture.map((item) => (
              <article
                key={item.title}
                className={`border border-[#1f1f1f] bg-[#0a0a0a]/76 p-6 backdrop-blur transition hover:border-[#63f7ff]/50 ${
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
