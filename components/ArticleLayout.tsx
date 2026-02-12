import type { ReactNode } from "react";
import ArticleToc from "@/components/ArticleToc";

type TocItem = {
  id: string;
  label: string;
  level?: 1 | 2;
};

type ArticleLayoutProps = {
  eyebrow: string;
  title: string;
  description: string;
  tocItems: TocItem[];
  rightRail?: ReactNode;
  children: ReactNode;
};

export default function ArticleLayout({
  eyebrow,
  title,
  description,
  tocItems,
  rightRail,
  children,
}: ArticleLayoutProps) {
  const hasRightRail = Boolean(rightRail);
  const gridClass = hasRightRail
    ? "lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start lg:gap-12 2xl:grid-cols-[280px_minmax(0,1fr)_260px]"
    : "lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start lg:gap-12";
  const maxWidthClass = hasRightRail
    ? "max-w-[1440px] 2xl:max-w-[1560px]"
    : "max-w-[1320px] 2xl:max-w-[1440px]";

  return (
    <div className="px-4 pb-20 pt-12 sm:px-6 lg:px-10">
      <div className={`mx-auto w-full ${maxWidthClass} ${gridClass}`}>
        <aside className="hidden lg:sticky lg:top-28 lg:block lg:h-fit lg:self-start">
          <ArticleToc items={tocItems} />
        </aside>

        <div className="min-w-0">
          <header className="grid gap-4">
            <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--color-accent-2)]">
              {eyebrow}
            </p>
            <h1 className="text-4xl font-semibold text-white font-[var(--font-display)]">
              {title}
            </h1>
            <p className="max-w-3xl text-base leading-7 text-[color:var(--color-muted)]">
              {description}
            </p>
          </header>

          <section className="mt-10 grid gap-6">{children}</section>
        </div>

        {rightRail ? (
          <aside className="hidden 2xl:sticky 2xl:top-28 2xl:block 2xl:h-fit 2xl:self-start">
            {rightRail}
          </aside>
        ) : null}
      </div>
    </div>
  );
}
