import BeginnerTrackPage from "@/components/ads/BeginnerTrackPage";
import { treesBeginnerLessons } from "@/lib/adsBeginnerTopics";

export default function TreesBeginnerPage() {
  return (
    <BeginnerTrackPage
      eyebrow="CS - Python - Trees"
      title="Trees beginner ladder"
      description="Learn how to build a tree, traverse it, and understand the binary search tree property."
      intuition="Trees model hierarchical structure. Recursion feels natural because every subtree is a smaller version of the full problem."
      realWorldExamples={[
        {
          scenario: "Company org chart",
          mapping: "Manager to team relationships are naturally tree shaped.",
        },
        {
          scenario: "Folder hierarchy",
          mapping: "Directories contain child directories/files recursively.",
        },
      ]}
      lessons={treesBeginnerLessons}
      activeHref="/algorithms-data-structures/python/trees/beginner"
      structureLabel="Trees"
    />
  );
}

