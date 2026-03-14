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
  title: "Functions, Graphs, and Mappings",
  description:
    "The second linear algebra prerequisite lesson: understand input-output rules, graphs, and mappings before transformations arrive.",
};

export default function FunctionsGraphsMappingsPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "intro", label: "Introduction" },
    { id: "why", label: "Why this topic comes next", level: 2 },
    { id: "functions", label: "Functions" },
    { id: "evaluating", label: "Evaluating a function", level: 2 },
    { id: "graphs", label: "Graphs" },
    { id: "table-to-graph", label: "From a table to a graph", level: 2 },
    { id: "compare-graphs", label: "Comparing two rules", level: 2 },
    { id: "mappings", label: "Mappings" },
    { id: "mapping-types", label: "Different kinds of mapping behavior", level: 2 },
    { id: "bridge", label: "Linear algebra bridge" },
    { id: "summary", label: "Summary" },
  ];

  return (
    <ArticleLayout
      eyebrow="Mathematics - Linear Algebra - Prerequisites"
      title="Functions, graphs, and mappings"
      description="Once symbols feel readable, the next step is to understand rules. This lesson builds the idea that one input can be fed into a rule, produce an output, and then be represented algebraically, visually, and diagrammatically."
      descriptionClassName="!max-w-none"
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Linear Algebra phases", links: linearAlgebraPhases },
            { title: "Within this phase", links: linearAlgebraPrerequisiteLessons },
          ]}
          activeHref="/mathematics/linear-algebra/prerequisites-and-mathematical-language/functions-graphs-and-mappings"
        />
      }
    >
      <InfoPanel id="intro" title="Introduction" variant="intro">
        <p>
          The previous lesson made mathematical writing feel less foreign. This
          lesson takes the next step: <span className="text-white font-semibold">it turns symbols into rules</span>.
          Instead of only reading expressions, we now ask what happens when an
          input goes into a rule and an output comes back out.
        </p>
        <p>
          That idea matters because linear algebra is full of objects that act
          on other objects. Before matrices can feel like transformations, the
          simpler language of functions and mappings has to feel natural.
        </p>
        <p>Here is the roadmap for this lesson:</p>
        <div className="ml-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Functions</td>
                <td className="py-2">What a function is, how function notation works, and how one input produces one output.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Graphs</td>
                <td className="py-2">How input-output pairs become points, and how a rule becomes a visual curve or line.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Mappings</td>
                <td className="py-2">How arrow diagrams show the same rule in another beginner-friendly way.</td>
              </tr>
              <tr>
                <td className="w-56 py-2 pr-4 font-semibold text-white">Linear algebra bridge</td>
                <td className="py-2">How functions and mappings prepare you for transformations, matrix multiplication, and input-output thinking.</td>
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
          After numbers, variables, expressions, and equations, the next natural
          question is this: what if a symbol is not just sitting inside an
          expression, but is being <span className="text-white font-semibold">fed into a rule</span>?
        </p>
        <MathBlock
          tex={String.raw`f({\color{#22d3ee}x})=2{\color{#22d3ee}x}+1,\qquad g({\color{#22d3ee}x})={\color{#22d3ee}x}+2`}
          className="math-center math-lg text-white/90"
        />
        <p>
          That shift is small, but important. It is the step from reading a
          static expression to understanding a process: input, rule, output.
        </p>
      </InfoPanel>

      <section id="functions" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Functions
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          A function is a rule that takes an input and gives back an output. If
          you put the same input in again, the rule should give the same output
          again.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          A very simple example is:
        </p>
        <MathBlock
          tex={String.raw`f({\color{#22d3ee}x})=2{\color{#22d3ee}x}+1`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This says: take the input{" "}
          <MathInline tex={String.raw`{\color{#22d3ee}x}`} className="math-inline math-white" />,
          multiply it by 2, then add 1. The letter{" "}
          <MathInline tex={String.raw`f`} className="math-inline math-white" /> is just the name of the function.
        </p>
        <AlgebraStaticVisual
          variant="function-machine"
          framed={false}
          caption="A beginner-friendly way to picture a function is as a machine: an input goes in, the rule is applied, and an output comes out."
        />

        <section id="evaluating" className="scroll-mt-28 grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Evaluating a function
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            To evaluate a function, we choose an input and substitute it into
            the rule. For example, if we use{" "}
            <MathInline tex={String.raw`{\color{#22d3ee}x}=0`} className="math-inline math-white" />, then:
          </p>
          <MathBlock
            tex={String.raw`f({\color{#22d3ee}0})=2({\color{#22d3ee}0})+1=1`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            If we use <MathInline tex={String.raw`{\color{#22d3ee}x}=2`} className="math-inline math-white" />, then:
          </p>
          <MathBlock
            tex={String.raw`f({\color{#22d3ee}2})=2({\color{#22d3ee}2})+1=5`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            And if we use <MathInline tex={String.raw`{\color{#22d3ee}x}=4`} className="math-inline math-white" />, then:
          </p>
          <MathBlock
            tex={String.raw`f({\color{#22d3ee}4})=2({\color{#22d3ee}4})+1=9`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            So the notation{" "}
            <MathInline tex={String.raw`f(2)`} className="math-inline math-white" /> does not mean{" "}
            <span className="text-white font-semibold">f multiplied by 2</span>. It means the output of the
            function <MathInline tex={String.raw`f`} className="math-inline math-white" /> when the input is{" "}
            <MathInline tex={String.raw`2`} className="math-inline math-white" />.
          </p>
        </section>
      </section>

      <section id="graphs" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Graphs
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          A graph is a picture of the input-output behavior of a function. Each
          input-output pair becomes a point.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          For the function{" "}
          <MathInline tex={String.raw`f({\color{#22d3ee}x})=2{\color{#22d3ee}x}+1`} className="math-inline math-white" />,
          some simple pairs are:
        </p>

        <section id="table-to-graph" className="scroll-mt-28 grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            From a table to a graph
          </h3>
          <div className="ml-8 overflow-x-auto">
            <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
              <tbody>
                <tr>
                  <td className="w-40 py-2 pr-4 text-center font-semibold text-white">Input</td>
                  <td className="w-48 py-2 pr-4 text-center font-semibold text-white">Output</td>
                  <td className="py-2 text-center font-semibold text-white">Coordinates</td>
                </tr>
                <tr>
                  <td className="py-2 text-center text-white">
                    <MathInline tex={String.raw`0`} className="math-inline math-white" />
                  </td>
                  <td className="py-2 text-center text-white">
                    <MathInline tex={String.raw`1`} className="math-inline math-white" />
                  </td>
                  <td className="py-2 text-center">
                    <MathInline
                      tex={String.raw`({\color{#22d3ee}0},{\color{#f472b6}1})`}
                      className="math-inline math-white"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="py-2 text-center text-white">
                    <MathInline tex={String.raw`1`} className="math-inline math-white" />
                  </td>
                  <td className="py-2 text-center text-white">
                    <MathInline tex={String.raw`3`} className="math-inline math-white" />
                  </td>
                  <td className="py-2 text-center">
                    <MathInline
                      tex={String.raw`({\color{#22d3ee}1},{\color{#f472b6}3})`}
                      className="math-inline math-white"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="py-2 text-center text-white">
                    <MathInline tex={String.raw`2`} className="math-inline math-white" />
                  </td>
                  <td className="py-2 text-center text-white">
                    <MathInline tex={String.raw`5`} className="math-inline math-white" />
                  </td>
                  <td className="py-2 text-center">
                    <MathInline
                      tex={String.raw`({\color{#22d3ee}2},{\color{#f472b6}5})`}
                      className="math-inline math-white"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="py-2 text-center text-white">
                    <MathInline tex={String.raw`3`} className="math-inline math-white" />
                  </td>
                  <td className="py-2 text-center text-white">
                    <MathInline tex={String.raw`7`} className="math-inline math-white" />
                  </td>
                  <td className="py-2 text-center">
                    <MathInline
                      tex={String.raw`({\color{#22d3ee}3},{\color{#f472b6}7})`}
                      className="math-inline math-white"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Once those points are plotted on axes, the graph lets you see the
            pattern at a glance instead of recomputing each output one at a time.
          </p>
        </section>

        <section id="compare-graphs" className="scroll-mt-28 grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Comparing two rules
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Graphs become especially useful when two functions use the same
            input axis. Then you can compare how the outputs behave under
            different rules.
          </p>
          <MathBlock
            tex={String.raw`{\color{#f472b6}y}=2{\color{#22d3ee}x},\qquad {\color{#f472b6}y}={\color{#22d3ee}x}+2`}
            className="math-center math-lg text-white/90"
          />
          <AlgebraStaticVisual
            variant="line-graph"
            framed={false}
            caption="Both rules use the same input axis. The blue line grows faster, while the orange line starts higher but increases more slowly."
          />
        </section>
      </section>

      <section id="mappings" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Mappings
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          A mapping is another way to show a function. Instead of focusing on an
          equation or a graph, it highlights which inputs are connected to which
          outputs.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          For the rule{" "}
          <MathInline tex={String.raw`f({\color{#22d3ee}x})=2{\color{#22d3ee}x}+1`} className="math-inline math-white" />,
          an arrow diagram might look like this:
        </p>
        <AlgebraStaticVisual
          variant="mapping-diagram"
          framed={false}
          caption="The mapping diagram shows the same rule in arrow form: each input on the left is sent to exactly one output on the right."
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          That <span className="text-white font-semibold">exactly one output for each input</span> idea is
          one of the key habits to keep. Different inputs may sometimes land on
          the same output, but a single input should not split into two
          different outputs if the rule is a function.
        </p>

        <section id="mapping-types" className="scroll-mt-28 grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Different kinds of mapping behavior
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            This is a good place to introduce a few simple function types,
            because arrow diagrams make the differences easier to see than
            abstract definitions do.
          </p>
          <div className="ml-6 grid gap-3 text-base leading-7 text-[color:var(--color-muted)]">
            <p>
              <span className="text-white font-semibold">One-to-one:</span> different inputs go
              to different outputs. Under{" "}
              <MathInline
                tex={String.raw`f({\color{#22d3ee}x})={\color{#22d3ee}x}+1`}
                className="math-inline math-white"
              />
              , the inputs <MathInline tex={String.raw`1`} className="math-inline math-white" /> and{" "}
              <MathInline tex={String.raw`2`} className="math-inline math-white" /> go to{" "}
              <MathInline tex={String.raw`2`} className="math-inline math-white" /> and{" "}
              <MathInline tex={String.raw`3`} className="math-inline math-white" />.
            </p>
            <p>
              <span className="text-white font-semibold">Many-to-one:</span> different inputs can
              still land on the same output while the rule remains a function.
              For example, if{" "}
              <MathInline
                tex={String.raw`g({\color{#22d3ee}x})={\color{#22d3ee}x}^{2}`}
                className="math-inline math-white"
              />
              , then <MathInline tex={String.raw`g(2)=4`} className="math-inline math-white" /> and{" "}
              <MathInline tex={String.raw`g(-2)=4`} className="math-inline math-white" />.
            </p>
            <p>
              <span className="text-white font-semibold">Onto:</span> every output we care about
              gets hit by at least one input. If the allowed outputs are{" "}
              <MathInline tex={String.raw`\{1,3,5\}`} className="math-inline math-white" />, then{" "}
              <MathInline
                tex={String.raw`f({\color{#22d3ee}x})=2{\color{#22d3ee}x}+1`}
                className="math-inline math-white"
              />{" "}
              with inputs <MathInline tex={String.raw`\{0,1,2\}`} className="math-inline math-white" /> is onto
              that output set because it reaches all three values.
            </p>
            <p>
              <span className="text-white font-semibold">Not a function:</span> one input is sent
              to two different outputs. If an input{" "}
              <MathInline tex={String.raw`2`} className="math-inline math-white" /> pointed to both{" "}
              <MathInline tex={String.raw`5`} className="math-inline math-white" /> and{" "}
              <MathInline tex={String.raw`7`} className="math-inline math-white" />, the rule would
              fail the basic function test.
            </p>
          </div>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Later, these labels become more formal. For now, the important
            beginner question is simply: how are the arrows behaving?
          </p>
        </section>
      </section>

      <section id="bridge" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Linear algebra bridge
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This topic matters because linear algebra is full of input-output
          thinking. Later, a matrix will often be understood as something that
          takes an input object and produces a new output object.
        </p>
        <MathBlock
          tex={String.raw`T({\color{#22d3ee}x})=A{\color{#22d3ee}x}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          You do not need to know the details yet. The important bridge is
          simpler: if you already understand functions as rules, graphs as
          pictures of those rules, and mappings as arrows from inputs to
          outputs, then later transformations will feel like a natural extension
          instead of a completely new language.
        </p>
        <div className="ml-6 grid gap-2 text-base leading-7 text-[color:var(--color-muted)]">
          <p>
            <span className="text-white font-semibold">functions</span> train you to think in terms of inputs and outputs
          </p>
          <p>
            <span className="text-white font-semibold">graphs</span> train you to see how a rule behaves visually
          </p>
          <p>
            <span className="text-white font-semibold">mappings</span> train you to track where one object is sent
          </p>
          <p>
            <span className="text-white font-semibold">linear algebra</span> later combines all three viewpoints
          </p>
        </div>
      </section>

      <section id="summary" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Summary
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The core idea of this lesson is that one rule can be understood in
          several connected ways.
        </p>
        <div className="ml-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">A function is a rule that takes an input and produces an output.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">Function notation such as <MathInline tex={String.raw`f(2)`} className="math-inline math-white" /> means the output when the input is 2.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">A graph turns input-output pairs into points so the rule can be seen visually.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">A mapping diagram shows the same rule in arrow form from inputs to outputs.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">These ideas prepare you for linear transformations, which are central to linear algebra.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The next natural lesson is <span className="text-white font-semibold">coordinate plane and geometric points</span>,
          because once functions and graphs are familiar, it becomes much easier
          to talk carefully about locations, axes, and geometric interpretation.
        </p>
      </section>
    </ArticleLayout>
  );
}
