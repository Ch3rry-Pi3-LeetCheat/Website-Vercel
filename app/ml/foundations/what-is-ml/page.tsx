import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import Link from "next/link";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
import { MathBlock, MathInline } from "@/components/Math";
import FlashcardCarousel from "@/components/FlashcardCarousel";
import LineFitAnimator from "@/components/ml/LineFitAnimator";
import LineGuessPlot from "@/components/ml/LineGuessPlot";
import PredictionGuidePlot from "@/components/ml/PredictionGuidePlot";
import WorkedExamplePlot from "@/components/ml/WorkedExamplePlot";
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

const tinyExampleCode = `# Install dependencies (once)
# pip install pandas scikit-learn

# Import the core libraries
import pandas as pd
from sklearn.linear_model import LinearRegression

# Build a tiny dataset (each row is one house)
data = pd.DataFrame({
    "floor_area_m2": [52, 68, 75, 90, 110, 130, 145, 160],
    "bedrooms": [1, 2, 2, 3, 3, 4, 4, 5],
    "distance_to_centre_km": [4.5, 3.2, 6.0, 5.5, 2.8, 7.5, 3.0, 8.0],
    "price_gbp": [210000, 265000, 255000, 310000, 365000, 390000, 460000, 455000],
})

# Split into inputs (features) and the target (label)
X = data[["floor_area_m2", "bedrooms", "distance_to_centre_km"]]
y = data["price_gbp"]

# Create and train the model
model = LinearRegression()
model.fit(X, y)

# Predict the price of a new house
prediction = model.predict([[100, 3, 4.0]])[0]
print(round(prediction, 0))`;

const tinyExampleOutput = `330000.0`;
const interceptOutput = `124452.03
[2049.63, 14689.77, -8379.36]`;

const CANDIDATE_A_LINE = { intercept: 50, slope: 2 };
const EXAMPLE_FLOOR_AREA = 110;
const EXAMPLE_TRUE_PRICE = 365000;

const CANDIDATE_B_LINE = (() => {
  const xScale = 100;
  const yScale = 1000;
  const scaled = HOUSE_DATA.map((row) => ({
    x: row.floor_area_m2 / xScale,
    y: row.price_gbp / yScale,
  }));

  let theta0 = scaled.reduce((acc, row) => acc + row.y, 0) / scaled.length;
  let theta1 = 0;
  const learningRate = 0.3;
  const steps = 250;

  for (let step = 0; step < steps; step += 1) {
    const n = scaled.length;
    let grad0 = 0;
    let grad1 = 0;

    scaled.forEach((row) => {
      const yHat = theta0 + theta1 * row.x;
      const error = yHat - row.y;
      grad0 += error;
      grad1 += error * row.x;
    });

    grad0 = (2 / n) * grad0;
    grad1 = (2 / n) * grad1;

    theta0 -= learningRate * grad0;
    theta1 -= learningRate * grad1;
  }

  return {
    intercept: theta0,
    slope: theta1 / xScale,
  };
})();
const CANDIDATE_B_THETA0 = Math.round(CANDIDATE_B_LINE.intercept * 1000);
const CANDIDATE_B_THETA1 = Math.round(CANDIDATE_B_LINE.slope * 1000);
const CANDIDATE_B_WORKED_LINE = {
  intercept: CANDIDATE_B_THETA0 / 1000,
  slope: CANDIDATE_B_THETA1 / 1000,
};

const candidateAPrediction = Math.round(
  (CANDIDATE_A_LINE.intercept + CANDIDATE_A_LINE.slope * EXAMPLE_FLOOR_AREA) * 1000
);
const candidateBPrediction = CANDIDATE_B_THETA0 + CANDIDATE_B_THETA1 * EXAMPLE_FLOOR_AREA;
const candidateBIntercept = CANDIDATE_B_THETA0;
const candidateBSlope = CANDIDATE_B_THETA1;
const candidateBContribution = candidateBSlope * EXAMPLE_FLOOR_AREA;
const candidateBApproxPrediction = candidateBIntercept + candidateBContribution;

const candidateAError = candidateAPrediction - EXAMPLE_TRUE_PRICE;
const candidateBError = candidateBPrediction - EXAMPLE_TRUE_PRICE;
const candidateALoss = candidateAError ** 2;
const candidateBLoss = candidateBError ** 2;

const candidateASquaredErrors = HOUSE_DATA.map((row) => {
  const prediction = Math.round(
    (CANDIDATE_A_LINE.intercept + CANDIDATE_A_LINE.slope * row.floor_area_m2) * 1000
  );
  const error = prediction - row.price_gbp;
  return error ** 2;
});

const candidateBSquaredErrors = HOUSE_DATA.map((row) => {
  const prediction = CANDIDATE_B_THETA0 + CANDIDATE_B_THETA1 * row.floor_area_m2;
  const error = prediction - row.price_gbp;
  return error ** 2;
});

const candidateASquaredErrorSum = candidateASquaredErrors.reduce((acc, value) => acc + value, 0);
const candidateBSquaredErrorSum = candidateBSquaredErrors.reduce((acc, value) => acc + value, 0);
const candidateAMse = candidateASquaredErrorSum / HOUSE_DATA.length;
const candidateBMse = candidateBSquaredErrorSum / HOUSE_DATA.length;
const mseRatio = candidateAMse / candidateBMse;
const PREDICTION_FLOOR_AREA = 120;
const predictionFromCandidateB = CANDIDATE_B_THETA0 + CANDIDATE_B_THETA1 * PREDICTION_FLOOR_AREA;
const currentLessonHref = "/ml/foundations/what-is-ml";
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

function YHatWithLabel({ label }: { label: "A" | "B" }) {
  return (
    <span className="inline-flex items-baseline align-middle">
      <MathInline tex={String.raw`\hat{y}`} className="math-inline math-yhat" />
      <sub className="ml-[1px] text-[0.72em] leading-none text-white">{label}</sub>
    </span>
  );
}

function YWithIndex({ index }: { index: number }) {
  return (
    <span className="inline-flex items-baseline align-middle">
      <MathInline tex={String.raw`y`} className="math-inline math-y" />
      <sub className="ml-[1px] text-[0.72em] leading-none text-white">{index}</sub>
    </span>
  );
}

function YHatWithIndexCandidate({
  index,
  candidate,
  candidateClassName,
}: {
  index: number;
  candidate: "A" | "B";
  candidateClassName: string;
}) {
  return (
    <span className="inline-flex items-baseline align-middle">
      <MathInline tex={String.raw`\hat{y}`} className="math-inline math-yhat" />
      <sub className="ml-[1px] text-[0.72em] leading-none">
        <span className="text-white">{index}</span>
        <span className="text-white">,</span>
        <span className={candidateClassName}>{candidate}</span>
      </sub>
    </span>
  );
}

function MseWithCandidate({
  candidate,
  candidateClassName,
}: {
  candidate: "A" | "B";
  candidateClassName: string;
}) {
  return (
    <span className="inline-flex items-baseline align-middle">
      <MathInline tex={String.raw`MSE`} className="math-inline math-neutral" />
      <sub className={`ml-[1px] text-[0.72em] leading-none ${candidateClassName}`}>
        {candidate}
      </sub>
    </span>
  );
}

export default function WhatIsMlPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "intro", label: "Introduction" },
    { id: "dataset", label: "Example dataset" },
    { id: "examples", label: "Real-world use cases", level: 2 },
    { id: "model-plain", label: "What is a model?" },
    { id: "notation", label: "Introducing some notation" },
    { id: "function-intro", label: "Understanding ŷ = f(x; θ)", level: 2 },
    { id: "training", label: "Training and loss" },
    { id: "mse", label: "Mean Squared Error (MSE)", level: 2 },
    { id: "loop", label: "Learning loop", level: 2 },
    { id: "visual-intuition", label: "Visual intuition", level: 2 },
    { id: "prediction-demo", label: "Prediction" },
    { id: "example", label: "Python example" },
    { id: "summary", label: "Summary" },
    { id: "key-takeaways", label: "Key takeaways", level: 2 },
    { id: "whats-next", label: "What's next", level: 2 },
    { id: "checkpoint", label: "Mini-checkpoint" },
    { id: "glossary", label: "Glossary" },
  ];

  return (
    <ArticleLayout
      eyebrow="ML - Foundations"
      title="What is Machine Learning?"
      description="An intuitive, concrete teaser before we dive into the deeper mechanics."
      descriptionClassName="italic"
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[{ title: "Within Foundations", links: mlFoundationsLessons }]}
          activeHref="/ml/foundations/what-is-ml"
        />
      }
    >
      <InfoPanel id="intro" title="Introduction" variant="intro">
        <p>
          Welcome. This lesson is built as an intuitive, hands-on hook. We use
          one concrete example throughout, so the ideas stay tangible while you
          build a practical mental model of what machine learning is doing.
        </p>
        <p>
          Here&apos;s the roadmap for this article and why each part matters:
        </p>
        <div className="ml-4 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 text-white font-semibold">Mental model</td>
                <td className="py-2">What machine learning is doing at a high level.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 text-white font-semibold">Example dataset</td>
                <td className="py-2">One consistent house-price table to keep ideas concrete.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 text-white font-semibold">Model + parameters</td>
                <td className="py-2">How a line turns inputs into predictions.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 text-white font-semibold">Training + loss</td>
                <td className="py-2">How we compare candidate lines and improve fit.</td>
              </tr>
              <tr>
                <td className="w-56 py-2 pr-4 text-white font-semibold">Visual loop + prediction</td>
                <td className="py-2">Watch parameters evolve, then use the trained model for a new house.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          By the end of this lesson, you should be starting to recognise the
          core pattern: show examples, let the <span className="math-model">model</span>{" "}
          find a rule, and check how close its predictions are to reality.
        </p>
        <p>
          If you finish this article with a clearer foundation, better intuition
          for how learning works, and new questions you want to test next, this
          introduction has done its job.
        </p>
      </InfoPanel>

      <section id="dataset" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Example dataset
        </h2>
        <InfoPanel id="examples" title="Real-world use cases" variant="intuition" headingLevel={3}>
          <p>
            There are many real-world use cases for machine learning. In each
            case, the inputs are clues and the output is the answer the{" "}
            <span className="math-model">model</span> is trying to predict.
          </p>
          <div className="grid gap-3 text-base leading-7 text-[color:var(--color-muted)]">
            <div className="grid gap-2 md:grid-cols-[180px_minmax(0,1fr)]">
              <div className="text-white font-semibold">House prices</div>
              <div>
                Inputs are floor area, bedrooms, and distance to the centre.
                Output is price. A good prediction is close enough to guide
                buyers and sellers.
              </div>
            </div>
            <div className="grid gap-2 md:grid-cols-[180px_minmax(0,1fr)]">
              <div className="text-white font-semibold">Spam detection</div>
              <div>
                Inputs are words, links, and sender info. Output is spam or not
                spam. A good prediction catches spam without blocking real
                emails.
              </div>
            </div>
            <div className="grid gap-2 md:grid-cols-[180px_minmax(0,1fr)]">
              <div className="text-white font-semibold">Fraud detection</div>
              <div>
                Inputs are amount, time, location, and device. Output is fraud
                or not fraud. A good prediction flags risky transactions quickly
                without too many false alarms.
              </div>
            </div>
          </div>
          <p>
            In this learning journey, we&apos;ll keep using mock versions of
            real-world datasets. That keeps each concept grounded and helps you
            build intuition step by step, instead of memorising abstract rules.
          </p>
        </InfoPanel>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          In this section, we introduce the dataset we&apos;ll use throughout
          the article. We use a house-price example because house attributes
          tend to feel familiar, which helps keep each new concept grounded in
          something concrete rather than abstract definitions.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Each row is one house. The first three columns are the inputs (
          <span className="math-x">features</span>). The last column is the
          output (<span className="math-y">label</span>) we want to{" "}
          <span className="math-yhat">predict</span>.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          <span className="math-x font-mono">floor_area_m2</span> is the size of
          the house, <span className="math-x font-mono">bedrooms</span> is the
          number of bedrooms,{" "}
          <span className="math-x font-mono">distance_to_centre_km</span> is how
          far the house is from the centre, and{" "}
          <span className="math-y font-mono">price_gbp</span> is the price we
          want to predict.
        </p>
        <div className="glass-panel rounded-2xl p-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm text-[color:var(--color-muted)]">
              <thead>
                <tr className="text-xs uppercase tracking-[0.2em]">
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
              <tbody className="text-sm">
                {HOUSE_DATA.map((row) => (
                  <tr key={`${row.floor_area_m2}-${row.distance_to_centre_km}`}>
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
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          More rows help because the{" "}
          <span className="math-model">model</span> sees more situations. That
          makes it easier to learn a pattern that works on new houses, not just
          the ones in the table.
        </p>
      </section>

      <section id="model-plain" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          What is a <span className="math-model">model</span>?
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          A <span className="math-model">model</span> is simply a rule that
          turns inputs into a prediction. For houses, the rule might be: bigger
          area usually means higher price.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The rule can be simple or complex, but its job is always the same:
          take features and produce a predicted price.
        </p>
      </section>

      <section id="notation" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Introducing some notation
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We use a few symbols to describe the same idea in a compact way.
          Each symbol maps directly to the dataset above.
        </p>
        <div className="grid gap-3 text-base leading-7 text-[color:var(--color-muted)]">
          <div className="grid gap-2 md:grid-cols-[120px_minmax(0,1fr)]">
            <div className="text-white font-semibold flex items-center justify-center">
              <MathInline tex={String.raw`x`} className="math-inline math-x" />
            </div>
            <div>
              The input features. Example:{" "}
              <span className="math-x font-mono">[floor_area_m2, bedrooms, distance_to_centre_km]</span>.
            </div>
          </div>
          <div className="grid gap-2 md:grid-cols-[120px_minmax(0,1fr)]">
            <div className="text-white font-semibold flex items-center justify-center">
              <MathInline tex={String.raw`y`} className="math-inline math-y" />
            </div>
            <div>
              The true answer. Example:{" "}
              <span className="math-y font-mono">price_gbp</span>.
            </div>
          </div>
          <div className="grid gap-2 md:grid-cols-[120px_minmax(0,1fr)]">
            <div className="text-white font-semibold flex items-center justify-center">
              <MathInline tex={String.raw`\hat{y}`} className="math-inline math-yhat" />
            </div>
            <div>
              The <span className="math-model">model</span>&apos;s prediction of{" "}
              <MathInline tex={String.raw`y`} className="math-inline math-y" />{" "}
              (we say y-hat).
            </div>
          </div>
          <div className="grid gap-2 md:grid-cols-[120px_minmax(0,1fr)]">
            <div className="text-white font-semibold flex items-center justify-center">
              <MathInline tex={String.raw`\theta`} className="math-inline math-theta" />
            </div>
            <div>
              The adjustable settings inside the{" "}
              <span className="math-model">model</span>.
            </div>
          </div>
        </div>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          When we put it all together, we often write:
        </p>
        <div className="math-center math-lg text-white/90">
          <MathInline tex={String.raw`\hat{y}`} className="math-inline math-yhat" />
          <span className="text-white"> = </span>
          <MathInline tex={String.raw`f`} className="math-inline math-model" />
          <span className="text-white">(</span>
          <MathInline tex={String.raw`x`} className="math-inline math-x" />
          <span className="text-white">; </span>
          <MathInline tex={String.raw`\theta`} className="math-inline math-theta" />
          <span className="text-white">)</span>
        </div>
      </section>

      <section id="function-intro" className="scroll-mt-28 grid gap-6">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Understanding{" "}
          <MathInline tex={String.raw`\hat{y}`} className="math-inline math-yhat" />
          {" "}={" "}
          <MathInline tex={String.raw`f`} className="math-inline math-model" />
          {" ("}
          <MathInline tex={String.raw`x`} className="math-inline math-x" />
          {"; "}
          <MathInline tex={String.raw`\theta`} className="math-inline math-theta" />
          {")"}
        </h2>

        <div className="grid gap-3">
          <h3 className="text-lg font-semibold text-white">Plain English</h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            <MathInline tex={String.raw`f`} className="math-inline math-model" />
            {" "}is the rule the computer is using.{" "}
            <MathInline tex={String.raw`x`} className="math-inline math-x" />
            {" "}is the information we feed into that rule.{" "}
            <MathInline tex={String.raw`\theta`} className="math-inline math-theta" />
            {" "}are the knobs that control how the rule behaves. The output{" "}
            <MathInline tex={String.raw`\hat{y}`} className="math-inline math-yhat" />
            {" "}is the prediction we get back.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Think of{" "}
            <MathInline tex={String.raw`f`} className="math-inline math-model" />
            {" "}as the relationship between the inputs{" "}
            <MathInline tex={String.raw`x`} className="math-inline math-x" />
            {" "}and the predicted price{" "}
            <MathInline tex={String.raw`\hat{y}`} className="math-inline math-yhat" />
            {": if a feature changes in "}
            <MathInline tex={String.raw`x`} className="math-inline math-x" />
            {", "}
            <MathInline tex={String.raw`f`} className="math-inline math-model" />
            {" "}tells you how the predicted price{" "}
            <MathInline tex={String.raw`\hat{y}`} className="math-inline math-yhat" />
            {" "}should change.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            For example, you would expect a larger floor area to increase the
            price. The function{" "}
            <MathInline tex={String.raw`f`} className="math-inline math-model" />
            {" "}captures how much the predicted price{" "}
            <MathInline tex={String.raw`\hat{y}`} className="math-inline math-yhat" />
            {" "}moves when floor area{" "}
            <MathInline tex={String.raw`x`} className="math-inline math-x" />
            {" "}goes up.
          </p>
        </div>

        <div className="grid gap-3">
          <h3 className="text-lg font-semibold text-white">Visual intuition</h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Imagine plotting points on a graph: floor area on the{" "}
            <MathInline tex={String.raw`x`} className="math-inline math-x" />
            {"-axis and price on the "}
            <MathInline tex={String.raw`y`} className="math-inline math-y" />
            {"-axis. A very simple "}
            <span className="math-model">model</span>
            {" draws a straight line "}
            through those points. That line <span className="text-white">is</span>{" "}
            the function{" "}
            <MathInline tex={String.raw`f`} className="math-inline math-model" />.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            The settings{" "}
            <MathInline tex={String.raw`\theta`} className="math-inline math-theta" />
            {" "}control the slope and position of the line. Changing{" "}
            <MathInline tex={String.raw`\theta`} className="math-inline math-theta" />
            {" "}rotates or shifts the line. Learning means adjusting the line
            so it fits the dots better.
          </p>
          <div className="grid gap-3">
            <h4 className="text-base font-semibold text-white">
              Possible relationships
            </h4>
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Each line below is a candidate for how floor area might map to
              price. Some candidates clearly look better than others. For
              example, the{" "}
              <span className="text-[#38bdf8]">blue line</span>{" "}
              <span className="text-white">(</span>
              <span className="text-[#38bdf8]">Candidate B</span>
              <span className="text-white">)</span>{" "}
              appears to follow the points more closely than the{" "}
              <span className="text-[#ef4444]">red line</span>{" "}
              <span className="text-white">(</span>
              <span className="text-[#ef4444]">Candidate A</span>
              <span className="text-white">)</span>.
            </p>
            <LineGuessPlot
              data={HOUSE_DATA}
              xKey="floor_area_m2"
              yKey="price_gbp"
              yScale={1000}
              candidateBLine={CANDIDATE_B_WORKED_LINE}
            />
          </div>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Visual comparison is useful, but we still need a mathematical test.
            In the training and loss section, we use error and loss to measure
            exactly which candidate fits better.
          </p>
        </div>

        <div className="grid gap-3">
          <h3 className="text-lg font-semibold text-white">Concrete numbers</h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            We&apos;ll carry both candidates into this plot:{" "}
            <span className="text-[#ef4444]">Candidate A</span>{" "}
            <span className="text-white">(</span>
            <span className="text-[#ef4444]">red</span>
            <span className="text-white">)</span> and{" "}
            <span className="text-[#38bdf8]">Candidate B</span>{" "}
            <span className="text-white">(</span>
            <span className="text-[#38bdf8]">blue</span>
            <span className="text-white">)</span>.
          </p>
          <WorkedExamplePlot
            data={HOUSE_DATA}
            xKey="floor_area_m2"
            yKey="price_gbp"
            yScale={1000}
            line={CANDIDATE_A_LINE}
            lineColor="#ef4444"
            lineLabel="Candidate A"
            secondaryLine={CANDIDATE_B_WORKED_LINE}
            secondaryLineColor="#38bdf8"
            secondaryLineLabel="Candidate B"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            We will use one feature,{" "}
            <span className="math-x">floor area</span>, so we can keep the
            example simple. A simple rule is:
          </p>
          <div className="math-center math-lg text-white/90">
            <MathInline tex={String.raw`price`} className="math-inline math-neutral" />
            <span className="text-white"> = </span>
            <ThetaWithIndex index={0} />
            <span className="text-white"> + </span>
            <ThetaWithIndex index={1} />
            <span className="text-white"> × </span>
            <span className="math-x font-mono">floor_area</span>
          </div>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Here{" "}
            <ThetaWithIndex index={0} />
            {" "}is the baseline price — the{" "}
            <span className="math-model">model</span>&apos;s starting point when
            floor area is zero (not a real house, but a useful reference).{" "}
            <ThetaWithIndex index={1} />
            {" "}is how much price rises per extra square metre.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            In other words,{" "}
            <ThetaWithIndex index={0} />
            {" "}anchors the line, and{" "}
            <ThetaWithIndex index={1} />
            {" "}controls its steepness.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            <span className="text-[#ef4444]">Candidate A</span>{" "}
            <span className="text-white">(</span>
            <span className="text-[#ef4444]">red</span>
            <span className="text-white">)</span>{" "}uses{" "}
            <ThetaWithIndex index={0} />
            {" "} <span className="text-white">= 50,000</span> and{" "}
            <ThetaWithIndex index={1} />
            {" "} <span className="text-white">= 2,000</span>. We&apos;ll pick a
            data point at random to demonstrate, for example{" "}
            <span className="math-x font-mono">floor_area</span>
            {" "} <span className="text-white">= {EXAMPLE_FLOOR_AREA}</span>.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            For <span className="text-[#ef4444]">Candidate A</span> at{" "}
            <span className="math-x font-mono">floor_area</span>
            {" "} <span className="text-white">= {EXAMPLE_FLOOR_AREA}</span>:
          </p>
          <div className="math-center math-lg text-white/90 grid gap-1">
            <div>
              <MathInline tex={String.raw`price`} className="math-inline math-neutral" />
              <span className="text-white"> = </span>
              <span className="text-white">50,000</span>
              <span className="text-white"> + </span>
              <span className="text-white">2,000</span>
              <span className="text-white"> × </span>
              <span className="text-white">{EXAMPLE_FLOOR_AREA.toLocaleString("en-GB")}</span>
            </div>
            <div>
              <span className="text-white">= </span>
              <span className="text-white">50,000</span>
              <span className="text-white"> + </span>
              <span className="text-white">220,000</span>
            </div>
            <div>
              <span className="text-white">= </span>
              <span className="text-white">270,000</span>
            </div>
          </div>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            <span className="text-[#38bdf8]">Candidate B</span>{" "}
            <span className="text-white">(</span>
            <span className="text-[#38bdf8]">blue</span>
            <span className="text-white">)</span>{" "}uses{" "}
            <ThetaWithIndex index={0} />
            {" "} <span className="text-white">= {candidateBIntercept.toLocaleString("en-GB")}</span>{" "}
            and{" "}
            <ThetaWithIndex index={1} />
            {" "} <span className="text-white">= {candidateBSlope.toLocaleString("en-GB")}</span>
            {" "}from the data-driven line in the chart:
          </p>
          <div className="math-center math-lg text-white/90 grid gap-1">
            <div>
              <MathInline tex={String.raw`price`} className="math-inline math-neutral" />
              <span className="text-white"> = </span>
              <span className="text-white">{candidateBIntercept.toLocaleString("en-GB")}</span>
              <span className="text-white"> + </span>
              <span className="text-white">{candidateBSlope.toLocaleString("en-GB")}</span>
              <span className="text-white"> × </span>
              <span className="text-white">{EXAMPLE_FLOOR_AREA.toLocaleString("en-GB")}</span>
            </div>
            <div>
              <span className="text-white">= </span>
              <span className="text-white">{candidateBIntercept.toLocaleString("en-GB")}</span>
              <span className="text-white"> + </span>
              <span className="text-white">{candidateBContribution.toLocaleString("en-GB")}</span>
            </div>
            <div>
              <span className="text-white">= </span>
              <span className="text-white">{candidateBApproxPrediction.toLocaleString("en-GB")}</span>
            </div>
          </div>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            For this one house size,{" "}
            <span className="text-[#ef4444]">Candidate A</span> predicts{" "}
            <span className="text-white">£{candidateAPrediction.toLocaleString("en-GB")}</span>{" "}
            and <span className="text-[#38bdf8]">Candidate B</span> predicts{" "}
            <span className="text-white">£{candidateBPrediction.toLocaleString("en-GB")}</span>{" "}
            (much higher than <span className="text-[#ef4444]">Candidate A</span>).
            The true price is{" "}
            <span className="text-white">£</span>
            <span className="math-y">{EXAMPLE_TRUE_PRICE.toLocaleString("en-GB")}</span>,
            so <span className="text-[#38bdf8]">Candidate B</span> is much closer
            for this specific floor area.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            But one row is not enough. How do we know which candidate is better
            across all floor sizes? Next, we measure that with error and loss.
          </p>
        </div>
      </section>

      <section id="training" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Training and loss
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Training means adjusting the{" "}
          <span className="math-model">model</span>&apos;s settings to make predictions
          less wrong. We need a numeric score of wrongness. That score is called{" "}
          <span className="text-white">loss</span>.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Let&apos;s pick a data point at random to demonstrate, for example:{" "}
          <span className="math-x font-mono">floor_area</span>
          {" "} <span className="text-white">= {EXAMPLE_FLOOR_AREA}</span>,{" "}
          <MathInline tex={String.raw`y`} className="math-inline math-y" />
          {" "} <span className="text-white">= {EXAMPLE_TRUE_PRICE.toLocaleString("en-GB")}</span>. Using{" "}
          <span className="text-[#ef4444]">Candidate A</span> from above, the{" "}
          <span className="math-model">model</span> predicts{" "}
          <MathInline tex={String.raw`\hat{y}`} className="math-inline math-yhat" />
          {" "} <span className="text-white">= {candidateAPrediction.toLocaleString("en-GB")}</span>.
        </p>
        <WorkedExamplePlot
          data={HOUSE_DATA}
          xKey="floor_area_m2"
          yKey="price_gbp"
          yScale={1000}
          line={CANDIDATE_A_LINE}
          lineLabel="Candidate A"
          highlightX={EXAMPLE_FLOOR_AREA}
          showErrorBar
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We&apos;ll start by calculating the loss for{" "}
          <span className="text-[#ef4444]">Candidate A</span> at{" "}
          <span className="math-x font-mono">floor_area</span>{" "}
          <span className="text-white">= {EXAMPLE_FLOOR_AREA}</span>. The error
          bar is the gap between prediction and truth for this one point.
        </p>
        <div className="math-center math-lg text-white/90 grid gap-1">
          <div>
            <YHatWithLabel label="A" />
            <span className="text-white"> - </span>
            <MathInline tex={String.raw`y`} className="math-inline math-y" />
            <span className="text-white"> = {candidateAPrediction.toLocaleString("en-GB")} - {EXAMPLE_TRUE_PRICE.toLocaleString("en-GB")}</span>
          </div>
          <div>
            <span className="text-white">= {candidateAError.toLocaleString("en-GB")}</span>
          </div>
        </div>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          For <span className="text-[#ef4444]">Candidate A</span>, the loss at
          this point is the squared error:
        </p>
        <div className="math-center math-lg text-white/90 grid gap-1">
          <div>
            <span className="text-white">(</span>
            <YHatWithLabel label="A" />
            <span className="text-white"> - </span>
            <MathInline tex={String.raw`y`} className="math-inline math-y" />
            <span className="text-white">)</span>
            <sup className="text-white">2</sup>
            <span className="text-white"> = ({candidateAError.toLocaleString("en-GB")})</span>
            <sup className="text-white">2</sup>
          </div>
          <div>
            <span className="text-white">= {candidateALoss.toLocaleString("en-GB")}</span>
          </div>
        </div>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Now do the same for{" "}
          <span className="text-[#38bdf8]">Candidate B</span> at the same floor
          area:
        </p>
        <div className="math-center math-lg text-white/90 grid gap-1">
          <div>
            <YHatWithLabel label="B" />
            <span className="text-white"> - </span>
            <MathInline tex={String.raw`y`} className="math-inline math-y" />
            <span className="text-white"> = {candidateBPrediction.toLocaleString("en-GB")} - {EXAMPLE_TRUE_PRICE.toLocaleString("en-GB")}</span>
          </div>
          <div>
            <span className="text-white">= {candidateBError.toLocaleString("en-GB")}</span>
          </div>
          <div className="pt-1">
            <span className="text-white">(</span>
            <YHatWithLabel label="B" />
            <span className="text-white"> - </span>
            <MathInline tex={String.raw`y`} className="math-inline math-y" />
            <span className="text-white">)</span>
            <sup className="text-white">2</sup>
            <span className="text-white"> = ({candidateBError.toLocaleString("en-GB")})</span>
            <sup className="text-white">2</sup>
          </div>
          <div>
            <span className="text-white">= {candidateBLoss.toLocaleString("en-GB")}</span>
          </div>
        </div>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          At <span className="math-x font-mono">floor_area</span>{" "}
          <span className="text-white">= {EXAMPLE_FLOOR_AREA}</span>,{" "}
          <span className="text-[#38bdf8]">Candidate B</span> has a much smaller
          loss than <span className="text-[#ef4444]">Candidate A</span>, so it
          fits this particular point better.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Again, that is just one data point. To compare both candidates across
          all rows, we use{" "}
          <span className="text-white font-semibold">Mean Squared Error (MSE)</span>.
        </p>

        <section id="mse" className="grid gap-4">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Mean Squared Error (MSE)
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            A standard way to calculate average loss across all data points is{" "}
            <span className="text-white font-semibold">mean squared error (MSE)</span>.
          </p>
          <MathBlock
            tex={String.raw`MSE = \frac{1}{n}\sum_{i=1}^{n}(y_i - \hat{y}_i)^2`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            where:
          </p>
          <div className="ml-6 grid gap-2 text-base leading-7 text-[color:var(--color-muted)]">
            <p>
              <MathInline tex={String.raw`n`} className="math-inline text-white" /> is
              the number of rows (here, <span className="text-white">8</span>).
            </p>
            <p>
              <MathInline tex={String.raw`y_i`} className="math-inline math-y" /> is the
              true price for row <MathInline tex={String.raw`i`} className="math-inline text-white" />.
            </p>
            <p>
              <MathInline tex={String.raw`\hat{y}_i`} className="math-inline math-yhat" /> is the
              predicted price for row <MathInline tex={String.raw`i`} className="math-inline text-white" />.
            </p>
            <p>
              <MathInline tex={String.raw`(y_i - \hat{y}_i)^2`} className="math-inline" /> is
              the same single-point squared loss we just calculated for floor area{" "}
              <span className="text-white">{EXAMPLE_FLOOR_AREA}</span>, now repeated for each row.
            </p>
          </div>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Here, <span className="text-white">row 1</span> is floor area{" "}
            <span className="math-x">52</span>, <span className="text-white">row 2</span> is{" "}
            <span className="math-x">68</span>, ..., and{" "}
            <span className="text-white">row 8</span> is{" "}
            <span className="math-x">160</span>.
          </p>

          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            <span className="text-[#ef4444]">Candidate A</span> MSE:
          </p>
          <div className="math-center math-lg text-white/90 grid gap-1">
            <div>
              <MseWithCandidate candidate="A" candidateClassName="text-[#ef4444]" />
              <span className="text-white"> = (</span>
              <YWithIndex index={1} />
              <span className="text-white"> - </span>
              <YHatWithIndexCandidate
                index={1}
                candidate="A"
                candidateClassName="text-[#ef4444]"
              />
              <span className="text-white">)</span>
              <sup className="text-white">2</sup>
              <span className="text-white"> + (</span>
              <YWithIndex index={2} />
              <span className="text-white"> - </span>
              <YHatWithIndexCandidate
                index={2}
                candidate="A"
                candidateClassName="text-[#ef4444]"
              />
              <span className="text-white">)</span>
              <sup className="text-white">2</sup>
              <span className="text-white"> + ... + (</span>
              <YWithIndex index={8} />
              <span className="text-white"> - </span>
              <YHatWithIndexCandidate
                index={8}
                candidate="A"
                candidateClassName="text-[#ef4444]"
              />
              <span className="text-white">)</span>
              <sup className="text-white">2</sup>
              <span className="text-white">) / 8</span>
            </div>
            <div>
              <span className="text-white">
                = ({candidateASquaredErrors[0].toLocaleString("en-GB")} +{" "}
                {candidateASquaredErrors[1].toLocaleString("en-GB")} + ... +{" "}
                {candidateASquaredErrors[7].toLocaleString("en-GB")}) / 8
              </span>
            </div>
            <div>
              <span className="text-white">
                = {candidateASquaredErrorSum.toLocaleString("en-GB")} / 8
              </span>
            </div>
            <div>
              <span className="text-white">= {candidateAMse.toLocaleString("en-GB")}</span>
            </div>
          </div>

          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            <span className="text-[#38bdf8]">Candidate B</span> MSE:
          </p>
          <div className="math-center math-lg text-white/90 grid gap-1">
            <div>
              <MseWithCandidate candidate="B" candidateClassName="text-[#38bdf8]" />
              <span className="text-white"> = (</span>
              <YWithIndex index={1} />
              <span className="text-white"> - </span>
              <YHatWithIndexCandidate
                index={1}
                candidate="B"
                candidateClassName="text-[#38bdf8]"
              />
              <span className="text-white">)</span>
              <sup className="text-white">2</sup>
              <span className="text-white"> + (</span>
              <YWithIndex index={2} />
              <span className="text-white"> - </span>
              <YHatWithIndexCandidate
                index={2}
                candidate="B"
                candidateClassName="text-[#38bdf8]"
              />
              <span className="text-white">)</span>
              <sup className="text-white">2</sup>
              <span className="text-white"> + ... + (</span>
              <YWithIndex index={8} />
              <span className="text-white"> - </span>
              <YHatWithIndexCandidate
                index={8}
                candidate="B"
                candidateClassName="text-[#38bdf8]"
              />
              <span className="text-white">)</span>
              <sup className="text-white">2</sup>
              <span className="text-white">) / 8</span>
            </div>
            <div>
              <span className="text-white">
                = ({candidateBSquaredErrors[0].toLocaleString("en-GB")} +{" "}
                {candidateBSquaredErrors[1].toLocaleString("en-GB")} + ... +{" "}
                {candidateBSquaredErrors[7].toLocaleString("en-GB")}) / 8
              </span>
            </div>
            <div>
              <span className="text-white">
                = {candidateBSquaredErrorSum.toLocaleString("en-GB")} / 8
              </span>
            </div>
            <div>
              <span className="text-white">= {candidateBMse.toLocaleString("en-GB")}</span>
            </div>
          </div>

          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            <span className="text-[#38bdf8]">Candidate B</span> has a much
            smaller MSE than <span className="text-[#ef4444]">Candidate A</span>,
            and <span className="text-[#ef4444]">Candidate A</span>&apos;s average
            squared error is about{" "}
            <span className="text-white">{mseRatio.toLocaleString("en-GB", { maximumFractionDigits: 1 })}x</span>{" "}
            larger. That indicates <span className="text-[#38bdf8]">Candidate B</span> is a much better fit overall.
          </p>
        </section>
      </section>

      <section id="loop" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Learning loop
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          So how does a <span className="math-model">model</span> learn which
          candidate is best?
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          It starts with an initial guess, checks how wrong that guess is using
          average error (loss), and then nudges its settings in a better
          direction. The goal is to reduce that error over time. The process is
          called a training loop.
        </p>
        <div className="ml-6 grid gap-2 text-base leading-7 text-[color:var(--color-muted)]">
          <div className="grid gap-2 md:grid-cols-[40px_minmax(0,1fr)]">
            <div className="text-white font-semibold">1.</div>
            <div>
              Start with a guess for the{" "}
              <span className="math-model">model</span>&apos;s settings (
              <ThetaWithIndex index={0} />
              <span className="text-[color:var(--color-muted)]">, </span>
              <ThetaWithIndex index={1} />
              <span className="text-[color:var(--color-muted)]">, </span>
              <ThetaWithIndex index={2} />
              <span className="text-[color:var(--color-muted)]">, </span>
              <MathInline tex={String.raw`\dots`} className="math-inline math-theta" />
              ).
            </div>
          </div>
          <div className="grid gap-2 md:grid-cols-[40px_minmax(0,1fr)]">
            <div className="text-white font-semibold">2.</div>
            <div>
              Use the <span className="math-model">model</span> to{" "}
              <span className="math-yhat font-semibold">predict</span> prices for
              all rows.
            </div>
          </div>
          <div className="grid gap-2 md:grid-cols-[40px_minmax(0,1fr)]">
            <div className="text-white font-semibold">3.</div>
            <div>
              Measure the average error with loss (for example,{" "}
              <span className="text-white">MSE</span>).
            </div>
          </div>
          <div className="grid gap-2 md:grid-cols-[40px_minmax(0,1fr)]">
            <div className="text-white font-semibold">4.</div>
            <div>
              Adjust the <span className="math-theta font-semibold">settings</span>{" "}
              to reduce the loss.
            </div>
          </div>
          <div className="grid gap-2 md:grid-cols-[40px_minmax(0,1fr)]">
            <div className="text-white font-semibold">5.</div>
            <div>Repeat until the loss stops improving.</div>
          </div>
        </div>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Next, we&apos;ll look at a visual training example to see how the
          parameters improve over successive loops.
        </p>
        <h3
          id="visual-intuition"
          className="mt-6 text-xl font-semibold text-white font-[var(--font-display)]"
        >
          Visual intuition
        </h3>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          For the visual, we use just one feature:{" "}
          <span className="math-x font-mono">floor_area_m2</span>. This keeps the
          plot 2D. Real <span className="math-model">models</span> can still use
          the full table above.
        </p>
        <LineFitAnimator
          data={HOUSE_DATA}
          xKey="floor_area_m2"
          yKey="price_gbp"
          yScale={1000}
          showErrorBars
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          After running the loop, the fitted parameters settle around{" "}
          <ThetaWithIndex index={0} />
          {" "} <span className="text-white">= {CANDIDATE_B_THETA0.toLocaleString("en-GB")}</span>{" "}
          and <ThetaWithIndex index={1} />
          {" "} <span className="text-white">= {CANDIDATE_B_THETA1.toLocaleString("en-GB")}</span>.
        </p>
        <div className="math-center math-lg text-white/90">
          <span className="math-yhat">price</span>
          <span className="text-white"> ≈ {CANDIDATE_B_THETA0.toLocaleString("en-GB")} + {CANDIDATE_B_THETA1.toLocaleString("en-GB")} × </span>
          <span className="math-x font-mono">floor_area</span>
        </div>
      </section>

      <section id="prediction-demo" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Prediction
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Now that we have trained parameters for the best-fitting line, we can
          use that model to predict a price for a floor size that is not in the
          dataset. Let&apos;s use{" "}
          <span className="math-x font-mono">floor_area</span>{" "}
          <span className="text-white">= {PREDICTION_FLOOR_AREA}</span>.
        </p>
        <div className="math-center math-lg text-white/90 grid gap-1">
          <div>
            <MathInline tex={String.raw`\hat{y}`} className="math-inline math-yhat" />
            <span className="text-white"> = {CANDIDATE_B_THETA0.toLocaleString("en-GB")} + {CANDIDATE_B_THETA1.toLocaleString("en-GB")} × </span>
            <span className="math-x">{PREDICTION_FLOOR_AREA.toLocaleString("en-GB")}</span>
          </div>
          <div>
            <span className="text-white">= {CANDIDATE_B_THETA0.toLocaleString("en-GB")} + {(CANDIDATE_B_THETA1 * PREDICTION_FLOOR_AREA).toLocaleString("en-GB")}</span>
          </div>
          <div>
            <span className="text-white">= {predictionFromCandidateB.toLocaleString("en-GB")}</span>
          </div>
        </div>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          So the <span className="math-yhat">predicted house price</span> is{" "}
          <span className="text-white">£{predictionFromCandidateB.toLocaleString("en-GB")}</span>.
          The guide lines in the chart show how this value is read from the
          axes.
        </p>
        <PredictionGuidePlot
          data={HOUSE_DATA}
          xKey="floor_area_m2"
          yKey="price_gbp"
          yScale={1000}
          line={CANDIDATE_B_WORKED_LINE}
          predictionX={PREDICTION_FLOOR_AREA}
          lineLabel="Trained model line"
        />
      </section>

      <section id="example" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Python example
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Below is a step-by-step breakdown of a tiny example using the same
          table. Each block is short and does one job.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This is <span className="text-white">supervised learning</span> because
          the training data includes labels (the prices). Two other major types
          are <span className="text-white">unsupervised learning</span> and{" "}
          <span className="text-white">reinforcement learning</span>, which we
          will cover in a separate lesson.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We are also using a <span className="text-white">regression</span>{" "}
          <span className="math-model">model</span> because the output is a number.
          Other common task types include{" "}
          <span className="text-white">classification</span> and{" "}
          <span className="text-white">clustering</span>, which we&apos;ll cover
          in other lessons.
        </p>
        <div className="grid gap-4 text-base leading-7 text-[color:var(--color-muted)]">
          <p className="text-white font-semibold">Install + import</p>
          <p>
            This example uses{" "}
            <span className="font-mono inline-code">pandas</span> and{" "}
            <span className="font-mono inline-code">scikit-learn</span>{" "}
            (<span className="font-mono inline-code">sklearn</span>). We import{" "}
            <span className="font-mono inline-code">LinearRegression</span> from{" "}
            <span className="font-mono inline-code">sklearn.linear_model</span>.
          </p>
          <p>
            Helpful docs:{" "}
            <a
              href="https://pandas.pydata.org/docs/"
              target="_blank"
              rel="noreferrer"
              className="text-[color:var(--color-accent-2)] underline underline-offset-4 hover:text-white transition"
            >
              Pandas documentation
            </a>{" "}
            and{" "}
            <a
              href="https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LinearRegression.html"
              target="_blank"
              rel="noreferrer"
              className="text-[color:var(--color-accent-2)] underline underline-offset-4 hover:text-white transition"
            >
              scikit-learn LinearRegression
            </a>
            .
          </p>
          <p>
            In your project terminal, run the following command:
          </p>
          <CodeBlock
            code={`pip install pandas scikit-learn`}
            title="Terminal"
          />
          <p>
            If you are working in a notebook (like Jupyter), use:
          </p>
          <CodeBlock
            code={`!pip install pandas scikit-learn`}
            title="Notebook"
          />
          <p>
            Once installed, import the libraries:
          </p>
          <CodeBlock
            code={`import pandas as pd\nfrom sklearn.linear_model import LinearRegression`}
            title="Python"
          />

          <p className="text-white font-semibold">Create the table</p>
          <p>
            Build a{" "}
            <span className="font-mono inline-code">pd.DataFrame</span>{" "}
            so each row is a house and each column is a feature or label:
          </p>
          <CodeBlock
            code={`data = pd.DataFrame({\n    "floor_area_m2": [52, 68, 75, 90, 110, 130, 145, 160],\n    "bedrooms": [1, 2, 2, 3, 3, 4, 4, 5],\n    "distance_to_centre_km": [4.5, 3.2, 6.0, 5.5, 2.8, 7.5, 3.0, 8.0],\n    "price_gbp": [210000, 265000, 255000, 310000, 365000, 390000, 460000, 455000],\n})`}
            title="Python"
          />

          <p className="text-white font-semibold">Split features and target</p>
          <p>
            Select the feature columns for{" "}
            <span className="font-mono inline-code">X</span> and the label column for{" "}
            <span className="font-mono inline-code">y</span>:
          </p>
          <CodeBlock
            code={`X = data[["floor_area_m2", "bedrooms", "distance_to_centre_km"]]\ny = data["price_gbp"]`}
            title="Python"
          />

          <p className="text-white font-semibold">
            Fit the <span className="math-model">model</span>
          </p>
          <p>
            Create the <span className="math-model">model</span> and train it with{" "}
            <span className="font-mono inline-code">fit()</span>:
          </p>
          <CodeBlock
            code={`model = LinearRegression()\nmodel.fit(X, y)`}
            title="Python"
          />
          <p>
            Intuitively,{" "}
            <span className="font-mono inline-code">fit()</span> adjusts the{" "} 
            <span className="math-model">model</span> so the line matches the
            data as closely as possible. It learns
            the parameters{" "}
            <MathInline tex={String.raw`\theta`} className="math-inline math-theta" />
            , including the intercept{" "}
            <MathInline tex={String.raw`\theta_0`} className="math-inline math-theta" />
            {" "}and the feature slopes{" "}
            <MathInline tex={String.raw`\theta_1`} className="math-inline math-theta" />
            <span className="text-[color:var(--color-muted)]">, </span>
            <MathInline tex={String.raw`\theta_2`} className="math-inline math-theta" />
            <span className="text-[color:var(--color-muted)]">, </span>
            <MathInline tex={String.raw`\theta_3`} className="math-inline math-theta" />
            , so the predictions{" "}
            <MathInline tex={String.raw`\hat{y}`} className="math-inline math-yhat" />
            {" "}get closer to the true values{" "}
            <MathInline tex={String.raw`y`} className="math-inline math-y" />
            .
          </p>

          <p className="text-white font-semibold">Inspect the learned settings</p>
          <p>
            The <span className="math-model">model</span> stores its learned
            baseline and slopes as{" "}
            <span className="font-mono inline-code">intercept_</span> and{" "}
            <span className="font-mono inline-code">coef_</span>. These line up
            with the{" "}
            <MathInline tex={String.raw`\theta`} className="math-inline math-theta" />
            {" "}values we discussed earlier:
          </p>
          <CodeBlock
            code={`intercept = model.intercept_\ncoefficients = model.coef_\nprint(round(intercept, 2))\nprint([round(c, 2) for c in coefficients])`}
            title="Python"
          />
          <OutputBlock output={interceptOutput} />
          <p>
            These numbers can now be plugged into the price equation:
          </p>
          <div className="math-center math-lg text-white/90">
            <MathInline tex={String.raw`price`} className="math-inline math-neutral" />
            <span className="text-white"> = </span>
            <ThetaWithIndex index={0} />
            <span className="text-white"> + </span>
            <ThetaWithIndex index={1} />
            <span className="text-white"> · </span>
            <span className="math-x font-mono">floor_area_m2</span>
            <span className="text-white"> + </span>
            <ThetaWithIndex index={2} />
            <span className="text-white"> · </span>
            <span className="math-x font-mono">bedrooms</span>
            <span className="text-white"> + </span>
            <ThetaWithIndex index={3} />
            <span className="text-white"> · </span>
            <span className="math-x font-mono">distance_to_centre_km</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm text-[color:var(--color-muted)]">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-[0.16em] text-white/90">
                  <th className="py-2">Term</th>
                  <th className="py-2">Parameter</th>
                  <th className="py-2">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-2">Intercept</td>
                  <td className="py-2">
                    <ThetaWithIndex index={0} />
                  </td>
                  <td className="py-2 text-white">≈ 124,452</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2">
                    <span className="math-x font-mono">floor_area_m2</span>
                  </td>
                  <td className="py-2">
                    <ThetaWithIndex index={1} />
                  </td>
                  <td className="py-2 text-white">≈ 2,050</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2">
                    <span className="math-x font-mono">bedrooms</span>
                  </td>
                  <td className="py-2">
                    <ThetaWithIndex index={2} />
                  </td>
                  <td className="py-2 text-white">≈ 14,690</td>
                </tr>
                <tr>
                  <td className="py-2">
                    <span className="math-x font-mono">distance_to_centre_km</span>
                  </td>
                  <td className="py-2">
                    <ThetaWithIndex index={3} />
                  </td>
                  <td className="py-2 text-white">≈ -8,379</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            In other words:{" "}
            <ThetaWithIndex index={0} />
            {" "}is the baseline price{" "}
            <span className="text-white">(£124,452.03)</span>,{" "}
            <ThetaWithIndex index={1} />
            {" "}is the floor area effect{" "}
            <span className="text-white">(£2,049.63 per m²)</span>,{" "}
            <ThetaWithIndex index={2} />
            {" "}is the bedrooms effect{" "}
            <span className="text-white">(£14,689.77 per bedroom)</span>, and{" "}
            <ThetaWithIndex index={3} />
            {" "}is the distance effect{" "}
            <span className="text-white">(-£8,379.36 per km)</span>.
          </p>

          <p className="text-white font-semibold">Make a prediction</p>
          <p>
            Ask the <span className="math-model">model</span> for a price using{" "}
            <span className="font-mono inline-code">predict()</span>:
          </p>
          <CodeBlock
            code={`prediction = model.predict([[100, 3, 4.0]])[0]\nprint(round(prediction, 0))`}
            title="Python"
          />
        <OutputBlock output={tinyExampleOutput} />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The output is the predicted price for a{" "}
          <span className="math-x">100</span>{" "}
          <MathInline tex={String.raw`m^2`} className="math-inline math-neutral" />
          {", "}<span className="math-x">3</span>-bedroom house{" "}
          <span className="math-x">4</span> km from the centre. That predicted
          price is{" "}
          £<span className="math-yhat">330,000</span>.
        </p>
        </div>
      </section>

      <section id="summary" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Summary
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This page was designed as a hands-on overview: enough{" "}
          <span className="text-white font-semibold">intuition</span> to build a
          mental model, plus a{" "}
          <span className="text-white font-semibold">concrete worked example</span>{" "}
          with real numbers and plots.
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
                  <td className="w-12 py-2 text-center text-lg">✅</td>
                  <td className="py-2">
                    One branch of ML: <span className="text-white font-semibold">supervised learning</span>.
                  </td>
                </tr>
                <tr>
                  <td className="w-12 py-2 text-center text-lg">✅</td>
                  <td className="py-2">
                    One problem type: <span className="text-white font-semibold">regression</span>.
                  </td>
                </tr>
                <tr>
                  <td className="w-12 py-2 text-center text-lg">✅</td>
                  <td className="py-2">
                    A concrete dataset with <span className="math-x">features</span> and{" "}
                    <span className="math-yhat">labels</span>.
                  </td>
                </tr>
                <tr>
                  <td className="w-12 py-2 text-center text-lg">✅</td>
                  <td className="py-2">
                    How a simple linear <span className="math-model">model</span> maps inputs to predictions.
                  </td>
                </tr>
                <tr>
                  <td className="w-12 py-2 text-center text-lg">✅</td>
                  <td className="py-2">
                    How to compare candidates using <span className="text-white font-semibold">loss</span> and{" "}
                    <span className="text-white font-semibold">MSE</span>.
                  </td>
                </tr>
                <tr>
                  <td className="w-12 py-2 text-center text-lg">✅</td>
                  <td className="py-2">
                    A visual training loop and a worked prediction for a new input.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            From the list above, we did cover a lot of ground - so genuinely,
            well done. But there are also key pieces we deliberately{" "}
            <span className="text-rose-400 font-semibold">DID NOT</span>{" "}
            cover yet, for example:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
              <tbody>
                <tr>
                  <td className="w-12 py-2 text-center text-lg">❌</td>
                  <td className="py-2">
                    Categorical labels (for example, <span className="text-white">spam</span> vs{" "}
                    <span className="text-white">not spam</span>).
                  </td>
                </tr>
                <tr>
                  <td className="w-12 py-2 text-center text-lg">❌</td>
                  <td className="py-2">
                    How parameter updates are actually computed each step (the training math).
                  </td>
                </tr>
                <tr>
                  <td className="w-12 py-2 text-center text-lg">❌</td>
                  <td className="py-2">
                    How we evaluate model quality on <span className="text-white">unseen data</span>.
                  </td>
                </tr>
                <tr>
                  <td className="w-12 py-2 text-center text-lg">❌</td>
                  <td className="py-2">
                    Robust setup topics like train/validation/test splits and overfitting vs generalisation.
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
            We focused on one branch of ML (
            <span className="text-white font-semibold">supervised learning</span>)
            and one problem type (
            <span className="text-white font-semibold">regression</span>). We
            have not yet unpacked the full{" "}
            <span className="text-white italic">under-the-bonnet</span>{" "}
            mechanics of how parameters are updated at each training step.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Next we&apos;ll drill into{" "}
            <span className="text-white font-semibold">data types</span>,{" "}
            <span className="text-white font-semibold">training math</span>,{" "}
            <span className="text-white font-semibold">train/validation/test splits</span>,
            {" "}<span className="text-white font-semibold">evaluation on unseen data</span>,
            and{" "}
            <span className="text-white font-semibold">overfitting vs generalisation</span>.
            We&apos;ll also branch into cases like{" "}
            <span className="text-white font-semibold">categorical prediction</span>{" "}
            (spam vs not spam) and{" "}
            <span className="text-white font-semibold">reinforcement learning</span>.
          </p>
        </section>
      </section>

      <section id="checkpoint" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Mini-checkpoint
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This section uses flashcards. Click a card to flip it for the answer,
          and use the arrows or dots to move between questions.
        </p>
        <FlashcardCarousel
          cards={[
            {
              question: <>What is a feature?</>,
              answer: (
                <>
                  An input variable the <span className="math-model">model</span> uses,
                  like floor_area_m2 or bedrooms.
                </>
              ),
            },
            {
              question: (
                <>
                  What is the difference between{" "}
                  <MathInline tex={String.raw`y`} className="math-inline math-y" />{" "}
                  and{" "}
                  <MathInline tex={String.raw`\hat{y}`} className="math-inline math-yhat" />?
                </>
              ),
              answer: (
                <>
                  <MathInline tex={String.raw`y`} className="math-inline math-y" />{" "}
                  is the true answer from the data;{" "}
                  <MathInline tex={String.raw`\hat{y}`} className="math-inline math-yhat" />{" "}
                  is the <span className="math-model">model</span>&apos;s prediction.
                </>
              ),
            },
            {
              question: (
                <>
                  What does{" "}
                  <MathInline tex={String.raw`\theta`} className="math-inline math-theta" />{" "}
                  represent?
                </>
              ),
              answer: (
                <>
                  The adjustable settings inside the{" "}
                  <span className="math-model">model</span>, like the intercept and
                  slopes of a line.
                </>
              ),
            },
            {
              question: <>Why do we square errors?</>,
              answer: <>To make all errors positive and to penalise big mistakes more than small ones.</>,
            },
            {
              question: <>What is supervised learning?</>,
              answer: <>Learning from labelled examples where the correct answers are already known.</>,
            },
          ]}
        />
      </section>

      <section id="glossary" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Glossary
        </h2>
        <div className="ml-6 grid gap-2 text-base leading-7 text-[color:var(--color-muted)]">
          <div className="grid gap-2 md:grid-cols-[140px_minmax(0,1fr)]">
            <div className="text-white font-semibold">Feature</div>
            <div>
              An input the <span className="math-model">model</span> uses.
            </div>
          </div>
          <div className="grid gap-2 md:grid-cols-[140px_minmax(0,1fr)]">
            <div className="text-white font-semibold">Label</div>
            <div>The true output we want to predict.</div>
          </div>
          <div className="grid gap-2 md:grid-cols-[140px_minmax(0,1fr)]">
            <div className="text-white font-semibold">Model</div>
            <div>The rule that maps inputs to predictions.</div>
          </div>
          <div className="grid gap-2 md:grid-cols-[140px_minmax(0,1fr)]">
            <div className="text-white font-semibold">Prediction</div>
            <div>
              The <span className="math-model">model</span>&apos;s output.
            </div>
          </div>
          <div className="grid gap-2 md:grid-cols-[140px_minmax(0,1fr)]">
            <div className="text-white font-semibold">Parameters</div>
            <div>
              The adjustable settings the <span className="math-model">model</span>{" "}
              learns.
            </div>
          </div>
          <div className="grid gap-2 md:grid-cols-[140px_minmax(0,1fr)]">
            <div className="text-white font-semibold">Loss</div>
            <div>A number measuring how wrong predictions are.</div>
          </div>
          <div className="grid gap-2 md:grid-cols-[140px_minmax(0,1fr)]">
            <div className="text-white font-semibold">Training</div>
            <div>Adjusting parameters to reduce loss.</div>
          </div>
          <div className="grid gap-2 md:grid-cols-[140px_minmax(0,1fr)]">
            <div className="text-white font-semibold">Generalise</div>
            <div>Perform well on unseen data.</div>
          </div>
        </div>
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




