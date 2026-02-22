import BeginnerLessonTemplate from "@/components/ads/BeginnerLessonTemplate";
import LinearStateStepper from "@/components/ads/LinearStateStepper";
import { arraysBeginnerLessons } from "@/lib/adsBeginnerTopics";

const indexingCode = `nums = [10, 20, 30, 40]

print(nums[0])
print(nums[2])
print(nums[-1])`;

const indexingOutput = `10
30
40`;

const updateCode = `nums = [10, 20, 30, 40]

nums[1] = 25
nums[3] = 99

print(nums)
print(len(nums))`;

const updateOutput = `[10, 25, 30, 99]
4`;

export default function ArrayBasicsPage() {
  return (
    <BeginnerLessonTemplate
      eyebrow="CS - Python - Arrays"
      title="Array Basics"
      description="Build intuition for array indexing: what O(1) access means and why arrays are a default starting point."
      intro={[
        "Arrays (Python lists) store values in a fixed order. That order matters because every value gets a position, and that position is what lets us access quickly.",
        "When people say array access is O(1), they mean you can jump directly to a position instead of scanning from the beginning.",
      ]}
      intuition={[
        "Think of a row of hotel rooms with room numbers. If you know room 302, you walk to 302 directly. You do not ask every room in sequence.",
        "That is the core array superpower: fast positional lookup. The trade-off is that inserting in the middle often means shifting many values.",
      ]}
      realWorld={[
        {
          scenario: "Leaderboard display",
          mapping:
            "Each rank maps to an index. Showing top 10 is just reading the first 10 positions.",
        },
        {
          scenario: "Sensor snapshots",
          mapping:
            "A fixed list can hold latest readings where index 0 means temperature, 1 means humidity, and so on.",
        },
      ]}
      keyIdeaTitle="Indexing mental model"
      keyIdeaText={[
        "Array indices are zero-based in Python. So index 0 is the first element, index 1 is the second, and so on.",
        "Negative indexing reads from the end. Index -1 means last element, -2 means second-to-last.",
        "Replacing a value at an index does not change length. You mutate one slot in-place.",
      ]}
      interactiveDescription="Step through direct access and in-place update behavior."
      interactive={
        <LinearStateStepper
          title="Indexing walkthrough"
          subtitle="Watch how we jump directly to the requested position."
          steps={[
            {
              title: "Start",
              explanation: "Initial array with four values.",
              values: [10, 20, 30, 40],
            },
            {
              title: "Read index 0",
              explanation: "Direct jump to index 0 returns 10.",
              values: [10, 20, 30, 40],
              highlightIndices: [0],
              pointers: [{ index: 0, label: "read" }],
            },
            {
              title: "Read index 2",
              explanation: "Direct jump to index 2 returns 30.",
              values: [10, 20, 30, 40],
              highlightIndices: [2],
              pointers: [{ index: 2, label: "read" }],
            },
            {
              title: "Update index 1",
              explanation: "Replacing index 1 changes only that slot.",
              values: [10, 25, 30, 40],
              highlightIndices: [1],
              pointers: [{ index: 1, label: "write" }],
            },
          ]}
        />
      }
      examples={[
        {
          id: "ex-indexing",
          title: "Example 1: Read by index",
          explanation:
            "This shows zero-based and negative indexing in one short script.",
          code: indexingCode,
          output: indexingOutput,
        },
        {
          id: "ex-update",
          title: "Example 2: Overwrite values",
          explanation:
            "You can replace values in place and keep length unchanged.",
          code: updateCode,
          output: updateOutput,
        },
      ]}
      complexityRows={[
        { operation: "Read nums[i]", averageTime: String.raw`O(1)`, extraSpace: String.raw`O(1)` },
        { operation: "Write nums[i] = x", averageTime: String.raw`O(1)`, extraSpace: String.raw`O(1)` },
        { operation: "Middle insertion", averageTime: String.raw`O(n)`, extraSpace: String.raw`O(1)` },
      ]}
      pitfalls={[
        "Mixing up zero-based indexing and one-based mental counting.",
        "Forgetting that negative indices read from the end.",
        "Assuming insertion in the middle is as cheap as direct index reads.",
      ]}
      summary={[
        "Arrays give direct positional access, which is why indexing is usually O(1).",
        "In-place updates are cheap because you modify one slot.",
        "Fast reads come with insertion/deletion trade-offs when order must be preserved.",
      ]}
      nextStep="Next, we will look at append, insert, pop, and remove to make those insertion/deletion trade-offs concrete."
      railTitle="Within Arrays (Beginner)"
      railLinks={arraysBeginnerLessons}
      activeHref="/algorithms-data-structures/python/arrays/beginner/array-basics"
    />
  );
}

