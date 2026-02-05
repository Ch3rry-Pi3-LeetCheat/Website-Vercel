"use client";

import type { ReactNode } from "react";

type CollapsibleExampleProps = {
  id: string;
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

export default function CollapsibleExample({
  id,
  title,
  children,
  defaultOpen = false,
}: CollapsibleExampleProps) {
  return (
    <details
      id={id}
      className="example-panel scroll-mt-28 rounded-2xl"
      open={defaultOpen}
    >
      <summary className="example-summary">
        <span className="text-xl font-semibold text-white font-[var(--font-display)]">
          {title}
        </span>
        <span className="example-chevron">▾</span>
      </summary>
      <div className="grid gap-4 px-6 pb-6 pt-1">{children}</div>
    </details>
  );
}
