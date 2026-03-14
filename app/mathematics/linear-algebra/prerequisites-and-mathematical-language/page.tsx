import type { Metadata } from "next";
import Link from "next/link";
import ArticleLayout from "@/components/ArticleLayout";
import RightRail from "@/components/RightRail";
import {
  linearAlgebraPhases,
  linearAlgebraPrerequisiteLessons,
} from "@/lib/mathTopics";

export const metadata: Metadata = {
  title: "Linear Algebra Prerequisites and Mathematical Language",
  description:
    "The opening phase of the linear algebra track: notation, variables, equations, and symbolic fluency.",
};

export default function LinearAlgebraPrerequisitesPage() {
  const tocItems = [
    { id: "intro", label: "Introduction" },
    { id: "goals", label: "What this phase does" },
    { id: "lessons", label: "Lesson sequence" },
    { id: "next", label: "Next step" },
  ];

  return (
    <ArticleLayout
      eyebrow="Mathematics - Linear Algebra"
      title="Prerequisites and mathematical language"
      description="This phase makes the notation readable and the algebra manageable. The goal is not advanced mathematics yet; the goal is to remove symbolic friction before vectors and matrices arrive."
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Linear Algebra phases", links: linearAlgebraPhases },
            { title: "Within this phase", links: linearAlgebraPrerequisiteLessons },
          ]}
          activeHref="/mathematics/linear-algebra/prerequisites-and-mathematical-language"
        />
      }
    >
      <section id="intro" className="scroll-mt-28 grid gap-3">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Introduction
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          People often say they are bad at math when the real issue is smaller:
          they have not yet become comfortable reading the notation quickly.
          This phase fixes that first.
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
                <td className="w-64 py-2 pr-4 font-semibold text-white">Reading symbols</td>
                <td className="py-2">Understand what letters, signs, and grouped expressions are saying.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-64 py-2 pr-4 font-semibold text-white">Manipulating expressions</td>
                <td className="py-2">Evaluate, simplify, substitute values, and keep structure intact.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-64 py-2 pr-4 font-semibold text-white">Equation fluency</td>
                <td className="py-2">Recognize variables, constants, unknowns, and valid algebraic moves.</td>
              </tr>
              <tr>
                <td className="w-64 py-2 pr-4 font-semibold text-white">Preparation for later lessons</td>
                <td className="py-2">Make vectors, matrices, and transformations feel like ideas instead of symbol overload.</td>
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
          {linearAlgebraPrerequisiteLessons.map((lesson) => (
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
          Start with the first lesson and make sure the notation feels natural.
          That matters more than speed at this stage.
        </p>
      </section>
    </ArticleLayout>
  );
}
