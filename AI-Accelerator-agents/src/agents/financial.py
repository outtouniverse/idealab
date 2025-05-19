from google import genai
from google.genai.types import Tool, GenerateContentConfig, GoogleSearch
import os
from dotenv import load_dotenv
from config import financial_advisor_response_schema

load_dotenv()

api_key = os.getenv("GOOGLE_API_KEY")
os.environ['GOOGLE_API_KEY'] = api_key

client = genai.Client()
model_id = "gemini-2.0-flash"

search_tool = Tool(google_search=GoogleSearch())

startup_idea = "Mental Heatlth habit tracker that is mainly designed for stressed adults"
initial_capital_raised = "$50,000 from angel investors"
current_expenses = """
Founders' living expenses: $3,000/month
Business setup costs: $5,000 for legal fees and branding
Tools/software: $1,000/month
"""
fundraising_needs = """
Required amount: $150,000 for product development and initial marketing
Timeline: Raise funds in the next 6 months
Potential sources: Angel investors, seed-stage venture capital
"""

response_schema = financial_advisor_response_schema

config = GenerateContentConfig(
    system_instruction=( 
        "First, validate the feasibility of the financial situation of this early-stage startup idea:\n"
        "- How long can the startup survive with the current initial capital raised and expenses?\n"
        "- What is the best approach for fundraising in this case?\n"
        "- What are the key financial risks?\n"
        f"Then format as: {response_schema}"
    ),
    tools=[Tool(google_search=GoogleSearch())],
    temperature=0.1,
    max_output_tokens=4000,
)

contents = [
    "Analyze the following financial details of the startup idea and assess its feasibility with the required web search:",
    f"Startup Idea: {startup_idea}",
    f"Initial Capital Raised: {initial_capital_raised}",
    f"Current Expenses: {current_expenses}",
    f"Fundraising Needs: {fundraising_needs}",
    "Cite sources from industry reports, investor advice, or competitor financial advice.",
    "Format response as JSON with sources."
]

response = client.models.generate_content(
    model=model_id,
    contents=contents,
    config=config
)

structured_response = response.text
structured_response = structured_response.strip().replace('```json', '').replace('```', '').strip()

print("Financial Feasibility Analysis:")
print(structured_response)
