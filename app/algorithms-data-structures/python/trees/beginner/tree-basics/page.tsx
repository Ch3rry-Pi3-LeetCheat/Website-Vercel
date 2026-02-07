import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
import { treesBeginnerLessons } from "@/lib/adsBeginnerTopics";

const nodeCode = `class Node:
    def __init__(self, value, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right`;

const buildCode = `root = Node(1, Node(2), Node(3))

print(root.value, root.left.value, root.right.value)`;

const buildOutput = `1 2 3`;

export default function TreeBasicsPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "introduction", label: "Introduction" },
    { id: "intuition", label: "Intuition" },
    { id: "node", label: "Node structure" },
    { id: "build", label: "Build a small tree" },
  ];

  return (
    <ArticleLayout
      eyebrow="Algorithms - Python - Trees"
      title="Tree Basics"
      description="Trees are hierarchical: each node can have children. Learn the basic shape." 
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Within Trees (Beginner)", links: treesBeginnerLessons },
          ]}
          activeHref="/algorithms-data-structures/python/trees/beginner/tree-basics"
        />
      }
    >
      <InfoPanel id="introduction" title="Introduction" variant="intro">
        <p>
          A tree is a hierarchy of nodes. Each node can point to child
          nodes. The top node is the root.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          Think of a family tree. Each person can have children, and you
          can move down from parent to child.
        </p>
      </InfoPanel>

      <section id="node" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Node structure
        </h2>
        <CodeBlock code={nodeCode} title="Python" />
      </section>

      <section id="build" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Build a small tree
        </h2>
        <CodeBlock code={buildCode} title="Python" />
        <OutputBlock output={buildOutput} />
      </section>
    </ArticleLayout>
  );
}
