import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
import { arraysBeginnerLessons } from "@/lib/adsBeginnerTopics";

const appendPopCode = `nums = [1, 2, 3]

nums.append(4)
last = nums.pop()

print(nums)
print(last)`;

const appendPopOutput = `[1, 2, 3]
4`;

const insertRemoveCode = `nums = [1, 3, 4]

nums.insert(1, 2)
nums.remove(3)

print(nums)`;

const insertRemoveOutput = `[1, 2, 4]`;

const sliceCode = `nums = [5, 12, 7, 3, 9]

print(nums[1:4])
print(nums[:2])
print(nums[-2:])`;

const sliceOutput = `[12, 7, 3]
[5, 12]
[3, 9]`;

export default function ArrayOperationsPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "introduction", label: "Introduction" },
    { id: "intuition", label: "Intuition" },
    { id: "append-pop", label: "Append and pop" },
    { id: "insert-remove", label: "Insert and remove" },
    { id: "slicing", label: "Slicing windows" },
  ];

  return (
    <ArticleLayout
      eyebrow="Algorithms - Python - Arrays"
      title="Common Operations"
      description="Practice the operations you use every day: append, pop, insert, remove, and slice."
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Within Arrays (Beginner)", links: arraysBeginnerLessons },
          ]}
          activeHref="/algorithms-data-structures/python/arrays/beginner/array-operations"
        />
      }
    >
      <InfoPanel id="introduction" title="Introduction" variant="intro">
        <p>
          Arrays grow and shrink through a small set of operations. The
          key is knowing which ones are cheap and which ones require
          shifting elements.
        </p>
        <p>
          We will keep the examples tiny so you can see exactly what
          changes in the list after each operation.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          Appending is easy because you place an item at the end.
          Inserting in the middle is harder because every item after the
          insertion point must slide right.
        </p>
      </InfoPanel>

      <section id="append-pop" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Append and pop
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          <span className="font-mono inline-code">append</span> adds to the
          end. <span className="font-mono inline-code">pop</span> removes
          the last item, which is usually the cheapest delete operation.
        </p>
        <CodeBlock code={appendPopCode} title="Python" />
        <OutputBlock output={appendPopOutput} />
      </section>

      <section id="insert-remove" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Insert and remove
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          <span className="font-mono inline-code">insert</span> places an
          item at an index and shifts everything after it. Removing a
          value also shifts items left to close the gap.
        </p>
        <CodeBlock code={insertRemoveCode} title="Python" />
        <OutputBlock output={insertRemoveOutput} />
      </section>

      <section id="slicing" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Slicing windows
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Slicing returns a new list that contains a window of elements.
          The end index is exclusive, so it stops just before that
          position.
        </p>
        <CodeBlock code={sliceCode} title="Python" />
        <OutputBlock output={sliceOutput} />
      </section>
    </ArticleLayout>
  );
}
