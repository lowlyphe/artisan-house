// API endpoint for the contact form (see server.js). Falls back to same-origin.
const API_URL = window.API_URL || '';

document.addEventListener('DOMContentLoaded', () => {
  setFooterYear();
  initStickyNavbar();
  initContactModal();
  initPortfolio();
  initBeforeAfter();
});

// Keep the copyright year current instead of hardcoding it.
function setFooterYear() {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
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
    el.addEventListener('click', open)
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
async function initPortfolio() {
  const grid = document.getElementById('portfolio-grid');
  const empty = document.getElementById('portfolio-empty');
  if (!grid) return;

  let items = [];
  try {
    const res = await fetch('assets/gallery/manifest.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error('manifest missing');
    items = await res.json();
  } catch (err) {
    if (empty) { empty.hidden = false; empty.textContent = 'Portfolio is being updated — check back soon.'; }
    return;
  }

  const labels = {
    kitchen: 'Kitchen', bath: 'Bathroom', basement: 'Basement',
    exterior: 'Exterior', interior: 'Interior', detail: 'Detail', process: 'In progress',
  };

  const frag = document.createDocumentFragment();
  items.forEach((it) => {
    const fig = document.createElement('figure');
    fig.className = 'portfolio__item';
    fig.dataset.cat = it.cat;
    const img = document.createElement('img');
    img.src = 'assets/gallery/' + it.file;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.alt = it.alt;
    const cap = document.createElement('figcaption');
    cap.textContent = labels[it.cat] || it.cat;
    fig.append(img, cap);
    frag.appendChild(fig);
  });
  grid.appendChild(frag);

  initPortfolioFilters();
  initLightbox();
}

// Filter the portfolio grid by service category.
function initPortfolioFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.portfolio__item');
  if (!buttons.length) return;

  buttons.forEach((btn) =>
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const filter = btn.dataset.filter;
      items.forEach((item) => {
        const show = filter === 'all' || item.dataset.cat === filter;
        item.classList.toggle('is-hidden', !show);
      });
    })
  );
}

// Click a portfolio photo to open it full-size, with prev/next and keyboard nav.
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const imgEl = document.getElementById('lightbox-img');
  const captionEl = document.getElementById('lightbox-caption');
  if (!lightbox || !imgEl) return;

  const items = Array.from(document.querySelectorAll('.portfolio__item img'));
  if (!items.length) return;
  let index = 0;

  const show = (i) => {
    index = (i + items.length) % items.length;
    const img = items[index];
    imgEl.src = img.src;
    imgEl.alt = img.alt;
    captionEl.textContent = img.alt.replace(/, Ohio$/, '');
  };

  const open = (i) => {
    show(i);
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
  };
  const close = () => {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
  };

  items.forEach((img, i) =>
    img.addEventListener('click', () => open(i))
  );

  lightbox.querySelector('.lightbox__close').addEventListener('click', close);
  lightbox.querySelector('.lightbox__next').addEventListener('click', (e) => { e.stopPropagation(); show(index + 1); });
  lightbox.querySelector('.lightbox__prev').addEventListener('click', (e) => { e.stopPropagation(); show(index - 1); });
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') show(index + 1);
    if (e.key === 'ArrowLeft') show(index - 1);
  });
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
