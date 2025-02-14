from pathlib import Path
import importlib
import os 


def run_script_file( file_path: Path) -> str:
        # 絶対パスに変換
        abs_path = os.path.abspath(file_path)
        module_name = "ManimGeneratedScene"
        # モジュールの仕様を作成
        spec = importlib.util.spec_from_file_location(module_name, abs_path)
        if spec is None:
            raise ImportError(f"Cannot load module from {abs_path}")
        # モジュールを作成
        module = importlib.util.module_from_spec(spec)
        # クラスを取得
        if not hasattr(module, "GeneratedScene"):
            raise ImportError(f"GeneratedScene class not found in {file_path}")
        
        return getattr(module, "GeneratedScene")


        
if __name__ == "__main__":
    relative_python_file = "./tests/test_1.py"
    GeneratedScene = run_script_file(relative_python_file)
        # インスタンスを作成
    scene_instance = GeneratedScene()
    scene_instance.render()