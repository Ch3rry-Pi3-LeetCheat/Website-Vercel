import ArticleLayout from "@/components/ArticleLayout";
import InfoPanel from "@/components/InfoPanel";
import Link from "next/link";

const modules = [
  {
    title: "Foundations: Big-O",
    description:
      "Time/space complexity intuition and growth-rate reasoning before implementation details.",
    href: "/algorithms-data-structures/python/foundations/big-o",
  },
  {
    title: "Arrays & Lists",
    description: "Indexing, slicing, two pointers, and operation trade-offs.",
    href: "/algorithms-data-structures/python/arrays/beginner",
  },
  {
    title: "Linked Lists",
    description: "Node chains, pointer rewiring, and safe traversal patterns.",
    href: "/algorithms-data-structures/python/linked-lists/beginner",
  },
  {
    title: "Stacks & Queues",
    description: "LIFO/FIFO mechanics for parsing, scheduling, and traversal.",
    href: "/algorithms-data-structures/python/stacks-queues/beginner",
  },
  {
    title: "Hash Tables",
    description: "Fast lookups, counting patterns, and complement matching.",
    href: "/algorithms-data-structures/python/hash-tables/beginner",
  },
  {
    title: "Trees",
    description: "Recursive structure, traversals, and BST fundamentals.",
    href: "/algorithms-data-structures/python/trees/beginner",
  },
  {
    title: "Heaps",
    description: "Priority queues, top-k workflows, and scheduling use cases.",
    href: "/algorithms-data-structures/python/heaps/beginner",
  },
  {
    title: "Graphs",
    description: "Adjacency lists, BFS/DFS traversal, and shortest paths.",
    href: "/algorithms-data-structures/python/graphs/beginner",
  },
];

export default function AlgorithmsPythonPage() {
  const tocItems = [
    { id: "intro", label: "Introduction" },
    { id: "approach", label: "How To Use This Track" },
    { id: "modules", label: "Module sequence" },
  ];

  return (
    <ArticleLayout
      eyebrow="CS - Python"
      title="Data structures and algorithms in Python"
      description="A structured progression from complexity intuition to reusable interview patterns, with step-by-step examples."
      tocItems={tocItems}
    >
      <InfoPanel id="intro" title="Introduction" variant="intro">
        <p>
          This path is intentionally ordered. You first learn cost reasoning
          (Big-O), then structure mechanics, then recurring patterns.
        </p>
        <p>
          Every module is written for beginners but with textbook-level rigor:
          intuition, code, edge cases, and complexity all together.
        </p>
      </InfoPanel>

      <InfoPanel id="approach" title="How To Use This Track" variant="intuition">
        <p>
          Recommended cadence:
          read one lesson, run examples manually, then explain the solution out
          loud with complexity before moving on.
        </p>
        <p>
          Focus on transfer: each new problem should map back to a small number
          of known structure + pattern combinations.
        </p>
      </InfoPanel>

      <section id="modules" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Module sequence
        </h2>
        <div className="grid gap-4">
          {modules.map((module, idx) => (
            <Link
              key={module.href}
              href={module.href}
              className="glass-panel rounded-2xl px-6 py-6 transition hover:border-white/30"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
                Step {idx + 1}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-white">{module.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">
                {module.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </ArticleLayout>
  );
}


