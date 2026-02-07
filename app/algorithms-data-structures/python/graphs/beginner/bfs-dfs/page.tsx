import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
import { graphsBeginnerLessons } from "@/lib/adsBeginnerTopics";

const bfsCode = `from collections import deque

graph = {
    "A": ["B", "C"],
    "B": ["D"],
    "C": ["E"],
    "D": [],
    "E": [],
}

def bfs(start):
    order = []
    queue = deque([start])
    seen = set([start])

    while queue:
        node = queue.popleft()
        order.append(node)
        for nbr in graph[node]:
            if nbr not in seen:
                seen.add(nbr)
                queue.append(nbr)

    return order

print(bfs("A"))`;

const bfsOutput = `['A', 'B', 'C', 'D', 'E']`;

const dfsCode = `graph = {
    "A": ["B", "C"],
    "B": ["D"],
    "C": ["E"],
    "D": [],
    "E": [],
}

def dfs(node, seen, order):
    seen.add(node)
    order.append(node)
    for nbr in graph[node]:
        if nbr not in seen:
            dfs(nbr, seen, order)

order = []
dfs("A", set(), order)
print(order)`;

const dfsOutput = `['A', 'B', 'D', 'C', 'E']`;

export default function BfsDfsPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "introduction", label: "Introduction" },
    { id: "intuition", label: "Intuition" },
    { id: "bfs", label: "BFS" },
    { id: "dfs", label: "DFS" },
  ];

  return (
    <ArticleLayout
      eyebrow="Algorithms - Python - Graphs"
      title="BFS and DFS"
      description="Two core traversals: BFS explores by layers, DFS explores by depth." 
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Within Graphs (Beginner)", links: graphsBeginnerLessons },
          ]}
          activeHref="/algorithms-data-structures/python/graphs/beginner/bfs-dfs"
        />
      }
    >
      <InfoPanel id="introduction" title="Introduction" variant="intro">
        <p>
          BFS and DFS are the two most common ways to explore a graph.
          They visit all reachable nodes, just in different orders.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          BFS spreads out level by level, like ripples in water. DFS dives
          down a path until it cannot go further.
        </p>
      </InfoPanel>

      <section id="bfs" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Breadth-first search (BFS)
        </h2>
        <CodeBlock code={bfsCode} title="Python" />
        <OutputBlock output={bfsOutput} />
      </section>

      <section id="dfs" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Depth-first search (DFS)
        </h2>
        <CodeBlock code={dfsCode} title="Python" />
        <OutputBlock output={dfsOutput} />
      </section>
    </ArticleLayout>
  );
}
