// API endpoint for the contact form (see server.js). Falls back to same-origin.
const API_URL = window.API_URL || '';

document.addEventListener('DOMContentLoaded', () => {
  setFooterYear();
  initStickyNavbar();
  initContactModal();
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
