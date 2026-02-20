from app.tools.calculator_tool import calculate
from app.tools.weather_data import get_weather_data
from app.tools.web_search_tool import web_search_duckduckgo

def get_all_tools():
    return [
        calculate,
        get_weather_data,
        web_search_duckduckgo
    ]