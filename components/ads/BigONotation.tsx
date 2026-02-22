import { MathInline } from "@/components/Math";

type BigOKind = "o1" | "ologn" | "on" | "onlogn" | "on2";

type BigONotationProps = {
  kind: BigOKind;
};

export default function BigONotation({ kind }: BigONotationProps) {
  return (
    <span className="inline-flex items-baseline gap-[1px] align-middle whitespace-nowrap">
      <MathInline tex={String.raw`O`} className="math-inline math-o" />
      <span className="text-white">(</span>
      {kind === "o1" ? (
        <MathInline tex={String.raw`1`} className="math-inline math-white" />
      ) : null}
      {kind === "ologn" ? (
        <>
          <MathInline tex={String.raw`\log`} className="math-inline math-white" />
          <MathInline tex={String.raw`n`} className="math-inline math-nvar" />
        </>
      ) : null}
      {kind === "on" ? (
        <MathInline tex={String.raw`n`} className="math-inline math-nvar" />
      ) : null}
      {kind === "onlogn" ? (
        <>
          <MathInline tex={String.raw`n`} className="math-inline math-nvar" />
          <MathInline tex={String.raw`\log`} className="math-inline math-white" />
          <MathInline tex={String.raw`n`} className="math-inline math-nvar" />
        </>
      ) : null}
      {kind === "on2" ? (
        <>
          <MathInline tex={String.raw`n`} className="math-inline math-nvar" />
          <sup className="text-[0.7em] leading-none text-[#22d3ee]">2</sup>
        </>
      ) : null}
      <span className="text-white">)</span>
    </span>
  );
}

export type { BigOKind };
