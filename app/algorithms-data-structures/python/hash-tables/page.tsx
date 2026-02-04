import CodeBlock from "@/components/CodeBlock";
import OutputBlock from "@/components/OutputBlock";

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
  return (
    <div className="px-6 pb-20 pt-12">
      <div className="mx-auto w-full max-w-5xl">
        <header className="grid gap-4">
          <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--color-accent-2)]">
            Hash Tables
          </p>
          <h1 className="text-4xl font-semibold text-white font-[var(--font-display)]">
            Hash tables in Python
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-[color:var(--color-muted)]">
            Dictionaries give you fast lookups. They power counting, indexing,
            and almost every classic interview pattern.
          </p>
        </header>

        <section className="mt-10 grid gap-6">
          <div className="intro-panel rounded-2xl px-6 py-6">
            <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
              Introduction
            </h2>
            <p className="mt-3 text-sm leading-6 text-[color:var(--color-muted)]">
              A hash table stores key-value pairs so you can jump directly to
              the value by key. Python&apos;s dictionary is a hash table under
              the hood.
            </p>
          </div>

          <div className="intuition-panel rounded-2xl px-6 py-6">
            <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
              Intuition
            </h2>
            <p className="mt-3 text-sm leading-6 text-[color:var(--color-muted)]">
              Imagine lockers with name tags. If you know the name, you can
              jump straight to the locker without scanning every slot.
            </p>
          </div>

          <section className="grid gap-4">
            <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
              Example 1: Count frequencies
            </h3>
            <p className="text-sm leading-6 text-[color:var(--color-muted)]">
              Step by step: create an empty dictionary, then walk the list once.
              For each item, look up its current count (defaulting to zero) and
              add one. The result is a frequency table built in a single pass.
            </p>
            <CodeBlock code={countCode} title="Python" />
            <OutputBlock output={countOutput} />
          </section>

          <section className="grid gap-4">
            <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
              Example 2: Two-sum with a lookup table
            </h3>
            <p className="text-sm leading-6 text-[color:var(--color-muted)]">
              Step by step: for each number, compute the complement you need.
              If you have already seen that complement, you are done. If not,
              store the current number in the dictionary and keep going.
            </p>
            <CodeBlock code={twoSumCode} title="Python" />
            <OutputBlock output={twoSumOutput} />
          </section>
        </section>
      </div>
    </div>
  );
}
