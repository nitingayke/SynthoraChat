from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
from app.llm.factory import get_base_llm
from app.llm.prompts import build_system_prompt
from app.models.chat_model import AIResponseModel

async def generate_chat_response(messages: list, mode: str):
    llm = get_base_llm()

    structured_llm = llm.with_structured_output(AIResponseModel)

    formatted_messages = []

    system_prompt = build_system_prompt(mode)
    formatted_messages.append(SystemMessage(content=system_prompt))

    for msg in messages:
        role = msg.get("role")
        content = msg.get("content")

        if role == "user":
            formatted_messages.append(HumanMessage(content=content))
        elif role == "assistant":
            formatted_messages.append(AIMessage(content=content))

    response = await structured_llm.ainvoke(formatted_messages)

    return response