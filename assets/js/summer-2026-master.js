(() => {
  const VERSION = '20260818qa1';
  const $ = (s, r=document) => r.querySelector(s);

  function addStyles(){
    if ($('#summer2026-master-styles')) return;
    const s = document.createElement('style');
    s.id = 'summer2026-master-styles';
    s.textContent = `
      .journeyMap{padding:0 0 58px}.journeyMapGrid{display:grid;grid-template-columns:1.35fr .65fr;gap:14px}.journeyMapCard,.journeyStops{background:var(--paper);border:1px solid var(--line);border-radius:26px;overflow:hidden}.journeyMapHead{padding:22px 24px 16px;display:flex;align-items:end;justify-content:space-between;gap:20px}.journeyMapHead h2{font-family:Georgia,"Times New Roman",serif;font-size:clamp(36px,5vw,54px);line-height:1;margin:0}.journeyMapHead p{margin:0;max-width:500px;color:var(--muted);line-height:1.65;font-size:14px}.journeyMapCanvas{height:430px;background:#dfe8e2}.journeyStops{padding:22px}.journeyStops small{display:block;color:var(--rust);font-weight:950;letter-spacing:.12em;margin-bottom:8px}.journeyStops h3{font-family:Georgia,"Times New Roman",serif;font-size:30px;margin:0 0 14px}.journeyStop{display:grid;grid-template-columns:32px 1fr;gap:10px;align-items:center;padding:11px 0;border-top:1px solid var(--line)}.journeyStop:first-of-type{border-top:0}.journeyStop b{font-size:14px}.journeyNo{width:30px;height:30px;border-radius:50%;background:var(--deep);color:#fff;display:grid;place-items:center;font-size:11px;font-weight:950}.leaflet-div-icon{background:transparent!important;border:0!important}.journeyPin{width:28px;height:28px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:#14251f;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.25);display:grid;place-items:center;color:#fff}.journeyPin i{font-style:normal;transform:rotate(45deg);font-size:10px;font-weight:950}
      .transportMaster{padding:4px 0 66px}.transportMaster .sectionhead{margin-bottom:24px}.flightJourney{background:#111b27;color:#fff;border-radius:28px;padding:clamp(22px,4vw,36px);overflow:hidden}.flightJourneyTop{display:flex;align-items:end;justify-content:space-between;gap:28px;margin-bottom:22px}.flightJourneyTop small{font-size:10px;font-weight:950;letter-spacing:.15em;color:#a9c2df}.flightJourneyTop h3{font-family:Georgia,"Times New Roman",serif;font-size:clamp(38px,5vw,58px);margin:8px 0 0;line-height:.98}.flightJourneyTop p{margin:0;max-width:510px;color:#d5dde6;line-height:1.7;font-size:14px}.flightLegs{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.flightLeg{background:#fff;color:#151515;border-radius:20px;padding:16px;min-height:155px;display:flex;flex-direction:column;justify-content:space-between}.airBrand{display:flex;align-items:center;gap:10px;direction:ltr}.airBrand img{width:36px;height:36px;object-fit:contain;border-radius:8px;background:#fff}.airBrand strong{font-size:15px}.flightRoute{font-family:Georgia,"Times New Roman",serif;font-size:22px;direction:ltr;text-align:left;margin:14px 0 7px}.flightLeg span{font-size:12px;color:#6a655f;line-height:1.45}.carsMaster{margin-top:14px}.carsMasterHead{display:flex;align-items:end;justify-content:space-between;gap:20px;padding:18px 0}.carsMasterHead h3{font-family:Georgia,"Times New Roman",serif;font-size:clamp(34px,4vw,48px);margin:0}.carsMasterHead p{margin:0;color:var(--muted);max-width:560px;line-height:1.7}.carGridMaster{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.carMaster{background:var(--paper);border:1px solid var(--line);border-radius:22px;overflow:hidden}.carMasterMedia{height:190px;background:#e8e3da}.carMasterMedia img{width:100%;height:100%;object-fit:cover;display:block}.carMasterBody{padding:15px}.carMasterBody small{color:var(--rust);font-weight:950;letter-spacing:.08em}.carMasterBody h4{font-family:Georgia,"Times New Roman",serif;font-size:22px;margin:6px 0}.carMasterBody p{font-size:12.5px;line-height:1.55;color:#5b554d;margin:0}.carMasterCredit{font-size:9px!important;color:#9a9288!important;margin-top:8px!important;direction:ltr;text-align:left}
      .dayGallery{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin:22px 0}.dayGallery .photo{margin:0}.dayGallery .photo:first-child:nth-last-child(1){grid-column:1/-1}.dayGallery img{width:100%;height:100%;max-height:520px;object-fit:cover;border-radius:16px}.dayGallery .portrait img{object-fit:contain;background:#ece7df}.dayMaster{background:var(--paper);border:1px solid var(--line);border-radius:24px;padding:clamp(22px,4vw,34px);margin-bottom:18px;box-shadow:0 12px 34px rgba(52,43,32,.045)}.dayMaster .dateHead{font-size:12px;color:var(--rust);font-weight:950;margin-bottom:8px}.dayMaster .dayTitle{font-family:Georgia,"Times New Roman",serif;font-size:clamp(31px,5vw,45px);line-height:1.08;margin:0 0 20px}.dayMaster p{font-size:17px;line-height:1.86;color:#3f3b36;margin:0 0 18px}.dayMaster h2{font-size:25px;margin:29px 0 11px}.dayMaster h3{font-size:21px;margin:25px 0 10px}.dayMaster img{display:block;width:100%;height:auto;max-height:760px;object-fit:contain;border-radius:16px}.dayMaster .photo{margin:22px 0}
      @media(max-width:900px){.journeyMapGrid{grid-template-columns:1fr}.journeyMapCanvas{height:360px}.flightLegs{grid-template-columns:repeat(2,1fr)}.carGridMaster{grid-template-columns:repeat(2,1fr)}}
      @media(max-width:650px){.journeyMapHead,.flightJourneyTop,.carsMasterHead{display:block}.journeyMapHead p,.flightJourneyTop p,.carsMasterHead p{margin-top:12px}.journeyMapCanvas{height:330px}.flightLegs{grid-template-columns:1fr}.carGridMaster{grid-template-columns:1fr 1fr}.carMasterMedia{height:150px}.carMasterBody h4{font-size:18px}.dayGallery{grid-template-columns:1fr}.dayMaster{padding:20px 16px;border-radius:19px}.dayMaster p{font-size:16.5px;line-height:1.75}}
      @media(max-width:430px){.carGridMaster{grid-template-columns:1fr}.carMasterMedia{height:210px}.flightJourney{border-radius:20px}.journeyMapCard,.journeyStops{border-radius:20px}}
    `;
    document.head.appendChild(s);
  }

  function injectMap(){
    if ($('#journey-map')) return;
    const route = $('.route');
    if (!route) return;
    const sec = document.createElement('section');
    sec.className = 'journeyMap'; sec.id='journey-map';
    sec.innerHTML = `<div class="wrap journeyMapGrid"><div class="journeyMapCard"><div class="journeyMapHead"><div><h2>המפה של המסע</h2></div><p>מהמזרח למערב, מהכבישים של קנדה אל האוקיינוס השקט, דרך שני איים בהוואי ועד לוס אנג׳לס.</p></div><div id="journeyMapCanvas" class="journeyMapCanvas"></div></div><aside class="journeyStops"><small>THE ROUTE</small><h3>כל התחנות</h3>${['תל אביב','ניו יורק','סיאטל','הרוקייז הקנדיים','גליישר','סיאטל','ביג איילנד','מאווי','לוס אנג׳לס','תל אביב'].map((x,i)=>`<div class="journeyStop"><div class="journeyNo">${i+1}</div><b>${x}</b></div>`).join('')}</aside></div>`;
    route.insertAdjacentElement('afterend', sec);
    loadMap();
  }

  function loadMap(){
    const el=$('#journeyMapCanvas'); if(!el) return;
    const start=()=>{
      if(!window.L || el.dataset.ready) return;
      el.dataset.ready='1';
      const map=L.map(el,{scrollWheelZoom:false,zoomControl:true});
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'© OpenStreetMap'}).addTo(map);
      const pts={tlv:[32.0853,34.7818],ny:[40.7128,-74.006],sea:[47.6062,-122.3321],rockies:[51.4254,-116.1773],glacier:[48.7596,-113.787],kona:[19.64,-155.99],maui:[20.79,-156.33],la:[34.0522,-118.2437]};
      const stops=[['Tel Aviv',pts.tlv],['New York',pts.ny],['Seattle',pts.sea],['Canadian Rockies',pts.rockies],['Glacier',pts.glacier],['Seattle',pts.sea],['Big Island',pts.kona],['Maui',pts.maui],['Los Angeles',pts.la],['Tel Aviv',pts.tlv]];
      stops.forEach(([name,p],i)=>L.marker(p,{icon:L.divIcon({className:'leaflet-div-icon',html:`<div class="journeyPin"><i>${i+1}</i></div>`,iconSize:[28,28],iconAnchor:[14,26]})}).addTo(map).bindTooltip(name));
      const flight={color:'#204f85',weight:3,dashArray:'8 8',opacity:.85},road={color:'#a84f32',weight:4,opacity:.9};
      L.polyline([pts.tlv,pts.ny,pts.sea],flight).addTo(map); L.polyline([pts.sea,pts.rockies,pts.glacier,pts.sea],road).addTo(map); L.polyline([pts.sea,pts.kona,pts.maui,pts.la,pts.tlv],flight).addTo(map);
      map.fitBounds(L.latLngBounds(Object.values(pts)),{padding:[28,28]});
    };
    if(window.L){start();return}
    if(!document.querySelector('link[data-leaflet]')){const c=document.createElement('link');c.rel='stylesheet';c.href='https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css';c.dataset.leaflet='1';document.head.appendChild(c)}
    const j=document.createElement('script');j.src='https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js';j.onload=start;document.head.appendChild(j);
  }

  function injectTransport(){
    const old=$('.transport'); if(!old || $('.transportMaster')) return;
    const airlines={
      elal:['https://www.elal.com/favicon.ico','EL AL'],
      united:['https://www.united.com/favicon.ico','United'],
      delta:['https://www.delta.com/favicon.ico','Delta'],
      hawaiian:['https://www.hawaiianairlines.com/favicon.ico','Hawaiian Airlines']
    };
    const legs=[
      ['elal','Tel Aviv','New York','פתיחת המסע'],
      ['united','New York','Seattle','המעבר לחוף המערבי'],
      ['delta','Seattle','Big Island','מהכבישים אל הוואי'],
      ['hawaiian','Big Island','Maui','הטיסה הקצרה בין האיים'],
      ['united','Maui','Los Angeles','הפרק האחרון בארצות הברית'],
      ['elal','Los Angeles','Tel Aviv','הדרך הביתה']
    ];
    const cars=[
      ['https://upload.wikimedia.org/wikipedia/commons/7/77/Suburban.jpg','01 · ROAD TRIP','Chevrolet Suburban','Seattle + Canadian Rockies','הרכב הגדול שליווה את פרק הכבישים הארוך דרך קנדה והרוקייז.'],
      ['https://upload.wikimedia.org/wikipedia/commons/1/1a/%2722_Nissan_Pathfinder.jpg','02 · BIG ISLAND','Nissan Pathfinder','Big Island · Dollar','הרכב של ביג איילנד, מקונה ועד הנסיעות הארוכות ברחבי האי.'],
      ['https://upload.wikimedia.org/wikipedia/commons/7/7d/%2721_Chevrolet_Tahoe.jpg','03 · MAUI','Chevrolet Tahoe','Maui · Avis','הרכב של מאווי, כולל Road to Hana והנסיעות ברחבי האי.'],
      ['https://upload.wikimedia.org/wikipedia/commons/a/a4/24_Chevrolet_Traverse_Z71.jpg','04 · LOS ANGELES','Chevrolet Traverse','Los Angeles','הרכב של הפרק האחרון בלוס אנג׳לס לפני החזרה הביתה.']
    ];
    const sec=document.createElement('section');sec.className='transportMaster';
    sec.innerHTML=`<div class="wrap"><div class="sectionhead"><h2>באוויר ועל הכביש</h2><p>שש טיסות, ארבע חברות תעופה וארבעה רכבים. במקום רשימה טכנית, הדרך עצמה הופכת לחלק מהסיפור של המסע.</p></div><div class="flightJourney"><div class="flightJourneyTop"><div><small>FLIGHT JOURNAL</small><h3>שש טיסות.<br>ארבע חברות.</h3></div><p>כך עברנו בין הפרקים של המסע, מהטיסה הבינלאומית הראשונה ועד הדרך הביתה.</p></div><div class="flightLegs">${legs.map(([a,from,to,note])=>{const [logo,name]=airlines[a];return `<article class="flightLeg"><div class="airBrand"><img src="${logo}" alt="${name}" onerror="this.style.display='none'"><strong>${name}</strong></div><div class="flightRoute">${from} → ${to}</div><span>${note}</span></article>`}).join('')}</div></div><div class="carsMaster"><div class="carsMasterHead"><h3>ארבעה רכבים. ארבעה פרקים.</h3><p>כל רכב מסמן שינוי אחר בקצב ובאופי של הדרך.</p></div><div class="carGridMaster">${cars.map(c=>`<article class="carMaster"><div class="carMasterMedia"><img src="${c[0]}" alt="${c[2]}" loading="lazy" referrerpolicy="no-referrer"></div><div class="carMasterBody"><small>${c[1]}</small><h4>${c[2]}</h4><p><strong>${c[3]}</strong><br>${c[4]}</p><p class="carMasterCredit">Representative model photo · Wikimedia Commons</p></div></article>`).join('')}</div></div></div>`;
    old.replaceWith(sec);
  }

  function esc(s){return s.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]))}
  function inline(s){return esc(s).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')}

  function appendMediaGroup(article, media){
    if(!media.length)return;
    if(media.length===1){article.appendChild(media[0]);return}
    const g=document.createElement('div');g.className='dayGallery';media.forEach(x=>g.appendChild(x));article.appendChild(g);
  }

  function renderSingleDay(md){
    const lines=md.split(/\r?\n/); const first=lines.findIndex(x=>/^#\s+/.test(x.trim())); if(first<0)return null;
    const heading=lines[first].trim().replace(/^#\s+/,''); const parts=heading.split('|').map(x=>x.trim());
    const art=document.createElement('article');art.className='dayMaster';
    const d=document.createElement('div');d.className='dateHead';d.textContent=parts[0];art.appendChild(d);
    const h=document.createElement('h1');h.className='dayTitle';h.textContent=parts.slice(1).join(' | ')||parts[0];art.appendChild(h);
    let media=[];
    const flush=()=>{appendMediaGroup(art,media);media=[]};
    for(const raw of lines.slice(first+1)){
      const line=raw.trim(); if(!line)continue;
      const im=line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if(im){const w=document.createElement('div');w.className='photo';const img=document.createElement('img');img.src=im[2]+(im[2].includes('?')?'&':'?')+'v='+VERSION;img.alt=im[1];img.loading='lazy';img.onload=()=>{if(img.naturalHeight>img.naturalWidth*1.2)w.classList.add('portrait')};w.appendChild(img);media.push(w);continue}
      flush(); let el;
      if(/^##\s+/.test(line)){el=document.createElement('h2');el.innerHTML=inline(line.replace(/^##\s+/,''))}
      else if(/^###\s+/.test(line)){el=document.createElement('h3');el.innerHTML=inline(line.replace(/^###\s+/,''))}
      else {el=document.createElement('p');el.innerHTML=inline(line)}
      art.appendChild(el);
    }
    flush(); return art;
  }

  function renderBase(md, root){
    const lines=md.split(/\r?\n/);let art=null,expectTitle=false,media=[];
    const flush=()=>{if(art){appendMediaGroup(art,media);media=[]}};
    const isDate=t=>/^(מוצאי שבת|יום (ראשון|שני|שלישי|רביעי|חמישי|שישי|שבת)|שבת)[, ]/.test(t)||/^\d{1,2}[\/.]\d{1,2}/.test(t);
    for(const raw of lines){const line=raw.trim();if(!line||/^\|/.test(line))continue;const clean=line.replace(/^\*\*|\*\*$/g,'').trim();if(isDate(clean)){flush();art=document.createElement('article');art.className='dayMaster';const d=document.createElement('div');d.className='dateHead';d.textContent=clean;art.appendChild(d);root.appendChild(art);expectTitle=true;continue}const im=line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);if(im&&art){const w=document.createElement('div');w.className='photo';const img=document.createElement('img');img.src=im[2]+(im[2].includes('?')?'&':'?')+'v='+VERSION;img.alt=im[1];img.loading='lazy';img.onload=()=>{if(img.naturalHeight>img.naturalWidth*1.2)w.classList.add('portrait')};w.appendChild(img);media.push(w);continue}if(!art)continue;flush();let el;if(expectTitle&&(/^\*\*.+\*\*$/.test(line)||/^#{1,3}\s/.test(line))){el=document.createElement('h1');el.className='dayTitle';el.innerHTML=inline(line.replace(/^#{1,3}\s*/,''));expectTitle=false}else if(/^##\s+/.test(line)){el=document.createElement('h2');el.innerHTML=inline(line.replace(/^##\s+/,''))}else if(/^###\s+/.test(line)){el=document.createElement('h3');el.innerHTML=inline(line.replace(/^###\s+/,''))}else{el=document.createElement('p');el.innerHTML=inline(clean)}art.appendChild(el)}flush();
  }

  async function rebuildJournal(){
    const root=$('#story'), loading=$('#loading'); if(!root)return;
    try{
      const files=['0408','0508','0608','0708','0808','0908','1008','1108','1208','1308','1408','1508','1608','1708'];
      const [main,...days]=await Promise.all([
        fetch(`/content/summer-2026.md?v=${VERSION}`).then(r=>r.ok?r.text():''),
        ...files.map(d=>fetch(`/content/day-${d}.md?v=${VERSION}`).then(r=>r.ok?r.text():''))
      ]);
      root.innerHTML=''; if(loading)loading.remove();
      const start=main.search(/\*\*מוצאי שבת,? 18 ביולי\*\*/); let base=start>=0?main.slice(start):main;
      const cut=base.search(/(?:^|\n)(?:\*\*)?(?:יום\s+[^\n]*[, ]\s*)?(?:4 באוגוסט|04[\/.]08)/m); if(cut>0)base=base.slice(0,cut);
      renderBase(base,root);
      days.forEach(md=>{if(!md)return;const a=renderSingleDay(md);if(a)root.appendChild(a)});
      if(location.hash){const target=$(location.hash);if(target)setTimeout(()=>target.scrollIntoView(),80)}
    }catch(e){console.error('Summer 2026 journal rebuild failed',e)}
  }

  function qa(){
    document.querySelectorAll('img').forEach(img=>{img.addEventListener('error',()=>{img.closest('.photo,.carMasterMedia')?.classList.add('imageError')},{once:true})});
    document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{const t=$(a.getAttribute('href'));if(!t)console.warn('Broken anchor',a.getAttribute('href'))}));
  }

  addStyles(); injectMap(); injectTransport(); rebuildJournal(); qa();
})();
