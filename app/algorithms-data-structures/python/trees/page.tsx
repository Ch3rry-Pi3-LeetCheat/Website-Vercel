import ArticleToc from "@/components/ArticleToc";
import CodeBlock from "@/components/CodeBlock";
import CollapsibleExample from "@/components/CollapsibleExample";
import OutputBlock from "@/components/OutputBlock";

const buildCode = `class Node:
    def __init__(self, value, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right

tree = Node(2, Node(1), Node(3))

def inorder(node, output):
    if not node:
        return
    inorder(node.left, output)
    output.append(node.value)
    inorder(node.right, output)

values = []
inorder(tree, values)
values`;

const buildOutput = `[1, 2, 3]`;

const bfsCode = `from collections import deque

queue = deque([tree])
order = []

while queue:
    node = queue.popleft()
    order.append(node.value)
    if node.left:
        queue.append(node.left)
    if node.right:
        queue.append(node.right)

order`;

const bfsOutput = `[2, 1, 3]`;

export default function TreesPage() {
  const tocItems = [
    { id: "introduction", label: "Introduction" },
    { id: "intuition", label: "Intuition" },
    { id: "example-1", label: "Example 1: In-order traversal" },
    { id: "example-2", label: "Example 2: Level-order BFS" },
  ];

  return (
    <div className="px-6 pb-20 pt-12">
      <div className="mx-auto w-full max-w-6xl lg:grid lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <ArticleToc items={tocItems} />
          </div>
        </aside>

        <div>
          <header className="grid gap-4">
          <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--color-accent-2)]">
            Trees
          </p>
          <h1 className="text-4xl font-semibold text-white font-[var(--font-display)]">
            Trees in Python
          </h1>
          <p className="max-w-2xl text-base leading-7 text-[color:var(--color-muted)]">
            Trees model hierarchies. They help you reason about recursion,
            searching, and structure in interview questions.
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
              A tree is a set of nodes with parent-child relationships. The
              most common interview structure is a binary tree, where each node
              has up to two children.
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
              Picture an org chart. You start at the CEO (root) and move down
              through managers and teams. Each branch is a smaller problem you
              can solve the same way.
            </p>
          </div>

          <CollapsibleExample
            id="example-1"
            title="Example 1: In-order traversal"
            defaultOpen
          >
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Step by step: start at the root, keep moving left until there is
              no left child, then record the value. After recording, move to
              the right subtree and repeat. This produces sorted output for a
              binary search tree.
            </p>
            <CodeBlock code={buildCode} title="Python" />
            <OutputBlock output={buildOutput} />
          </CollapsibleExample>

          <CollapsibleExample
            id="example-2"
            title="Example 2: Level-order traversal (BFS)"
          >
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Step by step: put the root in a queue, then repeatedly remove the
              front node and add its children to the back. The queue ensures you
              finish a level before moving deeper.
            </p>
            <CodeBlock code={bfsCode} title="Python" />
            <OutputBlock output={bfsOutput} />
          </CollapsibleExample>
        </section>
        </div>
      </div>
    </div>
  );
}
