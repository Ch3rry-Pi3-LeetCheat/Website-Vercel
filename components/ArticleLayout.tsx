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
  children: ReactNode;
};

export default function ArticleLayout({
  eyebrow,
  title,
  description,
  tocItems,
  children,
}: ArticleLayoutProps) {
  return (
    <div className="px-4 pb-20 pt-12 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-[1400px] 2xl:max-w-[1520px] lg:grid lg:grid-cols-[280px_1fr] lg:items-start lg:gap-12">
        <aside className="hidden lg:sticky lg:top-28 lg:block lg:h-fit lg:self-start">
          <ArticleToc items={tocItems} />
        </aside>

        <div>
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
      </div>
    </div>
  );
}
