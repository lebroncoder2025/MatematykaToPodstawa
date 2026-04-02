/* ===== Quick Search (Ctrl+K / Cmd+K) ===== */
(function () {
  "use strict";

  // ── Dynamically load content.js if not available ──
  var contentLoaded = false;
  function ensureContent(cb) {
    if (window.MATURA_TOPICS) { cb(); return; }
    if (contentLoaded) { cb(); return; }
    var base = document.querySelector('script[src*="search.js"]');
    var prefix = "";
    if (base) {
      var src = base.getAttribute("src");
      prefix = src.replace(/search\.js$/, "");
    }
    var s = document.createElement("script");
    s.src = prefix + "content.js";
    s.onload = function () { contentLoaded = true; cb(); };
    s.onerror = function () { contentLoaded = true; cb(); };
    document.head.appendChild(s);
  }

  // ── Build search index from MATURA_TOPICS ──
  function buildIndex() {
    var topics = window.MATURA_TOPICS;
    if (!topics) return [];
    var items = [];
    Object.keys(topics).forEach(function (slug) {
      var t = topics[slug];
      // Topic title
      items.push({ type: "dział", title: t.title, slug: slug, color: t.color, icon: t.icon });
      // Theory sections
      if (t.theory) {
        t.theory.forEach(function (sec) {
          items.push({ type: "teoria", title: sec.title, parent: t.title, slug: slug, color: t.color, icon: t.icon });
          // Formulas
          if (sec.formulas) {
            sec.formulas.forEach(function (f) {
              items.push({ type: "wzór", title: f.meaning, latex: f.latex, parent: t.title, slug: slug, color: t.color, icon: t.icon });
            });
          }
        });
      }
    });
    return items;
  }

  // ── Fuzzy-ish search ──
  function normalize(s) { return s.toLowerCase().replace(/[ąáà]/g,"a").replace(/[ćč]/g,"c").replace(/[ęéè]/g,"e").replace(/[łl]/g,"l").replace(/[ńñ]/g,"n").replace(/[óòö]/g,"o").replace(/[śš]/g,"s").replace(/[źżž]/g,"z"); }

  function matches(item, q) {
    var nq = normalize(q);
    if (normalize(item.title).indexOf(nq) !== -1) return true;
    if (item.parent && normalize(item.parent).indexOf(nq) !== -1) return true;
    if (item.latex && normalize(item.latex).indexOf(nq) !== -1) return true;
    return false;
  }

  // ── Modal HTML ──
  var overlay, input, results, index;

  function createModal() {
    overlay = document.createElement("div");
    overlay.id = "qs-overlay";
    overlay.innerHTML =
      '<div id="qs-modal">' +
        '<div id="qs-header">' +
          '<i class="fa-solid fa-magnifying-glass" style="color:#6366f1;margin-right:8px"></i>' +
          '<input id="qs-input" type="text" placeholder="Szukaj działu, wzoru, tematu…" autocomplete="off" />' +
          '<kbd>Esc</kbd>' +
        '</div>' +
        '<div id="qs-results"></div>' +
        '<div id="qs-footer">↑↓ nawiguj · Enter otwórz · Esc zamknij</div>' +
      '</div>';
    document.body.appendChild(overlay);

    input = document.getElementById("qs-input");
    results = document.getElementById("qs-results");

    overlay.addEventListener("click", function (e) { if (e.target === overlay) close(); });
    input.addEventListener("input", onInput);
    input.addEventListener("keydown", onKeydown);

    // Inject styles
    var style = document.createElement("style");
    style.textContent =
      '#qs-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:9999;display:none;align-items:flex-start;justify-content:center;padding-top:min(20vh,120px);backdrop-filter:blur(4px)}' +
      '#qs-overlay.open{display:flex}' +
      '#qs-modal{background:var(--bg,#fff);border-radius:16px;width:min(600px,92vw);box-shadow:0 25px 50px rgba(0,0,0,.25);overflow:hidden;border:1px solid rgba(99,102,241,.2)}' +
      '.dark #qs-modal{--bg:#1e1e2e;color:#e2e8f0;border-color:rgba(99,102,241,.3)}' +
      '#qs-header{display:flex;align-items:center;padding:14px 18px;border-bottom:1px solid #e5e7eb;gap:4px}' +
      '.dark #qs-header{border-color:#374151}' +
      '#qs-input{flex:1;border:none;outline:none;font-size:16px;background:transparent;color:inherit}' +
      '#qs-header kbd{background:#f3f4f6;padding:2px 8px;border-radius:6px;font-size:12px;color:#6b7280;border:1px solid #d1d5db}' +
      '.dark #qs-header kbd{background:#374151;border-color:#4b5563;color:#9ca3af}' +
      '#qs-results{max-height:min(400px,50vh);overflow-y:auto;padding:8px}' +
      '#qs-results:empty::after{content:"Zacznij pisać aby wyszukać…";display:block;text-align:center;padding:32px;color:#9ca3af;font-size:14px}' +
      '.qs-item{display:flex;align-items:center;padding:10px 14px;border-radius:10px;cursor:pointer;gap:12px;text-decoration:none;color:inherit;transition:background .15s}' +
      '.qs-item:hover,.qs-item.active{background:rgba(99,102,241,.1)}' +
      '.dark .qs-item:hover,.dark .qs-item.active{background:rgba(99,102,241,.2)}' +
      '.qs-icon{width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0}' +
      '.qs-text{flex:1;min-width:0}' +
      '.qs-title{font-weight:600;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
      '.qs-meta{font-size:12px;color:#9ca3af;margin-top:2px}' +
      '.qs-badge{font-size:11px;padding:2px 8px;border-radius:6px;background:#f3f4f6;color:#6b7280;flex-shrink:0}' +
      '.dark .qs-badge{background:#374151;color:#9ca3af}' +
      '#qs-footer{padding:10px 18px;border-top:1px solid #e5e7eb;font-size:12px;color:#9ca3af;text-align:center}' +
      '.dark #qs-footer{border-color:#374151}' +
      '@media (max-width:1279px){.qs-nav-trigger{padding:8px 10px}.qs-nav-trigger span,.qs-nav-trigger kbd{display:none!important}}' +
      '.qs-empty{text-align:center;padding:32px;color:#9ca3af;font-size:14px}';
    document.head.appendChild(style);
  }

  var activeIdx = -1;

  function onInput() {
    var q = input.value.trim();
    if (!q) { results.innerHTML = ""; activeIdx = -1; return; }
    if (!index) index = buildIndex();
    var found = index.filter(function (it) { return matches(it, q); }).slice(0, 12);
    activeIdx = -1;
    if (!found.length) {
      results.innerHTML = '<div class="qs-empty">Brak wyników dla „' + escHtml(q) + '"</div>';
      return;
    }
    var colorBg = { blue: "#dbeafe", red: "#fee2e2", green: "#dcfce7", yellow: "#fef9c3", purple: "#f3e8ff", teal: "#ccfbf1", orange: "#ffedd5", cyan: "#cffafe", indigo: "#e0e7ff", pink: "#fce7f3", rose: "#ffe4e6", violet: "#ede9fe", fuchsia: "#fae8ff", amber: "#fef3c7", emerald: "#d1fae5", sky: "#e0f2fe" };
    var colorFg = { blue: "#1d4ed8", red: "#dc2626", green: "#16a34a", yellow: "#ca8a04", purple: "#9333ea", teal: "#0d9488", orange: "#ea580c", cyan: "#0891b2", indigo: "#4f46e5", pink: "#db2777", rose: "#e11d48", violet: "#7c3aed", fuchsia: "#c026d3", amber: "#d97706", emerald: "#059669", sky: "#0284c7" };
    results.innerHTML = found.map(function (it, i) {
      var bg = colorBg[it.color] || "#f3f4f6";
      var fg = colorFg[it.color] || "#6b7280";
      var inDzialy = location.pathname.indexOf("/dzialy/") !== -1;
      var href = inDzialy ? it.slug + ".html" : "dzialy/" + it.slug + ".html";
      var typeLabel = it.type === "dział" ? "Dział" : it.type === "teoria" ? "Teoria" : "Wzór";
      var meta = it.parent ? it.parent : "";
      if (it.latex) meta += (meta ? " · " : "") + it.latex.replace(/\\\\/g, "\\");
      return '<a class="qs-item" href="' + href + '" data-idx="' + i + '">' +
        '<div class="qs-icon" style="background:' + bg + ";color:" + fg + '"><i class="fa-solid ' + (it.icon || "fa-calculator") + '"></i></div>' +
        '<div class="qs-text"><div class="qs-title">' + escHtml(it.title) + '</div>' +
        (meta ? '<div class="qs-meta">' + escHtml(meta) + '</div>' : '') +
        '</div><span class="qs-badge">' + typeLabel + '</span></a>';
    }).join("");
  }

  function onKeydown(e) {
    var items = results.querySelectorAll(".qs-item");
    if (e.key === "ArrowDown") { e.preventDefault(); activeIdx = Math.min(activeIdx + 1, items.length - 1); highlight(items); }
    else if (e.key === "ArrowUp") { e.preventDefault(); activeIdx = Math.max(activeIdx - 1, 0); highlight(items); }
    else if (e.key === "Enter") { e.preventDefault(); if (items[activeIdx]) items[activeIdx].click(); else if (items[0]) items[0].click(); }
    else if (e.key === "Escape") { close(); }
  }

  function highlight(items) {
    items.forEach(function (el, i) { el.classList.toggle("active", i === activeIdx); });
    if (items[activeIdx]) items[activeIdx].scrollIntoView({ block: "nearest" });
  }

  function escHtml(s) { var d = document.createElement("div"); d.textContent = s; return d.innerHTML; }

  function open() {
    if (!overlay) createModal();
    overlay.classList.add("open");
    input.value = "";
    results.innerHTML = "";
    activeIdx = -1;
    ensureContent(function () {
      setTimeout(function () { input.focus(); }, 50);
    });
  }

  function close() {
    if (overlay) overlay.classList.remove("open");
  }

  // ── Keyboard shortcut Ctrl+K / Cmd+K ──
  document.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      open();
    }
  });

  // ── Expose open function for nav button ──
  window.openQuickSearch = open;

  // ── Inject search button in desktop nav ──
  function injectButton() {
    var nav = document.querySelector("nav .nav-search-anchor");
    if (!nav) return;
    var btn = document.createElement("button");
    btn.className = "qs-nav-trigger flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors";
    btn.innerHTML = '<i class="fa-solid fa-magnifying-glass text-xs"></i><span class="hidden xl:inline">Szukaj</span><kbd class="hidden 2xl:inline-flex ml-1 text-[10px] bg-gray-200 dark:bg-gray-600 px-1.5 py-0.5 rounded">Ctrl+K</kbd>';
    btn.addEventListener("click", open);
    nav.appendChild(btn);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectButton);
  } else {
    injectButton();
  }
})();
