
import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import { MathBlock } from "@/components/Math";

const neuronCode = `import math

def sigmoid(z):
    return 1 / (1 + math.exp(-z))

x = [1.0, 2.0]
w = [0.4, -0.2]
b = 0.1

z = w[0] * x[0] + w[1] * x[1] + b
a = sigmoid(z)

print(round(a, 3))`;

const neuronOutput = `0.426`;

export default function DeepLearningBasicsPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "introduction", label: "Introduction" },
    { id: "intuition", label: "Intuition" },
    { id: "neuron", label: "Neuron equation" },
    { id: "activations", label: "Activation functions" },
    { id: "training", label: "Training update" },
    { id: "example", label: "Single neuron example" },
  ];

  return (
    <ArticleLayout
      eyebrow="ML - Deep Learning Basics"
      title="Deep learning basics"
      description="Neural networks are stacks of simple units. The math is simple, but the depth creates power."
      tocItems={tocItems}
    >
      <InfoPanel id="introduction" title="Introduction" variant="intro">
        <p>
          Deep learning builds complex functions by stacking simple
          building blocks called neurons.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          Each neuron is a tiny model. Many tiny models stacked together
          can learn rich patterns.
        </p>
      </InfoPanel>

      <section id="neuron" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Neuron equation
        </h2>
        <MathBlock
          tex={String.raw`a = \sigma(w^T x + b)`}
          className="rounded-2xl bg-white/5 px-4 py-3 text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          A neuron computes a weighted sum of inputs and passes it
          through an activation function.
        </p>
      </section>

      <section id="activations" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Activation functions
        </h2>
        <MathBlock
          tex={String.raw`\sigma(z) = \frac{1}{1 + e^{-z}}, \quad \text{ReLU}(z) = \max(0, z)`}
          className="rounded-2xl bg-white/5 px-4 py-3 text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Activations introduce non-linearity. Without them, a network
          collapses into a linear model.
        </p>
      </section>

      <section id="training" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Training update
        </h2>
        <MathBlock
          tex={String.raw`w \leftarrow w - \eta \nabla_w L`}
          className="rounded-2xl bg-white/5 px-4 py-3 text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Gradient descent nudges weights in the direction that reduces
          loss.
        </p>
      </section>

      <section id="example" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Single neuron example
        </h2>
        <CodeBlock code={neuronCode} title="Python" />
        <OutputBlock output={neuronOutput} />
      </section>
    </ArticleLayout>
  );
}
