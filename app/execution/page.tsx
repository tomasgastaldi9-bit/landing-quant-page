import Link from "next/link";

import {
  MetricTile,
  StatusBadge,
  StatusLed,
  TerminalPanel,
} from "@/components/dashboard/terminal-ui";
import {
  getAlertsTelemetry,
  getDecisionsTelemetry,
  getOrdersTelemetry,
} from "@/lib/telemetry/events";
import { getHealthTelemetry } from "@/lib/telemetry/health";
import type {
  TelemetryEvent,
  TelemetryFileRead,
  TelemetrySourceStatus,
} from "@/lib/telemetry/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type OrderClass =
  | "planned"
  | "submitted"
  | "executed"
  | "blocked"
  | "unknown";

const guardrails = [
  "Frontend is read-only.",
  "No orders can be placed from this UI.",
  "Execution remains inside the Python bot.",
  "Demo/testnet execution may differ from real exchange execution.",
  "Risk controls reduce operational errors but do not guarantee loss prevention.",
];

export default async function ExecutionPage() {
  const [orders, decisions, alerts, health] = await Promise.all([
    getOrdersTelemetry(80),
    getDecisionsTelemetry(80),
    getAlertsTelemetry(80),
    getHealthTelemetry(),
  ]);

  const orderEvents = orders.events
    .filter((event) => event.timestamp)
    .sort(sortNewestFirst);
  const latestOrder = orderEvents[0];
  const lastCycleTimestamp =
    latestTimestamp([
      decisions.source.lastModified,
      orders.source.lastModified,
      health.lastUpdated,
    ]) ?? null;
  const riskEvents = [...decisions.events, ...alerts.events]
    .filter(isRiskOrSafetyEvent)
    .sort(sortNewestFirst)
    .slice(0, 10);
  const executedCount = orderEvents.filter(
    (event) => classifyOrderStatus(event.status, event.message) === "executed",
  ).length;
  const submittedCount = orderEvents.filter(
    (event) => classifyOrderStatus(event.status, event.message) === "submitted",
  ).length;
  const blockedCount = orderEvents.filter(
    (event) => classifyOrderStatus(event.status, event.message) === "blocked",
  ).length;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] bg-[linear-gradient(rgba(255,255,255,0.026)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.026)_1px,transparent_1px)] bg-[size:32px_32px] px-4 pb-16 pt-28 text-[#e2e2e2] sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6">
        <section className="overflow-hidden rounded-[30px] border border-[#243042] bg-[radial-gradient(circle_at_18%_0%,rgb(var(--accent-primary-rgb)/0.08),transparent_30%),linear-gradient(180deg,rgba(14,14,14,0.94),rgba(5,5,5,0.84))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_14px_38px_rgba(0,0,0,0.2)] sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap gap-2">
                <StatusBadge tone="accent">Operator</StatusBadge>
                <StatusBadge>Read Only</StatusBadge>
                <StatusBadge>Demo / Testnet</StatusBadge>
                <StatusBadge>No UI Order Access</StatusBadge>
              </div>
              <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                Execution
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#c2c6d8]">
                Read-only operator view of demo/testnet execution lifecycle,
                order artifacts, and safety state. This page observes existing
                bot outputs; it cannot place, cancel, or modify orders.
              </p>
            </div>
            <div className="rounded-2xl border border-[#1f1f1f]/90 bg-[#050505]/72 p-4 font-mono text-xs uppercase tracking-[0.12em] text-[#8c90a1]">
              <div className="flex items-center gap-3 text-[var(--accent-primary)]">
                <StatusLed state={isHealthyStatus(orders.status) ? "online" : "standby"} />
                {formatSourceStatus(orders.status)}
              </div>
              <div className="mt-3">Orders source: {orders.source.fileName}</div>
              <div className="mt-2">Last update: {formatTimestamp(orders.source.lastModified)}</div>
            </div>
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
          <MetricTile
            compact
            detail="Frontend state"
            label="UI Execution"
            tone="muted"
            value="Disabled"
          />
          <MetricTile
            compact
            detail="Frontend action"
            label="Order Placement"
            tone="muted"
            value="Not Available"
          />
          <MetricTile compact detail="Client bundle" label="API Keys" tone="muted" value="Not Present" />
          <MetricTile
            compact
            detail="Artifact rows"
            label="Order Events"
            tone={orderEvents.length > 0 ? "good" : "muted"}
            value={String(orderEvents.length)}
          />
          <MetricTile compact detail="Confirmed final states" label="Executed" tone={executedCount > 0 ? "good" : "muted"} value={String(executedCount)} />
          <MetricTile compact detail="Not final fill" label="Submitted" tone={submittedCount > 0 ? "warning" : "muted"} value={String(submittedCount)} />
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <TerminalPanel
            action="No Mutation"
            eyebrow="Status"
            priority="primary"
            title="Execution Status"
          >
            <div className="grid gap-3">
              <StatusRow label="Execution venue / mode" value={deriveVenueMode(orderEvents, decisions.events)} status={orders.status} />
              <StatusRow label="UI execution access" value="Disabled" status="LIVE_FILE" />
              <StatusRow label="Order placement from frontend" value="Not available" status="LIVE_FILE" />
              <StatusRow label="API keys in frontend" value="Not present" status="LIVE_FILE" />
              <StatusRow label="Data freshness" value={formatFreshness(orders.source.lastModified)} status={orders.status} />
            </div>
          </TerminalPanel>

          <TerminalPanel action="Cycle" eyebrow="Runtime" title="Last Cycle">
            <div className="grid gap-3">
              <StatusRow
                label="Last cycle timestamp"
                status={decisions.status}
                value={formatTimestamp(lastCycleTimestamp)}
              />
              <StatusRow
                label="Cycle status"
                status={decisions.status}
                value={deriveCycleStatus(decisions.events, decisions.status)}
              />
              <StatusRow
                label="Orders artifact"
                status={orders.status}
                value={sourceSummary(orders.source)}
              />
              <StatusRow
                label="Health aggregate"
                status={health.status as TelemetrySourceStatus}
                value={formatSourceStatus(health.status)}
              />
            </div>
          </TerminalPanel>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <TerminalPanel
            action={formatSourceStatus(orders.status)}
            eyebrow="Orders"
            priority="primary"
            title="Order Lifecycle"
          >
            <OrderLifecycle
              blockedCount={blockedCount}
              events={orderEvents}
              latestOrder={latestOrder}
              source={orders.source}
            />
          </TerminalPanel>

          <TerminalPanel
            action={formatSourceStatus(decisions.status)}
            eyebrow="Safety"
            title="Risk / Safety Checks"
          >
            <RiskSafetyEvents
              alertsSource={alerts.source}
              decisionsSource={decisions.source}
              events={riskEvents}
            />
          </TerminalPanel>
        </section>

        <TerminalPanel
          action="Read-only"
          eyebrow="Guardrails"
          title="Execution Guardrails"
        >
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            {guardrails.map((guardrail) => (
              <div
                className="rounded-2xl border border-[#1f1f1f]/90 bg-[#050505]/58 p-4 text-sm leading-6 text-[#c2c6d8]"
                key={guardrail}
              >
                <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--accent-primary)]">
                  <StatusLed state="standby" />
                  Guardrail
                </div>
                {guardrail}
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              className="inline-flex rounded-2xl border border-[var(--accent-primary)]/45 bg-[var(--accent-soft)] px-5 py-3 font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent-primary)] transition hover:border-[var(--accent-primary)]"
              href="/monitoring"
            >
              Inspect Monitoring
            </Link>
            <Link
              className="inline-flex rounded-2xl border border-[#243042] bg-[#050505]/72 px-5 py-3 font-mono text-xs uppercase tracking-[0.14em] text-[#c2c6d8] transition hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
              href="/demo-testnet"
            >
              Demo/Testnet Scope
            </Link>
          </div>
        </TerminalPanel>
      </div>
    </main>
  );
}

function OrderLifecycle({
  blockedCount,
  events,
  latestOrder,
  source,
}: {
  blockedCount: number;
  events: TelemetryEvent[];
  latestOrder: TelemetryEvent | undefined;
  source: TelemetryFileRead;
}) {
  if (events.length === 0) {
    return (
      <EmptyState
        detail={`${source.fileName} is ${formatSourceStatus(source.status)}. No synthetic order lifecycle rows are shown.`}
        title="No order events available from connected artifacts"
      />
    );
  }

  return (
    <div className="grid gap-4">
      <div className="rounded-2xl border border-[var(--accent-border)] bg-[var(--accent-soft)]/60 p-4">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent-primary)]">
          Latest order event
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <div className="text-lg font-semibold text-white">
              {latestOrder?.symbol ?? "Instrument unavailable"}
            </div>
            <p className="mt-2 text-sm leading-6 text-[#c2c6d8]">
              {latestOrder?.message ?? "Latest order message unavailable."}
            </p>
          </div>
          <OrderStatusBadge
            status={classifyOrderStatus(latestOrder?.status, latestOrder?.message)}
          />
        </div>
      </div>
      {blockedCount > 0 ? (
        <div className="rounded-2xl border border-red-300/24 bg-red-950/10 p-4 text-sm leading-6 text-[#d7dceb]">
          {blockedCount} rejected or blocked order event{blockedCount === 1 ? "" : "s"} found in
          the connected order artifact.
        </div>
      ) : null}
      <div className="overflow-x-auto rounded-2xl border border-[#1f1f1f] bg-[#050505]/62">
        <table className="w-full min-w-[760px] border-collapse font-mono text-xs">
          <thead>
            <tr className="border-b border-[#243042] bg-[#0e0e0e]/58 text-left uppercase tracking-[0.12em] text-[#8c90a1]">
              <th className="px-3 py-3 font-medium">Timestamp</th>
              <th className="px-3 py-3 font-medium">Symbol</th>
              <th className="px-3 py-3 font-medium">Classification</th>
              <th className="px-3 py-3 font-medium">Status</th>
              <th className="px-3 py-3 font-medium">Source</th>
              <th className="px-3 py-3 font-medium">Message</th>
            </tr>
          </thead>
          <tbody>
            {events.slice(0, 24).map((event, index) => (
              <tr
                className="border-b border-[#1f1f1f] text-[#c2c6d8] transition-colors hover:bg-[#101820]"
                key={`${event.timestamp}-${event.type}-${index}`}
              >
                <td className="px-3 py-3 text-[#8c90a1]">{formatTimestamp(event.timestamp)}</td>
                <td className="px-3 py-3 text-white">{event.symbol ?? "Unavailable"}</td>
                <td className="px-3 py-3">
                  <OrderStatusBadge status={classifyOrderStatus(event.status, event.message)} />
                </td>
                <td className="px-3 py-3">{event.status || "Unavailable"}</td>
                <td className="px-3 py-3 text-[var(--accent-primary)]">{event.source}</td>
                <td className="max-w-[320px] truncate px-3 py-3">{event.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#6f7485]">
        Submitted means sent/submitted by artifact status, not confirmed filled execution.
      </p>
    </div>
  );
}

function RiskSafetyEvents({
  alertsSource,
  decisionsSource,
  events,
}: {
  alertsSource: TelemetryFileRead;
  decisionsSource: TelemetryFileRead;
  events: TelemetryEvent[];
}) {
  if (events.length === 0) {
    const unavailable =
      alertsSource.status === "MISSING_FILE" && decisionsSource.status === "MISSING_FILE";

    return (
      <EmptyState
        detail={
          unavailable
            ? "Decision and alert artifacts are unavailable, so no risk/safety events can be confirmed."
            : "Connected artifacts did not include recent risk blocks, rejected events, or safety notes."
        }
        title={
          unavailable
            ? "Risk artifact unavailable"
            : "No recent risk blocks found in connected artifacts"
        }
      />
    );
  }

  return (
    <div className="grid gap-2">
      {events.map((event, index) => (
        <div
          className="grid grid-cols-[4px_76px_1fr] gap-3 overflow-hidden rounded-xl border border-[#1f1f1f]/90 bg-[#050505]/78 pr-3 font-mono text-xs"
          key={`${event.timestamp}-${event.type}-${index}`}
        >
          <span className={event.type === "error" ? "bg-red-300/80" : "bg-[var(--accent-primary)]/70"} />
          <span className="py-3 text-[#8c90a1]">{event.time}</span>
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

function StatusRow({
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

function OrderStatusBadge({ status }: { status: OrderClass }) {
  const className =
    status === "executed"
      ? "border-emerald-300/28 bg-emerald-300/10 text-emerald-200"
      : status === "submitted"
        ? "border-[var(--accent-border)] bg-[var(--accent-soft)] text-[var(--accent-primary)]"
        : status === "blocked"
          ? "border-red-300/28 bg-red-950/12 text-red-200"
          : status === "planned"
            ? "border-[#243042] bg-[#0e0e0e]/82 text-[#c2c6d8]"
            : "border-[#243042] bg-[#050505]/76 text-[#8c90a1]";
  const label =
    status === "executed"
      ? "Filled / Executed"
      : status === "submitted"
        ? "Submitted / Pending"
        : status === "blocked"
          ? "Rejected / Blocked"
          : status === "planned"
            ? "Planned"
            : "Unknown";

  return (
    <span
      className={`inline-flex rounded-xl border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] ${className}`}
    >
      {label}
    </span>
  );
}

function EmptyState({ detail, title }: { detail: string; title: string }) {
  return (
    <div className="rounded-2xl border border-[#243042] bg-[#050505]/76 p-6">
      <div className="flex items-start gap-4">
        <StatusLed state="standby" />
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.16em] text-white">
            {title}
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#8c90a1]">{detail}</p>
        </div>
      </div>
    </div>
  );
}

function classifyOrderStatus(status: string | undefined, message = ""): OrderClass {
  const normalized = `${status ?? ""} ${message}`.toLowerCase();

  if (
    /\b(filled|executed|closed|success|succeeded|complete|completed)\b/.test(normalized)
  ) {
    return "executed";
  }

  if (/\b(reject|rejected|blocked|failed|error|denied|cancelled|canceled)\b/.test(normalized)) {
    return "blocked";
  }

  if (/\b(submitted|submit|pending|open|accepted|sent|placed)\b/.test(normalized)) {
    return "submitted";
  }

  if (/\b(planned|plan|decision|signal|candidate)\b/.test(normalized)) {
    return "planned";
  }

  return "unknown";
}

function deriveCycleStatus(events: TelemetryEvent[], status: TelemetrySourceStatus) {
  if (!isHealthyStatus(status)) return formatSourceStatus(status);
  const latest = events.filter((event) => event.timestamp).sort(sortNewestFirst)[0];
  return latest?.status || "Artifact observed";
}

function deriveVenueMode(orders: TelemetryEvent[], decisions: TelemetryEvent[]) {
  const source = [...orders, ...decisions]
    .map((event) => event.source)
    .find((value) => value && value !== "orders" && value !== "decisions");

  return source || "Demo/testnet artifacts";
}

function isRiskOrSafetyEvent(event: TelemetryEvent) {
  const text = `${event.type} ${event.status ?? ""} ${event.message}`.toLowerCase();

  return [
    "risk",
    "alert",
    "error",
    "blocked",
    "reject",
    "reduce",
    "min_notional",
    "notional",
    "exposure",
    "margin",
    "leverage",
    "filter",
  ].some((term) => text.includes(term));
}

function sourceSummary(source: TelemetryFileRead) {
  return `${source.fileName} / ${formatSourceStatus(source.status)} / ${source.rowCount} rows`;
}

function latestTimestamp(timestamps: Array<string | null | undefined>) {
  return (
    timestamps
      .filter((timestamp): timestamp is string => Boolean(timestamp))
      .sort((left, right) => new Date(right).getTime() - new Date(left).getTime())[0] ??
    null
  );
}

function sortNewestFirst(left: TelemetryEvent, right: TelemetryEvent) {
  return new Date(right.timestamp).getTime() - new Date(left.timestamp).getTime();
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
