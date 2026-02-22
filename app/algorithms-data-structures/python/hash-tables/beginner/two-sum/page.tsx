import BeginnerLessonTemplate from "@/components/ads/BeginnerLessonTemplate";
import MapStateStepper from "@/components/ads/MapStateStepper";
import { hashTablesBeginnerLessons } from "@/lib/adsBeginnerTopics";

const twoSumCode = `nums = [2, 7, 11, 15]
target = 9
seen = {}

for i, value in enumerate(nums):
    need = target - value
    if need in seen:
        print(seen[need], i)
        break
    seen[value] = i`;

const twoSumOutput = `0 1`;

const duplicateCode = `nums = [3, 3]
target = 6
seen = {}

for i, value in enumerate(nums):
    need = target - value
    if need in seen:
        print(seen[need], i)
        break
    seen[value] = i`;

const duplicateOutput = `0 1`;

export default function TwoSumPage() {
  return (
    <BeginnerLessonTemplate
      eyebrow="CS - Python - Hash Tables"
      title="Two Sum Pattern"
      description="Use complements plus a hash map to find pairs in one pass."
      intro={[
        "Two Sum is a foundational interview pattern because it combines arithmetic thinking with hash-map lookup.",
        "Instead of checking all pairs, you store what you have seen and ask if the needed complement already exists.",
      ]}
      intuition={[
        "For each value x, ask: what value y would complete target? That y is target - x.",
        "If y was seen before, pair found. If not, store x and continue.",
      ]}
      realWorld={[
        {
          scenario: "Budget matching",
          mapping:
            "Find two purchase amounts that sum to an exact reimbursement limit.",
        },
        {
          scenario: "Signal pair detection",
          mapping:
            "Find two measurements whose combined value hits a threshold.",
        },
      ]}
      keyIdeaTitle="Complement lookup logic"
      keyIdeaText={[
        "Maintain seen[value] = index.",
        "At index i with value x, compute need = target - x.",
        "If need in seen, return (seen[need], i).",
      ]}
      interactiveDescription="Trace one-pass complement matching on [2, 7, 11, 15], target 9."
      interactive={
        <MapStateStepper
          title="Complement matching"
          subtitle="Map stores seen value -> index."
          steps={[
            {
              title: "i=0, value=2",
              explanation: "Need 7. Not seen yet, store 2->0.",
              currentInput: "need = 7",
              mapEntries: [{ key: "2", value: 0, highlighted: true }],
            },
            {
              title: "i=1, value=7",
              explanation: "Need 2. Found in map at index 0, pair complete.",
              currentInput: "need = 2",
              mapEntries: [{ key: "2", value: 0, highlighted: true }],
            },
            {
              title: "Stop early",
              explanation: "Return indices (0, 1).",
              currentInput: "return (0, 1)",
              mapEntries: [{ key: "2", value: 0 }],
            },
          ]}
        />
      }
      examples={[
        {
          id: "ex-two-sum-main",
          title: "Example 1: Standard one-pass solution",
          explanation:
            "The map lets each index answer complement queries in constant average time.",
          code: twoSumCode,
          output: twoSumOutput,
        },
        {
          id: "ex-two-sum-dup",
          title: "Example 2: Duplicate values case",
          explanation:
            "Store after checking complement so duplicates can still pair correctly.",
          code: duplicateCode,
          output: duplicateOutput,
        },
      ]}
      complexityRows={[
        { operation: "One-pass hash-map Two Sum", averageTime: String.raw`O(n)`, extraSpace: String.raw`O(n)` },
        { operation: "Brute-force nested loops", averageTime: String.raw`O(n^2)`, extraSpace: String.raw`O(1)` },
      ]}
      pitfalls={[
        "Storing current value before complement check can break duplicate handling.",
        "Returning values instead of indices when the problem asks for indices.",
        "Using nested loops and missing the map-based linear approach.",
      ]}
      summary={[
        "Two Sum demonstrates complement lookup as a reusable pattern.",
        "Hash maps convert repeated search into constant-time average lookups.",
        "Correct operation order (check then store) matters for edge cases.",
      ]}
      nextStep="Next we shift to trees, where recursion and traversal order become the core mental models."
      railTitle="Within Hash Tables (Beginner)"
      railLinks={hashTablesBeginnerLessons}
      activeHref="/algorithms-data-structures/python/hash-tables/beginner/two-sum"
    />
  );
}

