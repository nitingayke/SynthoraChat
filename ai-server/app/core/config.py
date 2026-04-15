from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings): 
    GEMINI_API_KEY: str
    GEMINI_MODEL_NAME: str = "gemini-1.5-flash"
    WEATHERSTACK_API_KEY: str
    TAVILY_API_KEY: str

    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "https://synthorachat.onrender.com"
    ]

    class Config: 
        env_file = ".env"

settings = Settings()