(function () {
  'use strict';
  const M = window.MathLearning, root = document.getElementById('practiceLab');
  if (!root || !M) return;
  let topic = 0, seed = 0, current, answered = false, reviewing = false;
  let results = M.read('mtp-practice-v1', {});
  if (!results || typeof results !== 'object' || Array.isArray(results)) results = {};
  root.innerHTML = `<div class="panel"><div class="row spread"><div><p class="eyebrow">Zrozum → rozwiąż → utrwal</p><h2>Twoje laboratorium matematyki</h2><p class="muted">Wpisz własny wynik. Ułamki równoważne i przecinek dziesiętny są akceptowane.</p></div><a class="action" href="egzamin.html">Rozwiązania CKE ↗</a></div><div class="grid"><div><label for="practiceTopic">Dział</label><select id="practiceTopic">${M.topics.map((t,i)=>`<option value="${i}">${t}</option>`).join('')}</select><p id="practiceStats" class="muted" style="margin-top:12px"></p><div class="progress"><span id="practiceBar"></span></div><div class="row" style="margin-top:16px"><button id="practiceReview">Powtórz błędy</button><button id="practiceTheory">Otwórz teorię</button></div><details style="margin-top:22px"><summary>Eksperyment: wierzchołek paraboli</summary><p class="muted">Zmieniaj p w funkcji f(x) = (x − p)² − 2. Wierzchołek to (p, −2).</p><label for="parabolaP">Przesunięcie p: <output id="parabolaValue">0</output></label><input id="parabolaP" type="range" min="-4" max="4" step="0.5" value="0"><svg id="parabola" class="practice-chart" viewBox="0 0 440 260" role="img" aria-label="Wykres paraboli"></svg></details></div><div><p id="practiceQuestion" class="practice-question"></p><form id="practiceForm"><label for="practiceAnswer">Twój wynik (np. −3, 0,6 lub 3/5)</label><div class="practice-answer"><input id="practiceAnswer" type="text" inputmode="text" autocomplete="off" required maxlength="80"><button class="primary" id="practiceCheck">Sprawdź wynik</button></div></form><div class="row" style="margin-top:12px"><button id="practiceHint">Podpowiedź</button><button id="practiceNext">Kolejne zadanie →</button></div><div id="practiceFeedback" class="feedback" role="status" aria-live="polite" hidden></div><details id="practiceSolution" hidden><summary>Rozwiązanie krok po kroku</summary><div id="practiceSteps"></div></details></div></div></div>`;
  const $ = id => document.getElementById(id);
  function stats() {
    const entries = Object.values(results).filter(r=>r.topic===topic);
    const correct = entries.filter(r=>r.correct).length;
    $('practiceStats').textContent = `${correct}/8 wariantów rozwiązanych samodzielnie · ${entries.filter(r=>!r.correct).length} do powtórki`;
    $('practiceBar').style.width = `${correct/8*100}%`;
  }
  function show() {
    current = M.exercise(topic,seed); answered=false;
    $('practiceQuestion').textContent = current.q; M.math($('practiceQuestion'));
    $('practiceAnswer').value=''; $('practiceAnswer').disabled=false; $('practiceCheck').disabled=false;
    $('practiceFeedback').hidden=true; $('practiceSolution').hidden=true;
    $('practiceSteps').replaceChildren(); stats();
  }
  $('practiceTopic').addEventListener('change',e=>{topic=Number(e.target.value);seed=0;reviewing=false;show();});
  $('practiceForm').addEventListener('submit',e=>{
    e.preventDefault(); if(answered)return;
    const correct=M.check($('practiceAnswer').value,current.answer), feedback=$('practiceFeedback');
    feedback.hidden=false;
    if(correct===null){feedback.className='feedback wrong';feedback.textContent='Wpisz liczbę lub ułamek, np. 3/5. Mianownik nie może być zerem.';return;}
    answered=true; $('practiceCheck').disabled=true; $('practiceAnswer').disabled=true;
    // A later error removes mastery; seeing the solution never marks an exercise correct.
    results[current.id]={topic,seed,correct,date:new Date().toISOString()};
    const saved=M.write('mtp-practice-v1',results);
    feedback.className='feedback'+(correct?'':' wrong');
    feedback.textContent=(correct?'Poprawnie! Twój wynik jest równoważny odpowiedzi.':'Jeszcze nie. Przejrzyj rozwiązanie i wróć do zadania w powtórce.')+(saved?'':' Nie udało się zapisać postępu w przeglądarce.');
    current.steps.forEach(s=>{const p=document.createElement('p');p.textContent=s;$('practiceSteps').append(p);});
    M.math($('practiceSteps'));$('practiceSolution').hidden=false;$('practiceSolution').open=!correct;stats();
  });
  $('practiceHint').addEventListener('click',()=>{$('practiceFeedback').hidden=false;$('practiceFeedback').className='feedback';$('practiceFeedback').textContent=current.hint;});
  $('practiceNext').addEventListener('click',()=>{seed=(seed+1)%8;if(reviewing){const errors=Object.values(results).filter(r=>r.topic===topic&&!r.correct);if(errors.length)seed=errors[0].seed;else reviewing=false;}show();});
  $('practiceReview').addEventListener('click',()=>{const errors=Object.values(results).filter(r=>!r.correct);if(!errors.length){$('practiceFeedback').hidden=false;$('practiceFeedback').textContent='Nie masz jeszcze błędów do powtórki. Rozwiąż zadanie lub wybierz inny dział.';return;}reviewing=true;topic=errors[0].topic;seed=errors[0].seed;$('practiceTopic').value=topic;show();});
  $('practiceTheory').addEventListener('click',()=>startLesson(topic));
  function chart(){const p=Number($('parabolaP').value);$('parabolaValue').value=p;const x=v=>220+v*32,y=v=>210-v*20;let d='';for(let i=-6;i<=6;i+=.05){const yy=(i-p)**2-2;if(yy<=10)d+=(d?' L':'M')+`${x(i).toFixed(1)},${y(yy).toFixed(1)}`;}let grid='';for(let i=-6;i<=6;i++)grid+=`<path d="M${x(i)},10V250" stroke="#e1e9e8"/>`;for(let i=-2;i<=10;i+=2)grid+=`<path d="M20,${y(i)}H420" stroke="#e1e9e8"/>`;$('parabola').innerHTML=grid+`<path d="M20,210H420M220,10V250" stroke="#819795"/><path d="${d}" fill="none" stroke="#087f71" stroke-width="3"/><circle cx="${x(p)}" cy="${y(-2)}" r="5" fill="#ed9f42"/><text x="24" y="28">f(x) = (x − ${p})² − 2</text><text x="24" y="48">W = (${p}; −2)</text><text x="407" y="202">x</text><text x="229" y="22">y</text><text x="225" y="226">0</text>`;}
  $('parabolaP').addEventListener('input',chart);chart();show();
  window.addEventListener('load',()=>M.math($('practiceQuestion')));
})();
