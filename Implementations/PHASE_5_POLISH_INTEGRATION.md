# 🚀 Phase 5: The "Luxury & Security" Master Blueprint

## 🎯 Architectural Philosophy: "The Luxury Digital Drug"
The objective of Phase 5 is to transition AI Dreamscape from a functional utility to an addictive, premium experience. Future agents must prioritize **aesthetic arousal** and **technical perfection** over simple functionality. Every interaction should feel like a reward.

---

## 📦 Required Stack & Dependencies
A new agent must ensure these are available before starting:
- **Animations**: `framer-motion` (Mandatory for Silky Motion).
- **Icons**: `lucide-react` (standardized to 1.5px stroke width).
- **SEO**: TanStack Router's built-in `Meta` manager (No external helmet libraries).
- **PWA**: `vite-plugin-pwa` (for Service Worker & Manifest).
- **OG Generation**: Cloudflare Workers + `satori` (Consolidated with hosting).
- **Audio**: Native `Web Audio API` (Oscillator-based haptics).

---

## 🛠️ Pillar 1: The "Desire" Aesthetic (UI/UX Polish) [COMPLETED]
To evoke desire and addiction, the UI must feel expensive, fluid, and high-contrast.

### 1.1 Global Design Tokens
- **Midnight Canvas**: Backgrounds must use deep gradients (e.g., `linear-gradient(180deg, #0A0A0B 0%, #000000 100%)`).
- **Neon Pulse**: All neon accents must use `#FF1B6B` (Dreamscape Pink). Hover states must increase glow using `drop-shadow(0 0 8px rgba(255, 27, 107, 0.6))`.
- **Glassmorphism 2.0**: Sidebar and cards must use: `bg-white/[0.03] backdrop-blur-2xl border-white/[0.08]`.

### 1.2 Silky Motion (Framer Motion)
- **Spring Physics**: All route transitions and modal entries must use spring physics: `type: "spring", stiffness: 120, damping: 20, mass: 1`. 
- **Gallery Shared Elements**: When clicking an image in `MasonryGallery`, the image should "expand" into the `AssetDetailPanel` using Framer Motion's `layoutId`.
- **Success Shimmers**: When a user clicks "Refill" or "Upgrade," a subtle light-sweep animation must pass across the UI component to signify a premium transaction.

---

## 🛠️ Pillar 2: The Dopamine Engine (Audio & Interaction) [COMPLETED]
Engagement is driven by sensory rewards.

### 2.1 Haptic Audio System
- **Implementation**: Use the `Web Audio API`. **Critical**: The `AudioContext` must be resumed during the first user click to satisfy browser security policies.
- **Reward Sounds**: 
    - **Token Refill**: A glassy, ascending "ping" (Frequency: 400Hz -> 800Hz).
    - **Tier Upgrade**: A deep, resonant "power-up" hum (Frequency: 100Hz -> 300Hz).
    - **Button Click**: A muffled, high-end "thud" (Frequency: 200Hz, duration: 0.05s).

### 2.2 PWA Native Experience
- **Automation**: Use `vite-plugin-pwa` to manage the Service Worker and manifest generation.
- **Manifest**: Use `public/icon-512.png` (Neon 'D' Outline) for all splash screens and icons.
- **Native Lock-down**: 
    - CSS: `html, body { overscroll-behavior: none; touch-action: pan-x pan-y; }`
    - Meta: `<meta name="apple-mobile-web-app-capable" content="yes">`.

---

## 🛠️ Pillar 3: The Sentry "Safe-Mode" & Tracing [COMPLETED]
Zero-downtime monitoring and error-free UX.

### 3.1 Sentry Configuration
- **Environment**: Use `@sentry/cloudflare` for the server-side to ensure compatibility with Cloudflare Workers.
- **Safe Mode**: Initialization logic must check `VITE_SENTRY_DSN`. If missing, it must `console.info("Sentry Dev Mode Active")` without crashing the app.
- **User Identity Sync**: Crucial: The app must call `Sentry.setUser({ id: user.id })` upon Supabase auth confirmation to link errors to specific user accounts.
- **Diagnostic Panel**: Add a hidden "Diagnostic" button in the Admin panel to manually trigger a `Sentry.captureException()` for testing.

---

## 🛠️ Pillar 4: The "Fortress" Security Protocol [IN PROGRESS]
Proving the platform is unbreakable.

### 4.1 Security Audit Tasks
1. **RLS Penetration Test**: Attempt to fetch rows from `companions`, `user_assets`, or `profiles` using a foreign `user_id` from the browser console.
2. **Prompt Injection Defense**: 
    - Audit the `chat.tsx` interface for client-side leaks.
    - **Prompt Injection Guard**: Implement a server-side interceptor that scans LLM responses for "system prompt leakage" or restricted keywords before they reach the client.
3. **API Rate Limiting**: Implement/Verify rate limiting on the `/refill` and `/generate` endpoints to prevent "Token Exhaustion" attacks by bots.
4. **Audit Artifact**: All results must be documented in a new `SECURITY_AUDIT.md` file.

---

## 🛠️ Pillar 5: The Growth Engine (Dynamic OG)
Professional-grade social sharing to drive conversion.

### 5.1 Open Graph (OG) Integration
- **Worker Logic**: Use a **Cloudflare Worker** as a metadata proxy. Use `satori` for SVG-to-PNG conversion of the companion preview card.
- **Dynamic Cards**: Preview images must show the Companion's Name, Avatar, and a "Dreamscape Premium" watermark.
- **SEO Component**: Use TanStack Router's built-in `Meta` system to update `<title>` and `<meta>` tags dynamically.

---

## 🛠️ Pillar 6: The "Ultra-Lux" Media Engine [COMPLETED]
Handling high-fidelity 8K assets without performance degradation.

### 6.1 Progressive 8K Loading
- **Image Strategy**: Use Cloudflare Images/R2 for dynamic resizing.
- **LQIP (Low-Quality Image Placeholders)**: Serve a 10KB blurred version instantly to ensure the UI feels reactive.
- **AVIF Conversion**: Always prefer AVIF for 8K master files to reduce bandwidth while maintaining "Luxury" fidelity.
- **Lazy Upgrade**: Only load the full 8K master when the user initiates "Full Screen" or "Download Original" modes.

---

## ✅ Final Verification Checklist for Agents
- [ ] **PWA**: Does it feel like a native app on iOS (no browser bars)?
- [ ] **Aesthetic**: Does the neon glow feel "expensive" rather than "cheap"?
- [ ] **Security**: Is the `admin/` directory 100% inaccessible to non-admins?
- [ ] **Performance**: Is the route transition 60fps?

---

## 💬 Decision Log
- **App Icon**: Option 1 (Neon D) saved to `/public/icon-512.png`.
- **Audio**: Haptic only.
- **Sentry**: DSN verified in `.env`.

---
**STATUS: PHASE 5 PARTIALLY COMPLETED - AUDIT REMAINING**
