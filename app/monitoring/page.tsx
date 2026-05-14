import Link from "next/link";

import {
  MetricTile,
  StatusBadge,
  StatusLed,
  TerminalPanel,
} from "@/components/dashboard/terminal-ui";
import { getEquitySnapshot } from "@/lib/equity/csv-adapter";
import { getPositionsSnapshot } from "@/lib/positions/csv-adapter";
import { getCombinedEventStream } from "@/lib/telemetry/events";
import { getHealthTelemetry } from "@/lib/telemetry/health";
import type { TelemetryEvent, TelemetrySourceStatus } from "@/lib/telemetry/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type FeedRow = {
  label: string;
  status: TelemetrySourceStatus;
  source: string;
  lastUpdate: string | null;
  freshness: string;
};

const monitoredFiles = [
  "live_telemetry_equity.csv",
  "live_telemetry_positions.csv",
  "live_telemetry_status.json",
  "live_testnet_orders.csv",
  "live_testnet_decisions.csv",
  "live_testnet_alerts.csv",
];

const failureStates = [
  {
    title: "Missing file",
    body: "The API remains online and labels the feed as unavailable instead of crashing the terminal.",
    tone: "neutral" as const,
  },
  {
    title: "Stale telemetry",
    body: "Operators should treat delayed timestamps as degraded observability, not strategy behavior.",
    tone: "warning" as const,
  },
  {
    title: "Parse error",
    body: "Malformed rows are isolated to the affected feed and surfaced as a visible parse state.",
    tone: "warning" as const,
  },
  {
    title: "Mock fallback",
    body: "Fallback states are explicitly labeled and never imply live capital or invented positions.",
    tone: "neutral" as const,
  },
];

export default async function MonitoringPage() {
  const [health, equity, positions, eventStream] = await Promise.all([
    getHealthTelemetry(),
    getEquitySnapshot(),
    getPositionsSnapshot(),
    getCombinedEventStream(36),
  ]);

  const healthFiles = health.files ?? [];
  const fileMap = new Map(healthFiles.map((file) => [file.fileName, file]));
  const ordersSource = eventStream.sources.orders;
  const decisionsSource = eventStream.sources.decisions;
  const alertsSource = eventStream.sources.alerts;
  const openPositions = positions.positions.filter((position) => {
    const size = position.size ?? 0;
    return Math.abs(size) > 1e-8 && position.side.toUpperCase() !== "FLAT";
  });
  const feeds: FeedRow[] = [
    {
      label: "Equity feed",
      status: equity.sourceStatus ?? "MOCK_FALLBACK",
      source: equity.filePath ? shortFileName(equity.filePath) : "mock equity adapter",
      lastUpdate: equity.lastUpdate,
      freshness: formatFreshness(equity.lastUpdate),
    },
    {
      label: "Positions feed",
      status: positions.sourceStatus ?? "MOCK_FALLBACK",
      source: positions.filePath ? shortFileName(positions.filePath) : "mock positions adapter",
      lastUpdate: positions.lastUpdate,
      freshness: formatFreshness(positions.lastUpdate),
    },
    {
      label: "Orders feed",
      status: ordersSource.status,
      source: ordersSource.fileName,
      lastUpdate: ordersSource.lastModified,
      freshness: formatFreshness(ordersSource.lastModified),
    },
    {
      label: "Decisions feed",
      status: decisionsSource.status,
      source: decisionsSource.fileName,
      lastUpdate: decisionsSource.lastModified,
      freshness: formatFreshness(decisionsSource.lastModified),
    },
    {
      label: "Alerts feed",
      status: alertsSource.status,
      source: alertsSource.fileName,
      lastUpdate: alertsSource.lastModified,
      freshness: formatFreshness(alertsSource.lastModified),
    },
    {
      label: "Health/status feed",
      status: health.status as TelemetrySourceStatus,
      source: "health aggregation",
      lastUpdate: health.lastUpdated,
      freshness: formatFreshness(health.lastUpdated),
    },
  ];
  const schedulerLastCycle =
    latestTimestamp([decisionsSource.lastModified, ordersSource.lastModified, health.lastUpdated]) ??
    null;
  const nextCycle = schedulerLastCycle
    ? new Date(new Date(schedulerLastCycle).getTime() + 60 * 60 * 1000).toISOString()
    : null;
  const telemetryStatusFile = fileMap.get("live_telemetry_status.json");

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:32px_32px] px-4 pb-16 pt-28 text-[#e2e2e2] sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6">
        <section className="overflow-hidden rounded-[28px] border border-[#243042] bg-[radial-gradient(circle_at_18%_0%,rgb(var(--accent-primary-rgb)/0.11),transparent_32%),linear-gradient(180deg,rgba(14,14,14,0.92),rgba(5,5,5,0.8))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.045),0_22px_64px_rgba(0,0,0,0.3)] sm:p-7">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap gap-2">
                <StatusBadge tone="accent">Monitoring</StatusBadge>
                <StatusBadge>Read-only</StatusBadge>
                <StatusBadge>Testnet</StatusBadge>
                <StatusBadge>No Controls</StatusBadge>
              </div>
              <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                Monitoring Console
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#c2c6d8]">
                Deep observability for telemetry freshness, CSV artifacts,
                scheduler cadence, event streams, and degraded data states.
                Dashboard remains the operator summary; monitoring is the
                system inspection surface.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--accent-border)] bg-[#050505]/72 p-4 font-mono text-xs uppercase tracking-[0.12em] text-[#8c90a1]">
              <div className="flex items-center gap-3 text-[var(--accent-primary)]">
                <StatusLed state={isHealthyStatus(health.status) ? "online" : "standby"} />
                {formatSourceStatus(health.status)}
              </div>
              <div className="mt-3 text-[#8c90a1]">
                Last refresh {formatTimestamp(health.lastUpdated)}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
          <MetricTile
            compact
            detail="Aggregate"
            emphasis
            label="System Status"
            tone={isHealthyStatus(health.status) ? "good" : "warning"}
            value={formatSourceStatus(health.status)}
          />
          <MetricTile
            compact
            detail="Health API"
            label="Telemetry"
            tone={isHealthyStatus(health.status) ? "good" : "warning"}
            value={health.files.some((file) => file.status === "LIVE_FILE") ? "Connected" : "Limited"}
          />
          <MetricTile
            compact
            detail="Positions"
            label="Open"
            tone={openPositions.length > 0 ? "good" : "muted"}
            value={String(openPositions.length)}
          />
          <MetricTile
            compact
            detail="Preferred source"
            label="Data Source"
            value={equity.source === "live-csv" ? "Live CSV" : "Fallback"}
          />
          <MetricTile compact detail="No mutation" label="Mode" value="Read-only" />
          <MetricTile compact detail="No real capital" label="Workspace" value="Testnet" />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <TerminalPanel
            action="Feed Matrix"
            eyebrow="Telemetry"
            priority="primary"
            title="Telemetry Health"
          >
            <div className="grid gap-3">
              {feeds.map((feed) => (
                <FeedHealthRow key={feed.label} feed={feed} />
              ))}
            </div>
          </TerminalPanel>

          <TerminalPanel
            action="Runtime"
            eyebrow="Scheduler"
            title="Scheduler / Bot Runtime"
          >
            <div className="grid gap-3">
              <RuntimeRow
                label="Hourly bot cycle"
                status={decisionsSource.status}
                value={formatSourceStatus(decisionsSource.status)}
              />
              <RuntimeRow
                label="Last cycle timestamp"
                status={decisionsSource.status}
                value={formatTimestamp(schedulerLastCycle)}
              />
              <RuntimeRow
                label="Next expected cycle"
                status={schedulerLastCycle ? "LIVE_FILE" : "MISSING_FILE"}
                value={formatTimestamp(nextCycle)}
              />
              <RuntimeRow
                label="Live telemetry monitor"
                status={(telemetryStatusFile?.status ?? "MISSING_FILE") as TelemetrySourceStatus}
                value={telemetryStatusFile ? formatSourceStatus(telemetryStatusFile.status) : "Missing"}
              />
              <RuntimeRow
                label="Monitor interval"
                status={(telemetryStatusFile?.status ?? "MISSING_FILE") as TelemetrySourceStatus}
                value="10-30 seconds"
              />
              <RuntimeRow
                label="Uptime"
                status="MOCK_FALLBACK"
                value="Preview only"
              />
            </div>
          </TerminalPanel>
        </section>

        <TerminalPanel
          action="Artifacts"
          eyebrow="Freshness"
          title="Data Freshness Matrix"
        >
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {monitoredFiles.map((fileName) => {
              const file = fileMap.get(fileName);

              return (
                <ArtifactCard
                  key={fileName}
                  fileName={fileName}
                  lastModified={file?.lastModified ?? null}
                  rowCount={file?.rowCount ?? 0}
                  status={(file?.status ?? "MISSING_FILE") as TelemetrySourceStatus}
                />
              );
            })}
          </div>
        </TerminalPanel>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <TerminalPanel
            action={formatSourceStatus(eventStream.status)}
            eyebrow="Events"
            priority="primary"
            title="Event Stream"
          >
            <div className="mb-3 flex flex-wrap gap-2">
              {["SYS", "DATA", "RISK", "EXEC", "ALERT", "ERROR"].map((label) => (
                <span
                  className="rounded-xl border border-[#243042] bg-[#050505]/82 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#8c90a1]"
                  key={label}
                >
                  {label}
                </span>
              ))}
            </div>
            <EventStream events={eventStream.events} />
          </TerminalPanel>

          <div className="grid gap-6">
            <TerminalPanel
              action="Degraded States"
              eyebrow="Fallback"
              title="Failure / Fallback States"
            >
              <div className="grid gap-3">
                {failureStates.map((state) => (
                  <div
                    className="rounded-2xl border border-[#1f1f1f]/90 bg-[#050505]/58 p-4"
                    key={state.title}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="font-mono text-xs uppercase tracking-[0.12em] text-white">
                        {state.title}
                      </div>
                      <StatusBadge tone={state.tone === "warning" ? "accent" : "neutral"}>
                        Visible
                      </StatusBadge>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[#8c90a1]">
                      {state.body}
                    </p>
                  </div>
                ))}
              </div>
            </TerminalPanel>

            <TerminalPanel action="Safety" eyebrow="Compliance" title="Read-only Observability">
              <div className="grid gap-3">
                {[
                  "No order placement",
                  "No API key exposure",
                  "No trading controls",
                  "No scheduler mutation",
                  "No executor access",
                ].map((item) => (
                  <div
                    className="flex items-center gap-3 rounded-2xl border border-[#1f1f1f]/90 bg-[#050505]/58 p-4 font-mono text-xs uppercase tracking-[0.12em] text-[#c2c6d8]"
                    key={item}
                  >
                    <StatusLed state="standby" />
                    {item}
                  </div>
                ))}
              </div>
              <Link
                className="mt-4 inline-flex rounded-2xl border border-[var(--accent-primary)]/45 bg-[var(--accent-soft)] px-5 py-3 font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent-primary)] transition hover:border-[var(--accent-primary)]"
                href="/dashboard"
              >
                Return to Dashboard
              </Link>
            </TerminalPanel>
          </div>
        </section>
      </div>
    </main>
  );
}

function FeedHealthRow({ feed }: { feed: FeedRow }) {
  return (
    <div className="grid gap-3 rounded-2xl border border-[#1f1f1f]/90 bg-[#050505]/58 p-4 font-mono text-xs md:grid-cols-[1fr_auto_auto] md:items-center">
      <div>
        <div className="flex items-center gap-3">
          <StatusLed state={isHealthyStatus(feed.status) ? "online" : "standby"} />
          <span className="uppercase tracking-[0.12em] text-white">{feed.label}</span>
        </div>
        <div className="mt-2 truncate text-[#8c90a1]">{feed.source}</div>
      </div>
      <div className="rounded-xl border border-[#243042] bg-[#0e0e0e]/82 px-3 py-2 uppercase tracking-[0.12em] text-[var(--accent-primary)]">
        {formatSourceStatus(feed.status)}
      </div>
      <div className="text-right text-[#8c90a1]">
        <div>{feed.freshness}</div>
        <div className="mt-1">{formatTimestamp(feed.lastUpdate)}</div>
      </div>
    </div>
  );
}

function RuntimeRow({
  label,
  status,
  value,
}: {
  label: string;
  status: TelemetrySourceStatus;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-[#1f1f1f]/90 bg-[#050505]/58 p-4">
      <div className="flex min-w-0 items-center gap-3">
        <StatusLed state={isHealthyStatus(status) ? "online" : "standby"} />
        <span className="truncate font-mono text-xs uppercase tracking-[0.12em] text-white">
          {label}
        </span>
      </div>
      <span className="text-right font-mono text-xs text-[#c2c6d8]">{value}</span>
    </div>
  );
}

function ArtifactCard({
  fileName,
  status,
  lastModified,
  rowCount,
}: {
  fileName: string;
  status: TelemetrySourceStatus;
  lastModified: string | null;
  rowCount: number;
}) {
  return (
    <article className="rounded-2xl border border-[#1f1f1f]/90 bg-[#050505]/58 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="truncate font-mono text-xs uppercase tracking-[0.12em] text-white">
            {fileName}
          </div>
          <div className="mt-2 font-mono text-[11px] text-[#8c90a1]">
            {rowCount} rows / {formatFreshness(lastModified)}
          </div>
        </div>
        <StatusLed state={isHealthyStatus(status) ? "online" : "standby"} />
      </div>
      <div className="mt-4 flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.12em]">
        <span className="rounded-lg border border-[#243042] bg-[#0e0e0e]/82 px-2 py-1 text-[#8c90a1]">
          {formatSourceStatus(status)}
        </span>
        <span className="text-[var(--accent-primary)]">
          {formatTimestamp(lastModified)}
        </span>
      </div>
    </article>
  );
}

function EventStream({ events }: { events: TelemetryEvent[] }) {
  if (events.length === 0) {
    return (
      <div className="rounded-2xl border border-[#243042] bg-[#050505]/76 p-6 text-center font-mono text-[11px] uppercase tracking-[0.12em] text-[#8c90a1]">
        No recent events available. Missing files remain visible in the health matrix.
      </div>
    );
  }

  return (
    <div className="grid gap-2">
      {events.slice(0, 18).map((event, index) => (
        <div
          className="grid grid-cols-[4px_78px_58px_1fr] gap-3 overflow-hidden rounded-xl border border-[#1f1f1f]/90 bg-[#050505]/78 pr-3 font-mono text-xs"
          key={`${event.timestamp}-${event.type}-${index}`}
        >
          <span className={`h-full ${severityRail(event.type)}`} />
          <span className="py-3 text-[#8c90a1]">{event.time}</span>
          <span className={`py-3 uppercase ${severityText(event.type)}`}>
            {event.type}
          </span>
          <span className="min-w-0 py-3">
            <span className="block truncate text-[#c2c6d8]">{event.message}</span>
            <span className="mt-1 block truncate text-[10px] uppercase tracking-[0.12em] text-[#6f7485]">
              {event.source}
              {event.symbol ? ` / ${event.symbol}` : ""}
              {event.status ? ` / ${event.status}` : ""}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

function isHealthyStatus(status: string) {
  return status === "LIVE_FILE" || status === "LIVE_FILE_EMPTY";
}

function formatSourceStatus(status: string) {
  return status
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (character) => character.toUpperCase());
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

function formatFreshness(timestamp: string | null | undefined) {
  if (!timestamp) return "missing";
  const ageMs = Date.now() - new Date(timestamp).getTime();
  if (!Number.isFinite(ageMs)) return "unknown";
  const minutes = Math.max(0, Math.floor(ageMs / 60000));
  if (minutes < 1) return "fresh";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 48) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function shortFileName(filePath: string) {
  return filePath.split(/[/\\]/).at(-1) ?? filePath;
}

function latestTimestamp(timestamps: Array<string | null | undefined>) {
  return (
    timestamps
      .filter((timestamp): timestamp is string => Boolean(timestamp))
      .sort((left, right) => new Date(right).getTime() - new Date(left).getTime())[0] ??
    null
  );
}

function severityRail(type: TelemetryEvent["type"]) {
  if (type === "error") return "bg-red-300/80";
  if (type === "alert" || type === "risk") return "bg-amber-300/80";
  if (type === "exec") return "bg-emerald-300/80";
  if (type === "alpha") return "bg-[var(--accent-primary)]/80";
  return "bg-[#8c90a1]/70";
}

function severityText(type: TelemetryEvent["type"]) {
  if (type === "error") return "text-red-300";
  if (type === "alert" || type === "risk") return "text-amber-200";
  if (type === "exec") return "text-emerald-300";
  if (type === "alpha") return "text-[var(--accent-primary)]";
  return "text-[#c2c6d8]";
}
