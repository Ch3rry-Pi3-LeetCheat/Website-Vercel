import BeginnerTrackPage from "@/components/ads/BeginnerTrackPage";
import { arraysBeginnerLessons } from "@/lib/adsBeginnerTopics";

export default function ArraysBeginnerPage() {
  return (
    <BeginnerTrackPage
      eyebrow="CS - Python - Arrays"
      title="Arrays beginner ladder"
      description="Start from zero: what a list is, how indexing works, and how to move pointers without extra memory."
      intuition="Arrays are ordered containers where index position is the superpower. You trade mid-list edits for very fast direct access."
      realWorldExamples={[
        {
          scenario: "Seat rows in a cinema",
          mapping: "Seat number acts like index. Direct access is instant once you know the position.",
        },
        {
          scenario: "Daily temperatures chart",
          mapping: "Day number maps to a value, and scanning left/right becomes pattern detection.",
        },
      ]}
      lessons={arraysBeginnerLessons}
      activeHref="/algorithms-data-structures/python/arrays/beginner"
      structureLabel="Arrays"
    />
  );
}

