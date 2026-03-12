#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Convert all 5 diagnostic tasks.json files and replace in arkusze.html.
Does all 5 replacements in bottom-to-top order to preserve line numbers."""

import json, os, re

base = r'E:\matematyka - strona kompedium\arkusze'
html_path = r'E:\matematyka - strona kompedium\arkusze.html'

def escape_for_js(s):
    """Escape a string for embedding inside a JS double-quoted string.
    - Remove embedded newlines (replace with space)
    - Double all backslashes (for LaTeX commands)
    - Escape double quotes
    """
    s = s.replace('\r\n', ' ').replace('\n', ' ').replace('\r', ' ')  # remove newlines
    s = s.replace('\\', '\\\\')  # first: double all backslashes
    s = s.replace('"', '\\"')    # then: escape double quotes
    return s

def task_to_js(t):
    """Convert a task dict (from JSON) to a single-line JS object string."""
    num = t['num']
    text = escape_for_js(t.get('text', ''))
    typ = t.get('type', 'otwarte')
    answer = escape_for_js(t.get('answer', ''))
    
    # Build solution array
    sol_parts = []
    for i in range(1, 4):
        step = t.get(f'solution_step{i}', '') or ''
        math = t.get(f'solution_math{i}', '') or ''
        if step or math:
            sol_parts.append(f'{{ step: "{escape_for_js(step)}", math: "{escape_for_js(math)}" }}')
    
    # Also handle 'solution' if it's already an array (shouldn't be in JSON format but just in case)
    if not sol_parts and 'solution' in t:
        sol = t['solution']
        if isinstance(sol, list):
            for s in sol:
                step = escape_for_js(s.get('step', ''))
                math = escape_for_js(s.get('math', ''))
                sol_parts.append(f'{{ step: "{step}", math: "{math}" }}')
    
    if not sol_parts:
        sol_parts.append('{ step: "", math: "" }')
    
    sol_str = ', '.join(sol_parts)
    
    return f'      {{ num: {num}, text: "{text}", type: "{typ}", answer: "{answer}", solution: [{sol_str}] }}'

# Exam configurations: folder, task1_line (1-indexed), task31_line (1-indexed inclusive)
exams = [
    ('diagnostyczny_XII_2024',  717, 747),
    ('diagnostyczny_XII_2023',  758, 788),
    ('diagnostyczny_XII_2022',  799, 829),
    ('diagnostyczny_IX_2022',   840, 870),
    ('pokazowy_III_2022',        881, 911),
]

# Read html file
with open(html_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f'Initial file: {len(lines)} lines')

# Process exams in REVERSE order (bottom to top) to preserve line numbers
for folder, t1_line, t31_line in reversed(exams):
    json_path = os.path.join(base, folder, 'tasks.json')
    
    if not os.path.exists(json_path):
        print(f'SKIP {folder}: no tasks.json')
        continue
    
    with open(json_path, encoding='utf-8') as f:
        tasks = json.load(f)
    
    # Convert tasks to JS lines
    new_task_lines = []
    for i, t in enumerate(tasks):
        js_line = task_to_js(t)
        # Add comma after all but last
        if i < len(tasks) - 1:
            js_line += ','
        new_task_lines.append(js_line + '\n')
    
    # Replace lines (0-indexed)
    start_idx = t1_line - 1   # inclusive start
    end_idx = t31_line         # exclusive end
    
    print(f'{folder}: replacing lines {t1_line}-{t31_line} with {len(tasks)} tasks')
    print(f'  Before: line {t1_line}: {lines[start_idx][:60].strip()}')
    print(f'  Before: line {t31_line}: {lines[end_idx-1][:60].strip()}')
    
    lines = lines[:start_idx] + new_task_lines + lines[end_idx:]
    
    print(f'  After: replaced. File now has {len(lines)} lines')

# Write result
with open(html_path, 'w', encoding='utf-8') as f:
    f.writelines(lines)

print(f'\nDone! Final file has {len(lines)} lines.')
