import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import CollapsibleExample from "@/components/CollapsibleExample";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import SketchDiagram from "@/components/SketchDiagram";
import RightRail from "@/components/RightRail";
import { adsPythonTopics } from "@/lib/adsTopics";

const countCode = `events = ["api", "db", "api", "cache", "db", "api"]

counts = {}
for item in events:
    counts[item] = counts.get(item, 0) + 1

counts`;

const countOutput = `{'api': 3, 'db': 2, 'cache': 1}`;

const twoSumCode = `nums = [2, 7, 11, 15]
target = 9

seen = {}
pair = None

for i, value in enumerate(nums):
    complement = target - value
    if complement in seen:
        pair = (seen[complement], i)
        break
    seen[value] = i

pair`;

const twoSumOutput = `(0, 1)`;

export default function HashTablesPage() {
  const tocItems = [
    { id: "introduction", label: "Introduction" },
    { id: "intuition", label: "Intuition" },
    { id: "diagram", label: "Diagram: Hash buckets" },
    { id: "example-1", label: "Example 1: Count frequencies" },
    { id: "example-2", label: "Example 2: Two-sum lookup" },
  ];

  return (
    <ArticleLayout
      eyebrow="Hash Tables"
      title="Hash tables in Python"
      description="Dictionaries give you fast lookups. They power counting, indexing, and almost every classic interview pattern."
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Within Algorithms (Python)", links: adsPythonTopics },
          ]}
          activeHref="/algorithms-data-structures/python/hash-tables"
        />
      }
    >
      <InfoPanel id="introduction" title="Introduction" variant="intro">
        <p>
          A hash table stores key-value pairs so you can jump directly to the
          value by key. Python&apos;s dictionary is a hash table under the hood.
        </p>
        <p>
          Hash tables are your go-to when you need fast membership checks or
          counting. They turn repeated scans into direct lookups.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          Imagine lockers with name tags. If you know the name, you can jump
          straight to the locker without scanning every slot.
        </p>
        <p>
          In interview terms: if a problem repeats “find,” “count,” or
          “has seen,” a hash table is often the first answer.
        </p>
      </InfoPanel>

      <div id="diagram" className="scroll-mt-28">
        <SketchDiagram
          title="Sketch: hash buckets"
          variant="hash"
          caption="Keys map to buckets so lookups stay close to O(1)."
        />
      </div>

      <CollapsibleExample
        id="example-1"
        title="Example 1: Count frequencies"
        defaultOpen
      >
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Step by step: create an empty dictionary, then walk the list once. For
          each item, look up its current count (defaulting to zero) and add one.
          The result is a frequency table built in a single pass.
        </p>
        <CodeBlock code={countCode} title="Python" />
        <OutputBlock output={countOutput} />
      </CollapsibleExample>

      <CollapsibleExample
        id="example-2"
        title="Example 2: Two-sum with a lookup table"
      >
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Step by step: for each number, compute the complement you need. If you
          have already seen that complement, you are done. If not, store the
          current number in the dictionary and keep going.
        </p>
        <CodeBlock code={twoSumCode} title="Python" />
        <OutputBlock output={twoSumOutput} />
      </CollapsibleExample>
    </ArticleLayout>
  );
}
