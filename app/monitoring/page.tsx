import { InstitutionalExplainer } from "@/components/explainers/institutional-explainer";

export default function MonitoringPage() {
  return (
    <InstitutionalExplainer
      badges={["Observability", "Terminal", "Logs", "Health"]}
      eyebrow="Operations"
      title="Monitoring"
      description="A terminal-style observability layer for equity, positions, logs, alerts, scheduler state, and system health in demo or testnet workflows."
      scope={[
        ["Equity", "Observed"],
        ["Positions", "Read-only"],
        ["Logs", "Auditable"],
        ["Health", "Visible"],
      ]}
      sections={[
        {
          eyebrow: "Terminal Data",
          title: "Operational surfaces in one view",
          body: "Monitoring pages are designed to make the system easier to inspect without adding trading authority or backend complexity.",
          cards: [
            {
              title: "Equity",
              body: "Equity views can show live testnet CSV output when available and fall back to mock data when unavailable.",
              meta: "Curve",
            },
            {
              title: "Positions",
              body: "Position tables surface symbol, side, size, entry, mark, unrealized PnL, and update timing when present.",
              meta: "Exposure",
            },
            {
              title: "Logs",
              body: "Execution, risk, alpha, and system events provide a compact audit trail for terminal review.",
              meta: "Audit",
            },
          ],
        },
        {
          eyebrow: "Health",
          title: "Status and alert context",
          cards: [
            {
              title: "Alerts",
              body: "Alert states can make drift, policy, or system anomalies easier to identify during testing.",
            },
            {
              title: "Scheduler",
              body: "Scheduler and system health indicators help distinguish strategy behavior from infrastructure state.",
            },
            {
              title: "Dashboard Observability",
              body: "The dashboard stays read-only and focused on product demonstration rather than live operation.",
            },
          ],
        },
      ]}
    />
  );
}
