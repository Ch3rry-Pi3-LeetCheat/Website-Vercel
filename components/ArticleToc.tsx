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
    const getScrollTop = () =>
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    const updateActive = () => {
      if (ticking) {
        return;
      }
      ticking = true;
      window.requestAnimationFrame(() => {
        const offset = 160;
        const scrollPosition = getScrollTop() + offset;
        const sorted = [...elements].sort(
          (a, b) =>
            a.getBoundingClientRect().top - b.getBoundingClientRect().top
        );
        let current = sorted[0];

        for (const el of sorted) {
          const top = el.getBoundingClientRect().top + getScrollTop();
          if (top <= scrollPosition) {
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
    document.addEventListener("scroll", updateActive, {
      passive: true,
      capture: true,
    });
    const observer = new IntersectionObserver(updateActive, {
      rootMargin: "-30% 0px -55% 0px",
      threshold: 0,
    });
    elements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
      document.removeEventListener("scroll", updateActive, true);
      observer.disconnect();
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
