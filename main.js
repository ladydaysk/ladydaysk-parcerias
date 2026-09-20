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

  /* ---------- Reveals ---------- */
  if (reduced) {
    $$('[data-bar]').forEach(fillBar);
    return;
  }

  if (hasGsap) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.set('.reveal', { autoAlpha: 0, y: 28 });
    ScrollTrigger.batch('.reveal', {
      start: 'top 90%',
      onEnter: batch => gsap.to(batch, { autoAlpha: 1, y: 0, duration: .9, ease: 'power3.out', stagger: .07, overwrite: true })
    });
    gsap.from('.hero__text > *', { autoAlpha: 0, y: 26, duration: .9, ease: 'power3.out', stagger: .09, delay: .1 });
    gsap.from('.tile', { autoAlpha: 0, y: 40, duration: 1.1, ease: 'power3.out', stagger: .12, delay: .25 });
    // Sem animacao de entrada nos cards: o tween era morto antes de rodar e a
    // grade ficava em branco (opacity 0 inline pra sempre). Os cards ja nascem
    // visiveis; so o cabecalho da secao usa o reveal.
    gsap.from('.spark li', {
      scaleY: 0, duration: .9, ease: 'power3.out', stagger: .06,
      scrollTrigger: { trigger: '.spark', start: 'top 92%' }
    });
    $$('[data-countup]').forEach(el => ScrollTrigger.create({ trigger: el, start: 'top 92%', once: true, onEnter: () => countUp(el) }));
    $$('[data-bar]').forEach(el => ScrollTrigger.create({ trigger: el, start: 'top 95%', once: true, onEnter: () => fillBar(el) }));
    window.addEventListener('load', () => ScrollTrigger.refresh());
    // Rede de seguranca: se alguma animacao nao rodar (aba em segundo plano,
    // extensao bloqueando, tween morto), nada pode ficar invisivel.
    setTimeout(() => gsap.set('.reveal, .tile, .hero__text > *', { autoAlpha: 1, clearProps: 'opacity,visibility,transform' }), 4000);
  } else {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        if (e.target.dataset.bar) fillBar(e.target);
        if (e.target.dataset.countup) countUp(e.target);
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    $$('[data-bar], [data-countup]').forEach(el => io.observe(el));
  }
})();
