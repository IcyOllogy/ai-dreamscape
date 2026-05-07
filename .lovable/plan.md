## Vision

A luxe, cinematic AI companion platform — think editorial fashion magazine meets late-night film noir. Deep obsidian backgrounds, brushed gold and rose-champagne accents, oversized serif display type paired with refined sans, generous negative space, slow cinematic motion. The product feels expensive, mysterious, and grown-up — not a typical neon "adult site" — capturing the audience instantly with mood and craft.

Frontend only. No backend, no real auth, no real payments — all UI mockups with realistic placeholder content.

## Design system

- **Palette (oklch tokens in `src/styles.css`)**: obsidian black background, ivory foreground, champagne gold primary, dusty rose accent, deep wine secondary, smoke muted. Light mode skipped — this is a dark-first product.
- **Type**: Display serif (Cormorant Garamond / Playfair) for headings; Inter for UI/body. Loaded via Google Fonts in `__root.tsx`.
- **Effects**: subtle film grain overlay, soft gold glow shadows, gradient meshes behind hero imagery, slow fade-in / parallax on scroll, smooth hover lifts.
- **Imagery**: AI-generated tasteful portrait imagery — stylized, suggestive but not explicit; cinematic lighting, editorial poses, fully clothed. Generated with `imagegen` (premium for hero, fast for gallery).

## Pages & routes

```
src/routes/
  __root.tsx          fonts, age-gate modal, grain overlay, shared meta
  index.tsx           landing
  companions.tsx      gallery (20+ personas, filters)
  companions.$id.tsx  companion detail
  chat.tsx            chat UI mockup
  pricing.tsx         tiered plans
  login.tsx           sign-in (UI only)
  signup.tsx          sign-up (UI only)
```

### 1. Age-gate (18+)

Full-screen modal on first visit, blurred backdrop, "Enter" / "Leave" choice, persisted in `localStorage`. Cinematic copy, gold-bordered card.

### 2. Landing (`/`)

- Sticky transparent nav (logo, Companions, Pricing, Login, "Enter" CTA)
- **Hero**: full-bleed cinematic portrait, oversized serif headline ("She's waiting."), subhead, dual CTAs, scroll cue
- **Marquee** of companion names/tags scrolling slowly
- **Featured companions** — 3-up editorial cards with hover reveal
- **How it works** — 3 steps with iconography
- **Capabilities grid** — chat, voice, image generation, memory, roleplay
- **Testimonial slab** — large pull-quote, blurred avatar
- **Pricing teaser** → link to /pricing
- **FAQ** accordion
- Footer with disclaimers, 18+ badge, fake legal links

### 3. Companions gallery (`/companions`)

- Header with search + filter chips: Style (Realistic / Anime / Artistic), Personality (Flirty / Caring / Dominant / Playful / Mysterious), Body type, Ethnicity, Age range
- 24 hand-crafted personas (name, tagline, tags, image, "online" status)
- Responsive masonry/grid, hover lifts a soft caption
- Click → detail route

### 4. Companion detail (`/companions/:id`)

Full-bleed portrait left, bio/personality/interests right, sample dialogue snippets, "Start chat" CTA → `/chat?id=...`

### 5. Chat mockup (`/chat`)

- Left rail: companion list with online dots
- Center: message thread (pre-seeded conversation), typing indicator animation, gold-trimmed input bar with mic / image / gift icons
- Right rail: companion profile card, mood, memory pills
- Input is functional (echoes locally, fake "typing…" then canned reply) — purely client-side, no API

### 6. Pricing (`/pricing`)

3 tiers — Whisper (Free), Intimate ($/mo), Devotion ($/mo annual). Featured middle card with gold border + glow. Feature comparison table below. Mock "Subscribe" buttons → `/signup`.

### 7. Auth (`/login`, `/signup`)

Split-screen: cinematic image left, minimalist form right. Email + password inputs, social buttons (Google/Apple — visual only), legal microcopy. No real auth — submit just navigates to `/companions`.

## Technical notes

- TanStack Start file-based routes; each route sets its own `head()` (title, description, og).
- Shared `<SiteHeader />` and `<SiteFooter />` components in `src/components/site/`.
- Companion data in `src/data/companions.ts` (typed array of 24).
- All colors via semantic tokens in `src/styles.css` — no hex in components.
- Reusable primitives: `<GrainOverlay />`, `<GoldDivider />`, `<CinematicCard />`, `<AgeGate />`.
- Animations via Tailwind keyframes already in the template + `tw-animate-css`.
- Imagery: ~6 hero/featured images via `imagegen` premium; 24 companion portraits via `imagegen` fast — all tasteful, fully clothed editorial portraits stored in `src/assets/companions/`.
- SEO: each route has unique title/description; landing uses hero image as og:image.

## Out of scope (frontend-only)

No real authentication, no database, no payment processing, no actual AI chat — every interaction is a mock. If you later want real chat or login, that's a separate build with Lovable Cloud + Lovable AI.
