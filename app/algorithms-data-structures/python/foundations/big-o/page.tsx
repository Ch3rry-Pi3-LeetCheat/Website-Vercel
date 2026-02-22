import ArticleLayout from "@/components/ArticleLayout";
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
    { id: "time", label: "Time complexity" },
    { id: "space", label: "Space complexity" },
    { id: "growth", label: "Common growth rates" },
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
          Big-O is the language we use to describe how much work an algorithm
          does as input size grows. Instead of timing one machine run, we track
          the growth pattern.
        </p>
        <p>
          You will use this on almost every interview question: not only to
          justify your final solution, but to decide which data structure is
          appropriate before coding.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          Think of packing boxes. If one extra box means one extra action, that
          is linear growth. If doubling boxes doubles actions, that is still
          linear. Big-O focuses on this shape, not exact seconds.
        </p>
        <p>
          Real systems care because growth compounds: an algorithm that feels
          fine at 1,000 items can become unusable at 1,000,000.
        </p>
      </InfoPanel>

      <section id="notation" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          What O(...) means
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          If an algorithm does at most a constant multiple of some function{" "}
          <MathInline tex={String.raw`f(n)`} className="math-inline !text-white" />,
          we write:
        </p>
        <MathBlock
          tex={String.raw`T(n) = O(f(n))`}
          className="math-center math-lg text-white/90"
        />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We usually drop constants and lower-order terms, because for large{" "}
          <MathInline tex={String.raw`n`} className="math-inline !text-white" />,
          the highest-growth term dominates.
        </p>
        <MathBlock
          tex={String.raw`3n + 12 = O(n), \quad 5n^2 + n = O(n^2)`}
          className="math-center math-lg text-white/90"
        />
      </section>

      <section id="time" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Time complexity
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Time complexity tracks operation count growth as input size{" "}
          <MathInline tex={String.raw`n`} className="math-inline !text-white" /> increases.
          Useful mental anchors:
        </p>
        <ul className="grid list-disc list-inside gap-2 text-sm text-[color:var(--color-muted)]">
          <li>
            <span className="text-white font-semibold">O(1):</span> constant work (array index access).
          </li>
          <li>
            <span className="text-white font-semibold">O(n):</span> one pass over input (linear scan).
          </li>
          <li>
            <span className="text-white font-semibold">O(log n):</span> shrink problem each step (binary search).
          </li>
          <li>
            <span className="text-white font-semibold">O(n log n):</span> divide + combine style sorting.
          </li>
          <li>
            <span className="text-white font-semibold">O(n^2):</span> nested pair comparisons.
          </li>
        </ul>
      </section>

      <section id="space" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Space complexity
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Space complexity tracks extra memory beyond the input itself.
          If you allocate a new array of size{" "}
          <MathInline tex={String.raw`n`} className="math-inline !text-white" />,
          that is typically{" "}
          <MathInline tex={String.raw`O(n)`} className="math-inline !text-white" /> extra space.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          In-place pointer updates on linked lists are often{" "}
          <MathInline tex={String.raw`O(1)`} className="math-inline !text-white" /> space,
          while recursion may add stack usage.
        </p>
      </section>

      <section id="growth" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Common growth rates
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-separate [border-spacing:0_8px] text-left text-sm text-[color:var(--color-muted)]">
            <thead>
              <tr className="text-white/80">
                <th className="py-1 pr-4">Class</th>
                <th className="py-1 pr-4">Formula</th>
                <th className="py-1">Typical intuition</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-1 pr-4 text-white font-semibold">Constant</td>
                <td className="py-1 pr-4"><MathInline tex={String.raw`O(1)`} className="math-inline !text-white" /></td>
                <td className="py-1">Work does not grow with input size.</td>
              </tr>
              <tr>
                <td className="py-1 pr-4 text-white font-semibold">Logarithmic</td>
                <td className="py-1 pr-4"><MathInline tex={String.raw`O(\log n)`} className="math-inline !text-white" /></td>
                <td className="py-1">Cut search space repeatedly.</td>
              </tr>
              <tr>
                <td className="py-1 pr-4 text-white font-semibold">Linear</td>
                <td className="py-1 pr-4"><MathInline tex={String.raw`O(n)`} className="math-inline !text-white" /></td>
                <td className="py-1">One full pass through data.</td>
              </tr>
              <tr>
                <td className="py-1 pr-4 text-white font-semibold">Linearithmic</td>
                <td className="py-1 pr-4"><MathInline tex={String.raw`O(n\log n)`} className="math-inline !text-white" /></td>
                <td className="py-1">Sort-like behavior.</td>
              </tr>
              <tr>
                <td className="py-1 pr-4 text-white font-semibold">Quadratic</td>
                <td className="py-1 pr-4"><MathInline tex={String.raw`O(n^2)`} className="math-inline !text-white" /></td>
                <td className="py-1">All-pairs style comparisons.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="worked" className="scroll-mt-28 grid gap-5">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Worked examples
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Same task, different structure choice:
          find one value in house floor-area data.
        </p>
        <div className="glass-panel rounded-2xl px-6 py-5">
          <h3 className="text-lg font-semibold text-white">Example A: linear scan over a list</h3>
          <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">
            We check items one by one until we find the target.
            Worst case is{" "}
            <MathInline tex={String.raw`O(n)`} className="math-inline !text-white" /> time.
          </p>
          <CodeBlock code={linearSearchCode} title="Python" />
          <OutputBlock output={linearSearchOutput} />
        </div>
        <div className="glass-panel rounded-2xl px-6 py-5">
          <h3 className="text-lg font-semibold text-white">Example B: dictionary lookup</h3>
          <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">
            We pre-build a hash map from value to index. Lookup is usually{" "}
            <MathInline tex={String.raw`O(1)`} className="math-inline !text-white" />, but map creation costs{" "}
            <MathInline tex={String.raw`O(n)`} className="math-inline !text-white" />.
          </p>
          <CodeBlock code={hashLookupCode} title="Python" />
          <OutputBlock output={hashLookupOutput} />
        </div>
      </section>

      <section id="summary" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Summary
        </h2>
        <ul className="grid gap-2 text-sm text-[color:var(--color-muted)]">
          <li>
            Big-O describes growth, not exact runtime.
          </li>
          <li>
            Time and space trade-offs shape data structure choices.
          </li>
          <li>
            In interviews, justify both correctness and complexity.
          </li>
        </ul>
        <section id="next" className="grid gap-2">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            What&apos;s next
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Move to arrays first, then linked lists, stacks/queues, hash tables,
            trees, heaps, and graphs.
          </p>
        </section>
      </section>
    </ArticleLayout>
  );
}


