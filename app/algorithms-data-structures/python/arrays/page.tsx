import ArticleToc from "@/components/ArticleToc";
import CodeBlock from "@/components/CodeBlock";
import CollapsibleExample from "@/components/CollapsibleExample";
import OutputBlock from "@/components/OutputBlock";

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
    { id: "example-1", label: "Example 1: Indexing and slicing" },
    { id: "example-2", label: "Example 2: Two pointers" },
  ];

  return (
    <div className="px-4 pb-20 pt-12 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-[1400px] 2xl:max-w-[1520px] lg:grid lg:grid-cols-[280px_1fr] lg:items-start lg:gap-12">
        <aside className="hidden lg:sticky lg:top-28 lg:block lg:h-fit lg:self-start">
          <ArticleToc items={tocItems} />
        </aside>

        <div>
          <header className="grid gap-4">
          <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--color-accent-2)]">
            Arrays & Lists
          </p>
          <h1 className="text-4xl font-semibold text-white font-[var(--font-display)]">
            Arrays and lists in Python
          </h1>
          <p className="max-w-2xl text-base leading-7 text-[color:var(--color-muted)]">
            Lists are Python&apos;s dynamic arrays. They give you instant indexing,
            flexible slicing, and the foundation for many interview patterns.
          </p>
        </header>

        <section className="mt-10 grid gap-6">
          <div
            id="introduction"
            className="intro-panel scroll-mt-28 rounded-2xl px-6 py-6"
          >
            <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
              Introduction
            </h2>
            <p className="mt-3 text-base leading-7 text-[color:var(--color-muted)]">
              An array stores items in order, so you can jump directly to any
              position. In Python, a list behaves like a dynamic array: it grows
              as needed while still giving you fast reads by index.
            </p>
          </div>

          <div
            id="intuition"
            className="intuition-panel scroll-mt-28 rounded-2xl px-6 py-6"
          >
            <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
              Intuition
            </h2>
            <p className="mt-3 text-base leading-7 text-[color:var(--color-muted)]">
              Picture a row of lockers with numbered doors. When you know the
              locker number, you open it instantly. Slicing is simply grabbing
              a continuous run of lockers and treating it as a smaller list.
            </p>
          </div>

          <CollapsibleExample
            id="example-1"
            title="Example 1: Indexing and slicing"
            defaultOpen
          >
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Step by step: we create a short list so positions are obvious.
              Next we grab the value at index 0 (instant lookup). Then we slice
              the last two elements with a negative index, and finally slice a
              middle range to show how start and end bounds behave.
            </p>
            <CodeBlock code={sliceCode} title="Python" />
            <OutputBlock output={sliceOutput} />
          </CollapsibleExample>

          <CollapsibleExample
            id="example-2"
            title="Example 2: Two pointers to hit a target sum"
          >
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Step by step: we place one pointer on the smallest value and one
              on the largest. If the sum is too small, we must increase it, so
              we move the left pointer right. If the sum is too large, we
              decrease it by moving the right pointer left. This converges
              toward the target without checking every pair.
            </p>
            <CodeBlock code={twoPointerCode} title="Python" />
            <OutputBlock output={twoPointerOutput} />
          </CollapsibleExample>
        </section>
        </div>
      </div>
    </div>
  );
}
