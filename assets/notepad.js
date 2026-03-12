/* ===== Floating Notepad – Matematyka to Podstawa =========================
   Injects a floating notepad button on every page that includes this script.
   Notes are saved automatically to localStorage ('mtp-notes').
   ======================================================================== */
(function () {
  var STORAGE_KEY = 'mtp-notes';
  var isOpen = false;

  function getNote() {
    try { return localStorage.getItem(STORAGE_KEY) || ''; } catch(e) { return ''; }
  }
  function saveNote(val) {
    try { localStorage.setItem(STORAGE_KEY, val); } catch(e) {}
  }

  function injectNotepad() {
    if (document.getElementById('notepadToggle')) return;

    // Toggle button
    var toggle = document.createElement('button');
    toggle.id = 'notepadToggle';
    toggle.className = 'notepad-toggle print-hide';
    toggle.setAttribute('aria-label', 'Notatnik');
    toggle.setAttribute('title', 'Notatnik (zapisuje automatycznie)');
    toggle.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    document.body.appendChild(toggle);

    // Panel
    var panel = document.createElement('div');
    panel.id = 'notepadPanel';
    panel.className = 'notepad-panel print-hide';
    panel.style.display = 'none';
    panel.innerHTML =
      '<div class="notepad-header">' +
        '<span><i class="fa-solid fa-pen-to-square" style="color:#3b82f6;margin-right:.5rem"></i>Notatnik</span>' +
        '<div style="display:flex;align-items:center;gap:.5rem">' +
          '<button id="notepadClear" title="Wyczyść" style="background:none;border:none;cursor:pointer;color:#94a3b8;font-size:.75rem;padding:.25rem .4rem;border-radius:.375rem;transition:color .15s" onmouseover="this.style.color=\'#ef4444\'" onmouseout="this.style.color=\'#94a3b8\'">' +
            '<i class="fa-solid fa-trash"></i>' +
          '</button>' +
          '<button id="notepadClose" style="background:none;border:none;cursor:pointer;color:#64748b;font-size:1.25rem;padding:.25rem .4rem;line-height:1">&times;</button>' +
        '</div>' +
      '</div>' +
      '<textarea id="notepadText" class="notepad-text" placeholder="Twoje notatki...&#10;&#10;Tu możesz notować wzory, kroki rozwiązania,&#10;wnioski... Wszystko zapisuje się automatycznie."></textarea>' +
      '<div class="notepad-footer">' +
        '<span id="notepadCount" style="font-size:.7rem;color:#94a3b8">0 znaków</span>' +
        '<button id="notepadCopyBtn" class="notepad-action-btn"><i class="fa-regular fa-copy" style="margin-right:.25rem"></i>Kopiuj</button>' +
      '</div>';
    document.body.appendChild(panel);

    // Populate saved note
    var ta = document.getElementById('notepadText');
    ta.value = getNote();
    updateCount();

    // Toggle open/close
    toggle.addEventListener('click', function() {
      isOpen = !isOpen;
      panel.style.display = isOpen ? 'flex' : 'none';
      if (isOpen) { ta.focus(); ta.setSelectionRange(ta.value.length, ta.value.length); }
    });

    document.getElementById('notepadClose').addEventListener('click', function() {
      isOpen = false; panel.style.display = 'none';
    });

    document.getElementById('notepadClear').addEventListener('click', function() {
      if (ta.value.trim() === '' || confirm('Wyczyścić wszystkie notatki?')) {
        ta.value = ''; saveNote(''); updateCount(); ta.focus();
      }
    });

    // Auto-save on input
    var saveTimer;
    ta.addEventListener('input', function() {
      clearTimeout(saveTimer);
      saveTimer = setTimeout(function() { saveNote(ta.value); }, 300);
      updateCount();
    });

    // Copy button
    document.getElementById('notepadCopyBtn').addEventListener('click', function() {
      var btn = this;
      if (!ta.value.trim()) return;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(ta.value).then(function() {
          btn.innerHTML = '<i class="fa-solid fa-check" style="margin-right:.25rem;color:#10b981"></i>Skopiowano';
          setTimeout(function() { btn.innerHTML = '<i class="fa-regular fa-copy" style="margin-right:.25rem"></i>Kopiuj'; }, 1500);
        });
      } else {
        var tmp = document.createElement('textarea');
        tmp.value = ta.value; tmp.style.cssText = 'position:fixed;opacity:0';
        document.body.appendChild(tmp); tmp.select();
        document.execCommand('copy'); document.body.removeChild(tmp);
        btn.innerHTML = '<i class="fa-solid fa-check" style="margin-right:.25rem;color:#10b981"></i>Skopiowano';
        setTimeout(function() { btn.innerHTML = '<i class="fa-regular fa-copy" style="margin-right:.25rem"></i>Kopiuj'; }, 1500);
      }
    });

    // Close panel when clicking outside
    document.addEventListener('click', function(e) {
      if (isOpen && !panel.contains(e.target) && e.target !== toggle && !toggle.contains(e.target)) {
        isOpen = false; panel.style.display = 'none';
      }
    });
  }

  function updateCount() {
    var ta = document.getElementById('notepadText');
    var el = document.getElementById('notepadCount');
    if (ta && el) el.textContent = ta.value.length + ' znaków';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectNotepad);
  } else {
    injectNotepad();
  }
})();
