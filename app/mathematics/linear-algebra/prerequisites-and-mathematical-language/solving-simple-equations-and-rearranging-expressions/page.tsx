import type { Metadata } from "next";
import ArticleLayout from "@/components/ArticleLayout";
import InfoPanel from "@/components/InfoPanel";
import RightRail from "@/components/RightRail";
import { MathBlock, MathInline } from "@/components/Math";
import {
  linearAlgebraPhases,
  linearAlgebraPrerequisiteLessons,
} from "@/lib/mathTopics";

export const metadata: Metadata = {
  title: "Solving Simple Equations and Rearranging Expressions",
  description:
    "The next linear algebra prerequisite lesson: solve simple equations, rearrange expressions carefully, and build fluency with inverse operations.",
};

export default function SolvingSimpleEquationsPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "intro", label: "Introduction" },
    { id: "why", label: "Why this topic comes next", level: 2 },
    { id: "equations", label: "Solving equations" },
    { id: "inverse-operations", label: "Inverse operations", level: 2 },
    { id: "worked-examples", label: "Worked examples", level: 2 },
    { id: "rearranging", label: "Rearranging expressions" },
    { id: "solve-for-symbol", label: "Solving for a different symbol", level: 2 },
    { id: "checking", label: "Checking solutions" },
    { id: "mistakes", label: "Common mistakes", level: 2 },
    { id: "bridge", label: "Linear algebra bridge" },
    { id: "summary", label: "Summary" },
  ];

  return (
    <ArticleLayout
      eyebrow="Mathematics - Linear Algebra - Prerequisites"
      title="Solving simple equations and rearranging expressions"
      description="Now that symbols, functions, and coordinates feel more readable, the next step is to manipulate equations confidently. This lesson builds the habit of undoing operations carefully, preserving equality, and rearranging formulas without losing structure."
      descriptionClassName="!max-w-none"
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Linear Algebra phases", links: linearAlgebraPhases },
            { title: "Within this phase", links: linearAlgebraPrerequisiteLessons },
          ]}
          activeHref="/mathematics/linear-algebra/prerequisites-and-mathematical-language/solving-simple-equations-and-rearranging-expressions"
        />
      }
    >
      <InfoPanel id="intro" title="Introduction" variant="intro">
        <p>
          Up to this point, the main goal has been to <span className="text-white font-semibold">read mathematical symbols cleanly</span>.
          This lesson adds the next skill: changing an equation on purpose while
          keeping it true.
        </p>
        <p>
          That means solving for an unknown value, undoing operations in the
          right order, and rearranging formulas so that one symbol is isolated.
          These habits matter everywhere later, including linear algebra.
        </p>
        <p>Here is the roadmap for this lesson:</p>
        <div className="ml-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Solving equations</td>
                <td className="py-2">How to isolate a variable while preserving equality.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Rearranging expressions</td>
                <td className="py-2">How to rewrite a formula so that a different symbol becomes the subject.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Checking solutions</td>
                <td className="py-2">How to substitute answers back in and verify that the equation still works.</td>
              </tr>
              <tr>
                <td className="w-56 py-2 pr-4 font-semibold text-white">Linear algebra bridge</td>
                <td className="py-2">How these balancing and rearranging habits prepare you for systems, matrices, and transformations.</td>
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
          Coordinates and functions gave symbols a visual and geometric setting.
          The next natural question is: <span className="text-white font-semibold">how do we manipulate equations without breaking them</span>?
        </p>
        <MathBlock
          tex={String.raw`{\color{#22d3ee}x}+3=8,\qquad 2{\color{#22d3ee}x}=10,\qquad \frac{{\color{#22d3ee}x}}{3}=4,\qquad {\color{#f472b6}y}=2{\color{#22d3ee}x}+1`}
          className="math-center math-lg text-white/90"
        />
        <p>
          That is the habit this page builds: undo operations carefully and keep
          equality intact at every step.
        </p>
      </InfoPanel>

      <section id="equations" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Solving equations
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Solving an equation means finding which value of a variable makes the
          equation true.
        </p>
        <MathBlock
          tex={String.raw`{\color{#22d3ee}x}+3=8`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Here the goal is to get <MathInline tex={String.raw`{\color{#22d3ee}x}`} className="math-inline math-white" /> by
          itself. To do that, we undo the operations attached to it.
        </p>

        <section id="inverse-operations" className="scroll-mt-28 grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Inverse operations
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Solving equations is often about recognising an operation and then
            applying its inverse.
          </p>
          <div className="ml-8 overflow-x-auto">
            <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
              <tbody>
                <tr>
                  <td className="w-48 py-2 pr-4 text-center font-semibold text-white">What you see</td>
                  <td className="py-2 font-semibold text-white">What you usually do to undo it</td>
                </tr>
                <tr>
                  <td className="py-2 text-center text-white">
                    <MathInline tex={String.raw`{\color{#22d3ee}x}+3`} className="math-inline math-white" />
                  </td>
                  <td className="py-2">Subtract 3.</td>
                </tr>
                <tr>
                  <td className="py-2 text-center text-white">
                    <MathInline tex={String.raw`{\color{#22d3ee}x}-5`} className="math-inline math-white" />
                  </td>
                  <td className="py-2">Add 5.</td>
                </tr>
                <tr>
                  <td className="py-2 text-center text-white">
                    <MathInline tex={String.raw`2{\color{#22d3ee}x}`} className="math-inline math-white" />
                  </td>
                  <td className="py-2">Divide by 2.</td>
                </tr>
                <tr>
                  <td className="py-2 text-center text-white">
                    <MathInline tex={String.raw`\frac{{\color{#22d3ee}x}}{3}`} className="math-inline math-white" />
                  </td>
                  <td className="py-2">Multiply by 3.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            The key rule is still the same as before: <span className="text-white font-semibold">whatever you do to one side, do to the other side as well</span>.
          </p>
        </section>

        <section id="worked-examples" className="scroll-mt-28 grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Worked examples
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Each example below is written as a short, balanced chain. The lines
            are aligned at the equals sign so you can track exactly what
            changes from one step to the next.
          </p>

          <section className="grid gap-3">
            <h4 className="text-lg font-semibold text-white">1. Adding and subtracting</h4>
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Start with:
            </p>
            <MathBlock
              tex={String.raw`{\color{#22d3ee}x}+3=8`}
              className="math-center math-lg text-white/90"
            />
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              The <MathInline tex={String.raw`+3`} className="math-inline math-white" /> is attached to the left-hand side,
              so we subtract 3 from both sides.
            </p>
            <MathBlock
              tex={String.raw`\begin{aligned}
{\color{#22d3ee}x}+3-3 &= 8-3 \\[0.55em]
{\color{#22d3ee}x} &= 5
\end{aligned}`}
              className="math-center math-lg text-white/90"
            />
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              The last line is the clean answer because the variable has been isolated.
            </p>
          </section>

          <section className="grid gap-3">
            <h4 className="text-lg font-semibold text-white">2. Multiplying and dividing</h4>
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Now consider:
            </p>
            <MathBlock
              tex={String.raw`2{\color{#22d3ee}x}=10`}
              className="math-center math-lg text-white/90"
            />
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              The variable is being multiplied by 2, so divide both sides by 2.
            </p>
            <MathBlock
              tex={String.raw`\begin{aligned}
\frac{2{\color{#22d3ee}x}}{2} &= \frac{10}{2} \\[0.55em]
{\color{#22d3ee}x} &= 5
\end{aligned}`}
              className="math-center math-lg text-white/90"
            />
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              This is the same logic as before, but now the inverse operation is division rather than subtraction.
            </p>
          </section>

          <section className="grid gap-3">
            <h4 className="text-lg font-semibold text-white">3. Fractions</h4>
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Another common pattern is:
            </p>
            <MathBlock
              tex={String.raw`\frac{{\color{#22d3ee}x}}{3}=4`}
              className="math-center math-lg text-white/90"
            />
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              The variable is being divided by 3, so multiply both sides by 3.
            </p>
            <MathBlock
              tex={String.raw`\begin{aligned}
3\cdot\frac{{\color{#22d3ee}x}}{3} &= 4\cdot 3 \\[0.55em]
{\color{#22d3ee}x} &= 12
\end{aligned}`}
              className="math-center math-lg text-white/90"
            />
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Again, the balancing rule stays the same even though the surface appearance looks different.
            </p>
          </section>
        </section>
      </section>

      <section id="rearranging" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Rearranging expressions
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Rearranging an equation means rewriting it so that a different symbol
          is isolated. This is often called making that symbol the{" "}
          <span className="text-white font-semibold">subject</span> of the formula.
        </p>
        <MathBlock
          tex={String.raw`{\color{#f472b6}y}=2{\color{#22d3ee}x}+1`}
          className="math-center math-lg text-white/90"
        />

        <section id="solve-for-symbol" className="scroll-mt-28 grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Solving for a different symbol
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Suppose we want to make{" "}
            <MathInline tex={String.raw`{\color{#22d3ee}x}`} className="math-inline math-white" /> the subject
            instead of <MathInline tex={String.raw`{\color{#f472b6}y}`} className="math-inline math-white" />.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Start with:
          </p>
          <MathBlock
            tex={String.raw`{\color{#f472b6}y}=2{\color{#22d3ee}x}+1`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            First subtract 1 from both sides. Then divide both sides by 2. The
            full chain looks like this:
          </p>
          <MathBlock
            tex={String.raw`\begin{aligned}
{\color{#f472b6}y} &= 2{\color{#22d3ee}x}+1 \\[0.55em]
{\color{#f472b6}y}-1 &= 2{\color{#22d3ee}x} \\[0.55em]
\frac{{\color{#f472b6}y}-1}{2} &= {\color{#22d3ee}x} \\[0.55em]
{\color{#22d3ee}x} &= \frac{{\color{#f472b6}y}-1}{2}
\end{aligned}`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            This is still the same equation. It has simply been rearranged into
            a more useful form.
          </p>
        </section>

        <section className="grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            A grouped example
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Now consider:
          </p>
          <MathBlock
            tex={String.raw`3({\color{#22d3ee}x}+2)=15`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            The entire bracket is being multiplied by 3, so first divide both
            sides by 3.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            This is often the cleanest first move, because it treats{" "}
            <MathInline tex={String.raw`({\color{#22d3ee}x}+2)`} className="math-inline math-white" /> as
            one grouped object.
          </p>
          <MathBlock
            tex={String.raw`\begin{aligned}
3({\color{#22d3ee}x}+2) &= 15 \\[0.55em]
\frac{3({\color{#22d3ee}x}+2)}{3} &= \frac{15}{3} \\[0.55em]
{\color{#22d3ee}x}+2 &= 5
\end{aligned}`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Now subtract 2 from both sides.
          </p>
          <MathBlock
            tex={String.raw`\begin{aligned}
{\color{#22d3ee}x}+2 &= 5 \\[0.55em]
{\color{#22d3ee}x}+2-2 &= 5-2 \\[0.55em]
{\color{#22d3ee}x} &= 3
\end{aligned}`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            This is a good reminder that grouped expressions should be handled
            as one unit before you move inside them.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            There is also another valid route: we can multiply out the brackets first.
          </p>
          <MathBlock
            tex={String.raw`\begin{aligned}
3({\color{#22d3ee}x}+2) &= 15 \\[0.55em]
3{\color{#22d3ee}x}+6 &= 15
\end{aligned}`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Then subtract 6 from both sides.
          </p>
          <MathBlock
            tex={String.raw`\begin{aligned}
3{\color{#22d3ee}x}+6 &= 15 \\[0.55em]
3{\color{#22d3ee}x}+6-6 &= 15-6 \\[0.55em]
3{\color{#22d3ee}x} &= 9
\end{aligned}`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Finally divide both sides by 3.
          </p>
          <MathBlock
            tex={String.raw`\begin{aligned}
\frac{3{\color{#22d3ee}x}}{3} &= \frac{9}{3} \\[0.55em]
{\color{#22d3ee}x} &= 3
\end{aligned}`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Both methods are correct. The first keeps the bracket intact for longer,
            and the second expands it immediately.
          </p>
        </section>
      </section>

      <section id="checking" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Checking solutions
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          A solution is not just something we declare. We can test it by
          substituting it back into the original equation.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          For example, if we solved{" "}
          <MathInline tex={String.raw`{\color{#22d3ee}x}+3=8`} className="math-inline math-white" /> and found{" "}
          <MathInline tex={String.raw`{\color{#22d3ee}x}=5`} className="math-inline math-white" />, then check:
        </p>
        <MathBlock
          tex={String.raw`{\color{#22d3ee}x}+3=8`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Substitute <MathInline tex={String.raw`{\color{#22d3ee}5}`} className="math-inline math-white" /> for{" "}
          <MathInline tex={String.raw`{\color{#22d3ee}x}`} className="math-inline math-white" />:
        </p>
        <MathBlock
          tex={String.raw`\begin{aligned}
({\color{#22d3ee}5})+3 &= 8 \\[0.55em]
8 &= 8
\end{aligned}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Because the result is true, the solution checks out.
        </p>

        <section id="mistakes" className="scroll-mt-28 grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Common mistakes
          </h3>
          <div className="ml-8 overflow-x-auto">
            <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
              <tbody>
                <tr>
                  <td className="w-12 py-2 text-center text-lg">{"\u274C"}</td>
                  <td className="py-2">Changing one side of the equation without making the same balancing change on the other side.</td>
                </tr>
                <tr>
                  <td className="w-12 py-2 text-center text-lg">{"\u274C"}</td>
                  <td className="py-2">Undoing operations in the wrong order when brackets or multiple steps are involved.</td>
                </tr>
                <tr>
                  <td className="w-12 py-2 text-center text-lg">{"\u274C"}</td>
                  <td className="py-2">Treating <MathInline tex={String.raw`3({\color{#22d3ee}x}+2)`} className="math-inline math-white" /> as if only the <MathInline tex={String.raw`{\color{#22d3ee}x}`} className="math-inline math-white" /> were multiplied by 3.</td>
                </tr>
                <tr>
                  <td className="w-12 py-2 text-center text-lg">{"\u274C"}</td>
                  <td className="py-2">Stopping too early and forgetting to check whether the solution really satisfies the original equation.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </section>

      <section id="bridge" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Linear algebra bridge
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          These algebra habits matter later because linear algebra is full of
          equations that have to be manipulated carefully.
        </p>
        <MathBlock
          tex={String.raw`A{\color{#22d3ee}x}={\color{#f472b6}b}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          You do not need to understand that matrix equation yet. The bridge is
          simpler: if you already know how to keep both sides balanced, isolate
          a symbol, and respect grouped structure, then later equation-solving
          in linear algebra will feel like an extension of familiar habits.
        </p>
        <ul className="ml-6 grid gap-3 text-base leading-7 text-[color:var(--color-muted)]">
          <li className="flex items-start gap-3">
            <span className="pt-0.5 text-white">{"\u2022"}</span>
            <span>
              <span className="text-white font-semibold">solving equations</span> trains you to isolate an unknown carefully
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="pt-0.5 text-white">{"\u2022"}</span>
            <span>
              <span className="text-white font-semibold">rearranging formulas</span> trains you to rewrite a statement without changing its meaning
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="pt-0.5 text-white">{"\u2022"}</span>
            <span>
              <span className="text-white font-semibold">checking solutions</span> trains you to verify, not just assume
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="pt-0.5 text-white">{"\u2022"}</span>
            <span>
              <span className="text-white font-semibold">linear algebra</span> later applies the same balance-and-structure thinking on a larger scale
            </span>
          </li>
        </ul>
      </section>

      <section id="summary" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Summary
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Solving equations is mostly about undoing operations carefully while
          keeping equality true from one step to the next.
        </p>
        <div className="ml-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr>
                <td className="w-12 py-2 text-center text-lg">{"\u2705"}</td>
                <td className="py-2">To solve an equation, isolate the variable by undoing the operations attached to it.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">{"\u2705"}</td>
                <td className="py-2">Whatever you do to one side, do to the other side as well.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">{"\u2705"}</td>
                <td className="py-2">Rearranging a formula means rewriting it so a different symbol becomes the subject.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">{"\u2705"}</td>
                <td className="py-2">Grouped expressions should be handled as one unit before you move inside them.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">{"\u2705"}</td>
                <td className="py-2">A good habit is to substitute the answer back in and check that the original equation still works.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The next natural lesson is <span className="text-white font-semibold">sigma notation and basic mathematical notation</span>,
          because that extends this fluency into the compact symbols that appear
          constantly in later mathematics and linear algebra.
        </p>
      </section>
    </ArticleLayout>
  );
}
