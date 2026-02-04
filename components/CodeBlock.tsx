"use client";

import { useState } from "react";

type CodeBlockProps = {
  code: string;
  language?: string;
  title?: string;
};

type TokenRule = {
  type: string;
  regex: RegExp;
};

const pythonRules: TokenRule[] = [
  { type: "comment", regex: /#.*(?:\n|$)/y },
  { type: "string", regex: /("""|''')[\s\S]*?\1/y },
  { type: "string", regex: /"(?:\\.|[^"\\])*"/y },
  { type: "string", regex: /'(?:\\.|[^'\\])*'/y },
  {
    type: "keyword",
    regex:
      /\b(?:import|from|as|for|while|if|elif|else|def|class|return|True|False|None|in|and|or|not|with|try|except|finally|raise|yield|lambda)\b/y,
  },
  {
    type: "builtin",
    regex:
      /\b(?:pd|df|DataFrame|Series|read_csv|head|shape|dtypes|loc|iloc|query)\b/y,
  },
  { type: "number", regex: /\b\d+(?:\.\d+)?\b/y },
];

function highlightPython(code: string) {
  const nodes: Array<string | JSX.Element> = [];
  let index = 0;
  let key = 0;

  while (index < code.length) {
    let matched = false;

    for (const rule of pythonRules) {
      rule.regex.lastIndex = index;
      const match = rule.regex.exec(code);
      if (match && match.index === index) {
        const value = match[0];
        nodes.push(
          <span key={`tok-${key++}`} className={`token-${rule.type}`}>
            {value}
          </span>
        );
        index += value.length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      nodes.push(code[index]);
      index += 1;
    }
  }

  return nodes;
}

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
        <code className="code-block">
          {language === "python" ? highlightPython(code) : code}
        </code>
      </pre>
    </div>
  );
}
