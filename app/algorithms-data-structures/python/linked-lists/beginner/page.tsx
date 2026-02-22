import BeginnerTrackPage from "@/components/ads/BeginnerTrackPage";
import { linkedListsBeginnerLessons } from "@/lib/adsBeginnerTopics";

export default function LinkedListsBeginnerPage() {
  return (
    <BeginnerTrackPage
      eyebrow="CS - Python - Linked Lists"
      title="Linked lists beginner ladder"
      description="Learn nodes, pointers, and the core rewiring moves that make linked list interviews feel intuitive."
      intuition="Linked lists are pointer chains. You cannot jump by index, so correctness comes from safe traversal and careful rewiring."
      realWorldExamples={[
        {
          scenario: "Train car coupling",
          mapping: "Each car points to the next car. Reordering means reconnecting couplers correctly.",
        },
        {
          scenario: "Simple browser back stack representation",
          mapping: "Navigation history can be modeled as references between entries.",
        },
      ]}
      lessons={linkedListsBeginnerLessons}
      activeHref="/algorithms-data-structures/python/linked-lists/beginner"
      structureLabel="Linked Lists"
    />
  );
}

