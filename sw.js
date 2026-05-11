// ================================================================
// SERVICE WORKER — MatematykaToPodstawa
// Strategia: Cache-first dla zasobów lokalnych, sieć dla CDN.
// Strona działa w pełni offline po pierwszym odwiedzeniu.
// ================================================================

var CACHE = 'mtp-v16';

// Dynamically derive base path so the SW works both on GitHub Pages
// (hosted at /MatematykaToPodstawa/) and on a custom domain root (/).
var BASE = self.location.pathname.replace('/sw.js', '');

var LOCAL_ASSETS = [
  BASE + '/',
  BASE + '/index.html',
  BASE + '/kurs.html',
  BASE + '/quiz.html',
  BASE + '/wzory.html',
  BASE + '/zadania.html',
  BASE + '/postep.html',
  BASE + '/fiszki.html',
  BASE + '/arkusze.html',
  BASE + '/404.html',
  BASE + '/dzialy/ciagi.html',
  BASE + '/dzialy/funkcje.html',
  BASE + '/dzialy/geometria-analityczna.html',
  BASE + '/dzialy/liczby-rzeczywiste.html',
  BASE + '/dzialy/liczby-zespolone.html',
  BASE + '/dzialy/planimetria.html',
  BASE + '/dzialy/prawdopodobienstwo.html',
  BASE + '/dzialy/rownania.html',
  BASE + '/dzialy/stereometria.html',
  BASE + '/dzialy/trygonometria.html',
  BASE + '/dzialy/wyrazenia-algebraiczne.html',
  BASE + '/dzialy/granice.html',
  BASE + '/dzialy/pochodne.html',
  BASE + '/dzialy/wielomiany.html',
  BASE + '/dzialy/dowodzenie.html',
  BASE + '/dzialy/wektory.html',
  BASE + '/assets/styles.css',
  BASE + '/assets/dark-mode.js',
  BASE + '/assets/notepad.js',
  BASE + '/assets/fontsize.js',
  BASE + '/assets/recent.js',
  BASE + '/assets/visits.js',
  BASE + '/assets/content.js',
  BASE + '/assets/topic-page.js',
  BASE + '/assets/load-exam-data.js',
  BASE + '/assets/level-switcher.js',
  BASE + '/assets/search.js',
  BASE + '/assets/study-timer.js',
  BASE + '/assets/scroll-top.js',
  BASE + '/assets/quiz-generator.js',
  BASE + '/manifest.json'
];

// ---- INSTALL: pobierz i zapisz wszystkie lokalne zasoby ----
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(LOCAL_ASSETS);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

// ---- ACTIVATE: usuń stare cache'y ----
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE; })
          .map(function (k) { return caches.delete(k); })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

// ---- FETCH: Cache-first dla lokalnych, network dla CDN ----
self.addEventListener('fetch', function (e) {
  var url = new URL(e.request.url);

  // Tylko GET
  if (e.request.method !== 'GET') return;

  // CDN / zewnętrzne: network-first, fallback do cache
  if (url.origin !== self.location.origin) {
    e.respondWith(
      fetch(e.request)
        .then(function (resp) {
          var clone = resp.clone();
          caches.open(CACHE).then(function (c) { c.put(e.request, clone); });
          return resp;
        })
        .catch(function () {
          return caches.match(e.request);
        })
    );
    return;
  }

  // Lokalne zasoby: cache-first
  e.respondWith(
    caches.match(e.request).then(function (cached) {
      var fresh = fetch(e.request).then(function (resp) {
        caches.open(CACHE).then(function (c) { c.put(e.request, resp.clone()); });
        return resp;
      });
      return cached || fresh;
    })
  );
});
