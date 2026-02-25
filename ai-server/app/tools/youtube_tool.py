from langchain.tools import tool
from langchain_community.document_loaders import YoutubeLoader
from langchain_community.document_loaders.youtube import TranscriptFormat

@tool
def understand_youtube_video(url: str) -> str:
    """
    Use this tool when:
    - User provides a YouTube URL
    - User asks to summarize a video
    - User asks to understand video content

    Input must be full YouTube URL.
    """

    try:
        loader = YoutubeLoader.from_youtube_url(
            url,
            add_video_info=False,
            language=["en"],
            transcript_format=TranscriptFormat.TEXT
        )

        docs = loader.load()

        if not docs:
            return "No transcript found for this video."
        
        transcript = "\n\n".join(doc.page_content for doc in docs)
        metadata = docs[0].metadata

        title = metadata.get("title", "Unknown Title")

        return f"Video Title: {title}\n\nTranscript:\n{transcript[:20000]}"
    
    except Exception as e:
        return f"Failed to load video transcript: {str(e)}"