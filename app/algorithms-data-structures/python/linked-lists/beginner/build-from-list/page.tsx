import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
import { linkedListsBeginnerLessons } from "@/lib/adsBeginnerTopics";

const helperCode = `class Node:
    def __init__(self, value, next=None):
        self.value = value
        self.next = next

def from_list(values):
    head = None
    tail = None
    for value in values:
        node = Node(value)
        if head is None:
            head = node
            tail = node
        else:
            tail.next = node
            tail = node
    return head

def to_list(head):
    values = []
    current = head
    while current:
        values.append(current.value)
        current = current.next
    return values`;

const helperUseCode = `head = from_list([10, 20, 30])
print(to_list(head))`;

const helperUseOutput = `[10, 20, 30]`;

export default function BuildFromListPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "introduction", label: "Introduction" },
    { id: "intuition", label: "Intuition" },
    { id: "helpers", label: "Helper functions" },
    { id: "use-helpers", label: "Use the helpers" },
  ];

  return (
    <ArticleLayout
      eyebrow="Algorithms - Python - Linked Lists"
      title="Build From Lists"
      description="Create helper functions that convert between Python lists and linked lists." 
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Within Linked Lists (Beginner)", links: linkedListsBeginnerLessons },
          ]}
          activeHref="/algorithms-data-structures/python/linked-lists/beginner/build-from-list"
        />
      }
    >
      <InfoPanel id="introduction" title="Introduction" variant="intro">
        <p>
          Helper functions keep examples clean. If you can convert back
          and forth from Python lists, every interview question becomes
          easier to test and explain.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          Think of a small assembly line: a tail pointer always holds the
          last node, so you can extend the chain without scanning from
          the head each time.
        </p>
      </InfoPanel>

      <section id="helpers" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Helper functions
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We build a list by walking through the input values and
          attaching each new node to the tail. The reverse conversion
          simply walks the chain and collects values.
        </p>
        <CodeBlock code={helperCode} title="Python" />
      </section>

      <section id="use-helpers" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Use the helpers
        </h2>
        <CodeBlock code={helperUseCode} title="Python" />
        <OutputBlock output={helperUseOutput} />
      </section>
    </ArticleLayout>
  );
}
