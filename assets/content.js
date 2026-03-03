/* ===== Matematyka to Podstawa – Kompendium wiedzy =====
   Każdy backslash LaTeX-a jest podwójnie ucieczkowiony (\\)
   aby JavaScript poprawnie przekazał je do KaTeX.
   ================================================== */

window.MATURA_TOPICS = {

/* ──────────────────────────────────────────────
   1. LICZBY RZECZYWISTE
   ────────────────────────────────────────────── */
"liczby-rzeczywiste": {
  title: "Liczby rzeczywiste",
  color: "blue",
  icon: "fa-hashtag",
  intro: "Liczby rzeczywiste to fundament całej matematyki maturalnej. Musisz sprawnie operować na zbiorach liczbowych, potęgach, pierwiastkach, logarytmach i wartości bezwzględnej. Na maturze pojawiają się co roku!",
  examFocus: [
    "Obliczanie wartości wyrażeń z potęgami i pierwiastkami",
    "Logarytmy – definicja, własności, zmiana podstawy",
    "Wartość bezwzględna – równania i nierówności",
    "Działania na zbiorach liczbowych (część wspólna, suma, dopełnienie)",
    "Przedziały liczbowe i ich zapis"
  ],
  theory: [
    {
      title: "Zbiory liczbowe",
      text: "Zbiory liczbowe tworzą hierarchię: liczby naturalne ($\\mathbb{N}$) zawierają się w całkowitych ($\\mathbb{Z}$), te w wymiernych ($\\mathbb{Q}$), a wymiernie wraz z niewymiernymi tworzą liczby rzeczywiste ($\\mathbb{R}$). Liczba wymierna to taka, którą można zapisać jako ułamek $\\frac{p}{q}$, gdzie $p \\in \\mathbb{Z}$, $q \\in \\mathbb{Z} \\setminus \\{0\\}$. Liczby niewymierne (np. $\\sqrt{2}$, $\\pi$, $e$) mają nieskończone rozwinięcie dziesiętne nieokresowe.",
      formulas: [
        { latex: "\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}", meaning: "Hierarchia zbiorów liczbowych" },
        { latex: "\\mathbb{R} = \\mathbb{Q} \\cup (\\mathbb{R} \\setminus \\mathbb{Q})", meaning: "Rzeczywiste = wymierne + niewymierne" }
      ]
    },
    {
      title: "Potęgi i ich własności",
      text: "Potęga to skrócony zapis wielokrotnego mnożenia. Dla $a \\neq 0$ mamy $a^0 = 1$. Potęga o wykładniku ujemnym oznacza odwrotność: $a^{-n} = \\frac{1}{a^n}$. Potęga o wykładniku wymiernym łączy potęgowanie z pierwiastkowaniem: $a^{\\frac{m}{n}} = \\sqrt[n]{a^m}$.",
      formulas: [
        { latex: "a^m \\cdot a^n = a^{m+n}", meaning: "Mnożenie potęg o tej samej podstawie" },
        { latex: "\\frac{a^m}{a^n} = a^{m-n}", meaning: "Dzielenie potęg o tej samej podstawie" },
        { latex: "(a^m)^n = a^{m \\cdot n}", meaning: "Potęga potęgi" },
        { latex: "(a \\cdot b)^n = a^n \\cdot b^n", meaning: "Potęga iloczynu" },
        { latex: "\\left(\\frac{a}{b}\\right)^n = \\frac{a^n}{b^n}", meaning: "Potęga ilorazu" },
        { latex: "a^{-n} = \\frac{1}{a^n}", meaning: "Potęga o wykładniku ujemnym" },
        { latex: "a^{\\frac{m}{n}} = \\sqrt[n]{a^m}", meaning: "Potęga o wykładniku wymiernym" }
      ]
    },
    {
      title: "Pierwiastki",
      text: "Pierwiastek $n$-tego stopnia z liczby $a$ to taka nieujemna liczba $b$, że $b^n = a$. Wyciąganie czynnika spod pierwiastka polega na rozkładzie liczby podpierwiastkowej na czynniki: $\\sqrt{50} = \\sqrt{25 \\cdot 2} = 5\\sqrt{2}$. Usuwanie niewymierności z mianownika: mnożymy licznik i mianownik przez odpowiedni wyrażenie.",
      formulas: [
        { latex: "\\sqrt[n]{a \\cdot b} = \\sqrt[n]{a} \\cdot \\sqrt[n]{b}", meaning: "Pierwiastek z iloczynu" },
        { latex: "\\sqrt[n]{\\frac{a}{b}} = \\frac{\\sqrt[n]{a}}{\\sqrt[n]{b}}", meaning: "Pierwiastek z ilorazu" },
        { latex: "\\sqrt[n]{a^m} = a^{\\frac{m}{n}}", meaning: "Związek pierwiastka z potęgą" },
        { latex: "\\frac{a}{\\sqrt{b}} = \\frac{a\\sqrt{b}}{b}", meaning: "Usuwanie niewymierności z mianownika" }
      ]
    },
    {
      title: "Logarytmy",
      text: "Logarytm $\\log_a b = c$ oznacza, że $a^c = b$, gdzie $a > 0$, $a \\neq 1$, $b > 0$. Na maturze kluczowe są: własności logarytmu (logarytm iloczynu, ilorazu, potęgi) oraz zmiana podstawy. Logarytm dziesiętny zapisujemy $\\log$ (lub $\\lg$), naturalny $\\ln$ (podstawa $e \\approx 2{,}718$).",
      formulas: [
        { latex: "\\log_a b = c \\iff a^c = b", meaning: "Definicja logarytmu" },
        { latex: "\\log_a (x \\cdot y) = \\log_a x + \\log_a y", meaning: "Logarytm iloczynu" },
        { latex: "\\log_a \\frac{x}{y} = \\log_a x - \\log_a y", meaning: "Logarytm ilorazu" },
        { latex: "\\log_a x^k = k \\cdot \\log_a x", meaning: "Logarytm potęgi" },
        { latex: "\\log_a b = \\frac{\\log_c b}{\\log_c a}", meaning: "Zmiana podstawy logarytmu" },
        { latex: "\\log_a a = 1, \\quad \\log_a 1 = 0", meaning: "Wartości szczególne" },
        { latex: "a^{\\log_a x} = x", meaning: "Odwrotność logarytmu i potęgi" }
      ]
    },
    {
      title: "Wartość bezwzględna",
      text: "Wartość bezwzględna $|x|$ oznacza odległość liczby $x$ od zera na osi liczbowej. Dla $x \\geq 0$: $|x| = x$, dla $x < 0$: $|x| = -x$. Równanie $|x| = a$ (dla $a > 0$) ma dwa rozwiązania: $x = a$ lub $x = -a$. Nierówność $|x| < a$ oznacza $-a < x < a$, a $|x| > a$ oznacza $x < -a$ lub $x > a$.",
      formulas: [
        { latex: "|x| = \\begin{cases} x & \\text{dla } x \\geq 0 \\\\ -x & \\text{dla } x < 0 \\end{cases}", meaning: "Definicja wartości bezwzględnej" },
        { latex: "|x| < a \\iff -a < x < a", meaning: "Nierówność z wartością bezwzględną (mniejszość)" },
        { latex: "|x| > a \\iff x < -a \\;\\lor\\; x > a", meaning: "Nierówność z wartością bezwzględną (większość)" }
      ]
    }
  ],
  mistakes: [
    "Zapominanie, że $a^0 = 1$ (dla $a \\neq 0$), a nie $0$",
    "Mylenie $a^{m+n}$ z $a^{m \\cdot n}$ – dodajemy wykładniki przy mnożeniu, mnożymy przy potęgowaniu",
    "Logarytm jest określony tylko dla argumentu dodatniego i podstawy dodatniej różnej od 1",
    "Przy wartości bezwzględnej trzeba rozpatrywać dwa przypadki – nie wolno pomijać przypadku ujemnego",
    "Błąd: $\\sqrt{a+b} \\neq \\sqrt{a} + \\sqrt{b}$ – pierwiastek z sumy to NIE suma pierwiastków"
  ],
  strategy: [
    "Rozpoznaj typ zadania: potęgi, logarytmy czy wartość bezwzględna",
    "Uprość wyrażenie krok po kroku, stosując właściwe wzory",
    "Przy logarytmach – sprowadź do jednej podstawy",
    "Przy wartości bezwzględnej – rozpisz na przypadki",
    "Sprawdź dziedzinę (logarytm, pierwiastek parzystego stopnia)"
  ],
  tasks: [
    {
      level: "łatwe",
      q: "Oblicz wartość wyrażenia $2^3 \\cdot 2^{-1} \\cdot 4^2$.",
      hint: "Zamień $4$ na $2^2$ i dodaj wykładniki.",
      steps: [
        { math: "$4^2 = (2^2)^2 = 2^4$", comment: "Najpierw zamieniamy 4 na potęgę dwójki (4 = 2²), a następnie stosujemy regułę potęga potęgi: mnożymy wykładniki (2·2 = 4)." },
        { math: "$2^3 \\cdot 2^{-1} \\cdot 2^4 = 2^{3+(-1)+4} = 2^6$", comment: "Teraz wszystkie podstawy są takie same (2), więc korzystamy z reguły mnożenia potęg o tej samej podstawie – dodajemy wykładniki: 3 + (−1) + 4 = 6." },
        { math: "$2^6 = 64$", comment: "Obliczamy końcową wartość potęgi: 2⁶ = 64." }
      ],
      answer: "$64$"
    },
    {
      level: "łatwe",
      q: "Uprość wyrażenie $\\sqrt{72}$.",
      hint: "Rozłóż 72 na iloczyn z pełnym kwadratem.",
      steps: [
        { math: "$72 = 36 \\cdot 2$", comment: "Szukamy największego kwadratu, który dzieli 72. Wiemy, że 36 = 6², więc rozkładamy 72 = 36 · 2." },
        { math: "$\\sqrt{72} = \\sqrt{36 \\cdot 2} = \\sqrt{36} \\cdot \\sqrt{2}$", comment: "Korzystamy z własności pierwiastka z iloczynu: √(a·b) = √a · √b. Rozbijamy pierwiastek na dwa czynniki." },
        { math: "$= 6\\sqrt{2}$", comment: "Obliczamy √36 = 6 i zostawiamy √2, bo 2 nie jest kwadratem żadnej liczby naturalnej." }
      ],
      answer: "$6\\sqrt{2}$"
    },
    {
      level: "łatwe",
      q: "Oblicz $\\log_2 32$.",
      hint: "Zapisz 32 jako potęgę dwójki.",
      steps: [
        { math: "$32 = 2^5$", comment: "Kluczowy krok: zapisujemy argument logarytmu (32) jako potęgę podstawy (2). Sprawdzamy: 2·2·2·2·2 = 32, czyli 32 = 2⁵." },
        { math: "$\\log_2 32 = \\log_2 2^5 = 5$", comment: "Z definicji logarytmu: log₂(2⁵) = 5, bo logarytm odpowiada na pytanie «do jakiej potęgi podnieść 2, żeby otrzymać 32?» – odpowiedź to 5." }
      ],
      answer: "$5$"
    },
    {
      level: "średnie",
      q: "Oblicz $\\log_3 54 - \\log_3 2$.",
      hint: "Użyj własności logarytmu ilorazu.",
      steps: [
        { math: "$\\log_3 54 - \\log_3 2 = \\log_3 \\frac{54}{2}$", comment: "Stosujemy własność logarytmu ilorazu: log_a(x) − log_a(y) = log_a(x/y). Dzięki temu zamieniamy różnicę dwóch logarytmów na jeden logarytm z ilorazu." },
        { math: "$= \\log_3 27 = \\log_3 3^3 = 3$", comment: "Obliczamy 54 ÷ 2 = 27. Rozpoznajemy, że 27 = 3³, więc log₃(3³) = 3 wprost z definicji logarytmu." }
      ],
      answer: "$3$"
    },
    {
      level: "średnie",
      q: "Uprość $\\frac{3^{n+2} - 3^n}{3^{n+1} + 3^n}$.",
      hint: "Wyłącz $3^n$ przed nawias w liczniku i mianowniku.",
      steps: [
        { math: "Licznik: $3^{n+2} - 3^n = 3^n(3^2 - 1) = 3^n \\cdot 8$", comment: "W liczniku wyciągamy wspólny czynnik 3ⁿ przed nawias. Pamiętamy, że 3^(n+2) = 3ⁿ · 3² = 3ⁿ · 9. Po wyłączeniu: 3ⁿ(9 − 1) = 3ⁿ · 8." },
        { math: "Mianownik: $3^{n+1} + 3^n = 3^n(3 + 1) = 3^n \\cdot 4$", comment: "Analogicznie w mianowniku wyciągamy 3ⁿ: mamy 3ⁿ · 3 + 3ⁿ · 1 = 3ⁿ(3 + 1) = 3ⁿ · 4." },
        { math: "$\\frac{3^n \\cdot 8}{3^n \\cdot 4} = \\frac{8}{4} = 2$", comment: "Skracamy czynnik 3ⁿ (jest różny od zera dla każdego n), a następnie dzielimy 8 przez 4. Wynik jest stały, niezależny od n!" }
      ],
      answer: "$2$"
    },
    {
      level: "średnie",
      q: "Rozwiąż równanie $|2x - 3| = 7$.",
      hint: "Rozpatrz dwa przypadki: wyrażenie pod modułem dodatnie i ujemne.",
      steps: [
        { math: "Przypadek 1: $2x - 3 = 7 \\Rightarrow 2x = 10 \\Rightarrow x = 5$", comment: "Gdy wyrażenie pod wartością bezwzględną jest nieujemne (2x − 3 ≥ 0), moduł «znika» i mamy proste równanie liniowe. Dodajemy 3 do obu stron, potem dzielimy przez 2." },
        { math: "Przypadek 2: $2x - 3 = -7 \\Rightarrow 2x = -4 \\Rightarrow x = -2$", comment: "Gdy wyrażenie jest ujemne, moduł zmienia znak, co daje nam drugie równanie. Postępujemy analogicznie: dodajemy 3 do −7, otrzymujemy −4, dzielimy przez 2." },
        { math: "Rozwiązanie: $x \\in \\{-2, 5\\}$", comment: "Oba rozwiązania spełniają warunki – sprawdzamy: |2·5−3| = |7| = 7 ✓ oraz |2·(−2)−3| = |−7| = 7 ✓. Równanie z wartością bezwzgl. stopnia 1 ma zawsze co najwyżej 2 rozwiązania." }
      ],
      answer: "$x = 5$ lub $x = -2$"
    },
    {
      level: "średnie",
      q: "Oblicz $\\left(\\frac{1}{27}\\right)^{-\\frac{2}{3}}$.",
      hint: "Zamień $\\frac{1}{27}$ na $3^{-3}$ i użyj potęgi potęgi.",
      steps: [
        { math: "$\\frac{1}{27} = 3^{-3}$", comment: "Rozpoznajemy, że 27 = 3³, więc 1/27 = 3⁻³. Zamiana na potęgę trójki pozwoli użyć reguły potęga potęgi." },
        { math: "$(3^{-3})^{-\\frac{2}{3}} = 3^{(-3) \\cdot (-\\frac{2}{3})} = 3^2 = 9$", comment: "Stosujemy regułę (aᵐ)ⁿ = aᵐ·ⁿ. Mnożymy wykładniki: (−3) · (−2/3) = +2 (minus razy minus daje plus, 3 się skraca). Końcowy wynik: 3² = 9." }
      ],
      answer: "$9$"
    },
    {
      level: "trudne",
      q: "Wykaż, że $\\log_4 6 = \\frac{1 + \\log_2 3}{2}$.",
      hint: "Użyj zmiany podstawy logarytmu na podstawę 2.",
      steps: [
        { math: "$\\log_4 6 = \\frac{\\log_2 6}{\\log_2 4} = \\frac{\\log_2 6}{2}$", comment: "Stosujemy wzór na zmianę podstawy logarytmu: log_a(b) = log_c(b) / log_c(a). Wybieramy podstawę 2, bo w tezie po prawej stronie mamy log₂. Ponadto log₂(4) = 2, bo 4 = 2²." },
        { math: "$\\log_2 6 = \\log_2 (2 \\cdot 3) = \\log_2 2 + \\log_2 3 = 1 + \\log_2 3$", comment: "Rozkładamy 6 = 2·3 i stosujemy własność logarytmu iloczynu: log(a·b) = log(a) + log(b). Wiemy, że log₂(2) = 1." },
        { math: "$\\log_4 6 = \\frac{1 + \\log_2 3}{2}$ ∎", comment: "Podstawiamy wynik z kroku 2 do ułamka z kroku 1 i otrzymujemy dokładnie tezę, którą mieliśmy wykazać. Dowód zakończony." }
      ],
      answer: "Dowód przeprowadzony"
    },
    {
      level: "trudne",
      q: "Rozwiąż nierówność $|3x + 1| > 5$.",
      hint: "Nierówność $|w| > a$ daje dwa przedziały.",
      steps: [
        { math: "$|3x + 1| > 5 \\iff 3x + 1 > 5 \\;\\lor\\; 3x + 1 < -5$", comment: "Korzystamy z własności wartości bezwzględnej: |w| > a (dla a > 0) zachodzi wtedy, gdy w > a LUB w < −a. To daje nam dwie osobne nierówności liniowe." },
        { math: "$3x + 1 > 5 \\Rightarrow 3x > 4 \\Rightarrow x > \\frac{4}{3}$", comment: "Pierwsza nierówność: odejmujemy 1 od obu stron (3x > 4), następnie dzielimy przez 3 (dodatnie, więc kierunek nierówności się nie zmienia)." },
        { math: "$3x + 1 < -5 \\Rightarrow 3x < -6 \\Rightarrow x < -2$", comment: "Druga nierówność: odejmujemy 1 od obu stron (3x < −6), dzielimy przez 3. Otrzymujemy x < −2." },
        { math: "$x \\in (-\\infty, -2) \\cup \\left(\\frac{4}{3}, +\\infty\\right)$", comment: "Rozwiązaniem jest suma obu przedziałów (spójnik LUB). Graficznie: na osi liczbowej zaznaczamy promień w lewo od −2 oraz promień w prawo od 4/3." }
      ],
      answer: "$x \\in (-\\infty, -2) \\cup \\left(\\frac{4}{3}, +\\infty\\right)$"
    },
    {
      level: "trudne",
      q: "Usuń niewymierność z mianownika: $\\frac{6}{\\sqrt{5} - \\sqrt{3}}$.",
      hint: "Pomnóż przez sprzężenie mianownika.",
      steps: [
        { math: "$\\frac{6}{\\sqrt{5} - \\sqrt{3}} \\cdot \\frac{\\sqrt{5} + \\sqrt{3}}{\\sqrt{5} + \\sqrt{3}}$", comment: "Mnożymy licznik i mianownik przez wyrażenie sprzężone do mianownika, czyli (√5 + √3). To nie zmienia wartości ułamka (mnożymy przez 1), ale pozwoli pozbyć się pierwiastków z mianownika." },
        { math: "Mianownik: $(\\sqrt{5} - \\sqrt{3})(\\sqrt{5} + \\sqrt{3}) = (\\sqrt{5})^2 - (\\sqrt{3})^2 = 5 - 3 = 2$", comment: "Stosujemy wzór skróconego mnożenia (a−b)(a+b) = a²−b². Pierwiastki podniesione do kwadratu dają liczby naturalne – stąd mianownik jest teraz wymierny." },
        { math: "Licznik: $6(\\sqrt{5} + \\sqrt{3}) = 6\\sqrt{5} + 6\\sqrt{3}$", comment: "Rozmnażamy 6 przez każdy składnik sumy w nawiasie (własność rozdzielności mnożenia)." },
        { math: "$= \\frac{6\\sqrt{5} + 6\\sqrt{3}}{2} = 3\\sqrt{5} + 3\\sqrt{3}$", comment: "Dzielimy każdy składnik licznika przez 2 (skracamy). Wynik nie ma już pierwiastków w mianowniku – niewymierność została usunięta." }
      ],
      answer: "$3\\sqrt{5} + 3\\sqrt{3}$"
    }
  ]
},

/* ──────────────────────────────────────────────
   2. WYRAŻENIA ALGEBRAICZNE
   ────────────────────────────────────────────── */
"wyrazenia-algebraiczne": {
  title: "Wyrażenia algebraiczne",
  color: "purple",
  icon: "fa-superscript",
  intro: "Wyrażenia algebraiczne to podstawa manipulacji matematycznych – mnożenie wielomianów, wzory skróconego mnożenia, rozkład na czynniki. Bezbłędne opanowanie tego działu znacząco przyspiesza rozwiązywanie niemal każdego zadania maturalnego.",
  examFocus: [
    "Wzory skróconego mnożenia (kwadrat sumy/różnicy, różnica kwadratów, sześcianów)",
    "Rozkład wielomianu na czynniki (wyłączanie, grupowanie, wzory skrócone)",
    "Działania na ułamkach algebraicznych (skracanie, dodawanie, dzielenie)",
    "Twierdzenie o reszcie i twierdzenie Bézouta",
    "Dzielenie wielomianów (schemat Hornera)"
  ],
  theory: [
    {
      title: "Wzory skróconego mnożenia",
      text: "Wzory skróconego mnożenia pozwalają szybko rozkładać wyrażenia na czynniki lub mnożyć nawiasy. Są absolutnie kluczowe na maturze – pojawiają się zarówno w zadaniach zamkniętych, jak i otwartych. Musisz je znać na pamięć i rozpoznawać w wyrażeniach.",
      formulas: [
        { latex: "(a+b)^2 = a^2 + 2ab + b^2", meaning: "Kwadrat sumy" },
        { latex: "(a-b)^2 = a^2 - 2ab + b^2", meaning: "Kwadrat różnicy" },
        { latex: "a^2 - b^2 = (a-b)(a+b)", meaning: "Różnica kwadratów" },
        { latex: "a^3 - b^3 = (a-b)(a^2+ab+b^2)", meaning: "Różnica sześcianów" },
        { latex: "a^3 + b^3 = (a+b)(a^2-ab+b^2)", meaning: "Suma sześcianów" },
        { latex: "(a+b)^3 = a^3 + 3a^2b + 3ab^2 + b^3", meaning: "Sześcian sumy" }
      ]
    },
    {
      title: "Wielomiany",
      text: "Wielomian stopnia $n$ to wyrażenie postaci $a_n x^n + a_{n-1}x^{n-1} + \\ldots + a_1 x + a_0$, gdzie $a_n \\neq 0$. Stopień wielomianu to najwyższa potęga $x$ z niezerowym współczynnikiem. Wielomian zerowy nie ma określonego stopnia. Pierwiastkiem wielomianu jest taka wartość $x_0$, że $W(x_0) = 0$.",
      formulas: [
        { latex: "W(x) = a_n x^n + a_{n-1}x^{n-1} + \\ldots + a_0", meaning: "Postać ogólna wielomianu" },
        { latex: "W(x_0) = 0 \\iff (x - x_0) \\mid W(x)", meaning: "Twierdzenie Bézouta" },
        { latex: "\\deg(W \\cdot V) = \\deg W + \\deg V", meaning: "Stopień iloczynu wielomianów" }
      ]
    },
    {
      title: "Rozkład na czynniki",
      text: "Rozkład wielomianu na czynniki to kluczowa umiejętność. Metody: 1) Wyłączanie wspólnego czynnika: $6x^2 + 3x = 3x(2x+1)$. 2) Grupowanie wyrazów. 3) Zastosowanie wzorów skróconego mnożenia. 4) Znalezienie pierwiastków (tw. Bézouta) i schemat Hornera.",
      formulas: [
        { latex: "ax^2 + bx + c = a(x - x_1)(x - x_2)", meaning: "Rozkład trójmianu kwadratowego (gdy Δ > 0)" },
        { latex: "ax^2 + bx + c = a(x - x_0)^2", meaning: "Rozkład trójmianu kwadratowego (gdy Δ = 0)" }
      ]
    },
    {
      title: "Ułamki algebraiczne",
      text: "Ułamek algebraiczny to iloraz dwóch wielomianów: $\\frac{W(x)}{V(x)}$, gdzie $V(x) \\neq 0$. Aby dodać ułamki algebraiczne – sprowadzamy do wspólnego mianownika. Aby skrócić – rozkładamy licznik i mianownik na czynniki. Uwaga na dziedzinę – wartości zerujące mianownik są wykluczone!",
      formulas: [
        { latex: "\\frac{W(x)}{V(x)} + \\frac{P(x)}{Q(x)} = \\frac{W(x) \\cdot Q(x) + P(x) \\cdot V(x)}{V(x) \\cdot Q(x)}", meaning: "Dodawanie ułamków algebraicznych" },
        { latex: "\\frac{W(x)}{V(x)} \\cdot \\frac{P(x)}{Q(x)} = \\frac{W(x) \\cdot P(x)}{V(x) \\cdot Q(x)}", meaning: "Mnożenie ułamków algebraicznych" }
      ]
    }
  ],
  mistakes: [
    "$(a+b)^2 \\neq a^2 + b^2$ – brakuje podwójnego iloczynu $2ab$!",
    "Przy skracaniu ułamków algebraicznych nie wolno skracać pojedynczych wyrazów sumy",
    "Zapominanie o dziedzinie – mianownik nie może być zerem",
    "$\\sqrt{a^2} = |a|$, a nie po prostu $a$ (bo $a$ może być ujemne)",
    "Schemat Hornera: pamiętaj o zerowych współczynnikach przy brakujących potęgach"
  ],
  strategy: [
    "Szukaj możliwości zastosowania wzorów skróconego mnożenia",
    "Wyłączaj wspólny czynnik jako pierwszy krok",
    "Przy ułamkach algebraicznych – najpierw rozłóż na czynniki, potem skracaj",
    "Zawsze określ dziedzinę wyrażenia",
    "Przy dzieleniu wielomianów – schemat Hornera jest szybszy niż dzielenie pisemne"
  ],
  tasks: [
    {
      level: "łatwe",
      q: "Rozłóż na czynniki: $x^2 - 9$.",
      hint: "To różnica kwadratów: $a^2 - b^2 = (a-b)(a+b)$.",
      steps: [
        { math: "$x^2 - 9 = x^2 - 3^2$", comment: "Rozpoznajemy, że wyrażenie jest różnicą kwadratów dwóch wyrażeń: x² to kwadrat x, a 9 to kwadrat 3." },
        { math: "$= (x-3)(x+3)$", comment: "Stosujemy wzór skróconego mnożenia a² − b² = (a−b)(a+b), podstawiając a = x i b = 3. To jeden z najczęstszych wzorów na maturze!" }
      ],
      answer: "$(x-3)(x+3)$"
    },
    {
      level: "łatwe",
      q: "Rozwiń $(2x + 3)^2$.",
      hint: "Kwadrat sumy: $(a+b)^2 = a^2 + 2ab + b^2$.",
      steps: [
        { math: "$(2x+3)^2 = (2x)^2 + 2 \\cdot 2x \\cdot 3 + 3^2$", comment: "Stosujemy wzór kwadrat sumy (a+b)² = a² + 2ab + b², gdzie a = 2x i b = 3. Pamiętamy o podwójnym iloczynie 2ab – to najczęstszy błąd!" },
        { math: "$= 4x^2 + 12x + 9$", comment: "Obliczamy: (2x)² = 4x², 2·2x·3 = 12x, 3² = 9. Wynik to trójmian kwadratowy." }
      ],
      answer: "$4x^2 + 12x + 9$"
    },
    {
      level: "łatwe",
      q: "Wyłącz wspólny czynnik: $6x^3 - 9x^2 + 3x$.",
      hint: "NWD współczynników to 3, a najniższa potęga $x$ to $x^1$.",
      steps: [
        { math: "NWD współczynników: $\\gcd(6, 9, 3) = 3$; najniższa potęga $x$: $x^1$", comment: "Szukamy największego wspólnego dzielnika współczynników (6, 9, 3) → to 3. Najniższa potęga zmiennej x występująca w każdym wyrazie to x¹." },
        { math: "$6x^3 - 9x^2 + 3x = 3x(2x^2 - 3x + 1)$", comment: "Wyciągamy czynnik 3x przed nawias, dzieląc każdy wyraz: 6x³ ÷ 3x = 2x², −9x² ÷ 3x = −3x, 3x ÷ 3x = 1. Sprawdzamy mnożąc: 3x(2x²−3x+1) = 6x³−9x²+3x ✓" }
      ],
      answer: "$3x(2x^2 - 3x + 1)$"
    },
    {
      level: "średnie",
      q: "Rozłóż na czynniki: $x^3 - 8$.",
      hint: "Różnica sześcianów: $a^3 - b^3 = (a-b)(a^2+ab+b^2)$.",
      steps: [
        { math: "$x^3 - 8 = x^3 - 2^3$", comment: "Rozpoznajemy różnicę sześcianów: x³ jest sześcianem x, a 8 = 2³ jest sześcianem 2." },
        { math: "$= (x-2)(x^2 + 2x + 4)$", comment: "Stosujemy wzór a³ − b³ = (a−b)(a² + ab + b²) z a = x, b = 2. Drugi nawias: x² + x·2 + 2² = x² + 2x + 4. Uwaga: trójmian x² + 2x + 4 ma Δ = 4 − 16 = −12 < 0, więc nie da się go dalej rozłożyć w ℝ." }
      ],
      answer: "$(x-2)(x^2 + 2x + 4)$"
    },
    {
      level: "średnie",
      q: "Uprość ułamek algebraiczny $\\frac{x^2 - 4}{x^2 + 4x + 4}$.",
      hint: "Rozłóż licznik i mianownik na czynniki.",
      steps: [
        { math: "Licznik: $x^2 - 4 = (x-2)(x+2)$", comment: "Rozpoznajemy różnicę kwadratów w liczniku: x² − 4 = x² − 2² = (x−2)(x+2)." },
        { math: "Mianownik: $x^2 + 4x + 4 = (x+2)^2$", comment: "W mianowniku mamy kwadrat sumy: x² + 2·x·2 + 2² = (x+2)². Sprawdzamy: podwojony iloczyn = 2·x·2 = 4x ✓." },
        { math: "$\\frac{(x-2)(x+2)}{(x+2)^2} = \\frac{x-2}{x+2}$ dla $x \\neq -2$", comment: "Skracamy wspólny czynnik (x+2). Ważne: musimy zaznaczyć warunek x ≠ −2, bo ta wartość zerowała mianownik w pierwotnym wyrażeniu." }
      ],
      answer: "$\\frac{x-2}{x+2}$ dla $x \\neq -2$"
    },
    {
      level: "średnie",
      q: "Oblicz wartość wyrażenia $a^2 + b^2$, jeśli $a + b = 5$ i $ab = 6$.",
      hint: "Skorzystaj ze wzoru $(a+b)^2 = a^2 + 2ab + b^2$.",
      steps: [
        { math: "$(a+b)^2 = a^2 + 2ab + b^2$", comment: "Kluczowa obserwacja: rozwijamy kwadrat sumy i widzimy, że zawiera on wyrażenie a² + b², którego szukamy." },
        { math: "$a^2 + b^2 = (a+b)^2 - 2ab$", comment: "Przekształcamy wzór, przenosząc 2ab na drugą stronę: a² + b² = (a+b)² − 2ab. Teraz możemy podstawić znane wartości." },
        { math: "$= 5^2 - 2 \\cdot 6 = 25 - 12 = 13$", comment: "Podstawiamy a + b = 5 i ab = 6: otrzymujemy 25 − 12 = 13. Nie musieliśmy znać osobnych wartości a i b!" }
      ],
      answer: "$13$"
    },
    {
      level: "średnie",
      q: "Rozłóż na czynniki przez grupowanie: $x^3 + 3x^2 - x - 3$.",
      hint: "Pogrupuj: $(x^3 + 3x^2) + (-x - 3)$.",
      steps: [
        { math: "$x^3 + 3x^2 - x - 3 = x^2(x+3) - 1(x+3)$", comment: "Grupujemy: z pierwszej pary x³ + 3x² wyciągamy x², z drugiej −x − 3 wyciągamy −1. W obu nawiasach pojawia się ten sam czynnik (x+3)." },
        { math: "$= (x+3)(x^2-1)$", comment: "Wyciągamy wspólny czynnik (x+3) przed nawias. Pozostaje x² − 1." },
        { math: "$= (x+3)(x-1)(x+1)$", comment: "Rozpoznajemy, że x² − 1 to różnica kwadratów: x² − 1² = (x−1)(x+1). Ostateczny rozkład ma trzy czynniki liniowe, co oznacza, że wielomian ma trzy pierwiastki: −3, 1 i −1." }
      ],
      answer: "$(x+3)(x-1)(x+1)$"
    },
    {
      level: "trudne",
      q: "Uprość: $\\frac{x}{x-1} - \\frac{1}{x+1} - \\frac{2}{x^2-1}$.",
      hint: "Zauważ, że $x^2-1 = (x-1)(x+1)$.",
      steps: [
        { math: "Wspólny mianownik: $(x-1)(x+1) = x^2 - 1$", comment: "Zauważamy, że x² − 1 = (x−1)(x+1), więc trzeci ułamek już ma mianownik będący iloczynem mianowników dwóch pierwszych. To nasz wspólny mianownik." },
        { math: "$\\frac{x(x+1) - 1 \\cdot (x-1) - 2}{(x-1)(x+1)}$", comment: "Sprowadzamy do wspólnego mianownika: pierwszy ułamek mnożymy przez (x+1), drugi przez (x−1), trzeci już ma właściwy mianownik." },
        { math: "Licznik: $x^2 + x - x + 1 - 2 = x^2 - 1$", comment: "Rozmnażamy i upraszczamy licznik: x(x+1) = x² + x; −1·(x−1) = −x + 1; po dodaniu: x² + x − x + 1 − 2 = x² − 1." },
        { math: "$\\frac{x^2 - 1}{(x-1)(x+1)} = \\frac{(x-1)(x+1)}{(x-1)(x+1)} = 1$", comment: "Licznik x² − 1 = (x−1)(x+1) jest identyczny z mianownikiem! Ułamek skraca się do 1. Warunek: x ≠ ±1 (bo mianownik nie może być zerem)." }
      ],
      answer: "$1$ dla $x \\neq \\pm 1$"
    },
    {
      level: "trudne",
      q: "Wiedząc, że $x + \\frac{1}{x} = 3$, oblicz $x^2 + \\frac{1}{x^2}$.",
      hint: "Podnieś obie strony do kwadratu.",
      steps: [
        { math: "$\\left(x + \\frac{1}{x}\\right)^2 = x^2 + 2 \\cdot x \\cdot \\frac{1}{x} + \\frac{1}{x^2} = x^2 + 2 + \\frac{1}{x^2}$", comment: "Podnosimy obie strony równości do kwadratu, stosując wzór (a+b)² = a² + 2ab + b². Kluczowe: środkowy wyraz 2·x·(1/x) = 2, bo x się skraca." },
        { math: "$3^2 = x^2 + 2 + \\frac{1}{x^2} \\Rightarrow 9 = x^2 + 2 + \\frac{1}{x^2}$", comment: "Lewa strona: 3² = 9 (podstawiamy znaną wartość x + 1/x = 3)." },
        { math: "$x^2 + \\frac{1}{x^2} = 9 - 2 = 7$", comment: "Przenosimy 2 na prawą stronę i otrzymujemy wynik. Technika «podnoszenia do kwadratu znanych sum» jest bardzo przydatna na maturze!" }
      ],
      answer: "$7$"
    },
    {
      level: "trudne",
      q: "Za pomocą schematu Hornera podziel $W(x) = 2x^3 - 3x^2 + 0x + 5$ przez $(x - 2)$.",
      hint: "Schemat Hornera z wartością $c = 2$.",
      steps: [
        { math: "Współczynniki: $[2, -3, 0, 5]$; wartość $c = 2$", comment: "Wypisujemy współczynniki wielomianu W(x) od najwyższej potęgi. Ważne: wstawiamy 0 przy x¹, bo brakuje tego wyrazu. Dzielimy przez (x − 2), więc c = 2." },
        { math: "$2 \\to 2 \\cdot 2 + (-3) = 1 \\to 1 \\cdot 2 + 0 = 2 \\to 2 \\cdot 2 + 5 = 9$", comment: "Wykonujemy schemat Hornera krok po kroku: zaczynamy od 2 (pierwszy współczynnik), mnożymy przez c=2, dodajemy następny współczynnik, i tak dalej." },
        { math: "Iloraz: $2x^2 + x + 2$, reszta $= 9$", comment: "Wynikowe współczynniki [2, 1, 2] dają wielomian ilorazu 2x² + x + 2, a ostatnia wartość 9 to reszta z dzielenia. Zatem W(x) = (x−2)(2x²+x+2) + 9." }
      ],
      answer: "$W(x) = (x-2)(2x^2 + x + 2) + 9$"
    }
  ]
},

/* ──────────────────────────────────────────────
   3. RÓWNANIA I NIERÓWNOŚCI
   ────────────────────────────────────────────── */
"rownania": {
  title: "Równania i nierówności",
  color: "green",
  icon: "fa-equals",
  intro: "Równania i nierówności to najczęstszy typ zadań na maturze. Musisz umieć rozwiązywać równania liniowe, kwadratowe, z wartością bezwzględną, z parametrem, układy równań oraz nierówności kwadratowe. To absolutny must-have!",
  examFocus: [
    "Równania kwadratowe – wyróżnik, wzory Viète'a, postać iloczynowa",
    "Nierówności kwadratowe – metoda graficzna (parabola)",
    "Układy równań liniowych (metoda podstawiania, przeciwnych współczynników)",
    "Równania z parametrem",
    "Równania wymierne – dziedzina!"
  ],
  theory: [
    {
      title: "Równanie kwadratowe",
      text: "Równanie kwadratowe $ax^2 + bx + c = 0$ (gdzie $a \\neq 0$) rozwiązujemy za pomocą wyróżnika $\\Delta = b^2 - 4ac$. Jeśli $\\Delta > 0$: dwa rozwiązania, $\\Delta = 0$: jedno (podwójne), $\\Delta < 0$: brak rozwiązań w $\\mathbb{R}$. Wzory Viète'a wiążą pierwiastki ze współczynnikami bez konieczności ich obliczania.",
      formulas: [
        { latex: "\\Delta = b^2 - 4ac", meaning: "Wyróżnik równania kwadratowego" },
        { latex: "x_{1,2} = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}", meaning: "Wzór na pierwiastki (Δ ≥ 0)" },
        { latex: "x_1 + x_2 = -\\frac{b}{a}", meaning: "Wzór Viète'a – suma pierwiastków" },
        { latex: "x_1 \\cdot x_2 = \\frac{c}{a}", meaning: "Wzór Viète'a – iloczyn pierwiastków" },
        { latex: "ax^2 + bx + c = a(x - x_1)(x - x_2)", meaning: "Postać iloczynowa (Δ > 0)" }
      ]
    },
    {
      title: "Nierówności kwadratowe",
      text: "Nierówność kwadratową $ax^2 + bx + c > 0$ (lub $<$, $\\geq$, $\\leq$) rozwiązujemy metodą graficzną: 1) Znajdź pierwiastki (jeśli istnieją). 2) Narysuj parabolę (ramiona w górę gdy $a > 0$, w dół gdy $a < 0$). 3) Odczytaj z wykresu przedziały spełniające nierówność.",
      formulas: [
        { latex: "a > 0,\\; \\Delta > 0: \\quad ax^2+bx+c > 0 \\iff x \\in (-\\infty, x_1) \\cup (x_2, +\\infty)", meaning: "Nierówność > 0, ramiona w górę" },
        { latex: "a > 0,\\; \\Delta > 0: \\quad ax^2+bx+c < 0 \\iff x \\in (x_1, x_2)", meaning: "Nierówność < 0, ramiona w górę" }
      ]
    },
    {
      title: "Układy równań",
      text: "Układ dwóch równań liniowych z dwiema niewiadomymi rozwiązujemy metodą: podstawiania (wyrażamy jedną zmienną z jednego równania i wstawiamy do drugiego) lub przeciwnych współczynników (mnożymy równania tak, by po dodaniu wyeliminować jedną zmienną). Układ może mieć: jedno rozwiązanie, nieskończenie wiele lub brak.",
      formulas: [
        { latex: "\\begin{cases} a_1x + b_1y = c_1 \\\\ a_2x + b_2y = c_2 \\end{cases}", meaning: "Układ dwóch równań liniowych" },
        { latex: "W = \\begin{vmatrix} a_1 & b_1 \\\\ a_2 & b_2 \\end{vmatrix} = a_1 b_2 - a_2 b_1", meaning: "Wyznacznik układu (W ≠ 0 → jedno rozwiązanie)" }
      ]
    },
    {
      title: "Równania wymierne",
      text: "Równanie wymierne to równanie zawierające niewiadomą w mianowniku. ZAWSZE najpierw wyznacz dziedzinę (mianownik $\\neq 0$), potem mnóż obie strony przez wspólny mianownik i rozwiąż powstałe równanie. Na końcu sprawdź, czy rozwiązania należą do dziedziny!",
      formulas: [
        { latex: "\\frac{f(x)}{g(x)} = 0 \\iff f(x) = 0 \\;\\land\\; g(x) \\neq 0", meaning: "Ułamek = 0 gdy licznik = 0 i mianownik ≠ 0" }
      ]
    },
    {
      title: "Równania z wartością bezwzględną",
      text: "Wartość bezwzględna $|x|$ to odległość liczby od zera na osi. Podstawowe równanie $|f(x)| = a$ ($a \\geq 0$) rozwiązujemy rozbijając na dwa przypadki: $f(x) = a$ lub $f(x) = -a$. Równanie $|f(x)| = |g(x)|$ rozbijamy na: $f(x) = g(x)$ lub $f(x) = -g(x)$. Nierówność $|f(x)| < a$ jest równoważna $-a < f(x) < a$, a $|f(x)| > a$ jest równoważna $f(x) < -a$ lub $f(x) > a$.",
      formulas: [
        { latex: "|f(x)| = a \\iff f(x) = a \\;\\lor\\; f(x) = -a \\quad (a \\geq 0)", meaning: "Równanie z modułem – rozbicie na dwa przypadki" },
        { latex: "|f(x)| < a \\iff -a < f(x) < a", meaning: "Nierówność z modułem – przedział" },
        { latex: "|f(x)| > a \\iff f(x) < -a \\;\\lor\\; f(x) > a", meaning: "Nierówność z modułem – dwa półproste" },
        { latex: "|a - b| = \\text{odległość } a \\text{ od } b \\text{ na osi}", meaning: "Interpretacja geometryczna wartości bezwzględnej" }
      ]
    }
  ],
  mistakes: [
    "Zapominanie o dziedzinie w równaniach wymiernych – rozwiązanie zerujące mianownik jest pozorne!",
    "Przy $\\Delta < 0$ odpowiedź brzmi: brak rozwiązań (nie zero!)",
    "Nierówność kwadratowa: pamiętaj o kierunku ramion paraboli ($a > 0$ w górę)",
    "Błąd znakowy przy mnożeniu nierówności przez liczbę ujemną – znak się odwraca!",
    "Przy wzorach Viète'a: suma to $-\\frac{b}{a}$ (z minusem!)"
  ],
  strategy: [
    "Równanie kwadratowe: oblicz $\\Delta$, potem pierwiastki",
    "Nierówność kwadratowa: pierwiastki → szkic paraboli → odczyt",
    "Układ równań: wybierz metodę dającą najprostsze obliczenia",
    "Równanie wymierne: DZIEDZINA → wspólny mianownik → rozwiąż → SPRAWDŹ",
    "Z parametrem: rozpatruj przypadki (np. $a = 0$ vs $a \\neq 0$)"
  ],
  tasks: [
    {
      level: "łatwe",
      q: "Rozwiąż równanie $x^2 - 5x + 6 = 0$.",
      hint: "Oblicz $\\Delta$ lub rozłóż na czynniki.",
      steps: [
        { math: "$\\Delta = b^2 - 4ac = (-5)^2 - 4 \\cdot 1 \\cdot 6 = 25 - 24 = 1$", comment: "Obliczamy wyróżnik Δ ze wzoru b² − 4ac. Mamy a = 1, b = −5, c = 6. Δ = 1 > 0, więc równanie ma dwa różne rozwiązania rzeczywiste." },
        { math: "$x_1 = \\frac{5 - 1}{2} = 2, \\quad x_2 = \\frac{5 + 1}{2} = 3$", comment: "Stosujemy wzór x = (−b ± √Δ)/(2a) = (5 ± 1)/2. Stąd x₁ = 4/2 = 2 i x₂ = 6/2 = 3. Sprawdzamy: 2² − 5·2 + 6 = 0 ✓ i 3² − 5·3 + 6 = 0 ✓." }
      ],
      answer: "$x = 2$ lub $x = 3$"
    },
    {
      level: "łatwe",
      q: "Rozwiąż nierówność $x^2 - 4 > 0$.",
      hint: "Rozłóż na czynniki i narysuj parabolę.",
      steps: [
        { math: "$x^2 - 4 = (x-2)(x+2) = 0 \\Rightarrow x = -2, \\; x = 2$", comment: "Rozkładamy lewą stronę jako różnicę kwadratów i wyznaczamy miejsca zerowe paraboli: x = −2 i x = 2." },
        { math: "Parabola $y = x^2 - 4$ ma $a = 1 > 0$ (ramiona w górę)", comment: "Współczynnik a = 1 jest dodatni, więc parabola jest otwarta ku górze. Oznacza to, że wartości > 0 przyjmuje na zewnątrz przedziału między pierwiastkami." },
        { math: "$x^2 - 4 > 0 \\iff x \\in (-\\infty, -2) \\cup (2, +\\infty)$", comment: "Nierówność jest spełniona tam, gdzie parabola jest powyżej osi OX, czyli dla x < −2 lub x > 2. Przedziały otwarte, bo nierówność jest ostra (>)." }
      ],
      answer: "$x \\in (-\\infty, -2) \\cup (2, +\\infty)$"
    },
    {
      level: "łatwe",
      q: "Rozwiąż układ: $\\begin{cases} x + y = 7 \\\\ x - y = 3 \\end{cases}$",
      hint: "Dodaj oba równania stronami.",
      steps: [
        { math: "$(x+y) + (x-y) = 7 + 3 \\Rightarrow 2x = 10 \\Rightarrow x = 5$", comment: "Dodajemy równania stronami. Zmienne y wzajemnie się eliminują (+y i −y), co pozwala wyznaczyć x bezpośrednio." },
        { math: "$5 + y = 7 \\Rightarrow y = 2$", comment: "Podstawiamy x = 5 do pierwszego równania i wyznaczamy y. Sprawdzenie: 5 + 2 = 7 ✓ oraz 5 − 2 = 3 ✓." }
      ],
      answer: "$x = 5, \\; y = 2$"
    },
    {
      level: "średnie",
      q: "Rozwiąż równanie $\\frac{2x}{x-3} = \\frac{6}{x-3} + 1$.",
      hint: "Dziedzina: $x \\neq 3$. Mnóż przez $(x-3)$.",
      steps: [
        { math: "Dziedzina: $x \\neq 3$ (bo $x - 3 \\neq 0$)", comment: "Najpierw wyznaczamy dziedzinę – wartość x = 3 zeruje mianownik, więc jest wykluczona. To kluczowy krok w każdym równaniu wymiernym!" },
        { math: "Mnożymy obie strony przez $(x-3)$: $2x = 6 + (x-3)$", comment: "Eliminujemy mianowniki mnożąc obie strony przez (x−3). Każdy ułamek upraszcza się do licznika." },
        { math: "$2x = x + 3 \\Rightarrow x = 3$", comment: "Upraszczamy: 6 + x − 3 = x + 3. Przenosimy x na lewą stronę: 2x − x = 3, czyli x = 3." },
        { math: "$x = 3 \\notin \\text{dziedziny}$ → brak rozwiązań!", comment: "Otrzymane x = 3 NIE należy do dziedziny (bo zeruje mianownik). Zatem równanie jest sprzeczne – nie ma żadnego rozwiązania. To klasyczna pułapka maturalna!" }
      ],
      answer: "Brak rozwiązań (równanie sprzeczne)"
    },
    {
      level: "średnie",
      q: "Nie rozwiązując równania $2x^2 - 7x + 3 = 0$, oblicz $x_1^2 + x_2^2$.",
      hint: "Użyj wzorów Viète'a i tożsamości $x_1^2 + x_2^2 = (x_1+x_2)^2 - 2x_1 x_2$.",
      steps: [
        { math: "Viète: $x_1 + x_2 = \\frac{7}{2}, \\quad x_1 \\cdot x_2 = \\frac{3}{2}$", comment: "Z wzorów Viète'a: suma pierwiastków = −b/a = 7/2, iloczyn = c/a = 3/2. Nie musimy znać osobnych pierwiastków!" },
        { math: "$x_1^2 + x_2^2 = (x_1+x_2)^2 - 2x_1 x_2$", comment: "Kluczowa tożsamość algebraiczna: kwadrat sumy rozwijamy do a² + 2ab + b², więc a² + b² = (a+b)² − 2ab." },
        { math: "$= \\left(\\frac{7}{2}\\right)^2 - 2 \\cdot \\frac{3}{2} = \\frac{49}{4} - 3 = \\frac{49 - 12}{4} = \\frac{37}{4}$", comment: "Podstawiamy: (7/2)² = 49/4, 2 · 3/2 = 3 = 12/4. Odejmujemy: 49/4 − 12/4 = 37/4." }
      ],
      answer: "$\\frac{37}{4}$"
    },
    {
      level: "średnie",
      q: "Rozwiąż nierówność $-x^2 + 4x - 3 \\geq 0$.",
      hint: "Pomnóż przez $-1$ (zmień znak nierówności) lub narysuj parabolę z $a < 0$.",
      steps: [
        { math: "$\\Delta = 16 - 4 \\cdot (-1) \\cdot (-3) = 16 - 12 = 4$; $x_1 = 1, \\; x_2 = 3$", comment: "Obliczamy Δ: b² − 4ac = 4² − 4·(−1)·(−3) = 16 − 12 = 4. Pierwiastki: x = (−4 ± 2)/(−2), co daje x₁ = 1 i x₂ = 3." },
        { math: "Parabola z $a = -1 < 0$ – ramiona skierowane w dół", comment: "Współczynnik a = −1 jest ujemny, więc parabola jest odwrócona ku dołowi. Wartości ≥ 0 przyjmuje MIĘDZY pierwiastkami (i w nich samych)." },
        { math: "$-x^2 + 4x - 3 \\geq 0 \\iff x \\in [1, 3]$", comment: "Nierówność nieostra (≥) oznacza, że punkty x = 1 i x = 3 też spełniają warunek (wartość = 0). Stąd przedział domknięty [1, 3]." }
      ],
      answer: "$x \\in [1, 3]$"
    },
    {
      level: "średnie",
      q: "Dla jakich wartości parametru $m$ równanie $x^2 + mx + 4 = 0$ ma dwa różne pierwiastki?",
      hint: "Warunek: $\\Delta > 0$.",
      steps: [
        { math: "$\\Delta = m^2 - 4 \\cdot 1 \\cdot 4 = m^2 - 16$", comment: "Obliczamy wyróżnik, traktując m jako parametr: a = 1, b = m, c = 4, więc Δ = m² − 16." },
        { math: "$\\Delta > 0 \\iff m^2 - 16 > 0 \\iff m^2 > 16$", comment: "Warunek na dwa RÓŻNE pierwiastki to Δ > 0, co daje nierówność kwadratową m² > 16." },
        { math: "$m > 4$ lub $m < -4$, czyli $m \\in (-\\infty, -4) \\cup (4, +\\infty)$", comment: "Rozwiązujemy: m² > 16 ⟺ |m| > 4, co daje m > 4 lub m < −4. Dla m = ±4 byłoby Δ = 0 (jedno rozwiązanie)." }
      ],
      answer: "$m \\in (-\\infty, -4) \\cup (4, +\\infty)$"
    },
    {
      level: "trudne",
      q: "Rozwiąż układ: $\\begin{cases} x^2 + y^2 = 25 \\\\ x + y = 7 \\end{cases}$",
      hint: "Z drugiego równania wyrazi $y = 7 - x$ i podstaw do pierwszego.",
      steps: [
        { math: "$y = 7 - x$", comment: "Z drugiego (prostszego) równania wyrażamy y jako funkcję x. To metoda podstawiania." },
        { math: "$x^2 + (7-x)^2 = 25$", comment: "Podstawiamy y = 7 − x do pierwszego równania (okrąg x² + y² = 25). Rozwijamy kwadrat." },
        { math: "$x^2 + 49 - 14x + x^2 = 25 \\Rightarrow 2x^2 - 14x + 24 = 0$", comment: "Rozwijamy (7−x)² = 49 − 14x + x², dodajemy x², przenosimy 25 na lewą stronę. Upraszczamy." },
        { math: "$x^2 - 7x + 12 = 0 \\Rightarrow (x-3)(x-4) = 0$", comment: "Dzielimy obie strony przez 2. Rozkładamy trójmian: szukamy dwóch liczb o sumie 7 i iloczynie 12 → to 3 i 4." },
        { math: "$x = 3 \\Rightarrow y = 4; \\quad x = 4 \\Rightarrow y = 3$", comment: "Dla x = 3: y = 7 − 3 = 4; dla x = 4: y = 7 − 4 = 3. Układ ma dwie pary rozwiązań. Oba spełniają 3² + 4² = 25 ✓." }
      ],
      answer: "$(x,y) = (3,4)$ lub $(x,y) = (4,3)$"
    },
    {
      level: "trudne",
      q: "Ile rozwiązań ma równanie $x^2 + 2x + m = 0$ w zależności od parametru $m$?",
      hint: "Zbadaj znak wyróżnika $\\Delta$ w zależności od $m$.",
      steps: [
        { math: "$\\Delta = 2^2 - 4 \\cdot 1 \\cdot m = 4 - 4m = 4(1-m)$", comment: "Obliczamy Δ, traktując m jako parametr: Δ = 4 − 4m. Wyłączamy czynnik 4, aby łatwiej analizować znak." },
        { math: "$\\Delta > 0 \\iff 1 - m > 0 \\iff m < 1$ → dwa rozwiązania", comment: "Gdy m < 1, wyróżnik jest dodatni, co daje dwa różne rzeczywiste pierwiastki." },
        { math: "$\\Delta = 0 \\iff m = 1$ → jedno rozwiązanie (podwójne)", comment: "Dla m = 1 mamy Δ = 0, co daje jeden pierwiastek podwójny: x = −b/(2a) = −1." },
        { math: "$\\Delta < 0 \\iff m > 1$ → brak rozwiązań w $\\mathbb{R}$", comment: "Dla m > 1 wyróżnik jest ujemny – równanie nie ma rozwiązań rzeczywistych. W tym wypadku parabola leży całkowicie powyżej osi OX." }
      ],
      answer: "Dwa dla $m < 1$, jedno dla $m = 1$, zero dla $m > 1$"
    },
    {
      level: "trudne",
      q: "Rozwiąż: $\\frac{x+1}{x-2} + \\frac{x-1}{x+2} = \\frac{8}{x^2-4}$.",
      hint: "Zauważ, że $x^2-4 = (x-2)(x+2)$. Dziedzina: $x \\neq \\pm 2$.",
      steps: [
        { math: "Dziedzina: $x \\neq 2, \\; x \\neq -2$", comment: "Wyznaczamy dziedzinę: mianowniki x−2, x+2 i x²−4 zerują się dla x = 2 i x = −2. Te wartości są wykluczone." },
        { math: "$(x+1)(x+2) + (x-1)(x-2) = 8$", comment: "Mnożymy obie strony przez wspólny mianownik (x−2)(x+2). Każdy ułamek upraszcza się: pierwszy daje (x+1)(x+2), drugi (x−1)(x−2), trzeci po prostu 8." },
        { math: "$x^2+3x+2 + x^2-3x+2 = 8$", comment: "Rozmnażamy nawiasy: (x+1)(x+2) = x² + 3x + 2 oraz (x−1)(x−2) = x² − 3x + 2." },
        { math: "$2x^2 + 4 = 8 \\Rightarrow 2x^2 = 4 \\Rightarrow x^2 = 2$", comment: "Wyrazy z x wzajemnie się znoszą (+3x i −3x). Zostaje 2x² + 4 = 8, upraszczamy." },
        { math: "$x = \\pm\\sqrt{2}$; obie wartości $\\in$ dziedziny ✓", comment: "Równanie x² = 2 daje x = √2 lub x = −√2. Obie wartości są różne od ±2, więc należą do dziedziny." }
      ],
      answer: "$x = \\sqrt{2}$ lub $x = -\\sqrt{2}$"
    }
  ]
},

/* ──────────────────────────────────────────────
   4. FUNKCJE
   ────────────────────────────────────────────── */
"funkcje": {
  title: "Funkcje",
  color: "red",
  icon: "fa-chart-line",
  intro: "Funkcje to serce matematyki maturalnej. Musisz znać funkcję liniową, kwadratową, wykładniczą, logarytmiczną, a także pojęcia: dziedzina, zbiór wartości, miejsca zerowe, monotoniczność, przekształcenia wykresów. Na maturze – praktycznie w każdym arkuszu!",
  examFocus: [
    "Funkcja liniowa – wzór, nachylenie, punkt przecięcia z osiami",
    "Funkcja kwadratowa – postaci (ogólna, kanoniczna, iloczynowa), wierzchołek, oś symetrii",
    "Własności funkcji: dziedzina, zbiór wartości, monotoniczność, parzystość",
    "Przekształcenia wykresów (przesunięcia, odbicia, skalowanie)",
    "Odczytywanie własności z wykresu"
  ],
  theory: [
    {
      title: "Funkcja liniowa",
      text: "Funkcja liniowa $f(x) = ax + b$ ma wykres będący prostą. Współczynnik $a$ to nachylenie (tangent kąta nachylenia do osi $Ox$): $a > 0$ – rosnąca, $a < 0$ – malejąca, $a = 0$ – stała. Współczynnik $b$ to punkt przecięcia z osią $Oy$: $f(0) = b$. Miejsce zerowe: $x_0 = -\\frac{b}{a}$ (dla $a \\neq 0$).",
      formulas: [
        { latex: "f(x) = ax + b", meaning: "Postać kierunkowa prostej" },
        { latex: "x_0 = -\\frac{b}{a}", meaning: "Miejsce zerowe (a ≠ 0)" },
        { latex: "a = \\frac{y_2 - y_1}{x_2 - x_1}", meaning: "Współczynnik kierunkowy z dwóch punktów" },
        { latex: "a_1 \\cdot a_2 = -1", meaning: "Warunek prostopadłości prostych" }
      ]
    },
    {
      title: "Funkcja kwadratowa",
      text: "Funkcja kwadratowa $f(x) = ax^2 + bx + c$ ma wykres – parabolę. Trzy kluczowe postaci: ogólna ($ax^2+bx+c$), kanoniczna ($a(x-p)^2+q$ – od razu wierzchołek!), iloczynowa ($a(x-x_1)(x-x_2)$ – od razu miejsca zerowe!). Wierzchołek: $p = -\\frac{b}{2a}$, $q = -\\frac{\\Delta}{4a}$. Oś symetrii: $x = p$.",
      formulas: [
        { latex: "f(x) = ax^2 + bx + c", meaning: "Postać ogólna" },
        { latex: "f(x) = a(x-p)^2 + q", meaning: "Postać kanoniczna (wierzchołkowa)" },
        { latex: "p = -\\frac{b}{2a}, \\quad q = -\\frac{\\Delta}{4a}", meaning: "Współrzędne wierzchołka" },
        { latex: "f(x) = a(x-x_1)(x-x_2)", meaning: "Postać iloczynowa (Δ > 0)" },
        { latex: "\\Delta = b^2 - 4ac", meaning: "Wyróżnik" }
      ]
    },
    {
      title: "Funkcja wykładnicza i logarytmiczna",
      text: "Funkcja wykładnicza $f(x) = a^x$ (gdzie $a > 0, a \\neq 1$) jest rosnąca dla $a > 1$, malejąca dla $0 < a < 1$. Zawsze przechodzi przez punkt $(0, 1)$. Jej odwrotnością jest funkcja logarytmiczna $g(x) = \\log_a x$ – określona tylko dla $x > 0$. Wykresy tych funkcji są symetryczne względem prostej $y = x$.",
      formulas: [
        { latex: "f(x) = a^x, \\quad a > 0, a \\neq 1", meaning: "Funkcja wykładnicza" },
        { latex: "g(x) = \\log_a x, \\quad x > 0", meaning: "Funkcja logarytmiczna" },
        { latex: "a^{\\log_a x} = x, \\quad \\log_a a^x = x", meaning: "Odwrotność wykładniczej i logarytmicznej" }
      ]
    },
    {
      title: "Przekształcenia wykresów",
      text: "Każdy wykres można przesuwać, odbijać i skalować. Przesunięcie o wektor $[p, q]$: $y = f(x-p) + q$. Odbicie względem osi $Ox$: $y = -f(x)$. Odbicie względem osi $Oy$: $y = f(-x)$. Wartość bezwzględna: $y = |f(x)|$ – odbijamy część pod osią $Ox$ do góry.",
      formulas: [
        { latex: "y = f(x - p) + q", meaning: "Przesunięcie o wektor [p, q]" },
        { latex: "y = -f(x)", meaning: "Odbicie względem osi Ox" },
        { latex: "y = f(-x)", meaning: "Odbicie względem osi Oy" },
        { latex: "y = |f(x)|", meaning: "Odbicie poniżej osi Ox w górę" }
      ]
    },
    {
      title: "Własności funkcji – dziedzina, zbiór wartości, monotoniczność",
      text: "Dziedzina to zbiór argumentów, dla których funkcja jest określona. Ograniczenia dziedziny: mianownik $\\neq 0$, wyrażenie pod $\\sqrt{\\phantom{x}} \\geq 0$, argument logarytmu $> 0$. Zbiór wartości to zbiór wartości, które funkcja przyjmuje. Monotoniczność: funkcja rosnąca – gdy $x_1 < x_2 \\Rightarrow f(x_1) < f(x_2)$; malejąca – odwrotnie. Funkcja różnowartościowa: różne argumenty dają różne wartości, tzn. $f(x_1) = f(x_2) \\Rightarrow x_1 = x_2$.",
      formulas: [
        { latex: "D_f = \\{x \\in \\mathbb{R}: f(x) \\text{ istnieje}\\}", meaning: "Dziedzina funkcji" },
        { latex: "ZW_f = \\{y: y = f(x), x \\in D_f\\}", meaning: "Zbiór wartości" },
        { latex: "x_1 < x_2 \\Rightarrow f(x_1) < f(x_2)", meaning: "Definicja funkcji rosnącej" }
      ]
    },
    {
      title: "Nierówności kwadratowe – metoda wykresu",
      text: "Nierówność $ax^2 + bx + c > 0$ (lub $< 0$, $\\geq 0$, $\\leq 0$) rozwiązujemy graficznie: rysujemy parabolę, wyznaczamy miejsca zerowe, a rozwiązanie odczytujemy z wykresu. Dla $a > 0$: parabola otwarta w górę – wartości dodatnie na zewnątrz zer, ujemne między zerami. Dla $a < 0$: odwrotnie. Gdy $\\Delta < 0$: brak zer, cała parabola po jednej stronie osi $Ox$.",
      formulas: [
        { latex: "ax^2+bx+c > 0, \\; a>0, \\; \\Delta > 0: \\; x \\in (-\\infty, x_1) \\cup (x_2, +\\infty)", meaning: "Nierówność kwadratowa (parabola w górę, odp. na zewnątrz)" },
        { latex: "ax^2+bx+c < 0, \\; a>0, \\; \\Delta > 0: \\; x \\in (x_1, x_2)", meaning: "Nierówność kwadratowa (parabola w górę, odp. między zerami)" }
      ]
    }
  ],
  mistakes: [
    "Mylenie postaci kanonicznej z ogólną – wierzchołek to $(p, q)$, nie $(-p, q)$!",
    "Zapominanie, że $a > 0$ → parabola otwarta w górę, $a < 0$ → w dół",
    "Przesunięcie $f(x-3)$ to przesunięcie w PRAWO (nie w lewo!)",
    "Dziedzina $\\log_a x$: tylko $x > 0$ (logarytm z zera i liczb ujemnych nie istnieje)",
    "Przy odczytywaniu z wykresu: oś $x$ to argumenty, oś $y$ to wartości – nie odwrotnie"
  ],
  strategy: [
    "Rozpoznaj typ funkcji i wybierz najlepszą postać do zadania",
    "Funkcja kwadratowa: postać kanoniczna do wierzchołka, iloczynowa do zer",
    "Dla przekształceń – stosuj kolejno: przesuń, skaluj, odbij",
    "Zawsze sprawdź dziedzinę i zakres wartości",
    "Narysuj szkic wykresu – wizualizacja pomaga!"
  ],
  tasks: [
    {
      level: "łatwe",
      q: "Podaj współrzędne wierzchołka paraboli $f(x) = 2(x-3)^2 + 5$.",
      hint: "To postać kanoniczna $a(x-p)^2 + q$.",
      steps: [
        { math: "Postać kanoniczna: $f(x) = a(x-p)^2 + q$, tutaj $a = 2$, $p = 3$, $q = 5$", comment: "Rozpoznajemy postać kanoniczną (wierzchołkową) funkcji kwadratowej. Wartości p i q odczytujemy bezpośrednio ze wzoru." },
        { math: "Wierzchołek: $W = (p, q) = (3, 5)$", comment: "Wierzchołek paraboli to punkt (p, q). Ponieważ a = 2 > 0, ramiona paraboli są skierowane w górę, więc wierzchołek jest punktem minimum." }
      ],
      answer: "$(3, 5)$"
    },
    {
      level: "łatwe",
      q: "Wyznacz miejsce zerowe funkcji $f(x) = 3x - 9$.",
      hint: "Rozwiąż $f(x) = 0$.",
      steps: [
        { math: "$3x - 9 = 0 \\Rightarrow 3x = 9$", comment: "Miejsce zerowe to argument x, dla którego wartość funkcji wynosi 0. Przyrównujemy wzór do zera i rozwiązujemy równanie liniowe." },
        { math: "$x = 3$", comment: "Dzielimy obie strony przez 3. Miejsce zerowe to x₀ = 3 – w tym punkcie wykres przecina oś OX." }
      ],
      answer: "$x_0 = 3$"
    },
    {
      level: "łatwe",
      q: "Podaj dziedzinę funkcji $f(x) = \\sqrt{x - 2}$.",
      hint: "Wyrażenie pod pierwiastkiem musi być $\\geq 0$.",
      steps: [
        { math: "$x - 2 \\geq 0$", comment: "Pierwiastek kwadratowy (parzystego stopnia) jest określony tylko dla argumentów nieujemnych. Stawiamy warunek na wyrażenie podpierwiastkowe." },
        { math: "$x \\geq 2$, czyli $D = [2, +\\infty)$", comment: "Rozwiązujemy nierówność: x ≥ 2. Dziedzina to przedział domknięty od 2 do nieskończoności (2 należy do dziedziny, bo √0 = 0)." }
      ],
      answer: "$D = [2, +\\infty)$"
    },
    {
      level: "średnie",
      q: "Wyznacz postać kanoniczną funkcji $f(x) = x^2 - 6x + 5$.",
      hint: "Oblicz $p = -\\frac{b}{2a}$ i $q = f(p)$.",
      steps: [
        { math: "$p = -\\frac{b}{2a} = -\\frac{-6}{2 \\cdot 1} = 3$", comment: "Współrzędna x wierzchołka paraboli: p = −b/(2a). Mamy a = 1, b = −6, więc p = 6/2 = 3." },
        { math: "$q = f(3) = 9 - 18 + 5 = -4$", comment: "Współrzędna y wierzchołka: obliczamy f(p) = f(3) = 3² − 6·3 + 5 = 9 − 18 + 5 = −4. Alternatywnie: q = −Δ/(4a) = −(36−20)/4 = −4." },
        { math: "$f(x) = (x-3)^2 - 4$", comment: "Zapisujemy w postaci kanonicznej f(x) = a(x−p)² + q = 1·(x−3)² + (−4). Z tej postaci od razu widać: wierzchołek (3, −4), oś symetrii x = 3, minimum = −4." }
      ],
      answer: "$f(x) = (x-3)^2 - 4$"
    },
    {
      level: "średnie",
      q: "Funkcja liniowa przechodzi przez punkty $A(1, 3)$ i $B(4, 9)$. Wyznacz jej wzór.",
      hint: "Oblicz $a = \\frac{y_2-y_1}{x_2-x_1}$, potem $b$.",
      steps: [
        { math: "$a = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{9 - 3}{4 - 1} = \\frac{6}{3} = 2$", comment: "Współczynnik kierunkowy to iloraz przyrostów: różnica wartości y podzielona przez różnicę argumentów x. Interpretacja: na każdą jednostkę w prawo wartość rośnie o 2." },
        { math: "$3 = 2 \\cdot 1 + b \\Rightarrow b = 1$", comment: "Podstawiamy współrzędne jednego z punktów (np. A(1,3)) do wzoru y = ax + b i wyznaczamy wyraz wolny b." },
        { math: "$f(x) = 2x + 1$", comment: "Wzór funkcji liniowej. Sprawdzenie: f(1) = 2+1 = 3 ✓, f(4) = 8+1 = 9 ✓. Obie punkty leżą na prostej." }
      ],
      answer: "$f(x) = 2x + 1$"
    },
    {
      level: "średnie",
      q: "Wyznacz zbiór wartości funkcji $f(x) = -x^2 + 4x - 1$.",
      hint: "Ramiona w dół → $q$ to wartość największa.",
      steps: [
        { math: "$p = -\\frac{4}{2 \\cdot (-1)} = 2$", comment: "Obliczamy współrzędną x wierzchołka: p = −b/(2a) = −4/(−2) = 2." },
        { math: "$q = f(2) = -4 + 8 - 1 = 3$", comment: "Wartość w wierzchołku: f(2) = −(2²) + 4·2 − 1 = −4 + 8 − 1 = 3." },
        { math: "$a = -1 < 0$, więc $ZW = (-\\infty, 3]$", comment: "Ponieważ a < 0, ramiona paraboli skierowane w dół. Wierzchołek jest punktem MAXIMUM. Funkcja przyjmuje wszystkie wartości od −∞ do 3 (włącznie)." }
      ],
      answer: "$ZW = (-\\infty, 3]$"
    },
    {
      level: "średnie",
      q: "Wykres funkcji $f(x) = x^2$ przesunięto o wektor $\\vec{v} = [2, -3]$. Podaj wzór nowej funkcji.",
      hint: "Przesunięcie: $y = f(x-p) + q = (x-2)^2 - 3$.",
      steps: [
        { math: "Przesunięcie w prawo o 2: zamieniamy $x$ na $x - 2$", comment: "Wektor [2, −3] oznacza przesunięcie o 2 w prawo (kierunek x) i o 3 w dół (kierunek y). Przesunięcie w prawo → odejmujemy od argumentu." },
        { math: "Przesunięcie w dół o 3: dodajemy $-3$ do wartości", comment: "Przesunięcie w dół → odejmujemy od wartości funkcji. Połączenie obu przekształceń daje nowy wzór." },
        { math: "$g(x) = (x-2)^2 - 3$", comment: "Nowa funkcja to f(x−2) − 3 = (x−2)² − 3. Wierzchołek przesunął się z (0,0) do (2,−3)." }
      ],
      answer: "$g(x) = (x-2)^2 - 3$"
    },
    {
      level: "trudne",
      q: "Dla jakich wartości $m$ funkcja $f(x) = x^2 - 2mx + m + 2$ ma dwa miejsca zerowe, oba dodatnie?",
      hint: "Warunki: $\\Delta > 0$, $x_1 + x_2 > 0$, $x_1 \\cdot x_2 > 0$.",
      steps: [
        { math: "$\\Delta = 4m^2 - 4(m+2) = 4(m^2 - m - 2) > 0$", comment: "Warunek 1: dwa RÓŻNE miejsca zerowe, czyli Δ > 0. Obliczamy Δ = b² − 4ac = 4m² − 4(m+2)." },
        { math: "$(m-2)(m+1) > 0 \\Rightarrow m < -1 \\;\\lor\\; m > 2$", comment: "Rozkładamy m² − m − 2 = (m−2)(m+1). Iloczyn dodatni, gdy oba czynniki mają ten sam znak." },
        { math: "Viète: $x_1 + x_2 = 2m > 0 \\Rightarrow m > 0$", comment: "Warunek 2: oba pierwiastki dodatnie → ich suma musi być dodatnia. Z Viète'a: x₁ + x₂ = −b/a = 2m." },
        { math: "Viète: $x_1 \\cdot x_2 = m + 2 > 0 \\Rightarrow m > -2$", comment: "Warunek 3: oba dodatnie → ich iloczyn też musi być dodatni (+ · + = +). Z Viète'a: x₁ · x₂ = c/a = m + 2." },
        { math: "Część wspólna: $(m < -1 \\lor m > 2) \\;\\cap\\; m > 0 \\;\\cap\\; m > -2 = m > 2$", comment: "Wyznaczamy część wspólną wszystkich trzech warunków. Jedynym spójnym przedziałem jest m > 2." }
      ],
      answer: "$m \\in (2, +\\infty)$"
    },
    {
      level: "trudne",
      q: "Wyznacz dziedzinę funkcji $f(x) = \\log_2(x^2 - 3x + 2)$.",
      hint: "Argument logarytmu musi być $> 0$.",
      steps: [
        { math: "$x^2 - 3x + 2 > 0$", comment: "Logarytm jest określony tylko dla argumentów ściśle dodatnich. Stawiamy nierówność: wyrażenie pod logarytmem > 0." },
        { math: "$(x-1)(x-2) > 0$", comment: "Rozkładamy trójmian na czynniki: szukamy dwóch liczb o sumie 3 i iloczynie 2 → to 1 i 2." },
        { math: "Parabola $y = x^2 - 3x + 2$ ma $a = 1 > 0$ i pierwiastki 1, 2", comment: "Rysujemy szkic: parabola otwarta ku górze, zeruje się w x = 1 i x = 2." },
        { math: "$D = (-\\infty, 1) \\cup (2, +\\infty)$", comment: "Nierówność > 0 jest spełniona na zewnątrz pierwiastków (parabola powyżej osi OX). Przedziały otwarte, bo logarytm z 0 nie istnieje." }
      ],
      answer: "$D = (-\\infty, 1) \\cup (2, +\\infty)$"
    },
    {
      level: "trudne",
      q: "Najmniejsza wartość funkcji $f(x) = x^2 - 4x + 5$ w przedziale $[0, 5]$ jest równa?",
      hint: "Znajdź wierzchołek; sprawdź czy należy do przedziału.",
      steps: [
        { math: "$p = -\\frac{-4}{2} = 2 \\in [0, 5]$", comment: "Wierzchołek paraboli: p = 2. Sprawdzamy, czy leży w rozpatrywanym przedziale [0, 5] – tak, leży." },
        { math: "$q = f(2) = 4 - 8 + 5 = 1$", comment: "Obliczamy wartość w wierzchołku: f(2) = 1. Ponieważ a = 1 > 0, wierzchołek jest minimum globalnym paraboli." },
        { math: "Sprawdzamy krańce: $f(0) = 5$, $f(5) = 25 - 20 + 5 = 10$", comment: "Dla pewności obliczamy wartości na krańcach przedziału. Obie są większe od f(2) = 1." },
        { math: "Najmniejsza wartość: $f_{\\min} = f(2) = 1$", comment: "Minimum w przedziale [0, 5] wynosi 1 i jest osiągane dla x = 2. Gdyby wierzchołek leżał poza przedziałem, minimum byłoby na krańcu bliższym wierzchołkowi." }
      ],
      answer: "$f_{\\min} = 1$"
    }
  ]
},

/* ──────────────────────────────────────────────
   5. CIĄGI
   ────────────────────────────────────────────── */
"ciagi": {
  title: "Ciągi",
  color: "yellow",
  icon: "fa-list-ol",
  intro: "Ciągi arytmetyczne i geometryczne to klasyka matury. Musisz znać wzory na $n$-ty wyraz, sumę $n$ wyrazów, własności (monotoniczność, ograniczoność) i umieć je stosować w zadaniach tekstowych i z procentami.",
  examFocus: [
    "Ciąg arytmetyczny – wzór na $n$-ty wyraz i sumę",
    "Ciąg geometryczny – wzór na $n$-ty wyraz i sumę",
    "Własność trzech kolejnych wyrazów ciągu arytmetycznego/geometrycznego",
    "Zadania z procentami (procent składany = ciąg geometryczny!)",
    "Monotoniczność ciągu (rosnący/malejący)"
  ],
  theory: [
    {
      title: "Ciąg arytmetyczny",
      text: "Ciąg arytmetyczny to taki, w którym różnica między kolejnymi wyrazami jest stała: $a_{n+1} - a_n = r$ (gdzie $r$ to różnica). Jeśli $r > 0$ – ciąg jest rosnący, $r < 0$ – malejący, $r = 0$ – stały. Trzy kolejne wyrazy ciągu arytmetycznego spełniają: środkowy = średnia arytmetyczna skrajnych.",
      formulas: [
        { latex: "a_n = a_1 + (n-1)r", meaning: "Wzór na n-ty wyraz ciągu arytmetycznego" },
        { latex: "S_n = \\frac{(a_1 + a_n) \\cdot n}{2}", meaning: "Suma n wyrazów ciągu arytmetycznego" },
        { latex: "S_n = \\frac{2a_1 + (n-1)r}{2} \\cdot n", meaning: "Suma (alternatywna postać)" },
        { latex: "a_n = \\frac{a_{n-1} + a_{n+1}}{2}", meaning: "Własność trzech kolejnych wyrazów" }
      ]
    },
    {
      title: "Ciąg geometryczny",
      text: "Ciąg geometryczny to taki, w którym iloraz kolejnych wyrazów jest stały: $\\frac{a_{n+1}}{a_n} = q$ (gdzie $q$ to iloraz, $q \\neq 0$). Dla $q > 1$ i $a_1 > 0$ – ciąg rosnący. Trzy kolejne wyrazy: środkowy do kwadratu = iloczyn skrajnych. Suma nieskończonego ciągu geometrycznego (dla $|q| < 1$): $S = \\frac{a_1}{1-q}$.",
      formulas: [
        { latex: "a_n = a_1 \\cdot q^{n-1}", meaning: "Wzór na n-ty wyraz ciągu geometrycznego" },
        { latex: "S_n = a_1 \\cdot \\frac{1 - q^n}{1 - q}", meaning: "Suma n wyrazów (q ≠ 1)" },
        { latex: "a_n^2 = a_{n-1} \\cdot a_{n+1}", meaning: "Własność trzech kolejnych wyrazów" },
        { latex: "S_{\\infty} = \\frac{a_1}{1-q}, \\quad |q| < 1", meaning: "Suma nieskończonego ciągu geometrycznego" }
      ]
    },
    {
      title: "Procent składany",
      text: "Procent składany to zastosowanie ciągu geometrycznego w finansach. Jeśli kapitał początkowy to $K$, a roczna stopa procentowa $p\\%$, to po $n$ latach kapitał wynosi $K_n = K \\cdot \\left(1 + \\frac{p}{100}\\right)^n$. To jest ciąg geometryczny z $q = 1 + \\frac{p}{100}$.",
      formulas: [
        { latex: "K_n = K \\cdot \\left(1 + \\frac{p}{100}\\right)^n", meaning: "Kapitał po n latach (procent składany)" }
      ]
    },
    {
      title: "Monotoniczność i ograniczoność ciągów",
      text: "Ciąg jest rosnący, gdy $a_{n+1} > a_n$ dla każdego $n$, i malejący, gdy $a_{n+1} < a_n$. Ciąg arytmetyczny jest rosnący gdy $r > 0$, malejący gdy $r < 0$. Ciąg geometryczny z $a_1 > 0$: rosnący gdy $q > 1$, malejący gdy $0 < q < 1$, naprzemienny gdy $q < 0$. Ciąg ograniczony ma wyraz największy (kres górny) i najmniejszy (kres dolny). Ciąg monotoniczny i ograniczony jest zbieżny.",
      formulas: [
        { latex: "a_{n+1} > a_n \\text{ dla każdego } n \\Rightarrow \\text{ciąg rosnący}", meaning: "Definicja ciągu rosnącego" },
        { latex: "a_{n+1} - a_n > 0 \\Rightarrow \\text{rosnący}", meaning: "Sprawdzanie monotoniczności przez różnicę" },
        { latex: "\\frac{a_{n+1}}{a_n} > 1 \\;(a_n > 0) \\Rightarrow \\text{rosnący}", meaning: "Sprawdzanie monotoniczności przez iloraz" }
      ]
    },
    {
      title: "Ciąg rekurencyjny i wzór ogólny",
      text: "Ciąg rekurencyjny definiujemy podając pierwszy wyraz i regułę obliczania następnego na podstawie poprzednich. Na maturze najczęstsze: $a_{n+1} = a_n + r$ (arytmetyczny), $a_{n+1} = a_n \\cdot q$ (geometryczny). Ważna umiejętność: przejście ze wzoru rekurencyjnego na ogólny i odwrotnie. Ciąg zadany warunkami $a_1 = 2$, $a_{n+1} = a_n + 3$ to ciąg arytmetyczny z $r = 3$, a więc $a_n = 2 + (n-1) \\cdot 3 = 3n - 1$.",
      formulas: [
        { latex: "a_{n+1} = a_n + r \\Rightarrow a_n = a_1 + (n-1)r", meaning: "Z rekurencyjnego na ogólny (arytmetyczny)" },
        { latex: "a_{n+1} = a_n \\cdot q \\Rightarrow a_n = a_1 \\cdot q^{n-1}", meaning: "Z rekurencyjnego na ogólny (geometryczny)" }
      ]
    }
  ],
  mistakes: [
    "Mylenie $r$ (różnica – arytmetyczny) z $q$ (iloraz – geometryczny)",
    "We wzorze $a_n = a_1 + (n-1)r$ jest $(n-1)$, nie $n$!",
    "Suma ciągu geometrycznego: $(1 - q^n)$, nie $(1 - q)^n$",
    "Procent składany: iloraz to $1 + \\frac{p}{100}$, nie $\\frac{p}{100}$",
    "Ciąg geometryczny o zmiennych znakach: $q < 0$ – nie jest monotoniczny!"
  ],
  strategy: [
    "Zidentyfikuj typ ciągu (arytmetyczny vs geometryczny)",
    "Arytmetyczny: szukaj stałej różnicy $r$",
    "Geometryczny: szukaj stałego ilorazu $q$",
    "Trzy kolejne wyrazy → użyj własności (średnia lub iloczyn)",
    "Procenty → ciąg geometryczny z $q = 1 + \\frac{p}{100}$"
  ],
  tasks: [
    {
      level: "łatwe",
      q: "Ciąg arytmetyczny ma $a_1 = 3$ i $r = 4$. Oblicz $a_{10}$.",
      hint: "Użyj wzoru $a_n = a_1 + (n-1)r$.",
      steps: [
        { math: "$a_{10} = a_1 + (n-1) \\cdot r = 3 + (10-1) \\cdot 4$", comment: "Podstawiamy do wzoru na n-ty wyraz ciągu arytmetycznego: a₁ = 3, n = 10, r = 4." },
        { math: "$= 3 + 9 \\cdot 4 = 3 + 36 = 39$", comment: "Obliczamy: 9 razy 4 to 36, plus pierwszy wyraz 3 daje 39. W ciągu arytmetycznym każdy wyraz jest o r większy od poprzedniego." }
      ],
      answer: "$a_{10} = 39$"
    },
    {
      level: "łatwe",
      q: "Oblicz sumę dziesięciu pierwszych wyrazów ciągu arytmetycznego, w którym $a_1 = 2$ i $a_{10} = 20$.",
      hint: "Użyj wzoru $S_n = \\frac{(a_1+a_n) \\cdot n}{2}$.",
      steps: [
        { math: "$S_{10} = \\frac{(a_1 + a_{10}) \\cdot 10}{2} = \\frac{(2 + 20) \\cdot 10}{2}$", comment: "Korzystamy ze wzoru na sumę n wyrazów ciągu arytmetycznego. Zaletą tego wzoru jest to, że nie musimy znać różnicy r – wystarczą pierwszy i ostatni wyraz." },
        { math: "$= \\frac{22 \\cdot 10}{2} = \\frac{220}{2} = 110$", comment: "Obliczamy: 22 · 10 = 220, dzielimy przez 2 i otrzymujemy 110." }
      ],
      answer: "$S_{10} = 110$"
    },
    {
      level: "łatwe",
      q: "Ciąg geometryczny: $a_1 = 5$, $q = 2$. Oblicz $a_5$.",
      hint: "Użyj wzoru $a_n = a_1 \\cdot q^{n-1}$.",
      steps: [
        { math: "$a_5 = a_1 \\cdot q^{n-1} = 5 \\cdot 2^{4} = 5 \\cdot 16 = 80$", comment: "W ciągu geometrycznym n-ty wyraz to pierwszy wyraz pomnożony przez q do potęgi (n−1). Uwaga: to q do potęgi n−1 (nie n!), bo a₁ = a₁ · q⁰." }
      ],
      answer: "$a_5 = 80$"
    },
    {
      level: "średnie",
      q: "Trzy kolejne wyrazy ciągu arytmetycznego to $x-1$, $2x+1$, $4x$. Wyznacz $x$.",
      hint: "Środkowy = średnia arytmetyczna skrajnych.",
      steps: [
        { math: "$2(2x+1) = (x-1) + 4x$", comment: "W ciągu arytmetycznym środkowy wyraz jest średnią arytmetyczną skrajnych, czyli 2·(środk.) = suma skrajnych. To kluczowa własność!" },
        { math: "$4x + 2 = 5x - 1$", comment: "Rozwijamy obie strony: lewa to 4x + 2, prawa to x − 1 + 4x = 5x − 1." },
        { math: "$x = 3$", comment: "Przenosimy: 4x − 5x = −1 − 2, czyli −x = −3, stąd x = 3. Sprawdzenie: wyrazy to 2, 7, 12 – rzeczywiście r = 5 ✓." }
      ],
      answer: "$x = 3$"
    },
    {
      level: "średnie",
      q: "Oblicz sumę nieskończonego ciągu geometrycznego: $8, 4, 2, 1, \\ldots$",
      hint: "Wyznacz $q$ i użyj wzoru $S = \\frac{a_1}{1-q}$.",
      steps: [
        { math: "$q = \\frac{4}{8} = \\frac{1}{2}$; $|q| = \\frac{1}{2} < 1$ ✓", comment: "Wyznaczamy iloraz dzieląc drugi wyraz przez pierwszy: q = 4/8 = 1/2. Suma nieskończonego ciągu geom. istnieje tylko gdy |q| < 1." },
        { math: "$S = \\frac{a_1}{1 - q} = \\frac{8}{1 - \\frac{1}{2}} = \\frac{8}{\\frac{1}{2}} = 16$", comment: "Stosujemy wzór na sumę nieskończonego ciągu geometrycznego zbieżnego. Dzielenie przez 1/2 to mnożenie przez 2, więc 8 · 2 = 16." }
      ],
      answer: "$S = 16$"
    },
    {
      level: "średnie",
      q: "Kwota $10\\,000$ zł została zainwestowana na $3\\%$ rocznie (procent składany). Ile wyniesie po 5 latach?",
      hint: "Procent składany: $K_n = K \\cdot (1 + p/100)^n$.",
      steps: [
        { math: "$K_5 = 10000 \\cdot (1 + 0{,}03)^5 = 10000 \\cdot 1{,}03^5$", comment: "Procent składany tworzy ciąg geometryczny o ilorazie q = 1 + p/100 = 1,03. Każdego roku kwota jest mnożona przez 1,03 (rośnie o 3%)." },
        { math: "$1{,}03^5 \\approx 1{,}15927$", comment: "Obliczamy piątą potęgę: 1,03² = 1,0609; 1,03³ ≈ 1,0927; 1,03⁴ ≈ 1,1255; 1,03⁵ ≈ 1,1593. Kalkulatorem lub mnożąc iteracyjnie." },
        { math: "$K_5 \\approx 10000 \\cdot 1{,}15927 \\approx 11\\,592{,}74$ zł", comment: "Po 5 latach kapitał wzrósł z 10 000 zł do ok. 11 593 zł – zysk to prawie 1 593 zł. To więcej niż 5 × 3% = 15%, bo «procent od procentu» się kumuluje." }
      ],
      answer: "Około $11\\,593$ zł"
    },
    {
      level: "średnie",
      q: "W ciągu arytmetycznym $a_5 = 13$ i $a_{12} = 34$. Wyznacz $a_1$ i $r$.",
      hint: "Ustaw układ równań z wzoru na $n$-ty wyraz.",
      steps: [
        { math: "$a_5 = a_1 + 4r = 13$ oraz $a_{12} = a_1 + 11r = 34$", comment: "Zapisujemy dwa równania na podstawie wzoru aₙ = a₁ + (n−1)r. Otrzymujemy układ dwóch równań z dwiema niewiadomymi (a₁ i r)." },
        { math: "Odejmując: $(a_1 + 11r) - (a_1 + 4r) = 34 - 13 \\Rightarrow 7r = 21$", comment: "Eliminujemy a₁ odejmując pierwsze równanie od drugiego. Zostaje 7r = 21." },
        { math: "$r = 3$, $a_1 = 13 - 4 \\cdot 3 = 1$", comment: "Stąd r = 3. Podstawiamy z powrotem do pierwszego równania: a₁ = 13 − 12 = 1. Sprawdzenie: a₅ = 1 + 4·3 = 13 ✓, a₁₂ = 1 + 11·3 = 34 ✓." }
      ],
      answer: "$a_1 = 1$, $r = 3$"
    },
    {
      level: "trudne",
      q: "Suma trzech kolejnych wyrazów ciągu geometrycznego wynosi 21, a ich iloczyn 216. Wyznacz te wyrazy.",
      hint: "Niech wyrazy to $\\frac{a}{q}, a, aq$.",
      steps: [
        { math: "Niech wyrazy to $\\frac{a}{q}, a, aq$. Iloczyn: $a^3 = 216 \\Rightarrow a = 6$", comment: "Sprytny zapis: trzy kolejne wyrazy ciągu geom. jako a/q, a, aq. Ich iloczyn (a/q)·a·(aq) = a³ (q się skraca!). Stąd a = ∛216 = 6." },
        { math: "Suma: $\\frac{6}{q} + 6 + 6q = 21 \\Rightarrow \\frac{6}{q} + 6q = 15$", comment: "Podstawiamy a = 6 do warunku na sumę. Odejmujemy 6 od obu stron." },
        { math: "Mnożymy przez $q$: $6 + 6q^2 = 15q \\Rightarrow 6q^2 - 15q + 6 = 0$", comment: "Eliminujemy mianownik mnożąc przez q (zakładamy q ≠ 0). Przenosimy wszystko na jedną stronę." },
        { math: "$2q^2 - 5q + 2 = 0 \\Rightarrow q = 2$ lub $q = \\frac{1}{2}$", comment: "Dzielimy przez 3 i rozwiązujemy: Δ = 25 − 16 = 9, q = (5±3)/4. Dla q = 2: wyrazy 3, 6, 12. Dla q = 1/2: wyrazy 12, 6, 3." }
      ],
      answer: "$3, 6, 12$ lub $12, 6, 3$"
    },
    {
      level: "trudne",
      q: "Wykaż, że $\\sum_{k=1}^{n} (2k-1) = n^2$.",
      hint: "To suma ciągu arytmetycznego $1, 3, 5, \\ldots$",
      steps: [
        { math: "Ciąg $1, 3, 5, \\ldots, (2n-1)$: $a_1 = 1$, $r = 2$, $a_n = 2n - 1$", comment: "Rozpoznajemy, że 2k−1 dla k = 1, 2, ..., n generuje ciąg kolejnych liczb nieparzystych. To ciąg arytmetyczny o a₁ = 1 i różnicy r = 2." },
        { math: "$S_n = \\frac{(a_1 + a_n) \\cdot n}{2} = \\frac{(1 + (2n-1)) \\cdot n}{2} = \\frac{2n \\cdot n}{2} = n^2$ ∎", comment: "Stosujemy wzór na sumę ciągu arytmetycznego. Suma pierwszego i ostatniego wyrazu: 1 + (2n−1) = 2n. Mnożymy przez n/2 = n²/1. Wniosek: suma n kolejnych liczb nieparzystych począwszy od 1 jest zawsze kwadratem." }
      ],
      answer: "$\\sum_{k=1}^{n}(2k-1) = n^2$ ∎"
    },
    {
      level: "trudne",
      q: "Cena samochodu spada co roku o $15\\%$. Po ilu pełnych latach cena spadnie poniżej połowy wartości początkowej?",
      hint: "Ciąg geometryczny z $q = 0{,}85$. Szukamy $n$: $0{,}85^n < 0{,}5$.",
      steps: [
        { math: "$0{,}85^n < 0{,}5$", comment: "Po n latach wartość to (wartość_początkowa) · 0,85ⁿ. Spadek o 15% rocznie = mnożenie przez 0,85. Szukamy n, dla którego zostaje poniżej 50%." },
        { math: "$n \\cdot \\ln(0{,}85) < \\ln(0{,}5)$", comment: "Logarytmujemy obie strony. Ponieważ ln(0,85) < 0, przy dzieleniu przez liczbę ujemną odwracamy nierówność." },
        { math: "$n > \\frac{\\ln(0{,}5)}{\\ln(0{,}85)} = \\frac{-0{,}6931}{-0{,}1625} \\approx 4{,}27$", comment: "Dzielimy: minus/minus = plus. Wynik ≈ 4,27, ale szukamy PEŁNYCH lat, więc zaokrąglamy w górę do 5." },
        { math: "Odpowiedź: po 5 pełnych latach", comment: "Sprawdzenie: 0,85⁴ ≈ 0,522 > 0,5; 0,85⁵ ≈ 0,444 < 0,5. Rzeczywiście po 5 latach samochód jest wart mniej niż połowę ceny." }
      ],
      answer: "Po $5$ pełnych latach"
    }
  ]
},

/* ──────────────────────────────────────────────
   6. TRYGONOMETRIA
   ────────────────────────────────────────────── */
"trygonometria": {
  title: "Trygonometria",
  color: "orange",
  icon: "fa-wave-square",
  intro: "Trygonometria na maturze podstawowej obejmuje funkcje trygonometryczne kąta ostrego (sinus, cosinus, tangens), tożsamości trygonometryczne oraz zastosowania w planimetrii (twierdzenia sinusów i cosinusów). To dział, który łączy się z geometrią.",
  examFocus: [
    "Definicje sin, cos, tg w trójkącie prostokątnym",
    "Wartości funkcji trygonometrycznych dla kątów 30°, 45°, 60°",
    "Jedynka trygonometryczna: $\\sin^2 \\alpha + \\cos^2 \\alpha = 1$",
    "Twierdzenie sinusów i cosinusów",
    "Obliczanie elementów trójkąta za pomocą trygonometrii"
  ],
  theory: [
    {
      title: "Funkcje trygonometryczne kąta ostrego",
      text: "W trójkącie prostokątnym o kącie ostrym $\\alpha$: sinus to stosunek przyprostokątnej naprzeciw kąta do przeciwprostokątnej, cosinus to stosunek przyprostokątnej przyległej do przeciwprostokątnej, tangens to stosunek sinusa do cosinusa (czyli przyprostokątnej naprzeciw do przyprostokątnej przyległej).",
      formulas: [
        { latex: "\\sin \\alpha = \\frac{a}{c} = \\frac{\\text{naprzeciwko}}{\\text{przeciwprostokątna}}", meaning: "Definicja sinusa" },
        { latex: "\\cos \\alpha = \\frac{b}{c} = \\frac{\\text{przy kącie}}{\\text{przeciwprostokątna}}", meaning: "Definicja cosinusa" },
        { latex: "\\operatorname{tg} \\alpha = \\frac{\\sin \\alpha}{\\cos \\alpha} = \\frac{a}{b}", meaning: "Definicja tangensa" }
      ]
    },
    {
      title: "Wartości trygonometryczne kątów szczególnych",
      text: "Musisz znać na pamięć wartości dla kątów $30°$, $45°$, $60°$ (i $0°$, $90°$). Zapamiętaj wzorzec sinusa: $0, \\frac{1}{2}, \\frac{\\sqrt{2}}{2}, \\frac{\\sqrt{3}}{2}, 1$ – cosinus to ten sam ciąg w odwrotnej kolejności.",
      formulas: [
        { latex: "\\sin 30° = \\frac{1}{2}, \\quad \\cos 30° = \\frac{\\sqrt{3}}{2}, \\quad \\operatorname{tg} 30° = \\frac{\\sqrt{3}}{3}", meaning: "Kąt 30°" },
        { latex: "\\sin 45° = \\frac{\\sqrt{2}}{2}, \\quad \\cos 45° = \\frac{\\sqrt{2}}{2}, \\quad \\operatorname{tg} 45° = 1", meaning: "Kąt 45°" },
        { latex: "\\sin 60° = \\frac{\\sqrt{3}}{2}, \\quad \\cos 60° = \\frac{1}{2}, \\quad \\operatorname{tg} 60° = \\sqrt{3}", meaning: "Kąt 60°" }
      ]
    },
    {
      title: "Tożsamości trygonometryczne",
      text: "Jedynka trygonometryczna to najważniejsza tożsamość: pozwala wyznaczyć sinus znając cosinus i odwrotnie. Tangens wyrażamy jako iloraz sinusa i cosinusa. Te tożsamości pozwalają uprościć wiele wyrażeń i obliczyć nieznane wartości.",
      formulas: [
        { latex: "\\sin^2 \\alpha + \\cos^2 \\alpha = 1", meaning: "Jedynka trygonometryczna" },
        { latex: "\\operatorname{tg} \\alpha = \\frac{\\sin \\alpha}{\\cos \\alpha}", meaning: "Tangens przez sinus i cosinus" },
        { latex: "1 + \\operatorname{tg}^2 \\alpha = \\frac{1}{\\cos^2 \\alpha}", meaning: "Tożsamość z tangensem" }
      ]
    },
    {
      title: "Twierdzenia sinusów i cosinusów",
      text: "Twierdzenie sinusów: $\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} = 2R$ – stosujemy, gdy znamy kąt i bok naprzeciwko niego. Twierdzenie cosinusów: $a^2 = b^2 + c^2 - 2bc\\cos A$ – uogólnienie twierdzenia Pitagorasa; stosujemy, gdy znamy dwa boki i kąt między nimi (lub trzy boki).",
      formulas: [
        { latex: "\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} = 2R", meaning: "Twierdzenie sinusów" },
        { latex: "a^2 = b^2 + c^2 - 2bc \\cos A", meaning: "Twierdzenie cosinusów" }
      ]
    },
    {
      title: "Pole trójkąta – wzory trygonometryczne",
      text: "Mając dwa boki i kąt między nimi, pole trójkąta obliczamy ze wzoru $P = \\frac{1}{2}ab\\sin C$. To jeden z najczęściej używanych wzorów na maturze. Z twierdzenia sinusów wynika też wzór $P = \\frac{abc}{4R}$ (R – promień okręgu opisanego). Pole trójkąta równobocznego o boku $a$: $P = \\frac{a^2\\sqrt{3}}{4}$.",
      formulas: [
        { latex: "P = \\frac{1}{2}ab\\sin C", meaning: "Pole trójkąta (dwa boki i kąt między nimi)" },
        { latex: "P = \\frac{abc}{4R}", meaning: "Pole trójkąta (trzy boki i promień okręgu opisanego)" },
        { latex: "P = \\frac{a^2\\sqrt{3}}{4}", meaning: "Pole trójkąta równobocznego" },
        { latex: "P = \\sqrt{s(s-a)(s-b)(s-c)}", meaning: "Wzór Herona (s = połowa obwodu)" }
      ]
    }
  ],
  mistakes: [
    "Mylenie sinusa z cosinusem – sin to bok naprzeciwko kąta, cos to bok przy kącie",
    "Zapominanie wartości: $\\sin 30° = \\frac{1}{2}$, nie $\\frac{\\sqrt{3}}{2}$ (to $\\cos 30°$!)",
    "W twierdzeniu cosinusów: kąt $A$ jest NAPRZECIWKO boku $a$",
    "Jedynka trygonometryczna: $\\sin^2 + \\cos^2 = 1$, nie jakaś inna wartość",
    "Tangens nie jest określony dla $90°$ (dzielenie przez zero)"
  ],
  strategy: [
    "Zidentyfikuj, czego szukasz: boku czy kąta",
    "Znasz kąt + bok naprzeciwko → twierdzenie sinusów",
    "Znasz 2 boki + kąt między nimi → twierdzenie cosinusów",
    "Znasz 3 boki → twierdzenie cosinusów (na kąt)",
    "Trójkąt prostokątny → definicje sin/cos/tg bezpośrednio"
  ],
  tasks: [
    {
      level: "łatwe",
      q: "W trójkącie prostokątnym przyprostokątne mają długości 3 i 4. Oblicz $\\sin \\alpha$, gdzie $\\alpha$ jest kątem przyległym do boku o długości 4.",
      hint: "Najpierw oblicz przeciwprostokątną (Pitagoras), potem $\\sin = \\frac{\\text{naprzeciwko}}{\\text{przeciwprostokątna}}$.",
      steps: [
        { math: "$c = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$", comment: "Obliczamy długość przeciwprostokątnej z twierdzenia Pitagorasa. Trójkąt 3-4-5 to jeden z najczęstszych trójkątów pitagorejskich." },
        { math: "Bok naprzeciwko $\\alpha$ ma długość $3$", comment: "Identyfikujemy bok leżący naprzeciwko kąta α. Skoro α przylega do boku 4, to naprzeciwko niego leży bok 3." },
        { math: "$\\sin \\alpha = \\frac{\\text{naprzeciwko}}{\\text{przeciwprostokątna}} = \\frac{3}{5}$", comment: "Sinus kąta ostrego to stosunek boku naprzeciwko kąta do przeciwprostokątnej. Pamiętaj: sin = naprzeciwko/przeciwprostokątna, cos = przy kącie/przeciwprostokątna." }
      ],
      answer: "$\\sin \\alpha = \\frac{3}{5}$"
    },
    {
      level: "łatwe",
      q: "Oblicz $\\sin^2 60° + \\cos^2 60°$.",
      hint: "Jedynka trygonometryczna.",
      steps: [
        { math: "$\\sin^2 60° + \\cos^2 60° = 1$", comment: "To natychmiastowy wynik jedynki trygonometrycznej: sin²α + cos²α = 1 dla KAŻDEGO kąta α. Nie trzeba podstawiać wartości – tożsamość działa automatycznie." }
      ],
      answer: "$1$"
    },
    {
      level: "łatwe",
      q: "Oblicz $\\operatorname{tg} 45°$.",
      hint: "Wartości szczególne.",
      steps: [
        { math: "$\\operatorname{tg} 45° = \\frac{\\sin 45°}{\\cos 45°} = \\frac{\\frac{\\sqrt{2}}{2}}{\\frac{\\sqrt{2}}{2}} = 1$", comment: "Tangens to iloraz sinusa przez cosinus. Dla 45° oba są równe (√2/2), więc iloraz wynosi 1. Kąt 45° to jedyny kąt ostry, dla którego tg = 1." }
      ],
      answer: "$1$"
    },
    {
      level: "średnie",
      q: "Jeśli $\\sin \\alpha = \\frac{5}{13}$ i $\\alpha$ jest kątem ostrym, oblicz $\\cos \\alpha$ i $\\operatorname{tg} \\alpha$.",
      hint: "Użyj jedynki trygonometrycznej: $\\cos^2 \\alpha = 1 - \\sin^2 \\alpha$.",
      steps: [
        { math: "$\\cos^2 \\alpha = 1 - \\sin^2 \\alpha = 1 - \\frac{25}{169} = \\frac{144}{169}$", comment: "Z jedynki trygonometrycznej wyznaczamy cos²α. Odejmujemy: 169/169 − 25/169 = 144/169." },
        { math: "$\\cos \\alpha = \\frac{12}{13}$", comment: "Pierwiastkujemy obie strony. Bierzemy wartość DODATNIĄ, bo kąt jest ostry (0° < α < 90°), a cosinus kąta ostrego jest zawsze dodatni." },
        { math: "$\\operatorname{tg} \\alpha = \\frac{\\sin \\alpha}{\\cos \\alpha} = \\frac{5/13}{12/13} = \\frac{5}{12}$", comment: "Dzielimy sinus przez cosinus. 13 w mianownikach się skraca, zostaje 5/12. Zauważ: 5, 12, 13 – to trójka pitagorejska!" }
      ],
      answer: "$\\cos \\alpha = \\frac{12}{13}$, $\\operatorname{tg} \\alpha = \\frac{5}{12}$"
    },
    {
      level: "średnie",
      q: "W trójkącie boki mają długości $a = 7$, $b = 8$, $c = 5$. Oblicz kąt $A$ (naprzeciwko boku $a$).",
      hint: "Twierdzenie cosinusów: $a^2 = b^2 + c^2 - 2bc\\cos A$.",
      steps: [
        { math: "$a^2 = b^2 + c^2 - 2bc\\cos A \\Rightarrow 49 = 64 + 25 - 80\\cos A$", comment: "Podstawiamy dane do twierdzenia cosinusów. Kąt A jest naprzeciwko boku a = 7, więc po lewej jest a²." },
        { math: "$49 = 89 - 80\\cos A \\Rightarrow 80\\cos A = 40$", comment: "Przenosimy: 89 − 49 = 40. Zatem 80·cos A = 40." },
        { math: "$\\cos A = \\frac{40}{80} = \\frac{1}{2}$", comment: "Dzielimy obie strony przez 80. Cos A = 1/2." },
        { math: "$A = 60°$", comment: "Z tablicy wartości: cos 60° = 1/2. Kąt A jest jedynym kątem z przedziału (0°, 180°) o cosinusie 1/2." }
      ],
      answer: "$A = 60°$"
    },
    {
      level: "średnie",
      q: "W trójkącie $ABC$: $a = 10$, $A = 30°$, $B = 45°$. Oblicz bok $b$.",
      hint: "Twierdzenie sinusów: $\\frac{a}{\\sin A} = \\frac{b}{\\sin B}$.",
      steps: [
        { math: "$\\frac{a}{\\sin A} = \\frac{b}{\\sin B} \\Rightarrow \\frac{10}{\\sin 30°} = \\frac{b}{\\sin 45°}$", comment: "Stosujemy twierdzenie sinusów – znamy bok a i kąt naprzeciwko niego (A), oraz kąt B. To idealny przypadek dla tw. sinusów." },
        { math: "$\\frac{10}{0{,}5} = \\frac{b}{\\frac{\\sqrt{2}}{2}} \\Rightarrow 20 = \\frac{2b}{\\sqrt{2}}$", comment: "Podstawiamy wartości: sin 30° = 1/2, sin 45° = √2/2. Lewa strona 10÷0,5 = 20." },
        { math: "$b = 20 \\cdot \\frac{\\sqrt{2}}{2} = 10\\sqrt{2} \\approx 14{,}14$", comment: "Mnożymy obie strony przez √2/2 i otrzymujemy b = 10√2. Bok naprzeciwko większego kąta (45° > 30°) jest dłuższy – logiczne!" }
      ],
      answer: "$b = 10\\sqrt{2} \\approx 14{,}14$"
    },
    {
      level: "średnie",
      q: "Uprość wyrażenie $\\frac{\\sin^2 \\alpha}{1 - \\cos \\alpha}$ dla $\\alpha \\neq 0°$.",
      hint: "Użyj $\\sin^2 \\alpha = 1 - \\cos^2 \\alpha = (1-\\cos\\alpha)(1+\\cos\\alpha)$.",
      steps: [
        { math: "$\\frac{\\sin^2 \\alpha}{1 - \\cos \\alpha} = \\frac{1 - \\cos^2 \\alpha}{1 - \\cos \\alpha} = \\frac{(1 - \\cos\\alpha)(1 + \\cos\\alpha)}{1 - \\cos\\alpha}$", comment: "Kluczowy krok: zamieniamy sin²α na 1 − cos²α (z jedynki tryg.), a potem rozkładamy licznik na iloczyn ze wzoru skróconego mnożenia a² − b² = (a−b)(a+b)." },
        { math: "$= 1 + \\cos \\alpha$", comment: "Skracamy czynnik (1 − cos α), który jest w liczniku i mianowniku. Założenie α ≠ 0° gwarantuje, że nie dzielimy przez zero (bo 1 − cos 0° = 0)." }
      ],
      answer: "$1 + \\cos \\alpha$"
    },
    {
      level: "trudne",
      q: "W trójkącie $ABC$: $a = 6$, $b = 8$, $C = 120°$. Oblicz bok $c$.",
      hint: "Twierdzenie cosinusów z kątem $C$: $c^2 = a^2 + b^2 - 2ab\\cos C$.",
      steps: [
        { math: "$c^2 = a^2 + b^2 - 2ab\\cos C = 36 + 64 - 2 \\cdot 6 \\cdot 8 \\cdot \\cos 120°$", comment: "Podstawiamy do twierdzenia cosinusów. Uwaga: kąt C = 120° jest rozwarty!" },
        { math: "$\\cos 120° = -\\frac{1}{2}$", comment: "Cosinus kąta rozwartego jest UJEMNY. To kluczowa pułapka – minus zmieni odejmowanie na dodawanie!" },
        { math: "$c^2 = 100 - 96 \\cdot (-\\frac{1}{2}) = 100 + 48 = 148$", comment: "Minus razy minus daje plus, więc zamiast odejmować 48, dodajemy. Bok naprzeciwko kąta rozwartego jest najdłuższy." },
        { math: "$c = \\sqrt{148} = \\sqrt{4 \\cdot 37} = 2\\sqrt{37} \\approx 12{,}17$", comment: "Upraszczamy pierwiastek wyciągając √4 = 2 przed znak. Wynik c ≈ 12,17 > a i b – zgodne z oczekiwaniem (naprzeciwko kąta rozwartego)." }
      ],
      answer: "$c = 2\\sqrt{37} \\approx 12{,}17$"
    },
    {
      level: "trudne",
      q: "Dowiedź, że w trójkącie o bokach $a,b,c$ i kącie $C$ naprzeciwko $c$: pole $= \\frac{1}{2}ab\\sin C$.",
      hint: "Opuść wysokość z wierzchołka $C$ i użyj definicji sinusa.",
      steps: [
        { math: "Opuszczamy wysokość $h$ z wierzchołka $B$ na bok $b$ (lub jego przedłużenie)", comment: "Rysujemy wysokość trójkąta, aby sprowadzić problem do podstawowej definicji sinusa i wzoru P = ½·podstawa·wysokość." },
        { math: "$h = a \\sin C$", comment: "Z definicji sinusa w trójkącie prostokątnym powstałym przez opuszczenie wysokości: sin C = h/a, stąd h = a·sin C." },
        { math: "$P = \\frac{1}{2} \\cdot b \\cdot h = \\frac{1}{2} \\cdot b \\cdot a \\sin C = \\frac{1}{2}ab\\sin C$ ∎", comment: "Podstawiamy h = a·sin C do wzoru na pole trójkąta. Dowód działa zarówno dla kątów ostrych, jak i rozwartych. Ten wzór jest niezwykle przydatny – potrzebujesz tylko dwóch boków i kąta między nimi." }
      ],
      answer: "$P = \\frac{1}{2}ab\\sin C$ ∎"
    },
    {
      level: "trudne",
      q: "Bez użycia kalkulatora oblicz $\\sin 75°$.",
      hint: "$75° = 45° + 30°$, użyj wzoru na sinus sumy.",
      steps: [
        { math: "$\\sin 75° = \\sin(45° + 30°)$", comment: "Rozbijamy 75° na sumę kątów, których wartości trygonometryczne znamy na pamięć: 45° + 30°." },
        { math: "$= \\sin 45° \\cos 30° + \\cos 45° \\sin 30°$", comment: "Stosujemy wzór na sinus sumy: sin(α+β) = sin α·cos β + cos α·sin β. To jeden z kluczowych wzorów trygonometrii." },
        { math: "$= \\frac{\\sqrt{2}}{2} \\cdot \\frac{\\sqrt{3}}{2} + \\frac{\\sqrt{2}}{2} \\cdot \\frac{1}{2}$", comment: "Podstawiamy wartości szczególne: sin 45° = cos 45° = √2/2, sin 30° = 1/2, cos 30° = √3/2." },
        { math: "$= \\frac{\\sqrt{6}}{4} + \\frac{\\sqrt{2}}{4} = \\frac{\\sqrt{6} + \\sqrt{2}}{4}$", comment: "Mnożymy: √2·√3 = √6, √2·1 = √2. Sprowadzamy do wspólnego mianownika 4. Wynik ≈ 0,966 – bliski 1, co ma sens, bo 75° jest bliskie 90°." }
      ],
      answer: "$\\sin 75° = \\frac{\\sqrt{6} + \\sqrt{2}}{4}$"
    }
  ]
},

/* ──────────────────────────────────────────────
   7. PLANIMETRIA
   ────────────────────────────────────────────── */
"planimetria": {
  title: "Planimetria",
  color: "teal",
  icon: "fa-shapes",
  intro: "Planimetria to geometria na płaszczyźnie – trójkąty, czworokąty, koła, pola, obwody. Na maturze podstawowej to jeden z najważniejszych działów. Zadania wymagają znajomości wzorów, twierdzeń (Pitagorasa, Talesa) i umiejętności rysowania pomocniczych odcinków.",
  examFocus: [
    "Twierdzenie Pitagorasa i jego odwrotność",
    "Twierdzenie Talesa i podobieństwo trójkątów",
    "Pola i obwody figur (trójkąt, prostokąt, trapez, równoległobok, koło)",
    "Kąty w kole (środkowe, wpisane, kąt między styczną a cięciwą)",
    "Okrąg wpisany i opisany na trójkącie"
  ],
  theory: [
    {
      title: "Trójkąty – podstawowe własności",
      text: "Suma kątów trójkąta wynosi $180°$. Nierówność trójkąta: każdy bok musi być mniejszy od sumy dwóch pozostałych. Trójkąt prostokątny spełnia twierdzenie Pitagorasa: $a^2 + b^2 = c^2$ ($c$ – przeciwprostokątna). Trójkąty szczególne: równoboczny (wszystkie boki i kąty $= 60°$), równoramienny (dwa boki i dwa kąty równe).",
      formulas: [
        { latex: "a^2 + b^2 = c^2", meaning: "Twierdzenie Pitagorasa" },
        { latex: "P = \\frac{1}{2} \\cdot a \\cdot h_a", meaning: "Pole trójkąta (podstawa × wysokość)" },
        { latex: "P = \\frac{1}{2}ab\\sin C", meaning: "Pole trójkąta (dwa boki i kąt między nimi)" },
        { latex: "P = \\sqrt{s(s-a)(s-b)(s-c)}", meaning: "Wzór Herona (s = połowa obwodu)" },
        { latex: "P_{\\text{równoboczny}} = \\frac{a^2\\sqrt{3}}{4}", meaning: "Pole trójkąta równobocznego" }
      ]
    },
    {
      title: "Twierdzenie Talesa i podobieństwo",
      text: "Twierdzenie Talesa: jeśli ramiona kąta przetniemy dwiema prostymi równoległymi, to odcinki na jednym ramieniu są proporcjonalne do odpowiednich odcinków na drugim. Trójkąty podobne – mają takie same kąty; stosunek odpowiednich boków jest stały ($k$ – skala podobieństwa). Stosunek pól: $k^2$.",
      formulas: [
        { latex: "\\frac{|AB|}{|A'B'|} = \\frac{|BC|}{|B'C'|} = \\frac{|AC|}{|A'C'|} = k", meaning: "Warunek podobieństwa (skala k)" },
        { latex: "\\frac{P_1}{P_2} = k^2", meaning: "Stosunek pól trójkątów podobnych" }
      ]
    },
    {
      title: "Czworokąty",
      text: "Prostokąt: kąty $90°$, przekątne równe i dzielą się na połowy. Kwadrat: prostokąt o równych bokach. Równoległobok: naprzeciwległe boki równe i równoległe. Romb: równoległobok o równych bokach. Trapez: dokładnie jedna para boków równoległych.",
      formulas: [
        { latex: "P_{\\text{prostokąt}} = a \\cdot b", meaning: "Pole prostokąta" },
        { latex: "P_{\\text{romb}} = \\frac{d_1 \\cdot d_2}{2}", meaning: "Pole rombu (z przekątnych)" },
        { latex: "P_{\\text{trapez}} = \\frac{(a+b) \\cdot h}{2}", meaning: "Pole trapezu" },
        { latex: "P_{\\text{równoległobok}} = a \\cdot h", meaning: "Pole równoległoboku" }
      ]
    },
    {
      title: "Koło i okrąg",
      text: "Pole koła: $\\pi r^2$. Obwód okręgu: $2\\pi r$. Kąt środkowy jest dwa razy większy od kąta wpisanego opartego na tym samym łuku. Kąt wpisany oparty na średnicy: $90°$. Styczna do okręgu jest prostopadła do promienia w punkcie styczności. Okrąg wpisany: $r = \\frac{P}{s}$ (pole/połowa obwodu), opisany: $R = \\frac{abc}{4P}$.",
      formulas: [
        { latex: "P = \\pi r^2", meaning: "Pole koła" },
        { latex: "L = 2\\pi r", meaning: "Obwód (długość) okręgu" },
        { latex: "r = \\frac{P}{s}", meaning: "Promień okręgu wpisanego w trójkąt" },
        { latex: "R = \\frac{abc}{4P}", meaning: "Promień okręgu opisanego na trójkącie" },
        { latex: "\\alpha_{\\text{środkowy}} = 2 \\cdot \\alpha_{\\text{wpisany}}", meaning: "Kąt środkowy = 2 × kąt wpisany (ten sam łuk)" }
      ]
    },
    {
      title: "Trójkąty prostokątne szczególne i trójki pitagorejskie",
      text: "Na maturze warto znać trójkąty szczególne: trójkąt 30°-60°-90° (boki w stosunku $1 : \\sqrt{3} : 2$) oraz 45°-45°-90° (boki w stosunku $1 : 1 : \\sqrt{2}$). Popularne trójki pitagorejskie to zbiory trzech liczb naturalnych spełniających tw. Pitagorasa – warto je rozpoznawać od razu zamiast liczyć. Każdy wielokrotność trójki pitagorejskiej też jest trójką (np. 6, 8, 10 = 2 × (3, 4, 5)).",
      formulas: [
        { latex: "30°\\text{-}60°\\text{-}90°: \\quad a : a\\sqrt{3} : 2a", meaning: "Boki trójkąta 30-60-90 (a = krótsza przyprostokątna)" },
        { latex: "45°\\text{-}45°\\text{-}90°: \\quad a : a : a\\sqrt{2}", meaning: "Boki trójkąta równoramiennego prostokątnego" },
        { latex: "(3, 4, 5), \\; (5, 12, 13), \\; (8, 15, 17), \\; (7, 24, 25)", meaning: "Popularne trójki pitagorejskie" }
      ]
    }
  ],
  mistakes: [
    "Pitagoras dotyczy TYLKO trójkąta prostokątnego!",
    "We wzorze Herona: $s = \\frac{a+b+c}{2}$ (połowa obwodu, nie obwód)",
    "Kąt wpisany ≠ kąt środkowy – kąt środkowy jest dwa razy większy",
    "Mylenie promienia z średnicą ($d = 2r$)",
    "Przy podobieństwie: stosunek pól to $k^2$, nie $k$!"
  ],
  strategy: [
    "Narysuj rysunek pomocniczy – to połowa sukcesu",
    "Dorysuj wysokość, przekątną lub promień – tworzą trójkąty prostokątne",
    "Szukaj trójkątów podobnych (wspólne kąty)",
    "Koło → myśl o promieniu jako narzędziu do tworzenia trójkątów",
    "Pole złożonej figury = suma/różnica pól prostszych figur"
  ],
  tasks: [
    {
      level: "łatwe",
      q: "Oblicz pole trójkąta o podstawie $a = 10$ cm i wysokości $h = 6$ cm.",
      hint: "$P = \\frac{1}{2}ah$.",
      steps: [
        { math: "$P = \\frac{1}{2} \\cdot 10 \\cdot 6 = 30$ cm²", comment: "Stosujemy podstawowy wzór na pole trójkąta: połowa iloczynu podstawy i wysokości. To najczęściej używany wzór na pole trójkąta." }
      ],
      answer: "$30$ cm²"
    },
    {
      level: "łatwe",
      q: "Oblicz długość przekątnej kwadratu o boku $a = 5$.",
      hint: "Przekątna kwadratu: $d = a\\sqrt{2}$.",
      steps: [
        { math: "$d = a\\sqrt{2} = 5\\sqrt{2} \\approx 7{,}07$", comment: "Przekątna kwadratu dzieli go na dwa trójkąty prostokątne równoramienne (kąty 45°-45°-90°). Z tw. Pitagorasa: d² = a² + a² = 2a², więc d = a√2." }
      ],
      answer: "$5\\sqrt{2}$"
    },
    {
      level: "łatwe",
      q: "Oblicz pole koła o promieniu $r = 4$ cm.",
      hint: "$P = \\pi r^2$.",
      steps: [
        { math: "$P = \\pi r^2 = \\pi \\cdot 4^2 = 16\\pi \\approx 50{,}27$ cm²", comment: "Wzór na pole koła to π razy kwadrat promienia. Wynik zostawiamy w postaci dokładnej 16π lub przybliżamy. Na maturze preferowana jest postać dokładna." }
      ],
      answer: "$16\\pi$ cm²"
    },
    {
      level: "średnie",
      q: "W trójkącie prostokątnym przyprostokątne mają długości 5 i 12. Oblicz promień okręgu wpisanego.",
      hint: "$r = \\frac{P}{s}$, gdzie $s$ to połowa obwodu.",
      steps: [
        { math: "$c = \\sqrt{5^2 + 12^2} = \\sqrt{25 + 144} = \\sqrt{169} = 13$", comment: "Najpierw obliczamy przeciwprostokątną z tw. Pitagorasa. 5-12-13 to trójka pitagorejska." },
        { math: "$P = \\frac{1}{2} \\cdot 5 \\cdot 12 = 30$", comment: "Pole trójkąta prostokątnego = połowa iloczynu przyprostokątnych (bo jedna jest podstawą, druga wysokością)." },
        { math: "$s = \\frac{5 + 12 + 13}{2} = \\frac{30}{2} = 15$", comment: "Obliczamy połowę obwodu (tzw. półobwód), potrzebną we wzorze na promień okręgu wpisanego." },
        { math: "$r = \\frac{P}{s} = \\frac{30}{15} = 2$", comment: "Promień okręgu wpisanego = pole / półobwód. Dla trójkąta prostokątnego istnieje też szybki wzór: r = (a + b − c)/2 = (5 + 12 − 13)/2 = 2 ✓." }
      ],
      answer: "$r = 2$"
    },
    {
      level: "średnie",
      q: "Pole trapezu równoramiennego o podstawach 6 i 14 oraz ramieniu 5.",
      hint: "Oblicz wysokość z twierdzenia Pitagorasa.",
      steps: [
        { math: "Różnica podstaw na jedną stronę: $\\frac{14 - 6}{2} = 4$", comment: "W trapezie równoramiennym, jeśli opuścimy dwie wysokości, powstają dwa przystające trójkąty prostokątne po bokach. Każdy ma przyprostokątną (14−6)/2 = 4." },
        { math: "$h = \\sqrt{5^2 - 4^2} = \\sqrt{25 - 16} = \\sqrt{9} = 3$", comment: "Z tw. Pitagorasa w tym trójkącie: ramię² = 4² + h², więc h = √(25−16) = 3." },
        { math: "$P = \\frac{(a + b) \\cdot h}{2} = \\frac{(6 + 14) \\cdot 3}{2} = \\frac{60}{2} = 30$", comment: "Stosujemy wzór na pole trapezu: średnia arytmetyczna podstaw razy wysokość. (6+14)/2 · 3 = 10 · 3 = 30." }
      ],
      answer: "$P = 30$"
    },
    {
      level: "średnie",
      q: "Trójkąt równoboczny ma bok $a = 8$. Oblicz wysokość oraz promień okręgu opisanego.",
      hint: "Wysokość: $h = \\frac{a\\sqrt{3}}{2}$. Promień opisany: $R = \\frac{2}{3}h$.",
      steps: [
        { math: "$h = \\frac{a\\sqrt{3}}{2} = \\frac{8\\sqrt{3}}{2} = 4\\sqrt{3}$", comment: "Wysokość trójkąta równobocznego to √3/2 razy bok. Wynika to z tw. Pitagorasa: h² + (a/2)² = a², stąd h = a√3/2." },
        { math: "$R = \\frac{2}{3} \\cdot h = \\frac{2}{3} \\cdot 4\\sqrt{3} = \\frac{8\\sqrt{3}}{3}$", comment: "W trójkącie równobocznym środek ciężkości = środek okręgu opisanego = punkt dzielący wysokość w stosunku 2:1 od wierzchołka. Stąd R = ⅔h." }
      ],
      answer: "$h = 4\\sqrt{3}$, $R = \\frac{8\\sqrt{3}}{3}$"
    },
    {
      level: "średnie",
      q: "Trójkąty $ABC$ i $DEF$ są podobne w skali $k = 3$. Pole $\\triangle ABC = 12$. Oblicz pole $\\triangle DEF$.",
      hint: "Stosunek pól to $k^2$.",
      steps: [
        { math: "$\\frac{P_{DEF}}{P_{ABC}} = k^2 = 3^2 = 9$", comment: "Kluczowa własność podobieństwa: stosunek pól trójkątów podobnych to KWADRAT skali, nie sama skala! Jeśli boki są 3× dłuższe, to pole jest 9× większe." },
        { math: "$P_{DEF} = 12 \\cdot 9 = 108$", comment: "Mnożymy pole mniejszego trójkąta przez k² = 9. Analogicznie: stosunek obwodów = k, stosunek objętości (w 3D) = k³." }
      ],
      answer: "$P_{\\triangle DEF} = 108$"
    },
    {
      level: "trudne",
      q: "W trójkącie $ABC$: $a = 7$, $b = 8$, $c = 9$. Oblicz pole trójkąta korzystając ze wzoru Herona.",
      hint: "$s = \\frac{a+b+c}{2}$, $P = \\sqrt{s(s-a)(s-b)(s-c)}$.",
      steps: [
        { math: "$s = \\frac{7 + 8 + 9}{2} = \\frac{24}{2} = 12$", comment: "Obliczamy półobwód s. Wzór Herona jest najbardziej przydatny, gdy znamy trzy boki trójkąta, ale nie znamy żadnej wysokości." },
        { math: "$P = \\sqrt{s(s-a)(s-b)(s-c)} = \\sqrt{12 \\cdot 5 \\cdot 4 \\cdot 3}$", comment: "Podstawiamy: s−a = 12−7 = 5, s−b = 12−8 = 4, s−c = 12−9 = 3." },
        { math: "$= \\sqrt{720} = \\sqrt{144 \\cdot 5} = 12\\sqrt{5} \\approx 26{,}83$", comment: "720 = 144 · 5, więc √720 = √144 · √5 = 12√5. Zostawiamy w postaci uproszczonej z pierwiastkiem." }
      ],
      answer: "$P = 12\\sqrt{5} \\approx 26{,}83$"
    },
    {
      level: "trudne",
      q: "Kąt wpisany w okrąg jest oparty na łuku $120°$. Jaka jest miara tego kąta?",
      hint: "Kąt wpisany = połowa łuku, na którym jest oparty.",
      steps: [
        { math: "Kąt wpisany $= \\frac{\\text{łuk}}{2} = \\frac{120°}{2} = 60°$", comment: "Twierdzenie o kącie wpisanym: kąt wpisany w okrąg jest równy połowie łuku, na którym jest oparty. Kąt środkowy oparty na tym samym łuku byłby równy 120° (cały łuk). Pamiętaj: wpisany = ½ środkowego." }
      ],
      answer: "$60°$"
    },
    {
      level: "trudne",
      q: "W trapez $ABCD$ ($AB \\parallel CD$) wpisano okrąg. $AB = 12$, $CD = 4$. Oblicz ramię trapezu i pole trapezu.",
      hint: "W trapez z wpisanym okręgiem: suma podstaw = suma ramion. Trapez jest równoramienny.",
      steps: [
        { math: "Suma podstaw $= AB + CD = 12 + 4 = 16 =$ suma ramion", comment: "Warunek wpisania okręgu w czworokąt: sumy przeciwległych boków muszą być równe. Stąd AB + CD = BC + AD = 16." },
        { math: "Trapez z wpisanym okręgiem jest równoramienny: $l = \\frac{16}{2} = 8$", comment: "Ponieważ trapez jest równoramienny (BC = AD), każde ramię ma długość 16/2 = 8." },
        { math: "Różnica podstaw na stronę: $\\frac{12 - 4}{2} = 4$. Stąd $h = \\sqrt{8^2 - 4^2} = \\sqrt{48} = 4\\sqrt{3}$", comment: "Opuszczamy wysokość z wierzchołka krótszej podstawy. Powstaje trójkąt prostokątny z przyprostokątnymi 4 i h oraz przeciwprostokątną 8." },
        { math: "$P = \\frac{(12 + 4) \\cdot 4\\sqrt{3}}{2} = \\frac{16 \\cdot 4\\sqrt{3}}{2} = 32\\sqrt{3}$", comment: "Stosujemy wzór na pole trapezu. 16 · 4√3 / 2 = 32√3 ≈ 55,4." }
      ],
      answer: "$l = 8$, $P = 32\\sqrt{3}$"
    }
  ]
},

/* ──────────────────────────────────────────────
   8. GEOMETRIA ANALITYCZNA
   ────────────────────────────────────────────── */
"geometria-analityczna": {
  title: "Geometria analityczna",
  color: "indigo",
  icon: "fa-crosshairs",
  intro: "Geometria analityczna to geometria w układzie współrzędnych. Operujesz na punktach, prostych, odcinkach i okręgach za pomocą wzorów algebraicznych. Na maturze pojawiają się odległości, środki odcinków, równania prostych i ich wzajemne położenie.",
  examFocus: [
    "Odległość między dwoma punktami",
    "Środek odcinka",
    "Równanie prostej (kierunkowe i ogólne)",
    "Wzajemne położenie prostych (równoległe, prostopadłe, punkt przecięcia)",
    "Odległość punktu od prostej"
  ],
  theory: [
    {
      title: "Punkt i odcinek w układzie współrzędnych",
      text: "Punkt $A(x_A, y_A)$ w układzie współrzędnych jest jednoznacznie określony przez dwie współrzędne. Odległość dwóch punktów obliczamy ze wzoru opartego na twierdzeniu Pitagorasa. Środek odcinka to średnia arytmetyczna współrzędnych końców.",
      formulas: [
        { latex: "|AB| = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}", meaning: "Odległość między punktami A i B" },
        { latex: "S = \\left(\\frac{x_A + x_B}{2}, \\frac{y_A + y_B}{2}\\right)", meaning: "Środek odcinka AB" }
      ]
    },
    {
      title: "Równanie prostej",
      text: "Prosta w układzie współrzędnych ma dwie główne postacie: kierunkową $y = ax + b$ (a – nachylenie, b – punkt przecięcia z osią Oy) i ogólną $Ax + By + C = 0$. Współczynnik kierunkowy z dwóch punktów: $a = \\frac{y_2 - y_1}{x_2 - x_1}$. Prosta pionowa nie ma postaci kierunkowej (równanie: $x = k$).",
      formulas: [
        { latex: "y = ax + b", meaning: "Postać kierunkowa" },
        { latex: "Ax + By + C = 0", meaning: "Postać ogólna" },
        { latex: "a = \\frac{y_2 - y_1}{x_2 - x_1}", meaning: "Współczynnik kierunkowy z dwóch punktów" }
      ]
    },
    {
      title: "Wzajemne położenie prostych",
      text: "Dwie proste mogą być: równoległe ($a_1 = a_2$), prostopadłe ($a_1 \\cdot a_2 = -1$), lub się przecinać ($a_1 \\neq a_2$). Proste tożsame to szczególny przypadek równoległych (te same proste). Punkt przecięcia: rozwiąż układ równań.",
      formulas: [
        { latex: "l_1 \\parallel l_2 \\iff a_1 = a_2", meaning: "Warunek równoległości" },
        { latex: "l_1 \\perp l_2 \\iff a_1 \\cdot a_2 = -1", meaning: "Warunek prostopadłości" }
      ]
    },
    {
      title: "Odległość punktu od prostej",
      text: "Odległość punktu $P(x_0, y_0)$ od prostej $Ax + By + C = 0$ obliczamy z jednego wzoru. Jest to prostopadła odległość – najkrótsza możliwa. Wzór ten pozwala też obliczać np. wysokość trójkąta w układzie współrzędnych.",
      formulas: [
        { latex: "d = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}", meaning: "Odległość punktu od prostej" }
      ]
    }
  ],
  mistakes: [
    "Zapominanie o wartości bezwzględnej w liczniku we wzorze na odległość punktu od prostej",
    "Mylenie postaci kierunkowej z ogólną przy sprawdzaniu równoległości",
    "Prosta pionowa $x = k$ nie ma postaci $y = ax + b$ – współczynnik kierunkowy nie istnieje",
    "Przy prostopadłości: $a_1 \\cdot a_2 = -1$, nie $1$ i nie $0$",
    "We wzorze na odległość punktów: obie współrzędne odejmujemy w tej samej kolejności"
  ],
  strategy: [
    "Oznacz punkty współrzędnymi i zapisz dane",
    "Wyznacz równanie prostej z dwóch punktów",
    "Prostopadłość/równoległość → sprawdź współczynniki kierunkowe",
    "Odległość punktu od prostej → przekształć prostą do postaci ogólnej",
    "Narysuj szkic w układzie współrzędnych"
  ],
  tasks: [
    {
      level: "łatwe",
      q: "Oblicz odległość między punktami $A(1, 2)$ i $B(4, 6)$.",
      hint: "Wzór na odległość: $\\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$.",
      steps: [
        { math: "$|AB| = \\sqrt{(4-1)^2 + (6-2)^2} = \\sqrt{9 + 16}$", comment: "Podstawiamy współrzędne do wzoru na odległość. Kolejność odejmowania nie ma znaczenia (wynik jest podnosozny do kwadratu), ale musi być ta sama dla x i y." },
        { math: "$= \\sqrt{25} = 5$", comment: "Wynik jest liczbą całkowitą – to trójka pitagorejska 3-4-5 w ukryciu (różnice współrzędnych to 3 i 4)." }
      ],
      answer: "$|AB| = 5$"
    },
    {
      level: "łatwe",
      q: "Wyznacz środek odcinka $AB$, gdzie $A(-2, 3)$, $B(6, 7)$.",
      hint: "Średnia arytmetyczna współrzędnych.",
      steps: [
        { math: "$S = \\left(\\frac{x_A + x_B}{2}, \\frac{y_A + y_B}{2}\\right) = \\left(\\frac{-2+6}{2}, \\frac{3+7}{2}\\right) = (2, 5)$", comment: "Środek odcinka to punkt, którego współrzędne są średnimi arytmetycznymi odpowiednich współrzędnych końców. Geometrycznie: punkt w połowie drogi między A i B." }
      ],
      answer: "$S = (2, 5)$"
    },
    {
      level: "łatwe",
      q: "Podaj współczynnik kierunkowy prostej przechodzącej przez $A(1, 3)$ i $B(3, 7)$.",
      hint: "$a = \\frac{y_2-y_1}{x_2-x_1}$.",
      steps: [
        { math: "$a = \\frac{y_B - y_A}{x_B - x_A} = \\frac{7-3}{3-1} = \\frac{4}{2} = 2$", comment: "Współczynnik kierunkowy (nachylenie) to stosunek zmiany y do zmiany x. a = 2 oznacza, że na każdą 1 jednostkę w prawo prosta idzie o 2 jednostki w górę." }
      ],
      answer: "$a = 2$"
    },
    {
      level: "średnie",
      q: "Wyznacz równanie prostej prostopadłej do $y = 3x - 1$ i przechodzącej przez punkt $P(3, 2)$.",
      hint: "Jeśli $a_1 = 3$, to $a_2 = -\\frac{1}{3}$ (prostopadłość).",
      steps: [
        { math: "$a_1 = 3 \\Rightarrow a_2 = -\\frac{1}{a_1} = -\\frac{1}{3}$", comment: "Warunek prostopadłości: a₁ · a₂ = −1. Jeśli jedna prosta ma nachylenie 3, prostopadła ma nachylenie −1/3 (odwrotność z minusem)." },
        { math: "$y = -\\frac{1}{3}x + b$; podstawiamy $P(3,2)$: $2 = -\\frac{1}{3} \\cdot 3 + b = -1 + b$", comment: "Znamy a₂ i punkt P. Podstawiamy współrzędne punktu do y = a₂x + b, aby wyznaczyć b." },
        { math: "$b = 3 \\Rightarrow y = -\\frac{1}{3}x + 3$", comment: "Prosta prostopadła ma równanie y = −⅓x + 3. Sprawdzenie: punkt (3,2): −⅓·3 + 3 = −1 + 3 = 2 ✓." }
      ],
      answer: "$y = -\\frac{1}{3}x + 3$"
    },
    {
      level: "średnie",
      q: "Oblicz odległość punktu $P(2, 3)$ od prostej $3x + 4y - 5 = 0$.",
      hint: "Wzór: $d = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2+B^2}}$.",
      steps: [
        { math: "$d = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2+B^2}} = \\frac{|3 \\cdot 2 + 4 \\cdot 3 + (-5)|}{\\sqrt{3^2+4^2}}$", comment: "Identyfikujemy: A = 3, B = 4, C = −5 (z postaci ogólnej Ax + By + C = 0). Punkt P(2, 3) to (x₀, y₀)." },
        { math: "$= \\frac{|6 + 12 - 5|}{\\sqrt{9+16}} = \\frac{|13|}{\\sqrt{25}} = \\frac{13}{5} = 2{,}6$", comment: "Obliczamy: w liczniku wartość bezwzględna z 13 (nie zapomnij o niej!). W mianowniku √25 = 5. Wynik 13/5 = 2,6 jednostki." }
      ],
      answer: "$d = \\frac{13}{5}$"
    },
    {
      level: "średnie",
      q: "Wyznacz punkt przecięcia prostych $y = 2x + 1$ i $y = -x + 7$.",
      hint: "Przyrównaj prawe strony.",
      steps: [
        { math: "$2x + 1 = -x + 7 \\Rightarrow 3x = 6 \\Rightarrow x = 2$", comment: "Przyrównujemy prawe strony (obie = y). Przenosimy wyrazy z x na lewą stronę: 2x + x = 7 − 1." },
        { math: "$y = 2 \\cdot 2 + 1 = 5$", comment: "Podstawiamy x = 2 do któregokolwiek równania, by wyznaczyć y. Sprawdzenie z drugiego: y = −2 + 7 = 5 ✓. Punkt przecięcia to (2, 5)." }
      ],
      answer: "$(2, 5)$"
    },
    {
      level: "średnie",
      q: "Wyznacz równanie prostej przez punkty $A(1, -2)$ i $B(4, 7)$.",
      hint: "Oblicz $a$, potem $b$.",
      steps: [
        { math: "$a = \\frac{7-(-2)}{4-1} = \\frac{9}{3} = 3$", comment: "Współczynnik kierunkowy: różnica y dzielona przez różnicę x. Uwaga na podwójny minus: 7−(−2) = 7+2 = 9." },
        { math: "$y = 3x + b$; przez $A(1,-2)$: $-2 = 3 \\cdot 1 + b \\Rightarrow b = -5$", comment: "Podstawiamy dowolny z punktów (tu A), by wyznaczyć wyraz wolny b. −2 = 3 + b, więc b = −5." },
        { math: "$y = 3x - 5$", comment: "Równanie prostej w postaci kierunkowej. Sprawdzenie z B(4,7): 3·4 − 5 = 12 − 5 = 7 ✓." }
      ],
      answer: "$y = 3x - 5$"
    },
    {
      level: "trudne",
      q: "Trójkąt $ABC$: $A(0,0)$, $B(6,0)$, $C(2,4)$. Oblicz pole trójkąta.",
      hint: "Użyj wzoru: $P = \\frac{1}{2}|x_A(y_B-y_C) + x_B(y_C-y_A) + x_C(y_A-y_B)|$.",
      steps: [
        { math: "$P = \\frac{1}{2}|x_A(y_B-y_C) + x_B(y_C-y_A) + x_C(y_A-y_B)|$", comment: "Stosujemy wzór na pole trójkąta ze współrzędnych wierzchołków – bardzo przydatny w geometrii analitycznej (tzw. wzór sznurowadłowy)." },
        { math: "$= \\frac{1}{2}|0 \\cdot (0-4) + 6 \\cdot (4-0) + 2 \\cdot (0-0)| = \\frac{1}{2}|0 + 24 + 0| = 12$", comment: "Pierwszy i trzeci składnik zerują się (x_A = 0, y_A = y_B = 0). Zostaje 6·4 = 24, dzielone przez 2 = 12. Wartość bezwzględna gwarantuje dodatni wynik." }
      ],
      answer: "$P = 12$"
    },
    {
      level: "trudne",
      q: "Wykaż, że punkty $A(1,1)$, $B(4,2)$, $C(7,3)$ są współliniowe.",
      hint: "Sprawdź, czy współczynniki kierunkowe $AB$ i $BC$ są równe.",
      steps: [
        { math: "$a_{AB} = \\frac{2-1}{4-1} = \\frac{1}{3}$", comment: "Obliczamy nachylenie prostej AB." },
        { math: "$a_{BC} = \\frac{3-2}{7-4} = \\frac{1}{3}$", comment: "Obliczamy nachylenie prostej BC." },
        { math: "$a_{AB} = a_{BC} = \\frac{1}{3}$ → punkty leżą na jednej prostej ∎", comment: "Skoro oba odcinki mają ten sam współczynnik kierunkowy I mają wspólny punkt B, to A, B, C leżą na jednej prostej. Alternatywna metoda: sprawdzić, czy pole trójkąta ABC = 0." }
      ],
      answer: "Punkty są współliniowe ∎"
    },
    {
      level: "trudne",
      q: "Znajdź równanie symetralnej odcinka $AB$, gdzie $A(2, 1)$ i $B(6, 5)$.",
      hint: "Symetralna przechodzi przez środek i jest prostopadła do $AB$.",
      steps: [
        { math: "Środek: $S = \\left(\\frac{2+6}{2}, \\frac{1+5}{2}\\right) = (4, 3)$", comment: "Symetralna odcinka przechodzi przez jego środek. Obliczamy: S = ((2+6)/2, (1+5)/2) = (4, 3)." },
        { math: "$a_{AB} = \\frac{5-1}{6-2} = \\frac{4}{4} = 1$", comment: "Wyznaczamy nachylenie odcinka AB. Symetralna jest prostopadła do AB." },
        { math: "Symetralna: $a = -\\frac{1}{1} = -1$ (prostopadła do AB)", comment: "Warunek prostopadłości: a₁ · a₂ = −1. Jeśli a₁ = 1, to a₂ = −1." },
        { math: "$y = -x + b$; przez $S(4,3)$: $3 = -4 + b \\Rightarrow b = 7$", comment: "Podstawiamy środek S do równania prostej, by wyznaczyć b." },
        { math: "$y = -x + 7$", comment: "Symetralna odcinka AB. Każdy punkt na tej prostej jest jednakowo odległy od A i B. Sprawdzenie: |SA| = √(4+1) = √5, |SB| = √(4+4) = √8... a, nie – |SA| = √((4-2)²+(3-1)²) = √8, |SB| = √((4-6)²+(3-5)²) = √8 ✓." }
      ],
      answer: "$y = -x + 7$"
    }
  ]
},

/* ──────────────────────────────────────────────
   9. STEREOMETRIA
   ────────────────────────────────────────────── */
"stereometria": {
  title: "Stereometria",
  color: "pink",
  icon: "fa-cube",
  intro: "Stereometria to geometria w przestrzeni 3D – graniastosłupy, ostrosłupy, walce, stożki, kule. Na maturze podstawowej musisz umieć obliczać pola powierzchni, objętości i kąty w bryłach. Kluczowa umiejętność: wyciąganie trójkątów prostokątnych z bryły.",
  examFocus: [
    "Objętości i pola powierzchni graniastosłupów",
    "Objętości i pola powierzchni ostrosłupów",
    "Bryły obrotowe: walec, stożek, kula",
    "Przekątna prostopadłościanu / sześcianu",
    "Kąt nachylenia krawędzi/ściany do podstawy"
  ],
  theory: [
    {
      title: "Graniastosłupy",
      text: "Graniastosłup to bryła o dwóch równoległych, przystających podstawach i ścianach bocznych będących równoległobokami (w graniastosłupie prostym – prostokątami). Objętość = pole podstawy × wysokość. Pole powierzchni = 2 × pole podstawy + pole powierzchni bocznej.",
      formulas: [
        { latex: "V = P_p \\cdot H", meaning: "Objętość graniastosłupa" },
        { latex: "P_c = 2P_p + P_b", meaning: "Pole powierzchni całkowitej" },
        { latex: "d = \\sqrt{a^2 + b^2 + c^2}", meaning: "Przekątna prostopadłościanu" }
      ]
    },
    {
      title: "Ostrosłupy",
      text: "Ostrosłup to bryła o jednej podstawie i ścianach bocznych będących trójkątami zbiegającymi się w wierzchołku. Ostrosłup prawidłowy: podstawa jest wielokątem foremnym, wierzchołek nad środkiem podstawy. Objętość = $\\frac{1}{3}$ pola podstawy × wysokość.",
      formulas: [
        { latex: "V = \\frac{1}{3} P_p \\cdot H", meaning: "Objętość ostrosłupa" },
        { latex: "P_c = P_p + P_b", meaning: "Pole powierzchni ostrosłupa" }
      ]
    },
    {
      title: "Bryły obrotowe",
      text: "Walec: obrót prostokąta wokół boku. Stożek: obrót trójkąta prostokątnego wokół przyprostokątnej. Kula: obrót koła wokół średnicy. Związek w stożku: $l^2 = r^2 + H^2$ (twierdzenie Pitagorasa, $l$ – tworząca).",
      formulas: [
        { latex: "V_{\\text{walec}} = \\pi r^2 H", meaning: "Objętość walca" },
        { latex: "P_{\\text{walec}} = 2\\pi r^2 + 2\\pi r H", meaning: "Pole powierzchni walca" },
        { latex: "V_{\\text{stożek}} = \\frac{1}{3}\\pi r^2 H", meaning: "Objętość stożka" },
        { latex: "P_{\\text{stożek}} = \\pi r^2 + \\pi r l", meaning: "Pole powierzchni stożka (l = tworząca)" },
        { latex: "V_{\\text{kula}} = \\frac{4}{3}\\pi r^3", meaning: "Objętość kuli" },
        { latex: "P_{\\text{kula}} = 4\\pi r^2", meaning: "Pole powierzchni kuli" }
      ]
    },
    {
      title: "Przekroje brył płaszczyzną",
      text: "Na maturze często pojawia się przekrój bryły płaszczyzną. Przekrój prostopadłościanu to prostokąt lub trójkąt. Przekrój stożka płaszczyzną przechodzącą przez oś to trójkąt równoramienny (ramiona = tworząca). Przekrój kuli to koło – największe koło (wielkie koło) ma promień równy promieniowi kuli. Kluczowa technika: rysuj przekrój, zaznacz wymiary, korzystaj z Pitagorasa.",
      formulas: [
        { latex: "d_{\\text{sześcianu}} = a\\sqrt{3}", meaning: "Przekątna sześcianu o boku a" },
        { latex: "d_{\\text{prostop.}} = \\sqrt{a^2+b^2+c^2}", meaning: "Przekątna prostopadłościanu" },
        { latex: "l = \\sqrt{r^2 + H^2}", meaning: "Tworząca stożka z r i H" }
      ]
    },
    {
      title: "Kąty w bryłach",
      text: "Na maturze często trzeba wyznaczyć kąt między krawędzią a podstawą, kąt między ścianą boczną a podstawą lub kąt dwuścienny. Klucz: wyciągnij odpowiedni trójkąt prostokątny z bryły. Kąt krawędzi do podstawy – szukaj trójkąta z tą krawędzią, wysokością bryły i rzutem krawędzi na podstawę. Kąt ściany do podstawy – szukaj trójkąta z wysokością bryły, apotemat podstawy i apotemat ściany.",
      formulas: [
        { latex: "\\tan \\alpha = \\frac{H}{d_{\\text{rzut}}}", meaning: "Kąt krawędzi do podstawy" },
        { latex: "\\tan \\beta = \\frac{H}{a_{\\text{podstawy}}}", meaning: "Kąt ściany do podstawy (przez apotemy)" }
      ]
    }
  ],
  mistakes: [
    "Objętość ostrosłupa/stożka: pamiętaj o $\\frac{1}{3}$!",
    "Przekątna prostopadłościanu: $\\sqrt{a^2+b^2+c^2}$, nie $\\sqrt{a+b+c}$",
    "Pomylenie tworzącej stożka $l$ z wysokością $H$",
    "Kula: objętość $\\frac{4}{3}\\pi r^3$ (z potęgą 3!), pole $4\\pi r^2$ (z potęgą 2)",
    "Wysokość ostrosłupa: to odcinek prostopadły z wierzchołka na podstawę, nie krawędź boczna"
  ],
  strategy: [
    "Narysuj bryłę i zaznacz dane na rysunku",
    "Wyciągnij z bryły trójkąt prostokątny i użyj Pitagorasa",
    "Kąt w bryle → szukaj odpowiedniego trójkąta prostokątnego",
    "Objętość = $P_p \\cdot H$ (graniastosłup) lub $\\frac{1}{3}P_p \\cdot H$ (ostrosłup/stożek)",
    "Pole = suma pól wszystkich ścian"
  ],
  tasks: [
    {
      level: "łatwe",
      q: "Oblicz objętość sześcianu o krawędzi $a = 5$.",
      hint: "$V = a^3$.",
      steps: [
        { math: "$V = a^3 = 5^3 = 125$", comment: "Sześcian to szczególny prostopadłościan, w którym wszystkie krawędzie są równe. Objętość = bok do sześcianu." }
      ],
      answer: "$V = 125$"
    },
    {
      level: "łatwe",
      q: "Oblicz objętość walca o promieniu $r = 3$ i wysokości $H = 10$.",
      hint: "$V = \\pi r^2 H$.",
      steps: [
        { math: "$V = \\pi r^2 H = \\pi \\cdot 3^2 \\cdot 10 = \\pi \\cdot 9 \\cdot 10 = 90\\pi$", comment: "Walec to «koło ciągnięte w górę» – jego objętość to pole podstawy (koło: πr²) razy wysokość. 90π ≈ 282,74 jednostek³." }
      ],
      answer: "$V = 90\\pi \\approx 282{,}74$"
    },
    {
      level: "łatwe",
      q: "Oblicz pole powierzchni kuli o promieniu $r = 6$.",
      hint: "$P = 4\\pi r^2$.",
      steps: [
        { math: "$P = 4\\pi r^2 = 4\\pi \\cdot 6^2 = 4\\pi \\cdot 36 = 144\\pi$", comment: "Pole powierzchni kuli = dokładnie 4 razy pole wielkiego koła (πr²). Ciekawostka: to jedyna bryła, której pole powierzchni jest tak prosto powiązane z polem przekroju." }
      ],
      answer: "$P = 144\\pi \\approx 452{,}39$"
    },
    {
      level: "średnie",
      q: "Oblicz przekątną prostopadłościanu o wymiarach $3 \\times 4 \\times 12$.",
      hint: "$d = \\sqrt{a^2 + b^2 + c^2}$.",
      steps: [
        { math: "$d = \\sqrt{a^2 + b^2 + c^2} = \\sqrt{9 + 16 + 144} = \\sqrt{169} = 13$", comment: "Przekątna prostopadłościanu to «trójwymiarowy Pitagoras»: d² = a² + b² + c². Tu 9 + 16 + 144 = 169 = 13². Wynik jest całkowity – rzadki, ale zgrabny przypadek." }
      ],
      answer: "$d = 13$"
    },
    {
      level: "średnie",
      q: "Ostrosłup prawidłowy czworokątny ma podstawę o boku $a = 6$ i wysokość $H = 4$. Oblicz objętość.",
      hint: "Pole podstawy (kwadrat) = $a^2$. $V = \\frac{1}{3}a^2 H$.",
      steps: [
        { math: "$P_p = a^2 = 6^2 = 36$", comment: "Podstawa to kwadrat o boku 6, więc jego pole = 36." },
        { math: "$V = \\frac{1}{3} P_p \\cdot H = \\frac{1}{3} \\cdot 36 \\cdot 4 = \\frac{144}{3} = 48$", comment: "Objętość ostrosłupa = ⅓ objętości graniastosłupa o tej samej podstawie i wysokości. W graniastosłupie «zmieściłyby się» dokładnie 3 takie ostrosłupy." }
      ],
      answer: "$V = 48$"
    },
    {
      level: "średnie",
      q: "Stożek ma promień $r = 5$ i tworzącą $l = 13$. Oblicz wysokość i objętość.",
      hint: "Pitagoras: $H = \\sqrt{l^2 - r^2}$.",
      steps: [
        { math: "$H = \\sqrt{l^2 - r^2} = \\sqrt{13^2 - 5^2} = \\sqrt{169 - 25} = \\sqrt{144} = 12$", comment: "W stożku tworząca (l), promień (r) i wysokość (H) tworzą trójkąt prostokątny. Z tw. Pitagorasa: H² + r² = l². Znów trójka pitagorejska: 5-12-13!" },
        { math: "$V = \\frac{1}{3}\\pi r^2 H = \\frac{1}{3}\\pi \\cdot 25 \\cdot 12 = 100\\pi$", comment: "Objętość stożka = ⅓ objętości walca o tym samym promieniu i wysokości. ⅓ · 25 · 12 = 100. V = 100π ≈ 314,16." }
      ],
      answer: "$H = 12$, $V = 100\\pi$"
    },
    {
      level: "średnie",
      q: "Oblicz pole powierzchni całkowitej graniastosłupa prawidłowego trójkątnego o krawędzi podstawy $a = 4$ i wysokości $H = 10$.",
      hint: "Pole podstawy trójkąta równobocznego + pole boczne.",
      steps: [
        { math: "$P_p = \\frac{a^2\\sqrt{3}}{4} = \\frac{16\\sqrt{3}}{4} = 4\\sqrt{3}$", comment: "Podstawa to trójkąt równoboczny o boku 4. Stosujemy wzór P = a²√3/4." },
        { math: "$P_b = 3 \\cdot a \\cdot H = 3 \\cdot 4 \\cdot 10 = 120$", comment: "Powierzchnia boczna to 3 prostokąty (bo graniastosłup jest prosty, a podstawa to trójkąt – 3 boki). Każdy prostokąt ma wymiary a × H." },
        { math: "$P_c = 2P_p + P_b = 2 \\cdot 4\\sqrt{3} + 120 = 8\\sqrt{3} + 120 \\approx 133{,}86$", comment: "Pole całkowite = dwie podstawy + powierzchnia boczna. Zostawiamy wynik w postaci dokładnej: 8√3 + 120." }
      ],
      answer: "$P_c = 8\\sqrt{3} + 120 \\approx 133{,}86$"
    },
    {
      level: "trudne",
      q: "W sześcian o krawędzi $a$ wpisano kulę. Wyznacz stosunek objętości kuli do objętości sześcianu.",
      hint: "Promień wpisanej kuli = $\\frac{a}{2}$.",
      steps: [
        { math: "$r = \\frac{a}{2}$", comment: "Kula wpisana w sześcian jest styczna do każdej ściany. Jej średnica = krawędź sześcianu, więc promień = a/2." },
        { math: "$V_{\\text{kuli}} = \\frac{4}{3}\\pi \\left(\\frac{a}{2}\\right)^3 = \\frac{4}{3}\\pi \\cdot \\frac{a^3}{8} = \\frac{\\pi a^3}{6}$", comment: "Obliczamy objętość kuli. (a/2)³ = a³/8, potem 4/3 · 1/8 = 4/24 = 1/6." },
        { math: "$V_{\\text{sześcianu}} = a^3$", comment: "Objętość sześcianu to po prostu a³." },
        { math: "$\\frac{V_k}{V_s} = \\frac{\\pi a^3 / 6}{a^3} = \\frac{\\pi}{6} \\approx 0{,}524$", comment: "a³ się skraca – stosunek nie zależy od wielkości sześcianu! Kula zajmuje ok. 52,4% objętości sześcianu. Reszta to «puste» narożniki." }
      ],
      answer: "$\\frac{\\pi}{6} \\approx 0{,}524$"
    },
    {
      level: "trudne",
      q: "Ostrosłup prawidłowy czworokątny ma krawędź podstawy $a = 10$ i krawędź boczną $b = 13$. Oblicz kąt nachylenia krawędzi bocznej do płaszczyzny podstawy.",
      hint: "Spodek krawędzi bocznej to wierzchołek podstawy, spodek wysokości to środek kwadratu.",
      steps: [
        { math: "Połowa przekątnej podstawy: $\\frac{a\\sqrt{2}}{2} = \\frac{10\\sqrt{2}}{2} = 5\\sqrt{2}$", comment: "Odległość od środka kwadratu (spodek wysokości) do wierzchołka (spodek krawędzi bocznej) = połowa przekątnej kwadratu o boku 10." },
        { math: "$H = \\sqrt{b^2 - (5\\sqrt{2})^2} = \\sqrt{169 - 50} = \\sqrt{119}$", comment: "Z tw. Pitagorasa w trójkącie: krawędź boczna → przeciwprostokątna, H i połowa przekątnej → przyprostokątne." },
        { math: "$\\cos \\alpha = \\frac{5\\sqrt{2}}{13}$, gdzie $\\alpha$ to kąt między krawędzią boczną a podstawą", comment: "Kąt nachylenia krawędzi bocznej do podstawy to kąt w trójkącie prostokątnym pomiędzy krawędzią boczną (b = 13) a rzutem na podstawę (5√2). Cosinus = przyprostokątna / przeciwprostokątna." },
        { math: "$\\alpha = \\arccos\\frac{5\\sqrt{2}}{13} \\approx 57{,}1°$", comment: "Obliczamy kąt kalkulatorem: 5√2/13 ≈ 7,07/13 ≈ 0,544, arccos(0,544) ≈ 57,1°. Krawędź boczna nachylona pod kątem ok. 57° do poziomu." }
      ],
      answer: "$\\alpha = \\arccos\\frac{5\\sqrt{2}}{13} \\approx 57{,}1°$"
    },
    {
      level: "trudne",
      q: "W walec o promieniu $r = 3$ i wysokości $H = 8$ wpisano stożek (podstawa stożka = podstawa walca). Oblicz objętość \"pierścienia\" (walec minus stożek).",
      hint: "Odejmij objętość stożka od objętości walca.",
      steps: [
        { math: "$V_w = \\pi r^2 H = \\pi \\cdot 9 \\cdot 8 = 72\\pi$", comment: "Objętość walca o promieniu 3 i wysokości 8." },
        { math: "$V_s = \\frac{1}{3}\\pi r^2 H = \\frac{1}{3} \\cdot \\pi \\cdot 9 \\cdot 8 = 24\\pi$", comment: "Stożek wpisany w walec ma ten sam promień i wysokość. Jego objętość = ⅓ objętości walca – to zawsze dokładnie ⅓!" },
        { math: "$V = V_w - V_s = 72\\pi - 24\\pi = 48\\pi \\approx 150{,}80$", comment: "Pierścień (walec bez stożka) to zawsze ⅔ objętości walca. Tu: 48π ≈ 150,80 jednostek³." }
      ],
      answer: "$V = 48\\pi \\approx 150{,}80$"
    }
  ]
},

/* ──────────────────────────────────────────────
   10. RACHUNEK PRAWDOPODOBIEŃSTWA I KOMBINATORYKA
   ────────────────────────────────────────────── */
"prawdopodobienstwo": {
  title: "Prawdopodobieństwo i kombinatoryka",
  color: "cyan",
  icon: "fa-dice",
  intro: "Rachunek prawdopodobieństwa i kombinatoryka na maturze podstawowej obejmują: klasyczną definicję prawdopodobieństwa, zliczanie (permutacje, kombinacje, wariacje), prawdopodobieństwo warunkowe oraz drzewka. Kluczowa zasada: systematyczne zliczanie przypadków.",
  examFocus: [
    "Klasyczna definicja prawdopodobieństwa: $P(A) = \\frac{|A|}{|\\Omega|}$",
    "Kombinacje, permutacje, wariacje (z/bez powtórzeń)",
    "Prawdopodobieństwo sumy i iloczynu zdarzeń",
    "Drzewka prawdopodobieństwa (doświadczenia wieloetapowe)",
    "Symbole Newtona i trójkąt Pascala"
  ],
  theory: [
    {
      title: "Klasyczna definicja prawdopodobieństwa",
      text: "Jeśli zdarzenia elementarne są jednakowo prawdopodobne, to prawdopodobieństwo zdarzenia $A$ to stosunek liczby zdarzeń sprzyjających do liczby wszystkich zdarzeń: $P(A) = \\frac{|A|}{|\\Omega|}$. Prawdopodobieństwo zawsze mieści się w przedziale $[0, 1]$. Zdarzenie pewne: $P = 1$, niemożliwe: $P = 0$.",
      formulas: [
        { latex: "P(A) = \\frac{|A|}{|\\Omega|}", meaning: "Klasyczna definicja prawdopodobieństwa" },
        { latex: "0 \\leq P(A) \\leq 1", meaning: "Zakres prawdopodobieństwa" },
        { latex: "P(A') = 1 - P(A)", meaning: "Prawdopodobieństwo zdarzenia przeciwnego" }
      ]
    },
    {
      title: "Kombinatoryka",
      text: "Permutacja: uporządkowanie $n$ elementów na $n$ sposobów ($n!$). Wariacja bez powtórzeń: wybór $k$ z $n$ z uwzględnieniem kolejności. Kombinacja: wybór $k$ z $n$ bez uwzględnienia kolejności (symbol Newtona $\\binom{n}{k}$). Zasada mnożenia: jeśli etap 1 ma $m$ opcji, etap 2 ma $n$ opcji → razem $m \\cdot n$.",
      formulas: [
        { latex: "n! = 1 \\cdot 2 \\cdot 3 \\cdot \\ldots \\cdot n", meaning: "Silnia (permutacja bez powtórzeń)" },
        { latex: "V_n^k = \\frac{n!}{(n-k)!}", meaning: "Wariacja bez powtórzeń" },
        { latex: "\\binom{n}{k} = \\frac{n!}{k!(n-k)!}", meaning: "Kombinacja (symbol Newtona)" },
        { latex: "\\overline{V}_n^k = n^k", meaning: "Wariacja z powtórzeniami" }
      ]
    },
    {
      title: "Prawdopodobieństwo zdarzeń złożonych",
      text: "Zdarzenia wykluczające się (nie mogą zajść jednocześnie): $P(A \\cup B) = P(A) + P(B)$. Zdarzenia niezależne: $P(A \\cap B) = P(A) \\cdot P(B)$. Ogólny wzór na sumę: $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$.",
      formulas: [
        { latex: "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)", meaning: "Prawdopodobieństwo sumy (ogólne)" },
        { latex: "P(A \\cap B) = P(A) \\cdot P(B)", meaning: "Iloczyn zdarzeń niezależnych" },
        { latex: "P(A \\cup B) = P(A) + P(B)", meaning: "Suma zdarzeń wykluczających się" }
      ]
    },
    {
      title: "Drzewka i schemat Bernoulliego",
      text: "Drzewko prawdopodobieństwa to narzędzie do wieloetapowych doświadczeń: na gałęziach zapisujemy prawdopodobieństwa, a prawdopodobieństwo ścieżki = iloczyn prawdopodobieństw na gałęziach tej ścieżki. Schemat Bernoulliego: $n$ niezależnych powtórzeń doświadczenia z prawdopodobieństwem sukcesu $p$.",
      formulas: [
        { latex: "P(k) = \\binom{n}{k} p^k (1-p)^{n-k}", meaning: "Schemat Bernoulliego (dokładnie k sukcesów w n próbach)" }
      ]
    }
  ],
  mistakes: [
    "Mylenie kombinacji (bez kolejności) z wariacją (z kolejnością)",
    "Zapominanie o zdarzeniu przeciwnym – czasem $P(A) = 1 - P(A')$ jest prostsze",
    "W drzewku: mnożymy prawdopodobieństwa wzdłuż gałęzi, dodajemy między gałęziami",
    "$0! = 1$ (nie $0$!)",
    "Przy losowaniu BEZ zwracania prawdopodobieństwa się zmieniają w kolejnych krokach"
  ],
  strategy: [
    "Określ przestrzeń zdarzeń $\\Omega$ i zdarzenie $A$",
    "Zdecyduj: czy kolejność ma znaczenie? (wariacja vs kombinacja)",
    "Wieloetapowe → rysuj drzewko",
    "\"Prawd. co najmniej jednego\" → zdarzenie przeciwne: $1 - P(\\text{żadnego})$",
    "Schemat Bernoulliego → sprawdź: niezależne powtórzenia, stałe $p$"
  ],
  tasks: [
    {
      level: "łatwe",
      q: "Z talii 52 kart losujemy jedną. Jakie jest prawdopodobieństwo wylosowania asa?",
      hint: "W talii są 4 asy.",
      steps: [
        { math: "$|\\Omega| = 52$, $|A| = 4$ (4 asy: pik, kier, trefl, karo)", comment: "Przestrzeń zdarzeń to 52 karty. Zdarzenie sprzyjające: wylosowanie jednego z 4 asów." },
        { math: "$P(A) = \\frac{|A|}{|\\Omega|} = \\frac{4}{52} = \\frac{1}{13}$", comment: "Stosujemy klasyczną definicję prawdopodobieństwa. Skracamy 4/52 przez 4. P ≈ 0,077 czyli ok. 7,7%." }
      ],
      answer: "$P = \\frac{1}{13}$"
    },
    {
      level: "łatwe",
      q: "Oblicz $\\binom{6}{2}$.",
      hint: "$\\binom{n}{k} = \\frac{n!}{k!(n-k)!}$.",
      steps: [
        { math: "$\\binom{6}{2} = \\frac{6!}{2! \\cdot 4!} = \\frac{6 \\cdot 5}{2 \\cdot 1} = \\frac{30}{2} = 15$", comment: "Symbol Newtona «6 nad 2» to liczba sposobów wybrania 2 elementów z 6 bez uwzględnienia kolejności. Skracamy: 6!/4! = 6·5, dzielimy przez 2! = 2." }
      ],
      answer: "$15$"
    },
    {
      level: "łatwe",
      q: "Rzucamy kostką do gry. Jakie jest prawdopodobieństwo wyrzucenia liczby parzystej?",
      hint: "Liczby parzyste: 2, 4, 6.",
      steps: [
        { math: "$|\\Omega| = 6$ (wyniki: 1, 2, 3, 4, 5, 6), $|A| = 3$ (parzyste: 2, 4, 6)", comment: "Kostka ma 6 ścian, każda jednakowo prawdopodobna. Sprzyjające: 3 z 6 ścian pokazują liczbę parzystą." },
        { math: "$P = \\frac{3}{6} = \\frac{1}{2}$", comment: "Połowa wyników jest parzysta, połowa nieparzysta – prawdopodobieństwo wynosi ½ = 50%. To intuicyjnie oczywiste." }
      ],
      answer: "$P = \\frac{1}{2}$"
    },
    {
      level: "średnie",
      q: "Na ile sposobów można wybrać 3 osoby z 10 do komisji (kolejność nieistotna)?",
      hint: "To kombinacja: $\\binom{10}{3}$.",
      steps: [
        { math: "$\\binom{10}{3} = \\frac{10!}{3! \\cdot 7!} = \\frac{10 \\cdot 9 \\cdot 8}{3 \\cdot 2 \\cdot 1} = \\frac{720}{6} = 120$", comment: "Kolejność nie ma znaczenia (komisja {A,B,C} = {C,A,B}), więc to kombinacja, nie wariacja. Gdyby kolejność miała znaczenie (np. przewodniczący, zastępca, sekretarz), byłoby V = 10·9·8 = 720." }
      ],
      answer: "$120$"
    },
    {
      level: "średnie",
      q: "Rzucamy dwa razy kostką. Jakie jest prawd. że suma oczek wyniesie 7?",
      hint: "Wypisz pary dające sumę 7.",
      steps: [
        { math: "$|\\Omega| = 6 \\cdot 6 = 36$", comment: "Dwa niezależne rzuty, każdy o 6 wynikach – zasada mnożenia daje 36 zdarzeń elementarnych." },
        { math: "Pary dające sumę 7: $(1,6),(2,5),(3,4),(4,3),(5,2),(6,1)$ → $|A| = 6$", comment: "Systematycznie wypisujemy wszystkie pary. Jest ich 6 – to najwięcej ze wszystkich możliwych sum (7 jest «najpopularniejszą» sumą dwóch kostek)." },
        { math: "$P = \\frac{6}{36} = \\frac{1}{6} \\approx 16{,}7\\%$", comment: "Suma 7 jest najczęstsza wśród 11 możliwych sum (2 do 12). Każda inna suma ma mniejsze prawdopodobieństwo." }
      ],
      answer: "$P = \\frac{1}{6}$"
    },
    {
      level: "średnie",
      q: "W urnie jest 5 kul białych i 3 czarne. Losujemy 2 bez zwracania. Jakie jest prawd. wylosowania 2 białych?",
      hint: "Użyj kombinacji: $\\frac{\\binom{5}{2}}{\\binom{8}{2}}$.",
      steps: [
        { math: "$\\binom{5}{2} = 10$ i $\\binom{8}{2} = 28$", comment: "Liczba sposobów wybrania 2 białych z 5: C(5,2) = 10. Wszystkie sposoby wybrania 2 z 8 kul: C(8,2) = 28." },
        { math: "$P = \\frac{\\binom{5}{2}}{\\binom{8}{2}} = \\frac{10}{28} = \\frac{5}{14} \\approx 35{,}7\\%$", comment: "Stosujemy klasyczną definicję z kombinacjami. Alternatywnie: P = 5/8 · 4/7 = 20/56 = 5/14 (kolejne losowania bez zwracania – prawdopodobieństwa się zmieniają!)." }
      ],
      answer: "$P = \\frac{5}{14}$"
    },
    {
      level: "średnie",
      q: "Jakie jest prawdopodobieństwo, że w 4 rzutach monetą wypadną dokładnie 2 orły?",
      hint: "Schemat Bernoulliego: $n = 4$, $k = 2$, $p = \\frac{1}{2}$.",
      steps: [
        { math: "$P = \\binom{4}{2} \\left(\\frac{1}{2}\\right)^2 \\left(\\frac{1}{2}\\right)^2 = \\binom{4}{2} \\cdot \\frac{1}{16}$", comment: "Schemat Bernoulliego: n = 4 niezależnych powtórzeń, p = ½ (orzeł), k = 2 sukcesy. C(4,2) wybiera, KTÓRE 2 z 4 rzutów dadzą orła." },
        { math: "$= 6 \\cdot \\frac{1}{16} = \\frac{6}{16} = \\frac{3}{8} = 37{,}5\\%$", comment: "C(4,2) = 6 (bo OOXX, OXOX, OXXO, XOOX, XOXO, XXOO). Każdy układ ma prawdopodobieństwo (½)⁴ = 1/16. Suma: 6/16 = 3/8." }
      ],
      answer: "$P = \\frac{3}{8}$"
    },
    {
      level: "trudne",
      q: "Z grupy 6 mężczyzn i 4 kobiet losujemy 4-osobowy zespół. Jakie jest prawdopodobieństwo, że będą w nim dokładnie 2 kobiety?",
      hint: "Wybierz 2 z 4 kobiet i 2 z 6 mężczyzn.",
      steps: [
        { math: "$|A| = \\binom{4}{2} \\cdot \\binom{6}{2} = 6 \\cdot 15 = 90$", comment: "Zdarzenie sprzyjające: wybrać 2 kobiety Z 4 (na C(4,2) = 6 sposobów) ORAZ 2 mężczyzn z 6 (na C(6,2) = 15 sposobów). Zasada mnożenia: 6 · 15 = 90." },
        { math: "$|\\Omega| = \\binom{10}{4} = \\frac{10 \\cdot 9 \\cdot 8 \\cdot 7}{4!} = \\frac{5040}{24} = 210$", comment: "Wszystkie sposoby wybrania 4 osób z 10 (bez względu na płeć): C(10,4) = 210." },
        { math: "$P = \\frac{90}{210} = \\frac{3}{7} \\approx 42{,}9\\%$", comment: "Skracamy: 90/210 = 3/7. To najwyższe prawdopodobieństwo spośród wszystkich rozkładów (0K, 1K, 2K, 3K, 4K), bo 2 kobiety na 4 osoby najlepiej odpowiada proporcji 4/10 w grupie." }
      ],
      answer: "$P = \\frac{3}{7}$"
    },
    {
      level: "trudne",
      q: "Prawdopodobieństwo trafienia do celu wynosi $0{,}6$. Strzelec oddaje 3 strzały. Jakie jest prawd. trafienia co najmniej raz?",
      hint: "Zdarzenie przeciwne: \"ani razu nie trafi\". $P(\\geq 1) = 1 - P(0)$.",
      steps: [
        { math: "$P(0 \\text{ trafień}) = (1 - 0{,}6)^3 = 0{,}4^3 = 0{,}064$", comment: "Zdarzenie przeciwne do «co najmniej 1 trafienie» to «0 trafień». Prawdopodobieństwo pudła = 0,4. Trzy pudła z rzędu: 0,4³ (niezależne strzały)." },
        { math: "$P(\\geq 1) = 1 - P(0) = 1 - 0{,}064 = 0{,}936$", comment: "P(co najmniej 1) = 1 − P(żadnego). To klasyczna metoda «przez dopełnienie» – dużo prostsza niż liczenie P(1) + P(2) + P(3) oddzielnie. Wynik: 93,6%." }
      ],
      answer: "$P = 0{,}936 = \\frac{117}{125}$"
    },
    {
      level: "trudne",
      q: "Na ile sposobów można ustawić 5 osób w rzędzie, jeśli osoby A i B muszą stać obok siebie?",
      hint: "Traktuj parę {A, B} jako jeden element (2 sposoby wewnątrz pary).",
      steps: [
        { math: "Traktujemy parę \\{A,B\\} jako jeden «blok» → mamy 4 elementy do ustawienia", comment: "Kluczowa technika: «sklejamy» A i B w jeden element. Teraz zamiast 5 osób ustawiamy 4 obiekty (blok + 3 osoby)." },
        { math: "Permutacje 4 elementów: $4! = 24$", comment: "4 elementy ustawiamy na 4! = 24 sposobów." },
        { math: "Para \\{A,B\\} może być ułożona jako AB lub BA → 2 warianty", comment: "Wewnątrz bloku A i B mogą zamienić się miejscami – to daje mnożnik 2." },
        { math: "Razem: $4! \\cdot 2 = 24 \\cdot 2 = 48$", comment: "Zasada mnożenia: 24 ustawień bloków × 2 wewnętrzne ułożenia = 48. Dla porównania: bez ograniczeń byłoby 5! = 120 ustawień." }
      ],
      answer: "$48$"
    }
  ]
}

}; // end MATURA_TOPICS
