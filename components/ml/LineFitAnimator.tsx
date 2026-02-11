"use client";

import { useEffect, useMemo, useState } from "react";

type DataPoint = Record<string, number>;

type LineFitAnimatorProps = {
  data: DataPoint[];
  xKey: string;
  yKey: string;
  yScale?: number;
  showErrorBars?: boolean;
  showTrail?: boolean;
};

const CHART_WIDTH = 640;
const CHART_HEIGHT = 360;
const PADDING = { top: 24, right: 24, bottom: 48, left: 64 };

export default function LineFitAnimator({
  data,
  xKey,
  yKey,
  yScale = 1000,
  showErrorBars = true,
  showTrail = false,
}: LineFitAnimatorProps) {
  const xScale = 100;
  const initialTheta0 = useMemo(() => {
    const avgY =
      scaledData.reduce((acc, point) => acc + point.y, 0) / scaledData.length;
    return avgY;
  }, [scaledData]);
  const initialTheta1 = 0;

  const [theta0, setTheta0] = useState(initialTheta0);
  const [theta1, setTheta1] = useState(initialTheta1);
  const [learningRate] = useState(0.08);
  const [isPlaying, setIsPlaying] = useState(false);
  const [iteration, setIteration] = useState(0);
  const [showErrors, setShowErrors] = useState(showErrorBars);
  const [trail, setTrail] = useState<{ theta0: number; theta1: number }[]>([]);

  useEffect(() => {
    setTheta0(initialTheta0);
    setTheta1(initialTheta1);
    setIteration(0);
  }, [initialTheta0]);

  const scaledData = useMemo(() => {
    return data.map((point) => ({
      rawX: point[xKey],
      rawY: point[yKey],
      x: point[xKey] / xScale,
      y: point[yKey] / yScale,
    }));
  }, [data, xKey, yKey, yScale]);

  const bounds = useMemo(() => {
    const xs = scaledData.map((p) => p.x);
    const ys = scaledData.map((p) => p.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const yPadding = (maxY - minY) * 0.15;
    return {
      minX,
      maxX,
      minY: minY - yPadding,
      maxY: maxY + yPadding,
    };
  }, [scaledData]);

  const mse = useMemo(() => {
    const errors = scaledData.map((p) => {
      const yHat = theta0 + theta1 * p.x;
      return yHat - p.y;
    });
    const total = errors.reduce((acc, err) => acc + err * err, 0);
    return total / errors.length;
  }, [scaledData, theta0, theta1]);

  const step = () => {
    const n = scaledData.length;
    let grad0 = 0;
    let grad1 = 0;

    scaledData.forEach((p) => {
      const yHat = theta0 + theta1 * p.x;
      const error = yHat - p.y;
      grad0 += error;
      grad1 += error * p.x;
    });

    grad0 = (2 / n) * grad0;
    grad1 = (2 / n) * grad1;

    const nextTheta0 = theta0 - learningRate * grad0;
    const nextTheta1 = theta1 - learningRate * grad1;

    setTheta0(nextTheta0);
    setTheta1(nextTheta1);
    setIteration((prev) => prev + 1);

    if (showTrail) {
      setTrail((prev) => {
        const next = [...prev, { theta0: nextTheta0, theta1: nextTheta1 }];
        return next.slice(-20);
      });
    }
  };

  const reset = () => {
    setTheta0(initialTheta0);
    setTheta1(initialTheta1);
    setIteration(0);
    setIsPlaying(false);
    setTrail([]);
  };

  useEffect(() => {
    if (!isPlaying) return;
    if (iteration >= 250) {
      setIsPlaying(false);
      return;
    }
    const id = window.setInterval(() => {
      step();
    }, 120);
    return () => window.clearInterval(id);
  }, [isPlaying, iteration, learningRate, theta0, theta1, scaledData, showTrail]);

  const plotWidth = CHART_WIDTH - PADDING.left - PADDING.right;
  const plotHeight = CHART_HEIGHT - PADDING.top - PADDING.bottom;

  const xToSvg = (x: number) =>
    PADDING.left + ((x - bounds.minX) / (bounds.maxX - bounds.minX)) * plotWidth;
  const yToSvg = (y: number) =>
    PADDING.top + plotHeight - ((y - bounds.minY) / (bounds.maxY - bounds.minY)) * plotHeight;

  const lineY = (x: number, t0 = theta0, t1 = theta1) => t0 + t1 * x;
  const lineStart = { x: bounds.minX, y: lineY(bounds.minX) };
  const lineEnd = { x: bounds.maxX, y: lineY(bounds.maxX) };

  return (
    <div className="glass-panel rounded-2xl p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-[color:var(--color-muted)]">
        <div className="grid gap-1">
          <div className="text-white font-semibold">Current line</div>
          <div>
            <span className="text-white">theta0:</span> {theta0.toFixed(2)}{" "}
            <span className="text-white">theta1:</span> {theta1.toFixed(2)}
          </div>
          <div>
            <span className="text-white">Loss (MSE):</span> {mse.toFixed(4)}{" "}
            <span className="text-white">Iter:</span> {iteration}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setIsPlaying((prev) => !prev)}
            className="rounded-full border border-white/20 px-4 py-2 text-sm text-white transition hover:border-white/50"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button
            type="button"
            onClick={step}
            className="rounded-full border border-white/20 px-4 py-2 text-sm text-white transition hover:border-white/50"
          >
            Step
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-white/20 px-4 py-2 text-sm text-white transition hover:border-white/50"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-[color:var(--color-muted)]">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showErrors}
            onChange={(event) => setShowErrors(event.target.checked)}
          />
          <span>Show error bars</span>
        </label>
      </div>

      <div className="mt-6 w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
          className="h-auto w-full"
          role="img"
          aria-label="Scatter plot of floor area versus price with fitted line"
        >
          <rect
            x={PADDING.left}
            y={PADDING.top}
            width={plotWidth}
            height={plotHeight}
            rx={12}
            fill="rgba(10, 14, 22, 0.6)"
            stroke="rgba(148, 163, 184, 0.25)"
          />

          {showTrail &&
            trail.map((entry, idx) => (
              <line
                key={`${entry.theta0}-${idx}`}
                x1={xToSvg(lineStart.x)}
                y1={yToSvg(lineY(lineStart.x, entry.theta0, entry.theta1))}
                x2={xToSvg(lineEnd.x)}
                y2={yToSvg(lineY(lineEnd.x, entry.theta0, entry.theta1))}
                stroke="rgba(148, 163, 184, 0.2)"
                strokeWidth={1}
              />
            ))}

          <line
            x1={xToSvg(lineStart.x)}
            y1={yToSvg(lineStart.y)}
            x2={xToSvg(lineEnd.x)}
            y2={yToSvg(lineEnd.y)}
            stroke="#38bdf8"
            strokeWidth={2.5}
          />

          {scaledData.map((point) => {
            const x = xToSvg(point.x);
            const y = yToSvg(point.y);
            const yHat = yToSvg(lineY(point.x));

            return (
              <g key={`${point.rawX}-${point.rawY}`}>
                {showErrors && (
                  <line
                    x1={x}
                    y1={yHat}
                    x2={x}
                    y2={y}
                    stroke="rgba(244, 114, 182, 0.5)"
                    strokeWidth={2}
                  />
                )}
                <circle cx={x} cy={y} r={5} fill="#f8fafc" />
              </g>
            );
          })}

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
    </div>
  );
}
