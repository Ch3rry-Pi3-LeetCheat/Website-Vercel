import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import CollapsibleExample from "@/components/CollapsibleExample";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
import { adsPythonTopics } from "@/lib/adsTopics";

const nodeClassCode = `class Node:
    def __init__(self, value, next=None):
        self.value = value
        self.next = next`;

const helperCode = `def from_list(values):
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
    return values

def print_list(head, limit=20):
    values = []
    current = head
    steps = 0
    while current and steps < limit:
        values.append(str(current.value))
        current = current.next
        steps += 1
    if current:
        values.append("...")
    print(" -> ".join(values))`;

const buildCode = `head = from_list([1, 2, 3])

current = head
values = []

while current:
    values.append(current.value)
    current = current.next

values`;

const buildOutput = `[1, 2, 3]`;

const reverseCode = `head = from_list([1, 2, 3])

prev = None
current = head

while current:
    nxt = current.next
    current.next = prev
    prev = current
    current = nxt

head = prev
to_list(head)`;

const reverseOutput = `[3, 2, 1]`;

const reverseRecursiveCode = `def reverse_recursive(node):
    if node is None or node.next is None:
        return node
    new_head = reverse_recursive(node.next)
    node.next.next = node
    node.next = None
    return new_head

head = from_list([1, 2, 3])
head = reverse_recursive(head)
to_list(head)`;

const reverseRecursiveOutput = `[3, 2, 1]`;

const dummyCode = `dummy = Node(0)
dummy.next = head

prev = dummy
current = head

while current:
    if current.value == 6:
        prev.next = current.next
    else:
        prev = current
    current = current.next

head = dummy.next`;

const fastSlowCode = `slow = head
fast = head

while fast and fast.next:
    slow = slow.next
    fast = fast.next.next

# slow is now the middle node`;

export default function LinkedListsPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "introduction", label: "Introduction" },
    { id: "intuition", label: "Intuition" },
    { id: "two-moves", label: "Core mental model" },
    { id: "node-anatomy", label: "Node anatomy + helpers" },
    { id: "diagram", label: "Diagram: Node chain" },
    { id: "example-1", label: "Example 1: Build and traverse" },
    { id: "example-2", label: "Example 2: Reverse the list" },
    { id: "example-3", label: "Bonus: Recursive reversal" },
    { id: "patterns", label: "Patterns you will reuse" },
    { id: "pattern-dummy", label: "Dummy node", level: 2 },
    { id: "pattern-fast-slow", label: "Fast/slow pointers", level: 2 },
    { id: "pattern-safety", label: "Pointer safety rules", level: 2 },
    { id: "edge-cases", label: "Edge cases" },
  ];

  return (
    <ArticleLayout
      eyebrow="Linked Lists"
      title="Linked lists in Python"
      description="Linked lists trade random access for flexible insertions and deletions. They show up in interviews because they force you to think about pointers and traversal."
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Within Algorithms (Python)", links: adsPythonTopics },
          ]}
          activeHref="/algorithms-data-structures/python/linked-lists"
        />
      }
    >
      <InfoPanel id="introduction" title="Introduction" variant="intro">
        <p>
          A linked list is a chain of nodes. Each node stores a{" "}
          <strong className="text-white">value</strong> and a pointer to the{" "}
          <span className="font-mono text-white">next</span> node. There is{" "}
          <strong className="text-white">no direct indexing</strong>, so every
          lookup walks node-by-node.
        </p>
        <p>
          Interviews love linked lists because they force{" "}
          <strong className="text-white">pointer reasoning</strong>: traversal,
          rewiring, and guarding against{" "}
          <span className="font-mono text-white">None</span>. The most common
          patterns are the <strong className="text-white">dummy node</strong>,
          <strong className="text-white"> fast/slow pointers</strong>, and{" "}
          <strong className="text-white">in-place reversal</strong>.
        </p>
      </InfoPanel>

      <div className="glass-panel rounded-2xl px-6 py-6">
        <h3 className="text-lg font-semibold text-white">
          Why interviews love linked lists
        </h3>
        <ul className="mt-3 grid gap-2 text-sm text-[color:var(--color-muted)]">
          <li>
            <strong className="text-white">Pointer reasoning:</strong> you must
            explain where <span className="font-mono text-white">current</span>
            and <span className="font-mono text-white">next</span> point.
          </li>
          <li>
            <strong className="text-white">Traversal + rewiring:</strong> the
            two core operations behind most linked list problems.
          </li>
          <li>
            <strong className="text-white">Classic patterns:</strong> dummy node,
            fast/slow pointers, and iterative reversal show up constantly.
          </li>
        </ul>
      </div>

      <div className="glass-panel rounded-2xl px-6 py-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold text-white">When to use</h3>
            <ul className="mt-3 grid gap-2 text-sm text-[color:var(--color-muted)]">
              <li>Frequent insert/delete in the middle.</li>
              <li>Streaming data where you only move forward.</li>
              <li>When memory reallocation costs matter.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">When not to use</h3>
            <ul className="mt-3 grid gap-2 text-sm text-[color:var(--color-muted)]">
              <li>Random access is required.</li>
              <li>You need fast indexing by position.</li>
              <li>Arrays already solve the problem cleanly.</li>
            </ul>
          </div>
        </div>
      </div>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          Think of a linked list like train cars. Each car knows only the next
          car. To reach the third car, you must walk through the first two.
        </p>
        <p>
          Every linked list solution is a careful walk or a careful rewiring.
          If you can picture the pointers moving, you can explain the code.
        </p>
      </InfoPanel>

      <section id="two-moves" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Core mental model: two moves only
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Linked list work is basically two operations:{" "}
          <strong className="text-white">follow pointers</strong> to traverse
          and <strong className="text-white">rewire pointers</strong> to mutate.
          Every question is a variation of those two moves.
        </p>
        <div className="glass-panel rounded-2xl px-6 py-5 text-sm text-[color:var(--color-muted)]">
          <strong className="text-white">If you remember one thing:</strong>{" "}
          always know where{" "}
          <span className="font-mono text-white">current</span> points, where{" "}
          <span className="font-mono text-white">current.next</span> points, and
          what you are about to change.
        </div>
      </section>

      <section id="node-anatomy" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Node anatomy + minimal helpers
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          A node has two fields:{" "}
          <span className="font-mono text-white">value</span> and{" "}
          <span className="font-mono text-white">next</span>. Keeping it minimal
          helps you focus on pointer movement, not class noise.
        </p>
        <CodeBlock code={nodeClassCode} title="Python" />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          These tiny helper functions make every example easier to read. They
          also reduce interview mistakes by handling boilerplate cleanly.
        </p>
        <CodeBlock code={helperCode} title="Python helpers" />
      </section>

      <div id="diagram" className="scroll-mt-28 sketch-panel rounded-2xl px-6 py-5">
        <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
          Diagram: node chain
        </p>
        <img
          src="/diagrams/linked-lists/node-chain.svg"
          alt="Linked list node chain"
          className="mt-4 w-full max-w-3xl"
        />
        <p className="mt-3 text-sm leading-6 text-[color:var(--color-muted)]">
          Each node points to the next one, so traversal is a hop-by-hop walk
          from <span className="font-mono text-white">head</span> to{" "}
          <span className="font-mono text-white">None</span>.
        </p>
      </div>

      <CollapsibleExample
        id="example-1"
        title="Example 1: Build and traverse"
        defaultOpen
      >
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Step by step:{" "}
          <strong className="text-white">current starts at head</strong>. Each
          loop reads the value, then hops forward with{" "}
          <span className="font-mono text-white">current = current.next</span>.
          The loop ends when{" "}
          <span className="font-mono text-white">current</span> becomes{" "}
          <span className="font-mono text-white">None</span>.
        </p>
        <CodeBlock code={buildCode} title="Python" />
        <OutputBlock output={buildOutput} />
        <div className="glass-panel rounded-2xl px-5 py-4 text-sm text-[color:var(--color-muted)]">
          <strong className="text-white">Common bug:</strong> forgetting to
          advance{" "}
          <span className="font-mono text-white">current</span> causes an
          infinite loop.
        </div>
        <p className="text-sm text-[color:var(--color-muted)]">
          <strong className="text-white">Complexity:</strong> O(n) time, O(1)
          extra space.
        </p>
      </CollapsibleExample>

      <CollapsibleExample id="example-2" title="Example 2: Reverse the list">
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The reversal pattern uses three pointers:{" "}
          <strong className="text-white">prev</strong> (already reversed part),{" "}
          <strong className="text-white">current</strong> (node being processed),
          and <strong className="text-white">nxt</strong> (remainder of the list).
        </p>
        <CodeBlock code={reverseCode} title="Python" />
        <OutputBlock output={reverseOutput} />
        <div className="glass-panel rounded-2xl px-5 py-4 text-sm text-[color:var(--color-muted)]">
          <strong className="text-white">
            What breaks if you don&apos;t store nxt first?
          </strong>{" "}
          You lose access to the remainder of the list because you overwrite{" "}
          <span className="font-mono text-white">current.next</span>.
        </div>
        <div className="grid gap-3 text-sm text-[color:var(--color-muted)]">
          <p>
            <strong className="text-white">Iteration 1:</strong> current=1,
            nxt=2, rewire 1 -> None, move forward.
          </p>
          <p>
            <strong className="text-white">Iteration 2:</strong> current=2,
            nxt=3, rewire 2 -> 1, move forward.
          </p>
          <p>
            <strong className="text-white">Iteration 3:</strong> current=3,
            nxt=None, rewire 3 -> 2, stop.
          </p>
        </div>
        <p className="text-sm text-[color:var(--color-muted)]">
          <strong className="text-white">Complexity:</strong> O(n) time, O(1)
          extra space.
        </p>
      </CollapsibleExample>

      <CollapsibleExample
        id="example-3"
        title="Bonus: Recursive reversal (interview: only if asked)"
      >
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Recursion can be elegant, but it uses the call stack. In interviews,
          prefer the iterative version unless asked for recursion.
        </p>
        <CodeBlock code={reverseRecursiveCode} title="Python" />
        <OutputBlock output={reverseRecursiveOutput} />
        <p className="text-sm text-[color:var(--color-muted)]">
          <strong className="text-white">Complexity:</strong> O(n) time, O(n)
          stack space.
        </p>
      </CollapsibleExample>

      <section id="patterns" className="scroll-mt-28 grid gap-6">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Patterns you will reuse in LeetCode
        </h2>

        <div id="pattern-dummy" className="glass-panel rounded-2xl px-6 py-6">
          <h3 className="text-lg font-semibold text-white">
            Dummy node (sentinel)
          </h3>
          <p className="mt-3 text-base leading-7 text-[color:var(--color-muted)]">
            A dummy node makes head edge cases disappear. You always insert or
            remove after the dummy, then return{" "}
            <span className="font-mono text-white">dummy.next</span>.
          </p>
          <CodeBlock code={dummyCode} title="Python" />
        </div>

        <div
          id="pattern-fast-slow"
          className="glass-panel rounded-2xl px-6 py-6"
        >
          <h3 className="text-lg font-semibold text-white">
            Fast/slow pointers
          </h3>
          <p className="mt-3 text-base leading-7 text-[color:var(--color-muted)]">
            Fast moves two steps, slow moves one. When fast reaches the end,
            slow is at the middle. The same idea detects cycles when fast
            catches slow.
          </p>
          <CodeBlock code={fastSlowCode} title="Python" />
        </div>

        <div
          id="pattern-safety"
          className="glass-panel rounded-2xl px-6 py-6"
        >
          <h3 className="text-lg font-semibold text-white">
            Pointer safety rules
          </h3>
          <ul className="mt-3 grid gap-2 text-sm text-[color:var(--color-muted)]">
            <li>
              Store{" "}
              <span className="font-mono text-white">nxt = current.next</span>{" "}
              before rewiring.
            </li>
            <li>Do not lose the head unless you mean to.</li>
            <li>
              Always guard{" "}
              <span className="font-mono text-white">current</span> and{" "}
              <span className="font-mono text-white">current.next</span> before
              accessing.
            </li>
          </ul>
        </div>
      </section>

      <section id="edge-cases" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Edge cases checklist
        </h2>
        <ul className="grid gap-2 text-sm text-[color:var(--color-muted)]">
          <li>Empty list: head is None.</li>
          <li>One node: traversal works, reversal is a no-op.</li>
          <li>Two nodes: verify both pointers update correctly.</li>
          <li>Already reversed or repeated values: should not matter.</li>
        </ul>
      </section>
    </ArticleLayout>
  );
}
