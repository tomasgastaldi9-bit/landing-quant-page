import { BrandMark } from "@/components/brand-mark";
import Link from "next/link";

type AccountPreviewShellProps = {
  title: string;
  eyebrow: string;
  description: string;
  cards: Array<{
    label: string;
    value: string;
    detail: string;
  }>;
};

export function AccountPreviewShell({
  title,
  eyebrow,
  description,
  cards,
}: AccountPreviewShellProps) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] text-[#e2e2e2]">
      <section className="relative min-h-screen border-b border-[#243042] bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:32px_32px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_18%,rgb(var(--accent-primary-rgb)/0.11),transparent_28%),linear-gradient(90deg,rgba(5,5,5,0.99),rgba(5,5,5,0.82))]" />
        <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-8 lg:py-8">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/" aria-label="Quant Terminal home">
              <BrandMark />
            </Link>
            <div className="flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-[0.16em]">
              <Link
                href="/dashboard"
                className="rounded-xl border border-[#243042] bg-[#0e0e0e]/82 px-3 py-2 text-[#c2c6d8] transition hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
              >
                Terminal Demo
              </Link>
              <Link
                href="/request-access"
                className="rounded-xl border border-[var(--accent-secondary)]/80 bg-[var(--accent-soft)] px-3 py-2 text-[var(--accent-muted)] transition hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
              >
                Request Access
              </Link>
            </div>
          </header>

          <div className="grid gap-10 py-14 sm:py-18 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:py-20">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent-primary)]">
                {eyebrow}
              </div>
              <h1 className="mt-5 max-w-3xl text-[40px] font-semibold leading-[1.04] tracking-normal text-white sm:text-6xl">
                {title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-[#c2c6d8] sm:text-lg">
                {description}
              </p>
              <div className="mt-7 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-[0.18em]">
                <span className="rounded-xl border border-[#424655] bg-[#0e0e0e]/82 px-3 py-2 text-[var(--accent-primary)]">
                  Mock
                </span>
                <span className="rounded-xl border border-[var(--accent-secondary)]/60 bg-[var(--accent-soft)] px-3 py-2 text-[var(--accent-muted)]">
                  Private Beta
                </span>
                <span className="rounded-xl border border-[#424655] bg-[#0e0e0e]/82 px-3 py-2 text-[#c2c6d8]">
                  No Real Account Actions
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-[#243042] bg-[linear-gradient(180deg,rgba(14,14,14,0.94),rgba(7,7,7,0.86))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_22px_65px_rgba(0,0,0,0.28)]">
              <div className="flex items-center gap-3 border-b border-[#243042] pb-4">
                <div className="grid size-12 place-items-center rounded-xl border border-[var(--accent-primary)]/45 bg-[var(--accent-soft)] font-mono text-sm font-semibold text-[var(--accent-primary)]">
                  DO
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Demo Operator
                  </div>
                  <div className="font-mono text-xs text-[#8c90a1]">
                    demo@quantterminal.local
                  </div>
                </div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {cards.map((card) => (
                  <article
                    key={card.label}
                    className="rounded-xl border border-[#243042] bg-[#050505]/88 p-4"
                  >
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#8c90a1]">
                      {card.label}
                    </div>
                    <div className="mt-3 font-mono text-lg text-white">
                      {card.value}
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[#8c90a1]">
                      {card.detail}
                    </p>
                  </article>
                ))}
              </div>
              <div className="mt-5 rounded-xl border border-[var(--accent-primary)]/35 bg-[var(--accent-soft)]/70 p-4 font-mono text-xs leading-6 text-[var(--accent-primary)]">
                Mock / Private Beta account interface. No sensitive data is
                requested, stored, or processed.
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
