import glob

def inject(path, prefix):
    with open(path, encoding='utf-8') as f:
        html = f.read()
    marker = prefix + 'assets/firebase-init.js'
    if marker in html:
        print('SKIP: ' + path)
        return
    tags = (
        '<script src="' + prefix + 'assets/firebase-init.js"></script>\n'
        '  <script src="' + prefix + 'assets/db-sync.js"></script>\n'
        '  <script src="' + prefix + 'assets/auth.js"></script>'
    )
    fontsize_tag = '<script src="' + prefix + 'assets/fontsize.js"></script>'
    if fontsize_tag in html:
        html = html.replace(fontsize_tag, fontsize_tag + '\n  ' + tags, 1)
    else:
        html = html.replace('</head>', '  ' + tags + '\n</head>', 1)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(html)
    print('DONE: ' + path)

for p in glob.glob('*.html'):
    inject(p, '')
for p in glob.glob('dzialy/*.html'):
    inject(p, '../')
print('All done.')
