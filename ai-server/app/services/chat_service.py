import time
from fastapi import HTTPException
from app.llm.chat_llm import generate_chat_response

async def handle_chat(thread_id: str, messages: list, mode: str):
    if not messages:
        raise ValueError("Messages cannot be empty")
    
    start_time = time.time()

    is_first_message = len(messages) == 1
    structured_response = await generate_chat_response(messages, mode, generate_title=is_first_message)

    if not structured_response or not hasattr(structured_response, "reply"):
        raise HTTPException(
            status_code=500,
            detail="Invalid LLM structured output"
        )

    reply = structured_response.reply
    follow_ups = structured_response.follow_up_questions
    session_title = structured_response.session_title

    end_time = time.time()

    usage = getattr(structured_response, "usage_metadata", {})
    response_meta = getattr(structured_response, "response_metadata", {})

    metadata = {
        "thread_id": thread_id,
        "model_used": response_meta.get("model_name"),
        "total_tokens": usage.get("total_tokens"),
        "response_time": round(end_time - start_time, 3),
    }

    return {
        "reply": reply,
        "follow_up_questions": follow_ups,
        "session_title": session_title
    }, metadata