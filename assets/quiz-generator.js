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

  /* ── LICZBY RZECZYWISTE – dodatkowe ── */
  // Logarithm product rule
  podstawowyGens.push(function () {
    var a = rand(2, 6);
    var b = rand(2, 6);
    var base = pick([2, 3, 5, 10]);
    return makeQ('Liczby rzeczywiste',
      'Uprość: $\\log_{' + base + '} ' + a + ' + \\log_{' + base + '} ' + b + '$',
      m('\\log_{' + base + '} ' + (a * b)),
      [m('\\log_{' + base + '} ' + (a + b)), m('\\log_{' + (base * 2) + '} ' + (a * b)), m('' + (a * b))],
      'Własność logarytmu: $\\log_a x + \\log_a y = \\log_a(x \\cdot y) = \\log_{' + base + '} ' + (a * b) + '$.'
    );
  });
  // Logarithm power rule
  podstawowyGens.push(function () {
    var k = rand(2, 5);
    var base = pick([2, 3, 5, 10]);
    var x = rand(2, 8);
    return makeQ('Liczby rzeczywiste',
      'Uprość: $\\log_{' + base + '} ' + x + '^{' + k + '}$',
      m(k + ' \\log_{' + base + '} ' + x),
      [m('\\log_{' + (base * k) + '} ' + x), m('\\log_{' + base + '} ' + (x * k)), m('(' + k + ')^{\\log_{' + base + '} ' + x + '}')],
      'Własność potęgi: $\\log_a x^k = k \\cdot \\log_a x = ' + k + ' \\log_{' + base + '} ' + x + '$.'
    );
  });
  // Negative exponent with fraction
  podstawowyGens.push(function () {
    var p = rand(2, 5);
    var q = rand(2, 5);
    while (p === q) q = rand(2, 5);
    var exp = rand(1, 3);
    var numAns = Math.pow(q, exp);
    var denAns = Math.pow(p, exp);
    return makeQ('Liczby rzeczywiste',
      'Oblicz: $\\left(\\frac{' + p + '}{' + q + '}\\right)^{-' + exp + '}$',
      m('\\frac{' + numAns + '}{' + denAns + '}'),
      [m('\\frac{' + denAns + '}{' + numAns + '}'), m('-\\frac{' + numAns + '}{' + denAns + '}'), m('' + (numAns / denAns))],
      '$\\left(\\frac{p}{q}\\right)^{-n} = \\left(\\frac{q}{p}\\right)^n = \\frac{' + numAns + '}{' + denAns + '}$.'
    );
  });
  // Which set does a number belong to
  podstawowyGens.push(function () {
    var nums = [
      { val: '\\sqrt{2}', sets: ['\\mathbb{R} \\setminus \\mathbb{Q}'], notIn: '\\mathbb{Q}' },
      { val: '\\pi', sets: ['\\mathbb{R} \\setminus \\mathbb{Q}'], notIn: '\\mathbb{Q}' },
      { val: '-7', sets: ['\\mathbb{Z}', '\\mathbb{Q}', '\\mathbb{R}'], notIn: '\\mathbb{N}' },
      { val: '\\frac{3}{4}', sets: ['\\mathbb{Q}', '\\mathbb{R}'], notIn: '\\mathbb{Z}' },
      { val: '0', sets: ['\\mathbb{N}', '\\mathbb{Z}', '\\mathbb{Q}', '\\mathbb{R}'], notIn: '\\mathbb{Z} \\setminus \\mathbb{N}' }
    ];
    var n = pick(nums);
    return makeQ('Liczby rzeczywiste',
      'Liczba $' + n.val + '$ NIE należy do:',
      m(n.notIn),
      [m('\\mathbb{R}'), m(n.sets[0]), m('\\mathbb{Q} \\cup (\\mathbb{R} \\setminus \\mathbb{Q})')],
      '$' + n.val + '$ nie jest liczbą ' + (n.notIn === '\\mathbb{Q}' ? 'wymierną ($\\mathbb{Q}$)' : n.notIn === '\\mathbb{N}' ? 'naturalną ($\\mathbb{N}$), bo jest ujemna' : 'całkowitą ($\\mathbb{Z}$), bo jest ułamkiem') + '.'
    );
  });
  // Interval notation
  podstawowyGens.push(function () {
    var a = rand(-5, 2);
    var b = rand(a + 1, 8);
    var kind = pick(['open', 'closed', 'half-right', 'half-left']);
    var interval, description;
    if (kind === 'open') {
      interval = '(' + a + ', ' + b + ')';
      description = 'zbiór liczb $x$ takich, że $' + a + ' < x < ' + b + '$';
    } else if (kind === 'closed') {
      interval = '\\langle ' + a + ', ' + b + ' \\rangle';
      description = 'zbiór liczb $x$ takich, że $' + a + ' \\leq x \\leq ' + b + '$';
    } else if (kind === 'half-right') {
      interval = '\\langle ' + a + ', ' + b + ')';
      description = 'zbiór liczb $x$ takich, że $' + a + ' \\leq x < ' + b + '$';
    } else {
      interval = '(' + a + ', ' + b + ' \\rangle';
      description = 'zbiór liczb $x$ takich, że $' + a + ' < x \\leq ' + b + '$';
    }
    return makeQ('Liczby rzeczywiste',
      'Przedział $' + interval + '$ to:',
      description,
      ['zbiór liczb $x$ takich, że $' + a + ' < x < ' + b + '$', 'zbiór liczb $x$ takich, że $' + a + ' \\leq x \\leq ' + b + '$', 'zbiór pusty'],
      'Nawias okrągły = koniec otwarty (bez punktu), nawias kwadratowy = koniec zamknięty (z punktem).'
    );
  });
  // Log inequality direction
  podstawowyGens.push(function () {
    var base = pick([2, 3, 5, 10]);
    var x = rand(2, 8);
    var log_x_approx = Math.log(x) / Math.log(base);
    var val = Math.pow(base, rand(1, 4));
    return makeQ('Liczby rzeczywiste',
      'Rozwiąż: $\\log_{' + base + '} x > ' + (Math.round(Math.log(val) / Math.log(base))) + '$  (dla $x > 0$)',
      m('x > ' + val),
      [m('x < ' + val), m('x > ' + Math.log(val)), m('x \\in \\mathbb{R}')],
      'Podstawa $' + base + ' > 1$ → funkcja rosnąca, nierówność zachowuje kierunek: $x > ' + base + '^{' + (Math.round(Math.log(val) / Math.log(base))) + '} = ' + val + '$.'
    );
  });
  // Square root comparison
  podstawowyGens.push(function () {
    var a = rand(2, 15);
    var b = rand(2, 15);
    while (a === b) b = rand(2, 15);
    var greater = a > b ? a : b;
    var smaller = a > b ? b : a;
    return makeQ('Liczby rzeczywiste',
      'Porównaj: $\\sqrt{' + a + '}$ i $\\sqrt{' + b + '}$',
      m('\\sqrt{' + greater + '} > \\sqrt{' + smaller + '}'),
      [m('\\sqrt{' + smaller + '} > \\sqrt{' + greater + '}'), m('\\sqrt{' + a + '} = \\sqrt{' + b + '}'), m('\\text{Nie da się porównać}')],
      'Funkcja $f(x) = \\sqrt{x}$ jest rosnąca, więc $' + smaller + ' < ' + greater + ' \\Rightarrow \\sqrt{' + smaller + '} < \\sqrt{' + greater + '}$.'
    );
  });
  // Word problem: percentage change
  podstawowyGens.push(function () {
    var price = pick([100, 150, 200, 250, 400, 500]);
    var pct = pick([10, 15, 20, 25, 30, 40, 50]);
    var mode = pick(['wzrost', 'obniżka']);
    var newPrice = mode === 'wzrost' ? price * (1 + pct / 100) : price * (1 - pct / 100);
    return makeQ('Liczby rzeczywiste',
      'Cena produktu wynosi $' + price + '$ zł. Po ' + (mode === 'wzrost' ? 'podwyżce' : 'obniżce') + ' o $' + pct + '\\%$ nowa cena to:',
      m('' + newPrice + '\\ \\text{zł}'),
      [m('' + (newPrice + 5) + '\\ \\text{zł}'), m('' + (price + pct) + '\\ \\text{zł}'), m('' + (newPrice - 10) + '\\ \\text{zł}')],
      '$' + price + ' \\cdot ' + (mode === 'wzrost' ? '1{,}' + (100 + pct).toString().slice(1) : '0{,}' + (100 - pct)) + ' = ' + newPrice + '\\ \\text{zł}$.'
    );
  });

  /* ── WYRAŻENIA ALGEBRAICZNE – dodatkowe ── */
  // Factoring by grouping
  podstawowyGens.push(function () {
    var a = rand(2, 6);
    var b = rand(1, 5);
    // ax^2 + bx = x(ax + b)
    return makeQ('Wyrażenia algebraiczne',
      'Rozłóż na czynniki: $' + a + 'x^2 + ' + b + 'x$',
      m('x(' + a + 'x + ' + b + ')'),
      [m('x(' + a + 'x - ' + b + ')'), m(a + 'x(x + ' + b + ')'), m('(' + a + 'x)(x + ' + b + ')')],
      'Wyciągamy $x$ przed nawias: $x(' + a + 'x + ' + b + ')$.'
    );
  });
  // (a-b)^2 = a^2 - 2ab + b^2
  podstawowyGens.push(function () {
    var a = rand(2, 8);
    var b = rand(1, 7);
    var val = a * a - 2 * a * b + b * b;
    return makeQ('Wyrażenia algebraiczne',
      'Rozwiń: $(' + a + ' - ' + b + ')^2$',
      m('' + val),
      [m('' + (a * a + b * b)), m('' + (a * a + 2 * a * b + b * b)), m('' + (a - b))],
      '$(' + a + ' - ' + b + ')^2 = ' + a + '^2 - 2 \\cdot ' + a + ' \\cdot ' + b + ' + ' + b + '^2 = ' + (a * a) + ' - ' + (2 * a * b) + ' + ' + (b * b) + ' = ' + val + '$.'
    );
  });
  // Simplify ratio of polynomials
  podstawowyGens.push(function () {
    var r = rand(-6, 6); while (r === 0) r = rand(1, 6);
    var a = rand(1, 4);
    // (ax^2 + ar*x) / (x^2 + r*x) for x ≠ 0, x ≠ -r → = a
    var num = a + 'x^2 + ' + (a * r) + 'x';
    var den = 'x^2 + ' + r + 'x';
    return makeQ('Wyrażenia algebraiczne',
      'Uprość: $\\frac{' + num + '}{' + den + '}$ (dla $x\\neq 0, x \\neq ' + (-r) + '$)',
      m('' + a),
      [m('' + a + 'x'), m(frac(a, r)), m(a + 'x + ' + r)],
      '$= \\frac{x(' + a + 'x + ' + (a * r) + ')}{x(x + ' + r + ')} = \\frac{' + a + '(x + ' + r + ')}{x + ' + r + '} = ' + a + '$.'
    );
  });
  // Arithmetic of rational expressions
  podstawowyGens.push(function () {
    var a = rand(2, 6);
    var b = rand(2, 6);
    // 1/a + 1/b = (a+b)/(ab)
    var num = a + b;
    var den = a * b;
    var g = gcd(num, den);
    return makeQ('Wyrażenia algebraiczne',
      'Oblicz: $\\frac{1}{' + a + '} + \\frac{1}{' + b + '}$',
      m(frac(num / g, den / g)),
      [m(frac(1, a + b)), m(frac(num, den + 1)), m(frac(a + b, a * b + 1))],
      'Wspólny mianownik: $\\frac{' + b + '}{' + den + '} + \\frac{' + a + '}{' + den + '} = \\frac{' + num + '}{' + den + '} = ' + frac(num / g, den / g) + '$.'
    );
  });
  // Sum of polynomials
  podstawowyGens.push(function () {
    var a1 = rand(1, 5); var b1 = rand(-8, 8); var c1 = rand(-10, 10);
    var a2 = rand(1, 5); var b2 = rand(-8, 8); var c2 = rand(-10, 10);
    var A = a1 + a2; var B = b1 + b2; var C = c1 + c2;
    var signB = B >= 0 ? ' + ' + B : ' - ' + Math.abs(B);
    var signC = C >= 0 ? ' + ' + C : ' - ' + Math.abs(C);
    return makeQ('Wyrażenia algebraiczne',
      '$ (' + a1 + 'x^2 + ' + b1 + 'x + ' + c1 + ') + (' + a2 + 'x^2 + ' + b2 + 'x + ' + c2 + ') =$',
      m(A + 'x^2' + signB + 'x' + signC),
      [m((A + 1) + 'x^2' + signB + 'x' + signC), m(A + 'x^2 + ' + (B + 1) + 'x' + signC), m(A + 'x^2' + signB + 'x + ' + (C + 1))],
      'Sumujemy wyrazy podobne: $(' + a1 + '+' + a2 + ')x^2 + (' + b1 + '+(' + b2 + '))x + (' + c1 + '+(' + c2 + '))$.'
    );
  });
  // Cube of binomial
  podstawowyGens.push(function () {
    var a = rand(1, 5);
    // (x + a)^3 = x^3 + 3ax^2 + 3a^2 x + a^3
    var B = 3 * a; var C = 3 * a * a; var D = a * a * a;
    return makeQ('Wyrażenia algebraiczne',
      'Rozwiń skrótem: $(x + ' + a + ')^3$',
      m('x^3 + ' + B + 'x^2 + ' + C + 'x + ' + D),
      [m('x^3 + ' + (a * a * a)), m('x^3 + ' + B + 'x^2'), m('x^3 + 3x^2 + ' + C + 'x + ' + D)],
      '$(a+b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$: $x^3 + 3x^2 \\cdot ' + a + ' + 3x \\cdot ' + (a * a) + ' + ' + D + '$.'
    );
  });

  /* ── RÓWNANIA – dodatkowe ── */
  // Equation with absolute value
  podstawowyGens.push(function () {
    var a = rand(2, 10);
    var b = rand(1, 15);
    // |ax| = b → x = ±b/a
    var x1 = frac(b, a);
    var x2 = frac(-b, a);
    return makeQ('Równania',
      'Rozwiąż: $|' + a + 'x| = ' + b + '$',
      m('x \\in \\{' + x2 + ', ' + x1 + '\\}'),
      [m('x = ' + x1), m('x = ' + x2), m('\\text{brak rozwiązań}')],
      '$|' + a + 'x| = ' + b + '$ → $' + a + 'x = ' + b + '$ lub $' + a + 'x = -' + b + '$ → $x = ' + x1 + '$ lub $x = ' + x2 + '$.'
    );
  });
  // Quadratic discriminant = 0 (one root)
  podstawowyGens.push(function () {
    var r = rand(-5, 5); // double root
    // x^2 - 2r·x + r^2 = 0
    var B = -2 * r; var C = r * r;
    var signB = B >= 0 ? ' + ' + B : ' - ' + Math.abs(B);
    var signC = C >= 0 ? ' + ' + C : '';
    return makeQ('Równania',
      'Jaka jest wartość delty dla $x^2' + signB + 'x' + signC + ' = 0$?',
      m('\\Delta = 0 \\Rightarrow x_0 = ' + r),
      [m('\\Delta > 0, \\ x \\in \\{' + (r - 1) + ', ' + (r + 1) + '\\}'), m('\\Delta < 0, \\ \\text{brak rozw.}'), m('\\Delta = 0, \\ x_0 = ' + (r + 1))],
      '$\\Delta = (' + B + ')^2 - 4 \\cdot ' + C + ' = ' + (B * B) + ' - ' + (4 * C) + ' = 0$ → jedno rozwiązanie: $x_0 = ' + r + '$.'
    );
  });
  // Inequality with |x| > a
  podstawowyGens.push(function () {
    var a = rand(2, 12);
    return makeQ('Równania',
      'Rozwiąż: $|x| > ' + a + '$',
      m('x \\in (-\\infty, -' + a + ') \\cup (' + a + ', +\\infty)'),
      [m('-' + a + ' < x < ' + a), m('x > ' + a), m('x > -' + a)],
      '$|x| > ' + a + ' \\Leftrightarrow x < -' + a + '$ lub $x > ' + a + '$.'
    );
  });
  // Word problem: age puzzle
  podstawowyGens.push(function () {
    var older = rand(10, 40);
    var diff = rand(3, 15);
    var sum = older + (older - diff);
    return makeQ('Równania',
      'Mama jest o $' + diff + '$ lat starsza od córki. Razem mają $' + sum + '$ lat. Ile ma córka?',
      m('' + (older - diff) + '\\ \\text{lat}'),
      [m('' + older + '\\ \\text{lat}'), m('' + Math.round(sum / 2) + '\\ \\text{lat}'), m('' + (older - diff - 1) + '\\ \\text{lat}')],
      'Córka: $c$, mama: $c + ' + diff + '$. $c + c + ' + diff + ' = ' + sum + '$ → $c = \\frac{' + (sum - diff) + '}{2} = ' + (older - diff) + '$.'
    );
  });
  // Quadratic: no real roots (discriminant < 0)
  podstawowyGens.push(function () {
    var a = 1;
    var b = rand(-3, 3);
    var c = b * b + rand(1, 5); // ensures b^2 - 4c < 0
    var delta = b * b - 4 * a * c;
    return makeQ('Równania',
      'Ile rozwiązań rzeczywistych ma $x^2 ' + (b >= 0 ? '+ ' + b : '- ' + Math.abs(b)) + 'x + ' + c + ' = 0$?',
      'Brak rozwiązań rzeczywistych ($\\Delta < 0$)',
      ['$2$ rozwiązania', '$1$ rozwiązanie', '$3$ rozwiązania'],
      '$\\Delta = ' + b + '^2 - 4 \\cdot ' + c + ' = ' + delta + ' < 0$ → równanie nie ma rozwiązań rzeczywistych.'
    );
  });
  // System of equations — substitution
  podstawowyGens.push(function () {
    var x = rand(1, 8); var y = rand(1, 8);
    var a = rand(1, 4);
    var c1 = x + a * y; // x + ay = c1
    var c2 = x + y; // x + y = c2
    return makeQ('Równania',
      'Rozwiąż: $\\begin{cases}x + ' + a + 'y = ' + c1 + '\\\\x + y = ' + c2 + '\\end{cases}$',
      m('x = ' + x + ',\\ y = ' + y),
      [m('x = ' + (x + 1) + ',\\ y = ' + y), m('x = ' + x + ',\\ y = ' + (y + 1)), m('x = ' + y + ',\\ y = ' + x)],
      'Odejmując równania: $(' + a + '-1)y = ' + (c1 - c2) + '$ → $y = ' + y + '$, $x = ' + c2 + ' - ' + y + ' = ' + x + '$.'
    );
  });

  /* ── FUNKCJE – dodatkowe ── */
  // Roots of quadratic function
  podstawowyGens.push(function () {
    var r1 = rand(-5, 5); var r2 = rand(-5, 5);
    while (r1 === r2) r2 = r1 + rand(1, 4);
    var sorted = [r1, r2].sort(function(a, b) { return a - b; });
    var B = -(r1 + r2); var C = r1 * r2;
    return makeQ('Funkcje',
      'Miejsca zerowe $f(x) = x^2 ' + (B >= 0 ? '+ ' + B : '- ' + Math.abs(B)) + 'x ' + (C >= 0 ? '+ ' + C : '- ' + Math.abs(C)) + '$:',
      m('x_1 = ' + sorted[0] + ',\\ x_2 = ' + sorted[1]),
      [m('x_1 = ' + sorted[0] + ',\\ x_2 = ' + (sorted[1] + 1)), m('x_1 = ' + (sorted[0] - 1) + ',\\ x_2 = ' + sorted[1]), m('\\text{brak zer}')],
      'Wzory Viète\'a: $x_1 + x_2 = ' + (-B) + '$, $x_1 x_2 = ' + C + '$ → $x \\in \\{' + sorted[0] + ', ' + sorted[1] + '\\}$.'
    );
  });
  // Parabola direction (up/down based on 'a')
  podstawowyGens.push(function () {
    var a = rand(1, 6) * pick([-1, 1]);
    var b = rand(-5, 5);
    var c = rand(-8, 8);
    var direction = a > 0 ? 'w górę' : 'w dół';
    return makeQ('Funkcje',
      'Parabola $f(x) = ' + a + 'x^2 ' + (b >= 0 ? '+ ' + b : '- ' + Math.abs(b)) + 'x ' + (c >= 0 ? '+ ' + c : '- ' + Math.abs(c)) + '$ jest skierowana:',
      direction,
      [a > 0 ? 'w dół' : 'w górę', 'poziomo', 'brak jednoznacznej odpowiedzi'],
      'Współczynnik $a = ' + a + (a > 0 ? ' > 0' : ' < 0') + '$ → parabola otwarta ' + direction + '.'
    );
  });
  // Shift of function
  podstawowyGens.push(function () {
    var dx = rand(1, 5) * pick([-1, 1]);
    var dy = rand(1, 6) * pick([-1, 1]);
    var signDx = dx > 0 ? ' - ' + dx : ' + ' + Math.abs(dx);
    var signDy = dy > 0 ? ' + ' + dy : ' - ' + Math.abs(dy);
    return makeQ('Funkcje',
      'Wykres $g(x) = f(x' + signDx + ')' + signDy + '$ jest wynikiem przesunięcia $f$ o:',
      'o $' + Math.abs(dx) + '$ w ' + (dx > 0 ? 'prawo' : 'lewo') + ' i o $' + Math.abs(dy) + '$ w ' + (dy > 0 ? 'górę' : 'dół'),
      ['o $' + Math.abs(dx) + '$ w ' + (dx > 0 ? 'lewo' : 'prawo') + ' i o $' + Math.abs(dy) + '$ w ' + (dy > 0 ? 'górę' : 'dół'),
       'o $' + Math.abs(dx) + '$ w górę i o $' + Math.abs(dy) + '$ w prawo',
       'skalowanie o $' + dx + '$'],
      '$f(x - (' + dx + '))$: przesunięcie o $' + Math.abs(dx) + '$ w ' + (dx > 0 ? 'prawo' : 'lewo') + '. $' + signDy.trim() + '$: o $' + Math.abs(dy) + '$ w ' + (dy > 0 ? 'górę' : 'dół') + '.'
    );
  });
  // Range of quadratic
  podstawowyGens.push(function () {
    var a = rand(1, 4) * pick([-1, 1]);
    var p = rand(-4, 4);
    var q = rand(-6, 6);
    if (a > 0) {
      return makeQ('Funkcje',
        'Zbiór wartości $f(x) = ' + a + '(x - ' + p + ')^2 + ' + q + '$ (parabola):', 
        m('[' + q + ', +\\infty)'),
        [m('(-\\infty, ' + q + ']'), m('(-\\infty, +\\infty)'), m('[' + (q - 1) + ', +\\infty)')],
        '$a = ' + a + ' > 0$ → minimum w wierzchołku $(p, q) = (' + p + ', ' + q + ')$ → zbiór wartości: $[' + q + ', +\\infty)$.'
      );
    } else {
      return makeQ('Funkcje',
        'Zbiór wartości $f(x) = ' + a + '(x - ' + p + ')^2 + ' + q + '$ (parabola):',
        m('(-\\infty, ' + q + ']'),
        [m('[' + q + ', +\\infty)'), m('(-\\infty, +\\infty)'), m('[' + (q + 1) + ', +\\infty)')],
        '$a = ' + a + ' < 0$ → maksimum w wierzchołku $(' + p + ', ' + q + ')$ → zbiór wartości: $(-\\infty, ' + q + ']$.'
      );
    }
  });
  // Function composition f(g(x))
  podstawowyGens.push(function () {
    var a = rand(2, 5);
    var b = rand(-5, 5);
    var x0 = rand(-3, 3);
    // f(x) = x^2, g(x) = ax + b, f(g(x0)) = (ax0+b)^2
    var gx = a * x0 + b;
    var fgx = gx * gx;
    return makeQ('Funkcje',
      'Dla $f(x) = x^2$ i $g(x) = ' + a + 'x + ' + b + '$ oblicz $f(g(' + x0 + '))$:',
      m('' + fgx),
      [m('' + (fgx + 2 * gx)), m('' + (a * x0 * x0 + b)), m('' + (gx + x0 * x0))],
      '$g(' + x0 + ') = ' + a + ' \\cdot ' + x0 + ' + ' + b + ' = ' + gx + '$, $f(' + gx + ') = ' + gx + '^2 = ' + fgx + '$.'
    );
  });
  // Inverse function
  podstawowyGens.push(function () {
    var a = rand(2, 6);
    var b = rand(-8, 8);
    // f(x) = ax + b → f^{-1}(x) = (x - b) / a
    var invStr = 'f^{-1}(x) = \\frac{x ' + (-b >= 0 ? '+ ' + (-b) : '- ' + Math.abs(-b)) + '}{' + a + '}';
    return makeQ('Funkcje',
      'Funkcja odwrotna do $f(x) = ' + a + 'x + ' + b + '$ to:',
      m(invStr),
      [m('f^{-1}(x) = \\frac{x ' + (b >= 0 ? '+ ' + b : '- ' + Math.abs(b)) + '}{' + a + '}'), m('f^{-1}(x) = ' + a + 'x - ' + b), m('f^{-1}(x) = \\frac{' + a + '}{x + ' + b + '}')],
      'Z $y = ' + a + 'x + ' + b + '$ wyznaczamy $x$: $x = \\frac{y - ' + b + '}{' + a + '} = \\frac{y ' + (-b >= 0 ? '+ ' + (-b) : '- ' + Math.abs(-b)) + '}{' + a + '}$.'
    );
  });

  /* ── CIĄGI – dodatkowe ── */
  // Find r (ratio of geometric)
  podstawowyGens.push(function () {
    var a1 = rand(1, 6);
    var q = rand(2, 5);
    var an = a1 * Math.pow(q, 2);
    return makeQ('Ciągi',
      'W ciągu geometrycznym $a_1 = ' + a1 + '$, $a_3 = ' + an + '$. Iloraz $q$ wynosi:',
      m('' + q),
      [m('' + (an - a1)), m('' + Math.round(Math.sqrt(an / a1) + 1)), m(frac(an, a1))],
      '$a_3 = a_1 \\cdot q^2$, więc $q^2 = \\frac{' + an + '}{' + a1 + '} = ' + (an / a1) + '$, $q = ' + q + '$.'
    );
  });
  // Infinite geometric series sum (|q| < 1)
  podstawowyGens.push(function () {
    var a1 = rand(1, 8);
    var qNum = rand(1, 4);
    var qDen = qNum + rand(1, 4); // q = qNum/qDen < 1
    var g = gcd(qNum, qDen);
    qNum /= g; qDen /= g;
    // S = a1 / (1 - q) = a1 * qDen / (qDen - qNum)
    var numS = a1 * qDen;
    var denS = qDen - qNum;
    var gS = gcd(numS, denS);
    return makeQ('Ciągi',
      'Suma nieskończonego ciągu geometrycznego $a_1 = ' + a1 + '$, $q = \\frac{' + qNum + '}{' + qDen + '}$ ($|q|<1$):',
      m(frac(numS / gS, denS / gS)),
      [m('' + (a1 * qDen)), m('\\infty'), m(frac(a1, qNum))],
      '$S = \\frac{a_1}{1 - q} = \\frac{' + a1 + '}{1 - \\frac{' + qNum + '}{' + qDen + '}} = \\frac{' + a1 + '}{\\frac{' + denS + '}{' + qDen + '}} = ' + frac(numS / gS, denS / gS) + '$.'
    );
  });
  // Arithmetic: find n given a_n
  podstawowyGens.push(function () {
    var a1 = rand(-5, 5);
    var r = rand(1, 6);
    var n = rand(4, 12);
    var an = a1 + (n - 1) * r;
    return makeQ('Ciągi',
      'Ciąg arytmetyczny: $a_1 = ' + a1 + '$, $r = ' + r + '$, $a_n = ' + an + '$. Wyraz o numerze $n$:',
      m('n = ' + n),
      [m('n = ' + (n + 1)), m('n = ' + (n - 1)), m('n = ' + Math.round(an / r))],
      '$a_n = a_1 + (n-1)r$: $' + an + ' = ' + a1 + ' + (n-1) \\cdot ' + r + '$ → $n = ' + n + '$.'
    );
  });
  // Geometric: sum of first n terms
  podstawowyGens.push(function () {
    var a1 = 1;
    var q = pick([2, 3]);
    var n = rand(3, 7);
    var S = a1 * (Math.pow(q, n) - 1) / (q - 1);
    return makeQ('Ciągi',
      'Suma $' + n + '$ wyrazów ciągu geom. $a_1 = 1$, $q = ' + q + '$:',
      m('' + S),
      [m('' + (S + 1)), m('' + (a1 * Math.pow(q, n - 1))), m('' + (S - a1))],
      '$S_{' + n + '} = \\frac{1 \\cdot (' + q + '^{' + n + '} - 1)}{' + q + ' - 1} = \\frac{' + (Math.pow(q, n) - 1) + '}{' + (q - 1) + '} = ' + S + '$.'
    );
  });
  // Recurrence relation
  podstawowyGens.push(function () {
    var a1 = rand(1, 5);
    var k = rand(2, 5);
    var a2 = a1 * k;
    var a3 = a2 * k;
    var a4 = a3 * k;
    return makeQ('Ciągi',
      'Ciąg spełnia: $a_1 = ' + a1 + '$, $a_{n+1} = ' + k + ' \\cdot a_n$. Czwarty wyraz to:',
      m('' + a4),
      [m('' + a3), m('' + (a4 + k)), m('' + (a1 * k * 3))],
      '$a_2 = ' + a2 + '$, $a_3 = ' + a3 + '$, $a_4 = ' + k + ' \\cdot ' + a3 + ' = ' + a4 + '$.'
    );
  });

  /* ── PLANIMETRIA – dodatkowe ── */
  // Area of trapezoid
  podstawowyGens.push(function () {
    var a = rand(4, 15); var b = rand(2, a - 1); var h = rand(3, 10);
    var area2 = (a + b) * h;
    var areaStr = area2 % 2 === 0 ? '' + (area2 / 2) : frac(area2, 2);
    return makeQ('Planimetria',
      'Pole trapezu: podstawy $' + a + '$ i $' + b + '$, wysokość $' + h + '$:',
      m(areaStr),
      [m('' + area2), m('' + (a * b)), m('' + (a * h))],
      '$P = \\frac{(a + b) \\cdot h}{2} = \\frac{(' + a + ' + ' + b + ') \\cdot ' + h + '}{2} = ' + areaStr + '$.'
    );
  });
  // Rhombus area via diagonals
  podstawowyGens.push(function () {
    var d1 = rand(4, 16); var d2 = rand(3, 14);
    var area2 = d1 * d2;
    var areaStr = area2 % 2 === 0 ? '' + (area2 / 2) : frac(area2, 2);
    return makeQ('Planimetria',
      'Pole rombu o przekątnych $' + d1 + '$ i $' + d2 + '$:',
      m(areaStr),
      [m('' + area2), m('' + (d1 + d2)), m('' + (d1 * d2 + d2))],
      '$P = \\frac{d_1 \\cdot d_2}{2} = \\frac{' + d1 + ' \\cdot ' + d2 + '}{2} = ' + areaStr + '$.'
    );
  });
  // Circumscribed circle of triangle
  podstawowyGens.push(function () {
    var triples = [[3, 4, 5], [5, 12, 13], [8, 15, 17]];
    var t = pick(triples);
    // Circumradius R = c / (2 * sin(C)) = hypotenuse / 2 for right triangle
    var R2 = t[2];
    return makeQ('Planimetria',
      'Promień okręgu opisanego na trójkącie prostokątnym o przeciwprostokątnej $' + t[2] + '$:',
      m(frac(R2, 2)),
      [m('' + t[2]), m(frac(R2 * 2, 3)), m(frac(R2, 3))],
      'Dla trójkąta prostokątnego: $R = \\frac{c}{2} = \\frac{' + t[2] + '}{2} = ' + frac(R2, 2) + '$.'
    );
  });
  // Diagonal of rectangle
  podstawowyGens.push(function () {
    var triples = [[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17]];
    var t = pick(triples);
    return makeQ('Planimetria',
      'Przekątna prostokąta o bokach $' + t[0] + '$ i $' + t[1] + '$:',
      m('' + t[2]),
      [m('' + (t[0] + t[1])), m('' + (t[2] + 1)), m('' + (t[2] - 1))],
      '$d = \\sqrt{' + t[0] + '^2 + ' + t[1] + '^2} = \\sqrt{' + (t[0]*t[0]) + ' + ' + (t[1]*t[1]) + '} = ' + t[2] + '$.'
    );
  });
  // Regular hexagon area
  podstawowyGens.push(function () {
    var a = rand(2, 8);
    // A = (3√3/2)a² ≈ 2.598a²  — here present formula symbolically
    return makeQ('Planimetria',
      'Ile trójkątów równobocznych tworzą prawidłowy sześciokąt o boku $' + a + '$?',
      m('6'),
      ['3', '4', '8'],
      'Sześciokąt prawidłowy dzieli się na 6 przystających trójkątów równobocznych o boku $a = ' + a + '$.'
    );
  });

  /* ── GEOMETRIA ANALITYCZNA – dodatkowe ── */
  // Equation of circle
  podstawowyGens.push(function () {
    var cx = rand(-5, 5); var cy = rand(-5, 5); var r = rand(2, 8);
    return makeQ('Geometria analityczna',
      'Równanie okręgu o środku $(' + cx + ', ' + cy + ')$ i promieniu $' + r + '$:',
      m('(x ' + (cx <= 0 ? '+ ' + (-cx) : '- ' + cx) + ')^2 + (y ' + (cy <= 0 ? '+ ' + (-cy) : '- ' + cy) + ')^2 = ' + (r * r)),
      [m('(x + ' + cx + ')^2 + (y + ' + cy + ')^2 = ' + r), m('x^2 + y^2 = ' + (r * r)), m('(x - ' + cx + ')^2 + (y - ' + cy + ')^2 = ' + r)],
      '$(x - ' + cx + ')^2 + (y - ' + cy + ')^2 = ' + r + '^2 = ' + (r * r) + '$.'
    );
  });
  // Are lines parallel?
  podstawowyGens.push(function () {
    var a = rand(-4, 4); while (a === 0) a = rand(1, 4);
    var b1 = rand(-8, 8); var b2 = rand(-8, 8);
    while (b1 === b2) b2 = rand(-8, 8);
    return makeQ('Geometria analityczna',
      'Czy proste $y = ' + a + 'x + ' + b1 + '$ i $y = ' + a + 'x + ' + b2 + '$ są:',
      'równoległe',
      ['prostopadłe', 'tożsame', 'przecinają się'],
      'Mają ten sam współczynnik kierunkowy $a = ' + a + '$, różne wyrazy wolne → są równoległe.'
    );
  });
  // Perpendicularity condition
  podstawowyGens.push(function () {
    var a1 = rand(1, 5) * pick([-1, 1]);
    var a2 = -1 / a1; // a1 * a2 = -1
    var b = rand(-5, 5);
    if (Number.isInteger(a2)) {
      return makeQ('Geometria analityczna',
        'Prosta do $y = ' + a1 + 'x + 3$ prostopadła ma nachylenie:',
        m('' + a2),
        [m('' + a1), m('' + (-a1)), m(frac(1, a1))],
        'Warunek prostopadłości: $a_1 \\cdot a_2 = -1$, więc $a_2 = \\frac{-1}{' + a1 + '} = ' + a2 + '$.'
      );
    } else {
      return makeQ('Geometria analityczna',
        'Prosta do $y = ' + a1 + 'x + 3$ prostopadła ma nachylenie:',
        m(frac(-1, a1)),
        [m('' + a1), m('' + (-a1 * 2)), m('' + a1 + '\\cdot(-1)')],
        'Warunek prostopadłości: $a_1 \\cdot a_2 = -1$, więc $a_2 = ' + frac(-1, a1) + '$.'
      );
    }
  });
  // Distance from point to line (specific form)
  podstawowyGens.push(function () {
    var triples = [[3, 4, 5], [5, 12, 13], [8, 15, 17]];
    var t = pick(triples);
    // Line: 3x + 4y = t[0]*t[1] ... use simple form
    var A = t[0]; var B = t[1];
    var C = A * rand(-5, 5) + B * rand(-5, 5);
    var x0 = 0; var y0 = 0;
    var dist = Math.abs(A * x0 + B * y0 + C) / t[2];
    if (!Number.isInteger(dist)) { C = 0; dist = 0; }
    return makeQ('Geometria analityczna',
      'Odległość punktu $(0, 0)$ od prostej $' + A + 'x + ' + B + 'y + ' + C + ' = 0$:',
      m('' + (Math.abs(C) / t[2])),
      [m('' + (Math.abs(C) / t[2] + 1)), m('' + Math.abs(C)), m('' + t[2])],
      '$d = \\frac{|' + A + '\\cdot0 + ' + B + '\\cdot0 + (' + C + ')|}{\\sqrt{' + A + '^2 + ' + B + '^2}} = \\frac{' + Math.abs(C) + '}{' + t[2] + '} = ' + (Math.abs(C) / t[2]) + '$.'
    );
  });
  // Collinearity / line through two points
  podstawowyGens.push(function () {
    var x1 = rand(-4, 4); var y1 = rand(-4, 4);
    var a = rand(-3, 3); while (a === 0) a = rand(1, 3);
    var b = y1 - a * x1;
    var x3 = rand(-6, 6);
    var y3 = a * x3 + b;
    var yWrong = y3 + rand(1, 4);
    return makeQ('Geometria analityczna',
      'Prosta przez $(' + x1 + ', ' + y1 + ')$ o nachyleniu $a = ' + a + '$. Dla $x = ' + x3 + '$ wartość $y$:',
      m('' + y3),
      [m('' + yWrong), m('' + (y3 - a)), m('' + (y3 + a))],
      'Równanie: $y = ' + a + 'x + ' + b + '$. $y(' + x3 + ') = ' + a + ' \\cdot ' + x3 + ' + (' + b + ') = ' + y3 + '$.'
    );
  });

  /* ── STEREOMETRIA – dodatkowe ── */
  // Sphere volume
  podstawowyGens.push(function () {
    var r = rand(2, 6);
    var r3 = r * r * r;
    return makeQ('Stereometria',
      'Objętość kuli o promieniu $' + r + '$:',
      m('\\frac{4}{3}\\pi r^3 = \\frac{' + (4 * r3) + '\\pi}{3}'),
      [m(4 * r3 + '\\pi'), m('\\frac{4}{3}' + r + '\\pi'), m(r3 + '\\pi')],
      '$V = \\frac{4}{3}\\pi r^3 = \\frac{4}{3}\\pi \\cdot ' + r + '^3 = \\frac{' + (4 * r3) + '\\pi}{3}$.'
    );
  });
  // Surface area of sphere
  podstawowyGens.push(function () {
    var r = rand(2, 8);
    return makeQ('Stereometria',
      'Pole powierzchni kuli o promieniu $' + r + '$:',
      m(4 * r * r + '\\pi'),
      [m(2 * r * r + '\\pi'), m(r * r + '\\pi'), m('\\frac{4}{3}' + r * r * r + '\\pi')],
      '$P = 4\\pi r^2 = 4\\pi \\cdot ' + r + '^2 = ' + (4 * r * r) + '\\pi$.'
    );
  });
  // Cone volume
  podstawowyGens.push(function () {
    var r = rand(2, 7); var h = rand(3, 12);
    var V3 = r * r * h;
    var Vstr = V3 % 3 === 0 ? frac(V3, 3) + '\\pi' : '\\frac{' + V3 + '\\pi}{3}';
    return makeQ('Stereometria',
      'Objętość stożka: $r = ' + r + '$, $h = ' + h + '$:',
      m(Vstr),
      [m(r * r * h + '\\pi'), m('\\frac{2}{3}' + r * r * h + '\\pi'), m(r * h + '\\pi')],
      '$V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi \\cdot ' + r + '^2 \\cdot ' + h + ' = ' + Vstr + '$.'
    );
  });
  // Space diagonal of cuboid
  podstawowyGens.push(function () {
    var triples = [[1, 2, 2], [2, 4, 4], [2, 6, 6], [3, 4, 5]]; // a,b,c where diag = nice
    var a = rand(2, 5); var b = rand(2, 5); var c = rand(2, 5);
    var d2 = a * a + b * b + c * c;
    var dStr = formatSqrt(d2);
    return makeQ('Stereometria',
      'Przekątna przestrzenna prostopadłościanu $' + a + ' \\times ' + b + ' \\times ' + c + '$:',
      m(dStr),
      [m(formatSqrt(a * a + b * b)), m('' + (a + b + c)), m(dStr + ' + 1')],
      '$d = \\sqrt{' + a + '^2 + ' + b + '^2 + ' + c + '^2} = \\sqrt{' + d2 + '} = ' + dStr + '$.'
    );
  });
  // Number of vertices/edges/faces of solid
  podstawowyGens.push(function () {
    var solids = [
      { name: 'sześcianu', V: 8, E: 12, F: 6 },
      { name: 'graniastosłupa trójkątnego', V: 6, E: 9, F: 5 },
      { name: 'ostrosłupa czworokątnego (piramidy)', V: 5, E: 8, F: 5 },
      { name: 'graniastosłupa czworokątnego', V: 8, E: 12, F: 6 }
    ];
    var s = pick(solids);
    var prop = pick(['wierzchołków', 'krawędzi', 'ścian']);
    var ans = prop === 'wierzchołków' ? s.V : prop === 'krawędzi' ? s.E : s.F;
    return makeQ('Stereometria',
      'Liczba ' + prop + ' ' + s.name + ':',
      m('' + ans),
      [m('' + (ans + 1)), m('' + (ans - 1)), m('' + (ans + 2))],
      s.name + ': $V = ' + s.V + '$, $E = ' + s.E + '$, $F = ' + s.F + '$ (wzór Eulera: $V - E + F = 2$).'
    );
  });

  /* ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● */
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

  /* ── GRANICE – dodatkowe ── */
  // Polynomial/polynomial limit infinity
  rozszerzonyGens.push(function () {
    var a = rand(1, 5); var b = rand(1, 5); var c = rand(1, 5);
    // lim (ax^2 + bx) / (cx^2 + d) = a/c
    var d = rand(1, 6);
    var g = gcd(a, c);
    return makeQ('Granice',
      '$\\lim_{x \\to \\infty} \\dfrac{' + a + 'x^2 + ' + b + 'x}{' + c + 'x^2 + ' + d + '}$',
      m(frac(a / g, c / g)),
      [m(frac(b, d)), m('0'), m('\\infty')],
      'Najwyższe potęgi $x^2$ w liczniku i mianowniku: $\\frac{' + a + '}{' + c + '} = ' + frac(a / g, c / g) + '$.',
      'rozszerzony'
    );
  });
  // Limit of (x^n - a^n)/(x - a) → n*a^{n-1}
  rozszerzonyGens.push(function () {
    var n = rand(2, 4); var a = rand(1, 5);
    var result = n * Math.pow(a, n - 1);
    return makeQ('Granice',
      '$\\lim_{x \\to ' + a + '} \\dfrac{x^{' + n + '} - ' + Math.pow(a, n) + '}{x - ' + a + '}$',
      m('' + result),
      [m('' + (result + 1)), m('' + Math.pow(a, n)), m('' + (n * a))],
      'Wzór: $\\lim_{x \\to a} \\frac{x^n - a^n}{x - a} = n \\cdot a^{n-1} = ' + n + ' \\cdot ' + a + '^{' + (n - 1) + '} = ' + result + '$.',
      'rozszerzony'
    );
  });
  // Squeeze theorem / known limit sin(x)/x
  rozszerzonyGens.push(function () {
    var k = rand(2, 6);
    return makeQ('Granice',
      '$\\lim_{x \\to 0} \\dfrac{\\sin(' + k + 'x)}{x}$',
      m('' + k),
      [m('0'), m('1'), m('' + (k + 1))],
      '$= ' + k + ' \\cdot \\lim_{x \\to 0} \\frac{\\sin(' + k + 'x)}{' + k + 'x} = ' + k + ' \\cdot 1 = ' + k + '$.',
      'rozszerzony'
    );
  });
  // Limit of sequence  a_n = (1 + 1/n)^n
  rozszerzonyGens.push(function () {
    return makeQ('Granice',
      '$\\lim_{n \\to \\infty} \\left(1 + \\dfrac{1}{n}\\right)^n$',
      m('e'),
      ['$0$', '$1$', '$\\infty$'],
      'Definicja stałej Eulera: $\\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n = e \\approx 2{,}718$.',
      'rozszerzony'
    );
  });
  // Limit at infinity of exponential vs polynomial
  rozszerzonyGens.push(function () {
    var a = rand(2, 5);
    var k = rand(2, 5);
    return makeQ('Granice',
      '$\\lim_{x \\to \\infty} \\dfrac{x^{' + k + '}}{' + a + '^x}$',
      m('0'),
      [m('\\infty'), m('' + k), m(frac(k, a))],
      'Wykładnicze rośnie szybciej niż wielomianowe: $\\frac{x^{' + k + '}}{' + a + '^x} \\to 0$.',
      'rozszerzony'
    );
  });
  // Left vs right limit (discontinuity)
  rozszerzonyGens.push(function () {
    var a = rand(1, 6);
    return makeQ('Granice',
      'Czy $\\lim_{x \\to ' + a + '} \\dfrac{|x - ' + a + '|}{x - ' + a + '}$ istnieje?',
      'Nie, bo granice jednostronne są różne ($-1$ i $+1$)',
      ['Tak, wynosi $1$', 'Tak, wynosi $0$', 'Tak, wynosi $-1$'],
      '$\\lim_{x \\to ' + a + '^-} = -1$, $\\lim_{x \\to ' + a + '^+} = +1$ → granica nie istnieje.',
      'rozszerzony'
    );
  });
  // Limit involving ln
  rozszerzonyGens.push(function () {
    return makeQ('Granice',
      '$\\lim_{x \\to 0^+} x \\ln x$',
      m('0'),
      [m('\\infty'), m('-\\infty'), m('1')],
      '$x \\cdot \\ln x = \\frac{\\ln x}{1/x}$ → de l\'Hôpital: $\\frac{1/x}{-1/x^2} = -x \\to 0$.',
      'rozszerzony'
    );
  });

  /* ── POCHODNE – dodatkowe ── */
  // Product rule: (f·g)' = f'g + fg'
  rozszerzonyGens.push(function () {
    var a = rand(2, 6); var b = rand(1, 5); var n = rand(2, 4);
    // f(x) = (ax + b) * x^n
    return makeQ('Pochodne',
      'Oblicz $((' + a + 'x + ' + b + ') \\cdot x^{' + n + '})\'$',
      m('(' + a + '(' + n + '+1) + ' + b + n + ')x^{' + n + '} = ' + (a * (n + 1)) + 'x^{' + n + '} + ' + (b * n) + 'x^{' + (n - 1) + '}'),
      [m(a + ' \\cdot ' + n + 'x^{' + (n - 1) + '}'), m((a * n) + 'x^{' + (n - 1) + '} + ' + b + n), m('(' + a + 'x + ' + b + ') \\cdot ' + n + 'x^{' + n + '}')],
      'Reguła Leibniza: $u\'v + uv\' = ' + a + ' \\cdot x^{' + n + '} + (' + a + 'x + ' + b + ') \\cdot ' + n + 'x^{' + (n - 1) + '}$.',
      'rozszerzony'
    );
  });
  // Quotient rule: (f/g)' = (f'g - fg')/g^2
  rozszerzonyGens.push(function () {
    var a = rand(2, 5); var b = rand(1, 4); var c = rand(1, 4); var d = rand(1, 5);
    // (ax + b) / (cx + d)  → (a(cx+d) - c(ax+b)) / (cx+d)^2 = (ad-bc)/(cx+d)^2
    var num = a * d - b * c;
    return makeQ('Pochodne',
      'Pochodna $\\left(\\dfrac{' + a + 'x + ' + b + '}{' + c + 'x + ' + d + '}\\right)\'$:',
      m('\\dfrac{' + num + '}{(' + c + 'x + ' + d + ')^2}'),
      [m('\\dfrac{' + a + '}{' + c + '}'), m('\\dfrac{' + (a * c) + '}{(' + c + 'x + ' + d + ')^2}'), m('\\dfrac{' + (a + b) + '}{(' + c + 'x)^2}')],
      'Reguła ilorazu: $\\frac{' + a + '(' + c + 'x + ' + d + ') - ' + c + '(' + a + 'x + ' + b + ')}{(' + c + 'x + ' + d + ')^2} = \\frac{' + num + '}{(' + c + 'x + ' + d + ')^2}$.',
      'rozszerzony'
    );
  });
  // Derivative of e^{ax}
  rozszerzonyGens.push(function () {
    var a = rand(2, 6);
    return makeQ('Pochodne',
      '$(e^{' + a + 'x})\'$',
      m(a + 'e^{' + a + 'x}'),
      [m('e^{' + a + 'x}'), m(a + 'e^{' + (a - 1) + 'x}'), m('\\frac{e^{' + a + 'x}}{' + a + '}')],
      'Reguła łańcuchowa: $\\frac{d}{dx} e^{' + a + 'x} = e^{' + a + 'x} \\cdot ' + a + ' = ' + a + 'e^{' + a + 'x}$.',
      'rozszerzony'
    );
  });
  // Derivative of ln(ax + b)
  rozszerzonyGens.push(function () {
    var a = rand(1, 5); var b = rand(-5, 5);
    return makeQ('Pochodne',
      '$(\\ln(' + a + 'x + ' + b + '))\'$   (dla $' + a + 'x + ' + b + ' > 0$)',
      m('\\dfrac{' + a + '}{' + a + 'x + ' + b + '}'),
      [m('\\dfrac{1}{' + a + 'x + ' + b + '}'), m('\\dfrac{' + a + '}{x}'), m(a + ' \\ln(' + a + 'x)')],
      'Reguła łańcuchowa: $(\\ln u)\' = \\frac{u\'}{u} = \\frac{' + a + '}{' + a + 'x + ' + b + '}$.',
      'rozszerzony'
    );
  });
  // Second derivative sign and concavity
  rozszerzonyGens.push(function () {
    var a = rand(1, 5) * pick([-1, 1]);
    var b = rand(-4, 4); var c = rand(-10, 10);
    // f(x) = ax^3 + bx^2 + cx, f'' = 6ax + 2b, inflection at x = -b/(3a)
    var p = rand(-4, 4);
    var fpp = 6 * a * p + 2 * b;
    return makeQ('Pochodne',
      'Dla $f(x) = ' + a + 'x^3 + ' + b + 'x^2 + cx$, $f\'\'(' + p + ') = 6 \\cdot ' + a + ' \\cdot ' + p + ' + 2 \\cdot ' + b + '$. Czyli:',
      m('f\'\'(' + p + ') = ' + fpp),
      [m('f\'\'(' + p + ') = ' + (fpp + 1)), m('f\'\'(' + p + ') = ' + (fpp - 2)), m('f\'\'(' + p + ') = 0')],
      '$f\'\'(x) = 6 \\cdot ' + a + 'x + 2 \\cdot ' + b + '$, więc $f\'\'(' + p + ') = ' + fpp + '$.',
      'rozszerzony'
    );
  });
  // Increasing/decreasing interval from f'
  rozszerzonyGens.push(function () {
    var r1 = rand(-5, 0); var r2 = rand(1, 5);
    // f'(x) = (x - r1)(x - r2) → increasing outside roots, dec between
    return makeQ('Pochodne',
      'Jeśli $f\'(x) = (x - ' + r1 + ')(x - ' + r2 + ')$, to $f$ jest malejąca na:',
      m('(' + r1 + ', ' + r2 + ')'),
      [m('(-\\infty, ' + r1 + ')'), m('(' + r2 + ', +\\infty)'), m('\\{' + r1 + ', ' + r2 + '\\}')],
      '$f\' < 0$ dla $x \\in (' + r1 + ', ' + r2 + ')$ → $f$ malejąca w tym przedziale.',
      'rozszerzony'
    );
  });
  // Tangent line equation at a point
  rozszerzonyGens.push(function () {
    var a = rand(1, 4);
    var x0 = rand(-3, 3);
    // f(x) = ax^2, f'(x) = 2ax, tangent: y = f'(x0)(x - x0) + f(x0)
    var fx0 = a * x0 * x0;
    var slope = 2 * a * x0;
    // y = slope*x + (fx0 - slope*x0) = slope*x + (ax0^2 - 2ax0^2) = slope*x - ax0^2
    var intercept = fx0 - slope * x0;
    var signInt = intercept >= 0 ? ' + ' + intercept : ' - ' + Math.abs(intercept);
    return makeQ('Pochodne',
      'Równanie stycznej do $f(x) = ' + a + 'x^2$ w punkcie $x_0 = ' + x0 + '$:',
      m('y = ' + slope + 'x' + signInt),
      [m('y = ' + (slope + 1) + 'x' + signInt), m('y = ' + slope + 'x'), m('y = ' + (2 * a) + 'x + ' + fx0)],
      '$f\'(x) = ' + (2 * a) + 'x$, $f\'(' + x0 + ') = ' + slope + '$, styczna: $y - ' + fx0 + ' = ' + slope + '(x - ' + x0 + ')$ → $y = ' + slope + 'x' + signInt + '$.',
      'rozszerzony'
    );
  });
  // Derivative of sin, cos
  rozszerzonyGens.push(function () {
    var type = pick(['sin', 'cos']);
    var k = rand(2, 6);
    var deriv = type === 'sin' ? k + '\\cos(' + k + 'x)' : '-' + k + '\\sin(' + k + 'x)';
    return makeQ('Pochodne',
      '$(\\' + type + '(' + k + 'x))\'$',
      m(deriv),
      [m((type === 'sin' ? '-' : '') + k + '\\' + (type === 'sin' ? 'cos' : 'sin') + '(x)'),
       m('\\' + (type === 'sin' ? 'cos' : 'sin') + '(' + k + 'x)'),
       m('\\' + type + '(' + k + 'x)')],
      'Reguła łańcuchowa: $(\\' + type + '(kx))\' = ' + (type === 'sin' ? 'k\\cos(kx)' : '-k\\sin(kx)') + '$.',
      'rozszerzony'
    );
  });

  /* ── WIELOMIANY – dodatkowe ── */
  // Polynomial division remainder
  rozszerzonyGens.push(function () {
    var r = rand(-5, 5);
    var a = rand(1, 4); var b = rand(-8, 8); var c = rand(-10, 15);
    // p(x) = ax^2 + bx + c, remainder when divided by (x - r) = p(r)
    var rem = a * r * r + b * r + c;
    return makeQ('Wielomiany',
      'Reszta z dzielenia $' + a + 'x^2 + ' + b + 'x + ' + c + '$ przez $(x - ' + r + ')$:',
      m('' + rem),
      [m('' + (rem + 1)), m('' + (-rem)), m('0')],
      'Twierdzenie Bézouta: reszta $= p(' + r + ') = ' + a + ' \\cdot ' + (r * r) + ' + ' + b + ' \\cdot ' + r + ' + ' + c + ' = ' + rem + '$.',
      'rozszerzony'
    );
  });
  // Is x=r a root?
  rozszerzonyGens.push(function () {
    var r = rand(-4, 4);
    var a = rand(1, 3); var k = rand(1, 4);
    // p(x) = a(x-r)(x^k) → p(r) = 0
    // Construct p as a*x^{k+1} - a*r*x^k
    var n = k + 1;
    var coeff = -a * r;
    var pStr = a + 'x^{' + n + '} ' + (coeff >= 0 ? '+ ' + coeff : '- ' + Math.abs(coeff)) + 'x^{' + k + '}';
    return makeQ('Wielomiany',
      'Czy $x = ' + r + '$ jest pierwiastkiem $W(x) = ' + pStr + '$?',
      'Tak, bo $W(' + r + ') = 0$',
      ['Nie, bo $W(' + r + ') \\neq 0$', 'Tak, ale tylko w $\\mathbb{C}$', 'Nie da się sprawdzić'],
      '$W(' + r + ') = ' + a + ' \\cdot ' + r + '^{' + n + '} ' + (coeff >= 0 ? '+ ' + coeff : '- ' + Math.abs(coeff)) + ' \\cdot ' + r + '^{' + k + '} = ' + r + '^{' + k + '}(' + a + ' \\cdot ' + r + ' ' + (coeff >= 0 ? '+ ' + coeff : '- ' + Math.abs(coeff)) + ') = 0$.',
      'rozszerzony'
    );
  });
  // Degree of product
  rozszerzonyGens.push(function () {
    var d1 = rand(2, 5); var d2 = rand(2, 5);
    return makeQ('Wielomiany',
      'Stopień iloczynu wielomianów stopnia $' + d1 + '$ i $' + d2 + '$:',
      m('' + (d1 + d2)),
      [m('' + Math.max(d1, d2)), m('' + (d1 * d2)), m('' + (d1 + d2 + 1))],
      '$\\deg(W_1 \\cdot W_2) = \\deg W_1 + \\deg W_2 = ' + d1 + ' + ' + d2 + ' = ' + (d1 + d2) + '$.',
      'rozszerzony'
    );
  });
  // Factoring cubic with known root
  rozszerzonyGens.push(function () {
    var r1 = rand(-3, 3); var r2 = rand(-3, 3); var r3 = rand(-3, 3);
    while (r2 === r1) r2 = rand(-3, 3);
    while (r3 === r1 || r3 === r2) r3 = rand(-3, 3);
    // W(x) = (x-r1)(x-r2)(x-r3)
    var s1 = -(r1 + r2 + r3); // coeff of x^2
    var s2 = r1 * r2 + r1 * r3 + r2 * r3; // coeff of x
    var s3 = -r1 * r2 * r3; // constant
    var sign = function(n) { return n >= 0 ? ' + ' + n : ' - ' + Math.abs(n); };
    return makeQ('Wielomiany',
      'Ile pierwiastków rzeczywistych ma $x^3' + sign(s1) + 'x^2' + sign(s2) + 'x' + sign(s3) + '$?',
      '3 (wynoszą $' + r1 + ', ' + r2 + ', ' + r3 + '$)',
      ['1', '2', 'Brak'],
      'Wielomian stopnia 3 z trzema różnymi pierwiastkami całkowitymi: $(x - ' + r1 + ')(x - ' + r2 + ')(x - ' + r3 + ') = 0$.',
      'rozszerzony'
    );
  });
  // Multiplicity of root
  rozszerzonyGens.push(function () {
    var r = rand(-4, 4);
    var k = pick([2, 3]);
    var extraRoot = rand(-5, 5);
    while (extraRoot === r) extraRoot = rand(-5, 5);
    return makeQ('Wielomiany',
      'Pierwiastek $x = ' + r + '$ ma krotność $' + k + '$ w $W(x) = (x - ' + r + ')^{' + k + '}(x - ' + extraRoot + ')$. Ile razy wykres „dotyka" osi $x$ w $x = ' + r + '$?',
      k % 2 === 0 ? 'Dotyka (nie przecina) — krotność parzysta' : 'Przecina — krotność nieparzysta',
      [k % 2 === 0 ? 'Przecina — krotność parzysta' : 'Dotyka — krotność nieparzysta',
       k + ' razy przecina', 'Zawsze dotyka'],
      'Krotność parzysta → dotyka osi; krotność nieparzysta → przecina oś $x$ w danym pierwiastku.',
      'rozszerzony'
    );
  });
  // Horner scheme
  rozszerzonyGens.push(function () {
    var a = rand(1, 3); var b = rand(-4, 4); var c = rand(-6, 6); var d = rand(-8, 8);
    var x0 = rand(-3, 3);
    // p(x) = ax^3 + bx^2 + cx + d, p(x0) via Horner
    var val = ((a * x0 + b) * x0 + c) * x0 + d;
    return makeQ('Wielomiany',
      'Korzystając ze schematu Hornera oblicz $W(' + x0 + ')$ dla $W(x) = ' + a + 'x^3 + ' + b + 'x^2 + ' + c + 'x + ' + d + '$:',
      m('' + val),
      [m('' + (val + 1)), m('' + (val - 2)), m('' + (val + x0))],
      'Horner: $(((' + a + ') \\cdot ' + x0 + ' + ' + b + ') \\cdot ' + x0 + ' + ' + c + ') \\cdot ' + x0 + ' + ' + d + ' = ' + val + '$.',
      'rozszerzony'
    );
  });

  /* ── WEKTORY – dodatkowe ── */
  // 3D vector length
  rozszerzonyGens.push(function () {
    var x = rand(-5, 5); var y = rand(-5, 5); var z = rand(-5, 5);
    var len2 = x * x + y * y + z * z;
    var lenStr = formatSqrt(len2);
    return makeQ('Wektory',
      'Długość wektora $\\vec{v} = [' + x + ', ' + y + ', ' + z + ']$:',
      m(lenStr),
      [m(formatSqrt(len2 + 1)), m('' + (Math.abs(x) + Math.abs(y) + Math.abs(z))), m(formatSqrt(x * x + y * y))],
      '$|\\vec{v}| = \\sqrt{' + x + '^2 + ' + y + '^2 + ' + z + '^2} = \\sqrt{' + len2 + '} = ' + lenStr + '$.',
      'rozszerzony'
    );
  });
  // Dot product and angle (2D)
  rozszerzonyGens.push(function () {
    var triples = [
      { u: [1, 0], v: [0, 1], cos: 0, angle: '90°' },
      { u: [1, 1], v: [1, -1], cos: 0, angle: '90°' },
      { u: [1, 0], v: [1, 0], cos: 1, angle: '0°' },
      { u: [3, 4], v: [4, -3], cos: 0, angle: '90°' }
    ];
    var t = pick(triples);
    return makeQ('Wektory',
      'Iloczyn skalarny $[' + t.u[0] + ', ' + t.u[1] + '] \\cdot [' + t.v[0] + ', ' + t.v[1] + ']$:',
      m('' + (t.u[0] * t.v[0] + t.u[1] * t.v[1])),
      [m('' + (t.u[0] * t.v[0] + t.u[1] * t.v[1] + 1)), m('' + (t.u[0] + t.v[0])), m('' + ((t.u[0] - t.v[0]) * (t.u[1] - t.v[1])))],
      '$\\vec{u} \\cdot \\vec{v} = ' + t.u[0] + ' \\cdot ' + t.v[0] + ' + ' + t.u[1] + ' \\cdot ' + t.v[1] + ' = ' + (t.u[0] * t.v[0] + t.u[1] * t.v[1]) + '$ → wektory ' + (t.cos === 0 ? 'prostopadłe' : 'równoległe') + '.',
      'rozszerzony'
    );
  });
  // Collinear vectors check
  rozszerzonyGens.push(function () {
    var a = rand(1, 5); var b = rand(1, 5);
    var k = rand(2, 5);
    var u = [a, b]; var v = [a * k, b * k];
    return makeQ('Wektory',
      'Czy $\\vec{u} = [' + u[0] + ', ' + u[1] + ']$ i $\\vec{v} = [' + v[0] + ', ' + v[1] + ']$ są równoległe?',
      'Tak — $\\vec{v} = ' + k + ' \\vec{u}$',
      ['Nie, są prostopadłe', 'Nie, brak zależności liniowej', 'Tylko gdy długości równe'],
      '$\\frac{' + v[0] + '}{' + u[0] + '} = \\frac{' + v[1] + '}{' + u[1] + '} = ' + k + '$ → $\\vec{v} = ' + k + ' \\vec{u}$ → równoległe.',
      'rozszerzony'
    );
  });
  // Linear combination
  rozszerzonyGens.push(function () {
    var a = rand(1, 4); var b = rand(1, 4);
    var u = [rand(-3, 3), rand(-3, 3)];
    var v = [rand(-3, 3), rand(-3, 3)];
    var rx = a * u[0] + b * v[0];
    var ry = a * u[1] + b * v[1];
    return makeQ('Wektory',
      '$' + a + '[' + u[0] + ', ' + u[1] + '] + ' + b + '[' + v[0] + ', ' + v[1] + '] =$',
      m('[' + rx + ', ' + ry + ']'),
      [m('[' + (rx + 1) + ', ' + ry + ']'), m('[' + rx + ', ' + (ry + 1) + ']'), m('[' + (a * u[0]) + ', ' + (b * v[1]) + ']')],
      '$= [' + a + ' \\cdot ' + u[0] + ' + ' + b + ' \\cdot ' + v[0] + ', \\ ' + a + ' \\cdot ' + u[1] + ' + ' + b + ' \\cdot ' + v[1] + '] = [' + rx + ', ' + ry + ']$.',
      'rozszerzony'
    );
  });
  // Cross product z-component
  rozszerzonyGens.push(function () {
    var ax = rand(-3, 3); var ay = rand(-3, 3);
    var bx = rand(-3, 3); var by = rand(-3, 3);
    var cz = ax * by - ay * bx;
    return makeQ('Wektory',
      'Składowa $z$ iloczynu wektorowego $[' + ax + ', ' + ay + ', 0] \\times [' + bx + ', ' + by + ', 0]$:',
      m('' + cz),
      [m('' + (cz + 1)), m('' + (ax * bx + ay * by)), m('' + (ax * by + ay * bx))],
      '$z = ' + ax + ' \\cdot ' + by + ' - ' + ay + ' \\cdot ' + bx + ' = ' + cz + '$.',
      'rozszerzony'
    );
  });

  /* ── DOWODZENIE – dodatkowe pytania pojęciowe ── */
  rozszerzonyGens.push(function () {
    var types2 = [
      { q: 'Dowód bezpośredni polega na:', correct: 'Wyprowadzeniu tezy z założeń według kolejnych implikacji', d: ['Zaprzeczeniu tezy i doprowadzeniu do sprzeczności', 'Sprawdzeniu nieskończenie wielu przypadków', 'Złożeniu dwóch twierdzeń'], e: 'Bezpośredni: zakładamy hipotezę i krok po kroku wywodzimy wniosek.' },
      { q: 'Pełna metoda przez wyczerpanie przypadków wymaga:', correct: 'Sprawdzenia wszystkich możliwych przypadków', d: ['Tylko jednego ogólnego przypadku', 'Sprawdzenia największego przypadku', 'Indukcji matematycznej'], e: 'Rozróżniamy wszystkie możliwe sytuacje i dla każdej dowodzimy twierdzenie.' },
      { q: 'Aksjomat Pean: $n + 1 \\neq 0$ dla każdego $n \\in \\mathbb{N}$. Wynika stąd, że:', correct: '$0$ nie jest następnikiem żadnej liczby naturalnej', d: ['Każda l. naturalna ma następnik', '$\\mathbb{N}$ jest skończony', '$0 = 1$'], e: '$n+1$ jest następnikiem $n$; aksjomat mówi, że $0$ nie jest niczyjim następnikiem.' },
      { q: 'Co to jest tautologia?', correct: 'Zdanie logiczne prawdziwe przy każdym wartościowaniu zmiennych', d: ['Zdanie zawsze fałszywe', 'Zdanie zależne od kontekstu', 'Kwantyfikator szczegółowy'], e: 'Tautologia: formuła logiczna prawdziwa niezależnie od wartości zmiennych (np. $p \\lor \\neg p$).' },
      { q: 'Twierdzenie "Jeśli $n^2$ parzyste, to $n$ parzyste" najłatwiej udowodnić przez:', correct: 'Kontrapozycję: jeśli $n$ nieparzyste, to $n^2$ nieparzyste', d: ['Sprawdzenie dla $n = 2, 4, 6$', 'Bezpośredni rachunek kwadratowy', 'Aksjomaty Peana'], e: 'Kontrapozycja $p \\Rightarrow q \\equiv \\neg q \\Rightarrow \\neg p$: łatwiej pokazać, że nieparzyste $n$ daje nieparzyste $n^2$.' }
    ];
    var t = pick(types2);
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
