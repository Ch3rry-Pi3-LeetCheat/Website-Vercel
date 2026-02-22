"use client";

import { useMemo, useState } from "react";

const WIDTH = 760;
const HEIGHT = 300;
const PAD = { top: 24, right: 26, bottom: 56, left: 68 };
const X_MIN = -4;
const X_MAX = 4;
const U_MIN = -1;
const U_MAX = 3;
const Y_MIN = -1;
const Y_MAX = 10;

function lineU(x: number) {
  return 0.5 * x + 1;
}

function parabolaY(u: number) {
  return u * u;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function PlotTop({
  x0,
  u0,
}: {
  x0: number;
  u0: number;
}) {
  const plotWidth = WIDTH - PAD.left - PAD.right;
  const plotHeight = HEIGHT - PAD.top - PAD.bottom;

  const xToSvg = (x: number) => PAD.left + ((x - X_MIN) / (X_MAX - X_MIN)) * plotWidth;
  const uToSvg = (u: number) => PAD.top + plotHeight - ((u - U_MIN) / (U_MAX - U_MIN)) * plotHeight;

  const xAxisY = uToSvg(0);
  const yAxisX = xToSvg(0);

  const xTicks = [-4, -3, -2, -1, 0, 1, 2, 3, 4];
  const uTicks = [-1, 0, 1, 2, 3];

  const samples = Array.from({ length: 220 }, (_, idx) => {
    const t = idx / 219;
    const x = X_MIN + t * (X_MAX - X_MIN);
    return { x, u: lineU(x) };
  });

  const path = samples
    .map((p, idx) => `${idx === 0 ? "M" : "L"}${xToSvg(p.x)},${uToSvg(p.u)}`)
    .join(" ");

  const tangentStartX = X_MIN;
  const tangentEndX = X_MAX;
  const tangentStartU = u0 + 0.5 * (tangentStartX - x0);
  const tangentEndU = u0 + 0.5 * (tangentEndX - x0);

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="h-auto w-full"
      role="img"
      aria-label="Top plot: u as a function of x"
    >
      <rect
        x={PAD.left}
        y={PAD.top}
        width={plotWidth}
        height={plotHeight}
        fill="rgba(10, 14, 22, 0.6)"
        stroke="rgba(148, 163, 184, 0.25)"
      />

      <line x1={PAD.left} y1={xAxisY} x2={PAD.left + plotWidth} y2={xAxisY} stroke="rgba(226,232,240,0.75)" strokeWidth={1.2} />
      <line x1={yAxisX} y1={PAD.top} x2={yAxisX} y2={PAD.top + plotHeight} stroke="rgba(226,232,240,0.75)" strokeWidth={1.2} />

      {xTicks.map((tick) => (
        <g key={`x-top-${tick}`}>
          <line x1={xToSvg(tick)} y1={xAxisY} x2={xToSvg(tick)} y2={xAxisY + 6} stroke="rgba(226,232,240,0.65)" strokeWidth={1} />
          <text x={xToSvg(tick)} y={xAxisY + 20} textAnchor="middle" fill="rgba(226,232,240,0.86)" fontSize="12">
            {tick}
          </text>
        </g>
      ))}

      {uTicks.map((tick) => (
        <g key={`u-top-${tick}`}>
          <line x1={yAxisX - 6} y1={uToSvg(tick)} x2={yAxisX} y2={uToSvg(tick)} stroke="rgba(226,232,240,0.65)" strokeWidth={1} />
          <text x={yAxisX - 10} y={uToSvg(tick) + 4} textAnchor="end" fill="rgba(226,232,240,0.86)" fontSize="12">
            {tick}
          </text>
        </g>
      ))}

      <path d={path} fill="none" stroke="#a78bfa" strokeWidth={3.2} />
      <line
        x1={xToSvg(tangentStartX)}
        y1={uToSvg(tangentStartU)}
        x2={xToSvg(tangentEndX)}
        y2={uToSvg(tangentEndU)}
        stroke="rgba(236,72,153,0.95)"
        strokeWidth={2}
        strokeDasharray="8 6"
      />

      <line
        x1={xToSvg(x0)}
        y1={xAxisY}
        x2={xToSvg(x0)}
        y2={uToSvg(u0)}
        stroke="rgba(226,232,240,0.75)"
        strokeWidth={1.4}
        strokeDasharray="5 5"
      />
      <line
        x1={yAxisX}
        y1={uToSvg(u0)}
        x2={xToSvg(x0)}
        y2={uToSvg(u0)}
        stroke="rgba(226,232,240,0.75)"
        strokeWidth={1.4}
        strokeDasharray="5 5"
      />

      <circle cx={xToSvg(x0)} cy={uToSvg(u0)} r={7} fill="#a78bfa" />

      <text x={xToSvg(x0) + 10} y={uToSvg(u0) - 10} fill="rgba(255,255,255,0.92)" fontSize="12">
        x0, 
        <tspan fill="#a78bfa">u0</tspan>
      </text>
      <text x={WIDTH / 2} y={HEIGHT - 10} textAnchor="middle" fill="rgba(226,232,240,0.72)" fontSize="12">
        x
      </text>
      <text x={18} y={HEIGHT / 2} textAnchor="middle" fill="#a78bfa" fontSize="12" transform={`rotate(-90 18 ${HEIGHT / 2})`}>
        u
      </text>
    </svg>
  );
}

function PlotBottom({
  u0,
  y0,
}: {
  u0: number;
  y0: number;
}) {
  const plotWidth = WIDTH - PAD.left - PAD.right;
  const plotHeight = HEIGHT - PAD.top - PAD.bottom;

  const uToSvg = (u: number) => PAD.left + ((u - U_MIN) / (U_MAX - U_MIN)) * plotWidth;
  const yToSvg = (y: number) => PAD.top + plotHeight - ((y - Y_MIN) / (Y_MAX - Y_MIN)) * plotHeight;

  const xAxisY = yToSvg(0);
  const yAxisX = uToSvg(0);

  const uTicks = [-1, 0, 1, 2, 3];
  const yTicks = [0, 2, 4, 6, 8, 10];

  const samples = Array.from({ length: 220 }, (_, idx) => {
    const t = idx / 219;
    const u = U_MIN + t * (U_MAX - U_MIN);
    return { u, y: parabolaY(u) };
  });

  const path = samples
    .map((p, idx) => `${idx === 0 ? "M" : "L"}${uToSvg(p.u)},${yToSvg(p.y)}`)
    .join(" ");

  const slope = 2 * u0;
  const tangentStartU = U_MIN;
  const tangentEndU = U_MAX;
  const tangentStartY = y0 + slope * (tangentStartU - u0);
  const tangentEndY = y0 + slope * (tangentEndU - u0);

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="h-auto w-full"
      role="img"
      aria-label="Bottom plot: y as a function of u"
    >
      <rect
        x={PAD.left}
        y={PAD.top}
        width={plotWidth}
        height={plotHeight}
        fill="rgba(10, 14, 22, 0.6)"
        stroke="rgba(148, 163, 184, 0.25)"
      />

      <line x1={PAD.left} y1={xAxisY} x2={PAD.left + plotWidth} y2={xAxisY} stroke="rgba(226,232,240,0.75)" strokeWidth={1.2} />
      <line x1={yAxisX} y1={PAD.top} x2={yAxisX} y2={PAD.top + plotHeight} stroke="rgba(226,232,240,0.75)" strokeWidth={1.2} />

      {uTicks.map((tick) => (
        <g key={`u-bottom-${tick}`}>
          <line x1={uToSvg(tick)} y1={xAxisY} x2={uToSvg(tick)} y2={xAxisY + 6} stroke="rgba(226,232,240,0.65)" strokeWidth={1} />
          <text x={uToSvg(tick)} y={xAxisY + 20} textAnchor="middle" fill="rgba(226,232,240,0.86)" fontSize="12">
            {tick}
          </text>
        </g>
      ))}

      {yTicks.map((tick) => (
        <g key={`y-bottom-${tick}`}>
          <line x1={yAxisX - 6} y1={yToSvg(tick)} x2={yAxisX} y2={yToSvg(tick)} stroke="rgba(226,232,240,0.65)" strokeWidth={1} />
          <text x={yAxisX - 10} y={yToSvg(tick) + 4} textAnchor="end" fill="rgba(226,232,240,0.86)" fontSize="12">
            {tick}
          </text>
        </g>
      ))}

      <path d={path} fill="none" stroke="#f472b6" strokeWidth={3.2} />
      <line
        x1={uToSvg(tangentStartU)}
        y1={yToSvg(tangentStartY)}
        x2={uToSvg(tangentEndU)}
        y2={yToSvg(tangentEndY)}
        stroke="rgba(56,189,248,0.95)"
        strokeWidth={2}
        strokeDasharray="8 6"
      />

      <line
        x1={uToSvg(u0)}
        y1={xAxisY}
        x2={uToSvg(u0)}
        y2={yToSvg(y0)}
        stroke="rgba(226,232,240,0.75)"
        strokeWidth={1.4}
        strokeDasharray="5 5"
      />
      <line
        x1={yAxisX}
        y1={yToSvg(y0)}
        x2={uToSvg(u0)}
        y2={yToSvg(y0)}
        stroke="rgba(226,232,240,0.75)"
        strokeWidth={1.4}
        strokeDasharray="5 5"
      />

      <circle cx={uToSvg(u0)} cy={yToSvg(y0)} r={7} fill="#f472b6" />

      <text x={uToSvg(u0) + 10} y={yToSvg(y0) - 10} fill="rgba(255,255,255,0.92)" fontSize="12">
        <tspan fill="#a78bfa">u0</tspan>, 
        <tspan fill="#f472b6">y0</tspan>
      </text>
      <text x={WIDTH / 2} y={HEIGHT - 10} textAnchor="middle" fill="#a78bfa" fontSize="12">
        u
      </text>
      <text x={18} y={HEIGHT / 2} textAnchor="middle" fill="#f472b6" fontSize="12" transform={`rotate(-90 18 ${HEIGHT / 2})`}>
        y
      </text>
    </svg>
  );
}

export default function ChainRuleLinkedPlots() {
  const [x0, setX0] = useState(1.5);

  const values = useMemo(() => {
    const clippedX = clamp(x0, -3, 3);
    const u0 = lineU(clippedX);
    const y0 = parabolaY(u0);
    const duDx = 0.5;
    const dyDu = 2 * u0;
    const dyDx = dyDu * duDx;
    return { x0: clippedX, u0, y0, duDx, dyDu, dyDx };
  }, [x0]);

  return (
    <div className="glass-panel rounded-2xl p-4 md:p-5">
      <div className="grid gap-3 text-sm text-[color:var(--color-muted)] sm:grid-cols-5">
        <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
          <div className="text-[11px] uppercase tracking-[0.22em]">x0</div>
          <div className="mt-1 text-white font-semibold">{values.x0.toFixed(2)}</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
          <div className="text-[11px] uppercase tracking-[0.22em]"><span className="text-[#a78bfa]">u</span>0</div>
          <div className="mt-1 text-white font-semibold">{values.u0.toFixed(3)}</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
          <div className="text-[11px] uppercase tracking-[0.22em]">d<span className="text-[#a78bfa]">u</span>/dx</div>
          <div className="mt-1 text-white font-semibold">{values.duDx.toFixed(3)}</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
          <div className="text-[11px] uppercase tracking-[0.22em]">d<span className="text-[#f472b6]">y</span>/d<span className="text-[#a78bfa]">u</span></div>
          <div className="mt-1 text-white font-semibold">{values.dyDu.toFixed(3)}</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
          <div className="text-[11px] uppercase tracking-[0.22em]">d<span className="text-[#f472b6]">y</span>/dx</div>
          <div className="mt-1 text-white font-semibold">{values.dyDx.toFixed(3)}</div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[color:var(--color-muted)]">
        <label className="flex w-full items-center gap-2 sm:w-auto">
          <span className="shrink-0">Pick x0</span>
          <input
            type="range"
            min={-3}
            max={3}
            step={0.25}
            value={x0}
            onChange={(event) => setX0(Number(event.target.value))}
            className="w-full sm:w-64"
          />
          <span className="w-12 text-right text-white">{values.x0.toFixed(2)}</span>
        </label>
      </div>

      <p className="mt-2 text-sm text-[color:var(--color-muted)]">
        Top plot gives <span className="text-white font-semibold"><span className="text-[#a78bfa]">u</span> = 0.5x + 1</span>.
        That <span className="text-[#a78bfa] font-semibold">u</span> value then becomes
        the input on the horizontal axis of the second plot <span className="text-white font-semibold"><span className="text-[#f472b6]">y</span> = <span className="text-[#a78bfa]">u</span>^2</span>.
      </p>

      <div className="mt-4 grid gap-3">
        <PlotTop x0={values.x0} u0={values.u0} />
        <div className="text-center text-xs uppercase tracking-[0.28em] text-white/60">
          u from top plot feeds into bottom plot
        </div>
        <PlotBottom u0={values.u0} y0={values.y0} />
      </div>
    </div>
  );
}
