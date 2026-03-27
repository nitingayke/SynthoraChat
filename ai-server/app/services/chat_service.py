import time
from fastapi import HTTPException
from app.llm.chat_llm import generate_chat_response, generate_chat_response_stream

async def handle_chat(thread_id: str, messages: list, mode: str):
    if not messages:
        raise HTTPException(status_code=400, detail="Messages cannot be empty")
    
    start_time = time.time()

    is_first_message = len(messages) == 1

    structured_response, usage = await generate_chat_response(messages, mode, generate_title=is_first_message)

    if not structured_response or not structured_response.reply:
        raise HTTPException(
            status_code=500,
            detail="Invalid LLM structured output"
        )

    reply = structured_response.reply
    follow_ups = structured_response.follow_up_questions
    session_title = structured_response.session_title

    end_time = time.time()

    metadata = {
        "thread_id": thread_id,
        "model_used": "gemini-2.5-flash",
        "total_tokens": usage.get("total_tokens"),
        "response_time": round(end_time - start_time),
    }

    return {
        "reply": reply,
        "follow_up_questions": follow_ups,
        "session_title": session_title
    }, metadata


async def handle_chat_stream(thread_id: str, messages: list, mode: str):
    
    start_time = time.time()
    is_first_message = len(messages) == 1

    async for event in generate_chat_response_stream(messages, mode, is_first_message):
        
        yield event

    end_time = time.time()

    yield {
        "type": "metadata",
        "data": {
            "thread_id": thread_id,
            "response_time": round(end_time - start_time)
        }
    }