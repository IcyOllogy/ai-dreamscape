# Implementation Plan: Backend Integration & Dashboards

This plan outlines the steps to integrate Supabase as a full backend and implement comprehensive Client and Admin dashboards for the **AI Dreamscape** platform.

## User Review Required

> [!IMPORTANT]
> **Supabase Project Creation**: You will need to create a new Supabase project and provide the `SUPABASE_URL` and `SUPABASE_ANON_KEY`.
> **Google OAuth**: To enable Google login, you will need to configure the Google Cloud Console and add the credentials to Supabase.
> **Master Admin**: We will designate your primary email as the Master Admin in the initial migration. Please confirm which email to use.

## Proposed Changes

### 1. Database Schema (Supabase)
We will implement a robust relational schema with Row Level Security (RLS) to ensure data privacy and role-based access.

#### [NEW] `profiles` Table
Extends the internal `auth.users` table.
- `id`: uuid (PK, references auth.users)
- `username`: text (unique, for @slugs)
- `display_name`: text
- `avatar_url`: text
- `role`: enum ('free', 'bronze', 'silver', 'gold', 'admin')
- `tokens_balance`: int (default 0)
- `is_banned`: boolean (default false)
- `created_at`: timestamp

#### [NEW] `pricing_plans` Table
- `id`: uuid (PK)
- `name`: text (e.g., 'Silver Tier')
- `price`: decimal
- `tokens_included`: int (monthly replenishment)
- `features`: jsonb (list of benefits)
- `is_featured`: boolean
- `discount_label`: text (e.g., '20% OFF')

#### [NEW] `token_transactions` Table (Ledger)
- `id`: uuid (PK)
- `user_id`: uuid (FK)
- `amount`: int (positive for purchase/replenish, negative for spend)
- `type`: enum ('purchase', 'replenishment', 'generation', 'refund')
- `description`: text

#### [NEW] `login_history` & `sessions` Tables
- `login_history`: Tracks `user_id`, `ip_address`, `user_agent`.
- `sessions`: Tracks active engagement time and duration.

#### [NEW] `admin_audit_logs` Table
- `id`: uuid (PK)
- `admin_id`: uuid (FK)
- `action`: text (e.g., 'BAN_USER', 'UPDATE_PRICING')
- `target_id`: text (ID of the affected entity)
- `metadata`: jsonb

---

### 2. Authentication & Authorization
- **Providers**: Email/Password + Google OAuth (via Supabase Auth).
- **Middleware**: Implement route guards using TanStack Router to protect `/admin/*` and `/client/*` paths based on the user's role.
- **Slugs**: Use a dynamic route `/@$username` for profile views.

---

### 3. UI/UX: The Dreamscape Design System
We will formalize the current aesthetics into a central design guide and implement components using **Shadcn/UI**.

- **The Sidebar**: A persistent, glassmorphic sidebar for "App-like" navigation.
- **Toasts**: Top-left corner notifications using `Sonner`.
- **Glassmorphism**: Consistent use of `backdrop-blur-xl` and `bg-white/5` with `border-white/10`.
- **Neon Accents**: Using `#FF1B6B` (Primary) for interactive elements and glows.

---

### 4. Routing Structure (TanStack Router)

#### Client Dashboard (`/dashboard`)
- **Overview**: Token balance, current tier, quick-start chat.
- **My Chats**: List of active companion threads.
- **Gallery**: Collection of user-generated images.
- **Membership Hub**: View benefits, upgrade tiers (simulated Stripe flow).
- **Privacy & Security**: Manage account data and "Boss Key" settings.

#### Admin Dashboard (`/admin`)
- **Stats**: Revenue metrics (simulated), DAU, popular companions.
- **User Management**: Search, Ban/Unban, Role editing.
- **Pricing Manager**: CRUD for membership packages.
- **Audit Logs**: Feed of administrative actions.

---

### 5. Verification Plan

#### Automated Tests
- **Auth Flow**: Test signup, login (Email/Google), and logout.
- **Role Guards**: Verify that a 'free' user cannot access `/admin`.
- **Token Ledger**: Verify that "purchasing" tokens correctly updates the balance and ledger.

#### Manual Verification
- Visual audit of the Sidebar on mobile and desktop.
- Verification of @username slug navigation.
- Testing the "Boss Key" integration with the new layout.

---

## Implementation Steps

### Phase 1: Supabase & Auth [COMPLETED]
- [x] Initialize Supabase client and env variables.
- [x] Create database migrations and RLS policies.
- [x] Implement Login/Signup pages with redirection logic.

### Phase 1.5: User Profiles & Navigation UX
- Create the Profile page (`/profile`) for all users.
- Replace "Dashboard" button with a Profile dropdown (Avatar + Placeholder).
- Dropdown options: **Profile** and **Log Out**.
- Integrate profile picture (avatar_url) into the navbar.

### Phase 2: Core Layout & Design System
- Build the `AppSidebar` and `DashboardLayout`.
- Configure top-left toasts.
- Refactor existing routes to use the new layout.

### Phase 3: Client Dashboard
- Implement Profile (`/@username`) and Settings pages.
- Build the "Membership Hub" and "Privacy & Security" sections.
- Create the Image Collection and infrastructure for future generation.

### Phase 4: Admin Dashboard
- Implement the Admin metrics view (Revenue/DAU).
- Build the User Management table with search/filter.
- Create the Pricing CRUD interface.

### Phase 5: Polish & Integration
- Final branding pass for all new elements.
- Sentry integration for backend errors.
- Final walkthrough and documentation.
