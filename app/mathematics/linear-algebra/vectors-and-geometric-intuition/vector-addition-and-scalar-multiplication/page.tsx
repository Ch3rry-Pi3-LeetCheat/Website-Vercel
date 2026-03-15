import type { Metadata } from "next";
import ArticleLayout from "@/components/ArticleLayout";
import InfoPanel from "@/components/InfoPanel";
import RightRail from "@/components/RightRail";
import { MathBlock, MathInline } from "@/components/Math";
import AlgebraStaticVisual from "@/components/math/AlgebraStaticVisual";
import {
  linearAlgebraPhases,
  linearAlgebraVectorLessons,
} from "@/lib/mathTopics";

export const metadata: Metadata = {
  title: "Vector Addition and Scalar Multiplication",
  description:
    "Add vectors component by component, scale them with numbers, and connect the algebra to the geometric picture.",
};

export default function VectorAdditionAndScalarMultiplicationPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "intro", label: "Introduction" },
    { id: "why", label: "Why this topic comes next", level: 2 },
    { id: "addition", label: "Vector addition" },
    { id: "components", label: "Adding component by component", level: 2 },
    { id: "picture", label: "A geometric picture", level: 2 },
    { id: "scaling", label: "Scalar multiplication" },
    { id: "negative", label: "Fractions and negatives", level: 2 },
    { id: "bridge", label: "Linear algebra bridge" },
    { id: "summary", label: "Summary" },
  ];

  return (
    <ArticleLayout
      eyebrow="Mathematics - Linear Algebra - Vectors"
      title="Vector addition and scalar multiplication"
      description="This page is where vectors start doing things. Instead of only naming them and plotting them, we now combine them and scale them. The main goal is to keep both readings in view at the same time: the algebraic reading in components and the geometric reading as arrows."
      descriptionClassName="!max-w-none"
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Linear Algebra phases", links: linearAlgebraPhases },
            { title: "Within this phase", links: linearAlgebraVectorLessons },
          ]}
          activeHref="/mathematics/linear-algebra/vectors-and-geometric-intuition/vector-addition-and-scalar-multiplication"
        />
      }
    >
      <InfoPanel id="intro" title="Introduction" variant="intro">
        <p>
          The previous lesson established what a vector is. This lesson begins
          the first real operations on vectors.
        </p>
        <p>
          Two ideas matter here. First, vectors can be{" "}
          <span className="text-white font-semibold">added</span>. Second, a
          scalar can{" "}
          <span className="text-white font-semibold">scale</span> a vector.
          Those two moves appear everywhere later in linear algebra.
        </p>
        <p>Here is the roadmap for this lesson:</p>
        <div className="ml-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">
                  Vector addition
                </td>
                <td className="py-2">
                  How two vectors combine component by component and as one
                  total movement.
                </td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">
                  Scalar multiplication
                </td>
                <td className="py-2">
                  How a number stretches, shrinks, or reverses a vector.
                </td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">
                  Linear algebra bridge
                </td>
                <td className="py-2">
                  Why expressions such as{" "}
                  <MathInline
                    tex={String.raw`{\color{#f472b6}\mathbf{u}}+{\color{#22d3ee}\mathbf{v}}`}
                    className="math-inline math-white"
                  />{" "}
                  and{" "}
                  <MathInline
                    tex={String.raw`a{\color{#22d3ee}\mathbf{v}}`}
                    className="math-inline math-white"
                  />{" "}
                  become standard later.
                </td>
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
          Once a vector has been introduced, the next natural question is not
          what it is called. The next question is{" "}
          <span className="text-white font-semibold">what we can do with it</span>.
        </p>
        <MathBlock
          tex={String.raw`{\color{#f472b6}\mathbf{u}}+{\color{#22d3ee}\mathbf{v}},\qquad 2{\color{#22d3ee}\mathbf{v}},\qquad -{\color{#22d3ee}\mathbf{v}},\qquad a{\color{#f472b6}\mathbf{u}}+b{\color{#22d3ee}\mathbf{v}}`}
          className="math-center math-lg text-white/90"
        />
        <p>
          None of those expressions is meant to feel decorative. They all
          build on two very simple habits: add vectors by matching components,
          and let a scalar act on every component of the vector.
        </p>
      </InfoPanel>

      <section id="addition" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Vector addition
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Vector addition means combine two vector changes into one total
          change. In an everyday reading, if one movement says go 2 to the
          right and 1 up and another says go 1 to the right and 2 up, then the
          total movement is just both of those changes put together.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We will use
          {" "}
          <MathInline
            tex={String.raw`{\color{#22d3ee}\mathbf{v}}=(2,1)`}
            className="math-inline math-white"
          />
          {" "}
          and
          {" "}
          <MathInline
            tex={String.raw`{\color{#f472b6}\mathbf{u}}=(1,2)`}
            className="math-inline math-white"
          />
          {" "}
          as the first example.
        </p>

        <section id="components" className="scroll-mt-28 grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Adding component by component
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            The rule is straightforward: add the horizontal parts together, and
            add the vertical parts together.
          </p>
          <MathBlock
            tex={String.raw`{\color{#22d3ee}\mathbf{v}}+{\color{#f472b6}\mathbf{u}}=(2,1)+(1,2)`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Now add the first components and the second components separately:
          </p>
          <MathBlock
            tex={String.raw`(2,1)+(1,2)=(2+1,\,1+2)=(3,3)`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            The same idea can be written in column-vector form:
          </p>
          <MathBlock
            tex={String.raw`\begin{aligned}
\color{#22d3ee}\mathbf{v}+\color{#f472b6}\mathbf{u}
&=
\begin{bmatrix}2\\[0.35em]1\end{bmatrix}
+
\begin{bmatrix}1\\[0.35em]2\end{bmatrix}\\[0.55em]
&=
\begin{bmatrix}2+1\\[0.35em]1+2\end{bmatrix}\\[0.55em]
&=
\begin{bmatrix}3\\[0.35em]3\end{bmatrix}
\end{aligned}`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            So vector addition is not mysterious. It is just a careful
            component-by-component sum.
          </p>
        </section>

        <section id="picture" className="scroll-mt-28 grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            A geometric picture
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Geometrically, one clean way to see addition is{" "}
            <span className="text-white font-semibold">head to tail</span>.
            Draw
            {" "}
            <MathInline
              tex={String.raw`{\color{#22d3ee}\mathbf{v}}`}
              className="math-inline math-white"
            />
            {" "}
            first. Then place
            {" "}
            <MathInline
              tex={String.raw`{\color{#f472b6}\mathbf{u}}`}
              className="math-inline math-white"
            />
            {" "}
            so that it starts where
            {" "}
            <MathInline
              tex={String.raw`{\color{#22d3ee}\mathbf{v}}`}
              className="math-inline math-white"
            />
            {" "}
            ends.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            The single arrow from the origin to the final endpoint is the sum
            {" "}
            <MathInline
              tex={String.raw`{\color{#22d3ee}\mathbf{v}}+{\color{#f472b6}\mathbf{u}}`}
              className="math-inline math-white"
            />
            .
          </p>
          <AlgebraStaticVisual
            variant="vector-addition"
            framed={false}
            caption="Addition can be read head to tail: place the second vector at the end of the first, then read the total arrow from the origin."
          />
        </section>
      </section>

      <section id="scaling" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Scalar multiplication
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Scalar multiplication means a number acts on every component of the
          vector. If
          {" "}
          <MathInline
            tex={String.raw`{\color{#22d3ee}\mathbf{v}}=(2,1)`}
            className="math-inline math-white"
          />
          , then
          {" "}
          <MathInline
            tex={String.raw`2{\color{#22d3ee}\mathbf{v}}`}
            className="math-inline math-white"
          />
          {" "}
          doubles both components.
        </p>
        <MathBlock
          tex={String.raw`2{\color{#22d3ee}\mathbf{v}}=2(2,1)=(4,2)`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          In column-vector form, we read it component by component:
        </p>
        <MathBlock
          tex={String.raw`\begin{aligned}
2{\color{#22d3ee}\mathbf{v}}
&=
2\begin{bmatrix}2\\[0.35em]1\end{bmatrix}\\[0.55em]
&=
\begin{bmatrix}2\cdot 2\\[0.35em]2\cdot 1\end{bmatrix}\\[0.55em]
&=
\begin{bmatrix}4\\[0.35em]2\end{bmatrix}
\end{aligned}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Geometrically, the direction stays the same, but the arrow becomes
          longer.
        </p>
        <AlgebraStaticVisual
          variant="vector-scaling"
          framed={false}
          caption="A positive scalar stretches the vector along the same direction."
        />

        <section id="negative" className="scroll-mt-28 grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Fractions and negatives
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Not every scalar makes the vector longer. Fractions shrink it, and
            negative scalars reverse the direction.
          </p>
          <MathBlock
            tex={String.raw`\tfrac{1}{2}{\color{#22d3ee}\mathbf{v}}=(1,\tfrac{1}{2}),\qquad -{\color{#22d3ee}\mathbf{v}}=(-2,-1)`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            So the scalar tells you more than just multiply. It tells you
            whether the vector should stretch, shrink, or flip.
          </p>
        </section>
      </section>

      <section id="bridge" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Linear algebra bridge
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          These two operations are the beginning of the real algebra of vectors.
        </p>
        <MathBlock
          tex={String.raw`{\color{#f472b6}\mathbf{u}}+{\color{#22d3ee}\mathbf{v}},\qquad 3{\color{#22d3ee}\mathbf{v}},\qquad a{\color{#f472b6}\mathbf{u}}+b{\color{#22d3ee}\mathbf{v}},\qquad A{\color{#22d3ee}\mathbf{v}}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Later pages will build much richer structures from these same habits.
          But the beginner-level core stays simple:
        </p>
        <ul className="ml-6 grid gap-3 text-base leading-7 text-[color:var(--color-muted)]">
          <li className="flex items-start gap-3">
            <span className="pt-0.5 text-white">-</span>
            <span>
              vectors add by matching their components
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="pt-0.5 text-white">-</span>
            <span>
              a scalar acts on every component of the vector
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="pt-0.5 text-white">-</span>
            <span>
              the geometric picture and the algebraic picture should agree
            </span>
          </li>
        </ul>
      </section>

      <section id="summary" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Summary
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This is the page where vectors stop being static objects and start
          becoming things that can be combined and scaled.
        </p>
        <div className="ml-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">
                  Vector addition combines matching components.
                </td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">
                  Geometrically, addition can be read head to tail.
                </td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">
                  Scalar multiplication acts on every component of the vector.
                </td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">
                  Positive scalars stretch, fractions shrink, and negative
                  scalars reverse direction.
                </td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">
                  These ideas are the foundation for later expressions such as{" "}
                  <MathInline
                    tex={String.raw`{\color{#f472b6}\mathbf{u}}+{\color{#22d3ee}\mathbf{v}}`}
                    className="math-inline math-white"
                  />
                  {" "}and{" "}
                  <MathInline
                    tex={String.raw`A{\color{#22d3ee}\mathbf{v}}`}
                    className="math-inline math-white"
                  />
                  .
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </ArticleLayout>
  );
}
