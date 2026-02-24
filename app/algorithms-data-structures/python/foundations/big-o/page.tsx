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
    { id: "notation-list", label: "Shopping list table", level: 2 },
    { id: "notation-o1", label: "O(1) direct lookup", level: 2 },
    { id: "notation-on", label: "O(n) linear search", level: 2 },
    { id: "notation-ologn", label: "O(log n) preview", level: 2 },
    { id: "formal-definition", label: "Formal definition" },
    { id: "formal-plain", label: "Plain English", level: 2 },
    { id: "formal-ideas", label: "Two key ideas", level: 2 },
    { id: "formal-example", label: "Worked example", level: 2 },
    { id: "what-not", label: "What Big-O is not" },
    { id: "equation-reading", label: "How to read equations" },
    { id: "math-primer", label: "Mini math primer" },
    { id: "math-primer-o1", label: "O(1) doubling test", level: 2 },
    { id: "math-primer-ologn", label: "O(log n) doubling test", level: 2 },
    { id: "math-primer-on", label: "O(n) doubling test", level: 2 },
    { id: "math-primer-onlogn", label: "O(n log n) doubling test", level: 2 },
    { id: "math-primer-on2", label: "O(n^2) doubling test", level: 2 },
    { id: "math-primer-on3", label: "O(n^3) doubling test", level: 2 },
    { id: "math-primer-o2n", label: "O(2^n) doubling test", level: 2 },
    { id: "math-primer-summary", label: "Doubling summary", level: 2 },
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
          Let&apos;s use one concrete shopping-list example and compare different tasks.
          This makes it easier to see why some operations are cheap and others are expensive.
        </p>

        <section id="notation-list" className="grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Shopping list table
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            We&apos;ll treat this as an indexed list. The order is intentionally not alphabetical.
          </p>
          <div className="glass-panel rounded-2xl p-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-center text-sm text-[color:var(--color-muted)]">
                <thead>
                  <tr className="border-b border-white/10 text-xs uppercase tracking-[0.16em]">
                    <th className="w-1/4 py-2">Index</th>
                    <th className="w-1/2 py-2">Item</th>
                    <th className="w-1/4 py-2">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="py-2 text-white">1</td>
                    <td className="py-2">Bread</td>
                    <td className="py-2">2</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 text-white">2</td>
                    <td className="py-2">Pasta</td>
                    <td className="py-2">1</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 text-white">3</td>
                    <td className="py-2">Tomatoes</td>
                    <td className="py-2">6</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 text-white/70">&#8942;</td>
                    <td className="py-2 text-white/70">&#8942;</td>
                    <td className="py-2 text-white/70">&#8942;</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 text-white">10</td>
                    <td className="py-2">Apples</td>
                    <td className="py-2">3</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 text-white/70">&#8942;</td>
                    <td className="py-2 text-white/70">&#8942;</td>
                    <td className="py-2 text-white/70">&#8942;</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-white">100</td>
                    <td className="py-2">Bananas</td>
                    <td className="py-2">5</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-white/70">&#8942;</td>
                    <td className="py-2 text-white/70">&#8942;</td>
                    <td className="py-2 text-white/70">&#8942;</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="notation-o1" className="grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            O(1) direct lookup
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Task: &quot;What is the item at position 10?&quot; or &quot;What is the item at position 100?&quot;
          </p>
          <div className="glass-panel rounded-2xl p-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-center text-sm text-[color:var(--color-muted)]">
                <thead>
                  <tr className="border-b border-white/10 text-xs uppercase tracking-[0.16em]">
                    <th className="w-1/5 py-2">Path</th>
                    <th className="w-1/5 py-2">Index</th>
                    <th className="w-2/5 py-2">Item</th>
                    <th className="w-1/5 py-2">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="py-2 text-white">-&gt; jump</td>
                    <td className="py-2 text-white">10</td>
                    <td className="py-2">Apples</td>
                    <td className="py-2">3</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-white">-&gt; jump</td>
                    <td className="py-2 text-white">100</td>
                    <td className="py-2">Bananas</td>
                    <td className="py-2">5</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            You do not scan through all earlier rows. You jump straight to the index,
            so both lookups are roughly constant-time work:
          </p>
          <MathBlock
            tex={String.raw`{\color{white}T({\color{#22d3ee}10})\approx 1,\qquad T({\color{#22d3ee}100})\approx 1,\qquad T({\color{#22d3ee}n})={\color{#f472b6}O}(1)}`}
            className="math-center text-white/90"
          />
        </section>

        <section id="notation-on" className="grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            O(n) linear search
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Different task: &quot;Find apples&quot; or &quot;Find bananas&quot; by name.
            Now you start at the top and check items one by one until you find the target.
          </p>
          <div className="glass-panel rounded-2xl p-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-center text-sm text-[color:var(--color-muted)]">
                <thead>
                  <tr className="border-b border-white/10 text-xs uppercase tracking-[0.16em]">
                    <th className="w-2/5 py-2">Path</th>
                    <th className="w-1/5 py-2">Found At Index</th>
                    <th className="w-1/5 py-2">Item</th>
                    <th className="w-1/5 py-2">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="py-2 text-white">-&gt; 1 -&gt; 2 -&gt; 3 -&gt; ... -&gt; 10</td>
                    <td className="py-2 text-white">10</td>
                    <td className="py-2">Apples</td>
                    <td className="py-2">3</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-white">-&gt; 1 -&gt; 2 -&gt; 3 -&gt; ... -&gt; 100</td>
                    <td className="py-2 text-white">100</td>
                    <td className="py-2">Bananas</td>
                    <td className="py-2">5</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <MathBlock
            tex={String.raw`{\color{white}T({\color{#22d3ee}10})\approx 10,\qquad T({\color{#22d3ee}100})\approx 100,\qquad T({\color{#22d3ee}n})={\color{#f472b6}O}({\color{#22d3ee}n})}`}
            className="math-center text-white/90"
          />
        </section>

        <section id="notation-ologn" className="grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            O(log n) preview
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            For search tasks, linear scan is not your only option. On sorted data,
            binary search can find a target with far fewer checks:
          </p>
          <MathBlock
            tex={String.raw`{\color{white}T({\color{#22d3ee}10})\approx 4,\qquad T({\color{#22d3ee}100})\approx 7,\qquad T({\color{#22d3ee}n})={\color{#f472b6}O}(\log {\color{#22d3ee}n})}`}
            className="math-center text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            We&apos;ll cover binary search itself in a dedicated section later. For now,
            the point is: same broad goal (search), different algorithm, very different scaling.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            That&apos;s the practical reason Big-O matters: it helps you choose
            approaches that still feel fast when your input gets much larger.
          </p>
        </section>
      </section>

      <section id="formal-definition" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Formal definition
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This is the same Big-O idea you already understand, just written in
          precise math language.
        </p>

        <section id="formal-plain" className="grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Plain English
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Start with the short version:
          </p>
          <MathBlock
            tex={String.raw`{\color{white}T({\color{#22d3ee}n})={\color{#f472b6}O}({\color{white}f({\color{#22d3ee}n})})}`}
            className="math-center text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            This does <span className="text-white">not</span> mean{" "}
            <MathInline
              tex={String.raw`{\color{white}T({\color{#22d3ee}n})}`}
              className="math-inline math-white"
            />{" "}
            is exactly equal to{" "}
            <MathInline
              tex={String.raw`{\color{white}f({\color{#22d3ee}n})}`}
              className="math-inline math-white"
            />
            . It means something looser and more practical:
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            As{" "}
            <MathInline tex={String.raw`{\color{#22d3ee}n}`} className="math-inline math-white" />{" "}
            gets large,{" "}
            <MathInline
              tex={String.raw`{\color{white}T({\color{#22d3ee}n})}`}
              className="math-inline math-white"
            />{" "}
            does not grow faster than{" "}
            <MathInline
              tex={String.raw`{\color{white}f({\color{#22d3ee}n})}`}
              className="math-inline math-white"
            />{" "}
            up to a constant multiplier.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            The compact formal line is:
          </p>
          <MathBlock
            tex={String.raw`{\color{white}T({\color{#22d3ee}n})={\color{#f472b6}O}({\color{white}f({\color{#22d3ee}n})})\iff \exists {\color{#a78bfa}c}>0,\exists {\color{#a78bfa}n_{\color{white}0}},\forall {\color{#22d3ee}n}\ge {\color{#a78bfa}n_{\color{white}0}}:\ T({\color{#22d3ee}n})\le {\color{#a78bfa}c}\cdot f({\color{#22d3ee}n})}`}
            className="math-center text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Read slowly, in plain words: there exists some positive constant{" "}
            <MathInline tex={String.raw`{\color{#a78bfa}c}`} className="math-inline math-white" />,
            and some starting point{" "}
            <MathInline
              tex={String.raw`{\color{#a78bfa}n_{\color{white}0}}`}
              className="math-inline math-white"
            />
            , such that for every{" "}
            <MathInline tex={String.raw`{\color{#22d3ee}n}\ge {\color{#a78bfa}n_{\color{white}0}}`} className="math-inline math-white" />,
            we have{" "}
            <MathInline
              tex={String.raw`{\color{white}T({\color{#22d3ee}n})\le {\color{#a78bfa}c}\cdot f({\color{#22d3ee}n})}`}
              className="math-inline math-white"
            />
            .
          </p>
        </section>

        <section id="formal-ideas" className="grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Two key ideas
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            <span className="text-white font-semibold">1) We focus on large inputs.</span>{" "}
            We are not trying to model tiny values forever. We care about what
            happens eventually, when data gets big.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            That is why the definition uses{" "}
            <MathInline
              tex={String.raw`{\color{#22d3ee}n}\ge{\color{#a78bfa}n_{\color{white}0}}`}
              className="math-inline math-white"
            />
            .
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            <span className="text-white font-semibold">2) We allow constant scaling.</span>{" "}
            If one function is just a constant multiple of another, we treat them
            as the same growth family for Big-O purposes.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            That is why the definition uses{" "}
            <MathInline
              tex={String.raw`{\color{#a78bfa}c}\cdot{\color{white}f({\color{#22d3ee}n})}`}
              className="math-inline math-white"
            />{" "}
            instead of requiring{" "}
            <MathInline
              tex={String.raw`{\color{white}T({\color{#22d3ee}n})\le f({\color{#22d3ee}n})}`}
              className="math-inline math-white"
            />
            .
          </p>
        </section>

        <section id="formal-example" className="grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Worked example
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Let&apos;s do this gently and step by step.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Goal: show that{" "}
            <MathInline
              tex={String.raw`{\color{white}3{\color{#22d3ee}n}^2+10{\color{#22d3ee}n}+5={\color{#f472b6}O}({\color{#22d3ee}n}^2)}`}
              className="math-inline math-white"
            />
            .
          </p>

          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Step 1: for{" "}
            <MathInline
              tex={String.raw`{\color{#22d3ee}n}\ge 1`}
              className="math-inline math-white"
            />
            , the smaller terms can be bounded by{" "}
            <MathInline
              tex={String.raw`{\color{#22d3ee}n}^2`}
              className="math-inline math-white"
            />
            :
          </p>
          <MathBlock
            tex={String.raw`{\color{white}10{\color{#22d3ee}n}\le 10{\color{#22d3ee}n}^2,\qquad 5\le 5{\color{#22d3ee}n}^2}`}
            className="math-center text-white/90"
          />

          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Step 2: replace those terms:
          </p>
          <MathBlock
            tex={String.raw`{\color{white}3{\color{#22d3ee}n}^2+10{\color{#22d3ee}n}+5\le 3{\color{#22d3ee}n}^2+10{\color{#22d3ee}n}^2+5{\color{#22d3ee}n}^2=18{\color{#22d3ee}n}^2}`}
            className="math-center text-white/90"
          />

          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Step 3: choose constants{" "}
            <MathInline
              tex={String.raw`{\color{#a78bfa}c}=18`}
              className="math-inline math-white"
            />{" "}
            and{" "}
            <MathInline
              tex={String.raw`{\color{#a78bfa}n_{\color{white}0}}=1`}
              className="math-inline math-white"
            />
            . Then for every{" "}
            <MathInline
              tex={String.raw`{\color{#22d3ee}n}\ge 1`}
              className="math-inline math-white"
            />
            , the condition holds, so{" "}
            <MathInline
              tex={String.raw`{\color{white}3{\color{#22d3ee}n}^2+10{\color{#22d3ee}n}+5={\color{#f472b6}O}({\color{#22d3ee}n}^2)}`}
              className="math-inline math-white"
            />
            .
          </p>
        </section>
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
          The doubling test asks one simple question:
          if we double the input size, how much more work do we do?
          We measure that with{" "}
          <MathInline tex={String.raw`\frac{T(2n)}{T(n)}`} className="math-inline !text-white" />.
        </p>

        <section id="math-primer-o1" className="grid gap-2">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            <BigONotation kind="o1" /> constant time
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">Step 1: suppose <MathInline tex={String.raw`T(n)=5`} className="math-inline !text-white" />.</p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">Step 2: doubling input gives <MathInline tex={String.raw`T(2n)=5`} className="math-inline !text-white" />.</p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">Step 3: compare:</p>
          <MathBlock tex={String.raw`\frac{T(2n)}{T(n)}=\frac{5}{5}=1`} className="math-center text-white/90" />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">Doubling input changes almost nothing.</p>
        </section>

        <section id="math-primer-ologn" className="grid gap-2">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            <BigONotation kind="ologn" /> logarithmic time
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">Step 1: suppose <MathInline tex={String.raw`T(n)=\log_2(n)`} className="math-inline !text-white" />.</p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">Step 2: double input:</p>
          <MathBlock tex={String.raw`T(2n)=\log_2(2n)=\log_2(2)+\log_2(n)=1+\log_2(n)`} className="math-center text-white/90" />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">Step 3: compare:</p>
          <MathBlock tex={String.raw`\frac{T(2n)}{T(n)}=\frac{\log_2(n)+1}{\log_2(n)}=1+\frac{1}{\log_2(n)}`} className="math-center text-white/90" />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            As n gets large, <MathInline tex={String.raw`\frac{1}{\log_2(n)}\to 0`} className="math-inline !text-white" />, so the ratio approaches 1.
            Doubling input adds only a tiny extra amount of work.
          </p>
        </section>

        <section id="math-primer-on" className="grid gap-2">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            <BigONotation kind="on" /> linear time
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">Step 1: <MathInline tex={String.raw`T(n)=n`} className="math-inline !text-white" />.</p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">Step 2: <MathInline tex={String.raw`T(2n)=2n`} className="math-inline !text-white" />.</p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">Step 3: compare:</p>
          <MathBlock tex={String.raw`\frac{T(2n)}{T(n)}=\frac{2n}{n}=2`} className="math-center text-white/90" />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">Doubling input doubles the work.</p>
        </section>

        <section id="math-primer-onlogn" className="grid gap-2">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            <BigONotation kind="onlogn" /> linearithmic time
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">Step 1: <MathInline tex={String.raw`T(n)=n\log_2(n)`} className="math-inline !text-white" />.</p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">Step 2: double input:</p>
          <MathBlock tex={String.raw`T(2n)=2n\log_2(2n)=2n(\log_2(n)+1)=2n\log_2(n)+2n`} className="math-center text-white/90" />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">Step 3: compare:</p>
          <MathBlock tex={String.raw`\frac{T(2n)}{T(n)}=\frac{2n\log_2(n)+2n}{n\log_2(n)}=2+\frac{2}{\log_2(n)}`} className="math-center text-white/90" />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            As n grows, <MathInline tex={String.raw`\frac{2}{\log_2(n)}\to 0`} className="math-inline !text-white" />, so this approaches 2.
            Doubling input gives slightly more than 2x work.
          </p>
        </section>

        <section id="math-primer-on2" className="grid gap-2">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            <BigONotation kind="on2" /> quadratic time
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">Step 1: <MathInline tex={String.raw`T(n)=n^2`} className="math-inline !text-white" />.</p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">Step 2: <MathInline tex={String.raw`T(2n)=(2n)^2=4n^2`} className="math-inline !text-white" />.</p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">Step 3: compare:</p>
          <MathBlock tex={String.raw`\frac{T(2n)}{T(n)}=\frac{4n^2}{n^2}=4`} className="math-center text-white/90" />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">Doubling input makes work about 4x larger.</p>
        </section>

        <section id="math-primer-on3" className="grid gap-2">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            <span className="inline-flex items-baseline gap-[1px] align-middle whitespace-nowrap">
              <MathInline tex={String.raw`O`} className="math-inline math-o" />
              <span className="text-white">(</span>
              <MathInline tex={String.raw`n`} className="math-inline math-nvar" />
              <sup className="text-[0.7em] leading-none text-[#22d3ee]">3</sup>
              <span className="text-white">)</span>
            </span>{" "}
            cubic time
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">Step 1: <MathInline tex={String.raw`T(n)=n^3`} className="math-inline !text-white" />.</p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">Step 2: <MathInline tex={String.raw`T(2n)=(2n)^3=8n^3`} className="math-inline !text-white" />.</p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">Step 3: compare:</p>
          <MathBlock tex={String.raw`\frac{T(2n)}{T(n)}=\frac{8n^3}{n^3}=8`} className="math-center text-white/90" />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">Doubling input makes work about 8x larger.</p>
        </section>

        <section id="math-primer-o2n" className="grid gap-2">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            <span className="inline-flex items-baseline gap-[1px] align-middle whitespace-nowrap">
              <MathInline tex={String.raw`O`} className="math-inline math-o" />
              <span className="text-white">(</span>
              <MathInline tex={String.raw`2`} className="math-inline math-white" />
              <sup className="text-[0.7em] leading-none text-[#22d3ee]">n</sup>
              <span className="text-white">)</span>
            </span>{" "}
            exponential time
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">Step 1: <MathInline tex={String.raw`T(n)=2^n`} className="math-inline !text-white" />.</p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">Step 2: <MathInline tex={String.raw`T(2n)=2^{2n}`} className="math-inline !text-white" />.</p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">Step 3: compare:</p>
          <MathBlock tex={String.raw`\frac{T(2n)}{T(n)}=\frac{2^{2n}}{2^n}=2^n`} className="math-center text-white/90" />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            This multiplier itself grows with n, so doubling input can explode cost very quickly.
          </p>
        </section>

        <section id="math-primer-summary" className="grid gap-2">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Doubling summary
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm text-[color:var(--color-muted)]">
              <thead>
                <tr className="border-b border-white/10 text-white">
                  <th className="py-2 pr-6">Complexity</th>
                  <th className="py-2">Doubling effect</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10"><td className="py-2 pr-6"><BigONotation kind="o1" /></td><td className="py-2">x1</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 pr-6"><BigONotation kind="ologn" /></td><td className="py-2">about x1</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 pr-6"><BigONotation kind="on" /></td><td className="py-2">x2</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 pr-6"><BigONotation kind="onlogn" /></td><td className="py-2">slightly more than x2</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 pr-6"><BigONotation kind="on2" /></td><td className="py-2">x4</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 pr-6"><span className="inline-flex items-baseline gap-[1px] align-middle whitespace-nowrap"><MathInline tex={String.raw`O`} className="math-inline math-o" /><span className="text-white">(</span><MathInline tex={String.raw`n`} className="math-inline math-nvar" /><sup className="text-[0.7em] leading-none text-[#22d3ee]">3</sup><span className="text-white">)</span></span></td><td className="py-2">x8</td></tr>
                <tr><td className="py-2 pr-6"><span className="inline-flex items-baseline gap-[1px] align-middle whitespace-nowrap"><MathInline tex={String.raw`O`} className="math-inline math-o" /><span className="text-white">(</span><MathInline tex={String.raw`2`} className="math-inline math-white" /><sup className="text-[0.7em] leading-none text-[#22d3ee]">n</sup><span className="text-white">)</span></span></td><td className="py-2">x(2^n), explodes quickly</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            The power of this test is simple: ask &quot;what happens when I double input?&quot;
            and growth rates become much easier to feel.
          </p>
        </section>
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
