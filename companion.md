# AI Dreamscape: Companion Management System

## Project Overview
Dreamscape is a high-engagement AI companion platform designed to provide immersive, personalized, and emotionally resonant experiences with 24 unique characters. This document serves as the master guide for humans and AI agents to maintain and evolve the companion ecosystem.

## Core Objectives
1. **Individual Identity**: Every companion must feel like a distinct, real person with their own history, personality, and aesthetic.
2. **Scalability**: Maintain a system where 24+ companions can be managed individually without code bloat.
3. **Immersive Assets**: High-quality images that reflect the character's style (Realistic, Artistic, or Anime).
4. **Agent Continuity**: Ensure any AI agent can step in and understand how to modify a specific character's data or behavior.

## Technical Architecture

### 1. Data Layer
The companion data is stored in `src/data/companions.ts`. 
- **Structure**: An array of `Companion` objects.
- **Fields**: ID, Name, Age, Tagline, Bio, Style, Personality, Origin, Interests, Image, Online Status, and Voice Samples.

### 2. Asset Management
Images are stored in `src/assets/companions/`. 
- **Naming Convention**: `[name].jpg` (e.g., `elise.jpg`).
- **Standard**: All images should be high-resolution and match the character's defined `Style`.

### 3. Component Architecture
- **Listing View**: `src/routes/companions.tsx` (The Gallery).
- **Detail View**: `src/routes/companions.$id.tsx` (Individual Profile).
- **Navigation**: TanStack Router handles dynamic routing via the companion ID.

## Companion Roster (Reference by Name)

| ID | Name | Style | Personality |
| :--- | :--- | :--- | :--- |
| `elise` | Elise | Realistic | Flirty |
| `noa` | Noa | Realistic | Playful |
| `mei` | Mei | Realistic | Caring |
| `imani` | Imani | Realistic | Dominant |
| `valeria` | Valeria | Realistic | Flirty |
| `freja` | Freja | Realistic | Mysterious |
| `colette` | Colette | Realistic | Intellectual |
| `priya` | Priya | Realistic | Caring |
| `sora` | Sora | Realistic | Mysterious |
| `saoirse` | Saoirse | Realistic | Playful |
| `giulia` | Giulia | Realistic | Flirty |
| `luana` | Luana | Realistic | Playful |
| `anya` | Anya | Realistic | Dominant |
| `layla` | Layla | Realistic | Mysterious |
| `yumi` | Yumi | Realistic | Playful |
| `wren` | Wren | Realistic | Mysterious |
| `amara` | Amara | Realistic | Dominant |
| `kira` | Kira | Realistic | Flirty |
| `rosa` | Rosa | Realistic | Caring |
| `linh` | Linh | Realistic | Mysterious |
| `thalia` | Thalia | Realistic | Playful |
| `moana` | Moana | Realistic | Caring |
| `salome` | Salomé | Realistic | Dominant |
| `niamh` | Niamh | Realistic | Mysterious |

## AI Agent Working Protocol

To work on a specific character, follow these steps:

1. **Locate Data**: Open `src/data/companions.ts`.
2. **Locate Assets**: Check `src/assets/companions/` for the character's image.
3. **Contextual Awareness**: Before modifying, read the character's `bio` and `interests` to maintain consistent "voice".
4. **Execution**: If updating a character, ensure the ID matches the filename and route parameter.

## Development Milestones
- [x] Rename all assets from numeric (`c1.jpg`) to named (`elise.jpg`).
- [x] Update data structure to use named imports.
- [ ] Implement individual character detail sections (Gallery, Bio tabs).
- [ ] Integrate AI Chat behavior specific to each personality type.
- [ ] Add voice synthesis mapping per character.

## Maintenance Procedures
- **Adding a New Character**: 
    1. Create high-res image in `src/assets/companions/[name].jpg`.
    2. Add import to `src/data/companions.ts`.
    3. Add character object to the `companions` array.
- **Updating Character Aesthetics**: 
    1. Replace the `.jpg` in the assets folder (keep same name).
    2. The app will automatically reflect the change.
