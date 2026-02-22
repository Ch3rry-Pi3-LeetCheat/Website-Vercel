import BeginnerTrackPage from "@/components/ads/BeginnerTrackPage";
import { hashTablesBeginnerLessons } from "@/lib/adsBeginnerTopics";

export default function HashTablesBeginnerPage() {
  return (
    <BeginnerTrackPage
      eyebrow="CS - Python - Hash Tables"
      title="Hash tables beginner ladder"
      description="Learn dictionary basics, counting patterns, and the classic two-sum trick."
      intuition="Hash tables convert repeated search into direct key-based lookup. They are often the biggest practical speedup in interview problems."
      realWorldExamples={[
        {
          scenario: "Phone contacts",
          mapping: "Name to number lookup is direct key-value retrieval.",
        },
        {
          scenario: "Live event counting dashboard",
          mapping: "Each event key increments a frequency count in place.",
        },
      ]}
      lessons={hashTablesBeginnerLessons}
      activeHref="/algorithms-data-structures/python/hash-tables/beginner"
      structureLabel="Hash Tables"
    />
  );
}

