import BeginnerLessonTemplate from "@/components/ads/BeginnerLessonTemplate";
import MapStateStepper from "@/components/ads/MapStateStepper";
import { hashTablesBeginnerLessons } from "@/lib/adsBeginnerTopics";

const countCode = `text = "banana"
freq = {}

for ch in text:
    freq[ch] = freq.get(ch, 0) + 1

print(freq)`;

const countOutput = `{'b': 1, 'a': 3, 'n': 2}`;

const topCode = `freq = {"b": 1, "a": 3, "n": 2}
most_common = max(freq, key=freq.get)
print(most_common, freq[most_common])`;

const topOutput = `a 3`;

export default function CountingPage() {
  return (
    <BeginnerLessonTemplate
      eyebrow="CS - Python - Hash Tables"
      title="Counting Pattern"
      description="Build frequency maps efficiently and understand why this pattern appears in many string/array problems."
      intro={[
        "Counting shows up everywhere: duplicates, anagrams, majority elements, and frequency ranking.",
        "A hash map makes counting simple by mapping value -> current count.",
      ]}
      intuition={[
        "Imagine tally marks on paper. For each value you see, increment that value's count.",
        "Hash maps automate the tally lookup so each increment is fast.",
      ]}
      realWorld={[
        {
          scenario: "Error monitoring",
          mapping:
            "error_code -> count helps identify dominant failure modes quickly.",
        },
        {
          scenario: "Word frequency",
          mapping:
            "token -> count powers simple text analysis features.",
        },
      ]}
      keyIdeaTitle="Frequency update template"
      keyIdeaText={[
        "Initialize an empty dict.",
        "For each item, do freq[item] = freq.get(item, 0) + 1.",
        "After one pass, dict contains complete frequencies.",
      ]}
      interactiveDescription='Step through "banana" and watch counts accumulate.'
      interactive={
        <MapStateStepper
          title="Counting progression"
          subtitle='Input stream: b -> a -> n -> a -> n -> a.'
          steps={[
            {
              title: "Read b",
              explanation: "First b seen, count starts at 1.",
              currentInput: "ch = 'b'",
              mapEntries: [{ key: "b", value: 1, highlighted: true }],
            },
            {
              title: "Read a",
              explanation: "First a seen.",
              currentInput: "ch = 'a'",
              mapEntries: [
                { key: "b", value: 1 },
                { key: "a", value: 1, highlighted: true },
              ],
            },
            {
              title: "Read n",
              explanation: "First n seen.",
              currentInput: "ch = 'n'",
              mapEntries: [
                { key: "b", value: 1 },
                { key: "a", value: 1 },
                { key: "n", value: 1, highlighted: true },
              ],
            },
            {
              title: "Read final a",
              explanation: "a increments to 3 by the end.",
              currentInput: "final ch = 'a'",
              mapEntries: [
                { key: "b", value: 1 },
                { key: "a", value: 3, highlighted: true },
                { key: "n", value: 2 },
              ],
            },
          ]}
        />
      }
      examples={[
        {
          id: "ex-count",
          title: "Example 1: Frequency map",
          explanation:
            "One pass over the string builds full counts.",
          code: countCode,
          output: countOutput,
        },
        {
          id: "ex-most",
          title: "Example 2: Read most frequent item",
          explanation:
            "Once counts exist, follow-up queries are straightforward.",
          code: topCode,
          output: topOutput,
        },
      ]}
      complexityRows={[
        { operation: "Build freq map (n items)", averageTime: String.raw`O(n)`, extraSpace: String.raw`O(k)` },
        { operation: "Lookup count", averageTime: String.raw`O(1)`, extraSpace: String.raw`O(1)` },
      ]}
      pitfalls={[
        "Forgetting default value when first seeing an item.",
        "Using nested loops for counting and missing the O(n) map solution.",
        "Confusing unique key count k with total length n.",
      ]}
      summary={[
        "Counting pattern is one of the most reusable hash-map templates.",
        "The update expression with get() handles both seen/unseen cases cleanly.",
        "Many interview tasks become simple after building frequencies first.",
      ]}
      nextStep="Next we apply hash maps to complement matching for the classic Two Sum pattern."
      railTitle="Within Hash Tables (Beginner)"
      railLinks={hashTablesBeginnerLessons}
      activeHref="/algorithms-data-structures/python/hash-tables/beginner/counting"
    />
  );
}

