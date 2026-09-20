/* =========================================================
   DADOS EDITÁVEIS — mexa só aqui para atualizar o site
   ========================================================= */

/* WhatsApp com DDI + DDD, só números */
const WHATSAPP = '556193995513';
const NOME = 'Dayane';

/* Vídeos da grade.
   url   → link do post no Instagram ou no TikTok (o card abre o post na própria página)
   views → texto que aparece grande no card (EDITAR: trocar pelo número real de views)
   titulo→ legenda curta
   tag   → organico | publi | ugc
   capa  → imagem em assets/img/ (baixada do próprio post)
   video → (opcional) mp4 em assets/video/. Com ele o card toca o vídeo aqui mesmo,
           sem depender do embed do Instagram (que fica em branco em muitos navegadores).
*/
const VIDEOS = [
  /* ---- Parcerias ---- */
  { url: 'https://www.instagram.com/reel/DXQA4YejfP2/', views: 'Voltfit', titulo: 'Tênis novo pro pré-treino', tag: 'publi', capa: 'assets/img/parceria-7.jpg', video: 'assets/video/parceria-7.mp4' },
  { url: 'https://www.instagram.com/reel/DWy8G7lkX1K/', views: 'Ignis', titulo: 'Moda fitness · nova coleção com cupom', tag: 'publi', capa: 'assets/img/parceria-5.jpg', video: 'assets/video/parceria-5.mp4' },
  { url: 'https://www.instagram.com/reel/DZyLMxyt4Sa/', views: 'Adorável Burger', titulo: 'Quantos hambúrgueres existem aqui?', tag: 'publi', capa: 'assets/img/parceria-4.jpg', video: 'assets/video/parceria-4.mp4' },
  { url: 'https://www.instagram.com/reel/DVQ8HT0kZyi/', views: 'Hakon', titulo: 'Não é só uma blusa, é identidade', tag: 'publi', capa: 'assets/img/parceria-6.jpg', video: 'assets/video/parceria-6.mp4' },
  { url: 'https://www.instagram.com/reel/DdXUfMAtIo5/', views: 'Estética', titulo: 'Preenchimento labial: resultado no final', tag: 'publi', capa: 'assets/img/parceria-1.jpg', video: 'assets/video/parceria-1.mp4' },
  { url: 'https://www.instagram.com/reel/Dc1z_t5x0GP/', views: 'Gaby Pastéis', titulo: 'Pastel quentinho e crocante', tag: 'publi', capa: 'assets/img/parceria-3.jpg', video: 'assets/video/parceria-3.mp4' },
  { url: 'https://www.instagram.com/p/DdR3vssGRxy/', views: 'Moda fitness', titulo: 'Conjunto Riva: movimento e conforto', tag: 'publi', capa: 'assets/img/parceria-2.jpg' },
  { url: 'https://www.instagram.com/reel/DXuIhlLEQAX/', views: 'Voltfit', titulo: 'Puro molho', tag: 'publi', capa: 'assets/img/parceria-8.jpg', video: 'assets/video/parceria-8.mp4' },
  /* ---- Virais ---- */
  { url: 'https://www.instagram.com/reel/DOW05rfEQyD/', views: 'Viral', titulo: 'Metas', tag: 'organico', capa: 'assets/img/viral-1.jpg', video: 'assets/video/viral-1.mp4' },
  { url: 'https://www.instagram.com/reel/DVOKE_OkchZ/', views: 'Viral', titulo: 'Rum', tag: 'organico', capa: 'assets/img/viral-2.jpg', video: 'assets/video/viral-2.mp4' },
  { url: 'https://www.instagram.com/reel/DWw7pfDjb4E/', views: 'Viral', titulo: 'Ele não mede esforços', tag: 'organico', capa: 'assets/img/viral-3.jpg', video: 'assets/video/viral-3.mp4' }
];

/* ========================================================= */

(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGsap = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';

  const TAGS = { organico: 'Orgânico', publi: 'Publi', ugc: 'UGC' };

  /* ---------- Descobre o link de incorporação a partir do link do post ---------- */
  const embedUrl = url => {
    if (!url) return null;
    const ig = url.match(/instagram\.com\/(p|reel|reels|tv)\/([A-Za-z0-9_-]+)/);
    if (ig) return `https://www.instagram.com/${ig[1] === 'reels' ? 'reel' : ig[1]}/${ig[2]}/embed`;
    const tk = url.match(/tiktok\.com\/.*\/video\/(\d+)/);
    if (tk) return `https://www.tiktok.com/embed/v2/${tk[1]}`;
    return null;
  };

  /* ---------- Monta a grade de vídeos ---------- */
  const grid = $('#video-grid');
  const cards = VIDEOS.map(v => {
    const el = document.createElement(v.url ? 'button' : 'div');
    el.className = 'card';
    el.dataset.tag = v.tag || '';
    if (v.url) { el.type = 'button'; el.dataset.url = v.url; }
    if (v.video) el.dataset.video = v.video;
    // Preview: no desktop, ao passar o mouse o card toca o video sem som.
    if (v.video && matchMedia('(hover: hover) and (pointer: fine)').matches) {
      const pv = document.createElement('video');
      pv.className = 'card__preview'; pv.muted = true; pv.loop = true; pv.playsInline = true; pv.preload = 'none';
      el.addEventListener('pointerenter', () => { if (!pv.src) pv.src = v.video; pv.currentTime = 0; pv.play().then(() => el.classList.add('is-previewing')).catch(() => {}); });
      el.addEventListener('pointerleave', () => { pv.pause(); el.classList.remove('is-previewing'); });
      el.appendChild(pv);
    }

    const capa = v.capa
      ? `<img src="${v.capa}" alt="${v.titulo || ''}" loading="lazy" onerror="this.remove()">`
      : '';

    el.innerHTML = `
      <span class="card__empty">capa do vídeo</span>
      ${capa}
      <span class="card__tag">${TAGS[v.tag] || ''}</span>
      ${v.url ? '<span class="card__play"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><use href="#play-icon"/></svg></span>' : ''}
      <span class="card__shade"></span>
      <span class="card__info">
        <span class="card__views">${v.views || ''}</span>
        <span class="card__title">${v.titulo || ''}</span>
      </span>`;
    grid.appendChild(el);
    return el;
  });

  /* ---------- Filtros ---------- */
  $$('.chip').forEach(btn => btn.addEventListener('click', () => {
    const f = btn.dataset.filter;
    $$('.chip').forEach(b => { b.classList.toggle('is-active', b === btn); b.setAttribute('aria-selected', b === btn); });
    cards.forEach(c => c.classList.toggle('is-hidden', f !== 'all' && c.dataset.tag !== f));
  }));

  /* ---------- Carrossel de marcas ---------- */
  const brands = $('#brands');
  if (brands) {
    const arrows = $$('[data-brands]');
    const passo = () => (brands.querySelector('.brand')?.offsetWidth || 200) + 14;
    const atualiza = () => {
      const max = brands.scrollWidth - brands.clientWidth - 2;
      arrows.forEach(a => {
        const dir = +a.dataset.brands;
        a.disabled = dir < 0 ? brands.scrollLeft <= 2 : brands.scrollLeft >= max;
      });
    };
    arrows.forEach(a => a.addEventListener('click', () => brands.scrollBy({ left: passo() * 2 * +a.dataset.brands, behavior: 'smooth' })));
    brands.addEventListener('scroll', atualiza, { passive: true });
    window.addEventListener('resize', atualiza);
    atualiza();
  }

  /* ---------- Modal do vídeo ---------- */
  const modal = $('#modal');
  const frame = $('#modal-frame');
  const modalLink = $('#modal-link');
  let lastFocus = null;

  const openModal = (url, video) => {
    const embed = embedUrl(url);
    if (!video && !embed) { window.open(url, '_blank', 'noopener'); return; }
    lastFocus = document.activeElement;
    frame.innerHTML = video
      ? `<video src="${video}" controls autoplay playsinline preload="metadata"></video>`
      : `<iframe src="${embed}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen scrolling="no" title="Vídeo"></iframe>`;
    frame.classList.toggle('modal__frame--video', !!video);
    modalLink.href = url;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    $('.modal__close').focus();
  };

  const closeModal = () => {
    modal.hidden = true;
    frame.innerHTML = '';
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  };

  grid.addEventListener('click', e => {
    const card = e.target.closest('.card[data-url]');
    if (card) openModal(card.dataset.url, card.dataset.video);
  });
  $$('[data-close]').forEach(el => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });

  /* ---------- Formulário -> WhatsApp ---------- */
  const form = $('#lead-form');
  const whats = $('#whats');

  whats.addEventListener('input', () => {
    const d = whats.value.replace(/\D/g, '').slice(0, 11);
    let out = d;
    if (d.length > 2) out = `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length > 7) out = `(${d.slice(0, 2)}) ${d.slice(2, d.length - 4)}-${d.slice(-4)}`;
    whats.value = out;
  });

  const plano = $('#plano');
  $$('[data-plan]').forEach(a => a.addEventListener('click', () => {
    plano.value = a.dataset.plan;
    plano.closest('.field').classList.remove('is-invalid');
  }));

  const validators = {
    nome: v => v.trim().length >= 2,
    whats: v => v.replace(/\D/g, '').length >= 10,
    plano: v => v !== ''
  };
  const validateField = el => {
    const ok = validators[el.name] ? validators[el.name](el.value) : true;
    el.closest('.field').classList.toggle('is-invalid', !ok);
    return ok;
  };
  Object.keys(validators).forEach(name => {
    const el = form.elements[name];
    el.addEventListener('blur', () => el.value && validateField(el));
    el.addEventListener('input', () => el.closest('.field').classList.contains('is-invalid') && validateField(el));
    el.addEventListener('change', () => el.closest('.field').classList.contains('is-invalid') && validateField(el));
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const invalid = Object.keys(validators).map(n => form.elements[n]).filter(el => !validateField(el));
    if (invalid.length) { invalid[0].focus(); return; }

    const f = form.elements;
    const lines = [
      `Olá, ${NOME}! Vim pelo seu site e quero falar sobre uma parceria ✨`,
      '',
      `*Nome:* ${f.nome.value.trim()}`,
      f.marca.value.trim() ? `*Marca:* ${f.marca.value.trim()}` : null,
      `*WhatsApp:* ${f.whats.value}`,
      `*Formato:* ${f.plano.value}`,
      f.mensagem.value.trim() ? `*Campanha:* ${f.mensagem.value.trim()}` : null
    ].filter(Boolean);

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'generate_lead', lead_plan: f.plano.value });

    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join('\n'))}`;
    const win = window.open(url, '_blank');
    if (win) win.opener = null; else location.href = url;
  });

  $$('[data-wa-direct]').forEach(a => a.addEventListener('click', () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'whatsapp_click' });
  }));

  /* ---------- Links do WhatsApp e ano ---------- */
  $$('[data-wa-direct]').forEach(a => {
    a.href = a.href.includes('?') ? a.href.replace(/wa\.me\/\d+/, `wa.me/${WHATSAPP}`) : `https://wa.me/${WHATSAPP}`;
  });
  const waFloat = $('.wa-float');
  waFloat.href = waFloat.href.replace(/wa\.me\/\d+/, `wa.me/${WHATSAPP}`);
  $('[data-year]').textContent = new Date().getFullYear();

  /* ---------- Nav + botão flutuante ---------- */
  const nav = $('.nav');
  let formInView = false;
  new IntersectionObserver(([e]) => { formInView = e.isIntersecting; onScroll(); }).observe(form);
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle('is-scrolled', y > 10);
    waFloat.classList.toggle('is-visible', y > window.innerHeight * .5 && !formInView);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Barras ---------- */
  const fillBar = el => { el.style.width = `${el.dataset.bar}%`; };

  /* ---------- Contadores ---------- */
  const countUp = el => {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    const target = parseFloat(el.dataset.countup);
    const suffix = el.dataset.suffix || '';
    const decimals = (el.dataset.countup.split('.')[1] || '').length;
    const start = performance.now();
    const dur = 1500;
    const step = now => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals).replace('.', ',') + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  /* ================= MOTION ================= */
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const preloader = $('.preloader');
  const hidePreloader = () => { if (preloader) preloader.style.display = 'none'; document.body.classList.remove('is-loading'); };

  if (reduced || !hasGsap) {
    hidePreloader();
    $$('[data-bar]').forEach(fillBar);
    $$('[data-countup]').forEach(countUp);
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  document.body.classList.add('is-loading');

  /* Scroll suave (Lenis) */
  let lenis = null;
  if (typeof window.Lenis !== 'undefined') {
    lenis = new Lenis({ duration: 1.1, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    lenis.stop();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    const target = id.length > 1 ? $(id) : null;
    if (!target) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(target, { offset: -80, duration: 1.3 });
    else target.scrollIntoView({ behavior: 'smooth' });
  }));

  /* Titulos palavra por palavra (mantem <em> e <br>) */
  const splitWords = el => {
    const walk = node => {
      [...node.childNodes].forEach(child => {
        if (child.nodeType === 3) {
          const frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            const w = document.createElement('span'); w.className = 'word';
            const inner = document.createElement('span'); inner.textContent = part;
            w.appendChild(inner); frag.appendChild(w);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === 1 && child.tagName !== 'BR') walk(child);
      });
    };
    walk(el);
  };
  $$('.split').forEach(splitWords);

  /* Preloader -> entrada do hero */
  const counter = $('[data-count]');
  const bar = $('.preloader__bar i');
  const prog = { v: 0 };
  const pad = n => String(n).padStart(2, '0');
  const minTime = new Promise(r => setTimeout(r, 1300));
  const heroImgs = $$('.tile img');
  const imgsReady = Promise.all(heroImgs.map(i => i.complete ? null : new Promise(r => { i.onload = r; i.onerror = r; })));

  gsap.set('.preloader__line > *', { yPercent: 110 });
  gsap.set('.preloader__mark span', { yPercent: 120 });
  gsap.set('.hero__title .word > span', { yPercent: 115 });
  gsap.set(['.tagline', '.hero__sub', '.hero__ctas', '.hero__stats'], { autoAlpha: 0, y: 24 });
  gsap.set('.tile', { autoAlpha: 0, y: 90, rotate: i => (i ? 6 : -6) });
  gsap.set('.nav', { autoAlpha: 0, y: -20 });

  gsap.to('.preloader__mark span', { yPercent: 0, duration: .8, ease: 'expo.out', delay: .1 });
  gsap.to('.preloader__line > *', { yPercent: 0, duration: 1, ease: 'expo.out', stagger: .12, delay: .15 });
  const countTween = gsap.to(prog, {
    v: 88, duration: 1.2, ease: 'power2.out',
    onUpdate: () => { counter.textContent = pad(Math.round(prog.v)); bar.style.transform = `scaleX(${prog.v / 100})`; }
  });

  Promise.all([imgsReady, minTime, document.fonts ? document.fonts.ready : null]).then(() => {
    countTween.kill();
    gsap.timeline()
      .to(prog, { v: 100, duration: .3, onUpdate: () => { counter.textContent = '100'; bar.style.transform = `scaleX(${prog.v / 100})`; } })
      .to('.preloader__line > *', { yPercent: -110, duration: .6, ease: 'expo.in', stagger: .06 }, '+=.1')
      .to(['.preloader__count', '.preloader__bar', '.preloader__mark'], { autoAlpha: 0, duration: .3 }, '<')
      .to('.preloader', { yPercent: -100, duration: .9, ease: 'expo.inOut' }, '-=.15')
      .add(() => { hidePreloader(); if (lenis) lenis.start(); })
      .to('.hero__title .word > span', { yPercent: 0, duration: 1.2, ease: 'expo.out', stagger: .06 }, '-=.5')
      .to('.tagline', { autoAlpha: 1, y: 0, duration: .9, ease: 'expo.out' }, '-=1.1')
      .to('.tile', { autoAlpha: 1, y: 0, rotate: 0, duration: 1.4, ease: 'expo.out', stagger: .12, clearProps: 'transform,opacity,visibility' }, '-=1')
      .to(['.hero__sub', '.hero__ctas', '.hero__stats'], { autoAlpha: 1, y: 0, duration: .9, ease: 'expo.out', stagger: .08, onComplete: () => $$('.hero__stats [data-countup]').forEach(countUp) }, '-=1.1')
      .to('.nav', { autoAlpha: 1, y: 0, duration: .8, ease: 'expo.out' }, '-=.9');
  });

  /* Parallax do topo */
  gsap.to('.hero__media', { yPercent: -14, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.hero__text', { yPercent: 10, autoAlpha: .15, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'center center', end: 'bottom top', scrub: true } });

  /* Ticker acelera com o scroll */
  const tracks = $$('.ticker__track').map(t => t.getAnimations()[0]).filter(Boolean);
  let rateTimer;
  ScrollTrigger.create({
    onUpdate: self => {
      const v = Math.min(Math.abs(self.getVelocity()) / 350, 6);
      tracks.forEach(a => a.playbackRate = 1 + v);
      clearTimeout(rateTimer);
      rateTimer = setTimeout(() => tracks.forEach(a => a.playbackRate = 1), 200);
    }
  });

  /* Titulos das secoes */
  $$('.split:not(.hero__title)').forEach(el => {
    gsap.from($$('.word > span', el), {
      yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: .05,
      scrollTrigger: { trigger: el, start: 'top 88%' }
    });
  });

  /* Reveals genericos */
  gsap.set('.reveal', { autoAlpha: 0, y: 40 });
  ScrollTrigger.batch('.reveal', {
    start: 'top 90%',
    onEnter: batch => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1, ease: 'expo.out', stagger: .07, overwrite: true })
  });

  /* Cards da grade: sobem em escada (com clearProps — nunca ficam presos invisiveis) */
  gsap.from('#video-grid .card', {
    y: 80, autoAlpha: 0, duration: 1.1, ease: 'expo.out', stagger: .06,
    clearProps: 'transform,opacity,visibility',
    scrollTrigger: { trigger: '#video-grid', start: 'top 85%', once: true }
  });

  /* Tilt nos cards (desktop) */
  if (finePointer) {
    $$('#video-grid .card').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - .5;
        const py = (e.clientY - r.top) / r.height - .5;
        gsap.to(card, { rotateY: px * 8, rotateX: -py * 8, duration: .5, ease: 'power3.out', transformPerspective: 900 });
        card.style.setProperty('--mx', `${(px + .5) * 100}%`);
        card.style.setProperty('--my', `${(py + .5) * 100}%`);
      });
      card.addEventListener('pointerleave', () => gsap.to(card, { rotateY: 0, rotateX: 0, duration: .8, ease: 'expo.out' }));
    });
  }

  /* Retrato: revela de baixo pra cima + parallax leve */
  gsap.from('.about__media', { clipPath: 'inset(100% 0 0 0 round 26px)', duration: 1.5, ease: 'expo.inOut', scrollTrigger: { trigger: '.about__media', start: 'top 80%' } });
  gsap.fromTo('.about__media img', { yPercent: 6, scale: 1.08 }, { yPercent: -6, scale: 1.08, ease: 'none', scrollTrigger: { trigger: '.about__media', start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.from('.about__badge', { scale: 0, rotate: -30, duration: 1.1, ease: 'back.out(1.8)', scrollTrigger: { trigger: '.about__media', start: 'top 55%' } });

  /* Contadores e barras */
  $$('[data-countup]').filter(el => !el.closest('.hero__stats')).forEach(el => ScrollTrigger.create({ trigger: el, start: 'top 92%', once: true, onEnter: () => countUp(el) }));
  $$('[data-bar]').forEach(el => ScrollTrigger.create({ trigger: el, start: 'top 95%', once: true, onEnter: () => fillBar(el) }));
  gsap.from('.spark li', { scaleY: 0, transformOrigin: 'bottom', duration: .9, ease: 'expo.out', stagger: .06, scrollTrigger: { trigger: '.spark', start: 'top 92%' } });

  /* Cursor em anel + botoes magneticos (desktop) */
  if (finePointer) {
    const cursor = $('.cursor');
    const xTo = gsap.quickTo(cursor, 'x', { duration: .4, ease: 'power3' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: .4, ease: 'power3' });
    window.addEventListener('pointermove', e => { xTo(e.clientX); yTo(e.clientY); cursor.style.opacity = 1; });
    document.addEventListener('pointerleave', () => cursor.style.opacity = 0);
    $$('a, button, summary, .chip').forEach(el => {
      el.addEventListener('pointerenter', () => cursor.classList.add('is-link'));
      el.addEventListener('pointerleave', () => cursor.classList.remove('is-link'));
    });
    $$('#video-grid .card[data-video]').forEach(el => {
      el.addEventListener('pointerenter', () => cursor.classList.add('is-video'));
      el.addEventListener('pointerleave', () => cursor.classList.remove('is-video'));
    });
    $$('.magnetic').forEach(btn => {
      btn.addEventListener('pointermove', e => {
        const r = btn.getBoundingClientRect();
        btn.style.setProperty('--bx', `${(e.clientX - r.left - r.width / 2) * .22}px`);
        btn.style.setProperty('--by', `${(e.clientY - r.top - r.height / 2) * .3}px`);
      });
      btn.addEventListener('pointerleave', () => { btn.style.setProperty('--bx', '0px'); btn.style.setProperty('--by', '0px'); });
    });
  }

  window.addEventListener('load', () => ScrollTrigger.refresh());

  // Rede de seguranca: se algo travar (aba em segundo plano, extensao,
  // CDN fora), nada pode ficar invisivel nem o preloader preso na tela.
  setTimeout(() => {
    hidePreloader(); if (lenis) lenis.start();
    gsap.set('.reveal, .tile, .tagline, .hero__sub, .hero__ctas, .hero__stats, .nav, .word > span, #video-grid .card, .about__media, .about__badge', { autoAlpha: 1, clearProps: 'opacity,visibility,transform,clipPath' });
    $$('[data-countup]').forEach(countUp);
  }, 6000);
})();
