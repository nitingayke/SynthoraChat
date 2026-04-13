from fastapi import HTTPException
from google.api_core.exceptions import ResourceExhausted, GoogleAPIError, ServiceUnavailable
from asyncio import TimeoutError
import asyncio

from langchain_core.messages import HumanMessage, AIMessage
from app.agents.chat_agent import create_chat_agent

async def generate_chat_response(messages: list, mode: str, generate_title: bool = False):
    
    if not messages:
        raise HTTPException(status_code=400, detail="Messages cannot be empty")
    
    chat_history = [
        HumanMessage(content=msg["content"]) if msg["role"] == "user"
        else AIMessage(content=msg["content"])
        for msg in messages
    ]

    retries = 3

    for attempt in range(retries):
        try:
            agent_executor = create_chat_agent(mode, generate_title)

            result = await agent_executor.ainvoke({
                "messages": chat_history,
            })

            structured = result["structured_response"]

            if not structured or not structured.reply:
                raise HTTPException(
                    status_code=500,
                    detail="Invalid LLM structured output"
                )
            
            usage = next(
                (
                    msg.usage_metadata
                    for msg in reversed(result["messages"])
                    if hasattr(msg, "usage_metadata") and msg.usage_metadata
                ),
                {}
            )

            return structured, usage
        
        except ResourceExhausted:
            raise HTTPException(
                status_code=429,
                detail="AI quota exceeded. Please try again tomorrow."
            )
        
        except ServiceUnavailable:
            if attempt < retries - 1:
                await asyncio.sleep(2 ** attempt)
                continue
            raise HTTPException(
                status_code=503,
                detail="AI service is busy. Please try again in a few seconds."
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
        

async def generate_chat_response_stream(messages, mode, generate_title):

    chat_history = [
        HumanMessage(content=msg["content"]) if msg["role"] == "user"
        else AIMessage(content=msg["content"])
        for msg in messages
    ]

    retries = 3

    for attempt in range(retries):
        try:
            agent_executor = create_chat_agent(mode, generate_title)

            full_text = ""

            async for step in agent_executor.astream({
                "messages": chat_history
            }):
                if "output" in step:
                    token = step["output"]
                    full_text += token

                    yield {
                        "type": "token",
                        "content": token
                    }

            yield {
                "type": "done",
                "full_text": full_text
            }

            return

        except ServiceUnavailable:
            if attempt < retries - 1:
                await asyncio.sleep(2 ** attempt)
                continue

            yield {
                "type": "error",
                "message": "AI service is busy. Please try again."
            }
            return

        except Exception as e:
            yield {
                "type": "error",
                "message": str(e)
            }
            return