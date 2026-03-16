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
  title: "Dot Product and Geometric Meaning",
  description:
    "Compute dot products component by component, read them as alignment, and connect the algebra to angles and perpendicularity.",
};

export default function DotProductAndGeometricMeaningPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "intro", label: "Introduction" },
    { id: "why", label: "Why this topic comes next", level: 2 },
    { id: "components", label: "Dot product from components" },
    { id: "meaning", label: "Geometric meaning" },
    { id: "sign", label: "What the sign tells you" },
    { id: "examples", label: "Worked examples" },
    { id: "why-matters", label: "Why it matters" },
    { id: "bridge", label: "What comes next" },
    { id: "summary", label: "Summary" },
  ];

  return (
    <ArticleLayout
      eyebrow="Mathematics - Linear Algebra - Vectors"
      title="Dot product and geometric meaning"
      description="The dot product is the first vector operation that turns two vectors into one number. This lesson shows how to compute it from components, how to read it geometrically as alignment, and why it immediately leads toward angles and perpendicularity."
      descriptionClassName="!max-w-none"
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Linear Algebra phases", links: linearAlgebraPhases },
            { title: "Within this phase", links: linearAlgebraVectorLessons },
          ]}
          activeHref="/mathematics/linear-algebra/vectors-and-geometric-intuition/dot-product-and-geometric-meaning"
        />
      }
    >
      <InfoPanel id="intro" title="Introduction" variant="intro">
        <p>
          The previous lesson gave vectors{" "}
          <span className="text-white font-semibold">size</span> and{" "}
          <span className="text-white font-semibold">direction</span>. The next
          natural question is how to compare two vectors at once.
        </p>
        <p>
          The{" "}
          <span className="text-white font-semibold">dot product</span> answers
          that question. It multiplies vectors together in a special way and
          returns a <span className="text-white font-semibold">single number</span>.
          That number tells you how strongly the two vectors point in the same
          direction.
        </p>
        <p>Here is the roadmap for this lesson:</p>
        <div className="ml-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Dot product from components</td>
                <td className="py-2">How to multiply matching components and add the results.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Geometric meaning</td>
                <td className="py-2">How the same operation measures alignment, angle, and signed overlap.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">What the sign tells you</td>
                <td className="py-2">How positive, zero, and negative dot products correspond to acute, right, and obtuse angles.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Worked examples</td>
                <td className="py-2">How to compute dot products carefully and use them to spot perpendicular vectors.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Why it matters</td>
                <td className="py-2">Why this one scalar becomes central for angles, orthogonality, and projections.</td>
              </tr>
              <tr>
                <td className="w-56 py-2 pr-4 font-semibold text-white">What comes next</td>
                <td className="py-2">How the dot product turns directly into a formula for the angle between vectors.</td>
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
          This is the first place where <span className="text-white font-semibold">size</span> and{" "}
          <span className="text-white font-semibold">direction</span> are combined
          into one operation.
        </p>
        <MathBlock
          tex={String.raw`{\color{#f472b6}\mathbf{u}}\cdot{\color{#22d3ee}\mathbf{v}}={\color{#f472b6}u}_{1}{\color{#22d3ee}v}_{1}\mathbin{\color{white}{+}}{\color{#f472b6}u}_{2}{\color{#22d3ee}v}_{2},\qquad {\color{#f472b6}\mathbf{u}}\cdot{\color{#22d3ee}\mathbf{v}}=\|{\color{#f472b6}\mathbf{u}}\|\,\|{\color{#22d3ee}\mathbf{v}}\|\cos\theta`}
          className="math-center math-lg text-white/90"
        />
        <p>
          The left-hand formula is the algebraic rule. The right-hand formula is
          the geometric meaning. This is why the dot product feels so important:
          it is one of the first operations in linear algebra that has a clean
          symbolic definition and a strong geometric interpretation at the same
          time.
        </p>
      </InfoPanel>

      <section id="components" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Dot product from components
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Start with the mechanical rule. In two dimensions, the dot product
          takes matching components, multiplies them, and then adds those two
          products together.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          For{" "}
          <MathInline
            tex={String.raw`{\color{#f472b6}\mathbf{u}}=(1,2)`}
            className="math-inline math-white"
          />{" "}
          and{" "}
          <MathInline
            tex={String.raw`{\color{#22d3ee}\mathbf{v}}=(4,3)`}
            className="math-inline math-white"
          />
          , the dot product is:
        </p>
        <MathBlock
          tex={String.raw`\begin{aligned}
{\color{#f472b6}\mathbf{u}}\cdot{\color{#22d3ee}\mathbf{v}}
&=(1,2)\cdot(4,3) \\
&=1\cdot4\mathbin{\color{white}{+}}2\cdot3 \\
&=4\mathbin{\color{white}{+}}6 \\
&=10
\end{aligned}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The output is not another vector. It is a{" "}
          <span className="text-white font-semibold">scalar</span>. That matters
          a lot. The dot product is not trying to build a new arrow. It is
          trying to measure a relationship between two existing arrows.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          In general, for two-dimensional vectors,
        </p>
        <MathBlock
          tex={String.raw`{\color{#f472b6}\mathbf{u}}\cdot{\color{#22d3ee}\mathbf{v}}={\color{#f472b6}u}_{1}{\color{#22d3ee}v}_{1}\mathbin{\color{white}{+}}{\color{#f472b6}u}_{2}{\color{#22d3ee}v}_{2}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          And in higher dimensions the same idea just keeps going:
        </p>
        <MathBlock
          tex={String.raw`{\color{#f472b6}\mathbf{u}}\cdot{\color{#22d3ee}\mathbf{v}}=\sum_{i=1}^{n}{\color{#f472b6}u}_{i}{\color{#22d3ee}v}_{i}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          So the rule is simple, but the meaning is deeper: the dot product
          turns matching coordinates into one summary number.
        </p>
      </section>

      <section id="meaning" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Geometric meaning
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Geometrically, the dot product measures{" "}
          <span className="text-white font-semibold">alignment</span>. If two
          vectors point in roughly the same direction, the dot product is
          positive and usually fairly large. If one points sideways relative to
          the other, the dot product collapses toward zero. If one points
          partly backward, the dot product becomes negative.
        </p>
        <MathBlock
          tex={String.raw`{\color{#f472b6}\mathbf{u}}\cdot{\color{#22d3ee}\mathbf{v}}=\|{\color{#f472b6}\mathbf{u}}\|\,\|{\color{#22d3ee}\mathbf{v}}\|\cos\theta`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This formula says the dot product depends on three things:
          the length of{" "}
          <MathInline
            tex={String.raw`{\color{#f472b6}\mathbf{u}}`}
            className="math-inline math-white"
          />
          , the length of{" "}
          <MathInline
            tex={String.raw`{\color{#22d3ee}\mathbf{v}}`}
            className="math-inline math-white"
          />
          , and the angle{" "}
          <MathInline tex={String.raw`\theta`} className="math-inline math-white" />{" "}
          between them.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          A beginner-friendly way to picture it is this: imagine dropping the
          blue vector down onto the pink direction. The dot product measures the
          length of that{" "}
          <span className="text-white font-semibold">signed shadow</span>, then
          scales it by the length of the pink vector.
        </p>
        <AlgebraStaticVisual
          variant="dot-product-projection"
          framed={false}
          caption="The blue vector casts a shadow of length 3 onto the pink direction. That is the geometric part of the dot product."
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Take{" "}
          <MathInline
            tex={String.raw`{\color{#f472b6}\mathbf{u}}=(4,0)`}
            className="math-inline math-white"
          />{" "}
          and{" "}
          <MathInline
            tex={String.raw`{\color{#22d3ee}\mathbf{v}}=(3,4)`}
            className="math-inline math-white"
          />
          . First compute it from components:
        </p>
        <MathBlock
          tex={String.raw`\begin{aligned}
{\color{#f472b6}\mathbf{u}}\cdot{\color{#22d3ee}\mathbf{v}}
&=4\cdot3\mathbin{\color{white}{+}}0\cdot4 \\
&=12
\end{aligned}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Now read the same picture geometrically. Here{" "}
          <MathInline
            tex={String.raw`\|{\color{#f472b6}\mathbf{u}}\|=4`}
            className="math-inline math-white"
          />
          ,{" "}
          <MathInline
            tex={String.raw`\|{\color{#22d3ee}\mathbf{v}}\|=5`}
            className="math-inline math-white"
          />
          , and the right triangle gives
          {" "}
          <MathInline
            tex={String.raw`\cos\theta=\frac{3}{5}`}
            className="math-inline math-white"
          />
          . So:
        </p>
        <MathBlock
          tex={String.raw`\begin{aligned}
{\color{#f472b6}\mathbf{u}}\cdot{\color{#22d3ee}\mathbf{v}}
&=\|{\color{#f472b6}\mathbf{u}}\|\,\|{\color{#22d3ee}\mathbf{v}}\|\cos\theta \\
&=4\cdot5\cdot\frac{3}{5} \\
&=12
\end{aligned}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          So the algebra and the geometry really are saying the same thing. One
          description uses components. The other uses lengths and angle.
        </p>
      </section>

      <section id="sign" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          What the sign tells you
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The sign of the dot product tells you whether the two vectors point
          mostly together, exactly sideways, or partly against each other.
        </p>
        <AlgebraStaticVisual
          variant="dot-product-sign-cases"
          framed={false}
          caption="Positive means the vectors lean together, zero means they are perpendicular, and negative means one has a backward component relative to the other."
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          That one picture leads to three important cases:
        </p>
        <div className="ml-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr>
                <td className="w-44 py-2 pr-4 font-semibold text-white">Acute angle</td>
                <td className="py-2">If the angle is less than 90°, then <MathInline tex={String.raw`{\color{#f472b6}\mathbf{u}}\cdot{\color{#22d3ee}\mathbf{v}}>0`} className="math-inline math-white" />.</td>
              </tr>
              <tr>
                <td className="w-44 py-2 pr-4 font-semibold text-white">Right angle</td>
                <td className="py-2">If the vectors are <span className="text-white font-semibold">perpendicular</span>, or <span className="text-white font-semibold">orthogonal</span>, then <MathInline tex={String.raw`{\color{#f472b6}\mathbf{u}}\cdot{\color{#22d3ee}\mathbf{v}}=0`} className="math-inline math-white" />.</td>
              </tr>
              <tr>
                <td className="w-44 py-2 pr-4 font-semibold text-white">Obtuse angle</td>
                <td className="py-2">If the angle is greater than 90°, then <MathInline tex={String.raw`{\color{#f472b6}\mathbf{u}}\cdot{\color{#22d3ee}\mathbf{v}}<0`} className="math-inline math-white" /> because one vector points partly backward relative to the other.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This is one of the most useful beginner takeaways on the page:
          <span className="text-white font-semibold"> zero dot product means perpendicular vectors</span>.
          That fact will keep returning throughout linear algebra.
        </p>
      </section>

      <section id="examples" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Worked examples
        </h2>
        <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
          Example 1: a straightforward computation
        </h3>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Let{" "}
          <MathInline
            tex={String.raw`{\color{#f472b6}\mathbf{u}}=(2,1)`}
            className="math-inline math-white"
          />{" "}
          and{" "}
          <MathInline
            tex={String.raw`{\color{#22d3ee}\mathbf{v}}=(1,3)`}
            className="math-inline math-white"
          />
          . Multiply matching components first:
        </p>
        <MathBlock
          tex={String.raw`\begin{aligned}
{\color{#f472b6}\mathbf{u}}\cdot{\color{#22d3ee}\mathbf{v}}
&=2\cdot1\mathbin{\color{white}{+}}1\cdot3 \\
&=2\mathbin{\color{white}{+}}3 \\
&=5
\end{aligned}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The answer is 5, so the vectors have a positive amount of alignment.
          They are not perpendicular, and they are not pulling strongly against
          each other.
        </p>

        <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
          Example 2: spotting perpendicular vectors
        </h3>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Now take{" "}
          <MathInline
            tex={String.raw`{\color{#f472b6}\mathbf{u}}=(2,1)`}
            className="math-inline math-white"
          />{" "}
          and{" "}
          <MathInline
            tex={String.raw`{\color{#22d3ee}\mathbf{v}}=(1,-2)`}
            className="math-inline math-white"
          />
          . Compute the dot product carefully:
        </p>
        <MathBlock
          tex={String.raw`\begin{aligned}
{\color{#f472b6}\mathbf{u}}\cdot{\color{#22d3ee}\mathbf{v}}
&=2\cdot1\mathbin{\color{white}{+}}1\cdot(-2) \\
&=2\mathbin{\color{white}{+}}(-2) \\
&=0
\end{aligned}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Because the dot product is 0, the vectors are{" "}
          <span className="text-white font-semibold">perpendicular</span>.
          This is a powerful shortcut. You do not need to measure the angle
          directly. The dot product tells you.
        </p>

        <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
          Example 3: a negative dot product
        </h3>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Finally, let{" "}
          <MathInline
            tex={String.raw`{\color{#f472b6}\mathbf{u}}=(4,0)`}
            className="math-inline math-white"
          />{" "}
          and{" "}
          <MathInline
            tex={String.raw`{\color{#22d3ee}\mathbf{v}}=(-2,3)`}
            className="math-inline math-white"
          />
          . Then:
        </p>
        <MathBlock
          tex={String.raw`\begin{aligned}
{\color{#f472b6}\mathbf{u}}\cdot{\color{#22d3ee}\mathbf{v}}
&=4\cdot(-2)\mathbin{\color{white}{+}}0\cdot3 \\
&=-8
\end{aligned}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The negative answer tells you that{" "}
          <MathInline
            tex={String.raw`{\color{#22d3ee}\mathbf{v}}`}
            className="math-inline math-white"
          />{" "}
          points partly backward relative to{" "}
          <MathInline
            tex={String.raw`{\color{#f472b6}\mathbf{u}}`}
            className="math-inline math-white"
          />
          . That means the angle between them must be{" "}
          <span className="text-white font-semibold">obtuse</span>.
        </p>
      </section>

      <section id="why-matters" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Why it matters
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The dot product is not just another calculation exercise. It becomes
          useful anywhere you need to compare vectors by direction instead of
          just staring at their components.
        </p>
        <div className="ml-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr>
                <td className="w-56 py-2 pr-4 font-semibold text-white">Alignment</td>
                <td className="py-2">It tells you how much two vectors point together.</td>
              </tr>
              <tr>
                <td className="w-56 py-2 pr-4 font-semibold text-white">Orthogonality</td>
                <td className="py-2">It gives a quick test for perpendicular vectors by checking whether the dot product is 0.</td>
              </tr>
              <tr>
                <td className="w-56 py-2 pr-4 font-semibold text-white">Preparation for later topics</td>
                <td className="py-2">It leads directly into angles between vectors and later into projections.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          For a beginner, that is the big picture: the dot product is a compact
          way to turn two arrows into one meaningful comparison number.
        </p>
      </section>

      <section id="bridge" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          What comes next
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Once the geometric meaning of the dot product is clear, the next step
          is to solve for the angle itself rather than just talking about the
          sign or general amount of alignment.
        </p>
        <MathBlock
          tex={String.raw`\cos\theta=\frac{{\color{#f472b6}\mathbf{u}}\cdot{\color{#22d3ee}\mathbf{v}}}{\|{\color{#f472b6}\mathbf{u}}\|\,\|{\color{#22d3ee}\mathbf{v}}\|},\qquad \theta=\cos^{-1}\!\left(\frac{{\color{#f472b6}\mathbf{u}}\cdot{\color{#22d3ee}\mathbf{v}}}{\|{\color{#f472b6}\mathbf{u}}\|\,\|{\color{#22d3ee}\mathbf{v}}\|}\right)`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          That is the natural handoff into the next lesson: turning dot products
          into actual angle calculations.
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
                <td className="py-2">The dot product multiplies matching components and adds the results.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">Its output is a scalar, not a vector.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">Geometrically, the dot product measures alignment through lengths and the cosine of the angle.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">Positive, zero, and negative dot products correspond to acute, right, and obtuse angles.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">A zero dot product is the quick test for perpendicular, or orthogonal, vectors.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">This sets up the next topic: finding the angle between vectors.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </ArticleLayout>
  );
}
