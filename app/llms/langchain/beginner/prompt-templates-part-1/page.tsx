import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
import { langChainBeginnerTopics } from "@/lib/llmTopics";

const promptTemplateCode = `# Import the string prompt template class
from langchain_core.prompts import PromptTemplate

# Create a reusable string prompt template
string_prompt = PromptTemplate.from_template(
    # Placeholders live inside {braces}
    "Explain {topic} to a {audience} in exactly 2 sentences."
)`;

const fillTemplateCode = `# Fill in the placeholders (LangChain calls this invoke)
string_prompt_value = string_prompt.invoke(
    # Provide values for each placeholder
    {
        "topic": "overfitting",
        "audience": "beginner"
    }
)

# Print the final formatted prompt
print(string_prompt_value.to_string())`;

const chatTemplateCode = `# Import the chat prompt template class
from langchain_core.prompts import ChatPromptTemplate

# Create a chat prompt from role + message pairs
chat_prompt = ChatPromptTemplate.from_messages(
    [
        # System message sets the behavior
        ("system", "You are a helpful tutor. Answer in {format_style}."),
        # Human message is the user request
        ("human", "Teach me {topic} using one simple example")
    ]
)`;

const fillChatCode = `# Fill in placeholders across all chat messages
chat_prompt_value = chat_prompt.invoke(
    # Provide values for format and topic
    {
        "format_style": "two bullet points",
        "topic": "data leakage"
    }
)

# Print the final messages with their roles
for message in chat_prompt_value.to_messages():
    # Each message has a type and content
    print(f"{message.type.upper()}: {message.content}")`;

const initModelCode = `# Import dotenv and the chat model initializer
from dotenv import load_dotenv
from langchain.chat_models import init_chat_model

# Load variables from .env into the process environment
load_dotenv()

# Create a lightweight chat model for this demo
model = init_chat_model(
    # Choose a small, fast OpenAI model
    model="gpt-4o-mini"
)`;

const sendStringPromptCode = `# Send the string prompt to the model
response = model.invoke(string_prompt_value.to_string())

# Print the assistant response
print(response.content)`;

const sendChatPromptCode = `# Send the chat prompt messages to the model
response = model.invoke(chat_prompt_value.to_messages())

# Print the assistant response
print(response.content)`;

const stringPromptOutput =
  "Explain overfitting to a beginner in exactly 2 sentences.";

const chatPromptOutput = `SYSTEM: You are a helpful tutor. Answer in two bullet points.
HUMAN: Teach me data leakage using one simple example`;

const stringResponseOutput =
  "Overfitting occurs when a machine learning model learns the training data too well, capturing noise and outliers rather than the underlying patterns. As a result, the model performs poorly on new, unseen data because it has become too tailored to the specifics of the training set.";

const chatResponseOutput = `- **Example Scenario**: Consider a model predicting house prices based on various features like square footage, number of bedrooms, and location. If the dataset includes the final sale price of the houses as a feature used to train the model, this would cause data leakage because the model has access to information from the future (the actual sale price) that it would not have in a real-world scenario.
- **Impact of Data Leakage**: This leads to overly optimistic model performance during training and validation, as the model learns to predict the sale price based on information it shouldn't have access to, ultimately resulting in poor performance on unseen data.`;

export default function PromptTemplatesPart1Page() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "overview", label: "Overview" },
    { id: "example-1", label: "Example 1: PromptTemplate (string prompts)" },
    { id: "example-2", label: "Example 2: ChatPromptTemplate (system + human)" },
    { id: "init-model", label: "Initialising the model" },
    { id: "example-3a", label: "Example 3: Template + model (string)" },
    { id: "example-3b", label: "Example 3: Template + model (chat)" },
  ];

  return (
    <ArticleLayout
      eyebrow="LLMs - LangChain - Beginner"
      title="Prompt Templates (Part 1)"
      description="Write a prompt once, fill in the blanks, and reuse it with clean, debuggable patterns."
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Within LangChain (Beginner)", links: langChainBeginnerTopics },
          ]}
          activeHref="/llms/langchain/beginner/prompt-templates-part-1"
        />
      }
    >
      <InfoPanel id="overview" title="Overview" variant="intro">
        <p>
          Prompt templates let you write a prompt once, then fill in the blanks.
          This makes prompts easy to reuse and easy to debug.
        </p>
        <p>
          In LangChain v1, templates live in{" "}
          <span className="font-mono inline-code">langchain_core.prompts</span>.
        </p>
        <p>We will cover three practical patterns:</p>
        <ul className="grid list-disc list-inside gap-2 text-sm text-[color:var(--color-muted)]">
          <li>
            <span className="font-mono inline-code">PromptTemplate</span> for
            plain strings
          </li>
          <li>
            <span className="font-mono inline-code">ChatPromptTemplate</span>{" "}
            for system + human messages
          </li>
          <li>Using templates directly with a chat model</li>
        </ul>
        <p>Quick tip: it is always worth printing the final prompt before you call a model.</p>
      </InfoPanel>

      <section id="example-1" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Example 1: PromptTemplate (string prompts)
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We will start small with a plain string template. It outputs one
          string.
        </p>
        <CodeBlock code={promptTemplateCode} title="Python" />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Now we fill the template and print the final string. If the line
          matches, your template is working.
        </p>
        <CodeBlock code={fillTemplateCode} title="Python" />
        <OutputBlock output={stringPromptOutput} />
        <p className="text-sm text-[color:var(--color-muted)]">
          Output note: You should see the filled-in prompt line. If placeholders
          did not fill, double-check the dictionary keys.
        </p>
      </section>

      <section id="example-2" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Example 2: ChatPromptTemplate (system + human)
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Now we switch to a chat prompt. This one outputs multiple messages,
          each with a role.
        </p>
        <CodeBlock code={chatTemplateCode} title="Python" />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We define a system rule and a human request, then fill the
          placeholders.
        </p>
        <CodeBlock code={fillChatCode} title="Python" />
        <OutputBlock output={chatPromptOutput} />
        <p className="text-sm text-[color:var(--color-muted)]">
          Output note: You will see SYSTEM: and HUMAN: lines - that's the exact
          message list the model will receive.
        </p>
      </section>

      <section id="init-model" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Initialising the model
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We will reuse a lightweight chat model. (The .env load is just for
          your API key.)
        </p>
        <CodeBlock code={initModelCode} title="Python" />
      </section>

      <section id="example-3a" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Example 3: Template + model (string prompt)
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          First, we send the string prompt to the model.
        </p>
        <CodeBlock code={sendStringPromptCode} title="Python" />
        <OutputBlock output={stringResponseOutput} />
        <p className="text-sm text-[color:var(--color-muted)]">
          Output note: Expect two sentences. The wording can vary - that's
          normal.
        </p>
      </section>

      <section id="example-3b" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Example 3: Template + model (chat prompt)
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Now we send the chat prompt messages to the model.
        </p>
        <CodeBlock code={sendChatPromptCode} title="Python" />
        <OutputBlock output={chatResponseOutput} />
        <p className="text-sm text-[color:var(--color-muted)]">
          Output note: Expect two bullet points, because the system message
          asked for them.
        </p>
      </section>
    </ArticleLayout>
  );
}
