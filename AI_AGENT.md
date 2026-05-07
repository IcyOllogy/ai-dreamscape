# AI Agent Guidelines: Project Dreamscape

This document serves as the "Source of Truth" for any AI Agent working on this codebase. It outlines the vision, design rules, and technical constraints of the AI Dreamscape platform.

## 1. Project Vision
Move away from traditional "cinematic/luxury" (Noctis) branding towards a **Modern, High-Engagement AI App (Dreamscape)**.
- **Vibe**: Seductive, Neon, Immersive, Premium.
- **Target Audience**: Younger, app-savvy users looking for realistic and arousing companionship.

## 2. Design System (Seductive Neon)
Stick to these tokens strictly. Do not use ad-hoc colors.

### Colors & Backgrounds
- **Pure Obsidian**: `#020202` (Global background).
- **Primary (Neon Magenta)**: `#FF1B6B`.
- **Secondary (Neon Purple)**: `#A855F7`.
- **Surface**: Use `bg-white/5` or `bg-card/50` with `backdrop-blur-2xl`.

### Typography
- **Primary Font**: `Outfit` (Bold for headers, Medium for body).
- **Secondary Font**: `Inter` (For UI elements/labels).
- **Header Style**: Black/ExtraBold, tracking-tighter, leading-tight.

### Custom UI Classes (Must exist in styles.css)
- `.neon-text`: Text with a soft magenta glow.
- `.neon-button`: Rounded-full button with magenta-to-purple gradient and glow.
- `.glass-panel`: `bg-white/5` with heavy blur and subtle border.
- `.glass-card`: Slightly higher opacity than panel, used for interactive items.

## 3. Product Rules
- **No "Noctis" Branding**: If you see "Noctis", change it to "Dreamscape".
- **Younger Roster**: All companions must be aged 20–24.
- **Modern Archetypes**: Focus on "E-girl", "Teasing Student", "Alt-girl", etc.
- **Asset Standards**: 
    - Portraits must use `aspect-[2/3]`.
    - Always use realistic image styles (AI-generated realism).
- **Navigation**:
    - **Desktop**: Persistent Sidebar (`256px` wide on large screens).
    - **Mobile**: Sticky Bottom Bar (`64px` high).
    - **No Double Headers**: Remove `SiteHeader` from individual pages; let the root layout handle navigation.

## 4. Technical Stack
- **Framework**: TanStack Start (React 19).
- **Styling**: Tailwind CSS 4.
- **Routing**: File-based (TanStack Router).
- **State**: TanStack Query & React State (Local-first).

## 5. Agent Instructions
1. **Always verify `src/styles.css`**: If it's empty, the site will look broken. Ensure the neon/glass classes are defined.
2. **Scan for Syntax Errors**: The file-based router is sensitive. Always check for unclosed components or duplicate definitions (especially in `src/routes/companions.tsx`).
3. **Immersive Focus**: Every page should feel like an "app", not a website. Use full-screen layouts, sticky elements, and smooth transitions.
