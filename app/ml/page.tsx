import Link from "next/link";

const tracks = [
  {
    title: "Foundations",
    description: "Start from first principles: data, splits, bias, and basic metrics.",
    href: "/ml/foundations",
  },
  {
    title: "Classical ML",
    description: "Linear models, trees, and ensemble intuition.",
    href: "/ml/classical-ml",
  },
  {
    title: "Evaluation and Tuning",
    description: "Cross-validation, confusion matrices, and hyperparameters.",
    href: "/ml/evaluation-tuning",
  },
  {
    title: "Data Prep and Features",
    description: "Cleaning, scaling, encoding, and feature selection.",
    href: "/ml/data-prep-features",
  },
  {
    title: "Deep Learning Basics",
    description: "Neural network intuition and a simple training loop.",
    href: "/ml/deep-learning-basics",
  },
  {
    title: "ML in Production",
    description: "Saving models, deploying inference, and monitoring drift.",
    href: "/ml/ml-in-production",
  },
];

export default function MlRootPage() {
  return (
    <div className="px-6 pb-20 pt-12">
      <div className="mx-auto w-full max-w-5xl">
        <header className="grid gap-4">
          <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--color-accent-2)]">
            Machine Learning
          </p>
          <h1 className="text-4xl font-semibold text-white font-[var(--font-display)]">
            Practical machine learning foundations
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-[color:var(--color-muted)]">
            Learn ML step by step with clean intuition, real code, and
            simple outputs you can verify.
          </p>
        </header>

        <div className="mt-10 grid gap-4">
          {tracks.map((track) => (
            <Link
              key={track.href}
              href={track.href}
              className="glass-panel rounded-2xl px-6 py-6 transition hover:border-white/30"
            >
              <h2 className="text-xl font-semibold text-white">
                {track.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">
                {track.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-8 glass-panel rounded-2xl px-6 py-6">
          <h2 className="text-lg font-semibold text-white">How to use this section</h2>
          <ul className="mt-3 grid list-disc list-inside gap-2 text-sm text-[color:var(--color-muted)]">
            <li>Start with Foundations to build the mental model.</li>
            <li>Move to Classical ML once the basics feel intuitive.</li>
            <li>Use Evaluation and Data Prep to avoid real-world mistakes.</li>
            <li>Deep Learning and Production close the gap to practical systems.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
