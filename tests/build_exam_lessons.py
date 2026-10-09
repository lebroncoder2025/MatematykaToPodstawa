# -*- coding: utf-8 -*-
"""Maintainer tool: original CKE page excerpts and independently written explanations.

Requires PyMuPDF. Source PDFs stay unchanged. JSON is served statically by Pages.
"""
import json, re
from pathlib import Path
import fitz

ROOT=Path(__file__).resolve().parents[1]
def task(n,title,q,answer,steps,hint,trap,diagram=None):
    return dict(number=str(n),title=title,summary=q,answer=answer,steps=steps,hint=hint,trap=trap,diagram=diagram)

P=[
task(1,'Pierwiastki i potęga ujemna',r'Oblicz $\sqrt{25/8}\cdot\sqrt2+2^{-1}$.',r'C: $3$',[
 r'Połącz pierwiastki: $\sqrt{25/8}\cdot\sqrt2=\sqrt{25/4}=5/2$.',r'Ujemny wykładnik oznacza odwrotność: $2^{-1}=1/2$.',r'Dodaj: $5/2+1/2=3$.'],'Najpierw wykonaj mnożenie pierwiastków.','Nie traktuj ujemnego wykładnika jako ujemnej liczby.'),
task(2,'Odsetki składane','Lokata: 10 000 zł, dwa lata, 6% rocznie. Oblicz same odsetki, bez podatku.',r'B: $1236\text{ zł}$',[
 r'Po pierwszym roku kapitał wynosi $10000\cdot1{,}06=10600$ zł.',r'Po drugim roku: $10600\cdot1{,}06=11236$ zł.',r'Odsetki to przyrost kapitału: $11236-10000=1236$ zł.'],'W drugim roku oprocentowaniu podlega także wcześniejszy zysk.','Wynik 11 236 zł jest kapitałem końcowym, a nie kwotą odsetek.'),
task(3,'Pierwiastek pierwiastka',r'Zapisz $\sqrt{5\sqrt5}$ jako potęgę liczby $5$.',r'C: $5^{3/4}$',[
 r'Zamień wewnętrzny pierwiastek na potęgę: $5\sqrt5=5^1\cdot5^{1/2}=5^{3/2}$.',r'Pierwiastek z całości mnoży wykładnik przez $1/2$: $(5^{3/2})^{1/2}=5^{3/4}$.'],'Pierwiastek kwadratowy odpowiada wykładnikowi 1/2.','Pierwiastek obejmuje cały iloczyn.'),
task(4,'Różnica logarytmów',r'Oblicz $\log_8 4-\log_8 32$.',r'B: $-1$',[
 r'Różnicę zapisz jako logarytm ilorazu: $\log_8(4/32)=\log_8(1/8)$.',r'Ponieważ $8^{-1}=1/8$, otrzymujemy $-1$.'],'Oba logarytmy mają tę samą podstawę.','Różnica logarytmów nie jest logarytmem różnicy.'),
task(5,'Podzielność i liczba cyfr',r'Oceń podzielność $4^{12}5^{24}$ przez $20$ oraz to, czy liczba ma 25 cyfr.',r'PP',[
 r'$4^{12}5^{24}=2^{24}5^{24}=10^{24}$.',r'$10^{24}=20\cdot(5\cdot10^{22})$, więc jest podzielne przez $20$.',r'Liczba $10^{24}$ ma jedynkę i 24 zera, czyli 25 cyfr.'],'Sprowadź oba czynniki do tej samej potęgi.','Liczba zer jest o jeden mniejsza od liczby cyfr.'),
task(6,'Kwadrat sumy',r'Oblicz $x^2+10x+25$ dla $x=\sqrt2-5$.',r'A: $2$',[
 r'Rozpoznaj wzór: $x^2+10x+25=(x+5)^2$.',r'Po podstawieniu $x+5=\sqrt2$, a więc $(x+5)^2=2$.'],'Unikniesz długiego rozwijania kwadratów.','W kwadracie sumy występuje składnik 2ab.'),
task(7,'Dowód podzielności',r'Uzasadnij podzielność $7n^2+21n$ przez $14$ dla każdego $n\in\mathbb Z$.',r'$14\mid(7n^2+21n)$',[
 r'Wyłącz wspólny czynnik: $7n^2+21n=7n(n+3)$.',r'Liczby $n$ i $n+3$ mają różną parzystość, bo różnią się liczbą nieparzystą. Ich iloczyn jest więc parzysty.',r'Istnieje $k\in\mathbb Z$ taki, że $n(n+3)=2k$. Stąd $7n(n+3)=14k$, co kończy dowód.'],'Potrzebujesz czynnika 7 i czynnika 2.','Sprawdzenie kilku wartości n nie dowodzi tezy dla wszystkich liczb całkowitych.'),
task(8,'Suma rozwiązań',r'Równanie $3(x+3)(x-m)(2x+4)=0$ ma sumę rozwiązań równą zero. Wyznacz $m$.',r'C: $m=5$',[
 r'Z zerowania czynników otrzymujesz $x=-3$, $x=m$ oraz $x=-2$.',r'Gdy $m$ jest różne od $-3$ i $-2$, suma wynosi $m-5$. Warunek $m-5=0$ daje $m=5$.',r'Przypadki powtórzonego pierwiastka $m=-3$ lub $m=-2$ dają zbiór $\{-3,-2\}$ o sumie $-5$, więc odpadają.'],'Iloczyn jest zerem, gdy co najmniej jeden czynnik jest zerem.','Rozwiązania równania tworzą zbiór; powtórzonego pierwiastka nie licz drugi raz.'),
task(9,'Równanie wymierne',r'Rozwiąż $(x+2)/(3x-1)=2/5$.',r'D: $x=12$',[
 r'Najpierw dziedzina: $3x-1\ne0$, czyli $x\ne1/3$.',r'Pomnóż obie strony przez $5(3x-1)$: $5x+10=6x-2$.',r'Otrzymujesz $x=12$. Ta liczba należy do dziedziny.'],'Usuwając mianowniki, pamiętaj o ich niezerowości.','Liczba zerująca mianownik nigdy nie jest rozwiązaniem.'),
task(10,'Nierówność kwadratowa',r'Rozwiąż $3x^2+4x\ge6x+8$.',r'$x\in(-\infty,-4/3]\cup[2,+\infty)$',[
 r'Przenieś wszystko na lewą stronę: $3x^2-2x-8\ge0$.',r'Rozłóż: $(3x+4)(x-2)\ge0$. Miejsca zerowe to $-4/3$ i $2$.',r'Współczynnik przy $x^2$ jest dodatni, więc trójmian jest nieujemny poza przedziałem między pierwiastkami. Oba końce włączamy.'],'Szkic paraboli ułatwi wybór przedziałów.','Nie dziel nierówności przez wyrażenie o nieznanym znaku.','inequality'),
task(11,'Bilety i koszty','Sprzedano 200 biletów: normalne po 35 zł, ulgowe po 25 zł. Po odjęciu 25% kosztów pozostało 4665 zł. Ile było ulgowych?',r'$78$',[
 r'Wpływy przed odjęciem kosztów wynoszą $4665/0{,}75=6220$ zł.',r'Niech $u$ oznacza liczbę ulgowych. Wtedy $35(200-u)+25u=6220$.',r'$7000-10u=6220$, zatem $u=78$. Sprawdzenie: 122 normalne i 78 ulgowych dają 6220 zł.'],'Kwota 4665 zł jest 75% wszystkich wpływów.','Nie zwiększaj 4665 zł po prostu o 25%.'),
task('12.1','Odczyt wykresu',r'Dla $f(x)=x+2$ na $[-4,2]$ i $f(x)=-x+5$ na $(2,5)$ znajdź $f(x)=3$ i maksimum na $[2,3]$.',r'$x=1$; maksimum $4$',[
 r'Na pierwszej części $x+2=3$ daje $x=1$, które leży w jej dziedzinie.',r'Na drugiej części $-x+5=3$ daje $x=2$, ale $2\notin(2,5)$, więc to nie jest dodatkowe rozwiązanie.',r'W punkcie $x=2$ obowiązuje pierwszy wzór i $f(2)=4$. Dla $x>2$ do $3$ wartości są mniejsze niż 3. Maksimum to 4.'],'Sprawdź, do którego odcinka należy każdy koniec.','Nie zastępuj wartości f(2) wartością z drugiego, otwartego odcinka.','piecewise'),
task('12.2','Wartości i argumenty',r'Dla $f(x)=x+2$ na $[-4,2]$ i $f(x)=-x+5$ na $(2,5)$ wyznacz zbiór wartości i argumenty spełniające $f(x)>1$.',r'$[-2,4]$; $(-1,4)$',[
 r'Pierwszy odcinek osiąga wszystkie wartości od $-2$ do $4$, włącznie. Drugi przyjmuje wartości w $(0,3)$, już zawarte w tym zakresie.',r'Na pierwszej części: $x+2>1$ i $x\in[-4,2]$, czyli $x\in(-1,2]$.',r'Na drugiej części: $-x+5>1$ i $x\in(2,5)$, czyli $x\in(2,4)$. Suma zbiorów to $(-1,4)$.'],'Przecięcie z dziedziną wykonaj osobno dla każdej części.','Przy nierówności ostrej końce, w których f(x)=1, nie należą do wyniku.','piecewise'),
task('13.1','Znaki współczynników',r'Prosta na wykresie przechodzi przez $(-2,0)$ i $(0,-3)$. Oceń, czy $a>0$ i $b>0$ we wzorze $ax+b$.',r'FF',[
 r'Wykres opada, gdy argument rośnie, więc $a<0$.',r'Przecięcie osi pionowej to $(0,-3)$, zatem $b=-3<0$. Oba zdania są fałszywe.'],'Współczynnik b odczytujesz z osi Oy.','Znak a opisuje kierunek zmian, a znak b wysokość przecięcia osi.','line'),
task('13.2','Tangens kąta nachylenia',r'Prosta przechodzi przez $(-2,0)$ i $(0,-3)$. Oblicz tangens jej kąta nachylenia do osi $Ox$.',r'A: $-3/2$',[
 r'Współczynnik kierunkowy to $a=(-3-0)/(0-(-2))=-3/2$.',r'Dla kąta nachylenia prostej $\tan\alpha=a$, zatem $\tan\alpha=-3/2$. Kąt jest rozwarty.'],'Tangens kąta nachylenia jest współczynnikiem kierunkowym.','Nie zamieniaj kąta nachylenia na ostry kąt między prostymi.','line'),
task(14,'Przesunięcie paraboli',r'Wierzchołek $f$ to $(3,-2)$. Dla $g(x)=f(x+1)$ wiadomo, że $g(0)=0$. Wyznacz postać ogólną $f$.',r'$f(x)=\frac12x^2-3x+\frac52$',[
 r'Wierzchołek daje postać kanoniczną $f(x)=a(x-3)^2-2$.',r'$g(0)=f(1)=0$, więc $a(1-3)^2-2=0$, czyli $a=1/2$.',r'Rozwiń $\frac12(x-3)^2-2=\frac12x^2-3x+\frac52$.'],'Zapisz najpierw postać kanoniczną.','Przesunięcie f(x+1) przenosi wykres o jedną jednostkę w lewo.','quadratic'),
task(15,'Wyrazy ciągu geometrycznego',r'$a_n=3n+5$, a ciąg $(a_1,a_9,a_k)$ jest geometryczny. Oblicz $k$.',r'$k=41$',[
 r'$a_1=8$ oraz $a_9=32$, zatem iloraz trzech wskazanych wyrazów wynosi $32/8=4$.',r'$a_k=32\cdot4=128$. Z równania $3k+5=128$ otrzymujesz $k=41$.'],'Rozpatrujesz trzy wskazane wyrazy, a nie geometryczność całego ciągu.','Indeks wyrazu nie jest jego wartością.'),
task(16,'Ciąg arytmetyczny',r'$a_1=1$ oraz $a_5=17$. Oblicz $a_9$.',r'B: $33$',[
 r'$a_5=a_1+4r$, więc $17=1+4r$ i $r=4$.',r'$a_9=1+8\cdot4=33$.'],'Między pierwszym i piątym wyrazem są cztery przyrosty.','We wzorze a_n jest n−1, a nie n.'),
task(17,'Iloczyny w ciągu',r'W ciągu geometrycznym $a_3a_6=18$. Oblicz $a_2a_7$.',r'$18$',[
 r'$a_3a_6=(a_1q^2)(a_1q^5)=a_1^2q^7$.',r'$a_2a_7=(a_1q)(a_1q^6)=a_1^2q^7$. Oba iloczyny są równe, więc szukany ma wartość 18.'],'Sumy indeksów obu par są takie same.','Nie próbuj osobno wyznaczać a_1 i q; nie są potrzebne.'),
task(18,'Sinus w trójkącie',r'Trójkąt jest prostokątny w $B$, $BC=2$, $AC=2\sqrt{10}$. Oblicz sinus kąta przy $C$.',r'C: $3/\sqrt{10}$',[
 r'Z Pitagorasa: $AB^2=(2\sqrt{10})^2-2^2=40-4=36$, zatem $AB=6$.',r'Bok naprzeciw kąta przy $C$ to $AB$. Stąd $\sin\gamma=AB/AC=6/(2\sqrt{10})=3/\sqrt{10}$.'],'Zaznacz bok naprzeciw szukanego kąta.','BC jest przyprostokątną przyległą do tego kąta, a nie przeciwległą.','rightTriangle'),
task(19,'Kąt środkowy i wpisany',r'$A,B,C,D$ leżą na okręgu o środku $O$. Kąt $CDA$ ma $50^\circ$, a $COB$ ma $30^\circ$. Punkt $B$ leży na krótszym łuku $AC$. Oblicz ostry kąt $BOA$.',r'C: $70^\circ$',[
 r'Kąt środkowy oparty na tym samym łuku co $50^\circ$ ma $100^\circ$.',r'Punkt $B$ dzieli ten łuk: $\angle BOA=100^\circ-30^\circ=70^\circ$.'],'Kąt środkowy ma dwa razy większą miarę od wpisanego opartego na tym samym łuku.','Sprawdź, na którym łuku leży B.','circleAngles'),
task(20,'Podobieństwo trójkątów',r'Proste $AD$ i $CB$ są równoległe. Odcinki $AC$ i $DB$ przecinają się w $O$. $OA=12$, $OB=6$, $OC=8$. Oblicz $OD$.',r'B: $9$',[
 r'Trójkąty $AOD$ i $COB$ są podobne: mają równe kąty wierzchołkowe i kąty przy prostych równoległych.',r'Odpowiadają sobie $OA\leftrightarrow OC$ oraz $OD\leftrightarrow OB$. Zatem $OD/6=12/8$.',r'$OD=9$.'],'Najpierw ustal odpowiadające sobie wierzchołki.','Nie zestawiaj w proporcji boków, które sobie nie odpowiadają.','similarity'),
task(21,'Dwusieczna i pola',r'W trójkącie $KLM$ mamy $MK=a$, $ML=b$, a dwusieczna $MN$ przecina bok $KL$ w $N$. Uzasadnij stosunek pól $P_{KNM}/P_{NLM}=a/b$.',r'$P_{KNM}/P_{NLM}=a/b$',[
 r'Niech $\alpha=\angle KMN=\angle NML$. Równość wynika z definicji dwusiecznej.',r'Wzory na pola: $P_{KNM}=\frac12a\cdot MN\cdot\sin\alpha$ oraz $P_{NLM}=\frac12b\cdot MN\cdot\sin\alpha$.',r'Po podzieleniu wspólny dodatni czynnik $\frac12MN\sin\alpha$ się skraca. Pozostaje $a/b$.'],'Użyj wzoru na pole z dwóch boków i kąta między nimi.','Jeśli korzystasz z wysokości, musisz uzasadnić ich równość.','bisector'),
task(22,'Trójkąt równoboczny i okrąg',r'Promień okręgu opisanego na trójkącie równobocznym to $9\sqrt3$. Oblicz bok.',r'$27$',[
 r'Dla trójkąta równobocznego $R=a/\sqrt3$.',r'$a=R\sqrt3=9\sqrt3\cdot\sqrt3=27$.'],'Nie myl promienia okręgu wpisanego z opisanym.','R jest dwa razy większe od promienia okręgu wpisanego.'),
task(23,'Przekształcanie wyrażenia trygonometrycznego',r'Kąt jest ostry i $(3\sin\alpha+4\cos\alpha)/(4\cos\alpha)=6$. Oblicz $\tan\alpha$.',r'D: $20/3$',[
 r'Dla ostrego kąta $\cos\alpha>0$, więc można pomnożyć przez mianownik.',r'$3\sin\alpha+4\cos\alpha=24\cos\alpha$, zatem $3\sin\alpha=20\cos\alpha$.',r'Po podzieleniu przez $3\cos\alpha$ otrzymujesz $\tan\alpha=20/3$.'],'Oddziel składniki z sinusem i cosinusem.','Zachowaj kolejność sin/cos w tangensie.'),
task('24.1','Pole w układzie współrzędnych',r'$A=(0,-3)$, $B=(2,1)$, $C=(0,2)$. Oblicz pole trójkąta.',r'B: $5$',[
 r'Podstawa $AC$ leży na osi $Oy$ i ma długość $2-(-3)=5$.',r'Odległość $B$ od osi $Oy$ wynosi $2$, więc $P=\frac12\cdot5\cdot2=5$.'],'Wybierz pionowy bok jako podstawę.','Wysokość jest odległością od prostej zawierającej podstawę.','coordinateTriangle'),
task('24.2','Środek okręgu opisanego',r'$A=(0,-3)$, $B=(2,1)$, $C=(0,2)$ tworzą trójkąt prostokątny. Wyznacz środek okręgu opisanego.',r'D: $(0,-1/2)$',[
 r'$\overrightarrow{BA}=(-2,-4)$ i $\overrightarrow{BC}=(-2,1)$ mają iloczyn skalarny $4-4=0$. Kąt prosty leży w $B$.',r'Przeciwprostokątną jest $AC$. Środek okręgu opisanego to jej środek: $S=((0+0)/2,(-3+2)/2)=(0,-1/2)$.'],'W trójkącie prostokątnym przeciwprostokątna jest średnicą okręgu opisanego.','Nie wybieraj środka dowolnego boku.','coordinateTriangle'),
task(25,'Równanie okręgu',r'Okrąg ma środek $(1,-3)$ i promień $5$. Oceń przynależność $(4,-7)$ oraz równanie $(x-1)^2+(y+3)^2=5$.',r'PF',[
 r'Dla punktu: $(4-1)^2+(-7+3)^2=9+16=25=5^2$, więc punkt leży na okręgu.',r'Prawa strona równania okręgu to kwadrat promienia. Poprawne równanie ma prawą stronę $25$, więc drugie zdanie jest fałszywe.'],'W równaniu występuje r².','Nie zastępuj kwadratu promienia samym promieniem.'),
task(26,'Proste równoległe',r'Prosta jest równoległa do $y=-x/3+2$ i przechodzi przez $(2,-2)$. Znajdź przecięcie osi $Oy$.',r'D: $(0,-4/3)$',[
 r'Równoległa prosta ma ten sam współczynnik: $y=-x/3+b$.',r'$-2=-2/3+b$, więc $b=-4/3$. Przecięcie osi $Oy$ ma współrzędne $(0,-4/3)$.'],'Równoległość zachowuje współczynnik kierunkowy.','Wyraz wolny wyznacz z punktu należącego do nowej prostej.'),
task(27,'Objętość ostrosłupa',r'Ostrosłup prawidłowy czworokątny: przekątna podstawy $8\sqrt3$, kąt krawędzi bocznej z podstawą $30^\circ$. Oblicz objętość.',r'$V=128$',[
 r'Rzut krawędzi bocznej na podstawę to połowa przekątnej: $OA=4\sqrt3$.',r'$\tan30^\circ=H/(4\sqrt3)$, więc $H=4$.',r'Pole kwadratu o przekątnej $d$ wynosi $d^2/2=96$. Stąd $V=\frac13\cdot96\cdot4=128$.'],'Rozpatrz przekrój przez wysokość i przekątną podstawy.','Nie utożsamiaj wysokości bryły z krawędzią boczną.','pyramid'),
task(28,'Stosunek objętości',r'Walec i stożek mają wspólną wysokość. Promień stożka jest dwukrotnością promienia walca. Oblicz stosunek objętości.',r'D: $4/3$',[
 r'Oznacz promień walca przez $r$, wtedy promień stożka to $2r$.',r'$V_s/V_w=\frac{\frac13\pi(2r)^2h}{\pi r^2h}=4/3$.'],'Promień występuje we wzorze w kwadracie.','Dwukrotnie większy promień daje czterokrotnie większe pole podstawy.'),
task(29,'Reguła mnożenia',r'Policz trzycyfrowe nieparzyste liczby używające wyłącznie cyfr od 0 do 6. Cyfry mogą się powtarzać.',r'A: $6\cdot7\cdot3=126$',[
 r'Cyfra setek: $1,2,3,4,5,6$ — sześć możliwości.',r'Cyfra dziesiątek: dowolna z siedmiu cyfr.',r'Cyfra jedności: $1,3,5$ — trzy możliwości. Razem $6\cdot7\cdot3=126$.'],'Nieparzystość zależy wyłącznie od ostatniej cyfry.','Zero na początku nie tworzy liczby trzycyfrowej.'),
task(30,'Prawdopodobieństwo w tabeli',r'Dziesiątki losowane z $\{1,3,5,7,9\}$, jedności z $\{0,2,4,6,8\}$. Oblicz prawdopodobieństwo podzielności liczby przez 6.',r'$9/25$',[
 r'Wszystkie $5\cdot5=25$ par są jednakowo prawdopodobne.',r'Każda liczba jest parzysta. Pozostaje sprawdzić podzielność przez 3, czyli sumę cyfr.',r'Sprzyjające liczby: $12,18,30,36,54,72,78,90,96$ — dziewięć. Zatem $P=9/25$.'],'Tabela wszystkich par zapobiega pomijaniu liczb.','Mianownik to wszystkie możliwe wyniki losowania, nie wszystkie liczby dwucyfrowe.','probabilityTable'),
task(31,'Średnia i mediana',r'Z diagramów w arkuszu porównaj średnie i mediany dwóch klas.',r'PP',[
 r'Liczności ocen 1–6: klasa A — $(1,6,3,3,6,1)$; klasa B — $(1,3,6,6,3,1)$. Każda klasa liczy 20 uczniów.',r'Oba rozkłady są symetryczne względem $3{,}5$, a suma ocen w obu wynosi $70$. Średnia: $70/20=3{,}5$.',r'W obu klasach 10. uporządkowana ocena to 3, a 11. to 4. Mediana: $(3+4)/2=3{,}5$.'],'Przy parzystej liczbie obserwacji mediana jest średnią dwóch środkowych wartości.','Nie licz zwykłej średniej z etykiet słupków bez ich liczności.','statistics'),
task(32,'Łączenie średnich',r'Trzy liczby mają średnią 2, a cztery kolejne średnią 5,5. Oblicz średnią wszystkich siedmiu.',r'C: $4$',[
 r'Suma pierwszych trzech liczb wynosi $3\cdot2=6$.',r'Suma pozostałych czterech wynosi $4\cdot5{,}5=22$.',r'Łączna średnia: $(6+22)/7=4$.'],'Najpierw zamień średnie na sumy.','Średnia dwóch średnich działa tylko przy grupach tej samej liczności.'),
task('33.1','Chwila powrotu na ziemię',r'$h(t)=-4{,}9t^2+14{,}7t$. Wyznacz dodatnią chwilę pierwszego powrotu do wysokości zero.',r'D: $3\text{ s}$',[
 r'$h(t)=4{,}9t(3-t)$. Miejsca zerowe to $t=0$ i $t=3$.',r'$t=0$ jest chwilą wyrzutu. Powrót na ziemię następuje przy $t=3$ s.'],'Szukasz drugiego miejsca zerowego, po wyrzucie.','Wierzchołek paraboli oznacza maksymalną wysokość, a nie powrót na ziemię.','ball'),
task('33.2','Chwila największej wysokości',r'$h(t)=-4{,}9t^2+14{,}7t$ dla $t\in[0,3]$. Znajdź chwilę osiągnięcia maksymalnej wysokości.',r'A: $1{,}5\text{ s}$',[
 r'Parabola jest skierowana ramionami w dół, bo współczynnik $-4{,}9$ jest ujemny.',r'Wierzchołek leży w połowie między zerami 0 i 3: $t=1{,}5$ s. Również $-b/(2a)=-14{,}7/(-9{,}8)=1{,}5$.'],'Wykorzystaj symetrię paraboli.','Pamiętaj o dziedzinie czasu: od 0 do 3 sekund.','ball'),
]

P_SCORING={
 '7':'2 pkt: pełny dowód podzielności przez 7 i 2 (lub pełne rozpatrzenie obu parzystości). 1 pkt: uzasadnienie tylko jednej z tych podzielności lub jednego z przypadków parzystości. Sprawdzenie przykładów nie daje punktów.',
 '10':'2 pkt: poprawna metoda i pełny zbiór rozwiązań z właściwymi końcami. 1 pkt: oba poprawne pierwiastki trójmianu.',
 '11':'2 pkt: poprawny model i wynik 78 biletów ulgowych. 1 pkt: poprawne równanie lub układ pozwalający wyznaczyć liczbę biletów.',
 '12.1':'2 pkt: dwa poprawne uzupełnienia. 1 pkt: jedno poprawne uzupełnienie.',
 '12.2':'2 pkt: oba poprawne przedziały. 1 pkt: jeden poprawny przedział. Końce muszą być jednoznacznie otwarte lub domknięte.',
 '14':'4 pkt: poprawna metoda i postać ogólna funkcji. 3 pkt: spełnienie kryterium za 2 pkt oraz wyznaczenie przynajmniej jednego współczynnika postaci ogólnej. 2 pkt: postać kanoniczna z miejscem zerowym 1 lub równoważny etap opisany w kluczu. 1 pkt: postać kanoniczna albo poprawne miejsce zerowe 1 (klucz podaje również inne drogi).',
 '15':'3 pkt: poprawna metoda i k=41. 2 pkt: trzy wartości 8,32,128 lub równanie wyznaczające k. 1 pkt: wartości a₁=8 i a₉=32 lub poprawna zależność geometryczna.',
 '21':'2 pkt: pełne rozumowanie dowodzące stosunku pól. 1 pkt: poprawny zapis obu pól przez wspólny odcinek i sinus połowy kąta albo inny etap wskazany przez CKE.',
 '27':'2 pkt: poprawna metoda i objętość 128. 1 pkt: wysokość H=4 albo poprawnie wyznaczone pole podstawy 96.',
 '30':'2 pkt: poprawna metoda i prawdopodobieństwo 9/25. 1 pkt: pełne poprawne określenie wszystkich wyników lub wyników sprzyjających (klucz dopuszcza również wskazane etapy drzewa).'
}
R_SCORING={
 '1':'2 pkt: poprawne przekształcenie i granica 1/3. 1 pkt: poprawne rozwinięcie symbolu Newtona.',
 '2':'3 pkt: poprawna metoda i 1/28. 2 pkt: poprawne liczby wszystkich permutacji i permutacji sprzyjających. 1 pkt: liczba wszystkich permutacji albo konieczne pozycje 3 i 6 dla wielokrotności 3, albo liczba wyników sprzyjających.',
 '3':'3 pkt: pełny dowód z uzasadnieniem nieujemności. 2 pkt: doprowadzenie do odpowiedniego kwadratu lub iloczynu bez pełnego uzasadnienia. 1 pkt: poprawna nierówność wielomianowa równoważna wyjściowej (lub inne wskazane w kluczu przekształcenie).',
 '4':'3 pkt: pełny dowód. Przy metodzie współrzędnych 2 pkt: poprawny punkt Q; 1 pkt: poprawny punkt P. Przy metodach geometrycznych kryteria obejmują uzasadnienie odpowiedniej prostopadłości lub równoległości oraz wskazane w kluczu długości. Pełne warianty w kluczu.',
 '5':'4 pkt: poprawna metoda i kompletny zbiór rozwiązań. W metodzie z wyłączeniem wspólnego modułu 3 pkt: rozwiązanie |x+3|>2. Niższe etapy i metoda przedziałowa są szczegółowo opisane w kluczu. Konieczne jest wyłączenie x=3.',
 '6':'4 pkt: poprawna metoda i suma −1 026 168. 3 pkt: liczba wyrazów n=1014. 2 pkt: wyznaczenie dopuszczalnej różnicy r=−2 lub rozwiązanie równania r(r+2)=0 (klucz dopuszcza też metodę z ilorazem). 1 pkt: właściwa zależność między trzema wyrazami.',
 '7':'4 pkt: poprawne przekształcenia i wszystkie serie rozwiązań. 3 pkt: poprawna alternatywa równań i rozwiązanie jednego z nich. 2 pkt: poprawna alternatywa równań. 1 pkt: poprawne zastosowanie odpowiedniej tożsamości trygonometrycznej.',
 '8':'4 pkt: bok 3√6 i cosinus 5/14 z poprawnym rozumowaniem. 3 pkt: poprawna długość AT=√42 (lub równoważny etap podany w kluczu). 2 pkt: poprawny kwadrat krawędzi bocznej 243/4 (lub inne wskazane zależności). 1 pkt: bok podstawy lub właściwie zastosowane twierdzenie cosinusów.',
 '9':'5 pkt: poprawna metoda i równanie okręgu. 4 pkt: poprawne C i M albo poprawne C i długość MC. 3 pkt: poprawnie wyznaczone C. 2 pkt: równanie z jedną niewiadomą dla współrzędnej C albo symetralna z zależnością na M. 1 pkt: symetralna AB, zapis C na podanej prostej albo poprawna zależność współrzędnych M.',
 '10':'5 pkt: poprawna metoda i m>1. W metodzie położenia paraboli 1 pkt: wszystkie pięć warunków lub rozwiązanie jednego z nich; 2,3,4 pkt: rozwiązanie odpowiednio trzech, czterech, pięciu warunków. Konieczne są wszystkie warunki i ich część wspólna. Klucz zawiera także metodę z jawnymi pierwiastkami.',
 '11':'6 pkt: boki 5 i 6 oraz pole 30√3 z poprawną metodą. 5 pkt: oba boki. 4 pkt: poprawne równanie pozwalające obliczyć boki. 1–3 pkt: realizacja wskazanych w CKE etapów — zależności boków, obliczenia BD i wyznaczenia kąta 120° — z dodatkowymi warunkami dla 3 pkt.',
 '12.1':'3 pkt: pełne wyprowadzenie wzoru. 2 pkt: związki prowadzące do wyznaczenia wysokości w zależności od x albo równoważne etapy z klucza. 1 pkt: poprawny związek między wysokością, podstawą i ramieniem (lub inna wskazana zależność).',
 '12.2':'4 pkt: uzasadnione minimum i poprawne pole. 3 pkt: uzasadnione minimum przy x=4√3. 2 pkt: poprawne zero pochodnej w dziedzinie. 1 pkt: poprawna pochodna. Bez uzasadnienia minimum można uzyskać najwyżej 2 pkt.'
}

R=[
task(1,'Granica z symbolem Newtona',r'Oblicz granicę ilorazu $\binom{n+2}{n-1}$ i $\frac12n^3-4n+7$.',r'$1/3$',[
 r'Z symetrii symbolu Newtona $\binom{n+2}{n-1}=\binom{n+2}{3}=n(n+1)(n+2)/6$.',r'Podziel licznik i mianownik przez $n^3$: $\frac{(1+1/n)(1+2/n)/6}{1/2-4/n^2+7/n^3}$.',r'W granicy składniki z odwrotnościami n znikają. Wynik to $(1/6)/(1/2)=1/3$.'],'Zamień symbol Newtona na wielomian.','Mianownik ma współczynnik 1/2 przy n³ — nie pomijaj go.'),
task(2,'Permutacje i podzielność',r'Permutacja liczb 1–8 ma mieć iloczyn każdych trzech kolejnych wyrazów podzielny przez 3. Oblicz prawdopodobieństwo.',r'$1/28$',[
 r'Liczby podzielne przez 3 to tylko 3 i 6. Wszystkich permutacji jest $8!$.',r'Pierwsza trójka pozycji i ostatnia trójka pozycji są rozłączne: każda musi zawierać jedną z liczb 3,6. Pozycje 4 i 5 nie mogą więc zawierać żadnej z nich.',r'Aby trójki pozycji $(3,4,5)$ i $(4,5,6)$ też spełniały warunek, liczby 3 i 6 muszą zajmować dokładnie pozycje 3 i 6. Takie ustawienie spełnia warunek dla każdej trójki.',r'Dwie kolejności liczb 3,6 i $6!$ ustawień pozostałych dają $2\cdot6!$. Prawdopodobieństwo: $2\cdot6!/8!=1/28$.'],'Porównaj najpierw pierwszą i ostatnią trójkę pozycji.','Samo wskazanie dogodnego ustawienia nie wystarczy; trzeba wykazać, że inne ustawienia nie działają.','permutations'),
task(3,'Dowód nierówności',r'Dla $x,y>0$ uzasadnij $1/x+1/y\le x/y^2+y/x^2$.',r'Nierówność prawdziwa; równość dla $x=y$.',[
 r'Ponieważ $x^2y^2>0$, można pomnożyć nierówność przez tę liczbę bez zmiany znaku: $xy^2+x^2y\le x^3+y^3$.',r'Różnica stron: $x^3+y^3-xy^2-x^2y=(x+y)(x-y)^2$.',r'$x+y>0$, a $(x-y)^2\ge0$, więc różnica jest nieujemna. To dowodzi nierówności dla wszystkich dopuszczalnych x i y.'],'Szukaj iloczynu z kwadratem różnicy.','Przed mnożeniem nierówności określ znak mnożnika.'),
task(4,'Dowód geometryczny na siatce',r'Kwadrat $ABCD$ ma bok $a$. $K$ i $L$ są środkami $AB$ i $BC$. Punkt $M$ leży na $BC$, a $KM\perp DK$. Odcinek $AL$ przecina $DK$ w $P$ i $DM$ w $Q$. Uzasadnij $PQ=a\sqrt5/5$.',r'$PQ=a\sqrt5/5$',[
 r'Przyjmij $A=(0,0)$, $B=(a,0)$, $C=(a,a)$, $D=(0,a)$, $K=(a/2,0)$ i $L=(a,a/2)$, gdzie $a>0$.',r'Prosta $DK$ ma równanie $y=a-2x$. Prostopadła $KM$ ma nachylenie $1/2$, więc $y=(x-a/2)/2$ i $M=(a,a/4)$.',r'$AL$: $y=x/2$. Punkt przecięcia z $DK$ to $P=(2a/5,a/5)$. Prosta $DM$ ma wzór $y=a-3x/4$, więc $Q=(4a/5,2a/5)$.',r'$PQ=\sqrt{(2a/5)^2+(a/5)^2}=a\sqrt5/5$.'],'Układ współrzędnych zamienia konstrukcję na równania prostych.','Prostopadłość KM i DK trzeba wykorzystać przy wyznaczaniu M.','square'),
task(5,'Wartość bezwzględna',r'Rozwiąż $|2x-6|-|x^2-9|<0$.',r'$(-\infty,-5)\cup(-1,3)\cup(3,+\infty)$',[
 r'Wyłącz wspólny moduł: $2|x-3|-|x-3||x+3|=|x-3|(2-|x+3|)$.',r'Dla $x=3$ lewa strona jest zerem, więc nie spełnia ostrej nierówności. Dla $x\ne3$ czynnik $|x-3|$ jest dodatni.',r'Pozostaje $|x+3|>2$, czyli $x<-5$ lub $x>-1$. Z drugiego przedziału usuń $x=3$.'],'Skorzystaj z |ab|=|a||b|.','Dzielenie przez |x−3| wymaga osobnego sprawdzenia x=3.','absolute'),
task(6,'Dwa rodzaje ciągów',r'Ciąg arytmetyczny zaczyna się od 1 i kończy na −2025. Wyrazy drugi, trzeci i szósty tworzą ciąg geometryczny. Oblicz sumę.',r'$S=-1\,026\,168$',[
 r'Niech $r$ oznacza różnicę. Wyrazy to $1+r$, $1+2r$, $1+5r$. Geometryczność daje $(1+2r)^2=(1+r)(1+5r)$.',r'Po rozwinięciu: $r(r+2)=0$. Wartość $r=0$ oznacza ciąg stały i nie pozwala osiągnąć −2025. Zatem $r=-2$.',r'$-2025=1+(n-1)(-2)$, więc $n=1014>6$.',r'$S_n=\frac{1+(-2025)}2\cdot1014=-1012\cdot1014=-1\,026\,168$.'],'Wykorzystaj kwadrat środkowego wyrazu geometrycznego.','Kandydat r=0 wymaga odrzucenia na podstawie ostatniego wyrazu.'),
task(7,'Równanie trygonometryczne',r'Rozwiąż $\sin(6x)-2\sin(2x)=0$ w liczbach rzeczywistych.',r'$x=\frac{k\pi}{2}$ lub $x=\pm\frac\pi{12}+\frac{k\pi}{2}$, $k\in\mathbb Z$',[
 r'Zapisz równanie jako $\sin(6x)-\sin(2x)-\sin(2x)=0$. Wzór na różnicę sinusów daje $\sin(2x)(2\cos(4x)-1)=0$.',r'Pierwszy przypadek: $\sin(2x)=0$, więc $x=k\pi/2$.',r'Drugi przypadek: $\cos(4x)=1/2$, więc $4x=\pm\pi/3+2k\pi$, czyli $x=\pm\pi/12+k\pi/2$.',r'Połącz wszystkie serie, z $k\in\mathbb Z$.'],'Zamień różnicę dwóch sinusów na iloczyn.','Nie dziel przez sin(2x), bo utracisz całą serię rozwiązań.'),
task(8,'Kąt między ścianami ostrosłupa',r'W ostrosłupie prawidłowym trójkątnym obwód okręgu opisanego na podstawie wynosi $6\sqrt2\pi$, a $\cos\angle BSC=5/9$. Wyznacz bok podstawy i cosinus kąta między ścianami SAC i SBC.',r'$a=3\sqrt6$, $\cos\beta=5/14$',[
 r'$2\pi R=6\sqrt2\pi$ daje $R=3\sqrt2$. Dla podstawy równobocznej $a=R\sqrt3=3\sqrt6$.',r'Niech $b$ będzie krawędzią boczną. W ścianie $SBC$ twierdzenie cosinusów daje $a^2=2b^2(1-5/9)$, stąd $b^2=243/4$.',r'Opuść z A i B prostopadłe na wspólną krawędź SC. Ich spodki pokrywają się w punkcie T, ponieważ ściany SAC i SBC są przystające. $ST=b\cdot5/9=5\sqrt3/2$.',r'$AT^2=BT^2=b^2-ST^2=42$. Kąt $ATB$ jest kątem liniowym kąta dwuściennego: oba ramiona są prostopadłe do SC.',r'W trójkącie ATB: $\cos\beta=(42+42-54)/(2\cdot42)=5/14$. Jest to cosinus ostrego kąta między płaszczyznami.'],'Kąt dwuścienny wyznaczają odcinki prostopadłe do wspólnej krawędzi.','Nie zastępuj kąta między ścianami kątem między krawędziami.','dihedral'),
task(9,'Okrąg z podziałem odcinka',r'$A=(1,-1)$, $B=(4,0)$, $CA=CB$, ramię leży na $x+2y-4=0$. Punkt $M\in AC$ spełnia $AM:MC=1:4$. Wyznacz okrąg o środku M przechodzący przez C.',r'$(x-6/5)^2+(y+3/5)^2=16/5$',[
 r'$A$ nie leży na podanej prostej, a $B$ leży. Podana prosta zawiera zatem ramię BC, więc $x_C+2y_C=4$.',r'Warunek równych odległości od A i B daje $(x_C-1)^2+(y_C+1)^2=(x_C-4)^2+y_C^2$, czyli $3x_C+y_C=7$.',r'Rozwiązanie układu: $C=(2,1)$. Punkt M leży w jednej piątej drogi od A do C: $M=A+(C-A)/5=(6/5,-3/5)$.',r'$MC^2=(2-6/5)^2+(1+3/5)^2=16/5$. Zapisz równanie okręgu ze środkiem M i tą prawą stroną.'],'Punkt równo odległy od A i B leży na symetralnej AB.','Podział 1:4 oznacza jedną piątą całego odcinka, nie jedną czwartą.','analyticCircle'),
task(10,'Parametr i dwa miejsca zerowe',r'Dla $m\ne0$ wyznacz parametry, dla których $m^2x^2-2mx-m+1$ ma dwa różne zera w $(-2,2)$.',r'$m\in(1,+\infty)$',[
 r'Ramiona są w górę, bo $m^2>0$. Wyróżnik $\Delta=4m^3$ ma być dodatni, więc $m>0$.',r'Wierzchołek ma pierwszą współrzędną $p=1/m$. Warunek $-2<p<2$ przy $m>0$ daje $m>1/2$.',r'Aby oba zera były wewnątrz, wymagamy też $f(-2)>0$ i $f(2)>0$. $f(-2)=4m^2+3m+1>0$ dla każdego m (wyróżnik −7).',r'$f(2)=4m^2-5m+1=(4m-1)(m-1)>0$, więc $m<1/4$ lub $m>1$.',r'Część wspólna warunków to $m>1$. Dodatni trójmian na końcach, ujemny w wierzchołku i wierzchołek w przedziale zapewniają dwa różne zera wewnątrz.'],'Sprawdź wyróżnik, położenie wierzchołka oraz wartości na obu krańcach.','Samo Δ>0 nie określa położenia miejsc zerowych.','parameter'),
task(11,'Czworokąt i dwa okręgi',r'Czworokąt ABCD ma okrąg wpisany i opisany; $AB=9$, $AD=10$, $\angle BAD=60^\circ$. Oblicz BC, CD i pole.',r'$BC=5$, $CD=6$, $P=30\sqrt3$',[
 r'Okrąg wpisany daje równość sum przeciwległych boków: $9+CD=10+BC$. Oznacz $BC=u>0$, wtedy $CD=u+1$.',r'Twierdzenie cosinusów w ABD: $BD^2=9^2+10^2-2\cdot9\cdot10\cos60^\circ=91$.',r'Okrąg opisany oznacza sumę przeciwległych kątów równą $180^\circ$, zatem $\angle BCD=120^\circ$.',r'W BCD: $91=u^2+(u+1)^2-2u(u+1)\cos120^\circ=3u^2+3u+1$. Stąd $(u-5)(u+6)=0$, a dodatni kandydat to $u=5$.',r'Pole jest sumą pól ABD i BCD: $\frac12\cdot9\cdot10\sin60^\circ+\frac12\cdot5\cdot6\sin120^\circ=30\sqrt3$.'],'Każdy z dwóch okręgów daje inną własność czworokąta.','Nie zamieniaj równości sum przeciwległych boków na równość ich iloczynów.','bicentric'),
task('12.1','Pole kwietnika — wyprowadzenie',r'Kwietnik jest trójkątem równoramiennym o podstawie x z okręgiem wpisanym o promieniu 2. Uzasadnij $P(x)=2x^3/(x^2-16)$.',r'$P(x)=\frac{2x^3}{x^2-16}$',[
 r'Oznacz wysokość przez h, ramię przez b. Połowa obwodu to $b+x/2$, zatem $P=2(b+x/2)=2b+x$. Jednocześnie $P=xh/2$.',r'Z równości pól: $b=x(h-2)/4$. Z Pitagorasa: $b^2=h^2+x^2/4$.',r'Podstaw b i pomnóż przez 16: $x^2(h-2)^2=16h^2+4x^2$. Po uproszczeniu $h[(x^2-16)h-4x^2]=0$.',r'Ponieważ $h>0$, otrzymujemy $h=4x^2/(x^2-16)$. Dodatnia wysokość wymaga $x>4$.',r'$P=xh/2=2x^3/(x^2-16)$. Z projektu dodatkowo $x\le10$, więc dziedzina to $(4,10]$.'],'Połącz wzór P=rs ze wzorem na pole z podstawy i wysokości.','Średnica fontanny wynosi 4, więc promień wynosi 2.','garden'),
task('12.2','Najmniejsze pole kwietnika',r'Zminimalizuj $P(x)=2x^3/(x^2-16)$ na $(4,10]$. Podaj podstawę i pole.',r'$x=4\sqrt3\text{ m}$, $P_{\min}=12\sqrt3\text{ m}^2$',[
 r'Pochodna ilorazu: $P\prime(x)=\frac{6x^2(x^2-16)-4x^4}{(x^2-16)^2}=\frac{2x^2(x^2-48)}{(x^2-16)^2}$.',r'W dziedzinie jedyne zero pochodnej to $x=4\sqrt3$. Pozostałe kandydaty 0 i −4√3 nie należą do dziedziny.',r'Na $(4,4\sqrt3)$ pochodna jest ujemna, a na $(4\sqrt3,10]$ dodatnia. Funkcja najpierw maleje, potem rośnie, więc w punkcie zmiany osiąga minimum globalne w tej dziedzinie.',r'$P(4\sqrt3)=2(4\sqrt3)^3/(48-16)=12\sqrt3$. Podstawa ma $4\sqrt3$ m.'],'Znak pochodnej jest znakiem x²−48 w rozpatrywanym przedziale.','Samo obliczenie zera pochodnej nie jest uzasadnieniem minimum.','optimization'),
]

def metadata(folder,tasks,level):
    doc=fitz.open(ROOT/'arkusze'/folder/'arkusz.pdf')
    key=fitz.open(ROOT/'arkusze'/folder/'zasady.pdf')
    def headings(pdf):
        found={}
        for i,p in enumerate(pdf):
            for b in p.get_text('blocks'):
                for match in re.finditer(r'Zadanie\s+(\d+(?:\.\d+)?)\.',b[4]):
                    positions=p.search_for('Zadanie '+match[1]+'.')
                    found.setdefault(match[1],(i+1,positions[0].y0 if positions else b[1]))
        return found
    ph,kh=headings(doc),headings(key)
    image_dir=ROOT/'arkusze'/folder/'zadania';image_dir.mkdir(exist_ok=True)
    images={}
    # Clip individual task statements and shared introductions, preserving original diagrams.
    for old in image_dir.glob('strona-*.png'):old.unlink()
    for n,(page,y) in ph.items():
        p=doc[page-1]
        start=y-4
        end=min([v[1]-10 for v in ph.values() if v[0]==page and v[1]>y+5]+[p.rect.height-55])
        words=[w for w in p.get_text('words') if w[0]>=65 and w[2]<=p.rect.width-65 and w[1]>=start and w[3]<end]
        brud=[w[1]-8 for w in words if w[4]=='Brudnopis']
        if brud:end=min(end,min(brud))
        words=[w for w in words if w[3]<end]
        if not words:raise ValueError(f'Empty excerpt: {folder} task {n}, page {page}, y={y}, end={end}')
        last=max(w[3] for w in words)
        clip=fitz.Rect(65,max(45,start),p.rect.width-65,min(end,last+8))
        pix=p.get_pixmap(matrix=fitz.Matrix(2,2),clip=clip)
        file=image_dir/f'zadanie-{n}.png';pix.save(file)
        images[n]=dict(path=str(file.relative_to(ROOT)).replace('\\','/'),width=pix.width,height=pix.height)
    for t in tasks:
        n=t['number'];t['page']=ph[n][0];t['keyPage']=kh[n][0]
        # Prefix shared statement pages for second subquestions.
        parent=n.split('.')[0]
        common=parent if parent in ph else n
        t['originals']=[images[i] for i in dict.fromkeys([common,n])]
        text=doc[t['page']-1].get_text()
        t['points']=int(re.search(r'Zadanie\s+'+re.escape(n)+r'\.\s*\(0[–-](\d+)\)',text)[1])
        # Independent transcription of version A identifiers from the official key.
        t['scoring']=(P_SCORING if level=='podstawowy' else R_SCORING).get(n,'Pełna poprawna odpowiedź — 1 pkt; brak poprawnej pełnej odpowiedzi — 0 pkt.')
    result=dict(id=folder,year=2026,session='Maj 2026',level=level,formula='2023',version='A',duration=180,maxPoints=50,verified='2026-10-09',pdf=f'arkusze/{folder}/arkusz.pdf',key=f'arkusze/{folder}/zasady.pdf',tasks=tasks)
    assert sum(t['points'] for t in tasks)==50
    (ROOT/'arkusze'/folder/'solutions.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
    print(folder,len(tasks),'tasks,',sum(t['points'] for t in tasks),'points')

if __name__=='__main__':
    metadata('2026',P,'podstawowy')
    metadata('2026_rozszerzony',R,'rozszerzony')
