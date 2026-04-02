/**
 * Level Switcher — Podstawowy / Rozszerzony / Oba
 * Stored in localStorage key "matura-level"
 * Values: "podstawowy" | "rozszerzony" | "oba"
 * Default: "oba"
 *
 * Usage:
 *   HTML elements with data-level="podstawowy" or data-level="rozszerzony"
 *   are shown/hidden based on the current level.
 *   Elements without data-level are always visible.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'matura-level';
  var LEVELS = ['podstawowy', 'rozszerzony', 'oba'];
  var LABELS = { podstawowy: 'Podstawowy', rozszerzony: 'Rozszerzony', oba: 'Oba poziomy' };
  var ICONS = { podstawowy: 'fa-book', rozszerzony: 'fa-book-open-reader', oba: 'fa-layer-group' };
  var COLORS = {
    podstawowy: { bg: '#dbeafe', text: '#1e40af', border: '#93c5fd', activeBg: '#2563eb', activeText: '#fff' },
    rozszerzony: { bg: '#fce7f3', text: '#9d174d', border: '#f9a8d4', activeBg: '#db2777', activeText: '#fff' },
    oba: { bg: '#f0fdf4', text: '#166534', border: '#86efac', activeBg: '#16a34a', activeText: '#fff' }
  };

  function getLevel() {
    try {
      var v = localStorage.getItem(STORAGE_KEY);
      if (LEVELS.indexOf(v) !== -1) return v;
    } catch (e) { /* private browsing */ }
    return 'oba';
  }

  function setLevel(lvl) {
    if (LEVELS.indexOf(lvl) === -1) lvl = 'oba';
    try { localStorage.setItem(STORAGE_KEY, lvl); } catch (e) {}
    applyLevel(lvl);
    updateToggleUI(lvl);
    window.dispatchEvent(new CustomEvent('matura-level-change', { detail: { level: lvl } }));
  }

  function applyLevel(lvl) {
    var els = document.querySelectorAll('[data-level]');
    for (var i = 0; i < els.length; i++) {
      var elLevel = els[i].getAttribute('data-level');
      if (lvl === 'oba' || elLevel === lvl || elLevel === 'oba') {
        els[i].style.display = '';
        els[i].classList.remove('level-hidden');
      } else {
        els[i].style.display = 'none';
        els[i].classList.add('level-hidden');
      }
    }
  }

  /* ── Toggle bar injected into navbar ── */
  var toggleContainer = null;

  function createToggle() {
    var nav = document.querySelector('nav');
    if (!nav) return;

    // Find the right place - after the logo, before other nav items
    var wrap = document.createElement('div');
    wrap.id = 'levelSwitcherWrap';
    wrap.style.cssText = 'display:inline-flex;align-items:center;gap:4px;padding:3px;border-radius:12px;background:#f1f5f9;border:1.5px solid #e2e8f0;margin-left:12px;flex-shrink:0;';
    wrap.setAttribute('role', 'radiogroup');
    wrap.setAttribute('aria-label', 'Poziom matury');

    LEVELS.forEach(function (lvl) {
      var btn = document.createElement('button');
      btn.setAttribute('data-level-btn', lvl);
      btn.setAttribute('role', 'radio');
      btn.setAttribute('aria-label', LABELS[lvl]);
      btn.style.cssText = 'padding:5px 12px;border-radius:9px;font-size:12px;font-weight:700;border:none;cursor:pointer;transition:all .2s;display:inline-flex;align-items:center;gap:5px;white-space:nowrap;line-height:1.2;';
      btn.innerHTML = '<i class="fa-solid ' + ICONS[lvl] + '" style="font-size:11px"></i><span class="level-label-text">' + LABELS[lvl] + '</span>';
      btn.addEventListener('click', function () { setLevel(lvl); });
      wrap.appendChild(btn);
    });

    toggleContainer = wrap;

    // Desktop: insert into nav bar flex container
    var navFlex = nav.querySelector('.flex.justify-between, .flex.items-center.justify-between');
    if (navFlex) {
      var logoLink = navFlex.querySelector('a');
      if (logoLink && logoLink.parentNode === navFlex) {
        // Insert after the logo div
        var logoWrap = logoLink.closest('.flex.items-center') || logoLink.parentNode;
        logoWrap.style.flexShrink = '0';
        var desktopWrap = document.createElement('div');
        desktopWrap.className = 'hidden md:flex items-center';
        desktopWrap.appendChild(wrap);
        logoWrap.after(desktopWrap);
      }
    }

    // Mobile: add a separate toggle in mobile nav
    var mobileNav = document.getElementById('mobileNav');
    if (mobileNav) {
      var mWrap = document.createElement('div');
      mWrap.style.cssText = 'padding:0 0 12px;border-bottom:1px solid #f1f5f9;margin-bottom:8px;';
      mWrap.innerHTML = '<p style="font-size:10px;font-weight:800;color:#94a3b8;text-transform:uppercase;letter-spacing:.06em;margin:0 0 8px;">Poziom matury</p>';
      var mBtnWrap = document.createElement('div');
      mBtnWrap.style.cssText = 'display:flex;gap:6px;flex-wrap:wrap;';
      LEVELS.forEach(function (lvl) {
        var btn = document.createElement('button');
        btn.setAttribute('data-level-btn-mobile', lvl);
        btn.style.cssText = 'padding:7px 14px;border-radius:10px;font-size:13px;font-weight:700;border:1.5px solid #e2e8f0;cursor:pointer;transition:all .2s;display:inline-flex;align-items:center;gap:5px;background:#fff;color:#64748b;';
        btn.innerHTML = '<i class="fa-solid ' + ICONS[lvl] + '" style="font-size:12px"></i>' + LABELS[lvl];
        btn.addEventListener('click', function () { setLevel(lvl); });
        mBtnWrap.appendChild(btn);
      });
      mWrap.appendChild(mBtnWrap);
      // Insert at top of mobile nav, after the header
      var firstChild = mobileNav.querySelector('.flex.items-center.justify-between');
      if (firstChild) {
        firstChild.after(mWrap);
      } else {
        mobileNav.prepend(mWrap);
      }
    }
  }

  function updateToggleUI(lvl) {
    // Desktop buttons
    var btns = document.querySelectorAll('[data-level-btn]');
    for (var i = 0; i < btns.length; i++) {
      var bLvl = btns[i].getAttribute('data-level-btn');
      var c = COLORS[bLvl];
      if (bLvl === lvl) {
        btns[i].style.background = c.activeBg;
        btns[i].style.color = c.activeText;
        btns[i].style.boxShadow = '0 1px 4px rgba(0,0,0,.15)';
        btns[i].setAttribute('aria-checked', 'true');
      } else {
        btns[i].style.background = 'transparent';
        btns[i].style.color = '#64748b';
        btns[i].style.boxShadow = 'none';
        btns[i].setAttribute('aria-checked', 'false');
      }
    }
    // Mobile buttons
    var mBtns = document.querySelectorAll('[data-level-btn-mobile]');
    for (var j = 0; j < mBtns.length; j++) {
      var mLvl = mBtns[j].getAttribute('data-level-btn-mobile');
      var mc = COLORS[mLvl];
      if (mLvl === lvl) {
        mBtns[j].style.background = mc.activeBg;
        mBtns[j].style.color = mc.activeText;
        mBtns[j].style.borderColor = mc.activeBg;
      } else {
        mBtns[j].style.background = '#fff';
        mBtns[j].style.color = '#64748b';
        mBtns[j].style.borderColor = '#e2e8f0';
      }
    }
  }

  // Expose API globally
  window.maturaLevel = {
    get: getLevel,
    set: setLevel,
    apply: function () { applyLevel(getLevel()); },
    LEVELS: LEVELS
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    var lvl = getLevel();
    createToggle();
    updateToggleUI(lvl);
    applyLevel(lvl);
  }

  // Also apply immediately for elements already in DOM (before DOMContentLoaded)
  applyLevel(getLevel());
})();
