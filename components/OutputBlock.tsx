type OutputBlockProps = {
  output: string;
  title?: string;
};

export default function OutputBlock({
  output,
  title = "Expected output",
}: OutputBlockProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[color:var(--color-surface-2)]">
      <div className="border-b border-white/10 px-4 py-3 text-xs uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
        {title}
      </div>
      <pre className="max-h-[280px] overflow-x-auto whitespace-pre-wrap break-words px-4 py-4 font-mono text-[15px] leading-7 text-white/80 md:text-[16px]">
        <code>{output}</code>
      </pre>
    </div>
  );
}
