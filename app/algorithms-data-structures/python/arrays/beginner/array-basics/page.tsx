import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
import { arraysBeginnerLessons } from "@/lib/adsBeginnerTopics";

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
    { id: "intuition", label: "Intuition" },
    { id: "indexing", label: "Indexing and access" },
    { id: "updates", label: "Updating values" },
    { id: "tradeoffs", label: "Trade-offs" },
  ];

  return (
    <ArticleLayout
      eyebrow="Algorithms - Python - Arrays"
      title="Array Basics"
      description="Learn how Python lists store ordered data, why indexing is fast, and how updates work in-place."
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Within Arrays (Beginner)", links: arraysBeginnerLessons },
          ]}
          activeHref="/algorithms-data-structures/python/arrays/beginner/array-basics"
        />
      }
    >
      <InfoPanel id="introduction" title="Introduction" variant="intro">
        <p>
          An array stores items in order. In Python, a list is a dynamic
          array, which means it grows as needed while still supporting
          fast indexing.
        </p>
        <p>
          The key promise is simple: if you know the index, you can jump
          directly to that item without walking the rest of the list.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          Picture a row of lockers with numbered doors. You can open a
          specific locker immediately if you know its number. That is
          exactly what array indexing feels like.
        </p>
        <p>
          This is why arrays are the default structure for ordered data:
          they trade flexible insertion for fast reads by position.
        </p>
      </InfoPanel>

      <section id="indexing" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Indexing and access
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Indexing uses zero-based positions. Negative indices count from
          the end, so{" "}
          <span className="font-mono inline-code">-1</span> is the last
          element.
        </p>
        <CodeBlock code={indexingCode} title="Python" />
        <OutputBlock output={indexingOutput} />
      </section>

      <section id="updates" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Updating values
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          You can overwrite a value in-place by assigning a new value to
          an index. The length stays the same because we are only
          replacing, not inserting.
        </p>
        <CodeBlock code={updateCode} title="Python" />
        <OutputBlock output={updateOutput} />
      </section>

      <section id="tradeoffs" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Trade-offs to remember
        </h2>
        <ul className="grid list-disc list-inside gap-2 text-sm text-[color:var(--color-muted)]">
          <li>Fast reads by index, usually O(1).</li>
          <li>Inserts and deletes in the middle require shifting items.</li>
          <li>Great when order matters and you read more than you insert.</li>
        </ul>
      </section>
    </ArticleLayout>
  );
}
