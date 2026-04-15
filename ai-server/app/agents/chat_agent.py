from langchain.agents import create_agent
from app.llm.factory import get_base_llm
from app.llm.prompts import build_system_prompt
from app.tools.registry import get_all_tools
from app.models.chat_model import AIResponseModel

def create_chat_agent(mode: str, generate_title: bool):
    system_prompt = build_system_prompt(mode, generate_title)
    llm = get_base_llm(is_streaming=True)
    tools = get_all_tools()

    agent = create_agent(
        model=llm,
        tools=tools,
        system_prompt=system_prompt,
        response_format=AIResponseModel
    )

    return agent
