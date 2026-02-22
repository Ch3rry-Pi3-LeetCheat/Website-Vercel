import BeginnerLessonTemplate from "@/components/ads/BeginnerLessonTemplate";
import LinearStateStepper from "@/components/ads/LinearStateStepper";
import { stacksQueuesBeginnerLessons } from "@/lib/adsBeginnerTopics";

const pushPopCode = `stack = []

stack.append("A")
stack.append("B")
stack.append("C")

print(stack.pop())
print(stack.pop())`;

const pushPopOutput = `C
B`;

const peekCode = `stack = [10, 20, 30]

print(stack[-1])
print(len(stack))`;

const peekOutput = `30
3`;

export default function StackBasicsPage() {
  return (
    <BeginnerLessonTemplate
      eyebrow="CS - Python - Stacks and Queues"
      title="Stack Basics"
      description="Learn LIFO behavior with push, pop, and peek, and why stacks power undo/backtracking flows."
      intro={[
        "A stack is Last-In, First-Out (LIFO): the most recent item is removed first.",
        "In Python, list append/pop at the end gives a clean stack implementation.",
      ]}
      intuition={[
        "Think of stacking trays: you only add/remove from the top.",
        "That top-only rule is exactly why stacks are natural for undo history and recursive backtracking.",
      ]}
      realWorld={[
        {
          scenario: "Undo feature",
          mapping:
            "Newest edit gets undone first, so edits naturally sit in a stack.",
        },
        {
          scenario: "Browser back stack",
          mapping:
            "Recent pages are popped first when users go back.",
        },
      ]}
      keyIdeaTitle="Top-of-stack discipline"
      keyIdeaText={[
        "push adds one item to top (append).",
        "pop removes and returns top.",
        "peek reads top without removing (stack[-1]).",
      ]}
      interactiveDescription="Watch LIFO order emerge from a push/pop sequence."
      interactive={
        <LinearStateStepper
          title="LIFO walkthrough"
          subtitle="Top is always on the right."
          steps={[
            {
              title: "Empty stack",
              explanation: "No items yet.",
              values: [".", ".", ".", "."],
            },
            {
              title: "Push A, B, C",
              explanation: "C becomes top because it was pushed last.",
              values: ["A", "B", "C", "top"],
              highlightIndices: [2],
              pointers: [{ index: 2, label: "top" }],
            },
            {
              title: "Pop once",
              explanation: "C leaves first.",
              values: ["A", "B", ".", "top"],
              highlightIndices: [1],
              pointers: [{ index: 1, label: "top" }],
            },
            {
              title: "Pop again",
              explanation: "Then B leaves next.",
              values: ["A", ".", ".", "top"],
              highlightIndices: [0],
              pointers: [{ index: 0, label: "top" }],
            },
          ]}
        />
      }
      examples={[
        {
          id: "ex-push-pop",
          title: "Example 1: Push and pop",
          explanation: "The popped order reveals LIFO behavior directly.",
          code: pushPopCode,
          output: pushPopOutput,
        },
        {
          id: "ex-peek",
          title: "Example 2: Peek and size",
          explanation:
            "Peek lets you inspect the next pop target without mutation.",
          code: peekCode,
          output: peekOutput,
        },
      ]}
      complexityRows={[
        { operation: "push (append)", averageTime: String.raw`O(1)`, extraSpace: String.raw`O(1)` },
        { operation: "pop", averageTime: String.raw`O(1)`, extraSpace: String.raw`O(1)` },
        { operation: "peek top", averageTime: String.raw`O(1)`, extraSpace: String.raw`O(1)` },
      ]}
      pitfalls={[
        "Using pop(0) for stacks, which is not top-based and is O(n).",
        "Popping from an empty stack without checks.",
        "Confusing stack order (LIFO) with queue order (FIFO).",
      ]}
      summary={[
        "Stacks are top-only structures with LIFO removal.",
        "append/pop on Python lists gives a clean stack implementation.",
        "Many interview patterns boil down to managing stack state correctly.",
      ]}
      nextStep="Next we contrast this with queues, where the oldest item is removed first."
      railTitle="Within Stacks and Queues (Beginner)"
      railLinks={stacksQueuesBeginnerLessons}
      activeHref="/algorithms-data-structures/python/stacks-queues/beginner/stack-basics"
    />
  );
}
