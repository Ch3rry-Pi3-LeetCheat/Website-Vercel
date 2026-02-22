import BeginnerLessonTemplate from "@/components/ads/BeginnerLessonTemplate";
import TraversalExplorer from "@/components/ads/TraversalExplorer";
import { treesBeginnerLessons } from "@/lib/adsBeginnerTopics";

const bstCode = `class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def insert(root, value):
    if root is None:
        return Node(value)
    if value < root.value:
        root.left = insert(root.left, value)
    else:
        root.right = insert(root.right, value)
    return root

def search(root, target):
    current = root
    while current:
        if target == current.value:
            return True
        if target < current.value:
            current = current.left
        else:
            current = current.right
    return False`;

const runCode = `root = None
for value in [8, 3, 10, 1, 6, 14]:
    root = insert(root, value)

print(search(root, 6))
print(search(root, 7))`;

const runOutput = `True
False`;

const nodes = [
  { id: "8", label: "8", x: 180, y: 30 },
  { id: "3", label: "3", x: 110, y: 95 },
  { id: "10", label: "10", x: 250, y: 95 },
  { id: "1", label: "1", x: 70, y: 165 },
  { id: "6", label: "6", x: 150, y: 165 },
  { id: "14", label: "14", x: 290, y: 165 },
];

const edges = [
  { from: "8", to: "3" },
  { from: "8", to: "10" },
  { from: "3", to: "1" },
  { from: "3", to: "6" },
  { from: "10", to: "14" },
];

export default function BstBasicsPage() {
  return (
    <BeginnerLessonTemplate
      eyebrow="CS - Python - Trees"
      title="BST Basics"
      description="Understand BST ordering and how it narrows search paths compared with plain tree scans."
      intro={[
        "A Binary Search Tree (BST) adds an ordering rule: left subtree values are smaller, right subtree values are larger.",
        "That ordering gives directed search: each comparison decides one branch and discards the other.",
      ]}
      intuition={[
        "Think of number guessing with hints: each hint halves your candidate region.",
        "BST search applies the same idea structurally by going left or right based on comparison.",
      ]}
      realWorld={[
        {
          scenario: "Ranked key storage",
          mapping:
            "Ordered structures support range queries better than plain hash maps.",
        },
        {
          scenario: "Auto-complete internals (simplified)",
          mapping:
            "Ordered node decisions prune irrelevant branches early.",
        },
      ]}
      keyIdeaTitle="BST ordering rule"
      keyIdeaText={[
        "For node v: all left values < v, all right values > v (or >= based on convention).",
        "Insert and search both follow repeated compare-and-branch steps.",
        "Balanced BSTs give O(log n) average behavior, but skewed trees degrade to O(n).",
      ]}
      interactiveDescription="Trace search path for target 6 in the BST."
      interactive={
        <TraversalExplorer
          title="BST search path"
          subtitle="Target = 6. Branch choices follow comparisons."
          nodes={nodes}
          edges={edges}
          steps={[
            {
              title: "Start at root 8",
              explanation: "6 < 8, so move left.",
              current: "8",
              visited: ["8"],
              frontier: ["3"],
            },
            {
              title: "At node 3",
              explanation: "6 > 3, so move right.",
              current: "3",
              visited: ["8", "3"],
              frontier: ["6"],
            },
            {
              title: "At node 6",
              explanation: "Match found.",
              current: "6",
              visited: ["8", "3", "6"],
              frontier: [],
            },
          ]}
        />
      }
      examples={[
        {
          id: "ex-bst-fns",
          title: "Example 1: Insert and search helpers",
          explanation:
            "Recursive insert plus iterative search is a common beginner combination.",
          code: bstCode,
        },
        {
          id: "ex-bst-run",
          title: "Example 2: Build and query BST",
          explanation:
            "Search success and miss cases show branch logic clearly.",
          code: runCode,
          output: runOutput,
        },
      ]}
      complexityRows={[
        { operation: "Search (balanced BST)", averageTime: String.raw`O(\log n)`, extraSpace: String.raw`O(1)` },
        { operation: "Insert (balanced BST)", averageTime: String.raw`O(\log n)`, extraSpace: String.raw`O(h)` },
        { operation: "Search/insert (skewed)", averageTime: String.raw`O(n)`, extraSpace: String.raw`O(1)` },
      ]}
      pitfalls={[
        "Assuming BST is always balanced unless explicitly guaranteed.",
        "Using inconsistent duplicate handling rules between insert and search.",
        "Forgetting that recursion depth grows with tree height in skewed trees.",
      ]}
      summary={[
        "BST adds value ordering on top of binary tree structure.",
        "Each comparison removes one branch from consideration.",
        "Performance depends heavily on tree shape (balanced vs skewed).",
      ]}
      nextStep="After trees, we move to heaps, another tree-shaped structure with a different ordering guarantee optimized for min/max access."
      railTitle="Within Trees (Beginner)"
      railLinks={treesBeginnerLessons}
      activeHref="/algorithms-data-structures/python/trees/beginner/bst-basics"
    />
  );
}

