import requests
from langchain.tools import tool
from app.core.config import settings

@tool
def get_weather_data(city: str) -> str:
    """
    Fetches current weather data for a given city.
    Returns structured weather summary.
    """
    try:
        url = "https://api.weatherstack.com/current"
        params = {
            "access_key": settings.WEATHERSTACK_API_KEY,
            "query": city
        }

        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()

        if "error" in data:
            return f"Weather API Error: {data['error'].get('info', 'Unknown error')}"

        location = data.get("location", {})
        current = data.get("current", {})
        astro = current.get("astro", {})
        air_quality = current.get("air_quality", {})

        return (
            f"📍 Location: {location.get('name')}, {location.get('region')}, {location.get('country')}\n"
            f"🕒 Local Time: {location.get('localtime')}\n\n"
            f"🌡 Temperature: {current.get('temperature')}°C (Feels like {current.get('feelslike')}°C)\n"
            f"☁ Condition: {', '.join(current.get('weather_descriptions', []))}\n"
            f"💧 Humidity: {current.get('humidity')}%\n"
            f"🌬 Wind: {current.get('wind_speed')} km/h {current.get('wind_dir')}\n"
            f"🔆 UV Index: {current.get('uv_index')}\n"
            f"👁 Visibility: {current.get('visibility')} km\n"
            f"🌅 Sunrise: {astro.get('sunrise')} | 🌇 Sunset: {astro.get('sunset')}\n"
            f"🏭 Air Quality (PM2.5): {air_quality.get('pm2_5')}"
        )
    
    except requests.RequestException:
        return "Failed to fetch weather data due to network error."
    except Exception: 
        return "Unexpected error occurred while fetching weather data."