import requests
from ddgs import DDGS
from langchain.tools import tool

@tool
def web_search_duckduckgo(query: str) -> str:
    """
    Use this tool for:
    - Latest news
    - Current events
    - Live information
    - Time-sensitive queries
    
    Always use precise search queries like:
    - "latest breaking news India today"
    - "India headlines today"
    - "current political news India"
    Avoid generic phrases like 'most popular news'.
    """
    try:
        results_list = []

        with DDGS() as ddgs:
            results = ddgs.text(query, max_results=5)

            for idx, result in enumerate(results, 1):
                results_list.append(
                    f"{idx}. {result.get('title')}\n"
                    f"  {result.get('body')}\n"
                    f"  Source: {result.get('href')}\n"
                )

        if not results_list:
            return "No relevant results found."
        
        return "\n".join(results_list)
    
    except Exception:
        return "Unexpected error occurred while performing DuckDuckGo search."

# @tool 
# def web_search_tavily(query: str) -> str:
#     """
#     Performs web search using Tavily API.
#     Recommended for production and real-time factual queries.
#     """

#     try:
#         url = "https://api.tavily.com/search"

#         payload = {
#             "api_key": settings.TAVILY_API_KEY,
#             "query": query,
#             "search_depth": "advanced",
#             "max_results": 5
#         }

#         response = requests.post(url, json=payload, timeout=10)
#         response.raise_for_status()
#         data = response.json()

#         results = data.get("results", [])

#         if not results:
#             return "No relevant results found."
        
#         formatted_results = []

#         for idx, result in enumerate(results, 1):
#             formatted_results.append(
#                 f"{idx}. {result.get('title')}\n"
#                 f"   {result.get('content')}\n"
#                 f"   Source: {result.get('url')}\n"
#             )

#         return "\n".join(formatted_results)
    
#     except requests.RequestException:
#         return "Failed to fetch search results due to network error."
#     except Exception:
#         return "Unexpected error occurred while performing Tavily search."
            