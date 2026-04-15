from fastapi import HTTPException
from pydantic import ValidationError
from langchain_core.messages import HumanMessage, SystemMessage

from app.llm.factory import get_base_llm
from app.llm.prompts import post_generation_prompt
from app.models.post_model import PostGenerateResponse


async def generate_post_content(input_text: str):
    try:
        llm = get_base_llm(temperature=0.7, is_streaming=False) 
        structured_llm = llm.with_structured_output(PostGenerateResponse)

        system_prompt = post_generation_prompt()

        response: PostGenerateResponse = await structured_llm.ainvoke([
            SystemMessage(content=system_prompt),
            HumanMessage(content=f"""
User Idea:
{input_text}

Think step-by-step:
1. Understand the intent
2. Expand clearly
3. Generate structured output
""")
        ])

        if not response or not response.title:
            raise HTTPException(
                status_code=500,
                detail="AI returned empty response"
            )

        data = response.model_dump()

        data["title"] = data["title"].strip()
        data["description"] = data["description"].strip()

        data["topics"] = list(set([t.strip() for t in data["topics"] if t.strip()]))[:10]

        return data
    
    except ValidationError:
        raise HTTPException(
            status_code=422,
            detail="Invalid structured response from AI model"
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Post generation failed: {str(e)}"
        )

        
