import type { Metadata } from "next";
import Link from "next/link";
import ArticleLayout from "@/components/ArticleLayout";
import RightRail from "@/components/RightRail";
import {
  linearAlgebraPhases,
  linearAlgebraPrerequisiteLessons,
  linearAlgebraVectorLessons,
} from "@/lib/mathTopics";

export const metadata: Metadata = {
  title: "Linear Algebra Roadmap",
  description:
    "A structured linear algebra track from prerequisite notation through vectors, subspaces, matrices, eigenvalues, and decompositions.",
};

const mathematicsLinks = [
  { label: "Linear Algebra", href: "/mathematics/linear-algebra" },
];

export default function LinearAlgebraPage() {
  const tocItems = [
    { id: "intro", label: "Introduction" },
    { id: "why-order", label: "Why the order matters" },
    { id: "phase-prereq", label: "Phase 0: prerequisites" },
    { id: "phase-vectors", label: "Phase 1: vectors" },
    { id: "phase-subspaces", label: "Phase 2: subspaces" },
    { id: "phase-systems", label: "Phase 3-5: matrices and transformations" },
    { id: "phase-advanced", label: "Phase 6 onward" },
    { id: "start", label: "Start here" },
  ];

  return (
    <ArticleLayout
      eyebrow="Mathematics - Linear Algebra"
      title="Linear Algebra roadmap"
      description="This track is designed as a dependency-aware ladder. We start with notation and symbolic fluency, then move into vectors, spaces, matrices, transformations, and the deeper structure that powers modern applications."
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Within Mathematics", links: mathematicsLinks },
            { title: "Phase pages", links: linearAlgebraPhases },
            { title: "Start here", links: linearAlgebraPrerequisiteLessons },
          ]}
          activeHref="/mathematics/linear-algebra"
        />
      }
    >
      <section id="intro" className="scroll-mt-28 grid gap-3">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Introduction
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Linear algebra becomes much easier when the conceptual order is right.
          If someone meets eigenvectors before they are comfortable with
          variables, equations, vectors, and transformations, the subject feels
          arbitrary.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The point of this track is to remove that problem. Each phase exists
          because later pages depend on it.
        </p>
      </section>

      <section id="why-order" className="scroll-mt-28 grid gap-3">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Why the order matters
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr className="border-b border-white/10">
                <td className="w-64 py-2 pr-4 font-semibold text-white">Notation first</td>
                <td className="py-2">So symbols stop being friction and start being a language.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-64 py-2 pr-4 font-semibold text-white">Vectors next</td>
                <td className="py-2">Because they are the core objects of the subject.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-64 py-2 pr-4 font-semibold text-white">Spaces and basis</td>
                <td className="py-2">Because linear algebra is really about structure, not isolated arrows.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-64 py-2 pr-4 font-semibold text-white">Matrices and transformations</td>
                <td className="py-2">Because matrices only make sense deeply once they represent actions on spaces.</td>
              </tr>
              <tr>
                <td className="w-64 py-2 pr-4 font-semibold text-white">Eigen and decompositions</td>
                <td className="py-2">Because these are higher-level descriptions of how transformations behave.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="phase-prereq" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Phase 0: prerequisites and mathematical language
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This phase is about fluency, not sophistication. If you can read an
          expression correctly, distinguish a variable from its value, and
          manipulate a simple equation cleanly, the later pages will move much
          faster.
        </p>
        <Link
          href="/mathematics/linear-algebra/prerequisites-and-mathematical-language"
          className="glass-panel rounded-2xl px-6 py-6 transition hover:border-white/30"
        >
          <h3 className="text-xl font-semibold text-white">
            Open the prerequisite phase
          </h3>
          <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">
            Start with numbers, variables, and algebraic notation before moving
            into functions, coordinates, and sigma notation.
          </p>
        </Link>
      </section>

      <section id="phase-vectors" className="scroll-mt-28 grid gap-3">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Phase 1: vectors and geometric intuition
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Scalars, vectors, length, dot product, angles, and projections form
          the first real conceptual layer of linear algebra.
        </p>
        <Link
          href="/mathematics/linear-algebra/vectors-and-geometric-intuition"
          className="glass-panel rounded-2xl px-6 py-6 transition hover:border-white/30"
        >
          <h3 className="text-xl font-semibold text-white">
            Open the vectors phase
          </h3>
          <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">
            Start with scalars, vectors, and vector notation before moving into
            magnitude, dot product, angles, and projections.
          </p>
        </Link>
      </section>

      <section id="phase-subspaces" className="scroll-mt-28 grid gap-3">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Phase 2: lines, planes, subspaces, basis, and dimension
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Here the subject shifts from individual vectors to spaces of vectors.
          This is where the real structure of linear algebra becomes visible.
        </p>
      </section>

      <section id="phase-systems" className="scroll-mt-28 grid gap-3">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Phases 3 to 5: systems, matrices, transformations, determinants
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          These phases connect equations to matrices, then matrices to linear
          transformations, then transformations to invertibility and determinant
          meaning.
        </p>
      </section>

      <section id="phase-advanced" className="scroll-mt-28 grid gap-3">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Phase 6 onward: eigenvalues, orthogonality, and decompositions
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This is the advanced ladder: diagonalization, spectral ideas, least
          squares, QR, SVD, pseudoinverse, and the computational viewpoint.
        </p>
      </section>

      <section id="start" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Start here
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
        <div className="grid gap-4 pt-2">
          {linearAlgebraVectorLessons.map((lesson) => (
            <Link
              key={lesson.href}
              href={lesson.href}
              className="glass-panel rounded-2xl px-6 py-6 transition hover:border-white/30"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
                First lesson in Phase 1
              </p>
              <h3 className="mt-2 text-xl font-semibold text-white">{lesson.label}</h3>
              <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">
                {lesson.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </ArticleLayout>
  );
}
