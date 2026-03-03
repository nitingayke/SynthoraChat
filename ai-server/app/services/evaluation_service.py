from fastapi import HTTPException
from pydantic import ValidationError
from app.llm.factory import get_base_llm
from langchain_core.messages import HumanMessage, SystemMessage
from app.llm.prompts import answer_accuracy_prompt
from app.models.evaluation_model import EvaluationResponse

async def evaluate_answer(data):
    try:
        llm = get_base_llm(temperature=0)
        structured_llm = llm.with_structured_output(EvaluationResponse)

        system_prompt = answer_accuracy_prompt()
    
        response: EvaluationResponse = await structured_llm.ainvoke([
            SystemMessage(content=system_prompt),
            HumanMessage(content=f"""
Question Title: {data.title}
Question Description: {data.description}
Topics: {", ".join(data.topics)}
User Answer: {data.answer}
""")
        ])

        return response.model_dump()

    except ValidationError as e:
        raise HTTPException(
            status_code=422,
            detail="Invalid structured response from ai model."
        )
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"AI evalution failed: {str(e)}"
        )