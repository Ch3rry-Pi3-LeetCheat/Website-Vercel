import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
import { mlFoundationsLessons } from "@/lib/mlTopics";

const dataCode = `X = [
    [1.0, 0.2],
    [0.5, 0.9],
    [0.2, 0.1],
]
y = [1, 0, 0]

print(X[0], y[0])`;

const dataOutput = `[1.0, 0.2] 1`;

export default function DataTypesFeaturesLabelsPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "introduction", label: "Introduction" },
    { id: "intuition", label: "Intuition" },
    { id: "example", label: "Tiny dataset" },
  ];

  return (
    <ArticleLayout
      eyebrow="ML - Foundations"
      title="Data types, features, labels"
      description="Understand what the model sees (features) and what it should predict (labels)."
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Within Foundations", links: mlFoundationsLessons },
          ]}
          activeHref="/ml/foundations/data-types-features-labels"
        />
      }
    >
      <InfoPanel id="introduction" title="Introduction" variant="intro">
        <p>
          Features are the inputs, labels are the outputs. ML is about
          learning the relationship between them.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          Think of features as clues and labels as the correct answer.
          The model is trying to guess the answer from the clues.
        </p>
      </InfoPanel>

      <section id="example" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Tiny dataset
        </h2>
        <CodeBlock code={dataCode} title="Python" />
        <OutputBlock output={dataOutput} />
      </section>
    </ArticleLayout>
  );
}
