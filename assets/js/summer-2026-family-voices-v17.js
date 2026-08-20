(() => {
  const VOICES = [
    {name:'אריאל', quote:'זה היה טיול שחיבר וגיבש אותנו כמשפחה.'},
    {name:'נויה', quote:'טיול שלימד אותי להכיר את המשפחה בצורה אחרת, מזווית אחרת ומדהימה.'},
    {name:'עומרי', quote:'הטיול הכי טוב שהיה לי בחיים.'}
  ];

  function addStyles(){
    if(document.getElementById('family-voices-v17-style')) return;
    const style=document.createElement('style');
    style.id='family-voices-v17-style';
    style.textContent=`
      .familyVoices{margin:72px 0 18px;padding:42px 0 8px;border-top:1px solid var(--line)}
      .familyVoicesHead{text-align:center;margin-bottom:28px}
      .familyVoicesHead small{display:block;color:var(--rust);font-size:10px;font-weight:950;letter-spacing:.16em;direction:ltr;margin-bottom:10px}
      .familyVoicesHead h2{font-family:Georgia,"Times New Roman",serif;font-size:clamp(38px,6vw,58px);line-height:1.04;margin:0 0 10px;color:var(--ink)}
      .familyVoicesHead p{margin:0;color:var(--muted);font-size:15px;line-height:1.7}
      .familyVoicesGrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
      .familyVoice{background:var(--paper);border:1px solid var(--line);border-radius:24px;padding:26px 22px 24px;min-height:250px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 12px 34px rgba(52,43,32,.04)}
      .familyVoice:before{content:'“';font-family:Georgia,"Times New Roman",serif;font-size:68px;line-height:.7;color:var(--rust);height:46px}
      .familyVoice blockquote{font-family:Georgia,"Times New Roman",serif;font-size:clamp(22px,2.8vw,30px);line-height:1.5;margin:10px 0 22px;color:var(--ink);font-weight:700}
      .familyVoice footer{padding:0;border:0;color:var(--rust);font-size:12px;font-weight:950}
      .familyVoice:last-child{background:var(--deep);color:#fff;border-color:var(--deep)}
      .familyVoice:last-child blockquote{color:#fff;font-size:clamp(26px,3.2vw,34px)}
      .familyVoice:last-child footer{color:#f0c8b7}
      .familyVoice:last-child:before{color:#f0c8b7}
      @media(max-width:760px){.familyVoices{margin-top:52px;padding-top:34px}.familyVoicesGrid{grid-template-columns:1fr}.familyVoice{min-height:0;padding:24px 20px}.familyVoice blockquote{font-size:26px}.familyVoice:last-child blockquote{font-size:30px}}
    `;
    document.head.appendChild(style);
  }

  function build(){
    const root=document.getElementById('story');
    if(!root || !root.querySelector('.dayMaster')) return false;
    document.getElementById('family-voices-v17')?.remove();
    const section=document.createElement('section');
    section.id='family-voices-v17';
    section.className='familyVoices';
    section.setAttribute('aria-label','המסע דרך העיניים שלהם');
    section.innerHTML=`
      <header class="familyVoicesHead">
        <small>THE JOURNEY THROUGH THEIR EYES</small>
        <h2>המסע דרך העיניים שלהם</h2>
        <p>שלושה משפטים. שלוש נקודות מבט. מסע משפחתי אחד.</p>
      </header>
      <div class="familyVoicesGrid">
        ${VOICES.map(v=>`<article class="familyVoice"><blockquote>״${v.quote}״</blockquote><footer>${v.name}</footer></article>`).join('')}
      </div>`;
    root.appendChild(section);
    return true;
  }

  addStyles();
  let tries=0;
  const timer=setInterval(()=>{
    tries++;
    if(build() || tries>100) clearInterval(timer);
  },150);
})();