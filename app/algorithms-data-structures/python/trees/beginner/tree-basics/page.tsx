import BeginnerLessonTemplate from "@/components/ads/BeginnerLessonTemplate";
import TraversalExplorer from "@/components/ads/TraversalExplorer";
import { treesBeginnerLessons } from "@/lib/adsBeginnerTopics";

const nodeCode = `class Node:
    def __init__(self, value, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right

root = Node(
    10,
    Node(6, Node(3), Node(8)),
    Node(14, Node(12), Node(16)),
)`;

const inspectCode = `print(root.value)          # root
print(root.left.value)     # left child
print(root.right.value)    # right child
print(root.left.left.value)`;

const inspectOutput = `10
6
14
3`;

const treeNodes = [
  { id: "10", label: "10", x: 180, y: 30 },
  { id: "6", label: "6", x: 100, y: 95 },
  { id: "14", label: "14", x: 260, y: 95 },
  { id: "3", label: "3", x: 60, y: 165 },
  { id: "8", label: "8", x: 140, y: 165 },
  { id: "12", label: "12", x: 220, y: 165 },
  { id: "16", label: "16", x: 300, y: 165 },
];

const treeEdges = [
  { from: "10", to: "6" },
  { from: "10", to: "14" },
  { from: "6", to: "3" },
  { from: "6", to: "8" },
  { from: "14", to: "12" },
  { from: "14", to: "16" },
];

export default function TreeBasicsPage() {
  return (
    <BeginnerLessonTemplate
      eyebrow="CS - Python - Trees"
      title="Tree Basics"
      description="Understand tree structure, core vocabulary, and why recursive thinking fits trees naturally."
      intro={[
        "A tree is a hierarchical structure with one root and child branches.",
        "Binary trees cap each node at two children: left and right.",
      ]}
      intuition={[
        "Think of a family tree or folder tree. Each branch splits into smaller branches of the same shape.",
        "That self-similar shape is why recursion works well: solve one node, then solve children similarly.",
      ]}
      realWorld={[
        {
          scenario: "File system explorer",
          mapping:
            "Folders contain subfolders/files recursively, just like a tree.",
        },
        {
          scenario: "Organization chart",
          mapping:
            "Manager nodes branch into team members and sub-teams.",
        },
      ]}
      keyIdeaTitle="Core vocabulary"
      keyIdeaText={[
        "Root: top-most node.",
        "Leaf: node with no children.",
        "Height: longest downward path length from root.",
      ]}
      interactiveDescription="Use step controls to identify key tree terms on a fixed tree."
      interactive={
        <TraversalExplorer
          title="Tree vocabulary explorer"
          subtitle="Current node highlights the concept being discussed."
          nodes={treeNodes}
          edges={treeEdges}
          steps={[
            {
              title: "Root",
              explanation: "Node 10 is root because it has no parent.",
              current: "10",
              visited: ["10"],
              frontier: ["6", "14"],
            },
            {
              title: "Internal nodes",
              explanation: "Nodes 6 and 14 have children, so they are internal nodes.",
              current: "6",
              visited: ["10", "6", "14"],
              frontier: ["3", "8", "12", "16"],
            },
            {
              title: "Leaf nodes",
              explanation: "Nodes 3, 8, 12, 16 have no children, so they are leaves.",
              current: "16",
              visited: ["3", "8", "12", "16"],
              frontier: [],
            },
          ]}
        />
      }
      examples={[
        {
          id: "ex-node-def",
          title: "Example 1: Build a binary tree",
          explanation:
            "Define a Node class and create a small balanced tree manually.",
          code: nodeCode,
        },
        {
          id: "ex-inspect",
          title: "Example 2: Access root and children",
          explanation:
            "Dot navigation makes parent-child relationships explicit.",
          code: inspectCode,
          output: inspectOutput,
        },
      ]}
      complexityRows={[
        { operation: "Visit all nodes", averageTime: String.raw`O(n)`, extraSpace: String.raw`O(h)` },
        { operation: "Tree height (balanced)", averageTime: String.raw`O(\log n)`, extraSpace: String.raw`O(1)` },
        { operation: "Tree height (skewed)", averageTime: String.raw`O(n)`, extraSpace: String.raw`O(1)` },
      ]}
      pitfalls={[
        "Confusing tree depth and height definitions.",
        "Forgetting base case checks in recursive tree code.",
        "Assuming all trees are balanced unless explicitly stated.",
      ]}
      summary={[
        "Trees represent hierarchical relationships naturally.",
        "Binary-tree vocabulary (root/internal/leaf/height) is foundational.",
        "Recursive decomposition is the default thinking model for tree problems.",
      ]}
      nextStep="Next we will explore traversal orders, where the same tree yields different visit sequences."
      railTitle="Within Trees (Beginner)"
      railLinks={treesBeginnerLessons}
      activeHref="/algorithms-data-structures/python/trees/beginner/tree-basics"
    />
  );
}

