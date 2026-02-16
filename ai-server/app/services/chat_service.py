from app.llm.chat_llm import generate_chat_response
import time

async def handle_chat(thread_id: str, messages: list, mode: str):
    start_time = time.time()

    reply = await generate_chat_response(messages, mode)

    end_time = time.time()

    usage = reply.usage_metadata if hasattr(reply, "usage_metadata") else {}
    response_meta = reply.response_metadata if hasattr(reply, "response_metadata") else {}

    metadata = {
        "thread_id": thread_id,
        "model_used": response_meta.get("model_name"),
        "prompt_tokens": usage.get("prompt_tokens"),
        "completion_tokens": usage.get("completion_tokens"),
        "total_tokens": usage.get("total_tokens"),
        "response_time": round(end_time - start_time, 3),
        "confidence_score": 0.95
    }

    return reply.content, metadata