from app.llm.chat_llm import generate_chat_response
import time

async def handle_chat(thread_id: str, messages: list, mode: str):
    start_time = time.time()

    structured_response = await generate_chat_response(messages, mode)

    reply = structured_response.reply
    follow_ups = structured_response.follow_up_questions

    end_time = time.time()

    usage = getattr(structured_response, "usage_metadata", {})
    response_meta = getattr(structured_response, "response_metadata", {})

    metadata = {
        "thread_id": thread_id,
        "model_used": response_meta.get("model_name"),
        "prompt_tokens": usage.get("prompt_tokens"),
        "completion_tokens": usage.get("completion_tokens"),
        "total_tokens": usage.get("total_tokens"),
        "response_time": round(end_time - start_time, 3),
        "confidence_score": 0.95
    }

    return {
        "reply": reply,
        "follow_up_questions": follow_ups
    }, metadata