
import subprocess
from pathlib import Path



def run_script_file( file_path: Path) -> str:
        try:
            return "Success"
        except Exception as e:
            arr =f"{e.__class__.__name__}: {e}" # ZeroDivisionError: division by zero
            return arr
        
if __name__ == "__main__":
    a =run_script_file(Path("tests/test_2.py"))
    print(a)