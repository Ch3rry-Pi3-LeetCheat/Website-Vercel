
import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import { MathBlock } from "@/components/Math";

const cvCode = `scores = [0.78, 0.81, 0.80, 0.79, 0.82]
avg = sum(scores) / len(scores)
print(round(avg, 3))`;

const cvOutput = `0.8`;

export default function EvaluationTuningPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "introduction", label: "Introduction" },
    { id: "intuition", label: "Intuition" },
    { id: "confusion", label: "Confusion matrix" },
    { id: "cv", label: "Cross-validation" },
    { id: "tuning", label: "Hyperparameter tuning" },
    { id: "example", label: "Compute CV mean" },
  ];

  return (
    <ArticleLayout
      eyebrow="ML - Evaluation and Tuning"
      title="Evaluation and tuning"
      description="Measure models honestly, then improve them without leaking test data."
      tocItems={tocItems}
    >
      <InfoPanel id="introduction" title="Introduction" variant="intro">
        <p>
          Evaluation is how you know if a model works. Tuning is how you
          make it better without cheating.
        </p>
        <p>
          This section focuses on trustworthy measurement and clean
          experimentation.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          You only get one final exam. Everything else is practice. The
          test set is the final exam.
        </p>
      </InfoPanel>

      <section id="confusion" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Confusion matrix
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The confusion matrix counts true positives, false positives,
          true negatives, and false negatives. Most metrics are derived
          from these four numbers.
        </p>
      </section>

      <section id="cv" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Cross-validation
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          k-fold CV trains on k-1 folds and validates on the remaining
          fold. You repeat this k times and average the scores.
        </p>
        <MathBlock
          tex="\\bar{s} = \\frac{1}{k} \\sum_{i=1}^{k} s_i"
          className="rounded-2xl bg-white/5 px-4 py-3 text-white/90"
        />
      </section>

      <section id="tuning" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Hyperparameter tuning
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Hyperparameters control model behavior (depth, regularization,
          learning rate). Tune them on the validation set, never on the
          test set.
        </p>
      </section>

      <section id="example" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Compute CV mean
        </h2>
        <CodeBlock code={cvCode} title="Python" />
        <OutputBlock output={cvOutput} />
      </section>
    </ArticleLayout>
  );
}
