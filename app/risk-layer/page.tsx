import { InstitutionalExplainer } from "@/components/explainers/institutional-explainer";

export default function RiskLayerPage() {
  return (
    <InstitutionalExplainer
      badges={["Risk Controls", "Execution Safety", "Read-only", "Research"]}
      eyebrow="Safety Layer"
      title="Risk Layer"
      description="A controlled risk and execution safety layer for observing position sizing, exposure limits, notional safeguards, and order policy behavior."
      scope={[
        ["Sizing", "Policy based"],
        ["Exposure", "Controlled"],
        ["Orders", "Safeguarded"],
        ["Access", "Read-only"],
      ]}
      sections={[
        {
          eyebrow: "Controls",
          title: "Risk checks before execution behavior",
          body: "The risk layer is presented as an observability and policy surface, not as a promise that losses can be prevented.",
          cards: [
            {
              title: "Position Sizing",
              body: "Sizing logic can be monitored against portfolio context, exposure limits, and configured policy boundaries.",
              meta: "Sizing",
            },
            {
              title: "Exposure Controls",
              body: "Gross, net, and venue exposure states are tracked to help operators understand concentration and drift.",
              meta: "Exposure",
            },
            {
              title: "Notional Safeguards",
              body: "Minimum order and notional checks reduce invalid or unintended demo/testnet execution behavior.",
              meta: "Orders",
            },
          ],
        },
        {
          eyebrow: "Execution Safety",
          title: "Guardrails for controlled environments",
          cards: [
            {
              title: "Reduce-only Logic",
              body: "Reduce-only behavior can be surfaced for situations where the system should decrease exposure rather than add risk.",
            },
            {
              title: "Policy State",
              body: "Risk status is designed to be visible in the terminal so decisions can be reviewed before operational changes.",
            },
            {
              title: "Testnet First",
              body: "The current frontend presents demo/testnet observability without enabling live trading access.",
            },
          ],
        },
      ]}
    />
  );
}
