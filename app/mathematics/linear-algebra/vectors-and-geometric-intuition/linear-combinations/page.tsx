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
  title: "Linear Combinations",
  description:
    "Learn how to build new vectors by scaling and adding existing ones, and see why linear combinations lead naturally into span.",
};

export default function LinearCombinationsPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "intro", label: "Introduction" },
    { id: "why", label: "Why this topic comes next", level: 2 },
    { id: "meaning", label: "What a linear combination means" },
    { id: "coefficients", label: "How coefficients change the result" },
    { id: "examples", label: "Worked examples" },
    { id: "example-basis", label: "Example 1: building coordinates", level: 2 },
    { id: "example-slanted", label: "Example 2: slanted directions", level: 2 },
    { id: "example-target", label: "Example 3: solving for the recipe", level: 2 },
    { id: "why-matters", label: "Why this matters" },
    { id: "checks", label: "Checks and common mistakes" },
    { id: "bridge", label: "What comes next" },
    { id: "summary", label: "Summary" },
  ];

  return (
    <ArticleLayout
      eyebrow="Mathematics - Linear Algebra - Vectors"
      title="Linear combinations"
      description="The previous lesson used one scaled direction to build a projection. This lesson widens that idea: if one scaled direction is useful, what can you build by scaling and adding several directions?"
      descriptionClassName="!max-w-none"
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Linear Algebra phases", links: linearAlgebraPhases },
            { title: "Within this phase", links: linearAlgebraVectorLessons },
          ]}
          activeHref="/mathematics/linear-algebra/vectors-and-geometric-intuition/linear-combinations"
        />
      }
    >
      <InfoPanel id="intro" title="Introduction" variant="intro">
        <p>
          A linear combination is one of the most important phrases in all of
          linear algebra. It sounds abstract at first, but the idea is simple:
          take some vectors,{" "}
          <span className="text-white font-semibold">scale them</span>, then{" "}
          <span className="text-white font-semibold">add them</span>.
        </p>
        <p>
          This is the first place where vectors stop feeling like isolated
          arrows and start feeling like{" "}
          <span className="text-white font-semibold">building blocks</span>.
          Instead of asking what one vector is, we ask what new vectors can be
          made from directions we already have.
        </p>
        <p>Here is the roadmap for this lesson:</p>
        <div className="ml-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">What a linear combination means</td>
                <td className="py-2">How to read a linear combination as a recipe: scaled copies of vectors added together.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">How coefficients change the result</td>
                <td className="py-2">How positive, negative, zero, and fractional coefficients change the final arrow.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Worked examples</td>
                <td className="py-2">How to compute linear combinations step by step and even solve for the coefficients that hit a target vector.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Why this matters</td>
                <td className="py-2">How coordinates, recipes, and useful directions all rely on the same scale-and-add idea.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Checks and common mistakes</td>
                <td className="py-2">How to sanity-check the result and avoid confusing the coefficients with the vectors themselves.</td>
              </tr>
              <tr>
                <td className="w-56 py-2 pr-4 font-semibold text-white">What comes next</td>
                <td className="py-2">How the next lesson asks not about one recipe, but about the whole set of vectors all possible recipes can produce.</td>
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
          The projection page already built a new vector from one chosen
          direction:
        </p>
        <MathBlock
          tex={String.raw`\operatorname{proj}_{{\color{#f472b6}\mathbf{u}}}({\color{#22d3ee}\mathbf{v}})
=\frac{{\color{#22d3ee}\mathbf{v}}\cdot{\color{#f472b6}\mathbf{u}}}{\|{\color{#f472b6}\mathbf{u}}\|^{2}}\,{\color{#f472b6}\mathbf{u}}`}
          className="math-center math-lg text-white/90"
        />
        <p>
          That is already a linear combination in a tiny form. It is just{" "}
          <span className="text-white font-semibold">one scaled copy of one vector</span>.
        </p>
        <p>
          This page simply broadens that idea. Instead of using one direction,
          we ask what happens when we scale and add{" "}
          <span className="text-white font-semibold">several directions</span>.
        </p>
      </InfoPanel>

      <section id="meaning" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          What a linear combination means
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          A linear combination is a{" "}
          <span className="text-white font-semibold">recipe for building a new vector</span>.
          You choose some vectors, decide how much of each one you want, and then
          add the results together.
        </p>
        <MathBlock
          tex={String.raw`a\,{\color{#f472b6}\mathbf{u}}+b\,{\color{#22d3ee}\mathbf{v}}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Here the numbers{" "}
          <MathInline tex={String.raw`a`} className="math-inline math-white" />{" "}
          and{" "}
          <MathInline tex={String.raw`b`} className="math-inline math-white" />{" "}
          are called{" "}
          <span className="text-white font-semibold">coefficients</span>.
          They tell you how much of{" "}
          <MathInline tex={String.raw`{\color{#f472b6}\mathbf{u}}`} className="math-inline math-white" />{" "}
          and{" "}
          <MathInline tex={String.raw`{\color{#22d3ee}\mathbf{v}}`} className="math-inline math-white" />{" "}
          to use.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The general form looks the same:
        </p>
        <MathBlock
          tex={String.raw`c_{1}{\color{#f472b6}\mathbf{u}}_{1}+c_{2}{\color{#22d3ee}\mathbf{u}}_{2}+\cdots+c_{k}{\mathbf{u}}_{k}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          So the core idea is not the letters. The core idea is{" "}
          <span className="text-white font-semibold">scale, then add</span>.
        </p>
        <AlgebraStaticVisual
          variant="linear-combination-basic"
          framed={false}
          caption="A linear combination is a recipe. In this picture, the white result is made by taking two copies of the pink vector and one copy of the blue vector."
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This is why coordinates work so well. In the standard basis, for
          example, every vector in the plane is built from the horizontal and
          vertical directions by scaling and adding them.
        </p>
      </section>

      <section id="coefficients" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          How coefficients change the result
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The coefficients act like a control panel for the final vector.
          Changing them changes the result.
        </p>
        <div className="ml-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr className="border-b border-white/10">
                <td className="w-40 py-2 pr-4 font-semibold text-white">Positive coefficient</td>
                <td className="py-2">Keeps the same direction and changes the length.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-40 py-2 pr-4 font-semibold text-white">Negative coefficient</td>
                <td className="py-2">Flips the direction, then scales the length.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-40 py-2 pr-4 font-semibold text-white">Zero coefficient</td>
                <td className="py-2">Removes that vector from the recipe completely.</td>
              </tr>
              <tr>
                <td className="w-40 py-2 pr-4 font-semibold text-white">Fractional coefficient</td>
                <td className="py-2">Keeps only part of that vector.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          With the same two directions, different coefficients give different
          final arrows:
        </p>
        <div className="-mt-2">
          <AlgebraStaticVisual
            variant="linear-combination-family"
            framed={false}
            caption="The pink and blue directions stay fixed. Changing the coefficients changes which vector you build from them."
          />
        </div>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          So a linear combination is not just one vector expression. It is a{" "}
          <span className="text-white font-semibold">whole family of possible outputs</span>,
          depending on the coefficients you choose.
        </p>
      </section>

      <section id="examples" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Worked examples
        </h2>

        <h3 id="example-basis" className="scroll-mt-28 text-xl font-semibold text-white font-[var(--font-display)]">
          Example 1: building coordinates
        </h3>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Let{" "}
          <MathInline tex={String.raw`{\color{#f472b6}\mathbf{u}}=(1,0)`} className="math-inline math-white" />{" "}
          and{" "}
          <MathInline tex={String.raw`{\color{#22d3ee}\mathbf{v}}=(0,1)`} className="math-inline math-white" />.
          Consider the linear combination
        </p>
        <MathBlock
          tex={String.raw`3{\color{#f472b6}\mathbf{u}}-2{\color{#22d3ee}\mathbf{v}}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          First scale each vector:
        </p>
        <MathBlock
          tex={String.raw`3{\color{#f472b6}\mathbf{u}}=3(1,0)=(3,0)`}
          className="math-center math-lg text-white/90"
        />
        <MathBlock
          tex={String.raw`-2{\color{#22d3ee}\mathbf{v}}=-2(0,1)=(0,-2)`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Now add the results:
        </p>
        <MathBlock
          tex={String.raw`\begin{aligned}
3{\color{#f472b6}\mathbf{u}}-2{\color{#22d3ee}\mathbf{v}}
&=(3,0)+(0,-2) \\[4pt]
&=(3,-2)
\end{aligned}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          So the vector{" "}
          <MathInline tex={String.raw`(3,-2)`} className="math-inline math-white" />{" "}
          is a linear combination of the standard horizontal and vertical
          directions. This is really what coordinates are doing behind the
          scenes.
        </p>

        <h3 id="example-slanted" className="scroll-mt-28 text-xl font-semibold text-white font-[var(--font-display)]">
          Example 2: slanted directions
        </h3>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Now let{" "}
          <MathInline tex={String.raw`{\color{#f472b6}\mathbf{u}}=(2,1)`} className="math-inline math-white" />{" "}
          and{" "}
          <MathInline tex={String.raw`{\color{#22d3ee}\mathbf{v}}=(1,2)`} className="math-inline math-white" />.
          Compute
        </p>
        <MathBlock
          tex={String.raw`2{\color{#f472b6}\mathbf{u}}+{\color{#22d3ee}\mathbf{v}}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          First scale{" "}
          <MathInline tex={String.raw`{\color{#f472b6}\mathbf{u}}`} className="math-inline math-white" />:
        </p>
        <MathBlock
          tex={String.raw`2{\color{#f472b6}\mathbf{u}}=2(2,1)=(4,2)`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Now add one copy of{" "}
          <MathInline tex={String.raw`{\color{#22d3ee}\mathbf{v}}`} className="math-inline math-white" />:
        </p>
        <MathBlock
          tex={String.raw`\begin{aligned}
2{\color{#f472b6}\mathbf{u}}+{\color{#22d3ee}\mathbf{v}}
&=(4,2)+(1,2) \\[4pt]
&=(5,4)
\end{aligned}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The important idea is that neither original vector had to point along
          an axis. Linear combinations work with any directions you already have.
        </p>

        <h3 id="example-target" className="scroll-mt-28 text-xl font-semibold text-white font-[var(--font-display)]">
          Example 3: solving for the recipe
        </h3>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Suppose{" "}
          <MathInline tex={String.raw`{\color{#f472b6}\mathbf{u}}=(1,1)`} className="math-inline math-white" />{" "}
          and{" "}
          <MathInline tex={String.raw`{\color{#22d3ee}\mathbf{v}}=(1,-1)`} className="math-inline math-white" />.
          We want coefficients{" "}
          <MathInline tex={String.raw`a`} className="math-inline math-white" />{" "}
          and{" "}
          <MathInline tex={String.raw`b`} className="math-inline math-white" />{" "}
          such that
        </p>
        <MathBlock
          tex={String.raw`a{\color{#f472b6}\mathbf{u}}+b{\color{#22d3ee}\mathbf{v}}=(4,2)`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Substitute the vectors:
        </p>
        <MathBlock
          tex={String.raw`a\begin{bmatrix}1\\[2pt]1\end{bmatrix}
+b\begin{bmatrix}1\\[2pt]-1\end{bmatrix}
=\begin{bmatrix}4\\[2pt]2\end{bmatrix}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          In column-vector form, you can now read the top row and bottom row as
          two ordinary simultaneous equations:
        </p>
        <MathBlock
          tex={String.raw`\begin{aligned}
a+b&=4 \\[4pt]
a-b&=2
\end{aligned}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Add the two equations to solve for{" "}
          <MathInline tex={String.raw`a`} className="math-inline math-white" />:
        </p>
        <MathBlock
          tex={String.raw`\begin{aligned}
2a&=6 \\[4pt]
a&=3
\end{aligned}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Then use{" "}
          <MathInline tex={String.raw`a+b=4`} className="math-inline math-white" />{" "}
          to get{" "}
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
          So the target vector is
        </p>
        <MathBlock
          tex={String.raw`(4,2)=3{\color{#f472b6}\mathbf{u}}+{\color{#22d3ee}\mathbf{v}}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This is an important shift. Sometimes linear algebra gives you the
          recipe directly. Sometimes it asks you to{" "}
          <span className="text-white font-semibold">solve for the recipe</span>.
        </p>
      </section>

      <section id="why-matters" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Why this matters
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Linear combinations matter because they are the language of{" "}
          <span className="text-white font-semibold">construction</span>.
        </p>
        <div className="ml-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr className="border-b border-white/10">
                <td className="w-52 py-2 pr-4 font-semibold text-white">Coordinates</td>
                <td className="py-2">Coordinates tell you how much of each basis direction to use.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-52 py-2 pr-4 font-semibold text-white">Recipes</td>
                <td className="py-2">A linear combination is literally a vector recipe: ingredients plus amounts.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-52 py-2 pr-4 font-semibold text-white">Projections</td>
                <td className="py-2">A projection is a special case: one scaled copy of one vector.</td>
              </tr>
              <tr>
                <td className="w-52 py-2 pr-4 font-semibold text-white">Later topics</td>
                <td className="py-2">Span, basis, and subspaces all ask what you can build from given directions.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="checks" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Checks and common mistakes
        </h2>
        <div className="ml-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr className="border-b border-white/10">
                <td className="w-52 py-2 pr-4 font-semibold text-white">Check the output type</td>
                <td className="py-2">A linear combination of vectors is another vector, not a scalar.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-52 py-2 pr-4 font-semibold text-white">Scale before adding</td>
                <td className="py-2">Do not add the coefficients to the vector entries directly. First scale each whole vector, then add.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-52 py-2 pr-4 font-semibold text-white">Negative means reverse</td>
                <td className="py-2">A negative coefficient flips the direction of that vector before scaling it.</td>
              </tr>
              <tr>
                <td className="w-52 py-2 pr-4 font-semibold text-white">Zero means ignore</td>
                <td className="py-2">A zero coefficient removes that vector from the recipe completely.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          One especially important observation is this:
          <span className="text-white font-semibold">
            {" "}the same target vector can sometimes be described as a linear combination in a useful way
          </span>
          . That point becomes central when we study basis and coordinates more formally.
        </p>
      </section>

      <section id="bridge" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          What comes next
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This page focused on{" "}
          <span className="text-white font-semibold">one particular recipe</span>
          :
        </p>
        <MathBlock
          tex={String.raw`2{\color{#f472b6}\mathbf{u}}+{\color{#22d3ee}\mathbf{v}},\qquad
3{\color{#f472b6}\mathbf{u}}-2{\color{#22d3ee}\mathbf{v}},\qquad
a{\color{#f472b6}\mathbf{u}}+b{\color{#22d3ee}\mathbf{v}}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The next lesson asks the bigger question:{" "}
          <span className="text-white font-semibold">what whole set of vectors can be built from those recipes?</span>
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          That is the move from linear combinations to{" "}
          <span className="text-white font-semibold">span</span>.
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
                <td className="py-2">A linear combination means scaling vectors and then adding them.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">In <MathInline tex={String.raw`a{\color{#f472b6}\mathbf{u}}+b{\color{#22d3ee}\mathbf{v}}`} className="math-inline math-white" />, the numbers <MathInline tex={String.raw`a`} className="math-inline math-white" /> and <MathInline tex={String.raw`b`} className="math-inline math-white" /> are the coefficients.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">Positive, negative, zero, and fractional coefficients change the result in predictable ways.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">Coordinates are already an everyday example of linear combinations.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">A projection is a special case of a linear combination: one scaled copy of one vector.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">This topic leads directly into span, which asks for all vectors obtainable from such combinations.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </ArticleLayout>
  );
}
