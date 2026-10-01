/**
 * EG TECH — EMPOWERING GROWTH TECHNOLOGY
 * Full Cinematic Scroll-Driven Digital Experience Engine
 * Recreating the reference video narrative:
 * 01 Digital Bokeh Intro -> 02 Client Request Message -> 03 2.5D Laptop Reveal
 * -> 04 Integrated IDE & Code Reveal -> 05 Signature Code-to-UI Morph
 * -> 06 Terminal Build Process -> 07 Build Ready & Complete
 * -> 08 Website Reveal -> 09 Screen-Entry Zoom -> 10 Live Client Flagship (Vibe Attire)
 * -> 11 Color Collapse -> 12 EG TECH Brand Reveal -> 13 Editorial Services
 * -> 14 Shipped Work -> 15 Final CTA -> 16 Project Briefing Form
 */

document.addEventListener('DOMContentLoaded', () => {
  const cinematicApp = new EGTechCinematicEngine();
  cinematicApp.init();
});

class EGTechCinematicEngine {
  constructor() {
    this.masterTimeline = null;
    this.scrollTriggerInstance = null;
    this.bokehField = null;
    this.fallingCodeEngine = null;
  }

  init() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.error('GSAP or ScrollTrigger library missing');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Initialize lightweight digital bokeh field for Scene 01
    this.initDigitalBokeh();

    // Initialize 3D Falling Code Engine (Scene 03 - 07)
    this.initFallingCodeEngine();

    // Master ScrollTrigger timeline (scrub: 1, strictly reversible)
    this.initMasterTimeline();

    // Kinetic fluid cursor follower & sparks engine
    this.bindKineticCursor();
    this.initMorphSparksEngine();

    // UI interactions & form engine
    this.bindPillSelectors();
    this.bindProjectForm();
    this.bindNavigationAndCTA();
    this.bindMagneticCTA();
    this.bind3DTiltInteractions();
    this.bind3DLaptopGyroscope();
    this.initScrollWatchers();
  }

  /* ==========================================================================
     01. LIGHTWEIGHT DIGITAL BOKEH ENERGY FIELD (SCENE 01)
     High-performance 60 FPS canvas with slow drift & sleep-when-scrolled-past
     ========================================================================== */
  initDigitalBokeh() {
    const canvas = document.getElementById('digitalBokehCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId = null;
    let isActive = true;
    let scrollDriftFactor = 0;

    const particles = [];
    const count = window.innerWidth < 768 ? 24 : 45;

    const colorPalette = [
      { r: 6, g: 182, b: 212 },   // Cyan
      { r: 59, g: 130, b: 246 },  // Electric Blue
      { r: 139, g: 92, b: 246 },  // Subtle Violet
      { r: 15, g: 23, b: 52 }     // Deep Navy
    ];

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Populate particles
    for (let i = 0; i < count; i++) {
      const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 22 + 8,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        baseAlpha: Math.random() * 0.35 + 0.15,
        alpha: 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        pulseOffset: Math.random() * Math.PI * 2,
        color: c
      });
    }

    let time = 0;
    const render = () => {
      if (!isActive) return;

      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx + scrollDriftFactor * 0.5;
        p.y += p.vy - scrollDriftFactor * 1.2;

        // Wrap around boundaries
        if (p.x < -p.radius * 2) p.x = width + p.radius;
        if (p.x > width + p.radius * 2) p.x = -p.radius;
        if (p.y < -p.radius * 2) p.y = height + p.radius;
        if (p.y > height + p.radius * 2) p.y = -p.radius;

        // Breathing pulse
        const alpha = p.baseAlpha + Math.sin(time * 2 + p.pulseOffset) * 0.1;

        // Radial bokeh glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        grad.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${Math.max(0, alpha)})`);
        grad.addColorStop(0.6, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${Math.max(0, alpha * 0.4)})`);
        grad.addColorStop(1, 'rgba(5, 8, 22, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    this.bokehField = {
      setScrollDrift: (factor) => {
        scrollDriftFactor = factor;
      },
      setActive: (active) => {
        if (active && !isActive) {
          isActive = true;
          render();
        } else if (!active && isActive) {
          isActive = false;
          cancelAnimationFrame(animationFrameId);
        }
      }
    };
  }

  /* ==========================================================================
     01B. 3D FALLING CODE STREAM ENGINE (SCENES 03–07)
     Codes dropping from the air in 3D perspective space with zero-g physics
     ========================================================================== */
  initFallingCodeEngine() {
    const canvas = document.getElementById('fallingCodeCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId = null;
    let isActive = false;
    let speedMultiplier = 1.0;

    const codeTokens = [
      'const idea = "YOUR VISION";',
      'await buildTomorrow();',
      'export default SpatialApp;',
      '<UIComponent depth={3D} />',
      'git commit -m "ship product"',
      '01000101 01000111',
      'const scale = Infinity;',
      'render3D(cyberspace);',
      'function deploy() { return 200; }',
      '{ growth: "1000x", prestige: "global" }',
      'new EGTechEngine()',
      'import { Future } from "egtech";',
      'transform3D({ perspective: 1800 })',
      'npm run build --production',
      'while(vision) { innovate(); }',
      'edge.sync({ latency: 0.1 });'
    ];

    const colors = [
      'rgba(6, 182, 212, ',    // Cyan
      'rgba(59, 130, 246, ',   // Blue
      'rgba(245, 158, 11, ',   // Gold
      'rgba(139, 92, 246, ',   // Violet
      'rgba(16, 185, 129, ',   // Emerald
      'rgba(236, 72, 153, '    // Pink
    ];

    const streams = [];
    const streamCount = window.innerWidth < 768 ? 20 : 42;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    for (let i = 0; i < streamCount; i++) {
      const z = Math.random() * 0.8 + 0.2; // 0.2 = deep background, 1.0 = foreground
      streams.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        speed: (Math.random() * 3.5 + 2.5) * z,
        z: z,
        fontSize: Math.floor(10 * z + 8),
        color: colors[Math.floor(Math.random() * colors.length)],
        text: codeTokens[Math.floor(Math.random() * codeTokens.length)],
        alpha: Math.random() * 0.5 + 0.35
      });
    }

    const render = () => {
      if (!isActive) return;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < streams.length; i++) {
        const s = streams[i];
        s.y += s.speed * speedMultiplier;

        if (s.y > height + 50) {
          s.y = -50 - Math.random() * 100;
          s.x = Math.random() * width;
          s.text = codeTokens[Math.floor(Math.random() * codeTokens.length)];
        }

        ctx.font = `${s.fontSize}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = `${s.color}${s.alpha * s.z})`;

        // Draw glowing code token
        ctx.fillText(s.text, s.x, s.y);

        // Subtle glow streak behind
        if (s.z > 0.6) {
          ctx.strokeStyle = `${s.color}${s.alpha * 0.2})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(s.x + 20, s.y - 12);
          ctx.lineTo(s.x + 20, s.y - 36);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    this.fallingCodeEngine = {
      setActive: (active) => {
        if (active && !isActive) {
          isActive = true;
          render();
        } else if (!active && isActive) {
          isActive = false;
          cancelAnimationFrame(animationFrameId);
        }
      },
      setSpeed: (mult) => {
        speedMultiplier = Math.max(0.5, Math.min(4.0, mult));
      }
    };
  }

  /* ==========================================================================
     02. MASTER SCROLL-DRIVEN CINEMATIC MASTER TIMELINE (SCRUB: 1)
     Zero autoplay. Pure scroll = timeline. Bidirectional.
     ========================================================================== */
  initMasterTimeline() {
    // Initial GPU element states for flawless timeline synchronization
    gsap.set('#sceneIntro', { opacity: 1, force3D: true });
    gsap.set(['#introEyebrow', '#introStatement', '#introSubLine', '#scrollCue'], { opacity: 1, y: 0, force3D: true });

    // Scene 02: Client Request
    gsap.set('#sceneClientRequest', { opacity: 0, pointerEvents: 'none', force3D: true });
    gsap.set('#clientRequestCard', { opacity: 0, y: 35, scale: 0.94, force3D: true });
    gsap.set('#chatClientBubble', { opacity: 0, x: -25, force3D: true });
    gsap.set('#chatStudioBubble', { opacity: 0, x: 25, force3D: true });
    gsap.set('#startActionPill', { opacity: 0, scale: 0.85, force3D: true });

    // Scene 03 - 07: 3D Laptop Dropping from the Air, Cyber Grid & Falling Code
    gsap.set('#perspectiveGridFloor', { opacity: 0, force3D: true });
    gsap.set('#volumetricLightCone', { opacity: 0, force3D: true });
    gsap.set('#gridShockwaveRing', { scale: 0.1, opacity: 0, force3D: true });
    gsap.set('#fallingCodeStage', { opacity: 1, force3D: true });
    gsap.set('.falling-code-card', { opacity: 0, y: -800, force3D: true });
    gsap.set('#fallingCodeCanvas', { opacity: 0, force3D: true });
    gsap.set('#orbitingTechHalo', { opacity: 0, scale: 0.75, force3D: true });

    // 3D Laptop starts high in the atmosphere (dropping from the air)
    gsap.set('#laptopWrapper', {
      opacity: 0,
      y: -750,
      z: -380,
      rotateX: -34,
      rotateY: 26,
      rotateZ: -12,
      scale: 0.65,
      force3D: true
    });
    gsap.set('#laptop3dShadow', {
      opacity: 0,
      scale: 0.35,
      filter: 'blur(35px)',
      force3D: true
    });
    gsap.set('#metaphorBanner', { opacity: 0, y: 15, force3D: true });
    gsap.set('#ideFileTree', { opacity: 0, x: -15, force3D: true });
    gsap.set(['#cLine1', '#cLine2', '#cLine3', '#cLine4', '#cLine5', '#cLine6'], {
      opacity: 0,
      y: 8,
      force3D: true
    });

    // Scene 05: Signature Code-to-UI Morph Tokens
    gsap.set('#tokenNavbar', { opacity: 0, x: 15, y: 35, scale: 0.8, force3D: true });
    gsap.set('#tokenCard', { opacity: 0, x: 15, y: 95, scale: 0.8, force3D: true });
    gsap.set('#tokenBtn', { opacity: 0, x: 15, y: 155, scale: 0.8, force3D: true });

    // Scene 06 & 07: Browser Preview & Bottom Slide-Up Terminal Drawer
    gsap.set('#previewBrowserViewport .comp-item', { opacity: 0, y: 14, force3D: true });
    gsap.set('#ideTerminalDrawer', { y: '100%', force3D: true });
    gsap.set(['#tLine1', '#tLine2', '#tLine3', '#tLine4', '#tLine5', '#tLine6'], {
      opacity: 0,
      y: 6,
      force3D: true
    });
    gsap.set('#buildStatusStage', { opacity: 0, y: -12, force3D: true });

    // Scene 08 & 10: Fullscreen Client Flagship (Vibe Attire)
    gsap.set('#sceneClient', { opacity: 0, scale: 0.96, pointerEvents: 'none', force3D: true });

    // Scene 11: Color Collapse Rings
    gsap.set('#sceneColorCollapse', { opacity: 0, pointerEvents: 'none', force3D: true });
    gsap.set(['#ringPink', '#ringViolet', '#ringBlue', '#ringCyan', '#ringGold'], { scale: 1.5, opacity: 0, force3D: true });

    // Scene 12: EG TECH Brand Reveal
    gsap.set('#sceneBrand', { opacity: 0, pointerEvents: 'none', force3D: true });
    gsap.set(['#taglineTop', '#taglineBottom'], { opacity: 0, y: 22, force3D: true });
    gsap.set('#egEmblem', { opacity: 0, scale: 0.72, force3D: true });
    gsap.set('#egBrandText', { opacity: 0, y: 22, force3D: true });
    gsap.set(['#kLine1', '#kLine2', '#kLine3'], { opacity: 0, y: 16, force3D: true });

    // Master ScrollTrigger Timeline
    this.masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#scrollTrack',
        start: 'top top',
        end: '+=5800', // Perfectly paced scroll length
        pin: '#pinnedStage',
        scrub: 1, // Fluid catch-up on wheel, trackpad, and touch
        anticipatePin: 1,
        fastScrollEnd: true,
        preventOverlaps: true,
        onUpdate: (self) => {
          this.handleTimelineProgress(self.progress);
        }
      }
    });

    const tl = this.masterTimeline;

    /* ------------------------------------------------------------------------
       BEAT 1: SCENE 01 — DIGITAL BOKEH INTRO (0.00 – 1.40s)
       "EVERY DIGITAL PRODUCT STARTS WITH AN IDEA." -> Particles drift, intro dissolves
       ------------------------------------------------------------------------ */
    tl.to(['#introEyebrow', '#introStatement', '#introSubLine'], {
      opacity: 0,
      y: -40,
      scale: 1.03,
      duration: 1.1,
      ease: 'power2.inOut'
    }, 0.2)
    .to('#scrollCue', {
      opacity: 0,
      y: -20,
      duration: 0.7,
      ease: 'power2.inOut'
    }, 0.2)
    .to('#sceneIntro', {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut'
    }, 0.9)
    .set('#sceneIntro', { pointerEvents: 'none' }, 1.3);

    /* ------------------------------------------------------------------------
       BEAT 2: SCENE 02 — CLIENT REQUEST (1.00 – 3.20s)
       "I have an idea. Can you turn it into a website?" -> "Let's build it." -> START
       ------------------------------------------------------------------------ */
    tl.to('#sceneClientRequest', {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out'
    }, 1.0)
    .to('#clientRequestCard', {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: 'power2.out'
    }, 1.1)
    .to('#chatClientBubble', {
      opacity: 1,
      x: 0,
      duration: 0.5,
      ease: 'power2.out'
    }, 1.3)
    .to('#chatStudioBubble', {
      opacity: 1,
      x: 0,
      duration: 0.5,
      ease: 'power2.out'
    }, 1.7)
    .to('#startActionPill', {
      opacity: 1,
      scale: 1,
      duration: 0.45,
      ease: 'back.out(1.5)'
    }, 2.0)
    // Settle, then compress forward to activate laptop workspace
    .to('#clientRequestCard', {
      opacity: 0,
      y: -30,
      scale: 0.9,
      duration: 0.7,
      ease: 'power2.inOut'
    }, 2.6)
    .to('#sceneClientRequest', {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in'
    }, 2.9);

    /* ------------------------------------------------------------------------
       BEAT 3: SCENE 03 — 3D LAPTOP DROPPING FROM THE AIR & 3D CODE STREAM CASCADE (2.60 – 5.00s)
       Chassis swoops down from cyberspace atmosphere, settling smoothly with 3D shadow & shockwave
       Codes rain down from above in 3D perspective space into orbital positions around laptop
       ------------------------------------------------------------------------ */
    tl.to('#perspectiveGridFloor', {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out'
    }, 2.6)
    .to('#volumetricLightCone', {
      opacity: 0.75,
      duration: 0.9,
      ease: 'power2.out'
    }, 2.7)
    .to('#fallingCodeCanvas', {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out'
    }, 2.7)
    // The 3D Laptop drops gracefully from the air!
    .to('#laptopWrapper', {
      opacity: 1,
      y: 0,
      z: 0,
      rotateX: 6,
      rotateY: -10,
      rotateZ: 2,
      scale: 1,
      duration: 1.5,
      ease: 'power2.out'
    }, 2.7)
    // 3D Shadow lands and sharpens with proximity
    .to('#laptop3dShadow', {
      opacity: 0.85,
      scale: 1,
      filter: 'blur(16px)',
      duration: 1.5,
      ease: 'power2.out'
    }, 2.7)
    // Dual Chromatic Shockwave pulse on landing
    .fromTo('#gridShockwaveRing1', {
      scale: 0.2,
      opacity: 0.95
    }, {
      scale: 3.8,
      opacity: 0,
      duration: 1.0,
      ease: 'power2.out'
    }, 3.5)
    .fromTo('#gridShockwaveRing2', {
      scale: 0.2,
      opacity: 0.9
    }, {
      scale: 4.4,
      opacity: 0,
      duration: 1.25,
      ease: 'power2.out'
    }, 3.58)
    // Aerodynamic descent vapor trails dissolve on touchdown
    .fromTo('#aeroTrails', {
      opacity: 0.95,
      y: -120
    }, {
      opacity: 0,
      y: 80,
      duration: 1.1,
      ease: 'power2.out'
    }, 2.7)
    // 3D Floating Cyber Geometry Wireframe Prisms materialize
    .to('#floatingPrismsStage', {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out'
    }, 2.8)
    // 3D Codes dropping from the air in staggered formation
    .to('#fcc1', { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.2)' }, 2.9)
    .to('#fcc2', { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.2)' }, 3.05)
    .to('#fcc3', { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.2)' }, 3.2)
    .to('#fcc4', { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.2)' }, 3.35)
    .to('#fcc5', { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.2)' }, 3.5)
    .to('#fcc6', { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.2)' }, 3.65)
    // 3D Orbiting tech badges appear
    .to('#orbitingTechHalo', {
      opacity: 1,
      scale: 1,
      duration: 0.9,
      ease: 'back.out(1.3)'
    }, 3.3)
    .to('#metaphorBanner', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, 3.5)
    .to('#ideFileTree', {
      opacity: 1,
      x: 0,
      duration: 0.5,
      ease: 'power2.out'
    }, 3.8);

    /* ------------------------------------------------------------------------
       BEAT 4: SCENE 04 — INTEGRATED IDE & SCROLL-DRIVEN CODE REVEAL (4.20 – 6.60s)
       Selected meaningful lines reveal with cursor & dynamic backlit keycap ripple
       ------------------------------------------------------------------------ */
    tl.to('#cLine1', { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 4.2)
    .call(() => this.triggerKeyboardTyping(6), null, 4.2)
    .to('#cLine2', { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 4.5)
    .call(() => this.triggerKeyboardTyping(7), null, 4.5)
    .to('#cLine3', { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 4.8)
    .call(() => this.triggerKeyboardTyping(6), null, 4.8)
    .to('#cLine4', { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 5.1)
    .call(() => this.triggerKeyboardTyping(8), null, 5.1)
    .to('#cLine5', { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 5.4)
    .call(() => this.triggerKeyboardTyping(5), null, 5.4)
    .to('#cLine6', { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 5.7)
    .call(() => this.triggerKeyboardTyping(9), null, 5.7)
    .call(() => {
      const pill = document.getElementById('ideStatusText');
      if (pill) pill.textContent = 'COMPILING';
    }, null, 5.8)
    // 3D falling code cards funnel and dissolve into the glowing IDE screen
    .to(['#fcc1', '#fcc2', '#fcc3', '#fcc4', '#fcc5', '#fcc6'], {
      scale: 0.5,
      opacity: 0.2,
      y: 120,
      stagger: 0.08,
      duration: 1.0,
      ease: 'power2.in'
    }, 4.4)
    .to('#floatingPrismsStage', {
      opacity: 0.25,
      duration: 1.0,
      ease: 'power2.in'
    }, 5.5);

    /* ------------------------------------------------------------------------
       BEAT 5: SCENE 05 — SIGNATURE CODE-TO-UI MORPH (6.20 – 8.50s)
       <Navbar /> morphs to Navbar, <Card /> to Card, <Button /> to Button
       with energetic particle spark explosions
       ------------------------------------------------------------------------ */
    // <Navbar /> detaches & glides across into browser preview
    tl.to('#tokenNavbar', {
      opacity: 1,
      x: 210,
      y: 12,
      scale: 1.15,
      duration: 0.6,
      ease: 'power2.out'
    }, 6.2)
    .call(() => this.triggerMorphSparks && this.triggerMorphSparks(380, 40, 26), null, 6.6)
    .to('#tokenNavbar', {
      opacity: 0,
      scale: 1.35,
      duration: 0.25
    }, 6.7)
    .to('#pNav', { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 6.6)

    // <Card /> detaches & glides across
    .to('#tokenCard', {
      opacity: 1,
      x: 220,
      y: 75,
      scale: 1.15,
      duration: 0.6,
      ease: 'power2.out'
    }, 6.7)
    .call(() => this.triggerMorphSparks && this.triggerMorphSparks(420, 160, 30), null, 7.1)
    .to('#tokenCard', {
      opacity: 0,
      scale: 1.35,
      duration: 0.25
    }, 7.2)
    .to('#pHero', { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 7.1)
    .to('#pArt', { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 7.2)
    .to('#pCards', { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 7.4)

    // <Button /> detaches & glides across
    .to('#tokenBtn', {
      opacity: 1,
      x: 180,
      y: 110,
      scale: 1.15,
      duration: 0.6,
      ease: 'power2.out'
    }, 7.2)
    .call(() => this.triggerMorphSparks && this.triggerMorphSparks(360, 220, 24), null, 7.6)
    .to('#tokenBtn', {
      opacity: 0,
      scale: 1.35,
      duration: 0.25
    }, 7.7)
    .to('#previewCtaBtn', { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 7.6);

    /* ------------------------------------------------------------------------
       BEAT 6: SCENE 06 & 07 — TERMINAL BUILD PROCESS & BUILD COMPLETE (8.00 – 10.40s)
       $ npm install -> $ npm run build -> $ npm run deploy with neon progress fill
       ------------------------------------------------------------------------ */
    tl.to('#ideTerminalDrawer', {
      y: '0%',
      duration: 0.6,
      ease: 'power3.out'
    }, 8.0)
    .to('#termProgressBar', {
      width: '100%',
      duration: 1.7,
      ease: 'power2.inOut'
    }, 8.1)
    .call(() => {
      const badge = document.getElementById('termStatusBadge');
      if (badge) badge.textContent = 'BUILDING 45%';
    }, null, 8.2)
    .to('#tLine1', { opacity: 1, y: 0, duration: 0.3 }, 8.2)
    .to('#tLine2', { opacity: 1, y: 0, duration: 0.3 }, 8.4)
    .to('#tLine3', { opacity: 1, y: 0, duration: 0.3 }, 8.7)
    .call(() => {
      const badge = document.getElementById('termStatusBadge');
      if (badge) badge.textContent = 'OPTIMIZING 85%';
    }, null, 9.1)
    .to('#tLine4', { opacity: 1, y: 0, duration: 0.3 }, 9.0)
    .to('#tLine5', { opacity: 1, y: 0, duration: 0.3 }, 9.3)
    .to('#tLine6', { opacity: 1, y: 0, duration: 0.3 }, 9.6)
    .call(() => {
      const badge = document.getElementById('termStatusBadge');
      const ideStatus = document.getElementById('ideStatusText');
      const pbbLive = document.getElementById('pbbLivePill');
      if (badge) badge.textContent = 'DEPLOYED 100%';
      if (ideStatus) ideStatus.textContent = 'BUILD COMPLETE ✓';
      if (pbbLive) {
        pbbLive.textContent = '● LIVE';
        pbbLive.style.color = '#10B981';
      }
    }, null, 9.7)
    .to('#buildStatusStage', {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: 'power2.out'
    }, 9.8)
    .to('#previewCtaBtn', {
      boxShadow: '0 0 20px rgba(6, 182, 212, 0.8)',
      scale: 1.05,
      duration: 0.3
    }, 10.0)
    .to('#previewCtaBtn', {
      scale: 1,
      duration: 0.3
    }, 10.3)
    .to('#metaphorBanner', {
      opacity: 0,
      y: -10,
      duration: 0.4
    }, 10.2);

    /* ------------------------------------------------------------------------
       BEAT 7: SCENE 08 & 09 — SIGNATURE 3D SCREEN-ENTRY ZOOM (10.40 – 13.00s)
       Laptop zooms 5.2x with 3D Z-translation, bezels dissolve, camera plunges into live client site
       ------------------------------------------------------------------------ */
    tl.to('#laptopWrapper', {
      scale: 5.2,
      z: 750,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      y: 35,
      duration: 1.6,
      ease: 'power2.inOut'
    }, 10.4)
    .to('#laptop3dShadow', {
      opacity: 0,
      scale: 3,
      duration: 1.0,
      ease: 'power2.in'
    }, 10.4)
    .to('#perspectiveGridFloor', {
      opacity: 0,
      duration: 0.9
    }, 10.6)
    .to('#volumetricLightCone', {
      opacity: 0,
      duration: 0.8
    }, 10.5)
    .to('#orbitingTechHalo', {
      opacity: 0,
      scale: 2.2,
      duration: 0.8
    }, 10.5)
    .to('.falling-code-card', {
      opacity: 0,
      scale: 2.0,
      duration: 0.7
    }, 10.5)
    .to(['#laptopBase', '.lid-bezel', '.lid-camera', '#ideFileTree', '#ideTerminalDrawer', '#buildStatusStage', '.ide-titlebar'], {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.in'
    }, 10.6)
    // Fullscreen Vibe Attire reveals seamlessly
    .to('#sceneClient', {
      opacity: 1,
      scale: 1,
      duration: 1.0,
      ease: 'power2.out'
    }, 11.2)
    .set('#sceneClient', { pointerEvents: 'auto' }, 11.8)
    .set('#laptopWrapper', { opacity: 0 }, 12.2);

    /* ------------------------------------------------------------------------
       BEAT 8: SCENE 10 — LIVE CLIENT EXPERIENCE (12.20 – 14.60s)
       Holds fullscreen Vibe Attire for exploration
       ------------------------------------------------------------------------ */
    tl.to('#sceneClient', {
      scale: 0.96,
      duration: 0.8,
      ease: 'power2.inOut'
    }, 14.2)
    .to('#sceneClient', {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.in'
    }, 14.6)
    .set('#sceneClient', { pointerEvents: 'none' }, 14.8);

    /* ------------------------------------------------------------------------
       BEAT 9: SCENE 11 — DUAL-ENERGY COLOR COLLAPSE (14.60 – 16.40s)
       Concentric flowing color rings sweep through and converge toward center
       ------------------------------------------------------------------------ */
    tl.to('#sceneColorCollapse', {
      opacity: 1,
      duration: 0.4
    }, 14.7)
    .to('#ringPink', { scale: 0.22, opacity: 1, duration: 0.7, ease: 'power2.in' }, 14.8)
    .to('#ringViolet', { scale: 0.20, opacity: 1, duration: 0.7, ease: 'power2.in' }, 15.0)
    .to('#ringBlue', { scale: 0.18, opacity: 1, duration: 0.7, ease: 'power2.in' }, 15.2)
    .to('#ringCyan', { scale: 0.14, opacity: 1, duration: 0.7, ease: 'power2.in' }, 15.4)
    .to('#ringGold', { scale: 0.10, opacity: 1, duration: 0.7, ease: 'power2.in' }, 15.5)
    .to(['#ringPink', '#ringViolet', '#ringBlue', '#ringCyan', '#ringGold'], {
      opacity: 0,
      duration: 0.4
    }, 15.9)
    .to('#sceneColorCollapse', { opacity: 0, duration: 0.3 }, 16.2);

    /* ------------------------------------------------------------------------
       BEAT 10: SCENE 12 — EG TECH GRAND EMBLEM REVEAL (16.20 – 19.40s)
       Official company emblem with dual aura & sequential kinetic typography
       ------------------------------------------------------------------------ */
    tl.to('#sceneBrand', {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out'
    }, 16.2)
    .set('#sceneBrand', { pointerEvents: 'auto' }, 16.5)
    .to('#taglineTop', { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, 16.5)
    .to('#taglineBottom', { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, 16.8)
    .to('#egEmblem', { opacity: 1, scale: 1, duration: 0.65, ease: 'back.out(1.5)' }, 17.1)
    .to('#egBrandText', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 17.5)
    // Sequential kinetic statements with deliberate pauses
    .to('#kLine1', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 17.9)
    .to('#kLine2', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 18.5)
    .to('#kLine3', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 19.1);

    this.scrollTriggerInstance = tl.scrollTrigger;
  }

  /* ==========================================================================
     03. TIMELINE PROGRESS & HUD SYNCHRONIZATION
     Controls minimal 5-step HUD and transitions to studio header after film
     ========================================================================== */
  handleTimelineProgress(pinnedProgress) {
    // Bokeh canvas sleep/wake optimization
    if (this.bokehField) {
      if (pinnedProgress > 0.25) {
        this.bokehField.setActive(false);
      } else {
        this.bokehField.setActive(true);
        this.bokehField.setScrollDrift(pinnedProgress * 5);
      }
    }

    // 3D Falling Code Stream sleep/wake & velocity optimization (Scenes 03 - 07)
    if (this.fallingCodeEngine) {
      if (pinnedProgress >= 0.16 && pinnedProgress <= 0.62) {
        this.fallingCodeEngine.setActive(true);
        this.fallingCodeEngine.setSpeed(1.0 + (pinnedProgress - 0.16) * 3.5);
      } else {
        this.fallingCodeEngine.setActive(false);
      }
    }

    const totalDocHeight = document.documentElement.scrollHeight - window.innerHeight;
    const currentScroll = window.scrollY || window.pageYOffset;
    const globalProgress = totalDocHeight > 0 ? currentScroll / totalDocHeight : 0;

    // Side nav line fill
    const fill = document.getElementById('navProgressFill');
    if (fill) {
      fill.style.height = `${Math.min(100, Math.max(0, globalProgress * 100))}%`;
    }

    // Floating header reveal/hide transition
    const mainHeader = document.getElementById('mainHeader');
    if (mainHeader) {
      if (globalProgress >= 0.65 || pinnedProgress >= 0.98) {
        mainHeader.classList.remove('cinematic-nav-hidden');
        mainHeader.classList.add('cinematic-nav-visible');
      } else {
        mainHeader.classList.remove('cinematic-nav-visible');
        mainHeader.classList.add('cinematic-nav-hidden');
      }
    }

    // Update 5-stage progress indicator: 01 IDEA, 02 BUILD, 03 PRODUCT, 04 EG TECH, 05 START
    const dots = document.querySelectorAll('.nav-dot');
    if (!dots.length) return;

    let activeIdx = 0;
    if (globalProgress >= 0.92) {
      activeIdx = 4; // 05 START (Briefing Form)
    } else if (globalProgress >= 0.72) {
      activeIdx = 3; // 04 EG TECH (Brand / Services / Work)
    } else if (pinnedProgress >= 0.58) {
      activeIdx = 2; // 03 PRODUCT (Vibe Attire)
    } else if (pinnedProgress >= 0.18) {
      activeIdx = 1; // 02 BUILD (Laptop & Code)
    } else {
      activeIdx = 0; // 01 IDEA
    }

    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === activeIdx);
    });
  }

  initScrollWatchers() {
    window.addEventListener('scroll', () => {
      if (this.scrollTriggerInstance) {
        this.handleTimelineProgress(this.scrollTriggerInstance.progress);
      }
    }, { passive: true });
  }

  /* ==========================================================================
     04. NAVIGATION & SMOOTH SCROLLING
     ========================================================================== */
  bindNavigationAndCTA() {
    const dots = document.querySelectorAll('.nav-dot');
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        this.handleNavDotClick(idx);
      });
    });

    const navBrand = document.getElementById('navBrandLink');
    if (navBrand) {
      navBrand.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    const linkServices = document.getElementById('linkNavServices');
    if (linkServices) {
      linkServices.addEventListener('click', (e) => {
        e.preventDefault();
        const sec = document.getElementById('servicesSection');
        if (sec) sec.scrollIntoView({ behavior: 'smooth' });
      });
    }

    const linkWork = document.getElementById('linkNavWork');
    if (linkWork) {
      linkWork.addEventListener('click', (e) => {
        e.preventDefault();
        const sec = document.getElementById('workSection');
        if (sec) sec.scrollIntoView({ behavior: 'smooth' });
      });
    }

    const linkContact = document.getElementById('linkNavContact');
    if (linkContact) {
      linkContact.addEventListener('click', (e) => {
        e.preventDefault();
        this.scrollToForm();
      });
    }

    const btnNavCta = document.getElementById('btnNavCta');
    if (btnNavCta) {
      btnNavCta.addEventListener('click', () => this.scrollToForm());
    }

    const btnScrollToForm = document.getElementById('btnScrollToForm');
    if (btnScrollToForm) {
      btnScrollToForm.addEventListener('click', () => this.scrollToForm());
    }

    const btnClientShop = document.getElementById('btnClientShop');
    if (btnClientShop) {
      btnClientShop.addEventListener('click', () => {
        this.showToast('Vibe Attire demo loaded in sandbox mode');
      });
    }
  }

  handleNavDotClick(idx) {
    if (!this.scrollTriggerInstance) return;

    const start = this.scrollTriggerInstance.start;
    const end = this.scrollTriggerInstance.end;
    const totalDist = end - start;

    switch (idx) {
      case 0: // 01 IDEA
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 1: // 02 BUILD
        window.scrollTo({ top: start + totalDist * 0.25, behavior: 'smooth' });
        break;
      case 2: // 03 PRODUCT
        window.scrollTo({ top: start + totalDist * 0.60, behavior: 'smooth' });
        break;
      case 3: // 04 EG TECH
        window.scrollTo({ top: start + totalDist * 0.88, behavior: 'smooth' });
        break;
      case 4: // 05 START
        this.scrollToForm();
        break;
      default:
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  scrollToForm() {
    const formSec = document.getElementById('projectFormSection');
    if (formSec) {
      formSec.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const firstInput = document.getElementById('fName');
        if (firstInput) firstInput.focus();
      }, 600);
    }
  }

  /* ==========================================================================
     05. PROJECT BRIEFING FORM & SQLITE REST API
     ========================================================================== */
  bindPillSelectors() {
    const bindGrid = (gridId, hiddenInputId) => {
      const grid = document.getElementById(gridId);
      const hidden = document.getElementById(hiddenInputId);
      if (!grid || !hidden) return;

      const buttons = grid.querySelectorAll('.pill-btn');
      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          buttons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          hidden.value = btn.dataset.val || btn.textContent.trim();
        });
      });
    };

    bindGrid('projectTypeGrid', 'fProjectType');
    bindGrid('budgetGrid', 'fBudget');
    bindGrid('timelineGrid', 'fTimeline');
  }

  bindProjectForm() {
    const form = document.getElementById('projectInquiryForm');
    const successCard = document.getElementById('formSuccessCard');
    const submitBtn = document.getElementById('btnSubmit');
    const submitLabel = document.getElementById('btnSubmitLabel');
    const btnAnother = document.getElementById('btnAnotherBrief');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      this.clearFormErrors();

      const name = document.getElementById('fName')?.value.trim();
      const email = document.getElementById('fEmail')?.value.trim();
      const phone = document.getElementById('fPhone')?.value.trim();
      const company = document.getElementById('fCompany')?.value.trim() || '';
      const projectType = document.getElementById('fProjectType')?.value || 'Website';
      const description = document.getElementById('fDesc')?.value.trim();
      const budget = document.getElementById('fBudget')?.value || '₹25K – ₹50K';
      const timeline = document.getElementById('fTimeline')?.value || '1–2 Weeks';
      const referenceUrl = document.getElementById('fRef')?.value.trim() || '';
      const fileInput = document.getElementById('fFile');
      const attachmentName = fileInput?.files?.[0]?.name || '';

      let hasError = false;

      if (!name) {
        this.showFieldError('err-name', 'Please enter your full name.');
        hasError = true;
      }

      if (!email || !this.validateEmail(email)) {
        this.showFieldError('err-email', 'Please provide a valid business email.');
        hasError = true;
      }

      if (!phone || phone.length < 7) {
        this.showFieldError('err-phone', 'Please provide a valid phone number.');
        hasError = true;
      }

      if (!description || description.length < 10) {
        this.showFieldError('err-desc', 'Please provide at least 10 characters detailing your idea.');
        hasError = true;
      }

      if (hasError) return;

      // Processing state
      if (submitBtn) submitBtn.disabled = true;
      if (submitLabel) submitLabel.textContent = 'TRANSMITTING BRIEF...';

      const payload = {
        name,
        email,
        phone,
        company,
        projectType,
        description,
        budget,
        timeline,
        referenceUrl,
        attachmentName
      };

      try {
        const response = await fetch('/api/project-inquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const resData = await response.json().catch(() => ({}));

        if (response.ok && resData.success !== false) {
          form.style.display = 'none';
          if (successCard) successCard.style.display = 'block';
          this.showToast('Brief successfully received by EG TECH');
        } else {
          // Fallback to local persistence if offline
          this.saveInquiryLocally(payload);
          form.style.display = 'none';
          if (successCard) successCard.style.display = 'block';
          this.showToast('Brief recorded locally (offline mode)');
        }
      } catch (err) {
        // Fallback to local persistence
        this.saveInquiryLocally(payload);
        form.style.display = 'none';
        if (successCard) successCard.style.display = 'block';
        this.showToast('Brief saved securely in offline storage');
      } finally {
        if (submitBtn) submitBtn.disabled = false;
        if (submitLabel) submitLabel.textContent = 'SUBMIT PROJECT';
      }
    });

    if (btnAnother && form && successCard) {
      btnAnother.addEventListener('click', () => {
        form.reset();
        successCard.style.display = 'none';
        form.style.display = 'block';
        this.resetPillDefaults();
      });
    }
  }

  saveInquiryLocally(payload) {
    try {
      const existing = JSON.parse(localStorage.getItem('egtech_offline_inquiries') || '[]');
      payload.timestamp = new Date().toISOString();
      existing.push(payload);
      localStorage.setItem('egtech_offline_inquiries', JSON.stringify(existing));
    } catch (e) {
      console.warn('LocalStorage unavailable', e);
    }
  }

  resetPillDefaults() {
    const activateFirst = (gridId, hiddenId, defaultVal) => {
      const grid = document.getElementById(gridId);
      const hidden = document.getElementById(hiddenId);
      if (grid && hidden) {
        const btns = grid.querySelectorAll('.pill-btn');
        btns.forEach(b => {
          b.classList.toggle('active', (b.dataset.val || b.textContent.trim()) === defaultVal);
        });
        hidden.value = defaultVal;
      }
    };
    activateFirst('projectTypeGrid', 'fProjectType', 'Website');
    activateFirst('budgetGrid', 'fBudget', '₹25K – ₹50K');
    activateFirst('timelineGrid', 'fTimeline', '1–2 Weeks');
  }

  validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  showFieldError(id, msg) {
    const el = document.getElementById(id);
    if (el) el.textContent = msg;
  }

  clearFormErrors() {
    const errs = document.querySelectorAll('.f-err');
    errs.forEach(e => e.textContent = '');
  }

  showToast(msg) {
    const toastBox = document.getElementById('toastBox');
    if (!toastBox) return;

    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.textContent = msg;
    toastBox.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  /* ==========================================================================
     06. MAGNETIC CTA HOVER & 3D TILT MICRO-PHYSICS
     ========================================================================== */
  bindMagneticCTA() {
    const magneticBtns = document.querySelectorAll('.btn-start-project-main, .nav-cta-btn');
    if (window.innerWidth < 1024) return;

    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, {
          x: x * 0.28,
          y: y * 0.28,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.4)'
        });
      });
    });
  }

  bind3DTiltInteractions() {
    const cards = document.querySelectorAll('.service-item, .work-case-item, .client-request-card');
    if (window.innerWidth < 1024) return;

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        // Dynamic flashlight glare coordinates
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);

        gsap.to(card, {
          rotateY: x * 6,
          rotateX: -y * 6,
          transformPerspective: 900,
          duration: 0.4,
          ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateY: 0,
          rotateX: 0,
          duration: 0.7,
          ease: 'power2.out'
        });
      });
    });
  }

  /* ==========================================================================
     07. 3D GYROSCOPIC MOUSE TRACKING & MULTI-PLANE PERSPECTIVE ORBIT
     Enables realistic 3D physical orbit of the floating laptop, shadow, & code
     ========================================================================== */
  bind3DLaptopGyroscope() {
    if (window.innerWidth < 1024) return;

    const laptop = document.getElementById('stylizedLaptop');
    const shadow = document.getElementById('laptop3dShadow');
    const halo = document.getElementById('orbitingTechHalo');
    const cards = document.querySelectorAll('.falling-code-card');
    if (!laptop) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    window.addEventListener('mousemove', (e) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = (e.clientY / window.innerHeight) * 2 - 1;
      targetX = normX;
      targetY = normY;
    }, { passive: true });

    const update3DPhysics = () => {
      // Smooth lerp damping
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      // 3D tilt angles for the laptop
      const tiltX = 6 - currentY * 14;
      const tiltY = -10 + currentX * 18;
      const tiltZ = 2 + currentX * 3;

      gsap.set(laptop, {
        rotateX: tiltX,
        rotateY: tiltY,
        rotateZ: tiltZ,
        transformPerspective: 1800,
        force3D: true
      });

      if (shadow) {
        gsap.set(shadow, {
          x: -currentX * 35,
          y: currentY * 15,
          rotateX: 75 + currentY * 5,
          force3D: true
        });
      }

      if (halo) {
        gsap.set(halo, {
          rotateY: currentX * 22,
          rotateX: -currentY * 16,
          force3D: true
        });
      }

      cards.forEach((card, idx) => {
        const factor = (idx % 3 + 1) * 12;
        gsap.set(card, {
          x: currentX * factor,
          y: currentY * factor * 0.8,
          force3D: true
        });
      });

      requestAnimationFrame(update3DPhysics);
    };

    update3DPhysics();
  }

  /* ==========================================================================
     08. KINETIC FLUID GLOWING CURSOR FOLLOWER
     Spring physics, smooth magnetic lag, hover scale & active touch safety
     ========================================================================== */
  bindKineticCursor() {
    const cursorFollower = document.getElementById('cursorFollower');
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    if (!cursorFollower || !dot || !ring) return;

    // Respect touch devices and reduced-motion preferences
    if (!window.matchMedia('(pointer: fine)').matches || window.innerWidth < 1024) {
      cursorFollower.style.display = 'none';
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX;
    let dotY = mouseY;
    let ringX = mouseX;
    let ringY = mouseY;
    let isVisible = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        cursorFollower.style.opacity = '1';
      }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      cursorFollower.style.opacity = '0';
      isVisible = false;
    });

    const interactiveSelector = 'a, button, input, textarea, select, .pill-btn, .falling-code-card, .service-item, .work-case-item, .key, .prism-cube, .v-card, .filter-chip, .editor-tab';

    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactiveSelector)) {
        ring.classList.add('cursor-active');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactiveSelector)) {
        ring.classList.remove('cursor-active');
      }
    });

    document.addEventListener('mousedown', () => {
      dot.style.transform = 'translate(-50%, -50%) scale(1.6)';
      ring.style.transform = 'translate(-50%, -50%) scale(0.82)';
    });

    document.addEventListener('mouseup', () => {
      dot.style.transform = 'translate(-50%, -50%) scale(1)';
      ring.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    const renderCursor = () => {
      // Fast responsive follow for core center dot
      dotX += (mouseX - dotX) * 0.35;
      dotY += (mouseY - dotY) * 0.35;

      // Elastic spring lag for ambient luminous ring
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      dot.style.left = `${dotX}px`;
      dot.style.top = `${dotY}px`;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;

      requestAnimationFrame(renderCursor);
    };
    renderCursor();
  }

  /* ==========================================================================
     09. HIGH-PERFORMANCE MORPH SPARKS PARTICLE ENGINE
     Energetic particle burst on code-to-UI component transformations
     ========================================================================== */
  initMorphSparksEngine() {
    const canvas = document.getElementById('morphSparksCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const sparks = [];
    let animId = null;

    const resize = () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.offsetWidth || 800;
        height = canvas.height = canvas.parentElement.offsetHeight || 500;
      }
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    this.triggerMorphSparks = (originX = width / 2, originY = height / 2, count = 28) => {
      const palette = ['#06B6D4', '#8B5CF6', '#F59E0B', '#10B981', '#38BDF8', '#ffffff'];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5.5 + 2.2;
        sparks.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 2.8 + 1.2,
          alpha: 1,
          decay: Math.random() * 0.026 + 0.016,
          color: palette[Math.floor(Math.random() * palette.length)]
        });
      }
      if (!animId) {
        animId = requestAnimationFrame(loop);
      }
    };

    const loop = () => {
      if (sparks.length === 0) {
        ctx.clearRect(0, 0, width, height);
        animId = null;
        return;
      }

      ctx.clearRect(0, 0, width, height);
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.95;
        s.vy *= 0.95;
        s.alpha -= s.decay;

        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, s.alpha);
        ctx.fillStyle = s.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(loop);
    };
  }

  /* ==========================================================================
     10. BACKLIT KEYBOARD CHICLET TYPING RIPPLE
     Simulates hardware keystrokes in real-time as lines appear in the IDE
     ========================================================================== */
  triggerKeyboardTyping(count = 6) {
    const keys = document.querySelectorAll('#laptopBase .key');
    if (!keys || keys.length === 0) return;
    for (let i = 0; i < count; i++) {
      const randomIdx = Math.floor(Math.random() * keys.length);
      const key = keys[randomIdx];
      if (key) {
        setTimeout(() => {
          key.classList.add('key-active');
          setTimeout(() => {
            key.classList.remove('key-active');
          }, 110 + Math.random() * 60);
        }, i * 28);
      }
    }
  }
}
