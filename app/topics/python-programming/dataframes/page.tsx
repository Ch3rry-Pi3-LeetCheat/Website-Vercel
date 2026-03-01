import type { Metadata } from "next";
import Link from "next/link";
import ArticleLayout from "@/components/ArticleLayout";
import InfoPanel from "@/components/InfoPanel";
import RightRail from "@/components/RightRail";
import { pythonDataframeLessons } from "@/lib/pythonTopics";

type SkillItem = {
  title: string;
  note: string;
  level: "Easy";
  href?: string;
  status: "Ready" | "Planned";
};

type SkillGroup = {
  id: string;
  title: string;
  items: SkillItem[];
};

export const metadata: Metadata = {
  title: "Python DataFrames 101 Roadmap",
  description:
    "A structured, LeetCode-style roadmap for pandas dataframe interview skills.",
};

const skillGroups: SkillGroup[] = [
  {
    id: "group-structures",
    title: "Pandas Data Structures",
    items: [
      {
        title: "Create a DataFrame from List",
        note: "Build tables from column lists and row records.",
        level: "Easy",
        href: "/topics/python-programming/dataframes/creating-dataframes",
        status: "Ready",
      },
    ],
  },
  {
    id: "group-inspection",
    title: "Data Inspection",
    items: [
      {
        title: "Get the Size of a DataFrame",
        note: "Use shape quickly and interpret rows vs columns clearly.",
        level: "Easy",
        href: "/topics/python-programming/dataframes/inspection-basics",
        status: "Ready",
      },
      {
        title: "Display the First Three Rows",
        note: "Read head() output to sanity-check structure before analysis.",
        level: "Easy",
        href: "/topics/python-programming/dataframes/inspection-basics",
        status: "Ready",
      },
    ],
  },
  {
    id: "group-selecting",
    title: "Data Selecting",
    items: [
      {
        title: "Select Data",
        note: "Slice rows and columns with masks, loc, and iloc.",
        level: "Easy",
        href: "/topics/python-programming/dataframes/selecting-and-filtering",
        status: "Ready",
      },
      {
        title: "Create a New Column",
        note: "Derive columns from existing features safely.",
        level: "Easy",
        status: "Planned",
      },
    ],
  },
  {
    id: "group-cleaning",
    title: "Data Cleaning",
    items: [
      { title: "Drop Duplicate Rows", note: "Use dedup rules intentionally.", level: "Easy", status: "Planned" },
      { title: "Drop Missing Data", note: "Handle null-heavy rows with explicit rules.", level: "Easy", status: "Planned" },
      { title: "Modify Columns", note: "Apply value transforms without side effects.", level: "Easy", status: "Planned" },
      { title: "Rename Columns", note: "Standardize schema names for cleaner pipelines.", level: "Easy", status: "Planned" },
      { title: "Change Data Type", note: "Cast columns to correct types before modeling.", level: "Easy", status: "Planned" },
      { title: "Fill Missing Data", note: "Use fill strategies that preserve signal.", level: "Easy", status: "Planned" },
    ],
  },
  {
    id: "group-reshaping",
    title: "Table Reshaping",
    items: [
      { title: "Reshape Data: Concatenate", note: "Combine aligned tables by rows or columns.", level: "Easy", status: "Planned" },
      { title: "Reshape Data: Pivot", note: "Turn long tables into wide summaries.", level: "Easy", status: "Planned" },
      { title: "Reshape Data: Melt", note: "Turn wide tables into long format for analysis.", level: "Easy", status: "Planned" },
    ],
  },
  {
    id: "group-advanced",
    title: "Advanced Techniques",
    items: [
      { title: "Method Chaining", note: "Build readable pipelines with one expression per step.", level: "Easy", status: "Planned" },
    ],
  },
];

export default function DataframesRoadmapPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "intro", label: "Introduction" },
    { id: "why-track", label: "Why this track" },
    { id: "skills-map", label: "Skills map" },
    { id: "learning-path", label: "Grouped roadmap" },
    { id: "next-steps", label: "Next steps" },
  ];

  return (
    <ArticleLayout
      eyebrow="Python Programming - DataFrames"
      title="DataFrames 101 roadmap"
      description="This is the central hub for interview-style pandas dataframe skills. Work through the lessons in order, then revisit by category for targeted practice."
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[{ title: "Within DataFrames", links: pythonDataframeLessons }]}
          activeHref="/topics/python-programming/dataframes"
        />
      }
    >
      <InfoPanel id="intro" title="Introduction" variant="intro">
        <p>
          This page is your dataframe skill map. Instead of one long lesson,
          each interview skill gets its own focused page with examples you can
          execute and explain quickly.
        </p>
        <p>Here&apos;s how this track is structured and why each part matters:</p>
        <div className="ml-4 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 text-white font-semibold">Core setup</td>
                <td className="py-2">Create and inspect tables before doing any transformations.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 text-white font-semibold">Selection skills</td>
                <td className="py-2">Filter rows and choose columns with readable, safe code.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 text-white font-semibold">Cleaning</td>
                <td className="py-2">Handle missing data, duplicates, and schema consistency.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="w-56 py-2 pr-4 text-white font-semibold">Reshaping</td>
                <td className="py-2">Move between long and wide formats efficiently.</td>
              </tr>
              <tr>
                <td className="w-56 py-2 pr-4 text-white font-semibold">Pipelines</td>
                <td className="py-2">Use method chaining to present concise interview solutions.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </InfoPanel>

      <InfoPanel id="why-track" title="Why this track" variant="intuition">
        <p>
          Dataframe interview problems are usually short, but they test precision.
          You are expected to know the exact pandas operation and explain why it is
          safe, clear, and correct.
        </p>
        <p>
          The path below is organized to build that exact fluency, from setup to
          transformations to complete chainable solutions.
        </p>
      </InfoPanel>

      <section id="skills-map" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Skills map
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Ready items are live lessons now. Planned items are the next lessons in
          the same format.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm text-[color:var(--color-muted)]">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-[0.16em] text-white/90">
                <th className="py-2">Skill</th>
                <th className="py-2">Page</th>
                <th className="py-2 text-center">Level</th>
                <th className="py-2 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/10">
                <td className="py-3 text-white">Create a DataFrame from List</td>
                <td className="py-3">
                  <Link
                    href="/topics/python-programming/dataframes/creating-dataframes"
                    className="text-[color:var(--color-accent-2)] underline underline-offset-4 hover:text-white transition"
                  >
                    Creating DataFrames
                  </Link>
                </td>
                <td className="py-3 text-center text-emerald-400">Easy</td>
                <td className="py-3 text-center text-emerald-400">Ready</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-3 text-white">Get the Size of a DataFrame</td>
                <td className="py-3">
                  <Link
                    href="/topics/python-programming/dataframes/inspection-basics"
                    className="text-[color:var(--color-accent-2)] underline underline-offset-4 hover:text-white transition"
                  >
                    Inspection basics
                  </Link>
                </td>
                <td className="py-3 text-center text-emerald-400">Easy</td>
                <td className="py-3 text-center text-emerald-400">Ready</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-3 text-white">Display the First Three Rows</td>
                <td className="py-3">
                  <Link
                    href="/topics/python-programming/dataframes/inspection-basics"
                    className="text-[color:var(--color-accent-2)] underline underline-offset-4 hover:text-white transition"
                  >
                    Inspection basics
                  </Link>
                </td>
                <td className="py-3 text-center text-emerald-400">Easy</td>
                <td className="py-3 text-center text-emerald-400">Ready</td>
              </tr>
              <tr>
                <td className="py-3 text-white">Select Data</td>
                <td className="py-3">
                  <Link
                    href="/topics/python-programming/dataframes/selecting-and-filtering"
                    className="text-[color:var(--color-accent-2)] underline underline-offset-4 hover:text-white transition"
                  >
                    Selecting and filtering
                  </Link>
                </td>
                <td className="py-3 text-center text-emerald-400">Easy</td>
                <td className="py-3 text-center text-emerald-400">Ready</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="learning-path" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Grouped roadmap
        </h2>
        <div className="grid gap-6">
          {skillGroups.map((group) => (
            <section key={group.id} id={group.id} className="glass-panel rounded-2xl overflow-hidden">
              <div className="border-b border-white/10 bg-white/5 px-5 py-4">
                <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
                  {group.title}
                </h3>
              </div>
              <div className="divide-y divide-white/10">
                {group.items.map((item) => (
                  <div
                    key={`${group.id}-${item.title}`}
                    className="grid gap-3 px-5 py-4 md:grid-cols-[minmax(0,1fr)_100px_110px] md:items-center"
                  >
                    <div className="grid gap-1">
                      {item.href ? (
                        <Link
                          href={item.href}
                          className="text-lg font-semibold text-white hover:text-[color:var(--color-accent-2)] transition"
                        >
                          {item.title}
                        </Link>
                      ) : (
                        <p className="text-lg font-semibold text-white">{item.title}</p>
                      )}
                      <p className="text-sm text-[color:var(--color-muted)]">{item.note}</p>
                    </div>
                    <p className="text-sm text-emerald-400 md:text-center">{item.level}</p>
                    <p
                      className={`text-sm md:text-center ${
                        item.status === "Ready" ? "text-emerald-400" : "text-[color:var(--color-muted)]"
                      }`}
                    >
                      {item.status}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section id="next-steps" className="scroll-mt-28 grid gap-3">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Next steps
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Start with <span className="text-white">Creating DataFrames</span>, then
          move to <span className="text-white">Inspection basics</span> and{" "}
          <span className="text-white">Selecting and filtering</span>. That gives
          you enough tooling to solve most beginner pandas interview prompts.
        </p>
      </section>
    </ArticleLayout>
  );
}
