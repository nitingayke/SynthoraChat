from fastapi import APIRouter
from app.models.evaluation_model import EvaluationRequest, EvaluationResponse
from app.services.evaluation_service import evaluate_answer

router = APIRouter()

@router.post("/", response_model=EvaluationResponse)
async def evaluate(data: EvaluationRequest):
    return await evaluate_answer(data)