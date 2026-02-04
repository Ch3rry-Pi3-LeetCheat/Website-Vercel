import type { Metadata } from "next";
import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";
import OutputBlock from "@/components/OutputBlock";

const pageTitle = "Dataframe Slicing for Interview Questions";
const pageDescription =
  "A rigorous walkthrough of row filters, column selection, and safe indexing patterns in pandas.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
};

const setupCode = `import pandas as pd

rows = [
    {"candidate": "Ava", "score": 88, "stage": "phone", "language": "Python"},
    {"candidate": "Ben", "score": 92, "stage": "onsite", "language": "Java"},
    {"candidate": "Chen", "score": 79, "stage": "phone", "language": "Python"},
    {"candidate": "Dina", "score": 96, "stage": "onsite", "language": "Python"},
    {"candidate": "Eli", "score": 85, "stage": "screen", "language": "Go"},
]

df = pd.DataFrame(rows)
df`;

const setupOutput = `  candidate  score   stage language
0       Ava     88   phone   Python
1       Ben     92  onsite     Java
2      Chen     79   phone   Python
3      Dina     96  onsite   Python
4       Eli     85  screen       Go`;

const columnsCode = `df[["candidate", "score"]]`;

const columnsOutput = `  candidate  score
0       Ava     88
1       Ben     92
2      Chen     79
3      Dina     96
4       Eli     85`;

const filterCode = `df[df["score"] >= 90]`;

const filterOutput = `  candidate  score   stage language
1       Ben     92  onsite     Java
3      Dina     96  onsite   Python`;

const locCode = `df.loc[df["language"] == "Python", ["candidate", "score"]]`;

const locOutput = `  candidate  score
0       Ava     88
2      Chen     79
3      Dina     96`;

const ilocCode = `df.iloc[:3, :2]`;

const ilocOutput = `  candidate  score
0       Ava     88
1       Ben     92
2      Chen     79`;

const interviewCode = `top_python = (
    df[df["language"] == "Python"]
      .sort_values("score", ascending=False)
      .head(2)
      .reset_index(drop=True)
)

top_python`;

const interviewOutput = `  candidate  score   stage language
0      Dina     96  onsite   Python
1       Ava     88   phone   Python`;

const safeAssignCode = `df.loc[df["stage"] == "phone", "score"] += 2
df[["candidate", "score", "stage"]]`;

const safeAssignOutput = `  candidate  score   stage
0       Ava     90   phone
1       Ben     92  onsite
2      Chen     81   phone
3      Dina     96  onsite
4       Eli     85  screen`;

export default function DataframeSlicingPage() {
  return (
    <div className="px-6 pb-20 pt-12">
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.45fr]">
        <article className="grid gap-10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
            <Link href="/topics" className="hover:text-white">
              Topics
            </Link>
            <span>/</span>
            <Link href="/topics/python-programming" className="hover:text-white">
              Python Programming
            </Link>
          </div>

          <header className="grid gap-4">
            <h1 className="text-4xl font-semibold text-white font-[var(--font-display)] md:text-5xl">
              Dataframe slicing for interview questions
            </h1>
            <p className="max-w-2xl text-lg leading-7 text-[color:var(--color-muted)]">
              This article shows how to slice pandas dataframes with confidence:
              select columns, filter rows, and use <span className="font-mono text-white">loc</span>/
              <span className="font-mono text-white">iloc</span> safely. These
              are the exact patterns you will reach for in coding interviews.
            </p>
          </header>

          <section className="grid gap-4">
            <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
              1. Create a clean starter dataframe
            </h2>
            <p className="text-sm leading-6 text-[color:var(--color-muted)]">
              Use a list of records so each row is explicit. This mirrors how
              data arrives from APIs or SQL queries and keeps the schema clear.
            </p>
            <CodeBlock code={setupCode} title="Python" />
            <OutputBlock output={setupOutput} />
          </section>

          <section className="grid gap-4">
            <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
              2. Select columns explicitly
            </h2>
            <p className="text-sm leading-6 text-[color:var(--color-muted)]">
              In interviews, always be explicit about the columns you need.
              This prevents accidental leakage of data and improves clarity.
            </p>
            <CodeBlock code={columnsCode} title="Python" />
            <OutputBlock output={columnsOutput} />
          </section>

          <section className="grid gap-4">
            <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
              3. Filter rows with boolean masks
            </h2>
            <p className="text-sm leading-6 text-[color:var(--color-muted)]">
              Boolean masks are the core slicing tool. They read like a SQL
              <span className="ml-1 font-mono text-white">WHERE</span> clause.
            </p>
            <CodeBlock code={filterCode} title="Python" />
            <OutputBlock output={filterOutput} />
          </section>

          <section className="grid gap-4">
            <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
              4. Use loc and iloc for safe indexing
            </h2>
            <p className="text-sm leading-6 text-[color:var(--color-muted)]">
              <span className="font-mono text-white">loc</span> uses labels and
              boolean masks; <span className="font-mono text-white">iloc</span>{" "}
              uses integer positions. Interviewers love when you choose the
              appropriate one and explain why.
            </p>
            <CodeBlock code={locCode} title="Python" />
            <OutputBlock output={locOutput} />
            <CodeBlock code={ilocCode} title="Python" />
            <OutputBlock output={ilocOutput} />
          </section>

          <section className="grid gap-4">
            <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
              5. Interview pattern: top scorers in Python
            </h2>
            <p className="text-sm leading-6 text-[color:var(--color-muted)]">
              Combine filters with sorting to answer typical LeetCode-style
              data questions. Make the output deterministic and index-reset so
              it reads cleanly.
            </p>
            <CodeBlock code={interviewCode} title="Python" />
            <OutputBlock output={interviewOutput} />
          </section>

          <section className="grid gap-4">
            <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
              6. Safe assignment without chained indexing
            </h2>
            <p className="text-sm leading-6 text-[color:var(--color-muted)]">
              Avoid chained indexing because it can create silent copies. Use
              <span className="ml-1 font-mono text-white">loc</span> when you
              need to update values in place.
            </p>
            <CodeBlock code={safeAssignCode} title="Python" />
            <OutputBlock output={safeAssignOutput} />
          </section>

          <section className="grid gap-4 rounded-3xl border border-white/10 bg-[color:var(--color-surface-2)] px-6 py-6">
            <h3 className="text-xl font-semibold text-white">Key takeaways</h3>
            <ul className="grid gap-2 text-sm text-[color:var(--color-muted)]">
              <li>Prefer explicit column lists when slicing.</li>
              <li>Use boolean masks for rows and explain them clearly.</li>
              <li>Reach for loc/iloc depending on labels vs positions.</li>
              <li>Reset indexes after sorting for clean outputs.</li>
              <li>Use loc for assignment to avoid silent copy bugs.</li>
            </ul>
          </section>
        </article>

        <aside className="grid gap-6">
          <div className="glass-panel rounded-2xl px-5 py-5">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
              Article stats
            </p>
            <div className="mt-4 grid gap-3 text-sm text-[color:var(--color-muted)]">
              <div className="flex items-center justify-between">
                <span>Reading time</span>
                <span className="text-white">18 min</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Skill level</span>
                <span className="text-white">Beginner</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Track</span>
                <span className="text-white">Python Programming</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[color:var(--color-surface)] px-5 py-5 text-sm text-[color:var(--color-muted)]">
            <h3 className="text-base font-semibold text-white">
              Why this matters in interviews
            </h3>
            <p className="mt-3 leading-6">
              Many data questions are really slicing problems disguised as
              business requirements. If you can explain each mask and selection
              step, you will earn clarity points quickly.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
