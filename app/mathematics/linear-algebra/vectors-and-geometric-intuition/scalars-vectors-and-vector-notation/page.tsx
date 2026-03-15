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
  title: "Scalars, Vectors, and Vector Notation",
  description:
    "The first vector lesson in the linear algebra track: distinguish scalars from vectors, read vector notation, and build the first geometric intuition.",
};

export default function ScalarsVectorsAndVectorNotationPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "intro", label: "Introduction" },
    { id: "why", label: "Why this topic comes next", level: 2 },
    { id: "scalars", label: "Scalars" },
    { id: "vectors", label: "Vectors" },
    { id: "point-vs-vector", label: "Point versus vector", level: 2 },
    { id: "notation", label: "Vector notation" },
    { id: "components", label: "Components and dimension", level: 2 },
    { id: "compare", label: "Comparing vectors" },
    { id: "scaling", label: "Scaling a vector" },
    { id: "bridge", label: "Linear algebra bridge" },
    { id: "summary", label: "Summary" },
  ];

  return (
    <ArticleLayout
      eyebrow="Mathematics - Linear Algebra - Vectors"
      title="Scalars, vectors, and vector notation"
      description="This is the first page where linear algebra starts introducing its own core objects. The aim is simple: separate single numbers from vectors, read the notation calmly, and start seeing vectors as geometric objects rather than decorative lists."
      descriptionClassName="!max-w-none"
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Linear Algebra phases", links: linearAlgebraPhases },
            { title: "Within this phase", links: linearAlgebraVectorLessons },
          ]}
          activeHref="/mathematics/linear-algebra/vectors-and-geometric-intuition/scalars-vectors-and-vector-notation"
        />
      }
    >
      <InfoPanel id="intro" title="Introduction" variant="intro">
        <p>
          Up to this point, the track has been preparing the language. This page
          begins the actual object-level story of linear algebra.
        </p>
        <p>
          A <span className="text-white font-semibold">scalar</span> is a single number. A{" "}
          <span className="text-white font-semibold">vector</span> is a structured object with
          components. In beginner terms, a vector often behaves like a movement
          or directed change rather than a single quantity.
        </p>
        <p>Here is the roadmap for this lesson:</p>
        <div className="ml-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Scalars</td>
                <td className="py-2">What a single number is doing and why scalars matter before vectors are scaled.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Vectors</td>
                <td className="py-2">How vectors can be read as displacement, direction, and multi-component objects.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Vector notation</td>
                <td className="py-2">How tuple form, column-vector form, and component notation all describe the same basic idea.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Comparing vectors</td>
                <td className="py-2">How more than one vector can be drawn on the same axes and compared by direction and size.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Scaling a vector</td>
                <td className="py-2">How a scalar changes a vector by stretching it while keeping the same direction.</td>
              </tr>
              <tr>
                <td className="w-56 py-2 pr-4 font-semibold text-white">Linear algebra bridge</td>
                <td className="py-2">Why vectors become the central objects that later get added, scaled, and transformed.</td>
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
          The beginner problem is no longer ordinary algebra. The new friction
          point is that linear algebra starts writing objects that are{" "}
          <span className="text-white font-semibold">not just single numbers anymore</span>.
        </p>
        <MathBlock
          tex={String.raw`3,\qquad {\color{#22d3ee}\mathbf{v}}=(2,1),\qquad {\color{#22d3ee}\mathbf{v}}=\begin{bmatrix}2\\[0.35em]1\end{bmatrix},\qquad 2{\color{#22d3ee}\mathbf{v}}`}
          className="math-center math-lg text-white/90"
        />
        <p>
          None of those expressions is conceptually mysterious. This page
          teaches you how to read them before later pages start adding vectors
          together, scaling them, and applying matrices to them.
        </p>
      </InfoPanel>

      <section id="scalars" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Scalars
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          A scalar is just a single number. It can represent a temperature, a
          mass, a price, a score, or a scale factor. The key point is that it
          is <span className="text-white font-semibold">one quantity, not a multi-part object</span>.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          For example, <MathInline tex={String.raw`3`} className="math-inline math-white" /> apples,{" "}
          <MathInline tex={String.raw`5`} className="math-inline math-white" /> metres, or{" "}
          <MathInline tex={String.raw`\tfrac{1}{2}`} className="math-inline math-white" /> of a cake are all scalar-style descriptions.
          They tell you <span className="text-white font-semibold">how much</span>, but not a direction.
        </p>
        <div className="ml-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr>
                <td className="w-40 py-2 pr-4 text-center font-semibold text-white">Scalar</td>
                <td className="py-2 font-semibold text-white">How to think about it</td>
              </tr>
              <tr>
                <td className="py-2 text-center text-white">
                  <MathInline tex={String.raw`3`} className="math-inline math-white" />
                </td>
                <td className="py-2">A single quantity such as 3 apples or 3 hours.</td>
              </tr>
              <tr>
                <td className="py-2 text-center text-white">
                  <MathInline tex={String.raw`-2`} className="math-inline math-white" />
                </td>
                <td className="py-2">Still a single number, but negative. Later it can reverse a vector’s direction when used as a scale factor.</td>
              </tr>
              <tr>
                <td className="py-2 text-center text-white">
                  <MathInline tex={String.raw`\tfrac{1}{2}`} className="math-inline math-white" />
                </td>
                <td className="py-2">A single number that can mean “half as much” or “shrink by a factor of 2”.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Scalars matter here because soon they will start acting on vectors. In
          linear algebra, a scalar often tells you how strongly a vector should
          be stretched, shrunk, or reversed.
        </p>
      </section>

      <section id="vectors" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Vectors
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          A vector is a structured object with components. In the most beginner-friendly
          reading, a vector in two dimensions can be treated like an instruction:
          move some amount <span className="font-semibold text-[#22d3ee]">horizontally</span> and
          some amount <span className="font-semibold text-[#f472b6]">vertically</span>.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          For example, if someone says “walk 2 metres east and 1 metre north,”
          that is already vector-like thinking. It is not just one number. It is{" "}
          <span className="text-white font-semibold">a directed change with components</span>.
        </p>
        <MathBlock
          tex={String.raw`{\color{#22d3ee}\mathbf{v}}=(2,1)=\begin{bmatrix}2\\[0.35em]1\end{bmatrix}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          That vector says: move 2 units in the{" "}
          <MathInline tex={String.raw`{\color{#22d3ee}x}`} className="math-inline math-white" />-direction
          and 1 unit in the{" "}
          <MathInline tex={String.raw`{\color{#f472b6}y}`} className="math-inline math-white" />-direction.
        </p>
        <AlgebraStaticVisual
          variant="vector-basic"
          framed={false}
          caption="A vector can be pictured as an arrow. The components tell you how far it moves horizontally and vertically."
        />

        <section id="point-vs-vector" className="scroll-mt-28 grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Point versus vector
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            One subtle beginner point matters here. The same pair of numbers can
            appear in two different roles.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            As a point, <MathInline tex={String.raw`({\color{#22d3ee}2},{\color{#f472b6}1})`} className="math-inline math-white" /> tells you a
            location. As a vector, those same numbers can tell you a movement or
            displacement.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            So the numbers may look the same, but the interpretation changes:
            one is about <span className="text-white font-semibold">where something is</span> and the
            other is about <span className="text-white font-semibold">how something changes or points</span>.
          </p>
        </section>
      </section>

      <section id="notation" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Vector notation
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Different books write vectors in different ways. The notation changes,
          but the underlying idea is the same.
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
                  <MathInline tex={String.raw`{\color{#22d3ee}\mathbf{v}}`} className="math-inline math-white" />
                </td>
                <td className="py-2">A vector named <MathInline tex={String.raw`{\color{#22d3ee}\mathbf{v}}`} className="math-inline math-white" />.</td>
              </tr>
              <tr>
                <td className="py-2 text-center text-white">
                  <MathInline tex={String.raw`(2,1)`} className="math-inline math-white" />
                </td>
                <td className="py-2">Tuple form: the vector’s two components written side by side.</td>
              </tr>
              <tr>
                <td className="py-2 text-center text-white">
                  <MathInline tex={String.raw`\begin{bmatrix}2\\[0.25em]1\end{bmatrix}`} className="math-inline math-white" />
                </td>
                <td className="py-2">Column-vector form: the same vector written vertically.</td>
              </tr>
              <tr>
                <td className="py-2 text-center text-white">
                  <MathInline tex={String.raw`{\color{#22d3ee}\mathbf{v}}^{T}=\begin{bmatrix}2 & 1\end{bmatrix}`} className="math-inline math-white" />
                </td>
                <td className="py-2">Transpose form: the row version of the same vector, written as <MathInline tex={String.raw`{\color{#22d3ee}\mathbf{v}}^{T}`} className="math-inline math-white" />.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <section id="components" className="scroll-mt-28 grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Components and dimension
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            The entries of a vector are called its{" "}
            <span className="text-white font-semibold">components</span>.
          </p>
          <MathBlock
            tex={String.raw`\mathbf{x}=(x_{1},x_{2},\ldots,x_{\color{#22d3ee}n}),\qquad \mathbf{x}\in\mathbb{R}^{\color{#22d3ee}n}`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            This says that <MathInline tex={String.raw`\mathbf{x}`} className="math-inline math-white" /> is an{" "}
            <MathInline tex={String.raw`{\color{#22d3ee}n}`} className="math-inline math-white" />-dimensional real vector.
            It has <MathInline tex={String.raw`{\color{#22d3ee}n}`} className="math-inline math-white" /> real components.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Symbolically, a 3-dimensional version could be written as:
          </p>
          <MathBlock
            tex={String.raw`\mathbf{x}=(x_1,x_2,x_3)\in\mathbb{R}^{\color{#22d3ee}3}`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            A concrete 3-dimensional example would be:
          </p>
          <MathBlock
            tex={String.raw`\mathbf{x}=\begin{bmatrix}2\\[0.35em]1\\[0.35em]4\end{bmatrix}\in\mathbb{R}^{\color{#22d3ee}3}`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            You can picture that as a 3-part measurement, a 3D displacement, or
            any other situation where one object needs three coordinates rather
            than two.
          </p>
        </section>
      </section>

      <section id="compare" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Comparing vectors
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Once you can read one vector as an arrow, the next natural step is to
          place <span className="text-white font-semibold">more than one vector</span> on the
          same axes.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          For example, if{" "}
          <MathInline tex={String.raw`{\color{#22d3ee}\mathbf{v}}=(2,1)`} className="math-inline math-white" /> and{" "}
          <MathInline tex={String.raw`{\color{#f472b6}\mathbf{u}}=(1,3)`} className="math-inline math-white" />, then both can be
          drawn from the origin and compared directly.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Seeing them together helps you notice that vectors can point in
          different directions and have different lengths even when they are
          drawn on the same coordinate system.
        </p>
        <AlgebraStaticVisual
          variant="vector-two"
          framed={false}
          caption="Two vectors can live on the same axes. Putting them together makes direction and size easier to compare."
        />
      </section>

      <section id="scaling" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Scaling a vector
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This is where scalars and vectors meet. If{" "}
          <MathInline tex={String.raw`{\color{#22d3ee}\mathbf{v}}`} className="math-inline math-white" /> is a vector,
          then <MathInline tex={String.raw`2{\color{#22d3ee}\mathbf{v}}`} className="math-inline math-white" /> means:
          keep the same direction, but make the vector twice as long.
        </p>
        <MathBlock
          tex={String.raw`{\color{#22d3ee}\mathbf{v}}=\begin{bmatrix}2\\[0.35em]1\end{bmatrix},\qquad 2{\color{#22d3ee}\mathbf{v}}=\begin{bmatrix}4\\[0.35em]2\end{bmatrix}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We can read that component by component: the scalar{" "}
          <MathInline tex={String.raw`2`} className="math-inline math-white" /> doubles each component of the vector.
        </p>
        <AlgebraStaticVisual
          variant="vector-scaling"
          framed={false}
          caption="A scalar can stretch a vector. Here the second vector reaches farther in the same direction."
        />
      </section>

      <section id="bridge" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Linear algebra bridge
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This lesson matters because vectors are the main objects that the rest
          of the subject keeps returning to.
        </p>
        <MathBlock
          tex={String.raw`{\color{#f472b6}\mathbf{u}}+{\color{#22d3ee}\mathbf{v}},\qquad 2{\color{#22d3ee}\mathbf{v}},\qquad A{\color{#22d3ee}\mathbf{v}}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Those expressions will look much less intimidating once the basic
          habits are in place:
        </p>
        <ul className="ml-6 grid gap-3 text-base leading-7 text-[color:var(--color-muted)]">
          <li className="flex items-start gap-3">
            <span className="pt-0.5 text-white">•</span>
            <span>
              <span className="text-white font-semibold">scalars</span> are single numbers
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="pt-0.5 text-white">•</span>
            <span>
              <span className="text-white font-semibold">vectors</span> are multi-component objects
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="pt-0.5 text-white">•</span>
            <span>
              <span className="text-white font-semibold">vector notation</span> is just a compact way of writing those objects down
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="pt-0.5 text-white">•</span>
            <span>
              <span className="text-white font-semibold">linear algebra</span> later studies how vectors combine, scale, and transform
            </span>
          </li>
        </ul>
      </section>

      <section id="summary" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Summary
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This is the first page where linear algebra starts treating vectors as
          the core objects of the subject.
        </p>
        <div className="ml-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">A scalar is a single number.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">A vector is a structured object with components, often read geometrically as a movement or directed arrow.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">Tuple form and column-vector form can describe the same vector.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">Scalars can scale vectors, for example <MathInline tex={String.raw`2{\color{#22d3ee}\mathbf{v}}`} className="math-inline math-white" />.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">This distinction between numbers and vectors is the foundation for later vector operations and matrix actions.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </ArticleLayout>
  );
}
