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
  title: "Span of Vectors",
  description:
    "Learn span as the full set of vectors you can build from linear combinations, and see why one direction gives a line while two independent directions can give a plane.",
};

export default function SpanOfVectorsPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "intro", label: "Introduction" },
    { id: "why", label: "Why this topic comes next", level: 2 },
    { id: "meaning", label: "What span means" },
    { id: "one-vector", label: "Span of one vector" },
    { id: "two-vectors", label: "Span of two vectors" },
    { id: "examples", label: "Worked examples" },
    { id: "example-line", label: "Example 1: one-vector span", level: 2 },
    { id: "example-plane", label: "Example 2: two non-parallel vectors", level: 2 },
    { id: "example-dependent", label: "Example 3: dependent directions", level: 2 },
    { id: "example-3d", label: "Example 4: a 3D span check", level: 2 },
    { id: "checks", label: "Checks and common mistakes" },
    { id: "bridge", label: "What comes next" },
    { id: "summary", label: "Summary" },
  ];

  return (
    <ArticleLayout
      eyebrow="Mathematics - Linear Algebra - Vectors"
      title="Span of vectors"
      description="The previous lesson focused on one recipe at a time. This lesson asks the larger question: if you are allowed every possible linear combination of some vectors, what whole set of outputs can you reach?"
      descriptionClassName="!max-w-none"
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Linear Algebra phases", links: linearAlgebraPhases },
            { title: "Within this phase", links: linearAlgebraVectorLessons },
          ]}
          activeHref="/mathematics/linear-algebra/vectors-and-geometric-intuition/span-of-vectors"
        />
      }
    >
      <InfoPanel id="intro" title="Introduction" variant="intro">
        <p>
          A <span className="text-white font-semibold">linear combination</span>{" "}
          gives one particular output. A <span className="text-white font-semibold">span</span>{" "}
          collects <span className="text-white font-semibold">all</span> the outputs
          you can get from those same ingredients.
        </p>
        <p>
          So span is really a reachability question:
          <span className="text-white font-semibold">
            {" "}what vectors can these directions build if the coefficients are allowed to vary freely?
          </span>
        </p>
        <p>Here is the roadmap for this lesson:</p>
        <div className="ml-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">What span means</td>
                <td className="py-2">How to read span as the full set of all linear combinations of some vectors.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Span of one vector</td>
                <td className="py-2">Why all multiples of one nonzero vector lie on a line through the origin.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Span of two vectors</td>
                <td className="py-2">Why two non-parallel directions in the plane can fill the whole plane, while parallel ones still only give a line.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Worked examples</td>
                <td className="py-2">How to decide whether a target vector lies in a span and how to solve for the needed coefficients.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Checks and common mistakes</td>
                <td className="py-2">How to remember that span is a set, why it always contains the zero vector, and why it always passes through the origin.</td>
              </tr>
              <tr>
                <td className="w-56 py-2 pr-4 font-semibold text-white">What comes next</td>
                <td className="py-2">How span leads naturally into lines and planes written as vector sets.</td>
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
          The last page focused on expressions like{" "}
          <MathInline
            tex={String.raw`2{\color{#f472b6}\mathbf{u}}+{\color{#22d3ee}\mathbf{v}}`}
            className="math-inline math-white"
          />
          . That is one recipe.
        </p>
        <p>
          Span asks the bigger question: what if the coefficients are not fixed
          at <MathInline tex={String.raw`2`} className="math-inline math-white" />{" "}
          and <MathInline tex={String.raw`1`} className="math-inline math-white" />, but can be{" "}
          <span className="text-white font-semibold">any real numbers</span>?
        </p>
        <MathBlock
          tex={String.raw`\operatorname{span}\{{\color{#f472b6}\mathbf{u}},{\color{#22d3ee}\mathbf{v}}\}
=\left\{
a{\color{#f472b6}\mathbf{u}}+b{\color{#22d3ee}\mathbf{v}}
:\;
a,b\in\mathbb{R}
\right\}`}
          className="math-center math-lg text-white/90"
        />
        <p>
          So linear combinations give the{" "}
          <span className="text-white font-semibold">individual outputs</span>,
          while span gives the{" "}
          <span className="text-white font-semibold">whole collection of outputs</span>.
        </p>
      </InfoPanel>

      <section id="meaning" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          What span means
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The span of some vectors is the{" "}
          <span className="text-white font-semibold">set of all linear combinations</span>{" "}
          of those vectors.
        </p>
        <MathBlock
          tex={String.raw`\operatorname{span}\{{\color{#f472b6}\mathbf{u}},{\color{#22d3ee}\mathbf{v}}\}
=\left\{
a{\color{#f472b6}\mathbf{u}}+b{\color{#22d3ee}\mathbf{v}}
:\;
a,b\in\mathbb{R}
\right\}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Read the braces as{" "}
          <span className="text-white font-semibold">the collection of all vectors of this form</span>.
          The colon means “such that,” and{" "}
          <MathInline tex={String.raw`\mathbb{R}`} className="math-inline math-white" />{" "}
          means the coefficients can be any real numbers.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          A helpful everyday picture is this:
          <span className="text-white font-semibold">
            {" "}one linear combination is one recipe, but span is the whole menu
          </span>
          you can make from those same ingredients.
        </p>
      </section>

      <section id="one-vector" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Span of one vector
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          If you only have one nonzero vector{" "}
          <MathInline
            tex={String.raw`{\color{#f472b6}\mathbf{u}}`}
            className="math-inline math-white"
          />
          , then
        </p>
        <MathBlock
          tex={String.raw`\operatorname{span}\{{\color{#f472b6}\mathbf{u}}\}
=\left\{
a{\color{#f472b6}\mathbf{u}}
:\;
a\in\mathbb{R}
\right\}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Varying the coefficient{" "}
          <MathInline tex={String.raw`a`} className="math-inline math-white" />{" "}
          only changes the <span className="text-white font-semibold">length</span>{" "}
          and possibly the <span className="text-white font-semibold">sign</span>.
          It does not create a new direction.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          That means the span of one nonzero vector is a{" "}
          <span className="text-white font-semibold">line through the origin</span>.
        </p>
        <AlgebraStaticVisual
          variant="span-one-vector"
          framed={false}
          caption="All multiples of one nonzero vector stay on the same line. Positive coefficients go one way, negative coefficients go the other way."
        />
      </section>

      <section id="two-vectors" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Span of two vectors
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          In the plane, two vectors can behave in two very different ways.
        </p>
        <div className="ml-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Non-parallel vectors</td>
                <td className="py-2">They provide two genuinely different directions, so their span is the whole plane.</td>
              </tr>
              <tr>
                <td className="w-56 py-2 pr-4 font-semibold text-white">Parallel or dependent vectors</td>
                <td className="py-2">They do not add a new direction, so their span is still only a line.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This matches ordinary movement intuition. If you are stuck on one rail,
          you can move only along that rail. If you have two genuinely different
          movement directions on a flat surface, you can reach the whole surface.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          There is also a useful dot-product test here. Two nonzero vectors are
          parallel exactly when the angle between them is{" "}
          <span className="text-white font-semibold">0° or 180°</span>. Using the
          dot-product formula, that means
        </p>
        <MathBlock
          tex={String.raw`\left|{\color{#f472b6}\mathbf{u}}\cdot{\color{#22d3ee}\mathbf{v}}\right|
=\|{\color{#f472b6}\mathbf{u}}\|\,\|{\color{#22d3ee}\mathbf{v}}\|`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          So the dot product does help detect parallel directions, but the full
          test uses the{" "}
          <span className="text-white font-semibold">magnitudes as well</span>.
          A positive or negative dot product by itself does not automatically mean
          the vectors are parallel.
        </p>
        <AlgebraStaticVisual
          variant="span-two-vectors"
          framed={false}
          caption="Two non-parallel vectors in the plane can build sample outputs all across the plane. As the coefficients vary continuously, the whole plane becomes reachable."
        />
        <AlgebraStaticVisual
          variant="span-dependent-vectors"
          framed={false}
          caption="If the second vector is just another copy of the same direction, you still only get a line. Off-line targets are not in the span."
        />
      </section>

      <section id="examples" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Worked examples
        </h2>

        <h3 id="example-line" className="scroll-mt-28 text-xl font-semibold text-white font-[var(--font-display)]">
          Example 1: one-vector span
        </h3>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Let{" "}
          <MathInline
            tex={String.raw`{\color{#f472b6}\mathbf{u}}=(2,1)`}
            className="math-inline math-white"
          />
          . Is{" "}
          <MathInline tex={String.raw`(6,3)`} className="math-inline math-white" />{" "}
          in <MathInline
            tex={String.raw`\operatorname{span}\{{\color{#f472b6}\mathbf{u}}\}`}
            className="math-inline math-white"
          />
          ?
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We need some coefficient{" "}
          <MathInline tex={String.raw`a`} className="math-inline math-white" />{" "}
          such that
        </p>
        <MathBlock
          tex={String.raw`a\begin{bmatrix}2\\[2pt]1\end{bmatrix}
=\begin{bmatrix}6\\[2pt]3\end{bmatrix}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Read the top row and bottom row as the two component equations. Start
          with the top row:
        </p>
        <MathBlock
          tex={String.raw`\begin{aligned}
2a&=6 \\[4pt]
a&=3
\end{aligned}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Now check the bottom row:
        </p>
        <MathBlock
          tex={String.raw`1\cdot 3=3`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          It works, so
        </p>
        <MathBlock
          tex={String.raw`(6,3)=3(2,1)`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Therefore{" "}
          <MathInline tex={String.raw`(6,3)`} className="math-inline math-white" />{" "}
          is in the span. This is exactly what “same line through the origin”
          means in algebraic form.
        </p>

        <h3 id="example-plane" className="scroll-mt-28 text-xl font-semibold text-white font-[var(--font-display)]">
          Example 2: two non-parallel vectors
        </h3>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Let{" "}
          <MathInline
            tex={String.raw`{\color{#f472b6}\mathbf{u}}=(1,1)`}
            className="math-inline math-white"
          />{" "}
          and{" "}
          <MathInline
            tex={String.raw`{\color{#22d3ee}\mathbf{v}}=(1,-1)`}
            className="math-inline math-white"
          />
          . Show that{" "}
          <MathInline tex={String.raw`(4,2)`} className="math-inline math-white" />{" "}
          lies in their span.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We look for coefficients{" "}
          <MathInline tex={String.raw`a`} className="math-inline math-white" />{" "}
          and{" "}
          <MathInline tex={String.raw`b`} className="math-inline math-white" />{" "}
          such that
        </p>
        <MathBlock
          tex={String.raw`a\begin{bmatrix}1\\[2pt]1\end{bmatrix}
+b\begin{bmatrix}1\\[2pt]-1\end{bmatrix}
=\begin{bmatrix}4\\[2pt]2\end{bmatrix}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Read the top and bottom rows as simultaneous equations:
        </p>
        <MathBlock
          tex={String.raw`\begin{aligned}
a+b&=4 \\[4pt]
a-b&=2
\end{aligned}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Add them:
        </p>
        <MathBlock
          tex={String.raw`\begin{aligned}
2a&=6 \\[4pt]
a&=3
\end{aligned}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Then solve for{" "}
          <MathInline tex={String.raw`b`} className="math-inline math-white" />:
        </p>
        <MathBlock
          tex={String.raw`\begin{aligned}
3+b&=4 \\[4pt]
b&=1
\end{aligned}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          So
        </p>
        <MathBlock
          tex={String.raw`(4,2)=3{\color{#f472b6}\mathbf{u}}+{\color{#22d3ee}\mathbf{v}}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          That proves the target vector lies in the span. In fact, because these
          two vectors are not parallel, this kind of solving works for every
          target in the plane.
        </p>

        <h3 id="example-dependent" className="scroll-mt-28 text-xl font-semibold text-white font-[var(--font-display)]">
          Example 3: dependent directions
        </h3>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Let{" "}
          <MathInline
            tex={String.raw`{\color{#f472b6}\mathbf{u}}=(2,1)`}
            className="math-inline math-white"
          />{" "}
          and{" "}
          <MathInline
            tex={String.raw`{\color{#22d3ee}\mathbf{v}}=(4,2)`}
            className="math-inline math-white"
          />
          . Is{" "}
          <MathInline tex={String.raw`(1,0)`} className="math-inline math-white" />{" "}
          in their span?
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          First notice something important:
        </p>
        <MathBlock
          tex={String.raw`{\color{#22d3ee}\mathbf{v}}=2{\color{#f472b6}\mathbf{u}}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          So the second vector does not add a new direction. Any linear
          combination becomes
        </p>
        <MathBlock
          tex={String.raw`\begin{aligned}
a{\color{#f472b6}\mathbf{u}}+b{\color{#22d3ee}\mathbf{v}}
&=a(2,1)+b(4,2) \\[4pt]
&=(2a+4b,\;a+2b)
\end{aligned}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          If we let{" "}
          <MathInline tex={String.raw`c=a+2b`} className="math-inline math-white" />{" "}
          then every span vector has the form
        </p>
        <MathBlock
          tex={String.raw`(2c,c)`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          So every point in the span must satisfy{" "}
          <MathInline tex={String.raw`x=2y`} className="math-inline math-white" />.
          But for{" "}
          <MathInline tex={String.raw`(1,0)`} className="math-inline math-white" />{" "}
          we would need{" "}
          <MathInline tex={String.raw`1=2\cdot 0`} className="math-inline math-white" />,
          which is false.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Therefore{" "}
          <MathInline tex={String.raw`(1,0)`} className="math-inline math-white" />{" "}
          is <span className="text-white font-semibold">not</span> in the span.
          Two vectors do not automatically span the plane. They must provide two
          genuinely different directions.
        </p>

        <h3 id="example-3d" className="scroll-mt-28 text-xl font-semibold text-white font-[var(--font-display)]">
          Example 4: a 3D span check
        </h3>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Span is not only a 2D idea. Let{" "}
          <MathInline
            tex={String.raw`{\color{#f472b6}\mathbf{u}}=(1,0,1)`}
            className="math-inline math-white"
          />{" "}
          and{" "}
          <MathInline
            tex={String.raw`{\color{#22d3ee}\mathbf{v}}=(0,1,1)`}
            className="math-inline math-white"
          />.
          Check whether{" "}
          <MathInline tex={String.raw`(3,2,5)`} className="math-inline math-white" />{" "}
          lies in their span.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We need coefficients{" "}
          <MathInline tex={String.raw`a`} className="math-inline math-white" />{" "}
          and{" "}
          <MathInline tex={String.raw`b`} className="math-inline math-white" />{" "}
          such that
        </p>
        <MathBlock
          tex={String.raw`a\begin{bmatrix}1\\[2pt]0\\[2pt]1\end{bmatrix}
+b\begin{bmatrix}0\\[2pt]1\\[2pt]1\end{bmatrix}
=\begin{bmatrix}3\\[2pt]2\\[2pt]5\end{bmatrix}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Read off the rows one by one:
        </p>
        <MathBlock
          tex={String.raw`\begin{aligned}
a&=3 \\[4pt]
b&=2
\end{aligned}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Now check the third row:
        </p>
        <MathBlock
          tex={String.raw`a+b=3+2=5`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          It works, so
        </p>
        <MathBlock
          tex={String.raw`(3,2,5)=3{\color{#f472b6}\mathbf{u}}+2{\color{#22d3ee}\mathbf{v}}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This is a useful reminder: in 3D, the span of two independent vectors
          is usually a <span className="text-white font-semibold">plane inside 3D space</span>,
          not the whole of 3D.
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
                <td className="w-52 py-2 pr-4 font-semibold text-white">Span is a set</td>
                <td className="py-2">It is not one vector. It is the whole collection of vectors obtainable from the allowed linear combinations.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-52 py-2 pr-4 font-semibold text-white">Span always contains zero</td>
                <td className="py-2">Set every coefficient to zero and you get the zero vector immediately.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-52 py-2 pr-4 font-semibold text-white">Span passes through the origin</td>
                <td className="py-2">Because the zero vector is always included, spans in these beginner geometric cases pass through the origin.</td>
              </tr>
              <tr>
                <td className="w-52 py-2 pr-4 font-semibold text-white">More vectors does not always mean more span</td>
                <td className="py-2">If the new vector is just a multiple of an old one, it does not add a new direction.</td>
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
          Span is the first place where vector geometry starts turning into{" "}
          <span className="text-white font-semibold">sets of vectors</span>.
        </p>
        <MathBlock
          tex={String.raw`\left\{
a{\color{#f472b6}\mathbf{u}}+b{\color{#22d3ee}\mathbf{v}}
:\;
a,b\in\mathbb{R}
\right\}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The next lesson leans into that fully. Instead of seeing lines and
          planes as just pictures, we will describe them directly as{" "}
          <span className="text-white font-semibold">sets built from vectors</span>.
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
                <td className="py-2">The span of some vectors is the set of all linear combinations of those vectors.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">The span of one nonzero vector is a line through the origin.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">In the plane, two non-parallel vectors span the whole plane.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">Parallel or dependent vectors do not create a new direction, so their span can still be just a line.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">A vector lies in a span exactly when you can solve for coefficients that build it.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">This topic leads directly into lines and planes written as vector sets.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </ArticleLayout>
  );
}
