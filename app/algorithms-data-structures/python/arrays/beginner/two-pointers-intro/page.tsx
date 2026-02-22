import BeginnerLessonTemplate from "@/components/ads/BeginnerLessonTemplate";
import LinearStateStepper from "@/components/ads/LinearStateStepper";
import { arraysBeginnerLessons } from "@/lib/adsBeginnerTopics";

const pairCode = `nums = [1, 2, 4, 6, 8, 9]
target = 10

left = 0
right = len(nums) - 1

while left < right:
    current = nums[left] + nums[right]
    if current == target:
        print(left, right)
        break
    if current < target:
        left += 1
    else:
        right -= 1`;

const pairOutput = `0 5`;

const palindromeCode = `s = "racecar"

left = 0
right = len(s) - 1
is_palindrome = True

while left < right:
    if s[left] != s[right]:
        is_palindrome = False
        break
    left += 1
    right -= 1

print(is_palindrome)`;

const palindromeOutput = `True`;

export default function TwoPointersIntroPage() {
  return (
    <BeginnerLessonTemplate
      eyebrow="CS - Python - Arrays"
      title="Two Pointers Intro"
      description="Learn the two-pointer pattern as a clean alternative to many O(n^2) brute-force loops."
      intro={[
        "Two pointers means tracking two indices at the same time and moving them based on a rule.",
        "This often avoids nested loops and gives O(n) scans on sorted arrays or mirrored strings.",
      ]}
      intuition={[
        "Picture two people walking toward each other from opposite ends of a hallway.",
        "Each move uses local information (sum too small? move left pointer right) to make global progress.",
      ]}
      realWorld={[
        {
          scenario: "Budget pair checks",
          mapping:
            "Given sorted prices, find two items matching a budget without checking every pair.",
        },
        {
          scenario: "Text symmetry checks",
          mapping:
            "Compare left and right characters to test if a word reads the same backward.",
        },
      ]}
      keyIdeaTitle="Pointer movement rule"
      keyIdeaText={[
        "The pattern works best when you can decide which pointer to move based on a comparison.",
        "For sorted sums: current sum too small -> move left forward; too large -> move right backward.",
        "For palindrome checks: mismatch means fail early; match means move both pointers inward.",
      ]}
      interactiveDescription="Step through the sorted two-sum logic visually."
      interactive={
        <LinearStateStepper
          title="Two-sum pointer walk"
          subtitle="Target = 10 on sorted array [1, 2, 4, 6, 8, 9]."
          steps={[
            {
              title: "Initialize pointers",
              explanation: "left starts at index 0, right at index 5.",
              values: [1, 2, 4, 6, 8, 9],
              highlightIndices: [0, 5],
              pointers: [
                { index: 0, label: "left" },
                { index: 5, label: "right" },
              ],
            },
            {
              title: "Check sum",
              explanation: "1 + 9 = 10, target reached immediately.",
              values: [1, 2, 4, 6, 8, 9],
              highlightIndices: [0, 5],
              pointers: [
                { index: 0, label: "left" },
                { index: 5, label: "right" },
              ],
            },
            {
              title: "Alternative branch (if sum were low)",
              explanation: "You would move left rightward to increase the sum.",
              values: [1, 2, 4, 6, 8, 9],
              highlightIndices: [1, 5],
              pointers: [
                { index: 1, label: "left" },
                { index: 5, label: "right" },
              ],
            },
          ]}
        />
      }
      examples={[
        {
          id: "ex-two-sum",
          title: "Example 1: Pair sum in sorted array",
          explanation:
            "Two pointers find a valid pair in linear time once the array is sorted.",
          code: pairCode,
          output: pairOutput,
        },
        {
          id: "ex-palindrome",
          title: "Example 2: Palindrome check",
          explanation:
            "The same left/right movement idea works naturally on strings.",
          code: palindromeCode,
          output: palindromeOutput,
        },
      ]}
      complexityRows={[
        { operation: "Two-pointer scan", averageTime: String.raw`O(n)`, extraSpace: String.raw`O(1)` },
        { operation: "Brute-force pair check", averageTime: String.raw`O(n^2)`, extraSpace: String.raw`O(1)` },
      ]}
      pitfalls={[
        "Applying two pointers to unsorted data without sorting first (for sum problems).",
        "Moving both pointers when only one should move.",
        "Forgetting the loop condition left < right, which can cause duplicate checks.",
      ]}
      summary={[
        "Two pointers is a reusable pattern, not a one-off trick.",
        "Movement rules come from comparisons, which keeps logic deterministic.",
        "On the right problems, two pointers converts quadratic work into linear work.",
      ]}
      nextStep="After arrays, compare this pointer mindset with linked lists, where movement is by next pointers rather than numeric indices."
      railTitle="Within Arrays (Beginner)"
      railLinks={arraysBeginnerLessons}
      activeHref="/algorithms-data-structures/python/arrays/beginner/two-pointers-intro"
    />
  );
}

