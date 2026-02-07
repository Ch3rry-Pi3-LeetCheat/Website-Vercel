import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
import { stacksQueuesBeginnerLessons } from "@/lib/adsBeginnerTopics";

const parenCode = `def is_valid(s):
    stack = []
    pairs = {")": "(", "]": "[", "}": "{"}

    for ch in s:
        if ch in pairs.values():
            stack.append(ch)
        elif ch in pairs:
            if not stack or stack.pop() != pairs[ch]:
                return False

    return not stack

print(is_valid("([])"))
print(is_valid("(]"))`;

const parenOutput = `True
False`;

const queueCode = `from collections import deque

tasks = deque(["build", "test", "deploy"])
order = []

while tasks:
    order.append(tasks.popleft())

print(order)`;

const queueOutput = `['build', 'test', 'deploy']`;

export default function PatternsPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "introduction", label: "Introduction" },
    { id: "intuition", label: "Intuition" },
    { id: "stack-pattern", label: "Stack pattern" },
    { id: "queue-pattern", label: "Queue pattern" },
  ];

  return (
    <ArticleLayout
      eyebrow="Algorithms - Python - Stacks and Queues"
      title="Everyday Patterns"
      description="Use a stack to match brackets and a queue to process tasks in order." 
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Within Stacks and Queues (Beginner)", links: stacksQueuesBeginnerLessons },
          ]}
          activeHref="/algorithms-data-structures/python/stacks-queues/beginner/patterns"
        />
      }
    >
      <InfoPanel id="introduction" title="Introduction" variant="intro">
        <p>
          Stacks and queues appear in real problems because they encode
          simple ordering rules. Once you know those rules, you can spot
          the right tool quickly.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          A stack is best when you need to undo or match pairs. A queue
          is best when you need to process items in arrival order.
        </p>
      </InfoPanel>

      <section id="stack-pattern" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Stack pattern: validate parentheses
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Push opening brackets, and when you see a closing bracket, pop
          and compare. If anything mismatches, the string is invalid.
        </p>
        <CodeBlock code={parenCode} title="Python" />
        <OutputBlock output={parenOutput} />
      </section>

      <section id="queue-pattern" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Queue pattern: process tasks
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The queue ensures tasks are handled in the order they were
          added.
        </p>
        <CodeBlock code={queueCode} title="Python" />
        <OutputBlock output={queueOutput} />
      </section>
    </ArticleLayout>
  );
}
