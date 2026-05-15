import Link from "next/link";
import { LegalMicrocopy } from "@/components/legal-microcopy";

type ClientPlaceholderPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  emptyTitle: string;
  emptyBody: string;
};

const linkedRoutes = [
  ["Model Portfolio", "/model-portfolio"],
  ["Operator Dashboard", "/dashboard"],
  ["Request Access", "/request-access"],
];

export function ClientPlaceholderPage({
  eyebrow,
  title,
  description,
  emptyTitle,
  emptyBody,
}: ClientPlaceholderPageProps) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] bg-[linear-gradient(rgba(255,255,255,0.026)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.026)_1px,transparent_1px)] bg-[size:32px_32px] px-4 pb-16 pt-28 text-[#e2e2e2] sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-6">
        <section className="overflow-hidden rounded-[30px] border border-[#243042] bg-[radial-gradient(circle_at_18%_0%,rgb(var(--accent-primary-rgb)/0.1),transparent_30%),linear-gradient(180deg,rgba(14,14,14,0.94),rgba(5,5,5,0.84))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_24px_70px_rgba(0,0,0,0.28)] sm:p-8">
          <div className="flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-[0.16em]">
            <span className="rounded-lg border border-[var(--accent-primary)]/45 bg-[var(--accent-soft)] px-2.5 py-1.5 text-[var(--accent-primary)]">
              Client View
            </span>
            <span className="rounded-lg border border-[#243042] bg-[#050505]/82 px-2.5 py-1.5 text-[#c2c6d8]">
              Read Only
            </span>
            <span className="rounded-lg border border-[#243042] bg-[#050505]/82 px-2.5 py-1.5 text-[#c2c6d8]">
              No Synthetic Data
            </span>
          </div>
          <div className="mt-7 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent-primary)]">
            {eyebrow}
          </div>
          <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#c2c6d8] sm:text-base">
            {description}
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="rounded-[26px] border border-[#243042] bg-[linear-gradient(180deg,rgba(14,14,14,0.9),rgba(5,5,5,0.78))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:p-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent-primary)]">
              Artifact Status
            </div>
            <h2 className="mt-3 text-xl font-semibold text-white">{emptyTitle}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#8c90a1]">
              {emptyBody}
            </p>
            <p className="mt-4 rounded-2xl border border-[#1f1f1f] bg-[#050505]/70 p-4 text-sm leading-6 text-[#c2c6d8]">
              No artifact-backed client data is connected on this page yet. QuantBot will
              not infer missing signals, allocations, performance, or reports.
            </p>
          </div>

          <aside className="rounded-[26px] border border-[#243042] bg-[#050505]/72 p-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6f7485]">
              Continue
            </div>
            <div className="mt-4 grid gap-2">
              {linkedRoutes.map(([label, href]) => (
                <Link
                  className="rounded-xl border border-[#243042] bg-[#0b0b0b]/80 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-[#c2c6d8] transition-colors duration-150 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
                  href={href}
                  key={href}
                >
                  {label}
                </Link>
              ))}
            </div>
            <LegalMicrocopy className="mt-5" />
          </aside>
        </section>
      </div>
    </main>
  );
}
