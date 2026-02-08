
import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
import { MathBlock, MathInline } from "@/components/Math";
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
    { id: "types", label: "Common data types" },
    { id: "notation", label: "Feature notation" },
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
        <p>
          Good features make learning easier. Bad features force the
          model to guess.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          Think of features as clues and labels as the correct answer.
          The model is trying to guess the answer from the clues.
        </p>
      </InfoPanel>

      <section id="types" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Common data types
        </h2>
        <ul className="grid list-disc list-inside gap-2 text-sm text-[color:var(--color-muted)]">
          <li>Numeric: prices, sizes, counts.</li>
          <li>Categorical: country, device type, product category.</li>
          <li>Text: reviews, emails, search queries.</li>
          <li>Images: pixels, shapes, textures.</li>
        </ul>
      </section>

      <section id="notation" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Feature notation
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We often store features in a matrix{" "}
          <MathInline tex={String.raw`X`} className="math-inline" /> with
          shape <MathInline tex={String.raw`n \times d`} className="math-inline" />.
          Each row is one example and each column is a feature.
        </p>
        <MathBlock
          tex={String.raw`X \in \mathbb{R}^{n \times d}, \quad y \in \mathbb{R}^{n}`}
          className="rounded-2xl bg-white/5 px-4 py-3 text-white/90"
        />
      </section>

      <section id="example" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Tiny dataset
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Here, each row has two features and each label is a 0 or 1.
        </p>
        <CodeBlock code={dataCode} title="Python" />
        <OutputBlock output={dataOutput} />
      </section>
    </ArticleLayout>
  );
}
