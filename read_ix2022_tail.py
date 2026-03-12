import re

base = r'E:\matematyka - strona kompedium\arkusze'

# Read IX/2022 - find all tasks from 26 onwards
path = f'{base}\\diagnostyczny_IX_2022\\arkusz_text.txt'
with open(path, encoding='utf-8') as f:
    content = f.read()

# Find "Zadanie 26" and print from there to end
m = re.search(r'Zadanie 2[6-9]\.', content)
if m:
    print(content[m.start():])
else:
    print("NOT FOUND. Last 3000 chars:")
    print(content[-3000:])
