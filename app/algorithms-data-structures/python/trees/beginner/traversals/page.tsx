import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
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

const preorderCode = `class Node:
    def __init__(self, value, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right

def preorder(node, out):
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

export default function TraversalsPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "introduction", label: "Introduction" },
    { id: "intuition", label: "Intuition" },
    { id: "inorder", label: "Inorder traversal" },
    { id: "preorder", label: "Preorder traversal" },
  ];

  return (
    <ArticleLayout
      eyebrow="Algorithms - Python - Trees"
      title="Traversals"
      description="Traversal is just visiting every node in a consistent order." 
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Within Trees (Beginner)", links: treesBeginnerLessons },
          ]}
          activeHref="/algorithms-data-structures/python/trees/beginner/traversals"
        />
      }
    >
      <InfoPanel id="introduction" title="Introduction" variant="intro">
        <p>
          Traversal means visiting every node. The order you choose
          determines the result, which is why traversal order matters in
          interviews.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          You are walking through a tree like a maze. The rule you follow
          for left or right decides the path you take.
        </p>
      </InfoPanel>

      <section id="inorder" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Inorder traversal
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Inorder visits left, then root, then right. On a binary search
          tree, it produces sorted values.
        </p>
        <CodeBlock code={inorderCode} title="Python" />
        <OutputBlock output={inorderOutput} />
      </section>

      <section id="preorder" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Preorder traversal
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Preorder visits root first, then left, then right. It is useful
          when you want to record the tree structure.
        </p>
        <CodeBlock code={preorderCode} title="Python" />
        <OutputBlock output={preorderOutput} />
      </section>
    </ArticleLayout>
  );
}
