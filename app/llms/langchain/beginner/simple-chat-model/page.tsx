import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
import { langChainBeginnerTopics } from "@/lib/llmTopics";

const loadDotenvCode = `from dotenv import load_dotenv

# Load variables from .env into the process environment
load_dotenv()`;

const initModelCode = `from langchain.chat_models import init_chat_model

# Create a lightweight chat model for this demo
model = init_chat_model(
    # Choose a small, fast OpenAI model
    model="gpt-4o-mini"
)`;

const invokeCode = `# Send a simple prompt to the model
response = model.invoke(input="Hiya!")`;

const responseInspectCode = `# Display the raw AIMessage object
response`;

const responseOutput = `AIMessage(content='Hi there! How can I assist you today?', additional_kwargs={'refusal': None}, response_metadata={'token_usage': {'completion_tokens': 10, 'prompt_tokens': 10, 'total_tokens': 20, 'completion_tokens_details': {'accepted_prediction_tokens': 0, 'audio_tokens': 0, 'reasoning_tokens': 0, 'rejected_prediction_tokens': 0}, 'prompt_tokens_details': {'audio_tokens': 0, 'cached_tokens': 0}}, 'model_provider': 'openai', 'model_name': 'gpt-4o-mini-2024-07-18', 'system_fingerprint': 'fp_29330a9688', 'id': 'chatcmpl-D1HbVuqzrvbHqIp0TQTIx8GcbQnwZ', 'service_tier': 'default', 'finish_reason': 'stop', 'logprobs': None}, id='lc_run--019bec70-b845-7483-bd84-00a843dcce74-0', tool_calls=[], invalid_tool_calls=[], usage_metadata={'input_tokens': 10, 'output_tokens': 10, 'total_tokens': 20, 'input_token_details': {'audio': 0, 'cache_read': 0}, 'output_token_details': {'audio': 0, 'reasoning': 0}})`;

const typeCode = `# Check the Python type of the response
type(response)`;

const coreVersionCode = `# Import the core package to inspect its version
import langchain_core

# Print the installed langchain_core version
print(langchain_core.__version__)`;

const dumpCode = `from pprint import pprint

# Convert the AIMessage into a plain Python dict
response_dict = response.model_dump()

# Pretty-print the dictionary for inspection
pprint(response_dict)`;

const dumpOutput = `{'additional_kwargs': {'refusal': None},
 'content': 'Hi there! How can I assist you today?',
 'id': 'lc_run--019bec70-b845-7483-bd84-00a843dcce74-0',
 'invalid_tool_calls': [],
 'name': None,
 'response_metadata': {'finish_reason': 'stop',
                       'id': 'chatcmpl-D1HbVuqzrvbHqIp0TQTIx8GcbQnwZ',
                       'logprobs': None,
                       'model_name': 'gpt-4o-mini-2024-07-18',
                       'model_provider': 'openai',
                       'service_tier': 'default',
                       'system_fingerprint': 'fp_29330a9688',
                       'token_usage': {'completion_tokens': 10,
                                       'completion_tokens_details': {'accepted_prediction_tokens': 0,
                                                                     'audio_tokens': 0,
                                                                     'reasoning_tokens': 0,
                                                                     'rejected_prediction_tokens': 0},
                                       'prompt_tokens': 10,
                                       'prompt_tokens_details': {'audio_tokens': 0,
                                                                 'cached_tokens': 0},
                                       'total_tokens': 20}},
 'tool_calls': [],
 'type': 'ai',
 'usage_metadata': {'input_token_details': {'audio': 0, 'cache_read': 0},
                    'input_tokens': 10,
                    'output_token_details': {'audio': 0, 'reasoning': 0},
                    'output_tokens': 10,
                    'total_tokens': 20}}`;

const contentCode = `# Pull out just the assistant's text content
response_dict["content"]`;

const prettyPrintCode = `# Pretty-print the response for readability
response.pretty_print()`;

const prettyPrintOutput = `================================== Ai Message ==================================
Hi there! How can I assist you today?`;

const contentPrintCode = `# Print the response content as a plain string
print(response.content)`;

export default function SimpleChatModelPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "overview", label: "Overview" },
    { id: "load-env", label: "Loading environment variables" },
    { id: "init-model", label: "Initialising the chat model" },
    { id: "send-prompt", label: "Sending a prompt to the model" },
    { id: "inspect-response", label: "Inspecting the model response" },
    { id: "core-package", label: "Confirming langchain_core" },
    { id: "model-dump", label: "Converting to a dictionary" },
    { id: "dict-output", label: "Understanding the dictionary output" },
    { id: "extract-content", label: "Extracting the content" },
    { id: "pretty-print", label: "Pretty-printing the response" },
    { id: "content-direct", label: "Accessing message content directly" },
  ];

  return (
    <ArticleLayout
      eyebrow="LLMs - LangChain - Beginner"
      title="LangChain: Simple Chat Model"
      description="Build the smallest possible LangChain chat example, then peek under the hood to see exactly what the model returns."
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Within LangChain (Beginner)", links: langChainBeginnerTopics },
          ]}
          activeHref="/llms/langchain/beginner/simple-chat-model"
        />
      }
    >
      <InfoPanel id="overview" title="Overview" variant="intro">
        <p>
          Welcome! In this notebook, we'll build the smallest possible LangChain
          chat example and then peek under the hood to see what the model
          actually returns.
        </p>
        <p>We'll:</p>
        <ul className="grid list-disc list-inside gap-2 text-sm text-[color:var(--color-muted)]">
          <li>load environment variables</li>
          <li>initialise a lightweight chat model</li>
          <li>send a quick prompt</li>
          <li>inspect the AIMessage object</li>
          <li>convert it into a plain Python dictionary</li>
          <li>grab the text in the cleanest way possible</li>
        </ul>
        <p>
          By the end, you'll know exactly what a LangChain chat response looks
          like -- and how to work with it like regular Python data.
        </p>
      </InfoPanel>

      <section id="load-env" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Loading environmental variables
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Before we do anything, it&apos;s a good idea to load our environment
          variables. The python-dotenv library reads this file and adds the
          variables to the process environment, making them accessible to our
          model via{" "}
          <span className="font-mono text-white">os.getenv(...)</span>.
        </p>
        <CodeBlock code={loadDotenvCode} title="Python" />
        <OutputBlock output="True" />
      </section>

      <section id="init-model" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Initialising the chat model
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The <span className="font-mono text-white">init_chat_model</span>{" "}
          helper function selects and configures the appropriate chat model
          based on the arguments provided. In this case, we are using a
          lightweight OpenAI model suitable for simple examples and
          demonstrations.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          The returned <span className="font-mono text-white">model</span>{" "}
          object acts as a callable interface to the underlying language model.
        </p>
        <CodeBlock code={initModelCode} title="Python" />
      </section>

      <section id="send-prompt" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Sending a prompt to the model
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          With the chat model initialised, we can now send it an input prompt
          (e.g., &quot;Hiya!&quot;). The{" "}
          <span className="font-mono text-white">invoke()</span> method executes
          a single model call and returns the model&apos;s response.
        </p>
        <CodeBlock code={invokeCode} title="Python" />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Now, let&apos;s check out the model&apos;s response.
        </p>
        <CodeBlock code={responseInspectCode} title="Python" />
        <OutputBlock output={responseOutput} />
      </section>

      <section id="inspect-response" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Inspecting the model response
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          When we call a chat model in LangChain, the result is not just a plain
          string. Instead, LangChain returns an{" "}
          <span className="font-mono text-white">AIMessage</span> object. This
          object contains:
        </p>
        <ul className="grid list-disc list-inside gap-2 text-sm text-[color:var(--color-muted)]">
          <li>the assistant&apos;s text reply (content)</li>
          <li>
            metadata about the call (model name, token usage, finish reason,
            etc.)
          </li>
          <li>tool-call fields (empty in this simple example)</li>
        </ul>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          At first glance, this can look confusing because it's a rich Python
          object, not a "chat bubble". To confirm what it actually is, let's
          check its Python type:
        </p>
        <CodeBlock code={typeCode} title="Python" />
        <OutputBlock output="langchain_core.messages.ai.AIMessage" />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Think of <span className="font-mono text-white">AIMessage</span> as a
          fully-qualified "address" for a Python class inside the LangChain
          codebase. It can be broken down like this:
        </p>
        <ul className="grid list-disc list-inside gap-2 text-sm text-[color:var(--color-muted)]">
          <li>
            <span className="font-mono text-white">langchain_core</span> - a
            Python package
          </li>
          <li>
            <span className="font-mono text-white">messages</span> - a
            sub-package / module namespace inside langchain_core related to
            chat messages
          </li>
          <li>
            <span className="font-mono text-white">ai</span> - a module (a .py
            file) inside messages that defines AI-related message types
          </li>
          <li>
            <span className="font-mono text-white">AIMessage</span> - a class
            defined in that module
          </li>
        </ul>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          So, <span className="font-mono text-white">AIMessage</span> is a
          class, located at: package{" "}
          <span className="font-mono text-white">langchain_core</span>, then
          subpackage <span className="font-mono text-white">messages</span>,
          then module <span className="font-mono text-white">ai</span>, then
          class <span className="font-mono text-white">AIMessage</span>.
        </p>
      </section>

      <section id="core-package" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Confirming langchain_core
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          BUT... Didn&apos;t we only install the{" "}
          <span className="font-mono text-white">langchain</span> package, and
          not <span className="font-mono text-white">langchain_core</span>? Yes,
          but when we install{" "}
          <span className="font-mono text-white">langchain</span>, we
          implicitly install{" "}
          <span className="font-mono text-white">langchain-core</span>. We can
          prove this below:
        </p>
        <CodeBlock code={coreVersionCode} title="Python" />
        <OutputBlock output="1.2.7" />
      </section>

      <section id="model-dump" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Converting the response into a plain Python dictionary
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Now, let's take the AIMessage object returned by the model and convert
          it into a standard Python dictionary. LangChain message objects are
          built using Pydantic, which means they provide a{" "}
          <span className="font-mono text-white">.model_dump()</span> method.
          This method extracts all fields from the object into a plain data
          structure that is easier to inspect, log, or serialise.
        </p>
        <CodeBlock code={dumpCode} title="Python" />
        <OutputBlock output={dumpOutput} />
      </section>

      <section id="dict-output" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Understanding the dictionary output
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This is the same model response as before, but now represented as a
          plain Python dictionary rather than a LangChain object.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Key fields to notice:
        </p>
        <ul className="grid list-disc list-inside gap-2 text-sm text-[color:var(--color-muted)]">
          <li>
            <strong className="text-white">content</strong> -- the actual text
            generated by the model.
          </li>
          <li>
            <strong className="text-white">type</strong> -- indicates the role of
            the message. Here it is &quot;ai&quot;, meaning the response came
            from the model.
          </li>
          <li>
            <strong className="text-white">response_metadata</strong> --
            information about how the response was generated, including the
            model used, why the generation stopped (finish_reason), and token
            usage for the prompt and completion.
          </li>
          <li>
            <strong className="text-white">usage_metadata</strong> -- a
            simplified summary of input and output tokens, useful for tracking
            cost and performance.
          </li>
          <li>
            <strong className="text-white">tool_calls</strong> /{" "}
            <strong className="text-white">invalid_tool_calls</strong> -- empty
            in this example because no tools were used.
          </li>
        </ul>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          At this stage, there is nothing "LangChain-specific" about the data
          structure -- it is just ordinary Python data that can be logged,
          stored, or converted to JSON.
        </p>
      </section>

      <section id="extract-content" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Extracting the content
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          For example, we can extract the content using:
        </p>
        <CodeBlock code={contentCode} title="Python" />
        <OutputBlock output="'Hi there! How can I assist you today?'" />
      </section>

      <section id="pretty-print" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Pretty-printing the response
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Because <span className="font-mono text-white">response</span> is an
          AIMessage object (not a plain string), printing it directly can look
          noisy and hard to read. LangChain provides a built-in helper method,{" "}
          <span className="font-mono text-white">.pretty_print()</span>, which
          formats the message in a clean, human-readable way. This is especially
          useful in notebooks and live demos.
        </p>
        <CodeBlock code={prettyPrintCode} title="Python" />
        <OutputBlock output={prettyPrintOutput} />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          This output shows the assistant's message clearly, without any of the
          surrounding metadata. Behind the scenes, the AIMessage object still
          contains additional information such as token usage and model details
          -- .pretty_print() simply presents the most relevant part for humans:
          the generated text.
        </p>
      </section>

      <section id="content-direct" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Accessing the message content directly
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          If all you care about is the text generated by the model, you can
          access it directly using the{" "}
          <span className="font-mono text-white">content</span> attribute. This
          is often the most convenient option when building simple applications
          or when you want behaviour that feels like a traditional chatbot.
        </p>
        <CodeBlock code={contentPrintCode} title="Python" />
        <OutputBlock output="Hi there! How can I assist you today?" />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Here, the response is returned as a plain Python string. At this
          point, all of the additional metadata has been ignored, and we are
          working only with the assistant's text output. This is typically what
          you would pass into downstream application logic or display to an end
          user.
        </p>
      </section>
    </ArticleLayout>
  );
}
