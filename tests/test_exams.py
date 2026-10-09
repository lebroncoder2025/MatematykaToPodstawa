# -*- coding: utf-8 -*-
"""Audit CKE document provenance, mathematics and the isolated exam study UI."""
import hashlib, itertools, json, math, re, sys, threading
from pathlib import Path
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import unquote,urlsplit
import fitz
from playwright.sync_api import sync_playwright,expect

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'tests/artifacts';OUT.mkdir(exist_ok=True)
exam_data={}
for folder in ['2026','2026_rozszerzony']:
    data=json.loads((ROOT/f'arkusze/{folder}/solutions.json').read_text(encoding='utf8'))
    source=json.loads((ROOT/f'arkusze/{folder}/source.json').read_text(encoding='utf8'))
    for record in source['documents']:
        raw=(ROOT/f"arkusze/{folder}/{record['kind']}.pdf").read_bytes()
        assert hashlib.sha256(raw).hexdigest()==record['sha256']
        assert record['url'].startswith('https://egzaminy.gov.pl/pliki/')
    pdf=fitz.open(ROOT/f'arkusze/{folder}/arkusz.pdf');key=fitz.open(ROOT/f'arkusze/{folder}/zasady.pdf')
    assert sum(t['points'] for t in data['tasks'])==50
    assert len(set(t['number'] for t in data['tasks']))==len(data['tasks'])
    for t in data['tasks']:
        assert re.search(r'Zadanie\s+'+re.escape(t['number'])+r'\.',pdf[t['page']-1].get_text())
        assert re.search(r'Zadanie\s+'+re.escape(t['number'])+r'\.',key[t['keyPage']-1].get_text())
        assert t['steps'] and t['scoring'] and t['hint'] and t['trap']
        for img in t['originals']:
            pix=fitz.Pixmap(str(ROOT/img['path']))
            assert pix.width==img['width'] and pix.height==img['height'] and pix.width>=900
    # Read the A column from the actual PDF, independently of the authored JSON.
    if folder=='2026':
        expected={'1':'C','2':'B','3':'C','4':'B','5':'PP','6':'A','8':'C','9':'D','13.1':'FF','13.2':'A','16':'B','18':'C','19':'C','20':'B','23':'D','24.1':'B','24.2':'D','25':'PF','26':'D','28':'D','29':'A','31':'PP','32':'C','33.1':'D','33.2':'A'}
        for n,answer in expected.items():
            t=next(t for t in data['tasks'] if t['number']==n)
            text=key[t['keyPage']-1].get_text(sort=True)
            section=text.split('Zadanie '+n+'.')[1].split('Zadanie ')[0]
            match=re.search(r'Wersja A\s+Wersja B\s+([A-DPF]+)',section)
            assert match and match[1]==answer,(n,section)
            assert t['answer'].split(':')[0]==answer
    exam_data[folder]=data
print('PASS: 50 zadań, 100 pkt, numery stron i sumy SHA-256 oryginałów CKE; 25 odpowiedzi z kolumny A klucza',flush=True)

# Independently compute the longer results, including exhaustive probability checks.
favourable=[p for p in itertools.permutations(range(1,9)) if all(math.prod(p[i:i+3])%3==0 for i in range(6))]
assert len(favourable)==2*math.factorial(6) and len(favourable)*28==math.factorial(8)
assert all({p[2],p[5]}=={3,6} for p in favourable)
assert [10*a+b for a in [1,3,5,7,9] for b in [0,2,4,6,8] if (10*a+b)%6==0]==[12,18,30,36,54,72,78,90,96]
assert 10000*106*106//10000-10000==1236
assert (200*35-4665/.75)/10==78
assert (32**2/8-5)/3==41
assert ((-2025-1)/-2+1)==1014 and (1-2025)*1014/2==-1026168
assert math.isclose((42+42-54)/84,5/14)
assert math.isclose((2-6/5)**2+(1+3/5)**2,16/5)
for m in [-3,-.1,.1,.25,.5,.8,1,1.01,2,5,100]:
    if m>0:
        roots=[(1-math.sqrt(m))/m,(1+math.sqrt(m))/m]
        assert all(-2<x<2 for x in roots)==(m>1)
for x in [-8,-5,-4,-1,0,2,3,4]:
    original=abs(2*x-6)-abs(x*x-9)<0
    assert original==(x<-5 or (-1<x<3) or x>3)
for k in range(-4,5):
    for x in [k*math.pi/2,-math.pi/12+k*math.pi/2,math.pi/12+k*math.pi/2]:
        assert abs(math.sin(6*x)-2*math.sin(2*x))<1e-12
x=4*math.sqrt(3);assert math.isclose(2*x**3/(x*x-16),12*math.sqrt(3))
assert math.isclose(math.dist([.4,.2],[.8,.4]),math.sqrt(5)/5)
print('PASS: niezależne obliczenia wyników, 40320 permutacji, przedziały, trygonometria i geometria',flush=True)

server=None
if len(sys.argv)>1:base=sys.argv[1].rstrip('/')+'/'
else:
    class Handler(SimpleHTTPRequestHandler):
        def translate_path(self,path):
            path=unquote(urlsplit(path).path);prefix='/MatematykaToPodstawa/'
            return str(ROOT/(path[len(prefix):] if path.startswith(prefix) else path.lstrip('/')))
        def log_message(self,*args):pass
    server=ThreadingHTTPServer(('127.0.0.1',0),Handler)
    threading.Thread(target=server.serve_forever,daemon=True).start()
    base=f'http://127.0.0.1:{server.server_port}/MatematykaToPodstawa/'
try:
    with sync_playwright() as pw:
        browser=pw.chromium.launch(headless=True)
        context=browser.new_context(viewport={'width':1440,'height':1000},accept_downloads=True)
        page=context.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
        for folder,data in exam_data.items():
            page.goto(base+'egzamin.html?exam='+folder,wait_until='networkidle')
            expect(page.locator('[data-task]')).to_have_count(len(data['tasks']))
            latex_errors=page.evaluate('''async folder=>{
              const data=await(await fetch('arkusze/'+folder+'/solutions.json')).json(),errors=[];
              for(const t of data.tasks)for(const text of [t.summary,t.answer,...t.steps])for(const m of text.matchAll(/\$([^$]+)\$/g))
                try{katex.renderToString(m[1],{throwOnError:true,strict:false});}catch(e){errors.push([t.number,m[1],String(e)]);}
              return errors;
            }''',folder)
            assert not latex_errors,latex_errors
            for t in data['tasks']:
                page.locator(f'[data-task="{t["number"]}"]').evaluate('(el)=>el.click()')
                page.locator('#revealSolution').evaluate('(el)=>el.click()')
                expect(page.locator('#taskAnswer')).to_be_visible()
                assert page.locator('.exam-step').count()==len(t['steps'])
                assert page.locator('#taskSolution').inner_text().find('undefined')==-1
                for img in t['originals']:
                    response=page.request.get(base+img['path']);assert response.ok and response.body().startswith(b'\x89PNG')
            print('PASS: wszystkie rozwiązania, wzory KaTeX i obrazy — '+folder,flush=True)
        page.goto(base+'egzamin.html?exam=2026_rozszerzony&task=4',wait_until='networkidle')
        page.locator('#revealSolution').click()
        expect(page.locator('#taskDiagram svg')).to_be_visible()
        page.locator('#diagramGrid').uncheck();assert page.locator('#taskDiagram').evaluate('(el)=>el.classList.contains("no-grid")')
        page.locator('#taskStatus').select_option('mastered');page.locator('#taskScore').select_option('3')
        page.locator('#studyNote').fill('Sprawdź prostopadłość prostych przed wyznaczeniem punktów.')
        box=page.locator('#studyBoard').bounding_box()
        page.mouse.move(box['x']+30,box['y']+30);page.mouse.down();page.mouse.move(box['x']+130,box['y']+90,steps=10);page.mouse.up()
        page.reload(wait_until='networkidle')
        expect(page.locator('#taskScore')).to_have_value('3');expect(page.locator('#studyNote')).to_have_value('Sprawdź prostopadłość prostych przed wyznaczeniem punktów.')
        assert page.evaluate('()=>JSON.parse(localStorage.getItem("mtp-exam-study-v1"))["2026_rozszerzony:4"].strokes.length')==1
        with page.expect_download() as d:page.locator('#boardDownload').click()
        d.value.save_as(OUT/'brudnopis.png');assert (OUT/'brudnopis.png').read_bytes().startswith(b'\x89PNG')
        with page.expect_download() as d:page.locator('#studyExport').click()
        d.value.save_as(OUT/'exam-backup.json')
        backup=json.loads((OUT/'exam-backup.json').read_text());assert backup['tasks']['4']['score']==3
        page.locator('#taskScore').select_option('0');page.on('dialog',lambda d:d.accept())
        page.locator('#studyImport').set_input_files(OUT/'exam-backup.json')
        expect(page.locator('#studySaveStatus')).to_contain_text('Wczytano kopię')
        expect(page.locator('#taskScore')).to_have_value('3')
        backup['tasks']['4']['score']=999;(OUT/'invalid-exam.json').write_text(json.dumps(backup))
        page.locator('#studyImport').set_input_files(OUT/'invalid-exam.json')
        expect(page.locator('#studySaveStatus')).to_contain_text('Nie wczytano')
        expect(page.locator('#taskScore')).to_have_value('3')
        print('PASS: punktacja, notatki, wektorowy brudnopis i walidowany import/eksport',flush=True)
        for folder,number in [('2026','12.1'),('2026','24.2'),('2026_rozszerzony','4'),('2026_rozszerzony','12.1')]:
            page.goto(base+f'egzamin.html?exam={folder}&task={number}',wait_until='networkidle');page.locator('#revealSolution').click()
            if number=='12.1' and folder.endswith('rozszerzony'):
                page.locator('#gardenMinimum').click();expect(page.locator('#gardenValue')).to_contain_text('20,78')
            page.locator('#taskDiagram').screenshot(path=str(OUT/f'diagram-{folder}-{number}.png'))
        page.set_viewport_size({'width':390,'height':844})
        page.goto(base+'egzamin.html?exam=2026&task=12.1',wait_until='networkidle');page.locator('#revealSolution').click()
        assert page.evaluate('document.documentElement.scrollWidth')<=392
        page.screenshot(path=str(OUT/'exam-mobile.png'),full_page=True)
        page.locator('#taskStatus').select_option('review');page.locator('#studyTaskFilter').select_option('review')
        expect(page.locator('[data-task]')).to_have_count(1)
        page.evaluate('()=>navigator.serviceWorker.ready');page.reload(wait_until='networkidle')
        page.wait_for_function('()=>!!navigator.serviceWorker.controller')
        context.set_offline(True);page.reload(wait_until='domcontentloaded')
        expect(page.locator('#activeTaskHeading')).to_have_text('Odczyt wykresu')
        expect(page.locator('#taskStatus')).to_have_value('review')
        context.set_offline(False)
        assert not errors,errors
        browser.close()
        print('PASS: diagramy, filtr powtórek, mobile 390 px, offline i brak błędów JavaScript',flush=True)
finally:
    if server:server.shutdown()
