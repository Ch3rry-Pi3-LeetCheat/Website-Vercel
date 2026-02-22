import BeginnerLessonTemplate from "@/components/ads/BeginnerLessonTemplate";
import HeapStateStepper from "@/components/ads/HeapStateStepper";
import { heapsBeginnerLessons } from "@/lib/adsBeginnerTopics";

const heapifyCode = `import heapq

nums = [7, 2, 9, 1, 5]
heapq.heapify(nums)
print(nums)

smallest = heapq.heappop(nums)
print(smallest)
print(nums)`;

const heapifyOutput = `[1, 2, 9, 7, 5]
1
[2, 5, 9, 7]`;

const pushCode = `import heapq

heap = []
for value in [5, 3, 8, 1]:
    heapq.heappush(heap, value)

print(heap[0])`;

const pushOutput = `1`;

export default function HeapBasicsPage() {
  return (
    <BeginnerLessonTemplate
      eyebrow="CS - Python - Heaps"
      title="Heap Basics"
      description="Learn the min-heap invariant and why heaps are ideal when you repeatedly need the smallest element."
      intro={[
        "A heap is a tree-like structure optimized for quick access to one extreme value (min or max).",
        "Python heapq is a min-heap, so heap[0] is always the smallest element.",
      ]}
      intuition={[
        "Think of a leaderboard where only the current best item matters at every step.",
        "A heap does not fully sort everything; it maintains enough order to expose the top candidate quickly.",
      ]}
      realWorld={[
        {
          scenario: "Priority scheduler",
          mapping:
            "Jobs with smallest deadline/priority value are popped first.",
        },
        {
          scenario: "Live stream ranking",
          mapping:
            "Keep quickly accessible minimum/maximum among changing values.",
        },
      ]}
      keyIdeaTitle="Heap invariant"
      keyIdeaText={[
        "In a min-heap, parent value <= child values.",
        "Only local parent-child ordering is guaranteed, not full sorted order.",
        "Push and pop maintain invariant via sift-up / sift-down operations.",
      ]}
      interactiveDescription="Observe heap invariant as values are pushed and popped."
      interactive={
        <HeapStateStepper
          title="Min-heap state explorer"
          subtitle="Heap displayed both as tree and backing array."
          steps={[
            {
              title: "Start with [5]",
              explanation: "Single node trivially satisfies heap property.",
              heap: [5],
              focusIndices: [0],
            },
            {
              title: "Push 3",
              explanation: "3 rises to root because it is smaller than 5.",
              heap: [3, 5],
              focusIndices: [0, 1],
            },
            {
              title: "Push 8",
              explanation: "8 stays as child because parent 3 is smaller.",
              heap: [3, 5, 8],
              focusIndices: [2],
            },
            {
              title: "Push 1",
              explanation: "1 bubbles to root after comparisons.",
              heap: [1, 3, 8, 5],
              focusIndices: [0, 3],
            },
            {
              title: "Pop min",
              explanation: "Root removed, last element moved up, then sifted down.",
              heap: [3, 5, 8],
              focusIndices: [0],
            },
          ]}
        />
      }
      examples={[
        {
          id: "ex-heapify",
          title: "Example 1: heapify and pop",
          explanation:
            "heapify converts a list to heap structure, then heappop removes min.",
          code: heapifyCode,
          output: heapifyOutput,
        },
        {
          id: "ex-push",
          title: "Example 2: Build by heappush",
          explanation:
            "heappush preserves heap invariant on each insertion.",
          code: pushCode,
          output: pushOutput,
        },
      ]}
      complexityRows={[
        { operation: "Peek min", averageTime: String.raw`O(1)`, extraSpace: String.raw`O(1)` },
        { operation: "Push", averageTime: String.raw`O(\log n)`, extraSpace: String.raw`O(1)` },
        { operation: "Pop min", averageTime: String.raw`O(\log n)`, extraSpace: String.raw`O(1)` },
        { operation: "Heapify n items", averageTime: String.raw`O(n)`, extraSpace: String.raw`O(1)` },
      ]}
      pitfalls={[
        "Assuming heap list is globally sorted.",
        "Using sort repeatedly instead of heap for repeated min extraction.",
        "Forgetting Python heapq is min-heap by default.",
      ]}
      summary={[
        "Heaps optimize repeated extreme-value access, not full sorting.",
        "Min-heap invariant is local parent-child ordering.",
        "heapq is a core tool for priority and top-k style problems.",
      ]}
      nextStep="Next we will apply heaps to Top K, where limited heap size gives strong performance wins."
      railTitle="Within Heaps (Beginner)"
      railLinks={heapsBeginnerLessons}
      activeHref="/algorithms-data-structures/python/heaps/beginner/heap-basics"
    />
  );
}

