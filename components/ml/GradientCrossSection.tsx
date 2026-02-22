"use client";

import { useMemo, useState } from "react";

const SVG_WIDTH = 760;
const SVG_HEIGHT = 380;
const PAD = { top: 30, right: 28, bottom: 56, left: 72 };
const W_MIN = 0.5;
const W_MAX = 7.5;
const ALPHA = 0.35;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function cost(w: number) {
  return 0.28 * (w - 4) ** 2 + 0.55;
}

function gradient(w: number) {
  return 0.56 * (w - 4);
}

export default function GradientCrossSection() {
  const [weight, setWeight] = useState(6.1);

  const model = useMemo(() => {
    const samples = Array.from({ length: 180 }, (_, idx) => {
      const t = idx / 179;
      const w = W_MIN + t * (W_MAX - W_MIN);
      return { w, c: cost(w) };
    });

    const minC = Math.min(...samples.map((p) => p.c));
    const maxC = Math.max(...samples.map((p) => p.c));

    const plotWidth = SVG_WIDTH - PAD.left - PAD.right;
    const plotHeight = SVG_HEIGHT - PAD.top - PAD.bottom;

    const x = (w: number) => PAD.left + ((w - W_MIN) / (W_MAX - W_MIN)) * plotWidth;
    const y = (c: number) => PAD.top + plotHeight - ((c - minC) / (maxC - minC)) * plotHeight;

    const curvePath = samples
      .map((p, i) => `${i === 0 ? "M" : "L"}${x(p.w)},${y(p.c)}`)
      .join(" ");

    const c0 = cost(weight);
    const g0 = gradient(weight);
    const nextWeight = clamp(weight - ALPHA * g0, W_MIN, W_MAX);
    const cNext = cost(nextWeight);

    const tangentStart = W_MIN;
    const tangentEnd = W_MAX;
    const tangentYStart = c0 + g0 * (tangentStart - weight);
    const tangentYEnd = c0 + g0 * (tangentEnd - weight);

    return {
      plotWidth,
      plotHeight,
      x,
      y,
      curvePath,
      c0,
      g0,
      nextWeight,
      cNext,
      tangentStart,
      tangentEnd,
      tangentYStart,
      tangentYEnd,
      minC,
      maxC,
    };
  }, [weight]);

  const gradientText =
    Math.abs(model.g0) < 0.02
      ? "Gradient is near zero: you are close to a minimum."
      : model.g0 > 0
        ? "Gradient is positive: moving left (smaller weight) lowers cost."
        : "Gradient is negative: moving right (larger weight) lowers cost.";

  return (
    <div className="glass-panel rounded-2xl p-4 md:p-6">
      <div className="grid gap-3 text-sm text-[color:var(--color-muted)] sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
          <div className="text-xs uppercase tracking-[0.24em]">Weight w</div>
          <div className="mt-1 text-base font-semibold text-white">{weight.toFixed(3)}</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
          <div className="text-xs uppercase tracking-[0.24em]">Gradient dJ/dw</div>
          <div className="mt-1 text-base font-semibold text-white">{model.g0.toFixed(4)}</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
          <div className="text-xs uppercase tracking-[0.24em]">One-step update</div>
          <div className="mt-1 text-base font-semibold text-white">
            {model.nextWeight.toFixed(3)}
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[color:var(--color-muted)]">
        <label className="flex w-full items-center gap-2 sm:w-auto">
          <span className="shrink-0">Choose current weight</span>
          <input
            type="range"
            min={W_MIN}
            max={W_MAX}
            step={0.01}
            value={weight}
            onChange={(event) => setWeight(Number(event.target.value))}
            className="w-full sm:w-64"
          />
          <span className="w-12 text-right text-white">{weight.toFixed(2)}</span>
        </label>
        <button
          type="button"
          onClick={() => setWeight(model.nextWeight)}
          className="rounded-full border border-white/20 px-4 py-2 text-sm text-white transition hover:border-white/50"
        >
          Take one gradient step
        </button>
      </div>

      <div className="mt-2 text-sm text-[color:var(--color-muted)]">
        <span className="text-white font-semibold">Reading:</span> {gradientText}
      </div>

      <div className="mt-4 w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          className="h-auto w-full"
          role="img"
          aria-label="Cost curve cross section with tangent and gradient step"
        >
          <rect
            x={PAD.left}
            y={PAD.top}
            width={model.plotWidth}
            height={model.plotHeight}
            fill="rgba(10, 14, 22, 0.6)"
            stroke="rgba(148, 163, 184, 0.25)"
          />

          <line
            x1={PAD.left}
            y1={PAD.top + model.plotHeight}
            x2={PAD.left + model.plotWidth}
            y2={PAD.top + model.plotHeight}
            stroke="rgba(226, 232, 240, 0.75)"
            strokeWidth={1.2}
          />
          <line
            x1={PAD.left}
            y1={PAD.top + model.plotHeight}
            x2={PAD.left}
            y2={PAD.top}
            stroke="rgba(226, 232, 240, 0.75)"
            strokeWidth={1.2}
          />

          <path d={model.curvePath} fill="none" stroke="#f97316" strokeWidth={4} />

          <line
            x1={model.x(model.tangentStart)}
            y1={model.y(model.tangentYStart)}
            x2={model.x(model.tangentEnd)}
            y2={model.y(model.tangentYEnd)}
            stroke="rgba(148, 163, 184, 0.95)"
            strokeWidth={1.8}
            strokeDasharray="7 7"
          />

          <circle cx={model.x(weight)} cy={model.y(model.c0)} r={8.5} fill="#f472b6" />
          <circle cx={model.x(model.nextWeight)} cy={model.y(model.cNext)} r={6.2} fill="#38bdf8" />
          <circle cx={model.x(4)} cy={model.y(cost(4))} r={5.2} fill="#86efac" />

          <line
            x1={model.x(weight)}
            y1={model.y(model.c0)}
            x2={model.x(model.nextWeight)}
            y2={model.y(model.cNext)}
            stroke="#38bdf8"
            strokeWidth={2}
            markerEnd="url(#arrowhead)"
          />

          <defs>
            <marker
              id="arrowhead"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 6 3, 0 6" fill="#38bdf8" />
            </marker>
          </defs>

          <text
            x={SVG_WIDTH / 2}
            y={SVG_HEIGHT - 12}
            textAnchor="middle"
            fill="rgba(226, 232, 240, 0.72)"
            fontSize="12"
          >
            Weight (parameter value)
          </text>
          <text
            x={22}
            y={SVG_HEIGHT / 2}
            textAnchor="middle"
            fill="rgba(226, 232, 240, 0.72)"
            fontSize="12"
            transform={`rotate(-90 22 ${SVG_HEIGHT / 2})`}
          >
            Cost J
          </text>
          <text
            x={model.x(weight) + 12}
            y={model.y(model.c0) - 12}
            fill="rgba(255,255,255,0.92)"
            fontSize="12"
          >
            Current point
          </text>
          <text
            x={model.x(model.nextWeight) + 12}
            y={model.y(model.cNext) + 18}
            fill="rgba(255,255,255,0.92)"
            fontSize="12"
          >
            Next step
          </text>
        </svg>
      </div>
    </div>
  );
}

