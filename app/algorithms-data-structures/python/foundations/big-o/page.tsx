import ArticleLayout from "@/components/ArticleLayout";
import BigONotation from "@/components/ads/BigONotation";
import ComplexityStaticPlot from "@/components/ads/ComplexityStaticPlot";
import InfoPanel from "@/components/InfoPanel";
import RightRail from "@/components/RightRail";
import { MathBlock, MathInline } from "@/components/Math";
import { adsPythonTopics } from "@/lib/adsTopics";

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
    { id: "math-primer", label: "Doubling test intuition" },
    { id: "math-primer-o1", label: "O(1) doubling test", level: 2 },
    { id: "math-primer-ologn", label: "O(log n) doubling test", level: 2 },
    { id: "math-primer-on", label: "O(n) doubling test", level: 2 },
    { id: "math-primer-onlogn", label: "O(n log n) doubling test", level: 2 },
    { id: "math-primer-on2", label: "O(n^2) doubling test", level: 2 },
    { id: "summary", label: "Summary" },
    { id: "summary-what-is", label: "What Big-O is", level: 2 },
    { id: "summary-what-is-not", label: "What Big-O is not", level: 2 },
    { id: "summary-do-instead", label: "What to do instead", level: 2 },
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
            <span className="text-white font-semibold">In plain English:</span>{" "}
            we say{" "}
            <MathInline
              tex={String.raw`{\color{white}T({\color{#22d3ee}n})={\color{#f472b6}O}({\color{white}f({\color{#22d3ee}n})})}`}
              className="math-inline math-white"
            />{" "}
            <MathInline tex={String.raw`{\color{white}\iff}`} className="math-inline math-white" />{" "}
            there exists{" "}
            <MathInline tex={String.raw`{\color{white}\exists}`} className="math-inline math-white" />{" "}
            a positive constant{" "}
            <MathInline tex={String.raw`{\color{#a78bfa}c}`} className="math-inline math-white" />{" "}
            with{" "}
            <MathInline
              tex={String.raw`{\color{#a78bfa}c}{\color{white}>0}`}
              className="math-inline math-white"
            />
            , and a
            starting input size{" "}
            <MathInline
              tex={String.raw`{\color{#a78bfa}n_{\color{white}0}}`}
              className="math-inline math-white"
            />
            , such that for every{" "}
            <MathInline tex={String.raw`{\color{white}\forall}`} className="math-inline math-white" />{" "}
            input size{" "}
            <MathInline tex={String.raw`{\color{#22d3ee}n}`} className="math-inline math-white" />{" "}
            with{" "}
            <MathInline tex={String.raw`{\color{#22d3ee}n}\ge{\color{#a78bfa}n_{\color{white}0}}`} className="math-inline math-white" />,
            the work{" "}
            <MathInline
              tex={String.raw`{\color{white}T({\color{#22d3ee}n})}`}
              className="math-inline math-white"
            />{" "}
            is at most{" "}
            <MathInline
              tex={String.raw`{\color{#a78bfa}c}\cdot{\color{white}f({\color{#22d3ee}n})}`}
              className="math-inline math-white"
            />
            .
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            So after some cutoff{" "}
            <MathInline
              tex={String.raw`{\color{#a78bfa}n_{\color{white}0}}`}
              className="math-inline math-white"
            />
            ,{" "}
            <MathInline
              tex={String.raw`{\color{white}T({\color{#22d3ee}n})}`}
              className="math-inline math-white"
            />{" "}
            stays below a scaled copy of{" "}
            <MathInline
              tex={String.raw`{\color{white}f({\color{#22d3ee}n})}`}
              className="math-inline math-white"
            />
            .
          </p>
        </section>

        <section id="formal-ideas" className="grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Two key ideas
          </h3>
          <ol className="ml-6 list-decimal pl-6 grid gap-6 text-base leading-7 text-[color:var(--color-muted)]">
            <li className="grid gap-2">
              <p>
                <span className="text-white font-semibold">We focus on large inputs.</span>{" "}
                We are not trying to model tiny values forever. We care about what
                happens eventually, when data gets big.
              </p>
              <p>
                That is why the definition uses{" "}
                <MathInline
                  tex={String.raw`{\color{#22d3ee}n}\ge{\color{#a78bfa}n_{\color{white}0}}`}
                  className="math-inline math-white"
                />
                .
              </p>
            </li>
            <li className="grid gap-2">
              <p>
                <span className="text-white font-semibold">We allow constant scaling.</span>{" "}
                If one function is just a constant multiple of another, we treat them
                as the same growth family for Big-O purposes.
              </p>
              <p>
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
            </li>
          </ol>
        </section>

        <section id="formal-example" className="grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Worked example
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Let&apos;s do this gently and step by step.
          </p>
          <h4 className="text-base font-semibold text-white">Goal</h4>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            We want to prove{" "}
            <MathInline
              tex={String.raw`{\color{white}3{\color{#22d3ee}n}^2+10{\color{#22d3ee}n}+5={\color{#f472b6}O}({\color{#22d3ee}n}^2)}`}
              className="math-inline math-white"
            />
            . From the formal definition just above, this means we must find a
            positive constant{" "}
            <MathInline
              tex={String.raw`{\color{#a78bfa}c}`}
              className="math-inline math-white"
            />{" "}
            and a starting point{" "}
            <MathInline
              tex={String.raw`{\color{#a78bfa}n_{\color{white}0}}`}
              className="math-inline math-white"
            />{" "}
            so that for every{" "}
            <MathInline
              tex={String.raw`{\color{#22d3ee}n}\ge{\color{#a78bfa}n_{\color{white}0}}`}
              className="math-inline math-white"
            />
            , the function stays below a scaled copy of{" "}
            <MathInline
              tex={String.raw`{\color{white}{\color{#22d3ee}n}^2}`}
              className="math-inline math-white"
            />
            .
          </p>
          <MathBlock
            tex={String.raw`{\color{white}3{\color{#22d3ee}n}^2+10{\color{#22d3ee}n}+5\le{\color{#a78bfa}c}\cdot{\color{#22d3ee}n}^2}`}
            className="math-center text-white/90"
          />

          <h4 className="text-base font-semibold text-white">Step 1: bound the smaller terms</h4>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            The term{" "}
            <MathInline
              tex={String.raw`{\color{white}3{\color{#22d3ee}n}^2}`}
              className="math-inline math-white"
            />{" "}
            already matches our target growth. The extra pieces{" "}
            <MathInline
              tex={String.raw`{\color{white}10{\color{#22d3ee}n}}`}
              className="math-inline math-white"
            />{" "}
            and{" "}
            <MathInline
              tex={String.raw`{\color{white}5}`}
              className="math-inline math-white"
            />{" "}
            are smaller-order pieces, so we rewrite them in terms of{" "}
            <MathInline
              tex={String.raw`{\color{white}{\color{#22d3ee}n}^2}`}
              className="math-inline math-white"
            />
            . When{" "}
            <MathInline
              tex={String.raw`{\color{#22d3ee}n}\ge 1`}
              className="math-inline math-white"
            />
            , we know{" "}
            <MathInline
              tex={String.raw`{\color{white}{\color{#22d3ee}n}^2\ge{\color{#22d3ee}n}}`}
              className="math-inline math-white"
            />{" "}
            and{" "}
            <MathInline
              tex={String.raw`{\color{white}{\color{#22d3ee}n}^2\ge 1}`}
              className="math-inline math-white"
            />
            . Multiplying those facts by 10 and 5 is why we get:
          </p>
          <MathBlock
            tex={String.raw`{\color{white}10{\color{#22d3ee}n}\le 10{\color{#22d3ee}n}^2,\qquad 5\le 5{\color{#22d3ee}n}^2}`}
            className="math-center text-white/90"
          />

          <h4 className="text-base font-semibold text-white">Step 2: substitute into the full expression</h4>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Now replace each smaller term by its upper bound from Step 1. This is
            important because it gives one clean upper bound for the entire function,
            which is exactly what Big-O asks us to show.
          </p>
          <MathBlock
            tex={String.raw`{\color{white}3{\color{#22d3ee}n}^2+10{\color{#22d3ee}n}+5\le 3{\color{#22d3ee}n}^2+10{\color{#22d3ee}n}^2+5{\color{#22d3ee}n}^2=18{\color{#22d3ee}n}^2}`}
            className="math-center text-white/90"
          />

          <h4 className="text-base font-semibold text-white">Step 3: match the formal definition</h4>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            We can now pick{" "}
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
            , we have{" "}
            <MathInline
              tex={String.raw`{\color{white}3{\color{#22d3ee}n}^2+10{\color{#22d3ee}n}+5\le 18{\color{#22d3ee}n}^2}`}
              className="math-inline math-white"
            />
            . That is exactly the condition in the definition, so the proof is complete:
            {" "}
            <MathInline
              tex={String.raw`{\color{white}3{\color{#22d3ee}n}^2+10{\color{#22d3ee}n}+5={\color{#f472b6}O}({\color{#22d3ee}n}^2)}`}
              className="math-inline math-white"
            />
            .
          </p>
        </section>
      </section>

      <section id="math-primer" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          The Doubling Test: How Fast Does Work Grow?
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          A very intuitive way to understand algorithm growth is to ask one simple
          question: if we double the input size, how much more work do we do?
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We measure this using{" "}
          <MathInline
            tex={String.raw`{\color{white}\frac{T(2{\color{#22d3ee}n})}{T({\color{#22d3ee}n})}}`}
            className="math-inline !text-white"
          />
          .
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          If this ratio stays close to 1, growth is gentle. If it becomes 2, work
          doubles. If it becomes 4, work quadruples.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Let&apos;s walk through the main complexity classes one by one.
        </p>

        <section id="math-primer-o1" className="grid gap-2">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Constant Time - <BigONotation kind="o1" />
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Suppose the work does not depend on input size{" "}
            <MathInline tex={String.raw`n`} className="math-inline math-nvar" />:
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Here, 5 is just an example of a fixed amount of work: think of 5
            basic steps. The key point is that this number does not grow when{" "}
            <MathInline tex={String.raw`n`} className="math-inline math-nvar" /> grows.
          </p>
          <MathBlock
            tex={String.raw`{\color{white}T({\color{#22d3ee}n})=5}`}
            className="math-center text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Doubling the input gives:
          </p>
          <MathBlock
            tex={String.raw`{\color{white}T(2{\color{#22d3ee}n})=5}`}
            className="math-center text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">Now compare:</p>
          <MathBlock
            tex={String.raw`\require{cancel}
\begin{aligned}
{\color{white}\frac{T(2{\color{#22d3ee}n})}{T({\color{#22d3ee}n})}}
&= {\color{white}\frac{5}{5}} \\[3pt]
&= {\color{white}\frac{\cancel{5}}{\cancel{5}}} \\[3pt]
&= {\color{white}1}
\end{aligned}`}
            className="math-center text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Doubling the input does not increase the work at all. Whether the input
            is 10 or 10 million, runtime stays the same. That is constant time.
          </p>
          <h4 className="text-base font-semibold text-white">
            Plot of <BigONotation kind="o1" />
          </h4>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            This sketch uses the same reference points as the other plots so you
            can compare shapes directly. The dashed guides show where{" "}
            <MathInline tex={String.raw`n=16`} className="math-inline math-white" />{" "}
            and{" "}
            <MathInline tex={String.raw`2n=32`} className="math-inline math-white" />{" "}
            land on the curve.
          </p>
          <ComplexityStaticPlot kind="o1" />
        </section>

        <section id="math-primer-ologn" className="grid gap-2">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Logarithmic Time - <BigONotation kind="ologn" />
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Now suppose the work grows logarithmically:
          </p>
          <MathBlock
            tex={String.raw`{\color{white}T({\color{#22d3ee}n})=\log_2({\color{#22d3ee}n})}`}
            className="math-center text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Double the input:
          </p>
          <MathBlock
            tex={String.raw`{\color{white}T(2{\color{#22d3ee}n})=\log_2(2{\color{#22d3ee}n})}`}
            className="math-center text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Using the log rule:
          </p>
          <MathBlock
            tex={String.raw`{\color{white}\log_2(2{\color{#22d3ee}n})=\log_2(2)+\log_2({\color{#22d3ee}n})}`}
            className="math-center text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            A helpful way to read a logarithm of the form{" "}
            <MathInline
              tex={String.raw`{\color{white}\log_a(b)}`}
              className="math-inline !text-white"
            />{" "}
            is: &quot;what power do we raise{" "}
            <MathInline
              tex={String.raw`{\color{white}a}`}
              className="math-inline !text-white"
            />{" "}
            to, to get{" "}
            <MathInline
              tex={String.raw`{\color{white}b}`}
              className="math-inline !text-white"
            />
            ?&quot;.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            In our case,{" "}
            <MathInline
              tex={String.raw`{\color{white}\log_2(2)}`}
              className="math-inline !text-white"
            />{" "}
            asks: &quot;what power of 2 gives 2?&quot; Since{" "}
            <MathInline
              tex={String.raw`{\color{white}2^1=2}`}
              className="math-inline !text-white"
            />
            , we get{" "}
            <MathInline
              tex={String.raw`{\color{white}\log_2(2)=1}`}
              className="math-inline !text-white"
            />
            . Therefore, we obtain:
          </p>
          <MathBlock
            tex={String.raw`{\color{white}T(2{\color{#22d3ee}n})=1+\log_2({\color{#22d3ee}n})}`}
            className="math-center text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Now compare:
          </p>
          <MathBlock
            tex={String.raw`\begin{aligned}
{\color{white}\frac{T(2{\color{#22d3ee}n})}{T({\color{#22d3ee}n})}}
&= {\color{white}\frac{\log_2({\color{#22d3ee}n})+1}{\log_2({\color{#22d3ee}n})}} \\[3pt]
&= {\color{white}\frac{\log_2({\color{#22d3ee}n})}{\log_2({\color{#22d3ee}n})}+\frac{1}{\log_2({\color{#22d3ee}n})}} \\[3pt]
&= {\color{white}1+\frac{1}{\log_2({\color{#22d3ee}n})}}
\end{aligned}`}
            className="math-center text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            As{" "}
            <MathInline tex={String.raw`n`} className="math-inline math-nvar" /> grows,{" "}
            <MathInline tex={String.raw`{\color{white}\frac{1}{\log_2({\color{#22d3ee}n})}\to 0}`} className="math-inline !text-white" />,
            so the ratio approaches 1. Doubling input adds only a very small extra
            amount of work. This is why logarithmic growth scales so well.
          </p>
          <h4 className="text-base font-semibold text-white">
            Plot of <BigONotation kind="ologn" />
          </h4>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            The same two markers are used here too:{" "}
            <MathInline tex={String.raw`n=16`} className="math-inline math-white" />{" "}
            and{" "}
            <MathInline tex={String.raw`2n=32`} className="math-inline math-white" />.
            These values are especially useful for logs because{" "}
            <MathInline
              tex={String.raw`\log_2(16)=4,\ \log_2(32)=5`}
              className="math-inline math-white"
            />{" "}
            are clean numbers.
          </p>
          <ComplexityStaticPlot kind="ologn" />
        </section>

        <section id="math-primer-on" className="grid gap-2">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Linear Time - <BigONotation kind="on" />
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Now suppose work grows in direct proportion to input size:
          </p>
          <MathBlock
            tex={String.raw`{\color{white}T({\color{#22d3ee}n})={\color{#22d3ee}n}}`}
            className="math-center text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Double the input:
          </p>
          <MathBlock
            tex={String.raw`{\color{white}T(2{\color{#22d3ee}n})=2{\color{#22d3ee}n}}`}
            className="math-center text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">Now compare:</p>
          <MathBlock
            tex={String.raw`\require{cancel}
\begin{aligned}
{\color{white}\frac{T(2{\color{#22d3ee}n})}{T({\color{#22d3ee}n})}}
&= {\color{white}\frac{2{\color{#22d3ee}n}}{{\color{#22d3ee}n}}} \\[3pt]
&= {\color{white}\frac{2\cancel{{\color{#22d3ee}n}}}{\cancel{{\color{#22d3ee}n}}}} \\[3pt]
&= {\color{white}2}
\end{aligned}`}
            className="math-center text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Doubling the input doubles the work. If the list doubles in size, runtime
            roughly doubles as well. That is linear growth.
          </p>
          <h4 className="text-base font-semibold text-white">
            Plot of <BigONotation kind="on" />
          </h4>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            The dashed guides show the two comparison inputs,{" "}
            <MathInline tex={String.raw`n=16`} className="math-inline math-white" /> and{" "}
            <MathInline tex={String.raw`2n=32`} className="math-inline math-white" />.
            The y-axis then reads off the corresponding work values{" "}
            <MathInline
              tex={String.raw`T(n)\ \text{and}\ T(2n)`}
              className="math-inline math-white"
            />
            .
          </p>
          <ComplexityStaticPlot kind="on" />
        </section>

        <section id="math-primer-onlogn" className="grid gap-2">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Linearithmic Time - <BigONotation kind="onlogn" />
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Now suppose the work is:
          </p>
          <MathBlock
            tex={String.raw`{\color{white}T({\color{#22d3ee}n})={\color{#22d3ee}n}\log_2({\color{#22d3ee}n})}`}
            className="math-center text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Double the input:
          </p>
          <MathBlock
            tex={String.raw`{\color{white}T(2{\color{#22d3ee}n})=2{\color{#22d3ee}n}\log_2(2{\color{#22d3ee}n})}`}
            className="math-center text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Apply the log rule:
          </p>
          <MathBlock
            tex={String.raw`\begin{aligned}
{\color{white}T(2{\color{#22d3ee}n})}
&= {\color{white}2{\color{#22d3ee}n}(\log_2({\color{#22d3ee}n})+1)} \\[3pt]
&= {\color{white}2{\color{#22d3ee}n}\log_2({\color{#22d3ee}n})+2{\color{#22d3ee}n}}
\end{aligned}`}
            className="math-center text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Now compare:
          </p>
          <MathBlock
            tex={String.raw`\require{cancel}
\begin{aligned}
{\color{white}\frac{T(2{\color{#22d3ee}n})}{T({\color{#22d3ee}n})}}
&= {\color{white}\frac{2{\color{#22d3ee}n}\log_2({\color{#22d3ee}n})+2{\color{#22d3ee}n}}{{\color{#22d3ee}n}\log_2({\color{#22d3ee}n})}} \\[3pt]
&= {\color{white}\frac{2{\color{#22d3ee}n}\log_2({\color{#22d3ee}n})}{{\color{#22d3ee}n}\log_2({\color{#22d3ee}n})}+\frac{2{\color{#22d3ee}n}}{{\color{#22d3ee}n}\log_2({\color{#22d3ee}n})}} \\[3pt]
&= {\color{white}\frac{2{\color{white}\cancel{{\color{#22d3ee}n}}}\log_2({\color{#22d3ee}n})}{{\color{white}\cancel{{\color{#22d3ee}n}}}\log_2({\color{#22d3ee}n})}+\frac{2{\color{white}\cancel{{\color{#22d3ee}n}}}}{{\color{white}\cancel{{\color{#22d3ee}n}}}\log_2({\color{#22d3ee}n})}} \\[3pt]
&= {\color{white}2+\frac{2}{\log_2({\color{#22d3ee}n})}}
\end{aligned}`}
            className="math-center text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            As{" "}
            <MathInline tex={String.raw`n`} className="math-inline math-nvar" /> grows,{" "}
            <MathInline
              tex={String.raw`{\color{white}\log_2({\color{#22d3ee}n})\to\infty}`}
              className="math-inline !text-white"
            />
            . So the denominator keeps getting larger and larger, which makes{" "}
            <MathInline tex={String.raw`{\color{white}\frac{2}{\log_2({\color{#22d3ee}n})}\to 0}`} className="math-inline !text-white" />,
            so the ratio approaches 2. Doubling input makes work slightly more than
            double. It grows faster than linear time, but much slower than quadratic.
          </p>
          <h4 className="text-base font-semibold text-white">
            Plot of <BigONotation kind="onlogn" />
          </h4>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            We again use{" "}
            <MathInline tex={String.raw`n=16`} className="math-inline math-white" /> and{" "}
            <MathInline tex={String.raw`2n=32`} className="math-inline math-white" />{" "}
            so the curve can be compared directly with the other growth families.
            Watch how this curve rises faster than linear, but not as sharply as
            quadratic.
          </p>
          <ComplexityStaticPlot kind="onlogn" />
        </section>

        <section id="math-primer-on2" className="grid gap-2">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            Quadratic Time - <BigONotation kind="on2" />
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Now suppose:
          </p>
          <MathBlock
            tex={String.raw`{\color{white}T({\color{#22d3ee}n})={\color{#22d3ee}n}^2}`}
            className="math-center text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Double the input:
          </p>
          <MathBlock
            tex={String.raw`{\color{white}T(2{\color{#22d3ee}n})=(2{\color{#22d3ee}n})^2}`}
            className="math-center text-white/90"
          />
          <MathBlock
            tex={String.raw`{\color{white}T(2{\color{#22d3ee}n})=4{\color{#22d3ee}n}^2}`}
            className="math-center text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">Now compare:</p>
          <MathBlock
            tex={String.raw`\require{cancel}
\begin{aligned}
{\color{white}\frac{T(2{\color{#22d3ee}n})}{T({\color{#22d3ee}n})}}
&= {\color{white}\frac{4{\color{#22d3ee}n}^2}{{\color{#22d3ee}n}^2}} \\[3pt]
&= {\color{white}\frac{4\cancel{{\color{#22d3ee}n}^2}}{\cancel{{\color{#22d3ee}n}^2}}} \\[3pt]
&= {\color{white}4}
\end{aligned}`}
            className="math-center text-white/90"
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Doubling the input makes the work about 4 times larger. This is why
            quadratic algorithms become slow quickly as data grows.
          </p>
          <h4 className="text-base font-semibold text-white">
            Plot of <BigONotation kind="on2" />
          </h4>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            With the same reference points{" "}
            <MathInline tex={String.raw`n=16`} className="math-inline math-white" /> and{" "}
            <MathInline tex={String.raw`2n=32`} className="math-inline math-white" />,
            you can see the steep rise in{" "}
            <MathInline
              tex={String.raw`T(n)`}
              className="math-inline math-white"
            />{" "}
            and why doubling input pushes work toward 4x.
          </p>
          <ComplexityStaticPlot kind="on2" />
        </section>

      </section>

      <section id="summary" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Summary
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This page was built to give you both intuition and practical judgment:
          how growth works, what the formal definition is saying, and how to use
          Big-O without overclaiming what it can do.
        </p>
        <section id="summary-what-is" className="grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            What Big-O is
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            So, what <span className="text-emerald-400">DID</span> we establish?
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
              <tbody>
                <tr>
                  <td className="w-12 py-2 text-center text-lg">✅</td>
                  <td className="py-2">Big-O is a growth model for large inputs, not a stopwatch number.</td>
                </tr>
                <tr>
                  <td className="w-12 py-2 text-center text-lg">✅</td>
                  <td className="py-2">The doubling question builds fast intuition: what happens when n becomes 2n?</td>
                </tr>
                <tr>
                  <td className="w-12 py-2 text-center text-lg">✅</td>
                  <td className="py-2">Read equations as model, evaluate, then compare growth.</td>
                </tr>
                <tr>
                  <td className="w-12 py-2 text-center text-lg">✅</td>
                  <td className="py-2">When analyzing code, define n clearly and track both time and extra space.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section id="summary-what-is-not" className="grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            What Big-O is not
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Just as importantly, what should you <span className="text-rose-400 font-semibold">NOT</span>{" "}
            infer from Big-O alone?
          </p>
          <div className="overflow-x-auto">
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
        </section>
        <section id="summary-do-instead" className="grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            What to do instead
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
              <tbody>
                <tr>
                  <td className="w-12 py-2 text-center text-lg">✅</td>
                  <td className="py-2">Use Big-O to compare scaling trends as n grows.</td>
                </tr>
                <tr>
                  <td className="w-12 py-2 text-center text-lg">✅</td>
                  <td className="py-2">Pair asymptotic analysis with real constraints: constants, memory, and data distribution.</td>
                </tr>
                <tr>
                  <td className="w-12 py-2 text-center text-lg">✅</td>
                  <td className="py-2">State assumptions clearly: input model, case type, and operation cost model.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
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
