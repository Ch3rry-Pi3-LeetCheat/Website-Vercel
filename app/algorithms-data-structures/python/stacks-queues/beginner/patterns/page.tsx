import BeginnerLessonTemplate from "@/components/ads/BeginnerLessonTemplate";
import LinearStateStepper from "@/components/ads/LinearStateStepper";
import { stacksQueuesBeginnerLessons } from "@/lib/adsBeginnerTopics";

const parenCode = `def is_valid(s):
    stack = []
    pairs = {")": "(", "]": "[", "}": "{"}

    for ch in s:
        if ch in "([{":
            stack.append(ch)
        else:
            if not stack or stack[-1] != pairs[ch]:
                return False
            stack.pop()

    return len(stack) == 0

print(is_valid("([]{})"))`;

const parenOutput = `True`;

const tasksCode = `from collections import deque

tasks = deque(["task1", "task2", "task3"])
done = []

while tasks:
    current = tasks.popleft()
    done.append(current)

print(done)`;

const tasksOutput = `['task1', 'task2', 'task3']`;

export default function PatternsPage() {
  return (
    <BeginnerLessonTemplate
      eyebrow="CS - Python - Stacks and Queues"
      title="Everyday Patterns"
      description="Recognize the common trigger words for stack and queue patterns in interview questions."
      intro={[
        "After basics, the key skill is pattern recognition: know when the problem is asking for LIFO or FIFO behavior.",
        "This lesson covers two reliable beginner patterns: bracket validation (stack) and ordered processing (queue).",
      ]}
      intuition={[
        "Stack pattern clues: nested structure, undo, backtracking, matching open/close tokens.",
        "Queue pattern clues: first come first served, wave/layer processing, shortest path in unweighted graphs.",
      ]}
      realWorld={[
        {
          scenario: "Code editor bracket checks",
          mapping:
            "Opening brackets are pushed; each closing bracket must match top of stack.",
        },
        {
          scenario: "Job worker pipeline",
          mapping:
            "Tasks are consumed from the front in submission order.",
        },
      ]}
      keyIdeaTitle="Pattern triggers to memorize"
      keyIdeaText={[
        "If you need to match most recent unresolved item, think stack.",
        "If you need to preserve arrival order, think queue.",
        "When in doubt, ask: should newest or oldest leave first?",
      ]}
      interactiveDescription="Compare a stack-driven matcher and queue-driven task pipeline."
      interactive={
        <LinearStateStepper
          title="Bracket validation stack"
          subtitle='Expression: "([]{})".'
          steps={[
            {
              title: "Read (",
              explanation: "Opening bracket, push onto stack.",
              values: ["("],
              highlightIndices: [0],
            },
            {
              title: "Read [",
              explanation: "Push next opener.",
              values: ["(", "["],
              highlightIndices: [1],
            },
            {
              title: "Read ]",
              explanation: "Top is [, so pop it.",
              values: ["("],
              highlightIndices: [0],
            },
            {
              title: "Finish with empty stack",
              explanation: "All closers matched correctly.",
              values: ["(empty)"],
            },
          ]}
        />
      }
      examples={[
        {
          id: "ex-brackets",
          title: "Example 1: Valid parentheses",
          explanation:
            "Classic stack pattern. Top element must match each closing token.",
          code: parenCode,
          output: parenOutput,
        },
        {
          id: "ex-tasks",
          title: "Example 2: FIFO task runner",
          explanation:
            "Queue processing preserves order naturally.",
          code: tasksCode,
          output: tasksOutput,
        },
      ]}
      complexityRows={[
        { operation: "Bracket scan (n chars)", averageTime: String.raw`O(n)`, extraSpace: String.raw`O(n)` },
        { operation: "Queue processing (n tasks)", averageTime: String.raw`O(n)`, extraSpace: String.raw`O(n)` },
      ]}
      pitfalls={[
        "Trying to solve bracket matching without a stack for unresolved openers.",
        "Using a stack when order must be preserved (should be queue).",
        "Not checking empty stack before reading top during closer handling.",
      ]}
      summary={[
        "Pattern recognition is the bridge from syntax to problem-solving.",
        "Bracket matching is a canonical stack problem.",
        "Arrival-order processing is a canonical queue problem.",
      ]}
      nextStep="Next, we move to hash tables, where constant-time key lookups unlock counting and complement patterns."
      railTitle="Within Stacks and Queues (Beginner)"
      railLinks={stacksQueuesBeginnerLessons}
      activeHref="/algorithms-data-structures/python/stacks-queues/beginner/patterns"
    />
  );
}

