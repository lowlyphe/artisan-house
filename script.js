// API endpoint for the contact form (see server.js). Falls back to same-origin.
const API_URL = window.API_URL || '';

document.addEventListener('DOMContentLoaded', () => {
  setFooterYear();
  initStickyNavbar();
  initNavDropdowns();
  initHamburger();
  initContactModal();
  initPortfolio();
  initBeforeAfter();
  initForge();
});

// Size the embedded Chefs Forge builder to its own content so there's
// no inner scrollbar, and keep it fitted as the visitor interacts.
function initForge() {
  const iframe = document.querySelector('.forge__frame');
  if (!iframe) return;

  const fit = () => {
    try {
      const d = iframe.contentDocument;
      if (!d || !d.documentElement) return;
      const h = Math.max(d.body ? d.body.scrollHeight : 0, d.documentElement.scrollHeight);
      if (h > 120) iframe.style.height = h + 'px';
    } catch (e) { /* cross-origin: keep CSS height */ }
  };

  const watch = () => {
    try {
      const d = iframe.contentDocument;
      if (!d || !d.body) return;
      if ('ResizeObserver' in window) new ResizeObserver(fit).observe(d.body);
      new MutationObserver(fit).observe(d.body, { subtree: true, childList: true, attributes: true });
    } catch (e) { /* ignore */ }
  };

  const onReady = () => {
    fit();
    watch();
    [150, 500, 1200, 2500].forEach((t) => setTimeout(fit, t));
  };

  iframe.addEventListener('load', onReady);
  window.addEventListener('resize', () => setTimeout(fit, 100));

  // Handle the case where the iframe finished loading before this ran.
  try {
    if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') onReady();
  } catch (e) { /* ignore */ }
}

// Keep the copyright year current instead of hardcoding it.
function setFooterYear() {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
}

// Toggle the navbar dropdowns on click/touch/keyboard (hover is handled in CSS).
function initNavDropdowns() {
  const items = Array.from(document.querySelectorAll('.navbar__item.has-dd'));
  if (!items.length) return;

  const closeAll = (except) => {
    items.forEach((item) => {
      if (item === except) return;
      item.classList.remove('is-open');
      const btn = item.querySelector('.navbar__link');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  };

  items.forEach((item) => {
    const btn = item.querySelector('.navbar__link');
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      closeAll(item);
    });
  });

  // Close when clicking a dropdown link or anywhere outside the nav.
  document.addEventListener('click', () => closeAll(null));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll(null);
  });
}

// Pin the navbar to the top once the user scrolls past the header.
function initStickyNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('navbar--sticky', window.scrollY > 135);
  };

  window.addEventListener('scroll', onScroll);
  onScroll();
}

// Open/close the contact modal and handle submission.
function initContactModal() {
  const modal = document.getElementById('contact-modal');
  const form = document.getElementById('contact-form');
  const status = document.getElementById('contact-status');
  if (!modal || !form) return;

  const open = () => {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
  };

  const close = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
  };

  document.querySelectorAll('[data-open-contact]').forEach((el) =>
    el.addEventListener('click', (e) => { e.preventDefault(); open(); })
  );
  document.querySelectorAll('[data-close-contact]').forEach((el) =>
    el.addEventListener('click', close)
  );

  // Close on Escape.
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    setStatus(status, '', '');

    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };

    const sendBtn = form.querySelector('.btn--send');
    if (sendBtn) sendBtn.disabled = true;

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Request failed');

      form.reset();
      setStatus(status, 'Thanks! Your message has been sent.', 'is-success');
      setTimeout(close, 1500);
    } catch (err) {
      setStatus(status, 'Something went wrong. Please call us at 330-993-0416.', 'is-error');
    } finally {
      if (sendBtn) sendBtn.disabled = false;
    }
  });
}

function setStatus(el, message, className) {
  if (!el) return;
  el.textContent = message;
  el.className = 'contact-form__status' + (className ? ' ' + className : '');
}

// Load the gallery manifest, render the grid, then wire filters + lightbox.
// "Our Work" as a compact highlight reel: pick a category, step through
// photo-by-photo, and auto-play random photos (screensaver style) when idle.
async function initPortfolio() {
  const reel = document.getElementById('reel');
  const imgEl = document.getElementById('reel-img');
  const catEl = document.getElementById('reel-cat');
  const countEl = document.getElementById('reel-count');
  const empty = document.getElementById('portfolio-empty');
  if (!reel || !imgEl) return;

  let all = [];
  try {
    const res = await fetch('assets/gallery/manifest.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error('manifest missing');
    all = await res.json();
  } catch (err) {
    if (empty) { empty.hidden = false; empty.textContent = 'Portfolio is being updated — check back soon.'; }
    reel.style.display = 'none';
    return;
  }

  const labels = {
    all: 'All work', kitchen: 'Kitchens', bath: 'Bathrooms', basement: 'Basements',
    exterior: 'Exteriors', interior: 'Interiors', detail: 'Details', process: 'In progress',
  };

  let category = 'all';
  let list = all.slice();
  let index = 0;
  let hovered = false;
  let lbOpen = false;
  let lastManual = 0;

  const render = () => {
    const item = list[index];
    if (!item) return;
    const next = new Image();
    next.onload = () => {
      imgEl.src = next.src;
      imgEl.alt = item.alt;
      imgEl.classList.remove('is-fading');
    };
    imgEl.classList.add('is-fading');
    next.src = 'assets/gallery/' + item.file;
    catEl.textContent = labels[item.cat] || item.cat;
    countEl.textContent = (index + 1) + ' / ' + list.length;
  };

  const go = (delta) => {
    if (!list.length) return;
    index = (index + delta + list.length) % list.length;
    render();
  };
  const goRandom = () => {
    if (list.length < 2) return;
    let r;
    do { r = Math.floor(Math.random() * list.length); } while (r === index);
    index = r;
    render();
  };
  const setCategory = (cat) => {
    category = cat;
    list = category === 'all' ? all : all.filter((m) => m.cat === category);
    index = 0;
    render();
  };
  const mark = () => { lastManual = Date.now(); };

  // Screensaver: auto-advance to a random photo only when idle.
  const canAuto = () => !hovered && !lbOpen && !document.hidden && (Date.now() - lastManual > 8000);
  setInterval(() => { if (canAuto()) goRandom(); }, 4200);

  // Category chips
  const chips = document.querySelectorAll('.filter-btn');
  chips.forEach((btn) =>
    btn.addEventListener('click', () => {
      chips.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      setCategory(btn.dataset.filter);
      mark();
    })
  );

  // Manual step-through
  reel.querySelector('.reel__prev').addEventListener('click', () => { go(-1); mark(); });
  reel.querySelector('.reel__next').addEventListener('click', () => { go(1); mark(); });
  reel.addEventListener('mouseenter', () => { hovered = true; });
  reel.addEventListener('mouseleave', () => { hovered = false; });

  // Lightbox (full-size) — click the reel photo
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbCap = document.getElementById('lightbox-caption');
  const showLb = () => {
    const item = list[index];
    lbImg.src = 'assets/gallery/' + item.file;
    lbImg.alt = item.alt;
    lbCap.textContent = labels[item.cat] || item.cat;
  };
  const openLb = () => {
    if (!lightbox) return;
    lbOpen = true;
    showLb();
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
  };
  const closeLb = () => {
    if (!lightbox) return;
    lbOpen = false;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
  };
  imgEl.addEventListener('click', openLb);
  if (lightbox) {
    lightbox.querySelector('.lightbox__close').addEventListener('click', closeLb);
    lightbox.querySelector('.lightbox__next').addEventListener('click', (e) => { e.stopPropagation(); go(1); showLb(); });
    lightbox.querySelector('.lightbox__prev').addEventListener('click', (e) => { e.stopPropagation(); go(-1); showLb(); });
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLb(); });
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowRight') { go(1); showLb(); }
      if (e.key === 'ArrowLeft') { go(-1); showLb(); }
    });
  }

  const active = document.querySelector('.filter-btn.is-active');
  setCategory(active ? active.dataset.filter : (chips[0] ? chips[0].dataset.filter : 'kitchen'));
}

// Collapse the navbar into a hamburger menu on narrow screens.
function initHamburger() {
  const nav = document.getElementById('navbar');
  const toggle = document.getElementById('nav-toggle');
  if (!nav || !toggle) return;

  const close = () => {
    nav.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = nav.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Tapping a real link (dropdown item) closes the whole menu.
  nav.querySelectorAll('.dropdown a').forEach((a) => a.addEventListener('click', close));

  // Outside click / Escape closes it.
  document.addEventListener('click', (e) => { if (!nav.contains(e.target)) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
}

// Drag the range slider to wipe between before and after images.
function initBeforeAfter() {
  document.querySelectorAll('.ba-slider').forEach((slider) => {
    const range = slider.querySelector('.ba-range');
    const clip = slider.querySelector('.ba-clip');
    const handle = slider.querySelector('.ba-handle');
    if (!range || !clip) return;

    const update = () => {
      const v = range.value;
      clip.style.clipPath = `inset(0 ${100 - v}% 0 0)`;
      handle.style.left = `${v}%`;
    };

    range.addEventListener('input', update);
    update();
  });
}
