"""
Audit all tasks.json files for:
1. Missing $ signs in math fields
2. Encoding issues
"""
import json, os

def has_math_delimiters(s):
    if not s or not s.strip(): return True  # empty/no math -> ok
    t = s.strip()
    # has $, \( or \[ delimiters
    if t.startswith('$') or t.startswith('\\(') or t.startswith('\\['):
        return True
    return False

def needs_dollar_wrap(s):
    if not s or not s.strip(): return False
    # If it contains LaTeX commands, it needs wrapping
    t = s.strip()
    if has_math_delimiters(t):
        return False
    # detect LaTeX: backslash, ^ _ etc.
    if '\\' in t or ('^' in t and len(t) > 2) or ('_' in t and len(t) > 2):
        return True
    return False

for root, dirs, files in os.walk('arkusze'):
    for f in files:
        if f == 'tasks.json':
            path = os.path.join(root, f)
            try:
                with open(path, 'r', encoding='utf-8') as fh:
                    data = json.load(fh)
                
                print(f"\n=== {path} ({len(data)} tasks) ===")
                for task in data:
                    for key in ['solution_math1', 'solution_math2']:
                        val = task.get(key, '')
                        if val and needs_dollar_wrap(val):
                            print(f"  Task {task['num']} [{key}]: {val[:80]}")
                            
            except Exception as e:
                print(f"ERROR {path}: {e}")
