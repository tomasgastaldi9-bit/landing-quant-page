"use client";

import { BrandMark } from "./brand-mark";
import {
  type DrawerTab,
  footerNavigationRoutes,
  getDrawerTabForPath,
  primaryDrawerGroups,
} from "@/lib/navigation/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<DrawerTab>(() =>
    getDrawerTabForPath("/"),
  );
  const pathname = usePathname();
  const selectedGroup =
    primaryDrawerGroups.find((group) => group.label === activeTab) ??
    primaryDrawerGroups[0];

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

  function openMenu() {
    setActiveTab(getDrawerTabForPath(pathname));
    setIsOpen(true);
  }

  function openCommandPalette() {
    window.dispatchEvent(new Event("quantbot:open-command-palette"));
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#243042] bg-[#0b0b0b]/96 shadow-[0_1px_0_rgba(255,255,255,0.03)]">
      <div className="mx-auto flex h-[88px] max-w-7xl items-center justify-between gap-2 px-3 sm:h-24 sm:gap-3 sm:px-8">
        <Link
          className="min-w-0 max-w-[42vw] overflow-hidden min-[420px]:max-w-[46vw] sm:max-w-none"
          href="/"
          aria-label="QuantBot home"
        >
          <BrandMark />
        </Link>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={openCommandPalette}
            className="hidden items-center gap-3 rounded-xl border border-[#243042] bg-[#0e0e0e]/72 px-4 py-3.5 font-mono text-xs uppercase tracking-[0.09em] text-[#d7dceb] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition-colors duration-200 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] md:inline-flex"
          >
            <span>Search</span>
            <kbd className="rounded-md border border-[#424655] bg-[#050505]/80 px-1.5 py-0.5 text-[10px] text-[#8c90a1]">
              Ctrl K
            </kbd>
          </button>
          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls="primary-navigation-drawer"
            onClick={openMenu}
            className="inline-flex items-center gap-2 rounded-xl border border-[#243042] bg-[linear-gradient(180deg,rgba(16,16,16,0.94),rgba(8,8,8,0.86))] px-3 py-3.5 font-mono text-xs uppercase tracking-[0.1em] text-[#d7dceb] shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] transition-colors duration-200 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] sm:px-4"
          >
            <span className="flex size-4 flex-col justify-center gap-1">
              <span className="h-px w-full bg-current" />
              <span className="h-px w-full bg-current" />
              <span className="h-px w-full bg-current" />
            </span>
            <span className="hidden sm:inline">Menu</span>
          </button>
          <Link
            href="/login"
            className="hidden rounded-xl border border-[#243042] bg-[#0e0e0e]/72 px-4 py-3.5 font-mono text-xs uppercase tracking-[0.09em] text-[#d7dceb] transition-colors duration-200 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] md:inline-flex"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="hidden rounded-xl border border-[#424655] bg-[#050505]/84 px-4 py-3.5 font-mono text-xs uppercase tracking-[0.09em] text-[#e2e2e2] transition-colors duration-200 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] lg:inline-flex"
          >
            Register
          </Link>
          <Link
            href="/dashboard"
            className="hidden whitespace-nowrap rounded-xl border border-[var(--accent-primary)]/70 bg-[linear-gradient(135deg,var(--accent-primary),var(--accent-secondary))] px-3 py-3.5 text-center text-xs font-semibold text-[#050505] shadow-[0_0_8px_rgb(var(--accent-primary-rgb)/0.14)] transition duration-200 hover:brightness-110 min-[390px]:inline-flex min-[480px]:px-3.5 min-[480px]:text-sm sm:px-5"
          >
            Open Workspace
          </Link>
        </div>
      </div>

      {isOpen ? (
        <div className="fixed inset-0 z-[60]">
          <button
            type="button"
            aria-label="Close navigation overlay"
            className="absolute inset-0 cursor-default bg-[radial-gradient(circle_at_12%_18%,rgb(var(--accent-primary-rgb)/0.06),transparent_28%),rgba(0,0,0,0.82)] transition-opacity duration-200"
            onClick={closeMenu}
          />
          <aside
            id="primary-navigation-drawer"
            aria-label="Primary navigation"
            role="dialog"
            aria-modal="true"
            className="absolute left-0 top-0 flex h-dvh w-[min(92vw,360px)] animate-[drawerIn_180ms_ease-out] flex-col overflow-y-auto border-r border-[#243042] bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(180deg,rgba(14,14,14,0.98),rgba(5,5,5,0.97))] bg-[size:36px_36px,36px_36px,auto] px-2.5 py-2.5 shadow-[12px_0_34px_rgba(0,0,0,0.28)] will-change-transform sm:w-[360px] sm:overflow-hidden sm:px-3 sm:py-3"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgb(var(--accent-primary-rgb)/0.65),transparent)]" />
            <div className="pointer-events-none absolute bottom-3 left-0 top-3 w-px bg-[#243042]/70" />
            <div className="flex items-center justify-between gap-2.5 border-b border-[#243042] pb-1.5">
              <Link
                href="/"
                aria-label="QuantBot home"
                onClick={closeMenu}
                className="origin-left scale-[0.82] sm:scale-[0.86]"
              >
                <BrandMark size="drawer" />
              </Link>
              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={closeMenu}
                className="rounded-lg border border-[#243042] bg-[#050505]/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#c2c6d8] shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] transition duration-150 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
              >
                Close
              </button>
            </div>

            <div className="mt-2 grid grid-cols-3 gap-1 rounded-xl border border-[#1f1f1f] bg-[#050505]/72 p-1">
              {primaryDrawerGroups.map((group) => {
                const isSelected = activeTab === group.label;

                return (
                  <button
                    key={group.label}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setActiveTab(group.label)}
                    className={`rounded-lg border px-2 py-2 text-left transition-[background-color,border-color,color] duration-150 ${
                      isSelected
                        ? "border-[var(--accent-primary)]/45 bg-[#0d1518] text-[var(--accent-primary)]"
                        : "border-transparent text-[#8c90a1] hover:bg-[#0d1115] hover:text-[#d7dceb]"
                    }`}
                  >
                    <span className="block font-mono text-[10px] uppercase tracking-[0.13em]">
                      {group.label.toUpperCase()}
                    </span>
                    <span className="mt-0.5 block truncate font-mono text-[8px] uppercase tracking-[0.1em] text-[#6f7485]">
                      {group.microcopy}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Keep blur/glow/masks outside this low-paint navigation layer. */}
            <nav
              className="drawerLowPaint mt-2 min-h-0 flex-1 pl-2 pr-1"
              data-performance="low-paint"
              aria-label={`${selectedGroup.label} navigation`}
            >
              <div className="flex items-center gap-2 px-1.5 pb-1 font-mono text-[9px] uppercase tracking-[0.18em] text-[#6f7485]">
                <span
                  className="size-1 rounded-full bg-[var(--accent-primary)]/55"
                  aria-hidden="true"
                />
                {selectedGroup.label} Workspace
              </div>
              <div className="grid gap-1">
                {selectedGroup.items.map((item) => {
                  const routeHref = item.href.split("#")[0];
                  const isHashLink = item.href.includes("#");
                  const isActive =
                    !isHashLink &&
                    (pathname === routeHref ||
                      (routeHref !== "/" && pathname.startsWith(`${routeHref}/`)));

                  return (
                    <Link
                      key={`${selectedGroup.label}-${item.label}`}
                      href={item.href}
                      onClick={closeMenu}
                      title={item.description}
                      className={`drawer-nav-link group relative flex min-h-9 items-center justify-between gap-2.5 rounded-lg border border-transparent px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] transition-[background-color,border-color,color] duration-150 hover:bg-[#0d1115] hover:text-[var(--accent-primary)] sm:min-h-8 sm:py-0.5 ${
                        isActive
                          ? "border-[#243042] bg-[#0d1518] text-[var(--accent-primary)]"
                          : "text-[#d7dceb]"
                      }`}
                    >
                      <span
                        className={`absolute left-0 top-1/2 h-5 w-px -translate-y-1/2 rounded-full transition-colors duration-150 ${
                          isActive
                            ? "bg-[var(--accent-primary)]"
                            : "bg-transparent group-hover:bg-[var(--accent-primary)]/40"
                        }`}
                        aria-hidden="true"
                      />
                      <span className="truncate">{item.label}</span>
                      <span className="ml-auto flex items-center gap-1.5">
                        {item.badge ? (
                          <span className="hidden rounded border border-[#243042] bg-[#050505] px-1 py-px text-[7px] tracking-[0.1em] text-[#8c90a1] group-hover:border-[var(--accent-primary)]/35 group-hover:text-[var(--accent-muted)] sm:inline">
                            {item.badge}
                          </span>
                        ) : null}
                        <span
                          className={`text-[10px] transition-colors duration-150 ${
                            isActive
                              ? "text-[var(--accent-primary)]"
                              : "text-[#6f7485] group-hover:text-[var(--accent-primary)]"
                          }`}
                          aria-hidden="true"
                        >
                          /
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </nav>

            <div className="mt-2 rounded-xl border border-[#1f1f1f] bg-[#070707]/88 px-2.5 py-2.5">
              <div className="mb-2 flex items-center justify-between gap-3 font-mono text-[8px] uppercase tracking-[0.16em] text-[#6f7485]">
                <span>QuantBot Terminal</span>
                <span className="rounded border border-[var(--accent-primary)]/35 px-1.5 py-0.5 text-[var(--accent-primary)]">
                  Read-Only Ops
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <div
                  aria-hidden="true"
                  className="grid size-8 place-items-center rounded-lg border border-[var(--accent-primary)]/35 bg-[#0b1114] font-mono text-[10px] font-semibold text-[var(--accent-primary)]"
                >
                  DO
                </div>
                <div className="min-w-0">
                  <div className="truncate text-[13px] font-semibold leading-tight text-white">
                    Demo Operator
                  </div>
                  <div className="mt-0.5 truncate font-mono text-[9px] uppercase tracking-[0.11em] text-[#8c90a1]">
                    Testnet Workspace
                  </div>
                </div>
                <span className="ml-auto rounded border border-[#243042] bg-[#050505] px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.12em] text-[#8c90a1]">
                  Preview
                </span>
              </div>
              <div className="mt-2 border-t border-[#1f1f1f] pt-2 font-mono text-[8px] uppercase leading-3 tracking-[0.1em] text-[#6f7485]">
                Preview workspace / no active account session
              </div>
              <div className="mt-2 grid gap-1.5 border-t border-[#1f1f1f] pt-2">
                {(["Account", "Legal"] as const).map((group) => (
                  <div className="grid gap-1" key={group}>
                    <div className="font-mono text-[7px] uppercase tracking-[0.18em] text-[#565b69]">
                      {group}
                    </div>
                    <div className="flex flex-wrap gap-x-1.5 gap-y-1">
                      {footerNavigationRoutes
                        .filter((link) => link.group === group)
                        .map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={closeMenu}
                            className="rounded-md border border-transparent bg-[#050505]/40 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.1em] text-[#8c90a1] transition-colors duration-150 hover:border-[#243042] hover:bg-[#0d1115] hover:text-[var(--accent-primary)]"
                          >
                            {link.label}
                          </Link>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      ) : null}
    </header>
  );
}
