from pydantic import BaseModel, Field
from typing import List, Dict

class ChatRequest(BaseModel):
    thread_id: str
    messages: List[Dict]
    mode: str = "general_chat"  # general_chat, summarization, etc

class ChatResponse(BaseModel):
    reply: str
    follow_up_questions: list[str]
    metadata: Dict

class AIResponseModel(BaseModel):
    reply: str = Field(description="Main answer to the user question")
    follow_up_questions: List[str] = Field(
        default_factory=list,
        description="Optional follow-up questions. Leave empty if not needed."
    )