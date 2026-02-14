import type { ReactNode } from "react";

type InfoPanelProps = {
  id: string;
  title: string;
  variant: "intro" | "intuition";
  headingLevel?: 2 | 3;
  children: ReactNode;
};

export default function InfoPanel({
  id,
  title,
  variant,
  headingLevel = 2,
  children,
}: InfoPanelProps) {
  const panelClass =
    variant === "intro" ? "intro-panel" : "intuition-panel";
  const headingClass =
    headingLevel === 3
      ? "text-lg font-semibold text-white font-[var(--font-display)]"
      : "text-2xl font-semibold text-white font-[var(--font-display)]";

  return (
    <div id={id} className={`${panelClass} scroll-mt-28 rounded-2xl px-6 py-6`}>
      {headingLevel === 3 ? (
        <h3 className={headingClass}>{title}</h3>
      ) : (
        <h2 className={headingClass}>{title}</h2>
      )}
      <div className="mt-3 grid gap-3 text-base leading-7 text-[color:var(--color-muted)]">
        {children}
      </div>
    </div>
  );
}
