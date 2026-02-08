import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
import { mlFoundationsLessons } from "@/lib/mlTopics";

const scoreCode = `train_accuracy = 1.00
test_accuracy = 0.60

print(train_accuracy, test_accuracy)`;

const scoreOutput = `1.0 0.6`;

export default function OverfittingPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "introduction", label: "Introduction" },
    { id: "intuition", label: "Intuition" },
    { id: "example", label: "Small example" },
    { id: "signals", label: "Warning signs" },
  ];

  return (
    <ArticleLayout
      eyebrow="ML - Foundations"
      title="Overfitting vs generalization"
      description="Perfect training scores can still mean a weak model."
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Within Foundations", links: mlFoundationsLessons },
          ]}
          activeHref="/ml/foundations/overfitting-vs-generalization"
        />
      }
    >
      <InfoPanel id="introduction" title="Introduction" variant="intro">
        <p>
          Overfitting happens when the model memorizes the training data
          but fails on new inputs. Generalization is the real goal.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          If you memorize exam answers without understanding, you will
          struggle on a new exam. That is overfitting.
        </p>
      </InfoPanel>

      <section id="example" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Small example
        </h2>
        <CodeBlock code={scoreCode} title="Python" />
        <OutputBlock output={scoreOutput} />
      </section>

      <section id="signals" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Warning signs
        </h2>
        <ul className="grid list-disc list-inside gap-2 text-sm text-[color:var(--color-muted)]">
          <li>Training score keeps rising while validation score drops.</li>
          <li>Model is overly complex for a small dataset.</li>
          <li>Predictions look great on training but fail on new data.</li>
        </ul>
      </section>
    </ArticleLayout>
  );
}
