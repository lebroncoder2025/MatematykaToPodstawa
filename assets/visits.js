/* ================================================================
   VISIT TRACKER – mtp-visits
   Counts this user's own page visits via localStorage.
   Structure: { total: N, days: { "YYYY-MM-DD": N } }
   One visit per browser session (sessionStorage dedupe).
   ================================================================ */
(function () {
  var KEY = 'mtp-visits';

  function todayKey() {
    var d = new Date();
    return d.getFullYear() + '-' +
      String(d.getMonth() + 1).padStart(2, '0') + '-' +
      String(d.getDate()).padStart(2, '0');
  }

  var data;
  try { data = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) {}
  if (!data || typeof data !== 'object' || !data.days) {
    data = { total: 0, days: {} };
  }

  /* Count once per session */
  if (!sessionStorage.getItem('mtp-vc')) {
    sessionStorage.setItem('mtp-vc', '1');
    data.total = (data.total || 0) + 1;
    var tk = todayKey();
    data.days[tk] = (data.days[tk] || 0) + 1;

    /* Prune entries older than 365 days */
    var cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 365);
    Object.keys(data.days).forEach(function (k) {
      if (new Date(k) < cutoff) delete data.days[k];
    });
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {}
  }

  /* Calculate stats */
  var today = new Date();
  var daily = data.days[todayKey()] || 0;
  var weekly = 0;
  for (var i = 0; i < 7; i++) {
    var d2 = new Date(today);
    d2.setDate(d2.getDate() - i);
    var k2 = d2.getFullYear() + '-' +
      String(d2.getMonth() + 1).padStart(2, '0') + '-' +
      String(d2.getDate()).padStart(2, '0');
    weekly += data.days[k2] || 0;
  }

  window.mtpVisits = { total: data.total || 0, weekly: weekly, daily: daily };

  /* Inject footer counter on DOMContentLoaded */
  document.addEventListener('DOMContentLoaded', function () {
    var footer = document.querySelector('footer');
    if (!footer) return;

    var bar = document.createElement('div');
    bar.id = 'visitsBar';
    bar.style.cssText = 'margin-top:.75rem;padding-top:.75rem;border-top:1px solid #f1f5f9;display:flex;justify-content:center;flex-wrap:wrap;gap:1rem;';
    bar.innerHTML =
      '<span style="display:inline-flex;align-items:center;gap:.35rem;font-size:.72rem;color:#94a3b8;font-weight:600;">' +
        '<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>' +
        'Dziś: <b style="color:#6366f1;">' + daily + '</b>' +
      '</span>' +
      '<span style="display:inline-flex;align-items:center;gap:.35rem;font-size:.72rem;color:#94a3b8;font-weight:600;">' +
        '<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>' +
        'Ten tydzień: <b style="color:#6366f1;">' + weekly + '</b>' +
      '</span>' +
      '<span style="display:inline-flex;align-items:center;gap:.35rem;font-size:.72rem;color:#94a3b8;font-weight:600;">' +
        '<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11l2 2m-2-2v10a1 1 0 0 0-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1m6 0h-6"/></svg>' +
        'Łącznie: <b style="color:#6366f1;">' + (data.total || 0) + '</b>' +
      '</span>';
    footer.appendChild(bar);
  });
})();
