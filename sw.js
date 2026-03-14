// ================================================================
// SERVICE WORKER — MatematykaToPodstawa
// Strategia: Cache-first dla zasobów lokalnych, sieć dla CDN.
// Strona działa w pełni offline po pierwszym odwiedzeniu.
// ================================================================

var CACHE = 'mtp-v3';

var LOCAL_ASSETS = [
  '/',
  '/index.html',
  '/kurs.html',
  '/quiz.html',
  '/wzory.html',
  '/zadania.html',
  '/postep.html',
  '/arkusze.html',
  '/404.html',
  '/dzialy/ciagi.html',
  '/dzialy/funkcje.html',
  '/dzialy/geometria-analityczna.html',
  '/dzialy/liczby-rzeczywiste.html',
  '/dzialy/planimetria.html',
  '/dzialy/prawdopodobienstwo.html',
  '/dzialy/rownania.html',
  '/dzialy/stereometria.html',
  '/dzialy/trygonometria.html',
  '/dzialy/wyrazenia-algebraiczne.html',
  '/assets/styles.css',
  '/assets/dark-mode.js',
  '/assets/notepad.js',
  '/assets/fontsize.js',
  '/assets/content.js',
  '/assets/topic-page.js',
  '/assets/load-exam-data.js',
  '/manifest.json'
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
