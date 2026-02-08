import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
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
    { id: "loop", label: "Learning loop" },
    { id: "types", label: "Supervised vs unsupervised" },
    { id: "example", label: "Tiny example" },
    { id: "takeaways", label: "Key takeaways" },
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
      </InfoPanel>

      <section id="definition" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Core definition
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          A model learns a function that maps input{" "}
          <span className="font-mono inline-code">features</span> to an
          output <span className="font-mono inline-code">label</span>.
          The model improves by minimizing error on training data.
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

      <section id="takeaways" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Key takeaways
        </h2>
        <ul className="grid list-disc list-inside gap-2 text-sm text-[color:var(--color-muted)]">
          <li>ML learns patterns from data instead of fixed rules.</li>
          <li>Features in, labels out, loss guides improvement.</li>
          <li>Even tiny examples show the core workflow.</li>
        </ul>
      </section>
    </ArticleLayout>
  );
}
