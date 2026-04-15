from pydantic import BaseModel, Field
from typing import List

class AnswerItem(BaseModel):
    content: str = Field(max_length=5000)

class SummaryRequest(BaseModel):
    title: str = Field(max_length=300)
    description: str = Field(max_length=7000)
    answers: List[AnswerItem] = Field(min_items=1, max_items=15)

class SummaryResponse(BaseModel):
    summary: str