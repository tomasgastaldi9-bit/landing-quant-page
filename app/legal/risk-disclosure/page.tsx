import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Risk Disclosure",
  description:
    "QuantBot Risk Disclosure. Placeholder document for the private beta research terminal.",
  robots: { index: false, follow: false },
};

const lastUpdated = "May 12, 2026";

export default function RiskDisclosurePage() {
  return (
    <main
      id="main"
      className="min-h-screen bg-[#050505] text-[#e2e2e2] bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:32px_32px]"
    >
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-8 sm:py-20">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent-primary)]">
          Legal
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-normal text-white sm:text-4xl">
          Risk Disclosure
        </h1>
        <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-[#8c90a1]">
          Last updated: {lastUpdated}
        </p>

        <div className="mt-8 rounded-2xl border border-[var(--accent-primary)]/35 bg-[var(--accent-soft)]/60 p-4 shadow-[inset_0_1px_0_rgb(var(--accent-primary-rgb)/0.08)] sm:p-5">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent-primary)]">
            Placeholder Document
          </p>
          <p className="mt-2 text-sm leading-6 text-[#c2c6d8]">
            This is a placeholder. It will be replaced with the final legal
            document, reviewed by counsel, before public launch.
          </p>
        </div>

        <div className="mt-10 space-y-8 text-[15px] leading-7 text-[#c2c6d8]">
          <section>
            <h2 className="text-lg font-semibold text-white">1. Scope of the Service</h2>
            <p className="mt-3">
              QuantBot is a research and monitoring terminal operating exclusively
              on demo, paper, and testnet data. It does not execute trades with
              real capital, does not provide brokerage services, and is not a
              registered investment adviser or broker-dealer in any jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">2. No Financial Advice</h2>
            <p className="mt-3">
              Information presented in the Service is for research and educational
              purposes only and does not constitute investment, financial, legal,
              or tax advice. Users should consult qualified professionals before
              making any financial decision.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">3. Simulated and Mock Data</h2>
            <p className="mt-3">
              Charts, equity curves, position panels, alpha labs, and risk
              telemetry shown in the Service may be derived from simulated,
              backtested, paper, or testnet sources. Such data is provided to
              illustrate the workflow and does not represent real trading results.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">4. Performance Disclaimer</h2>
            <p className="mt-3">
              Past performance, simulated performance, hypothetical performance,
              and walk-forward results are not indicative of future results.
              Quantitative models can and do fail; regime shifts, execution
              friction, and unforeseen events may render any historical pattern
              unreliable going forward.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">5. Risks of Quantitative Trading</h2>
            <p className="mt-3">
              Quantitative and algorithmic trading involves substantial risk,
              including but not limited to: model risk, overfitting, data
              snooping, execution and latency risk, operational risk, market
              microstructure risk, counterparty risk, and the possibility of
              losing the entire amount of capital deployed when applied to real
              markets.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">6. No Custody, No Capital</h2>
            <p className="mt-3">
              The Service does not custody user funds, does not connect to live
              trading accounts in any capacity, and does not route orders to real
              markets. Any future expansion of scope will be announced separately
              and will require explicit user consent and updated disclosures.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">7. Regulatory Status</h2>
            <p className="mt-3">
              QuantBot is not registered with any financial regulator. It is not
              authorized to provide investment advice, manage assets, or solicit
              investments. Users are responsible for ensuring their use of the
              Service complies with the laws and regulations of their
              jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">8. Acknowledgment</h2>
            <p className="mt-3">
              By using the Service, you acknowledge that you have read and
              understood this Risk Disclosure and accept full responsibility for
              any decisions you make based on information obtained through the
              Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">9. Contact</h2>
            <p className="mt-3">
              For questions about this disclosure, contact{" "}
              <a
                href="mailto:legal@quantbot.ai"
                className="font-mono text-[var(--accent-primary)] underline-offset-4 hover:underline"
              >
                legal@quantbot.ai
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-12 border-t border-[#243042] pt-6">
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-[0.14em] text-[#c2c6d8] transition hover:text-[var(--accent-primary)]"
          >
            &larr; Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
