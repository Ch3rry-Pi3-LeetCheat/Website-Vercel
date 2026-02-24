"use client";

import BigONotation from "@/components/ads/BigONotation";
import { useMemo, useState } from "react";

type Curve = {
  key: string;
  kind: "o1" | "ologn" | "on" | "onlogn" | "on2";
  color: string;
  fn: (n: number) => number;
};

const curves: Curve[] = [
  { key: "o1", kind: "o1", color: "#34d399", fn: () => 7 },
  { key: "ologn", kind: "ologn", color: "#60a5fa", fn: (n) => (n < 1 ? 0 : Math.log2(Math.max(1, n))) },
  { key: "on", kind: "on", color: "#22d3ee", fn: (n) => n },
  { key: "onlogn", kind: "onlogn", color: "#a78bfa", fn: (n) => (n < 1 ? 0 : n * Math.log2(Math.max(1, n))) },
  { key: "on2", kind: "on2", color: "#f59e0b", fn: (n) => n * n },
];

const minN = 1;
const maxN = 10;

export default function BigOCombinedStepperPlot() {
  const [n, setN] = useState(5);

  const model = useMemo(() => {
    const width = 760;
    const height = 320;
    const left = 48;
    const right = 20;
    const top = 16;
    const bottom = 38;
    const plotW = width - left - right;
    const plotH = height - top - bottom;
    const yMax = 20;

    const xToSvg = (x: number) => left + (x / maxN) * plotW;
    const yToSvg = (y: number) => {
      const clipped = Math.min(y, yMax);
      return top + plotH - (clipped / yMax) * plotH;
    };

    const paths = curves.map((curve) => {
      let d = "";
      let started = false;
      let prevX = 0;
      let prevY = curve.fn(0);

      for (let x = 0; x <= maxN; x += 1) {
        const y = curve.fn(x);

        if (y <= yMax) {
          d += `${started ? " L" : "M"} ${xToSvg(x)} ${yToSvg(y)}`;
          started = true;
          prevX = x;
          prevY = y;
          continue;
        }

        if (started) {
          const dy = y - prevY;
          const dx = x - prevX;
          const ratio = dy === 0 ? 0 : (yMax - prevY) / dy;
          const xHit = prevX + ratio * dx;
          d += ` L ${xToSvg(xHit)} ${yToSvg(yMax)}`;
        } else {
          d += `M ${xToSvg(x)} ${yToSvg(yMax)}`;
        }
        break;
      }

      return { key: curve.key, d, color: curve.color };
    });

    const yTicks = Array.from({ length: Math.floor(yMax / 5) + 1 }, (_, i) => i * 5);

    return { width, height, left, right, top, bottom, plotH, xToSvg, yToSvg, paths, yTicks };
  }, []);

  const step = (delta: number) => {
    setN((prev) => Math.min(maxN, Math.max(minN, prev + delta)));
  };

  return (
    <div className="glass-panel rounded-2xl p-4">
      <div className="grid gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={n <= minN}
            className="rounded-lg border border-white/15 px-3 py-1.5 text-sm text-white disabled:opacity-40"
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={n >= maxN}
            className="rounded-lg border border-white/15 px-3 py-1.5 text-sm text-white disabled:opacity-40"
          >
            Next
          </button>
          <label className="ml-2 text-sm text-[color:var(--color-muted)]">
            <span className="text-cyan-300">n</span> = <span className="text-white">{n}</span>
          </label>
          <input
            type="range"
            min={minN}
            max={maxN}
            step={1}
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
            className="w-full max-w-sm"
          />
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[color:var(--color-muted)]">
          {curves.map((curve) => (
            <div key={curve.key} className="inline-flex items-center gap-2">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: curve.color }}
              />
              <BigONotation kind={curve.kind} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 overflow-x-auto">
        <svg viewBox={`0 0 ${model.width} ${model.height}`} className="h-[320px] min-w-[760px] w-full">
          {model.yTicks.map((tick) => {
            const y = model.yToSvg(tick);
            return (
              <line
                key={`gy-${tick}`}
                x1={model.left}
                y1={y}
                x2={model.width - model.right}
                y2={y}
                stroke="rgba(148,163,184,0.16)"
                strokeWidth="1"
              />
            );
          })}

          {Array.from({ length: maxN + 1 }, (_, i) => i).map((tick) => (
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

          {model.paths.map((path) => (
            <path key={path.key} d={path.d} fill="none" stroke={path.color} strokeWidth="2.2" />
          ))}

          {curves.map((curve) => {
            const rawY = curve.fn(n);
            if (rawY >= 20) return null;
            const x = model.xToSvg(n);
            const y = model.yToSvg(rawY);
            return <circle key={`dot-${curve.key}`} cx={x} cy={y} r={5} fill="#f472b6" />;
          })}

          {Array.from({ length: maxN + 1 }, (_, i) => i).map((tick) => (
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

          {model.yTicks.map((tick) => (
            <text
              key={`yt-${tick}`}
              x={model.left - 8}
              y={model.yToSvg(tick) + 4}
              textAnchor="end"
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
          <text x={12} y={model.top + 2} className="text-[12px]">
            <tspan fill="rgba(231,238,248,0.8)">T(</tspan>
            <tspan fill="#22d3ee">n</tspan>
            <tspan fill="rgba(231,238,248,0.8)">)</tspan>
          </text>
        </svg>
      </div>
    </div>
  );
}
