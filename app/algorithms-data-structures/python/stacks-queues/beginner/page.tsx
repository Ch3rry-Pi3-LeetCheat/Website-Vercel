import BeginnerTrackPage from "@/components/ads/BeginnerTrackPage";
import { stacksQueuesBeginnerLessons } from "@/lib/adsBeginnerTopics";

export default function StacksQueuesBeginnerPage() {
  return (
    <BeginnerTrackPage
      eyebrow="CS - Python - Stacks and Queues"
      title="Stacks and queues beginner ladder"
      description="Two simple structures that show up everywhere: LIFO stacks and FIFO queues."
      intuition="Order discipline is the whole point: stack for most-recent-first work, queue for arrival-order processing."
      realWorldExamples={[
        {
          scenario: "Undo actions in an editor",
          mapping: "Last action is popped first, exactly stack behavior.",
        },
        {
          scenario: "Job dispatcher",
          mapping: "Tasks are processed in arrival order, which is queue behavior.",
        },
      ]}
      lessons={stacksQueuesBeginnerLessons}
      activeHref="/algorithms-data-structures/python/stacks-queues/beginner"
      structureLabel="Stacks and Queues"
    />
  );
}

