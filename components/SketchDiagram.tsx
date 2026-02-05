type SketchDiagramProps = {
  title: string;
  caption?: string;
  variant:
    | "array"
    | "linked-list"
    | "stack-queue"
    | "hash"
    | "tree"
    | "heap"
    | "graph"
    | "table";
};

export default function SketchDiagram({
  title,
  caption,
  variant,
}: SketchDiagramProps) {
  return (
    <div className="sketch-panel rounded-2xl px-6 py-5">
      <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
        {title}
      </p>
      <div className="mt-4">
        {variant === "array" && (
          <svg viewBox="0 0 520 120" className="h-28 w-full">
            <g className="sketch-stroke">
              {[0, 1, 2, 3, 4].map((i) => (
                <rect
                  key={i}
                  x={30 + i * 90}
                  y={24}
                  width={70}
                  height={52}
                  rx={10}
                />
              ))}
              <rect x={210} y={18} width={160} height={64} rx={14} />
              <path d="M210 82 L210 92 L370 92 L370 82" />
            </g>
            <g className="sketch-label">
              {["5", "12", "7", "3", "9"].map((label, i) => (
                <text key={label} x={64 + i * 90} y={58}>
                  {label}
                </text>
              ))}
              <text x={248} y={108}>slice</text>
            </g>
          </svg>
        )}
        {variant === "linked-list" && (
          <svg viewBox="0 0 520 120" className="h-28 w-full">
            <g className="sketch-stroke">
              {[0, 1, 2].map((i) => (
                <rect
                  key={i}
                  x={40 + i * 150}
                  y={30}
                  width={110}
                  height={46}
                  rx={10}
                />
              ))}
              <path d="M150 53 L190 53" />
              <path d="M300 53 L340 53" />
              <path d="M185 46 L190 53 L185 60" />
              <path d="M335 46 L340 53 L335 60" />
            </g>
            <g className="sketch-label">
              {["head", "next", "tail"].map((label, i) => (
                <text key={label} x={75 + i * 150} y={58}>
                  {label}
                </text>
              ))}
            </g>
          </svg>
        )}
        {variant === "stack-queue" && (
          <svg viewBox="0 0 520 140" className="h-32 w-full">
            <g className="sketch-stroke">
              <rect x={40} y={20} width={120} height={90} rx={12} />
              <rect x={220} y={30} width={220} height={60} rx={12} />
              <path d="M60 35 L140 35" />
              <path d="M60 55 L140 55" />
              <path d="M60 75 L140 75" />
              <path d="M240 60 L400 60" />
              <path d="M400 50 L420 60 L400 70" />
              <path d="M200 60 L180 60 L195 50" />
            </g>
            <g className="sketch-label">
              <text x={70} y={115}>stack</text>
              <text x={260} y={115}>queue</text>
            </g>
          </svg>
        )}
        {variant === "hash" && (
          <svg viewBox="0 0 520 140" className="h-32 w-full">
            <g className="sketch-stroke">
              <rect x={40} y={30} width={120} height={70} rx={12} />
              <rect x={220} y={30} width={120} height={70} rx={12} />
              <rect x={360} y={30} width={120} height={70} rx={12} />
              <path d="M100 30 L100 15 L260 15 L260 30" />
              <path d="M260 30 L260 15 L420 15 L420 30" />
            </g>
            <g className="sketch-label">
              <text x={72} y={70}>api</text>
              <text x={245} y={70}>db</text>
              <text x={392} y={70}>cache</text>
            </g>
          </svg>
        )}
        {variant === "tree" && (
          <svg viewBox="0 0 520 160" className="h-36 w-full">
            <g className="sketch-stroke">
              <circle cx={260} cy={30} r={22} />
              <circle cx={170} cy={100} r={18} />
              <circle cx={350} cy={100} r={18} />
              <path d="M250 46 L185 84" />
              <path d="M270 46 L335 84" />
            </g>
            <g className="sketch-label">
              <text x={252} y={36}>2</text>
              <text x={164} y={106}>1</text>
              <text x={344} y={106}>3</text>
            </g>
          </svg>
        )}
        {variant === "heap" && (
          <svg viewBox="0 0 520 160" className="h-36 w-full">
            <g className="sketch-stroke">
              <circle cx={260} cy={30} r={22} />
              <circle cx={170} cy={100} r={18} />
              <circle cx={350} cy={100} r={18} />
              <path d="M250 46 L185 84" />
              <path d="M270 46 L335 84" />
              <rect x={238} y={8} width={44} height={44} rx={12} />
            </g>
            <g className="sketch-label">
              <text x={252} y={36}>1</text>
              <text x={164} y={106}>3</text>
              <text x={344} y={106}>5</text>
            </g>
          </svg>
        )}
        {variant === "graph" && (
          <svg viewBox="0 0 520 160" className="h-36 w-full">
            <g className="sketch-stroke">
              <circle cx={120} cy={80} r={18} />
              <circle cx={240} cy={40} r={18} />
              <circle cx={240} cy={120} r={18} />
              <circle cx={380} cy={80} r={18} />
              <path d="M138 72 L222 48" />
              <path d="M138 88 L222 112" />
              <path d="M258 48 L362 72" />
              <path d="M258 112 L362 88" />
            </g>
            <g className="sketch-label">
              <text x={114} y={86}>A</text>
              <text x={234} y={46}>B</text>
              <text x={234} y={126}>C</text>
              <text x={374} y={86}>D</text>
            </g>
          </svg>
        )}
        {variant === "table" && (
          <svg viewBox="0 0 520 160" className="h-36 w-full">
            <g className="sketch-stroke">
              <rect x={40} y={30} width={440} height={90} rx={12} />
              <path d="M40 60 L480 60" />
              <path d="M40 90 L480 90" />
              <path d="M180 30 L180 120" />
              <path d="M320 30 L320 120" />
            </g>
            <g className="sketch-label">
              <text x={70} y={52}>name</text>
              <text x={220} y={52}>role</text>
              <text x={360} y={52}>score</text>
              <text x={70} y={82}>ava</text>
              <text x={220} y={82}>analyst</text>
              <text x={360} y={82}>88</text>
            </g>
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
