/* ================================================================
   VISIT TRACKER – cross-device via counterapi.dev
   Falls back to localStorage when API unavailable (offline/slow).
   Session-deduplicated: first page of session = increment, next pages = read.
   counterapi namespace: mtp-kompendium-2026
   ================================================================ */
(function () {
  var LS  = 'mtp-visits-cache';
  var API = 'https://api.counterapi.dev/v1/mtp-kompendium-2026';
  var SES = 'mtp-vc';

  function todayKey() {
    var d = new Date();
    return 'd' + d.getFullYear() +
      String(d.getMonth() + 1).padStart(2, '0') +
      String(d.getDate()).padStart(2, '0');
  }
  function weekKey() {
    var d = new Date(), j = new Date(d.getFullYear(), 0, 1);
    var w = Math.ceil(((d - j) / 864e5 + j.getDay() + 1) / 7);
    return 'w' + d.getFullYear() + String(w).padStart(2, '0');
  }

  /* Load local cache for instant first render */
  var lc = {};
  try { lc = JSON.parse(localStorage.getItem(LS) || '{}'); } catch (e) {}
  window.mtpVisits = { total: lc.total || 0, daily: lc.daily || 0, weekly: lc.weekly || 0 };

  function render(v) {
    window.mtpVisits = v;
    var map = { visitDaily: 'daily', visitWeekly: 'weekly', visitTotal: 'total' };
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.textContent = v[map[id]];
    });
    /* Footer bar – update b tags in-place */
    var bar = document.getElementById('visitsBar');
    if (bar) {
      var bs = bar.getElementsByTagName('b');
      if (bs[0]) bs[0].textContent = v.daily;
      if (bs[1]) bs[1].textContent = v.weekly;
      if (bs[2]) bs[2].textContent = v.total;
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    render(window.mtpVisits); /* show cached values immediately */

    var counted = sessionStorage.getItem(SES);
    var dk = todayKey(), wk = weekKey();

    /* ── Local fallback: increment immediately for offline UX ── */
    if (!counted) {
      sessionStorage.setItem(SES, '1');
      lc.total  = (lc.total  || 0) + 1;
      lc.daily  = (lc.daily  || 0) + 1;
      lc.weekly = (lc.weekly || 0) + 1;
      try { localStorage.setItem(LS, JSON.stringify(lc)); } catch (e) {}
      render({ total: lc.total, daily: lc.daily, weekly: lc.weekly });
    }

    /* ── Cross-device API calls ── */
    /* First page of session → /up (increment);  navigating within session → read */
    var sfx = counted ? '' : '/up';

    Promise.all([
      fetch(API + '/total' + sfx, { mode: 'cors' }),
      fetch(API + '/' + dk  + sfx, { mode: 'cors' }),
      fetch(API + '/' + wk  + sfx, { mode: 'cors' })
    ])
    .then(function (rs) {
      return Promise.all(rs.map(function (r) { return r.ok ? r.json() : null; }));
    })
    .then(function (ds) {
      if (!ds[0] || ds[0].count == null) return; /* API down – keep local values */
      var v = {
        total:  ds[0].count,
        daily:  ds[1] ? ds[1].count : lc.daily,
        weekly: ds[2] ? ds[2].count : lc.weekly
      };
      try { localStorage.setItem(LS, JSON.stringify(v)); } catch (e) {}
      render(v);
    })
    .catch(function () {}); /* silent fail – local fallback already displayed */

    /* ── Inject footer counter bar ── */
    var footer = document.querySelector('footer');
    if (!footer || document.getElementById('visitsBar')) return;

    var bar = document.createElement('div');
    bar.id = 'visitsBar';
    bar.style.cssText = 'margin-top:.75rem;padding-top:.75rem;border-top:1px solid #f1f5f9;display:flex;justify-content:center;flex-wrap:wrap;gap:1rem;';
    bar.innerHTML =
      '<span style="display:inline-flex;align-items:center;gap:.35rem;font-size:.72rem;color:#94a3b8;font-weight:600;">' +
        '<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>' +
        'Dzi\u015b: <b style="color:#6366f1;">' + window.mtpVisits.daily + '</b>' +
      '</span>' +
      '<span style="display:inline-flex;align-items:center;gap:.35rem;font-size:.72rem;color:#94a3b8;font-weight:600;">' +
        '<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>' +
        'Ten tydzie\u0144: <b style="color:#6366f1;">' + window.mtpVisits.weekly + '</b>' +
      '</span>' +
      '<span style="display:inline-flex;align-items:center;gap:.35rem;font-size:.72rem;color:#94a3b8;font-weight:600;">' +
        '<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11l2 2m-2-2v10a1 1 0 0 0-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1m6 0h-6"/></svg>' +
        '\u0141\u0105cznie: <b style="color:#6366f1;">' + window.mtpVisits.total + '</b>' +
      '</span>';
    footer.appendChild(bar);
  });
})();
