
import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import { MathBlock } from "@/components/Math";

const saveCode = `import pickle

model = {"name": "tiny-model", "version": 1}

with open("model.pkl", "wb") as f:
    pickle.dump(model, f)

with open("model.pkl", "rb") as f:
    loaded = pickle.load(f)

print(loaded["name"], loaded["version"])`;

const saveOutput = `tiny-model 1`;

export default function MlInProductionPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "introduction", label: "Introduction" },
    { id: "intuition", label: "Intuition" },
    { id: "saving", label: "Save and load" },
    { id: "pipeline", label: "Inference pipeline" },
    { id: "drift", label: "Monitoring drift" },
    { id: "deployment", label: "Deployment patterns" },
    { id: "example", label: "Pickle example" },
  ];

  return (
    <ArticleLayout
      eyebrow="ML - Production"
      title="ML in production"
      description="Shipping models means reliable inference, monitoring, and safe updates."
      tocItems={tocItems}
    >
      <InfoPanel id="introduction" title="Introduction" variant="intro">
        <p>
          Production ML is more than training accuracy. You need stable
          inference, monitoring, and safe updates over time.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          A model in production is like a service. It must be available,
          fast, and correct under real user behavior.
        </p>
      </InfoPanel>

      <section id="saving" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Save and load
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          You need a repeatable way to save and load models so inference
          code always uses the correct version.
        </p>
      </section>

      <section id="pipeline" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Inference pipeline
        </h2>
        <ul className="grid list-disc list-inside gap-2 text-sm text-[color:var(--color-muted)]">
          <li>Validate and clean inputs.</li>
          <li>Apply the same feature transforms as training.</li>
          <li>Run the model and post-process outputs.</li>
        </ul>
      </section>

      <section id="drift" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Monitoring drift
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          If production data shifts away from training data, performance
          can degrade silently.
        </p>
        <MathBlock
          tex={String.raw`P_{train}(x) \neq P_{prod}(x)`}
          className="rounded-2xl bg-white/5 px-4 py-3 text-white/90"
        />
      </section>

      <section id="deployment" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Deployment patterns
        </h2>
        <ul className="grid list-disc list-inside gap-2 text-sm text-[color:var(--color-muted)]">
          <li>Batch scoring for large, offline jobs.</li>
          <li>Online inference for real-time predictions.</li>
          <li>Shadow deployments to test new models safely.</li>
        </ul>
      </section>

      <section id="example" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Pickle example
        </h2>
        <CodeBlock code={saveCode} title="Python" />
        <OutputBlock output={saveOutput} />
      </section>
    </ArticleLayout>
  );
}
