/* ===== Study Timer – Pomodoro ===== */
(function () {
  "use strict";

  var WORK = 25 * 60;   // 25 min
  var SHORT = 5 * 60;   // 5 min break
  var LONG = 15 * 60;   // 15 min long break
  var SESSIONS_BEFORE_LONG = 4;

  var remaining = WORK;
  var running = false;
  var interval = null;
  var mode = "work"; // work | short | long
  var sessionsCompleted = 0;

  // ── Stats (per day) ──
  function todayKey() { return "study-timer-" + new Date().toISOString().slice(0, 10); }
  function addMinutes(m) { var k = todayKey(); var v = parseInt(localStorage.getItem(k) || "0", 10); localStorage.setItem(k, v + m); updateStats(); }
  function getTodayMinutes() { return parseInt(localStorage.getItem(todayKey()) || "0", 10); }

  // ── UI ──
  var widget, display, modeLabel, statsEl, btnStart, btnReset, btnSkip;
  var collapsed = localStorage.getItem("timer-collapsed") === "1";

  function create() {
    widget = document.createElement("div");
    widget.id = "study-timer";
    widget.innerHTML =
      '<div id="st-header">' +
        '<span id="st-drag"><i class="fa-solid fa-clock"></i> Timer</span>' +
        '<button id="st-toggle" title="Zwiń/Rozwiń"><i class="fa-solid fa-chevron-down"></i></button>' +
      '</div>' +
      '<div id="st-body">' +
        '<div id="st-mode-label">Nauka</div>' +
        '<div id="st-display">25:00</div>' +
        '<div id="st-controls">' +
          '<button id="st-start" class="st-btn st-btn-primary"><i class="fa-solid fa-play"></i></button>' +
          '<button id="st-reset" class="st-btn"><i class="fa-solid fa-rotate-left"></i></button>' +
          '<button id="st-skip" class="st-btn"><i class="fa-solid fa-forward"></i></button>' +
        '</div>' +
        '<div id="st-modes">' +
          '<button class="st-mode-btn active" data-mode="work">25 min</button>' +
          '<button class="st-mode-btn" data-mode="short">5 min</button>' +
          '<button class="st-mode-btn" data-mode="long">15 min</button>' +
        '</div>' +
        '<div id="st-stats">Dziś: <strong>0 min</strong></div>' +
      '</div>';
    document.body.appendChild(widget);

    display = document.getElementById("st-display");
    modeLabel = document.getElementById("st-mode-label");
    statsEl = document.getElementById("st-stats");
    btnStart = document.getElementById("st-start");
    btnReset = document.getElementById("st-reset");
    btnSkip = document.getElementById("st-skip");

    btnStart.addEventListener("click", toggleTimer);
    btnReset.addEventListener("click", resetTimer);
    btnSkip.addEventListener("click", skipPhase);
    document.getElementById("st-toggle").addEventListener("click", toggleCollapse);

    widget.querySelectorAll(".st-mode-btn").forEach(function (b) {
      b.addEventListener("click", function () {
        setMode(b.dataset.mode);
        widget.querySelectorAll(".st-mode-btn").forEach(function (x) { x.classList.toggle("active", x === b); });
      });
    });

    if (collapsed) widget.classList.add("collapsed");
    updateDisplay();
    updateStats();
    injectStyles();
  }

  function setMode(m) {
    mode = m;
    stop();
    remaining = m === "work" ? WORK : m === "short" ? SHORT : LONG;
    modeLabel.textContent = m === "work" ? "Nauka" : m === "short" ? "Przerwa" : "Długa przerwa";
    updateDisplay();
    btnStart.innerHTML = '<i class="fa-solid fa-play"></i>';
  }

  function toggleTimer() {
    running ? stop() : start();
  }

  function start() {
    running = true;
    btnStart.innerHTML = '<i class="fa-solid fa-pause"></i>';
    interval = setInterval(tick, 1000);
  }

  function stop() {
    running = false;
    btnStart.innerHTML = '<i class="fa-solid fa-play"></i>';
    if (interval) { clearInterval(interval); interval = null; }
  }

  function tick() {
    remaining--;
    if (remaining <= 0) {
      stop();
      onPhaseEnd();
    }
    updateDisplay();
  }

  function onPhaseEnd() {
    if (mode === "work") {
      sessionsCompleted++;
      addMinutes(25);
      playSound();
      if (sessionsCompleted % SESSIONS_BEFORE_LONG === 0) {
        setMode("long");
      } else {
        setMode("short");
      }
    } else {
      playSound();
      setMode("work");
    }
    // Auto-highlight the right mode button
    widget.querySelectorAll(".st-mode-btn").forEach(function (b) { b.classList.toggle("active", b.dataset.mode === mode); });
  }

  function resetTimer() {
    stop();
    remaining = mode === "work" ? WORK : mode === "short" ? SHORT : LONG;
    updateDisplay();
  }

  function skipPhase() {
    stop();
    onPhaseEnd();
  }

  function updateDisplay() {
    var m = Math.floor(remaining / 60);
    var s = remaining % 60;
    if (display) display.textContent = (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
    // Update page title when running
    if (running) {
      document.title = display.textContent + " – " + (mode === "work" ? "Nauka" : "Przerwa");
    }
  }

  function updateStats() {
    if (statsEl) statsEl.innerHTML = "Dziś: <strong>" + getTodayMinutes() + " min</strong>";
  }

  function toggleCollapse() {
    collapsed = !collapsed;
    widget.classList.toggle("collapsed", collapsed);
    localStorage.setItem("timer-collapsed", collapsed ? "1" : "0");
  }

  function playSound() {
    try {
      var ctx = new (window.AudioContext || window.webkitAudioContext)();
      [0, 0.15, 0.3].forEach(function (t) {
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.frequency.value = 800;
        gain.gain.value = 0.15;
        osc.start(ctx.currentTime + t);
        osc.stop(ctx.currentTime + t + 0.1);
      });
    } catch (e) { /* silent fail */ }
  }

  function injectStyles() {
    var s = document.createElement("style");
    s.textContent =
      '#study-timer{position:fixed;bottom:20px;right:20px;z-index:9998;width:220px;background:var(--st-bg,#fff);border-radius:16px;box-shadow:0 8px 30px rgba(0,0,0,.15);border:1px solid rgba(99,102,241,.15);font-family:Inter,system-ui,sans-serif;transition:all .3s ease;overflow:hidden}' +
      '.dark #study-timer{--st-bg:#1e1e2e;border-color:rgba(99,102,241,.3)}' +
      '#st-header{display:flex;align-items:center;justify-content:space-between;padding:10px 14px;cursor:pointer;user-select:none;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;font-size:13px;font-weight:600}' +
      '#st-header button{background:none;border:none;color:#fff;cursor:pointer;font-size:12px;padding:4px;opacity:.8;transition:opacity .2s}' +
      '#st-header button:hover{opacity:1}' +
      '#st-body{padding:16px 14px;text-align:center}' +
      '#study-timer.collapsed #st-body{display:none}' +
      '#study-timer.collapsed{width:auto}' +
      '#study-timer.collapsed #st-toggle i{transform:rotate(180deg)}' +
      '#st-display{font-size:40px;font-weight:700;font-variant-numeric:tabular-nums;color:#6366f1;margin:8px 0}' +
      '.dark #st-display{color:#a5b4fc}' +
      '#st-mode-label{font-size:12px;color:#9ca3af;text-transform:uppercase;letter-spacing:.5px;font-weight:600}' +
      '#st-controls{display:flex;justify-content:center;gap:8px;margin:12px 0}' +
      '.st-btn{width:40px;height:40px;border-radius:12px;border:1px solid #e5e7eb;background:#f9fafb;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#374151;font-size:14px;transition:all .2s}' +
      '.dark .st-btn{background:#374151;border-color:#4b5563;color:#e2e8f0}' +
      '.st-btn:hover{background:#e5e7eb}' +
      '.dark .st-btn:hover{background:#4b5563}' +
      '.st-btn-primary{background:#6366f1!important;border-color:#6366f1!important;color:#fff!important;width:48px;height:48px;font-size:16px}' +
      '.st-btn-primary:hover{background:#4f46e5!important}' +
      '#st-modes{display:flex;gap:4px;justify-content:center;margin-bottom:10px}' +
      '.st-mode-btn{border:none;background:#f3f4f6;color:#6b7280;padding:4px 10px;border-radius:8px;font-size:11px;cursor:pointer;font-weight:500;transition:all .2s}' +
      '.dark .st-mode-btn{background:#374151;color:#9ca3af}' +
      '.st-mode-btn.active{background:#6366f1;color:#fff}' +
      '#st-stats{font-size:12px;color:#9ca3af}';
    document.head.appendChild(s);
  }

  // ── Init ──
  if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", create); }
  else { create(); }
})();
