/**
 * Procedural Quiz Question Generator
 * Generates thousands of unique math questions for matura exam practice.
 * Each template has randomized parameters → practically infinite variety.
 *
 * API:
 *   window.quizGen.generate(level, topic, count)
 *     level  : 'podstawowy' | 'rozszerzony'
 *     topic  : string topic name or null for all topics
 *     count  : number of questions to return
 *     returns: array of { topic, level?, q, options, correct, explain }
 */
(function () {
  'use strict';

  /* ── Utility helpers ── */
  function rand(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
  function pick(arr) { return arr[rand(0, arr.length - 1)]; }
  function shuffle(arr) {
    var c = arr.slice();
    for (var i = c.length - 1; i > 0; i--) {
      var j = rand(0, i);
      var t = c[i]; c[i] = c[j]; c[j] = t;
    }
    return c;
  }
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = b; b = a % b; a = t; } return a; }
  function frac(n, d) {
    if (d < 0) { n = -n; d = -d; }
    var g = gcd(n, d);
    n /= g; d /= g;
    if (d === 1) return '' + n;
    return (n < 0 ? '-' : '') + '\\frac{' + Math.abs(n) + '}{' + d + '}';
  }
  function sqrtSimplify(n) {
    if (n <= 0) return { outer: 0, inner: 0 };
    var outer = 1;
    for (var p = 2; p * p <= n; p++) {
      while (n % (p * p) === 0) { outer *= p; n /= (p * p); }
    }
    return { outer: outer, inner: n };
  }
  function formatSqrt(n) {
    var s = sqrtSimplify(n);
    if (s.inner === 1) return '' + s.outer;
    if (s.outer === 1) return '\\sqrt{' + s.inner + '}';
    return s.outer + '\\sqrt{' + s.inner + '}';
  }
  /* Build a question object with 4 answer options where one is correct */
  function makeQ(topic, q, correctVal, distractors, explain, level) {
    var opts = [correctVal].concat(distractors.slice(0, 3));
    // deduplicate options – if duplicates exist, nudge distractors
    var seen = {};
    for (var i = 0; i < opts.length; i++) {
      var key = String(opts[i]);
      if (seen[key]) {
        // nudge: add small offset
        opts[i] = opts[i] + (i % 2 === 0 ? '+1' : '-1');
      }
      seen[key] = true;
    }
    var shuffled = shuffle([0, 1, 2, 3]);
    var newOpts = shuffled.map(function (idx) { return opts[idx]; });
    var correctIdx = shuffled.indexOf(0);
    var obj = { topic: topic, q: q, options: newOpts, correct: correctIdx, explain: explain };
    if (level) obj.level = level;
    return obj;
  }
  /* Wrap math strings in $ */
  function m(s) { return '$' + s + '$'; }

  /* ══════════════════════════════════════════════════
     PODSTAWOWY — GENERATORS
     ══════════════════════════════════════════════════ */
  var podstawowyGens = [];

  /* ── LICZBY RZECZYWISTE ── */
  // 1) Logarithm base 2
  podstawowyGens.push(function () {
    var exp = rand(2, 10);
    var base = pick([2, 3, 5]);
    var val = Math.pow(base, exp);
    return makeQ('Liczby rzeczywiste',
      'Oblicz: $\\log_{' + base + '} ' + val + '$',
      m('' + exp),
      [m('' + (exp - 1)), m('' + (exp + 1)), m('' + (exp + 2))],
      '$' + base + '^{' + exp + '} = ' + val + '$, więc $\\log_{' + base + '} ' + val + ' = ' + exp + '$.'
    );
  });
  // 2) Logarithm base 10
  podstawowyGens.push(function () {
    var exp = rand(1, 6);
    var val = Math.pow(10, exp);
    return makeQ('Liczby rzeczywiste',
      'Oblicz: $\\log ' + val + '$',
      m('' + exp),
      [m('' + (exp - 1)), m('' + (exp + 1)), m('' + (exp * 2))],
      '$10^{' + exp + '} = ' + val + '$, więc $\\log ' + val + ' = ' + exp + '$.'
    );
  });
  // 3) Sqrt simplification
  podstawowyGens.push(function () {
    var outer = rand(2, 8);
    var inner = pick([2, 3, 5, 6, 7]);
    var n = outer * outer * inner;
    var ans = formatSqrt(n);
    var d1 = (outer + 1) + '\\sqrt{' + inner + '}';
    var d2 = (outer - 1 > 0 ? outer - 1 : outer + 2) + '\\sqrt{' + inner + '}';
    var d3 = '' + (outer * inner);
    return makeQ('Liczby rzeczywiste',
      'Uprość: $\\sqrt{' + n + '}$',
      m(ans), [m(d1), m(d2), m(d3)],
      '$' + n + ' = ' + outer + '^2 \\cdot ' + inner + '$, więc $\\sqrt{' + n + '} = ' + ans + '$.'
    );
  });
  // 4) Absolute value
  podstawowyGens.push(function () {
    var a = rand(-20, -1);
    var b = rand(1, 20);
    var val = Math.abs(a - b);
    return makeQ('Liczby rzeczywiste',
      'Oblicz: $|' + a + ' - ' + b + '|$',
      m('' + val),
      [m('' + (-val)), m('' + (val + rand(1, 3))), m('' + (a - b))],
      '$|' + a + ' - ' + b + '| = |' + (a - b) + '| = ' + val + '$.'
    );
  });
  // 5) Power rules
  podstawowyGens.push(function () {
    var base = rand(2, 5);
    var e1 = rand(2, 5);
    var e2 = rand(1, 4);
    var ans = e1 + e2;
    return makeQ('Liczby rzeczywiste',
      'Uprość: $' + base + '^{' + e1 + '} \\cdot ' + base + '^{' + e2 + '}$',
      m(base + '^{' + ans + '}'),
      [m(base + '^{' + (e1 * e2) + '}'), m((base * base) + '^{' + e2 + '}'), m(base + '^{' + (ans + 1) + '}')],
      'Przy mnożeniu potęg o tej samej podstawie dodajemy wykładniki: $' + base + '^{' + e1 + '+' + e2 + '} = ' + base + '^{' + ans + '}$.'
    );
  });
  // 6) Negative exponent
  podstawowyGens.push(function () {
    var base = rand(2, 6);
    var exp = rand(1, 3);
    var val = Math.pow(base, exp);
    return makeQ('Liczby rzeczywiste',
      'Oblicz: $' + base + '^{-' + exp + '}$',
      m('\\frac{1}{' + val + '}'),
      [m('-' + val), m('\\frac{1}{' + (val + 1) + '}'), m('' + val)],
      '$' + base + '^{-' + exp + '} = \\frac{1}{' + base + '^{' + exp + '}} = \\frac{1}{' + val + '}$.'
    );
  });
  // 7) Percent of number
  podstawowyGens.push(function () {
    var pct = pick([10, 15, 20, 25, 30, 40, 50, 60, 75]);
    var num = rand(2, 20) * (100 / gcd(pct, 100));
    var ans = num * pct / 100;
    return makeQ('Liczby rzeczywiste',
      '$' + pct + '\\%$ z $' + num + '$ wynosi:',
      m('' + ans),
      [m('' + (ans + rand(1, 5))), m('' + (ans - rand(1, 3) > 0 ? ans - rand(1, 3) : ans + 7)), m('' + Math.round(num / pct))],
      '$' + pct + '\\% \\cdot ' + num + ' = ' + frac(pct, 100) + ' \\cdot ' + num + ' = ' + ans + '$.'
    );
  });

  /* ── WYRAŻENIA ALGEBRAICZNE ── */
  // 8) Difference of squares
  podstawowyGens.push(function () {
    var a = rand(2, 12);
    return makeQ('Wyrażenia algebraiczne',
      'Rozłóż: $x^2 - ' + (a * a) + '$',
      m('(x-' + a + ')(x+' + a + ')'),
      [m('(x-' + a + ')^2'), m('x(x-' + (a * a) + ')'), m('(x+' + a + ')^2')],
      'Różnica kwadratów: $x^2 - ' + a + '^2 = (x-' + a + ')(x+' + a + ')$.'
    );
  });
  // 9) Perfect square trinomial
  podstawowyGens.push(function () {
    var a = rand(2, 9);
    var sign = pick(['+', '-']);
    var mid = 2 * a;
    var expr = 'x^2 ' + sign + ' ' + mid + 'x + ' + (a * a);
    var factored = sign === '+' ? '(x+' + a + ')^2' : '(x-' + a + ')^2';
    return makeQ('Wyrażenia algebraiczne',
      'Rozłóż: $' + expr + '$',
      m(factored),
      [m('(x' + sign + a + ')(x' + (sign === '+' ? '-' : '+') + a + ')'), m('(x' + sign + (a * a) + ')'), m('x(x' + sign + mid + ')')],
      'Trójmian kwadratowy zupełny: $' + expr + ' = ' + factored + '$.'
    );
  });
  // 10) Simplify fraction
  podstawowyGens.push(function () {
    var a = rand(2, 8);
    return makeQ('Wyrażenia algebraiczne',
      'Uprość: $\\frac{x^2-' + (a * a) + '}{x-' + a + '}$ dla $x \\neq ' + a + '$',
      m('x+' + a),
      [m('x-' + a), m('x^2-' + a), m('1')],
      '$x^2-' + (a * a) + '=(x-' + a + ')(x+' + a + ')$, skracamy: $x+' + a + '$.'
    );
  });
  // 11) Distribute and simplify
  podstawowyGens.push(function () {
    var a = rand(2, 6);
    var b = rand(1, 5);
    var c = rand(1, 5);
    var result_x = a;
    var result_const = a * b + c;
    return makeQ('Wyrażenia algebraiczne',
      'Rozwiń i uprość: $' + a + '(x + ' + b + ') + ' + c + '$',
      m(a + 'x + ' + result_const),
      [m(a + 'x + ' + (result_const - 1)), m((a + 1) + 'x + ' + b), m(a + 'x + ' + b)],
      '$' + a + '(x+' + b + ')+' + c + ' = ' + a + 'x + ' + (a * b) + ' + ' + c + ' = ' + a + 'x + ' + result_const + '$.'
    );
  });
  // 12) (a+b)^2
  podstawowyGens.push(function () {
    var a = rand(1, 6);
    var b = rand(1, 6);
    var ans = a * a + 2 * a * b + b * b;
    return makeQ('Wyrażenia algebraiczne',
      'Oblicz: $(' + a + ' + ' + b + ')^2$',
      m('' + ans),
      [m('' + (a * a + b * b)), m('' + (ans + rand(1, 5))), m('' + (2 * a * b))],
      '$(' + a + '+' + b + ')^2 = ' + a + '^2 + 2 \\cdot ' + a + ' \\cdot ' + b + ' + ' + b + '^2 = ' + (a * a) + ' + ' + (2 * a * b) + ' + ' + (b * b) + ' = ' + ans + '$.'
    );
  });

  /* ── RÓWNANIA ── */
  // 13) Linear equation ax + b = c
  podstawowyGens.push(function () {
    var x = rand(-10, 10);
    var a = rand(2, 8) * pick([-1, 1]);
    var b = rand(-15, 15);
    var c = a * x + b;
    var signB = b >= 0 ? '+ ' + b : '- ' + Math.abs(b);
    return makeQ('Równania',
      'Rozwiąż: $' + a + 'x ' + signB + ' = ' + c + '$',
      m('x = ' + x),
      [m('x = ' + (x + 1)), m('x = ' + (x - 1)), m('x = ' + (-x))],
      '$' + a + 'x = ' + c + ' - (' + b + ') = ' + (c - b) + '$ → $x = ' + frac(c - b, a) + (Number.isInteger((c - b) / a) ? '' : ' = ' + x) + '$.'
    );
  });
  // 14) Quadratic with nice roots
  podstawowyGens.push(function () {
    var r1 = rand(-8, 8);
    var r2 = rand(-8, 8);
    if (r1 === r2) r2 = r1 + rand(1, 4);
    var B = -(r1 + r2);
    var C = r1 * r2;
    var signB = B >= 0 ? '+ ' + B : '- ' + Math.abs(B);
    var signC = C >= 0 ? '+ ' + C : '- ' + Math.abs(C);
    var eqn = 'x^2 ' + (B !== 0 ? signB + 'x ' : '') + (C !== 0 ? signC : '');
    var sorted = [r1, r2].sort(function (a, b) { return a - b; });
    return makeQ('Równania',
      'Rozwiąż: $' + eqn + ' = 0$',
      m('x \\in \\{' + sorted[0] + ', ' + sorted[1] + '\\}'),
      [m('x = ' + sorted[0]), m('x = ' + sorted[1]), m('x \\in \\{' + (sorted[0] + 1) + ', ' + (sorted[1] - 1) + '\\}')],
      'Wzory Viète\'a: $x_1 + x_2 = ' + (-B) + '$, $x_1 \\cdot x_2 = ' + C + '$ → $x \\in \\{' + sorted[0] + ', ' + sorted[1] + '\\}$.'
    );
  });
  // 15) Product = 0
  podstawowyGens.push(function () {
    var a = rand(1, 10);
    var b = rand(1, 10);
    var sign1 = pick(['-', '+']);
    var sign2 = pick(['-', '+']);
    var r1 = sign1 === '-' ? a : -a;
    var r2 = sign2 === '-' ? b : -b;
    if (r1 === r2) r2 = r2 + 1;
    var sorted = [r1, r2].sort(function (a, b) { return a - b; });
    return makeQ('Równania',
      'Rozwiąż: $(x' + sign1 + a + ')(x' + sign2 + b + ') = 0$',
      m('x \\in \\{' + sorted[0] + ', ' + sorted[1] + '\\}'),
      [m('x = ' + sorted[0]), m('x = ' + (r1 * r2)), m('x = ' + sorted[1])],
      'Iloczyn = 0 gdy czynnik = 0: $x = ' + r1 + '$ lub $x = ' + r2 + '$.'
    );
  });
  // 16) Inequality
  podstawowyGens.push(function () {
    var a = rand(2, 7);
    var b = rand(1, 15);
    var c = rand(b + 1, 30);
    var ans = (c - b) / a;
    var ansStr = Number.isInteger(ans) ? '' + ans : frac(c - b, a);
    return makeQ('Równania',
      'Rozwiąż nierówność: $' + a + 'x + ' + b + ' < ' + c + '$',
      m('x < ' + ansStr),
      [m('x > ' + ansStr), m('x < ' + (b - c)), m('x > ' + frac(c + b, a))],
      '$' + a + 'x < ' + (c - b) + '$ → $x < ' + ansStr + '$.'
    );
  });
  // 17) System of equations (simple)
  podstawowyGens.push(function () {
    var x = rand(-5, 5); var y = rand(-5, 5);
    var a1 = rand(1, 4); var b1 = rand(1, 4);
    var a2 = rand(1, 4); var b2 = rand(1, 4);
    if (a1 * b2 === a2 * b1) b2 = b2 + 1;
    var c1 = a1 * x + b1 * y;
    var c2 = a2 * x + b2 * y;
    return makeQ('Równania',
      'Rozwiąż układ: $\\begin{cases}' + a1 + 'x + ' + b1 + 'y = ' + c1 + '\\\\' + a2 + 'x + ' + b2 + 'y = ' + c2 + '\\end{cases}$',
      m('x=' + x + ',\\ y=' + y),
      [m('x=' + (x + 1) + ',\\ y=' + y), m('x=' + x + ',\\ y=' + (y + 1)), m('x=' + (-x) + ',\\ y=' + (-y))],
      'Rozwiązanie układu: $x = ' + x + '$, $y = ' + y + '$.'
    );
  });

  /* ── FUNKCJE ── */
  // 18) Zero of linear function
  podstawowyGens.push(function () {
    var a = rand(2, 10) * pick([-1, 1]);
    var b = rand(-20, 20);
    while (b === 0) b = rand(1, 20);
    var x0 = -b / a;
    var ansStr = Number.isInteger(x0) ? '' + x0 : frac(-b, a);
    return makeQ('Funkcje',
      'Miejsce zerowe $f(x) = ' + a + 'x ' + (b >= 0 ? '+ ' + b : '- ' + Math.abs(b)) + '$:',
      m(ansStr),
      [m('' + b), m(frac(b, a)), m('' + a)],
      '$' + a + 'x + (' + b + ') = 0$ → $x = ' + ansStr + '$.'
    );
  });
  // 19) Monotonicity of linear
  podstawowyGens.push(function () {
    var a = rand(1, 10) * pick([-1, 1]);
    var b = rand(-10, 10);
    var mono = a > 0 ? 'rosnąca' : 'malejąca';
    return makeQ('Funkcje',
      'Funkcja $f(x) = ' + a + 'x ' + (b >= 0 ? '+ ' + b : '- ' + Math.abs(b)) + '$ jest:',
      mono,
      [a > 0 ? 'malejąca' : 'rosnąca', 'stała', 'okresowa'],
      'Współczynnik kierunkowy $a = ' + a + (a > 0 ? ' > 0' : ' < 0') + '$ → funkcja ' + mono + '.'
    );
  });
  // 20) Quadratic vertex
  podstawowyGens.push(function () {
    var p = rand(-5, 5);
    var q = rand(-8, 8);
    var a = pick([-2, -1, 1, 2]);
    // f(x) = a(x - p)^2 + q
    var B = -2 * a * p;
    var C = a * p * p + q;
    return makeQ('Funkcje',
      'Wierzchołek paraboli $f(x) = ' + a + 'x^2 ' + (B >= 0 ? '+ ' + B : '- ' + Math.abs(B)) + 'x ' + (C >= 0 ? '+ ' + C : '- ' + Math.abs(C)) + '$ to:',
      m('(' + p + ', ' + q + ')'),
      [m('(' + (-p) + ', ' + q + ')'), m('(' + p + ', ' + (-q) + ')'), m('(' + (p + 1) + ', ' + (q - 1) + ')')],
      '$p = \\frac{-(' + B + ')}{2 \\cdot ' + a + '} = ' + p + '$, $q = f(' + p + ') = ' + q + '$ → $W = (' + p + ', ' + q + ')$.'
    );
  });
  // 21) Domain of sqrt
  podstawowyGens.push(function () {
    var a = rand(1, 5);
    var b = rand(1, 15);
    var boundary = frac(b, a);
    return makeQ('Funkcje',
      'Podaj dziedzinę: $f(x) = \\sqrt{' + a + 'x - ' + b + '}$',
      m('x \\geq ' + boundary),
      [m('x > ' + boundary), m('x \\leq ' + boundary), m('x \\in \\mathbb{R}')],
      'Warunek: $' + a + 'x - ' + b + ' \\geq 0$ → $x \\geq ' + boundary + '$.'
    );
  });
  // 22) Value of linear function at point
  podstawowyGens.push(function () {
    var a = rand(-6, 6); while (a === 0) a = rand(-6, 6);
    var b = rand(-10, 10);
    var x = rand(-5, 5);
    var y = a * x + b;
    return makeQ('Funkcje',
      'Dla $f(x) = ' + a + 'x ' + (b >= 0 ? '+ ' + b : '- ' + Math.abs(b)) + '$ oblicz $f(' + x + ')$:',
      m('' + y),
      [m('' + (y + a)), m('' + (y - b)), m('' + (a * x))],
      '$f(' + x + ') = ' + a + ' \\cdot (' + x + ') + (' + b + ') = ' + y + '$.'
    );
  });

  /* ── CIĄGI ── */
  // 23) Arithmetic: find n-th term
  podstawowyGens.push(function () {
    var a1 = rand(-5, 10);
    var r = rand(-4, 6); while (r === 0) r = rand(-4, 6);
    var n = rand(4, 15);
    var an = a1 + (n - 1) * r;
    return makeQ('Ciągi',
      'Ciąg arytmetyczny: $a_1 = ' + a1 + '$, $r = ' + r + '$. Wyraz $a_{' + n + '}$:',
      m('' + an),
      [m('' + (an + r)), m('' + (an - r)), m('' + (a1 * n))],
      '$a_{' + n + '} = ' + a1 + ' + ' + (n - 1) + ' \\cdot ' + (r >= 0 ? r : '(' + r + ')') + ' = ' + an + '$.'
    );
  });
  // 24) Geometric: find n-th term
  podstawowyGens.push(function () {
    var a1 = pick([1, 2, 3, 4, 5]);
    var q = pick([2, 3, -2, -1]);
    var n = rand(3, 6);
    var an = a1 * Math.pow(q, n - 1);
    return makeQ('Ciągi',
      'Ciąg geometryczny: $a_1 = ' + a1 + '$, $q = ' + q + '$. Wyraz $a_{' + n + '}$:',
      m('' + an),
      [m('' + (an * q)), m('' + (a1 * n)), m('' + (an + a1))],
      '$a_{' + n + '} = ' + a1 + ' \\cdot (' + q + ')^{' + (n - 1) + '} = ' + an + '$.'
    );
  });
  // 25) Sum of arithmetic sequence
  podstawowyGens.push(function () {
    var a1 = rand(1, 5);
    var r = rand(1, 4);
    var n = rand(5, 12);
    var an = a1 + (n - 1) * r;
    var S = n * (a1 + an) / 2;
    return makeQ('Ciągi',
      'Suma $' + n + '$ pierwszych wyrazów ciągu arytm. $a_1=' + a1 + '$, $r=' + r + '$:',
      m('' + S),
      [m('' + (S + n)), m('' + (S - a1)), m('' + (n * a1))],
      '$a_{' + n + '} = ' + an + '$, $S_{' + n + '} = \\frac{' + n + '(' + a1 + '+' + an + ')}{2} = ' + S + '$.'
    );
  });
  // 26) Identify sequence type
  podstawowyGens.push(function () {
    var kind = pick(['arytm', 'geom']);
    var a1 = rand(1, 5);
    if (kind === 'arytm') {
      var r = rand(2, 6);
      var terms = [a1, a1 + r, a1 + 2 * r, a1 + 3 * r];
      return makeQ('Ciągi',
        'Ciąg ' + terms.join(', ') + ' jest:',
        'arytmetyczny, $r = ' + r + '$',
        ['geometryczny', 'ani arytm. ani geom.', 'stały'],
        'Różnica stała: $' + terms[1] + ' - ' + terms[0] + ' = ' + r + '$ → arytmetyczny.'
      );
    } else {
      var q = pick([2, 3]);
      var terms = [a1, a1 * q, a1 * q * q, a1 * q * q * q];
      return makeQ('Ciągi',
        'Ciąg ' + terms.join(', ') + ' jest:',
        'geometryczny, $q = ' + q + '$',
        ['arytmetyczny', 'ani arytm. ani geom.', 'stały'],
        'Iloraz stały: $' + terms[1] + ' / ' + terms[0] + ' = ' + q + '$ → geometryczny.'
      );
    }
  });

  /* ── TRYGONOMETRIA ── */
  var trigVals = [
    { deg: 0, sin: '0', cos: '1', tan: '0' },
    { deg: 30, sin: '\\frac{1}{2}', cos: '\\frac{\\sqrt{3}}{2}', tan: '\\frac{\\sqrt{3}}{3}' },
    { deg: 45, sin: '\\frac{\\sqrt{2}}{2}', cos: '\\frac{\\sqrt{2}}{2}', tan: '1' },
    { deg: 60, sin: '\\frac{\\sqrt{3}}{2}', cos: '\\frac{1}{2}', tan: '\\sqrt{3}' },
    { deg: 90, sin: '1', cos: '0', tan: '\\text{nie ist.}' }
  ];
  // 27) sin/cos of special angle
  podstawowyGens.push(function () {
    var tv = pick(trigVals);
    var fn = pick(['sin', 'cos']);
    var val = fn === 'sin' ? tv.sin : tv.cos;
    var others = trigVals.filter(function (t) { return t !== tv; });
    var d = others.map(function (t) { return m(fn === 'sin' ? t.sin : t.cos); });
    return makeQ('Trygonometria',
      'Oblicz: $\\' + fn + ' ' + tv.deg + '^\\circ$',
      m(val),
      shuffle(d).slice(0, 3),
      'Wartość szczególna: $\\' + fn + ' ' + tv.deg + '^\\circ = ' + val + '$.'
    );
  });
  // 28) Pythagorean identity
  podstawowyGens.push(function () {
    var a = rand(1, 12);
    var b_sq = a * a; // just use identity
    return makeQ('Trygonometria',
      'Jeśli $\\sin^2 \\alpha = ' + frac(a * a, (a * a + 1)) + '$, to $\\cos^2 \\alpha =$',
      m(frac(1, a * a + 1)),
      [m(frac(a * a, a * a + 1)), m('1'), m('0')],
      'Jedynka trygonometryczna: $\\cos^2\\alpha = 1 - \\sin^2\\alpha = 1 - ' + frac(a * a, a * a + 1) + ' = ' + frac(1, a * a + 1) + '$.'
    );
  });
  // 29) tan from triangle
  podstawowyGens.push(function () {
    // right triangle with integer sides
    var triples = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [6, 8, 10]];
    var t = pick(triples);
    var opp = t[0], adj = t[1];
    return makeQ('Trygonometria',
      'W trójkącie prostokątnym przyprostokątne mają długość $' + opp + '$ i $' + adj + '$. $\\tan\\alpha$ (kąt naprzeciw boku $' + opp + '$):',
      m(frac(opp, adj)),
      [m(frac(adj, opp)), m(frac(opp, t[2])), m(frac(adj, t[2]))],
      '$\\tan\\alpha = \\frac{\\text{naprzeciwko}}{\\text{przyległa}} = ' + frac(opp, adj) + '$.'
    );
  });
  // 30) Convert degrees to radians
  podstawowyGens.push(function () {
    var options = [
      { deg: 30, rad: '\\frac{\\pi}{6}' },
      { deg: 45, rad: '\\frac{\\pi}{4}' },
      { deg: 60, rad: '\\frac{\\pi}{3}' },
      { deg: 90, rad: '\\frac{\\pi}{2}' },
      { deg: 120, rad: '\\frac{2\\pi}{3}' },
      { deg: 180, rad: '\\pi' },
      { deg: 270, rad: '\\frac{3\\pi}{2}' },
      { deg: 360, rad: '2\\pi' }
    ];
    var o = pick(options);
    var others = options.filter(function (x) { return x !== o; });
    return makeQ('Trygonometria',
      'Zamień na radiany: $' + o.deg + '^\\circ$',
      m(o.rad),
      shuffle(others.map(function (x) { return m(x.rad); })).slice(0, 3),
      '$' + o.deg + '^\\circ = ' + o.deg + ' \\cdot \\frac{\\pi}{180} = ' + o.rad + '$.'
    );
  });
  // 30b) sin^2 + cos^2 = 1 with numeric angle
  podstawowyGens.push(function () {
    var alpha = pick([15, 20, 25, 35, 40, 50, 55, 65, 70, 75, 80, 85]);
    return makeQ('Trygonometria',
      '$\\sin^2 ' + alpha + '^\\circ + \\cos^2 ' + alpha + '^\\circ =$',
      m('1'),
      [m('0'), m('2'), m('\\text{zależy od kąta}')],
      'Jedynka trygonometryczna: $\\sin^2\\alpha + \\cos^2\\alpha = 1$ dla dowolnego $\\alpha$.'
    );
  });
  // 30c) tan special angle
  podstawowyGens.push(function () {
    var vals = [
      { deg: 0, val: '0' },
      { deg: 30, val: '\\frac{\\sqrt{3}}{3}' },
      { deg: 45, val: '1' },
      { deg: 60, val: '\\sqrt{3}' }
    ];
    var v = pick(vals);
    var others = vals.filter(function (x) { return x !== v; });
    return makeQ('Trygonometria',
      'Oblicz: $\\tan ' + v.deg + '^\\circ$',
      m(v.val),
      shuffle(others.map(function (x) { return m(x.val); })).slice(0, 3),
      'Wartość szczególna: $\\tan ' + v.deg + '^\\circ = ' + v.val + '$.'
    );
  });
  // 30d) sin/cos negative angle
  podstawowyGens.push(function () {
    var tv = pick(trigVals.filter(function(t){ return t.deg > 0 && t.deg < 90; }));
    var fn = pick(['sin', 'cos']);
    var origVal = fn === 'sin' ? tv.sin : tv.cos;
    var negVal = fn === 'sin' ? '-' + tv.sin : tv.cos; // sin(-a)=-sin(a), cos(-a)=cos(a)
    return makeQ('Trygonometria',
      'Oblicz: $\\' + fn + '(-' + tv.deg + '^\\circ)$',
      m(negVal),
      [m(origVal), m('-' + (fn === 'cos' ? tv.cos : tv.sin)), m('0')],
      fn === 'sin'
        ? '$\\sin(-\\alpha) = -\\sin\\alpha = -' + tv.sin + '$.'
        : '$\\cos(-\\alpha) = \\cos\\alpha = ' + tv.cos + '$.'
    );
  });
  // 30e) Right triangle side using trig
  podstawowyGens.push(function () {
    var hyp = pick([5, 10, 13, 15, 17, 20, 25, 26]);
    var fn = pick(['sin', 'cos']);
    var angle = pick([30, 45, 60]);
    var multipliers = {
      'sin30': 0.5, 'sin45': Math.SQRT2 / 2, 'sin60': Math.sqrt(3) / 2,
      'cos30': Math.sqrt(3) / 2, 'cos45': Math.SQRT2 / 2, 'cos60': 0.5
    };
    var mult = multipliers[fn + angle];
    var side = hyp * mult;
    var sideStr = Number.isInteger(side) ? '' + side : (Math.round(side * 100) / 100).toString();
    var fracStr = fn + angle === 'sin30' || fn + angle === 'cos60' ? '\\frac{' + hyp + '}{2}' :
                  fn + angle === 'sin60' || fn + angle === 'cos30' ? '\\frac{' + hyp + '\\sqrt{3}}{2}' :
                  '\\frac{' + hyp + '\\sqrt{2}}{2}';
    return makeQ('Trygonometria',
      'Trójkąt prostokątny: przeciwprostokątna $' + hyp + '$. Bok naprzeciw kąta $' + angle + '^\\circ$ ($\\' + fn + '$):',
      m(fracStr),
      [m('' + hyp), m('\\frac{' + hyp + '}{3}'), m('' + (hyp * 2))],
      '$\\' + fn + ' ' + angle + '^\\circ = \\frac{\\text{bok}}{' + hyp + '}$ → bok $= ' + hyp + ' \\cdot \\' + fn + ' ' + angle + '^\\circ = ' + fracStr + '$.'
    );
  });
  // 30f) Which quadrant is the angle in
  podstawowyGens.push(function () {
    var angle = rand(1, 35) * 10; // 10, 20, ..., 350
    var quadrant;
    if (angle <= 90) quadrant = 'I';
    else if (angle <= 180) quadrant = 'II';
    else if (angle <= 270) quadrant = 'III';
    else quadrant = 'IV';
    var all = ['I', 'II', 'III', 'IV'];
    var wrongs = all.filter(function(q) { return q !== quadrant; });
    return makeQ('Trygonometria',
      'Kąt $' + angle + '^\\circ$ leży w ćwiartce:',
      quadrant,
      wrongs,
      'Ćwiartki: I: $0$-$90°$, II: $90$-$180°$, III: $180$-$270°$, IV: $270$-$360°$. → ' + quadrant + '.'
    );
  });

  /* ── PLANIMETRIA ── */
  // 31) Area of circle
  podstawowyGens.push(function () {
    var r = rand(2, 12);
    return makeQ('Planimetria',
      'Pole koła o promieniu $' + r + '$:',
      m(r * r + '\\pi'),
      [m(2 * r + '\\pi'), m((r * r + 1) + '\\pi'), m(r + '\\pi')],
      '$P = \\pi r^2 = \\pi \\cdot ' + r + '^2 = ' + (r * r) + '\\pi$.'
    );
  });
  // 32) Perimeter of circle
  podstawowyGens.push(function () {
    var r = rand(2, 12);
    return makeQ('Planimetria',
      'Obwód koła o promieniu $' + r + '$:',
      m(2 * r + '\\pi'),
      [m(r * r + '\\pi'), m(r + '\\pi'), m((2 * r + 2) + '\\pi')],
      '$L = 2\\pi r = 2\\pi \\cdot ' + r + ' = ' + (2 * r) + '\\pi$.'
    );
  });
  // 33) Area of triangle
  podstawowyGens.push(function () {
    var a = rand(3, 15);
    var h = rand(2, 12);
    var area = a * h / 2;
    var areaStr = Number.isInteger(area) ? '' + area : frac(a * h, 2);
    return makeQ('Planimetria',
      'Pole trójkąta o podstawie $' + a + '$ i wysokości $' + h + '$:',
      m(areaStr),
      [m('' + (a * h)), m('' + (a + h)), m(frac(a * h, 3))],
      '$P = \\frac{1}{2} \\cdot ' + a + ' \\cdot ' + h + ' = ' + areaStr + '$.'
    );
  });
  // 34) Pythagorean theorem
  podstawowyGens.push(function () {
    var triples = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [6, 8, 10], [9, 12, 15], [12, 16, 20]];
    var t = pick(triples);
    return makeQ('Planimetria',
      'Trójkąt prostokątny: przyprostokątne $' + t[0] + '$ i $' + t[1] + '$. Przeciwprostokątna:',
      m('' + t[2]),
      [m('' + (t[2] + 1)), m('' + (t[0] + t[1])), m('' + (t[2] - 1))],
      '$c = \\sqrt{' + t[0] + '^2 + ' + t[1] + '^2} = \\sqrt{' + (t[0] * t[0]) + ' + ' + (t[1] * t[1]) + '} = ' + t[2] + '$.'
    );
  });
  // 35) Area of rectangle
  podstawowyGens.push(function () {
    var a = rand(3, 15);
    var b = rand(2, 12);
    return makeQ('Planimetria',
      'Pole prostokąta o bokach $' + a + '$ i $' + b + '$:',
      m('' + (a * b)),
      [m('' + (2 * (a + b))), m('' + (a + b)), m('' + (a * b + 1))],
      '$P = a \\cdot b = ' + a + ' \\cdot ' + b + ' = ' + (a * b) + '$.'
    );
  });
  // 36) Sum of angles in polygon
  podstawowyGens.push(function () {
    var n = rand(3, 8);
    var names = { 3: 'trójkącie', 4: 'czworokącie', 5: 'pięciokącie', 6: 'sześciokącie', 7: 'siedmiokącie', 8: 'ośmiokącie' };
    var sum = (n - 2) * 180;
    return makeQ('Planimetria',
      'Suma kątów wewnętrznych w ' + names[n] + ':',
      m(sum + '^\\circ'),
      [m((sum + 180) + '^\\circ'), m((sum - 180) + '^\\circ'), m((n * 180) + '^\\circ')],
      'Suma kątów = $(n-2) \\cdot 180^\\circ = (' + n + '-2) \\cdot 180^\\circ = ' + sum + '^\\circ$.'
    );
  });

  /* ── GEOMETRIA ANALITYCZNA ── */
  // 37) Distance between two points
  podstawowyGens.push(function () {
    var triples = [[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17]];
    var t = pick(triples);
    var x1 = rand(-5, 5); var y1 = rand(-5, 5);
    var x2 = x1 + t[0]; var y2 = y1 + t[1];
    return makeQ('Geometria analityczna',
      'Odległość $A(' + x1 + ',' + y1 + ')$ i $B(' + x2 + ',' + y2 + ')$:',
      m('' + t[2]),
      [m('' + (t[2] + 1)), m('' + (t[0] + t[1])), m('' + (t[2] - 1))],
      '$d = \\sqrt{' + t[0] + '^2 + ' + t[1] + '^2} = ' + t[2] + '$.'
    );
  });
  // 38) Midpoint
  podstawowyGens.push(function () {
    var x1 = rand(-8, 8) * 2; var y1 = rand(-8, 8) * 2; // even for integer midpoints
    var x2 = rand(-8, 8) * 2; var y2 = rand(-8, 8) * 2;
    var mx = (x1 + x2) / 2; var my = (y1 + y2) / 2;
    return makeQ('Geometria analityczna',
      'Środek odcinka $A(' + x1 + ',' + y1 + ')$, $B(' + x2 + ',' + y2 + ')$:',
      m('(' + mx + ', ' + my + ')'),
      [m('(' + (mx + 1) + ', ' + my + ')'), m('(' + mx + ', ' + (my + 1) + ')'), m('(' + (x1 + x2) + ', ' + (y1 + y2) + ')')],
      '$S = \\left(\\frac{' + x1 + '+' + x2 + '}{2},\\frac{' + y1 + '+' + y2 + '}{2}\\right) = (' + mx + ', ' + my + ')$.'
    );
  });
  // 39) Slope of line through two points
  podstawowyGens.push(function () {
    var dx = rand(1, 5);
    var dy = rand(-6, 6); while (dy === 0) dy = rand(-6, 6);
    var x1 = rand(-5, 5); var y1 = rand(-5, 5);
    var x2 = x1 + dx; var y2 = y1 + dy;
    var slope = frac(dy, dx);
    return makeQ('Geometria analityczna',
      'Nachylenie prostej przez $(' + x1 + ',' + y1 + ')$ i $(' + x2 + ',' + y2 + ')$:',
      m('a = ' + slope),
      [m('a = ' + frac(-dy, dx)), m('a = ' + frac(dx, dy)), m('a = ' + frac(dy, dx + 1))],
      '$a = \\frac{' + y2 + '-(' + y1 + ')}{' + x2 + '-(' + x1 + ')} = \\frac{' + dy + '}{' + dx + '} = ' + slope + '$.'
    );
  });
  // 40) Line equation y = ax + b (find b)
  podstawowyGens.push(function () {
    var a = rand(-4, 4); while (a === 0) a = rand(-4, 4);
    var x0 = rand(-5, 5);
    var y0 = rand(-10, 10);
    var b = y0 - a * x0;
    return makeQ('Geometria analityczna',
      'Prosta $y = ' + a + 'x + b$ przechodzi przez $(' + x0 + ',' + y0 + ')$. Wartość $b$:',
      m('' + b),
      [m('' + (b + 1)), m('' + (-b)), m('' + (b - 2))],
      '$' + y0 + ' = ' + a + ' \\cdot ' + (x0 >= 0 ? x0 : '(' + x0 + ')') + ' + b$ → $b = ' + b + '$.'
    );
  });

  /* ── STEREOMETRIA ── */
  // 41) Volume of cuboid
  podstawowyGens.push(function () {
    var a = rand(2, 8); var b = rand(2, 8); var c = rand(2, 8);
    var V = a * b * c;
    return makeQ('Stereometria',
      'Objętość prostopadłościanu $' + a + ' \\times ' + b + ' \\times ' + c + '$:',
      m('' + V),
      [m('' + (V + a)), m('' + (2 * (a * b + b * c + a * c))), m('' + (a + b + c))],
      '$V = ' + a + ' \\cdot ' + b + ' \\cdot ' + c + ' = ' + V + '$.'
    );
  });
  // 42) Volume of cube
  podstawowyGens.push(function () {
    var a = rand(2, 10);
    var V = a * a * a;
    return makeQ('Stereometria',
      'Objętość sześcianu o krawędzi $' + a + '$:',
      m('' + V),
      [m('' + (a * a)), m('' + (6 * a * a)), m('' + (V + a))],
      '$V = a^3 = ' + a + '^3 = ' + V + '$.'
    );
  });
  // 43) Volume of pyramid
  podstawowyGens.push(function () {
    var Pp = rand(4, 25);
    var h = rand(3, 12);
    var V3 = Pp * h;
    var Vstr = Number.isInteger(V3 / 3) ? '' + (V3 / 3) : frac(V3, 3);
    return makeQ('Stereometria',
      'Objętość ostrosłupa: $P_p = ' + Pp + '$, $h = ' + h + '$:',
      m(Vstr),
      [m('' + V3), m(frac(V3, 2)), m('' + (Pp + h))],
      '$V = \\frac{1}{3} P_p h = \\frac{1}{3} \\cdot ' + Pp + ' \\cdot ' + h + ' = ' + Vstr + '$.'
    );
  });
  // 44) Volume of cylinder
  podstawowyGens.push(function () {
    var r = rand(2, 8);
    var h = rand(3, 12);
    var V = r * r * h;
    return makeQ('Stereometria',
      'Objętość walca: $r = ' + r + '$, $h = ' + h + '$:',
      m(V + '\\pi'),
      [m((2 * r * h) + '\\pi'), m((r * r) + '\\pi'), m((V + r) + '\\pi')],
      '$V = \\pi r^2 h = \\pi \\cdot ' + r + '^2 \\cdot ' + h + ' = ' + V + '\\pi$.'
    );
  });
  // 45) Surface area of cube
  podstawowyGens.push(function () {
    var a = rand(2, 10);
    var S = 6 * a * a;
    return makeQ('Stereometria',
      'Pole powierzchni sześcianu o krawędzi $' + a + '$:',
      m('' + S),
      [m('' + (a * a * a)), m('' + (4 * a * a)), m('' + (S + a))],
      '$P_c = 6a^2 = 6 \\cdot ' + a + '^2 = ' + S + '$.'
    );
  });

  /* ── PRAWDOPODOBIEŃSTWO ── */
  // 46) Complement probability
  podstawowyGens.push(function () {
    var num = rand(1, 9);
    var den = 10;
    var g = gcd(num, den);
    var compNum = den - num;
    return makeQ('Prawdopodobieństwo',
      'Jeśli $P(A) = ' + frac(num / g, den / g) + '$, to $P(A\') =$',
      m(frac(compNum / g, den / g)),
      [m(frac(num / g, den / g)), m('1'), m('0')],
      '$P(A\') = 1 - P(A) = 1 - ' + frac(num / g, den / g) + ' = ' + frac(compNum / g, den / g) + '$.'
    );
  });
  // 47) Dice probability
  podstawowyGens.push(function () {
    var conditions = [
      { text: 'liczby parzystej', count: 3 },
      { text: 'liczby nieparzystej', count: 3 },
      { text: 'liczby większej od 4', count: 2 },
      { text: 'liczby mniejszej od 3', count: 2 },
      { text: 'szóstki', count: 1 },
      { text: 'liczby od 2 do 5', count: 4 }
    ];
    var c = pick(conditions);
    return makeQ('Prawdopodobieństwo',
      'Rzut kostką: prawdopodobieństwo wyrzucenia ' + c.text + ':',
      m(frac(c.count, 6)),
      [m(frac(c.count + 1, 6)), m(frac(6 - c.count, 6)), m(frac(c.count, 12))],
      'Korzystne wyniki: ' + c.count + ' z 6. $P = ' + frac(c.count, 6) + '$.'
    );
  });
  // 48) Combinations
  podstawowyGens.push(function () {
    var n = rand(4, 8);
    var k = rand(2, Math.min(n - 1, 4));
    function C(n, k) {
      if (k > n) return 0;
      var r = 1;
      for (var i = 0; i < k; i++) r = r * (n - i) / (i + 1);
      return Math.round(r);
    }
    var ans = C(n, k);
    return makeQ('Prawdopodobieństwo',
      'Oblicz $\\binom{' + n + '}{' + k + '}$:',
      m('' + ans),
      [m('' + (ans + rand(1, 5))), m('' + C(n, k - 1)), m('' + (n * k))],
      '$\\binom{' + n + '}{' + k + '} = \\frac{' + n + '!}{' + k + '! \\cdot ' + (n - k) + '!} = ' + ans + '$.'
    );
  });
  // 49) Drawing balls
  podstawowyGens.push(function () {
    var white = rand(3, 8);
    var black = rand(2, 6);
    var total = white + black;
    var g = gcd(white, total);
    return makeQ('Prawdopodobieństwo',
      'Urna ma ' + white + ' białych i ' + black + ' czarnych kul. P(biała) =',
      m(frac(white / g, total / g)),
      [m(frac(black, total)), m(frac(white, black)), m(frac(1, total))],
      '$P = \\frac{' + white + '}{' + total + '} = ' + frac(white / g, total / g) + '$.'
    );
  });
  // 50) Two coins toss
  podstawowyGens.push(function () {
    var events = [
      { text: 'dwa orły', count: 1, total: 4 },
      { text: 'przynajmniej jednego orła', count: 3, total: 4 },
      { text: 'dokładnie jednego orła', count: 2, total: 4 },
      { text: 'dwóch reszek', count: 1, total: 4 },
      { text: 'różnych wyników (orzeł i reszka)', count: 2, total: 4 }
    ];
    var e = pick(events);
    var gc = gcd(e.count, e.total);
    return makeQ('Prawdopodobieństwo',
      'Rzut dwoma monetami: P(' + e.text + ') =',
      m(frac(e.count / gc, e.total / gc)),
      [m(frac(e.count + 1, e.total)), m(frac(1, 2)), m(frac(e.total - e.count, e.total))],
      'Przestrzeń: $\\{OO, OR, RO, RR\\}$. Korzystne: ' + e.count + ' z ' + e.total + '. $P = ' + frac(e.count / gc, e.total / gc) + '$.'
    );
  });
  // 51) Permutations count n!
  podstawowyGens.push(function () {
    var n = rand(3, 7);
    var nf = 1; for (var i = 2; i <= n; i++) nf *= i;
    return makeQ('Prawdopodobieństwo',
      'Na ile sposobów można ustawić ' + n + ' osób w kolejce?',
      m('' + nf),
      [m('' + (nf + n)), m('' + (n * n)), m('' + Math.pow(2, n))],
      'Permutacja: $' + n + '! = ' + nf + '$.'
    );
  });
  // 52) Pick k from n (combinations in context)
  podstawowyGens.push(function () {
    var n = rand(5, 10);
    var k = rand(2, 3);
    function C(n, k) { var r = 1; for (var i = 0; i < k; i++) r = r * (n - i) / (i + 1); return Math.round(r); }
    var ans = C(n, k);
    return makeQ('Prawdopodobieństwo',
      'Na ile sposobów można wybrać ' + k + ' książki z ' + n + '?',
      m('' + ans),
      [m('' + (ans + rand(1, 5))), m('' + (n * k)), m('' + (ans - rand(1, 3)))],
      '$\\binom{' + n + '}{' + k + '} = ' + ans + '$.'
    );
  });
  // 53) Probability with number cards
  podstawowyGens.push(function () {
    var max = pick([10, 12, 15, 20]);
    var div = pick([2, 3, 5]);
    var count = Math.floor(max / div);
    var gc = gcd(count, max);
    return makeQ('Prawdopodobieństwo',
      'Z kart z liczbami 1–' + max + ' losujemy jedną. P(liczba podzielna przez ' + div + ') =',
      m(frac(count / gc, max / gc)),
      [m(frac(count + 1, max)), m(frac(div, max)), m(frac(1, div))],
      'Podzielnych przez $' + div + '$: ' + count + ' z ' + max + '. $P = ' + frac(count / gc, max / gc) + '$.'
    );
  });

  /* ══════════════════════════════════════════════════
     ROZSZERZONY — GENERATORS
     ══════════════════════════════════════════════════ */
  var rozszerzonyGens = [];

  /* ── GRANICE ── */
  // Limit of rational function (highest power)
  rozszerzonyGens.push(function () {
    var a = rand(1, 8);
    var b = rand(1, 8);
    var c = rand(1, 5);
    var d = rand(1, 5);
    return makeQ('Granice',
      'Oblicz: $\\displaystyle\\lim_{n\\to\\infty} \\frac{' + a + 'n^2 + ' + c + 'n}{' + b + 'n^2 - ' + d + '}$',
      m(frac(a, b)),
      [m('0'), m('\\infty'), m(frac(a + 1, b))],
      'Dzielimy przez $n^2$: $\\frac{' + a + ' + \\frac{' + c + '}{n}}{' + b + ' - \\frac{' + d + '}{n^2}} \\to ' + frac(a, b) + '$.',
      'rozszerzony'
    );
  });
  // Limit with e
  rozszerzonyGens.push(function () {
    var k = rand(1, 6);
    return makeQ('Granice',
      'Oblicz: $\\displaystyle\\lim_{n\\to\\infty}\\left(1+\\frac{' + k + '}{n}\\right)^n$',
      m('e^{' + k + '}'),
      [m('e'), m('' + k), m('1')],
      'Podstawienie: $\\left(1+\\frac{' + k + '}{n}\\right)^n = \\left[\\left(1+\\frac{1}{n/' + k + '}\\right)^{n/' + k + '}\\right]^{' + k + '} \\to e^{' + k + '}$.',
      'rozszerzony'
    );
  });
  // Limit polynomial / polynomial (different degrees)
  rozszerzonyGens.push(function () {
    var a = rand(1, 6);
    var b = rand(1, 6);
    var higher = pick(['top', 'bottom']);
    if (higher === 'top') {
      return makeQ('Granice',
        'Oblicz: $\\displaystyle\\lim_{n\\to\\infty} \\frac{' + a + 'n^3 + 1}{' + b + 'n^2 + n}$',
        m('\\infty'),
        [m('0'), m(frac(a, b)), m('1')],
        'Stopień licznika ($3$) > mianownika ($2$) → granica $= \\infty$.',
        'rozszerzony'
      );
    } else {
      return makeQ('Granice',
        'Oblicz: $\\displaystyle\\lim_{n\\to\\infty} \\frac{' + a + 'n + 1}{' + b + 'n^2 + n}$',
        m('0'),
        [m('\\infty'), m(frac(a, b)), m('1')],
        'Stopień licznika ($1$) < mianownika ($2$) → granica $= 0$.',
        'rozszerzony'
      );
    }
  });
  // Squeeze theorem
  rozszerzonyGens.push(function () {
    var a = rand(2, 7);
    return makeQ('Granice',
      'Oblicz: $\\displaystyle\\lim_{n\\to\\infty} \\frac{\\sin(n)}{' + a + 'n}$',
      m('0'),
      [m('1'), m('\\frac{1}{' + a + '}'), m('\\text{nie istnieje}')],
      '$|\\frac{\\sin n}{' + a + 'n}| \\leq \\frac{1}{' + a + 'n} \\to 0$ → z tw. o trzech ciągach: $0$.',
      'rozszerzony'
    );
  });

  /* ── POCHODNE ── */
  // Power rule
  rozszerzonyGens.push(function () {
    var a = rand(1, 6);
    var n = rand(2, 6);
    var b = rand(-8, 8); while (b === 0) b = rand(-8, 8);
    var da = a * n;
    var dn = n - 1;
    return makeQ('Pochodne',
      'Pochodna $f(x) = ' + a + 'x^{' + n + '} ' + (b > 0 ? '+ ' + b : '- ' + Math.abs(b)) + '$:',
      m(da + 'x^{' + dn + '}'),
      [m(a + 'x^{' + n + '}'), m(da + 'x^{' + n + '}'), m(a + 'x^{' + dn + '}')],
      '$(ax^n)\' = anx^{n-1}$: $(' + a + 'x^{' + n + '})\'= ' + da + 'x^{' + dn + '}$. Stała znika.',
      'rozszerzony'
    );
  });
  // Chain rule (sin/cos)
  rozszerzonyGens.push(function () {
    var k = rand(2, 7);
    var fn = pick(['sin', 'cos']);
    var deriv = fn === 'sin' ? k + '\\cos(' + k + 'x)' : '-' + k + '\\sin(' + k + 'x)';
    var wrong1 = fn === 'sin' ? '\\cos(' + k + 'x)' : '-\\sin(' + k + 'x)';
    var wrong2 = fn === 'sin' ? '-' + k + '\\cos(' + k + 'x)' : k + '\\sin(' + k + 'x)';
    var wrong3 = fn === 'sin' ? k + '\\sin(' + k + 'x)' : k + '\\cos(' + k + 'x)';
    return makeQ('Pochodne',
      'Pochodna $f(x) = \\' + fn + '(' + k + 'x)$:',
      m(deriv),
      [m(wrong1), m(wrong2), m(wrong3)],
      'Reguła łańcuchowa: $(\\' + fn + '(u))\' = ' + (fn === 'sin' ? '\\cos(u)' : '-\\sin(u)') + ' \\cdot u\'$, $u = ' + k + 'x$, $u\' = ' + k + '$.',
      'rozszerzony'
    );
  });
  // Find critical point
  rozszerzonyGens.push(function () {
    var a = rand(1, 4);
    var p = rand(-4, 4);
    // f(x) = a*x^2 + bx + c, f'(x) = 2ax + b = 0 → x = -b/(2a)
    var b_coeff = -2 * a * p;
    var c = rand(-5, 5);
    var signB = b_coeff >= 0 ? '+ ' + b_coeff : '- ' + Math.abs(b_coeff);
    var signC = c >= 0 ? '+ ' + c : '- ' + Math.abs(c);
    var extremum = a > 0 ? 'minimum' : 'maximum';
    return makeQ('Pochodne',
      '$f(x) = ' + a + 'x^2 ' + signB + 'x ' + signC + '$ ma ' + extremum + ' w punkcie:',
      m('x = ' + p),
      [m('x = ' + (-p)), m('x = ' + (p + 1)), m('x = 0')],
      '$f\'(x) = ' + (2 * a) + 'x ' + signB + ' = 0$ → $x = ' + p + '$.',
      'rozszerzony'
    );
  });
  // Tangent line
  rozszerzonyGens.push(function () {
    var a = rand(1, 3);
    var x0 = rand(-3, 3);
    var y0 = a * x0 * x0;
    var slope = 2 * a * x0;
    var b = y0 - slope * x0;
    var signB = b >= 0 ? ' + ' + b : ' - ' + Math.abs(b);
    return makeQ('Pochodne',
      'Styczna do $f(x) = ' + a + 'x^2$ w $x_0 = ' + x0 + '$ to:',
      m('y = ' + slope + 'x' + (b !== 0 ? signB : '')),
      [m('y = ' + (slope + 1) + 'x' + signB), m('y = ' + (2 * a) + 'x'), m('y = ' + slope + 'x ' + (b > 0 ? '- ' + b : '+ ' + Math.abs(b)))],
      '$f\'(x) = ' + (2 * a) + 'x$ → $f\'(' + x0 + ') = ' + slope + '$, $f(' + x0 + ') = ' + y0 + '$ → $y = ' + slope + '(x - ' + x0 + ') + ' + y0 + '$.',
      'rozszerzony'
    );
  });
  // Monotonicity intervals
  rozszerzonyGens.push(function () {
    var r1 = rand(-4, 0);
    var r2 = rand(1, 5);
    // f'(x) = (x - r1)(x - r2), f rosnąca gdy f' > 0
    return makeQ('Pochodne',
      'Jeśli $f\'(x) = (x ' + (r1 >= 0 ? '- ' + r1 : '+ ' + Math.abs(r1)) + ')(x - ' + r2 + ')$, to $f$ rośnie na:',
      m('(-\\infty, ' + r1 + ') \\cup (' + r2 + ', +\\infty)'),
      [m('(' + r1 + ', ' + r2 + ')'), m('(-\\infty, ' + r2 + ')'), m('(' + r1 + ', +\\infty)')],
      '$f\' > 0$ dla $x < ' + r1 + '$ lub $x > ' + r2 + '$ (parabola w górę).',
      'rozszerzony'
    );
  });

  /* ── WIELOMIANY ── */
  // Bezout's theorem
  rozszerzonyGens.push(function () {
    var a = rand(-4, 4); while (a === 0) a = rand(-4, 4);
    // W(x) = x^3 + bx + c, evaluate W(a)
    var b_c = rand(-5, 5);
    var c_c = rand(-5, 5);
    var val = a * a * a + b_c * a + c_c;
    return makeQ('Wielomiany',
      'Reszta z dzielenia $W(x) = x^3 ' + (b_c >= 0 ? '+ ' + b_c : '- ' + Math.abs(b_c)) + 'x ' + (c_c >= 0 ? '+ ' + c_c : '- ' + Math.abs(c_c)) + '$ przez $(x - ' + (a >= 0 ? a : '(' + a + ')') + ')$:',
      m('' + val),
      [m('' + (val + 1)), m('' + (-val)), m('0')],
      'Tw. Bezout: reszta $= W(' + a + ') = ' + a + '^3 ' + (b_c >= 0 ? '+' : '') + b_c + ' \\cdot ' + a + ' ' + (c_c >= 0 ? '+' : '') + c_c + ' = ' + val + '$.',
      'rozszerzony'
    );
  });
  // Rational root test
  rozszerzonyGens.push(function () {
    var r = pick([-3, -2, -1, 1, 2, 3]);
    // W(x) = (x - r)(x^2 + 1) = x^3 - r*x^2 + x - r
    var A = -r;
    var C = -r;
    return makeQ('Wielomiany',
      'Jedyny pierwiastek rzeczywisty $W(x)=x^3' + (A >= 0 ? '+' + A : A) + 'x^2+x' + (C >= 0 ? '+' + C : C) + '$ to:',
      m('x = ' + r),
      [m('x = ' + (-r)), m('x = 0'), m('x = ' + (r + 1))],
      'Sprawdzamy kandydatów (dzielniki $' + Math.abs(C) + '$): $W(' + r + ') = 0$ ✓.',
      'rozszerzony'
    );
  });
  // Degree and leading coefficient
  rozszerzonyGens.push(function () {
    var deg = rand(3, 5);
    var lc = rand(2, 7) * pick([-1, 1]);
    return makeQ('Wielomiany',
      'Wielomian $W(x) = ' + lc + 'x^{' + deg + '} + 3x^2 - 1$ ma stopień:',
      m('' + deg),
      [m('' + (deg - 1)), m('' + (deg + 1)), m('2')],
      'Najwyższa potęga $x$ to $' + deg + '$ → stopień = $' + deg + '$.',
      'rozszerzony'
    );
  });

  /* ── WEKTORY ── */
  // Dot product
  rozszerzonyGens.push(function () {
    var u1 = rand(-6, 6); var u2 = rand(-6, 6);
    var v1 = rand(-6, 6); var v2 = rand(-6, 6);
    var dot = u1 * v1 + u2 * v2;
    return makeQ('Wektory',
      'Iloczyn skalarny $\\vec{u}=[' + u1 + ',' + u2 + ']$ i $\\vec{v}=[' + v1 + ',' + v2 + ']$:',
      m('' + dot),
      [m('' + (dot + rand(1, 5))), m('' + (-dot)), m('' + (u1 * v2 + u2 * v1))],
      '$\\vec{u} \\cdot \\vec{v} = ' + u1 + ' \\cdot ' + (v1 >= 0 ? v1 : '(' + v1 + ')') + ' + ' + u2 + ' \\cdot ' + (v2 >= 0 ? v2 : '(' + v2 + ')') + ' = ' + dot + '$.',
      'rozszerzony'
    );
  });
  // Vector length
  rozszerzonyGens.push(function () {
    var triples = [[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17]];
    var t = pick(triples);
    var signs = [pick([-1, 1]), pick([-1, 1])];
    var v1 = signs[0] * t[0];
    var v2 = signs[1] * t[1];
    return makeQ('Wektory',
      'Długość wektora $\\vec{v} = [' + v1 + ', ' + v2 + ']$:',
      m('' + t[2]),
      [m('' + (t[2] + 1)), m('' + (Math.abs(v1) + Math.abs(v2))), m('' + (t[2] - 1))],
      '$|\\vec{v}| = \\sqrt{' + v1 + '^2 + ' + v2 + '^2} = \\sqrt{' + (v1 * v1) + ' + ' + (v2 * v2) + '} = ' + t[2] + '$.',
      'rozszerzony'
    );
  });
  // Perpendicular check
  rozszerzonyGens.push(function () {
    var u1 = rand(1, 6);
    var u2 = rand(1, 6);
    var isPerp = pick([true, false]);
    var v1, v2;
    if (isPerp) {
      // u·v = 0 → u1*v1 + u2*v2 = 0 → v1 = u2, v2 = -u1
      v1 = u2; v2 = -u1;
    } else {
      v1 = rand(-6, 6); v2 = rand(-6, 6);
      while (u1 * v1 + u2 * v2 === 0) { v1 = rand(-6, 6); v2 = rand(-6, 6); }
    }
    var dot = u1 * v1 + u2 * v2;
    return makeQ('Wektory',
      'Czy $\\vec{u}=[' + u1 + ',' + u2 + ']$ i $\\vec{v}=[' + v1 + ',' + v2 + ']$ są prostopadłe?',
      isPerp ? 'Tak' : 'Nie',
      [isPerp ? 'Nie' : 'Tak', 'Brak danych', 'Są równoległe'],
      '$\\vec{u} \\cdot \\vec{v} = ' + dot + (dot === 0 ? ' = 0$ → prostopadłe.' : ' \\neq 0$ → nie są prostopadłe.'),
      'rozszerzony'
    );
  });
  // Triangle area from vectors
  rozszerzonyGens.push(function () {
    var u1 = rand(1, 6); var u2 = rand(1, 6);
    var v1 = rand(-6, 6); var v2 = rand(-6, 6);
    var cross = Math.abs(u1 * v2 - u2 * v1);
    while (cross === 0) { v2 = v2 + 1; cross = Math.abs(u1 * v2 - u2 * v1); }
    var areaStr = cross % 2 === 0 ? '' + (cross / 2) : frac(cross, 2);
    return makeQ('Wektory',
      'Pole trójkąta rozpiętego na $\\vec{u}=[' + u1 + ',' + u2 + ']$ i $\\vec{v}=[' + v1 + ',' + v2 + ']$:',
      m(areaStr),
      [m('' + cross), m(frac(cross + 2, 2)), m(frac(cross, 3))],
      '$S = \\frac{1}{2}|' + u1 + ' \\cdot ' + (v2 >= 0 ? v2 : '(' + v2 + ')') + ' - ' + u2 + ' \\cdot ' + (v1 >= 0 ? v1 : '(' + v1 + ')') + '| = \\frac{' + cross + '}{2} = ' + areaStr + '$.',
      'rozszerzony'
    );
  });

  /* ── DOWODZENIE ── */
  rozszerzonyGens.push(function () {
    var types = [
      { q: 'W indukcji matematycznej krok indukcyjny polega na:', correct: 'Założeniu $P(k)$ i pokazaniu $P(k+1)$', d: ['Sprawdzeniu $P(1)$', 'Udowodnieniu $P(n)$ wprost', 'Zaprzeczeniu tezy'], e: 'Krok indukcyjny: $P(k) \\Rightarrow P(k+1)$.' },
      { q: 'Dowód nie wprost polega na:', correct: 'Założeniu negacji tezy i wyprowadzeniu sprzeczności', d: ['Pokazaniu wprost prawdziwości', 'Indukcji matematycznej', 'Metodzie przeciwobrazów'], e: 'Nie wprost: zakładamy $\\neg T$ i dochodzimy do sprzeczności.' },
      { q: 'Baza indukcji (dla $n \\geq 1$) to zwykle sprawdzenie:', correct: '$P(1)$', d: ['$P(0)$', '$P(k) \\Rightarrow P(k+1)$', 'Przypadku ogólnego'], e: 'Bazę sprawdzamy dla najmniejszego $n$ (tu: $n=1$).' },
      { q: 'Jeśli $a^2$ jest parzyste, to $a$ jest:', correct: 'parzyste', d: ['nieparzyste', 'dowolne', 'ujemne'], e: 'Jeśli $a$ nieparzyste, to $a^2$ nieparzyste (sprzeczność) → $a$ parzyste.' },
      { q: 'Metoda dowodzenia: "każdy z $n$ przypadków spełnia warunek" to:', correct: 'dowód przez wyczerpanie przypadków', d: ['indukcja', 'dowód nie wprost', 'metoda zstępująca'], e: 'Rozbijamy na skończoną liczbę przypadków i sprawdzamy każdy.' },
      { q: '$\\sqrt{2}$ jest liczbą niewymierną. Jakiego dowodu zwykle się używa?', correct: 'nie wprost (przez sprzeczność)', d: ['indukcji', 'wprost', 'przez wyczerpanie'], e: 'Zakładamy $\\sqrt{2} = \\frac{p}{q}$ (nieskracalny) i wyprowadzamy sprzeczność.' },
      { q: 'Zasada indukcji: jeśli $P(1)$ prawdziwe i $P(k) \\Rightarrow P(k+1)$, to:', correct: '$P(n)$ prawdziwe dla każdego $n \\geq 1$', d: ['$P(n)$ prawdziwe dla $n = k$', '$P(n)$ prawdziwe tylko dla parzystych', 'Nie można wnioskować'], e: 'To jest zasada indukcji matematycznej — dwa kroki gwarantują prawdziwość dla każdego $n$.' },
      { q: 'Kontraprzyklad obalający "$\\forall n\\in\\mathbb{N}$: $n^2 + n + 41$ jest liczbą pierwszą" to:', correct: '$n = 40$: $40^2+40+41 = 41^2$', d: ['$n = 0$', '$n = 1$', 'Taki nie istnieje'], e: '$40^2 + 40 + 41 = 1600 + 40 + 41 = 1681 = 41^2$ → złożona.' },
      { q: 'W dowodzie przez zaprzeczenie chcemy wykazać $P$. Zakładamy:', correct: '$\\neg P$ (negację tezy)', d: ['$P$ (tezę)', 'Dowolne zdanie', 'Tezę i jej negację jednocześnie'], e: 'Dowód nie wprost: zakładamy $\\neg P$ i szukamy sprzeczności.' },
      { q: 'Suma $1+2+\\ldots+n$ wynosi $\\frac{n(n+1)}{2}$. Baza indukcji dla $n=1$:', correct: '$\\frac{1 \\cdot 2}{2} = 1$ ✓', d: ['$\\frac{2 \\cdot 3}{2}$', '$n = 0$', 'Nie wymaga bazy'], e: 'Sprawdzamy: $1 = \\frac{1 \\cdot 2}{2} = 1$ ✓ — baza spełniona.' },
      { q: 'Zdanie "$p \\Rightarrow q$" jest fałszywe, gdy:', correct: '$p$ prawdziwe i $q$ fałszywe', d: ['$p$ fałszywe i $q$ prawdziwe', '$p$ i $q$ fałszywe', '$p$ i $q$ prawdziwe'], e: 'Implikacja jest fałszywa tylko gdy z prawdy wynika fałsz.' },
      { q: 'Zaprzeczenie zdania "$\\forall x: P(x)$" to:', correct: '$\\exists x: \\neg P(x)$', d: ['$\\forall x: \\neg P(x)$', '$\\neg \\forall x: \\neg P(x)$', '$\\exists x: P(x)$'], e: 'Negacja kwantyfikatora ogólnego → kwantyfikator szczegółowy z negacją.' }
    ];
    var t = pick(types);
    return makeQ('Dowodzenie', t.q, t.correct, t.d, t.e, 'rozszerzony');
  });

  /* ══════════════════════════════════════════════════
     PUBLIC API
     ══════════════════════════════════════════════════ */
  function generate(level, topic, count) {
    var gens = level === 'rozszerzony' ? rozszerzonyGens : podstawowyGens;
    var results = [];
    var attempts = 0;
    var maxAttempts = count * 10;
    var seen = {};

    while (results.length < count && attempts < maxAttempts) {
      attempts++;
      var gen = pick(gens);
      var q = gen();
      if (!q) continue;

      // Topic filter
      if (topic && q.topic !== topic) continue;

      // Deduplicate by question text
      var key = q.q;
      if (seen[key]) continue;
      seen[key] = true;

      results.push(q);
    }

    return shuffle(results);
  }

  window.quizGen = {
    generate: generate,
    podstawowyTopics: (function () {
      var set = {};
      podstawowyGens.forEach(function (g) { var q = g(); if (q) set[q.topic] = true; });
      return Object.keys(set).sort();
    })(),
    rozszerzonyTopics: (function () {
      var set = {};
      rozszerzonyGens.forEach(function (g) { var q = g(); if (q) set[q.topic] = true; });
      return Object.keys(set).sort();
    })(),
    podstawowyCount: podstawowyGens.length,
    rozszerzonyCount: rozszerzonyGens.length
  };
})();
