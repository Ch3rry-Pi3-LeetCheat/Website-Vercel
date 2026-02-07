import ArticleLayout from "@/components/ArticleLayout";
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
    { id: "diagram", label: "Diagram: Heap order" },
    { id: "example-1", label: "Example 1: Top 3 scores" },
    { id: "example-2", label: "Example 2: Next task" },
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
            { title: "Within Algorithms (Python)", links: adsPythonTopics },
          ]}
          activeHref="/algorithms-data-structures/python/heaps"
        />
      }
    >
      <InfoPanel id="introduction" title="Introduction" variant="intro">
        <p>
          A heap is a tree-based structure that always keeps the smallest item
          at the top. Python&apos;s{" "}
          <span className="font-mono inline-code">heapq</span> gives you a min-heap
          out of the box.
        </p>
        <p>
          Heaps are ideal when you only care about the “next” best item rather
          than a fully sorted list. That&apos;s why they appear in top-k and
          scheduling problems.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          Think of a heap as a scoreboard where the best score floats to the
          top automatically. You don&apos;t sort everything; you just keep the best
          items within reach.
        </p>
        <p>
          Every push or pop rearranges just enough nodes to keep the top valid,
          which is far cheaper than re-sorting the whole list.
        </p>
      </InfoPanel>

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
          Sorting the heap at the end gives you a readable list.
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
    </ArticleLayout>
  );
}
