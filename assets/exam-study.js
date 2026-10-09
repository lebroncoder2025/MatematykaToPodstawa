(async function(){
  'use strict';
  const $=id=>document.getElementById(id),M=window.MathLearning;
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const id=new URLSearchParams(location.search).get('exam')||'2026';
  let exam,active,filter='all',strokes=[],drawing=null,revealed=false;
  const canvas=$('studyBoard'),ctx=canvas.getContext('2d');
  let saved=M.read('mtp-exam-study-v1',{});if(!saved||typeof saved!=='object'||Array.isArray(saved))saved={};
  if(!['2026','2026_rozszerzony'].includes(id)){fail('Nie ma takiego opracowania. Wybierz poziom podstawowy lub rozszerzony powyżej.');return;}
  try{const response=await fetch(`arkusze/${id}/solutions.json`);if(!response.ok)throw new Error('HTTP '+response.status);exam=await response.json();}
  catch(e){fail('Nie udało się wczytać opracowania. Sprawdź połączenie i odśwież stronę.');return;}
  function fail(message){$('studyError').hidden=false;$('studyError').textContent=message;}
  function record(){const key=id+':'+active.number;return saved[key]||(saved[key]={status:'todo',score:0,note:'',strokes:[]});}
  function store(){const ok=M.write('mtp-exam-study-v1',saved);$('studySaveStatus').textContent=ok?'Zapisano w tej przeglądarce.':'Zapis nie powiódł się. Pobierz postęp, żeby zachować wyniki.';updateStats();}
  function updateStats(){
    const records=exam.tasks.map(t=>saved[id+':'+t.number]||{}),mastered=records.filter(r=>r.status==='mastered').length;
    $('studyMastered').textContent=mastered+' / '+exam.tasks.length;$('studyReviewed').textContent=records.filter(r=>r.status==='review').length;
    $('studyScore').textContent=records.reduce((sum,r,i)=>sum+Math.max(0,Math.min(exam.tasks[i].points,Number(r.score)||0)),0)+' / 50';$('studyProgress').style.width=(100*mastered/exam.tasks.length)+'%';
    const tasks=exam.tasks.filter(t=>filter==='all'||(filter==='review'?(saved[id+':'+t.number]||{}).status==='review':(saved[id+':'+t.number]||{}).status!=='mastered'));
    $('studyTasks').innerHTML=tasks.length?tasks.map(t=>`<button type="button" data-task="${t.number}" aria-current="${active&&active.number===t.number?'true':'false'}"><span>${t.number}. ${esc(t.title)}<small>${t.points} pkt</small></span><span class="task-dot ${esc((saved[id+':'+t.number]||{}).status||'todo')}"></span></button>`).join(''):'<p class="muted">Brak zadań w tym widoku.</p>';
  }
  function renderDiagram(kind){
    const d=window.ExamDiagrams.render(kind);if(!d)return '';
    return `<figure class="exam-diagram" id="taskDiagram"><div class="row spread no-print"><strong>Rysunek pomocniczy</strong><label><input id="diagramGrid" type="checkbox" checked> Siatka</label></div><div id="diagramSvg">${d.svg}</div><figcaption><span id="diagramCaption">${esc(d.caption)}</span> <span class="muted">Na małym ekranie możesz przewinąć rysunek poziomo.</span></figcaption>${kind==='garden'?'<div class="field no-print" style="margin-top:16px"><label for="gardenBase">Zmień podstawę x (m)</label><input id="gardenBase" type="range" min="5" max="10" step="0.001" value="7"><output id="gardenValue">x = 7 m; pole ≈ 20,79 m²</output><button id="gardenMinimum" type="button">Pokaż minimum</button></div>':''}</figure>`;
  }
  function table(kind){
    if(kind==='probabilityTable')return `<div class="exam-table-scroll"><table class="exam-table"><caption>Wszystkie wyniki losowania. Zielone pola: liczby podzielne przez 6.</caption><thead><tr><th>Dziesiątki / jedności</th>${[0,2,4,6,8].map(n=>`<th scope="col">${n}</th>`).join('')}</tr></thead><tbody>${[1,3,5,7,9].map(a=>`<tr><th scope="row">${a}</th>${[0,2,4,6,8].map(b=>`<td class="${(10*a+b)%6===0?'hit':''}">${10*a+b}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    if(kind==='statistics')return `<div class="exam-table-scroll"><table class="exam-table"><caption>Liczności odczytane z oryginalnych diagramów CKE</caption><thead><tr><th>Ocena</th>${[1,2,3,4,5,6].map(n=>`<th scope="col">${n}</th>`).join('')}</tr></thead><tbody><tr><th scope="row">Klasa IV A</th>${[1,6,3,3,6,1].map(n=>`<td>${n}</td>`).join('')}</tr><tr><th scope="row">Klasa IV B</th>${[1,3,6,6,3,1].map(n=>`<td>${n}</td>`).join('')}</tr></tbody></table></div>`;
    return '';
  }
  function choose(number,focus=false){
    active=exam.tasks.find(t=>t.number===String(number))||exam.tasks[0];revealed=false;
    const r=record();strokes=Array.isArray(r.strokes)?r.strokes:[];drawing=null;
    const idx=exam.tasks.indexOf(active),t=active;
    history.replaceState(null,'',`?exam=${id}&task=${encodeURIComponent(t.number)}`);
    document.title=`Zadanie ${t.number} · Matura 2026 ${exam.level} · Matematyka to Podstawa`;
    $('studyTask').innerHTML=`<p class="exam-print-title">Matura maj 2026 · ${esc(exam.level)} · zadanie ${t.number}</p><div class="row spread"><span class="tag">ZADANIE ${t.number} · ${t.points} PKT</span><span class="muted">CKE, wersja A</span></div><h2 class="exam-focus" id="activeTaskHeading" tabindex="-1" style="margin-top:20px">${esc(t.title)}</h2><p>${esc(t.summary)}</p><details class="exam-source" open><summary>Oryginalna treść i rysunek CKE</summary><p class="muted" style="font-size:13px">Wyciąg z oryginalnego arkusza zawiera treść zadania i wspólne dane do jego podpunktów. Na telefonie możesz przewinąć obraz poziomo.</p>${t.originals.map(img=>`<div class="source-page"><img src="${img.path}" width="${img.width}" height="${img.height}" loading="lazy" alt="Oryginalna strona CKE z treścią zadania ${t.number}; pełna wersja dostępna w PDF poniżej"></div>`).join('')}<a href="${exam.pdf}#page=${t.page}" target="_blank" rel="noopener">Otwórz pełny arkusz — strona ${t.page} ↗</a></details><details class="exam-hint"><summary>Potrzebuję wskazówki</summary><p>${esc(t.hint)}</p></details><button class="primary" id="revealSolution" type="button">Pokaż rozwiązanie krok po kroku</button><div class="exam-solution" id="taskSolution" hidden>${renderDiagram(t.diagram)}${table(t.diagram)}${t.steps.map((text,i)=>`<section class="exam-step"><strong>Krok ${i+1}</strong><p>${esc(text)}</p></section>`).join('')}<div class="exam-answer"><strong>Wynik zgodny z kluczem CKE</strong><p id="taskAnswer">${esc(t.answer)}</p></div><div class="exam-warning" style="margin-top:18px"><strong>Na co uważać</strong><p>${esc(t.trap)}</p></div><section style="margin-top:22px"><h3>Punktacja i porównanie z CKE</h3><p>${t.points===1?'Za kompletną poprawną odpowiedź otrzymujesz 1 punkt; za niepoprawną lub brak odpowiedzi — 0.':esc(t.scoring)}</p><a class="action" href="${exam.key}#page=${t.keyPage}" target="_blank" rel="noopener">Oficjalne kryteria — strona ${t.keyPage} ↗</a><p class="muted" style="font-size:12px">Skrót kryteriów służy nauce. Pełne zasady CKE zawierają również inne metody, uwagi i zasady oceny błędów. Weryfikacja z dokumentem: ${exam.verified}.</p></section></div><div class="exam-controls" style="border-top:1px solid #e2ebed;padding-top:22px;margin-top:24px"><div class="row"><div><label for="taskStatus">Moja ocena opanowania</label><select id="taskStatus"><option value="todo">Jeszcze nie rozwiązane</option><option value="attempted">Próbowałem / próbowałam</option><option value="review">Do powtórki</option><option value="mastered">Potrafię samodzielnie</option></select></div><div><label for="taskScore">Punkty po porównaniu z CKE</label><select id="taskScore">${Array.from({length:t.points+1},(_,i)=>`<option value="${i}">${i} / ${t.points} pkt</option>`).join('')}</select></div></div><p class="muted" style="font-size:12px">Punkty zaznaczasz samodzielnie po sprawdzeniu toku rozumowania, nie tylko wyniku.</p><div class="row spread"><button id="previousTask" ${idx===0?'disabled':''}>← Poprzednie</button><button id="nextTask" ${idx===exam.tasks.length-1?'disabled':''}>Następne →</button></div></div>`;
    $('taskStatus').value=r.status||'todo';$('taskScore').value=String(Math.min(t.points,Number(r.score)||0));$('studyNote').value=r.note||'';
    $('revealSolution').onclick=()=>{revealed=true;$('taskSolution').hidden=false;$('revealSolution').hidden=true;M.math($('studyTask'));};
    $('taskStatus').onchange=e=>{record().status=e.target.value;store();};$('taskScore').onchange=e=>{record().score=Number(e.target.value);store();};
    $('previousTask').onclick=()=>choose(exam.tasks[idx-1].number,true);$('nextTask').onclick=()=>choose(exam.tasks[idx+1].number,true);
    if($('diagramGrid'))$('diagramGrid').onchange=e=>$('taskDiagram').classList.toggle('no-grid',!e.target.checked);
    if($('gardenBase')){const update=(exact)=>{const x=typeof exact==='number'?exact:Number($('gardenBase').value),d=ExamDiagrams.render('garden',x);$('diagramSvg').innerHTML=d.svg;$('diagramCaption').textContent=d.caption;$('gardenValue').textContent=`x = ${x.toFixed(2).replace('.',',')} m; pole ≈ ${(2*x**3/(x*x-16)).toFixed(2).replace('.',',')} m²`;};$('gardenBase').oninput=update;$('gardenMinimum').onclick=()=>{$('gardenBase').value=String(4*Math.sqrt(3));update(4*Math.sqrt(3));};}
    M.math($('studyTask'));draw();updateStats();if(focus){$('activeTaskHeading').focus({preventScroll:true});$('studyTask').scrollIntoView({behavior:'smooth',block:'start'});}
  }
  // Store strokes as normalized vectors, independent of screen size or pixel density.
  function draw(){
    const rect=canvas.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,2),w=rect.width,h=rect.height;
    if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);}
    ctx.setTransform(dpr,0,0,dpr,0,0);ctx.fillStyle='white';ctx.fillRect(0,0,w,h);
    if($('boardGrid').checked){ctx.beginPath();for(let x=0;x<=w;x+=22){ctx.moveTo(x,0);ctx.lineTo(x,h);}for(let y=0;y<=h;y+=22){ctx.moveTo(0,y);ctx.lineTo(w,y);}ctx.strokeStyle='#dce7eb';ctx.lineWidth=1;ctx.stroke();}
    for(const s of [...strokes,...(drawing?[drawing]:[])]){if(!Array.isArray(s.points)||!s.points.length)continue;ctx.beginPath();s.points.forEach((p,i)=>i?ctx.lineTo(p[0]*w,p[1]*h):ctx.moveTo(p[0]*w,p[1]*h));if(s.points.length===1){ctx.lineTo(s.points[0][0]*w+.1,s.points[0][1]*h+.1);}ctx.strokeStyle=s.color;ctx.lineWidth=2.3;ctx.lineJoin=ctx.lineCap='round';ctx.stroke();}
  }
  function pos(e){const r=canvas.getBoundingClientRect();return [Math.max(0,Math.min(1,(e.clientX-r.left)/r.width)),Math.max(0,Math.min(1,(e.clientY-r.top)/r.height))];}
  canvas.onpointerdown=e=>{if(e.button!==0||strokes.length>=100)return;canvas.setPointerCapture(e.pointerId);drawing={color:$('boardColor').value,points:[pos(e)]};draw();};
  canvas.onpointermove=e=>{if(!drawing||drawing.points.length>=1500)return;drawing.points.push(pos(e));draw();};
  function finish(){if(!drawing)return;strokes.push(drawing);drawing=null;record().strokes=strokes;draw();store();}
  canvas.onpointerup=finish;canvas.onpointercancel=finish;
  $('boardGrid').onchange=draw;$('boardUndo').onclick=()=>{strokes.pop();record().strokes=strokes;draw();store();};$('boardClear').onclick=()=>{strokes=[];record().strokes=[];draw();store();};
  function download(blob,name){const u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),1500);}
  $('boardDownload').onclick=()=>canvas.toBlob(blob=>{if(blob)download(blob,`matura-${id}-zadanie-${active.number}.png`);});
  $('studyNote').oninput=()=>{record().note=$('studyNote').value;store();};
  $('studyExport').onclick=()=>{const data={version:1,exam:id,exportedAt:new Date().toISOString(),tasks:Object.fromEntries(exam.tasks.map(t=>[t.number,saved[id+':'+t.number]||{}]))};download(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),`postep-matura-${id}.json`);};
  $('studyImport').onchange=async e=>{
    const file=e.target.files[0];if(!file)return;
    try{
      if(file.size>8*1024*1024)throw new Error('Plik jest większy niż 8 MB.');
      const data=JSON.parse(await file.text());
      if(data.version!==1||data.exam!==id||!data.tasks||typeof data.tasks!=='object'||Array.isArray(data.tasks))throw new Error('Kopia musi dotyczyć obecnie otwartego arkusza.');
      const clean={};
      for(const [n,r] of Object.entries(data.tasks)){
        const t=exam.tasks.find(t=>t.number===n);if(!t||!r||typeof r!=='object'||Array.isArray(r))throw new Error('Nieprawidłowe zadanie w kopii.');
        if(!Object.keys(r).length){clean[id+':'+n]={status:'todo',score:0,note:'',strokes:[]};continue;}
        if(!['todo','attempted','review','mastered'].includes(r.status)||!Number.isInteger(r.score)||r.score<0||r.score>t.points||typeof r.note!=='string'||r.note.length>10000||!Array.isArray(r.strokes)||r.strokes.length>100)throw new Error('Nieprawidłowe dane postępu.');
        for(const s of r.strokes)if(!s||!/^#[0-9a-f]{6}$/i.test(s.color)||!Array.isArray(s.points)||s.points.length>1500||s.points.some(p=>!Array.isArray(p)||p.length!==2||p.some(v=>!Number.isFinite(v)||v<0||v>1)))throw new Error('Nieprawidłowy rysunek w kopii.');
        clean[id+':'+n]={status:r.status,score:r.score,note:r.note,strokes:r.strokes};
      }
      if(!Object.keys(clean).length)throw new Error('Kopia jest pusta.');
      if(!confirm('Wczytać kopię i zastąpić zapisany postęp tego arkusza?'))return;
      const next={...saved};exam.tasks.forEach(t=>delete next[id+':'+t.number]);Object.assign(next,clean);
      if(!M.write('mtp-exam-study-v1',next))throw new Error('Brak miejsca na zapis kopii. Dotychczasowy postęp pozostaje bez zmian.');
      saved=next;choose(active.number);$('studySaveStatus').textContent='Wczytano kopię postępu.';
    }catch(err){$('studySaveStatus').textContent='Nie wczytano kopii: '+err.message;}
    finally{e.target.value='';}
  };
  $('studyPrint').onclick=()=>{if(!revealed)$('revealSolution').click();window.print();};
  $('studyTasks').onclick=e=>{const b=e.target.closest('[data-task]');if(b)choose(b.dataset.task,true);};$('studyTaskFilter').onchange=e=>{filter=e.target.value;updateStats();};
  new ResizeObserver(draw).observe(canvas);
  $('studyLevel').textContent='Poziom '+exam.level;$('studyMeta').textContent=`${exam.tasks.length} zadań i podpunktów · 50 punktów · ${exam.duration} minut`;
  $('studyPdf').href=exam.pdf;$('studyKey').href=exam.key;
  choose(new URLSearchParams(location.search).get('task')||exam.tasks[0].number);
  if('serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});
})();
