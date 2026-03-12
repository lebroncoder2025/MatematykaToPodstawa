import re

path = r'E:\matematyka - strona kompedium\arkusze.html'
with open(path, encoding='utf-8') as f:
    lines = f.readlines()

print(f'Total lines: {len(lines)}')
print()

# Find all exam headers
exam_headers = []
for i, line in enumerate(lines):
    if 'year:' in line and 'title:' in line:
        exam_headers.append(i)

# For each exam, count tasks after header (find lines with "num: N,")
for h_idx in exam_headers:
    header = lines[h_idx].strip()
    year_m = re.search(r'year:\s*(\d+)', header)
    title_m = re.search(r'title:\s*"([^"]+)"', header)
    year = year_m.group(1) if year_m else '?'
    title = title_m.group(1)[:40] if title_m else header[:40]
    
    # Find tasks array (starts 4-5 lines after header)
    tasks = []
    for j in range(h_idx+1, min(h_idx+50, len(lines))):
        m = re.search(r'num:\s*(\d+),', lines[j])
        if m:
            tasks.append(int(m.group(1)))
        elif lines[j].strip() == ']' and tasks:
            break
    
    if tasks:
        print(f'Year {year} | {title}')
        print(f'  Tasks: {tasks[0]}..{tasks[-1]} (count={len(tasks)})')
