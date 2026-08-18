(()=>{
  const b=document.body,id=b.dataset.story,hero=document.getElementById('heroImg'),root=document.getElementById('storyContent'),toc=document.getElementById('tocLinks');
  const style=document.createElement('style');
  style.textContent='.article-body img,#storyContent img{max-width:100%;height:auto;display:block;border-radius:18px;margin:28px auto}.article-body figure,#storyContent figure{margin:34px 0}.article-body figcaption,#storyContent figcaption{font-size:12px;line-height:1.6;color:#6b685f;margin-top:8px}.original-gallery{margin-top:56px;padding-top:28px;border-top:1px solid #d9d5cc;display:grid;grid-template-columns:1fr 1fr;gap:14px}.original-gallery>h3{grid-column:1/-1}.original-gallery figure{margin:0}.original-gallery img{width:100%;height:330px;object-fit:cover;margin:0}.original-gallery figure:first-of-type{grid-column:1/-1}.original-gallery figure:first-of-type img{height:520px}.toc a{line-height:1.45}.toc a+ a{margin-top:4px}@media(max-width:700px){.original-gallery{grid-template-columns:1fr}.original-gallery>h3,.original-gallery figure:first-of-type{grid-column:auto}.original-gallery img,.original-gallery figure:first-of-type img{height:auto;max-height:480px}}';
  document.head.appendChild(style);

  const clean=t=>(t||'').replace(/\uFFFD/g,'').replace(/\s+/g,' ').trim();
  const cleanTextNodes=el=>{const w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode())n.nodeValue=n.nodeValue.replace(/\uFFFD/g,'')};
  const fixSrc=el=>{el.querySelectorAll('img,source').forEach(x=>{for(const a of ['src','data-src']){const v=x.getAttribute(a);if(!v)continue;if(v.startsWith('assets/'))x.setAttribute(a,'/'+v);else if(v.startsWith('../assets/'))x.setAttribute(a,'/'+v.replace(/^\.\.\//,''));}if(!x.getAttribute('src')&&x.getAttribute('data-src'))x.setAttribute('src',x.getAttribute('data-src'));x.setAttribute('loading','lazy')})};
  const tocLabel=(text,i)=>{let t=clean(text).replace(/^CHAPTER\s+\d+\s*/i,'').replace(/^[·•\s]+/,'');if(!t)return 'פרק '+(i+1);const date=t.match(/(?:יום\s+(?:ראשון|שני|שלישי|רביעי|חמישי|שישי|שבת)[^\d]{0,8})?\d{1,2}[\/.]\d{1,2}(?:[\/.]\d{2,4})?/);if(t.length>82){if(date)return clean(date[0]+' · '+t.slice(date.index+date[0].length)).slice(0,76)+'…';return t.slice(0,76).trim()+'…'}return t};

  fetch('/archive.html?v=20260818-qa3').then(r=>{if(!r.ok)throw new Error('archive');return r.text()}).then(html=>{
    const doc=new DOMParser().parseFromString(html,'text/html'),sec=doc.getElementById(id);if(!sec)throw new Error('story');
    const heroSource=sec.querySelector('.story-hero img');
    if(heroSource&&hero){let s=heroSource.getAttribute('src')||'';if(s.startsWith('assets/'))s='/'+s;hero.src=s}
    const source=sec.querySelector('.article-body');if(!source)throw new Error('body');
    const clone=source.cloneNode(true);clone.querySelectorAll('script,style,.adbox').forEach(x=>x.remove());clone.querySelectorAll('[id]').forEach(el=>{if(el.tagName!=='H3'&&el.tagName!=='H2')el.removeAttribute('id')});
    cleanTextNodes(clone);fixSrc(clone);root.innerHTML='';[...clone.childNodes].forEach(n=>root.appendChild(n));

    const seen=new Set([...root.querySelectorAll('img')].map(x=>x.getAttribute('src')));const extras=[...sec.querySelectorAll('img')].filter(x=>x!==heroSource&&!source.contains(x));
    if(extras.length){const gal=document.createElement('section');gal.className='original-gallery';const title=document.createElement('h3');title.textContent='תמונות מהמסע';gal.appendChild(title);for(const img of extras){let src=img.getAttribute('src')||img.getAttribute('data-src')||'';if(!src)continue;if(src.startsWith('assets/'))src='/'+src;else if(src.startsWith('../assets/'))src='/'+src.replace(/^\.\.\//,'');if(seen.has(src))continue;seen.add(src);const fig=document.createElement('figure');const im=document.createElement('img');im.src=src;im.loading='lazy';im.alt=clean(img.getAttribute('alt'))||'תמונה מהמסע';fig.appendChild(im);const cap=clean(img.getAttribute('alt'));if(cap){const fc=document.createElement('figcaption');fc.textContent=cap;fig.appendChild(fc)}gal.appendChild(fig)}if(gal.querySelector('figure'))root.appendChild(gal)}

    const heads=[...root.querySelectorAll('h2,h3')];if(toc)toc.innerHTML='';
    heads.forEach((h,i)=>{if(!h.id)h.id='chapter-'+(i+1);if(!toc)return;const a=document.createElement('a');a.href='#'+h.id;a.textContent=tocLabel(h.textContent,i);toc.appendChild(a)});
    document.body.classList.add('story-ready');const hash=location.hash;if(hash&&document.querySelector(hash))setTimeout(()=>document.querySelector(hash).scrollIntoView(),80)
  }).catch(()=>{root.innerHTML='<div class="error">לא הצלחנו לטעון את סיפור המסע. נסו לרענן את העמוד.</div>'})
})();