from fastapi import APIRouter
from app.models.summary_model import SummaryRequest, SummaryResponse
from app.services.summary_service import generate_answer_summary

router = APIRouter()

@router.post("/generate", response_model=SummaryResponse)
async def generate_summary(data: SummaryRequest):
    return await generate_answer_summary(data)