"use client";

import Link from "next/link";

const legalLinks = [
  { href: "/legal/risk-disclosure", label: "Risk Disclosure" },
  { href: "/legal/terms", label: "Terms" },
  { href: "/legal/privacy", label: "Privacy" },
];

export function LegalMicrocopy({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-[#243042]/75 bg-[#050505]/68 p-4 text-xs leading-5 text-[#8c90a1] ${className}`}
    >
      <p>
        For research and informational purposes only. Not financial advice. No
        live trading access from this interface. Past performance is not a
        guarantee.
      </p>
      <div className="mt-3 flex flex-wrap gap-3 font-mono text-[10px] uppercase tracking-[0.12em]">
        {legalLinks.map((link) => (
          <Link
            className="text-[#c2c6d8] transition-colors duration-150 hover:text-[var(--accent-primary)]"
            href={link.href}
            key={link.href}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
