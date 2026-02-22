import BeginnerLessonTemplate from "@/components/ads/BeginnerLessonTemplate";
import LinearStateStepper from "@/components/ads/LinearStateStepper";
import { linkedListsBeginnerLessons } from "@/lib/adsBeginnerTopics";

const helperCode = `class Node:
    def __init__(self, value, next=None):
        self.value = value
        self.next = next

def from_list(values):
    head = None
    tail = None
    for value in values:
        node = Node(value)
        if head is None:
            head = node
            tail = node
        else:
            tail.next = node
            tail = node
    return head`;

const convertBackCode = `def to_list(head):
    out = []
    current = head
    while current:
        out.append(current.value)
        current = current.next
    return out

head = from_list([4, 7, 9])
print(to_list(head))`;

const convertBackOutput = `[4, 7, 9]`;

export default function BuildFromListPage() {
  return (
    <BeginnerLessonTemplate
      eyebrow="CS - Python - Linked Lists"
      title="Build From Lists"
      description="Convert between Python lists and linked lists so you can test linked-list logic quickly."
      intro={[
        "Interview problems often provide linked-list nodes, but your instincts are usually in Python lists.",
        "Helpers like from_list and to_list let you move between both representations and debug faster.",
      ]}
      intuition={[
        "Think of from_list as building a chain one node at a time while tail remembers where to attach next.",
        "Think of to_list as walking the chain and writing values into a normal Python list for inspection.",
      ]}
      realWorld={[
        {
          scenario: "Testing pointer algorithms",
          mapping:
            "Write tests using simple Python lists, then convert to linked lists before running your algorithm.",
        },
        {
          scenario: "Debugging outputs",
          mapping:
            "Convert linked-list results back to lists for readable print/debug assertions.",
        },
      ]}
      keyIdeaTitle="Builder pattern with head/tail"
      keyIdeaText={[
        "head marks the start and never moves after first assignment.",
        "tail tracks the final node so each append is O(1).",
        "Without tail, appending each node would require re-traversal and become O(n^2) overall.",
      ]}
      interactiveDescription="Track how head and tail evolve while building from [4, 7, 9]."
      interactive={
        <LinearStateStepper
          title="Build process"
          subtitle="Each step appends one new node at tail."
          showArrowsBetweenCells
          steps={[
            {
              title: "Empty list",
              explanation: "No nodes yet, head and tail are None.",
              values: ["None"],
              pointers: [{ index: 0, label: "head/tail" }],
            },
            {
              title: "Append 4",
              explanation: "First node becomes both head and tail.",
              values: ["4", "None"],
              highlightIndices: [0],
              pointers: [{ index: 0, label: "head/tail" }],
            },
            {
              title: "Append 7",
              explanation: "tail.next -> new node, then tail moves.",
              values: ["4", "7", "None"],
              highlightIndices: [1],
              pointers: [
                { index: 0, label: "head" },
                { index: 1, label: "tail" },
              ],
            },
            {
              title: "Append 9",
              explanation: "Repeat pattern; chain is complete.",
              values: ["4", "7", "9", "None"],
              highlightIndices: [2],
              pointers: [
                { index: 0, label: "head" },
                { index: 2, label: "tail" },
              ],
            },
          ]}
        />
      }
      examples={[
        {
          id: "ex-from-list",
          title: "Example 1: from_list helper",
          explanation:
            "This helper builds a linked list in one pass using head/tail pointers.",
          code: helperCode,
        },
        {
          id: "ex-to-list",
          title: "Example 2: to_list helper",
          explanation:
            "Use to_list when you want readable assertions in tests.",
          code: convertBackCode,
          output: convertBackOutput,
        },
      ]}
      complexityRows={[
        { operation: "from_list(n items)", averageTime: String.raw`O(n)`, extraSpace: String.raw`O(n)` },
        { operation: "to_list(n nodes)", averageTime: String.raw`O(n)`, extraSpace: String.raw`O(n)` },
        { operation: "Append with tail pointer", averageTime: String.raw`O(1)`, extraSpace: String.raw`O(1)` },
      ]}
      pitfalls={[
        "Forgetting to move tail after linking a new node.",
        "Not handling the empty input list edge case.",
        "Re-traversing to the end on every append, which ruins performance.",
      ]}
      summary={[
        "Conversion helpers remove friction when learning linked-list problems.",
        "head + tail is the cleanest way to build in one pass.",
        "Readable tests become easy when you can round-trip list <-> linked list.",
      ]}
      nextStep="Next we will focus on insertion and deletion, where pointer rewiring errors are most common."
      railTitle="Within Linked Lists (Beginner)"
      railLinks={linkedListsBeginnerLessons}
      activeHref="/algorithms-data-structures/python/linked-lists/beginner/build-from-list"
    />
  );
}

