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
    { id: "subtraction", label: "Vector subtraction", level: 2 },
    { id: "scaling", label: "Scalar multiplication" },
    { id: "negative", label: "Fractions and negatives", level: 2 },
    { id: "rules", label: "Core rules" },
    { id: "bridge", label: "Putting it together" },
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
                  Vector addition and subtraction
                </td>
                <td className="py-2">
                  How vectors combine, and how subtraction is really addition
                  of the opposite vector.
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
                  Core rules
                </td>
                <td className="py-2">
                  The standard properties such as commutative, associative, and
                  distributive that keep vector algebra coherent.
                </td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">
                  Putting it together
                </td>
                <td className="py-2">
                  How the main ideas on this page already combine into
                  expressions such as{" "}
                  <MathInline
                    tex={String.raw`{\color{#f472b6}\mathbf{u}}+{\color{#22d3ee}\mathbf{v}}`}
                    className="math-inline math-white"
                  />{" "}
                  ,{" "}
                  <MathInline
                    tex={String.raw`2{\color{#22d3ee}\mathbf{v}}`}
                    className="math-inline math-white"
                  />{" "}
                  , and{" "}
                  <MathInline
                    tex={String.raw`a{\color{#f472b6}\mathbf{u}}+b{\color{#22d3ee}\mathbf{v}}`}
                    className="math-inline math-white"
                  />{" "}
                  .
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
{\color{white}+}
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
            That same construction is also often called the{" "}
            <span className="text-white font-semibold">triangle rule</span>.
            You follow the first arrow, then continue with the second arrow,
            and the single arrow from the starting point to the final endpoint
            is the sum.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            If both vectors start at the origin, the same geometry is also the{" "}
            <span className="text-white font-semibold">parallelogram rule</span>.
            The translated copies form a parallelogram, and the diagonal from
            the origin gives the total vector.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            The single arrow from the origin to the final endpoint is the sum
            {" "}
            <MathInline
              tex={String.raw`{\color{#22d3ee}\mathbf{v}}+{\color{#f472b6}\mathbf{u}}`}
              className="math-inline math-white"
            />
            . That picture also makes the{" "}
            <span className="text-white font-semibold">commutative law</span>{" "}
            feel natural: swapping the order still reaches the same final
            endpoint.
          </p>
          <AlgebraStaticVisual
            variant="vector-addition"
            framed={false}
            caption="Vector addition can be read as the head-to-tail or triangle rule, and the same geometry also gives the parallelogram rule."
          />
        </section>

        <section id="subtraction" className="scroll-mt-28 grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Vector subtraction
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Vector subtraction is the natural next step after addition, because
            it is really just{" "}
            <span className="text-white font-semibold">
              addition of the opposite vector
            </span>
            .
          </p>
          <MathBlock
            tex={String.raw`{\color{#22d3ee}\mathbf{v}}-{\color{#f472b6}\mathbf{u}}={\color{#22d3ee}\mathbf{v}}+(-{\color{#f472b6}\mathbf{u}})`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            With
            {" "}
            <MathInline
              tex={String.raw`{\color{#22d3ee}\mathbf{v}}=(2,1)`}
              className="math-inline math-white"
            />
            {" "}
            and{" "}
            <MathInline
              tex={String.raw`{\color{#f472b6}\mathbf{u}}=(1,2)`}
              className="math-inline math-white"
            />
            , we get:
          </p>
          <MathBlock
            tex={String.raw`\begin{aligned}
{\color{#22d3ee}\mathbf{v}}-{\color{#f472b6}\mathbf{u}}
&=(2,1)-(1,2)\\[0.55em]
&=(2-1,\,1-2)\\[0.55em]
&=(1,-1)
\end{aligned}`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            In column-vector form, the same subtraction is:
          </p>
          <MathBlock
            tex={String.raw`\begin{aligned}
\color{#22d3ee}\mathbf{v}-\color{#f472b6}\mathbf{u}
&=
\begin{bmatrix}2\\[0.35em]1\end{bmatrix}
-
\begin{bmatrix}1\\[0.35em]2\end{bmatrix}\\[0.55em]
&=
\begin{bmatrix}2-1\\[0.35em]1-2\end{bmatrix}\\[0.55em]
&=
\begin{bmatrix}1\\[0.35em]-1\end{bmatrix}
\end{aligned}`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            So subtraction is not a missing separate world. It sits inside the
            same picture as addition and negative scaling.
          </p>
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
          tex={String.raw`\begin{aligned}
2{\color{#22d3ee}\mathbf{v}}
&=2(2,1)\\[0.55em]
&=(2\cdot 2,\,2\cdot 1)\\[0.55em]
&=(4,2)
\end{aligned}`}
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
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            In particular,
            {" "}
            <MathInline
              tex={String.raw`-{\color{#22d3ee}\mathbf{v}}`}
              className="math-inline math-white"
            />
            {" "}
            is the same as multiplying the vector by
            {" "}
            <MathInline
              tex={String.raw`-1`}
              className="math-inline math-white"
            />
            .
          </p>
          <MathBlock
            tex={String.raw`\begin{aligned}
\tfrac{1}{2}{\color{#22d3ee}\mathbf{v}}
&=\tfrac{1}{2}(2,1)\\[0.55em]
&=\left(\tfrac{1}{2}\cdot 2,\tfrac{1}{2}\cdot 1\right)\\[0.55em]
&=(1,\tfrac{1}{2})
\end{aligned}`}
            className="math-center math-lg text-white/90"
          />
          <MathBlock
            tex={String.raw`\begin{aligned}
-{\color{#22d3ee}\mathbf{v}}
&=(-1){\color{#22d3ee}\mathbf{v}}\\[0.55em]
&=(-1)(2,1)\\[0.55em]
&=\left((-1)\cdot 2,(-1)\cdot 1\right)\\[0.55em]
&=(-2,-1)
\end{aligned}`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            So the scalar tells you more than just multiply. It tells you
            whether the vector should stretch, shrink, or flip.
          </p>
        </section>
      </section>

      <section id="rules" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Core rules
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Once vectors can be added and scaled, a small set of standard rules
          starts appearing everywhere. These are the basic operation rules that
          later sit inside the vector-space axioms. They are not decorative
          names. They are the reason the algebra behaves predictably.
        </p>
        <div className="ml-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr>
                <td className="w-56 py-2 pr-4 font-semibold text-white">
                  Commutative addition
                </td>
                <td className="py-2">
                  <MathInline
                    tex={String.raw`{\color{#f472b6}\mathbf{u}}+{\color{#22d3ee}\mathbf{v}}={\color{#22d3ee}\mathbf{v}}+{\color{#f472b6}\mathbf{u}}`}
                    className="math-inline math-white"
                  />
                  . The order of vector addition does not change the result.
                </td>
              </tr>
              <tr>
                <td className="w-56 py-2 pr-4 font-semibold text-white">
                  Associative addition
                </td>
                <td className="py-2">
                  <MathInline
                    tex={String.raw`({\color{#f472b6}\mathbf{u}}+{\color{#22d3ee}\mathbf{v}})+\mathbf{w}={\color{#f472b6}\mathbf{u}}+({\color{#22d3ee}\mathbf{v}}+\mathbf{w})`}
                    className="math-inline math-white"
                  />
                  . Grouping does not change the total vector.
                </td>
              </tr>
              <tr>
                <td className="w-56 py-2 pr-4 font-semibold text-white">
                  Zero vector
                </td>
                <td className="py-2">
                  <MathInline
                    tex={String.raw`{\color{#22d3ee}\mathbf{v}}+\mathbf{0}={\color{#22d3ee}\mathbf{v}}`}
                    className="math-inline math-white"
                  />
                  . Adding the zero vector changes nothing.
                </td>
              </tr>
              <tr>
                <td className="w-56 py-2 pr-4 font-semibold text-white">
                  Additive inverse
                </td>
                <td className="py-2">
                  <MathInline
                    tex={String.raw`{\color{#22d3ee}\mathbf{v}}+(-{\color{#22d3ee}\mathbf{v}})=\mathbf{0}`}
                    className="math-inline math-white"
                  />
                  . Every vector has an opposite vector.
                </td>
              </tr>
              <tr>
                <td className="w-56 py-2 pr-4 font-semibold text-white">
                  Distributive law
                </td>
                <td className="py-2">
                  <MathInline
                    tex={String.raw`a({\color{#f472b6}\mathbf{u}}+{\color{#22d3ee}\mathbf{v}})=a{\color{#f472b6}\mathbf{u}}+a{\color{#22d3ee}\mathbf{v}}`}
                    className="math-inline math-white"
                  />
                  {" "}and{" "}
                  <MathInline
                    tex={String.raw`(a+b){\color{#22d3ee}\mathbf{v}}=a{\color{#22d3ee}\mathbf{v}}+b{\color{#22d3ee}\mathbf{v}}`}
                    className="math-inline math-white"
                  />
                  .
                </td>
              </tr>
              <tr>
                <td className="w-56 py-2 pr-4 font-semibold text-white">
                  Scalar associativity
                </td>
                <td className="py-2">
                  <MathInline
                    tex={String.raw`a(b{\color{#22d3ee}\mathbf{v}})=(ab){\color{#22d3ee}\mathbf{v}}`}
                    className="math-inline math-white"
                  />
                  . Scaling in two stages is the same as one combined scale.
                </td>
              </tr>
              <tr>
                <td className="w-56 py-2 pr-4 font-semibold text-white">
                  Identity scalar
                </td>
                <td className="py-2">
                  <MathInline
                    tex={String.raw`1{\color{#22d3ee}\mathbf{v}}={\color{#22d3ee}\mathbf{v}}`}
                    className="math-inline math-white"
                  />
                  . Multiplying by 1 leaves the vector unchanged.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          For a beginner, the most useful way to remember these is simple:
          vector algebra should behave cleanly enough that you can regroup,
          reorder, and scale without creating contradictions.
        </p>
        <section className="grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Worked mini-examples
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            The names become much easier to remember once they are tied to
            concrete calculations.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            <span className="text-white font-semibold">Commutative addition</span>{" "}
            says the order does not matter:
          </p>
          <MathBlock
            tex={String.raw`\begin{aligned}
{\color{#22d3ee}\mathbf{v}}+{\color{#f472b6}\mathbf{u}}
&=(2,1)+(1,2)\\[0.55em]
&=(3,3)\\[0.75em]
{\color{#f472b6}\mathbf{u}}+{\color{#22d3ee}\mathbf{v}}
&=(1,2)+(2,1)\\[0.55em]
&=(3,3)
\end{aligned}`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            <span className="text-white font-semibold">Associative addition</span>{" "}
            says regrouping does not change the total. If{" "}
            <MathInline
              tex={String.raw`\mathbf{w}=(1,0)`}
              className="math-inline math-white"
            />
            , then:
          </p>
          <MathBlock
            tex={String.raw`\begin{aligned}
({\color{#22d3ee}\mathbf{v}}+{\color{#f472b6}\mathbf{u}})+\mathbf{w}
&=(3,3)+(1,0)\\[0.55em]
&=(4,3)\\[0.75em]
{\color{#22d3ee}\mathbf{v}}+({\color{#f472b6}\mathbf{u}}+\mathbf{w})
&=(2,1)+(2,2)\\[0.55em]
&=(4,3)
\end{aligned}`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            <span className="text-white font-semibold">Distributive laws</span>{" "}
            connect scalar multiplication to vector addition:
          </p>
          <MathBlock
            tex={String.raw`\begin{aligned}
2({\color{#22d3ee}\mathbf{v}}+{\color{#f472b6}\mathbf{u}})
&=2(3,3)\\[0.55em]
&=(6,6)\\[0.75em]
2{\color{#22d3ee}\mathbf{v}}+2{\color{#f472b6}\mathbf{u}}
&=(4,2)+(2,4)\\[0.55em]
&=(6,6)
\end{aligned}`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            So these properties are not just names to memorize. They are short
            labels for the patterns that keep vector calculations consistent.
          </p>
        </section>
      </section>

      <section id="bridge" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Putting it together
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          At this point, the separate moves on the page can already be combined
          into one expression language for vectors.
        </p>
        <MathBlock
          tex={String.raw`{\color{#f472b6}\mathbf{u}}+{\color{#22d3ee}\mathbf{v}},\qquad {\color{#22d3ee}\mathbf{v}}-{\color{#f472b6}\mathbf{u}},\qquad 2{\color{#22d3ee}\mathbf{v}},\qquad a{\color{#f472b6}\mathbf{u}}+b{\color{#22d3ee}\mathbf{v}}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          A short combined example already looks like this. If{" "}
          <MathInline
            tex={String.raw`a=2`}
            className="math-inline math-white"
          />{" "}
          and{" "}
          <MathInline
            tex={String.raw`b=-1`}
            className="math-inline math-white"
          />
          , then{" "}
          <MathInline
            tex={String.raw`a{\color{#f472b6}\mathbf{u}}+b{\color{#22d3ee}\mathbf{v}}`}
            className="math-inline math-white"
          />{" "}
          becomes{" "}
          <MathInline
            tex={String.raw`2{\color{#f472b6}\mathbf{u}}-{\color{#22d3ee}\mathbf{v}}`}
            className="math-inline math-white"
          />
          .
        </p>
        <MathBlock
          tex={String.raw`\begin{aligned}
2{\color{#f472b6}\mathbf{u}}-{\color{#22d3ee}\mathbf{v}}
&=2(1,2)-(2,1)\\[0.55em]
&=(2,4)-(2,1)\\[0.55em]
&=(0,3)
\end{aligned}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          So the beginner-level core stays simple:
        </p>
        <ul className="ml-10 list-disc grid gap-3 text-base leading-7 text-[color:var(--color-muted)] marker:text-white">
          <li>vectors add by matching their components</li>
          <li>subtraction is addition of the opposite vector</li>
          <li>a scalar acts on every component of the vector</li>
          <li>the geometric picture and the algebraic picture should agree</li>
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
                  Geometrically, addition can be read by the head-to-tail /
                  triangle rule or by the parallelogram rule.
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
                  These ideas already combine into expressions such as{" "}
                  <MathInline
                    tex={String.raw`{\color{#f472b6}\mathbf{u}}+{\color{#22d3ee}\mathbf{v}}`}
                    className="math-inline math-white"
                  />
                  {", "}
                  <MathInline
                    tex={String.raw`{\color{#22d3ee}\mathbf{v}}-{\color{#f472b6}\mathbf{u}}`}
                    className="math-inline math-white"
                  />
                  {", and "}
                  <MathInline
                    tex={String.raw`a{\color{#f472b6}\mathbf{u}}+b{\color{#22d3ee}\mathbf{v}}`}
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
