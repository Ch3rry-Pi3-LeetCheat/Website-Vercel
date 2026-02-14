import { useId } from "react";
import type { ReactNode } from "react";

type DataPoint = Record<string, number>;

type WorkedExampleLine = {
  intercept: number;
  slope: number;
};

type WorkedExamplePlotProps = {
  data: DataPoint[];
  xKey: string;
  yKey: string;
  yScale?: number;
  line: WorkedExampleLine;
  lineColor?: string;
  lineLabel?: ReactNode;
  secondaryLine?: WorkedExampleLine;
  secondaryLineColor?: string;
  secondaryLineLabel?: ReactNode;
  highlightX?: number;
  showErrorBar?: boolean;
};

const CHART_WIDTH = 640;
const CHART_HEIGHT = 360;
const PADDING = { top: 24, right: 24, bottom: 48, left: 64 };

const X_TICK_START = 50;
const X_TICK_STEP = 25;
const Y_TICK_START = 200;
const Y_TICK_STEP = 50;

export default function WorkedExamplePlot({
  data,
  xKey,
  yKey,
  yScale = 1000,
  line,
  lineColor = "#ef4444",
  lineLabel = "Candidate A",
  secondaryLine,
  secondaryLineColor = "#38bdf8",
  secondaryLineLabel = "Candidate B",
  highlightX,
  showErrorBar = false,
}: WorkedExamplePlotProps) {
  const clipId = useId();
  const points = data.map((row) => ({
    x: row[xKey],
    y: row[yKey] / yScale,
  }));

  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const maxX = Math.max(...xs);
  const maxY = Math.max(...ys);

  const xTickEnd =
    X_TICK_START + Math.ceil((maxX - X_TICK_START) / X_TICK_STEP) * X_TICK_STEP;
  const yTickEnd =
    Y_TICK_START + Math.ceil((maxY - Y_TICK_START) / Y_TICK_STEP) * Y_TICK_STEP;

  const bounds = {
    minX: X_TICK_START,
    maxX: xTickEnd,
    minY: Y_TICK_START,
    maxY: yTickEnd,
  };

  const plotWidth = CHART_WIDTH - PADDING.left - PADDING.right;
  const plotHeight = CHART_HEIGHT - PADDING.top - PADDING.bottom;

  const xToSvg = (x: number) =>
    PADDING.left + ((x - bounds.minX) / (bounds.maxX - bounds.minX)) * plotWidth;
  const yToSvg = (y: number) =>
    PADDING.top + plotHeight - ((y - bounds.minY) / (bounds.maxY - bounds.minY)) * plotHeight;

  const xTickCount = Math.floor((xTickEnd - X_TICK_START) / X_TICK_STEP) + 1;
  const yTickCount = Math.floor((yTickEnd - Y_TICK_START) / Y_TICK_STEP) + 1;
  const xTicks = Array.from({ length: xTickCount }, (_, i) => {
    const raw = X_TICK_START + i * X_TICK_STEP;
    return { raw, x: xToSvg(raw) };
  });
  const yTicks = Array.from({ length: yTickCount }, (_, i) => {
    const raw = Y_TICK_START + i * Y_TICK_STEP;
    return { raw, y: yToSvg(raw) };
  });

  const lineY = (x: number) => line.intercept + line.slope * x;
  const lineStartY = lineY(bounds.minX);
  const lineEndY = lineY(bounds.maxX);
  const secondaryLineY = (x: number) =>
    secondaryLine ? secondaryLine.intercept + secondaryLine.slope * x : undefined;
  const secondaryLineStartY = secondaryLineY(bounds.minX);
  const secondaryLineEndY = secondaryLineY(bounds.maxX);

  const highlightPoint = highlightX
    ? points.find((point) => point.x === highlightX)
    : undefined;

  const predictedAtHighlight =
    highlightX !== undefined ? lineY(highlightX) : undefined;
  const actualAtHighlight = highlightPoint?.y;
  return (
    <div className="glass-panel rounded-2xl p-4 md:p-6">
      <div className="w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
          className="h-auto w-full"
          role="img"
          aria-label="Scatter plot of floor area versus price with worked example line"
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
            <line
              x1={xToSvg(bounds.minX)}
              y1={yToSvg(lineStartY)}
              x2={xToSvg(bounds.maxX)}
              y2={yToSvg(lineEndY)}
              stroke={lineColor}
              strokeWidth={3}
            />
            {secondaryLineStartY !== undefined &&
              secondaryLineEndY !== undefined && (
                <line
                  x1={xToSvg(bounds.minX)}
                  y1={yToSvg(secondaryLineStartY)}
                  x2={xToSvg(bounds.maxX)}
                  y2={yToSvg(secondaryLineEndY)}
                  stroke={secondaryLineColor}
                  strokeWidth={3}
                />
              )}

            {showErrorBar &&
              highlightX !== undefined &&
              actualAtHighlight !== undefined &&
              predictedAtHighlight !== undefined && (
                <line
                  x1={xToSvg(highlightX)}
                  y1={yToSvg(predictedAtHighlight)}
                  x2={xToSvg(highlightX)}
                  y2={yToSvg(actualAtHighlight)}
                  stroke="rgba(244, 114, 182, 0.65)"
                  strokeWidth={2}
                />
              )}

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
          <span className="h-0.5 w-5" style={{ backgroundColor: lineColor }} />
          <span>{lineLabel}</span>
        </div>
        {secondaryLine ? (
          <div className="flex items-center gap-2">
            <span className="h-0.5 w-5" style={{ backgroundColor: secondaryLineColor }} />
            <span>{secondaryLineLabel}</span>
          </div>
        ) : null}
        {showErrorBar && (
          <div className="flex items-center gap-2">
            <span className="h-4 w-0.5 bg-[#f472b6]" />
            <span>Error gap at floor area {highlightX}</span>
          </div>
        )}
      </div>
    </div>
  );
}
