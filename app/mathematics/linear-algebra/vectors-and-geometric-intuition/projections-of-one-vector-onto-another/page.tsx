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
  title: "Projections of One Vector onto Another",
  description:
    "Learn how projections extract the part of one vector that lies along another direction, as both a signed amount and a new vector.",
};

export default function ProjectionsOfOneVectorOntoAnotherPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "intro", label: "Introduction" },
    { id: "why", label: "Why this topic comes next", level: 2 },
    { id: "meaning", label: "What a projection means" },
    { id: "formulas", label: "Scalar projection and vector projection" },
    { id: "examples", label: "Worked examples" },
    { id: "example-horizontal", label: "Example 1: progress in a hallway", level: 2 },
    { id: "example-slanted", label: "Example 2: projection onto a slanted direction", level: 2 },
    { id: "example-negative", label: "Example 3: a backward projection", level: 2 },
    { id: "why-matters", label: "Everyday intuition and why it matters" },
    { id: "checks", label: "Checks and special cases" },
    { id: "bridge", label: "What comes next" },
    { id: "summary", label: "Summary" },
  ];

  return (
    <ArticleLayout
      eyebrow="Mathematics - Linear Algebra - Vectors"
      title="Projections of one vector onto another"
      description="The previous lesson turned the dot product into an angle. This lesson takes the next natural step: it uses that same directional information to pull out the part of one vector that actually lies along another direction."
      descriptionClassName="!max-w-none"
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Linear Algebra phases", links: linearAlgebraPhases },
            { title: "Within this phase", links: linearAlgebraVectorLessons },
          ]}
          activeHref="/mathematics/linear-algebra/vectors-and-geometric-intuition/projections-of-one-vector-onto-another"
        />
      }
    >
      <InfoPanel id="intro" title="Introduction" variant="intro">
        <p>
          Once you know how far apart two vectors point, the next question is
          even more useful: if you care about one{" "}
          <span className="text-white font-semibold">chosen direction</span>,
          how much of another vector actually goes that way?
        </p>
        <p>
          That is what a{" "}
          <span className="text-white font-semibold">projection</span> answers.
          It extracts the part of one vector that lies along another direction.
          Sometimes you only want the signed amount. Sometimes you want the full
          projected vector.
        </p>
        <p>Here is the roadmap for this lesson:</p>
        <div className="ml-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">What a projection means</td>
                <td className="py-2">How to picture a projection as directional progress, a signed shadow, or the useful part of a vector.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Scalar projection and vector projection</td>
                <td className="py-2">How to distinguish the signed amount from the actual projected arrow, and how both formulas come from the dot product.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Worked examples</td>
                <td className="py-2">How to compute projections step by step in horizontal, slanted, and backward cases.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Everyday intuition and why it matters</td>
                <td className="py-2">How hallway progress, shadows, and useful force all ask the same projection question.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Checks and special cases</td>
                <td className="py-2">How signs, unit vectors, and perpendicular leftovers help you sanity-check the result.</td>
              </tr>
              <tr>
                <td className="w-56 py-2 pr-4 font-semibold text-white">What comes next</td>
                <td className="py-2">How projections already hint at building vectors by scaling and adding directions, which leads straight into linear combinations.</td>
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
          The previous page produced the angle formula:
        </p>
        <MathBlock
          tex={String.raw`\cos\theta=\frac{{\color{#22d3ee}\mathbf{v}}\cdot{\color{#f472b6}\mathbf{u}}}{\|{\color{#22d3ee}\mathbf{v}}\|\,\|{\color{#f472b6}\mathbf{u}}\|}`}
          className="math-center math-lg text-white/90"
        />
        <p>
          A projection uses exactly the same directional information, but asks a
          different question. Instead of asking for the full angle, it asks:
          <span className="text-white font-semibold">
            {" "}how much of{" "}
            <MathInline tex={String.raw`{\color{#22d3ee}\mathbf{v}}`} className="math-inline math-white" />{" "}
            lies along{" "}
            <MathInline tex={String.raw`{\color{#f472b6}\mathbf{u}}`} className="math-inline math-white" />
          </span>
          ?
        </p>
      </InfoPanel>

      <section id="meaning" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          What a projection means
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          A projection answers a very practical question: if{" "}
          <MathInline tex={String.raw`{\color{#22d3ee}\mathbf{v}}`} className="math-inline math-white" />{" "}
          points in some general direction, what part of it actually goes along{" "}
          <MathInline tex={String.raw`{\color{#f472b6}\mathbf{u}}`} className="math-inline math-white" />?
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The most intuitive picture is a{" "}
          <span className="text-white font-semibold">signed shadow</span>. Drop
          the tip of{" "}
          <MathInline tex={String.raw`{\color{#22d3ee}\mathbf{v}}`} className="math-inline math-white" />{" "}
          perpendicularly onto the line pointing in the{" "}
          <MathInline tex={String.raw`{\color{#f472b6}\mathbf{u}}`} className="math-inline math-white" />{" "}
          direction. Where it lands tells you the part of{" "}
          <MathInline tex={String.raw`{\color{#22d3ee}\mathbf{v}}`} className="math-inline math-white" />{" "}
          that truly lies along that direction.
        </p>
        <AlgebraStaticVisual
          variant="projection-decomposition"
          framed={false}
          caption="The white arrow is the projection: the part of the blue vector that actually lies along the pink direction. The dashed segment is the perpendicular leftover."
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This is why projections feel so natural in everyday language. If you
          walk diagonally through an airport concourse but care only about your{" "}
          <span className="text-white font-semibold">forward progress down the hallway</span>,
          projection extracts that forward part and ignores the sideways drift.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          So the main idea is simple:
          <span className="text-white font-semibold">
            {" "}a projection keeps the part that goes in the chosen direction
          </span>
          , and throws away the perpendicular part.
        </p>
        <div className="ml-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr>
                <td className="w-48 py-2 pr-4 font-semibold text-white">Parallel fact</td>
                <td className="py-2"><MathInline tex={String.raw`\operatorname{proj}_{{\color{#f472b6}\mathbf{u}}}({\color{#22d3ee}\mathbf{v}})\parallel {\color{#f472b6}\mathbf{u}}`} className="math-inline math-white" />. The projected vector lies along the same line as <MathInline tex={String.raw`{\color{#f472b6}\mathbf{u}}`} className="math-inline math-white" />.</td>
              </tr>
              <tr>
                <td className="w-48 py-2 pr-4 font-semibold text-white">Perpendicular fact</td>
                <td className="py-2"><MathInline tex={String.raw`{\color{#22d3ee}\mathbf{v}}-\operatorname{proj}_{{\color{#f472b6}\mathbf{u}}}({\color{#22d3ee}\mathbf{v}})\perp {\color{#f472b6}\mathbf{u}}`} className="math-inline math-white" />. The dropped segment and the leftover vector are perpendicular to the <MathInline tex={String.raw`{\color{#f472b6}\mathbf{u}}`} className="math-inline math-white" /> line.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="formulas" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Scalar projection and vector projection
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          There are really two closely related outputs, and the{" "}
          <span className="text-white font-semibold">subscript tells you the chosen direction</span>.
          In{" "}
          <MathInline tex={String.raw`\operatorname{comp}_{{\color{#f472b6}\mathbf{u}}}({\color{#22d3ee}\mathbf{v}})`} className="math-inline math-white" />{" "}
          and{" "}
          <MathInline tex={String.raw`\operatorname{proj}_{{\color{#f472b6}\mathbf{u}}}({\color{#22d3ee}\mathbf{v}})`} className="math-inline math-white" />,
          the vector{" "}
          <MathInline tex={String.raw`{\color{#f472b6}\mathbf{u}}`} className="math-inline math-white" />{" "}
          is the direction you are projecting onto.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          That is why the denominator involves{" "}
          <MathInline tex={String.raw`\|{\color{#f472b6}\mathbf{u}}\|`} className="math-inline math-white" />,
          not{" "}
          <MathInline tex={String.raw`\|{\color{#22d3ee}\mathbf{v}}\|`} className="math-inline math-white" />.
          You are measuring how much of{" "}
          <MathInline tex={String.raw`{\color{#22d3ee}\mathbf{v}}`} className="math-inline math-white" />{" "}
          lies in the{" "}
          <MathInline tex={String.raw`{\color{#f472b6}\mathbf{u}}`} className="math-inline math-white" />{" "}
          direction.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          There are really two closely related outputs:
        </p>
        <div className="ml-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr>
                <td className="w-56 py-2 pr-4 font-semibold text-white">Scalar projection</td>
                <td className="py-2">A signed number telling you how much of one vector lies along the chosen direction.</td>
              </tr>
              <tr>
                <td className="w-56 py-2 pr-4 font-semibold text-white">Vector projection</td>
                <td className="py-2">A new vector pointing along the chosen direction, with exactly that projected amount.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Start with the scalar projection of{" "}
          <MathInline tex={String.raw`{\color{#22d3ee}\mathbf{v}}`} className="math-inline math-white" />{" "}
          onto{" "}
          <MathInline tex={String.raw`{\color{#f472b6}\mathbf{u}}`} className="math-inline math-white" />.
          In the right-triangle picture, that projected length is just the
          adjacent side:
        </p>
        <MathBlock
          tex={String.raw`\operatorname{comp}_{{\color{#f472b6}\mathbf{u}}}({\color{#22d3ee}\mathbf{v}})
=\|{\color{#22d3ee}\mathbf{v}}\|\cos\theta`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This is where the previous lesson enters directly. From the angle
          formula,
        </p>
        <MathBlock
          tex={String.raw`{\color{#22d3ee}\mathbf{v}}\cdot{\color{#f472b6}\mathbf{u}}
=\|{\color{#22d3ee}\mathbf{v}}\|\,\|{\color{#f472b6}\mathbf{u}}\|\cos\theta`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          solve for{" "}
          <MathInline tex={String.raw`\|{\color{#22d3ee}\mathbf{v}}\|\cos\theta`} className="math-inline math-white" />:
        </p>
        <MathBlock
          tex={String.raw`\begin{aligned}
\|{\color{#22d3ee}\mathbf{v}}\|\cos\theta
&=\frac{{\color{#22d3ee}\mathbf{v}}\cdot{\color{#f472b6}\mathbf{u}}}{\|{\color{#f472b6}\mathbf{u}}\|}
\end{aligned}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          So the scalar projection formula is not new magic. It is exactly the
          old dot-product identity, rearranged:
        </p>
        <MathBlock
          tex={String.raw`\operatorname{comp}_{{\color{#f472b6}\mathbf{u}}}({\color{#22d3ee}\mathbf{v}})
=\frac{{\color{#22d3ee}\mathbf{v}}\cdot{\color{#f472b6}\mathbf{u}}}{\|{\color{#f472b6}\mathbf{u}}\|}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          That gives the{" "}
          <span className="text-white font-semibold">signed amount</span>.
          To turn that into a full projected vector, multiply by the unit vector
          in the{" "}
          <MathInline tex={String.raw`{\color{#f472b6}\mathbf{u}}`} className="math-inline math-white" />{" "}
          direction:
        </p>
        <MathBlock
          tex={String.raw`\widehat{{\color{#f472b6}\mathbf{u}}}=\frac{{\color{#f472b6}\mathbf{u}}}{\|{\color{#f472b6}\mathbf{u}}\|},\qquad
\operatorname{proj}_{{\color{#f472b6}\mathbf{u}}}({\color{#22d3ee}\mathbf{v}})
=\operatorname{comp}_{{\color{#f472b6}\mathbf{u}}}({\color{#22d3ee}\mathbf{v}})\,\widehat{{\color{#f472b6}\mathbf{u}}}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Substitute the scalar formula and simplify:
        </p>
        <MathBlock
          tex={String.raw`\begin{aligned}
\operatorname{proj}_{{\color{#f472b6}\mathbf{u}}}({\color{#22d3ee}\mathbf{v}})
&=\frac{{\color{#22d3ee}\mathbf{v}}\cdot{\color{#f472b6}\mathbf{u}}}{\|{\color{#f472b6}\mathbf{u}}\|}\cdot
\frac{{\color{#f472b6}\mathbf{u}}}{\|{\color{#f472b6}\mathbf{u}}\|} \\
&=\frac{{\color{#22d3ee}\mathbf{v}}\cdot{\color{#f472b6}\mathbf{u}}}{\|{\color{#f472b6}\mathbf{u}}\|^{2}}\,{\color{#f472b6}\mathbf{u}}
\end{aligned}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This formula immediately explains two geometric facts:
        </p>
        <ul className="ml-6 grid gap-3 text-base leading-7 text-[color:var(--color-muted)]">
          <li><MathInline tex={String.raw`\operatorname{proj}_{{\color{#f472b6}\mathbf{u}}}({\color{#22d3ee}\mathbf{v}})`} className="math-inline math-white" /> is a scalar multiple of <MathInline tex={String.raw`{\color{#f472b6}\mathbf{u}}`} className="math-inline math-white" />, so it is parallel to <MathInline tex={String.raw`{\color{#f472b6}\mathbf{u}}`} className="math-inline math-white" />.</li>
          <li>The leftover <MathInline tex={String.raw`{\color{#22d3ee}\mathbf{v}}-\operatorname{proj}_{{\color{#f472b6}\mathbf{u}}}({\color{#22d3ee}\mathbf{v}})`} className="math-inline math-white" /> is the perpendicular part that got removed.</li>
        </ul>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          You can even verify the perpendicular fact algebraically:
        </p>
        <MathBlock
          tex={String.raw`\begin{aligned}
\left({\color{#22d3ee}\mathbf{v}}-\operatorname{proj}_{{\color{#f472b6}\mathbf{u}}}({\color{#22d3ee}\mathbf{v}})\right)\cdot{\color{#f472b6}\mathbf{u}}
&={\color{#22d3ee}\mathbf{v}}\cdot{\color{#f472b6}\mathbf{u}}
-\left(\frac{{\color{#22d3ee}\mathbf{v}}\cdot{\color{#f472b6}\mathbf{u}}}{\|{\color{#f472b6}\mathbf{u}}\|^{2}}{\color{#f472b6}\mathbf{u}}\right)\cdot{\color{#f472b6}\mathbf{u}} \\
&={\color{#22d3ee}\mathbf{v}}\cdot{\color{#f472b6}\mathbf{u}}
-\frac{{\color{#22d3ee}\mathbf{v}}\cdot{\color{#f472b6}\mathbf{u}}}{\|{\color{#f472b6}\mathbf{u}}\|^{2}}\left({\color{#f472b6}\mathbf{u}}\cdot{\color{#f472b6}\mathbf{u}}\right) \\
&={\color{#22d3ee}\mathbf{v}}\cdot{\color{#f472b6}\mathbf{u}}
-\frac{{\color{#22d3ee}\mathbf{v}}\cdot{\color{#f472b6}\mathbf{u}}}{\|{\color{#f472b6}\mathbf{u}}\|^{2}}\|{\color{#f472b6}\mathbf{u}}\|^{2} \\
&=0
\end{aligned}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          So the leftover really is orthogonal. That connects projections
          directly back to the dot-product test for perpendicularity.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          One especially clean special case is when{" "}
          <MathInline tex={String.raw`{\color{#f472b6}\mathbf{u}}`} className="math-inline math-white" />{" "}
          already has length 1. Then:
        </p>
        <MathBlock
          tex={String.raw`\operatorname{comp}_{{\color{#f472b6}\mathbf{u}}}({\color{#22d3ee}\mathbf{v}})
={\color{#22d3ee}\mathbf{v}}\cdot{\color{#f472b6}\mathbf{u}},
\qquad
\operatorname{proj}_{{\color{#f472b6}\mathbf{u}}}({\color{#22d3ee}\mathbf{v}})
=({\color{#22d3ee}\mathbf{v}}\cdot{\color{#f472b6}\mathbf{u}})\,{\color{#f472b6}\mathbf{u}}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          So a unit direction makes the projection formulas feel almost
          automatic: the dot product directly gives the signed amount, and then
          you place that amount along the direction vector.
        </p>
      </section>

      <section id="examples" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Worked examples
        </h2>

        <h3 id="example-horizontal" className="scroll-mt-28 text-xl font-semibold text-white font-[var(--font-display)]">
          Example 1: progress in a hallway
        </h3>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Let{" "}
          <MathInline tex={String.raw`{\color{#f472b6}\mathbf{u}}=(1,0)`} className="math-inline math-white" />{" "}
          and{" "}
          <MathInline tex={String.raw`{\color{#22d3ee}\mathbf{v}}=(3,4)`} className="math-inline math-white" />.
          Here the{" "}
          <MathInline tex={String.raw`{\color{#f472b6}\mathbf{u}}`} className="math-inline math-white" />{" "}
          direction is just straight to the right.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          First compute the scalar projection:
        </p>
        <MathBlock
          tex={String.raw`\begin{aligned}
\operatorname{comp}_{{\color{#f472b6}\mathbf{u}}}({\color{#22d3ee}\mathbf{v}})
&=\frac{{\color{#22d3ee}\mathbf{v}}\cdot{\color{#f472b6}\mathbf{u}}}{\|{\color{#f472b6}\mathbf{u}}\|} \\
&=\frac{(3,4)\cdot(1,0)}{1} \\
&=\frac{3\cdot1+4\cdot0}{1} \\
&=3
\end{aligned}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Now convert that signed amount into the projected vector:
        </p>
        <MathBlock
          tex={String.raw`\begin{aligned}
\operatorname{proj}_{{\color{#f472b6}\mathbf{u}}}({\color{#22d3ee}\mathbf{v}})
&=3(1,0) \\
&=(3,0)
\end{aligned}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          So if a hallway runs east-west and your actual motion is{" "}
          <MathInline tex={String.raw`(3,4)`} className="math-inline math-white" />,
          your forward progress down the hallway is{" "}
          <span className="text-white font-semibold">3 units</span>. The extra
          4 units are sideways drift, not hallway progress.
        </p>

        <h3 id="example-slanted" className="scroll-mt-28 text-xl font-semibold text-white font-[var(--font-display)]">
          Example 2: projection onto a slanted direction
        </h3>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Now take{" "}
          <MathInline tex={String.raw`{\color{#f472b6}\mathbf{u}}=(1,1)`} className="math-inline math-white" />{" "}
          and{" "}
          <MathInline tex={String.raw`{\color{#22d3ee}\mathbf{v}}=(4,2)`} className="math-inline math-white" />.
          This time the chosen direction is diagonal rather than horizontal.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Start with the dot product and the length of{" "}
          <MathInline tex={String.raw`{\color{#f472b6}\mathbf{u}}`} className="math-inline math-white" />:
        </p>
        <MathBlock
          tex={String.raw`\begin{aligned}
{\color{#22d3ee}\mathbf{v}}\cdot{\color{#f472b6}\mathbf{u}}
&=4\cdot1+2\cdot1 \\
&=6
\end{aligned}`}
          className="math-center math-lg text-white/90"
        />
        <MathBlock
          tex={String.raw`\|{\color{#f472b6}\mathbf{u}}\|=\sqrt{1^{2}+1^{2}}=\sqrt{2}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          So the scalar projection is:
        </p>
        <MathBlock
          tex={String.raw`\begin{aligned}
\operatorname{comp}_{{\color{#f472b6}\mathbf{u}}}({\color{#22d3ee}\mathbf{v}})
&=\frac{6}{\sqrt{2}} \\
&=3\sqrt{2}
\end{aligned}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Now compute the projected vector:
        </p>
        <MathBlock
          tex={String.raw`\begin{aligned}
\operatorname{proj}_{{\color{#f472b6}\mathbf{u}}}({\color{#22d3ee}\mathbf{v}})
&=\frac{6}{\|{\color{#f472b6}\mathbf{u}}\|^{2}}(1,1) \\
&=\frac{6}{2}(1,1) \\
&=3(1,1) \\
&=(3,3)
\end{aligned}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          That means{" "}
          <MathInline tex={String.raw`(4,2)`} className="math-inline math-white" />{" "}
          splits into a part along the diagonal and a perpendicular leftover:
        </p>
        <MathBlock
          tex={String.raw`(4,2)=(3,3)+(1,-1)`}
          className="math-center math-lg text-white/90"
        />
        <AlgebraStaticVisual
          variant="projection-decomposition"
          framed={false}
          caption="The projection keeps the diagonal part. The dashed leftover is perpendicular, so it contributes nothing in the pink direction."
        />

        <h3 id="example-negative" className="scroll-mt-28 text-xl font-semibold text-white font-[var(--font-display)]">
          Example 3: a backward projection
        </h3>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Finally, let{" "}
          <MathInline tex={String.raw`{\color{#f472b6}\mathbf{u}}=(1,1)`} className="math-inline math-white" />{" "}
          and{" "}
          <MathInline tex={String.raw`{\color{#22d3ee}\mathbf{v}}=(1,-3)`} className="math-inline math-white" />.
          This is the case that makes the sign matter.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          First compute the dot product:
        </p>
        <MathBlock
          tex={String.raw`\begin{aligned}
{\color{#22d3ee}\mathbf{v}}\cdot{\color{#f472b6}\mathbf{u}}
&=1\cdot1+(-3)\cdot1 \\
&=-2
\end{aligned}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Since{" "}
          <MathInline tex={String.raw`\|{\color{#f472b6}\mathbf{u}}\|=\sqrt{2}`} className="math-inline math-white" />,
          the scalar projection is:
        </p>
        <MathBlock
          tex={String.raw`\begin{aligned}
\operatorname{comp}_{{\color{#f472b6}\mathbf{u}}}({\color{#22d3ee}\mathbf{v}})
&=\frac{-2}{\sqrt{2}} \\
&=-\sqrt{2}
\end{aligned}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The vector projection follows immediately:
        </p>
        <MathBlock
          tex={String.raw`\begin{aligned}
\operatorname{proj}_{{\color{#f472b6}\mathbf{u}}}({\color{#22d3ee}\mathbf{v}})
&=\frac{-2}{2}(1,1) \\
&=-1(1,1) \\
&=(-1,-1)
\end{aligned}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The negative sign means the projection points{" "}
          <span className="text-white font-semibold">opposite</span> the pink
          direction. If the hallway points northeast but your motion points
          mostly southeast, your hallway progress is negative: you are moving
          backward relative to the chosen direction.
        </p>
        <AlgebraStaticVisual
          variant="projection-negative"
          framed={false}
          caption="A negative projection still lies on the chosen line, but it points the opposite way. The sign is telling you the progress is backward."
        />
      </section>

      <section id="why-matters" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Everyday intuition and why it matters
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Projection is the mathematics of{" "}
          <span className="text-white font-semibold">useful directional part</span>.
          The same question shows up in many ordinary settings:
        </p>
        <div className="ml-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr>
                <td className="w-56 py-2 pr-4 font-semibold text-white">Walking in a hallway</td>
                <td className="py-2">Your total motion may be diagonal, but only the part along the hallway counts as forward progress.</td>
              </tr>
              <tr>
                <td className="w-56 py-2 pr-4 font-semibold text-white">A shadow on the ground</td>
                <td className="py-2">A shadow keeps the part of an object&apos;s direction that lies along the ground and discards the perpendicular part.</td>
              </tr>
              <tr>
                <td className="w-56 py-2 pr-4 font-semibold text-white">Pushing along a ramp</td>
                <td className="py-2">If your push is partly sideways, projection extracts the part of the force that actually helps along the ramp.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          That is why projections matter so much. They turn a full vector into
          the part that is actually relevant for a chosen direction, constraint,
          or task.
        </p>
      </section>

      <section id="checks" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Checks and special cases
        </h2>
        <div className="ml-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr>
                <td className="w-48 py-2 pr-4 font-semibold text-white">If the scalar projection is positive</td>
                <td className="py-2">The projected vector points with the chosen direction.</td>
              </tr>
              <tr>
                <td className="w-48 py-2 pr-4 font-semibold text-white">If it is zero</td>
                <td className="py-2">There is no component in that direction, so the original vector is perpendicular to the direction vector.</td>
              </tr>
              <tr>
                <td className="w-48 py-2 pr-4 font-semibold text-white">If it is negative</td>
                <td className="py-2">The projection lies on the same line, but points the opposite way.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          One distinction should stay clear the whole time:
          <span className="text-white font-semibold">
            {" "}scalar projection is a number, vector projection is an arrow
          </span>
          .
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Another good check is geometric. The leftover vector{" "}
          <MathInline tex={String.raw`{\color{#22d3ee}\mathbf{v}}-\operatorname{proj}_{{\color{#f472b6}\mathbf{u}}}({\color{#22d3ee}\mathbf{v}})`} className="math-inline math-white" />{" "}
          should be perpendicular to{" "}
          <MathInline tex={String.raw`{\color{#f472b6}\mathbf{u}}`} className="math-inline math-white" />.
          That is exactly why the leftover is discarded in the projection.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          And, just as with the angle formula, you must project onto a{" "}
          <span className="text-white font-semibold">nonzero vector</span>.
          The zero vector has no direction, so there is no meaningful line to
          project onto.
        </p>
      </section>

      <section id="bridge" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          What comes next
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Projection already hints at the next big idea. It builds a new vector
          by taking a{" "}
          <span className="text-white font-semibold">scaled copy of a direction</span>:
        </p>
        <MathBlock
          tex={String.raw`\operatorname{proj}_{{\color{#f472b6}\mathbf{u}}}({\color{#22d3ee}\mathbf{v}})
=\frac{{\color{#22d3ee}\mathbf{v}}\cdot{\color{#f472b6}\mathbf{u}}}{\|{\color{#f472b6}\mathbf{u}}\|^{2}}\,{\color{#f472b6}\mathbf{u}}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The next lesson broadens that idea. Instead of asking what you get
          from scaling one direction, it asks what vectors you can build by{" "}
          <span className="text-white font-semibold">scaling and adding several directions</span>.
        </p>
        <MathBlock
          tex={String.raw`c_{1}{\color{#f472b6}\mathbf{u}}+c_{2}{\color{#22d3ee}\mathbf{v}}+\cdots`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          That is the handoff into linear combinations.
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
                <td className="py-2">A projection extracts the part of one vector that lies along a chosen direction.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">The scalar projection is <MathInline tex={String.raw`\operatorname{comp}_{{\color{#f472b6}\mathbf{u}}}({\color{#22d3ee}\mathbf{v}})=\frac{{\color{#22d3ee}\mathbf{v}}\cdot{\color{#f472b6}\mathbf{u}}}{\|{\color{#f472b6}\mathbf{u}}\|}`} className="math-inline math-white" />.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">The vector projection is <MathInline tex={String.raw`\operatorname{proj}_{{\color{#f472b6}\mathbf{u}}}({\color{#22d3ee}\mathbf{v}})=\frac{{\color{#22d3ee}\mathbf{v}}\cdot{\color{#f472b6}\mathbf{u}}}{\|{\color{#f472b6}\mathbf{u}}\|^{2}}\,{\color{#f472b6}\mathbf{u}}`} className="math-inline math-white" />.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">Positive, zero, and negative projections correspond to forward, none, and backward progress in the chosen direction.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">The leftover vector after projection is perpendicular to the direction you projected onto.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">This topic leads naturally into linear combinations, where scaled directions are added together.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </ArticleLayout>
  );
}
