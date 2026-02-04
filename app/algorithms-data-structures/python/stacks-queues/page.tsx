import CodeBlock from "@/components/CodeBlock";
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
  return (
    <div className="px-6 pb-20 pt-12">
      <div className="mx-auto w-full max-w-5xl">
        <header className="grid gap-4">
          <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--color-accent-2)]">
            Stacks & Queues
          </p>
          <h1 className="text-4xl font-semibold text-white font-[var(--font-display)]">
            Stacks and queues in Python
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-[color:var(--color-muted)]">
            Stacks and queues control order. They help you manage tasks,
            parse expressions, and model scheduling workflows.
          </p>
        </header>

        <section className="mt-10 grid gap-6">
          <div className="glass-panel rounded-2xl px-6 py-6">
            <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
              Introduction
            </h2>
            <p className="mt-3 text-sm leading-6 text-[color:var(--color-muted)]">
              A stack is LIFO: last in, first out. A queue is FIFO: first in,
              first out. Interviews test whether you can pick the right order
              for the job.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[color:var(--color-surface)] px-6 py-6">
            <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
              Intuition
            </h2>
            <p className="mt-3 text-sm leading-6 text-[color:var(--color-muted)]">
              A stack is a pile of plates: you remove the one you just added.
              A queue is a line at a coffee shop: the person who arrived first
              is served first.
            </p>
          </div>

          <section className="grid gap-4">
            <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
              Example 1: Stack push and pop
            </h3>
            <ol className="grid gap-2 text-sm text-[color:var(--color-muted)]">
              <li>Push tasks onto the stack.</li>
              <li>Pop the most recent task.</li>
              <li>The stack keeps the remaining order.</li>
            </ol>
            <CodeBlock code={stackCode} title="Python" />
            <OutputBlock output={stackOutput} />
          </section>

          <section className="grid gap-4">
            <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
              Example 2: Queue enqueue and dequeue
            </h3>
            <ol className="grid gap-2 text-sm text-[color:var(--color-muted)]">
              <li>Append new tasks to the end of the queue.</li>
              <li>Pop from the front when it is time to process.</li>
              <li>The queue preserves arrival order.</li>
            </ol>
            <CodeBlock code={queueCode} title="Python" />
            <OutputBlock output={queueOutput} />
          </section>
        </section>
      </div>
    </div>
  );
}
