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
  title: "Selecting and Filtering DataFrames",
  description:
    "Interview-focused walkthrough of row filters, column slices, and safe loc/iloc usage in pandas.",
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

export default function SelectingFilteringPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "intro", label: "Introduction" },
    { id: "intuition", label: "Core intuition" },
    { id: "diagram", label: "Slice mindset" },
    { id: "example-setup", label: "Starter dataframe" },
    { id: "example-columns", label: "Select columns" },
    { id: "example-filter", label: "Filter rows" },
    { id: "example-loc-iloc", label: "loc vs iloc" },
    { id: "example-top", label: "Top scorers pattern" },
    { id: "example-safe-assign", label: "Safe assignment" },
    { id: "summary", label: "Summary" },
  ];

  return (
    <ArticleLayout
      eyebrow="Python Programming - DataFrames"
      title="Selecting and Filtering"
      description="This lesson is built around the exact slicing patterns you use in beginner dataframe interview questions."
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[{ title: "Within DataFrames", links: pythonDataframeLessons }]}
          activeHref="/topics/python-programming/dataframes/selecting-and-filtering"
        />
      }
    >
      <InfoPanel id="intro" title="Introduction" variant="intro">
        <p>
          Slicing means selecting specific rows and columns without mutating the
          rest of the table. Most interview prompts in pandas reduce to this.
        </p>
        <p>
          The goal is clear, explainable selection logic: filter rows first, then
          keep only the columns needed for the final answer.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Core intuition" variant="intuition">
        <p>
          Think in two independent levers: row selection and column selection.
          Every query is one lever or a composition of both.
        </p>
        <p>
          Use boolean masks for row logic, explicit lists for columns, and{" "}
          <span className="font-mono inline-code">loc</span> when you need both
          together in one readable statement.
        </p>
      </InfoPanel>

      <div id="diagram" className="scroll-mt-28">
        <SketchDiagram
          title="Sketch: slicing a table"
          variant="table"
          caption="Row masks plus column lists are the two core slicing tools."
        />
      </div>

      <CollapsibleExample id="example-setup" title="Example 1: Build a starter dataframe" defaultOpen>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We use one table so every slicing pattern can be compared directly.
        </p>
        <CodeBlock code={setupCode} title="Python" />
        <OutputBlock output={setupOutput} />
      </CollapsibleExample>

      <CollapsibleExample id="example-columns" title="Example 2: Select columns">
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Pass an explicit list of columns to keep output focused and predictable.
        </p>
        <CodeBlock code={columnsCode} title="Python" />
        <OutputBlock output={columnsOutput} />
      </CollapsibleExample>

      <CollapsibleExample id="example-filter" title="Example 3: Filter rows with a boolean mask">
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Build conditions that read like a SQL WHERE clause, then apply the mask
          directly to the dataframe.
        </p>
        <CodeBlock code={filterCode} title="Python" />
        <OutputBlock output={filterOutput} />
      </CollapsibleExample>

      <CollapsibleExample id="example-loc-iloc" title="Example 4: Use loc and iloc intentionally">
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Use <span className="font-mono inline-code">loc</span> for label and
          mask-based selection. Use <span className="font-mono inline-code">iloc</span>{" "}
          for integer position slicing.
        </p>
        <CodeBlock code={locCode} title="Python" />
        <OutputBlock output={locOutput} />
        <CodeBlock code={ilocCode} title="Python" />
        <OutputBlock output={ilocOutput} />
      </CollapsibleExample>

      <CollapsibleExample id="example-top" title="Example 5: Top scorers pattern">
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This is a common interview sequence: filter, sort, take top-k, then
          reset index for clean output.
        </p>
        <CodeBlock code={interviewCode} title="Python" />
        <OutputBlock output={interviewOutput} />
      </CollapsibleExample>

      <CollapsibleExample id="example-safe-assign" title="Example 6: Safe assignment with loc">
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Prefer <span className="font-mono inline-code">loc</span> for in-place
          updates to avoid chained indexing ambiguity.
        </p>
        <CodeBlock code={safeAssignCode} title="Python" />
        <OutputBlock output={safeAssignOutput} />
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
                <td className="py-2">State the row rule clearly before writing mask code.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">&#9989;</td>
                <td className="py-2">Select only needed columns for readable interview outputs.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">&#9989;</td>
                <td className="py-2">Use <span className="font-mono inline-code">loc</span> for safe assignment and combined row+column targeting.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </ArticleLayout>
  );
}
