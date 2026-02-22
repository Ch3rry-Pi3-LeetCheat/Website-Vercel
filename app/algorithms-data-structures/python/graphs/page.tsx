import ArticleLayout from "@/components/ArticleLayout";
import ComplexityTable from "@/components/ads/ComplexityTable";
import CodeBlock from "@/components/CodeBlock";
import CollapsibleExample from "@/components/CollapsibleExample";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import SketchDiagram from "@/components/SketchDiagram";
import RightRail from "@/components/RightRail";
import { adsPythonTopics } from "@/lib/adsTopics";

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
    { id: "real-world", label: "Real-world mapping" },
    { id: "complexity", label: "Complexity quick sheet" },
    { id: "diagram", label: "Diagram: Graph network" },
    { id: "example-1", label: "Example 1: Shortest path BFS" },
    { id: "example-2", label: "Example 2: DFS traversal" },
    { id: "summary", label: "Summary" },
  ];

  return (
    <ArticleLayout
      eyebrow="Graphs"
      title="Graphs in Python"
      description="Graphs model networks. They show up in routing, dependency, and connectivity problems."
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Within CS (Python)", links: adsPythonTopics },
          ]}
          activeHref="/algorithms-data-structures/python/graphs"
        />
      }
    >
      <InfoPanel id="introduction" title="Introduction" variant="intro">
        <p>
          A graph is a set of nodes connected by edges. We usually represent it
          with an adjacency list: a dictionary that maps each node to its
          neighbors.
        </p>
        <p>
          Graphs generalize trees by allowing multiple connections and cycles,
          which is why they appear in routing, dependency, and social-network
          style questions.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          Think of cities and roads. Each city knows which other cities it can
          reach directly. Traversal algorithms are ways of exploring those
          connections with different search strategy.
        </p>
        <p>
          BFS explores in waves, while DFS dives deep. Picking the right one is
          usually the key interview decision.
        </p>
      </InfoPanel>

      <section id="real-world" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Real-world mapping
        </h2>
        <div className="grid gap-3">
          <div className="glass-panel rounded-2xl px-5 py-4 text-sm text-[color:var(--color-muted)]">
            <span className="text-white font-semibold">Transit systems:</span>{" "}
            stations are nodes and routes are edges.
          </div>
          <div className="glass-panel rounded-2xl px-5 py-4 text-sm text-[color:var(--color-muted)]">
            <span className="text-white font-semibold">Service dependencies:</span>{" "}
            one service depends on another; traversal detects impact and order.
          </div>
        </div>
      </section>

      <section id="complexity" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Complexity quick sheet
        </h2>
        <ComplexityTable
          rows={[
            { operation: "BFS traversal", averageTime: String.raw`O(V+E)`, extraSpace: String.raw`O(V)` },
            { operation: "DFS traversal", averageTime: String.raw`O(V+E)`, extraSpace: String.raw`O(V)` },
            { operation: "Adjacency list build", averageTime: String.raw`O(V+E)`, extraSpace: String.raw`O(V+E)` },
            { operation: "Adjacency matrix lookup", averageTime: String.raw`O(1)`, extraSpace: String.raw`O(V^2)` },
          ]}
        />
      </section>

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
          The first time you reach the target, you have the shortest path in an
          unweighted graph.
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

      <section id="summary" className="scroll-mt-28 grid gap-3">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Summary
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Graph problems become manageable once representation and traversal
          strategy are explicit from the start.
        </p>
      </section>
    </ArticleLayout>
  );
}

