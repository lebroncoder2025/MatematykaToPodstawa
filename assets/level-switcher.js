/**
 * Level Switcher — Podstawowa / Rozszerzona
 * Stored in localStorage key "matura-level"
 * Values: "podstawowy" | "rozszerzony"
 * Default: "podstawowy"
 *
 * Logic (EXCLUSIVE):
 *   "podstawowy"  → shows data-level="podstawowy" + neutral (no data-level), hides "rozszerzony"
 *   "rozszerzony" → shows data-level="rozszerzony" + neutral (no data-level), hides "podstawowy"
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'matura-level';
  var LEVELS = ['podstawowy', 'rozszerzony'];

  function getLevel() {
    try {
      var v = localStorage.getItem(STORAGE_KEY);
      if (LEVELS.indexOf(v) !== -1) return v;
    } catch (e) {}
    return 'podstawowy';
  }

  function setLevel(lvl) {
    if (LEVELS.indexOf(lvl) === -1) lvl = 'podstawowy';
    try { localStorage.setItem(STORAGE_KEY, lvl); } catch (e) {}
    applyLevel(lvl);
    updateToggleUI(lvl);
    window.dispatchEvent(new CustomEvent('matura-level-change', { detail: { level: lvl } }));
    document.dispatchEvent(new CustomEvent('matura-level-change', { detail: { level: lvl } }));
  }

  function applyLevel(lvl) {
    var opposite = lvl === 'podstawowy' ? 'rozszerzony' : 'podstawowy';
    var els = document.querySelectorAll('[data-level]');
    for (var i = 0; i < els.length; i++) {
      var elLevel = els[i].getAttribute('data-level');
      if (elLevel === opposite) {
        els[i].style.display = 'none';
        els[i].classList.add('level-hidden');
      } else {
        els[i].style.display = '';
        els[i].classList.remove('level-hidden');
      }
    }
  }

  /* ── Inject CSS for the toggle ── */
  var styleInjected = false;
  function injectStyles() {
    if (styleInjected) return;
    styleInjected = true;
    var s = document.createElement('style');
    s.textContent =
      '#levelSwitcherBar{position:fixed;top:auto;bottom:0;left:0;right:0;z-index:9990;display:flex;justify-content:center;padding:8px;background:rgba(255,255,255,.92);backdrop-filter:blur(8px);border-top:1px solid #e2e8f0;box-shadow:0 -2px 10px rgba(0,0,0,.06);transition:opacity .3s}' +
      '.dark #levelSwitcherBar{background:rgba(30,30,46,.92);border-color:#374151}' +
      '@media(min-width:768px){#levelSwitcherBar{top:0;bottom:auto;position:sticky;border-top:none;border-bottom:1px solid #e2e8f0;box-shadow:0 2px 10px rgba(0,0,0,.06);padding:6px}}' +
      '#levelSwitcherWrap{display:inline-flex;align-items:center;gap:3px;padding:3px;border-radius:12px;background:#f1f5f9;border:1.5px solid #e2e8f0}' +
      '.dark #levelSwitcherWrap{background:#1e293b;border-color:#374151}' +
      '.lvl-btn{padding:6px 18px;border-radius:9px;font-size:13px;font-weight:700;border:none;cursor:pointer;transition:all .2s;display:inline-flex;align-items:center;gap:6px;white-space:nowrap;line-height:1.2;background:transparent;color:#64748b}' +
      '.dark .lvl-btn{color:#94a3b8}' +
      '.lvl-btn[aria-checked="true"][data-level-btn="podstawowy"]{background:#2563eb;color:#fff;box-shadow:0 2px 8px rgba(37,99,235,.35)}' +
      '.lvl-btn[aria-checked="true"][data-level-btn="rozszerzony"]{background:#db2777;color:#fff;box-shadow:0 2px 8px rgba(219,39,119,.35)}';
    document.head.appendChild(s);
  }

  /* ── Toggle bar below/above nav ── */
  function createToggle() {
    if (document.getElementById('levelSwitcherBar')) return true;
    var nav = document.querySelector('nav');
    if (!nav) return false;

    injectStyles();

    var bar = document.createElement('div');
    bar.id = 'levelSwitcherBar';

    var wrap = document.createElement('div');
    wrap.id = 'levelSwitcherWrap';
    wrap.setAttribute('role', 'radiogroup');
    wrap.setAttribute('aria-label', 'Poziom matury');

    var configs = [
      { lvl: 'podstawowy', label: 'Podstawowa', icon: 'fa-book' },
      { lvl: 'rozszerzony', label: 'Rozszerzona', icon: 'fa-fire' }
    ];

    configs.forEach(function (cfg) {
      var btn = document.createElement('button');
      btn.className = 'lvl-btn';
      btn.setAttribute('data-level-btn', cfg.lvl);
      btn.setAttribute('role', 'radio');
      btn.setAttribute('aria-label', cfg.label);
      btn.innerHTML = '<i class="fa-solid ' + cfg.icon + '" style="font-size:12px"></i>' + cfg.label;
      btn.addEventListener('click', function () { setLevel(cfg.lvl); });
      wrap.appendChild(btn);
    });

    bar.appendChild(wrap);
    // Insert right after the nav
    nav.parentNode.insertBefore(bar, nav.nextSibling);
    return true;
  }

  function updateToggleUI(lvl) {
    var btns = document.querySelectorAll('[data-level-btn]');
    for (var i = 0; i < btns.length; i++) {
      var bLvl = btns[i].getAttribute('data-level-btn');
      btns[i].setAttribute('aria-checked', bLvl === lvl ? 'true' : 'false');
    }
  }

  // Expose API globally
  window.maturaLevel = {
    get: getLevel,
    set: setLevel,
    apply: function () { applyLevel(getLevel()); },
    LEVELS: LEVELS,
    reinit: init  // allow topic-page.js to re-trigger after rendering nav
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  var toggleInjected = false;

  function init() {
    var lvl = getLevel();
    if (!toggleInjected) {
      toggleInjected = createToggle();
    }
    updateToggleUI(lvl);
    applyLevel(lvl);

    // If nav wasn't found (e.g. topic-page.js hasn't rendered yet), retry
    if (!toggleInjected) {
      var retries = 0;
      var retryTimer = setInterval(function () {
        retries++;
        if (document.querySelector('nav') && !toggleInjected) {
          toggleInjected = createToggle();
          updateToggleUI(getLevel());
          applyLevel(getLevel());
        }
        if (toggleInjected || retries > 20) clearInterval(retryTimer);
      }, 200);
    }
  }

  // Apply immediately for elements already in DOM
  applyLevel(getLevel());
})();
