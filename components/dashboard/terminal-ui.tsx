import Link from "next/link";

export function TerminalPanel({
  id,
  eyebrow,
  title,
  action,
  children,
  className = "",
  priority = "normal",
}: {
  id?: string;
  eyebrow: string;
  title: string;
  action?: string;
  children: React.ReactNode;
  className?: string;
  priority?: "primary" | "normal" | "passive";
}) {
  const priorityClass =
    priority === "primary"
      ? "border-[#1f1f1f]/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_9px_24px_rgba(0,0,0,0.16)]"
      : priority === "passive"
        ? "border-[#1f1f1f]/70 opacity-[0.96]"
        : "border-[#1f1f1f]/90";

  return (
    <article
      id={id}
      className={`overflow-hidden rounded-2xl border bg-[linear-gradient(180deg,rgba(16,16,16,0.9),rgba(7,7,7,0.84))] shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_8px_22px_rgba(0,0,0,0.14)] ${priorityClass} ${className}`}
    >
      <div className="flex items-center justify-between gap-4 border-b border-[#1f1f1f]/80 bg-[linear-gradient(90deg,rgba(14,14,14,0.76),rgba(5,5,5,0.42))] px-4 py-3">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent-primary)]">
            {eyebrow}
          </div>
          <h2 className="mt-1 text-lg font-semibold leading-tight text-white">
            {title}
          </h2>
        </div>
        {action ? (
          <div className="hidden rounded-lg border border-[#243042] bg-[#050505]/90 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#8c90a1] sm:block">
            {action}
          </div>
        ) : null}
      </div>
      <div className="p-4">{children}</div>
    </article>
  );
}

export function MetricTile({
  label,
  value,
  detail,
  href,
  emphasis = false,
  tone = "neutral",
  compact = false,
}: {
  label: string;
  value: string;
  detail: string;
  href?: string;
  emphasis?: boolean;
  tone?: "neutral" | "good" | "warning" | "muted";
  compact?: boolean;
}) {
  const toneClass =
    tone === "good"
      ? "text-emerald-300"
      : tone === "warning"
        ? "text-amber-200"
        : tone === "muted"
          ? "text-[#c2c6d8]"
          : "text-white";
  const borderClass = emphasis
    ? "border-[#263142] bg-[linear-gradient(180deg,rgb(var(--accent-soft-rgb)/0.12),rgba(7,7,7,0.86))]"
    : "border-[#1f1f1f]/90";
  const detailClass = emphasis ? "text-[var(--accent-primary)]" : "text-[#8c90a1]";

  const card = (
    <article
      className={`rounded-2xl border bg-[linear-gradient(180deg,rgba(14,14,14,0.9),rgba(7,7,7,0.84))] shadow-[inset_0_1px_0_rgba(255,255,255,0.025),0_6px_18px_rgba(0,0,0,0.12)] transition-[border-color,background-color,box-shadow] duration-200 hover:border-[var(--accent-primary)]/38 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_8px_22px_rgba(0,0,0,0.15)] ${borderClass} ${
        compact ? "p-4" : "p-5"
      }`}
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#c2c6d8]">
        {label}
      </div>
      <div
        className={`mt-3 font-mono font-semibold leading-none ${toneClass} ${
          compact ? "text-2xl" : "text-[30px]"
        }`}
      >
        {value}
      </div>
      <div className={`mt-2 font-mono text-xs ${detailClass}`}>
        {detail}
      </div>
    </article>
  );

  if (!href) return card;

  return (
    <Link href={href} className="block">
      {card}
    </Link>
  );
}

export function StatusBadge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "accent" | "neutral";
}) {
  return (
    <span
      className={`inline-flex items-center rounded-xl border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition-colors ${
        tone === "accent"
          ? "border-[var(--accent-primary)]/60 bg-[var(--accent-surface)]/90 text-[var(--accent-primary)] hover:border-[var(--accent-primary)]"
          : "border-[#243042] bg-[#0e0e0e]/82 text-[#c2c6d8] hover:border-[#424655]"
      }`}
    >
      {children}
    </span>
  );
}

export function DataModeBadge({
  source,
}: {
  source: "live-csv" | "mock-fallback" | "parse-error";
}) {
  const label =
    source === "live-csv"
      ? "Live Testnet Data"
      : source === "parse-error"
        ? "Parse Error"
        : "Mock Data Fallback";

  return (
    <Link href="/demo-testnet" className="inline-flex">
      <StatusBadge tone="accent">
        {label}
      </StatusBadge>
    </Link>
  );
}

export function StatusLed({ state }: { state: "online" | "standby" }) {
  return (
    <span
      className={`relative size-3 rounded-full ${
        state === "online"
          ? "bg-emerald-300/80 shadow-[0_0_0_2px_rgba(110,231,183,0.06),0_0_8px_rgba(110,231,183,0.14)]"
          : "bg-[#8c90a1]/70 shadow-[0_0_0_2px_rgba(140,144,161,0.06),0_0_7px_rgba(140,144,161,0.1)]"
      } before:absolute before:inset-[3px] before:rounded-full before:bg-white/35`}
    />
  );
}
