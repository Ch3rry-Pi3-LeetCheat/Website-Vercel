import ArticleToc from "@/components/ArticleToc";
import CodeBlock from "@/components/CodeBlock";
import CollapsibleExample from "@/components/CollapsibleExample";
import OutputBlock from "@/components/OutputBlock";

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
    { id: "example-1", label: "Example 1: Build and traverse" },
    { id: "example-2", label: "Example 2: Reverse the list" },
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
            Linked Lists
          </p>
          <h1 className="text-4xl font-semibold text-white font-[var(--font-display)]">
            Linked lists in Python
          </h1>
          <p className="max-w-2xl text-base leading-7 text-[color:var(--color-muted)]">
            Linked lists trade random access for flexible insertions and
            deletions. They show up in interviews because they force you to
            think about pointers and traversal.
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
              A linked list is a chain of nodes. Each node stores a value and a
              pointer to the next node. You move through the list one hop at a
              time.
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
              Think of a linked list like train cars. Each car knows only the
              next car. To reach the third car, you must walk through the first
              two.
            </p>
          </div>

          <CollapsibleExample
            id="example-1"
            title="Example 1: Build and traverse"
            defaultOpen
          >
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Step by step: create a head node, then give it a pointer to the
              second node, and so on. Traversal always begins at the head. Each
              hop moves to <span className="font-mono text-white">next</span>{" "}
              until that pointer is{" "}
              <span className="font-mono text-white">None</span>.
            </p>
            <CodeBlock code={buildCode} title="Python" />
            <OutputBlock output={buildOutput} />
          </CollapsibleExample>

          <CollapsibleExample
            id="example-2"
            title="Example 2: Reverse the list"
          >
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Step by step: keep track of the previous node, then redirect the
              current node&apos;s <span className="font-mono text-white">next</span>{" "}
              pointer to that previous node. Move both pointers forward. By the
              end, the last node you touched becomes the new head.
            </p>
            <CodeBlock code={reverseCode} title="Python" />
            <OutputBlock output={reverseOutput} />
          </CollapsibleExample>
        </section>
        </div>
      </div>
    </div>
  );
}
