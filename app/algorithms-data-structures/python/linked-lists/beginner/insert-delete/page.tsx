import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
import { linkedListsBeginnerLessons } from "@/lib/adsBeginnerTopics";

const setupCode = `class Node:
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
    return head

def to_list(head):
    values = []
    current = head
    while current:
        values.append(current.value)
        current = current.next
    return values`;

const insertCode = `head = from_list([1, 2, 4])

current = head
while current and current.value != 2:
    current = current.next

node = Node(3)
node.next = current.next
current.next = node

print(to_list(head))`;

const insertOutput = `[1, 2, 3, 4]`;

const deleteCode = `head = from_list([1, 2, 3, 4])

dummy = Node(0, head)
prev = dummy
current = head

while current:
    if current.value == 2:
        prev.next = current.next
        break
    prev = current
    current = current.next

head = dummy.next
print(to_list(head))`;

const deleteOutput = `[1, 3, 4]`;

export default function InsertDeletePage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "introduction", label: "Introduction" },
    { id: "intuition", label: "Intuition" },
    { id: "setup", label: "Setup helpers" },
    { id: "insert", label: "Insert a node" },
    { id: "delete", label: "Delete a node" },
  ];

  return (
    <ArticleLayout
      eyebrow="Algorithms - Python - Linked Lists"
      title="Insert and Delete"
      description="Practice the two moves that matter: connect a new node and bypass an old one." 
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Within Linked Lists (Beginner)", links: linkedListsBeginnerLessons },
          ]}
          activeHref="/algorithms-data-structures/python/linked-lists/beginner/insert-delete"
        />
      }
    >
      <InfoPanel id="introduction" title="Introduction" variant="intro">
        <p>
          Insertion and deletion are where linked lists shine. You only
          rewire a couple of pointers, and the rest of the chain stays
          intact.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          Think of a chain of paper clips. To insert a new clip, you open
          one link, slide the new clip in, and close it again. To delete,
          you simply skip a clip.
        </p>
      </InfoPanel>

      <section id="setup" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Setup helpers
        </h2>
        <CodeBlock code={setupCode} title="Python" />
      </section>

      <section id="insert" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Insert a node
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Find the node that should point to the new node, then update two
          pointers. The rest of the list is untouched.
        </p>
        <CodeBlock code={insertCode} title="Python" />
        <OutputBlock output={insertOutput} />
      </section>

      <section id="delete" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Delete a node
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          A dummy node makes head removal easy. Move two pointers until
          you reach the target, then bypass it.
        </p>
        <CodeBlock code={deleteCode} title="Python" />
        <OutputBlock output={deleteOutput} />
      </section>
    </ArticleLayout>
  );
}
