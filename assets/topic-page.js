/* ===== Matematyka to Podstawa – Topic Page Engine v2 =====
   Features: topic switcher, scroll memory, reading progress,
   back-to-top, rich step explanations, SVG diagrams, reveal animations
   ============================================================= */
(function () {
  const colorMap = {
    blue:   { badge:"bg-blue-100 text-blue-700",   accent:"text-blue-700",   btn:"text-blue-700",   bg:"bg-blue-50",   border:"border-blue-200" },
    green:  { badge:"bg-green-100 text-green-700",  accent:"text-green-700",  btn:"text-green-700",  bg:"bg-green-50",  border:"border-green-200" },
    purple: { badge:"bg-purple-100 text-purple-700", accent:"text-purple-700", btn:"text-purple-700", bg:"bg-purple-50", border:"border-purple-200" },
    yellow: { badge:"bg-yellow-100 text-yellow-700", accent:"text-yellow-700", btn:"text-yellow-700", bg:"bg-yellow-50", border:"border-yellow-200" },
    red:    { badge:"bg-red-100 text-red-700",     accent:"text-red-700",     btn:"text-red-700",    bg:"bg-red-50",    border:"border-red-200" },
    indigo: { badge:"bg-indigo-100 text-indigo-700", accent:"text-indigo-700", btn:"text-indigo-700", bg:"bg-indigo-50", border:"border-indigo-200" },
    pink:   { badge:"bg-pink-100 text-pink-700",   accent:"text-pink-700",   btn:"text-pink-700",   bg:"bg-pink-50",   border:"border-pink-200" },
    orange: { badge:"bg-orange-100 text-orange-700", accent:"text-orange-700", btn:"text-orange-700", bg:"bg-orange-50", border:"border-orange-200" },
    cyan:   { badge:"bg-cyan-100 text-cyan-700",   accent:"text-cyan-700",   btn:"text-cyan-700",   bg:"bg-cyan-50",   border:"border-cyan-200" },
    teal:   { badge:"bg-teal-100 text-teal-700",   accent:"text-teal-700",   btn:"text-teal-700",   bg:"bg-teal-50",   border:"border-teal-200" }
  };

  const order = [
    "liczby-rzeczywiste","wyrazenia-algebraiczne","rownania","funkcje","ciagi",
    "trygonometria","planimetria","geometria-analityczna","stereometria","prawdopodobienstwo"
  ];

  /* ─── Math ─── */
  function renderMath(root) {
    if (window.renderMathInElement) {
      window.renderMathInElement(root, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false }
        ]
      });
    }
  }

  /* ─── Scroll memory ─── */
  function saveScrollPos(key) {
    try { sessionStorage.setItem("scroll_" + key, String(window.scrollY)); } catch(e){}
  }
  function restoreScrollPos(key) {
    try {
      const y = sessionStorage.getItem("scroll_" + key);
      if (y) { requestAnimationFrame(() => window.scrollTo(0, parseInt(y,10))); sessionStorage.removeItem("scroll_" + key); }
    } catch(e){}
  }
  /* Save position on index page when clicking topic */
  function saveIndexScroll() {
    try { sessionStorage.setItem("scroll_index", String(window.scrollY)); } catch(e){}
  }

  /* ─── Difficulty label helpers ─── */
  function difficultyClass(level) {
    if (/łatw/i.test(level)) return "difficulty-easy";
    if (/średni|sredn/i.test(level)) return "difficulty-medium";
    return "difficulty-hard";
  }

  /* ─── Rich task card ─── */
  function taskCard(task, index, tone) {
    const stepsHtml = task.steps.map((step, si) => {
      /* Each step can be an object {math, comment} or a plain string */
      if (typeof step === "object" && step.math) {
        return `
          <div class="step-block">
            <div class="step-number">${si + 1}</div>
            <div class="step-content">
              <p class="font-medium">${step.math}</p>
              ${step.comment ? `<p class="step-comment">${step.comment}</p>` : ""}
            </div>
          </div>`;
      }
      return `
        <div class="step-block">
          <div class="step-number">${si + 1}</div>
          <div class="step-content">
            <p class="font-medium">${step}</p>
          </div>
        </div>`;
    }).join("");

    return `
      <article class="card p-6 reveal">
        <div class="flex items-center justify-between mb-3">
          <span class="topic-chip ${tone.badge}">Zadanie ${index + 1}</span>
          <span class="topic-chip ${difficultyClass(task.level)}">${task.level}</span>
        </div>
        <p class="text-lg font-semibold mb-3">${task.q}</p>
        ${task.diagram ? `<div class="diagram-container mb-4">${task.diagram}<p class="diagram-label">${task.diagramLabel || ""}</p></div>` : ""}
        <div class="note-warn text-sm mb-4"><strong><i class="fa-solid fa-lightbulb mr-1"></i>Wskazówka:</strong> ${task.hint}</div>
        <button class="exercise-btn" data-solution-btn="${index}"><i class="fa-solid fa-eye mr-1"></i>Pokaż rozwiązanie krok po kroku</button>
        <div class="exercise-solution mt-4 bg-slate-50 rounded-xl border border-slate-200" id="sol-${index}" style="padding-left:1rem;padding-right:1rem;">
          <p class="font-bold mb-3 text-slate-900"><i class="fa-solid fa-pen-ruler mr-1"></i>Pełne rozwiązanie:</p>
          <div class="space-y-1 mb-4">${stepsHtml}</div>
          <div class="note-good"><strong><i class="fa-solid fa-check-circle mr-1"></i>Odpowiedź:</strong> ${task.answer}</div>
        </div>
      </article>
    `;
  }

  /* ─── Topic switcher HTML ─── */
  function buildTopicSwitcher(currentKey) {
    const topics = window.MATURA_TOPICS;
    const items = order.map(key => {
      const t = topics[key];
      if (!t) return "";
      const isCurrent = key === currentKey;
      return `<a href="${key}.html" class="topic-switcher-item ${isCurrent ? "current" : ""}">
        <i class="fa-solid ${t.icon}"></i>
        <span>${t.title}</span>
        ${isCurrent ? '<i class="fa-solid fa-circle text-blue-500 text-xs ml-auto"></i>' : ""}
      </a>`;
    }).join("");
    return items;
  }

  /* ─── SVG Diagrams ─── */
  function getDiagramForTopic(topicKey) {
    const diagrams = {
      "trygonometria": `
        <div class="diagram-container">
          <svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg" style="max-width:380px">
            <defs><marker id="ah" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#334155"/></marker></defs>
            <!-- Triangle -->
            <polygon points="50,270 350,270 350,70" fill="#eff6ff" stroke="#3b82f6" stroke-width="2.5"/>
            <!-- Right angle -->
            <rect x="325" y="245" width="25" height="25" fill="none" stroke="#64748b" stroke-width="1.5"/>
            <!-- Labels -->
            <text x="190" y="290" text-anchor="middle" font-size="16" font-weight="700" fill="#334155">a (przyprostokątna)</text>
            <text x="372" y="178" text-anchor="start" font-size="16" font-weight="700" fill="#334155">b</text>
            <text x="175" y="160" text-anchor="middle" font-size="16" font-weight="700" fill="#3b82f6">c (przeciwprostokątna)</text>
            <!-- Angle arc -->
            <path d="M 90,270 A 40,40 0 0,0 72,242" fill="none" stroke="#ef4444" stroke-width="2"/>
            <text x="100" y="252" font-size="16" font-weight="700" fill="#ef4444">α</text>
            <!-- Angle arc beta -->
            <path d="M 350,110 A 40,40 0 0,0 318,72" fill="none" stroke="#8b5cf6" stroke-width="2"/>
            <text x="322" y="104" font-size="16" font-weight="700" fill="#8b5cf6">β</text>
            <!-- Formulas -->
            <text x="50" y="18" font-size="13" fill="#64748b">sin α = b/c    cos α = a/c    tan α = b/a</text>
          </svg>
          <p class="diagram-label">Trójkąt prostokątny – definicje funkcji trygonometrycznych</p>
        </div>`,
      "planimetria": `
        <div class="diagram-container">
          <svg viewBox="0 0 720 520" xmlns="http://www.w3.org/2000/svg" style="max-width:700px">
            <!-- Row 1: Triangle, Square, Rectangle -->
            <!-- Triangle -->
            <polygon points="60,170 200,170 130,40" fill="#fef3c7" stroke="#f59e0b" stroke-width="2.5"/>
            <line x1="130" y1="40" x2="130" y2="170" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4,3"/>
            <text x="133" y="110" font-size="12" font-weight="700" fill="#ef4444">h</text>
            <text x="120" y="190" font-size="14" font-weight="700" fill="#92400e">a</text>
            <text x="65" y="200" font-size="11" fill="#64748b">P = ½ah</text>
            <text x="80" y="30" font-size="12" font-weight="700" fill="#92400e">Trójkąt</text>

            <!-- Square -->
            <rect x="250" y="60" width="120" height="120" fill="#dcfce7" stroke="#22c55e" stroke-width="2.5"/>
            <text x="300" y="196" font-size="14" font-weight="700" fill="#166534">a</text>
            <text x="378" y="128" font-size="14" font-weight="700" fill="#166534">a</text>
            <line x1="250" y1="60" x2="370" y2="180" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4,3"/>
            <text x="295" y="130" font-size="11" fill="#64748b">d=a√2</text>
            <text x="260" y="200" font-size="11" fill="#64748b">P = a²</text>
            <text x="275" y="50" font-size="12" font-weight="700" fill="#166534">Kwadrat</text>

            <!-- Circle -->
            <circle cx="550" cy="115" r="75" fill="#fdf2f8" stroke="#ec4899" stroke-width="2.5"/>
            <line x1="550" y1="115" x2="625" y2="115" stroke="#ec4899" stroke-width="2" stroke-dasharray="5,3"/>
            <text x="582" y="108" font-size="13" font-weight="700" fill="#be185d">r</text>
            <circle cx="550" cy="115" r="3" fill="#be185d"/>
            <text x="505" y="200" font-size="11" fill="#64748b">P = πr²  C = 2πr</text>
            <text x="525" y="25" font-size="12" font-weight="700" fill="#be185d">Koło</text>

            <!-- Row 2: Parallelogram, Trapezoid, Rhombus -->
            <!-- Parallelogram -->
            <polygon points="30,400 180,400 220,290 70,290" fill="#e0e7ff" stroke="#6366f1" stroke-width="2.5"/>
            <line x1="70" y1="290" x2="70" y2="400" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4,3"/>
            <text x="73" y="352" font-size="12" font-weight="700" fill="#ef4444">h</text>
            <text x="95" y="418" font-size="14" font-weight="700" fill="#4338ca">a</text>
            <text x="30" y="430" font-size="11" fill="#64748b">P = ah</text>
            <text x="50" y="278" font-size="12" font-weight="700" fill="#4338ca">Równoległobok</text>

            <!-- Trapezoid -->
            <polygon points="280,400 440,400 410,300 310,300" fill="#fce7f3" stroke="#db2777" stroke-width="2.5"/>
            <line x1="310" y1="300" x2="310" y2="400" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
            <text x="315" y="358" font-size="12" font-weight="700" fill="#64748b">h</text>
            <text x="348" y="418" font-size="13" font-weight="700" fill="#9d174d">a</text>
            <text x="348" y="293" font-size="13" font-weight="700" fill="#9d174d">b</text>
            <text x="290" y="438" font-size="11" fill="#64748b">P = ½(a+b)h</text>
            <text x="330" y="278" font-size="12" font-weight="700" fill="#9d174d">Trapez</text>

            <!-- Rhombus -->
            <polygon points="600,290 660,355 600,420 540,355" fill="#fef9c3" stroke="#eab308" stroke-width="2.5"/>
            <line x1="540" y1="355" x2="660" y2="355" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="4,3"/>
            <text x="595" y="348" font-size="11" font-weight="700" fill="#3b82f6">d₁</text>
            <line x1="600" y1="290" x2="600" y2="420" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4,3"/>
            <text x="605" y="360" font-size="11" font-weight="700" fill="#ef4444">d₂</text>
            <text x="545" y="440" font-size="11" fill="#64748b">P = ½d₁d₂</text>
            <text x="575" y="278" font-size="12" font-weight="700" fill="#a16207">Romb</text>

            <!-- Bottom label -->
            <text x="160" y="500" font-size="11" fill="#94a3b8">Prostokąt: P = ab, Obw = 2(a+b)</text>
            <text x="420" y="500" font-size="11" fill="#94a3b8">Trójk. równoboczny: h = a√3/2</text>
          </svg>
          <p class="diagram-label">Figury płaskie – wzory na pola i obwody</p>
        </div>`,
      "stereometria": `
        <div class="diagram-container">
          <svg viewBox="0 0 750 560" xmlns="http://www.w3.org/2000/svg" style="max-width:720px">
            <!-- Row 1: Prostopadłościan, Ostrosłup, Walec -->

            <!-- Prostopadłościan (Cuboid) -->
            <polygon points="30,200 130,220 190,170 90,150" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/>
            <polygon points="30,200 30,110 90,60 90,150" fill="#d1fae5" stroke="#10b981" stroke-width="2"/>
            <polygon points="90,150 190,170 190,80 90,60" fill="#a7f3d0" stroke="#10b981" stroke-width="2"/>
            <line x1="30" y1="110" x2="130" y2="130" stroke="#10b981" stroke-width="1.5" stroke-dasharray="4,3"/>
            <line x1="130" y1="130" x2="190" y2="80" stroke="#10b981" stroke-width="1.5" stroke-dasharray="4,3"/>
            <line x1="130" y1="130" x2="130" y2="220" stroke="#10b981" stroke-width="1.5" stroke-dasharray="4,3"/>
            <text x="50" y="218" font-size="12" font-weight="700" fill="#047857">a</text>
            <text x="18" y="158" font-size="12" font-weight="700" fill="#047857">c</text>
            <text x="140" y="175" font-size="12" font-weight="700" fill="#047857">b</text>
            <text x="40" y="240" font-size="11" fill="#64748b">V = abc</text>
            <text x="30" y="258" font-size="11" fill="#64748b">Pc = 2(ab+bc+ac)</text>
            <text x="40" y="40" font-size="12" font-weight="700" fill="#047857">Prostopadłościan</text>

            <!-- Ostrosłup (Pyramid) -->
            <polygon points="280,210 370,230 410,190 320,170" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" fill-opacity="0.6"/>
            <line x1="280" y1="210" x2="345" y2="70" stroke="#f59e0b" stroke-width="2"/>
            <line x1="370" y1="230" x2="345" y2="70" stroke="#f59e0b" stroke-width="2"/>
            <line x1="410" y1="190" x2="345" y2="70" stroke="#f59e0b" stroke-width="2"/>
            <line x1="320" y1="170" x2="345" y2="70" stroke="#f59e0b" stroke-width="2"/>
            <line x1="345" y1="70" x2="345" y2="195" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4,3"/>
            <circle cx="345" cy="195" r="3" fill="#ef4444"/>
            <text x="350" y="140" font-size="12" font-weight="700" fill="#ef4444">h</text>
            <text x="280" y="240" font-size="11" fill="#64748b">V = ⅓·Pp·h</text>
            <text x="280" y="258" font-size="11" fill="#64748b">Pp = pole podstawy</text>
            <text x="290" y="40" font-size="12" font-weight="700" fill="#92400e">Ostrosłup</text>

            <!-- Walec (Cylinder) -->
            <ellipse cx="575" cy="210" rx="70" ry="22" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
            <line x1="505" y1="210" x2="505" y2="80" stroke="#3b82f6" stroke-width="2"/>
            <line x1="645" y1="210" x2="645" y2="80" stroke="#3b82f6" stroke-width="2"/>
            <ellipse cx="575" cy="80" rx="70" ry="22" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
            <line x1="575" y1="80" x2="645" y2="80" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4,3"/>
            <text x="605" y="73" font-size="12" font-weight="700" fill="#ef4444">r</text>
            <line x1="650" y1="80" x2="650" y2="210" stroke="#64748b" stroke-width="1" stroke-dasharray="4,3"/>
            <text x="655" y="150" font-size="12" font-weight="700" fill="#334155">h</text>
            <text x="520" y="250" font-size="11" fill="#64748b">V = πr²h</text>
            <text x="520" y="268" font-size="11" fill="#64748b">Pc = 2πr(r+h)</text>
            <text x="548" y="40" font-size="12" font-weight="700" fill="#1d4ed8">Walec</text>

            <!-- Row 2: Stożek, Kula, Graniastosłup -->

            <!-- Stożek (Cone) -->
            <ellipse cx="100" cy="480" rx="70" ry="22" fill="#fce7f3" stroke="#ec4899" stroke-width="2"/>
            <line x1="30" y1="480" x2="100" y2="320" stroke="#ec4899" stroke-width="2"/>
            <line x1="170" y1="480" x2="100" y2="320" stroke="#ec4899" stroke-width="2"/>
            <line x1="100" y1="320" x2="100" y2="480" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4,3"/>
            <text x="105" y="410" font-size="12" font-weight="700" fill="#ef4444">h</text>
            <line x1="100" y1="480" x2="170" y2="480" stroke="#8b5cf6" stroke-width="1.5" stroke-dasharray="4,3"/>
            <text x="130" y="475" font-size="12" font-weight="700" fill="#8b5cf6">r</text>
            <line x1="100" y1="320" x2="170" y2="480" stroke="#64748b" stroke-width="1" stroke-dasharray="3,3"/>
            <text x="145" y="405" font-size="11" font-weight="600" fill="#64748b">l</text>
            <text x="30" y="520" font-size="11" fill="#64748b">V = ⅓πr²h</text>
            <text x="30" y="538" font-size="11" fill="#64748b">Pb = πrl</text>
            <text x="70" y="305" font-size="12" font-weight="700" fill="#9d174d">Stożek</text>

            <!-- Kula (Sphere) -->
            <circle cx="350" cy="420" r="85" fill="#f0f9ff" stroke="#0ea5e9" stroke-width="2.5"/>
            <ellipse cx="350" cy="420" rx="85" ry="28" fill="none" stroke="#0ea5e9" stroke-width="1.5" stroke-dasharray="5,3"/>
            <line x1="350" y1="420" x2="435" y2="420" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,3"/>
            <text x="385" y="413" font-size="13" font-weight="700" fill="#ef4444">R</text>
            <circle cx="350" cy="420" r="3" fill="#0369a1"/>
            <text x="295" y="520" font-size="11" fill="#64748b">V = ⁴⁄₃πR³</text>
            <text x="295" y="538" font-size="11" fill="#64748b">Pc = 4πR²</text>
            <text x="330" y="315" font-size="12" font-weight="700" fill="#0369a1">Kula</text>

            <!-- Graniastosłup (Prism – triangular) -->
            <polygon points="560,490 640,510 700,470" fill="#fef3c7" stroke="#d97706" stroke-width="2" fill-opacity="0.5"/>
            <polygon points="560,490 560,370 640,390 640,510" fill="#fef9c3" stroke="#d97706" stroke-width="2" fill-opacity="0.6"/>
            <polygon points="640,510 700,470 700,350 640,390" fill="#fde68a" stroke="#d97706" stroke-width="2" fill-opacity="0.6"/>
            <line x1="560" y1="370" x2="700" y2="350" stroke="#d97706" stroke-width="1.5" stroke-dasharray="4,3"/>
            <polygon points="560,370 640,390 700,350" fill="none" stroke="#d97706" stroke-width="2"/>
            <line x1="640" y1="390" x2="640" y2="510" stroke="#64748b" stroke-width="1" stroke-dasharray="4,3"/>
            <text x="645" y="455" font-size="12" font-weight="700" fill="#334155">h</text>
            <text x="610" y="520" font-size="11" fill="#64748b">Pp</text>
            <text x="560" y="540" font-size="11" fill="#64748b">V = Pp·h</text>
            <text x="570" y="340" font-size="12" font-weight="700" fill="#92400e">Graniastosłup</text>
          </svg>
          <p class="diagram-label">Bryły – prostopadłościan, ostrosłup, walec, stożek, kula, graniastosłup</p>
        </div>`,
      "funkcje": `
        <div class="diagram-container">
          <svg viewBox="0 0 440 320" xmlns="http://www.w3.org/2000/svg" style="max-width:420px">
            <defs><marker id="arw" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#334155"/></marker></defs>
            <!-- Axes -->
            <line x1="40" y1="280" x2="420" y2="280" stroke="#334155" stroke-width="2" marker-end="url(#arw)"/>
            <line x1="60" y1="300" x2="60" y2="20" stroke="#334155" stroke-width="2" marker-end="url(#arw)"/>
            <text x="425" y="285" font-size="14" font-weight="700" fill="#334155">x</text>
            <text x="50" y="15" font-size="14" font-weight="700" fill="#334155">y</text>
            <text x="48" y="295" font-size="12" fill="#64748b">0</text>
            <!-- Parabola y = x² (scaled) -->
            <path d="M 60,280 Q 60,100 180,40 Q 220,25 260,40 Q 380,100 380,280" fill="none" stroke="#3b82f6" stroke-width="2.5"/>
            <!-- Vertex -->
            <circle cx="220" cy="30" r="4" fill="#3b82f6"/>
            <text x="228" y="28" font-size="12" font-weight="700" fill="#3b82f6">wierzchołek (p, q)</text>
            <!-- Linear function -->
            <line x1="60" y1="240" x2="400" y2="80" stroke="#ef4444" stroke-width="2"/>
            <text x="310" y="95" font-size="12" font-weight="700" fill="#ef4444">f(x) = ax + b</text>
            <text x="150" y="55" font-size="12" font-weight="700" fill="#3b82f6">g(x) = a(x-p)² + q</text>
          </svg>
          <p class="diagram-label">Funkcja liniowa i kwadratowa – wykresy</p>
        </div>`,
      "geometria-analityczna": `
        <div class="diagram-container">
          <svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg" style="max-width:380px">
            <defs><marker id="arw2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#334155"/></marker></defs>
            <!-- Axes -->
            <line x1="20" y1="280" x2="380" y2="280" stroke="#334155" stroke-width="2" marker-end="url(#arw2)"/>
            <line x1="40" y1="300" x2="40" y2="20" stroke="#334155" stroke-width="2" marker-end="url(#arw2)"/>
            <text x="385" y="283" font-size="13" fill="#334155">x</text>
            <text x="30" y="15" font-size="13" fill="#334155">y</text>
            <!-- Points -->
            <circle cx="100" cy="200" r="5" fill="#ef4444"/>
            <text x="108" y="195" font-size="13" font-weight="700" fill="#ef4444">A(x₁, y₁)</text>
            <circle cx="300" cy="100" r="5" fill="#8b5cf6"/>
            <text x="308" y="95" font-size="13" font-weight="700" fill="#8b5cf6">B(x₂, y₂)</text>
            <!-- Distance line -->
            <line x1="100" y1="200" x2="300" y2="100" stroke="#3b82f6" stroke-width="2" stroke-dasharray="6,3"/>
            <!-- Midpoint -->
            <circle cx="200" cy="150" r="4" fill="#10b981"/>
            <text x="208" y="145" font-size="12" font-weight="600" fill="#10b981">S (środek)</text>
            <!-- Dashed projections -->
            <line x1="100" y1="200" x2="300" y2="200" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,3"/>
            <line x1="300" y1="200" x2="300" y2="100" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,3"/>
            <text x="185" y="218" font-size="12" fill="#64748b">|x₂-x₁|</text>
            <text x="308" y="158" font-size="12" fill="#64748b">|y₂-y₁|</text>
            <text x="60" y="310" font-size="11" fill="#64748b">d = √[(x₂-x₁)²+(y₂-y₁)²]</text>
          </svg>
          <p class="diagram-label">Układ współrzędnych – odległość i środek odcinka</p>
        </div>`,
      "liczby-rzeczywiste": `
        <div class="diagram-container">
          <svg viewBox="0 0 520 300" xmlns="http://www.w3.org/2000/svg" style="max-width:500px">
            <!-- Number line -->
            <defs><marker id="arwN" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#334155"/></marker></defs>
            <line x1="20" y1="80" x2="500" y2="80" stroke="#334155" stroke-width="2" marker-end="url(#arwN)"/>
            <line x1="260" y1="65" x2="260" y2="95" stroke="#334155" stroke-width="2"/>
            <text x="255" y="112" font-size="14" font-weight="700" fill="#334155">0</text>
            <!-- Ticks -->
            <line x1="60" y1="72" x2="60" y2="88" stroke="#64748b" stroke-width="1.5"/>
            <text x="52" y="108" font-size="12" fill="#64748b">-4</text>
            <line x1="110" y1="72" x2="110" y2="88" stroke="#64748b" stroke-width="1.5"/>
            <text x="102" y="108" font-size="12" fill="#64748b">-3</text>
            <line x1="160" y1="72" x2="160" y2="88" stroke="#64748b" stroke-width="1.5"/>
            <text x="152" y="108" font-size="12" fill="#64748b">-2</text>
            <line x1="210" y1="72" x2="210" y2="88" stroke="#64748b" stroke-width="1.5"/>
            <text x="202" y="108" font-size="12" fill="#64748b">-1</text>
            <line x1="310" y1="72" x2="310" y2="88" stroke="#64748b" stroke-width="1.5"/>
            <text x="306" y="108" font-size="12" fill="#64748b">1</text>
            <line x1="360" y1="72" x2="360" y2="88" stroke="#64748b" stroke-width="1.5"/>
            <text x="356" y="108" font-size="12" fill="#64748b">2</text>
            <line x1="410" y1="72" x2="410" y2="88" stroke="#64748b" stroke-width="1.5"/>
            <text x="406" y="108" font-size="12" fill="#64748b">3</text>
            <line x1="460" y1="72" x2="460" y2="88" stroke="#64748b" stroke-width="1.5"/>
            <text x="456" y="108" font-size="12" fill="#64748b">4</text>
            <!-- Special points -->
            <circle cx="330" cy="80" r="5" fill="#3b82f6"/>
            <text x="322" y="60" font-size="11" font-weight="600" fill="#3b82f6">√2</text>
            <circle cx="417" cy="80" r="5" fill="#ef4444"/>
            <text x="409" y="60" font-size="11" font-weight="600" fill="#ef4444">π</text>
            <circle cx="370" cy="80" r="5" fill="#8b5cf6"/>
            <text x="362" y="60" font-size="11" font-weight="600" fill="#8b5cf6">e</text>
            <!-- Venn diagram of number sets -->
            <ellipse cx="260" cy="220" rx="230" ry="60" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
            <text x="60" y="275" font-size="12" font-weight="600" fill="#64748b">ℝ – liczby rzeczywiste</text>
            <ellipse cx="230" cy="220" rx="160" ry="45" fill="none" stroke="#3b82f6" stroke-width="1.5"/>
            <text x="100" y="257" font-size="11" font-weight="600" fill="#3b82f6">ℚ – wymierne</text>
            <ellipse cx="200" cy="220" rx="90" ry="32" fill="#eff6ff" stroke="#6366f1" stroke-width="1.5"/>
            <text x="155" y="226" font-size="11" font-weight="600" fill="#6366f1">ℤ – całkowite</text>
            <ellipse cx="185" cy="220" rx="45" ry="20" fill="#e0e7ff" stroke="#4f46e5" stroke-width="1.5"/>
            <text x="167" y="224" font-size="10" font-weight="700" fill="#4f46e5">ℕ</text>
            <text x="380" y="226" font-size="11" font-weight="600" fill="#ef4444">ℝ\\ℚ – niewymierne</text>
          </svg>
          <p class="diagram-label">Oś liczbowa i hierarchia zbiorów liczbowych</p>
        </div>`,
      "wyrazenia-algebraiczne": `
        <div class="diagram-container">
          <svg viewBox="0 0 500 250" xmlns="http://www.w3.org/2000/svg" style="max-width:480px">
            <!-- Box 1: wzory skróconego mnożenia -->
            <rect x="10" y="10" width="230" height="230" rx="12" fill="#faf5ff" stroke="#8b5cf6" stroke-width="2"/>
            <text x="42" y="40" font-size="14" font-weight="800" fill="#6d28d9">Wzory skróconego mnożenia</text>
            <text x="30" y="70" font-size="13" fill="#4c1d95">(a + b)² = a² + 2ab + b²</text>
            <text x="30" y="95" font-size="13" fill="#4c1d95">(a − b)² = a² − 2ab + b²</text>
            <text x="30" y="120" font-size="13" fill="#4c1d95">a² − b² = (a−b)(a+b)</text>
            <text x="30" y="150" font-size="13" fill="#4c1d95">(a+b)³ = a³+3a²b+3ab²+b³</text>
            <text x="30" y="175" font-size="13" fill="#4c1d95">(a−b)³ = a³−3a²b+3ab²−b³</text>
            <text x="30" y="200" font-size="13" fill="#4c1d95">a³−b³ = (a−b)(a²+ab+b²)</text>
            <text x="30" y="225" font-size="13" fill="#4c1d95">a³+b³ = (a+b)(a²−ab+b²)</text>
            <!-- Box 2: schemat Hornera -->
            <rect x="260" y="10" width="230" height="130" rx="12" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
            <text x="295" y="40" font-size="14" font-weight="800" fill="#1d4ed8">Schemat Hornera</text>
            <text x="280" y="68" font-size="11" fill="#1e40af">W(x) = aₙxⁿ + ... + a₁x + a₀</text>
            <text x="280" y="92" font-size="11" fill="#1e40af">W(c) = (...((aₙ·c + aₙ₋₁)·c</text>
            <text x="305" y="110" font-size="11" fill="#1e40af">+ aₙ₋₂)·c + ... + a₁)·c + a₀</text>
            <text x="280" y="132" font-size="10" fill="#64748b">Szybkie dzielenie wielomianów</text>
            <!-- Arrow -->
            <rect x="260" y="160" width="230" height="80" rx="12" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/>
            <text x="290" y="188" font-size="13" font-weight="800" fill="#047857">Pamiętaj!</text>
            <text x="280" y="212" font-size="11" fill="#047857">Rozkład na czynniki = klucz</text>
            <text x="280" y="230" font-size="11" fill="#047857">do upraszczania wyrażeń</text>
          </svg>
          <p class="diagram-label">Wzory skróconego mnożenia i schemat Hornera</p>
        </div>`,
      "rownania": `
        <div class="diagram-container">
          <svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" style="max-width:480px">
            <!-- Number line for inequalities -->
            <defs><marker id="arwR" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#334155"/></marker></defs>
            <!-- Quadratic formula -->
            <rect x="10" y="10" width="480" height="80" rx="12" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
            <text x="30" y="38" font-size="13" font-weight="800" fill="#92400e">Równanie kwadratowe: ax² + bx + c = 0</text>
            <text x="30" y="60" font-size="12" fill="#78350f">Δ = b² − 4ac</text>
            <text x="200" y="60" font-size="12" fill="#78350f">x₁,₂ = (−b ± √Δ) / 2a</text>
            <text x="30" y="80" font-size="11" fill="#92400e">Δ > 0 → 2 rozw. | Δ = 0 → 1 rozw. | Δ &lt; 0 → brak rozw.</text>
            <!-- Inequality on number line -->
            <text x="30" y="128" font-size="13" font-weight="800" fill="#1d4ed8">Nierówność na osi:</text>
            <line x1="40" y1="155" x2="460" y2="155" stroke="#334155" stroke-width="2" marker-end="url(#arwR)"/>
            <line x1="150" y1="145" x2="150" y2="165" stroke="#ef4444" stroke-width="2"/>
            <text x="145" y="182" font-size="12" font-weight="600" fill="#ef4444">x₁</text>
            <line x1="350" y1="145" x2="350" y2="165" stroke="#ef4444" stroke-width="2"/>
            <text x="345" y="182" font-size="12" font-weight="600" fill="#ef4444">x₂</text>
            <circle cx="150" cy="155" r="5" fill="none" stroke="#ef4444" stroke-width="2"/>
            <circle cx="350" cy="155" r="5" fill="none" stroke="#ef4444" stroke-width="2"/>
            <line x1="150" y1="150" x2="350" y2="150" stroke="#3b82f6" stroke-width="4" opacity="0.4"/>
            <text x="220" y="145" font-size="11" font-weight="600" fill="#3b82f6">(x₁, x₂)</text>
            <!-- System of equations -->
            <rect x="10" y="200" width="230" height="90" rx="12" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
            <text x="30" y="225" font-size="13" font-weight="800" fill="#1d4ed8">Układ równań</text>
            <text x="30" y="248" font-size="12" fill="#1e40af">Metoda podstawiania</text>
            <text x="30" y="268" font-size="12" fill="#1e40af">Metoda przeciwnych współcz.</text>
            <text x="30" y="282" font-size="11" fill="#64748b">Wyznacz jedną zm. → podstaw</text>
            <!-- Absolute value -->
            <rect x="260" y="200" width="230" height="90" rx="12" fill="#fdf2f8" stroke="#ec4899" stroke-width="2"/>
            <text x="280" y="225" font-size="13" font-weight="800" fill="#be185d">Wartość bezwzględna</text>
            <text x="280" y="248" font-size="12" fill="#9d174d">|x − a| = b</text>
            <text x="280" y="268" font-size="12" fill="#9d174d">→ x−a = b lub x−a = −b</text>
            <text x="280" y="282" font-size="11" fill="#64748b">Zawsze 2 przypadki!</text>
          </svg>
          <p class="diagram-label">Równania kwadratowe, nierówności i układy</p>
        </div>`,
      "ciagi": `
        <div class="diagram-container">
          <svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" style="max-width:480px">
            <!-- Arithmetic sequence bars -->
            <text x="20" y="25" font-size="14" font-weight="800" fill="#1d4ed8">Ciąg arytmetyczny (r = 3)</text>
            <rect x="20" y="35" width="30" height="30" rx="4" fill="#3b82f6"/><text x="29" y="55" font-size="11" font-weight="700" fill="#fff">2</text>
            <rect x="60" y="35" width="30" height="50" rx="4" fill="#3b82f6"/><text x="69" y="65" font-size="11" font-weight="700" fill="#fff">5</text>
            <rect x="100" y="35" width="30" height="70" rx="4" fill="#3b82f6"/><text x="109" y="75" font-size="11" font-weight="700" fill="#fff">8</text>
            <rect x="140" y="35" width="30" height="90" rx="4" fill="#3b82f6"/><text x="146" y="85" font-size="11" font-weight="700" fill="#fff">11</text>
            <rect x="180" y="35" width="30" height="110" rx="4" fill="#3b82f6"/><text x="186" y="95" font-size="11" font-weight="700" fill="#fff">14</text>
            <text x="42" y="33" font-size="10" fill="#3b82f6">+3</text>
            <text x="82" y="33" font-size="10" fill="#3b82f6">+3</text>
            <text x="122" y="33" font-size="10" fill="#3b82f6">+3</text>
            <text x="162" y="33" font-size="10" fill="#3b82f6">+3</text>
            <!-- Formulas arytm. -->
            <text x="20" y="172" font-size="12" fill="#1e40af">aₙ = a₁ + (n−1)·r</text>
            <text x="20" y="192" font-size="12" fill="#1e40af">Sₙ = (a₁+aₙ)·n/2</text>
            <!-- Geometric sequence bars -->
            <text x="270" y="25" font-size="14" font-weight="800" fill="#059669">Ciąg geometryczny (q = 2)</text>
            <rect x="270" y="105" width="30" height="15" rx="4" fill="#10b981"/><text x="279" y="117" font-size="9" font-weight="700" fill="#fff">2</text>
            <rect x="310" y="90" width="30" height="30" rx="4" fill="#10b981"/><text x="319" y="110" font-size="9" font-weight="700" fill="#fff">4</text>
            <rect x="350" y="60" width="30" height="60" rx="4" fill="#10b981"/><text x="359" y="95" font-size="9" font-weight="700" fill="#fff">8</text>
            <rect x="390" y="0" width="30" height="120" rx="4" fill="#10b981"/><text x="396" y="70" font-size="9" font-weight="700" fill="#fff">16</text>
            <rect x="430" y="-120" width="30" height="240" rx="4" fill="#10b981" opacity="0.6"/><text x="436" y="50" font-size="9" font-weight="700" fill="#fff">32</text>
            <text x="295" y="85" font-size="10" fill="#059669">×2</text>
            <text x="335" y="85" font-size="10" fill="#059669">×2</text>
            <text x="375" y="85" font-size="10" fill="#059669">×2</text>
            <!-- Formulas geom. -->
            <text x="270" y="172" font-size="12" fill="#047857">aₙ = a₁ · qⁿ⁻¹</text>
            <text x="270" y="192" font-size="12" fill="#047857">Sₙ = a₁(1−qⁿ)/(1−q)</text>
            <!-- Percent compound -->
            <rect x="10" y="215" width="480" height="75" rx="12" fill="#fef9c3" stroke="#eab308" stroke-width="2"/>
            <text x="30" y="240" font-size="13" font-weight="800" fill="#854d0e">Procent składany (zastosowanie ciągu geom.)</text>
            <text x="30" y="262" font-size="12" fill="#713f12">K = K₀ · (1 + p/100)ⁿ</text>
            <text x="30" y="280" font-size="11" fill="#92400e">K₀ – kapitał, p – stopa [%], n – liczba lat</text>
          </svg>
          <p class="diagram-label">Ciągi arytmetyczne i geometryczne – wzory i wykresy</p>
        </div>`,
      "prawdopodobienstwo": `
        <div class="diagram-container">
          <svg viewBox="0 0 500 310" xmlns="http://www.w3.org/2000/svg" style="max-width:480px">
            <!-- Tree diagram -->
            <text x="20" y="22" font-size="14" font-weight="800" fill="#0891b2">Drzewko prawdopodobieństwa</text>
            <circle cx="60" cy="120" r="14" fill="#ecfeff" stroke="#0891b2" stroke-width="2"/>
            <text x="55" y="125" font-size="11" font-weight="700" fill="#0891b2">Ω</text>
            <!-- Branch 1 -->
            <line x1="74" y1="112" x2="160" y2="60" stroke="#3b82f6" stroke-width="1.5"/>
            <circle cx="170" cy="55" r="12" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
            <text x="164" y="59" font-size="10" font-weight="700" fill="#3b82f6">A</text>
            <text x="100" y="78" font-size="10" fill="#3b82f6">P(A)</text>
            <!-- Branch 2 -->
            <line x1="74" y1="128" x2="160" y2="180" stroke="#ef4444" stroke-width="1.5"/>
            <circle cx="170" cy="185" r="12" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
            <text x="164" y="189" font-size="10" font-weight="700" fill="#ef4444">A'</text>
            <text x="95" y="168" font-size="10" fill="#ef4444">P(A')</text>
            <!-- Sub-branches from A -->
            <line x1="182" y1="50" x2="250" y2="30" stroke="#10b981" stroke-width="1.5"/>
            <rect x="255" y="18" width="28" height="20" rx="4" fill="#ecfdf5" stroke="#10b981" stroke-width="1.5"/>
            <text x="261" y="33" font-size="9" font-weight="700" fill="#10b981">A∩B</text>
            <line x1="182" y1="60" x2="250" y2="80" stroke="#6b7280" stroke-width="1.5"/>
            <rect x="255" y="68" width="28" height="20" rx="4" fill="#f9fafb" stroke="#6b7280" stroke-width="1.5"/>
            <text x="259" y="83" font-size="9" font-weight="700" fill="#6b7280">A∩B'</text>
            <!-- Formulas box -->
            <rect x="300" y="10" width="190" height="110" rx="12" fill="#f0f9ff" stroke="#0284c7" stroke-width="2"/>
            <text x="320" y="35" font-size="12" font-weight="800" fill="#0c4a6e">Wzory</text>
            <text x="320" y="55" font-size="11" fill="#0c4a6e">P(A) = |A| / |Ω|</text>
            <text x="320" y="75" font-size="11" fill="#0c4a6e">P(A∪B) = P(A)+P(B)−P(A∩B)</text>
            <text x="320" y="95" font-size="11" fill="#0c4a6e">P(A') = 1 − P(A)</text>
            <text x="320" y="112" font-size="11" fill="#0c4a6e">P(A|B) = P(A∩B)/P(B)</text>
            <!-- Combinatorics -->
            <rect x="10" y="210" width="230" height="90" rx="12" fill="#faf5ff" stroke="#8b5cf6" stroke-width="2"/>
            <text x="30" y="235" font-size="13" font-weight="800" fill="#6d28d9">Kombinatoryka</text>
            <text x="30" y="258" font-size="11" fill="#5b21b6">Permutacja: n!</text>
            <text x="30" y="275" font-size="11" fill="#5b21b6">Wariacja: n!/(n−k)!</text>
            <text x="30" y="292" font-size="11" fill="#5b21b6">Kombinacja: n!/[k!(n−k)!]</text>
            <!-- Bernoulli -->
            <rect x="260" y="210" width="230" height="90" rx="12" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/>
            <text x="280" y="235" font-size="13" font-weight="800" fill="#047857">Schemat Bernoulliego</text>
            <text x="280" y="258" font-size="11" fill="#065f46">P(X=k) = C(n,k)·pᵏ·(1−p)ⁿ⁻ᵏ</text>
            <text x="280" y="278" font-size="11" fill="#065f46">n – prób, p – P(sukcesu)</text>
            <text x="280" y="295" font-size="11" fill="#065f46">k – ile sukcesów szukamy</text>
          </svg>
          <p class="diagram-label">Drzewko, kombinatoryka i schemat Bernoulliego</p>
        </div>`
    };
    return diagrams[topicKey] || "";
  }

  /* ─── Main render ─── */
  function renderTopic(topicKey) {
    const topic = window.MATURA_TOPICS?.[topicKey];
    if (!topic) {
      document.body.innerHTML = '<main class="max-w-3xl mx-auto p-8"><h1 class="text-3xl font-bold mb-4">Nie znaleziono działu</h1><a class="text-blue-700 underline" href="../index.html">Wróć do strony głównej</a></main>';
      return;
    }

    const tone = colorMap[topic.color] || colorMap.blue;
    const idx = order.indexOf(topicKey);
    const prev = idx > 0 ? order[idx - 1] : null;
    const next = idx < order.length - 1 ? order[idx + 1] : null;

    document.title = `${topic.title} - Matematyka to Podstawa`;

    /* Theory HTML */
    const theoryHtml = topic.theory.map((block, bi) => `
      <article class="card p-6 reveal" id="theory-${bi}">
        <h3 class="card-title ${tone.accent}"><i class="fa-solid fa-book-open mr-2 text-sm opacity-60"></i>${block.title}</h3>
        <p class="text-slate-700 mb-4 leading-relaxed">${block.text}</p>
        ${block.diagram ? `<div class="diagram-container mb-4">${block.diagram}<p class="diagram-label">${block.diagramLabel || ""}</p></div>` : ""}
        <div class="space-y-3">
          ${block.formulas.map(f => `
            <div class="formula">
              <p class="font-medium mb-1">$${f.latex}$</p>
              <p class="text-sm text-slate-600">${f.meaning}</p>
            </div>
          `).join("")}
        </div>
      </article>
    `).join("");

    const mistakes = topic.mistakes.map(m => `<li class="flex gap-2"><span class="text-red-500 mt-1"><i class="fa-solid fa-xmark"></i></span><span>${m}</span></li>`).join("");
    const strategy = topic.strategy.map(s => `<li class="flex gap-2"><span class="text-green-600 mt-1"><i class="fa-solid fa-check"></i></span><span>${s}</span></li>`).join("");
    const examFocus = topic.examFocus.map(f => `<li class="flex gap-2"><span class="text-blue-500 mt-1"><i class="fa-solid fa-bullseye"></i></span><span>${f}</span></li>`).join("");

    const prevLink = prev
      ? `<a href="${prev}.html" class="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 transition font-semibold text-slate-700"><i class="fa-solid fa-arrow-left"></i> ${window.MATURA_TOPICS[prev]?.title || ""}</a>`
      : "<span></span>";
    const nextLink = next
      ? `<a href="${next}.html" class="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition font-semibold text-blue-700">${window.MATURA_TOPICS[next]?.title || ""} <i class="fa-solid fa-arrow-right"></i></a>`
      : "<span></span>";

    const topicDiagram = getDiagramForTopic(topicKey);

    document.body.innerHTML = `
      <!-- Reading progress bar -->
      <div class="reading-progress" id="readingProgress"></div>

      <!-- Nav -->
      <nav class="sticky top-0 z-50 glass-nav border-b border-slate-200">
        <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="../index.html" class="flex items-center gap-2 font-semibold text-slate-700 hover:text-blue-700 transition" onclick="saveIndexReturn()">
            <i class="fa-solid fa-arrow-left text-sm"></i>
            <span class="hidden sm:inline">Strona główna</span>
            <span class="sm:hidden"><i class="fa-solid fa-home"></i></span>
          </a>

          <div class="flex items-center gap-2">
            <!-- Topic Switcher -->
            <div class="topic-switcher">
              <button id="switcherBtn" class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 transition text-sm font-semibold text-slate-700">
                <i class="fa-solid ${topic.icon} ${tone.accent}"></i>
                <span class="hidden sm:inline">${topic.title}</span>
                <i class="fa-solid fa-chevron-down text-xs text-slate-400"></i>
              </button>
              <div class="topic-switcher-menu" id="switcherMenu">
                <div class="p-3 border-b border-slate-100">
                  <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Przełącz dział</p>
                </div>
                ${buildTopicSwitcher(topicKey)}
              </div>
            </div>

            <a href="../arkusze.html" class="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-slate-100 transition text-sm font-semibold text-slate-700">
              <i class="fa-solid fa-file-lines text-sm"></i>
              <span class="hidden sm:inline">Arkusze</span>
            </a>

            <a href="../quiz.html" class="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-slate-100 transition text-sm font-semibold text-slate-700">
              <i class="fa-solid fa-brain text-sm"></i>
              <span class="hidden sm:inline">Quiz</span>
            </a>
          </div>
        </div>
      </nav>

      <!-- Hero -->
      <header class="topic-hero border-b border-slate-200 animate-fade-in">
        <div class="max-w-7xl mx-auto px-4 py-10 md:py-14">
          <div class="flex flex-wrap items-center gap-3 mb-3">
            <span class="topic-chip ${tone.badge}"><i class="fa-solid ${topic.icon}"></i> Dział maturalny</span>
            <span class="topic-chip bg-slate-100 text-slate-500">${idx + 1} / ${order.length}</span>
          </div>
          <h1 class="text-3xl md:text-5xl font-black mt-2 mb-4">${topic.title}</h1>
          <p class="text-base md:text-lg text-slate-700 max-w-3xl leading-relaxed">${topic.intro}</p>

          <!-- Quick nav pills -->
          <div class="flex flex-wrap gap-2 mt-6">
            <a href="#section-theory" class="px-4 py-2 rounded-full bg-white/80 border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-white hover:border-blue-300 transition">📘 Teoria</a>
            <a href="#section-tasks" class="px-4 py-2 rounded-full bg-white/80 border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-white hover:border-blue-300 transition">✏️ Zadania</a>
            <a href="#section-exam" class="px-4 py-2 rounded-full bg-white/80 border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-white hover:border-blue-300 transition">🎯 Matura</a>
          </div>
        </div>
      </header>

      <main class="max-w-7xl mx-auto px-4 py-8 md:py-10 space-y-8 md:space-y-10">

        <!-- Exam focus + Strategy -->
        <section class="grid lg:grid-cols-2 gap-6" id="section-exam">
          <article class="card p-6 reveal">
            <h2 class="card-title"><i class="fa-solid fa-bullseye mr-2 text-blue-500"></i>Co musisz umieć na maturę?</h2>
            <ul class="space-y-2 text-slate-700">${examFocus}</ul>
          </article>
          <article class="card p-6 reveal">
            <h2 class="card-title"><i class="fa-solid fa-chess mr-2 text-green-600"></i>Strategia zdobywania punktów</h2>
            <ul class="space-y-2 text-slate-700">${strategy}</ul>
            <h3 class="font-bold mt-5 mb-3 text-slate-900"><i class="fa-solid fa-triangle-exclamation mr-1 text-red-500"></i>Najczęstsze błędy</h3>
            <ul class="space-y-2 text-slate-700">${mistakes}</ul>
          </article>
        </section>

        ${topicDiagram ? `<section class="reveal">${topicDiagram}</section>` : ""}

        <!-- Theory -->
        <section class="space-y-5" id="section-theory">
          <h2 class="text-2xl md:text-3xl font-black flex items-center gap-3"><i class="fa-solid fa-book-open text-blue-500"></i>Teoria i wzory z komentarzem</h2>
          ${theoryHtml}
        </section>

        <!-- Tasks -->
        <section class="space-y-5" id="section-tasks">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 class="text-2xl md:text-3xl font-black flex items-center gap-3"><i class="fa-solid fa-pen-ruler text-purple-500"></i>Zadania z pełnym rozwiązaniem</h2>
            <div class="flex gap-2 text-xs">
              <span class="topic-chip difficulty-easy">łatwe</span>
              <span class="topic-chip difficulty-medium">średnie</span>
              <span class="topic-chip difficulty-hard">trudne</span>
            </div>
          </div>
          ${topic.tasks.map((task, ti) => taskCard(task, ti, tone)).join("")}
        </section>

        <!-- Prev / Next navigation -->
        <section class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 py-6 border-t border-slate-200 reveal">
          ${prevLink}${nextLink}
        </section>

        <!-- All topics grid -->
        <section class="reveal">
          <h3 class="text-lg font-bold text-slate-700 mb-4"><i class="fa-solid fa-th-large mr-2"></i>Wszystkie działy</h3>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            ${order.map(k => {
              const t = window.MATURA_TOPICS[k];
              if (!t) return "";
              const c = colorMap[t.color] || colorMap.blue;
              const cur = k === topicKey;
              return `<a href="${k}.html" class="flex flex-col items-center gap-2 p-3 rounded-xl border ${cur ? c.border + " " + c.bg + " font-bold" : "border-slate-200 hover:border-blue-300 hover:bg-blue-50"} transition text-center text-xs text-slate-700">
                <i class="fa-solid ${t.icon} text-lg ${c.accent}"></i>
                <span>${t.title}</span>
              </a>`;
            }).join("")}
          </div>
        </section>
      </main>

      <!-- Back to top -->
      <button class="back-to-top" id="backToTop" aria-label="Wróć na górę"><i class="fa-solid fa-arrow-up"></i></button>
    `;

    /* ─── Event listeners ─── */

    // Solution buttons
    document.querySelectorAll("[data-solution-btn]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-solution-btn");
        const panel = document.getElementById("sol-" + id);
        const open = panel.classList.toggle("open");
        btn.innerHTML = open
          ? '<i class="fa-solid fa-eye-slash mr-1"></i>Ukryj rozwiązanie'
          : '<i class="fa-solid fa-eye mr-1"></i>Pokaż rozwiązanie krok po kroku';
      });
    });

    // Topic switcher
    const switcherBtn = document.getElementById("switcherBtn");
    const switcherMenu = document.getElementById("switcherMenu");
    if (switcherBtn && switcherMenu) {
      switcherBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        switcherMenu.classList.toggle("open");
      });
      document.addEventListener("click", () => switcherMenu.classList.remove("open"));
    }

    // Reading progress
    const progressBar = document.getElementById("readingProgress");
    if (progressBar) {
      window.addEventListener("scroll", () => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        const p = h > 0 ? (window.scrollY / h) * 100 : 0;
        progressBar.style.width = p + "%";
      }, { passive: true });
    }

    // Back to top
    const btt = document.getElementById("backToTop");
    if (btt) {
      window.addEventListener("scroll", () => {
        btt.classList.toggle("visible", window.scrollY > 400);
      }, { passive: true });
      btt.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    }

    // Scroll reveal
    const revealEls = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("visible"); revealObserver.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    revealEls.forEach(el => revealObserver.observe(el));

    // Save scroll position on leaving page
    window.addEventListener("beforeunload", () => saveScrollPos(topicKey));

    // Render math
    renderMath(document.body);
  }

  /* Expose */
  window.renderTopicPage = renderTopic;
  window.saveIndexReturn = function() {
    try { sessionStorage.setItem("scroll_index", String(window.scrollY)); } catch(e){}
  };
})();