import BeginnerLessonTemplate from "@/components/ads/BeginnerLessonTemplate";
import TraversalExplorer from "@/components/ads/TraversalExplorer";
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

const nodes = [
  { id: "A", label: "A", x: 80, y: 110 },
  { id: "B", label: "B", x: 170, y: 60 },
  { id: "C", label: "C", x: 170, y: 160 },
  { id: "D", label: "D", x: 270, y: 60 },
  { id: "E", label: "E", x: 270, y: 160 },
];

const edges = [
  { from: "A", to: "B" },
  { from: "A", to: "C" },
  { from: "B", to: "D" },
  { from: "C", to: "E" },
];

export default function BfsDfsPage() {
  return (
    <BeginnerLessonTemplate
      eyebrow="CS - Python - Graphs"
      title="BFS and DFS"
      description="Compare breadth-first and depth-first exploration strategies and know when to use each."
      intro={[
        "BFS and DFS visit reachable graph nodes with different exploration order.",
        "BFS explores by layers using a queue. DFS explores by depth using recursion or stack.",
      ]}
      intuition={[
        "BFS is like a ripple spreading out level by level from a source.",
        "DFS is like taking one hallway all the way until blocked, then backtracking.",
      ]}
      realWorld={[
        {
          scenario: "Shortest steps in unweighted graph",
          mapping:
            "BFS finds shortest edge count because it explores by distance layers.",
        },
        {
          scenario: "Path existence and component exploration",
          mapping:
            "DFS is excellent for deep exploration and recursive structure checks.",
        },
      ]}
      keyIdeaTitle="Traversal policy differences"
      keyIdeaText={[
        "BFS frontier structure: queue (FIFO).",
        "DFS frontier structure: stack/recursion (LIFO behavior).",
        "Both run in O(V + E) when adjacency lists are used.",
      ]}
      interactiveDescription="Step through BFS frontier changes on a small graph."
      interactive={
        <TraversalExplorer
          title="BFS layer-by-layer"
          subtitle="Start from A; frontier shown as queue content."
          nodes={nodes}
          edges={edges}
          steps={[
            {
              title: "Visit A",
              explanation: "Enqueue neighbors B and C.",
              current: "A",
              visited: ["A"],
              frontier: ["B", "C"],
            },
            {
              title: "Visit B",
              explanation: "Dequeue B first; enqueue D.",
              current: "B",
              visited: ["A", "B"],
              frontier: ["C", "D"],
            },
            {
              title: "Visit C",
              explanation: "Then dequeue C; enqueue E.",
              current: "C",
              visited: ["A", "B", "C"],
              frontier: ["D", "E"],
            },
            {
              title: "Finish layer expansion",
              explanation: "Remaining nodes dequeue in order D then E.",
              current: "E",
              visited: ["A", "B", "C", "D", "E"],
              frontier: [],
            },
          ]}
        />
      }
      examples={[
        {
          id: "ex-bfs",
          title: "Example 1: BFS with queue",
          explanation:
            "Queue order creates level-by-level exploration.",
          code: bfsCode,
          output: bfsOutput,
        },
        {
          id: "ex-dfs",
          title: "Example 2: DFS with recursion",
          explanation:
            "Recursive calls create depth-first behavior naturally.",
          code: dfsCode,
          output: dfsOutput,
        },
      ]}
      complexityRows={[
        { operation: "BFS traversal", averageTime: String.raw`O(V + E)`, extraSpace: String.raw`O(V)` },
        { operation: "DFS traversal", averageTime: String.raw`O(V + E)`, extraSpace: String.raw`O(V)` },
      ]}
      pitfalls={[
        "Forgetting visited set, which can loop forever on cyclic graphs.",
        "Using DFS when shortest unweighted path length is required (BFS is better).",
        "Confusing traversal order with graph correctness requirements.",
      ]}
      summary={[
        "BFS and DFS solve similar reachability tasks with different order guarantees.",
        "Choose BFS for minimum-edge distance in unweighted graphs.",
        "Choose DFS for deep structural exploration and recursion-friendly logic.",
      ]}
      nextStep="Next we apply BFS directly to shortest-path reconstruction in unweighted graphs."
      railTitle="Within Graphs (Beginner)"
      railLinks={graphsBeginnerLessons}
      activeHref="/algorithms-data-structures/python/graphs/beginner/bfs-dfs"
    />
  );
}

