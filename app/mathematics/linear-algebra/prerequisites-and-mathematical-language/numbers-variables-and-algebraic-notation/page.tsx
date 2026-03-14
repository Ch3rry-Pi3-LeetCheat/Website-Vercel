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
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "intro", label: "Introduction" },
    { id: "why", label: "Why this topic comes first", level: 2 },
    { id: "numbers", label: "Numbers" },
    { id: "variables", label: "Variables" },
    { id: "variable-roles", label: "Three roles for variables", level: 2 },
    { id: "graph-intuition", label: "Graph intuition", level: 2 },
    { id: "expressions", label: "Expressions" },
    { id: "structure", label: "Reading structure and grouping", level: 2 },
    { id: "worked-example", label: "Worked substitution example", level: 2 },
    { id: "notation", label: "Common notation habits", level: 2 },
    { id: "equations", label: "Equations" },
    { id: "balancing-example", label: "A first balancing example", level: 2 },
    { id: "mistakes", label: "Common mistakes", level: 2 },
    { id: "why-la", label: "Linear algebra bridge" },
    { id: "summary", label: "Summary", level: 2 },
  ];

  return (
    <ArticleLayout
      eyebrow="Mathematics - Linear Algebra - Prerequisites"
      title="Numbers, variables, and algebraic notation"
      description="Before vectors and matrices, the symbols themselves need to feel readable. This lesson builds that base carefully: what numbers represent, what variables do, how expressions are evaluated, how equations are interpreted, and why this symbolic fluency matters for every later page in linear algebra."
      descriptionClassName="!max-w-none"
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
          deeper problem is actually smaller: <span className="text-white font-semibold">the notation still feels foreign</span>.
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
        <div className="ml-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Numbers</td>
                <td className="py-2">How fixed values behave inside mathematical expressions.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Variables</td>
                <td className="py-2">How letters stand for unknown, changing, or general values, and how changing inputs lead to changing outputs.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Expressions</td>
                <td className="py-2">How to read structure, substitute values, evaluate carefully, and get comfortable with compact notation.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Equations</td>
                <td className="py-2">What equality means, why both sides must stay balanced, and the common mistakes to avoid.</td>
              </tr>
              <tr>
                <td className="w-56 py-2 pr-4 font-semibold text-white">Linear algebra bridge</td>
                <td className="py-2">How this notation becomes the language of vectors, matrices, and transformations.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </InfoPanel>

      <InfoPanel id="why" title="Why this topic comes first" variant="intuition" headingLevel={3}>
        <p>
          Later in the track you will see expressions such as:
        </p>
        <MathBlock
          tex={String.raw`A{\color{#22d3ee}x}={\color{#f472b6}b},\qquad {\color{#22d3ee}x}\in\mathbb{R}^n,\qquad 3{\color{#22d3ee}u}+2{\color{#f472b6}v},\qquad \lambda{\color{#22d3ee}v}`}
          className="math-center math-lg text-white/90"
        />
        <p>
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
          Numbers
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          A number is just a value. It might represent a count, a distance, a
          coordinate, a score, a probability, or a scaling factor. But in
          algebra, the main question is not only what the number means in a
          story. The main question is <span className="text-white font-semibold">what role it is playing inside the expression</span>.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          It also helps to say one simple thing very explicitly:{" "}
          <MathInline tex={String.raw`3{\color{#22d3ee}x}`} className="math-inline math-white" /> means
          {" "}three lots of <MathInline tex={String.raw`{\color{#22d3ee}x}`} className="math-inline math-white" />.
          In other words:
        </p>
        <MathBlock
          tex={String.raw`3{\color{#22d3ee}x}={\color{#22d3ee}x}+{\color{#22d3ee}x}+{\color{#22d3ee}x}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          A beginner-friendly picture is apples. If one{" "}
          <span
            role="img"
            aria-label="apple"
            className="relative -top-0.5 inline-flex align-middle text-2xl leading-none"
          >
            🍎
          </span>{" "}
          stands for one{" "}
          <MathInline tex={String.raw`{\color{#22d3ee}x}`} className="math-inline math-white" />,
          then <MathInline tex={String.raw`3{\color{#22d3ee}x}`} className="math-inline math-white" />
          {" "}is just three apples:{" "}
          <span
            role="img"
            aria-label="three apples"
            className="relative -top-0.5 inline-flex align-middle text-2xl leading-none"
          >
            🍎🍎🍎
          </span>
          .
        </p>
        <div className="ml-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr>
                <td className="w-40 py-2 pr-4 text-center font-semibold text-white">Example</td>
                <td className="py-2 font-semibold text-white">How the number is functioning</td>
              </tr>
              <tr>
                <td className="py-2 text-center text-white">
                  <MathInline tex={String.raw`3+5`} className="math-inline math-white" />
                </td>
                <td className="py-2">Two fixed values are being combined.</td>
              </tr>
              <tr>
                <td className="py-2 text-center text-white">
                  <MathInline tex={String.raw`4{\color{#22d3ee}x}`} className="math-inline math-white" />
                </td>
                <td className="py-2">The number 4 is a coefficient or scale factor on the variable.</td>
              </tr>
              <tr>
                <td className="py-2 text-center text-white">
                  <MathInline tex={String.raw`{\color{#22d3ee}x}+7`} className="math-inline math-white" />
                </td>
                <td className="py-2">The number 7 is a fixed offset being added.</td>
              </tr>
              <tr>
                <td className="py-2 text-center text-white">
                  <MathInline tex={String.raw`\frac{{\color{#22d3ee}x}}{2}`} className="math-inline math-white" />
                </td>
                <td className="py-2">The number 2 acts as a divisor.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This matters because linear algebra constantly uses numbers as
          coefficients, coordinates, weights, and scaling values. For now, you
          do <span className="text-white font-semibold">not</span> need to know what a vector is. The immediate
          lesson is simpler: numbers do not just sit there as labels. They can
          tell you how strongly something is being multiplied, shifted, or
          scaled inside the expression.
        </p>
      </section>

      <section id="variables" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Variables
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
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          For example, if <MathInline tex={String.raw`{\color{#22d3ee}x}=5`} className="math-inline math-white" />, then we
          substitute that value into the expression:
        </p>
        <MathBlock
          tex={String.raw`\begin{aligned}
{\color{#22d3ee}x}+3 &= {\color{#22d3ee}5}+3 \\
&= 8
\end{aligned}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This is the key beginner point: <span className="text-white font-semibold">a variable is not mysterious</span>.
          It is just a compact symbol that lets us talk about values before we
          pin them down.
        </p>
      </section>

      <section id="variable-roles" className="scroll-mt-28 grid gap-4">
        <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
          Three common roles for a variable
        </h3>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          A beginner-friendly way to think about variables is that they usually
          appear in one of three roles.
        </p>

        <section className="grid gap-3">
          <h4 className="text-lg font-semibold text-white">1. Unknown value</h4>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Sometimes the variable stands for a value we are trying to find. A
            simple example is:
          </p>
          <MathBlock
            tex={String.raw`{\color{#22d3ee}x}+3=8`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Here we are solving for <MathInline tex={String.raw`{\color{#22d3ee}x}`} className="math-inline math-white" />.
            In plain English, this means: what number, when 3 is added to it,
            gives 8?
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            An everyday version would be: you bought something and then paid a
            &pound;3 delivery fee, making the total &pound;8. The unknown cost of the
            item itself is the variable.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            A quick numerical check helps here. If the item cost were{" "}
            <MathInline tex={String.raw`5`} className="math-inline math-white" />,
            then the total would be:
          </p>
          <MathBlock
            tex={String.raw`5+3=8`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            So in this case the unknown value must be{" "}
            <MathInline tex={String.raw`{\color{#22d3ee}x}=5`} className="math-inline math-white" />.
          </p>
        </section>

        <section className="grid gap-3">
          <h4 className="text-lg font-semibold text-white">2. Changing value</h4>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Sometimes the variable is allowed to change, and we want to study
            what happens to another quantity when it does. For example:
          </p>
          <MathBlock
            tex={String.raw`{\color{#f472b6}y}=2{\color{#22d3ee}x}`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Here we are interested in how{" "}
            <MathInline tex={String.raw`{\color{#f472b6}y}`} className="math-inline math-white" /> changes as{" "}
            <MathInline tex={String.raw`{\color{#22d3ee}x}`} className="math-inline math-white" /> increases or decreases.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            A very ordinary example is hourly pay. If you earn &pound;2 per hour,
            then the total money earned depends on how many hours you work. The
            hours can vary, so the variable tracks that changing input.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            We can make that concrete with a couple of simple values.
            In the first example, we will use{" "}
            <MathInline tex={String.raw`{\color{#22d3ee}x}=1`} className="math-inline math-white" />:
          </p>
          <MathBlock
            tex={String.raw`{\color{#22d3ee}x}=1\Rightarrow {\color{#f472b6}y}=2({\color{#22d3ee}1})=2`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            As a second example, we will use{" "}
            <MathInline tex={String.raw`{\color{#22d3ee}x}=4`} className="math-inline math-white" />:
          </p>
          <MathBlock
            tex={String.raw`{\color{#22d3ee}x}=4\Rightarrow {\color{#f472b6}y}=2({\color{#22d3ee}4})=8`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            The rule stays the same. Only the input changes, and the output changes with it.
          </p>
        </section>

        <section className="grid gap-3">
          <h4 className="text-lg font-semibold text-white">3. General value</h4>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Sometimes we use variables because we want to state a general rule,
            not because we are solving one specific numerical problem.
          </p>
          <MathBlock
            tex={String.raw`{\color{#22d3ee}a}+{\color{#f472b6}b}={\color{#f472b6}b}+{\color{#22d3ee}a}`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            This says that addition works the same way in general: swapping the
            order does not change the result. The letters are not there because
            we care about one special pair of numbers. They are there because we
            want the statement to apply broadly.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            For example, if{" "}
            <MathInline tex={String.raw`{\color{#22d3ee}a}=2`} className="math-inline math-white" /> and{" "}
            <MathInline tex={String.raw`{\color{#f472b6}b}=5`} className="math-inline math-white" />,
            then both sides become the same ordinary sum:
          </p>
          <MathBlock
            tex={String.raw`{\color{#22d3ee}2}+{\color{#f472b6}5}={\color{#f472b6}5}+{\color{#22d3ee}2}=7`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            The general rule is simply saying that this works for any pair of values, not just this one.
          </p>
        </section>
      </section>

      <section id="expressions" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Expressions
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
          tex={String.raw`3{\color{#22d3ee}x},\qquad {\color{#22d3ee}x}+7,\qquad 2{\color{#22d3ee}a}-5{\color{#f472b6}b},\qquad \frac{{\color{#22d3ee}x}+1}{2},\qquad {\color{#22d3ee}y}^2+4{\color{#22d3ee}y}+4`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          To evaluate an expression, substitute values for the variables and
          then compute carefully, respecting the grouping.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          For example, if{" "}
          <MathInline tex={String.raw`{\color{#22d3ee}a}=4`} className="math-inline math-white" /> and{" "}
          <MathInline tex={String.raw`{\color{#f472b6}b}=1`} className="math-inline math-white" />,
          then we can substitute those values into{" "}
          <MathInline tex={String.raw`2{\color{#22d3ee}a}-5{\color{#f472b6}b}`} className="math-inline math-white" />
          {" "}as follows:
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          First replace each letter with its assigned value:
        </p>
        <MathBlock
          tex={String.raw`2{\color{#22d3ee}a}-5{\color{#f472b6}b}=2({\color{#22d3ee}4})-5({\color{#f472b6}1})`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Then carry out the multiplication:
        </p>
        <MathBlock
          tex={String.raw`2({\color{#22d3ee}4})-5({\color{#f472b6}1})={\color{#22d3ee}8}-{\color{#f472b6}5}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Finally subtract:
        </p>
        <MathBlock
          tex={String.raw`8-5=3`}
          className="math-center math-lg text-white/90"
        />

        <section id="structure" className="scroll-mt-28 grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Reading structure and grouping
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Parentheses matter because they show structure. They tell you what is
            grouped together before other operations happen.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            For instance, start with{" "}
            <MathInline tex={String.raw`3({\color{#22d3ee}x}+2)`} className="math-inline math-white" />.
            The parentheses tell us that the addition happens inside the brackets
            as one grouped unit before the outside multiplication is fully
            distributed.
          </p>
          <MathBlock
            tex={String.raw`3({\color{#22d3ee}x}+2)\neq 3{\color{#22d3ee}x}+2`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            The crossed equality sign{" "}
            <MathInline tex={String.raw`\neq`} className="math-inline math-white" /> means
            {" "}“is not equal to”.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            That is because the outside{" "}
            <MathInline tex={String.raw`3`} className="math-inline math-white" /> multiplies the whole bracket, not just the{" "}
            <MathInline tex={String.raw`{\color{#22d3ee}x}`} className="math-inline math-white" />.
          </p>
          <MathBlock
            tex={String.raw`3({\color{#22d3ee}x}+2)=3({\color{#22d3ee}x})+3(2)`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Now distribute the multiplication to each term inside the bracket:
          </p>
          <MathBlock
            tex={String.raw`3({\color{#22d3ee}x})+3(2)=3{\color{#22d3ee}x}+6`}
            className="math-center math-lg text-white/90"
          />
        </section>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This kind of structural reading is extremely important later. In
          linear algebra, expressions such as{" "}
          <MathInline tex={String.raw`A({\color{#22d3ee}x}+{\color{#f472b6}y})`} className="math-inline math-white" />
          {" "}and{" "}
          <MathInline tex={String.raw`A{\color{#22d3ee}x}+A{\color{#f472b6}y}`} className="math-inline math-white" />
          {" "}look similar but are not just visually decorative forms. The
          grouping tells you what operation is happening first.
        </p>

        <section id="worked-example" className="scroll-mt-28 grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            A worked substitution example
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Start with the expression{" "}
            <MathInline tex={String.raw`2{\color{#22d3ee}x}+1`} className="math-inline math-white" />.
            Now suppose <MathInline tex={String.raw`{\color{#22d3ee}x}=3`} className="math-inline math-white" />.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Because <MathInline tex={String.raw`{\color{#22d3ee}x}=3`} className="math-inline math-white" />,
            we replace the <MathInline tex={String.raw`{\color{#22d3ee}x}`} className="math-inline math-white" /> in the expression with{" "}
            <MathInline tex={String.raw`{\color{#22d3ee}3}`} className="math-inline math-white" />.
          </p>
          <MathBlock
            tex={String.raw`2{\color{#22d3ee}x}+1=2({\color{#22d3ee}3})+1`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Next do the multiplication:
          </p>
          <MathBlock
            tex={String.raw`2({\color{#22d3ee}3})+1=6+1`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Then add the final 1:
          </p>
          <MathBlock
            tex={String.raw`6+1=7`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            The idea is simple: once the variable gets a value, the expression
            becomes an ordinary calculation.
          </p>
        </section>

        <section className="grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Another worked example: dividing a grouped expression
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Now take{" "}
            <MathInline tex={String.raw`\frac{{\color{#22d3ee}x}+1}{2}`} className="math-inline math-white" /> and suppose{" "}
            <MathInline tex={String.raw`{\color{#22d3ee}x}=5`} className="math-inline math-white" />.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            First substitute <MathInline tex={String.raw`{\color{#22d3ee}5}`} className="math-inline math-white" /> for{" "}
            <MathInline tex={String.raw`{\color{#22d3ee}x}`} className="math-inline math-white" />:
          </p>
          <MathBlock
            tex={String.raw`\frac{{\color{#22d3ee}x}+1}{2}=\frac{{\color{#22d3ee}5}+1}{2}`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Now simplify the numerator:
          </p>
          <MathBlock
            tex={String.raw`\frac{{\color{#22d3ee}5}+1}{2}=\frac{6}{2}`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Finally divide by 2:
          </p>
          <MathBlock
            tex={String.raw`\frac{6}{2}=3`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            This is a good reminder that grouped expressions should be treated as
            one unit. First evaluate the numerator, then divide by 2.
          </p>
        </section>
      </section>

      <section id="equations" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Equations
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
        <section id="balancing-example" className="scroll-mt-28 grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            A first balancing example
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Solving the equation means finding which value of{" "}
            <MathInline tex={String.raw`{\color{#22d3ee}x}`} className="math-inline math-white" />
            {" "}makes that statement true.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            To solve it, we want to get{" "}
            <MathInline tex={String.raw`{\color{#22d3ee}x}`} className="math-inline math-white" />
            {" "}by itself on the left-hand side.
          </p>
          <MathBlock
            tex={String.raw`{\color{#22d3ee}x}+3=8`}
            className="math-center math-lg text-white/90"
          />

          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            At the moment there is a{" "}
            <MathInline tex={String.raw`+3`} className="math-inline math-white" /> attached to the left-hand side,
            so we subtract 3 from the left-hand side.
          </p>
          <MathBlock
            tex={String.raw`{\color{#22d3ee}x}+3-3`}
            className="math-center math-lg text-white/90"
          />

          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            However, whatever we do on one side, we must do on the other side as
            well. Otherwise the equality would no longer hold.
          </p>
          <MathBlock
            tex={String.raw`{\color{#22d3ee}x}+3-3=8-3`}
            className="math-center math-lg text-white/90"
          />

          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Now simplify both sides.
          </p>
          <MathBlock
            tex={String.raw`8-3=5`}
            className="math-center math-lg text-white/90"
          />
          <MathBlock
            tex={String.raw`{\color{#22d3ee}x}=5`}
            className="math-center math-lg text-white/90"
          />
        </section>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This balancing habit becomes essential later when solving systems of
          equations, performing elimination, and interpreting matrix equations.
        </p>
      </section>

      <section id="graph-intuition" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Graph intuition: a changing variable produces a changing output
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Once substitution feels comfortable, the next step is to notice that
          some expressions do not produce just one answer. They produce a
          different output each time the input changes.
        </p>
        <MathBlock
          tex={String.raw`{\color{#f472b6}y}=2{\color{#22d3ee}x}`}
          className="math-center math-lg text-white/90"
        />
        <section className="grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            From a rule to specific values
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            This says that the output{" "}
            <MathInline tex={String.raw`{\color{#f472b6}y}`} className="math-inline math-white" />
            {" "}depends on the input{" "}
            <MathInline tex={String.raw`{\color{#22d3ee}x}`} className="math-inline math-white" />.
            We can see that by trying a few simple values one at a time.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Start with <MathInline tex={String.raw`{\color{#22d3ee}x}=0`} className="math-inline math-white" />.
            Then:
          </p>
          <MathBlock
            tex={String.raw`{\color{#f472b6}y}=2({\color{#22d3ee}0})=0`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Now try <MathInline tex={String.raw`{\color{#22d3ee}x}=1`} className="math-inline math-white" />:
          </p>
          <MathBlock
            tex={String.raw`{\color{#f472b6}y}=2({\color{#22d3ee}1})=2`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            And if <MathInline tex={String.raw`{\color{#22d3ee}x}=3`} className="math-inline math-white" />, then:
          </p>
          <MathBlock
            tex={String.raw`{\color{#f472b6}y}=2({\color{#22d3ee}3})=6`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            The rule stays the same while the input changes. That is the key
            idea behind a graph: one rule, many input-output pairs.
          </p>
        </section>

        <section className="grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            A second rule with the same input
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            We can do the same thing with a different rule. For example, consider{" "}
            <MathInline tex={String.raw`{\color{#f472b6}y}={\color{#22d3ee}x}+2`} className="math-inline math-white" />.
            The input is still{" "}
            <MathInline tex={String.raw`{\color{#22d3ee}x}`} className="math-inline math-white" />, but the rule has changed,
            so the output will change in a different way.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Start with <MathInline tex={String.raw`{\color{#22d3ee}x}=0`} className="math-inline math-white" />.
            Then:
          </p>
          <MathBlock
            tex={String.raw`{\color{#f472b6}y}=({\color{#22d3ee}0})+2=2`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Now try <MathInline tex={String.raw`{\color{#22d3ee}x}=1`} className="math-inline math-white" />:
          </p>
          <MathBlock
            tex={String.raw`{\color{#f472b6}y}=({\color{#22d3ee}1})+2=3`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            And if <MathInline tex={String.raw`{\color{#22d3ee}x}=3`} className="math-inline math-white" />, then:
          </p>
          <MathBlock
            tex={String.raw`{\color{#f472b6}y}=({\color{#22d3ee}3})+2=5`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            This is useful because it shows that the same input can be fed into
            two different rules and produce two different outputs.
          </p>
        </section>

        <section className="grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            From specific values to a picture
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            If we plot those input-output pairs on axes, we get a visual picture
            of the rule. We can even plot two different rules on the same axes
            and compare them directly.
          </p>
          <AlgebraStaticVisual
            variant="line-graph"
            framed={false}
            caption="Both rules use the same input axis. The blue line shows how y = 2x responds, while the orange line shows how y = x + 2 responds."
          />
        </section>

        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This matters because later in linear algebra, relationships between
          variables are often written compactly. If you already understand that a
          symbolic rule describes how outputs depend on inputs, matrix equations
          will feel much more natural.
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
        <div className="ml-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr>
                <td className="w-40 py-2 pr-4 text-center font-semibold text-white">Notation</td>
                <td className="py-2 font-semibold text-white">Meaning</td>
              </tr>
              <tr>
                <td className="py-2 text-center text-white">
                  <MathInline tex={String.raw`4{\color{#22d3ee}x}`} className="math-inline math-white" />
                </td>
                <td className="py-2">
                  Means{" "}
                  <MathInline tex={String.raw`4{\color{#22d3ee}x}`} className="math-inline math-white" />{" "}
                  which is 4 multiplied by{" "}
                  <MathInline tex={String.raw`{\color{#22d3ee}x}`} className="math-inline math-white" />.
                  The multiplication sign is omitted.
                </td>
              </tr>
              <tr>
                <td className="py-2 text-center text-white">
                  <MathInline tex={String.raw`{\color{#22d3ee}x}^2`} className="math-inline math-white" />
                </td>
                <td className="py-2">
                  Means{" "}
                  <MathInline tex={String.raw`{\color{#22d3ee}x}^2`} className="math-inline math-white" />{" "}
                  which is{" "}
                  <MathInline tex={String.raw`{\color{#22d3ee}x}\cdot{\color{#22d3ee}x}`} className="math-inline math-white" />.
                </td>
              </tr>
              <tr>
                <td className="py-2 text-center text-white">
                  <MathInline tex={String.raw`\frac{{\color{#22d3ee}x}+1}{2}`} className="math-inline math-white" />
                </td>
                <td className="py-2">
                  The entire quantity{" "}
                  <MathInline tex={String.raw`{\color{#22d3ee}x}+1`} className="math-inline math-white" />{" "}
                  is divided by{" "}
                  <MathInline tex={String.raw`2`} className="math-inline math-white" />.
                </td>
              </tr>
              <tr>
                <td className="py-2 text-center text-white">
                  <MathInline tex={String.raw`-{\color{#22d3ee}x}`} className="math-inline math-white" />
                </td>
                <td className="py-2">
                  The negative of{" "}
                  <MathInline tex={String.raw`{\color{#22d3ee}x}`} className="math-inline math-white" />,
                  not a completely separate symbol.
                </td>
              </tr>
              <tr>
                <td className="py-2 text-center text-white">
                  <MathInline tex={String.raw`{\color{#22d3ee}a}{\color{#f472b6}b}`} className="math-inline math-white" />
                </td>
                <td className="py-2">
                  Means{" "}
                  <MathInline tex={String.raw`{\color{#22d3ee}a}\cdot{\color{#f472b6}b}`} className="math-inline math-white" />{" "}
                  when the letters{" "}
                  <MathInline tex={String.raw`{\color{#22d3ee}a}`} className="math-inline math-white" />{" "}
                  and{" "}
                  <MathInline tex={String.raw`{\color{#f472b6}b}`} className="math-inline math-white" />{" "}
                  are written side by side.
                </td>
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
        <div className="ml-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr>
                <td className="w-12 py-2 text-center text-lg">&#10060;</td>
                <td className="py-2">
                  Treating a variable such as{" "}
                  <MathInline tex={String.raw`{\color{#22d3ee}x}`} className="math-inline math-white" />{" "}
                  as if it already has a fixed value when none has been assigned.
                </td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">&#10060;</td>
                <td className="py-2">
                  Reading{" "}
                  <MathInline tex={String.raw`4{\color{#22d3ee}x}`} className="math-inline math-white" />{" "}
                  as if it were a two-character name instead of 4 times{" "}
                  <MathInline tex={String.raw`{\color{#22d3ee}x}`} className="math-inline math-white" />.
                </td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">&#10060;</td>
                <td className="py-2">
                  Ignoring parentheses and accidentally changing the structure of
                  an expression such as{" "}
                  <MathInline tex={String.raw`3({\color{#22d3ee}x}+2)`} className="math-inline math-white" />.
                </td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">&#10060;</td>
                <td className="py-2">
                  Changing one side of an equation such as{" "}
                  <MathInline tex={String.raw`{\color{#22d3ee}x}+3=8`} className="math-inline math-white" />{" "}
                  without making the matching change on the other side.
                </td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">&#10060;</td>
                <td className="py-2">
                  Thinking notation such as{" "}
                  <MathInline tex={String.raw`{\color{#22d3ee}x},\ {\color{#f472b6}y},\ 4{\color{#22d3ee}x}`} className="math-inline math-white" />{" "}
                  is the idea itself, rather than a compact language for
                  describing the idea.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="why-la" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Linear algebra bridge
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This lesson may look elementary, but it is doing foundational work for
          the whole track.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          In linear algebra, you constantly meet expressions such as:
        </p>
        <MathBlock
          tex={String.raw`3{\color{#22d3ee}u}+2{\color{#f472b6}v},\qquad A{\color{#22d3ee}x}={\color{#f472b6}b},\qquad {\color{#22d3ee}x}_1+{\color{#22d3ee}x}_2,\qquad \lambda{\color{#22d3ee}v}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          To understand those later, you need to already be comfortable with:
        </p>
        <div className="ml-6 grid gap-2 text-base leading-7 text-[color:var(--color-muted)]">
          <p>
            <span className="text-white font-semibold">variables</span> as placeholders for values or objects
          </p>
          <p className="ml-6">
            Example: in <MathInline tex={String.raw`{\color{#22d3ee}x}+3`} className="math-inline math-white" />, the symbol{" "}
            <MathInline tex={String.raw`{\color{#22d3ee}x}`} className="math-inline math-white" /> is standing in for a value we have not fixed yet.
          </p>
          <p>
            <span className="text-white font-semibold">coefficients</span> as numbers that scale those objects
          </p>
          <p className="ml-6">
            Example: in <MathInline tex={String.raw`3{\color{#22d3ee}u}`} className="math-inline math-white" />, the 3 tells you the object{" "}
            <MathInline tex={String.raw`{\color{#22d3ee}u}`} className="math-inline math-white" /> is being scaled by 3.
          </p>
          <p>
            <span className="text-white font-semibold">grouping</span> as a signal of structure
          </p>
          <p className="ml-6">
            Example: <MathInline tex={String.raw`A({\color{#22d3ee}x}+{\color{#f472b6}y})`} className="math-inline math-white" /> tells you to treat{" "}
            <MathInline tex={String.raw`{\color{#22d3ee}x}+{\color{#f472b6}y}`} className="math-inline math-white" /> as one grouped quantity first.
          </p>
          <p>
            <span className="text-white font-semibold">equations</span> as statements that must remain balanced
          </p>
          <p className="ml-6">
            Example: in <MathInline tex={String.raw`{\color{#22d3ee}x}+3=8`} className="math-inline math-white" />, if you subtract 3 from the left-hand side,
            you must also subtract 3 from the right-hand side.
          </p>
        </div>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          So this first page is not a warm-up to skip. It is the symbolic
          foundation of the subject.
        </p>
      </section>

      <section id="summary" className="scroll-mt-28 grid gap-4">
        <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
          Summary
        </h3>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The main lesson is not just a set of definitions. It is a way of
          reading mathematics more calmly and more structurally.
        </p>
        <div className="ml-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">Numbers provide fixed values and often act as coefficients, offsets, or divisors.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">Variables are symbols for values that may be unknown, changing, or general.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">Expressions become concrete once values are substituted, but their grouping must be respected.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">Equations assert equality, so valid algebra must preserve the balance between both sides.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
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
