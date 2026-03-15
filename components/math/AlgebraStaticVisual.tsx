import { MathInline } from "@/components/Math";

type AlgebraStaticVisualProps = {
  title?: string;
  caption?: string;
  variant:
    | "substitution-flow"
    | "line-graph"
    | "vector-basic"
    | "vector-two"
    | "vector-scaling"
    | "equation-balance"
    | "function-machine"
    | "mapping-diagram"
    | "mapping-injective"
    | "mapping-many-to-one"
    | "mapping-surjective"
    | "mapping-bijective"
    | "mapping-not-function"
    | "coordinate-plane-basic"
    | "coordinate-plane-movement";
  framed?: boolean;
};

type MappingDiagramConfig = {
  leftValues: string[];
  rightValues: string[];
  arrows: Array<{ from: number; to: number; stroke?: string }>;
  ruleTex?: string;
  leftStroke?: string;
  rightStroke?: string;
};

function getMappingPositions(count: number, center = 200, spacing = 70) {
  const start = center - ((count - 1) * spacing) / 2;
  return Array.from({ length: count }, (_, idx) => start + idx * spacing);
}

function renderMappingDiagram({
  leftValues,
  rightValues,
  arrows,
  ruleTex,
  leftStroke = "rgba(34,211,238,0.85)",
  rightStroke = "rgba(244,114,182,0.85)",
}: MappingDiagramConfig) {
  const leftYs = getMappingPositions(leftValues.length);
  const rightYs = getMappingPositions(rightValues.length);

  return (
    <div className="relative">
      <svg viewBox="0 0 760 330" className="h-auto w-full">
        <ellipse
          cx="160"
          cy="200"
          rx="86"
          ry="108"
          fill="rgba(15,23,42,0.32)"
          stroke={leftStroke}
          strokeWidth="4"
        />
        <ellipse
          cx="600"
          cy="200"
          rx="86"
          ry="108"
          fill="rgba(15,23,42,0.32)"
          stroke={rightStroke}
          strokeWidth="4"
        />

        <text x="160" y="76" textAnchor="middle" fill="#e7eef8" fontSize="18" fontWeight="700">
          Inputs
        </text>
        <text x="600" y="76" textAnchor="middle" fill="#e7eef8" fontSize="18" fontWeight="700">
          Outputs
        </text>

        {leftValues.map((value, idx) => (
          <text
            key={`left-${value}-${idx}`}
            x="160"
            y={leftYs[idx]}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#ffffff"
            fontSize="34"
            fontWeight="700"
          >
            {value}
          </text>
        ))}

        {rightValues.map((value, idx) => (
          <text
            key={`right-${value}-${idx}`}
            x="600"
            y={rightYs[idx]}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#ffffff"
            fontSize="34"
            fontWeight="700"
          >
            {value}
          </text>
        ))}

        {arrows.map((arrow, idx) => {
          const y1 = leftYs[arrow.from];
          const y2 = rightYs[arrow.to];
          const stroke = arrow.stroke ?? "rgba(231,238,248,0.9)";
          return (
            <g key={`arrow-${idx}`}>
              <path d={`M198 ${y1} L562 ${y2}`} fill="none" stroke={stroke} strokeWidth="3" />
              <path
                d={`M548 ${y2 - 12} L562 ${y2} L548 ${y2 + 12}`}
                stroke={stroke}
                strokeWidth="3"
                fill="none"
              />
            </g>
          );
        })}
      </svg>
      {ruleTex ? (
        <div className="pointer-events-none absolute left-1/2 top-[8%] -translate-x-1/2 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white">Rule</p>
          <div className="mt-2 rounded-2xl border border-cyan-400/20 bg-slate-950/75 px-5 py-3 text-white shadow-[0_0_0_1px_rgba(56,189,248,0.06)]">
            <MathInline tex={ruleTex} className="math-inline math-white text-2xl" />
          </div>
        </div>
      ) : null}
    </div>
  );
}

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

        {variant === "vector-basic" && (
          <div className="relative">
            <svg viewBox="0 0 760 420" className="h-auto w-full">
              <line x1="220" y1="320" x2="640" y2="320" stroke="rgba(231,238,248,0.82)" strokeWidth="2" />
              <line x1="220" y1="60" x2="220" y2="320" stroke="rgba(231,238,248,0.82)" strokeWidth="2" />
              <path d="M626 312 L640 320 L626 328" stroke="rgba(231,238,248,0.82)" strokeWidth="2" fill="none" />
              <path d="M212 74 L220 60 L228 74" stroke="rgba(231,238,248,0.82)" strokeWidth="2" fill="none" />

              {[1, 2, 3, 4].map((tick) => {
                const x = 220 + tick * 80;
                return (
                  <g key={`vector-basic-x-${tick}`}>
                    <line x1={x} y1="314" x2={x} y2="326" stroke="rgba(231,238,248,0.65)" strokeWidth="1.4" />
                    <text x={x} y="344" textAnchor="middle" fill="rgba(231,238,248,0.8)" fontSize="12">
                      {tick}
                    </text>
                  </g>
                );
              })}

              {[1, 2, 3].map((tick) => {
                const y = 320 - tick * 80;
                return (
                  <g key={`vector-basic-y-${tick}`}>
                    <line x1="214" y1={y} x2="226" y2={y} stroke="rgba(231,238,248,0.65)" strokeWidth="1.4" />
                    <text x="202" y={y + 4} textAnchor="end" fill="rgba(231,238,248,0.8)" fontSize="12">
                      {tick}
                    </text>
                  </g>
                );
              })}

              <path d="M220 320 L380 240" stroke="rgba(231,238,248,0.95)" strokeWidth="2.25" fill="none" />
              <path d="M367 238 L380 240 L371 251" stroke="rgba(231,238,248,0.95)" strokeWidth="2.25" fill="none" />

              <path d="M380 320 L380 240" stroke="rgba(244,114,182,0.68)" strokeWidth="1.5" strokeDasharray="5 5" />

              <circle cx="220" cy="320" r="5.5" fill="#ffffff" />
              <circle cx="380" cy="240" r="7" fill="#22d3ee" />
              <circle cx="380" cy="240" r="12" fill="none" stroke="rgba(34,211,238,0.26)" strokeWidth="2" />

              <text x="222" y="348" fill="rgba(231,238,248,0.8)" fontSize="12">0</text>
              <text x="646" y="344" fill="#22d3ee" fontSize="14" fontWeight="700">x</text>
              <text x="232" y="56" fill="#f472b6" fontSize="14" fontWeight="700">y</text>
              <text x="380" y="224" textAnchor="middle" fill="#22d3ee" fontSize="14" fontWeight="700">v</text>
              <text x="300" y="306" textAnchor="middle" fill="#22d3ee" fontSize="13" fontWeight="700">+2 in x</text>
              <text x="392" y="286" fill="#f472b6" fontSize="13" fontWeight="700">+1 in y</text>
            </svg>
          </div>
        )}

        {variant === "vector-scaling" && (
          <div className="relative">
            <svg viewBox="0 0 760 420" className="h-auto w-full">
              <line x1="220" y1="320" x2="640" y2="320" stroke="rgba(231,238,248,0.82)" strokeWidth="2" />
              <line x1="220" y1="60" x2="220" y2="320" stroke="rgba(231,238,248,0.82)" strokeWidth="2" />
              <path d="M626 312 L640 320 L626 328" stroke="rgba(231,238,248,0.82)" strokeWidth="2" fill="none" />
              <path d="M212 74 L220 60 L228 74" stroke="rgba(231,238,248,0.82)" strokeWidth="2" fill="none" />

              {[1, 2, 3, 4].map((tick) => {
                const x = 220 + tick * 80;
                return (
                  <g key={`vector-scaling-x-${tick}`}>
                    <line x1={x} y1="314" x2={x} y2="326" stroke="rgba(231,238,248,0.65)" strokeWidth="1.4" />
                    <text x={x} y="344" textAnchor="middle" fill="rgba(231,238,248,0.8)" fontSize="12">
                      {tick}
                    </text>
                  </g>
                );
              })}

              {[1, 2, 3].map((tick) => {
                const y = 320 - tick * 80;
                return (
                  <g key={`vector-scaling-y-${tick}`}>
                    <line x1="214" y1={y} x2="226" y2={y} stroke="rgba(231,238,248,0.65)" strokeWidth="1.4" />
                    <text x="202" y={y + 4} textAnchor="end" fill="rgba(231,238,248,0.8)" fontSize="12">
                      {tick}
                    </text>
                  </g>
                );
              })}

              <path d="M220 320 L380 240" stroke="rgba(231,238,248,0.95)" strokeWidth="2" fill="none" />
              <path d="M367 238 L380 240 L371 251" stroke="rgba(231,238,248,0.95)" strokeWidth="2" fill="none" />

              <path d="M220 320 L540 160" stroke="rgba(231,238,248,0.95)" strokeWidth="2" strokeDasharray="7 6" fill="none" />
              <path d="M527 158 L540 160 L531 171" stroke="rgba(231,238,248,0.95)" strokeWidth="2" fill="none" />

              <circle cx="220" cy="320" r="5.5" fill="#ffffff" />
              <g>
                <circle cx="380" cy="240" r="6.5" fill="#22d3ee" />
                <circle cx="380" cy="240" r="10.5" fill="none" stroke="rgba(34,211,238,0.24)" strokeWidth="2" />
              </g>
              <g>
                <circle cx="540" cy="160" r="6.5" fill="#22d3ee" />
                <circle cx="540" cy="160" r="10.5" fill="none" stroke="rgba(34,211,238,0.24)" strokeWidth="2" />
              </g>

              <text x="380" y="222" textAnchor="middle" fill="#e7eef8" fontSize="14" fontWeight="700">v</text>
              <text x="540" y="142" textAnchor="middle" fill="#e7eef8" fontSize="14" fontWeight="700">2v</text>

              <text x="646" y="344" fill="#22d3ee" fontSize="14" fontWeight="700">x</text>
              <text x="232" y="56" fill="#f472b6" fontSize="14" fontWeight="700">y</text>
            </svg>
          </div>
        )}

        {variant === "vector-two" && (
          <div className="relative">
            <svg viewBox="0 0 760 420" className="h-auto w-full">
              <line x1="220" y1="320" x2="640" y2="320" stroke="rgba(231,238,248,0.82)" strokeWidth="2" />
              <line x1="220" y1="60" x2="220" y2="320" stroke="rgba(231,238,248,0.82)" strokeWidth="2" />
              <path d="M626 312 L640 320 L626 328" stroke="rgba(231,238,248,0.82)" strokeWidth="2" fill="none" />
              <path d="M212 74 L220 60 L228 74" stroke="rgba(231,238,248,0.82)" strokeWidth="2" fill="none" />

              {[1, 2, 3, 4].map((tick) => {
                const x = 220 + tick * 80;
                return (
                  <g key={`vector-two-x-${tick}`}>
                    <line x1={x} y1="314" x2={x} y2="326" stroke="rgba(231,238,248,0.65)" strokeWidth="1.4" />
                    <text x={x} y="344" textAnchor="middle" fill="rgba(231,238,248,0.8)" fontSize="12">
                      {tick}
                    </text>
                  </g>
                );
              })}

              {[1, 2, 3].map((tick) => {
                const y = 320 - tick * 80;
                return (
                  <g key={`vector-two-y-${tick}`}>
                    <line x1="214" y1={y} x2="226" y2={y} stroke="rgba(231,238,248,0.65)" strokeWidth="1.4" />
                    <text x="202" y={y + 4} textAnchor="end" fill="rgba(231,238,248,0.8)" fontSize="12">
                      {tick}
                    </text>
                  </g>
                );
              })}

              <path d="M220 320 L380 240" stroke="rgba(231,238,248,0.95)" strokeWidth="2" fill="none" />
              <path d="M367 238 L380 240 L371 251" stroke="rgba(231,238,248,0.95)" strokeWidth="2" fill="none" />

              <path d="M220 320 L300 80" stroke="rgba(231,238,248,0.95)" strokeWidth="2" fill="none" />
              <path d="M292 94 L300 80 L306 94" stroke="rgba(231,238,248,0.95)" strokeWidth="2" fill="none" />

              <circle cx="220" cy="320" r="5.5" fill="#ffffff" />

              <g>
                <circle cx="380" cy="240" r="7" fill="#22d3ee" />
                <circle cx="380" cy="240" r="12" fill="none" stroke="rgba(34,211,238,0.26)" strokeWidth="2" />
              </g>
              <g>
                <circle cx="300" cy="80" r="7" fill="#f472b6" />
                <circle cx="300" cy="80" r="12" fill="none" stroke="rgba(244,114,182,0.26)" strokeWidth="2" />
              </g>

              <text x="380" y="224" textAnchor="middle" fill="#22d3ee" fontSize="14" fontWeight="700">v</text>
              <text x="300" y="62" textAnchor="middle" fill="#f472b6" fontSize="14" fontWeight="700">u</text>

              <text x="646" y="344" fill="#22d3ee" fontSize="14" fontWeight="700">x</text>
              <text x="232" y="56" fill="#f472b6" fontSize="14" fontWeight="700">y</text>
            </svg>
          </div>
        )}

        {variant === "coordinate-plane-basic" && (
          <div className="relative">
            <svg viewBox="0 0 760 560" className="h-auto w-full">
              <line x1="120" y1="280" x2="640" y2="280" stroke="rgba(231,238,248,0.85)" strokeWidth="2" />
              <line x1="380" y1="40" x2="380" y2="520" stroke="rgba(231,238,248,0.85)" strokeWidth="2" />
              <path d="M626 272 L640 280 L626 288" stroke="rgba(231,238,248,0.85)" strokeWidth="2" fill="none" />
              <path d="M372 54 L380 40 L388 54" stroke="rgba(231,238,248,0.85)" strokeWidth="2" fill="none" />

              {[-4, -3, -2, -1, 1, 2, 3, 4].map((tick) => {
                const x = 380 + tick * 48;
                return (
                  <g key={`xtick-${tick}`}>
                    <line x1={x} y1="274" x2={x} y2="286" stroke="rgba(231,238,248,0.65)" strokeWidth="1.5" />
                    <text x={x} y="306" textAnchor="middle" fill="rgba(231,238,248,0.8)" fontSize="12">
                      {tick}
                    </text>
                  </g>
                );
              })}

              {[-4, -3, -2, -1, 1, 2, 3, 4].map((tick) => {
                const y = 280 - tick * 48;
                return (
                  <g key={`ytick-${tick}`}>
                    <line x1="374" y1={y} x2="386" y2={y} stroke="rgba(231,238,248,0.65)" strokeWidth="1.5" />
                    <text x="360" y={y + 4} textAnchor="end" fill="rgba(231,238,248,0.8)" fontSize="12">
                      {tick}
                    </text>
                  </g>
                );
              })}

              <circle cx="476" cy="136" r="7" fill="#f472b6" />
              <circle cx="476" cy="136" r="13" fill="none" stroke="rgba(244,114,182,0.28)" strokeWidth="2" />
              <text x="490" y="126" fill="#e7eef8" fontSize="15" fontWeight="700">A</text>

              <circle cx="284" cy="184" r="7" fill="#38bdf8" />
              <circle cx="284" cy="184" r="13" fill="none" stroke="rgba(56,189,248,0.28)" strokeWidth="2" />
              <text x="250" y="174" fill="#e7eef8" fontSize="15" fontWeight="700">B</text>

              <circle cx="524" cy="376" r="7" fill="#f59e0b" />
              <circle cx="524" cy="376" r="13" fill="none" stroke="rgba(245,158,11,0.24)" strokeWidth="2" />
              <text x="538" y="366" fill="#e7eef8" fontSize="15" fontWeight="700">C</text>

              <circle cx="380" cy="280" r="5" fill="#ffffff" />
              <text x="394" y="266" fill="rgba(231,238,248,0.82)" fontSize="12" fontWeight="700">origin</text>

              <text x="646" y="304" fill="#22d3ee" fontSize="14" fontWeight="700">x</text>
              <text x="392" y="36" fill="#f472b6" fontSize="14" fontWeight="700">y</text>
            </svg>
            <div className="pointer-events-none absolute right-[14%] top-[10%] grid gap-2 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3">
              <div className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#f472b6]" />
                <MathInline tex={String.raw`A=({\color{#22d3ee}2},{\color{#f472b6}3})`} className="math-inline math-white text-base" />
              </div>
              <div className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#38bdf8]" />
                <MathInline tex={String.raw`B=({\color{#22d3ee}-2},{\color{#f472b6}2})`} className="math-inline math-white text-base" />
              </div>
              <div className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]" />
                <MathInline tex={String.raw`C=({\color{#22d3ee}3},{\color{#f472b6}-2})`} className="math-inline math-white text-base" />
              </div>
            </div>
          </div>
        )}

        {variant === "coordinate-plane-movement" && (
          <div className="relative">
            <svg viewBox="0 0 760 520" className="h-auto w-full">
              <line x1="28" y1="360" x2="540" y2="360" stroke="rgba(231,238,248,0.85)" strokeWidth="2" />
              <line x1="220" y1="80" x2="220" y2="440" stroke="rgba(231,238,248,0.85)" strokeWidth="2" />
              <path d="M526 352 L540 360 L526 368" stroke="rgba(231,238,248,0.85)" strokeWidth="2" fill="none" />
              <path d="M212 94 L220 80 L228 94" stroke="rgba(231,238,248,0.85)" strokeWidth="2" fill="none" />

              <path d="M316 312 L412 312" stroke="#22d3ee" strokeWidth="3" strokeDasharray="7 6" />
              <path d="M412 312 L412 216" stroke="#f472b6" strokeWidth="3" strokeDasharray="7 6" />

              <text x="364" y="300" textAnchor="middle" fill="#22d3ee" fontSize="14" fontWeight="700">+2 in x</text>
              <text x="430" y="264" fill="#f472b6" fontSize="14" fontWeight="700">+2 in y</text>

              <line x1="316" y1="312" x2="412" y2="216" stroke="rgba(231,238,248,0.4)" strokeWidth="2.5" />

              <circle cx="316" cy="312" r="7" fill="#f472b6" />
              <text x="316" y="292" textAnchor="middle" fill="#e7eef8" fontSize="14" fontWeight="700">P</text>

              <circle cx="412" cy="216" r="7" fill="#38bdf8" />
              <text x="412" y="196" textAnchor="middle" fill="#e7eef8" fontSize="14" fontWeight="700">Q</text>

              <text x="546" y="384" fill="#22d3ee" fontSize="14" fontWeight="700">x</text>
              <text x="232" y="76" fill="#f472b6" fontSize="14" fontWeight="700">y</text>
            </svg>
            <div className="pointer-events-none absolute right-[6%] top-[16%] max-w-[180px] rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm leading-6 text-[color:var(--color-muted)]">
              <p>
                <span className="text-white font-semibold">P</span> to{" "}
                <span className="text-white font-semibold">Q</span> can be read in two ways:
              </p>
              <p className="mt-2">
                horizontal and vertical movement, or one direct diagonal distance
              </p>
            </div>
          </div>
        )}

        {variant === "mapping-diagram" &&
          renderMappingDiagram({
            leftValues: ["0", "1", "2"],
            rightValues: ["1", "3", "5"],
            arrows: [
              { from: 0, to: 0 },
              { from: 1, to: 1 },
              { from: 2, to: 2 },
            ],
            ruleTex: String.raw`f({\color{#22d3ee}x})=2{\color{#22d3ee}x}+1`,
          })}

        {variant === "mapping-injective" &&
          renderMappingDiagram({
            leftValues: ["1", "2", "3"],
            rightValues: ["2", "3", "4"],
            arrows: [
              { from: 0, to: 0 },
              { from: 1, to: 1 },
              { from: 2, to: 2 },
            ],
            ruleTex: String.raw`f({\color{#22d3ee}x})={\color{#22d3ee}x}+1`,
          })}

        {variant === "mapping-many-to-one" &&
          renderMappingDiagram({
            leftValues: ["-2", "0", "2"],
            rightValues: ["0", "4"],
            arrows: [
              { from: 0, to: 1 },
              { from: 1, to: 0 },
              { from: 2, to: 1 },
            ],
            ruleTex: String.raw`g({\color{#22d3ee}x})={\color{#22d3ee}x}^{2}`,
          })}

        {variant === "mapping-surjective" &&
          renderMappingDiagram({
            leftValues: ["0", "1", "2"],
            rightValues: ["A", "B"],
            arrows: [
              { from: 0, to: 0 },
              { from: 1, to: 1 },
              { from: 2, to: 1 },
            ],
            leftStroke: "rgba(34,211,238,0.85)",
            rightStroke: "rgba(244,114,182,0.85)",
          })}

        {variant === "mapping-bijective" &&
          renderMappingDiagram({
            leftValues: ["0", "1", "2"],
            rightValues: ["1", "3", "5"],
            arrows: [
              { from: 0, to: 0 },
              { from: 1, to: 1 },
              { from: 2, to: 2 },
            ],
          })}

        {variant === "mapping-not-function" &&
          renderMappingDiagram({
            leftValues: ["2", "3"],
            rightValues: ["5", "7"],
            arrows: [
              { from: 0, to: 0, stroke: "rgba(248,113,113,0.95)" },
              { from: 0, to: 1, stroke: "rgba(248,113,113,0.95)" },
              { from: 1, to: 1, stroke: "rgba(231,238,248,0.9)" },
            ],
            leftStroke: "rgba(34,211,238,0.85)",
            rightStroke: "rgba(244,114,182,0.85)",
          })}

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
