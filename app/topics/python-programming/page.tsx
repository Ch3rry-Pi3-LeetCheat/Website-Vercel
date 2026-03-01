import Link from "next/link";

const articles = [
  {
    title: "DataFrames 101 roadmap",
    description:
      "LeetCode-style pandas skill map with grouped lessons and progression.",
    href: "/topics/python-programming/dataframes",
    duration: "12 min",
    level: "Beginner",
  },
  {
    title: "Creating DataFrames",
    description:
      "Build dataframes from column lists, row records, and tuple input safely.",
    href: "/topics/python-programming/dataframes/creating-dataframes",
    duration: "20 min",
    level: "Beginner",
  },
  {
    title: "Inspection basics",
    description:
      "Read shape, head(), and dtypes quickly before writing transformation logic.",
    href: "/topics/python-programming/dataframes/inspection-basics",
    duration: "16 min",
    level: "Beginner",
  },
  {
    title: "Selecting and filtering",
    description:
      "Row masks, column selection, and loc/iloc patterns for interview-style tasks.",
    href: "/topics/python-programming/dataframes/selecting-and-filtering",
    duration: "24 min",
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
          <p className="max-w-2xl text-base leading-7 text-[color:var(--color-muted)]">
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
              <p className="mt-2 text-base leading-7 text-[color:var(--color-muted)]">
                {article.description}
              </p>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}
