from langchain_google_genai import ChatGoogleGenerativeAI
from app.core.config import settings

def get_base_llm(temperature: float = 0.5, is_streaming: bool = False):
    return ChatGoogleGenerativeAI(
        model=settings.GEMINI_MODEL_NAME,
        google_api_key=settings.GEMINI_API_KEY,
        temperature=temperature,
        streaming=is_streaming,
    )