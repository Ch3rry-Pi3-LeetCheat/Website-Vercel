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
# Import explicit message types (system + human)
from langchain.messages import SystemMessage, HumanMessage

# Load variables from .env into the process environment
load_dotenv()`;

const initModelCode = `# Create a lightweight chat model for this demo
model = init_chat_model(
    # Choose a small, fast OpenAI model
    model="gpt-4o-mini"
)`;

const messagesCode = `# Build an explicit list of messages
messages = [
    # SystemMessage sets behavior and tone
    SystemMessage(
        # Instruction the model should follow
        content="You are a helpful assistant who answers in two bullet points"
    ),
    # HumanMessage is the user's input
    HumanMessage(
        # The actual question we want answered
        content="What is the difference between a function and a method in Python?"
    )
]`;

const sendCode = `# Send the message list to the model
response = model.invoke(messages)

# Pretty-print the model response for readability
response.pretty_print()`;

const responseOutput = `================================== Ai Message ==================================
- A **function** is a block of code that performs a specific task and can be called independently. It is defined using the \`def\` keyword and can take parameters but is not associated with any object.
- A **method** is similar to a function but is associated with an object and is defined within a class. It typically operates on data contained within the object (its attributes) and is called using the instance of the class.`;

export default function ExplicitMessageTypesPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "overview", label: "Overview" },
    { id: "load-env", label: "Loading environmental variables" },
    { id: "init-model", label: "Initialising the chat model" },
    { id: "define-messages", label: "Defining explicit message types" },
    { id: "send-messages", label: "Sending the messages" },
    { id: "key-takeaways", label: "Key takeaways" },
  ];

  return (
    <ArticleLayout
      eyebrow="LLMs - LangChain - Beginner"
      title="Explicit Message Types"
      description="Move beyond a single string prompt and use explicit message objects so roles are clear and behavior is easier to steer."
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Within LangChain (Beginner)", links: langChainBeginnerTopics },
          ]}
          activeHref="/llms/langchain/beginner/explicit-message-types"
        />
      }
    >
      <InfoPanel id="overview" title="Overview" variant="intro">
        <p>
          Welcome! In this notebook, we move beyond a single string prompt and
          use explicit message objects. This makes the roles clear and gives the
          model stronger guidance.
        </p>
        <p>Why this matters:</p>
        <ul className="grid list-disc list-inside gap-2 text-sm text-[color:var(--color-muted)]">
          <li>System rules stay separate from user input</li>
          <li>Behavior is easier to steer and debug</li>
          <li>The structure scales to history, tools, and chains</li>
        </ul>
        <p>
          This message-based approach really shines when you build more
          sophisticated LangChain apps: multi-turn chats (with history), chains,
          and other higher-level workflows all build on the same idea.
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
          Output note: If you see True, the .env file was found. If it says
          False, double-check the filename and location.
        </p>
      </section>

      <section id="init-model" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Initialising the chat model
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Next, we spin up a lightweight model for a quick demo.
        </p>
        <CodeBlock code={initModelCode} title="Python" />
      </section>

      <section id="define-messages" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Defining explicit message types
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Instead of a single string, we build a tiny transcript made of message
          objects.
        </p>
        <ul className="grid list-disc list-inside gap-2 text-sm text-[color:var(--color-muted)]">
          <li>
            <span className="font-mono inline-code">SystemMessage</span> sets the
            assistant's behavior, tone, and constraints.
          </li>
          <li>
            <span className="font-mono inline-code">HumanMessage</span>{" "}
            represents the user's actual request.
          </li>
          <li>
            <span className="font-mono inline-code">AIMessage</span> is the
            assistant's output (useful to store for later turns).
          </li>
          <li>
            Order matters: system message first, then user message, then the AI
            reply.
          </li>
        </ul>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This structure makes conversations easier to extend and debug.
        </p>
        <CodeBlock code={messagesCode} title="Python" />
      </section>

      <section id="send-messages" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Sending the messages
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We pass the list into{" "}
          <span className="font-mono inline-code">model.invoke(...)</span> and
          get back an{" "}
          <span className="font-mono inline-code">AIMessage</span>. We then
          pretty-print it so it reads like a clean chat response.
        </p>
        <CodeBlock code={sendCode} title="Python" />
        <OutputBlock output={responseOutput} />
        <p className="text-sm text-[color:var(--color-muted)]">
          Output note: You should see a neat two-bullet reply. Nice - that's
          your <span className="font-mono inline-code">SystemMessage</span>{" "}
          steering the format.
        </p>
      </section>

      <section id="key-takeaways" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Key takeaways
        </h2>
        <ul className="grid list-disc list-inside gap-2 text-sm text-[color:var(--color-muted)]">
          <li>Explicit message types give you control and clarity.</li>
          <li>
            <span className="font-mono inline-code">System</span> = rules,{" "}
            <span className="font-mono inline-code">Human</span> = request,{" "}
            <span className="font-mono inline-code">AI</span> = response.
          </li>
          <li>The ordered list is the foundation for multi-turn chat.</li>
        </ul>
      </section>
    </ArticleLayout>
  );
}
