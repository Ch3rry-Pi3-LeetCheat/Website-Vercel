import ArticleLayout from "@/components/ArticleLayout";
import Link from "next/link";
import InfoPanel from "@/components/InfoPanel";
import RightRail from "@/components/RightRail";
import { MathBlock, MathInline } from "@/components/Math";
import ColumnRolePicker from "@/components/ml/ColumnRolePicker";
import { mlFoundationsLessons } from "@/lib/mlTopics";

const HOUSE_DATA = [
  { floor_area_m2: 52, bedrooms: 1, distance_to_centre_km: 4.5, price_gbp: 210000 },
  { floor_area_m2: 68, bedrooms: 2, distance_to_centre_km: 3.2, price_gbp: 265000 },
  { floor_area_m2: 75, bedrooms: 2, distance_to_centre_km: 6.0, price_gbp: 255000 },
  { floor_area_m2: 90, bedrooms: 3, distance_to_centre_km: 5.5, price_gbp: 310000 },
  { floor_area_m2: 110, bedrooms: 3, distance_to_centre_km: 2.8, price_gbp: 365000 },
  { floor_area_m2: 130, bedrooms: 4, distance_to_centre_km: 7.5, price_gbp: 390000 },
  { floor_area_m2: 145, bedrooms: 4, distance_to_centre_km: 3.0, price_gbp: 460000 },
  { floor_area_m2: 160, bedrooms: 5, distance_to_centre_km: 8.0, price_gbp: 455000 },
];

const currentLessonHref = "/ml/foundations/data-types-features-labels";
const currentLessonIndex = mlFoundationsLessons.findIndex((lesson) => lesson.href === currentLessonHref);
const nextLesson = currentLessonIndex >= 0 ? mlFoundationsLessons[currentLessonIndex + 1] : undefined;

export default function DataTypesFeaturesLabelsPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "intro", label: "Introduction" },
    { id: "recap", label: "Quick recap" },
    { id: "dataset", label: "Example dataset" },
    { id: "roles", label: "Features vs label" },
    { id: "types", label: "Common data types" },
    { id: "prep", label: "From raw to model-ready" },
    { id: "notation", label: "Notation (X and y)" },
    { id: "traps", label: "Common traps" },
    { id: "checkpoint", label: "Mini-checkpoint" },
    { id: "summary", label: "Summary" },
  ];

  return (
    <ArticleLayout
      eyebrow="ML - Foundations"
      title="Data types, features, labels"
      description="What a model sees as input, what it should predict, and how raw columns become usable features."
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
          This lesson is about one core idea: if you cannot clearly separate{" "}
          <span className="math-x">features</span> from the{" "}
          <span className="math-y">label</span>, model training gets messy fast.
        </p>
        <p>
          We&apos;ll use a concrete example, keep the notation light, and build up
          to what a model can actually consume.
        </p>
      </InfoPanel>

      <section id="recap" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Quick recap
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          In the previous lesson we used{" "}
          <MathInline tex={String.raw`\hat{y} = f(x;\theta)`} className="math-inline" />
          . Here, we make that concrete:
        </p>
        <div className="grid gap-2 text-base leading-7 text-[color:var(--color-muted)]">
          <p>
            <span className="math-x">x</span> is the set of input columns (the features).
          </p>
          <p>
            <span className="math-y">y</span> is the output column we want to predict (the label).
          </p>
          <p>
            <span className="math-yhat">ŷ</span> is the model&apos;s predicted version of{" "}
            <span className="math-y">y</span>.
          </p>
        </div>
      </section>

      <section id="dataset" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Example dataset
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We will reuse this house-price dataset from the previous lesson so the
          concepts stack cleanly.
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
                    <span className="math-x">distance_to_centre_km</span>
                  </th>
                  <th className="py-2">
                    <span className="math-y">price_gbp</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {HOUSE_DATA.map((row) => (
                  <tr key={`${row.floor_area_m2}-${row.distance_to_centre_km}`} className="border-b border-white/10">
                    <td className="py-2">{row.floor_area_m2}</td>
                    <td className="py-2">{row.bedrooms}</td>
                    <td className="py-2">{row.distance_to_centre_km}</td>
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
          For this table, the first three columns are{" "}
          <span className="math-x">features</span> and{" "}
          <span className="math-y">price_gbp</span> is the{" "}
          <span className="math-y">label</span>.
        </p>
        <MathBlock
          tex={String.raw`\underbrace{(floor\_area\_m2,\ bedrooms,\ distance\_to\_centre\_km)}_{\text{features }x} \longrightarrow \underbrace{price\_gbp}_{\text{label }y}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          A useful check: ask <span className="text-white">“Is this column known at prediction time?”</span>
          . If yes, it can be a feature. If it is the thing we want to predict,
          it is the label.
        </p>
      </section>

      <section id="types" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Common data types
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm text-[color:var(--color-muted)]">
            <thead>
              <tr className="border-b border-white/10 text-white">
                <th className="py-2 pr-4">Type</th>
                <th className="py-2 pr-4">Looks like</th>
                <th className="py-2">Typical ML handling</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-4">Numeric</td>
                <td className="py-2 pr-4">52, 130, 390000</td>
                <td className="py-2">Often used directly (sometimes scaled).</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-4">Categorical</td>
                <td className="py-2 pr-4">flat, house, detached</td>
                <td className="py-2">Encode to numbers (e.g., one-hot encoding).</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-4">Boolean</td>
                <td className="py-2 pr-4">true / false</td>
                <td className="py-2">Map to 0 / 1.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-4">Text</td>
                <td className="py-2 pr-4">“great location”</td>
                <td className="py-2">Convert to vectors/embeddings first.</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Datetime</td>
                <td className="py-2 pr-4">2026-02-12</td>
                <td className="py-2">Extract useful parts (day, month, season, age).</td>
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
          Raw columns are not automatically usable. We usually need a light
          preparation pass before training.
        </p>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="glass-panel rounded-2xl p-4">
            <p className="text-white font-semibold">Categorical values</p>
            <p className="mt-1 text-sm text-[color:var(--color-muted)]">
              Convert categories to numeric features (for example, one-hot columns).
            </p>
          </div>
          <div className="glass-panel rounded-2xl p-4">
            <p className="text-white font-semibold">Missing values</p>
            <p className="mt-1 text-sm text-[color:var(--color-muted)]">
              Fill, drop, or flag missing entries so training stays stable.
            </p>
          </div>
          <div className="glass-panel rounded-2xl p-4">
            <p className="text-white font-semibold">Scale mismatches</p>
            <p className="mt-1 text-sm text-[color:var(--color-muted)]">
              Bring very different numeric ranges closer together when needed.
            </p>
          </div>
        </div>
      </section>

      <section id="notation" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Notation (X and y)
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We usually write the feature table as{" "}
          <MathInline tex={String.raw`X`} className="math-inline math-x" />
          {" "}and the label column as{" "}
          <MathInline tex={String.raw`y`} className="math-inline math-y" />.
        </p>
        <MathBlock
          tex={String.raw`X \in \mathbb{R}^{n \times d},\qquad y \in \mathbb{R}^{n}`}
          className="math-center math-lg text-white/90"
        />
        <div className="grid gap-2 text-base leading-7 text-[color:var(--color-muted)]">
          <p>
            Here: <span className="text-white">n = 8</span> rows and{" "}
            <span className="text-white">d = 3</span> feature columns.
          </p>
          <p>
            Row 5 in this dataset is:
            {" "}
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
                <td className="py-2 pr-4">Using an ID as a feature</td>
                <td className="py-2">IDs usually carry no predictive pattern.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-4">Data leakage</td>
                <td className="py-2">Feature contains future/target info the model should not have.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-4">Label mixed into features</td>
                <td className="py-2">Model appears perfect in training but fails in real use.</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Wrong label choice</td>
                <td className="py-2">You optimize for the wrong business outcome.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="checkpoint" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Mini-checkpoint
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Quick interaction: classify each column role.
        </p>
        <ColumnRolePicker
          columns={[
            { name: "floor_area_m2", answer: "feature", hint: "Known before prediction." },
            { name: "bedrooms", answer: "feature", hint: "Input clue about size/utility." },
            { name: "distance_to_centre_km", answer: "feature", hint: "Input clue about location." },
            { name: "price_gbp", answer: "label", hint: "This is the target we want to predict." },
            { name: "listing_id", answer: "ignore", hint: "Identifier, usually not meaningful." },
          ]}
        />
      </section>

      <section id="summary" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Summary
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Clean feature/label definitions are the foundation of every ML project.
          If this part is wrong, model performance and evaluation become misleading.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Next, we&apos;ll use this structure to discuss how to properly split data
          into train, validation, and test sets so performance numbers are honest.
        </p>
      </section>

      {nextLesson ? (
        <section className="flex justify-end pt-2">
          <Link
            href={nextLesson.href}
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
          >
            Next Article
            <span aria-hidden>→</span>
          </Link>
        </section>
      ) : null}
    </ArticleLayout>
  );
}
