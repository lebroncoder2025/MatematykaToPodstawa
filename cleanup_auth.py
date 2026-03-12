import glob

# Strings to remove — order matters (longer patterns first to avoid partial removal)
removals = [
    '\n  <script src="assets/firebase-init.js"></script>\n  <script src="assets/db-sync.js"></script>\n  <script src="assets/auth.js"></script>',
    '\n  <script src="../assets/firebase-init.js"></script>\n  <script src="../assets/db-sync.js"></script>\n  <script src="../assets/auth.js"></script>',
    '<script src="assets/firebase-init.js"></script>\n  <script src="assets/db-sync.js"></script>\n  <script src="assets/auth.js"></script>\n',
    '<script src="../assets/firebase-init.js"></script>\n  <script src="../assets/db-sync.js"></script>\n  <script src="../assets/auth.js"></script>\n',
    '<script src="assets/firebase-init.js"></script>',
    '<script src="assets/db-sync.js"></script>',
    '<script src="assets/auth.js"></script>',
    '<script src="../assets/firebase-init.js"></script>',
    '<script src="../assets/db-sync.js"></script>',
    '<script src="../assets/auth.js"></script>',
]

for path in list(glob.glob('*.html')) + list(glob.glob('dzialy/*.html')):
    with open(path, encoding='utf-8') as f:
        html = f.read()
    orig = html
    for s in removals:
        html = html.replace(s, '')
    if html != orig:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(html)
        print('CLEANED: ' + path)
    else:
        print('OK: ' + path)
print('Done.')
