import Link from "next/link";

const tracks = [
  {
    title: "LangChain",
    description:
      "Build practical LLM workflows with a focus on chat models, tools, and production-ready patterns.",
    href: "/llms/langchain",
  },
];

export default function LlmRootPage() {
  return (
    <div className="px-6 pb-20 pt-12">
      <div className="mx-auto w-full max-w-5xl">
        <header className="grid gap-4">
          <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--color-accent-2)]">
            LLMs
          </p>
          <h1 className="text-4xl font-semibold text-white font-[var(--font-display)]">
            Practical large language model workflows
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-[color:var(--color-muted)]">
            Start from clean, beginner-friendly foundations and build toward
            production-grade LLM systems with real code and clear outputs.
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
