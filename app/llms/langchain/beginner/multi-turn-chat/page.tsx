import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
import { langChainBeginnerTopics } from "@/lib/llmTopics";

const loadCode = `# Import the dotenv loader
from dotenv import load_dotenv
# Import the chat model initializer
from langchain.chat_models import init_chat_model
# Import explicit message types for a conversation
from langchain.messages import SystemMessage, HumanMessage, AIMessage

# Load variables from .env into the process environment
load_dotenv()`;

const initModelCode = `# Create a lightweight chat model for this demo
model = init_chat_model(
    # Choose a small, fast OpenAI model
    model="gpt-4o-mini"
)`;

const noMemoryCode = `# First call: tell the model your name
first = model.invoke("My name is Roger.")
print("Call 1:", first.content)

# Second call: ask the model to recall the name
second = model.invoke("\\nWhat is my name?")
print("Call 2:", second.content)`;

const noMemoryOutput = `Call 1: Hi Roger! How can I assist you today?
Call 2: I don't have access to personal information about users unless it has been shared in the course of our conversation. If you'd like to share your name or need help with something else, feel free to let me know!`;

const systemCode = `# Start an empty conversation history
history = []

# Add a system instruction to guide the assistant
history.append(
    SystemMessage(
        # Keep responses short and focused
        content="You are a concise tutor. Keep answers within 30 words."
    )
)

# Show the history after the first message
print(f"First memory:\\n\\n{history}")`;

const systemOutput = `First memory:
[SystemMessage(content='You are a concise tutor. Keep answers within 30 words.', additional_kwargs={}, response_metadata={})]`;

const turn1Code = `# Add the user's first question
history.append(
    HumanMessage(
        # First user query
        content="What is overfitting?"
    )
)

# Send the full history to the model
ai_1 = model.invoke(history)

# Store the assistant response in history
history.append(
    AIMessage(
        # Capture just the model's text
        content=ai_1.content
    )
)

# Print the assistant's reply
print("Assistant:", ai_1.content)`;

const turn1Output =
  "Assistant: Overfitting occurs when a model learns the training data too well, capturing noise and outliers, resulting in poor performance on unseen data.";

const turn2Code = `# Add a follow-up question that depends on context
history.append(
    HumanMessage(
        # Second user query
        content="Give one practical way to reduce it."
    )
)

# Send the updated history to the model
ai_2 = model.invoke(history)

# Store the assistant response in history
history.append(
    AIMessage(
        # Capture just the model's text
        content=ai_2.content
    )
)

# Print the assistant's reply
print("Assistant:", ai_2.content)`;

const turn2Output =
  "Assistant: Use cross-validation to evaluate model performance and ensure it generalizes effectively to new data.";

const reviewCode = `# Pretty-print every message in the conversation
for h in history:
    # Show each message in a readable format
    h.pretty_print()`;

const reviewOutput = `================================ System Message ================================
You are a concise tutor. Keep answers within 30 words.
================================ Human Message =================================
What is overfitting?
================================== Ai Message ==================================
Overfitting occurs when a model learns the training data too well, capturing noise and outliers, resulting in poor performance on unseen data.
================================ Human Message =================================
Give one practical way to reduce it.
================================== Ai Message ==================================
Use cross-validation to evaluate model performance and ensure it generalizes effectively to new data.`;

export default function MultiTurnChatPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "overview", label: "Overview" },
    { id: "load-env", label: "Loading environmental variables" },
    { id: "init-model", label: "Initialising the chat model" },
    { id: "no-memory", label: "Quick demo: no memory by default" },
    { id: "system-instruction", label: "Setting the system instruction" },
    { id: "turn-1", label: "Turn 1: ask the first question" },
    { id: "turn-2", label: "Turn 2: follow-up with context" },
    { id: "review", label: "Reviewing the full conversation" },
    { id: "key-takeaways", label: "Key takeaways" },
  ];

  return (
    <ArticleLayout
      eyebrow="LLMs - LangChain - Beginner"
      title="Multi-Turn Chat"
      description="Build a short conversation by manually tracking history and sending it back to the model each turn."
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Within LangChain (Beginner)", links: langChainBeginnerTopics },
          ]}
          activeHref="/llms/langchain/beginner/multi-turn-chat"
        />
      }
    >
      <InfoPanel id="overview" title="Overview" variant="intro">
        <p>
          In this notebook, we build a short conversation by manually tracking
          history. Think of history as a list you keep growing. Each turn, we
          send the whole list back to the model.
        </p>
        <p>Why this matters:</p>
        <ul className="grid list-disc list-inside gap-2 text-sm text-[color:var(--color-muted)]">
          <li>It preserves context across turns</li>
          <li>Follow-up questions make sense without repeating yourself</li>
          <li>It is the core idea behind chat memory in larger apps</li>
        </ul>
        <p>
          This pattern is the foundation for chat memory, multi-step workflows,
          and more advanced LangChain apps.
        </p>
      </InfoPanel>

      <section id="load-env" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Loading environmental variables
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Before we do anything, let's load our .env file so the API key is
          available.
        </p>
        <CodeBlock code={loadCode} title="Python" />
        <OutputBlock output="True" />
        <p className="text-sm text-[color:var(--color-muted)]">
          Output note: If you see True, the .env file was found. False means it
          was not - easy fix is to check the filename and path.
        </p>
      </section>

      <section id="init-model" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Initialising the chat model and history
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We begin by spinning up a lightweight model.
        </p>
        <CodeBlock code={initModelCode} title="Python" />
      </section>

      <section id="no-memory" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Quick demo: the model does NOT remember by itself
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We will call the model twice in succession. Notice how it cannot
          recall the name we gave it.
        </p>
        <CodeBlock code={noMemoryCode} title="Python" />
        <OutputBlock output={noMemoryOutput} />
        <p className="text-sm text-[color:var(--color-muted)]">
          Output note: The second reply usually says it doesn't know or guesses.
          That is the point: without history, the model has no memory.
        </p>
      </section>

      <section id="system-instruction" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Setting the system instruction
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          So, let's give our model some memory. We start with an empty history
          list. This list will hold System, Human, and AI messages in order. The
          first entry into our history list will be a SystemMessage that
          controls the assistant's behavior.
        </p>
        <CodeBlock code={systemCode} title="Python" />
        <OutputBlock output={systemOutput} />
        <p className="text-sm text-[color:var(--color-muted)]">
          Output note: You should see a list with a single SystemMessage. It
          looks a bit nerdy because it's a Python object, not a chat bubble.
        </p>
      </section>

      <section id="turn-1" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Turn 1: Ask the first question
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We add a HumanMessage, send the full history to the model, and then
          store the reply as an AIMessage.
        </p>
        <CodeBlock code={turn1Code} title="Python" />
        <OutputBlock output={turn1Output} />
        <p className="text-sm text-[color:var(--color-muted)]">
          Output note: You should get a short definition of overfitting. If it's
          long, your system rule might not have been applied.
        </p>
      </section>

      <section id="turn-2" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Turn 2: Follow-up with context
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We add another HumanMessage that depends on the first answer, and send
          the entire history again.
        </p>
        <CodeBlock code={turn2Code} title="Python" />
        <OutputBlock output={turn2Output} />
        <p className="text-sm text-[color:var(--color-muted)]">
          Output note: Expect a concise, practical tip (often regularization).
          Still short - that's the system rule at work.
        </p>
      </section>

      <section id="review" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Reviewing the full conversation
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Finally, we pretty-print every message in order.
        </p>
        <CodeBlock code={reviewCode} title="Python" />
        <OutputBlock output={reviewOutput} />
        <p className="text-sm text-[color:var(--color-muted)]">
          Output note: You should see a clean, role-labeled transcript (System
          -&gt; Human -&gt; AI -&gt; Human -&gt; AI).
        </p>
      </section>

      <section id="key-takeaways" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Key takeaways
        </h2>
        <ul className="grid list-disc list-inside gap-2 text-sm text-[color:var(--color-muted)]">
          <li>Multi-turn chat = keep a history list and resend it each turn.</li>
          <li>Store AI responses as AIMessage so the model can use them later.</li>
          <li>
            System rules apply to every turn as long as they stay in history.
          </li>
        </ul>
      </section>
    </ArticleLayout>
  );
}
