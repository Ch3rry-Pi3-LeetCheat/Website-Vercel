import CodeBlock from "@/components/CodeBlock";
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
  return (
    <div className="px-6 pb-20 pt-12">
      <div className="mx-auto w-full max-w-5xl">
        <header className="grid gap-4">
          <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--color-accent-2)]">
            Linked Lists
          </p>
          <h1 className="text-4xl font-semibold text-white font-[var(--font-display)]">
            Linked lists in Python
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-[color:var(--color-muted)]">
            Linked lists trade random access for flexible insertions and
            deletions. They show up in interviews because they force you to
            think about pointers and traversal.
          </p>
        </header>

        <section className="mt-10 grid gap-6">
          <div className="glass-panel rounded-2xl px-6 py-6">
            <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
              Introduction
            </h2>
            <p className="mt-3 text-sm leading-6 text-[color:var(--color-muted)]">
              A linked list is a chain of nodes. Each node stores a value and a
              pointer to the next node. You move through the list one hop at a
              time.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[color:var(--color-surface)] px-6 py-6">
            <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
              Intuition
            </h2>
            <p className="mt-3 text-sm leading-6 text-[color:var(--color-muted)]">
              Think of a linked list like train cars. Each car knows only the
              next car. To reach the third car, you must walk through the first
              two.
            </p>
          </div>

          <section className="grid gap-4">
            <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
              Example 1: Build and traverse
            </h3>
            <ol className="grid gap-2 text-sm text-[color:var(--color-muted)]">
              <li>Create nodes and link them together.</li>
              <li>Start at the head node.</li>
              <li>Walk node by node until you reach the end.</li>
            </ol>
            <CodeBlock code={buildCode} title="Python" />
            <OutputBlock output={buildOutput} />
          </section>

          <section className="grid gap-4">
            <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
              Example 2: Reverse the list
            </h3>
            <ol className="grid gap-2 text-sm text-[color:var(--color-muted)]">
              <li>Keep a pointer to the previous node.</li>
              <li>Flip the next pointer as you walk forward.</li>
              <li>The last node becomes the new head.</li>
            </ol>
            <CodeBlock code={reverseCode} title="Python" />
            <OutputBlock output={reverseOutput} />
          </section>
        </section>
      </div>
    </div>
  );
}
