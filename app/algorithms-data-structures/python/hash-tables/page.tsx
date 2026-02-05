import ArticleToc from "@/components/ArticleToc";
import CodeBlock from "@/components/CodeBlock";
import CollapsibleExample from "@/components/CollapsibleExample";
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
  const tocItems = [
    { id: "introduction", label: "Introduction" },
    { id: "intuition", label: "Intuition" },
    { id: "example-1", label: "Example 1: Count frequencies" },
    { id: "example-2", label: "Example 2: Two-sum lookup" },
  ];

  return (
    <div className="px-6 pb-20 pt-12">
      <div className="mx-auto w-full max-w-6xl lg:grid lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <ArticleToc items={tocItems} />
          </div>
        </aside>

        <div>
          <header className="grid gap-4">
          <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--color-accent-2)]">
            Hash Tables
          </p>
          <h1 className="text-4xl font-semibold text-white font-[var(--font-display)]">
            Hash tables in Python
          </h1>
          <p className="max-w-2xl text-base leading-7 text-[color:var(--color-muted)]">
            Dictionaries give you fast lookups. They power counting, indexing,
            and almost every classic interview pattern.
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
              A hash table stores key-value pairs so you can jump directly to
              the value by key. Python&apos;s dictionary is a hash table under
              the hood.
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
              Imagine lockers with name tags. If you know the name, you can
              jump straight to the locker without scanning every slot.
            </p>
          </div>

          <CollapsibleExample
            id="example-1"
            title="Example 1: Count frequencies"
            defaultOpen
          >
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Step by step: create an empty dictionary, then walk the list once.
              For each item, look up its current count (defaulting to zero) and
              add one. The result is a frequency table built in a single pass.
            </p>
            <CodeBlock code={countCode} title="Python" />
            <OutputBlock output={countOutput} />
          </CollapsibleExample>

          <CollapsibleExample
            id="example-2"
            title="Example 2: Two-sum with a lookup table"
          >
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Step by step: for each number, compute the complement you need.
              If you have already seen that complement, you are done. If not,
              store the current number in the dictionary and keep going.
            </p>
            <CodeBlock code={twoSumCode} title="Python" />
            <OutputBlock output={twoSumOutput} />
          </CollapsibleExample>
        </section>
        </div>
      </div>
    </div>
  );
}
