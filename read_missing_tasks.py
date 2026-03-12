import re

dirs_and_starts = [
    ('diagnostyczny_XII_2024', 'Zadanie 31'),
    ('diagnostyczny_XII_2023', 'Zadanie 31'),
    ('diagnostyczny_XII_2022', 'Zadanie 31'),
    ('diagnostyczny_IX_2022', 'Zadanie 2[678901]'),
    ('pokazowy_III_2022', 'Zadanie 31'),
]
base = r'E:\matematyka - strona kompedium\arkusze'

for d, pattern in dirs_and_starts:
    path = f'{base}\\{d}\\arkusz_text.txt'
    with open(path, encoding='utf-8') as f:
        content = f.read()
    # Find the pattern
    matches = [(m.start(), m.group()) for m in re.finditer(pattern, content)]
    if matches:
        # Print from first match to end
        start_pos = matches[0][0]
        snippet = content[start_pos:start_pos+3000]
        print(f'\n=== {d} ===')
        print(f'Found: {matches}')
        print(snippet)
    else:
        print(f'\n=== {d} === NOT FOUND: {pattern}')
        # print last 1000 chars
        print('LAST 1000 CHARS:', content[-1000:])
