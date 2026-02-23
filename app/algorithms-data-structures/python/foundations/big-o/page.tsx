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
    { id: "intuition", label: "Core intuition" },
    { id: "notation", label: "What O(...) means" },
    { id: "what-not", label: "What Big-O is not" },
    { id: "equation-reading", label: "How to read equations" },
    { id: "math-primer", label: "Mini math primer" },
    { id: "workflow", label: "Code analysis workflow" },
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
      description="A conceptual, step-by-step guide to how runtime and memory grow as input grows."
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
          Big-O is a language for growth. It describes how work changes as input size{" "}
          <MathInline tex={String.raw`n`} className="math-inline math-nvar" /> grows.
        </p>
        <p>
          It is not a stopwatch reading on one laptop. It is a zoomed-out model that
          helps you compare solutions before implementation details.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Core intuition" variant="intuition">
        <p>
          Ask one question first: if input doubles, what happens to work? This
          &quot;doubling test&quot; creates intuition quickly.
        </p>
        <p>
          Roughly: <BigONotation kind="o1" /> stays flat, <BigONotation kind="on" /> doubles,
          <BigONotation kind="on2" /> trends toward quadrupling, and{" "}
          <BigONotation kind="ologn" /> adds only a small extra amount.
        </p>
      </InfoPanel>

      <section id="notation" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          What O(...) means
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Formally, saying <MathInline tex={String.raw`T(n)=O(f(n))`} className="math-inline !text-white" /> means
          there is some constant multiplier after some threshold where{" "}
          <MathInline tex={String.raw`T(n)`} className="math-inline !text-white" /> stays below that scaled{" "}
          <MathInline tex={String.raw`f(n)`} className="math-inline !text-white" />:
        </p>
        <MathBlock
          tex={String.raw`T(n)=O(f(n)) \iff \exists c>0,\exists n_0,\forall n\ge n_0:\ T(n)\le c\cdot f(n)`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          In plain English: after input gets large enough, the growth of{" "}
          <MathInline tex={String.raw`T(n)`} className="math-inline !text-white" /> is bounded by
          a scaled copy of <MathInline tex={String.raw`f(n)`} className="math-inline !text-white" />.
        </p>
      </section>

      <section id="what-not" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          What Big-O is not
        </h2>
        <ul className="grid gap-2 text-sm leading-6 text-[color:var(--color-muted)]">
          <li>It is not exact runtime in milliseconds.</li>
          <li>It is not a guarantee that one method is always faster for tiny inputs.</li>
          <li>It is not the full story without space complexity and constants.</li>
          <li>It is usually discussed as an upper bound, often for worst-case behavior unless stated otherwise.</li>
        </ul>
      </section>

      <section id="equation-reading" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          How to read lines like T(n)=n
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Those top equation lines are meant as a three-step reading guide:
          model, evaluate, compare growth.
        </p>
        <div className="grid gap-2 md:grid-cols-3 text-sm text-[color:var(--color-muted)]">
          <div className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2">
            <p className="text-white font-semibold">1) Model</p>
            <p>
              Write a growth model like{" "}
              <MathInline tex={String.raw`T(n)=n`} className="math-inline !text-white" />.
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2">
            <p className="text-white font-semibold">2) Evaluate</p>
            <p>
              Plug in concrete sizes such as{" "}
              <MathInline tex={String.raw`T(100)=100`} className="math-inline !text-white" />.
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2">
            <p className="text-white font-semibold">3) Compare growth</p>
            <p>
              Check doubling behavior, e.g.{" "}
              <MathInline tex={String.raw`T(200)=200`} className="math-inline !text-white" />.
            </p>
          </div>
        </div>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The purpose is not memorizing formulas. The purpose is building instinct for how cost scales.
        </p>
      </section>

      <section id="math-primer" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Mini math primer
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The ratio <MathInline tex={String.raw`\frac{T(2n)}{T(n)}`} className="math-inline !text-white" /> is a quick lens for growth:
        </p>
        <MathBlock
          tex={String.raw`\frac{T(2n)}{T(n)}=
\begin{cases}
1 & T(n)=1\\
\dfrac{\log_2(2n)}{\log_2(n)} & T(n)=\log_2 n\\
2 & T(n)=n\\
2\cdot\dfrac{\log_2(2n)}{\log_2(n)} & T(n)=n\log_2 n\\
4 & T(n)=n^2
\end{cases}`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This is why <BigONotation kind="onlogn" /> sits between <BigONotation kind="on" /> and{" "}
          <BigONotation kind="on2" />: doubling is more than 2x, less than 4x.
        </p>
      </section>

      <section id="workflow" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Code analysis workflow
        </h2>
        <ol className="grid gap-2 list-decimal pl-5 text-sm leading-6 text-[color:var(--color-muted)]">
          <li>Choose the input size variable (what exactly is n?).</li>
          <li>Count how many times each block can run as n grows.</li>
          <li>Add costs for sequential blocks, multiply costs for nested loops.</li>
          <li>Keep the dominant term for large n (drop constants and lower-order terms).</li>
          <li>Report time and extra space together.</li>
        </ol>
      </section>

      <section id="growth-table" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Complexity reference table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm text-[color:var(--color-muted)]">
            <thead>
              <tr className="text-white">
                <th className="py-2 pr-6 text-base font-semibold">Complexity</th>
                <th className="py-2 pr-6 text-base font-semibold">If input doubles...</th>
                <th className="py-2 pr-6 text-base font-semibold">Mental picture</th>
                <th className="py-2 text-base font-semibold">Typical example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 pr-6"><BigONotation kind="o1" /></td>
                <td className="py-2 pr-6">Work stays about the same.</td>
                <td className="py-2 pr-6">Direct access by address/key.</td>
                <td className="py-2">Array index, hash lookup (average).</td>
              </tr>
              <tr>
                <td className="py-2 pr-6"><BigONotation kind="ologn" /></td>
                <td className="py-2 pr-6">Only a small extra amount.</td>
                <td className="py-2 pr-6">Repeatedly cut problem size.</td>
                <td className="py-2">Binary search.</td>
              </tr>
              <tr>
                <td className="py-2 pr-6"><BigONotation kind="on" /></td>
                <td className="py-2 pr-6">Work roughly doubles.</td>
                <td className="py-2 pr-6">One full pass through items.</td>
                <td className="py-2">Linear scan, count frequencies.</td>
              </tr>
              <tr>
                <td className="py-2 pr-6"><BigONotation kind="onlogn" /></td>
                <td className="py-2 pr-6">A bit more than 2x.</td>
                <td className="py-2 pr-6">Process all items across log levels.</td>
                <td className="py-2">Merge sort, heap sort.</td>
              </tr>
              <tr>
                <td className="py-2 pr-6"><BigONotation kind="on2" /></td>
                <td className="py-2 pr-6">Trends toward 4x.</td>
                <td className="py-2 pr-6">Compare each item with many others.</td>
                <td className="py-2">Nested loop pair checks.</td>
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
          Constant time means the number of operations does not depend on{" "}
          <MathInline tex={String.raw`n`} className="math-inline math-nvar" />. Accessing
          one array position is still one direct lookup whether the array has 10 or 10 million elements.
        </p>
        <MathBlock
          tex={String.raw`T(n)=7,\quad T(100)=7,\quad T(200)=7`}
          className="math-center math-lg text-white/90"
        />
        <ComplexityWalkthroughPlot
          kind="o1"
          notation={<BigONotation kind="o1" />}
          tTex={String.raw`T(n)=7`}
        />
      </section>

      <section id="ologn" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          <BigONotation kind="ologn" /> logarithmic
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Logarithmic growth appears when each step removes a fixed fraction of remaining work.
          Binary search is the canonical example: every comparison halves the search interval.
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
          Linear growth means each extra item contributes a constant amount of extra work.
          A single full pass through data is usually linear.
        </p>
        <MathBlock
          tex={String.raw`T(n)=3n+5,\quad T(100)=305,\quad T(200)=605`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Big-O keeps the dominant growth term, so{" "}
          <MathInline tex={String.raw`3n+5=O(n)`} className="math-inline !text-white" />.
        </p>
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
          Linearithmic growth is common in efficient comparison sorting. You process all items
          but do so over logarithmic levels of splitting/merging.
        </p>
        <MathBlock
          tex={String.raw`T(n)=n\log_2 n,\quad T(16)=64,\quad T(64)=384`}
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
          Quadratic growth typically appears when each item is compared with many other items.
          Nested loops over the same dataset are a common source.
        </p>
        <MathBlock
          tex={String.raw`T(n)=2n^2+3n,\quad T(100)=20300,\quad T(200)=80600`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          For large n, the square term dominates, so{" "}
          <MathInline tex={String.raw`2n^2+3n=O(n^2)`} className="math-inline !text-white" />.
        </p>
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
          Space complexity is extra memory used beyond the input itself. Time can improve while space worsens,
          so treat them as a pair when evaluating trade-offs.
        </p>
        <MathBlock
          tex={String.raw`\text{copy array of size }n \Rightarrow S(n)=n\Rightarrow O(n),\qquad \text{in-place swap}\Rightarrow O(1)`}
          className="math-center math-lg text-white/90"
        />
      </section>

      <section id="worked" className="scroll-mt-28 grid gap-6">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Worked code examples
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Same task, different data structure choice: finding one value in housing data.
        </p>

        <section className="grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Example A: linear scan over a list
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Worst-case time is <BigONotation kind="on" /> because the loop may inspect each element once.
            Extra space is <BigONotation kind="o1" />.
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
            Querying is usually <BigONotation kind="o1" /> average-case, but building the dictionary is{" "}
            <BigONotation kind="on" />. This is the common trade-off: preprocessing for faster repeated queries.
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
          <li>Big-O is a growth model for large inputs, not a stopwatch number.</li>
          <li>The doubling question builds fast intuition: what happens when n becomes 2n?</li>
          <li>Read equations as model, evaluate, then compare growth.</li>
          <li>When analyzing code, define n clearly and track both time and extra space.</li>
        </ul>
        <section id="next" className="grid gap-2">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            What&apos;s next
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Move into arrays and apply this lens to concrete operations: indexing, insertion,
            deletion, scanning, and search patterns.
          </p>
        </section>
      </section>
    </ArticleLayout>
  );
}
