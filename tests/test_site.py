"""Run an isolated headless browser; never attach to a user's browser session.

python tests/test_site.py [https://lebroncoder2025.github.io/MatematykaToPodstawa/]
"""
import json
import sys
import threading
from pathlib import Path
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import unquote, urlsplit
from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parents[1]
ARTIFACTS = ROOT / 'tests' / 'artifacts'
ARTIFACTS.mkdir(exist_ok=True)
server = None
if len(sys.argv) > 1:
    BASE = sys.argv[1].rstrip('/') + '/'
else:
    class Handler(SimpleHTTPRequestHandler):
        def translate_path(self, path):
            path = unquote(urlsplit(path).path)
            prefix = '/MatematykaToPodstawa/'
            if path.startswith(prefix):
                path = path[len(prefix):]
            return str(ROOT / path.lstrip('/'))
        def log_message(self, *_):
            pass
    server = ThreadingHTTPServer(('127.0.0.1', 0), Handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    BASE = f'http://127.0.0.1:{server.server_port}/MatematykaToPodstawa/'

checks = []
def passed(label):
    checks.append(label)
    print('PASS:', label, flush=True)

try:
    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1440, 'height': 1000}, accept_downloads=True)
        page = context.new_page()
        errors = []
        page.on('pageerror', lambda err: errors.append(str(err)))
        response = page.goto(BASE + 'kurs.html', wait_until='networkidle')
        assert response.status == 200
        expect(page.locator('#practiceTopic')).to_be_visible()
        expect(page.locator('#courseQuestionCount')).to_have_text('140')
        expect(page.locator('#courseTheoryCount')).to_have_text('76')
        math_tests = page.evaluate('''() => {
          const M=window.MathLearning;
          const cases=[['0,6','3/5',true],['6/10','3/5',true],['-2/-4','1/2',true],
            ['1/3','2/6',true],['0.3333333333','1/3',false],['1/0','0',null],
            ['','0',null],['alert(1)','1',null],['Infinity','1',null],['2','3',false]];
          return cases.every(([v,a,w])=>M.check(v,a)===w);
        }''')
        assert math_tests
        all_exercises = page.evaluate('''() => window.MathLearning.topics.flatMap((_,t)=>
          Array.from({length:8},(_,s)=>window.MathLearning.exercise(t,s)))''')
        for q in all_exercises:
            n = int(q['id'].split(':')[1]); t = q['topic']
            expected = [str(n), str(n*n+6*n), str(n), str(n-6), str(n),
                        str(3+4*n), '3/5', str(n*(n+1)), str(n*(n+1)), f'{n}/{2*n+2}'][t]
            assert q['answer'] == expected, q
        passed('80 wariantów zadań i dokładne porównywanie ułamków')

        page.locator('#practiceAnswer').fill('3')
        page.locator('#practiceCheck').click()
        expect(page.locator('#practiceFeedback')).to_contain_text('Jeszcze nie')
        expect(page.locator('#practiceStats')).to_contain_text('1 do powtórki')
        page.locator('#practiceReview').click()
        page.locator('#practiceAnswer').fill('2')
        page.locator('#practiceCheck').click()
        expect(page.locator('#practiceStats')).to_contain_text('1/8')
        page.reload(wait_until='networkidle')
        expect(page.locator('#practiceStats')).to_contain_text('1/8')
        page.locator('#practiceTopic').select_option('6')
        page.locator('#practiceAnswer').fill('0,6')
        page.locator('#practiceCheck').click()
        expect(page.locator('#practiceFeedback')).to_contain_text('Poprawnie')
        passed('Własne odpowiedzi, powtórka błędów i trwały zapis postępu')

        page.evaluate('''() => {startLesson(7); lesson.stepIdx=COURSE[7].steps.length-1; renderStep();}''')
        page.locator('#btnNext').click()
        assert page.evaluate('() => (state.modProgress[7]||{}).done||0') == 0
        page.locator('#ans-2').click()
        xp = page.evaluate('() => state.xp')
        page.evaluate('() => {renderStep();selectAnswer(2,2);}')
        assert page.evaluate('() => state.xp') == xp
        page.locator('#btnNext').click()
        expect(page.locator('#lessonContent')).to_contain_text('Dział ukończony')
        expect(page.locator('#lessonContent')).to_contain_text('1/1')
        page.evaluate('() => startLesson(0)')
        expect(page.locator('#btnNext')).to_be_visible()
        page.evaluate('''() => {lesson.stepIdx=COURSE[0].steps.findIndex(s=>s.type==='question');renderStep();toggleStepNote();}''')
        page.locator('#stepNoteText').fill('a+b')
        page.locator('#stepNoteText').press('a')
        assert page.evaluate('() => lesson.answered') is False
        page.evaluate('() => closeLesson()')
        passed('Blokada pominięcia ostatniego zadania, XP bez duplikacji i skróty w notatkach')

        page.goto(BASE+'zadania.html', wait_until='networkidle')
        expect(page.locator('.task-card')).to_have_count(48)
        page.evaluate('() => {toggleSolved(1);toggleBookmark(1);}')
        page.reload(wait_until='networkidle')
        expect(page.locator('#solvedCount')).to_have_text('1')
        expect(page.locator('#bookCount')).to_have_text('1')
        passed('48 zadań: zapis rozwiązanych i zakładek')

        page.goto(BASE+'postep.html', wait_until='networkidle')
        expect(page.locator('#statCards')).to_contain_text('/ 216')
        passed('Spójny postęp dla 216 kroków kursu')

        page.goto(BASE+'quiz.html', wait_until='networkidle')
        page.add_script_tag(url=BASE+'assets/course-data.js')
        page.add_script_tag(url=BASE+'assets/content.js')
        page.add_script_tag(url=BASE+'assets/tasks-data.js')
        content_audit=page.evaluate('''() => {
          const errors=[],duplicates=[];
          function math(text){if(typeof text!=='string')return;for(const m of text.matchAll(/\$([^$]+)\$/g)){
            try{katex.renderToString(m[1],{throwOnError:true,strict:false});}catch(e){errors.push(m[1]);}
          }}
          MathCourse.forEach((module,mi)=>module.steps.forEach((s,si)=>{
            if(s.answers)for(let i=0;i<4;i++)for(let j=i+1;j<4;j++)if(quizEquivalent(s.answers[i],s.answers[j]))duplicates.push([mi,si]);
            math(s.text);math(s.explanation);(s.answers||[]).forEach(math);
            (s.items||[]).forEach(item=>{math(item.text);(item.items||[]).forEach(math);});
          }));
          Object.values(MATURA_TOPICS).forEach(topic=>{
            topic.theory.forEach(t=>t.formulas.forEach(f=>{try{katex.renderToString(f.latex,{throwOnError:true,strict:false});}catch(e){errors.push(f.latex);}}));
            topic.tasks.forEach(t=>{math(t.q);math(t.answer);t.steps.forEach(step=>math(step.math));});
          });
          MathTasks.forEach(t=>{math(t.content);math(t.answer);t.steps.forEach(s=>math(s.text));});
          return {errors,duplicates};
        }''')
        assert not content_audit['duplicates'],content_audit['duplicates']
        assert not content_audit['errors'],content_audit['errors'][:15]
        passed('Wzory kompendium i kursu oraz brak równoważnych opcji w 140 pytaniach')
        quiz_result = page.evaluate('''() => {
          const questions=quizGen.generate('podstawowy',null,1200).concat(quizGen.generate('rozszerzony',null,1200));
          const bad=questions.filter(q=>q.options.length!==4 || !Number.isInteger(q.correct) || q.correct<0 || q.correct>3 ||
            q.options.some((a,i)=>q.options.slice(i+1).some(b=>quizEquivalent(a,b))));
          const latexErrors=[];
          if(window.katex) questions.forEach(q=>[q.q,...q.options,q.explain].forEach(text=>{
            const matches=text.matchAll(/\$([^$]+)\$/g);
            for(const m of matches)try{katex.renderToString(m[1],{throwOnError:true,strict:false});}catch(e){latexErrors.push(m[1]);}
          }));
          return {count:questions.length,bad:bad.length,latexErrors};
        }''')
        assert quiz_result['count']==2400 and quiz_result['bad']==0, quiz_result
        assert not quiz_result['latexErrors'], quiz_result['latexErrors'][:10]
        passed('2400 pytań quizu: cztery różne odpowiedzi i poprawne wzory KaTeX')

        page.goto(BASE+'arkusze.html', wait_until='networkidle')
        expect(page.locator('#examCount')).to_have_text('19 dokumentów')
        page.locator('#examLevel').select_option('rozszerzony')
        expect(page.locator('#examCount')).to_have_text('4 dokumentów')
        page.locator('[data-exam]').first.click()
        expect(page.locator('#examSession')).to_be_visible()
        page.locator('#examNote').fill('Powtórzyć zadania dotyczące dziedziny.')
        page.locator('#examTimerToggle').click()
        expect(page.locator('#examTimerToggle')).to_have_text('Pauza')
        pdf_paths=page.evaluate('() => ExamCatalog.flatMap(e=>[e.pdfPath,e.zasadyPath])')
        for path in pdf_paths:
            response=page.request.get(BASE+path)
            assert response.ok and response.body().startswith(b'%PDF'),path
        passed('23 oryginalne arkusze i 23 klucze PDF, filtry i sesja pracy')

        page.goto(BASE+'index.html', wait_until='networkidle')
        page.locator('[data-study-level="podstawowy"]').click()
        expect(page.locator('.topic-card')).to_have_count(10)
        expected_course=page.evaluate("() => MathCourse.reduce((n,m,i)=>n+Math.min(m.steps.length,Math.max(0,JSON.parse(localStorage.getItem('kurs_state')||'{}').modProgress?.[i]?.done||0)),0)")
        expect(page.locator('#courseSteps')).to_have_text(str(expected_course)+'/216')
        expect(page.locator('#practiceSolved')).to_have_text('2/80')
        expect(page.locator('#tasksSolved')).to_have_text('1/48')
        page.locator('#topicSearch').fill('rownania')
        expect(page.locator('.topic-card')).to_have_count(1)
        expect(page.locator('.topic-card')).to_contain_text('Równania')
        page.locator('#topicSearch').fill('pochodne')
        expect(page.locator('#topicEmpty')).to_be_visible()
        page.locator('[data-study-level="rozszerzony"]').click()
        expect(page.locator('.topic-card')).to_have_count(1)
        expect(page.locator('#heroExam')).to_have_attribute('href','egzamin.html?exam=2026_rozszerzony')
        page.locator('#topicSearch').fill('')
        expect(page.locator('.topic-card')).to_have_count(15)
        page.reload(wait_until='networkidle')
        expect(page.locator('[data-study-level="rozszerzony"]')).to_have_attribute('aria-pressed','true')
        assert page.locator('a[href="korepetycje.html"]').count()==0
        for href in page.locator('.topic-card').evaluate_all('(links)=>links.map(a=>a.getAttribute("href"))'):
            assert page.request.get(BASE+href).ok,href
        page.screenshot(path=str(ARTIFACTS/'home-desktop.png'),full_page=True)
        page.goto(BASE+'korepetycje.html',wait_until='networkidle')
        expect(page).to_have_url(BASE+'kurs.html')
        passed('Strona startowa: zapisany postęp, poziomy, wyszukiwanie, działające tematy i wycofany panel')

        for name in ['index.html','kurs.html','postep.html','quiz.html','arkusze.html']:
            page.set_viewport_size({'width':390,'height':844})
            page.goto(BASE+name, wait_until='networkidle')
            width=page.evaluate('() => ({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth})')
            assert width['scroll']<=width['client']+2,(name,width)
            page.screenshot(path=str(ARTIFACTS/name.replace('.html','-mobile.png')),full_page=True)
        passed('Brak poziomego przewijania na ekranie 390 px')

        page.goto(BASE+'index.html',wait_until='networkidle')
        page.evaluate('() => navigator.serviceWorker.ready')
        page.reload(wait_until='networkidle')
        context.set_offline(True)
        page.reload(wait_until='load')
        expect(page.locator('.topic-card')).to_have_count(15)
        expect(page.locator('#practiceSolved')).to_have_text('2/80')
        page.locator('#topicSearch').fill('geometria')
        expect(page.locator('.topic-card')).to_have_count(1)
        context.set_offline(False)
        passed('GitHub Pages: ścieżka podkatalogu, postęp i wyszukiwanie offline')
        assert not errors, errors
        passed('Brak błędów JavaScript w przetestowanych scenariuszach')
        browser.close()
    print(json.dumps({'base':BASE,'passed':checks},ensure_ascii=False,indent=2))
finally:
    if server:
        server.shutdown()
