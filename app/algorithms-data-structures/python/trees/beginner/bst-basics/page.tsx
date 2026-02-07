import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
import { treesBeginnerLessons } from "@/lib/adsBeginnerTopics";

const bstCode = `class Node:
    def __init__(self, value, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right

def insert(root, value):
    if root is None:
        return Node(value)
    if value < root.value:
        root.left = insert(root.left, value)
    else:
        root.right = insert(root.right, value)
    return root

def contains(root, value):
    current = root
    while current:
        if value == current.value:
            return True
        if value < current.value:
            current = current.left
        else:
            current = current.right
    return False

root = None
for v in [5, 2, 8, 1, 3]:
    root = insert(root, v)

print(contains(root, 3))
print(contains(root, 7))`;

const bstOutput = `True
False`;

export default function BstBasicsPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "introduction", label: "Introduction" },
    { id: "intuition", label: "Intuition" },
    { id: "example", label: "Insert and search" },
  ];

  return (
    <ArticleLayout
      eyebrow="Algorithms - Python - Trees"
      title="BST Basics"
      description="Binary search trees keep values ordered so search can be fast." 
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Within Trees (Beginner)", links: treesBeginnerLessons },
          ]}
          activeHref="/algorithms-data-structures/python/trees/beginner/bst-basics"
        />
      }
    >
      <InfoPanel id="introduction" title="Introduction" variant="intro">
        <p>
          A binary search tree (BST) keeps smaller values on the left and
          larger values on the right. This ordering makes search easier.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          Each step compares and discards half of the tree, similar to a
          binary search on an array.
        </p>
      </InfoPanel>

      <section id="example" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Insert and search
        </h2>
        <CodeBlock code={bstCode} title="Python" />
        <OutputBlock output={bstOutput} />
      </section>
    </ArticleLayout>
  );
}
