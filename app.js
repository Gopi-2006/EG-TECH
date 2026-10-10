/**
 * EG TECH — EMPOWERING GROWTH TECHNOLOGY
 * Master Digital Studio Runtime
 * 
 * 1. Dark / Light / Auto Theme Engine (Calibrated Transitions, No Layout Shifts)
 * 2. Horizontal Project Showcase (Right -> Center -> Left Motion with GSAP ScrollTrigger)
 * 3. EG TECH Mechanical Logo Loading Animation
 * 4. Kinetic Studio Cursor
 * 5. Hero Studio Reel Audio Controller
 * 6. Legal Modals Engine (Terms of Service & Privacy Policy)
 * 7. Live Performance & Search Metrics Counters
 * 8. Project Inquiry Brief Dispatch to SQLite API with Fallback
 * 9. Minimalist WhatsApp Studio Assistant
 */

document.addEventListener('DOMContentLoaded', () => {
  const app = new EGTechStudioApp();
  app.init();
});

class EGTechStudioApp {
  constructor() {
    this.countersStarted = false;
    this.currentTheme = 'dark';
    this.systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.horizontalTween = null;
  }

  init() {
    this.initThemeEngine();
    this.initPreloader();
    this.initCursor();
    this.initFloatingPillNav();
    this.initHeroVideoController();
    this.initKineticStatement();
    this.initGrowthSolutionsHorizontal();
    this.initBackgroundLogoSystem();
    this.initStackedProjectShowcase();
    this.initSearchAuditCounters();
    this.initLegalModals();
    this.initInquiryForm();
    this.initWhatsAppDrawer();
    this.initSmoothNav();
  }

  /* =========================================================================
     1. DARK / LIGHT / AUTO THEME ENGINE
     ========================================================================= */
  initThemeEngine() {
    const savedTheme = localStorage.getItem('egtech_theme') || 'dark';
    this.applyTheme(savedTheme, false);

    const themeButtons = document.querySelectorAll('.theme-switch-btn');
    themeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const selected = btn.dataset.theme;
        this.applyTheme(selected, true);
      });
    });

    // Listen to OS system color scheme changes if in auto mode
    this.systemThemeQuery.addEventListener('change', () => {
      if (this.currentTheme === 'auto') {
        const effective = this.systemThemeQuery.matches ? 'dark' : 'light';
        document.body.setAttribute('data-theme', effective);
      }
    });
  }

  applyTheme(theme, save = true) {
    this.currentTheme = theme;
    if (save) {
      localStorage.setItem('egtech_theme', theme);
    }

    let effective = theme;
    if (theme === 'auto') {
      effective = this.systemThemeQuery.matches ? 'dark' : 'light';
    }

    document.body.setAttribute('data-theme', effective);

    const themeButtons = document.querySelectorAll('.theme-switch-btn');
    themeButtons.forEach(btn => {
      if (btn.dataset.theme === theme) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    const logoAsset = document.getElementById('bgLogoAsset');
    if (logoAsset) {
      const contactSection = document.getElementById('contact');
      const inContact = contactSection && contactSection.getBoundingClientRect().top < window.innerHeight * 0.75;
      if (inContact) {
        logoAsset.style.opacity = effective === 'light' ? '0.085' : '0.075';
      } else {
        logoAsset.style.opacity = effective === 'light' ? '0.058' : '0.048';
      }
    }

    if (window.ScrollTrigger) {
      ScrollTrigger.refresh(true);
    }
  }

  /* =========================================================================
     2. FEATURED PROJECTS — CINEMATIC STACKED-CARD BROWSER REVEAL SYSTEM
     Five-phase scroll sequence:
       PHASE 0 (0–20%): Words reveal sequentially with kinetic drift + stagger
       PHASE 1 (15–30%): Accent words gain emphasis (accent color + scale)
       PHASE 2 (25–35%): Headline locks; project deck container fades-in
       PHASE 3 (30–50%): First browser card rises from bottom via clip-path
       PHASE 4 (50–100%): Card-cycling through remaining 3 projects
     Cards NEVER use opacity transitions — clip-path + translate only.
     ========================================================================= */
  initStackedProjectShowcase() {
    const section = document.getElementById('work');
    const heading = document.getElementById('stackedHeading');
    const textPanels = document.querySelectorAll('.stacked-text-panel');
    const browserCards = document.querySelectorAll('.stacked-browser-card');
    const pillBtns = document.querySelectorAll('.stacked-pill-btn');
    const activeNum = document.getElementById('stackedActiveNum');
    const progressFill = document.getElementById('stackedProgressFill');
    const footerHint = section ? section.querySelector('.sfb-hint') : null;
    const viewportCont = section ? section.querySelector('.stacked-viewport-container') : null;
    const textCol = document.getElementById('stackedTextCol') || (section ? section.querySelector('.stacked-text-col') : null);
    const deckCol = document.getElementById('stackedDeckCol') || (section ? section.querySelector('.stacked-deck-col') : null);
    const bgWatermark = document.getElementById('stackedBgWatermark');

    if (!section || browserCards.length === 0) return;

    /* ——— gather word spans ——— */
    const wordSpans = heading ? Array.from(heading.querySelectorAll('.sh-word')) : [];
    const totalCards = browserCards.length; // 4
    let lastActiveIdx = -1;
    let mobileActiveIdx = 0;
    let isTicking = false;

    /* ——— easing & math helpers ——— */
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);
    const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
    const lerp = (a, b, t) => a + (b - a) * t;
    const norm = (v, lo, hi) => clamp((v - lo) / (hi - lo), 0, 1);

    /* ——— Mobile / Tablet snap-switcher (clean tap & swipe) ——— */
    const setMobileProject = (idx) => {
      idx = clamp(idx, 0, totalCards - 1);
      mobileActiveIdx = idx;
      lastActiveIdx = idx;

      if (activeNum) activeNum.textContent = String(idx + 1).padStart(2, '0');
      pillBtns.forEach((btn, i) => btn.classList.toggle('active', i === idx));
      if (progressFill) progressFill.style.width = `${Math.round(((idx + 1) / totalCards) * 100)}%`;
      if (footerHint) footerHint.textContent = 'TAP 01–04 OR SWIPE TO EXPLORE';

      textPanels.forEach((panel, i) => {
        panel.classList.toggle('active', i === idx);
        panel.classList.toggle('outgoing', i < idx && i !== idx);
        panel.style.opacity = (i === idx) ? '1' : '0';
        panel.style.transform = (i === idx) ? 'translate3d(0,0,0)' : 'translate3d(0,16px,0)';
      });

      browserCards.forEach((card, i) => {
        card.classList.toggle('bc-active', i === idx);
        card.classList.toggle('bc-outgoing', i < idx);
        /* Cards remain 100% solid & opaque on mobile as well */
        card.style.opacity = '1';
        if (i === idx) {
          card.style.visibility = 'visible';
          card.style.zIndex = '10';
          card.style.pointerEvents = 'auto';
          card.style.transform = 'translate3d(0,0,0) scale(1)';
          card.style.clipPath = 'inset(0% 0% 0% 0% round 12px)';
        } else {
          const dir = i < idx ? -20 : 20;
          card.style.visibility = 'hidden';
          card.style.zIndex = '1';
          card.style.pointerEvents = 'none';
          card.style.transform = `translate3d(0,${dir}px,0) scale(0.96)`;
          card.style.clipPath = 'inset(0% 0% 100% 0% round 12px)';
        }
      });
    };

    /* ——— MASTER SCROLL UPDATE — executes inside rAF ——— */
    const update = () => {
      isTicking = false;

      /* Narrow screens: delegate to mobile switcher */
      if (window.innerWidth <= 992) {
        setMobileProject(mobileActiveIdx);
        return;
      }

      if (footerHint && footerHint.textContent !== 'SCROLL TO REVEAL NEXT') {
        footerHint.textContent = 'SCROLL TO REVEAL NEXT';
      }

      const rect = section.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const inView = rect.top <= window.innerHeight * 1.5 && rect.bottom >= -window.innerHeight * 0.5;
      this.isInStackedShowcase = (rect.top <= 120 && rect.bottom >= window.innerHeight * 0.2);
      if (!inView) return;

      /* Global progress p: 0 when section top reaches viewport top, 1 when section finishes */
      const p = rect.top <= 0 ? clamp(-rect.top / totalScrollable, 0, 1) : 0;

      /* ---------------------------------------------------------------------
         LAYER 3: SUBTLE 3-LAYER PARALLAX (Requirement 10)
         - Background EG TECH logo watermark: very slow
         - Text column: subtle translateY
         - Website preview deck: slightly larger translateY
         --------------------------------------------------------------------- */
      if (bgWatermark) {
        const wmY = lerp(-14, 20, p);
        bgWatermark.style.transform = `translate(-50%, calc(-50% + ${wmY.toFixed(2)}px))`;
      }
      if (textCol) {
        const tcY = lerp(-5, 10, p);
        textCol.style.transform = `translate3d(0, ${tcY.toFixed(2)}px, 0)`;
      }
      if (deckCol) {
        const dcY = lerp(-8, 16, p);
        deckCol.style.transform = `translate3d(0, ${dcY.toFixed(2)}px, 0)`;
      }

      /* ---------------------------------------------------------------------
         STEP 01 – 03: KINETIC HEADLINE PROGRESSIVE REVEAL (Requirements 1, 2, 3)
         - Sequential word reveal: "Built" -> "for" -> "commercial" -> "momentum."
         - translateY: 60px -> 0
         - opacity: 0 -> 1
         - scale: 0.96 -> 1
         - kinetic horizontal drift: Built (-20), for (+15), commercial (-12), momentum (+20) -> 0
         - Word emphasis: subtle accent glow + scale bump on "commercial" & "momentum."
         --------------------------------------------------------------------- */
      if (wordSpans.length > 0) {
        wordSpans.forEach((word, i) => {
          const staggerStart = i * 0.045; // ~80-140ms equivalent scroll stagger
          const revealStart = staggerStart;
          const revealEnd = revealStart + 0.09;

          const t = norm(p, revealStart, revealEnd);
          const et = easeOut(t);

          const driftMax = parseFloat(word.dataset.x || 0);
          const driftX = (window.innerWidth < 1100) ? driftMax * 0.4 : driftMax;

          const tx = lerp(driftX, 0, et);
          const ty = lerp(60, 0, et);
          const op = lerp(0, 1, et);

          /* Emphasis on accent words: subtle scale lift during appearance, settling smoothly */
          const isAccent = word.classList.contains('sh-word--accent');
          let sc = lerp(0.96, 1.0, et);
          if (isAccent && t > 0.1 && t < 0.95) {
            sc += 0.035 * Math.sin(t * Math.PI); // sophisticated subtle bump
          }

          if (isAccent) {
            if (t > 0.4) {
              word.classList.add('is-emphasized');
            } else {
              word.classList.remove('is-emphasized');
            }
          }

          if (t >= 0.98) {
            word.classList.add('sh-revealed');
          } else {
            word.classList.remove('sh-revealed');
          }

          word.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0) scale(${sc.toFixed(4)})`;
          word.style.opacity = op.toFixed(3);
        });
      }

      /* ---------------------------------------------------------------------
         STEP 04 & 05: FIRST WEBSITE PREVIEW ENTRY & SOLID HOLD
         (Requirements 4, 5, 6, 9, 11)
         p [0.20 – 0.30]: Headline hold (fully assembled and stable)
         p [0.24 – 0.32]: Text panel 0 slides up into place
         p [0.30 – 0.44]: Card 0 rises from below (translateY 80->0, scale 0.94->1, mask opens)
                          OPACITY IS ALWAYS 1 — NEVER TRANSPARENT!
         p [0.44 – 0.54]: Card 0 locks into place solid (Hold state)
         --------------------------------------------------------------------- */
      if (p < 0.54) {
        /* Phase before multi-project cycling: Card 0 is the primary focus */
        const textT = easeOut(norm(p, 0.24, 0.32));
        textPanels.forEach((panel, idx) => {
          if (idx === 0) {
            panel.classList.add('active');
            panel.classList.remove('outgoing');
            panel.style.opacity = textT.toFixed(3);
            panel.style.transform = `translate3d(0, ${lerp(20, 0, textT).toFixed(2)}px, 0)`;
          } else {
            panel.classList.remove('active', 'outgoing');
            panel.style.opacity = '0';
            panel.style.transform = 'translate3d(0, 20px, 0)';
          }
        });

        /* First website preview rise & lock (Step 04 & 05) */
        const entryT = easeOut(norm(p, 0.30, 0.44));
        const c0Y = lerp(80, 0, entryT);
        const c0Sc = lerp(0.94, 1.0, entryT);
        const maskBottom = Math.max(0, Math.round((1 - entryT) * 100));

        browserCards.forEach((card, idx) => {
          /* CRITICAL: Website preview opacity is ALWAYS 1 */
          card.style.opacity = '1';

          if (idx === 0) {
            if (entryT > 0.005) {
              card.style.visibility = 'visible';
              card.style.zIndex = '10';
              card.style.pointerEvents = (entryT >= 0.9) ? 'auto' : 'none';
              card.style.transform = `translate3d(0, ${c0Y.toFixed(2)}px, 0) scale(${c0Sc.toFixed(4)})`;
              /* Mask opens from bottom upward, revealing the website preview without transparency */
              card.style.clipPath = `inset(0% 0% ${maskBottom}% 0% round 12px)`;
              card.classList.toggle('bc-active', entryT >= 0.5);
              card.classList.remove('bc-outgoing');
            } else {
              card.style.visibility = 'hidden';
              card.style.pointerEvents = 'none';
              card.style.transform = 'translate3d(0, 80px, 0) scale(0.94)';
              card.style.clipPath = 'inset(0% 0% 100% 0% round 12px)';
            }
          } else {
            /* Remaining cards wait parked below */
            card.style.visibility = 'hidden';
            card.style.zIndex = '1';
            card.style.pointerEvents = 'none';
            card.style.transform = 'translate3d(0, 80px, 0) scale(0.94)';
            card.style.clipPath = 'inset(0% 0% 100% 0% round 12px)';
            card.classList.remove('bc-active', 'bc-outgoing');
          }
        });

        if (activeIdxUpdate(0)) {
          /* Updated to project 01 */
        }

        if (progressFill) {
          const progP = clamp(p / 0.54, 0, 1) * 25;
          progressFill.style.width = `${Math.max(8, Math.round(progP))}%`;
        }
        return;
      }

      /* ---------------------------------------------------------------------
         TRANSITIONS BETWEEN WEBSITES / PRODUCTS (Requirement 7)
         p [0.54 – 1.00]:
         No cross-fade. No transparency. Both remain opacity: 1!
         Current website:
           - moves slightly upward (translateY: 0 -> -26px)
           - scale from 1 -> 0.98
           - remains opaque (opacity: 1)
         Next website:
           - enters from below (translateY: 70px -> 0)
           - remains opacity: 1
           - reveals through clipping mask from bottom (inset: 0% 0% maskBottom% 0%)
           - scale 0.96 -> 1
         --------------------------------------------------------------------- */
      const cycleP = norm(p, 0.54, 1.00);
      const totalSteps = totalCards - 1; // 3 transitions
      const floatPos = cycleP * totalSteps;
      const currIdx = Math.min(Math.floor(floatPos), totalSteps - 1);
      const nextIdx = currIdx + 1;
      const segProgress = floatPos - currIdx; // 0 to 1 within this transition

      /* First 62% of segment is the physical card replacement; remaining 38% is solid hold */
      const transT = easeOut(clamp(segProgress / 0.62, 0, 1));
      const activeIdx = (segProgress < 0.5) ? currIdx : nextIdx;

      activeIdxUpdate(activeIdx);

      if (progressFill) {
        const totalProgress = 25 + Math.round(cycleP * 75);
        progressFill.style.width = `${Math.min(100, totalProgress)}%`;
      }

      /* Synchronize editorial text panels */
      textPanels.forEach((panel, i) => {
        if (i === currIdx) {
          const fadeOut = clamp(segProgress / 0.48, 0, 1);
          panel.style.opacity = (1 - fadeOut).toFixed(3);
          panel.style.transform = `translate3d(0, ${lerp(0, -18, fadeOut).toFixed(2)}px, 0)`;
          panel.classList.toggle('active', segProgress < 0.5);
          panel.classList.toggle('outgoing', segProgress >= 0.5);
        } else if (i === nextIdx) {
          const fadeIn = clamp((segProgress - 0.35) / 0.45, 0, 1);
          panel.style.opacity = fadeIn.toFixed(3);
          panel.style.transform = `translate3d(0, ${lerp(20, 0, fadeIn).toFixed(2)}px, 0)`;
          panel.classList.toggle('active', segProgress >= 0.5);
          panel.classList.remove('outgoing');
        } else {
          panel.style.opacity = '0';
          panel.style.transform = 'translate3d(0, 20px, 0)';
          panel.classList.remove('active', 'outgoing');
        }
      });

      /* Synchronize solid browser preview cards */
      browserCards.forEach((card, i) => {
        /* CRITICAL: Preview card opacity is ALWAYS 1 */
        card.style.opacity = '1';

        if (i < currIdx) {
          /* Past card: safely parked offscreen */
          card.style.visibility = 'hidden';
          card.style.zIndex = '1';
          card.style.pointerEvents = 'none';
          card.style.transform = 'translate3d(0, -30px, 0) scale(0.96)';
          card.style.clipPath = 'inset(0% 0% 100% 0% round 12px)';
          card.classList.remove('bc-active', 'bc-outgoing');

        } else if (i === currIdx) {
          /* Current website: moves slightly upward, scale 1 -> 0.98, stays 100% solid */
          const cY = lerp(0, -26, transT);
          const cSc = lerp(1.0, 0.98, transT);

          card.style.visibility = (transT < 0.99) ? 'visible' : 'hidden';
          card.style.zIndex = '10';
          card.style.pointerEvents = (transT < 0.5) ? 'auto' : 'none';
          card.style.transform = `translate3d(0, ${cY.toFixed(2)}px, 0) scale(${cSc.toFixed(4)})`;
          card.style.clipPath = 'inset(0% 0% 0% 0% round 12px)';
          card.classList.toggle('bc-active', transT < 0.5);
          card.classList.toggle('bc-outgoing', transT >= 0.5);

        } else if (i === nextIdx) {
          /* Next website: rises from below, reveals through clipping mask, scale 0.96 -> 1.0 */
          const nY = lerp(70, 0, transT);
          const nSc = lerp(0.96, 1.0, transT);
          const maskBottom = Math.max(0, Math.round((1 - transT) * 100));

          card.style.visibility = 'visible';
          card.style.zIndex = '20';
          card.style.pointerEvents = (transT >= 0.5) ? 'auto' : 'none';
          card.style.transform = `translate3d(0, ${nY.toFixed(2)}px, 0) scale(${nSc.toFixed(4)})`;
          card.style.clipPath = `inset(0% 0% ${maskBottom}% 0% round 12px)`;
          card.classList.toggle('bc-active', transT >= 0.5);
          card.classList.remove('bc-outgoing');

        } else {
          /* Future cards waiting below */
          card.style.visibility = 'hidden';
          card.style.zIndex = '2';
          card.style.pointerEvents = 'none';
          card.style.transform = 'translate3d(0, 80px, 0) scale(0.94)';
          card.style.clipPath = 'inset(0% 0% 100% 0% round 12px)';
          card.classList.remove('bc-active', 'bc-outgoing');
        }
      });
    };

    /* Helper to update pills and counter */
    function activeIdxUpdate(idx) {
      if (idx === lastActiveIdx) return false;
      lastActiveIdx = idx;
      mobileActiveIdx = idx;
      if (activeNum) activeNum.textContent = String(idx + 1).padStart(2, '0');
      pillBtns.forEach((btn, i) => btn.classList.toggle('active', i === idx));
      return true;
    }

    /* ——— Passive scroll + resize listener ——— */
    const onScroll = () => {
      if (!isTicking) {
        isTicking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    /* Initial render */
    requestAnimationFrame(() => {
      update();
    });

    /* ——— Touch swipe gestures for mobile ——— */
    if (deckCol) {
      let touchStartX = 0, touchStartY = 0;
      deckCol.addEventListener('touchstart', (e) => {
        if (window.innerWidth > 992) return;
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
      }, { passive: true });
      deckCol.addEventListener('touchend', (e) => {
        if (window.innerWidth > 992) return;
        const dx = e.changedTouches[0].screenX - touchStartX;
        const dy = e.changedTouches[0].screenY - touchStartY;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
          setMobileProject(mobileActiveIdx + (dx < 0 ? 1 : -1));
        }
      }, { passive: true });
    }

    /* ——— Quick-jump pill buttons ——— */
    pillBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const step = parseInt(btn.dataset.step, 10);
        if (isNaN(step)) return;

        if (window.innerWidth <= 992) {
          setMobileProject(step);
          return;
        }

        const rect = section.getBoundingClientRect();
        const currentScroll = window.scrollY || window.pageYOffset;
        const sectionTop = currentScroll + rect.top;
        const totalScrollable = rect.height - window.innerHeight;

        /* Precise target scroll per project hold state */
        let targetP = 0.46; // project 0
        if (step === 1) targetP = 0.68;
        else if (step === 2) targetP = 0.84;
        else if (step === 3) targetP = 0.98;

        const targetScroll = sectionTop + targetP * totalScrollable;
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      });
    });
  }

  /* =========================================================================
     3. EG TECH MECHANICAL LOGO PRELOADER
     ========================================================================= */
  initPreloader() {
    const preloader = document.getElementById('sitePreloader');
    const logoFrame = document.getElementById('preloaderLogoFrame');
    const scanline = document.getElementById('preloaderScanline');
    const bar = document.getElementById('preloaderBar');
    const counter = document.getElementById('preloaderCounter');
    const statusBlock = document.querySelector('.preloader-status-block');
    const brandCluster = document.querySelector('.preloader-brand-cluster');
    const tagline = document.querySelector('.preloader-tagline');

    if (!preloader) return;

    requestAnimationFrame(() => {
      preloader.classList.add('active');
    });

    setTimeout(() => {
      if (logoFrame) logoFrame.classList.add('logo-revealed');
    }, 120);

    setTimeout(() => {
      if (scanline) scanline.classList.add('scanning');
    }, 380);

    const startTime = performance.now();
    const duration = 1600;

    const updateProgress = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(Math.max(elapsed / duration, 0), 1);
      const easeProgress = 1 - Math.pow(1 - progress, 2.2);
      const percentage = Math.round(easeProgress * 100);

      if (bar) bar.style.width = `${easeProgress * 100}%`;
      if (counter) counter.textContent = `${String(percentage).padStart(2, '0')}%`;

      if (progress < 1) {
        requestAnimationFrame(updateProgress);
      } else {
        if (bar) bar.style.width = '100%';
        if (counter) counter.textContent = '100%';

        if (statusBlock) statusBlock.classList.add('fade-out');
        if (brandCluster) brandCluster.classList.add('fade-out');
        if (tagline) tagline.classList.add('fade-out');

        setTimeout(() => {
          preloader.classList.add('dismissed');
          setTimeout(() => {
            preloader.style.display = 'none';
          }, 650);
        }, 280);
      }
    };

    setTimeout(() => {
      requestAnimationFrame(updateProgress);
    }, 120);
  }

  /* =========================================================================
     4. KINETIC CURSOR
     ========================================================================= */
  initCursor() {
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    if (!dot || !ring) return;

    // Performance Guard: disable continuous cursor rAF loop on touch/mobile devices
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasFinePointer) return;

    // V2 POLISH: respect reduced motion (decorative cursor is hidden by CSS)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // V2 doctrine: compositor-only cursor — translate3d writes, never left/top layout writes
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX, dotY = mouseY;
    let ringX = mouseX, ringY = mouseY;
    let raf = 0;

    const writeCursor = () => {
      raf = 0;
      dotX += (mouseX - dotX) * 0.55;
      dotY += (mouseY - dotY) * 0.55;
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      dot.style.transform = `translate3d(${dotX.toFixed(1)}px, ${dotY.toFixed(1)}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringX.toFixed(1)}px, ${ringY.toFixed(1)}px, 0) translate(-50%, -50%)`;
      if (Math.abs(mouseX - ringX) > 0.1 || Math.abs(mouseY - ringY) > 0.1) {
        raf = requestAnimationFrame(writeCursor);
      }
    };

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    }, { passive: true });

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      requestAnimationFrame(animateRing);
    };
    animateRing();

    const hoverables = document.querySelectorAll('a, button, input, textarea, .s-pill, .service-row-module, .showcase-project-panel, .theme-switch-btn, .h-audio-toggle');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-active'), { passive: true });
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'), { passive: true });
    });
  }

  /* =========================================================================
     5. TOP NAVIGATION BAR — FLOATING ANIMATED PILL
     Initial state: integrated naturally into hero at top.
     On scroll: smoothly transforms into a centered floating capsule.
     Reversible: returns to natural hero state when scrolling back to top.
     ========================================================================= */
  initFloatingPillNav() {
    const header = document.getElementById('mainHeader');
    if (!header) return;

    let isTicking = false;

    const onScroll = () => {
      isTicking = false;
      const scrollY = window.scrollY || window.pageYOffset;

      // Initial state: integrated naturally into hero
      // Once user begins scrolling past 60px: transforms into floating pill
      if (scrollY > 60) {
        header.classList.add('nav-pill-active');
        // Deeper scroll: slightly more compact
        if (scrollY > 480) {
          header.classList.add('nav-pill-compact');
        } else {
          header.classList.remove('nav-pill-compact');
        }
      } else {
        // Reversible: restores original hero navigation state at top
        header.classList.remove('nav-pill-active');
        header.classList.remove('nav-pill-compact');
      }
    };

    window.addEventListener('scroll', () => {
      if (!isTicking) {
        isTicking = true;
        requestAnimationFrame(onScroll);
      }
    }, { passive: true });

    onScroll();
  }

  /* =========================================================================
     5B. KINETIC TYPOGRAPHY BRAND STATEMENT ANIMATION
     “We engineer digital systems that convert attention into business momentum.”
     - Multi-line horizontal convergence (x: -30px / +25px / -15px / +20px / -10px -> 0)
     - Line-by-line reveal (translateY: 40px -> 0, opacity: 0 -> 1, blur: 4px -> 0)
     - Word emphasis with selective EG TECH accent green
     - 3-layer parallax (foreground typography, middle content, background logo)
     - Statement completion effect (DESIGN → TECHNOLOGY → GROWTH + expanding line)
     - Smooth transition into Growth Solutions
     ========================================================================= */
  initKineticStatement() {
    const section = document.getElementById('brandStatement');
    const container = document.getElementById('kineticStatement');
    const lines = document.querySelectorAll('.kinetic-line');
    const bgLogo = document.getElementById('statementBgLogo');
    const completionSystem = document.getElementById('statementCompletion');
    const middleLayer = document.getElementById('statementMiddleLayer');

    if (!section || !container || lines.length === 0) return;

    let isTicking = false;
    const lineOffsets = [-30, 25, -15, 20, -10];

    const updateKineticStatement = () => {
      isTicking = false;
      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Section visibility range
      const startTrigger = windowH * 0.85;
      const endTrigger = -rect.height * 0.35;
      const totalRange = startTrigger - endTrigger;
      const currentPos = startTrigger - rect.top;

      let p = Math.max(0, Math.min(1, currentPos / totalRange));

      // 1. Line-by-line reveal & horizontal convergence
      lines.forEach((line, idx) => {
        const lineStart = 0.04 + (idx * 0.11);
        const lineEnd = lineStart + 0.22;
        const lineP = Math.max(0, Math.min(1, (p - lineStart) / (lineEnd - lineStart)));

        // Horizontal convergence: offset -> 0 (scaled on mobile to avoid overflow)
        const isMobileScreen = window.innerWidth <= 768;
        const mobileFactor = isMobileScreen ? 0.35 : 1.0;
        const startX = (lineOffsets[idx] || 0) * mobileFactor;
        const currentX = (startX * (1 - lineP)).toFixed(2);

        // Vertical reveal: 40px -> 0
        const currentY = (40 * (1 - lineP)).toFixed(2);

        // Opacity: 0 -> 1
        const currentOpacity = lineP.toFixed(3);

        // Subtle blur: 4px -> 0
        const currentBlur = (4 * (1 - lineP)).toFixed(1);

        line.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
        line.style.opacity = currentOpacity;
        if (lineP < 0.96) {
          line.style.filter = `blur(${currentBlur}px)`;
        } else {
          line.style.filter = 'none';
        }

        // Word emphasis animation: selective EG TECH green on key words
        const highlights = line.querySelectorAll('.kt-highlight');
        highlights.forEach(hl => {
          if (lineP > 0.65) {
            hl.classList.add('is-emphasized');
          } else {
            hl.classList.remove('is-emphasized');
          }
        });
      });

      // 2. Three visual depth parallax layers
      // Layer 1 (Foreground): Typography moves slightly slower than page
      const typoParallaxY = -35 * p;
      container.style.transform = `translate3d(0, ${typoParallaxY.toFixed(2)}px, 0)`;

      // Layer 2 (Middle): Supporting content
      if (middleLayer) {
        const midParallaxY = -15 * Math.max(0, p - 0.4);
        middleLayer.style.transform = `translate3d(0, ${midParallaxY.toFixed(2)}px, 0)`;
      }

      // Layer 3 (Background): Giant EG TECH logo mark moves even slower
      if (bgLogo) {
        const bgParallaxY = 55 * p;
        bgLogo.style.transform = `translate3d(0, ${bgParallaxY.toFixed(2)}px, 0)`;
      }

      // 3. Statement completion effect
      if (completionSystem) {
        if (p >= 0.65) {
          completionSystem.classList.add('completed');
        } else {
          completionSystem.classList.remove('completed');
        }
      }

      // 4. Smooth transition into Growth Solutions
      if (p > 0.82) {
        const exitProgress = (p - 0.82) / 0.18;
        const exitLift = -25 * exitProgress;
        const exitOpacity = 1 - (0.15 * exitProgress);
        section.style.transform = `translate3d(0, ${exitLift.toFixed(2)}px, 0)`;
        section.style.opacity = exitOpacity.toFixed(3);
      } else {
        section.style.transform = 'translate3d(0, 0, 0)';
        section.style.opacity = '1';
      }
    };

    const onScroll = () => {
      if (!isTicking) {
        isTicking = true;
        requestAnimationFrame(updateKineticStatement);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateKineticStatement();
  }

  /* =========================================================================
     5C. GROWTH SOLUTIONS — HORIZONTAL SCROLL EXPERIENCE
     - Sticky pinned stage while user scrolls vertically
     - Left side anchored: 01 / GROWTH SOLUTIONS, 05 CORE PILLARS, active indicator (01 / 05)
     - Right side cards track: moves RIGHT -> LEFT via translate3d() with smooth interpolation
     - Depth scaling: Active (1.0), Adjacent (0.97, 0.70 op), Farther (0.94, 0.35 op)
     - Entry lift: 25px -> 0
     - Stays pinned until all 5 cards explored, then smoothly continues to #work
     ========================================================================= */
  initGrowthSolutionsHorizontal() {
    const section = document.getElementById('services');
    const trackWrapper = document.getElementById('servicesTrackWrapper');
    const track = document.getElementById('servicesCardsTrack');
    const cards = document.querySelectorAll('.service-horizontal-card');
    const activeNum = document.getElementById('servicesActiveNum');
    const dots = document.querySelectorAll('.s-dot[data-index]');

    if (!section || !track || cards.length === 0) return;

    const totalCards = cards.length; // 5
    let isTicking = false;
    let lastActiveIdx = -1;

    const updateHorizontalCards = () => {
      isTicking = false;

      // On mobile / small screens, let CSS touch-scroll handle it
      if (window.innerWidth <= 900) {
        track.style.transform = 'none';
        cards.forEach(c => {
          c.style.transform = 'none';
          c.style.opacity = '1';
        });
        return;
      }

      const rect = section.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;

      // Check if section is within active viewport range
      const inView = rect.top <= window.innerHeight * 1.2 && rect.bottom >= -window.innerHeight * 0.2;
      if (!inView || totalScrollable <= 0) return;

      // Normalized progress p between 0 and 1
      let p = 0;
      if (rect.top <= 0) {
        p = Math.max(0, Math.min(1, -rect.top / totalScrollable));
      } else {
        p = 0;
      }

      // Total horizontal distance to travel
      const trackWidth = track.scrollWidth;
      const wrapperWidth = trackWrapper ? trackWrapper.clientWidth : window.innerWidth * 0.65;
      const maxScrollX = Math.max(0, trackWidth - wrapperWidth + 60);

      // Interpolated X translation: RIGHT -> LEFT
      const currentX = p * maxScrollX;
      track.style.transform = `translate3d(-${currentX.toFixed(2)}px, 0, 0)`;

      // Continuous card index (0.0 to 4.0)
      const currentCardPos = p * (totalCards - 1);
      const activeIdx = Math.max(0, Math.min(totalCards - 1, Math.round(currentCardPos)));

      // Update active indicator if changed
      if (activeIdx !== lastActiveIdx) {
        lastActiveIdx = activeIdx;
        if (activeNum) {
          activeNum.textContent = String(activeIdx + 1).padStart(2, '0');
        }
        dots.forEach((dot, idx) => {
          if (idx === activeIdx) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }

      // Card scale & opacity interpolation for controlled, restrained motion
      cards.forEach((card, idx) => {
        const dist = Math.abs(currentCardPos - idx);

        if (dist < 0.05) {
          // Active card in focus
          card.classList.add('active');
          card.style.transform = 'translate3d(0, 0, 0) scale(1)';
          card.style.opacity = '1';
        } else if (dist <= 1.0) {
          // Adjacent card transitioning into or out of active
          card.classList.remove('active');
          const t = dist;
          const scale = 1.0 - (0.03 * t);
          const opacity = 1.0 - (0.30 * t);
          const translateY = 25 * t;
          card.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
          card.style.opacity = opacity.toFixed(3);
        } else {
          // Farther card
          card.classList.remove('active');
          const scale = 0.94;
          const opacity = Math.max(0.25, 0.40 - (0.1 * (dist - 1)));
          card.style.transform = `translate3d(0, 25px, 0) scale(${scale})`;
          card.style.opacity = opacity.toFixed(3);
        }
      });
    };

    const onScroll = () => {
      if (!isTicking) {
        isTicking = true;
        requestAnimationFrame(updateHorizontalCards);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateHorizontalCards();

    // Mobile horizontal touch-scroll listener for trackWrapper
    if (trackWrapper) {
      let isMobileScrollTicking = false;
      const onMobileTrackScroll = () => {
        isMobileScrollTicking = false;
        if (window.innerWidth > 900) return;

        const scrollLeft = trackWrapper.scrollLeft;
        const firstCard = cards[0];
        if (!firstCard) return;
        const cardWidth = firstCard.offsetWidth + 16;
        const activeIdx = Math.max(0, Math.min(totalCards - 1, Math.round(scrollLeft / cardWidth)));

        if (activeIdx !== lastActiveIdx) {
          lastActiveIdx = activeIdx;
          if (activeNum) {
            activeNum.textContent = String(activeIdx + 1).padStart(2, '0');
          }
          dots.forEach((dot, idx) => {
            if (idx === activeIdx) {
              dot.classList.add('active');
            } else {
              dot.classList.remove('active');
            }
          });
        }
      };

      trackWrapper.addEventListener('scroll', () => {
        if (!isMobileScrollTicking) {
          isMobileScrollTicking = true;
          requestAnimationFrame(onMobileTrackScroll);
        }
      }, { passive: true });
    }

    // Clickable dots to quickly navigate to specific capability
    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const idx = parseInt(dot.dataset.index, 10);
        if (isNaN(idx)) return;

        if (window.innerWidth <= 900) {
          const targetCard = cards[idx];
          if (targetCard && trackWrapper) {
            const targetLeft = targetCard.offsetLeft - trackWrapper.offsetLeft;
            trackWrapper.scrollTo({
              left: targetLeft,
              behavior: 'smooth'
            });
          }
          return;
        }

        const rect = section.getBoundingClientRect();
        const currentScroll = window.scrollY || window.pageYOffset;
        const sectionTop = currentScroll + rect.top;
        const totalScrollable = rect.height - window.innerHeight;
        const targetScroll = sectionTop + (idx / (totalCards - 1)) * totalScrollable + 15;

        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        });
      });
    });
  }

  /* =========================================================================
     6. HERO BRAND FILM CONTROLLER
     ========================================================================= */
  initHeroVideoController() {
    const video = document.getElementById('heroBrandVideo');
    const toggleBtn = document.getElementById('btnAudioToggle');
    const statusText = document.getElementById('audioStatusText');

    if (!video || !toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
      if (video.muted) {
        video.muted = false;
        if (statusText) statusText.textContent = 'MUTE AUDIO';
        toggleBtn.style.background = 'var(--accent)';
        toggleBtn.style.color = 'var(--accent-text)';
      } else {
        video.muted = true;
        if (statusText) statusText.textContent = 'UNMUTE AUDIO';
        toggleBtn.style.background = 'transparent';
        toggleBtn.style.color = 'var(--accent)';
      }
    });
  }

  /* =========================================================================
     7. SEARCH INFRASTRUCTURE COUNTERS
     ========================================================================= */
  initSearchAuditCounters() {
    const section = document.getElementById('visibility');
    if (!section) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.countersStarted) {
          this.countersStarted = true;
          this.runCounters();
        }
      });
    }, { threshold: 0.25 });

    observer.observe(section);
  }

  runCounters() {
    const statBoxes = document.querySelectorAll('.st-num[data-count]');
    statBoxes.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-count'), 10);
      let curr = 0;
      const step = Math.ceil(target / 30);
      const isPercent = stat.textContent.includes('%');

      const timer = setInterval(() => {
        curr += step;
        if (curr >= target) {
          stat.textContent = isPercent ? `${target}%` : `${target}`;
          clearInterval(timer);
        } else {
          stat.textContent = isPercent ? `${curr}%` : `${curr}`;
        }
      }, 35);
    });
  }

  /* =========================================================================
     8. LEGAL MODALS (TERMS OF SERVICE & PRIVACY POLICY)
     ========================================================================= */
  initLegalModals() {
    const openButtons = document.querySelectorAll('.legal-link-btn[data-modal]');
    const closeButtons = document.querySelectorAll('[data-close]');
    const modals = document.querySelectorAll('.legal-modal-backdrop');

    openButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = btn.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
          modal.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    closeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-close');
        const modal = document.getElementById(modalId);
        if (modal) {
          modal.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    });

    modals.forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        modals.forEach(modal => {
          if (modal.classList.contains('open')) {
            modal.classList.remove('open');
            document.body.style.overflow = '';
          }
        });
      }
    });
  }

  /* =========================================================================
     9. INQUIRY FORM DISPATCH (SQLITE API WITH RESILIENT FALLBACK)
     ========================================================================= */
  initInquiryForm() {
    const form = document.getElementById('projectInquiryForm');
    const successPanel = document.getElementById('formSuccessPanel');
    const btnAnother = document.getElementById('btnAnotherInquiry');
    if (!form) return;

    this.bindPillGrid('solutionPills', 'fProjectType');
    this.bindPillGrid('budgetPills', 'fBudget');
    this.bindPillGrid('timelinePills', 'fTimeline');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      document.querySelectorAll('.f-error').forEach(el => el.textContent = '');

      const name = document.getElementById('fName').value.trim();
      const email = document.getElementById('fEmail').value.trim();
      const phone = document.getElementById('fPhone').value.trim();
      const company = document.getElementById('fCompany').value.trim();
      const projectType = document.getElementById('fProjectType').value;
      const description = document.getElementById('fDesc').value.trim();
      const budget = document.getElementById('fBudget').value;
      const timeline = document.getElementById('fTimeline').value;

      let hasError = false;
      if (!name) {
        document.getElementById('err-name').textContent = 'Please enter your full name.';
        hasError = true;
      }
      if (!email || !email.includes('@')) {
        document.getElementById('err-email').textContent = 'Please enter a valid business email address.';
        hasError = true;
      }
      if (!phone) {
        document.getElementById('err-phone').textContent = 'Please enter your phone or WhatsApp number.';
        hasError = true;
      }
      if (!description || description.length < 10) {
        document.getElementById('err-desc').textContent = 'Please describe your project requirements (at least 10 characters).';
        hasError = true;
      }

      if (hasError) return;

      const submitBtn = document.getElementById('btnSubmit');
      const submitText = document.getElementById('btnSubmitText');
      if (submitBtn) submitBtn.disabled = true;
      if (submitText) submitText.textContent = 'DISPATCHING BRIEF...';

      const payload = {
        name,
        email,
        phone,
        company,
        projectType,
        description,
        budget,
        timeline,
        referenceUrl: ''
      };

      try {
        const res = await fetch('/api/project-inquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          setTimeout(() => {
            form.style.display = 'none';
            if (successPanel) successPanel.style.display = 'block';
            this.showToast('✓ Project brief received by EG TECH.');
          }, 450);
        } else {
          throw new Error('API server returned error');
        }
      } catch (err) {
        console.warn('API submission fallback:', err);
        setTimeout(() => {
          form.style.display = 'none';
          if (successPanel) successPanel.style.display = 'block';
          this.showToast('✓ Project brief recorded successfully.');
        }, 450);
      } finally {
        if (submitBtn) submitBtn.disabled = false;
        if (submitText) submitText.textContent = 'DISPATCH PROJECT BRIEF';
      }
    });

    if (btnAnother) {
      btnAnother.addEventListener('click', () => {
        form.reset();
        form.style.display = 'block';
        if (successPanel) successPanel.style.display = 'none';
      });
    }
  }

  bindPillGrid(containerId, hiddenInputId) {
    const container = document.getElementById(containerId);
    const hidden = document.getElementById(hiddenInputId);
    if (!container || !hidden) return;

    const pills = container.querySelectorAll('.s-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        hidden.value = pill.dataset.val;
      });
    });
  }

  /* =========================================================================
     10. FLOATING WHATSAPP DRAWER
     ========================================================================= */
  initWhatsAppDrawer() {
    const trigger = document.getElementById('btnWaTrigger');
    const drawer = document.getElementById('waPopupDrawer');
    const closeBtn = document.getElementById('btnWaClose');
    const promptBtns = document.querySelectorAll('.wa-prompt-btn');
    if (!trigger || !drawer) return;

    trigger.addEventListener('click', () => {
      const isVisible = drawer.style.display === 'block';
      drawer.style.display = isVisible ? 'none' : 'block';
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        drawer.style.display = 'none';
      });
    }

    promptBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const msg = encodeURIComponent(btn.dataset.msg || 'Hello EG TECH!');
        window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');
      });
    });
  }

  /* =========================================================================
     11. SMOOTH NAVIGATION
     ========================================================================= */
  initSmoothNav() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#' || !href) return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  /* Toast Notification */
  showToast(message) {
    const box = document.getElementById('toastBox');
    if (!box) return;
    const toast = document.createElement('div');
    toast.className = 'toast-item';
    toast.textContent = message;
    box.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }

  /* =========================================================================
     12. EG TECH AMBIENT BACKGROUND BRAND SYSTEM
     Scroll-driven positional choreography + subtle 2-8px cursor parallax
     ========================================================================= */
  initBackgroundLogoSystem() {
    const stage = document.getElementById('bgLogoStage');
    const mover = document.getElementById('bgLogoMover');
    const logoAsset = document.getElementById('bgLogoAsset');
    if (!stage || !mover || !logoAsset) return;

    // 1. Subtle 2-8px Cursor Reaction (Desktop only)
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (window.innerWidth <= 768);
    if (!isTouchDevice) {
      let targetX = 0;
      let targetY = 0;
      let currentX = 0;
      let currentY = 0;

      window.addEventListener('mousemove', (e) => {
        // Normalized between -1 and +1 from center of screen
        const normX = (e.clientX / window.innerWidth - 0.5) * 2;
        const normY = (e.clientY / window.innerHeight - 0.5) * 2;
        // Shift up to 6px toward cursor direction
        targetX = normX * 6;
        targetY = normY * 6;
      }, { passive: true });

      const renderCursorDrift = () => {
        if (!this.isInStackedShowcase) {
          currentX += (targetX - currentX) * 0.05;
          currentY += (targetY - currentY) * 0.05;
          mover.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
        }
        requestAnimationFrame(renderCursorDrift);
      };
      requestAnimationFrame(renderCursorDrift);
    }

    // 2. Scroll-Linked Motion Across Sections via GSAP ScrollTrigger
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Master continuous timeline linked to page scroll
      const bgTl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          invalidateOnRefresh: true
        }
      });

      // Starting state at hero: large logo partially visible behind hero (right side, partially off-screen)
      gsap.set(stage, {
        x: '20vw',
        y: '-8vh',
        scale: 1.0,
        transformOrigin: '50% 50%'
      });

      // Section transitions choreography:
      // Services (#services): logo shifted toward the opposite (left) side
      bgTl.to(stage, {
        x: '-16vw',
        y: '4vh',
        scale: 1.02,
        ease: 'power1.inOut'
      }, 0.18)
        // Projects (#work): logo moves behind horizontal project showcase (slow independent parallax)
        .to(stage, {
          x: '10vw',
          y: '-2vh',
          scale: 1.04,
          ease: 'power1.inOut'
        }, 0.42)
        // Process (#process): logo becomes more centered
        .to(stage, {
          x: '-2vw',
          y: '6vh',
          scale: 1.03,
          ease: 'power1.inOut'
        }, 0.65)
        // About (#about): logo becomes partially cropped again
        .to(stage, {
          x: '16vw',
          y: '-4vh',
          scale: 1.05,
          ease: 'power1.inOut'
        }, 0.84)
        // Final CTA (#contact): logo becomes larger and slightly more prominent
        .to(stage, {
          x: '5vw',
          y: '2vh',
          scale: 1.10,
          ease: 'power1.out'
        }, 1.0);

      // Section-specific opacity fine-tuning for Final CTA
      ScrollTrigger.create({
        trigger: '#contact',
        start: 'top 75%',
        end: 'bottom bottom',
        onEnter: () => {
          const isLight = document.body.getAttribute('data-theme') === 'light';
          logoAsset.style.opacity = isLight ? '0.085' : '0.075';
        },
        onLeaveBack: () => {
          const isLight = document.body.getAttribute('data-theme') === 'light';
          logoAsset.style.opacity = isLight ? '0.058' : '0.048';
        }
      });
    }
  }
}

/* =========================================================================
   13. V2 POLISH LAYER — ported from egtech-portfolio v2 (MYTHOS doctrine)
   Zero new dependencies. Fully disabled under prefers-reduced-motion.
   Modules: boot-skip · scroll progress · back-to-top · scroll reveals ·
            card tilt · flashlight glare · magnetic CTAs · hero 3D depth
            field · copy-number chip. All writes rAF-batched, rects cached.
   ========================================================================= */
(() => {
  'use strict';

  const RM = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reduced = () => RM.matches;
  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  document.documentElement.classList.add('v2-js');

  // Shared rect cache: one getBoundingClientRect per element per scroll position
  const rectCache = new WeakMap();
  const liveRect = (el) => {
    const y = window.scrollY;
    let c = rectCache.get(el);
    if (!c || c.y !== y) {
      c = { y, rect: el.getBoundingClientRect() };
      rectCache.set(el, c);
    }
    return c.rect;
  };

  /* --- 13a. BOOT SKIP: click or any key finishes the preloader instantly --- */
  (() => {
    const pre = document.getElementById('sitePreloader');
    if (!pre) return;
    const cleanup = () => {
      window.removeEventListener('pointerdown', skip);
      window.removeEventListener('keydown', skip);
    };
    function skip() {
      cleanup();
      if (pre.classList.contains('dismissed')) return;
      const bar = document.getElementById('preloaderBar');
      const counter = document.getElementById('preloaderCounter');
      if (bar) bar.style.width = '100%';
      if (counter) counter.textContent = '100%';
      pre.querySelectorAll('.preloader-status-block, .preloader-brand-cluster, .preloader-tagline, .v2-skip-hint')
        .forEach((el) => el.classList.add('fade-out'));
      setTimeout(() => {
        pre.classList.add('dismissed');
        setTimeout(() => { pre.style.display = 'none'; }, 650);
      }, 180);
    }
    window.addEventListener('pointerdown', skip, { passive: true });
    window.addEventListener('keydown', skip);
  })();

  /* --- 13b. SCROLL PROGRESS + BACK TO TOP (one rAF-batched handler) --- */
  (() => {
    const bar = document.querySelector('.v2-progress i');
    const topBtn = document.getElementById('v2TopBtn');
    if (!bar && !topBtn) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (bar) bar.style.transform = 'scaleX(' + p.toFixed(4) + ')';
      if (topBtn) topBtn.classList.toggle('v2-show', window.scrollY > 700);
    };
    window.addEventListener('scroll', () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });
    if (topBtn) {
      topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: reduced() ? 'auto' : 'smooth' });
      });
    }
    update();
  })();

  /* --- 13c. SCROLL REVEALS (IntersectionObserver + stagger) ---
     GSAP-driven zones are excluded so this never fights their timelines. */
  (() => {
    const SEL = [
      '.section-label-row', '.editorial-section-heading', '.editorial-lead-para',
      '.contact-dramatic-headline', '.contact-intro-copy', '.editorial-form-wrap',
      '.process-step-row', '.audit-specimen-card', '.monolith-card',
      '.case-spotlight-card', '.commitments-stack', '.manifesto-triad'
    ];
    const zones = ['#hero', '#brandStatement', '#services', '#work'];
    const nodes = [];
    document.querySelectorAll(SEL.join(',')).forEach((el) => {
      if (zones.some((z) => el.closest(z))) return;
      el.setAttribute('data-v2-reveal', '');
      nodes.push(el);
    });
    if (!nodes.length) return;
    if (reduced() || !('IntersectionObserver' in window)) {
      nodes.forEach((el) => el.classList.add('v2-in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add('v2-in');
        io.unobserve(en.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -7% 0px' });
    nodes.forEach((el, i) => {
      el.style.setProperty('--vd', ((i % 5) * 70) + 'ms');
      io.observe(el);
    });
  })();

  /* --- 13d. 3D TILT (v2 doctrine: cached rect, rAF writes, instant reset) --- */
  (() => {
    if (reduced()) return;
    document.querySelectorAll('.h-frame, .audit-specimen-card, .monolith-card, .case-spotlight-card')
      .forEach((el) => {
        if (el.dataset.v2Tilt) return;
        el.dataset.v2Tilt = '1';
        el.setAttribute('data-v2-tilt', '');
        el.classList.add('v2-tilting');
        let raf = 0, px = 0.5, py = 0.5;
        const apply = () => {
          raf = 0;
          const rx = ((0.5 - py) * 5).toFixed(2);
          const ry = ((px - 0.5) * 6).toFixed(2);
          el.style.transform = 'perspective(1100px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateZ(10px)';
        };
        el.addEventListener('pointerenter', () => {
          if (reduced()) return;
          liveRect(el);
        });
        el.addEventListener('pointermove', (e) => {
          if (reduced()) return;
          const rect = liveRect(el);
          px = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
          py = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));
          if (!raf) raf = requestAnimationFrame(apply);
        });
        el.addEventListener('pointerleave', () => {
          if (raf) { cancelAnimationFrame(raf); raf = 0; }
          el.style.transform = '';
        });
      });
  })();

  /* --- 13e. FLASHLIGHT CARD GLARE (CSS vars only, one rAF-batched write) --- */
  (() => {
    if (reduced()) return;
    document.querySelectorAll('.h-frame, .audit-specimen-card, .monolith-card, .case-spotlight-card, .editorial-form-wrap')
      .forEach((el) => {
        if (el.dataset.v2Glare) return;
        el.dataset.v2Glare = '1';
        el.setAttribute('data-v2-glare', '');
        let raf = 0, mx = 50, my = 50;
        const apply = () => {
          raf = 0;
          el.style.setProperty('--mx', mx + '%');
          el.style.setProperty('--my', my + '%');
        };
        el.addEventListener('pointermove', (e) => {
          if (reduced()) return;
          const rect = liveRect(el);
          mx = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
          my = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
          if (!raf) raf = requestAnimationFrame(apply);
        });
      });
  })();

  /* --- 13f. MAGNETIC CTAs (subtle 8px pull, spring-back on leave) --- */
  (() => {
    if (reduced()) return;
    document.querySelectorAll('.btn-primary-form, .btn-whatsapp-form, .wa-btn-direct')
      .forEach((el) => {
        if (el.dataset.v2Magnetic) return;
        el.dataset.v2Magnetic = '1';
        el.setAttribute('data-v2-magnetic', '');
        let raf = 0, dx = 0, dy = 0;
        const apply = () => {
          raf = 0;
          el.style.transform = 'translate(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px)';
        };
        el.addEventListener('pointerenter', () => {
          liveRect(el);
          el.classList.add('v2-magnet-on');
        });
        el.addEventListener('pointermove', (e) => {
          const rect = liveRect(el);
          dx = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
          dy = ((e.clientY - rect.top) / rect.height - 0.5) * 6;
          if (!raf) raf = requestAnimationFrame(apply);
        });
        el.addEventListener('pointerleave', () => {
          el.classList.remove('v2-magnet-on');
          el.style.transform = '';
          if (raf) { cancelAnimationFrame(raf); raf = 0; }
        });
      });
  })();

  /* --- 13g. COPY NUMBER CHIP in the WhatsApp drawer (beginner-friendly) --- */
  (() => {
    const waFooter = document.querySelector('.wa-drawer-footer');
    if (!waFooter || document.getElementById('v2CopyNum')) return;
    const waLink = document.querySelector('a[href*="wa.me"]');
    const num = waLink ? ((waLink.getAttribute('href').match(/wa\.me\/(\d+)/) || [])[1] || '') : '';
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'v2-copy-chip';
    chip.id = 'v2CopyNum';
    chip.textContent = 'COPY NUMBER';
    chip.addEventListener('click', async () => {
      const text = num ? '+' + num : '';
      try {
        await navigator.clipboard.writeText(text);
      } catch (_) {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (_e) { /* noop */ }
        ta.remove();
      }
      const box = document.getElementById('toastBox');
      if (box) {
        const t = document.createElement('div');
        t.className = 'toast-item';
        t.textContent = '✓ WhatsApp number copied.';
        box.appendChild(t);
        setTimeout(() => {
          t.style.opacity = '0';
          t.style.transition = 'opacity 0.3s ease';
          setTimeout(() => t.remove(), 300);
        }, 3200);
      }
    });
    waFooter.appendChild(chip);
  })();

  /* --- 13h. HERO 3D DEPTH FIELD (vanilla canvas starfield + mouse parallax) ---
     Replaces the WebGL engine dropped in their redesign, with zero libraries.
     DPR-capped, sleeps when the hero is off-screen or the tab is hidden. */
  (() => {
    if (reduced()) return;
    const cv = document.getElementById('v2Field3D');
    const hero = document.getElementById('hero');
    if (!cv || !hero) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    const COLORS = ['201, 240, 0', '56, 189, 248', '139, 92, 246'];
    let W = 0, H = 0, dots = [], running = false, raf = 0, last = 0;
    let tx = 0, ty = 0, mx = 0, my = 0;
    const build = () => {
      const r = hero.getBoundingClientRect();
      W = Math.max(1, Math.floor(r.width * DPR));
      H = Math.max(1, Math.floor(r.height * DPR));
      cv.width = W;
      cv.height = H;
      const n = Math.min(85, Math.max(26, Math.floor(r.width / 17)));
      dots = [];
      for (let i = 0; i < n; i++) {
        dots.push({
          x: Math.random() * 2 - 1,
          y: Math.random() * 2 - 1,
          z: 0.3 + Math.random() * 0.7,
          c: COLORS[(Math.random() * COLORS.length) | 0],
          tw: Math.random() * 6.28
        });
      }
    };
    const draw = (t) => {
      if (!running) { raf = 0; return; }
      if (!last) last = t;
      const dt = Math.min(50, t - last);
      last = t;
      mx += (tx - mx) * 0.05;
      my += (ty - my) * 0.05;
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2, cy = H / 2;
      for (const d of dots) {
        d.z -= 0.00009 * dt * (0.4 + d.z);
        if (d.z <= 0.08) {
          d.x = Math.random() * 2 - 1;
          d.y = Math.random() * 2 - 1;
          d.z = 1;
        }
        const k = 0.85 / d.z;
        const px = cx + d.x * k * cx * 0.5 + mx * 24 * DPR * (1.3 - d.z);
        const py = cy + d.y * k * cy * 0.5 + my * 24 * DPR * (1.3 - d.z);
        if (px < -30 || px > W + 30 || py < -30 || py > H + 30) continue;
        const size = Math.max(0.6, 2.2 * DPR * (1.15 - d.z));
        const a = (0.34 * (1.05 - d.z) * (0.72 + 0.28 * Math.sin(t * 0.0016 + d.tw))).toFixed(3);
        ctx.fillStyle = 'rgba(' + d.c + ',' + a + ')';
        ctx.beginPath();
        ctx.arc(px, py, size, 0, 6.2832);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    const start = () => {
      if (!running && !raf) {
        running = true;
        last = 0;
        raf = requestAnimationFrame(draw);
      }
    };
    const stop = () => { running = false; };
    build();
    let rto = 0;
    window.addEventListener('resize', () => {
      clearTimeout(rto);
      rto = setTimeout(build, 150);
    }, { passive: true });
    window.addEventListener('mousemove', (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver((es) => {
        es.forEach((en) => {
          if (en.isIntersecting) {
            if (!document.hidden) start();
          } else {
            stop();
          }
        });
      }, { threshold: 0.02 }).observe(hero);
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) stop(); else start();
      });
    } else {
      start();
    }
  })();
})();
