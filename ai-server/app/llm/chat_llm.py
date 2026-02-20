from fastapi import HTTPException
from google.api_core.exceptions import ResourceExhausted, GoogleAPIError
from asyncio import TimeoutError
from langchain_core.messages import HumanMessage, AIMessage
from app.models.chat_model import AIResponseModel
from app.agents.chat_agent import create_chat_agent
from app.llm.factory import get_base_llm

async def generate_chat_response(messages: list, mode: str, generate_title: bool = False):
    try:
        agent_executor = create_chat_agent(mode, generate_title)

        user_input = messages[-1]["content"]

        chat_history = []
        for msg in messages[:-1]:
            if msg["role"] == "user":
                chat_history.append(HumanMessage(content=msg["content"]))
            elif msg["role"] == "assistant":
                chat_history.append(AIMessage(content=msg["content"]))

        agent_result = await agent_executor.ainvoke({
            "input": user_input,
            "chat_history": chat_history
        })

        raw_output = agent_result["output"]

        formatter_llm = get_base_llm(temperature=0)

        structured_llm = formatter_llm.with_structured_output(AIResponseModel)

        structured_response = await structured_llm.ainvoke([
            {
                "role": "system",
                "content": "Convert the following response into structured format."
            },
            {
                "role": "user",
                "content": raw_output
            }
        ])

        return structured_response
    
    except ResourceExhausted:
        raise HTTPException(
            status_code=429,
            detail="AI quota exceeded. Please try again tomorrow."
        )
    
    except TimeoutError:
        raise HTTPException(
            status_code=504,
            detail="AI service timeout. Please try again"
        )
    
    except GoogleAPIError as e:
        raise HTTPException(
            status_code=502,
            detail=f"Upstream AI provider error: {str(e)}"
        )
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Unexpected AI error: {str(e)}"
        )