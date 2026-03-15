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
  title: "Sigma Notation and Basic Mathematical Notation",
  description:
    "Learn sigma notation, indices, and the compact mathematical symbols that appear constantly in linear algebra.",
};

export default function SigmaNotationPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "intro", label: "Introduction" },
    { id: "why", label: "Why this topic comes next", level: 2 },
    { id: "sigma", label: "Sigma notation" },
    { id: "parts-of-sigma", label: "Parts of a sigma expression", level: 2 },
    { id: "sigma-examples", label: "Worked sigma examples", level: 2 },
    { id: "basic-notation", label: "Basic mathematical notation" },
    { id: "indices", label: "Indices, subscripts, and dimensions", level: 2 },
    { id: "reading-compact", label: "Reading compact notation", level: 2 },
    { id: "bridge", label: "Linear algebra bridge" },
    { id: "summary", label: "Summary" },
  ];

  return (
    <ArticleLayout
      eyebrow="Mathematics - Linear Algebra - Prerequisites"
      title="Sigma notation and basic mathematical notation"
      description="Before vectors and matrices arrive, it helps to be fluent with the compact symbols that mathematics uses to save space. This lesson makes sigma notation, subscripts, and common symbolic conventions feel readable rather than intimidating."
      descriptionClassName="!max-w-none"
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Linear Algebra phases", links: linearAlgebraPhases },
            { title: "Within this phase", links: linearAlgebraPrerequisiteLessons },
          ]}
          activeHref="/mathematics/linear-algebra/prerequisites-and-mathematical-language/sigma-notation-and-basic-mathematical-notation"
        />
      }
    >
      <InfoPanel id="intro" title="Introduction" variant="intro">
        <p>
          Up to now, the main focus has been on reading variables, equations,
          functions, and coordinates calmly. This lesson adds one more piece of
          symbolic fluency: <span className="text-white font-semibold">compact notation</span>.
        </p>
        <p>
          Mathematics often writes repeated patterns in a shortened form. That
          saves space, but it can look dense if the notation is still unfamiliar.
          The goal here is to make those short forms readable.
        </p>
        <p>Here is the roadmap for this lesson:</p>
        <div className="ml-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Sigma notation</td>
                <td className="py-2">How repeated addition is compressed into one readable symbol.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Basic mathematical notation</td>
                <td className="py-2">How common symbols such as subscripts, powers, membership, and dimensions are read.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Reading compact notation</td>
                <td className="py-2">How to unpack a short expression into ordinary language step by step.</td>
              </tr>
              <tr>
                <td className="w-56 py-2 pr-4 font-semibold text-white">Linear algebra bridge</td>
                <td className="py-2">How this notation becomes the language of vectors, matrix entries, and dimensions.</td>
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
          By this stage, the beginner problem is usually no longer ordinary
          algebra. The next friction point is that mathematics starts writing
          ideas in a much more compact way.
        </p>
        <MathBlock
          tex={String.raw`\sum_{{\color{#22d3ee}i}=1}^{4} {\color{#22d3ee}i},\qquad x_{\color{#22d3ee}1},\qquad x_{\color{#f472b6}2},\qquad x\in\mathbb{R}^{\color{#22d3ee}n}`}
          className="math-center math-lg text-white/90"
        />
        <p>
          None of those expressions is conceptually mysterious. They are just
          short forms. This page teaches you how to read them without freezing
          when you see them later in linear algebra.
        </p>
      </InfoPanel>

      <section id="sigma" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Sigma notation
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Sigma notation is a compact way of writing a sum. Instead of listing
          every term one by one, we write one pattern and say where the pattern
          starts and stops.
        </p>
        <MathBlock
          tex={String.raw`\sum_{{\color{#22d3ee}i}=1}^{4} {\color{#22d3ee}i} = 1+2+3+4 = 10`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          So the large sigma symbol <MathInline tex={String.raw`\sum`} className="math-inline math-white" /> can
          be read as <span className="text-white font-semibold">add up the terms</span>.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          In everyday terms, this is no different from adding a short list of
          daily totals, quiz scores, or sales numbers. Sigma notation is just a
          compact way of writing that same repeated addition.
        </p>

        <section id="parts-of-sigma" className="scroll-mt-28 grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Parts of a sigma expression
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            For a beginner, the easiest way to read sigma notation is to know
            what each part is doing.
          </p>
          <MathBlock
            tex={String.raw`\sum_{{\color{#22d3ee}i}=1}^{4} {\color{#22d3ee}i}`}
            className="math-center math-lg text-white/90"
          />
          <div className="ml-8 overflow-x-auto">
            <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
              <tbody>
                <tr>
                  <td className="w-48 py-2 pr-4 text-center font-semibold text-white">Part</td>
                  <td className="py-2 font-semibold text-white">Meaning</td>
                </tr>
                <tr>
                  <td className="py-2 text-center text-white">
                    <MathInline tex={String.raw`\sum`} className="math-inline math-white" />
                  </td>
                  <td className="py-2">Add up a list of terms.</td>
                </tr>
                <tr>
                  <td className="py-2 text-center text-white">
                    <MathInline tex={String.raw`{\color{#22d3ee}i}=1`} className="math-inline math-white" />
                  </td>
                  <td className="py-2">Start the index at 1.</td>
                </tr>
                <tr>
                  <td className="py-2 text-center text-white">
                    <MathInline tex={String.raw`4`} className="math-inline math-white" />
                  </td>
                  <td className="py-2">Stop when the index reaches 4.</td>
                </tr>
                <tr>
                  <td className="py-2 text-center text-white">
                    <MathInline tex={String.raw`{\color{#22d3ee}i}`} className="math-inline math-white" />
                  </td>
                  <td className="py-2">This is the term being added each time.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Here the index <MathInline tex={String.raw`{\color{#22d3ee}i}`} className="math-inline math-white" /> is just a counter.
            It moves through the values <MathInline tex={String.raw`1,2,3,4`} className="math-inline math-white" /> and
            the term is evaluated at each one.
          </p>
        </section>

        <section id="sigma-examples" className="scroll-mt-28 grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Worked sigma examples
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            The simplest way to become comfortable with sigma notation is to
            expand it back into an ordinary sum.
          </p>

          <section className="grid gap-3">
            <h4 className="text-lg font-semibold text-white">1. Adding the index itself</h4>
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Start with:
            </p>
            <MathBlock
              tex={String.raw`\sum_{{\color{#22d3ee}i}=1}^{4} {\color{#22d3ee}i}`}
              className="math-center math-lg text-white/90"
            />
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              We let <MathInline tex={String.raw`{\color{#22d3ee}i}`} className="math-inline math-white" /> run through
              the values 1 to 4, and each time the term is just{" "}
              <MathInline tex={String.raw`{\color{#22d3ee}i}`} className="math-inline math-white" />.
            </p>
            <MathBlock
              tex={String.raw`\begin{aligned}
1+2+3+4 &= 10
\end{aligned}`}
              className="math-center math-lg text-white/90"
            />
          </section>

          <section className="grid gap-3">
            <h4 className="text-lg font-semibold text-white">2. A rule inside the sum</h4>
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Now take:
            </p>
            <MathBlock
              tex={String.raw`\sum_{{\color{#22d3ee}i}=1}^{4} 2{\color{#22d3ee}i}`}
              className="math-center math-lg text-white/90"
            />
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              This time the term is not just{" "}
              <MathInline tex={String.raw`{\color{#22d3ee}i}`} className="math-inline math-white" />. It is{" "}
              <MathInline tex={String.raw`2{\color{#22d3ee}i}`} className="math-inline math-white" />, so we double each value before adding.
            </p>
            <MathBlock
              tex={String.raw`\begin{aligned}
2({\color{#22d3ee}1})+2({\color{#22d3ee}2})+2({\color{#22d3ee}3})+2({\color{#22d3ee}4}) &= 2+4+6+8 \\[0.55em]
&= 20
\end{aligned}`}
              className="math-center math-lg text-white/90"
            />
          </section>

          <section className="grid gap-3">
            <h4 className="text-lg font-semibold text-white">3. A shifted term</h4>
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Another useful example is:
            </p>
            <MathBlock
              tex={String.raw`\sum_{{\color{#22d3ee}k}=1}^{3} ({\color{#22d3ee}k}+1)`}
              className="math-center math-lg text-white/90"
            />
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Here the index is{" "}
              <MathInline tex={String.raw`{\color{#22d3ee}k}`} className="math-inline math-white" />, not{" "}
              <MathInline tex={String.raw`{\color{#22d3ee}i}`} className="math-inline math-white" />. That makes no conceptual
              difference. It is just a different letter for the counter.
            </p>
            <MathBlock
              tex={String.raw`\begin{aligned}
({\color{#22d3ee}1}+1)+({\color{#22d3ee}2}+1)+({\color{#22d3ee}3}+1) &= 2+3+4 \\[0.55em]
&= 9
\end{aligned}`}
              className="math-center math-lg text-white/90"
            />
          </section>

          <section className="grid gap-3">
            <h4 className="text-lg font-semibold text-white">4. A simple real-world reading</h4>
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Suppose a student scores 6, 7, 8, and 9 marks on four short quizzes.
              If we write the quiz score on quiz{" "}
              <MathInline tex={String.raw`{\color{#22d3ee}q}`} className="math-inline math-white" /> as{" "}
              <MathInline tex={String.raw`m_{\color{#22d3ee}q}`} className="math-inline math-white" />, then the
              total score can be written compactly as:
            </p>
            <MathBlock
              tex={String.raw`\sum_{{\color{#22d3ee}q}=1}^{4} m_{\color{#22d3ee}q}`}
              className="math-center math-lg text-white/90"
            />
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Expanding it just means:
            </p>
            <MathBlock
              tex={String.raw`\begin{aligned}
m_{\color{#22d3ee}1}+m_{\color{#22d3ee}2}+m_{\color{#22d3ee}3}+m_{\color{#22d3ee}4} &= 6+7+8+9 \\[0.55em]
&= 30
\end{aligned}`}
              className="math-center math-lg text-white/90"
            />
          </section>
        </section>
      </section>

      <section id="basic-notation" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Basic mathematical notation
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Linear algebra also uses several compact symbols all the time. These
          are easier to handle once they are read in plain English rather than
          as decorations.
        </p>
        <div className="ml-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr>
                <td className="w-48 py-2 pr-4 text-center font-semibold text-white">Notation</td>
                <td className="py-2 font-semibold text-white">How to read it</td>
              </tr>
              <tr>
                <td className="py-2 text-center text-white">
                  <MathInline tex={String.raw`x_{\color{#22d3ee}1}`} className="math-inline math-white" />
                </td>
                <td className="py-2">
                  <MathInline tex={String.raw`x_{\color{#22d3ee}1}`} className="math-inline math-white" /> means{" "}
                  <MathInline tex={String.raw`x`} className="math-inline math-white" /> sub 1, or the first{" "}
                  <MathInline tex={String.raw`x`} className="math-inline math-white" />-value in a list.
                </td>
              </tr>
              <tr>
                <td className="py-2 text-center text-white">
                  <MathInline tex={String.raw`x_{\color{#f472b6}2}`} className="math-inline math-white" />
                </td>
                <td className="py-2">
                  <MathInline tex={String.raw`x_{\color{#f472b6}2}`} className="math-inline math-white" /> means{" "}
                  <MathInline tex={String.raw`x`} className="math-inline math-white" /> sub 2, or the second{" "}
                  <MathInline tex={String.raw`x`} className="math-inline math-white" />-value in a list.
                </td>
              </tr>
              <tr>
                <td className="py-2 text-center text-white">
                  <MathInline tex={String.raw`x\in\mathbb{R}`} className="math-inline math-white" />
                </td>
                <td className="py-2">
                  <MathInline tex={String.raw`x\in\mathbb{R}`} className="math-inline math-white" /> means{" "}
                  <MathInline tex={String.raw`x`} className="math-inline math-white" /> is in the real numbers, or{" "}
                  <MathInline tex={String.raw`x`} className="math-inline math-white" /> is a real number.
                </td>
              </tr>
              <tr>
                <td className="py-2 text-center text-white">
                  <MathInline tex={String.raw`x\in\mathbb{R}^{\color{#22d3ee}n}`} className="math-inline math-white" />
                </td>
                <td className="py-2">
                  <MathInline tex={String.raw`x\in\mathbb{R}^{\color{#22d3ee}n}`} className="math-inline math-white" /> means{" "}
                  <MathInline tex={String.raw`x`} className="math-inline math-white" /> is in R to the{" "}
                  <MathInline tex={String.raw`n`} className="math-inline math-white" />, meaning{" "}
                  <MathInline tex={String.raw`x`} className="math-inline math-white" /> has{" "}
                  <MathInline tex={String.raw`n`} className="math-inline math-white" /> real components.
                </td>
              </tr>
              <tr>
                <td className="py-2 text-center text-white">
                  <MathInline tex={String.raw`a_{{\color{#22d3ee}i}{\color{#f472b6}j}}`} className="math-inline math-white" />
                </td>
                <td className="py-2">
                  <MathInline tex={String.raw`a_{{\color{#22d3ee}i}{\color{#f472b6}j}}`} className="math-inline math-white" /> means
                  the entry in row <MathInline tex={String.raw`{\color{#22d3ee}i}`} className="math-inline math-white" /> and
                  column <MathInline tex={String.raw`{\color{#f472b6}j}`} className="math-inline math-white" />.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <section id="indices" className="scroll-mt-28 grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Indices, subscripts, and dimensions
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            A subscript usually labels position, not multiplication. So{" "}
            <MathInline tex={String.raw`x_{\color{#22d3ee}1}`} className="math-inline math-white" /> is
            different from <MathInline tex={String.raw`x\cdot 1`} className="math-inline math-white" />.
          </p>
          <MathBlock
            tex={String.raw`(x_{\color{#22d3ee}1},x_{\color{#f472b6}2},x_{\color{#86efac}3})`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            That notation often means a list of components. Later, vectors will
            be written in exactly this style.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            The dimension symbol in{" "}
            <MathInline tex={String.raw`x\in\mathbb{R}^{\color{#22d3ee}n}`} className="math-inline math-white" /> tells
            you how many real components the object has.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            For example, if{" "}
            <MathInline tex={String.raw`x\in\mathbb{R}^{\color{#22d3ee}3}`} className="math-inline math-white" />,
            then one possible instance is:
          </p>
          <MathBlock
            tex={String.raw`x=\begin{pmatrix}2\\-1\\4\end{pmatrix}\in\mathbb{R}^{\color{#22d3ee}3}\qquad\text{or}\qquad x=(2,-1,4)\in\mathbb{R}^{\color{#22d3ee}3}`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            You can think of that as a 3-part measurement. In a geometric
            setting, it could even represent a point or position in 3D space.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            More generally,{" "}
            <MathInline tex={String.raw`x\in\mathbb{R}^{\color{#22d3ee}n}`} className="math-inline math-white" /> means
            that <MathInline tex={String.raw`x`} className="math-inline math-white" /> is an{" "}
            <MathInline tex={String.raw`{\color{#22d3ee}n}`} className="math-inline math-white" />-dimensional vector,
            often written in component form as:
          </p>
          <MathBlock
            tex={String.raw`x=(x_{\color{#22d3ee}1},x_{\color{#f472b6}2},\ldots,x_{\color{#22d3ee}n})`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            And when we write{" "}
            <MathInline tex={String.raw`A\in\mathbb{R}^{{\color{#f472b6}m}\times{\color{#22d3ee}n}}`} className="math-inline math-white" />,
            we mean that <MathInline tex={String.raw`A`} className="math-inline math-white" /> is a real matrix with{" "}
            <MathInline tex={String.raw`{\color{#f472b6}m}`} className="math-inline math-white" /> rows and{" "}
            <MathInline tex={String.raw`{\color{#22d3ee}n}`} className="math-inline math-white" /> columns, for example:
          </p>
          <MathBlock
            tex={String.raw`A=\begin{pmatrix}
a_{11} & a_{12} & \cdots & a_{1{\color{#22d3ee}n}} \\
a_{21} & a_{22} & \cdots & a_{2{\color{#22d3ee}n}} \\
\vdots & \vdots & \ddots & \vdots \\
a_{{\color{#f472b6}m}1} & a_{{\color{#f472b6}m}2} & \cdots & a_{{\color{#f472b6}m}{\color{#22d3ee}n}}
\end{pmatrix}`}
            className="math-center math-lg text-white/90"
          />
        </section>

        <section id="reading-compact" className="scroll-mt-28 grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Reading compact notation
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            The key habit is to slow the notation back down into ordinary language.
          </p>

          <section className="grid gap-3">
            <h4 className="text-lg font-semibold text-white">Example 1</h4>
            <MathBlock
              tex={String.raw`x\in\mathbb{R}^{\color{#22d3ee}3}`}
              className="math-center math-lg text-white/90"
            />
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Read this as:{" "}
              <span className="text-white font-semibold">
                <MathInline tex={String.raw`x`} className="math-inline math-white" /> is a real{" "}
                <span className="text-cyan-300">3</span>-dimensional vector
              </span>
              , or more simply, <MathInline tex={String.raw`x`} className="math-inline math-white" /> has{" "}
              <span className="text-cyan-300 font-semibold">3</span> real components.
            </p>
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              One concrete example would be:
            </p>
            <MathBlock
              tex={String.raw`x=(2,-1,4)`}
              className="math-center math-lg text-white/90"
            />
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              That is one vector, or tuple, with three components.
            </p>
          </section>

          <section className="grid gap-3">
            <h4 className="text-lg font-semibold text-white">Example 2</h4>
            <MathBlock
              tex={String.raw`\sum_{{\color{#f472b6}j}=1}^{3} x_{\color{#f472b6}j}`}
              className="math-center math-lg text-white/90"
            />
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Read this as: add the first three components of{" "}
              <MathInline tex={String.raw`x`} className="math-inline math-white" />.
            </p>
            <MathBlock
              tex={String.raw`\begin{aligned}
x_{\color{#22d3ee}1}+x_{\color{#f472b6}2}+x_{\color{#86efac}3}
\end{aligned}`}
              className="math-center math-lg text-white/90"
            />
          </section>

          <section className="grid gap-3">
            <h4 className="text-lg font-semibold text-white">Example 3</h4>
            <MathBlock
              tex={String.raw`a_{{\color{#22d3ee}i}{\color{#f472b6}j}}`}
              className="math-center math-lg text-white/90"
            />
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Read this as: the entry of a matrix in row{" "}
              <MathInline tex={String.raw`{\color{#22d3ee}i}`} className="math-inline math-white" /> and column{" "}
              <MathInline tex={String.raw`{\color{#f472b6}j}`} className="math-inline math-white" />. That notation will matter once we start talking about matrices.
            </p>
          </section>

          <section className="grid gap-3">
            <h4 className="text-lg font-semibold text-white">Example 4</h4>
            <MathBlock
              tex={String.raw`\sum_{{\color{#22d3ee}i}=1}^{2}\sum_{{\color{#f472b6}j}=1}^{3} a_{{\color{#22d3ee}i}{\color{#f472b6}j}}`}
              className="math-center math-lg text-white/90"
            />
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              This is a first example with{" "}
              <span className="text-white font-semibold">two indices</span>.
              The outer sum runs over{" "}
              <MathInline tex={String.raw`{\color{#22d3ee}i}`} className="math-inline math-white" /> and the inner sum
              runs over <MathInline tex={String.raw`{\color{#f472b6}j}`} className="math-inline math-white" />.
            </p>
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              The easiest way to read it is in stages. First choose a value of{" "}
              <MathInline tex={String.raw`{\color{#22d3ee}i}`} className="math-inline math-white" />.
              That picks a row. Then, for that fixed row, let{" "}
              <MathInline tex={String.raw`{\color{#f472b6}j}`} className="math-inline math-white" /> run from 1 to 3,
              which means move across the first, second, and third columns.
            </p>
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              After that inner sum is finished, return to the outer sum, move to
              the next row, and repeat. So in plain English, this notation means:
              <span className="text-white font-semibold"> add all the entries in a 2 by 3 table, row by row</span>.
            </p>
            <MathBlock
              tex={String.raw`A=\begin{pmatrix}1&2&3\\4&5&6\end{pmatrix}`}
              className="math-center math-lg text-white/90"
            />
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Start with the first row, where{" "}
              <MathInline tex={String.raw`{\color{#22d3ee}i}=1`} className="math-inline math-white" />:
            </p>
            <MathBlock
              tex={String.raw`\begin{aligned}
\sum_{{\color{#f472b6}j}=1}^{3} a_{{\color{#22d3ee}1}{\color{#f472b6}j}}
&= a_{{\color{#22d3ee}1}{\color{#f472b6}1}}+a_{{\color{#22d3ee}1}{\color{#f472b6}2}}+a_{{\color{#22d3ee}1}{\color{#f472b6}3}} \\[0.55em]
&= 1+2+3 \\[0.55em]
&= 6
\end{aligned}`}
              className="math-center math-lg text-white/90"
            />
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Then do the same for the second row, where{" "}
              <MathInline tex={String.raw`{\color{#22d3ee}i}=2`} className="math-inline math-white" />:
            </p>
            <MathBlock
              tex={String.raw`\begin{aligned}
\sum_{{\color{#f472b6}j}=1}^{3} a_{{\color{#22d3ee}2}{\color{#f472b6}j}}
&= a_{{\color{#22d3ee}2}{\color{#f472b6}1}}+a_{{\color{#22d3ee}2}{\color{#f472b6}2}}+a_{{\color{#22d3ee}2}{\color{#f472b6}3}} \\[0.55em]
&= 4+5+6 \\[0.55em]
&= 15
\end{aligned}`}
              className="math-center math-lg text-white/90"
            />
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Now the outer sum adds those two row totals together:
            </p>
            <MathBlock
              tex={String.raw`\begin{aligned}
\sum_{{\color{#22d3ee}i}=1}^{2}\sum_{{\color{#f472b6}j}=1}^{3} a_{{\color{#22d3ee}i}{\color{#f472b6}j}}
&= 6+15 \\[0.55em]
&= 21
\end{aligned}`}
              className="math-center math-lg text-white/90"
            />
          </section>
        </section>
      </section>

      <section id="bridge" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Linear algebra bridge
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This lesson matters because linear algebra quickly starts writing
          patterns in compressed symbolic form.
        </p>
        <MathBlock
          tex={String.raw`\sum_{{\color{#22d3ee}i}=1}^{m}\sum_{{\color{#f472b6}j}=1}^{n} a_{{\color{#22d3ee}i}{\color{#f472b6}j}}x_{\color{#f472b6}j},\qquad b\in\mathbb{R}^{\color{#22d3ee}n},\qquad A\in\mathbb{R}^{{\color{#f472b6}m}\times{\color{#22d3ee}n}}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          You do not need to master those expressions yet. The bridge is simpler:
          if sigma notation, subscripts, and membership notation already feel
          readable, then later matrix and vector notation will feel like a new
          topic, not a new alphabet.
        </p>
        <ul className="ml-6 grid gap-3 text-base leading-7 text-[color:var(--color-muted)]">
          <li className="flex items-start gap-3">
            <span className="pt-0.5 text-white">{"\u2022"}</span>
            <span>
              <span className="text-white font-semibold">sigma notation</span> prepares you for compact sums over components
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="pt-0.5 text-white">{"\u2022"}</span>
            <span>
              <span className="text-white font-semibold">subscripts</span> prepare you for vector entries and matrix positions
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="pt-0.5 text-white">{"\u2022"}</span>
            <span>
              <span className="text-white font-semibold">dimension notation</span> prepares you for statements about spaces such as <MathInline tex={String.raw`\mathbb{R}^{n}`} className="math-inline math-white" />
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="pt-0.5 text-white">{"\u2022"}</span>
            <span>
              <span className="text-white font-semibold">linear algebra</span> then reuses all of these habits in a more structured setting
            </span>
          </li>
        </ul>
      </section>

      <section id="summary" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Summary
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Sigma notation and subscripts look compact, but they become manageable
          as soon as you learn to unpack them step by step.
        </p>
        <div className="ml-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr>
                <td className="w-12 py-2 text-center text-lg">{"\u2705"}</td>
                <td className="py-2">Sigma notation is just a compact way of writing a sum.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">{"\u2705"}</td>
                <td className="py-2">The lower and upper parts of a sigma symbol tell you where the index starts and stops.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">{"\u2705"}</td>
                <td className="py-2">Subscripts usually label position, not multiplication.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">{"\u2705"}</td>
                <td className="py-2">Notation such as <MathInline tex={String.raw`x\in\mathbb{R}^{\color{#22d3ee}n}`} className="math-inline math-white" /> tells you what kind of object you are dealing with.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">{"\u2705"}</td>
                <td className="py-2">The key skill is to slow compact notation back down into ordinary language.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The next natural lesson is <span className="text-white font-semibold">scalars, vectors, and vector notation</span>,
          because that is where this symbolic language starts describing the
          actual objects of linear algebra.
        </p>
      </section>
    </ArticleLayout>
  );
}
