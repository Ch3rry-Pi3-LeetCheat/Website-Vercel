import { useId } from "react";

type DataPoint = Record<string, number>;

type PredictionLine = {
  intercept: number;
  slope: number;
};

type PredictionGuidePlotProps = {
  data: DataPoint[];
  xKey: string;
  yKey: string;
  yScale?: number;
  line: PredictionLine;
  predictionX: number;
  lineColor?: string;
  lineLabel?: string;
};

const CHART_WIDTH = 640;
const CHART_HEIGHT = 360;
const PADDING = { top: 24, right: 24, bottom: 48, left: 64 };

const X_TICK_START = 50;
const X_TICK_STEP = 25;
const Y_TICK_START = 200;
const Y_TICK_STEP = 50;

export default function PredictionGuidePlot({
  data,
  xKey,
  yKey,
  yScale = 1000,
  line,
  predictionX,
  lineColor = "#38bdf8",
  lineLabel = "Candidate B model line",
}: PredictionGuidePlotProps) {
  const clipId = useId();
  const points = data.map((row) => ({
    x: row[xKey],
    y: row[yKey] / yScale,
  }));

  const xs = points.map((point) => point.x);
  const ys = points.map((point) => point.y);
  const maxX = Math.max(...xs, predictionX);
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
  const predictedY = lineY(predictionX);
  const predictedPrice = Math.round(predictedY * yScale);
  const verticalMidY = (yToSvg(bounds.minY) + yToSvg(predictedY)) / 2;
  const horizontalMidX = (xToSvg(bounds.minX) + xToSvg(predictionX)) / 2;
  const guideColor = "rgba(248, 250, 252, 0.9)";
  const crossHalfSize = 4.5;
  const arrowId = `${clipId}-arrow`;

  return (
    <div className="glass-panel rounded-2xl p-4 md:p-6">
      <div className="w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
          className="h-auto w-full"
          role="img"
          aria-label="Prediction guide plot with dashed helper lines"
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
            <marker
              id={arrowId}
              markerWidth="6"
              markerHeight="6"
              refX="5.5"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L6,3 L0,6 z" fill={guideColor} />
            </marker>
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

            <line
              x1={xToSvg(predictionX)}
              y1={yToSvg(bounds.minY)}
              x2={xToSvg(predictionX)}
              y2={yToSvg(predictedY)}
              stroke={guideColor}
              strokeWidth={2}
              strokeDasharray="5 5"
              markerEnd={`url(#${arrowId})`}
            />
            <line
              x1={xToSvg(predictionX)}
              y1={yToSvg(predictedY)}
              x2={xToSvg(bounds.minX) + 2}
              y2={yToSvg(predictedY)}
              stroke={guideColor}
              strokeWidth={2}
              strokeDasharray="5 5"
              markerEnd={`url(#${arrowId})`}
            />
            <line
              x1={xToSvg(predictionX) - crossHalfSize}
              y1={yToSvg(predictedY) - crossHalfSize}
              x2={xToSvg(predictionX) + crossHalfSize}
              y2={yToSvg(predictedY) + crossHalfSize}
              stroke="#ef4444"
              strokeWidth={2.4}
              strokeLinecap="round"
            />
            <line
              x1={xToSvg(predictionX) - crossHalfSize}
              y1={yToSvg(predictedY) + crossHalfSize}
              x2={xToSvg(predictionX) + crossHalfSize}
              y2={yToSvg(predictedY) - crossHalfSize}
              stroke="#ef4444"
              strokeWidth={2.4}
              strokeLinecap="round"
            />

            {points.map((point, idx) => (
              <circle
                key={`pt-${idx}`}
                cx={xToSvg(point.x)}
                cy={yToSvg(point.y)}
                r={4.5}
                fill="#f8fafc"
              />
            ))}
          </g>
          <text
            x={xToSvg(predictionX) + 10}
            y={verticalMidY}
            fill="rgba(248, 250, 252, 0.9)"
            fontSize="11"
            fontWeight="700"
          >
            floor area = {predictionX} m
            <tspan baselineShift="super" fontSize="8">2</tspan>
          </text>
          <text
            x={horizontalMidX}
            y={yToSvg(predictedY) - 10}
            textAnchor="middle"
            fill="rgba(248, 250, 252, 0.9)"
            fontSize="11"
            fontWeight="700"
          >
            predicted price = £{predictedPrice.toLocaleString("en-GB")}
          </text>

          <text
            x={CHART_WIDTH / 2}
            y={CHART_HEIGHT - 12}
            textAnchor="middle"
            fill="rgba(226, 232, 240, 0.7)"
            fontSize="12"
          >
            Floor area (m
            <tspan baselineShift="super" fontSize="9">2</tspan>
            )
          </text>
          <text
            x={18}
            y={CHART_HEIGHT / 2}
            textAnchor="middle"
            fill="rgba(226, 232, 240, 0.7)"
            fontSize="12"
            transform={`rotate(-90 18 ${CHART_HEIGHT / 2})`}
          >
            Price (GBP 000s)
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
        <div className="flex items-center gap-2">
          <span className="h-0.5 w-5 border-t-2 border-dashed border-white/90" />
          <span>Prediction guides (x to line, then line to y)</span>
        </div>
      </div>
    </div>
  );
}
