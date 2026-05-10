# Phase 4: Admin Dashboard — Architectural Blueprint [COMPLETED]

This document outlines the administrative interface for **AI Dreamscape**, providing tools for platform oversight, user management, revenue optimization, and content moderation.

## 1. Platform Metrics Dashboard (Pulse)
A high-performance overview of the platform's health and growth.

- **KPI Cards (Live Polling - 30s)**:
  - **Revenue**: Total earnings (Today/This Week/Total).
  - **Active Sessions**: Real-time count of users active in the last 15 minutes (Heartbeat logic).
  - **Token Velocity**: 24-hour token consumption and refill "Burn Rate."
  - **DAU & Churn**: Real-time Daily Active Users and "Churn Rate" (users inactive for 30+ days).
- **Growth & Audience Analytics**:
  - **Real Analytics**: Line chart showing signup trends for the last 30 days (Daily/Weekly/Monthly toggles).
  - **Peak Activity**: Hourly heatmap showing when users are most active globally.
  - **Country Tracking**: Geographic breakdown of the user base by sign-up location.
- **Live Audit Feed**: A stream of recent admin actions (Bans, Price Changes) visible on the main index.

## 2. User Management & Moderation
The central hub for moderating and supporting the user base.

- **User Table**:
  - **Columns**: Handle, Email, Role, Joined Date, Tokens, Status, Country.
  - **Search/Filter**: Search by handle/email, filter by role or status.
  - **Admin Notes**: Private notes field on each user profile, visible only to administrators.
- **Actions**:
  - **Security**: One-click **Ban/Unban** (Triggers immediate session termination via `useAuth`).
  - **Token Management**: Manual adjustments with mandatory audit logs and a **Force Refill** fail-safe.
  - **Transaction History**: Modal view showing a user's full generation/spend history for support auditing.
  - **Data Portability**: Full **CSV Export** including handles and user emails.

## 3. Gallery & Content Moderation
Ensuring site-wide content quality and user privacy.

- **Privacy Model**: All user galleries are **Private** by default (Locked to owner).
- **Admin Gallery Access**: 
  - **Individual View**: View any specific user's full gallery for support.
  - **Site-wide Feed**: A master feed of all generations for moderation.
  - **Filters**: Sort by A-Z, Companion Name, User, or Creation Date.
  - **Moderation Actions**: "Hide from Discover" toggle for inappropriate content.

## 4. Dynamic Pricing & Sale Manager
A commerce engine to manage the platform's economy.

- **Tier Management**: Support for **Monthly** and **Yearly** billing for every tier.
- **Token Refills**: Monthly refills **ADD** to existing balances (No resets/tokens roll over).
- **Global Sale Master Mode**:
  - **Percentage Discount**: A global % multiplier applied to all base prices.
  - **Master Mode**: When active, global percentage overrides individual `sale_price` values.
  - **Announcement Banner**: Real-time reactive banner with customizable text.

## 5. Platform Health & Security
- **Admin Audit Logs**: Full history of changes (Old Value vs. New Value) for price changes, bans, and edits.
- **Maintenance Mode**:
  - **Global Kill-switch**: Redirects all users to a maintenance screen.
  - **Admin Whitelist**: Admins bypass the screen to allow testing/fixes.
- **Privacy Sweep**: Strict RLS enforcement ensuring zero unauthorized cross-user gallery access.

## 6. Technical Implementation Steps
- [x] **Database Refinement**: Add `last_active_at`, `country`, `admin_notes`, and refill columns.
- [x] **Telemetry Logic**: Implement `v_admin_metrics` (Velocity) and `v_admin_growth` (Signups).
- [x] **Auth Hardening**: Update `useAuth` for immediate banning and maintenance bypass.
- [x] **Gallery Engine**: Build the Admin Media Manager with sorting and privacy overrides.
- [x] **Commerce Logic**: Finalize the Global % Sale calculator and monthly refill cron-function.

---
**Currency**: All platform transactions are architected in **USD ($)**.
