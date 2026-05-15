"use client";

import { BrandMark } from "@/components/brand-mark";
import { LegalMicrocopy } from "@/components/legal-microcopy";
import Link from "next/link";
import { FormEvent, useState } from "react";

type AuthPreviewShellProps = {
  mode: "login" | "register";
};

const terminalInput =
  "w-full rounded-xl border border-[#243042] bg-[#050505]/92 px-3.5 py-3 text-sm text-white outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] transition-[background-color,border-color,box-shadow] duration-150 placeholder:text-[#424655] hover:border-[#424655] focus:border-[var(--accent-primary)] focus:bg-[#071314] focus:shadow-[0_0_0_3px_rgb(var(--accent-primary-rgb)/0.08)]";

const accessSignals = [
  ["Model Portfolio", "Current stance"],
  ["Signals", "Rebalance history"],
  ["Performance", "Telemetry-backed"],
  ["Risk Summary", "Read-only overview"],
];

export function AuthPreviewShell({ mode }: AuthPreviewShellProps) {
  const [submitted, setSubmitted] = useState(false);
  const isRegister = mode === "register";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] text-[#e2e2e2]">
      <section className="relative min-h-screen border-b border-[#243042] bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:32px_32px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_14%,rgb(var(--accent-primary-rgb)/0.1),transparent_28%),linear-gradient(90deg,rgba(5,5,5,0.99),rgba(5,5,5,0.84))]" />
        <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 gap-5 px-4 py-7 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-7 lg:py-10">
          <AuthContextPanel isRegister={isRegister} />
          <AuthForm
            isRegister={isRegister}
            onSubmit={handleSubmit}
            submitted={submitted}
          />
        </div>
      </section>
    </main>
  );
}

function AuthContextPanel({ isRegister }: { isRegister: boolean }) {
  return (
    <div className="rounded-3xl border border-[#243042]/82 bg-[linear-gradient(180deg,rgba(14,14,14,0.88),rgba(5,5,5,0.74))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:p-7">
      <Link href="/" aria-label="QuantBot home">
        <BrandMark />
      </Link>

      <div className="mt-8 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-[0.16em]">
        <span className="rounded-lg border border-[var(--accent-primary)]/50 bg-[var(--accent-surface)] px-2.5 py-1.5 text-[var(--accent-primary)]">
          Access Preview
        </span>
        <span className="rounded-lg border border-[#243042] bg-[#0b0b0b] px-2.5 py-1.5 text-[#c2c6d8]">
          Read Only
        </span>
        <span className="rounded-lg border border-[#243042] bg-[#0b0b0b] px-2.5 py-1.5 text-[#c2c6d8]">
          Private Beta
        </span>
      </div>

      <div className="mt-7 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent-primary)]">
        QuantBot Client Workspace
      </div>
      <h1 className="mt-3 max-w-2xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
        {isRegister ? "Request QuantBot Access." : "Access QuantBot Client Workspace."}
      </h1>
      <p className="mt-5 max-w-xl text-sm leading-7 text-[#c2c6d8] sm:text-base">
        {isRegister
          ? "Request access to the client workspace for read-only model portfolio, systematic signal history, performance transparency, and risk overview."
          : "Preview access to the client workspace: model portfolio, signal history, performance, and risk summary. Authentication is not connected yet."}
      </p>

      <div className="mt-6 grid gap-2 sm:grid-cols-2">
        {accessSignals.map(([label, value]) => (
          <div
            className="rounded-xl border border-[#1f1f1f] bg-[#050505]/72 p-3 font-mono uppercase tracking-[0.12em]"
            key={label}
          >
            <div className="text-[9px] text-[#6f7485]">{label}</div>
            <div className="mt-2 text-[11px] text-[#d7dceb]">{value}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 border-l border-[#243042] pl-4 font-mono text-[11px] uppercase leading-6 tracking-[0.12em] text-[#8c90a1]">
        <p>No credentials are stored.</p>
        <p>No real account session is created.</p>
        <p>No live capital can move from this frontend.</p>
      </div>
    </div>
  );
}

function AuthForm({
  isRegister,
  onSubmit,
  submitted,
}: {
  isRegister: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  submitted: boolean;
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-[#243042] bg-[linear-gradient(180deg,rgba(14,14,14,0.94),rgba(7,7,7,0.88))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_22px_65px_rgba(0,0,0,0.24)] sm:p-6"
    >
      <div className="flex items-start justify-between gap-4 border-b border-[#243042] pb-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent-primary)]">
            {isRegister ? "Request Workflow Preview" : "Access Preview Only"}
          </div>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            {isRegister ? "Request QuantBot Access" : "Client Workspace Access"}
          </h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-[#8c90a1]">
            {isRegister
              ? "Request workflow preview only. No account is created from this form yet."
              : "Access preview only. No real account session is created."}
          </p>
        </div>
        <div className="rounded-xl border border-[var(--accent-primary)]/45 bg-[#071314] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--accent-primary)]">
          Demo
        </div>
      </div>

      <div className="mt-5 grid gap-4">
        {isRegister ? <TextField id="name" label="Name" autoComplete="name" /> : null}
        <TextField
          id={isRegister ? "work-email" : "email"}
          label={isRegister ? "Work Email" : "Email"}
          type="email"
          autoComplete="email"
        />
        {isRegister ? (
          <>
            <TextField
              id="organization"
              label="Organization / Project"
              autoComplete="organization"
            />
            <label className="grid gap-2" htmlFor="use-case">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#c2c6d8]">
                Intended Use
              </span>
              <select id="use-case" className={terminalInput} defaultValue="portfolio">
                <option value="portfolio">Model Portfolio Access</option>
                <option value="signals">Signal / Rebalance History</option>
                <option value="performance">Performance Transparency</option>
                <option value="risk">Risk Overview</option>
                <option value="research">Research / Alpha Review</option>
              </select>
            </label>
            <label className="grid gap-2" htmlFor="message">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#c2c6d8]">
                Message
              </span>
              <textarea
                id="message"
                className={`${terminalInput} min-h-28 resize-y`}
                placeholder="Tell us which read-only client views you want to evaluate."
              />
            </label>
          </>
        ) : (
          <>
            <TextField
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
            <label className="flex items-start gap-3 rounded-xl border border-[#1f1f1f] bg-[#050505]/72 p-3">
              <input
                className="mt-1 size-4 accent-[var(--accent-primary)]"
                type="checkbox"
              />
              <span>
                <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[#c2c6d8]">
                  Remember workspace
                </span>
                <span className="mt-1 block text-xs leading-5 text-[#8c90a1]">
                  Preview control only. No browser session is persisted.
                </span>
              </span>
            </label>
          </>
        )}
      </div>

      <button
        type="submit"
        className="mt-5 w-full rounded-xl border border-[var(--accent-secondary)]/90 bg-[linear-gradient(135deg,var(--accent-secondary),var(--accent-strong))] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_14px_34px_rgb(var(--accent-secondary-rgb)/0.2)] transition duration-200 hover:-translate-y-px hover:brightness-110"
      >
        {isRegister ? "Preview Access Request" : "Preview Client Access"}
      </button>

      {submitted ? (
        <div className="mt-4 rounded-xl border border-[var(--accent-primary)]/35 bg-[var(--accent-soft)]/70 p-4 font-mono text-xs leading-6 text-[var(--accent-primary)]">
          {isRegister
            ? "Request workflow preview only. No account or access request was created."
            : "Access preview only. No real login session was created."}
        </div>
      ) : null}

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {isRegister ? (
          <>
            <AuthLink href="/model-portfolio" label="View Model Portfolio" />
            <AuthLink href="/login" label="Already Have Access? Login" />
            <AuthLink href="/request-access" label="Request Access" />
          </>
        ) : (
          <>
            <AuthLink href="/model-portfolio" label="View Model Portfolio" />
            <AuthLink href="/request-access" label="Request Access" />
            <AuthLink href="/" label="Back To Home" />
          </>
        )}
      </div>

      <LegalMicrocopy className="mt-5" />
    </form>
  );
}

function TextField({
  id,
  label,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="grid gap-2" htmlFor={id}>
      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#c2c6d8]">
        {label}
      </span>
      <input
        id={id}
        className={terminalInput}
        type={type}
        autoComplete={autoComplete}
      />
    </label>
  );
}

function AuthLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-[#243042] bg-[#050505]/88 px-3 py-3 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-[#c2c6d8] transition-colors duration-150 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
    >
      {label}
    </Link>
  );
}
