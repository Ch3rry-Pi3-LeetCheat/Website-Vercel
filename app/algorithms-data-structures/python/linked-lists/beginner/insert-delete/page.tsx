import BeginnerLessonTemplate from "@/components/ads/BeginnerLessonTemplate";
import LinearStateStepper from "@/components/ads/LinearStateStepper";
import { linkedListsBeginnerLessons } from "@/lib/adsBeginnerTopics";

const insertCode = `class Node:
    def __init__(self, value, next=None):
        self.value = value
        self.next = next

head = Node(1, Node(3, Node(4)))

new_node = Node(2)
new_node.next = head.next
head.next = new_node`;

const deleteCode = `# delete value 3 from 1 -> 2 -> 3 -> 4
head = Node(1, Node(2, Node(3, Node(4))))

prev = None
current = head

while current and current.value != 3:
    prev = current
    current = current.next

if current:
    prev.next = current.next`;

const outputCode = `def to_list(head):
    out = []
    current = head
    while current:
        out.append(current.value)
        current = current.next
    return out

print(to_list(head))`;

const outputText = `[1, 2, 4]`;

export default function InsertDeletePage() {
  return (
    <BeginnerLessonTemplate
      eyebrow="CS - Python - Linked Lists"
      title="Insert and Delete"
      description="Master pointer rewiring for insertion and deletion without breaking the chain."
      intro={[
        "Linked-list edits are all about pointer rewiring order. A correct line sequence keeps the chain intact; a wrong sequence can lose nodes.",
        "This lesson focuses on safe insert and delete patterns you can reuse in interviews.",
      ]}
      intuition={[
        "Imagine replacing one rail segment in a train track. You reconnect links carefully before removing old pieces.",
        "The same applies to pointers: connect first, then move references, then detach if needed.",
      ]}
      realWorld={[
        {
          scenario: "Playlist reordering",
          mapping:
            "Insert a track into the middle without rebuilding the whole list.",
        },
        {
          scenario: "Queue maintenance",
          mapping:
            "Delete a cancelled task node while preserving all remaining links.",
        },
      ]}
      keyIdeaTitle="Safe rewiring order"
      keyIdeaText={[
        "Insert after prev: new.next = prev.next, then prev.next = new.",
        "Delete current with prev available: prev.next = current.next.",
        "Always treat head deletion as a special case because there may be no prev.",
      ]}
      interactiveDescription="Follow pointer updates for insert and delete in order."
      interactive={
        <LinearStateStepper
          title="Pointer rewiring steps"
          subtitle="Chain starts as 1 -> 3 -> 4. We insert 2, then remove 3."
          showArrowsBetweenCells
          steps={[
            {
              title: "Initial chain",
              explanation: "Need to insert 2 between 1 and 3.",
              values: ["1", "3", "4", "None"],
              pointers: [{ index: 0, label: "prev" }],
            },
            {
              title: "Set new.next",
              explanation: "new.next points to old next (3).",
              values: ["1", "2", "3", "4", "None"],
              highlightIndices: [1, 2],
              pointers: [{ index: 1, label: "new" }],
            },
            {
              title: "Set prev.next",
              explanation: "Now 1 points to 2, insertion complete.",
              values: ["1", "2", "3", "4", "None"],
              highlightIndices: [0, 1],
            },
            {
              title: "Delete 3",
              explanation: "Bypass 3: set node 2 next to node 4.",
              values: ["1", "2", "4", "None"],
              highlightIndices: [1, 2],
              pointers: [{ index: 1, label: "prev" }],
            },
          ]}
        />
      }
      examples={[
        {
          id: "ex-insert",
          title: "Example 1: Insert after head",
          explanation:
            "A two-line pointer update inserts 2 between 1 and 3.",
          code: insertCode,
        },
        {
          id: "ex-delete",
          title: "Example 2: Delete node by value",
          explanation:
            "Walk with prev/current until match, then bypass the matched node.",
          code: `${deleteCode}\n\n${outputCode}`,
          output: outputText,
        },
      ]}
      complexityRows={[
        { operation: "Insert after known node", averageTime: String.raw`O(1)`, extraSpace: String.raw`O(1)` },
        { operation: "Delete known node (with prev)", averageTime: String.raw`O(1)`, extraSpace: String.raw`O(1)` },
        { operation: "Search + delete by value", averageTime: String.raw`O(n)`, extraSpace: String.raw`O(1)` },
      ]}
      pitfalls={[
        "Overwriting prev.next too early and losing access to the rest of the chain.",
        "Ignoring head deletion edge case.",
        "Not updating tail when deleting the final node in tracked-tail implementations.",
      ]}
      summary={[
        "Insertion and deletion are pointer rewiring tasks.",
        "Operation order matters more than syntax length.",
        "Once node positions are known, edits are O(1); searching is what costs O(n).",
      ]}
      nextStep="With linked lists covered, we will compare stack and queue access patterns, where insertion/removal locations define behavior."
      railTitle="Within Linked Lists (Beginner)"
      railLinks={linkedListsBeginnerLessons}
      activeHref="/algorithms-data-structures/python/linked-lists/beginner/insert-delete"
    />
  );
}

