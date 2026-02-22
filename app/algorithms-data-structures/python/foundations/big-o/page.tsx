import ArticleLayout from "@/components/ArticleLayout";
import BigONotation from "@/components/ads/BigONotation";
import ComplexityWalkthroughPlot from "@/components/ads/ComplexityWalkthroughPlot";
import CodeBlock from "@/components/CodeBlock";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
import { MathBlock, MathInline } from "@/components/Math";
import { adsPythonTopics } from "@/lib/adsTopics";

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

export default function BigOFoundationsPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "intro", label: "Introduction" },
    { id: "intuition", label: "Intuition" },
    { id: "notation", label: "What O(...) means" },
    { id: "math-primer", label: "Mini math primer" },
    { id: "growth-table", label: "Complexity reference table" },
    { id: "o1", label: "O(1) constant" },
    { id: "ologn", label: "O(log n) logarithmic" },
    { id: "on", label: "O(n) linear" },
    { id: "onlogn", label: "O(n log n) linearithmic" },
    { id: "on2", label: "O(n^2) quadratic" },
    { id: "space", label: "Space complexity" },
    { id: "worked", label: "Worked code examples" },
    { id: "summary", label: "Summary" },
    { id: "next", label: "What's next", level: 2 },
  ];

  return (
    <ArticleLayout
      eyebrow="CS - Python - Foundations"
      title="Big-O time and space (beginner foundation)"
      description="A thorough beginner guide to growth rates, mathematical intuition, and practical algorithm trade-offs."
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
          Big-O is the notation we use to describe how runtime or memory grows
          as input size grows. It is about scaling behavior, not stopwatch time
          on one machine.
        </p>
        <p>
          In interviews, this helps you compare candidate approaches quickly and
          justify why one structure or algorithm is more robust at larger input sizes.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          Think in terms of operation count. If input size doubles, how does
          work change? Does it stay similar, double, or explode much faster?
        </p>
        <p>
          That &quot;doubling test&quot; gives strong intuition before you touch formal
          notation.
        </p>
      </InfoPanel>

      <section id="notation" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          What O(...) means
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          If an algorithm runtime{" "}
          <MathInline tex={String.raw`T(n)`} className="math-inline !text-white" />{" "}
          grows no faster than a constant multiple of{" "}
          <MathInline tex={String.raw`f(n)`} className="math-inline !text-white" />,
          we write:
        </p>
        <MathBlock
          tex={String.raw`T(n)=O(f(n))`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We ignore constant factors and lower-order terms at large{" "}
          <MathInline tex={String.raw`n`} className="math-inline math-nvar" />:
        </p>
        <MathBlock
          tex={String.raw`3n+12=O(n), \qquad 5n^2+n=O(n^2)`}
          className="math-center math-lg text-white/90"
        />
      </section>

      <section id="math-primer" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Mini math primer
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          A helpful method is evaluating a growth function at two sizes, then
          comparing ratios. For example, if we double input from{" "}
          <MathInline tex={String.raw`n`} className="math-inline math-nvar" />{" "}
          to <MathInline tex={String.raw`2n`} className="math-inline !text-white" />:
        </p>
        <MathBlock
          tex={String.raw`\text{Linear: } \frac{T(2n)}{T(n)}=\frac{2n}{n}=2 \qquad \text{Quadratic: } \frac{(2n)^2}{n^2}=4`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          So linear doubles, while quadratic quadruples for the same doubling
          in input size.
        </p>
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
                <th className="py-2 pr-6 text-base font-semibold">Meaning as input grows</th>
                <th className="py-2 text-base font-semibold">Typical algorithm example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 pr-6"><BigONotation kind="o1" /></td>
                <td className="py-2 pr-6">Roughly constant operations regardless of input size.</td>
                <td className="py-2">Array indexing, hash-map lookup (average).</td>
              </tr>
              <tr>
                <td className="py-2 pr-6"><BigONotation kind="ologn" /></td>
                <td className="py-2 pr-6">Problem shrinks by a fixed factor each step.</td>
                <td className="py-2">Binary search.</td>
              </tr>
              <tr>
                <td className="py-2 pr-6"><BigONotation kind="on" /></td>
                <td className="py-2 pr-6">One pass through all items.</td>
                <td className="py-2">Linear scan, frequency count.</td>
              </tr>
              <tr>
                <td className="py-2 pr-6"><BigONotation kind="onlogn" /></td>
                <td className="py-2 pr-6">Near-linear with logarithmic overhead.</td>
                <td className="py-2">Merge sort, heap sort.</td>
              </tr>
              <tr>
                <td className="py-2 pr-6"><BigONotation kind="on2" /></td>
                <td className="py-2 pr-6">Nested comparisons can grow quickly.</td>
                <td className="py-2">Double loop pair checks.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="o1" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          <BigONotation kind="o1" /> constant
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Constant time means operation count does not grow with{" "}
          <MathInline tex={String.raw`n`} className="math-inline math-nvar" />.
          Reading <span className="font-mono inline-code">nums[3]</span> is one direct address lookup.
        </p>
        <MathBlock
          tex={String.raw`T(n)=1,\quad T(10)=1,\quad T(1000)=1`}
          className="math-center math-lg text-white/90"
        />
        <ComplexityWalkthroughPlot
          kind="o1"
          notation={<BigONotation kind="o1" />}
          tTex={String.raw`T(n)=1`}
        />
      </section>

      <section id="ologn" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          <BigONotation kind="ologn" /> logarithmic
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Logarithmic growth appears when each step keeps only a fraction of the
          problem, like halving a search interval.
        </p>
        <MathBlock
          tex={String.raw`T(n)=\log_2 n,\quad T(8)=3,\quad T(1024)=10`}
          className="math-center math-lg text-white/90"
        />
        <ComplexityWalkthroughPlot
          kind="ologn"
          notation={<BigONotation kind="ologn" />}
          tTex={String.raw`T(n)=\log_2 n`}
        />
      </section>

      <section id="on" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          <BigONotation kind="on" /> linear
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Linear growth means each extra element adds roughly one extra operation.
          This is common in scans, filters, and simple counting loops.
        </p>
        <MathBlock
          tex={String.raw`T(n)=n,\quad T(100)=100,\quad T(200)=200`}
          className="math-center math-lg text-white/90"
        />
        <ComplexityWalkthroughPlot
          kind="on"
          notation={<BigONotation kind="on" />}
          tTex={String.raw`T(n)=n`}
        />
      </section>

      <section id="onlogn" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          <BigONotation kind="onlogn" /> linearithmic
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Linearithmic growth is common in efficient sorting: you process all items
          across multiple logarithmic levels.
        </p>
        <MathBlock
          tex={String.raw`T(n)=n\log_2 n,\quad T(16)=64,\quad T(32)=160`}
          className="math-center math-lg text-white/90"
        />
        <ComplexityWalkthroughPlot
          kind="onlogn"
          notation={<BigONotation kind="onlogn" />}
          tTex={String.raw`T(n)=n\log_2 n`}
        />
      </section>

      <section id="on2" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          <BigONotation kind="on2" /> quadratic
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Quadratic growth often appears with nested loops over the same dataset.
          This can become costly quickly as data size grows.
        </p>
        <MathBlock
          tex={String.raw`T(n)=n^2,\quad T(50)=2500,\quad T(100)=10000`}
          className="math-center math-lg text-white/90"
        />
        <ComplexityWalkthroughPlot
          kind="on2"
          notation={<BigONotation kind="on2" />}
          tTex={String.raw`T(n)=n^2`}
        />
      </section>

      <section id="space" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Space complexity
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Space complexity measures additional memory beyond the input.
          A copied array of size{" "}
          <MathInline tex={String.raw`n`} className="math-inline math-nvar" />{" "}
          is usually <BigONotation kind="on" /> space, while in-place swaps are
          often <BigONotation kind="o1" /> space.
        </p>
        <MathBlock
          tex={String.raw`\text{new array of size }n \Rightarrow S(n)=n \Rightarrow O(n)`}
          className="math-center math-lg text-white/90"
        />
      </section>

      <section id="worked" className="scroll-mt-28 grid gap-6">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Worked code examples
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Same task, different structure choice: finding one value in housing data.
        </p>

        <section className="grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Example A: linear scan over a list
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Worst-case runtime is <BigONotation kind="on" /> because the scan may inspect each
            element once.
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
            Lookup is usually <BigONotation kind="o1" />, while pre-building
            the map is <BigONotation kind="on" />.
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
          <li>Big-O is a scaling language, not just a notation exercise.</li>
          <li>Always connect notation to concrete growth behavior as n increases.</li>
          <li>Use time and space together when defending trade-offs.</li>
        </ul>
        <section id="next" className="grid gap-2">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            What&apos;s next
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Next move into arrays and start applying this complexity language to
            concrete operations and patterns.
          </p>
        </section>
      </section>
    </ArticleLayout>
  );
}

