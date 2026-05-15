import {
  MetricTile,
  StatusBadge,
  StatusLed,
  TerminalPanel,
} from "@/components/dashboard/terminal-ui";
import { LegalMicrocopy } from "@/components/legal-microcopy";
import {
  getSignalHistorySnapshot,
  type SignalHistoryRow,
  type SignalHistorySource,
  type SignalHistorySourceStatus,
} from "@/lib/signals/history";
import Link from "next/link";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VISIBLE_EVENT_LIMIT = 25;
const RECENT_EVENT_LIMIT = 5;

export default async function SignalsPage() {
  const snapshot = await getSignalHistorySnapshot();
  const hasRows = snapshot.rows.length > 0;
  const latestEvent = snapshot.rows[0] ?? null;
  const visibleRows = snapshot.rows.slice(0, VISIBLE_EVENT_LIMIT);
  const recentRows = snapshot.rows.slice(0, RECENT_EVENT_LIMIT);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] bg-[linear-gradient(rgba(255,255,255,0.026)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.026)_1px,transparent_1px)] bg-[size:32px_32px] px-4 pb-16 pt-28 text-[#e2e2e2] sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6">
        <section className="overflow-hidden rounded-[30px] border border-[#243042] bg-[radial-gradient(circle_at_18%_0%,rgb(var(--accent-primary-rgb)/0.1),transparent_30%),linear-gradient(180deg,rgba(14,14,14,0.94),rgba(5,5,5,0.84))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_24px_70px_rgba(0,0,0,0.28)] sm:p-8">
          <div className="flex flex-wrap gap-2">
            <StatusBadge tone="accent">Client View</StatusBadge>
            <StatusBadge>Read-only history</StatusBadge>
            <StatusBadge>No execution controls</StatusBadge>
          </div>
          <div className="mt-7 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent-primary)]">
            Signal / Rebalance History
          </div>
          <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                Signal / Rebalance History
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#c2c6d8] sm:text-base">
                Historical model changes parsed from bot artifacts. This page translates
                orders and decisions into client-readable signal and rebalance events
                without creating synthetic examples.
              </p>
            </div>
            <div className="rounded-2xl border border-[#243042] bg-[#050505]/62 p-4 font-mono text-xs uppercase tracking-[0.12em] text-[#8c90a1]">
              <div className="flex items-center gap-3 text-[var(--accent-primary)]">
                <StatusLed state={hasRows ? "online" : "standby"} />
                {hasRows ? "Artifact rows parsed" : "Awaiting usable rows"}
              </div>
              <div className="mt-3 normal-case leading-5 tracking-normal">
                What changed, when, symbol, action, source file, and status when
                available.
              </div>
            </div>
          </div>
        </section>

        {latestEvent ? (
          <LatestSignalPanel row={latestEvent} />
        ) : (
          <TerminalPanel
            action="Awaiting artifact rows"
            eyebrow="Latest Model Change"
            priority="primary"
            title="No latest signal available"
          >
            <SignalsEmptyState />
          </TerminalPanel>
        )}

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <MetricTile
            compact
            detail={hasRows ? "Parsed artifact rows" : "Unavailable from current artifacts"}
            emphasis={hasRows}
            label="Total Events"
            tone={hasRows ? "good" : "muted"}
            value={formatCount(snapshot.summary.totalEvents)}
          />
          <MetricTile
            compact
            detail={hasRows ? "Most recent parsed event" : "Unavailable from current artifacts"}
            label="Latest Signal"
            value={formatTimestamp(snapshot.summary.latestSignalTime)}
          />
          <MetricTile
            compact
            detail={hasRows ? "Unique symbols in parsed rows" : "Unavailable from current artifacts"}
            label="Symbols Touched"
            value={formatCount(snapshot.summary.activeSymbolsTouched)}
          />
          <MetricTile
            compact
            detail={hasRows ? "Executed / planned where derivable" : "Unavailable from current artifacts"}
            label="Executed / Planned"
            value={
              hasRows
                ? `${snapshot.summary.executedCount ?? 0} / ${snapshot.summary.plannedCount ?? 0}`
                : "Unavailable"
            }
          />
        </section>

        {recentRows.length > 0 ? <RecentModelEvents rows={recentRows} /> : null}

        <section className="grid gap-6 xl:grid-cols-[1.45fr_0.55fr]">
          <TerminalPanel
            action={hasRows ? "Artifact-backed" : "No usable rows"}
            eyebrow="Detailed History"
            title="Detailed Event Log"
          >
            {hasRows ? (
              <>
                <p className="mb-4 text-sm leading-6 text-[#8c90a1]">
                  Showing latest {visibleRows.length} model events from available
                  source files. For auditability, this table lists parsed source-file
                  events; no sample rows are generated.
                </p>
                <SignalHistoryTable rows={visibleRows} />
              </>
            ) : (
              <SignalsEmptyState />
            )}
          </TerminalPanel>

          <div className="grid gap-6">
            <TerminalPanel eyebrow="Sources" title="Data Freshness" action="Read-only">
              <div className="grid gap-3">
                {snapshot.sources.map((source) => (
                  <SourceLine key={source.artifactSource} source={source} />
                ))}
              </div>
            </TerminalPanel>

            <TerminalPanel eyebrow="Client Notes" title="How to read this page" action="No execution">
              <div className="space-y-3 text-sm leading-6 text-[#c2c6d8]">
                <p>
                  Source file rows are shown as model events for
                  client readability.
                </p>
                <p>
                  Raw artifact names remain visible for audit transparency, but the
                  interface cannot place orders.
                </p>
                <p className="rounded-2xl border border-[#1f1f1f] bg-[#050505]/70 p-4 text-[#8c90a1]">
                  Read-only model history. Informational/research use only. Past
                  signals do not guarantee future results.
                </p>
              </div>
              <div className="mt-5 grid gap-2">
                <ClientLink href="/model-portfolio" label="View Model Portfolio" />
                <ClientLink href="/dashboard" label="Open Operator Dashboard" />
                <ClientLink href="/request-access" label="Request Access" />
              </div>
              <LegalMicrocopy className="mt-4" />
            </TerminalPanel>
          </div>
        </section>
      </div>
    </main>
  );
}

function LatestSignalPanel({ row }: { row: SignalHistoryRow }) {
  const interpretation = interpretSignal(row);

  return (
    <TerminalPanel
      action={row.artifactSource}
      eyebrow="Latest Model Change"
      priority="primary"
      title="Latest Signal"
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-xl border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] ${interpretation.badgeClass}`}>
              {interpretation.label}
            </span>
            <span className="rounded-xl border border-[#243042] bg-[#050505]/80 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[#c2c6d8]">
              {row.eventType} Event
            </span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <SignalFact label="Timestamp" value={formatTimestamp(row.timestamp)} />
            <SignalFact label="Symbol" value={row.symbol} strong />
            <SignalFact label="Action / Side" value={row.action} accent />
            <SignalFact label="Status" value={row.status} />
          </div>

          <div className="mt-5 rounded-2xl border border-[#243042] bg-[#050505]/70 p-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent-primary)]">
              Client Interpretation
            </div>
            <p className="mt-3 text-base leading-7 text-white">
              {interpretation.copy}
            </p>
            <p className="mt-4 rounded-2xl border border-[var(--accent-primary)]/32 bg-[rgb(var(--accent-primary-rgb)/0.08)] px-4 py-3 text-sm leading-6 text-[#d7dceb]">
              <span className="font-semibold text-[var(--accent-primary)]">
                Client action:
              </span>{" "}
              {interpretation.clientAction}
            </p>
            <p className="mt-3 text-sm leading-6 text-[#8c90a1]">
              This interpretation uses only parsed event fields from the source file.
              Missing targets or previous states remain labeled as unavailable.
            </p>
          </div>
        </div>

        <aside className="rounded-2xl border border-[#1f1f1f] bg-[#050505]/62 p-5">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6f7485]">
            Source Context
          </div>
          <div className="mt-4 grid gap-3">
            <SignalFact label="Source / Sleeve" value={row.sourceSleeve} />
            <SignalFact label="Previous State" value={row.previousState} />
            <SignalFact label="New / Target" value={row.newState} />
            <SignalFact label="Source File" value={row.artifactSource} accent />
          </div>
        </aside>
      </div>
    </TerminalPanel>
  );
}

function RecentModelEvents({ rows }: { rows: SignalHistoryRow[] }) {
  return (
    <TerminalPanel
      action={`Latest ${rows.length}`}
      eyebrow="Recent Model Events"
      title="Plain-English Event Summary"
    >
      <div className="grid gap-3">
        {rows.map((row) => {
          const interpretation = interpretSignal(row);
          return (
            <div
              className="rounded-2xl border border-[#1f1f1f] bg-[#050505]/58 p-4"
              key={row.id}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#6f7485]">
                    {formatTimestamp(row.timestamp)} / {row.symbol}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-white">
                    {interpretation.copy}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#8c90a1]">
                    Client action: {interpretation.clientAction}
                  </p>
                </div>
                <div className="shrink-0 text-left sm:text-right">
                  <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--accent-primary)]">
                    {row.action}
                  </div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[#6f7485]">
                    {row.artifactSource}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </TerminalPanel>
  );
}

function SignalHistoryTable({ rows }: { rows: SignalHistoryRow[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#1f1f1f] bg-[#050505]/62">
      <table className="w-full min-w-[980px] border-collapse font-mono text-xs">
        <thead>
          <tr className="border-b border-[#243042] bg-[#0e0e0e]/58 text-left uppercase tracking-[0.12em] text-[#8c90a1]">
            <th className="px-3 py-3 font-medium">Timestamp</th>
            <th className="px-3 py-3 font-medium">Symbol</th>
            <th className="px-3 py-3 font-medium">Action / Side</th>
            <th className="px-3 py-3 font-medium">Previous</th>
            <th className="px-3 py-3 font-medium">New / Target</th>
            <th className="px-3 py-3 font-medium">Source / Sleeve</th>
            <th className="px-3 py-3 font-medium">Status</th>
            <th className="px-3 py-3 text-right font-medium">Source File</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              className="border-b border-[#1f1f1f] text-[#c2c6d8] transition-colors hover:bg-[#101820]"
              key={row.id}
            >
              <td className="px-3 py-3 text-[#8c90a1]">{formatTimestamp(row.timestamp)}</td>
              <td className="px-3 py-3 font-semibold text-white">{row.symbol}</td>
              <td className="px-3 py-3 text-[var(--accent-primary)]">{row.action}</td>
              <td className="px-3 py-3">{row.previousState}</td>
              <td className="px-3 py-3">{row.newState}</td>
              <td className="px-3 py-3">{row.sourceSleeve}</td>
              <td className="px-3 py-3">
                <span className="rounded-lg border border-[#243042] bg-[#050505]/80 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-[#c2c6d8]">
                  {row.status}
                </span>
              </td>
              <td className="px-3 py-3 text-right text-[#8c90a1]">
                <span className="block text-[var(--accent-primary)]">{row.eventType}</span>
                <span>{row.artifactSource}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SignalsEmptyState() {
  return (
    <div className="rounded-2xl border border-[#243042] bg-[#050505]/70 p-6">
      <div className="flex items-start gap-4">
        <StatusLed state="standby" />
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.16em] text-white">
            No signal or rebalance history available from current artifacts.
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#8c90a1]">
            This can happen if the bot has not produced decision/order rows yet,
            artifacts are empty, or telemetry history is still being collected.
          </p>
          <p className="mt-3 max-w-2xl text-xs leading-5 text-[#747987]">
            QuantBot does not show fake sample rows here. Client-facing signal history
            appears only when usable artifact rows exist.
          </p>
        </div>
      </div>
    </div>
  );
}

function SourceLine({ source }: { source: SignalHistorySource }) {
  const healthy = source.status === "LIVE_FILE";
  return (
    <div className="rounded-2xl border border-[#1f1f1f] bg-[#050505]/62 p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <StatusLed state={healthy ? "online" : "standby"} />
          <span className="truncate font-mono text-xs uppercase tracking-[0.12em] text-white">
            {source.artifactSource}
          </span>
        </div>
        <span className={`font-mono text-[10px] uppercase tracking-[0.12em] ${statusClass(source.status)}`}>
          {source.status.replaceAll("_", " ")}
        </span>
      </div>
      <div className="mt-3 grid gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-[#8c90a1]">
        <div className="flex justify-between gap-3">
          <span>Rows</span>
          <span className="text-[#c2c6d8]">{source.rowCount}</span>
        </div>
        <div className="flex justify-between gap-3">
          <span>Updated</span>
          <span className="text-right text-[#c2c6d8]">{formatTimestamp(source.lastModified)}</span>
        </div>
      </div>
      <p className="mt-3 text-xs leading-5 text-[#6f7485]">{source.message}</p>
    </div>
  );
}

function SignalFact({
  label,
  value,
  accent = false,
  strong = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
  strong?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-[#1f1f1f] bg-[#050505]/58 p-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#6f7485]">
        {label}
      </div>
      <div
        className={`mt-2 break-words font-mono text-sm ${
          accent
            ? "text-[var(--accent-primary)]"
            : strong
              ? "font-semibold text-white"
              : "text-[#c2c6d8]"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function ClientLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      className="rounded-xl border border-[#243042] bg-[#050505]/88 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-[#c2c6d8] transition-colors duration-150 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
      href={href}
    >
      {label}
    </Link>
  );
}

function formatCount(value: number | null | undefined) {
  if (value === null || value === undefined) return "Unavailable";
  return new Intl.NumberFormat("en-US").format(value);
}

function formatTimestamp(timestamp: string | null | undefined) {
  if (!timestamp) return "Unavailable";
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return "Unavailable";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

function statusClass(status: SignalHistorySourceStatus) {
  if (status === "LIVE_FILE") return "text-emerald-300";
  if (status === "STALE_FILE" || status === "LIVE_FILE_EMPTY") return "text-amber-200";
  if (status === "PARSE_ERROR") return "text-rose-300";
  return "text-[#8c90a1]";
}

function interpretSignal(row: SignalHistoryRow) {
  const text = `${row.action} ${row.newState} ${row.status}`.toLowerCase();

  if (text.includes("flat") || text.includes("no active") || text.includes("cash")) {
    return {
      label: "No rebalance required",
      copy: "No portfolio change is required from this event.",
      clientAction: "No rebalance required.",
      badgeClass:
        "border-[#424655] bg-[#050505]/86 text-[#c2c6d8]",
    };
  }

  if (text.includes("buy") || text.includes("long")) {
    return {
      label: "Long exposure increased",
      copy: "Model increased long exposure based on this parsed event.",
      clientAction: "Review current model allocation.",
      badgeClass:
        "border-emerald-300/35 bg-emerald-300/10 text-emerald-300",
    };
  }

  if (text.includes("sell") || text.includes("short")) {
    return {
      label: "Exposure reduced or changed",
      copy: "Model reduced or changed exposure based on this parsed event.",
      clientAction: "Review current model allocation.",
      badgeClass:
        "border-rose-300/35 bg-rose-300/10 text-rose-300",
    };
  }

  return {
    label: "Informational model event",
    copy: "A model event was parsed, but the available fields do not specify a clear allocation change.",
    clientAction: "Stand by until a clearer allocation event is available.",
    badgeClass:
      "border-[var(--accent-primary)]/40 bg-[var(--accent-soft)] text-[var(--accent-primary)]",
  };
}
