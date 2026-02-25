"use client";

import type { BigOKind } from "@/components/ads/BigONotation";
import { MathBlock, MathInline } from "@/components/Math";
import { useMemo } from "react";

type ComplexityStaticPlotProps = {
  kind: BigOKind;
};

function compute(kind: BigOKind, n: number) {
  switch (kind) {
    case "o1":
      return 7;
    case "ologn":
      return Math.log2(n);
    case "on":
      return n;
    case "onlogn":
      return n * Math.log2(n);
    case "on2":
      return n * n;
    default:
      return n;
  }
}

function formatVal(v: number) {
  const rounded = Math.round(v);
  if (Math.abs(v - rounded) < 1e-9) return String(rounded);
  return v.toFixed(2).replace(/\.?0+$/, "");
}

function niceCeil(v: number) {
  if (v <= 1) return 1;
  const mag = 10 ** Math.floor(Math.log10(v));
  const norm = v / mag;
  if (norm <= 1) return 1 * mag;
  if (norm <= 2) return 2 * mag;
  if (norm <= 5) return 5 * mag;
  return 10 * mag;
}

function interpretation(kind: BigOKind, ratioText: string) {
  switch (kind) {
    case "o1":
      return `The ratio is ${ratioText}, so doubling input leaves work unchanged. That is constant-time behavior.`;
    case "ologn":
      return `At this small input size, the ratio is ${ratioText}. As n gets larger, this ratio moves toward 1, which is why logarithmic growth scales very gently.`;
    case "on":
      return `The ratio is ${ratioText}, so doubling input doubles work. That is exactly linear growth.`;
    case "onlogn":
      return `At n=5, the ratio is ${ratioText}: more than 2x, but not close to 4x. As n grows, this ratio trends toward 2.`;
    case "on2":
      return `The ratio is ${ratioText}, so doubling input multiplies work by 4. This is why quadratic growth gets expensive quickly.`;
    default:
      return "";
  }
}

export default function ComplexityStaticPlot({
  kind,
}: ComplexityStaticPlotProps) {
  const plot = useMemo(() => {
    const width = 680;
    const height = 320;
    const left = 64;
    const right = 20;
    const top = 20;
    const bottom = 44;
    const plotW = width - left - right;
    const plotH = height - top - bottom;
    const maxN = 20;

    const values = Array.from({ length: maxN }, (_, i) => {
      const x = i + 1;
      return { x, y: compute(kind, x) };
    });
    const rawMaxY = Math.max(...values.map((p) => p.y), 1.5);
    const maxY = niceCeil(rawMaxY * 1.05);
    const yStep = niceCeil(maxY / 5);
    const yTicks: number[] = [];
    for (let y = 0; y <= maxY; y += yStep) yTicks.push(y);
    if (yTicks[yTicks.length - 1] !== maxY) yTicks.push(maxY);

    const nRef = 5;
    const nDouble = 10;
    const xTicks = [1, 5, 10, 15, 20];

    const xToSvg = (x: number) => left + ((x - 1) / (maxN - 1)) * plotW;
    const yToSvg = (y: number) => top + plotH - (y / maxY) * plotH;
    const tN = compute(kind, nRef);
    const t2N = compute(kind, nDouble);
    const ratio = t2N / Math.max(tN, Number.EPSILON);
    const xN = xToSvg(nRef);
    const x2N = xToSvg(nDouble);
    const yN = yToSvg(tN);
    const y2N = yToSvg(t2N);

    const path = values
      .map((p, i) => `${i === 0 ? "M" : "L"} ${xToSvg(p.x)} ${yToSvg(p.y)}`)
      .join(" ");

    return {
      width,
      height,
      left,
      right,
      top,
      bottom,
      plotH,
      xToSvg,
      yToSvg,
      path,
      maxY,
      yTicks,
      xTicks,
      nRef,
      nDouble,
      tN,
      t2N,
      ratio,
      xN,
      x2N,
      yN,
      y2N,
    };
  }, [kind]);

  const ratioText = formatVal(plot.ratio);
  const tNText = formatVal(plot.tN);
  const t2NText = formatVal(plot.t2N);
  const ratioOp = Math.abs(plot.ratio - Math.round(plot.ratio)) < 1e-9 ? "=" : "\\approx";
  const yLabelGap = Math.abs(plot.y2N - plot.yN) < 18;

  return (
    <div className="glass-panel rounded-2xl p-4">
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${plot.width} ${plot.height}`} className="h-[320px] min-w-[680px] w-full">
          <rect
            x={plot.left}
            y={plot.top}
            width={plot.width - plot.left - plot.right}
            height={plot.plotH}
            fill="rgba(1,8,28,0.95)"
          />

          <line
            x1={plot.left}
            y1={plot.height - plot.bottom}
            x2={plot.width - plot.right}
            y2={plot.height - plot.bottom}
            stroke="rgba(231,238,248,0.75)"
            strokeWidth="1.5"
          />
          <line
            x1={plot.left}
            y1={plot.top}
            x2={plot.left}
            y2={plot.height - plot.bottom}
            stroke="rgba(231,238,248,0.75)"
            strokeWidth="1.5"
          />

          {plot.yTicks.map((tick) => {
            const y = plot.yToSvg(tick);
            return (
              <g key={`yt-${tick}`}>
                <line
                  x1={plot.left - 7}
                  y1={y}
                  x2={plot.left}
                  y2={y}
                  stroke="rgba(231,238,248,0.65)"
                  strokeWidth="1.2"
                />
                <text
                  x={plot.left - 11}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-white/70 text-[11px]"
                >
                  {formatVal(tick)}
                </text>
              </g>
            );
          })}

          {plot.xTicks.map((tick) => (
            <g key={`xt-${tick}`}>
              <line
                x1={plot.xToSvg(tick)}
                y1={plot.height - plot.bottom}
                x2={plot.xToSvg(tick)}
                y2={plot.height - plot.bottom + 7}
                stroke="rgba(231,238,248,0.65)"
                strokeWidth="1.2"
              />
              <text
                x={plot.xToSvg(tick)}
                y={plot.height - plot.bottom + 20}
                textAnchor="middle"
                className="fill-white/70 text-[11px]"
              >
                {tick}
              </text>
            </g>
          ))}

          <path d={plot.path} fill="none" stroke="#38bdf8" strokeWidth="2.5" />

          <line
            x1={plot.xN}
            y1={plot.height - plot.bottom}
            x2={plot.xN}
            y2={plot.yN}
            stroke="rgba(231,238,248,0.9)"
            strokeWidth="1.5"
            strokeDasharray="6 5"
          />
          <line
            x1={plot.x2N}
            y1={plot.height - plot.bottom}
            x2={plot.x2N}
            y2={plot.y2N}
            stroke="rgba(231,238,248,0.9)"
            strokeWidth="1.5"
            strokeDasharray="6 5"
          />

          <line
            x1={plot.left}
            y1={plot.yN}
            x2={plot.xN}
            y2={plot.yN}
            stroke="rgba(231,238,248,0.9)"
            strokeWidth="1.5"
            strokeDasharray="6 5"
          />
          <line
            x1={plot.left}
            y1={plot.y2N}
            x2={plot.x2N}
            y2={plot.y2N}
            stroke="rgba(231,238,248,0.9)"
            strokeWidth="1.5"
            strokeDasharray="6 5"
          />

          <text
            x={plot.left + 8}
            y={plot.yN - (yLabelGap ? 10 : 6)}
            textAnchor="start"
            className="text-[11px]"
          >
            <tspan fill="white">T(</tspan>
            <tspan fill="#22d3ee">n</tspan>
            <tspan fill="white">)={formatVal(plot.tN)}</tspan>
          </text>
          <text
            x={plot.left + 8}
            y={plot.y2N + (yLabelGap ? 14 : -6)}
            textAnchor="start"
            className="text-[11px]"
          >
            <tspan fill="white">T(2</tspan>
            <tspan fill="#22d3ee">n</tspan>
            <tspan fill="white">)={formatVal(plot.t2N)}</tspan>
          </text>

          <line
            x1={plot.xN - 5}
            y1={plot.yN - 5}
            x2={plot.xN + 5}
            y2={plot.yN + 5}
            stroke="#ef4444"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <line
            x1={plot.xN + 5}
            y1={plot.yN - 5}
            x2={plot.xN - 5}
            y2={plot.yN + 5}
            stroke="#ef4444"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <line
            x1={plot.x2N - 5}
            y1={plot.y2N - 5}
            x2={plot.x2N + 5}
            y2={plot.y2N + 5}
            stroke="#ef4444"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <line
            x1={plot.x2N + 5}
            y1={plot.y2N - 5}
            x2={plot.x2N - 5}
            y2={plot.y2N + 5}
            stroke="#ef4444"
            strokeWidth="2.6"
            strokeLinecap="round"
          />

          <text
            x={plot.width - 8}
            y={plot.height - 8}
            textAnchor="end"
            className="fill-cyan-300 text-[12px]"
          >
            n
          </text>
          <text x={16} y={plot.top + 2} className="text-[12px]">
            <tspan fill="rgba(231,238,248,0.8)">T(</tspan>
            <tspan fill="#22d3ee">n</tspan>
            <tspan fill="rgba(231,238,248,0.8)">)</tspan>
          </text>
        </svg>
      </div>

      <div className="mt-4 grid gap-3 text-base leading-7 text-[color:var(--color-muted)]">
        <p>
          The dashed guides mark the same two sample inputs on every plot:{" "}
          <MathInline
            tex={String.raw`{\color{#22d3ee}n}=5`}
            className="math-inline math-white"
          />{" "}
          and{" "}
          <MathInline
            tex={String.raw`2{\color{#22d3ee}n}=10`}
            className="math-inline math-white"
          />
          . We keep these fixed so you can compare growth shapes directly.
        </p>
        <p>
          Here{" "}
          <MathInline
            tex={String.raw`{\color{white}T({\color{#22d3ee}n})}`}
            className="math-inline math-white"
          />{" "}
          and{" "}
          <MathInline
            tex={String.raw`{\color{white}T(2{\color{#22d3ee}n})}`}
            className="math-inline math-white"
          />{" "}
          are model work units (roughly counts of basic operations), not exact
          seconds on a clock.
        </p>
        <p>Read the two plotted values first:</p>
        <MathBlock
          tex={String.raw`{\color{white}T(5)=` + tNText + `,\qquad T(10)=` + t2NText + `}`}
          className="math-center text-white/90"
        />
        <p>Now compute the doubling ratio step by step:</p>
        <MathBlock
          tex={String.raw`\begin{aligned}
{\color{white}\frac{T(2{\color{#22d3ee}n})}{T({\color{#22d3ee}n})}}
&= {\color{white}\frac{T(10)}{T(5)}} \\[3pt]
&= {\color{white}\frac{` + t2NText + `}{` + tNText + `}} \\[3pt]
&` + ratioOp + ` {\color{white}` + ratioText + `}
\end{aligned}`}
          className="math-center text-white/90"
        />
        <p>{interpretation(kind, ratioText)}</p>
      </div>
    </div>
  );
}
