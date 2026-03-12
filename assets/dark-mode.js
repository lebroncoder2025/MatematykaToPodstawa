/* ===== Dark Mode Toggle — Matematyka to Podstawa =====
   Injects a toggle button on every page that includes this script.
   Saves preference to localStorage. ===================================================== */
(function () {
  var STORAGE_KEY = 'mtp-theme';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    var btn = document.getElementById('darkToggleBtn');
    if (btn) btn.title = theme === 'dark' ? 'Tryb jasny' : 'Tryb ciemny';
    if (btn) btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme') || 'light';
    var next = current === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(STORAGE_KEY, next); } catch (e) {}
    applyTheme(next);
  }

  function injectBtn() {
    if (document.getElementById('darkToggleBtn')) return;
    var btn = document.createElement('button');
    btn.id = 'darkToggleBtn';
    btn.className = 'dark-toggle print-hide';
    btn.setAttribute('aria-label', 'Przełącz tryb ciemny');
    btn.addEventListener('click', toggleTheme);
    document.body.appendChild(btn);
  }

  // Apply saved theme immediately (before first paint)
  var saved;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
  if (saved) document.documentElement.setAttribute('data-theme', saved);

  // Inject button after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      injectBtn();
      applyTheme(document.documentElement.getAttribute('data-theme') || 'light');
    });
  } else {
    injectBtn();
    applyTheme(document.documentElement.getAttribute('data-theme') || 'light');
  }
})();
