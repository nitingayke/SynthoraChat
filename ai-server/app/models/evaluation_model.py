from pydantic import BaseModel, Field
from typing import List, Optional, Annotated

class EvaluationRequest(BaseModel):
    title: str
    description: str
    topics: List[str]
    answer: str

class EvaluationResponse(BaseModel):
    accuracy: Annotated[int, Field(
        ge=0, 
        le=100, 
        description="Score between 0 and 100"
    )]
    feedback: str = Field(
        description="Short explanation of evaluation"
    )
    improvements: Optional[List[str]] = Field(
        default=None, 
        max_length=5, 
        description="List of improvement suggestions"
    )