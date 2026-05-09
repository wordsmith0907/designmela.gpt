/* ============================================
   DESIGNMELA — Interactions
   ============================================ */

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Sticky nav style on scroll
const nav = document.getElementById('nav');
const onScroll = () => {
  if (window.scrollY > 30) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal, .section-head, .project-card, .service-card, .about-image, .about-content, .contact-intro, .contact-form');
revealEls.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => io.observe(el));

// Project hover video preview (graceful fallback for browsers that block autoplay)
document.querySelectorAll('.project-card').forEach(card => {
  const video = card.querySelector('video');
  if (!video) return;
  card.addEventListener('mouseenter', () => {
    try { video.currentTime = 0; const p = video.play(); if (p) p.catch(() => {}); } catch (e) {}
  });
  card.addEventListener('mouseleave', () => {
    try { video.pause(); video.currentTime = 0; } catch (e) {}
  });
});

// Subtle tilt / parallax on cards
const tiltEls = document.querySelectorAll('[data-tilt]');
tiltEls.forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-6px)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = '';
  });
});

// Contact form (frontend-only success)
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!name || !email || !message) {
      form.querySelectorAll('input, textarea').forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = '#ff6b6b';
          setTimeout(() => { field.style.borderColor = ''; }, 1800);
        }
      });
      return;
    }
    const success = document.getElementById('formSuccess');
    success.classList.add('show');
    form.reset();
    setTimeout(() => success.classList.remove('show'), 6000);
  });
}

// Custom cursor
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
if (cursor && cursorDot && window.matchMedia('(pointer: fine)').matches) {
  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let cx = mx, cy = my;
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    cursorDot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
  });
  const tick = () => {
    cx += (mx - cx) * 0.18;
    cy += (my - cy) * 0.18;
    cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    requestAnimationFrame(tick);
  };
  tick();

  document.querySelectorAll('a, button, .project-card, .service-card, input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}


// Enhanced section reveal
const revealSections = document.querySelectorAll('.reveal-section');

const sectionObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('active');
    }
  });
},{threshold:0.15});

revealSections.forEach(section=>{
  sectionObserver.observe(section);
});


// Contact form enhancement
const contactForm = document.querySelector('form');
const successMsg = document.getElementById('form-success-message');

if(contactForm){
  contactForm.addEventListener('submit', function(){
    const btn = contactForm.querySelector('button[type="submit"]');
    if(btn){
      btn.innerText = 'Sending...';
      btn.disabled = true;
    }
  });
}

const params = new URLSearchParams(window.location.search);
if(params.get('success') === 'true' && successMsg){
  successMsg.style.display = 'block';
}
