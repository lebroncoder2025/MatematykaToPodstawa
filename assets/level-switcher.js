/**
 * Level Switcher — Podstawowa / Rozszerzona
 * Stored in localStorage key "matura-level"
 * Values: "podstawowy" | "rozszerzony"
 * Default: "podstawowy"
 *
 * Logic:
 *   "podstawowy"  → hides all elements with data-level="rozszerzony"
 *   "rozszerzony"  → shows EVERYTHING (extended matura covers all basic topics + extras)
 *   Elements without data-level are always visible.
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
  }

  function applyLevel(lvl) {
    var els = document.querySelectorAll('[data-level]');
    for (var i = 0; i < els.length; i++) {
      var elLevel = els[i].getAttribute('data-level');
      // In "rozszerzony" mode: show everything
      // In "podstawowy" mode: hide elements marked "rozszerzony"
      if (lvl === 'rozszerzony' || elLevel !== 'rozszerzony') {
        els[i].style.display = '';
        els[i].classList.remove('level-hidden');
      } else {
        els[i].style.display = 'none';
        els[i].classList.add('level-hidden');
      }
    }
  }

  /* ── Toggle injected into navbar ── */
  function createToggle() {
    var nav = document.querySelector('nav');
    if (!nav) return;

    // Build the toggle: a pill-shaped switch
    var wrap = document.createElement('div');
    wrap.id = 'levelSwitcherWrap';
    wrap.style.cssText = 'display:inline-flex;align-items:center;gap:3px;padding:3px;border-radius:12px;background:#f1f5f9;border:1.5px solid #e2e8f0;flex-shrink:0;';
    wrap.setAttribute('role', 'radiogroup');
    wrap.setAttribute('aria-label', 'Poziom matury');

    var configs = [
      { lvl: 'podstawowy', label: 'Podstawowa', icon: 'fa-book', activeColors: { bg: '#2563eb', text: '#fff' } },
      { lvl: 'rozszerzony', label: 'Rozszerzona', icon: 'fa-fire', activeColors: { bg: '#db2777', text: '#fff' } }
    ];

    configs.forEach(function (cfg) {
      var btn = document.createElement('button');
      btn.setAttribute('data-level-btn', cfg.lvl);
      btn.setAttribute('role', 'radio');
      btn.setAttribute('aria-label', cfg.label);
      btn.style.cssText = 'padding:5px 14px;border-radius:9px;font-size:12px;font-weight:700;border:none;cursor:pointer;transition:all .2s;display:inline-flex;align-items:center;gap:5px;white-space:nowrap;line-height:1.2;';
      btn.innerHTML = '<i class="fa-solid ' + cfg.icon + '" style="font-size:11px"></i><span class="level-label-text">' + cfg.label + '</span>';
      btn.addEventListener('click', function () { setLevel(cfg.lvl); });
      wrap.appendChild(btn);
    });

    // Desktop: insert into nav
    var navFlex = nav.querySelector('.flex.justify-between, .flex.items-center.justify-between');
    if (navFlex) {
      var logoLink = navFlex.querySelector('a');
      if (logoLink) {
        var logoWrap = logoLink.closest('.flex.items-center') || logoLink.parentNode;
        logoWrap.style.flexShrink = '0';
        var desktopWrap = document.createElement('div');
        desktopWrap.className = 'hidden md:flex items-center';
        desktopWrap.style.marginLeft = '12px';
        desktopWrap.appendChild(wrap);
        logoWrap.after(desktopWrap);
      }
    }

    // Mobile: add toggle to mobile nav
    var mobileNav = document.getElementById('mobileNav');
    if (mobileNav) {
      var mWrap = document.createElement('div');
      mWrap.style.cssText = 'padding:0 0 12px;border-bottom:1px solid #f1f5f9;margin-bottom:8px;';
      mWrap.innerHTML = '<p style="font-size:10px;font-weight:800;color:#94a3b8;text-transform:uppercase;letter-spacing:.06em;margin:0 0 8px;">Wybierz poziom matury</p>';
      var mBtnWrap = document.createElement('div');
      mBtnWrap.style.cssText = 'display:flex;gap:6px;';

      configs.forEach(function (cfg) {
        var btn = document.createElement('button');
        btn.setAttribute('data-level-btn-mobile', cfg.lvl);
        btn.style.cssText = 'flex:1;padding:10px 14px;border-radius:12px;font-size:13px;font-weight:700;border:2px solid #e2e8f0;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:6px;background:#fff;color:#64748b;';
        btn.innerHTML = '<i class="fa-solid ' + cfg.icon + '" style="font-size:13px"></i>' + cfg.label;
        btn.addEventListener('click', function () { setLevel(cfg.lvl); });
        mBtnWrap.appendChild(btn);
      });

      mWrap.appendChild(mBtnWrap);
      var firstChild = mobileNav.querySelector('.flex.items-center.justify-between');
      if (firstChild) { firstChild.after(mWrap); } else { mobileNav.prepend(mWrap); }
    }
  }

  function updateToggleUI(lvl) {
    // Desktop buttons
    var btns = document.querySelectorAll('[data-level-btn]');
    for (var i = 0; i < btns.length; i++) {
      var bLvl = btns[i].getAttribute('data-level-btn');
      if (bLvl === lvl) {
        btns[i].style.background = bLvl === 'podstawowy' ? '#2563eb' : '#db2777';
        btns[i].style.color = '#fff';
        btns[i].style.boxShadow = '0 2px 6px rgba(0,0,0,.18)';
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
      if (mLvl === lvl) {
        var activeBg = mLvl === 'podstawowy' ? '#2563eb' : '#db2777';
        mBtns[j].style.background = activeBg;
        mBtns[j].style.color = '#fff';
        mBtns[j].style.borderColor = activeBg;
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

  // Apply immediately for elements already in DOM
  applyLevel(getLevel());
})();
