
(function(){
'use strict';
const $=id=>document.getElementById(id);
let storageAvailable=true;
function read(key,fallback){try{const value=JSON.parse(localStorage.getItem(key));return value===null?fallback:value;}catch(e){return fallback;}}
let level='podstawowy';try{if(localStorage.getItem('matura-level')==='rozszerzony')level='rozszerzony';}catch(e){storageAvailable=false;}
const advanced=new Set(['granice','pochodne','wielomiany','dowodzenie','wektory']);
const topics=Object.entries(window.MATURA_TOPICS||{});
const normalize=text=>text.toLocaleLowerCase('pl').normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/ł/g,'l');
function renderTopics(){
const query=normalize($('topicSearch').value.trim());
const visible=topics.filter(([key,data])=>(level==='rozszerzony'||!advanced.has(key))&&normalize(data.title+" "+key).includes(query));
$('topicCards').replaceChildren();
visible.forEach(([key,data],index)=>{
const link=document.createElement('a');link.href='dzialy/'+key+'.html';link.className='topic-card';
const number=document.createElement('small');number.className='topic-number';number.textContent=String(topics.findIndex(t=>t[0]===key)+1).padStart(2,'0');
const title=document.createElement('strong');title.textContent=data.title;
const badge=document.createElement('small');badge.textContent=advanced.has(key)?'ROZSZERZENIE':'FUNDAMENTY';
const action=document.createElement('span');action.textContent='Teoria i przykłady →';
link.append(number,title,badge,action);$('topicCards').append(link);
});
$('topicCount').textContent='Znalezione działy: '+visible.length;
$('topicEmpty').hidden=visible.length>0;
}
function applyLevel(){
document.querySelectorAll('[data-study-level]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.studyLevel===level)));
$('levelDescription').textContent=level==='rozszerzony'?'Rozszerzenie: dodatkowe działy i arkusz rozszerzony. Fundamenty pozostają dostępne.':'Podstawa: fundamenty, kurs krok po kroku i arkusz podstawowy.';
$('topicDescription').textContent=level==='rozszerzony'?'Fundamenty i dodatkowe zagadnienia rozszerzenia. Wybierz dział, który chcesz powtórzyć.':'Dziesięć działów kompendium. Każdy zawiera teorię i rozwiązane przykłady.';
const url='egzamin.html?exam='+(level==='rozszerzony'?'2026_rozszerzony':'2026');
$('heroExam').href=url;$('pathExam').href=url;
renderTopics();
}
document.querySelectorAll('[data-study-level]').forEach(button=>button.addEventListener('click',()=>{
level=button.dataset.studyLevel;try{localStorage.setItem('matura-level',level);}catch(e){storageAvailable=false;notice();}applyLevel();
}));
$('topicSearch').addEventListener('input',renderTopics);
function notice(){if(!storageAvailable)$('storageNotice').textContent='Zapis w tej przeglądarce jest niedostępny. Nauka działa, ale postęp może nie zostać zachowany.';}
function progress(){
const course=read('kurs_state',{}),modules=window.MathCourse||[];
const done=modules.reduce((sum,module,index)=>{
const value=Number(course?.modProgress?.[index]?.done);
return sum+(Number.isFinite(value)?Math.min(module.steps.length,Math.max(0,Math.floor(value))):0);
},0);
const total=modules.reduce((sum,module)=>sum+module.steps.length,0);
const practice=read('mtp-practice-v1',{});
const mastered=practice&&typeof practice==='object'?Object.entries(practice).filter(([key,value])=>/^[0-9]+:[0-9]+$/.test(key)&&value?.correct===true&&Number.isInteger(value.topic)&&value.topic>=0&&value.topic<10&&Number.isInteger(value.seed)&&value.seed>=0&&value.seed<8).length:0;
const solved=read('zadaniaSolvedIds',[]);
const known=new Set((window.MathTasks||[]).map(task=>String(task.id)));
const solvedCount=Array.isArray(solved)?new Set(solved.map(String).filter(id=>known.has(id))).size:0;
$('courseSteps').textContent=done+'/'+total;
$('practiceSolved').textContent=Math.min(mastered,80)+'/80';
$('tasksSolved').textContent=solvedCount+'/'+known.size;
$('continueCourse').textContent=done>0?'Wróć do kursu →':'Zacznij kurs →';
$('progressIntro').textContent=done||mastered||solvedCount?'Masz już zapisane wyniki. Wróć do nauki lub wybierz temat do powtórki.':'Zacznij od jednego tematu i krótkiej serii zadań.';
}
applyLevel();progress();notice();
window.addEventListener('storage',()=>{progress();try{level=localStorage.getItem('matura-level')==='rozszerzony'?'rozszerzony':'podstawowy';}catch(e){}applyLevel();});
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
})();
