/* ================================================================
   TASKS DATA
   Each task: id, cat (0-9), diff (1-3), title, content, steps[], answer, hint
   ================================================================ */
const TASKS = [
/* ── LICZBY RZECZYWISTE (cat 0) ── */
{
  id:1, cat:0, diff:1,
  title:'Uproszczenie wyrażenia z potęgami',
  content:'Uprość wyrażenie: $\\dfrac{2^8 \\cdot 3^5}{2^5 \\cdot 3^3}$',
  hint:'Korzystaj z prawa $\\frac{a^m}{a^n}=a^{m-n}$ dla każdej podstawy osobno.',
  steps:[
    {col:0, text:'Dzielimy czynniki z tą samą podstawą oddzielnie: $\\dfrac{2^8}{2^5} \\cdot \\dfrac{3^5}{3^3}$'},
    {col:1, text:'Odejmujemy wykładniki: $2^{8-5} \\cdot 3^{5-3} = 2^3 \\cdot 3^2$'},
    {col:2, text:'Obliczamy wartości: $8 \\cdot 9 = 72$'},
  ],
  answer:'$72$'
},
{
  id:2, cat:0, diff:2,
  title:'Logarytm – wyznaczanie wartości',
  content:'Oblicz: $\\log_3 243 + \\log_2 \\frac{1}{8}$',
  hint:'$\\log_a b = c \\Leftrightarrow a^c = b$. Szukasz, do jakiej potęgi trzeba podnieść podstawę.',
  steps:[
    {col:0, text:'$\\log_3 243$: szukamy $c$ takie, że $3^c = 243 = 3^5$, więc $\\log_3 243 = 5$'},
    {col:1, text:'$\\log_2 \\frac{1}{8}$: $\\frac{1}{8}=2^{-3}$, więc $\\log_2 \\frac{1}{8} = -3$'},
    {col:2, text:'Suma: $5 + (-3) = 2$'},
  ],
  answer:'$2$'
},
{
  id:3, cat:0, diff:2,
  title:'Wartość bezwzględna – nierówność',
  content:'Rozwiąż nierówność: $|2x - 4| < 6$',
  hint:'$|A| < b \\Leftrightarrow -b < A < b$',
  steps:[
    {col:0, text:'Stosujemy definicję: $-6 < 2x - 4 < 6$'},
    {col:1, text:'Dodajemy 4 do wszystkich części: $-2 < 2x < 10$'},
    {col:2, text:'Dzielimy przez 2: $-1 < x < 5$'},
  ],
  answer:'$x \\in (-1, 5)$'
},
{
  id:4, cat:0, diff:3,
  title:'Pierwiastek z wyrażenia – uproszczenie',
  content:'Uprość: $\\dfrac{\\sqrt{75} - \\sqrt{12}}{\\sqrt{3}}$',
  hint:'Rozkładaj liczby pod pierwiastkiem: $75 = 25 \\cdot 3$, $12 = 4 \\cdot 3$.',
  steps:[
    {col:0, text:'$\\sqrt{75} = \\sqrt{25 \\cdot 3} = 5\\sqrt{3}$, $\\qquad \\sqrt{12} = \\sqrt{4 \\cdot 3} = 2\\sqrt{3}$'},
    {col:1, text:'Licznik: $5\\sqrt{3} - 2\\sqrt{3} = 3\\sqrt{3}$'},
    {col:2, text:'Dzielimy: $\\dfrac{3\\sqrt{3}}{\\sqrt{3}} = 3$'},
  ],
  answer:'$3$'
},
/* ── WYRAŻENIA ALGEBRAICZNE (cat 1) ── */
{
  id:5, cat:1, diff:1,
  title:'Wzory skróconego mnożenia – rozwinięcie',
  content:'Rozwiń i uprość: $(3x + 2)^2 - (3x - 2)^2$',
  hint:'Zastosuj wzory $(a+b)^2 = a^2+2ab+b^2$ i $(a-b)^2 = a^2-2ab+b^2$, a następnie odejmij.',
  steps:[
    {col:0, text:'$(3x+2)^2 = 9x^2 + 12x + 4$'},
    {col:1, text:'$(3x-2)^2 = 9x^2 - 12x + 4$'},
    {col:2, text:'Różnica: $(9x^2+12x+4) - (9x^2-12x+4) = 24x$'},
  ],
  answer:'$24x$'
},
{
  id:6, cat:1, diff:2,
  title:'Faktoryzacja wielomianu',
  content:'Rozłóż na czynniki: $x^3 - 4x^2 + 4x$',
  hint:'Wyciągnij wspólny czynnik $x$ przed nawias, następnie rozpoznaj wzór na kwadrat różnicy.',
  steps:[
    {col:0, text:'Wyciągamy $x$: $x(x^2 - 4x + 4)$'},
    {col:1, text:'Rozpoznajemy wzór: $x^2-4x+4 = (x-2)^2$'},
    {col:2, text:'Wynik końcowy: $x(x-2)^2$'},
  ],
  answer:'$x(x-2)^2$'
},
{
  id:7, cat:1, diff:2,
  title:'Upraszczanie ułamka algebraicznego',
  content:'Uprość: $\\dfrac{x^2 - 9}{x^2 + 5x + 6}$',
  hint:'Licznik to różnica kwadratów, mianownik to trójmian kwadratowy do rozłożenia.',
  steps:[
    {col:0, text:'Licznik: $x^2-9 = (x-3)(x+3)$'},
    {col:1, text:'Mianownik: szukamy liczb, których suma $=5$, iloczyn $=6$: to $2$ i $3$. Stąd $(x+2)(x+3)$'},
    {col:2, text:'Skracamy: $\\dfrac{(x-3)(x+3)}{(x+2)(x+3)} = \\dfrac{x-3}{x+2}$\\quad($x \\neq -3, x\\neq -2$)'},
  ],
  answer:'$\\dfrac{x-3}{x+2}$\\quad$(x \\neq -3,\\,-2)$'
},
{
  id:8, cat:1, diff:3,
  title:'Schemat Hornera – wartość wielomianu',
  content:'Oblicz $W(3)$ dla $W(x) = 2x^3 - 5x^2 + x - 4$ metodą Hornera.',
  hint:'Schemat Hornera: zacznij od współczynnika przy $x^3$, kolejne wyniki mnóż przez $a$ i dodaj kolejny współczynnik.',
  steps:[
    {col:0, text:'Współczynniki: $[2, -5, 1, -4]$, obliczamy dla $x=3$'},
    {col:1, text:'$2 \\to 2\\cdot 3 + (-5) = 1 \\to 1\\cdot 3 + 1 = 4 \\to 4\\cdot 3 + (-4) = 8$'},
    {col:2, text:'$W(3) = 8$. Sprawdzenie: $2\\cdot 27 - 5\\cdot 9 + 3 - 4 = 54-45+3-4=8$ ✓'},
  ],
  answer:'$W(3) = 8$'
},
/* ── RÓWNANIA I NIERÓWNOŚCI (cat 2) ── */
{
  id:9, cat:2, diff:1,
  title:'Równanie kwadratowe przez deltę',
  content:'Rozwiąż równanie: $2x^2 - 7x + 3 = 0$',
  hint:'Wzory Viète\'a to szybki sposób sprawdzenia: $x_1+x_2 = \\frac{b}{a}$, $x_1 x_2 = \\frac{c}{a}$.',
  steps:[
    {col:0, text:'$a=2,\\;b=-7,\\;c=3$. Wyróżnik: $\\Delta = (-7)^2 - 4\\cdot 2\\cdot 3 = 49 - 24 = 25$'},
    {col:1, text:'$\\sqrt{\\Delta}=5$. $x_{1,2} = \\dfrac{7 \\pm 5}{4}$'},
    {col:2, text:'$x_1 = \\dfrac{12}{4} = 3$, $\\quad x_2 = \\dfrac{2}{4} = \\dfrac{1}{2}$'},
  ],
  answer:'$x_1 = 3, \\quad x_2 = \\dfrac{1}{2}$'
},
{
  id:10, cat:2, diff:2,
  title:'Układ równań – metoda podstawiania',
  content:'Rozwiąż układ: $\\begin{cases} 2x + y = 7 \\\\ x - 3y = -1 \\end{cases}$',
  hint:'Z pierwszego równania wyraź $y$ przez $x$, następnie wstaw do drugiego.',
  steps:[
    {col:0, text:'Z I równania: $y = 7 - 2x$'},
    {col:1, text:'Podstawiamy do II: $x - 3(7-2x) = -1 \\Rightarrow x - 21 + 6x = -1 \\Rightarrow 7x = 20 \\Rightarrow x = \\frac{20}{7}$'},
    {col:2, text:'$y = 7 - 2\\cdot\\frac{20}{7} = 7 - \\frac{40}{7} = \\frac{9}{7}$. Sprawdzenie: $2\\cdot\\frac{20}{7}+\\frac{9}{7}=\\frac{49}{7}=7$ ✓'},
  ],
  answer:'$x = \\dfrac{20}{7},\\quad y = \\dfrac{9}{7}$'
},
{
  id:11, cat:2, diff:2,
  title:'Nierówność kwadratowa',
  content:'Rozwiąż nierówność: $x^2 - 5x + 6 \\leq 0$',
  hint:'Znajdź miejsca zerowe, narysuj parabolę i odczytaj, gdzie jest „poniżej osi $OX$".',
  steps:[
    {col:0, text:'Miejsca zerowe: $x^2-5x+6=0 \\Rightarrow (x-2)(x-3)=0 \\Rightarrow x_1=2,\\;x_2=3$'},
    {col:1, text:'Parabola skierowana w górę ($a=1>0$) – jest ≤ 0 między miejscami zerowymi'},
    {col:2, text:'Rozwiązanie: $x \\in [2, 3]$'},
  ],
  answer:'$x \\in [2, 3]$'
},
{
  id:12, cat:2, diff:3,
  title:'Równanie z parametrem',
  content:'Dla jakich wartości $m$ równanie $x^2 + mx + m + 3 = 0$ ma dwa różne pierwiastki rzeczywiste?',
  hint:'Warunek: $\\Delta > 0$. Wyróżnik zależy od parametru $m$.',
  steps:[
    {col:0, text:'$\\Delta = m^2 - 4(m+3) = m^2 - 4m - 12$'},
    {col:1, text:'Warunek $\\Delta > 0$: $m^2 - 4m - 12 > 0 \\Rightarrow (m-6)(m+2) > 0$'},
    {col:2, text:'Parabola od góry: wynik dodatni dla $m < -2$ lub $m > 6$'},
  ],
  answer:'$m \\in (-\\infty,-2) \\cup (6,+\\infty)$'
},
/* ── FUNKCJE (cat 3) ── */
{
  id:13, cat:3, diff:1,
  title:'Dziedzina funkcji z ułamkiem',
  content:'Wyznacz dziedzinę funkcji: $f(x) = \\dfrac{2x+1}{x^2 - 4}$',
  hint:'Mianownik nie może być zerem. Rozłóż $x^2-4$ na czynniki.',
  steps:[
    {col:0, text:'Warunek: $x^2 - 4 \\neq 0$'},
    {col:1, text:'$x^2 - 4 = (x-2)(x+2) = 0 \\Rightarrow x = \\pm 2$'},
    {col:2, text:'Dziedzina: $\\mathbb{R} \\setminus \\{-2, 2\\}$'},
  ],
  answer:'$D_f = \\mathbb{R} \\setminus \\{-2,\\,2\\}$'
},
{
  id:14, cat:3, diff:2,
  title:'Monotoniczność i ekstrema',
  content:'Funkcja $f(x) = -x^2 + 4x - 3$. Wyznacz przedziały monotoniczności i podaj maksimum.',
  hint:'Wierzchołek paraboli to punkt ekstremum. $p = -\\frac{b}{2a}$.',
  steps:[
    {col:0, text:'$a=-1<0$, więc parabola skierowana w dół. Wierzchołek: $p = -\\frac{4}{2(-1)} = 2$, $q = -(4)+8-3=1$'},
    {col:1, text:'$f$ rośnie dla $x < 2$ (wzrost do maksimum), maleje dla $x > 2$'},
    {col:2, text:'Maksimum: $f(2) = 1$'},
  ],
  answer:'Rośnie na $(-\\infty, 2)$, maleje na $(2,+\\infty)$. Maksimum $= 1$ w $x=2$.'
},
{
  id:15, cat:3, diff:2,
  title:'Funkcja wykładnicza – równanie',
  content:'Rozwiąż równanie: $4^x = 8^{x-1}$',
  hint:'Sprowadź obie strony do tej samej podstawy (2).',
  steps:[
    {col:0, text:'$4^x = (2^2)^x = 2^{2x}$, $\\quad 8^{x-1} = (2^3)^{x-1} = 2^{3(x-1)}$'},
    {col:1, text:'Równanie: $2^{2x} = 2^{3x-3}$, więc $2x = 3x - 3$'},
    {col:2, text:'$x = 3$'},
  ],
  answer:'$x = 3$'
},
{
  id:16, cat:3, diff:3,
  title:'Złożenie funkcji',
  content:'Dane: $f(x) = 2x+1$, $g(x) = x^2-3$. Oblicz $f(g(2))$ i $g(f(-1))$.',
  hint:'Złożenie $f(g(x))$: najpierw oblicz $g(x)$, wynik wstaw do $f$.',
  steps:[
    {col:0, text:'$g(2) = 4-3 = 1$, więc $f(g(2)) = f(1) = 2\\cdot 1 + 1 = 3$'},
    {col:1, text:'$f(-1) = 2\\cdot(-1)+1 = -1$, więc $g(f(-1)) = g(-1) = (-1)^2-3 = -2$'},
    {col:2, text:'Wyniki: $f(g(2))=3,\\quad g(f(-1))=-2$'},
  ],
  answer:'$f(g(2)) = 3$, $\\quad g(f(-1)) = -2$'
},
/* ── FUNKCJA KWADRATOWA (cat 4) ── */
{
  id:17, cat:4, diff:1,
  title:'Postać kanoniczna funkcji kwadratowej',
  content:'Zapisz $f(x) = x^2 - 6x + 5$ w postaci kanonicznej i podaj wierzchołek.',
  hint:'Uzupełniaj do pełnego kwadratu: $x^2-6x = (x-3)^2 - 9$',
  steps:[
    {col:0, text:'$f(x) = x^2 - 6x + 5 = (x^2 - 6x + 9) - 9 + 5$'},
    {col:1, text:'$= (x-3)^2 - 4$'},
    {col:2, text:'Wierzchołek: $W = (3, -4)$. Parabola otwarta w górę, minimum $=-4$'},
  ],
  answer:'$f(x) = (x-3)^2 - 4$, wierzchołek $W(3,-4)$'
},
{
  id:18, cat:4, diff:2,
  title:'Postać iloczynowa – miejsca zerowe',
  content:'Zapisz $f(x) = 2x^2 - 3x - 2$ w postaci iloczynowej.',
  hint:'Wyznacz miejsca zerowe przez deltę, potem użyj wzoru $f(x) = a(x-x_1)(x-x_2)$.',
  steps:[
    {col:0, text:'$\\Delta = 9 + 16 = 25$, $\\;\\sqrt{\\Delta}=5$. $x_1 = \\frac{3+5}{4}=2$, $x_2 = \\frac{3-5}{4}=-\\frac{1}{2}$'},
    {col:1, text:'Postać iloczynowa: $f(x) = 2(x-2)\\left(x+\\frac{1}{2}\\right)$'},
    {col:2, text:'Lub: $2(x-2)\\cdot\\frac{1}{2}(2x+1) = (x-2)(2x+1)$'},
  ],
  answer:'$f(x) = (x-2)(2x+1)$'
},
{
  id:19, cat:4, diff:3,
  title:'Równanie kwadratowe z parametrem – żadne rozwiązanie',
  content:'Dla jakich $k$ równanie $kx^2 - 2x + k = 0$ nie ma rozwiązań rzeczywistych?',
  hint:'Jeśli $k = 0$, to równanie liniowe (zawsze ma rozwiązanie). Dla $k \\neq 0$ sprawdź $\\Delta < 0$.',
  steps:[
    {col:0, text:'Dla $k = 0$: $-2x = 0 \\Rightarrow x=0$ — ma rozwiązanie, więc $k=0$ nie działa'},
    {col:1, text:'Dla $k \\neq 0$: $\\Delta = 4 - 4k^2 < 0 \\Rightarrow k^2 > 1 \\Rightarrow |k| > 1$'},
    {col:2, text:'Stąd $k < -1$ lub $k > 1$'},
  ],
  answer:'$k \\in (-\\infty,-1) \\cup (1,+\\infty)$'
},
/* ── CIĄGI (cat 5) ── */
{
  id:20, cat:5, diff:1,
  title:'N-ty wyraz ciągu arytmetycznego',
  content:'Ciąg arytmetyczny: $a_1 = 3$, $a_2 = 7$. Wyznacz $a_{20}$.',
  hint:'Znajdź różnicę $r$, następnie użyj wzoru $a_n = a_1 + (n-1)r$.',
  steps:[
    {col:0, text:'Różnica: $r = a_2 - a_1 = 7 - 3 = 4$'},
    {col:1, text:'$a_{20} = 3 + 19 \\cdot 4 = 3 + 76 = 79$'},
    {col:2, text:'Sprawdzenie: $a_{20} = a_1 + 19r = 3 + 76 = 79$ ✓'},
  ],
  answer:'$a_{20} = 79$'
},
{
  id:21, cat:5, diff:2,
  title:'Suma n wyrazów ciągu arytmetycznego',
  content:'Ile wynosi suma pierwszych 50 wyrazów ciągu arytmetycznego $1, 3, 5, 7, \\ldots$?',
  hint:'$S_n = \\frac{n(a_1+a_n)}{2}$. Wyznacz $a_{50}$, następnie oblicz sumę.',
  steps:[
    {col:0, text:'$a_1 = 1$, $r = 2$. $a_{50} = 1 + 49\\cdot 2 = 99$'},
    {col:1, text:'$S_{50} = \\dfrac{50\\cdot(1+99)}{2} = 25 \\cdot 100 = 2500$'},
    {col:2, text:'(To jest suma pierwszych 50 liczb nieparzystych: $S = n^2 = 50^2 = 2500$ ✓)'},
  ],
  answer:'$S_{50} = 2500$'
},
{
  id:22, cat:5, diff:2,
  title:'Ciąg geometryczny – wyraz',
  content:'Ciąg geometryczny: $a_1 = 5$, $a_4 = 40$. Wyznacz iloraz $q$ i $a_7$.',
  hint:'$a_4 = a_1 \\cdot q^3$, więc $q^3 = \\frac{a_4}{a_1}$.',
  steps:[
    {col:0, text:'$a_4 = a_1 q^3 \\Rightarrow 40 = 5q^3 \\Rightarrow q^3 = 8 \\Rightarrow q = 2$'},
    {col:1, text:'$a_7 = a_1 q^6 = 5 \\cdot 2^6 = 5 \\cdot 64 = 320$'},
    {col:2, text:'Sprawdzenie: $a_7 = a_4 \\cdot q^3 = 40 \\cdot 8 = 320$ ✓'},
  ],
  answer:'$q = 2$, $\\quad a_7 = 320$'
},
{
  id:23, cat:5, diff:3,
  title:'Procent składany',
  content:'Wpłacono 10 000 zł z oprocentowaniem 5% rocznie. Po ilu pełnych latach kapitał przekroczy 12 000 zł?',
  hint:'Kapitał po $n$ latach: $K_n = K_0 \\cdot (1{,}05)^n$. Szukasz najmniejszego $n$.',
  steps:[
    {col:0, text:'$K_n = 10000 \\cdot 1{,}05^n > 12000 \\Rightarrow 1{,}05^n > 1{,}2$'},
    {col:1, text:'$1{,}05^3 = 1{,}1576$, $\\;1{,}05^4 = 1{,}2155 > 1{,}2$'},
    {col:2, text:'Minimalne $n = 4$ (po 4 latach: $10000 \\cdot 1{,}2155 \\approx 12155$ zł)'},
  ],
  answer:'Po $n = 4$ pełnych latach'
},
/* ── TRYGONOMETRIA (cat 6) ── */
{
  id:24, cat:6, diff:1,
  title:'Kąty szczególne – obliczenia',
  content:'Oblicz dokładnie: $\\sin 30° \\cdot \\cos 60° + \\cos 30° \\cdot \\sin 60°$',
  hint:'To jest wzór na sinus sumy kątów: $\\sin(\\alpha+\\beta) = \\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta$.',
  steps:[
    {col:0, text:'$\\sin 30° = \\tfrac{1}{2}$, $\\;\\cos 60° = \\tfrac{1}{2}$, $\\;\\cos 30° = \\tfrac{\\sqrt{3}}{2}$, $\\;\\sin 60° = \\tfrac{\\sqrt{3}}{2}$'},
    {col:1, text:'$\\tfrac{1}{2}\\cdot\\tfrac{1}{2} + \\tfrac{\\sqrt{3}}{2}\\cdot\\tfrac{\\sqrt{3}}{2} = \\tfrac{1}{4} + \\tfrac{3}{4} = 1$'},
    {col:2, text:'Alternatywnie: $\\sin(30°+60°) = \\sin 90° = 1$ ✓'},
  ],
  answer:'$1$'
},
{
  id:25, cat:6, diff:2,
  title:'Twierdzenie cosinusów – obliczenie boku',
  content:'Trójkąt $ABC$: $a=7$, $b=5$, $\\angle C = 60°$. Oblicz długość boku $c$.',
  hint:'Twierdzenie cosinusów: $c^2 = a^2 + b^2 - 2ab\\cos C$.',
  steps:[
    {col:0, text:'$c^2 = 7^2 + 5^2 - 2\\cdot 7\\cdot 5 \\cdot \\cos 60°$'},
    {col:1, text:'$= 49 + 25 - 70 \\cdot \\tfrac{1}{2} = 74 - 35 = 39$'},
    {col:2, text:'$c = \\sqrt{39}$'},
  ],
  answer:'$c = \\sqrt{39}$'
},
{
  id:26, cat:6, diff:3,
  title:'Równanie trygonometryczne',
  content:'Rozwiąż dla $x \\in [0°, 360°)$: $2\\sin^2 x - \\sin x - 1 = 0$',
  hint:'Traktuj $\\sin x = t$ i rozwiąż równanie kwadratowe, pamiętając, że $t \\in [-1,1]$.',
  steps:[
    {col:0, text:'Podstawiamy $t = \\sin x$: $2t^2 - t - 1 = 0 \\Rightarrow (2t+1)(t-1)=0$'},
    {col:1, text:'$t = 1$: $\\sin x = 1 \\Rightarrow x = 90°$. $t = -\\tfrac{1}{2}$: $\\sin x = -\\tfrac{1}{2} \\Rightarrow x = 210°$ lub $x = 330°$'},
    {col:2, text:'Wszystkie rozwiązania: $x \\in \\{90°, 210°, 330°\\}$'},
  ],
  answer:'$x \\in \\{90°,\\;210°,\\;330°\\}$'
},
/* ── PLANIMETRIA (cat 7) ── */
{
  id:27, cat:7, diff:1,
  title:'Pole i obwód prostokąta',
  content:'Prostokąt ma przekątną $d = 10$ cm i jeden bok $a = 6$ cm. Oblicz pole i obwód.',
  hint:'Z twierdzenia Pitagorasa wyznacz drugi bok $b$, następnie oblicz pole i obwód.',
  steps:[
    {col:0, text:'$b = \\sqrt{d^2 - a^2} = \\sqrt{100-36} = \\sqrt{64} = 8$ cm'},
    {col:1, text:'Pole: $P = ab = 6\\cdot 8 = 48$ cm²'},
    {col:2, text:'Obwód: $L = 2(a+b) = 2\\cdot 14 = 28$ cm'},
  ],
  answer:'$P = 48\\text{ cm}^2$, $\\quad L = 28\\text{ cm}$'
},
{
  id:28, cat:7, diff:2,
  title:'Trójkąt równoboczny – wysokość i pole',
  content:'Trójkąt równoboczny o boku $a = 8$ cm. Oblicz wysokość i pole.',
  hint:'Wysokość trójkąta równobocznego dzieli go na dwa trójkąty prostokątne.',
  steps:[
    {col:0, text:'Wysokość: $h = \\sqrt{a^2 - \\left(\\tfrac{a}{2}\\right)^2} = \\sqrt{64-16} = \\sqrt{48} = 4\\sqrt{3}$ cm'},
    {col:1, text:'Pole: $P = \\dfrac{ah}{2} = \\dfrac{8 \\cdot 4\\sqrt{3}}{2} = 16\\sqrt{3}$ cm²'},
    {col:2, text:'Wzór skrócony: $P = \\dfrac{a^2\\sqrt{3}}{4} = \\dfrac{64\\sqrt{3}}{4} = 16\\sqrt{3}$ cm² ✓'},
  ],
  answer:'$h = 4\\sqrt{3}$ cm, $\\quad P = 16\\sqrt{3}$ cm²'
},
{
  id:29, cat:7, diff:3,
  title:'Okrąg wpisany w trójkąt prostokątny',
  content:'Trójkąt prostokątny o przyprostokątnych $a=8$ i $b=6$. Oblicz promień okręgu wpisanego.',
  hint:'$r = \\frac{P}{s}$, gdzie $s = \\frac{a+b+c}{2}$ (półobwód), $P$ — pole trójkąta.',
  steps:[
    {col:0, text:'$c = \\sqrt{64+36} = 10$. Pole: $P = \\frac{8\\cdot 6}{2} = 24$'},
    {col:1, text:'Półobwód: $s = \\frac{8+6+10}{2} = 12$'},
    {col:2, text:'$r = \\frac{P}{s} = \\frac{24}{12} = 2$. Wzór ogólny dla trójk. prost.: $r = \\frac{a+b-c}{2} = \\frac{8+6-10}{2}=2$ ✓'},
  ],
  answer:'$r = 2$'
},
/* ── STEREOMETRIA (cat 8) ── */
{
  id:30, cat:8, diff:1,
  title:'Objętość walca',
  content:'Walec o podstawie z okrzymu o obwodzie $12\\pi$ cm i wysokości $h=10$ cm. Oblicz objętość.',
  hint:'Z obwodu podstawy wyznacz promień: $2\\pi r = 12\\pi$.',
  steps:[
    {col:0, text:'Obwód podstawy: $2\\pi r = 12\\pi \\Rightarrow r = 6$ cm'},
    {col:1, text:'Objętość: $V = \\pi r^2 h = \\pi \\cdot 36 \\cdot 10 = 360\\pi$ cm³'},
    {col:2, text:'$360\\pi \\approx 1130.97$ cm³'},
  ],
  answer:'$V = 360\\pi$ cm³'
},
{
  id:31, cat:8, diff:2,
  title:'Ostrosłup prawidłowy 4-kątny',
  content:'Ostrosłup prawidłowy czworokątny ma podstawę o boku $a=6$ i wysokość $H=4$. Oblicz objętość i długość krawędzi bocznej.',
  hint:'Krawędź boczna: odległość od wierzchołka do narożnika podstawy. Przekątna podstawy to $a\\sqrt{2}$.',
  steps:[
    {col:0, text:'$V = \\tfrac{1}{3} P_p \\cdot H = \\tfrac{1}{3}\\cdot 36 \\cdot 4 = 48$ cm³'},
    {col:1, text:'Środek podstawy → narożnik: $\\frac{a\\sqrt{2}}{2} = 3\\sqrt{2}$'},
    {col:2, text:'Krawędź boczna: $l = \\sqrt{H^2+(3\\sqrt{2})^2} = \\sqrt{16+18}=\\sqrt{34}$ cm'},
  ],
  answer:'$V = 48$ cm³, $\\quad l = \\sqrt{34}$ cm'
},
{
  id:32, cat:8, diff:3,
  title:'Przekątna prostopadłościanu',
  content:'Prostopadłościan $4 \\times 3 \\times 2$. Oblicz długość przekątnej bryły i wskazanych kąt między przekątną a podstawą.',
  hint:'Przekątna bryły: $d = \\sqrt{a^2+b^2+c^2}$. Kąt z podstawą wynika z trójkąta z podstawą (przekątnością).',
  steps:[
    {col:0, text:'Przekątna: $d = \\sqrt{16+9+4} = \\sqrt{29}$'},
    {col:1, text:'Przekątna podstawy: $d_0 = \\sqrt{a^2+b^2} = \\sqrt{25} = 5$'},
    {col:2, text:'Kąt z podstawą $\\alpha$: $\\tan\\alpha = \\frac{c}{d_0} = \\frac{2}{5}$, więc $\\alpha = \\arctan\\frac{2}{5} \\approx 21{,}8°$'},
  ],
  answer:'$d = \\sqrt{29}$, $\\quad \\alpha = \\arctan\\frac{2}{5}$'
},
/* ── STATYSTYKA I PRAWDOPODOBIEŃSTWO (cat 9) ── */
{
  id:33, cat:9, diff:1,
  title:'Kombinacje – wybór komitetu',
  content:'Z 10 osób wybieramy 3-osobowy komitet. Na ile sposobów?',
  hint:'Kolejność nie ma znaczenia, więc stosujemy kombinacje: $\\binom{n}{k} = \\frac{n!}{k!(n-k)!}$.',
  steps:[
    {col:0, text:'$\\binom{10}{3} = \\dfrac{10!}{3!\\cdot 7!} = \\dfrac{10\\cdot 9\\cdot 8}{3\\cdot 2\\cdot 1}$'},
    {col:1, text:'$= \\dfrac{720}{6} = 120$'},
    {col:2, text:'Jest 120 różnych 3-osobowych komitetów.'},
  ],
  answer:'$120$ sposobów'
},
{
  id:34, cat:9, diff:2,
  title:'Prawdopodobieństwo warunkowe',
  content:'W urnie: 4 białe i 6 czarnych kul. Losujemy 2 bez zwracania. P(obie białe)?',
  hint:'Prawdopodobieństwo klasyczne: $P = \\frac{|A|}{|\\Omega|}$. Liczba sposobów wyboru 2 z 10 to $\\binom{10}{2}$.',
  steps:[
    {col:0, text:'$|\\Omega| = \\binom{10}{2} = 45$ (wybór 2 z 10)'},
    {col:1, text:'$|A| = \\binom{4}{2} = 6$ (wybór 2 białych z 4)'},
    {col:2, text:'$P = \\dfrac{6}{45} = \\dfrac{2}{15}$'},
  ],
  answer:'$P = \\dfrac{2}{15}$'
},
{
  id:35, cat:9, diff:3,
  title:'Średnia, mediana, odchylenie',
  content:'Dane: $3, 7, 7, 8, 10, 14$. Oblicz średnią arytmetyczną, medianę i odchylenie standardowe.',
  hint:'Mediana to średnia dwóch środkowych wyrazów (dla parzystej liczby danych). Odch. std.: $\\sigma = \\sqrt{\\frac{\\sum(x_i-\\bar{x})^2}{n}}$.',
  steps:[
    {col:0, text:'$\\bar{x} = \\dfrac{3+7+7+8+10+14}{6} = \\dfrac{49}{6} \\approx 8{,}17$. Mediana: $\\dfrac{7+8}{2}=7{,}5$'},
    {col:1, text:'Odchylenia kwadratowe: $(3-8{,}17)^2\\approx 26{,}7$; $(7-8{,}17)^2\\approx 1{,}4$; $(7-8{,}17)^2\\approx 1{,}4$; $(8-8{,}17)^2\\approx 0{,}03$; $(10-8{,}17)^2\\approx 3{,}35$; $(14-8{,}17)^2\\approx 34$'},
    {col:2, text:'Suma $\\approx 66{,}9$. $\\sigma = \\sqrt{66{,}9/6} \\approx \\sqrt{11{,}15} \\approx 3{,}34$'},
  ],
  answer:'$\\bar{x} = \\frac{49}{6} \\approx 8{,}17$, $\\;$ mediana $= 7{,}5$, $\\;\\sigma \\approx 3{,}34$'
},
];

/* ================================================================
   UI LOGIC
   ================================================================ */
var currentFilter = 'all';
var onlyBookmarked = false;
var onlyUnsolved = false;
var onlyWithNote = false;
var diffFilter = 0;  // 0 = all, 1/2/3 = only that difficulty
var catNames = ['Liczby','Algebra','Równania','Funkcje','Fk. Kwadr.','Ciągi','Trygonom.','Planimetria','Stereometria','Statystyka'];
var catColors = ['cat-0','cat-1','cat-2','cat-3','cat-4','cat-5','cat-6','cat-7','cat-8','cat-9'];
var diffColors = [null,'#10b981','#f59e0b','#ef4444'];
var diffLabels = [null,'Łatwe','Średnie','Trudne'];
var solvedIds = loadSet('zadaniaSolvedIds');
var bookmarkedIds = loadSet('zadaniaBookmarkedIds');

function normalizeText(v){
  return (v || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g,'');
}

function loadSet(key){
  try{
    var raw = localStorage.getItem(key);
    if(!raw) return new Set();
    return new Set(JSON.parse(raw));
  }catch(e){
    return new Set();
  }
}

function saveSet(key, setObj){
  localStorage.setItem(key, JSON.stringify(Array.from(setObj)));
}

function isSolved(id){ return solvedIds.has(id); }
function isBookmarked(id){ return bookmarkedIds.has(id); }

function buildGrid() {
  var grid = document.getElementById('tasksGrid');
  grid.innerHTML = TASKS.map(function(t) {
    var starsHtml = '';
    for(var i=1;i<=3;i++) starsHtml+='<i class="fa-'+(i<=t.diff?'solid':'regular')+' fa-star diff-star'+(i>t.diff?' empty':'')+'" style="font-size:.75rem"></i>';
    var stepsHtml = t.steps.map(function(s,idx){
      return '<div class="step-row">'+
        '<div class="step-num step-bg-'+idx+'">'+String.fromCharCode(9312+idx)+'</div>'+
        '<div class="text-gray-700 text-sm leading-relaxed flex-1">'+s.text+'</div>'+
      '</div>';
    }).join('');
    var searchPayload = normalizeText([t.title, t.content, t.hint, t.answer].join(' '));
    var solvedClass = isSolved(t.id) ? ' active-solved' : '';
    var solvedIcon = isSolved(t.id) ? 'fa-solid' : 'fa-regular';
    var solvedLabel = isSolved(t.id) ? 'Przerobione' : 'Oznacz jako przerobione';
    var bookClass = isBookmarked(t.id) ? ' active-book' : '';
    var bookIcon = isBookmarked(t.id) ? 'fa-solid' : 'fa-regular';
    var bookLabel = isBookmarked(t.id) ? 'W ulubionych' : 'Dodaj do ulubionych';
    return '<div class="task-card" data-cat="'+t.cat+'" data-id="'+t.id+'" data-title="'+normalizeText(t.title)+'" data-search="'+searchPayload.replace(/"/g,'&quot;')+'" data-diff="'+t.diff+'" data-solved="'+(isSolved(t.id)?'1':'0')+'" data-bookmarked="'+(isBookmarked(t.id)?'1':'0')+'" data-hasnote="'+(loadTaskNote(t.id)?'1':'0')+'">' +
      '<button class="toggle-btn" onclick="toggleCard(this)">'+
        '<div class="flex items-start gap-3 flex-1 text-left">'+
          '<div class="flex-shrink-0 w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 font-black text-sm mt-0.5">'+t.id+'</div>'+
          '<div class="flex-1 min-w-0">'+
            '<div class="flex flex-wrap items-center gap-2 mb-1">'+
              '<span class="tag '+catColors[t.cat]+'">'+catNames[t.cat]+'</span>'+
              '<span class="text-xs font-bold" style="color:'+diffColors[t.diff]+'">'+diffLabels[t.diff]+'</span>'+
              '<span class="flex gap-0.5">'+starsHtml+'</span>'+
            '</div>'+
            '<p class="font-bold text-gray-900 text-sm leading-snug">'+t.title+'</p>'+
          '</div>'+
        '</div>'+
        '<i class="fa-solid fa-chevron-down text-gray-400 chevron flex-shrink-0 ml-2"></i>'+
      '</button>'+
      '<div class="solution-panel">'+
        '<div class="p-5">'+
          '<div class="mb-4 bg-slate-50 rounded-xl p-4">'+
            '<p class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"><i class="fa-solid fa-circle-question mr-1 text-blue-500"></i>Zadanie</p>'+
            '<p class="text-gray-800 font-medium">'+t.content+'</p>'+
          '</div>'+
          '<div class="task-actions">'+
            '<button type="button" class="tiny-btn'+solvedClass+'" onclick="toggleSolved('+t.id+')"><i class="'+solvedIcon+' fa-circle-check"></i> '+solvedLabel+'</button>'+
            '<button type="button" class="tiny-btn'+bookClass+'" onclick="toggleBookmark('+t.id+')"><i class="'+bookIcon+' fa-bookmark"></i> '+bookLabel+'</button>'+
            '<button type="button" class="tiny-btn'+(loadTaskNote(t.id)?' active-note':'')+'" id="note-btn-'+t.id+'" onclick="toggleTaskNote('+t.id+')"><i class="fa-regular fa-note-sticky"></i> Notatka</button>'+
          '</div>'+
          (t.hint?'<div class="hint-box mb-4"><p class="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1"><i class="fa-solid fa-lightbulb mr-1"></i>Wskazówka</p><p class="text-amber-800 text-sm">'+t.hint+'</p></div>':'')+
          '<p class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"><i class="fa-solid fa-list-check mr-1 text-blue-500"></i>Rozwiązanie krok po kroku</p>'+
          '<div class="border border-gray-100 rounded-xl overflow-hidden">'+stepsHtml+'</div>'+
          '<div class="answer-box">'+
            '<p class="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1"><i class="fa-solid fa-check-circle mr-1"></i>Odpowiedź</p>'+
            '<p class="text-gray-900 font-bold">'+t.answer+'</p>'+
          '</div>'+
          '<div id="note-panel-'+t.id+'" style="display:none;margin-top:.75rem;">'+
            '<p class="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1"><i class="fa-regular fa-note-sticky mr-1"></i>Moja notatka do zadania</p>'+
            '<textarea id="note-ta-'+t.id+'" class="task-note-ta" rows="3" placeholder="Wpisz swoje notatki, obserwacje, trudności..." oninput="saveTaskNote('+t.id+')"></textarea>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</div>';
  }).join('');
  syncCounters();
  updateCount();
}

function toggleCard(btn) {
  var panel = btn.nextElementSibling;
  var isOpen = panel.classList.contains('open');
  panel.classList.toggle('open', !isOpen);
  btn.classList.toggle('expanded', !isOpen);
  if (!isOpen && window.renderMathInElement) {
    renderMathInElement(panel, { delimiters:[{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}], throwOnError:false });
  }
}

/* ===== Notatki do zadań ===== */
function loadTaskNote(id) {
  return localStorage.getItem('zadania-note-' + id) || '';
}

function saveTaskNote(id) {
  var ta = document.getElementById('note-ta-' + id);
  var val = ta ? ta.value : '';
  if (val.trim()) {
    localStorage.setItem('zadania-note-' + id, val);
  } else {
    localStorage.removeItem('zadania-note-' + id);
  }
  var noteBtn = document.getElementById('note-btn-' + id);
  if (noteBtn) noteBtn.classList.toggle('active-note', !!val.trim());
  var card = document.querySelector('.task-card[data-id="'+id+'"]');
  if (card) card.dataset.hasnote = val.trim() ? '1' : '0';
  syncCounters();
}

function toggleTaskNote(id) {
  var panel = document.getElementById('note-panel-' + id);
  if (!panel) return;
  var isOpen = panel.style.display !== 'none';
  panel.style.display = isOpen ? 'none' : '';
  if (!isOpen) {
    var ta = document.getElementById('note-ta-' + id);
    if (ta) {
      ta.value = loadTaskNote(id);
      setTimeout(function() { ta.focus(); }, 50);
    }
  }
}

function filterTasks(btn) {
  document.querySelectorAll('.filter-btn').forEach(function(b){ b.classList.remove('active'); });
  btn.classList.add('active');
  currentFilter = btn.dataset.filter;
  applyFilters();
}

function searchTasks(q) { applyFilters(q); }

function applyFilters(q) {
  q = normalizeText((q !== undefined ? q : document.getElementById('searchBox').value).trim());
  var mode = document.getElementById('sortMode').value;
  var visible = 0;
  var cards = Array.from(document.querySelectorAll('.task-card'));
  cards.forEach(function(card) {
    var catMatch = currentFilter === 'all' || card.dataset.cat === currentFilter;
    var searchMatch = !q || card.dataset.search.includes(q);
    var bookMatch = !onlyBookmarked || card.dataset.bookmarked === '1';
    var unsolvedMatch = !onlyUnsolved || card.dataset.solved !== '1';
    var noteMatch = !onlyWithNote || card.dataset.hasnote === '1';
    var diffMatch = !diffFilter || card.dataset.diff === String(diffFilter);
    var show = catMatch && searchMatch && bookMatch && unsolvedMatch && noteMatch && diffMatch;
    card.classList.toggle('hidden-task', !show);
    if (show) visible++;
  });

  var sortedVisible = cards.filter(function(c){ return !c.classList.contains('hidden-task'); });
  sortedVisible.sort(function(a,b){
    if(mode === 'easy') return Number(a.dataset.diff) - Number(b.dataset.diff) || Number(a.dataset.id) - Number(b.dataset.id);
    if(mode === 'hard') return Number(b.dataset.diff) - Number(a.dataset.diff) || Number(a.dataset.id) - Number(b.dataset.id);
    if(mode === 'az') return a.dataset.title.localeCompare(b.dataset.title, 'pl');
    return Number(a.dataset.id) - Number(b.dataset.id);
  });
  var grid = document.getElementById('tasksGrid');
  sortedVisible.forEach(function(card){ grid.appendChild(card); });

  document.getElementById('noResults').classList.toggle('hidden', visible > 0);
  updateCount(visible);
}

function updateCount(n) {
  if (n === undefined) n = document.querySelectorAll('.task-card:not(.hidden-task)').length;
  document.getElementById('taskCount').textContent = 'Pokazano ' + n + ' z ' + TASKS.length + ' zadań';
}

function expandAll() {
  document.querySelectorAll('.task-card:not(.hidden-task) .solution-panel').forEach(function(p){
    p.classList.add('open');
    p.previousElementSibling.classList.add('expanded');
    if (window.renderMathInElement) renderMathInElement(p, { delimiters:[{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}], throwOnError:false });
  });
}
function collapseAll() {
  document.querySelectorAll('.solution-panel').forEach(function(p){
    p.classList.remove('open');
    p.previousElementSibling.classList.remove('expanded');
  });
}

function syncCounters(){
  document.getElementById('solvedCount').textContent = solvedIds.size;
  document.getElementById('bookCount').textContent = bookmarkedIds.size;
  var nc = 0;
  for(var i=0;i<localStorage.length;i++){ if(localStorage.key(i)&&localStorage.key(i).indexOf('zadania-note-')===0) nc++; }
  var noteSpan = document.getElementById('noteFilterCount');
  if(noteSpan) noteSpan.textContent = nc;
  var noteBtn = document.getElementById('onlyNoteBtn');
  if(noteBtn) noteBtn.style.display = nc > 0 ? '' : 'none';
  syncDiffStats();
}

function toggleSolved(id){
  if(solvedIds.has(id)) solvedIds.delete(id); else solvedIds.add(id);
  saveSet('zadaniaSolvedIds', solvedIds);
  buildGrid();
  applyFilters();
}

function toggleBookmark(id){
  if(bookmarkedIds.has(id)) bookmarkedIds.delete(id); else bookmarkedIds.add(id);
  saveSet('zadaniaBookmarkedIds', bookmarkedIds);
  buildGrid();
  applyFilters();
}

function toggleOnlyBookmarked(){
  onlyBookmarked = !onlyBookmarked;
  var btn = document.getElementById('onlyBookBtn');
  btn.classList.toggle('active', onlyBookmarked);
  applyFilters();
}

function toggleOnlyUnsolved(){
  onlyUnsolved = !onlyUnsolved;
  var btn = document.getElementById('onlyUnsolvedBtn');
  btn.classList.toggle('active', onlyUnsolved);
  applyFilters();
}

function toggleOnlyNote(){
  onlyWithNote = !onlyWithNote;
  var btn = document.getElementById('onlyNoteBtn');
  btn.classList.toggle('active', onlyWithNote);
  applyFilters();
}

function toggleDiffFilter(d) {
  diffFilter = diffFilter === d ? 0 : d;
  [1,2,3].forEach(function(n) {
    var btn = document.getElementById('diffBtn'+n);
    if (btn) btn.classList.toggle('active', diffFilter === n);
  });
  applyFilters();
}

function syncDiffStats() {
  [1,2,3].forEach(function(d) {
    var total = TASKS.filter(function(t){ return t.diff === d; }).length;
    var solved = TASKS.filter(function(t){ return t.diff === d && isSolved(t.id); }).length;
    var ts = document.getElementById('diffTotal'+d);
    var ss = document.getElementById('diffSolved'+d);
    if (ts) ts.textContent = total;
    if (ss) ss.textContent = solved;
  });
}

function jumpToRandomTask(){
  var visibleCards = Array.from(document.querySelectorAll('.task-card:not(.hidden-task)'));
  if(!visibleCards.length) return;
  var card = visibleCards[Math.floor(Math.random()*visibleCards.length)];
  var btn = card.querySelector('.toggle-btn');
  if(!btn.classList.contains('expanded')) toggleCard(btn);
  card.scrollIntoView({behavior:'smooth', block:'center'});
  card.style.boxShadow = '0 0 0 3px rgba(59,130,246,.25), 0 8px 28px rgba(59,130,246,.16)';
  setTimeout(function(){ card.style.boxShadow=''; }, 1100);
}

function exportTaskNotes() {
  var keys = [];
  for (var i = 0; i < localStorage.length; i++) {
    var k = localStorage.key(i);
    if (k && k.indexOf('zadania-note-') === 0) keys.push(k);
  }
  if (keys.length === 0) { alert('Brak zapisanych notatek do eksportu.'); return; }
  keys.sort(function(a,b){ return parseInt(a.replace('zadania-note-',''),10) - parseInt(b.replace('zadania-note-',''),10); });
  var lines = ['MOJE NOTATKI DO ZADAŃ – Matematyka to Podstawa', '==================================================', ''];
  keys.forEach(function(k) {
    var id = parseInt(k.replace('zadania-note-',''),10);
    var t = TASKS.find(function(x){ return x.id === id; });
    var title = t ? '[Zadanie '+id+'] '+t.title : '[Zadanie '+id+']';
    lines.push(title);
    lines.push(localStorage.getItem(k) || '');
    lines.push('');
  });
  var blob = new Blob([lines.join('\n')], {type:'text/plain;charset=utf-8'});
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'notatki-zadania-' + new Date().toISOString().slice(0,10) + '.txt';
  a.click();
  URL.revokeObjectURL(a.href);
}

function toggleMobileNav(){
  document.getElementById('mobileNav').classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', function(){
  buildGrid();
  applyFilters('');
  document.addEventListener('keydown', function(e){
    if(e.key === '/' && document.activeElement !== document.getElementById('searchBox')){
      e.preventDefault();
      document.getElementById('searchBox').focus();
    }
    if(e.key === 'Escape' && document.activeElement === document.getElementById('searchBox')){
      document.getElementById('searchBox').value = '';
      applyFilters('');
    }
  });
  document.addEventListener('katex-rendered', function(){});
});