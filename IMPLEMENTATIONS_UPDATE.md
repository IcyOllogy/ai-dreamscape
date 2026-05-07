# Implementation Update: Dreamscape (Modern Neon App)

This doc is the single source of truth for what’s shipped vs what’s next. It’s written so a human can skim it quickly, and every completed checkbox should have a concrete “proof” pointer (file path).

---

## Phase 1 (Completed): Foundation + Correctness

- [x] **CSS is real + theme tokens exist (neon + obsidian)**  
      Proof: `src/styles.css` (no longer empty; defines tokens + utilities)
- [x] **Neon/glass utility classes exist (used by the UI)**  
      Proof: `src/styles.css` defines `glass-panel`, `glass-card`, `neon-button`, `neon-text`, `shadow-neon`, `gold-*` helpers  
      Proof of usage: `src/routes/index.tsx`, `src/components/site/Navigation.tsx`, `src/routes/companions.tsx`, `src/routes/companions.$id.tsx`
- [x] **Typography uses `Outfit`**  
      Proof: `src/routes/__root.tsx` loads Google Fonts (Outfit)
- [x] **Chat handoff works (profile → chat selects the right companion)**  
      Proof: `src/routes/companions.$id.tsx` sets `sessionStorage["noctis-chat-id"]`  
      Proof: `src/routes/chat.tsx` reads `sessionStorage["noctis-chat-id"]`
- [x] **Companions gallery route cleaned up (single implementation)**  
      Proof: `src/routes/companions.tsx`
- [x] **Build is unblocked even without real image assets** (placeholder SVGs are committed)  
      Proof: `src/assets/placeholders/hero.svg`, `src/assets/placeholders/companion.svg`  
      Proof: `src/data/companions.ts` + `src/routes/index.tsx` + `src/routes/login.tsx` + `src/routes/signup.tsx` now import placeholders

---

## Phase 2 (In Progress): Core Platform UX (Chat / Pricing / Auth)

- [ ] **Chat UI redesign** (`src/routes/chat.tsx`) to match the neon/glass “app” aesthetic  
      Definition of done: responsive layout, clear active companion, glass message rail/input, strong focus states, clear empty/new-thread behavior
- [ ] **Pricing UI polish** (`src/routes/pricing.tsx`) as premium membership tiers  
      Definition of done: hierarchy is crisp, featured tier pops, responsive cards, CTA clarity
- [ ] **Auth UI polish** (`src/routes/login.tsx`, `src/routes/signup.tsx`) consistent glass panels + neon CTAs  
      Definition of done: consistent spacing/typography with landing, accessible labels, visible focus, mobile-friendly

---

## Phase 3: Asset Finalization (Real Images)

- [ ] **Hero asset**: replace placeholder hero with high-resolution lead image  
      Current placeholder: `src/assets/placeholders/hero.svg`
- [ ] **Companion portraits**: replace placeholder portrait with 24 realistic portraits  
      Current placeholder: `src/assets/placeholders/companion.svg`
- [ ] **Thumbnail consistency**: ensure all cards are crisp and correctly cropped at `2:3`

---

## Phase 4: Polish + Interaction

- [ ] **Micro-animations**: subtle glow transitions + neon pulse on hover (cards/buttons)
- [ ] **Affinity system**: visual “Intimacy Level” progress on profiles
- [ ] **Loading states**: branded skeletons/spinners for perceived performance

---

## Phase 5: Hooks + Privacy

- [ ] **Similar characters**: “More Like Her” carousel on profile pages
- [ ] **Quick Chat**: “Chat Now” overlay action on gallery cards
- [ ] **Privacy boss key**: instant hide/exit behavior (desktop + mobile, keyboard accessible)
- [ ] **Badges**: “New / Trending” high-contrast neon tags

---

## Technical Notes (Keep Consistent)

- **Background target**: `#020202` (obsidian)
- **Neon targets**: Magenta `#FF1B6B` → Purple `#A855F7` (implemented as theme tokens in `src/styles.css`)
- **Font**: `Outfit`
- **Portrait aspect ratio**: `aspect-[2/3]`
