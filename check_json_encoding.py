import json, os

base = r'E:\matematyka - strona kompedium\arkusze'
exam = 'diagnostyczny_XII_2024'
path = os.path.join(base, exam, 'tasks.json')
with open(path, encoding='utf-8') as f:
    raw = f.read()
    
# Show raw bytes for first task
print("RAW (first 500 chars):")
print(repr(raw[:500]))

# Also print first task parsed
data = json.loads(raw)
t1 = data[0]
print("\nParsed task 1 text:")
print(repr(t1['text']))
print("\nParsed task 1 solution_math1:")
print(repr(t1.get('solution_math1','') or t1.get('solution',[{}])[0].get('math','') if isinstance(t1.get('solution'), list) else t1.get('solution_math1','')))
