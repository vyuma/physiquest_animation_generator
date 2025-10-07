
import subprocess
from pathlib import Path



def run_script_file( file_path: Path) -> str:
        try:
            # INSERT_YOUR_CODE
            # manimを実行する
            # file_pathはPath型なのでstrに変換
            result = subprocess.run(
                ["manim", str(file_path)],
                capture_output=True,
                text=True,
                check=True
            )
            return result.stdout
            return "Success"
        except Exception as e:
            arr =f"{e.__class__.__name__}: {e}" # ZeroDivisionError: division by zero
            return arr
        
if __name__ == "__main__":
    a =run_script_file(Path("tests/test_2.py"))
    print(a)