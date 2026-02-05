"use client";

import { useEffect, useMemo, useState } from "react";

type TocItem = {
  id: string;
  label: string;
  level?: 1 | 2;
};

type ArticleTocProps = {
  items: TocItem[];
};

export default function ArticleToc({ items }: ArticleTocProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const itemIds = useMemo(() => items.map((item) => item.id), [items]);

  useEffect(() => {
    const elements = itemIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) {
      return;
    }

    let ticking = false;

    const updateActive = () => {
      if (ticking) {
        return;
      }
      ticking = true;
      window.requestAnimationFrame(() => {
        const offset = 140;
        let current = elements[0];
        for (const el of elements) {
          const top = el.getBoundingClientRect().top;
          if (top - offset <= 0) {
            current = el;
          }
        }
        setActiveId(current.id);
        ticking = false;
      });
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);

    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [itemIds]);

  return (
    <div className="glass-panel rounded-2xl px-5 py-5">
      <p className="text-xs uppercase tracking-[0.35em] text-[color:var(--color-muted)]">
        On this page
      </p>
      <nav className="mt-4 grid gap-2 text-sm">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`rounded-md px-2 py-1 transition ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-[color:var(--color-muted)] hover:text-white"
              } ${item.level === 2 ? "ml-3 text-[13px]" : ""}`}
              aria-current={isActive ? "true" : undefined}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
