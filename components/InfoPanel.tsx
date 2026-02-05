import type { ReactNode } from "react";

type InfoPanelProps = {
  id: string;
  title: string;
  variant: "intro" | "intuition";
  children: ReactNode;
};

export default function InfoPanel({
  id,
  title,
  variant,
  children,
}: InfoPanelProps) {
  const panelClass =
    variant === "intro" ? "intro-panel" : "intuition-panel";

  return (
    <div id={id} className={`${panelClass} scroll-mt-28 rounded-2xl px-6 py-6`}>
      <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
        {title}
      </h2>
      <div className="mt-3 grid gap-3 text-base leading-7 text-[color:var(--color-muted)]">
        {children}
      </div>
    </div>
  );
}
