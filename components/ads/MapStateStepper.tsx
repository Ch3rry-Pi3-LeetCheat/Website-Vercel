"use client";

import { useState } from "react";

type MapStep = {
  title: string;
  explanation: string;
  currentInput: string;
  mapEntries: Array<{ key: string; value: string | number; highlighted?: boolean }>;
};

type MapStateStepperProps = {
  title: string;
  subtitle: string;
  steps: MapStep[];
};

export default function MapStateStepper({
  title,
  subtitle,
  steps,
}: MapStateStepperProps) {
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

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
            Current input
          </p>
          <p className="mt-2 font-mono text-base text-cyan-200">{step.currentInput}</p>
          <p className="mt-3 text-sm font-semibold text-white">{step.title}</p>
          <p className="mt-1 text-sm leading-6 text-[color:var(--color-muted)]">
            {step.explanation}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
            Map state
          </p>
          <div className="mt-2 grid gap-2">
            {step.mapEntries.length ? (
              step.mapEntries.map((entry) => (
                <div
                  key={`${entry.key}-${entry.value}`}
                  className={`grid grid-cols-[1fr_auto] items-center rounded-lg border px-3 py-2 text-sm ${
                    entry.highlighted
                      ? "border-emerald-300/40 bg-emerald-300/10"
                      : "border-white/10 bg-white/[0.02]"
                  }`}
                >
                  <span className="font-mono text-cyan-200">{entry.key}</span>
                  <span className="font-mono text-white">{entry.value}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-[color:var(--color-muted)]">
                Map is empty.
              </p>
            )}
          </div>
        </div>
      </div>

      <p className="mt-3 text-xs text-[color:var(--color-muted)]">
        Step {stepIndex + 1} of {steps.length}
      </p>
    </div>
  );
}

export type { MapStep };
