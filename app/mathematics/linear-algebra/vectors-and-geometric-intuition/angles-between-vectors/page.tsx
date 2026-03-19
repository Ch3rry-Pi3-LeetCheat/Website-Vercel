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
  title: "Angles Between Vectors",
  description:
    "Use the dot product and magnitudes to solve for the actual angle between two nonzero vectors, with beginner-friendly examples and geometry.",
};

export default function AnglesBetweenVectorsPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "intro", label: "Introduction" },
    { id: "why", label: "Why this topic comes next", level: 2 },
    { id: "formula", label: "Angle formula from the dot product" },
    { id: "solving", label: "How to solve for the angle" },
    { id: "unit", label: "Unit-vector shortcut" },
    { id: "examples", label: "Worked examples" },
    { id: "example-right", label: "Example 1: a right angle", level: 2 },
    { id: "example-acute", label: "Example 2: an acute angle", level: 2 },
    { id: "example-obtuse", label: "Example 3: an obtuse angle", level: 2 },
    { id: "example-approx", label: "Example 4: an approximate angle", level: 2 },
    { id: "checks", label: "Checks and special cases" },
    { id: "why-matters", label: "Why it matters" },
    { id: "bridge", label: "What comes next" },
    { id: "summary", label: "Summary" },
  ];

  return (
    <ArticleLayout
      eyebrow="Mathematics - Linear Algebra - Vectors"
      title="Angles between vectors"
      description="The previous lesson explained what the dot product means geometrically. This lesson pushes that one step further: instead of only saying two vectors are aligned, perpendicular, or opposed, it shows how to compute the actual angle between them."
      descriptionClassName="!max-w-none"
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Linear Algebra phases", links: linearAlgebraPhases },
            { title: "Within this phase", links: linearAlgebraVectorLessons },
          ]}
          activeHref="/mathematics/linear-algebra/vectors-and-geometric-intuition/angles-between-vectors"
        />
      }
    >
      <InfoPanel id="intro" title="Introduction" variant="intro">
        <p>
          The previous lesson stopped just before the most natural next question.
          Once a dot product tells you that two vectors point somewhat together,
          or are perpendicular, or point partly against each other, you want to
          know <span className="text-white font-semibold">the actual angle</span>.
        </p>
        <p>
          This lesson shows how the dot product and magnitudes combine to answer
          that question. The key idea is that the dot product does not only tell
          you the sign of the angle relation. It also contains enough
          information to recover the angle itself.
        </p>
        <p>Here is the roadmap for this lesson:</p>
        <div className="ml-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Angle formula from the dot product</td>
                <td className="py-2">How to solve the geometric dot-product formula for the cosine of the angle.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">How to solve for the angle</td>
                <td className="py-2">How to turn a dot product and two magnitudes into an actual angle step by step.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Unit-vector shortcut</td>
                <td className="py-2">How the formula simplifies when one or both vectors already have length 1.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Worked examples</td>
                <td className="py-2">How to compute exact and approximate angles in several beginner-friendly cases.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Checks and special cases</td>
                <td className="py-2">How to sanity-check answers and what to do when the dot product is positive, zero, or negative.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Why it matters</td>
                <td className="py-2">Why turning alignment into an actual angle is useful for geometry, orthogonality, and later applications.</td>
              </tr>
              <tr>
                <td className="w-56 py-2 pr-4 font-semibold text-white">What comes next</td>
                <td className="py-2">How angle information leads directly into projections of one vector onto another.</td>
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
          The previous page already gave the crucial geometric identity:
        </p>
        <MathBlock
          tex={String.raw`{\color{#f472b6}\mathbf{u}}\cdot{\color{#22d3ee}\mathbf{v}}=\|{\color{#f472b6}\mathbf{u}}\|\,\|{\color{#22d3ee}\mathbf{v}}\|\cos\theta`}
          className="math-center math-lg text-white/90"
        />
        <p>
          That formula says the dot product knows about the angle{" "}
          <MathInline tex={String.raw`\theta`} className="math-inline math-white" />.
          So this lesson is not introducing a disconnected idea. It is simply
          solving that existing relationship for the angle itself.
        </p>
      </InfoPanel>

      <section id="formula" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Angle formula from the dot product
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Start with the geometric form of the dot product:
        </p>
        <MathBlock
          tex={String.raw`{\color{#f472b6}\mathbf{u}}\cdot{\color{#22d3ee}\mathbf{v}}=\|{\color{#f472b6}\mathbf{u}}\|\,\|{\color{#22d3ee}\mathbf{v}}\|\cos\theta`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          If both vectors are nonzero, divide by{" "}
          <MathInline
            tex={String.raw`\|{\color{#f472b6}\mathbf{u}}\|\,\|{\color{#22d3ee}\mathbf{v}}\|`}
            className="math-inline math-white"
          />{" "}
          to isolate the cosine:
        </p>
        <MathBlock
          tex={String.raw`\cos\theta=\frac{{\color{#f472b6}\mathbf{u}}\cdot{\color{#22d3ee}\mathbf{v}}}{\|{\color{#f472b6}\mathbf{u}}\|\,\|{\color{#22d3ee}\mathbf{v}}\|}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This is the central formula for the page. The numerator tells you
          about alignment, while the denominator removes the raw effect of the
          vectors&apos; lengths. What remains is a pure angle comparison.
        </p>
        <AlgebraStaticVisual
          variant="angle-between-vectors"
          framed={false}
          caption="The angle between two vectors is read at the shared tail. The dot product and the two lengths together determine this angle."
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          One warning matters immediately: this formula only works for{" "}
          <span className="text-white font-semibold">nonzero vectors</span>. The
          zero vector has no direction, so talking about its angle with another
          vector does not make geometric sense.
        </p>
      </section>

      <section id="solving" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          How to solve for the angle
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Once you know{" "}
          <MathInline
            tex={String.raw`\cos\theta`}
            className="math-inline math-white"
          />
          , one more step gives the angle itself:
        </p>
        <MathBlock
          tex={String.raw`\theta=\cos^{-1}\!\left(\frac{{\color{#f472b6}\mathbf{u}}\cdot{\color{#22d3ee}\mathbf{v}}}{\|{\color{#f472b6}\mathbf{u}}\|\,\|{\color{#22d3ee}\mathbf{v}}\|}\right)`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          In practice, there is a reliable step-by-step routine:
        </p>
        <ol className="ml-6 list-decimal pl-5 grid gap-3 text-base leading-7 text-[color:var(--color-muted)]">
          <li>Compute the dot product.</li>
          <li>Compute the magnitude of each vector.</li>
          <li>Divide the dot product by the product of the magnitudes to get <MathInline tex={String.raw`\cos\theta`} className="math-inline math-white" />.</li>
          <li>Use inverse cosine to get <MathInline tex={String.raw`\theta`} className="math-inline math-white" />.</li>
        </ol>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Sometimes the cosine value is a familiar exact number such as{" "}
          <MathInline tex={String.raw`0`} className="math-inline math-white" />,{" "}
          <MathInline tex={String.raw`\tfrac{1}{2}`} className="math-inline math-white" />, or{" "}
          <MathInline tex={String.raw`\tfrac{\sqrt{2}}{2}`} className="math-inline math-white" />.
          In other cases you will use a calculator and get an approximate angle.
        </p>
      </section>

      <section id="unit" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Unit-vector shortcut
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Unit vectors make the angle formula much cleaner. If both vectors have
          length 1, then:
        </p>
        <MathBlock
          tex={String.raw`\|{\color{#f472b6}\mathbf{u}}\|=1,\qquad \|{\color{#22d3ee}\mathbf{v}}\|=1\qquad\Longrightarrow\qquad {\color{#f472b6}\mathbf{u}}\cdot{\color{#22d3ee}\mathbf{v}}=\cos\theta`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          So when both vectors are already normalized, the dot product is not
          just related to the angle. It is the cosine of the angle.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Even if only one vector is a unit vector, the formula still simplifies
          a lot because one magnitude disappears from the denominator. This is
          one reason normalization becomes so useful later.
        </p>
      </section>

      <section id="examples" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Worked examples
        </h2>

        <h3 id="example-right" className="scroll-mt-28 text-xl font-semibold text-white font-[var(--font-display)]">
          Example 1: a right angle
        </h3>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Let{" "}
          <MathInline tex={String.raw`{\color{#f472b6}\mathbf{u}}=(2,1)`} className="math-inline math-white" />{" "}
          and{" "}
          <MathInline tex={String.raw`{\color{#22d3ee}\mathbf{v}}=(1,-2)`} className="math-inline math-white" />.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          First compute the dot product:
        </p>
        <MathBlock
          tex={String.raw`\begin{aligned}
{\color{#f472b6}\mathbf{u}}\cdot{\color{#22d3ee}\mathbf{v}}
&=2\cdot1\mathbin{\color{white}{+}}1\cdot(-2) \\
&=0
\end{aligned}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Now compute each magnitude separately:
        </p>
        <MathBlock
          tex={String.raw`\|{\color{#f472b6}\mathbf{u}}\|=\sqrt{2^{2}+1^{2}}=\sqrt{5}`}
          className="math-center math-lg text-white/90"
        />
        <MathBlock
          tex={String.raw`\|{\color{#22d3ee}\mathbf{v}}\|=\sqrt{1^{2}+(-2)^{2}}=\sqrt{5}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Put those results into the cosine formula:
        </p>
        <MathBlock
          tex={String.raw`\cos\theta=\frac{0}{\sqrt{5}\sqrt{5}}=0`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Finally, convert that cosine value into an angle:
        </p>
        <MathBlock
          tex={String.raw`\theta=90^\circ`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This matches the previous lesson: zero dot product means a right angle.
        </p>
        <AlgebraStaticVisual
          variant="angle-example-right"
          framed={false}
          caption="With faint axes in the background, you can see the two vectors meeting at a right angle even before finishing the algebra."
        />

        <h3 id="example-acute" className="scroll-mt-28 text-xl font-semibold text-white font-[var(--font-display)]">
          Example 2: an acute angle
        </h3>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Let{" "}
          <MathInline tex={String.raw`{\color{#f472b6}\mathbf{u}}=(2,1)`} className="math-inline math-white" />{" "}
          and{" "}
          <MathInline tex={String.raw`{\color{#22d3ee}\mathbf{v}}=(1,2)`} className="math-inline math-white" />.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Start with the dot product:
        </p>
        <MathBlock
          tex={String.raw`\begin{aligned}
{\color{#f472b6}\mathbf{u}}\cdot{\color{#22d3ee}\mathbf{v}}
&=2\cdot1\mathbin{\color{white}{+}}1\cdot2 \\
&=4
\end{aligned}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Next find the magnitudes:
        </p>
        <MathBlock
          tex={String.raw`\|{\color{#f472b6}\mathbf{u}}\|=\sqrt{2^{2}+1^{2}}=\sqrt{5}`}
          className="math-center math-lg text-white/90"
        />
        <MathBlock
          tex={String.raw`\|{\color{#22d3ee}\mathbf{v}}\|=\sqrt{1^{2}+2^{2}}=\sqrt{5}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Substitute those into the formula for{" "}
          <MathInline tex={String.raw`\cos\theta`} className="math-inline math-white" />:
        </p>
        <MathBlock
          tex={String.raw`\cos\theta=\frac{4}{\sqrt{5}\cdot\sqrt{5}}=\frac{4}{5}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          That cosine value corresponds to:
        </p>
        <MathBlock
          tex={String.raw`\theta\approx36.87^\circ`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The positive cosine tells you the angle is acute, and the value{" "}
          <MathInline tex={String.raw`\frac{4}{5}`} className="math-inline math-white" />{" "}
          shows the two vectors point fairly strongly in the same direction.
        </p>
        <AlgebraStaticVisual
          variant="angle-example-acute"
          framed={false}
          caption="Both vectors tilt upward and to the right, but not by the same amount, so the angle between them is clearly acute without either vector lying on an axis."
        />

        <h3 id="example-obtuse" className="scroll-mt-28 text-xl font-semibold text-white font-[var(--font-display)]">
          Example 3: an obtuse angle
        </h3>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Now take{" "}
          <MathInline tex={String.raw`{\color{#f472b6}\mathbf{u}}=(1,2)`} className="math-inline math-white" />{" "}
          and{" "}
          <MathInline tex={String.raw`{\color{#22d3ee}\mathbf{v}}=(1,-2)`} className="math-inline math-white" />.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          First compute the dot product:
        </p>
        <MathBlock
          tex={String.raw`\begin{aligned}
{\color{#f472b6}\mathbf{u}}\cdot{\color{#22d3ee}\mathbf{v}}
&=1\cdot1\mathbin{\color{white}{+}}2\cdot(-2) \\
&=-3
\end{aligned}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Now compute the magnitudes:
        </p>
        <MathBlock
          tex={String.raw`\|{\color{#f472b6}\mathbf{u}}\|=\sqrt{1^{2}+2^{2}}=\sqrt{5}`}
          className="math-center math-lg text-white/90"
        />
        <MathBlock
          tex={String.raw`\|{\color{#22d3ee}\mathbf{v}}\|=\sqrt{1^{2}+(-2)^{2}}=\sqrt{5}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Substitute into the cosine formula:
        </p>
        <MathBlock
          tex={String.raw`\cos\theta=\frac{-3}{\sqrt{5}\cdot\sqrt{5}}=-\frac{3}{5}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Then solve for the angle:
        </p>
        <MathBlock
          tex={String.raw`\theta\approx126.87^\circ`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The negative cosine shows immediately that the angle must be obtuse,
          because the vectors point partly against each other.
        </p>
        <AlgebraStaticVisual
          variant="angle-example-obtuse"
          framed={false}
          caption="The pink vector leans upward while the blue vector leans downward, both off the axes, so their opening is naturally wider than 90 degrees."
        />

        <h3 id="example-approx" className="scroll-mt-28 text-xl font-semibold text-white font-[var(--font-display)]">
          Example 4: an approximate angle
        </h3>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Reuse the familiar pair{" "}
          <MathInline tex={String.raw`{\color{#f472b6}\mathbf{u}}=(4,0)`} className="math-inline math-white" />{" "}
          and{" "}
          <MathInline tex={String.raw`{\color{#22d3ee}\mathbf{v}}=(3,4)`} className="math-inline math-white" />.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          First collect the quantities you need:
        </p>
        <MathBlock
          tex={String.raw`{\color{#f472b6}\mathbf{u}}\cdot{\color{#22d3ee}\mathbf{v}}=12`}
          className="math-center math-lg text-white/90"
        />
        <MathBlock
          tex={String.raw`\|{\color{#f472b6}\mathbf{u}}\|=4,\qquad \|{\color{#22d3ee}\mathbf{v}}\|=5`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Now compute the cosine:
        </p>
        <MathBlock
          tex={String.raw`\cos\theta=\frac{12}{4\cdot5}=\frac{3}{5}=0.6`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Finally, use inverse cosine:
        </p>
        <MathBlock
          tex={String.raw`\theta=\cos^{-1}(0.6)\approx 53.13^\circ`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This is a good reminder that not every angle comes out as a neat exact
          value. Sometimes the correct final answer is an approximation.
        </p>
        <AlgebraStaticVisual
          variant="angle-example-approx"
          framed={false}
          caption="This example is still easy to picture on axes, but the angle is not a special exact one, so the final answer is approximate."
        />
      </section>

      <section id="checks" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Checks and special cases
        </h2>
        <div className="ml-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr>
                <td className="w-48 py-2 pr-4 font-semibold text-white">Dot product sign</td>
                <td className="py-2 font-semibold text-white">What it means for the angle</td>
              </tr>
              <tr>
                <td className="py-2 text-white">
                  <MathInline tex={String.raw`{\color{#f472b6}\mathbf{u}}\cdot{\color{#22d3ee}\mathbf{v}}>0`} className="math-inline math-white" />
                </td>
                <td className="py-2">The angle is acute, so it is less than 90 degrees.</td>
              </tr>
              <tr>
                <td className="py-2 text-white">
                  <MathInline tex={String.raw`{\color{#f472b6}\mathbf{u}}\cdot{\color{#22d3ee}\mathbf{v}}=0`} className="math-inline math-white" />
                </td>
                <td className="py-2">The vectors are perpendicular, so the angle is 90 degrees.</td>
              </tr>
              <tr>
                <td className="py-2 text-white">
                  <MathInline tex={String.raw`{\color{#f472b6}\mathbf{u}}\cdot{\color{#22d3ee}\mathbf{v}}<0`} className="math-inline math-white" />
                </td>
                <td className="py-2">The angle is obtuse, so it is greater than 90 degrees.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Another useful check is numerical: the quantity you feed into{" "}
          <MathInline tex={String.raw`\cos^{-1}`} className="math-inline math-white" />{" "}
          should always lie between{" "}
          <MathInline tex={String.raw`-1`} className="math-inline math-white" />{" "}
          and{" "}
          <MathInline tex={String.raw`1`} className="math-inline math-white" />.
          If you get something outside that interval, there is an arithmetic mistake somewhere.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          And one more time: if either vector is the zero vector, the angle
          formula is undefined because there is no direction to compare.
        </p>
      </section>

      <section id="why-matters" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Why it matters
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Computing an angle is more informative than merely saying positive,
          zero, or negative. It turns a vague directional comparison into a
          precise geometric measurement.
        </p>
        <div className="ml-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr>
                <td className="w-56 py-2 pr-4 font-semibold text-white">Geometry</td>
                <td className="py-2">It tells you exactly how far apart two directions are.</td>
              </tr>
              <tr>
                <td className="w-56 py-2 pr-4 font-semibold text-white">Orthogonality</td>
                <td className="py-2">It makes the special 90-degree case feel concrete instead of symbolic.</td>
              </tr>
              <tr>
                <td className="w-56 py-2 pr-4 font-semibold text-white">Later applications</td>
                <td className="py-2">It prepares you for projections, cosine similarity, and later geometric reasoning in machine learning and data work.</td>
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
          Once you can compute the angle, the next natural question is not just
          how far apart two vectors point. It is how to turn one vector into the
          actual{" "}
          <span className="text-white font-semibold">part of another vector that lies in a chosen direction</span>.
        </p>
        <MathBlock
          tex={String.raw`\operatorname{proj}_{{\color{#f472b6}\mathbf{u}}}({\color{#22d3ee}\mathbf{v}})=\frac{{\color{#22d3ee}\mathbf{v}}\cdot{\color{#f472b6}\mathbf{u}}}{\|{\color{#f472b6}\mathbf{u}}\|^{2}}\,{\color{#f472b6}\mathbf{u}}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          That is the handoff into projections: not just an angle or a scalar
          comparison, but a new vector built from directional overlap.
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
                <td className="py-2">The angle formula comes from solving the geometric dot-product identity for <MathInline tex={String.raw`\cos\theta`} className="math-inline math-white" />.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">For nonzero vectors, <MathInline tex={String.raw`\theta=\cos^{-1}\!\left(\frac{{\color{#f472b6}\mathbf{u}}\cdot{\color{#22d3ee}\mathbf{v}}}{\|{\color{#f472b6}\mathbf{u}}\|\,\|{\color{#22d3ee}\mathbf{v}}\|}\right)`} className="math-inline math-white" />.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">If both vectors are unit vectors, the dot product equals the cosine of the angle directly.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">Positive, zero, and negative dot products correspond to acute, right, and obtuse angles.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">This topic leads directly into projections of one vector onto another.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </ArticleLayout>
  );
}
