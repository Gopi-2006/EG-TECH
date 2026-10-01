# Technical & Motion Specification: EG TECH Colorful Cinematic Experience

**Document:** `docs/spec/colorful-cinematic-film.md`  
**Status:** Approved Intent — Specification Phase  
**Author:** Lead Creative Director & Principal Frontend Architect  
**Design Read:** Creative technology studio landing & interactive film for founders and innovators, with an electric, luminous, futuristic visual language (Apple Keynote polish + Linear precision + Awwwards kinetic motion), powered by GPU-accelerated CSS, SVG, GSAP, and ScrollTrigger.  
**Dials:** `DESIGN_VARIANCE: 8` | `MOTION_INTENSITY: 8` | `VISUAL_DENSITY: 4`  

---

## 1. Objective & Scope

Transform the EG TECH homepage from a dark, conventional technical landing page into an electric, colorful, 14-scene scroll-driven digital film (*Idea → Imagination → Design → Code → Code-to-UI Morph → Colorful Product → Screen Entry → Live Client → Color Collapse → EG TECH Reveal → Services → Showcase → Final CTA → Requirement Form*).

### The Golden Rule
**SCROLL = TIME.**  
Scrolling down progresses the visual story. Scrolling up reverses the story cleanly. Zero main autoplay. Zero heavy 3D or WebGL. Strict GPU performance targeting silky 60 FPS on desktop, tablet, and mobile.

---

## 2. Tech Stack & Architecture

- **Core Structure:** Semantic HTML5 (`index.html`)
- **Styling:** Custom CSS design system with HSL/Hex calibrated tokens, GPU acceleration, and responsive media queries (`styles.css`)
- **Motion Engine:** GSAP 3.12 + ScrollTrigger (`assets/libs/gsap.min.js`, `assets/libs/ScrollTrigger.min.js`)
- **Typography:** Google Fonts:
  - Display / Headlines: `Outfit` (wght 400, 500, 600, 700, 800, 900)
  - Body / Subtext: `Plus Jakarta Sans` (wght 300, 400, 500, 600, 700)
  - Code / Metadata / Monospace: `JetBrains Mono` (wght 400, 500, 600, 700)
- **Backend & Persistence:** Node.js HTTP server + `node:sqlite` persistent storage (`server.js`, `data/inquiries.db`) with `localStorage` client backup.

---

## 3. Calibrated Color System (Hierarchy & Intelligent Transitions)

> [!IMPORTANT]
> **COLORFUL DOES NOT MEAN RAINBOW.** Colors are deployed as dynamic atmospheric lighting, gradient trails, and living aura fields that shift scene-by-scene:

### Core Palette Tokens
```css
:root {
  /* Deep Blue-Black Canvas */
  --bg-deep: #050816;
  --bg-surface: #0a0f26;
  --bg-frosted: rgba(10, 15, 38, 0.72);
  --bg-card: rgba(14, 21, 52, 0.85);

  /* Curated Vivid Accent Spectrum */
  --c-electric-blue: #3B82F6;
  --c-cyan:          #06B6D4;
  --c-violet:        #8B5CF6;
  --c-purple:        #A855F7;
  --c-pink:          #EC4899;
  --c-teal:          #14B8A6;
  --c-warm-white:    #F8FAFC;
  --c-text-muted:    #94A3B8;

  /* Atmospheric Color Fields */
  --glow-blue:   rgba(59, 130, 246, 0.35);
  --glow-cyan:   rgba(6, 182, 212, 0.35);
  --glow-violet: rgba(139, 92, 246, 0.35);
  --glow-pink:   rgba(236, 72, 153, 0.35);
  --glow-teal:   rgba(20, 184, 166, 0.35);
}
```

### Intelligent Scene Color Progression
1. **Scene 01–02 (Idea & Structure):** Electric Blue (`#3B82F6`) → Cyan (`#06B6D4`) with ambient violet aura
2. **Scene 03–05 (Code & Morph):** Cyan (`#06B6D4`) → Violet (`#8B5CF6`) → Purple (`#A855F7`)
3. **Scene 06–08 (Product Assembly & Live Client):** Violet (`#8B5CF6`) → Pink (`#EC4899`) → Teal (`#14B8A6`)
4. **Scene 09 (Color Collapse):** Reverse converge: Pink → Violet → Blue → Cyan into the EG TECH emblem
5. **Scene 10 (EG TECH Reveal):** Luminous Electric Blue + Cyan dual aura
6. **Scene 11 (Services):** Dedicated chromatic identity per service:
   - 01 Web Development: Electric Blue (`#3B82F6`)
   - 02 Mobile Apps: Cyan (`#06B6D4`)
   - 03 AI Solutions: Violet (`#8B5CF6`)
   - 04 UI/UX Design: Pink (`#EC4899`)
   - 05 Business Software: Teal (`#14B8A6`)
7. **Scene 12 (Project Showcase):** Individual branded aura per card:
   - *Vibe Attire:* High-fashion Gold/Cream & Electric Violet
   - *CampusBite:* Energetic Coral Pink & Amber
   - *Nexus Cloud AI:* Cyber Cyan & Deep Teal
8. **Scene 13–14 (CTA & Briefing Form):** Warm White & Electric Blue luminous gradient with light sweep

---

## 4. 14-Scene Narrative Choreography

| Scene # | Name | Visual Experience | Key Technology |
|---|---|---|---|
| **01** | **Color Field Intro** | Living mesh gradient with slowly moving color fields (Blue, Cyan, Violet, Pink) behind elegant typography: *"Every digital product starts with an idea."* → transforms to *"Let's build it."* | SVG animated gradient / CSS radial mesh + GSAP scrub |
| **02** | **Idea Visualization** | Floating translucent panels (`IDEA`, `DESIGN`, `CODE`, `DATA`, `PRODUCT`) with colorful glow; scattered ideas assemble into organized orbital geometry. | Translucent frosted cards + 3D translate/scale |
| **03** | **Laptop Reveal** | Precision metallic laptop frame slides in with blue edge lighting, violet ambient reflection, and cyan display borders. | Lightweight 2.5D CSS chassis, zero Three.js |
| **04** | **Colorful Code** | Editor appears with rich syntax highlighting (`const idea = "YOUR BUSINESS"; design(idea); build(idea); launch(idea);`), gradient cursor, and glowing line highlights. | JetBrains Mono + progressive line reveals |
| **05** | **Code Transformation (SIGNATURE MOMENT)** | Code tokens `<Navbar />`, `<Card />`, `<Button />` physically detach, morph, scale, and turn directly into live UI components. | GSAP morph, `clip-path`, transform, SVG shapes |
| **06** | **Colorful Product Build** | Dynamic gradient progression (Blue hero → Cyan content → Violet section → Pink accent → Teal CTA). UI components assemble seamlessly into `VIBE ATTIRE`. | Asymmetric flex/grid + staggered component entry |
| **07** | **Signature Screen Entry** | Laptop screen scales up to 4x, bezels dissolve, colorful gradient expands beyond the viewport; the user smoothly "enters" the product. | GSAP scale/translate + bezel fade |
| **08** | **Finished Client Product** | Full-screen `VIBE ATTIRE` digital flagship (Live status bar, hero lookbook, product drop cards, add-to-bag interaction). | High-res photography, luxury editorial typography |
| **09** | **Color Collapse** | Pink → Violet → Blue → Cyan smoothly collapse from the edges into a singular glowing focal point. | Radial color-field morphing & scale down |
| **10** | **EG TECH Reveal** | Glowing geometric emblem springs to life; *"EG TECH — EMPOWERING GROWTH TECHNOLOGY"*; then: *"YOUR IDEA."* ... pause ... *"OUR CODE."* ... *"YOUR DIGITAL PRODUCT."* | Staggered kinetic typography + emblem animation |
| **11** | **Services (Editorial Asymmetric)** | 5 service cards with unique color accents, hover gradient expansions, text displacement, and micro-interactions. | CSS Grid + hover border glow |
| **12** | **Project Showcase** | Large visual panels sliding into view (Vibe Attire, CampusBite, Nexus AI) with problem-solution-result formula. | Editorial cards with branded glowing badges |
| **13** | **Final CTA** | Gradient background with headline: *"Have an idea? Let's turn it into something real."* Magnetic button with hover light sweep: `START YOUR PROJECT →`. | Radial gradient + magnetic cursor tracking |
| **14** | **Project Requirement Form** | Sleek briefing interface with pills for Project Type, Budget, Timeline, and instant `/api/project-inquiry` SQLite submission. | Form with custom interactive pills + AJAX |

---

## 5. Performance & 60 FPS Constraints

1. **Strictly Allowed Properties:**
   - `transform: translate3d(), scale(), rotate()`
   - `opacity`
   - `clip-path`
   - `filter: drop-shadow()` (restrained, max 1 per container)
2. **Strictly Prohibited:**
   - Three.js / WebGL scenes
   - Pre-rendered background video loops
   - Multiple heavy `backdrop-filter: blur(40px)` stacked on moving elements
   - Animating `width`, `height`, `top`, `left`, `margin` inside the scroll loop (all sizing pre-set, motion handled via `transform`)
3. **GPU Layer Promotion:**
   - Elements tagged with `will-change: transform, opacity`
   - Pinned track wrapped in single master GSAP timeline with `anticipatePin: 1`

---

## 6. Commands & Verification

- **Start Dev Server:** `node server.js` (port 3000)
- **Check JS Syntax:** `node -c app.js && node -c server.js`
- **Verify Inquiries API:** `node -e "const http = require('http'); http.get('http://localhost:3000/api/project-inquiries', res => console.log('STATUS:', res.statusCode));"`
- **End-to-End Browser Check:** Automated test with `browser_subagent` inspecting all 14 scenes and submitting a project brief.

---

## 7. Boundaries

- **Always:** Use GPU transforms; maintain WCAG 4.5:1 text contrast on light/dark surfaces; support keyboard accessibility and form validation; handle offline fallback.
- **Ask First:** Adding external npm dependencies or changing SQLite schema.
- **Never:** Use raw black backgrounds (#000000); use generic AI purple/slate templates; use Three.js; autoplay unmuted media.
