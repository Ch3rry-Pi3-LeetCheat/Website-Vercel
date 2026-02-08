
import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
import { MathBlock } from "@/components/Math";
import { mlFoundationsLessons } from "@/lib/mlTopics";

const splitCode = `data = list(range(10))

train = data[:6]
val = data[6:8]
test = data[8:]

print(train)
print(val)
print(test)`;

const splitOutput = `[0, 1, 2, 3, 4, 5]
[6, 7]
[8, 9]`;

export default function TrainValTestPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "introduction", label: "Introduction" },
    { id: "intuition", label: "Intuition" },
    { id: "notation", label: "Notation and ratios" },
    { id: "example", label: "Simple split" },
    { id: "leakage", label: "Avoid leakage" },
  ];

  return (
    <ArticleLayout
      eyebrow="ML - Foundations"
      title="Train, validation, test splits"
      description="Split data so you can measure real performance, not just memorization."
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Within Foundations", links: mlFoundationsLessons },
          ]}
          activeHref="/ml/foundations/train-val-test-splits"
        />
      }
    >
      <InfoPanel id="introduction" title="Introduction" variant="intro">
        <p>
          The training set teaches the model. The validation set helps
          you tune decisions. The test set tells you how the model will
          behave on new data.
        </p>
        <p>
          Without a clean split, it is easy to fool yourself into
          thinking a model is better than it is.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          You do not study for an exam using the exact test answers. You
          practice, check progress, then take the final test once.
        </p>
      </InfoPanel>

      <section id="notation" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Notation and ratios
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We split the dataset into three disjoint parts. A common ratio
          is 70/15/15 or 80/10/10 depending on dataset size.
        </p>
        <MathBlock
          tex={String.raw`D = D_{train} \cup D_{val} \cup D_{test}, \quad D_{train} \cap D_{val} = \varnothing`}
          className="rounded-2xl bg-white/5 px-4 py-3 text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The validation set guides choices like learning rate or model
          size, while the test set stays untouched until the end.
        </p>
      </section>

      <section id="example" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Simple split
        </h2>
        <CodeBlock code={splitCode} title="Python" />
        <OutputBlock output={splitOutput} />
      </section>

      <section id="leakage" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Avoid leakage
        </h2>
        <ul className="grid list-disc list-inside gap-2 text-sm text-[color:var(--color-muted)]">
          <li>Do not compute statistics on the full dataset.</li>
          <li>Fit scalers and encoders on the training set only.</li>
          <li>Use stratified splits if classes are imbalanced.</li>
        </ul>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          If the test set leaks into training, your evaluation numbers
          stop meaning anything.
        </p>
      </section>
    </ArticleLayout>
  );
}
