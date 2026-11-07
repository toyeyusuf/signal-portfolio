/* ════════════════════════════════════════════════════════
   YUSUF OLANREWAJU TOYE · Portfolio Script
   Vanilla JS — no frameworks, no build step
════════════════════════════════════════════════════════ */

'use strict';

/* ────────────────────────────────────────────────────────
   1. HERO CANVAS — animated network particle topology
──────────────────────────────────────────────────────── */
(function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const SIGNAL  = '#00c8ff';
  const GLOW    = 'rgba(0,200,255,';
  const NODE_R  = 2.5;
  const NODES   = 60;
  const CONNECT_DIST = 160;

  let W, H, nodes;
  let animId;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function makeNodes() {
    nodes = Array.from({ length: NODES }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r:  NODE_R * (0.5 + Math.random() * 0.8),
    }));
  }

  function tick() {
    ctx.clearRect(0, 0, W, H);

    // Update positions
    nodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });

    // Draw edges
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DIST) {
          const alpha = (1 - dist / CONNECT_DIST) * 0.35;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = GLOW + alpha + ')';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = GLOW + '0.6)';
      ctx.fill();
    });

    animId = requestAnimationFrame(tick);
  }

  function start() {
    resize();
    makeNodes();
    cancelAnimationFrame(animId);
    tick();
  }

  window.addEventListener('resize', () => {
    resize();
    makeNodes();
  });

  start();
})();


/* ────────────────────────────────────────────────────────
   2. TYPEWRITER — hero name and role
──────────────────────────────────────────────────────── */
(function initTypewriter() {
  const nameLine = document.getElementById('heroNameLine');
  const roleLine = document.getElementById('heroRole');
  if (!nameLine || !roleLine) return;

  const NAME = 'Yusuf Olanrewaju Toye';
  const ROLE = 'Cloud Network Engineer & Technical Instructor';

  function typeText(el, text, delay, speed, onDone) {
    let i = 0;
    el.textContent = '';
    el.style.borderRight = '2px solid var(--signal)';
    setTimeout(() => {
      const interval = setInterval(() => {
        el.textContent += text[i++];
        if (i >= text.length) {
          clearInterval(interval);
          el.style.borderRight = 'none';
          if (onDone) onDone();
        }
      }, speed);
    }, delay);
  }

  typeText(nameLine, NAME, 600, 38, () => {
    typeText(roleLine, ROLE, 200, 28, null);
  });
})();


/* ────────────────────────────────────────────────────────
   3. NAVIGATION — scroll state + mobile menu
──────────────────────────────────────────────────────── */
(function initNav() {
  const nav        = document.getElementById('nav');
  const toggle     = document.getElementById('navToggle');
  const menu       = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();


/* ────────────────────────────────────────────────────────
   4. SCROLL ANIMATIONS — fade-up sections + circuit trace
──────────────────────────────────────────────────────── */
(function initScrollAnimations() {
  // Fade-up: attach class to all major children
  const sections = document.querySelectorAll('section > .container > *');
  sections.forEach(el => el.classList.add('fade-up'));

  // Stage nodes in journey
  const stageNodes = document.querySelectorAll('.stage-node');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // Circuit trace observer — stagger per node
  const stageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const nodes = document.querySelectorAll('.stage-node');
        nodes.forEach((node, i) => {
          setTimeout(() => {
            node.classList.add('visible');
            setTimeout(() => node.classList.add('lit'), 200);
          }, i * 250);
        });
        stageObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  const circuitWrapper = document.querySelector('.circuit-wrapper');
  if (circuitWrapper) stageObserver.observe(circuitWrapper);
})();


/* ────────────────────────────────────────────────────────
   5. COUNTER ANIMATION — about section stats
──────────────────────────────────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const duration = 1200;
      const step   = 16;
      const steps  = duration / step;
      let current  = 0;

      const timer = setInterval(() => {
        current += target / steps;
        el.textContent = Math.min(Math.round(current), target);
        if (current >= target) clearInterval(timer);
      }, step);

      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));
})();


/* ────────────────────────────────────────────────────────
   6. PACKET ROUTING GAME
   Network topology:
     Nodes: laptop, r1-r6, cloud
     Edges: some are down (amber/dashed)
     Valid route: laptop → r1 → r3 → r5 → cloud
                  laptop → r2 → r4 → r5 → cloud
──────────────────────────────────────────────────────── */
(function initPacketGame() {

  /* ── Open / close overlay ── */
  const overlay     = document.getElementById('packetOverlay');
  const closeBtns   = [document.getElementById('packetClose')];
  const openBtns    = [
    document.getElementById('heroPacketBtn'),
    document.getElementById('navPacketBtn'),
    document.getElementById('mobilePacketBtn'),
    document.getElementById('ffPacketBtn'),
  ];

  function openOverlay() {
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    resetGame();
    resizeCanvas();
  }

  function closeOverlay() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => btn && btn.addEventListener('click', openOverlay));
  closeBtns.forEach(btn => btn && btn.addEventListener('click', closeOverlay));

  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeOverlay();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeOverlay();
  });

  /* ── Canvas + state ── */
  const canvas  = document.getElementById('packetCanvas');
  const ctx     = canvas.getContext('2d');
  const status  = document.getElementById('packetStatus');
  const resetBtn = document.getElementById('packetResetBtn');
  const reveal  = document.getElementById('packetReveal');
  const revealPlayAgain = document.getElementById('revealPlayAgain');

  // Logical graph (positions are fractions 0–1, scaled to canvas)
  // Nodes
  const NODES_DEF = [
    { id: 'laptop', label: 'Laptop', x: 0.08, y: 0.5,  icon: '💻' },
    { id: 'r1',     label: 'R1',     x: 0.28, y: 0.25, icon: '⬡' },
    { id: 'r2',     label: 'R2',     x: 0.28, y: 0.75, icon: '⬡' },
    { id: 'r3',     label: 'R3',     x: 0.50, y: 0.20, icon: '⬡' },
    { id: 'r4',     label: 'R4',     x: 0.50, y: 0.75, icon: '⬡' },
    { id: 'r5',     label: 'R5',     x: 0.72, y: 0.45, icon: '⬡' },
    { id: 'r6',     label: 'R6',     x: 0.50, y: 0.50, icon: '⬡' },
    { id: 'cloud',  label: 'Cloud',  x: 0.92, y: 0.5,  icon: '☁' },
  ];

  // Edges: [from, to, down?]
  const EDGES_DEF = [
    ['laptop', 'r1',  false],
    ['laptop', 'r2',  false],
    ['laptop', 'r6',  true ],  // down
    ['r1',     'r3',  false],
    ['r1',     'r6',  true ],  // down
    ['r2',     'r4',  false],
    ['r2',     'r6',  true ],  // down
    ['r3',     'r5',  false],
    ['r4',     'r5',  false],
    ['r3',     'r4',  true ],  // down
    ['r5',     'cloud', false],
    ['r6',     'r5',  true ],  // down
  ];

  // Valid routes (arrays of node ids in order)
  const VALID_ROUTES = [
    ['laptop', 'r1', 'r3', 'r5', 'cloud'],
    ['laptop', 'r2', 'r4', 'r5', 'cloud'],
  ];

  let nodes, edges;
  let path       = [];    // selected node ids in order
  let gameWon    = false;
  let focusIndex = -1;    // keyboard navigation

  /* ── Resize canvas to fill its CSS size ── */
  function resizeCanvas() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight || 340;
    draw();
  }
  window.addEventListener('resize', () => {
    if (overlay.classList.contains('open')) resizeCanvas();
  });

  /* ── Build runtime node list with pixel coords ── */
  function buildGraph() {
    const W = canvas.width, H = canvas.height;
    nodes = NODES_DEF.map(n => ({ ...n, px: n.x * W, py: n.y * H }));
    edges = EDGES_DEF.map(([a, b, down]) => ({
      from: a, to: b, down,
      fa: nodes.find(n => n.id === a),
      fb: nodes.find(n => n.id === b),
    }));
  }

  /* ── Colors ── */
  const C = {
    bg:        '#0d1520',
    node:      '#1a2840',
    nodeBorder:'#1e2f47',
    nodeHover: '#00c8ff',
    nodeActive:'#00c8ff',
    nodePath:  'rgba(0,200,255,0.3)',
    edgeOk:    '#1e2f47',
    edgeDown:  '#f59e0b',
    edgePath:  '#00c8ff',
    label:     '#8fa9c4',
    text:      '#e8f0f8',
    glow:      'rgba(0,200,255,',
  };

  /* ── Draw ── */
  function draw() {
    if (!canvas.width || !canvas.height) return;
    buildGraph();
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // Edges
    edges.forEach(e => drawEdge(e));

    // Nodes
    nodes.forEach(n => drawNode(n));
  }

  function drawEdge(e) {
    const inPath  = isEdgeInPath(e.from, e.to);
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(e.fa.px, e.fa.py);
    ctx.lineTo(e.fb.px, e.fb.py);

    if (inPath) {
      ctx.strokeStyle = C.edgePath;
      ctx.lineWidth   = 2.5;
      ctx.shadowColor = C.nodeHover;
      ctx.shadowBlur  = 10;
      ctx.setLineDash([]);
    } else if (e.down) {
      ctx.strokeStyle = C.edgeDown;
      ctx.lineWidth   = 1.5;
      ctx.setLineDash([6, 5]);
      ctx.shadowBlur  = 0;
    } else {
      ctx.strokeStyle = C.edgeOk;
      ctx.lineWidth   = 1.5;
      ctx.setLineDash([]);
      ctx.shadowBlur  = 0;
    }
    ctx.stroke();
    ctx.restore();
  }

  function drawNode(n) {
    const inPath  = path.includes(n.id);
    const isLast  = path.length && path[path.length - 1] === n.id;
    const isFocus = nodes.indexOf(n) === focusIndex;
    const isAdjacent = !gameWon && path.length > 0 && isAdjacentToLast(n.id) && !path.includes(n.id);
    const r = getNodeRadius();

    ctx.save();

    // Glow for path nodes
    if (inPath || isAdjacent) {
      ctx.shadowColor = C.nodeHover;
      ctx.shadowBlur  = inPath ? 18 : 8;
    }

    // Node circle background
    ctx.beginPath();
    ctx.arc(n.px, n.py, r, 0, Math.PI * 2);
    if (inPath) {
      ctx.fillStyle = 'rgba(0,200,255,0.2)';
    } else {
      ctx.fillStyle = C.node;
    }
    ctx.fill();

    // Border
    ctx.beginPath();
    ctx.arc(n.px, n.py, r, 0, Math.PI * 2);
    if (isLast)      ctx.strokeStyle = '#00ffff';
    else if (inPath) ctx.strokeStyle = C.nodeHover;
    else if (isAdjacent) ctx.strokeStyle = 'rgba(0,200,255,0.5)';
    else if (isFocus)    ctx.strokeStyle = C.nodeHover;
    else              ctx.strokeStyle = C.nodeBorder;
    ctx.lineWidth = isLast ? 2.5 : 1.5;
    ctx.stroke();
    ctx.restore();

    // Icon / label
    ctx.save();
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.font         = `${r * 0.9}px system-ui`;
    ctx.fillStyle    = inPath ? C.text : C.label;
    ctx.fillText(n.id === 'laptop' || n.id === 'cloud' ? n.icon : n.label, n.px, n.py);
    ctx.restore();

    // Label below
    ctx.save();
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'top';
    ctx.font         = `${Math.max(10, r * 0.55)}px JetBrains Mono, monospace`;
    ctx.fillStyle    = C.label;
    if (n.id !== 'laptop' && n.id !== 'cloud') {
      ctx.fillText(n.label, n.px, n.py + r + 4);
    }
    ctx.restore();
  }

  function getNodeRadius() {
    return Math.max(18, Math.min(26, canvas.width * 0.035));
  }

  function isEdgeInPath(a, b) {
    for (let i = 0; i < path.length - 1; i++) {
      if ((path[i] === a && path[i+1] === b) || (path[i] === b && path[i+1] === a)) return true;
    }
    return false;
  }

  function isAdjacentToLast(id) {
    if (!path.length) {
      // First step: adjacent to laptop
      return edges.some(e => !e.down && (
        (e.from === 'laptop' && e.to === id) ||
        (e.to === 'laptop' && e.from === id)
      ));
    }
    const last = path[path.length - 1];
    return edges.some(e => !e.down && (
      (e.from === last && e.to === id) ||
      (e.to === last && e.from === id)
    ));
  }

  /* ── Hit test ── */
  function hitNode(mx, my) {
    const r = getNodeRadius() + 6;
    return nodes.find(n => {
      const dx = n.px - mx, dy = n.py - my;
      return Math.sqrt(dx*dx + dy*dy) < r;
    }) || null;
  }

  /* ── Game logic ── */
  function selectNode(n) {
    if (gameWon) return;
    const id = n.id;

    // Cannot select already-in-path nodes (except to backtrack to immediate predecessor)
    if (path.length > 1 && id === path[path.length - 2]) {
      path.pop();
      status.textContent = `Backtracked to ${path[path.length - 1]}.`;
      draw();
      return;
    }
    if (path.includes(id)) return;

    // First node must be adjacent to laptop
    if (!path.length) {
      if (!isAdjacentToLast(id)) {
        status.textContent = 'Pick a router next to the laptop to start.';
        return;
      }
    } else {
      if (!isAdjacentToLast(id)) {
        status.textContent = `${id} is not reachable from ${path[path.length - 1]}.`;
        return;
      }
    }

    path.push(id);
    status.textContent = `Route: laptop → ${path.join(' → ')}`;
    draw();

    if (id === 'cloud') {
      checkWin();
    }
  }

  function checkWin() {
    const fullPath = ['laptop', ...path];
    const won = VALID_ROUTES.some(route =>
      route.length === fullPath.length &&
      route.every((id, i) => id === fullPath[i])
    );
    if (won) {
      gameWon = true;
      showWin();
    } else if (path[path.length - 1] === 'cloud') {
      // Reached cloud but via wrong route (shouldn't happen with valid topology)
      status.textContent = 'Packet delivered! But try to find the optimal route.';
      gameWon = true;
      showWin();
    }
  }

  function showWin() {
    status.textContent = '✓ Packet delivered — 0% packet loss';

    // Animate the packet traveling along the path
    animatePacket(() => {
      // Unlock the fun fact section on the page
      revealFunFact();

      // Show in-overlay confirmation after short delay
      setTimeout(() => {
        reveal.hidden = false;
        reveal.setAttribute('aria-hidden', 'false');
        reveal.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 600);
    });
  }

  /* ── Reveal fun fact section on the main page ── */
  function revealFunFact() {
    const locked   = document.getElementById('ffLocked');
    const revealed = document.getElementById('ffRevealed');
    const icon     = document.getElementById('ffIcon');
    const heading  = document.getElementById('funfact-heading');

    if (!locked || !revealed) return;

    // Update heading
    if (heading) heading.innerHTML = 'A channel<br/>is coming.';

    // Swap locked → revealed
    locked.style.opacity = '0';
    locked.style.transform = 'translateY(-10px)';
    locked.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    setTimeout(() => {
      locked.hidden = true;
      locked.setAttribute('aria-hidden', 'true');
      revealed.hidden = false;
      revealed.setAttribute('aria-hidden', 'false');
      // Trigger fade-in animation
      revealed.style.opacity = '0';
      revealed.style.transform = 'translateY(16px)';
      revealed.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      requestAnimationFrame(() => {
        revealed.style.opacity = '1';
        revealed.style.transform = 'translateY(0)';
      });
      // Animate the broadcast icon to celebrate
      if (icon) {
        icon.style.filter = 'drop-shadow(0 0 24px #00c8ff)';
        icon.style.transition = 'filter 0.6s ease';
      }
    }, 420);
  }

  /* ── Packet travel animation ── */
  function animatePacket(onDone) {
    const fullPath = ['laptop', ...path];
    const pts = fullPath.map(id => nodes.find(n => n.id === id));
    let seg = 0, t = 0;
    const speed = 0.03;

    function step() {
      if (seg >= pts.length - 1) {
        draw();
        if (onDone) onDone();
        return;
      }
      t += speed;
      if (t > 1) { t = 0; seg++; }

      const a = pts[seg], b = pts[Math.min(seg+1, pts.length-1)];
      const x = a.px + (b.px - a.px) * t;
      const y = a.py + (b.py - a.py) * t;

      draw();

      // Draw packet
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, 7, 0, Math.PI * 2);
      ctx.fillStyle = '#00c8ff';
      ctx.shadowColor = '#00c8ff';
      ctx.shadowBlur = 16;
      ctx.fill();
      ctx.restore();

      requestAnimationFrame(step);
    }
    step();
  }

  /* ── Reset ── */
  function resetGame() {
    path     = [];
    gameWon  = false;
    reveal.hidden = true;
    reveal.setAttribute('aria-hidden', 'true');
    status.textContent = 'Pick a router next to the laptop to start.';
    draw();
  }

  resetBtn.addEventListener('click', resetGame);
  revealPlayAgain && revealPlayAgain.addEventListener('click', resetGame);

  // "See what's there →" — close overlay and scroll to fun fact
  const revealGoBtn = document.getElementById('revealGoBtn');
  revealGoBtn && revealGoBtn.addEventListener('click', () => {
    closeOverlay();
    setTimeout(() => {
      const ff = document.getElementById('funfact');
      if (ff) ff.scrollIntoView({ behavior: 'smooth' });
    }, 350);
  });

  /* ── Mouse / touch input ── */
  canvas.addEventListener('click', e => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width  / rect.width;
    const scaleY = canvas.height / rect.height;
    const mx = (e.clientX - rect.left) * scaleX;
    const my = (e.clientY - rect.top)  * scaleY;
    const n = hitNode(mx, my);
    if (n) selectNode(n);
  });

  canvas.addEventListener('touchstart', e => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect  = canvas.getBoundingClientRect();
    const scaleX = canvas.width  / rect.width;
    const scaleY = canvas.height / rect.height;
    const mx = (touch.clientX - rect.left) * scaleX;
    const my = (touch.clientY - rect.top)  * scaleY;
    const n = hitNode(mx, my);
    if (n) selectNode(n);
  }, { passive: false });

  // Hover cursor
  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width  / rect.width;
    const scaleY = canvas.height / rect.height;
    const mx = (e.clientX - rect.left) * scaleX;
    const my = (e.clientY - rect.top)  * scaleY;
    canvas.style.cursor = hitNode(mx, my) ? 'pointer' : 'default';
  });

  /* ── Keyboard navigation ── */
  canvas.setAttribute('tabindex', '0');
  canvas.addEventListener('keydown', e => {
    if (!nodes) return;
    const adjacent = nodes.filter(n => !path.includes(n.id) && (
      path.length === 0 ? isAdjacentToLast(n.id) : isAdjacentToLast(n.id)
    ));

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      focusIndex = (focusIndex + 1) % nodes.length;
      e.preventDefault();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      focusIndex = (focusIndex - 1 + nodes.length) % nodes.length;
      e.preventDefault();
    } else if (e.key === 'Enter' || e.key === ' ') {
      if (focusIndex >= 0 && nodes[focusIndex]) selectNode(nodes[focusIndex]);
      e.preventDefault();
    }
    draw();
  });

  canvas.addEventListener('blur', () => { focusIndex = -1; draw(); });

})();


/* ────────────────────────────────────────────────────────
   7. SCRATCH CARDS — Skills section
   Each .scratch-card has:
     - .scratch-back  → the revealed content (DOM, below canvas)
     - .scratch-canvas → canvas drawn on top as the cover layer
   Technique: fill canvas with cover texture, erase with
   globalCompositeOperation = 'destination-out' on drag.
   At REVEAL_THRESHOLD coverage erased, auto-complete.
──────────────────────────────────────────────────────── */
(function initScratchCards() {

  const REVEAL_THRESHOLD = 0.60; // 60% scratched → full reveal
  const BRUSH_RADIUS     = 28;   // base px, scales with card width

  const COVER_BG   = '#0d1a28';
  const COVER_LINE = 'rgba(0,200,255,0.07)';

  const cards       = document.querySelectorAll('.scratch-card');
  const revealAllBtn = document.getElementById('scratchRevealAll');
  const resetAllBtn  = document.getElementById('scratchResetAll');

  // Per-card state
  const state = new Map();

  /* ── Init each card ── */
  cards.forEach(card => {
    const canvas = card.querySelector('.scratch-canvas');
    if (!canvas) return;
    const ctx      = canvas.getContext('2d');
    const category = card.dataset.category || 'tech';
    state.set(card, { canvas, ctx, isRevealed: false, isScratching: false, _cc: 0, category });

    requestAnimationFrame(() => { sizeCanvas(card); drawCover(card); });

    canvas.addEventListener('mousedown',  e => startScratch(card, e));
    canvas.addEventListener('mousemove',  e => doScratch(card, e));
    canvas.addEventListener('mouseup',    () => endScratch(card));
    canvas.addEventListener('mouseleave', () => endScratch(card));
    canvas.addEventListener('touchstart', e => { e.preventDefault(); startScratch(card, e.touches[0]); }, { passive: false });
    canvas.addEventListener('touchmove',  e => { e.preventDefault(); doScratch(card, e.touches[0]); },  { passive: false });
    canvas.addEventListener('touchend',   () => endScratch(card));
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      cards.forEach(card => {
        const s = state.get(card);
        if (!s || s.isRevealed) return;
        sizeCanvas(card); drawCover(card);
      });
    }, 150);
  });

  /* ── Size canvas pixels to CSS display size ── */
  function sizeCanvas(card) {
    const { canvas } = state.get(card);
    const rect = card.getBoundingClientRect();
    canvas.width  = rect.width  || card.offsetWidth;
    canvas.height = rect.height || card.offsetHeight;
  }

  /* ── Draw the cover layer ── */
  function drawCover(card) {
    const { ctx, canvas } = state.get(card);
    const W = canvas.width, H = canvas.height;
    const accent = card.dataset.accent || '#00c8ff';

    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, W, H);

    // Solid background
    ctx.fillStyle = COVER_BG;
    ctx.fillRect(0, 0, W, H);

    // Diagonal stripe texture
    ctx.strokeStyle = COVER_LINE;
    ctx.lineWidth = 1;
    for (let x = -H; x < W + H; x += 14) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + H, H);
      ctx.stroke();
    }

    // Accent glow strip at top
    const grad = ctx.createLinearGradient(0, 0, W, 0);
    grad.addColorStop(0,   'transparent');
    grad.addColorStop(0.5, accent + '44');
    grad.addColorStop(1,   'transparent');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, 2);

    // Hint icon
    const iconSize = Math.max(14, W * 0.1);
    ctx.font = iconSize + 'px system-ui';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(0,200,255,0.22)';
    ctx.fillText('✦', W / 2, H / 2 - iconSize * 0.9);

    // Hint text
    const fontSize = Math.max(9, Math.min(11, W * 0.07));
    ctx.font = `500 ${fontSize}px JetBrains Mono, monospace`;
    ctx.fillStyle = 'rgba(0,200,255,0.32)';
    ctx.fillText('scratch to reveal', W / 2, H / 2 + iconSize * 0.4);
  }

  /* ── Canvas-local coordinates ── */
  function getPos(card, e) {
    const { canvas } = state.get(card);
    const rect  = canvas.getBoundingClientRect();
    const scaleX = canvas.width  / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top)  * scaleY,
    };
  }

  /* ── Erase a soft circle at (x, y) ── */
  function erase(card, x, y) {
    const { ctx, canvas } = state.get(card);
    const r = Math.max(BRUSH_RADIUS, canvas.width * 0.12);
    ctx.globalCompositeOperation = 'destination-out';
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0,   'rgba(0,0,0,1)');
    grad.addColorStop(0.6, 'rgba(0,0,0,0.85)');
    grad.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
  }

  /* ── Sample erased percentage (grid sampling — fast) ── */
  function scratchedPercent(card) {
    const { ctx, canvas } = state.get(card);
    const W = canvas.width, H = canvas.height;
    const step = 8;
    const data  = ctx.getImageData(0, 0, W, H).data;
    let transparent = 0, total = 0;
    for (let y = 0; y < H; y += step) {
      for (let x = 0; x < W; x += step) {
        if (data[((y * W) + x) * 4 + 3] < 128) transparent++;
        total++;
      }
    }
    return total > 0 ? transparent / total : 0;
  }

  function startScratch(card, e) {
    const s = state.get(card);
    if (!s || s.isRevealed) return;
    s.isScratching = true;
    erase(card, ...Object.values(getPos(card, e)));
  }

  function doScratch(card, e) {
    const s = state.get(card);
    if (!s || !s.isScratching || s.isRevealed) return;
    const { x, y } = getPos(card, e);
    erase(card, x, y);
    s._cc++;
    if (s._cc % 10 === 0 && scratchedPercent(card) >= REVEAL_THRESHOLD) {
      revealCard(card);
    }
  }

  function endScratch(card) {
    const s = state.get(card);
    if (!s) return;
    s.isScratching = false;
    if (!s.isRevealed && scratchedPercent(card) >= REVEAL_THRESHOLD) revealCard(card);
  }

  /* ── Full reveal ── */
  function revealCard(card) {
    const s = state.get(card);
    if (!s || s.isRevealed) return;
    s.isRevealed = true;
    card.classList.add('revealed', 'burst');
    setTimeout(() => card.classList.remove('burst'), 500);
    // Wipe canvas completely transparent
    const { ctx, canvas } = s;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'source-over';
  }

  /* ── Reveal all / Reset ── */
  revealAllBtn && revealAllBtn.addEventListener('click', () => {
    cards.forEach(card => revealCard(card));
  });

  resetAllBtn && resetAllBtn.addEventListener('click', () => {
    cards.forEach(card => {
      const s = state.get(card);
      if (!s) return;
      s.isRevealed   = false;
      s.isScratching = false;
      s._cc          = 0;
      card.classList.remove('revealed', 'burst');
      sizeCanvas(card);
      drawCover(card);
    });
  });

  /* ── Reduced-motion: skip the game, show all ── */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    cards.forEach(card => revealCard(card));
  }

})();


/* ────────────────────────────────────────────────────────
   8. VENDING MACHINE — Projects section
   Flow:
     1. Drag coin → slot (or press Enter on coin)
     2. Coin drops in → credit +1 → status "READY"
     3. Click a locked slot → processing bar runs
     4. Slot shakes → project card drops into tray
     5. Coin recharges after a short delay
──────────────────────────────────────────────────────── */
(function initVendingMachine() {

  const coin        = document.getElementById('vmCoin');
  const coinSlot    = document.getElementById('vmCoinSlot');
  const vmStatus    = document.getElementById('vmStatus');
  const vmIndicator = document.getElementById('vmIndicator');
  const vmProcess   = document.getElementById('vmProcess');
  const processBar  = document.getElementById('vmProcessBar');
  const vmCredits   = document.getElementById('vmCredits');
  const tray        = document.getElementById('vmTray');
  const trayContent = document.getElementById('vmTrayContent');
  const slots       = document.querySelectorAll('.vm-slot');

  if (!coin || !coinSlot || !slots.length) return;

  let hasCredit = false;
  let busy      = false;
  let dragActive = false;
  let dragOffX = 0, dragOffY = 0;

  /* ── Web Audio coin / dispense sounds (no files) ── */
  let audioCtx = null;
  function audio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return audioCtx;
  }
  function playCoin() {
    try {
      const ctx = audio(); const osc = ctx.createOscillator(); const g = ctx.createGain();
      osc.connect(g); g.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1040, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(520, ctx.currentTime + 0.15);
      g.gain.setValueAtTime(0.15, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.start(); osc.stop(ctx.currentTime + 0.2);
    } catch (_) {}
  }
  function playDispense() {
    try {
      const ctx = audio(); const osc = ctx.createOscillator(); const g = ctx.createGain();
      osc.connect(g); g.connect(ctx.destination);
      osc.type = 'square';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(300, ctx.currentTime + 0.12);
      g.gain.setValueAtTime(0.07, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start(); osc.stop(ctx.currentTime + 0.3);
    } catch (_) {}
  }

  /* ── Helpers ── */
  function setStatus(text, cls) {
    vmStatus.textContent = text;
    vmStatus.className   = 'vm-status mono' + (cls ? ' ' + cls : '');
    vmIndicator.className = 'vm-indicator'  + (cls ? ' ' + cls : '');
  }
  function updateCredits() {
    vmCredits.textContent = 'CREDIT: ' + (hasCredit ? '1' : '0');
  }

  /* ── Insert coin ── */
  function insertCoin() {
    if (hasCredit || busy) return;
    coin.classList.add('inserted');
    coinSlot.classList.remove('hover-target');
    playCoin();
    setTimeout(() => {
      hasCredit = true;
      updateCredits();
      setStatus('READY — SELECT SLOT', 'ready');
      slots.forEach(s => { if (!s.classList.contains('unlocked')) s.classList.add('active'); });
    }, 320);
  }

  /* ── Recharge coin after dispensing ── */
  function rechargeCoin() {
    setTimeout(() => {
      coin.classList.remove('inserted');
      coin.classList.add('recharge');
      setTimeout(() => coin.classList.remove('recharge'), 650);
    }, 1600);
  }

  /* ── Nudge coin (hint when no credit) ── */
  function nudgeCoin() {
    coin.style.transition = 'transform 0.1s';
    coin.style.transform  = 'scale(1.18)';
    setTimeout(() => { coin.style.transform = ''; }, 200);
  }

  /* ── Dispense ── */
  function dispense(slotEl) {
    if (!hasCredit || busy || slotEl.classList.contains('unlocked')) return;
    busy      = true;
    hasCredit = false;
    updateCredits();
    const idx = parseInt(slotEl.dataset.slot, 10);

    slots.forEach(s => s.classList.remove('active'));
    setStatus('PROCESSING...', '');
    vmProcess.classList.add('active');
    processBar.style.width = '0%';
    requestAnimationFrame(() => { processBar.style.width = '100%'; });

    setTimeout(() => {
      slotEl.classList.add('dispensing');
      playDispense();

      setTimeout(() => {
        slotEl.classList.remove('dispensing');
        slotEl.classList.add('unlocked');

        const tmpl = document.getElementById('vmProject' + idx);
        if (tmpl) {
          const clone = tmpl.content.cloneNode(true);
          trayContent.innerHTML = '';
          trayContent.appendChild(clone);
          trayContent.hidden = false;
          tray.classList.add('has-item');
        }

        vmProcess.classList.remove('active');
        processBar.style.width = '0%';
        setStatus('DISPENSED ✓', 'ok');

        setTimeout(() => { setStatus('INSERT COIN', ''); busy = false; rechargeCoin(); }, 2200);
      }, 500);
    }, 950);
  }

  /* ── Slot interaction ── */
  slots.forEach(slotEl => {
    slotEl.addEventListener('click', () => {
      if (slotEl.classList.contains('unlocked')) return;
      if (!hasCredit) { setStatus('INSERT COIN FIRST', ''); nudgeCoin(); return; }
      dispense(slotEl);
    });
    slotEl.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); slotEl.click(); }
    });
  });

  /* ── Coin keyboard ── */
  coin.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); insertCoin(); }
  });

  /* ── Mouse drag ── */
  coin.addEventListener('mousedown', e => {
    if (hasCredit || busy) return;
    e.preventDefault();
    const rect = coin.getBoundingClientRect();
    dragOffX = e.clientX - rect.left - rect.width / 2;
    dragOffY = e.clientY - rect.top  - rect.height / 2;
    dragActive = true;
    coin.classList.add('dragging');
    coin.style.left = (rect.left + rect.width  / 2) + 'px';
    coin.style.top  = (rect.top  + rect.height / 2) + 'px';
  });

  document.addEventListener('mousemove', e => {
    if (!dragActive) return;
    coin.style.left = (e.clientX - dragOffX) + 'px';
    coin.style.top  = (e.clientY - dragOffY)  + 'px';
    const sr = coinSlot.getBoundingClientRect();
    const near = e.clientX > sr.left - 36 && e.clientX < sr.right  + 36 &&
                 e.clientY > sr.top  - 36 && e.clientY < sr.bottom + 36;
    coinSlot.classList.toggle('hover-target', near);
  });

  document.addEventListener('mouseup', e => {
    if (!dragActive) return;
    dragActive = false;
    coin.classList.remove('dragging');
    coin.style.left = coin.style.top = '';
    const sr = coinSlot.getBoundingClientRect();
    const hit = e.clientX > sr.left - 44 && e.clientX < sr.right  + 44 &&
                e.clientY > sr.top  - 44 && e.clientY < sr.bottom + 44;
    coinSlot.classList.remove('hover-target');
    if (hit) insertCoin();
  });

  /* ── Touch drag ── */
  coin.addEventListener('touchstart', e => {
    if (hasCredit || busy) return;
    e.preventDefault();
    const t = e.touches[0];
    const rect = coin.getBoundingClientRect();
    dragOffX = t.clientX - rect.left - rect.width / 2;
    dragOffY = t.clientY - rect.top  - rect.height / 2;
    dragActive = true;
    coin.classList.add('dragging');
    coin.style.left = (rect.left + rect.width  / 2) + 'px';
    coin.style.top  = (rect.top  + rect.height / 2) + 'px';
  }, { passive: false });

  document.addEventListener('touchmove', e => {
    if (!dragActive) return;
    const t = e.touches[0];
    coin.style.left = (t.clientX - dragOffX) + 'px';
    coin.style.top  = (t.clientY - dragOffY) + 'px';
    const sr = coinSlot.getBoundingClientRect();
    const near = t.clientX > sr.left - 36 && t.clientX < sr.right  + 36 &&
                 t.clientY > sr.top  - 36 && t.clientY < sr.bottom + 36;
    coinSlot.classList.toggle('hover-target', near);
  }, { passive: true });

  document.addEventListener('touchend', e => {
    if (!dragActive) return;
    dragActive = false;
    const t = e.changedTouches[0];
    const sr = coinSlot.getBoundingClientRect();
    const hit = t.clientX > sr.left - 44 && t.clientX < sr.right  + 44 &&
                t.clientY > sr.top  - 44 && t.clientY < sr.bottom + 44;
    coin.classList.remove('dragging');
    coin.style.left = coin.style.top = '';
    coinSlot.classList.remove('hover-target');
    if (hit) insertCoin();
  });

  updateCredits();

})();


/* ════════════════════════════════════════════════════════
   END
════════════════════════════════════════════════════════ */
