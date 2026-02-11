import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
import { MathBlock, MathInline } from "@/components/Math";
import FlashcardCarousel from "@/components/FlashcardCarousel";
import LineFitAnimator from "@/components/ml/LineFitAnimator";
import LineGuessPlot from "@/components/ml/LineGuessPlot";
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

export default function WhatIsMlPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "mental-model", label: "A concrete mental model" },
    { id: "examples", label: "Real-world examples", level: 2 },
    { id: "dataset", label: "A tiny dataset", level: 2 },
    { id: "model-plain", label: "What is a model?" },
    { id: "notation", label: "Introducing some notation" },
    { id: "function-intro", label: "Understanding ŷ = f(x; θ)", level: 2 },
    { id: "training", label: "Training and loss" },
    { id: "loop", label: "Learning loop", level: 2 },
    { id: "visual-intuition", label: "Visual intuition", level: 2 },
    { id: "example", label: "Python example" },
    { id: "confusions", label: "Common confusions" },
    { id: "remember", label: "What you should remember" },
    { id: "checkpoint", label: "Mini-checkpoint" },
    { id: "glossary", label: "Glossary" },
  ];

  return (
    <ArticleLayout
      eyebrow="ML - Foundations"
      title="What is Machine Learning?"
      description="A simple definition, the mental model, and a tiny example you can run immediately."
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[{ title: "Within Foundations", links: mlFoundationsLessons }]}
          activeHref="/ml/foundations/what-is-ml"
        />
      }
    >
      <InfoPanel id="mental-model" title="A concrete mental model" variant="intro">
        <p>
          Machine learning (ML) is a way of teaching a computer by showing it
          examples. Instead of writing every rule yourself, you show inputs and
          the correct outputs, then let the computer discover the pattern.
        </p>
        <p>
          Think of it like tutoring. A student does not memorise every question.
          They learn a rule that helps with new questions.
        </p>
      </InfoPanel>

      <InfoPanel id="examples" title="Real-world examples" variant="intuition">
        <p>
          Let&apos;s make learning patterns from data feel concrete. In each
          example, the inputs are the clues and the output is the answer the{" "}
          <span className="math-model">model</span> should predict.
        </p>
        <div className="grid gap-3 text-base leading-7 text-[color:var(--color-muted)]">
          <div className="grid gap-2 md:grid-cols-[180px_minmax(0,1fr)]">
            <div className="text-white font-semibold">House prices</div>
            <div>
              Inputs are floor area, bedrooms, and distance to the centre. Output
              is price. A good prediction is close enough to guide buyers and
              sellers.
            </div>
          </div>
          <div className="grid gap-2 md:grid-cols-[180px_minmax(0,1fr)]">
            <div className="text-white font-semibold">Spam detection</div>
            <div>
              Inputs are words, links, and sender info. Output is spam or not
              spam. A good prediction catches spam without blocking real emails.
            </div>
          </div>
          <div className="grid gap-2 md:grid-cols-[180px_minmax(0,1fr)]">
            <div className="text-white font-semibold">Fraud detection</div>
            <div>
              Inputs are amount, time, location, and device. Output is fraud or
              not fraud. A good prediction flags risky transactions quickly
              without too many false alarms.
            </div>
          </div>
        </div>
      </InfoPanel>

      <section id="dataset" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          A tiny dataset
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Each row is one house. The first three columns are the inputs
          (<span className="math-x">features</span>). The last column is the
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
              (we say "y-hat").
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
        <MathBlock
          tex={String.raw`\hat{y} = f(x; \theta)`}
          className="math-center math-lg text-white/90"
        />
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
              Each line below is a different guess at how floor area might map
              to price. The{" "}
              <span className="math-theta">purple line</span> is the worked
              example we use below.
            </p>
            <LineGuessPlot data={HOUSE_DATA} xKey="floor_area_m2" yKey="price_gbp" yScale={1000} />
          </div>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Some guesses are too steep or too flat. We might get lucky for a
            simple problem, but in general we need a robust way to discover the
            best line.
          </p>
        </div>

        <div className="grid gap-3">
          <h3 className="text-lg font-semibold text-white">Concrete numbers</h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            We will use one feature,{" "}
            <span className="math-x">floor area</span>, so we can keep the
            example simple. A simple rule is:
          </p>
          <MathBlock
            tex={String.raw`price = \theta_0 + \theta_1 \times floor\_area`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Here{" "}
            <MathInline tex={String.raw`\theta_0`} className="math-inline math-theta" />
            {" "}is the baseline price — the{" "}
            <span className="math-model">model</span>&apos;s starting point when
            floor area is zero (not a real house, but a useful reference).{" "}
            <MathInline tex={String.raw`\theta_1`} className="math-inline math-theta" />
            {" "}is how much price rises per extra square metre.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            In other words,{" "}
            <MathInline tex={String.raw`\theta_0`} className="math-inline math-theta" />
            {" "}anchors the line, and{" "}
            <MathInline tex={String.raw`\theta_1`} className="math-inline math-theta" />
            {" "}controls its steepness.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            In the plot above, the{" "}
            <span className="math-theta">purple line</span> is our worked
            example. We will use it to make a prediction. It uses{" "}
            <MathInline tex={String.raw`\theta_0`} className="math-inline math-theta" />
            {" "} <span className="text-white">= 50,000</span> and{" "}
            <MathInline tex={String.raw`\theta_1`} className="math-inline math-theta" />
            {" "} <span className="text-white">= 2,000</span>.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Take the first row with floor area{" "}
            <MathInline tex={String.raw`x`} className="math-inline math-x" />
            {" "} <span className="text-white">= 52</span>, then:
          </p>
          <MathBlock
            tex={String.raw`\begin{aligned}
              price &= 50{,}000 + 2{,}000 \times 52 \\
              &= 50{,}000 + 104{,}000 \\
              &= 154{,}000
            \end{aligned}`}
            className="math-center math-lg text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            The true price for that row is{" "}
            <span className="text-white">£</span>
            <span className="math-y">210,000</span>, so the{" "}
            <span className="math-model">model</span> is too low.
            Training changes{" "}
            <MathInline tex={String.raw`\theta`} className="math-inline math-theta" />
            {" "}to bring predictions closer.
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
          Let&apos;s use the first row of the table:{" "}
          <MathInline tex={String.raw`x`} className="math-inline math-x" />
          {" "} <span className="text-white">= 52</span>,{" "}
          <MathInline tex={String.raw`y`} className="math-inline math-y" />
          {" "} <span className="text-white">= 210,000</span>. Using the same rule
          from above, the{" "}
          <span className="math-model">model</span> predicts{" "}
          <MathInline tex={String.raw`\hat{y}`} className="math-inline math-yhat" />
          {" "} <span className="text-white">= 154,000</span>.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The true price{" "}
          <MathInline tex={String.raw`y`} className="math-inline math-y" />
          {" "}is <span className="math-y">£210,000</span>. The error is the
          difference between the predicted price{" "}
          <MathInline tex={String.raw`\hat{y}`} className="math-inline math-yhat" />
          {" "}and the true price{" "}
          <MathInline tex={String.raw`y`} className="math-inline math-y" />
          {", so:"}
        </p>
        <MathBlock
          tex={String.raw`\begin{aligned}
            \hat{y} - y &= 154{,}000 - 210{,}000 \\
            &= -56{,}000
          \end{aligned}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Squared error makes negatives positive and emphasises big misses:
        </p>
        <MathBlock
          tex={String.raw`\begin{aligned}
            (\hat{y} - y)^2 &= (-56{,}000)^2 \\
            &= 3{,}136{,}000{,}000
          \end{aligned}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We repeat this for the other rows{" "}
          <span className="text-white">(from floor area 68 up to 160)</span>,
          one row at a time. Then we add all the squared errors together and
          divide by{" "}
          <MathInline tex={String.raw`n`} className="math-inline" />
          {" "}to get the average error.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Mean squared error (MSE) averages those squared mistakes:
        </p>
        <MathBlock
          tex={String.raw`MSE = \frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The full <span className="math-model">model</span> could use all three features, but the loss idea is the
          same.
        </p>
      </section>

      <section id="loop" className="scroll-mt-28 grid gap-4">
        <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
          Learning loop
        </h3>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Models learn by making a guess, checking how wrong it is, and nudging
          the settings in a better direction. The goal is to reduce this error
          across repeated learning loops so the{" "}
          <span className="math-model">model</span> fits the data better over
          time.
        </p>
        <div className="grid gap-2 text-base leading-7 text-[color:var(--color-muted)]">
          <div className="grid gap-2 md:grid-cols-[40px_minmax(0,1fr)]">
            <div className="text-white font-semibold">1.</div>
            <div>
              Start with a guess for the{" "}
              <span className="math-model">model</span>&apos;s settings (
              <MathInline tex={String.raw`\theta_0, \theta_1, \theta_2, \dots`} className="math-inline math-theta" />
              ).
            </div>
          </div>
          <div className="grid gap-2 md:grid-cols-[40px_minmax(0,1fr)]">
            <div className="text-white font-semibold">2.</div>
            <div>
              Use the{" "}
              <span className="math-model">model</span> to{" "}
              <span className="math-yhat font-semibold">predict</span> prices for
              all rows.
            </div>
          </div>
          <div className="grid gap-2 md:grid-cols-[40px_minmax(0,1fr)]">
            <div className="text-white font-semibold">3.</div>
            <div>Measure how wrong the predictions are (loss).</div>
          </div>
          <div className="grid gap-2 md:grid-cols-[40px_minmax(0,1fr)]">
            <div className="text-white font-semibold">4.</div>
            <div>
              Adjust the{" "}
              <span className="math-theta font-semibold">settings</span> to reduce
              the loss.
            </div>
          </div>
          <div className="grid gap-2 md:grid-cols-[40px_minmax(0,1fr)]">
            <div className="text-white font-semibold">5.</div>
            <div>Repeat until the loss stops improving.</div>
          </div>
        </div>
        <h3
          id="visual-intuition"
          className="mt-6 text-xl font-semibold text-white font-[var(--font-display)]"
        >
          Visual intuition
        </h3>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          For the visual, we will use just one feature:{" "}
          <span className="math-x font-mono">floor_area_m2</span>. This keeps the
          plot 2D. Real models can still use the full table above.
        </p>
        <LineFitAnimator
          data={HOUSE_DATA}
          xKey="floor_area_m2"
          yKey="price_gbp"
          yScale={1000}
          showErrorBars
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
          model because the output is a number. Other common task types include{" "}
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

          <p className="text-white font-semibold">Fit the model</p>
          <p>
            Create the model and train it with{" "}
            <span className="font-mono inline-code">fit()</span>:
          </p>
          <CodeBlock
            code={`model = LinearRegression()\nmodel.fit(X, y)`}
            title="Python"
          />
          <p>
            Intuitively,{" "}
            <span className="font-mono inline-code">fit()</span> adjusts the
            model so the line matches the data as closely as possible. It learns
            the parameters{" "}
            <MathInline tex={String.raw`\theta`} className="math-inline math-theta" />
            , including the intercept{" "}
            <MathInline tex={String.raw`\theta_0`} className="math-inline math-theta" />
            {" "}and the feature slopes{" "}
            <MathInline tex={String.raw`\theta_1, \theta_2, \theta_3`} className="math-inline math-theta" />
            , so the predictions{" "}
            <MathInline tex={String.raw`\hat{y}`} className="math-inline math-yhat" />
            {" "}get closer to the true values{" "}
            <MathInline tex={String.raw`y`} className="math-inline math-y" />
            .
          </p>

          <p className="text-white font-semibold">Inspect the learned settings</p>
          <p>
            The model stores its learned baseline and slopes as{" "}
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
          <MathBlock
            tex={String.raw`price = \theta_0 + \theta_1 \cdot floor\_area\_m2 + \theta_2 \cdot bedrooms + \theta_3 \cdot distance\_to\_centre\_km`}
            className="math-center math-lg text-white/90"
          />
          <p>
            In other words:{" "}
            <MathInline tex={String.raw`\theta_0`} className="math-inline math-theta" />
            {" "}is the baseline price{" "}
            <span className="text-white">(£124,452.03)</span>,{" "}
            <MathInline tex={String.raw`\theta_1`} className="math-inline math-theta" />
            {" "}is the floor area effect{" "}
            <span className="text-white">(£2,049.63 per m²)</span>,{" "}
            <MathInline tex={String.raw`\theta_2`} className="math-inline math-theta" />
            {" "}is the bedrooms effect{" "}
            <span className="text-white">(£14,689.77 per bedroom)</span>, and{" "}
            <MathInline tex={String.raw`\theta_3`} className="math-inline math-theta" />
            {" "}is the distance effect{" "}
            <span className="text-white">(-£8,379.36 per km)</span>.
          </p>

          <p className="text-white font-semibold">Make a prediction</p>
          <p>
            Ask the model for a price using{" "}
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

      <section id="confusions" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Common confusions
        </h2>
        <div className="grid gap-3 text-base leading-7 text-[color:var(--color-muted)]">
          <div className="grid gap-2 md:grid-cols-[260px_minmax(0,1fr)]">
            <div className="text-white font-semibold">Is the model memorising the data?</div>
            <div>
              It can, but the goal is to learn a pattern that works on new examples,
              not just the training rows.
            </div>
          </div>
          <div className="grid gap-2 md:grid-cols-[260px_minmax(0,1fr)]">
            <div className="text-white font-semibold">How is this different from normal programming?</div>
            <div>
              In normal programming you write the rules. In ML, the model learns
              the rules from examples.
            </div>
          </div>
          <div className="grid gap-2 md:grid-cols-[260px_minmax(0,1fr)]">
            <div className="text-white font-semibold">What does generalise mean?</div>
            <div>It means the model works well on new, unseen data.</div>
          </div>
          <div className="grid gap-2 md:grid-cols-[260px_minmax(0,1fr)]">
            <div className="text-white font-semibold">Why can models be wrong after training?</div>
            <div>
              Real data is messy, and the model may be too simple or trained on
              limited examples.
            </div>
          </div>
          <div className="grid gap-2 md:grid-cols-[260px_minmax(0,1fr)]">
            <div className="text-white font-semibold">Training vs test data?</div>
            <div>
              Training data teaches the model. Test data checks how well the model
              performs on new examples.
            </div>
          </div>
        </div>
      </section>

      <section id="remember" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          What you should remember
        </h2>
        <div className="grid gap-2 text-base leading-7 text-[color:var(--color-muted)]">
          <div className="grid gap-2 md:grid-cols-[32px_minmax(0,1fr)]">
            <div className="text-white font-semibold">&bull;</div>
            <div>ML learns patterns from examples, not hard-coded rules.</div>
          </div>
          <div className="grid gap-2 md:grid-cols-[32px_minmax(0,1fr)]">
            <div className="text-white font-semibold">&bull;</div>
            <div>Features are inputs; labels are outputs.</div>
          </div>
          <div className="grid gap-2 md:grid-cols-[32px_minmax(0,1fr)]">
            <div className="text-white font-semibold">&bull;</div>
            <div>A model is just a rule that makes predictions.</div>
          </div>
          <div className="grid gap-2 md:grid-cols-[32px_minmax(0,1fr)]">
            <div className="text-white font-semibold">&bull;</div>
            <div>
              <MathInline tex={String.raw`\hat{y}`} className="math-inline math-yhat" />
              {" "}is the prediction,{" "}
              <MathInline tex={String.raw`y`} className="math-inline math-y" />
              {" "}is the true answer.
            </div>
          </div>
          <div className="grid gap-2 md:grid-cols-[32px_minmax(0,1fr)]">
            <div className="text-white font-semibold">&bull;</div>
            <div>
              <MathInline tex={String.raw`\theta`} className="math-inline math-theta" />
              {" "}are the adjustable settings the model learns.
            </div>
          </div>
          <div className="grid gap-2 md:grid-cols-[32px_minmax(0,1fr)]">
            <div className="text-white font-semibold">&bull;</div>
            <div>Learning is guess &gt; measure error &gt; adjust &gt; repeat.</div>
          </div>
          <div className="grid gap-2 md:grid-cols-[32px_minmax(0,1fr)]">
            <div className="text-white font-semibold">&bull;</div>
            <div>Loss measures how wrong the model is.</div>
          </div>
          <div className="grid gap-2 md:grid-cols-[32px_minmax(0,1fr)]">
            <div className="text-white font-semibold">&bull;</div>
            <div>Supervised uses labels; unsupervised does not.</div>
          </div>
          <div className="grid gap-2 md:grid-cols-[32px_minmax(0,1fr)]">
            <div className="text-white font-semibold">&bull;</div>
            <div>More data usually improves learning.</div>
          </div>
        </div>
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
              answer: <>An input variable the model uses, like floor_area_m2 or bedrooms.</>,
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
                  is the model&apos;s prediction.
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
              answer: <>The adjustable settings inside the model, like the intercept and slopes of a line.</>,
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
        <div className="grid gap-2 text-base leading-7 text-[color:var(--color-muted)]">
          <div className="grid gap-2 md:grid-cols-[140px_minmax(0,1fr)]">
            <div className="text-white font-semibold">Feature</div>
            <div>An input the model uses.</div>
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
            <div>The model&apos;s output.</div>
          </div>
          <div className="grid gap-2 md:grid-cols-[140px_minmax(0,1fr)]">
            <div className="text-white font-semibold">Parameters</div>
            <div>The adjustable settings the model learns.</div>
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

    </ArticleLayout>
  );
}




