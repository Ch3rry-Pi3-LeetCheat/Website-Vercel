
import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
import { MathBlock, MathInline } from "@/components/Math";
import { mlFoundationsLessons } from "@/lib/mlTopics";

const tinyExampleCode = `import pandas as pd
from sklearn.linear_model import LinearRegression

data = pd.DataFrame({
    "floor_area_m2": [52, 68, 75, 90, 110, 130, 145, 160],
    "bedrooms": [1, 2, 2, 3, 3, 4, 4, 5],
    "distance_to_centre_km": [4.5, 3.2, 6.0, 5.5, 2.8, 7.5, 3.0, 8.0],
    "price_gbp": [210000, 265000, 255000, 310000, 365000, 390000, 460000, 455000],
})

X = data[["floor_area_m2", "bedrooms", "distance_to_centre_km"]]
y = data["price_gbp"]

model = LinearRegression()
model.fit(X, y)

prediction = model.predict([[100, 3, 4.0]])[0]
print(round(prediction, 0))`;

const tinyExampleOutput = `330000.0`;

export default function WhatIsMlPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "mental-model", label: "A concrete mental model" },
    { id: "examples", label: "Real-world examples" },
    { id: "dataset", label: "A tiny dataset" },
    { id: "model-plain", label: "What is a model?" },
    { id: "notation", label: "Now, let’s introduce some notation" },
    { id: "function-intro", label: "Understanding ŷ = f(x; θ)" },
    { id: "training", label: "Training and loss" },
    { id: "loop", label: "Learning loop (step-by-step)" },
    { id: "types", label: "Supervised vs unsupervised" },
    { id: "example", label: "Python example" },
    { id: "confusions", label: "Common confusions" },
    { id: "remember", label: "What you should remember" },
    { id: "checkpoint", label: "Mini-checkpoint" },
    { id: "glossary", label: "Glossary" },
    { id: "next", label: "Where this goes next" },
  ];

  return (
    <ArticleLayout
      eyebrow="ML - Foundations"
      title="What is ML?"
      description="A simple definition, the mental model, and a tiny example you can run immediately."
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Within Foundations", links: mlFoundationsLessons },
          ]}
          activeHref="/ml/foundations/what-is-ml"
        />
      }
    >
      <InfoPanel id="mental-model" title="A concrete mental model" variant="intro">
        <p>
          Machine learning (ML) is a way of teaching a computer by
          showing it examples. Instead of writing every rule yourself,
          you show inputs and the correct outputs, then let the computer
          discover the pattern.
        </p>
        <p>
          Think of it like tutoring. A student does not memorise every
          question. They learn a rule that helps with new questions.
        </p>
      </InfoPanel>

      <InfoPanel id="examples" title="Real-world examples" variant="intuition">
        <p>
          Let&apos;s make “learning patterns from data” feel concrete. In
          each example, the inputs are the clues and the output is the
          answer the model should predict.
        </p>
        <ul className="grid list-disc list-inside gap-2 text-sm text-[color:var(--color-muted)]">
          <li>
            <span className="text-white">House prices:</span> inputs are
            floor area, bedrooms, and distance to the centre. Output is
            price. A good prediction is close enough to guide buyers and
            sellers.
          </li>
          <li>
            <span className="text-white">Spam detection:</span> inputs are
            words, links, and sender info. Output is spam or not spam. A
            good prediction catches spam without blocking real emails.
          </li>
          <li>
            <span className="text-white">Fraud detection:</span> inputs are
            amount, time, location, and device. Output is fraud or not
            fraud. A good prediction flags risky transactions quickly
            without too many false alarms.
          </li>
        </ul>
      </InfoPanel>

      <section id="dataset" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          A tiny dataset (look at the data first)
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Each row is one house. The first three columns are the inputs
          (features). The last column is the output (label) we want to
          predict.
        </p>
        <div className="glass-panel rounded-2xl p-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm text-[color:var(--color-muted)]">
              <thead>
                <tr className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-accent-2)]">
                  <th className="py-2">floor_area_m2</th>
                  <th className="py-2">bedrooms</th>
                  <th className="py-2">distance_to_centre_km</th>
                  <th className="py-2">price_gbp</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr>
                  <td className="py-2">52</td>
                  <td className="py-2">1</td>
                  <td className="py-2">4.5</td>
                  <td className="py-2">210000</td>
                </tr>
                <tr>
                  <td className="py-2">68</td>
                  <td className="py-2">2</td>
                  <td className="py-2">3.2</td>
                  <td className="py-2">265000</td>
                </tr>
                <tr>
                  <td className="py-2">75</td>
                  <td className="py-2">2</td>
                  <td className="py-2">6.0</td>
                  <td className="py-2">255000</td>
                </tr>
                <tr>
                  <td className="py-2">90</td>
                  <td className="py-2">3</td>
                  <td className="py-2">5.5</td>
                  <td className="py-2">310000</td>
                </tr>
                <tr>
                  <td className="py-2">110</td>
                  <td className="py-2">3</td>
                  <td className="py-2">2.8</td>
                  <td className="py-2">365000</td>
                </tr>
                <tr>
                  <td className="py-2">130</td>
                  <td className="py-2">4</td>
                  <td className="py-2">7.5</td>
                  <td className="py-2">390000</td>
                </tr>
                <tr>
                  <td className="py-2">145</td>
                  <td className="py-2">4</td>
                  <td className="py-2">3.0</td>
                  <td className="py-2">460000</td>
                </tr>
                <tr>
                  <td className="py-2">160</td>
                  <td className="py-2">5</td>
                  <td className="py-2">8.0</td>
                  <td className="py-2">455000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          More rows help because the model sees more situations. That
          makes it easier to learn a pattern that works on new houses,
          not just the ones in the table.
        </p>
      </section>

      <section id="model-plain" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          What is a model?
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          A model is simply a rule that turns inputs into a prediction.
          For houses, the rule might be: “bigger area usually means higher
          price”.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The rule can be simple or complex, but its job is always the
          same: take features and produce a predicted price.
        </p>
      </section>

      <section id="notation" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Now, let&apos;s introduce some notation
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We use a few symbols to describe the same idea in a compact way.
          Each symbol maps directly to the dataset above.
        </p>
        <ul className="grid list-disc list-inside gap-2 text-sm text-[color:var(--color-muted)]">
          <li>
            <MathInline tex={String.raw`x`} className="math-inline" />
            {" "}is the input features. Example:{" "}
            <span className="text-white">[floor_area_m2, bedrooms, distance_to_centre_km]</span>.
          </li>
          <li>
            <MathInline tex={String.raw`y`} className="math-inline" />
            {" "}is the true answer. Example:{" "}
            <span className="text-white">price_gbp</span>.
          </li>
          <li>
            <MathInline tex={String.raw`\hat{y}`} className="math-inline" />
            {" "}(&quot;y-hat&quot;) is the model&apos;s prediction of{" "}
            <MathInline tex={String.raw`y`} className="math-inline" />.
          </li>
          <li>
            <MathInline tex={String.raw`\theta`} className="math-inline" />
            {" "}are the adjustable settings inside the model.
          </li>
        </ul>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          When we put it all together, we often write:
        </p>
        <MathBlock
          tex={String.raw`\hat{y} = f(x; \theta)`}
          className="math-center text-white/90"
        />
      </section>

      <section id="function-intro" className="scroll-mt-28 grid gap-6">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Understanding{" "}
          <MathInline tex={String.raw`\hat{y} = f(x; \theta)`} className="math-inline" />
        </h2>

        <div className="grid gap-3">
          <h3 className="text-lg font-semibold text-white">Layer 1: Plain English</h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            <MathInline tex={String.raw`f`} className="math-inline" />
            {" "}is the rule the computer is using.{" "}
            <MathInline tex={String.raw`x`} className="math-inline" />
            {" "}is the information we feed into that rule.{" "}
            <MathInline tex={String.raw`\theta`} className="math-inline" />
            {" "}are the knobs that control how the rule behaves. The output{" "}
            <MathInline tex={String.raw`\hat{y}`} className="math-inline" />
            {" "}is the prediction we get back.
          </p>
        </div>

        <div className="grid gap-3">
          <h3 className="text-lg font-semibold text-white">Layer 2: Visual intuition</h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Imagine plotting points on a graph: floor area on the x‑axis and
            price on the y‑axis. A very simple model draws a straight line
            through those points. That line <span className="text-white">is</span>{" "}
            the function{" "}
            <MathInline tex={String.raw`f`} className="math-inline" />.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            The settings{" "}
            <MathInline tex={String.raw`\theta`} className="math-inline" />
            {" "}control the slope and position of the line. Changing{" "}
            <MathInline tex={String.raw`\theta`} className="math-inline" />
            {" "}rotates or shifts the line. Learning means adjusting the
            line so it fits the dots better.
          </p>
        </div>

        <div className="grid gap-3">
          <h3 className="text-lg font-semibold text-white">Layer 3: Concrete numbers</h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Use one feature: floor area. A simple rule is:
          </p>
          <MathBlock
            tex={String.raw`price = \theta_0 + \theta_1 \times floor\_area`}
            className="math-center text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Here{" "}
            <MathInline tex={String.raw`\theta_0`} className="math-inline" />
            {" "}is a baseline price, and{" "}
            <MathInline tex={String.raw`\theta_1`} className="math-inline" />
            {" "}is how much price rises per extra square metre.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Take the row with floor area 68. If{" "}
            <MathInline tex={String.raw`\theta_0 = 50000`} className="math-inline" />
            {" "}and{" "}
            <MathInline tex={String.raw`\theta_1 = 2000`} className="math-inline" />
            {", "}then:
          </p>
          <MathBlock
            tex={String.raw`\begin{aligned}
              price &= 50{,}000 + 2{,}000 \times 68 \\
              &= 50{,}000 + 136{,}000 \\
              &= 186{,}000
            \end{aligned}`}
            className="math-center text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            The true price for that row is 265,000, so the model is too
            low. Training changes{" "}
            <MathInline tex={String.raw`\theta`} className="math-inline" />
            {" "}to bring predictions closer.
          </p>
        </div>
      </section>

      <section id="training" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Training and loss (intuition first)
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Training means adjusting the model&apos;s settings to make
          predictions less wrong. We need a numeric score of wrongness.
          That score is called <span className="text-white">loss</span>.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Suppose a house really costs 265,000 but the model predicts
          240,000. The error is 25,000. If we square it, we get
          625,000,000. Squaring keeps errors positive and makes big
          mistakes count more.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Mean squared error (MSE) averages those squared mistakes:
        </p>
        <MathBlock
          tex={String.raw`MSE = \frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2`}
          className="math-center text-white/90"
        />
      </section>

      <section id="loop" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Learning loop (step-by-step)
        </h2>
        <ol className="grid list-decimal list-inside gap-2 text-sm text-[color:var(--color-muted)]">
          <li>Start with a guess for the model&apos;s settings.</li>
          <li>Use the model to predict prices for all rows.</li>
          <li>Measure how wrong the predictions are (loss).</li>
          <li>Adjust the settings to reduce the loss.</li>
          <li>Repeat until the loss stops improving.</li>
        </ol>
      </section>

      <section id="types" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Supervised vs unsupervised (concrete)
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          In supervised learning, we have labels (the answers). In
          unsupervised learning, we do not.
        </p>
        <ul className="grid list-disc list-inside gap-2 text-sm text-[color:var(--color-muted)]">
          <li>
            <span className="text-white">Supervised:</span> predict price
            from features. This is regression because the output is a number.
          </li>
          <li>
            <span className="text-white">Unsupervised:</span> group houses
            by similarity (size, bedrooms, distance). “Similarity” means
            the feature values are close together.
          </li>
        </ul>
      </section>

      <section id="example" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Python example (matches the dataset)
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The code below uses the same table.{" "}
          <span className="text-white">fit()</span> finds the best settings,
          and <span className="text-white">predict()</span> returns a price
          for a new house.
        </p>
        <CodeBlock code={tinyExampleCode} title="Python" />
        <OutputBlock output={tinyExampleOutput} />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The output is the predicted price for a 100 m², 3‑bedroom house
          4 km from the centre.
        </p>
      </section>

      <section id="confusions" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Common confusions
        </h2>
        <ul className="grid gap-3 text-sm text-[color:var(--color-muted)]">
          <li>
            <span className="text-white">Is the model memorising the data?</span>{" "}
            It can, but the goal is to learn a pattern that works on new
            examples, not just the training rows.
          </li>
          <li>
            <span className="text-white">How is this different from normal programming?</span>{" "}
            In normal programming you write the rules. In ML, the model
            learns the rules from examples.
          </li>
          <li>
            <span className="text-white">What does “generalise” mean?</span>{" "}
            It means the model works well on new, unseen data.
          </li>
          <li>
            <span className="text-white">Why can models be wrong after training?</span>{" "}
            Real data is messy, and the model may be too simple or trained
            on limited examples.
          </li>
          <li>
            <span className="text-white">Training vs test data?</span>{" "}
            Training data teaches the model. Test data checks how well the
            model performs on new examples.
          </li>
        </ul>
      </section>

      <section id="remember" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          What you should remember
        </h2>
        <ul className="grid list-disc list-inside gap-2 text-sm text-[color:var(--color-muted)]">
          <li>ML learns patterns from examples, not hard-coded rules.</li>
          <li>Features are inputs; labels are outputs.</li>
          <li>A model is just a rule that makes predictions.</li>
          <li>
            <MathInline tex={String.raw`\hat{y}`} className="math-inline" />
            {" "}is the prediction,{" "}
            <MathInline tex={String.raw`y`} className="math-inline" />
            {" "}is the true answer.
          </li>
          <li>
            <MathInline tex={String.raw`\theta`} className="math-inline" />
            {" "}are the adjustable settings the model learns.
          </li>
          <li>Learning is guess → measure error → adjust → repeat.</li>
          <li>Loss measures how wrong the model is.</li>
          <li>Supervised uses labels; unsupervised does not.</li>
          <li>More data usually improves learning.</li>
        </ul>
      </section>

      <section id="checkpoint" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Mini-checkpoint
        </h2>
        <div className="grid gap-3 text-sm text-[color:var(--color-muted)]">
          <p>
            <span className="text-white">Q1:</span> What is a feature?
            <br />
            <span className="text-white">A:</span> An input variable the model uses.
          </p>
          <p>
            <span className="text-white">Q2:</span> What is the difference between{" "}
            <MathInline tex={String.raw`y`} className="math-inline" />
            {" "}and{" "}
            <MathInline tex={String.raw`\hat{y}`} className="math-inline" />?
            <br />
            <span className="text-white">A:</span>{" "}
            <MathInline tex={String.raw`y`} className="math-inline" />
            {" "}is the true answer;{" "}
            <MathInline tex={String.raw`\hat{y}`} className="math-inline" />
            {" "}is the model&apos;s prediction.
          </p>
          <p>
            <span className="text-white">Q3:</span> What does{" "}
            <MathInline tex={String.raw`\theta`} className="math-inline" />
            {" "}represent?
            <br />
            <span className="text-white">A:</span> The adjustable settings inside the model.
          </p>
          <p>
            <span className="text-white">Q4:</span> Why do we square errors?
            <br />
            <span className="text-white">A:</span> To make all errors positive and
            penalise big mistakes more.
          </p>
          <p>
            <span className="text-white">Q5:</span> What is supervised learning?
            <br />
            <span className="text-white">A:</span> Learning from examples where the
            correct answers are known.
          </p>
        </div>
      </section>

      <section id="glossary" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Glossary
        </h2>
        <ul className="grid gap-2 text-sm text-[color:var(--color-muted)]">
          <li><span className="text-white">Feature:</span> An input the model uses.</li>
          <li><span className="text-white">Label:</span> The true output we want to predict.</li>
          <li><span className="text-white">Model:</span> The rule that maps inputs to predictions.</li>
          <li><span className="text-white">Prediction:</span> The model&apos;s output.</li>
          <li><span className="text-white">Parameters:</span> The adjustable settings the model learns.</li>
          <li><span className="text-white">Loss:</span> A number measuring how wrong predictions are.</li>
          <li><span className="text-white">Training:</span> Adjusting parameters to reduce loss.</li>
          <li><span className="text-white">Generalise:</span> Perform well on unseen data.</li>
        </ul>
      </section>

      <section id="next" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Where this goes next
        </h2>
        <ul className="grid list-disc list-inside gap-2 text-sm text-[color:var(--color-muted)]">
          <li>Regression vs classification in more detail.</li>
          <li>Evaluation and train/test splits.</li>
          <li>Overfitting and how to spot it.</li>
          <li>Gradient descent (later).</li>
        </ul>
      </section>
    </ArticleLayout>
  );
}
