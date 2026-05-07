# Implementation Update: Modern & Arousing Dreamscape

This document tracks the progress of the total front-end overhaul of the AI Dreamscape platform. The goal is to move from a "grainy website" to a "premium, high-engagement AI app" with a younger, more arousing aesthetic.

## Completed Milestones

### 1. Global Design System (v2)
- [x] **Typography Overhaul**: Using `Outfit` (Bold/ExtraBold).
  - Evidence: `src/routes/__root.tsx` loads Google Fonts (`Outfit`).
- [x] **Pure Obsidian Foundation**: Dark-first foundation anchored at `#020202`.
  - Evidence: `src/routes/__root.tsx` sets `<meta name="theme-color" content="#020202">`.
- [x] **Glassmorphism Layer (in components)**: Glass panels/cards are used throughout the new UI.
  - Evidence: `src/components/site/Navigation.tsx`, `src/routes/index.tsx`, `src/routes/companions.tsx`, `src/routes/companions.$id.tsx` use `glass-panel` / `glass-card`.
- [x] **Removed Grain**: No grain/noise overlay component is present in the current source.
  - Evidence: there is no `*Grain*` / `*noise*` component or asset in the repo; older mentions remain only in `.lovable/plan.md`.

> Note: The intended neon palette (Magenta `#FF1B6B` → Purple `#A855F7`) is the target direction, but it must be implemented via the theme tokens/classes that the UI uses (e.g. `primary`, `secondary`, `neon-*`). See “Phase 0” below to make this provable.

### 2. Navigation & Architecture
- [x] **App-Like Sidebar**: Created a persistent left-hand navigation for desktop.
- [x] **Mobile Bottom Bar**: Implemented a thumb-friendly bottom navigation for mobile users.
- [x] **Global Shell Integration**: Integrated the new navigation into the root route.
  - Evidence: `src/components/site/Navigation.tsx` (sidebar + mobile bottom bar), `src/routes/__root.tsx` renders `<Navigation />` globally.

### 3. Companion Roster (Data Overhaul)
- [x] **Younger Roster**: Rewrote all 24 companion profiles to ages 20–24.
- [x] **Modern Archetypes**: Shifted from "cinematic" to "modern/sexual" archetypes (E-girl, Playful Student, etc.).
- [x] **Direct Bios**: Refined all descriptions to be more arousing and engagement-focused.
- [x] **Asset Pathing**: Updated image imports to reflect the new realistic structure.
  - Evidence: `src/data/companions.ts` contains 24 entries with ages 20–24 and imports `@/assets/realistic/c*.jpg`.

### 4. Page Redesigns
- [x] **Landing Page**: New immersive hero section and dense vertical character grid.
- [x] **Companions Gallery**: New filtering system with glassmorphic tabs and portrait cards.
- [x] **Character Profiles**: Implemented full-height immersive layouts for individual companions.
  - Evidence: `src/routes/index.tsx` (hero + featured grid), `src/routes/companions.tsx` (filters + portrait grid), `src/routes/companions.$id.tsx` (split immersive profile).

---

## Remaining Roadmap & Checklist

### Phase 0: Foundation & Correctness (do this first)
- [ ] **Make styling provable (critical)**: Ensure the CSS entrypoint that TanStack Start imports is real and contains the theme/tokens/utilities the components rely on.
  - Files involved: `styles.css` (imported by `src/routes/__root.tsx` as `../styles.css?url`), `src/styles.css` (referenced by `components.json`).
  - Outcome: `glass-panel`, `glass-card`, `neon-button`, `neon-text`, `shadow-neon`, `primary/secondary` tokens are defined and actually render in dev/prod.
- [ ] **Fix chat handoff key mismatch (critical)**: Profile page stores `"dreamscape-chat-id"` but chat reads `"noctis-chat-id"`.
  - Evidence: `src/routes/companions.$id.tsx` vs `src/routes/chat.tsx`.
  - Outcome: “Begin Conversation” reliably opens the selected companion in `/chat`.
- [ ] **Resolve `companions.tsx` duplicate/overlapping implementations (critical)**: File currently contains two competing implementations (`Gallery()` + `Companions()`) and broken structure.
  - Outcome: single, clean component; no dead code; filters/search behave as intended.

### Phase 2: Core Platform UX
- [ ] **Chat Interface Redesign**: Update `src/routes/chat.tsx` to match the neon/glassmorphic "app" aesthetic.
  - Definition of done: companion rail works on mobile/desktop, message bubbles + input are “glass”, focus states are visible, and empty-state/new-thread behavior is clear.
- [ ] **Pricing Page**: Refine `src/routes/pricing.tsx` to look like premium membership tiers (neon accents, glass cards, strong hierarchy).
  - Definition of done: tier comparison readable, featured tier pops, responsive layout, clear CTA, no “unstyled” elements.
- [ ] **Auth Pages**: Update `src/routes/login.tsx` + `src/routes/signup.tsx` to use consistent glass panel components and neon CTAs.
  - Definition of done: consistent spacing/typography with landing, accessible labels, focus rings, and mobile-friendly layout.

### Phase 3: Asset Finalization
- [ ] **Hero Asset**: Upload a high-resolution, younger, arousing lead character image.
- [ ] **Companion Assets**: Replace the 24 placeholders with high-fidelity realistic portraits.
- [ ] **Thumbnail Optimization**: Ensure all portrait cards use optimized `2:3` aspect ratios.
  - Definition of done: images are consistently cropped, load fast (avoid layout shift), and look sharp on retina displays.

### Phase 4: Polish & Interaction
- [ ] **Micro-animations**: Add subtle "glow" transitions and a "neon pulse" on hover for all character cards.
- [ ] **Affinity System**: Implement a visual progress bar on profiles showing "Intimacy Levels."
- [ ] **Loading States**: Create branded "Dreamscape" skeletons for better perceived performance.
  - Definition of done: animations are subtle (no nausea), don’t tank performance, and loading states match final layouts.

### Phase 5: Psychological Hooks & Privacy
- [ ] **Similar Characters**: Add a "More Like Her" carousel at the bottom of profile pages.
- [ ] **Quick Chat**: Add a direct "Chat Now" overlay button on gallery cards (hover state).
- [ ] **Privacy 'Boss Key'**: Implement a one-click "Quick Exit" button that hides the site immediately.
- [ ] **Exclusive Badges**: Add high-contrast neon badges for "New" or "Trending" characters.
  - Definition of done: boss key works on desktop + mobile, is reachable from keyboard, and has a safe default action (instant navigate away + optionally blank the screen).

---

## Technical Notes for Future Agents
- **Primary Color**: `#FF1B6B` (Magenta)
- **Secondary Color**: `#A855F7` (Purple)
- **Primary Font**: `Outfit`
- **Navigation**: Desktop Sidebar (`256px`), Mobile Bottom Bar (`64px`).
- **Aspect Ratio**: Always use `aspect-[2/3]` for character portraits.
