import json, os

dirs = ['diagnostyczny_XII_2024','diagnostyczny_XII_2023','diagnostyczny_XII_2022','diagnostyczny_IX_2022','pokazowy_III_2022']
base = r'E:\matematyka - strona kompedium\arkusze'
for d in dirs:
    path = os.path.join(base, d, 'tasks.json')
    if os.path.exists(path):
        with open(path, encoding='utf-8') as f:
            data = json.load(f)
        n = len(data)
        print(f'\n=== {d}: {n} tasks ===')
        if n < 31:
            print(f'MISSING tasks {n+1} to 31')
        elif n > 31:
            print(f'EXTRA tasks {32} to {n}:')
            for t in data[31:]:
                print(f'  task {t["num"]}: {t["text"][:80]}')
        # Print last task
        last = data[-1]
        print(f'Last task (#{last["num"]}): {last["text"][:100]}')
