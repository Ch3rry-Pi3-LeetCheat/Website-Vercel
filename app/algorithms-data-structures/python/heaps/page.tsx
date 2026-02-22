import ArticleLayout from "@/components/ArticleLayout";
import ComplexityTable from "@/components/ads/ComplexityTable";
import CodeBlock from "@/components/CodeBlock";
import CollapsibleExample from "@/components/CollapsibleExample";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import SketchDiagram from "@/components/SketchDiagram";
import RightRail from "@/components/RightRail";
import { adsPythonTopics } from "@/lib/adsTopics";

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
    { id: "complexity", label: "Complexity quick sheet" },
    { id: "diagram", label: "Diagram: Heap order" },
    { id: "example-1", label: "Example 1: Top 3 scores" },
    { id: "example-2", label: "Example 2: Next task" },
    { id: "summary", label: "Summary" },
  ];

  return (
    <ArticleLayout
      eyebrow="Heaps"
      title="Heaps in Python"
      description="Heaps are priority queues. They let you pull the smallest or largest item quickly, which is perfect for top-k and scheduling problems."
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Within CS (Python)", links: adsPythonTopics },
          ]}
          activeHref="/algorithms-data-structures/python/heaps"
        />
      }
    >
      <InfoPanel id="introduction" title="Introduction" variant="intro">
        <p>
          A heap is a tree-based structure that always keeps the smallest item
          at the top. Python&apos;s <span className="font-mono inline-code">heapq</span>{" "}
          gives you a min-heap out of the box.
        </p>
        <p>
          Heaps are ideal when you only care about the next best item rather
          than a fully sorted list.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          Think of a heap as a scoreboard where the best candidate floats near
          the top automatically. You do not sort everything; you keep fast
          access to the most urgent item.
        </p>
        <p>
          Every push or pop rearranges just enough nodes to preserve the heap
          property, which is cheaper than re-sorting the full list.
        </p>
        <div className="mt-1 grid gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">
            Real-world intuition
          </p>
          <p className="text-sm text-[color:var(--color-muted)]">
            <span className="text-white font-semibold">CPU scheduler queues:</span>{" "}
            next runnable task is chosen by priority.
          </p>
          <p className="text-sm text-[color:var(--color-muted)]">
            <span className="text-white font-semibold">Top-k recommendation feeds:</span>{" "}
            maintain only the strongest candidates while streaming updates.
          </p>
        </div>
      </InfoPanel>

      <section id="complexity" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Complexity quick sheet
        </h2>
        <ComplexityTable
          rows={[
            { operation: "Peek min", averageTime: String.raw`O(1)`, extraSpace: String.raw`O(1)` },
            { operation: "Push / Pop", averageTime: String.raw`O(\log n)`, extraSpace: String.raw`O(1)` },
            { operation: "Build heap", averageTime: String.raw`O(n)`, extraSpace: String.raw`O(1)` },
            { operation: "Top-k stream maintenance", averageTime: String.raw`O(n\log k)`, extraSpace: String.raw`O(k)` },
          ]}
        />
      </section>

      <div id="diagram" className="scroll-mt-28">
        <SketchDiagram
          title="Sketch: heap order"
          variant="heap"
          caption="The smallest value stays at the root for fast access."
        />
      </div>

      <CollapsibleExample
        id="example-1"
        title="Example 1: Keep the top 3 scores"
        defaultOpen
      >
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Step by step: push every score into a min-heap. When the heap grows
          beyond three items, pop the smallest so only the top scores remain.
        </p>
        <CodeBlock code={topKCode} title="Python" />
        <OutputBlock output={topKOutput} />
      </CollapsibleExample>

      <CollapsibleExample
        id="example-2"
        title="Example 2: Next task by earliest time"
      >
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Step by step: store each task as a (time, label) pair so time drives
          priority. Heapify arranges the smallest time at the top. Popping once
          returns the task you should run next.
        </p>
        <CodeBlock code={scheduleCode} title="Python" />
        <OutputBlock output={scheduleOutput} />
      </CollapsibleExample>

      <section id="summary" className="scroll-mt-28 grid gap-3">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Summary
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Heaps are the right choice when &quot;next by priority&quot; is more important
          than full sorted order.
        </p>
      </section>
    </ArticleLayout>
  );
}

