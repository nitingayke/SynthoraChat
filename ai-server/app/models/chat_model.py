from pydantic import BaseModel
from typing import List, Dict

class ChatRequest(BaseModel):
    thread_id: str
    messages: List[Dict]
    mode: str = "general_chat"  # general_chat, summarization, etc

class ChatResponse(BaseModel):
    reply: str
    metadata: Dict

