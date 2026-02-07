import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
import { hashTablesBeginnerLessons } from "@/lib/adsBeginnerTopics";

const twoSumCode = `nums = [2, 7, 11, 15]
target = 9

seen = {}

for i, num in enumerate(nums):
    need = target - num
    if need in seen:
        print([seen[need], i])
        break
    seen[num] = i`;

const twoSumOutput = `[0, 1]`;

export default function TwoSumPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "introduction", label: "Introduction" },
    { id: "intuition", label: "Intuition" },
    { id: "example", label: "One-pass solution" },
    { id: "complexity", label: "Complexity" },
  ];

  return (
    <ArticleLayout
      eyebrow="Algorithms - Python - Hash Tables"
      title="Two Sum Pattern"
      description="Store complements so you can find pairs in a single pass." 
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Within Hash Tables (Beginner)", links: hashTablesBeginnerLessons },
          ]}
          activeHref="/algorithms-data-structures/python/hash-tables/beginner/two-sum"
        />
      }
    >
      <InfoPanel id="introduction" title="Introduction" variant="intro">
        <p>
          Two sum is a classic pattern. You track what you have seen so
          far, then check if the needed complement already exists.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          If you need two numbers to add to a target, each number tells
          you which partner it needs. The dictionary stores those
          partners as you go.
        </p>
      </InfoPanel>

      <section id="example" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          One-pass solution
        </h2>
        <CodeBlock code={twoSumCode} title="Python" />
        <OutputBlock output={twoSumOutput} />
      </section>

      <section id="complexity" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Complexity
        </h2>
        <ul className="grid list-disc list-inside gap-2 text-sm text-[color:var(--color-muted)]">
          <li>Time: O(n) because you scan once.</li>
          <li>Space: O(n) for the dictionary.</li>
        </ul>
      </section>
    </ArticleLayout>
  );
}
