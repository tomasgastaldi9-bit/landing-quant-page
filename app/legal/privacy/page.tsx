import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "QuantBot Privacy Policy. Placeholder document for the private beta research terminal.",
  robots: { index: false, follow: false },
};

const lastUpdated = "May 12, 2026";

export default function PrivacyPage() {
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
          Privacy Policy
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
            <h2 className="text-lg font-semibold text-white">1. Information We Collect</h2>
            <p className="mt-3">
              During the private beta we collect minimal information. When you
              request access we collect: name, email, company or affiliation,
              and any context you choose to share in the request form. When you
              use the Service we collect basic technical metadata: IP address,
              browser type, and page-level usage events.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">2. How We Use Information</h2>
            <p className="mt-3">
              We use the information to: evaluate beta access requests,
              communicate with invited operators, improve the Service, detect
              abuse, and comply with legal obligations. We do not sell, rent, or
              trade personal information.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">3. Cookies and Local Storage</h2>
            <p className="mt-3">
              The Service may use cookies or local storage for session state,
              theme preferences, and basic analytics. You can disable cookies in
              your browser; some Service features may not work as expected if
              you do.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">4. Data Sharing</h2>
            <p className="mt-3">
              We may share information with: (a) infrastructure providers
              (hosting, email, analytics) acting on our behalf under
              confidentiality obligations, and (b) authorities when required by
              law. We do not share personal information with third parties for
              their own marketing.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">5. Data Retention</h2>
            <p className="mt-3">
              We retain personal information only as long as needed for the
              purposes described in this policy or as required by law. Waitlist
              requests that are not converted into invited access are retained
              for up to 24 months and then deleted.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">6. Your Rights</h2>
            <p className="mt-3">
              Depending on your jurisdiction, you may have rights to access,
              correct, delete, or export your personal information. To exercise
              these rights, contact{" "}
              <a
                href="mailto:privacy@quantbot.ai"
                className="font-mono text-[var(--accent-primary)] underline-offset-4 hover:underline"
              >
                privacy@quantbot.ai
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">7. Security</h2>
            <p className="mt-3">
              We apply reasonable technical and organizational measures to
              protect personal information. No system is perfectly secure;
              suspected incidents will be reported in accordance with applicable
              law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">8. International Transfers</h2>
            <p className="mt-3">
              Personal information may be processed in jurisdictions other than
              your own. Where required, we rely on appropriate safeguards for
              cross-border transfers.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">9. Children</h2>
            <p className="mt-3">
              The Service is not intended for individuals under 18 and we do not
              knowingly collect information from them.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">10. Changes</h2>
            <p className="mt-3">
              We may update this policy from time to time. Material changes will
              be announced via the Service or by email to invited operators.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">11. Contact</h2>
            <p className="mt-3">
              For privacy inquiries, contact{" "}
              <a
                href="mailto:privacy@quantbot.ai"
                className="font-mono text-[var(--accent-primary)] underline-offset-4 hover:underline"
              >
                privacy@quantbot.ai
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
