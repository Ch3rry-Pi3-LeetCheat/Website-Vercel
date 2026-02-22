import ArticleLayout from "@/components/ArticleLayout";
import InfoPanel from "@/components/InfoPanel";
import Link from "next/link";

const tracks = [
  {
    title: "Python",
    description:
      "Big-O foundations, then arrays, linked lists, stacks/queues, hash tables, trees, heaps, and graphs.",
    href: "/algorithms-data-structures/python",
  },
];

export default function AlgorithmsRootPage() {
  const tocItems = [
    { id: "intro", label: "Introduction" },
    { id: "intuition", label: "Why This Track" },
    { id: "tracks", label: "Language tracks" },
  ];

  return (
    <ArticleLayout
      eyebrow="CS"
      title="Computer science interview foundations"
      description="Build algorithm and data-structure intuition slowly, with concrete examples and complexity reasoning at each step."
      tocItems={tocItems}
    >
      <InfoPanel id="intro" title="Introduction" variant="intro">
        <p>
          This track is designed like a guided textbook: intuitive framing
          first, then mechanics, then pattern transfer.
        </p>
        <p>
          You will learn not just how to code a solution, but how to explain
          why it works and what it costs in time and space.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Why This Track" variant="intuition">
        <p>
          Interview performance improves when your mental model is ordered:
          first choose a structure, then choose traversal/update strategy, then
          justify complexity.
        </p>
        <p>
          The sequence here intentionally starts with Big-O before structure-specific
          lessons so trade-offs are clear from day one.
        </p>
      </InfoPanel>

      <section id="tracks" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Language tracks
        </h2>
        <div className="grid gap-4">
          {tracks.map((track) => (
            <Link
              key={track.href}
              href={track.href}
              className="glass-panel rounded-2xl px-6 py-6 transition hover:border-white/30"
            >
              <h3 className="text-xl font-semibold text-white">{track.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">
                {track.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </ArticleLayout>
  );
}


