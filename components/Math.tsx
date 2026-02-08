type MathProps = {
  tex: string;
  className?: string;
};

export function MathInline({ tex, className }: MathProps) {
  return (
    <span className={className}>{`\\(${tex}\\)`}</span>
  );
}

export function MathBlock({ tex, className }: MathProps) {
  return (
    <div className={className}>{`\\[${tex}\\]`}</div>
  );
}
