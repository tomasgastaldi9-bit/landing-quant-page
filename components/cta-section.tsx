export function CTASection() {
  return (
    <section id="contact" className="border-b border-[#243042] bg-[#111]">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#63f7ff]">
            Private Beta
          </div>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-normal text-white sm:text-4xl">
            Ejecuta estrategias sistematicas con control de riesgo de nivel
            institucional.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#c2c6d8]">
            Acceso inicial para operadores cuantitativos, research desks y
            equipos que necesitan automatizacion cripto con observabilidad
            completa.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <a
            href="mailto:access@quantbot.example"
            className="border border-[#568dff] bg-[#0058cb] px-7 py-4 text-center text-sm font-medium text-white shadow-[0_0_18px_rgba(86,141,255,0.28)] transition hover:brightness-110"
          >
            Solicitar Acceso
          </a>
          <a
            href="#metrics"
            className="border border-[#424655] bg-[#0a0a0a] px-7 py-4 text-center text-sm font-medium text-[#e2e2e2] transition hover:border-[#63f7ff] hover:text-[#63f7ff]"
          >
            Ver Metricas
          </a>
        </div>
      </div>
    </section>
  );
}
