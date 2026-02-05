import ArticleToc from "@/components/ArticleToc";
import CodeBlock from "@/components/CodeBlock";
import CollapsibleExample from "@/components/CollapsibleExample";
import OutputBlock from "@/components/OutputBlock";

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
    { id: "example-1", label: "Example 1: Stack push and pop" },
    { id: "example-2", label: "Example 2: Queue enqueue/dequeue" },
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
            Stacks & Queues
          </p>
          <h1 className="text-4xl font-semibold text-white font-[var(--font-display)]">
            Stacks and queues in Python
          </h1>
          <p className="max-w-2xl text-base leading-7 text-[color:var(--color-muted)]">
            Stacks and queues control order. They help you manage tasks,
            parse expressions, and model scheduling workflows.
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
              A stack is LIFO: last in, first out. A queue is FIFO: first in,
              first out. Interviews test whether you can pick the right order
              for the job.
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
              A stack is a pile of plates: you remove the one you just added.
              A queue is a line at a coffee shop: the person who arrived first
              is served first.
            </p>
          </div>

          <CollapsibleExample
            id="example-1"
            title="Example 1: Stack push and pop"
            defaultOpen
          >
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Step by step: push tasks in the order they arrive. When it is
              time to act, pop the most recent task. Whatever remains in the
              stack stays in the same order of undo/redo.
            </p>
            <CodeBlock code={stackCode} title="Python" />
            <OutputBlock output={stackOutput} />
          </CollapsibleExample>

          <CollapsibleExample
            id="example-2"
            title="Example 2: Queue enqueue and dequeue"
          >
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Step by step: enqueue each incoming task at the back of the line.
              When you are ready to handle work, dequeue from the front. This
              keeps processing strictly in arrival order.
            </p>
            <CodeBlock code={queueCode} title="Python" />
            <OutputBlock output={queueOutput} />
          </CollapsibleExample>
        </section>
        </div>
      </div>
    </div>
  );
}
