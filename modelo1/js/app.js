// Jordan Ronald - Core Interactions & Animations

(function() {
  'use strict';

  // --- Quotes for Skills Section ---
  const quotes = [
    "Building bridges between frontend magic and backend resilience.",
    "High-performance enterprise desktop & asynchronous system architectures.",
    "Zero-leak memory engineering, raw pointers and microsecond precision.",
    "Intelligent autonomous robotics replacing thousands of manual hours.",
    "Modern reactive state, fluid micro-interactions and silky 60fps UX.",
    "Distributed real-time synchronization, instant telemetry and scale.",
    "Clean contracts, robust security schemas and resilient microservices.",
    "From algorithmic complexity to UI frame drops, every millisecond counts."
  ];

  // ==========================================================================
  // WebGL Background Shader
  // ==========================================================================
  function initShaderBackground() {
    const canvas = document.querySelector('#webgl-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      
      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance',
        stencil: false,
        depth: false
      });

      const getScale = () => (window.innerWidth < 768 ? 0.5 : 0.75);
      
      function resize() {
        const scale = getScale();
        const w = window.innerWidth;
        const h = window.innerHeight;
        renderer.setSize(w * scale, h * scale, false);
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        if (uniforms && uniforms.u_resolution) {
          uniforms.u_resolution.value.set(w, h);
        }
      }

      const uniforms = {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        u_mouse: { value: new THREE.Vector2(0.5, 0.5) }
      };

      const vertexShader = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `;

      const fragmentShader = `
        uniform float u_time;
        uniform vec2 u_resolution;
        uniform vec2 u_mouse;
        varying vec2 vUv;

        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy));
          vec2 x0 = v - i + dot(i, C.xx);
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod289(i);
          vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
          vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
          m = m * m;
          m = m * m;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        void main() {
          vec2 st = vUv;
          vec2 mouse = u_mouse;

          float noise1 = snoise(st * 3.0 + u_time * 0.1 + mouse * 0.3);
          float noise2 = snoise(st * 2.0 - u_time * 0.15 + mouse * 0.2);
          float noise3 = snoise(st * 4.0 + u_time * 0.08);

          float finalNoise = (noise1 + noise2 * 0.5 + noise3 * 0.3) / 1.8;

          vec3 color1 = vec3(0.02, 0.02, 0.02);
          vec3 color2 = vec3(0.08, 0.10, 0.20);
          vec3 color3 = vec3(0.12, 0.15, 0.28);
          vec3 color4 = vec3(0.15, 0.08, 0.25);

          vec3 color = mix(color1, color2, smoothstep(-0.5, 0.5, finalNoise + st.y * 0.3));
          color = mix(color, color3, smoothstep(0.2, 0.8, noise2 + st.x * 0.2));
          color = mix(color, color4, smoothstep(0.4, 1.0, noise3) * 0.2);

          float vignette = 1.0 - length(st - 0.5) * 0.8;
          color *= vignette;

          float grain = fract(sin(dot(st * u_time * 0.001, vec2(12.9898, 78.233))) * 43758.5453) * 0.02;
          color += grain;

          gl_FragColor = vec4(color, 0.14);
        }
      `;

      const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        transparent: true,
        depthWrite: false
      });

      const geometry = new THREE.PlaneGeometry(2, 2);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      resize();

      const targetMouse = new THREE.Vector2(0.5, 0.5);
      window.addEventListener('mousemove', (e) => {
        targetMouse.x = e.clientX / window.innerWidth;
        targetMouse.y = 1.0 - (e.clientY / window.innerHeight);
      }, { passive: true });

      window.addEventListener('resize', resize, { passive: true });

      let animId;
      function render() {
        animId = requestAnimationFrame(render);
        uniforms.u_time.value += 0.008;
        uniforms.u_mouse.value.lerp(targetMouse, 0.03);
        renderer.render(scene, camera);
      }
      render();
    } catch(err) {
      console.warn('WebGL shader fallback:', err);
    }
  }

  // ==========================================================================
  // Custom Cursor
  // ==========================================================================
  function initCustomCursor() {
    if (window.innerWidth < 768) return;

    const trails = Array.from(document.querySelectorAll('.cursor-trail'));
    const cursorMain = document.querySelector('.cursor-main');
    const cursorDot = document.querySelector('.cursor-dot');
    let cursorLabel = cursorMain ? cursorMain.querySelector('span') : null;

    if (!cursorLabel && cursorMain) {
      cursorLabel = document.createElement('span');
      cursorLabel.style.cssText = 'font-size: 8px; font-weight: 700; color: #111111; letter-spacing: 0.1em; font-family: sans-serif; display: none;';
      cursorMain.appendChild(cursorLabel);
    }

    if (!cursorMain || !cursorDot) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX, dotY = mouseY;
    let mainX = mouseX, mainY = mouseY;
    const trailsPos = trails.map(() => ({ x: mouseX, y: mouseY }));
    let isVisible = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        cursorMain.style.opacity = '1';
        cursorDot.style.opacity = '1';
        trails.forEach((t, i) => t.style.opacity = `${0.18 - i * 0.03}`);
      }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      isVisible = false;
      cursorMain.style.opacity = '0';
      cursorDot.style.opacity = '0';
      trails.forEach(t => t.style.opacity = '0');
    });

    document.addEventListener('mouseenter', () => {
      isVisible = true;
      cursorMain.style.opacity = '1';
      cursorDot.style.opacity = '1';
      trails.forEach((t, i) => t.style.opacity = `${0.18 - i * 0.03}`);
    });

    // Render loop
    function renderCursor() {
      if (isVisible) {
        dotX += (mouseX - dotX) * 0.75;
        dotY += (mouseY - dotY) * 0.75;
        cursorDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;

        mainX += (mouseX - mainX) * 0.22;
        mainY += (mouseY - mainY) * 0.22;
        cursorMain.style.transform = `translate3d(${mainX}px, ${mainY}px, 0) translate(-50%, -50%)`;

        let prevX = mainX, prevY = mainY;
        for (let i = 0; i < trails.length; i++) {
          const factor = 0.28 - (i * 0.035);
          trailsPos[i].x += (prevX - trailsPos[i].x) * factor;
          trailsPos[i].y += (prevY - trailsPos[i].y) * factor;
          trails[i].style.transform = `translate3d(${trailsPos[i].x}px, ${trailsPos[i].y}px, 0) translate(-50%, -50%)`;
          prevX = trailsPos[i].x;
          prevY = trailsPos[i].y;
        }
      }
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    function setupHoverHandlers() {
      // 1. Projects - Scale 2.2 and show VIEW
      document.querySelectorAll('.split-project-item, .project-preview-item, .project-card, [data-cursor="view"]').forEach(item => {
        item.addEventListener('mouseenter', () => {
          if (cursorLabel) {
            cursorLabel.textContent = 'VIEW';
            cursorLabel.style.display = 'block';
          }
          if (typeof gsap !== 'undefined') {
            gsap.to(cursorMain, {
              scale: 2.2,
              backgroundColor: 'rgba(244, 244, 244, 0.95)',
              borderColor: '#ffffff',
              duration: 0.25,
              ease: 'power2.out',
              overwrite: 'auto'
            });
            gsap.to(cursorDot, { scale: 0, duration: 0.2, overwrite: 'auto' });
          }
        });

        item.addEventListener('mouseleave', () => {
          if (cursorLabel) {
            cursorLabel.textContent = '';
            cursorLabel.style.display = 'none';
          }
          if (typeof gsap !== 'undefined') {
            gsap.to(cursorMain, {
              scale: 1,
              backgroundColor: 'transparent',
              borderColor: 'rgba(244, 244, 244, 0.8)',
              duration: 0.25,
              ease: 'power2.out',
              overwrite: 'auto'
            });
            gsap.to(cursorDot, { scale: 1, duration: 0.2, overwrite: 'auto' });
          }
        });
      });

      // 2. Interactive buttons - Difference mode
      document.querySelectorAll('.magnetic-btn, .nav-pill, .side-badge, .bento-btn-gradient, .bento-btn-silver, .bento-menu-item, a, button').forEach(btn => {
        if (btn.closest('.split-project-item')) return;
        btn.addEventListener('mouseenter', () => {
          if (typeof gsap !== 'undefined') {
            gsap.to(cursorMain, {
              scale: 1.4,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderColor: '#ffffff',
              mixBlendMode: 'difference',
              duration: 0.25,
              ease: 'power2.out',
              overwrite: 'auto'
            });
            gsap.to(cursorDot, { scale: 0, duration: 0.2, overwrite: 'auto' });
          }
        });

        btn.addEventListener('mouseleave', () => {
          if (typeof gsap !== 'undefined') {
            gsap.to(cursorMain, {
              scale: 1,
              backgroundColor: 'transparent',
              borderColor: 'rgba(244, 244, 244, 0.8)',
              mixBlendMode: 'normal',
              duration: 0.25,
              ease: 'power2.out',
              overwrite: 'auto'
            });
            gsap.to(cursorDot, { scale: 1, duration: 0.2, overwrite: 'auto' });
          }
        });
      });
    }

    setupHoverHandlers();
  }

  // ==========================================================================
  // Magnetic Buttons
  // ==========================================================================
  function initMagneticButtons() {
    if (window.innerWidth < 768 || typeof gsap === 'undefined') return;

    document.querySelectorAll('.magnetic-btn, .magnetic-item').forEach(btn => {
      const inner = btn.querySelector('span') || btn.firstElementChild;
      const strength = 0.2;
      let ticking = false;

      btn.addEventListener('mousemove', (e) => {
        if (!ticking) {
          ticking = true;
          const rect = btn.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const dx = e.clientX - centerX;
          const dy = e.clientY - centerY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist > Math.min(rect.width, rect.height) * 1.5) {
            ticking = false;
            return;
          }

          const moveX = dx * strength;
          const moveY = dy * strength;

          requestAnimationFrame(() => {
            gsap.to(btn, { x: moveX, y: moveY, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
            if (inner && inner !== btn) {
              gsap.to(inner, { x: moveX * 0.25, y: moveY * 0.25, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
            }
            ticking = false;
          });
        }
      }, { passive: true });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)', overwrite: 'auto' });
        if (inner && inner !== btn) {
          gsap.to(inner, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)', overwrite: 'auto' });
        }
      });
    });
  }

  // ==========================================================================
  // Hero Animations
  // ==========================================================================
  function initHeroAnimations() {
    if (typeof gsap === 'undefined') return;

    // 1. Character by character entrance
    const chars = document.querySelectorAll('.text-heading .char');
    if (chars.length > 0) {
      gsap.fromTo(chars, 
        { y: 100, opacity: 0 }, 
        { y: 0, opacity: 1, stagger: 0.02, duration: 1.8, ease: 'power4.out', delay: 0.2 }
      );
    } else {
      gsap.fromTo('.hero-title, .text-heading', 
        { y: 60, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.5, ease: 'power4.out', delay: 0.2 }
      );
    }

    gsap.fromTo('.down', 
      { opacity: 0 }, 
      { opacity: 1, duration: 2, ease: 'power4.out', delay: 0.8 }
    );

    gsap.fromTo('.based-in', 
      { y: -10, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 2, ease: 'power4.out', delay: 1.2 }
    );

    // 2. Hero 3D Tilt (Throttled for 144Hz Smoothness)
    const tiltWrapper = document.querySelector('.hero-3d-wrap, .transform-gpu');
    if (tiltWrapper && window.innerWidth >= 768) {
      let tiltTicking = false;
      window.addEventListener('mousemove', (e) => {
        if (!tiltTicking) {
          tiltTicking = true;
          const c = 2 * (e.clientX / window.innerWidth - 0.5);
          const p = 2 * (e.clientY / window.innerHeight - 0.5);
          requestAnimationFrame(() => {
            gsap.to(tiltWrapper, {
              rotateY: c * 10,
              rotateX: -p * 10,
              x: c * 15,
              y: p * 15,
              duration: 0.4,
              ease: 'power2.out',
              overwrite: 'auto'
            });
            tiltTicking = false;
          });
        }
      }, { passive: true });

      document.addEventListener('mouseleave', () => {
        gsap.to(tiltWrapper, {
          rotateY: 0,
          rotateX: 0,
          x: 0,
          y: 0,
          duration: 0.8,
          ease: 'elastic.out(1, 0.5)',
          overwrite: 'auto'
        });
      });
    }

    // 3. Hero Scroll Scrub Dissolve
    const heroSec = document.querySelector('.hero-section');
    if (heroSec && typeof ScrollTrigger !== 'undefined') {
      gsap.to(heroSec, {
        opacity: 0.3,
        scale: 0.95,
        scrollTrigger: {
          trigger: heroSec,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });
    }

    // 4. Rotating Badges
    const scrollBadge = document.querySelector('.scroll-badge-wrap > div, .rotating-scroll, [style*="rotate(18.756deg)"]');
    if (scrollBadge) {
      gsap.to(scrollBadge, { rotation: 360, duration: 12, repeat: -1, ease: 'none' });
    }
    const centerAsterisk = document.querySelector('.center-asterisk, [style*="rotate(-18.756deg)"]');
    if (centerAsterisk) {
      gsap.to(centerAsterisk, { rotation: -360, duration: 12, repeat: -1, ease: 'none' });
    }
  }

  // ==========================================================================
  // Skills Animations
  // ==========================================================================
  function initSkillsSection() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const rows = document.querySelectorAll('.skill-row');
    if (!rows.length) return;

    rows.forEach((row) => {
      const desc = row.querySelector('.skill-desc');
      const title = row.querySelector('.skill-item, .about');

      ScrollTrigger.create({
        trigger: row,
        start: 'center 75%',
        end: 'center 25%',
        scrub: 0.7,
        onEnter: () => {
          if (desc) gsap.to(desc, { backgroundPositionX: '0%', duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
          if (title) gsap.to(title, { backgroundPositionX: '0%', duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
        },
        onEnterBack: () => {
          if (desc) gsap.to(desc, { backgroundPositionX: '0%', duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
          if (title) gsap.to(title, { backgroundPositionX: '0%', duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
        },
        onLeaveBack: () => {
          if (desc) gsap.to(desc, { backgroundPositionX: '100%', duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
          if (title) gsap.to(title, { backgroundPositionX: '100%', duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
        }
      });

      // Subtle interactive hover state
      row.addEventListener('mouseenter', () => {
        if (desc) gsap.to(desc, { backgroundPositionX: '0%', duration: 0.25, overwrite: 'auto' });
        if (title) gsap.to(title, { backgroundPositionX: '0%', duration: 0.25, overwrite: 'auto' });
      });

      row.addEventListener('mouseleave', () => {
        // If not in active viewport trigger range, ease back to subtle state
        const rect = row.getBoundingClientRect();
        const inActiveZone = rect.top >= window.innerHeight * 0.25 && rect.bottom <= window.innerHeight * 0.75;
        if (!inActiveZone) {
          if (desc) gsap.to(desc, { backgroundPositionX: '100%', duration: 0.3, overwrite: 'auto' });
          if (title) gsap.to(title, { backgroundPositionX: '100%', duration: 0.3, overwrite: 'auto' });
        }
      });
    });
  }

  // ==========================================================================
  // Projects Split Scroll
  // ==========================================================================
  function initProjectsSplit() {
    const flipCards = document.querySelectorAll('.bento-flip-card');
    const filterBtns = document.querySelectorAll('.bento-filter-btn');
    if (!flipCards.length) return;

    // 1. Reactive Spotlight & Mouse Tilt Physics
    flipCards.forEach(card => {
      let isTicking = false;

      card.addEventListener('mousemove', (e) => {
        if (!isTicking) {
          isTicking = true;
          requestAnimationFrame(() => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Set CSS custom properties for radial spotlight
            card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
            card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);

            // Subtle 3D tilt
            const normX = (x / rect.width) - 0.5;
            const normY = (y / rect.height) - 0.5;
            const inner = card.querySelector('.bento-flip-inner');
            if (inner && !card.classList.contains('flipped')) {
              inner.style.transform = `perspective(1000px) rotateY(${normX * 12}deg) rotateX(${-normY * 12}deg)`;
            }
            isTicking = false;
          });
        }
      }, { passive: true });

      card.addEventListener('mouseleave', () => {
        const inner = card.querySelector('.bento-flip-inner');
        if (inner && !card.classList.contains('flipped')) {
          inner.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
        }
      });

      // Mobile tap support: click toggles .flipped unless clicking a button/link inside back face
      card.addEventListener('click', (e) => {
        if (e.target.closest('a') || e.target.closest('button')) {
          return;
        }
        card.classList.toggle('flipped');
      });
    });

    // 2. Reactive Category Filtering
    if (filterBtns.length > 0) {
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const filter = btn.getAttribute('data-filter');
          
          // Update button active state
          filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          // Filter cards with fluid GSAP transition
          flipCards.forEach((card, idx) => {
            const category = card.getAttribute('data-category');
            const isMatch = filter === 'all' || category === filter;

            if (isMatch) {
              card.classList.remove('hidden-card');
              if (typeof gsap !== 'undefined') {
                gsap.fromTo(card,
                  { opacity: 0, scale: 0.85, y: 15 },
                  { opacity: 1, scale: 1, y: 0, duration: 0.5, delay: idx * 0.04, ease: 'back.out(1.4)' }
                );
              } else {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
              }
            } else {
              if (typeof gsap !== 'undefined') {
                gsap.to(card, {
                  opacity: 0,
                  scale: 0.85,
                  duration: 0.3,
                  ease: 'power2.in',
                  onComplete: () => card.classList.add('hidden-card')
                });
              } else {
                card.classList.add('hidden-card');
              }
            }
          });

          if (typeof ScrollTrigger !== 'undefined') {
            setTimeout(() => ScrollTrigger.refresh(), 400);
          }
        });
      });
    }

    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // 3. Staggered reveal of Bento grid flip cards on initial scroll
    gsap.fromTo(flipCards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.bento-projects-grid',
          start: 'top 90%',
          once: true
        }
      }
    );
  }

  // ==========================================================================
  // Footer Animations
  // ==========================================================================
  function initFooterAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // Bento Footer reveal
    const bentoCards = document.querySelectorAll('.bento-card');
    if (bentoCards.length > 0) {
      gsap.fromTo(bentoCards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.site-bento-footer',
            start: 'top 80%'
          }
        }
      );
    }
  }

  // ==========================================================================
  // Preloader & Reveal (Shapes translation + 360° rotation + 0% -> 100% counter)
  // ==========================================================================
  function initPreloader(onComplete) {
    const preloader = document.getElementById('preloader');
    const number = document.querySelector('.preloader-number, .value');
    const progressBar = document.querySelector('.preloader-progress-bar');
    const curtainBars = document.querySelectorAll('.curtain-bar, [style*="transform-origin: 50% 0%"]');
    
    const shapes = document.querySelectorAll('.shape');
    const triangle = document.querySelector('.shape-triangle');
    const square = document.querySelector('.shape-square');
    const circle = document.querySelector('.shape-circle');

    if (!preloader || typeof gsap === 'undefined') {
      if (onComplete) onComplete();
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
      return;
    }

    const progress = { val: 0 };
    const travelX = window.innerWidth < 768 ? 45 : 75; // Translation distance (px)
    const rotateDeg = 360;

    // Set initial transform origin
    gsap.set(shapes, { transformOrigin: 'center center' });

    // Synchronized Timeline (2000ms duration)
    const tl = gsap.timeline({
      defaults: { duration: 2.0, ease: 'power2.inOut' },
      onComplete: () => {
        const exitTl = gsap.timeline({
          onComplete: () => {
            preloader.style.display = 'none';
            if (onComplete) onComplete();
            setTimeout(() => {
              if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
              }
            }, 60);
          }
        });

        // Micro-glow scale pulse on 100%
        exitTl.to(shapes, {
          scale: 1.15,
          opacity: 0.9,
          duration: 0.25,
          ease: 'power2.out'
        });

        exitTl.to(preloader, {
          opacity: 0,
          duration: 0.35,
          ease: 'power2.out'
        }, '+=0.05');

        if (curtainBars.length > 0) {
          exitTl.to(curtainBars, {
            scaleY: 0,
            duration: 0.65,
            stagger: 0.06,
            ease: 'power4.inOut',
            transformOrigin: 'top'
          }, '-=0.2');
        }
      }
    });

    // 1. Counter: 0% -> 100%
    tl.to(progress, {
      val: 100,
      onUpdate: () => {
        const current = Math.floor(progress.val);
        if (number) number.textContent = `${current}%`;
        if (progressBar) progressBar.style.width = `${progress.val}%`;
      }
    }, 0);

    // 2. Shape Translations (.add($circle, { x }, 0), .add($triangle, { x }, 0), .add($square, { x }, 0))
    if (circle) {
      tl.to(circle, { x: travelX }, 0);
    }
    if (triangle) {
      tl.to(triangle, { y: -8, scale: 1.05 }, 0);
    }
    if (square) {
      tl.to(square, { x: -travelX }, 0);
    }

    // 3. Shape Rotations (.add(shapes, { rotate }, 0))
    if (shapes.length > 0) {
      tl.to(shapes, { rotation: rotateDeg }, 0);
    }
  }

  // ==========================================================================
  // Init
  // ==========================================================================
  function init() {
    // 1. Lenis Smooth Scroll Synchronized with GSAP Ticker
    if (typeof Lenis !== 'undefined') {
      try {
        const lenis = new Lenis({
          duration: 1.1,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1.0,
          touchMultiplier: 2.0
        });

        window.lenis = lenis;

        // Synchronize ScrollTrigger with Lenis only on actual scroll
        lenis.on('scroll', () => {
          if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.update();
          }
        });

        // Run Lenis in exact lockstep with GSAP's high-precision internal ticker
        if (typeof gsap !== 'undefined') {
          gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
          });
          gsap.ticker.lagSmoothing(0);
        } else {
          function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
          }
          requestAnimationFrame(raf);
        }
      } catch(e) {
        console.warn('Lenis init:', e);
      }
    }

    // 2. Three.js GPU Background Shader
    initShaderBackground();

    // 3. Ultra-Fluid Custom Cursor
    initCustomCursor();

    // 4. Magnetic Physics
    initMagneticButtons();

    // 5. Preloader and Layout Reveal
    initPreloader(() => {
      initHeroAnimations();
      initSkillsSection();
      initProjectsSplit();
      initFooterAnimations();
    });

    // 6. Refresh ScrollTrigger on window full load (assets & fonts ready)
    window.addEventListener('load', () => {
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
