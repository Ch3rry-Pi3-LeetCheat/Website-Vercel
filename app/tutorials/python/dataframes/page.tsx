import type { Metadata } from "next";
import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";
import OutputBlock from "@/components/OutputBlock";

const pageTitle = "Python Dataframes 101";
const pageDescription =
  "Create your first pandas dataframe, validate its structure, and get ready for data interview problems.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
};

const createCode = `import pandas as pd

data = {
    "name": ["Ava", "Ben", "Chen"],
    "role": ["Analyst", "Engineer", "PM"],
    "score": [88, 92, 79],
}

df = pd.DataFrame(data)
df`;

const createOutput = `    name      role  score
0    Ava   Analyst     88
1    Ben  Engineer     92
2   Chen        PM     79`;

const rowsCode = `rows = [
    {"city": "London", "visits": 120, "rating": 4.7},
    {"city": "Edinburgh", "visits": 54, "rating": 4.5},
    {"city": "Bristol", "visits": 88, "rating": 4.3},
]

df = pd.DataFrame.from_records(rows)
df`;

const rowsOutput = `        city  visits  rating
0     London     120     4.7
1  Edinburgh      54     4.5
2    Bristol      88     4.3`;

const inspectCode = `df.shape
df.dtypes
df.head(2)`;

const inspectOutput = `(3, 3)
name      object
role      object
score      int64
dtype: object
    name      role  score
0    Ava   Analyst     88
1    Ben  Engineer     92`;

export default function DataframesTutorialPage() {
  return (
    <div className="px-6 pb-20 pt-12">
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
          <Link href="/tutorials" className="hover:text-white">
            Tutorials
          </Link>
          <span>/</span>
          <Link href="/tutorials/python" className="hover:text-white">
            Python
          </Link>
        </div>

        <header className="mt-6 grid gap-4">
          <h1 className="text-4xl font-semibold text-white md:text-5xl font-[var(--font-display)]">
            Create your first dataframe
          </h1>
          <p className="max-w-2xl text-lg leading-7 text-[color:var(--color-muted)]">
            Dataframes show up in almost every data interview and ML workflow.
            Let&apos;s build one, inspect it, and learn the commands you will
            reach for daily.
          </p>
        </header>

        <section className="mt-10 grid gap-6">
          <div className="rounded-2xl border border-white/10 bg-[color:var(--color-surface)] px-6 py-6 text-sm text-[color:var(--color-muted)]">
            Goal: create a dataframe from a dictionary, inspect its shape and
            types, and verify the first rows before you move on.
          </div>
        </section>

        <article className="mt-10 grid gap-12">
          <section className="grid gap-4">
            <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
              1. Create a dataframe from a dictionary
            </h2>
            <p className="text-sm leading-6 text-[color:var(--color-muted)]">
              The simplest starting point is a dictionary where keys are column
              names and values are lists. Pandas will align each list into a
              column automatically.
            </p>
            <CodeBlock code={createCode} title="Python" />
            <OutputBlock output={createOutput} />
          </section>

          <section className="grid gap-4">
            <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
              2. Build from a list of records
            </h2>
            <p className="text-sm leading-6 text-[color:var(--color-muted)]">
              If your data arrives as individual records, use
              <span className="ml-1 font-mono text-white">from_records</span> to
              assemble it quickly without manual restructuring.
            </p>
            <CodeBlock code={rowsCode} title="Python" />
            <OutputBlock output={rowsOutput} />
          </section>

          <section className="grid gap-4">
            <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
              3. Inspect the structure before you analyze
            </h2>
            <p className="text-sm leading-6 text-[color:var(--color-muted)]">
              Always confirm the shape, data types, and a sample of rows. This
              prevents silent bugs when you scale to larger datasets.
            </p>
            <CodeBlock code={inspectCode} title="Python" />
            <OutputBlock output={inspectOutput} />
          </section>
        </article>

        <section className="mt-12 grid gap-4 rounded-3xl border border-white/10 bg-[color:var(--color-surface-2)] px-6 py-6">
          <h3 className="text-xl font-semibold text-white">Next up</h3>
          <p className="text-sm leading-6 text-[color:var(--color-muted)]">
            We will clean columns, handle missing values, and build a quick
            feature engineering checklist you can reuse in interviews.
          </p>
          <Link
            href="/roadmap"
            className="w-fit rounded-full border border-white/15 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white transition hover:border-white/40"
          >
            View the roadmap
          </Link>
        </section>
      </div>
    </div>
  );
}
