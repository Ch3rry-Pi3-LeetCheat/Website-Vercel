import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
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
    { id: "example", label: "Simple split" },
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
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          You do not study for an exam using the exact test answers. You
          practice, check progress, then take the final test once.
        </p>
      </InfoPanel>

      <section id="example" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Simple split
        </h2>
        <CodeBlock code={splitCode} title="Python" />
        <OutputBlock output={splitOutput} />
      </section>
    </ArticleLayout>
  );
}
