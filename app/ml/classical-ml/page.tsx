
import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import { MathBlock } from "@/components/Math";

const knnCode = `points = [
    (1.0, 1.0, "A"),
    (2.0, 2.0, "A"),
    (4.0, 4.0, "B"),
]
query = (1.5, 1.5)

def dist(p, q):
    return ((p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2) ** 0.5

nearest = min(points, key=lambda p: dist(p, query))
print(nearest[2])`;

const knnOutput = `A`;

export default function ClassicalMlPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "introduction", label: "Introduction" },
    { id: "intuition", label: "Intuition" },
    { id: "linear", label: "Linear regression" },
    { id: "logistic", label: "Logistic regression" },
    { id: "knn", label: "k-NN" },
    { id: "trees", label: "Trees and ensembles" },
    { id: "example", label: "Tiny k-NN example" },
  ];

  return (
    <ArticleLayout
      eyebrow="ML - Classical"
      title="Classical machine learning"
      description="The most important classical models and the mental models behind them."
      tocItems={tocItems}
    >
      <InfoPanel id="introduction" title="Introduction" variant="intro">
        <p>
          Classical ML covers the models you should understand before
          deep learning. They are fast, interpretable, and still used in
          production everywhere.
        </p>
        <p>
          The goal is to build intuition for how each model makes a
          decision and where it tends to break down.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          Think of classical ML as smart rules learned from data. The
          rules are often simple enough to explain, debug, and trust.
        </p>
      </InfoPanel>

      <section id="linear" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Linear regression
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Linear regression fits a straight line (or plane) to predict a
          numeric value.
        </p>
        <MathBlock
          tex="\\hat{y} = w^T x + b"
          className="rounded-2xl bg-white/5 px-4 py-3 text-white/90"
        />
      </section>

      <section id="logistic" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Logistic regression
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Logistic regression predicts probabilities for binary classes.
        </p>
        <MathBlock
          tex="p = \\sigma(w^T x + b) = \\frac{1}{1 + e^{-z}}"
          className="rounded-2xl bg-white/5 px-4 py-3 text-white/90"
        />
      </section>

      <section id="knn" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          k-Nearest neighbors (k-NN)
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          k-NN stores the training data and predicts based on the closest
          neighbors in feature space.
        </p>
        <MathBlock
          tex="d(x, x_i) = \\sqrt{\\sum_{j=1}^{d} (x_j - x_{ij})^2}"
          className="rounded-2xl bg-white/5 px-4 py-3 text-white/90"
        />
      </section>

      <section id="trees" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Trees and ensembles
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Decision trees split data into regions. Random forests and
          gradient boosting combine many trees to improve accuracy.
        </p>
        <MathBlock
          tex="H = -\\sum_{i=1}^{k} p_i \\log p_i"
          className="rounded-2xl bg-white/5 px-4 py-3 text-white/90"
        />
      </section>

      <section id="example" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Tiny k-NN example
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We pick the nearest point and return its label. This is the
          simplest version of k-NN.
        </p>
        <CodeBlock code={knnCode} title="Python" />
        <OutputBlock output={knnOutput} />
      </section>
    </ArticleLayout>
  );
}
