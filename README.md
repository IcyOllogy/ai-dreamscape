# AI Dreamscape

AI Dreamscape is a modern, high-engagement AI companion platform designed for immersive and realistic interactions. Moving away from traditional luxury branding, Dreamscape focuses on a **Seductive Neon** aesthetic and an "app-like" user experience.

## 🚀 Vision
Dreamscape aims to provide a premium, immersive companionship experience for a younger, app-savvy audience. The platform features realistic AI-generated characters with modern archetypes (E-girls, Alt-girls, etc.) and a seamless, reactive interface.

## 🛠 Tech Stack

### Core
- **Framework**: [TanStack Start](https://tanstack.com/start/latest) (React 19)
- **Routing**: [TanStack Router](https://tanstack.com/router/latest) (File-based routing)
- **State Management**: [TanStack Query](https://tanstack.com/query/latest) (Server state) & React State (Local state)
- **Build Tool**: [Vite](https://vitejs.dev/)

### Styling & UI
- **CSS**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: `tw-animate-css` & Framer Motion (where applicable)

### Infrastructure & Operations
- **Deployment**: [Cloudflare](https://www.cloudflare.com/) (Workers/Pages)
- **Error Tracking**: [Sentry](https://sentry.io/)
- **Validation**: [Zod](https://zod.dev/)
- **Forms**: [React Hook Form](https://react-hook-form.com/)

## 🎨 Design System: "Seductive Neon"
The project follows a strict design system defined in [AI_AGENT.md](AI_AGENT.md):

- **Pure Obsidian Background**: `#020202`
- **Neon Magenta Primary**: `#FF1B6B`
- **Neon Purple Secondary**: `#A855F7`
- **Glassmorphism**: Heavy use of `backdrop-blur-2xl` and `bg-white/5`.
- **Typography**: `Outfit` (Headers) and `Inter` (UI/Body).

## 📂 Project Structure
```
├── src/
│   ├── components/     # Reusable UI components (Shadcn + Custom)
│   ├── data/           # Static data and constants (Companions, etc.)
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions and shared libraries
│   ├── routes/         # File-based routing (TanStack Router)
│   ├── styles.css      # Global styles and design system tokens
│   ├── server.ts       # Server-side entry (TanStack Start)
│   └── start.ts        # Client-side entry (TanStack Start)
├── Implementations/    # Implementation plans and improvement logs
├── AI_AGENT.md         # Source of Truth for AI developers
├── SENTRY_GUIDE.md     # Error tracking setup and guidelines
└── GITHUB_ISSUES_GUIDE.md # Workflow and issue management standards
```

## 🛠 Getting Started

### Prerequisites
- [Bun](https://bun.sh/) (Recommended) or Node.js
- Cloudflare Account (for deployment)
- Sentry Account (for error tracking)

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
bun install
```

### Development
```bash
# Start the dev server
bun run dev
```

### Build & Preview
```bash
# Build for production
bun run build

# Preview the build
bun run preview
```

## 📜 Development Workflow
- **Issue Discipline**: Every change must be tracked via a GitHub Issue. See [GITHUB_ISSUES_GUIDE.md](GITHUB_ISSUES_GUIDE.md).
- **AI Guidelines**: AI agents must adhere to [AI_AGENT.md](AI_AGENT.md).
- **Companion Management**: Guidelines for managing and evolving AI characters are in [companion.md](companion.md).
- **Error Tracking**: Follow the [SENTRY_GUIDE.md](SENTRY_GUIDE.md) for reporting and fixing bugs.

---
Built with ❤️ for the next generation of AI companionship.
