import BeginnerTrackPage from "@/components/ads/BeginnerTrackPage";
import { graphsBeginnerLessons } from "@/lib/adsBeginnerTopics";

export default function GraphsBeginnerPage() {
  return (
    <BeginnerTrackPage
      eyebrow="CS - Python - Graphs"
      title="Graphs beginner ladder"
      description="Learn how to represent graphs, traverse them, and compute shortest paths in unweighted networks."
      intuition="Graphs represent relationships where a node can connect to many peers. Traversal strategy (BFS vs DFS) decides what you discover first."
      realWorldExamples={[
        {
          scenario: "Transit map",
          mapping: "Stations are nodes and routes are edges between stations.",
        },
        {
          scenario: "Social network",
          mapping: "Accounts are nodes and follow/friend relations are edges.",
        },
      ]}
      lessons={graphsBeginnerLessons}
      activeHref="/algorithms-data-structures/python/graphs/beginner"
      structureLabel="Graphs"
    />
  );
}

