import os
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
from langchain.schema.runnable import RunnableSequence
from langchain.output_parsers import RegexParser
import re
from langchain_core.output_parsers import StrOutputParser
import subprocess 
# 環境変数の読み込み (.env ファイルから OPENAI_API_KEY を取得)
load_dotenv('./.env.local')





def generate_manim_script(prompt:str):
    llm = ChatOpenAI(model='gpt-4o-mini', temperature=0, api_key=os.getenv('OPENAI_API_KEY'))
    prompt_1 = PromptTemplate(
		input_variables=["user_prompt"],
        # 85トークン
		template="""
        You are a production planner for Manim. Based on the following user prompt, please summarize in bullet points what kind of animations and shapes should be created in Manim.
        User prompt: {user_prompt}
        Output format:
        Shapes and text to be drawn in Manim (including specifications such as color and size)
        Instructions on how the shapes or text should move (animations)
        The general flow of the scene
        """
    )
    prompt_2 = PromptTemplate(
    input_variables=["instructions"],
    # 147トークン
    template="""
    You are an excellent assistant for generating Manim code.
    Please output executable Python code for Manim based on the following instructions.
    Do not include any unnecessary explanations other than the code.
    Always use from manim import * and class GeneratedScene(Scene): to create the scene.
    
    Instructions:
    {instructions}
    Output Format:
    
    python```
    from manim import *
    class GeneratedScene(Scene):
        def construct(self):
            # Required Manim objects and animation calls
            # ...
    ```
    Notes:
    - Always use from manim import * and class GeneratedScene(Scene): format
    - Write all scene-related code inside def construct(self):
    - Do not include any text other than the code
    - You must not use black color for text or shapes
        """
    )
    # parserを作る
    # 正規表現のパターン（`python` で始まり ``` で終わるコードブロックを抽出）
    # 改良版の正規表現
    
    parser = StrOutputParser()
    chain = RunnableSequence(
        first= prompt_1 | llm,
        last = prompt_2 | llm | parser
    )
    output =chain.invoke({"user_prompt": prompt})
    # 余分な文字列を削除
    output = output.replace("```python", "")
    output = output.replace("```", "")
    return output


def script_to_manim_animation(script:str, file_name:str):
    # tmpディレクトリが存在しない場合
    if not os.path.exists("tmp"):
        os.makedirs("tmp")
    with open(f"tmp/{file_name}.py", "w") as f:
        f.write(script)
    # 生成されたManimスクリプトを実行する
    try:
        subprocess.run(["manim", "-pql", f"tmp/{file_name}.py", "GeneratedScene"], check=True)
        return "Success"
    except subprocess.CalledProcessError as e:
        return e.returncode

def script_file_to_manim_animation(file_path:str):
    # 生成されたManimスクリプトを実行する
    try:
        subprocess.run(["manim", "-pql", f"{file_path}", "GeneratedScene"], check=True)
        return "Success"
    except subprocess.CalledProcessError as e:
        return e.returncode


def generate_manim_animation(prompt:str, file_name:str):
    output = generate_manim_script(prompt)
    err=script_to_manim_animation(output, file_name)
    return err



if __name__ == '__main__':
    output = generate_manim_script("Create a scene with a red circle")
    print("=== FINAL OUTPUT ===")
    print(output)
    script_to_manim_animation(script=output, file_name="test_2")

