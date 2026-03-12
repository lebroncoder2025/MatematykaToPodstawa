// ================================================================
// AUTH — obsługa kont użytkowników MTP
// Wstrzykuje przycisk logowania do nawa + modal na każdej stronie.
// Plik musi być załadowany po firebase-init.js i db-sync.js
// ================================================================
(function () {

  /* ----------------------------------------------------------------
     TOAST — globalne powiadomienia
  ---------------------------------------------------------------- */
  window.mtpToast = function (msg, type) {
    var colors = { success: '#10b981', error: '#ef4444', info: '#3b82f6', warn: '#f59e0b' };
    var t = document.createElement('div');
    t.style.cssText =
      'position:fixed;bottom:1.75rem;left:50%;transform:translateX(-50%) translateY(0);' +
      'background:' + (colors[type] || colors.info) + ';color:#fff;' +
      'padding:.55rem 1.4rem;border-radius:9999px;font-size:.82rem;font-weight:600;' +
      'z-index:99999;box-shadow:0 4px 18px rgba(0,0,0,.28);pointer-events:none;' +
      'white-space:nowrap;animation:_mtpFadeIn .22s ease;';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () {
      t.style.transition = 'opacity .35s,transform .35s';
      t.style.opacity = '0';
      t.style.transform = 'translateX(-50%) translateY(6px)';
    }, 2500);
    setTimeout(function () { if (t.parentNode) t.remove(); }, 2900);
  };

  /* ----------------------------------------------------------------
     STYLE — modal + animacje + dark-mode overlay
  ---------------------------------------------------------------- */
  var css = [
    '@keyframes _mtpFadeIn{from{opacity:0;transform:translateX(-50%) translateY(8px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}',
    '@keyframes _mtpSlideIn{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}',
    '#mtpAuthModal{display:none;position:fixed;inset:0;z-index:10000;',
      'background:rgba(15,23,42,.65);backdrop-filter:blur(5px);',
      'align-items:center;justify-content:center;}',
    '#mtpAuthModal.open{display:flex;}',
    '#mtpAuthBox{background:#fff;border-radius:1.5rem;padding:2rem;',
      'width:min(420px,95vw);box-shadow:0 24px 64px rgba(0,0,0,.32);',
      'position:relative;animation:_mtpSlideIn .22s ease;}',
    'html.dark-mode #mtpAuthBox{background:#1e293b;color:#f1f5f9;}',
    'html.dark-mode #mtpAuthBox input{background:#0f172a;color:#f1f5f9;border-color:#334155;}',
    'html.dark-mode #mtpAuthBox input::placeholder{color:#94a3b8;}',
    'html.dark-mode #mtpSyncInfoBox{background:#064e3b!important;color:#6ee7b7!important;}',
    '.mtp-input{width:100%;border:1.5px solid #e2e8f0;border-radius:.75rem;',
      'padding:.65rem 1rem;margin-bottom:.75rem;font-size:.875rem;outline:none;',
      'box-sizing:border-box;transition:border-color .15s;}',
    '.mtp-input:focus{border-color:#3b82f6;box-shadow:0 0 0 3px rgba(59,130,246,.12);}',
    '.mtp-btn{width:100%;padding:.7rem;border:none;border-radius:.75rem;',
      'font-weight:700;font-size:.875rem;cursor:pointer;transition:opacity .15s;}',
    '.mtp-btn:disabled{opacity:.55;cursor:not-allowed;}',
    '.mtp-btn-blue{background:#3b82f6;color:#fff;}',
    '.mtp-btn-green{background:#10b981;color:#fff;}',
    '.mtp-btn-red{background:#fee2e2;color:#dc2626;}',
    '#mtpErrMsg{display:none;background:#fee2e2;color:#dc2626;border-radius:.75rem;',
      'padding:.55rem .9rem;font-size:.78rem;margin-bottom:.9rem;line-height:1.45;}',
    '#mtpNavAuthBtn,#mtpNavAuthBtnD{transition:all .2s;}',
  ].join('');
  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ----------------------------------------------------------------
     MODAL HTML
  ---------------------------------------------------------------- */
  function buildModal() {
    var el = document.createElement('div');
    el.id = 'mtpAuthModal';
    el.innerHTML =
      '<div id="mtpAuthBox">' +
        /* Close button */
        '<button onclick="mtpAuth.close()" style="position:absolute;top:.75rem;right:.9rem;' +
          'background:none;border:none;font-size:1.5rem;color:#94a3b8;cursor:pointer;line-height:1;">' +
          '&times;</button>' +

        /* ---- LOGGED-OUT VIEW ---- */
        '<div id="mtpAuthLoggedOut">' +
          '<h2 style="font-size:1.2rem;font-weight:800;color:inherit;margin-bottom:.2rem;">' +
            '<i class="fa-solid fa-circle-user" style="color:#3b82f6;margin-right:.35rem;"></i>' +
            'Konto MTP</h2>' +
          '<p style="font-size:.78rem;color:#64748b;margin-bottom:1.25rem;">' +
            'Zaloguj się, aby Twoje notatki, postęp i ulubione<br>' +
            'były zsynchronizowane na wszystkich urządzeniach.</p>' +

          /* Tabs */
          '<div style="display:flex;gap:.5rem;margin-bottom:1.25rem;">' +
            '<button id="mtpTabLoginBtn" class="mtp-btn mtp-btn-blue" style="margin-bottom:0;width:50%;"' +
              ' onclick="mtpAuth.tab(\'login\')">Zaloguj się</button>' +
            '<button id="mtpTabRegBtn" class="mtp-btn" style="margin-bottom:0;width:50%;background:#fff;' +
              'border:1.5px solid #e2e8f0;color:#64748b;" onclick="mtpAuth.tab(\'reg\')">Zarejestruj</button>' +
          '</div>' +

          '<div id="mtpErrMsg"></div>' +

          /* Login form */
          '<div id="mtpFormLogin">' +
            '<input id="mtpLEmail" type="email" class="mtp-input" placeholder="Adres e-mail" autocomplete="email">' +
            '<input id="mtpLPass"  type="password" class="mtp-input" placeholder="Has\u0142o" autocomplete="current-password">' +
            '<button id="mtpBtnLogin" class="mtp-btn mtp-btn-blue" onclick="mtpAuth.login()">Zaloguj si\u0119</button>' +
            '<p style="text-align:center;font-size:.75rem;color:#94a3b8;margin-top:.75rem;">' +
              '<a href="#" onclick="mtpAuth.resetPwd();return false;" ' +
                'style="color:#3b82f6;text-decoration:none;">Zapomniane has\u0142o?</a></p>' +
          '</div>' +

          /* Register form */
          '<div id="mtpFormReg" style="display:none;">' +
            '<input id="mtpREmail"  type="email" class="mtp-input" placeholder="Adres e-mail" autocomplete="email">' +
            '<input id="mtpRPass"   type="password" class="mtp-input" placeholder="Has\u0142o (min. 6 znak\u00f3w)" autocomplete="new-password">' +
            '<input id="mtpRPass2"  type="password" class="mtp-input" placeholder="Powt\u00f3rz has\u0142o" autocomplete="new-password">' +
            '<button id="mtpBtnReg" class="mtp-btn mtp-btn-green" onclick="mtpAuth.register()">Utw\u00f3rz konto</button>' +
          '</div>' +
        '</div>' +

        /* ---- LOGGED-IN VIEW ---- */
        '<div id="mtpAuthLoggedIn" style="display:none;">' +
          '<h2 style="font-size:1.2rem;font-weight:800;color:inherit;margin-bottom:1rem;">' +
            '<i class="fa-solid fa-circle-user" style="color:#10b981;margin-right:.35rem;"></i>' +
            'Moje konto</h2>' +
          '<div id="mtpSyncInfoBox" style="background:#f0fdf4;border-radius:.75rem;padding:.9rem 1rem;margin-bottom:1rem;">' +
            '<p id="mtpProfileEmail" style="font-size:.85rem;font-weight:700;color:#065f46;"></p>' +
            '<p id="mtpSyncStatus" style="font-size:.75rem;color:#34d399;margin-top:.2rem;">Gotowy do synchronizacji</p>' +
          '</div>' +
          '<button class="mtp-btn mtp-btn-blue" style="margin-bottom:.75rem;" onclick="mtpAuth.syncNow()">' +
            '<i class="fa-solid fa-rotate"></i> Synchronizuj teraz</button>' +
          '<button class="mtp-btn mtp-btn-red" onclick="mtpAuth.logout()">' +
            '<i class="fa-solid fa-right-from-bracket"></i> Wyloguj si\u0119</button>' +
          '<p style="font-size:.7rem;color:#94a3b8;margin-top:.75rem;text-align:center;">' +
            'Dane synchronizuj\u0105 si\u0119 automatycznie co 60s i przy zamkni\u0119ciu strony.</p>' +
        '</div>' +
      '</div>';
    document.body.appendChild(el);

    // Close on backdrop click
    el.addEventListener('click', function (e) {
      if (e.target === el) mtpAuth.close();
    });
    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') mtpAuth.close();
    });
  }

  /* ----------------------------------------------------------------
     NAV BUTTON INJECTION
  ---------------------------------------------------------------- */
  function injectNavBtn() {
    // Mobile: insert before hamburger
    var hamburger = document.getElementById('hamburger');
    if (hamburger) {
      var mBtn = document.createElement('button');
      mBtn.id = 'mtpNavAuthBtn';
      mBtn.onclick = function () { mtpAuth.open(); };
      mBtn.title = 'Konto';
      mBtn.style.cssText =
        'background:none;border:1.5px solid #e2e8f0;border-radius:50%;' +
        'width:34px;height:34px;display:flex;align-items:center;justify-content:center;' +
        'cursor:pointer;margin-right:.4rem;flex-shrink:0;';
      mBtn.innerHTML = '<i class="fa-regular fa-user" style="font-size:.85rem;color:#64748b;"></i>';
      hamburger.parentNode.insertBefore(mBtn, hamburger);
    }

    // Desktop: append to the hidden-md:flex links row
    var desktopRow = document.querySelector('nav .\\hidden');
    if (!desktopRow) {
      // fallback broader selector
      var allNavDivs = document.querySelectorAll('nav div');
      for (var i = 0; i < allNavDivs.length; i++) {
        if (allNavDivs[i].className && allNavDivs[i].className.indexOf('hidden') !== -1 &&
            allNavDivs[i].className.indexOf('md:flex') !== -1) {
          desktopRow = allNavDivs[i];
          break;
        }
      }
    }
    if (desktopRow) {
      var dBtn = document.createElement('button');
      dBtn.id = 'mtpNavAuthBtnD';
      dBtn.onclick = function () { mtpAuth.open(); };
      dBtn.title = 'Konto';
      dBtn.style.cssText =
        'display:inline-flex;align-items:center;gap:.35rem;background:none;' +
        'border:1.5px solid #e2e8f0;border-radius:9999px;padding:.3rem .85rem;' +
        'cursor:pointer;font-size:.8rem;font-weight:600;color:#64748b;';
      dBtn.innerHTML = '<i class="fa-regular fa-user"></i><span id="mtpNavLabel">Zaloguj</span>';
      desktopRow.appendChild(dBtn);
    }
  }

  /* ----------------------------------------------------------------
     UPDATE NAV APPEARANCE
  ---------------------------------------------------------------- */
  function updateNav(user) {
    var mBtn = document.getElementById('mtpNavAuthBtn');
    var dBtn = document.getElementById('mtpNavAuthBtnD');
    var label = document.getElementById('mtpNavLabel');
    if (user) {
      var nick = user.email.split('@')[0];
      if (label) label.textContent = nick;
      if (dBtn) {
        dBtn.style.background = '#f0fdf4';
        dBtn.style.borderColor = '#86efac';
        dBtn.style.color = '#065f46';
        dBtn.querySelector('i').className = 'fa-solid fa-user-check';
      }
      if (mBtn) {
        mBtn.style.borderColor = '#86efac';
        mBtn.innerHTML = '<i class="fa-solid fa-user-check" style="font-size:.85rem;color:#10b981;"></i>';
      }
    } else {
      if (label) label.textContent = 'Zaloguj';
      if (dBtn) {
        dBtn.style.background = 'none';
        dBtn.style.borderColor = '#e2e8f0';
        dBtn.style.color = '#64748b';
        dBtn.querySelector('i').className = 'fa-regular fa-user';
      }
      if (mBtn) {
        mBtn.style.borderColor = '#e2e8f0';
        mBtn.innerHTML = '<i class="fa-regular fa-user" style="font-size:.85rem;color:#64748b;"></i>';
      }
    }
  }

  /* ----------------------------------------------------------------
     PUBLIC API — window.mtpAuth
  ---------------------------------------------------------------- */
  window.mtpAuth = {
    open: function () {
      var modal = document.getElementById('mtpAuthModal');
      if (!modal) return;
      modal.classList.add('open');
      if (window._fbReady === false) {
        _showErr(
          'Konta użytkowników nie są jeszcze skonfigurowane. ' +
          'Administrator strony musi uzupełnić plik assets/firebase-init.js.'
        );
      }
    },
    close: function () {
      var modal = document.getElementById('mtpAuthModal');
      if (modal) modal.classList.remove('open');
    },
    tab: function (t) {
      var isLogin = t === 'login';
      _el('mtpFormLogin').style.display = isLogin ? '' : 'none';
      _el('mtpFormReg').style.display   = isLogin ? 'none' : '';
      var tl = _el('mtpTabLoginBtn'), tr = _el('mtpTabRegBtn');
      if (tl) {
        tl.style.cssText = isLogin
          ? 'margin-bottom:0;width:50%;background:#3b82f6;color:#fff;border:none;padding:.7rem;border-radius:.75rem;font-weight:700;font-size:.875rem;cursor:pointer;'
          : 'margin-bottom:0;width:50%;background:#fff;border:1.5px solid #e2e8f0;color:#64748b;padding:.7rem;border-radius:.75rem;font-weight:700;font-size:.875rem;cursor:pointer;';
      }
      if (tr) {
        tr.style.cssText = isLogin
          ? 'margin-bottom:0;width:50%;background:#fff;border:1.5px solid #e2e8f0;color:#64748b;padding:.7rem;border-radius:.75rem;font-weight:700;font-size:.875rem;cursor:pointer;'
          : 'margin-bottom:0;width:50%;background:#10b981;color:#fff;border:none;padding:.7rem;border-radius:.75rem;font-weight:700;font-size:.875rem;cursor:pointer;';
      }
      _hideErr();
    },
    login: function () {
      if (!window._fbAuth) { _showErr('Firebase nie jest skonfigurowany.'); return; }
      var email = _val('mtpLEmail'), pass = _val('mtpLPass');
      if (!email || !pass) { _showErr('Wypełnij wszystkie pola.'); return; }
      _setBusy('mtpBtnLogin', true);
      _hideErr();
      window._fbAuth.signInWithEmailAndPassword(email, pass)
        .then(function () { mtpAuth.close(); })
        .catch(function (e) {
          _showErr(_fbMsg(e.code) || e.message);
          _setBusy('mtpBtnLogin', false);
        });
    },
    register: function () {
      if (!window._fbAuth) { _showErr('Firebase nie jest skonfigurowany.'); return; }
      var email = _val('mtpREmail'), pass = _val('mtpRPass'), pass2 = _val('mtpRPass2');
      if (!email || !pass || !pass2) { _showErr('Wypełnij wszystkie pola.'); return; }
      if (pass !== pass2) { _showErr('Hasła nie są identyczne.'); return; }
      if (pass.length < 6) { _showErr('Hasło musi mieć minimum 6 znaków.'); return; }
      _setBusy('mtpBtnReg', true);
      _hideErr();
      window._fbAuth.createUserWithEmailAndPassword(email, pass)
        .then(function () {
          mtpAuth.close();
          window.mtpToast('Konto utworzone! Witaj \uD83C\uDF89', 'success');
        })
        .catch(function (e) {
          _showErr(_fbMsg(e.code) || e.message);
          _setBusy('mtpBtnReg', false);
        });
    },
    logout: function () {
      if (!window._fbAuth) return;
      if (window.mtpSync) window.mtpSync.save(true);
      window._fbAuth.signOut().then(function () {
        mtpAuth.close();
        window.mtpToast('Wylogowano.', 'info');
      });
    },
    resetPwd: function () {
      var email = _val('mtpLEmail');
      if (!email) { _showErr('Wpisz adres e-mail powyżej, aby zresetować hasło.'); return; }
      if (!window._fbAuth) return;
      window._fbAuth.sendPasswordResetEmail(email)
        .then(function () {
          mtpAuth.close();
          window.mtpToast('E-mail z resetem hasła wysłany!', 'success');
        })
        .catch(function (e) { _showErr(e.message); });
    },
    syncNow: function () {
      if (window.mtpSync) {
        window.mtpSync.save(false);
        var s = _el('mtpSyncStatus');
        if (s) {
          s.textContent = 'Synchronizowanie...';
          s.style.color = '#fbbf24';
        }
        document.addEventListener('mtp-sync-saved', function () {
          var st = _el('mtpSyncStatus');
          if (st) {
            var now = new Date();
            st.textContent = 'Zsynchronizowano o ' + now.toLocaleTimeString('pl-PL');
            st.style.color = '#34d399';
          }
        }, { once: true });
      }
    }
  };

  /* ---- helpers ---- */
  function _el(id) { return document.getElementById(id); }
  function _val(id) { var e = _el(id); return e ? e.value.trim() : ''; }
  function _showErr(msg) { var e = _el('mtpErrMsg'); if (e) { e.style.display = ''; e.textContent = msg; } }
  function _hideErr() { var e = _el('mtpErrMsg'); if (e) e.style.display = 'none'; }
  function _setBusy(id, flag) { var b = _el(id); if (b) { b.disabled = flag; b.style.opacity = flag ? '.55' : '1'; } }
  function _fbMsg(code) {
    var m = {
      'auth/user-not-found': 'Nie znaleziono konta o tym adresie e-mail.',
      'auth/wrong-password': 'Nieprawidłowe hasło.',
      'auth/invalid-credential': 'Nieprawidłowy e-mail lub hasło.',
      'auth/invalid-email': 'Nieprawidłowy format adresu e-mail.',
      'auth/email-already-in-use': 'Ten e-mail jest już przypisany do konta.',
      'auth/weak-password': 'Hasło jest zbyt słabe (min. 6 znaków).',
      'auth/too-many-requests': 'Za dużo prób. Spróbuj ponownie za chwilę.',
      'auth/network-request-failed': 'Brak połączenia z internetem.'
    };
    return m[code] || null;
  }

  /* ----------------------------------------------------------------
     AUTH STATE LISTENER
  ---------------------------------------------------------------- */
  function setupAuthListener() {
    window._fbAuth.onAuthStateChanged(function (user) {
      window._mtpUser = user || null;
      var loggedOut = _el('mtpAuthLoggedOut');
      var loggedIn  = _el('mtpAuthLoggedIn');
      if (user) {
        if (loggedOut) loggedOut.style.display = 'none';
        if (loggedIn)  loggedIn.style.display  = '';
        var pe = _el('mtpProfileEmail');
        if (pe) pe.textContent = user.email;
        updateNav(user);
        // Start data sync
        if (window.mtpSync) {
          var st = _el('mtpSyncStatus');
          if (st) { st.textContent = 'Ładowanie danych z chmury...'; st.style.color = '#fbbf24'; }
          window.mtpSync.start(user.uid);
          document.addEventListener('mtp-data-loaded', function () {
            var s2 = _el('mtpSyncStatus');
            if (s2) { s2.textContent = 'Dane załadowane \u2713'; s2.style.color = '#34d399'; }
            window.mtpToast && window.mtpToast('Dane załadowane z chmury \u2713', 'success');
          }, { once: true });
        }
        window.mtpToast && window.mtpToast('Zalogowano jako ' + user.email.split('@')[0] + ' \uD83D\uDC4B', 'success');
      } else {
        if (loggedOut) loggedOut.style.display = '';
        if (loggedIn)  loggedIn.style.display  = 'none';
        updateNav(null);
        if (window.mtpSync) window.mtpSync.stop();
      }
    });
  }

  /* ----------------------------------------------------------------
     INIT — wait for DOM + Firebase
  ---------------------------------------------------------------- */
  function init() {
    buildModal();
    injectNavBtn();
    if (window._fbReady) {
      setupAuthListener();
    } else {
      document.addEventListener('fb-ready', setupAuthListener, { once: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
