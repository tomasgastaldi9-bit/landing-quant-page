import Link from "next/link";

const team = [
  {
    initials: "AK",
    name: "Alex K.",
    role: "Quant Research",
    href: "#",
  },
  {
    initials: "JP",
    name: "Jamie P.",
    role: "Trading Infrastructure",
    href: "#",
  },
  {
    initials: "MR",
    name: "Morgan R.",
    role: "Risk & Operations",
    href: "#",
  },
];

const principles = [
  {
    title: "Research before deployment",
    body: "Every signal moves through hypothesis, backtest, walk-forward, and testnet review before any live deployment discussion.",
  },
  {
    title: "Read-only by default",
    body: "No real capital. All execution is on testnet or paper. Operators monitor — they don't trade blind.",
  },
  {
    title: "Documented methodology",
    body: "Every component is observable. Every decision is logged. No black boxes, no unverifiable performance claims.",
  },
];

export function CredibilitySection() {
  return (
    <section
      id="credibility"
      className="relative overflow-hidden border-b border-[#243042] bg-[#050505] bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]"
    >
      <div className="pointer-events-none absolute right-[6%] top-[18%] hidden h-72 w-72 rounded-full bg-[radial-gradient(circle,rgb(var(--accent-primary-rgb)/0.08),transparent_64%)] blur-2xl md:block" />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-8 lg:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent-primary)]">
              Built By
            </div>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-normal text-white">
              Quant operators and engineers from research desks and proprietary
              trading.
            </h2>
          </div>
          <div className="w-fit rounded-full border border-[#243042] bg-white/[0.03] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#8c90a1] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            Private beta team
          </div>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-3.5 sm:grid-cols-3">
          {team.map((member) => (
            <a
              key={member.name}
              href={member.href}
              className="group relative overflow-hidden rounded-2xl border border-[#243042]/72 bg-[linear-gradient(180deg,rgba(14,14,14,0.88),rgba(5,5,5,0.74))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_18px_50px_rgba(0,0,0,0.2)] transition duration-300 hover:-translate-y-1 hover:border-[var(--accent-primary)]/50 hover:shadow-[inset_0_1px_0_rgb(var(--accent-primary-rgb)/0.07),0_24px_64px_rgba(0,0,0,0.26)] sm:p-5"
            >
              <div className="flex items-center gap-4">
                <div
                  aria-hidden="true"
                  className="grid size-12 place-items-center rounded-2xl border border-[var(--accent-primary)]/35 bg-[var(--accent-soft)] font-mono text-sm font-semibold text-[var(--accent-primary)] shadow-[inset_0_1px_0_rgb(var(--accent-primary-rgb)/0.08),0_0_18px_rgb(var(--accent-primary-rgb)/0.06)]"
                >
                  {member.initials}
                </div>
                <div className="min-w-0">
                  <div className="text-base font-semibold text-white">
                    {member.name}
                  </div>
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-[#c2c6d8]">
                    {member.role}
                  </div>
                </div>
                <span
                  aria-hidden="true"
                  className="ml-auto font-mono text-xs text-[var(--accent-primary)] transition-transform duration-200 group-hover:translate-x-1"
                >
                  in
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-14 border-t border-[#1f1f1f]/90 pt-10 sm:mt-20 sm:pt-12">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent-primary)]">
            Operating Principles
          </div>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-normal text-white">
            How we think about a research terminal.
          </h2>
          <div className="mt-7 grid grid-cols-1 gap-3.5 lg:grid-cols-3">
            {principles.map((principle, index) => (
              <div
                key={principle.title}
                className="relative overflow-hidden rounded-2xl border border-[#243042]/70 bg-[radial-gradient(circle_at_18%_0%,rgb(var(--accent-primary-rgb)/0.07),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(5,5,5,0.74))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_18px_50px_rgba(0,0,0,0.2)] sm:p-5"
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--accent-primary)]">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-3 text-lg font-semibold text-white">
                  {principle.title}
                </h3>
                <p className="mt-2.5 text-sm leading-6 text-[#c2c6d8]">
                  {principle.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-[#243042] bg-[var(--accent-soft)]/30 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] sm:p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent-primary)]">
            Disclosure
          </p>
          <p className="mt-2 font-mono text-xs leading-6 text-[#8c90a1] sm:text-[13px]">
            QuantBot is not a registered investment adviser. Content is for
            research and informational purposes only. Past or simulated
            performance does not guarantee future results. No live capital is
            managed through this product. Read the full{" "}
            <Link
              href="/legal/risk-disclosure"
              className="text-[var(--accent-primary)] underline-offset-4 hover:underline"
            >
              risk disclosure
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
