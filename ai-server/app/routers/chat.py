from fastapi import APIRouter
from app.models.chat_model import ChatRequest, ChatResponse
from app.services.chat_service import handle_chat, handle_chat_stream
from fastapi.responses import StreamingResponse
import json

router = APIRouter()

@router.post("/user-message", response_model=ChatResponse)
async def chat(data: ChatRequest):
    result, metadata = await handle_chat(
        thread_id=data.thread_id,
        messages=data.messages,
        mode=data.mode,
    )

    return ChatResponse(
        reply=result["reply"],
        follow_up_questions=result["follow_up_questions"],
        session_title=result["session_title"],
        metadata=metadata
    )

@router.post("/stream")
async def chat_stream(data: ChatRequest):

    async def generate():
        try:
            async for chunk in handle_chat_stream(
                thread_id=data.thread_id,
                messages=data.messages,
                mode=data.mode
            ):
                yield json.dumps(chunk) + "\n"
        
        except Exception as e:
            yield json.dumps({
                "type": "error",
                "message": str(e)
            }) + "\n"

    return StreamingResponse(generate(), media_type="application/json")