(function(){
  const VERSION='20260811maui3';

  function ensureDestinationTab(){
    const tools=document.querySelector('.toolsIn');
    if(!tools)return;
    tools.querySelectorAll('a[href="#day-1008"],a[data-day="1008"]').forEach(x=>x.remove());
    if(!tools.querySelector('a[href="#maui"]')){
      const hawaii=tools.querySelector('a[href="#hawaii"]');
      const a=document.createElement('a');
      a.href='#maui';
      a.textContent='מאווי';
      if(hawaii)hawaii.insertAdjacentElement('afterend',a); else tools.prepend(a);
    }
  }

  function addStyles(){
    if(document.getElementById('maui-mag-styles'))return;
    const s=document.createElement('style');s.id='maui-mag-styles';
    s.textContent=`
    .tripOverview{width:min(1180px,calc(100% - 30px));margin:0 auto 30px}.tripGrid{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(260px,.8fr);gap:14px;direction:ltr}.tripMapCard,.tripStops{background:var(--paper);border:1px solid var(--line);border-radius:22px;overflow:hidden}.tripMapTop{display:flex;justify-content:space-between;gap:16px;padding:16px 18px;direction:rtl}.tripMapTop span{font-size:12px;color:var(--muted);font-weight:800}#summerTripMap{height:420px;background:#e7efe9}.tripStops{padding:16px;direction:rtl}.tripStops h3{margin:0 0 10px}.tripStop{display:grid;grid-template-columns:34px 1fr auto;gap:10px;align-items:center;padding:11px 0;border-top:1px solid var(--line)}.tripStop:first-of-type{border-top:0}.tripNum{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;background:#171717;color:#fff;font-weight:900}.tripStop.current{background:#f7eee8;margin:0 -8px;padding:12px 8px;border-radius:14px;border-top-color:transparent}.tripStop.current .tripNum{background:var(--accent)}.tripStop small{display:block;color:var(--muted);margin-top:3px}.leaflet-div-icon{background:transparent;border:0}.trip-pin{width:30px;height:30px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:#171717;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.22);display:grid;place-items:center;color:#fff}.trip-pin.current{background:var(--accent)}.trip-pin i{font-style:normal;transform:rotate(45deg);font-size:11px;font-weight:900}
    .sumMag{width:min(1120px,calc(100vw - 30px));margin:58px 50% 0;transform:translateX(50%);direction:rtl}.sumMagIntro{width:min(820px,100%);margin:0 auto 28px}.sumMagIntro h2{font-size:clamp(36px,5vw,56px)!important;line-height:1.06!important;margin:0 0 10px!important}.sumMagDate{font-size:14px;color:var(--muted);margin-bottom:18px}.sumMagIntro p{font-size:19px!important;line-height:1.9!important}.sumMagRow{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(0,.92fr);gap:36px;align-items:center;padding:28px 0;border-top:1px solid var(--line)}.sumMagRow.reverse .sumMagMedia{order:2}.sumMagRow.reverse .sumMagCopy{order:1}.sumMagMedia{margin:0}.sumMagMedia img{display:block;width:100%;height:auto;max-height:430px;object-fit:cover;border-radius:18px;background:#ece7df}.sumMagMedia.portrait{width:min(76%,430px);justify-self:center}.sumMagMedia.portrait img{max-height:560px;object-fit:contain}.sumMagMedia figcaption{font-size:12px;line-height:1.5;color:var(--muted);padding:8px 3px 0}.sumMagCopy h3{font-size:clamp(25px,3vw,34px)!important;line-height:1.2!important;margin:0 0 15px!important}.sumMagCopy p{font-size:18px!important;line-height:1.95!important;color:#44413d!important;margin:0 0 14px!important}.mauiSection{width:min(1120px,calc(100vw - 30px));margin:68px 50% 0;transform:translateX(50%);padding-top:22px;border-top:2px solid var(--ink);direction:rtl}.mauiInner{width:min(820px,100%);margin:auto}.mauiKicker{font-size:13px;font-weight:950;color:var(--accent);margin-bottom:8px}.mauiSection h2{font-size:clamp(38px,5vw,54px)!important;margin:0 0 16px!important}.mauiSection p{font-size:18px!important;line-height:1.95!important}.mauiLead{font-size:20px!important;font-weight:700;color:#383530!important}
    @media(max-width:900px){.tripGrid{grid-template-columns:1fr}#summerTripMap{height:350px}.sumMagRow{gap:22px}}
    @media(max-width:700px){.sumMag,.mauiSection{width:min(100%,calc(100vw - 30px));margin-top:42px}.sumMagIntro p,.mauiSection p{font-size:17px!important}.sumMagRow,.sumMagRow.reverse{grid-template-columns:1fr;gap:15px;padding:24px 0}.sumMagRow .sumMagCopy,.sumMagRow .sumMagMedia,.sumMagRow.reverse .sumMagCopy,.sumMagRow.reverse .sumMagMedia{order:initial}.sumMagMedia img{max-height:360px;border-radius:16px}.sumMagMedia.portrait{width:min(84%,350px)}.sumMagMedia.portrait img{max-height:470px;object-fit:contain}}
    `;document.head.appendChild(s);
  }

  function addOverview(){
    if(document.querySelector('.tripOverview'))return;
    const hero=document.querySelector('.hero');if(!hero)return;
    const section=document.createElement('section');section.className='tripOverview';
    section.innerHTML=`<div class="tripGrid"><div class="tripMapCard"><div class="tripMapTop"><strong>מפת מסע קיץ 2026</strong><span>התחנה הנוכחית: מאווי</span></div><div id="summerTripMap"></div></div><aside class="tripStops"><h3>כל התחנות במסע</h3><div class="tripStop"><div class="tripNum">1</div><div><b>New York</b><small>פתיחת המסע</small></div><div>✈️</div></div><div class="tripStop"><div class="tripNum">2</div><div><b>Seattle</b><small>החוף המערבי</small></div><div>🚗</div></div><div class="tripStop"><div class="tripNum">3</div><div><b>Canadian Rockies</b><small>הרים ואגמים</small></div><div>🚗</div></div><div class="tripStop"><div class="tripNum">4</div><div><b>Glacier</b><small>פארק גליישר</small></div><div>✈️</div></div><div class="tripStop"><div class="tripNum">5</div><div><b>Big Island</b><small>הסתיים ב 10/08</small></div><div>✈️</div></div><div class="tripStop current"><div class="tripNum">6</div><div><b>Maui</b><small>אנחנו כאן עכשיו</small></div><div>✈️</div></div><div class="tripStop"><div class="tripNum">7</div><div><b>Los Angeles</b><small>התחנה הבאה</small></div><div>🏁</div></div></aside></div>`;
    hero.insertAdjacentElement('afterend',section);
  }

  function loadMap(){
    if(!document.getElementById('summerTripMap')||document.getElementById('summerTripMap').dataset.ready)return;
    document.getElementById('summerTripMap').dataset.ready='1';
    const css=document.createElement('link');css.rel='stylesheet';css.href='https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css';document.head.appendChild(css);
    const js=document.createElement('script');js.src='https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js';js.onload=()=>{if(!window.L)return;const map=L.map('summerTripMap',{scrollWheelZoom:false});L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'© OpenStreetMap'}).addTo(map);const pts={ny:[40.7128,-74.006],sea:[47.6062,-122.3321],rockies:[51.4254,-116.1773],glacier:[48.7596,-113.787],big:[19.944,-155.879],maui:[20.79,-156.33],la:[34.0522,-118.2437]};const stops=[['New York',pts.ny,1],['Seattle',pts.sea,2],['Canadian Rockies',pts.rockies,3],['Glacier',pts.glacier,4],['Big Island',pts.big,5],['Maui',pts.maui,6],['Los Angeles',pts.la,7]];stops.forEach(([name,p,n])=>L.marker(p,{icon:L.divIcon({className:'leaflet-div-icon',html:`<div class="trip-pin ${name==='Maui'?'current':''}"><i>${n}</i></div>`,iconSize:[30,30],iconAnchor:[15,28]})}).addTo(map).bindTooltip(name));const flight={color:'#274c77',weight:3,dashArray:'8 8',opacity:.9},road={color:'#8a5a44',weight:4,opacity:.9};L.polyline([pts.ny,pts.sea],flight).addTo(map);L.polyline([pts.sea,pts.rockies,pts.glacier,pts.sea],road).addTo(map);L.polyline([pts.sea,pts.big,pts.maui,pts.la],flight).addTo(map);map.fitBounds(L.latLngBounds([pts.ny,pts.rockies,pts.big,pts.maui,pts.la]),{padding:[25,25]});};document.head.appendChild(js);
  }

  function buildMagazine0908(){
    if(document.querySelector('.sumMag[data-day="0908"]'))return true;
    const start=document.getElementById('day-0908');
    const story=document.getElementById('story');
    if(!start||!story)return false;
    let n=start;const remove=[];while(n){remove.push(n);n=n.nextSibling;}remove.forEach(x=>x.remove());
    const s=document.createElement('section');s.className='sumMag';s.dataset.day='0908';s.id='day-0908';
    s.innerHTML=`<header class="sumMagIntro"><h2>Waipiʻo Valley והיום בצפון האי</h2><div class="sumMagDate">9 באוגוסט 2026</div><p>את הבוקר פתחנו בקצב הוואי, יצאנו צפונה אל Waipiʻo Valley Lookout, ופגשנו יום של עננים, מצוקים, אוקיינוס, פירות טרופיים וערב רגוע מול הים.</p></header>
    <article class="sumMagRow"><figure class="sumMagMedia portrait"><img src="/assets/summer-2026/day-0908/0f067c10-bc49-46d3-84ef-1f0daf905680.JPG?v=${VERSION}" alt="Waipiʻo Valley Lookout"><figcaption>Waipiʻo Valley Lookout</figcaption></figure><div class="sumMagCopy"><h3>Waipiʻo Valley Lookout</h3><p>אחרי כשעה הגענו לתצפית, ומהרגע הראשון היה ברור שהנסיעה הייתה שווה את זה. מולנו נפתח עמק ירוק ועצום, עטוף בעננים ובערפל, כשהמצוקים התלולים יורדים אל החוף הכהה והאוקיינוס.</p></div></article>
    <article class="sumMagRow reverse"><figure class="sumMagMedia"><img src="/assets/summer-2026/day-0908/IMG_9849.jpeg?v=${VERSION}" alt="המצוקים של Waipiʻo"></figure><div class="sumMagCopy"><h3>הנוף עושה את כל העבודה</h3><p>הסתובבנו מעט באזור התצפית ופשוט נשארנו להסתכל. העננים זזו ללא הפסקה, וכל כמה דקות העמק קיבל מראה אחר.</p></div></article>
    <article class="sumMagRow"><figure class="sumMagMedia"><img src="/assets/summer-2026/day-0908/IMG_9859.jpeg?v=${VERSION}" alt="Waipiʻo Fruit Shack"></figure><div class="sumMagCopy"><h3>Waipiʻo Fruit Shack</h3><p>משם המשכנו לעצירה צבעונית בתוך הצמחייה הטרופית, עם שייקים, קערות טריות וקוקוס שנפתח במקום. עצירה קטנה שהרגישה בדיוק כמו הוואי.</p></div></article>
    <article class="sumMagRow reverse"><figure class="sumMagMedia"><img src="/assets/summer-2026/day-0908/IMG_9860.jpeg?v=${VERSION}" alt="הצמחייה הטרופית"></figure><div class="sumMagCopy"><h3>חזרה למלון</h3><p>אחרי העצירה חזרנו ל Fairmont Orchid. הילדים עברו לבריכה ולים, ואנחנו הורדנו קצב אחרי כמה ימים עמוסים של נסיעות וטיולים.</p></div></article>
    <article class="sumMagRow"><figure class="sumMagMedia"><img src="/assets/summer-2026/day-0908/466000bf-ab8b-4a51-a3e0-092cf5b6e8a5.JPG?v=${VERSION}" alt="ערב מול הים"></figure><div class="sumMagCopy"><h3>ערב מול האוקיינוס</h3><p>את היום סיימנו בארוחת ערב ב Meridia שב The Westin Hapuna Beach Resort. האוכל היה מצוין, האווירה רגועה והערב הרגיש כמו סיום מושלם ליום בצפון האי.</p></div></article>`;
    story.appendChild(s);return true;
  }

  function addMauiStory(){
    if(document.getElementById('maui'))return true;
    const story=document.getElementById('story');if(!story)return false;
    const section=document.createElement('section');section.id='maui';section.className='mauiSection';section.innerHTML='<div class="mauiInner"><div class="mauiKicker">MAUI · התחנה הנוכחית</div><h2>10/08 · מקונה למאווי</h2><p class="mauiLead">בבוקר נפרדנו מהביג איילנד, ובתוך טיסה של 16 דקות עברנו לפרק הבא של המסע: מאווי.</p><div class="mauiBody">טוען את סיכום היום...</div></div>';story.appendChild(section);
    fetch('/content/day-1008.md?v='+VERSION).then(r=>r.text()).then(md=>{const body=section.querySelector('.mauiBody');if(!body)return;const tmp=document.createElement('div');if(typeof window.render==='function')window.render(md,tmp);else tmp.textContent=md;body.replaceWith(tmp);}).catch(()=>{const body=section.querySelector('.mauiBody');if(body)body.textContent='סיכום היום יופיע כאן מיד לאחר השלמת הפריסה.'});return true;
  }

  function finalizeStory(){ensureDestinationTab();const ok=buildMagazine0908();if(ok)addMauiStory();}
  function init(){ensureDestinationTab();addStyles();addOverview();loadMap();let tries=0;const timer=setInterval(()=>{finalizeStory();tries++;if((document.getElementById('maui')&&document.querySelector('.sumMag[data-day="0908"]'))||tries>30)clearInterval(timer);},180);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();