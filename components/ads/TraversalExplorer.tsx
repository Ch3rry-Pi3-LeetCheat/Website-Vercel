"use client";

import { useMemo, useState } from "react";

type TraversalNode = {
  id: string;
  label: string;
  x: number;
  y: number;
};

type TraversalEdge = {
  from: string;
  to: string;
};

type TraversalStep = {
  title: string;
  explanation: string;
  current?: string;
  visited: string[];
  frontier?: string[];
};

type TraversalExplorerProps = {
  title: string;
  subtitle: string;
  nodes: TraversalNode[];
  edges: TraversalEdge[];
  steps: TraversalStep[];
};

function nodeById(nodes: TraversalNode[], id: string) {
  return nodes.find((node) => node.id === id);
}

export default function TraversalExplorer({
  title,
  subtitle,
  nodes,
  edges,
  steps,
}: TraversalExplorerProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const step = steps[stepIndex];

  const visitedSet = useMemo(() => new Set(step.visited), [step.visited]);

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
          <svg viewBox="0 0 360 220" className="h-[240px] w-full">
            {edges.map((edge) => {
              const from = nodeById(nodes, edge.from);
              const to = nodeById(nodes, edge.to);
              if (!from || !to) return null;
              return (
                <line
                  key={`${edge.from}-${edge.to}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="rgba(203,213,225,0.35)"
                  strokeWidth="2"
                />
              );
            })}

            {nodes.map((node) => {
              const isCurrent = step.current === node.id;
              const isVisited = visitedSet.has(node.id);
              const fill = isCurrent
                ? "rgba(251,191,36,0.95)"
                : isVisited
                ? "rgba(16,185,129,0.9)"
                : "rgba(148,163,184,0.22)";
              const stroke = isCurrent
                ? "rgba(251,191,36,1)"
                : isVisited
                ? "rgba(16,185,129,1)"
                : "rgba(148,163,184,0.45)";

              return (
                <g key={node.id}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={20}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={2}
                  />
                  <text
                    x={node.x}
                    y={node.y + 5}
                    textAnchor="middle"
                    className="fill-white text-sm font-semibold"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <p className="text-sm font-semibold text-white">{step.title}</p>
          <p className="mt-1 text-sm leading-6 text-[color:var(--color-muted)]">
            {step.explanation}
          </p>

          <div className="mt-3 grid gap-2">
            <div className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2">
              <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
                Visited order
              </p>
              <p className="mt-1 font-mono text-sm text-cyan-200">
                {step.visited.length ? step.visited.join(" -> ") : "(none)"}
              </p>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2">
              <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
                Frontier (queue/stack)
              </p>
              <p className="mt-1 font-mono text-sm text-emerald-200">
                {step.frontier?.length ? step.frontier.join(" , ") : "(empty)"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-3 text-xs text-[color:var(--color-muted)]">
        Step {stepIndex + 1} of {steps.length}
      </p>
    </div>
  );
}

export type { TraversalNode, TraversalEdge, TraversalStep };
