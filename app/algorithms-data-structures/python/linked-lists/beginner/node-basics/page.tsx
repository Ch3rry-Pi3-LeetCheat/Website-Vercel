import BeginnerLessonTemplate from "@/components/ads/BeginnerLessonTemplate";
import LinearStateStepper from "@/components/ads/LinearStateStepper";
import { linkedListsBeginnerLessons } from "@/lib/adsBeginnerTopics";

const nodeClassCode = `class Node:
    def __init__(self, value, next=None):
        self.value = value
        self.next = next`;

const buildCode = `a = Node(1)
b = Node(2)
c = Node(3)

a.next = b
b.next = c
head = a

current = head
values = []

while current:
    values.append(current.value)
    current = current.next

print(values)`;

const buildOutput = `[1, 2, 3]`;

export default function NodeBasicsPage() {
  return (
    <BeginnerLessonTemplate
      eyebrow="CS - Python - Linked Lists"
      title="Nodes and Pointers"
      description="Understand linked-list anatomy: each node stores a value and a reference to the next node."
      intro={[
        "A linked list is not stored as one contiguous block like an array. It is a chain of node objects connected by next pointers.",
        "Because of that structure, you cannot jump to index i directly. You traverse step by step from the head.",
      ]}
      intuition={[
        "Think of train carriages. Each carriage knows the next carriage, but no carriage knows the full train at once.",
        "If you want carriage 4, you must pass through 1, 2, and 3.",
      ]}
      realWorld={[
        {
          scenario: "Music playback queue internals",
          mapping:
            "Each track can point to the next track to play, forming a chain.",
        },
        {
          scenario: "Undo history variants",
          mapping:
            "Nodes can represent states, with pointers to previous or next states.",
        },
      ]}
      keyIdeaTitle="Node anatomy and traversal"
      keyIdeaText={[
        "Each node stores value plus next. The final node points to None.",
        "head is your only guaranteed entry point to the chain.",
        "Traversal always means current = current.next until current becomes None.",
      ]}
      interactiveDescription="Walk a pointer through a small linked list."
      interactive={
        <LinearStateStepper
          title="Pointer walk"
          subtitle="Current pointer moves one node at a time."
          showArrowsBetweenCells
          indexLabels={["head", "", "", "tail"]}
          steps={[
            {
              title: "Chain created",
              explanation: "Nodes are linked in order.",
              values: ["1", "2", "3", "None"],
              highlightIndices: [0],
              pointers: [{ index: 0, label: "current" }],
            },
            {
              title: "Move once",
              explanation: "current = current.next now points to node 2.",
              values: ["1", "2", "3", "None"],
              highlightIndices: [1],
              pointers: [{ index: 1, label: "current" }],
            },
            {
              title: "Move again",
              explanation: "Now at node 3.",
              values: ["1", "2", "3", "None"],
              highlightIndices: [2],
              pointers: [{ index: 2, label: "current" }],
            },
            {
              title: "Stop condition",
              explanation: "After next from node 3, current becomes None and loop ends.",
              values: ["1", "2", "3", "None"],
              highlightIndices: [3],
              pointers: [{ index: 3, label: "current" }],
            },
          ]}
        />
      }
      examples={[
        {
          id: "ex-node-class",
          title: "Example 1: Minimal node class",
          explanation:
            "Keep the class tiny so pointer behavior is easy to reason about.",
          code: nodeClassCode,
        },
        {
          id: "ex-traverse",
          title: "Example 2: Build and traverse",
          explanation:
            "Create three nodes, link them, then collect values by traversal.",
          code: buildCode,
          output: buildOutput,
        },
      ]}
      complexityRows={[
        { operation: "Traverse to kth node", averageTime: String.raw`O(k)`, extraSpace: String.raw`O(1)` },
        { operation: "Read head value", averageTime: String.raw`O(1)`, extraSpace: String.raw`O(1)` },
        { operation: "Insert at head", averageTime: String.raw`O(1)`, extraSpace: String.raw`O(1)` },
      ]}
      pitfalls={[
        "Losing the head reference and then having no path back into the list.",
        "Forgetting to advance current in loops, causing infinite traversal.",
        "Assuming linked lists support O(1) random indexing like arrays.",
      ]}
      summary={[
        "Linked lists are pointer chains, not contiguous arrays.",
        "Traversal is sequential: one hop at a time via next.",
        "Pointer discipline (head/current/next) is the key to correctness.",
      ]}
      nextStep="Next we will bridge Python lists and linked lists by writing helper constructors and converters."
      railTitle="Within Linked Lists (Beginner)"
      railLinks={linkedListsBeginnerLessons}
      activeHref="/algorithms-data-structures/python/linked-lists/beginner/node-basics"
    />
  );
}

