// Project buttons without a link yet show "Coming soon"
document.querySelectorAll('a[data-soon]').forEach(a => {
  if (!a.getAttribute('href').trim()) {
    a.removeAttribute('href'); a.removeAttribute('target');
    a.classList.add('soon'); a.setAttribute('aria-disabled', 'true');
    a.insertAdjacentHTML('beforeend', '<em>Coming soon</em>');
  }
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Fallback if a tool logo fails to load
document.querySelectorAll('.tool .logo img').forEach(img => {
  img.addEventListener('error', () => {
    const s = document.createElement('span');
    s.className = 'fallback';
    s.textContent = img.alt.slice(0, 2).toUpperCase();
    img.replaceWith(s);
  });
});

// Reveal on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Active nav link on scroll
const links = document.querySelectorAll('.nav a');
const sections = [...links].map(a => document.querySelector(a.getAttribute('href')));
const navIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => s && navIO.observe(s));

// Contact form: sends messages to your inbox through Formspree (no page reload)
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');
const btn = form.querySelector('button[type="submit"]');
form.addEventListener('submit', async e => {
  e.preventDefault();
  const data = new FormData(form);
  data.set('_subject', (data.get('reason') || 'Message') + ' — from ' + (data.get('name') || 'a visitor') + ' (portfolio)');
  btn.disabled = true; btn.textContent = 'Sending…';
  statusEl.className = 'form-status'; statusEl.textContent = '';
  try {
    const res = await fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
    if (res.ok) {
      form.reset();
      statusEl.className = 'form-status ok';
      statusEl.textContent = 'Thanks! Your message has been sent — I’ll get back to you soon.';
    } else {
      const json = await res.json().catch(() => ({}));
      throw new Error(json.errors ? json.errors.map(x => x.message).join(', ') : 'Request failed');
    }
  } catch (err) {
    statusEl.className = 'form-status err';
    statusEl.innerHTML = 'Sorry, the message couldn’t be sent. Please email me directly at <a href="mailto:mustapha8contact@gmail.com">mustapha8contact@gmail.com</a>.';
  } finally {
    btn.disabled = false; btn.textContent = 'Send message';
  }
});
