export function CTASection() {
  return (
    <section
      id="contact"
      className="border-b border-[#243042] bg-[#111] bg-[linear-gradient(90deg,rgba(86,141,255,0.12),transparent_38%,rgba(99,247,255,0.08))]"
    >
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-8 sm:py-[72px] lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#63f7ff]">
            Private Beta
          </div>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-normal text-white sm:text-4xl">
            Explora estrategias sistematicas en un entorno private beta
            orientado a research y testnet.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#c2c6d8]">
            Acceso inicial para operadores cuantitativos, research desks y
            equipos que necesitan evaluacion de senales, controles de riesgo y
            observabilidad antes de cualquier despliegue real.
          </p>
          <p className="mt-5 max-w-2xl border-l border-[#424655] pl-4 font-mono text-xs leading-6 text-[#8c90a1]">
            For research and informational purposes. Not financial advice.
            Performance is not guaranteed.
          </p>
          <p className="mt-2 max-w-2xl pl-4 font-mono text-xs leading-6 text-[#8c90a1]">
            No real capital. Mock data for product demonstration.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <a
            href="/dashboard"
            className="rounded-xl border border-[#568dff]/90 bg-[linear-gradient(135deg,#568dff,#0058cb)] px-7 py-4 text-center text-sm font-semibold text-white shadow-[0_14px_34px_rgba(0,88,203,0.22)] transition duration-200 hover:-translate-y-px hover:brightness-110"
          >
            Open Terminal Demo
          </a>
          <a
            href="/request-access"
            className="rounded-xl border border-[#424655] bg-[#0a0a0a]/90 px-7 py-4 text-center text-sm font-semibold text-[#e2e2e2] shadow-[0_14px_34px_rgba(0,0,0,0.18)] backdrop-blur-sm transition duration-200 hover:-translate-y-px hover:border-[#63f7ff] hover:text-[#63f7ff]"
          >
            Request Access
          </a>
        </div>
      </div>
    </section>
  );
}
