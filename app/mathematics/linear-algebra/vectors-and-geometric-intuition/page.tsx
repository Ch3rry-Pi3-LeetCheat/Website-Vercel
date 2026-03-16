import type { Metadata } from "next";
import Link from "next/link";
import ArticleLayout from "@/components/ArticleLayout";
import RightRail from "@/components/RightRail";
import {
  linearAlgebraPhases,
  linearAlgebraVectorLessons,
} from "@/lib/mathTopics";

export const metadata: Metadata = {
  title: "Linear Algebra Vectors and Geometric Intuition",
  description:
    "The first true vector phase of the linear algebra track: scalars, vectors, notation, magnitude, distance, normalization, and the first geometric mental models.",
};

export default function LinearAlgebraVectorsPhasePage() {
  const tocItems = [
    { id: "intro", label: "Introduction" },
    { id: "goals", label: "What this phase does" },
    { id: "lessons", label: "Lesson sequence" },
    { id: "next", label: "Next step" },
  ];

  return (
    <ArticleLayout
      eyebrow="Mathematics - Linear Algebra"
      title="Vectors and geometric intuition"
      description="This phase is where linear algebra starts feeling like its own subject. The notation is already in place. Now the focus shifts to the core objects themselves: vectors, their geometry, their size, and the visual language that later supports spaces, dot products, matrices, and transformations."
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Linear Algebra phases", links: linearAlgebraPhases },
            { title: "Within this phase", links: linearAlgebraVectorLessons },
          ]}
          activeHref="/mathematics/linear-algebra/vectors-and-geometric-intuition"
        />
      }
    >
      <section id="intro" className="scroll-mt-28 grid gap-3">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Introduction
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The prerequisite phase made the symbols readable. This phase turns
          those symbols into the first central objects of linear algebra.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          A vector is not just another algebraic expression. It is something
          with components, geometry, and later, transformations acting on it.
          That makes this phase the real doorway into the subject.
        </p>
      </section>

      <section id="goals" className="scroll-mt-28 grid gap-3">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          What this phase does
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr className="border-b border-white/10">
                <td className="w-64 py-2 pr-4 font-semibold text-white">Separate scalars from vectors</td>
                <td className="py-2">See clearly when a symbol is a single number and when it represents a multi-component object.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-64 py-2 pr-4 font-semibold text-white">Build geometric intuition</td>
                <td className="py-2">Read vectors as movement, direction, and displacement rather than as mysterious lists of numbers.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-64 py-2 pr-4 font-semibold text-white">Learn the notation</td>
                <td className="py-2">Recognize tuple form, column-vector form, and component notation without getting stuck on the formatting.</td>
              </tr>
              <tr>
                <td className="w-64 py-2 pr-4 font-semibold text-white">Prepare for later operations</td>
                <td className="py-2">Set up the thinking needed for vector addition, scaling, magnitude, dot products, and later matrix actions.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="lessons" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Lesson sequence
        </h2>
        <div className="grid gap-4">
          {linearAlgebraVectorLessons.map((lesson) => (
            <Link
              key={lesson.href}
              href={lesson.href}
              className="glass-panel rounded-2xl px-6 py-6 transition hover:border-white/30"
            >
              <h3 className="text-xl font-semibold text-white">{lesson.label}</h3>
              <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">
                {lesson.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section id="next" className="scroll-mt-28 grid gap-3">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Next step
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Start with scalars and vectors first. The rest of the phase becomes
          much easier once that distinction feels natural rather than vague.
        </p>
      </section>
    </ArticleLayout>
  );
}
