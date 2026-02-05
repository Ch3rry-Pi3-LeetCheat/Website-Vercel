"use client";

import { useState } from "react";

type CodeCopyButtonProps = {
  code: string;
};

export default function CodeCopyButton({ code }: CodeCopyButtonProps) {
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
    <button
      type="button"
      onClick={handleCopy}
      className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white transition hover:border-white/30"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
