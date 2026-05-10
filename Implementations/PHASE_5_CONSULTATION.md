# 📝 Phase 5 Consultation: Suggestions & Questions

This document contains specific suggestions and architectural questions based on the site scan. Please answer/confirm the items below by editing this file or replying in chat.

## 🛠️ Stack & Dependencies
- [ ] **Dependency: Framer Motion**  
  *Observation*: `framer-motion` is missing from `package.json`.  
  *Action*: Confirm I should install `framer-motion` at the start of Phase 5.
  - **User Feedback**: Yes, install framer motion at the start of phase 5. 

- [ ] **SEO: TanStack Router native Meta vs React Helmet**  
  *Suggestion*: Use TanStack Router's built-in `Meta` system instead of `react-helmet-async` for better integration with the framework's SSR/Hydration.
  - **User Feedback**: Yes, use tanstack router's native meta system. 

- [ ] **PWA: vite-plugin-pwa**  
  *Suggestion*: Install `vite-plugin-pwa` to automate manifest generation and service worker handling for a true "Native App" feel.
  - **User Feedback**: Yes, use vite-plugin-pwa.

---

## 🛰️ Infrastructure & Monitoring
- [ ] **Sentry: Node vs Cloudflare**  
  *Clarification*: Currently, the server uses `@sentry/node`. However, your app is hosted on **Cloudflare Workers**. Using the Node version on Cloudflare can lead to "missing" errors or incorrect data. Switching to `@sentry/cloudflare` ensures Sentry understands the Cloudflare environment perfectly.
  - **User Feedback**: Yes lets do this.

- [ ] **OG Generation: Cloudflare vs Supabase Edge**  
  *Clarification*: We need a "mini-server" to generate preview images for social media (showing companion names/faces). We can host this on **Cloudflare** (where your site is) or **Supabase** (where your data is). Keeping it on Cloudflare is "cleaner" as it consolidates your hosting, but Supabase is also a valid choice.
  - **User Feedback**: Cloudflare.

---

## 🛡️ Security & Performance
- [ ] **Security: Prompt Injection Guard**  
  *Suggestion*: Implement a server-side interceptor to scan LLM responses for "system prompt leakage" before they reach the client.
  - **User Feedback**: Yes

- [ ] **Performance: Kill Switch**  
  *Question*: Should we add a "Kill Switch" in the Settings/Admin panel to disable heavy animations/glassmorphism for users on low-end devices?
  - **User Feedback**: No

---

## 🔊 Audio Haptics
- [ ] **Implementation: oscillators vs Samples**  
  *Suggestion*: Use the Web Audio API to generate sounds programmatically (oscillators) for zero-latency and smaller bundle size, rather than loading `.mp3` samples.
  - **User Feedback**: Yes, use oscillators. 

---

## 🖼️ Media & Assets
- [ ] **Image Optimization: Cloudflare Images / R2**  
  *Suggestion*: As the gallery grows, we should implement a dynamic resizing strategy (e.g., using Cloudflare's image resizing) to ensure the 4K/8K "Lux" images don't slow down the mobile experience.
  - **User Feedback**: Yes lets do that. 8k images will hopefully be used. Very high quality images is the plan at least.

- [ ] **8K Strategy: Progressive "Luxury" Loading**  
  *Suggestion*: To prevent 8K images from causing lag, we should use **LQIP (Low-Quality Image Placeholders)** and **AVIF conversion**. The user sees a blurred preview instantly, while the 8K "Master" loads seamlessly in the background.
  - **User Feedback**: Excellent plan. lets do that. 

---
**Status**: Awaiting Final User Feedback for Phase 5 Execution.
