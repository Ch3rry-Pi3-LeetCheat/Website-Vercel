import type { ReactNode } from "react";
import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import CollapsibleExample from "@/components/CollapsibleExample";
import ComplexityTable from "@/components/ads/ComplexityTable";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
import { adsPythonTopics } from "@/lib/adsTopics";

type LessonLink = {
  label: string;
  description: string;
  href: string;
};

type LessonExample = {
  id: string;
  title: string;
  explanation: string;
  code: string;
  output?: string;
};

type BeginnerLessonTemplateProps = {
  eyebrow: string;
  title: string;
  description: string;
  intro: string[];
  intuition: string[];
  realWorld: Array<{ scenario: string; mapping: string }>;
  keyIdeaTitle: string;
  keyIdeaText: string[];
  interactiveTitle?: string;
  interactiveDescription?: string;
  interactive?: ReactNode;
  examples: LessonExample[];
  complexityRows: Array<{ operation: string; averageTime: string; extraSpace: string }>;
  pitfalls: string[];
  summary: string[];
  nextStep: string;
  railTitle: string;
  railLinks: LessonLink[];
  activeHref: string;
};

export default function BeginnerLessonTemplate({
  eyebrow,
  title,
  description,
  intro,
  intuition,
  realWorld,
  keyIdeaTitle,
  keyIdeaText,
  interactiveTitle = "Interactive walkthrough",
  interactiveDescription,
  interactive,
  examples,
  complexityRows,
  pitfalls,
  summary,
  nextStep,
  railTitle,
  railLinks,
  activeHref,
}: BeginnerLessonTemplateProps) {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "introduction", label: "Introduction" },
    { id: "intuition", label: "Intuition" },
    { id: "key-idea", label: keyIdeaTitle },
    { id: "interactive", label: interactiveTitle },
    { id: "worked-examples", label: "Worked examples" },
    { id: "complexity", label: "Complexity quick sheet" },
    { id: "pitfalls", label: "Common pitfalls" },
    { id: "summary", label: "Summary" },
    { id: "whats-next", label: "What's next", level: 2 },
  ];

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
            { title: railTitle, links: railLinks },
          ]}
          activeHref={activeHref}
        />
      }
    >
      <InfoPanel id="introduction" title="Introduction" variant="intro">
        {intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        {intuition.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <div className="mt-1 grid gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">
            Real-world intuition
          </p>
          {realWorld.map((item) => (
            <p key={item.scenario} className="text-sm leading-6 text-[color:var(--color-muted)]">
              <span className="text-white font-semibold">{item.scenario}:</span>{" "}
              {item.mapping}
            </p>
          ))}
        </div>
      </InfoPanel>

      <section id="key-idea" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          {keyIdeaTitle}
        </h2>
        {keyIdeaText.map((paragraph) => (
          <p
            key={paragraph}
            className="text-base leading-7 text-[color:var(--color-muted)]"
          >
            {paragraph}
          </p>
        ))}
      </section>

      <section id="interactive" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          {interactiveTitle}
        </h2>
        {interactiveDescription ? (
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            {interactiveDescription}
          </p>
        ) : null}
        {interactive}
      </section>

      <section id="worked-examples" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Worked examples
        </h2>
        <div className="grid gap-4">
          {examples.map((example, index) => (
            <CollapsibleExample
              key={example.id}
              id={example.id}
              title={example.title}
              defaultOpen={index === 0}
            >
              <p className="text-base leading-7 text-[color:var(--color-muted)]">
                {example.explanation}
              </p>
              <CodeBlock code={example.code} title="Python" />
              {example.output ? <OutputBlock output={example.output} /> : null}
            </CollapsibleExample>
          ))}
        </div>
      </section>

      <section id="complexity" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Complexity quick sheet
        </h2>
        <ComplexityTable rows={complexityRows} />
      </section>

      <section id="pitfalls" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Common pitfalls
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              {pitfalls.map((item) => (
                <tr key={item}>
                  <td className="w-12 py-2 text-center text-lg">⚠️</td>
                  <td className="py-2">{item}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="summary" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Summary
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-base leading-7 text-[color:var(--color-muted)]">
            <tbody>
              {summary.map((item) => (
                <tr key={item}>
                  <td className="w-12 py-2 text-center text-lg">✅</td>
                  <td className="py-2">{item}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <section id="whats-next" className="grid gap-3">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">
            What&apos;s next
          </h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            {nextStep}
          </p>
        </section>
      </section>
    </ArticleLayout>
  );
}

export type { LessonLink, LessonExample };
