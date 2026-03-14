import Link from "next/link";
import { mathematicsTracks } from "@/lib/mathTopics";

export default function MathematicsRootPage() {
  return (
    <div className="px-6 pb-20 pt-12">
      <div className="mx-auto w-full max-w-5xl">
        <header className="grid gap-4">
          <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--color-accent-2)]">
            Mathematics
          </p>
          <h1 className="text-4xl font-semibold text-white font-[var(--font-display)]">
            Mathematical foundations for technical problem solving
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-[color:var(--color-muted)]">
            Learn the math the same way the rest of the site is taught:
            structured, article-driven, and sequenced so later ideas rest on
            solid earlier ones.
          </p>
        </header>

        <div className="mt-10 grid gap-4">
          {mathematicsTracks.map((track) => (
            <Link
              key={track.href}
              href={track.href}
              className="glass-panel rounded-2xl px-6 py-6 transition hover:border-white/30"
            >
              <h2 className="text-xl font-semibold text-white">{track.label}</h2>
              <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">
                {track.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-8 glass-panel rounded-2xl px-6 py-6">
          <h2 className="text-lg font-semibold text-white">How this section will work</h2>
          <ul className="mt-3 grid list-disc list-inside gap-2 text-sm text-[color:var(--color-muted)]">
            <li>Each track is broken into phases so concepts build in the right order.</li>
            <li>Each lesson is a standalone article, not a dense chapter dump.</li>
            <li>We start with first principles and add abstraction only when it is earned.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
