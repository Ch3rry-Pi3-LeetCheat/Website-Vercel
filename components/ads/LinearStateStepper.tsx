"use client";

import { useMemo, useState } from "react";

type LinearStep = {
  title: string;
  explanation: string;
  values: Array<string | number>;
  highlightIndices?: number[];
  pointers?: Array<{ index: number; label: string }>;
};

type LinearStateStepperProps = {
  title: string;
  subtitle: string;
  steps: LinearStep[];
  indexLabels?: Array<string | number>;
  showArrowsBetweenCells?: boolean;
  cellLayout?: "grid" | "contiguous";
};

function Cell({
  value,
  highlighted,
}: {
  value: string | number;
  highlighted: boolean;
}) {
  return (
    <div
      className={`rounded-xl border px-2 py-3 text-center font-mono text-sm md:text-base ${
        highlighted
          ? "border-cyan-300/70 bg-cyan-400/15 text-cyan-100"
          : "border-white/15 bg-white/5 text-[color:var(--color-muted)]"
      }`}
    >
      {value}
    </div>
  );
}

export default function LinearStateStepper({
  title,
  subtitle,
  steps,
  indexLabels,
  showArrowsBetweenCells = false,
  cellLayout = "grid",
}: LinearStateStepperProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const step = steps[stepIndex];
  const indices = useMemo(
    () => indexLabels ?? step.values.map((_, i) => i),
    [indexLabels, step.values]
  );

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

      <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <p className="text-sm font-semibold text-white">{step.title}</p>
        <p className="mt-1 text-sm leading-6 text-[color:var(--color-muted)]">
          {step.explanation}
        </p>

        {cellLayout === "contiguous" && !showArrowsBetweenCells ? (
          <>
            <div className="mt-4 overflow-x-auto">
              <div className="inline-flex rounded-lg border border-white/20 bg-white/[0.02]">
                {step.values.map((value, i) => {
                  const highlighted = step.highlightIndices?.includes(i) ?? false;
                  return (
                    <div
                      key={`value-${i}`}
                      className={`w-14 border-r border-white/20 px-2 py-2 text-center font-mono text-sm last:border-r-0 md:w-16 ${
                        highlighted
                          ? "bg-cyan-400/20 text-cyan-100"
                          : "text-[color:var(--color-muted)]"
                      }`}
                    >
                      {value}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-2 overflow-x-auto">
              <div className="inline-flex">
                {indices.map((label, i) => (
                  <div
                    key={`index-${i}`}
                    className="w-14 text-center text-xs text-white/50 md:w-16"
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mt-4 overflow-x-auto">
              <div
                className="grid min-w-[380px] items-center gap-2"
                style={{
                  gridTemplateColumns: showArrowsBetweenCells
                    ? `repeat(${step.values.length * 2 - 1}, minmax(0, 1fr))`
                    : `repeat(${step.values.length}, minmax(0, 1fr))`,
                }}
              >
                {step.values.map((value, i) => {
                  const highlighted = step.highlightIndices?.includes(i) ?? false;
                  return (
                    <div
                      key={`value-${i}`}
                      className={showArrowsBetweenCells ? "contents" : ""}
                    >
                      <Cell value={value} highlighted={highlighted} />
                      {showArrowsBetweenCells && i < step.values.length - 1 ? (
                        <div className="text-center text-white/60">-&gt;</div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-2 overflow-x-auto">
              <div
                className="grid min-w-[380px] gap-2"
                style={{
                  gridTemplateColumns: `repeat(${step.values.length}, minmax(0, 1fr))`,
                }}
              >
                {indices.map((label, i) => (
                  <div
                    key={`index-${i}`}
                    className="text-center text-xs text-white/50"
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {step.pointers?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {step.pointers.map((pointer) => (
              <span
                key={`${pointer.label}-${pointer.index}`}
                className="rounded-md border border-cyan-300/30 bg-cyan-300/10 px-2 py-1 text-xs text-cyan-100"
              >
                {pointer.label} at index {pointer.index}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <p className="mt-3 text-xs text-[color:var(--color-muted)]">
        Step {stepIndex + 1} of {steps.length}
      </p>
    </div>
  );
}

export type { LinearStep };
