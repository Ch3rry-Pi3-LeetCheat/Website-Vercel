import ArticleLayout from "@/components/ArticleLayout";
import ComplexityTable from "@/components/ads/ComplexityTable";
import CodeBlock from "@/components/CodeBlock";
import CollapsibleExample from "@/components/CollapsibleExample";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import SketchDiagram from "@/components/SketchDiagram";
import RightRail from "@/components/RightRail";
import { adsPythonTopics } from "@/lib/adsTopics";

const sliceCode = `nums = [5, 12, 7, 3, 9]

print(nums[0])
print(nums[-2:])
print(nums[1:4])`;

const sliceOutput = `5
[3, 9]
[12, 7, 3]`;

const twoPointerCode = `nums = [1, 3, 4, 6, 8, 9]
target = 10

left = 0
right = len(nums) - 1

while left < right:
    total = nums[left] + nums[right]
    if total == target:
        break
    if total < target:
        left += 1
    else:
        right -= 1

print(nums[left], nums[right])`;

const twoPointerOutput = `1 9`;

export default function ArraysPage() {
  const tocItems = [
    { id: "introduction", label: "Introduction" },
    { id: "intuition", label: "Intuition" },
    { id: "complexity", label: "Complexity quick sheet" },
    { id: "diagram", label: "Diagram: Array view" },
    { id: "example-1", label: "Example 1: Indexing and slicing" },
    { id: "example-2", label: "Example 2: Two pointers" },
    { id: "summary", label: "Summary" },
  ];

  return (
    <ArticleLayout
      eyebrow="Arrays & Lists"
      title="Arrays and lists in Python"
      description="Lists are Python&apos;s dynamic arrays. They give you instant indexing, flexible slicing, and the foundation for many interview patterns."
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Within CS (Python)", links: adsPythonTopics },
          ]}
          activeHref="/algorithms-data-structures/python/arrays"
        />
      }
    >
      <InfoPanel id="introduction" title="Introduction" variant="intro">
        <p>
          An array stores items in order, so you can jump directly to any
          position. In Python, a list behaves like a dynamic array: it grows as
          needed while still giving you fast reads by index.
        </p>
        <p>
          In interviews, arrays are your default tool for ordered data. The
          key is understanding how indexing, slicing, and pointer movement let
          you solve problems without extra memory.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          Picture a row of lockers with numbered doors. When you know the
          locker number, you open it instantly. That&apos;s why random access is
          so fast.
        </p>
        <p>
          Slicing is just grabbing a consecutive run of lockers and treating
          it as a smaller list. Two pointers are two people walking inward from
          the ends to meet in the middle.
        </p>
        <div className="mt-1 grid gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">
            Real-world intuition
          </p>
          <p className="text-sm text-[color:var(--color-muted)]">
            <span className="text-white font-semibold">Time-series dashboards:</span>{" "}
            each position stores one time point, so direct indexing supports fast rendering and updates.
          </p>
          <p className="text-sm text-[color:var(--color-muted)]">
            <span className="text-white font-semibold">Media playlists:</span>{" "}
            order matters, and pointer-based scans support skip/seek patterns cleanly.
          </p>
        </div>
      </InfoPanel>

      <section id="complexity" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Complexity quick sheet
        </h2>
        <ComplexityTable
          rows={[
            { operation: "Index access", averageTime: String.raw`O(1)`, extraSpace: String.raw`O(1)` },
            { operation: "Append (amortized)", averageTime: String.raw`O(1)`, extraSpace: String.raw`O(1)` },
            { operation: "Insert/delete in middle", averageTime: String.raw`O(n)`, extraSpace: String.raw`O(1)` },
            { operation: "Linear search", averageTime: String.raw`O(n)`, extraSpace: String.raw`O(1)` },
          ]}
        />
      </section>

      <div id="diagram" className="scroll-mt-28">
        <SketchDiagram
          title="Sketch: array slice"
          variant="array"
          caption="A slice grabs a continuous range without visiting every element individually."
        />
      </div>

      <CollapsibleExample
        id="example-1"
        title="Example 1: Indexing and slicing"
        defaultOpen
      >
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Step by step: we create a short list so positions are obvious. Next
          we grab the value at index 0 (instant lookup). Then we slice the last
          two elements with a negative index, and finally slice a middle range
          to show how start and end bounds behave.
        </p>
        <CodeBlock code={sliceCode} title="Python" />
        <OutputBlock output={sliceOutput} />
      </CollapsibleExample>

      <CollapsibleExample
        id="example-2"
        title="Example 2: Two pointers to hit a target sum"
      >
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Step by step: we place one pointer on the smallest value and one on
          the largest. If the sum is too small, we must increase it, so we move
          the left pointer right. If the sum is too large, we decrease it by
          moving the right pointer left. This converges toward the target
          without checking every pair.
        </p>
        <CodeBlock code={twoPointerCode} title="Python" />
        <OutputBlock output={twoPointerOutput} />
      </CollapsibleExample>

      <section id="summary" className="scroll-mt-28 grid gap-3">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Summary
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Arrays are usually your default for ordered data. Use them when you
          want fast index access and simple linear scans, and switch when
          mid-list insert/delete dominates.
        </p>
      </section>
    </ArticleLayout>
  );
}

