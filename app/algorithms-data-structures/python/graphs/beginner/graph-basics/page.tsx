import BeginnerLessonTemplate from "@/components/ads/BeginnerLessonTemplate";
import TraversalExplorer from "@/components/ads/TraversalExplorer";
import { graphsBeginnerLessons } from "@/lib/adsBeginnerTopics";

const graphCode = `graph = {
    "A": ["B", "C"],
    "B": ["D"],
    "C": ["D"],
    "D": []
}

print(graph["A"])
print(graph["B"])`;

const graphOutput = `['B', 'C']
['D']`;

const degreeCode = `for node, neighbors in graph.items():
    print(node, "degree =", len(neighbors))`;

const degreeOutput = `A degree = 2
B degree = 1
C degree = 1
D degree = 0`;

const nodes = [
  { id: "A", label: "A", x: 80, y: 110 },
  { id: "B", label: "B", x: 180, y: 55 },
  { id: "C", label: "C", x: 180, y: 165 },
  { id: "D", label: "D", x: 290, y: 110 },
];

const edges = [
  { from: "A", to: "B" },
  { from: "A", to: "C" },
  { from: "B", to: "D" },
  { from: "C", to: "D" },
];

export default function GraphBasicsPage() {
  return (
    <BeginnerLessonTemplate
      eyebrow="CS - Python - Graphs"
      title="Graph Basics"
      description="Build graph intuition and represent graphs with adjacency lists in Python."
      intro={[
        "Graphs model relationships between entities. Nodes are entities, edges are relationships.",
        "Unlike trees, graphs can have cycles and multiple paths between nodes.",
      ]}
      intuition={[
        "Think of a city map: intersections are nodes, roads are edges.",
        "Route planning, recommendation links, and social networks are graph-shaped problems.",
      ]}
      realWorld={[
        {
          scenario: "Social network",
          mapping:
            "User nodes connected by friendship/follow edges.",
        },
        {
          scenario: "Transport network",
          mapping:
            "Stations connected by routes; shortest path is a graph problem.",
        },
      ]}
      keyIdeaTitle="Adjacency list representation"
      keyIdeaText={[
        "In Python, dict[node] = list_of_neighbors is the most common representation.",
        "It is compact for sparse graphs and natural for traversal loops.",
        "Directed vs undirected graphs differ by whether edges are one-way or mirrored both ways.",
      ]}
      interactiveDescription="Explore node connectivity and edge directions."
      interactive={
        <TraversalExplorer
          title="Graph structure explorer"
          subtitle="Directed edges from A to B/C, then toward D."
          nodes={nodes}
          edges={edges}
          steps={[
            {
              title: "Start at A",
              explanation: "A has outgoing edges to B and C.",
              current: "A",
              visited: ["A"],
              frontier: ["B", "C"],
            },
            {
              title: "Move to B",
              explanation: "B has one outgoing edge to D.",
              current: "B",
              visited: ["A", "B"],
              frontier: ["C", "D"],
            },
            {
              title: "Move to C",
              explanation: "C also points to D, showing multiple incoming paths.",
              current: "C",
              visited: ["A", "B", "C"],
              frontier: ["D"],
            },
          ]}
        />
      }
      examples={[
        {
          id: "ex-adj",
          title: "Example 1: Build adjacency list",
          explanation:
            "Simple dictionary form is enough for many interview problems.",
          code: graphCode,
          output: graphOutput,
        },
        {
          id: "ex-degree",
          title: "Example 2: Node out-degree",
          explanation:
            "Degree-style stats are easy once adjacency list is available.",
          code: degreeCode,
          output: degreeOutput,
        },
      ]}
      complexityRows={[
        { operation: "Store adjacency list", averageTime: String.raw`O(V + E)`, extraSpace: String.raw`O(V + E)` },
        { operation: "Iterate all neighbors of node", averageTime: String.raw`O(\deg(v))`, extraSpace: String.raw`O(1)` },
      ]}
      pitfalls={[
        "Forgetting to add reverse edge for undirected graphs.",
        "Confusing node count V with edge count E in complexity discussion.",
        "Using matrix representation by default for sparse graphs.",
      ]}
      summary={[
        "Graphs capture general relationship structures beyond trees.",
        "Adjacency lists are the standard practical representation.",
        "Understanding direction and connectivity is prerequisite for traversal algorithms.",
      ]}
      nextStep="Next we compare BFS and DFS traversal policies on the same graph."
      railTitle="Within Graphs (Beginner)"
      railLinks={graphsBeginnerLessons}
      activeHref="/algorithms-data-structures/python/graphs/beginner/graph-basics"
    />
  );
}

