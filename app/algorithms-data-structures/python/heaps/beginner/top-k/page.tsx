import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
import { heapsBeginnerLessons } from "@/lib/adsBeginnerTopics";

const topKCode = `import heapq

nums = [5, 1, 8, 3, 9, 2]
k = 3

largest = heapq.nlargest(k, nums)
print(largest)`;

const topKOutput = `[9, 8, 5]`;

export default function TopKPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "introduction", label: "Introduction" },
    { id: "intuition", label: "Intuition" },
    { id: "example", label: "Find top k" },
  ];

  return (
    <ArticleLayout
      eyebrow="Algorithms - Python - Heaps"
      title="Top K"
      description="Use heaps to pull out the largest k items without sorting everything." 
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Within Heaps (Beginner)", links: heapsBeginnerLessons },
          ]}
          activeHref="/algorithms-data-structures/python/heaps/beginner/top-k"
        />
      }
    >
      <InfoPanel id="introduction" title="Introduction" variant="intro">
        <p>
          Sorting the entire list is often unnecessary when you only
          need a few largest elements. A heap keeps the work focused on
          the top values.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          The heap acts like a filter: it keeps the most important items
          near the top so you can pull them out quickly.
        </p>
      </InfoPanel>

      <section id="example" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Find top k
        </h2>
        <CodeBlock code={topKCode} title="Python" />
        <OutputBlock output={topKOutput} />
      </section>
    </ArticleLayout>
  );
}
