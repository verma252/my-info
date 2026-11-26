// Mobile navigation, smooth reveal and small page enhancements.
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('visible'));
}

// Close the mobile/tablet menu when the screen becomes laptop-sized.
window.addEventListener('resize', () => {
  if (window.innerWidth > 1024 && nav.classList.contains('open')) {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  }
});

// Accessible image lightbox for internship certificate.
const lightbox = document.getElementById('lightbox');
const lightboxClose = document.querySelector('.lightbox-close');
let lightboxTrigger = null;
function closeLightbox() {
  lightbox.hidden = true;
  document.body.classList.remove('lightbox-open');
  if (lightboxTrigger) lightboxTrigger.focus();
}
document.querySelectorAll('[data-lightbox]').forEach(link => link.addEventListener('click', event => {
  event.preventDefault();
  lightboxTrigger = link;
  lightbox.hidden = false;
  document.body.classList.add('lightbox-open');
  lightboxClose.focus();
}));
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !lightbox.hidden) closeLightbox(); });

// Close the mobile navigation as soon as the user scrolls.
window.addEventListener('scroll', () => {
  if (nav && nav.classList.contains('open')) {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  }
}, { passive: true });

// Close the menu on outside click or Escape.
document.addEventListener('click', event => {
  if (nav && nav.classList.contains('open') && !nav.contains(event.target) && !menuButton.contains(event.target)) {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav && nav.classList.contains('open')) {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  }
});
