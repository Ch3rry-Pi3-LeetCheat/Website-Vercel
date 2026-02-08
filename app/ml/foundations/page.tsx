import Link from "next/link";
import { mlFoundationsLessons } from "@/lib/mlTopics";

export default function MlFoundationsPage() {
  return (
    <div className="px-6 pb-20 pt-12">
      <div className="mx-auto w-full max-w-5xl">
        <header className="grid gap-4">
          <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--color-accent-2)]">
            ML - Foundations
          </p>
          <h1 className="text-4xl font-semibold text-white font-[var(--font-display)]">
            Foundations ladder
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-[color:var(--color-muted)]">
            Build the mental model first: what ML is, how data is split,
            and how we measure performance.
          </p>
        </header>

        <div className="mt-10 grid gap-4">
          {mlFoundationsLessons.map((lesson) => (
            <Link
              key={lesson.href}
              href={lesson.href}
              className="glass-panel rounded-2xl px-6 py-6 transition hover:border-white/30"
            >
              <h2 className="text-xl font-semibold text-white">
                {lesson.label}
              </h2>
              <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">
                {lesson.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
