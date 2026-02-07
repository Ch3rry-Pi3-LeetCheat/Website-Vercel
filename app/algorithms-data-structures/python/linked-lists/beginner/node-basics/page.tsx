import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
import { linkedListsBeginnerLessons } from "@/lib/adsBeginnerTopics";

const nodeClassCode = `class Node:
    def __init__(self, value, next=None):
        self.value = value
        self.next = next`;

const buildCode = `a = Node(1)
b = Node(2)
c = Node(3)

a.next = b
b.next = c
head = a

current = head
values = []

while current:
    values.append(current.value)
    current = current.next

print(values)`;

const buildOutput = `[1, 2, 3]`;

export default function NodeBasicsPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "introduction", label: "Introduction" },
    { id: "intuition", label: "Intuition" },
    { id: "node-class", label: "Node anatomy" },
    { id: "manual-link", label: "Link nodes by hand" },
  ];

  return (
    <ArticleLayout
      eyebrow="Algorithms - Python - Linked Lists"
      title="Nodes and Pointers"
      description="Meet the node: a value plus a pointer to the next node. Build a tiny chain and walk it." 
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Within Linked Lists (Beginner)", links: linkedListsBeginnerLessons },
          ]}
          activeHref="/algorithms-data-structures/python/linked-lists/beginner/node-basics"
        />
      }
    >
      <InfoPanel id="introduction" title="Introduction" variant="intro">
        <p>
          A linked list is a chain of nodes. Each node stores a value and
          a pointer to the next node. There is no direct indexing, so you
          always move one hop at a time.
        </p>
        <p>
          This is why linked lists feel different from arrays: you trade
          random access for flexible insertion and deletion.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          Think of paper clips linked together. Each clip knows only the
          next clip. To reach the third one, you must walk through the
          first two.
        </p>
      </InfoPanel>

      <section id="node-class" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Node anatomy
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          A node is just a value and a pointer called{" "}
          <span className="font-mono inline-code">next</span>. Keeping the
          class minimal helps you focus on pointer movement.
        </p>
        <CodeBlock code={nodeClassCode} title="Python" />
      </section>

      <section id="manual-link" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Link nodes by hand
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We build three nodes, connect them, and then traverse from the
          head until we hit{" "}
          <span className="font-mono inline-code">None</span>.
        </p>
        <CodeBlock code={buildCode} title="Python" />
        <OutputBlock output={buildOutput} />
      </section>
    </ArticleLayout>
  );
}
