# AI Dreamscape: Comprehensive Menu & Feature Testing Suite

This document provides a methodical, step-by-step verification plan for every interactive element and navigation path within the AI Dreamscape platform.

## 🏁 Test Execution Protocol
- **Browser:** Test on both Chrome (Desktop) and Safari/Chrome (Mobile).
- **State:** Perform tests in both **Guest** and **Authenticated (User & Admin)** states.
- **Verification:** Mark each item as `[x]` only after verifying visual feedback, correct routing, and expected functional outcome.

---

## 1. 🌐 Public / Landing Sector (`/`)
Verify the "First Impression" and conversion funnels.

- [ ] **Navigation Bar (Global)**
    - [ ] `AI Dreamscape` Logo (Redirects to `/`)
    - [ ] `Home` Link
    - [ ] `Companions` Link
    - [ ] `Pricing` Link
    - [ ] `Login` Button
    - [ ] `Get Started` / `Sign Up` Button
- [ ] **Hero Section**
    - [ ] `Explore Gallery` Button (Redirects to `/companions`)
    - [ ] `Start Chatting` Button (Redirects to `/chat` - check auth redirect)
- [ ] **Featured Companions**
    - [ ] Individual Companion Cards (Click to navigate to `/companions/$id`)
    - [ ] "View All" Button
- [ ] **Value Propositions**
    - [ ] Interactive Hover Effects on Feature Cards
- [ ] **Footer**
    - [ ] Secondary Navigation Links
    - [ ] Social Media Icons (External Links)
    - [ ] Terms of Service / Privacy Policy

---

## 2. 👥 Companion Gallery (`/companions`)
Verify filtering, search, and catalog navigation.

- [ ] **Search & Discovery**
    - [ ] Search Bar Input (Typing filters list in real-time)
    - [ ] Search Bar "Clear" Action
- [ ] **Filtering System**
    - [ ] Personality/Trait Filter Toggles
    - [ ] Category Dropdowns
    - [ ] "Reset Filters" Button
- [ ] **Companion Cards**
    - [ ] Hover Animation (Neon border/glow)
    - [ ] "Quick Connect" Action (Direct to chat)
    - [ ] "View Profile" Action (Direct to details)

---

## 3. 💎 Companion Profile Details (`/companions/$id`)
Verify the high-fidelity immersive experience.

- [ ] **Image Gallery**
    - [ ] Thumbnail Click (Changes main image)
    - [ ] Full-screen Lightbox (Open/Close/Navigate)
- [ ] **Affinity System**
    - [ ] Progress Bar Visualization
    - [ ] "Like/Favorite" Toggle
- [ ] **Interaction Points**
    - [ ] "Begin Conversation" Button
    - [ ] Suggested "Openers" (Clicking populates chat input)
- [ ] **Information Tabs**
    - [ ] "About" Section
    - [ ] "Traits" Section
    - [ ] "Lore" / "Backstory" Section

---

## 4. 💬 Neural Chat Interface (`/chat`)
Verify the core real-time interaction engine.

- [ ] **Sidebar Management**
    - [ ] "New Chat" Button
    - [ ] Recent Conversation List (Navigate between bots)
    - [ ] Search Conversations
- [ ] **Messaging Flow**
    - [ ] Message Input Area (Auto-growing textarea)
    - [ ] "Send" Button (Active/Inactive states)
    - [ ] Typing Indicator (Verify animation when bot responds)
    - [ ] Message Bubbles (Verify user vs. bot styling)
- [ ] **Utility Rail (Right Side)**
    - [ ] Profile Preview Toggle
    - [ ] Quick Action: "View Profile"
    - [ ] Chat Settings (Text-to-speech, etc.)

---

## 5. 💳 Membership & Pricing (`/pricing`)
Verify the commerce and subscription flow.

- [ ] **Billing Cycle Toggle**
    - [ ] Monthly / Yearly Switch (Prices update dynamically)
- [ ] **Plan Cards**
    - [ ] "Select Plan" Buttons
    - [ ] Stripe Checkout Redirect (Verify secure handoff)
- [ ] **Sale UI**
    - [ ] Strikethrough pricing verification
    - [ ] Sale Badge visibility

---

## 6. ⚙️ User Command Center (`/settings` & `/profile`)
Verify account management and customization.

- [ ] **Profile Display**
    - [ ] Avatar Display (Correct resolution/path)
    - [ ] Bio/Username display
- [ ] **Settings Tabs**
    - [ ] **Account Tab:** Username change, Bio update, Avatar upload
    - [ ] **Security Tab:** Password reset, Session management
    - [ ] **Notifications Tab:** Toggle switches for email/push
- [ ] **Logout Flow**
    - [ ] Logout Button (Confirm prompt -> Redirect to home)

---

## 7. 🛡️ Admin Sovereign Suite (`/admin`)
Verify high-privilege system controls (Requires Admin Role).

- [ ] **System Overview (Dashboard)**
    - [ ] Real-time Telemetry Charts
    - [ ] Sentry Error Log Snippets
    - [ ] System Health Indicators
- [ ] **User Management (`/admin/users`)**
    - [ ] "Export CSV" Functionality
    - [ ] Global User Search
    - [ ] **"Manage User" Modal:**
        - [ ] Ban/Unban Trigger
        - [ ] Admin Role Toggle
        - [ ] Internal Admin Notes (Blur-to-save)
        - [ ] Token Adjustment Input & Execute
        - [ ] Audit Log View
- [ ] **Gallery Moderator (`/admin/gallery`)**
    - [ ] Grid / List View Toggles
    - [ ] Visibility Filter (Public/Private)
    - [ ] **Image Actions:**
        - [ ] Toggle Privacy Button
        - [ ] "Expunge Fragment" (Delete) Button
        - [ ] Full Detail Modal View
- [ ] **Commerce Control (`/admin/pricing`)**
    - [ ] Global Sale Percentage Update
    - [ ] Maintenance Mode Toggle
    - [ ] Global Announcement Textarea & Update
    - [ ] **Pricing Tier Editor:**
        - [ ] Create New Tier
        - [ ] Edit Existing Tier (Prices, Tokens, Features)
        - [ ] Delete Tier

---

## 8. 🛠️ Global Utilities & Easter Eggs
Verify cross-cutting features and UI polish.

- [ ] **Boss Key (Quick Exit)**
    - [ ] Verify `Esc` or specific shortcut hides UI / Redirects to work-friendly page
- [ ] **Responsive Navigation**
    - [ ] Mobile Hamburger Menu (Open/Close)
    - [ ] Bottom Navigation Bar (Mobile only)
- [ ] **Toast Notifications**
    - [ ] Success/Error messages (Sonner)
- [ ] **Rate Limiting**
    - [ ] Verify 429 UI when spamming inputs (if applicable)

---

**Generated by Antigravity AI**
*Current Version: 1.0.0 (Launch/Scale Phase)*
