import { MathInline } from "@/components/Math";

type AlgebraStaticVisualProps = {
  title?: string;
  caption?: string;
  variant:
    | "substitution-flow"
    | "line-graph"
    | "vector-basic"
    | "vector-3d"
    | "vector-addition"
    | "vector-two"
    | "vector-scaling"
    | "pythagorean-triangle"
    | "vector-magnitude"
    | "vector-distance"
    | "vector-normalization"
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

const AXIS_TICK_STROKE = "rgba(226,232,240,0.55)";
const AXIS_LABEL_FILL = "rgba(226,232,240,0.85)";

/**
 * Evenly spaces labels/nodes around a vertical center line.
 * Useful when debugging mapping diagrams: `center` moves the whole column,
 * `spacing` changes the gap between rows.
 */
function getMappingPositions(count: number, center = 200, spacing = 70) {
  const start = center - ((count - 1) * spacing) / 2;
  return Array.from({ length: count }, (_, idx) => start + idx * spacing);
}

/**
 * Shared SVG arrowhead marker.
 * When arrow tips look too buried inside a line endpoint, `refX` is the main
 * value to adjust. Larger `markerWidth`/`markerHeight` makes the head bigger.
 */
function renderFilledArrowMarker(
  id: string,
  fill: string,
  {
    markerWidth = 5,
    markerHeight = 5,
    refX = 4.6,
    refY = 2.5,
  }: {
    markerWidth?: number;
    markerHeight?: number;
    refX?: number;
    refY?: number;
  } = {}
) {
  return (
    <marker
      id={id}
      markerWidth={markerWidth}
      markerHeight={markerHeight}
      refX={refX}
      refY={refY}
      orient="auto"
      markerUnits="strokeWidth"
    >
      <path d={`M0,0 L${markerWidth},${markerHeight / 2} L0,${markerHeight} z`} fill={fill} />
    </marker>
  );
}

/**
 * Axis arrows use a slightly larger marker than vector arrows.
 * Keep this separate so axis heads can be tuned without disturbing vectors.
 */
function renderAxisArrowMarker(id: string, fill = "rgba(231,238,248,1)") {
  return renderFilledArrowMarker(id, fill, {
    markerWidth: 7,
    markerHeight: 7,
    refX: 6.1,
    refY: 3.5,
  });
}

/**
 * Standard x-axis tick and label.
 * `x` controls horizontal placement, `axisY` controls the baseline, and
 * `tickLength`/`labelOffset` are the first values to tweak when spacing looks off.
 */
function renderXAxisTick({
  key,
  x,
  axisY,
  label,
  labelOffset = 20,
  tickLength = 8,
}: {
  key: string;
  x: number;
  axisY: number;
  label: number | string;
  labelOffset?: number;
  tickLength?: number;
}) {
  return (
    <g key={key}>
      <line
        x1={x}
        y1={axisY}
        x2={x}
        y2={axisY + tickLength}
        stroke={AXIS_TICK_STROKE}
        strokeWidth={1.1}
      />
      <text
        x={x}
        y={axisY + labelOffset}
        textAnchor="middle"
        fill={AXIS_LABEL_FILL}
        fontSize="12"
      >
        {label}
      </text>
    </g>
  );
}

/**
 * Standard y-axis tick and label.
 * `axisX` controls the axis position, `y` controls the row, and `labelOffset`
 * is the quickest way to move labels away from the axis without moving the tick.
 */
function renderYAxisTick({
  key,
  axisX,
  y,
  label,
  labelOffset = 10,
  tickLength = 8,
}: {
  key: string;
  axisX: number;
  y: number;
  label: number | string;
  labelOffset?: number;
  tickLength?: number;
}) {
  return (
    <g key={key}>
      <line
        x1={axisX - tickLength}
        y1={y}
        x2={axisX}
        y2={y}
        stroke={AXIS_TICK_STROKE}
        strokeWidth={1.1}
      />
      <text
        x={axisX - labelOffset}
        y={y + 4}
        textAnchor="end"
        fill={AXIS_LABEL_FILL}
        fontSize="12"
      >
        {label}
      </text>
    </g>
  );
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
        <defs>
          {renderFilledArrowMarker("mapping-arrow-default", "rgba(231,238,248,1)")}
          {renderFilledArrowMarker("mapping-arrow-red", "rgba(248,113,113,1)")}
        </defs>
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
          const stroke = arrow.stroke ?? "rgba(231,238,248,1)";
          const marker = stroke.includes("248,113,113")
            ? "url(#mapping-arrow-red)"
            : "url(#mapping-arrow-default)";
          return (
            <g key={`arrow-${idx}`}>
              <path d={`M198 ${y1} L562 ${y2}`} fill="none" stroke={stroke} strokeWidth="3" markerEnd={marker} />
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

            <path d="M180 85 L300 85" stroke="rgba(231,238,248,1)" strokeWidth="3" strokeDasharray="4 6" />
            <path d="M455 85 L575 85" stroke="rgba(231,238,248,1)" strokeWidth="3" strokeDasharray="4 6" />
            <path d="M288 76 L300 85 L288 94" stroke="rgba(231,238,248,1)" strokeWidth="3" fill="none" />
            <path d="M563 76 L575 85 L563 94" stroke="rgba(231,238,248,1)" strokeWidth="3" fill="none" />

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
              <defs>
                {renderAxisArrowMarker("line-graph-axis-arrow", "rgba(231,238,248,1)")}
              </defs>
              <line x1="90" y1="452" x2="710" y2="452" stroke="rgba(231,238,248,1)" strokeWidth="2" markerEnd="url(#line-graph-axis-arrow)" />
              <line x1="90" y1="452" x2="90" y2="62" stroke="rgba(231,238,248,1)" strokeWidth="2" markerEnd="url(#line-graph-axis-arrow)" />

              {[0, 1, 2, 3, 4].map((tick) => {
                const x = 90 + tick * 140;
                return renderXAxisTick({
                  key: `x-${tick}`,
                  x,
                  axisY: 452,
                  label: tick,
                  labelOffset: 38,
                });
              })}

              {[0, 2, 4, 6, 8].map((tick) => {
                const y = 452 - tick * 48;
                return (
                  <g key={`y-${tick}`}>
                    <line x1="82" y1={y} x2="90" y2={y} stroke={AXIS_TICK_STROKE} strokeWidth="1.1" />
                    <line x1="90" y1={y} x2="710" y2={y} stroke="rgba(231,238,248,0.12)" strokeWidth="1" strokeDasharray="5 7" />
                    <text x="72" y={y + 4} textAnchor="end" fill={AXIS_LABEL_FILL} fontSize="12">
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
            <svg viewBox="0 0 700 430" className="h-auto w-full">
              <defs>
                {renderAxisArrowMarker("vector-basic-axis-arrow")}
                {renderFilledArrowMarker("vector-basic-vector-arrow", "rgba(231,238,248,1)")}
              </defs>
              <line x1="110" y1="340" x2="590" y2="340" stroke="rgba(231,238,248,1)" strokeWidth="2" markerEnd="url(#vector-basic-axis-arrow)" />
              <line x1="110" y1="340" x2="110" y2="60" stroke="rgba(231,238,248,1)" strokeWidth="2" markerEnd="url(#vector-basic-axis-arrow)" />

              {[1, 2, 3, 4].map((tick) => {
                const x = 110 + tick * 90;
                return renderXAxisTick({
                  key: `vector-basic-x-${tick}`,
                  x,
                  axisY: 340,
                  label: tick,
                  labelOffset: 34,
                });
              })}

              {[1, 2, 3].map((tick) => {
                const y = 340 - tick * 90;
                return renderYAxisTick({
                  key: `vector-basic-y-${tick}`,
                  axisX: 110,
                  y,
                  label: tick,
                  labelOffset: 22,
                });
              })}

              <path d="M110 340 L278 256" stroke="rgba(231,238,248,1)" strokeWidth="1.8" fill="none" markerEnd="url(#vector-basic-vector-arrow)" />

              <path d="M290 340 L290 250" stroke="rgba(244,114,182,0.68)" strokeWidth="1.25" strokeDasharray="5 5" />

              <circle cx="110" cy="340" r="5.5" fill="#ffffff" />
              <circle cx="290" cy="250" r="7" fill="#22d3ee" />
              <circle cx="290" cy="250" r="12" fill="none" stroke="rgba(34,211,238,0.26)" strokeWidth="2" />

              <text x="596" y="374" fill="#22d3ee" fontSize="14" fontWeight="700">x</text>
              <text x="96" y="52" fill="#f472b6" fontSize="14" fontWeight="700">y</text>
              <text x="290" y="232" textAnchor="middle" fill="#22d3ee" fontSize="14" fontWeight="700">v</text>
              <text x="210" y="330" textAnchor="middle" fill="#22d3ee" fontSize="13" fontWeight="700">+2 in x</text>
              <text x="302" y="296" fill="#f472b6" fontSize="13" fontWeight="700">+1 in y</text>
            </svg>
          </div>
        )}

        {variant === "vector-addition" && (
          <div className="relative">
            <svg viewBox="0 0 700 430" className="h-auto w-full">
              <defs>
                {renderAxisArrowMarker("vector-addition-axis-arrow")}
                {renderFilledArrowMarker("vector-addition-blue-arrow", "rgba(34,211,238,1)")}
                {renderFilledArrowMarker("vector-addition-pink-arrow", "rgba(244,114,182,1)")}
                {renderFilledArrowMarker("vector-addition-white-arrow", "rgba(231,238,248,1)")}
              </defs>
              <line x1="140" y1="340" x2="580" y2="340" stroke="rgba(231,238,248,1)" strokeWidth="2" markerEnd="url(#vector-addition-axis-arrow)" />
              <line x1="140" y1="340" x2="140" y2="80" stroke="rgba(231,238,248,1)" strokeWidth="2" markerEnd="url(#vector-addition-axis-arrow)" />

              {[1, 2, 3, 4].map((tick) => {
                const x = 140 + tick * 85;
                return renderXAxisTick({
                  key: `vector-addition-x-${tick}`,
                  x,
                  axisY: 340,
                  label: tick,
                  labelOffset: 34,
                });
              })}

              {[1, 2, 3].map((tick) => {
                const y = 340 - tick * 80;
                return renderYAxisTick({
                  key: `vector-addition-y-${tick}`,
                  axisX: 140,
                  y,
                  label: tick,
                  labelOffset: 22,
                });
              })}

              <path d="M140 340 L294 268" stroke="rgba(34,211,238,1)" strokeWidth="1.9" fill="none" markerEnd="url(#vector-addition-blue-arrow)" />
              <path d="M140 340 L217 194" stroke="rgba(244,114,182,1)" strokeWidth="1.9" fill="none" markerEnd="url(#vector-addition-pink-arrow)" />
              <path d="M140 340 L382 112" stroke="rgba(231,238,248,1)" strokeWidth="2" fill="none" markerEnd="url(#vector-addition-white-arrow)" />
              <path d="M310 260 L395 100" stroke="rgba(244,114,182,0.72)" strokeWidth="1.4" strokeDasharray="6 5" fill="none" />
              <path d="M225 180 L395 100" stroke="rgba(34,211,238,0.72)" strokeWidth="1.4" strokeDasharray="6 5" fill="none" />

              <circle cx="140" cy="340" r="5.5" fill="#ffffff" />
              <circle cx="310" cy="260" r="7" fill="#22d3ee" />
              <circle cx="310" cy="260" r="12" fill="none" stroke="rgba(34,211,238,0.26)" strokeWidth="2" />
              <circle cx="225" cy="180" r="7" fill="#f472b6" />
              <circle cx="225" cy="180" r="12" fill="none" stroke="rgba(244,114,182,0.26)" strokeWidth="2" />
              <circle cx="395" cy="100" r="6.5" fill="#ffffff" />
              <circle cx="395" cy="100" r="11" fill="none" stroke="rgba(231,238,248,0.2)" strokeWidth="2" />

              <text x="310" y="242" textAnchor="middle" fill="#22d3ee" fontSize="14" fontWeight="700">v</text>
              <text x="225" y="162" textAnchor="middle" fill="#f472b6" fontSize="14" fontWeight="700">u</text>
              <text x="395" y="78" textAnchor="middle" fontSize="14" fontWeight="700">
                <tspan fill="#f472b6">u</tspan>
                <tspan fill="#ffffff"> + </tspan>
                <tspan fill="#22d3ee">v</tspan>
              </text>
              <text x="586" y="374" fill="#22d3ee" fontSize="14" fontWeight="700">x</text>
              <text x="126" y="72" fill="#f472b6" fontSize="14" fontWeight="700">y</text>
            </svg>
          </div>
        )}

        {variant === "vector-scaling" && (
          <div className="relative">
            <svg viewBox="0 0 700 430" className="h-auto w-full">
              <defs>
                {renderAxisArrowMarker("vector-scaling-axis-arrow")}
                {renderFilledArrowMarker("vector-scaling-vector-arrow", "rgba(231,238,248,1)")}
              </defs>
              <line x1="110" y1="340" x2="590" y2="340" stroke="rgba(231,238,248,1)" strokeWidth="2" markerEnd="url(#vector-scaling-axis-arrow)" />
              <line x1="110" y1="340" x2="110" y2="60" stroke="rgba(231,238,248,1)" strokeWidth="2" markerEnd="url(#vector-scaling-axis-arrow)" />

              {[1, 2, 3, 4].map((tick) => {
                const x = 110 + tick * 90;
                return renderXAxisTick({
                  key: `vector-scaling-x-${tick}`,
                  x,
                  axisY: 340,
                  label: tick,
                  labelOffset: 34,
                });
              })}

              {[1, 2, 3].map((tick) => {
                const y = 340 - tick * 90;
                return renderYAxisTick({
                  key: `vector-scaling-y-${tick}`,
                  axisX: 110,
                  y,
                  label: tick,
                  labelOffset: 22,
                });
              })}

              <path d="M110 340 L278 256" stroke="rgba(231,238,248,1)" strokeWidth="1.8" fill="none" markerEnd="url(#vector-scaling-vector-arrow)" />

              <path d="M110 340 L457 166" stroke="rgba(231,238,248,1)" strokeWidth="1.8" strokeDasharray="7 6" fill="none" markerEnd="url(#vector-scaling-vector-arrow)" />

              <circle cx="110" cy="340" r="5.5" fill="#ffffff" />
              <g>
                <circle cx="290" cy="250" r="6.5" fill="#22d3ee" />
                <circle cx="290" cy="250" r="10.5" fill="none" stroke="rgba(34,211,238,0.24)" strokeWidth="2" />
              </g>
              <g>
                <circle cx="470" cy="160" r="6.5" fill="#22d3ee" />
                <circle cx="470" cy="160" r="10.5" fill="none" stroke="rgba(34,211,238,0.24)" strokeWidth="2" />
              </g>

              <text x="290" y="232" textAnchor="middle" fill="#22d3ee" fontSize="14" fontWeight="700">v</text>
              <text x="470" y="142" textAnchor="middle" fill="#22d3ee" fontSize="14" fontWeight="700">2v</text>

              <text x="596" y="374" fill="#22d3ee" fontSize="14" fontWeight="700">x</text>
              <text x="96" y="52" fill="#f472b6" fontSize="14" fontWeight="700">y</text>
            </svg>
          </div>
        )}

        {variant === "pythagorean-triangle" && (
          <div className="relative">
            <svg viewBox="0 0 420 180" className="h-auto w-full">
              <defs>
                {renderFilledArrowMarker("pythag-side-arrow-a", "rgba(244,114,182,1)", {
                  markerWidth: 6,
                  markerHeight: 6,
                  refX: 5.2,
                  refY: 3,
                })}
                {renderFilledArrowMarker("pythag-side-arrow-b", "rgba(34,211,238,1)", {
                  markerWidth: 6,
                  markerHeight: 6,
                  refX: 5.2,
                  refY: 3,
                })}
                {renderFilledArrowMarker("pythag-side-arrow-c", "rgba(192,132,252,1)", {
                  markerWidth: 6,
                  markerHeight: 6,
                  refX: 5.2,
                  refY: 3,
                })}
              </defs>

              <g transform="translate(0 -18)">
                {/* Triangle geometry. Change these three points first if the overall shape needs to move or resize. */}
                <path
                  d="M92 156 L92 56 L306 156 Z"
                  fill="none"
                  stroke="rgba(231,238,248,1)"
                  strokeWidth="1.0"
                  strokeLinejoin="round"
                />
                {/* Right-angle marker at the bottom-left corner of the triangle. */}
                <path d="M92 142 L106 142 L106 156" fill="none" stroke="rgba(231,238,248,1)" strokeWidth="1.0" />

                {/* Split measurement arrows for side a. Use the repeated x values to move the whole pair left/right. */}
                <line x1="75" y1="90" x2="75" y2="56" stroke="rgba(244,114,182,1)" strokeWidth="1.0" markerEnd="url(#pythag-side-arrow-a)" />
                <line x1="75" y1="122" x2="75" y2="156" stroke="rgba(244,114,182,1)" strokeWidth="1.0" markerEnd="url(#pythag-side-arrow-a)" />

                {/* Split measurement arrows for side b. The gap between the arrows leaves room for the b label. */}
                <line x1="182" y1="172" x2="92" y2="172" stroke="rgba(34,211,238,1)" strokeWidth="1.0" markerEnd="url(#pythag-side-arrow-b)" />
                <line x1="216" y1="172" x2="306" y2="172" stroke="rgba(34,211,238,1)" strokeWidth="1.0" markerEnd="url(#pythag-side-arrow-b)" />

                {/* Split measurement arrows for side c. These are intentionally offset from the hypotenuse so the c label can sit above them. */}
                <line x1="194" y1="83" x2="100" y2="39" stroke="rgba(192,132,252,1)" strokeWidth="1.0" markerEnd="url(#pythag-side-arrow-c)" />
                <line x1="222" y1="97" x2="314" y2="141" stroke="rgba(192,132,252,1)" strokeWidth="1.0" markerEnd="url(#pythag-side-arrow-c)" />

                {/* Side labels are positioned with foreignObject x/y only; width/height rarely need touching. */}
                <foreignObject x="63" y="90" width="24" height="28">
                  <div className="flex h-full items-center justify-center text-center">
                    <MathInline
                      tex={String.raw`a`}
                      className="math-inline math-white text-sm"
                    />
                  </div>
                </foreignObject>

                <foreignObject x="187" y="158" width="24" height="28">
                  <div className="flex h-full items-center justify-center text-center">
                    <MathInline
                      tex={String.raw`b`}
                      className="math-inline math-white text-sm"
                    />
                  </div>
                </foreignObject>

                <foreignObject x="195" y="75" width="24" height="28">
                  <div className="flex h-full items-center justify-center text-center">
                    <MathInline
                      tex={String.raw`c`}
                      className="math-inline math-white text-sm"
                    />
                  </div>
                </foreignObject>
              </g>
            </svg>
          </div>
        )}

        {variant === "vector-magnitude" && (
          <div className="relative">
            <svg viewBox="0 48 540 362" className="h-auto w-full">
              <defs>
                {renderAxisArrowMarker("vector-magnitude-axis-arrow")}
                {renderFilledArrowMarker("vector-magnitude-vector-arrow", "rgba(231,238,248,1)")}
              </defs>
              {/* Magnitude plot uses 64 units per grid step on both axes, so x/y distances stay visually square. */}
              <line x1="80" y1="340" x2="474" y2="340" stroke="rgba(231,238,248,1)" strokeWidth="1" markerEnd="url(#vector-magnitude-axis-arrow)" />
              <line x1="80" y1="340" x2="80" y2="90" stroke="rgba(231,238,248,1)" strokeWidth="1" markerEnd="url(#vector-magnitude-axis-arrow)" />

              {[1, 2, 3, 4, 5].map((tick) => {
                const x = 80 + tick * 64;
                return renderXAxisTick({
                  key: `vector-magnitude-x-${tick}`,
                  x,
                  axisY: 340,
                  label: tick,
                  labelOffset: 34,
                });
              })}

              {[1, 2, 3].map((tick) => {
                const y = 340 - tick * 64;
                return renderYAxisTick({
                  key: `vector-magnitude-y-${tick}`,
                  axisX: 80,
                  y,
                  label: tick,
                  labelOffset: 22,
                });
              })}

              {/* Main vector from origin to (4,3). Endpoint circle is centered at (336,148). */}
              <path d="M80 340 L330.4 152.2" stroke="rgba(231,238,248,1)" strokeWidth="2" fill="none" markerEnd="url(#vector-magnitude-vector-arrow)" />
              <path d="M336 340 L336 148" stroke="rgba(148,163,184,0.88)" strokeWidth="1.5" strokeDasharray="6 5" fill="none" />
              <path d="M336 326 L322 326 L322 340" fill="none" stroke="rgba(231,238,248,1)" strokeWidth="2" />

              <circle cx="80" cy="340" r="5.5" fill="#ffffff" />
              <circle cx="336" cy="148" r="7" fill="#22d3ee" />
              <circle cx="336" cy="148" r="12" fill="none" stroke="rgba(34,211,238,0.26)" strokeWidth="2" />

              <text x="208" y="328" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="700">4</text>
              <text x="350" y="246" fill="#ffffff" fontSize="13" fontWeight="700">3</text>
              <text x="336" y="128" textAnchor="middle" fill="#22d3ee" fontSize="14" fontWeight="700">v</text>
              <text x="498" y="376" fill="#22d3ee" fontSize="14" fontWeight="700">x</text>
              <text x="66" y="82" fill="#f472b6" fontSize="14" fontWeight="700">y</text>

              {/* Magnitude label. Move x/y here when the label should shift without changing the vector itself. */}
              <foreignObject x="155" y="207" width="92" height="24">
                <div className="flex h-full items-center justify-center text-center">
                  <MathInline
                    tex={String.raw`\left\|{\color{#22d3ee}\mathbf{v}}\right\|`}
                    className="math-inline math-white text-base"
                  />
                </div>
              </foreignObject>
            </svg>
          </div>
        )}

        {variant === "vector-distance" && (
          <div className="relative">
            <svg viewBox="0 0 580 430" className="h-auto w-full">
              <defs>
                {renderAxisArrowMarker("vector-distance-axis-arrow")}
              </defs>
              {/* Distance plot also uses 64 units per grid step to keep the right triangle visually honest. */}
              <line x1="80" y1="360" x2="522" y2="360" stroke="rgba(231,238,248,1)" strokeWidth="2" markerEnd="url(#vector-distance-axis-arrow)" />
              <line x1="80" y1="360" x2="80" y2="40" stroke="rgba(231,238,248,1)" strokeWidth="2" markerEnd="url(#vector-distance-axis-arrow)" />

              {[1, 2, 3, 4, 5, 6].map((tick) => {
                const x = 80 + tick * 64;
                return renderXAxisTick({
                  key: `vector-distance-x-${tick}`,
                  x,
                  axisY: 360,
                  label: tick,
                  labelOffset: 34,
                });
              })}

              {[1, 2, 3, 4].map((tick) => {
                const y = 360 - tick * 64;
                return renderYAxisTick({
                  key: `vector-distance-y-${tick}`,
                  axisX: 80,
                  y,
                  label: tick,
                  labelOffset: 22,
                });
              })}

              {/* Segment from A=(1,1) to B=(5,4). Keep point coordinates and dashed-guide coordinates in sync. */}
              <path d="M144 296 L400 104" stroke="rgba(231,238,248,1)" strokeWidth="2" fill="none" />
              <path d="M144 296 L400 296" stroke="rgba(148,163,184,0.88)" strokeWidth="1.5" strokeDasharray="6 5" fill="none" />
              <path d="M400 296 L400 104" stroke="rgba(148,163,184,0.88)" strokeWidth="1.5" strokeDasharray="6 5" fill="none" />
              <path d="M400 282 L386 282 L386 296" fill="none" stroke="rgba(231,238,248,1)" strokeWidth="2" />

              <circle cx="144" cy="296" r="7" fill="#f472b6" />
              <circle cx="144" cy="296" r="12" fill="none" stroke="rgba(244,114,182,0.26)" strokeWidth="2" />
              <circle cx="400" cy="104" r="7" fill="#22d3ee" />
              <circle cx="400" cy="104" r="12" fill="none" stroke="rgba(34,211,238,0.26)" strokeWidth="2" />

              <text x="132" y="276" fill="#f472b6" fontSize="14" fontWeight="700">A</text>
              <text x="414" y="86" fill="#22d3ee" fontSize="14" fontWeight="700">B</text>
              <text x="272" y="286" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="700">4</text>
              <text x="414" y="208" fill="#ffffff" fontSize="13" fontWeight="700">3</text>
              <text x="546" y="396" fill="#22d3ee" fontSize="14" fontWeight="700">x</text>
              <text x="66" y="32" fill="#f472b6" fontSize="14" fontWeight="700">y</text>

              {/* Distance label. Adjust only this foreignObject when the label placement is wrong relative to the diagonal. */}
              <foreignObject x="190" y="165" width="104" height="24">
                <div className="flex h-full items-center justify-center text-center">
                  <MathInline
                    tex={String.raw`\left\|{\color{#22d3ee}\mathbf{B}}-{\color{#f472b6}\mathbf{A}}\right\|`}
                    className="math-inline math-white text-sm"
                  />
                </div>
              </foreignObject>
            </svg>
          </div>
        )}

        {variant === "vector-normalization" && (
          <div className="relative">
            <svg viewBox="0 0 540 410" className="h-auto w-full">
              <defs>
                {renderAxisArrowMarker("vector-normalization-axis-arrow")}
                {renderFilledArrowMarker("vector-normalization-v-arrow", "rgba(231,238,248,1)")}
                {renderFilledArrowMarker("vector-normalization-unit-arrow", "rgba(244,114,182,1)")}
              </defs>
              {/* Normalization plot reuses the same 64-unit square grid as magnitude so the unit vector is comparable. */}
              <line x1="80" y1="340" x2="474" y2="340" stroke="rgba(231,238,248,1)" strokeWidth="2" markerEnd="url(#vector-normalization-axis-arrow)" />
              <line x1="80" y1="340" x2="80" y2="40" stroke="rgba(231,238,248,1)" strokeWidth="2" markerEnd="url(#vector-normalization-axis-arrow)" />

              {[1, 2, 3, 4, 5].map((tick) => {
                const x = 80 + tick * 64;
                return renderXAxisTick({
                  key: `vector-normalization-x-${tick}`,
                  x,
                  axisY: 340,
                  label: tick,
                  labelOffset: 34,
                });
              })}

              {[1, 2, 3, 4].map((tick) => {
                const y = 340 - tick * 64;
                return renderYAxisTick({
                  key: `vector-normalization-y-${tick}`,
                  axisX: 80,
                  y,
                  label: tick,
                  labelOffset: 22,
                });
              })}

              {/* White arrow is the original v; pink arrow is the normalized vector. Endpoints are shortened so arrow tips just touch the dots. */}
              <path d="M80 340 L330.4 152.2" stroke="rgba(231,238,248,0.82)" strokeWidth="2" fill="none" markerEnd="url(#vector-normalization-v-arrow)" />
              <path d="M80 340 L126 305.5" stroke="rgba(244,114,182,1)" strokeWidth="2" fill="none" markerEnd="url(#vector-normalization-unit-arrow)" />
              <path d="M336 340 L336 148" stroke="rgba(148,163,184,0.88)" strokeWidth="1.5" strokeDasharray="6 5" fill="none" />
              <path d="M336 326 L322 326 L322 340" fill="none" stroke="rgba(231,238,248,1)" strokeWidth="2" />

              <circle cx="80" cy="340" r="5.5" fill="#ffffff" />
              <circle cx="336" cy="148" r="7" fill="#22d3ee" />
              <circle cx="336" cy="148" r="12" fill="none" stroke="rgba(34,211,238,0.2)" strokeWidth="2" />
              <circle cx="131.2" cy="301.6" r="6.5" fill="#f472b6" />
              <circle cx="131.2" cy="301.6" r="11" fill="none" stroke="rgba(244,114,182,0.24)" strokeWidth="2" />

              <text x="336" y="128" textAnchor="middle" fill="#22d3ee" fontSize="14" fontWeight="700">v</text>
              <text x="208" y="328" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="700">4</text>
              <text x="350" y="246" fill="#ffffff" fontSize="13" fontWeight="700">3</text>
              <text x="498" y="376" fill="#22d3ee" fontSize="14" fontWeight="700">x</text>
              <text x="66" y="32" fill="#f472b6" fontSize="14" fontWeight="700">y</text>

              {/* Unit-vector magnitude label. This is independent from the pink point label, so move it here only. */}
              <foreignObject x="94" y="262" width="74" height="24">
                <div className="flex h-full items-center justify-center text-center">
                  <MathInline
                    tex={String.raw`\left\|\widehat{{\color{#f472b6}\mathbf{v}}}\right\|`}
                    className="math-inline math-white text-sm"
                  />
                </div>
              </foreignObject>
            </svg>
          </div>
        )}

        {variant === "vector-two" && (
          <div className="relative">
            <svg viewBox="0 0 700 430" className="h-auto w-full">
              <defs>
                {renderAxisArrowMarker("vector-two-axis-arrow")}
                {renderFilledArrowMarker("vector-two-vector-arrow", "rgba(231,238,248,1)")}
              </defs>
              <line x1="110" y1="340" x2="590" y2="340" stroke="rgba(231,238,248,1)" strokeWidth="2" markerEnd="url(#vector-two-axis-arrow)" />
              <line x1="110" y1="340" x2="110" y2="60" stroke="rgba(231,238,248,1)" strokeWidth="2" markerEnd="url(#vector-two-axis-arrow)" />

              {[1, 2, 3, 4].map((tick) => {
                const x = 110 + tick * 90;
                return renderXAxisTick({
                  key: `vector-two-x-${tick}`,
                  x,
                  axisY: 340,
                  label: tick,
                  labelOffset: 34,
                });
              })}

              {[1, 2, 3].map((tick) => {
                const y = 340 - tick * 90;
                return renderYAxisTick({
                  key: `vector-two-y-${tick}`,
                  axisX: 110,
                  y,
                  label: tick,
                  labelOffset: 22,
                });
              })}

              <path d="M110 340 L278 256" stroke="rgba(231,238,248,1)" strokeWidth="1.8" fill="none" markerEnd="url(#vector-two-vector-arrow)" />

              <path d="M110 340 L370 100" stroke="rgba(231,238,248,1)" strokeWidth="1.8" fill="none" markerEnd="url(#vector-two-vector-arrow)" />

              <circle cx="110" cy="340" r="5.5" fill="#ffffff" />

              <g>
                <circle cx="290" cy="250" r="7" fill="#22d3ee" />
                <circle cx="290" cy="250" r="12" fill="none" stroke="rgba(34,211,238,0.26)" strokeWidth="2" />
              </g>
              <g>
                <circle cx="380" cy="70" r="7" fill="#f472b6" />
                <circle cx="380" cy="70" r="12" fill="none" stroke="rgba(244,114,182,0.26)" strokeWidth="2" />
              </g>

              <text x="290" y="232" textAnchor="middle" fill="#22d3ee" fontSize="14" fontWeight="700">v</text>
              <text x="380" y="52" textAnchor="middle" fill="#f472b6" fontSize="14" fontWeight="700">u</text>

              <text x="596" y="374" fill="#22d3ee" fontSize="14" fontWeight="700">x</text>
              <text x="96" y="52" fill="#f472b6" fontSize="14" fontWeight="700">y</text>
            </svg>
          </div>
        )}

        {variant === "vector-3d" && (
          <div className="relative">
            <svg viewBox="0 0 760 430" className="h-auto w-full">
              <defs>
                {renderAxisArrowMarker("vector-3d-axis-arrow")}
                {renderFilledArrowMarker("vector-3d-vector-arrow", "rgba(231,238,248,1)", {
                  markerWidth: 7,
                  markerHeight: 7,
                  refX: 6.1,
                  refY: 3.5,
                })}
              </defs>

              <line x1="250" y1="320" x2="520" y2="320" stroke="rgba(231,238,248,1)" strokeWidth="2" markerEnd="url(#vector-3d-axis-arrow)" />
              <line x1="250" y1="320" x2="410" y2="185" stroke="rgba(231,238,248,1)" strokeWidth="2" markerEnd="url(#vector-3d-axis-arrow)" />
              <line x1="250" y1="320" x2="250" y2="90" stroke="rgba(231,238,248,1)" strokeWidth="2" markerEnd="url(#vector-3d-axis-arrow)" />

              {[1, 2, 3].map((tick) => {
                const x = 250 + tick * 58;
                return renderXAxisTick({
                  key: `vector-3d-x-${tick}`,
                  x,
                  axisY: 320,
                  label: tick,
                  labelOffset: 26,
                });
              })}

              {[1, 2].map((tick) => {
                const x = 250 + tick * 36;
                const y = 320 - tick * 30;
                return (
                  <g key={`vector-3d-y-${tick}`}>
                    <line x1={x} y1={y} x2={x + 8} y2={y - 8} stroke={AXIS_TICK_STROKE} strokeWidth="1.1" />
                    <text x={x + 16} y={y + 2} fill={AXIS_LABEL_FILL} fontSize="12">{tick}</text>
                  </g>
                );
              })}

              {[1, 2, 3, 4].map((tick) => {
                const y = 320 - tick * 48;
                return renderYAxisTick({
                  key: `vector-3d-z-${tick}`,
                  axisX: 250,
                  y,
                  label: tick,
                  labelOffset: 18,
                });
              })}

              <path d="M250 320 L402 98" stroke="rgba(231,238,248,1)" strokeWidth="2" fill="none" markerEnd="url(#vector-3d-vector-arrow)" />
              <path d="M250 320 L366 320" stroke="rgba(34,211,238,0.22)" strokeWidth="1.4" strokeDasharray="5 5" />
              <path d="M366 320 L402 290" stroke="rgba(244,114,182,0.22)" strokeWidth="1.4" strokeDasharray="5 5" />
              <path d="M402 290 L402 98" stroke="rgba(231,238,248,0.18)" strokeWidth="1.4" strokeDasharray="5 5" />

              <circle cx="250" cy="320" r="5.5" fill="#ffffff" />
              <circle cx="402" cy="98" r="7" fill="#22d3ee" />
              <circle cx="402" cy="98" r="12" fill="none" stroke="rgba(34,211,238,0.26)" strokeWidth="2" />

              <text x="408" y="84" fill="#22d3ee" fontSize="14" fontWeight="700">x</text>
              <text x="528" y="336" fill="#22d3ee" fontSize="14" fontWeight="700">x₁</text>
              <text x="420" y="182" fill="#f472b6" fontSize="14" fontWeight="700">x₂</text>
              <text x="262" y="84" fill="#86efac" fontSize="14" fontWeight="700">x₃</text>
            </svg>
          </div>
        )}

        {variant === "coordinate-plane-basic" && (
          <div className="relative">
            <svg viewBox="0 0 760 560" className="h-auto w-full">
              <defs>
                {renderAxisArrowMarker("coordinate-basic-axis-arrow", "rgba(231,238,248,1)")}
              </defs>
              <line x1="120" y1="280" x2="640" y2="280" stroke="rgba(231,238,248,1)" strokeWidth="2" markerEnd="url(#coordinate-basic-axis-arrow)" />
              <line x1="380" y1="520" x2="380" y2="40" stroke="rgba(231,238,248,1)" strokeWidth="2" markerEnd="url(#coordinate-basic-axis-arrow)" />

              {[-4, -3, -2, -1, 1, 2, 3, 4].map((tick) => {
                const x = 380 + tick * 48;
                return renderXAxisTick({
                  key: `xtick-${tick}`,
                  x,
                  axisY: 280,
                  label: tick,
                  labelOffset: 26,
                });
              })}

              {[-4, -3, -2, -1, 1, 2, 3, 4].map((tick) => {
                const y = 280 - tick * 48;
                return renderYAxisTick({
                  key: `ytick-${tick}`,
                  axisX: 380,
                  y,
                  label: tick,
                  labelOffset: 20,
                });
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
              <text x="368" y="36" fill="#f472b6" fontSize="14" fontWeight="700">y</text>
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
              <defs>
                {renderAxisArrowMarker("coordinate-move-axis-arrow", "rgba(231,238,248,1)")}
              </defs>
              <line x1="28" y1="360" x2="540" y2="360" stroke="rgba(231,238,248,1)" strokeWidth="2" markerEnd="url(#coordinate-move-axis-arrow)" />
              <line x1="220" y1="440" x2="220" y2="80" stroke="rgba(231,238,248,1)" strokeWidth="2" markerEnd="url(#coordinate-move-axis-arrow)" />

              {[-3, -2, -1, 1, 2, 3, 4, 5, 6].map((tick) => {
                const x = 220 + tick * 48;
                return renderXAxisTick({
                  key: `coordinate-move-x-${tick}`,
                  x,
                  axisY: 360,
                  label: tick,
                  labelOffset: 28,
                });
              })}

              {[-1, 1, 2, 3, 4, 5].map((tick) => {
                const y = 360 - tick * 48;
                return renderYAxisTick({
                  key: `coordinate-move-y-${tick}`,
                  axisX: 220,
                  y,
                  label: tick,
                  labelOffset: 20,
                });
              })}

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
              <text x="208" y="76" fill="#f472b6" fontSize="14" fontWeight="700">y</text>
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
              { from: 0, to: 0, stroke: "rgba(248,113,113,1)" },
              { from: 0, to: 1, stroke: "rgba(248,113,113,1)" },
              { from: 1, to: 1, stroke: "rgba(231,238,248,1)" },
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
