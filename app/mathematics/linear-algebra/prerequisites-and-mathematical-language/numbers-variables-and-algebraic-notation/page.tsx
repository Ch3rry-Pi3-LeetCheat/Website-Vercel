import type { Metadata } from "next";
import ArticleLayout from "@/components/ArticleLayout";
import InfoPanel from "@/components/InfoPanel";
import RightRail from "@/components/RightRail";
import { MathBlock, MathInline } from "@/components/Math";
import AlgebraStaticVisual from "@/components/math/AlgebraStaticVisual";
import {
  linearAlgebraPhases,
  linearAlgebraPrerequisiteLessons,
} from "@/lib/mathTopics";

export const metadata: Metadata = {
  title: "Numbers, Variables, and Algebraic Notation",
  description:
    "The first linear algebra prerequisite lesson: how to read symbols, evaluate expressions, and interpret basic algebra cleanly.",
};

export default function NumbersVariablesAlgebraicNotationPage() {
  const tocItems = [
    { id: "intro", label: "Introduction" },
    { id: "why", label: "Why this topic comes first" },
    { id: "numbers", label: "What numbers are doing" },
    { id: "variables", label: "What a variable means" },
    { id: "expressions", label: "Expressions and substitution" },
    { id: "graph-intuition", label: "Graph intuition" },
    { id: "equations", label: "Equations and equality" },
    { id: "notation", label: "Common notation habits" },
    { id: "mistakes", label: "Common mistakes" },
    { id: "why-la", label: "Why this matters for linear algebra" },
    { id: "summary", label: "Summary" },
  ];

  return (
    <ArticleLayout
      eyebrow="Mathematics - Linear Algebra - Prerequisites"
      title="Numbers, variables, and algebraic notation"
      description="Before vectors and matrices, the symbols themselves need to feel readable. This lesson builds that base carefully: what numbers represent, what variables do, how expressions are evaluated, how equations are interpreted, and why this symbolic fluency matters for every later page in linear algebra."
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Linear Algebra phases", links: linearAlgebraPhases },
            { title: "Within this phase", links: linearAlgebraPrerequisiteLessons },
          ]}
          activeHref="/mathematics/linear-algebra/prerequisites-and-mathematical-language/numbers-variables-and-algebraic-notation"
        />
      }
    >
      <InfoPanel id="intro" title="Introduction" variant="intro">
        <p>
          A lot of people think they are struggling with mathematics when the
          deeper problem is actually simpler: <span className="text-white font-semibold">the notation still feels foreign</span>.
          If every expression feels like a code to decode, then even easy ideas
          feel harder than they really are.
        </p>
        <p>
          That is why this lesson comes first. The goal is not advanced theory.
          The goal is to make mathematical writing feel readable. Once symbols
          stop creating friction, the later ideas in linear algebra become much
          more approachable.
        </p>
        <p>Here is the roadmap for this lesson:</p>
        <div className="ml-4 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Numbers</td>
                <td className="py-2">How fixed values behave inside mathematical expressions.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Variables</td>
                <td className="py-2">How letters stand for unknown, changing, or general values.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Expressions</td>
                <td className="py-2">How to read structure, substitute values, and evaluate carefully.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Equations</td>
                <td className="py-2">What equality means and why both sides must stay balanced.</td>
              </tr>
              <tr>
                <td className="w-56 py-2 pr-4 font-semibold text-white">Linear algebra bridge</td>
                <td className="py-2">How this notation becomes the language of vectors, matrices, and transformations.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </InfoPanel>

      <InfoPanel id="why" title="Why this topic comes first" variant="intuition">
        <p>
          Later in the track you will see expressions such as{" "}
          <MathInline tex={String.raw`A{\color{#22d3ee}x}={\color{#86efac}b}`} className="math-inline math-white" />,
          {" "}<MathInline tex={String.raw`{\color{#22d3ee}x}\in\mathbb{R}^n`} className="math-inline math-white" />,
          {" "}<MathInline tex={String.raw`3{\color{#22d3ee}u}+2{\color{#fbbf24}v}`} className="math-inline math-white" />,
          and{" "}
          <MathInline tex={String.raw`\lambda{\color{#22d3ee}v}`} className="math-inline math-white" />.
          Those are not difficult because the universe suddenly changed. They
          are difficult only if letters, coefficients, grouping, and equality
          are still unstable in your head.
        </p>
        <p>
          So this page is doing something very practical. It is removing the
          symbolic friction that would otherwise slow down every later lesson.
        </p>
      </InfoPanel>

      <section id="numbers" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          What numbers are doing
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          A number is just a value. It might represent a count, a distance, a
          coordinate, a score, a probability, or a scaling factor. But in
          algebra, the main question is not only what the number means in a
          story. The main question is <span className="text-white font-semibold">what role it is playing inside the expression</span>.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr className="border-b border-white/10">
                <td className="w-40 py-2 pr-4 font-semibold text-white">Example</td>
                <td className="py-2">How the number is functioning</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 text-white">3 + 5</td>
                <td className="py-2">Two fixed values are being combined.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 text-white">4x</td>
                <td className="py-2">The number 4 is a coefficient or scale factor on the variable.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 text-white">x + 7</td>
                <td className="py-2">The number 7 is a fixed offset being added.</td>
              </tr>
              <tr>
                <td className="py-2 text-white">x / 2</td>
                <td className="py-2">The number 2 acts as a divisor.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This matters because linear algebra constantly uses numbers as
          coefficients, coordinates, weights, and scaling values. When you later
          see something like{" "}
          <MathInline tex={String.raw`3{\color{#22d3ee}u}-2{\color{#fbbf24}v}`} className="math-inline math-white" />,
          those numbers are not decorative. They are telling you how strongly
          each vector is being scaled before the combination is formed.
        </p>
      </section>

      <section id="variables" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          What a variable means
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          A variable is a symbol, usually a letter, that stands for a value. The
          value may be unknown, may be changing, or may be kept general on
          purpose.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          For example, in{" "}
          <MathInline tex={String.raw`{\color{#22d3ee}x}+3`} className="math-inline math-white" />,
          the symbol <MathInline tex={String.raw`{\color{#22d3ee}x}`} className="math-inline math-white" /> is not yet
          one fixed number. It is a placeholder. Once we assign it a value, the
          expression can be evaluated.
        </p>
        <MathBlock
          tex={String.raw`\text{If } {\color{#22d3ee}x}=5,\quad {\color{#22d3ee}x}+3=5+3=8`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This is the key beginner point: <span className="text-white font-semibold">a variable is not mysterious</span>.
          It is just a compact symbol that lets us talk about values before we
          pin them down.
        </p>
        <div className="glass-panel rounded-2xl p-4 text-base leading-7 text-[color:var(--color-muted)]">
          <p className="font-semibold text-white">Three common roles for a variable</p>
          <p>
            Unknown value: solve{" "}
            <MathInline tex={String.raw`{\color{#22d3ee}x}+3=8`} className="math-inline math-white" /> for{" "}
            <MathInline tex={String.raw`{\color{#22d3ee}x}`} className="math-inline math-white" />.
          </p>
          <p>
            Changing value: study how{" "}
            <MathInline tex={String.raw`{\color{#86efac}y}=2{\color{#22d3ee}x}`} className="math-inline math-white" /> behaves
            as <MathInline tex={String.raw`{\color{#22d3ee}x}`} className="math-inline math-white" /> changes.
          </p>
          <p>
            General value: write a pattern such as{" "}
            <MathInline tex={String.raw`{\color{#fbbf24}a}+{\color{#f472b6}b}={\color{#f472b6}b}+{\color{#fbbf24}a}`} className="math-inline math-white" />
            {" "}without choosing one specific pair of numbers.
          </p>
        </div>

        <AlgebraStaticVisual
          title="Substitution Flow"
          variant="substitution-flow"
          caption="This is the mental model for evaluation: start with a symbol, assign it a value, and let the expression produce an output."
        />
      </section>

      <section id="expressions" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Expressions and substitution
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          An expression is a mathematical phrase. It may contain numbers,
          variables, and operations such as addition, subtraction,
          multiplication, division, and powers.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Examples of expressions include:
        </p>
        <MathBlock
          tex={String.raw`3{\color{#22d3ee}x},\qquad {\color{#22d3ee}x}+7,\qquad 2{\color{#fbbf24}a}-5{\color{#f472b6}b},\qquad \frac{{\color{#22d3ee}x}+1}{2},\qquad {\color{#86efac}y}^2+4{\color{#86efac}y}+4`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          To evaluate an expression, substitute values for the variables and
          then compute carefully, respecting the grouping.
        </p>
        <MathBlock
          tex={String.raw`\text{If } {\color{#fbbf24}a}=4 \text{ and } {\color{#f472b6}b}=1,\quad 2{\color{#fbbf24}a}-5{\color{#f472b6}b}=2(4)-5(1)=8-5=3`}
          className="math-center math-lg text-white/90"
        />

        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Parentheses matter because they show structure. They tell you what is
          grouped together before other operations happen.
        </p>
        <MathBlock
          tex={String.raw`3({\color{#22d3ee}x}+2)\neq 3{\color{#22d3ee}x}+2 \qquad \text{because } 3({\color{#22d3ee}x}+2)=3{\color{#22d3ee}x}+6`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This kind of structural reading is extremely important later. In
          linear algebra, expressions such as{" "}
          <MathInline tex={String.raw`A({\color{#22d3ee}x}+{\color{#fbbf24}y})`} className="math-inline math-white" />
          {" "}and{" "}
          <MathInline tex={String.raw`A{\color{#22d3ee}x}+A{\color{#fbbf24}y}`} className="math-inline math-white" />
          {" "}look similar but are not just visually decorative forms. The
          grouping tells you what operation is happening first.
        </p>

        <div className="glass-panel rounded-2xl p-4 text-base leading-7 text-[color:var(--color-muted)]">
          <p className="font-semibold text-white">A worked substitution example</p>
          <p>
            Start with the expression{" "}
            <MathInline tex={String.raw`2{\color{#22d3ee}x}+1`} className="math-inline math-white" />.
            Now suppose <MathInline tex={String.raw`{\color{#22d3ee}x}=3`} className="math-inline math-white" />.
          </p>
          <MathBlock
            tex={String.raw`\begin{aligned}
2{\color{#22d3ee}x}+1 &= 2(3)+1 \\
&= 6+1 \\
&= 7
\end{aligned}`}
            className="math-center math-lg text-white/90"
          />
          <p>
            The idea is simple: once the variable gets a value, the expression
            becomes an ordinary calculation.
          </p>
        </div>
      </section>

      <section id="graph-intuition" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Graph intuition: a changing variable produces a changing output
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          One of the most useful early intuitions is this: if a variable can
          change, then the output of an expression can change with it. For
          example, consider:
        </p>
        <MathBlock
          tex={String.raw`{\color{#86efac}y}=2{\color{#22d3ee}x}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This says that the output{" "}
          <MathInline tex={String.raw`{\color{#86efac}y}`} className="math-inline math-white" />
          {" "}depends on the input{" "}
          <MathInline tex={String.raw`{\color{#22d3ee}x}`} className="math-inline math-white" />.
          As <MathInline tex={String.raw`{\color{#22d3ee}x}`} className="math-inline math-white" /> changes,
          the value of <MathInline tex={String.raw`{\color{#86efac}y}`} className="math-inline math-white" /> changes too.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr className="border-b border-white/10">
                <td className="w-24 py-2 pr-4 font-semibold text-cyan-300">x</td>
                <td className="w-24 py-2 pr-4 font-semibold text-emerald-300">y</td>
                <td className="py-2">Explanation</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 text-cyan-300">0</td>
                <td className="py-2 text-emerald-300">0</td>
                <td className="py-2">Double 0 to get 0.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 text-cyan-300">1</td>
                <td className="py-2 text-emerald-300">2</td>
                <td className="py-2">Double 1 to get 2.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 text-cyan-300">2</td>
                <td className="py-2 text-emerald-300">4</td>
                <td className="py-2">Double 2 to get 4.</td>
              </tr>
              <tr>
                <td className="py-2 text-cyan-300">3</td>
                <td className="py-2 text-emerald-300">6</td>
                <td className="py-2">Double 3 to get 6.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <AlgebraStaticVisual
          title="Static Graph"
          variant="line-graph"
          caption="This is the first bridge between algebra and graphing: one variable changes, the other responds according to the rule."
        />

        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This matters because later in linear algebra, relationships between
          variables are often written compactly. If you already understand that a
          symbolic rule describes how outputs depend on inputs, matrix equations
          will feel much more natural.
        </p>
      </section>

      <section id="equations" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Equations and equality
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          An equation says that two expressions are equal. It is not just a line
          of symbols separated by an equals sign. It is a claim that the left
          side and right side represent the same value.
        </p>
        <MathBlock
          tex={String.raw`{\color{#22d3ee}x}+3=8`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Solving the equation means finding which value of{" "}
          <MathInline tex={String.raw`{\color{#22d3ee}x}`} className="math-inline math-white" />
          {" "}makes that statement true.
        </p>
        <MathBlock
          tex={String.raw`\begin{aligned}
{\color{#22d3ee}x}+3 &= 8 \\
{\color{#22d3ee}x} &= 5
\end{aligned}`}
          className="math-center math-lg text-white/90"
        />

        <AlgebraStaticVisual
          title="Equality as Balance"
          variant="equation-balance"
          caption="A useful beginner mental model is balance. If the two sides are equal, every valid algebra step must preserve that equality."
        />

        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          A good rule of thumb is: <span className="text-white font-semibold">whatever you do to one side, do to the other side as well</span>.
          That preserves the equality.
        </p>
        <MathBlock
          tex={String.raw`\begin{aligned}
{\color{#22d3ee}x}+3 &= 8 \\
{\color{#22d3ee}x}+3-3 &= 8-3 \\
{\color{#22d3ee}x} &= 5
\end{aligned}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This balancing habit becomes essential later when solving systems of
          equations, performing elimination, and interpreting matrix equations.
        </p>
      </section>

      <section id="notation" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Common notation habits
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Mathematics uses shorthand constantly. That shorthand is efficient, but
          beginners often find it dense because many operations are written
          compactly rather than spelled out.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Notation</td>
                <td className="py-2">Meaning</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 text-white">4x</td>
                <td className="py-2">Means 4 multiplied by x. The multiplication sign is omitted.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 text-white">x^2</td>
                <td className="py-2">Means x multiplied by itself.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 text-white">(x + 1) / 2</td>
                <td className="py-2">The entire quantity x + 1 is divided by 2.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 text-white">-x</td>
                <td className="py-2">The negative of x, not a completely separate symbol.</td>
              </tr>
              <tr>
                <td className="py-2 text-white">ab</td>
                <td className="py-2">Means a multiplied by b when letters are written side by side.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          A large part of early mathematical fluency is simply becoming
          comfortable with this compression. The ideas are usually simpler than
          the notation first makes them appear.
        </p>
      </section>

      <section id="mistakes" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Common mistakes and misconceptions
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr className="border-b border-white/10">
                <td className="w-12 py-2 text-center text-lg">X</td>
                <td className="py-2">Treating a variable as if it already has a fixed value when none has been assigned.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-12 py-2 text-center text-lg">X</td>
                <td className="py-2">Reading 4x as if it were a two-character name instead of 4 times x.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-12 py-2 text-center text-lg">X</td>
                <td className="py-2">Ignoring parentheses and accidentally changing the structure of the expression.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-12 py-2 text-center text-lg">X</td>
                <td className="py-2">Changing one side of an equation without making the matching change on the other side.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">X</td>
                <td className="py-2">Thinking notation is the idea itself, rather than a compact language for describing the idea.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="why-la" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Why this matters for linear algebra
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This lesson may look elementary, but it is doing foundational work for
          the whole track.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          In linear algebra, you constantly meet expressions such as{" "}
          <MathInline tex={String.raw`3{\color{#22d3ee}u}+2{\color{#fbbf24}v}`} className="math-inline math-white" />,
          {" "}<MathInline tex={String.raw`A{\color{#22d3ee}x}={\color{#86efac}b}`} className="math-inline math-white" />,
          {" "}<MathInline tex={String.raw`{\color{#22d3ee}x}_1+{\color{#22d3ee}x}_2`} className="math-inline math-white" />,
          and{" "}
          <MathInline tex={String.raw`\lambda{\color{#22d3ee}v}`} className="math-inline math-white" />.
          To understand those later, you need to already be comfortable with:
        </p>
        <div className="ml-6 grid gap-2 text-base leading-7 text-[color:var(--color-muted)]">
          <p>
            <span className="text-white font-semibold">variables</span> as placeholders for values or objects
          </p>
          <p>
            <span className="text-white font-semibold">coefficients</span> as numbers that scale those objects
          </p>
          <p>
            <span className="text-white font-semibold">grouping</span> as a signal of structure
          </p>
          <p>
            <span className="text-white font-semibold">equations</span> as statements that must remain balanced
          </p>
        </div>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          So this first page is not a warm-up to skip. It is the symbolic
          foundation of the subject.
        </p>
      </section>

      <section id="summary" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Summary
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The main lesson is not just a set of definitions. It is a way of
          reading mathematics more calmly and more structurally.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr className="border-b border-white/10">
                <td className="w-12 py-2 text-center text-lg">1</td>
                <td className="py-2">Numbers provide fixed values and often act as coefficients, offsets, or divisors.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-12 py-2 text-center text-lg">2</td>
                <td className="py-2">Variables are symbols for values that may be unknown, changing, or general.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-12 py-2 text-center text-lg">3</td>
                <td className="py-2">Expressions become concrete once values are substituted, but their grouping must be respected.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-12 py-2 text-center text-lg">4</td>
                <td className="py-2">Equations assert equality, so valid algebra must preserve the balance between both sides.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">5</td>
                <td className="py-2">This fluency is the symbolic base needed before vectors, matrices, and linear transformations can feel natural.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The next natural lesson is <span className="text-white font-semibold">functions, graphs, and mappings</span>,
          because that extends the same symbolic language into input-output rules,
          which is exactly where linear algebra starts becoming geometric.
        </p>
      </section>
    </ArticleLayout>
  );
}
