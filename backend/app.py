from agent import create_agent
from dotenv import load_dotenv
from fastapi import FastAPI,responses
from langserve import add_routes
from pydantic import BaseModel
from pathlib import Path
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware

# 自作モジュール
from manim_generator import generate_manim_animation,script_file_to_manim_animation,script_to_manim_animation

load_dotenv('./.env.local')

# path名を環境依存
workspace_path =Path("/workspaces/physiquest_animation_generator/backend/media/videos")


class Input(BaseModel):
    input: str


class Output(BaseModel):
    output: str
    
class Prompt(BaseModel):
    user_prompt: str
    video_id: str
    
class Script(BaseModel):
    script: str
    



app = FastAPI(
    title='LangChain Server',
    version='1.0',
)
origins=["http://localhost:3000"]

# CORS 設定を追加
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # すべてのオリジンを許可（必要な制限に応じて変更するべし）
    allow_credentials=True,
    allow_methods=["*"],  # すべてのHTTPメソッドを許可
    allow_headers=["*"],  # すべてのヘッダーを許可
)

agent = create_agent()

add_routes(
    app,
    agent.with_types(input_type=Input, output_type=Output),
)

@app.get('/api/get_video/{video_id}')
async def get_video(video_id: str):
    path =  workspace_path / video_id / "480p15" / "GeneratedScene.mp4"
    if not path.is_file(): 
        return responses.JSONResponse(status_code=404, content={'message': 'Video not found'})
    return responses.FileResponse(path, media_type="video/mp4", filename="GeneratedScene.mp4")

@app.post("/api/prompt",response_class=FileResponse)
async def prompt(prompt: Prompt):
    user_prompt = prompt.user_prompt
    video_id = prompt.video_id
    err = generate_manim_animation(user_prompt,video_id)
    path = workspace_path / video_id / "480p15" / "GeneratedScene.mp4"
    if err != "Success":
        return responses.JSONResponse(status_code=500, content={'message': err})
    return responses.FileResponse(path=path,media_type="video/mp4",filename="GeneratedScene.mp4")

@app.get("/api/script_to_animation/{script_file_id}",response_class=FileResponse)
async def get_script_to_animation(script_file_id: str):
    path = Path(f"tmp/{script_file_id}.py")
    if not path.is_file():
        return responses.JSONResponse(status_code=404, content={'message': 'Script not found'})
    err = script_file_to_manim_animation(path)
    animation_path = workspace_path / script_file_id / "480p15" / "GeneratedScene.mp4"
    if err != "Success":
        return responses.JSONResponse(status_code=404, content={'message': err})
    else:
        return responses.FileResponse(animation_path, media_type="video/mp4", filename="GeneratedScene.mp4")

@app.get("/api/get_script/{script_file_id}")
async def get_script(script_file_id:str):
    path = Path(f"tmp/{script_file_id}.py")
    if not path.is_file():
        return responses.JSONResponse(status_code=404, content={'message': 'Script not found'})
    # pythonnにおいてjSONでfileの内容を返す
    with open(path) as f:
        content = f.read()
    return responses.JSONResponse(content=content)



# 明らかにセキュリティリスクがあるので、本番環境では必ず仮想環境を用いること
@app.post("/api/post_code/{script_file_id}")
async def post_code(script_file_id:str,code:Script):
    error=script_to_manim_animation(code.script,script_file_id)
    if error != "Success":
        return responses.JSONResponse(status_code=500, content={'message': error})
    path = workspace_path / script_file_id / "480p15" / "GeneratedScene.mp4"
    return responses.FileResponse(path, media_type="video/mp4", filename="GeneratedScene.mp4")


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='localhost', port=8000)
