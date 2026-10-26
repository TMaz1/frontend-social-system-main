# frontend-social-system

An interactive frontend system that simulates a social platform UI with dynamic layouts and state-driven interactions.

Live demo: https://TMaz1.github.io/frontend-social-system/\n\nThe landing page introduces the project; the visual feed lives at `#/explore`.

The project is built around a card-and-collection architecture to explore scalable UI patterns, state management, and layout complexity in a frontend-only environment (no backend integration).













## Colour Scheme

- Primary background: `#070808` — Black
- Secondary background: `#0D0F0F` — Asphalt
- Card/panel background: `#141716` — Charcoal
- Elevated surfaces: `#1D211F` — Smoke
- Primary text: `#F1EDDA` — Cream
- White text: `#FAF8ED`
- Secondary text: `#B2B1A7` — Muted grey
- Subtle text: `#898A82`
- Primary accent: `#F0C52E` — Yellow
- Bright accent: `#FFD94A` — Bright yellow
- Secondary accent: `#6D9690` — Muted cyan
- Additional accents: Red `#8C4B42`, green `#6FA58D`
- Borders: Cream with 9–30% opacity

## Typography

- Heading font: Oswald
- Body font: DM Mono
- Monospace fallback: Courier New, monospace
- Display font fallback: Impact, sans-serif
- Font weights: 300 (Light), 400 (Regular), 500 (Medium)
- Body text size: 14–16px
- Small labels: 9–12px
- Section headings: 32px
- Hero headings: Fluid 56–108px
- Large display titles: 120px

## Layout and Design

- Style: Dark, minimalist, technical and editorial
- Spacing system: 4px–96px
- Maximum container width: 1180px
- Maximum content width: 780px
- Header height: 65px
- Container side padding: 24px
- Border radius: 0px (sharp corners)
- Shadows: None
- Borders: Thin, subtle cream-coloured lines
- Transitions: 180ms, 280ms and 700ms
- Responsive breakpoints: 430px, 620px, 900px and 1200px





---

## Overview

The application is structured around **users, cards, and collections**, forming a flexible UI system that supports:

* Dynamic layouts (grid, masonry, and variations)
* Rich interactions (dragging, reordering, filtering)
* Complex state relationships across multiple views
* Iterative UX experimentation

The focus is on designing systems that remain maintainable as interaction complexity increases, rather than on backend integration.

---

## Current Scope (v0.1)

The app currently functions as a **front-end prototype** where users can:

### Users

* Create and update profiles
* Add social links (website, Instagram, YouTube, Twitter, TikTok, etc.)

### Cards (Posts)

* Create content cards with media, links, and metadata
* Organise cards independently or within collections
* Save/favourite cards
* Display cards across multiple contexts (uploaded, saved, collections)

### Collections

* Create, update, and delete collections
* Reorder collections and cards within them with drag and drop

### State & Data

* Persistent UI state via `localStorage`
* JSON seed data for demo environments
* Normalised user state for ordering and saved content

---

## Tech Stack

* React 18 + TypeScript
* Vite
* localStorage + JSON (temporary persistence layer)

---

## Architecture Notes

### `localDataService`

A centralised abstraction for all data operations:

* Cards: retrieval, filtering, ordering
* Collections: CRUD + ordering
* Users: creation, updates, lookup
* User State: saved items, ordering, normalisation

This layer mimics a backend service to allow future integration without refactoring the UI.

---

## Why This Project Exists

This project is not intended to be a production-ready social platform.

It exists as a controlled environment for exploring how **complex frontend systems** are designed and evolved over time, without being constrained by backend dependencies.

The focus is on:

* Modelling UI state and data relationships
* Designing scalable component structures
* Experimenting with interaction patterns and layouts
* Understanding trade-offs in frontend architecture

The current abstraction layer (`localDataService`) is intentionally designed to mimic a backend, allowing future integration without restructuring the UI.

---

## What This Demonstrates

This project is intended to showcase:

* Frontend architecture and separation of concerns
* Complex state management and data flow
* Advanced UI/UX patterns and interactions
* Performance considerations in dynamic interfaces
* The ability to evolve a system beyond a single feature or use case

---

## Direction (Exploration Areas)

This project will continue to evolve as a frontend systems sandbox.

---

## Getting Started

```bash
git clone https://github.com/TMaz1/frontend-social-system
cd frontend-social-system
npm install
npm run dev
```

Open: http://localhost:5173/

---

## Notes

* Data is stored in **localStorage** (clearing it resets the app)
* The project prioritises frontend system experimentation over backend implementation
* Structure is intentionally flexible to support ongoing iteration