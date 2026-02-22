from langchain.agents import create_tool_calling_agent, AgentExecutor
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from app.llm.factory import get_base_llm
from app.llm.prompts import build_system_prompt
from app.tools.registry import get_all_tools

def create_chat_agent(mode: str, generate_title: bool):

    llm = get_base_llm()

    tools = get_all_tools()

    prompt = ChatPromptTemplate.from_messages([
        ("system", build_system_prompt(mode, generate_title)),
        MessagesPlaceholder(variable_name="chat_history"),
        ("human", "{input}"),
        MessagesPlaceholder(variable_name="agent_scratchpad")
    ])

    try:
        agent = create_tool_calling_agent(llm, tools, prompt)
    except Exception as e:
        print(f"Error with create_tool_calling_agent: {e}")
        agent = create_tool_calling_agent(llm, tools, prompt)

    return AgentExecutor(
        agent=agent,
        tools=tools,
        verbose=False,
        return_intermediate_steps=False,
        handle_parsing_errors=True
    )