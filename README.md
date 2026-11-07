# Signal Portfolio — Yusuf Olanrewaju Toye

> *"Curiosity connects everything."*

A personal portfolio website built for the **AWS Student Builder Challenge: Build Your Tech Superpower**. Designed from scratch with plain HTML, CSS, and JavaScript — no frameworks, no build tools, no dependencies — and deployed globally on **AWS Amplify Hosting**.

🔗 **Live site:** https://main.d267x7fkb7rw7g.amplifyapp.com  
🐙 **Repository:** https://github.com/toyeyusuf/signal-portfolio

---

## Screenshots

### Hero — live animated network topology
![Hero section showing name, role, and animated particle network](screenshots/hero.png)

### About — animated counters
![About section with 600+ students trained and 500+ access points deployed](screenshots/about.png)

### Journey — circuit trace timeline
![Journey section with five career stage cards lit up along a circuit trace](screenshots/journey.png)

### Skills — interactive scratch cards
![Skills section showing scratch cards for certifications and technical skills](screenshots/skills.png)

### Projects — vending machine
![Projects vending machine with coin slot and dispensed project card](screenshots/projects.png)

### Packet routing game — creative feature
![Packet routing game showing a successful route from laptop to cloud with the fun fact revealed](screenshots/packet-game.png)

### Connect
![Connect section with LinkedIn, GitHub and email links](screenshots/connect.png)

### AWS Amplify — deployed and live
![AWS Amplify console showing signal-portfolio app deployed on main branch](screenshots/amplify.png)

---

## The concept

Most portfolios are CVs dressed in CSS. This one is different.

The design concept is **"The Signal"** — every section of the site is a layer a signal travels through. The visual language is consistent from top to bottom: deep navy dark mode, cyan `#00c8ff` as the signal color, Space Grotesk headlines, and JetBrains Mono for code-style labels.

The goal was to make a visitor *feel* the journey from mechanical engineering to cloud networking — not just read about it. Each section uses a different interactive metaphor drawn directly from the domain:

| Section | Metaphor |
|---|---|
| Hero | Live animated network topology (Canvas API particles) |
| Journey | Circuit trace that lights up stage by stage as you scroll |
| Skills | Scratch cards — drag to uncover each skill |
| Projects | Minimal vending machine — insert a coin to unlock each project |
| Transmitting | Locked fun fact — only revealed after successfully routing a packet |
| Connect | Signal endpoints |

---

## Creative feature — Send a Packet

The signature interactive feature is a **network packet routing game**, accessible from the navbar, the hero section, and the Transmitting section.

### How it works

A network topology is drawn on an HTML5 Canvas: a laptop, six router nodes (R1–R6), and a cloud endpoint. Some links are live (solid cyan), some are down (dashed amber). The visitor clicks nodes in order to build a valid route — exactly the way a network engineer traces a path through a real topology.

```
Laptop ──── R1 ──── R3 ──┐
       └─── R2 ──── R4 ──┴── R5 ──── Cloud
```

Links through R6 are down. Two valid routes exist:
- `Laptop → R1 → R3 → R5 → Cloud`
- `Laptop → R2 → R4 → R5 → Cloud`

### What makes it more than a game

The game is the **gatekeeper** for the fun fact section. The Transmitting section shows a locked panel — no content visible — until a successful route is completed. On success:

1. The packet animates along the chosen path in real time
2. The overlay shows a delivery confirmation: *"Packet delivered."*
3. Simultaneously, the fun fact section on the page unlocks — locked panel fades out, revealed content fades in
4. The visitor clicks "See what's there →" and the page scrolls to the now-unlocked section

The fun fact: I'm planning a YouTube channel that breaks down networking and cloud concepts for everyone — the same curiosity that moved me from mechanical engineering to cloud, packaged into videos.

The game supports **mouse drag**, **touch**, and full **keyboard navigation** (arrow keys + Enter). It also respects `prefers-reduced-motion`.

---

## Technical implementation

### Stack

- **HTML5** — semantic, accessible markup with ARIA roles and live regions
- **CSS3** — custom properties, Grid, Flexbox, keyframe animations, `backdrop-filter`, `IntersectionObserver`-driven transitions
- **Vanilla JavaScript** — zero frameworks, zero npm packages, zero build step
- **Canvas API** — hero particle network, packet routing game, scratch card reveal engine
- **Web Audio API** — procedurally generated coin and dispense sounds in the vending machine (no audio files needed)

### AWS services used

| Service | Purpose |
|---|---|
| **AWS Amplify Hosting** | Continuous deployment from GitHub, global CDN distribution, automatic HTTPS |

### Amplify build configuration

Since the site has no build step, the Amplify build spec is intentionally minimal:

```yaml
version: 1
frontend:
  phases:
    build:
      commands: []
  artifacts:
    baseDirectory: /
    files:
      - '**/*'
  cache:
    paths: []
```

Amplify detects `index.html` at the repository root and serves the three files directly through its global CDN. Every push to `main` triggers an automatic redeploy.

---

## Features breakdown

### Hero
- HTML5 Canvas particle network: 60 nodes with randomised velocities, connected by proximity with opacity-weighted edges
- Typewriter effect for name and role — pure `setInterval`, no libraries
- Staggered CSS animation delays on badges, CTAs, and scroll hint

### Journey — circuit trace
- Horizontal scrolling timeline with 5 career stages
- `IntersectionObserver` triggers staggered sequence: nodes fade in, circuit trace fills via animated CSS `::before` `width` transition
- Stage 5 (Agentic AI) has a pulsing dashed border to signal it's current

### Skills — scratch cards
- 11 cards: 4 certifications + 5 technical skills + 2 currently-learning
- Each card is a Canvas element layered over a DOM back-face
- Cover uses diagonal line texture and a "scratch to reveal" hint
- Erase mechanic: `globalCompositeOperation = 'destination-out'` with a radial gradient brush
- Grid pixel sampling (`getImageData`) checks erased area every 10 brush strokes — auto-completes at 60%
- "Reveal all" button for keyboard and reduced-motion users
- `prefers-reduced-motion` reveals all cards immediately

### Projects — vending machine
- Drag-and-drop coin with proximity detection on `mouseup`/`touchend`
- State machine: idle → coin inserted → slot selected → processing → dispense → recharge
- Animated CSS progress bar during processing
- Project content stored in `<template>` elements — cloned and injected into tray on dispense
- Web Audio API generates coin tone and dispense thud procedurally
- Full keyboard support throughout

### Packet routing game
- Canvas-based directed graph: 8 nodes, 12 edges, 4 downed links
- Two valid routes; invalid selections are rejected with feedback
- Soft radial gradient brush for path highlighting
- Packet travel animation using `requestAnimationFrame`
- Backtrack support: click the previous node to undo a step
- On win: unlocks the fun fact section via DOM cross-section state

### Transmitting — fun fact
- Hard-locked by default — zero content visible until game is won
- Unlock: locked panel fades out with `opacity` + `transform` transition, revealed content fades in
- Broadcast icon receives a cyan glow burst on unlock
- Pulsing concentric ring animation using three layered `<span>` elements with staggered delays

---

## Accessibility

- Semantic HTML throughout: `<nav>`, `<section>`, `<article>`, `<h1>`–`<h3>` hierarchy
- All interactive elements have `aria-label`, `role`, and `tabindex`
- `aria-live="polite"` on dynamic status regions
- `aria-hidden="true"` on all decorative elements
- Full keyboard navigation on every interactive feature
- `prefers-reduced-motion: reduce` handled across all animations

---

## Responsive design

- Breakpoints at `900px` and `600px`
- Nav collapses to a full-screen mobile menu with backdrop blur
- Circuit trace scrolls horizontally on narrow screens
- Vending machine stacks vertically on mobile
- Scratch card grid: 4-column → 2-column → `auto-fill`

---

## Project structure

```
signal-portfolio/
├── index.html          # All markup, templates, overlays
├── styles.css          # Design tokens, layout, animations
├── script.js           # All interactive logic
├── README.md           # This file
└── screenshots/        # Screenshots for this README
    ├── hero.png
    ├── about.png
    ├── journey.png
    ├── skills.png
    ├── projects.png
    ├── packet-game.png
    ├── connect.png
    └── amplify.png
```

No `node_modules`. No `package.json`. No build output. Open `index.html` in any browser to run it locally.

---

## Run locally

```bash
git clone https://github.com/toyeyusuf/signal-portfolio.git
cd signal-portfolio
```

Open `index.html` in any browser. No server needed — but if you want one:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

---

## What I learned

**The constraint was the creative challenge.** No frameworks, no build tools — every animation had to be reasoned from first principles. That constraint forced genuine understanding rather than reaching for a library.

- **Canvas compositing** — `destination-out` for the scratch card erase mechanic required understanding alpha channels at the pixel level.
- **Web Audio API** — generating sounds with oscillators and gain envelopes produces expressive results without any audio files.
- **`IntersectionObserver` sequencing** — using it to drive the circuit trace animation across multiple elements in a timed sequence, not just fade things in.
- **Drag-and-drop without libraries** — handling pointer events across document boundaries, scaling canvas coordinates for touch, and making it feel natural took the most iteration.
- **AWS Amplify Hosting** — connecting GitHub for continuous deployment and understanding how Amplify serves static assets through its CDN were new, practical skills.

---

## Challenges

**Making the game and the fun fact section feel connected, not separate.** The first version revealed the fun fact inside the overlay. The better solution was to make the section itself the payoff — the overlay is the puzzle, the section is the reward. That required cross-component state: the game reaching out to modify a completely separate section of the DOM, cleanly, without a framework.

**Canvas sizing across devices.** Both the scratch cards and the packet game use canvases sized to their containers. Getting correct sizing across device pixel ratios, scroll-during-resize edge cases, and touch coordinate scaling required more precision than expected.

**Accessibility for drag interactions.** The vending machine coin is draggable — inherently inaccessible by default. Adding `tabindex`, `aria-label`, and keyboard alternatives (press Enter to insert) meant the entire interaction works without a pointer device.

---

## Submission checklist

- [x] Public portfolio website hosted on AWS Amplify, loads at a live URL
- [x] About Me section
- [x] Skills section (interactive scratch cards)
- [x] Projects section (interactive vending machine)
- [x] One creative feature that works without blocking navigation (packet routing game → fun fact unlock)
- [x] Visible hint to find the creative feature (navbar, hero CTA, Transmitting section)
- [x] GitHub repository with all source files
- [x] Original portfolio, not published before this challenge

---

## About me

**Yusuf Olanrewaju Toye**  
Cloud Network Engineer & Technical Instructor  
B.Eng. Mechanical Engineering — Federal University of Technology, Minna 🇳🇬

I trained to move force through gears and shafts, and now I move data through routers and clouds. The physics changed, but the questions didn't.

**Certifications:** AWS Certified AI Practitioner · Google Cloud Associate Cloud Engineer · Huawei HCIP Cloud Solutions Architect · ISC2 Certified in Cybersecurity  
**Technical skills:** Routing & Switching · Python · Linux · Containerization · Terraform  
**Currently learning:** Agentic AI · Ansible

📎 [LinkedIn](https://linkedin.com/in/yusuflarrytoye) · [GitHub](https://github.com/toyeyusuf) · toyeyusuf506@gmail.com

---

*Built for the AWS Student Builder Challenge · October–November 2026*
