type MathProps = {
  tex: string;
  className?: string;
};

export function MathInline({ tex, className }: MathProps) {
  const classes = ["math-inline", className].filter(Boolean).join(" ");
  return (
    <span className={classes}>{`\\(${tex}\\)`}</span>
  );
}

export function MathBlock({ tex, className }: MathProps) {
  return (
    <div className={className}>{`\\[${tex}\\]`}</div>
  );
}
