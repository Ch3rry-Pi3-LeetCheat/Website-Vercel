import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
import { hashTablesBeginnerLessons } from "@/lib/adsBeginnerTopics";

const lookupCode = `scores = {"amy": 3, "ben": 5}

scores["cody"] = 7

print(scores["ben"])
print("dana" in scores)
print(scores.get("dana", 0))`;

const lookupOutput = `5
False
0`;

const updateCode = `scores = {"amy": 3, "ben": 5, "cody": 7}

scores["amy"] = 4
del scores["ben"]

print(scores)`;

const updateOutput = `{'amy': 4, 'cody': 7}`;

export default function DictBasicsPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "introduction", label: "Introduction" },
    { id: "intuition", label: "Intuition" },
    { id: "lookup", label: "Create and lookup" },
    { id: "update", label: "Update and delete" },
  ];

  return (
    <ArticleLayout
      eyebrow="Algorithms - Python - Hash Tables"
      title="Dictionary Basics"
      description="Hash tables map keys to values for fast lookup and updates." 
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Within Hash Tables (Beginner)", links: hashTablesBeginnerLessons },
          ]}
          activeHref="/algorithms-data-structures/python/hash-tables/beginner/dict-basics"
        />
      }
    >
      <InfoPanel id="introduction" title="Introduction" variant="intro">
        <p>
          A hash table stores key-value pairs. In Python, the built-in
          dictionary gives you average O(1) lookup by key.
        </p>
        <p>
          The key idea is that you find data by name, not by position.
        </p>
      </InfoPanel>

      <InfoPanel id="intuition" title="Intuition" variant="intuition">
        <p>
          Imagine labeled mailboxes. You do not search the whole block;
          you go straight to the box with the right label.
        </p>
      </InfoPanel>

      <section id="lookup" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Create and lookup
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Use brackets for direct lookup. Use{" "}
          <span className="font-mono inline-code">get</span> for a safe
          default when the key is missing.
        </p>
        <CodeBlock code={lookupCode} title="Python" />
        <OutputBlock output={lookupOutput} />
      </section>

      <section id="update" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Update and delete
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Assigning to an existing key updates the value. Deleting a key
          removes the pair entirely.
        </p>
        <CodeBlock code={updateCode} title="Python" />
        <OutputBlock output={updateOutput} />
      </section>
    </ArticleLayout>
  );
}
