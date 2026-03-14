type AlgebraStaticVisualProps = {
  title: string;
  caption?: string;
  variant: "substitution-flow" | "line-graph" | "equation-balance";
};

export default function AlgebraStaticVisual({
  title,
  caption,
  variant,
}: AlgebraStaticVisualProps) {
  return (
    <div className="sketch-panel rounded-2xl px-6 py-5">
      <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
        {title}
      </p>
      <div className="mt-4">
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
            <text x="655" y="101" textAnchor="middle" fill="#86efac" fontSize="28" fontWeight="700">8</text>
          </svg>
        )}

        {variant === "line-graph" && (
          <svg viewBox="0 0 760 260" className="h-56 w-full">
            <rect x="70" y="20" width="650" height="190" fill="rgba(1,8,28,0.9)" />
            <line x1="90" y1="190" x2="710" y2="190" stroke="rgba(231,238,248,0.8)" strokeWidth="2" />
            <line x1="90" y1="190" x2="90" y2="30" stroke="rgba(231,238,248,0.8)" strokeWidth="2" />

            {[0, 1, 2, 3, 4].map((tick) => {
              const x = 90 + tick * 140;
              return (
                <g key={`x-${tick}`}>
                  <line x1={x} y1="190" x2={x} y2="198" stroke="rgba(231,238,248,0.7)" strokeWidth="1.5" />
                  <text x={x} y="220" textAnchor="middle" fill="rgba(231,238,248,0.8)" fontSize="12">
                    {tick}
                  </text>
                </g>
              );
            })}

            {[0, 2, 4, 6, 8].map((tick) => {
              const y = 190 - tick * 20;
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

            <path d="M90 190 L230 150 L370 110 L510 70 L650 30" fill="none" stroke="#38bdf8" strokeWidth="3.5" />

            {[
              [90, 190],
              [230, 150],
              [370, 110],
              [510, 70],
            ].map(([cx, cy], idx) => (
              <g key={`p-${idx}`}>
                <circle cx={cx} cy={cy} r="6" fill="#86efac" />
                <circle cx={cx} cy={cy} r="10" fill="none" stroke="rgba(134,239,172,0.3)" strokeWidth="2" />
              </g>
            ))}

            <text x="710" y="242" textAnchor="end" fill="#22d3ee" fontSize="14" fontWeight="700">
              x
            </text>
            <text x="36" y="34" fill="#86efac" fontSize="14" fontWeight="700">
              y
            </text>
            <text x="520" y="52" fill="#e7eef8" fontSize="16" fontWeight="700">
              y = 2x
            </text>
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
            <text x="540" y="135" textAnchor="middle" fill="#86efac" fontSize="30" fontWeight="700">
              8
            </text>
            <text x="380" y="108" textAnchor="middle" fill="#e7eef8" fontSize="16" fontWeight="700" letterSpacing="1.5">
              TWO SIDES MUST MATCH
            </text>
          </svg>
        )}
      </div>
      {caption ? (
        <p className="mt-3 text-sm leading-6 text-[color:var(--color-muted)]">
          {caption}
        </p>
      ) : null}
    </div>
  );
}
