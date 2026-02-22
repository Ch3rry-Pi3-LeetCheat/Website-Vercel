import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
import { MathBlock, MathInline } from "@/components/Math";
import { adsPythonTopics } from "@/lib/adsTopics";
import type { ReactNode } from "react";

const linearSearchCode = `nums = [52, 68, 75, 90, 110, 130, 145, 160]
target = 145

checks = 0
found_idx = -1

for i, value in enumerate(nums):
    checks += 1
    if value == target:
        found_idx = i
        break

print(found_idx, checks)`;

const linearSearchOutput = `6 7`;

const hashLookupCode = `index_by_value = {
    52: 0, 68: 1, 75: 2, 90: 3,
    110: 4, 130: 5, 145: 6, 160: 7
}

target = 145
idx = index_by_value.get(target, -1)

print(idx)`;

const hashLookupOutput = `6`;

function BigONotation({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono whitespace-nowrap">
      <span className="text-pink-300">O</span>
      <span className="text-white">(</span>
      {children}
      <span className="text-white">)</span>
    </span>
  );
}

function NVar() {
  return <span className="text-cyan-300">n</span>;
}

function BigOGrowthChart() {
  const width = 640;
  const height = 260;
  const padLeft = 46;
  const padRight = 20;
  const padTop = 18;
  const padBottom = 36;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;
  const nValues = Array.from({ length: 11 }, (_, i) => i);
  const maxY = 100;

  const x = (n: number) => padLeft + (n / 10) * plotW;
  const y = (v: number) => padTop + plotH - (v / maxY) * plotH;

  const points = (fn: (n: number) => number) =>
    nValues.map((n) => `${x(n)},${y(fn(n))}`).join(" ");

  const lineConstant = points(() => 8);
  const lineLogN = points((n) => (n === 0 ? 0 : 14 * Math.log2(n + 1)));
  const lineN = points((n) => 8 * n);
  const lineNLogN = points((n) => (n === 0 ? 0 : 3.3 * n * Math.log2(n + 1)));
  const lineN2 = points((n) => n * n);

  return (
    <div className="glass-panel rounded-2xl p-4">
      <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
        Visual growth
      </p>
      <p className="mt-2 text-sm text-[color:var(--color-muted)]">
        x-axis is input size <NVar />. y-axis is relative operation count.
      </p>
      <div className="mt-3 overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-[280px] min-w-[640px] w-full">
          {[0, 20, 40, 60, 80, 100].map((v) => (
            <line
              key={`gy-${v}`}
              x1={padLeft}
              y1={y(v)}
              x2={width - padRight}
              y2={y(v)}
              stroke="rgba(148,163,184,0.16)"
              strokeWidth="1"
            />
          ))}
          {[0, 2, 4, 6, 8, 10].map((n) => (
            <line
              key={`gx-${n}`}
              x1={x(n)}
              y1={padTop}
              x2={x(n)}
              y2={height - padBottom}
              stroke="rgba(148,163,184,0.16)"
              strokeWidth="1"
            />
          ))}

          <line
            x1={padLeft}
            y1={height - padBottom}
            x2={width - padRight}
            y2={height - padBottom}
            stroke="rgba(231,238,248,0.75)"
            strokeWidth="1.5"
          />
          <line
            x1={padLeft}
            y1={padTop}
            x2={padLeft}
            y2={height - padBottom}
            stroke="rgba(231,238,248,0.75)"
            strokeWidth="1.5"
          />

          <polyline points={lineConstant} fill="none" stroke="#67e8f9" strokeWidth="2.5" />
          <polyline points={lineLogN} fill="none" stroke="#22c55e" strokeWidth="2.5" />
          <polyline points={lineN} fill="none" stroke="#f59e0b" strokeWidth="2.5" />
          <polyline points={lineNLogN} fill="none" stroke="#a78bfa" strokeWidth="2.5" />
          <polyline points={lineN2} fill="none" stroke="#fb7185" strokeWidth="2.5" />

          {[0, 2, 4, 6, 8, 10].map((n) => (
            <text
              key={`label-n-${n}`}
              x={x(n)}
              y={height - padBottom + 18}
              textAnchor="middle"
              className="fill-white/70 text-[11px]"
            >
              {n}
            </text>
          ))}

          {[0, 20, 40, 60, 80, 100].map((v) => (
            <text
              key={`label-v-${v}`}
              x={padLeft - 8}
              y={y(v) + 4}
              textAnchor="end"
              className="fill-white/65 text-[11px]"
            >
              {v}
            </text>
          ))}

          <text x={width - 8} y={height - 8} textAnchor="end" className="fill-cyan-300 text-[12px]">
            n
          </text>
          <text x={14} y={padTop + 2} className="fill-white/80 text-[12px]">
            operations
          </text>
        </svg>
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[color:var(--color-muted)]">
        <span className="text-cyan-300">O(1)</span>
        <span className="text-green-400">O(log n)</span>
        <span className="text-amber-400">O(n)</span>
        <span className="text-violet-300">O(n log n)</span>
        <span className="text-rose-400">O(n^2)</span>
      </div>
    </div>
  );
}

export default function BigOFoundationsPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "intro", label: "Introduction" },
    { id: "intuition", label: "Intuition" },
    { id: "notation", label: "What O(...) means" },
    { id: "growth-plot", label: "Growth visual" },
    { id: "growth-table", label: "Complexity reference table" },
    { id: "o1", label: "O(1) constant" },
    { id: "ologn", label: "O(log n) logarithmic" },
    { id: "on", label: "O(n) linear" },
    { id: "onlogn", label: "O(n log n) linearithmic" },
    { id: "on2", label: "O(n^2) quadratic" },
    { id: "space", label: "Space complexity" },
    { id: "worked", label: "Worked examples" },
    { id: "summary", label: "Summary" },
    { id: "next", label: "What's next", level: 2 },
  ];

  return (
    <ArticleLayout
      eyebrow="CS - Python - Foundations"
      title="Big-O time and space (beginner foundation)"
      description="How to reason about algorithm cost as input size grows, so your structure and pattern choices are deliberate."
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[{ title: "Within CS (Python)", links: adsPythonTopics }]}
          activeHref="/algorithms-data-structures/python/foundations/big-o"
        />
      }
    >
      <InfoPanel id="intro" title="Introduction" variant="intro">
        <p>
          Big-O is the language for describing how an algorithm scales as input
          size grows. We are measuring growth shape, not exact runtime on one
          computer.
        </p>
        <p>
          In interviews, this helps you justify trade-offs clearly: faster time
          for more memory, or lower memory with slower scans.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          Imagine checking books on a shelf. If doubling shelf size roughly doubles
          your checks, that is linear growth. If checks barely increase, growth is slower.
        </p>
        <p>
          Big-O answers: what happens to work when <NVar /> becomes much larger?
        </p>
      </InfoPanel>

      <section id="notation" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          What O(...) means
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          If runtime grows no faster than a constant multiple of{" "}
          <MathInline tex={String.raw`f(n)`} className="math-inline !text-white" />,
          we write:
        </p>
        <MathBlock
          tex={String.raw`T(n) = O(f(n))`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We drop constants and lower-order terms for large <NVar /> because the
          highest-growth term dominates:
        </p>
        <MathBlock
          tex={String.raw`3n + 12 = O(n), \quad 5n^2 + n = O(n^2)`}
          className="math-center math-lg text-white/90"
        />
      </section>

      <section id="growth-plot" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Growth visual
        </h2>
        <BigOGrowthChart />
      </section>

      <section id="growth-table" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Complexity reference table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm text-[color:var(--color-muted)]">
            <thead>
              <tr className="text-white">
                <th className="py-2 pr-6 text-base font-semibold">Time complexity</th>
                <th className="py-2 pr-6 text-base font-semibold">What it means in practice</th>
                <th className="py-2 text-base font-semibold">Typical example algorithm</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 pr-6"><BigONotation>1</BigONotation></td>
                <td className="py-2 pr-6">Work stays roughly constant regardless of input size.</td>
                <td className="py-2">Array index access, hash-map lookup (average).</td>
              </tr>
              <tr>
                <td className="py-2 pr-6">
                  <BigONotation>
                    <span className="text-white">log </span><NVar />
                  </BigONotation>
                </td>
                <td className="py-2 pr-6">Search space shrinks each step by a constant factor.</td>
                <td className="py-2">Binary search on sorted data.</td>
              </tr>
              <tr>
                <td className="py-2 pr-6"><BigONotation><NVar /></BigONotation></td>
                <td className="py-2 pr-6">One full pass over all elements.</td>
                <td className="py-2">Linear scan for a target value.</td>
              </tr>
              <tr>
                <td className="py-2 pr-6">
                  <BigONotation>
                    <NVar /> <span className="text-white">log </span><NVar />
                  </BigONotation>
                </td>
                <td className="py-2 pr-6">Repeated divide-and-combine plus linear work per level.</td>
                <td className="py-2">Merge sort / heap sort.</td>
              </tr>
              <tr>
                <td className="py-2 pr-6">
                  <BigONotation>
                    <NVar />
                    <sup className="text-cyan-300">2</sup>
                  </BigONotation>
                </td>
                <td className="py-2 pr-6">Pairwise or nested loop comparisons over same data.</td>
                <td className="py-2">Naive all-pairs duplicate check.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="o1" className="scroll-mt-28 grid gap-3">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          <BigONotation>1</BigONotation> constant
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Constant time means operation count does not depend on <NVar />.
          Even if the array grows, reading <span className="font-mono inline-code">nums[3]</span> is still one direct access.
        </p>
      </section>

      <section id="ologn" className="scroll-mt-28 grid gap-3">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          <BigONotation>
            <span className="text-white">log </span><NVar />
          </BigONotation>{" "}
          logarithmic
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Logarithmic time appears when each step discards a fraction of the remaining problem.
          Binary search is the classic example: after each comparison, you keep only half.
        </p>
      </section>

      <section id="on" className="scroll-mt-28 grid gap-3">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          <BigONotation><NVar /></BigONotation> linear
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Linear time means one pass through data. If <NVar /> doubles, work roughly doubles.
          This is typical for counting, filtering, and scanning.
        </p>
      </section>

      <section id="onlogn" className="scroll-mt-28 grid gap-3">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          <BigONotation>
            <NVar /> <span className="text-white">log </span><NVar />
          </BigONotation>{" "}
          linearithmic
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This often appears in efficient comparison-based sorting. You process all elements
          while also paying logarithmic levels of splitting/merging.
        </p>
      </section>

      <section id="on2" className="scroll-mt-28 grid gap-3">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          <BigONotation>
            <NVar />
            <sup className="text-cyan-300">2</sup>
          </BigONotation>{" "}
          quadratic
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Quadratic time usually means nested loops over the same dataset.
          These solutions can become expensive quickly as input grows.
        </p>
      </section>

      <section id="space" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Space complexity
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Space complexity measures extra memory beyond input storage. A copied array
          of size <NVar /> costs <BigONotation><NVar /></BigONotation> extra space,
          while in-place swaps are often <BigONotation>1</BigONotation>.
        </p>
      </section>

      <section id="worked" className="scroll-mt-28 grid gap-6">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Worked examples
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Same task, different structure choice: find one value in house floor-area data.
        </p>

        <section className="grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Example A: linear scan over a list
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            We check values one by one until we find the target. Worst case is{" "}
            <BigONotation><NVar /></BigONotation> time.
          </p>
          <CodeBlock code={linearSearchCode} title="Python" />
          <div className="mt-2">
            <OutputBlock output={linearSearchOutput} />
          </div>
        </section>

        <section className="grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Example B: dictionary lookup
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            We pre-build a value-to-index map. Lookup is usually{" "}
            <BigONotation>1</BigONotation>, but map creation is{" "}
            <BigONotation><NVar /></BigONotation>.
          </p>
          <CodeBlock code={hashLookupCode} title="Python" />
          <div className="mt-2">
            <OutputBlock output={hashLookupOutput} />
          </div>
        </section>
      </section>

      <section id="summary" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Summary
        </h2>
        <ul className="grid gap-2 text-sm text-[color:var(--color-muted)]">
          <li>Big-O is about growth shape, not exact stopwatch time.</li>
          <li>Time and space should be justified together, not separately.</li>
          <li>Complexity language helps you compare candidate solutions quickly.</li>
        </ul>
        <section id="next" className="grid gap-2">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            What&apos;s next
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Next move into arrays, then linked lists, stacks/queues, hash tables,
            trees, heaps, and graphs.
          </p>
        </section>
      </section>
    </ArticleLayout>
  );
}
