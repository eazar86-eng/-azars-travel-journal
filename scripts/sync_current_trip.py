from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / '_data' / 'current_trip.yml'


def parse_simple_yaml(text):
    out = {}
    for line in text.splitlines():
        if not line or line.startswith(' ') or line.lstrip().startswith('-') or ':' not in line:
            continue
        k, v = line.split(':', 1)
        v = v.strip().strip('"')
        out[k.strip()] = v
    return out


def replace_once(text, pattern, repl, label):
    new, n = re.subn(pattern, repl, text, count=1, flags=re.S)
    if n != 1:
        raise RuntimeError(f'Could not update {label}: found {n} matches')
    return new


data = parse_simple_yaml(DATA.read_text(encoding='utf-8'))
current_island = data['current_island']
current_day = data['current_day']
current_anchor = data['current_day_anchor']
current_title = data['current_day_title']
current_summary = data['current_summary']
current_page = data['current_page']
version = data['version']

# Home page current trip block
p = ROOT / 'index.html'
s = p.read_text(encoding='utf-8')
s = replace_once(
    s,
    r'<div class="head"><h2>עכשיו בדרך</h2><p>.*?</p></div>',
    f'<div class="head"><h2>עכשיו בדרך</h2><p>{current_summary} התחנה הנוכחית שלנו היא <strong>{current_island}</strong>.</p></div>',
    'home current summary'
)
s = replace_once(s, r'<div class="tag">MAUI · HAWAIʻI · CURRENT STOP</div>', f'<div class="tag">{current_island.upper()} · HAWAIʻI · CURRENT STOP</div>', 'home current tag')
s = replace_once(s, r'<h3>פרק חדש: .*?</h3>', f'<h3>פרק חדש: {current_island}</h3>', 'home current title')
s = replace_once(s, r'<a class="btn" href="[^"]+">[^<]+</a>', f'<a class="btn" href="{current_page}">ליום {current_day} ביומן</a>', 'home current link')
p.write_text(s, encoding='utf-8')

# Hawaii page hero/current day navigation. Days themselves remain server rendered.
p = ROOT / 'trips' / 'hawaii-2026' / 'index.html'
s = p.read_text(encoding='utf-8')
s = replace_once(s, r'<span class="currentBadge">.*?</span>', f'<span class="currentBadge">עכשיו במסע: {current_island}</span>', 'hawaii current badge')
s = re.sub(r'<a class="current" href="#day-\d+">', '<a href="#day-', s)
# Fix any accidental malformed replacement above by rebuilding current class on matching anchor.
s = s.replace('<a href="#day-', '<a href="#day-')
s = re.sub(r'(<a)(?! class="current")([^>]+href="#'+re.escape(current_anchor)+r'"[^>]*)>', r'\1 class="current"\2>', s, count=1)
p.write_text(s, encoding='utf-8')

# Summer page top destination navigation must never contain day or island sub-tabs.
p = ROOT / 'trips' / 'summer-2026' / 'index.html'
s = p.read_text(encoding='utf-8')
s = re.sub(r'<a[^>]+href="#(?:maui|day-\d+)"[^>]*>.*?</a>', '', s)
p.write_text(s, encoding='utf-8')

print(f'Synced current trip: {current_day} · {current_island} · {current_title}')
