from google import genai
from google.genai.types import Tool, GenerateContentConfig, GoogleSearch
import os
from dotenv import load_dotenv
from config import idea_feasibility_response_schema

load_dotenv()

api_key = os.getenv("GOOGLE_API_KEY")
os.environ['GOOGLE_API_KEY'] = api_key

client = genai.Client()
model_id = "gemini-2.0-flash"

search_tool = Tool(google_search=GoogleSearch())

startup_idea = "Mental Heatlth habit tracker that is mainly designed for stressed adults"

response_schema = idea_feasibility_response_schema

# Configuration that actually works
config = GenerateContentConfig(
    system_instruction=(
        "First validate via web search:\n"
        "- Market size (2024)\n"
        "- Competitor features\n"
        "- Regulatory requirements\n"
        f"Then format as: {response_schema}"
    ),
    tools=[Tool(google_search=GoogleSearch())],
    temperature=0.1,
    max_output_tokens=4000,
)

# Specific search prompts in contents
contents = [
        "Analyze this startup idea with REQUIRED WEB SEARCH:",
        startup_idea,
        "Cite sources from industry reports and competitor websites.",
        "Format response as JSON with sources."
    ],

response = client.models.generate_content(
    model=model_id,
    contents=contents,
    config=config
)

structured_response = response.text
structured_response = structured_response.strip().replace('```json', '').replace('```', '').strip()
print("Feasibility Analysis:")
print(structured_response)

try:
    if response.candidates[0].grounding_metadata:
        print("Sources:")
        for chunk in response.candidates[0].grounding_metadata.grounding_chunks:
            print(f"- {chunk.web.title}: {chunk.web.uri}")
except AttributeError:
    print("No sources found")