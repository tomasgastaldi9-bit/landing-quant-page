"use client";

import { useEffect, useMemo, useState } from "react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import type { EquitySnapshot } from "@/lib/equity/types";
import type { PositionsSnapshot } from "@/lib/positions/types";
import type { TelemetryEvent, TelemetrySourceStatus } from "@/lib/telemetry/types";

type ApiSnapshot<T> = {
  status: TelemetrySourceStatus;
  data: T;
};

type EventApiResponse = {
  status: TelemetrySourceStatus;
  events: TelemetryEvent[];
};

type HealthApiResponse = {
  status: TelemetrySourceStatus;
  lastUpdated: string | null;
};

export function DashboardTelemetryClient({
  initialEquitySnapshot,
  initialPositionsSnapshot,
}: {
  initialEquitySnapshot: EquitySnapshot;
  initialPositionsSnapshot: PositionsSnapshot;
}) {
  const [equitySnapshot, setEquitySnapshot] = useState(initialEquitySnapshot);
  const [positionsSnapshot, setPositionsSnapshot] = useState(initialPositionsSnapshot);
  const [events, setEvents] = useState<TelemetryEvent[]>([]);
  const [eventStatus, setEventStatus] = useState<TelemetrySourceStatus>("MOCK_FALLBACK");
  const [healthStatus, setHealthStatus] = useState<TelemetrySourceStatus | null>(null);
  const [healthLastUpdated, setHealthLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadTelemetry() {
      try {
        const [equity, positions, orders, decisions, alerts, health] = await Promise.all([
          fetchJson<ApiSnapshot<EquitySnapshot>>("/api/equity"),
          fetchJson<ApiSnapshot<PositionsSnapshot>>("/api/positions"),
          fetchJson<EventApiResponse>("/api/orders"),
          fetchJson<EventApiResponse>("/api/decisions"),
          fetchJson<EventApiResponse>("/api/alerts"),
          fetchJson<HealthApiResponse>("/api/health"),
        ]);

        if (cancelled) return;

        setEquitySnapshot(equity.data);
        setPositionsSnapshot(positions.data);
        setEvents(mergeEvents([orders.events, decisions.events, alerts.events]));
        setEventStatus(deriveEventStatus([orders.status, decisions.status, alerts.status]));
        setHealthStatus(health.status);
        setHealthLastUpdated(health.lastUpdated);
      } catch {
        if (!cancelled) {
          setEventStatus("MOCK_FALLBACK");
        }
      }
    }

    void loadTelemetry();

    return () => {
      cancelled = true;
    };
  }, []);

  const apiLastUpdated = useMemo(
    () => healthLastUpdated ?? equitySnapshot.fileLastModified ?? equitySnapshot.lastUpdate,
    [equitySnapshot.fileLastModified, equitySnapshot.lastUpdate, healthLastUpdated],
  );

  return (
    <DashboardShell
      apiLastUpdated={apiLastUpdated}
      equitySnapshot={equitySnapshot}
      eventSourceStatus={eventStatus}
      healthSourceStatus={healthStatus}
      positionsSnapshot={positionsSnapshot}
      telemetryEvents={events}
    />
  );
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error(`Request failed for ${url}`);
  return response.json() as Promise<T>;
}

function mergeEvents(eventGroups: TelemetryEvent[][]) {
  return eventGroups
    .flat()
    .filter((event) => event.timestamp)
    .sort(
      (left, right) =>
        new Date(right.timestamp).getTime() - new Date(left.timestamp).getTime(),
    )
    .slice(0, 30);
}

function deriveEventStatus(statuses: TelemetrySourceStatus[]) {
  if (statuses.some((status) => status === "LIVE_FILE")) return "LIVE_FILE";
  if (statuses.some((status) => status === "PARSE_ERROR")) return "PARSE_ERROR";
  if (statuses.some((status) => status === "MOCK_FALLBACK")) return "MOCK_FALLBACK";
  return "MISSING_FILE";
}
