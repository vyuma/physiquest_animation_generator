import os
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
from langchain.schema.runnable import RunnableSequence
from langchain.output_parsers import RegexParser
import re
from langchain_core.output_parsers import StrOutputParser
import subprocess 
from langchain_core.messages import HumanMessage
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
    - You must use following colors for shapes : BLUE,BLUE_A,BLUE_B,BLUE_C,BLUE_D,BLUE_E,DARKER_GRAY,DARKER_GREY,DARK_BLUE,DARK_BROWN,DARK_GRAY,DARK_GREY,GOLD,GOLD_A,GOLD_B,GOLD_C,GOLD_D,GOLD_E,GRAY,GRAY_A,GRAY_B,GRAY_BROWN,GRAY_C,GRAY_D,GRAY_E,GREEN,GREEN_A,GREEN_B,GREEN_C,GREEN_D,GREEN_E,GREY,GREY_A,GREY_B,GREY_BROWN,GREY_C,GREY_D,GREY_E,LIGHTER_GRAY,LIGHTER_GREY,LIGHT_BROWN,LIGHT_GRAY,LIGHT_GREY,LIGHT_PINK,LOGO_BLACK,LOGO_BLUE,LOGO_GREEN,LOGO_RED,LOGO_WHITE,MAROON,MAROON_A,MAROON_B,MAROON_C,MAROON_D,MAROON_E,ORANGE,PINK,PURE_BLUE,PURE_GREEN,PURE_RED,PURPLE,PURPLE_A,PURPLE_B,PURPLE_C,PURPLE_D,PURPLE_E,RED,RED_A,RED_B,RED_C,RED_D,RED_E,TEAL,TEAL_A,TEAL_B,TEAL_C,TEAL_D,TEAL_E,WHITE,YELLOW,YELLOW_A,YELLOW_B,YELLOW_C,YELLOW_D,YELLOW_E
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


def fix_manim_script_agent(script:str, error:str):
    # エラーメッセージに対して修正を行う。
    llm = ChatOpenAI(model='gpt-4o-mini', temperature=0, api_key=os.getenv('OPENAI_API_KEY'))
    # いったんllmに修正するためのinstructionを求める
    prompt1 = PromptTemplate(
        input_variables=["script","error"],
        template=""""
        You are a Manim script fixer. Based on the following error message, please provide a fix for the Manim script.
        You had to provide how to instruction to fix the script.
        Script : 
        {script}
        Error message: 
        {error}
        """
    )
    # 修正した
    prompt2 = PromptTemplate(
        input_variables=["instructions"],
        template="""
        You are an excellent assistant for generating Manim code.
        Please output executable Python code for Manim based on the following instructions and instructions.
        Do not include any unnecessary explanations other than the code because you are manim expert.
        Always use from manim import * and class GeneratedScene(Scene): to create the scene.
        
        Instructions:
        {instructions}
        
        Output Format:
        python```
        from manim import *
        class GeneratedScene(Scene):
            def construct(self):
                # fixed Manim Script 
                # ...
        ```
        """
    )
    
    parser = StrOutputParser()
    chain = RunnableSequence(
        first= prompt1 | llm,
        last = prompt2 | llm | parser
    )
    print("=== FIX SCRIPT1 ===")
    print("error type", type(error))
    print("script type", type(script))
    
    messages = {"script": script, "error": error}
    
    output = chain.invoke(messages)
    output = output.replace("```python", "").replace("```", "") 
    return output


def script_to_manim_animation(script:str, file_name:str):
    # tmpディレクトリが存在しない場合
    if not os.path.exists("tmp"):
        os.makedirs("tmp")
    with open(f"tmp/{file_name}.py", "w") as f:
        f.write(script)
    # 生成されたManimスクリプトを実行する
    try:
        result = subprocess.run(
                ["manim", "-pql", f"tmp/{file_name}.py", "GeneratedScene"],
                stdout = subprocess.PIPE,
                stderr = subprocess.PIPE,
                text=True,
                check=True)
        return "Success"
    except subprocess.CalledProcessError as e:
        error_message = e.stderr
        error_message = str(error_message)
        return error_message


def script_file_to_manim_animation(file_path:str):
    """
    input:
        file_path: str
    output:
        None or str (error message)
    
    スクリプトファイルが存在する場合にそのファイルをmanimにより実行して、生成する。
    """
    # 生成されたManimスクリプトを実行する
    try:
        reslut=subprocess.run(
                        ["manim", "-pql", f"{file_path}", "GeneratedScene"], 
                        stdout=subprocess.PIPE,  # 標準出力をキャプチャ
                        stderr=subprocess.PIPE,  # 標準エラーをキャプチャ
                        text=True,  # 出力を文字列として取得
                        check=True
                )
        return "Success"
    except subprocess.CalledProcessError as e:
        error_message = e.stderr  # 標準エラーの全文を取得
        return error_message




def generate_manim_animation(prompt:str, file_name:str):
    output = generate_manim_script(prompt)
    err=script_to_manim_animation(output, file_name)
    return err

def generate_manim_animation_with_error_handling(prompt:str,file_name:str):
    output = generate_manim_script(prompt)
    err = script_to_manim_animation(output, file_name)
    # スクリプトの修正回数
    count = 0 
    while err != "Success":
        output = fix_manim_script_agent(output, err)
        err = script_to_manim_animation(output, file_name)
        print(count)
        count += 1
        if count > 2:
            return "Error: Failed to fix the script"
    return err



if __name__ == '__main__':
    # output = generate_manim_script("Create a scene with a red circle")
    # print("=== FINAL OUTPUT ===")
    # print(output)
    # script_to_manim_animation(script=output, file_name="test_2")
    # err = generate_manim_animation_with_error_handling("ジョイサウンドゥール", "test_6")
    
    err = script_file_to_manim_animation("tmp/test_6.py")
    print(err)

