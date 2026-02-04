import Link from "next/link";

const tracks = [
  {
    title: "Python",
    description:
      "Core data structures with Python-first explanations and interview patterns.",
    href: "/algorithms-data-structures/python",
  },
];

export default function AlgorithmsRootPage() {
  return (
    <div className="px-6 pb-20 pt-12">
      <div className="mx-auto w-full max-w-5xl">
        <header className="grid gap-4">
          <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--color-accent-2)]">
            Algorithms & Data Structures
          </p>
          <h1 className="text-4xl font-semibold text-white font-[var(--font-display)]">
            Build the fundamentals that power interviews
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-[color:var(--color-muted)]">
            Choose a language track and dive into structured lessons for each
            data structure, complete with patterns, pitfalls, and interview
            framing.
          </p>
        </header>

        <div className="mt-10 grid gap-4">
          {tracks.map((track) => (
            <Link
              key={track.href}
              href={track.href}
              className="glass-panel rounded-2xl px-6 py-6 transition hover:border-white/30"
            >
              <h2 className="text-xl font-semibold text-white">
                {track.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">
                {track.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
