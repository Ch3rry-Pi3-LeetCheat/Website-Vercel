export default function DeepLearningBasicsPage() {
  const topics = [
    "Neural net intuition",
    "Activation functions",
    "Forward and backward pass",
    "Training loop basics",
  ];

  return (
    <div className="px-6 pb-20 pt-12">
      <div className="mx-auto w-full max-w-4xl">
        <header className="grid gap-4">
          <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--color-accent-2)]">
            ML - Deep Learning Basics
          </p>
          <h1 className="text-4xl font-semibold text-white font-[var(--font-display)]">
            Deep learning basics
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-[color:var(--color-muted)]">
            This ladder is coming next. It will introduce neural networks
            with simple, visual explanations.
          </p>
        </header>

        <div className="mt-8 glass-panel rounded-2xl px-6 py-6">
          <p className="text-sm font-semibold text-white">Planned lessons</p>
          <ul className="mt-3 grid list-disc list-inside gap-2 text-sm text-[color:var(--color-muted)]">
            {topics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
