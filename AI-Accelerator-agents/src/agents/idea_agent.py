from fastapi import FastAPI, Cookie
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import uuid
from idea_chatbot import GeminiBrainstormBot

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],
)

api_key = os.getenv("GOOGLE_API_KEY")
chatbot = GeminiBrainstormBot(api_key)

sessions = {}

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    session_id: str
    chatbot_response: str
    conversation: list
    end_conversation: bool

def get_or_create_session(session_id: str = None):
    if session_id is None or session_id not in sessions:
        session_id = str(uuid.uuid4())
        sessions[session_id] = {"history": []}
    return session_id

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest, session_id: str = Cookie(None)):
    """
    Chat with the bot. Sends user message and receives response.
    """
    print("route was called")
    session_id = get_or_create_session(session_id)
    result = chatbot.send_message(session_id, request.message)

    chatbot_response = result.get("response", "")

    if result.get("end_conversation"):
        chatbot_response = result.get("summary", chatbot_response)  # Get summary directly if available
        chatbot.clear_history(session_id)

    response_data = ChatResponse(
        session_id=session_id,
        chatbot_response=chatbot_response,
        conversation=chatbot.get_conversation_history(session_id),
        end_conversation=result.get("end_conversation", False)
    )

    return JSONResponse(content=response_data.dict(), headers={"Set-Cookie": f"session_id={session_id}; Path=/"})


@app.get("/reset")
async def reset_chat(session_id: str = Cookie(None)):
    """
    Reset the conversation for a session.
    """
    session_id = get_or_create_session(session_id)
    chatbot.clear_history(session_id)
    return JSONResponse(content={"message": "Conversation reset"}, headers={"Set-Cookie": f"session_id={session_id}; Path=/"})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("idea_agent:app", host="127.0.0.1", port=8000, reload=True)
