import type { Metadata } from "next";
import ArticleLayout from "@/components/ArticleLayout";
import InfoPanel from "@/components/InfoPanel";
import RightRail from "@/components/RightRail";
import { MathBlock, MathInline } from "@/components/Math";
import AlgebraStaticVisual from "@/components/math/AlgebraStaticVisual";
import {
  linearAlgebraPhases,
  linearAlgebraSubspaceLessons,
} from "@/lib/mathTopics";

export const metadata: Metadata = {
  title: "Lines and Planes as Sets of Vectors",
  description:
    "Learn to describe lines and planes as whole sets built from a point and one or two direction vectors, and see how this leads directly into subspaces.",
};

export default function LinesAndPlanesAsSetsOfVectorsPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "intro", label: "Introduction" },
    { id: "why", label: "Why this topic comes next", level: 2 },
    { id: "set-view", label: "Seeing a geometric object as a set" },
    { id: "lines", label: "Lines as vector sets" },
    { id: "planes", label: "Planes as vector sets" },
    { id: "examples", label: "Worked examples" },
    { id: "example-line-build", label: "Example 1: building a point on a line", level: 2 },
    { id: "example-line-check", label: "Example 2: checking if a point lies on a line", level: 2 },
    { id: "example-plane", label: "Example 3: building a point on a plane", level: 2 },
    { id: "checks", label: "Checks and common mistakes" },
    { id: "bridge", label: "What comes next" },
    { id: "summary", label: "Summary" },
  ];

  return (
    <ArticleLayout
      eyebrow="Mathematics - Linear Algebra - Subspaces"
      title="Lines and planes as sets of vectors"
      description="Span taught us to think about all reachable vectors at once. This lesson pushes that idea further: a line or plane is not just a picture, but a whole set generated from a point and some direction vectors."
      descriptionClassName="!max-w-none"
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Linear Algebra phases", links: linearAlgebraPhases },
            { title: "Within this phase", links: linearAlgebraSubspaceLessons },
          ]}
          activeHref="/mathematics/linear-algebra/subspaces-basis-and-dimension/lines-and-planes-as-sets-of-vectors"
        />
      }
    >
      <InfoPanel id="intro" title="Introduction" variant="intro">
        <p>
          Up to now, a line or plane may have felt like a shape you draw. In
          linear algebra, we often want to describe that same object as a{" "}
          <span className="text-white font-semibold">set of vectors</span>.
        </p>
        <p>
          That is a powerful shift. Instead of saying “here is the picture,” we
          say “here is the rule that generates every point in the picture.”
        </p>
        <p>Here is the roadmap for this lesson:</p>
        <div className="ml-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Seeing a geometric object as a set</td>
                <td className="py-2">How to move from one picture of a line or plane to a rule that generates all its points.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Lines as vector sets</td>
                <td className="py-2">How a point and one direction vector generate every point on a line.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Planes as vector sets</td>
                <td className="py-2">How a point and two independent directions generate every point on a plane.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Worked examples</td>
                <td className="py-2">How to build concrete points from parameter values and how to test whether a point belongs to a line.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Checks and common mistakes</td>
                <td className="py-2">How to distinguish a point vector from a direction vector, and why not every line or plane is a subspace.</td>
              </tr>
              <tr>
                <td className="w-56 py-2 pr-4 font-semibold text-white">What comes next</td>
                <td className="py-2">How the next lesson turns this into the formal idea of a subspace.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </InfoPanel>

      <InfoPanel
        id="why"
        title="Why this topic comes next"
        variant="intuition"
        headingLevel={3}
      >
        <p>
          The span page already taught us to describe a whole line through the
          origin by saying
        </p>
        <MathBlock
          tex={String.raw`\operatorname{span}\{{\color{#f472b6}\mathbf{u}}\}
=\left\{
t{\color{#f472b6}\mathbf{u}}
:\;
t\in\mathbb{R}
\right\}`}
          className="math-center math-lg text-white/90"
        />
        <p>
          That is already a <span className="text-white font-semibold">set description</span>.
          This lesson generalizes that idea.
        </p>
        <p>
          If the object does not pass through the origin, we add a{" "}
          <span className="text-white font-semibold">starting point</span>{" "}
          first, and then move along one or more directions from there.
        </p>
      </InfoPanel>

      <section id="set-view" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Seeing a geometric object as a set
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          A line is not just one point. A plane is not just one point. They are{" "}
          <span className="text-white font-semibold">collections of infinitely many points</span>.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          In linear algebra, we often describe that collection by saying:
        </p>
        <ul className="ml-6 grid gap-3 text-base leading-7 text-[color:var(--color-muted)]">
          <li className="list-disc">
            start at a point <span className="text-white font-semibold">p</span>
          </li>
          <li className="list-disc">
            move along one direction to get a line
          </li>
          <li className="list-disc">
            move along two independent directions to get a plane
          </li>
        </ul>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          So the central idea is:
          <span className="text-white font-semibold">
            {" "}point + allowed directions = whole geometric set
          </span>
          .
        </p>
      </section>

      <section id="lines" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Lines as vector sets
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          A line through the origin in direction{" "}
          <MathInline tex={String.raw`{\color{#f472b6}\mathbf{u}}`} className="math-inline math-white" />{" "}
          can be written as
        </p>
        <MathBlock
          tex={String.raw`\left\{
t{\color{#f472b6}\mathbf{u}}
:\;
t\in\mathbb{R}
\right\}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          That is exactly the span idea from the previous page.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          A general line does not have to go through the origin. If it starts at
          a point{" "}
          <MathInline tex={String.raw`\mathbf{p}`} className="math-inline math-white" />{" "}
          and points in direction{" "}
          <MathInline tex={String.raw`{\color{#f472b6}\mathbf{u}}`} className="math-inline math-white" />,
          then we write
        </p>
        <MathBlock
          tex={String.raw`\left\{
\mathbf{p}+t{\color{#f472b6}\mathbf{u}}
:\;
t\in\mathbb{R}
\right\}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The parameter{" "}
          <MathInline tex={String.raw`t`} className="math-inline math-white" />{" "}
          tells you how far to move:
        </p>
        <ul className="ml-6 grid gap-3 text-base leading-7 text-[color:var(--color-muted)]">
          <li className="list-disc">
            <MathInline tex={String.raw`t=0`} className="math-inline math-white" /> gives the starting point{" "}
            <MathInline tex={String.raw`\mathbf{p}`} className="math-inline math-white" />
          </li>
          <li className="list-disc">
            positive <MathInline tex={String.raw`t`} className="math-inline math-white" /> moves in the{" "}
            <MathInline tex={String.raw`{\color{#f472b6}\mathbf{u}}`} className="math-inline math-white" /> direction
          </li>
          <li className="list-disc">
            negative <MathInline tex={String.raw`t`} className="math-inline math-white" /> moves the opposite way
          </li>
        </ul>
        <AlgebraStaticVisual
          variant="line-set-shifted"
          framed={false}
          caption="A shifted line is generated by starting at p and then moving by t copies of the direction vector u."
        />
      </section>

      <section id="planes" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Planes as vector sets
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          A plane needs <span className="text-white font-semibold">two independent directions</span>.
          If the plane passes through the origin, then its points look like
        </p>
        <MathBlock
          tex={String.raw`\left\{
s{\color{#f472b6}\mathbf{u}}+t{\color{#22d3ee}\mathbf{v}}
:\;
s,t\in\mathbb{R}
\right\}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          If the plane is shifted away from the origin, we add a starting point{" "}
          <MathInline tex={String.raw`\mathbf{p}`} className="math-inline math-white" />:
        </p>
        <MathBlock
          tex={String.raw`\left\{
\mathbf{p}+s{\color{#f472b6}\mathbf{u}}+t{\color{#22d3ee}\mathbf{v}}
:\;
s,t\in\mathbb{R}
\right\}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Here the two parameters work like two sliders:
        </p>
        <ul className="ml-6 grid gap-3 text-base leading-7 text-[color:var(--color-muted)]">
          <li className="list-disc">
            <MathInline tex={String.raw`s`} className="math-inline math-white" /> moves along{" "}
            <MathInline tex={String.raw`{\color{#f472b6}\mathbf{u}}`} className="math-inline math-white" />
          </li>
          <li className="list-disc">
            <MathInline tex={String.raw`t`} className="math-inline math-white" /> moves along{" "}
            <MathInline tex={String.raw`{\color{#22d3ee}\mathbf{v}}`} className="math-inline math-white" />
          </li>
        </ul>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Varying both of them fills out the whole plane rather than just one
          line.
        </p>
        <AlgebraStaticVisual
          variant="plane-set-shifted"
          framed={false}
          caption="A shifted plane is generated by starting at p and then moving independently along the two direction vectors u and v."
        />
      </section>

      <section id="examples" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Worked examples
        </h2>

        <h3 id="example-line-build" className="scroll-mt-28 text-xl font-semibold text-white font-[var(--font-display)]">
          Example 1: building a point on a line
        </h3>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Consider the line
        </p>
        <MathBlock
          tex={String.raw`L=
\left\{
\begin{bmatrix}1\\[2pt]2\end{bmatrix}
+t\begin{bmatrix}3\\[2pt]1\end{bmatrix}
:\;
t\in\mathbb{R}
\right\}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Find the point when{" "}
          <MathInline tex={String.raw`t=2`} className="math-inline math-white" />.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Substitute the parameter:
        </p>
        <MathBlock
          tex={String.raw`\begin{aligned}
\begin{bmatrix}1\\[2pt]2\end{bmatrix}
+2\begin{bmatrix}3\\[2pt]1\end{bmatrix}
&=
\begin{bmatrix}1\\[2pt]2\end{bmatrix}
+
\begin{bmatrix}6\\[2pt]2\end{bmatrix} \\[8pt]
&=
\begin{bmatrix}7\\[2pt]4\end{bmatrix}
\end{aligned}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          So{" "}
          <MathInline tex={String.raw`\begin{bmatrix}7\\[2pt]4\end{bmatrix}`} className="math-inline math-white" />{" "}
          is one point on the line. Different values of{" "}
          <MathInline tex={String.raw`t`} className="math-inline math-white" />{" "}
          would produce different points on that same line.
        </p>

        <h3 id="example-line-check" className="scroll-mt-28 text-xl font-semibold text-white font-[var(--font-display)]">
          Example 2: checking if a point lies on a line
        </h3>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Use the same line
        </p>
        <MathBlock
          tex={String.raw`L=
\left\{
\begin{bmatrix}1\\[2pt]2\end{bmatrix}
+t\begin{bmatrix}3\\[2pt]1\end{bmatrix}
:\;
t\in\mathbb{R}
\right\}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Is{" "}
          <MathInline tex={String.raw`\begin{bmatrix}6\\[2pt]4\end{bmatrix}`} className="math-inline math-white" />{" "}
          on the line?
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We would need some value of{" "}
          <MathInline tex={String.raw`t`} className="math-inline math-white" />{" "}
          such that
        </p>
        <MathBlock
          tex={String.raw`\begin{bmatrix}1\\[2pt]2\end{bmatrix}
+t\begin{bmatrix}3\\[2pt]1\end{bmatrix}
=
\begin{bmatrix}6\\[2pt]4\end{bmatrix}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Match the top and bottom rows:
        </p>
        <MathBlock
          tex={String.raw`\begin{aligned}
1+3t&=6 \\[4pt]
2+t&=4
\end{aligned}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The top row gives
        </p>
        <MathBlock
          tex={String.raw`t=\frac{5}{3}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          but the bottom row gives
        </p>
        <MathBlock
          tex={String.raw`t=2`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Those do not agree, so there is no single parameter value that
          satisfies both rows. Therefore
        </p>
        <MathBlock
          tex={String.raw`\begin{bmatrix}6\\[2pt]4\end{bmatrix}\notin L`}
          className="math-center math-lg text-white/90"
        />

        <h3 id="example-plane" className="scroll-mt-28 text-xl font-semibold text-white font-[var(--font-display)]">
          Example 3: building a point on a plane
        </h3>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Consider the plane
        </p>
        <MathBlock
          tex={String.raw`P=
\left\{
\begin{bmatrix}1\\[2pt]0\\[2pt]2\end{bmatrix}
+s\begin{bmatrix}1\\[2pt]1\\[2pt]0\end{bmatrix}
+t\begin{bmatrix}0\\[2pt]2\\[2pt]1\end{bmatrix}
:\;
s,t\in\mathbb{R}
\right\}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Find the point when{" "}
          <MathInline tex={String.raw`s=2`} className="math-inline math-white" />{" "}
          and{" "}
          <MathInline tex={String.raw`t=-1`} className="math-inline math-white" />.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Substitute the parameter values step by step:
        </p>
        <MathBlock
          tex={String.raw`\begin{aligned}
\begin{bmatrix}1\\[2pt]0\\[2pt]2\end{bmatrix}
+2\begin{bmatrix}1\\[2pt]1\\[2pt]0\end{bmatrix}
-\begin{bmatrix}0\\[2pt]2\\[2pt]1\end{bmatrix}
&=
\begin{bmatrix}1\\[2pt]0\\[2pt]2\end{bmatrix}
+
\begin{bmatrix}2\\[2pt]2\\[2pt]0\end{bmatrix}
+
\begin{bmatrix}0\\[2pt]-2\\[2pt]-1\end{bmatrix} \\[8pt]
&=
\begin{bmatrix}3\\[2pt]0\\[2pt]1\end{bmatrix}
\end{aligned}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          So{" "}
          <MathInline tex={String.raw`\begin{bmatrix}3\\[2pt]0\\[2pt]1\end{bmatrix}`} className="math-inline math-white" />{" "}
          is one point on the plane. Varying{" "}
          <MathInline tex={String.raw`s`} className="math-inline math-white" />{" "}
          and{" "}
          <MathInline tex={String.raw`t`} className="math-inline math-white" />{" "}
          sweeps out the whole plane.
        </p>
      </section>

      <section id="checks" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Checks and common mistakes
        </h2>
        <div className="ml-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Point versus direction</td>
                <td className="py-2">In expressions like p + t u, p is the starting point and u is the direction. They do different jobs.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Parameters are free</td>
                <td className="py-2">The letters t, s, and so on are allowed to vary across all real numbers unless the problem says otherwise.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Through-origin is special</td>
                <td className="py-2">If there is no starting point p term, the set passes through the origin. If there is a nonzero p, it is shifted away.</td>
              </tr>
              <tr>
                <td className="w-56 py-2 pr-4 font-semibold text-white">Not every line or plane is a subspace</td>
                <td className="py-2">A shifted line or shifted plane usually does not contain the zero vector, so it will matter in the next lesson that subspaces have stricter rules.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="bridge" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          What comes next
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This page described lines and planes as vector sets. The next lesson
          asks a sharper question:
          <span className="text-white font-semibold">
            {" "}which of these sets behave nicely under vector addition and scalar multiplication?
          </span>
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          That is exactly the idea of a{" "}
          <span className="text-white font-semibold">subspace</span>.
        </p>
        <MathBlock
          tex={String.raw`\left\{
t{\color{#f472b6}\mathbf{u}}
:\;
t\in\mathbb{R}
\right\}
\qquad\text{versus}\qquad
\left\{
\mathbf{p}+t{\color{#f472b6}\mathbf{u}}
:\;
t\in\mathbb{R}
\right\}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          One of those is the kind of set linear algebra likes especially well.
          The next page explains why.
        </p>
      </section>

      <section id="summary" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Summary
        </h2>
        <div className="ml-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">A line or plane can be described as a whole set of vectors, not just as a picture.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">A line through the origin has the form <MathInline tex={String.raw`\{t{\color{#f472b6}\mathbf{u}}:t\in\mathbb{R}\}`} className="math-inline math-white" />.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">A shifted line has the form <MathInline tex={String.raw`\{\mathbf{p}+t{\color{#f472b6}\mathbf{u}}:t\in\mathbb{R}\}`} className="math-inline math-white" />.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">A plane is generated by a point and two independent directions: <MathInline tex={String.raw`\{\mathbf{p}+s{\color{#f472b6}\mathbf{u}}+t{\color{#22d3ee}\mathbf{v}}:s,t\in\mathbb{R}\}`} className="math-inline math-white" />.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">Parameters like <MathInline tex={String.raw`t`} className="math-inline math-white" /> and <MathInline tex={String.raw`s`} className="math-inline math-white" /> simply tell you how far to move along the allowed directions.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">This topic leads directly into subspaces, where through-origin sets become especially important.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </ArticleLayout>
  );
}
