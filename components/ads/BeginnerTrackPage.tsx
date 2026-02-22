import ArticleLayout from "@/components/ArticleLayout";
import InfoPanel from "@/components/InfoPanel";
import RightRail from "@/components/RightRail";
import Link from "next/link";
import { adsPythonTopics } from "@/lib/adsTopics";

type LessonLink = {
  label: string;
  description: string;
  href: string;
};

type RealWorldExample = {
  scenario: string;
  mapping: string;
};

type BeginnerTrackPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  intuition: string;
  realWorldExamples: RealWorldExample[];
  lessons: LessonLink[];
  activeHref: string;
  structureLabel: string;
};

export default function BeginnerTrackPage({
  eyebrow,
  title,
  description,
  intuition,
  realWorldExamples,
  lessons,
  activeHref,
  structureLabel,
}: BeginnerTrackPageProps) {
  const tocItems = [
    { id: "intro", label: "Introduction" },
    { id: "intuition", label: "Intuition" },
    { id: "ladder", label: "Learning ladder" },
    { id: "start", label: "Start sequence" },
  ];

  const firstLesson = lessons[0];

  return (
    <ArticleLayout
      eyebrow={eyebrow}
      title={title}
      description={description}
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Within CS (Python)", links: adsPythonTopics },
            { title: `Within ${structureLabel} (Beginner)`, links: lessons },
          ]}
          activeHref={activeHref}
        />
      }
    >
      <InfoPanel id="intro" title="Introduction" variant="intro">
        <p>{description}</p>
        <p>
          Before this ladder, complete{" "}
          <Link
            href="/algorithms-data-structures/python/foundations/big-o"
            className="text-[color:var(--color-accent-2)] underline-offset-4 hover:underline"
          >
            Big-O Foundations
          </Link>{" "}
          so operation costs feel intuitive while learning patterns.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>{intuition}</p>
        <p>
          The ladder below is intentionally ordered: core shape first, common
          operations second, and interview pattern transfer third.
        </p>
        <div className="mt-1 grid gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">
            Real-world intuition
          </p>
          {realWorldExamples.map((example) => (
            <p key={example.scenario} className="text-sm text-[color:var(--color-muted)]">
              <span className="text-white font-semibold">{example.scenario}:</span>{" "}
              {example.mapping}
            </p>
          ))}
        </div>
      </InfoPanel>

      <section id="ladder" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Learning ladder
        </h2>
        <div className="grid gap-4">
          {lessons.map((lesson, index) => (
            <Link
              key={lesson.href}
              href={lesson.href}
              className="glass-panel rounded-2xl px-6 py-5 transition hover:border-white/30"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
                Step {index + 1}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-white">{lesson.label}</h3>
              <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">
                {lesson.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section id="start" className="scroll-mt-28 grid gap-3">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Start sequence
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Recommended order:
          1) Big-O foundations, 2) this ladder from top to bottom, 3) return to
          mixed practice where pattern recognition matters.
        </p>
        {firstLesson ? (
          <Link
            href={firstLesson.href}
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
          >
            Start with {firstLesson.label}
            <span aria-hidden>&rarr;</span>
          </Link>
        ) : null}
      </section>
    </ArticleLayout>
  );
}
