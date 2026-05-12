export type CandidateStage =
  | "Research"
  | "Backtest"
  | "Walk-forward"
  | "Paper/Testnet"
  | "Deployment Candidate";

export type AlphaCandidate = {
  slug: string;
  name: string;
  family: string;
  category: string;
  status: string;
  stage: CandidateStage;
  readiness: string;
  stability: string;
  activity: string;
  regimeAlignment: string;
  objective: string;
  behavioralProfile: string;
  expectedRegimeBehavior: string;
  portfolioRole: string;
  deploymentNotes: string;
  validationMetrics: Array<{
    label: string;
    value: string;
    detail: string;
    tone: "neutral" | "good" | "warning" | "muted";
  }>;
  regimeCompatibility: Array<{
    label: "Low" | "Mid" | "High";
    score: number;
    note: string;
  }>;
  telemetry: Array<{
    label: string;
    value: string;
    detail: string;
    series: number[];
  }>;
};

export const pipelineStages: CandidateStage[] = [
  "Research",
  "Backtest",
  "Walk-forward",
  "Paper/Testnet",
  "Deployment Candidate",
];

export const alphaCandidates: AlphaCandidate[] = [
  {
    slug: "strategy-a",
    name: "Strategy A Baseline",
    family: "Baseline / Control",
    category: "Reference Strategy",
    status: "Reference",
    stage: "Walk-forward",
    readiness: "Medium",
    stability: "High",
    activity: "Control sleeve",
    regimeAlignment: "Broad control benchmark",
    objective:
      "Maintain a stable reference sleeve for comparing newer QuantBot research candidates against a consistent baseline.",
    behavioralProfile:
      "Designed as a conservative control profile with restrained turnover, stable signal cadence, and low sensitivity to short-lived noise.",
    expectedRegimeBehavior:
      "Expected to remain observable across low and mid dispersion environments while acting as a benchmark during higher dispersion review.",
    portfolioRole:
      "Research anchor used to evaluate whether newer sleeves add differentiated behavior before promotion into paper/testnet observation.",
    deploymentNotes:
      "No production deployment is implied. Candidate remains a research baseline for comparison, diagnostics, and review discipline.",
    validationMetrics: [
      { label: "Stability", value: "High", detail: "Low drift", tone: "good" },
      { label: "Turnover", value: "Low", detail: "Control cadence", tone: "good" },
      { label: "Activity", value: "Normal", detail: "Observed", tone: "muted" },
      { label: "Persistence", value: "Strong", detail: "Consistent", tone: "good" },
      { label: "Correlation", value: "0.28", detail: "Sleeve overlap", tone: "muted" },
      { label: "Sample Quality", value: "High", detail: "Review set", tone: "good" },
    ],
    regimeCompatibility: [
      { label: "Low", score: 74, note: "Stable benchmark behavior" },
      { label: "Mid", score: 68, note: "Useful control comparison" },
      { label: "High", score: 38, note: "Review only" },
    ],
    telemetry: [
      { label: "Activity Profile", value: "Balanced", detail: "No spike", series: [30, 42, 38, 44, 41, 48, 45] },
      { label: "Signal Density", value: "Low", detail: "Conservative", series: [22, 25, 24, 29, 27, 28, 30] },
      { label: "Validation Confidence", value: "High", detail: "Reference set", series: [58, 61, 65, 67, 70, 72, 74] },
      { label: "Rolling Stability", value: "High", detail: "Contained", series: [70, 72, 71, 74, 73, 76, 78] },
      { label: "Exposure Behavior", value: "Controlled", detail: "Low variance", series: [34, 36, 35, 38, 37, 39, 40] },
    ],
  },
  {
    slug: "strategy-g-3",
    name: "Strategy G 3.0",
    family: "Regime / Signal Stack",
    category: "Multi-alpha Candidate",
    status: "Review",
    stage: "Paper/Testnet",
    readiness: "Medium",
    stability: "Medium",
    activity: "Monitored",
    regimeAlignment: "Mid dispersion monitoring",
    objective:
      "Evaluate the third Strategy G iteration as a monitored regime-aware candidate before any deployment promotion.",
    behavioralProfile:
      "Moderate activity profile with regime-filtered signal expression and explicit review of turnover and persistence.",
    expectedRegimeBehavior:
      "Expected to express best in mid dispersion conditions while requiring tighter review during high dispersion transitions.",
    portfolioRole:
      "Candidate sleeve for testnet observation that can be compared against Strategy A Baseline and Strategy G 4.0.",
    deploymentNotes:
      "Remains research/testnet only. Promotion requires additional review of sample quality, correlation, and stability.",
    validationMetrics: [
      { label: "Stability", value: "Medium", detail: "Watch drift", tone: "muted" },
      { label: "Turnover", value: "Moderate", detail: "Within policy", tone: "muted" },
      { label: "Activity", value: "Active", detail: "Monitored", tone: "good" },
      { label: "Persistence", value: "Watch", detail: "Needs more samples", tone: "warning" },
      { label: "Correlation", value: "0.36", detail: "Acceptable", tone: "muted" },
      { label: "Sample Quality", value: "Medium", detail: "Growing set", tone: "muted" },
    ],
    regimeCompatibility: [
      { label: "Low", score: 48, note: "Reduced expression" },
      { label: "Mid", score: 76, note: "Primary review regime" },
      { label: "High", score: 42, note: "Transition watch" },
    ],
    telemetry: [
      { label: "Activity Profile", value: "Active", detail: "Regime filtered", series: [38, 46, 44, 52, 49, 55, 58] },
      { label: "Signal Density", value: "Moderate", detail: "Policy aligned", series: [36, 39, 42, 40, 47, 45, 48] },
      { label: "Validation Confidence", value: "Medium", detail: "Review active", series: [44, 47, 49, 52, 55, 57, 59] },
      { label: "Rolling Stability", value: "Watch", detail: "Mild drift", series: [60, 57, 59, 56, 61, 58, 62] },
      { label: "Exposure Behavior", value: "Moderate", detail: "Contained", series: [40, 45, 43, 50, 48, 52, 51] },
    ],
  },
  {
    slug: "strategy-g-4",
    name: "Strategy G 4.0",
    family: "Regime / Iteration",
    category: "Multi-alpha Candidate",
    status: "Active Research",
    stage: "Walk-forward",
    readiness: "Medium",
    stability: "Review",
    activity: "Candidate",
    regimeAlignment: "Mid dispersion candidate",
    objective:
      "Review the fourth Strategy G iteration for cleaner regime behavior, improved persistence, and lower overlap with existing sleeves.",
    behavioralProfile:
      "More selective than Strategy G 3.0, with tighter candidate gates and emphasis on stability under changing dispersion conditions.",
    expectedRegimeBehavior:
      "Expected to prioritize mid dispersion environments while reducing activity in ambiguous low-to-high transitions.",
    portfolioRole:
      "Potential successor or complement to Strategy G 3.0 pending walk-forward review and testnet observation.",
    deploymentNotes:
      "Candidate is not approved for live trading. Additional walk-forward and paper/testnet validation is required.",
    validationMetrics: [
      { label: "Stability", value: "Review", detail: "Improving", tone: "warning" },
      { label: "Turnover", value: "Moderate", detail: "Lower than G 3.0", tone: "muted" },
      { label: "Activity", value: "Selective", detail: "Candidate gates", tone: "good" },
      { label: "Persistence", value: "Medium", detail: "Under review", tone: "muted" },
      { label: "Correlation", value: "0.31", detail: "Reduced overlap", tone: "good" },
      { label: "Sample Quality", value: "Medium", detail: "Walk-forward", tone: "muted" },
    ],
    regimeCompatibility: [
      { label: "Low", score: 52, note: "Selective activation" },
      { label: "Mid", score: 82, note: "Primary candidate fit" },
      { label: "High", score: 36, note: "Reduced / observe" },
    ],
    telemetry: [
      { label: "Activity Profile", value: "Selective", detail: "Cleaner gates", series: [28, 35, 32, 45, 42, 48, 46] },
      { label: "Signal Density", value: "Moderate", detail: "Reduced noise", series: [30, 34, 33, 38, 39, 42, 43] },
      { label: "Validation Confidence", value: "Medium", detail: "Increasing", series: [42, 45, 50, 54, 57, 61, 64] },
      { label: "Rolling Stability", value: "Review", detail: "Candidate", series: [48, 50, 53, 55, 54, 58, 60] },
      { label: "Exposure Behavior", value: "Controlled", detail: "Lower overlap", series: [32, 36, 35, 39, 42, 43, 45] },
    ],
  },
  {
    slug: "low-dispersion-sleeve",
    name: "Low Dispersion Sleeve",
    family: "Dispersion Filter",
    category: "Regime Sleeve",
    status: "Active Research",
    stage: "Research",
    readiness: "Low",
    stability: "High",
    activity: "Low regime focus",
    regimeAlignment: "Low dispersion specialist",
    objective:
      "Isolate behavior designed for lower dispersion conditions and evaluate whether it adds useful context to the research stack.",
    behavioralProfile:
      "Lower activity, slower cadence, and more conservative signal expression intended for calmer market structure.",
    expectedRegimeBehavior:
      "Expected to fit low dispersion environments and reduce activation as dispersion expands toward mid or high regimes.",
    portfolioRole:
      "Specialist sleeve for regime segmentation and context, not a standalone live deployment module.",
    deploymentNotes:
      "Research-only. Requires broader review before any paper/testnet promotion.",
    validationMetrics: [
      { label: "Stability", value: "High", detail: "Calm regime", tone: "good" },
      { label: "Turnover", value: "Low", detail: "Slow cadence", tone: "good" },
      { label: "Activity", value: "Low", detail: "Selective", tone: "muted" },
      { label: "Persistence", value: "Medium", detail: "Needs breadth", tone: "muted" },
      { label: "Correlation", value: "0.24", detail: "Low overlap", tone: "good" },
      { label: "Sample Quality", value: "Watch", detail: "Regime limited", tone: "warning" },
    ],
    regimeCompatibility: [
      { label: "Low", score: 86, note: "Primary fit" },
      { label: "Mid", score: 46, note: "Transition watch" },
      { label: "High", score: 18, note: "Inactive / observe" },
    ],
    telemetry: [
      { label: "Activity Profile", value: "Low", detail: "Calm state", series: [18, 21, 20, 23, 24, 22, 25] },
      { label: "Signal Density", value: "Low", detail: "Filtered", series: [16, 18, 17, 20, 19, 21, 22] },
      { label: "Validation Confidence", value: "Watch", detail: "Needs samples", series: [34, 36, 39, 41, 42, 44, 45] },
      { label: "Rolling Stability", value: "High", detail: "Contained", series: [62, 65, 66, 68, 70, 69, 72] },
      { label: "Exposure Behavior", value: "Light", detail: "Low notional", series: [20, 22, 21, 24, 23, 25, 26] },
    ],
  },
  {
    slug: "mid-dispersion-sleeve",
    name: "Mid Dispersion Sleeve",
    family: "Dispersion Filter",
    category: "Regime Sleeve",
    status: "Review",
    stage: "Paper/Testnet",
    readiness: "Medium",
    stability: "Medium",
    activity: "Current regime focus",
    regimeAlignment: "Mid dispersion specialist",
    objective:
      "Track the sleeve most aligned with the current research regime and validate its behavior in testnet/paper observation.",
    behavioralProfile:
      "Moderate activity profile calibrated for mid dispersion environments with attention to turnover and stability.",
    expectedRegimeBehavior:
      "Expected to be most useful during mid dispersion and reduce confidence during high dispersion stress.",
    portfolioRole:
      "Regime sleeve used to evaluate whether current market structure supports candidate activation.",
    deploymentNotes:
      "Paper/testnet observation only. No live capital or production execution is connected.",
    validationMetrics: [
      { label: "Stability", value: "Medium", detail: "Watch drift", tone: "muted" },
      { label: "Turnover", value: "Moderate", detail: "Policy aligned", tone: "muted" },
      { label: "Activity", value: "Active", detail: "Current regime", tone: "good" },
      { label: "Persistence", value: "Medium", detail: "Observed", tone: "muted" },
      { label: "Correlation", value: "0.34", detail: "Acceptable", tone: "muted" },
      { label: "Sample Quality", value: "Medium", detail: "Testnet review", tone: "muted" },
    ],
    regimeCompatibility: [
      { label: "Low", score: 42, note: "Reduced expression" },
      { label: "Mid", score: 84, note: "Primary fit" },
      { label: "High", score: 40, note: "Stress review" },
    ],
    telemetry: [
      { label: "Activity Profile", value: "Active", detail: "Mid regime", series: [42, 48, 46, 52, 56, 54, 58] },
      { label: "Signal Density", value: "Moderate", detail: "Observed", series: [38, 42, 45, 43, 48, 50, 52] },
      { label: "Validation Confidence", value: "Medium", detail: "Paper/testnet", series: [48, 51, 53, 55, 58, 60, 62] },
      { label: "Rolling Stability", value: "Medium", detail: "Watch drift", series: [50, 52, 49, 54, 56, 55, 57] },
      { label: "Exposure Behavior", value: "Moderate", detail: "Policy aligned", series: [36, 40, 43, 42, 47, 49, 50] },
    ],
  },
];

export function getAlphaCandidate(slug: string) {
  return alphaCandidates.find((candidate) => candidate.slug === slug);
}
