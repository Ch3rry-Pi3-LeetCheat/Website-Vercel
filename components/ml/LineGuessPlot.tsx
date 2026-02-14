import { useId } from "react";

type DataPoint = Record<string, number>;

type LineGuessPlotProps = {
  data: DataPoint[];
  xKey: string;
  yKey: string;
  yScale?: number;
  candidateBLine?: {
    intercept: number;
    slope: number;
  };
};

const CHART_WIDTH = 640;
const CHART_HEIGHT = 360;
const PADDING = { top: 24, right: 24, bottom: 48, left: 64 };

export default function LineGuessPlot({
  data,
  xKey,
  yKey,
  yScale = 1000,
  candidateBLine,
}: LineGuessPlotProps) {
  const clipId = useId();
  const points = data.map((row) => ({
    x: row[xKey],
    y: row[yKey] / yScale,
  }));

  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const maxX = Math.max(...xs);
  const maxY = Math.max(...ys);

  const xTickStart = 50;
  const xTickStep = 25;
  const yTickStart = 200;
  const yTickStep = 50;

  const xTickEnd =
    xTickStart + Math.ceil((maxX - xTickStart) / xTickStep) * xTickStep;
  const yTickEnd =
    yTickStart + Math.ceil((maxY - yTickStart) / yTickStep) * yTickStep;

  const bounds = {
    minX: xTickStart,
    maxX: xTickEnd,
    minY: yTickStart,
    maxY: yTickEnd,
  };

  const plotWidth = CHART_WIDTH - PADDING.left - PADDING.right;
  const plotHeight = CHART_HEIGHT - PADDING.top - PADDING.bottom;

  const xToSvg = (x: number) =>
    PADDING.left + ((x - bounds.minX) / (bounds.maxX - bounds.minX)) * plotWidth;
  const yToSvg = (y: number) =>
    PADDING.top + plotHeight - ((y - bounds.minY) / (bounds.maxY - bounds.minY)) * plotHeight;

  const meanX = xs.reduce((acc, val) => acc + val, 0) / xs.length;
  const meanY = ys.reduce((acc, val) => acc + val, 0) / ys.length;
  const fittedSlope =
    xs.reduce((acc, x, idx) => acc + (x - meanX) * (ys[idx] - meanY), 0) /
    xs.reduce((acc, x) => acc + (x - meanX) ** 2, 0);
  const fittedIntercept = meanY - fittedSlope * meanX;
  const slope = candidateBLine?.slope ?? fittedSlope;
  const intercept = candidateBLine?.intercept ?? fittedIntercept;

  const nearlyFlatSlope = 0.1;
  const negativeSlope = -0.7;
  const guessLines = [
    { intercept: intercept + 35, slope: slope - 0.9 },
    { intercept: intercept - 30, slope: slope + 0.8 },
    { intercept: intercept + 18, slope: slope + 0.2 },
    { intercept: intercept - 18, slope: slope - 0.2 },
    { intercept: bounds.minY + 20, slope: nearlyFlatSlope },
    { intercept: bounds.maxY - 10, slope: negativeSlope },
  ];
  const workedExampleLine = {
    intercept: 50,
    slope: 2,
  };

  const xTickCount = Math.floor((xTickEnd - xTickStart) / xTickStep) + 1;
  const xTicks = Array.from({ length: xTickCount }, (_, i) => {
    const raw = xTickStart + i * xTickStep;
    return { raw, x: xToSvg(raw) };
  });

  const yTickCount = Math.floor((yTickEnd - yTickStart) / yTickStep) + 1;
  const yTicks = Array.from({ length: yTickCount }, (_, i) => {
    const raw = yTickStart + i * yTickStep;
    return { raw, y: yToSvg(raw) };
  });

  const lineY = (x: number, b0: number, b1: number) => b0 + b1 * x;

  return (
    <div className="glass-panel rounded-2xl p-4 md:p-6">
      <div className="w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
          className="h-auto w-full"
          role="img"
          aria-label="Scatter plot of floor area versus price with multiple candidate lines"
        >
          <defs>
            <clipPath id={clipId}>
              <rect
                x={PADDING.left}
                y={PADDING.top}
                width={plotWidth}
                height={plotHeight}
              />
            </clipPath>
          </defs>
          <rect
            x={PADDING.left}
            y={PADDING.top}
            width={plotWidth}
            height={plotHeight}
            rx={0}
            fill="rgba(10, 14, 22, 0.6)"
            stroke="rgba(148, 163, 184, 0.25)"
          />

          {xTicks.map((tick, idx) => (
            <g key={`x-${idx}`}>
              <line
                x1={tick.x}
                y1={PADDING.top + plotHeight}
                x2={tick.x}
                y2={PADDING.top + plotHeight + 8}
                stroke="rgba(226, 232, 240, 0.55)"
                strokeWidth={1.1}
              />
              <text
                x={tick.x}
                y={PADDING.top + plotHeight + 20}
                textAnchor="middle"
                fill="rgba(226, 232, 240, 0.85)"
                fontSize="12"
              >
                {Math.round(tick.raw)}
              </text>
            </g>
          ))}

          {yTicks.map((tick, idx) => (
            <g key={`y-${idx}`}>
              <line
                x1={PADDING.left - 8}
                y1={tick.y}
                x2={PADDING.left}
                y2={tick.y}
                stroke="rgba(226, 232, 240, 0.55)"
                strokeWidth={1.1}
              />
              <text
                x={PADDING.left - 10}
                y={tick.y + 4}
                textAnchor="end"
                fill="rgba(226, 232, 240, 0.85)"
                fontSize="12"
              >
                {tick.raw.toFixed(0)}
              </text>
            </g>
          ))}

          <g clipPath={`url(#${clipId})`}>
            {guessLines.map((line, idx) => (
              <line
                key={`guess-${idx}`}
                x1={xToSvg(bounds.minX)}
                y1={yToSvg(lineY(bounds.minX, line.intercept, line.slope))}
                x2={xToSvg(bounds.maxX)}
                y2={yToSvg(lineY(bounds.maxX, line.intercept, line.slope))}
                stroke="rgba(56, 189, 248, 0.22)"
                strokeWidth={2}
              />
            ))}

            <line
              x1={xToSvg(bounds.minX)}
              y1={yToSvg(lineY(bounds.minX, intercept, slope))}
              x2={xToSvg(bounds.maxX)}
              y2={yToSvg(lineY(bounds.maxX, intercept, slope))}
              stroke="#38bdf8"
              strokeWidth={3}
            />

            <line
              x1={xToSvg(bounds.minX)}
              y1={yToSvg(lineY(bounds.minX, workedExampleLine.intercept, workedExampleLine.slope))}
              x2={xToSvg(bounds.maxX)}
              y2={yToSvg(lineY(bounds.maxX, workedExampleLine.intercept, workedExampleLine.slope))}
              stroke="#ef4444"
              strokeWidth={3}
            />

            {points.map((point, idx) => (
              <circle
                key={`pt-${idx}`}
                cx={xToSvg(point.x)}
                cy={yToSvg(point.y)}
                r={5}
                fill="#f8fafc"
              />
            ))}
          </g>

          <text
            x={CHART_WIDTH / 2}
            y={CHART_HEIGHT - 12}
            textAnchor="middle"
            fill="rgba(226, 232, 240, 0.7)"
            fontSize="12"
          >
            Floor area (m²)
          </text>
          <text
            x={18}
            y={CHART_HEIGHT / 2}
            textAnchor="middle"
            fill="rgba(226, 232, 240, 0.7)"
            fontSize="12"
            transform={`rotate(-90 18 ${CHART_HEIGHT / 2})`}
          >
            Price (£000s)
          </text>
        </svg>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-[color:var(--color-muted)]">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-white" />
          <span>Data points (houses)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-0.5 w-5 bg-[#38bdf8]" />
          <span className="font-semibold">
            <span className="text-white">Candidate </span>
            <span className="text-[#38bdf8]">B</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-0.5 w-5 bg-[#ef4444]" />
          <span className="font-semibold">
            <span className="text-white">Candidate </span>
            <span className="text-[#ef4444]">A</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-0.5 w-5 bg-[rgba(56,189,248,0.3)]" />
          <span>Other guesses</span>
        </div>
      </div>
    </div>
  );
}
