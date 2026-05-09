# Phase 3: Client Dashboard — Architectural Blueprint [COMPLETED]

This document defines the features and user flows for the **AI Dreamscape** client-side ecosystem, focusing on personalization, account management, and asset tracking.

## 1. Profile Transformation [FULL SCOPE]
Transitioning from a static profile page to a dynamic, social-ready profile system.

- **URL Pattern**: `/@username` (Handle-based).
- **Redirection**: All traffic to `/profile` will automatically redirect to the authenticated user's `/@username`.
- **Bio Section**: A 160-character personal bio field added to the header.
- **Verification**: VIP and Admin users receive a custom **Neon Checkmark** badge next to their handle.
- **Public View**: Shows user's public collection, joined date, avatar, and bio.
- **Private View**: Adds "Edit Profile", "Settings", and detailed token/subscription info.
- **Handle Governance**:
  - Handle changes limited to **once every 30 days**.
  - Handles are automatically sanitized (lowercase, underscores only).

## 2. Account Settings (The Control Center)
A unified interface for managing the user's presence on the platform.

- **Tabs**:
  - **Account**: Update display name, handle (with availability check), and bio.
  - **Security**: Password management (Supabase Auth) and active session management.
  - **Preferences**: Theme selection and notification toggles.
- **Privacy**: Global toggle for "Default Public" (Off by default).

## 3. Membership Hub & Tokens
A high-fidelity dashboard for managing the financial and tier-based aspects of the account.

- **Current Status**: Large neon card showing current tier (Free, Pro, VIP).
- **Token Pulse**: A live-updating token counter with a "Quick Refill" button.
- **Usage Stats**: Simple bar charts showing token consumption over time.
- **Billing History**: Placeholder UI linking to the existing token pricing and future Stripe portal.

## 4. My Collection
The central library for user-generated and favorited assets.

- **Privacy Model**: All generations are **Private by Default** (`is_public: false`). Admins have elevated visibility for platform oversight.
- **Grid System**: Masonry grid optimized for **Portrait Only** previews.
- **Filters**:
  - **Content**: NSFW / SFW toggle.
  - **Source**: Filter by specific Companion (Dropdown).
- **Slide-over Panel**: Instead of lightboxes, clicking an image slides over a metadata panel showing prompt, seed, and companion info.

## 5. Technical Implementation Steps

1.  **Database Migration**: Add `last_handle_change` (timestamp), `bio` (text), and `is_public` (boolean) columns.
2.  **Dynamic Routing**: Configure TanStack Router to handle the `@` handle parameter.
3.  **Handle Validation**: Implement real-time availability checks and 30-day cooldown logic.
4.  **Collection Infrastructure**: Set up private Supabase Storage buckets and RLS policies for asset privacy.
5.  **UI Assembly**: Build the multi-tab Settings and the Masonry Gallery components.
