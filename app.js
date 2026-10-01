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
  }

  init() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.error('GSAP or ScrollTrigger library missing');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Initialize lightweight digital bokeh field for Scene 01
    this.initDigitalBokeh();

    // Master ScrollTrigger timeline (scrub: 1, strictly reversible)
    this.initMasterTimeline();

    // UI interactions & form engine
    this.bindPillSelectors();
    this.bindProjectForm();
    this.bindNavigationAndCTA();
    this.bindMagneticCTA();
    this.bind3DTiltInteractions();
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

    // Scene 03 - 07: 2.5D Laptop & Integrated Developer Workspace
    gsap.set('#laptopWrapper', { opacity: 0, y: 80, scale: 0.84, force3D: true });
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
       BEAT 3: SCENE 03 — 2.5D METALLIC LAPTOP REVEAL (2.80 – 5.00s)
       Chassis rises from workspace, settling smoothly to eye level
       ------------------------------------------------------------------------ */
    tl.to('#laptopWrapper', {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: 'power2.out'
    }, 2.8)
    .to('#metaphorBanner', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, 3.3)
    .to('#ideFileTree', {
      opacity: 1,
      x: 0,
      duration: 0.5,
      ease: 'power2.out'
    }, 3.6);

    /* ------------------------------------------------------------------------
       BEAT 4: SCENE 04 — INTEGRATED IDE & SCROLL-DRIVEN CODE REVEAL (4.20 – 6.60s)
       Selected meaningful lines reveal with cursor
       ------------------------------------------------------------------------ */
    tl.to('#cLine1', { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 4.2)
    .to('#cLine2', { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 4.5)
    .to('#cLine3', { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 4.8)
    .to('#cLine4', { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 5.1)
    .to('#cLine5', { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 5.4)
    .to('#cLine6', { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 5.7)
    .call(() => {
      const pill = document.getElementById('ideStatusText');
      if (pill) pill.textContent = 'COMPILING';
    }, null, 5.8);

    /* ------------------------------------------------------------------------
       BEAT 5: SCENE 05 — SIGNATURE CODE-TO-UI MORPH (6.20 – 8.50s)
       <Navbar /> morphs to Navbar, <Card /> to Card, <Button /> to Button
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
    .to('#tokenBtn', {
      opacity: 0,
      scale: 1.35,
      duration: 0.25
    }, 7.7)
    .to('#previewCtaBtn', { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 7.6);

    /* ------------------------------------------------------------------------
       BEAT 6: SCENE 06 & 07 — TERMINAL BUILD PROCESS & BUILD COMPLETE (8.00 – 10.40s)
       $ npm install -> $ npm run build -> $ npm run deploy
       ------------------------------------------------------------------------ */
    tl.to('#ideTerminalDrawer', {
      y: '0%',
      duration: 0.6,
      ease: 'power3.out'
    }, 8.0)
    .call(() => {
      const badge = document.getElementById('termStatusBadge');
      if (badge) badge.textContent = 'BUILDING';
    }, null, 8.1)
    .to('#tLine1', { opacity: 1, y: 0, duration: 0.3 }, 8.2)
    .to('#tLine2', { opacity: 1, y: 0, duration: 0.3 }, 8.4)
    .to('#tLine3', { opacity: 1, y: 0, duration: 0.3 }, 8.7)
    .to('#tLine4', { opacity: 1, y: 0, duration: 0.3 }, 9.0)
    .to('#tLine5', { opacity: 1, y: 0, duration: 0.3 }, 9.3)
    .to('#tLine6', { opacity: 1, y: 0, duration: 0.3 }, 9.6)
    .call(() => {
      const badge = document.getElementById('termStatusBadge');
      const ideStatus = document.getElementById('ideStatusText');
      const pbbLive = document.getElementById('pbbLivePill');
      if (badge) badge.textContent = 'DEPLOYED';
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
       BEAT 7: SCENE 08 & 09 — SIGNATURE SCREEN-ENTRY ZOOM (10.40 – 13.00s)
       Laptop zooms 4.6x, bezels dissolve, camera enters into fullscreen client site
       ------------------------------------------------------------------------ */
    tl.to('#laptopWrapper', {
      scale: 4.6,
      y: -20,
      duration: 1.5,
      ease: 'power2.inOut'
    }, 10.4)
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
}
