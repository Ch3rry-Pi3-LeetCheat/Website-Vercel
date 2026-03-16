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
  title: "Magnitude, Distance, and Normalization",
  description:
    "Measure vector length, read distance as the size of a difference, and normalize nonzero vectors into unit vectors.",
};

export default function MagnitudeDistanceAndNormalizationPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "intro", label: "Introduction" },
    { id: "why", label: "Why this topic comes next", level: 2 },
    { id: "magnitude", label: "Magnitude" },
    { id: "distance", label: "Distance" },
    { id: "normalization", label: "Normalization" },
    { id: "unit-vectors", label: "Why unit vectors matter" },
    { id: "bridge", label: "What comes next" },
    { id: "summary", label: "Summary" },
  ];

  return (
    <ArticleLayout
      eyebrow="Mathematics - Linear Algebra - Vectors"
      title="Magnitude, distance, and normalization"
      description="This lesson gives vectors a measurable size. Once vectors can be added and scaled, the next question is how long a vector is, how far apart two points are, and how to keep a direction while stripping away the size."
      descriptionClassName="!max-w-none"
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Linear Algebra phases", links: linearAlgebraPhases },
            { title: "Within this phase", links: linearAlgebraVectorLessons },
          ]}
          activeHref="/mathematics/linear-algebra/vectors-and-geometric-intuition/magnitude-distance-and-normalization"
        />
      }
    >
      <InfoPanel id="intro" title="Introduction" variant="intro">
        <p>
          The previous lesson showed how vectors combine and scale. This lesson
          answers a different beginner question: <span className="text-white font-semibold">how big is a vector</span>?
        </p>
        <p>
          That one question opens three closely related ideas. Vector{" "}
          <span className="text-white font-semibold">magnitude</span> measures
          length. <span className="text-white font-semibold">distance</span>{" "}
          measures how far apart two points or vectors are.{" "}
          <span className="text-white font-semibold">normalization</span> keeps
          the direction of a nonzero vector while changing its length to 1.
        </p>
        <p>Here is the roadmap for this lesson:</p>
        <div className="ml-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Magnitude</td>
                <td className="py-2">How to read the length of a vector and why the Pythagorean theorem appears naturally.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Distance</td>
                <td className="py-2">How the distance between points becomes the magnitude of a difference vector.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Normalization</td>
                <td className="py-2">How to turn a nonzero vector into a unit vector that points in the same direction.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 font-semibold text-white">Why unit vectors matter</td>
                <td className="py-2">Why separating direction from size makes later geometric ideas much cleaner.</td>
              </tr>
              <tr>
                <td className="w-56 py-2 pr-4 font-semibold text-white">What comes next</td>
                <td className="py-2">How these ideas prepare the way for dot products, angles, and projections.</td>
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
          Once vectors can be drawn and added, the next natural question is not
          about a new symbol. It is about{" "}
          <span className="text-white font-semibold">size</span>.
        </p>
        <MathBlock
          tex={String.raw`\|{\color{#22d3ee}\mathbf{v}}\|,\qquad d(A,B),\qquad \widehat{{\color{#22d3ee}\mathbf{v}}}=\frac{{\color{#22d3ee}\mathbf{v}}}{\|{\color{#22d3ee}\mathbf{v}}\|}`}
          className="math-center math-lg text-white/90"
        />
        <p>
          These expressions are all different ways of asking how large a
          movement is, how far apart two positions are, or how to keep a
          direction while making the length standard. That is exactly the
          geometric layer the next phase topics need.
        </p>
      </InfoPanel>

      <section id="magnitude" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Magnitude
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The magnitude of a vector is its length. If a vector is pictured as an
          arrow from the origin, magnitude answers the question{" "}
          <span className="text-white font-semibold">how long is that arrow</span>?
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          For a two-dimensional vector such as{" "}
          <MathInline
            tex={String.raw`{\color{#22d3ee}\mathbf{v}}=(4,3)`}
            className="math-inline math-white"
          />
          , the horizontal and vertical changes make a right triangle. That is
          why the{" "}
          <span className="text-white font-semibold">Pythagorean theorem</span>{" "}
          appears immediately.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The{" "}
          <span className="text-white font-semibold">Pythagorean theorem</span>{" "}
          says that in any right triangle, the two shorter sides and the
          hypotenuse are tied together by one fixed rule:
        </p>
        <div className="text-white/90" style={{ fontSize: "1.6rem" }}>
          <MathBlock
            tex={String.raw`{\color{#f472b6}a}^{2}\mathbin{\color{white}{+}}{\color{#22d3ee}b}^{2}={\color{#c084fc}c}^{2}`}
            className="math-center"
          />
        </div>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We can visualize this with a simple right triangle:
        </p>
        <AlgebraStaticVisual
          variant="pythagorean-triangle"
          framed={false}
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          In the vector picture, the horizontal movement is 4, the vertical
          movement is 3, and the vector itself is the hypotenuse. So the{" "}
          <span className="text-white font-semibold">Pythagorean theorem</span>{" "}
          is not being imported from nowhere. The geometry of the picture is
          already forcing it on us.
        </p>
        <MathBlock
          tex={String.raw`\|{\color{#22d3ee}\mathbf{v}}\|=\sqrt{4^{2}+3^{2}}=\sqrt{16+9}=\sqrt{25}=5`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          So <MathInline tex={String.raw`\|{\color{#22d3ee}\mathbf{v}}\|=5`} className="math-inline math-white" /> means the vector has length 5.
          The components tell you how it moves. The magnitude tells you how much
          total movement that becomes.
        </p>
        <AlgebraStaticVisual
          variant="vector-magnitude"
          framed={false}
          caption="The components 4 and 3 form a right triangle, so the vector length is 5."
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          In general, if{" "}
          <MathInline
            tex={String.raw`{\color{#22d3ee}\mathbf{v}}=(x,y)`}
            className="math-inline math-white"
          />
          , then:
        </p>
        <MathBlock
          tex={String.raw`\|{\color{#22d3ee}\mathbf{v}}\|=\sqrt{x^{2}+y^{2}}`}
          className="math-center math-lg text-white/90"
        />
      </section>

      <section id="distance" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Distance
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Distance is the same idea seen between two points. If point{" "}
          <MathInline tex={String.raw`{\color{#f472b6}\mathbf{A}}=(1,1)`} className="math-inline math-white" /> and point{" "}
          <MathInline tex={String.raw`{\color{#22d3ee}\mathbf{B}}=(5,4)`} className="math-inline math-white" /> are plotted on the plane,
          the distance between them is the length of the displacement from{" "}
          <MathInline tex={String.raw`{\color{#f472b6}\mathbf{A}}`} className="math-inline math-white" /> to{" "}
          <MathInline tex={String.raw`{\color{#22d3ee}\mathbf{B}}`} className="math-inline math-white" />.
        </p>
        <MathBlock
          tex={String.raw`{\color{#22d3ee}\mathbf{B}}-{\color{#f472b6}\mathbf{A}}=(5,4)-(1,1)=(4,3)`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We choose{" "}
          <MathInline
            tex={String.raw`{\color{#22d3ee}\mathbf{B}}-{\color{#f472b6}\mathbf{A}}`}
            className="math-inline math-white"
          />{" "}
          because we are moving from{" "}
          <MathInline tex={String.raw`{\color{#f472b6}\mathbf{A}}`} className="math-inline math-white" /> to{" "}
          <MathInline tex={String.raw`{\color{#22d3ee}\mathbf{B}}`} className="math-inline math-white" />.
          If you swapped the order, the arrow would point the opposite way, but
          the final distance would stay the same once you take the magnitude.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Once that difference vector is found, the distance is just its{" "}
          <span className="text-white font-semibold">magnitude</span>. We write{" "}
          <MathInline
            tex={String.raw`d({\color{#f472b6}\mathbf{A}},{\color{#22d3ee}\mathbf{B}})`}
            className="math-inline math-white"
          />{" "}
          for the{" "}
          <span className="text-white font-semibold">distance function</span>:
          it takes two points as input and returns a{" "}
          <span className="text-white font-semibold">single number</span>{" "}
          telling you how far apart they are.
        </p>
        <MathBlock
          tex={String.raw`d({\color{#f472b6}\mathbf{A}},{\color{#22d3ee}\mathbf{B}})=\left\|{\color{#22d3ee}\mathbf{B}}-{\color{#f472b6}\mathbf{A}}\right\|=\sqrt{(5-1)^{2}+(4-1)^{2}}=\sqrt{4^{2}+3^{2}}=5`}
          className="math-center math-lg text-white/90"
        />
        <AlgebraStaticVisual
          variant="vector-distance"
          framed={false}
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          <span className="text-white font-semibold">Distance</span> ignores{" "}
          <span className="text-white font-semibold">direction</span> and keeps
          only <span className="text-white font-semibold">size</span>. The
          segment between{" "}
          <MathInline tex={String.raw`{\color{#f472b6}\mathbf{A}}`} className="math-inline math-white" />{" "}
          and{" "}
          <MathInline tex={String.raw`{\color{#22d3ee}\mathbf{B}}`} className="math-inline math-white" />{" "}
          forms the same 4-3-5 right triangle.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This is an important{" "}
          <span className="text-white font-semibold">bridge idea</span>. A
          point difference becomes a vector, and the magnitude of that vector
          becomes a distance. For a beginner, this is the moment where points,
          arrows, and geometry stop feeling like separate topics and start
          fitting into one picture.
        </p>
      </section>

      <section id="normalization" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Normalization
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Sometimes the{" "}
          <span className="text-white font-semibold">direction</span> of a
          vector matters more than its size.
          Normalization is the process of taking a{" "}
          <span className="text-white font-semibold">nonzero vector</span> and
          making its length equal to 1 without changing its direction. In other
          words, normalization keeps the part that says{" "}
          <span className="text-white font-semibold">where to point</span> and
          strips away the part that says{" "}
          <span className="text-white font-semibold">how far to go</span>.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          For{" "}
          <MathInline
            tex={String.raw`{\color{#22d3ee}\mathbf{v}}=(4,3)`}
            className="math-inline math-white"
          />
          , we already know that{" "}
          <MathInline
            tex={String.raw`\|{\color{#22d3ee}\mathbf{v}}\|=5`}
            className="math-inline math-white"
          />
          . So divide every component by 5. Because every component is scaled by
          the same factor, the arrow shrinks without rotating:
        </p>
        <MathBlock
          tex={String.raw`\widehat{{\color{#f472b6}\mathbf{v}}}=\frac{{\color{#22d3ee}\mathbf{v}}}{\|{\color{#22d3ee}\mathbf{v}}\|}=\frac{1}{5}(4,3)=\left(\frac{4}{5},\frac{3}{5}\right)`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          That new vector points the same way as{" "}
          <MathInline
            tex={String.raw`{\color{#22d3ee}\mathbf{v}}`}
            className="math-inline math-white"
          />
          , but now its length is 1. That is why it is called a{" "}
          <span className="text-white font-semibold">unit vector</span>.
          Normalization keeps the direction and throws away the size.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          A good way to picture normalization is this: keep the arrow on the{" "}
          <span className="text-white font-semibold">same ray</span>, but slide
          its tip inward or outward until it sits exactly 1 unit from the
          origin. Nothing about the direction changes. Only the scale changes.
          That is why normalization is so useful later: it gives you a clean way
          to compare directions without letting long vectors dominate short ones.
        </p>
        <MathBlock
          tex={String.raw`\left\|\widehat{{\color{#f472b6}\mathbf{v}}}\right\|=\sqrt{\left(\frac{4}{5}\right)^{2}+\left(\frac{3}{5}\right)^{2}}=\sqrt{\frac{16}{25}+\frac{9}{25}}=\sqrt{1}=1`}
          className="math-center math-lg text-white/90"
        />
        <AlgebraStaticVisual
          variant="vector-normalization"
          framed={false}
          caption="Normalization keeps the same direction but rescales the vector so its length becomes 1."
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          One important warning belongs here: the{" "}
          <span className="text-white font-semibold">zero vector cannot be normalized</span>,
          because dividing by its magnitude would mean dividing by 0. More
          deeply, the zero vector has no direction to preserve in the first
          place.
        </p>
      </section>

      <section id="unit-vectors" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Why unit vectors matter
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Unit vectors let you separate{" "}
          <span className="text-white font-semibold">direction</span> from{" "}
          <span className="text-white font-semibold">size</span>. That is useful
          because many later ideas need to compare directions cleanly. Once all
          vectors have the same standard length, you can focus on orientation
          instead of being distracted by scale.
        </p>
        <div className="ml-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr>
                <td className="w-56 py-2 pr-4 font-semibold text-white">Original vector</td>
                <td className="py-2">Tells you both direction and length.</td>
              </tr>
              <tr>
                <td className="w-56 py-2 pr-4 font-semibold text-white">Normalized vector</td>
                <td className="py-2">Keeps the direction but standardizes the length to 1.</td>
              </tr>
              <tr>
                <td className="w-56 py-2 pr-4 font-semibold text-white">Why that helps</td>
                <td className="py-2">It becomes easier to discuss alignment, angle, and comparison without length getting in the way.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          So normalization is not just a calculation trick. It is a way to make
          the geometry cleaner before more advanced operations arrive.
        </p>
      </section>

      <section id="bridge" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          What comes next
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This lesson gives you the size vocabulary that the next part of the
          vector story needs. Once length and unit direction are clear, the next
          natural question is how two vectors compare in direction and alignment.
        </p>
        <MathBlock
          tex={String.raw`{\color{#f472b6}\mathbf{u}}\cdot{\color{#22d3ee}\mathbf{v}}=u_{1}v_{1}\mathbin{\color{white}{+}}u_{2}v_{2},\qquad {\color{#f472b6}\mathbf{u}}\cdot{\color{#22d3ee}\mathbf{v}}=\|{\color{#f472b6}\mathbf{u}}\|\,\|{\color{#22d3ee}\mathbf{v}}\|\cos\theta`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Those are genuinely next-step equations, not just a recap of this
          page. Magnitude gives the size information, normalization sharpens the
          idea of direction, and the dot product is what combines both into one
          operation.
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
                <td className="py-2">Magnitude measures the length of a vector.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">In two dimensions, magnitude comes from the Pythagorean theorem.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">Distance between points is the magnitude of a difference vector.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">Normalization turns a nonzero vector into a unit vector with the same direction.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">✅</td>
                <td className="py-2">These ideas prepare the way for dot products, angles, and projections.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </ArticleLayout>
  );
}
