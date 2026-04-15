from fastapi import HTTPException
from langchain_core.messages import HumanMessage, SystemMessage
from pydantic import ValidationError

from app.llm.factory import get_base_llm
from app.llm.prompts import answer_summary_prompt
from app.models.summary_model import SummaryResponse

async def generate_answer_summary(data): 
    try:
        llm = get_base_llm(temperature=0.3, is_streaming=False)
        structured_llm = llm.with_structured_output(SummaryResponse)

        system_prompt = answer_summary_prompt()

        answers_text = "\n\n".join(
            [f"- {a.content}" for a in data.answers]
        )

        response: SummaryResponse = await structured_llm.ainvoke([
            SystemMessage(content=system_prompt),
            HumanMessage(content=f"""
Question:
{data.title}

Description:
{data.description}

Top Answers:
{answers_text}
""")
        ])

        if not response or not response.summary:
            raise HTTPException(
                status_code=500,
                detail="AI returned empty summary"
            )
        
        return response.model_dump()
    
    except ValidationError:
        raise HTTPException(
            status_code=422,
            detail="Invalid structured response from AI"
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Summary generation failed: {str(e)}"
        )