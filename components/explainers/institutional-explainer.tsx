import { BrandMark } from "@/components/brand-mark";
import Link from "next/link";

export type ExplainerCard = {
  title: string;
  body: string;
  meta?: string;
};

export type ExplainerSection = {
  eyebrow: string;
  title: string;
  body?: string;
  cards: ExplainerCard[];
};

export type InstitutionalExplainerProps = {
  badges: string[];
  eyebrow: string;
  title: string;
  description: string;
  scope: Array<[string, string]>;
  sections: ExplainerSection[];
};

const disclaimer =
  "For research and informational purposes only. Not financial advice. Performance is not guaranteed.";

const routeLinks = [
  ["Demo/Testnet", "/demo-testnet"],
  ["Alpha Engine", "/alpha-engine"],
  ["Risk Layer", "/risk-layer"],
  ["Monitoring", "/monitoring"],
  ["Methodology", "/methodology"],
];

export function InstitutionalExplainer({
  badges,
  eyebrow,
  title,
  description,
  scope,
  sections,
}: InstitutionalExplainerProps) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] text-[#e2e2e2]">
      <section className="relative border-b border-[#243042] bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:32px_32px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_16%,rgba(86,141,255,0.12),transparent_29%),linear-gradient(90deg,rgba(5,5,5,0.99),rgba(5,5,5,0.82)_54%,rgba(5,5,5,0.96))]" />
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
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#63f7ff]">
                {eyebrow}
              </div>
              <h1 className="mt-5 max-w-3xl text-[40px] font-semibold leading-[1.04] tracking-normal text-white sm:text-6xl">
                {title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-[#c2c6d8] sm:text-lg">
                {description}
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {badges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-xl border border-[#424655] bg-[#0e0e0e]/82 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#63f7ff] shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-[#243042] bg-[linear-gradient(180deg,rgba(14,14,14,0.94),rgba(7,7,7,0.86))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_22px_65px_rgba(0,0,0,0.28)] backdrop-blur-sm">
              <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(99,247,255,0.65),transparent)]" />
              <div className="flex items-center justify-between gap-4 border-b border-[#243042] pb-4">
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#63f7ff]">
                  Terminal Scope
                </div>
                <div className="font-mono text-[11px] text-[#63f7ff]">{"///"}</div>
              </div>
              <div className="mt-6 grid gap-2">
                {scope.map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-xl border border-[#1f1f1f] bg-[#050505]/82 px-3 py-2 font-mono text-xs"
                  >
                    <span className="uppercase tracking-[0.14em] text-[#8c90a1]">
                      {label}
                    </span>
                    <span className="text-[#63f7ff]">{value}</span>
                  </div>
                ))}
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

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8">
        <nav className="mb-4 flex gap-2 overflow-x-auto rounded-2xl border border-[#1f1f1f] bg-[#050505]/50 p-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#c2c6d8]">
          {routeLinks.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="shrink-0 rounded-xl border border-[#243042] bg-[#0e0e0e]/82 px-3 py-2 transition duration-200 hover:border-[#63f7ff] hover:text-[#63f7ff]"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="grid gap-4">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-2xl border border-[#1f1f1f]/90 bg-[linear-gradient(180deg,rgba(16,16,16,0.92),rgba(7,7,7,0.86))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_18px_55px_rgba(0,0,0,0.22)] backdrop-blur-sm transition duration-200 hover:border-[#2f3b52]"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#63f7ff]">
                {section.eyebrow}
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-normal text-white">
                {section.title}
              </h2>
              {section.body ? (
                <p className="mt-3 max-w-3xl text-sm leading-6 text-[#c2c6d8]">
                  {section.body}
                </p>
              ) : null}
              <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {section.cards.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-xl border border-[#243042] bg-[#050505]/88 p-4 transition duration-200 hover:-translate-y-px hover:border-[#424655]"
                  >
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#8c90a1]">
                      {card.meta ?? "Control"}
                    </div>
                    <h3 className="mt-4 font-mono text-sm uppercase tracking-[0.12em] text-white">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[#8c90a1]">
                      {card.body}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-4 rounded-2xl border border-[#243042] bg-[#0e0e0e]/70 p-5 font-mono text-xs leading-6 text-[#8c90a1]">
          {disclaimer}
        </div>
      </section>
    </main>
  );
}
