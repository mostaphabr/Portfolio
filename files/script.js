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

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Staggered groups: give every child its index (used for the delay in CSS)
document.querySelectorAll('.stagger').forEach(group => {
  [...group.children].forEach((el, i) => el.style.setProperty('--i', i));
});

// Stats count up from 0
function countUp(scope) {
  if (reduceMotion) return;
  scope.querySelectorAll('[data-count]').forEach((el, i) => {
    const end = +el.dataset.count;
    const prefix = el.dataset.prefix || '';
    const duration = 1400;
    el.textContent = prefix + '0';
    setTimeout(() => {
      const start = performance.now();
      const tick = now => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3); // ease-out
        el.textContent = prefix + Math.round(end * eased);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, 450 + i * 80);
  });
}

// Reveal on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    el.classList.add('in');
    io.unobserve(el);
    if (el.classList.contains('stagger')) {
      // once every child is in, hand the cards their normal hover transitions back
      setTimeout(() => el.classList.add('done'), el.children.length * 70 + 1600);
    }
    if (el.classList.contains('stats')) countUp(el);
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Project thumbnails: play on hover (desktop) or while on screen (touch)
const canHover = window.matchMedia('(hover: hover)').matches;
const projects = document.querySelectorAll('.project');
if (canHover) {
  projects.forEach(p => {
    p.addEventListener('mouseenter', () => p.classList.add('play'));
    p.addEventListener('mouseleave', () => p.classList.remove('play'));
  });
} else if (!reduceMotion) {
  const playIO = new IntersectionObserver(entries => {
    entries.forEach(e => e.target.classList.toggle('play', e.isIntersecting));
  }, { threshold: 0.5 });
  projects.forEach(p => playIO.observe(p));
}

// Light / dark mode
// (the starting theme is set by the small script in <head> so the page never flashes)
const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const themeMeta = document.querySelector('meta[name="theme-color"]');
const isLight = () => root.getAttribute('data-theme') === 'light';
function syncThemeUI() {
  const next = isLight() ? 'Dark mode' : 'Light mode';
  themeToggle.dataset.label = next;
  themeToggle.setAttribute('aria-label', 'Switch to ' + next.toLowerCase());
  if (themeMeta) themeMeta.setAttribute('content', isLight() ? '#f3f2ee' : '#0b0b0b');
}
function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  syncThemeUI();
}
function switchTheme(theme, x, y) {
  if (reduceMotion) return applyTheme(theme);
  if (!document.startViewTransition) {
    // older browsers: fade the colors
    root.classList.add('theme-anim');
    applyTheme(theme);
    setTimeout(() => root.classList.remove('theme-anim'), 450);
    return;
  }
  // new theme grows as a circle from the toggle button
  const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  const vt = document.startViewTransition(() => applyTheme(theme));
  vt.ready.then(() => {
    root.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
      { duration: 650, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)', pseudoElement: '::view-transition-new(root)' }
    );
  }).catch(() => {});
}
syncThemeUI();
themeToggle.addEventListener('click', () => {
  const next = isLight() ? 'dark' : 'light';
  try { localStorage.setItem('theme', next); } catch (err) {}
  const b = themeToggle.getBoundingClientRect();
  switchTheme(next, b.left + b.width / 2, b.top + b.height / 2);
});
// start loading the other photo as soon as someone reaches for the toggle
const preloadOtherPhoto = () => {
  const other = document.querySelector(isLight() ? '.photo-dark' : '.photo-light');
  if (other) other.loading = 'eager';
};
['pointerenter', 'focus', 'touchstart'].forEach(ev => themeToggle.addEventListener(ev, preloadOtherPhoto, { passive: true }));
// keep following the system setting until the visitor picks a theme themselves
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
  let saved = null;
  try { saved = localStorage.getItem('theme'); } catch (err) {}
  if (saved !== 'light' && saved !== 'dark') applyTheme(e.matches ? 'light' : 'dark');
});

// Nav: a pill that slides to the hovered / active icon
const nav = document.querySelector('.nav');
const links = nav.querySelectorAll('a');
const pill = document.createElement('span');
pill.className = 'nav-pill';
pill.setAttribute('aria-hidden', 'true');
nav.prepend(pill);
let hovered = null;
function movePill(a, instant) {
  if (!a) return;
  if (instant) nav.classList.add('no-anim');
  pill.style.width = a.offsetWidth + 'px';
  pill.style.height = a.offsetHeight + 'px';
  pill.style.transform = `translate(${a.offsetLeft}px, ${a.offsetTop}px)`;
  if (instant) { void pill.offsetWidth; nav.classList.remove('no-anim'); }
}
const activeLink = () => nav.querySelector('a.active');
movePill(activeLink(), true);
nav.classList.add('has-pill');
links.forEach(a => {
  a.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') { hovered = a; movePill(a); } });
  a.addEventListener('click', () => { hovered = null; });
});
nav.addEventListener('pointerleave', () => { hovered = null; movePill(activeLink()); });
window.addEventListener('resize', () => movePill(hovered || activeLink(), true));

// Active nav link on scroll
const sections = [...links].map(a => document.querySelector(a.getAttribute('href')));
const navIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
      if (!hovered) movePill(activeLink());
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
