import BeginnerLessonTemplate from "@/components/ads/BeginnerLessonTemplate";
import MapStateStepper from "@/components/ads/MapStateStepper";
import { hashTablesBeginnerLessons } from "@/lib/adsBeginnerTopics";

const lookupCode = `scores = {"amy": 3, "ben": 5}

print(scores["amy"])
scores["amy"] = 4
print(scores["amy"])`;

const lookupOutput = `3
4`;

const safeCode = `scores = {"amy": 3}

print(scores.get("amy", 0))
print(scores.get("zoe", 0))`;

const safeOutput = `3
0`;

export default function DictBasicsPage() {
  return (
    <BeginnerLessonTemplate
      eyebrow="CS - Python - Hash Tables"
      title="Dictionary Basics"
      description="Learn hash-map intuition through Python dict: key lookup, update, and safe access patterns."
      intro={[
        "Dictionaries map keys to values. Instead of searching by position, you look up by meaning (for example, user_id).",
        "Hash tables are popular because average lookup/update/insert is O(1) for many workloads.",
      ]}
      intuition={[
        "Think of a labeled locker room: key name points to one locker.",
        "You do not scan every locker to find 'amy'; you jump by label.",
      ]}
      realWorld={[
        {
          scenario: "User profile cache",
          mapping:
            "user_id -> profile object lets backend code fetch user data quickly.",
        },
        {
          scenario: "Feature flags",
          mapping:
            "flag name -> enabled state provides instant checks in request paths.",
        },
      ]}
      keyIdeaTitle="Key-based access"
      keyIdeaText={[
        "Use dict[key] when key is guaranteed to exist.",
        "Use dict.get(key, default) when keys may be missing.",
        "Updates overwrite existing values for that key.",
      ]}
      interactiveDescription="Watch a dictionary evolve with inserts and updates."
      interactive={
        <MapStateStepper
          title="Dictionary state transitions"
          subtitle="Keys map to values directly."
          steps={[
            {
              title: "Insert amy -> 3",
              explanation: "New key adds new entry.",
              currentInput: 'scores["amy"] = 3',
              mapEntries: [{ key: "amy", value: 3, highlighted: true }],
            },
            {
              title: "Insert ben -> 5",
              explanation: "Second key added independently.",
              currentInput: 'scores["ben"] = 5',
              mapEntries: [
                { key: "amy", value: 3 },
                { key: "ben", value: 5, highlighted: true },
              ],
            },
            {
              title: "Update amy -> 4",
              explanation: "Existing key gets overwritten.",
              currentInput: 'scores["amy"] = 4',
              mapEntries: [
                { key: "amy", value: 4, highlighted: true },
                { key: "ben", value: 5 },
              ],
            },
          ]}
        />
      }
      examples={[
        {
          id: "ex-lookup",
          title: "Example 1: Direct lookup and update",
          explanation:
            "Look up by key, then overwrite a value in constant average time.",
          code: lookupCode,
          output: lookupOutput,
        },
        {
          id: "ex-safe",
          title: "Example 2: Safe reads with get",
          explanation:
            "get avoids KeyError and gives explicit defaults.",
          code: safeCode,
          output: safeOutput,
        },
      ]}
      complexityRows={[
        { operation: "Lookup by key", averageTime: String.raw`O(1)`, extraSpace: String.raw`O(1)` },
        { operation: "Insert/update key", averageTime: String.raw`O(1)`, extraSpace: String.raw`O(1)` },
        { operation: "Worst-case lookup", averageTime: String.raw`O(n)`, extraSpace: String.raw`O(1)` },
      ]}
      pitfalls={[
        "Assuming key order semantics for algorithm correctness in interview contexts.",
        "Using direct index syntax when keys may be missing.",
        "Forgetting keys must be hashable types (e.g., list is invalid as key).",
      ]}
      summary={[
        "Dictionaries trade positional access for key-based direct access.",
        "Average-case O(1) operations make dicts foundational in interview patterns.",
        "Safe access patterns like get() prevent avoidable runtime errors.",
      ]}
      nextStep="Next we use dictionaries for frequency counting, one of the highest-leverage interview patterns."
      railTitle="Within Hash Tables (Beginner)"
      railLinks={hashTablesBeginnerLessons}
      activeHref="/algorithms-data-structures/python/hash-tables/beginner/dict-basics"
    />
  );
}

