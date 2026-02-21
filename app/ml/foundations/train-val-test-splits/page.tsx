import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import InfoPanel from "@/components/InfoPanel";
import Link from "next/link";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
import { mlFoundationsLessons } from "@/lib/mlTopics";

const HOUSE_DATA = [
  { row_id: 1, floor_area: 52, bedrooms: 1, distance_to_centre: 4.5, price_gbp: 210000 },
  { row_id: 2, floor_area: 68, bedrooms: 2, distance_to_centre: 3.2, price_gbp: 265000 },
  { row_id: 3, floor_area: 75, bedrooms: 2, distance_to_centre: 6.0, price_gbp: 255000 },
  { row_id: 4, floor_area: 90, bedrooms: 3, distance_to_centre: 5.5, price_gbp: 310000 },
  { row_id: 5, floor_area: 110, bedrooms: 3, distance_to_centre: 2.8, price_gbp: 365000 },
  { row_id: 6, floor_area: 130, bedrooms: 4, distance_to_centre: 7.5, price_gbp: 390000 },
  { row_id: 7, floor_area: 145, bedrooms: 4, distance_to_centre: 3.0, price_gbp: 460000 },
  { row_id: 8, floor_area: 160, bedrooms: 5, distance_to_centre: 8.0, price_gbp: 455000 },
];

const TRUNCATED_ROWS: Array<(typeof HOUSE_DATA)[number] | null> = [
  HOUSE_DATA[0],
  HOUSE_DATA[1],
  null,
  HOUSE_DATA[7],
];

const shuffleCode = `import random

houses = [
    {"row_id": 1, "floor_area": 52, "bedrooms": 1, "distance_to_centre": 4.5, "price_gbp": 210000},
    {"row_id": 2, "floor_area": 68, "bedrooms": 2, "distance_to_centre": 3.2, "price_gbp": 265000},
    {"row_id": 3, "floor_area": 75, "bedrooms": 2, "distance_to_centre": 6.0, "price_gbp": 255000},
    {"row_id": 4, "floor_area": 90, "bedrooms": 3, "distance_to_centre": 5.5, "price_gbp": 310000},
    {"row_id": 5, "floor_area": 110, "bedrooms": 3, "distance_to_centre": 2.8, "price_gbp": 365000},
    {"row_id": 6, "floor_area": 130, "bedrooms": 4, "distance_to_centre": 7.5, "price_gbp": 390000},
    {"row_id": 7, "floor_area": 145, "bedrooms": 4, "distance_to_centre": 3.0, "price_gbp": 460000},
    {"row_id": 8, "floor_area": 160, "bedrooms": 5, "distance_to_centre": 8.0, "price_gbp": 455000},
]

rng = random.Random(42)
shuffled = houses[:]
rng.shuffle(shuffled)

print("Shuffled row_id order:", [r["row_id"] for r in shuffled])`;

const shuffleOutput = `Shuffled row_id order: [4, 5, 7, 8, 3, 6, 1, 2]`;

const splitCode = `train = shuffled[:6]
test = shuffled[6:]

print("Train ids:", [r["row_id"] for r in train])
print("Test ids:", [r["row_id"] for r in test])
print("Train size:", len(train))
print("Test size:", len(test))`;

const splitOutput = `Train ids: [4, 5, 7, 8, 3, 6]
Test ids: [1, 2]
Train size: 6
Test size: 2`;

const splitWithValCode = `train = shuffled[:5]
val = shuffled[5:6]
test = shuffled[6:]

print("Train ids:", [r["row_id"] for r in train])
print("Val ids:", [r["row_id"] for r in val])
print("Test ids:", [r["row_id"] for r in test])`;

const splitWithValOutput = `Train ids: [4, 5, 7, 8, 3]
Val ids: [6]
Test ids: [1, 2]`;

const currentLessonHref = "/ml/foundations/train-val-test-splits";
const currentLessonIndex = mlFoundationsLessons.findIndex((lesson) => lesson.href === currentLessonHref);
const nextLesson = currentLessonIndex >= 0 ? mlFoundationsLessons[currentLessonIndex + 1] : undefined;

export default function TrainValTestPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "intro", label: "Introduction" },
    { id: "recap", label: "Quick recap", level: 2 },
    { id: "why-split", label: "Why split at all?" },
    { id: "train-split", label: "Train split" },
    { id: "val-split", label: "Validation split" },
    { id: "test-split", label: "Test split" },
    { id: "ratios", label: "Common ratios" },
    { id: "shuffle", label: "Shuffling" },
    { id: "worked-example", label: "Worked split example" },
    { id: "with-validation", label: "Adding validation", level: 2 },
    { id: "leakage", label: "Leakage guardrails" },
    { id: "summary", label: "Summary" },
    { id: "key-takeaways", label: "Key takeaways", level: 2 },
    { id: "whats-next", label: "What's next", level: 2 },
  ];

  return (
    <div className="overflow-x-clip">
      <ArticleLayout
        eyebrow="ML - Foundations"
        title="Train/test splits"
        description="How to evaluate on unseen data without fooling yourself."
        descriptionClassName="italic"
        tocItems={tocItems}
        rightRail={
          <RightRail
            sections={[{ title: "Within Foundations", links: mlFoundationsLessons }]}
            activeHref="/ml/foundations/train-val-test-splits"
          />
        }
      >
        <InfoPanel id="intro" title="Introduction" variant="intro">
          <p>
            A model can look great during training and still perform badly in
            the real world. The core reason is simple: the model has already
            seen the training rows, so training performance is not a fair test
            of true generalisation.
          </p>
          <p>
            Splitting data gives each stage a clear role: one slice to learn
            from, one slice to tune on, and one untouched slice to measure final
            performance.
          </p>
          <h3
            id="recap"
            className="scroll-mt-28 pt-1 text-xl font-semibold text-white font-[var(--font-display)]"
          >
            Quick recap
          </h3>
          <p>
            We will keep using the same housing dataset. To keep tables readable
            here, we only show the first three feature columns, then a glyph
            column for omitted fields, then the target.
          </p>
          <div className="glass-panel rounded-2xl p-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-center text-sm text-[color:var(--color-muted)]">
                <thead>
                  <tr className="border-b border-white/10 text-xs uppercase tracking-[0.2em]">
                    <th className="w-1/5 py-2">
                      <span className="math-x">floor_area</span>
                    </th>
                    <th className="w-1/5 py-2">
                      <span className="math-x">bedrooms</span>
                    </th>
                    <th className="w-1/5 py-2">
                      <span className="math-x">distance_to_centre</span>
                    </th>
                    <th className="w-1/5 py-2">
                      <span className="math-x">&hellip;</span>
                    </th>
                    <th className="w-1/5 py-2">
                      <span className="math-y">price_gbp</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {TRUNCATED_ROWS.map((row, index) =>
                    row ? (
                      <tr
                        key={`row-${row.row_id}`}
                        className={index < TRUNCATED_ROWS.length - 1 ? "border-b border-white/10" : ""}
                      >
                        <td className="py-2">{row.floor_area}</td>
                        <td className="py-2">{row.bedrooms}</td>
                        <td className="py-2">{row.distance_to_centre}</td>
                        <td className="py-2 text-white/70">&hellip;</td>
                        <td className="py-2">{row.price_gbp.toLocaleString("en-GB")}</td>
                      </tr>
                    ) : (
                      <tr key="row-ellipsis" className="border-b border-white/10">
                        <td className="py-2 text-white/70">&#8942;</td>
                        <td className="py-2 text-white/70">&#8942;</td>
                        <td className="py-2 text-white/70">&#8942;</td>
                        <td className="py-2 text-white/70">&hellip;</td>
                        <td className="py-2 text-white/70">&#8942;</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </InfoPanel>

        <section id="why-split" className="scroll-mt-28 grid gap-4">
          <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
            Why split at all?
          </h2>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            If you train and evaluate on the same rows, the score will usually
            look overly optimistic. You are effectively asking, &quot;How well did
            the model remember what it already saw?&quot; rather than, &quot;How well
            will it do on new houses?&quot;
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            A proper split makes the evaluation honest. It also protects you
            from hidden leakage, where information from the future evaluation
            rows accidentally leaks into training decisions.
          </p>
        </section>

        <section id="train-split" className="scroll-mt-28 grid gap-3">
          <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
            Train split
          </h2>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            The <span className="text-white font-semibold">training set</span> is
            where the model learns patterns. The algorithm uses these rows to
            adjust its parameters so predictions move closer to true values.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Any operation that learns from data should be fit on train only:
            scalers, imputers, encoders, and of course the model itself.
          </p>
        </section>

        <section id="val-split" className="scroll-mt-28 grid gap-3">
          <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
            Validation split
          </h2>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            The <span className="text-white font-semibold">validation set</span>{" "}
            helps you choose between modeling choices: hyperparameters, feature
            variants, and stopping point.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Validation is not for final reporting. If you keep tuning based on
            validation performance, you gradually overfit to it. That is normal,
            and exactly why we keep a separate test set untouched.
          </p>
        </section>

        <section id="test-split" className="scroll-mt-28 grid gap-3">
          <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
            Test split
          </h2>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            The <span className="text-white font-semibold">test set</span> is the
            final exam. You use it once near the end to estimate real-world
            performance on unseen data.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            If test data influences model decisions, your metric stops being a
            trustworthy estimate and becomes another tuning signal.
          </p>
        </section>

        <section id="ratios" className="scroll-mt-28 grid gap-4">
          <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
            Common ratios
          </h2>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            There is no single perfect ratio. The right split depends on how
            many rows you have and how much variance there is in your data.
          </p>
          <div className="glass-panel rounded-2xl p-4 grid gap-4">
            <div className="grid gap-2">
              <p className="text-sm text-white font-semibold">
                Typical baseline: 80% train / 10% val / 10% test
              </p>
              <div className="h-9 overflow-hidden rounded-full border border-white/15 bg-white/5 flex text-xs font-semibold">
                <div className="flex items-center justify-center bg-cyan-500/25 text-cyan-300" style={{ width: "80%" }}>
                  Train 80%
                </div>
                <div className="flex items-center justify-center bg-emerald-500/25 text-emerald-300" style={{ width: "10%" }}>
                  Val 10%
                </div>
                <div className="flex items-center justify-center bg-amber-500/25 text-amber-300" style={{ width: "10%" }}>
                  Test 10%
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <p className="text-sm text-white font-semibold">
                Small datasets: often train/test only, then cross-validation on train
              </p>
              <div className="h-9 overflow-hidden rounded-full border border-white/15 bg-white/5 flex text-xs font-semibold">
                <div className="flex items-center justify-center bg-cyan-500/25 text-cyan-300" style={{ width: "80%" }}>
                  Train 80%
                </div>
                <div className="flex items-center justify-center bg-amber-500/25 text-amber-300" style={{ width: "20%" }}>
                  Test 20%
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <p className="text-sm text-white font-semibold">
                Very large datasets: you can reserve tiny holdouts
              </p>
              <div className="h-9 overflow-hidden rounded-full border border-white/15 bg-white/5 flex text-xs font-semibold">
                <div className="flex items-center justify-center bg-cyan-500/25 text-cyan-300" style={{ width: "98%" }}>
                  Train 98%
                </div>
                <div className="flex items-center justify-center bg-emerald-500/25 text-emerald-300" style={{ width: "1%" }}>
                  Val 1%
                </div>
                <div className="flex items-center justify-center bg-amber-500/25 text-amber-300" style={{ width: "1%" }}>
                  Test 1%
                </div>
              </div>
            </div>
          </div>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Practical rule: keep enough training data to learn stable patterns,
            but keep enough holdout rows to measure performance with confidence.
          </p>
        </section>

        <section id="shuffle" className="scroll-mt-28 grid gap-4">
          <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
            Shuffling
          </h2>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Before splitting tabular data, we usually shuffle rows. This helps
            avoid accidental ordering effects, for example if older listings are
            grouped at the top and newer listings at the bottom.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Important exception: for time-series forecasting, you normally do{" "}
            <span className="text-white font-semibold">not</span> shuffle, because
            time order is part of the problem itself.
          </p>
          <CodeBlock code={shuffleCode} title="Python" />
          <OutputBlock output={shuffleOutput} />
        </section>

        <section id="worked-example" className="scroll-mt-28 grid gap-4">
          <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
            Worked split example
          </h2>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Using the shuffled order above, we now take the first 6 rows for
            training and the last 2 rows for a holdout test set.
          </p>
          <CodeBlock code={splitCode} title="Python" />
          <OutputBlock output={splitOutput} />

          <section id="with-validation" className="grid gap-3">
            <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
              Adding validation
            </h3>
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              If you also need a validation slice, carve it from the training
              side rather than from the test side. In this toy example, we can
              do a 5 / 1 / 2 split:
            </p>
            <CodeBlock code={splitWithValCode} title="Python" />
            <OutputBlock output={splitWithValOutput} />
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              On tiny datasets, these numbers are just for intuition. In real
              projects with limited data, cross-validation is often more stable
              than a single small validation slice.
            </p>
          </section>
        </section>

        <section id="leakage" className="scroll-mt-28 grid gap-4">
          <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
            Leakage guardrails
          </h2>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Most bad evaluations happen because information leaks across split
            boundaries. Keep these guardrails in place:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="w-12 py-2 text-center text-lg">1.</td>
                  <td className="py-2">Split first, then fit preprocessing on train only.</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="w-12 py-2 text-center text-lg">2.</td>
                  <td className="py-2">Apply the fitted preprocessing to val/test without refitting.</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="w-12 py-2 text-center text-lg">3.</td>
                  <td className="py-2">Use validation for tuning decisions; keep test untouched.</td>
                </tr>
                <tr>
                  <td className="w-12 py-2 text-center text-lg">4.</td>
                  <td className="py-2">Report final metrics from the test set only after tuning is complete.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="summary" className="scroll-mt-28 grid gap-4">
          <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
            Summary
          </h2>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            This page was designed as a practical guide: enough{" "}
            <span className="text-white font-semibold">intuition</span> to
            understand why split discipline matters, plus a{" "}
            <span className="text-white font-semibold">concrete workflow</span>{" "}
            you can apply immediately.
          </p>

          <section id="key-takeaways" className="grid gap-3">
            <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
              Key takeaways
            </h3>
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              So, what{" "}
              <span className="text-emerald-400">DID</span>{" "}
              we cover?
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
                <tbody>
                  <tr>
                    <td className="w-12 py-2 text-center text-lg">&#9989;</td>
                    <td className="py-2">
                      Why training performance alone is not enough.
                    </td>
                  </tr>
                  <tr>
                    <td className="w-12 py-2 text-center text-lg">&#9989;</td>
                    <td className="py-2">
                      The distinct roles of train, validation, and test splits.
                    </td>
                  </tr>
                  <tr>
                    <td className="w-12 py-2 text-center text-lg">&#9989;</td>
                    <td className="py-2">
                      Common split ratios and when to adjust them.
                    </td>
                  </tr>
                  <tr>
                    <td className="w-12 py-2 text-center text-lg">&#9989;</td>
                    <td className="py-2">
                      A worked shuffle-and-split example using our housing rows.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              From the list above, we did cover a lot of ground. But there are
              key pieces we deliberately{" "}
              <span className="text-rose-400 font-semibold">DID NOT</span>{" "}
              cover yet, for example:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
                <tbody>
                  <tr>
                    <td className="w-12 py-2 text-center text-lg">&#10060;</td>
                    <td className="py-2">
                      How to run full k-fold cross-validation and compare folds statistically.
                    </td>
                  </tr>
                  <tr>
                    <td className="w-12 py-2 text-center text-lg">&#10060;</td>
                    <td className="py-2">
                      How overfitting appears in learning curves and how to respond.
                    </td>
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
              Next lesson: <span className="text-white font-semibold">training math (gradient descent)</span>.
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
