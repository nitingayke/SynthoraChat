from fastapi import HTTPException
from google.api_core.exceptions import ResourceExhausted, GoogleAPIError
from asyncio import TimeoutError
from langchain_core.messages import HumanMessage, AIMessage
from app.agents.chat_agent import create_chat_agent

async def generate_chat_response(messages: list, mode: str, generate_title: bool = False):
    try:
        agent_executor = create_chat_agent(mode, generate_title)

        chat_history = []
        for msg in messages:
            if msg["role"] == "user":
                chat_history.append(HumanMessage(content=msg["content"]))
            elif msg["role"] == "assistant":
                chat_history.append(AIMessage(content=msg["content"]))

        result = await agent_executor.ainvoke({
            "messages": chat_history,
        })

        structured = result["structured_response"]
        usage = None

        for msg in reversed(result["messages"]):
            if hasattr(msg, "usage_metadata") and msg.usage_metadata:
                usage = msg.usage_metadata
                break

        return structured, usage or {}
    
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