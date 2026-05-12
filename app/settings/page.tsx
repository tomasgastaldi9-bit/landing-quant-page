import Link from "next/link";

import {
  MetricTile,
  StatusBadge,
  StatusLed,
  TerminalPanel,
} from "@/components/dashboard/terminal-ui";

const preferenceRows = [
  {
    label: "Default workspace",
    value: "Operator Terminal",
    detail: "Dashboard-first workflow for monitoring and execution review.",
  },
  {
    label: "Interface density",
    value: "Terminal Dense",
    detail: "Compact rows, high scanability, reduced decorative spacing.",
  },
  {
    label: "Session mode",
    value: "Research Desk",
    detail: "Alpha Lab and risk telemetry remain one command away.",
  },
];

const notificationRows = [
  { label: "Risk events", value: "Enabled", state: "online" as const },
  { label: "Execution logs", value: "Enabled", state: "online" as const },
  { label: "Research updates", value: "Daily digest", state: "standby" as const },
  { label: "Marketing emails", value: "Disabled", state: "standby" as const },
];

const themeModes = [
  {
    label: "Cyan",
    status: "Active",
    swatch: "from-[var(--accent-primary)] to-sky-300",
  },
  {
    label: "Institutional Blue",
    status: "Preview",
    swatch: "from-blue-500 to-indigo-300",
  },
  {
    label: "Deep Teal",
    status: "Preview",
    swatch: "from-teal-500 to-emerald-300",
  },
  {
    label: "Silver / Ice",
    status: "Preview",
    swatch: "from-slate-200 to-cyan-100",
  },
];

function SettingsRow({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-[#1f1f1f]/90 bg-[#050505]/58 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8c90a1]">
            {label}
          </div>
          <div className="mt-2 text-sm text-[#c2c6d8]">{detail}</div>
        </div>
        <div className="rounded-xl border border-[var(--accent-border)] bg-[var(--accent-surface)] px-3 py-2 font-mono text-xs uppercase tracking-[0.12em] text-[var(--accent-primary)]">
          {value}
        </div>
      </div>
    </div>
  );
}

function MockToggle({
  label,
  value,
  state,
}: {
  label: string;
  value: string;
  state: "online" | "standby";
}) {
  const isOnline = state === "online";

  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-[#1f1f1f]/90 bg-[#050505]/58 px-4 py-3">
      <div className="flex min-w-0 items-center gap-3">
        <StatusLed state={state} />
        <div className="min-w-0">
          <div className="truncate font-mono text-xs uppercase tracking-[0.12em] text-white">
            {label}
          </div>
          <div className="mt-1 text-xs text-[#8c90a1]">{value}</div>
        </div>
      </div>
      <div
        className={`h-6 w-11 rounded-full border p-1 ${
          isOnline
            ? "border-emerald-300/30 bg-emerald-300/12"
            : "border-[#424655] bg-[#0e0e0e]"
        }`}
      >
        <div
          className={`size-4 rounded-full transition ${
            isOnline
              ? "translate-x-5 bg-emerald-200 shadow-[0_0_14px_rgba(110,231,183,0.2)]"
              : "bg-[#8c90a1]"
          }`}
        />
      </div>
    </div>
  );
}

function ThemeSwatch({
  label,
  status,
  swatch,
}: {
  label: string;
  status: string;
  swatch: string;
}) {
  const active = status === "Active";

  return (
    <div
      className={`rounded-2xl border p-4 transition ${
        active
          ? "border-[var(--accent-primary)]/46 bg-[var(--accent-soft)]"
          : "border-[#1f1f1f]/90 bg-[#050505]/58"
      }`}
    >
      <div className={`h-10 rounded-xl bg-gradient-to-r ${swatch}`} />
      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-white">
          {label}
        </span>
        <span
          className={`rounded-lg border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] ${
            active
              ? "border-[var(--accent-primary)]/46 text-[var(--accent-primary)]"
              : "border-[#243042] text-[#8c90a1]"
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-[28px] border border-[#243042] bg-[linear-gradient(135deg,rgb(var(--accent-soft-rgb)/0.18),rgba(5,5,5,0.94)_42%,rgba(12,12,12,0.9))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.045),0_26px_90px_rgba(0,0,0,0.34)] sm:p-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2">
              <StatusBadge tone="accent">Mock UI</StatusBadge>
              <StatusBadge>Private Beta</StatusBadge>
              <StatusBadge>Read-only</StatusBadge>
              <StatusBadge>No Secrets</StatusBadge>
            </div>
            <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Workspace Settings
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#c2c6d8]">
              A non-functional settings workspace for operator identity,
              terminal preferences, data mode, security posture, and private
              beta access controls.
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--accent-border)] bg-[#050505]/72 p-4 font-mono text-xs uppercase tracking-[0.12em] text-[#8c90a1]">
            <div className="flex items-center gap-3 text-[var(--accent-primary)]">
              <StatusLed state="online" />
              Workspace Preview Online
            </div>
            <div className="mt-3 text-[#8c90a1]">No backend mutation enabled</div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <MetricTile
          compact
          detail="Mock identity"
          label="Operator"
          tone="muted"
          value="Demo"
        />
        <MetricTile
          compact
          detail="Terminal shell"
          label="Workspace"
          value="QuantBot"
        />
        <MetricTile
          compact
          detail="Demo/testnet"
          label="Data Mode"
          tone="good"
          value="Read-only"
        />
        <MetricTile
          compact
          detail="Invite preview"
          label="Access Tier"
          tone="warning"
          value="Private"
        />
        <MetricTile
          compact
          detail="No API route"
          label="API Status"
          tone="muted"
          value="Offline"
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <TerminalPanel
          action="Identity"
          eyebrow="Profile"
          priority="primary"
          title="Operator Identity"
        >
          <div className="grid gap-4 md:grid-cols-[auto_1fr] md:items-center">
            <div className="flex size-20 items-center justify-center rounded-3xl border border-[var(--accent-border)] bg-[var(--accent-surface)] font-mono text-2xl font-semibold text-[var(--accent-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              DO
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-semibold text-white">
                  Demo Operator
                </h2>
                <StatusBadge tone="accent">Testnet Workspace</StatusBadge>
              </div>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.12em] text-[#8c90a1]">
                demo@quantbot.local
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-[#c2c6d8]">
                Identity controls are visual placeholders for a future
                authenticated workspace. No profile data is saved and no account
                is created from this interface.
              </p>
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <StatusBadge>Research Seat</StatusBadge>
            <StatusBadge>Read-only Terminal</StatusBadge>
            <StatusBadge>Private Beta</StatusBadge>
          </div>
        </TerminalPanel>

        <TerminalPanel
          action="Preferences"
          eyebrow="Workspace"
          title="Operator Preferences"
        >
          <div className="grid gap-3">
            {preferenceRows.map((row) => (
              <SettingsRow key={row.label} {...row} />
            ))}
          </div>
        </TerminalPanel>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <TerminalPanel
          action="Accent Tokens"
          eyebrow="Theme"
          title="Theme / Accent Mode"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {themeModes.map((theme) => (
              <ThemeSwatch key={theme.label} {...theme} />
            ))}
          </div>
          <p className="mt-4 text-sm leading-6 text-[#8c90a1]">
            Theme options mirror the centralized CSS token system. This page is
            a visual control preview only; the developer switcher remains the
            current testing utility.
          </p>
        </TerminalPanel>

        <TerminalPanel action="Read-only" eyebrow="Data" title="Data Mode">
          <div className="rounded-2xl border border-[var(--accent-border)] bg-[var(--accent-surface)] p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent-primary)]">
                  Active Context
                </div>
                <div className="mt-2 text-2xl font-semibold text-white">
                  Demo / Testnet
                </div>
              </div>
              <StatusLed state="online" />
            </div>
            <p className="mt-4 text-sm leading-6 text-[#c2c6d8]">
              Dashboard data may read local CSV observability outputs when
              present, otherwise it falls back to mock telemetry. No live
              capital, execution controls, or trading mutations are exposed.
            </p>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link
              className="rounded-2xl border border-[#243042] bg-[#050505]/66 p-4 transition hover:border-[var(--accent-primary)]/40 hover:bg-[var(--accent-soft)]"
              href="/demo-testnet"
            >
              <div className="font-mono text-xs uppercase tracking-[0.12em] text-white">
                Demo/Testnet Explainer
              </div>
              <div className="mt-2 text-sm text-[#8c90a1]">
                Review data boundaries and research-only behavior.
              </div>
            </Link>
            <Link
              className="rounded-2xl border border-[#243042] bg-[#050505]/66 p-4 transition hover:border-[var(--accent-primary)]/40 hover:bg-[var(--accent-soft)]"
              href="/dashboard"
            >
              <div className="font-mono text-xs uppercase tracking-[0.12em] text-white">
                Open Terminal
              </div>
              <div className="mt-2 text-sm text-[#8c90a1]">
                Return to the operator monitoring workspace.
              </div>
            </Link>
          </div>
        </TerminalPanel>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <TerminalPanel
          action="Mock Alerts"
          eyebrow="Notifications"
          title="Notification Preferences"
        >
          <div className="grid gap-3">
            {notificationRows.map((row) => (
              <MockToggle key={row.label} {...row} />
            ))}
          </div>
        </TerminalPanel>

        <div className="grid gap-6">
          <TerminalPanel
            action="No Mutation"
            eyebrow="Security"
            title="Read-only Access"
          >
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                "No auth provider",
                "No API keys",
                "No secret storage",
                "No account writes",
                "No live trading access",
                "No billing flow",
              ].map((item) => (
                <div
                  className="rounded-2xl border border-[#1f1f1f]/90 bg-[#050505]/58 p-4 font-mono text-xs uppercase tracking-[0.12em] text-[#c2c6d8]"
                  key={item}
                >
                  {item}
                </div>
              ))}
            </div>
          </TerminalPanel>

          <TerminalPanel action="Placeholder" eyebrow="Platform" title="API Status">
            <div className="grid gap-3 sm:grid-cols-2">
              <SettingsRow
                detail="Future workspace services are represented visually only."
                label="API Gateway"
                value="Not Connected"
              />
              <SettingsRow
                detail="No environment variables or credentials are requested."
                label="Credential Store"
                value="Disabled"
              />
            </div>
          </TerminalPanel>
        </div>
      </section>

      <TerminalPanel
        action="Access"
        eyebrow="Private Beta"
        title="Access Tier / Research Disclaimer"
      >
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <p className="max-w-3xl text-sm leading-6 text-[#c2c6d8]">
            QuantBot settings are mock controls for product demonstration and
            research review. No live trading access is provided. For research
            and informational purposes only. Not financial advice. Performance
            is not guaranteed.
          </p>
          <Link
            className="inline-flex justify-center rounded-2xl border border-[var(--accent-primary)]/46 bg-[var(--accent-soft)] px-5 py-3 font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent-primary)] transition hover:border-[var(--accent-primary)] hover:bg-[var(--accent-surface)]"
            href="/request-access"
          >
            Request Access
          </Link>
        </div>
      </TerminalPanel>
    </main>
  );
}
