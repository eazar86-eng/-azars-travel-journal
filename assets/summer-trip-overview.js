(function(){
  const VERSION='20260811stable4';

  function addStyles(){
    if(document.getElementById('summer-stable-styles'))return;
    const s=document.createElement('style');s.id='summer-stable-styles';
    s.textContent=`
      .tripOverview{width:min(1180px,calc(100% - 30px));margin:0 auto 30px}
      .tripGrid{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(260px,.8fr);gap:14px;direction:ltr}
      .tripMapCard,.tripStops{background:var(--paper);border:1px solid var(--line);border-radius:22px;overflow:hidden}
      .tripMapTop{display:flex;justify-content:space-between;gap:16px;padding:16px 18px;direction:rtl}
      .tripMapTop span{font-size:12px;color:var(--muted);font-weight:800}
      #summerTripMap{height:420px;background:#e7efe9}
      .tripStops{padding:16px;direction:rtl}.tripStops h3{margin:0 0 10px}
      .tripStop{display:grid;grid-template-columns:34px 1fr auto;gap:10px;align-items:center;padding:11px 0;border-top:1px solid var(--line)}
      .tripStop:first-of-type{border-top:0}.tripNum{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;background:#171717;color:#fff;font-weight:900}
      .tripStop.current{background:#f7eee8;margin:0 -8px;padding:12px 8px;border-radius:14px;border-top-color:transparent}.tripStop.current .tripNum{background:var(--accent)}
      .tripStop small{display:block;color:var(--muted);margin-top:3px}.leaflet-div-icon{background:transparent;border:0}
      .trip-pin{width:30px;height:30px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:#171717;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.22);display:grid;place-items:center;color:#fff}.trip-pin.current{background:var(--accent)}.trip-pin i{font-style:normal;transform:rotate(45deg);font-size:11px;font-weight:900}
      .sumMag{width:min(1120px,calc(100vw - 30px));margin:58px 50% 0;transform:translateX(50%);direction:rtl}
      .sumMagIntro{width:min(820px,100%);margin:0 auto 28px}.sumMagDate{font-size:14px;color:var(--muted);margin-bottom:10px}.sumMagIntro h2{font-size:clamp(36px,5vw,56px)!important;line-height:1.06!important;margin:0 0 18px!important}.sumMagIntro p{font-size:19px!important;line-height:1.9!important}
      .sumMagRow{display:grid;grid-template-columns:minmax(0,1.06fr) minmax(0,.94fr);gap:36px;align-items:center;padding:28px 0;border-top:1px solid var(--line)}
      .sumMagRow.reverse .sumMagMedia{order:2}.sumMagRow.reverse .sumMagCopy{order:1}
      .sumMagMedia{margin:0}.sumMagMedia img{display:block;width:100%;height:auto;max-height:430px;object-fit:cover;border-radius:18px;background:#ece7df}.sumMagMedia.portrait{width:min(78%,430px);justify-self:center}.sumMagMedia.portrait img{max-height:560px;object-fit:contain}
      .sumMagMedia figcaption{font-size:12px;line-height:1.5;color:var(--muted);padding:8px 3px 0}.sumMagCopy h3{font-size:clamp(24px,3vw,33px)!important;line-height:1.2!important;margin:0 0 14px!important}.sumMagCopy p{font-size:18px!important;line-height:1.95!important;color:#44413d!important;margin:0 0 14px!important}
      .sumDay10{width:min(1120px,calc(100vw - 30px));margin:68px 50% 0;transform:translateX(50%);padding-top:24px;border-top:2px solid var(--ink);direction:rtl}.sumDay10Inner{width:min(820px,100%);margin:auto}.sumDay10 .dateHead{margin-top:0!important}.sumDay10 p{font-size:18px!important;line-height:1.95!important}
      @media(max-width:900px){.tripGrid{grid-template-columns:1fr}#summerTripMap{height:350px}.sumMagRow{gap:22px}}
      @media(max-width:700px){.sumMag,.sumDay10{width:min(100%,calc(100vw - 30px));margin-top:42px}.sumMagIntro p,.sumDay10 p{font-size:17px!important}.sumMagRow,.sumMagRow.reverse{grid-template-columns:1fr;gap:15px;padding:24px 0}.sumMagRow .sumMagCopy,.sumMagRow .sumMagMedia,.sumMagRow.reverse .sumMagCopy,.sumMagRow.reverse .sumMagMedia{order:initial}.sumMagMedia img{max-height:360px;border-radius:16px}.sumMagMedia.portrait{width:min(84%,350px)}.sumMagMedia.portrait img{max-height:470px;object-fit:contain}}
    `;document.head.appendChild(s);
  }

  function cleanTopTabs(){
    const tools=document.querySelector('.toolsIn');if(!tools)return;
    tools.querySelectorAll('a[href="#maui"],a[href="#day-1008"],a[data-day="1008"]').forEach(x=>x.remove());
  }

  function addOverview(){
    if(document.querySelector('.tripOverview'))return;
    const hero=document.querySelector('.hero');if(!hero)return;
    const section=document.createElement('section');section.className='tripOverview';
    section.innerHTML=`<div class="tripGrid"><div class="tripMapCard"><div class="tripMapTop"><strong>מפת מסע קיץ 2026</strong><span>התחנה הנוכחית: מאווי, הוואי</span></div><div id="summerTripMap"></div></div><aside class="tripStops"><h3>כל התחנות במסע</h3><div class="tripStop"><div class="tripNum">1</div><div><b>New York</b><small>פתיחת המסע</small></div><div>✈️</div></div><div class="tripStop"><div class="tripNum">2</div><div><b>Seattle</b><small>החוף המערבי</small></div><div>🚗</div></div><div class="tripStop"><div class="tripNum">3</div><div><b>Canadian Rockies</b><small>הרים ואגמים</small></div><div>🚗</div></div><div class="tripStop"><div class="tripNum">4</div><div><b>Glacier</b><small>פארק גליישר</small></div><div>✈️</div></div><div class="tripStop"><div class="tripNum">5</div><div><b>Big Island</b><small>4 עד 10 באוגוסט</small></div><div>✈️</div></div><div class="tripStop current"><div class="tripNum">6</div><div><b>Maui</b><small>אנחנו כאן עכשיו</small></div><div>✈️</div></div><div class="tripStop"><div class="tripNum">7</div><div><b>Los Angeles</b><small>התחנה הבאה</small></div><div>🏁</div></div></aside></div>`;
    hero.insertAdjacentElement('afterend',section);
  }

  function loadMap(){
    const el=document.getElementById('summerTripMap');if(!el||el.dataset.ready)return;el.dataset.ready='1';
    const css=document.createElement('link');css.rel='stylesheet';css.href='https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css';document.head.appendChild(css);
    const js=document.createElement('script');js.src='https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js';js.onload=()=>{if(!window.L)return;const map=L.map('summerTripMap',{scrollWheelZoom:false});L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'© OpenStreetMap'}).addTo(map);const pts={ny:[40.7128,-74.006],sea:[47.6062,-122.3321],rockies:[51.4254,-116.1773],glacier:[48.7596,-113.787],big:[19.944,-155.879],maui:[20.79,-156.33],la:[34.0522,-118.2437]};const stops=[['New York',pts.ny,1],['Seattle',pts.sea,2],['Canadian Rockies',pts.rockies,3],['Glacier',pts.glacier,4],['Big Island',pts.big,5],['Maui',pts.maui,6],['Los Angeles',pts.la,7]];stops.forEach(([name,p,n])=>L.marker(p,{icon:L.divIcon({className:'leaflet-div-icon',html:`<div class="trip-pin ${name==='Maui'?'current':''}"><i>${n}</i></div>`,iconSize:[30,30],iconAnchor:[15,28]})}).addTo(map).bindTooltip(name));const flight={color:'#274c77',weight:3,dashArray:'8 8',opacity:.9},road={color:'#8a5a44',weight:4,opacity:.9};L.polyline([pts.ny,pts.sea],flight).addTo(map);L.polyline([pts.sea,pts.rockies,pts.glacier,pts.sea],road).addTo(map);L.polyline([pts.sea,pts.big,pts.maui,pts.la],flight).addTo(map);map.fitBounds(L.latLngBounds([pts.ny,pts.rockies,pts.big,pts.maui,pts.la]),{padding:[25,25]});};document.head.appendChild(js);
  }

  const photos0908=[
    ['/assets/summer-2026/day-0908/0f067c10-bc49-46d3-84ef-1f0daf905680.JPG','Waipiʻo Valley Lookout','portrait'],
    ['/assets/summer-2026/day-0908/IMG_9849.jpeg','המצוקים והאוקיינוס ב Waipiʻo',''],
    ['/assets/summer-2026/day-0908/IMG_9855.jpeg','עוד מבט אל Waipiʻo Valley',''],
    ['/assets/summer-2026/day-0908/IMG_9859.jpeg','Waipiʻo Fruit Shack',''],
    ['/assets/summer-2026/day-0908/IMG_9860.jpeg','הצמחייה הטרופית בצפון האי',''],
    ['/assets/summer-2026/day-0908/466000bf-ab8b-4a51-a3e0-092cf5b6e8a5.JPG','ערב מול הים',''],
    ['/assets/summer-2026/day-0908/IMG_9882.jpeg','סיום היום בביג איילנד','']
  ];

  function transform0908(){
    if(document.querySelector('.sumMag[data-day="0908"]'))return true;
    const start=document.getElementById('day-0908');const story=document.getElementById('story');if(!start||!story)return false;
    const nodes=[];let n=start;while(n){nodes.push(n);n=n.nextSibling;}
    const intro=[];const groups=[];let current=null;let seenSection=false;
    for(const node of nodes){
      if(node.nodeType!==1)continue;
      if(node===start){intro.push(node);continue;}
      if(node.matches('h2.dayTitle')){intro.push(node);continue;}
      if(node.matches('h3,.sectionTitle')){seenSection=true;current={head:node,body:[]};groups.push(current);continue;}
      if(!seenSection)intro.push(node);else if(current)current.body.push(node);
    }
    nodes.forEach(x=>x.remove());
    const wrap=document.createElement('section');wrap.className='sumMag';wrap.dataset.day='0908';wrap.id='day-0908';
    const head=document.createElement('header');head.className='sumMagIntro';
    const date=document.createElement('div');date.className='sumMagDate';date.textContent='9 באוגוסט 2026';head.appendChild(date);
    intro.forEach(el=>{if(el.id==='day-0908')el.removeAttribute('id');head.appendChild(el)});wrap.appendChild(head);
    groups.forEach((g,i)=>{const row=document.createElement('article');row.className='sumMagRow'+(i%2?' reverse':'');const p=photos0908[i%photos0908.length];const fig=document.createElement('figure');fig.className='sumMagMedia'+(p[2]?' '+p[2]:'');fig.innerHTML=`<img src="${p[0]}?v=${VERSION}" alt="${p[1]}" loading="${i===0?'eager':'lazy'}"><figcaption>${p[1]}</figcaption>`;const copy=document.createElement('div');copy.className='sumMagCopy';copy.appendChild(g.head);g.body.forEach(x=>copy.appendChild(x));row.append(fig,copy);wrap.appendChild(row)});
    story.appendChild(wrap);return true;
  }

  function append1008(){
    if(document.getElementById('day-1008'))return;
    const story=document.getElementById('story');if(!story||typeof window.render!=='function')return;
    fetch('/content/day-1008.md?v='+VERSION).then(r=>r.text()).then(md=>{if(document.getElementById('day-1008'))return;const sec=document.createElement('section');sec.className='sumDay10';sec.id='day-1008';const inner=document.createElement('div');inner.className='sumDay10Inner';const tmp=document.createElement('div');window.render(md,tmp);while(tmp.firstChild)inner.appendChild(tmp.firstChild);sec.appendChild(inner);story.appendChild(sec)}).catch(()=>{});
  }

  function waitForStableStory(tries=0){
    cleanTopTabs();
    const ready=document.getElementById('day-0908')&&!document.querySelector('[data-initial-anchor]');
    if(!ready&&tries<80){setTimeout(()=>waitForStableStory(tries+1),150);return;}
    if(transform0908())append1008();
    cleanTopTabs();
  }

  function init(){addStyles();cleanTopTabs();addOverview();loadMap();waitForStableStory();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();