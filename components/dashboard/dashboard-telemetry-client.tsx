"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import type { EquitySnapshot } from "@/lib/equity/types";
import type { PositionsSnapshot } from "@/lib/positions/types";
import type { TelemetryEvent, TelemetrySourceStatus } from "@/lib/telemetry/types";

type ApiSnapshot<T> = {
  status: TelemetrySourceStatus;
  data: T;
  fetchedAt?: string;
};

type EventApiResponse = {
  status: TelemetrySourceStatus;
  events: TelemetryEvent[];
  fetchedAt?: string;
};

type HealthApiResponse = {
  status: TelemetrySourceStatus;
  lastUpdated: string | null;
  fetchedAt?: string;
};

const REFRESH_INTERVAL_MS = 10_000;

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
  const [lastRefreshAt, setLastRefreshAt] = useState<string | null>(null);
  const [refreshState, setRefreshState] = useState<
    "idle" | "refreshing" | "unchanged" | "degraded"
  >("idle");
  const inFlightRef = useRef(false);
  const latestSignatureRef = useRef<string | null>(null);

  const loadTelemetry = useCallback(async () => {
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    setRefreshState("refreshing");

    try {
      const [equity, positions, orders, decisions, alerts, health] = await Promise.all([
        fetchJson<ApiSnapshot<EquitySnapshot>>(withRefreshToken("/api/equity")),
        fetchJson<ApiSnapshot<PositionsSnapshot>>(withRefreshToken("/api/positions")),
        fetchJson<EventApiResponse>(withRefreshToken("/api/orders")),
        fetchJson<EventApiResponse>(withRefreshToken("/api/decisions")),
        fetchJson<EventApiResponse>(withRefreshToken("/api/alerts")),
        fetchJson<HealthApiResponse>(withRefreshToken("/api/health")),
      ]);
      const mergedEvents = mergeEvents([orders.events, decisions.events, alerts.events]);
      const nextSignature = getTelemetrySignature({
        equity,
        positions,
        events: mergedEvents,
        health,
      });
      const dataUnchanged = latestSignatureRef.current === nextSignature;

      latestSignatureRef.current = nextSignature;
      setEquitySnapshot(equity.data);
      setPositionsSnapshot(positions.data);
      setEvents(mergedEvents);
      setEventStatus(deriveEventStatus([orders.status, decisions.status, alerts.status]));
      setHealthStatus(health.status);
      setHealthLastUpdated(health.lastUpdated);
      setLastRefreshAt(health.fetchedAt ?? equity.fetchedAt ?? new Date().toISOString());
      setRefreshState(dataUnchanged ? "unchanged" : "idle");
    } catch {
      setRefreshState("degraded");
    } finally {
      inFlightRef.current = false;
    }
  }, []);

  useEffect(() => {
    const initialRefresh = window.setTimeout(() => {
      void loadTelemetry();
    }, 0);

    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        void loadTelemetry();
      }
    }, REFRESH_INTERVAL_MS);

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        void loadTelemetry();
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.clearTimeout(initialRefresh);
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [loadTelemetry]);

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
      lastRefreshAt={lastRefreshAt}
      positionsSnapshot={positionsSnapshot}
      refreshIntervalSeconds={REFRESH_INTERVAL_MS / 1000}
      refreshState={refreshState}
      telemetryEvents={events}
    />
  );
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error(`Request failed for ${url}`);
  return response.json() as Promise<T>;
}

function withRefreshToken(url: string) {
  return `${url}?refresh=${Date.now()}`;
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

function getTelemetrySignature({
  equity,
  positions,
  events,
  health,
}: {
  equity: ApiSnapshot<EquitySnapshot>;
  positions: ApiSnapshot<PositionsSnapshot>;
  events: TelemetryEvent[];
  health: HealthApiResponse;
}) {
  const latestEvent = events[0];

  return JSON.stringify({
    equityStatus: equity.status,
    equityLastUpdate: equity.data.lastUpdate,
    equityCurrent: equity.data.currentEquity,
    positionsStatus: positions.status,
    positionsLastUpdate: positions.data.lastUpdate,
    positionCount: positions.data.positions.length,
    latestEvent: latestEvent
      ? `${latestEvent.timestamp}-${latestEvent.type}-${latestEvent.status ?? ""}`
      : "none",
    healthStatus: health.status,
    healthLastUpdated: health.lastUpdated,
  });
}

function deriveEventStatus(statuses: TelemetrySourceStatus[]) {
  if (statuses.some((status) => status === "LIVE_FILE")) return "LIVE_FILE";
  if (statuses.some((status) => status === "PARSE_ERROR")) return "PARSE_ERROR";
  if (statuses.some((status) => status === "MOCK_FALLBACK")) return "MOCK_FALLBACK";
  return "MISSING_FILE";
}
