# Phase 2: Core Layout & Design System — Architectural Blueprint

This document outlines the structural and aesthetic design for the **AI Dreamscape** layout refactor. The goal is to move from a basic website feel to a high-end, immersive "App" experience.

## 1. The Dual-Sidebar Architecture (Desktop)

We are implementing a two-tier navigation system on the left side of the screen.

### Tier 1: The Navigation Rail (Persistent)
- **Width**: 72px
- **Role**: High-frequency, immediate actions.
- **Components**:
  - **Top**: Home, Discover, Chat, Buy Tokens.
  - **Bottom**: User Profile Avatar (Dropdown trigger).
- **Aesthetic**: 
  - `backdrop-blur-3xl` glassmorphism.
  - `#FF1B6B` vertical neon bar indicator for the active route.
  - Subtle neon glow on the left edge.

### Tier 2: The Navigation Sidebar (Collapsible)
- **Width**: 240px
- **Role**: Detailed navigation, secondary tools, and admin functions.
- **Toggled By**: A menu/chevron icon at the top of the Rail.
- **Sections**:
  - **Main**: Dashboard, Discover, Chat.
  - **Creative**: My Collection, Generate Image.
  - **Account**: Token Management, Settings, Log Out.
  - **Admin**: Revenue Stats, User Management, Pricing CRUD (Visible only to admins).
- **Aesthetic**:
  - Frosted glass effect (`backdrop-blur-xl`).
  - Smooth slide-in/out transition from behind the Rail.

---

## 2. The Mobile Navigation (Bottom Bar)

To ensure an "App-like" feel on mobile, the navigation shifts to the bottom of the screen.

- **Persistent Icons**: Home, Discover, Chat, Tokens.
- **More Menu**: A "hamburger" or "more" icon that opens a full-screen drawer containing the extended sidebar navigation.
- **Aesthetic**: Glassmorphic bar with safe-area-inset padding for iOS/Android.

---

## 3. Premium Design Tokens & Polish

### Ambient Background
- **Deep Space Glow**: A subtle, animated background gradient behind all panels.
- **Colors**: Very dark (`#020202`) with slowly pulsing nodes of `#FF1B6B` and `#A855F7`.

### Interactive Elements
- **Glass Cards**: Refined `bg-white/5` with `border-white/10` and `backdrop-blur-xl`.
- **Neon Hover**: Hovering over interactive elements (cards, buttons) triggers a faint outer glow matching the primary neon color.

### Notification System (Sonner)
- **Position**: Top-Left (as requested).
- **Style**: Glassmorphic panels with a 2px neon left-border.

---

## 4. Implementation Path (No Code Yet)

1.  **Layout Foundation**: Create `AppLayout.tsx` as the main wrapper.
2.  **Navigation Components**: Build `NavRail.tsx` and `NavSidebar.tsx`.
3.  **Route Integration**: Update `__root.tsx` to utilize the new layout.
4.  **Polish Pass**: Apply the ambient background and fine-tune glassmorphism levels.
