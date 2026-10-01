# Implementation Plan: EG TECH Colorful Cinematic Experience

**Document:** `tasks/plan.md`  
**Spec Reference:** [`docs/spec/colorful-cinematic-film.md`](file:///c:/Users/gopim/Desktop/EGTECH/company%20web/docs/spec/colorful-cinematic-film.md)  
**Target:** 14-Scene Scroll-Driven Digital Film with Vibrant Color Spectrum & Code-to-UI Morph  

---

## Architecture & Dependency Flow

```
[Design System & Chromatic Tokens] (styles.css)
               │
               ▼
[Semantic 14-Scene DOM Architecture] (index.html)
               │
               ▼
[GSAP Master Timeline & Morph Engine] (app.js)
               │
               ▼
[API & SQLite Persistence Verification] (server.js + /api/project-inquiry)
               │
               ▼
[Cross-Device & Browser Performance Audit] (60 FPS verification)
```

---

## Vertical Implementation Slices

### Slice 1: Chromatic Design System & Living Mesh Gradients
- **Files:** `styles.css`
- **Scope:**
  - Define root color tokens (`--c-electric-blue: #3B82F6`, `--c-cyan: #06B6D4`, `--c-violet: #8B5CF6`, `--c-purple: #A855F7`, `--c-pink: #EC4899`, `--c-teal: #14B8A6`, `--bg-deep: #050816`).
  - Implement living animated background mesh gradient (GPU-accelerated radial gradients shifting in position).
  - Style 2.5D metallic laptop frame with cyan edge highlights, blue top-lighting, and violet ambient reflection.
  - Create frosted glass aesthetic for Scene 02 floating idea panels (`IDEA`, `DESIGN`, `CODE`, `DATA`, `PRODUCT`).
  - Style the signature code-to-UI morphing tokens (`<Navbar />`, `<Card />`, `<Button />`).
  - Style Services with 5 dedicated chromatic identities.
  - Add magnetic hover states and light sweep effects.

### Slice 2: Semantic HTML5 14-Scene Markup Architecture
- **Files:** `index.html`
- **Scope:**
  - Scene 01: Ambient mesh gradient container + introductory headline (*"Every digital product starts with an idea."* → *"Let's build it."*).
  - Scene 02: Floating translucent idea panels with colorful glowing auras.
  - Scene 03: 2.5D metallic laptop with edge lighting.
  - Scene 04: Colorful code editor with syntax tokens and glowing cursor.
  - Scene 05: Signature code-to-UI morphing layer (animatable code badges morphing into real UI elements).
  - Scene 06: Assembling `VIBE ATTIRE` preview with multi-color section progression.
  - Scene 07: Screen entry zoom overlay.
  - Scene 08: Fullscreen `VIBE ATTIRE` digital flagship.
  - Scene 09: Color collapse container (Pink → Violet → Blue → Cyan).
  - Scene 10: EG TECH emblem, brand reveal, and *"YOUR IDEA. OUR CODE. YOUR DIGITAL PRODUCT."*.
  - Scene 11: Editorial asymmetric Services suite with individual color accents.
  - Scene 12: Immersive Project Showcase with large visual panels (Vibe Attire, CampusBite, Nexus Cloud AI).
  - Scene 13: Final CTA banner with magnetic button.
  - Scene 14: Project requirement form with pills, description, budget, timeline, and success card.

### Slice 3: Master GSAP Motion Engine & ScrollTrigger Scrub
- **Files:** `app.js`
- **Scope:**
  - Register ScrollTrigger; initialize all elements with zero layout-thrashing GPU states.
  - Single master pinned timeline on `#pinnedStage` with `trigger: '#scrollTrack'`, `end: '+=5600'`, and `scrub: 1`.
  - Beat-by-beat choreography:
    - Beat 1: Intro headline morph & ambient mesh color drift.
    - Beat 2: Idea panels orbit and converge into structure.
    - Beat 3: Laptop glides in with glowing metallic reflections.
    - Beat 4: Progressive colorful code reveal.
    - Beat 5: **Signature Morph Moment:** Code tokens physically detach, scale, and morph into real navbar, hero cards, and buttons.
    - Beat 6: Product color progression (Blue → Cyan → Violet → Pink → Teal).
    - Beat 7: Screen entry zoom (laptop scales 4x, bezels dissolve, seamless entry into product).
    - Beat 8: Live `VIBE ATTIRE` showcase.
    - Beat 9: Color collapse converging into the center.
    - Beat 10: EG TECH emblem reveal + kinetic typography.
  - Side navigation tracking and smooth-scroll anchors.

### Slice 4: Form Submission & SQLite Persistence Integration
- **Files:** `app.js`, `server.js`
- **Scope:**
  - Validate interactive pills (Project Type, Budget, Timeline) and form inputs.
  - Submit payload to `POST /api/project-inquiry`.
  - Ensure persistent SQLite storage in `data/inquiries.db` with `localStorage` backup.
  - Trigger celebratory success card with luminous aura.

### Slice 5: Verification & Performance Audit
- **Files:** Automated verification tools
- **Scope:**
  - Syntax checks (`node -c app.js`, `node -c server.js`).
  - API endpoint testing (`POST /api/project-inquiry` and `GET /api/project-inquiries`).
  - Headless browser validation across all 14 scenes.
