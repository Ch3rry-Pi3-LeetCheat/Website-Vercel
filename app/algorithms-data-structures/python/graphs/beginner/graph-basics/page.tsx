import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
import { graphsBeginnerLessons } from "@/lib/adsBeginnerTopics";

const graphCode = `graph = {
    "A": ["B", "C"],
    "B": ["A", "D"],
    "C": ["A"],
    "D": ["B"],
}

print(graph["A"])
print(len(graph))`;

const graphOutput = `['B', 'C']
4`;

export default function GraphBasicsPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "introduction", label: "Introduction" },
    { id: "intuition", label: "Intuition" },
    { id: "adjacency", label: "Adjacency list" },
  ];

  return (
    <ArticleLayout
      eyebrow="Algorithms - Python - Graphs"
      title="Graph Basics"
      description="Graphs are nodes plus edges. Adjacency lists are the simplest representation." 
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Within Graphs (Beginner)", links: graphsBeginnerLessons },
          ]}
          activeHref="/algorithms-data-structures/python/graphs/beginner/graph-basics"
        />
      }
    >
      <InfoPanel id="introduction" title="Introduction" variant="intro">
        <p>
          A graph is a set of nodes connected by edges. Graphs model
          networks, maps, and relationships.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          Think of cities and roads. Each city knows which other cities
          it connects to.
        </p>
      </InfoPanel>

      <section id="adjacency" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Adjacency list
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The adjacency list maps each node to its neighbors. This is a
          clean, flexible representation for most interview problems.
        </p>
        <CodeBlock code={graphCode} title="Python" />
        <OutputBlock output={graphOutput} />
      </section>
    </ArticleLayout>
  );
}
