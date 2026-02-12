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
  highlightX,
  showErrorBar = false,
}: WorkedExamplePlotProps) {
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
  const lineStartY = Math.min(
    bounds.maxY,
    Math.max(bounds.minY, lineY(bounds.minX))
  );
  const lineEndY = Math.min(
    bounds.maxY,
    Math.max(bounds.minY, lineY(bounds.maxX))
  );

  const highlightPoint = highlightX
    ? points.find((point) => point.x === highlightX)
    : undefined;

  const predictedAtHighlight =
    highlightX !== undefined ? lineY(highlightX) : undefined;
  const actualAtHighlight = highlightPoint?.y;
  const gapValue =
    predictedAtHighlight !== undefined && actualAtHighlight !== undefined
      ? Math.abs(predictedAtHighlight - actualAtHighlight) * yScale
      : undefined;

  const formatGap = (value: number) =>
    value.toLocaleString("en-GB", {
      maximumFractionDigits: 0,
    });

  return (
    <div className="glass-panel rounded-2xl p-4 md:p-6">
      <div className="w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
          className="h-auto w-full"
          role="img"
          aria-label="Scatter plot of floor area versus price with worked example line"
        >
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

          <line
            x1={xToSvg(bounds.minX)}
            y1={yToSvg(lineStartY)}
            x2={xToSvg(bounds.maxX)}
            y2={yToSvg(lineEndY)}
            stroke="#ef4444"
            strokeWidth={3}
          />

          {showErrorBar &&
            highlightX !== undefined &&
            actualAtHighlight !== undefined &&
            predictedAtHighlight !== undefined &&
            (() => {
              const x = xToSvg(highlightX);
              const yActual = yToSvg(actualAtHighlight);
              const yPredicted = yToSvg(predictedAtHighlight);
              const topY = Math.min(yActual, yPredicted);
              const bottomY = Math.max(yActual, yPredicted);
              const midY = (topY + bottomY) / 2;
              const capSize = 7;
              const braceX = x + 18;
              const braceWidth = 8;
              const braceBend = Math.max(8, (bottomY - topY) * 0.22);
              const bracePath = [
                `M ${braceX} ${topY}`,
                `C ${braceX + braceWidth} ${topY}, ${braceX + braceWidth} ${midY - braceBend}, ${braceX} ${midY}`,
                `C ${braceX - braceWidth} ${midY + braceBend}, ${braceX - braceWidth} ${bottomY}, ${braceX} ${bottomY}`,
              ].join(" ");

              return (
                <g>
                  <line
                    x1={x}
                    y1={yPredicted}
                    x2={x}
                    y2={yActual}
                    stroke="rgba(244, 114, 182, 0.65)"
                    strokeWidth={2}
                  />
                  <line
                    x1={x - capSize}
                    y1={yPredicted}
                    x2={x + capSize}
                    y2={yPredicted}
                    stroke="rgba(244, 114, 182, 0.65)"
                    strokeWidth={2}
                  />
                  <line
                    x1={x - capSize}
                    y1={yActual}
                    x2={x + capSize}
                    y2={yActual}
                    stroke="rgba(244, 114, 182, 0.65)"
                    strokeWidth={2}
                  />
                  <path
                    d={bracePath}
                    fill="none"
                    stroke="rgba(244, 114, 182, 0.9)"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                  />
                  {gapValue !== undefined && (
                    <text
                      x={braceX + 14}
                      y={midY}
                      textAnchor="start"
                      dominantBaseline="middle"
                      fill="rgba(226, 232, 240, 0.95)"
                      fontSize="12"
                      paintOrder="stroke"
                      stroke="rgba(10, 14, 22, 0.85)"
                      strokeWidth={3}
                    >
                      £{formatGap(gapValue)} gap
                    </text>
                  )}
                </g>
              );
            })()}

          {points.map((point, idx) => (
            <circle
              key={`pt-${idx}`}
              cx={xToSvg(point.x)}
              cy={yToSvg(point.y)}
              r={5}
              fill="#f8fafc"
            />
          ))}

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
          <span className="h-0.5 w-5 bg-[#ef4444]" />
          <span>Worked example line</span>
        </div>
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
