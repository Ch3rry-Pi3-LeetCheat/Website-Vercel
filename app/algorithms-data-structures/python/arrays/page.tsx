import CodeBlock from "@/components/CodeBlock";
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
  return (
    <div className="px-6 pb-20 pt-12">
      <div className="mx-auto w-full max-w-5xl">
        <header className="grid gap-4">
          <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--color-accent-2)]">
            Arrays & Lists
          </p>
          <h1 className="text-4xl font-semibold text-white font-[var(--font-display)]">
            Arrays and lists in Python
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-[color:var(--color-muted)]">
            Lists are Python&apos;s dynamic arrays. They give you instant indexing,
            flexible slicing, and the foundation for many interview patterns.
          </p>
        </header>

        <section className="mt-10 grid gap-6">
          <div className="glass-panel rounded-2xl px-6 py-6">
            <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
              Introduction
            </h2>
            <p className="mt-3 text-sm leading-6 text-[color:var(--color-muted)]">
              An array stores items in order, so you can jump directly to any
              position. In Python, a list behaves like a dynamic array: it grows
              as needed while still giving you fast reads by index.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[color:var(--color-surface)] px-6 py-6">
            <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
              Intuition
            </h2>
            <p className="mt-3 text-sm leading-6 text-[color:var(--color-muted)]">
              Picture a row of lockers with numbered doors. When you know the
              locker number, you open it instantly. Slicing is simply grabbing
              a continuous run of lockers and treating it as a smaller list.
            </p>
          </div>

          <section className="grid gap-4">
            <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
              Example 1: Indexing and slicing
            </h3>
            <ol className="grid gap-2 text-sm text-[color:var(--color-muted)]">
              <li>Build a list of values.</li>
              <li>Read the first element directly.</li>
              <li>Slice the last two and a middle range.</li>
            </ol>
            <CodeBlock code={sliceCode} title="Python" />
            <OutputBlock output={sliceOutput} />
          </section>

          <section className="grid gap-4">
            <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
              Example 2: Two pointers to hit a target sum
            </h3>
            <ol className="grid gap-2 text-sm text-[color:var(--color-muted)]">
              <li>Start one pointer on each end of a sorted list.</li>
              <li>Move the side that makes the sum too small or too big.</li>
              <li>Stop when you hit the target.</li>
            </ol>
            <CodeBlock code={twoPointerCode} title="Python" />
            <OutputBlock output={twoPointerOutput} />
          </section>
        </section>
      </div>
    </div>
  );
}
