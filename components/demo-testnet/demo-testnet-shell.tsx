import { BrandMark } from "@/components/brand-mark";
import Link from "next/link";

const badges = ["Demo", "Testnet", "No Real Capital", "Research"];

const validationItems = [
  {
    title: "Execution",
    detail: "Routes simulated or testnet orders while preserving operator visibility.",
  },
  {
    title: "Logs",
    detail: "Surfaces decision, order, and system events for audit-style review.",
  },
  {
    title: "Risk Controls",
    detail: "Monitors exposure, guardrails, and policy status before live deployment.",
  },
  {
    title: "Monitoring",
    detail: "Keeps equity, positions, health, and terminal state visible in one surface.",
  },
];

const terminalData = [
  "Equity",
  "Positions",
  "Decisions",
  "Orders / Logs",
  "Risk Layer",
];

export function DemoTestnetShell() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] text-[#e2e2e2]">
      <section className="relative border-b border-[#243042] bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:32px_32px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_14%,rgba(99,247,255,0.11),transparent_28%),linear-gradient(90deg,rgba(5,5,5,0.99),rgba(5,5,5,0.82)_54%,rgba(5,5,5,0.96))]" />
        <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-8 lg:py-8">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/" aria-label="QuantBot home">
              <BrandMark compact />
            </Link>
            <nav className="flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#c2c6d8]">
              <Link
                href="/dashboard"
                className="rounded-xl border border-[#243042] bg-[#0e0e0e]/82 px-3 py-2 transition duration-200 hover:border-[#63f7ff] hover:text-[#63f7ff]"
              >
                Terminal Demo
              </Link>
              <Link
                href="/request-access"
                className="rounded-xl border border-[#568dff]/80 bg-[#0e0e0e]/82 px-3 py-2 transition duration-200 hover:border-[#63f7ff] hover:text-[#63f7ff]"
              >
                Request Access
              </Link>
            </nav>
          </header>

          <div className="grid gap-10 py-14 sm:py-18 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:py-20">
            <div>
              <div className="flex flex-wrap gap-2">
                {badges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-xl border border-[#424655] bg-[#0e0e0e]/82 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#63f7ff] shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]"
                  >
                    {badge}
                  </span>
                ))}
              </div>
              <h1 className="mt-8 max-w-3xl text-[40px] font-semibold leading-[1.04] tracking-normal text-white sm:text-6xl">
                Demo / Testnet Environment
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-[#c2c6d8] sm:text-lg">
                A controlled product demonstration layer for validating
                execution behavior, logs, risk controls, and monitoring without
                using real capital or providing live trading access.
              </p>
            </div>

            <div className="rounded-2xl border border-[#243042] bg-[linear-gradient(180deg,rgba(14,14,14,0.92),rgba(7,7,7,0.86))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_22px_65px_rgba(0,0,0,0.28)] backdrop-blur-sm">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#63f7ff]">
                Environment Scope
              </div>
              <div className="mt-5 space-y-3 font-mono text-xs leading-6 text-[#c2c6d8]">
                <p>No real capital is deployed.</p>
                <p>Demo/testnet data is used for product validation.</p>
                <p>Risk and execution views are observational and read-only.</p>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Link
                  href="/dashboard"
                  className="rounded-xl border border-[#568dff]/90 bg-[linear-gradient(135deg,#568dff,#0058cb)] px-5 py-4 text-center text-sm font-semibold text-white shadow-[0_14px_34px_rgba(0,88,203,0.22)] transition duration-200 hover:-translate-y-px hover:brightness-110"
                >
                  Open Terminal Demo
                </Link>
                <Link
                  href="/request-access"
                  className="rounded-xl border border-[#424655] bg-[#050505]/88 px-5 py-4 text-center text-sm font-semibold text-[#e2e2e2] transition duration-200 hover:-translate-y-px hover:border-[#63f7ff] hover:text-[#63f7ff]"
                >
                  Request Access
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-12 sm:px-8 lg:grid-cols-[1fr_0.8fr]">
        <InfoPanel eyebrow="What is validated" title="Execution, risk, and observability">
          <div className="grid gap-3 sm:grid-cols-2">
            {validationItems.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-[#243042] bg-[#050505]/88 p-4 transition duration-200 hover:border-[#424655]"
              >
                <h3 className="font-mono text-sm uppercase tracking-[0.14em] text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#8c90a1]">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </InfoPanel>

        <InfoPanel eyebrow="Execution safety" title="No live trading access">
          <div className="space-y-4 font-mono text-xs leading-6 text-[#c2c6d8]">
            <p>
              Demo/testnet mode is intended for observing platform behavior
              before any production trading workflow exists.
            </p>
            <p>
              It is not an offer of brokerage, investment management, custody,
              or live execution.
            </p>
            <div className="rounded-xl border border-[#63f7ff]/35 bg-[#061719]/70 p-4 text-[#63f7ff]">
              No real capital. Mock or testnet data for product demonstration.
            </div>
          </div>
        </InfoPanel>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-8">
        <InfoPanel eyebrow="Data shown in the terminal" title="Read-only monitoring surfaces">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {terminalData.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-[#243042] bg-[linear-gradient(180deg,rgba(14,14,14,0.92),rgba(7,7,7,0.82))] p-4 font-mono text-xs uppercase tracking-[0.14em] text-[#c2c6d8]"
              >
                <span className="block text-[#63f7ff]">{"///"}</span>
                <span className="mt-5 block">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-[#243042] bg-[#0e0e0e]/70 p-5 font-mono text-xs leading-6 text-[#8c90a1]">
            <p>No live trading access is provided.</p>
            <p>For research and informational purposes only.</p>
            <p>Performance is not guaranteed.</p>
          </div>
        </InfoPanel>
      </section>
    </main>
  );
}

function InfoPanel({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-[#1f1f1f]/90 bg-[linear-gradient(180deg,rgba(16,16,16,0.92),rgba(7,7,7,0.86))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_18px_55px_rgba(0,0,0,0.22)] backdrop-blur-sm">
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#63f7ff]">
        {eyebrow}
      </div>
      <h2 className="mt-3 text-2xl font-semibold tracking-normal text-white">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </article>
  );
}
