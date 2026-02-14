import ArticleLayout from "@/components/ArticleLayout";
import Link from "next/link";
import InfoPanel from "@/components/InfoPanel";
import RightRail from "@/components/RightRail";
import { MathBlock, MathInline } from "@/components/Math";
import ColumnRolePicker from "@/components/ml/ColumnRolePicker";
import LeakageCheckQuiz from "@/components/ml/LeakageCheckQuiz";
import { mlFoundationsLessons } from "@/lib/mlTopics";

const HOUSE_DATA = [
  { floor_area_m2: 52, bedrooms: 1, distance_to_centre: 4.5, property_type: "flat", price_gbp: 210000 },
  { floor_area_m2: 68, bedrooms: 2, distance_to_centre: 3.2, property_type: "flat", price_gbp: 265000 },
  { floor_area_m2: 75, bedrooms: 2, distance_to_centre: 6.0, property_type: "terrace", price_gbp: 255000 },
  { floor_area_m2: 90, bedrooms: 3, distance_to_centre: 5.5, property_type: "terrace", price_gbp: 310000 },
  { floor_area_m2: 110, bedrooms: 3, distance_to_centre: 2.8, property_type: "semi", price_gbp: 365000 },
  { floor_area_m2: 130, bedrooms: 4, distance_to_centre: 7.5, property_type: "semi", price_gbp: 390000 },
  { floor_area_m2: 145, bedrooms: 4, distance_to_centre: 3.0, property_type: "detached", price_gbp: 460000 },
  { floor_area_m2: 160, bedrooms: 5, distance_to_centre: 8.0, property_type: "detached", price_gbp: 455000 },
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
    { id: "dataset", label: "Example dataset" },
    { id: "roles", label: "Features vs label" },
    { id: "label-type", label: "Label decides problem type" },
    { id: "prep", label: "From raw to model-ready" },
    { id: "quality", label: "Feature quality" },
    { id: "notation", label: "Notation (X and y)" },
    { id: "traps", label: "Common traps" },
    { id: "leakage-check", label: "Leakage check", level: 2 },
    { id: "checkpoint", label: "Mini-checkpoint" },
    { id: "summary", label: "Summary" },
  ];

  return (
    <div className="overflow-x-clip">
      <ArticleLayout
        eyebrow="ML - Foundations"
        title="Data types, features, labels"
        description="What a model sees as input, what it should predict, and how raw columns become usable features."
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
            <table className="w-full border-collapse text-left text-sm text-[color:var(--color-muted)]">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-[0.2em]">
                  <th className="py-2">
                    <span className="math-x">floor_area_m2</span>
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
                  <td className="py-2 text-white/70">&#8943;</td>
                  <td className="py-2 text-white/70">&#8943;</td>
                  <td className="py-2 text-white/70">&#8943;</td>
                  <td className="py-2 text-white/70">&#8943;</td>
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
          <span className="math-x font-mono">floor_area_m2</span>,{" "}
          <span className="math-x font-mono">bedrooms</span>,{" "}
          <span className="math-x font-mono">distance_to_centre</span>) and
          the final column as the target (
          <span className="math-y font-mono">price_gbp</span>).
        </p>
        <p>
          Using those feature values, we trained a <span className="math-model">model</span>. We started with a
          simple one-feature example (<span className="math-x">floor_area_m2</span>)
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
          <span className="math-x font-mono">floor_area_m2</span>{" "}
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
                <th className="py-2 pr-4">Parameter</th>
                <th className="py-2">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-4">Intercept</td>
                <td className="py-2 pr-4"><ThetaWithIndex index={0} /></td>
                <td className="py-2 text-white">&asymp; 124,452</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-4"><span className="math-x font-mono">floor_area_m2</span></td>
                <td className="py-2 pr-4"><ThetaWithIndex index={1} /></td>
                <td className="py-2 text-white">&asymp; 2,050</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-4"><span className="math-x font-mono">bedrooms</span></td>
                <td className="py-2 pr-4"><ThetaWithIndex index={2} /></td>
                <td className="py-2 text-white">&asymp; 14,690</td>
              </tr>
              <tr>
                <td className="py-2 pr-4"><span className="math-x font-mono">distance_to_centre</span></td>
                <td className="py-2 pr-4"><ThetaWithIndex index={3} /></td>
                <td className="py-2 text-white">&asymp; -8,379</td>
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
                <td className="w-56 py-2 pr-4 text-white font-semibold">Dataset framing</td>
                <td className="py-2">Reuse one house dataset so each new concept stacks cleanly.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 text-white font-semibold">Features vs label</td>
                <td className="py-2">Separate model inputs from the target we want to predict.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 text-white font-semibold">Data types</td>
                <td className="py-2">Handle numeric, categorical, text, boolean, and datetime fields correctly.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 text-white font-semibold">Model-ready data</td>
                <td className="py-2">See how raw columns become usable feature vectors.</td>
              </tr>
              <tr>
                <td className="w-56 py-2 pr-4 text-white font-semibold">Pitfalls + checks</td>
                <td className="py-2">Practice leakage detection and role assignment with interactive checks.</td>
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
          In each mini-table, the <span className="text-white">&#8943;</span>{" "}
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
              Think of variables like{" "}
              <span className="math-x font-mono">bedrooms</span>{" "}
              <span className="text-white">(number of bedrooms)</span>,{" "}
              <span className="math-x font-mono">num_floors</span>{" "}
              <span className="text-white">(number of floors)</span>, or{" "}
              <span className="math-x font-mono">age_years</span>{" "}
              <span className="text-white">(property age in years)</span>.
            </p>
            <div className="glass-panel rounded-2xl p-4">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm text-[color:var(--color-muted)]">
                  <thead>
                    <tr className="border-b border-white/10 text-xs uppercase tracking-[0.2em]">
                      <th className="w-1/6 py-2 text-white/70">&#8943;</th>
                      <th className="w-1/6 py-2"><span className="math-x">bedrooms</span></th>
                      <th className="w-1/6 py-2"><span className="math-x">num_floors</span></th>
                      <th className="w-1/6 py-2"><span className="math-x">age_years</span></th>
                      <th className="w-1/6 py-2 text-white/70">&#8943;</th>
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
                      <td className="py-2">2</td>
                      <td className="py-2">1</td>
                      <td className="py-2">20</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">255,000</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">3</td>
                      <td className="py-2">2</td>
                      <td className="py-2">5</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">310,000</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2 text-white/70">&#8943;</td>
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
              Example variables:{" "}
              <span className="math-x font-mono">distance_to_centre</span>{" "}
              <span className="text-white">(distance from city centre in km)</span> ={" "}
              <span className="text-white">4.5</span>,{" "}
              <span className="math-x font-mono">interest_rate</span>{" "}
              <span className="text-white">(borrowing rate in percent)</span> ={" "}
              <span className="text-white">3.75</span>.
            </p>
            <div className="glass-panel rounded-2xl p-4">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm text-[color:var(--color-muted)]">
                  <thead>
                    <tr className="border-b border-white/10 text-xs uppercase tracking-[0.2em]">
                      <th className="w-1/5 py-2 text-white/70">&#8943;</th>
                      <th className="w-1/5 py-2"><span className="math-x">distance_to_centre</span></th>
                      <th className="w-1/5 py-2"><span className="math-x">interest_rate</span></th>
                      <th className="w-1/5 py-2 text-white/70">&#8943;</th>
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
                      <td className="py-2">6.0</td>
                      <td className="py-2">4.20</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">255,000</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">2.8</td>
                      <td className="py-2">3.55</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">365,000</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2 text-white/70">&#8943;</td>
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
              Example: <span className="math-x font-mono">has_garden</span>{" "}
              <span className="text-white">(whether a property has a garden)</span> ={" "}
              <span className="text-emerald-400">yes</span> or{" "}
              <span className="math-x font-mono">has_garden</span> ={" "}
              <span className="text-rose-400">no</span>.
            </p>
            <div className="glass-panel rounded-2xl p-4">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm text-[color:var(--color-muted)]">
                  <thead>
                    <tr className="border-b border-white/10 text-xs uppercase tracking-[0.2em]">
                      <th className="w-1/4 py-2 text-white/70">&#8943;</th>
                      <th className="w-1/4 py-2"><span className="math-x">has_garden</span></th>
                      <th className="w-1/4 py-2 text-white/70">&#8943;</th>
                      <th className="w-1/4 py-2"><span className="math-y font-mono">price_gbp</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/10">
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2 text-emerald-400">yes</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">310,000</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2 text-rose-400">no</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">265,000</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2 text-emerald-400">yes</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">390,000</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2 text-rose-400">no</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">255,000</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2 text-white/70">&#8943;</td>
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
              Example: <span className="math-x font-mono">property_type</span> ={" "}
              <span className="text-white">(home style category)</span>{" "}
              <span className="text-white">flat / semi / detached</span>.
            </p>
            <div className="glass-panel rounded-2xl p-4">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm text-[color:var(--color-muted)]">
                  <thead>
                    <tr className="border-b border-white/10 text-xs uppercase tracking-[0.2em]">
                      <th className="w-1/4 py-2 text-white/70">&#8943;</th>
                      <th className="w-1/4 py-2"><span className="math-x">property_type</span></th>
                      <th className="w-1/4 py-2 text-white/70">&#8943;</th>
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
                      <td className="py-2">255,000</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">semi</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">365,000</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">detached</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">460,000</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2 text-white/70">&#8943;</td>
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
              Example: <span className="math-x font-mono">listing_date</span> ={" "}
              <span className="text-white">(the day the home went live)</span>{" "}
              <span className="text-white">2025-02-11</span>.
            </p>
            <div className="glass-panel rounded-2xl p-4">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm text-[color:var(--color-muted)]">
                  <thead>
                    <tr className="border-b border-white/10 text-xs uppercase tracking-[0.2em]">
                      <th className="w-1/4 py-2 text-white/70">&#8943;</th>
                      <th className="w-1/4 py-2"><span className="math-x">listing_date</span></th>
                      <th className="w-1/4 py-2 text-white/70">&#8943;</th>
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
                      <td className="py-2">2025-02-02</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">255,000</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">2025-02-11</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">310,000</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2 text-white/70">&#8943;</td>
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
              Example variables: <span className="math-x font-mono">listing_description</span>{" "}
              <span className="text-white">(public advert text)</span> or{" "}
              <span className="math-x font-mono">agent_notes</span>{" "}
              <span className="text-white">(internal free-form comments)</span>.
            </p>
            <div className="glass-panel rounded-2xl p-4">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm text-[color:var(--color-muted)]">
                  <thead>
                    <tr className="border-b border-white/10 text-xs uppercase tracking-[0.2em]">
                      <th className="w-1/5 py-2 text-white/70">&#8943;</th>
                      <th className="w-1/5 py-2"><span className="math-x">listing_description</span></th>
                      <th className="w-1/5 py-2"><span className="math-x">agent_notes</span></th>
                      <th className="w-1/5 py-2 text-white/70">&#8943;</th>
                      <th className="w-1/5 py-2"><span className="math-y font-mono">price_gbp</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/10">
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">Compact city flat near station</td>
                      <td className="py-2">Needs repaint in hallway</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">210,000</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">Bright two-bed with balcony</td>
                      <td className="py-2">Strong weekend viewing interest</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">265,000</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">Terrace close to local schools</td>
                      <td className="py-2">Kitchen recently refurbished</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">310,000</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">Detached home with large garden</td>
                      <td className="py-2">Seller open to quick completion</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2">460,000</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2 text-white/70">&#8943;</td>
                      <td className="py-2 text-white/70">&#8943;</td>
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

      <section id="dataset" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Example dataset
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We will reuse a house-price dataset. Reusing one table helps new
          concepts stack rather than reset each section.
        </p>
        <div className="glass-panel rounded-2xl p-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm text-[color:var(--color-muted)]">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-[0.2em]">
                  <th className="py-2">
                    <span className="math-x">floor_area_m2</span>
                  </th>
                  <th className="py-2">
                    <span className="math-x">bedrooms</span>
                  </th>
                  <th className="py-2">
                    <span className="math-x">distance_to_centre</span>
                  </th>
                  <th className="py-2">
                    <span className="math-x">property_type</span>
                  </th>
                  <th className="py-2">
                    <span className="math-y">price_gbp</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {HOUSE_DATA.map((row) => (
                  <tr key={`${row.floor_area_m2}-${row.distance_to_centre}`} className="border-b border-white/10">
                    <td className="py-2">{row.floor_area_m2}</td>
                    <td className="py-2">{row.bedrooms}</td>
                    <td className="py-2">{row.distance_to_centre}</td>
                    <td className="py-2">{row.property_type}</td>
                    <td className="py-2">{row.price_gbp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="roles" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Features vs label
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          In this table, everything except{" "}
          <span className="math-y">price_gbp</span> is a candidate feature.
          {" "}
          <span className="math-y">price_gbp</span> is the label.
        </p>
        <div className="overflow-x-auto">
          <MathBlock
            tex={String.raw`\underbrace{(floor\_area\_m2,\ bedrooms,\ distance\_to\_centre,\ property\_type)}_{\text{features }x} \longrightarrow \underbrace{price\_gbp}_{\text{label }y}`}
            className="math-center math-lg text-white/90"
          />
        </div>
        <div className="grid gap-2 text-base leading-7 text-[color:var(--color-muted)]">
          <p>
            Practical test: <span className="text-white">can this value be known when I make a new prediction?</span>
          </p>
          <p>
            If yes, it can be a feature. If it is what you are trying to
            predict, it is the label. If neither, consider dropping it.
          </p>
        </div>
      </section>

      <section id="label-type" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Label decides problem type
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Your label type determines what kind of ML problem you are solving.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm text-[color:var(--color-muted)]">
            <thead>
              <tr className="border-b border-white/10 text-white">
                <th className="py-2 pr-4">Label shape</th>
                <th className="py-2 pr-4">Example label</th>
                <th className="py-2">Problem type</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-4">Continuous number</td>
                <td className="py-2 pr-4">price_gbp = 365000</td>
                <td className="py-2">Regression</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-4">Two classes</td>
                <td className="py-2 pr-4">spam = yes / no</td>
                <td className="py-2">Binary classification</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Many classes</td>
                <td className="py-2 pr-4">topic = sports/news/politics</td>
                <td className="py-2">Multiclass classification</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="prep" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          From raw to model-ready
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Raw columns are rarely perfect. Usually we apply light preprocessing
          before training.
        </p>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="glass-panel rounded-2xl p-4">
            <p className="text-white font-semibold">Encode categories</p>
            <p className="mt-1 text-sm text-[color:var(--color-muted)]">
              Example: property_type -&gt; flat/semi/detached binary flags.
            </p>
          </div>
          <div className="glass-panel rounded-2xl p-4">
            <p className="text-white font-semibold">Handle missing values</p>
            <p className="mt-1 text-sm text-[color:var(--color-muted)]">
              Fill, drop, or add a missing indicator, depending on context.
            </p>
          </div>
          <div className="glass-panel rounded-2xl p-4">
            <p className="text-white font-semibold">Scale when needed</p>
            <p className="mt-1 text-sm text-[color:var(--color-muted)]">
              Helpful when feature magnitudes are very different.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <MathBlock
            tex={String.raw`property\_type = detached \;\Rightarrow\; [is\_flat,\ is\_semi,\ is\_detached] = [0,\ 0,\ 1]`}
            className="math-center math-lg text-white/90"
          />
        </div>
      </section>

      <section id="quality" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Feature quality
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Not all features are equally useful. Strong features carry predictive
          signal that is available at prediction time.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm text-[color:var(--color-muted)]">
            <thead>
              <tr className="border-b border-white/10 text-white">
                <th className="py-2 pr-4">Column</th>
                <th className="py-2 pr-4">Quality</th>
                <th className="py-2">Reason</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-4">floor_area_m2</td>
                <td className="py-2 pr-4 text-emerald-400">Strong</td>
                <td className="py-2">Direct relation to price in many markets.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-4">distance_to_centre</td>
                <td className="py-2 pr-4 text-emerald-400">Strong</td>
                <td className="py-2">Captures location effects.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-4">listing_id</td>
                <td className="py-2 pr-4 text-rose-400">Weak</td>
                <td className="py-2">Usually an identifier, not a true signal.</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">sale_price_last_month</td>
                <td className="py-2 pr-4 text-rose-400">Dangerous</td>
                <td className="py-2">May leak near-target information.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="notation" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Notation (X and y)
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We write the feature matrix as{" "}
          <MathInline tex={String.raw`X`} className="math-inline math-x" />
          {" "}and the label vector as{" "}
          <MathInline tex={String.raw`y`} className="math-inline math-y" />.
        </p>
        <div className="overflow-x-auto">
          <MathBlock
            tex={String.raw`X \in \mathbb{R}^{n \times d},\qquad y \in \mathbb{R}^{n}`}
            className="math-center math-lg text-white/90"
          />
        </div>
        <div className="grid gap-2 text-base leading-7 text-[color:var(--color-muted)]">
          <p>
            In this dataset: <span className="text-white">n = 8</span> rows.
          </p>
          <p>
            If we use numeric columns only, then{" "}
            <span className="text-white">d = 3</span> features.
          </p>
          <p>
            Row 5 can be written as{" "}
            <MathInline
              tex={String.raw`x^{(5)} = (110,\ 3,\ 2.8),\quad y^{(5)} = 365000`}
              className="math-inline"
            />
            .
          </p>
        </div>
      </section>

      <section id="traps" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Common traps
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm text-[color:var(--color-muted)]">
            <thead>
              <tr className="border-b border-white/10 text-white">
                <th className="py-2 pr-4">Trap</th>
                <th className="py-2">Why it hurts</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-4">Using IDs as features</td>
                <td className="py-2">Creates noise and fake patterns.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-4">Data leakage</td>
                <td className="py-2">Model sees information it would not have in production.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-4">Label in feature set</td>
                <td className="py-2">Training score looks excellent but does not generalize.</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Ambiguous label definition</td>
                <td className="py-2">You optimize the wrong target.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <section id="leakage-check" className="grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Leakage check
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            If a column would not be known when you make a real prediction, it
            should not be used as a feature.
          </p>
          <LeakageCheckQuiz
            items={[
              {
                column: "floor_area_m2",
                canUseAtPrediction: true,
                reason: "Known before price prediction.",
              },
              {
                column: "price_reduction_after_30_days",
                canUseAtPrediction: false,
                reason: "Happens after listing - future information.",
              },
              {
                column: "agent_notes",
                canUseAtPrediction: true,
                reason: "Can be known if entered before prediction.",
              },
              {
                column: "final_sold_price",
                canUseAtPrediction: false,
                reason: "This is effectively the target itself.",
              },
            ]}
          />
        </section>
      </section>

      <section id="checkpoint" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Mini-checkpoint
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Assign each column as Feature, Label, or Ignore.
        </p>
        <ColumnRolePicker
          columns={[
            { name: "floor_area_m2", answer: "feature", hint: "Known before prediction." },
            { name: "bedrooms", answer: "feature", hint: "Input clue about utility/size." },
            { name: "distance_to_centre", answer: "feature", hint: "Location clue." },
            { name: "price_gbp", answer: "label", hint: "Target to predict." },
            { name: "listing_id", answer: "ignore", hint: "Identifier, usually no stable signal." },
          ]}
        />
      </section>

      <section id="summary" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Summary
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Good ML starts with disciplined data framing: clear label, sensible
          features, correct types, and leakage checks.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Next, we will make that discipline measurable by splitting data into
          train/validation/test sets.
        </p>
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
