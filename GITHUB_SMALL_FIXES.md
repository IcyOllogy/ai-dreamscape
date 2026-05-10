# 🛠️ AI Dreamscape: Open Issues & Small Fixes

This file tracks the current open issues in the GitHub repository. Use this as a quick reference for tasks that need attention.

## 🚀 Active Issues

| ID | Type | Title | Status |
|----|------|-------|--------|
| [#22](https://github.com/IcyOllogy/ai-dreamscape/issues/22) | `[Feature]` | [Admin Dashboard: View User Emails](https://github.com/IcyOllogy/ai-dreamscape/issues/22) | `OPEN` |
| [#21](https://github.com/IcyOllogy/ai-dreamscape/issues/21) | `[Feature]` | [Admin Dashboard: Manage Member Roles](https://github.com/IcyOllogy/ai-dreamscape/issues/21) | `OPEN` |
| [#14](https://github.com/IcyOllogy/ai-dreamscape/issues/14) | `[Bug]` | [Pricing page banner visible when no sale is active](https://github.com/IcyOllogy/ai-dreamscape/issues/14) | `OPEN` |
| [#23](https://github.com/IcyOllogy/ai-dreamscape/issues/23) | `[Feature]` | [Remove Panic Button Redirect](https://github.com/IcyOllogy/ai-dreamscape/issues/23) | `OPEN` |
| [#11](https://github.com/IcyOllogy/ai-dreamscape/issues/11) | `[Bug]` | [Back to home button obscured on login and signup pages](https://github.com/IcyOllogy/ai-dreamscape/issues/11) | `OPEN` |

---

## 📝 Issue Details

### [#22] Admin Dashboard: View User Emails
- **Description:** Allow administrators to view user emails in the Admin Dashboard's users section for future communication needs.
- **Priority:** Normal
- **Context:** `http://localhost:8080/admin/users`

### [#21] Admin Dashboard: Manage Member Roles
- **Description:** Implement functionality in the Admin Dashboard to allow administrators to manage user roles.
- **Priority:** Normal
- **Context:** `http://localhost:8080/admin/users`

### [#14] Pricing page banner visible when no sale is active
- **Description:** The public Pricing page displays a promotional banner at the top even when no global sale is active.
- **Priority:** Low
- **Context:** Pricing page banner logic.

### [#11] Back to home button obscured on login and signup pages
- **Description:** On the sign-in and login pages, the back to home button at the top left is currently being obscured by the persistent sidebar.
- **Priority:** Normal
- **Context:** UI positioning on `/login` and `/signup`.

### [#23] Remove Panic Button Redirect
- **Description:** Remove the "Panic Button" (Quick Exit) from the navigation as it is no longer required.
- **Priority:** Low
- **Context:** `Navigation.tsx` and `NavRail.tsx` components.

---
*Last updated: 2026-05-10*
