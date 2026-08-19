(() => {
  const monthMap={
    'ביולי':'07','יולי':'07','באוגוסט':'08','אוגוסט':'08'
  };
  const dayMap={
    'ראשון':'יום ראשון','שני':'יום שני','שלישי':'יום שלישי','רביעי':'יום רביעי','חמישי':'יום חמישי','שישי':'יום שישי','שבת':'שבת','מוצאי שבת':'מוצאי שבת'
  };
  const clean=s=>(s||'').replace(/^\*\*|\*\*$/g,'').trim();
  const esc=s=>(s||'').replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
  const inline=s=>esc(clean(s)).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');

  function fullDateLabel(raw){
    let s=clean(raw).replace(/^יום\s+/,'');
    let m=s.match(/^(מוצאי שבת|ראשון|שני|שלישי|רביעי|חמישי|שישי|שבת)[, ]+\s*(\d{1,2})[\/.](\d{1,2})(?:[\/.](\d{4}))?$/);
    if(m){
      const day=dayMap[m[1]]||m[1];
      return `${day} · ${m[2].padStart(2,'0')}/${m[3].padStart(2,'0')}/${m[4]||'2026'}`;
    }
    m=s.match(/^(מוצאי שבת|ראשון|שני|שלישי|רביעי|חמישי|שישי|שבת)[, ]+\s*(\d{1,2})\s+(ביולי|יולי|באוגוסט|אוגוסט)$/);
    if(m){
      const day=dayMap[m[1]]||m[1];
      return `${day} · ${m[2].padStart(2,'0')}/${monthMap[m[3]]}/2026`;
    }
    return raw;
  }

  function normalizeExistingDates(){
    document.querySelectorAll('#story .dateHead').forEach(el=>{el.textContent=fullDateLabel(el.textContent)});
  }

  function renderDay1808(md){
    if(document.getElementById('la-1808'))return;
    const lines=md.split(/\r?\n/);
    const dateLine=lines.find(x=>/^###\s+/.test(x.trim()));
    const titleLine=lines.find(x=>/^#\s+/.test(x.trim())&&!/^###/.test(x.trim()));
    if(!dateLine||!titleLine)return;
    const article=document.createElement('article');
    article.className='dayMaster';article.id='la-1808';
    article.innerHTML=`<div class="dateHead">${esc(fullDateLabel(dateLine.replace(/^###\s+/,'')))}</div><h1 class="dayTitle">${inline(titleLine.replace(/^#\s+/,''))}</h1>`;
    let afterTitle=false;
    for(const raw of lines){
      const line=raw.trim();
      if(line===titleLine.trim()){afterTitle=true;continue}
      if(!afterTitle||!line||/^###\s+/.test(line))continue;
      if(/^!\[/.test(line))continue;
      let el;
      if(/^##\s+/.test(line)){el=document.createElement('h2');el.innerHTML=inline(line.replace(/^##\s+/,''))}
      else{el=document.createElement('p');el.innerHTML=inline(line)}
      article.appendChild(el);
    }
    document.getElementById('story')?.appendChild(article);
  }

  async function apply(){
    let tries=0;
    while(!document.querySelector('#story .dayMaster')&&tries<50){await new Promise(r=>setTimeout(r,100));tries++}
    normalizeExistingDates();
    try{
      const r=await fetch('/content/day-1808.md?v=20260819journal14',{cache:'no-store'});
      if(r.ok)renderDay1808(await r.text());
    }catch(e){console.error('18/08 journal load failed',e)}
    normalizeExistingDates();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply);else apply();
})();