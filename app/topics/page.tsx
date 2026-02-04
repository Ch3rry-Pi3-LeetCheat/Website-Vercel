import Link from "next/link";

const tracks = [
  {
    title: "Python Programming",
    description:
      "Foundations, data handling, and the coding patterns that appear in interviews.",
    href: "/topics/python-programming",
    status: "Active",
  },
  {
    title: "Machine Learning",
    description:
      "From fundamentals to deployment workflows for modern ML systems.",
    href: "/topics/machine-learning",
    status: "Coming soon",
  },
  {
    title: "LLMs & Agents",
    description:
      "Prompting, retrieval, evaluation, and production-grade agent patterns.",
    href: "/topics/llms",
    status: "Coming soon",
  },
];

export default function TopicsPage() {
  return (
    <div className="px-6 pb-20 pt-12">
      <div className="mx-auto w-full max-w-5xl">
        <header className="grid gap-4">
          <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--color-accent-2)]">
            Knowledge Library
          </p>
          <h1 className="text-4xl font-semibold text-white font-[var(--font-display)]">
            Deep, article-driven learning paths
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-[color:var(--color-muted)]">
            Each track is built as a sequence of rigorous articles that connect
            interview problems with production-ready thinking.
          </p>
        </header>

        <div className="mt-10 grid gap-4">
          {tracks.map((track) => (
            <Link
              key={track.title}
              href={track.href}
              className="glass-panel rounded-2xl px-6 py-6 transition hover:border-white/30"
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
                <span>{track.status}</span>
                <span>Track</span>
              </div>
              <h2 className="mt-4 text-xl font-semibold text-white">
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
