import BeginnerLessonTemplate from "@/components/ads/BeginnerLessonTemplate";
import HeapStateStepper from "@/components/ads/HeapStateStepper";
import { heapsBeginnerLessons } from "@/lib/adsBeginnerTopics";

const topKCode = `import heapq

def top_k_largest(nums, k):
    heap = []
    for value in nums:
        if len(heap) < k:
            heapq.heappush(heap, value)
        elif value > heap[0]:
            heapq.heapreplace(heap, value)
    return sorted(heap, reverse=True)

print(top_k_largest([7, 2, 9, 1, 5, 11, 4], 3))`;

const topKOutput = `[11, 9, 7]`;

const kthCode = `import heapq

nums = [7, 2, 9, 1, 5, 11, 4]
k = 3

heap = nums[:k]
heapq.heapify(heap)
for value in nums[k:]:
    if value > heap[0]:
        heapq.heapreplace(heap, value)

print(heap[0])`;

const kthOutput = `7`;

export default function TopKPage() {
  return (
    <BeginnerLessonTemplate
      eyebrow="CS - Python - Heaps"
      title="Top K"
      description="Use a size-k min-heap to keep only the most important K values efficiently."
      intro={[
        "Top K problems ask for the largest or smallest K elements without fully sorting all data.",
        "A size-k min-heap is the standard approach for largest-k: smallest of kept values sits at root.",
      ]}
      intuition={[
        "Imagine a podium with only k slots. A new candidate only gets in if they beat the current weakest podium member.",
        "The weakest kept member is heap[0], so replacement checks are O(1) + O(log k) update.",
      ]}
      realWorld={[
        {
          scenario: "Top trending posts",
          mapping:
            "Keep only top k engagement scores while processing a stream.",
        },
        {
          scenario: "Largest transactions alert",
          mapping:
            "Track top k transaction amounts in near real time.",
        },
      ]}
      keyIdeaTitle="Fixed-size heap strategy"
      keyIdeaText={[
        "Fill heap until size k.",
        "For each new value x, compare with heap[0] (current weakest kept).",
        "If x is stronger, replace root. Otherwise ignore x.",
      ]}
      interactiveDescription="Watch k=3 heap as stream values arrive."
      interactive={
        <HeapStateStepper
          title="Top-3 stream update"
          subtitle="Input stream: 7, 2, 9, 1, 5, 11, 4."
          steps={[
            {
              title: "Seed first k values",
              explanation: "Heap stores first three values as starting candidates.",
              heap: [2, 7, 9],
              focusIndices: [0, 1, 2],
            },
            {
              title: "Read 1",
              explanation: "1 <= heap[0]=2, so ignore (not in top 3).",
              heap: [2, 7, 9],
              focusIndices: [0],
            },
            {
              title: "Read 5",
              explanation: "5 > heap[0]=2, replace root and re-heapify.",
              heap: [5, 7, 9],
              focusIndices: [0],
            },
            {
              title: "Read 11",
              explanation: "11 > heap[0]=5, replace root.",
              heap: [7, 11, 9],
              focusIndices: [0],
            },
            {
              title: "Read 4",
              explanation: "4 <= heap[0]=7, ignore.",
              heap: [7, 11, 9],
              focusIndices: [0],
            },
          ]}
        />
      }
      examples={[
        {
          id: "ex-top-k",
          title: "Example 1: Return top-k largest",
          explanation:
            "Maintaining a heap of size k avoids sorting full input.",
          code: topKCode,
          output: topKOutput,
        },
        {
          id: "ex-kth",
          title: "Example 2: kth largest value",
          explanation:
            "After stream processing, heap root is kth largest.",
          code: kthCode,
          output: kthOutput,
        },
      ]}
      complexityRows={[
        { operation: "Top-k with heap (n values)", averageTime: String.raw`O(n \log k)`, extraSpace: String.raw`O(k)` },
        { operation: "Sort all values then slice", averageTime: String.raw`O(n \log n)`, extraSpace: String.raw`O(n)` },
      ]}
      pitfalls={[
        "Using a max-heap instead of size-k min-heap for largest-k problems.",
        "Letting heap grow past k, which defeats memory/performance benefits.",
        "Forgetting final heap is not sorted unless explicitly sorted before output.",
      ]}
      summary={[
        "Top K is a fixed-size-heap maintenance problem.",
        "Comparing against heap root is the core optimization.",
        "Heap-based Top K scales better than full sort when k << n.",
      ]}
      nextStep="Next we move to graph basics, where adjacency representation and traversal policies become central."
      railTitle="Within Heaps (Beginner)"
      railLinks={heapsBeginnerLessons}
      activeHref="/algorithms-data-structures/python/heaps/beginner/top-k"
    />
  );
}

