// ================================================================
// DB-SYNC — synchronizacja danych localStorage <-> Firestore
// Plik musi być załadowany po firebase-init.js
// ================================================================
(function () {
  // Klucze localStorage do synchronizacji
  var SYNC_KEYS = [
    'quiz_state', 'quiz_history', 'kurs_state', 'kurs_last_position',
    'mtp-study-log', 'mtp-study-goal', 'arkusze-done', 'mtp-wzory-favorites',
    'zadaniaBookmarkedIds', 'zadaniaSolvedIds', 'mtp-notes',
    'mtp-fontsize', 'mtp-theme'
  ];

  function _gatherData() {
    var data = { _ts: Date.now() };
    SYNC_KEYS.forEach(function (k) {
      var v = localStorage.getItem(k);
      if (v !== null) data[k] = v;
    });
    // Notatki do kroków kursu (kurs-note-{modIdx}-{stepIdx})
    var stepNotes = {};
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      if (key && key.indexOf('kurs-note-') === 0) {
        stepNotes[key] = localStorage.getItem(key);
      }
    }
    if (Object.keys(stepNotes).length) {
      data['_stepNotes'] = JSON.stringify(stepNotes);
    }
    // Notatki do zadań (zadania-note-{id})
    var taskNotes = {};
    for (var j = 0; j < localStorage.length; j++) {
      var tKey = localStorage.key(j);
      if (tKey && tKey.indexOf('zadania-note-') === 0) {
        taskNotes[tKey] = localStorage.getItem(tKey);
      }
    }
    if (Object.keys(taskNotes).length) {
      data['_taskNotes'] = JSON.stringify(taskNotes);
    }
    return data;
  }

  function _applyData(data) {
    if (!data) return;
    SYNC_KEYS.forEach(function (k) {
      if (data[k] !== undefined) localStorage.setItem(k, data[k]);
    });
    if (data['_stepNotes']) {
      try {
        var notes = JSON.parse(data['_stepNotes']);
        Object.keys(notes).forEach(function (k) {
          localStorage.setItem(k, notes[k]);
        });
      } catch (e) {}
    }
    if (data['_taskNotes']) {
      try {
        var tNotes = JSON.parse(data['_taskNotes']);
        Object.keys(tNotes).forEach(function (k) {
          localStorage.setItem(k, tNotes[k]);
        });
      } catch (e) {}
    }
  }

  window.mtpSync = {
    _uid: null,
    _timer: null,

    /** Zapisz wszystkie dane do Firestore */
    save: function (silent) {
      if (!window._fbDb || !this._uid) return;
      var uid = this._uid;
      var data = _gatherData();
      window._fbDb.collection('users').doc(uid)
        .set(data, { merge: true })
        .then(function () {
          if (!silent && window.mtpToast) {
            window.mtpToast('Dane zapisane w chmurze \u2713', 'success');
          }
          document.dispatchEvent(new CustomEvent('mtp-sync-saved'));
        })
        .catch(function (e) {
          console.warn('[MTP Sync] save error:', e);
        });
    },

    /** Wczytaj dane z Firestore do localStorage */
    load: function (uid, cb) {
      if (!window._fbDb) { if (cb) cb(false); return; }
      window._fbDb.collection('users').doc(uid).get()
        .then(function (doc) {
          if (doc.exists) {
            _applyData(doc.data());
            if (cb) cb(true);
          } else {
            if (cb) cb(false);
          }
        })
        .catch(function (e) {
          console.warn('[MTP Sync] load error:', e);
          if (cb) cb(false);
        });
    },

    /** Uruchom synchronizację dla zalogowanego użytkownika */
    start: function (uid) {
      this._uid = uid;
      var self = this;
      // Najpierw wczytaj dane z chmury
      this.load(uid, function (hadData) {
        if (hadData) {
          document.dispatchEvent(new Event('mtp-data-loaded'));
        }
      });
      // Auto-zapis co 60 sekund
      if (this._timer) clearInterval(this._timer);
      this._timer = setInterval(function () { self.save(true); }, 60000);
      // Zapis przed zamknięciem strony
      window.addEventListener('beforeunload', function () { self.save(true); });
    },

    /** Zatrzymaj synchronizację (wylogowanie) */
    stop: function () {
      this._uid = null;
      if (this._timer) { clearInterval(this._timer); this._timer = null; }
    }
  };
})();
