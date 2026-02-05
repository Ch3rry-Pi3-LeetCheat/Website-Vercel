import CodeCopyButton from "@/components/CodeCopyButton";
import { highlightCode } from "@/lib/shiki";

type CodeBlockProps = {
  code: string;
  language?: string;
  title?: string;
};

export default async function CodeBlock({
  code,
  language = "python",
  title,
}: CodeBlockProps) {
  const highlighted = await highlightCode(code, language);

  return (
    <div className="glass-panel rounded-2xl">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-xs uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
        <span>{title ?? language}</span>
        <CodeCopyButton code={code} />
      </div>
      <div
        className="shiki-wrapper"
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
    </div>
  );
}
