// ==========================================================================
// PORTFOLIO MODELO 3 - ANIME.JS V4 ANIMATIONS ENGINE (BENTO & NOTCHED ISLAND)
// ==========================================================================

class AnimationEngine {
  constructor() {
    this.anime = (typeof window !== "undefined" && window.anime) ? window.anime : null;
  }

  init() {
    if (!this.anime) {
      console.warn("Anime.js instance not found.");
      return;
    }

    this.initCustomCursor();
    this.initHeroEntrance();
    this.initMagneticPills();
    this.initScrollReveal();
    this.initPhysicsSpringDemo();
    this.initVisionLaser();
  }

  // 1. Custom Follower Cursor
  initCustomCursor() {
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    });

    const updateRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      requestAnimationFrame(updateRing);
    };
    requestAnimationFrame(updateRing);

    const clickables = document.querySelectorAll('a, button, input, .bento-card-large, .bento-card-small, .process-pill-row');
    clickables.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  // 2. Hero Staggered Entrance
  initHeroEntrance() {
    const anime = this.anime;
    if (!anime || !anime.animate) return;

    anime.animate('.hero-island', {
      opacity: [0, 1],
      translateY: [-20, 0],
      duration: 800,
      ease: 'out(3)'
    });

    anime.animate('.hero-status-tag, .pill-headline, .hero-intro-text, .hero-cta-group a', {
      opacity: [0, 1],
      translateY: [30, 0],
      delay: anime.stagger ? anime.stagger(100, { start: 200 }) : 200,
      duration: 800,
      ease: 'out(3)'
    });

    anime.animate('.hero-stat-card-wire', {
      opacity: [0, 1],
      translateX: [30, 0],
      delay: anime.stagger ? anime.stagger(150, { start: 400 }) : 400,
      duration: 800,
      ease: 'out(3)'
    });

    anime.animate('.hero-notch-container', {
      opacity: [0, 1],
      translateY: [20, 0],
      delay: 700,
      duration: 700,
      ease: 'out(3)'
    });
  }

  // 3. Magnetic Physics on Pill Buttons
  initMagneticPills() {
    const anime = this.anime;
    const magneticPills = document.querySelectorAll('.btn-pill-primary, .btn-pill-secondary, .pill-btn-switcher, .pill-btn-contact, .hero-notch-pill');

    magneticPills.forEach(pill => {
      pill.addEventListener('mousemove', (e) => {
        const rect = pill.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        anime.animate(pill, {
          translateX: x * 0.22,
          translateY: y * 0.22,
          duration: 180,
          ease: 'out(2)'
        });
      });

      pill.addEventListener('mouseleave', () => {
        anime.animate(pill, {
          translateX: 0,
          translateY: 0,
          duration: 600,
          ease: 'out(3)'
        });
      });
    });
  }

  // 4. Scroll Reveal for Bento Cards & Process Rows
  initScrollReveal() {
    const anime = this.anime;
    const elements = document.querySelectorAll('.bento-card-large, .bento-card-small, .process-pill-row, .folder-tab-container, .testimonial-island-card');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          anime.animate(entry.target, {
            opacity: [0, 1],
            translateY: [25, 0],
            duration: 700,
            ease: 'out(3)'
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    elements.forEach(el => {
      el.style.opacity = '0';
      observer.observe(el);
    });
  }

  // 5. Interactive Physics Spring Demo in Folder Tab
  initPhysicsSpringDemo() {
    const anime = this.anime;
    const card = document.querySelector('.physics-demo-card');
    const stiffnessInput = document.getElementById('spring-stiffness');
    const dampingInput = document.getElementById('spring-damping');
    const stiffnessVal = document.getElementById('val-stiffness');
    const dampingVal = document.getElementById('val-damping');

    if (!card) return;

    let isDragging = false;
    let startX = 0, startY = 0;
    let currentX = 0, currentY = 0;

    const getSpringEase = () => {
      const stiffness = stiffnessInput ? parseFloat(stiffnessInput.value) : 120;
      const damping = dampingInput ? parseFloat(dampingInput.value) : 12;
      return anime.spring ? anime.spring({ stiffness, damping }) : 'out(3)';
    };

    if (stiffnessInput && stiffnessVal) {
      stiffnessInput.addEventListener('input', (e) => {
        stiffnessVal.textContent = e.target.value;
      });
    }

    if (dampingInput && dampingVal) {
      dampingInput.addEventListener('input', (e) => {
        dampingVal.textContent = e.target.value;
      });
    }

    card.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX - currentX;
      startY = e.clientY - currentY;
      card.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      currentX = e.clientX - startX;
      currentY = e.clientY - startY;

      anime.animate(card, {
        translateX: currentX,
        translateY: currentY,
        rotate: currentX * 0.08,
        duration: 0
      });
    });

    window.addEventListener('mouseup', () => {
      if (!isDragging) return;
      isDragging = false;
      card.style.cursor = 'grab';
      currentX = 0;
      currentY = 0;

      anime.animate(card, {
        translateX: 0,
        translateY: 0,
        rotate: 0,
        duration: 800,
        ease: getSpringEase()
      });
    });
  }

  // 6. RPA Laser Scanner
  initVisionLaser() {
    const anime = this.anime;
    const laser = document.querySelector('.cv-laser-line');
    if (!laser || !anime.animate) return;

    anime.animate(laser, {
      translateY: [0, 175],
      duration: 1800,
      loop: true,
      alternate: true,
      ease: 'inOut(2)'
    });
  }
}

if (typeof window !== "undefined") {
  window.AnimationEngine = AnimationEngine;
}
