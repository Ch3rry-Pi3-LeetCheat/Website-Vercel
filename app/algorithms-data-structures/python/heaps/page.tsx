import ArticleToc from "@/components/ArticleToc";
import CodeBlock from "@/components/CodeBlock";
import CollapsibleExample from "@/components/CollapsibleExample";
import OutputBlock from "@/components/OutputBlock";

const topKCode = `import heapq

scores = [88, 92, 79, 96, 85]
top = []

for score in scores:
    heapq.heappush(top, score)
    if len(top) > 3:
        heapq.heappop(top)

sorted(top)`;

const topKOutput = `[88, 92, 96]`;

const scheduleCode = `import heapq

tasks = [(3, "email"), (1, "build"), (2, "deploy")]
heapq.heapify(tasks)

next_task = heapq.heappop(tasks)
next_task`;

const scheduleOutput = `(1, 'build')`;

export default function HeapsPage() {
  const tocItems = [
    { id: "introduction", label: "Introduction" },
    { id: "intuition", label: "Intuition" },
    { id: "example-1", label: "Example 1: Top 3 scores" },
    { id: "example-2", label: "Example 2: Next task" },
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
            Heaps
          </p>
          <h1 className="text-4xl font-semibold text-white font-[var(--font-display)]">
            Heaps in Python
          </h1>
          <p className="max-w-2xl text-base leading-7 text-[color:var(--color-muted)]">
            Heaps are priority queues. They let you pull the smallest or
            largest item quickly, which is perfect for top-k and scheduling
            problems.
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
              A heap is a tree-based structure that always keeps the smallest
              item at the top. Python&apos;s <span className="font-mono text-white">heapq</span>{" "}
              gives you a min-heap out of the box.
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
              Think of a heap as a scoreboard where the best score floats to the
              top automatically. You don&apos;t sort everything; you just keep the
              best items within reach.
            </p>
          </div>

          <CollapsibleExample
            id="example-1"
            title="Example 1: Keep the top 3 scores"
            defaultOpen
          >
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Step by step: push every score into a min-heap. When the heap
              grows beyond three items, pop the smallest so only the top scores
              remain. Sorting the heap at the end gives you a readable list.
            </p>
            <CodeBlock code={topKCode} title="Python" />
            <OutputBlock output={topKOutput} />
          </CollapsibleExample>

          <CollapsibleExample
            id="example-2"
            title="Example 2: Next task by earliest time"
          >
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Step by step: store each task as a (time, label) pair so the time
              drives priority. Heapify arranges the smallest time at the top.
              Popping once returns the task you should handle next.
            </p>
            <CodeBlock code={scheduleCode} title="Python" />
            <OutputBlock output={scheduleOutput} />
          </CollapsibleExample>
        </section>
        </div>
      </div>
    </div>
  );
}
