import BeginnerLessonTemplate from "@/components/ads/BeginnerLessonTemplate";
import LinearStateStepper from "@/components/ads/LinearStateStepper";
import { stacksQueuesBeginnerLessons } from "@/lib/adsBeginnerTopics";

const queueCode = `from collections import deque

q = deque()
q.append("A")
q.append("B")
q.append("C")

print(q.popleft())
print(q.popleft())`;

const queueOutput = `A
B`;

const sizeCode = `from collections import deque

q = deque([10, 20, 30])
print(q[0])      # front
print(len(q))`;

const sizeOutput = `10
3`;

export default function QueueBasicsPage() {
  return (
    <BeginnerLessonTemplate
      eyebrow="CS - Python - Stacks and Queues"
      title="Queue Basics"
      description="Build queue intuition: FIFO ordering, enqueue/dequeue, and why deque is preferred in Python."
      intro={[
        "A queue is First-In, First-Out (FIFO): the oldest item leaves first.",
        "In Python, collections.deque is the right default queue because left pops are efficient.",
      ]}
      intuition={[
        "Think of people lining up at a ticket desk. New arrivals join the back, and service always takes from the front.",
        "That fairness pattern appears in task schedulers, network buffers, and BFS traversal.",
      ]}
      realWorld={[
        {
          scenario: "Customer support tickets",
          mapping:
            "Oldest unresolved ticket is usually processed first.",
        },
        {
          scenario: "Print jobs",
          mapping:
            "Jobs arrive over time and are processed in arrival order.",
        },
      ]}
      keyIdeaTitle="Front/back operations"
      keyIdeaText={[
        "enqueue means add at back.",
        "dequeue means remove from front.",
        "Use deque.append and deque.popleft for efficient O(1) ends.",
      ]}
      interactiveDescription="Step through enqueue/dequeue with explicit front/back pointers."
      interactive={
        <LinearStateStepper
          title="FIFO walkthrough"
          subtitle="Front is left, back is right."
          steps={[
            {
              title: "Start empty",
              explanation: "Queue has no items.",
              values: [".", ".", ".", "."],
            },
            {
              title: "Enqueue A, B, C",
              explanation: "A is oldest at front, C newest at back.",
              values: ["A", "B", "C", "."],
              pointers: [
                { index: 0, label: "front" },
                { index: 2, label: "back" },
              ],
            },
            {
              title: "Dequeue once",
              explanation: "A leaves first.",
              values: ["B", "C", ".", "."],
              pointers: [
                { index: 0, label: "front" },
                { index: 1, label: "back" },
              ],
              highlightIndices: [0],
            },
            {
              title: "Dequeue again",
              explanation: "B leaves next.",
              values: ["C", ".", ".", "."],
              pointers: [
                { index: 0, label: "front/back" },
              ],
              highlightIndices: [0],
            },
          ]}
        />
      }
      examples={[
        {
          id: "ex-queue",
          title: "Example 1: Enqueue and dequeue",
          explanation:
            "deque preserves FIFO order with append + popleft.",
          code: queueCode,
          output: queueOutput,
        },
        {
          id: "ex-front-size",
          title: "Example 2: Front and size",
          explanation: "q[0] inspects front, len(q) gives current queue size.",
          code: sizeCode,
          output: sizeOutput,
        },
      ]}
      complexityRows={[
        { operation: "enqueue (deque.append)", averageTime: String.raw`O(1)`, extraSpace: String.raw`O(1)` },
        { operation: "dequeue (deque.popleft)", averageTime: String.raw`O(1)`, extraSpace: String.raw`O(1)` },
        { operation: "peek front", averageTime: String.raw`O(1)`, extraSpace: String.raw`O(1)` },
      ]}
      pitfalls={[
        "Using list.pop(0) for queues, which is O(n) due to shifting.",
        "Mixing stack and queue semantics in one implementation.",
        "Forgetting empty checks before dequeue.",
      ]}
      summary={[
        "Queues enforce FIFO ordering and are ideal for arrival-order processing.",
        "deque gives efficient queue operations in Python.",
        "Queue thinking is foundational for BFS and scheduling-style problems.",
      ]}
      nextStep="Next we combine stacks and queues in practical patterns like parenthesis validation and BFS-style task processing."
      railTitle="Within Stacks and Queues (Beginner)"
      railLinks={stacksQueuesBeginnerLessons}
      activeHref="/algorithms-data-structures/python/stacks-queues/beginner/queue-basics"
    />
  );
}
