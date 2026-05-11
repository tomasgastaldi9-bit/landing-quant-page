import { InstitutionalExplainer } from "@/components/explainers/institutional-explainer";

export default function MethodologyPage() {
  return (
    <InstitutionalExplainer
      badges={["Research-first", "Backtesting", "Walk-forward", "Demo Validation"]}
      eyebrow="Process"
      title="Methodology"
      description="A disciplined research workflow for moving from hypothesis to backtest, walk-forward validation, paper/demo observation, and deployment review."
      scope={[
        ["Workflow", "Research-first"],
        ["Validation", "Walk-forward"],
        ["Capital", "No real capital"],
        ["Claims", "No guarantees"],
      ]}
      sections={[
        {
          eyebrow: "Research Workflow",
          title: "Structured validation before deployment",
          body: "The methodology emphasizes disciplined review and staged observation rather than aggressive performance claims.",
          cards: [
            {
              title: "Backtesting",
              body: "Historical testing is treated as a research input that requires assumptions, costs, and failure modes to be reviewed.",
              meta: "History",
            },
            {
              title: "Walk-forward",
              body: "Out-of-sample and walk-forward validation help evaluate whether behavior remains coherent across changing markets.",
              meta: "Validation",
            },
            {
              title: "Paper / Demo",
              body: "Paper or testnet validation lets execution, logs, monitoring, and risk controls be observed before live workflows.",
              meta: "Demo",
            },
          ],
        },
        {
          eyebrow: "Discipline",
          title: "Operational review gates",
          cards: [
            {
              title: "Research Notes",
              body: "Signal assumptions and operational observations should be documented before promoting any strategy state.",
            },
            {
              title: "Risk Review",
              body: "Sizing, exposure, and reduce-only behavior should be inspected alongside alpha behavior.",
            },
            {
              title: "Deployment Discipline",
              body: "The frontend supports education and monitoring; it does not provide live trading access or investment advice.",
            },
          ],
        },
      ]}
    />
  );
}
