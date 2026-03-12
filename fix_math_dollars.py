"""
Fix all tasks.json files:
- Add $...$ around solution_math1 and solution_math2 if LaTeX commands present but no $ delimiter
- Also fix any remaining encoding issues
"""
import json
import os
import re

def needs_dollar_wrap(s):
    """Returns True if string has LaTeX content but no math delimiters."""
    if not s or not s.strip():
        return False
    t = s.strip()
    # Already wrapped
    if t.startswith('$') or t.startswith('\\(') or t.startswith('\\['):
        return False
    # Contains LaTeX: backslash commands, superscripts, subscripts, curly braces
    if '\\' in t or re.search(r'[_^{}]', t):
        return True
    return False

def wrap_math(s):
    """Wrap string in $$...$$ for display math."""
    if not s or not s.strip():
        return s
    if not needs_dollar_wrap(s):
        return s
    return '$$' + s + '$$'

total_fixed = 0

for root, dirs, files in os.walk('arkusze'):
    for f in files:
        if f == 'tasks.json':
            path = os.path.join(root, f)
            try:
                with open(path, 'r', encoding='utf-8') as fh:
                    data = json.load(fh)

                fixed = 0
                for task in data:
                    for key in ['solution_math1', 'solution_math2']:
                        val = task.get(key, '')
                        if val and needs_dollar_wrap(val):
                            task[key] = wrap_math(val)
                            fixed += 1

                if fixed > 0:
                    with open(path, 'w', encoding='utf-8') as fh:
                        json.dump(data, fh, ensure_ascii=False, indent=2)
                    print(f'Fixed {fixed} math fields in: {path}')
                    total_fixed += fixed
                else:
                    print(f'No changes needed: {path}')

            except Exception as e:
                print(f'ERROR {path}: {e}')

print(f'\nTotal math fields fixed: {total_fixed}')
