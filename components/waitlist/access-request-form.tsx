"use client";

import { FormEvent, useMemo, useState } from "react";

const userTypes = ["Researcher", "Quant Trader", "Institutional", "Developer"];

type FormState = {
  fullName: string;
  email: string;
  company: string;
  userType: string;
  useCase: string;
  acknowledged: boolean;
};

const initialState: FormState = {
  fullName: "",
  email: "",
  company: "",
  userType: "Researcher",
  useCase: "",
  acknowledged: false,
};

const terminalInput =
  "w-full rounded-xl border border-[#243042] bg-[#050505]/92 px-4 py-3 font-mono text-sm text-white outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] transition duration-200 placeholder:text-[#424655] hover:border-[#424655] focus:border-[#63f7ff] focus:bg-[#061719]/60 focus:shadow-[inset_0_1px_0_rgba(99,247,255,0.08),0_0_0_3px_rgba(99,247,255,0.08)]";

export function AccessRequestForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo(() => {
    const next: Partial<Record<keyof FormState, string>> = {};

    if (!form.fullName.trim()) next.fullName = "Full name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Use a valid business email.";
    }
    if (!form.company.trim()) next.company = "Company is required.";
    if (form.useCase.trim().length < 12) {
      next.useCase = "Briefly describe your research or demo use case.";
    }
    if (!form.acknowledged) {
      next.acknowledged = "Required for demo access.";
    }

    return next;
  }, [form]);

  const hasErrors = Object.keys(errors).length > 0;

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);

    if (hasErrors) return;

    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 800);
  }

  if (success) {
    return (
      <section className="rounded-2xl border border-[#424655] bg-[#0a0a0a]/88 p-5 shadow-[0_22px_70px_rgba(0,0,0,0.34)] backdrop-blur-sm sm:p-7">
        <div className="rounded-xl border border-[#63f7ff] bg-[#061719]/80 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#63f7ff]">
          Request queued
        </div>
        <h2 className="mt-7 text-3xl font-semibold text-white">
          Access request received.
        </h2>
        <p className="mt-4 text-sm leading-7 text-[#c2c6d8]">
          Your private beta request has been captured locally for this product
          demo. No backend submission was performed.
        </p>
        <div className="mt-6 rounded-xl border border-[#243042] bg-[#050505] p-4 font-mono text-xs leading-6 text-[#8c90a1]">
          No live trading access is provided. For research and informational
          purposes only.
        </div>
        <button
          type="button"
          onClick={() => {
            setForm(initialState);
            setSubmitted(false);
            setSuccess(false);
          }}
          className="mt-6 w-full rounded-xl border border-[#424655] bg-[#0a0a0a] px-5 py-4 text-sm font-semibold text-[#e2e2e2] transition hover:border-[#63f7ff] hover:text-[#63f7ff]"
        >
          Submit Another Request
        </button>
      </section>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-[#424655] bg-[#0a0a0a]/88 p-5 shadow-[0_22px_70px_rgba(0,0,0,0.34)] backdrop-blur-sm sm:p-7"
    >
      <div className="flex items-center justify-between gap-4 border-b border-[#243042] pb-5">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#63f7ff]">
            Institutional Waitlist
          </div>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Access Profile
          </h2>
        </div>
        <span className="hidden rounded-lg border border-[#243042] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#8c90a1] sm:block">
          Mock submit
        </span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field
          label="Full name"
          error={submitted ? errors.fullName : undefined}
        >
          <input
            value={form.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
            className={terminalInput}
            placeholder="Alex Morgan"
          />
        </Field>
        <Field label="Email" error={submitted ? errors.email : undefined}>
          <input
            type="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            className={terminalInput}
            placeholder="alex@fund.example"
          />
        </Field>
        <Field
          label="Company / organization"
          error={submitted ? errors.company : undefined}
        >
          <input
            value={form.company}
            onChange={(event) => updateField("company", event.target.value)}
            className={terminalInput}
            placeholder="Research desk"
          />
        </Field>
        <Field label="User type">
          <select
            value={form.userType}
            onChange={(event) => updateField("userType", event.target.value)}
            className={`${terminalInput} appearance-none bg-[linear-gradient(45deg,transparent_50%,#63f7ff_50%),linear-gradient(135deg,#63f7ff_50%,transparent_50%),linear-gradient(180deg,rgba(5,5,5,0.92),rgba(5,5,5,0.92))] bg-[length:6px_6px,6px_6px,100%_100%] bg-[position:calc(100%-18px)_calc(50%-3px),calc(100%-12px)_calc(50%-3px),0_0] bg-no-repeat pr-11`}
          >
            {userTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-4">
        <Field label="Use case" error={submitted ? errors.useCase : undefined}>
          <textarea
            value={form.useCase}
            onChange={(event) => updateField("useCase", event.target.value)}
            className={`${terminalInput} min-h-32 resize-y`}
            placeholder="Describe the demo workflow, research process, or risk monitoring use case you want to evaluate."
          />
        </Field>
      </div>

      <label className="mt-5 flex gap-3 rounded-xl border border-[#243042] bg-[#050505] p-4 font-mono text-xs leading-6 text-[#c2c6d8] transition duration-200 hover:border-[#424655]">
        <input
          type="checkbox"
          checked={form.acknowledged}
          onChange={(event) =>
            updateField("acknowledged", event.target.checked)
          }
          className="mt-1 size-4 rounded border border-[#243042] accent-[#63f7ff]"
        />
        <span>I understand this is a demo/research environment.</span>
      </label>
      {submitted && errors.acknowledged ? (
        <p className="mt-2 font-mono text-xs text-[#ffb4ab]">
          {errors.acknowledged}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-xl border border-[#568dff]/90 bg-[linear-gradient(135deg,#568dff,#0058cb)] px-7 py-4 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(0,88,203,0.22)] transition hover:-translate-y-px hover:brightness-110 disabled:cursor-wait disabled:opacity-70"
      >
        {loading ? "Submitting Mock Request..." : "Submit Access Request"}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-[#c2c6d8]">
        {label}
      </span>
      {children}
      {error ? (
        <span className="mt-2 block font-mono text-xs text-[#ffb4ab]">
          {error}
        </span>
      ) : null}
    </label>
  );
}
