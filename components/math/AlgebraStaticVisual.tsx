import { MathInline } from "@/components/Math";

type AlgebraStaticVisualProps = {
  title?: string;
  caption?: string;
  variant:
    | "substitution-flow"
    | "line-graph"
    | "equation-balance"
    | "function-machine"
    | "mapping-diagram";
  framed?: boolean;
};

export default function AlgebraStaticVisual({
  title,
  caption,
  variant,
  framed = true,
}: AlgebraStaticVisualProps) {
  const content = (
    <>
      {title ? (
        <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
          {title}
        </p>
      ) : null}
      <div className={title ? "mt-4" : undefined}>
        {variant === "substitution-flow" && (
          <svg viewBox="0 0 760 180" className="h-40 w-full">
            <rect x="30" y="45" width="150" height="80" rx="18" fill="rgba(15, 23, 42, 0.92)" stroke="rgba(148, 163, 184, 0.3)" />
            <rect x="305" y="45" width="150" height="80" rx="18" fill="rgba(15, 23, 42, 0.92)" stroke="rgba(148, 163, 184, 0.3)" />
            <rect x="580" y="45" width="150" height="80" rx="18" fill="rgba(15, 23, 42, 0.92)" stroke="rgba(148, 163, 184, 0.3)" />

            <path d="M180 85 L300 85" stroke="rgba(231,238,248,0.85)" strokeWidth="3" strokeDasharray="4 6" />
            <path d="M455 85 L575 85" stroke="rgba(231,238,248,0.85)" strokeWidth="3" strokeDasharray="4 6" />
            <path d="M288 76 L300 85 L288 94" stroke="rgba(231,238,248,0.85)" strokeWidth="3" fill="none" />
            <path d="M563 76 L575 85 L563 94" stroke="rgba(231,238,248,0.85)" strokeWidth="3" fill="none" />

            <text x="105" y="76" textAnchor="middle" fill="#e7eef8" fontSize="16" fontWeight="700" letterSpacing="1.5">INPUT</text>
            <text x="105" y="101" textAnchor="middle" fill="#22d3ee" fontSize="28" fontWeight="700">x = 5</text>

            <text x="380" y="76" textAnchor="middle" fill="#e7eef8" fontSize="16" fontWeight="700" letterSpacing="1.5">RULE</text>
            <text x="380" y="101" textAnchor="middle" fill="#22d3ee" fontSize="28" fontWeight="700">x + 3</text>

            <text x="655" y="76" textAnchor="middle" fill="#e7eef8" fontSize="16" fontWeight="700" letterSpacing="1.5">OUTPUT</text>
            <text x="655" y="101" textAnchor="middle" fill="#f472b6" fontSize="28" fontWeight="700">8</text>
          </svg>
        )}

        {variant === "function-machine" && (
          <svg viewBox="0 0 760 220" className="h-48 w-full">
            <rect x="36" y="56" width="170" height="96" rx="22" fill="rgba(15, 23, 42, 0.9)" stroke="rgba(148, 163, 184, 0.28)" />
            <rect x="280" y="34" width="200" height="140" rx="28" fill="rgba(21, 36, 59, 0.94)" stroke="rgba(56, 189, 248, 0.32)" />
            <rect x="554" y="56" width="170" height="96" rx="22" fill="rgba(15, 23, 42, 0.9)" stroke="rgba(148, 163, 184, 0.28)" />

            <path d="M206 104 L280 104" stroke="rgba(231,238,248,0.86)" strokeWidth="3" strokeDasharray="5 7" />
            <path d="M480 104 L554 104" stroke="rgba(231,238,248,0.86)" strokeWidth="3" strokeDasharray="5 7" />
            <path d="M268 95 L280 104 L268 113" stroke="rgba(231,238,248,0.86)" strokeWidth="3" fill="none" />
            <path d="M542 95 L554 104 L542 113" stroke="rgba(231,238,248,0.86)" strokeWidth="3" fill="none" />

            <text x="121" y="88" textAnchor="middle" fill="#e7eef8" fontSize="15" fontWeight="700" letterSpacing="1.5">INPUT</text>
            <text x="121" y="121" textAnchor="middle" fill="#22d3ee" fontSize="30" fontWeight="700">x = 2</text>

            <text x="380" y="76" textAnchor="middle" fill="#e7eef8" fontSize="16" fontWeight="700" letterSpacing="1.6">FUNCTION</text>
            <text x="380" y="112" textAnchor="middle" fill="#f472b6" fontSize="26" fontWeight="700">f(x) = 2x + 1</text>
            <text x="380" y="142" textAnchor="middle" fill="rgba(231,238,248,0.78)" fontSize="13">take an input, apply the rule, produce an output</text>

            <text x="639" y="88" textAnchor="middle" fill="#e7eef8" fontSize="15" fontWeight="700" letterSpacing="1.5">OUTPUT</text>
            <text x="639" y="121" textAnchor="middle" fill="#f59e0b" fontSize="30" fontWeight="700">5</text>
          </svg>
        )}

        {variant === "line-graph" && (
          <div className="relative">
            <svg viewBox="0 0 760 540" className="h-auto w-full">
              <line x1="90" y1="452" x2="710" y2="452" stroke="rgba(231,238,248,0.8)" strokeWidth="2" />
              <line x1="90" y1="452" x2="90" y2="62" stroke="rgba(231,238,248,0.8)" strokeWidth="2" />

              {[0, 1, 2, 3, 4].map((tick) => {
                const x = 90 + tick * 140;
                return (
                  <g key={`x-${tick}`}>
                    <line x1={x} y1="452" x2={x} y2="462" stroke="rgba(231,238,248,0.7)" strokeWidth="1.5" />
                    <text x={x} y="490" textAnchor="middle" fill="rgba(231,238,248,0.8)" fontSize="12">
                      {tick}
                    </text>
                  </g>
                );
              })}

              {[0, 2, 4, 6, 8].map((tick) => {
                const y = 452 - tick * 48;
                return (
                  <g key={`y-${tick}`}>
                    <line x1="82" y1={y} x2="90" y2={y} stroke="rgba(231,238,248,0.7)" strokeWidth="1.5" />
                    <line x1="90" y1={y} x2="710" y2={y} stroke="rgba(231,238,248,0.12)" strokeWidth="1" strokeDasharray="5 7" />
                    <text x="72" y={y + 4} textAnchor="end" fill="rgba(231,238,248,0.8)" fontSize="12">
                      {tick}
                    </text>
                  </g>
                );
              })}

              <path d="M90 452 L230 356 L370 260 L510 164 L650 68" fill="none" stroke="#38bdf8" strokeWidth="3.5" />
              <path d="M90 356 L230 308 L370 260 L510 212 L650 164" fill="none" stroke="#f59e0b" strokeWidth="3.5" />

              {[
                [90, 452],
                [230, 356],
                [370, 260],
                [510, 164],
              ].map(([cx, cy], idx) => (
                <g key={`p-${idx}`}>
                  <circle cx={cx} cy={cy} r="6" fill="#f472b6" />
                  <circle cx={cx} cy={cy} r="10" fill="none" stroke="rgba(244,114,182,0.3)" strokeWidth="2" />
                </g>
              ))}

              {[
                [90, 356],
                [230, 308],
                [510, 212],
              ].map(([cx, cy], idx) => (
                <g key={`q-${idx}`}>
                  <circle cx={cx} cy={cy} r="5.5" fill="#f59e0b" />
                  <circle cx={cx} cy={cy} r="9.5" fill="none" stroke="rgba(245,158,11,0.26)" strokeWidth="2" />
                </g>
              ))}

              <text x="710" y="506" textAnchor="end" fill="#22d3ee" fontSize="14" fontWeight="700">
                x
              </text>
              <text x="36" y="72" fill="#f472b6" fontSize="14" fontWeight="700">
                y
              </text>
            </svg>
            <div className="pointer-events-none absolute right-[12%] top-[11%] grid gap-2">
              <div className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#38bdf8]" />
                <MathInline
                  tex={String.raw`{\color{#f472b6}y}=2{\color{#22d3ee}x}`}
                  className="math-inline math-white text-base"
                />
              </div>
              <div className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]" />
                <MathInline
                  tex={String.raw`{\color{#f472b6}y}={\color{#22d3ee}x}+2`}
                  className="math-inline math-white text-base"
                />
              </div>
            </div>
          </div>
        )}

        {variant === "mapping-diagram" && (
          <svg viewBox="0 0 760 260" className="h-52 w-full">
            <text x="180" y="34" textAnchor="middle" fill="#e7eef8" fontSize="16" fontWeight="700" letterSpacing="1.5">INPUTS</text>
            <text x="580" y="34" textAnchor="middle" fill="#e7eef8" fontSize="16" fontWeight="700" letterSpacing="1.5">OUTPUTS</text>

            {[72, 132, 192].map((y, idx) => (
              <g key={`left-${idx}`}>
                <circle cx="180" cy={y} r="24" fill="rgba(15, 23, 42, 0.92)" stroke="rgba(56, 189, 248, 0.35)" />
                <text x="180" y={y + 7} textAnchor="middle" fill="#22d3ee" fontSize="24" fontWeight="700">
                  {idx}
                </text>
              </g>
            ))}

            {[102, 162, 222].map((y, idx) => (
              <g key={`right-${idx}`}>
                <circle cx="580" cy={y} r="24" fill="rgba(15, 23, 42, 0.92)" stroke="rgba(245, 158, 11, 0.35)" />
                <text x="580" y={y + 7} textAnchor="middle" fill="#f59e0b" fontSize="24" fontWeight="700">
                  {[1, 3, 5][idx]}
                </text>
              </g>
            ))}

            <path d="M204 72 C320 72, 420 102, 556 102" fill="none" stroke="rgba(244,114,182,0.9)" strokeWidth="3" />
            <path d="M204 132 C320 132, 420 162, 556 162" fill="none" stroke="rgba(244,114,182,0.9)" strokeWidth="3" />
            <path d="M204 192 C320 192, 420 222, 556 222" fill="none" stroke="rgba(244,114,182,0.9)" strokeWidth="3" />

            <path d="M544 96 L556 102 L544 108" stroke="rgba(244,114,182,0.9)" strokeWidth="3" fill="none" />
            <path d="M544 156 L556 162 L544 168" stroke="rgba(244,114,182,0.9)" strokeWidth="3" fill="none" />
            <path d="M544 216 L556 222 L544 228" stroke="rgba(244,114,182,0.9)" strokeWidth="3" fill="none" />

            <text x="380" y="76" textAnchor="middle" fill="#e7eef8" fontSize="15" fontWeight="700" letterSpacing="1.3">RULE</text>
            <text x="380" y="102" textAnchor="middle" fill="#f472b6" fontSize="24" fontWeight="700">f(x) = 2x + 1</text>
          </svg>
        )}

        {variant === "equation-balance" && (
          <svg viewBox="0 0 760 210" className="h-44 w-full">
            <line x1="380" y1="30" x2="380" y2="70" stroke="rgba(231,238,248,0.85)" strokeWidth="3" />
            <line x1="250" y1="78" x2="510" y2="78" stroke="rgba(231,238,248,0.85)" strokeWidth="4" />
            <line x1="270" y1="78" x2="220" y2="150" stroke="rgba(231,238,248,0.85)" strokeWidth="3" />
            <line x1="490" y1="78" x2="540" y2="150" stroke="rgba(231,238,248,0.85)" strokeWidth="3" />
            <line x1="160" y1="150" x2="280" y2="150" stroke="rgba(231,238,248,0.85)" strokeWidth="4" />
            <line x1="480" y1="150" x2="600" y2="150" stroke="rgba(231,238,248,0.85)" strokeWidth="4" />

            <text x="220" y="135" textAnchor="middle" fill="#22d3ee" fontSize="30" fontWeight="700">
              x + 3
            </text>
            <text x="540" y="135" textAnchor="middle" fill="#f472b6" fontSize="30" fontWeight="700">
              8
            </text>
            <text x="380" y="108" textAnchor="middle" fill="#e7eef8" fontSize="16" fontWeight="700" letterSpacing="1.5">
              TWO SIDES MUST MATCH
            </text>
          </svg>
        )}
      </div>
      {caption ? (
        <p className="mt-3 text-base leading-7 text-[color:var(--color-muted)]">
          {caption}
        </p>
      ) : null}
    </>
  );

  if (!framed) {
    return <div className="grid gap-1">{content}</div>;
  }

  return (
    <div className="sketch-panel rounded-2xl px-6 py-5">
      {content}
    </div>
  );
}
