import Link from "next/link";

const articles = [
  {
    title: "Dataframe slicing for interview questions",
    description:
      "Row filters, column selection, and safe indexing patterns you can explain under pressure.",
    href: "/topics/python-programming/dataframe-slicing",
    duration: "20 min",
    level: "Beginner",
  },
];

export default function PythonProgrammingPage() {
  return (
    <div className="px-6 pb-20 pt-12">
      <div className="mx-auto w-full max-w-5xl">
        <header className="grid gap-4">
          <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--color-accent-2)]">
            Python Programming
          </p>
          <h1 className="text-4xl font-semibold text-white font-[var(--font-display)]">
            Foundations and interview-ready patterns
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-[color:var(--color-muted)]">
            Deep dives into the Python patterns that show up in technical
            interviews, data problems, and ML workflows.
          </p>
        </header>

        <section className="mt-10 grid gap-4">
          {articles.map((article) => (
            <Link
              key={article.href}
              href={article.href}
              className="glass-panel rounded-2xl px-6 py-6 transition hover:border-white/30"
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
                <span>{article.level}</span>
                <span>{article.duration}</span>
              </div>
              <h2 className="mt-4 text-xl font-semibold text-white">
                {article.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">
                {article.description}
              </p>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}
