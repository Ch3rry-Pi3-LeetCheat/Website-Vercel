import type { Metadata } from "next";
import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import CollapsibleExample from "@/components/CollapsibleExample";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
import SketchDiagram from "@/components/SketchDiagram";
import { pythonDataframeLessons } from "@/lib/pythonTopics";

export const metadata: Metadata = {
  title: "Creating DataFrames (Interview Basics)",
  description:
    "Learn the key pandas dataframe creation patterns used in beginner interview questions.",
};

const fromColumnsCode = `import pandas as pd

data = {
    "name": ["Ava", "Ben", "Chen"],
    "role": ["Analyst", "Engineer", "PM"],
    "score": [88, 92, 79],
}

df = pd.DataFrame(data)
df`;

const fromColumnsOutput = `   name      role  score
0   Ava   Analyst     88
1   Ben  Engineer     92
2  Chen        PM     79`;

const fromRecordsCode = `rows = [
    {"city": "London", "visits": 120, "rating": 4.7},
    {"city": "Edinburgh", "visits": 54, "rating": 4.5},
    {"city": "Bristol", "visits": 88, "rating": 4.3},
]

df = pd.DataFrame.from_records(rows)
df`;

const fromRecordsOutput = `        city  visits  rating
0     London     120     4.7
1  Edinburgh      54     4.5
2    Bristol      88     4.3`;

const withColumnsCode = `pairs = [
    ("Ava", 88, "phone"),
    ("Ben", 92, "onsite"),
    ("Chen", 79, "phone"),
]

df = pd.DataFrame(pairs, columns=["candidate", "score", "stage"])
df`;

const withColumnsOutput = `  candidate  score   stage
0       Ava     88   phone
1       Ben     92  onsite
2      Chen     79   phone`;

const sanityCheckCode = `df.shape
df.head(3)`;

const sanityCheckOutput = `(3, 3)
  candidate  score   stage
0       Ava     88   phone
1       Ben     92  onsite
2      Chen     79   phone`;

export default function CreatingDataframesPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "intro", label: "Introduction" },
    { id: "intuition", label: "Core intuition" },
    { id: "diagram", label: "Table shape" },
    { id: "example-columns", label: "From column lists" },
    { id: "example-records", label: "From row records" },
    { id: "example-tuples", label: "From tuples + columns" },
    { id: "example-check", label: "Quick sanity check" },
    { id: "summary", label: "Summary" },
  ];

  return (
    <ArticleLayout
      eyebrow="Python Programming - DataFrames"
      title="Creating DataFrames"
      description="This lesson covers the three creation patterns that appear repeatedly in beginner dataframe interview problems."
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[{ title: "Within DataFrames", links: pythonDataframeLessons }]}
          activeHref="/topics/python-programming/dataframes/creating-dataframes"
        />
      }
    >
      <InfoPanel id="intro" title="Introduction" variant="intro">
        <p>
          Most dataframe interview prompts start with construction. If you can
          create a clean table from the given input format, the rest of the
          problem becomes straightforward.
        </p>
        <p>Here&apos;s the roadmap for this lesson:</p>
        <div className="ml-4 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 text-white font-semibold">Column-first input</td>
                <td className="py-2">When values are grouped by column name.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 text-white font-semibold">Row-first input</td>
                <td className="py-2">When values arrive as one dictionary per row.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 text-white font-semibold">Tuple rows</td>
                <td className="py-2">When you must assign column names manually.</td>
              </tr>
              <tr>
                <td className="w-56 py-2 pr-4 text-white font-semibold">Validation step</td>
                <td className="py-2">A fast shape and preview check before analysis.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </InfoPanel>

      <InfoPanel id="intuition" title="Core intuition" variant="intuition">
        <p>
          A dataframe is just a table with labeled columns. Creation problems are
          mostly about mapping the input shape to rows and columns correctly.
        </p>
        <p>
          In interviews, explain the input format first, then show the creation
          method that matches it. That demonstrates control, not memorization.
        </p>
      </InfoPanel>

      <div id="diagram" className="scroll-mt-28">
        <SketchDiagram
          title="Sketch: dataframe structure"
          variant="table"
          caption="Every creation pattern should lead to the same row/column mental model."
        />
      </div>

      <CollapsibleExample id="example-columns" title="Example 1: Build from column lists" defaultOpen>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Use this when the input is already grouped by columns. Keys become column
          names and each list becomes one column.
        </p>
        <CodeBlock code={fromColumnsCode} title="Python" />
        <OutputBlock output={fromColumnsOutput} />
      </CollapsibleExample>

      <CollapsibleExample id="example-records" title="Example 2: Build from row records">
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Use this when each item is one row dictionary. It mirrors data from APIs
          and JSON sources.
        </p>
        <CodeBlock code={fromRecordsCode} title="Python" />
        <OutputBlock output={fromRecordsOutput} />
      </CollapsibleExample>

      <CollapsibleExample id="example-tuples" title="Example 3: Build from tuples with explicit columns">
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          If the input is positional data, pass explicit{" "}
          <span className="font-mono inline-code">columns=[...]</span> to avoid
          unnamed numeric columns.
        </p>
        <CodeBlock code={withColumnsCode} title="Python" />
        <OutputBlock output={withColumnsOutput} />
      </CollapsibleExample>

      <CollapsibleExample id="example-check" title="Example 4: Quick sanity check before proceeding">
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Right after creation, confirm shape and preview a few rows. This habit
          prevents downstream mistakes.
        </p>
        <CodeBlock code={sanityCheckCode} title="Python" />
        <OutputBlock output={sanityCheckOutput} />
      </CollapsibleExample>

      <section id="summary" className="scroll-mt-28 grid gap-3">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Summary
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr>
                <td className="w-12 py-2 text-center text-lg">&#9989;</td>
                <td className="py-2">Choose dataframe creation based on input shape, not personal preference.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">&#9989;</td>
                <td className="py-2">Always assign explicit column names for tuple-based row data.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">&#9989;</td>
                <td className="py-2">Run a quick shape/head check before any filtering or transformation.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </ArticleLayout>
  );
}
