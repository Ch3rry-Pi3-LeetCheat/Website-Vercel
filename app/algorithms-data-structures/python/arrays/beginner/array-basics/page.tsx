import ArticleLayout from "@/components/ArticleLayout";
import ArrayIndexPlayground from "@/components/ads/ArrayIndexPlayground";
import ComplexityTable from "@/components/ads/ComplexityTable";
import LinearStateStepper from "@/components/ads/LinearStateStepper";
import CodeBlock from "@/components/CodeBlock";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
import { adsPythonTopics } from "@/lib/adsTopics";
import { arraysBeginnerLessons } from "@/lib/adsBeginnerTopics";

const BASE_VALUES = [10, 20, 30, 40];

const indexingCode = `nums = [10, 20, 30, 40]

print(nums[0])
print(nums[2])
print(nums[-1])`;

const indexingOutput = `10
30
40`;

const updateCode = `nums = [10, 20, 30, 40]

nums[1] = 25
nums[3] = 99

print(nums)
print(len(nums))`;

const updateOutput = `[10, 25, 30, 99]
4`;

export default function ArrayBasicsPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "introduction", label: "Introduction" },
    { id: "read-index", label: "Read by index" },
    { id: "read-intuition", label: "Intuition", level: 2 },
    { id: "read-interactive", label: "Interactive", level: 2 },
    { id: "read-python", label: "Python example", level: 2 },
    { id: "write-index", label: "Update by index" },
    { id: "write-intuition", label: "Intuition", level: 2 },
    { id: "write-interactive", label: "Interactive", level: 2 },
    { id: "write-python", label: "Python example", level: 2 },
    { id: "complexity", label: "Complexity quick sheet" },
    { id: "summary", label: "Summary" },
  ];

  return (
    <ArticleLayout
      eyebrow="CS - Python - Arrays"
      title="Array Basics"
      description="Build intuition for direct index reads and in-place index updates."
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Within CS (Python)", links: adsPythonTopics },
            { title: "Within Arrays (Beginner)", links: arraysBeginnerLessons },
          ]}
          activeHref="/algorithms-data-structures/python/arrays/beginner/array-basics"
        />
      }
    >
      <InfoPanel id="introduction" title="Introduction" variant="intro">
        <p>
          Arrays (Python lists) store values in a fixed order. That order gives
          each value an index, and that index is what makes direct reads fast.
        </p>
        <p>
          In this lesson we focus on two core operations: reading a value by
          index and updating a value by index.
        </p>
      </InfoPanel>

      <section id="read-index" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Read by index
        </h2>

        <section id="read-intuition" className="grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Intuition
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Think of a row of numbered lockers. If you need locker 2, you go
            directly to locker 2. You do not check locker 0 then locker 1 first.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            That is the array promise: if index is known, access is direct.
          </p>
        </section>

        <section id="read-interactive" className="grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Interactive
          </h3>
          <ArrayIndexPlayground values={BASE_VALUES} />
        </section>

        <section id="read-python" className="grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Python example
          </h3>
          <CodeBlock code={indexingCode} title="Python" />
          <OutputBlock output={indexingOutput} />
        </section>
      </section>

      <section id="write-index" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Update by index
        </h2>

        <section id="write-intuition" className="grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Intuition
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Updating by index means replacing one slot with a new value. No
            shifting is required because list length does not change.
          </p>
        </section>

        <section id="write-interactive" className="grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Interactive
          </h3>
          <LinearStateStepper
            title="In-place update walkthrough"
            subtitle="Only one slot changes."
            cellLayout="contiguous"
            steps={[
              {
                title: "Start",
                explanation: "Original array values.",
                values: [10, 20, 30, 40],
              },
              {
                title: "Write nums[1] = 25",
                explanation: "Index 1 is replaced directly.",
                values: [10, 25, 30, 40],
                highlightIndices: [1],
              },
              {
                title: "Write nums[3] = 99",
                explanation: "Another direct replacement at index 3.",
                values: [10, 25, 30, 99],
                highlightIndices: [3],
              },
            ]}
          />
        </section>

        <section id="write-python" className="grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Python example
          </h3>
          <CodeBlock code={updateCode} title="Python" />
          <OutputBlock output={updateOutput} />
        </section>
      </section>

      <section id="complexity" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Complexity quick sheet
        </h2>
        <ComplexityTable
          rows={[
            { operation: "Read nums[i]", averageTime: String.raw`O(1)`, extraSpace: String.raw`O(1)` },
            { operation: "Write nums[i] = x", averageTime: String.raw`O(1)`, extraSpace: String.raw`O(1)` },
            { operation: "Middle insert/remove", averageTime: String.raw`O(n)`, extraSpace: String.raw`O(1)` },
          ]}
        />
      </section>

      <section id="summary" className="scroll-mt-28 grid gap-2">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Summary
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Direct index reads and writes are usually O(1). That speed comes from
          positional addressing, not from searching.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Next we will break down append, pop, insert, and remove and compare
          how their costs differ.
        </p>
      </section>
    </ArticleLayout>
  );
}

