from app.tools.calculator_tool import calculate
from app.tools.weather_data import get_weather_data
from app.tools.web_search_tool import web_search_duckduckgo
from app.tools.youtube_tool import get_youtube_transcript

def get_all_tools():
    return [
        calculate,
        get_weather_data,
        web_search_duckduckgo,
        get_youtube_transcript,
    ]