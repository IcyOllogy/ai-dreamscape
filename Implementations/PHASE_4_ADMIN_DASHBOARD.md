# Phase 4: Admin Dashboard — Architectural Blueprint [IN PROGRESS]

This document outlines the administrative interface for **AI Dreamscape**, providing tools for platform oversight, user management, and revenue optimization.

## 1. Platform Metrics Dashboard (Pulse)
A high-performance overview of the platform's health and growth.

- **KPI Cards**:
  - **Revenue**: Total earnings (Today/This Week/Total).
  - **Active Sessions**: Real-time count of users with currently open sessions (`ended_at IS NULL`).
  - **Token Velocity**: Monitoring token consumption and refill rates.
  - **DAU & Churn**: Real-time Daily Active Users and "Churn Rate" tracking (users inactive for 30+ days).
- **Growth Analytics**:
  - **Historical View**: Toggle between **Daily / Weekly / Monthly** signup and activity trends.
  - **Telemetry**: Powered by a pre-calculated `daily_metrics` table and Postgres views (`v_admin_metrics`) for maximum scalability.

## 2. User Management System
The central hub for moderating and supporting the user base.

- **Data Table**:
  - **Columns**: Handle, Email, Role, Joined Date, Total Tokens, Status (Active/Suspended).
  - **Search/Filter**: Deep search by handle/email, filter by role (Free, Pro, VIP, Admin).
- **Actions**:
  - **Manual Role Override**: Capability to grant/revoke VIP or Admin status.
  - **Token Adjustment**: Add/remove tokens with a mandatory "Reason" field for auditing.
  - **Moderation**: One-click **Ban/Unban** toggle to restrict platform access.
- **Data Portability**: **CSV Export** button to download the current user list for external auditing.

## 3. Dynamic Pricing & Sale Manager
A commerce engine to manage the platform's economy without code changes.

- **Tier Management**:
  - **Intervals**: Support for both **Monthly** and **Yearly** pricing for every tier.
  - **Specific Sales**: Dedicated `sale_price` fields for each interval to allow granular control.
- **Global Sale Controls**:
  - **Master Toggle**: Activate a site-wide sale mode.
  - **Sale Banner**: Automatically triggers a high-visibility announcement banner across the entire platform.
- **Public Integration**: Update the consumer `/pricing` page with a switch to toggle between Monthly and Yearly billing.

## 4. Platform Health & Security
- **Admin Audit Logs**: Comprehensive history of all admin actions (price changes, bans, token edits) including previous/new values.
- **Resource Monitoring**: Links to Supabase storage and database health telemetry.

## 5. Technical Implementation Steps

1.  **Database Infrastructure**:
    - Update `pricing_plans` with interval and sale columns.
    - Create `platform_settings` table and `v_admin_metrics` view.
2.  **Admin Routing**: Secure `/admin/*` routes using TanStack Router role-based protection.
3.  **Metrics Integration**: Wire up the dashboard to the performance-optimized Postgres views.
4.  **Moderation UI**: Build the User Management table with functional Ban/Token adjustment modals.
5.  **Pricing Interface**: Create the Pricing Manager with interval support and the Global Sale Master Toggle.
6.  **Export Engine**: Implement CSV generation for User and Transaction tables.
7.  **Final Polish**: Deploy the site-wide Sale Banner and finalize responsive layout for mobile admin oversight.

---
**Currency**: All platform transactions are architected in **USD ($)**.
