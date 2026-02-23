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
    { id: "notation", label: "What Big-O means" },
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
          Big-O is a language for growth. It tells you how runtime and memory
          scale as input size{" "}
          <MathInline tex={String.raw`n`} className="math-inline math-nvar" />{" "}
          gets larger.
        </p>
        <p>
          This lesson is designed to be practical and intuitive, not symbolic for
          the sake of symbols. We keep asking one concrete question: when data grows,
          how fast does the work grow?
        </p>
        <p>
          Why do we care? Because the same task can often be solved in more than one
          way. In other words, you may have multiple algorithms that all produce the
          same answer, but they do not all take the same amount of work.
        </p>
        <p>
          Big-O gives us a fair way to compare those choices. It helps you avoid
          picking an approach that feels fine on small inputs but becomes painfully
          slow when the data gets large.
        </p>
        <p>
          Here&apos;s the roadmap for this article and why each part matters:
        </p>
        <div className="ml-4 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 text-white font-semibold">Mental model</td>
                <td className="py-2">What Big-O is actually measuring, and what it is not.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 text-white font-semibold">Core intuition</td>
                <td className="py-2">How to reason with the doubling test instead of memorising rules.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 text-white font-semibold">Formal meaning</td>
                <td className="py-2">How to read the definition without it feeling abstract.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 text-white font-semibold">Mini math primer</td>
                <td className="py-2">A line-by-line ratio breakdown for common complexity classes.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 text-white font-semibold">Complexity families</td>
                <td className="py-2">Interactive plots for O(1), O(log n), O(n), O(n log n), O(n^2).</td>
              </tr>
              <tr>
                <td className="w-56 py-2 pr-4 text-white font-semibold">Code trade-offs</td>
                <td className="py-2">How two valid implementations can scale very differently.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          By the end, you should be able to look at a code pattern, identify
          its dominant growth behavior, and explain that behavior in plain English.
        </p>
        <p>
          If this page leaves you with clearer instincts and better technical
          language for runtime trade-offs, this introduction has done its job.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Core intuition" variant="intuition">
        <p>
          Before formulas, think in concrete actions. Algorithms do work by
          checking, comparing, moving, or storing values. Big-O asks how that
          work count changes when the amount of data changes.
        </p>
        <p>
          The fastest way to build intuition is the doubling test:
          if <MathInline tex={String.raw`n`} className="math-inline math-nvar" /> becomes{" "}
          <MathInline tex={String.raw`2n`} className="math-inline !text-white" />,
          does work stay similar, double, or jump much faster?
        </p>
        <div className="grid gap-3 text-base leading-7 text-[color:var(--color-muted)]">
          <div className="grid gap-2 md:grid-cols-[220px_minmax(0,1fr)]">
            <div className="text-white font-semibold">Dictionary lookup</div>
            <div>
              You jump directly by key. Doubling dataset size often barely changes query work:
              <BigONotation kind="o1" />.
            </div>
          </div>
          <div className="grid gap-2 md:grid-cols-[220px_minmax(0,1fr)]">
            <div className="text-white font-semibold">Binary search</div>
            <div>
              You repeatedly halve what remains. Even large growth in n adds only a small number
              of extra checks: <BigONotation kind="ologn" />.
            </div>
          </div>
          <div className="grid gap-2 md:grid-cols-[220px_minmax(0,1fr)]">
            <div className="text-white font-semibold">Linear scan</div>
            <div>
              You inspect items one by one. Twice as many items means roughly twice as much work:
              <BigONotation kind="on" />.
            </div>
          </div>
          <div className="grid gap-2 md:grid-cols-[220px_minmax(0,1fr)]">
            <div className="text-white font-semibold">All-pairs comparison</div>
            <div>
              Each item is compared with many others. Doubling n can push work toward 4x:
              <BigONotation kind="on2" />.
            </div>
          </div>
        </div>
        <p>
          This is the core pattern to keep in mind throughout the page:
          Big-O is not about exact seconds, it is about growth shape.
        </p>
      </InfoPanel>

      <section id="notation" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          What Big-O means
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Imagine we have a shopping list, and the task is to find one item,
          like apples.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          If the list has 10 items, we may need up to 10 checks. If the list has
          100 items, we may need up to 100 checks. Same task, but much more work
          as the input grows.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We usually call input size{" "}
          <MathInline tex={String.raw`n`} className="math-inline math-nvar" />.
          In this shopping-list example, if the list has 10 items then input size
          is 10; if the list has 100 items then input size is 100.
          Then we call the total amount of work{" "}
          <MathInline
            tex={String.raw`{\color{white}T({\color{#22d3ee}n})}`}
            className="math-inline math-white"
          />.
          Here, &quot;work&quot; can mean checks, comparisons, or loop iterations.
        </p>
        <MathBlock
          tex={String.raw`{\color{white}T({\color{#22d3ee}n})=\text{total work when input size is }{\color{#22d3ee}n}}`}
          className="math-center text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          For the shopping-list scan, work grows roughly one-for-one with n:
        </p>
        <MathBlock
          tex={String.raw`{\color{white}T({\color{#22d3ee}10})\approx 10,\qquad T({\color{#22d3ee}100})\approx 100}`}
          className="math-center text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          That is why we summarize this as{" "}
          <MathInline
            tex={String.raw`{\color{white}T({\color{#22d3ee}n})={\color{#f472b6}O}({\color{#22d3ee}n})}`}
            className="math-inline math-white"
          />.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Now imagine a different method for the same kind of task: if data is
          sorted, we can repeatedly cut the search range in half (binary search).
          That gives much slower growth in work:
        </p>
        <MathBlock
          tex={String.raw`{\color{white}T({\color{#22d3ee}10})\approx 4,\qquad T({\color{#22d3ee}100})\approx 7,\qquad T({\color{#22d3ee}n})={\color{#f472b6}O}(\log {\color{#22d3ee}n})}`}
          className="math-center text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This is the main reason Big-O is discussed: it helps you compare
          different algorithms for the same goal and choose the one that scales
          better as data grows.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          In general,{" "}
          <MathInline
            tex={String.raw`{\color{#f472b6}O}({\color{white}f({\color{#22d3ee}n})})`}
            className="math-inline math-white"
          />{" "}
          means:
          after input is big enough, total work grows no faster than a constant
          multiple of{" "}
          <MathInline
            tex={String.raw`{\color{white}f({\color{#22d3ee}n})}`}
            className="math-inline math-white"
          />.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          If you see the compact formal version, it is this same idea written in
          short math form:
        </p>
        <MathBlock
          tex={String.raw`{\color{white}T({\color{#22d3ee}n})={\color{#f472b6}O}({\color{white}f({\color{#22d3ee}n})})\iff \exists {\color{#a78bfa}c}>0,\exists {\color{#a78bfa}n_{\color{white}0}},\forall {\color{#22d3ee}n}\ge {\color{#a78bfa}n_{\color{white}0}}: {\color{white}T({\color{#22d3ee}n})}\le {\color{#a78bfa}c}\cdot {\color{white}f({\color{#22d3ee}n})}}`}
          className="math-center text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Reading that line in plain language:{" "}
          <MathInline tex={String.raw`\exists`} className="math-inline !text-white" />{" "}
          means
          &quot;there exists&quot; (at least one value works),{" "}
          <MathInline tex={String.raw`\forall`} className="math-inline !text-white" />{" "}
          means
          &quot;for every&quot; value in a range, and{" "}
          <MathInline tex={String.raw`:`} className="math-inline !text-white" />{" "}
          means
          &quot;such that the next condition must hold.&quot;
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Key takeaway: Big-O is about growth shape and decision-making, so you
          can choose algorithms that keep working well when your data gets much bigger.
        </p>
      </section>

      <section id="what-not" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          What Big-O is not
        </h2>
        <div className="ml-4 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr>
                <td className="w-12 py-2 text-center text-lg">❌</td>
                <td className="py-2">Big-O is not exact runtime in milliseconds.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">❌</td>
                <td className="py-2">It is not a promise that one method wins for every tiny input.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">❌</td>
                <td className="py-2">It is not complete analysis without space complexity and constant-factor realities.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">❌</td>
                <td className="py-2">It is not always the full behavior story unless you also state best/average/worst case.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          So what should you do instead?
        </p>
        <div className="ml-4 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr>
                <td className="w-12 py-2 text-center text-lg">➡️</td>
                <td className="py-2">Use Big-O to compare scaling trends as n grows.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">➡️</td>
                <td className="py-2">Pair asymptotic analysis with real constraints: constants, memory, and data distribution.</td>
              </tr>
              <tr>
                <td className="w-12 py-2 text-center text-lg">➡️</td>
                <td className="py-2">State assumptions clearly: input model, case type, and operation cost model.</td>
              </tr>
            </tbody>
          </table>
        </div>
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
          Instead of one dense expression, break the doubling ratio down line by line.
          We use
          <MathInline tex={String.raw`\frac{T(2n)}{T(n)}`} className="math-inline !text-white" />{" "}
          to ask: how much more work after doubling input?
        </p>
        <div className="grid gap-3 text-sm text-[color:var(--color-muted)]">
          <div className="rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3">
            <p className="text-white font-semibold">
              <BigONotation kind="o1" />: constant
            </p>
            <MathBlock
              tex={String.raw`\frac{T(2n)}{T(n)}=\frac{1}{1}=1`}
              className="math-center text-white/90"
            />
            <p>Doubling input keeps work essentially unchanged.</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3">
            <p className="text-white font-semibold">
              <BigONotation kind="ologn" />: logarithmic
            </p>
            <MathBlock
              tex={String.raw`\frac{T(2n)}{T(n)}=\frac{\log_2(2n)}{\log_2(n)}=1+\frac{1}{\log_2(n)}`}
              className="math-center text-white/90"
            />
            <p>Doubling input adds only a small extra amount of work.</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3">
            <p className="text-white font-semibold">
              <BigONotation kind="on" />: linear
            </p>
            <MathBlock
              tex={String.raw`\frac{T(2n)}{T(n)}=\frac{2n}{n}=2`}
              className="math-center text-white/90"
            />
            <p>Doubling input roughly doubles work.</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3">
            <p className="text-white font-semibold">
              <BigONotation kind="onlogn" />: linearithmic
            </p>
            <MathBlock
              tex={String.raw`\frac{T(2n)}{T(n)}=\frac{2n\log_2(2n)}{n\log_2(n)}=2\left(1+\frac{1}{\log_2(n)}\right)`}
              className="math-center text-white/90"
            />
            <p>Doubling input is slightly worse than 2x.</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3">
            <p className="text-white font-semibold">
              <BigONotation kind="on2" />: quadratic
            </p>
            <MathBlock
              tex={String.raw`\frac{T(2n)}{T(n)}=\frac{(2n)^2}{n^2}=4`}
              className="math-center text-white/90"
            />
            <p>Doubling input trends toward 4x work.</p>
          </div>
        </div>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Put together: <BigONotation kind="onlogn" /> sits between <BigONotation kind="on" /> and{" "}
          <BigONotation kind="on2" /> because doubling is more than 2x, but less than 4x.
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
