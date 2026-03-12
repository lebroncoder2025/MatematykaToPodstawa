import os

BAD_MAIN = '<script src="assets/notepad.js"></script>`n  <script src="assets/fontsize.js"></script>'
GOOD_MAIN = '<script src="assets/notepad.js"></script>\n  <script src="assets/fontsize.js"></script>'

BAD_DZIALY = '<script src="../assets/notepad.js"></script>`n  <script src="../assets/fontsize.js"></script>'
GOOD_DZIALY = '<script src="../assets/notepad.js"></script>\n  <script src="../assets/fontsize.js"></script>'

main_pages = ['index.html','quiz.html','wzory.html','zadania.html','postep.html','kurs.html','arkusze.html']
for page in main_pages:
    with open(page, 'r', encoding='utf-8') as f:
        content = f.read()
    if BAD_MAIN in content:
        content = content.replace(BAD_MAIN, GOOD_MAIN)
        with open(page, 'w', encoding='utf-8', newline='') as f:
            f.write(content)
        print('Fixed:', page)
    else:
        print('OK:', page)

os.chdir('dzialy')
for fname in os.listdir('.'):
    if not fname.endswith('.html'):
        continue
    with open(fname, 'r', encoding='utf-8') as f:
        content = f.read()
    if BAD_DZIALY in content:
        content = content.replace(BAD_DZIALY, GOOD_DZIALY)
        with open(fname, 'w', encoding='utf-8', newline='') as f:
            f.write(content)
        print('Fixed dzialy:', fname)
    else:
        print('OK dzialy:', fname)
