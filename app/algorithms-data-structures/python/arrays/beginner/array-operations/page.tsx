import ArticleLayout from "@/components/ArticleLayout";
import ComplexityTable from "@/components/ads/ComplexityTable";
import LinearStateStepper from "@/components/ads/LinearStateStepper";
import CodeBlock from "@/components/CodeBlock";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
import { adsPythonTopics } from "@/lib/adsTopics";
import { arraysBeginnerLessons } from "@/lib/adsBeginnerTopics";

const appendCode = `nums = [10, 20, 30, 40]
nums.append(50)
print(nums)`;

const appendOutput = `[10, 20, 30, 40, 50]`;

const popCode = `nums = [10, 20, 30, 40]
last = nums.pop()
print(last)
print(nums)`;

const popOutput = `40
[10, 20, 30]`;

const insertCode = `nums = [10, 20, 30, 40]
nums.insert(1, 15)
print(nums)`;

const insertOutput = `[10, 15, 20, 30, 40]`;

const removeCode = `nums = [10, 20, 30, 40]
nums.remove(30)
print(nums)`;

const removeOutput = `[10, 20, 40]`;

export default function ArrayOperationsPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "introduction", label: "Introduction" },
    { id: "append", label: "append(x)" },
    { id: "append-intuition", label: "Intuition", level: 2 },
    { id: "append-interactive", label: "Interactive", level: 2 },
    { id: "append-python", label: "Python example", level: 2 },
    { id: "pop", label: "pop()" },
    { id: "pop-intuition", label: "Intuition", level: 2 },
    { id: "pop-interactive", label: "Interactive", level: 2 },
    { id: "pop-python", label: "Python example", level: 2 },
    { id: "insert", label: "insert(i, x)" },
    { id: "insert-intuition", label: "Intuition", level: 2 },
    { id: "insert-interactive", label: "Interactive", level: 2 },
    { id: "insert-python", label: "Python example", level: 2 },
    { id: "remove", label: "remove(x)" },
    { id: "remove-intuition", label: "Intuition", level: 2 },
    { id: "remove-interactive", label: "Interactive", level: 2 },
    { id: "remove-python", label: "Python example", level: 2 },
    { id: "complexity", label: "Complexity quick sheet" },
    { id: "summary", label: "Summary" },
  ];

  return (
    <ArticleLayout
      eyebrow="CS - Python - Arrays"
      title="Common Operations"
      description="Compare append, pop, insert, and remove with step-by-step visuals and code."
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Within CS (Python)", links: adsPythonTopics },
            { title: "Within Arrays (Beginner)", links: arraysBeginnerLessons },
          ]}
          activeHref="/algorithms-data-structures/python/arrays/beginner/array-operations"
        />
      }
    >
      <InfoPanel id="introduction" title="Introduction" variant="intro">
        <p>
          These operations look similar in Python syntax, but their costs differ
          because some operations force values to shift.
        </p>
        <p>
          We will break each operation into the same flow: intuition, interactive
          walkthrough, then Python example.
        </p>
      </InfoPanel>

      <section id="append" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          append(x)
        </h2>

        <section id="append-intuition" className="grid gap-2">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">Intuition</h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            Appending adds one new value at the end. Existing values stay where
            they are.
          </p>
        </section>

        <section id="append-interactive" className="grid gap-2">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">Interactive</h3>
          <LinearStateStepper
            title="append walkthrough"
            subtitle="No shifting required."
            cellLayout="contiguous"
            steps={[
              {
                title: "Before append",
                explanation: "Current array.",
                values: [10, 20, 30, 40],
              },
              {
                title: "append(50)",
                explanation: "50 is placed at the new end position.",
                values: [10, 20, 30, 40, 50],
                highlightIndices: [4],
              },
            ]}
          />
        </section>

        <section id="append-python" className="grid gap-2">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">Python example</h3>
          <CodeBlock code={appendCode} title="Python" />
          <OutputBlock output={appendOutput} />
        </section>
      </section>

      <section id="pop" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          pop()
        </h2>

        <section id="pop-intuition" className="grid gap-2">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">Intuition</h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            pop() removes and returns the final value. This is usually cheap
            because nothing to the left needs to move.
          </p>
        </section>

        <section id="pop-interactive" className="grid gap-2">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">Interactive</h3>
          <LinearStateStepper
            title="pop walkthrough"
            subtitle="Last value is removed."
            cellLayout="contiguous"
            steps={[
              {
                title: "Before pop",
                explanation: "Current array.",
                values: [10, 20, 30, 40],
              },
              {
                title: "pop() returns 40",
                explanation: "Last slot disappears from the active array.",
                values: [10, 20, 30],
                highlightIndices: [2],
              },
            ]}
          />
        </section>

        <section id="pop-python" className="grid gap-2">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">Python example</h3>
          <CodeBlock code={popCode} title="Python" />
          <OutputBlock output={popOutput} />
        </section>
      </section>

      <section id="insert" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          insert(i, x)
        </h2>

        <section id="insert-intuition" className="grid gap-2">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">Intuition</h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            To insert into the middle, Python first creates room by shifting
            affected values to the right, then writes the new value into the open slot.
          </p>
        </section>

        <section id="insert-interactive" className="grid gap-2">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">Interactive</h3>
          <LinearStateStepper
            title="insert walkthrough"
            subtitle="Shift first, then place the new value."
            cellLayout="contiguous"
            steps={[
              {
                title: "Before insert(1, 15)",
                explanation: "Current array.",
                values: [10, 20, 30, 40],
              },
              {
                title: "Shift right: move 40",
                explanation: "Rightmost affected value shifts one slot right.",
                values: [10, 20, 30, 40, 40],
                highlightIndices: [3, 4],
              },
              {
                title: "Shift right: move 30",
                explanation: "Next affected value shifts right.",
                values: [10, 20, 30, 30, 40],
                highlightIndices: [2, 3],
              },
              {
                title: "Shift right: move 20",
                explanation: "Slot at index 1 is now free.",
                values: [10, 20, 20, 30, 40],
                highlightIndices: [1, 2],
              },
              {
                title: "Insert new value 15",
                explanation: "Write 15 into the new open slot at index 1.",
                values: [10, 15, 20, 30, 40],
                highlightIndices: [1],
              },
            ]}
          />
        </section>

        <section id="insert-python" className="grid gap-2">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">Python example</h3>
          <CodeBlock code={insertCode} title="Python" />
          <OutputBlock output={insertOutput} />
        </section>
      </section>

      <section id="remove" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          remove(x)
        </h2>

        <section id="remove-intuition" className="grid gap-2">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">Intuition</h3>
          <p className="text-base leading-7 text-[color:var(--color-muted)]">
            remove(x) deletes the first matching value, then shifts trailing
            values left to close the gap.
          </p>
        </section>

        <section id="remove-interactive" className="grid gap-2">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">Interactive</h3>
          <LinearStateStepper
            title="remove walkthrough"
            subtitle="Delete first match and shift left."
            cellLayout="contiguous"
            steps={[
              {
                title: "Before remove(30)",
                explanation: "Current array.",
                values: [10, 20, 30, 40],
              },
              {
                title: "Delete 30",
                explanation: "Gap appears at index 2.",
                values: [10, 20, ".", 40],
                highlightIndices: [2],
              },
              {
                title: "Shift left",
                explanation: "40 shifts left to close the gap.",
                values: [10, 20, 40],
                highlightIndices: [2],
              },
            ]}
          />
        </section>

        <section id="remove-python" className="grid gap-2">
          <h3 className="text-xl font-semibold text-white font-[var(--font-display)]">Python example</h3>
          <CodeBlock code={removeCode} title="Python" />
          <OutputBlock output={removeOutput} />
        </section>
      </section>

      <section id="complexity" className="scroll-mt-28 grid gap-3">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Complexity quick sheet
        </h2>
        <ComplexityTable
          rows={[
            { operation: "append(x)", averageTime: String.raw`O(1)`, extraSpace: String.raw`O(1)` },
            { operation: "pop()", averageTime: String.raw`O(1)`, extraSpace: String.raw`O(1)` },
            { operation: "insert(i, x)", averageTime: String.raw`O(n)`, extraSpace: String.raw`O(1)` },
            { operation: "remove(x)", averageTime: String.raw`O(n)`, extraSpace: String.raw`O(1)` },
          ]}
        />
      </section>

      <section id="summary" className="scroll-mt-28 grid gap-2">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Summary
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          End operations are usually cheap. Middle operations are usually more
          expensive because shifting is required.
        </p>
      </section>
    </ArticleLayout>
  );
}

