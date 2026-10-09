(function(){
  'use strict';
  const M=window.MathLearning,$=id=>document.getElementById(id), catalog=window.ExamCatalog.slice().sort((a,b)=>b.year-a.year);
  let filter='podstawowy',type='all',active=null,elapsed=0,started=null;
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let notes=M.read('mtp-exam-notes-v1',{});
  function render(){
    const exams=catalog.filter(e=>(filter==='all'||(filter==='rozszerzony'?e.examType==='rozszerzony':e.examType!=='rozszerzony'))&&(type==='all'||(type==='sesja'?['sesja','rozszerzony'].includes(e.examType):!['sesja','rozszerzony'].includes(e.examType))));
    $('examCount').textContent=exams.length+' dokumentów';
    $('examList').innerHTML=exams.map(e=>`<article class="panel"><div class="row spread"><span class="tag">FORMUŁA ${esc(e.formula)}</span><span class="muted">${esc(e.date)}</span></div><h2 style="margin-top:16px;font-size:21px">${esc(e.title)}</h2><p class="muted">Oryginalna treść zadań, rysunki i punktacja w dokumentach CKE.</p><div class="row"><a class="action primary" href="${esc(e.pdfPath)}" target="_blank" rel="noopener">Otwórz arkusz PDF ↗</a><a class="action" href="${esc(e.zasadyPath)}" target="_blank" rel="noopener">Zasady oceniania ↗</a>${e.solutions?`<a class="action primary" href="egzamin.html?exam=${esc(e.solutions)}">Rozwiązania krok po kroku →</a>`:""}<button data-exam="${esc(e.pdfPath)}">Sesja pracy</button></div></article>`).join('');
  }
  $('examLevel').addEventListener('change',e=>{filter=e.target.value;render();});$('examType').addEventListener('change',e=>{type=e.target.value;render();});
  $('examList').addEventListener('click',e=>{const b=e.target.closest('[data-exam]');if(!b)return;active=catalog.find(x=>x.pdfPath===b.dataset.exam);$('examSession').hidden=false;$('examSessionTitle').textContent=active.title;$('examNote').value=notes[active.pdfPath]||'';$('examViewerLink').href=active.pdfPath;$('examKeyLink').href=active.zasadyPath;$('examViewer').removeAttribute('data');$('examPreview').hidden=true;elapsed=0;started=null;$('examTimerToggle').textContent='Start';timer();$('examSession').scrollIntoView({behavior:'smooth',block:'start'});});
  $('examPreviewToggle').addEventListener('click',()=>{const open=$('examPreview').hidden;$('examPreview').hidden=!open;$('examPreviewToggle').textContent=open?'Zamknij podgląd':'Podgląd PDF';if(open)$('examViewer').data=active.pdfPath;});
  $('examNote').addEventListener('input',()=>{if(!active)return;notes[active.pdfPath]=$('examNote').value;const ok=M.write('mtp-exam-notes-v1',notes);$('examStatus').textContent=ok?'Notatka zapisana w tej przeglądarce.':'Nie udało się zapisać notatki.';});
  $('examNoteExport').addEventListener('click',()=>{if(!active)return;const blob=new Blob([active.title+'\n\n'+$('examNote').value],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='notatka-arkusz.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
  function timer(){const n=Math.floor((elapsed+(started?Date.now()-started:0))/1000);$('examTimer').textContent=String(Math.floor(n/60)).padStart(2,'0')+':'+String(n%60).padStart(2,'0');}
  $('examTimerToggle').addEventListener('click',()=>{if(started){elapsed+=Date.now()-started;started=null;}else started=Date.now();$('examTimerToggle').textContent=started?'Pauza':'Start';timer();});setInterval(timer,1000);
  render();if('serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});
})();
