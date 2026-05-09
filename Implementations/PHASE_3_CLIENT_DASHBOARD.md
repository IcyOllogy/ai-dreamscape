# Phase 3: Client Dashboard — Architectural Blueprint

This document defines the features and user flows for the **AI Dreamscape** client-side ecosystem, focusing on personalization, account management, and asset tracking.

## 1. Profile Transformation
Transitioning from a static profile page to a dynamic, social-ready profile system.

- **URL Pattern**: `/@username` (Handle-based).
- **Public View**: Shows user's public collection, joined date, and avatar.
- **Private View**: Adds "Edit Profile", "Settings", and detailed token/subscription info.
- **Features**: 
  - Dynamic handle validation.
  - Social links integration.

## 2. Account Settings (The Control Center)
A unified interface for managing the user's presence on the platform.

- **Tabs**:
  - **Account**: General info, handle change, avatar upload.
  - **Security**: Password management, active sessions, 2FA setup.
  - **Preferences**: Theme selection (Deep Space/Dark/Light), notification toggles.
- **Privacy**: Control over who can see the user's collection or online status.

## 3. Membership Hub & Tokens
A high-fidelity dashboard for managing the financial and tier-based aspects of the account.

- **Current Status**: Large neon card showing current tier (Free, Pro, VIP).
- **Token Pulse**: A live-updating token counter with a "Quick Refill" button.
- **Usage Stats**: Simple bar charts showing token consumption over time.
- **Billing History**: Access to Stripe billing portal and invoice history.

## 4. My Collection
The central library for user-generated and favorited assets.

- **Grid System**: Responsive masonry grid for high-fidelity image previews.
- **Metadata Panels**: View prompt details, generation settings, and seed info for each image.
- **Actions**: Download, Share, Re-generate (links back to creative tools).

## 5. Technical Implementation Steps

1.  **Dynamic Routing**: Set up handle-based parameters in TanStack Router.
2.  **Settings Interface**: Build the multi-tab layout with glassmorphic cards.
3.  **Membership Logic**: Connect Supabase profile fields (role, tokens) to the Hub UI.
4.  **Collection Gallery**: Implement the masonry grid and lazy-loading for images.
5.  **Storage Integration**: Configure Supabase Storage buckets for `user_collections`.
