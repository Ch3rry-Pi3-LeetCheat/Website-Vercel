import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import CollapsibleExample from "@/components/CollapsibleExample";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import SketchDiagram from "@/components/SketchDiagram";

const bfsCode = `from collections import deque

graph = {
    "A": ["B", "C"],
    "B": ["D"],
    "C": ["D"],
    "D": [],
}

start = "A"
target = "D"

queue = deque([(start, 0)])
seen = {start}

while queue:
    node, distance = queue.popleft()
    if node == target:
        answer = distance
        break
    for nxt in graph[node]:
        if nxt not in seen:
            seen.add(nxt)
            queue.append((nxt, distance + 1))

answer`;

const bfsOutput = `2`;

const dfsCode = `visited = set()

def dfs(node):
    visited.add(node)
    for nxt in graph[node]:
        if nxt not in visited:
            dfs(nxt)

dfs("A")
sorted(visited)`;

const dfsOutput = `['A', 'B', 'C', 'D']`;

export default function GraphsPage() {
  const tocItems = [
    { id: "introduction", label: "Introduction" },
    { id: "intuition", label: "Intuition" },
    { id: "diagram", label: "Diagram: Graph network" },
    { id: "example-1", label: "Example 1: Shortest path BFS" },
    { id: "example-2", label: "Example 2: DFS traversal" },
  ];

  return (
    <ArticleLayout
      eyebrow="Graphs"
      title="Graphs in Python"
      description="Graphs model networks. They show up in routing, dependency, and connectivity problems."
      tocItems={tocItems}
    >
      <InfoPanel id="introduction" title="Introduction" variant="intro">
        <p>
          A graph is a set of nodes connected by edges. We usually represent it
          with an adjacency list: a dictionary that maps each node to its
          neighbors.
        </p>
        <p>
          Graphs generalize trees by allowing multiple connections and cycles.
          That flexibility is why they appear in routing, dependency, and
          network problems.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          Think of cities and roads. Each city knows which other cities it can
          reach directly. Traversal algorithms are just ways of exploring those
          connections.
        </p>
        <p>
          BFS explores in waves, while DFS dives deep. If you can explain the
          mental picture, you can explain the algorithm.
        </p>
      </InfoPanel>

      <div id="diagram" className="scroll-mt-28">
        <SketchDiagram
          title="Sketch: network"
          variant="graph"
          caption="Nodes connect in multiple directions, so traversal strategy matters."
        />
      </div>

      <CollapsibleExample
        id="example-1"
        title="Example 1: Shortest path with BFS"
        defaultOpen
      >
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Step by step: start with the source node in a queue. Each pop visits
          the next closest node, then enqueues its neighbors with distance + 1.
          The first time you reach the target, you have the shortest path
          because BFS explores in layers.
        </p>
        <CodeBlock code={bfsCode} title="Python" />
        <OutputBlock output={bfsOutput} />
      </CollapsibleExample>

      <CollapsibleExample id="example-2" title="Example 2: Depth-first traversal">
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Step by step: pick a start node and follow one path as far as it goes.
          Mark each node so you never revisit it. When you hit a dead end,
          return to the previous branch and continue.
        </p>
        <CodeBlock code={dfsCode} title="Python" />
        <OutputBlock output={dfsOutput} />
      </CollapsibleExample>
    </ArticleLayout>
  );
}
