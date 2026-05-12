"use client";

import { BrandMark } from "@/components/brand-mark";
import Link from "next/link";
import { FormEvent, useState } from "react";

type AuthPreviewShellProps = {
  mode: "login" | "register";
};

const terminalInput =
  "rounded-xl border border-[#243042] bg-[#050505]/90 px-4 py-3 text-sm text-white outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] transition duration-200 placeholder:text-[#424655] hover:border-[#424655] focus:border-[#63f7ff] focus:bg-[#061719]/60 focus:shadow-[inset_0_1px_0_rgba(99,247,255,0.08),0_0_0_3px_rgba(99,247,255,0.08)]";

export function AuthPreviewShell({ mode }: AuthPreviewShellProps) {
  const [submitted, setSubmitted] = useState(false);
  const isRegister = mode === "register";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] text-[#e2e2e2]">
      <section className="relative min-h-screen border-b border-[#243042] bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:32px_32px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(86,141,255,0.13),transparent_30%),linear-gradient(90deg,rgba(5,5,5,0.99),rgba(5,5,5,0.82))]" />
        <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 gap-10 px-4 py-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-10">
          <div>
            <Link href="/" aria-label="Quant Terminal home">
              <BrandMark />
            </Link>
            <div className="mt-12 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-[0.18em]">
              <span className="rounded-xl border border-[#424655] bg-[#0e0e0e]/80 px-3 py-2 text-[#63f7ff]">
                Mock
              </span>
              <span className="rounded-xl border border-[#568dff]/60 bg-[#07101f] px-3 py-2 text-[#9dbaff]">
                Private Beta
              </span>
              <span className="rounded-xl border border-[#424655] bg-[#0e0e0e]/80 px-3 py-2 text-[#c2c6d8]">
                Auth Preview
              </span>
            </div>
            <h1 className="mt-8 max-w-2xl text-[42px] font-semibold leading-[1.04] tracking-normal text-white sm:text-6xl">
              {isRegister ? "Create Workspace Access" : "Operator Login"}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#c2c6d8] sm:text-lg">
              Authentication UI preview only. No account is created. This screen
              is a visual placeholder for future login and registration flows.
            </p>
            <div className="mt-8 space-y-3 border-l border-[#424655] pl-4 font-mono text-xs leading-6 text-[#8c90a1]">
              <p>No credentials are stored.</p>
              <p>No backend, Supabase, or auth provider is connected.</p>
              <p>Use the terminal demo for product exploration.</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-[#243042] bg-[linear-gradient(180deg,rgba(14,14,14,0.94),rgba(7,7,7,0.86))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_22px_65px_rgba(0,0,0,0.28)] backdrop-blur-sm sm:p-6"
          >
            <div className="flex items-center justify-between gap-4 border-b border-[#243042] pb-4">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#63f7ff]">
                  {isRegister ? "Register Preview" : "Login Preview"}
                </div>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  {isRegister ? "Private Beta Request" : "Demo Workspace"}
                </h2>
              </div>
              <div className="grid size-11 place-items-center rounded-xl border border-[#63f7ff]/45 bg-[#061719] font-mono text-sm font-semibold text-[#63f7ff]">
                DO
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              {isRegister ? (
                <label className="grid gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#c2c6d8]">
                    Full Name
                  </span>
                  <input
                    required
                    className={terminalInput}
                    placeholder="Demo Operator"
                    type="text"
                  />
                </label>
              ) : null}
              <label className="grid gap-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#c2c6d8]">
                  Email
                </span>
                <input
                  required
                  className={terminalInput}
                  placeholder="demo@quantterminal.local"
                  type="email"
                />
              </label>
              <label className="grid gap-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#c2c6d8]">
                  Password
                </span>
                <input
                  required
                  className={terminalInput}
                  placeholder="Preview only"
                  type="password"
                />
              </label>
              {isRegister ? (
                <label className="grid gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#c2c6d8]">
                    Organization
                  </span>
                  <input
                    className={terminalInput}
                    placeholder="Research Desk"
                    type="text"
                  />
                </label>
              ) : null}
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-xl border border-[#568dff]/90 bg-[linear-gradient(135deg,#568dff,#0058cb)] px-5 py-4 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(0,88,203,0.22)] transition duration-200 hover:-translate-y-px hover:brightness-110"
            >
              {isRegister ? "Preview Registration" : "Preview Login"}
            </button>

            {submitted ? (
              <div className="mt-4 rounded-xl border border-[#63f7ff]/35 bg-[#061719]/70 p-4 font-mono text-xs leading-6 text-[#63f7ff]">
                Authentication UI preview only. No account is created.
              </div>
            ) : null}

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="flex-1 rounded-xl border border-[#243042] bg-[#050505]/88 px-4 py-3 text-center font-mono text-[11px] uppercase tracking-[0.12em] text-[#c2c6d8] transition hover:border-[#63f7ff] hover:text-[#63f7ff]"
              >
                Terminal Demo
              </Link>
              <Link
                href={isRegister ? "/login" : "/register"}
                className="flex-1 rounded-xl border border-[#424655] bg-[#0e0e0e]/82 px-4 py-3 text-center font-mono text-[11px] uppercase tracking-[0.12em] text-[#c2c6d8] transition hover:border-[#63f7ff] hover:text-[#63f7ff]"
              >
                {isRegister ? "Login Preview" : "Register Preview"}
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
