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
        key, value = line.split(':', 1)
        out[key.strip()] = value.strip().strip('"')
    return out


def parse_days(text, section):
    days = []
    active = False
    for line in text.splitlines():
        if line.strip() == f'{section}:':
            active = True
            continue
        if active:
            if line and not line.startswith(' '):
                break
            match = re.search(r'id:\s*"([^"]+)".*label:\s*"([^"]+)"', line)
            if match:
                days.append((match.group(1), match.group(2)))
    return days


def replace_once(text, pattern, repl, label):
    updated, count = re.subn(pattern, repl, text, count=1, flags=re.S)
    if count != 1:
        raise RuntimeError(f'Could not update {label}: found {count} matches')
    return updated


yaml_text = DATA.read_text(encoding='utf-8')
data = parse_simple_yaml(yaml_text)
hawaii_days = parse_days(yaml_text, 'hawaii_days')
current_region = data.get('current_region', '')
current_island = data['current_island']
current_day = data['current_day']
current_day_slash = current_day.replace('.', '/')
current_anchor = data['current_day_anchor']
current_title = data['current_day_title']
current_summary = data['current_summary']
current_page = data['current_page']
version = data.get('version', 'daily')
include_name = current_anchor + '.md'

# Home page
p = ROOT / 'index.html'
s = p.read_text(encoding='utf-8')
s = replace_once(s, r'(<div class="eyebrow">AZAR’S TRAVEL · FAMILY JOURNAL</div>)<h1>.*?</h1><p>.*?</p>', lambda m: m.group(1) + f'<h1>{HOME_HERO_TITLE}</h1><p>{HOME_HERO_INTRO}</p>', 'approved home introduction')
s = replace_once(s, r'<div class="head"><h2>עכשיו בדרך</h2><p>.*?</p></div>', f'<div class="head"><h2>עכשיו בדרך</h2><p>{current_summary} התחנה הנוכחית שלנו היא <strong>{current_island}</strong>.</p></div>', 'home current summary')
s = replace_once(s, r'<div class="tag">[^<]*CURRENT STOP</div>', f'<div class="tag">{current_island.upper()} · CURRENT STOP</div>', 'home current tag')
s = replace_once(s, r'<h3>פרק חדש: .*?</h3>', f'<h3>פרק חדש: {current_island}</h3>', 'home current title')
s = replace_once(s, r'<a class="btn" href="[^"]+">[^<]+</a>', f'<a class="btn" href="{current_page}">ליום {current_day} ביומן</a>', 'home current link')
s = replace_once(s, r'(<div class="featureCopy">.*?<h3>.*?</h3>)<p>.*?</p>(<a class="btn")', lambda m: m.group(1) + f'<p>{current_summary}</p>' + m.group(2), 'home feature current summary')
p.write_text(s, encoding='utf-8')

# Hawaii page is updated only while Hawaii is the current region.
if current_region == 'הוואי':
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
    s, count = re.subn(r'<a href="#' + re.escape(current_anchor) + r'">', f'<a class="current" href="#{current_anchor}">', s, count=1)
    if count != 1:
        raise RuntimeError(f'Could not mark current Hawaii day {current_anchor}')
    p.write_text(s, encoding='utf-8')

# Summer overview
p = ROOT / 'trips' / 'summer-2026' / 'index.html'
s = p.read_text(encoding='utf-8')
s, _ = re.subn(r'(<div class="kicker">AZAR FAMILY · SUMMER 2026</div><h1>מסע קיץ 2026</h1>)<p>.*?</p>', lambda m: m.group(1) + f'<p>{SUMMER_INTRO}</p>', s, count=1, flags=re.S)
summer_day_links = '<a href="#hawaii">04.08</a>' + ''.join(f'<a href="#{day_id}">{day_label}</a>' for day_id, day_label in hawaii_days if day_id != 'day-0408')
s = replace_once(s, r"(function addHawaiiDays\(\)\{.*?nav\.innerHTML=)'[^']*'", lambda m: m.group(1) + repr(summer_day_links), 'summer Hawaii day rail')

wrong_anchor_token = f"['{current_day}','{current_anchor}']"
anchor_token = f"['{current_day_slash}','{current_anchor}']"
if wrong_anchor_token != anchor_token:
    s = s.replace(wrong_anchor_token, anchor_token)
anchors_match = re.search(r'const anchors=\[(.*?)\];const prettyDates=', s, flags=re.S)
if not anchors_match:
    raise RuntimeError('Could not find summer anchors array')
if anchor_token not in anchors_match.group(0):
    updated = anchors_match.group(1) + ',' + anchor_token
    s = s[:anchors_match.start(1)] + updated + s[anchors_match.end(1):]

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
else:
    fetches = re.sub(r"fetch\('/content/" + re.escape(include_name) + r"\?v=[^']*'\)\.then\(r=>r\.text\(\)\)", current_fetch, fetches)
replacement = f"Promise.all([{fetches}]).then(([{vars_text}])=>{{{body}}}).catch"
s = s[:main_promise.start()] + replacement + s[main_promise.end():]
s = re.sub(r'<script id="current-day-sync">.*?</script>', '', s, flags=re.S)
p.write_text(s, encoding='utf-8')

print(f'Synced current trip: {current_day} · {current_island} · {current_title}')