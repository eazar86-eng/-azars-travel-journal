(() => {
  const VERSION = '20260818cars11';
  const $ = (s, r = document) => r.querySelector(s);

  function addStyles() {
    if ($('#summer2026-master-styles')) return;
    const style = document.createElement('style');
    style.id = 'summer2026-master-styles';
    style.textContent = `
      .journeyMap{padding:0 0 58px}.journeyMapGrid{display:grid;grid-template-columns:1.35fr .65fr;gap:14px}.journeyMapCard,.journeyStops{background:var(--paper);border:1px solid var(--line);border-radius:26px;overflow:hidden}.journeyMapHead{padding:22px 24px 16px;display:flex;align-items:end;justify-content:space-between;gap:20px}.journeyMapHead h2{font-family:Georgia,"Times New Roman",serif;font-size:clamp(36px,5vw,54px);line-height:1;margin:0}.journeyMapHead p{margin:0;max-width:500px;color:var(--muted);line-height:1.65;font-size:14px}.journeyMapCanvas{height:430px;background:#dfe8e2}.journeyStops{padding:22px}.journeyStops small{display:block;color:var(--rust);font-weight:950;letter-spacing:.12em;margin-bottom:8px}.journeyStops h3{font-family:Georgia,"Times New Roman",serif;font-size:30px;margin:0 0 14px}.journeyStop{display:grid;grid-template-columns:32px 1fr;gap:10px;align-items:center;padding:11px 0;border-top:1px solid var(--line)}.journeyNo{width:30px;height:30px;border-radius:50%;background:var(--deep);color:#fff;display:grid;place-items:center;font-size:11px;font-weight:950}.leaflet-div-icon{background:transparent!important;border:0!important}.journeyPin{width:28px;height:28px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:#14251f;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.25);display:grid;place-items:center;color:#fff}.journeyPin i{font-style:normal;transform:rotate(45deg);font-size:10px;font-weight:950}
      .transportMaster{padding:4px 0 66px}.flightJourney{background:#111b27;color:#fff;border-radius:28px;padding:clamp(22px,4vw,36px)}.flightJourneyTop{display:flex;align-items:end;justify-content:space-between;gap:28px;margin-bottom:22px}.flightJourneyTop small{font-size:10px;font-weight:950;letter-spacing:.15em;color:#a9c2df}.flightJourneyTop h3{font-family:Georgia,"Times New Roman",serif;font-size:clamp(38px,5vw,58px);margin:8px 0 0;line-height:.98}.flightJourneyTop p{margin:0;max-width:510px;color:#d5dde6;line-height:1.7;font-size:14px}.flightLegs{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.flightLeg{background:#fff;color:#151515;border-radius:20px;padding:16px;min-height:155px;display:flex;flex-direction:column;justify-content:space-between}.airBrand{display:flex;align-items:center;gap:10px;direction:ltr}.airBrand img{width:116px;height:36px;object-fit:contain;object-position:left center;display:block}.airBrand strong{font-size:14px}.flightRoute{font-family:Georgia,"Times New Roman",serif;font-size:22px;direction:ltr;text-align:left;margin:14px 0 7px}.flightLeg span{font-size:12px;color:#6a655f;line-height:1.45}.carsMaster{margin-top:14px}.carsMasterHead{display:flex;align-items:end;justify-content:space-between;gap:20px;padding:18px 0}.carsMasterHead h3{font-family:Georgia,"Times New Roman",serif;font-size:clamp(34px,4vw,48px);margin:0}.carsMasterHead p{margin:0;color:var(--muted);max-width:560px;line-height:1.7}.carGridMaster{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.carMaster{background:var(--paper);border:1px solid var(--line);border-radius:22px;overflow:hidden}.carMasterMedia{height:190px;background:#e8e3da;overflow:hidden}.carMasterMedia img{width:100%;height:100%;object-fit:cover;display:block}.carMasterBody{padding:15px}.carMasterBody small{color:var(--rust);font-weight:950;letter-spacing:.08em}.carMasterBody h4{font-family:Georgia,"Times New Roman",serif;font-size:22px;margin:6px 0}.carMasterBody p{font-size:12.5px;line-height:1.55;color:#5b554d;margin:0}.carMasterCredit{font-size:9px!important;color:#9a9288!important;margin-top:8px!important;direction:ltr;text-align:left}
      .dayMaster{background:var(--paper);border:1px solid var(--line);border-radius:24px;padding:clamp(22px,4vw,34px);margin-bottom:18px;box-shadow:0 12px 34px rgba(52,43,32,.045)}.dayMaster .dateHead{font-size:12px;color:var(--rust);font-weight:950;margin-bottom:8px}.dayMaster .dayTitle{font-family:Georgia,"Times New Roman",serif;font-size:clamp(31px,5vw,45px);line-height:1.08;margin:0 0 20px}.dayMaster p{font-size:17px;line-height:1.86;color:#3f3b36;margin:0 0 18px}.dayMaster h2{font-size:25px;margin:29px 0 11px}.dayMaster h3{font-size:21px;margin:25px 0 10px}.storyPhoto{margin:32px 0 36px}.storyPhoto img,.dayGallery img{display:block;width:100%;height:auto;max-height:720px;object-fit:cover;border-radius:18px}.storyPhoto.portrait img,.dayGallery .portrait img{object-fit:contain;background:#ece7df}.dayGallery{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin:32px 0 36px}.dayGallery .photo{margin:0;min-width:0}.dayGallery .photo:nth-child(3):last-child{grid-column:1/-1}.dayGallery .photo:nth-child(5):last-child{grid-column:1/-1}.editorialQuote{margin:58px -8% 62px;padding:34px 8%;border-top:1px solid var(--line);border-bottom:1px solid var(--line);text-align:center}.editorialQuote:before{content:'“';display:block;font-family:Georgia,"Times New Roman",serif;font-size:68px;line-height:.7;color:var(--rust);margin-bottom:12px}.editorialQuote p{font-family:Georgia,"Times New Roman",serif!important;font-size:clamp(28px,4.5vw,46px)!important;line-height:1.35!important;color:var(--ink)!important;margin:0!important}.editorialQuote small{display:block;margin-top:15px;color:var(--rust);font-size:10px;font-weight:950;letter-spacing:.14em}.imageError{display:none!important}
      @media(max-width:900px){.journeyMapGrid{grid-template-columns:1fr}.journeyMapCanvas{height:360px}.flightLegs{grid-template-columns:repeat(2,1fr)}.carGridMaster{grid-template-columns:repeat(2,1fr)}}
      @media(max-width:650px){.journeyMapHead,.flightJourneyTop,.carsMasterHead{display:block}.journeyMapHead p,.flightJourneyTop p,.carsMasterHead p{margin-top:12px}.journeyMapCanvas{height:330px}.flightLegs{grid-template-columns:1fr}.carGridMaster{grid-template-columns:1fr 1fr}.dayGallery{grid-template-columns:1fr}.dayGallery .photo:nth-child(3):last-child,.dayGallery .photo:nth-child(5):last-child{grid-column:auto}.editorialQuote{margin:44px 0 48px;padding:28px 4px}.editorialQuote p{font-size:30px!important}.dayMaster{padding:20px 16px}.dayMaster p{font-size:16.5px}}
      @media(max-width:430px){.carGridMaster{grid-template-columns:1fr}.carMasterMedia{height:210px}.flightJourney{border-radius:20px}.journeyMapCard,.journeyStops{border-radius:20px}}
    `;
    document.head.appendChild(style);
  }

  function injectMap() {
    if ($('#journey-map')) return;
    const route = $('.route');
    if (!route) return;
    const names = ['תל אביב','ניו יורק','סיאטל','הרוקייז הקנדיים','גליישר','סיאטל','ביג איילנד','מאווי','לוס אנג׳לס','תל אביב'];
    const section = document.createElement('section');
    section.className = 'journeyMap';
    section.id = 'journey-map';
    section.innerHTML = `<div class="wrap journeyMapGrid"><div class="journeyMapCard"><div class="journeyMapHead"><div><h2>המפה של המסע</h2></div><p>מהמזרח למערב, דרך קנדה, שני איים בהוואי ועד לוס אנג׳לס.</p></div><div id="journeyMapCanvas" class="journeyMapCanvas"></div></div><aside class="journeyStops"><small>THE ROUTE</small><h3>כל התחנות</h3>${names.map((x,i)=>`<div class="journeyStop"><div class="journeyNo">${i+1}</div><b>${x}</b></div>`).join('')}</aside></div>`;
    route.insertAdjacentElement('afterend', section);
    loadMap();
  }

  function loadMap() {
    const el = $('#journeyMapCanvas');
    if (!el) return;
    const start = () => {
      if (!window.L || el.dataset.ready) return;
      el.dataset.ready = '1';
      const map = L.map(el,{scrollWheelZoom:false,zoomControl:true});
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'© OpenStreetMap'}).addTo(map);
      const p={tlv:[32.0853,34.7818],ny:[40.7128,-74.006],sea:[47.6062,-122.3321],rockies:[51.4254,-116.1773],glacier:[48.7596,-113.787],kona:[19.64,-155.99],maui:[20.79,-156.33],la:[34.0522,-118.2437]};
      const stops=[p.tlv,p.ny,p.sea,p.rockies,p.glacier,p.sea,p.kona,p.maui,p.la,p.tlv];
      stops.forEach((x,i)=>L.marker(x,{icon:L.divIcon({className:'leaflet-div-icon',html:`<div class="journeyPin"><i>${i+1}</i></div>`,iconSize:[28,28],iconAnchor:[14,26]})}).addTo(map));
      L.polyline([p.tlv,p.ny,p.sea],{color:'#204f85',weight:3,dashArray:'8 8',opacity:.85}).addTo(map);
      L.polyline([p.sea,p.rockies,p.glacier,p.sea],{color:'#a84f32',weight:4,opacity:.9}).addTo(map);
      L.polyline([p.sea,p.kona,p.maui,p.la,p.tlv],{color:'#204f85',weight:3,dashArray:'8 8',opacity:.85}).addTo(map);
      map.fitBounds(L.latLngBounds(Object.values(p)),{padding:[28,28]});
    };
    if (window.L) return start();
    if (!document.querySelector('link[data-leaflet]')) {
      const css=document.createElement('link');css.rel='stylesheet';css.href='https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css';css.dataset.leaflet='1';document.head.appendChild(css);
    }
    const js=document.createElement('script');js.src='https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js';js.onload=start;document.head.appendChild(js);
  }

  function injectTransport() {
    const old = $('.transport');
    if (!old || $('.transportMaster')) return;
    const airlines={
      elal:['/assets/transport/airlines/elal.svg','EL AL'],
      united:['/assets/transport/airlines/united.svg','United'],
      delta:['/assets/transport/airlines/delta.svg','Delta'],
      hawaiian:['/assets/transport/airlines/hawaiian.svg','Hawaiian Airlines']
    };
    const legs=[
      ['elal','Tel Aviv','New York','פתיחת המסע'],
      ['united','New York','Seattle','המעבר לחוף המערבי'],
      ['delta','Seattle','Big Island','מהכבישים אל הוואי'],
      ['hawaiian','Big Island','Maui','הטיסה בין האיים'],
      ['united','Maui','Los Angeles','הפרק האחרון בארצות הברית'],
      ['elal','Los Angeles','Tel Aviv','הדרך הביתה']
    ];
    const cars=[
      {photo:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5MDAiIGhlaWdodD0iNTIwIiB2aWV3Qm94PSIwIDAgOTAwIDUyMCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJDaGV2cm9sZXQgU3VidXJiYW4iPjxyZWN0IHdpZHRoPSI5MDAiIGhlaWdodD0iNTIwIiBmaWxsPSIjZTllM2Q5Ii8+PHBhdGggZD0iTTEyNSAzMzBjMTgtODQgNDktMTM5IDEwMS0xNjkgNjItMzUgMTU5LTQ0IDI5Mi00MiA4MyAxIDE0MyAxNCAxOTMgNDIgNDUgMjUgNzUgNjIgOTIgMTEzbDE5IDU2SDEyNXoiIGZpbGw9IiMxZTI5MzMiLz48cGF0aCBkPSJNMjQ1IDE3NmgyNzVjNjEgMCAxMDUgMTIgMTQzIDM3bDUyIDY2SDE5MGw1NS0xMDN6IiBmaWxsPSIjYjljY2Q3Ii8+PHBhdGggZD0iTTI0NiAxOTBsLTM2IDc1aDE3MHYtNzVIMjQ2em0xNTIgMHY3NWgyNjVsLTQ0LTUzYy0yOC0xNS02My0yMi0xMDUtMjJIMzk4eiIgZmlsbD0iIzMzNDk1NiIgb3BhY2l0eT0iLjkiLz48cmVjdCB4PSIxMjkiIHk9IjMxNCIgd2lkdGg9IjY4NyIgaGVpZ2h0PSI1MyIgcng9IjE4IiBmaWxsPSIjMTQyMDJhIi8+PGNpcmNsZSBjeD0iMjU1IiBjeT0iMzY4IiByPSI2NiIgZmlsbD0iIzI2MjYyNiIvPjxjaXJjbGUgY3g9IjI1NSIgY3k9IjM2OCIgcj0iMzUiIGZpbGw9IiNhZWI0YjgiLz48Y2lyY2xlIGN4PSI2ODEiIGN5PSIzNjgiIHI9IjY2IiBmaWxsPSIjMjYyNjI2Ii8+PGNpcmNsZSBjeD0iNjgxIiBjeT0iMzY4IiByPSIzNSIgZmlsbD0iI2FlYjRiOCIvPjx0ZXh0IHg9IjQ1MCIgeT0iNDYyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0MiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzE3MjQxZiI+Q2hldnJvbGV0IFN1YnVyYmFuPC90ZXh0Pjwvc3ZnPg==',fallback:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5MDAiIGhlaWdodD0iNTIwIiB2aWV3Qm94PSIwIDAgOTAwIDUyMCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJDaGV2cm9sZXQgU3VidXJiYW4iPjxyZWN0IHdpZHRoPSI5MDAiIGhlaWdodD0iNTIwIiBmaWxsPSIjZTllM2Q5Ii8+PHBhdGggZD0iTTEyNSAzMzBjMTgtODQgNDktMTM5IDEwMS0xNjkgNjItMzUgMTU5LTQ0IDI5Mi00MiA4MyAxIDE0MyAxNCAxOTMgNDIgNDUgMjUgNzUgNjIgOTIgMTEzbDE5IDU2SDEyNXoiIGZpbGw9IiMxZTI5MzMiLz48cGF0aCBkPSJNMjQ1IDE3NmgyNzVjNjEgMCAxMDUgMTIgMTQzIDM3bDUyIDY2SDE5MGw1NS0xMDN6IiBmaWxsPSIjYjljY2Q3Ii8+PHBhdGggZD0iTTI0NiAxOTBsLTM2IDc1aDE3MHYtNzVIMjQ2em0xNTIgMHY3NWgyNjVsLTQ0LTUzYy0yOC0xNS02My0yMi0xMDUtMjJIMzk4eiIgZmlsbD0iIzMzNDk1NiIgb3BhY2l0eT0iLjkiLz48cmVjdCB4PSIxMjkiIHk9IjMxNCIgd2lkdGg9IjY4NyIgaGVpZ2h0PSI1MyIgcng9IjE4IiBmaWxsPSIjMTQyMDJhIi8+PGNpcmNsZSBjeD0iMjU1IiBjeT0iMzY4IiByPSI2NiIgZmlsbD0iIzI2MjYyNiIvPjxjaXJjbGUgY3g9IjI1NSIgY3k9IjM2OCIgcj0iMzUiIGZpbGw9IiNhZWI0YjgiLz48Y2lyY2xlIGN4PSI2ODEiIGN5PSIzNjgiIHI9IjY2IiBmaWxsPSIjMjYyNjI2Ii8+PGNpcmNsZSBjeD0iNjgxIiBjeT0iMzY4IiByPSIzNSIgZmlsbD0iI2FlYjRiOCIvPjx0ZXh0IHg9IjQ1MCIgeT0iNDYyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0MiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzE3MjQxZiI+Q2hldnJvbGV0IFN1YnVyYmFuPC90ZXh0Pjwvc3ZnPg==',name:'Chevrolet Suburban',place:'Seattle + Canadian Rockies',note:'הרכב הגדול של פרק הכבישים הארוך דרך קנדה והרוקייז.'},
      {photo:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5MDAiIGhlaWdodD0iNTIwIiB2aWV3Qm94PSIwIDAgOTAwIDUyMCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJOaXNzYW4gUGF0aGZpbmRlciI+PHJlY3Qgd2lkdGg9IjkwMCIgaGVpZ2h0PSI1MjAiIGZpbGw9IiNlY2U3ZGYiLz48cGF0aCBkPSJNMTM3IDMyOWMxNS03NyA0OS0xMzAgMTAzLTE2MCA1OS0zMyAxNDgtNDIgMjcwLTQwIDk1IDEgMTYzIDE3IDIxMyA1MSAzOCAyNiA2MiA1OSA3OCAxMDRsMTcgNDVIMTM3eiIgZmlsbD0iIzQ2NTE1OCIvPjxwYXRoIGQ9Ik0yNTEgMTgxaDI2OWM2OSAwIDExOCAxNSAxNTkgNDdsMzggNDdIMTk4bDUzLTk0eiIgZmlsbD0iI2MxZDFkOCIvPjxwYXRoIGQ9Ik0yNTQgMTk0bC0zOSA2OWgxNjd2LTY5SDI1NHptMTQ3IDB2NjloMjc3bC0zNS00MGMtMzItMjAtNzItMjktMTI2LTI5SDQwMXoiIGZpbGw9IiM1OTcxN2IiIG9wYWNpdHk9Ii45MiIvPjxyZWN0IHg9IjEzOSIgeT0iMzExIiB3aWR0aD0iNjc4IiBoZWlnaHQ9IjU3IiByeD0iMTgiIGZpbGw9IiMzOTQzNGEiLz48Y2lyY2xlIGN4PSIyNzAiIGN5PSIzNjgiIHI9IjYzIiBmaWxsPSIjMjcyNzI3Ii8+PGNpcmNsZSBjeD0iMjcwIiBjeT0iMzY4IiByPSIzNCIgZmlsbD0iI2JiYzBjMyIvPjxjaXJjbGUgY3g9IjY3NiIgY3k9IjM2OCIgcj0iNjMiIGZpbGw9IiMyNzI3MjciLz48Y2lyY2xlIGN4PSI2NzYiIGN5PSIzNjgiIHI9IjM0IiBmaWxsPSIjYmJjMGMzIi8+PHRleHQgeD0iNDUwIiB5PSI0NjIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJBcmlhbCxzYW5zLXNlcmlmIiBmb250LXNpemU9IjQyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMTcyNDFmIj5OaXNzYW4gUGF0aGZpbmRlcjwvdGV4dD48L3N2Zz4=',fallback:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5MDAiIGhlaWdodD0iNTIwIiB2aWV3Qm94PSIwIDAgOTAwIDUyMCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJOaXNzYW4gUGF0aGZpbmRlciI+PHJlY3Qgd2lkdGg9IjkwMCIgaGVpZ2h0PSI1MjAiIGZpbGw9IiNlY2U3ZGYiLz48cGF0aCBkPSJNMTM3IDMyOWMxNS03NyA0OS0xMzAgMTAzLTE2MCA1OS0zMyAxNDgtNDIgMjcwLTQwIDk1IDEgMTYzIDE3IDIxMyA1MSAzOCAyNiA2MiA1OSA3OCAxMDRsMTcgNDVIMTM3eiIgZmlsbD0iIzQ2NTE1OCIvPjxwYXRoIGQ9Ik0yNTEgMTgxaDI2OWM2OSAwIDExOCAxNSAxNTkgNDdsMzggNDdIMTk4bDUzLTk0eiIgZmlsbD0iI2MxZDFkOCIvPjxwYXRoIGQ9Ik0yNTQgMTk0bC0zOSA2OWgxNjd2LTY5SDI1NHptMTQ3IDB2NjloMjc3bC0zNS00MGMtMzItMjAtNzItMjktMTI2LTI5SDQwMXoiIGZpbGw9IiM1OTcxN2IiIG9wYWNpdHk9Ii45MiIvPjxyZWN0IHg9IjEzOSIgeT0iMzExIiB3aWR0aD0iNjc4IiBoZWlnaHQ9IjU3IiByeD0iMTgiIGZpbGw9IiMzOTQzNGEiLz48Y2lyY2xlIGN4PSIyNzAiIGN5PSIzNjgiIHI9IjYzIiBmaWxsPSIjMjcyNzI3Ii8+PGNpcmNsZSBjeD0iMjcwIiBjeT0iMzY4IiByPSIzNCIgZmlsbD0iI2JiYzBjMyIvPjxjaXJjbGUgY3g9IjY3NiIgY3k9IjM2OCIgcj0iNjMiIGZpbGw9IiMyNzI3MjciLz48Y2lyY2xlIGN4PSI2NzYiIGN5PSIzNjgiIHI9IjM0IiBmaWxsPSIjYmJjMGMzIi8+PHRleHQgeD0iNDUwIiB5PSI0NjIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJBcmlhbCxzYW5zLXNlcmlmIiBmb250LXNpemU9IjQyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMTcyNDFmIj5OaXNzYW4gUGF0aGZpbmRlcjwvdGV4dD48L3N2Zz4=',name:'Nissan Pathfinder',place:'Big Island',note:'הרכב של ביג איילנד, מקונה ועד הנסיעות הארוכות ברחבי האי.'},
      {photo:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5MDAiIGhlaWdodD0iNTIwIiB2aWV3Qm94PSIwIDAgOTAwIDUyMCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJDaGV2cm9sZXQgVGFob2UiPjxyZWN0IHdpZHRoPSI5MDAiIGhlaWdodD0iNTIwIiBmaWxsPSIjZThlM2RhIi8+PHBhdGggZD0iTTEyOSAzMjljMTctODAgNTAtMTM1IDEwMi0xNjUgNjEtMzUgMTU0LTQzIDI4Mi00MSA4OCAxIDE1MyAxNiAyMDIgNDcgNDMgMjggNzAgNjUgODcgMTEzbDE3IDQ2SDEyOXoiIGZpbGw9IiNkOWRiZGQiIHN0cm9rZT0iIzljYTFhNSIgc3Ryb2tlLXdpZHRoPSI0Ii8+PHBhdGggZD0iTTI0OSAxNzhoMjcxYzY0IDAgMTEyIDE0IDE1MSA0M2w0NSA1NUgxOTVsNTQtOTh6IiBmaWxsPSIjYWVjMmNkIi8+PHBhdGggZD0iTTI1MiAxOTNsLTM5IDcwaDE3MXYtNzBIMjUyem0xNTEgMHY3MGgyNzRsLTM5LTQ2Yy0zMC0xNy02OS0yNC0xMTktMjRINDAzeiIgZmlsbD0iIzUyNjg3MyIgb3BhY2l0eT0iLjkiLz48cmVjdCB4PSIxMzEiIHk9IjMxMiIgd2lkdGg9IjY4NiIgaGVpZ2h0PSI1NiIgcng9IjE4IiBmaWxsPSIjYzljYmNkIi8+PGNpcmNsZSBjeD0iMjYwIiBjeT0iMzY5IiByPSI2NCIgZmlsbD0iIzI4MjgyOCIvPjxjaXJjbGUgY3g9IjI2MCIgY3k9IjM2OSIgcj0iMzUiIGZpbGw9IiNhZWI0YjgiLz48Y2lyY2xlIGN4PSI2ODQiIGN5PSIzNjkiIHI9IjY0IiBmaWxsPSIjMjgyODI4Ii8+PGNpcmNsZSBjeD0iNjg0IiBjeT0iMzY5IiByPSIzNSIgZmlsbD0iI2FlYjRiOCIvPjx0ZXh0IHg9IjQ1MCIgeT0iNDYyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0MiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzE3MjQxZiI+Q2hldnJvbGV0IFRhaG9lPC90ZXh0Pjwvc3ZnPg==',fallback:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5MDAiIGhlaWdodD0iNTIwIiB2aWV3Qm94PSIwIDAgOTAwIDUyMCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJDaGV2cm9sZXQgVGFob2UiPjxyZWN0IHdpZHRoPSI5MDAiIGhlaWdodD0iNTIwIiBmaWxsPSIjZThlM2RhIi8+PHBhdGggZD0iTTEyOSAzMjljMTctODAgNTAtMTM1IDEwMi0xNjUgNjEtMzUgMTU0LTQzIDI4Mi00MSA4OCAxIDE1MyAxNiAyMDIgNDcgNDMgMjggNzAgNjUgODcgMTEzbDE3IDQ2SDEyOXoiIGZpbGw9IiNkOWRiZGQiIHN0cm9rZT0iIzljYTFhNSIgc3Ryb2tlLXdpZHRoPSI0Ii8+PHBhdGggZD0iTTI0OSAxNzhoMjcxYzY0IDAgMTEyIDE0IDE1MSA0M2w0NSA1NUgxOTVsNTQtOTh6IiBmaWxsPSIjYWVjMmNkIi8+PHBhdGggZD0iTTI1MiAxOTNsLTM5IDcwaDE3MXYtNzBIMjUyem0xNTEgMHY3MGgyNzRsLTM5LTQ2Yy0zMC0xNy02OS0yNC0xMTktMjRINDAzeiIgZmlsbD0iIzUyNjg3MyIgb3BhY2l0eT0iLjkiLz48cmVjdCB4PSIxMzEiIHk9IjMxMiIgd2lkdGg9IjY4NiIgaGVpZ2h0PSI1NiIgcng9IjE4IiBmaWxsPSIjYzljYmNkIi8+PGNpcmNsZSBjeD0iMjYwIiBjeT0iMzY5IiByPSI2NCIgZmlsbD0iIzI4MjgyOCIvPjxjaXJjbGUgY3g9IjI2MCIgY3k9IjM2OSIgcj0iMzUiIGZpbGw9IiNhZWI0YjgiLz48Y2lyY2xlIGN4PSI2ODQiIGN5PSIzNjkiIHI9IjY0IiBmaWxsPSIjMjgyODI4Ii8+PGNpcmNsZSBjeD0iNjg0IiBjeT0iMzY5IiByPSIzNSIgZmlsbD0iI2FlYjRiOCIvPjx0ZXh0IHg9IjQ1MCIgeT0iNDYyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0MiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzE3MjQxZiI+Q2hldnJvbGV0IFRhaG9lPC90ZXh0Pjwvc3ZnPg==',name:'Chevrolet Tahoe',place:'Maui',note:'הרכב של מאווי, כולל Road to Hana והנסיעות ברחבי האי.'},
      {photo:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5MDAiIGhlaWdodD0iNTIwIiB2aWV3Qm94PSIwIDAgOTAwIDUyMCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJDaGV2cm9sZXQgVHJhdmVyc2UiPjxyZWN0IHdpZHRoPSI5MDAiIGhlaWdodD0iNTIwIiBmaWxsPSIjZWJlNWRjIi8+PHBhdGggZD0iTTE0MiAzMjljMTctNzYgNTEtMTI3IDEwNC0xNTYgNTgtMzEgMTQ0LTM5IDI2MC0zOCA5NiAxIDE2NSAxNyAyMTQgNDkgMzggMjUgNjMgNTggODAgMTAwbDE4IDQ1SDE0MnoiIGZpbGw9IiM2OTczN2EiLz48cGF0aCBkPSJNMjYwIDE4NGgyNTRjNzEgMCAxMjEgMTQgMTYwIDQzbDQyIDUwSDIwN2w1My05M3oiIGZpbGw9IiNiOGNiZDQiLz48cGF0aCBkPSJNMjYyIDE5N2wtMzcgNjdoMTY0di02N0gyNjJ6bTE0NiAwdjY3aDI3MGwtMzctNDJjLTMxLTE3LTcyLTI1LTEyNC0yNUg0MDh6IiBmaWxsPSIjNTM2YTc1IiBvcGFjaXR5PSIuOTIiLz48cmVjdCB4PSIxNDMiIHk9IjMxMyIgd2lkdGg9IjY3NCIgaGVpZ2h0PSI1NSIgcng9IjE4IiBmaWxsPSIjNTA1OTVmIi8+PGNpcmNsZSBjeD0iMjczIiBjeT0iMzY5IiByPSI2MiIgZmlsbD0iIzI3MjcyNyIvPjxjaXJjbGUgY3g9IjI3MyIgY3k9IjM2OSIgcj0iMzQiIGZpbGw9IiNiM2I4YmIiLz48Y2lyY2xlIGN4PSI2NzUiIGN5PSIzNjkiIHI9IjYyIiBmaWxsPSIjMjcyNzI3Ii8+PGNpcmNsZSBjeD0iNjc1IiBjeT0iMzY5IiByPSIzNCIgZmlsbD0iI2IzYjhiYiIvPjx0ZXh0IHg9IjQ1MCIgeT0iNDYyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0MiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzE3MjQxZiI+Q2hldnJvbGV0IFRyYXZlcnNlPC90ZXh0Pjwvc3ZnPg==',fallback:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5MDAiIGhlaWdodD0iNTIwIiB2aWV3Qm94PSIwIDAgOTAwIDUyMCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJDaGV2cm9sZXQgVHJhdmVyc2UiPjxyZWN0IHdpZHRoPSI5MDAiIGhlaWdodD0iNTIwIiBmaWxsPSIjZWJlNWRjIi8+PHBhdGggZD0iTTE0MiAzMjljMTctNzYgNTEtMTI3IDEwNC0xNTYgNTgtMzEgMTQ0LTM5IDI2MC0zOCA5NiAxIDE2NSAxNyAyMTQgNDkgMzggMjUgNjMgNTggODAgMTAwbDE4IDQ1SDE0MnoiIGZpbGw9IiM2OTczN2EiLz48cGF0aCBkPSJNMjYwIDE4NGgyNTRjNzEgMCAxMjEgMTQgMTYwIDQzbDQyIDUwSDIwN2w1My05M3oiIGZpbGw9IiNiOGNiZDQiLz48cGF0aCBkPSJNMjYyIDE5N2wtMzcgNjdoMTY0di02N0gyNjJ6bTE0NiAwdjY3aDI3MGwtMzctNDJjLTMxLTE3LTcyLTI1LTEyNC0yNUg0MDh6IiBmaWxsPSIjNTM2YTc1IiBvcGFjaXR5PSIuOTIiLz48cmVjdCB4PSIxNDMiIHk9IjMxMyIgd2lkdGg9IjY3NCIgaGVpZ2h0PSI1NSIgcng9IjE4IiBmaWxsPSIjNTA1OTVmIi8+PGNpcmNsZSBjeD0iMjczIiBjeT0iMzY5IiByPSI2MiIgZmlsbD0iIzI3MjcyNyIvPjxjaXJjbGUgY3g9IjI3MyIgY3k9IjM2OSIgcj0iMzQiIGZpbGw9IiNiM2I4YmIiLz48Y2lyY2xlIGN4PSI2NzUiIGN5PSIzNjkiIHI9IjYyIiBmaWxsPSIjMjcyNzI3Ii8+PGNpcmNsZSBjeD0iNjc1IiBjeT0iMzY5IiByPSIzNCIgZmlsbD0iI2IzYjhiYiIvPjx0ZXh0IHg9IjQ1MCIgeT0iNDYyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0MiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzE3MjQxZiI+Q2hldnJvbGV0IFRyYXZlcnNlPC90ZXh0Pjwvc3ZnPg==',name:'Chevrolet Traverse',place:'Los Angeles',note:'הרכב של הפרק האחרון בלוס אנג׳לס לפני הדרך הביתה.'}
    ];
    const section=document.createElement('section');
    section.className='transportMaster';
    section.innerHTML=`<div class="wrap"><div class="sectionhead"><h2>באוויר ועל הכביש</h2><p>שש טיסות, ארבע חברות תעופה וארבעה רכבים. הדרך עצמה היא חלק מהסיפור.</p></div><div class="flightJourney"><div class="flightJourneyTop"><div><small>FLIGHT JOURNAL</small><h3>שש טיסות.<br>ארבע חברות.</h3></div><p>רצף הטיסות המלא, מהיציאה מישראל ועד החזרה הביתה.</p></div><div class="flightLegs">${legs.map(([a,from,to,note])=>`<article class="flightLeg"><div class="airBrand"><img src="${airlines[a][0]}" alt="${airlines[a][1]}"><strong>${airlines[a][1]}</strong></div><div class="flightRoute">${from} → ${to}</div><span>${note}</span></article>`).join('')}</div></div><div class="carsMaster"><div class="carsMasterHead"><h3>ארבעה רכבים. ארבעה פרקים.</h3><p>כל רכב מסמן שינוי אחר בקצב ובאופי של הדרך.</p></div><div class="carGridMaster">${cars.map((c,i)=>`<article class="carMaster"><div class="carMasterMedia"><img src="${c.photo}" data-fallback="${c.fallback}" alt="${c.name}" loading="lazy"></div><div class="carMasterBody"><small>0${i+1}</small><h4>${c.name}</h4><p><strong>${c.place}</strong><br>${c.note}</p><p class="carMasterCredit">Representative model visual</p></div></article>`).join('')}</div></div></div>`;
    old.replaceWith(section);
    section.querySelectorAll('.carMasterMedia img').forEach(img=>img.addEventListener('error',()=>{
      const fallback=img.dataset.fallback;
      if(fallback && img.src.indexOf(fallback)===-1){img.src=fallback;return}
      img.closest('.carMasterMedia')?.classList.add('imageError');
    }));
  }

  const esc=s=>s.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
  const inline=s=>esc(s).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');

  function anchorFor(t) {
    const x=t.replace(/\s+/g,' ').trim();
    const m=x.match(/(?:^|\D)(\d{1,2})[\/.](\d{1,2})(?:\D|$)/);
    if(m)return `day-${String(m[1]).padStart(2,'0')}${String(m[2]).padStart(2,'0')}`;
    if(/18 ביולי/.test(x))return'day-1807';
    if(/19 ביולי/.test(x))return'day-1907';
    if(/22 ביולי|סיאטל/.test(x))return'seattle';
    if(/23 ביולי|רוקייז/.test(x))return'rockies';
    if(/30 ביולי|גליישר/.test(x))return'glacier';
    if(/4 באוגוסט/.test(x))return'hawaii';
    return'';
  }

  function parseHeading(h) {
    const parts=h.split('|').map(x=>x.trim());
    if(parts.length>1)return{date:parts[0],title:parts.slice(1).join(' | ')};
    const m=h.match(/^(\d{1,2}[\/.]\d{1,2})\s+(.*)$/);
    return m?{date:m[1],title:m[2]}:{date:h,title:h};
  }

  function makePhoto(im) {
    const wrap=document.createElement('div');wrap.className='photo';
    const img=document.createElement('img');img.src=im[2]+(im[2].includes('?')?'&':'?')+'v='+VERSION;img.alt='';img.loading='lazy';
    img.onload=()=>{if(img.naturalHeight>img.naturalWidth*1.2)wrap.classList.add('portrait')};
    img.onerror=()=>{wrap.classList.add('imageError');wrap.remove()};
    wrap.appendChild(img);return wrap;
  }

  function distributeMedia(article, media) {
    if(!media.length)return;
    const all=[...article.querySelectorAll(':scope > p,:scope > h2,:scope > h3')];
    if(!all.length){
      const box=document.createElement('div');box.className='dayGallery';media.forEach(x=>box.appendChild(x));
      (article.querySelector('.dayTitle')||article.firstElementChild).insertAdjacentElement('afterend',box);return;
    }
    const anchors=all.length>3?all.slice(0,-1):all;
    const groupCount=Math.max(1,Math.min(Math.ceil(media.length/2),anchors.length));
    const groups=[];
    for(let i=0;i<groupCount;i++){
      const from=Math.floor(i*media.length/groupCount);
      const to=Math.floor((i+1)*media.length/groupCount);
      groups.push(media.slice(from,to));
    }
    let previous=-1;
    groups.forEach((group,i)=>{
      let idx=Math.floor(((i+1)*anchors.length)/(groupCount+1));
      idx=Math.max(previous+1,Math.min(idx,anchors.length-1));
      if(idx>=anchors.length)idx=anchors.length-1;
      previous=idx;
      let node;
      if(group.length===1){node=group[0];node.classList.add('storyPhoto')}
      else{node=document.createElement('div');node.className='dayGallery';group.forEach(x=>node.appendChild(x))}
      anchors[idx].insertAdjacentElement('afterend',node);
    });
  }

  function renderSingleDay(md) {
    const lines=md.split(/\r?\n/);
    const first=lines.findIndex(x=>/^#\s+/.test(x.trim()));
    if(first<0)return null;
    const parsed=parseHeading(lines[first].trim().replace(/^#\s+/,''));
    const article=document.createElement('article');article.className='dayMaster';
    const id=anchorFor(parsed.date);if(id)article.id=id;
    article.innerHTML=`<div class="dateHead">${esc(parsed.date)}</div><h1 class="dayTitle">${esc(parsed.title)}</h1>`;
    const media=[];
    for(const raw of lines.slice(first+1)){
      const line=raw.trim();if(!line||/^<!--[\s\S]*-->$/.test(line)||/^\s*(?:TODO|DEBUG|PLACEHOLDER)\b/i.test(line))continue;
      const im=line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if(im){media.push(makePhoto(im));continue}
      let el;
      if(/^##\s+/.test(line)){el=document.createElement('h2');el.innerHTML=inline(line.replace(/^##\s+/,''))}
      else if(/^###\s+/.test(line)){el=document.createElement('h3');el.innerHTML=inline(line.replace(/^###\s+/,''))}
      else{el=document.createElement('p');el.innerHTML=inline(line)}
      article.appendChild(el);
    }
    distributeMedia(article,media);
    return article;
  }

  function renderBase(md, root) {
    const lines=md.split(/\r?\n/);
    let article=null,media=[],expectTitle=false;
    const isDate=t=>/^(מוצאי שבת|יום (ראשון|שני|שלישי|רביעי|חמישי|שישי|שבת)|שבת)[, ]/.test(t)||/^\d{1,2}[\/.]\d{1,2}/.test(t);
    const finish=()=>{if(article){distributeMedia(article,media);media=[]}};
    for(const raw of lines){
      const line=raw.trim();if(!line||/^\|/.test(line)||/^<!--[\s\S]*-->$/.test(line)||/^\s*(?:TODO|DEBUG|PLACEHOLDER)\b/i.test(line))continue;
      const clean=line.replace(/^\*\*|\*\*$/g,'').trim();
      if(isDate(clean)){
        finish();article=document.createElement('article');article.className='dayMaster';
        const id=anchorFor(clean);if(id)article.id=id;
        article.innerHTML=`<div class="dateHead">${esc(clean)}</div>`;root.appendChild(article);expectTitle=true;continue;
      }
      const im=line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if(im&&article){media.push(makePhoto(im));continue}
      if(!article)continue;
      let el;
      if(expectTitle&&(/^\*\*.+\*\*$/.test(line)||/^#{1,3}\s/.test(line))){el=document.createElement('h1');el.className='dayTitle';el.innerHTML=inline(line.replace(/^#{1,3}\s*/,''));expectTitle=false}
      else if(/^##\s+/.test(line)){el=document.createElement('h2');el.innerHTML=inline(line.replace(/^##\s+/,''))}
      else if(/^###\s+/.test(line)){el=document.createElement('h3');el.innerHTML=inline(line.replace(/^###\s+/,''))}
      else{el=document.createElement('p');el.innerHTML=inline(clean);expectTitle=false}
      article.appendChild(el);
    }
    finish();
  }

  function addQuotes(root) {
    root.querySelectorAll('.editorialQuote').forEach(x=>x.remove());
    const texts=[
      'לא רצינו עוד חופשה. רצינו קיץ שיישאר איתנו הרבה אחרי שהמזוודות ייסגרו.',
      'יש ימים שבהם הדרך עצמה הופכת ליעד.',
      'מההרים של קנדה אל האוקיינוס של הוואי, כל מעבר הרגיש כמו התחלה של מסע חדש.',
      'בסוף נשארים פחות עם רשימת המקומות ויותר עם הרגעים שעברנו יחד.'
    ];
    const articles=[...root.querySelectorAll('.dayMaster')];
    if(!articles.length)return;
    [.18,.40,.65,.86].forEach((fraction,i)=>{
      const article=articles[Math.min(articles.length-1,Math.round((articles.length-1)*fraction))];
      const quote=document.createElement('aside');quote.className='editorialQuote';quote.innerHTML=`<p>${texts[i]}</p><small>AZAR’S TRAVEL · FROM THE ROAD</small>`;
      article.insertAdjacentElement('afterend',quote);
    });
  }

  async function rebuildJournal() {
    const root=$('#story'),loading=$('#loading');if(!root)return;
    try{
      const files=['0408','0508','0608','0708','0808','0908','1008','1108','1208','1308','1408','1508','1608','1708'];
      const [main,...days]=await Promise.all([
        fetch(`/content/summer-2026.md?v=${VERSION}`).then(r=>r.ok?r.text():''),
        ...files.map(d=>fetch(`/content/day-${d}.md?v=${VERSION}`).then(r=>r.ok?r.text():''))
      ]);
      root.innerHTML='';loading?.remove();
      const start=main.search(/\*\*מוצאי שבת,? 18 ביולי\*\*/);
      let base=start>=0?main.slice(start):main;
      const cut=base.search(/(?:^|\n)(?:\*\*)?(?:יום\s+[^\n]*[, ]\s*)?(?:4 באוגוסט|04[\/.]08)/m);
      if(cut>0)base=base.slice(0,cut);
      renderBase(base,root);
      days.forEach(md=>{if(!md)return;const article=renderSingleDay(md);if(article)root.appendChild(article)});
      addQuotes(root);
      if(location.hash){const target=$(location.hash);if(target)setTimeout(()=>target.scrollIntoView(),80)}
    }catch(err){console.error('Summer 2026 rebuild failed',err);if(loading)loading.textContent='לא הצלחנו לטעון את היומן. נסו לרענן את העמוד.'}
  }

  function qa() {
    document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{const target=$(a.getAttribute('href'));if(!target)console.warn('Broken anchor',a.getAttribute('href'))}));
  }

  addStyles();
  injectMap();
  injectTransport();
  rebuildJournal();
  qa();
})();
