from fastapi import APIRouter, HTTPException
from app.models.post_model import PostGenerateRequest, PostGenerateResponse
from app.services.post_service import generate_post_content

router = APIRouter()

@router.post("/generate", response_model=PostGenerateResponse)
async def generate_post(data: PostGenerateRequest):

    cleaned_input = data.input_text.strip()

    if not cleaned_input:
        raise HTTPException(status_code=400, detail="Input cannot be empty")
    
    if len(cleaned_input) < 5:
        raise HTTPException(
            status_code=400,
            detail="Input too short to generate meaningful content"
        )

    result = await generate_post_content(cleaned_input)

    return result