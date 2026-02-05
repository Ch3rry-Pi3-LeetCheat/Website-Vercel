import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";
import OutputBlock from "@/components/OutputBlock";
import RoadmapPreview from "@/components/RoadmapPreview";

const quickstartCode = `import pandas as pd

data = {
    "name": ["Ava", "Ben", "Chen"],
    "role": ["Analyst", "Engineer", "PM"],
    "score": [88, 92, 79],
}

df = pd.DataFrame(data)
df`;

const quickstartOutput = `    name      role  score
0    Ava   Analyst     88
1    Ben  Engineer     92
2   Chen        PM     79`;

const pillars = [
  {
    title: "Patterns first",
    description:
      "Understand the core data structures, algorithms, and design patterns that power interview questions.",
  },
  {
    title: "Build the system",
    description:
      "Learn how to take a notebook solution and ship it as a reliable service with clean architecture.",
  },
  {
    title: "AI in production",
    description:
      "Move from toy models to cloud-native ML pipelines with simple, practical guidance.",
  },
];

const statCards = [
  { label: "Guided lessons", value: "120+" },
  { label: "Practice drills", value: "300+" },
  { label: "System design maps", value: "40+" },
];

export default function HomePage() {
  return (
    <div>
      <section className="px-6 pt-16">
        <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="flex flex-col gap-6">
            <span className="w-fit rounded-full border border-white/15 bg-[color:var(--color-surface-2)] px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-[color:var(--color-accent-2)]">
              Leet-Cheat Beta
            </span>
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-6xl font-[var(--font-display)]">
              Interview-ready coding, systems design, and AI delivery in one
              focused platform.
            </h1>
            <p className="text-lg leading-7 text-[color:var(--color-muted)]">
              Master the patterns that show up in LeetCode interviews, then
              learn how to ship them as real services. Clear explanations,
              practical projects, and modern ML stacks.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/topics/python-programming/dataframes"
                className="rounded-full bg-[color:var(--color-accent)] px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-glow)] transition hover:brightness-110"
              >
                Start the Python track
              </Link>
              <Link
                href="/roadmap"
                className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40"
              >
                View roadmap
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {statCards.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-[color:var(--color-surface)] px-4 py-4 text-sm"
                >
                  <p className="text-2xl font-semibold text-white">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <RoadmapPreview />
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="glass-panel rounded-2xl px-6 py-6"
            >
              <h3 className="text-lg font-semibold text-white">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[color:var(--color-muted)]">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="flex flex-col gap-4">
            <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--color-accent-2)]">
              Starter tutorial
            </p>
            <h2 className="text-3xl font-semibold text-white font-[var(--font-display)]">
              Build your first dataframe in minutes.
            </h2>
            <p className="text-sm leading-6 text-[color:var(--color-muted)]">
              Each tutorial blends explanation, runnable snippets, and expected
              outputs so learners can move quickly from syntax to intuition.
            </p>
            <div className="grid gap-4">
              <CodeBlock code={quickstartCode} title="Python" />
              <OutputBlock output={quickstartOutput} />
            </div>
          </div>
          <div className="grid gap-4">
            <div className="glass-panel rounded-2xl px-6 py-6">
              <h3 className="text-lg font-semibold text-white">
                What you will learn
              </h3>
              <p className="mt-3 text-sm leading-6 text-[color:var(--color-muted)]">
                Create pandas dataframes, inspect their structure, and build the
                habit of validating outputs before you scale.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[color:var(--color-surface-2)] px-6 py-6">
              <h3 className="text-lg font-semibold text-white">
                Designed for interview prep and delivery work
              </h3>
              <p className="mt-3 text-sm leading-6 text-[color:var(--color-muted)]">
                We pair algorithmic patterns with cloud-ready system design so
                the knowledge sticks beyond the whiteboard.
              </p>
            </div>
            <Link
              href="/topics/python-programming/dataframes"
              className="rounded-2xl border border-white/15 bg-[color:var(--color-surface)] px-6 py-5 text-sm font-semibold text-white transition hover:border-white/40"
            >
              Read the full dataframe tutorial
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
