from fastapi import FastAPI
from app.routers import chat

app = FastAPI(title="Synthora:GenAI Service")

app.include_router(chat.router, prefix="/chat")