import ArticleLayout from "@/components/ArticleLayout";
import CodeBlock from "@/components/CodeBlock";
import InfoPanel from "@/components/InfoPanel";
import OutputBlock from "@/components/OutputBlock";
import RightRail from "@/components/RightRail";
import { langChainBeginnerTopics } from "@/lib/llmTopics";

const setupCode = `# Load environment variables
import os
from dotenv import load_dotenv

# Pull values from .env into the process env
load_dotenv()

# Import the chat model initializer
from langchain.chat_models import init_chat_model

# Guardrail: ensure the API key is present
if not os.getenv("OPENAI_API_KEY"):
    raise ValueError("OPENAI_API_KEY not found!")

# Initialize a lightweight chat model
model = init_chat_model(
    # Small, fast model for demos
    model="gpt-4o-mini"
)`;

const flowOutput = `input variables
  -> PromptTemplate / ChatPromptTemplate
  -> PromptValue (messages)
  -> ChatModel
  -> AIMessage
  -> OutputParser
  -> Python object (str / dict / BaseModel)`;

const strParserCode = `# Import the chat prompt template + string parser
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

# Build a simple prompt with roles
prompt = ChatPromptTemplate.from_messages(
    [
        # System message sets the behavior
        ("system", "You are a concise tutor. Reply in one sentence."),
        # Human message is the actual question
        ("human", "Explain {topic}."),
    ]
)

# Create the simplest parser (AIMessage -> str)
parser = StrOutputParser()

# Compose the pipeline: prompt -> model -> parser
chain = prompt | model | parser

# Run the chain with a topic variable
response = chain.invoke(
    {
        "topic": "data leakage"
    }
)

# Confirm the type and value
print(type(response))
print(response)`;

const strParserOutput = `<class 'str'>
Data leakage refers to the unintentional exposure of sensitive data to unauthorized individuals, often occurring during the data handling or processing stages in machine learning or analytics.`;

const jsonParserCode = `# Import the JSON parser
from langchain_core.output_parsers.json import JsonOutputParser

# Build a prompt that demands JSON only
prompt = ChatPromptTemplate.from_messages(
    [
        ("system", "Return ONLY valid JSON. No markdown, no extra text."),
        (
            "human",
            "Answer the question and also provide a confidence interval score.\\n"
            "Question: {question}\\n\\n"
            "Return JSON with keys: answer (string), confidence (number 0-1)."
        ),
    ]
)

# JSON parser attempts json.loads on the model output
parser = JsonOutputParser()

# Compose the pipeline and run it
chain = prompt | model | parser
response = chain.invoke(
    {
        "question": "What is overfitting?"
    }
)

# Inspect the parsed dict
print(type(response))
print(response)
print(response.keys())
print("\\nanswer =", response["answer"])
print("\\nconfidence =", response["confidence"])`;

const jsonParserOutput = `<class 'dict'>
{'answer': "Overfitting is a modeling error that occurs when a machine learning model learns the noise and fluctuations in the training data to the extent that it negatively impacts the model's performance on new data. This means that while the model may perform exceptionally well on the training dataset, it fails to generalize to unseen data, leading to poor predictive performance.", 'confidence': 0.95}
dict_keys(['answer', 'confidence'])
answer = Overfitting is a modeling error that occurs when a machine learning model learns the noise and fluctuations in the training data to the extent that it negatively impacts the model's performance on new data. This means that while the model may perform exceptionally well on the training dataset, it fails to generalize to unseen data, leading to poor predictive performance.
confidence = 0.95`;

const pydanticParserCode = `# Import Pydantic and the output parser
from pydantic import BaseModel, Field
from langchain_core.output_parsers import PydanticOutputParser

# Build a prompt that will include parser instructions
prompt = ChatPromptTemplate.from_messages(
    [
        ("system", "You are a careful tutor. Follow the formatting instructions exactly."),
        (
            "human",
            "Define the term.\\n"
            "Term: {term}\\n\\n"
            "Formatting instructions:\\n{format_instructions}"
        ),
    ]
)

# Define the schema we want back
class Definition(BaseModel):
    term: str = Field(description="The term being defined.")
    definition: str = Field(description="A clear definition in plain English.")
    example: str = Field(description="A short example.")

# Create the parser bound to the schema
parser = PydanticOutputParser(pydantic_object=Definition)

# Compose and run the chain
chain = prompt | model | parser
response = chain.invoke(
    {
        "term": "regularisation",
        # Use the parser-provided format instructions
        "format_instructions": parser.get_format_instructions()
    }
)

# Inspect the typed result
print(type(response))
print(response)
print("\\nterm =", response.term)
print("\\ndefinition =", response.definition)
print("\\nexample =", response.example)`;

const pydanticParserOutput = `<class '__main__.Definition'>
term='regularisation' definition='Regularisation is a technique used in machine learning and statistics to prevent overfitting by adding a penalty term to the loss function, which helps to simplify the model.' example='In linear regression, L2 regularisation (also known as Ridge regression) adds a penalty equal to the square of the magnitude of the coefficients to the loss function.'
term = regularisation
definition = Regularisation is a technique used in machine learning and statistics to prevent overfitting by adding a penalty term to the loss function, which helps to simplify the model.
example = In linear regression, L2 regularisation (also known as Ridge regression) adds a penalty equal to the square of the magnitude of the coefficients to the loss function.`;

export default function OutputParsersPage() {
  const tocItems: { id: string; label: string; level?: 1 | 2 }[] = [
    { id: "overview", label: "Overview" },
    { id: "mental-model", label: "Mental model" },
    { id: "setup", label: "Setup: model and environment" },
    { id: "str-parser", label: "Example 1: StrOutputParser" },
    { id: "json-parser", label: "Example 2: JsonOutputParser" },
    { id: "pydantic-parser", label: "Example 3: PydanticOutputParser" },
    { id: "key-takeaways", label: "Key takeaways" },
  ];

  return (
    <ArticleLayout
      eyebrow="LLMs - LangChain - Beginner"
      title="Output Parsers"
      description="Turn model text into reliable data with string, JSON, and Pydantic parsers."
      tocItems={tocItems}
      rightRail={
        <RightRail
          sections={[
            { title: "Within LangChain (Beginner)", links: langChainBeginnerTopics },
          ]}
          activeHref="/llms/langchain/beginner/output-parsers"
        />
      }
    >
      <InfoPanel id="overview" title="Overview" variant="intro">
        <p>
          In this notebook we learn{" "}
          <span className="font-mono inline-code">Output Parsers</span> in
          LangChain v1.
        </p>
        <p>You will see three parsers:</p>
        <ul className="grid list-disc list-inside gap-2 text-sm text-[color:var(--color-muted)]">
          <li>
            <span className="font-mono inline-code">StrOutputParser</span> -
            plain Python string
          </li>
          <li>
            <span className="font-mono inline-code">JsonOutputParser</span> -
            Python dict
          </li>
          <li>
            <span className="font-mono inline-code">PydanticOutputParser</span>{" "}
            - validated, typed objects
          </li>
        </ul>
        <p>
          Why this matters: LLMs generate text. Output parsers turn that text
          into reliable data your code can safely use.
        </p>
      </InfoPanel>

      <section id="mental-model" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Mental model (what is flowing through the chain)
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          LangChain v1 treats prompts, models, and parsers as Runnables. Each
          step transforms one object into another.
        </p>
        <OutputBlock output={flowOutput} title="Flow" />
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Each parser answers one question: "Given the model output, how do I
          turn this into something my code can safely use?"
        </p>
      </section>

      <section id="setup" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Setup: model and environment
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          We load the API key and initialize a small chat model for consistent
          examples.
        </p>
        <CodeBlock code={setupCode} title="Python" />
      </section>

      <section id="str-parser" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Example 1: StrOutputParser (plain strings)
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          When to use: When you want the model response as a plain Python string,
          not an <span className="font-mono inline-code">AIMessage</span> object.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Intuition (under the hood): The prompt formats variables into message
          objects (System/Human). The model returns an{" "}
          <span className="font-mono inline-code">AIMessage</span> (it is not a
          string yet).{" "}
          <span className="font-mono inline-code">StrOutputParser</span>{" "}
          extracts only the .content and returns a str. Think of it as the
          bridge from LLM world to normal Python.
        </p>
        <CodeBlock code={strParserCode} title="Python" />
        <OutputBlock output={strParserOutput} />
        <p className="text-sm text-[color:var(--color-muted)]">
          Output note: The result is a Python string, not an{" "}
          <span className="font-mono inline-code">AIMessage</span>.
        </p>
      </section>

      <section id="json-parser" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Example 2: JsonOutputParser (JSON -&gt; dict)
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          When to use: When you want a dictionary back (so you can do
          result["answer"]).
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Intuition (under the hood): The model still returns text. The parser
          attempts json.loads(...) on that text. If JSON is valid, you get a
          dict. If not, it fails loudly. This is the key shift from best-effort
          text to explicit success or failure.
        </p>
        <CodeBlock code={jsonParserCode} title="Python" />
        <OutputBlock output={jsonParserOutput} />
        <p className="text-sm text-[color:var(--color-muted)]">
          Output note: You should see a dict with keys like answer and
          confidence.
        </p>
      </section>

      <section id="pydantic-parser" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Example 3: PydanticOutputParser (typed objects)
        </h2>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          When to use: When you want validation and typed outputs.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          Intuition (under the hood): You define a schema with Pydantic. The
          parser generates format instructions for the model. The model returns
          JSON text. LangChain parses JSON and then validates it with Pydantic.
          If validation fails, the chain errors early. If it passes, you get a
          real object. This turns LLM output into validated domain objects,
          which is much safer for real apps.
        </p>
        <CodeBlock code={pydanticParserCode} title="Python" />
        <OutputBlock output={pydanticParserOutput} />
        <p className="text-sm text-[color:var(--color-muted)]">
          Output note: The result is a Definition instance with .term,
          .definition, .example.
        </p>
      </section>

      <section id="key-takeaways" className="scroll-mt-28 grid gap-4">
        <h2 className="text-2xl font-semibold text-white font-[var(--font-display)]">
          Key takeaways
        </h2>
        <ul className="grid list-disc list-inside gap-2 text-sm text-[color:var(--color-muted)]">
          <li>
            <span className="font-mono inline-code">StrOutputParser</span>: best
            for plain strings.
          </li>
          <li>
            <span className="font-mono inline-code">JsonOutputParser</span>:
            best for simple structured data as dicts.
          </li>
          <li>
            <span className="font-mono inline-code">PydanticOutputParser</span>:
            best for validated, typed outputs.
          </li>
        </ul>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          One clean teaching line: Output parsers turn an LLM from a text
          generator into a dependable software component.
        </p>
        <p className="text-base leading-7 text-[color:var(--color-muted)]">
          If you want the next lesson to flow from here, a great follow-up is:
          "What happens when parsing fails, and how do we recover?"
        </p>
      </section>
    </ArticleLayout>
  );
}
