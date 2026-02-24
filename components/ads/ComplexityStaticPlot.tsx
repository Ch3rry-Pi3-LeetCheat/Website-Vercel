"use client";

import type { BigOKind } from "@/components/ads/BigONotation";
import type { ReactNode } from "react";
import { useMemo } from "react";

type ComplexityStaticPlotProps = {
  kind: BigOKind;
  notation: ReactNode;
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
  if (v >= 100) return v.toFixed(0);
  if (v >= 10) return v.toFixed(1);
  return v.toFixed(2);
}

export default function ComplexityStaticPlot({
  kind,
  notation,
}: ComplexityStaticPlotProps) {
  const plot = useMemo(() => {
    const width = 620;
    const height = 250;
    const left = 44;
    const right = 18;
    const top = 16;
    const bottom = 34;
    const plotW = width - left - right;
    const plotH = height - top - bottom;
    const maxN = 64;

    const values = Array.from({ length: maxN }, (_, i) => {
      const x = i + 1;
      return { x, y: compute(kind, x) };
    });
    const rawMaxY = Math.max(...values.map((p) => p.y), 1);
    const maxY = rawMaxY * (kind === "o1" ? 1.35 : 1.12);
    const nRef = 16;
    const nDouble = 32;

    const xToSvg = (x: number) => left + ((x - 1) / (maxN - 1)) * plotW;
    const yToSvg = (y: number) => top + plotH - (y / maxY) * plotH;
    const tN = compute(kind, nRef);
    const t2N = compute(kind, nDouble);
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
      path,
      nRef,
      nDouble,
      tN,
      t2N,
      xN,
      x2N,
      yN,
      y2N,
    };
  }, [kind]);

  return (
    <div className="glass-panel rounded-2xl p-4">
      <div className="grid gap-2 md:grid-cols-[1fr_auto] md:items-end">
        <div className="text-sm text-[color:var(--color-muted)]">
          <span className="text-white font-semibold">Static growth sketch</span>
        </div>
        <div className="text-sm text-white">{notation}</div>
      </div>

      <div className="mt-3 overflow-x-auto">
        <svg viewBox={`0 0 ${plot.width} ${plot.height}`} className="h-[250px] min-w-[620px] w-full">
          {[0, 0.25, 0.5, 0.75].map((f, i) => {
            const y = plot.top + (1 - f) * plot.plotH;
            return (
              <line
                key={`gy-${i}`}
                x1={plot.left}
                y1={y}
                x2={plot.width - plot.right}
                y2={y}
                stroke="rgba(148,163,184,0.16)"
                strokeWidth="1"
              />
            );
          })}

          {[1, 8, 16, 24, 32, 48, 64].map((tick) => (
            <line
              key={`gx-${tick}`}
              x1={plot.xToSvg(tick)}
              y1={plot.top}
              x2={plot.xToSvg(tick)}
              y2={plot.height - plot.bottom}
              stroke="rgba(148,163,184,0.16)"
              strokeWidth="1"
            />
          ))}

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

          <circle cx={plot.xN} cy={plot.yN} r={4.5} fill="#f472b6" />
          <circle cx={plot.x2N} cy={plot.y2N} r={4.5} fill="#f472b6" />

          {[1, 16, 32, 48, 64].map((tick) => (
            <text
              key={`xt-${tick}`}
              x={plot.xToSvg(tick)}
              y={plot.height - plot.bottom + 16}
              textAnchor="middle"
              className="fill-white/70 text-[11px]"
            >
              {tick}
            </text>
          ))}

          <text
            x={plot.xN}
            y={plot.height - plot.bottom + 30}
            textAnchor="middle"
            className="text-[11px]"
          >
            <tspan fill="#22d3ee">n</tspan>
          </text>
          <text
            x={plot.x2N}
            y={plot.height - plot.bottom + 30}
            textAnchor="middle"
            className="text-[11px]"
          >
            <tspan fill="rgba(231,238,248,0.95)">2</tspan>
            <tspan fill="#22d3ee">n</tspan>
          </text>

          <text
            x={plot.left - 8}
            y={plot.yN - (Math.abs(plot.y2N - plot.yN) < 12 ? 10 : 4)}
            textAnchor="end"
            className="text-[11px]"
          >
            <tspan fill="white">T(</tspan>
            <tspan fill="#22d3ee">n</tspan>
            <tspan fill="white">)={formatVal(plot.tN)}</tspan>
          </text>
          <text
            x={plot.left - 8}
            y={plot.y2N + (Math.abs(plot.y2N - plot.yN) < 12 ? 12 : -4)}
            textAnchor="end"
            className="text-[11px]"
          >
            <tspan fill="white">T(2</tspan>
            <tspan fill="#22d3ee">n</tspan>
            <tspan fill="white">)={formatVal(plot.t2N)}</tspan>
          </text>

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
    </div>
  );
}
