import BeginnerLessonTemplate from "@/components/ads/BeginnerLessonTemplate";
import TraversalExplorer from "@/components/ads/TraversalExplorer";
import { treesBeginnerLessons } from "@/lib/adsBeginnerTopics";

const inorderCode = `class Node:
    def __init__(self, value, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right

def inorder(node, out):
    if not node:
        return
    inorder(node.left, out)
    out.append(node.value)
    inorder(node.right, out)

root = Node(2, Node(1), Node(3))
values = []
inorder(root, values)
print(values)`;

const inorderOutput = `[1, 2, 3]`;

const preorderCode = `def preorder(node, out):
    if not node:
        return
    out.append(node.value)
    preorder(node.left, out)
    preorder(node.right, out)

root = Node(2, Node(1), Node(3))
values = []
preorder(root, values)
print(values)`;

const preorderOutput = `[2, 1, 3]`;

const nodes = [
  { id: "2", label: "2", x: 180, y: 30 },
  { id: "1", label: "1", x: 100, y: 95 },
  { id: "3", label: "3", x: 260, y: 95 },
];

const edges = [
  { from: "2", to: "1" },
  { from: "2", to: "3" },
];

export default function TraversalsPage() {
  return (
    <BeginnerLessonTemplate
      eyebrow="CS - Python - Trees"
      title="Traversals"
      description="Learn traversal orders (inorder, preorder) and how ordering changes output meaning."
      intro={[
        "Traversal means visiting every node exactly once using a consistent rule.",
        "The chosen order matters because it changes output sequence and problem behavior.",
      ]}
      intuition={[
        "Think of exploring a museum with a route policy: left wing first, center first, or right wing first.",
        "Same rooms, different path rules, different visit logs.",
      ]}
      realWorld={[
        {
          scenario: "Expression trees",
          mapping:
            "Different traversals can reconstruct infix/prefix representations.",
        },
        {
          scenario: "Serialization",
          mapping:
            "Preorder is often used to capture tree structure for storage/transmission.",
        },
      ]}
      keyIdeaTitle="Order definitions"
      keyIdeaText={[
        "Inorder: left -> node -> right.",
        "Preorder: node -> left -> right.",
        "Postorder (not fully covered here): left -> right -> node.",
      ]}
      interactiveDescription="Step through inorder traversal and inspect visited order growth."
      interactive={
        <TraversalExplorer
          title="Inorder traversal stepper"
          subtitle="Tree: root 2 with children 1 and 3."
          nodes={nodes}
          edges={edges}
          steps={[
            {
              title: "Move left first",
              explanation: "Inorder starts by descending left.",
              current: "1",
              visited: [],
              frontier: ["2", "3"],
            },
            {
              title: "Visit node 1",
              explanation: "Left child has no further left branch, so record 1.",
              current: "1",
              visited: ["1"],
              frontier: ["2", "3"],
            },
            {
              title: "Visit root 2",
              explanation: "Return upward and record root after left subtree.",
              current: "2",
              visited: ["1", "2"],
              frontier: ["3"],
            },
            {
              title: "Visit node 3",
              explanation: "Finally traverse right subtree.",
              current: "3",
              visited: ["1", "2", "3"],
              frontier: [],
            },
          ]}
        />
      }
      examples={[
        {
          id: "ex-inorder",
          title: "Example 1: Inorder traversal",
          explanation:
            "In a BST, inorder yields sorted values.",
          code: inorderCode,
          output: inorderOutput,
        },
        {
          id: "ex-preorder",
          title: "Example 2: Preorder traversal",
          explanation:
            "Preorder visits root first, useful when structure order matters.",
          code: preorderCode,
          output: preorderOutput,
        },
      ]}
      complexityRows={[
        { operation: "Inorder traversal", averageTime: String.raw`O(n)`, extraSpace: String.raw`O(h)` },
        { operation: "Preorder traversal", averageTime: String.raw`O(n)`, extraSpace: String.raw`O(h)` },
      ]}
      pitfalls={[
        "Mixing traversal order mentally and expecting the wrong output.",
        "Missing null/base checks, causing attribute errors.",
        "Ignoring recursion depth concerns in highly skewed trees.",
      ]}
      summary={[
        "Traversal order is a policy choice with meaningful consequences.",
        "Inorder and preorder are core templates you should memorize.",
        "Tree problems are often easier once traversal order is chosen first.",
      ]}
      nextStep="Next we focus on Binary Search Trees, where value ordering enables faster search and insertion."
      railTitle="Within Trees (Beginner)"
      railLinks={treesBeginnerLessons}
      activeHref="/algorithms-data-structures/python/trees/beginner/traversals"
    />
  );
}

