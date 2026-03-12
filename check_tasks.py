import json, os
dirs = ['diagnostyczny_XII_2024','diagnostyczny_XII_2023','diagnostyczny_XII_2022','diagnostyczny_IX_2022','pokazowy_III_2022']
base = r'E:\matematyka - strona kompedium\arkusze'
for d in dirs:
    path = os.path.join(base, d, 'tasks.json')
    if os.path.exists(path):
        with open(path, encoding='utf-8') as f:
            data = json.load(f)
        nums = [t['num'] for t in data]
        print(f'{d}: {len(data)} tasks')
        print(f'  nums: {nums}')
        # Print first task text snippet
        if data:
            print(f'  task1: {data[0]["text"][:60]}')
            print(f'  task_last: {data[-1]["text"][:60]}')
    else:
        print(f'{d}: NO FILE')
