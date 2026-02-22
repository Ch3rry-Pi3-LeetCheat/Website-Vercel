"use client";

import { useState } from "react";

type HeapStep = {
  title: string;
  explanation: string;
  heap: Array<number | string>;
  focusIndices?: number[];
};

type HeapStateStepperProps = {
  title: string;
  subtitle: string;
  steps: HeapStep[];
};

const NODE_POSITIONS = [
  { x: 180, y: 30 },
  { x: 100, y: 95 },
  { x: 260, y: 95 },
  { x: 60, y: 160 },
  { x: 140, y: 160 },
  { x: 220, y: 160 },
  { x: 300, y: 160 },
];

const EDGES = [
  [0, 1],
  [0, 2],
  [1, 3],
  [1, 4],
  [2, 5],
  [2, 6],
];

export default function HeapStateStepper({
  title,
  subtitle,
  steps,
}: HeapStateStepperProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const step = steps[stepIndex];

  return (
    <div className="glass-panel rounded-2xl p-4 md:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
            Interactive
          </p>
          <h3 className="text-lg font-semibold text-white font-[var(--font-display)]">
            {title}
          </h3>
        </div>
        <div className="inline-flex items-center gap-2">
          <button
            type="button"
            className="rounded-lg border border-white/20 bg-white/5 px-3 py-1 text-sm text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            onClick={() => setStepIndex((prev) => Math.max(prev - 1, 0))}
            disabled={stepIndex === 0}
          >
            Prev
          </button>
          <button
            type="button"
            className="rounded-lg border border-white/20 bg-white/5 px-3 py-1 text-sm text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            onClick={() =>
              setStepIndex((prev) => Math.min(prev + 1, steps.length - 1))
            }
            disabled={stepIndex === steps.length - 1}
          >
            Next
          </button>
        </div>
      </div>

      <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">
        {subtitle}
      </p>

      <div className="mt-4 grid gap-3 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <svg viewBox="0 0 360 210" className="h-[230px] w-full">
            {EDGES.map(([parent, child]) => {
              if (
                parent >= step.heap.length ||
                child >= step.heap.length ||
                step.heap[parent] === "..." ||
                step.heap[child] === "..."
              ) {
                return null;
              }
              const p = NODE_POSITIONS[parent];
              const c = NODE_POSITIONS[child];
              return (
                <line
                  key={`${parent}-${child}`}
                  x1={p.x}
                  y1={p.y}
                  x2={c.x}
                  y2={c.y}
                  stroke="rgba(203,213,225,0.35)"
                  strokeWidth="2"
                />
              );
            })}

            {step.heap.slice(0, NODE_POSITIONS.length).map((value, i) => {
              if (value === "...") return null;
              const pos = NODE_POSITIONS[i];
              const focused = step.focusIndices?.includes(i) ?? false;
              return (
                <g key={`node-${i}`}>
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={18}
                    fill={focused ? "rgba(56,189,248,0.9)" : "rgba(148,163,184,0.22)"}
                    stroke={focused ? "rgba(56,189,248,1)" : "rgba(148,163,184,0.45)"}
                    strokeWidth={2}
                  />
                  <text
                    x={pos.x}
                    y={pos.y + 5}
                    textAnchor="middle"
                    className="fill-white text-sm font-semibold"
                  >
                    {value}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="mt-2 overflow-x-auto">
            <div
              className="grid min-w-[460px] gap-2"
              style={{
                gridTemplateColumns: `repeat(${step.heap.length}, minmax(0, 1fr))`,
              }}
            >
              {step.heap.map((value, i) => {
                const focused = step.focusIndices?.includes(i) ?? false;
                return (
                  <div
                    key={`arr-${i}`}
                    className={`rounded-lg border px-2 py-2 text-center font-mono text-sm ${
                      focused
                        ? "border-cyan-300/70 bg-cyan-400/15 text-cyan-100"
                        : "border-white/10 bg-white/[0.02] text-[color:var(--color-muted)]"
                    }`}
                  >
                    {value}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <p className="text-sm font-semibold text-white">{step.title}</p>
          <p className="mt-1 text-sm leading-6 text-[color:var(--color-muted)]">
            {step.explanation}
          </p>
        </div>
      </div>

      <p className="mt-3 text-xs text-[color:var(--color-muted)]">
        Step {stepIndex + 1} of {steps.length}
      </p>
    </div>
  );
}

export type { HeapStep };
