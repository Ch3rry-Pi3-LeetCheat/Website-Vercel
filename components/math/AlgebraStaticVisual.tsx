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
          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_44px_minmax(0,1.2fr)_44px_minmax(0,1fr)] md:items-center">
            <div className="rounded-[28px] border border-white/15 bg-slate-950/70 px-6 py-6 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white">Input</p>
              <div className="mt-3 text-3xl font-semibold text-white">
                <MathInline
                  tex={String.raw`{\color{#22d3ee}x}={\color{#22d3ee}2}`}
                  className="math-inline math-white text-3xl"
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-[color:var(--color-muted)]">
                Choose one input value.
              </p>
            </div>

            <div className="hidden text-center text-4xl text-white/75 md:block">→</div>

            <div className="rounded-[32px] border border-cyan-400/25 bg-[rgba(21,36,59,0.94)] px-7 py-7 text-center shadow-[0_0_0_1px_rgba(56,189,248,0.06)]">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white">Function</p>
              <div className="mt-3 text-3xl font-semibold text-white">
                <MathInline
                  tex={String.raw`f({\color{#22d3ee}x})=2{\color{#22d3ee}x}+1`}
                  className="math-inline math-white text-3xl"
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-[color:var(--color-muted)]">
                Apply the same rule to whatever input arrives.
              </p>
            </div>

            <div className="hidden text-center text-4xl text-white/75 md:block">→</div>

            <div className="rounded-[28px] border border-white/15 bg-slate-950/70 px-6 py-6 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white">Output</p>
              <div className="mt-3 text-3xl font-semibold text-white">
                <MathInline
                  tex={String.raw`{\color{#f59e0b}5}`}
                  className="math-inline math-white text-3xl"
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-[color:var(--color-muted)]">
                The rule turns the input into one result.
              </p>
            </div>
          </div>
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
                  <circle cx={cx} cy={cy} r="5.5" fill="#f472b6" />
                  <circle cx={cx} cy={cy} r="9.5" fill="none" stroke="rgba(244,114,182,0.3)" strokeWidth="2" />
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
          <div className="relative">
            <svg viewBox="0 0 760 330" className="h-auto w-full">
              <ellipse
                cx="160"
                cy="200"
                rx="86"
                ry="108"
                fill="rgba(15,23,42,0.32)"
                stroke="rgba(244,114,182,0.85)"
                strokeWidth="4"
              />
              <ellipse
                cx="600"
                cy="200"
                rx="86"
                ry="108"
                fill="rgba(15,23,42,0.32)"
                stroke="rgba(244,114,182,0.85)"
                strokeWidth="4"
              />

              <text x="160" y="76" textAnchor="middle" fill="#e7eef8" fontSize="18" fontWeight="700">
                Inputs
              </text>
              <text x="600" y="76" textAnchor="middle" fill="#e7eef8" fontSize="18" fontWeight="700">
                Outputs
              </text>

              {[130, 200, 270].map((y, idx) => (
                <text
                  key={`left-${idx}`}
                  x="160"
                  y={y}
                  textAnchor="middle"
                  fill="#22d3ee"
                  fontSize="34"
                  fontWeight="700"
                >
                  {idx}
                </text>
              ))}

              {[130, 200, 270].map((y, idx) => (
                <text
                  key={`right-${idx}`}
                  x="600"
                  y={y}
                  textAnchor="middle"
                  fill="#f59e0b"
                  fontSize="34"
                  fontWeight="700"
                >
                  {[1, 3, 5][idx]}
                </text>
              ))}

              <path d="M214 122 C330 122, 430 130, 546 130" fill="none" stroke="rgba(56,189,248,0.95)" strokeWidth="3.5" />
              <path d="M214 192 C330 192, 430 200, 546 200" fill="none" stroke="rgba(56,189,248,0.95)" strokeWidth="3.5" />
              <path d="M214 262 C330 262, 430 270, 546 270" fill="none" stroke="rgba(56,189,248,0.95)" strokeWidth="3.5" />

              <path d="M532 118 L546 130 L532 142" stroke="rgba(56,189,248,0.95)" strokeWidth="3.5" fill="none" />
              <path d="M532 188 L546 200 L532 212" stroke="rgba(56,189,248,0.95)" strokeWidth="3.5" fill="none" />
              <path d="M532 258 L546 270 L532 282" stroke="rgba(56,189,248,0.95)" strokeWidth="3.5" fill="none" />
            </svg>
            <div className="pointer-events-none absolute left-1/2 top-[14%] -translate-x-1/2 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white">Rule</p>
              <div className="mt-2 rounded-2xl border border-cyan-400/20 bg-slate-950/75 px-5 py-3 text-white shadow-[0_0_0_1px_rgba(56,189,248,0.06)]">
                <MathInline
                  tex={String.raw`f({\color{#22d3ee}x})=2{\color{#22d3ee}x}+1`}
                  className="math-inline math-white text-2xl"
                />
              </div>
            </div>
          </div>
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
