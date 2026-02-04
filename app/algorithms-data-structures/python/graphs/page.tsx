import CodeBlock from "@/components/CodeBlock";
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
  return (
    <div className="px-6 pb-20 pt-12">
      <div className="mx-auto w-full max-w-5xl">
        <header className="grid gap-4">
          <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--color-accent-2)]">
            Graphs
          </p>
          <h1 className="text-4xl font-semibold text-white font-[var(--font-display)]">
            Graphs in Python
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-[color:var(--color-muted)]">
            Graphs model networks. They show up in routing, dependency, and
            connectivity problems.
          </p>
        </header>

        <section className="mt-10 grid gap-6">
          <div className="glass-panel rounded-2xl px-6 py-6">
            <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
              Introduction
            </h2>
            <p className="mt-3 text-sm leading-6 text-[color:var(--color-muted)]">
              A graph is a set of nodes connected by edges. We usually represent
              it with an adjacency list: a dictionary that maps each node to its
              neighbors.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[color:var(--color-surface)] px-6 py-6">
            <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
              Intuition
            </h2>
            <p className="mt-3 text-sm leading-6 text-[color:var(--color-muted)]">
              Think of cities and roads. Each city knows which other cities it
              can reach directly. Traversal algorithms are just ways of
              exploring those connections.
            </p>
          </div>

          <section className="grid gap-4">
            <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
              Example 1: Shortest path with BFS
            </h3>
            <ol className="grid gap-2 text-sm text-[color:var(--color-muted)]">
              <li>Start from the source node.</li>
              <li>Use a queue to explore neighbors by distance.</li>
              <li>The first time you hit the target is the shortest path.</li>
            </ol>
            <CodeBlock code={bfsCode} title="Python" />
            <OutputBlock output={bfsOutput} />
          </section>

          <section className="grid gap-4">
            <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
              Example 2: Depth-first traversal
            </h3>
            <ol className="grid gap-2 text-sm text-[color:var(--color-muted)]">
              <li>Start at a node and go as deep as possible.</li>
              <li>Mark nodes as visited to avoid cycles.</li>
              <li>Backtrack when you hit a dead end.</li>
            </ol>
            <CodeBlock code={dfsCode} title="Python" />
            <OutputBlock output={dfsOutput} />
          </section>
        </section>
      </div>
    </div>
  );
}
