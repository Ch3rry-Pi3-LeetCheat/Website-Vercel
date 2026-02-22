import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import GradientCrossSection from "@/components/ml/GradientCrossSection";
import DerivativeTangentPlot from "@/components/ml/DerivativeTangentPlot";
import GradientDescentContour from "@/components/ml/GradientDescentContour";
import InfoPanel from "@/components/InfoPanel";
import Link from "next/link";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
import { MathBlock, MathInline } from "@/components/Math";
import { mlFoundationsLessons } from "@/lib/mlTopics";
import type { ReactNode } from "react";

const HOUSE_DATA = [
  { floor_area: 52, bedrooms: 1, distance_to_centre: 4.5, price_gbp: 210000 },
  { floor_area: 68, bedrooms: 2, distance_to_centre: 3.2, price_gbp: 265000 },
  { floor_area: 75, bedrooms: 2, distance_to_centre: 6.0, price_gbp: 255000 },
  { floor_area: 90, bedrooms: 3, distance_to_centre: 5.5, price_gbp: 310000 },
  { floor_area: 110, bedrooms: 3, distance_to_centre: 2.8, price_gbp: 365000 },
  { floor_area: 130, bedrooms: 4, distance_to_centre: 7.5, price_gbp: 390000 },
  { floor_area: 145, bedrooms: 4, distance_to_centre: 3.0, price_gbp: 460000 },
  { floor_area: 160, bedrooms: 5, distance_to_centre: 8.0, price_gbp: 455000 },
];

const TRUNCATED_ROWS: Array<(typeof HOUSE_DATA)[number] | null> = [
  HOUSE_DATA[0],
  HOUSE_DATA[1],
  null,
  HOUSE_DATA[7],
];

const gdCode = `# One-feature gradient descent using the same house dataset
X = [52, 68, 75, 90, 110, 130, 145, 160]
y = [210000, 265000, 255000, 310000, 365000, 390000, 460000, 455000]

# Scale for cleaner numbers
xs = [x / 100 for x in X]
ys = [v / 1000 for v in y]
n = len(xs)

theta0 = sum(ys) / n
theta1 = 0.0
alpha = 0.3

def mse(t0, t1):
    return sum(((t0 + t1 * x) - yy) ** 2 for x, yy in zip(xs, ys)) / n

def step(t0, t1):
    errors = [(t0 + t1 * x) - yy for x, yy in zip(xs, ys)]
    grad0 = (2 / n) * sum(errors)
    grad1 = (2 / n) * sum(e * x for e, x in zip(errors, xs))
    t0 = t0 - alpha * grad0
    t1 = t1 - alpha * grad1
    return t0, t1

checkpoints = {0, 1, 2, 5, 10, 25, 50, 100, 250}
for loop in range(251):
    if loop in checkpoints:
        print(loop, round(theta0, 6), round(theta1, 6), round(mse(theta0, theta1), 6))
    theta0, theta1 = step(theta0, theta1)`;

const gdOutput = `0 338.75 0.0 7673.4375
1 338.75 18.864375 6917.275545
2 327.006927 24.050475 6411.99095
5 302.46357 47.49677 5153.499075
10 266.334018 80.14912 3597.274963
25 191.069919 148.230413 1291.691678
50 130.546555 202.977702 356.864062
100 97.676472 232.710814 192.51682
250 91.78109 238.043568 188.601807`;

const firstUpdateCode = `# Initial state from this run:
# theta0 = 338.75, theta1 = 0.0, alpha = 0.3
# grad0 = 0.0, grad1 = -62.88125

theta0_next = 338.75 - 0.3 * 0.0
theta1_next = 0.0 - 0.3 * (-62.88125)

print(theta0_next, theta1_next)`;

const firstUpdateOutput = `338.75 18.864375`;

const currentLessonHref = "/ml/foundations/training-math-gradient-descent";
const currentLessonIndex = mlFoundationsLessons.findIndex((lesson) => lesson.href === currentLessonHref);
const nextLesson = currentLessonIndex >= 0 ? mlFoundationsLessons[currentLessonIndex + 1] : undefined;

function EquationRow({ number, children }: { number: number; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-4">
      <div className="min-w-0">{children}</div>
      <div className="shrink-0 text-sm text-white/65">({number})</div>
    </div>
  );
}

export default function TrainingMathGradientDescentPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "intro", label: "Introduction" },
    { id: "recap", label: "Quick recap", level: 2 },
    { id: "intuition", label: "Gradient descent intuition" },
    { id: "gradient-primer", label: "Gradients: what they tell us" },
    { id: "derivative-primer", label: "Mini derivative primer", level: 2 },
    { id: "power-rule", label: "Power rule", level: 2 },
    { id: "example-square", label: "Example: y = x^2", level: 2 },
    { id: "chain-rule", label: "Chain rule", level: 2 },
    { id: "cross-section", label: "Cost cross-section visual", level: 2 },
    { id: "setup", label: "Set up the math" },
    { id: "gradients", label: "Compute gradients" },
    { id: "updates", label: "Update rules" },
    { id: "first-update", label: "First loop worked example" },
    { id: "python", label: "Python implementation" },
    { id: "contour", label: "Contour visual" },
    { id: "summary", label: "Summary" },
    { id: "key-takeaways", label: "Key takeaways", level: 2 },
    { id: "whats-next", label: "What's next", level: 2 },
  ];

  return (
    <div className="overflow-x-clip">
      <ArticleLayout
        eyebrow="ML - Foundations"
        title="Training math: gradient descent"
        description="How training loops update parameters step by step to reduce loss."
        descriptionClassName="italic"
        tocItems={tocItems}
        rightRail={
          <RightRail
            sections={[{ title: "Within Foundations", links: mlFoundationsLessons }]}
            activeHref="/ml/foundations/training-math-gradient-descent"
          />
        }
      >
        <InfoPanel id="intro" title="Introduction" variant="intro">
          <p>
            Up to now, we have said that models get better by running training
            loops. This lesson opens that box and shows exactly what one loop
            does mathematically.
          </p>
          <p>
            We will use one feature (
            <span className="math-x font-mono">floor_area</span>) so the math is
            easier to follow. The same logic extends to many features.
          </p>
          <h3
            id="recap"
            className="scroll-mt-28 pt-1 text-xl font-semibold text-white font-[var(--font-display)]"
          >
            Quick recap
          </h3>
          <p>
            As before, we use the same housing rows and show a truncated view
            for readability.
          </p>
          <div className="glass-panel rounded-2xl p-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-center text-sm text-[color:var(--color-muted)]">
                <thead>
                  <tr className="border-b border-white/10 text-xs uppercase tracking-[0.2em]">
                    <th className="w-1/5 py-2">
                      <span className="math-x">floor_area</span>
                    </th>
                    <th className="w-1/5 py-2">
                      <span className="math-x">bedrooms</span>
                    </th>
                    <th className="w-1/5 py-2">
                      <span className="math-x">distance_to_centre</span>
                    </th>
                    <th className="w-1/5 py-2">
                      <span className="math-x">&hellip;</span>
                    </th>
                    <th className="w-1/5 py-2">
                      <span className="math-y">price_gbp</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {TRUNCATED_ROWS.map((row, index) =>
                    row ? (
                      <tr
                        key={`${row.floor_area}-${row.price_gbp}`}
                        className={index < TRUNCATED_ROWS.length - 1 ? "border-b border-white/10" : ""}
                      >
                        <td className="py-2">{row.floor_area}</td>
                        <td className="py-2">{row.bedrooms}</td>
                        <td className="py-2">{row.distance_to_centre}</td>
                        <td className="py-2 text-white/70">&hellip;</td>
                        <td className="py-2">{row.price_gbp.toLocaleString("en-GB")}</td>
                      </tr>
                    ) : (
                      <tr key="ellipsis-row" className="border-b border-white/10">
                        <td className="py-2 text-white/70">&#8942;</td>
                        <td className="py-2 text-white/70">&#8942;</td>
                        <td className="py-2 text-white/70">&#8942;</td>
                        <td className="py-2 text-white/70">&hellip;</td>
                        <td className="py-2 text-white/70">&#8942;</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </InfoPanel>

        <section id="intuition" className="scroll-mt-28 grid gap-4">
          <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
            Gradient descent intuition
          </h2>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Imagine loss as a landscape of hills and valleys. Your current
            parameter values sit at one point on that landscape. Gradient
            descent asks: &quot;which direction points most steeply uphill?&quot;
            Then it moves in the opposite direction, downhill.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Repeat this many times and you usually move toward a low-loss region.
            In our training context, one gradient descent step is exactly one{" "}
            <span className="text-white font-semibold">training loop update</span>.
          </p>
        </section>

        <section id="gradient-primer" className="scroll-mt-28 grid gap-4">
          <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
            Gradients: what they tell us
          </h2>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            The gradient is a local slope: it tells us how fast the cost would
            change if we nudge a parameter by a tiny amount. In practice, that
            gives us both direction and urgency:
            big slope means move confidently, tiny slope means we are close to a flat minimum.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            For one parameter <MathInline tex={String.raw`{\color{violet}\theta}`} className="math-inline !text-white" />,
            if <MathInline tex={String.raw`{\color{white}\frac{dJ}{d\theta}>0}`} className="math-inline !text-white" /> we step left
            (decrease <MathInline tex={String.raw`{\color{violet}\theta}`} className="math-inline !text-white" />);
            if <MathInline tex={String.raw`{\color{white}\frac{dJ}{d\theta}<0}`} className="math-inline !text-white" /> we step right.
          </p>

          <InfoPanel id="derivative-primer" title="Mini derivative primer" variant="intuition" headingLevel={3}>
            <p>
              If this feels new, think of derivative as the slope of a curve at one point.
              You can read it like a road gradient sign:
              positive means uphill to the right, negative means downhill to the right.
            </p>

            <h4
              id="power-rule"
              className="scroll-mt-28 pt-1 text-lg font-semibold text-white font-[var(--font-display)]"
            >
              Power rule
            </h4>
            <p>
              A common pattern is a power function.
              This is the generic rule we will reuse repeatedly:
            </p>
            <MathBlock
              tex={String.raw`\begin{aligned}
{\color{white}y} &= {\color{cyan}x}^{\color{white}n} \\
\frac{d{\color{white}y}}{d{\color{cyan}x}} &= {\color{white}n}{\color{cyan}x}^{\color{white}n-1}
\end{aligned}`}
              className="math-center math-lg text-white/90"
            />

            <h4
              id="example-square"
              className="scroll-mt-28 pt-1 text-lg font-semibold text-white font-[var(--font-display)]"
            >
              Worked example 1: <span className="font-mono">y = x^2</span>
            </h4>
            <p>
              Step by step:
            </p>
            <MathBlock
              tex={String.raw`\begin{aligned}
{\color{white}y} &= {\color{cyan}x}^{\color{white}2} \\
\frac{d{\color{white}y}}{d{\color{cyan}x}} &= {\color{white}2}{\color{cyan}x}^{\color{white}2-1} \\
&= {\color{white}2}{\color{cyan}x}
\end{aligned}`}
              className="math-center math-lg text-white/90"
            />
            <p>
              This means slope changes by location: at{" "}
              <MathInline tex={String.raw`{\color{cyan}x=-2}`} className="math-inline !text-white" /> slope is{" "}
              <MathInline tex={String.raw`{\color{white}-4}`} className="math-inline !text-white" />, at{" "}
              <MathInline tex={String.raw`{\color{cyan}x=0}`} className="math-inline !text-white" /> slope is{" "}
              <MathInline tex={String.raw`{\color{white}0}`} className="math-inline !text-white" />, and at{" "}
              <MathInline tex={String.raw`{\color{cyan}x=2}`} className="math-inline !text-white" /> slope is{" "}
              <MathInline tex={String.raw`{\color{white}4}`} className="math-inline !text-white" />.
            </p>
            <DerivativeTangentPlot mode="square" />

            <h4
              id="chain-rule"
              className="scroll-mt-28 pt-1 text-lg font-semibold text-white font-[var(--font-display)]"
            >
              Worked example 2: chain rule (composed functions)
            </h4>
            <p>
              The chain rule is used when one function sits inside another.
              In model training, this is exactly what happens when loss depends on predictions,
              and predictions depend on parameters.
            </p>
            <MathBlock
              tex={String.raw`\begin{aligned}
{\color{white}y} &= \left({\color{white}0.5}{\color{cyan}x} + {\color{white}1}\right)^2 \\
{\color{white}u} &= {\color{white}0.5}{\color{cyan}x} + {\color{white}1} \\
{\color{white}y} &= {\color{white}u}^2 \\
\frac{d{\color{white}y}}{d{\color{white}u}} &= {\color{white}2u} \\
\frac{d{\color{white}u}}{d{\color{cyan}x}} &= {\color{white}0.5} \\
\frac{d{\color{white}y}}{d{\color{cyan}x}} &= \frac{d{\color{white}y}}{d{\color{white}u}} \cdot \frac{d{\color{white}u}}{d{\color{cyan}x}} \\
&= {\color{white}2u} \cdot {\color{white}0.5} \\
&= {\color{white}u} \\
&= {\color{white}0.5}{\color{cyan}x} + {\color{white}1}
\end{aligned}`}
              className="math-center math-lg text-white/90"
            />
            <DerivativeTangentPlot mode="chain" />
          </InfoPanel>

          <section id="cross-section" className="grid gap-3">
            <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
              Cost cross-section visual
            </h3>
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Now map that idea from simple{" "}
              <span className="font-mono text-white">x</span>-curves to model
              parameters and cost. Use the slider to pick a current weight.
              The dashed line is the tangent at that point, and the one-step
              arrow shows the gradient descent update.
            </p>
            <GradientCrossSection />
          </section>
        </section>

        <section id="setup" className="scroll-mt-28 grid gap-4">
          <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
            Set up the math
          </h2>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            For one-feature linear regression, we define prediction, error, and
            loss in three steps:
          </p>

          <EquationRow number={1}>
            <div className="mx-auto grid w-full max-w-[640px] grid-cols-[180px_auto_1fr] items-center gap-x-3 text-left math-lg text-white/90">
              <div className="justify-self-end">
                <MathInline
                  tex={String.raw`{\color{magenta}\hat{y}}_{\color{white}i}`}
                  className="math-inline !text-white"
                />
              </div>
              <div className="text-white">=</div>
              <div className="justify-self-start">
                <MathInline
                  tex={String.raw`{\color{violet}\theta}_{\color{white}0} + {\color{violet}\theta}_{\color{white}1}{\color{cyan}x}_{\color{white}i}`}
                  className="math-inline !text-white"
                />
              </div>
            </div>
          </EquationRow>

          <EquationRow number={2}>
            <div className="mx-auto grid w-full max-w-[640px] grid-cols-[180px_auto_1fr] items-center gap-x-3 text-left math-lg text-white/90">
              <div className="justify-self-end">
                <MathInline
                  tex={String.raw`{\color{white}e}_{\color{white}i}`}
                  className="math-inline !text-white"
                />
              </div>
              <div className="text-white">=</div>
              <div className="justify-self-start">
                <MathInline
                  tex={String.raw`{\color{magenta}\hat{y}}_{\color{white}i} - {\color{orange}y}_{\color{white}i}`}
                  className="math-inline !text-white"
                />
              </div>
            </div>
          </EquationRow>

          <EquationRow number={3}>
            <div className="mx-auto grid w-full max-w-[640px] grid-cols-[180px_auto_1fr] items-center gap-x-3 text-left math-lg text-white/90">
              <div className="justify-self-end">
                <MathInline
                  tex={String.raw`{\color{white}J\left({\color{violet}\theta}_{\color{white}0},{\color{violet}\theta}_{\color{white}1}\right)}`}
                  className="math-inline !text-white"
                />
              </div>
              <div className="text-white">=</div>
              <div className="justify-self-start">
                <MathInline
                  tex={String.raw`{\color{white}\frac{1}{n}\sum_{i=1}^{n}\left({\color{magenta}\hat{y}}_{\color{white}i} - {\color{orange}y}_{\color{white}i}\right)^2}`}
                  className="math-inline !text-white"
                />
              </div>
            </div>
          </EquationRow>

          <div className="ml-4 overflow-x-auto">
            <table className="w-full border-separate [border-spacing:0_8px] text-left text-base leading-7 text-[color:var(--color-muted)]">
              <tbody>
                <tr>
                  <td className="w-44 py-1 pr-4 text-center text-white font-semibold">
                    <MathInline
                      tex={String.raw`{\color{cyan}x}_{\color{white}i}`}
                      className="math-inline !text-white"
                    />
                  </td>
                  <td className="py-1">Input feature (here: floor area).</td>
                </tr>
                <tr>
                  <td className="w-44 py-1 pr-4 text-center text-white font-semibold">
                    <MathInline
                      tex={String.raw`{\color{orange}y}_{\color{white}i}`}
                      className="math-inline !text-white"
                    />
                  </td>
                  <td className="py-1">True target value from the dataset.</td>
                </tr>
                <tr>
                  <td className="w-44 py-1 pr-4 text-center text-white font-semibold">
                    <MathInline
                      tex={String.raw`{\color{magenta}\hat{y}}_{\color{white}i}`}
                      className="math-inline !text-white"
                    />
                  </td>
                  <td className="py-1">Model prediction for row i.</td>
                </tr>
                <tr>
                  <td className="w-44 py-1 pr-4 text-center text-white font-semibold">
                    <MathInline
                      tex={String.raw`{\color{violet}\theta}_{\color{white}0},{\color{violet}\theta}_{\color{white}1}`}
                      className="math-inline !text-white"
                    />
                  </td>
                  <td className="py-1">Trainable parameters (intercept and slope).</td>
                </tr>
                <tr>
                  <td className="w-44 py-1 pr-4 text-center text-white font-semibold">
                    <MathInline
                      tex={String.raw`{\color{white}J\left({\color{violet}\theta}_{\color{white}0},{\color{violet}\theta}_{\color{white}1}\right)}`}
                      className="math-inline !text-white"
                    />
                  </td>
                  <td className="py-1">Objective function we minimize (mean squared error).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="gradients" className="scroll-mt-28 grid gap-4">
          <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
            Compute gradients
          </h2>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            We differentiate the loss with respect to each parameter. These
            gradients tell us how sensitive loss is to small changes in each
            parameter.
          </p>
          <EquationRow number={4}>
            <div className="mx-auto grid w-full max-w-[640px] grid-cols-[180px_auto_1fr] items-center gap-x-3 text-left math-lg text-white/90">
              <div className="justify-self-end">
                <MathInline
                  tex={String.raw`{\color{white}\frac{\partial J}{\partial {\color{violet}\theta}_{\color{white}0}}}`}
                  className="math-inline !text-white"
                />
              </div>
              <div className="text-white">=</div>
              <div className="justify-self-start">
                <MathInline
                  tex={String.raw`{\color{white}\frac{2}{n}\sum_{i=1}^{n}\left({\color{magenta}\hat{y}}_{\color{white}i} - {\color{orange}y}_{\color{white}i}\right)}`}
                  className="math-inline !text-white"
                />
              </div>
            </div>
          </EquationRow>

          <EquationRow number={5}>
            <div className="mx-auto grid w-full max-w-[640px] grid-cols-[180px_auto_1fr] items-center gap-x-3 text-left math-lg text-white/90">
              <div className="justify-self-end">
                <MathInline
                  tex={String.raw`{\color{white}\frac{\partial J}{\partial {\color{violet}\theta}_{\color{white}1}}}`}
                  className="math-inline !text-white"
                />
              </div>
              <div className="text-white">=</div>
              <div className="justify-self-start">
                <MathInline
                  tex={String.raw`{\color{white}\frac{2}{n}\sum_{i=1}^{n}\left({\color{magenta}\hat{y}}_{\color{white}i} - {\color{orange}y}_{\color{white}i}\right){\color{cyan}x}_{\color{white}i}}`}
                  className="math-inline !text-white"
                />
              </div>
            </div>
          </EquationRow>

          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Reading the signs matters:
            if a gradient is positive, moving that parameter down usually
            reduces loss; if a gradient is negative, moving it up usually
            reduces loss.
          </p>
        </section>

        <section id="updates" className="scroll-mt-28 grid gap-4">
          <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
            Update rules
          </h2>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Gradient descent updates each parameter by subtracting learning rate
            times its gradient:
          </p>

          <EquationRow number={6}>
            <div className="mx-auto grid w-full max-w-[640px] grid-cols-[180px_auto_1fr] items-center gap-x-3 text-left math-lg text-white/90">
              <div className="justify-self-end">
                <MathInline
                  tex={String.raw`{\color{violet}\theta}_{\color{white}0}^{\color{white}(t+1)}`}
                  className="math-inline !text-white"
                />
              </div>
              <div className="text-white">=</div>
              <div className="justify-self-start">
                <MathInline
                  tex={String.raw`{\color{violet}\theta}_{\color{white}0}^{\color{white}(t)} - {\color{white}\alpha \frac{\partial J}{\partial {\color{violet}\theta}_{\color{white}0}}}`}
                  className="math-inline !text-white"
                />
              </div>
            </div>
          </EquationRow>

          <EquationRow number={7}>
            <div className="mx-auto grid w-full max-w-[640px] grid-cols-[180px_auto_1fr] items-center gap-x-3 text-left math-lg text-white/90">
              <div className="justify-self-end">
                <MathInline
                  tex={String.raw`{\color{violet}\theta}_{\color{white}1}^{\color{white}(t+1)}`}
                  className="math-inline !text-white"
                />
              </div>
              <div className="text-white">=</div>
              <div className="justify-self-start">
                <MathInline
                  tex={String.raw`{\color{violet}\theta}_{\color{white}1}^{\color{white}(t)} - {\color{white}\alpha \frac{\partial J}{\partial {\color{violet}\theta}_{\color{white}1}}}`}
                  className="math-inline !text-white"
                />
              </div>
            </div>
          </EquationRow>

          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Here <MathInline tex={String.raw`{\color{white}\alpha}`} className="math-inline !text-white" />{" "}
            is the learning rate. Too large can overshoot. Too small can make
            training very slow.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            The index <MathInline tex={String.raw`{\color{white}t}`} className="math-inline !text-white" />{" "}
            means loop number. So one pass of equations (6) and (7) is one
            training loop update.
          </p>
        </section>

        <section id="first-update" className="scroll-mt-28 grid gap-4">
          <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
            First loop worked example
          </h2>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Suppose we start at{" "}
            <MathInline
              tex={String.raw`{\color{violet}\theta}_{\color{white}0} = {\color{white}338.75}`}
              className="math-inline !text-white"
            />
            ,{" "}
            <MathInline
              tex={String.raw`{\color{violet}\theta}_{\color{white}1} = {\color{white}0.0}`}
              className="math-inline !text-white"
            />
            , with{" "}
            <MathInline
              tex={String.raw`{\color{white}\alpha = 0.3}`}
              className="math-inline !text-white"
            />
            .{" "}
            Using equations (4) and (5), the first gradients are:
          </p>
          <div className="ml-4 overflow-x-auto">
            <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="w-56 py-2 pr-4 text-white font-semibold">
                    <MathInline
                      tex={String.raw`{\color{white}\frac{\partial J}{\partial {\color{violet}\theta}_{\color{white}0}}}`}
                      className="math-inline !text-white"
                    />
                  </td>
                  <td className="py-2">0.0</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="w-56 py-2 pr-4 text-white font-semibold">
                    <MathInline
                      tex={String.raw`{\color{white}\frac{\partial J}{\partial {\color{violet}\theta}_{\color{white}1}}}`}
                      className="math-inline !text-white"
                    />
                  </td>
                  <td className="py-2">-62.88125</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="w-56 py-2 pr-4 text-white font-semibold">
                    <MathInline
                      tex={String.raw`{\color{white}J\left({\color{violet}\theta}_{\color{white}0},{\color{violet}\theta}_{\color{white}1}\right)\ \text{before update}}`}
                      className="math-inline !text-white"
                    />
                  </td>
                  <td className="py-2">7673.4375</td>
                </tr>
                <tr>
                  <td className="w-56 py-2 pr-4 text-white font-semibold">
                    <MathInline
                      tex={String.raw`{\color{white}J\left({\color{violet}\theta}_{\color{white}0},{\color{violet}\theta}_{\color{white}1}\right)\ \text{after update}}`}
                      className="math-inline !text-white"
                    />
                  </td>
                  <td className="py-2">6917.2755</td>
                </tr>
              </tbody>
            </table>
          </div>
          <CodeBlock code={firstUpdateCode} title="Python" />
          <OutputBlock output={firstUpdateOutput} />
        </section>

        <section id="python" className="scroll-mt-28 grid gap-4">
          <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
            Python implementation
          </h2>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            This implementation runs 250 training loops. Each loop does exactly
            the gradient step from equations (6) and (7).
          </p>
          <CodeBlock code={gdCode} title="Python" />
          <OutputBlock output={gdOutput} />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Notice the trend: loss decreases rapidly early on, then improvements
            become smaller near the low-loss region.
          </p>
        </section>

        <section id="contour" className="scroll-mt-28 grid gap-4">
          <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
            Contour visual: loops on the loss surface
          </h2>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            This contour view tracks parameters directly. The horizontal axis is{" "}
            <span className="math-theta">theta0</span>, the vertical axis is{" "}
            <span className="math-theta">theta1</span>, and each contour line
            represents equal loss.
          </p>
          <GradientDescentContour
            data={HOUSE_DATA.map((row) => ({
              floor_area: row.floor_area,
              price_gbp: row.price_gbp,
            }))}
          />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            As loops progress, the dot walks downhill. This is the exact same
            process as the training loop language we used earlier; now you can
            see it in parameter space directly.
          </p>
        </section>

        <section id="summary" className="scroll-mt-28 grid gap-4">
          <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
            Summary
          </h2>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            This page was designed to connect{" "}
            <span className="text-white font-semibold">intuition</span> and{" "}
            <span className="text-white font-semibold">math</span>: what
            gradient descent is doing conceptually, and how each training loop
            implements that exactly.
          </p>

          <section id="key-takeaways" className="grid gap-3">
            <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
              Key takeaways
            </h3>
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              So, what{" "}
              <span className="text-emerald-400">DID</span>{" "}
              we cover?
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
                <tbody>
                  <tr>
                    <td className="w-12 py-2 text-center text-lg">&#9989;</td>
                    <td className="py-2">How prediction, error, and MSE are defined for one-feature linear regression.</td>
                  </tr>
                  <tr>
                    <td className="w-12 py-2 text-center text-lg">&#9989;</td>
                    <td className="py-2">How gradients with respect to each parameter are computed and interpreted.</td>
                  </tr>
                  <tr>
                    <td className="w-12 py-2 text-center text-lg">&#9989;</td>
                    <td className="py-2">How one gradient descent step maps exactly to one training loop update.</td>
                  </tr>
                  <tr>
                    <td className="w-12 py-2 text-center text-lg">&#9989;</td>
                    <td className="py-2">How the parameter path moves through a contour plot toward lower loss.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              From the list above, we did cover a lot of ground. But there are
              key pieces we deliberately{" "}
              <span className="text-rose-400 font-semibold">DID NOT</span>{" "}
              cover yet, for example:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
                <tbody>
                  <tr>
                    <td className="w-12 py-2 text-center text-lg">&#10060;</td>
                    <td className="py-2">How to diagnose overfitting from train-vs-validation behavior over time.</td>
                  </tr>
                  <tr>
                    <td className="w-12 py-2 text-center text-lg">&#10060;</td>
                    <td className="py-2">How regularization changes the objective and update dynamics.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="whats-next" className="grid gap-3">
            <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
              What&apos;s next
            </h3>
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Next lesson: <span className="text-white font-semibold">overfitting vs generalization</span>.
            </p>
          </section>
        </section>

        {nextLesson ? (
          <section className="flex justify-end pt-2">
            <Link
              href={nextLesson.href}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
            >
              Next Article
              <span aria-hidden>&rarr;</span>
            </Link>
          </section>
        ) : null}
      </ArticleLayout>
    </div>
  );
}
