"use client";

import { BrandMark } from "./brand-mark";
import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  {
    label: "Demo/Testnet",
    href: "/demo-testnet",
    description: "No real capital, testnet execution, and validation scope.",
  },
  {
    label: "Alpha Engine",
    href: "/alpha-engine",
    description: "Multi-alpha sleeves, regimes, and research pipeline.",
  },
  {
    label: "Risk Layer",
    href: "/risk-layer",
    description: "Position sizing, exposure controls, and execution safety.",
  },
  {
    label: "Monitoring",
    href: "/monitoring",
    description: "Equity, positions, logs, alerts, and system health.",
  },
  {
    label: "Methodology",
    href: "/methodology",
    description: "Research-first validation and deployment discipline.",
  },
  {
    label: "Terminal Demo",
    href: "/dashboard",
    description: "Open the read-only institutional dashboard demo.",
  },
  {
    label: "Request Access",
    href: "/request-access",
    description: "Join the private beta research waitlist.",
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#243042] bg-[#0b0b0b]/90 shadow-[0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-3 px-4 sm:h-24 sm:px-8">
        <Link className="min-w-0" href="/" aria-label="QuantBot home">
          <BrandMark />
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls="primary-navigation-drawer"
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-[#243042] bg-[linear-gradient(180deg,rgba(16,16,16,0.94),rgba(8,8,8,0.86))] px-3 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-[#c2c6d8] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_12px_34px_rgba(0,0,0,0.2)] transition duration-200 hover:-translate-y-px hover:border-[#63f7ff] hover:text-[#63f7ff] sm:px-4"
          >
            <span className="flex size-4 flex-col justify-center gap-1">
              <span className="h-px w-full bg-current" />
              <span className="h-px w-full bg-current" />
              <span className="h-px w-full bg-current" />
            </span>
            <span className="hidden sm:inline">Menu</span>
          </button>
          <Link
            href="/dashboard"
            className="whitespace-nowrap rounded-xl border border-[#568dff] bg-[linear-gradient(135deg,#568dff,#0058cb)] px-3 py-3 text-center text-xs font-semibold text-white shadow-[0_0_16px_rgba(86,141,255,0.22)] transition duration-200 hover:-translate-y-px hover:brightness-110 sm:px-5 sm:text-sm"
          >
            Launch Terminal
          </Link>
        </div>
      </div>

      {isOpen ? (
        <div className="fixed inset-0 z-[60]">
          <button
            type="button"
            aria-label="Close navigation overlay"
            className="absolute inset-0 cursor-default bg-black/76 backdrop-blur-sm"
            onClick={closeMenu}
          />
          <aside
            id="primary-navigation-drawer"
            aria-label="Primary navigation"
            className="absolute left-0 top-0 flex h-dvh w-[min(92vw,430px)] animate-[drawerIn_180ms_ease-out] flex-col overflow-hidden border-r border-[#243042] bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(180deg,rgba(14,14,14,0.98),rgba(5,5,5,0.96))] bg-[size:28px_28px,28px_28px,auto] p-5 shadow-[28px_0_80px_rgba(0,0,0,0.42)]"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(99,247,255,0.65),transparent)]" />
            <div className="flex items-center justify-between gap-4 border-b border-[#243042] pb-5">
              <Link href="/" aria-label="QuantBot home" onClick={closeMenu}>
                <BrandMark compact />
              </Link>
              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={closeMenu}
                className="rounded-xl border border-[#243042] bg-[#050505]/90 px-3 py-2 font-mono text-xs uppercase tracking-[0.12em] text-[#c2c6d8] shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] transition duration-200 hover:-translate-y-px hover:border-[#63f7ff] hover:text-[#63f7ff]"
              >
                Close
              </button>
            </div>

            <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[#63f7ff]">
              Platform Navigation
            </div>
            <nav className="mt-4 grid gap-2 overflow-y-auto pr-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="group rounded-2xl border border-[#1f1f1f] bg-[linear-gradient(180deg,rgba(14,14,14,0.88),rgba(7,7,7,0.78))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.025)] transition duration-200 hover:-translate-y-px hover:border-[#63f7ff]/55 hover:bg-[#061719]/72 hover:shadow-[inset_0_1px_0_rgba(99,247,255,0.06),0_16px_38px_rgba(0,0,0,0.26)]"
                >
                  <span className="flex items-center justify-between gap-4">
                    <span className="font-mono text-sm uppercase tracking-[0.12em] text-white">
                      {item.label}
                    </span>
                    <span className="font-mono text-xs text-[#63f7ff] transition-transform duration-200 group-hover:translate-x-1">
                      -&gt;
                    </span>
                  </span>
                  <span className="mt-3 block text-sm leading-6 text-[#8c90a1]">
                    {item.description}
                  </span>
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      ) : null}
    </header>
  );
}
