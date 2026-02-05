import ArticleLayout from "@/components/ArticleLayout";
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
    { id: "diagram", label: "Diagram: Array view" },
    { id: "example-1", label: "Example 1: Indexing and slicing" },
    { id: "example-2", label: "Example 2: Two pointers" },
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
            { title: "Within Algorithms (Python)", links: adsPythonTopics },
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
      </InfoPanel>

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
    </ArticleLayout>
  );
}
