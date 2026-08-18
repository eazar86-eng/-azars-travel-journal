(()=>{
  const root=()=>document.getElementById('story');
  function polish(){
    const r=root();
    if(!r||r.dataset.polished==='1') return false;
    const children=[...r.children];
    if(!children.length) return false;

    const dateRx=/(מוצאי שבת|יום ראשון|יום שני|יום שלישי|יום רביעי|יום חמישי|יום שישי|יום שבת|\b\d{1,2}[/.]\d{1,2}\b|\d{1,2}\s+(?:ביולי|באוגוסט))/;

    // Normalize older paragraph-based date/title pairs if any remain.
    for(let i=0;i<children.length;i++){
      const el=children[i];
      const text=(el.textContent||'').trim();
      if(el.tagName==='P'&&dateRx.test(text)){
        el.classList.add('dateHead');
        const next=children[i+1];
        if(next&&next.tagName==='P'){
          const nextText=(next.textContent||'').trim();
          if(nextText&&nextText.length<90&&!dateRx.test(nextText)) next.classList.add('dayTitle');
        }
      }
    }

    // The renderer already outputs H2.dateHead and H1.dayTitle. Build one editorial card per day.
    const dated=[...r.children].filter(el=>el.classList.contains('dateHead'));
    if(!dated.length) return false;

    let card=null;
    for(const el of [...r.children]){
      if(el.classList.contains('dateHead')){
        card=document.createElement('section');
        card.className='trip-day-card';
        r.insertBefore(card,el);
        card.appendChild(el);
      }else if(card){
        card.appendChild(el);
      }
    }

    const first=r.querySelector('.trip-day-card');
    if(first&&!first.querySelector('.trip-start-kicker')){
      const kicker=document.createElement('div');
      kicker.className='trip-start-kicker';
      kicker.textContent='מכאן מתחיל המסע, יום אחרי יום';
      first.insertBefore(kicker,first.firstChild);
    }

    r.dataset.polished='1';
    return true;
  }

  const observer=new MutationObserver(()=>{
    if(polish()) observer.disconnect();
  });

  function start(){
    const r=root();
    if(r) observer.observe(r,{childList:true});
    polish();
    let tries=0;
    const timer=setInterval(()=>{
      tries++;
      if(polish()||tries>30) clearInterval(timer);
    },200);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
