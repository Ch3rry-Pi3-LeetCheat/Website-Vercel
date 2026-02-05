import ArticleToc from "@/components/ArticleToc";
import CodeBlock from "@/components/CodeBlock";
import CollapsibleExample from "@/components/CollapsibleExample";
import OutputBlock from "@/components/OutputBlock";

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
    { id: "example-1", label: "Example 1: Shortest path BFS" },
    { id: "example-2", label: "Example 2: DFS traversal" },
  ];

  return (
    <div className="px-6 pb-20 pt-12">
      <div className="mx-auto w-full max-w-6xl lg:grid lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <ArticleToc items={tocItems} />
          </div>
        </aside>

        <div>
          <header className="grid gap-4">
          <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--color-accent-2)]">
            Graphs
          </p>
          <h1 className="text-4xl font-semibold text-white font-[var(--font-display)]">
            Graphs in Python
          </h1>
          <p className="max-w-2xl text-base leading-7 text-[color:var(--color-muted)]">
            Graphs model networks. They show up in routing, dependency, and
            connectivity problems.
          </p>
        </header>

        <section className="mt-10 grid gap-6">
          <div
            id="introduction"
            className="intro-panel scroll-mt-28 rounded-2xl px-6 py-6"
          >
            <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
              Introduction
            </h2>
            <p className="mt-3 text-base leading-7 text-[color:var(--color-muted)]">
              A graph is a set of nodes connected by edges. We usually represent
              it with an adjacency list: a dictionary that maps each node to its
              neighbors.
            </p>
          </div>

          <div
            id="intuition"
            className="intuition-panel scroll-mt-28 rounded-2xl px-6 py-6"
          >
            <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
              Intuition
            </h2>
            <p className="mt-3 text-base leading-7 text-[color:var(--color-muted)]">
              Think of cities and roads. Each city knows which other cities it
              can reach directly. Traversal algorithms are just ways of
              exploring those connections.
            </p>
          </div>

          <CollapsibleExample
            id="example-1"
            title="Example 1: Shortest path with BFS"
            defaultOpen
          >
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Step by step: start with the source node in a queue. Each pop
              visits the next closest node, then enqueues its neighbors with
              distance + 1. The first time you reach the target, you have the
              shortest path because BFS explores in layers.
            </p>
            <CodeBlock code={bfsCode} title="Python" />
            <OutputBlock output={bfsOutput} />
          </CollapsibleExample>

          <CollapsibleExample
            id="example-2"
            title="Example 2: Depth-first traversal"
          >
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Step by step: pick a start node and follow one path as far as it
              goes. Mark each node so you never revisit it. When you hit a dead
              end, return to the previous branch and continue.
            </p>
            <CodeBlock code={dfsCode} title="Python" />
            <OutputBlock output={dfsOutput} />
          </CollapsibleExample>
        </section>
        </div>
      </div>
    </div>
  );
}
