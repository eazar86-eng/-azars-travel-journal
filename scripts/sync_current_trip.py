from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / '_data' / 'current_trip.yml'

HOME_HERO_TITLE = 'אנחנו אוספים רגעים, לא רק יעדים.'
HOME_HERO_INTRO = 'מסעות משפחתיים, כבישים ארוכים, מלונות שאהבנו, מקומות שהפתיעו אותנו וגם כאלה שפחות. כאן אנחנו שומרים את הטיולים בדיוק כמו שהם היו.'
SUMMER_INTRO = 'המסע הגדול של קיץ 2026 הוא יומן חי. הוא מתחיל בחוף המזרחי, ממשיך לצפון מערב ולרוקיז, יורד אל האיים של הוואי ומסתיים בלוס אנג׳לס. את הפרקים אנחנו מוסיפים תוך כדי הדרך, כשהפרטים, התחושות והרגעים עדיין טריים.'


def parse_simple_yaml(text):
    out = {}
    for line in text.splitlines():
        if not line or line.startswith(' ') or line.lstrip().startswith('-') or ':' not in line:
            continue
        k, v = line.split(':', 1)
        out[k.strip()] = v.strip().strip('"')
    return out


def parse_hawaii_days(text):
    days = []
    in_days = False
    for line in text.splitlines():
        if line.strip() == 'hawaii_days:':
            in_days = True
            continue
        if in_days:
            if line and not line.startswith(' '):
                break
            m = re.search(r'id:\s*"([^"]+)".*label:\s*"([^"]+)"', line)
            if m:
                days.append((m.group(1), m.group(2)))
    return days


def replace_once(text, pattern, repl, label):
    new, n = re.subn(pattern, repl, text, count=1, flags=re.S)
    if n != 1:
        raise RuntimeError(f'Could not update {label}: found {n} matches')
    return new


yaml_text = DATA.read_text(encoding='utf-8')
data = parse_simple_yaml(yaml_text)
hawaii_days = parse_hawaii_days(yaml_text)
current_island = data['current_island']
current_day = data['current_day']
current_anchor = data['current_day_anchor']
current_title = data['current_day_title']
current_summary = data['current_summary']
current_page = data['current_page']
version = data.get('version', 'daily')
include_name = current_anchor + '.md'
label = f'{current_day} · {current_title}'

# Home page: keep the approved editorial introduction fixed.
p = ROOT / 'index.html'
s = p.read_text(encoding='utf-8')
s = replace_once(
    s,
    r'(<div class="eyebrow">AZAR’S TRAVEL · FAMILY JOURNAL</div>)<h1>.*?</h1><p>.*?</p>',
    lambda m: m.group(1) + f'<h1>{HOME_HERO_TITLE}</h1><p>{HOME_HERO_INTRO}</p>',
    'approved home introduction'
)
s = replace_once(s, r'<div class="head"><h2>עכשיו בדרך</h2><p>.*?</p></div>', f'<div class="head"><h2>עכשיו בדרך</h2><p>{current_summary} התחנה הנוכחית שלנו היא <strong>{current_island}</strong>.</p></div>', 'home current summary')
s = replace_once(s, r'<div class="tag">[^<]*CURRENT STOP</div>', f'<div class="tag">{current_island.upper()} · HAWAIʻI · CURRENT STOP</div>', 'home current tag')
s = replace_once(s, r'<h3>פרק חדש: .*?</h3>', f'<h3>פרק חדש: {current_island}</h3>', 'home current title')
s = replace_once(s, r'<a class="btn" href="[^"]+">[^<]+</a>', f'<a class="btn" href="{current_page}">ליום {current_day} ביומן</a>', 'home current link')
s = replace_once(s, r'(<div class="featureCopy">.*?<h3>.*?</h3>)<p>.*?</p>(<a class="btn")', lambda m: m.group(1) + f'<p>{current_summary}</p>' + m.group(2), 'home feature current summary')
p.write_text(s, encoding='utf-8')

# Hawaii page: current summary plus complete day rail.
p = ROOT / 'trips' / 'hawaii-2026' / 'index.html'
s = p.read_text(encoding='utf-8')
s = s.replace('\x01', '</div></nav><main class="story">')
s = replace_once(s, r'<span class="currentBadge">.*?</span>', f'<span class="currentBadge">עכשיו במסע: {current_island}</span>', 'hawaii current badge')
s = replace_once(s, r'(<div class="eyebrow">HAWAIʻI.*?</div><h1>.*?</h1>)<p>.*?</p>(<span class="currentBadge">)', lambda m: m.group(1) + f'<p>{current_summary}</p>' + m.group(2), 'hawaii current introduction')
day_links = ''.join(f'<a href="#{day_id}">{day_label}</a>' for day_id, day_label in hawaii_days)
s = replace_once(s, r'(<nav class="days" aria-label="ימי הוואי"><div class="daysIn">).*?(</div></nav>)', lambda m: m.group(1) + day_links + m.group(2), 'hawaii day tabs')
if f'id="{current_anchor}"' not in s:
    day_section = f'<section id="{current_anchor}" class="day"><div class="mauiFlag">MAUI · התחנה הנוכחית</div>{{% capture current_day_content %}}{{% include {include_name} %}}{{% endcapture %}}{{{{ current_day_content | markdownify }}}}</section>'
    s = replace_once(s, r'</main>', day_section + '</main>', 'hawaii current day section')
s = re.sub(r'<div class="mauiFlag">MAUI · התחנה הנוכחית</div>', '', s)
s = s.replace(f'<section id="{current_anchor}" class="day">', f'<section id="{current_anchor}" class="day"><div class="mauiFlag">MAUI · התחנה הנוכחית</div>', 1)
s = re.sub(r'<a class="current" href="(#day-\d+)">', r'<a href="\1">', s)
s, n = re.subn(r'<a href="#' + re.escape(current_anchor) + r'">', f'<a class="current" href="#{current_anchor}">', s, count=1)
if n != 1:
    raise RuntimeError(f'Could not mark current Hawaii day {current_anchor}')
p.write_text(s, encoding='utf-8')

# Summer overview: preserve the approved introduction and render each current day in the main pipeline.
p = ROOT / 'trips' / 'summer-2026' / 'index.html'
s = p.read_text(encoding='utf-8')
s = replace_once(
    s,
    r'(<div class="kicker">AZAR FAMILY · SUMMER 2026</div><h1>מסע קיץ 2026</h1>)<p>.*?</p>',
    lambda m: m.group(1) + f'<p>{SUMMER_INTRO}</p>',
    'approved summer introduction'
)

# Complete Hawaii day rail from central data.
summer_day_links = '<a href="#hawaii">04.08</a>' + ''.join(f'<a href="#{day_id}">{day_label}</a>' for day_id, day_label in hawaii_days if day_id != 'day-0408')
s = replace_once(s, r"(function addHawaiiDays\(\)\{.*?nav\.innerHTML=)'[^']*'", lambda m: m.group(1) + repr(summer_day_links), 'summer Hawaii day rail')

# Ensure the current day has a real anchor in the renderer.
anchor_token = f"['{current_day}','{current_anchor}']"
anchors_match = re.search(r'const anchors=\[(.*?)\];const prettyDates=', s, flags=re.S)
if not anchors_match:
    raise RuntimeError('Could not find summer anchors array')
if anchor_token not in anchors_match.group(0):
    updated = anchors_match.group(1) + ',' + anchor_token
    s = s[:anchors_match.start(1)] + updated + s[anchors_match.end(1):]

# Add the current day to the main Promise/render chain so hash navigation is stable.
main_promise = re.search(r"Promise\.all\(\[(.*?)\]\)\.then\(\(\[(.*?)\]\)=>\{(.*?)\}\)\.catch", s, flags=re.S)
if not main_promise:
    raise RuntimeError('Could not find summer main render pipeline')
fetches, vars_text, body = main_promise.groups()
var_name = 'd' + re.sub(r'\D', '', current_day)
current_fetch = f"fetch('/content/{include_name}?v={version}').then(r=>r.text())"
if f'/content/{include_name}' not in fetches:
    fetches = fetches + ',' + current_fetch
    vars_text = vars_text + ',' + var_name
    body = body.replace('addHawaiiDays();', f'render({var_name},root);addHawaiiDays();', 1)
    replacement = f"Promise.all([{fetches}]).then(([{vars_text}])=>{{{body}}}).catch"
    s = s[:main_promise.start()] + replacement + s[main_promise.end():]

# Remove the old late-loading patch. The day is now part of the primary renderer.
s = re.sub(r'<script id="current-day-sync">.*?</script>', '', s, flags=re.S)
p.write_text(s, encoding='utf-8')

print(f'Synced current trip: {current_day} · {current_island} · {current_title}')
