import ArticleLayout from "@/components/ArticleLayout";
import ComplexityTable from "@/components/ads/ComplexityTable";
import CodeBlock from "@/components/CodeBlock";
import CollapsibleExample from "@/components/CollapsibleExample";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import SketchDiagram from "@/components/SketchDiagram";
import RightRail from "@/components/RightRail";
import { adsPythonTopics } from "@/lib/adsTopics";

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
    { id: "complexity", label: "Complexity quick sheet" },
    { id: "diagram", label: "Diagram: Binary tree" },
    { id: "example-1", label: "Example 1: In-order traversal" },
    { id: "example-2", label: "Example 2: Level-order BFS" },
    { id: "summary", label: "Summary" },
  ];

  return (
    <ArticleLayout
      eyebrow="Trees"
      title="Trees in Python"
      description="Trees model hierarchies. They help you reason about recursion, searching, and structure in interview questions."
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Within CS (Python)", links: adsPythonTopics },
          ]}
          activeHref="/algorithms-data-structures/python/trees"
        />
      }
    >
      <InfoPanel id="introduction" title="Introduction" variant="intro">
        <p>
          A tree is a set of nodes with parent-child relationships. The most
          common interview structure is a binary tree, where each node has up to
          two children.
        </p>
        <p>
          Trees let you divide a problem into smaller subtrees. That recursive
          shape is why they appear in traversal, search, and hierarchy problems.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          Picture an org chart. You start at the CEO (root) and move down
          through managers and teams. Each branch is a smaller problem you can
          solve the same way.
        </p>
        <p>
          If you can solve a tree for one node, you can solve it for every node
          by applying the same logic recursively.
        </p>
        <div className="mt-1 grid gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">
            Real-world intuition
          </p>
          <p className="text-sm text-[color:var(--color-muted)]">
            <span className="text-white font-semibold">File systems:</span>{" "}
            folders contain subfolders and files recursively.
          </p>
          <p className="text-sm text-[color:var(--color-muted)]">
            <span className="text-white font-semibold">Decision trees:</span>{" "}
            each branch asks a question and narrows to a leaf outcome.
          </p>
        </div>
      </InfoPanel>

      <section id="complexity" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Complexity quick sheet
        </h2>
        <ComplexityTable
          rows={[
            { operation: "Traverse all nodes", averageTime: String.raw`O(n)`, extraSpace: String.raw`O(h)` },
            { operation: "BST search (balanced)", averageTime: String.raw`O(\log n)`, extraSpace: String.raw`O(1)` },
            { operation: "BST insert (balanced)", averageTime: String.raw`O(\log n)`, extraSpace: String.raw`O(1)` },
            { operation: "BST search (worst skew)", averageTime: String.raw`O(n)`, extraSpace: String.raw`O(1)` },
          ]}
        />
      </section>

      <div id="diagram" className="scroll-mt-28">
        <SketchDiagram
          title="Sketch: binary tree"
          variant="tree"
          caption="Each node splits into left and right subtrees."
        />
      </div>

      <CollapsibleExample
        id="example-1"
        title="Example 1: In-order traversal"
        defaultOpen
      >
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Step by step: start at the root, keep moving left until there is no
          left child, then record the value. After recording, move to the right
          subtree and repeat. This produces sorted output for a binary search
          tree.
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

      <section id="summary" className="scroll-mt-28 grid gap-3">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Summary
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Trees reward recursive thinking and careful base cases. Mastering
          traversal templates unlocks a large share of interview tree problems.
        </p>
      </section>
    </ArticleLayout>
  );
}

