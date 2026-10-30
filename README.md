# Frontend-only Social Media Demo

An interactive frontend system that simulates a social platform UI, built to explore scalable component architecture, state management, and rich user interactions.

**Live site:** https://social.tayyaba.uk/

The application features a redesigned landing page and Explore feed, with profiles, media cards, collections, and interactive content discovery.

Built with React and TypeScript, the project focuses on frontend architecture and state-driven interactions without a backend integration.

---

## Overview

The application is structured around **users, cards, and collections**, supporting:

- Responsive layouts and content feeds
- Drag-and-drop reordering of cards and collections
- Profile management and social links
- Searchable tags and content discovery
- Saved content and collection management
- Image lightbox and public profile sharing
- Client-side routing and state management

The focus is on building maintainable frontend systems as interaction complexity increases.

---

## Current Scope (v0.2)

The application is a frontend prototype where users can interact with the following features.

### Users and Profiles

- Create and update profiles
- Add social links, including websites and social media accounts
- View public profiles and share profile URLs using the native Web Share API, with a clipboard fallback for unsupported browsers
- Access profile settings through protected routes

### Cards (Posts)

- View card details and associated media
- Search for content through clickable tags
- Open images in a lightbox modal
- Save and favourite cards
- Display cards across profiles, saved content, and collections

### Collections

- Create, update, and delete collections
- Organise cards into collections
- Reorder collections and cards using drag and drop

### Routing and Navigation

- Browser-based routing using React Router's `createBrowserRouter`
- Protected routes for authenticated experiences
- Guest-only login and signup routes, redirecting authenticated users to their profile
- Shared application layout and loading-state handling

### State and Data

- Persistent client-side state using `localStorage`
- JSON seed data for initial demo content
- Centralised data operations through `localDataService`
- Normalised user state for saved content and ordering

---

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router
- `localStorage` and JSON for client-side data and persistence
- Cloudflare Pages for hosting and deployment

---

## Architecture

### `localDataService`

A centralised abstraction for application data operations:

- **Users:** creation, updates, and lookup
- **Cards:** retrieval, filtering, and ordering
- **Collections:** CRUD operations and ordering
- **User state:** saved cards, ordering, and normalisation

JSON seed data provides the initial dataset, while `localDataService` manages application data and persistence through `localStorage`.

This separation keeps storage logic out of UI components and provides a boundary for potential future backend integration.

### Reusable Hooks

- **`useShare`****:** Encapsulates profile-sharing logic, using the native Web Share API where supported and clipboard copying as a fallback.

---

## Deployment

The application is hosted on Cloudflare Pages under a dedicated subdomain, replacing the original GitHub Pages deployment.

- **Continuous Deployment (CD):** Cloudflare Pages is connected to the GitHub repository and automatically builds and deploys changes pushed to the configured deployment branch.
- **Automated publishing:** Successful builds are deployed without manual uploads or a separate deployment script.

The deployment workflow automates publishing; a separate continuous integration pipeline for running tests or checks is not configured.

---

## Why This Project Exists

This project is not intended to be a production-ready social platform. It provides a controlled environment for exploring complex frontend systems without backend dependencies.

The focus is on:

- Modelling application state and data relationships
- Designing reusable components and maintainable service boundaries
- Building interactive, state-driven user experiences
- Understanding the limits of browser-based persistence and authentication
- Iterating on architecture, usability, and deployment workflows

---

## What This Demonstrates

- Frontend architecture and separation of concerns
- State management across multiple views
- Reusable components and hooks
- Complex UI interactions and content organisation
- Client-side routing and route guards
- Browser-based persistence and data modelling
- Continuous deployment with Cloudflare Pages

---

## Getting Started

bash

```
git clone https://github.com/TMaz1/frontend-social-system-main
cd frontend-social-system-main
npm install
npm run dev
```

Open [http://localhost:5173/](<http://localhost:5173/>) to run the application locally.

---

## Notes

- Data is stored in `localStorage`; clearing it resets locally persisted changes.
- JSON seed data provides the initial demo content.
- Client-side authentication and route guards control the UI but do not provide server-enforced security.
- The project prioritises frontend experimentation over backend implementation.


- offer a single "sign in" button with dummy prepopulated info to shortcut user flow
- validation for signup

- fix draggable masonry bug