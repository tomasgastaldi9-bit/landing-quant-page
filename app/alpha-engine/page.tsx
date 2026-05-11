import { InstitutionalExplainer } from "@/components/explainers/institutional-explainer";

export default function AlphaEnginePage() {
  return (
    <InstitutionalExplainer
      badges={["Multi-Alpha", "Research", "Regime Aware", "No Guarantees"]}
      eyebrow="Research System"
      title="Alpha Engine"
      description="A research-first multi-alpha architecture for organizing signals, sleeves, regimes, and validation workflows before any production deployment."
      scope={[
        ["Mode", "Research"],
        ["Signals", "Multi-sleeve"],
        ["Regimes", "Observed"],
        ["Capital", "No guarantee"],
      ]}
      sections={[
        {
          eyebrow: "Architecture",
          title: "Multi-alpha research structure",
          body: "The engine is designed to keep signal families observable, modular, and reviewable inside a controlled demo environment.",
          cards: [
            {
              title: "Sleeves",
              body: "Separate signal sleeves allow trend, mean reversion, volatility, and filter logic to be evaluated independently.",
              meta: "Research",
            },
            {
              title: "Regimes",
              body: "Regime context helps organize when signals should be active, reduced, or observed without implying future returns.",
              meta: "Context",
            },
            {
              title: "Pipeline",
              body: "Research outputs can be staged through review, paper validation, and terminal monitoring before deployment decisions.",
              meta: "Workflow",
            },
          ],
        },
        {
          eyebrow: "Validation",
          title: "From hypothesis to monitored behavior",
          cards: [
            {
              title: "Signal Review",
              body: "Candidate alphas are inspected for stability, correlation, and operational fit before being considered further.",
            },
            {
              title: "Demo Observation",
              body: "The terminal can display mock or testnet behavior to evaluate how research decisions appear operationally.",
            },
            {
              title: "No Performance Claims",
              body: "Displayed research states are informational and do not guarantee profitability or execution quality.",
            },
          ],
        },
      ]}
    />
  );
}
