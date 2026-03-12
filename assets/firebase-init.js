// ================================================================
// FIREBASE INIT — MatematykaToPodstawa
// ================================================================
// Aby włączyć konta użytkowników i synchronizację danych między
// urządzeniami wykonaj poniższe kroki:
//
// 1. Wejdź na https://console.firebase.google.com
// 2. Kliknij "Utwórz projekt" → nadaj nazwę → kontynuuj
// 3. W projekcie kliknij ikonę </> (Aplikacja webowa) → zarejestruj
// 4. Skopiuj obiekt firebaseConfig i wklej poniżej w _cfg
// 5. Authentication → Sign-in method → E-mail/hasło → Włącz
// 6. Firestore Database → Utwórz bazę → Tryb produkcji (production)
// 7. Firestore → Reguły → zastąp całość poniższymi i kliknij Opublikuj:
//
//   rules_version = '2';
//   service cloud.firestore {
//     match /databases/{database}/documents {
//       match /users/{userId} {
//         allow read, write: if request.auth != null
//                            && request.auth.uid == userId;
//       }
//     }
//   }
//
// WAŻNE: Klucz apiKey NIE jest sekretem — to identyfikator projektu.
// Bezpieczeństwo danych zapewniają reguły Firestore (powyżej),
// które gwarantują że każdy użytkownik widzi TYLKO swoje dane.
// ================================================================

(function () {
  // ↓↓↓ Wklej tutaj swój config z Firebase Console ↓↓↓
  var _cfg = {
    apiKey:            'YOUR_API_KEY',
    authDomain:        'YOUR_PROJECT.firebaseapp.com',
    projectId:         'YOUR_PROJECT_ID',
    storageBucket:     'YOUR_PROJECT.appspot.com',
    messagingSenderId: 'YOUR_MESSAGING_ID',
    appId:             'YOUR_APP_ID'
  };
  // ↑↑↑ koniec konfiguracji ↑↑↑

  if (_cfg.apiKey === 'YOUR_API_KEY') {
    // Nie skonfigurowano — funkcje kont wyłączone, strona działa normalnie
    window._fbReady = false;
    return;
  }

  var SDK = 'https://www.gstatic.com/firebasejs/10.11.0/';
  var pkgs = [
    'firebase-app-compat.js',
    'firebase-auth-compat.js',
    'firebase-firestore-compat.js'
  ];
  var idx = 0;

  function loadNext() {
    if (idx >= pkgs.length) {
      try {
        if (!firebase.apps.length) firebase.initializeApp(_cfg);
        window._fbAuth = firebase.auth();
        window._fbDb   = firebase.firestore();
        window._fbReady = true;
        document.dispatchEvent(new Event('fb-ready'));
      } catch (e) {
        console.warn('[MTP Auth] Firebase init failed:', e);
        window._fbReady = false;
      }
      return;
    }
    var s = document.createElement('script');
    s.src = SDK + pkgs[idx++];
    s.onload = loadNext;
    s.onerror = function () { console.warn('[MTP Auth] Failed to load SDK'); window._fbReady = false; };
    document.head.appendChild(s);
  }

  loadNext();
})();
