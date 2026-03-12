import re

with open('arkusze.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all math: "..." patterns
pattern = r'(math:\s*")([^"\\]*(\\.[^"\\]*)*)"'
matches = [(m.group(0), m.group(2), m.start()) for m in re.finditer(pattern, content)]

no_dollar = []
for full, val, pos in matches:
    # Check if the val (JS string) contains LaTeX (\\log, \\frac etc) but no $
    if '\\\\' in full and not val.lstrip().startswith('$'):
        no_dollar.append((full[:100], pos))

print(f'Math fields WITHOUT $ in arkusze.html: {len(no_dollar)}')
for v, pos in no_dollar[:30]:
    print(f'  pos={pos}: {v}')
