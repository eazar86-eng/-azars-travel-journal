(() => {
  const QUOTES = [
    {
      match: ['19 ביולי','19/07/2026'],
      text: 'לא רצינו עוד חופשה. רצינו קיץ שיישאר איתנו הרבה אחרי שהמזוודות ייסגרו.',
      label: 'פתיחת המסע'
    },
    {
      match: ['24 ביולי','24/07/2026','25 ביולי','25/07/2026'],
      text: 'יש ימים שבהם הדרך עצמה הופכת ליעד, וכל עיקול בכביש מרגיש כמו עוד עמוד בסיפור.',
      label: 'מהדרך ברוקייז'
    },
    {
      match: ['4 באוגוסט','04/08/2026','7 באוגוסט','07/08/2026'],
      text: 'מההרים של קנדה אל האוקיינוס של הוואי, כל מעבר הרגיש כמו התחלה של מסע חדש.',
      label: 'מההרים אל האוקיינוס'
    },
    {
      match: ['17/08/2026','18/08/2026'],
      text: 'בסוף נשארים פחות עם רשימת המקומות ויותר עם הרגעים שעברנו יחד.',
      label: 'לקראת הדרך הביתה'
    }
  ];

  const VOICES = [
    {name:'אריאל',quote:'זה היה טיול שחיבר וגיבש אותנו כמשפחה.'},
    {name:'נויה',quote:'טיול שלימד אותי להכיר את המשפחה בצורה אחרת, מזווית אחרת ומדהימה.'},
    {name:'עומרי',quote:'הטיול הכי טוב שהיה לי בחיים.'}
  ];

  function findArticle(matchers, used){
    const articles=[...document.querySelectorAll('#story .dayMaster')];
    return articles.find(a=>!used.has(a)&&matchers.some(x=>a.textContent.includes(x)));
  }

  function makeQuote(q){
    const aside=document.createElement('aside');
    aside.className='editorialQuote editorialQuoteV16';
    aside.setAttribute('aria-label','ציטוט מתוך מסע קיץ 2026');
    aside.innerHTML=`<div class="quoteRule"></div><p>${q.text}</p><small>${q.label} · AZAR’S TRAVEL</small>`;
    return aside;
  }

  function addStyles(){
    if(document.getElementById('summer-quotes-v16-style'))return;
    const s=document.createElement('style');
    s.id='summer-quotes-v16-style';
    s.textContent=`
      .editorialQuoteV16{margin:64px -10% 68px;padding:34px 10% 36px;text-align:center;border:0!important;position:relative;background:transparent}
      .editorialQuoteV16 .quoteRule{width:54px;height:2px;background:var(--rust);margin:0 auto 20px}
      .editorialQuoteV16:before{content:'“';display:block;font-family:Georgia,"Times New Roman",serif;font-size:82px;line-height:.58;color:var(--rust);margin-bottom:18px}
      .editorialQuoteV16 p{font-family:Georgia,"Times New Roman",serif!important;font-size:clamp(30px,4.7vw,48px)!important;line-height:1.34!important;color:var(--ink)!important;margin:0 auto!important;max-width:980px;font-weight:700}
      .editorialQuoteV16 small{display:block;margin-top:18px;color:var(--rust);font-size:10px;font-weight:950;letter-spacing:.13em}
      .familyVoicesV16{margin:74px 0 12px;padding-top:40px;border-top:1px solid var(--line)}
      .familyVoicesV16 header{text-align:center;margin-bottom:28px}
      .familyVoicesV16 header small{display:block;color:var(--rust);font-size:10px;font-weight:950;letter-spacing:.15em;direction:ltr;margin-bottom:9px}
      .familyVoicesV16 header h2{font-family:Georgia,"Times New Roman",serif;font-size:clamp(38px,6vw,58px);line-height:1.04;margin:0 0 10px;color:var(--ink)}
      .familyVoicesV16 header p{margin:0;color:var(--muted);font-size:15px;line-height:1.7}
      .familyVoicesGridV16{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
      .familyVoiceV16{background:var(--paper);border:1px solid var(--line);border-radius:24px;padding:26px 22px 24px;min-height:250px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 12px 34px rgba(52,43,32,.04)}
      .familyVoiceV16:before{content:'“';font-family:Georgia,"Times New Roman",serif;font-size:68px;line-height:.7;color:var(--rust);height:46px}
      .familyVoiceV16 blockquote{font-family:Georgia,"Times New Roman",serif;font-size:clamp(22px,2.8vw,30px);line-height:1.5;margin:10px 0 22px;color:var(--ink);font-weight:700}
      .familyVoiceV16 footer{padding:0;border:0;color:var(--rust);font-size:12px;font-weight:950}
      .familyVoiceV16:last-child{background:var(--deep);color:#fff;border-color:var(--deep)}
      .familyVoiceV16:last-child blockquote{color:#fff;font-size:clamp(26px,3.2vw,34px)}
      .familyVoiceV16:last-child footer,.familyVoiceV16:last-child:before{color:#f0c8b7}
      @media(max-width:760px){.familyVoicesGridV16{grid-template-columns:1fr}.familyVoiceV16{min-height:0}.familyVoiceV16 blockquote{font-size:26px}.familyVoiceV16:last-child blockquote{font-size:30px}}
      @media(max-width:650px){.editorialQuoteV16{margin:46px 0 50px;padding:28px 6px 30px}.editorialQuoteV16:before{font-size:66px}.editorialQuoteV16 p{font-size:29px!important}.editorialQuoteV16 small{font-size:9px}.familyVoicesV16{margin-top:50px;padding-top:32px}}
    `;
    document.head.appendChild(s);
  }

  function placeQuotes(){
    const root=document.getElementById('story');
    if(!root||!root.querySelector('.dayMaster'))return false;
    root.querySelectorAll('.editorialQuote').forEach(x=>x.remove());
    const used=new Set();
    QUOTES.forEach(q=>{
      let article=findArticle(q.match,used);
      if(!article){
        const all=[...root.querySelectorAll('.dayMaster')].filter(a=>!used.has(a));
        article=all[Math.min(all.length-1,Math.floor((used.size+1)*all.length/(QUOTES.length+1)))];
      }
      if(article){used.add(article);article.insertAdjacentElement('afterend',makeQuote(q));}
    });
    return true;
  }

  function placeFamilyVoices(){
    const root=document.getElementById('story');
    if(!root||!root.querySelector('.dayMaster'))return false;
    document.getElementById('family-voices-v16')?.remove();
    const section=document.createElement('section');
    section.id='family-voices-v16';
    section.className='familyVoicesV16';
    section.innerHTML=`<header><small>THE JOURNEY THROUGH THEIR EYES</small><h2>המסע דרך העיניים שלהם</h2><p>שלושה משפטים. שלוש נקודות מבט. מסע משפחתי אחד.</p></header><div class="familyVoicesGridV16">${VOICES.map(v=>`<article class="familyVoiceV16"><blockquote>״${v.quote}״</blockquote><footer>${v.name}</footer></article>`).join('')}</div>`;
    root.appendChild(section);
    return true;
  }

  addStyles();
  let tries=0;
  const timer=setInterval(()=>{
    tries++;
    const ok=placeQuotes();
    if(ok)placeFamilyVoices();
    if(ok||tries>80)clearInterval(timer);
  },150);
})();