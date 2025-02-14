import os
import subprocess
from pathlib import Path
from dotenv import load_dotenv
import tomllib
from langdetect import detect
from langchain_openai import ChatOpenAI
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from langchain.schema.runnable import RunnableSequence
from langchain_core.output_parsers import StrOutputParser
import deepl

load_dotenv('./.env.local')

class ManimAnimationService:
    def __init__(self):
        with open("./prompts.toml", 'rb') as f:
            self.prompts = tomllib.load(f)
        self.think_llm = self._load_llm("gemini-2.0-flash-thinking-exp")
        self.pro_llm   = self._load_llm("gemini-2.0-pro-exp")
        self.flash_llm = self._load_llm("gemini-2.0-flash")
        self.lite_llm = self._load_llm("gemini-2.0-flash-lite-preview-02-05")
        self.translator = deepl.Translator(os.getenv('DEEPL_API_KEY'))
    
    def _load_llm(self, model_type: str):
        if os.getenv('OPENAI_API_KEY'):
            return ChatOpenAI(model='gpt-4o-mini', temperature=0)
        return ChatGoogleGenerativeAI(model=model_type, google_api_key=os.getenv('GEMINI_API_KEY'))

    def generate_script(self, user_prompt: str) -> str:
        is_translation = False
        if is_translation == True:
            lang, user_prompt = self._llm_en_translation(user_prompt)
        prompt1 = PromptTemplate(
            input_variables=["user_prompt"],
            template=self.prompts["chain"]["prompt1"]
        )
        prompt2 = PromptTemplate(
            input_variables=["instructions"],
            template=self.prompts["chain"]["prompt2"]
        )
        parser = StrOutputParser()
        chain = RunnableSequence(
            first= prompt1 | self.think_llm,
            last = prompt2 | self.pro_llm | parser
        )
        
        output = chain.invoke({"user_prompt": user_prompt})
        return output.replace("```python", "").replace("```", "")
    
    def run_script(self, file_name: str, script: str) -> str:
        if not os.path.exists("tmp"):
            os.makedirs("tmp")
        tmp_path = Path(f"tmp/{file_name}.py")
        with open(tmp_path, "w") as f:
            f.write(script)
        try:
            subprocess.run(
                ["manim", "-pql", str(tmp_path), "GeneratedScene"],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True, check=True
            )
            return "Success"
        except subprocess.CalledProcessError as e:
            return e.stderr
    
    def fix_script(self, script: str, error: str, file_name: str) -> str:
        prompt1 = PromptTemplate(
            input_variables=["script", "error"],
            template=self.prompts["error"]["prompt1"]
        )
        prompt2 = PromptTemplate(
            input_variables=["instructions"],
            template=self.prompts["error"]["prompt2"]
        )
        parser = StrOutputParser()
        chain = RunnableSequence(
            first= prompt1 | self.think_llm,
            last = prompt2 | self.think_llm | parser
        )
        messages = {"script": script, "error": error}
        output = chain.invoke(messages)
        return output.replace("```python", "").replace("```", "")

    def generate_animation_with_error_handling(self, user_prompt: str, file_name: str) -> str:
        script = self.generate_script(user_prompt)
        err = self.run_script(file_name, script)
        count = 0
        limit_count = 1
        while err != "Success" and count < limit_count:
            script = self.fix_script(script, err, file_name)
            err = self.run_script(file_name, script)
            count += 1
        return err

    

    def run_script_file(self, file_path: Path) -> str:
        try:
            subprocess.run(
                ["manim", "-pql", str(file_path), "GeneratedScene"],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True, check=True
            )
            return "Success"
        except subprocess.CalledProcessError as e:
            return e.stderr
    
    def generate_detail_prompt(self,user_prompt:str,instruction_type:int)->str:
        # 入力された言語を判定する
        lang,user_prompt = self._llm_en_translation(user_prompt)
        print(lang,user_prompt)
        
        prompt = PromptTemplate(
            input_variables=["instructions","user_prompt"],
            template=self.prompts["detailed_prompt"]["detailed_prompt"]
        )
        parser = StrOutputParser()
        chain = RunnableSequence(
            first= prompt | self.flash_llm,
            last = parser
        )
        instructions = self.instruction_type_to_str(instruction_type)
        output = chain.invoke({"instructions":instructions,"user_prompt":user_prompt})
        # もとに翻訳
        output = self._llm_reverse_translate(lang,output)
        return output
    
    def _en_ja_translate(self,user_prompt:str)->str:
        # englishから日本語への翻訳
        prompt = PromptTemplate(
            input_variables=["user_prompt"],
            template=self.prompts["translate"]["en_to_ja"]
        )
        parser = StrOutputParser()
        chain = RunnableSequence(
            first= prompt | self.lite_llm,
            last = parser
        )
        output = chain.invoke({"user_prompt":user_prompt})
        
        return output

    def _en_ja_translate_deepl(self,user_prompt:str)->str:
        lang_ja = 'JA'
        results = self.translator.translate_text(user_prompt, target_lang=lang_ja)
        return results.text

    def _ja_en_translate_deepl(self,user_prompt:str)->str:
        lang_en = 'EN-US'
        results = self.translator.translate_text(user_prompt, target_lang=lang_en)
        return results.text

    def _ja_en_translate(self,user_prompt:str)->str:
        # 日本語から英語への翻訳
        prompt = PromptTemplate(
            input_variables=["user_prompt"],
            template=self.prompts["translate"]["ja_to_en"]
        )
        parser = StrOutputParser()
        chain = RunnableSequence(
            first= prompt | self.lite_llm,
            last = parser
        )
        output = chain.invoke({"user_prompt":user_prompt})
        
        return output
    
    def _llm_en_translation(self,user_prompt:str)->tuple[str,str]:
        """
        input: user_prompt
            user_prompt : str
                入力された文章
        output: lang,user_prompt : tuple[str,str]
            lang : str
                入力された言語
            user_prompt : str
                翻訳後の文章 日本語なら英語に、英語はそのまま返される
        """
        # 翻訳
        lang = detect(user_prompt)
        if lang == "ja":
            user_prompt = self._ja_en_translate_deepl(user_prompt)
            return lang,user_prompt
        else:
            return lang,user_prompt
    
    def _llm_reverse_translate(self,original_lang:str,prompt)->str:
        """
        input: prompt,lang
            original_lang : str
                    もともとのユーザの言語
            prompt : str
                入力された文章
        output: str
            もともとのユーザーの翻訳後の文章
        """
        
        now_lang = detect(prompt)
        
        if now_lang != original_lang:
            if original_lang == "ja":
                translate_error = self._en_ja_translate_deepl(prompt)
            else:
                translate_error = self._ja_en_translate_deepl(prompt)
        else:
            translate_error = prompt
        return translate_error
    
    
    def instruction_type_to_str(self,instruction_type:int)->str:
        # instruction_typeを日本語に変換
        if instruction_type==0:
            return self.prompts["detailed_prompt"]["animation_instructions"]
        elif instruction_type==1:
            return self.prompts["detailed_prompt"]["graph_instructions"]
        elif instruction_type==2:
            return self.prompts["detailed_prompt"]["formula_transformation_instructions"]
        elif instruction_type==3:
            return self.prompts["detailed_prompt"]["shape_instructions"]
        else:
            return Exception("instruction_typeが不正です")
        
        
    
    # ここから下は軽量化のための関数
    
    # 可能ならこここそストリーミングを行いたい
    def generate_instruction(self, user_prompt: str) -> str:
        prompt = PromptTemplate(
            input_variables=["user_prompt"],
            template=self.prompts["instruction"]["teacher_prompt"]
        )
        original_lang = detect(user_prompt)
        if original_lang == "ja":
            user_prompt = self._en_ja_translate(user_prompt)
        parser = StrOutputParser()
        chain = prompt | self.flash_llm | parser
        output = chain.invoke({"user_prompt": user_prompt})
        
        original_lang_output = self._llm_reverse_translate(original_lang,output)
        
        return output, original_lang_output
    
    
    
    

if __name__ == "__main__":
    describe = ManimAnimationService()
    print(describe.generate_detail_prompt("半径3の円を書いてください",1))
    