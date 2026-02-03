import Link from "next/link";

const tutorials = [
  {
    title: "Python Dataframes 101",
    description: "Create a dataframe, inspect structure, and verify outputs.",
    href: "/tutorials/python/dataframes",
    level: "Beginner",
  },
];

export default function TutorialsPage() {
  return (
    <div className="px-6 pb-20 pt-12">
      <div className="mx-auto w-full max-w-5xl">
        <header className="grid gap-4">
          <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--color-accent-2)]">
            Tutorials
          </p>
          <h1 className="text-4xl font-semibold text-white font-[var(--font-display)]">
            Start learning
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-[color:var(--color-muted)]">
            Hands-on guides that explain the why, show the code, and validate
            the output so learners build intuition fast.
          </p>
        </header>

        <div className="mt-10 grid gap-4">
          {tutorials.map((tutorial) => (
            <Link
              key={tutorial.href}
              href={tutorial.href}
              className="glass-panel rounded-2xl px-6 py-6 transition hover:border-white/30"
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
                <span>{tutorial.level}</span>
                <span>Python</span>
              </div>
              <h2 className="mt-4 text-xl font-semibold text-white">
                {tutorial.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">
                {tutorial.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
