import type { Metadata } from "next";
import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import CollapsibleExample from "@/components/CollapsibleExample";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
import { pythonDataframeLessons } from "@/lib/pythonTopics";

export const metadata: Metadata = {
  title: "DataFrame Inspection Basics",
  description:
    "Interview-first guide to dataframe inspection: shape, head(), dtypes, and quick structural checks.",
};

const setupCode = `import pandas as pd

df = pd.DataFrame([
    {"candidate": "Ava", "score": 88, "stage": "phone", "language": "Python"},
    {"candidate": "Ben", "score": 92, "stage": "onsite", "language": "Java"},
    {"candidate": "Chen", "score": 79, "stage": "phone", "language": "Python"},
    {"candidate": "Dina", "score": 96, "stage": "onsite", "language": "Python"},
    {"candidate": "Eli", "score": 85, "stage": "screen", "language": "Go"},
])

df`;

const setupOutput = `  candidate  score   stage language
0       Ava     88   phone   Python
1       Ben     92  onsite     Java
2      Chen     79   phone   Python
3      Dina     96  onsite   Python
4       Eli     85  screen       Go`;

const sizeCode = `df.shape
len(df)`;

const sizeOutput = `(5, 4)
5`;

const headCode = `df.head(3)`;

const headOutput = `  candidate  score   stage language
0       Ava     88   phone   Python
1       Ben     92  onsite     Java
2      Chen     79   phone   Python`;

const dtypesCode = `df.dtypes`;

const dtypesOutput = `candidate    object
score         int64
stage        object
language     object
dtype: object`;

const checklistCode = `assert df.shape[1] == 4
assert "score" in df.columns
assert df["score"].dtype == "int64"`;

export default function InspectionBasicsPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "intro", label: "Introduction" },
    { id: "intuition", label: "Core intuition" },
    { id: "setup", label: "Starter dataset" },
    { id: "size", label: "Get dataframe size" },
    { id: "head", label: "Display first three rows" },
    { id: "dtypes", label: "Check dtypes" },
    { id: "checklist", label: "Quick validation checklist" },
    { id: "summary", label: "Summary" },
  ];

  return (
    <ArticleLayout
      eyebrow="Python Programming - DataFrames"
      title="Inspection Basics"
      description="Inspection skills help you verify structure fast. In interviews, these checks prevent incorrect assumptions before filtering or aggregation."
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[{ title: "Within DataFrames", links: pythonDataframeLessons }]}
          activeHref="/topics/python-programming/dataframes/inspection-basics"
        />
      }
    >
      <InfoPanel id="intro" title="Introduction" variant="intro">
        <p>
          Before solving any dataframe problem, inspect the table. This takes
          seconds and often reveals the exact reason buggy code fails.
        </p>
        <p>
          Two of the most common beginner prompts are <span className="text-white">get the size</span> and{" "}
          <span className="text-white">display the first three rows</span>. We
          cover both in this lesson.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Core intuition" variant="intuition">
        <p>
          Think of inspection as schema verification: How many rows? How many
          columns? What are the types? What does the top of the table look like?
        </p>
        <p>
          If you answer those four questions first, your later transformations
          become much safer and easier to explain.
        </p>
      </InfoPanel>

      <CollapsibleExample id="setup" title="Example 1: Build a starter dataframe" defaultOpen>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We will use one small dataframe throughout so the inspection outputs are
          easy to compare.
        </p>
        <CodeBlock code={setupCode} title="Python" />
        <OutputBlock output={setupOutput} />
      </CollapsibleExample>

      <CollapsibleExample id="size" title="Example 2: Get the size of a dataframe">
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          <span className="font-mono inline-code">shape</span> returns{" "}
          <span className="font-mono inline-code">(rows, columns)</span>. Use{" "}
          <span className="font-mono inline-code">len(df)</span> if you only need
          row count.
        </p>
        <CodeBlock code={sizeCode} title="Python" />
        <OutputBlock output={sizeOutput} />
      </CollapsibleExample>

      <CollapsibleExample id="head" title="Example 3: Display the first three rows">
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Use <span className="font-mono inline-code">head(3)</span> to quickly
          verify value formats and spot malformed rows.
        </p>
        <CodeBlock code={headCode} title="Python" />
        <OutputBlock output={headOutput} />
      </CollapsibleExample>

      <CollapsibleExample id="dtypes" title="Example 4: Verify column data types">
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Type mismatches are a common interview pitfall. Check them early with{" "}
          <span className="font-mono inline-code">dtypes</span>.
        </p>
        <CodeBlock code={dtypesCode} title="Python" />
        <OutputBlock output={dtypesOutput} />
      </CollapsibleExample>

      <section id="checklist" className="scroll-mt-28 grid gap-3">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Quick validation checklist
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          In notebooks or scripts, short assertions make your assumptions explicit.
        </p>
        <CodeBlock code={checklistCode} title="Python" />
      </section>

      <section id="summary" className="scroll-mt-28 grid gap-3">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Summary
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr>
                <td className="w-12 py-2 text-center text-lg">&#9989;</td>
                <td className="py-2">Use <span className="font-mono inline-code">shape</span> for full size and <span className="font-mono inline-code">len(df)</span> for row count.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">&#9989;</td>
                <td className="py-2">Use <span className="font-mono inline-code">head(3)</span> to inspect early rows quickly.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">&#9989;</td>
                <td className="py-2">Read <span className="font-mono inline-code">dtypes</span> before any numeric operations or casting.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </ArticleLayout>
  );
}
