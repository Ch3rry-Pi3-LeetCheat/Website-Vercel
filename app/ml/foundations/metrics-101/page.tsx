
import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
import { MathBlock } from "@/components/Math";
import { mlFoundationsLessons } from "@/lib/mlTopics";

const metricsCode = `tp = 8
fp = 2
fn = 1
tn = 9

accuracy = (tp + tn) / (tp + tn + fp + fn)
precision = tp / (tp + fp)
recall = tp / (tp + fn)

print(round(accuracy, 2), round(precision, 2), round(recall, 2))`;

const metricsOutput = `0.85 0.8 0.89`;

export default function MetricsPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "introduction", label: "Introduction" },
    { id: "intuition", label: "Intuition" },
    { id: "formulas", label: "Metric formulas" },
    { id: "example", label: "Compute metrics" },
    { id: "when", label: "When to use" },
  ];

  return (
    <ArticleLayout
      eyebrow="ML - Foundations"
      title="Metrics 101"
      description="Accuracy, precision, and recall are the first tools for judging model quality."
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Within Foundations", links: mlFoundationsLessons },
          ]}
          activeHref="/ml/foundations/metrics-101"
        />
      }
    >
      <InfoPanel id="introduction" title="Introduction" variant="intro">
        <p>
          Metrics turn predictions into numbers so you can compare models
          fairly. The wrong metric can hide a bad model.
        </p>
        <p>
          Always choose the metric that matches the real cost of mistakes.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          Accuracy answers "How often are we right?" Precision answers
          "When we say yes, how often are we correct?" Recall answers
          "How many of the true positives did we catch?"
        </p>
      </InfoPanel>

      <section id="formulas" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Metric formulas
        </h2>
        <MathBlock
          tex="\\begin{aligned}\\text{Accuracy} &= \\frac{TP + TN}{TP + TN + FP + FN} \\\\ \\text{Precision} &= \\frac{TP}{TP + FP} \\\\ \\text{Recall} &= \\frac{TP}{TP + FN} \\\\ F_1 &= \\frac{2 \\cdot \\text{Precision} \\cdot \\text{Recall}}{\\text{Precision} + \\text{Recall}}\\end{aligned}"
          className="rounded-2xl bg-white/5 px-4 py-3 text-white/90"
        />
      </section>

      <section id="example" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Compute metrics
        </h2>
        <CodeBlock code={metricsCode} title="Python" />
        <OutputBlock output={metricsOutput} />
      </section>

      <section id="when" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          When to use which
        </h2>
        <ul className="grid list-disc list-inside gap-2 text-sm text-[color:var(--color-muted)]">
          <li>Accuracy for balanced classes and simple baselines.</li>
          <li>Precision when false positives are costly.</li>
          <li>Recall when false negatives are costly.</li>
          <li>F1 when you want a single number that balances both.</li>
        </ul>
      </section>
    </ArticleLayout>
  );
}
