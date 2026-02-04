import CodeBlock from "@/components/CodeBlock";
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
  return (
    <div className="px-6 pb-20 pt-12">
      <div className="mx-auto w-full max-w-5xl">
        <header className="grid gap-4">
          <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--color-accent-2)]">
            Trees
          </p>
          <h1 className="text-4xl font-semibold text-white font-[var(--font-display)]">
            Trees in Python
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-[color:var(--color-muted)]">
            Trees model hierarchies. They help you reason about recursion,
            searching, and structure in interview questions.
          </p>
        </header>

        <section className="mt-10 grid gap-6">
          <div className="intro-panel rounded-2xl px-6 py-6">
            <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
              Introduction
            </h2>
            <p className="mt-3 text-sm leading-6 text-[color:var(--color-muted)]">
              A tree is a set of nodes with parent-child relationships. The
              most common interview structure is a binary tree, where each node
              has up to two children.
            </p>
          </div>

          <div className="intuition-panel rounded-2xl px-6 py-6">
            <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
              Intuition
            </h2>
            <p className="mt-3 text-sm leading-6 text-[color:var(--color-muted)]">
              Picture an org chart. You start at the CEO (root) and move down
              through managers and teams. Each branch is a smaller problem you
              can solve the same way.
            </p>
          </div>

          <section className="grid gap-4">
            <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
              Example 1: In-order traversal
            </h3>
            <p className="text-sm leading-6 text-[color:var(--color-muted)]">
              Step by step: start at the root, keep moving left until there is
              no left child, then record the value. After recording, move to
              the right subtree and repeat. This produces sorted output for a
              binary search tree.
            </p>
            <CodeBlock code={buildCode} title="Python" />
            <OutputBlock output={buildOutput} />
          </section>

          <section className="grid gap-4">
            <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
              Example 2: Level-order traversal (BFS)
            </h3>
            <p className="text-sm leading-6 text-[color:var(--color-muted)]">
              Step by step: put the root in a queue, then repeatedly remove the
              front node and add its children to the back. The queue ensures you
              finish a level before moving deeper.
            </p>
            <CodeBlock code={bfsCode} title="Python" />
            <OutputBlock output={bfsOutput} />
          </section>
        </section>
      </div>
    </div>
  );
}
