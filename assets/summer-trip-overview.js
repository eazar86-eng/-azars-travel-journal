(function(){
  const style=document.createElement('style');
  style.textContent=`
  .tripOverview{width:min(1180px,calc(100% - 30px));margin:0 auto 30px}
  .tripOverviewHead{display:flex;justify-content:space-between;align-items:end;gap:20px;margin:0 0 14px}
  .tripOverviewHead h2{font-size:clamp(28px,4vw,42px);margin:0;font-weight:950}
  .tripOverviewHead p{margin:0;color:var(--muted);font-size:14px;line-height:1.6}
  .tripGrid{display:grid;grid-template-columns:minmax(0,1.65fr) minmax(250px,.75fr);gap:14px;direction:ltr}
  .tripMapCard,.tripStops{background:var(--paper);border:1px solid var(--line);border-radius:22px;overflow:hidden}
  .tripMapTop{display:flex;align-items:center;justify-content:space-between;padding:16px 18px;direction:rtl}
  .tripMapTop strong,.tripStops h3{font-size:18px}
  .tripMapTop span{font-size:12px;color:var(--muted)}
  #summerTripMap{height:430px;background:#e7efe9}
  .tripLegend{display:flex;gap:14px;flex-wrap:wrap;padding:12px 16px;border-top:1px solid var(--line);direction:rtl;font-size:12px;font-weight:800}
  .tripLegend span{display:inline-flex;align-items:center;gap:6px}
  .tripStops{padding:16px;direction:rtl}
  .tripStops h3{margin:0 0 12px}
  .tripStop{display:grid;grid-template-columns:34px 1fr auto;gap:10px;align-items:center;padding:12px 0;border-top:1px solid var(--line)}
  .tripStop:first-of-type{border-top:0}
  .tripStop b{font-size:14px}.tripStop small{display:block;color:var(--muted);margin-top:3px;font-size:11px}
  .tripNum{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;background:#171717;color:#fff;font-weight:900}
  .tripStop.current{background:#f7eee8;margin:0 -8px;padding:12px 8px;border-radius:14px;border-top-color:transparent}
  .tripStop.current .tripNum{background:var(--accent)}
  .tripTransport{font-size:20px}
  .visitedTitle{font-size:24px;font-weight:950;margin:24px 0 12px}
  .visitedGrid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px}
  .visitedCard{position:relative;min-height:180px;border-radius:18px;overflow:hidden;border:1px solid var(--line);background:#ddd}
  .visitedCard img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
  .visitedCard:after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(0,0,0,.78),rgba(0,0,0,.02) 70%)}
  .visitedCopy{position:absolute;z-index:2;right:14px;left:14px;bottom:12px;color:#fff}
  .visitedCopy b{display:block;font-size:15px}.visitedCopy span{font-size:11px;opacity:.9}
  .leaflet-div-icon{background:transparent;border:0}
  .trip-pin{width:30px;height:30px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:#171717;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.22);display:grid;place-items:center;color:#fff}
  .trip-pin.current{background:var(--accent)}
  .trip-pin i{font-style:normal;transform:rotate(45deg);font-size:11px;font-weight:900}
  .transportIcon{font-size:26px;filter:drop-shadow(0 2px 3px rgba(255,255,255,.95)) drop-shadow(0 1px 2px rgba(0,0,0,.3))}
  .dayMedia{margin:28px -120px 42px;display:grid;gap:12px;grid-template-columns:repeat(2,minmax(0,1fr))}
  .dayMedia.single{grid-template-columns:1fr}
  .dayMedia.three{grid-template-columns:repeat(3,minmax(0,1fr))}
  .dayMedia figure{margin:0;background:var(--paper);border:1px solid var(--line);border-radius:18px;overflow:hidden}
  .dayMedia .spritePhoto{width:100%;aspect-ratio:1/1;background-image:url('/assets/summer-2026/day-0908/all-photos.jpg?v=20260810waipio2');background-repeat:no-repeat;background-size:300% 300%;background-color:#ddd}
  .dayMedia figure.heroFrame .spritePhoto{aspect-ratio:16/9}
  .dayMedia figcaption{padding:10px 12px;color:var(--muted);font-size:12px;line-height:1.55}
  @media(max-width:1000px){.dayMedia{margin:26px -35px 38px}}
  @media(max-width:900px){.tripGrid{grid-template-columns:1fr}.visitedGrid{grid-template-columns:repeat(2,minmax(0,1fr))}.visitedCard{min-height:160px}#summerTripMap{height:390px}}
  @media(max-width:700px){.dayMedia,.dayMedia.three{grid-template-columns:1fr;margin:24px 0 34px}.dayMedia figure.heroFrame .spritePhoto{aspect-ratio:4/3}}
  @media(max-width:560px){.tripOverviewHead{display:block}.tripOverviewHead p{margin-top:6px}.visitedGrid{grid-template-columns:1fr}.visitedCard{min-height:190px}#summerTripMap{height:350px}}
  `;
  document.head.appendChild(style);

  const section=document.createElement('section');
  section.className='tripOverview';
  section.innerHTML=`
    <div class="tripOverviewHead"><div><h2>מפת המסע המלאה</h2><p>כל מסע קיץ 2026 במבט אחד. טיסה מסומנת במטוס אחד, נסיעה יבשתית ברכב אחד.</p></div></div>
    <div class="tripGrid">
      <div class="tripMapCard">
        <div class="tripMapTop"><strong>ניו יורק עד לוס אנג׳לס</strong><span>התחנה הנוכחית: Big Island</span></div>
        <div id="summerTripMap" aria-label="מפת מסע קיץ 2026"></div>
        <div class="tripLegend"><span>✈️ טיסה</span><span>🚗 נסיעה ברכב</span><span>📍 תחנה במסע</span></div>
      </div>
      <aside class="tripStops">
        <h3>כל התחנות במסע</h3>
        <div class="tripStop"><div class="tripNum">1</div><div><b>New York</b><small>פתיחת המסע</small></div><div class="tripTransport">✈️</div></div>
        <div class="tripStop"><div class="tripNum">2</div><div><b>Seattle</b><small>התחלה בחוף המערבי</small></div><div class="tripTransport">🚗</div></div>
        <div class="tripStop"><div class="tripNum">3</div><div><b>Canadian Rockies</b><small>הרים ואגמים</small></div><div class="tripTransport">🚗</div></div>
        <div class="tripStop"><div class="tripNum">4</div><div><b>Glacier</b><small>המשך המסע ברכב</small></div><div class="tripTransport">✈️</div></div>
        <div class="tripStop current"><div class="tripNum">5</div><div><b>Big Island</b><small>אנחנו כאן עכשיו</small></div><div class="tripTransport">✈️</div></div>
        <div class="tripStop"><div class="tripNum">6</div><div><b>Maui</b><small>התחנה הבאה</small></div><div class="tripTransport">✈️</div></div>
        <div class="tripStop"><div class="tripNum">7</div><div><b>Los Angeles</b><small>סיום המסע</small></div><div class="tripTransport">🏁</div></div>
      </aside>
    </div>
    <div class="visitedTitle">אזורים שכבר ביקרנו בהם</div>
    <div class="visitedGrid">
      <div class="visitedCard"><img src="/assets/summer-2026/nyc-road/01.jpg" alt="ניו יורק"><div class="visitedCopy"><b>New York</b><span>ניו יורק</span></div></div>
      <div class="visitedCard"><img src="/assets/summer-2026/nyc-road/05.jpg" alt="סיאטל"><div class="visitedCopy"><b>Seattle</b><span>סיאטל</span></div></div>
      <div class="visitedCard"><img src="/assets/summer-2026/rockies/09.jpg" alt="הרוקיז הקנדיים"><div class="visitedCopy"><b>Canadian Rockies</b><span>הרוקיז הקנדיים</span></div></div>
      <div class="visitedCard"><img src="/assets/summer-2026/glacier/03.jpg" alt="גליישר"><div class="visitedCopy"><b>Glacier</b><span>גליישר</span></div></div>
      <div class="visitedCard"><img src="/assets/summer-2026/hawaii-kona/02.jpg" alt="ביג איילנד"><div class="visitedCopy"><b>Big Island</b><span>האי הגדול</span></div></div>
    </div>`;
  const hero=document.querySelector('.hero');
  if(hero)hero.insertAdjacentElement('afterend',section);

  function addLeaflet(){
    const link=document.createElement('link');link.rel='stylesheet';link.href='https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css';document.head.appendChild(link);
    const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js';s.onload=initMap;document.head.appendChild(s);
  }
  function initMap(){
    if(!window.L||!document.getElementById('summerTripMap'))return;
    const map=L.map('summerTripMap',{scrollWheelZoom:false,zoomControl:true,attributionControl:true});
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'© OpenStreetMap'}).addTo(map);
    const pts={ny:[40.7128,-74.0060],sea:[47.6062,-122.3321],rockies:[51.4254,-116.1773],glacier:[48.7596,-113.7870],big:[19.944,-155.879],maui:[20.690,-156.442],la:[34.0522,-118.2437]};
    const stops=[['New York',pts.ny,1],['Seattle',pts.sea,2],['Canadian Rockies',pts.rockies,3],['Glacier',pts.glacier,4],['Big Island',pts.big,5],['Maui',pts.maui,6],['Los Angeles',pts.la,7]];
    stops.forEach(([name,p,n])=>L.marker(p,{icon:L.divIcon({className:'leaflet-div-icon',html:`<div class="trip-pin ${name==='Big Island'?'current':''}"><i>${n}</i></div>`,iconSize:[30,30],iconAnchor:[15,28]})}).addTo(map).bindTooltip(name,{permanent:false,direction:'top'}));
    const flightStyle={color:'#274c77',weight:3,dashArray:'8 8',opacity:.92};
    const roadStyle={color:'#8a5a44',weight:4,opacity:.9};
    L.polyline([pts.ny,pts.sea],flightStyle).addTo(map);
    L.polyline([pts.sea,pts.rockies,pts.glacier,pts.sea],roadStyle).addTo(map);
    L.polyline([pts.sea,pts.big],flightStyle).addTo(map);
    L.polyline([pts.big,pts.maui],flightStyle).addTo(map);
    L.polyline([pts.maui,pts.la],flightStyle).addTo(map);
    function iconAt(p,emoji){L.marker(p,{interactive:false,icon:L.divIcon({className:'leaflet-div-icon',html:`<div class="transportIcon">${emoji}</div>`,iconSize:[30,30],iconAnchor:[15,15]})}).addTo(map)}
    iconAt([44.2,-97.4],'✈️');iconAt([50.1,-119.2],'🚗');iconAt([33.6,-139.4],'✈️');iconAt([20.3,-156.15],'✈️');iconAt([27.1,-137.0],'✈️');
    map.fitBounds(L.latLngBounds([pts.big,pts.ny,pts.rockies,pts.la]),{padding:[28,28]});
  }

  const spritePos=[
    ['0%','0%'],['50%','0%'],['100%','0%'],
    ['0%','50%'],['50%','50%'],['100%','50%'],
    ['0%','100%'],['50%','100%'],['100%','100%']
  ];
  function spriteFigure(index,caption,heroFrame){
    const f=document.createElement('figure');
    if(heroFrame)f.className='heroFrame';
    const ph=document.createElement('div');
    ph.className='spritePhoto';
    ph.style.backgroundPosition=spritePos[index][0]+' '+spritePos[index][1];
    ph.setAttribute('role','img');
    ph.setAttribute('aria-label',caption);
    const cap=document.createElement('figcaption');cap.textContent=caption;
    f.append(ph,cap);return f;
  }
  function mediaBlock(items,klass){
    const wrap=document.createElement('div');wrap.className='dayMedia '+(klass||'');
    items.forEach(x=>wrap.appendChild(spriteFigure(x[0],x[1],x[2])));
    return wrap;
  }
  function findHeading(root,text){return Array.from(root.querySelectorAll('h3')).find(h=>h.textContent.trim()===text)}
  function insertAfterParagraphs(heading,node,count){
    if(!heading)return;let cur=heading,c=0;
    while(cur.nextSibling&&c<count){cur=cur.nextSibling;if(cur.nodeType===1&&cur.tagName==='P')c++}
    cur.after(node);
  }
  function ensureDayTab(){
    const days=document.querySelector('.hawaiiDays');
    if(days&&!days.querySelector('a[href="#day-0908"]'))days.insertAdjacentHTML('beforeend','<a href="#day-0908">09.08 · Waipiʻo</a>');
  }
  function addDay0908(){
    ensureDayTab();
    if(document.getElementById('day-0908'))return;
    if(typeof window.render!=='function'||!document.getElementById('day-0808')){setTimeout(addDay0908,250);return}
    fetch('/content/day-0908.md?v=20260810waipio3').then(r=>r.text()).then(md=>{
      if(document.getElementById('day-0908'))return;
      const root=document.getElementById('story');
      const tmp=document.createElement('div');
      window.render(md,tmp);
      const date=tmp.querySelector('.dateHead');
      if(date){date.id='day-0908';date.textContent='יום ראשון, 9 באוגוסט'}
      while(tmp.firstChild)root.appendChild(tmp.firstChild);

      const dateHead=document.getElementById('day-0908');
      const title=dateHead&&dateHead.nextElementSibling;
      if(title){
        let p=title.nextElementSibling;
        while(p&&p.tagName!=='P')p=p.nextElementSibling;
        if(p)insertAfterParagraphs(p,mediaBlock([[3,'התמונה המשפחתית בתצפית Waipiʻo Valley',true]],'single'),1);
      }
      const waipio=findHeading(root,'Waipiʻo Valley Lookout');
      insertAfterParagraphs(waipio,mediaBlock([
        [2,'העמק הירוק עטוף בעננים ובערפל טרופי'],
        [0,'המצוקים של Waipiʻo פוגשים את האוקיינוס'],
        [5,'מבט נוסף מהתצפית לכיוון האוקיינוס']
      ],'three'),3);
      const fruit=findHeading(root,'Waipiʻo Fruit Shack');
      insertAfterParagraphs(fruit,mediaBlock([
        [7,'הכניסה הצבעונית ל Waipiʻo Fruit Shack'],
        [8,'Waipiʻo Fruit Shack בתוך הצמחייה הטרופית'],
        [4,'קוקוס טרי שנפתח במקום']
      ],'three'),2);
      const hotel=findHeading(root,'אחר הצהריים במלון');
      insertAfterParagraphs(hotel,mediaBlock([[6,'עוד מבט אחרון על Waipiʻo לפני החזרה למלון']], 'single'),2);
      const meridia=findHeading(root,'ערב ב Meridia');
      insertAfterParagraphs(meridia,mediaBlock([[1,'ערב מול הים באווירה רגועה ונעימה',true]],'single'),4);
      ensureDayTab();
    }).catch(()=>{});
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{addLeaflet();addDay0908()},{once:true});else{addLeaflet();addDay0908()}
})();
