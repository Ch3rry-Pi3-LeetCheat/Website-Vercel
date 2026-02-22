"use client";

import { MathInline } from "@/components/Math";
import { useMemo, useState } from "react";

type DerivativeTangentPlotProps = {
  mode: "square" | "chain";
};

const SVG_WIDTH = 760;
const SVG_HEIGHT = 360;
const PAD = { top: 24, right: 26, bottom: 56, left: 68 };
const X_MIN = -4;
const X_MAX = 4;
const SLIDER_MIN = -3;
const SLIDER_MAX = 3;
const SLIDER_STEP = 0.25;

type PlotConfig = {
  title: string;
  equationTex: string;
  derivativeTex: string;
  yMin: number;
  yMax: number;
  fn: (x: number) => number;
  dfn: (x: number) => number;
  yTicks: number[];
};

function getConfig(mode: "square" | "chain"): PlotConfig {
  if (mode === "chain") {
    return {
      title: "Interactive chain-rule example",
      equationTex: String.raw`{\color{magenta}y}=\left({\color{white}0.5}{\color{cyan}x}+{\color{white}1}\right)^2`,
      derivativeTex: String.raw`\frac{d{\color{magenta}y}}{d{\color{cyan}x}}={\color{white}0.5}{\color{cyan}x}+{\color{white}1}`,
      yMin: -1,
      yMax: 8,
      fn: (x) => (0.5 * x + 1) ** 2,
      dfn: (x) => 0.5 * x + 1,
      yTicks: [0, 2, 4, 6, 8],
    };
  }

  return {
    title: "Interactive slope on y = x^2",
    equationTex: String.raw`{\color{magenta}y}={\color{cyan}x}^{\color{white}2}`,
    derivativeTex: String.raw`\frac{d{\color{magenta}y}}{d{\color{cyan}x}}={\color{white}2}{\color{cyan}x}`,
    yMin: -1,
    yMax: 10,
    fn: (x) => x * x,
    dfn: (x) => 2 * x,
    yTicks: [0, 2, 4, 6, 8, 10],
  };
}

export default function DerivativeTangentPlot({ mode }: DerivativeTangentPlotProps) {
  const [x0, setX0] = useState(1.5);
  const cfg = getConfig(mode);

  const model = useMemo(() => {
    const plotWidth = SVG_WIDTH - PAD.left - PAD.right;
    const plotHeight = SVG_HEIGHT - PAD.top - PAD.bottom;
    const xToSvg = (x: number) => PAD.left + ((x - X_MIN) / (X_MAX - X_MIN)) * plotWidth;
    const yToSvg = (y: number) => PAD.top + plotHeight - ((y - cfg.yMin) / (cfg.yMax - cfg.yMin)) * plotHeight;

    const samples = Array.from({ length: 260 }, (_, idx) => {
      const t = idx / 259;
      const x = X_MIN + t * (X_MAX - X_MIN);
      return { x, y: cfg.fn(x) };
    });

    const curvePath = samples
      .map((point, idx) => `${idx === 0 ? "M" : "L"}${xToSvg(point.x)},${yToSvg(point.y)}`)
      .join(" ");

    const y0 = cfg.fn(x0);
    const slope = cfg.dfn(x0);
    const tangentY = (x: number) => y0 + slope * (x - x0);

    return {
      plotWidth,
      plotHeight,
      xToSvg,
      yToSvg,
      curvePath,
      y0,
      slope,
      tangentY,
    };
  }, [cfg, x0]);

  const xTicks = [-4, -3, -2, -1, 0, 1, 2, 3, 4];
  const yAxisX = model.xToSvg(0);
  const xAxisY = model.yToSvg(0);

  return (
    <div className="glass-panel rounded-2xl p-4 md:p-5">
      <div className="grid gap-3 text-sm text-[color:var(--color-muted)] sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
          <div className="text-xs uppercase tracking-[0.24em]">Function</div>
          <div className="mt-1 text-base font-semibold text-white">
            <MathInline tex={cfg.equationTex} className="math-inline !text-white" />
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
          <div className="text-xs uppercase tracking-[0.24em]">Derivative</div>
          <div className="mt-1 text-base font-semibold text-white">
            <MathInline tex={cfg.derivativeTex} className="math-inline !text-white" />
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
          <div className="text-xs uppercase tracking-[0.24em]">
            Slope At <MathInline tex={String.raw`{\color{cyan}x}_{\color{white}0}`} className="math-inline !text-white" />
          </div>
          <div className="mt-1 text-base font-semibold text-white">{model.slope.toFixed(3)}</div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[color:var(--color-muted)]">
        <div className="font-semibold text-white">{cfg.title}</div>
        <label className="flex w-full items-center gap-2 sm:w-auto">
          <span className="shrink-0">
            <MathInline tex={String.raw`{\color{cyan}x}_{\color{white}0}`} className="math-inline !text-white" />
          </span>
          <input
            type="range"
            min={SLIDER_MIN}
            max={SLIDER_MAX}
            step={SLIDER_STEP}
            value={x0}
            onChange={(event) => setX0(Number(event.target.value))}
            className="w-full sm:w-60"
          />
          <span className="w-12 text-right text-white">{x0.toFixed(2)}</span>
        </label>
      </div>

      <div className="mt-3 w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          className="h-auto w-full"
          role="img"
          aria-label={`${cfg.title} with tangent line and slope guides`}
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
            y1={xAxisY}
            x2={PAD.left + model.plotWidth}
            y2={xAxisY}
            stroke="rgba(226, 232, 240, 0.75)"
            strokeWidth={1.2}
          />
          <line
            x1={yAxisX}
            y1={PAD.top}
            x2={yAxisX}
            y2={PAD.top + model.plotHeight}
            stroke="rgba(226, 232, 240, 0.75)"
            strokeWidth={1.2}
          />

          {xTicks.map((tick) => (
            <g key={`x-${tick}`}>
              <line
                x1={model.xToSvg(tick)}
                y1={xAxisY}
                x2={model.xToSvg(tick)}
                y2={xAxisY + 6}
                stroke="rgba(226, 232, 240, 0.65)"
                strokeWidth={1}
              />
              <text
                x={model.xToSvg(tick)}
                y={xAxisY + 20}
                textAnchor="middle"
                fill="rgba(226, 232, 240, 0.86)"
                fontSize="12"
              >
                {tick}
              </text>
            </g>
          ))}

          {cfg.yTicks.map((tick) => (
            <g key={`y-${tick}`}>
              <line
                x1={yAxisX - 6}
                y1={model.yToSvg(tick)}
                x2={yAxisX}
                y2={model.yToSvg(tick)}
                stroke="rgba(226, 232, 240, 0.65)"
                strokeWidth={1}
              />
              <text
                x={yAxisX - 10}
                y={model.yToSvg(tick) + 4}
                textAnchor="end"
                fill="rgba(226, 232, 240, 0.86)"
                fontSize="12"
              >
                {tick}
              </text>
            </g>
          ))}

          <path d={model.curvePath} fill="none" stroke="#fb923c" strokeWidth={3.6} />

          <line
            x1={model.xToSvg(X_MIN)}
            y1={model.yToSvg(model.tangentY(X_MIN))}
            x2={model.xToSvg(X_MAX)}
            y2={model.yToSvg(model.tangentY(X_MAX))}
            stroke="rgba(56,189,248,0.95)"
            strokeWidth={2}
            strokeDasharray="8 6"
          />

          <line
            x1={model.xToSvg(x0)}
            y1={xAxisY}
            x2={model.xToSvg(x0)}
            y2={model.yToSvg(model.y0)}
            stroke="rgba(226,232,240,0.75)"
            strokeWidth={1.4}
            strokeDasharray="5 5"
          />

          <line
            x1={yAxisX}
            y1={model.yToSvg(model.y0)}
            x2={model.xToSvg(x0)}
            y2={model.yToSvg(model.y0)}
            stroke="rgba(226,232,240,0.75)"
            strokeWidth={1.4}
            strokeDasharray="5 5"
          />

          <circle cx={model.xToSvg(x0)} cy={model.yToSvg(model.y0)} r={7} fill="#f472b6" />

          <text
            x={model.xToSvg(x0) + 11}
            y={model.yToSvg(model.y0) - 12}
            fill="rgba(255,255,255,0.92)"
            fontSize="12"
          >
            <tspan fill="#22d3ee">x0</tspan>, <tspan fill="#f472b6">y0</tspan>
          </text>

          <text
            x={SVG_WIDTH / 2}
            y={SVG_HEIGHT - 10}
            textAnchor="middle"
            fill="#22d3ee"
            fontSize="12"
          >
            x
          </text>
          <text
            x={18}
            y={SVG_HEIGHT / 2}
            textAnchor="middle"
            fill="#f472b6"
            fontSize="12"
            transform={`rotate(-90 18 ${SVG_HEIGHT / 2})`}
          >
            y
          </text>
        </svg>
      </div>
    </div>
  );
}
