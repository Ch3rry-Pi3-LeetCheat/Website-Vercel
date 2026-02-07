import Link from "next/link";

const tracks = [
  {
    title: "Beginner",
    description:
      "Start with the smallest possible chat model and learn how to inspect and work with responses.",
    href: "/llms/langchain/beginner",
  },
];

export default function LangChainPage() {
  return (
    <div className="px-6 pb-20 pt-12">
      <div className="mx-auto w-full max-w-5xl">
        <header className="grid gap-4">
          <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--color-accent-2)]">
            LLMs - LangChain
          </p>
          <h1 className="text-4xl font-semibold text-white font-[var(--font-display)]">
            Learn LangChain from the ground up
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-[color:var(--color-muted)]">
            This track focuses on small, clear examples that show exactly what
            LangChain returns and how to work with it as plain Python data.
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
