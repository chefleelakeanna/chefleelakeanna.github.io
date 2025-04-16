// script.js - Full Navbar Fade Edition

document.addEventListener('DOMContentLoaded', function() {
  // Configuration
  const elements = {
    navbar: document.querySelector('.navbar'),
    parallax: {
      hero: document.querySelector('.hero-background'),
      footer: document.querySelector('.footer-background')
    },
    thresholds: {
      fadeStart: 100,    // Start fading after 100px scroll
      fadeEnd: 300       // Fully faded at 300px scroll
    }
  };

  // ===== NAVBAR FADE SYSTEM =====
  const updateNavbarOpacity = (scrollPos) => {
    if (!elements.navbar) return;

    // Calculate opacity (1 = fully visible, 0 = invisible)
    let opacity = 1 - Math.min(
      Math.max(scrollPos - elements.thresholds.fadeStart, 0) / 
      (elements.thresholds.fadeEnd - elements.thresholds.fadeStart), 
      1
    );

    // Apply to entire navbar and children
    elements.navbar.style.setProperty('--navbar-opacity', opacity);
    elements.navbar.style.opacity = opacity;
    
    // Toggle pointer events
    elements.navbar.style.pointerEvents = opacity < 0.3 ? 'none' : 'auto';
  };

  // ===== PARALLAX SYSTEM =====
  const updateParallax = (scrollPos) => {
    // Hero background
    if(elements.parallax.hero) {
      elements.parallax.hero.style.transform = 
        `translateY(${scrollPos * 0.4}px)`;
    }

    // Footer background
    if(elements.parallax.footer) {
      elements.parallax.footer.style.transform = 
        `translateY(-${scrollPos * 0.15}px)`;
    }
  };

  // ===== SCROLL HANDLER =====
  const handleScroll = () => {
    const scrollPos = window.pageYOffset;
    updateNavbarOpacity(scrollPos);
    updateParallax(scrollPos);
  };

  // Event listeners
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleScroll);
  handleScroll(); // Initial call
});


// ========== SMOOTH SCROLLING ========== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ========== INTERACTIVE ELEMENTS ==========
// Button hover effect
document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('mousemove', function(e) {
    const rect = button.getBoundingClientRect();
    button.style.setProperty('--x', `${e.clientX - rect.left}px`);
    button.style.setProperty('--y', `${e.clientY - rect.top}px`);
  });
});

// Image zoom effect
document.querySelectorAll('.dish-image img, .exterior-image img').forEach(img => {
  img.addEventListener('mousemove', (e) => {
    const rect = img.getBoundingClientRect();
    img.style.transformOrigin = 
      `${(e.clientX - rect.left)/rect.width*100}% ${(e.clientY - rect.top)/rect.height*100}%`;
  });

  img.addEventListener('mouseleave', () => {
    img.style.transformOrigin = 'center center';
  });
});

// Get current year
document.addEventListener('DOMContentLoaded', function() {
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger-menu');
const mobileNav = document.querySelector('.mobile-nav');

hamburger.addEventListener('click', () => {
  mobileNav.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
    mobileNav.classList.remove('active');
  }
});

// Handle window resize
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    mobileNav.classList.remove('active');
  }
});