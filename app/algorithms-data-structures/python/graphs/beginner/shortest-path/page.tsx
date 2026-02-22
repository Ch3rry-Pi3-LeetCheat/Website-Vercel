import BeginnerLessonTemplate from "@/components/ads/BeginnerLessonTemplate";
import TraversalExplorer from "@/components/ads/TraversalExplorer";
import { graphsBeginnerLessons } from "@/lib/adsBeginnerTopics";

const shortestCode = `from collections import deque

graph = {
    "A": ["B", "C"],
    "B": ["D"],
    "C": ["D", "E"],
    "D": ["F"],
    "E": ["F"],
    "F": [],
}

def shortest_path(start, target):
    queue = deque([start])
    parent = {start: None}

    while queue:
        node = queue.popleft()
        if node == target:
            break
        for nbr in graph[node]:
            if nbr not in parent:
                parent[nbr] = node
                queue.append(nbr)

    if target not in parent:
        return []

    path = []
    cur = target
    while cur is not None:
        path.append(cur)
        cur = parent[cur]
    return path[::-1]

print(shortest_path("A", "F"))`;

const shortestOutput = `['A', 'B', 'D', 'F']`;

const noPathCode = `graph["F"] = []
print(shortest_path("E", "A"))`;

const noPathOutput = `[]`;

const nodes = [
  { id: "A", label: "A", x: 60, y: 110 },
  { id: "B", label: "B", x: 140, y: 60 },
  { id: "C", label: "C", x: 140, y: 160 },
  { id: "D", label: "D", x: 230, y: 60 },
  { id: "E", label: "E", x: 230, y: 160 },
  { id: "F", label: "F", x: 310, y: 110 },
];

const edges = [
  { from: "A", to: "B" },
  { from: "A", to: "C" },
  { from: "B", to: "D" },
  { from: "C", to: "D" },
  { from: "C", to: "E" },
  { from: "D", to: "F" },
  { from: "E", to: "F" },
];

export default function ShortestPathPage() {
  return (
    <BeginnerLessonTemplate
      eyebrow="CS - Python - Graphs"
      title="Shortest Path (Unweighted)"
      description="Use BFS layers plus parent pointers to recover shortest paths in unweighted graphs."
      intro={[
        "In unweighted graphs, BFS discovers nodes in increasing edge-distance from start.",
        "That property makes BFS the right first tool for shortest path by hop count.",
      ]}
      intuition={[
        "Imagine expanding circles from a source. The first time you touch a node is via shortest edge count.",
        "To recover full path, remember each node's parent when first discovered.",
      ]}
      realWorld={[
        {
          scenario: "Fewest transfers route",
          mapping:
            "Each edge is one transfer. BFS gives minimum-transfer route.",
        },
        {
          scenario: "Game move planning",
          mapping:
            "Each legal move is one edge; BFS yields fewest moves to target state.",
        },
      ]}
      keyIdeaTitle="BFS + parent map"
      keyIdeaText={[
        "Run BFS from start with queue.",
        "When discovering neighbor first time, set parent[neighbor] = current.",
        "After reaching target, reconstruct path by walking parent links backward.",
      ]}
      interactiveDescription="Watch BFS layers and the resulting shortest path to F."
      interactive={
        <TraversalExplorer
          title="Shortest-path layer expansion"
          subtitle="Source A, target F."
          nodes={nodes}
          edges={edges}
          steps={[
            {
              title: "Layer 0",
              explanation: "Start at A.",
              current: "A",
              visited: ["A"],
              frontier: ["B", "C"],
            },
            {
              title: "Layer 1",
              explanation: "From B/C, discover D and E.",
              current: "C",
              visited: ["A", "B", "C"],
              frontier: ["D", "E"],
            },
            {
              title: "Layer 2",
              explanation: "From D, discover F first time.",
              current: "D",
              visited: ["A", "B", "C", "D"],
              frontier: ["E", "F"],
            },
            {
              title: "Reconstruct path",
              explanation: "Parent chain gives A -> B -> D -> F.",
              current: "F",
              visited: ["A", "B", "C", "D", "F"],
              frontier: [],
            },
          ]}
        />
      }
      examples={[
        {
          id: "ex-shortest-main",
          title: "Example 1: BFS shortest path",
          explanation:
            "Returns one shortest route by edge count with parent reconstruction.",
          code: shortestCode,
          output: shortestOutput,
        },
        {
          id: "ex-shortest-none",
          title: "Example 2: No-path case",
          explanation:
            "Returning empty path for unreachable target is a clean API choice.",
          code: noPathCode,
          output: noPathOutput,
        },
      ]}
      complexityRows={[
        { operation: "BFS shortest path", averageTime: String.raw`O(V + E)`, extraSpace: String.raw`O(V)` },
        { operation: "Path reconstruction", averageTime: String.raw`O(L)`, extraSpace: String.raw`O(1)` },
      ]}
      pitfalls={[
        "Using DFS and expecting guaranteed shortest unweighted path.",
        "Overwriting parent after first discovery, which can corrupt shortest-path reconstruction.",
        "Forgetting unreachable-case handling.",
      ]}
      summary={[
        "BFS gives shortest path length in unweighted graphs by construction.",
        "Parent mapping turns shortest distance discovery into full route reconstruction.",
        "This pattern is a high-frequency interview staple.",
      ]}
      nextStep="After graph fundamentals, you can branch into weighted shortest paths (Dijkstra) and advanced graph patterns."
      railTitle="Within Graphs (Beginner)"
      railLinks={graphsBeginnerLessons}
      activeHref="/algorithms-data-structures/python/graphs/beginner/shortest-path"
    />
  );
}

