type MathProps = {
  tex: string;
  className?: string;
};

export function MathInline({ tex, className }: MathProps) {
  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: `\\(${tex}\\)` }}
    />
  );
}

export function MathBlock({ tex, className }: MathProps) {
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: `\\[${tex}\\]` }}
    />
  );
}
