import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
import { langChainBeginnerTopics } from "@/lib/llmTopics";

const setupCode = `# Import the dotenv loader
from dotenv import load_dotenv
# Import the chat model initializer
from langchain.chat_models import init_chat_model

# Load variables from .env into the process environment
load_dotenv()

# Create a lightweight chat model for this demo
model = init_chat_model(
    # Choose a small, fast OpenAI model
    model="gpt-4o-mini"
)`;

const stringPromptCode = `# Import the string prompt template class
from langchain_core.prompts import PromptTemplate

# Create a plain string prompt that includes conversation history
string_prompt = PromptTemplate.from_template(
    # The history and question are injected as text
    "You are a concise tutor.\\n\\n"
    "Conversation so far:\\n"
    "{history}\\n\\n"
    "Next user question:\\n"
    "{question}\\n\\n"
    "Answer in one sentence"
)`;

const stringHistoryCode = `# Build a manual text history (note the fake USER/ASSISTANT labels)
string_history = "USER: What is overfitting?\\nASSISTANT: Overfitting is when a model learns noise and performs poorly on new data."

# Define the next user question
question = "Give me one quick way to reduce it."`;

const stringInvokeCode = `# Fill the string template with history and the next question
final_string_prompt = string_prompt.invoke(
    {
        "history": string_history,
        "question": question
    }
)

# Send the final string prompt to the model
response = model.invoke(final_string_prompt)

# Print the assistant response
print("Assistant:", response.content)`;

const stringResponseOutput =
  "Assistant: One quick way to reduce overfitting is to use regularization techniques, such as L1 or L2 regularization.";

const stringAppendCode = `# Manually append the new turn back into the history text
string_history += f"\\nUSER: {question}\\nASSISTANT: {response.content}"

# Print the updated history string
print(string_history)`;

const stringHistoryOutput = `USER: What is overfitting?
ASSISTANT: Overfitting is when a model learns noise and performs poorly on new data.
USER: Give me one quick way to reduce it.
ASSISTANT: One quick way to reduce overfitting is to use regularization techniques, such as L1 or L2 regularization.`;

const chatSetupCode = `# Import chat prompt tools and message classes
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.prompts.chat import MessagesPlaceholder
from langchain.messages import HumanMessage, AIMessage`;

const chatPromptCode = `# Create a chat prompt with a history placeholder
chat_prompt = ChatPromptTemplate.from_messages(
    [
        # System rule for the assistant
        ("system", "You are a concise tutor. Answer in one sentence."),
        # Insert past messages here
        MessagesPlaceholder("history"),
        # Next user question
        ("human", "{question}")
    ]
)`;

const chatHistoryCode = `# Create structured history as real messages
chat_history = [
    HumanMessage(
        content="What is overfitting?"
    ),
    AIMessage(
        content="Overfitting is when a model learns noise and performs poorly on new data."
    )
]

# Reuse the same question
question = "Give me one quick way to reduce it."`;

const chatInvokeCode = `# Fill the chat template with history and the next question
chat_prompt_value = chat_prompt.invoke(
    {
        "history": chat_history,
        "question": question
    }
)

# Convert the prompt value into messages ready for the model
messages_to_send = chat_prompt_value.to_messages()

# Now we send the message list to the model
response = model.invoke(messages_to_send)
print("Assistant:", response.content)`;

const chatResponseOutput =
  "Assistant: One quick way to reduce overfitting is to use regularization techniques, such as L1 or L2 regularization.";

const chatAppendCode = `# Append the new user + assistant messages back into history
chat_history.append(HumanMessage(content=question))
chat_history.append(AIMessage(content=response.content))

display(chat_history)`;

const chatHistoryOutput = `[HumanMessage(content='What is overfitting?', additional_kwargs={}, response_metadata={}),
 AIMessage(content='Overfitting is when a model learns noise and performs poorly on new data.', additional_kwargs={}, response_metadata={}, tool_calls=[], invalid_tool_calls=[]),
 HumanMessage(content='Give me one quick way to reduce it.', additional_kwargs={}, response_metadata={}),
 AIMessage(content='One quick way to reduce overfitting is to use regularization techniques, such as L1 or L2 regularization.', additional_kwargs={}, response_metadata={}, tool_calls=[], invalid_tool_calls=[]),
 HumanMessage(content='Give me one quick way to reduce it.', additional_kwargs={}, response_metadata={}),
 AIMessage(content='One quick way to reduce overfitting is to use regularization techniques, such as L1 or L2 regularization.', additional_kwargs={}, response_metadata={}, tool_calls=[], invalid_tool_calls=[])]`;

export default function PromptTemplatesPart2Page() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "overview", label: "Overview" },
    { id: "setup", label: "Setup: model and environment" },
    { id: "approach-a", label: "Approach A: PromptTemplate (history as text)" },
    { id: "approach-a-append", label: "Approach A: append history" },
    { id: "approach-b", label: "Approach B: ChatPromptTemplate (history as messages)" },
    { id: "approach-b-append", label: "Approach B: append history" },
    { id: "key-takeaways", label: "Key takeaways" },
  ];

  return (
    <ArticleLayout
      eyebrow="LLMs - LangChain - Beginner"
      title="Prompt Templates (Part 2)"
      description="Compare PromptTemplate and ChatPromptTemplate side-by-side and see why structured messages scale better."
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Within LangChain (Beginner)", links: langChainBeginnerTopics },
          ]}
          activeHref="/llms/langchain/beginner/prompt-templates-part-2"
        />
      }
    >
      <InfoPanel id="overview" title="Overview" variant="intro">
        <p>
          Welcome back! In this notebook, we compare PromptTemplate and
          ChatPromptTemplate side-by-side.
        </p>
        <p>
          The key idea: PromptTemplate builds one string, while
          ChatPromptTemplate builds a structured list of messages. That
          structure is why ChatPromptTemplate is the preferred approach for
          chat, history, and tools.
        </p>
        <p>Why this matters:</p>
        <ul className="grid list-disc list-inside gap-2 text-sm text-[color:var(--color-muted)]">
          <li>Chat models expect role-based messages under the hood</li>
          <li>History stays clean and typed (no fake USER/ASSISTANT labels)</li>
          <li>It scales to tools/agents without changing the pattern</li>
        </ul>
        <p>
          We will show the same task both ways so you can see where string
          prompts become brittle.
        </p>
      </InfoPanel>

      <section id="setup" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Setup: model and environment
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We will reuse a lightweight model and load .env for the API key.
        </p>
        <CodeBlock code={setupCode} title="Python" />
      </section>

      <section id="approach-a" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Approach A: PromptTemplate (history as text)
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We will do the string version first. With PromptTemplate, history is
          just a string blob. You must invent labels like USER/ASSISTANT and
          keep the formatting consistent yourself.
        </p>
        <CodeBlock code={stringPromptCode} title="Python" />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We build the string history and the next question. Notice how the
          roles are just text labels, not real message objects.
        </p>
        <CodeBlock code={stringHistoryCode} title="Python" />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We fill the template to create the final prompt string. Now we send
          the string prompt to the model.
        </p>
        <CodeBlock code={stringInvokeCode} title="Python" />
        <OutputBlock output={stringResponseOutput} />
        <p className="text-sm text-[color:var(--color-muted)]">
          Output note: One sentence back - nice. But notice we're still in
          string-land.
        </p>
      </section>

      <section id="approach-a-append" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Approach A: append history
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          To continue the chat, we manually append the new turn back into the
          history string.
        </p>
        <CodeBlock code={stringAppendCode} title="Python" />
        <OutputBlock output={stringHistoryOutput} />
        <p className="text-sm text-[color:var(--color-muted)]">
          Output note: The history grew, but it's just a text blob you have to
          maintain by hand.
        </p>
      </section>

      <section id="approach-b" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Approach B: ChatPromptTemplate (history as messages)
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Now we switch to the message-based version. Here, history stays typed
          as message objects, which is safer and scales to tools and multi-turn
          chat.
        </p>
        <CodeBlock code={chatSetupCode} title="Python" />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We define a chat prompt with a MessagesPlaceholder for history.
        </p>
        <CodeBlock code={chatPromptCode} title="Python" />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We create real HumanMessage and AIMessage objects for history.
        </p>
        <CodeBlock code={chatHistoryCode} title="Python" />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Finally, we format the template into a message list that is ready to
          send to the model. Now we send the message list to the model.
        </p>
        <CodeBlock code={chatInvokeCode} title="Python" />
        <OutputBlock output={chatResponseOutput} />
        <p className="text-sm text-[color:var(--color-muted)]">
          Output note: One sentence again, but now it comes from structured
          messages.
        </p>
      </section>

      <section id="approach-b-append" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Approach B: append history
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Here we append the new user + assistant messages back into history.
        </p>
        <CodeBlock code={chatAppendCode} title="Python" />
        <OutputBlock output={chatHistoryOutput} />
        <p className="text-sm text-[color:var(--color-muted)]">
          Output note: You should see a list of HumanMessage and AIMessage
          objects with the new turn appended.
        </p>
      </section>

      <section id="key-takeaways" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Key takeaways
        </h2>
        <ul className="grid list-disc list-inside gap-2 text-sm text-[color:var(--color-muted)]">
          <li>PromptTemplate outputs one string; you must manage history formatting yourself.</li>
          <li>ChatPromptTemplate outputs messages; history stays structured and reusable.</li>
          <li>
            For real chat apps (memory, tools, multi-turn), ChatPromptTemplate
            is the safer default.
          </li>
        </ul>
      </section>
    </ArticleLayout>
  );
}
