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

  // ===== HERO LOGO LOAD HANDLER =====
  const initLogoAnimation = () => {
    const heroLogo = document.querySelector('.hero-logo');
    const heroBg = document.querySelector('.hero-background');

    if (!heroLogo || !heroBg) return;

    // Extract background image URL
    const bgUrl = getComputedStyle(heroBg).backgroundImage
      .replace(/url\(["']?/, '')
      .replace(/["']?\)/, '');

    // Create image load promises
    const promises = [
      new Promise(resolve => {
        heroLogo.complete ? resolve() : heroLogo.addEventListener('load', resolve);
      }),
      new Promise(resolve => {
        const img = new Image();
        img.src = bgUrl;
        img.complete ? resolve() : img.addEventListener('load', resolve);
      })
    ];

    // Trigger animation when both load
    Promise.all(promises).then(() => {
      heroLogo.classList.add('loaded');
    });
  };

  // Initialize after DOM loads
  initLogoAnimation();

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
  const closeMenu = document.querySelector('.close-menu');

  if (hamburger && mobileNav && closeMenu) {
    // Open menu
    hamburger.addEventListener('click', () => {
      mobileNav.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    });

    // Close menu function
    const closeMobileMenu = () => {
      mobileNav.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
    };

    // Close menu triggers
    closeMenu.addEventListener('click', closeMobileMenu);
    
    // Click outside menu
    document.addEventListener('click', (e) => {
      if (mobileNav.classList.contains('active') && 
          !e.target.closest('.nav-links') && 
          !e.target.closest('.hamburger-menu')) {
        closeMobileMenu();
      }
    });

    // Handle link clicks
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
        // Handle current page link
        if (link.getAttribute('href') === '#') {
          e.preventDefault();
        }
        
        // Close menu after click
        closeMobileMenu();
        
        // Handle anchor links
        if (link.getAttribute('href').startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(link.getAttribute('href'));
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });

    // Window resize handler
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        closeMobileMenu();
      }
    });
  }
});