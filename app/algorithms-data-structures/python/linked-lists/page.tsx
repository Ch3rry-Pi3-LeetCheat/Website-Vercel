import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import CollapsibleExample from "@/components/CollapsibleExample";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import SketchDiagram from "@/components/SketchDiagram";

const buildCode = `class Node:
    def __init__(self, value, next=None):
        self.value = value
        self.next = next

head = Node(1, Node(2, Node(3)))

values = []
current = head
while current:
    values.append(current.value)
    current = current.next

values`;

const buildOutput = `[1, 2, 3]`;

const reverseCode = `prev = None
current = head

while current:
    nxt = current.next
    current.next = prev
    prev = current
    current = nxt

head = prev

values = []
current = head
while current:
    values.append(current.value)
    current = current.next

values`;

const reverseOutput = `[3, 2, 1]`;

export default function LinkedListsPage() {
  const tocItems = [
    { id: "introduction", label: "Introduction" },
    { id: "intuition", label: "Intuition" },
    { id: "diagram", label: "Diagram: Node chain" },
    { id: "example-1", label: "Example 1: Build and traverse" },
    { id: "example-2", label: "Example 2: Reverse the list" },
  ];

  return (
    <ArticleLayout
      eyebrow="Linked Lists"
      title="Linked lists in Python"
      description="Linked lists trade random access for flexible insertions and deletions. They show up in interviews because they force you to think about pointers and traversal."
      tocItems={tocItems}
    >
      <InfoPanel id="introduction" title="Introduction" variant="intro">
        <p>
          A linked list is a chain of nodes. Each node stores a value and a
          pointer to the next node. You move through the list one hop at a
          time.
        </p>
        <p>
          This structure shines when you need to insert or delete items without
          shifting every element. The cost is that you cannot jump directly to a
          position; you must traverse.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          Think of a linked list like train cars. Each car knows only the next
          car. To reach the third car, you must walk through the first two.
        </p>
        <p>
          That linear walk is the core mental model. Every operation is either
          “follow next” or “rewire next.”
        </p>
      </InfoPanel>

      <div id="diagram" className="scroll-mt-28">
        <SketchDiagram
          title="Sketch: node chain"
          variant="linked-list"
          caption="Each node points to the next one, so traversal is a simple hop-by-hop walk."
        />
      </div>

      <CollapsibleExample
        id="example-1"
        title="Example 1: Build and traverse"
        defaultOpen
      >
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Step by step: create a head node, then give it a pointer to the
          second node, and so on. Traversal always begins at the head. Each hop
          moves to <span className="font-mono text-white">next</span> until that
          pointer is <span className="font-mono text-white">None</span>.
        </p>
        <CodeBlock code={buildCode} title="Python" />
        <OutputBlock output={buildOutput} />
      </CollapsibleExample>

      <CollapsibleExample id="example-2" title="Example 2: Reverse the list">
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Step by step: keep track of the previous node, then redirect the
          current node&apos;s <span className="font-mono text-white">next</span>{" "}
          pointer to that previous node. Move both pointers forward. By the
          end, the last node you touched becomes the new head.
        </p>
        <CodeBlock code={reverseCode} title="Python" />
        <OutputBlock output={reverseOutput} />
      </CollapsibleExample>
    </ArticleLayout>
  );
}
