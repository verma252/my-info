
/* ==========================================
   LAKSHIT PORTFOLIO - MAIN JAVASCRIPT
   Mobile Navigation + Animations + Lightbox
========================================== */

// ==========================================
// 1. MOBILE NAVIGATION
// ==========================================

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

// Close mobile navigation
function closeMenu() {
  if (!menuButton || !nav) return;

  nav.classList.remove('open');
  menuButton.classList.remove('active');

  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}

// Open and close navigation
if (menuButton && nav) {
  menuButton.addEventListener('click', (event) => {
    event.stopPropagation();

    const isOpen = nav.classList.toggle('open');

    menuButton.classList.toggle('active', isOpen);

    menuButton.setAttribute(
      'aria-expanded',
      String(isOpen)
    );

    menuButton.setAttribute(
      'aria-label',
      isOpen ? 'Close navigation' : 'Open navigation'
    );
  });

  // Close when navigation link is clicked
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close when user scrolls the website
  window.addEventListener('scroll', () => {
    if (nav.classList.contains('open')) {
      closeMenu();
    }
  }, { passive: true });

  // Close when clicking outside navigation
  document.addEventListener('click', (event) => {
    if (
      nav.classList.contains('open') &&
      !nav.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      closeMenu();
    }
  });

  // Close when screen becomes desktop size
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      closeMenu();
    }
  });

  // Close navigation using Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });
}


// ==========================================
// 2. AUTOMATIC COPYRIGHT YEAR
// ==========================================

const yearElement = document.getElementById('year');

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// ==========================================
// 3. SMOOTH SCROLL REVEAL ANIMATIONS
// ==========================================

const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {

  const observer = new IntersectionObserver(
    (entries, obs) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }

      });

    },
    {
      threshold: 0.12
    }
  );

  revealItems.forEach(item => {
    observer.observe(item);
  });

} else {

  revealItems.forEach(item => {
    item.classList.add('visible');
  });

}


// ==========================================
// 4. CERTIFICATE IMAGE LIGHTBOX
// ==========================================

const lightbox = document.getElementById('lightbox');
const lightboxClose = document.querySelector('.lightbox-close');

let lightboxTrigger = null;

// Close certificate lightbox
function closeLightbox() {
  if (!lightbox) return;

  lightbox.hidden = true;

  document.body.classList.remove('lightbox-open');

  if (lightboxTrigger) {
    lightboxTrigger.focus();
  }
}

// Open certificate lightbox
if (lightbox && lightboxClose) {

  document.querySelectorAll('[data-lightbox]').forEach(link => {

    link.addEventListener('click', event => {

      event.preventDefault();

      lightboxTrigger = link;

      lightbox.hidden = false;

      document.body.classList.add('lightbox-open');

      lightboxClose.focus();

    });

  });

  // Close button
  lightboxClose.addEventListener('click', closeLightbox);

  // Close on background click
  lightbox.addEventListener('click', event => {

    if (event.target === lightbox) {
      closeLightbox();
    }

  });

  // Close using Escape key
  document.addEventListener('keydown', event => {

    if (
      event.key === 'Escape' &&
      !lightbox.hidden
    ) {
      closeLightbox();
    }

  });

}
