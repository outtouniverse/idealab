from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware 
from pydantic import BaseModel
from google import genai
from google.genai.types import Tool, ToolConfig, GenerateContentConfig, GoogleSearch, FunctionCallingConfig
import os
import uvicorn
import json
from dotenv import load_dotenv
from config import (
    market_analysis_response_schema,
    market_analysis_system_instruction,
    idea_feasibility_response_schema,
)

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],
)

client = genai.Client(api_key="AIzaSyBYkv9KPhVmX4Ro6VHGEh_tmepFKBj7uWo")
model_id = "gemini-2.0-flash"

market_analysis_response_schema = market_analysis_response_schema
market_analysis_system_instruction = market_analysis_system_instruction

market_tool_config = ToolConfig(
    function_calling_config=FunctionCallingConfig(
        mode="ANY",
        allowed_function_names=["GoogleSearch"]
    )
)

market_config = GenerateContentConfig(
    system_instruction=market_analysis_system_instruction,
    tools=[Tool(google_search=GoogleSearch())],
    tool_config=market_tool_config,
    temperature=0.1,
    max_output_tokens=4000
)

# Idea Feasibility Configuration
idea_feasibility_response_schema = idea_feasibility_response_schema

idea_feasibility_config = GenerateContentConfig(
    system_instruction=(  # Adjusted system instruction format
        "First validate via web search:\n"
        "- Market size (2024)\n"
        "- Competitor features\n"
        "- Regulatory requirements\n"
        f"Then format as: {idea_feasibility_response_schema}"
    ),
    tools=[Tool(google_search=GoogleSearch())],
    temperature=0.1,
    max_output_tokens=4000,
)

# Request Models
class StartupIdea(BaseModel):
    idea: str

# Market Analysis Endpoint
@app.post("/analyze-market/")
async def analyze_market(startup_idea: StartupIdea):
    contents = [f"""Analyze market for: {startup_idea.idea}
    Include 2024 data with EXACT NUMBERS from:
    - Market research reports (2023-2024)
    - Competitor annual reports
    - Government economic data
    Output MUST CONTAIN NUMERIC VALUES for all fields
    "Cite sources from industry reports and competitor websites.",
    "Format response as JSON with sources."""]
    
    response = client.models.generate_content(
        model=model_id,
        contents=contents,
        config=market_config
    )

    if response:
        try:
            market_analysis = response.text
            json_text = extract_json(market_analysis)  # function to extract JSON
            market_analysis_data = json.loads(json_text)

            # Generate dynamic chart data based on analysis
            market_chart_data = generate_chart_data(market_analysis_data)  # New function to create chart data


            return {
                "market_analysis": market_analysis_data,
                "market_chart_data": market_chart_data
            }

            return market_analysis


        except json.JSONDecodeError as e:
            raise HTTPException(status_code=500, detail=f"JSON parsing error: {str(e)}")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error processing response: {str(e)}")
    else:
        raise HTTPException(status_code=500, detail="No response received")


def extract_json(response_text):
    # Check if the response contains a JSON block
    if "`":
        # Extract the JSON part of the response
        json_text = response_text.split("```json")[-1].split()
    else:
        json_text = response_text.strip()

    # Attempt to load the JSON data
    try:
        return json.loads(json_text)
    except json.JSONDecodeError as e:
        raise ValueError(f"Failed to decode JSON: {str(e)}")

def generate_chart_data(analysis_data):
    try:
        # Extract market size and growth data
        current_size = float(analysis_data["marketLandscape"]["currentSize"].split("$")[1].split("B")[0])
        growth_rate = float(analysis_data["marketLandscape"]["growthRate"].replace("%", "")) / 100
        
        # Generate growth data points
        growth_data = []
        for year in range(2024, 2034):
            size = current_size * (1 + growth_rate) ** (year - 2024)
            growth_data.append({"year": year, "size": round(size, 2)})
        
        # Extract segments data
        segments_data = [
            {"name": segment["name"], "value": float(segment["size"])} 
            for segment in analysis_data["segments"]
        ]
        
        # Extract competitive data
        competitive_data = [
            {"name": comp["name"], "share": float(comp["marketShare"])} 
            for comp in analysis_data["competitors"]
        ]
        
        # Extract regional data
        regional_data = [
            {"region": region["name"], "size": float(region["marketSize"])} 
            for region in analysis_data["regions"]
        ]

        return {
            "growthData": growth_data,
            "segmentsData": segments_data,
            "competitiveData": competitive_data,
            "regionalData": regional_data
        }
    except Exception as e:
        print(f"Error generating chart data: {e}")
        return None

# Idea Feasibility Endpoint
@app.post("/analyze-idea-feasibility/")
async def analyze_idea_feasibility(startup_idea: StartupIdea):
    contents = [
        "Analyze this startup idea with REQUIRED WEB SEARCH:",
        startup_idea.idea,
        "Cite sources from industry reports and competitor websites.",
        "Format response as JSON with sources."
    ]

    response = client.models.generate_content(
        model=model_id,
        contents=contents,
        config=idea_feasibility_config
    )

    if response:
        try:
            idea_feasibility = response.text
            if "```json" in idea_feasibility:
                json_text = idea_feasibility.split("```json")[-1].split("```")[0].strip()
            else:
                json_text = idea_feasibility.strip()

            idea_feasibility = json.loads(json_text)

            return {"idea_feasibility": idea_feasibility}

        except json.JSONDecodeError as e:
            raise HTTPException(status_code=500, detail=f"JSON parsing error: {str(e)}")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error processing response: {str(e)}")
    else:
        raise HTTPException(status_code=500, detail="No response received")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)
