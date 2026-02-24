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

    const xToSvg = (x: number) => left + ((x - 1) / (maxN - 1)) * plotW;
    const yToSvg = (y: number) => top + plotH - (y / maxY) * plotH;

    const path = values
      .map((p, i) => `${i === 0 ? "M" : "L"} ${xToSvg(p.x)} ${yToSvg(p.y)}`)
      .join(" ");

    return { width, height, left, right, top, bottom, plotH, xToSvg, path };
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
            x={plot.width - 8}
            y={plot.height - 8}
            textAnchor="end"
            className="fill-cyan-300 text-[12px]"
          >
            n
          </text>
          <text x={16} y={plot.top + 2} className="fill-white/80 text-[12px]">
            T(n)
          </text>
        </svg>
      </div>
    </div>
  );
}

