"use client";

import { useEffect, useMemo, useState } from "react";

type DataPoint = {
  floor_area: number;
  price_gbp: number;
};

type GradientDescentContourProps = {
  data: DataPoint[];
  maxLoops?: number;
  learningRate?: number;
};

const CHART_WIDTH = 680;
const CHART_HEIGHT = 420;
const PADDING = { top: 24, right: 28, bottom: 56, left: 72 };

type StatePoint = {
  theta0: number;
  theta1: number;
  loss: number;
};

function normalize(vec: [number, number]): [number, number] {
  const mag = Math.hypot(vec[0], vec[1]);
  if (mag === 0) return [1, 0];
  return [vec[0] / mag, vec[1] / mag];
}

export default function GradientDescentContour({
  data,
  maxLoops = 140,
  learningRate = 0.3,
}: GradientDescentContourProps) {
  const [loopIndex, setLoopIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const model = useMemo(() => {
    const xs = data.map((row) => row.floor_area / 100);
    const ys = data.map((row) => row.price_gbp / 1000);
    const n = xs.length;

    const meanX = xs.reduce((acc, value) => acc + value, 0) / n;
    const meanY = ys.reduce((acc, value) => acc + value, 0) / n;

    const varianceX = xs.reduce((acc, value) => acc + (value - meanX) ** 2, 0);
    const covariance = xs.reduce((acc, value, idx) => acc + (value - meanX) * (ys[idx] - meanY), 0);

    const optimumTheta1 = covariance / varianceX;
    const optimumTheta0 = meanY - optimumTheta1 * meanX;

    const loss = (theta0: number, theta1: number) =>
      ys.reduce((acc, y, idx) => {
        const error = theta0 + theta1 * xs[idx] - y;
        return acc + error * error;
      }, 0) / n;

    const gradients = (theta0: number, theta1: number) => {
      let grad0 = 0;
      let grad1 = 0;
      for (let i = 0; i < n; i += 1) {
        const error = theta0 + theta1 * xs[i] - ys[i];
        grad0 += error;
        grad1 += error * xs[i];
      }
      grad0 = (2 / n) * grad0;
      grad1 = (2 / n) * grad1;
      return { grad0, grad1 };
    };

    const initialTheta0 = meanY;
    const initialTheta1 = 0;

    const path: StatePoint[] = [];
    let theta0 = initialTheta0;
    let theta1 = initialTheta1;
    path.push({ theta0, theta1, loss: loss(theta0, theta1) });

    for (let loop = 0; loop < maxLoops; loop += 1) {
      const { grad0, grad1 } = gradients(theta0, theta1);
      theta0 -= learningRate * grad0;
      theta1 -= learningRate * grad1;
      path.push({ theta0, theta1, loss: loss(theta0, theta1) });
    }

    const h00 = 2;
    const h01 = (2 / n) * xs.reduce((acc, value) => acc + value, 0);
    const h11 = (2 / n) * xs.reduce((acc, value) => acc + value * value, 0);

    const trace = h00 + h11;
    const determinant = h00 * h11 - h01 * h01;
    const root = Math.sqrt(Math.max(trace * trace * 0.25 - determinant, 0));
    const lambda1 = trace * 0.5 + root;
    const lambda2 = trace * 0.5 - root;

    const v1 =
      Math.abs(h01) > 1e-9
        ? normalize([lambda1 - h11, h01])
        : normalize([1, 0]);
    const v2 =
      Math.abs(h01) > 1e-9
        ? normalize([lambda2 - h11, h01])
        : normalize([0, 1]);

    const optimumLoss = loss(optimumTheta0, optimumTheta1);
    const initialLoss = path[0].loss;
    const delta = Math.max(initialLoss - optimumLoss, 1);
    const factors = [0.06, 0.12, 0.2, 0.32, 0.5, 0.72, 1.0, 1.35];
    const contourLevels = factors.map((factor) => optimumLoss + delta * factor);

    const contourLines = contourLevels.map((levelLoss) => {
      const c = Math.max(levelLoss - optimumLoss, 1e-6);
      const radius1 = Math.sqrt(c / lambda1);
      const radius2 = Math.sqrt(c / lambda2);
      const points: Array<{ theta0: number; theta1: number }> = [];
      const pointCount = 140;
      for (let idx = 0; idx <= pointCount; idx += 1) {
        const t = (idx / pointCount) * Math.PI * 2;
        const u = radius1 * Math.cos(t);
        const v = radius2 * Math.sin(t);
        const delta0 = v1[0] * u + v2[0] * v;
        const delta1 = v1[1] * u + v2[1] * v;
        points.push({
          theta0: optimumTheta0 + delta0,
          theta1: optimumTheta1 + delta1,
        });
      }
      return { levelLoss, points };
    });

    const allTheta0 = [
      ...path.map((point) => point.theta0),
      ...contourLines.flatMap((line) => line.points.map((point) => point.theta0)),
    ];
    const allTheta1 = [
      ...path.map((point) => point.theta1),
      ...contourLines.flatMap((line) => line.points.map((point) => point.theta1)),
    ];

    const minTheta0 = Math.min(...allTheta0);
    const maxTheta0 = Math.max(...allTheta0);
    const minTheta1 = Math.min(...allTheta1);
    const maxTheta1 = Math.max(...allTheta1);

    const theta0Padding = (maxTheta0 - minTheta0) * 0.08;
    const theta1Padding = (maxTheta1 - minTheta1) * 0.1;

    return {
      path,
      contourLines,
      optimum: { theta0: optimumTheta0, theta1: optimumTheta1, loss: optimumLoss },
      bounds: {
        minTheta0: minTheta0 - theta0Padding,
        maxTheta0: maxTheta0 + theta0Padding,
        minTheta1: minTheta1 - theta1Padding,
        maxTheta1: maxTheta1 + theta1Padding,
      },
    };
  }, [data, learningRate, maxLoops]);

  useEffect(() => {
    setLoopIndex(0);
    setIsPlaying(false);
  }, [model.path.length]);

  useEffect(() => {
    if (!isPlaying) return;
    if (loopIndex >= model.path.length - 1) {
      setIsPlaying(false);
      return;
    }
    const id = window.setInterval(() => {
      setLoopIndex((prev) => Math.min(prev + 1, model.path.length - 1));
    }, 90);
    return () => window.clearInterval(id);
  }, [isPlaying, loopIndex, model.path.length]);

  const current = model.path[loopIndex];
  const plotWidth = CHART_WIDTH - PADDING.left - PADDING.right;
  const plotHeight = CHART_HEIGHT - PADDING.top - PADDING.bottom;

  const xToSvg = (theta0: number) =>
    PADDING.left +
    ((theta0 - model.bounds.minTheta0) / (model.bounds.maxTheta0 - model.bounds.minTheta0)) * plotWidth;

  const yToSvg = (theta1: number) =>
    PADDING.top +
    plotHeight -
    ((theta1 - model.bounds.minTheta1) / (model.bounds.maxTheta1 - model.bounds.minTheta1)) * plotHeight;

  const pathPolyline = model.path
    .slice(0, loopIndex + 1)
    .map((point) => `${xToSvg(point.theta0)},${yToSvg(point.theta1)}`)
    .join(" ");

  const xTicks = Array.from({ length: 6 }, (_, idx) => {
    const ratio = idx / 5;
    const value = model.bounds.minTheta0 + ratio * (model.bounds.maxTheta0 - model.bounds.minTheta0);
    return { value, x: xToSvg(value) };
  });

  const yTicks = Array.from({ length: 6 }, (_, idx) => {
    const ratio = idx / 5;
    const value = model.bounds.minTheta1 + ratio * (model.bounds.maxTheta1 - model.bounds.minTheta1);
    return { value, y: yToSvg(value) };
  });

  return (
    <div className="glass-panel rounded-2xl p-4 md:p-6">
      <p className="text-sm text-[color:var(--color-muted)]">
        <span className="text-white font-semibold">How to read this plot:</span>{" "}
        each contour is a constant-loss line, and each step of the dot is one
        gradient descent update (one training loop).
      </p>

      <div className="mt-4 grid gap-3 text-sm text-[color:var(--color-muted)] sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
          <div className="text-xs uppercase tracking-[0.25em]">Loop</div>
          <div className="mt-1 text-base font-semibold text-white">{loopIndex}</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
          <div className="text-xs uppercase tracking-[0.25em]">theta0</div>
          <div className="mt-1 text-base font-semibold text-white">
            {(current.theta0 * 1000).toLocaleString("en-GB", {
              maximumFractionDigits: 1,
            })}
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
          <div className="text-xs uppercase tracking-[0.25em]">theta1</div>
          <div className="mt-1 text-base font-semibold text-white">
            {(current.theta1 * 10).toLocaleString("en-GB", {
              maximumFractionDigits: 2,
            })}
            {" "}GBP per m2
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
          <div className="text-xs uppercase tracking-[0.25em]">MSE</div>
          <div className="mt-1 text-base font-semibold text-white">
            {current.loss.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm text-[color:var(--color-muted)]">
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
            onClick={() => setLoopIndex((prev) => Math.min(prev + 1, model.path.length - 1))}
            className="rounded-full border border-white/20 px-4 py-2 text-sm text-white transition hover:border-white/50"
          >
            Step
          </button>
          <button
            type="button"
            onClick={() => {
              setIsPlaying(false);
              setLoopIndex(0);
            }}
            className="rounded-full border border-white/20 px-4 py-2 text-sm text-white transition hover:border-white/50"
          >
            Reset
          </button>
        </div>
        <label className="flex w-full items-center gap-2 text-sm text-[color:var(--color-muted)] sm:w-auto">
          <span>Loop</span>
          <input
            type="range"
            min={0}
            max={model.path.length - 1}
            value={loopIndex}
            onChange={(event) => {
              setIsPlaying(false);
              setLoopIndex(Number(event.target.value));
            }}
            className="w-full sm:w-44"
          />
          <span className="w-10 text-right text-white">{loopIndex}</span>
        </label>
      </div>

      <div className="mt-3 w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
          className="h-auto w-full"
          role="img"
          aria-label="Contour plot of loss over theta0 and theta1 with gradient descent path"
        >
          <rect
            x={PADDING.left}
            y={PADDING.top}
            width={plotWidth}
            height={plotHeight}
            fill="rgba(10, 14, 22, 0.6)"
            stroke="rgba(148, 163, 184, 0.25)"
          />

          {xTicks.map((tick, idx) => (
            <g key={`x-${idx}`}>
              <line
                x1={tick.x}
                y1={PADDING.top + plotHeight}
                x2={tick.x}
                y2={PADDING.top + plotHeight + 7}
                stroke="rgba(226, 232, 240, 0.65)"
                strokeWidth={1}
              />
              <text
                x={tick.x}
                y={PADDING.top + plotHeight + 20}
                textAnchor="middle"
                fill="rgba(226, 232, 240, 0.92)"
                fontSize="12"
              >
                {tick.value.toFixed(1)}
              </text>
            </g>
          ))}

          {yTicks.map((tick, idx) => (
            <g key={`y-${idx}`}>
              <line
                x1={PADDING.left - 7}
                y1={tick.y}
                x2={PADDING.left}
                y2={tick.y}
                stroke="rgba(226, 232, 240, 0.65)"
                strokeWidth={1}
              />
              <text
                x={PADDING.left - 10}
                y={tick.y + 4}
                textAnchor="end"
                fill="rgba(226, 232, 240, 0.92)"
                fontSize="12"
              >
                {tick.value.toFixed(1)}
              </text>
            </g>
          ))}

          {model.contourLines.map((line, idx) => {
            const d = line.points
              .map((point, pointIdx) => {
                const command = pointIdx === 0 ? "M" : "L";
                return `${command}${xToSvg(point.theta0)},${yToSvg(point.theta1)}`;
              })
              .join(" ");
            return (
              <path
                key={`contour-${idx}`}
                d={d}
                fill="none"
                stroke="rgba(71, 85, 105, 0.58)"
                strokeWidth={1.25}
              />
            );
          })}

          <polyline
            points={pathPolyline}
            fill="none"
            stroke="#38bdf8"
            strokeWidth={2.4}
          />

          {model.path.slice(0, loopIndex + 1).map((point, idx) => (
            <circle
              key={`path-${idx}`}
              cx={xToSvg(point.theta0)}
              cy={yToSvg(point.theta1)}
              r={idx === loopIndex ? 4.8 : 2.2}
              fill={idx === loopIndex ? "#f472b6" : "rgba(56, 189, 248, 0.85)"}
            />
          ))}

          <circle
            cx={xToSvg(model.optimum.theta0)}
            cy={yToSvg(model.optimum.theta1)}
            r={4.3}
            fill="#86efac"
          />

          <text
            x={CHART_WIDTH / 2}
            y={CHART_HEIGHT - 12}
            textAnchor="middle"
            fill="rgba(226, 232, 240, 0.72)"
            fontSize="12"
          >
            theta0 (price intercept, in GBP 000s)
          </text>
          <text
            x={18}
            y={CHART_HEIGHT / 2}
            textAnchor="middle"
            fill="rgba(226, 232, 240, 0.72)"
            fontSize="12"
            transform={`rotate(-90 18 ${CHART_HEIGHT / 2})`}
          >
            theta1 (slope, in GBP 000 per 100 m2)
          </text>
        </svg>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-[color:var(--color-muted)]">
        <div className="flex items-center gap-2">
          <span className="h-0.5 w-5 bg-[#38bdf8]" />
          <span>Gradient descent path</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#f472b6]" />
          <span>Current loop position</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#86efac]" />
          <span>Lowest loss region</span>
        </div>
      </div>
    </div>
  );
}

