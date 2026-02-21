import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import OutputBlock from "@/components/OutputBlock";
import Link from "next/link";
import InfoPanel from "@/components/InfoPanel";
import RightRail from "@/components/RightRail";
import { mlFoundationsLessons } from "@/lib/mlTopics";

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

const datasetCode = `import pandas as pd

# Same core rows as the what-is-ml page, now augmented with extra columns
# used in this data-types lesson.
df = pd.DataFrame({
    "floor_area": [52, 68, 75, 90, 110, 130, 145, 160],
    "bedrooms": [1, 2, 2, 3, 3, 4, 4, 5],
    "num_floors": [1, 2, 1, 2, 2, 2, 3, 3],
    "age_years": [12, 8, 20, 5, 7, 14, 4, 9],
    "distance_to_centre": [4.5, 3.2, 6.0, 5.5, 2.8, 7.5, 3.0, 8.0],
    "interest_rate": [3.90, 3.70, 4.20, 3.95, 3.55, 4.35, 3.60, 4.10],
    "has_garden": ["no", "no", "yes", "yes", "yes", "yes", "yes", "yes"],
    "property_type": ["flat", "flat", "terrace", "terrace", "semi", "semi", "detached", "detached"],
    "listing_date": ["2025-01-14", "2025-01-20", "2025-02-02", "2025-02-11", "2025-03-03", "2025-03-12", "2025-03-28", "2025-04-10"],
    "price_gbp": [210000, 265000, 255000, 310000, 365000, 390000, 460000, 455000],
})

df["listing_date"] = pd.to_datetime(df["listing_date"])
print(df.head())`;

const datasetHeadOutput = `   floor_area  bedrooms  num_floors  age_years  distance_to_centre  interest_rate has_garden property_type listing_date  price_gbp
0          52         1           1         12                 4.5           3.90         no         flat   2025-01-14     210000
1          68         2           2          8                 3.2           3.70         no         flat   2025-01-20     265000
2          75         2           1         20                 6.0           4.20        yes      terrace   2025-02-02     255000
3          90         3           2          5                 5.5           3.95        yes      terrace   2025-02-11     310000
4         110         3           2          7                 2.8           3.55        yes         semi   2025-03-03     365000`;

const infoCode = `df.info()`;

const infoOutput = `<class 'pandas.core.frame.DataFrame'>
RangeIndex: 8 entries, 0 to 7
Data columns (total 10 columns):
 #   Column              Non-Null Count  Dtype
---  ------              --------------  -----
 0   floor_area          8 non-null      int64
 1   bedrooms            8 non-null      int64
 2   num_floors          8 non-null      int64
 3   age_years           8 non-null      int64
 4   distance_to_centre  8 non-null      float64
 5   interest_rate       8 non-null      float64
 6   has_garden          8 non-null      object
 7   property_type       8 non-null      object
 8   listing_date        8 non-null      datetime64[ns]
 9   price_gbp           8 non-null      int64
dtypes: datetime64[ns](1), float64(2), int64(5), object(2)
memory usage: ~0.8 KB`;

const describeCode = `print(df.describe()[["floor_area", "num_floors", "distance_to_centre", "price_gbp"]])`;

const describeOutput = `       floor_area  num_floors  distance_to_centre      price_gbp
count    8.000000    8.000000            8.000000       8.000000
mean   103.750000    2.000000            5.062500  338750.000000
std     38.850446    0.755929            2.028326   93646.371297
min     52.000000    1.000000            2.800000  210000.000000
25%     73.250000    1.750000            3.150000  262500.000000
50%    100.000000    2.000000            5.000000  337500.000000
75%    133.750000    2.250000            6.375000  406250.000000
max    160.000000    3.000000            8.000000  460000.000000`;

const scaleCode = `# Quick scale check for two numeric features
print(df[["floor_area", "num_floors"]].describe().loc[["mean", "std", "min", "max"]])`;

const scaleOutput = `      floor_area  num_floors
mean  103.750000    2.000000
std    38.850446    0.755929
min    52.000000    1.000000
max   160.000000    3.000000`;

const castCategoryCode = `# String categories start as object in pandas.
# Converting to category is often cleaner + more memory efficient.
df["has_garden"] = df["has_garden"].astype("category")
df["property_type"] = df["property_type"].astype("category")`;

const currentLessonHref = "/ml/foundations/data-types-features-labels";
const currentLessonIndex = mlFoundationsLessons.findIndex((lesson) => lesson.href === currentLessonHref);
const nextLesson = currentLessonIndex >= 0 ? mlFoundationsLessons[currentLessonIndex + 1] : undefined;

export default function DataTypesFeaturesLabelsPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "intro", label: "Introduction" },
    { id: "recap", label: "Quick recap", level: 2 },
    { id: "page-roadmap", label: "What this page covers", level: 2 },
    { id: "types", label: "Common data types" },
    { id: "type-integer", label: "Integer", level: 2 },
    { id: "type-float", label: "Float / decimal", level: 2 },
    { id: "type-boolean", label: "Boolean", level: 2 },
    { id: "type-categorical", label: "Categorical", level: 2 },
    { id: "type-datetime", label: "Date / time", level: 2 },
    { id: "python-dataset", label: "Python dataset" },
    { id: "pandas-info", label: ".info()", level: 2 },
    { id: "pandas-describe", label: ".describe()", level: 2 },
    { id: "dtype-notes", label: "Object dtype", level: 2 },
    { id: "scale-notes", label: "Scale check", level: 2 },
    { id: "summary", label: "Summary" },
    { id: "key-takeaways", label: "Key takeaways", level: 2 },
    { id: "whats-next", label: "What's next", level: 2 },
  ];

  return (
    <div className="overflow-x-clip">
      <ArticleLayout
        eyebrow="ML - Foundations"
        title="Data types"
        description="How to recognise common ML column types and why each one behaves differently."
        descriptionClassName="italic"
        tocItems={tocItems}
        rightRail={
          <RightRail
            sections={[{ title: "Within Foundations", links: mlFoundationsLessons }]}
            activeHref="/ml/foundations/data-types-features-labels"
          />
        }
      >
        <InfoPanel id="intro" title="Introduction" variant="intro">
          <p>
            This lesson is focused on one practical goal: quickly recognising
            what type each column is, and what that implies before model
            training.
          </p>
          <h3 id="recap" className="scroll-mt-28 pt-1 text-xl font-semibold text-white">
            Quick recap
          </h3>
          <p>
            We are still using the same house-pricing context, so ideas stack
            cleanly instead of resetting each page.
          </p>
          <div className="glass-panel rounded-2xl p-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-center text-sm text-[color:var(--color-muted)]">
                <thead>
                  <tr className="border-b border-white/10 text-xs uppercase tracking-[0.2em]">
                    <th className="py-2"><span className="math-x">floor_area</span></th>
                    <th className="py-2"><span className="math-x">bedrooms</span></th>
                    <th className="py-2"><span className="math-x">distance_to_centre</span></th>
                    <th className="py-2"><span className="math-y">price_gbp</span></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="py-2">52</td>
                    <td className="py-2">1</td>
                    <td className="py-2">4.5</td>
                    <td className="py-2">210,000</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2">68</td>
                    <td className="py-2">2</td>
                    <td className="py-2">3.2</td>
                    <td className="py-2">265,000</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 text-white/70">&#8942;</td>
                    <td className="py-2 text-white/70">&#8942;</td>
                    <td className="py-2 text-white/70">&#8942;</td>
                    <td className="py-2 text-white/70">&#8942;</td>
                  </tr>
                  <tr>
                    <td className="py-2">160</td>
                    <td className="py-2">5</td>
                    <td className="py-2">8.0</td>
                    <td className="py-2">455,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <h3 id="page-roadmap" className="scroll-mt-28 pt-1 text-xl font-semibold text-white">
            What this page covers
          </h3>
          <div className="ml-4 overflow-x-auto">
            <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="w-56 py-2 pr-4 text-white font-semibold">Type recognition</td>
                  <td className="py-2">Identify integer, float, boolean, categorical, and date/time columns quickly.</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="w-56 py-2 pr-4 text-white font-semibold">Practical Python view</td>
                  <td className="py-2">Build the full DataFrame and inspect dtypes with <span className="font-mono inline-code">.info()</span>.</td>
                </tr>
                <tr>
                  <td className="w-56 py-2 pr-4 text-white font-semibold">Scale awareness</td>
                  <td className="py-2">See how different numeric scales can affect optimisation speed for some models.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </InfoPanel>

        <section id="types" className="scroll-mt-28 grid gap-4">
          <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
            Common data types
          </h2>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            In each mini-table, the <span className="math-x">&#8943;</span> columns
            mean there are other fields in the full dataset; we are just
            spotlighting one type at a time.
          </p>

          <section id="type-integer" className="grid gap-2">
            <h3 className="text-lg font-semibold text-white font-[var(--font-display)]">Integer</h3>
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Integers are whole numbers you can count. In this housing setting,
              examples are <span className="math-x font-mono">bedrooms</span>,
              <span className="math-x font-mono"> num_floors</span>, and
              <span className="math-x font-mono"> age_years</span>.
            </p>
            <div className="glass-panel rounded-2xl p-4">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-center text-sm text-[color:var(--color-muted)]">
                  <thead>
                    <tr className="border-b border-white/10 text-xs uppercase tracking-[0.2em]">
                      <th className="w-1/6 py-2"><span className="math-x">&#8943;</span></th>
                      <th className="w-1/6 py-2"><span className="math-x">bedrooms</span></th>
                      <th className="w-1/6 py-2"><span className="math-x">num_floors</span></th>
                      <th className="w-1/6 py-2"><span className="math-x">age_years</span></th>
                      <th className="w-1/6 py-2"><span className="math-x">&#8943;</span></th>
                      <th className="w-1/6 py-2"><span className="math-y font-mono">price_gbp</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/10"><td className="py-2 text-white/70">&#8943;</td><td className="py-2">1</td><td className="py-2">1</td><td className="py-2">12</td><td className="py-2 text-white/70">&#8943;</td><td className="py-2">210,000</td></tr>
                    <tr className="border-b border-white/10"><td className="py-2 text-white/70">&#8943;</td><td className="py-2">2</td><td className="py-2">2</td><td className="py-2">8</td><td className="py-2 text-white/70">&#8943;</td><td className="py-2">265,000</td></tr>
                    <tr className="border-b border-white/10"><td className="py-2 text-white/70">&#8943;</td><td className="py-2 text-white/70">&#8942;</td><td className="py-2 text-white/70">&#8942;</td><td className="py-2 text-white/70">&#8942;</td><td className="py-2 text-white/70">&#8943;</td><td className="py-2 text-white/70">&#8942;</td></tr>
                    <tr><td className="py-2 text-white/70">&#8943;</td><td className="py-2">5</td><td className="py-2">3</td><td className="py-2">9</td><td className="py-2 text-white/70">&#8943;</td><td className="py-2">455,000</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section id="type-float" className="grid gap-2">
            <h3 className="text-lg font-semibold text-white font-[var(--font-display)]">Float / decimal</h3>
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Floats are measurements with fractional precision, such as
              <span className="math-x font-mono"> distance_to_centre</span> and
              <span className="math-x font-mono"> interest_rate</span>.
            </p>
            <div className="glass-panel rounded-2xl p-4">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-center text-sm text-[color:var(--color-muted)]">
                  <thead><tr className="border-b border-white/10 text-xs uppercase tracking-[0.2em]"><th className="w-1/5 py-2"><span className="math-x">&#8943;</span></th><th className="w-1/5 py-2"><span className="math-x">distance_to_centre</span></th><th className="w-1/5 py-2"><span className="math-x">interest_rate</span></th><th className="w-1/5 py-2"><span className="math-x">&#8943;</span></th><th className="w-1/5 py-2"><span className="math-y font-mono">price_gbp</span></th></tr></thead>
                  <tbody>
                    <tr className="border-b border-white/10"><td className="py-2 text-white/70">&#8943;</td><td className="py-2">4.5</td><td className="py-2">3.90</td><td className="py-2 text-white/70">&#8943;</td><td className="py-2">210,000</td></tr>
                    <tr className="border-b border-white/10"><td className="py-2 text-white/70">&#8943;</td><td className="py-2">3.2</td><td className="py-2">3.70</td><td className="py-2 text-white/70">&#8943;</td><td className="py-2">265,000</td></tr>
                    <tr className="border-b border-white/10"><td className="py-2 text-white/70">&#8943;</td><td className="py-2 text-white/70">&#8942;</td><td className="py-2 text-white/70">&#8942;</td><td className="py-2 text-white/70">&#8943;</td><td className="py-2 text-white/70">&#8942;</td></tr>
                    <tr><td className="py-2 text-white/70">&#8943;</td><td className="py-2">8.0</td><td className="py-2">4.10</td><td className="py-2 text-white/70">&#8943;</td><td className="py-2">455,000</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section id="type-boolean" className="grid gap-2">
            <h3 className="text-lg font-semibold text-white font-[var(--font-display)]">Boolean (binary category)</h3>
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Binary fields have two states. Here we keep
              <span className="math-x font-mono"> has_garden</span> as
              yes / no strings so you can see how pandas dtypes treat it.
            </p>
            <div className="glass-panel rounded-2xl p-4">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-center text-sm text-[color:var(--color-muted)]">
                  <thead><tr className="border-b border-white/10 text-xs uppercase tracking-[0.2em]"><th className="w-1/4 py-2"><span className="math-x">&#8943;</span></th><th className="w-1/4 py-2"><span className="math-x">has_garden</span></th><th className="w-1/4 py-2"><span className="math-x">&#8943;</span></th><th className="w-1/4 py-2"><span className="math-y font-mono">price_gbp</span></th></tr></thead>
                  <tbody>
                    <tr className="border-b border-white/10"><td className="py-2 text-white/70">&#8943;</td><td className="py-2 text-rose-400">no</td><td className="py-2 text-white/70">&#8943;</td><td className="py-2">210,000</td></tr>
                    <tr className="border-b border-white/10"><td className="py-2 text-white/70">&#8943;</td><td className="py-2 text-rose-400">no</td><td className="py-2 text-white/70">&#8943;</td><td className="py-2">265,000</td></tr>
                    <tr className="border-b border-white/10"><td className="py-2 text-white/70">&#8943;</td><td className="py-2 text-white/70">&#8942;</td><td className="py-2 text-white/70">&#8943;</td><td className="py-2 text-white/70">&#8942;</td></tr>
                    <tr><td className="py-2 text-white/70">&#8943;</td><td className="py-2 text-emerald-400">yes</td><td className="py-2 text-white/70">&#8943;</td><td className="py-2">455,000</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section id="type-categorical" className="grid gap-2">
            <h3 className="text-lg font-semibold text-white font-[var(--font-display)]">Categorical (multi-level)</h3>
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Multi-level categories are named groups, not numeric magnitudes.
              Here the variable is <span className="math-x font-mono">property_type</span>.
            </p>
            <div className="glass-panel rounded-2xl p-4">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-center text-sm text-[color:var(--color-muted)]">
                  <thead><tr className="border-b border-white/10 text-xs uppercase tracking-[0.2em]"><th className="w-1/4 py-2"><span className="math-x">&#8943;</span></th><th className="w-1/4 py-2"><span className="math-x">property_type</span></th><th className="w-1/4 py-2"><span className="math-x">&#8943;</span></th><th className="w-1/4 py-2"><span className="math-y font-mono">price_gbp</span></th></tr></thead>
                  <tbody>
                    <tr className="border-b border-white/10"><td className="py-2 text-white/70">&#8943;</td><td className="py-2">flat</td><td className="py-2 text-white/70">&#8943;</td><td className="py-2">210,000</td></tr>
                    <tr className="border-b border-white/10"><td className="py-2 text-white/70">&#8943;</td><td className="py-2">flat</td><td className="py-2 text-white/70">&#8943;</td><td className="py-2">265,000</td></tr>
                    <tr className="border-b border-white/10"><td className="py-2 text-white/70">&#8943;</td><td className="py-2 text-white/70">&#8942;</td><td className="py-2 text-white/70">&#8943;</td><td className="py-2 text-white/70">&#8942;</td></tr>
                    <tr><td className="py-2 text-white/70">&#8943;</td><td className="py-2">detached</td><td className="py-2 text-white/70">&#8943;</td><td className="py-2">455,000</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section id="type-datetime" className="grid gap-2">
            <h3 className="text-lg font-semibold text-white font-[var(--font-display)]">Date / time</h3>
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Date columns tell us when events happened. For housing, we use
              <span className="math-x font-mono"> listing_date</span> (the date the
              property was listed for sale).
            </p>
            <div className="glass-panel rounded-2xl p-4">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-center text-sm text-[color:var(--color-muted)]">
                  <thead><tr className="border-b border-white/10 text-xs uppercase tracking-[0.2em]"><th className="w-1/4 py-2"><span className="math-x">&#8943;</span></th><th className="w-1/4 py-2"><span className="math-x">listing_date</span></th><th className="w-1/4 py-2"><span className="math-x">&#8943;</span></th><th className="w-1/4 py-2"><span className="math-y font-mono">price_gbp</span></th></tr></thead>
                  <tbody>
                    <tr className="border-b border-white/10"><td className="py-2 text-white/70">&#8943;</td><td className="py-2">2025-01-14</td><td className="py-2 text-white/70">&#8943;</td><td className="py-2">210,000</td></tr>
                    <tr className="border-b border-white/10"><td className="py-2 text-white/70">&#8943;</td><td className="py-2">2025-01-20</td><td className="py-2 text-white/70">&#8943;</td><td className="py-2">265,000</td></tr>
                    <tr className="border-b border-white/10"><td className="py-2 text-white/70">&#8943;</td><td className="py-2 text-white/70">&#8942;</td><td className="py-2 text-white/70">&#8943;</td><td className="py-2 text-white/70">&#8942;</td></tr>
                    <tr><td className="py-2 text-white/70">&#8943;</td><td className="py-2">2025-04-10</td><td className="py-2 text-white/70">&#8943;</td><td className="py-2">455,000</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </section>

        <section id="python-dataset" className="scroll-mt-28 grid gap-4">
          <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
            Python dataset walkthrough
          </h2>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Next, let&apos;s build one full DataFrame that combines the core rows
            from the previous lesson with the extra columns introduced above.
          </p>
          <CodeBlock code={datasetCode} title="Python" />
          <OutputBlock output={datasetHeadOutput} />

          <h3 id="pandas-info" className="scroll-mt-28 text-xl font-semibold text-white">
            Check dtypes with <span className="font-mono inline-code">.info()</span>
          </h3>
          <CodeBlock code={infoCode} title="Python" />
          <OutputBlock output={infoOutput} />

          <h3 id="pandas-describe" className="scroll-mt-28 text-xl font-semibold text-white">
            Summarise numerics with <span className="font-mono inline-code">.describe()</span>
          </h3>
          <CodeBlock code={describeCode} title="Python" />
          <OutputBlock output={describeOutput} />

          <h3 id="dtype-notes" className="scroll-mt-28 text-xl font-semibold text-white">
            Why do some columns show as <span className="font-mono inline-code">object</span>?
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Confirmed: in this dataset, string columns such as
            <span className="math-x font-mono"> has_garden</span> and
            <span className="math-x font-mono"> property_type</span> show up as
            <span className="font-mono inline-code">object</span> by default in pandas.
            That simply means &quot;generic Python strings&quot; here. If you add
            free-text columns later, they also typically appear as
            <span className="font-mono inline-code">object</span> at first.
          </p>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            For true categories, converting to
            <span className="font-mono inline-code">category</span> is usually cleaner.
          </p>
          <CodeBlock code={castCategoryCode} title="Python" />

          <h3 id="scale-notes" className="scroll-mt-28 text-xl font-semibold text-white">
            Quick scale check
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Numeric variables can live on very different scales. For example,
            <span className="math-x font-mono"> floor_area</span> is in the
            tens/hundreds, while <span className="math-x font-mono">num_floors</span>
            is typically low single digits.
          </p>
          <CodeBlock code={scaleCode} title="Python" />
          <OutputBlock output={scaleOutput} />
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            For some optimisation-based models, big scale differences can slow
            convergence if features are left unscaled.
          </p>
        </section>

        <section id="summary" className="scroll-mt-28 grid gap-4">
          <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
            Summary
          </h2>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            This page was designed as a practical foundation: enough{" "}
            <span className="text-white font-semibold">intuition</span> to
            recognise column types confidently, plus a{" "}
            <span className="text-white font-semibold">concrete Python walkthrough</span>{" "}
            to inspect dtypes in practice.
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
                  <tr><td className="w-12 py-2 text-center text-lg">&#9989;</td><td className="py-2">Common types: integer, float, binary category, multi-level category, and date/time.</td></tr>
                  <tr><td className="w-12 py-2 text-center text-lg">&#9989;</td><td className="py-2">How to build one consistent DataFrame that extends the same house dataset from the previous lesson.</td></tr>
                  <tr><td className="w-12 py-2 text-center text-lg">&#9989;</td><td className="py-2">Why string categories appear as <span className="font-mono inline-code">object</span> in pandas by default, and when to cast to <span className="font-mono inline-code">category</span>.</td></tr>
                  <tr><td className="w-12 py-2 text-center text-lg">&#9989;</td><td className="py-2">How <span className="font-mono inline-code">.info()</span> and <span className="font-mono inline-code">.describe()</span> act as quick dataset sanity checks.</td></tr>
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
                  <tr><td className="w-12 py-2 text-center text-lg">&#10060;</td><td className="py-2">How to encode categorical variables into model-ready numerics (for example, dummy variables and one-hot encoding).</td></tr>
                  <tr><td className="w-12 py-2 text-center text-lg">&#10060;</td><td className="py-2">How to handle different feature scales so optimisation is stable and efficient.</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="whats-next" className="grid gap-3">
            <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
              What&apos;s next
            </h3>
            <p className="text-base leading-7 text-[color:var(--color-muted)]">
              Next lesson: <span className="text-white font-semibold">train/test splits</span>.
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
