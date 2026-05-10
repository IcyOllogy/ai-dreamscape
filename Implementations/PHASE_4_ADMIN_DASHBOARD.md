# Phase 4: Admin Dashboard — Architectural Blueprint [IN PROGRESS]

This document outlines the administrative interface for **AI Dreamscape**, providing tools for platform oversight, user management, and revenue optimization.

## 1. Platform Metrics Dashboard (Pulse)
A high-level overview of the platform's health and growth.

- **KPI Cards**:
  - **Revenue**: Total earnings (Today/This Week/Total).
  - **DAU (Daily Active Users)**: Real-time user activity tracking.
  - **Token Velocity**: Monitoring token consumption and refill rates.
- **Charts**:
  - **Growth Curve**: User signup trends over time.
  - **Popular Companions**: Identifying which AI personas are generating the most engagement.
- **Access Control**: Strictly restricted to users with the `admin` role via RLS and middleware.

## 2. User Management System
The central hub for moderating and supporting the user base.

- **Data Table**:
  - **Columns**: Handle, Email, Role, Joined Date, Total Tokens, Status (Active/Suspended).
  - **Search/Filter**: Search by handle/email, filter by role (Free, Pro, VIP, Admin).
- **Actions**:
  - **Manual Role Override**: Capability to grant/revoke VIP or Admin status.
  - **Token Adjustment**: Manually add/remove tokens for customer support cases.
  - **Suspension Toggle**: Block/Unblock users from accessing platform features.

## 3. Dynamic Pricing & Tier CRUD
An interface to manage the platform's economic model without code changes.

- **Tier Management**:
  - Edit existing tier prices, token allotments, and feature access.
  - CRUD interface for "Token Refill" packages.
- **Audit Logs**: Track who changed pricing and when.

## 4. Platform Health & Security
- **Sentry Overview**: Embedded link or summary of recent critical errors.
- **Resource Usage**: Monitoring Supabase storage and database health.

## 5. Technical Implementation Steps

1.  **Admin Routing**: Secure `/admin/*` routes using TanStack Router and role-based protection.
2.  **Metrics Integration**: Implement efficient Postgres queries/views for DAU and Revenue tracking.
3.  **User Management UI**: Build a high-performance table component with server-side pagination and filtering.
4.  **Pricing Interface**: Create the forms and backend triggers for real-time pricing updates.
5.  **Access Verification**: Audit all `/admin` API endpoints and RLS policies to ensure total isolation from regular users.
