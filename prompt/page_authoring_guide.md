# Page Authoring Guide

This file is a working reference for how we typically lay out, format, and polish lesson pages in this repo.

It is not meant to be abstract theory. It is meant to be a quick lookup document that can be extended over time as we settle more patterns.

When in doubt, inspect the existing pages directly instead of guessing:

- [what-is-ml](/c:/Users/HP/OneDrive/Documents/Ch3rryPi3%20Ltd/Website/leetcheat-site/app/ml/foundations/what-is-ml/page.tsx)
- [numbers-variables-and-algebraic-notation](/c:/Users/HP/OneDrive/Documents/Ch3rryPi3%20Ltd/Website/leetcheat-site/app/mathematics/linear-algebra/prerequisites-and-mathematical-language/numbers-variables-and-algebraic-notation/page.tsx)
- [functions-graphs-and-mappings](/c:/Users/HP/OneDrive/Documents/Ch3rryPi3%20Ltd/Website/leetcheat-site/app/mathematics/linear-algebra/prerequisites-and-mathematical-language/functions-graphs-and-mappings/page.tsx)
- [Math.tsx](/c:/Users/HP/OneDrive/Documents/Ch3rryPi3%20Ltd/Website/leetcheat-site/components/Math.tsx)
- [AlgebraStaticVisual.tsx](/c:/Users/HP/OneDrive/Documents/Ch3rryPi3%20Ltd/Website/leetcheat-site/components/math/AlgebraStaticVisual.tsx)
- [globals.css](/c:/Users/HP/OneDrive/Documents/Ch3rryPi3%20Ltd/Website/leetcheat-site/app/globals.css)

If a user says “look at `what-is-ml`” or points to another page, treat that as a direct instruction. Inspect the actual implementation before making changes.

## 1. Overall Page Structure

Typical lesson structure:

1. `ArticleLayout`
2. `InfoPanel` introduction box
3. Optional `InfoPanel` intuition / “why this comes next” box
4. Main sections
5. Subsections inside those sections
6. `Summary` as its own top-level section

The introduction box should contain the main roadmap for the page.

Those roadmap items should usually become the actual top-level sections in the page.

Example pattern:

- `Introduction`
- `Why this topic comes next` as a subsection / intuition panel
- `Numbers`
- `Variables`
- `Expressions`
- `Equations`
- `Linear algebra bridge`
- `Summary`

Do not let the intro roadmap and the real page structure drift apart unless there is a strong reason.

For geometry-heavy lessons:

- do not create a separate `Geometric intuition` section if the visuals can sit directly inside the sections they explain
- prefer `concept -> worked example -> plot` inside the same section
- if a plot is about scaling, keep it inside the `Scaling` section
- if a plot is about comparing two vectors, keep it inside the comparison section
- when an operation has a standard name, use it where it helps:
  - `head-to-tail` / `triangle rule`
  - `parallelogram rule`
  - `commutative`, `associative`, `distributive`, `identity`, `inverse`
- if those laws are introduced, give at least one small concrete example rather than listing the names only

## 2. Tone and Writing Style

Preferred style:

- beginner-friendly
- calm, explicit, thorough
- intuitive before formal
- plenty of concrete examples
- plenty of ordinary language between equations

Preferred teaching pattern:

1. explain the idea in words
2. show a simple symbolic example
3. give an everyday interpretation where appropriate
4. work through values step by step
5. connect it to the next topic

Whenever a brief real-world hook genuinely helps, use it:

- totals of scores, sales, hours, or measurements for summation
- coordinates or position for tuples / vectors
- ordinary repeated actions when explaining compact notation

Do not force a real-world analogy into every paragraph, but do use one when it makes the abstraction feel easier to picture.

Use emphasis deliberately:

- important phrases: `text-white font-semibold`
- key distinctions: say them plainly
- avoid dense compressed paragraphs when the idea can be broken into smaller steps

## 3. Math Rendering

We use the local math wrappers in [Math.tsx](/c:/Users/HP/OneDrive/Documents/Ch3rryPi3%20Ltd/Website/leetcheat-site/components/Math.tsx):

- `MathInline` for inline math
- `MathBlock` for display / block math

These use MathJax-style delimiters:

- inline: `\\( ... \\)`
- block: `\\[ ... \\]`

Example:

```tsx
<MathInline tex={String.raw`{\color{#22d3ee}x}+3`} className="math-inline math-white" />
<MathBlock tex={String.raw`{\color{#f472b6}y}=2{\color{#22d3ee}x}`} className="math-center math-lg text-white/90" />
```

Inline math rules:

- use `MathInline`
- keep it visually inside the sentence, not as fake text
- use `className="math-inline math-white"` unless there is a specific reason not to

Block math rules:

- use `MathBlock`
- usually pair with `className="math-center math-lg text-white/90"`
- do not cram too much explanation into one math line when normal prose would be clearer

Worked-equation rules:

- most lesson pages should contain several fully worked, step-by-step examples
- if a short sequence is just algebraic transformation, align the lines at `=` so the change is easy to scan
- if the reasoning changes, insert a normal text line before the next display
- prefer a few short aligned chains over one oversized block with too much happening at once

Example:

```tex
\begin{aligned}
2{\color{#22d3ee}x} &= 10 \\
\frac{2{\color{#22d3ee}x}}{2} &= \frac{10}{2} \\
{\color{#22d3ee}x} &= 5
\end{aligned}
```

## 4. Variable Colour Conventions

Default convention we have settled on:

- first main variable: blue `#22d3ee`
- second main variable: pink `#f472b6`
- if there is only one running index in a sum, keep that index blue
- if there are two distinct indices, use blue for the first and pink for the second

Examples:

- single variable: `{\color{#22d3ee}x}`
- two variables: `{\color{#22d3ee}x}` and `{\color{#f472b6}y}`
- coordinates: x-part blue, y-part pink

Typical examples:

```tex
{\color{#22d3ee}x}+3
{\color{#f472b6}y}=2{\color{#22d3ee}x}
({\color{#22d3ee}2},{\color{#f472b6}5})
```

Notes:

- if there is only one variable in the expression, keep it blue
- if there are two variables, use blue first and pink second
- do not force arbitrary extra letter-color mappings if they make things look busy
- avoid relying on green for core variables; we generally moved away from that

## 5. Substitution Rules

When substituting a value into a variable:

- the substituted number should usually inherit the variable’s colour
- if the substituted value sits inside parentheses, colour the number in the parentheses
- write the substitution step explicitly
- if the substitution produces a short chain of equal forms, align those lines at `=`

Example:

```tex
2{\color{#22d3ee}x}+1=2({\color{#22d3ee}3})+1
```

Then break the rest into separate steps with prose between them:

```tex
2({\color{#22d3ee}3})+1=6+1
```

```tex
6+1=7
```

Do not over-compress multi-step substitutions into one giant block if separate lines plus normal text are clearer.

Example of a short aligned substitution check:

```tex
\begin{aligned}
{\color{#22d3ee}x}+2 &= 5 \\
({\color{#22d3ee}3})+2 &= 5 \\
5 &= 5
\end{aligned}
```

## 6. How to Break Up Display Math

Preferred pattern:

1. say what we are doing in prose
2. show the current equation line
3. explain the next operation in prose
4. show the next equation line

Good pattern:

- “First substitute `x = 5` into the expression.”
- display equation
- “Now simplify the numerator.”
- display equation
- “Finally divide by 2.”
- display equation

This is usually clearer than a dense aligned block with no narrative guidance.

Use aligned environments only when they genuinely improve readability.

## 7. Intro Box / Roadmap Table

The intro box is typically an `InfoPanel` with `variant="intro"`.

It should:

- explain why the page exists
- explain the overall goal
- include a roadmap table

Typical intro roadmap table pattern:

```tsx
<div className="ml-8 overflow-x-auto">
  <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
```

Typical first-column sizing:

- `w-56` for roadmap topic names

Typical roadmap styling:

- subtle row separators are acceptable here: `border-b border-white/10`
- topic labels in white, semibold

Roadmap topics should generally map onto the top-level page sections.

## 8. Section and Subsection Rules

Typical heading pattern:

- top-level sections: `h2`
- subsections: `h3`
- deeper local examples: `h4` when needed

Use subsections when:

- the section has multiple distinct teaching moves
- the page needs clearer scanning structure
- worked examples deserve their own label

Do not create extra wrapper subsections if the real content subsections can just sit directly under the main section.

Example:

- in `Mappings`, we eventually removed “Different kinds of mapping behavior” as a wrapper heading and let:
  - `One-to-one (injective)`
  - `Many-to-one`
  - `Onto (surjective)`
  - `Bijective`
  - `Not a function`
  stand as the real subheadings

## 8.1. Bridge / What Comes Next

The `What comes next` section should point forward, not sideways.

Rules:

- the equations in that section should preview the next lesson's real symbols or operations
- do not simply repeat the notation from the current page unless it is needed as setup for the next one
- if the next lesson is dot product, show dot-product notation there rather than another block of magnitude-only expressions

Reason:

- that section works best when it feels like a clean handoff into the next concept instead of a recap with a different heading

## 9. Tables

General table pattern for math pages:

- wrap in `div` with `ml-8 overflow-x-auto`
- main table classes:

```tsx
className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]"
```

Default indentation:

- use `ml-8` for most content tables
- use `ml-6` for some lists / supporting blocks where a slightly smaller indent reads better
- use `ml-4` only when matching an existing page pattern such as parts of `what-is-ml`

Body tables:

- usually no visible row lines unless there is a specific reason
- center-align math-heavy columns
- keep first column reasonably narrow

Coordinate / notation examples:

- center the example column
- format expressions as math, not plain text

Summary / checklist tables:

- no visible row lines
- use `✅` / `❌` when appropriate

Note:

- intro roadmap tables may use subtle separators
- body content tables often look better without visible row lines

## 10. Static Visuals and Plots

Use shared components where possible, especially [AlgebraStaticVisual.tsx](/c:/Users/HP/OneDrive/Documents/Ch3rryPi3%20Ltd/Website/leetcheat-site/components/math/AlgebraStaticVisual.tsx).

General plot rules:

- transparent or visually light background when possible
- avoid boxed visuals unless the box is doing real work
- labels that are mathematical expressions should use `MathInline`, not plain SVG text
- visuals should feel tall enough, not squashed
- when a plot only needs the positive quadrant, do not draw axis segments to the left of or below the origin
- use proper SVG `marker` arrowheads for vector arrows instead of hand-drawn arrowhead paths
- prefer the filled triangular marker style used in `components/ml/PredictionGuidePlot.tsx`, not outlined arrowhead strokes
- plots should feel visually centered rather than pushed hard to one side
- if named vectors such as `v` and `u` are plotted, label the points directly and avoid a legend unless it adds something important
- integer tick marks from the origin usually work best for small beginner examples
- helper lines should be thin and only remain if they are actively helping the explanation
- for vector endpoints, keep the point marker visually above the line so the arrowhead does not look like it is drawn on top of the dot

Current common line-graph pattern:

- SVG `viewBox="0 0 760 540"`
- `className="h-auto w-full"`
- transparent background
- proper margin for labels / legend

Current mapping diagram pattern:

- SVG `viewBox="0 0 760 330"`
- input oval blue
- output oval pink
- white numbers inside
- solid white arrows
- rule label above, with the equation in a small panel

Graph markers:

- current shared linear-algebra graph convention uses pink point markers
- even the secondary line may still use pink markers if that helps consistency

Current vector-plot pattern:

- slim white vector lines
- SVG markers for arrowheads
- positive-quadrant-only layout when the example is introductory
- shorten vector paths slightly so the marker arrowhead finishes cleanly before the endpoint dot
- short component annotations like `+2 in x` or `+1 in y` only when they are being directly explained
- in geometric addition pictures, use dashed helper copies only where they clarify the triangle / parallelogram construction; avoid overloading the picture with extra arrowheads on every helper segment

If the user says a plot should look like one in `what-is-ml`, inspect that exact plot and copy the relevant proportions or structure instead of approximating.

## 11. Function / Mapping Diagrams

When showing a function as a machine or mapping:

- keep input on the left and output on the right
- use proper math for the rule
- labels should be clean and minimal
- avoid messy SVG text if HTML + `MathInline` gives a tidier result

Mappings section content should usually progress like this:

1. plain meaning of a mapping
2. one concrete arrow diagram
3. explain the “exactly one output for each input” rule
4. then introduce function-type behaviour visually

Official names:

- one-to-one = injective
- onto = surjective
- one-to-one and onto = bijective
- one-to-many is not a function

## 12. Text Emphasis Patterns

Use `text-white font-semibold` for:

- key distinctions
- beginner warnings
- important terminology

Examples:

- “exactly one output for each input”
- “dependent variable”
- “independent variable”
- “the notation still feels foreign”

If a bridge paragraph contains several key ideas, consider emphasizing the named ideas directly rather than leaving everything at the same weight.

## 13. Lists vs Floating Lines

If several short takeaway lines appear one after another and feel like they are floating, convert them into a proper list.

Typical pattern:

```tsx
<ul className="ml-6 grid gap-3 text-base leading-7 text-[color:var(--color-muted)]">
```

Then each item can use:

- a bullet
- a bolded key term
- a short explanation

This is often cleaner than four isolated paragraphs.

## 14. Introductory Pedagogy Conventions

Things we now explicitly like to do early when relevant:

- say what “is a function of” means
- define dependent and independent variables
- explain what a coefficient is doing
- explain what grouped structure means
- say plainly when something is not a function

We also like to use grounded examples:

- hourly pay
- delivery fees
- apples for repeated quantities
- simple input-output tables

## 15. Body Copy and Contrast

Normal body text uses the muted text colour from [globals.css](/c:/Users/HP/OneDrive/Documents/Ch3rryPi3%20Ltd/Website/leetcheat-site/app/globals.css):

- `--color-muted: #dde6f4`

Important points:

- regular prose should still be bright enough to read clearly
- emphasis should still stand out against regular prose
- do not casually collapse everything into pure white

Current paragraph spacing convention for lesson prose:

- `text-base` is `1.125rem`
- when we use `text-base leading-7` on lesson pages, we globally loosen it to `2.25rem` so it behaves more like `leading-9`
- this is intentional because the default `leading-7` felt too cramped for long-form teaching pages

## 16. Inline Math Alignment

Current global styling for inline math lives in [globals.css](/c:/Users/HP/OneDrive/Documents/Ch3rryPi3%20Ltd/Website/leetcheat-site/app/globals.css):

```css
.math-inline mjx-container {
  display: inline-block !important;
  line-height: 1;
  vertical-align: 0;
}
```

Meaning:

- we are not forcing a manual vertical offset right now
- if inline math alignment looks off, inspect the actual rendered result before changing the global rule

## 17. When to Inspect Existing Pages

Do not guess if the repo already contains a relevant example.

For:

- graph proportions
- equation block style
- intro panel / roadmap layout
- summary table styling
- flashcard or checkpoint sections

inspect the closest real page first, especially:

- [what-is-ml](/c:/Users/HP/OneDrive/Documents/Ch3rryPi3%20Ltd/Website/leetcheat-site/app/ml/foundations/what-is-ml/page.tsx)
- [numbers-variables-and-algebraic-notation](/c:/Users/HP/OneDrive/Documents/Ch3rryPi3%20Ltd/Website/leetcheat-site/app/mathematics/linear-algebra/prerequisites-and-mathematical-language/numbers-variables-and-algebraic-notation/page.tsx)
- [functions-graphs-and-mappings](/c:/Users/HP/OneDrive/Documents/Ch3rryPi3%20Ltd/Website/leetcheat-site/app/mathematics/linear-algebra/prerequisites-and-mathematical-language/functions-graphs-and-mappings/page.tsx)

Actually look at them.

## 18. Practical Defaults

If creating a new math lesson page, default to:

- `ArticleLayout`
- intro `InfoPanel`
- optional intuition `InfoPanel`
- full-width page description: `descriptionClassName="!max-w-none"`
- top-level sections matching the intro roadmap
- `MathInline` / `MathBlock` everywhere for maths
- `ml-8` indented tables
- no visible lines in most body tables
- block equations separated by explanatory text
- beginner examples before abstract terminology
- `Summary` as its own top-level section

## 19. Keep Updating This File

This file should be extended as we settle more patterns.

If a new formatting decision becomes stable, add it here with:

- the rule
- a quick reason
- a reference page if useful
