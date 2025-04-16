// script.js - Full Navbar Fade Edition

document.addEventListener('DOMContentLoaded', function () {
  // Configuration
  const elements = {
    navbar: document.querySelector('.navbar'),
    parallax: {
      hero: document.querySelector('.hero-background'),
      footer: document.querySelector('.footer-background')
    },
    thresholds: {
      fadeStart: 100,
      fadeEnd: 300
    }
  };

  // ===== NAVBAR FADE SYSTEM =====
  const updateNavbarOpacity = (scrollPos) => {
    if (!elements.navbar) return;

    let opacity = 1 - Math.min(
      Math.max(scrollPos - elements.thresholds.fadeStart, 0) /
      (elements.thresholds.fadeEnd - elements.thresholds.fadeStart),
      1
    );

    elements.navbar.style.setProperty('--navbar-opacity', opacity);
    elements.navbar.style.opacity = opacity;
    elements.navbar.style.pointerEvents = opacity < 0.3 ? 'none' : 'auto';
  };

  // ===== PARALLAX SYSTEM =====
  const updateParallax = (scrollPos) => {
    if (elements.parallax.hero) {
      elements.parallax.hero.style.transform = `translateY(${scrollPos * 0.4}px)`;
    }
    if (elements.parallax.footer) {
      elements.parallax.footer.style.transform = `translateY(-${scrollPos * 0.15}px)`;
    }
  };

  // ===== SCROLL HANDLER =====
  const handleScroll = () => {
    const scrollPos = window.pageYOffset;
    updateNavbarOpacity(scrollPos);
    updateParallax(scrollPos);
  };

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleScroll);
  handleScroll();

  // ========== SMOOTH SCROLLING ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ========== INTERACTIVE ELEMENTS ==========
  document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('mousemove', function (e) {
      const rect = button.getBoundingClientRect();
      button.style.setProperty('--x', `${e.clientX - rect.left}px`);
      button.style.setProperty('--y', `${e.clientY - rect.top}px`);
    });
  });

  document.querySelectorAll('.dish-image img, .exterior-image img').forEach(img => {
    img.addEventListener('mousemove', (e) => {
      const rect = img.getBoundingClientRect();
      img.style.transformOrigin =
        `${(e.clientX - rect.left) / rect.width * 100}% ${(e.clientY - rect.top) / rect.height * 100}%`;
    });

    img.addEventListener('mouseleave', () => {
      img.style.transformOrigin = 'center center';
    });
  });

  // ========== CURRENT YEAR ==========
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // ========== MOBILE NAVIGATION ==========
  const hamburger = document.querySelector('.hamburger-menu');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('active');
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        mobileNav.classList.remove('active');
      }
    });

    // Close mobile nav when a nav link is clicked
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
      });
    });
  }
});
