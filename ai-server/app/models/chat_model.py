from pydantic import BaseModel, Field
from typing import List, Dict, Optional

class ChatRequest(BaseModel):
    thread_id: str
    messages: List[Dict]
    mode: str = "general_chat"  # general_chat, summarization, etc

class ChatResponse(BaseModel):
    reply: str
    follow_up_questions: List[str]
    session_title: Optional[str] = None
    metadata: Dict

class AIResponseModel(BaseModel):
    reply: str = Field(description="Main answer to the user question")
    follow_up_questions: List[str] = Field(
        default_factory=list,
        description="Optional follow-up questions. Leave empty if not needed."
    )
    session_title: Optional[str] = Field(
        default=None,
        description="Optional session title generated for the conversation"
    )