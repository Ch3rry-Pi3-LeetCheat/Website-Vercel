import Link from "next/link";
import { heapsBeginnerLessons } from "@/lib/adsBeginnerTopics";

export default function HeapsBeginnerPage() {
  return (
    <div className="px-6 pb-20 pt-12">
      <div className="mx-auto w-full max-w-5xl">
        <header className="grid gap-4">
          <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--color-accent-2)]">
            Algorithms - Python - Heaps
          </p>
          <h1 className="text-4xl font-semibold text-white font-[var(--font-display)]">
            Heaps beginner ladder
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-[color:var(--color-muted)]">
            Heaps power priority queues and top-k queries with fast
            access to the smallest element.
          </p>
        </header>

        <div className="mt-10 grid gap-4">
          {heapsBeginnerLessons.map((lesson) => (
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
