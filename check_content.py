import json

with open('arkusze/diagnostyczny_XII_2023/tasks.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
    task = data[1]
    print("Task 2 Solution Math:")
    print(repr(task['solution_math1']))
    print()
    print("Actual:")
    print(task['solution_math1'])
    print()
    print("Checking for backslashes:")
    if '\\log' in task['solution_math1']:
        print("✓ Contains proper LaTeX \\log")
    else:
        print("✗ Missing proper LaTeX \\log")
