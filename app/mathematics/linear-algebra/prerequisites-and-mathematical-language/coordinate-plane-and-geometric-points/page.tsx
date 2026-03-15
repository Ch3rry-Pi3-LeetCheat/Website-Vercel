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
  title: "Coordinate Plane and Geometric Points",
  description:
    "The third linear algebra prerequisite lesson: understand axes, coordinates, and how points represent location before vectors arrive.",
};

export default function CoordinatePlaneAndGeometricPointsPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "intro", label: "Introduction" },
    { id: "why", label: "Why this topic comes next", level: 2 },
    { id: "plane", label: "Coordinate plane" },
    { id: "axes-origin", label: "Axes, origin, and quadrants", level: 2 },
    { id: "ordered-pairs", label: "Ordered pairs" },
    { id: "special-positions", label: "Special positions", level: 2 },
    { id: "plotting-points", label: "Plotting points", level: 2 },
    { id: "geometric-points", label: "Geometric points" },
    { id: "movement-distance", label: "Movement and distance", level: 2 },
    { id: "bridge", label: "Linear algebra bridge" },
    { id: "summary", label: "Summary" },
  ];

  return (
    <ArticleLayout
      eyebrow="Mathematics - Linear Algebra - Prerequisites"
      title="Coordinate plane and geometric points"
      description="Once input-output rules feel readable, the next step is to place values in space. This lesson introduces axes, coordinates, and points so that later geometric thinking in linear algebra has a clear visual home."
      descriptionClassName="!max-w-none"
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Linear Algebra phases", links: linearAlgebraPhases },
            { title: "Within this phase", links: linearAlgebraPrerequisiteLessons },
          ]}
          activeHref="/mathematics/linear-algebra/prerequisites-and-mathematical-language/coordinate-plane-and-geometric-points"
        />
      }
    >
      <InfoPanel id="intro" title="Introduction" variant="intro">
        <p>
          The previous lesson taught you to read a rule such as{" "}
          <MathInline
            tex={String.raw`{\color{#f472b6}y}=2{\color{#22d3ee}x}+1`}
            className="math-inline math-white"
          />
          . This lesson adds the next layer: <span className="text-white font-semibold">where values live visually</span>.
        </p>
        <p>
          A coordinate plane gives numbers a location. That matters because
          linear algebra will soon stop being only symbolic. It will become
          spatial as well.
        </p>
        <p>Here is the roadmap for this lesson:</p>
        <div className="ml-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Coordinate plane</td>
                <td className="py-2">What the horizontal and vertical axes are, where the origin sits, and how the plane is divided.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Ordered pairs</td>
                <td className="py-2">How coordinates such as <span className="text-white">(2, 3)</span> encode one horizontal value and one vertical value.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Geometric points</td>
                <td className="py-2">How points mark location, how movement is read, and how simple geometric interpretation begins.</td>
              </tr>
              <tr>
                <td className="w-56 py-2 pr-4 font-semibold text-white">Linear algebra bridge</td>
                <td className="py-2">How coordinates and points prepare you for vectors, geometry, and higher-dimensional thinking.</td>
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
          Once you can read a rule, the next question is often:{" "}
          <span className="text-white font-semibold">what does that rule look like in space</span>?
        </p>
        <MathBlock
          tex={String.raw`({\color{#22d3ee}2},{\color{#f472b6}3}),\qquad ({\color{#22d3ee}-1},{\color{#f472b6}2}),\qquad ({\color{#22d3ee}3},{\color{#f472b6}-2})`}
          className="math-center math-lg text-white/90"
        />
        <p>
          The coordinate plane is the first place where algebra starts turning
          into geometry. That is exactly the bridge linear algebra needs.
        </p>
      </InfoPanel>

      <section id="plane" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Coordinate plane
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The coordinate plane is a flat grid built from two number lines:
          a horizontal axis and a vertical axis.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The horizontal axis is usually the{" "}
          <span className="text-white font-semibold">x-axis</span>. The vertical axis is usually the{" "}
          <span className="text-white font-semibold">y-axis</span>. Where they cross is called the{" "}
          <span className="text-white font-semibold">origin</span>.
        </p>
        <MathBlock
          tex={String.raw`O=({\color{#22d3ee}0},{\color{#f472b6}0})`}
          className="math-center math-lg text-white/90"
        />

        <section id="axes-origin" className="scroll-mt-28 grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Axes, origin, and quadrants
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Positive <MathInline tex={String.raw`{\color{#22d3ee}x}`} className="math-inline math-white" /> values move
            to the right, and negative <MathInline tex={String.raw`{\color{#22d3ee}x}`} className="math-inline math-white" /> values move to the left.
            Positive <MathInline tex={String.raw`{\color{#f472b6}y}`} className="math-inline math-white" /> values move up,
            and negative <MathInline tex={String.raw`{\color{#f472b6}y}`} className="math-inline math-white" /> values move down.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            The axes split the plane into four regions called{" "}
            <span className="text-white font-semibold">quadrants</span>. You do not need deep theory yet.
            The immediate beginner idea is simpler: the signs of the coordinates
            tell you which general region the point is in.
          </p>
          <AlgebraStaticVisual
            variant="coordinate-plane-basic"
            framed={false}
            caption="The coordinate plane gives each point one horizontal coordinate and one vertical coordinate."
          />
        </section>
      </section>

      <section id="ordered-pairs" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Ordered pairs
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          A point on the plane is usually written as an{" "}
          <span className="text-white font-semibold">ordered pair</span>, which is also a very simple kind of{" "}
          <span className="text-white font-semibold">tuple</span>:
        </p>
        <MathBlock
          tex={String.raw`({\color{#22d3ee}x},{\color{#f472b6}y})`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The word <span className="text-white font-semibold">ordered</span> matters. The first number is the
          horizontal coordinate and the second number is the vertical coordinate.
          So <MathInline tex={String.raw`({\color{#22d3ee}2},{\color{#f472b6}3})`} className="math-inline math-white" /> is not the same as{" "}
          <MathInline tex={String.raw`({\color{#22d3ee}3},{\color{#f472b6}2})`} className="math-inline math-white" />.
        </p>

        <section id="special-positions" className="scroll-mt-28 grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Special positions
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Some points are especially easy to read and are worth recognising immediately.
          </p>
          <div className="ml-8 overflow-x-auto">
            <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
              <tbody>
                <tr>
                  <td className="w-48 py-2 pr-4 text-center font-semibold text-white">Point</td>
                  <td className="py-2 font-semibold text-white">What it tells you</td>
                </tr>
                <tr>
                  <td className="py-2 text-center text-white">
                    <MathInline
                      tex={String.raw`({\color{#22d3ee}0},{\color{#f472b6}0})`}
                      className="math-inline math-white"
                    />
                  </td>
                  <td className="py-2">This is the origin, where the two axes meet.</td>
                </tr>
                <tr>
                  <td className="py-2 text-center text-white">
                    <MathInline
                      tex={String.raw`({\color{#22d3ee}3},{\color{#f472b6}0})`}
                      className="math-inline math-white"
                    />
                  </td>
                  <td className="py-2">Because the second coordinate is 0, the point lies on the x-axis.</td>
                </tr>
                <tr>
                  <td className="py-2 text-center text-white">
                    <MathInline
                      tex={String.raw`({\color{#22d3ee}0},{\color{#f472b6}-2})`}
                      className="math-inline math-white"
                    />
                  </td>
                  <td className="py-2">Because the first coordinate is 0, the point lies on the y-axis.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            These are useful beginner checkpoints. If{" "}
            <MathInline tex={String.raw`{\color{#f472b6}y}=0`} className="math-inline math-white" />, the point sits on
            the horizontal axis. If <MathInline tex={String.raw`{\color{#22d3ee}x}=0`} className="math-inline math-white" />, it
            sits on the vertical axis.
          </p>
        </section>

        <section id="plotting-points" className="scroll-mt-28 grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Plotting points
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            To plot a point, read the first coordinate first. Move horizontally.
            Then read the second coordinate. Move vertically.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            For example, to plot{" "}
            <MathInline tex={String.raw`({\color{#22d3ee}2},{\color{#f472b6}3})`} className="math-inline math-white" />,
            move 2 units right and then 3 units up.
          </p>
          <div className="ml-8 overflow-x-auto">
            <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
              <tbody>
                <tr>
                  <td className="w-40 py-2 pr-4 text-center font-semibold text-white">Point</td>
                  <td className="w-48 py-2 pr-4 text-center font-semibold text-white">Coordinates</td>
                  <td className="py-2 font-semibold text-white">How to read it</td>
                </tr>
                <tr>
                  <td className="py-2 text-center text-white">A</td>
                  <td className="py-2 text-center text-white">
                    <MathInline
                      tex={String.raw`({\color{#22d3ee}2},{\color{#f472b6}3})`}
                      className="math-inline math-white"
                    />
                  </td>
                  <td className="py-2">Move 2 right, then 3 up.</td>
                </tr>
                <tr>
                  <td className="py-2 text-center text-white">B</td>
                  <td className="py-2 text-center text-white">
                    <MathInline
                      tex={String.raw`({\color{#22d3ee}-2},{\color{#f472b6}2})`}
                      className="math-inline math-white"
                    />
                  </td>
                  <td className="py-2">Move 2 left, then 2 up.</td>
                </tr>
                <tr>
                  <td className="py-2 text-center text-white">C</td>
                  <td className="py-2 text-center text-white">
                    <MathInline
                      tex={String.raw`({\color{#22d3ee}3},{\color{#f472b6}-2})`}
                      className="math-inline math-white"
                    />
                  </td>
                  <td className="py-2">Move 3 right, then 2 down.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            A common beginner mistake is to treat the coordinates as a bag of
            numbers. They are not. The first and second positions have different jobs.
          </p>
        </section>
      </section>

      <section id="geometric-points" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Geometric points
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          A geometric point marks a location. It does not need size, width, or
          thickness in the mathematical idea. It simply says{" "}
          <span className="text-white font-semibold">this is where we are</span>.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Once points are on the plane, you can start asking geometric
          questions: which point is higher, which point is farther right, how
          do we move from one point to another, and how far apart are two points?
        </p>

        <section id="movement-distance" className="scroll-mt-28 grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Movement and distance
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Suppose we start at{" "}
            <MathInline tex={String.raw`P=({\color{#22d3ee}2},{\color{#f472b6}1})`} className="math-inline math-white" /> and
            want to reach{" "}
            <MathInline tex={String.raw`Q=({\color{#22d3ee}4},{\color{#f472b6}3})`} className="math-inline math-white" />.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Horizontally, the <MathInline tex={String.raw`{\color{#22d3ee}x}`} className="math-inline math-white" />-coordinate changes from{" "}
            <MathInline tex={String.raw`{\color{#22d3ee}2}`} className="math-inline math-white" /> to{" "}
            <MathInline tex={String.raw`{\color{#22d3ee}4}`} className="math-inline math-white" />.
            That is a move of 2 units to the right.
          </p>
          <MathBlock
            tex={String.raw`{\color{#22d3ee}4}-{\color{#22d3ee}2}=2`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Vertically, the <MathInline tex={String.raw`{\color{#f472b6}y}`} className="math-inline math-white" />-coordinate changes from{" "}
            <MathInline tex={String.raw`{\color{#f472b6}1}`} className="math-inline math-white" /> to{" "}
            <MathInline tex={String.raw`{\color{#f472b6}3}`} className="math-inline math-white" />.
            That is a move of 2 units upward.
          </p>
          <MathBlock
            tex={String.raw`{\color{#f472b6}3}-{\color{#f472b6}1}=2`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            So even before formal distance formulas, the plane already lets you
            read movement component by component: horizontal change and vertical change.
          </p>
          <AlgebraStaticVisual
            variant="coordinate-plane-movement"
            framed={false}
            caption="A move from one point to another can be described by horizontal change, vertical change, or one direct straight-line separation."
          />
        </section>
      </section>

      <section id="bridge" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Linear algebra bridge
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This lesson matters because linear algebra constantly uses coordinates
          to describe objects and their position in space.
        </p>
        <MathBlock
          tex={String.raw`\begin{bmatrix} {\color{#22d3ee}x} \\ {\color{#f472b6}y} \end{bmatrix}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          For now, you do not need to know what that column notation means in
          detail. The important bridge is this: a coordinate pair already trains
          you to think of a location as a structured object made from components.
        </p>
        <ul className="ml-6 grid gap-3 text-base leading-7 text-[color:var(--color-muted)]">
          <li className="flex items-start gap-3">
            <span className="pt-0.5 text-white">•</span>
            <span>
              <span className="text-white font-semibold">the plane</span> gives numbers a geometric setting
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="pt-0.5 text-white">•</span>
            <span>
              <span className="text-white font-semibold">ordered pairs</span> train you to read components in the right order
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="pt-0.5 text-white">•</span>
            <span>
              <span className="text-white font-semibold">points</span> train you to think of algebraic data as location
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="pt-0.5 text-white">•</span>
            <span>
              <span className="text-white font-semibold">linear algebra</span> later extends this into vectors, transformations, and geometry in higher dimensions
            </span>
          </li>
        </ul>
      </section>

      <section id="summary" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Summary
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The coordinate plane is where algebra starts becoming geometric in a
          visible way.
        </p>
        <div className="ml-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">The coordinate plane is built from a horizontal axis, a vertical axis, and the origin.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">An ordered pair such as <MathInline tex={String.raw`({\color{#22d3ee}2},{\color{#f472b6}3})`} className="math-inline math-white" /> gives one horizontal value and one vertical value.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">The order matters: the first coordinate and second coordinate do different jobs.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">Points represent location, and movement between points can be read as horizontal and vertical change.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">This is the geometric groundwork that later supports vectors and coordinate-based linear algebra.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The next natural lesson is <span className="text-white font-semibold">solving simple equations and rearranging expressions</span>,
          because once coordinates feel readable, the next skill is to manipulate equations confidently and cleanly.
        </p>
      </section>
    </ArticleLayout>
  );
}
