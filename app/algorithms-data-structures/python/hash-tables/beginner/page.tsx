import Link from "next/link";
import { hashTablesBeginnerLessons } from "@/lib/adsBeginnerTopics";

export default function HashTablesBeginnerPage() {
  return (
    <div className="px-6 pb-20 pt-12">
      <div className="mx-auto w-full max-w-5xl">
        <header className="grid gap-4">
          <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--color-accent-2)]">
            Algorithms - Python - Hash Tables
          </p>
          <h1 className="text-4xl font-semibold text-white font-[var(--font-display)]">
            Hash tables beginner ladder
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-[color:var(--color-muted)]">
            Learn dictionary basics, counting patterns, and the classic
            two-sum trick.
          </p>
        </header>

        <div className="mt-10 grid gap-4">
          {hashTablesBeginnerLessons.map((lesson) => (
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
