const nodes = [
  { label: "Arrays", className: "left-4 top-4" },
  { label: "Hashing", className: "right-6 top-10" },
  { label: "Two Pointers", className: "left-10 top-24" },
  { label: "Sliding Window", className: "left-1/2 top-28 -translate-x-1/2" },
  { label: "Binary Search", className: "right-10 top-28" },
  { label: "Trees", className: "left-1/2 top-[9.5rem] -translate-x-1/2" },
  { label: "Heaps", className: "left-12 top-[13rem]" },
  { label: "Graphs", className: "right-12 top-[13rem]" },
];

export default function RoadmapPreview() {
  return (
    <div className="glass-panel relative overflow-hidden rounded-3xl px-6 py-8">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
        <span>Python Track</span>
        <span>Week 1-6</span>
      </div>
      <h3 className="mt-4 text-xl font-semibold text-white">
        Guided interview roadmap
      </h3>
      <p className="mt-2 text-sm text-[color:var(--color-muted)]">
        Build foundations, then layer patterns, then ship AI-ready systems.
      </p>

      <div className="relative mt-8 h-60">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 420 240"
          fill="none"
        >
          <path
            d="M70 36 L210 36 L330 52"
            stroke="rgba(124,92,255,0.45)"
            strokeWidth="1.4"
          />
          <path
            d="M100 88 L210 88 L320 88"
            stroke="rgba(66,211,255,0.45)"
            strokeWidth="1.4"
          />
          <path
            d="M210 88 L210 150"
            stroke="rgba(255,184,107,0.4)"
            strokeWidth="1.4"
          />
          <path
            d="M210 150 L120 198"
            stroke="rgba(124,92,255,0.35)"
            strokeWidth="1.4"
          />
          <path
            d="M210 150 L300 198"
            stroke="rgba(66,211,255,0.35)"
            strokeWidth="1.4"
          />
        </svg>

        {nodes.map((node) => (
          <div
            key={node.label}
            className={`absolute ${node.className} rounded-full border border-white/10 bg-[color:var(--color-surface-2)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white shadow-[0_0_25px_rgba(124,92,255,0.25)]`}
          >
            {node.label}
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-[color:var(--color-surface-2)] px-4 py-3 text-xs text-[color:var(--color-muted)]">
        <span>18 interactive lessons</span>
        <span className="text-[color:var(--color-accent-2)]">New weekly</span>
      </div>
    </div>
  );
}
