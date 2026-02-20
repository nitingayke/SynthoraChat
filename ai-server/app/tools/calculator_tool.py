from langchain.tools import tool

@tool
def calculate(expression: str) -> str:
    """Useful for performing mathematical calculations."""
    try:
        result = eval(expression)
        return str(result)
    except Exception:
        return "Invalid mathematical expression."