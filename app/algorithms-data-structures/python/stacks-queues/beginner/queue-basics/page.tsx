import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
import { stacksQueuesBeginnerLessons } from "@/lib/adsBeginnerTopics";

const queueCode = `from collections import deque

queue = deque()
queue.append("A")
queue.append("B")
queue.append("C")

print(queue.popleft())
print(queue.popleft())`;

const queueOutput = `A
B`;

const taskCode = `from collections import deque

tasks = deque(["email", "build", "deploy"])
done = []

while tasks:
    done.append(tasks.popleft())

print(done)`;

const taskOutput = `['email', 'build', 'deploy']`;

export default function QueueBasicsPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "introduction", label: "Introduction" },
    { id: "intuition", label: "Intuition" },
    { id: "enqueue-dequeue", label: "Enqueue and dequeue" },
    { id: "task-order", label: "Task order" },
  ];

  return (
    <ArticleLayout
      eyebrow="Algorithms - Python - Stacks and Queues"
      title="Queue Basics"
      description="Queues are FIFO: first in, first out. Use deque for fast operations." 
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Within Stacks and Queues (Beginner)", links: stacksQueuesBeginnerLessons },
          ]}
          activeHref="/algorithms-data-structures/python/stacks-queues/beginner/queue-basics"
        />
      }
    >
      <InfoPanel id="introduction" title="Introduction" variant="intro">
        <p>
          A queue removes the oldest item first. This matches how real
          lines work and is perfect for scheduling and breadth-first
          traversal.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          Think of a line at a coffee shop. The first person in line is
          served first. New people join at the back.
        </p>
      </InfoPanel>

      <section id="enqueue-dequeue" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Enqueue and dequeue
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Use <span className="font-mono inline-code">deque</span> to keep
          operations fast on both ends.
        </p>
        <CodeBlock code={queueCode} title="Python" />
        <OutputBlock output={queueOutput} />
      </section>

      <section id="task-order" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Task order
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          A queue naturally preserves the order that tasks were added.
        </p>
        <CodeBlock code={taskCode} title="Python" />
        <OutputBlock output={taskOutput} />
      </section>
    </ArticleLayout>
  );
}
