import re, os

base = r'E:\matematyka - strona kompedium\arkusze'

for exam in ['pokazowy_III_2022', 'diagnostyczny_XII_2022']:
    path = f'{base}\\{exam}\\arkusz_text.txt'
    with open(path, encoding='utf-8') as f:
        content = f.read()
    # Find all "Zadanie N." for N>=27
    tasks = re.findall(r'Zadanie\s+(\d+)\.\s+\(0', content)
    print(f'{exam}: tasks found = {tasks}')
    # Find last zadanie
    last_matches = list(re.finditer(r'Zadanie\s+(\d+)\.', content))
    if last_matches:
        last = last_matches[-1]
        print(f'  Last zadanie found: #{last.group(1)} at pos {last.start()}')
        print(f'  Context: {content[last.start():last.start()+200]}')
