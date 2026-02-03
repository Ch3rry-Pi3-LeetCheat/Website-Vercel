import Link from "next/link";

const pythonTutorials = [
  {
    title: "Python Dataframes 101",
    description: "Create, inspect, and validate a dataframe.",
    href: "/tutorials/python/dataframes",
  },
];

export default function PythonTutorialsPage() {
  return (
    <div className="px-6 pb-20 pt-12">
      <div className="mx-auto w-full max-w-5xl">
        <header className="grid gap-4">
          <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--color-accent-2)]">
            Python Track
          </p>
          <h1 className="text-4xl font-semibold text-white font-[var(--font-display)]">
            Core Python lessons
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-[color:var(--color-muted)]">
            Focused Python tutorials that feed directly into data interviews,
            systems design walkthroughs, and ML workflows.
          </p>
        </header>

        <div className="mt-10 grid gap-4">
          {pythonTutorials.map((tutorial) => (
            <Link
              key={tutorial.href}
              href={tutorial.href}
              className="glass-panel rounded-2xl px-6 py-6 transition hover:border-white/30"
            >
              <h2 className="text-xl font-semibold text-white">
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
