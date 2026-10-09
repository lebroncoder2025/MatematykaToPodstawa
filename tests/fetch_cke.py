"""Download public CKE documents and keep their provenance (maintainer tool)."""
import re, json, html, hashlib
from pathlib import Path
from urllib.request import urlopen, Request
from urllib.parse import urljoin

ROOT=Path(__file__).resolve().parents[1]
HOST='https://egzaminy.gov.pl'
def get(url):
    with urlopen(Request(url,headers={'User-Agent':'Mozilla/5.0'}), timeout=60) as r:
        return r.read()

catalog=get(HOST+'/cke/materialy-egzaminacyjne/egzamin-maturalny?exam_session=2026-maj&formula=F2023&per_page=100&subject=Matematyka').decode('utf-8')
(ROOT/'tests/artifacts').mkdir(exist_ok=True)
for code,folder in [('MMAP-P0-100-A-2605','2026'),('MMAP-R0-100-A-2605','2026_rozszerzony')]:
    fragment=next(html.unescape(u) for u in re.findall(r'data-document-group-url="([^"]+)"',catalog) if code in u)
    body=get(urljoin(HOST,fragment)).decode()
    (ROOT/f'tests/artifacts/{folder}-links.html').write_text(body,encoding='utf-8')
    print(code)
    records=[]
    for href,label in re.findall(r'<a\b[^>]*href="([^"]+)"[^>]*>(.*?)</a>',body,re.S):
        label=re.sub('<[^>]+>',' ',label)
        print(html.unescape(href), ' '.join(html.unescape(label).split()))
        kind='zasady' if 'Zasady' in label else 'arkusz' if 'Arkusz' in label else 'karta'
        url=html.unescape(href);data=get(url)
        assert data.startswith(b'%PDF'),url
        target=ROOT/'arkusze'/folder;target.mkdir(exist_ok=True)
        (target/f'{kind}.pdf').write_bytes(data)
        records.append({'kind':kind,'url':url,'sha256':hashlib.sha256(data).hexdigest()})
        import fitz
        doc=fitz.open(stream=data,filetype='pdf')
        (ROOT/f'tests/artifacts/{folder}-{kind}.txt').write_text('\n'.join(f'\n--- PAGE {i+1} ---\n'+p.get_text(sort=True) for i,p in enumerate(doc)),encoding='utf-8')
    (target/'source.json').write_text(json.dumps({'code':code,'source':HOST+'/cke/materialy-egzaminacyjne/egzamin-maturalny?exam_session=2026-maj&formula=F2023&subject=Matematyka','verified':'2026-10-09','documents':records},ensure_ascii=False,indent=2),encoding='utf-8')
