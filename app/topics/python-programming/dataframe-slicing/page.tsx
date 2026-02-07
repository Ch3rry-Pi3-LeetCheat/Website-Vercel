import type { Metadata } from "next";
import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import CollapsibleExample from "@/components/CollapsibleExample";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import SketchDiagram from "@/components/SketchDiagram";

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
  const tocItems = [
    { id: "introduction", label: "Introduction" },
    { id: "intuition", label: "Intuition" },
    { id: "diagram", label: "Diagram: Slice mindset" },
    { id: "example-1", label: "Example 1: Starter dataframe" },
    { id: "example-2", label: "Example 2: Select columns" },
    { id: "example-3", label: "Example 3: Filter rows" },
    { id: "example-4", label: "Example 4: loc vs iloc" },
    { id: "example-5", label: "Example 5: Top scorers" },
    { id: "example-6", label: "Example 6: Safe assignment" },
    { id: "takeaways", label: "Key takeaways" },
  ];

  return (
    <ArticleLayout
      eyebrow="Python Programming"
      title="Dataframe slicing for interview questions"
      description="This guide shows how to slice pandas dataframes with confidence: select columns, filter rows, and use loc/iloc safely. These are the exact patterns you will reach for in interviews."
      tocItems={tocItems}
    >
      <InfoPanel id="introduction" title="Introduction" variant="intro">
        <p>
          Dataframe slicing is about extracting exactly the rows and columns you
          need without disturbing the rest of the table. This is the foundation
          for almost every real-world data task.
        </p>
        <p>
          Interview questions often disguise slicing as “filter the data” or
          “find the top candidates.” If you can explain each slice, you can
          explain the solution.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          Think of the dataframe as a grid. Slicing is choosing which rows and
          columns to keep visible. You can use row masks, column lists, or both.
        </p>
        <p>
          Your mental model should be: “Filter rows first, then select the
          columns that matter.” That keeps logic clear and output readable.
        </p>
      </InfoPanel>

      <div id="diagram" className="scroll-mt-28">
        <SketchDiagram
          title="Sketch: slicing a table"
          variant="table"
          caption="Row filters + column selection are the two levers you pull."
        />
      </div>

      <CollapsibleExample
        id="example-1"
        title="Example 1: Create a clean starter dataframe"
        defaultOpen
      >
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Step by step: build a list of records so each row is explicit. This
          mirrors real data sources and gives you a clean schema to slice.
        </p>
        <CodeBlock code={setupCode} title="Python" />
        <OutputBlock output={setupOutput} />
      </CollapsibleExample>

      <CollapsibleExample id="example-2" title="Example 2: Select columns">
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Step by step: list the columns you want in a new order. This makes
          your intent explicit and avoids accidental leakage of unused data.
        </p>
        <CodeBlock code={columnsCode} title="Python" />
        <OutputBlock output={columnsOutput} />
      </CollapsibleExample>

      <CollapsibleExample id="example-3" title="Example 3: Filter rows with masks">
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Step by step: build a boolean mask that reads like a SQL WHERE clause,
          then apply it to the dataframe to keep only the rows that match.
        </p>
        <CodeBlock code={filterCode} title="Python" />
        <OutputBlock output={filterOutput} />
      </CollapsibleExample>

      <CollapsibleExample id="example-4" title="Example 4: Use loc and iloc safely">
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Step by step: use{" "}
          <span className="font-mono inline-code">loc</span> when selecting by
          labels or masks, and{" "}
          <span className="font-mono inline-code">iloc</span> when selecting by
          integer position. Choosing the right one signals clarity.
        </p>
        <CodeBlock code={locCode} title="Python" />
        <OutputBlock output={locOutput} />
        <CodeBlock code={ilocCode} title="Python" />
        <OutputBlock output={ilocOutput} />
      </CollapsibleExample>

      <CollapsibleExample id="example-5" title="Example 5: Top scorers in Python">
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Step by step: filter down to Python candidates, sort by score, and
          take the top results. Resetting the index gives you a clean final
          table.
        </p>
        <CodeBlock code={interviewCode} title="Python" />
        <OutputBlock output={interviewOutput} />
      </CollapsibleExample>

      <CollapsibleExample id="example-6" title="Example 6: Safe assignment">
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Step by step: use{" "}
          <span className="font-mono inline-code">loc</span> for assignment to
          avoid chained indexing. That keeps your updates applied in place.
        </p>
        <CodeBlock code={safeAssignCode} title="Python" />
        <OutputBlock output={safeAssignOutput} />
      </CollapsibleExample>

      <div
        id="takeaways"
        className="scroll-mt-28 rounded-3xl border border-white/10 bg-[color:var(--color-surface-2)] px-6 py-6"
      >
        <h3 className="text-xl font-semibold text-white">Key takeaways</h3>
        <ul className="mt-3 grid gap-2 text-sm text-[color:var(--color-muted)]">
          <li>Prefer explicit column lists when slicing.</li>
          <li>Use boolean masks for rows and explain them clearly.</li>
          <li>Reach for loc/iloc depending on labels vs positions.</li>
          <li>Reset indexes after sorting for clean outputs.</li>
          <li>Use loc for assignment to avoid silent copy bugs.</li>
        </ul>
      </div>
    </ArticleLayout>
  );
}
