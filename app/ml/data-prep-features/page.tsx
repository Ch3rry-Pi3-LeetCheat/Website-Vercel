
import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import { MathBlock } from "@/components/Math";

const scaleCode = `values = [10, 12, 15]
mean = sum(values) / len(values)
std = (sum((x - mean) ** 2 for x in values) / len(values)) ** 0.5

z = [(x - mean) / std for x in values]
print([round(v, 2) for v in z])`;

const scaleOutput = `[-1.14, -0.16, 1.3]`;

export default function DataPrepFeaturesPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "introduction", label: "Introduction" },
    { id: "intuition", label: "Intuition" },
    { id: "missing", label: "Missing values" },
    { id: "scaling", label: "Scaling" },
    { id: "encoding", label: "Encoding categoricals" },
    { id: "selection", label: "Feature selection" },
    { id: "example", label: "Z-score example" },
  ];

  return (
    <ArticleLayout
      eyebrow="ML - Data Prep and Features"
      title="Data prep and features"
      description="Most ML mistakes happen before training. Clean data and good features matter more than model choice."
      tocItems={tocItems}
    >
      <InfoPanel id="introduction" title="Introduction" variant="intro">
        <p>
          Data prep is the hidden engine of ML. If your inputs are noisy
          or inconsistent, even the best model will struggle.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          Models learn patterns from inputs. If the inputs are messy, the
          patterns look messy too.
        </p>
      </InfoPanel>

      <section id="missing" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Missing values
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Common strategies are mean imputation for numeric features or
          a special "unknown" category for categorical features.
        </p>
      </section>

      <section id="scaling" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Scaling
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Scaling helps features live on similar ranges. Two common
          transforms are z-score and min-max scaling.
        </p>
        <MathBlock
          tex={String.raw`z = \frac{x - \mu}{\sigma}`}
          className="rounded-2xl bg-white/5 px-4 py-3 text-white/90"
        />
        <MathBlock
          tex={String.raw`x' = \frac{x - x_{min}}{x_{max} - x_{min}}`}
          className="rounded-2xl bg-white/5 px-4 py-3 text-white/90"
        />
      </section>

      <section id="encoding" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Encoding categoricals
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          One-hot encoding turns categories into binary columns so models
          can use them as numeric features.
        </p>
      </section>

      <section id="selection" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Feature selection
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Remove features that are noisy, redundant, or unrelated to the
          target. Simpler inputs often generalize better.
        </p>
      </section>

      <section id="example" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Z-score example
        </h2>
        <CodeBlock code={scaleCode} title="Python" />
        <OutputBlock output={scaleOutput} />
      </section>
    </ArticleLayout>
  );
}
