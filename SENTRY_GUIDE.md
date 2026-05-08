# 🛡️ Sentry Setup Guide

This guide outlines the steps to set up Sentry for error tracking and feedback in our application.

## 1. Create a Sentry Account
1. Go to [sentry.io](https://sentry.io/) and sign up.
2. Follow the onboarding to create an organization and a new project.
3. Choose the platform (e.g., React, Node.js, Next.js) that matches our app.

## 2. Install the SDK
Install the appropriate Sentry SDK for our project.

For a standard React app:
```bash
npm install @sentry/react @sentry/tracing
```

For Next.js, the wizard handles most of the setup:
```bash
npx @sentry/wizard@latest -i nextjs
```

## 3. Initialize Sentry
Add the initialization code as early as possible in the application lifecycle.

You will need the **DSN (Data Source Name)** from your Sentry project settings. Keep this in an environment variable (e.g., `VITE_SENTRY_DSN` or `NEXT_PUBLIC_SENTRY_DSN`).

Example initialization:
```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN, // Use process.env for Next.js/Node
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, 
  // Session Replay
  replaysSessionSampleRate: 0.1, 
  replaysOnErrorSampleRate: 1.0, 
});
```

## 4. User Feedback Loops
Sentry can prompt users for feedback when an error occurs. This allows users to explain what they were doing when the app crashed.

Enable the User Feedback widget in your Sentry project settings:
`Settings` -> `Projects` -> `[Your Project]` -> `User Feedback`.

To show the feedback dialog programmatically when an error is caught:
```javascript
try {
  // risky code
} catch (error) {
  Sentry.captureException(error);
  Sentry.showReportDialog({ eventId: Sentry.lastEventId() });
}
```

## 5. Verify Setup
Trigger a test error in your development environment to ensure it appears in the Sentry dashboard.
```javascript
<button onClick={() => { throw new Error("Sentry Test Error"); }}>
  Trigger Sentry Error
</button>
```
