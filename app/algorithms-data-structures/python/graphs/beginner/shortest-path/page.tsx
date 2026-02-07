import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
import { graphsBeginnerLessons } from "@/lib/adsBeginnerTopics";

const shortestCode = `from collections import deque

graph = {
    "A": ["B", "C"],
    "B": ["D"],
    "C": ["E"],
    "D": [],
    "E": [],
}

def shortest_path(start, goal):
    queue = deque([(start, 0)])
    seen = set([start])

    while queue:
        node, dist = queue.popleft()
        if node == goal:
            return dist
        for nbr in graph[node]:
            if nbr not in seen:
                seen.add(nbr)
                queue.append((nbr, dist + 1))
    return None

print(shortest_path("A", "E"))`;

const shortestOutput = `2`;

export default function ShortestPathPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "introduction", label: "Introduction" },
    { id: "intuition", label: "Intuition" },
    { id: "example", label: "BFS shortest path" },
  ];

  return (
    <ArticleLayout
      eyebrow="Algorithms - Python - Graphs"
      title="Shortest Path (Unweighted)"
      description="BFS guarantees the shortest path in an unweighted graph." 
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Within Graphs (Beginner)", links: graphsBeginnerLessons },
          ]}
          activeHref="/algorithms-data-structures/python/graphs/beginner/shortest-path"
        />
      }
    >
      <InfoPanel id="introduction" title="Introduction" variant="intro">
        <p>
          In an unweighted graph, BFS explores edges in increasing order
          of distance, which means the first time you reach a node is the
          shortest path.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          BFS expands in waves. Each wave is one more edge away from the
          start.
        </p>
      </InfoPanel>

      <section id="example" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          BFS shortest path
        </h2>
        <CodeBlock code={shortestCode} title="Python" />
        <OutputBlock output={shortestOutput} />
      </section>
    </ArticleLayout>
  );
}
