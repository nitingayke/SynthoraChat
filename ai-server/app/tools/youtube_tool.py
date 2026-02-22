from langchain.tools import tool
from youtube_transcript_api import YouTubeTranscriptApi, TranscriptsDisabled
from urllib.parse import urlparse, parse_qs

def extract_video_id(url: str) -> str | None:
    """
    Extracts video ID from standard YouTube URL.
    """
    parsed_url = urlparse(url)

    if "youtube.com" in parsed_url.netloc:
        query = parse_qs(parsed_url.query)
        return query.get("v", [None])[0]
    
    if "youtu.be" in parsed_url.netloc:
        return parsed_url.path.lstrip("/")
    
    return None

@tool
def get_youtube_transcript(video_url: str) -> str:
    """
    Use this tool when:
    - User provides a YouTube link
    - User asks for transcript
    - User asks to summarize a YouTube video
    - User asks to explain content of a YouTube video
    
    Input must be a full YouTube URL.
    """
    try:
        video_id = extract_video_id(video_url)

        if not video_id:
            return "Invalid YouTube URL."
        
        transcript_list = YouTubeTranscriptApi.get_transcript(video_id)

        transcript_text = " ".join([item["text"] for item in transcript_list]) 

        if not transcript_text:
            return "Transcript is empty."
        
        return transcript_text[:12000]
    
    except TranscriptsDisabled:
        return "Transcripts are disabled for this video."
    
    except Exception: 
        return "Failed to retrieve transcript."