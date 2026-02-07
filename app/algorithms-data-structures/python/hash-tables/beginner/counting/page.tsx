import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
import { hashTablesBeginnerLessons } from "@/lib/adsBeginnerTopics";

const countCode = `text = "banana"
counts = {}

for ch in text:
    counts[ch] = counts.get(ch, 0) + 1

print(counts)`;

const countOutput = `{'b': 1, 'a': 3, 'n': 2}`;

const maxCode = `text = "banana"
counts = {}

for ch in text:
    counts[ch] = counts.get(ch, 0) + 1

most = max(counts, key=counts.get)
print(most, counts[most])`;

const maxOutput = `a 3`;

export default function CountingPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "introduction", label: "Introduction" },
    { id: "intuition", label: "Intuition" },
    { id: "counting", label: "Build a frequency map" },
    { id: "max", label: "Find the most common" },
  ];

  return (
    <ArticleLayout
      eyebrow="Algorithms - Python - Hash Tables"
      title="Counting Pattern"
      description="Use a dictionary to count frequencies in one pass." 
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Within Hash Tables (Beginner)", links: hashTablesBeginnerLessons },
          ]}
          activeHref="/algorithms-data-structures/python/hash-tables/beginner/counting"
        />
      }
    >
      <InfoPanel id="introduction" title="Introduction" variant="intro">
        <p>
          Counting is one of the most common dictionary patterns. You
          walk the data once and update a running total for each item.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          Each time you see a character, you add one tally mark next to
          its name. The dictionary is just a digital tally sheet.
        </p>
      </InfoPanel>

      <section id="counting" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Build a frequency map
        </h2>
        <CodeBlock code={countCode} title="Python" />
        <OutputBlock output={countOutput} />
      </section>

      <section id="max" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Find the most common character
        </h2>
        <CodeBlock code={maxCode} title="Python" />
        <OutputBlock output={maxOutput} />
      </section>
    </ArticleLayout>
  );
}
