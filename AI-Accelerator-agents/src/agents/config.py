market_analysis_response_schema = {
    "market_analysis": {
        "market_overview": {
            "total_market_size": {
                "value": "numeric",
                "year": "numeric",
                "unit": "string",
                "source": "string"
            },
            "total_market_size_projected": {
                "value": "numeric",
                "year": "numeric",
                "unit": "string",
                "source": "string"
            },
            "market_growth_rate": {
                "annual_growth_rate": "numeric",
                "forecast_period": {
                    "start_year": "numeric",
                    "end_year": "numeric"
                },
                "source": "string"
            },
            "market_segments": [
                {
                    "segment_name": "string",
                    "segment_size": "numeric",
                    "unit": "string",
                    "source": "string"
                }
            ]
        },
        "competitive_landscape": {
            "total_competitors": "numeric",
            "market_share_distribution": [
                {
                    "competitor_name": "string",
                    "market_share": "numeric",
                    "unit": "string",
                    "source": "string"
                }
            ]
        },
        "customer_analysis": {
            "target_customer_segments": [
                {
                    "segment_name": "string",
                    "size": "numeric",
                    "unit": "string",
                    "source": "string"
                }
            ],
            "customer_acquisition_cost": "numeric",
            "customer_lifetime_value": "numeric"
        },
        "regional_analysis": {
            "regions": [
                {
                    "region": "string",
                    "market_size": "numeric",
                    "unit": "string",
                    "source": "string"
                }
            ]
        }
  }, 
}

market_analysis_system_instruction = f"""You are a professional market analyst. Follow these steps STRICTLY:

1. **PERFORM WEB SEARCH** to find EXACT NUMERIC VALUES for:
   - Current market size (2024)
   - 10-year market projection (2033)
   - Market growth rate (CAGR)
   - Competitor market shares
   - Customer segmentation data
   - Regional market data

2. **FORMAT NUMBERS AS**:
   - Billions as 50.0 (for $50B)
   - Percentages as 25.5 (for 25.5%)
   - Use consistent units (e.g., USD, %)

3. **HANDLE MISSING DATA**:
   - If a specific data point is unavailable, perform an additional web search to find it.
   - If still unavailable, replace the field with an ESTIMATE based on industry trends or similar markets.
   - NEVER leave a field as null or empty.

4. **CITE SOURCES**:
   - Use [number] notation to reference sources from grounding metadata.
   - Ensure every data point has a valid source.

5. **STRICT JSON FORMAT**:
   - Follow this schema EXACTLY: {market_analysis_response_schema}
   - Ensure ALL fields are populated with numeric values or estimates.

6. **VALIDATE DATA**:
   - Cross-check all numbers for consistency (e.g., market size vs. segment sizes).
   - Ensure growth rates align with market projections.

7. **FALLBACK RULES**:
   - If competitor market shares are unavailable, estimate based on industry reports.
   - If customer segmentation data is missing, use demographic trends from similar markets.
   - If regional data is unavailable, distribute total market size proportionally.

8. **OUTPUT FORMAT**:
   - Provide the analysis in JSON format.
   - Include a summary of key insights at the beginning.
   - Ensure ALL fields are populated with numeric values or estimates.
"""

idea_feasibility_response_schema = {
  "startup_idea": {
    "title": "Startup Idea Title",
    "description": "Brief description of the startup idea."
  },
  "feasibility": {
    "technical_feasibility": {
      "required_technologies": [
        {
          "technology": "string",
          "description": "string"
        }
      ],
      "development_challenges": [
        {
          "challenge": "string",
          "solution": "string"
        }
      ],
      "technology_stack": [
        {
          "component": "string",
          "description": "string"
        }
      ],
      "integration_with_existing_systems": {
        "is_integration_required": "boolean",
        "details": "string"
      },
      "data_requirements": {
        "data_sources": ["string"],
        "data_storage": "string",
        "privacy_compliance": "string"
      }
    },
    "regulatory_feasibility": {
        "regulations_to_consider": ["string"],
        "licenses_required": ["string"]
      },
    "overall_feasibility_score": "A score or rating (e.g., 1-100) indicating the overall feasibility of the idea."
  },
  "scope": {
    "problem_statement": "Detailed description of the problem the startup aims to solve.",
    "solution": "Detailed description of the proposed solution.",
    "key_features": [
      "Feature 1",
      "Feature 2",
      "Feature 3"
    ],
    "potential_impact": "Description of the potential impact or value the startup could create."
  },
  "target_demographics": {
    "age_range": "e.g., 18-35",
    "gender": "e.g., Male, Female, Non-binary",
    "income_level": "e.g., Middle-income, High-income",
    "geographic_location": "e.g., Urban, Suburban, Rural",
    "psychographic_details": "e.g., Tech-savvy, Environmentally conscious",
    "market_size_estimate": "Estimated number of potential customers or users."
  },
  "monetization_strategies": [
    {
      "strategy_name": "e.g., Subscription Model",
      "description": "Description of how this monetization strategy would work.",
      "potential_revenue_streams": [
        "e.g., Monthly subscription fees",
        "e.g., Annual subscription fees"
      ],
      "pros": "Advantages of this strategy.",
      "cons": "Disadvantages of this strategy."
    },
    {
      "strategy_name": "e.g., Freemium Model",
      "description": "Description of how this monetization strategy would work.",
      "potential_revenue_streams": [
        "e.g., Premium features",
        "e.g., In-app purchases"
      ],
      "pros": "Advantages of this strategy.",
      "cons": "Disadvantages of this strategy."
    }
  ],
  "competitive_analysis": {
    "direct_competitors": [
      {
        "competitor_name": "Competitor 1",
        "strengths": "Strengths of Competitor 1.",
        "weaknesses": "Weaknesses of Competitor 1."
      },
      {
        "competitor_name": "Competitor 2",
        "strengths": "Strengths of Competitor 2.",
        "weaknesses": "Weaknesses of Competitor 2."
      }
    ],
    "indirect_competitors": [
      {
        "competitor_name": "Competitor 3",
        "strengths": "Strengths of Competitor 3.",
        "weaknesses": "Weaknesses of Competitor 3."
      }
    ],
    "competitive_advantage": "Description of how the startup idea stands out from competitors."
  },
  "risks_and_challenges": [
    {
      "risk_name": "e.g., Market Risk",
      "description": "Description of the risk.",
      "mitigation_strategy": "How the startup plans to mitigate this risk."
    },
    {
      "risk_name": "e.g., Technological Risk",
      "description": "Description of the risk.",
      "mitigation_strategy": "How the startup plans to mitigate this risk."
    }
  ],
}

financial_advisor_response_schema = {
  "feasibility_analysis": {
    "runway": {
      "time_left_months": "integer",  
      "burn_rate": "float",          
      "cash_reserves": "float"       
    },
    "fundraising_advice": {
      "recommended_funding_amount": "float", 
      "fundraising_strategy": "string",       
      "timeline_for_funding": "string"        
    },
    "financial_risks": [
      {
        "risk_type": "string",  
        "risk_description": "string",  
        "mitigation_strategy": "string"  
      }
    ],
    "sources": [
      {
        "title": "string",  
        "url": "string"     
      }
    ]
  }
}
