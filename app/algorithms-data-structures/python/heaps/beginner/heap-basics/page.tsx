import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
import { heapsBeginnerLessons } from "@/lib/adsBeginnerTopics";

const heapifyCode = `import heapq

nums = [5, 1, 8, 3]
heapq.heapify(nums)

print(heapq.heappop(nums))
print(heapq.heappop(nums))`;

const heapifyOutput = `1
3`;

const pushCode = `import heapq

heap = []
for n in [4, 2, 7]:
    heapq.heappush(heap, n)

print(heapq.heappop(heap))`;

const pushOutput = `2`;

export default function HeapBasicsPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "introduction", label: "Introduction" },
    { id: "intuition", label: "Intuition" },
    { id: "heapify", label: "Heapify and pop" },
    { id: "push", label: "Push into a heap" },
  ];

  return (
    <ArticleLayout
      eyebrow="Algorithms - Python - Heaps"
      title="Heap Basics"
      description="Python heaps are min-heaps. The smallest item is always on top." 
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Within Heaps (Beginner)", links: heapsBeginnerLessons },
          ]}
          activeHref="/algorithms-data-structures/python/heaps/beginner/heap-basics"
        />
      }
    >
      <InfoPanel id="introduction" title="Introduction" variant="intro">
        <p>
          A heap is a tree-like structure where the smallest value is
          always accessible. Python provides a ready-to-use heap via the
          <span className="font-mono inline-code">heapq</span> module.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          Imagine a pile of numbers where the smallest number always sits
          at the top. Every pop removes that smallest item.
        </p>
      </InfoPanel>

      <section id="heapify" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Heapify and pop
        </h2>
        <CodeBlock code={heapifyCode} title="Python" />
        <OutputBlock output={heapifyOutput} />
      </section>

      <section id="push" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Push into a heap
        </h2>
        <CodeBlock code={pushCode} title="Python" />
        <OutputBlock output={pushOutput} />
      </section>
    </ArticleLayout>
  );
}
