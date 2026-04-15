from pydantic import BaseModel, Field
from typing import List

class PostGenerateRequest(BaseModel):
    input_text: str = Field(min_length=3, max_length=5000)

class PostGenerateResponse(BaseModel):
    title: str = Field(max_length=300)
    description: str = Field(max_length=7000)
    topics: List[str] = Field(min_length=0, max_length=10)