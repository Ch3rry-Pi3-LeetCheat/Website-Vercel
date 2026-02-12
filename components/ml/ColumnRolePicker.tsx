"use client";

import { useMemo, useState } from "react";

type Role = "feature" | "label" | "ignore";

type ColumnRolePickerProps = {
  columns: { name: string; answer: Role; hint: string }[];
};

const ROLE_LABELS: Record<Role, string> = {
  feature: "Feature",
  label: "Label",
  ignore: "Ignore",
};

export default function ColumnRolePicker({ columns }: ColumnRolePickerProps) {
  const initialSelections = useMemo(
    () =>
      Object.fromEntries(columns.map((column) => [column.name, "feature"])) as Record<
        string,
        Role
      >,
    [columns]
  );

  const [selections, setSelections] = useState<Record<string, Role>>(initialSelections);
  const [checked, setChecked] = useState(false);

  const correctCount = columns.filter(
    (column) => selections[column.name] === column.answer
  ).length;

  return (
    <div className="glass-panel rounded-2xl p-4 md:p-6">
      <p className="text-sm leading-6 text-[color:var(--color-muted)]">
        Assign each column as <span className="math-x">Feature</span>,{" "}
        <span className="math-y">Label</span>, or <span className="text-white">Ignore</span>.
      </p>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm text-[color:var(--color-muted)]">
          <thead>
            <tr className="border-b border-white/10">
              <th className="py-2 pr-4 text-white">Column</th>
              <th className="py-2 pr-4 text-white">Your role</th>
              <th className="py-2 text-white">Hint</th>
            </tr>
          </thead>
          <tbody>
            {columns.map((column) => {
              const isCorrect = selections[column.name] === column.answer;
              return (
                <tr key={column.name} className="border-b border-white/10">
                  <td className="py-2 pr-4 font-mono text-[color:var(--color-accent-2)]">
                    {column.name}
                  </td>
                  <td className="py-2 pr-4">
                    <select
                      value={selections[column.name]}
                      onChange={(event) =>
                        setSelections((prev) => ({
                          ...prev,
                          [column.name]: event.target.value as Role,
                        }))
                      }
                      className="rounded-md border border-white/20 bg-slate-900 px-2 py-1 text-sm text-white"
                    >
                      <option value="feature">{ROLE_LABELS.feature}</option>
                      <option value="label">{ROLE_LABELS.label}</option>
                      <option value="ignore">{ROLE_LABELS.ignore}</option>
                    </select>
                    {checked ? (
                      <span
                        className={`ml-2 text-xs font-semibold ${
                          isCorrect ? "text-emerald-400" : "text-rose-400"
                        }`}
                      >
                        {isCorrect ? "Correct" : `Use ${ROLE_LABELS[column.answer]}`}
                      </span>
                    ) : null}
                  </td>
                  <td className="py-2">{column.hint}</td>
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
          Check answers
        </button>
        <button
          type="button"
          onClick={() => {
            setSelections(initialSelections);
            setChecked(false);
          }}
          className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40"
        >
          Reset
        </button>
        {checked ? (
          <p className="text-sm text-[color:var(--color-muted)]">
            Score:{" "}
            <span className="text-white font-semibold">
              {correctCount}/{columns.length}
            </span>
          </p>
        ) : null}
      </div>
    </div>
  );
}
