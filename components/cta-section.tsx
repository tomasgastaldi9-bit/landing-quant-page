export function CTASection() {
  return (
    <section
      id="contact"
      className="border-b border-[#243042] bg-[#0a0a0a] bg-[radial-gradient(circle_at_84%_12%,rgb(var(--accent-primary-rgb)/0.12),transparent_28%),linear-gradient(90deg,rgb(var(--accent-secondary-rgb)/0.12),transparent_38%,rgb(var(--accent-primary-rgb)/0.08))]"
    >
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-8 sm:py-14 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent-primary)]">
            Private Beta
          </div>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-normal text-white sm:text-4xl">
            Move from research review to demo terminal monitoring in one
            controlled workspace.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#c2c6d8] sm:text-base sm:leading-7">
            Private beta access for quant operators, research desks, and teams
            evaluating signal workflows, risk controls, and observability before
            any live deployment discussion.
          </p>
          <p className="mt-4 max-w-2xl border-l border-[#424655] pl-4 font-mono text-xs leading-6 text-[#8c90a1]">
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
            className="rounded-xl border border-[var(--accent-primary)]/70 bg-[linear-gradient(135deg,var(--accent-primary),var(--accent-secondary))] px-6 py-3.5 text-center text-sm font-semibold text-[#050505] shadow-[0_14px_34px_rgb(var(--accent-primary-rgb)/0.22)] transition duration-200 hover:-translate-y-px hover:brightness-110"
          >
            Open Demo Terminal
          </a>
          <a
            href="/request-access"
            className="rounded-xl border border-[#424655] bg-[#0a0a0a]/90 px-6 py-3.5 text-center text-sm font-semibold text-[#e2e2e2] shadow-[0_14px_34px_rgba(0,0,0,0.18)] transition duration-200 hover:-translate-y-px hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
          >
            Request Access
          </a>
        </div>
      </div>
    </section>
  );
}
