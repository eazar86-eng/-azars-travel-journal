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


def day_include_name(anchor):
    return anchor + '.md'


def day_label(day, title):
    return f'{day} · {title}'


data = parse_simple_yaml(DATA.read_text(encoding='utf-8'))
current_island = data['current_island']
current_day = data['current_day']
current_anchor = data['current_day_anchor']
current_title = data['current_day_title']
current_summary = data['current_summary']
current_page = data['current_page']
version = data.get('version', 'daily')
include_name = day_include_name(current_anchor)
label = day_label(current_day, current_title)

# Home page: current introduction, stop and direct link.
p = ROOT / 'index.html'
s = p.read_text(encoding='utf-8')
s = replace_once(s, r'<div class="head"><h2>עכשיו בדרך</h2><p>.*?</p></div>', f'<div class="head"><h2>עכשיו בדרך</h2><p>{current_summary} התחנה הנוכחית שלנו היא <strong>{current_island}</strong>.</p></div>', 'home current summary')
s = replace_once(s, r'<div class="tag">[^<]*CURRENT STOP</div>', f'<div class="tag">{current_island.upper()} · HAWAIʻI · CURRENT STOP</div>', 'home current tag')
s = replace_once(s, r'<h3>פרק חדש: .*?</h3>', f'<h3>פרק חדש: {current_island}</h3>', 'home current title')
s = replace_once(s, r'<a class="btn" href="[^"]+">[^<]+</a>', f'<a class="btn" href="{current_page}">ליום {current_day} ביומן</a>', 'home current link')
s = replace_once(s, r'(<div class="featureCopy">.*?<h3>.*?</h3>)<p>.*?</p>(<a class="btn")', lambda m: m.group(1) + f'<p>{current_summary}</p>' + m.group(2), 'home feature introduction')
p.write_text(s, encoding='utf-8')

# Hawaii page: introduction, day tab, include and current state.
p = ROOT / 'trips' / 'hawaii-2026' / 'index.html'
s = p.read_text(encoding='utf-8')
# Self-heal one bad legacy replacement token if it ever exists.
s = s.replace('\x01', '</div></nav><main class="story">')
s = replace_once(s, r'<span class="currentBadge">.*?</span>', f'<span class="currentBadge">עכשיו במסע: {current_island}</span>', 'hawaii current badge')
s = replace_once(s, r'(<div class="eyebrow">HAWAIʻI.*?</div><h1>.*?</h1>)<p>.*?</p>(<span class="currentBadge">)', lambda m: m.group(1) + f'<p>{current_summary}</p>' + m.group(2), 'hawaii introduction')
if f'href="#{current_anchor}"' not in s:
    marker = '</div></nav><main class="story">'
    if marker not in s:
        raise RuntimeError('Could not find Hawaii day navigation marker')
    s = s.replace(marker, f'<a href="#{current_anchor}">{label}</a>' + marker, 1)
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

# Summer overview: keep top tabs as destinations, update intro and append today's Hawaii story through a managed script.
p = ROOT / 'trips' / 'summer-2026' / 'index.html'
s = p.read_text(encoding='utf-8')
s = re.sub(r'<a[^>]+href="#(?:maui|day-\d+)"[^>]*>.*?</a>', '', s)
s = replace_once(s, r'(<div class="kicker">AZAR FAMILY · SUMMER 2026</div><h1>מסע קיץ 2026</h1>)<p>.*?</p>', lambda m: m.group(1) + f'<p>מסע משפחתי של חודש לכבוד בר מצווה, בת מצווה והרבה חלומות שהתגשמו בדרך. {current_summary}</p>', 'summer introduction')
managed = f'''<script id="current-day-sync">(function(){{const id='{current_anchor}',label='{label}',v='{version}';function go(){{const root=document.getElementById('story');if(!root||typeof window.render!=='function'||!document.getElementById('day-0908')){{setTimeout(go,250);return}}if(document.getElementById(id))return;fetch('/content/{include_name}?v='+v).then(r=>r.text()).then(md=>{{const tmp=document.createElement('div');window.render(md,tmp);const first=tmp.firstElementChild;if(first)first.id=id;while(tmp.firstChild)root.appendChild(tmp.firstChild);const nav=document.querySelector('.hawaiiDays');if(nav&&!nav.querySelector('a[href="#'+id+'"]'))nav.insertAdjacentHTML('beforeend','<a href="#'+id+'">'+label+'</a>');if(location.hash==='#'+id)setTimeout(()=>document.getElementById(id)?.scrollIntoView(),100);}}).catch(()=>{{}})}}go()}})();</script>'''
s = re.sub(r'<script id="current-day-sync">.*?</script>', '', s, flags=re.S)
s = s.replace('</body>', managed + '</body>')
p.write_text(s, encoding='utf-8')

print(f'Synced current trip: {current_day} · {current_island} · {current_title}')
