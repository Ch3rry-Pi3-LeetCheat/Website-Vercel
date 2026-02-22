"use client";

import { MathInline } from "@/components/Math";
import type { BigOKind } from "@/components/ads/BigONotation";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";

type ComplexityWalkthroughPlotProps = {
  kind: BigOKind;
  notation: ReactNode;
  tTex: string;
};

function compute(kind: BigOKind, n: number) {
  switch (kind) {
    case "o1":
      return 1;
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

function formatVal(value: number) {
  if (value >= 1000) return value.toFixed(0);
  if (value >= 100) return value.toFixed(1);
  return value.toFixed(2);
}

export default function ComplexityWalkthroughPlot({
  kind,
  notation,
  tTex,
}: ComplexityWalkthroughPlotProps) {
  const [n, setN] = useState(16);
  const minN = 1;
  const maxN = 32;
  const plotMaxN = 64;
  const sampleNs = [4, 8, 16, 32];

  const model = useMemo(() => {
    const width = 620;
    const height = 250;
    const left = 44;
    const right = 18;
    const top = 16;
    const bottom = 34;
    const plotW = width - left - right;
    const plotH = height - top - bottom;

    const values = Array.from({ length: plotMaxN }, (_, i) => {
      const x = i + 1;
      return { x, y: compute(kind, x) };
    });
    const maxY = Math.max(...values.map((p) => p.y), 1);

    const xToSvg = (x: number) => left + ((x - 1) / (plotMaxN - 1)) * plotW;
    const yToSvg = (y: number) => top + plotH - (y / maxY) * plotH;

    const path = values
      .map((p, i) => `${i === 0 ? "M" : "L"} ${xToSvg(p.x)} ${yToSvg(p.y)}`)
      .join(" ");

    return { width, height, left, right, top, bottom, plotW, plotH, xToSvg, yToSvg, path };
  }, [kind]);

  const tN = compute(kind, n);
  const t2N = compute(kind, Math.min(2 * n, 64));
  const ratio = tN === 0 ? 0 : t2N / tN;

  return (
    <div className="glass-panel rounded-2xl p-4">
      <div className="grid gap-2 md:grid-cols-[1fr_auto] md:items-end">
        <div className="text-sm text-[color:var(--color-muted)]">
          <span className="text-white font-semibold">Interactive walkthrough:</span>{" "}
          choose <MathInline tex={String.raw`n`} className="math-inline math-nvar" />, then inspect{" "}
          <MathInline tex={tTex} className="math-inline !text-white" /> and growth.
        </div>
        <div className="text-sm text-white">{notation}</div>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <span className="text-sm text-white">
          <MathInline tex={String.raw`n`} className="math-inline math-nvar" />
        </span>
        <input
          type="range"
          min={minN}
          max={maxN}
          step={1}
          value={n}
          onChange={(e) => setN(Number(e.target.value))}
          className="w-full max-w-sm"
        />
        <span className="w-10 text-right text-sm text-white">{n}</span>
      </div>

      <div className="mt-3 overflow-x-auto">
        <svg viewBox={`0 0 ${model.width} ${model.height}`} className="h-[250px] min-w-[620px] w-full">
          {[0, 0.25, 0.5, 0.75, 1].map((f, i) => {
            const y = model.top + (1 - f) * model.plotH;
            return (
              <line
                key={`gy-${i}`}
                x1={model.left}
                y1={y}
                x2={model.width - model.right}
                y2={y}
                stroke="rgba(148,163,184,0.16)"
                strokeWidth="1"
              />
            );
          })}

          {[1, 8, 16, 24, 32, 48, 64].map((tick) => (
            <line
              key={`gx-${tick}`}
              x1={model.xToSvg(tick)}
              y1={model.top}
              x2={model.xToSvg(tick)}
              y2={model.height - model.bottom}
              stroke="rgba(148,163,184,0.16)"
              strokeWidth="1"
            />
          ))}

          <line
            x1={model.left}
            y1={model.height - model.bottom}
            x2={model.width - model.right}
            y2={model.height - model.bottom}
            stroke="rgba(231,238,248,0.75)"
            strokeWidth="1.5"
          />
          <line
            x1={model.left}
            y1={model.top}
            x2={model.left}
            y2={model.height - model.bottom}
            stroke="rgba(231,238,248,0.75)"
            strokeWidth="1.5"
          />

          <path d={model.path} fill="none" stroke="#38bdf8" strokeWidth="2.5" />

          <circle
            cx={model.xToSvg(n)}
            cy={model.yToSvg(tN)}
            r={6}
            fill="#f472b6"
          />

          {[1, 16, 32, 48, 64].map((tick) => (
            <text
              key={`xt-${tick}`}
              x={model.xToSvg(tick)}
              y={model.height - model.bottom + 16}
              textAnchor="middle"
              className="fill-white/70 text-[11px]"
            >
              {tick}
            </text>
          ))}

          <text
            x={model.width - 8}
            y={model.height - 8}
            textAnchor="end"
            className="fill-cyan-300 text-[12px]"
          >
            n
          </text>
          <text x={16} y={model.top + 2} className="fill-white/80 text-[12px]">
            T(n)
          </text>
        </svg>
      </div>

      <div className="mt-2 grid gap-2 text-sm text-[color:var(--color-muted)] md:grid-cols-3">
        <div className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2">
          <MathInline tex={String.raw`T(n)`} className="math-inline !text-white" /> ={" "}
          <span className="text-white">{formatVal(tN)}</span>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2">
          <MathInline tex={String.raw`T(2n)`} className="math-inline !text-white" /> ={" "}
          <span className="text-white">{formatVal(t2N)}</span>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2">
          growth factor{" "}
          <MathInline tex={String.raw`\frac{T(2n)}{T(n)}`} className="math-inline !text-white" />{" "}
          = <span className="text-white">{formatVal(ratio)}</span>
        </div>
      </div>

      <div className="mt-3 overflow-x-auto">
        <table className="w-full border-collapse text-left text-xs text-[color:var(--color-muted)]">
          <thead>
            <tr className="text-white/80">
              <th className="py-1 pr-4">
                <MathInline tex={String.raw`n`} className="math-inline !text-white" />
              </th>
              <th className="py-1">
                <MathInline tex={String.raw`T(n)`} className="math-inline !text-white" />
              </th>
            </tr>
          </thead>
          <tbody>
            {sampleNs.map((sn) => (
              <tr key={sn}>
                <td className="py-1 pr-4 text-white">{sn}</td>
                <td className="py-1 text-white">{formatVal(compute(kind, sn))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
