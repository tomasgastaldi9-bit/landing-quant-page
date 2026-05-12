export type ChartTone = "accent" | "good" | "risk" | "neutral" | "warning";

const toneStroke: Record<ChartTone, string> = {
  accent: "var(--accent-primary)",
  good: "rgb(110 231 183)",
  risk: "rgb(251 113 133)",
  neutral: "rgb(194 198 216)",
  warning: "rgb(253 230 138)",
};

const toneFill: Record<ChartTone, string> = {
  accent: "var(--accent-primary)",
  good: "rgb(110 231 183)",
  risk: "rgb(251 113 133)",
  neutral: "rgb(194 198 216)",
  warning: "rgb(253 230 138)",
};

export function TerminalChartFrame({
  children,
  className = "",
  footer,
  legend,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
  legend?: React.ReactNode;
  title?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-[#243042]/90 bg-[linear-gradient(rgba(255,255,255,0.032)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.032)_1px,transparent_1px),radial-gradient(circle_at_20%_0%,rgb(var(--accent-primary-rgb)/0.08),transparent_34%),linear-gradient(180deg,#101010,#050505)] bg-[size:28px_28px,28px_28px,auto,auto] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ${className}`}
    >
      {title || legend ? (
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.14em]">
          <div className="text-[#8c90a1]">{title}</div>
          <div className="flex flex-wrap gap-2 text-[#c2c6d8]">{legend}</div>
        </div>
      ) : null}
      {children}
      {footer ? <div className="mt-3">{footer}</div> : null}
    </div>
  );
}

export function Sparkline({
  values,
  ariaLabel = "Terminal sparkline",
  height = 88,
  tone = "accent",
  showArea = true,
  showLastMarker = true,
}: {
  values: number[];
  ariaLabel?: string;
  height?: number;
  tone?: ChartTone;
  showArea?: boolean;
  showLastMarker?: boolean;
}) {
  const chart = buildLineChart(values, 220, 72, 9);
  const areaPath = chart ? `${chart.line} L220 72 L0 72 Z` : "";
  const last = chart?.points.at(-1);
  const gradientId = `spark-${tone}-${values.join("-").replaceAll(".", "")}`;

  return (
    <TerminalChartFrame className="mt-4 p-3" title="rolling window">
      <svg
        aria-label={ariaLabel}
        className="w-full"
        role="img"
        style={{ height }}
        viewBox="0 0 220 82"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
            <stop stopColor={toneFill[tone]} stopOpacity="0.22" />
            <stop offset="1" stopColor={toneFill[tone]} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[18, 40, 62].map((y) => (
          <line
            key={y}
            stroke="#243042"
            strokeDasharray="4 9"
            strokeOpacity="0.72"
            strokeWidth="1"
            x1="0"
            x2="220"
            y1={y}
            y2={y}
          />
        ))}
        {chart ? (
          <>
            {showArea ? <path d={areaPath} fill={`url(#${gradientId})`} /> : null}
            <path
              d={chart.line}
              fill="none"
              stroke={toneStroke[tone]}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            />
            {showLastMarker && last ? (
              <>
                <circle
                  cx={last.x}
                  cy={last.y}
                  fill={toneFill[tone]}
                  fillOpacity="0.12"
                  r="8"
                  stroke={toneStroke[tone]}
                  strokeOpacity="0.34"
                />
                <circle cx={last.x} cy={last.y} fill={toneFill[tone]} r="3" />
              </>
            ) : null}
          </>
        ) : (
          <text fill="#8c90a1" fontFamily="monospace" fontSize="10" x="8" y="42">
            NO DATA
          </text>
        )}
      </svg>
    </TerminalChartFrame>
  );
}

export function RegimeScoreBar({
  label,
  note,
  score,
  tone = "accent",
}: {
  label: string;
  note: string;
  score: number;
  tone?: ChartTone;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3 font-mono text-xs uppercase tracking-[0.12em]">
        <span className="text-[#c2c6d8]">{label}</span>
        <span style={{ color: toneStroke[tone] }}>{score}/100</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full border border-[#243042] bg-[#050505]">
        <div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${toneStroke[tone]}, var(--accent-primary))`,
            width: `${score}%`,
          }}
        />
      </div>
      <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#8c90a1]">
        {note}
      </div>
    </div>
  );
}

export function MiniBarMeter({
  label,
  value,
  width,
  tone = "accent",
}: {
  label: string;
  value: string;
  width: string;
  tone?: ChartTone;
}) {
  return (
    <div>
      <div className="mb-2 flex justify-between font-mono text-xs">
        <span className="text-[#c2c6d8]">{label}</span>
        <span style={{ color: toneStroke[tone] }}>{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full border border-[#243042] bg-[#050505]">
        <div
          className="h-full rounded-full transition-[width] duration-500"
          style={{
            background: `linear-gradient(90deg, ${toneStroke[tone]}, var(--accent-primary))`,
            width,
          }}
        />
      </div>
    </div>
  );
}

export function TimelineProgress({
  currentIndex,
  stages,
}: {
  currentIndex: number;
  stages: string[];
}) {
  return (
    <div className="grid gap-3 lg:grid-cols-5">
      {stages.map((stage, index) => {
        const isComplete = index < currentIndex;
        const isCurrent = index === currentIndex;
        const tone = isCurrent ? "accent" : isComplete ? "good" : "neutral";

        return (
          <div
            className={`rounded-2xl border p-4 ${
              isCurrent
                ? "border-[var(--accent-primary)]/55 bg-[var(--accent-soft)]/62"
                : isComplete
                  ? "border-emerald-300/24 bg-emerald-300/[0.035]"
                  : "border-[#243042] bg-[#050505]/74"
            }`}
            key={stage}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#8c90a1]">
                Step {index + 1}
              </div>
              <span
                className="size-3 rounded-full shadow-[0_0_0_3px_rgba(255,255,255,0.04)]"
                style={{ backgroundColor: toneFill[tone] }}
              />
            </div>
            <div className="mt-4 min-h-12 text-sm font-semibold text-white">
              {stage}
            </div>
            <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--accent-primary)]">
              {isCurrent ? "Current gate" : isComplete ? "Completed" : "Pending"}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function buildLineChart(
  values: number[],
  width: number,
  height: number,
  padding: number,
) {
  if (values.length === 0) return null;

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const denominator = Math.max(values.length - 1, 1);
  const points = values.map((value, index) => {
    const x = (index / denominator) * width;
    const y = height - padding - ((value - min) / range) * (height - padding * 2);
    return {
      x: Number(x.toFixed(2)),
      y: Number(y.toFixed(2)),
    };
  });

  return {
    line: toSmoothPath(points),
    points,
  };
}

function toSmoothPath(points: Array<{ x: number; y: number }>) {
  if (points.length === 0) return "";
  if (points.length === 1) return `M${points[0].x},${points[0].y}`;

  return points.reduce((path, point, index) => {
    if (index === 0) return `M${point.x},${point.y}`;

    const previous = points[index - 1];
    const controlX = (previous.x + point.x) / 2;

    return `${path} C${controlX},${previous.y} ${controlX},${point.y} ${point.x},${point.y}`;
  }, "");
}
