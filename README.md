# Matematyka to Podstawa

Statyczna platforma edukacyjna publikowana przez GitHub Pages z gałęzi `main`.
Nie wymaga serwera aplikacyjnego ani procesu budowania.

- `kurs.html`: 10 modułów, 76 slajdów teorii i 140 pytań wyboru. Dane kursu są
  współdzielone z panelem postępu w `assets/course-data.js`.
- Laboratorium w kursie: 80 wariantów zadań otwartych, dokładne sprawdzanie
  liczb dziesiętnych i ułamków oraz powtórka błędów. Wykres przesuwanej paraboli.
- `zadania.html`: 48 zadań autorskich, zapisanych w `assets/tasks-data.js`,
  z rozwiązaniami, notatkami i zakładkami. Osobno kompendium ma 142 przykłady.
- `korepetycje.html`: uczniowie, spotkania, notatki, zadania domowe, osobne karty
  ucznia i klucze prowadzącego, tablica i stoper. Kopie danych eksportowane do JSON.
- `arkusze.html`: 23 oryginalne PDF-y CKE i zasady oceniania, filtry, stoper, notatki.
- `egzamin.html`: maj 2026, podstawa (37 zadań i podpunktów) oraz rozszerzenie
  (13 zadań i podpunktów), po 50 punktów. Własne objaśnienia, oryginalne wyciągi
  z arkusza, diagramy SVG, brudnopis wektorowy, samoocena, import/eksport.
  Odnośniki prowadzą do właściwych stron oficjalnego klucza CKE.
  Pochodzenie i sumy SHA-256 dokumentów: `arkusze/2026*/source.json`.

## Uruchomienie i testy

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Otwórz `http://127.0.0.1:8765/` w Simple Browser w VS Code.

Testy uruchamiają własną przeglądarkę Chromium w trybie headless, z odizolowanym
profilem. Nie łączą się z otwartą przeglądarką ani aplikacjami użytkownika.

```powershell
pip install -r tests/requirements.txt
python -m playwright install chromium
python tests/test_site.py
python tests/test_site.py https://lebroncoder2025.github.io/MatematykaToPodstawa/
python tests/test_exams.py
python tests/test_exams.py https://lebroncoder2025.github.io/MatematykaToPodstawa/
```

Lokalny serwer testowy odtwarza ścieżkę `/MatematykaToPodstawa/`. Testy sprawdzają
80 zadań, ułamki, postęp, punktację, 2400 losowych pytań quizu, panel korepetycji,
import/eksport, bezpieczeństwo wyświetlania tekstu, widok mobilny i działanie offline.
Zrzuty i pliki testowe trafiają do ignorowanego katalogu `tests/artifacts/`.
Konfiguracja `.github/workflows/validate.yml` uruchamia ten sam zestaw przy zmianach.
Jej publikacja wymaga uprawnienia `workflow` połączenia z GitHubem; jeśli plik
pozostaje lokalny, testy trzeba uruchamiać poleceniem powyżej.

## Treści matematyczne

Zadania autorskie nie są oficjalnymi zadaniami CKE. Zakres matury należy odnosić
do właściwego informatora CKE; materiały obejmują również zagadnienia dodatkowe.

Audyt wykazał błędne rekonstrukcje treści i odpowiedzi w poprzednim widoku
archiwum. Biblioteka wyświetla teraz oryginalne dokumenty CKE. Historyczne
`arkusze/*/tasks.json` i skrypt `assets/load-exam-data.js` pozostają materiałami
roboczymi, nie są ładowane przez stronę i nie powinny być ponownie publikowane
jako sprawdzone rozwiązania bez porównania każdego zadania z oryginalnym PDF.

Porównanie odpowiedzi quizowych wykrywa typowe równoważne wyrażenia numeryczne,
algebraiczne i równania. Nie zastępuje pełnego systemu algebry symbolicznej.
Rozwiązania oraz warunki dziedzinowe trzeba nadal kontrolować podczas dodawania treści.

## Zapis danych

Postęp i dane korepetycji przechowywane są lokalnie w przeglądarce, bez kont
uczniów i automatycznej synchronizacji między urządzeniami. Panel korepetycji
ma eksport i walidowany import kopii. Karty pracy są plikami HTML; opcja PDF
korzysta z drukowania w przeglądarce. Renderowanie wzorów w pobranej karcie
wymaga dostępu do CDN KaTeX, jeśli te zasoby nie są już zapisane.

Service worker przechowuje zasoby aplikacji. Dokumenty PDF pobierane są osobno;
aby korzystać z nich offline, trzeba je wcześniej otworzyć lub pobrać.
