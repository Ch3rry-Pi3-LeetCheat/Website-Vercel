import Link from "next/link";

const structures = [
  {
    title: "Arrays & Lists",
    description: "Indexing, slicing, and two-pointer interview patterns.",
    href: "/algorithms-data-structures/python/arrays",
  },
  {
    title: "Linked Lists",
    description: "Pointers, traversal, and in-place mutation patterns.",
    href: "/algorithms-data-structures/python/linked-lists",
  },
  {
    title: "Stacks & Queues",
    description: "LIFO/FIFO mechanics for parsing and scheduling tasks.",
    href: "/algorithms-data-structures/python/stacks-queues",
  },
  {
    title: "Hash Tables",
    description: "Fast lookups, counting, and collision intuition.",
    href: "/algorithms-data-structures/python/hash-tables",
  },
  {
    title: "Trees",
    description: "Traversal, recursion, and BST interview templates.",
    href: "/algorithms-data-structures/python/trees",
  },
  {
    title: "Heaps",
    description: "Priority queues, top-k problems, and scheduling.",
    href: "/algorithms-data-structures/python/heaps",
  },
  {
    title: "Graphs",
    description: "Adjacency lists, BFS/DFS, and shortest paths.",
    href: "/algorithms-data-structures/python/graphs",
  },
];

export default function AlgorithmsPythonPage() {
  return (
    <div className="px-6 pb-20 pt-12">
      <div className="mx-auto w-full max-w-5xl">
        <header className="grid gap-4">
          <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--color-accent-2)]">
            Algorithms • Python
          </p>
          <h1 className="text-4xl font-semibold text-white font-[var(--font-display)]">
            Data structures in Python
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-[color:var(--color-muted)]">
            Each module focuses on the data structure, the operations that
            matter, and the interview patterns that appear repeatedly.
          </p>
        </header>

        <section className="mt-10 grid gap-4">
          {structures.map((structure) => (
            <Link
              key={structure.href}
              href={structure.href}
              className="glass-panel rounded-2xl px-6 py-6 transition hover:border-white/30"
            >
              <h2 className="text-xl font-semibold text-white">
                {structure.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">
                {structure.description}
              </p>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}
