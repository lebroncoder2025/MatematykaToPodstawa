// ================================================================
// RECENT PAGES — śledzi ostatnio odwiedzone strony
// Zapisuje do localStorage 'mtp-recent' (max 5 wpisów)
// Na index.html wyświetla sekcję "Ostatnio odwiedzone"
// ================================================================
(function () {
  var PAGE_NAMES = {
    'index.html':                   { label: 'Strona główna',        icon: 'fa-house',                    color: 'text-blue-500' },
    'kurs.html':                    { label: 'Kurs',                  icon: 'fa-graduation-cap',            color: 'text-purple-500' },
    'quiz.html':                    { label: 'Quiz',                  icon: 'fa-brain',                    color: 'text-green-500' },
    'wzory.html':                   { label: 'Wzory',                 icon: 'fa-square-root-variable',     color: 'text-cyan-500' },
    'zadania.html':                 { label: 'Zadania',               icon: 'fa-pen-to-square',            color: 'text-emerald-500' },
    'postep.html':                  { label: 'Postęp',                icon: 'fa-chart-line',               color: 'text-indigo-500' },
    'arkusze.html':                 { label: 'Arkusze CKE',           icon: 'fa-file-lines',               color: 'text-rose-500' },
    'ciagi.html':                   { label: 'Ciągi',                 icon: 'fa-infinity',                 color: 'text-amber-500' },
    'funkcje.html':                 { label: 'Funkcje',               icon: 'fa-chart-line',               color: 'text-pink-500' },
    'geometria-analityczna.html':   { label: 'Geometria analityczna', icon: 'fa-compass-drafting',         color: 'text-teal-500' },
    'liczby-rzeczywiste.html':      { label: 'Liczby rzeczywiste',    icon: 'fa-hashtag',                  color: 'text-orange-500' },
    'planimetria.html':             { label: 'Planimetria',           icon: 'fa-draw-polygon',             color: 'text-violet-500' },
    'prawdopodobienstwo.html':      { label: 'Prawdopodobieństwo',    icon: 'fa-dice',                     color: 'text-red-500' },
    'rownania.html':                { label: 'Równania',              icon: 'fa-equals',                   color: 'text-sky-500' },
    'stereometria.html':            { label: 'Stereometria',          icon: 'fa-cube',                     color: 'text-lime-600' },
    'trygonometria.html':           { label: 'Trygonometria',         icon: 'fa-circle-half-stroke',       color: 'text-fuchsia-500' },
    'wyrazenia-algebraiczne.html':  { label: 'Wyrażenia algebraiczne',icon: 'fa-calculator',               color: 'text-yellow-600' },
  };

  // Pobierz nazwę bieżącej strony
  var path = window.location.pathname;
  var pageName = path.split('/').pop() || 'index.html';
  if (!pageName || pageName === '') pageName = 'index.html';

  // Zapisz bieżącą stronę (pomija index.html żeby nie zaśmiecać)
  if (pageName !== 'index.html' && PAGE_NAMES[pageName]) {
    var recent = _loadRecent();
    // Usuń duplikat jeśli już jest
    recent = recent.filter(function (r) { return r.page !== pageName; });
    recent.unshift({ page: pageName, ts: Date.now() });
    if (recent.length > 5) recent = recent.slice(0, 5);
    _saveRecent(recent);
  }

  // Na index.html — renderuj sekcję "Ostatnio odwiedzone"
  if (pageName === 'index.html' || path === '/' || path.endsWith('/index.html')) {
    document.addEventListener('DOMContentLoaded', function () {
      var recent = _loadRecent();
      if (!recent.length) return;
      var container = document.getElementById('recentPagesSection');
      if (!container) return;
      container.style.display = '';
      var list = document.getElementById('recentPagesList');
      if (!list) return;
      list.innerHTML = recent.map(function (r) {
        var info = PAGE_NAMES[r.page] || { label: r.page, icon: 'fa-circle', color: 'text-gray-400' };
        var href = _isInDzialy(r.page) ? 'dzialy/' + r.page : r.page;
        var ago = _timeAgo(r.ts);
        return '<a href="' + href + '" class="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition group">' +
          '<div class="w-9 h-9 rounded-lg bg-gray-50 group-hover:bg-white flex items-center justify-center flex-shrink-0 transition">' +
            '<i class="fa-solid ' + info.icon + ' ' + info.color + '"></i>' +
          '</div>' +
          '<div class="min-w-0">' +
            '<p class="font-bold text-gray-800 text-sm truncate">' + info.label + '</p>' +
            '<p class="text-xs text-gray-400">' + ago + '</p>' +
          '</div>' +
          '<i class="fa-solid fa-chevron-right text-gray-300 group-hover:text-blue-400 text-xs ml-auto transition"></i>' +
        '</a>';
      }).join('');
    });
  }

  function _isInDzialy(page) {
    var dzialy = ['ciagi', 'funkcje', 'geometria-analityczna', 'liczby-rzeczywiste',
      'planimetria', 'prawdopodobienstwo', 'rownania', 'stereometria',
      'trygonometria', 'wyrazenia-algebraiczne'];
    return dzialy.some(function (d) { return page.indexOf(d) !== -1; });
  }

  function _timeAgo(ts) {
    var diff = Math.floor((Date.now() - ts) / 1000);
    if (diff < 60) return 'przed chwilą';
    if (diff < 3600) return 'ok. ' + Math.floor(diff / 60) + ' min temu';
    if (diff < 86400) return 'ok. ' + Math.floor(diff / 3600) + ' godz. temu';
    return Math.floor(diff / 86400) + ' dni temu';
  }

  function _loadRecent() {
    try { return JSON.parse(localStorage.getItem('mtp-recent') || '[]'); } catch (e) { return []; }
  }
  function _saveRecent(arr) {
    try { localStorage.setItem('mtp-recent', JSON.stringify(arr)); } catch (e) {}
  }
})();
