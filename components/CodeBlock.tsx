"use client";

import { useState } from "react";

type CodeBlockProps = {
  code: string;
  language?: string;
  title?: string;
};

export default function CodeBlock({
  code,
  language = "python",
  title,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      return;
    }
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="glass-panel rounded-2xl">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-xs uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
        <span>{title ?? language}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white transition hover:border-white/30"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="max-h-[360px] overflow-x-auto px-4 py-4 font-mono text-sm leading-6 text-white/90">
        <code>{code}</code>
      </pre>
    </div>
  );
}
