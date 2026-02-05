import ArticleLayout from "@/components/ArticleLayout";
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
    { id: "diagram", label: "Diagram: Stack vs queue" },
    { id: "example-1", label: "Example 1: Stack push and pop" },
    { id: "example-2", label: "Example 2: Queue enqueue/dequeue" },
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
            { title: "Within Algorithms (Python)", links: adsPythonTopics },
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
          Stacks often model “undo” behavior, while queues model scheduling and
          request processing. The moment you hear “recent” or “first,” you
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
          The order is the whole point. These structures exist to keep you from
          re-sorting or shifting everything manually.
        </p>
      </InfoPanel>

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
          act, pop the most recent task. Whatever remains in the stack stays in
          the same order of undo/redo.
        </p>
        <CodeBlock code={stackCode} title="Python" />
        <OutputBlock output={stackOutput} />
      </CollapsibleExample>

      <CollapsibleExample
        id="example-2"
        title="Example 2: Queue enqueue and dequeue"
      >
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Step by step: enqueue each incoming task at the back of the line. When
          you are ready to handle work, dequeue from the front. This keeps
          processing strictly in arrival order.
        </p>
        <CodeBlock code={queueCode} title="Python" />
        <OutputBlock output={queueOutput} />
      </CollapsibleExample>
    </ArticleLayout>
  );
}
