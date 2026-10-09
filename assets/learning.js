/* Shared, deterministic exercises. No eval, no network or account required. */
(function () {
  'use strict';
  const topics = ['Liczby rzeczywiste', 'Wyrażenia algebraiczne', 'Równania i nierówności', 'Funkcje', 'Funkcja kwadratowa', 'Ciągi', 'Trygonometria', 'Planimetria', 'Stereometria', 'Prawdopodobieństwo'];
  function rational(text) {
    const s = String(text).trim().replace(/−/g, '-').replace(/,/g, '.').replace(/\s/g, '');
    if (s.length > 80 || !/^[+-]?\d+(?:\.\d+)?(?:\/[+-]?\d+(?:\.\d+)?)?$/.test(s)) return null;
    function decimal(v) {
      const parts = v.split('.');
      return [BigInt(parts.join('')), 10n ** BigInt((parts[1] || '').length)];
    }
    const parts = s.split('/'), a = decimal(parts[0]), b = decimal(parts[1] || '1');
    if (b[0] === 0n) return null;
    return [a[0] * b[1], a[1] * b[0]];
  }
  function check(text, answer) {
    const a = rational(text), b = rational(answer);
    return a && b ? a[0] * b[1] === b[0] * a[1] : null;
  }
  function exercise(topic, seed) {
    const n = 2 + Math.abs(Math.trunc(seed || 0)) % 8;
    let q, answer, hint, steps;
    switch (Number(topic)) {
      case 0: q = `Oblicz $\\log_2 ${2 ** n}$.`; answer = String(n); hint = 'Szukasz wykładnika: do jakiej potęgi podnieść 2?'; steps = [`$2^{${n}}=${2 ** n}$`, `Z definicji logarytmu wynik to $${n}$.`]; break;
      case 1: q = `Oblicz wartość $(x+${n})^2-x^2$ dla $x=3$.`; answer = String(n * n + 6 * n); hint = 'Rozwiń kwadrat sumy lub podstaw x = 3 do całego wyrażenia.'; steps = [`$(x+${n})^2-x^2=${2*n}x+${n*n}$`, `Dla $x=3$: $${6*n}+${n*n}=${answer}$.`]; break;
      case 2: q = `Rozwiąż równanie $${n}x+3=${n*n+3}$. Podaj $x$.`; answer = String(n); hint = 'Odejmij 3 po obu stronach, potem podziel przez współczynnik przy x.'; steps = [`$${n}x=${n*n}$`, `$x=${n*n}/${n}=${n}$. Sprawdzenie: $${n}\\cdot${n}+3=${n*n+3}$.`]; break;
      case 3: q = `Dla $f(x)=-2x+${n}$ oblicz $f(3)$.`; answer = String(n-6); hint = 'Wstaw 3 w miejsce x. Pamiętaj o znaku minus.'; steps = [`$f(3)=-2\\cdot3+${n}=-6+${n}=${answer}$.`]; break;
      case 4: q = `Podaj współrzędną $x$ wierzchołka $f(x)=x^2-${2*n}x+1$.`; answer = String(n); hint = 'Użyj p = −b/(2a). Tutaj a = 1.'; steps = [`$a=1$, $b=-${2*n}$`, `$p=-\\frac{-${2*n}}{2\\cdot1}=${n}$.`]; break;
      case 5: q = `Ciąg arytmetyczny: $a_1=3$, $r=${n}$. Oblicz $a_5$.`; answer = String(3+4*n); hint = 'Od pierwszego do piątego wyrazu wykonujesz cztery kroki.'; steps = [`$a_5=a_1+(5-1)r=3+4\\cdot${n}=${answer}$.`]; break;
      case 6: q = `Kąt $\\alpha$ leży naprzeciw przyprostokątnej długości ${3*n}. Przeciwprostokątna ma długość ${5*n}. Oblicz $\\sin\\alpha$.`; answer = '3/5'; hint = 'Sinus kąta ostrego to stosunek boku naprzeciw kąta do przeciwprostokątnej.'; steps = [`$\\sin\\alpha=\\frac{${3*n}}{${5*n}}=\\frac{3}{5}$.`]; break;
      case 7: q = `Trójkąt ma podstawę ${2*n} i wysokość opuszczoną na tę podstawę ${n+1}. Oblicz pole.`; answer = String(n*(n+1)); hint = 'Pole trójkąta to połowa iloczynu podstawy i odpowiadającej jej wysokości.'; steps = [`$P=\\frac{1}{2}\\cdot${2*n}\\cdot${n+1}=${answer}$.`]; break;
      case 8: q = `Ostrosłup ma pole podstawy ${3*n} i wysokość ${n+1}. Oblicz objętość.`; answer = String(n*(n+1)); hint = 'Objętość ostrosłupa to jedna trzecia iloczynu pola podstawy i wysokości.'; steps = [`$V=\\frac{1}{3}\\cdot${3*n}\\cdot${n+1}=${answer}$.`]; break;
      default: q = `W urnie jest ${n} białych i ${n+2} czarnych kul. Każda kula jest jednakowo prawdopodobna. Losujemy jedną. Podaj prawdopodobieństwo białej.`; answer = `${n}/${2*n+2}`; hint = 'Podziel liczbę białych kul przez liczbę wszystkich kul.'; steps = [`$|\\Omega|=${n}+${n+2}=${2*n+2}$`, `$P(B)=\\frac{${n}}{${2*n+2}}$. Możesz podać równoważny ułamek.`];
    }
    return { id: `${topic}:${n}`, topic: Number(topic), q, answer, hint, steps };
  }
  function read(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch (_) { return fallback; } }
  function write(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch (_) { return false; } }
  function math(el) { if (window.renderMathInElement) window.renderMathInElement(el, { delimiters: [{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}], throwOnError:false }); }
  window.MathLearning = { topics, rational, check, exercise, read, write, math };
})();
