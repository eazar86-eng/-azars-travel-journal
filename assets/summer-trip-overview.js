(function(){
  const VERSION='20260811maui2';

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
    const s=document.createElement('style');
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
      .mauiSection{margin-top:64px;padding-top:18px;border-top:1px solid var(--ink)}.mauiKicker{font-size:13px;font-weight:950;color:var(--accent);margin-bottom:8px}.mauiSection>h2{font-size:clamp(38px,5vw,54px);margin:0 0 16px}.mauiLead{font-size:19px!important;font-weight:700;color:#383530!important}
      @media(max-width:900px){.tripGrid{grid-template-columns:1fr}#summerTripMap{height:350px}}
    `;
    document.head.appendChild(s);
  }

  function addOverview(){
    if(document.querySelector('.tripOverview'))return;
    const hero=document.querySelector('.hero');
    if(!hero)return;
    const section=document.createElement('section');
    section.className='tripOverview';
    section.innerHTML=`<div class="tripGrid">
      <div class="tripMapCard"><div class="tripMapTop"><strong>מפת מסע קיץ 2026</strong><span>התחנה הנוכחית: מאווי</span></div><div id="summerTripMap"></div></div>
      <aside class="tripStops"><h3>כל התחנות במסע</h3>
        <div class="tripStop"><div class="tripNum">1</div><div><b>New York</b><small>פתיחת המסע</small></div><div>✈️</div></div>
        <div class="tripStop"><div class="tripNum">2</div><div><b>Seattle</b><small>החוף המערבי</small></div><div>🚗</div></div>
        <div class="tripStop"><div class="tripNum">3</div><div><b>Canadian Rockies</b><small>הרים ואגמים</small></div><div>🚗</div></div>
        <div class="tripStop"><div class="tripNum">4</div><div><b>Glacier</b><small>פארק גליישר</small></div><div>✈️</div></div>
        <div class="tripStop"><div class="tripNum">5</div><div><b>Big Island</b><small>הסתיים ב 10/08</small></div><div>✈️</div></div>
        <div class="tripStop current"><div class="tripNum">6</div><div><b>Maui</b><small>אנחנו כאן עכשיו</small></div><div>✈️</div></div>
        <div class="tripStop"><div class="tripNum">7</div><div><b>Los Angeles</b><small>התחנה הבאה</small></div><div>🏁</div></div>
      </aside></div>`;
    hero.insertAdjacentElement('afterend',section);
  }

  function loadMap(){
    if(!document.getElementById('summerTripMap'))return;
    const css=document.createElement('link');css.rel='stylesheet';css.href='https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css';document.head.appendChild(css);
    const js=document.createElement('script');js.src='https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js';js.onload=()=>{
      if(!window.L)return;
      const map=L.map('summerTripMap',{scrollWheelZoom:false});
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'© OpenStreetMap'}).addTo(map);
      const pts={ny:[40.7128,-74.006],sea:[47.6062,-122.3321],rockies:[51.4254,-116.1773],glacier:[48.7596,-113.787],big:[19.944,-155.879],maui:[20.79,-156.33],la:[34.0522,-118.2437]};
      const stops=[['New York',pts.ny,1],['Seattle',pts.sea,2],['Canadian Rockies',pts.rockies,3],['Glacier',pts.glacier,4],['Big Island',pts.big,5],['Maui',pts.maui,6],['Los Angeles',pts.la,7]];
      stops.forEach(([name,p,n])=>L.marker(p,{icon:L.divIcon({className:'leaflet-div-icon',html:`<div class="trip-pin ${name==='Maui'?'current':''}"><i>${n}</i></div>`,iconSize:[30,30],iconAnchor:[15,28]})}).addTo(map).bindTooltip(name));
      const flight={color:'#274c77',weight:3,dashArray:'8 8',opacity:.9},road={color:'#8a5a44',weight:4,opacity:.9};
      L.polyline([pts.ny,pts.sea],flight).addTo(map);L.polyline([pts.sea,pts.rockies,pts.glacier,pts.sea],road).addTo(map);L.polyline([pts.sea,pts.big,pts.maui,pts.la],flight).addTo(map);
      map.fitBounds(L.latLngBounds([pts.ny,pts.rockies,pts.big,pts.maui,pts.la]),{padding:[25,25]});
    };document.head.appendChild(js);
  }

  function addMauiStory(){
    if(document.getElementById('maui'))return;
    const story=document.getElementById('story');
    if(!story||typeof window.render!=='function')return setTimeout(addMauiStory,180);
    const section=document.createElement('section');
    section.id='maui';section.className='mauiSection';
    section.innerHTML='<div class="mauiKicker">MAUI · התחנה הנוכחית</div><h2>מאווי</h2><p class="mauiLead">ב 10 באוגוסט נפרדנו מקונה ומהביג איילנד ועברנו לפרק הבא של המסע: מאווי.</p>';
    story.appendChild(section);
    fetch('/content/day-1008.md?v='+VERSION).then(r=>r.text()).then(md=>{
      const tmp=document.createElement('div');window.render(md,tmp);
      while(tmp.firstChild)section.appendChild(tmp.firstChild);
    }).catch(()=>{});
  }

  function init(){ensureDestinationTab();addStyles();addOverview();loadMap();addMauiStory();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();