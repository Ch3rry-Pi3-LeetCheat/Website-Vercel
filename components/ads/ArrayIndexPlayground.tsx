"use client";

import { useMemo, useState } from "react";

type ArrayIndexPlaygroundProps = {
  values: number[];
};

export default function ArrayIndexPlayground({ values }: ArrayIndexPlaygroundProps) {
  const [rawIndex, setRawIndex] = useState("0");

  const options = useMemo(() => {
    const positive = values.map((_, i) => i);
    const negative = values.map((_, i) => -(i + 1));
    return [...positive, ...negative];
  }, [values]);

  const parsed = Number(rawIndex);
  const resolvedIndex = parsed < 0 ? values.length + parsed : parsed;
  const isValid = Number.isInteger(parsed) && resolvedIndex >= 0 && resolvedIndex < values.length;
  const output = isValid ? values[resolvedIndex] : "invalid index";

  return (
    <div className="glass-panel rounded-2xl p-4 md:p-5">
      <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
        Interactive
      </p>
      <h3 className="text-lg font-semibold text-white font-[var(--font-display)]">
        Index reader playground
      </h3>
      <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">
        Select an index and read the output instantly. Positive and negative
        indexing are both included.
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <label className="text-sm text-white" htmlFor="index-select">
          Index
        </label>
        <select
          id="index-select"
          value={rawIndex}
          onChange={(e) => setRawIndex(e.target.value)}
          className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white outline-none"
        >
          {options.map((option) => (
            <option key={option} value={option} className="bg-[#0b1220] text-white">
              {option}
            </option>
          ))}
        </select>
        <span className="rounded-md border border-cyan-300/30 bg-cyan-300/10 px-2 py-1 text-xs text-cyan-100">
          resolved index: {isValid ? resolvedIndex : "invalid"}
        </span>
      </div>

      <div className="mt-4 overflow-x-auto">
        <div className="inline-flex rounded-lg border border-white/20 bg-white/[0.02]">
          {values.map((value, i) => (
            <div
              key={`${value}-${i}`}
              className={`w-14 border-r border-white/20 px-2 py-2 text-center font-mono text-sm last:border-r-0 md:w-16 ${
                i === resolvedIndex && isValid
                  ? "bg-cyan-400/20 text-cyan-100"
                  : "text-[color:var(--color-muted)]"
              }`}
            >
              {value}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-2 overflow-x-auto">
        <div className="inline-flex">
          {values.map((_, i) => (
            <div key={`idx-${i}`} className="w-14 text-center text-xs text-white/50 md:w-16">
              {i}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm">
        <span className="text-[color:var(--color-muted)] font-mono">
          nums[{rawIndex}] =
        </span>{" "}
        <span className="font-mono text-white">{output}</span>
      </div>
    </div>
  );
}

