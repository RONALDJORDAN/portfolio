// ==========================================================================
// PORTFOLIO MODELO 3 - MASTER CONTROLLER (BENTO & NOTCHED ISLAND BLUEPRINT)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const data = window.portfolioData;
  if (!data) {
    console.error("Portfolio data not found.");
    return;
  }

  // 1. Initialize Subsystems
  initFolderTabs();
  initBentoFiltering(data.projects);
  initModalSystem(data.projects);
  initMemorySimulator();
  initTelemetryCanvas();
  initTerminalCLI(data.terminalCommands);
  initContactActions(data.profile);

  // 2. Initialize Animation Engine
  if (window.AnimationEngine) {
    const engine = new window.AnimationEngine();
    engine.init();
  }
});

// --------------------------------------------------------------------------
// FOLDER TABS CONTROLLER
// --------------------------------------------------------------------------
function initFolderTabs() {
  const tabs = document.querySelectorAll('.folder-tab-btn');
  const panes = document.querySelectorAll('.folder-content-pane');

  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const activePane = document.getElementById(`pane-${target}`);
      if (activePane) {
        activePane.classList.add('active');
        if (window.anime && window.anime.animate) {
          window.anime.animate(activePane, {
            opacity: [0, 1],
            translateY: [15, 0],
            duration: 400,
            ease: 'out(3)'
          });
        }
      }
    });
  });
}

// --------------------------------------------------------------------------
// BENTO FILTERING CONTROLLER
// --------------------------------------------------------------------------
function initBentoFiltering(projects) {
  const filterBtns = document.querySelectorAll('.filter-pill-btn');
  const quadCards = document.querySelectorAll('.bento-card-small');
  const dominantCard = document.getElementById('bento-dominant-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      quadCards.forEach(card => {
        const cat = card.dataset.category;
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });

      if (dominantCard) {
        if (filter === 'all' || filter === 'rpa') {
          dominantCard.style.display = 'flex';
        } else {
          dominantCard.style.display = 'none';
        }
      }

      if (window.anime && window.anime.animate) {
        window.anime.animate('.bento-card-small:not([style*="display: none"])', {
          opacity: [0, 1],
          scale: [0.94, 1],
          duration: 400,
          delay: window.anime.stagger(50),
          ease: 'out(3)'
        });
      }
    });
  });
}

// --------------------------------------------------------------------------
// MODAL SYSTEM
// --------------------------------------------------------------------------
function initModalSystem(projects) {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const triggerBtns = document.querySelectorAll('.btn-case-study');

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pid = btn.dataset.projectId;
      const project = projects.find(p => p.id === pid);
      if (!project || !modal) return;

      document.getElementById('modal-img').src = project.image;
      document.getElementById('modal-title').textContent = project.title;
      document.getElementById('modal-subtitle').textContent = project.subtitle;
      document.getElementById('modal-problem').textContent = project.problem;
      document.getElementById('modal-solution').textContent = project.solution;
      document.getElementById('modal-github-link').href = project.repo;

      const metricsList = document.getElementById('modal-metrics-list');
      metricsList.innerHTML = project.metrics.map(m => `<li>✓ ${m}</li>`).join('');

      const stackTags = document.getElementById('modal-stack-tags');
      stackTags.innerHTML = project.stack.map(s => `<span class="section-tag-pill light" style="font-size: 0.72rem; padding: 3px 10px;">${s}</span>`).join('');

      modal.classList.add('open');

      if (window.anime && window.anime.animate) {
        window.anime.animate('.modal-box-wire', {
          scale: [0.9, 1],
          opacity: [0, 1],
          duration: 350,
          ease: 'out(3)'
        });
      }
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') modal.classList.remove('open');
    });
  }
}

// --------------------------------------------------------------------------
// C / LOW-LEVEL MEMORY SIMULATOR
// --------------------------------------------------------------------------
function initMemorySimulator() {
  const grid = document.getElementById('memory-grid');
  const allocBtn = document.getElementById('btn-alloc-mem');
  const freeBtn = document.getElementById('btn-free-mem');
  const statusLabel = document.getElementById('mem-status-label');

  if (!grid) return;

  const total = 32;
  grid.innerHTML = '';
  for (let i = 0; i < total; i++) {
    const b = document.createElement('div');
    b.style.aspectRatio = '1';
    b.style.background = 'rgba(255,255,255,0.06)';
    b.style.border = '1px solid rgba(255,255,255,0.1)';
    b.style.borderRadius = '4px';
    b.style.display = 'flex';
    b.style.alignItems = 'center';
    b.style.justifyContent = 'center';
    b.style.fontFamily = 'monospace';
    b.style.fontSize = '0.6rem';
    b.style.color = '#64748b';
    b.textContent = `0x${(i * 4).toString(16).toUpperCase()}`;
    b.className = 'mem-box';
    grid.appendChild(b);
  }

  let count = 0;
  const update = () => {
    const boxes = grid.querySelectorAll('.mem-box');
    boxes.forEach((box, i) => {
      if (i < count) {
        box.style.background = 'rgba(16, 185, 129, 0.25)';
        box.style.borderColor = '#10b981';
        box.style.color = '#10b981';
      } else {
        box.style.background = 'rgba(255,255,255,0.06)';
        box.style.borderColor = 'rgba(255,255,255,0.1)';
        box.style.color = '#64748b';
      }
    });
    if (statusLabel) statusLabel.textContent = `Active Buffers: ${count} / ${total} (Zero Leaks)`;
  };

  if (allocBtn) {
    allocBtn.addEventListener('click', () => {
      if (count < total) {
        count = Math.min(total, count + 4);
        update();
      }
    });
  }

  if (freeBtn) {
    freeBtn.addEventListener('click', () => {
      count = 0;
      update();
    });
  }
}

// --------------------------------------------------------------------------
// TELEMETRY CANVAS
// --------------------------------------------------------------------------
function initTelemetryCanvas() {
  const canvas = document.getElementById('telemetry-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const points = [];
  const max = 35;

  for (let i = 0; i < max; i++) points.push(15 + Math.random() * 20);

  const draw = () => {
    const w = canvas.width = canvas.parentElement.clientWidth;
    const h = canvas.height = 160;

    points.shift();
    points.push(10 + Math.random() * 25 + Math.sin(Date.now() / 450) * 8);

    ctx.clearRect(0, 0, w, h);

    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, 'rgba(0, 242, 254, 0.3)');
    grad.addColorStop(1, 'rgba(0, 242, 254, 0)');

    ctx.beginPath();
    const step = w / (max - 1);
    ctx.moveTo(0, h);
    points.forEach((v, i) => {
      const x = i * step;
      const y = h - (v / 50) * h;
      if (i === 0) ctx.lineTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.beginPath();
    points.forEach((v, i) => {
      const x = i * step;
      const y = h - (v / 50) * h;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#00f2fe';
    ctx.lineWidth = 2;
    ctx.stroke();

    requestAnimationFrame(draw);
  };

  requestAnimationFrame(draw);
}

// --------------------------------------------------------------------------
// CLI TERMINAL
// --------------------------------------------------------------------------
function initTerminalCLI(commands) {
  const input = document.getElementById('terminal-cli-input');
  const body = document.getElementById('terminal-body-content');
  if (!input || !body) return;

  const print = (prompt, txt, isEmerald = false) => {
    const row = document.createElement('div');
    row.innerHTML = `
      <span style="color: var(--accent-cyan); font-weight: 600;">${prompt}</span>
      <span style="color: ${isEmerald ? 'var(--accent-emerald)' : '#cbd5e1'};">${txt.replace(/\n/g, '<br>')}</span>
    `;
    body.appendChild(row);
    body.scrollTop = body.scrollHeight;
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = input.value.trim().toLowerCase();
      input.value = '';
      if (!val) return;

      if (val === 'clear') {
        body.innerHTML = `<div><span style="color: var(--accent-cyan);">jordan@innovcore:~$</span> Console limpo. Digite <strong>help</strong> para comandos.</div>`;
        return;
      }

      print(`jordan@innovcore:~$ ${val}`, '');

      if (commands[val]) {
        print('>', commands[val], val === 'hire' || val === 'contact');
      } else {
        print('>', `Comando não reconhecido: "${val}". Digite "help" para lista.`);
      }
    }
  });
}

// --------------------------------------------------------------------------
// CONTACT ACTIONS
// --------------------------------------------------------------------------
function initContactActions(profile) {
  const copyBtn = document.getElementById('btn-copy-email');
  const toast = document.getElementById('toast-notice');

  if (copyBtn && toast) {
    copyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(profile.email).then(() => {
        toast.textContent = `✓ Email copiado: ${profile.email}`;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3200);
      });
    });
  }
}
