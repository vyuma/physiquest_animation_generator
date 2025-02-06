from agent import create_agent
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.responses import FileResponse
from langserve import add_routes
from pydantic import BaseModel

load_dotenv('./.env.local')


class Input(BaseModel):
    input: str


class Output(BaseModel):
    output: str


app = FastAPI(
    title='LangChain Server',
    version='1.0',
)

@app.get("/video")
async def return_video():
    example_path = "example/manim.mp4"
    return FileResponse(example_path)

agent = create_agent()

add_routes(
    app,
    agent.with_types(input_type=Input, output_type=Output),
)

if __name__ == '__main__':
    import uvicorn
    
    uvicorn.run(app, host='localhost', port=8000)
