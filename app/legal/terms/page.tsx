import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "QuantBot Terms of Service. Placeholder document for the private beta research terminal.",
  robots: { index: false, follow: false },
};

const lastUpdated = "May 12, 2026";

export default function TermsPage() {
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
          Terms of Service
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
            <h2 className="text-lg font-semibold text-white">1. Acceptance of Terms</h2>
            <p className="mt-3">
              By accessing or using QuantBot (the &ldquo;Service&rdquo;), you agree to be
              bound by these Terms of Service. If you do not agree, do not use the
              Service. QuantBot is currently offered as a private beta research
              terminal for invited operators and research teams.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">2. Nature of the Service</h2>
            <p className="mt-3">
              QuantBot is a read-only research and monitoring terminal for
              demo/testnet operations. It does not execute trades with real capital,
              does not custody assets, and does not provide brokerage services.
              All data displayed within the Service may be simulated, mock, or
              testnet-derived.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">3. No Financial Advice</h2>
            <p className="mt-3">
              Content provided through the Service is for research and informational
              purposes only and does not constitute investment, financial, legal, or
              tax advice. Nothing in the Service should be construed as a
              recommendation to buy, sell, or hold any asset.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">4. Eligibility</h2>
            <p className="mt-3">
              Access to the private beta is by invitation only. We reserve the right
              to grant, deny, or revoke access at our sole discretion. You represent
              that you are at least 18 years old and legally permitted to use the
              Service in your jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">5. Intellectual Property</h2>
            <p className="mt-3">
              All software, content, branding, and documentation associated with the
              Service remain the property of QuantBot and its licensors. You receive
              a limited, non-exclusive, non-transferable license to use the Service
              for the purposes described in these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">6. Acceptable Use</h2>
            <p className="mt-3">
              You agree not to: (a) reverse engineer or attempt to derive source
              code from the Service, (b) use the Service to develop a competing
              product, (c) interfere with the integrity or performance of the
              Service, or (d) use the Service in violation of applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">7. No Warranty</h2>
            <p className="mt-3">
              The Service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
              without warranties of any kind, express or implied. We do not warrant
              that the Service will be uninterrupted, error-free, accurate, or
              secure. Past or simulated performance shown in the Service does not
              guarantee future results.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">8. Limitation of Liability</h2>
            <p className="mt-3">
              To the maximum extent permitted by law, QuantBot will not be liable
              for indirect, incidental, special, consequential, or punitive damages,
              or any loss of profits or data, arising from or in connection with your
              use of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">9. Termination</h2>
            <p className="mt-3">
              We may suspend or terminate your access to the Service at any time,
              with or without cause and with or without notice. Sections that by
              their nature should survive termination will survive.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">10. Changes</h2>
            <p className="mt-3">
              We may update these Terms from time to time. Material changes will be
              announced via the Service or by email to invited operators.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">11. Contact</h2>
            <p className="mt-3">
              For questions about these Terms, contact{" "}
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
