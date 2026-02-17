from fastapi import APIRouter
from app.models.chat_model import ChatRequest, ChatResponse
from app.services.chat_service import handle_chat

router = APIRouter()

@router.post("/", response_model=ChatResponse)
async def chat(data: ChatRequest):
    result, metadata = await handle_chat(
        thread_id=data.thread_id,
        messages=data.messages,
        mode=data.mode,
    )

    return ChatResponse(
        reply=result["reply"],
        follow_up_questions=result["follow_up_questions"],
        metadata=metadata
    )
