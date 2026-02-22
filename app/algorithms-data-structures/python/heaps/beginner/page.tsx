import BeginnerTrackPage from "@/components/ads/BeginnerTrackPage";
import { heapsBeginnerLessons } from "@/lib/adsBeginnerTopics";

export default function HeapsBeginnerPage() {
  return (
    <BeginnerTrackPage
      eyebrow="CS - Python - Heaps"
      title="Heaps beginner ladder"
      description="Heaps power priority queues and top-k queries with fast access to the smallest element."
      intuition="A heap keeps the highest-priority item at the top without fully sorting everything else."
      realWorldExamples={[
        {
          scenario: "Task scheduler",
          mapping: "Always pick the earliest deadline or highest priority next.",
        },
        {
          scenario: "Top-k leaderboard",
          mapping: "Keep only the best k items while streaming new scores.",
        },
      ]}
      lessons={heapsBeginnerLessons}
      activeHref="/algorithms-data-structures/python/heaps/beginner"
      structureLabel="Heaps"
    />
  );
}

