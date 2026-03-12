import glob

SW_REG = """
  <script>
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').catch(function(){});
      });
    }
  </script>"""

for path in list(glob.glob('*.html')) + list(glob.glob('dzialy/*.html')):
    with open(path, encoding='utf-8') as f:
        html = f.read()
    orig = html

    # 1. Add manifest link (if not present)
    manifest_tag = '<link rel="manifest" href="/manifest.json">'
    if manifest_tag not in html and '<link rel="manifest"' not in html:
        html = html.replace('<meta name="viewport"', manifest_tag + '\n    <meta name="viewport"', 1)

    # 2. Add SW registration before </body>
    if 'serviceWorker' not in html:
        html = html.replace('</body>', SW_REG + '\n</body>', 1)

    # 3. Add recent.js script (after fontsize.js if present, else before </head>)
    is_dzialy = path.startswith('dzialy')
    prefix = '../' if is_dzialy else ''
    recent_tag = '<script src="' + prefix + 'assets/recent.js"></script>'
    if 'recent.js' not in html:
        fontsize_tag = '<script src="' + prefix + 'assets/fontsize.js"></script>'
        if fontsize_tag in html:
            html = html.replace(fontsize_tag, fontsize_tag + '\n  ' + recent_tag, 1)
        else:
            html = html.replace('</head>', '  ' + recent_tag + '\n</head>', 1)

    if html != orig:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(html)
        print('DONE: ' + path)
    else:
        print('OK: ' + path)
print('All done.')
