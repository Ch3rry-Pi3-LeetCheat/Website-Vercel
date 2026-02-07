import type { Metadata } from "next";
import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import CollapsibleExample from "@/components/CollapsibleExample";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import SketchDiagram from "@/components/SketchDiagram";

const pageTitle = "Python Dataframes 101";
const pageDescription =
  "Create your first pandas dataframe, inspect its structure, and build intuition for tabular data workflows.";

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

export default function DataframesPage() {
  const tocItems = [
    { id: "introduction", label: "Introduction" },
    { id: "intuition", label: "Intuition" },
    { id: "diagram", label: "Diagram: Table view" },
    { id: "example-1", label: "Example 1: From a dictionary" },
    { id: "example-2", label: "Example 2: From records" },
    { id: "example-3", label: "Example 3: Inspect structure" },
  ];

  return (
    <ArticleLayout
      eyebrow="Python Programming"
      title="Create your first dataframe"
      description="Dataframes show up in almost every data interview and ML workflow. Here we build one, inspect it, and validate the structure before analysis."
      tocItems={tocItems}
    >
      <InfoPanel id="introduction" title="Introduction" variant="intro">
        <p>
          A dataframe is a two-dimensional table with rows and columns. It is
          the standard structure for data analysis in Python because it mirrors
          how data arrives from CSV files, SQL queries, or APIs.
        </p>
        <p>
          In interviews, you&apos;ll be expected to create, inspect, and transform
          dataframes confidently. The fastest way to earn trust is to show you
          can build the table and verify it before doing any calculations.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          Think of a dataframe like a spreadsheet: columns are labeled, rows
          are records, and every operation is a question about rows, columns,
          or both.
        </p>
        <p>
          The key habit is validation. You create the dataframe, check its
          shape and types, then move on. That rhythm prevents silent bugs when
          the data scales.
        </p>
      </InfoPanel>

      <div id="diagram" className="scroll-mt-28">
        <SketchDiagram
          title="Sketch: dataframe layout"
          variant="table"
          caption="Rows are records, columns are features. Most operations slice one or both."
        />
      </div>

      <CollapsibleExample
        id="example-1"
        title="Example 1: Create from a dictionary"
        defaultOpen
      >
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Step by step: start with a dictionary where keys are column names and
          values are lists. Pandas lines up each list into a column to build the
          table instantly.
        </p>
        <CodeBlock code={createCode} title="Python" />
        <OutputBlock output={createOutput} />
      </CollapsibleExample>

      <CollapsibleExample id="example-2" title="Example 2: Build from records">
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Step by step: when data arrives as individual records, put each row
          in a dictionary, collect them into a list, and let pandas stitch them
          together with <span className="font-mono inline-code">from_records</span>.
        </p>
        <CodeBlock code={rowsCode} title="Python" />
        <OutputBlock output={rowsOutput} />
      </CollapsibleExample>

      <CollapsibleExample id="example-3" title="Example 3: Inspect structure">
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Step by step: check the dataframe&apos;s shape to confirm rows and
          columns, inspect dtypes to ensure numeric vs text columns are correct,
          then preview the first rows to sanity-check your data.
        </p>
        <CodeBlock code={inspectCode} title="Python" />
        <OutputBlock output={inspectOutput} />
      </CollapsibleExample>
    </ArticleLayout>
  );
}
