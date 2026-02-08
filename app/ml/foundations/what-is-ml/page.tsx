
import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
import { MathBlock, MathInline } from "@/components/Math";
import { mlFoundationsLessons } from "@/lib/mlTopics";

const tinyExampleCode = `import numpy as np
from sklearn.linear_model import LinearRegression

X = np.array([[1], [2], [3]])
y = np.array([2, 4, 6])

model = LinearRegression()
model.fit(X, y)

pred = model.predict([[4]])[0]
print(round(pred, 2))`;

const tinyExampleOutput = `8.0`;

export default function WhatIsMlPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "introduction", label: "Introduction" },
    { id: "intuition", label: "Intuition" },
    { id: "definition", label: "Core definition" },
    { id: "loss", label: "Loss and learning" },
    { id: "loop", label: "Learning loop" },
    { id: "types", label: "Supervised vs unsupervised" },
    { id: "example", label: "Tiny example" },
    { id: "pitfalls", label: "Common pitfalls" },
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
      <InfoPanel id="introduction" title="Introduction" variant="intro">
        <p>
          Machine learning (ML) is about teaching a computer to learn
          patterns from data instead of hard-coding every rule.
        </p>
        <p>
          If you can describe the goal with examples, ML can often learn
          the behavior for you.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          Think of ML as a student. You show it many examples and give
          feedback. Over time it gets better at predicting the right
          answer for new inputs.
        </p>
        <p>
          The model is not memorizing exact answers. It is learning a
          rule that generalizes beyond the training data.
        </p>
      </InfoPanel>

      <section id="definition" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Core definition
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          A model learns a function that maps input{" "}
          <MathInline tex={String.raw`x`} className="math-inline" /> to an
          output <MathInline tex={String.raw`\hat{y}`} className="math-inline" />.
          We typically write this as{" "}
          <MathInline tex={String.raw`\hat{y} = f(x; \theta)`} className="math-inline" />
          where <MathInline tex={String.raw`\theta`} className="math-inline" />
          are the parameters the model learns.
        </p>
        <MathBlock
          tex={String.raw`\hat{y} = f(x; \theta)`}
          className="rounded-2xl bg-white/5 px-4 py-3 text-white/90"
        />
      </section>

      <section id="loss" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Loss and learning
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Learning means adjusting <MathInline tex={String.raw`\theta`} className="math-inline" />
          to reduce error. A common loss for regression is mean squared error:
        </p>
        <MathBlock
          tex={String.raw`L(\theta) = \frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2`}
          className="rounded-2xl bg-white/5 px-4 py-3 text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Training is just the process of finding parameters that make this
          loss as small as possible.
        </p>
      </section>

      <section id="loop" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          The learning loop
        </h2>
        <ul className="grid list-disc list-inside gap-2 text-sm text-[color:var(--color-muted)]">
          <li>Provide input data and expected outputs.</li>
          <li>The model makes a prediction.</li>
          <li>A loss function measures how wrong it was.</li>
          <li>Training updates the model to reduce that loss.</li>
        </ul>
      </section>

      <section id="types" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Supervised vs unsupervised
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          In supervised learning, you have labels. In unsupervised
          learning, you do not; the model looks for structure on its own.
        </p>
        <ul className="grid list-disc list-inside gap-2 text-sm text-[color:var(--color-muted)]">
          <li>Supervised: spam detection, price prediction.</li>
          <li>Unsupervised: clustering customers, grouping topics.</li>
        </ul>
      </section>

      <section id="example" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Tiny example: learn a line
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We fit a line that maps 1, 2, 3 to 2, 4, 6. The model should
          predict 8 when the input is 4.
        </p>
        <CodeBlock code={tinyExampleCode} title="Python" />
        <OutputBlock output={tinyExampleOutput} />
      </section>

      <section id="pitfalls" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Common pitfalls
        </h2>
        <ul className="grid list-disc list-inside gap-2 text-sm text-[color:var(--color-muted)]">
          <li>Too little data leads to unstable models.</li>
          <li>Data leakage makes the model look better than it is.</li>
          <li>Picking the wrong metric hides real mistakes.</li>
        </ul>
      </section>
    </ArticleLayout>
  );
}
