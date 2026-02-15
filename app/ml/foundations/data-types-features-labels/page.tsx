import ArticleLayout from "@/components/ArticleLayout";
import Link from "next/link";
import InfoPanel from "@/components/InfoPanel";
import RightRail from "@/components/RightRail";
import { MathInline } from "@/components/Math";
import { mlFoundationsLessons } from "@/lib/mlTopics";

const HOUSE_DATA = [
  { floor_area: 52, bedrooms: 1, distance_to_centre: 4.5, property_type: "flat", price_gbp: 210000 },
  { floor_area: 68, bedrooms: 2, distance_to_centre: 3.2, property_type: "flat", price_gbp: 265000 },
  { floor_area: 75, bedrooms: 2, distance_to_centre: 6.0, property_type: "terrace", price_gbp: 255000 },
  { floor_area: 90, bedrooms: 3, distance_to_centre: 5.5, property_type: "terrace", price_gbp: 310000 },
  { floor_area: 110, bedrooms: 3, distance_to_centre: 2.8, property_type: "semi", price_gbp: 365000 },
  { floor_area: 130, bedrooms: 4, distance_to_centre: 7.5, property_type: "semi", price_gbp: 390000 },
  { floor_area: 145, bedrooms: 4, distance_to_centre: 3.0, property_type: "detached", price_gbp: 460000 },
  { floor_area: 160, bedrooms: 5, distance_to_centre: 8.0, property_type: "detached", price_gbp: 455000 },
];

const currentLessonHref = "/ml/foundations/data-types-features-labels";
const currentLessonIndex = mlFoundationsLessons.findIndex((lesson) => lesson.href === currentLessonHref);
const nextLesson = currentLessonIndex >= 0 ? mlFoundationsLessons[currentLessonIndex + 1] : undefined;

function ThetaWithIndex({ index }: { index: 0 | 1 | 2 | 3 }) {
  return (
    <span className="inline-flex items-baseline align-middle">
      <MathInline tex={String.raw`\theta`} className="math-inline math-theta" />
      <sub className="ml-[1px] text-[0.72em] leading-none text-white">{index}</sub>
    </span>
  );
}

export default function DataTypesFeaturesLabelsPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "intro", label: "Introduction" },
    { id: "recap", label: "Quick recap", level: 2 },
    { id: "page-roadmap", label: "What this page covers", level: 2 },
    { id: "types", label: "Common data types" },
    { id: "type-integer", label: "Integer", level: 2 },
    { id: "type-float", label: "Float / decimal", level: 2 },
    { id: "type-boolean", label: "Boolean", level: 2 },
    { id: "type-categorical", label: "Categorical", level: 2 },
    { id: "type-datetime", label: "Date / time", level: 2 },
    { id: "type-text", label: "Text", level: 2 },
    { id: "summary", label: "Summary" },
    { id: "key-takeaways", label: "Key takeaways", level: 2 },
    { id: "whats-next", label: "What's next", level: 2 },
  ];

  return (
    <div className="overflow-x-clip">
      <ArticleLayout
        eyebrow="ML - Foundations"
        title="Data types"
        description="How to recognise common ML column types and why each one behaves differently."
        descriptionClassName="italic"
        tocItems={tocItems}
        rightRail={
          <RightRail
            sections={[{ title: "Within Foundations", links: mlFoundationsLessons }]}
            activeHref="/ml/foundations/data-types-features-labels"
          />
        }
      >
      <InfoPanel id="intro" title="Introduction" variant="intro">
        <p>
          Welcome back. This lesson builds directly on the previous article and
          shifts from a high-level intuition to <span className="font-semibold text-white">cleaner data framing</span>.
        </p>
        <h3 id="recap" className="scroll-mt-28 pt-1 text-xl font-semibold text-white">
          Quick recap
        </h3>
        <p>
          In the last article, we began our machine-learning journey by
          introducing core ideas at a fundamental level. We defined a{" "}
          <span className="math-model">model</span> as something that captures relationships between{" "}
          <span className="math-x">input</span> attributes and an{" "}
          <span className="math-yhat">output</span> we want to predict.
        </p>
        <p className="math-center text-2xl">
          <MathInline tex={String.raw`\hat{y}`} className="math-inline math-yhat" />{" "}
          <span className="text-white">=</span>{" "}
          <MathInline tex={String.raw`f`} className="math-inline math-model" />{" "}
          <span className="text-white">(</span>
          <MathInline tex={String.raw`x`} className="math-inline math-x" />
          <span className="text-white">; </span>
          <MathInline tex={String.raw`\theta`} className="math-inline math-theta" />
          <span className="text-white">)</span>
        </p>
        <p>
          To build intuition with concrete numbers, we used a house-price
          dataset:
        </p>
        <div className="glass-panel rounded-2xl p-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-center text-sm text-[color:var(--color-muted)]">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-[0.2em]">
                  <th className="py-2">
                    <span className="math-x">floor_area</span>
                  </th>
                  <th className="py-2">
                    <span className="math-x">bedrooms</span>
                  </th>
                  <th className="py-2">
                    <span className="math-x">distance_to_centre</span>
                  </th>
                  <th className="py-2">
                    <span className="math-y">price_gbp</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-2">52</td>
                  <td className="py-2">1</td>
                  <td className="py-2">4.5</td>
                  <td className="py-2">210,000</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2">68</td>
                  <td className="py-2">2</td>
                  <td className="py-2">3.2</td>
                  <td className="py-2">265,000</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 text-white/70">&#8942;</td>
                  <td className="py-2 text-white/70">&#8942;</td>
                  <td className="py-2 text-white/70">&#8942;</td>
                  <td className="py-2 text-white/70">&#8942;</td>
                </tr>
                <tr>
                  <td className="py-2">160</td>
                  <td className="py-2">5</td>
                  <td className="py-2">8.0</td>
                  <td className="py-2">455,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p>
          We treated the first three columns as features (
          <span className="math-x font-mono">floor_area</span>,{" "}
          <span className="math-x font-mono">bedrooms</span>,{" "}
          <span className="math-x font-mono">distance_to_centre</span>) and
          the final column as the target (
          <span className="math-y font-mono">price_gbp</span>).
        </p>
        <p>
          Using those feature values, we trained a <span className="math-model">model</span>. We started with a
          simple one-feature example (<span className="math-x">floor_area</span>)
          and then progressed to Python with all three features. At a high
          level, we showed how training seeks to reduce aggregate loss across
          repeated learning loops, and we visualized that process.
        </p>
        <p>
          In that multivariable setup, the prediction equation is:
        </p>
        <p className="math-center text-xl leading-9">
          <MathInline tex={String.raw`\hat{y}`} className="math-inline math-yhat" />{" "}
          <span className="text-white">=</span>{" "}
          <ThetaWithIndex index={0} /> <span className="text-white">+</span>{" "}
          <ThetaWithIndex index={1} /> <span className="text-white">&times;</span>{" "}
          <span className="math-x font-mono">floor_area</span>{" "}
          <span className="text-white">+</span>{" "}
          <ThetaWithIndex index={2} /> <span className="text-white">&times;</span>{" "}
          <span className="math-x font-mono">bedrooms</span>{" "}
          <span className="text-white">+</span>{" "}
          <ThetaWithIndex index={3} /> <span className="text-white">&times;</span>{" "}
          <span className="math-x font-mono">distance_to_centre</span>
        </p>
        <p>
          From the multivariable Python run, we learned the following parameter
          values:
        </p>
        <div className="ml-4 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <thead>
              <tr className="border-b border-white/10 text-white">
                <th className="py-2 pr-4">Term</th>
                <th className="py-2 pr-4 text-center">Parameter</th>
                <th className="py-2 text-center">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-4">Intercept</td>
                <td className="py-2 pr-4 text-center"><ThetaWithIndex index={0} /></td>
                <td className="py-2 text-center text-white">&asymp; 124,452</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-4"><span className="math-x font-mono">floor_area</span></td>
                <td className="py-2 pr-4 text-center"><ThetaWithIndex index={1} /></td>
                <td className="py-2 text-center text-white">&asymp; 2,050</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-4"><span className="math-x font-mono">bedrooms</span></td>
                <td className="py-2 pr-4 text-center"><ThetaWithIndex index={2} /></td>
                <td className="py-2 text-center text-white">&asymp; 14,690</td>
              </tr>
              <tr>
                <td className="py-2 pr-4"><span className="math-x font-mono">distance_to_centre</span></td>
                <td className="py-2 pr-4 text-center"><ThetaWithIndex index={3} /></td>
                <td className="py-2 text-center text-white">&asymp; -8,379</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          We then used those values to predict the selling price of a new
          house with <span className="math-x">100</span><span className="text-white"> m^2</span>, <span className="math-x">3</span><span className="text-white"> bedrooms</span>, and <span className="math-x">4</span><span className="text-white"> km</span> from the centre:
        </p>
        <p className="math-center text-2xl">
          <MathInline tex={String.raw`\hat{y}`} className="math-inline math-yhat" />
          <span className="text-white"> &asymp; </span>
          <span className="text-white">330,000</span>
        </p>
        <p>
          You may have noticed that all values above are <em>numeric</em>. That
          was intentional.{" "}
          <span className="font-semibold text-white">
            ML models naturally operate on numbers.
          </span>
        </p>
        <p>
          But real datasets are often broader. For houses, we might also have a{" "}
          <span className="math-x">parking field</span> with{" "}
          <span className="text-emerald-400">yes</span> / <span className="text-rose-400">no</span>{" "}
          values, <span className="math-x">categorical columns</span> with many
          possible values, or <span className="math-x">date fields</span> such
          as listing date.
        </p>
        <p>
          Data type matters because different types usually need different
          treatment before they can be used safely as model inputs. And this is
          not only true for features. The target can also vary by type (for
          example, continuous value vs class label).
        </p>
        <p>
          In this page, we will not go deep into full implementation details.
          Instead, we will build intuition for{" "}
          <span className="font-semibold text-white">key data types</span>,{" "}
          <span className="font-semibold text-white">why they matter</span>,
          and the kinds of conceptual handling choices you will meet next (for
          example handling <em>text</em> fields and <em>scale-related</em>{" "}
          issues).
        </p>
        <h3 id="page-roadmap" className="scroll-mt-28 pt-1 text-xl font-semibold text-white">
          What this page covers
        </h3>
        <p>
          We will move through a practical sequence that mirrors how real ML
          pipelines are built:
        </p>
        <div className="ml-4 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 text-white font-semibold">Type recognition</td>
                <td className="py-2">Quickly identify whether a column is integer, float, boolean, category, date/time, or text.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 text-white font-semibold">Plain-English intuition</td>
                <td className="py-2">Build practical intuition with simple housing examples for each type.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 text-white font-semibold">Mini table patterns</td>
                <td className="py-2">Use consistent small tables so each type is easy to compare.</td>
              </tr>
              <tr>
                <td className="w-56 py-2 pr-4 text-white font-semibold">Next step</td>
                <td className="py-2">Move into train/test splits once the column types are clear.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </InfoPanel>

      <section id="types" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Common data types
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Before we return to house prices, let&apos;s slow down and build a
          practical feel for common data types. If you can quickly recognise a
          column&apos;s type, you can usually predict how it should be handled
          before training.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          In each mini-table, the <span className="math-x">&#8943;</span>{" "}
          columns mean &quot;there are other features here too, we&apos;re just
          focusing on this type right now.&quot;
        </p>
        <div className="grid gap-3">
          <section id="type-integer" className="grid gap-2">
            <h3 className="text-lg font-semibold text-white font-[var(--font-display)]">Integer</h3>
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Integers are whole numbers. No decimal point, no fractions, just
              countable amounts.
            </p>
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              A good mental model is: if you can ask{" "}
              <span className="text-white">&quot;How many?&quot;</span>, you often
              have an integer column.
            </p>
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              In this housing example, we&apos;ll focus on{" "}
              <span className="math-x font-mono">bedrooms</span> (how many bedrooms),{" "}
              <span className="math-x font-mono">num_floors</span> (how many
              storeys), and <span className="math-x font-mono">age_years</span>{" "}
              (property age in years).
            </p>
            <div className="glass-panel rounded-2xl p-4">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-center text-sm text-[color:var(--color-muted)]">
                  <thead>
                    <tr className="border-b border-white/10 text-xs uppercase tracking-[0.2em]">
                      <th className="w-1/6 py-2"><span className="math-x">&#8943;</span></th>
                      <th className="w-1/6 py-2"><span className="math-x">bedrooms</span></th>
                      <th className="w-1/6 py-2"><span className="math-x">num_floors</span></th>
                      <th className="w-1/6 py-2"><span className="math-x">age_years</span></th>
                      <th className="w-1/6 py-2"><span className="math-x">&#8943;</span></th>
                      <th className="w-1/6 py-2"><span className="math-y font-mono">price_gbp</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/10">
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">1</td>
                      <td className="py-2">1</td>
                      <td className="py-2">12</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">210,000</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">2</td>
                      <td className="py-2">2</td>
                      <td className="py-2">8</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">265,000</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2 text-white/70">&#8942;</td>
                      <td className="py-2 text-white/70">&#8942;</td>
                      <td className="py-2 text-white/70">&#8942;</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2 text-white/70">&#8942;</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">5</td>
                      <td className="py-2">2</td>
                      <td className="py-2">5</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">455,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section id="type-float" className="grid gap-2">
            <h3 className="text-lg font-semibold text-white font-[var(--font-display)]">Float / Decimal</h3>
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Floats are numeric values that can include fractions. They are
              useful whenever precision matters.
            </p>
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              In plain terms: these are measurements, rates, and continuous
              quantities rather than simple counts.
            </p>
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              For this slice, we&apos;ll use{" "}
              <span className="math-x font-mono">distance_to_centre</span>{" "}
              (distance from the city centre, in km) and{" "}
              <span className="math-x font-mono">interest_rate</span>{" "}
              (borrowing rate, in percent), because both can take fractional
              values.
            </p>
            <div className="glass-panel rounded-2xl p-4">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-center text-sm text-[color:var(--color-muted)]">
                  <thead>
                    <tr className="border-b border-white/10 text-xs uppercase tracking-[0.2em]">
                      <th className="w-1/5 py-2"><span className="math-x">&#8943;</span></th>
                      <th className="w-1/5 py-2"><span className="math-x">distance_to_centre</span></th>
                      <th className="w-1/5 py-2"><span className="math-x">interest_rate</span></th>
                      <th className="w-1/5 py-2"><span className="math-x">&#8943;</span></th>
                      <th className="w-1/5 py-2"><span className="math-y font-mono">price_gbp</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/10">
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">4.5</td>
                      <td className="py-2">3.90</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">210,000</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">3.2</td>
                      <td className="py-2">3.70</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">265,000</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2 text-white/70">&#8942;</td>
                      <td className="py-2 text-white/70">&#8942;</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2 text-white/70">&#8942;</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">2.8</td>
                      <td className="py-2">3.55</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">455,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section id="type-boolean" className="grid gap-2">
            <h3 className="text-lg font-semibold text-white font-[var(--font-display)]">Boolean</h3>
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Booleans are two-state values: true / false, yes / no, on / off.
            </p>
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              They are great for quick condition checks and often represent a
              clear property of something.
            </p>
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              In this housing dataset,{" "}
              <span className="math-x font-mono">has_garden</span> simply
              records whether the property has a garden (yes or no).
            </p>
            <div className="glass-panel rounded-2xl p-4">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-center text-sm text-[color:var(--color-muted)]">
                  <thead>
                    <tr className="border-b border-white/10 text-xs uppercase tracking-[0.2em]">
                      <th className="w-1/4 py-2"><span className="math-x">&#8943;</span></th>
                      <th className="w-1/4 py-2"><span className="math-x">has_garden</span></th>
                      <th className="w-1/4 py-2"><span className="math-x">&#8943;</span></th>
                      <th className="w-1/4 py-2"><span className="math-y font-mono">price_gbp</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/10">
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2 text-emerald-400">yes</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">210,000</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2 text-rose-400">no</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">265,000</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2 text-white/70">&#8942;</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2 text-white/70">&#8942;</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2 text-rose-400">no</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">455,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section id="type-categorical" className="grid gap-2">
            <h3 className="text-lg font-semibold text-white font-[var(--font-display)]">Categorical</h3>
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Categorical values come from a known set of named options.
              They are labels, not magnitudes.
            </p>
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Important intuition: categories are different kinds, not bigger
              or smaller versions of each other.
            </p>
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Here we&apos;ll use <span className="math-x font-mono">property_type</span>{" "}
              to label the style of home (for example flat, terrace, or
              detached).
            </p>
            <div className="glass-panel rounded-2xl p-4">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-center text-sm text-[color:var(--color-muted)]">
                  <thead>
                    <tr className="border-b border-white/10 text-xs uppercase tracking-[0.2em]">
                      <th className="w-1/4 py-2"><span className="math-x">&#8943;</span></th>
                      <th className="w-1/4 py-2"><span className="math-x">property_type</span></th>
                      <th className="w-1/4 py-2"><span className="math-x">&#8943;</span></th>
                      <th className="w-1/4 py-2"><span className="math-y font-mono">price_gbp</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/10">
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">flat</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">210,000</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">terrace</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">265,000</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2 text-white/70">&#8942;</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2 text-white/70">&#8942;</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">detached</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">455,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section id="type-datetime" className="grid gap-2">
            <h3 className="text-lg font-semibold text-white font-[var(--font-display)]">Date / Time</h3>
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Date/time columns tell you when something happened.
            </p>
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              They often unlock useful patterns like seasonality, day-of-week
              effects, or how recent an event is.
            </p>
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              For this housing dataset, we&apos;ll use{" "}
              <span className="math-x font-mono">listing_date</span> to mean the
              date the property was listed for sale.
            </p>
            <div className="glass-panel rounded-2xl p-4">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-center text-sm text-[color:var(--color-muted)]">
                  <thead>
                    <tr className="border-b border-white/10 text-xs uppercase tracking-[0.2em]">
                      <th className="w-1/4 py-2"><span className="math-x">&#8943;</span></th>
                      <th className="w-1/4 py-2"><span className="math-x">listing_date</span></th>
                      <th className="w-1/4 py-2"><span className="math-x">&#8943;</span></th>
                      <th className="w-1/4 py-2"><span className="math-y font-mono">price_gbp</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/10">
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">2025-01-14</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">210,000</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">2025-01-20</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">265,000</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2 text-white/70">&#8942;</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2 text-white/70">&#8942;</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">2025-02-11</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">455,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section id="type-text" className="grid gap-2">
            <h3 className="text-lg font-semibold text-white font-[var(--font-display)]">Text</h3>
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Text is free-form language written by people, such as notes,
              descriptions, or messages.
            </p>
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              It carries rich meaning, but it usually needs extra processing
              before a model can use it effectively.
            </p>
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              For text data here,{" "}
              <span className="math-x font-mono">description</span> is the
              public advert copy, while{" "}
              <span className="math-x font-mono">agent_notes</span> captures the
              agent&apos;s internal free-form comments.
            </p>
            <div className="glass-panel rounded-2xl p-4">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-center text-sm text-[color:var(--color-muted)]">
                  <thead>
                    <tr className="border-b border-white/10 text-xs uppercase tracking-[0.2em]">
                      <th className="w-1/5 py-2"><span className="math-x">&#8943;</span></th>
                      <th className="w-1/5 py-2"><span className="math-x">description</span></th>
                      <th className="w-1/5 py-2"><span className="math-x">agent_notes</span></th>
                      <th className="w-1/5 py-2"><span className="math-x">&#8943;</span></th>
                      <th className="w-1/5 py-2"><span className="math-y font-mono">price_gbp</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/10">
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2 text-left">Compact city flat near station</td>
                      <td className="py-2 text-left">Needs repaint in hallway</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">210,000</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2 text-left">Bright two-bed with balcony</td>
                      <td className="py-2 text-left">Strong weekend viewing interest</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">265,000</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2 text-white/70">&#8942;</td>
                      <td className="py-2 text-white/70">&#8942;</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2 text-white/70">&#8942;</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2 text-left">Detached home with large garden</td>
                      <td className="py-2 text-left">Seller open to quick completion</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">455,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We will now return to the house-price dataset and keep building from
          there.
        </p>
      </section>

      <section id="summary" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Summary
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This page focused on one thing: understanding common ML data types in
          a practical, non-technical way.
        </p>

        <section id="key-takeaways" className="grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Key takeaways
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
              <tbody>
                <tr>
                  <td className="w-12 py-2 text-center text-lg">&#10003;</td>
                  <td className="py-2">Integers are countable whole numbers.</td>
                </tr>
                <tr>
                  <td className="w-12 py-2 text-center text-lg">&#10003;</td>
                  <td className="py-2">Floats/decimals capture measured quantities with fractions.</td>
                </tr>
                <tr>
                  <td className="w-12 py-2 text-center text-lg">&#10003;</td>
                  <td className="py-2">Booleans and categories represent states and named groups, not magnitudes.</td>
                </tr>
                <tr>
                  <td className="w-12 py-2 text-center text-lg">&#10003;</td>
                  <td className="py-2">Date/time and text columns carry useful signal, but usually need extra handling later.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="whats-next" className="grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            What&apos;s next
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Next lesson: <span className="text-white font-semibold">train/test splits</span>.
          </p>
        </section>
      </section>

      {nextLesson ? (
        <section className="flex justify-end pt-2">
          <Link
            href={nextLesson.href}
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
          >
            Next Article
            <span aria-hidden>&rarr;</span>
          </Link>
        </section>
      ) : null}
      </ArticleLayout>
    </div>
  );
}
