import BeginnerLessonTemplate from "@/components/ads/BeginnerLessonTemplate";
import LinearStateStepper from "@/components/ads/LinearStateStepper";
import { arraysBeginnerLessons } from "@/lib/adsBeginnerTopics";

const appendPopCode = `nums = [1, 2, 3]

nums.append(4)
print(nums)

last = nums.pop()
print(last)
print(nums)`;

const appendPopOutput = `[1, 2, 3, 4]
4
[1, 2, 3]`;

const insertRemoveCode = `nums = [10, 20, 30, 40]

nums.insert(1, 15)
print(nums)

nums.remove(30)
print(nums)`;

const insertRemoveOutput = `[10, 15, 20, 30, 40]
[10, 15, 20, 40]`;

export default function ArrayOperationsPage() {
  return (
    <BeginnerLessonTemplate
      eyebrow="CS - Python - Arrays"
      title="Common Operations"
      description="Understand how append, pop, insert, and remove change both values and cost."
      intro={[
        "Array operations look similar on the surface, but they do not cost the same.",
        "append and pop at the end are usually cheap, while insert/remove in the middle usually require shifting values.",
      ]}
      intuition={[
        "Imagine a line of people in seats. Adding someone at the end is easy. Inserting someone in seat 2 means many people must stand up and shift.",
        "That shift cost is the reason some operations feel instant and others feel slower as n grows.",
      ]}
      realWorld={[
        {
          scenario: "Task backlog",
          mapping:
            "New tasks are appended at the end all day long, so append performance matters.",
        },
        {
          scenario: "Reordering a playlist",
          mapping:
            "Inserting tracks near the front can shift many existing tracks.",
        },
      ]}
      keyIdeaTitle="Operation cost intuition"
      keyIdeaText={[
        "append(x) usually adds to the end in O(1) amortized time.",
        "pop() at the end is O(1), because no shifting is needed.",
        "insert(i, x) and remove(x) can be O(n), since values after that point may shift left or right.",
      ]}
      interactiveDescription="Use the stepper to compare end-operations vs middle-operations."
      interactive={
        <LinearStateStepper
          title="Operation sequence visual"
          subtitle="Middle changes trigger shifts; end changes usually do not."
          steps={[
            {
              title: "Initial array",
              explanation: "Start with four values.",
              values: [10, 20, 30, 40],
            },
            {
              title: "append(50)",
              explanation: "Add to the end; no existing values move.",
              values: [10, 20, 30, 40, 50],
              highlightIndices: [4],
            },
            {
              title: "insert(1, 15)",
              explanation: "Insert at index 1; values from index 1 onward shift right.",
              values: [10, 15, 20, 30, 40, 50],
              highlightIndices: [1, 2, 3, 4, 5],
            },
            {
              title: "remove(30)",
              explanation: "Removing middle value shifts trailing values left.",
              values: [10, 15, 20, 40, 50],
              highlightIndices: [3, 4],
            },
          ]}
        />
      }
      examples={[
        {
          id: "ex-append-pop",
          title: "Example 1: append and pop",
          explanation:
            "This pair is ideal when you work at the right end of the list.",
          code: appendPopCode,
          output: appendPopOutput,
        },
        {
          id: "ex-insert-remove",
          title: "Example 2: insert and remove",
          explanation:
            "These are readable operations, but can be linear-time due to shifts.",
          code: insertRemoveCode,
          output: insertRemoveOutput,
        },
      ]}
      complexityRows={[
        { operation: "append(x)", averageTime: String.raw`O(1)`, extraSpace: String.raw`O(1)` },
        { operation: "pop()", averageTime: String.raw`O(1)`, extraSpace: String.raw`O(1)` },
        { operation: "insert(i, x)", averageTime: String.raw`O(n)`, extraSpace: String.raw`O(1)` },
        { operation: "remove(x)", averageTime: String.raw`O(n)`, extraSpace: String.raw`O(1)` },
      ]}
      pitfalls={[
        "Using insert in loops without noticing the repeated O(n) shifts.",
        "Assuming remove(x) deletes by index; it deletes first matching value.",
        "Forgetting pop() without an index removes only the last element.",
      ]}
      summary={[
        "Array operations differ in cost even when syntax is simple.",
        "End operations are usually cheap; middle operations often shift many values.",
        "Choosing the right operation keeps code both clear and scalable.",
      ]}
      nextStep="Next we will introduce two pointers, a pattern that turns many nested-loop array tasks into linear scans."
      railTitle="Within Arrays (Beginner)"
      railLinks={arraysBeginnerLessons}
      activeHref="/algorithms-data-structures/python/arrays/beginner/array-operations"
    />
  );
}

