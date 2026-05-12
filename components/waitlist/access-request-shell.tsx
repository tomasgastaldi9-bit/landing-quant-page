import { BrandMark } from "@/components/brand-mark";
import { AccessRequestForm } from "@/components/waitlist/access-request-form";
import Link from "next/link";

const badges = [
  { label: "Demo", href: "/demo-testnet" },
  { label: "Research", href: "/demo-testnet" },
  { label: "Private Beta" },
];

export function AccessRequestShell() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] text-[#e2e2e2]">
      <section className="relative min-h-screen border-b border-[#243042] bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:32px_32px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgb(var(--accent-primary-rgb)/0.12),transparent_28%),linear-gradient(90deg,rgba(5,5,5,0.98),rgba(5,5,5,0.82))]" />
        <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 gap-10 px-4 py-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-10">
          <div>
            <Link href="/" aria-label="QuantBot home">
              <BrandMark />
            </Link>
            <div className="mt-12 flex flex-wrap gap-2">
              {badges.map((badge) =>
                badge.href ? (
                  <Link
                    key={badge.label}
                    href={badge.href}
                    className="rounded-xl border border-[#424655] bg-[#0e0e0e]/80 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent-primary)] transition duration-200 hover:border-[var(--accent-primary)] hover:bg-[var(--accent-soft)]"
                  >
                    {badge.label}
                  </Link>
                ) : (
                  <span
                    key={badge.label}
                    className="rounded-xl border border-[#424655] bg-[#0e0e0e]/80 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent-primary)]"
                  >
                    {badge.label}
                  </span>
                ),
              )}
            </div>
            <h1 className="mt-8 max-w-2xl text-[42px] font-semibold leading-[1.04] tracking-normal text-white sm:text-6xl">
              Request Private Beta Access
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#c2c6d8] sm:text-lg">
              Join the institutional research waitlist for Quant Terminal&apos;s demo
              execution terminal, alpha research workspace, and risk monitoring
              environment.
            </p>
            <div className="mt-8 space-y-3 border-l border-[#424655] pl-4 font-mono text-xs leading-6 text-[#8c90a1]">
              <p>No live trading access is provided.</p>
              <p>For research and informational purposes only.</p>
              <p>No real capital. Mock data for product demonstration.</p>
            </div>
          </div>

          <AccessRequestForm />
        </div>
      </section>
    </main>
  );
}
