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
        out[k.strip()] = v.strip().strip('"')
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

# Home page: one source of truth for current stop and current day.
p = ROOT / 'index.html'
s = p.read_text(encoding='utf-8')
s = replace_once(
    s,
    r'<div class="head"><h2>עכשיו בדרך</h2><p>.*?</p></div>',
    f'<div class="head"><h2>עכשיו בדרך</h2><p>{current_summary} התחנה הנוכחית שלנו היא <strong>{current_island}</strong>.</p></div>',
    'home current summary'
)
s = replace_once(s, r'<div class="tag">[^<]*CURRENT STOP</div>', f'<div class="tag">{current_island.upper()} · HAWAIʻI · CURRENT STOP</div>', 'home current tag')
s = replace_once(s, r'<h3>פרק חדש: .*?</h3>', f'<h3>פרק חדש: {current_island}</h3>', 'home current title')
s = replace_once(s, r'<a class="btn" href="[^"]+">[^<]+</a>', f'<a class="btn" href="{current_page}">ליום {current_day} ביומן</a>', 'home current link')
p.write_text(s, encoding='utf-8')

# Hawaii page: mark exactly one day as current and keep destination wording synchronized.
p = ROOT / 'trips' / 'hawaii-2026' / 'index.html'
s = p.read_text(encoding='utf-8')
s = replace_once(s, r'<span class="currentBadge">.*?</span>', f'<span class="currentBadge">עכשיו במסע: {current_island}</span>', 'hawaii current badge')
s = re.sub(r'<a class="current" href="(#day-\d+)">', r'<a href="\1">', s)
s, n = re.subn(r'<a href="#'+re.escape(current_anchor)+r'">', f'<a class="current" href="#{current_anchor}">', s, count=1)
if n != 1:
    raise RuntimeError(f'Could not mark current Hawaii day {current_anchor}')
p.write_text(s, encoding='utf-8')

# Summer overview: destination tabs only. Never add island sub-tabs or dates here.
p = ROOT / 'trips' / 'summer-2026' / 'index.html'
s = p.read_text(encoding='utf-8')
s = re.sub(r'<a[^>]+href="#(?:maui|day-\d+)"[^>]*>.*?</a>', '', s)
p.write_text(s, encoding='utf-8')

print(f'Synced current trip: {current_day} · {current_island} · {current_title}')
