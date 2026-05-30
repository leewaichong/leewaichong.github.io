/* Refined interactions: scroll reveals, nav state, smooth anchors, year. */
(function () {
  'use strict';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Footer year
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  // Nav scrolled state
  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Scroll reveal (staggered within a section)
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const sibs = Array.from(e.target.parentElement.querySelectorAll(':scope > .reveal'));
          const i = Math.max(0, sibs.indexOf(e.target));
          e.target.style.transitionDelay = Math.min(i * 70, 280) + 'ms';
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('in'));
  }

  // Typewriter cycling line in hero
  const tw = document.getElementById('tw');
  if (tw) {
    const phrases = ['building vision systems', 'shipping AI agents', 'automating work & life', 'C++ · Go · Rust · Python'];
    if (reduceMotion) {
      tw.textContent = phrases[0];
    } else {
      let p = 0, c = 0, deleting = false;
      const tick = () => {
        const full = phrases[p];
        c += deleting ? -1 : 1;
        tw.textContent = full.slice(0, c);
        let delay = deleting ? 38 : 72;
        if (!deleting && c === full.length) { delay = 1700; deleting = true; }
        else if (deleting && c === 0) { deleting = false; p = (p + 1) % phrases.length; delay = 350; }
        setTimeout(tick, delay);
      };
      setTimeout(tick, 700);
    }
  }

  // Mouse parallax on background layers (desktop, fine pointer)
  const stars = document.querySelector('.stars');
  const floor = document.querySelector('.grid-floor');
  if ((stars || floor) && window.matchMedia('(pointer: fine)').matches && !reduceMotion) {
    document.addEventListener('mousemove', (e) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      if (stars) stars.style.transform = `translate(${x * 12}px, ${y * 12}px)`;
      if (floor) floor.style.transform = `translateX(${x * -8}px)`;
    }, { passive: true });
  }

  // Smooth anchor scroll
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const t = document.querySelector(id);
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' }); }
    });
  });
})();
