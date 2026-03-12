"""
Fix hardcoded math fields in arkusze.html:
- math: "VALUE" where VALUE contains LaTeX (\\) but NO $ or \\( or \\[
  → wrap VALUE in $$...$$
- math: "VALUE" where VALUE already has $ → leave alone (KaTeX auto-render handles it)
"""
import re

html_path = 'arkusze.html'
with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern: math: "VALUE" where VALUE can contain \" escaped quotes
# We capture the opening part and the value
pattern = re.compile(r'(math:\s*")((?:[^"\\]|\\.)*)(")')

fixed = 0
no_change = 0

def fix_math_field(m):
    global fixed, no_change
    prefix = m.group(1)   # math: "
    val = m.group(2)      # the value inside quotes
    suffix = m.group(3)   # closing "
    
    # Check if value contains LaTeX backslashes (\\x in JS = single \ in value)
    has_latex = '\\\\' in val  # in the raw file, \\ = one backslash
    
    if not has_latex:
        no_change += 1
        return m.group(0)
    
    # Check if there's already a $ in the value
    has_dollar = '$' in val
    has_paren = '\\(' in val or '\\[' in val  # these are literal in the JS string
    
    if has_dollar or has_paren:
        # Already delimited (mixed or fully wrapped) — leave alone
        no_change += 1
        return m.group(0)
    
    # Pure LaTeX, no delimiters → wrap in $$...$$
    # In JS string, $$ becomes $$  (no escaping needed for $)
    fixed += 1
    return prefix + '$$' + val + '$$' + suffix

new_content = pattern.sub(fix_math_field, content)

print(f'Fixed: {fixed} math fields wrapped in $$...$$')
print(f'Left alone: {no_change} math fields (already have delimiters or no LaTeX)')

if fixed > 0:
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('arkusze.html updated.')
else:
    print('No changes needed.')
