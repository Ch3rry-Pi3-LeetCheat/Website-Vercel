import ArticleLayout from "@/components/ArticleLayout";
import ComplexityTable from "@/components/ads/ComplexityTable";
import CodeBlock from "@/components/CodeBlock";
import CollapsibleExample from "@/components/CollapsibleExample";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import SketchDiagram from "@/components/SketchDiagram";
import RightRail from "@/components/RightRail";
import { adsPythonTopics } from "@/lib/adsTopics";

const stackCode = `stack = []
stack.append("draft")
stack.append("review")
stack.append("publish")

top = stack.pop()
print(top)
print(stack)`;

const stackOutput = `publish
['draft', 'review']`;

const queueCode = `from collections import deque

queue = deque(["ticket-1", "ticket-2"])
queue.append("ticket-3")

first = queue.popleft()
print(first)
print(list(queue))`;

const queueOutput = `ticket-1
['ticket-2', 'ticket-3']`;

export default function StacksQueuesPage() {
  const tocItems = [
    { id: "introduction", label: "Introduction" },
    { id: "intuition", label: "Intuition" },
    { id: "real-world", label: "Real-world mapping" },
    { id: "complexity", label: "Complexity quick sheet" },
    { id: "diagram", label: "Diagram: Stack vs queue" },
    { id: "example-1", label: "Example 1: Stack push and pop" },
    { id: "example-2", label: "Example 2: Queue enqueue/dequeue" },
    { id: "summary", label: "Summary" },
  ];

  return (
    <ArticleLayout
      eyebrow="Stacks & Queues"
      title="Stacks and queues in Python"
      description="Stacks and queues control order. They help you manage tasks, parse expressions, and model scheduling workflows."
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Within CS (Python)", links: adsPythonTopics },
          ]}
          activeHref="/algorithms-data-structures/python/stacks-queues"
        />
      }
    >
      <InfoPanel id="introduction" title="Introduction" variant="intro">
        <p>
          A stack is LIFO: last in, first out. A queue is FIFO: first in, first
          out. Interviews test whether you can pick the right order for the job.
        </p>
        <p>
          Stacks often model undo behavior, while queues model scheduling and
          request processing. The moment you hear &quot;most recent&quot; or &quot;first&quot;, you
          should be thinking stack or queue.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          A stack is a pile of plates: you remove the one you just added. A
          queue is a line at a coffee shop: the person who arrived first is
          served first.
        </p>
        <p>
          The order rule is the whole point. These structures exist to avoid
          re-sorting and manual shifting.
        </p>
      </InfoPanel>

      <section id="real-world" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Real-world mapping
        </h2>
        <div className="grid gap-3">
          <div className="glass-panel rounded-2xl px-5 py-4 text-sm text-[color:var(--color-muted)]">
            <span className="text-white font-semibold">Browser back button:</span>{" "}
            each page visit pushes onto a stack; back pops the latest visit.
          </div>
          <div className="glass-panel rounded-2xl px-5 py-4 text-sm text-[color:var(--color-muted)]">
            <span className="text-white font-semibold">Customer support queue:</span>{" "}
            first submitted ticket is handled first.
          </div>
        </div>
      </section>

      <section id="complexity" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Complexity quick sheet
        </h2>
        <ComplexityTable
          rows={[
            { operation: "Stack push/pop", averageTime: String.raw`O(1)`, extraSpace: String.raw`O(1)` },
            { operation: "Queue enqueue/dequeue", averageTime: String.raw`O(1)`, extraSpace: String.raw`O(1)` },
            { operation: "Peek top/front", averageTime: String.raw`O(1)`, extraSpace: String.raw`O(1)` },
            { operation: "Traverse all items", averageTime: String.raw`O(n)`, extraSpace: String.raw`O(1)` },
          ]}
        />
      </section>

      <div id="diagram" className="scroll-mt-28">
        <SketchDiagram
          title="Sketch: stack vs queue"
          variant="stack-queue"
          caption="Stacks reverse order; queues preserve arrival order."
        />
      </div>

      <CollapsibleExample
        id="example-1"
        title="Example 1: Stack push and pop"
        defaultOpen
      >
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Step by step: push tasks in the order they arrive. When it is time to
          act, pop the most recent task. Whatever remains stays ready in undo
          order.
        </p>
        <CodeBlock code={stackCode} title="Python" />
        <OutputBlock output={stackOutput} />
      </CollapsibleExample>

      <CollapsibleExample
        id="example-2"
        title="Example 2: Queue enqueue and dequeue"
      >
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Step by step: enqueue each incoming task at the back. When ready,
          dequeue from the front so processing stays in arrival order.
        </p>
        <CodeBlock code={queueCode} title="Python" />
        <OutputBlock output={queueOutput} />
      </CollapsibleExample>

      <section id="summary" className="scroll-mt-28 grid gap-3">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Summary
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          If order policy is the core constraint, stack/queue is often the
          cleanest structure choice before any advanced optimization.
        </p>
      </section>
    </ArticleLayout>
  );
}

