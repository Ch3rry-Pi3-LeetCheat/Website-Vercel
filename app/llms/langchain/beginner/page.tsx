import Link from "next/link";

const lessons = [
  {
    title: "Simple Chat Model",
    description:
      "The smallest possible LangChain chat example, plus a clean look at what the model returns.",
    href: "/llms/langchain/beginner/simple-chat-model",
  },
  {
    title: "Explicit Message Types",
    description:
      "Use SystemMessage and HumanMessage to make roles explicit and outputs easier to steer.",
    href: "/llms/langchain/beginner/explicit-message-types",
  },
  {
    title: "Multi-Turn Chat",
    description:
      "Track history manually and resend it each turn to preserve context.",
    href: "/llms/langchain/beginner/multi-turn-chat",
  },
  {
    title: "Prompt Templates (Part 1)",
    description:
      "Build reusable prompts with PromptTemplate and ChatPromptTemplate.",
    href: "/llms/langchain/beginner/prompt-templates-part-1",
  },
  {
    title: "Prompt Templates (Part 2)",
    description:
      "Compare string prompts vs message-based templates and see how history scales.",
    href: "/llms/langchain/beginner/prompt-templates-part-2",
  },
  {
    title: "Output Parsers",
    description:
      "Turn model text into reliable data with string, JSON, and Pydantic parsers.",
    href: "/llms/langchain/beginner/output-parsers",
  },
];

export default function LangChainBeginnerPage() {
  return (
    <div className="px-6 pb-20 pt-12">
      <div className="mx-auto w-full max-w-5xl">
        <header className="grid gap-4">
          <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--color-accent-2)]">
            LLMs - LangChain - Beginner
          </p>
          <h1 className="text-4xl font-semibold text-white font-[var(--font-display)]">
            Beginner lessons
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-[color:var(--color-muted)]">
            Start with the essentials: initialise a chat model, send a prompt,
            and inspect what comes back.
          </p>
        </header>

        <div className="mt-10 grid gap-4">
          {lessons.map((lesson) => (
            <Link
              key={lesson.href}
              href={lesson.href}
              className="glass-panel rounded-2xl px-6 py-6 transition hover:border-white/30"
            >
              <h2 className="text-xl font-semibold text-white">
                {lesson.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">
                {lesson.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
