import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
import { stacksQueuesBeginnerLessons } from "@/lib/adsBeginnerTopics";

const pushPopCode = `stack = []

stack.append("A")
stack.append("B")
stack.append("C")

print(stack.pop())
print(stack.pop())`;

const pushPopOutput = `C
B`;

const peekCode = `stack = [10, 20, 30]

print(stack[-1])
print(len(stack))`;

const peekOutput = `30
3`;

export default function StackBasicsPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "introduction", label: "Introduction" },
    { id: "intuition", label: "Intuition" },
    { id: "push-pop", label: "Push and pop" },
    { id: "peek", label: "Peek and size" },
  ];

  return (
    <ArticleLayout
      eyebrow="Algorithms - Python - Stacks and Queues"
      title="Stack Basics"
      description="Stacks are LIFO: last in, first out. Python lists make them easy." 
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Within Stacks and Queues (Beginner)", links: stacksQueuesBeginnerLessons },
          ]}
          activeHref="/algorithms-data-structures/python/stacks-queues/beginner/stack-basics"
        />
      }
    >
      <InfoPanel id="introduction" title="Introduction" variant="intro">
        <p>
          A stack always removes the most recent item first. This simple
          rule makes stacks ideal for undo, backtracking, and expression
          parsing.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          Imagine a stack of plates. You only add or remove from the top.
          The last plate placed is the first one you take.
        </p>
      </InfoPanel>

      <section id="push-pop" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Push and pop
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          In Python, you push with{" "}
          <span className="font-mono inline-code">append</span> and pop
          with <span className="font-mono inline-code">pop</span>.
        </p>
        <CodeBlock code={pushPopCode} title="Python" />
        <OutputBlock output={pushPopOutput} />
      </section>

      <section id="peek" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Peek and size
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Peek is just reading the last element without removing it. The
          size is the list length.
        </p>
        <CodeBlock code={peekCode} title="Python" />
        <OutputBlock output={peekOutput} />
      </section>
    </ArticleLayout>
  );
}
