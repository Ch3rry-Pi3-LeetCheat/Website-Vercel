"use client";

import { useMemo, useState } from "react";

type LeakageItem = {
  column: string;
  canUseAtPrediction: boolean;
  reason: string;
};

type LeakageCheckQuizProps = {
  items: LeakageItem[];
};

type Choice = "yes" | "no";

export default function LeakageCheckQuiz({ items }: LeakageCheckQuizProps) {
  const initial = useMemo(
    () =>
      Object.fromEntries(items.map((item) => [item.column, "yes"])) as Record<
        string,
        Choice
      >,
    [items]
  );

  const [choices, setChoices] = useState<Record<string, Choice>>(initial);
  const [checked, setChecked] = useState(false);

  const score = items.filter((item) => {
    const expected: Choice = item.canUseAtPrediction ? "yes" : "no";
    return choices[item.column] === expected;
  }).length;

  return (
    <div className="glass-panel rounded-2xl p-4 md:p-6">
      <p className="text-sm leading-6 text-[color:var(--color-muted)]">
        For each column, answer: <span className="text-white">known at prediction time?</span>
      </p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm text-[color:var(--color-muted)]">
          <thead>
            <tr className="border-b border-white/10">
              <th className="py-2 pr-4 text-white">Column</th>
              <th className="py-2 pr-4 text-white">Your answer</th>
              <th className="py-2 text-white">Why</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const expected: Choice = item.canUseAtPrediction ? "yes" : "no";
              const isCorrect = choices[item.column] === expected;
              return (
                <tr key={item.column} className="border-b border-white/10">
                  <td className="py-2 pr-4 font-mono text-[color:var(--color-accent-2)]">
                    {item.column}
                  </td>
                  <td className="py-2 pr-4">
                    <select
                      value={choices[item.column]}
                      onChange={(event) =>
                        setChoices((prev) => ({
                          ...prev,
                          [item.column]: event.target.value as Choice,
                        }))
                      }
                      className="rounded-md border border-white/20 bg-slate-900 px-2 py-1 text-sm text-white"
                    >
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                    {checked ? (
                      <span
                        className={`ml-2 text-xs font-semibold ${
                          isCorrect ? "text-emerald-400" : "text-rose-400"
                        }`}
                      >
                        {isCorrect ? "Correct" : `Should be ${expected}`}
                      </span>
                    ) : null}
                  </td>
                  <td className="py-2">{item.reason}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setChecked(true)}
          className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40"
        >
          Check
        </button>
        <button
          type="button"
          onClick={() => {
            setChoices(initial);
            setChecked(false);
          }}
          className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40"
        >
          Reset
        </button>
        {checked ? (
          <p className="text-sm text-[color:var(--color-muted)]">
            Score: <span className="text-white font-semibold">{score}/{items.length}</span>
          </p>
        ) : null}
      </div>
    </div>
  );
}
