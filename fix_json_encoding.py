import os
import json

def fix_mojibake(text):
    if not isinstance(text, str):
        return text
    try:
        # Try to encode as ISO-8859-1 and decode as UTF-8
        return text.encode('iso-8859-1').decode('utf-8')
    except (UnicodeEncodeError, UnicodeDecodeError):
        return text

def process_file(file_path):
    print(f"Processing {file_path}...")
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Recursive fix
        def recursive_fix(obj):
            if isinstance(obj, dict):
                return {k: recursive_fix(v) for k, v in obj.items()}
            elif isinstance(obj, list):
                return [recursive_fix(i) for i in obj]
            elif isinstance(obj, str):
                return fix_mojibake(obj)
            else:
                return obj
        
        fixed_data = recursive_fix(data)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(fixed_data, f, ensure_ascii=False, indent=2)
        print(f"Successfully fixed {file_path}")
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

if __name__ == "__main__":
    base_dir = "arkusze"
    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if file == "tasks.json":
                process_file(os.path.join(root, file))
