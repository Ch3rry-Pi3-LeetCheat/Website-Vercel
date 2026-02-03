type PlaceholderPageProps = {
  title: string;
  description: string;
};

export default function PlaceholderPage({
  title,
  description,
}: PlaceholderPageProps) {
  return (
    <div className="px-6 pb-20 pt-16">
      <div className="mx-auto w-full max-w-4xl">
        <div className="glass-panel rounded-3xl px-8 py-10 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--color-accent-2)]">
            Coming soon
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-white font-[var(--font-display)]">
            {title}
          </h1>
          <p className="mt-4 text-sm leading-6 text-[color:var(--color-muted)]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
