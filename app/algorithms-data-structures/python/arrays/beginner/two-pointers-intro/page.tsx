import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
import { arraysBeginnerLessons } from "@/lib/adsBeginnerTopics";

const pairCode = `nums = [1, 2, 4, 6, 8, 9]
target = 10

left = 0
right = len(nums) - 1

while left < right:
    total = nums[left] + nums[right]
    if total == target:
        break
    if total < target:
        left += 1
    else:
        right -= 1

print(nums[left], nums[right])`;

const pairOutput = `1 9`;

const reverseCode = `nums = [1, 2, 3, 4]

left = 0
right = len(nums) - 1

while left < right:
    nums[left], nums[right] = nums[right], nums[left]
    left += 1
    right -= 1

print(nums)`;

const reverseOutput = `[4, 3, 2, 1]`;

export default function TwoPointersIntroPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "introduction", label: "Introduction" },
    { id: "intuition", label: "Intuition" },
    { id: "pair-sum", label: "Example: pair sum" },
    { id: "reverse", label: "Example: reverse in place" },
    { id: "checklist", label: "Two-pointer checklist" },
  ];

  return (
    <ArticleLayout
      eyebrow="Algorithms - Python - Arrays"
      title="Two Pointers Intro"
      description="A first interview pattern: move inward from both ends to avoid extra memory."
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Within Arrays (Beginner)", links: arraysBeginnerLessons },
          ]}
          activeHref="/algorithms-data-structures/python/arrays/beginner/two-pointers-intro"
        />
      }
    >
      <InfoPanel id="introduction" title="Introduction" variant="intro">
        <p>
          Two pointers is a simple but powerful pattern. You keep two
          indices and move them based on what you see, which avoids a
          nested loop and saves time.
        </p>
        <p>
          It works best on sorted data or when the problem naturally has
          a left and right boundary.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          Imagine two people walking toward each other from opposite ends
          of a hallway. Each step shrinks the search space until they
          meet.
        </p>
      </InfoPanel>

      <section id="pair-sum" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Example: pair sum
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          On a sorted list, if the sum is too small, move the left pointer
          right to increase it. If the sum is too large, move the right
          pointer left to decrease it.
        </p>
        <CodeBlock code={pairCode} title="Python" />
        <OutputBlock output={pairOutput} />
      </section>

      <section id="reverse" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Example: reverse in place
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The same left/right movement can reverse an array without
          creating a new list. Each step swaps the elements at the
          pointers.
        </p>
        <CodeBlock code={reverseCode} title="Python" />
        <OutputBlock output={reverseOutput} />
      </section>

      <section id="checklist" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Two-pointer checklist
        </h2>
        <ul className="grid list-disc list-inside gap-2 text-sm text-[color:var(--color-muted)]">
          <li>Know the invariant: what remains true every step?</li>
          <li>Decide which pointer moves for each comparison.</li>
          <li>Stop when the pointers cross or the condition is met.</li>
        </ul>
      </section>
    </ArticleLayout>
  );
}
